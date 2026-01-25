module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { aps, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance } = req.body;
        if (!aps || !objectif || !niveau) return res.status(400).json({ success: false, error: 'APS, objectif et niveau requis' });

        // ==================== DONNÉES OFFICIELLES OP 2007 & 2009 ====================
        
        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const opReference = isCollege ? 'Orientations Pédagogiques 2009' : 'Orientations Pédagogiques 2007';

        // OTI officiels
        const OTI = {
            '1AC': "L'élève de la 1ère année doit acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
            '2AC': "L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et s'accoutumer à commander et à être commandé pour réaliser différents rôles.",
            '3AC': "L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adaptation aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
            'TC': "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.",
            '1AB': "L'élève de la 1ère année Bac doit pouvoir confronter et analyser différentes situations motrices et améliorer ses réalisations et faire progresser son efficacité motrice et sa performance sportive.",
            '2AB': "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs."
        };

        // OTC Sports Collectifs (Handball, Football, Basketball, Volleyball)
        const OTC_SPORTS_COLLECTIFS = {
            '1AC': "L'élève doit pouvoir conserver la balle et participer au jeu collectif pour gagner la rencontre.",
            '2AC': "L'élève doit pouvoir gagner la rencontre par la réalisation de déplacements variés pour une progression avec la balle et un changement de rôle en fonction des situations proposées.",
            '3AC': "L'élève doit pouvoir participer dans la réalisation du projet collectif basé sur le passage rapide et adéquat de l'attaque à la défense pour gagner la rencontre.",
            'TC': "Rechercher le gain de la rencontre par l'utilisation de moyens adaptés pour conserver la balle jusqu'à la zone adverse devant une défense organisée qui cherche à récupérer la balle et défendre sa cible.",
            '1AB': "Rechercher le gain de la rencontre par la mise en œuvre de choix tactiques collectifs, fondés sur la vitesse d'exécution (trouver le moyen d'arriver le plus tôt possible à la cible adverse entre 2 ou plusieurs joueurs) avec une bonne gestion des ressources devant une défense qui réduit l'espace de jeu.",
            '2AB': "Rechercher le gain de la rencontre par la mise en place d'une attaque basée sur la maîtrise des rôles et l'occupation permanente et raisonnée de l'espace par un projet collectif devant une défense organisée qui cherche à récupérer la balle et défendre sa cible."
        };

        // OTC Athlétisme
        const OTC_ATHLETISME = {
            '1AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour construire de nouveaux repères afin de réaliser des performances individuelles et collectives générales et correctes.",
            '2AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour consolider les habiletés et améliorer un niveau de performance.",
            '3AC': "L'élève doit pouvoir gérer l'effort physique pour réaliser des prestations correctes et efficaces suivant ses exigences organisationnelles et réglementaires et réaliser un niveau de performance individuel et collectif.",
            'TC': "L'élève doit maîtriser l'organisation de son corps et la gestion de l'effort et l'adéquation de la réalisation d'une façon globale et correcte pour mobiliser un certain niveau d'habileté ou de performance pour réduire le temps ou élargir l'espace.",
            '1AB': "L'élève doit maîtriser l'organisation de son corps et la gestion de l'effort et l'adéquation de la réalisation pour mobiliser un certain niveau d'habileté et augmenter l'efficacité de la performance.",
            '2AB': "L'élève doit maîtriser l'organisation des conditions de défi par l'utilisation de moyens et de méthodes stratégiques pour mobiliser un certain niveau de performance suivant un projet collectif ou individuel."
        };

        // OTC Gymnastique
        const OTC_GYMNASTIQUE = {
            '1AC': "L'élève doit pouvoir se confirmer et s'adapter à des mouvements inhabituels pour réaliser un enchaînement simple d'éléments gymniques devant le groupe classe. Composé de : 3A 2B 0C",
            '2AC': "L'élève doit pouvoir maîtriser, organiser son corps et prendre le risque pour présenter un enchaînement gymnique varié en éléments et en rythme devant le groupe classe. Composé de : 3A 2B 1C",
            '3AC': "L'élève doit pouvoir concevoir et réaliser un projet individuel sous forme d'enchaînement d'éléments gymniques devant le groupe classe, comprendre, expliquer et développer ses composantes. Composé de : 2A 4B 1C",
            'TC': "L'élève doit pouvoir présenter un projet individuel ou collectif d'expression motrice sous forme d'enchaînement d'éléments gymniques devant le groupe classe. Composé de : 2A 3B 2C",
            '1AB': "L'élève doit pouvoir organiser, présenter et réaliser un projet individuel ou collectif d'expression motrice sous forme d'enchaînement d'éléments gymniques devant le groupe classe. Composé de : 2B 3C 2D",
            '2AB': "L'élève doit pouvoir concevoir, réaliser et juger un projet individuel ou collectif d'expression motrice sous forme d'enchaînement d'éléments variés en figure et en rythme devant le groupe classe. Composé de : 2C 3D 2E"
        };

        // OTC Sports de Renvoi (Tennis de table, Badminton, Volleyball)
        const OTC_SPORTS_RENVOI = {
            '1AC': "Rechercher le gain de la rencontre par un déplacement et un placement adéquats pour défendre son camp et renvoyer la balle vers le camp adverse.",
            '2AC': "Rechercher le gain de la rencontre par un déplacement et un placement adéquats pour un renvoi indirect de la balle vers le camp adverse et gagner le point.",
            '3AC': "Rechercher le gain de la rencontre par une défense de terrain et l'orientation de la balle vers la zone avant, avant de la renvoyer.",
            'TC': "Rechercher le gain de la rencontre par la mise en œuvre d'un jeu basé sur l'organisation collective pour défendre la cible et faciliter la progression de la balle vers la zone avant et la renvoyer dans la limite de 2 ou 3 touches.",
            '1AB': "Rechercher le gain de la rencontre par la mise en œuvre d'un jeu basé sur l'organisation collective pour récupérer la balle, la faire progresser et la renvoyer dans la limite de 3 touches.",
            '2AB': "Rechercher le gain de la rencontre par la mise en œuvre d'un jeu basé sur l'organisation collective pour récupérer la balle et la conserver et organiser les conditions adéquates pour marquer des points dans la limite de 3 touches."
        };

        // Déterminer le groupe APS et l'OTC approprié
        let groupeAPS = '';
        let otc = '';
        let situationReference = '';

        if (['Handball', 'Football', 'Basketball'].includes(aps)) {
            groupeAPS = 'Sports collectifs (marquage-démarquage)';
            otc = OTC_SPORTS_COLLECTIFS[niveau];
            situationReference = aps === 'Basketball' ? 'Match dirigé 5 contre 5' : 'Match dirigé 7 contre 7';
        } else if (aps === 'Volleyball') {
            groupeAPS = 'Sports collectifs (de renvoi)';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationReference = 'Match dirigé 6 contre 6';
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationReference = aps === 'Tennis de table' ? 'Match en simple (11 points)' : 'Match en simple (21 points)';
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            otc = OTC_ATHLETISME[niveau];
            if (aps === 'Course de vitesse') situationReference = '2 courses chronométrées sur 60m (collège) ou 100m (lycée)';
            else if (aps === 'Course de relais') situationReference = 'Course de relais 4x60m chronométrée';
            else if (aps === 'Saut en longueur') situationReference = '3 essais mesurés avec élan étalonné';
            else if (aps === 'Saut en hauteur') situationReference = '3 essais à hauteur progressive';
            else if (aps === 'Lancer de poids') situationReference = '3 essais mesurés';
            else if (aps === 'Course de durée') situationReference = 'Course de 12 minutes (test de Cooper)';
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            otc = OTC_GYMNASTIQUE[niveau];
            const compositions = { '1AC': '3A 2B 0C', '2AC': '3A 2B 1C', '3AC': '2A 4B 1C', 'TC': '2A 3B 2C', '1AB': '2B 3C 2D', '2AB': '2C 3D 2E' };
            situationReference = 'Présentation enchaînement gymnique (' + compositions[niveau] + ') devant le groupe classe';
        } else {
            groupeAPS = 'Activité physique';
            otc = "Développer les capacités motrices de l'élève.";
            situationReference = "Situation d'évaluation adaptée";
        }

        const oti = OTI[niveau];

        // ==================== PROMPT AMÉLIORÉ POUR GROQ ====================

        const prompt = `Tu es un expert en Éducation Physique et Sportive au Maroc. Génère une fiche de préparation PROFESSIONNELLE et TRÈS DÉTAILLÉE.

**INFORMATIONS :**
- APS : ${aps}
- Niveau : ${niveau} (${isCollege ? 'Collège - OP 2009' : 'Lycée - OP 2007'})
- Séance N° : ${numeroSeance || 1}
- Objectif : ${objectif}
- OTI : ${oti}
- OTC : ${otc}
- Situation de référence : ${situationReference}

**RÈGLES IMPORTANTES :**
🔵 CRITÈRES DE RÉALISATION = Ce que l'élève doit FAIRE (gestes, actions PENDANT l'exécution)
🟢 CRITÈRES DE RÉUSSITE = Ce que l'élève doit OBTENIR (résultat mesurable, quantifiable À LA FIN)

**GÉNÈRE EXACTEMENT CE FORMAT :**

<h2>📌 PARTIE INTRODUCTIVE (15 min)</h2>

<h3>🔹 Prise en main (3 min)</h3>
<p><strong>Déroulement :</strong> Rassemblement des élèves, appel, vérification des tenues sportives. Présentation claire de l'objectif de la séance : "${objectif}". Rappel des consignes de sécurité spécifiques à ${aps}.</p>

<h3>🔹 Échauffement général (7 min)</h3>
<p><strong>Déroulement :</strong></p>
<ul>
<li>Course légère autour du terrain (2 tours)</li>
<li>Mobilisation articulaire progressive : chevilles (rotations), genoux (flexions), hanches (rotations du bassin), épaules (circumductions), nuque (rotations lentes)</li>
<li>Exercices dynamiques : montées de genoux, talons-fesses, pas chassés latéraux, course arrière</li>
</ul>
<p><strong>Organisation :</strong> Élèves dispersés sur le terrain ou en cercle autour du professeur.</p>

<h3>🔹 Échauffement spécifique ${aps} (5 min)</h3>
<p><strong>Déroulement :</strong> [Génère 4-5 exercices spécifiques à ${aps} avec description précise]</p>
<p><strong>Organisation :</strong> [Décris la disposition des élèves]</p>

<hr>

<h2>⚡ PARTIE FONDAMENTALE (35 min)</h2>

<h3>🎯 SITUATION D'APPRENTISSAGE 1 : [Titre descriptif] (12 min)</h3>

<p><strong>📐 DISPOSITIF :</strong></p>
<div style="background:#f0f8f0;border:2px dashed #1a5c3a;padding:15px;margin:10px 0;">
<pre style="font-family:monospace;font-size:10px;">
[Génère un schéma ASCII détaillé montrant :
- Les dimensions du terrain (ex: 20m x 15m)
- Le placement des joueurs (△ = attaquants, ○ = défenseurs, ● = ballon)
- Les zones (utilisé des lignes |---|)
- La direction des déplacements (→ ← ↑ ↓)
- Les plots/cônes (X)
]
</pre>
<p><em>Matériel : [Liste précise du matériel nécessaire]</em></p>
</div>

<p><strong>📋 DÉROULEMENT :</strong></p>
<p>[Décris en détail étape par étape comment se déroule l'exercice : position de départ, signal, actions des joueurs, rotation, durée de chaque passage, etc. Minimum 5-6 phrases.]</p>

<p><strong>📢 CONSIGNES :</strong></p>
<ol>
<li>[Consigne 1 précise et claire]</li>
<li>[Consigne 2]</li>
<li>[Consigne 3]</li>
<li>[Consigne 4]</li>
</ol>

<p><strong>🔄 VARIANTES :</strong></p>
<ul>
<li><strong>Pour simplifier :</strong> [Décris comment rendre l'exercice plus facile pour les élèves en difficulté]</li>
<li><strong>Pour complexifier :</strong> [Décris comment rendre l'exercice plus difficile pour les élèves avancés]</li>
</ul>

<p><strong>🔵 CRITÈRES DE RÉALISATION (ce que l'élève doit FAIRE) :</strong></p>
<ul>
<li>[Geste technique 1 - ex: Placer son pied d'appui à côté du ballon]</li>
<li>[Geste technique 2 - ex: Garder le regard sur la cible avant la passe]</li>
<li>[Geste technique 3 - ex: Accompagner le geste avec le bras]</li>
</ul>

<p><strong>🟢 CRITÈRES DE RÉUSSITE (ce que l'élève doit OBTENIR) :</strong></p>
<ul>
<li>[Résultat quantifiable 1 - ex: Réussir 7 passes sur 10]</li>
<li>[Résultat quantifiable 2 - ex: Atteindre la cible 3 fois sur 5]</li>
</ul>

<h3>🎯 SITUATION D'APPRENTISSAGE 2 : [Titre - situation plus complexe] (13 min)</h3>
[MÊME STRUCTURE DÉTAILLÉE - Cette situation doit être plus proche du jeu réel avec opposition]

<h3>🏆 SITUATION DE RÉFÉRENCE (10 min)</h3>
<p><strong>Description :</strong> ${situationReference}</p>
<p><strong>Organisation :</strong> [Formation des équipes, rotation, rôle des observateurs/arbitres élèves]</p>
<p><strong>Règles adaptées :</strong> [Règles simplifiées ou spécifiques au niveau ${niveau}]</p>
<p><strong>Critères d'observation :</strong></p>
<ul>
<li>[Critère 1 en lien direct avec l'objectif de la séance]</li>
<li>[Critère 2 en lien avec l'OTC]</li>
</ul>

<hr>

<h2>🧘 PARTIE FINALE (10 min)</h2>

<h3>🔹 Retour au calme (5 min)</h3>
<ul>
<li>Marche lente en respirant profondément (1 min)</li>
<li>Étirements des quadriceps (maintenir 20 sec chaque jambe)</li>
<li>Étirements des ischio-jambiers (20 sec)</li>
<li>Étirements des adducteurs (20 sec)</li>
<li>Étirements des mollets (20 sec)</li>
<li>Étirements des épaules et bras (20 sec)</li>
</ul>

<h3>🔹 Bilan (5 min)</h3>
<p><strong>Questions aux élèves :</strong></p>
<ul>
<li>"Qu'avez-vous appris aujourd'hui ?"</li>
<li>"Quelles difficultés avez-vous rencontrées ?"</li>
<li>"Comment pourriez-vous vous améliorer ?"</li>
</ul>
<p><strong>Feedback du professeur :</strong> Synthèse des points positifs observés, axes d'amélioration pour la prochaine séance, annonce du contenu de la séance suivante.</p>
<p><strong>Rangement :</strong> Désignation des élèves responsables du rangement du matériel.</p>

===SEPARATEUR===

**VIDÉOS YOUTUBE RECOMMANDÉES pour ${aps} :**
1. [Titre vidéo pédagogique 1] - Tutoriel technique de base
2. [Titre vidéo 2] - Exercices d'entraînement
3. [Titre vidéo 3] - Situations de jeu`;

        // Appel API Groq
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
            const err = await groqResponse.json();
            throw new Error(err.error?.message || 'Erreur Groq API');
        }

        const groqData = await groqResponse.json();
        const contenuComplet = groqData.choices[0].message.content;

        const parties = contenuComplet.split('===SEPARATEUR===');
        const ficheDetaillee = parties[0]?.trim() || contenuComplet;
        const videos = parties[1]?.trim() || '';

        // ==================== GÉNÉRATION HTML WORD AMÉLIORÉ ====================

        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<title>Fiche ${aps} - ${niveau}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm 0.4cm}
@page Section1{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm 0.4cm}
div.Section1{page:Section1}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Calibri',Arial,sans-serif;font-size:9pt;line-height:1.15;color:#000}
table{width:100%;border-collapse:collapse}
th,td{border:1.5pt solid #000;padding:3px 4px;vertical-align:top}
.header-table td{border:none;padding:2px 5px;font-size:9pt}
.title-cell{text-align:center;font-size:14pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:5px;border:2pt solid #000}
.label-cell{background:#e8e8e8;font-weight:bold;font-size:7.5pt;width:6%;text-align:center}
.value-cell{font-size:7.5pt}
.objectif-label{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:8pt}
.objectif-value{background:#f0f8f0;font-size:8pt;font-weight:bold}
.main-header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:8pt;padding:3px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:8pt;width:7%}
.duree-cell{text-align:center;font-weight:bold;font-size:8pt;width:5%}
.contenu-cell{width:35%;font-size:7.5pt;line-height:1.2}
.but-cell{width:11%;font-size:7.5pt;line-height:1.2}
.critere-cell{width:21%;font-size:7.5pt;line-height:1.2}
.footer-text{text-align:center;font-size:7pt;color:#555;margin-top:2px}
.schema-box{background:#f9f9f9;border:1px dashed #1a5c3a;padding:4px;margin:2px 0;font-size:7pt}
</style>
</head>
<body>
<div class="Section1">

<table class="header-table" style="margin-bottom:1px">
<tr>
<td style="text-align:left;width:27%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="text-align:center;width:33%"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="text-align:center;width:22%"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
<td style="text-align:right;width:18%"><b>Séance N°:</b> ${numeroSeance || 1}</td>
</tr>
</table>

<table style="margin-bottom:1px">
<tr><td class="title-cell">FICHE DE PRÉPARATION D'UNE SÉANCE - ${aps.toUpperCase()}</td></tr>
</table>

<table style="margin-bottom:1px">
<tr>
<td class="label-cell">Groupe APS</td>
<td class="value-cell" style="width:19%">${groupeAPS}</td>
<td class="label-cell">APS</td>
<td class="value-cell" style="width:14%">${aps}</td>
<td class="label-cell">Niveau</td>
<td class="value-cell" style="width:8%">${niveau}</td>
<td class="label-cell">Durée</td>
<td class="value-cell" style="width:8%">60 min</td>
</tr>
<tr>
<td class="label-cell">OTI</td>
<td class="value-cell" colspan="7" style="font-size:7pt;line-height:1.15">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td class="value-cell" colspan="7" style="font-size:7pt;line-height:1.15">${otc}</td>
</tr>
<tr>
<td class="objectif-label">OBJECTIF SÉANCE</td>
<td class="objectif-value" colspan="7">${objectif}</td>
</tr>
</table>

<table>
<thead>
<tr>
<th class="main-header" style="width:7%">PARTIES</th>
<th class="main-header" style="width:5%">DURÉE</th>
<th class="main-header" style="width:35%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="main-header" style="width:11%">BUT</th>
<th class="main-header" style="width:21%">CRITÈRES DE RÉALISATION</th>
<th class="main-header" style="width:21%">CRITÈRES DE RÉUSSITE</th>
</tr>
</thead>
<tbody>
<tr>
<td class="partie-cell">INTRO-<br>DUCTIVE</td>
<td class="duree-cell">15<br>min</td>
<td class="contenu-cell">
<b>• Prise en main (3 min):</b><br>
- Appel, vérification tenues<br>
- Présentation objectif: "${objectif}"<br>
- Consignes de sécurité<br><br>
<b>• Échauffement général (7 min):</b><br>
- Course légère (2 tours)<br>
- Mobilisation articulaire (chevilles→nuque)<br>
- Montées genoux, talons-fesses, pas chassés<br><br>
<b>• Échauffement spécifique (5 min):</b><br>
- Exercices avec ballon/matériel ${aps}<br>
- Gammes techniques de base
</td>
<td class="but-cell">
• Préparer l'organisme à l'effort<br><br>
• Éveil psychique<br><br>
• Activation cardio-vasculaire<br><br>
• Prévention blessures
</td>
<td class="critere-cell">
• Mobilisation progressive (bas→haut)<br>
• Augmentation progressive intensité<br>
• Respiration contrôlée<br>
• Exécution correcte des mouvements<br>
• Engagement de tous les élèves
</td>
<td class="critere-cell">
• FC augmentée (120-140 bpm)<br>
• Légère transpiration<br>
• Élèves concentrés et attentifs<br>
• 100% des élèves participent<br>
• Pas de blessure
</td>
</tr>
<tr>
<td class="partie-cell">FONDA-<br>MENTALE</td>
<td class="duree-cell">35<br>min</td>
<td class="contenu-cell">
<b>• SITUATION 1 (12 min):</b><br>
<div class="schema-box">
Dispositif: Terrain réduit, groupes de 4-6 élèves<br>
△=Attaquants ○=Défenseurs X=Plots ●=Ballon
</div>
Exercice analytique ciblant l'objectif<br>
<i>Variantes:</i> Simplifier (réduire opposition) / Complexifier (ajouter contrainte temps)<br><br>

<b>• SITUATION 2 (13 min):</b><br>
<div class="schema-box">
Jeu réduit avec opposition réelle
</div>
Situation globale proche du jeu<br>
Application objectif en contexte match<br><br>

<b>• SITUATION RÉFÉRENCE (10 min):</b><br>
${situationReference}<br>
Évaluation des acquis - Observation critériée
</td>
<td class="but-cell">
• Atteindre l'objectif de la séance<br><br>
• Développer compétences motrices<br><br>
• Appliquer en situation réelle<br><br>
• Évaluer les acquis
</td>
<td class="critere-cell">
<b>Sit. 1:</b><br>
• Placement correct avant action<br>
• Regard orienté vers partenaire/cible<br>
• Geste technique approprié<br><br>
<b>Sit. 2:</b><br>
• Prise d'information avant action<br>
• Choix adapté à la situation<br><br>
<b>Sit. Réf:</b><br>
• Application règles<br>
• Engagement dans le jeu
</td>
<td class="critere-cell">
<b>Sit. 1:</b><br>
• 7 réussites sur 10 essais<br>
• Taux réussite > 70%<br><br>
<b>Sit. 2:</b><br>
• Actions efficaces observées<br>
• Progression visible<br><br>
<b>Sit. Réf:</b><br>
• Participation active 100%<br>
• Objectif séance démontré
</td>
</tr>
<tr>
<td class="partie-cell">FINALE</td>
<td class="duree-cell">10<br>min</td>
<td class="contenu-cell">
<b>• Retour au calme (5 min):</b><br>
- Marche lente, respiration profonde<br>
- Étirements: quadriceps, ischio-jambiers, adducteurs, mollets (20s chaque)<br><br>
<b>• Bilan séance (5 min):</b><br>
- Questions: "Qu'avez-vous appris?"<br>
- Feedback professeur<br>
- Rangement matériel
</td>
<td class="but-cell">
• Récupération physique<br><br>
• Retour au calme<br><br>
• Feedback formatif<br><br>
• Préparer prochaine séance
</td>
<td class="critere-cell">
• Marche lente contrôlée<br>
• Respiration abdominale profonde<br>
• Étirements tenus sans à-coups<br>
• Écoute active pendant bilan<br>
• Participation aux échanges
</td>
<td class="critere-cell">
• FC revenue normale (<100 bpm)<br>
• Élèves calmes et détendus<br>
• Réponses pertinentes aux questions<br>
• Matériel rangé correctement<br>
• Départ ordonné
</td>
</tr>
</tbody>
</table>

<div class="footer-text">
Conforme aux ${opReference} | Ministère de l'Éducation Nationale - Royaume du Maroc | Généré par Prof EPS
</div>

</div>
</body>
</html>`;

        return res.status(200).json({
            success: true,
            ficheDetaillee,
            videos,
            html,
            filename: `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`,
            oti,
            otc,
            situationReference,
            groupeAPS,
            opReference
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
