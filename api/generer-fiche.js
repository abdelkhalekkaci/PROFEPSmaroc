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

        // Niveau de complexité
        const niveauComplexite = {
            '1AC': { label: 'Initiation', nbJoueurs: '3c3 ou 4c4', terrain: 'réduit' },
            '2AC': { label: 'Apprentissage', nbJoueurs: '4c4 ou 5c5', terrain: 'moyen' },
            '3AC': { label: 'Consolidation', nbJoueurs: '5c5 ou 6c6', terrain: 'normal' },
            'TC': { label: 'Perfectionnement', nbJoueurs: '5c5 ou 7c7', terrain: 'normal' },
            '1AB': { label: 'Maîtrise', nbJoueurs: '6c6 ou 7c7', terrain: 'réglementaire' },
            '2AB': { label: 'Expertise', nbJoueurs: '7c7', terrain: 'réglementaire' }
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

        // Situations de référence OFFICIELLES avec règles
        const SITUATIONS_REFERENCE = {
            'Handball': {
                format: 'Match 7 contre 7',
                terrain: '40m x 20m',
                regles: 'Règles officielles adaptées: 2 mi-temps de 5 min, marcher interdit (3 appuis max), zone des 6m interdite aux joueurs de champ, remise en jeu au centre après but'
            },
            'Football': {
                format: 'Match 7 contre 7',
                terrain: '50m x 30m (demi-terrain)',
                regles: 'Règles adaptées: 2 mi-temps de 5 min, hors-jeu simplifié ou supprimé, touche au pied autorisée, pas de tacle glissé'
            },
            'Basketball': {
                format: 'Match 5 contre 5',
                terrain: '28m x 15m',
                regles: 'Règles officielles adaptées: 2 mi-temps de 5 min, marcher interdit, reprise de dribble interdite, 5 secondes pour remettre en jeu'
            },
            'Volleyball': {
                format: 'Match 6 contre 6',
                terrain: '18m x 9m',
                regles: 'Règles adaptées: sets de 15 points, 3 touches maximum, rotation obligatoire, service bas autorisé'
            },
            'Tennis de table': {
                format: 'Match simple',
                terrain: 'Table réglementaire',
                regles: 'Set de 11 points, 2 services chacun, balle doit rebondir des 2 côtés, changement de côté à chaque set'
            },
            'Badminton': {
                format: 'Match simple',
                terrain: '13.4m x 5.18m (simple)',
                regles: 'Set de 21 points, service en diagonale, volant frappé sous la taille au service'
            },
            'Course de vitesse': {
                format: '2 courses chronométrées',
                terrain: 'Piste 60m (collège) ou 100m (lycée)',
                regles: 'Départ en starting-blocks ou debout, faux départ = élimination, chronométrage manuel'
            },
            'Course de relais': {
                format: 'Relais 4x60m',
                terrain: 'Piste avec zones de transmission',
                regles: 'Zone de transmission de 20m, témoin obligatoire, transmission main droite-main gauche'
            },
            'Saut en longueur': {
                format: '3 essais mesurés',
                terrain: 'Piste d\'élan + fosse de sable',
                regles: 'Course d\'élan libre, impulsion avant la planche, mesure du talon le plus proche'
            },
            'Saut en hauteur': {
                format: '3 essais par hauteur',
                terrain: 'Sautoir avec tapis de réception',
                regles: 'Impulsion un pied, 3 essais maximum par hauteur, élimination après 3 échecs consécutifs'
            },
            'Lancer de poids': {
                format: '3 essais mesurés',
                terrain: 'Aire de lancer circulaire',
                regles: 'Poids collé au cou, lancer depuis le cercle, ne pas sortir par l\'avant'
            },
            'Course de durée': {
                format: 'Course 12 minutes (Cooper)',
                terrain: 'Piste ou terrain délimité',
                regles: 'Course continue, marche autorisée, comptage des tours effectués'
            },
            'Gymnastique': {
                format: 'Enchaînement devant jury',
                terrain: 'Praticable 12m x 12m',
                regles: 'Enchaînement de 30-60 sec, éléments imposés selon niveau, passage devant la classe'
            }
        };

        // Liens YouTube par APS
        const YOUTUBE_LINKS = {
            'Handball': [
                { titre: 'Techniques de passe handball', url: 'https://www.youtube.com/watch?v=QzWqb7TkFP0' },
                { titre: 'Exercices de tir handball', url: 'https://www.youtube.com/watch?v=kHpXHhHfCQE' },
                { titre: 'Tactique handball débutant', url: 'https://www.youtube.com/watch?v=YwJ6S-6SZEM' }
            ],
            'Football': [
                { titre: 'Technique de passe football', url: 'https://www.youtube.com/watch?v=5YAyNvoIcWU' },
                { titre: 'Exercices conduite de balle', url: 'https://www.youtube.com/watch?v=GYvQFmzG_pY' },
                { titre: 'Jeux réduits football', url: 'https://www.youtube.com/watch?v=vL3MuG0HTEI' }
            ],
            'Basketball': [
                { titre: 'Fondamentaux basketball', url: 'https://www.youtube.com/watch?v=8xdPwJfCz0c' },
                { titre: 'Exercices de dribble', url: 'https://www.youtube.com/watch?v=G1HVpOF3QgE' },
                { titre: 'Tir en course basketball', url: 'https://www.youtube.com/watch?v=LNmf-ryrmXA' }
            ],
            'Volleyball': [
                { titre: 'Technique de manchette', url: 'https://www.youtube.com/watch?v=I2O-X1HJMUQ' },
                { titre: 'Passe haute volleyball', url: 'https://www.youtube.com/watch?v=3_9LuS9OPaM' },
                { titre: 'Service volleyball débutant', url: 'https://www.youtube.com/watch?v=9YMsLqvN9Jc' }
            ],
            'Tennis de table': [
                { titre: 'Coup droit tennis de table', url: 'https://www.youtube.com/watch?v=BhmqJHv3JZE' },
                { titre: 'Service tennis de table', url: 'https://www.youtube.com/watch?v=Za-xm3hCi8E' },
                { titre: 'Revers tennis de table', url: 'https://www.youtube.com/watch?v=8lqh_dK9S2Y' }
            ],
            'Badminton': [
                { titre: 'Technique du clear badminton', url: 'https://www.youtube.com/watch?v=H4L6KyLUx1s' },
                { titre: 'Service badminton', url: 'https://www.youtube.com/watch?v=7RWmStBjJLc' },
                { titre: 'Déplacements badminton', url: 'https://www.youtube.com/watch?v=0N2E4MJhI7s' }
            ],
            'Course de vitesse': [
                { titre: 'Technique de départ sprint', url: 'https://www.youtube.com/watch?v=6HhDc1xOPZA' },
                { titre: 'Améliorer sa vitesse', url: 'https://www.youtube.com/watch?v=RhMGPy6j7cI' },
                { titre: 'Exercices de fréquence', url: 'https://www.youtube.com/watch?v=RA0i5LeMC_Y' }
            ],
            'Saut en longueur': [
                { titre: 'Technique saut en longueur', url: 'https://www.youtube.com/watch?v=YcYdA3wXKOI' },
                { titre: 'Course d\'élan saut longueur', url: 'https://www.youtube.com/watch?v=I1f2zzyMU6E' },
                { titre: 'Impulsion saut longueur', url: 'https://www.youtube.com/watch?v=XQmQHQgWzWU' }
            ],
            'Gymnastique': [
                { titre: 'Roulade avant gymnastique', url: 'https://www.youtube.com/watch?v=HyZB75YGvXM' },
                { titre: 'ATR gymnastique', url: 'https://www.youtube.com/watch?v=Ka6gB8VZdAI' },
                { titre: 'Roue gymnastique', url: 'https://www.youtube.com/watch?v=Rt1YZ-qAlwQ' }
            ]
        };

        // Déterminer le groupe APS et l'OTC
        let groupeAPS, otc, situationRef;

        if (['Handball', 'Football', 'Basketball'].includes(aps)) {
            groupeAPS = 'Sports collectifs';
            otc = OTC_SPORTS_COLLECTIFS[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
        } else if (aps === 'Volleyball') {
            groupeAPS = 'Sports collectifs (renvoi)';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            otc = OTC_ATHLETISME[niveau];
            situationRef = SITUATIONS_REFERENCE[aps] || SITUATIONS_REFERENCE['Course de vitesse'];
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            otc = OTC_GYMNASTIQUE[niveau];
            situationRef = SITUATIONS_REFERENCE['Gymnastique'];
        } else {
            groupeAPS = 'Activité physique';
            otc = "Développer les capacités motrices.";
            situationRef = { format: 'Situation adaptée', terrain: 'Adapté', regles: 'Règles adaptées au niveau' };
        }

        const oti = OTI[niveau];
        const niveauInfo = niveauComplexite[niveau];
        const youtubeLinks = YOUTUBE_LINKS[aps] || YOUTUBE_LINKS['Handball'];

        // ==================== PROMPT AMÉLIORÉ ====================

        const prompt = `Tu es un expert en EPS au Maroc avec 20 ans d'expérience. Génère une fiche de séance PROFESSIONNELLE.

**═══════════════════════════════════════════════════════════════**
**INFORMATIONS**
**═══════════════════════════════════════════════════════════════**

📚 Référentiel: ${opReference}
🎯 APS: ${aps}
📊 Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
📝 Séance N°: ${numeroSeance || 1}
⏱️ Durée: 60 minutes

**OBJECTIF DE LA SÉANCE:** ${objectif}

**CADRE OFFICIEL:**
• OTI: ${oti}
• OTC: ${otc}

**SITUATION DE RÉFÉRENCE OFFICIELLE:**
• Format: ${situationRef.format}
• Terrain: ${situationRef.terrain}
• Règles: ${situationRef.regles}

**═══════════════════════════════════════════════════════════════**
**CONSIGNES STRICTES**
**═══════════════════════════════════════════════════════════════**

1️⃣ Pour chaque situation, génère:
   - Un SCHÉMA ASCII DÉTAILLÉ avec légende (dimensions, positions, déplacements)
   - Un DÉROULEMENT expliqué en détail (étapes, timing, rotations)
   - Des CONSIGNES claires et numérotées
   - Des VARIANTES (simplifier/complexifier)

2️⃣ CRITÈRES DISTINCTS:
   🔵 RÉALISATION = COMMENT faire (gestes techniques)
   🟢 RÉUSSITE = QUOI obtenir (résultats quantifiables)

3️⃣ La SITUATION DE RÉFÉRENCE doit RESPECTER les règles officielles:
   ${situationRef.regles}

4️⃣ Adapte la complexité au niveau ${niveau}

**═══════════════════════════════════════════════════════════════**
**FORMAT DE SORTIE**
**═══════════════════════════════════════════════════════════════**

<h2>📌 PARTIE INTRODUCTIVE (15 min)</h2>

<h3>🔹 Prise en main (3 min)</h3>
<p><strong>Organisation:</strong> Rassemblement en demi-cercle face au professeur.</p>
<p><strong>Contenu:</strong></p>
<ul>
<li>Appel et vérification des tenues sportives</li>
<li>Annonce de l'objectif: "${objectif}"</li>
<li>Rappel des règles de sécurité spécifiques à ${aps}</li>
</ul>

<h3>🔹 Échauffement général (7 min)</h3>
<p><strong>Organisation:</strong> Élèves dispersés sur le terrain.</p>
<p><strong>Contenu:</strong></p>
<ul>
<li><strong>[2 min]</strong> Course légère avec changements de direction au signal</li>
<li><strong>[2 min]</strong> Mobilisation articulaire progressive: chevilles → genoux → hanches → épaules → nuque</li>
<li><strong>[3 min]</strong> Gammes athlétiques: montées de genoux, talons-fesses, pas chassés, course arrière</li>
</ul>

<h3>🔹 Échauffement spécifique ${aps} (5 min)</h3>
<p><strong>Organisation:</strong> [Décris disposition adaptée]</p>
<p><strong>Contenu:</strong></p>
<ul>
<li>[Exercice spécifique 1 avec détails]</li>
<li>[Exercice spécifique 2 avec détails]</li>
<li>[Exercice spécifique 3 avec détails]</li>
</ul>

<hr>

<h2>⚡ PARTIE FONDAMENTALE (35 min)</h2>

<div style="background:#e8f5e9;border-left:4px solid #1a5c3a;padding:10px;margin:10px 0;">
<p><strong>🎯 OBJECTIF:</strong> ${objectif}</p>
<p><strong>⚡ BUT DE LA PHASE:</strong> [Génère UN BUT UNIQUE qui résume ce que l'élève doit réaliser concrètement dans TOUTES les situations pour atteindre l'objectif]</p>
</div>

<h3>🎯 SITUATION 1: [Titre] (12 min)</h3>

<p><strong>📐 SCHÉMA DU DISPOSITIF:</strong></p>
<div style="background:#f5f5f5;border:2px solid #1a5c3a;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
╔═══════════════════════════════════════════════════════════╗
║                      TERRAIN [Xm x Ym]                     ║
║                                                            ║
║     ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆            ║
║     ┃                                        ┃            ║
║     ┃   △1        ●══════→        ○1        ┃   [BUT]    ║
║     ┃        ↘                  ↙           ┃    ▣       ║
║     ┃   △2         ════→         ○2        ┃            ║
║     ┃                                        ┃            ║
║     ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆            ║
║                                                            ║
║   LÉGENDE:                                                 ║
║   △ = Attaquant    ○ = Défenseur    ● = Ballon           ║
║   ◆ = Plot/Cône    → = Passe    ↘ = Déplacement          ║
║   ▣ = But/Cible    ━ = Ligne de zone                      ║
╚═══════════════════════════════════════════════════════════╝
</pre>
<p><em>Dimensions: [X]m x [Y]m | Matériel: [liste précise]</em></p>
</div>

<p><strong>📋 DÉROULEMENT:</strong></p>
<p>[Décris en détail: position de départ, signal, déroulement étape par étape, rotations, durée, nombre de répétitions. Minimum 6-8 phrases.]</p>

<p><strong>📢 CONSIGNES:</strong></p>
<ol>
<li>[Consigne claire 1]</li>
<li>[Consigne claire 2]</li>
<li>[Consigne claire 3]</li>
<li>[Consigne claire 4]</li>
</ol>

<p><strong>🔄 VARIANTES:</strong></p>
<table border="1" style="width:100%;border-collapse:collapse;">
<tr style="background:#e8e8e8;"><th style="width:50%">Pour SIMPLIFIER</th><th style="width:50%">Pour COMPLEXIFIER</th></tr>
<tr>
<td><ul><li>[Modification 1]</li><li>[Modification 2]</li></ul></td>
<td><ul><li>[Modification 1]</li><li>[Modification 2]</li></ul></td>
</tr>
</table>

<p><strong>🔵 CRITÈRES DE RÉALISATION:</strong></p>
<ul>
<li>[Geste technique 1]</li>
<li>[Geste technique 2]</li>
<li>[Geste technique 3]</li>
</ul>

<p><strong>🟢 CRITÈRES DE RÉUSSITE:</strong></p>
<ul>
<li>[Résultat quantifié 1]</li>
<li>[Résultat quantifié 2]</li>
</ul>

<h3>🎯 SITUATION 2: [Titre - jeu réduit avec opposition] (13 min)</h3>
[MÊME STRUCTURE COMPLÈTE - situation plus globale, proche du jeu réel]

<h3>🏆 SITUATION DE RÉFÉRENCE (10 min)</h3>

<p><strong>📐 DISPOSITIF:</strong></p>
<div style="background:#fff3e0;border:2px solid #e65100;padding:15px;margin:10px 0;font-family:monospace;">
<pre>
[SCHÉMA du terrain officiel de ${aps} avec positions]
</pre>
</div>

<p><strong>Format:</strong> ${situationRef.format}</p>
<p><strong>Terrain:</strong> ${situationRef.terrain}</p>
<p><strong>Règles officielles à respecter:</strong></p>
<ul>
${situationRef.regles.split(',').map(r => '<li>' + r.trim() + '</li>').join('\n')}
</ul>
<p><strong>Organisation:</strong> [Formation des équipes, arbitrage par élèves, rotation]</p>
<p><strong>Critères d'observation:</strong></p>
<ul>
<li>[Critère en lien avec l'objectif]</li>
<li>[Critère en lien avec l'OTC]</li>
</ul>

<hr>

<h2>🧘 PARTIE FINALE (10 min)</h2>

<h3>🔹 Retour au calme (5 min)</h3>
<ul>
<li>Marche lente + respiration profonde (1 min)</li>
<li>Étirements quadriceps: 20s chaque jambe</li>
<li>Étirements ischio-jambiers: 20s chaque jambe</li>
<li>Étirements adducteurs: 20s chaque côté</li>
<li>Étirements mollets: 20s chaque jambe</li>
<li>Étirements épaules/bras: 15s chaque</li>
</ul>

<h3>🔹 Bilan (5 min)</h3>
<p><strong>Questions:</strong></p>
<ul>
<li>"Quel était l'objectif de la séance?"</li>
<li>"Qu'avez-vous appris aujourd'hui?"</li>
<li>"Quelles difficultés avez-vous rencontrées?"</li>
</ul>
<p><strong>Feedback professeur:</strong> Points positifs, axes d'amélioration, annonce prochaine séance.</p>
<p><strong>Rangement:</strong> 4 élèves désignés pour ranger le matériel.</p>

===SEPARATEUR===

**🎥 VIDÉOS YOUTUBE RECOMMANDÉES:**

1. **${youtubeLinks[0].titre}**
   🔗 ${youtubeLinks[0].url}

2. **${youtubeLinks[1].titre}**
   🔗 ${youtubeLinks[1].url}

3. **${youtubeLinks[2].titre}**
   🔗 ${youtubeLinks[2].url}`;

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
        const videos = parties[1]?.trim() || `**🎥 VIDÉOS YOUTUBE RECOMMANDÉES:**\n\n1. **${youtubeLinks[0].titre}**\n   🔗 ${youtubeLinks[0].url}\n\n2. **${youtubeLinks[1].titre}**\n   🔗 ${youtubeLinks[1].url}\n\n3. **${youtubeLinks[2].titre}**\n   🔗 ${youtubeLinks[2].url}`;

        // ==================== HTML WORD MODIFIÉ ====================
        // Modifications appliquées:
        // 1. Supprimé: niveau (expertise), durée, effectif → Ajouté: case séance à la bonne place
        // 2. Phase fondamentale: UN SEUL BUT
        // 3. Critères SANS titres de situations
        // 4. Contenu: résumé déroulement + consignes + variantes, SANS schémas

        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche ${aps} - ${niveau}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.25cm 0.4cm}
@page Section1{size:297mm 210mm;mso-page-orientation:landscape;margin:0.25cm 0.4cm}
div.Section1{page:Section1}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Calibri',sans-serif;font-size:8.5pt;line-height:1.15;color:#000}
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
.footer-text{text-align:center;font-size:6.5pt;color:#555;margin-top:2px}
</style>
</head>
<body>
<div class="Section1">

<table class="header-table" style="margin-bottom:2px">
<tr>
<td style="text-align:left;width:25%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="text-align:center;width:30%"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="text-align:center;width:25%"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
<td style="text-align:right;width:20%"><b>Séance N°:</b> ${numeroSeance || 1}</td>
</tr>
</table>

<table style="margin-bottom:2px">
<tr><td class="title-cell">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS - ${aps.toUpperCase()}</td></tr>
</table>

<table style="margin-bottom:2px">
<tr>
<td class="label-cell">Groupe APS</td>
<td class="value-cell" style="width:22%">${groupeAPS}</td>
<td class="label-cell">APS</td>
<td class="value-cell" style="width:18%">${aps}</td>
<td class="label-cell">Niveau</td>
<td class="value-cell" style="width:15%">${niveau}</td>
<td class="label-cell">Séance</td>
<td class="value-cell" style="width:10%">${numeroSeance || 1}</td>
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
<td class="objectif-label">OBJECTIF DE LA SÉANCE</td>
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
<b>• Prise en main (3'):</b><br>
Appel, vérification tenues, présentation objectif, consignes de sécurité.<br><br>
<b>• Échauffement général (7'):</b><br>
Course légère (2 tours), mobilisation articulaire progressive (chevilles→nuque), gammes athlétiques (montées genoux, talons-fesses, pas chassés).<br><br>
<b>• Échauffement spécifique (5'):</b><br>
Exercices avec ballon/matériel ${aps}, gammes techniques de base adaptées au niveau ${niveau}.
</td>
<td class="but-cell">
• Préparer l'organisme à l'effort physique<br><br>
• Éveil psychique et concentration<br><br>
• Activation cardio-vasculaire<br><br>
• Prévention des blessures
</td>
<td class="critere-cell">
• Effectuer une mobilisation articulaire progressive du bas vers le haut<br><br>
• Augmenter progressivement l'intensité de l'effort<br><br>
• Contrôler sa respiration pendant l'effort<br><br>
• Exécuter correctement les mouvements demandés
</td>
<td class="critere-cell">
• Fréquence cardiaque entre 120 et 140 bpm<br><br>
• Légère transpiration visible<br><br>
• Tous les élèves sont attentifs et concentrés<br><br>
• 100% de participation active
</td>
</tr>
<tr>
<td class="partie-cell">FONDA-<br>MENTALE</td>
<td class="duree-cell">35<br>min</td>
<td class="contenu-cell">
<b>• SITUATION 1 (12'):</b><br>
<u>Déroulement:</u> Exercice analytique ciblant l'objectif de la séance. Les élèves travaillent par groupes de 4-6 sur terrain réduit. Rotation toutes les 3 minutes.<br>
<u>Consignes:</u> Respecter les zones, communiquer avec ses partenaires, enchaîner les actions rapidement.<br>
<u>Variantes:</u> Simplifier (sans opposition) / Complexifier (ajout défenseur ou contrainte temps).<br><br>

<b>• SITUATION 2 (13'):</b><br>
<u>Déroulement:</u> Jeu réduit ${niveauInfo.nbJoueurs} avec opposition réelle. Application de l'objectif en contexte de match. Rotation des équipes.<br>
<u>Consignes:</u> Appliquer ce qui a été appris, chercher à atteindre l'objectif, respecter les règles.<br>
<u>Variantes:</u> Simplifier (supériorité numérique) / Complexifier (infériorité ou contraintes).<br><br>

<b>• SITUATION DE RÉFÉRENCE (10'):</b><br>
${situationRef.format} sur ${situationRef.terrain}.<br>
<u>Règles:</u> ${situationRef.regles}
</td>
<td class="but-cell">
Réaliser les actions motrices permettant d'atteindre l'objectif de la séance à travers des situations progressives allant de l'analytique au global.
</td>
<td class="critere-cell">
• Se placer correctement avant chaque action<br><br>
• Orienter son regard vers la cible ou le partenaire<br><br>
• Exécuter le geste technique avec la bonne coordination<br><br>
• Enchaîner les actions de manière fluide<br><br>
• Prendre les informations avant d'agir<br><br>
• Faire des choix adaptés à la situation
</td>
<td class="critere-cell">
• Réussir au minimum 7 actions sur 10<br><br>
• Taux de réussite supérieur à 70%<br><br>
• Progression visible entre le début et la fin<br><br>
• Actions efficaces observables en situation de jeu<br><br>
• Objectif de la séance démontré lors de la situation de référence
</td>
</tr>
<tr>
<td class="partie-cell">FINALE</td>
<td class="duree-cell">10<br>min</td>
<td class="contenu-cell">
<b>• Retour au calme (5'):</b><br>
Marche lente avec respiration profonde. Étirements des principaux groupes musculaires sollicités: quadriceps, ischio-jambiers, adducteurs, mollets (maintenir 20 secondes chaque).<br><br>
<b>• Bilan de la séance (5'):</b><br>
Questions aux élèves: "Qu'avez-vous appris?", "Quelles difficultés?". Feedback du professeur sur les points positifs et axes d'amélioration. Rangement du matériel.
</td>
<td class="but-cell">
• Permettre la récupération physique<br><br>
• Assurer un retour au calme progressif<br><br>
• Réaliser un bilan formatif<br><br>
• Préparer la prochaine séance
</td>
<td class="critere-cell">
• Effectuer une marche lente et contrôlée<br><br>
• Pratiquer une respiration abdominale profonde<br><br>
• Réaliser les étirements sans à-coups<br><br>
• Participer activement aux échanges du bilan
</td>
<td class="critere-cell">
• Fréquence cardiaque inférieure à 100 bpm<br><br>
• Élèves calmes et détendus<br><br>
• Réponses pertinentes aux questions posées<br><br>
• Matériel rangé correctement
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
            situationReference: situationRef,
            groupeAPS,
            opReference,
            youtubeLinks
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
