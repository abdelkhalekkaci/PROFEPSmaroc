// ============================================================================
// API FICHES DE SÉANCE - generer-fiche.js
// ============================================================================
// Format: A4 PAYSAGE (297x210mm) | Sans colonne DURÉE | But rempli par partie
// Distinction: Objectif (apprentissage) vs But (action)
// Distinction: Critères réalisation (COMMENT) vs Critères réussite (MESURABLE)
// ============================================================================

const OTI = {
    '1AC': "À la fin de la 1ère année du cycle secondaire collégial, l'élève doit être capable d'acquérir une motricité correcte lui permettant de s'adapter aux exigences des différentes situations motrices et de s'intégrer positivement dans le groupe classe tout en respectant les règles de sécurité et de fair-play.",
    '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées, tout en développant ses capacités d'adaptation aux situations variées et en respectant les règles de jeu.",
    '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations en fonction de leurs exigences organisationnelles et réglementaires, tout en faisant preuve d'autonomie et de responsabilité.",
    'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices tout en développant son sens critique et sa capacité à gérer efficacement ses ressources physiques et mentales.",
    '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes et d'améliorer ses réalisations par une gestion efficace de ses ressources, tout en s'inscrivant dans une démarche de projet individuel ou collectif.",
    '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser finement les différentes situations motrices et de s'intégrer efficacement dans la réalisation de projets collectifs et individuels, en faisant preuve d'expertise technique et d'intelligence tactique."
};

const OTC = {
    'Handball': {
        '1AC': "Conserver collectivement la balle et participer activement au jeu pour progresser vers la cible adverse et marquer en situation de jeu réduit, tout en respectant les règles fondamentales.",
        '2AC': "Faire progresser la balle vers la cible par des déplacements variés et des passes adaptées, en s'inscrivant dans une organisation collective simple.",
        '3AC': "S'inscrire dans un projet collectif basé sur l'alternance rapide attaquant/défenseur, en utilisant des combinaisons simples et en exploitant les espaces libres.",
        'TC': "Utiliser des moyens techniques et tactiques adaptés pour créer des situations favorables au tir, en s'organisant collectivement.",
        '1AB': "Mettre en œuvre des choix tactiques collectifs pertinents avec vitesse d'exécution adaptée, en coordonnant les actions individuelles.",
        '2AB': "Élaborer une stratégie collective basée sur la maîtrise des rôles et l'occupation rationnelle de l'espace."
    },
    'Football': {
        '1AC': "Conserver le ballon individuellement et collectivement pour progresser vers le but adverse, en utilisant des conduites de balle et des passes simples.",
        '2AC': "Faire progresser le ballon par des conduites maîtrisées et des passes précises vers des partenaires démarqués.",
        '3AC': "Participer à un projet de jeu collectif intégrant les transitions attaque-défense, en occupant rationnellement l'espace.",
        'TC': "Organiser le jeu collectif en utilisant les fondamentaux techniques au service de la progression vers le but.",
        '1AB': "S'adapter aux configurations de jeu pour optimiser les choix tactiques individuels et collectifs.",
        '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force."
    },
    'Basketball': {
        '1AC': "Conserver la balle et progresser vers la cible en utilisant le dribble et la passe, tout en respectant les règles.",
        '2AC': "Créer et exploiter des situations favorables au tir par le démarquage et la circulation de balle.",
        '3AC': "S'inscrire dans une organisation collective offensive et défensive équilibrée.",
        'TC': "Optimiser la circulation de balle pour créer le déséquilibre défensif.",
        '1AB': "Analyser le rapport de force et adapter ses choix tactiques en fonction des réactions adverses.",
        '2AB': "Mettre en œuvre des systèmes de jeu élaborés en attaque et en défense."
    },
    'Volleyball': {
        '1AC': "Se déplacer et se placer correctement pour renvoyer la balle dans le camp adverse, en utilisant la manchette et la touche haute.",
        '2AC': "Construire l'attaque par un renvoi indirect utilisant un relais, en s'organisant pour la réception-passe-attaque.",
        '3AC': "Organiser la défense et orienter la construction offensive vers la zone avant.",
        'TC': "S'organiser collectivement dans la limite des trois touches réglementaires.",
        '1AB': "Optimiser la construction du point avec des rôles différenciés.",
        '2AB': "Mettre en place une organisation collective avec combinaisons offensives variées."
    },
    'Course de vitesse': {
        '1AC': "Réagir rapidement au signal de départ et maintenir sa vitesse maximale sur une distance courte (40-60m).",
        '2AC': "Améliorer sa technique de course (fréquence et amplitude) pour optimiser sa vitesse sur 60-80m.",
        '3AC': "Gérer sa course du départ à l'arrivée en optimisant l'accélération et le maintien de vitesse.",
        'TC': "Maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.",
        '1AB': "Analyser et améliorer ses points faibles techniques et physiques.",
        '2AB': "Atteindre son potentiel maximal par une préparation et une exécution optimales."
    },
    'Saut en longueur': {
        '1AC': "Réaliser une course d'élan progressivement accélérée suivie d'une impulsion et une réception équilibrée.",
        '2AC': "Enchaîner une course d'élan régulière, une impulsion active et un saut avec attitude aérienne simple.",
        '3AC': "Optimiser sa course d'élan étalonnée pour faire coïncider vitesse maximale et planche d'appel.",
        'TC': "Maîtriser l'organisation de sa course d'élan et la qualité de son impulsion.",
        '1AB': "Augmenter l'efficacité du saut par la maîtrise de la liaison course-impulsion.",
        '2AB': "Optimiser sa performance en coordonnant les trois phases du saut."
    },
    'Saut en hauteur': {
        '1AC': "Franchir une barre en utilisant une course d'élan et une impulsion vers le haut.",
        '2AC': "Réaliser un franchissement dorsal (fosbury-flop) avec course d'élan courbe adaptée.",
        '3AC': "Optimiser son franchissement par une meilleure coordination course courbe-impulsion-rotation.",
        'TC': "Maîtriser la technique du fosbury-flop avec course d'élan courbe efficace.",
        '1AB': "Améliorer sa performance par l'optimisation de chaque phase technique.",
        '2AB': "Réaliser une performance optimale en gérant les paramètres de la compétition."
    },
    'Course de durée': {
        '1AC': "Courir de façon régulière sur une durée donnée (8-10 min) en gérant son effort.",
        '2AC': "Adapter son allure de course pour maintenir un effort prolongé (10-12 min).",
        '3AC': "Construire et respecter un projet de course en fonction de ses capacités (12-15 min).",
        'TC': "Planifier et réaliser une performance en gérant efficacement ses ressources énergétiques.",
        '1AB': "Optimiser sa performance par une gestion stratégique de l'allure.",
        '2AB': "Atteindre ses objectifs personnels par une stratégie de course adaptée."
    },
    'Lancer de poids': {
        '1AC': "Lancer un engin en utilisant une poussée du bras depuis l'épaule, dans le respect des règles.",
        '2AC': "Coordonner la poussée des jambes et l'action du bras lanceur pour améliorer la distance.",
        '3AC': "Enchaîner les actions motrices du lancer en respectant la technique.",
        'TC': "Réaliser un lancer en maîtrisant la coordination des segments corporels.",
        '1AB': "Améliorer sa performance par le perfectionnement technique.",
        '2AB': "Optimiser sa performance par une maîtrise complète de la chaîne de lancer."
    },
    'Gymnastique': {
        '1AC': "Réaliser un enchaînement simple au sol comprenant des éléments gymniques de base.",
        '2AC': "Présenter un enchaînement gymnique varié avec des liaisons fluides.",
        '3AC': "Concevoir et réaliser un enchaînement individuel au sol avec originalité.",
        'TC': "Présenter un enchaînement gymnique au sol avec maîtrise technique.",
        '1AB': "Composer et réaliser un enchaînement avec continuité et expression personnelle.",
        '2AB': "Concevoir, réaliser et évaluer un enchaînement gymnique avec expertise."
    },
    'Tennis de table': {
        '1AC': "Maintenir un échange en renvoyant la balle sur la table adverse, en utilisant coup droit et revers.",
        '2AC': "Diriger la balle dans différentes zones de la table pour mettre l'adversaire en difficulté.",
        '3AC': "Varier les trajectoires, les vitesses et les effets pour prendre l'initiative du point.",
        'TC': "Construire le point en utilisant des variations de placement, vitesse et effet.",
        '1AB': "Élaborer des stratégies de jeu adaptées aux caractéristiques de l'adversaire.",
        '2AB': "Mettre en œuvre un projet de jeu personnel et l'adapter en cours de match."
    },
    'Badminton': {
        '1AC': "Renvoyer le volant dans le terrain adverse en utilisant les frappes de base.",
        '2AC': "Varier la longueur et la direction de ses frappes pour déplacer l'adversaire.",
        '3AC': "Alterner jeu long et jeu court pour créer des espaces libres.",
        'TC': "Construire le point en exploitant les espaces libres du terrain adverse.",
        '1AB': "Élaborer des séquences de jeu tactiquement cohérentes.",
        '2AB': "Concevoir et appliquer une stratégie de jeu personnelle adaptée à l'adversaire."
    }
};

const getSituationReference = (aps, isCollege) => {
    const situations = {
        'Handball': 'Match 7 contre 7 sur terrain réglementaire (40x20m) avec application des règles officielles et arbitrage',
        'Football': 'Match 7 contre 7 sur terrain réduit (50x30m) avec 2 buts et application des règles simplifiées',
        'Basketball': 'Match 5 contre 5 sur demi-terrain avec panier, application des règles officielles et arbitrage',
        'Volleyball': 'Match 6 contre 6 sur terrain réglementaire (9x18m) avec filet à hauteur adaptée et rotation',
        'Tennis de table': 'Match en simple au meilleur des 3 sets de 11 points avec application des règles officielles',
        'Badminton': 'Match en simple au meilleur des 3 sets de 21 points avec application des règles officielles',
        'Course de vitesse': isCollege ? 'Course chronométrée sur 60 mètres en couloir individuel avec départ au signal' : 'Course chronométrée sur 80 mètres en couloir individuel avec départ au signal',
        'Saut en longueur': 'Concours de 3 essais mesurés avec course d\'élan libre, la meilleure performance est retenue',
        'Saut en hauteur': 'Concours à barres montantes avec 3 essais maximum par hauteur, technique libre',
        'Lancer de poids': 'Concours de 3 essais mesurés depuis le plateau de lancer, la meilleure performance est retenue',
        'Course de durée': 'Course de 12 minutes en régulant son allure, la distance parcourue est mesurée',
        'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés du niveau'
    };
    return situations[aps] || 'Situation adaptée au niveau';
};

const VOCABULAIRE_APS = {
    'Handball': 'passe à terre, passe en cloche, réception à deux mains, dribble, tir en appui, tir en suspension, feinte, démarquage, appel de balle, pivot, ailier, arrière, zone 6m, contre-attaque, repli défensif',
    'Football': 'conduite de balle, contrôle orienté, passe courte intérieur du pied, passe longue, tir, dribble, tacle, marquage, démarquage, appel en profondeur, une-deux',
    'Basketball': 'dribble de progression, dribble de protection, passe à terre, passe une main, lay-up, tir en suspension, rebond, écran, pick and roll, démarquage, pivot',
    'Volleyball': 'manchette bras tendus, touche haute, service cuillère, service tennis, smash, bloc, réception, passe, passeur, attaquant, rotation',
    'Course de vitesse': 'position de départ, réaction au signal, mise en action, accélération, fréquence, amplitude, maintien de vitesse, finish',
    'Course de durée': 'allure régulière, gestion de l\'effort, fréquence cardiaque, endurance, récupération, foulée économique',
    'Saut en longueur': 'course d\'élan, marques, planche d\'appel, impulsion, phase d\'envol, réception, fosse',
    'Saut en hauteur': 'course d\'élan courbe, pied d\'appel extérieur, impulsion, rotation dorsale, fosbury-flop, réception',
    'Lancer de poids': 'position dos à l\'aire, tenue au cou, translation, poussée, extension du bras, équilibre final',
    'Gymnastique': 'roulade avant, roulade arrière, ATR, roue, pont, souplesse, équilibre, saut, liaison, amplitude, tenue',
    'Tennis de table': 'coup droit, revers, service court, service long, effet coupé, effet lifté, placement, déplacement',
    'Badminton': 'dégagé, amorti, smash, drive, service court, service long, replacement'
};

const getGroupeAPS = (aps) => {
    if (['Handball', 'Football', 'Basketball'].includes(aps)) return 'Sports marquage et démarquage';
    if (['Tennis de table', 'Badminton', 'Volleyball'].includes(aps)) return 'Sports de renvoi';
    if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    return 'Activité';
};

// Fallbacks spécifiques par APS
const FALLBACKS = {
    'Handball': {
        echauf: 'Manipulation balle individuelle (2 min) | Passes binômes 6m (3 min) | Jeu 10 passes 4c2 (3 min)',
        s1t: 'Conservation et progression collective',
        s1b: 'Conserver la balle et atteindre la zone de marque pour marquer un point',
        s1o: '4 attaquants vs 2 défenseurs, terrain 20x15m, 4 plots, 1 ballon',
        s1d: 'Les 4 attaquants conservent le ballon face à 2 défenseurs. 1 point si la balle arrive dans la zone de marque. Rotation toutes les 2 minutes.',
        s1c: '1. Regarder avant de passer\n2. Passe à terre tendue\n3. Se démarquer dans l\'espace libre\n4. Appeler la balle bras levé',
        s1v: 'Simplifier: 4c1, 3 touches obligatoires | Complexifier: 4c3, 2 touches max',
        s2t: 'Match à thème',
        s2b: 'Marquer un but en appliquant les techniques travaillées',
        s2o: '2 équipes de 5, terrain 30x20m avec 2 buts',
        s2d: 'Match avec obligation d\'appliquer l\'objectif. Point bonus (+1) si objectif visible. Arrêts pour feedback.',
        s2c: '1. Appliquer l\'objectif travaillé\n2. S\'engager en attaque et défense\n3. Respecter les règles\n4. Communiquer avec l\'équipe',
        s2v: 'Simplifier: supériorité numérique | Complexifier: infériorité numérique',
        cr: '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine\n• Déplacement dans l\'espace libre après la passe\n• Réception à deux mains bras tendus',
        cs: '• 7 passes réussies sur 10 tentatives\n• Atteindre la zone 3 fois sur 5 possessions\n• Temps de possession supérieur à 20 secondes\n• Marquer 2 buts minimum en 5 minutes'
    },
    'Football': {
        echauf: 'Conduite de balle en slalom (2 min) | Passes intérieur du pied à 8m (3 min) | Contrôle orienté + passe (3 min)',
        s1t: 'Conservation et progression vers le but',
        s1b: 'Conserver le ballon et marquer dans le mini-but adverse',
        s1o: '4c2 sur terrain 25x20m, 2 mini-buts, chasubles, 1 ballon',
        s1d: 'Les 4 attaquants conservent et progressent vers le but. Le défenseur qui récupère devient attaquant. Rotation toutes les 3 min.',
        s1c: '1. Contrôle orienté vers l\'espace libre\n2. Passe courte avec l\'intérieur du pied\n3. Appel de balle en profondeur\n4. Lever la tête avant de passer',
        s1v: 'Simplifier: 4c1, ballon au sol | Complexifier: 4c3, 2 touches max',
        s2t: 'Match à thème',
        s2b: 'Marquer un but en utilisant les techniques travaillées',
        s2o: '2 équipes de 5, terrain 40x25m avec 2 buts',
        s2d: 'Match avec point bonus si application de l\'objectif visible. Arrêts pour corrections.',
        s2c: '1. Appliquer l\'objectif\n2. Jouer vers l\'avant\n3. Se replacer défensivement\n4. Communiquer',
        s2v: 'Simplifier: joker offensif | Complexifier: 2 touches maximum',
        cr: '• Contrôle avec l\'intérieur du pied orienté vers la cible\n• Surface de contact au centre du ballon\n• Pied d\'appui à côté du ballon lors de la frappe\n• Regard sur le ballon puis sur la cible',
        cs: '• 8 contrôles réussis sur 10 tentatives\n• 7 passes arrivées au partenaire sur 10\n• Conserver le ballon 30 secondes minimum\n• Marquer 1 but par période de 5 min'
    },
    'Basketball': {
        echauf: 'Dribble main droite/gauche slalom (2 min) | Passes à terre triangle (3 min) | Lay-up sans opposition (3 min)',
        s1t: 'Passe et va vers le panier',
        s1b: 'Réaliser un passe et va pour marquer un panier',
        s1o: '3c2 sur demi-terrain avec panier, 1 ballon, chasubles',
        s1d: 'Les 3 attaquants appliquent le passe et va pour créer le décalage. Chaque panier après passe et va = 2 points. Rotation après possession.',
        s1c: '1. Passer et couper immédiatement vers le panier\n2. Recevoir en course sans marcher\n3. Finir en lay-up main extérieure\n4. Écarter si passe et va défendu',
        s1v: 'Simplifier: 3c1, défenseur passif | Complexifier: 3c3, écran obligatoire',
        s2t: 'Match à thème',
        s2b: 'Marquer en utilisant le passe et va',
        s2o: '2 équipes de 4, demi-terrain',
        s2d: 'Match avec bonus pour chaque panier après passe et va. Rotations toutes les 4 min.',
        s2c: '1. Appliquer le passe et va\n2. Espacer le jeu\n3. Défendre son joueur\n4. Communiquer',
        s2v: 'Simplifier: supériorité | Complexifier: 2 dribbles max',
        cr: '• Passe tendue à hauteur de poitrine\n• Coupe directe vers le panier après la passe\n• Réception en course regard vers le panier\n• Lay-up avec appui intérieur et main extérieure',
        cs: '• 6 lay-up réussis sur 10 tentatives\n• 3 paniers après passe et va sur 5 possessions\n• 0 marcher sur 10 réceptions\n• Équipe avec plus de 10 points en 5 min'
    },
    'Volleyball': {
        echauf: 'Jonglage manchette individuel (2 min) | Échanges touche haute par 2 (3 min) | Service + réception (3 min)',
        s1t: 'Construction en 3 touches',
        s1b: 'Construire une attaque en utilisant les 3 touches réglementaires',
        s1o: '3c3 sur terrain réduit 6x9m, filet à 2m, 1 ballon',
        s1d: 'L\'équipe en réception construit en 3 touches: R1 vers R2, R2 vers R3, R3 attaque. Point bonus si 3 touches.',
        s1c: '1. Manchette orientée vers le passeur\n2. Touche haute à 1m du filet\n3. Attaque vers le sol adverse\n4. Annoncer "j\'ai!"',
        s1v: 'Simplifier: lancer au lieu de servir | Complexifier: attaque smashée obligatoire',
        s2t: 'Match à thème',
        s2b: 'Marquer le point en construisant en 3 touches',
        s2o: '2 équipes de 4, terrain 7x14m',
        s2d: 'Match avec bonus pour chaque point marqué en 3 touches. Rotation toutes les 5 points.',
        s2c: '1. Construire en 3 touches\n2. Communiquer les positions\n3. Couvrir l\'attaquant\n4. Assurer la rotation',
        s2v: 'Simplifier: 2 touches autorisées | Complexifier: zone d\'attaque imposée',
        cr: '• Bras tendus et joints pour la manchette\n• Mains en coupe au-dessus du front pour la touche\n• Déplacement sous le ballon avant la frappe\n• Orientation des appuis vers la cible',
        cs: '• 7 manchettes vers zone passeur sur 10\n• 6 touches hautes exploitables sur 10\n• 3 attaques gagnantes sur 5 tentatives\n• 4 constructions en 3 touches sur 5 réceptions'
    }
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { aps, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance, classe } = req.body;

        if (!aps || !niveau || !objectif) {
            return res.status(400).json({ success: false, error: 'APS, niveau et objectif requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = getSituationReference(aps, isCollege);
        const groupeAPS = getGroupeAPS(aps);
        const vocabAPS = VOCABULAIRE_APS[aps] || '';

        // ==================== PROMPT IA ====================
        const prompt = `Tu es un expert en EPS au Maroc, spécialiste de ${aps}.

SÉANCE À PRÉPARER:
- APS: ${aps}
- Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
- OBJECTIF DE LA SÉANCE (ce que l'élève va APPRENDRE): "${objectif}"

VOCABULAIRE TECHNIQUE OBLIGATOIRE pour ${aps}: ${vocabAPS}

DISTINCTIONS IMPORTANTES:
- OBJECTIF = ce que l'élève APPREND (apprentissage visé)
- BUT = ce que l'élève FAIT dans la situation (action concrète)
- CRITÈRES DE RÉALISATION = COMMENT bien faire (qualité du geste)
- CRITÈRES DE RÉUSSITE = EST-CE RÉUSSI ? (mesurable, chiffré)

GÉNÈRE CE CONTENU 100% SPÉCIFIQUE à ${aps}:

ECHAUFFEMENT_SPECIFIQUE: [3 exercices spécifiques à ${aps}, format: nom (durée)]

SITUATION1_TITRE: [titre court lié à l'objectif]
SITUATION1_BUT: [ce que l'élève doit FAIRE - UNE phrase d'action]
SITUATION1_ORGANISATION: [nombre joueurs, dimensions en mètres, matériel]
SITUATION1_DEROULEMENT: [4-5 phrases décrivant précisément ce qui se passe]
SITUATION1_CONSIGNES: [4 consignes techniques spécifiques]
SITUATION1_VARIANTES: [Simplifier: 2 façons | Complexifier: 2 façons]

SITUATION2_TITRE: [titre - situation plus proche du jeu réel]
SITUATION2_BUT: [ce que l'élève doit FAIRE]
SITUATION2_ORGANISATION: [organisation détaillée]
SITUATION2_DEROULEMENT: [4-5 phrases]
SITUATION2_CONSIGNES: [4 consignes]
SITUATION2_VARIANTES: [variantes]

CRITERES_REALISATION: [4 critères décrivant COMMENT bien faire - qualité technique]
CRITERES_REUSSITE: [4 critères MESURABLES avec CHIFFRES - pourcentages, nombres]`;

        const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 3500, temperature: 0.7 })
        });

        const data = await groqResp.json();
        const contenu = data.choices?.[0]?.message?.content || '';

        // Extraction
        const extract = (key) => {
            const regex = new RegExp(key + ':?\\s*([\\s\\S]*?)(?=\\n[A-Z][A-Z0-9_]+:|$)', 'i');
            const match = contenu.match(regex);
            return match ? match[1].trim() : '';
        };

        let echaufSpec = extract('ECHAUFFEMENT_SPECIFIQUE');
        let s1Titre = extract('SITUATION1_TITRE');
        let s1But = extract('SITUATION1_BUT');
        let s1Orga = extract('SITUATION1_ORGANISATION');
        let s1Deroul = extract('SITUATION1_DEROULEMENT');
        let s1Consignes = extract('SITUATION1_CONSIGNES');
        let s1Variantes = extract('SITUATION1_VARIANTES');
        let s2Titre = extract('SITUATION2_TITRE');
        let s2But = extract('SITUATION2_BUT');
        let s2Orga = extract('SITUATION2_ORGANISATION');
        let s2Deroul = extract('SITUATION2_DEROULEMENT');
        let s2Consignes = extract('SITUATION2_CONSIGNES');
        let s2Variantes = extract('SITUATION2_VARIANTES');
        let critReal = extract('CRITERES_REALISATION');
        let critReuss = extract('CRITERES_REUSSITE');

        // Appliquer fallbacks
        const fb = FALLBACKS[aps] || FALLBACKS['Handball'];
        if (!echaufSpec || echaufSpec.length < 20) echaufSpec = fb.echauf;
        if (!s1Titre || s1Titre.length < 5) s1Titre = fb.s1t;
        if (!s1But || s1But.length < 10) s1But = fb.s1b;
        if (!s1Orga || s1Orga.length < 20) s1Orga = fb.s1o;
        if (!s1Deroul || s1Deroul.length < 50) s1Deroul = fb.s1d;
        if (!s1Consignes || s1Consignes.length < 30) s1Consignes = fb.s1c;
        if (!s1Variantes || s1Variantes.length < 20) s1Variantes = fb.s1v;
        if (!s2Titre || s2Titre.length < 5) s2Titre = fb.s2t;
        if (!s2But || s2But.length < 10) s2But = fb.s2b;
        if (!s2Orga || s2Orga.length < 20) s2Orga = fb.s2o;
        if (!s2Deroul || s2Deroul.length < 30) s2Deroul = fb.s2d;
        if (!s2Consignes || s2Consignes.length < 30) s2Consignes = fb.s2c;
        if (!s2Variantes || s2Variantes.length < 20) s2Variantes = fb.s2v;
        if (!critReal || critReal.length < 50) critReal = fb.cr;
        if (!critReuss || critReuss.length < 50) critReuss = fb.cs;

        // BUT de la partie fondamentale (lié à l'objectif)
        const butFonda = `Atteindre l'objectif: ${objectif}`;
// ==================== FONCTION SCHÉMAS COLORÉS ====================
const getSchema = (aps, numSit) => {
    const schemas = {
        'Handball': {
            1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#90EE90" stroke="#228B22" stroke-width="2" rx="5"/>
                <rect x="5" y="45" width="25" height="30" fill="none" stroke="#228B22" stroke-width="2"/>
                <rect x="170" y="45" width="25" height="30" fill="none" stroke="#228B22" stroke-width="2"/>
                <circle cx="60" cy="40" r="8" fill="#c1272d"/><text x="60" y="44" text-anchor="middle" fill="white" font-size="10">A</text>
                <circle cx="60" cy="80" r="8" fill="#c1272d"/><text x="60" y="84" text-anchor="middle" fill="white" font-size="10">A</text>
                <circle cx="100" cy="60" r="8" fill="#c1272d"/><text x="100" y="64" text-anchor="middle" fill="white" font-size="10">A</text>
                <circle cx="80" cy="60" r="8" fill="#c1272d"/><text x="80" y="64" text-anchor="middle" fill="white" font-size="10">A</text>
                <circle cx="130" cy="50" r="8" fill="#1565c0"/><text x="130" y="54" text-anchor="middle" fill="white" font-size="10">D</text>
                <circle cx="130" cy="70" r="8" fill="#1565c0"/><text x="130" y="74" text-anchor="middle" fill="white" font-size="10">D</text>
                <path d="M68 40 L92 58" stroke="#333" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrow)"/>
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">4 Att. vs 2 Déf.</text>
            </svg>`,
            2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#90EE90" stroke="#228B22" stroke-width="2" rx="5"/>
                <rect x="5" y="45" width="25" height="30" fill="none" stroke="#228B22" stroke-width="2"/>
                <rect x="170" y="45" width="25" height="30" fill="none" stroke="#228B22" stroke-width="2"/>
                <circle cx="50" cy="35" r="7" fill="#c1272d"/><circle cx="50" cy="60" r="7" fill="#c1272d"/>
                <circle cx="50" cy="85" r="7" fill="#c1272d"/><circle cx="80" cy="48" r="7" fill="#c1272d"/>
                <circle cx="80" cy="72" r="7" fill="#c1272d"/>
                <circle cx="120" cy="35" r="7" fill="#1565c0"/><circle cx="120" cy="60" r="7" fill="#1565c0"/>
                <circle cx="120" cy="85" r="7" fill="#1565c0"/><circle cx="150" cy="48" r="7" fill="#1565c0"/>
                <circle cx="150" cy="72" r="7" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">Match 5 vs 5</text>
            </svg>`
        },
        'Football': {
            1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#90EE90" stroke="#228B22" stroke-width="2" rx="5"/>
                <rect x="5" y="40" width="20" height="40" fill="none" stroke="#228B22" stroke-width="2"/>
                <rect x="175" y="40" width="20" height="40" fill="none" stroke="#228B22" stroke-width="2"/>
                <circle cx="100" cy="60" r="15" fill="none" stroke="#228B22" stroke-width="1"/>
                <circle cx="55" cy="40" r="8" fill="#c1272d"/><circle cx="55" cy="80" r="8" fill="#c1272d"/>
                <circle cx="85" cy="50" r="8" fill="#c1272d"/><circle cx="85" cy="70" r="8" fill="#c1272d"/>
                <circle cx="130" cy="60" r="8" fill="#1565c0"/><circle cx="150" cy="60" r="8" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">4 vs 2 - Progression</text>
            </svg>`,
            2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#90EE90" stroke="#228B22" stroke-width="2" rx="5"/>
                <rect x="5" y="40" width="20" height="40" fill="none" stroke="#228B22" stroke-width="2"/>
                <rect x="175" y="40" width="20" height="40" fill="none" stroke="#228B22" stroke-width="2"/>
                <circle cx="40" cy="60" r="6" fill="#c1272d"/><circle cx="70" cy="35" r="6" fill="#c1272d"/>
                <circle cx="70" cy="85" r="6" fill="#c1272d"/><circle cx="90" cy="50" r="6" fill="#c1272d"/>
                <circle cx="90" cy="70" r="6" fill="#c1272d"/>
                <circle cx="160" cy="60" r="6" fill="#1565c0"/><circle cx="130" cy="35" r="6" fill="#1565c0"/>
                <circle cx="130" cy="85" r="6" fill="#1565c0"/><circle cx="110" cy="50" r="6" fill="#1565c0"/>
                <circle cx="110" cy="70" r="6" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">Match à thème</text>
            </svg>`
        },
        'Basketball': {
            1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#DEB887" stroke="#8B4513" stroke-width="2" rx="5"/>
                <circle cx="175" cy="60" r="20" fill="none" stroke="#8B4513" stroke-width="2"/>
                <rect x="170" y="50" width="25" height="20" fill="none" stroke="#8B4513" stroke-width="2"/>
                <circle cx="60" cy="40" r="8" fill="#c1272d"/><circle cx="60" cy="80" r="8" fill="#c1272d"/>
                <circle cx="90" cy="60" r="8" fill="#c1272d"/>
                <circle cx="130" cy="50" r="8" fill="#1565c0"/><circle cx="130" cy="70" r="8" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">3 vs 2 - Passe et va</text>
            </svg>`,
            2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#DEB887" stroke="#8B4513" stroke-width="2" rx="5"/>
                <circle cx="175" cy="60" r="20" fill="none" stroke="#8B4513" stroke-width="2"/>
                <circle cx="50" cy="40" r="6" fill="#c1272d"/><circle cx="50" cy="80" r="6" fill="#c1272d"/>
                <circle cx="80" cy="50" r="6" fill="#c1272d"/><circle cx="80" cy="70" r="6" fill="#c1272d"/>
                <circle cx="120" cy="40" r="6" fill="#1565c0"/><circle cx="120" cy="80" r="6" fill="#1565c0"/>
                <circle cx="140" cy="50" r="6" fill="#1565c0"/><circle cx="140" cy="70" r="6" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">4 vs 4 Match</text>
            </svg>`
        },
        'Volleyball': {
            1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#F0E68C" stroke="#DAA520" stroke-width="2" rx="5"/>
                <line x1="100" y1="5" x2="100" y2="115" stroke="#333" stroke-width="3"/>
                <circle cx="50" cy="40" r="8" fill="#c1272d"/><text x="50" y="44" text-anchor="middle" fill="white" font-size="8">R</text>
                <circle cx="50" cy="80" r="8" fill="#c1272d"/><text x="50" y="84" text-anchor="middle" fill="white" font-size="8">P</text>
                <circle cx="75" cy="60" r="8" fill="#c1272d"/><text x="75" y="64" text-anchor="middle" fill="white" font-size="8">A</text>
                <circle cx="150" cy="40" r="8" fill="#1565c0"/><circle cx="150" cy="80" r="8" fill="#1565c0"/>
                <circle cx="125" cy="60" r="8" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">3 vs 3 - Construction</text>
            </svg>`,
            2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
                <rect x="5" y="5" width="190" height="110" fill="#F0E68C" stroke="#DAA520" stroke-width="2" rx="5"/>
                <line x1="100" y1="5" x2="100" y2="115" stroke="#333" stroke-width="3"/>
                <circle cx="35" cy="30" r="6" fill="#c1272d"/><circle cx="65" cy="30" r="6" fill="#c1272d"/>
                <circle cx="35" cy="60" r="6" fill="#c1272d"/><circle cx="65" cy="60" r="6" fill="#c1272d"/>
                <circle cx="135" cy="30" r="6" fill="#1565c0"/><circle cx="165" cy="30" r="6" fill="#1565c0"/>
                <circle cx="135" cy="60" r="6" fill="#1565c0"/><circle cx="165" cy="60" r="6" fill="#1565c0"/>
                <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9">4 vs 4 Match</text>
            </svg>`
        }
    };
    // Schéma par défaut pour les autres APS
    const defaultSchema = `<svg viewBox="0 0 200 100" style="width:100%;max-width:280px;height:auto;margin:10px auto;display:block;">
        <rect x="5" y="5" width="190" height="90" fill="#E8E8E8" stroke="#666" stroke-width="2" rx="8"/>
        <text x="100" y="55" text-anchor="middle" fill="#666" font-size="12">Zone de travail</text>
    </svg>`;
    
    return schemas[aps]?.[numSit] || defaultSchema;
};
        // ==================== HTML DISPLAY (SITE) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',sans-serif;max-width:900px;margin:0 auto;line-height:1.5;">
    <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:18px;border-radius:10px;margin-bottom:15px;">
        <h1 style="margin:0 0 6px 0;font-size:1.4rem;">📋 Fiche de Séance - ${aps}</h1>
        <div style="display:flex;gap:15px;flex-wrap:wrap;font-size:0.85rem;opacity:0.9;">
            <span><strong>Niveau:</strong> ${niveau}</span>
            <span><strong>Séance:</strong> N°${numeroSeance || 1}</span>
            <span><strong>Groupe:</strong> ${groupeAPS}</span>
        </div>
    </div>

    <div style="background:#ffebee;border-left:4px solid #c1272d;padding:12px 15px;border-radius:0 8px 8px 0;margin-bottom:15px;">
        <h2 style="color:#c1272d;margin:0 0 5px 0;font-size:0.95rem;">🎯 OBJECTIF DE LA SÉANCE</h2>
        <p style="margin:0;font-size:0.8rem;color:#666;font-style:italic;">(Ce que l'élève va APPRENDRE)</p>
        <p style="margin:8px 0 0 0;font-size:1rem;font-weight:500;">${objectif}</p>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h2 style="color:#c1272d;border-bottom:2px solid #c1272d;padding-bottom:6px;margin:0 0 12px 0;font-size:0.95rem;">📌 PARTIE INTRODUCTIVE (15 min)</h2>
        <p style="margin:0 0 8px 0;background:#fff3e0;padding:8px 12px;border-radius:6px;border-left:3px solid #ff9800;"><strong>🎯 But:</strong> Préparer le corps à l'effort</p>
        <div style="background:#f8f9fa;padding:10px;border-radius:6px;font-size:0.85rem;">
            • Prise en main: appel, tenues, objectif, sécurité<br>
            • Échauffement général: course, mobilisation articulaire<br>
            • Échauffement spécifique: ${echaufSpec}
        </div>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h2 style="color:#006233;border-bottom:2px solid #006233;padding-bottom:6px;margin:0 0 15px 0;font-size:0.95rem;">⚡ PARTIE FONDAMENTALE (30 min)</h2>
        <p style="margin:0 0 15px 0;background:#e8f5e9;padding:8px 12px;border-radius:6px;border-left:3px solid #006233;"><strong>🎯 But:</strong> ${butFonda}</p>

        <div style="background:#f1f8e9;border-radius:8px;padding:12px;margin-bottom:15px;border:1px solid #aed581;">
            <h3 style="color:#33691e;margin:0 0 10px 0;font-size:0.9rem;">
                <span style="background:#006233;color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-right:6px;">SIT 1</span>${s1Titre}
            </h3>
            <p style="margin:0 0 10px 0;background:white;padding:8px 12px;border-radius:5px;border-left:3px solid #006233;">
                <strong>🎯 But:</strong> <em>(Ce que l'élève doit FAIRE)</em><br>
                <span style="font-weight:500;">${s1But}</span>
            </p>
            <div style="font-size:0.85rem;">
                <p><strong>📍 Organisation:</strong> ${s1Orga}</p>
                <p><strong>📋 Déroulement:</strong> ${s1Deroul}</p>
                <p><strong>📢 Consignes:</strong></p>
                <div style="margin-left:15px;">${s1Consignes.split('\n').map(c => '<div>' + c + '</div>').join('')}</div>
              <p style="background:#fff8e1;padding:8px;border-radius:5px;margin-top:8px;"><strong>🔄 Variantes:</strong> ${s1Variantes.replace(/\n/g, ' | ')}</p>
<div style="margin-top:10px;padding:10px;background:#f5f5f5;border-radius:8px;">
    <p style="text-align:center;font-weight:bold;color:#006233;margin-bottom:5px;font-size:0.8rem;">📐 Schéma d'organisation</p>
    ${getSchema(aps, 1)}
</div>
</div>
</div>

        <div style="background:#e3f2fd;border-radius:8px;padding:12px;margin-bottom:15px;border:1px solid #64b5f6;">
            <h3 style="color:#0d47a1;margin:0 0 10px 0;font-size:0.9rem;">
                <span style="background:#1565c0;color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-right:6px;">SIT 2</span>${s2Titre}
            </h3>
            <p style="margin:0 0 10px 0;background:white;padding:8px 12px;border-radius:5px;border-left:3px solid #1565c0;">
                <strong>🎯 But:</strong> <em>(Ce que l'élève doit FAIRE)</em><br>
                <span style="font-weight:500;">${s2But}</span>
            </p>
            <div style="font-size:0.85rem;">
                <p><strong>📍 Organisation:</strong> ${s2Orga}</p>
                <p><strong>📋 Déroulement:</strong> ${s2Deroul}</p>
                <p><strong>📢 Consignes:</strong></p>
                <div style="margin-left:15px;">${s2Consignes.split('\n').map(c => '<div>' + c + '</div>').join('')}</div>
                <p style="background:#fff8e1;padding:8px;border-radius:5px;margin-top:8px;"><strong>🔄 Variantes:</strong> ${s2Variantes.replace(/\n/g, ' | ')}</p>
<div style="margin-top:10px;padding:10px;background:#f5f5f5;border-radius:8px;">
    <p style="text-align:center;font-weight:bold;color:#1565c0;margin-bottom:5px;font-size:0.8rem;">📐 Schéma d'organisation</p>
    ${getSchema(aps, 2)}
</div>
</div>
</div>

        <div style="background:#fff3e0;border-radius:8px;padding:10px 12px;border-left:3px solid #ff9800;">
            <h3 style="color:#e65100;margin:0 0 5px 0;font-size:0.85rem;">◆ SITUATION DE RÉFÉRENCE</h3>
            <p style="margin:0;font-size:0.85rem;">${sitRef}</p>
        </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:15px;">
        <div style="background:#e8f5e9;border-radius:8px;padding:12px;border:1px solid #81c784;">
            <h3 style="color:#2e7d32;margin:0 0 5px 0;font-size:0.85rem;">✅ Critères de RÉALISATION</h3>
            <p style="font-size:0.75rem;color:#666;margin:0 0 8px 0;font-style:italic;">COMMENT bien faire (qualité du geste)</p>
            <div style="font-size:0.8rem;line-height:1.6;">${critReal.split('\n').map(c => '<div>' + c.replace('•', '✓') + '</div>').join('')}</div>
        </div>
        <div style="background:#e3f2fd;border-radius:8px;padding:12px;border:1px solid #64b5f6;">
            <h3 style="color:#1565c0;margin:0 0 5px 0;font-size:0.85rem;">🎯 Critères de RÉUSSITE</h3>
            <p style="font-size:0.75rem;color:#666;margin:0 0 8px 0;font-style:italic;">EST-CE RÉUSSI ? (mesurable, chiffré)</p>
            <div style="font-size:0.8rem;line-height:1.6;">${critReuss.split('\n').map(c => '<div>' + c.replace('•', '✓') + '</div>').join('')}</div>
        </div>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;">
        <h2 style="color:#c1272d;border-bottom:2px solid #c1272d;padding-bottom:6px;margin:0 0 12px 0;font-size:0.95rem;">🧘 PARTIE FINALE (10 min)</h2>
        <p style="margin:0 0 8px 0;background:#fff3e0;padding:8px 12px;border-radius:6px;border-left:3px solid #ff9800;"><strong>🎯 But:</strong> Retour au calme</p>
        <div style="background:#f8f9fa;padding:10px;border-radius:6px;font-size:0.85rem;">
            • Marche lente et respiration profonde<br>
            • Étirements des groupes musculaires sollicités<br>
            • Bilan de séance et rangement du matériel
        </div>
    </div>
</div>`;

        // ==================== HTML WORD/PDF - A4 PAYSAGE ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps} ${niveau}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm}
@page Section1 {size:297mm 210mm;mso-page-orientation:landscape;}
div.Section1 {page:Section1;}
body{font-family:Calibri,Arial,sans-serif;font-size:7pt;line-height:1.1;margin:0;padding:0}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th,td{border:0.5pt solid #000;padding:2px 3px;vertical-align:top}
.header-row td{border:none;padding:1px 2px;font-size:6.5pt}
.main-title{text-align:center;font-size:9pt;font-weight:bold;background:#006233;color:#fff;padding:2px}
.section-header{background:#f0f0f0;font-weight:bold;font-size:6pt;text-align:center}
.obj-row{background:#c1272d;color:#fff;font-weight:bold;font-size:7pt}
.table-header{background:#006233;color:#fff;font-weight:bold;text-align:center;font-size:6pt;padding:2px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:7pt}
.content-cell{font-size:6.5pt;line-height:1.15}
.sit-title{font-weight:bold;color:#006233;font-size:6.5pt}
</style></head>
<body>
<table class="header-row"><tr>
<td style="width:22%"><b>Prof:</b> ${nomProf || '________'}</td>
<td style="width:28%;text-align:center"><b>Établissement:</b> ${etablissement || '________'}</td>
<td style="width:18%;text-align:center"><b>Classe:</b> ${classe || '____'}</td>
<td style="width:32%;text-align:right"><b>Année:</b> ${anneeScolaire || '2024-2025'}</td>
</tr></table>
<table><tr><td class="main-title">FICHE DE SÉANCE EPS - ${aps.toUpperCase()}</td></tr></table>
<table>
<tr>
<td class="section-header" style="width:7%">Groupe</td><td style="width:11%;font-size:6.5pt;text-align:center">${groupeAPS}</td>
<td class="section-header" style="width:4%">APS</td><td style="width:9%;font-size:7pt;text-align:center;font-weight:bold">${aps}</td>
<td class="section-header" style="width:5%">Niveau</td><td style="width:6%;font-size:6.5pt;text-align:center">${niveau}</td>
<td class="section-header" style="width:5%">Séance</td><td style="width:4%;font-size:7pt;text-align:center;font-weight:bold">${numeroSeance || 1}</td>
<td class="section-header" style="width:5%">Durée</td><td style="width:5%;font-size:6.5pt;text-align:center">55min</td>
</tr>
<tr><td class="section-header">OTI</td><td colspan="9" style="font-size:5.5pt">${oti}</td></tr>
<tr><td class="section-header">OTC</td><td colspan="9" style="font-size:5.5pt">${otc}</td></tr>
<tr><td class="obj-row" style="text-align:center">OBJECTIF</td><td colspan="9" style="background:#ffebee;font-size:7pt;font-weight:bold">${objectif}</td></tr>
</table>
<table>
<tr>
<th class="table-header" style="width:6%">PARTIES</th>
<th class="table-header" style="width:52%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="table-header" style="width:10%">BUT</th>
<th class="table-header" style="width:16%">C. RÉALISATION<br><small style="font-weight:normal">(comment faire)</small></th>
<th class="table-header" style="width:16%">C. RÉUSSITE<br><small style="font-weight:normal">(est-ce réussi?)</small></th>
</tr>
<tr>
<td class="partie-cell" style="height:30px">INTRO<br>15 min</td>
<td class="content-cell">• Prise en main: appel, tenues, objectif, sécurité<br>• Échauffement général: course, mobilisation articulaire<br>• Échauffement spécifique: ${echaufSpec}</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt;background:#fff8e1">Préparer le corps à l'effort</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666;font-size:5.5pt" colspan="2">—</td>
</tr>
<tr>
<td class="partie-cell" style="height:145px">FONDA<br>30 min</td>
<td class="content-cell">
<span class="sit-title">◆ SIT.1: ${s1Titre}</span><br>
<b>But:</b> ${s1But}<br>
<b>Org:</b> ${s1Orga}<br>
<b>Déroul:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' | ')}<br>
<b>Var:</b> ${s1Variantes.replace(/\n/g, ' | ')}<br><br>
<span class="sit-title">◆ SIT.2: ${s2Titre}</span><br>
<b>But:</b> ${s2But}<br>
<b>Org:</b> ${s2Orga}<br>
<b>Déroul:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' | ')}<br>
<b>Var:</b> ${s2Variantes.replace(/\n/g, ' | ')}<br><br>
<span class="sit-title">◆ SIT.REF:</span> ${sitRef}
</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt;background:#e8f5e9;padding:3px">${butFonda}</td>
<td class="content-cell" style="font-size:6pt">${critReal.replace(/\n/g, '<br>')}</td>
<td class="content-cell" style="font-size:6pt">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>
<tr>
<td class="partie-cell" style="height:25px">FINALE<br>10 min</td>
<td class="content-cell">• Marche lente et respiration profonde<br>• Étirements des groupes musculaires sollicités<br>• Bilan de séance et rangement du matériel</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt;background:#fff8e1">Retour au calme</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666;font-size:5.5pt" colspan="2">—</td>
</tr>
</table>
<p style="text-align:center;font-size:5pt;color:#666;margin-top:1px">Document conforme aux OP ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - MEN Maroc</p>
</body></html>`;

        const filename = `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
            filename,
            oti,
            otc,
            groupeAPS,
            situationReference: sitRef
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
