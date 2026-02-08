// ============================================================================
// RÉFÉRENCES PARTAGÉES - /api/data/references.js
// OTI, OTC, Vocabulaire APS, Situations de référence, Critères d'observation
// OBJECTIFS_CYCLE avec fonctions helpers
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
        '1AC': "Conserver collectivement la balle et participer activement au jeu pour progresser vers la cible adverse et marquer en situation de jeu réduit, tout en respectant les règles fondamentales et en assurant la continuité du jeu.",
        '2AC': "Faire progresser la balle vers la cible par des déplacements variés et des passes adaptées, en s'inscrivant dans une organisation collective simple et en assumant les rôles d'attaquant et de défenseur.",
        '3AC': "S'inscrire dans un projet collectif basé sur l'alternance rapide attaquant/défenseur, en utilisant des combinaisons simples et en exploitant les espaces libres pour créer le déséquilibre.",
        'TC': "Utiliser des moyens techniques et tactiques adaptés pour créer des situations favorables au tir, en s'organisant collectivement en attaque et en défense selon des principes de jeu identifiés.",
        '1AB': "Mettre en œuvre des choix tactiques collectifs pertinents avec vitesse d'exécution adaptée, en gérant le rapport de force et en coordonnant les actions individuelles au service du projet d'équipe.",
        '2AB': "Élaborer une stratégie collective basée sur la maîtrise des rôles et l'occupation rationnelle de l'espace, en s'adaptant aux configurations de jeu et en optimisant l'efficacité collective."
    },
    'Football': {
        '1AC': "Conserver le ballon individuellement et collectivement pour progresser vers le but adverse, en utilisant des conduites de balle et des passes simples, tout en respectant les règles et la sécurité.",
        '2AC': "Faire progresser le ballon par des conduites maîtrisées et des passes précises vers des partenaires démarqués, en s'organisant pour attaquer et défendre collectivement.",
        '3AC': "Participer à un projet de jeu collectif intégrant les transitions attaque-défense, en occupant rationnellement l'espace et en enchaînant les actions avec pertinence.",
        'TC': "Organiser le jeu collectif en utilisant les fondamentaux techniques au service de la progression vers le but, en respectant les principes d'attaque et de défense.",
        '1AB': "S'adapter aux configurations de jeu pour optimiser les choix tactiques individuels et collectifs, en gérant les transitions et en créant le surnombre offensif.",
        '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force, en coordonnant les actions et en exploitant les points faibles adverses."
    },
    'Basketball': {
        '1AC': "Conserver la balle et progresser vers la cible en utilisant le dribble et la passe, tout en respectant les règles du non-contact et du marcher, dans une organisation collective simple.",
        '2AC': "Créer et exploiter des situations favorables au tir par le démarquage et la circulation de balle, en assumant les rôles offensifs et défensifs.",
        '3AC': "S'inscrire dans une organisation collective offensive et défensive équilibrée, en utilisant les écrans et les appels de balle pour créer le déséquilibre.",
        'TC': "Optimiser la circulation de balle pour créer le déséquilibre défensif, en utilisant des systèmes de jeu simples et en respectant l'espacement.",
        '1AB': "Analyser le rapport de force et adapter ses choix tactiques en fonction des réactions adverses, en variant les formes d'attaque et de défense.",
        '2AB': "Mettre en œuvre des systèmes de jeu élaborés en attaque et en défense, en s'adaptant aux stratégies adverses et en optimisant l'efficacité collective."
    },
    'Volleyball': {
        '1AC': "Se déplacer et se placer correctement pour renvoyer la balle dans le camp adverse, en utilisant la manchette et la touche haute, tout en respectant les règles et la rotation.",
        '2AC': "Construire l'attaque par un renvoi indirect utilisant un relais, en s'organisant pour assurer la réception, la passe et l'attaque dans la limite des trois touches.",
        '3AC': "Organiser la défense et orienter la construction offensive vers la zone avant, en différenciant les rôles de passeur et d'attaquant selon les positions.",
        'TC': "S'organiser collectivement dans la limite des trois touches réglementaires, en optimisant la réception-passe-attaque et en assurant la couverture défensive.",
        '1AB': "Optimiser la construction du point avec des rôles différenciés, en variant les formes d'attaque et en adaptant la défense aux configurations adverses.",
        '2AB': "Mettre en place une organisation collective avec combinaisons offensives variées, en utilisant les feintes et en exploitant les faiblesses adverses."
    },
    'Course de vitesse': {
        '1AC': "Réagir rapidement au signal de départ et maintenir sa vitesse maximale sur une distance courte (40-60m), en courant dans son couloir.",
        '2AC': "Améliorer sa technique de course (fréquence et amplitude des foulées) pour optimiser sa vitesse sur 60-80m, avec un départ réactif.",
        '3AC': "Gérer sa course du départ à l'arrivée en optimisant l'accélération, le maintien de la vitesse maximale et la finition.",
        'TC': "Maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.",
        '1AB': "Analyser et améliorer ses points faibles techniques et physiques pour progresser vers sa performance optimale.",
        '2AB': "Atteindre son potentiel maximal par une préparation et une exécution optimales, en gérant le stress de la compétition."
    },
    'Saut en longueur': {
        '1AC': "Réaliser une course d'élan progressivement accélérée suivie d'une impulsion vers l'avant et le haut, et une réception équilibrée sur les deux pieds dans la fosse.",
        '2AC': "Enchaîner une course d'élan régulière et accélérée, une impulsion active sur la planche d'appel et un saut avec une attitude aérienne simple.",
        '3AC': "Optimiser sa course d'élan étalonnée pour faire coïncider la vitesse maximale avec la planche d'appel, et améliorer l'efficacité de l'impulsion et de la suspension.",
        'TC': "Maîtriser l'organisation de sa course d'élan et la qualité de son impulsion pour réaliser une performance optimale, en adoptant une technique aérienne efficace.",
        '1AB': "Augmenter l'efficacité du saut par la maîtrise de la liaison course-impulsion et l'amélioration de la phase aérienne.",
        '2AB': "Optimiser sa performance en coordonnant les trois phases du saut avec une technique aérienne maîtrisée."
    },
    'Saut en hauteur': {
        '1AC': "Franchir une barre en utilisant une course d'élan et une impulsion vers le haut, avec une technique de franchissement ventral ou dorsal simplifié.",
        '2AC': "Réaliser un franchissement dorsal (fosbury-flop) avec une course d'élan courbe adaptée et une impulsion sur le pied extérieur.",
        '3AC': "Optimiser son franchissement par une meilleure coordination course courbe-impulsion-rotation dorsale, en améliorant la position du corps au-dessus de la barre.",
        'TC': "Maîtriser la technique du fosbury-flop avec une course d'élan courbe efficace, une impulsion puissante et un franchissement dorsal économique.",
        '1AB': "Améliorer sa performance par l'optimisation de chaque phase technique, en travaillant la vitesse d'entrée et la qualité de l'esquive dorsale.",
        '2AB': "Réaliser une performance optimale en gérant les paramètres techniques, physiques et psychologiques de la compétition."
    },
    'Course de durée': {
        '1AC': "Courir de façon régulière sur une durée donnée (8-10 min) en gérant son effort et en maintenant une allure constante.",
        '2AC': "Adapter son allure de course pour maintenir un effort prolongé (10-12 min), en utilisant des repères de temps et de distance.",
        '3AC': "Construire et respecter un projet de course en fonction de ses capacités, sur une durée de 12-15 min, en régulant son allure.",
        'TC': "Planifier et réaliser une performance en gérant efficacement ses ressources énergétiques, sur une distance ou durée définie.",
        '1AB': "Optimiser sa performance par une gestion stratégique de l'allure, en s'appuyant sur la connaissance de ses capacités.",
        '2AB': "Atteindre ses objectifs personnels par une préparation et une stratégie de course adaptées à ses ressources."
    },
    'Lancer de poids': {
        '1AC': "Lancer un engin en utilisant une poussée du bras depuis l'épaule, dans le respect des règles de sécurité et de l'aire de lancer.",
        '2AC': "Coordonner la poussée des jambes et l'action du bras lanceur pour améliorer la distance de lancer, en respectant la technique en translation.",
        '3AC': "Enchaîner les actions motrices du lancer en respectant la technique et les règles de la compétition.",
        'TC': "Réaliser un lancer en maîtrisant la coordination des différents segments corporels dans une technique en translation ou rotation.",
        '1AB': "Améliorer sa performance par le perfectionnement technique et le développement de la puissance musculaire spécifique.",
        '2AB': "Optimiser sa performance par une maîtrise complète de la chaîne de lancer et une gestion efficace de la compétition."
    },
    'Gymnastique': {
        '1AC': "Réaliser un enchaînement simple au sol comprenant des éléments gymniques de base, présenté avec maîtrise devant la classe.",
        '2AC': "Présenter un enchaînement gymnique varié avec des liaisons fluides et une présentation soignée.",
        '3AC': "Concevoir et réaliser un enchaînement individuel au sol avec originalité et maîtrise.",
        'TC': "Présenter un enchaînement gymnique au sol avec maîtrise technique et qualité de présentation.",
        '1AB': "Composer et réaliser un enchaînement au sol avec continuité et expression personnelle.",
        '2AB': "Concevoir, réaliser et évaluer un enchaînement gymnique varié avec expertise et créativité."
    },
    'Tennis de table': {
        '1AC': "Maintenir un échange en renvoyant la balle sur la table adverse, en utilisant le coup droit et le revers, dans le respect des règles.",
        '2AC': "Diriger la balle dans différentes zones de la table pour mettre l'adversaire en difficulté, en variant les placements.",
        '3AC': "Varier les trajectoires, les vitesses et les effets pour prendre l'initiative du point.",
        'TC': "Construire le point en utilisant des variations de placement, de vitesse et d'effet.",
        '1AB': "Élaborer des stratégies de jeu adaptées aux caractéristiques de l'adversaire.",
        '2AB': "Mettre en œuvre un projet de jeu personnel et l'adapter en cours de match."
    },
    'Badminton': {
        '1AC': "Renvoyer le volant dans le terrain adverse en utilisant les frappes de base, dans le respect des règles et des limites du terrain.",
        '2AC': "Varier la longueur et la direction de ses frappes pour déplacer l'adversaire et créer des espaces.",
        '3AC': "Alterner jeu long et jeu court pour créer des espaces libres et marquer le point.",
        'TC': "Construire le point en exploitant les espaces libres du terrain adverse.",
        '1AB': "Élaborer des séquences de jeu tactiquement cohérentes, en utilisant les feintes.",
        '2AB': "Concevoir et appliquer une stratégie de jeu personnelle adaptée à l'adversaire."
    }
};

const VOCABULAIRE_APS = {
    'Handball': 'passe à terre, passe en cloche, réception à deux mains, dribble, tir en appui, tir en suspension, feinte, démarquage, appel de balle, pivot, ailier, arrière, zone 6m, contre-attaque, repli défensif, engagement, jet franc, penalty',
    'Football': 'conduite de balle, contrôle orienté, passe courte intérieur du pied, passe longue, tir, dribble, tacle, marquage, démarquage, appel en profondeur, une-deux, centre, corner, touche, hors-jeu',
    'Basketball': 'dribble de progression, dribble de protection, passe à terre, passe une main, lay-up, tir en suspension, rebond offensif, rebond défensif, écran, pick and roll, démarquage, pivot, lancer franc',
    'Volleyball': 'manchette bras tendus, touche haute, service cuillère, service tennis, smash, bloc, réception, passe, passeur, attaquant, libéro, rotation, filet, ligne des 3m',
    'Course de vitesse': 'position de départ, réaction au signal, mise en action, phase d\'accélération, fréquence, amplitude, phase de maintien, finish, couloir, faux départ',
    'Course de haies': 'départ, rythme, jambe d\'attaque, jambe d\'esquive, franchissement, reprise d\'appui, maintien vitesse, ligne arrivée',
    'Course de relais': 'départ, transmission, témoin, zone de passage, accélération, synchronisation, vitesse, ligne arrivée',
    'Course de durée': 'allure régulière, gestion de l\'effort, fréquence cardiaque, VMA, endurance, récupération, foulée économique, respiration, hydratation',
    'Saut en longueur': 'course d\'élan, marques, planche d\'appel, impulsion, phase d\'envol, ramené, ciseau, réception, fosse, mordre',
    'Saut en hauteur': 'course d\'élan courbe, pied d\'appel extérieur, impulsion, rotation dorsale, fosbury-flop, esquive, franchissement, réception, barre, tapis',
    'Lancer de poids': 'position de dos, tenue au cou, coude haut, translation, rotation, poussée, extension du bras, fouetté, équilibre final, cercle, butoir',
    'Gymnastique': 'roulade avant, roulade arrière, ATR, roue, pont, souplesse avant, équilibre, saut extension, saut groupé, liaison, amplitude, tenue, réception',
    'Tennis de table': 'coup droit, revers, service court, service long, effet coupé, effet lifté, top spin, bloc, placement, déplacement latéral, prise orthodoxe',
    'Badminton': 'dégagé, amorti, smash, drive, lob, service court, service long, replacement, fente avant, pas chassés, prise universelle'
};

const getSituationReference = (aps, isCollege) => {
    const situations = {
        'Handball': 'Match 7 contre 7 sur terrain réglementaire (40m x 20m) avec application des règles officielles, arbitrage par les élèves et rotation des équipes',
        'Football': 'Match 5 contre 5 sur terrain réduit (40m x 20m) avec 2 buts réglementaires, application des règles simplifiées et arbitrage',
        'Basketball': 'Match 5 contre 5 sur demi-terrain avec panier, application des règles officielles (marcher, reprise, fautes) et arbitrage par les élèves',
        'Volleyball': 'Match 6 contre 6 sur terrain réglementaire (9m x 18m) avec filet à hauteur adaptée, rotation obligatoire et application des règles',
        'Tennis de table': 'Match en simple au meilleur des 3 sets de 11 points avec application des règles officielles de service et comptage',
        'Badminton': 'Match en simple au meilleur des 3 sets de 21 points avec application des règles officielles et arbitrage',
        'Course de vitesse': isCollege ? 'Course chronométrée sur 80 mètres en couloir individuel avec départ au signal (sifflet ou claquoir)' : 'Course chronométrée sur 80 mètres garçons/60 mètres filles en couloir individuel avec départ en starting-blocks',
        'Course de haies': isCollege ? 'Course chronométrée sur 60m haies (hauteur adaptée) en couloir individuel' : 'Course chronométrée sur 60m haies (hauteur adaptée) en couloir individuel',
        'Course de relais': 'Course en binôme 2x40m avec transmission du témoin dans la zone de passage',
        'Saut en longueur': 'Concours de 3 essais mesurés avec course d\'élan libre , impulsion sur planche, la meilleure performance est retenue',
        'Saut en hauteur': 'Concours à barres montantes (intervalles de 5cm) avec 3 essais maximum par hauteur, technique fosbury-flop',
        'Lancer de poids': isCollege ? 'Concours de 3 essais mesurés avec poids de 3kg (filles) ou 4kg (garçons), technique en translation' : 'Concours de 3 essais mesurés avec poids de 3kg (filles) ou 4kg (garçons), la meilleure performance est retenue',
        'Course de durée': 'Courir 1000m G / 600m F pour mesurer le temps de passage et observer la gestion de l\'effort',
        'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés du niveau, évalué selon amplitude, tenue et liaisons'
    };
    return situations[aps] || 'Situation adaptée au niveau des élèves';
};

const getGroupeAPS = (aps) => {
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) return 'Sports collectifs';
    if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sports de renvoi';
    if (['Course de vitesse', 'Course de haies', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée', 'Course en durée'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    return 'Activité physique';
};

const CRITERES_OBS = {
    'Handball': { criteres: [{ nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Réception', sous: ['Assurée', 'Manquée'] }, { nom: 'Tir', sous: ['Cadré', 'Hors'] }, { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }] },
    'Football': { criteres: [{ nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Contrôle', sous: ['Orienté', 'Subi'] }, { nom: 'Placement', sous: ['Pertinent', 'Inadapté'] }] },
    'Basketball': { criteres: [{ nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] }, { nom: 'Passe', sous: ['Précise', 'Interceptée'] }, { nom: 'Tir', sous: ['Équilibré', 'Déséquil.'] }, { nom: 'Démarquage', sous: ['Actif', 'Statique'] }] },
    'Volleyball': { criteres: [{ nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] }, { nom: 'Touche', sous: ['Haute', 'Basse'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Placement', sous: ['Anticipé', 'Retard'] }] },
    'Course de vitesse': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Accélération', sous: ['Progress.', 'Brutale'] }, { nom: 'Course', sous: ['Axée', 'Désaxée'] }, { nom: 'Finish', sous: ['Engagé', 'Relâché'] }] },
    'Course de haies': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Rythme', sous: ['Régulier', 'Irrégulier'] }, { nom: 'Franchiss.', sous: ['Efficient', 'Ralentit'] }, { nom: 'Finish', sous: ['Engagé', 'Relâché'] }, { nom: 'Performance', sous: ['temps téel', 'temps Théorique'] }] },
    'Course de relais': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Course', sous: ['Rapide', 'Lente'] }, { nom: 'Transmission', sous: ['Réussie', 'Ratée'] }, { nom: 'Zone', sous: ['Respectée', 'Faute'] }, { nom: 'Performance', sous: ['temps téel', 'temps Théorique'] }] },
    'Saut en longueur': { criteres: [{ nom: 'Course', sous: ['Accélérée', 'Irrégulière'] }, { nom: 'Impulsion', sous: ['sur', 'avant', 'mordu'] }, { nom: 'Envol', sous: ['Équilibré', 'Déséquil.'] }, { nom: 'Réception', sous: ['Stable', 'Chute'] }] },
    'Saut en hauteur': { criteres: [{ nom: 'Course', sous: ['Courbe', 'Droite'] }, { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] }, { nom: 'Franchis.', sous: ['Dorsal', 'Autre'] }, { nom: 'Réception', sous: ['Dos', 'Danger'] }] },
    'Course de durée': { criteres: [{ nom: 'Régularité', sous: ['Constante', 'Variable'] }, { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] }, { nom: 'Posture', sous: ['Correcte', 'Effondrée'] }, { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }] },
    'Lancer de poids': { criteres: [{ nom: 'Position', sous: ['Dos aire', 'Face'] }, { nom: 'Tenue', sous: ['Au cou', 'Éloigné'] }, { nom: 'Poussée', sous: ['Complète', 'Partielle'] }, { nom: 'Équilibre', sous: ['Stable', 'Chute'] }] },
    'Gymnastique': { criteres: [{ nom: 'Amplitude', sous: ['Suffisante', 'Insuffis.'] }, { nom: 'Tenue', sous: ['Gainé', 'Relâché'] }, { nom: 'Liaisons', sous: ['Fluides', 'Arrêts'] }, { nom: 'Réception', sous: ['Stabilisée', 'Déséquil.'] }] },
    'Tennis de table': { criteres: [{ nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Service', sous: ['Varié', 'Prévisible'] }, { nom: 'Placement', sous: ['Équilibré', 'Instable'] }] },
    'Badminton': { criteres: [{ nom: 'Dégagé', sous: ['Fond', 'Court'] }, { nom: 'Amorti', sous: ['Près filet', 'Long'] }, { nom: 'Service', sous: ['Réglem.', 'Faute'] }, { nom: 'Replacement', sous: ['Centre', 'Excentré'] }] }
};

const FALLBACKS = {
    'Handball': {
        echauf: 'Manipulation balle individuelle (2 min) | Passes en binômes à 6m (3 min) | Jeu des 10 passes 4c2 (3 min)',
        s1t: 'Conservation et progression collective', s1b: 'Conserver la balle et atteindre la zone de marque',
        s1o: '4 attaquants vs 2 défenseurs, terrain 20x15m, 4 plots délimitant la zone, 1 ballon',
        s1d: 'Les 4 attaquants conservent le ballon face à 2 défenseurs. 1 point si la balle arrive dans la zone de marque. Rotation toutes les 2 min.',
        s1c: '1. Regarder avant de passer\n2. Passe à terre tendue\n3. Se démarquer dans l\'espace libre\n4. Appeler la balle bras levé',
        s1v: 'Simplifier: 4c1, 3 touches obligatoires | Complexifier: 4c3, 2 touches max',
        s2t: 'Match à thème', s2b: 'Marquer un but en appliquant les techniques travaillées',
        s2o: '2 équipes de 5 joueurs, terrain 30x20m avec 2 buts',
        s2d: 'Match avec obligation d\'appliquer l\'objectif. Point bonus (+1) si objectif visible. Arrêts réguliers pour feedback.',
        s2c: '1. Appliquer l\'objectif travaillé\n2. S\'engager en attaque et défense\n3. Respecter les règles\n4. Communiquer avec l\'équipe',
        s2v: 'Simplifier: supériorité numérique offensive | Complexifier: infériorité numérique',
        cr: '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine du receveur\n• Déplacement immédiat dans l\'espace libre après la passe\n• Réception à deux mains, bras tendus vers le ballon',
        cs: '• 7 passes réussies sur 10 tentatives\n• Atteindre la zone 3 fois sur 5 possessions\n• Temps de possession supérieur à 20 secondes\n• Marquer 2 buts minimum en 5 minutes de jeu'
    },
    'Football': {
        echauf: 'Conduite de balle en slalom (2 min) | Passes intérieur du pied à 8m (3 min) | Contrôle orienté + passe (3 min)',
        s1t: 'Conservation et progression vers le but', s1b: 'Conserver le ballon et marquer dans le mini-but adverse',
        s1o: '4c2 sur terrain 25x20m, 2 mini-buts, chasubles, 1 ballon',
        s1d: 'Les 4 attaquants conservent et progressent vers le but. Rotation après récupération défensive. 1 point par but.',
        s1c: '1. Contrôle orienté vers l\'espace libre\n2. Passe avec l\'intérieur du pied\n3. Appel en profondeur\n4. Lever la tête avant de passer',
        s1v: 'Simplifier: 4c1, ballon toujours au sol | Complexifier: 4c3, 2 touches max',
        s2t: 'Match à thème', s2b: 'Marquer en utilisant les techniques travaillées',
        s2o: '2 équipes de 5, terrain 40x25m avec 2 buts',
        s2d: 'Match avec point bonus si application visible de l\'objectif. Arrêts pour corrections.',
        s2c: '1. Appliquer l\'objectif\n2. Jouer vers l\'avant\n3. Se replacer défensivement\n4. Communiquer',
        s2v: 'Simplifier: joker offensif | Complexifier: 2 touches maximum',
        cr: '• Contrôle avec l\'intérieur du pied orienté vers la cible\n• Surface de contact au centre du ballon\n• Pied d\'appui placé à côté du ballon lors de la frappe\n• Regard sur le ballon puis sur la cible avant la passe',
        cs: '• 8 contrôles réussis sur 10 tentatives\n• 7 passes arrivées au partenaire sur 10\n• Conserver le ballon 30 secondes minimum\n• Marquer 1 but par période de 5 minutes'
    },
    'Basketball': {
        echauf: 'Dribble main droite/gauche slalom (2 min) | Passes à terre en triangle (3 min) | Lay-up sans opposition (3 min)',
        s1t: 'Passe et va vers le panier', s1b: 'Réaliser un passe et va pour marquer un panier',
        s1o: '3c2 sur demi-terrain avec panier, 1 ballon, chasubles',
        s1d: 'Les 3 attaquants appliquent le passe et va pour créer le décalage. Panier après passe et va = 2 points. Rotation après possession.',
        s1c: '1. Passer et couper immédiatement vers le panier\n2. Recevoir en course sans marcher\n3. Finir en lay-up main extérieure\n4. Écarter si passe et va défendu',
        s1v: 'Simplifier: 3c1, défenseur passif | Complexifier: 3c3, écran obligatoire avant passe et va',
        s2t: 'Match à thème', s2b: 'Marquer en utilisant le passe et va',
        s2o: '2 équipes de 4, demi-terrain avec panier',
        s2d: 'Match avec bonus pour chaque panier après passe et va réussi. Rotations toutes les 4 min.',
        s2c: '1. Appliquer le passe et va\n2. Espacer le jeu\n3. Défendre son joueur direct\n4. Communiquer',
        s2v: 'Simplifier: supériorité offensive | Complexifier: 2 dribbles max',
        cr: '• Passe tendue à hauteur de poitrine vers le receveur\n• Coupe directe et rapide vers le panier après la passe\n• Réception en course avec regard vers le panier\n• Lay-up avec appui intérieur et main extérieure',
        cs: '• 6 lay-up réussis sur 10 tentatives\n• 3 paniers après passe et va sur 5 possessions\n• 0 marcher sur 10 réceptions en mouvement\n• Équipe avec plus de 10 points en 5 minutes'
    },
    'Volleyball': {
        echauf: 'Jonglage manchette individuel (2 min) | Échanges touche haute par 2 (3 min) | Service + réception (3 min)',
        s1t: 'Construction en 3 touches', s1b: 'Construire une attaque en utilisant les 3 touches réglementaires',
        s1o: '3c3 sur terrain réduit 6x9m, filet à 2m, 1 ballon',
        s1d: 'L\'équipe en réception construit en 3 touches: R1 manchette vers passeur, passeur touche haute vers attaquant, attaque. Point bonus si 3 touches.',
        s1c: '1. Manchette orientée vers le passeur (zone 3)\n2. Touche haute à 1m du filet vers l\'attaquant\n3. Attaque vers le sol adverse\n4. Annoncer "j\'ai!" avant chaque touche',
        s1v: 'Simplifier: lancer au lieu de servir, 4 touches autorisées | Complexifier: attaque smashée obligatoire',
        s2t: 'Match à thème', s2b: 'Marquer le point en construisant en 3 touches',
        s2o: '2 équipes de 4, terrain 7x14m, filet à hauteur adaptée',
        s2d: 'Match avec bonus pour chaque point marqué en 3 touches. Rotation obligatoire toutes les 5 points.',
        s2c: '1. Construire systématiquement en 3 touches\n2. Communiquer les positions\n3. Couvrir l\'attaquant\n4. Assurer la rotation',
        s2v: 'Simplifier: 2 touches minimum autorisées | Complexifier: zone d\'attaque imposée',
        cr: '• Bras tendus et joints pour la manchette de réception\n• Mains en coupe au-dessus du front pour la touche\n• Déplacement sous le ballon avant chaque frappe\n• Orientation des appuis vers la cible visée',
        cs: '• 7 manchettes vers zone passeur sur 10 réceptions\n• 6 touches hautes exploitables sur 10 passes\n• 3 attaques gagnantes sur 5 tentatives\n• 4 constructions complètes en 3 touches sur 5 réceptions'
    },
    'Course de haies': {
        echauf: 'Gammes (genoux hauts, talons-fesses) (2 min) | Passages latéraux jambe d\'esquive (3 min) | Franchissements bas en marchant (3 min)',
        s1t: 'Rythme inter-haies et franchissement', s1b: 'Maintenir une vitesse constante sans saut "en cloche"',
        s1o: '4 haies basses, intervalle 6m à 7m, chronomètre',
        s1d: 'Courir 40m haies. L\'objectif est de stabiliser un nombre d\'appuis régulier (3 ou 5) entre chaque obstacle.',
        s1c: '1. Attaquer loin de la haie\n2. Jambe d\'attaque tendue vers l\'avant\n3. Jambe d\'esquive ouverte sur le côté\n4. Reprise d\'appui active au sol',
        s1v: 'Simplifier: Haies remplacées par des lattes | Complexifier: Augmenter la hauteur des haies',
        s2t: 'Performance technique', s2b: 'Réduire l\'écart entre le temps de sprint plat et le temps avec haies',
        s2o: 'Couloir de 40m plat + couloir de 40m haies',
        s2d: 'Réaliser un sprint plat puis un sprint avec haies. Calcul de l\'indice technique.',
        s2c: '1. Engagement total dès le départ\n2. Regard vers l\'horizon\n3. Plongée du buste à l\'attaque\n4. Accélération après la dernière haie',
        s2v: 'Simplifier: Réduire l\'intervalle | Complexifier: Départ en starting-blocks',
        cr: '• Rythme sonore régulier (1-2-3-Franchissement)\n• Rasance de la haie (moins de 10cm au-dessus)\n• Alignement buste-jambe à l\'impact\n• Continuité de la course à la réception',
        cs: '• Rythme de 3 pas maintenu sur toute la course\n• Temps = Réel - Théorique (Écart < 1.5s pour l\'efficience)\n• 0 haie renversée sur 3 essais\n• 100% des attaques avec la jambe préférentielle'
    },
    'Course de relais': {
        echauf: 'Jeux de poursuite (2 min) | Transmissions à allure réduite par binômes (3 min) | Sprints lancés 10m (3 min)',
        s1t: 'Transmission non-visuelle en zone', s1b: 'Passer le témoin à haute vitesse sans ralentissement du receveur',
        s1o: 'Zone de 20m balisée, 1 témoin pour 2 coureurs',
        s1d: 'Le receveur part dès que le donneur franchit une marque. Le passage doit se faire dans la zone de 20m à pleine vitesse.',
        s1c: '1. Appel sonore "HOP" bref\n2. Main du receveur en "V" inversé stable\n3. Donneur bras tendu au maximum\n4. Pas de changement de main (D vers G)',
        s1v: 'Simplifier: Transmission visuelle autorisée | Complexifier: Réduire la marque de départ',
        s2t: 'Duo-Sprint Chronométré', s2b: 'Obtenir un temps collectif inférieur à la somme des temps individuels',
        s2o: 'Ligne droite de 60m (30m+30m), zone centrale de 20m',
        s2d: 'Match en binôme contre le chrono. Calcul du gain de temps apporté par la transmission lancée.',
        s2c: '1. Accélération maximale du receveur\n2. Transmission en fin de zone (2ème moitié)\n3. Précision du geste (bras-main)\n4. Traversée de la ligne d\'arrivée engagée',
        s2v: 'Simplifier: Zone de transmission élargie | Complexifier: Opposition couloir voisin',
        cr: '• Non-retour du regard du receveur\n• Bras tendus des deux partenaires au passage\n• Témoin "voyageant" seul sur 1.50m\n• Maintien de la ligne de course',
        cs: '• Gain de temps : Temps = Réel (Duo) - Théorique (Somme des 30m individuels)\n• Passage validé à l\'intérieur des 20m\n• 0 chute de témoin sur les essais officiels\n• Distance entre coureurs > 1m au passage'
    },
    'Course de vitesse': {
        echauf: 'Montées de genoux explosives (2 min) | Foulées bondissantes (3 min) | 3 départs en réaction (sifflet) (3 min)',
        s1t: 'Mise en action et poussée', s1b: 'Sortir des blocs avec une poussée horizontale maximale',
        s1o: 'Starting-blocks (ou départ sans), 30m balisés, chrono',
        s1d: 'Travail spécifique sur les 10 premiers mètres. Rester penché vers l\'avant (phase de poussée) le plus longtemps possible.',
        s1c: '1. Appuis sur la pointe des pieds\n2. Bras en opposition dynamique\n3. Extension complète de la jambe arrière\n4. Redressement progressif du buste',
        s1v: 'Simplifier: Départ debout | Complexifier: Travail avec élastique de résistance',
        s2t: 'Vitesse de pointe (Flying sprint)', s2b: 'Maintenir la fréquence maximale sur la zone lancée',
        s2o: '15m d\'élan + 20m chronométrés',
        s2d: 'L\'élève arrive lancé et doit traverser la zone de 20m à 100% de ses capacités.',
        s2c: '1. Relâchement des épaules et mâchoire\n2. Griffé du sol (appui actif)\n3. Amplitude de la foulée\n4. Franchissement de ligne "cassé"',
        s2v: 'Simplifier: Distance réduite | Complexifier: Comparaison Temps réaction vs Temps total',
        cr: '• Alignement segmentaire à la poussée\n• Fréquence d\'appuis élevée (cycle de jambes rapide)\n• Stabilité du bassin\n• Absence de freinage à l\'impact',
        cs: '• Écart : Temps = Réel - Théorique (Temps cible basé sur test initial)\n• Amélioration de 0.2s sur le 30m\n• Maintien de la vitesse sur les 10 derniers mètres\n• 3 départs sans "faux-départ"'
    },
    'Course de durée': {
        echauf: 'Footing lent (3 min) | Mobilisations chevilles/genoux (2 min) | Accélérations progressives (3 min)',
        s1t: 'Régularité de l\'allure (VMA)', s1b: 'Respecter un tableau de marche précis par plot',
        s1o: 'Piste avec plots tous les 50m, sifflet ou application bip',
        s1d: 'Courir à 90% de sa VMA. L\'élève doit se trouver au niveau d\'un plot à chaque signal sonore.',
        s1c: '1. Respiration calée sur la foulée\n2. Relâchement du haut du corps\n3. Regard à 15m devant\n4. Attaque du pied médio-sol',
        s1v: 'Simplifier: Allure 70% VMA | Complexifier: Changements d\'allure (fractionné)',
        s2t: 'Test Bilan (1000m G / 600m F)', s2b: 'Gérer son capital énergie pour finir à sa vitesse maximale',
        s2o: 'Distance officielle, fiche de temps de passage',
        s2d: 'Réaliser la distance en essayant d\'être le plus régulier possible entre le premier et le dernier tour.',
        s2c: '1. Départ contrôlé (pas de sprint initial)\n2. Relance en sortie de virage\n3. Accélération sur les 150 derniers mètres\n4. Posture maintenue malgré la fatigue',
        s2v: 'Simplifier: Temps de course imposé sans distance | Complexifier: Stratégie de dépassement',
        cr: '• Constance du temps par tour (Écart < 3s)\n• Efficacité de la foulée (pas de tassement)\n• Gestion du souffle (aisance relative)\n• Fin de course en accélération',
        cs: '• Écart : Temps = Réel - Théorique (Temps visé selon VMA)\n• Réalisation de 95% à 105% de la performance prédite\n• Fréquence cardiaque stabilisée après 2 min de repos\n• 0 arrêt de course pendant le test'
    },
    'Lancer de poids': {
        echauf: 'Cercles de bras (2 min) | Gainage planche (3 min) | Lancers de médecine-ball (3 min)',
        s1t: 'Placement et chemin de lancement', s1b: 'Accélérer le poids sur la plus grande distance possible',
        s1o: 'Poids (3kg/4kg), aire de lancer, plots de distance',
        s1d: 'Lancer en translation (ou sans élan pour débuter). Focus sur le bras qui "pousse" le poids (pas de jet de balle).',
        s1c: '1. Poids collé au cou (sous la mâchoire)\n2. Coude haut derrière le poids\n3. Jambe arrière fléchie (chargée)\n4. Extension explosive jambe-bras',
        s1v: 'Simplifier: Poids plus léger | Complexifier: Ajout du sursaut (élan)',
        s2t: 'Concours de performance', s2b: 'Projeter l\'engin dans une zone de chute définie à l\'angle optimal',
        s2o: 'Cercle de lancer, ruban mètre, 3 essais',
        s2d: 'Réalisation de 3 jets mesurés. Analyse de la transmission de force entre les jambes et le bras.',
        s2c: '1. Bloquer la jambe avant à l\'impact\n2. Angle de sortie proche de 40°\n3. Regard vers le haut/devant\n4. Rétablissement final pour rester dans le cercle',
        s2v: 'Simplifier: Lancer d\'une zone de 2x2m | Complexifier: Lancer avec élan en rotation',
        cr: '• Poids restant en contact avec le cou jusqu\'au déclenchement\n• Accélération terminale du bras\n• Finition sur la pointe des pieds\n• Absence de faute (pas de sortie de cercle)',
        cs: '• Performance > 5m (F) / 7m (G)\n• 100% de lancers "poussés" (pas de jet de bras)\n• Gain de distance : Réel (avec élan) - Théorique (sans élan) > 50cm\n• 2 essais validés sur 3'
    },
    'Badminton': {
        echauf: 'Shadow-badminton déplacements (2 min) | Échanges en "Clear" (3 min) | Routine Amorti/Contre-amorti (3 min)',
        s1t: 'Fixation et dégagement fond de court', s1b: 'Repousser l\'adversaire pour libérer l\'espace devant',
        s1o: '2 joueurs par demi-terrain, 1 volant, poteaux et filet',
        s1d: 'Le joueur A sert court. Le joueur B renvoie en haut/fond (Clear). Le joueur A doit reculer et dégager à son tour. 1 point si le volant tombe en zone fond.',
        s1c: '1. Armé du bras coude haut\n2. Frappe en extension complète\n3. Rotation des épaules\n4. Reprise d\'appui centrale après la frappe',
        s1v: 'Simplifier: Terrain réduit en largeur | Complexifier: Alterner Clear et Amorti',
        s2t: 'Match à thème (Le montant)', s2b: 'Gagner le point en utilisant toute la profondeur du terrain',
        s2o: 'Terrain de simple officiel, 2 joueurs',
        s2d: 'Match en 11 points. Un point marqué en fond de court après un amorti compte double (+2).',
        s2c: '1. Varier les trajectoires (haut/bas)\n2. Observer le placement adverse\n3. Être réactif sur les jambes\n4. Masquer son intention',
        s2v: 'Simplifier: Service haut obligatoire | Complexifier: Interdiction de smasher',
        cr: '• Préparation du coup derrière le volant\n• Impact du volant au point le plus haut\n• Transfert du poids du corps vers l\'avant\n• Tamis orienté vers la zone visée',
        cs: '• 7 dégagements sur 10 atteignant la zone fond\n• 3 points "doubles" marqués par match\n• Moins de 2 volants "faciles" donnés au milieu\n• Réussir 5 échanges longs sans faute'
    },
    'Gymnastique': {
        echauf: 'Mobilisation articulaire complète (2 min) | Gainage dynamique (3 min) | Ateliers d\'équilibre (3 min)',
        s1t: 'Liaison d\'éléments acrobatiques', s1b: 'Enchaîner deux éléments avec fluidité et contrôle',
        s1o: 'Piste de tapis, 1 élève par atelier, magnésie si besoin',
        s1d: 'Réaliser la liaison : ATR (Appui Tendu Renversé) retombé en fente, suivi immédiatement d\'une Roue ou d\'une Roulade avant.',
        s1c: '1. Gainage maximum (corps indéformable)\n2. Regard sur les mains au sol\n3. Pointes de pieds tendues\n4. Arrivée stabilisée 2 secondes',
        s1v: 'Simplifier: Liaison Roulade avant/Roulade arrière | Complexifier: Ajouter un saut de biche entre les deux',
        s2t: 'Enchaînement de référence', s2b: 'Présenter un mini-enchaînement sans chute',
        s2o: 'Praticable ou ligne de tapis de 10m',
        s2d: 'L\'élève présente 3 éléments liés. Note sur l\'exécution (propreté) et la difficulté.',
        s2c: '1. Maîtriser ses réceptions\n2. Tendre les segments (bras/jambes)\n3. Respecter le rythme\n4. Saluer au début et à la fin',
        s2v: 'Simplifier: Aide manuelle autorisée | Complexifier: Travail sur poutre basse',
        cr: '• Alignement segments (bras-tronc-jambes)\n• Fluidité des transitions entre les éléments\n• Amplitude des mouvements\n• Stabilité des réceptions (pas de pas de rattrapage)',
        cs: '• 0 chute sur l\'enchaînement complet\n• 3 éléments validés techniquement sur 3\n• Maintien de l\'équilibre 2 sec sur les poses\n• Jambes tendues sur 100% des acrobaties'
    },
    'Tennis de table': {
        echauf: 'Shadow-footwork latéral (2 min) | Échanges en coup droit (3 min) | Échanges en revers (3 min)',
        s1t: 'Régularité et placement de balle', s1b: 'Maintenir l\'échange en variant les zones de rebond',
        s1o: 'Table, 1 balle, 2 raquettes, plots cibles sur la table',
        s1d: 'Le relanceur joue toujours au milieu. L\'attaquant doit viser alternativement le revers et le coup droit du partenaire. 10 échanges minimum.',
        s1c: '1. Position de base jambes fléchies\n2. Petit bras de levier (mouvement court)\n3. Revenir en position centrale\n4. Accompagner la balle vers l\'avant',
        s1v: 'Simplifier: Coup droit uniquement | Complexifier: Accélérer sur la 5ème balle',
        s2t: 'Match "Montante-Descendante"', s2b: 'Gagner le match en prenant l\'initiative',
        s2o: 'Plusieurs tables, matchs de 5 min',
        s2d: 'Match classique. Si le joueur gagne un point sur un placement précis (hors de portée), il compte double.',
        s2c: '1. Servir varié (long/court)\n2. Observer le côté faible adverse\n3. Ne pas reculer de la table\n4. Rester concentré sur chaque balle',
        s2v: 'Simplifier: Service libre | Complexifier: Service revers obligatoire',
        cr: '• Inclinaison de la raquette adaptée à la balle\n• Impact de balle devant soi\n• Transfert d\'appui jambe droite/jambe gauche\n• Placement des pieds avant la frappe',
        cs: '• Réussir 10 échanges de suite sans faute\n• Toucher 6 cibles sur 10 tentatives en exercice\n• Gagner 50% des points derrière son service\n• Moins de 3 fautes directes par set'
    },
    'Saut en longueur': {
        echauf: 'Montées de genoux / Talons-fesses (2 min) | Foulées bondissantes (3 min) | Sauts de précision sur place (3 min)',
        s1t: 'Transformation de la vitesse en impulsion', s1b: 'Prendre un appel efficace sans mordre',
        s1o: 'Piste d\'élan, sautoir, décamètre, latte d\'appel',
        s1d: 'Course d\'élan réduite (6-8 pas). Impulsion sur le pied d\'appel pour franchir une petite haie en mousse placée au début du sable.',
        s1c: '1. Rythme accéléré sur les 3 derniers appuis\n2. Regard vers l\'horizon (pas le pied)\n3. Montée énergique du genou libre\n4. Extension complète de la jambe d\'appel',
        s1v: 'Simplifier: Appel zone libre (sans planche) | Complexifier: Élan complet (12-16 pas)',
        s2t: 'Concours officiel', s2b: 'Réaliser la meilleure performance mesurée',
        s2o: 'Sautoir conforme, 3 essais par élève',
        s2d: 'Mesure du saut au dernier impact dans le sable. Analyse de la précision d\'appel et de la suspension.',
        s2c: '1. Stabiliser sa course d\'élan\n2. Rechercher de la hauteur à l\'appel\n3. Ramener les jambes vers l\'avant à la chute\n4. Sortir du sable devant soi',
        s2v: 'Simplifier: Planche d\'appel élargie | Complexifier: Concours avec finale top 8',
        cr: '• Course d\'élan en accélération constante\n• Avant-dernier appui plus long que le dernier\n• Buste droit à l\'impulsion\n• Suspension équilibrée',
        cs: '• 0 saut mordu sur 3 tentatives\n• Performance > 3m (F) / 3m50 (G)\n• Réception avec les deux pieds simultanés\n• Précision d\'appel à moins de 10cm de la planche'
    },
    'Saut en hauteur': {
        echauf: 'Mobilisation des chevilles et genoux (2 min) | Sauts en extension sur place (3 min) | Course en courbe (8 de chiffres) (3 min)',
        s1t: 'Course en courbe et impulsion', s1b: 'Transformer la vitesse horizontale en élévation verticale',
        s1o: 'Sautoir, élastique (pour la sécurité), marques au sol pour le "J"',
        s1d: 'Apprentissage de la course d\'élan en "J" (5 pas droits, 3 pas en courbe). L\'élève doit déclencher l\'appel sur le pied extérieur à la barre.',
        s1c: '1. Accélérer sur les 3 derniers appuis\n2. Pencher le corps à l\'opposé de la barre dans la courbe\n3. Appel vertical (ne pas plonger vers le tapis)\n4. Montée du genou libre vers le haut',
        s1v: 'Simplifier: Saut en ciseau sans courbe | Complexifier: Franchissement en Fosbury-Flop complet',
        s2t: 'Concours de performance', s2b: 'Franchir la barre la plus haute possible',
        s2o: 'Sautoir officiel, barre rigide, 3 essais par hauteur',
        s2d: 'Compétition par montées de barre. L\'élève gère ses essais et ses marques. Analyse de la trajectoire au-dessus de la barre.',
        s2c: '1. Regard porté au-dessus de la barre\n2. Rotation des épaules lors du franchissement\n3. Esquive des talons (relever les pieds à la fin)\n4. Réception sur le haut du dos (épaules)',
        s2v: 'Simplifier: Hauteur fixe pour stabiliser la technique | Complexifier: Concours avec nombre d\'essais limité',
        cr: '• Rythme d\'élan accéléré (lent-vif)\n• Impulsion verticale et non longitudinale\n• Alignement segmentaire à l\'appel\n• Franchissement rasant (corps en arc)',
        cs: '• Performance : Différence = Réel (Hauteur sautée) - Théorique (Taille - 40cm)\n• Réussir 2 franchissements sur 3 à sa hauteur maximale\n• 0 refus de saut (arrêt devant la barre)\n• Réception sécurisée au centre du tapis'
    }
};
// SCHÉMAS SVG PROFESSIONNELS - TOUS LES SPORTS
// Version 2.0 avec sens du jeu, trajectoires, zones et légendes
// ============================================================================

var SCHEMAS = {
    'Handball': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><path d="M 20 70 Q 60 100 20 130" fill="rgba(255,255,255,0.3)" stroke="#fff" stroke-width="2"/><path d="M 320 70 Q 280 100 320 130" fill="rgba(255,215,0,0.3)" stroke="#fff" stroke-width="2"/><rect x="312" y="80" width="8" height="40" fill="#1D3557" stroke="#333" stroke-width="2"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="2" stroke-dasharray="8,4" opacity="0.5"/><defs><marker id="arr1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#457B9D"/></marker></defs><line x1="80" y1="20" x2="260" y2="20" stroke="#457B9D" stroke-width="2" marker-end="url(#arr1)"/><text x="170" y="17" text-anchor="middle" fill="#457B9D" font-size="10" font-weight="bold">SENS DU JEU</text><circle cx="80" cy="60" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="80" y="65" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">A1</text><circle cx="80" cy="140" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="80" y="145" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">A2</text><circle cx="130" cy="85" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="130" y="90" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">A3</text><circle cx="130" cy="115" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="130" y="120" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">A4</text><circle cx="80" cy="60" r="6" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><path d="M 94 60 Q 112 72 116 85" stroke="#457B9D" stroke-width="2" stroke-dasharray="6,3" fill="none" marker-end="url(#arr1)"/><circle cx="220" cy="80" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="220" y="85" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">D1</text><circle cx="220" cy="120" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="220" y="125" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">D2</text><circle cx="295" cy="100" r="12" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="295" y="105" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">G</text><ellipse cx="180" cy="100" rx="45" ry="35" fill="#E63946" opacity="0.15" stroke="#E63946" stroke-width="1" stroke-dasharray="4,2"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Attaquants</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Defenseurs</span><span><span style="display:inline-block;width:12px;height:12px;background:#2A9D8F;border-radius:50%;"></span> Gardien</span><span><span style="display:inline-block;width:12px;height:12px;background:#F4A261;border-radius:50%;"></span> Ballon</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation 4c2 + Gardien | Terrain 25x15m | Conservation et progression</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="3"/><circle cx="170" cy="100" r="20" fill="none" stroke="#fff" stroke-width="2"/><path d="M 20 70 Q 55 100 20 130" fill="rgba(255,255,255,0.2)" stroke="#fff" stroke-width="2"/><path d="M 320 70 Q 285 100 320 130" fill="rgba(255,255,255,0.2)" stroke="#fff" stroke-width="2"/><rect x="20" y="80" width="6" height="40" fill="#E9C46A" stroke="#333" stroke-width="1"/><rect x="314" y="80" width="6" height="40" fill="#E9C46A" stroke="#333" stroke-width="1"/><circle cx="45" cy="100" r="11" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="45" y="104" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">G</text><circle cx="75" cy="55" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="75" cy="100" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="75" cy="145" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="110" cy="75" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="110" cy="125" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="295" cy="100" r="11" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="295" y="104" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">G</text><circle cx="265" cy="55" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="265" cy="100" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="265" cy="145" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="230" cy="75" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="230" cy="125" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="170" cy="100" r="7" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><rect x="130" y="175" width="80" height="18" fill="#457B9D" rx="4"/><text x="170" y="188" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 5c5</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Equipe A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Equipe B</span><span><span style="display:inline-block;width:12px;height:12px;background:#2A9D8F;border-radius:50%;"></span> Gardiens</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme 5c5 + Gardiens | Terrain 30x20m</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="3"/><circle cx="170" cy="100" r="25" fill="none" stroke="#fff" stroke-width="2"/><path d="M 20 60 Q 70 100 20 140" fill="rgba(233,196,106,0.3)" stroke="#fff" stroke-width="3"/><text x="45" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">6m</text><path d="M 320 60 Q 270 100 320 140" fill="rgba(233,196,106,0.3)" stroke="#fff" stroke-width="3"/><text x="295" y="100" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">6m</text><path d="M 20 45 Q 90 100 20 155" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="5,5"/><path d="M 320 45 Q 250 100 320 155" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="5,5"/><rect x="20" y="78" width="8" height="44" fill="#E9C46A" stroke="#333" stroke-width="2"/><rect x="312" y="78" width="8" height="44" fill="#E9C46A" stroke="#333" stroke-width="2"/><text x="55" y="45" fill="#fff" font-size="8">Ailier G</text><text x="55" y="160" fill="#fff" font-size="8">Ailier D</text><text x="85" y="75" fill="#fff" font-size="8">Arr G</text><text x="85" y="130" fill="#fff" font-size="8">Arr D</text><text x="100" y="102" fill="#fff" font-size="8">DC</text><text x="65" y="102" fill="#fff" font-size="8">Piv</text><rect x="120" y="175" width="100" height="20" fill="#E63946" rx="5"/><text x="170" y="189" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Zone 6m (interdite)</span><span>Zone 9m (tir)</span><span>Buts 3m x 2m</span><span>2x10 min</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match 7c7 | Terrain 40x20m | Regles officielles</p></div>'
    },
    'Football': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4a7c4e" stroke="#2d5a30" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-dasharray="8,4"/><rect x="280" y="55" width="40" height="70" fill="rgba(255,215,0,0.2)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/><rect x="315" y="80" width="5" height="30" fill="none" stroke="#fff" stroke-width="3"/><defs><marker id="arrF" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#fff"/></marker></defs><line x1="60" y1="20" x2="280" y2="20" stroke="#fff" stroke-width="2" marker-end="url(#arrF)"/><text x="170" y="17" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">SENS DU JEU</text><circle cx="90" cy="55" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="90" y="60" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">1</text><circle cx="90" cy="125" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="90" y="130" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">2</text><circle cx="130" cy="75" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="130" y="80" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">3</text><circle cx="130" cy="105" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="130" y="110" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">4</text><circle cx="102" cy="50" r="6" fill="#fff" stroke="#333" stroke-width="1"/><circle cx="220" cy="80" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="220" y="85" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D1</text><circle cx="220" cy="110" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="220" y="115" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D2</text><rect x="160" y="55" width="70" height="70" fill="rgba(255,215,0,0.15)" stroke="#F4A261" stroke-width="2" stroke-dasharray="6,3" rx="5"/><text x="195" y="95" text-anchor="middle" fill="#F4A261" font-size="9" font-weight="bold">ZONE CIBLE</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Attaquants</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Defenseurs</span><span><span style="display:inline-block;width:12px;height:12px;background:#fff;border:1px solid #333;border-radius:50%;"></span> Ballon</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation 4c2 | Terrain 25x20m | Conservation et progression</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4a7c4e" stroke="#2d5a30" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><circle cx="170" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><rect x="20" y="50" width="40" height="80" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><rect x="280" y="50" width="40" height="80" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><rect x="15" y="75" width="5" height="30" fill="none" stroke="#fff" stroke-width="3"/><rect x="320" y="75" width="5" height="30" fill="none" stroke="#fff" stroke-width="3"/><circle cx="35" cy="90" r="10" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="35" y="94" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">G</text><circle cx="70" cy="50" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="70" cy="130" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="100" cy="70" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="100" cy="110" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="140" cy="90" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="305" cy="90" r="10" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="305" y="94" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">G</text><circle cx="270" cy="50" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="270" cy="130" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="240" cy="70" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="240" cy="110" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="200" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="170" cy="100" r="6" fill="#fff" stroke="#333" stroke-width="2"/><rect x="130" y="175" width="80" height="18" fill="#457B9D" rx="4"/><text x="170" y="188" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 5c5</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Equipe A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Equipe B</span><span><span style="display:inline-block;width:12px;height:12px;background:#2A9D8F;border-radius:50%;"></span> Gardiens</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme 5c5 + Gardiens | Terrain 40x25m</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#4a7c4e" stroke="#2d5a30" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="2"/><circle cx="170" cy="100" r="30" fill="none" stroke="#fff" stroke-width="2"/><circle cx="170" cy="100" r="3" fill="#fff"/><rect x="20" y="40" width="50" height="100" fill="none" stroke="#fff" stroke-width="2"/><rect x="270" y="40" width="50" height="100" fill="none" stroke="#fff" stroke-width="2"/><rect x="20" y="60" width="25" height="60" fill="none" stroke="#fff" stroke-width="2"/><rect x="295" y="60" width="25" height="60" fill="none" stroke="#fff" stroke-width="2"/><circle cx="55" cy="100" r="3" fill="#fff"/><circle cx="285" cy="100" r="3" fill="#fff"/><rect x="12" y="78" width="8" height="24" fill="none" stroke="#fff" stroke-width="3"/><rect x="320" y="78" width="8" height="24" fill="none" stroke="#fff" stroke-width="3"/><text x="40" y="95" fill="#fff" font-size="7">GB</text><text x="75" y="55" fill="#fff" font-size="7">DC</text><text x="75" y="150" fill="#fff" font-size="7">DC</text><text x="105" y="100" fill="#fff" font-size="7">MIL</text><text x="135" y="65" fill="#fff" font-size="7">ATT</text><text x="135" y="140" fill="#fff" font-size="7">ATT</text><rect x="120" y="175" width="100" height="20" fill="#E63946" rx="5"/><text x="170" y="189" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Terrain 50x30m</span><span>Buts reglementaires</span><span>2x8 min</span><span>Arbitrage eleves</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match 7c7 | Regles officielles adaptees</p></div>'
    },
    'Basketball': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#DEB887" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="80" y1="30" x2="80" y2="170" stroke="#CD853F" stroke-width="1" opacity="0.4"/><line x1="140" y1="30" x2="140" y2="170" stroke="#CD853F" stroke-width="1" opacity="0.4"/><line x1="200" y1="30" x2="200" y2="170" stroke="#CD853F" stroke-width="1" opacity="0.4"/><line x1="260" y1="30" x2="260" y2="170" stroke="#CD853F" stroke-width="1" opacity="0.4"/><rect x="265" y="55" width="55" height="70" fill="none" stroke="#1D3557" stroke-width="3"/><circle cx="292" cy="90" r="25" fill="none" stroke="#1D3557" stroke-width="2"/><rect x="305" y="82" width="15" height="16" fill="#E9C46A" stroke="#333" stroke-width="2"/><circle cx="312" cy="90" r="8" fill="none" stroke="#E63946" stroke-width="3"/><path d="M 265 35 Q 220 90 265 145" fill="none" stroke="#1D3557" stroke-width="2"/><defs><marker id="arrB" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#E63946"/></marker><marker id="arrM" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F4A261"/></marker></defs><text x="100" y="20" text-anchor="middle" fill="#333" font-size="10" font-weight="bold">ATTAQUE</text><circle cx="100" cy="55" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="100" y="60" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">1</text><circle cx="100" cy="125" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="100" y="130" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">2</text><circle cx="160" cy="90" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="160" y="95" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">3</text><circle cx="160" cy="90" r="6" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><line x1="170" y1="85" x2="200" y2="70" stroke="#E63946" stroke-width="3" stroke-dasharray="8,4" marker-end="url(#arrB)"/><text x="185" y="65" fill="#E63946" font-size="8" font-weight="bold">PASSE</text><path d="M 175 90 Q 220 90 260 75" fill="none" stroke="#F4A261" stroke-width="3" marker-end="url(#arrM)"/><text x="220" y="105" fill="#F4A261" font-size="8" font-weight="bold">COUPE</text><circle cx="210" cy="70" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="210" y="75" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D1</text><circle cx="210" cy="110" r="14" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="210" y="115" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">D2</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Attaquants</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Defenseurs</span><span style="border-top:2px dashed #E63946;width:20px;display:inline-block;"></span> Passe<span style="border-top:2px solid #F4A261;width:20px;display:inline-block;"></span> Deplacement</div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation 3c2 | Demi-terrain | Passe et va vers le panier</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#DEB887" stroke="#8B4513" stroke-width="3" rx="5"/><rect x="265" y="45" width="55" height="90" fill="rgba(139,69,19,0.15)" stroke="#8B4513" stroke-width="2"/><circle cx="292" cy="90" r="35" fill="none" stroke="#8B4513" stroke-width="2"/><circle cx="285" cy="90" r="3" fill="#8B4513"/><path d="M 265 30 Q 210 90 265 150" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="308" y="80" width="12" height="20" fill="none" stroke="#E63946" stroke-width="3"/><circle cx="314" cy="90" r="10" fill="none" stroke="#E63946" stroke-width="2"/><circle cx="80" cy="50" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="80" cy="130" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="130" cy="70" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="130" cy="110" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="190" cy="50" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="190" cy="130" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="230" cy="70" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="230" cy="110" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="130" cy="70" r="6" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><rect x="130" y="175" width="80" height="18" fill="#457B9D" rx="4"/><text x="170" y="188" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 4c4</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Equipe A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Equipe B</span><span>Bonus passe et va = +1pt</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme 4c4 | Demi-terrain | Passe et va valorise</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#DEB887" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#8B4513" stroke-width="2"/><circle cx="170" cy="100" r="25" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="20" y="55" width="45" height="70" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="275" y="55" width="45" height="70" fill="none" stroke="#8B4513" stroke-width="2"/><circle cx="42" cy="90" r="20" fill="none" stroke="#8B4513" stroke-width="2"/><circle cx="298" cy="90" r="20" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="20" y="82" width="10" height="16" fill="#E9C46A" stroke="#333" stroke-width="1"/><rect x="310" y="82" width="10" height="16" fill="#E9C46A" stroke="#333" stroke-width="1"/><circle cx="25" cy="90" r="6" fill="none" stroke="#E63946" stroke-width="2"/><circle cx="315" cy="90" r="6" fill="none" stroke="#E63946" stroke-width="2"/><path d="M 65 25 Q 100 90 65 155" fill="none" stroke="#8B4513" stroke-width="2"/><path d="M 275 25 Q 240 90 275 155" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="120" y="175" width="100" height="20" fill="#E63946" rx="5"/><text x="170" y="189" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Terrain complet</span><span>5c5</span><span>4x5 min</span><span>Regles officielles</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match 5c5 | 28m x 15m</p></div>'
    },
    'Volleyball': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#F5DEB3" stroke="#DAA520" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#333" stroke-width="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="3" stroke-dasharray="10,5"/><line x1="100" y1="30" x2="100" y2="170" stroke="#DAA520" stroke-width="2" stroke-dasharray="6,4"/><line x1="240" y1="30" x2="240" y2="170" stroke="#DAA520" stroke-width="2" stroke-dasharray="6,4"/><text x="100" y="180" text-anchor="middle" fill="#DAA520" font-size="8">3m</text><text x="240" y="180" text-anchor="middle" fill="#DAA520" font-size="8">3m</text><circle cx="55" cy="120" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="55" y="125" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">R</text><circle cx="130" cy="60" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="130" y="65" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">P</text><circle cx="140" cy="120" r="14" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="140" y="125" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">A</text><circle cx="55" cy="50" r="6" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><defs><marker id="arrV" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 55 56 L 55 105" fill="none" stroke="#457B9D" stroke-width="2" marker-end="url(#arrV)"/><text x="40" y="80" fill="#457B9D" font-size="8" font-weight="bold">1</text><path d="M 65 115 Q 100 70 120 65" fill="none" stroke="#457B9D" stroke-width="2" marker-end="url(#arrV)"/><text x="95" y="75" fill="#457B9D" font-size="8" font-weight="bold">2</text><path d="M 140 55 Q 160 40 175 60" fill="none" stroke="#E63946" stroke-width="3" marker-end="url(#arrV)"/><text x="155" y="45" fill="#E63946" font-size="8" font-weight="bold">3</text><circle cx="210" cy="60" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="250" cy="100" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="285" cy="140" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>R=Reception</span><span>P=Passe</span><span>A=Attaque</span><span>1-2-3 = 3 touches</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation 3c3 | Construction en 3 touches | Terrain 6x9m</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#F5DEB3" stroke="#DAA520" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#333" stroke-width="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="3" stroke-dasharray="10,5"/><line x1="95" y1="30" x2="95" y2="170" stroke="#DAA520" stroke-width="2"/><line x1="245" y1="30" x2="245" y2="170" stroke="#DAA520" stroke-width="2"/><circle cx="50" cy="55" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="50" cy="125" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="120" cy="55" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="120" cy="125" r="11" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="220" cy="55" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="220" cy="125" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="290" cy="55" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="290" cy="125" r="11" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="120" cy="160" r="6" fill="#F4A261" stroke="#E76F51" stroke-width="2"/><text x="140" y="165" fill="#666" font-size="8">Service</text><rect x="130" y="175" width="80" height="18" fill="#457B9D" rx="4"/><text x="170" y="188" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 4c4</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Equipe A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Equipe B</span><span>Bonus 3 touches = +1pt</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme 4c4 | Terrain 7x14m | Construction valorisee</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="140" fill="#F5DEB3" stroke="#DAA520" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="170" stroke="#333" stroke-width="6"/><line x1="170" y1="30" x2="170" y2="170" stroke="#fff" stroke-width="4" stroke-dasharray="12,6"/><line x1="85" y1="30" x2="85" y2="170" stroke="#E63946" stroke-width="3"/><line x1="255" y1="30" x2="255" y2="170" stroke="#E63946" stroke-width="3"/><text x="40" y="160" fill="#666" font-size="10" font-weight="bold">1</text><text x="65" y="110" fill="#666" font-size="10" font-weight="bold">6</text><text x="40" y="60" fill="#666" font-size="10" font-weight="bold">5</text><text x="110" y="160" fill="#666" font-size="10" font-weight="bold">2</text><text x="110" y="110" fill="#666" font-size="10" font-weight="bold">3</text><text x="110" y="60" fill="#666" font-size="10" font-weight="bold">4</text><path d="M 75 85 A 20 20 0 1 1 75 115" fill="none" stroke="#2A9D8F" stroke-width="2"/><text x="75" y="105" text-anchor="middle" fill="#2A9D8F" font-size="8">ROTATION</text><rect x="120" y="175" width="100" height="20" fill="#E63946" rx="5"/><text x="170" y="189" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Terrain 9x18m</span><span>6c6</span><span>Rotation obligatoire</span><span>Sets de 15 pts</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match 6c6 | Regles officielles</p></div>'
    },
    'Course de vitesse': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#fff" stroke-width="2" stroke-dasharray="10,5"/><rect x="40" y="55" width="50" height="70" fill="#4CAF50" opacity="0.3" stroke="#4CAF50" stroke-width="2"/><text x="65" y="95" text-anchor="middle" fill="#2E7D32" font-size="9" font-weight="bold">POSTURE</text><rect x="100" y="55" width="50" height="70" fill="#2196F3" opacity="0.3" stroke="#2196F3" stroke-width="2"/><text x="125" y="95" text-anchor="middle" fill="#1565C0" font-size="9" font-weight="bold">REACTION</text><rect x="160" y="55" width="50" height="70" fill="#FF9800" opacity="0.3" stroke="#FF9800" stroke-width="2"/><text x="185" y="95" text-anchor="middle" fill="#E65100" font-size="9" font-weight="bold">APPUIS</text><rect x="220" y="55" width="50" height="70" fill="#9C27B0" opacity="0.3" stroke="#9C27B0" stroke-width="2"/><text x="245" y="95" text-anchor="middle" fill="#6A1B9A" font-size="9" font-weight="bold">FREQUENCE</text><circle cx="35" cy="90" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><defs><marker id="arrC1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#1D3557"/></marker></defs><line x1="35" y1="40" x2="280" y2="40" stroke="#1D3557" stroke-width="2" marker-end="url(#arrC1)"/><text x="157" y="37" text-anchor="middle" fill="#1D3557" font-size="9" font-weight="bold">SENS DE COURSE</text><text x="65" y="145" fill="#666" font-size="9">10m</text><text x="125" y="145" fill="#666" font-size="9">10m</text><text x="185" y="145" fill="#666" font-size="9">10m</text><text x="245" y="145" fill="#666" font-size="9">10m</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#4CAF50;">Posture</span><span style="color:#2196F3;">Reaction</span><span style="color:#FF9800;">Appuis</span><span style="color:#9C27B0;">Frequence</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours d habiletes | 4 ateliers x 10m | Travail technique segmente</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="76" x2="320" y2="76" stroke="#fff" stroke-width="1"/><line x1="20" y1="102" x2="320" y2="102" stroke="#fff" stroke-width="1"/><rect x="30" y="62" width="25" height="15" fill="#666" rx="3"/><rect x="30" y="88" width="25" height="15" fill="#666" rx="3"/><rect x="30" y="114" width="25" height="15" fill="#666" rx="3"/><text x="42" y="140" text-anchor="middle" fill="#666" font-size="8">BLOCKS</text><rect x="60" y="55" width="100" height="70" fill="#FF9800" opacity="0.2" stroke="#FF9800" stroke-width="2" stroke-dasharray="6,3"/><text x="110" y="52" text-anchor="middle" fill="#E65100" font-size="9" font-weight="bold">ACCELERATION</text><text x="110" y="95" text-anchor="middle" fill="#E65100" font-size="8">0-20m</text><rect x="170" y="55" width="100" height="70" fill="#4CAF50" opacity="0.2" stroke="#4CAF50" stroke-width="2" stroke-dasharray="6,3"/><text x="220" y="52" text-anchor="middle" fill="#2E7D32" font-size="9" font-weight="bold">MAINTIEN</text><text x="220" y="95" text-anchor="middle" fill="#2E7D32" font-size="8">20-40m</text><line x1="280" y1="50" x2="280" y2="130" stroke="#E63946" stroke-width="4"/><text x="280" y="145" text-anchor="middle" fill="#E63946" font-size="10" font-weight="bold">40m</text><circle cx="75" cy="68" r="7" fill="#1D3557"/><circle cx="130" cy="90" r="7" fill="#1D3557"/><circle cx="220" cy="112" r="7" fill="#1D3557"/><defs><marker id="arrC2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#1D3557"/></marker></defs><path d="M 82 68 L 123 90" stroke="#1D3557" stroke-width="2" marker-end="url(#arrC2)"/><path d="M 137 90 L 213 112" stroke="#1D3557" stroke-width="2" marker-end="url(#arrC2)"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#FF9800;">Phase acceleration</span><span style="color:#4CAF50;">Phase maintien</span><span>Chronometre</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | 40m avec starting-blocks | Phases de course</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="90" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="72" x2="320" y2="72" stroke="#fff" stroke-width="2"/><line x1="20" y1="94" x2="320" y2="94" stroke="#fff" stroke-width="2"/><line x1="20" y1="116" x2="320" y2="116" stroke="#fff" stroke-width="2"/><text x="15" y="65" fill="#333" font-size="10" font-weight="bold">1</text><text x="15" y="87" fill="#333" font-size="10" font-weight="bold">2</text><text x="15" y="109" fill="#333" font-size="10" font-weight="bold">3</text><text x="15" y="131" fill="#333" font-size="10" font-weight="bold">4</text><line x1="40" y1="50" x2="40" y2="140" stroke="#E63946" stroke-width="5"/><rect x="30" y="38" width="20" height="10" fill="#E63946" rx="2"/><text x="40" y="46" text-anchor="middle" fill="white" font-size="7" font-weight="bold">START</text><rect x="43" y="58" width="12" height="6" fill="#333"/><rect x="43" y="80" width="12" height="6" fill="#333"/><rect x="43" y="102" width="12" height="6" fill="#333"/><rect x="43" y="124" width="12" height="6" fill="#333"/><line x1="295" y1="50" x2="295" y2="140" stroke="#E63946" stroke-width="5"/><rect x="285" y="38" width="20" height="10" fill="#E63946" rx="2"/><text x="295" y="46" text-anchor="middle" fill="white" font-size="7" font-weight="bold">FINISH</text><line x1="40" y1="155" x2="295" y2="155" stroke="#333" stroke-width="2"/><text x="100" y="168" fill="#333" font-size="9">20m</text><text x="167" y="168" fill="#333" font-size="9">40m</text><text x="240" y="168" fill="#333" font-size="9">60m</text><line x1="100" y1="150" x2="100" y2="160" stroke="#333" stroke-width="1"/><line x1="167" y1="150" x2="167" y2="160" stroke="#333" stroke-width="1"/><line x1="240" y1="150" x2="240" y2="160" stroke="#333" stroke-width="1"/><rect x="115" y="10" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">COURSE OFFICIELLE</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>60m (college) / 80m (lycee)</span><span>Chrono electronique</span><span>3 essais</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Course chronometree | Meilleur temps retenu</p></div>'
    },
    'Course de haies': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#fff" stroke-width="2" stroke-dasharray="10,5"/><line x1="35" y1="50" x2="35" y2="130" stroke="#E63946" stroke-width="4"/><text x="35" y="145" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">DEPART</text><rect x="80" y="75" width="6" height="40" fill="#FF9800" rx="1"/><rect x="80" y="72" width="6" height="6" fill="#333"/><rect x="140" y="75" width="6" height="40" fill="#FF9800" rx="1"/><rect x="140" y="72" width="6" height="6" fill="#333"/><rect x="200" y="75" width="6" height="40" fill="#FF9800" rx="1"/><rect x="200" y="72" width="6" height="6" fill="#333"/><rect x="260" y="75" width="6" height="40" fill="#FF9800" rx="1"/><rect x="260" y="72" width="6" height="6" fill="#333"/><circle cx="50" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><defs><marker id="arrH1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#1D3557"/></marker></defs><line x1="35" y1="40" x2="280" y2="40" stroke="#1D3557" stroke-width="2" marker-end="url(#arrH1)"/><text x="157" y="37" text-anchor="middle" fill="#1D3557" font-size="9" font-weight="bold">SENS DE COURSE</text><text x="83" y="145" text-anchor="middle" fill="#666" font-size="9">H1</text><text x="143" y="145" text-anchor="middle" fill="#666" font-size="9">H2</text><text x="203" y="145" text-anchor="middle" fill="#666" font-size="9">H3</text><text x="263" y="145" text-anchor="middle" fill="#666" font-size="9">H4</text><text x="170" y="160" fill="#666" font-size="8">Intervalles: 6-7m entre haies</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#FF9800;"></span> Haies basses (40-60cm)</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Coureur</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours d habiletes | 4 haies basses | Rythme de course</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#fff" stroke-width="2"/><line x1="35" y1="50" x2="35" y2="130" stroke="#E63946" stroke-width="4"/><rect x="70" y="70" width="6" height="45" fill="#E63946" rx="1"/><rect x="70" y="67" width="6" height="6" fill="#333"/><rect x="120" y="70" width="6" height="45" fill="#E63946" rx="1"/><rect x="120" y="67" width="6" height="6" fill="#333"/><rect x="170" y="70" width="6" height="45" fill="#E63946" rx="1"/><rect x="170" y="67" width="6" height="6" fill="#333"/><rect x="220" y="70" width="6" height="45" fill="#E63946" rx="1"/><rect x="220" y="67" width="6" height="6" fill="#333"/><rect x="270" y="70" width="6" height="45" fill="#E63946" rx="1"/><rect x="270" y="67" width="6" height="6" fill="#333"/><circle cx="50" cy="90" r="8" fill="#1D3557" stroke="#fff" stroke-width="2"/><defs><marker id="arrH2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 58 85 Q 85 55 100 80" stroke="#457B9D" stroke-width="2" fill="none" marker-end="url(#arrH2)"/><text x="85" y="50" fill="#457B9D" font-size="8" font-weight="bold">Attaque</text><path d="M 100 85 Q 110 75 115 85" stroke="#2A9D8F" stroke-width="2" fill="none"/><text x="108" y="70" fill="#2A9D8F" font-size="7">Esquive</text><line x1="295" y1="50" x2="295" y2="130" stroke="#E63946" stroke-width="4"/><text x="165" y="145" text-anchor="middle" fill="#666" font-size="9">5 haies - Intervalles reguliers (5-6m)</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;"></span> Haies moyennes</span><span style="color:#457B9D;">Jambe attaque</span><span style="color:#2A9D8F;">Jambe esquive</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Circuit technique | 5 haies | Attaque et esquive</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="75" x2="320" y2="75" stroke="#fff" stroke-width="2"/><line x1="20" y1="105" x2="320" y2="105" stroke="#fff" stroke-width="2"/><line x1="35" y1="50" x2="35" y2="130" stroke="#E63946" stroke-width="5"/><rect x="25" y="38" width="20" height="10" fill="#E63946" rx="2"/><text x="35" y="46" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">START</text><rect x="60" y="62" width="5" height="48" fill="#E63946" rx="1"/><rect x="105" y="62" width="5" height="48" fill="#E63946" rx="1"/><rect x="150" y="62" width="5" height="48" fill="#E63946" rx="1"/><rect x="195" y="62" width="5" height="48" fill="#E63946" rx="1"/><rect x="240" y="62" width="5" height="48" fill="#E63946" rx="1"/><line x1="285" y1="50" x2="285" y2="130" stroke="#E63946" stroke-width="5"/><rect x="275" y="38" width="20" height="10" fill="#E63946" rx="2"/><text x="285" y="46" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">FINISH</text><rect x="115" y="10" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">COURSE OFFICIELLE</text><text x="160" y="145" text-anchor="middle" fill="#333" font-size="10" font-weight="bold">40m / 60m HAIES</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>5 haies</span><span>Hauteur adaptee au niveau</span><span>Chronometre</span><span>3 essais</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Course chronometree | Meilleur temps retenu</p></div>'
    },
    'Course de relais': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#fff" stroke-width="2" stroke-dasharray="10,5"/><rect x="120" y="60" width="80" height="60" fill="#F4A261" opacity="0.4" stroke="#E76F51" stroke-width="3" rx="5"/><text x="160" y="95" text-anchor="middle" fill="#E76F51" font-size="10" font-weight="bold">ZONE 20m</text><circle cx="80" cy="90" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="80" y="95" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">1</text><circle cx="240" cy="90" r="12" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="240" y="95" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">2</text><defs><marker id="arrR1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#457B9D"/></marker></defs><path d="M 92 90 L 115 90" stroke="#457B9D" stroke-width="2" marker-end="url(#arrR1)"/><rect x="150" y="82" width="20" height="8" fill="#333" rx="2"/><text x="160" y="145" text-anchor="middle" fill="#666" font-size="9">Temoin</text><path d="M 175 86 L 225 90" stroke="#457B9D" stroke-width="2" marker-end="url(#arrR1)"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Donneur</span><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Receveur</span><span><span style="display:inline-block;width:12px;height:12px;background:#F4A261;"></span> Zone transmission</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours d habiletes | Transmission du temoin | Zone de 20m</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#fff" stroke-width="2"/><line x1="120" y1="50" x2="120" y2="130" stroke="#F4A261" stroke-width="2" stroke-dasharray="6,3"/><line x1="200" y1="50" x2="200" y2="130" stroke="#F4A261" stroke-width="2" stroke-dasharray="6,3"/><rect x="120" y="60" width="80" height="60" fill="#F4A261" opacity="0.3" stroke="#E76F51" stroke-width="2"/><text x="160" y="95" text-anchor="middle" fill="#E76F51" font-size="9" font-weight="bold">TRANSMISSION</text><circle cx="70" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="70" y="94" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">1</text><circle cx="250" cy="90" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="250" y="94" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">2</text><defs><marker id="arrR2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 80 90 L 115 90" stroke="#457B9D" stroke-width="3" marker-end="url(#arrR2)"/><rect x="152" y="85" width="16" height="6" fill="#333" rx="1"/><path d="M 175 88 L 238 90" stroke="#457B9D" stroke-width="3" marker-end="url(#arrR2)"/><text x="90" y="75" fill="#1D3557" font-size="8">Vitesse max</text><text x="210" y="75" fill="#E63946" font-size="8">Acceleration</text><text x="160" y="145" text-anchor="middle" fill="#666" font-size="9">Synchronisation des vitesses</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Zone de transmission</span><span>Marques de depart</span><span>Annonce vocale "MAIN!"</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | Zone de transmission | Synchronisation</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="50" width="300" height="80" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="75" x2="320" y2="75" stroke="#fff" stroke-width="2"/><line x1="20" y1="105" x2="320" y2="105" stroke="#fff" stroke-width="2"/><line x1="35" y1="50" x2="35" y2="130" stroke="#E63946" stroke-width="4"/><rect x="100" y="55" width="50" height="70" fill="#F4A261" opacity="0.3" stroke="#E76F51" stroke-width="2"/><text x="125" y="95" text-anchor="middle" fill="#E76F51" font-size="8" font-weight="bold">Z1</text><rect x="180" y="55" width="50" height="70" fill="#F4A261" opacity="0.3" stroke="#E76F51" stroke-width="2"/><text x="205" y="95" text-anchor="middle" fill="#E76F51" font-size="8" font-weight="bold">Z2</text><rect x="260" y="55" width="35" height="70" fill="#F4A261" opacity="0.3" stroke="#E76F51" stroke-width="2"/><text x="277" y="95" text-anchor="middle" fill="#E76F51" font-size="8" font-weight="bold">Z3</text><line x1="305" y1="50" x2="305" y2="130" stroke="#E63946" stroke-width="4"/><circle cx="50" cy="68" r="8" fill="#1D3557"/><text x="50" y="72" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">1</text><circle cx="125" cy="90" r="8" fill="#E63946"/><text x="125" y="94" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">2</text><circle cx="205" cy="112" r="8" fill="#2A9D8F"/><text x="205" y="116" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">3</text><circle cx="277" cy="90" r="8" fill="#9C27B0"/><text x="277" y="94" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold">4</text><rect x="115" y="10" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">RELAIS OFFICIEL</text><text x="170" y="145" text-anchor="middle" fill="#333" font-size="10" font-weight="bold">4 x 40m / 4 x 50m</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>4 relayeurs</span><span>3 zones reglementaires</span><span>Chronometre</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | 4x40m ou 4x50m | Performance collective</p></div>'
    },
    'Course de duree': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="140" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><ellipse cx="170" cy="90" rx="120" ry="55" fill="none" stroke="#4CAF50" stroke-width="4"/><circle cx="60" cy="90" r="8" fill="#E63946"/><text x="60" y="75" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">100m</text><circle cx="170" cy="35" r="8" fill="#E63946"/><text x="170" y="25" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">200m</text><circle cx="280" cy="90" r="8" fill="#E63946"/><text x="280" y="75" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">300m</text><circle cx="170" cy="145" r="8" fill="#E63946"/><text x="170" y="160" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">400m</text><circle cx="100" cy="115" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><defs><marker id="arrD1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4CAF50"/></marker></defs><path d="M 115 125 A 100 50 0 0 0 65 95" stroke="#4CAF50" stroke-width="2" fill="none" marker-end="url(#arrD1)"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Coureur</span><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Reperes distance</span><span>Circuit en boucle</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours d habiletes | Circuit balise tous les 100m | 4 stations</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="140" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><ellipse cx="170" cy="90" rx="120" ry="55" fill="none" stroke="#4CAF50" stroke-width="4"/><circle cx="170" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><rect x="140" y="30" width="60" height="20" fill="#457B9D" rx="3"/><text x="170" y="44" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">12-15 min</text><circle cx="170" cy="90" r="25" fill="none" stroke="#457B9D" stroke-width="2" stroke-dasharray="4,2"/><path d="M 170 65 L 170 50" stroke="#E63946" stroke-width="3"/><circle cx="170" cy="50" r="4" fill="#E63946"/><text x="70" y="145" fill="#666" font-size="9">Allure REGULIERE</text><text x="270" y="145" fill="#666" font-size="9">Respiration controlee</text><defs><marker id="arrD2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#4CAF50"/></marker></defs><path d="M 220 50 A 80 40 0 0 1 280 90" stroke="#4CAF50" stroke-width="2" fill="none" marker-end="url(#arrD2)"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Duree 12-15 min</span><span>Allure constante</span><span>Reperes de temps</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | Courir regulier | Gestion de l allure</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="140" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><ellipse cx="170" cy="90" rx="120" ry="55" fill="none" stroke="#4CAF50" stroke-width="4"/><line x1="50" y1="90" x2="80" y2="90" stroke="#E63946" stroke-width="5"/><text x="65" y="80" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">DEPART</text><line x1="260" y1="90" x2="290" y2="90" stroke="#E63946" stroke-width="5"/><text x="275" y="80" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">ARRIVEE</text><rect x="120" y="25" width="100" height="25" fill="#E63946" rx="5"/><text x="170" y="42" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">TEST OFFICIEL</text><text x="170" y="145" text-anchor="middle" fill="#333" font-size="12" font-weight="bold">1000m G / 600m F</text><circle cx="100" cy="60" r="8" fill="#1D3557"/><circle cx="150" cy="40" r="8" fill="#E63946"/><circle cx="200" cy="40" r="8" fill="#2A9D8F"/><circle cx="250" cy="60" r="8" fill="#9C27B0"/></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Distance selon genre</span><span>Chronometre</span><span>Projet de course</span><span>Gestion effort</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Test chronometre | Gestion de l effort</p></div>'
    },
    'Saut en longueur': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="60" width="180" height="50" fill="#E8D5B7" stroke="#8B4513" stroke-width="2"/><text x="110" y="90" text-anchor="middle" fill="#8B4513" font-size="10" font-weight="bold">PISTE D ELAN</text><rect x="200" y="55" width="15" height="60" fill="#fff" stroke="#E63946" stroke-width="3"/><text x="207" y="50" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">PLANCHE</text><rect x="215" y="45" width="105" height="80" fill="#F4A460" stroke="#8B4513" stroke-width="2" rx="5"/><text x="267" y="90" text-anchor="middle" fill="#8B4513" font-size="10" font-weight="bold">FOSSE</text><circle cx="50" cy="85" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="50" y="90" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">S</text><defs><marker id="arrL1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#1D3557"/></marker></defs><path d="M 62 85 L 185 85" fill="none" stroke="#1D3557" stroke-width="3" marker-end="url(#arrL1)"/><text x="120" y="75" text-anchor="middle" fill="#1D3557" font-size="9" font-weight="bold">ELAN 6-8 pas</text><line x1="80" y1="110" x2="80" y2="120" stroke="#666" stroke-width="2"/><line x1="120" y1="110" x2="120" y2="120" stroke="#666" stroke-width="2"/><line x1="160" y1="110" x2="160" y2="120" stroke="#666" stroke-width="2"/><text x="80" y="130" text-anchor="middle" fill="#666" font-size="7">M1</text><text x="120" y="130" text-anchor="middle" fill="#666" font-size="7">M2</text><text x="160" y="130" text-anchor="middle" fill="#666" font-size="7">M3</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Sauteur</span><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;"></span> Planche</span><span><span style="display:inline-block;width:12px;height:12px;background:#F4A460;"></span> Fosse</span><span>M = Marques</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours technique | Course d elan reduite + Impulsion | Marques au sol</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="60" width="160" height="50" fill="#E8D5B7" stroke="#8B4513" stroke-width="2"/><rect x="180" y="50" width="40" height="70" fill="rgba(230,57,70,0.2)" stroke="#E63946" stroke-width="2" stroke-dasharray="4,2"/><text x="200" y="45" text-anchor="middle" fill="#E63946" font-size="8" font-weight="bold">ZONE IMPULSION</text><rect x="210" y="60" width="15" height="50" fill="#fff" stroke="#333" stroke-width="2"/><rect x="225" y="40" width="95" height="90" fill="#F4A460" stroke="#8B4513" stroke-width="2" rx="5"/><circle cx="100" cy="85" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><defs><marker id="arrL2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#1D3557"/></marker></defs><path d="M 110 85 L 175 85" fill="none" stroke="#1D3557" stroke-width="2" marker-end="url(#arrL2)"/><circle cx="215" cy="70" r="5" fill="#E63946"/><text x="215" y="100" text-anchor="middle" fill="#E63946" font-size="7">APPEL</text><path d="M 220 65 Q 250 20 280 50 Q 300 30 310 70" fill="none" stroke="#2A9D8F" stroke-width="3"/><circle cx="250" cy="30" r="5" fill="#F4A261"/><text x="250" y="20" text-anchor="middle" fill="#F4A261" font-size="7">SUSPENSION</text><circle cx="310" cy="70" r="5" fill="#9C27B0"/><text x="310" y="85" text-anchor="middle" fill="#9C27B0" font-size="7">RECEPTION</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#E63946;">Appel</span><span style="color:#F4A261;">Suspension</span><span style="color:#9C27B0;">Reception</span><span>Trajectoire parabolique</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | Travail de l impulsion | 3 phases du saut</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="60" width="170" height="50" fill="#E8D5B7" stroke="#8B4513" stroke-width="2"/><line x1="40" y1="60" x2="40" y2="110" stroke="#E63946" stroke-width="3"/><text x="40" y="55" text-anchor="middle" fill="#E63946" font-size="8">DEPART</text><line x1="100" y1="105" x2="100" y2="115" stroke="#666" stroke-width="2"/><line x1="140" y1="105" x2="140" y2="115" stroke="#666" stroke-width="2"/><text x="100" y="125" text-anchor="middle" fill="#666" font-size="7">10m</text><text x="140" y="125" text-anchor="middle" fill="#666" font-size="7">15m</text><rect x="190" y="60" width="12" height="50" fill="#fff" stroke="#333" stroke-width="3"/><text x="196" y="55" text-anchor="middle" fill="#333" font-size="8" font-weight="bold">PLANCHE</text><rect x="202" y="45" width="118" height="80" fill="#F4A460" stroke="#8B4513" stroke-width="2" rx="5"/><line x1="240" y1="125" x2="240" y2="135" stroke="#333" stroke-width="2"/><text x="240" y="145" text-anchor="middle" fill="#333" font-size="8">2m</text><line x1="280" y1="125" x2="280" y2="135" stroke="#333" stroke-width="2"/><text x="280" y="145" text-anchor="middle" fill="#333" font-size="8">3m</text><line x1="310" y1="125" x2="310" y2="135" stroke="#333" stroke-width="2"/><text x="310" y="145" text-anchor="middle" fill="#333" font-size="8">4m</text><path d="M 198 75 Q 245 15 305 75" fill="none" stroke="#2A9D8F" stroke-width="3" stroke-dasharray="8,4"/><circle cx="305" cy="75" r="8" fill="#2A9D8F"/><line x1="202" y1="85" x2="305" y2="85" stroke="#F4A261" stroke-width="2"/><text x="253" y="100" text-anchor="middle" fill="#F4A261" font-size="9" font-weight="bold">MESURE</text><rect x="115" y="10" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">CONCOURS OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>3 essais mesures</span><span>Meilleur essai retenu</span><span>Decametre</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Concours officiel | Performance mesuree</p></div>'
    },
    'Saut en hauteur': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><rect x="150" y="65" width="60" height="6" fill="#E63946"/><rect x="142" y="35" width="6" height="36" fill="#666"/><rect x="212" y="35" width="6" height="36" fill="#666"/><rect x="165" y="90" width="90" height="40" fill="#87CEEB" stroke="#4682B4" stroke-width="2" rx="5"/><text x="210" y="115" text-anchor="middle" fill="#4682B4" font-size="10" font-weight="bold">TAPIS</text><circle cx="60" cy="100" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="60" y="105" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">S</text><defs><marker id="arrSH1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#1D3557"/></marker></defs><path d="M 72 100 Q 100 100 125 85 Q 145 70 160 68" fill="none" stroke="#1D3557" stroke-width="2" marker-end="url(#arrSH1)"/><text x="100" y="80" fill="#1D3557" font-size="8" font-weight="bold">Courbe en J</text><text x="60" y="130" fill="#666" font-size="8">5 pas droits</text><text x="130" y="130" fill="#666" font-size="8">3 pas courbe</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Sauteur</span><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;"></span> Barre</span><span><span style="display:inline-block;width:12px;height:12px;background:#87CEEB;"></span> Tapis</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours technique | Course en courbe (J) | Impulsion pied exterieur</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><rect x="160" y="55" width="60" height="6" fill="#E63946"/><rect x="152" y="30" width="6" height="31" fill="#666"/><rect x="222" y="30" width="6" height="31" fill="#666"/><rect x="175" y="85" width="90" height="45" fill="#87CEEB" stroke="#4682B4" stroke-width="2" rx="5"/><path d="M 60 110 Q 100 60 155 52" stroke="#1D3557" stroke-width="3" fill="none"/><circle cx="155" cy="52" r="5" fill="#E63946"/><text x="155" y="45" text-anchor="middle" fill="#E63946" font-size="7" font-weight="bold">IMPULSION</text><path d="M 160 50 Q 175 35 190 45 Q 210 35 220 55 Q 230 70 220 90" stroke="#F4A261" stroke-width="2" stroke-dasharray="4,2" fill="none"/><text x="195" y="30" fill="#F4A261" font-size="7">Rotation dorsale</text><circle cx="220" cy="95" r="6" fill="#2A9D8F"/><text x="220" y="120" text-anchor="middle" fill="#2A9D8F" font-size="8" font-weight="bold">RECEPTION DOS</text><text x="80" y="130" fill="#1D3557" font-size="8">Course courbe acceleree</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Course courbe</span><span style="color:#E63946;">Impulsion</span><span style="color:#F4A261;">Rotation dorsale</span><span style="color:#2A9D8F;">Reception</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | Technique Fosbury-Flop | Franchissement dorsal</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><rect x="160" y="45" width="60" height="6" fill="#E63946"/><rect x="152" y="20" width="6" height="31" fill="#666"/><rect x="222" y="20" width="6" height="31" fill="#666"/><rect x="175" y="80" width="90" height="50" fill="#87CEEB" stroke="#4682B4" stroke-width="2" rx="5"/><text x="100" y="45" fill="#666" font-size="9">1m00</text><line x1="120" y1="45" x2="150" y2="45" stroke="#666" stroke-width="1" stroke-dasharray="3,2"/><text x="100" y="60" fill="#666" font-size="9">1m10</text><line x1="120" y1="60" x2="150" y2="60" stroke="#666" stroke-width="1" stroke-dasharray="3,2"/><text x="100" y="75" fill="#666" font-size="9">1m20</text><line x1="120" y1="75" x2="150" y2="75" stroke="#666" stroke-width="1" stroke-dasharray="3,2"/><text x="100" y="90" fill="#666" font-size="9">1m30</text><line x1="120" y1="90" x2="150" y2="90" stroke="#666" stroke-width="1" stroke-dasharray="3,2"/><rect x="115" y="5" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="20" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">CONCOURS OFFICIEL</text><text x="220" y="110" text-anchor="middle" fill="#4682B4" font-size="9" font-weight="bold">TAPIS</text><text x="60" y="130" fill="#333" font-size="8">Barres montantes (+5cm)</text><text x="200" y="145" fill="#333" font-size="8">3 essais par hauteur</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Barres montantes (+5cm)</span><span>3 essais par hauteur</span><span>Fosbury-Flop</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Concours officiel | Hauteur maximale franchie</p></div>'
    },
    'Lancer de poids': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><circle cx="100" cy="100" r="35" fill="none" stroke="#333" stroke-width="4"/><text x="100" y="105" text-anchor="middle" fill="#333" font-size="10" font-weight="bold">CERCLE</text><text x="100" y="118" text-anchor="middle" fill="#666" font-size="8">2.135m</text><line x1="135" y1="100" x2="300" y2="50" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/><line x1="135" y1="100" x2="300" y2="130" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/><text x="250" y="90" text-anchor="middle" fill="#666" font-size="10">SECTEUR 34.92</text><rect x="130" y="95" width="10" height="15" fill="#8B4513"/><text x="135" y="125" text-anchor="middle" fill="#8B4513" font-size="7">BUTOIR</text><circle cx="80" cy="100" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="80" y="105" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">L</text><circle cx="90" cy="85" r="8" fill="#E63946"/><text x="90" y="75" fill="#E63946" font-size="8" font-weight="bold">Poids</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Lanceur</span><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Poids</span><span>Cercle 2.135m</span><span>Secteur 34.92 degres</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours technique | Position de poussee | Poids cale au cou</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><circle cx="100" cy="100" r="35" fill="none" stroke="#333" stroke-width="4"/><rect x="130" y="95" width="10" height="15" fill="#8B4513"/><line x1="135" y1="100" x2="300" y2="50" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/><line x1="135" y1="100" x2="300" y2="130" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/><circle cx="75" cy="105" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="75" y="109" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">1</text><text x="75" y="125" text-anchor="middle" fill="#1D3557" font-size="7">DEPART</text><circle cx="105" cy="95" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="105" y="99" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">2</text><text x="105" y="115" text-anchor="middle" fill="#E63946" font-size="7">TRANSLATION</text><circle cx="125" cy="90" r="10" fill="#2A9D8F" stroke="#fff" stroke-width="2"/><text x="125" y="94" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">3</text><text x="155" y="85" text-anchor="middle" fill="#2A9D8F" font-size="7">POUSSEE</text><defs><marker id="arrP1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 85 105 L 100 98" stroke="#457B9D" stroke-width="2" marker-end="url(#arrP1)"/><path d="M 112 93 L 120 90" stroke="#457B9D" stroke-width="2" marker-end="url(#arrP1)"/></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#1D3557;">1-Depart dos</span><span style="color:#E63946;">2-Translation</span><span style="color:#2A9D8F;">3-Poussee finale</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Circuit technique | Technique O Brien (translation) | 3 phases</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 160" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="20" width="300" height="120" fill="#E8D5B7" stroke="#8B4513" stroke-width="3" rx="5"/><circle cx="80" cy="100" r="35" fill="none" stroke="#333" stroke-width="4"/><rect x="110" y="95" width="10" height="15" fill="#8B4513"/><line x1="115" y1="100" x2="300" y2="40" stroke="#666" stroke-width="2"/><line x1="115" y1="100" x2="300" y2="135" stroke="#666" stroke-width="2"/><path d="M 115 95 Q 180 40 250 60 Q 280 50 295 70" fill="none" stroke="#E63946" stroke-width="3"/><circle cx="295" cy="70" r="8" fill="#E63946"/><line x1="115" y1="100" x2="295" y2="70" stroke="#F4A261" stroke-width="2" stroke-dasharray="6,3"/><text x="205" y="100" text-anchor="middle" fill="#F4A261" font-size="10" font-weight="bold">MESURE</text><line x1="180" y1="130" x2="180" y2="140" stroke="#333" stroke-width="2"/><text x="180" y="150" text-anchor="middle" fill="#333" font-size="8">5m</text><line x1="230" y1="130" x2="230" y2="140" stroke="#333" stroke-width="2"/><text x="230" y="150" text-anchor="middle" fill="#333" font-size="8">7m</text><line x1="280" y1="130" x2="280" y2="140" stroke="#333" stroke-width="2"/><text x="280" y="150" text-anchor="middle" fill="#333" font-size="8">9m</text><rect x="115" y="5" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="20" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">CONCOURS OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>3 essais mesures</span><span>Poids: 3kg (F) / 4kg (G)</span><span>Decametre</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Concours officiel | Meilleure performance</p></div>'
    },
    'Gymnastique': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#F5F5DC" stroke="#8B4513" stroke-width="3" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#8B4513" font-size="10" font-weight="bold">PRATICABLE 12m x 12m</text><rect x="40" y="50" width="70" height="40" fill="#E63946" opacity="0.3" stroke="#E63946" stroke-width="2" rx="5"/><text x="75" y="75" text-anchor="middle" fill="#E63946" font-size="9" font-weight="bold">ACROBATIES</text><text x="75" y="85" text-anchor="middle" fill="#E63946" font-size="7">Roulades</text><rect x="130" y="50" width="70" height="40" fill="#2A9D8F" opacity="0.3" stroke="#2A9D8F" stroke-width="2" rx="5"/><text x="165" y="75" text-anchor="middle" fill="#2A9D8F" font-size="9" font-weight="bold">EQUILIBRES</text><text x="165" y="85" text-anchor="middle" fill="#2A9D8F" font-size="7">ATR</text><rect x="220" y="50" width="70" height="40" fill="#F4A261" opacity="0.3" stroke="#F4A261" stroke-width="2" rx="5"/><text x="255" y="75" text-anchor="middle" fill="#F4A261" font-size="9" font-weight="bold">SOUPLESSE</text><text x="255" y="85" text-anchor="middle" fill="#F4A261" font-size="7">Pont</text><rect x="85" y="100" width="70" height="40" fill="#9C27B0" opacity="0.3" stroke="#9C27B0" stroke-width="2" rx="5"/><text x="120" y="125" text-anchor="middle" fill="#9C27B0" font-size="9" font-weight="bold">SAUTS</text><text x="120" y="135" text-anchor="middle" fill="#9C27B0" font-size="7">Extension</text><rect x="175" y="100" width="70" height="40" fill="#1D3557" opacity="0.3" stroke="#1D3557" stroke-width="2" rx="5"/><text x="210" y="125" text-anchor="middle" fill="#1D3557" font-size="9" font-weight="bold">ROTATIONS</text><text x="210" y="135" text-anchor="middle" fill="#1D3557" font-size="7">Roue</text></svg><div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#E63946;">Acrobaties</span><span style="color:#2A9D8F;">Equilibres</span><span style="color:#F4A261;">Souplesse</span><span style="color:#9C27B0;">Sauts</span><span style="color:#1D3557;">Rotations</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Parcours d habiletes | 5 ateliers | Elements fondamentaux</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#F5F5DC" stroke="#8B4513" stroke-width="3" rx="5"/><text x="170" y="25" text-anchor="middle" fill="#8B4513" font-size="10" font-weight="bold">PRATICABLE - ENCHAINEMENT</text><line x1="40" y1="140" x2="300" y2="50" stroke="#457B9D" stroke-width="2" stroke-dasharray="8,4"/><text x="100" y="115" fill="#457B9D" font-size="8" transform="rotate(-20, 100, 115)">DIAGONALE</text><circle cx="55" cy="130" r="15" fill="#E63946" opacity="0.5" stroke="#E63946" stroke-width="2"/><text x="55" y="135" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">1</text><text x="55" y="155" text-anchor="middle" fill="#E63946" font-size="7">Roulade AV</text><circle cx="120" cy="100" r="15" fill="#2A9D8F" opacity="0.5" stroke="#2A9D8F" stroke-width="2"/><text x="120" y="105" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">2</text><text x="120" y="125" text-anchor="middle" fill="#2A9D8F" font-size="7">ATR</text><circle cx="200" cy="70" r="15" fill="#F4A261" opacity="0.5" stroke="#F4A261" stroke-width="2"/><text x="200" y="75" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">3</text><text x="200" y="95" text-anchor="middle" fill="#F4A261" font-size="7">Roue</text><circle cx="280" cy="55" r="15" fill="#9C27B0" opacity="0.5" stroke="#9C27B0" stroke-width="2"/><text x="280" y="60" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">4</text><text x="280" y="80" text-anchor="middle" fill="#9C27B0" font-size="7">Saut group</text><defs><marker id="arrG1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 70 125 L 105 105" stroke="#457B9D" stroke-width="2" marker-end="url(#arrG1)"/><path d="M 135 95 L 185 75" stroke="#457B9D" stroke-width="2" marker-end="url(#arrG1)"/><path d="M 215 65 L 265 58" stroke="#457B9D" stroke-width="2" marker-end="url(#arrG1)"/></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>4 elements enchaines</span><span>Liaisons fluides</span><span>Diagonale du praticable</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation probleme | Enchainement 4 elements | Continuite et liaisons</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#F5F5DC" stroke="#8B4513" stroke-width="3" rx="5"/><line x1="20" y1="90" x2="320" y2="90" stroke="#8B4513" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/><line x1="170" y1="30" x2="170" y2="150" stroke="#8B4513" stroke-width="1" stroke-dasharray="4,4" opacity="0.5"/><line x1="40" y1="140" x2="300" y2="50" stroke="#E63946" stroke-width="2"/><line x1="40" y1="50" x2="300" y2="140" stroke="#2A9D8F" stroke-width="2"/><text x="60" y="45" fill="#2A9D8F" font-size="8">Diag 1</text><text x="60" y="145" fill="#E63946" font-size="8">Diag 2</text><circle cx="45" cy="90" r="8" fill="#F4A261"/><text x="45" y="93" text-anchor="middle" fill="#fff" font-size="7">D</text><text x="45" y="110" text-anchor="middle" fill="#F4A261" font-size="7">DEBUT</text><circle cx="295" cy="90" r="8" fill="#9C27B0"/><text x="295" y="93" text-anchor="middle" fill="#fff" font-size="7">F</text><text x="295" y="110" text-anchor="middle" fill="#9C27B0" font-size="7">FIN</text><rect x="130" y="155" width="80" height="20" fill="#457B9D" rx="3"/><text x="170" y="169" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">JURY</text><rect x="115" y="5" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="20" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">ENCHAINEMENT OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Praticable 12x12m</span><span>6 elements minimum</span><span>Amplitude + Tenue + Liaisons</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Enchainement complet | Evaluation sur grille</p></div>'
    },
    'Tennis de table': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="50" y="40" width="240" height="120" fill="#1565C0" stroke="#0D47A1" stroke-width="4" rx="5"/><line x1="170" y1="40" x2="170" y2="160" stroke="#fff" stroke-width="3"/><line x1="50" y1="100" x2="290" y2="100" stroke="#fff" stroke-width="2"/><rect x="168" y="35" width="4" height="130" fill="#333"/><rect x="50" y="98" width="240" height="4" fill="#fff"/><circle cx="100" cy="140" r="12" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="100" y="145" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">J1</text><circle cx="240" cy="70" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="240" y="75" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">J2</text><circle cx="130" cy="80" r="6" fill="#F4A261" stroke="#fff" stroke-width="1"/><rect x="80" y="55" width="40" height="30" fill="rgba(255,215,0,0.3)" stroke="#F4A261" stroke-width="2" stroke-dasharray="4,2" rx="3"/><text x="100" y="75" text-anchor="middle" fill="#F4A261" font-size="8" font-weight="bold">CIBLE</text><rect x="220" y="115" width="40" height="30" fill="rgba(255,215,0,0.3)" stroke="#F4A261" stroke-width="2" stroke-dasharray="4,2" rx="3"/><text x="240" y="135" text-anchor="middle" fill="#F4A261" font-size="8" font-weight="bold">CIBLE</text><defs><marker id="arrTT1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2A9D8F"/></marker></defs><path d="M 130 80 Q 170 60 220 75" stroke="#2A9D8F" stroke-width="2" stroke-dasharray="6,3" fill="none" marker-end="url(#arrTT1)"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Joueur 1</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Joueur 2</span><span><span style="display:inline-block;width:12px;height:12px;background:#F4A261;border-radius:50%;"></span> Balle/Cibles</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation regularite | Placement sur cibles | Series de 10 echanges</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="50" y="40" width="240" height="120" fill="#1565C0" stroke="#0D47A1" stroke-width="4" rx="5"/><line x1="170" y1="40" x2="170" y2="160" stroke="#fff" stroke-width="3"/><line x1="50" y1="100" x2="290" y2="100" stroke="#fff" stroke-width="2"/><rect x="168" y="35" width="4" height="130" fill="#333"/><rect x="50" y="98" width="240" height="4" fill="#fff"/><circle cx="90" cy="130" r="12" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="90" y="135" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">A</text><circle cx="250" cy="80" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="250" y="85" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">B</text><circle cx="120" cy="70" r="5" fill="#F4A261" stroke="#fff" stroke-width="1"/><defs><marker id="arrTT2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2A9D8F"/></marker></defs><path d="M 120 70 Q 170 50 230 65" stroke="#2A9D8F" stroke-width="2" fill="none" marker-end="url(#arrTT2)"/><path d="M 230 85 Q 170 110 110 120" stroke="#457B9D" stroke-width="2" fill="none" marker-end="url(#arrTT2)"/><rect x="130" y="5" width="80" height="25" fill="#457B9D" rx="4"/><text x="170" y="22" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 11pts</text><text x="170" y="175" text-anchor="middle" fill="#666" font-size="9">Bonus +1pt si point gagne en moins de 4 echanges</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Joueur A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Joueur B</span><span>Bonus point rapide</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme | Sets de 11 points | Bonus point rapide</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="50" y="40" width="240" height="120" fill="#1565C0" stroke="#0D47A1" stroke-width="4" rx="5"/><line x1="170" y1="40" x2="170" y2="160" stroke="#fff" stroke-width="3"/><line x1="50" y1="100" x2="290" y2="100" stroke="#fff" stroke-width="2"/><rect x="168" y="35" width="4" height="130" fill="#333"/><rect x="50" y="98" width="240" height="4" fill="#fff"/><rect x="50" y="40" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="110" y="40" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="50" y="100" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="110" y="100" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="170" y="40" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="230" y="40" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="170" y="100" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><rect x="230" y="100" width="60" height="60" fill="rgba(255,255,255,0.1)" stroke="#fff" stroke-width="1"/><circle cx="90" cy="140" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="250" cy="70" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><rect x="115" y="5" width="110" height="25" fill="#E63946" rx="5"/><text x="170" y="22" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Meilleur des 3 sets</span><span>Sets de 11 points</span><span>Service alterne (2 pts)</span><span>Regles officielles</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match officiel | Service varie obligatoire</p></div>'
    },
    'Badminton': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="40" y="20" width="260" height="160" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><line x1="170" y1="20" x2="170" y2="180" stroke="#fff" stroke-width="4"/><line x1="40" y1="55" x2="300" y2="55" stroke="#fff" stroke-width="2"/><line x1="40" y1="145" x2="300" y2="145" stroke="#fff" stroke-width="2"/><line x1="40" y1="100" x2="300" y2="100" stroke="#fff" stroke-width="1" stroke-dasharray="6,4"/><rect x="40" y="20" width="130" height="35" fill="rgba(230,57,70,0.2)" stroke="#E63946" stroke-width="2" stroke-dasharray="4,2"/><text x="105" y="42" text-anchor="middle" fill="#E63946" font-size="9" font-weight="bold">ZONE FOND</text><rect x="40" y="145" width="130" height="35" fill="rgba(244,162,97,0.3)" stroke="#F4A261" stroke-width="2" stroke-dasharray="4,2"/><text x="105" y="167" text-anchor="middle" fill="#F4A261" font-size="9" font-weight="bold">ZONE FILET</text><circle cx="90" cy="130" r="12" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="90" y="135" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">J1</text><circle cx="250" cy="70" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="250" y="75" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">J2</text><circle cx="100" cy="40" r="5" fill="#fff" stroke="#333" stroke-width="1"/><defs><marker id="arrBD1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#457B9D"/></marker></defs><path d="M 100 40 Q 135 10 230 35" stroke="#457B9D" stroke-width="2" fill="none" marker-end="url(#arrBD1)"/><text x="160" y="20" fill="#457B9D" font-size="8" font-weight="bold">DEGAGE 1</text><path d="M 230 45 Q 200 10 110 30" stroke="#457B9D" stroke-width="2" fill="none" marker-end="url(#arrBD1)"/><text x="165" y="55" fill="#457B9D" font-size="8" font-weight="bold">DEGAGE 2</text><path d="M 100 35 Q 130 80 100 155" stroke="#2A9D8F" stroke-width="2" fill="none" marker-end="url(#arrBD1)"/><text x="125" y="100" fill="#2A9D8F" font-size="8" font-weight="bold">AMORTI</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span style="color:#457B9D;">Degages (fond)</span><span style="color:#2A9D8F;">Amorti (filet)</span><span>Enchainement 2+1</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation jeu long/court | 2 degages + 1 amorti | Replacement centre</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="40" y="20" width="260" height="160" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><line x1="170" y1="20" x2="170" y2="180" stroke="#fff" stroke-width="4"/><line x1="40" y1="55" x2="300" y2="55" stroke="#fff" stroke-width="2"/><line x1="40" y1="145" x2="300" y2="145" stroke="#fff" stroke-width="2"/><line x1="85" y1="20" x2="85" y2="180" stroke="#fff" stroke-width="1"/><line x1="255" y1="20" x2="255" y2="180" stroke="#fff" stroke-width="1"/><circle cx="105" cy="100" r="12" fill="#E63946" stroke="#fff" stroke-width="2"/><text x="105" y="105" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">A</text><circle cx="235" cy="100" r="12" fill="#1D3557" stroke="#fff" stroke-width="2"/><text x="235" y="105" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">B</text><circle cx="130" cy="50" r="5" fill="#fff" stroke="#333" stroke-width="1"/><defs><marker id="arrBD2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2A9D8F"/></marker></defs><path d="M 130 50 Q 170 30 240 40" stroke="#457B9D" stroke-width="2" fill="none" marker-end="url(#arrBD2)"/><path d="M 240 50 Q 200 120 130 150" stroke="#2A9D8F" stroke-width="2" fill="none" marker-end="url(#arrBD2)"/><rect x="130" y="5" width="80" height="20" fill="#457B9D" rx="4"/><text x="170" y="19" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH 21pts</text><text x="170" y="195" text-anchor="middle" fill="#666" font-size="9">Bonus +1pt si point gagne sur amorti apres degage</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Joueur A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Joueur B</span><span>Bonus amorti apres degage</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Match a theme | Sets de 21 points | Variation long/court valorisee</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 200" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="40" y="20" width="260" height="160" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" rx="5"/><line x1="170" y1="20" x2="170" y2="180" stroke="#fff" stroke-width="4"/><line x1="40" y1="55" x2="300" y2="55" stroke="#fff" stroke-width="2"/><line x1="40" y1="145" x2="300" y2="145" stroke="#fff" stroke-width="2"/><line x1="85" y1="20" x2="85" y2="180" stroke="#fff" stroke-width="2"/><line x1="255" y1="20" x2="255" y2="180" stroke="#fff" stroke-width="2"/><line x1="40" y1="100" x2="300" y2="100" stroke="#fff" stroke-width="1" stroke-dasharray="6,4"/><text x="62" y="40" fill="#fff" font-size="8">Fond G</text><text x="62" y="85" fill="#fff" font-size="8">Av G</text><text x="62" y="125" fill="#fff" font-size="8">Av D</text><text x="62" y="170" fill="#fff" font-size="8">Fond D</text><text x="277" y="40" fill="#fff" font-size="8">Fond G</text><text x="277" y="85" fill="#fff" font-size="8">Av G</text><text x="277" y="125" fill="#fff" font-size="8">Av D</text><text x="277" y="170" fill="#fff" font-size="8">Fond D</text><circle cx="105" cy="100" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="235" cy="100" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><rect x="115" y="3" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="18" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Terrain complet simple</span><span>Meilleur des 3 sets</span><span>Sets de 21 points</span><span>Regles officielles</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match officiel | Variation du jeu obligatoire</p></div>'
    },
    'default': {
        1: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#e0e0e0" stroke="#999" stroke-width="3" rx="5"/><rect x="40" y="50" width="80" height="80" fill="#4CAF50" opacity="0.3" stroke="#4CAF50" stroke-width="2" rx="5"/><text x="80" y="95" text-anchor="middle" fill="#2E7D32" font-size="11" font-weight="bold">ZONE A</text><rect x="130" y="50" width="80" height="80" fill="#2196F3" opacity="0.3" stroke="#2196F3" stroke-width="2" rx="5"/><text x="170" y="95" text-anchor="middle" fill="#1565C0" font-size="11" font-weight="bold">ZONE B</text><rect x="220" y="50" width="80" height="80" fill="#FF9800" opacity="0.3" stroke="#FF9800" stroke-width="2" rx="5"/><text x="260" y="95" text-anchor="middle" fill="#E65100" font-size="11" font-weight="bold">ZONE C</text><circle cx="80" cy="145" r="8" fill="#E63946"/><circle cx="170" cy="145" r="8" fill="#1D3557"/><circle cx="260" cy="145" r="8" fill="#2A9D8F"/></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#4CAF50;"></span> Zone A</span><span><span style="display:inline-block;width:12px;height:12px;background:#2196F3;"></span> Zone B</span><span><span style="display:inline-block;width:12px;height:12px;background:#FF9800;"></span> Zone C</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation d apprentissage | Organisation en 3 zones | Travail par ateliers</p></div>',
        2: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#e0e0e0" stroke="#999" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="150" stroke="#666" stroke-width="2" stroke-dasharray="8,4"/><rect x="40" y="50" width="110" height="80" fill="#E63946" opacity="0.2" stroke="#E63946" stroke-width="2" rx="5"/><text x="95" y="95" text-anchor="middle" fill="#E63946" font-size="11" font-weight="bold">EQUIPE A</text><rect x="190" y="50" width="110" height="80" fill="#1D3557" opacity="0.2" stroke="#1D3557" stroke-width="2" rx="5"/><text x="245" y="95" text-anchor="middle" fill="#1D3557" font-size="11" font-weight="bold">EQUIPE B</text><circle cx="70" cy="75" r="8" fill="#E63946"/><circle cx="95" cy="105" r="8" fill="#E63946"/><circle cx="120" cy="75" r="8" fill="#E63946"/><circle cx="220" cy="75" r="8" fill="#1D3557"/><circle cx="245" cy="105" r="8" fill="#1D3557"/><circle cx="270" cy="75" r="8" fill="#1D3557"/><rect x="130" y="5" width="80" height="20" fill="#457B9D" rx="4"/><text x="170" y="19" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">MATCH</text></svg><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span><span style="display:inline-block;width:12px;height:12px;background:#E63946;border-radius:50%;"></span> Equipe A</span><span><span style="display:inline-block;width:12px;height:12px;background:#1D3557;border-radius:50%;"></span> Equipe B</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation a theme | Match adapte | Organisation en equipes</p></div>',
        3: '<div style="text-align:center;margin:20px 0;"><svg viewBox="0 0 340 180" style="width:100%;max-width:480px;height:auto;display:block;margin:0 auto;background:#f8f9fa;border-radius:8px;"><rect x="20" y="30" width="300" height="120" fill="#e0e0e0" stroke="#999" stroke-width="3" rx="5"/><line x1="170" y1="30" x2="170" y2="150" stroke="#333" stroke-width="3"/><rect x="30" y="40" width="130" height="100" fill="#E63946" opacity="0.15" stroke="#E63946" stroke-width="2"/><rect x="180" y="40" width="130" height="100" fill="#1D3557" opacity="0.15" stroke="#1D3557" stroke-width="2"/><circle cx="60" cy="65" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="100" cy="90" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="60" cy="115" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="130" cy="90" r="10" fill="#E63946" stroke="#fff" stroke-width="2"/><circle cx="280" cy="65" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="240" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="280" cy="115" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><circle cx="210" cy="90" r="10" fill="#1D3557" stroke="#fff" stroke-width="2"/><rect x="115" y="5" width="110" height="22" fill="#E63946" rx="5"/><text x="170" y="20" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">MATCH OFFICIEL</text></svg><div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:10px;padding:8px;background:#f0f0f0;border-radius:5px;font-size:11px;"><span>Reglement officiel adapte</span><span>Arbitrage par eleves</span><span>Evaluation terminale</span></div><p style="font-size:12px;color:#333;margin-top:8px;font-weight:600;">Situation de reference | Match officiel | Regles adaptees au niveau</p></div>'
    }
};

// ============================================================================
// FONCTION POUR RÉCUPÉRER UN SCHÉMA
// ============================================================================

var getSchema = function(aps, numSit) {
    if (SCHEMAS[aps] && SCHEMAS[aps][numSit]) {
        return SCHEMAS[aps][numSit];
    }
    return SCHEMAS['default'][numSit] || SCHEMAS['default'][1];
};
// ============================================================================
// OBJECTIFS_CYCLE - Projets de cycle complets par APS et niveau
// ============================================================================

const OBJECTIFS_CYCLE = {
    'Football': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer le niveau initial des élèves (capacités motrices, techniques et tactiques) afin de diagnostiquer les besoins et constituer des groupes de niveau.",
            S2: "Maîtriser les lois du jeu (FIFA adaptées au milieu scolaire), comprendre les principes de l'occupation de l'espace (bloc équipe) et les valeurs du fair-play.",
            S12: "Test bilan - Évaluation finale : Évaluer le degré d'atteinte des objectifs du cycle, mesurer la progression technique et tactique et valider les acquis en situation de match."
        },
        debutant: [
            "Maîtriser la conduite de balle en variant les surfaces de contact (intérieur/coup de pied) sans perdre le contrôle.",
            "Apprendre à réaliser une passe courte précise à l'intérieur du pied vers un partenaire immobile.",
            "S'initier au contrôle de balle (amorti) pour enchaîner rapidement une action de jeu.",
            "Comprendre le principe du dégrappage : s'écarter du porteur de balle pour occuper le terrain.",
            "Apprendre la technique de frappe au but (armé de jambe et placement du pied d'appui).",
            "Découvrir les rôles défensifs : se placer entre le ballon et son propre but.",
            "Maîtriser les remises en jeu (touches et dégagements) en respectant le règlement.",
            "S'initier à l'arbitrage : signaler une sortie, une faute de main ou un coup franc.",
            "Match de pré-évaluation : appliquer les règles de base et maintenir sa position sur le terrain."
        ],
        moyen: [
            "Améliorer la conduite de balle à vitesse supérieure avec prise d'information (lever la tête).",
            "Réaliser des passes dans la course d'un partenaire (anticiper le déplacement).",
            "Enchaîner contrôle orienté et passe ou tir en deux touches de balle maximum.",
            "Travailler l'appui et le soutien : offrir des solutions de passe courtes et sécurisées.",
            "Perfectionner la précision des tirs sur des cibles fixes ou mobiles (angles fermés).",
            "Mettre en place une défense de zone simple : couvrir son partenaire et fermer les angles.",
            "Utiliser les couloirs latéraux pour progresser vers le but adverse.",
            "Arbitrage et gestion de match : gérer le hors-jeu et les fautes de comportement.",
            "Tournoi réduit : privilégier la conservation du ballon avant de chercher la profondeur."
        ],
        avance: [
            "Maîtriser la protection de balle sous pression adverse (utilisation du corps).",
            "Développer le jeu long (transversales) pour changer d'aile et déséquilibrer le bloc adverse.",
            "Perfectionner la finition devant le but sous contrainte temporelle ou d'opposition.",
            "Apprendre les principes du Une-Deux et des combinaisons à trois pour percer une défense.",
            "Travailler le pressing collectif : déclencher une récupération haute du ballon.",
            "Transition rapide : passer de la phase défensive à l'attaque (contre-attaque fulgurante).",
            "Organisation tactique : respecter un système de jeu choisi (ex: 4-4-2 ou 4-3-3).",
            "Coaching et statistiques : analyser les points forts/faibles de l'adversaire.",
            "Mise en situation réelle de compétition avec application rigoureuse des consignes tactiques."
        ],
        elite: [
            "Optimisation de la vitesse de réaction avec ballon et réduction des temps de latence technique.",
            "Maîtriser les coups de pied arrêtés (corners, coups francs) : placements et trajectoires spécifiques.",
            "Travail spécifique par poste : défenseurs (alignement), milieux (orientation), attaquants (appels).",
            "Maîtriser le bloc bas et le bloc haut selon les phases du match.",
            "Développer l'intelligence de jeu : lecture des trajectoires d'interception et anticipation.",
            "Gestion du rythme : alterner entre jeu de possession lent et accélérations verticales.",
            "Simulation de situations de crise (jouer en infériorité numérique ou score à remonter).",
            "Analyse vidéo ou théorique avancée sur les systèmes de jeu modernes.",
            "Match de haute intensité avec focus sur le leadership et la communication sur le terrain."
        ]
    },
    'Volleyball': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer le niveau initial des élèves (capacité à maintenir le ballon en l'air, respect des zones de jeu) pour établir un diagnostic et former des groupes homogènes.",
            S2: "Étude du règlement officiel (FIVB adapté), compréhension du système de rotation, des fautes de filet, et des principes tactiques de base (réception-passe-attaque).",
            S12: "Test bilan - Évaluation finale : Évaluer les progrès techniques individuels et l'efficacité de l'organisation collective en situation de match officiel."
        },
        debutant: [
            "Maîtriser le service cuillère pour mettre le ballon en jeu de manière sécurisée.",
            "Développer la réception en manchette (bras tendus, plan de frappe stable) sur des ballons faciles.",
            "S'initier à la passe haute (en touche) pour s'auto-envoyer le ballon ou viser une zone.",
            "Apprendre à renvoyer le ballon dans le camp adverse dès la première ou deuxième touche.",
            "Comprendre l'organisation spatiale : ne pas se gêner et respecter sa zone de départ.",
            "Travailler le déplacement court et l'arrêt (être sous le ballon) avant de frapper.",
            "S'initier au renvoi offensif simple (chercher les zones vides du camp adverse).",
            "Apprendre l'arbitrage de base : compter les points, signaler le ballon in ou out.",
            "Match dirigé : focus sur la réduction des fautes directes (filet et hors-limites)."
        ],
        moyen: [
            "Améliorer la précision du service (viser le fond du terrain ou les zones latérales).",
            "Stabiliser la réception en manchette pour l'orienter vers la zone du passeur (zone 3).",
            "Maîtriser la passe haute de précision pour offrir un ballon exploitable à l'attaquant.",
            "Construire une attaque en trois touches (Réception – Passe – Renvoi).",
            "S'initier au smash (attaque smashée) : coordination course d'élan et frappe haute.",
            "Apprendre le placement défensif de base en lecture (attendre le ballon en position basse).",
            "Utiliser la communication verbale (J'ai !, Moi !) pour éviter les collisions.",
            "Arbitrage et score : gérer les rotations et les changements de camp.",
            "Tournoi : privilégier la construction du jeu avant de chercher à marquer le point."
        ],
        avance: [
            "Maîtriser le service tennis (bras haut) pour mettre l'adversaire en difficulté.",
            "Perfectionner la manchette de précision même sur des services puissants.",
            "Développer la passe arrière et la passe latérale pour varier les cibles d'attaque.",
            "Optimiser la relation Passeur/Attaquant (timing de l'appel de balle).",
            "S'initier au contre (block) individuel pour fermer les angles d'attaque.",
            "Mise en place d'un système défensif en W pour couvrir tout le terrain en réception.",
            "Apprendre à varier les attaques : smashes puissants, ballons placés (feintes).",
            "Observation tactique : identifier le maillon faible adverse pour orienter le service.",
            "Match de compétition : application de schémas tactiques simples (priorité au jeu placé)."
        ],
        elite: [
            "Maîtriser le service smashé ou le service flottant agressif.",
            "Spécialisation des postes : rôles fixes (Passeur, Pointu, Réceptionneur-Attaquant, Central).",
            "Perfectionner les attaques rapides (la fixe) pour surprendre le contre adverse.",
            "Organiser un contre collectif (à deux joueurs) et la couverture derrière le contre.",
            "Transition Défense-Attaque : réorganisation rapide après une récupération difficile.",
            "Mise en œuvre de systèmes tactiques complexes (système 5-1 ou 4-2).",
            "Travail spécifique du Libero : réception haute exigence et sauvetages acrobatiques.",
            "Analyse tactique sur tableau : gestion des permutations et des combinaisons.",
            "Match de haut niveau avec contraintes : gérer la pression et les fins de sets serrées."
        ]
    },
    'Basketball': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer la capacité à manipuler le ballon, à se déplacer et à viser la cible pour diagnostiquer le niveau moteur et technique.",
            S2: "Apprentissage des règles fondamentales (marcher, reprise de dribble, fautes de contact, zone), et explication des rôles (meneur, ailier, pivot).",
            S12: "Test bilan - Évaluation finale : Évaluation finale des compétences acquises en situation de match (efficacité au tir, respect des règles et choix tactiques)."
        },
        debutant: [
            "Maîtriser le dribble de progression avec la main dominante sans regarder constamment le ballon.",
            "Apprendre la passe de poitrine à deux mains avec une extension complète des bras.",
            "S'initier au tir à l'arrêt : position des pieds, coude sous le ballon et cassé du poignet.",
            "Apprendre le double-pas (lay-up) : coordination des appuis droite-gauche ou gauche-droite.",
            "Comprendre la notion de non-contact : défendre sans toucher l'adversaire (bras levés).",
            "Apprendre à s'arrêter en un ou deux temps pour éviter le marcher.",
            "S'initier au pivotement pour protéger son ballon face à un défenseur.",
            "S'initier à l'arbitrage : gestuelle de base pour le marcher et les sorties.",
            "Match dirigé : focus sur la progression vers l'avant sans violation de règle."
        ],
        moyen: [
            "Maîtriser le changement de main en dribble (devant soi) pour contourner un obstacle.",
            "Développer la passe par-dessus la tête et la passe à terre pour varier les trajectoires.",
            "Améliorer la réussite au tir à mi-distance après un seul dribble.",
            "Perfectionner le lay-up en pleine course (vitesse d'exécution).",
            "Mise en place d'une défense individuelle avec respect du triangle Ballon-Moi-Adversaire.",
            "Apprendre à faire un écran simple pour libérer un partenaire porteur de balle.",
            "Développer le rebond offensif et défensif (prise de position sous le panier).",
            "Arbitrage et gestion de la table de marque (feuille de match simplifiée).",
            "Tournoi : privilégier le jeu de passes avant le tir (règle des 3 passes minimum)."
        ],
        avance: [
            "Maîtriser le dribble de protection et le changement de rythme pour éliminer un défenseur.",
            "Développer la passe aveugle ou la passe après saut pour surprendre la défense.",
            "Travailler le tir en suspension (Jump Shot) avec une forme stable.",
            "Maîtriser le Give and Go (Passe et va) pour créer des brèches.",
            "Mise en place d'une défense de zone (2-3 ou 3-2) et compréhension des coulissements.",
            "Apprendre à gérer le Pick and Roll (Écran et rouler) en attaque.",
            "Travailler la transition rapide (contre-attaque) après une récupération de balle.",
            "Coaching : analyser les statistiques de réussite et ajuster la stratégie à la mi-temps.",
            "Match de compétition : application rigoureuse des systèmes de jeu annoncés."
        ],
        elite: [
            "Optimisation du dribble croisé (Crossover) et des appuis de décalage (Step-back).",
            "Maîtriser la lecture de jeu sur défense de zone et défense presse.",
            "Perfectionnement du tir à 3 points et des lancers-francs sous pression (fin de match).",
            "Systèmes offensifs complexes avec multiples écrans et coupes.",
            "Maîtriser la Presse tout terrain et le repli défensif organisé.",
            "Travail spécifique du poste : lecture du jeu pour le meneur, jeu dos au panier pour le pivot.",
            "Gestion des dernières possessions (stratégies sur 24 secondes).",
            "Analyse vidéo des placements et des erreurs de communication défensive.",
            "Match de haute intensité avec gestion des fautes et du temps mort tactique."
        ]
    },
    'Handball': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer la qualité de la passe, du tir et l'engagement défensif pour identifier les besoins du groupe.",
            S2: "Étude du règlement (zone, marcher, 3 secondes, fautes de bras) et des principes d'attaque placée.",
            S12: "Test bilan - Évaluation finale : Validation des acquis techniques et tactiques en situation réelle de compétition."
        },
        debutant: [
            "Maîtriser la manipulation du ballon (prise de balle à une main) et le dribble de base.",
            "Apprendre la passe d'épaule précise vers un partenaire arrêté.",
            "S'initier au tir en appui (pied opposé au bras lanceur devant).",
            "Apprendre le cycle des 3 pas pour déclencher un tir ou une passe.",
            "Comprendre l'interdiction d'entrer dans la zone du gardien.",
            "S'initier au rôle de gardien de but : postures et parades de base.",
            "Apprendre à défendre en restant face à l'attaquant sans commettre de faute grave.",
            "Arbitrage : signaler le marcher et le jet de coin.",
            "Match dirigé : focus sur la circulation de balle sans dribble excessif."
        ],
        moyen: [
            "Améliorer la passe en course et la réception en mouvement.",
            "Maîtriser le tir en suspension pour franchir la ligne des 6 mètres.",
            "Apprendre à fixer un défenseur pour libérer un partenaire sur l'aile.",
            "Mise en place d'une défense de zone alignée (6-0) simple.",
            "Travailler le débordement individuel par la feinte de corps.",
            "Apprendre le rôle du pivot : se placer entre les défenseurs et offrir une solution.",
            "Développer la montée de balle rapide après un but encaissé ou une parade.",
            "Arbitrage : identifier le passage en force et la défense à l'intérieur de la zone.",
            "Tournoi : privilégier l'écartement des joueurs sur toute la largeur du terrain."
        ],
        avance: [
            "Maîtriser les tirs variés (tirs à la hanche, tirs désaxés, tirs plongeants pour les ailiers).",
            "Développer la relation Arrière-Pivot (passes cachées, blocs).",
            "Mise en place d'une défense agressive (5-1) pour perturber le meneur adverse.",
            "Travailler les croisements simples entre la base arrière pour créer des décalages.",
            "Maîtriser l'interception de balle par la lecture des trajectoires de passe.",
            "Utiliser le surnombre (3 contre 2) pour finir l'action sur l'aile.",
            "Apprendre à gérer les exclusions temporaires (jouer à 5 contre 6).",
            "Coaching : proposer des solutions tactiques face à une défense haute.",
            "Match de compétition : focus sur la continuité du jeu et la fluidité des transitions."
        ],
        elite: [
            "Perfectionnement du tir en appui long et du tir Kung-fu (en l'air).",
            "Systèmes tactiques complexes (circulations de joueurs, doubles pivots).",
            "Maîtriser la défense 3-2-1 ou 4-2 avec harcèlement constant.",
            "Analyse des points faibles du gardien adverse et adaptation des tirs.",
            "Travail de la puissance explosive (pliométrie) adaptée aux sauts de tir.",
            "Spécialisation des postes : travail spécifique pour les demi-centres et ailiers.",
            "Gestion tactique des fins de match (jeu sans gardien pour le surnombre).",
            "Analyse vidéo : correction des alignements défensifs.",
            "Match de haut niveau avec application de consignes de jeu placées."
        ]
    },
  'Course de vitesse': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer le temps de réaction et la vitesse maximale sur 60m ou 80m (chronométrage de référence).",
            S2: "Comprendre la physiologie de la vitesse (anaérobie alactique), les phases de la course (départ, accélération, maintien) et le règlement.",
            S12: "Test bilan - Évaluation finale : Mesurer la performance finale et comparer avec le test initial pour valider la progression."
        },
        debutant: [
            "Apprendre la posture de course : buste droit, regard vers l'horizon, bras en piston.",
            "Développer la réactivité au signal sonore (varier les positions de départ : assis, couché, dos).",
            "Maîtriser les appuis plante de pied (courir sur la pointe) pour réduire le temps de contact.",
            "Apprendre le départ en appui-face (sans starting-blocks) : jambe de force devant.",
            "Travailler la coordination bras/jambes par des exercices de montée de genoux et talons-fesses.",
            "Apprendre à maintenir sa trajectoire droite dans son couloir.",
            "S'initier à l'accélération progressive sur 10 à 20 mètres.",
            "Apprendre à franchir la ligne d'arrivée sans ralentir (casser le buste).",
            "Pré-test chronométré avec gestion du stress du départ."
        ],
        moyen: [
            "Améliorer l'efficacité de la foulée (amplitude vs fréquence).",
            "S'initier au réglage et à l'utilisation des starting-blocks (angles des cales).",
            "Maîtriser le commandement de départ : À vos marques, Prêt, Partez.",
            "Travailler la phase de poussée explosive lors des 10 premiers mètres (rester bas).",
            "Développer la vitesse de réaction spécifique (signaux visuels ou tactiles).",
            "Enchaîner la phase de mise en action et le passage à la course redressée.",
            "Travailler le maintien de la vitesse maximale (résistance à la décélération sur 50m).",
            "S'initier au rôle de starter et de chronométreur officiel.",
            "Compétition interne : gestion des séries et des finales."
        ],
        avance: [
            "Optimiser le placement dans les blocs pour une poussée maximale (poids du corps sur les bras).",
            "Travailler la puissance du premier appui en sortie de blocs.",
            "Développer la force explosive des membres inférieurs par des bonds horizontaux.",
            "Améliorer la technique de bras (amplitude et dynamisme) pour équilibrer la foulée.",
            "Maîtriser la transition entre la phase d'accélération et la phase de vitesse maximale.",
            "Travailler la vitesse de pointe sur des distances de 30m lancés.",
            "Apprendre à rester relâché (mâchoire, épaules) même à vitesse maximale.",
            "Analyse technique : utiliser la vidéo pour corriger l'inclinaison du buste au départ.",
            "Meeting d'athlétisme scolaire : recherche du record personnel."
        ],
        elite: [
            "Travail spécifique de la puissance anaérobie alactique (efforts très courts, récupérations longues).",
            "Optimisation biomécanique du cycle de jambe (griffé du sol).",
            "Entraînement au départ avec pistolet ou signal électronique de compétition.",
            "Travail de survitesse (course en légère descente ou avec élastique).",
            "Renforcement musculaire spécifique (chaîne postérieure) pour la propulsion.",
            "Analyse de la fréquence gestuelle (nombre d'appuis par seconde).",
            "Gestion mentale de la course : concentration et visualisation du 100m.",
            "Planification de l'affûtage avant les compétitions régionales/nationales.",
            "Test de performance en conditions réelles (vent, opposants de même niveau)."
        ]
    },
    'Lancer de poids': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Évaluer le niveau initial (force et coordination) et identifier les élèves qui lancent au lieu de pousser.",
            S2: "Règles de sécurité (zone de jet), tenue de l'engin (embase des doigts), et distinction entre jet et lancer.",
            S12: "Test bilan - Évaluation finale : Lancer un poids de 4kg (garçons) ou 3kg (filles) le plus loin possible et mesurer la performance."
        },
        debutant: [
            "Apprendre à tenir le poids contre le cou et à réaliser une poussée directe vers l'avant.",
            "Travailler l'appui au sol : pieds décalés, poids du corps sur la jambe arrière.",
            "S'initier à l'extension complète du bras lanceur avec le coude haut.",
            "Travailler la trajectoire (viser une zone en hauteur) pour éviter les jets rasants.",
            "Apprendre à rester dans le cercle après le jet (équilibre statique).",
            "Exercices de renforcement simple : lancers de medecine-ball à deux mains.",
            "Intégrer une légère torsion du buste avant la poussée.",
            "S'initier au rôle de juge : mesurer une performance avec un ruban.",
            "Pré-évaluation : réaliser 3 jets corrects sans sortir du cercle."
        ],
        moyen: [
            "Stabiliser la tenue du poids lors d'une mise en tension du buste.",
            "Apprendre le placement de profil par rapport à la zone de chute.",
            "Travailler la poussée de la jambe droite (pour les droitiers) vers l'avant.",
            "Coordonner la fin de la poussée de jambe avec le départ du bras.",
            "Améliorer l'angle d'envol (repères visuels à 45 degrés).",
            "Travailler l'explosivité : enchaîner flexion de jambe et extension bras rapide.",
            "S'initier au pas chassé très simple pour prendre de l'élan.",
            "Apprendre à annoncer les résultats et gérer un concours de classe.",
            "Pré-compétition : stabiliser le lancer de profil avec élan réduit."
        ],
        avance: [
            "Maîtriser le placement en Power Position (position de force) de manière stable.",
            "Apprendre le sursaut (glissement) arrière dans l'axe du jet.",
            "Travailler la reprise d'appui après le sursaut pour ne pas s'arrêter.",
            "Améliorer l'amplitude du mouvement : aller chercher le poids loin derrière.",
            "Travailler le fouetté final du poignet pour donner de la vitesse.",
            "Exercices de proprioception pour garder le poids collé au cou malgré l'élan.",
            "S'initier au rattrapage (changement de pieds après le jet) pour rester dans le cercle.",
            "Jugement : identifier les jets nuls (poids qui descend, sortie devant).",
            "Concours blanc : enchaîner sursaut et jet fluide."
        ],
        elite: [
            "Perfectionner la position de départ (dos à la zone de chute).",
            "Travailler le déséquilibre arrière contrôlé pour amorcer le sursaut.",
            "Maîtriser le rasé de sol lors du glissement pour rester bas.",
            "Travailler la fermeture de l'épaule gauche (pour les droitiers) pour créer une torsion.",
            "Accélérer la phase finale (la gifle au poids).",
            "Travail de force explosive spécifique (pliométrie haute).",
            "Gérer l'espace du cercle : utiliser toute la longueur disponible.",
            "Organisation d'un meeting : chronométrage du temps de préparation (1 min).",
            "Séance de réglage des appuis et de la direction du jet."
        ]
    },
    'Saut en longueur': {
        commun: {
            S1: "Test d'observation - Évaluation diagnostique : Courir et sauter le plus loin possible. 3 essais mesurés pour chaque élève.",
            S2: "Règlement (planche, mordu, mesure à la trace), biomécanique du saut (Vitesse + Impulsion = Distance), et sécurité.",
            S12: "Test bilan - Évaluation finale : 3 essais mesurés. Note basée sur la performance brute et l'évolution technique observée."
        },
        debutant: [
            "Identifier son pied d'appel (pied de force) à travers des jeux de sauts variés.",
            "Apprendre la coordination bras/jambes lors d'un saut sans élan.",
            "S'initier à l'impulsion sur un pied et la réception équilibrée sur deux pieds dans le sable.",
            "Travailler l'élan réduit (3 à 5 foulées) pour toucher la zone d'appel sans ralentir.",
            "Apprendre à ramener les genoux vers la poitrine lors de la phase de suspension.",
            "Exercices de proprioception : ne pas tomber en arrière lors de la réception.",
            "S'initier au rôle de juge-mesureur (placer le décamètre correctement).",
            "Stabiliser une course d'élan courte et régulière.",
            "Pré-évaluation : enchaîner élan, appel et réception sans mordre."
        ],
        moyen: [
            "Étalonner sa course d'élan (mesure en pieds ou foulées) pour arriver sur la planche.",
            "Travailler le rythme des 3 dernières foulées (court-long-court) pour préparer l'impulsion.",
            "Optimiser l'angle d'envol : sauter par-dessus un élastique placé à faible hauteur.",
            "Travailler la vitesse de la course d'élan (progressive et non maximale immédiate).",
            "Améliorer la technique de suspension (style groupé).",
            "Travailler l'extension complète de la jambe d'appel lors de l'impulsion.",
            "Apprendre à projeter les talons le plus loin possible devant soi à l'atterrissage.",
            "Arbitrage : gérer les drapeaux blanc (valide) et rouge (mordu).",
            "Séance de réglage des marques d'élan sous pression de vitesse."
        ],
        avance: [
            "Optimisation de la course d'élan : recherche de la vitesse maximale contrôlable.",
            "Travail spécifique sur le griffé du dernier appui au sol.",
            "S'initier à la technique de suspension en extension (cambré-regroupé).",
            "Travailler la montée du genou de la jambe libre lors de l'impulsion.",
            "Exercices de pliométrie (bonds horizontaux) pour augmenter l'explosion au sol.",
            "Analyser la trajectoire : éviter les sauts trop plats ou trop clochés.",
            "Travailler l'esquive latérale ou le basculement du bassin à la réception.",
            "Analyse vidéo ou observation fine : détecter les ralentissements avant la planche.",
            "Concours blanc : gestion des 3 essais comme en compétition officielle."
        ],
        elite: [
            "Stabilisation millimétrée des marques d'élan à haute intensité.",
            "Perfectionnement du Ciseau ou Double Ciseau durant la phase de vol.",
            "Travail de survitesse (course avec vent arrière ou légère pente).",
            "Optimisation du transfert d'énergie : synchronisation parfaite bras-jambes.",
            "Travail de gainage dynamique pour maintenir la posture en l'air.",
            "Travail psychologique : concentration et visualisation du saut parfait.",
            "Analyse des statistiques personnelles (vitesse d'entrée vs distance réalisée).",
            "Coaching : les élèves élites aident à corriger les débutants sur des détails techniques.",
            "Séance d'affûtage : peu de sauts, mais à 100% de l'engagement."
        ]
    },
   'Saut en hauteur': {
        commun: {
            S1: "Test d'observation - Situation de référence : Franchir une barre à différentes hauteurs. 3 essais par hauteur. Diagnostic sur : le pied d'appel, la direction de la course et la technique de franchissement naturelle (Ciseau ou autre).",
            S2: "Règlement (appel un pied obligatoire, 3 échecs consécutifs = élimination, ne pas toucher les montants), sécurité (chute sur les épaules/dos dans la zone de réception), et principes mécaniques (vitesse d'approche et angle d'envol).",
            S12: "Test bilan - Concours final officiel : Mesure de la meilleure performance (Record Personnel). Note basée sur la performance brute et l'évolution de la maîtrise technique."
        },
        debutant: [
            "Identifier son pied d'appel et s'initier au saut en 'Ciseau' (jambe d'attaque tendue, puis jambe d'esquive).",
            "Travailler l'impulsion verticale près de la barre sans course d'élan (sauter 'haut' et non 'loin').",
            "Apprendre la course d'élan rectiligne (5 à 7 pas) et l'arrêt dynamique sur le pied d'appel.",
            "Travailler la réception sur les deux pieds ou sur la jambe d'esquive en toute sécurité.",
            "Améliorer l'élévation des bras lors de l'impulsion pour gagner en hauteur.",
            "Franchir des obstacles bas avec une trajectoire en 'cloche'.",
            "S'initier au rôle de juge (monter la barre, vérifier le taquet).",
            "Stabiliser la course d'élan pour éviter de piétiner avant l'appel.",
            "Pré-évaluation : concours interne sur des hauteurs de base."
        ],
        moyen: [
            "Introduction à la course en courbe (trajectoire en 'J') : 5 pas droits, 3 pas courbes.",
            "S'initier au 'Fosbury Flop' : franchissement de dos avec chute sur les épaules.",
            "Travailler l'inclinaison du corps vers l'intérieur de la courbe pour créer de la force centrifuge.",
            "Apprendre à impulser dos à la barre après le dernier appui en courbe.",
            "Coordination : synchroniser la montée du genou libre avec l'impulsion.",
            "Travailler la phase de suspension : regarder le plafond pour favoriser l'extension.",
            "Apprendre à mesurer ses marques (mesure de la perpendiculaire à la barre).",
            "Gérer l'entrée dans la courbe sans perdre de vitesse.",
            "Séance de réglage des hauteurs de départ pour le concours bilan."
        ],
        avance: [
            "Optimiser la vitesse de la course d'élan (accélération sur les 3 derniers appuis).",
            "Perfectionner le 'pontage' : cambrer le dos au-dessus de la barre pour dégager les hanches.",
            "Travailler le 'regroupé' final : ramener les pieds vers le haut pour éviter de toucher la barre avec les talons.",
            "Exercices de pliométrie : sauts de haie suivis d'une impulsion verticale.",
            "Travailler l'appel 'actif' (griffé du sol) pour transformer la vitesse en hauteur.",
            "Analyser le point culminant du saut : il doit se situer au-dessus de la barre.",
            "Gérer l'échec : technique de respiration entre deux essais manqués.",
            "Analyse vidéo : corriger l'alignement tête-épaules lors du franchissement.",
            "Concours blanc avec gestion des montées de barres par palier de 3 ou 5 cm."
        ],
        elite: [
            "Stabilisation de la course d'élan à intensité maximale (marques fixes).",
            "Travail spécifique du 'double bras' à l'impulsion pour une poussée explosive.",
            "Optimisation du timing du 'coup de reins' (pontage dynamique).",
            "Travail de survitesse sur la courbe d'élan.",
            "Renforcement de la chaîne postérieure (lombaires/fessiers) pour le maintien en l'air.",
            "Gestion psychologique : sauter devant un public ou contre des adversaires de haut niveau.",
            "Stratégie de concours : choisir quand passer ses tours pour économiser de l'énergie.",
            "Séance d'auto-analyse : ajuster son point d'appel selon les sensations.",
            "Séance de 'fraîcheur' : peu de sauts, focus sur la qualité technique parfaite."
        ]
    },
    'Course de haies': {
        commun: {
            S1: "Test d'observation - Situation de référence : Course chronométrée sur la distance officielle (ex: 40m ou 60m haies). Diagnostic sur : le nombre d'appuis entre les haies, l'hésitation au franchissement et la jambe d'attaque.",
            S2: "Règlement (hauteur des haies, couloirs, franchissement licite), sécurité (ne pas sauter de biais), et vocabulaire technique (jambe d'attaque, jambe d'esquive, intervalle).",
            S12: "Test bilan - Compétition finale : Chronométrage des 3 essais. Note basée sur la performance (vitesse) et l'efficacité du franchissement (maintien de la vitesse horizontale)."
        },
        debutant: [
            "Identifier sa jambe d'attaque et s'initier au franchissement de lattes ou de haies très basses.",
            "Apprendre à courir 'par-dessus' la haie sans faire un saut en hauteur (rester rasant).",
            "Stabiliser un rythme régulier de 5 appuis entre les haies sur une distance courte.",
            "Travailler la jambe d'attaque : genou haut et jambe qui se tend vers l'obstacle.",
            "Travailler la jambe d'esquive (jambe arrière) : ouverture sur le côté pour éviter de toucher la haie.",
            "Apprendre à ne pas ralentir avant l'obstacle (course engagée).",
            "S'initier aux rôles de starter et de chronométreur.",
            "Enchaîner 3 à 4 haies sans rupture de rythme.",
            "Pré-test chronométré pour ajuster les intervalles si besoin."
        ],
        moyen: [
            "S'initier au rythme de 3 pas entre les haies (haies rapprochées et basses).",
            "Travailler la reprise d'appui active : le pied d'attaque doit 'griffer' le sol dès la réception.",
            "Améliorer la coordination bras/jambes pour équilibrer le corps pendant le vol.",
            "Travailler la course d'élan jusqu'à la première haie (8 pas fixes).",
            "Développer l'agressivité face à l'obstacle : attaquer la haie loin devant.",
            "Maintenir le rythme de 3 pas sur une série plus longue (5 à 6 haies).",
            "Apprendre à gérer le couloir voisin (ne pas être perturbé par l'adversaire).",
            "Travail de vitesse : courir entre les haies à intensité maximale.",
            "Séance de réglage des marques pour optimiser le temps de réaction au départ."
        ],
        avance: [
            "Optimiser la 'rasance' de la haie : minimiser le temps passé en l'air.",
            "Travailler l'alignement du buste : plonger vers l'avant lors de l'attaque.",
            "Automatiser le rythme de 3 pas sur les hauteurs officielles.",
            "Exercices de pliométrie : enchaînements de bonds horizontaux et franchissements.",
            "Travailler la 'reprise de course' immédiate après la dernière haie (le cassé final).",
            "Analyse de la trajectoire : le centre de gravité doit rester le plus stable possible.",
            "Gestion des départs en starting-blocks avec la première haie très proche.",
            "Analyse vidéo : identifier les temps de freinage à la réception.",
            "Simulation de compétition (séries et finales)."
        ],
        elite: [
            "Stabilisation de la vitesse maximale entre les haies (cycle de jambes rapide).",
            "Travail spécifique sur la jambe d'esquive : retour rapide vers l'avant pour la reprise d'appui.",
            "Optimisation de la force explosive au départ (sortir des blocs).",
            "Travail de 'survitesse' sur des haies plus basses pour augmenter la fréquence.",
            "Gestion de la fatigue : maintenir la technique sur la fin de course (résistance).",
            "Travail de concentration : focalisation sur le rythme interne ('un-deux-TROIS-saute').",
            "Analyse biomécanique : angle d'attaque et de réception.",
            "Coaching : analyse des performances des adversaires.",
            "Séance de fraîcheur et réglages mentaux avant le test bilan."
        ]
    },
    'Course de relais': {
        commun: {
            S1: "Test d'observation - Diagnostic : Test sur 2x30m. Diagnostic : Le receveur attend-il à l'arrêt ? Le donneur ralentit-il avant de donner ? Y a-t-il une chute du témoin ?",
            S2: "Règlement spécifique : La zone de transmission (souvent située entre le 20ème et le 40ème mètre sur les 60m totaux). Notion de 'donneur' (vitesse de maintien) et 'receveur' (accélération).",
            S12: "Test bilan - Compétition 'Duo-Sprint' : Mesure de la performance chronométrée. Note sur le gain de temps par rapport à la somme des temps individuels (l'efficacité du gain au passage)."
        },
        debutant: [
            "Tenue du témoin en pleine course (bras équilibrés) et transmission à l'arrêt.",
            "Apprendre la transmission 'visuelle' : le receveur regarde le donneur et prend le témoin en trottinant.",
            "Coordination des couloirs : le donneur court à l'intérieur du couloir, le receveur à l'extérieur pour éviter le choc.",
            "Travailler l'appel sonore : le donneur crie 'HOP' pour prévenir le partenaire.",
            "Initiation au départ du 1er relayeur : départ sans blocs mais avec témoin.",
            "Exercices de réaction : partir au signal visuel du partenaire qui franchit une ligne.",
            "Rôle de juge : vérifier si le témoin est bien donné à l'intérieur des 20m de la zone centrale.",
            "Enchaînement complet à 80% de la vitesse.",
            "Pré-test : stabiliser un passage sans chute sur 60m."
        ],
        moyen: [
            "Apprendre à ne plus regarder derrière (transmission non-visuelle) : faire confiance au signal du partenaire.",
            "Mise en place d'une marque (repère au sol) à environ 5-6 mètres derrière le receveur.",
            "Travailler l'accélération du receveur : il doit 'fuir' son partenaire pour recevoir le témoin lancé.",
            "Technique 'par le bas' : le receveur tend la main en arrière, paume vers le bas, formant un V.",
            "Optimisation de la course du 1er relayeur (30m de sprint pur).",
            "Travail de synchronisation : le donneur doit tendre le bras au maximum pour 'gagner' de la distance.",
            "Arbitrage : mesurer précisément si la transmission a eu lieu dans les limites.",
            "Séries de 2x30m à vitesse maximale avec récupération complète.",
            "Séance de réglage des marques (avancer ou reculer la marque de départ du receveur)."
        ],
        avance: [
            "Spécialisation des mains : Donneur (Main Droite) -> Receveur (Main Gauche) pour éviter de changer le témoin de main.",
            "Travail du départ en starting-blocks pour le 1er coureur (avec témoin).",
            "Analyse de la 'zone de transmission optimale' : le passage doit se faire dans les 5 derniers mètres de la zone.",
            "Exercices de survitesse : le donneur arrive lancé à 100%, le receveur doit s'adapter.",
            "Travail de l'appui au sol : rester sur l'avant-pied pendant toute la durée du sprint.",
            "Stratégie de binôme : qui est le meilleur au départ ? Qui est le meilleur finisseur ?",
            "Analyse vidéo (si possible) : mesurer le temps mort (le moment où personne ne tient le témoin).",
            "Simulation de 'demi-finale' avec opposition latérale (couloirs occupés).",
            "Répétition mentale et physique des 3 dernières foulées avant le passage."
        ],
        elite: [
            "Stabilisation des marques au centimètre près selon la forme du jour.",
            "Travail du 'bras tendu' : le passage se fait à distance maximale entre les deux corps (bras du donneur + bras du receveur).",
            "Optimisation de la transmission 'par le haut' (plus rapide mais plus risquée).",
            "Travail de puissance : départs explosifs sur 10m pour le receveur.",
            "Analyse du 'cycle de jambes' : maintenir une fréquence élevée pendant la transmission.",
            "Gestion du vent : ajuster la marque de départ selon que le vent est de face ou de dos.",
            "Coaching : le binôme analyse ses propres erreurs de synchronisation.",
            "Séance de 'Full Speed' : 3 passages à 100% avec 10 minutes de repos.",
            "Mise en confiance : visualisation de la réussite du passage."
        ]
    },
    'Course de durée': {
        commun: {
            S1: "Test d'observation - Situation de référence : Course de 1000m (garçons) / 600m (filles) pour mesurer le temps de base et observer la gestion spontanée de l'effort.",
            S2: "Test Navette (Luc Léger) pour déterminer la VMA et constituer les groupes physiologiques. Partie théorique : analyse des résultats, explication des zones d'entraînement (Capacité vs Puissance) et remise des fiches de suivi.",
            S3: "Partie Pratique (La Posture) : Travail technique sur la 'foulée économique' (regard à l'horizon, buste droit, relâchement des épaules, mouvement des bras en piston, attaque médio-pied). Exercices de gammes (montées de genoux, talons-fesses) axés sur le placement.",
            S12: "Test bilan - Évaluation finale : Course de 1000m (garçons) / 600m (filles) pour mesurer le temps de passage et observer la gestion de l'effort."
        },
        debutant: [
            "S4 (Capacité Aérobie) : 10 min de course continue en aisance respiratoire (pouvoir parler en courant).",
            "S5 (Capacité Aérobie) : 12 min de course continue en aisance respiratoire.",
            "S6 (Capacité Aérobie) : 15 min de course continue en aisance respiratoire.",
            "S7 (Capacité Aérobie) : Alterner 4 min course / 1 min marche (3 séries) en aisance respiratoire.",
            "S8 (Puissance Aérobie) : Initiation au fractionné très doux : 45s course rapide / 45s marche (2 séries de 5).",
            "S9 (Puissance Aérobie) : Travail de vitesse sur 100m pour dynamiser la foulée.",
            "S10 (Puissance Aérobie) : Travail de vitesse sur 100m pour dynamiser la foulée.",
            "S11 (Puissance Aérobie) : Test sur 500m (G) / 300m (F) pour valider l'allure cible de la S12.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ],
        moyen: [
            "S4 (Capacité Aérobie) : 15 min à 75% VMA.",
            "S5 (Capacité Aérobie) : 2 x 8 min à 80% VMA (repos 2 min).",
            "S6 (Capacité Aérobie) : Travail de régularité avec passage aux plots à intervalles réguliers (allure métronome).",
            "S7 (Capacité Aérobie) : Travail de régularité avec passage aux plots à intervalles réguliers (allure métronome).",
            "S8 (Puissance Aérobie) : Séance de 30s/30s à 100% VMA (2 séries de 8 répétitions).",
            "S9 (Puissance Aérobie) : Séance de 30s/30s à 100% VMA (2 séries de 8 répétitions).",
            "S10 (Puissance Aérobie) : Intervalles de 200m à 100% VMA (récupération égale au temps de course).",
            "S11 (Puissance Aérobie) : Simulation de course sur 800m (G) / 500m (F) à l'allure du test bilan.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ],
        avance: [
            "S4 (Capacité Aérobie) : 20 min en variation d'allure (allure 1, 2, 3).",
            "S5 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S6 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S7 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S8 (Puissance Aérobie) : Séance de 45s/30s à 105% VMA.",
            "S9 (Puissance Aérobie) : Répétitions de 400m à 100% VMA (repos 1min30). Focus sur l'efficacité des bras dans le dernier virage.",
            "S10 (Puissance Aérobie) : Répétitions de 400m à 100% VMA (repos 1min30). Focus sur l'efficacité des bras dans le dernier virage.",
            "S11 (Puissance Aérobie) : Travail spécifique sur le 'Sprint final' : 600m à allure test + 200m accélération maximale.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ],
        elite: [
            "S4 (Capacité Aérobie) : Travail au seuil 2 x 10 min à 90% VMA.",
            "S5 (Capacité Aérobie) : Travail au seuil 2 x 10 min à 90% VMA.",
            "S6 (Capacité Aérobie) : Pyramide de capacité (400m - 800m - 1200m - 800m - 400m) à 90% VMA.",
            "S7 (Capacité Aérobie) : Pyramide de capacité (400m - 800m - 1200m - 800m - 400m) à 90% VMA.",
            "S8 (Puissance Aérobie) : Fractionné court intense : 200m à 110% VMA avec récupération très courte (45s).",
            "S9 (Puissance Aérobie) : Fractionné court intense : 200m à 110% VMA avec récupération très courte (45s).",
            "S10 (Puissance Aérobie) : Séance spécifique : 3 x 600m à 105% VMA (récupération complète).",
            "S11 (Puissance Aérobie) : Préparation mentale et tactique : simulation de départ rapide et gestion des dépassements.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ]
    },
'Gymnastique': {
        commun: {
            S1: "Test d'observation - Présentation de l'enchaînement de référence : Présenter l'enchaînement de référence pour évaluer la capacité de mémorisation, la sécurité et le niveau technique de départ.",
            S2: "Analyse du barème de notation (Difficulté, Exécution, Composition). Apprentissage de la terminologie des éléments A, B, C, D, E. Règles de sécurité.",
            S12: "Test bilan - Présentation finale : Présentation finale de l'enchaînement devant le groupe classe. Évaluation sommative basée sur la réussite des éléments et la tenue corporelle."
        },
        '1AC': [
            "Maîtriser les éléments de famille A : Roulade avant groupée et Planche (équilibre).",
            "Consolider la Roulade arrière (A) et la Chandelle (A).",
            "S'initier aux éléments de famille B : L'ATR (Appui Tendu Renversé) avec aide.",
            "Apprendre la Roue (B) : alignement des segments et passage par la verticale.",
            "Travailler les sauts de liaison (Saut groupé ou extension).",
            "Travail spécifique sur la fixité des positions (maintenir 3 secondes).",
            "Montage de l'enchaînement : organiser les 3A et 2B de manière fluide.",
            "Répétition avec juge-élève : identifier les fautes de jambes pliées.",
            "Séance de perfectionnement : travail sur l'entrée et la sortie du tapis."
        ],
        '2AC': [
            "Révision des éléments A et B acquis en 1AC.",
            "S'initier à l'élément de famille C : La Roulade arrière jambes tendues ou l'ATR-Roulade.",
            "Perfectionner la Roue (B) et l'ATR libre (B).",
            "Travailler la souplesse (C) : Le Pont ou la fente basse marquée.",
            "Apprendre à lier un élément A avec un élément C sans arrêt marqué.",
            "Travail de gainage pour améliorer l'exécution des éléments de renversement.",
            "Montage de l'enchaînement incluant l'élément C comme point d'orgue.",
            "Auto-évaluation : vidéo ou observation par les pairs sur l'élément C.",
            "Répétition générale : focus sur l'amplitude des mouvements."
        ],
        '3AC': [
            "Stabiliser les éléments B (Roue, ATR, Sissonne, Saut de chat).",
            "Travailler l'élément C choisi (ex: Souplesse arrière ou Roulade plongée).",
            "Améliorer la qualité des 2 éléments A pour qu'ils soient parfaits (Bonus d'exécution).",
            "Apprendre la Rondade (B/C selon technique) : impulsion et réception deux pieds.",
            "Travailler les liaisons acrobatiques : enchaîner deux éléments B.",
            "Développement de l'expression : regard et port de tête pendant l'enchaînement.",
            "Montage de l'enchaînement (2A, 4B, 1C) : équilibrer les familles d'activités.",
            "Co-jugement : évaluation de la difficulté réelle par rapport au projet.",
            "Séance de nettoyage : éliminer les petits pas de déséquilibre à la réception."
        ],
        'TC': [
            "Réviser les fondamentaux et valider les éléments B (ATR, Roue, Rondade).",
            "Travailler les deux éléments C : Souplesse avant/arrière et ATR-Roulade.",
            "Maîtriser le saut de mains (C) avec parade sécurisée.",
            "Travailler la force (C) : Équerre ou maintien de l'équilibre sur une main avec appui.",
            "Optimiser les 2 éléments A : les utiliser comme transitions esthétiques.",
            "Travail sur le rythme : alternance de phases lentes (souplesse) et rapides (acrobatie).",
            "Montage du projet (2A, 3B, 2C) sur la diagonale du tapis.",
            "Arbitrage expert : calcul de la note de difficulté (D) selon le quota.",
            "Répétition finale : gestion du stress et présentation au public."
        ],
        '1AB': [
            "Valider rapidement les éléments B et se concentrer sur les éléments C.",
            "S'initier aux éléments de famille D : Le Saut de mains (renversement dynamique).",
            "Travailler la Rondade-Saut extension (D) ou la Souplesse avant/arrière (C).",
            "Maîtriser la planche ou l'équilibre en force (C).",
            "Travailler la verticalité : l'ATR doit être parfaitement rectiligne.",
            "Enchaîner des combinaisons complexes (C + B ou C + C).",
            "Montage de l'enchaînement (2B, 3C, 2D) : recherche de la difficulté maximale.",
            "Analyse critique : vidéo-analyse des angles d'ouverture d'épaules.",
            "Mise en condition de concours : passage devant un jury d'élèves."
        ],
        '2AB': [
            "Maîtriser les éléments C comme base de travail (Lune, Souplesses).",
            "Travailler les éléments de famille D : Saut de mains, Rondade-Flic, ou Roue sans les mains.",
            "S'initier ou perfectionner les éléments de famille E : Salto arrière/avant ou Flip-flap.",
            "Travail de l'explosivité : maximiser la hauteur des envols.",
            "Stabiliser les réceptions pilées : aucune tolérance pour les déséquilibres.",
            "Travail chorégraphique : l'enchaînement doit être une prestation artistique.",
            "Finalisation de l'enchaînement (2C, 3D, 2E) : optimisation du barème.",
            "Jugement de haut niveau : déductions au dixième de point.",
            "Répétition générale : focus sur la concentration et la maîtrise de soi."
        ],
        debutant: null,
        moyen: null,
        avance: null,
        elite: null
    }
};

// ============================================================================
// FONCTIONS HELPERS POUR OBJECTIFS_CYCLE
// ============================================================================

const getObjectifSeance = (aps, niveau, numeroSeance, nombreTotalSeances) => {
    nombreTotalSeances = nombreTotalSeances || 10;
    const cycle = OBJECTIFS_CYCLE[aps];
    if (!cycle) return null;
    
    if (numeroSeance === 1) return cycle.commun.S1;
    if (numeroSeance === 2) return cycle.commun.S2;
    if (numeroSeance === nombreTotalSeances) return cycle.commun.S12;
    
    var seances = cycle[niveau];
    if (!seances) {
        seances = cycle.debutant || cycle['1AC'];
    }
    if (!seances) return null;
    
    var indexApprentissage = numeroSeance - 3;
    if (indexApprentissage >= 0 && indexApprentissage < seances.length) {
        return seances[indexApprentissage];
    }
    return seances[seances.length - 1];
};

const buildProjetCycle = (aps, niveau, nombreSeances) => {
    nombreSeances = nombreSeances || 10;
    const cycle = OBJECTIFS_CYCLE[aps];
    if (!cycle) return null;
    
    const projet = [];
    var seances = cycle[niveau];
    if (!seances) {
        seances = cycle.debutant || cycle['1AC'];
    }
    if (!seances) return null;
    
    for (var i = 1; i <= nombreSeances; i++) {
        var phase, objectif;
        
        if (i === 1) {
            phase = 'Évaluation diagnostique';
            objectif = cycle.commun.S1;
        } else if (i === 2) {
            phase = 'Théorie / Règlement';
            objectif = cycle.commun.S2;
        } else if (i === nombreSeances) {
            phase = 'Évaluation terminale';
            objectif = cycle.commun.S12;
        } else {
            var indexMax = seances.length;
            var seancesDisponibles = nombreSeances - 3;
            var indexApprentissage = Math.floor((i - 3) * indexMax / seancesDisponibles);
            var indexFinal = Math.min(indexApprentissage, indexMax - 1);
            
            if (i <= 4) phase = 'Découverte';
            else if (i <= nombreSeances - 3) phase = 'Apprentissage';
            else phase = 'Consolidation';
            
            objectif = seances[indexFinal];
        }
        
        projet.push({ seance: i, phase: phase, objectif: objectif });
    }
    
    return projet;
};

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    OTI,
    OTC,
    VOCABULAIRE_APS,
    getSituationReference,
    getGroupeAPS,
    CRITERES_OBS,
    FALLBACKS,
    SCHEMAS,
    getSchema,
    OBJECTIFS_CYCLE,
    getObjectifSeance,
    buildProjetCycle
};
