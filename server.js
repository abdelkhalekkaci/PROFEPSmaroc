const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CLÉ API GROQ - Utilise UNIQUEMENT la variable d'environnement (PAS de clé en dur!)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Servir explicitement le dossier images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API de génération de fiches
app.post('/api/generer-fiche', async (req, res) => {
    console.log('📥 Requête reçue:', req.body);
    
    try {
        const { aps, apsAutre, objectif, niveau, nomProf, etablissement, anneeScolaire } = req.body;
        const apsFinale = aps === 'Autre' ? apsAutre : aps;

        if (!apsFinale || !objectif) {
            return res.status(400).json({ 
                success: false, 
                error: 'Paramètres manquants (APS et objectif requis)' 
            });
        }
        
        if (!GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Clé API non configurée. Ajoutez GROQ_API_KEY dans les variables d\'environnement Vercel'
            });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const cycleLabel = isCollege ? 'collège' : 'lycée';
        const opReference = isCollege ? 'Orientations Pédagogiques 2009' : 'Orientations Pédagogiques 2007';
        
        const getAPSRules = (aps) => {
            if (aps === 'Gymnastique') {
                return `⚠️ GYMNASTIQUE: Situation de référence = ENCHAÎNEMENT GYMNIQUE (PAS de match!)`;
            }
            if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
                return `⚠️ ${aps.toUpperCase()}: Situation de référence = MATCH DIRIGÉ`;
            }
            if (['Course de vitesse', 'Saut en longueur', 'Lancer de poids'].includes(aps)) {
                return `⚠️ ATHLÉTISME: Situation de référence = PERFORMANCE MESURÉE`;
            }
            return '';
        };
        
        const apsRules = getAPSRules(apsFinale);
        
        const promptUnifie = `Tu es un expert en EPS au Maroc. Génère une fiche pour ${apsFinale} niveau ${niveau} (${cycleLabel}).

**OBJECTIF:** ${objectif}
**RÉFÉRENCE:** ${opReference}
**SÉANCE N°:** ${req.body.numeroSeance || 1}

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
**PARTIE FONDAMENTALE:** 
- Conditions: [terrain, groupes, matériel]
- Consignes: [4 consignes]
- Variables: Simplifier/Complexifier
- Situation référence: [selon APS]
- But: ${objectif}
- Critères RÉALISATION: [4 critères gestes]
- Critères RÉUSSITE: [3 critères résultats]
**PARTIE FINALE:** Retour au calme, bilan

===SEPARATEUR===

**VIDÉOS:** 3 vidéos YouTube pour "${apsFinale} ${objectif}"`;

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

        const parties = contenuComplet.split('===SEPARATEUR===');
        const ficheDetaillee = parties[0]?.trim() || 'Version détaillée non disponible';
        const ficheCondensee = parties[1]?.trim() || 'Version condensée non disponible';
        const videos = parties[2]?.trim() || 'Vidéos non disponibles';

        let oti = '';
        switch(niveau) {
            case '1AC': oti = "L'élève doit acquérir une motricité correcte pour s'adapter aux situations."; break;
            case '2AC': oti = "L'élève doit ajuster l'énergie physique pour des réalisations coordonnées."; break;
            case '3AC': oti = "L'élève doit ajuster les éléments de l'acte moteur aux différentes situations."; break;
            case 'TC': oti = "L'élève doit identifier et analyser différentes situations motrices."; break;
            case '1AB': oti = "L'élève doit confronter et analyser différentes situations motrices."; break;
            case '2AB': oti = "L'élève doit analyser les situations et s'intégrer dans des projets."; break;
            default: oti = "Développer les capacités motrices de l'élève.";
        }

        const otc = getOTC(apsFinale, niveau);
        const butPhase = genererButPhase(objectif, apsFinale);
        const numeroSeance = req.body.numeroSeance || '1';
        const sitRef = getSituationReference(apsFinale);

        const html = generateWordHTML(apsFinale, niveau, objectif, nomProf, etablissement, anneeScolaire, numeroSeance, oti, otc, butPhase, sitRef, opReference);

        res.json({
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
        res.status(500).json({ success: false, error: error.message });
    }
});

function getGroupeAPS(aps) {
    if (['Handball', 'Football', 'Basketball', 'Volleyball', 'Rugby'].includes(aps)) return 'Sport collectif';
    if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Course de relais', 'Course de durée', 'Lancer de poids'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sport de renvoi';
    return 'Sport individuel';
}

function getOTC(aps, niveau) {
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
        if (niveau === '1AC') return "Conserver la balle et participer au jeu collectif.";
        if (niveau === '2AC') return "Progresser avec la balle et changer de rôle.";
        if (niveau === '3AC') return "Participer au projet collectif attaque/défense.";
        return "Rechercher le gain par des choix tactiques collectifs.";
    }
    if (aps === 'Gymnastique') {
        if (niveau === '1AC') return "Réaliser un enchaînement simple (3A 2B 0C).";
        if (niveau === '2AC') return "Présenter un enchaînement varié (3A 2B 1C).";
        if (niveau === '3AC') return "Concevoir un enchaînement (2A 4B 1C).";
        return "Concevoir et réaliser un enchaînement personnel.";
    }
    return "Améliorer l'efficacité motrice et sportive.";
}

function genererButPhase(objectif, aps) {
    const obj = objectif.toLowerCase();
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
        if (obj.includes('passe')) return "Enchaîner réception et passe.";
        if (obj.includes('tir')) return "Se placer et armer son tir.";
        return "Effectuer les actions adaptées au jeu.";
    }
    if (aps === 'Gymnastique') return "Exécuter les éléments avec maîtrise.";
    return "Réaliser les actions pour atteindre l'objectif.";
}

function getSituationReference(aps) {
    const sitRef = {
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
    return sitRef[aps] || 'Situation d\'application';
}

function generateWordHTML(apsFinale, niveau, objectif, nomProf, etablissement, anneeScolaire, numeroSeance, oti, otc, butPhase, sitRef, opReference) {
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
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
<td style="border:none;text-align:right"><b>Séance N°:</b> ${numeroSeance}</td>
</tr></table>
<table style="margin-bottom:5px"><tr><td class="title">FICHE DE PRÉPARATION - ${apsFinale.toUpperCase()}</td></tr></table>
<table style="margin-bottom:5px">
<tr><td class="label">Groupe</td><td>${getGroupeAPS(apsFinale)}</td><td class="label">APS</td><td>${apsFinale}</td><td class="label">Niveau</td><td>${niveau}</td></tr>
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
}

app.listen(PORT, () => {
    console.log(`🚀 Serveur EPS: http://localhost:${PORT}`);
    console.log('⚠️ Configurez GROQ_API_KEY dans les variables d\'environnement');
});