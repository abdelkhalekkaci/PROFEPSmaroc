const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    console.log('📥 Requête reçue:', req.body);

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        
        if (!GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Clé API GROQ non configurée. Ajoutez GROQ_API_KEY dans les variables d\'environnement Vercel'
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

        // Déterminer si c'est collège ou lycée
        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const cycleLabel = isCollege ? 'collège' : 'lycée';
        const opReference = isCollege ? 'Orientations Pédagogiques 2009' : 'Orientations Pédagogiques 2007';
        
        // Règles spécifiques par APS
        const apsRules = getAPSRules(apsFinale);
        
        // PROMPT
        const promptUnifie = `Tu es un expert international en EPS au Maroc, didacticien et pédagogue sportif de haut niveau. Génère une fiche de préparation EXTRÊMEMENT DÉTAILLÉE et PROFESSIONNELLE pour ${apsFinale} niveau ${niveau} (${cycleLabel}).

**OBJECTIF DE LA SÉANCE:** ${objectif}
**RÉFÉRENCE OFFICIELLE:** ${opReference}
**SÉANCE N°:** ${numeroSeance || 1}

${apsRules}

⚠️ CONSIGNES ABSOLUMENT OBLIGATOIRES:

🔵 CRITÈRES DE RÉALISATION = COMMENT FAIRE (gestes, techniques, attitudes PENDANT l'action)
🟢 CRITÈRES DE RÉUSSITE = RÉSULTAT OBTENU (mesurable, quantifiable, À LA FIN)

Génère DEUX versions séparées par "===SEPARATEUR===" :

**VERSION 1 - ULTRA DÉTAILLÉE (pour affichage web):**

<h3>📌 PARTIE INTRODUCTIVE (15 minutes)</h3>
<h4>🔹 Prise en main (3 min)</h4>
<p><strong>Organisation:</strong> Élèves en ligne face au professeur</p>
<ul>
<li>Appel nominal et vérification de la tenue sportive</li>
<li>Présentation de l'objectif: "${objectif}"</li>
<li>Consignes de sécurité</li>
</ul>

<h4>🔹 Échauffement général (7 min)</h4>
<p><strong>Exercice 1 - Course d'activation (3 min):</strong></p>
<ul>
<li>Course légère autour du terrain</li>
<li>Montées de genoux, talons-fesses, pas chassés</li>
</ul>

<p><strong>Exercice 2 - Mobilisation articulaire (4 min):</strong></p>
<ul>
<li>Rotations chevilles, genoux, hanches, épaules</li>
</ul>

<h4>🔹 Échauffement spécifique à ${apsFinale} (5 min)</h4>
<p>[2-3 exercices spécifiques avec matériel]</p>

---

<h3>⚡ PARTIE FONDAMENTALE (35 minutes)</h3>

<h4>🎯 SITUATION 1 - Phase de découverte (10 min)</h4>
<p><strong>Dispositif:</strong> [dimensions, organisation, matériel]</p>
<p><strong>Description:</strong> [exercice détaillé]</p>
<p><strong>🔵 Critères de réalisation:</strong></p>
<ul><li>[gestes pendant l'action]</li></ul>
<p><strong>🟢 Critères de réussite:</strong></p>
<ul><li>[résultats mesurables]</li></ul>

<h4>🎯 SITUATION 2 - Phase d'apprentissage (15 min)</h4>
<p>[même structure]</p>

<h4>🏆 SITUATION 3 - Situation de référence (10 min)</h4>
<p><strong>Type:</strong> [Match/Enchaînement/Performance selon APS]</p>

---

<h3>🧘 PARTIE FINALE (10 minutes)</h3>
<p>Retour au calme, étirements, bilan</p>

===SEPARATEUR===

**VERSION 2 - CONDENSÉE (pour Word/PDF):**

**PARTIE INTRODUCTIVE:**
Contenu: Prise en main • Échauffement général • Échauffement spécifique
But: Éveil psychique et activation cardio-vasculaire
Critères de réalisation: Mobilisation progressive
Critères de réussite: Élèves échauffés

**PARTIE FONDAMENTALE:**
**Condition de réalisation:**
- Terrain: [dimensions]
- Organisation: [groupes]
- Matériel: [liste]

**Consignes:** [4 consignes]

**Variables:**
▸ SIMPLIFIER: [2 façons]
▸ COMPLEXIFIER: [2-3 façons]

**Situation de référence:** [selon APS]

**But:** ${objectif}

**Critères de RÉALISATION:** [4 critères - gestes PENDANT]
**Critères de RÉUSSITE:** [3 critères - résultats À LA FIN]

**PARTIE FINALE:**
Contenu: Retour au calme • Étirements • Bilan
But: Récupérer et verbaliser

===SEPARATEUR===

**VIDÉOS RECOMMANDÉES:**
3 vidéos YouTube francophones pour "${apsFinale} ${objectif}"`;

        console.log('📝 Génération avec Groq...');

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: promptUnifie }],
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

        // Séparer les parties
        const parties = contenuComplet.split('===SEPARATEUR===');
        const ficheDetaillee = parties[0]?.trim() || 'Version détaillée non disponible';
        const ficheCondensee = parties[1]?.trim() || 'Version condensée non disponible';
        const videos = parties[2]?.trim() || 'Vidéos non disponibles';

        // OTI et OTC
        const oti = getOTI(niveau);
        const otc = getOTC(apsFinale, niveau);
        const butPhaseFondamentale = genererButPhase(objectif, apsFinale);
        const sitRef = getSituationReference(apsFinale);

        // Génération HTML Word
        const html = generateWordHTML(apsFinale, niveau, objectif, nomProf, etablissement, anneeScolaire, numeroSeance, oti, otc, ficheCondensee, butPhaseFondamentale, sitRef, opReference);

        console.log('✅ Génération terminée !');

        return res.status(200).json({
            success: true,
            ficheDetaillee: ficheDetaillee,
            ficheCondensee: ficheCondensee,
            videos: videos,
            html: html,
            filename: `Fiche_${apsFinale}_${niveau}_${Date.now()}.doc`,
            nomProf: nomProf,
            etablissement: etablissement,
            anneeScolaire: anneeScolaire
        });

    } catch (error) {
        console.error('❌ Erreur:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// ============ FONCTIONS HELPER ============

function getAPSRules(aps) {
    if (aps === 'Gymnastique') {
        return `⚠️ GYMNASTIQUE: Situation de référence = ENCHAÎNEMENT GYMNIQUE (pas de match!)`;
    }
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
        return `⚠️ ${aps.toUpperCase()}: Situation de référence = MATCH DIRIGÉ`;
    }
    if (['Course de vitesse', 'Saut en longueur', 'Lancer de poids'].includes(aps)) {
        return `⚠️ ATHLÉTISME: Situation de référence = PERFORMANCE MESURÉE`;
    }
    if (['Tennis de table', 'Badminton'].includes(aps)) {
        return `⚠️ SPORT DE RENVOI: Situation de référence = MATCH EN SIMPLE`;
    }
    return '';
}

function getOTI(niveau) {
    const otis = {
        '1AC': "L'élève doit acquérir une motricité correcte lui permettant de s'adapter aux situations et s'intégrer dans le groupe.",
        '2AC': "L'élève doit pouvoir ajuster l'énergie physique et fournir l'effort pour effectuer des réalisations coordonnées.",
        '3AC': "L'élève doit pouvoir ajuster les éléments de l'acte moteur et s'adapter aux différentes situations.",
        'TC': "L'élève doit pouvoir identifier et analyser différentes situations motrices.",
        '1AB': "L'élève doit pouvoir confronter et analyser différentes situations motrices et améliorer ses réalisations.",
        '2AB': "L'élève doit pouvoir analyser différentes situations et s'intégrer dans la réalisation de projets."
    };
    return otis[niveau] || "Développer les capacités motrices de l'élève.";
}

function getOTC(aps, niveau) {
    const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
    
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
        if (niveau === '1AC') return "Conserver la balle et participer au jeu collectif pour gagner.";
        if (niveau === '2AC') return "Progresser avec la balle et changer de rôle selon les situations.";
        if (niveau === '3AC') return "Participer au projet collectif avec passage rapide attaque/défense.";
        return "Rechercher le gain par la mise en œuvre de choix tactiques collectifs.";
    }
    
    if (aps === 'Gymnastique') {
        if (niveau === '1AC') return "Réaliser un enchaînement simple (3A 2B 0C) devant la classe.";
        if (niveau === '2AC') return "Présenter un enchaînement varié (3A 2B 1C) devant la classe.";
        if (niveau === '3AC') return "Concevoir et réaliser un projet d'enchaînement (2A 4B 1C).";
        return "Concevoir et réaliser un enchaînement gymnique personnel.";
    }
    
    return "Améliorer l'efficacité motrice et la performance sportive.";
}

function genererButPhase(objectif, aps) {
    const obj = objectif.toLowerCase();
    
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
        if (obj.includes('passe')) return "Enchaîner réception et passe pour la continuité du jeu.";
        if (obj.includes('tir')) return "Se placer et armer son tir pour marquer.";
        return "Effectuer les actions motrices adaptées à la situation de jeu.";
    }
    
    if (aps === 'Gymnastique') {
        return "Exécuter les éléments gymniques avec maîtrise et amplitude.";
    }
    
    return "Réaliser les actions motrices adaptées pour atteindre l'objectif.";
}

function getSituationReference(aps) {
    const sitRef = {
        'Handball': 'Match dirigé 7c7',
        'Football': 'Match dirigé 7c7',
        'Basketball': 'Match dirigé 5c5',
        'Volleyball': 'Match dirigé 6c6',
        'Gymnastique': 'Enchaînement gymnique devant la classe',
        'Tennis de table': 'Match en simple (11 points)',
        'Badminton': 'Match en simple (21 points)',
        'Course de vitesse': '2 courses chronométrées',
        'Saut en longueur': '3 essais mesurés',
        'Lancer de poids': '3 essais mesurés'
    };
    return sitRef[aps] || 'Situation d\'application dirigée';
}

function getGroupeAPS(aps) {
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) return 'Sport collectif';
    if (['Course de vitesse', 'Saut en longueur', 'Lancer de poids', 'Course de relais'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sport de renvoi';
    return 'Sport individuel';
}

function generateWordHTML(apsFinale, niveau, objectif, nomProf, etablissement, anneeScolaire, numeroSeance, oti, otc, ficheCondensee, butPhaseFondamentale, sitRef, opReference) {
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche ${apsFinale} - ${niveau}</title>
<style>
    @page { size: 297mm 210mm; mso-page-orientation: landscape; margin: 0.5cm; }
    body { font-family: Calibri, Arial, sans-serif; font-size: 10pt; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1.5pt solid #000; padding: 5px; vertical-align: top; }
    .title-cell { text-align: center; font-size: 16pt; font-weight: bold; background: #1a5c3a; color: #fff; padding: 10px; }
    .label-cell { background: #e8e8e8; font-weight: bold; font-size: 9pt; text-align: center; width: 8%; }
    .value-cell { font-size: 9pt; }
    .main-header { background: #1a5c3a; color: #fff; font-weight: bold; text-align: center; font-size: 10pt; padding: 6px; }
    .partie-cell { font-weight: bold; text-align: center; background: #f5f5f5; }
    .footer-text { text-align: center; font-size: 8pt; color: #555; margin-top: 5px; }
</style>
</head>
<body>
<table style="margin-bottom:5px;">
    <tr>
        <td style="border:none; text-align:left;"><b>Professeur:</b> ${nomProf || '___________'}</td>
        <td style="border:none; text-align:center;"><b>Établissement:</b> ${etablissement || '___________'}</td>
        <td style="border:none; text-align:center;"><b>Année:</b> ${anneeScolaire || '20__/20__'}</td>
        <td style="border:none; text-align:right;"><b>Séance N°:</b> ${numeroSeance || 1}</td>
    </tr>
</table>

<table style="margin-bottom:5px;">
    <tr><td class="title-cell">FICHE DE PRÉPARATION - ${apsFinale.toUpperCase()}</td></tr>
</table>

<table style="margin-bottom:5px;">
    <tr>
        <td class="label-cell">Groupe APS</td>
        <td class="value-cell">${getGroupeAPS(apsFinale)}</td>
        <td class="label-cell">APS</td>
        <td class="value-cell">${apsFinale}</td>
        <td class="label-cell">Niveau</td>
        <td class="value-cell">${niveau}</td>
    </tr>
    <tr>
        <td class="label-cell">OTI</td>
        <td class="value-cell" colspan="5" style="font-size:8pt;">${oti}</td>
    </tr>
    <tr>
        <td class="label-cell">OTC</td>
        <td class="value-cell" colspan="5" style="font-size:8pt;">${otc}</td>
    </tr>
    <tr>
        <td class="label-cell" style="background:#1a5c3a; color:#fff;">OBJECTIF</td>
        <td class="value-cell" colspan="5" style="background:#f0f8f0; font-weight:bold;">${objectif}</td>
    </tr>
</table>

<table>
    <tr>
        <th class="main-header" style="width:9%;">PARTIES</th>
        <th class="main-header" style="width:6%;">DURÉE</th>
        <th class="main-header" style="width:32%;">CONTENU</th>
        <th class="main-header" style="width:13%;">BUT</th>
        <th class="main-header" style="width:20%;">C. RÉALISATION</th>
        <th class="main-header" style="width:20%;">C. RÉUSSITE</th>
    </tr>
    <tr>
        <td class="partie-cell">INTRODUCTIVE</td>
        <td style="text-align:center;">15 min</td>
        <td>• Prise en main<br>• Échauffement général<br>• Échauffement spécifique</td>
        <td>• Éveil psychique<br>• Activation cardio</td>
        <td>• Mobilisation progressive<br>• Montées genoux</td>
        <td>• FC augmentée<br>• Élèves échauffés</td>
    </tr>
    <tr>
        <td class="partie-cell">FONDAMENTALE</td>
        <td style="text-align:center;">35 min</td>
        <td>Situations d'apprentissage progressives<br><br><b>Situation de référence:</b><br>${sitRef}</td>
        <td>${butPhaseFondamentale}</td>
        <td>• Respect des consignes<br>• Coordination<br>• Placement correct</td>
        <td>• Réussites visibles<br>• Progression<br>• Objectif atteint</td>
    </tr>
    <tr>
        <td class="partie-cell">FINALE</td>
        <td style="text-align:center;">10 min</td>
        <td>• Retour au calme<br>• Étirements<br>• Bilan de séance</td>
        <td>• Récupérer<br>• Feedback élèves</td>
        <td>• Respiration contrôlée<br>• Étirements tenus</td>
        <td>• FC normale<br>• Participation bilan</td>
    </tr>
</table>

<div class="footer-text">Conforme aux ${opReference} | Ministère de l'Éducation Nationale - Maroc</div>
</body>
</html>`;
}