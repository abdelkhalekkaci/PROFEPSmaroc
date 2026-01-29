// ==================== DONNÉES PARTAGÉES EPS ====================
// Références officielles OP 2007 (Lycée) et OP 2009 (Collège)

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
    'Course de vitesse': {
        '1AC': "Réagir rapidement au signal de départ et maintenir sa vitesse maximale sur une distance courte (40-60m), en courant dans son couloir.",
        '2AC': "Améliorer sa technique de course (fréquence et amplitude des foulées) pour optimiser sa vitesse sur 60-80m, avec un départ réactif.",
        '3AC': "Gérer sa course du départ à l'arrivée en optimisant l'accélération, le maintien de la vitesse maximale et la finition.",
        'TC': "Maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.",
        '1AB': "Analyser et améliorer ses points faibles techniques et physiques pour progresser vers sa performance optimale.",
        '2AB': "Atteindre son potentiel maximal par une préparation et une exécution optimales, en gérant le stress de la compétition."
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

const getSituationReference = (aps, isCollege) => {
    const situations = {
          'Handball': 'Match 7 contre 7 sur terrain réglementaire (40x20m) avec application des règles officielles et arbitrage',
            'Football': 'Match 5 contre 5 sur terrain réduit (40x20m) avec 2 buts et application des règles simplifiées',
            'Basketball': 'Match 5 contre 5 sur un terrain de basketball, application des règles officielles et arbitrage',
            'Volleyball': 'Match 6 contre 6 sur terrain réglementaire (9x18m) avec filet à hauteur adaptée et rotation',
            'Tennis de table': 'Match en simple au meilleur des 3 sets de 11 points avec application des règles officielles',
            'Badminton': 'Match en simple au meilleur des 3 sets de 21 points avec application des règles officielles',
            'Course de vitesse': isCollege ? 'Course chronométrée sur 80 mètres sur une piste avec départ au signal' : 'Course chronométrée sur 80 mètres Garcons et 60 métres filles sur une piste avec départ au signal',
            'Saut en longueur': 'Concours de 3 essais mesurés avec course d\'élan libre, la meilleure performance est retenue',
            'Saut en hauteur': 'Concours à barres montantes avec 3 essais maximum par hauteur, technique libre',
            'Lancer de poids': 'Concours de 3 essais mesurés depuis le plateau de lancer, la meilleure performance est retenue',
            'Course de durée': 'courir une distance de 1000m garçons et 600 fille en régulant son allure, le temps est chronométré'             
           'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés du niveau'
        };
    return situations[aps] || 'Situation adaptée au niveau';
};

const VOCABULAIRE_APS = {
    'Handball': 'passe à terre, passe en cloche, passe à rebond, réception à deux mains, dribble, tir en appui, tir en suspension, feinte de tir, feinte de passe, démarquage, appel de balle, pivot, ailier, arrière, demi-centre, gardien, zone des 6 mètres, 9 mètres, contre-attaque, repli défensif',
    'Football': 'conduite de balle, contrôle orienté, contrôle amorti, passe courte intérieur du pied, passe longue, tir, dribble, tacle, marquage, démarquage, appel en profondeur, remise, une-deux',
    'Basketball': 'dribble de progression, dribble de protection, passe à terre, passe à une main, tir en course lay-up, tir en suspension, rebond, écran, pick and roll, démarquage, pivot',
    'Volleyball': 'manchette bras tendus, touche haute, service cuillère, service tennis, attaque smash, bloc, réception, passe, passeur, attaquant, rotation',
    'Course de vitesse': 'position de départ, réaction au signal, mise en action, accélération, fréquence, amplitude, maintien de vitesse, finish',
    'Course de durée': 'allure régulière, gestion de l\'effort, fréquence cardiaque, endurance, récupération, foulée économique, respiration',
    'Saut en longueur': 'course d\'élan, marques, planche d\'appel, impulsion, phase d\'envol, réception, fosse',
    'Saut en hauteur': 'course d\'élan courbe, pied d\'appel extérieur, impulsion, rotation dorsale, franchissement fosbury-flop, réception',
    'Lancer de poids': 'position de départ dos à l\'aire, tenue au cou, translation, poussée, extension du bras, équilibre final',
    'Gymnastique': 'roulade avant, roulade arrière, ATR, roue, pont, souplesse, équilibre, saut, liaison, amplitude, tenue du corps',
    'Tennis de table': 'coup droit, revers, service court, service long, effet, placement, déplacement latéral',
    'Badminton': 'dégagé, amorti, smash, drive, service court, service long, replacement'
};

const getGroupeAPS = (aps) => {
    if (['Handball', 'Football', 'Basketball'].includes(aps)) return 'Sports marquage et démarquage';
    if (['Tennis de table', 'Badminton', 'Volleyball'].includes(aps)) return 'Sports de renvoi';
    if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    return 'Activité';
};

const CRITERES_OBS = {
    'Saut en longueur': { criteres: [{ nom: 'Course élan', sous: ['Accélérée', 'Irrégulière'] }, { nom: 'Impulsion', sous: ['Active', 'Passive'] }, { nom: 'Envol', sous: ['Équilibré', 'Déséquilibré'] }, { nom: 'Réception', sous: ['Stable', 'Chute'] }] },
    'Saut en hauteur': { criteres: [{ nom: 'Course courbe', sous: ['Correcte', 'Droite'] }, { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] }, { nom: 'Franchissement', sous: ['Dorsal', 'Autre'] }, { nom: 'Réception', sous: ['Dos', 'Danger'] }] },
    'Course de vitesse': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Accélération', sous: ['Progressive', 'Brutale'] }, { nom: 'Maintien', sous: ['Stable', 'Décélère'] }, { nom: 'Finish', sous: ['Engagé', 'Relâché'] }] },
    'Lancer de poids': { criteres: [{ nom: 'Position', sous: ['Dos aire', 'Face'] }, { nom: 'Tenue', sous: ['Au cou', 'Éloigné'] }, { nom: 'Poussée', sous: ['Complète', 'Partielle'] }, { nom: 'Équilibre', sous: ['Stable', 'Chute'] }] },
    'Course de durée': { criteres: [{ nom: 'Régularité', sous: ['Constante', 'Variable'] }, { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] }, { nom: 'Posture', sous: ['Correcte', 'Effondrée'] }, { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }] },
    'Handball': { criteres: [{ nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Réception', sous: ['Assurée', 'Manquée'] }, { nom: 'Tir', sous: ['Cadré', 'Hors cadre'] }, { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }] },
    'Football': { criteres: [{ nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Contrôle', sous: ['Orienté', 'Subi'] }, { nom: 'Placement', sous: ['Pertinent', 'Inadapté'] }] },
    'Basketball': { criteres: [{ nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] }, { nom: 'Passe', sous: ['Précise', 'Interceptée'] }, { nom: 'Tir', sous: ['Équilibré', 'Déséquilibré'] }, { nom: 'Démarquage', sous: ['Actif', 'Statique'] }] },
    'Volleyball': { criteres: [{ nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] }, { nom: 'Touche', sous: ['Haute', 'Basse'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Déplacement', sous: ['Anticipé', 'Retard'] }] },
    'Gymnastique': { criteres: [{ nom: 'Amplitude', sous: ['Suffisante', 'Insuffisante'] }, { nom: 'Tenue', sous: ['Gainé', 'Relâché'] }, { nom: 'Liaisons', sous: ['Fluides', 'Arrêts'] }, { nom: 'Réception', sous: ['Stabilisée', 'Déséquilibrée'] }] },
    'Tennis de table': { criteres: [{ nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Service', sous: ['Varié', 'Prévisible'] }, { nom: 'Déplacement', sous: ['Équilibré', 'Instable'] }] },
    'Badminton': { criteres: [{ nom: 'Dégagé', sous: ['Fond', 'Court'] }, { nom: 'Amorti', sous: ['Près filet', 'Long'] }, { nom: 'Service', sous: ['Réglementaire', 'Faute'] }, { nom: 'Replacement', sous: ['Centre', 'Excentré'] }] }
};

module.exports = { OTI, OTC, getSituationReference, VOCABULAIRE_APS, getGroupeAPS, CRITERES_OBS };
