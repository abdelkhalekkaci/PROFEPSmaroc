// ============================================================================
// API PROJETS DE CYCLE - generer-projet.js
// ============================================================================
// Format: A4 PAYSAGE (297x210mm)
// Objectifs: 1-2 phrases explicites et claires par séance
// Situation de référence: Phrase complète
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

const getGroupeAPS = (aps) => {
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) return 'Sports collectifs';
    if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sports de renvoi';
    if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    return 'Activité';
};

// ==================== OBJECTIFS EXPLICITES PAR APS (1-2 phrases) ====================
const OBJECTIFS_CYCLE = {
    'Handball': [
        "Évaluer le niveau initial des élèves en handball à travers une situation de jeu 4c4 pour identifier les acquis et les besoins en passe, réception et démarquage.",
        "Découvrir les règles fondamentales du handball (marcher, reprise de dribble, zone des 6m) et manipuler le ballon avec aisance.",
        "Améliorer la qualité de la passe à terre: orientation du corps vers la cible, passe tendue à hauteur de poitrine.",
        "Apprendre à se démarquer efficacement en créant de l'espace par rapport au défenseur pour recevoir dans une position favorable.",
        "Enchaîner réception et passe rapidement sans temps d'arrêt pour maintenir la continuité du jeu collectif.",
        "Découvrir le tir en appui et améliorer la précision en visant les différentes zones du but.",
        "Organiser le jeu collectif en occupant l'espace en largeur et profondeur avec des rôles définis.",
        "Appliquer les principes d'attaque (écartement, pénétration) en situation de surnombre 4c3.",
        "Intégrer les acquis techniques et tactiques dans un match 5c5 avec arbitrage par les élèves.",
        "Évaluer les compétences acquises à travers la situation de référence en observant l'efficacité technique et tactique."
    ],
    'Football': [
        "Évaluer le niveau initial des élèves via un match 4c4 pour observer la conduite de balle, les passes et les placements.",
        "Découvrir les règles du football (hors-jeu, fautes, remises en jeu) et manipuler le ballon avec différentes surfaces.",
        "Améliorer la conduite de balle en slalom et le contrôle orienté pour enchaîner vers une passe ou un dribble.",
        "Travailler la passe courte avec l'intérieur du pied: pied d'appui à côté du ballon, frappe au centre.",
        "Se démarquer efficacement en effectuant des appels de balle dans le dos du défenseur.",
        "Découvrir le tir et améliorer la frappe de balle vers le but avec précision.",
        "Organiser le jeu collectif: circulation de balle, appui-soutien, occupation des couloirs.",
        "Appliquer le jeu en triangle et les combinaisons simples (une-deux) en situation réduite.",
        "Intégrer les acquis dans un match 6c6 avec respect des règles et des postes.",
        "Évaluer via la situation de référence en observant l'efficacité technique, tactique et le fair-play."
    ],
    'Basketball': [
        "Évaluer le niveau initial des élèves en basketball via un 3c3 pour observer dribble, passe, tir et déplacements.",
        "Découvrir les règles du basketball (marcher, reprise de dribble, fautes) et manipuler le ballon des deux mains.",
        "Améliorer le dribble de progression main droite puis main gauche face à un défenseur.",
        "Travailler la passe à terre et la passe à une main vers un partenaire en mouvement.",
        "Se démarquer avec et sans ballon en utilisant les changements de direction et les feintes.",
        "Découvrir le tir en course (lay-up) et améliorer la coordination appuis-tir avec la main extérieure.",
        "Organiser le jeu collectif: espacement entre joueurs, circulation joueurs et ballon.",
        "Appliquer les principes d'attaque placée et de contre-attaque rapide en situation 4c4.",
        "Intégrer les acquis dans un match avec arbitrage, rotations et systèmes travaillés.",
        "Évaluer les compétences via la situation de référence en observant l'efficacité offensive et défensive."
    ],
    'Volleyball': [
        "Évaluer le niveau initial via des échanges 2c2 pour observer la manchette, la touche haute et le service.",
        "Découvrir les règles du volleyball (3 touches, rotation, fautes) et s'initier à la manchette bras tendus.",
        "Améliorer la manchette de réception: se placer sous le ballon, bras tendus et joints, orienter vers le passeur.",
        "Travailler la touche haute pour réaliser une passe précise: mains en coupe au-dessus du front.",
        "Découvrir le service cuillère et améliorer sa régularité en visant différentes zones.",
        "Construire une attaque en 3 touches avec rôles définis: réceptionneur, passeur, attaquant.",
        "Organiser la défense: placement en réception, couverture d'attaque, anticipation des trajectoires.",
        "Appliquer l'alternance jeu court (amorti) et jeu long (attaque puissante) pour déstabiliser l'adversaire.",
        "Intégrer les acquis dans un match 4c4 puis 6c6 avec rotation obligatoire et communication.",
        "Évaluer les compétences via la situation de référence en observant la construction du point."
    ],
    'Course de vitesse': [
        "Évaluer le niveau initial sur 40m chronométré pour identifier les points forts et faibles de chaque élève.",
        "Découvrir les différentes phases de la course: réaction au signal, mise en action, accélération, maintien.",
        "Améliorer la réaction au signal de départ et la mise en action explosive sur les 10 premiers mètres.",
        "Travailler l'accélération progressive en augmentant la fréquence puis l'amplitude des foulées.",
        "Optimiser la fréquence et l'amplitude des foulées en phase de vitesse maximale (20-40m).",
        "Maintenir sa vitesse maximale sans décélération jusqu'à la ligne d'arrivée en restant relâché.",
        "Améliorer l'alignement segmentaire (tête-tronc-bassin) et le relâchement des épaules.",
        "Travailler le finish: franchir la ligne sans ralentir, en projetant le buste vers l'avant.",
        "Intégrer tous les éléments techniques dans des courses chronométrées avec analyse.",
        "Évaluer la performance finale sur la distance de référence avec mesure du temps."
    ],
    'Saut en longueur': [
        "Évaluer le niveau initial via 3 sauts libres pour observer course d'élan, impulsion et réception.",
        "Découvrir les différentes phases du saut: course accélérée, impulsion sur planche, envol, réception.",
        "Étalonner sa course d'élan en plaçant des marques pour atteindre la planche avec vitesse optimale.",
        "Améliorer l'impulsion: placement du pied d'appel à plat, poussée verticale et horizontale, genou libre haut.",
        "Travailler la phase d'envol: maintien de l'équilibre, position groupée ou en extension.",
        "Optimiser la réception: ramener les jambes vers l'avant, bras vers l'avant, tomber en avant.",
        "Coordonner course-impulsion-envol dans un enchaînement fluide sans perte de vitesse.",
        "Augmenter progressivement la vitesse de course tout en conservant la précision sur la planche.",
        "Réaliser des sauts complets avec mesure des performances et analyse des points à améliorer.",
        "Évaluer la performance finale via le concours de 3 essais avec notation technique et mesure."
    ],
    'Saut en hauteur': [
        "Évaluer le niveau initial via des franchissements à hauteur basse pour observer la technique de base.",
        "Découvrir les différentes phases: course d'élan courbe, impulsion sur pied extérieur, franchissement dorsal.",
        "Travailler la course d'élan courbe: 5-7 foulées en arc de cercle avec accélération progressive.",
        "Améliorer l'impulsion: pied extérieur actif, bras et genou libre vers le haut, regard vers la barre.",
        "Découvrir la rotation dorsale (fosbury-flop): basculer les épaules, cambrer le dos au-dessus de la barre.",
        "Optimiser l'esquive des hanches et des jambes pour franchir la barre sans la toucher.",
        "Coordonner course courbe-impulsion-rotation dans un enchaînement fluide et rythmé.",
        "Augmenter progressivement la hauteur de la barre en conservant la qualité technique.",
        "Réaliser des concours avec barres montantes pour développer la gestion du stress compétitif.",
        "Évaluer la performance finale via le concours à barres montantes avec analyse technique."
    ],
    'Course de durée': [
        "Évaluer le niveau initial via une course de 6 minutes pour estimer la VMA et les capacités d'endurance.",
        "Découvrir les principes de la gestion de l'effort: allure régulière, respiration, hydratation.",
        "Apprendre à courir à une allure constante en utilisant des repères de temps (chrono, plots).",
        "Travailler la régularité de l'allure: maintenir le même temps de passage sur chaque tour.",
        "Développer l'endurance en augmentant progressivement la durée de course (8, 10, 12 min).",
        "Construire un projet de course personnel: définir une allure cible en fonction de ses capacités.",
        "Optimiser la foulée économique: amplitude modérée, pose du pied sous le centre de gravité.",
        "Gérer les variations de terrain et de rythme sans perdre sa régularité d'allure.",
        "Réaliser des courses avec contrat de distance: annoncer et respecter son objectif personnel.",
        "Évaluer via la course de 12 minutes avec mesure de la distance et analyse de la régularité."
    ],
    'Lancer de poids': [
        "Évaluer le niveau initial via des lancers à bras cassé pour observer coordination et puissance.",
        "Découvrir la tenue de l'engin au cou et la position de départ dos à l'aire de lancer.",
        "Travailler le placement initial: poids au cou, coude haut, dos à l'aire, équilibre sur jambe arrière.",
        "Améliorer la poussée des jambes: transfert du poids du corps de l'arrière vers l'avant.",
        "Coordonner la rotation du tronc et l'extension du bras lanceur dans un mouvement explosif.",
        "Travailler le fouetté final du poignet pour optimiser la trajectoire de l'engin.",
        "Enchaîner translation-rotation-poussée dans un geste fluide et équilibré.",
        "Respecter l'équilibre final: rester dans le cercle après le lancer, ne pas mordre.",
        "Réaliser des concours avec 3 essais mesurés et analyse technique de chaque lancer.",
        "Évaluer la performance via le concours final avec mesure et notation technique."
    ],
    'Gymnastique': [
        "Évaluer le niveau initial via la présentation d'éléments simples (roulade avant, équilibre, saut).",
        "Découvrir les familles d'éléments: rotations, renversements, sauts, maintiens, souplesses.",
        "Maîtriser la roulade avant et arrière: départ et arrivée stabilisés, corps groupé, menton poitrine.",
        "Apprendre l'ATR (appui tendu renversé): placement des mains, alignement bras-tronc-jambes, gainage.",
        "Travailler la roue avec amplitude: impulsion jambe, passage par l'ATR, réception pieds décalés.",
        "Découvrir les éléments de souplesse: pont, souplesse avant, maintiens en équilibre.",
        "Lier les éléments entre eux: enchaîner 3-4 éléments avec fluidité et sans temps d'arrêt.",
        "Composer un enchaînement personnel respectant les exigences du niveau.",
        "Répéter et perfectionner son enchaînement en travaillant amplitude, tenue et liaisons.",
        "Présenter son enchaînement devant la classe et être évalué selon les critères définis."
    ],
    'Tennis de table': [
        "Évaluer le niveau initial via des échanges libres pour observer coup droit, revers et service.",
        "Découvrir les règles du tennis de table et la prise de raquette orthodoxe.",
        "Améliorer le coup droit: placement latéral, rotation du tronc, accompagnement de la balle.",
        "Travailler le revers: coude près du corps, rotation des épaules, frappe devant soi.",
        "Découvrir le service réglementaire: balle visible, lancée verticalement, frappée derrière la table.",
        "Varier les placements pour déplacer l'adversaire: jouer long/court, droite/gauche.",
        "Découvrir les effets: coupé (balle qui flotte) et lifté (balle qui plonge) pour varier le jeu.",
        "Construire le point en utilisant des séquences tactiques: service-3ème balle.",
        "Intégrer les acquis dans des matchs avec comptage des points et application des règles.",
        "Évaluer les compétences via des matchs en simple avec observation technique et tactique."
    ],
    'Badminton': [
        "Évaluer le niveau initial via des échanges libres pour observer les frappes et les déplacements.",
        "Découvrir les règles du badminton et la prise universelle de la raquette.",
        "Améliorer le dégagé (fond de court): frappe haute, bras tendu, accompagnement vers la cible.",
        "Travailler l'amorti au filet: frappe douce, volant qui tombe près du filet adverse.",
        "Découvrir le service court et long: trajectoires différentes pour surprendre l'adversaire.",
        "Varier la longueur et la direction des frappes pour déplacer l'adversaire et créer des espaces.",
        "Alterner jeu long (dégagé) et jeu court (amorti) pour déstabiliser l'adversaire.",
        "Se replacer au centre du terrain après chaque frappe pour couvrir tout l'espace.",
        "Intégrer les acquis dans des matchs en simple avec application des règles et comptage.",
        "Évaluer les compétences via des matchs en observant construction du point et déplacements."
    ]
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { aps, niveau, niveauEleves, nombreSeances, nomProf, etablissement, anneeScolaire } = req.body;

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const nb = parseInt(nombreSeances) || 10;
        const nivEleves = niveauEleves || 'moyen';
        const nivTxt = { 'debutant': 'Débutant', 'moyen': 'Moyen', 'avance': 'Avancé', 'elite': 'Expert' }[nivEleves] || 'Moyen';

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = getSituationReference(aps, isCollege);
        const groupeAPS = getGroupeAPS(aps);

        // Récupérer les objectifs
        let objectifs = OBJECTIFS_CYCLE[aps] || OBJECTIFS_CYCLE['Handball'];

        // Adapter au nombre de séances
        while (objectifs.length < nb) {
            objectifs.splice(-1, 0, "Consolider les acquis techniques et tactiques à travers des situations variées.");
        }
        objectifs = objectifs.slice(0, nb);

        // Générer les lignes du tableau
        let rows = '';
        for (let i = 0; i < nb; i++) {
            let phase, phaseColor;
            if (i === 0) { phase = 'Éval. diagnostique'; phaseColor = '#fff3e0'; }
            else if (i === nb - 1) { phase = 'Éval. terminale'; phaseColor = '#ffebee'; }
            else if (i < nb / 3) { phase = 'Découverte'; phaseColor = '#e3f2fd'; }
            else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseColor = '#e8f5e9'; }
            else { phase = 'Consolidation'; phaseColor = '#f3e5f5'; }

            rows += `<tr>
                <td style="text-align:center;background:${phaseColor};font-size:7pt;font-weight:bold;border:1px solid #000;">${phase}</td>
                <td style="text-align:center;font-weight:bold;font-size:9pt;background:#f5f5f5;border:1px solid #000;">${i + 1}</td>
                <td style="font-size:7.5pt;padding:4px 6px;border:1px solid #000;line-height:1.3;">${objectifs[i]}</td>
            </tr>`;
        }

        // ==================== HTML WORD/PDF - A4 PAYSAGE ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Projet de Cycle - ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}
body{font-family:Calibri,Arial,sans-serif;font-size:8pt;margin:0;padding:0}
table{width:100%;border-collapse:collapse;margin-bottom:8px}
th,td{border:1px solid #000;padding:3px 5px;vertical-align:top}
.main-title{font-size:18pt;font-weight:bold;text-align:center;color:#c1272d;margin:5px 0;border:none}
.sub-title{font-size:11pt;text-align:center;color:#006233;margin:0 0 10px 0;border:none}
.section-header{background:#e8e8e8;font-weight:bold;text-align:center;font-size:7pt}
.cycle-header{background:linear-gradient(90deg,#c1272d,#006233);color:#fff;font-weight:bold;font-size:9pt;text-align:center;padding:6px}
.label-cell{background:#f5f5f5;font-weight:bold;font-size:7pt;width:12%}
.info-row td{border:none;font-size:8pt;padding:2px 5px}
</style>
</head>
<body>

<p class="main-title">📊 PROJET PÉDAGOGIQUE DE CYCLE</p>
<p class="sub-title">${aps} - ${niveau} - Niveau élèves: ${nivTxt}</p>

<table class="info-row">
<tr>
<td style="width:30%"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td style="width:40%;text-align:center"><b>Établissement:</b> ${etablissement || '________________________'}</td>
<td style="width:30%;text-align:right"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table>
<tr>
<td class="section-header" style="width:8%">GROUPE APS</td>
<td style="width:12%;text-align:center;font-size:8pt">${groupeAPS}</td>
<td class="section-header" style="width:5%">APS</td>
<td style="width:10%;text-align:center;font-size:9pt;font-weight:bold;color:#006233">${aps}</td>
<td class="section-header" style="width:6%">NIVEAU</td>
<td style="width:6%;text-align:center;font-size:8pt">${niveau}</td>
<td class="section-header" style="width:8%">NIV. ÉLÈVES</td>
<td style="width:8%;text-align:center;font-weight:bold;color:#c1272d">${nivTxt}</td>
<td class="section-header" style="width:7%">SÉANCES</td>
<td style="width:5%;text-align:center;font-size:10pt;font-weight:bold">${nb}</td>
</tr>
</table>

<table>
<tr>
<td class="label-cell">OTI</td>
<td style="font-size:6.5pt;line-height:1.2">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td style="font-size:6.5pt;line-height:1.2">${otc}</td>
</tr>
<tr>
<td class="label-cell">SITUATION DE RÉFÉRENCE</td>
<td style="font-size:7.5pt;font-weight:bold;color:#006233">${sitRef}</td>
</tr>
</table>

<table>
<tr>
<td class="cycle-header" colspan="3">PROGRESSION PÉDAGOGIQUE DU CYCLE</td>
</tr>
<tr>
<th style="background:#006233;color:#fff;width:15%;font-size:7pt;text-align:center">PHASE</th>
<th style="background:#006233;color:#fff;width:5%;font-size:7pt;text-align:center">N°</th>
<th style="background:#006233;color:#fff;font-size:7pt;text-align:center">OBJECTIF OPÉRATIONNEL DE LA SÉANCE</th>
</tr>
${rows}
</table>

<table style="border:none;margin-top:10px">
<tr>
<td style="border:none;font-size:7pt;width:60%">
<b>Légende des phases:</b><br>
🟠 Évaluation diagnostique | 🔵 Découverte | 🟢 Apprentissage | 🟣 Consolidation | 🔴 Évaluation terminale
</td>
<td style="border:none;text-align:right;font-size:8pt">
<b>Signature du professeur:</b> ____________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:6pt;color:#666;margin-top:8px">
Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - MEN Maroc
</p>

</body>
</html>`;

        // ==================== HTML DISPLAY (Site) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',sans-serif;max-width:950px;margin:0 auto;line-height:1.5;">
    <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:20px;border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0 0 8px 0;font-size:1.5rem;">📊 Projet de Cycle - ${aps}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>Niveau:</strong> ${niveau}</span>
            <span><strong>Niveau élèves:</strong> ${nivTxt}</span>
            <span><strong>Séances:</strong> ${nb}</span>
            <span><strong>Groupe:</strong> ${groupeAPS}</span>
        </div>
    </div>

    <div style="background:#f8f9fa;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h3 style="color:#006233;margin:0 0 10px 0;font-size:0.95rem;">📋 Références officielles</h3>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTI:</strong> ${oti}</p>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTC:</strong> ${otc}</p>
        <p style="margin:0;font-size:0.85rem;"><strong>Situation de référence:</strong> <span style="color:#006233;font-weight:500;">${sitRef}</span></p>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#c1272d,#006233);color:white;padding:12px;text-align:center;font-weight:bold;">
            PROGRESSION PÉDAGOGIQUE
        </div>
        <table style="width:100%;border-collapse:collapse;">
            <tr style="background:#006233;color:white;">
                <th style="padding:10px;width:15%;font-size:0.8rem;">Phase</th>
                <th style="padding:10px;width:5%;font-size:0.8rem;">N°</th>
                <th style="padding:10px;font-size:0.8rem;">Objectif opérationnel</th>
            </tr>
            ${objectifs.map((obj, i) => {
                let phase, phaseBg, phaseColor;
                if (i === 0) { phase = 'Éval. diag.'; phaseBg = '#fff3e0'; phaseColor = '#e65100'; }
                else if (i === nb - 1) { phase = 'Éval. term.'; phaseBg = '#ffebee'; phaseColor = '#c62828'; }
                else if (i < nb / 3) { phase = 'Découverte'; phaseBg = '#e3f2fd'; phaseColor = '#1565c0'; }
                else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseBg = '#e8f5e9'; phaseColor = '#2e7d32'; }
                else { phase = 'Consolidation'; phaseBg = '#f3e5f5'; phaseColor = '#7b1fa2'; }
                return `<tr style="border-bottom:1px solid #e0e0e0;">
                    <td style="padding:10px;background:${phaseBg};text-align:center;font-weight:bold;color:${phaseColor};font-size:0.8rem;">${phase}</td>
                    <td style="padding:10px;text-align:center;font-weight:bold;font-size:1rem;background:#f5f5f5;">${i + 1}</td>
                    <td style="padding:10px;font-size:0.85rem;">${obj}</td>
                </tr>`;
            }).join('')}
        </table>
    </div>
</div>`;

        const filename = `Projet_Cycle_${aps.replace(/\s+/g, '_')}_${niveau}_${nb}seances.doc`;

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
