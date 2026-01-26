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

        // Niveau de complexité selon le niveau scolaire
        const niveauComplexite = {
            '1AC': { label: 'Initiation', nbJoueurs: '3c3 ou 4c4', difficulte: 'simple', terrain: 'réduit', exigence: 'découverte et apprentissage des bases' },
            '2AC': { label: 'Apprentissage', nbJoueurs: '4c4 ou 5c5', difficulte: 'modérée', terrain: 'moyen', exigence: 'consolidation des acquis' },
            '3AC': { label: 'Consolidation', nbJoueurs: '5c5 ou 6c6', difficulte: 'intermédiaire', terrain: 'normal', exigence: 'application tactique' },
            'TC': { label: 'Perfectionnement', nbJoueurs: '5c5 ou 7c7', difficulte: 'avancée', terrain: 'normal', exigence: 'intégration dans le groupe' },
            '1AB': { label: 'Maîtrise', nbJoueurs: '6c6 ou 7c7', difficulte: 'complexe', terrain: 'réglementaire', exigence: 'efficacité et performance' },
            '2AB': { label: 'Expertise', nbJoueurs: '7c7', difficulte: 'très complexe', terrain: 'réglementaire', exigence: 'projet collectif et autonomie' }
        };

        // OTI officiels
        const OTI = {
            '1AC': "L'élève de la 1ère année doit acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
            '2AC': "L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et s'accoutumer à commander et à être commandé pour réaliser différents rôles.",
            '3AC': "L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adaptation aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
            'TC': "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.",
            '1AB': "L'élève de la 1ère année Bac doit pouvoir confronter et analyser différentes situations motrices et améliorer ses réalisations et faire progresser son efficacité motrice et sa performance sportive.",
            '2AB': "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs."
        };

        // OTC Sports Collectifs
        const OTC_SPORTS_COLLECTIFS = {
            '1AC': "L'élève doit pouvoir conserver la balle et participer au jeu collectif pour gagner la rencontre.",
            '2AC': "L'élève doit pouvoir gagner la rencontre par la réalisation de déplacements variés pour une progression avec la balle et un changement de rôle en fonction des situations proposées.",
            '3AC': "L'élève doit pouvoir participer dans la réalisation du projet collectif basé sur le passage rapide et adéquat de l'attaque à la défense pour gagner la rencontre.",
            'TC': "Rechercher le gain de la rencontre par l'utilisation de moyens adaptés pour conserver la balle jusqu'à la zone adverse devant une défense organisée qui cherche à récupérer la balle et défendre sa cible.",
            '1AB': "Rechercher le gain de la rencontre par la mise en œuvre de choix tactiques collectifs, fondés sur la vitesse d'exécution avec une bonne gestion des ressources devant une défense qui réduit l'espace de jeu.",
            '2AB': "Rechercher le gain de la rencontre par la mise en place d'une attaque basée sur la maîtrise des rôles et l'occupation permanente et raisonnée de l'espace par un projet collectif."
        };

        // OTC Athlétisme
        const OTC_ATHLETISME = {
            '1AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour construire de nouveaux repères afin de réaliser des performances individuelles et collectives générales et correctes.",
            '2AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour consolider les habiletés et améliorer un niveau de performance.",
            '3AC': "L'élève doit pouvoir gérer l'effort physique pour réaliser des prestations correctes et efficaces suivant ses exigences organisationnelles et réglementaires.",
            'TC': "L'élève doit maîtriser l'organisation de son corps et la gestion de l'effort pour mobiliser un certain niveau d'habileté ou de performance pour réduire le temps ou élargir l'espace.",
            '1AB': "L'élève doit maîtriser l'organisation de son corps et la gestion de l'effort pour mobiliser un certain niveau d'habileté et augmenter l'efficacité de la performance.",
            '2AB': "L'élève doit maîtriser l'organisation des conditions de défi par l'utilisation de moyens et de méthodes stratégiques pour mobiliser un certain niveau de performance."
        };

        // OTC Gymnastique
        const OTC_GYMNASTIQUE = {
            '1AC': "L'élève doit réaliser un enchaînement simple d'éléments gymniques devant le groupe classe. Composé de : 3A 2B 0C",
            '2AC': "L'élève doit présenter un enchaînement gymnique varié en éléments et en rythme devant le groupe classe. Composé de : 3A 2B 1C",
            '3AC': "L'élève doit concevoir et réaliser un projet individuel sous forme d'enchaînement devant le groupe classe. Composé de : 2A 4B 1C",
            'TC': "L'élève doit présenter un projet d'expression motrice sous forme d'enchaînement gymnique devant le groupe classe. Composé de : 2A 3B 2C",
            '1AB': "L'élève doit organiser et réaliser un projet d'expression motrice sous forme d'enchaînement gymnique. Composé de : 2B 3C 2D",
            '2AB': "L'élève doit concevoir, réaliser et juger un projet d'expression motrice varié en figure et en rythme. Composé de : 2C 3D 2E"
        };

        // OTC Sports de Renvoi
        const OTC_SPORTS_RENVOI = {
            '1AC': "Rechercher le gain de la rencontre par un déplacement et un placement adéquats pour défendre son camp et renvoyer la balle vers le camp adverse.",
            '2AC': "Rechercher le gain de la rencontre par un déplacement et un placement adéquats pour un renvoi indirect de la balle vers le camp adverse.",
            '3AC': "Rechercher le gain de la rencontre par une défense de terrain et l'orientation de la balle vers la zone avant.",
            'TC': "Rechercher le gain par un jeu basé sur l'organisation collective pour défendre et renvoyer dans la limite de 2 ou 3 touches.",
            '1AB': "Rechercher le gain par un jeu basé sur l'organisation collective pour récupérer et renvoyer dans la limite de 3 touches.",
            '2AB': "Rechercher le gain par un jeu basé sur l'organisation collective pour récupérer, conserver et marquer des points."
        };

        // Déterminer le groupe APS et l'OTC
        let groupeAPS, otc, situationReference;

        if (['Handball', 'Football', 'Basketball'].includes(aps)) {
            groupeAPS = 'Sports collectifs (marquage-démarquage)';
            otc = OTC_SPORTS_COLLECTIFS[niveau];
            situationReference = aps === 'Basketball' ? 'Match dirigé 5c5' : 'Match dirigé 7c7';
        } else if (aps === 'Volleyball') {
            groupeAPS = 'Sports collectifs (de renvoi)';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationReference = 'Match dirigé 6c6';
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationReference = aps === 'Tennis de table' ? 'Match simple (11 pts)' : 'Match simple (21 pts)';
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            otc = OTC_ATHLETISME[niveau];
            const sitRef = {
                'Course de vitesse': '2 courses chronométrées 60m/100m',
                'Course de relais': 'Relais 4x60m chronométré',
                'Saut en longueur': '3 essais mesurés',
                'Saut en hauteur': '3 essais à hauteur progressive',
                'Lancer de poids': '3 essais mesurés',
                'Course de durée': 'Course 12 min (Cooper)'
            };
            situationReference = sitRef[aps];
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            otc = OTC_GYMNASTIQUE[niveau];
            const comp = { '1AC': '3A 2B 0C', '2AC': '3A 2B 1C', '3AC': '2A 4B 1C', 'TC': '2A 3B 2C', '1AB': '2B 3C 2D', '2AB': '2C 3D 2E' };
            situationReference = `Enchaînement (${comp[niveau]}) devant classe`;
        } else {
            groupeAPS = 'Activité physique';
            otc = "Développer les capacités motrices.";
            situationReference = "Situation d'évaluation adaptée";
        }

        const oti = OTI[niveau];
        const niveauInfo = niveauComplexite[niveau];

        // ==================== PROMPT TRÈS DÉTAILLÉ ====================

        const prompt = `Tu es un expert en Éducation Physique et Sportive au Maroc avec 20 ans d'expérience. Tu dois générer une fiche de séance TRÈS PROFESSIONNELLE et DÉTAILLÉE.

**═══════════════════════════════════════════════════════════════**
**INFORMATIONS DE LA SÉANCE**
**═══════════════════════════════════════════════════════════════**

📚 **Référentiel:** ${opReference}
🎯 **APS:** ${aps}
📊 **Niveau:** ${niveau} (${isCollege ? 'Collège' : 'Lycée'}) - Phase de ${niveauInfo.label}
📝 **Séance N°:** ${numeroSeance || 1}
⏱️ **Durée:** 60 minutes

**OBJECTIF DE LA SÉANCE:** ${objectif}

**CADRE OFFICIEL:**
• OTI: ${oti}
• OTC: ${otc}
• Situation de référence: ${situationReference}

**NIVEAU D'EXIGENCE:** ${niveauInfo.exigence}
**COMPLEXITÉ:** ${niveauInfo.difficulte}
**FORMAT DE JEU ADAPTÉ:** ${niveauInfo.nbJoueurs}

**═══════════════════════════════════════════════════════════════**
**CONSIGNES IMPORTANTES À RESPECTER**
**═══════════════════════════════════════════════════════════════**

1️⃣ **DISTINCTION OBJECTIF vs BUT:**
   - OBJECTIF DE SÉANCE = Ce que l'élève doit APPRENDRE (compétence visée)
   - BUT DE LA PHASE FONDAMENTALE = Ce que l'élève doit RÉALISER concrètement dans les situations

2️⃣ **SCHÉMAS OBLIGATOIRES:**
   Chaque situation DOIT avoir un schéma ASCII détaillé avec:
   - Dimensions du terrain (en mètres)
   - Position des joueurs: △ (attaquants), ○ (défenseurs), ● (ballon)
   - Zones délimitées avec lignes: ═══ (horizontales), ║ (verticales)
   - Plots/cônes: ◆ ou X
   - Flèches de déplacement: → ← ↑ ↓ ↗ ↘
   - But/Cible: ▢ ou [BUT]

3️⃣ **ADAPTATION AU NIVEAU ${niveau}:**
   - Vocabulaire adapté (${isCollege ? 'simple et concret pour le collège' : 'plus technique pour le lycée'})
   - Complexité ${niveauInfo.difficulte}
   - Nombre de joueurs: ${niveauInfo.nbJoueurs}
   - Exigence: ${niveauInfo.exigence}

4️⃣ **CRITÈRES DISTINCTS:**
   🔵 RÉALISATION = COMMENT faire (gestes techniques PENDANT l'action)
   🟢 RÉUSSITE = QUOI obtenir (résultat mesurable/quantifiable À LA FIN)

**═══════════════════════════════════════════════════════════════**
**GÉNÈRE LA FICHE AVEC CE FORMAT EXACT:**
**═══════════════════════════════════════════════════════════════**

<h2>📌 PARTIE INTRODUCTIVE (15 min)</h2>

<h3>🔹 Prise en main (3 min)</h3>
<p><strong>Organisation:</strong> Rassemblement en demi-cercle face au professeur.</p>
<p><strong>Déroulement:</strong></p>
<ul>
<li>Appel et vérification des tenues sportives</li>
<li>Présentation de l'objectif: "${objectif}"</li>
<li>Rappel des règles de sécurité spécifiques à ${aps}</li>
</ul>

<h3>🔹 Échauffement général (7 min)</h3>
<p><strong>Organisation:</strong> Élèves dispersés sur le terrain.</p>
<p><strong>Exercices:</strong></p>
<ul>
<li>[2 min] Course légère avec changements de direction au signal</li>
<li>[2 min] Mobilisation articulaire: chevilles (rotations 10x), genoux (flexions 10x), hanches (rotations bassin 10x), épaules (circumductions 10x avant/arrière), nuque (rotations lentes 5x chaque sens)</li>
<li>[3 min] Gammes athlétiques: montées de genoux (2x15m), talons-fesses (2x15m), pas chassés (2x15m chaque côté), course arrière (2x15m)</li>
</ul>

<h3>🔹 Échauffement spécifique ${aps} (5 min)</h3>
<p><strong>Organisation:</strong> [Décris la disposition adaptée à ${aps}]</p>
<p><strong>Exercices spécifiques:</strong></p>
<ul>
<li>[Exercice 1 spécifique à ${aps} - adapté niveau ${niveau}]</li>
<li>[Exercice 2 spécifique]</li>
<li>[Exercice 3 spécifique]</li>
</ul>

<hr>

<h2>⚡ PARTIE FONDAMENTALE (35 min)</h2>

<div style="background:#e8f5e9;border-left:4px solid #1a5c3a;padding:10px;margin:10px 0;">
<p><strong>🎯 OBJECTIF DE LA SÉANCE:</strong> ${objectif}</p>
<p><strong>⚡ BUT DE LA PHASE FONDAMENTALE:</strong> [Formule en UNE phrase ce que l'élève doit concrètement réaliser dans les situations pour atteindre l'objectif - différent de l'objectif!]</p>
</div>

<h3>🎯 SITUATION 1: [Titre descriptif] (12 min)</h3>

<p><strong>📐 DISPOSITIF ET SCHÉMA:</strong></p>
<div style="background:#f5f5f5;border:2px solid #1a5c3a;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
    ╔════════════════════════════════════════════════════╗
    ║                    [Xm x Ym]                       ║
    ║                                                    ║
    ║    ◆─────────────────────────────────────◆        ║
    ║    │                                     │        ║
    ║    │    △1         ●         ○1          │  [BUT] ║
    ║    │         →→→→→→→→→→                  │   ▢    ║
    ║    │    △2                   ○2          │        ║
    ║    │                                     │        ║
    ║    ◆─────────────────────────────────────◆        ║
    ║                                                    ║
    ║  LÉGENDE:                                          ║
    ║  △ = Attaquant  ○ = Défenseur  ● = Ballon         ║
    ║  ◆ = Plot/Cône  → = Déplacement  ▢ = But          ║
    ╚════════════════════════════════════════════════════╝
</pre>
<p><em>Terrain: [dimensions précises] | Matériel: [liste détaillée]</em></p>
</div>

<p><strong>📋 DÉROULEMENT DÉTAILLÉ:</strong></p>
<p>[Explique étape par étape en au moins 6-8 phrases: comment débute l'exercice, le signal de départ, ce que fait chaque joueur, les rotations, la durée de chaque passage, le nombre de répétitions, comment se termine l'exercice]</p>

<p><strong>📢 CONSIGNES (adaptées niveau ${niveau}):</strong></p>
<ol>
<li>[Consigne 1 claire et précise]</li>
<li>[Consigne 2]</li>
<li>[Consigne 3]</li>
<li>[Consigne 4]</li>
</ol>

<p><strong>🔄 VARIABLES DIDACTIQUES:</strong></p>
<table border="1" style="width:100%;border-collapse:collapse;">
<tr style="background:#e8e8e8;"><th>Pour SIMPLIFIER</th><th>Pour COMPLEXIFIER</th></tr>
<tr>
<td><ul><li>[Modification 1]</li><li>[Modification 2]</li></ul></td>
<td><ul><li>[Modification 1]</li><li>[Modification 2]</li></ul></td>
</tr>
</table>

<p><strong>🔵 CRITÈRES DE RÉALISATION (ce que l'élève doit FAIRE):</strong></p>
<ul>
<li>[Geste/action technique 1 - ex: "Orienter les appuis vers la cible avant la passe"]</li>
<li>[Geste/action technique 2]</li>
<li>[Geste/action technique 3]</li>
</ul>

<p><strong>🟢 CRITÈRES DE RÉUSSITE (ce que l'élève doit OBTENIR):</strong></p>
<ul>
<li>[Résultat quantifié 1 - ex: "Réussir 7 passes sur 10 au partenaire"]</li>
<li>[Résultat quantifié 2 - ex: "Marquer 3 buts sur 5 tentatives"]</li>
</ul>

<h3>🎯 SITUATION 2: [Titre - situation globale avec opposition] (13 min)</h3>

<p><strong>📐 DISPOSITIF ET SCHÉMA:</strong></p>
<div style="background:#f5f5f5;border:2px solid #1a5c3a;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
[GÉNÈRE UN SCHÉMA DIFFÉRENT - Situation de jeu réduit ${niveauInfo.nbJoueurs}]
</pre>
</div>

[MÊME STRUCTURE COMPLÈTE QUE SITUATION 1 - Plus complexe, proche du jeu réel]

<h3>🏆 SITUATION DE RÉFÉRENCE (10 min)</h3>

<p><strong>📐 DISPOSITIF:</strong></p>
<div style="background:#fff3e0;border:2px solid #e65100;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
[SCHÉMA du terrain de ${aps} avec positions des équipes]
</pre>
</div>

<p><strong>Description:</strong> ${situationReference}</p>
<p><strong>Organisation:</strong> [Formation équipes, rotation, rôle observateurs/arbitres]</p>
<p><strong>Règles adaptées au niveau ${niveau}:</strong></p>
<ul>
<li>[Règle adaptée 1]</li>
<li>[Règle adaptée 2]</li>
</ul>
<p><strong>Critères d'observation:</strong></p>
<ul>
<li>[En lien avec l'objectif de la séance]</li>
<li>[En lien avec l'OTC]</li>
</ul>

<hr>

<h2>🧘 PARTIE FINALE (10 min)</h2>

<h3>🔹 Retour au calme (5 min)</h3>
<p><strong>Exercices de récupération:</strong></p>
<ul>
<li>Marche lente en respirant profondément (1 min)</li>
<li>Étirements des quadriceps: debout, une main au mur, attraper la cheville - maintenir 20s chaque jambe</li>
<li>Étirements ischio-jambiers: jambe tendue sur plot, pencher le buste - 20s chaque jambe</li>
<li>Étirements adducteurs: position écart, fléchir une jambe - 20s chaque côté</li>
<li>Étirements mollets: pied à plat contre mur - 20s chaque jambe</li>
<li>Étirements épaules et triceps - 15s chaque bras</li>
</ul>

<h3>🔹 Bilan de séance (5 min)</h3>
<p><strong>Questions de vérification:</strong></p>
<ul>
<li>"Quel était l'objectif de la séance aujourd'hui?"</li>
<li>"Qu'avez-vous appris de nouveau?"</li>
<li>"Quelles difficultés avez-vous rencontrées?"</li>
</ul>
<p><strong>Synthèse du professeur:</strong> [Points positifs, axes d'amélioration, annonce prochaine séance]</p>
<p><strong>Rangement:</strong> Désignation de 4 élèves pour ranger le matériel.</p>

===SEPARATEUR===

**VIDÉOS PÉDAGOGIQUES RECOMMANDÉES:**
1. [Titre vidéo 1 - tutoriel technique]
2. [Titre vidéo 2 - exercices d'entraînement]
3. [Titre vidéo 3 - situations de match]`;

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

        // ==================== HTML WORD AMÉLIORÉ ====================

        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche ${aps} - ${niveau}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.25cm 0.35cm}
@page Section1{size:297mm 210mm;mso-page-orientation:landscape;margin:0.25cm 0.35cm}
div.Section1{page:Section1}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Calibri',sans-serif;font-size:8.5pt;line-height:1.1;color:#000}
table{width:100%;border-collapse:collapse}
th,td{border:1.5pt solid #000;padding:2px 3px;vertical-align:top}
.header-table td{border:none;padding:1px 4px;font-size:8.5pt}
.title-cell{text-align:center;font-size:13pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:4px;border:2pt solid #000}
.label-cell{background:#e8e8e8;font-weight:bold;font-size:7pt;width:5.5%;text-align:center}
.value-cell{font-size:7pt}
.objectif-label{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:7.5pt}
.objectif-value{background:#f0f8f0;font-size:7.5pt;font-weight:bold}
.main-header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:7.5pt;padding:2px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:7.5pt;width:6%}
.duree-cell{text-align:center;font-weight:bold;font-size:7.5pt;width:4%}
.contenu-cell{width:36%;font-size:7pt;line-height:1.15}
.but-cell{width:10%;font-size:7pt;line-height:1.15}
.critere-cell{width:22%;font-size:7pt;line-height:1.15}
.footer-text{text-align:center;font-size:6.5pt;color:#555;margin-top:1px}
.schema-box{background:#f9f9f9;border:1px dashed #1a5c3a;padding:3px;margin:2px 0;font-family:'Courier New',monospace;font-size:6pt;white-space:pre}
.but-box{background:#e3f2fd;border-left:3px solid #1a5c3a;padding:3px;margin:2px 0;font-size:7pt}
</style>
</head>
<body>
<div class="Section1">

<table class="header-table" style="margin-bottom:1px">
<tr>
<td style="text-align:left;width:26%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="text-align:center;width:32%"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="text-align:center;width:22%"><b>Année:</b> ${anneeScolaire || '2024-2025'}</td>
<td style="text-align:right;width:20%"><b>Séance N°:</b> ${numeroSeance || 1} | <b>Niveau:</b> ${niveauInfo.label}</td>
</tr>
</table>

<table style="margin-bottom:1px">
<tr><td class="title-cell">FICHE DE PRÉPARATION - ${aps.toUpperCase()} (${niveau})</td></tr>
</table>

<table style="margin-bottom:1px">
<tr>
<td class="label-cell">Groupe</td>
<td class="value-cell" style="width:18%">${groupeAPS}</td>
<td class="label-cell">APS</td>
<td class="value-cell" style="width:12%">${aps}</td>
<td class="label-cell">Niveau</td>
<td class="value-cell" style="width:6%">${niveau}</td>
<td class="label-cell">Durée</td>
<td class="value-cell" style="width:6%">60min</td>
<td class="label-cell">Effectif</td>
<td class="value-cell" style="width:8%">${niveauInfo.nbJoueurs}</td>
</tr>
<tr>
<td class="label-cell">OTI</td>
<td class="value-cell" colspan="9" style="font-size:6.5pt;line-height:1.1">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td class="value-cell" colspan="9" style="font-size:6.5pt;line-height:1.1">${otc}</td>
</tr>
<tr>
<td class="objectif-label">OBJECTIF SÉANCE</td>
<td class="objectif-value" colspan="9">${objectif}</td>
</tr>
</table>

<table>
<thead>
<tr>
<th class="main-header" style="width:6%">PARTIES</th>
<th class="main-header" style="width:4%">DURÉE</th>
<th class="main-header" style="width:36%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="main-header" style="width:10%">BUT</th>
<th class="main-header" style="width:22%">CRITÈRES DE RÉALISATION</th>
<th class="main-header" style="width:22%">CRITÈRES DE RÉUSSITE</th>
</tr>
</thead>
<tbody>
<tr>
<td class="partie-cell">INTRO-<br>DUCTIVE</td>
<td class="duree-cell">15<br>min</td>
<td class="contenu-cell">
<b>• Prise en main (3'):</b> Appel, tenues, objectif, sécurité<br>
<b>• Échauffement général (7'):</b><br>
- Course légère 2 tours + changements direction<br>
- Mobilisation: chevilles, genoux, hanches, épaules, nuque<br>
- Gammes: montées genoux, talons-fesses, pas chassés<br>
<b>• Échauffement spécifique (5'):</b><br>
- Exercices avec ballon/matériel ${aps}<br>
- Gammes techniques niveau ${niveau}
</td>
<td class="but-cell">
• Préparer l'organisme<br>
• Éveil psychique<br>
• Activation cardio<br>
• Prévention blessures
</td>
<td class="critere-cell">
• Mobilisation progressive bas→haut<br>
• Augmentation intensité progressive<br>
• Respiration contrôlée<br>
• Mouvements corrects et complets<br>
• Concentration et attention
</td>
<td class="critere-cell">
• FC: 120-140 bpm<br>
• Légère transpiration<br>
• Élèves attentifs et concentrés<br>
• 100% participation<br>
• Zéro blessure
</td>
</tr>
<tr>
<td class="partie-cell">FONDA-<br>MENTALE</td>
<td class="duree-cell">35<br>min</td>
<td class="contenu-cell">
<div class="but-box">
<b>🎯 Objectif:</b> ${objectif}<br>
<b>⚡ But:</b> Réaliser les actions permettant d'atteindre cet objectif
</div>
<b>• SITUATION 1 (12'):</b> Analytique<br>
<div class="schema-box">
┌────────20m────────┐
│  △1    ●    ○1   │→[BUT]
│  △2         ○2   │
└──────────────────┘
△=Att ○=Déf ●=Ballon
</div>
Exercice ciblé sur l'objectif<br>
<i>Variantes: ± opposition, ± temps</i><br><br>

<b>• SITUATION 2 (13'):</b> Globale<br>
<div class="schema-box">
Jeu réduit ${niveauInfo.nbJoueurs}
avec opposition réelle
</div>
Application en contexte de jeu<br><br>

<b>• SIT. RÉFÉRENCE (10'):</b><br>
${situationReference}<br>
Évaluation des acquis
</td>
<td class="but-cell">
<b>Sit.1:</b><br>
Maîtriser le geste technique isolé<br><br>
<b>Sit.2:</b><br>
Appliquer en situation de jeu<br><br>
<b>Sit.Réf:</b><br>
Démontrer l'acquisition
</td>
<td class="critere-cell">
<b>Sit.1:</b><br>
• Placement correct avant action<br>
• Regard orienté cible/partenaire<br>
• Geste technique approprié<br><br>
<b>Sit.2:</b><br>
• Prise d'info avant action<br>
• Choix adapté à la situation<br>
• Enchaînement d'actions<br><br>
<b>Sit.Réf:</b><br>
• Application des règles<br>
• Engagement dans le jeu
</td>
<td class="critere-cell">
<b>Sit.1:</b><br>
• 7/10 réussites minimum<br>
• Taux réussite > 70%<br><br>
<b>Sit.2:</b><br>
• Actions efficaces visibles<br>
• Progression constatée<br>
• Participation active<br><br>
<b>Sit.Réf:</b><br>
• Objectif séance démontré<br>
• Critères OTC respectés
</td>
</tr>
<tr>
<td class="partie-cell">FINALE</td>
<td class="duree-cell">10<br>min</td>
<td class="contenu-cell">
<b>• Retour au calme (5'):</b><br>
- Marche lente + respiration profonde<br>
- Étirements: quadriceps, ischio-jambiers, adducteurs, mollets (20s chaque)<br><br>
<b>• Bilan (5'):</b><br>
- "Qu'avez-vous appris?"<br>
- Feedback professeur<br>
- Rangement matériel
</td>
<td class="but-cell">
• Récupération<br>
• Retour au calme<br>
• Bilan formatif<br>
• Préparer suite
</td>
<td class="critere-cell">
• Marche lente contrôlée<br>
• Respiration abdominale<br>
• Étirements sans à-coups<br>
• Écoute active pendant bilan<br>
• Participation aux échanges
</td>
<td class="critere-cell">
• FC < 100 bpm<br>
• Élèves calmes et détendus<br>
• Réponses pertinentes<br>
• Matériel rangé<br>
• Départ ordonné
</td>
</tr>
</tbody>
</table>

<div class="footer-text">
Conforme aux ${opReference} | Ministère de l'Éducation Nationale - Maroc | Niveau: ${niveauInfo.label} | Généré par Prof EPS
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
            opReference,
            niveauInfo
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
