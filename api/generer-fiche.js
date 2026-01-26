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

        // OTC Sports Collectifs
        const OTC_SPORTS_COLLECTIFS = {
            '1AC': "L'élève doit pouvoir conserver la balle et participer au jeu collectif pour gagner la rencontre.",
            '2AC': "L'élève doit pouvoir gagner la rencontre par la réalisation de déplacements variés pour une progression avec la balle et un changement de rôle en fonction des situations proposées.",
            '3AC': "L'élève doit pouvoir participer dans la réalisation du projet collectif basé sur le passage rapide et adéquat de l'attaque à la défense pour gagner la rencontre.",
            'TC': "Rechercher le gain de la rencontre par l'utilisation de moyens adaptés pour conserver la balle jusqu'à la zone adverse devant une défense organisée.",
            '1AB': "Rechercher le gain de la rencontre par la mise en œuvre de choix tactiques collectifs, fondés sur la vitesse d'exécution avec une bonne gestion des ressources.",
            '2AB': "Rechercher le gain de la rencontre par la mise en place d'une attaque basée sur la maîtrise des rôles et l'occupation permanente de l'espace par un projet collectif."
        };

        // OTC Athlétisme
        const OTC_ATHLETISME = {
            '1AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour construire de nouveaux repères afin de réaliser des performances individuelles correctes.",
            '2AC': "L'élève doit pouvoir organiser les mouvements du corps et adapter les efforts pour consolider les habiletés et améliorer un niveau de performance.",
            '3AC': "L'élève doit pouvoir gérer l'effort physique pour réaliser des prestations correctes et efficaces suivant ses exigences organisationnelles et réglementaires.",
            'TC': "L'élève doit maîtriser l'organisation de son corps et la gestion de l'effort pour mobiliser un certain niveau d'habileté ou de performance.",
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
            'TC': "Rechercher le gain par un jeu basé sur l'organisation collective pour défendre et renvoyer dans la limite de 3 touches.",
            '1AB': "Rechercher le gain par un jeu basé sur l'organisation collective pour récupérer et renvoyer dans la limite de 3 touches.",
            '2AB': "Rechercher le gain par un jeu basé sur l'organisation collective pour récupérer, conserver et marquer des points."
        };

        // SITUATIONS DE RÉFÉRENCE OFFICIELLES (reformulées)
        const SITUATIONS_REFERENCE = {
            'Handball': {
                description: "Match 7 contre 7 sur terrain réglementaire avec application des règles officielles adaptées au niveau.",
                format: "7 contre 7"
            },
            'Football': {
                description: "Match 5 contre 5 sur terrain réduit avec application des règles officielles adaptées au niveau.",
                format: "5 contre 5"
            },
            'Basketball': {
                description: "Match 5 contre 5 sur terrain réglementaire avec application des règles officielles adaptées au niveau.",
                format: "5 contre 5"
            },
            'Volleyball': {
                description: "Match 6 contre 6 sur terrain réglementaire avec application des règles officielles adaptées au niveau.",
                format: "6 contre 6"
            },
            'Tennis de table': {
                description: "Match en simple avec application des règles officielles (sets de 11 points).",
                format: "Simple"
            },
            'Badminton': {
                description: "Match en simple avec application des règles officielles (sets de 21 points).",
                format: "Simple"
            },
            'Course de vitesse': {
                description: isCollege 
                    ? "Courir une distance de 80m le plus rapidement possible (garçons et filles)." 
                    : "Courir une distance de 80m (garçons) ou 60m (filles) le plus rapidement possible.",
                format: isCollege ? "80m" : "80m (G) / 60m (F)"
            },
            'Course de relais': {
                description: "Réaliser un relais 4x60m en équipe avec transmission du témoin dans la zone réglementaire.",
                format: "4x60m"
            },
            'Saut en longueur': {
                description: "Courir, sauter le plus loin possible et mesurer la performance réalisée.",
                format: "3 essais mesurés"
            },
            'Saut en hauteur': {
                description: "Courir, sauter le plus haut possible et mesurer la performance réalisée.",
                format: "3 essais par hauteur"
            },
            'Lancer de poids': {
                description: "Lancer un poids de 4kg (garçons) ou 3kg (filles) le plus loin possible et mesurer la performance.",
                format: "3 essais mesurés"
            },
            'Course de durée': {
                description: "Courir une distance de 1000m (garçons) ou 600m (filles) en gérant son effort.",
                format: "1000m (G) / 600m (F)"
            },
            'Gymnastique': {
                description: "Présenter un enchaînement d'éléments gymniques devant le groupe classe selon la composition exigée.",
                format: "Enchaînement"
            }
        };

        // Déterminer le groupe APS et le type d'activité
        let groupeAPS, otc, situationRef, typeActivite;

        if (['Handball', 'Football', 'Basketball'].includes(aps)) {
            groupeAPS = 'Sports collectifs';
            otc = OTC_SPORTS_COLLECTIFS[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_collectif';
        } else if (aps === 'Volleyball') {
            groupeAPS = 'Sports collectifs (renvoi)';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_collectif';
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_renvoi';
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            otc = OTC_ATHLETISME[niveau];
            situationRef = SITUATIONS_REFERENCE[aps] || SITUATIONS_REFERENCE['Course de vitesse'];
            typeActivite = 'athletisme';
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            otc = OTC_GYMNASTIQUE[niveau];
            situationRef = SITUATIONS_REFERENCE['Gymnastique'];
            typeActivite = 'gymnastique';
        } else {
            groupeAPS = 'Activité physique';
            otc = "Développer les capacités motrices.";
            situationRef = { description: 'Situation adaptée au niveau', format: 'Adapté' };
            typeActivite = 'autre';
        }

        const oti = OTI[niveau];

        // ==================== PROMPT ADAPTÉ AU TYPE D'ACTIVITÉ ====================

        let promptSpecifique = '';
        
        if (typeActivite === 'athletisme') {
            promptSpecifique = `
**IMPORTANT - ATHLÉTISME:**
- NE PAS mentionner de matchs, d'équipes, de défenseurs ou d'attaquants
- Les situations sont INDIVIDUELLES ou en RELAIS
- Utiliser des termes: coureur, sauteur, lanceur, athlète
- Focus sur: technique, performance, chronométrage, mesure
- Organisation: par vagues, par ateliers, par groupes de niveau`;
        } else if (typeActivite === 'gymnastique') {
            promptSpecifique = `
**IMPORTANT - GYMNASTIQUE:**
- NE PAS mentionner de matchs, d'équipes ou d'opposition
- Les situations sont INDIVIDUELLES ou en BINÔMES (aide/parade)
- Utiliser des termes: gymnaste, pareur, juge
- Focus sur: éléments gymniques, enchaînement, exécution, amplitude
- Organisation: par ateliers, par vagues, travail en binômes`;
        } else if (typeActivite === 'sport_collectif') {
            promptSpecifique = `
**IMPORTANT - SPORT COLLECTIF:**
- Utiliser le format de jeu officiel: ${situationRef.format}
- Termes appropriés: attaquants, défenseurs, gardien, équipes
- Focus sur: passes, tirs, déplacements, tactique collective
- Organisation: par équipes, matchs, tournoi`;
        } else if (typeActivite === 'sport_renvoi') {
            promptSpecifique = `
**IMPORTANT - SPORT DE RENVOI:**
- Matchs individuels (simple) ou en double
- Termes: joueur, adversaire, serveur, receveur
- Focus sur: frappes, déplacements, placement, service
- Organisation: tournoi, montante-descendante, défis`;
        }

        const prompt = `Tu es un expert en EPS au Maroc. Génère une fiche de séance PROFESSIONNELLE et ADAPTÉE.

**═══════════════════════════════════════════════════════════════**
**INFORMATIONS**
**═══════════════════════════════════════════════════════════════**

📚 Référentiel: ${opReference}
🎯 APS: ${aps}
📊 Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
📝 Séance N°: ${numeroSeance || 1}

**OBJECTIF DE LA SÉANCE:** ${objectif}

**CADRE OFFICIEL:**
• OTI: ${oti}
• OTC: ${otc}

**SITUATION DE RÉFÉRENCE:**
${situationRef.description}
Format: ${situationRef.format}

${promptSpecifique}

**═══════════════════════════════════════════════════════════════**
**CONSIGNES**
**═══════════════════════════════════════════════════════════════**

1️⃣ ADAPTE le contenu à l'APS "${aps}" - pas de termes inappropriés
2️⃣ Génère des SCHÉMAS ASCII pour chaque situation
3️⃣ CRITÈRES distincts: Réalisation (COMMENT) vs Réussite (RÉSULTAT)
4️⃣ Contenu COHÉRENT avec l'objectif: "${objectif}"

**═══════════════════════════════════════════════════════════════**
**FORMAT DE SORTIE**
**═══════════════════════════════════════════════════════════════**

<h2>📌 PARTIE INTRODUCTIVE (15 min)</h2>

<h3>🔹 Prise en main (3 min)</h3>
<p>Rassemblement, appel, présentation de l'objectif: "${objectif}", consignes de sécurité.</p>

<h3>🔹 Échauffement général (7 min)</h3>
<p>Course légère, mobilisation articulaire (chevilles → nuque), gammes athlétiques.</p>

<h3>🔹 Échauffement spécifique ${aps} (5 min)</h3>
<p>[Génère 3-4 exercices spécifiques ADAPTÉS à ${aps} - PAS de termes inappropriés]</p>

<hr>

<h2>⚡ PARTIE FONDAMENTALE (35 min)</h2>

<div style="background:#e8f5e9;border-left:4px solid #1a5c3a;padding:10px;margin:10px 0;">
<p><strong>🎯 OBJECTIF:</strong> ${objectif}</p>
<p><strong>⚡ BUT:</strong> [UN BUT UNIQUE résumant ce que l'élève doit réaliser]</p>
</div>

<h3>🎯 SITUATION 1: [Titre adapté à ${aps}] (12 min)</h3>

<p><strong>📐 SCHÉMA:</strong></p>
<div style="background:#f5f5f5;border:2px solid #1a5c3a;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
[SCHÉMA ASCII ADAPTÉ à ${aps} - utiliser les symboles appropriés]
</pre>
</div>

<p><strong>📋 DÉROULEMENT:</strong> [Description détaillée ADAPTÉE]</p>

<p><strong>📢 CONSIGNES:</strong></p>
<ol>
<li>[Consigne 1]</li>
<li>[Consigne 2]</li>
<li>[Consigne 3]</li>
</ol>

<p><strong>🔄 VARIANTES:</strong> Simplifier: [...] | Complexifier: [...]</p>

<p><strong>🔵 CRITÈRES DE RÉALISATION:</strong></p>
<ul>
<li>[Geste technique 1]</li>
<li>[Geste technique 2]</li>
</ul>

<p><strong>🟢 CRITÈRES DE RÉUSSITE:</strong></p>
<ul>
<li>[Résultat quantifié 1]</li>
<li>[Résultat quantifié 2]</li>
</ul>

<h3>🎯 SITUATION 2: [Titre] (13 min)</h3>
[MÊME STRUCTURE - situation plus globale]

<h3>🏆 SITUATION DE RÉFÉRENCE (10 min)</h3>
<p><strong>Description:</strong> ${situationRef.description}</p>
<p><strong>Format:</strong> ${situationRef.format}</p>
<p><strong>Organisation:</strong> [Détails organisation]</p>

<hr>

<h2>🧘 PARTIE FINALE (10 min)</h2>

<h3>🔹 Retour au calme (5 min)</h3>
<p>Marche lente, respiration, étirements des groupes musculaires sollicités.</p>

<h3>🔹 Bilan (5 min)</h3>
<p>Questions aux élèves, feedback professeur, rangement matériel.</p>`;

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
        const ficheDetaillee = groqData.choices[0].message.content;

        // ==================== HTML WORD SIMPLIFIÉ ET CORRIGÉ ====================
        // Modifications:
        // 1. Contenu résumé
        // 2. Adapté au type d'activité (pas de matchs pour athlétisme)
        // 3. Fusion des colonnes critères pour intro et finale
        // 4. Numéro de séance une seule fois dans le tableau

        // Contenu adapté selon le type d'activité
        let contenuIntro, contenuFonda, contenuFinale;
        
        if (typeActivite === 'athletisme') {
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, objectif, sécurité.<br><br>
<b>• Échauffement général (7'):</b> Course légère, mobilisation articulaire progressive, gammes athlétiques (montées de genoux, talons-fesses, foulées bondissantes).<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices techniques adaptés à ${aps} (éducatifs, gammes spécifiques).`;
            
            contenuFonda = `<b>• SITUATION 1 (12'):</b><br>
Exercice analytique ciblant l'objectif. Travail par ateliers ou par vagues. Les élèves réalisent les exercices individuellement avec correction du professeur.<br>
<i>Variantes:</i> Simplifier (réduire la distance/vitesse) / Complexifier (augmenter l'intensité).<br><br>

<b>• SITUATION 2 (13'):</b><br>
Exercice global intégrant l'objectif dans une situation complète. Travail par groupes de niveau avec chronométrage ou mesure des performances.<br>
<i>Variantes:</i> Adapter selon le niveau de chaque élève.<br><br>

<b>• SITUATION DE RÉFÉRENCE (10'):</b><br>
${situationRef.description}<br>
Évaluation des performances individuelles.`;
            
            contenuFinale = `<b>• Retour au calme (5'):</b> Marche, respiration, étirements des muscles sollicités (quadriceps, ischio-jambiers, mollets).<br><br>
<b>• Bilan (5'):</b> Questions, feedback sur les performances, rangement du matériel.`;
        } else if (typeActivite === 'gymnastique') {
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, objectif, règles de sécurité (parade, réception).<br><br>
<b>• Échauffement général (7'):</b> Course légère, mobilisation articulaire complète, renforcement (gainage, pompes).<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices préparatoires aux éléments gymniques (roulades, équilibres, sauts).`;
            
            contenuFonda = `<b>• SITUATION 1 (12'):</b><br>
Travail par ateliers sur les éléments gymniques. Les élèves travaillent en binômes (exécutant/pareur). Rotation toutes les 4 minutes.<br>
<i>Variantes:</i> Simplifier (aide renforcée) / Complexifier (enchaîner les éléments).<br><br>

<b>• SITUATION 2 (13'):</b><br>
Construction et répétition de l'enchaînement. Travail individuel avec feedback du professeur et des pairs.<br>
<i>Variantes:</i> Adapter la composition selon le niveau.<br><br>

<b>• SITUATION DE RÉFÉRENCE (10'):</b><br>
${situationRef.description}<br>
Passage devant le groupe avec évaluation.`;
            
            contenuFinale = `<b>• Retour au calme (5'):</b> Étirements des muscles sollicités (épaules, dos, jambes), exercices de souplesse.<br><br>
<b>• Bilan (5'):</b> Retour sur les enchaînements, axes d'amélioration, rangement.`;
        } else {
            // Sports collectifs et de renvoi
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, objectif, règles du jeu.<br><br>
<b>• Échauffement général (7'):</b> Course légère avec changements de direction, mobilisation articulaire, gammes athlétiques.<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices avec ballon (manipulation, passes, conduite).`;
            
            contenuFonda = `<b>• SITUATION 1 (12'):</b><br>
Exercice analytique ciblant l'objectif. Travail en groupes sur terrain réduit. Rotation régulière.<br>
<i>Variantes:</i> Simplifier (sans opposition) / Complexifier (ajout contraintes).<br><br>

<b>• SITUATION 2 (13'):</b><br>
Jeu réduit avec opposition. Application de l'objectif en contexte de jeu réel.<br>
<i>Variantes:</i> Adapter le rapport de force selon les besoins.<br><br>

<b>• SITUATION DE RÉFÉRENCE (10'):</b><br>
${situationRef.description}<br>
Observation et évaluation des acquis.`;
            
            contenuFinale = `<b>• Retour au calme (5'):</b> Marche, respiration, étirements des membres inférieurs et supérieurs.<br><br>
<b>• Bilan (5'):</b> Questions, feedback collectif, rangement du matériel.`;
        }

        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche ${aps} - ${niveau}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm 0.5cm}
@page Section1{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm 0.5cm}
div.Section1{page:Section1}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Calibri',sans-serif;font-size:9pt;line-height:1.2;color:#000}
table{width:100%;border-collapse:collapse}
th,td{border:1.5pt solid #000;padding:4px 5px;vertical-align:top}
.header-table td{border:none;padding:2px 6px;font-size:9pt}
.title-cell{text-align:center;font-size:14pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:6px;border:2pt solid #000}
.label-cell{background:#e8e8e8;font-weight:bold;font-size:8pt;text-align:center}
.value-cell{font-size:8pt}
.objectif-label{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:9pt}
.objectif-value{background:#f0f8f0;font-size:9pt;font-weight:bold}
.main-header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:9pt;padding:4px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:9pt;width:8%}
.duree-cell{text-align:center;font-weight:bold;font-size:9pt;width:5%}
.contenu-cell{font-size:8pt;line-height:1.25}
.but-cell{font-size:8pt;line-height:1.25}
.critere-cell{font-size:8pt;line-height:1.25}
.footer-text{text-align:center;font-size:7pt;color:#555;margin-top:3px}
</style>
</head>
<body>
<div class="Section1">

<table class="header-table" style="margin-bottom:2px">
<tr>
<td style="text-align:left;width:30%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="text-align:center;width:40%"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="text-align:right;width:30%"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table style="margin-bottom:2px">
<tr><td class="title-cell">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr>
</table>

<table style="margin-bottom:2px">
<tr>
<td class="label-cell" style="width:8%">Groupe APS</td>
<td class="value-cell" style="width:17%">${groupeAPS}</td>
<td class="label-cell" style="width:5%">APS</td>
<td class="value-cell" style="width:15%">${aps}</td>
<td class="label-cell" style="width:6%">Niveau</td>
<td class="value-cell" style="width:10%">${niveau}</td>
<td class="label-cell" style="width:6%">Séance</td>
<td class="value-cell" style="width:8%">${numeroSeance || 1}</td>
</tr>
<tr>
<td class="label-cell">OTI</td>
<td class="value-cell" colspan="7" style="font-size:7.5pt;line-height:1.15">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td class="value-cell" colspan="7" style="font-size:7.5pt;line-height:1.15">${otc}</td>
</tr>
<tr>
<td class="objectif-label">OBJECTIF DE LA SÉANCE</td>
<td class="objectif-value" colspan="7">${objectif}</td>
</tr>
</table>

<table>
<thead>
<tr>
<th class="main-header" style="width:8%">PARTIES</th>
<th class="main-header" style="width:5%">DURÉE</th>
<th class="main-header" style="width:40%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="main-header" style="width:12%">BUT</th>
<th class="main-header" style="width:17.5%">CRITÈRES DE RÉALISATION</th>
<th class="main-header" style="width:17.5%">CRITÈRES DE RÉUSSITE</th>
</tr>
</thead>
<tbody>
<tr>
<td class="partie-cell">INTRODUCTIVE</td>
<td class="duree-cell">15 min</td>
<td class="contenu-cell">${contenuIntro}</td>
<td class="but-cell">
Préparer l'organisme à l'effort et mobiliser l'attention des élèves sur l'objectif de la séance.
</td>
<td class="critere-cell" colspan="2" style="text-align:center;vertical-align:middle;">
<i>Phase de préparation - Observation de l'engagement et de la qualité de l'échauffement</i>
</td>
</tr>
<tr>
<td class="partie-cell">FONDAMENTALE</td>
<td class="duree-cell">35 min</td>
<td class="contenu-cell">${contenuFonda}</td>
<td class="but-cell">
Réaliser les actions motrices permettant d'atteindre l'objectif de la séance à travers des situations progressives.
</td>
<td class="critere-cell">
• Se placer correctement avant chaque action<br><br>
• Exécuter le geste technique avec précision<br><br>
• Enchaîner les actions de manière fluide<br><br>
• Prendre les informations nécessaires avant d'agir<br><br>
• Adapter ses réponses à la situation
</td>
<td class="critere-cell">
• Réussir au minimum 7 actions sur 10<br><br>
• Taux de réussite supérieur à 70%<br><br>
• Progression visible entre le début et la fin<br><br>
• Objectif de la séance démontré lors de la situation de référence
</td>
</tr>
<tr>
<td class="partie-cell">FINALE</td>
<td class="duree-cell">10 min</td>
<td class="contenu-cell">${contenuFinale}</td>
<td class="but-cell">
Permettre la récupération et réaliser un bilan des apprentissages de la séance.
</td>
<td class="critere-cell" colspan="2" style="text-align:center;vertical-align:middle;">
<i>Phase de récupération - Observation de la participation au bilan et du rangement</i>
</td>
</tr>
</tbody>
</table>

<div class="footer-text">
Conforme aux ${opReference} | Ministère de l'Éducation Nationale - Royaume du Maroc
</div>

</div>
</body>
</html>`;

        return res.status(200).json({
            success: true,
            ficheDetaillee,
            html,
            filename: `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`,
            oti,
            otc,
            situationReference: situationRef,
            groupeAPS,
            opReference
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
