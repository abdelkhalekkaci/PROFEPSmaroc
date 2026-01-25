const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        
        if (!GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Clé API GROQ non configurée dans Vercel'
            });
        }

        const { aps, apsAutre, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance } = req.body;
        const apsFinale = aps === 'Autre' ? apsAutre : aps;

        if (!apsFinale || !objectif) {
            return res.status(400).json({ 
                success: false, 
                error: 'Paramètres manquants (APS et objectif requis)' 
            });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const cycleLabel = isCollege ? 'collège' : 'lycée';
        const opReference = isCollege ? 'Orientations Pédagogiques 2009' : 'Orientations Pédagogiques 2007';
        
        // Règles par APS
        let apsRules = '';
        if (apsFinale === 'Gymnastique') {
            apsRules = '⚠️ GYMNASTIQUE: Situation de référence = ENCHAÎNEMENT GYMNIQUE (PAS de match!)';
        } else if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(apsFinale)) {
            apsRules = `⚠️ ${apsFinale.toUpperCase()}: Situation de référence = MATCH DIRIGÉ`;
        } else if (['Course de vitesse', 'Saut en longueur', 'Lancer de poids'].includes(apsFinale)) {
            apsRules = '⚠️ ATHLÉTISME: Situation de référence = PERFORMANCE MESURÉE';
        }

        const prompt = `Tu es un expert en EPS au Maroc. Génère une fiche pour ${apsFinale} niveau ${niveau} (${cycleLabel}).

**OBJECTIF:** ${objectif}
**RÉFÉRENCE:** ${opReference}
**SÉANCE N°:** ${numeroSeance || 1}

${apsRules}

🔵 CRITÈRES DE RÉALISATION = COMMENT FAIRE (gestes PENDANT l'action)
🟢 CRITÈRES DE RÉUSSITE = RÉSULTAT OBTENU (mesurable À LA FIN)

Génère DEUX versions séparées par "===SEPARATEUR===" :

**VERSION 1 - DÉTAILLÉE (HTML):**
<h3>📌 PARTIE INTRODUCTIVE (15 min)</h3>
<h4>🔹 Prise en main (3 min)</h4>
<ul><li>Appel, présentation objectif, sécurité</li></ul>
<h4>🔹 Échauffement général (7 min)</h4>
<ul><li>Course, montées genoux, mobilisation articulaire</li></ul>
<h4>🔹 Échauffement spécifique (5 min)</h4>
<p>[Exercices spécifiques ${apsFinale}]</p>

<h3>⚡ PARTIE FONDAMENTALE (35 min)</h3>
<h4>🎯 SITUATION 1 (10 min)</h4>
<p><strong>Dispositif:</strong> [terrain, groupes, matériel]</p>
<p><strong>🔵 Critères réalisation:</strong> [gestes]</p>
<p><strong>🟢 Critères réussite:</strong> [résultats]</p>

<h4>🎯 SITUATION 2 (15 min)</h4>
<p>[Variables: simplifier/complexifier]</p>

<h4>🏆 SITUATION RÉFÉRENCE (10 min)</h4>
<p>[Match/Enchaînement/Performance]</p>

<h3>🧘 PARTIE FINALE (10 min)</h3>
<p>Retour au calme, étirements, bilan</p>

===SEPARATEUR===

**VERSION 2 - CONDENSÉE (Word):**
**PARTIE INTRODUCTIVE:** Prise en main, échauffement
**PARTIE FONDAMENTALE:** Situations progressives
**PARTIE FINALE:** Retour au calme, bilan

===SEPARATEUR===

**VIDÉOS:** 3 vidéos YouTube pour "${apsFinale} ${objectif}"`;

        console.log('📝 Appel Groq API...');

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 8000,
                temperature: 0.7
            })
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            throw new Error(errorData.error?.message || 'Erreur Groq API');
        }

        const groqData = await groqResponse.json();
        const contenuComplet = groqData.choices[0].message.content;

        const parties = contenuComplet.split('===SEPARATEUR===');
        const ficheDetaillee = parties[0]?.trim() || 'Version détaillée non disponible';
        const ficheCondensee = parties[1]?.trim() || 'Version condensée non disponible';
        const videos = parties[2]?.trim() || 'Vidéos non disponibles';

        // OTI selon niveau
        const otis = {
            '1AC': "L'élève doit acquérir une motricité correcte pour s'adapter aux situations.",
            '2AC': "L'élève doit ajuster l'énergie physique pour des réalisations coordonnées.",
            '3AC': "L'élève doit ajuster les éléments de l'acte moteur aux différentes situations.",
            'TC': "L'élève doit identifier et analyser différentes situations motrices.",
            '1AB': "L'élève doit confronter et analyser différentes situations motrices.",
            '2AB': "L'élève doit analyser les situations et s'intégrer dans des projets."
        };
        const oti = otis[niveau] || "Développer les capacités motrices de l'élève.";

        // OTC selon APS et niveau
        let otc = "Améliorer l'efficacité motrice et sportive.";
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(apsFinale)) {
            if (niveau === '1AC') otc = "Conserver la balle et participer au jeu collectif.";
            else if (niveau === '2AC') otc = "Progresser avec la balle et changer de rôle.";
            else if (niveau === '3AC') otc = "Participer au projet collectif attaque/défense.";
            else otc = "Rechercher le gain par des choix tactiques collectifs.";
        } else if (apsFinale === 'Gymnastique') {
            if (niveau === '1AC') otc = "Réaliser un enchaînement simple (3A 2B 0C).";
            else if (niveau === '2AC') otc = "Présenter un enchaînement varié (3A 2B 1C).";
            else if (niveau === '3AC') otc = "Concevoir un enchaînement (2A 4B 1C).";
            else otc = "Concevoir et réaliser un enchaînement personnel.";
        }

        // Groupe APS
        let groupeAPS = 'Sport individuel';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(apsFinale)) groupeAPS = 'Sport collectif';
        else if (['Course de vitesse', 'Saut en longueur', 'Lancer de poids', 'Course de relais', 'Saut en hauteur', 'Course de durée'].includes(apsFinale)) groupeAPS = 'Athlétisme';
        else if (apsFinale === 'Gymnastique') groupeAPS = 'Gymnastique';
        else if (['Tennis de table', 'Badminton'].includes(apsFinale)) groupeAPS = 'Sport de renvoi';

        // Situation de référence
        const sitRefs = {
            'Handball': 'Match dirigé 7c7',
            'Football': 'Match dirigé 7c7',
            'Basketball': 'Match dirigé 5c5',
            'Volleyball': 'Match dirigé 6c6',
            'Gymnastique': 'Enchaînement devant la classe',
            'Tennis de table': 'Match simple (11 pts)',
            'Badminton': 'Match simple (21 pts)',
            'Course de vitesse': '2 courses chronométrées',
            'Saut en longueur': '3 essais mesurés',
            'Lancer de poids': '3 essais mesurés'
        };
        const sitRef = sitRefs[apsFinale] || 'Situation d\'application';

        // But phase fondamentale
        let butPhase = "Réaliser les actions pour atteindre l'objectif.";
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(apsFinale)) {
            if (objectif.toLowerCase().includes('passe')) butPhase = "Enchaîner réception et passe.";
            else if (objectif.toLowerCase().includes('tir')) butPhase = "Se placer et armer son tir.";
            else butPhase = "Effectuer les actions adaptées au jeu.";
        } else if (apsFinale === 'Gymnastique') {
            butPhase = "Exécuter les éléments avec maîtrise.";
        }

        // HTML Word
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${apsFinale}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:10pt}
table{width:100%;border-collapse:collapse}
th,td{border:1.5pt solid #000;padding:5px;vertical-align:top}
.title{text-align:center;font-size:16pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:10px}
.label{background:#e8e8e8;font-weight:bold;font-size:9pt;text-align:center;width:8%}
.header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:10pt;padding:6px}
.partie{font-weight:bold;text-align:center;background:#f5f5f5}
</style></head>
<body>
<table style="margin-bottom:5px"><tr>
<td style="border:none;text-align:left"><b>Professeur:</b> ${nomProf||'___'}</td>
<td style="border:none;text-align:center"><b>Établissement:</b> ${etablissement||'___'}</td>
<td style="border:none;text-align:center"><b>Année:</b> ${anneeScolaire||'20__/20__'}</td>
<td style="border:none;text-align:right"><b>Séance N°:</b> ${numeroSeance||1}</td>
</tr></table>
<table style="margin-bottom:5px"><tr><td class="title">FICHE DE PRÉPARATION - ${apsFinale.toUpperCase()}</td></tr></table>
<table style="margin-bottom:5px">
<tr><td class="label">Groupe</td><td>${groupeAPS}</td><td class="label">APS</td><td>${apsFinale}</td><td class="label">Niveau</td><td>${niveau}</td></tr>
<tr><td class="label">OTI</td><td colspan="5" style="font-size:8pt">${oti}</td></tr>
<tr><td class="label">OTC</td><td colspan="5" style="font-size:8pt">${otc}</td></tr>
<tr><td class="label" style="background:#1a5c3a;color:#fff">OBJECTIF</td><td colspan="5" style="background:#f0f8f0;font-weight:bold">${objectif}</td></tr>
</table>
<table>
<tr><th class="header" style="width:9%">PARTIES</th><th class="header" style="width:6%">DURÉE</th><th class="header" style="width:32%">CONTENU</th><th class="header" style="width:13%">BUT</th><th class="header" style="width:20%">C. RÉALISATION</th><th class="header" style="width:20%">C. RÉUSSITE</th></tr>
<tr><td class="partie">INTRODUCTIVE</td><td style="text-align:center">15min</td><td>• Prise en main<br>• Échauffement général/spécifique</td><td>• Éveil psychique<br>• Activation cardio</td><td>• Mobilisation progressive</td><td>• FC augmentée<br>• Élèves échauffés</td></tr>
<tr><td class="partie">FONDAMENTALE</td><td style="text-align:center">35min</td><td>Situations progressives<br><br><b>Sit. référence:</b><br>${sitRef}</td><td>${butPhase}</td><td>• Respect consignes<br>• Coordination</td><td>• Réussites visibles<br>• Objectif atteint</td></tr>
<tr><td class="partie">FINALE</td><td style="text-align:center">10min</td><td>• Retour au calme<br>• Étirements<br>• Bilan</td><td>• Récupérer<br>• Feedback</td><td>• Respiration contrôlée</td><td>• FC normale<br>• Participation</td></tr>
</table>
<div style="text-align:center;font-size:7pt;color:#555;margin-top:5px">Conforme aux ${opReference} | MEN Maroc</div>
</body></html>`;

        console.log('✅ Génération terminée !');

        return res.status(200).json({
            success: true,
            ficheDetaillee,
            ficheCondensee,
            videos,
            html,
            filename: `Fiche_${apsFinale}_${niveau}_${Date.now()}.doc`,
            nomProf,
            etablissement,
            anneeScolaire
        });

    } catch (error) {
        console.error('❌ Erreur:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};
