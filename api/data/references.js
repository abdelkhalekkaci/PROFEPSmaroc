// ============================================================================
// RÉFÉRENCES PARTAGÉES - /api/data/references.js
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
    'Handball': { '1AC': "Conserver collectivement la balle et participer activement au jeu pour progresser vers la cible adverse et marquer en situation de jeu réduit, tout en respectant les règles fondamentales.", '2AC': "Faire progresser la balle vers la cible par des déplacements variés et des passes adaptées, en s'inscrivant dans une organisation collective simple.", '3AC': "S'inscrire dans un projet collectif basé sur l'alternance rapide attaquant/défenseur, en utilisant des combinaisons simples et en exploitant les espaces libres.", 'TC': "Utiliser des moyens techniques et tactiques adaptés pour créer des situations favorables au tir, en s'organisant collectivement.", '1AB': "Mettre en œuvre des choix tactiques collectifs pertinents avec vitesse d'exécution adaptée, en coordonnant les actions individuelles.", '2AB': "Élaborer une stratégie collective basée sur la maîtrise des rôles et l'occupation rationnelle de l'espace." },
    'Football': { '1AC': "Conserver le ballon individuellement et collectivement pour progresser vers le but adverse, en utilisant des conduites de balle et des passes simples.", '2AC': "Faire progresser le ballon par des conduites maîtrisées et des passes précises vers des partenaires démarqués.", '3AC': "Participer à un projet de jeu collectif intégrant les transitions attaque-défense, en occupant rationnellement l'espace.", 'TC': "Organiser le jeu collectif en utilisant les fondamentaux techniques au service de la progression vers le but.", '1AB': "S'adapter aux configurations de jeu pour optimiser les choix tactiques individuels et collectifs.", '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force." },
    'Basketball': { '1AC': "Conserver la balle et progresser vers la cible en utilisant le dribble et la passe, tout en respectant les règles.", '2AC': "Créer et exploiter des situations favorables au tir par le démarquage et la circulation de balle.", '3AC': "S'inscrire dans une organisation collective offensive et défensive équilibrée.", 'TC': "Optimiser la circulation de balle pour créer le déséquilibre défensif.", '1AB': "Analyser le rapport de force et adapter ses choix tactiques en fonction des réactions adverses.", '2AB': "Mettre en œuvre des systèmes de jeu élaborés en attaque et en défense." },
    'Volleyball': { '1AC': "Se déplacer et se placer correctement pour renvoyer la balle dans le camp adverse, en utilisant la manchette et la touche haute.", '2AC': "Construire l'attaque par un renvoi indirect utilisant un relais, en s'organisant pour la réception-passe-attaque.", '3AC': "Organiser la défense et orienter la construction offensive vers la zone avant.", 'TC': "S'organiser collectivement dans la limite des trois touches réglementaires.", '1AB': "Optimiser la construction du point avec des rôles différenciés.", '2AB': "Mettre en place une organisation collective avec combinaisons offensives variées." },
    'Course de vitesse': { '1AC': "Réagir rapidement au signal de départ et maintenir sa vitesse maximale sur une distance courte (40-60m).", '2AC': "Améliorer sa technique de course (fréquence et amplitude) pour optimiser sa vitesse sur 60-80m.", '3AC': "Gérer sa course du départ à l'arrivée en optimisant l'accélération et le maintien de vitesse.", 'TC': "Maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.", '1AB': "Analyser et améliorer ses points faibles techniques et physiques.", '2AB': "Atteindre son potentiel maximal par une préparation et une exécution optimales." },
    'Saut en longueur': { '1AC': "Réaliser une course d'élan progressivement accélérée suivie d'une impulsion et une réception équilibrée.", '2AC': "Enchaîner une course d'élan régulière, une impulsion active et un saut avec attitude aérienne simple.", '3AC': "Optimiser sa course d'élan étalonnée pour faire coïncider vitesse maximale et planche d'appel.", 'TC': "Maîtriser l'organisation de sa course d'élan et la qualité de son impulsion.", '1AB': "Augmenter l'efficacité du saut par la maîtrise de la liaison course-impulsion.", '2AB': "Optimiser sa performance en coordonnant les trois phases du saut." },
    'Saut en hauteur': { '1AC': "Franchir une barre en utilisant une course d'élan et une impulsion vers le haut.", '2AC': "Réaliser un franchissement dorsal (fosbury-flop) avec course d'élan courbe adaptée.", '3AC': "Optimiser son franchissement par une meilleure coordination course courbe-impulsion-rotation.", 'TC': "Maîtriser la technique du fosbury-flop avec course d'élan courbe efficace.", '1AB': "Améliorer sa performance par l'optimisation de chaque phase technique.", '2AB': "Réaliser une performance optimale en gérant les paramètres de la compétition." },
    'Course de durée': { '1AC': "Courir de façon régulière sur une durée donnée (8-10 min) en gérant son effort.", '2AC': "Adapter son allure de course pour maintenir un effort prolongé (10-12 min).", '3AC': "Construire et respecter un projet de course en fonction de ses capacités (12-15 min).", 'TC': "Planifier et réaliser une performance en gérant efficacement ses ressources énergétiques.", '1AB': "Optimiser sa performance par une gestion stratégique de l'allure.", '2AB': "Atteindre ses objectifs personnels par une stratégie de course adaptée." },
    'Lancer de poids': { '1AC': "Lancer un engin en utilisant une poussée du bras depuis l'épaule, dans le respect des règles.", '2AC': "Coordonner la poussée des jambes et l'action du bras lanceur pour améliorer la distance.", '3AC': "Enchaîner les actions motrices du lancer en respectant la technique.", 'TC': "Réaliser un lancer en maîtrisant la coordination des segments corporels.", '1AB': "Améliorer sa performance par le perfectionnement technique.", '2AB': "Optimiser sa performance par une maîtrise complète de la chaîne de lancer." },
    'Gymnastique': { '1AC': "Réaliser un enchaînement simple au sol comprenant des éléments gymniques de base.", '2AC': "Présenter un enchaînement gymnique varié avec des liaisons fluides.", '3AC': "Concevoir et réaliser un enchaînement individuel au sol avec originalité.", 'TC': "Présenter un enchaînement gymnique au sol avec maîtrise technique.", '1AB': "Composer et réaliser un enchaînement avec continuité et expression personnelle.", '2AB': "Concevoir, réaliser et évaluer un enchaînement gymnique avec expertise." },
    'Tennis de table': { '1AC': "Maintenir un échange en renvoyant la balle sur la table adverse, en utilisant coup droit et revers.", '2AC': "Diriger la balle dans différentes zones de la table pour mettre l'adversaire en difficulté.", '3AC': "Varier les trajectoires, les vitesses et les effets pour prendre l'initiative du point.", 'TC': "Construire le point en utilisant des variations de placement, vitesse et effet.", '1AB': "Élaborer des stratégies de jeu adaptées aux caractéristiques de l'adversaire.", '2AB': "Mettre en œuvre un projet de jeu personnel et l'adapter en cours de match." },
    'Badminton': { '1AC': "Renvoyer le volant dans le terrain adverse en utilisant les frappes de base.", '2AC': "Varier la longueur et la direction de ses frappes pour déplacer l'adversaire.", '3AC': "Alterner jeu long et jeu court pour créer des espaces libres.", 'TC': "Construire le point en exploitant les espaces libres du terrain adverse.", '1AB': "Élaborer des séquences de jeu tactiquement cohérentes.", '2AB': "Concevoir et appliquer une stratégie de jeu personnelle adaptée à l'adversaire." }
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

const getSituationReference = (aps, isCollege) => {
    const situations = { 'Handball': 'Match 7 contre 7 sur terrain réglementaire (40m x 20m) avec application des règles officielles et arbitrage par les élèves', 'Football': 'Match 7 contre 7 sur terrain réduit (50m x 30m) avec 2 buts et application des règles simplifiées', 'Basketball': 'Match 5 contre 5 sur demi-terrain avec panier et application des règles officielles', 'Volleyball': 'Match 6 contre 6 sur terrain réglementaire (9m x 18m) avec filet à hauteur adaptée et rotation', 'Tennis de table': 'Match en simple au meilleur des 3 sets de 11 points avec application des règles officielles', 'Badminton': 'Match en simple au meilleur des 3 sets de 21 points avec application des règles officielles', 'Course de vitesse': isCollege ? 'Course chronométrée sur 60 mètres en couloir individuel avec départ au signal' : 'Course chronométrée sur 80 mètres en couloir individuel avec départ au signal', 'Saut en longueur': 'Concours de 3 essais mesurés avec course d\'élan libre, la meilleure performance est retenue', 'Saut en hauteur': 'Concours à barres montantes avec 3 essais maximum par hauteur, technique fosbury-flop', 'Lancer de poids': 'Concours de 3 essais mesurés depuis le plateau de lancer, la meilleure performance est retenue', 'Course de durée': 'Course de 12 minutes en régulant son allure pour parcourir la plus grande distance', 'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés' };
    return situations[aps] || 'Situation adaptée au niveau des élèves';
};

const getGroupeAPS = (aps) => { if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) return 'Sports collectifs'; if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sports de renvoi'; if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) return 'Athlétisme'; if (aps === 'Gymnastique') return 'Gymnastique'; return 'Activité physique'; };

const CRITERES_OBS = {
    'Handball': { criteres: [{ nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Réception', sous: ['Assurée', 'Manquée'] }, { nom: 'Tir', sous: ['Cadré', 'Hors'] }, { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }] },
    'Football': { criteres: [{ nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Contrôle', sous: ['Orienté', 'Subi'] }, { nom: 'Placement', sous: ['Pertinent', 'Inadapté'] }] },
    'Basketball': { criteres: [{ nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] }, { nom: 'Passe', sous: ['Précise', 'Interceptée'] }, { nom: 'Tir', sous: ['Équilibré', 'Déséquil.'] }, { nom: 'Démarquage', sous: ['Actif', 'Statique'] }] },
    'Volleyball': { criteres: [{ nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] }, { nom: 'Touche', sous: ['Haute', 'Basse'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Placement', sous: ['Anticipé', 'Retard'] }] },
    'Course de vitesse': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Accélération', sous: ['Progress.', 'Brutale'] }, { nom: 'Maintien', sous: ['Stable', 'Décélère'] }, { nom: 'Finish', sous: ['Engagé', 'Relâché'] }] },
    'Saut en longueur': { criteres: [{ nom: 'Course', sous: ['Accélérée', 'Irrégulière'] }, { nom: 'Impulsion', sous: ['Active', 'Passive'] }, { nom: 'Envol', sous: ['Équilibré', 'Déséquil.'] }, { nom: 'Réception', sous: ['Stable', 'Chute'] }] },
    'Saut en hauteur': { criteres: [{ nom: 'Course', sous: ['Courbe', 'Droite'] }, { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] }, { nom: 'Franchis.', sous: ['Dorsal', 'Autre'] }, { nom: 'Réception', sous: ['Dos', 'Danger'] }] },
    'Course de durée': { criteres: [{ nom: 'Régularité', sous: ['Constante', 'Variable'] }, { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] }, { nom: 'Posture', sous: ['Correcte', 'Effondrée'] }, { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }] },
    'Lancer de poids': { criteres: [{ nom: 'Position', sous: ['Dos aire', 'Face'] }, { nom: 'Tenue', sous: ['Au cou', 'Éloigné'] }, { nom: 'Poussée', sous: ['Complète', 'Partielle'] }, { nom: 'Équilibre', sous: ['Stable', 'Chute'] }] },
    'Gymnastique': { criteres: [{ nom: 'Amplitude', sous: ['Suffisante', 'Insuffis.'] }, { nom: 'Tenue', sous: ['Gainé', 'Relâché'] }, { nom: 'Liaisons', sous: ['Fluides', 'Arrêts'] }, { nom: 'Réception', sous: ['Stabilisée', 'Déséquil.'] }] },
    'Tennis de table': { criteres: [{ nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Service', sous: ['Varié', 'Prévisible'] }, { nom: 'Placement', sous: ['Équilibré', 'Instable'] }] },
    'Badminton': { criteres: [{ nom: 'Dégagé', sous: ['Fond', 'Court'] }, { nom: 'Amorti', sous: ['Près filet', 'Long'] }, { nom: 'Service', sous: ['Réglem.', 'Faute'] }, { nom: 'Replacement', sous: ['Centre', 'Excentré'] }] }
};

// ============================================================================
// OBJECTIFS_CYCLE - À COPIER DANS /api/data/references.js
// Structure: OBJECTIFS_CYCLE[aps].commun + OBJECTIFS_CYCLE[aps][niveau]
// Niveaux: debutant, moyen, avance, elite (+ niveaux scolaires pour Gymnastique)
// ============================================================================

const OBJECTIFS_CYCLE = {
    'Football': {
        commun: {
            S1: "Évaluer le niveau initial des élèves (capacités motrices, techniques et tactiques) afin de diagnostiquer les besoins et constituer des groupes de niveau.",
            S2: "Maîtriser les lois du jeu (FIFA adaptées au milieu scolaire), comprendre les principes de l'occupation de l'espace (bloc équipe) et les valeurs du fair-play.",
            S12: "Évaluer le degré d'atteinte des objectifs du cycle, mesurer la progression technique et tactique et valider les acquis en situation de match."
        },
        debutant: [
            "Maîtriser la conduite de balle en variant les surfaces de contact (intérieur/coup de pied) sans perdre le contrôle.",
            "Apprendre à réaliser une passe courte précise à l'intérieur du pied vers un partenaire immobile.",
            "S'initier au contrôle de balle (amorti) pour enchaîner rapidement une action de jeu.",
            "Comprendre le principe du \"dégrappage\" : s'écarter du porteur de balle pour occuper le terrain.",
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
            "Apprendre les principes du \"Une-Deux\" et des combinaisons à trois pour percer une défense.",
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
            "Maîtriser le \"bloc bas\" et le \"bloc haut\" selon les phases du match.",
            "Développer l'intelligence de jeu : lecture des trajectoires d'interception et anticipation.",
            "Gestion du rythme : alterner entre jeu de possession lent et accélérations verticales.",
            "Simulation de situations de crise (jouer en infériorité numérique ou score à remonter).",
            "Analyse vidéo ou théorique avancée sur les systèmes de jeu modernes.",
            "Match de haute intensité avec focus sur le leadership et la communication sur le terrain."
        ]
    },

    'Volleyball': {
        commun: {
            S1: "Évaluer le niveau initial des élèves (capacité à maintenir le ballon en l'air, respect des zones de jeu) pour établir un diagnostic et former des groupes homogènes.",
            S2: "Étude du règlement officiel (FIVB adapté), compréhension du système de rotation, des fautes de filet, et des principes tactiques de base (réception-passe-attaque).",
            S12: "Évaluer les progrès techniques individuels et l'efficacité de l'organisation collective en situation de match officiel."
        },
        debutant: [
            "Maîtriser le service \"cuillère\" pour mettre le ballon en jeu de manière sécurisée.",
            "Développer la réception en manchette (bras tendus, plan de frappe stable) sur des ballons faciles.",
            "S'initier à la passe haute (en touche) pour s'auto-envoyer le ballon ou viser une zone.",
            "Apprendre à renvoyer le ballon dans le camp adverse dès la première ou deuxième touche.",
            "Comprendre l'organisation spatiale : ne pas se gêner et respecter sa zone de départ.",
            "Travailler le déplacement court et l'arrêt (être \"sous le ballon\") avant de frapper.",
            "S'initier au renvoi offensif simple (chercher les zones vides du camp adverse).",
            "Apprendre l'arbitrage de base : compter les points, signaler le ballon \"in\" ou \"out\".",
            "Match dirigé : focus sur la réduction des fautes directes (filet et hors-limites)."
        ],
        moyen: [
            "Améliorer la précision du service (viser le fond du terrain ou les zones latérales).",
            "Stabiliser la réception en manchette pour l'orienter vers la zone du passeur (zone 3).",
            "Maîtriser la passe haute de précision pour offrir un ballon exploitable à l'attaquant.",
            "Construire une attaque en trois touches (Réception – Passe – Renvoi).",
            "S'initier au smash (attaque smashée) : coordination course d'élan et frappe haute.",
            "Apprendre le placement défensif de base en lecture (attendre le ballon en position basse).",
            "Utiliser la communication verbale (\"J'ai !\", \"Moi !\") pour éviter les collisions.",
            "Arbitrage et score : gérer les rotations et les changements de camp.",
            "Tournoi : privilégier la construction du jeu avant de chercher à marquer le point."
        ],
        avance: [
            "Maîtriser le service \"tennis\" (bras haut) pour mettre l'adversaire en difficulté.",
            "Perfectionner la manchette de précision même sur des services puissants.",
            "Développer la passe arrière et la passe latérale pour varier les cibles d'attaque.",
            "Optimiser la relation Passeur/Attaquant (timing de l'appel de balle).",
            "S'initier au contre (block) individuel pour fermer les angles d'attaque.",
            "Mise en place d'un système défensif en \"W\" pour couvrir tout le terrain en réception.",
            "Apprendre à varier les attaques : smashes puissants, ballons placés (feintes).",
            "Observation tactique : identifier le maillon faible adverse pour orienter le service.",
            "Match de compétition : application de schémas tactiques simples (priorité au jeu placé)."
        ],
        elite: [
            "Maîtriser le service smashé ou le service flottant agressif.",
            "Spécialisation des postes : rôles fixes (Passeur, Pointu, Réceptionneur-Attaquant, Central).",
            "Perfectionner les attaques rapides (la \"fixe\") pour surprendre le contre adverse.",
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
            S1: "Évaluer la capacité à manipuler le ballon, à se déplacer et à viser la cible pour diagnostiquer le niveau moteur et technique.",
            S2: "Apprentissage des règles fondamentales (marcher, reprise de dribble, fautes de contact, zone), et explication des rôles (meneur, ailier, pivot).",
            S12: "Évaluation finale des compétences acquises en situation de match (efficacité au tir, respect des règles et choix tactiques)."
        },
        debutant: [
            "Maîtriser le dribble de progression avec la main dominante sans regarder constamment le ballon.",
            "Apprendre la passe de poitrine à deux mains avec une extension complète des bras.",
            "S'initier au tir à l'arrêt : position des pieds, coude sous le ballon et cassé du poignet.",
            "Apprendre le double-pas (lay-up) : coordination des appuis droite-gauche ou gauche-droite.",
            "Comprendre la notion de non-contact : défendre sans toucher l'adversaire (bras levés).",
            "Apprendre à s'arrêter en un ou deux temps pour éviter le \"marcher\".",
            "S'initier au pivotement pour protéger son ballon face à un défenseur.",
            "S'initier à l'arbitrage : gestuelle de base pour le marcher et les sorties.",
            "Match dirigé : focus sur la progression vers l'avant sans violation de règle."
        ],
        moyen: [
            "Maîtriser le changement de main en dribble (devant soi) pour contourner un obstacle.",
            "Développer la passe par-dessus la tête et la passe à terre pour varier les trajectoires.",
            "Améliorer la réussite au tir à mi-distance après un seul dribble.",
            "Perfectionner le lay-up en pleine course (vitesse d'exécution).",
            "Mise en place d'une défense individuelle avec respect du triangle \"Ballon-Moi-Adversaire\".",
            "Apprendre à faire un écran simple pour libérer un partenaire porteur de balle.",
            "Développer le rebond offensif et défensif (prise de position sous le panier).",
            "Arbitrage et gestion de la table de marque (feuille de match simplifiée).",
            "Tournoi : privilégier le jeu de passes avant le tir (règle des 3 passes minimum)."
        ],
        avance: [
            "Maîtriser le dribble de protection et le changement de rythme pour éliminer un défenseur.",
            "Développer la passe aveugle ou la passe après saut pour surprendre la défense.",
            "Travailler le tir en suspension (Jump Shot) avec une forme stable.",
            "Maîtriser le \"Give and Go\" (Passe et va) pour créer des brèches.",
            "Mise en place d'une défense de zone (2-3 ou 3-2) et compréhension des coulissements.",
            "Apprendre à gérer le \"Pick and Roll\" (Écran et rouler) en attaque.",
            "Travailler la transition rapide (contre-attaque) après une récupération de balle.",
            "Coaching : analyser les statistiques de réussite et ajuster la stratégie à la mi-temps.",
            "Match de compétition : application rigoureuse des systèmes de jeu annoncés."
        ],
        elite: [
            "Optimisation du dribble croisé (Crossover) et des appuis de décalage (Step-back).",
            "Maîtriser la lecture de jeu sur défense de zone et défense presse.",
            "Perfectionnement du tir à 3 points et des lancers-francs sous pression (fin de match).",
            "Systèmes offensifs complexes avec multiples écrans et coupes.",
            "Maîtriser la \"Presse tout terrain\" et le repli défensif organisé.",
            "Travail spécifique du poste : lecture du jeu pour le meneur, jeu dos au panier pour le pivot.",
            "Gestion des dernières possessions (stratégies sur 24 secondes).",
            "Analyse vidéo des placements et des erreurs de communication défensive.",
            "Match de haute intensité avec gestion des fautes et du temps mort tactique."
        ]
    },

    'Handball': {
        commun: {
            S1: "Évaluer la qualité de la passe, du tir et l'engagement défensif pour identifier les besoins du groupe.",
            S2: "Étude du règlement (zone, marcher, 3 secondes, fautes de bras) et des principes d'attaque placée.",
            S12: "Validation des acquis techniques et tactiques en situation réelle de compétition."
        },
        debutant: [
            "Maîtriser la manipulation du ballon (prise de balle à une main) et le dribble de base.",
            "Apprendre la passe d'épaule précise vers un partenaire arrêté.",
            "S'initier au tir en appui (pied opposé au bras lanceur devant).",
            "Apprendre le cycle des 3 pas pour déclencher un tir ou une passe.",
            "Comprendre l'interdiction d'entrer dans la zone du gardien.",
            "S'initier au rôle de gardien de but : postures et parades de base.",
            "Apprendre à défendre en restant face à l'attaquant sans commettre de faute grave.",
            "Arbitrage : signaler le \"marcher\" et le \"jet de coin\".",
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
            "Perfectionnement du tir en appui long et du tir \"Kung-fu\" (en l'air).",
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
            S1: "Évaluer le temps de réaction et la vitesse maximale sur 30m ou 60m (chronométrage de référence).",
            S2: "Comprendre la physiologie de la vitesse (anaérobie alactique), les phases de la course (départ, accélération, maintien) et le règlement.",
            S12: "Mesurer la performance finale et comparer avec le test initial pour valider la progression."
        },
        debutant: [
            "Apprendre la posture de course : buste droit, regard vers l'horizon, bras en piston.",
            "Développer la réactivité au signal sonore (varier les positions de départ : assis, couché, dos).",
            "Maîtriser les appuis plante de pied (courir sur la pointe) pour réduire le temps de contact.",
            "Apprendre le départ en \"appui-face\" (sans starting-blocks) : jambe de force devant.",
            "Travailler la coordination bras/jambes par des exercices de montée de genoux et talons-fesses.",
            "Apprendre à maintenir sa trajectoire droite dans son couloir.",
            "S'initier à l'accélération progressive sur 10 à 20 mètres.",
            "Apprendre à franchir la ligne d'arrivée sans ralentir (\"casser\" le buste).",
            "Pré-test chronométré avec gestion du stress du départ."
        ],
        moyen: [
            "Améliorer l'efficacité de la foulée (amplitude vs fréquence).",
            "S'initier au réglage et à l'utilisation des starting-blocks (angles des cales).",
            "Maîtriser le commandement de départ : \"À vos marques\", \"Prêt\", \"Partez\".",
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
            S1: "Évaluer le niveau initial (force et coordination) et identifier les élèves qui \"lancent\" au lieu de \"pousser\".",
            S2: "Règles de sécurité (zone de jet), tenue de l'engin (embase des doigts), et distinction entre jet et lancer.",
            S12: "Lancer un poids de 4kg (garçons) ou 3kg (filles) le plus loin possible et mesurer la performance."
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
            "Apprendre le placement \"de profil\" par rapport à la zone de chute.",
            "Travailler la poussée de la jambe droite (pour les droitiers) vers l'avant.",
            "Coordonner la fin de la poussée de jambe avec le départ du bras.",
            "Améliorer l'angle d'envol (repères visuels à 45°).",
            "Travailler l'explosivité : enchaîner flexion de jambe et extension bras rapide.",
            "S'initier au \"pas chassé\" très simple pour prendre de l'élan.",
            "Apprendre à annoncer les résultats et gérer un concours de classe.",
            "Pré-compétition : stabiliser le lancer de profil avec élan réduit."
        ],
        avance: [
            "Maîtriser le placement en \"Power Position\" (position de force) de manière stable.",
            "Apprendre le sursaut (glissement) arrière dans l'axe du jet.",
            "Travailler la reprise d'appui après le sursaut pour ne pas s'arrêter.",
            "Améliorer l'amplitude du mouvement : aller chercher le poids loin derrière.",
            "Travailler le \"fouetté\" final du poignet pour donner de la vitesse.",
            "Exercices de proprioception pour garder le poids collé au cou malgré l'élan.",
            "S'initier au \"rattrapage\" (changement de pieds après le jet) pour rester dans le cercle.",
            "Jugement : identifier les jets nuls (poids qui descend, sortie devant).",
            "Concours blanc : enchaîner sursaut et jet fluide."
        ],
        elite: [
            "Perfectionner la position de départ (dos à la zone de chute).",
            "Travailler le déséquilibre arrière contrôlé pour amorcer le sursaut.",
            "Maîtriser le \"rasé de sol\" lors du glissement pour rester bas.",
            "Travailler la fermeture de l'épaule gauche (pour les droitiers) pour créer une torsion.",
            "Accélérer la phase finale (la \"gifle\" au poids).",
            "Travail de force explosive spécifique (pliométrie haute).",
            "Gérer l'espace du cercle : utiliser toute la longueur disponible.",
            "Organisation d'un meeting : chronométrage du temps de préparation (1 min).",
            "Séance de réglage des appuis et de la direction du jet."
        ]
    },

    'Saut en longueur': {
        commun: {
            S1: "Courir et sauter le plus loin possible. 3 essais mesurés pour chaque élève.",
            S2: "Règlement (planche, mordu, mesure à la trace), biomécanique du saut (Vitesse + Impulsion = Distance), et sécurité.",
            S12: "3 essais mesurés. Note basée sur la performance brute et l'évolution technique observée."
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
            "Améliorer la technique de suspension (style \"groupé\").",
            "Travailler l'extension complète de la jambe d'appel lors de l'impulsion.",
            "Apprendre à projeter les talons le plus loin possible devant soi à l'atterrissage.",
            "Arbitrage : gérer les drapeaux blanc (valide) et rouge (mordu).",
            "Séance de réglage des marques d'élan sous pression de vitesse."
        ],
        avance: [
            "Optimisation de la course d'élan : recherche de la vitesse maximale contrôlable.",
            "Travail spécifique sur le \"griffé\" du dernier appui au sol.",
            "S'initier à la technique de suspension en \"extension\" (cambré-regroupé).",
            "Travailler la montée du genou de la jambe libre lors de l'impulsion.",
            "Exercices de pliométrie (bonds horizontaux) pour augmenter l'explosion au sol.",
            "Analyser la trajectoire : éviter les sauts trop \"plats\" ou trop \"clochés\".",
            "Travailler l'esquive latérale ou le basculement du bassin à la réception.",
            "Analyse vidéo ou observation fine : détecter les ralentissements avant la planche.",
            "Concours blanc : gestion des 3 essais comme en compétition officielle."
        ],
        elite: [
            "Stabilisation millimétrée des marques d'élan à haute intensité.",
            "Perfectionnement du \"Ciseau\" ou \"Double Ciseau\" durant la phase de vol.",
            "Travail de survitesse (course avec vent arrière ou légère pente).",
            "Optimisation du transfert d'énergie : synchronisation parfaite bras-jambes.",
            "Travail de gainage dynamique pour maintenir la posture en l'air.",
            "Travail psychologique : concentration et visualisation du saut parfait.",
            "Analyse des statistiques personnelles (vitesse d'entrée vs distance réalisée).",
            "Coaching : les élèves élites aident à corriger les débutants sur des détails techniques.",
            "Séance d'affûtage : peu de sauts, mais à 100% de l'engagement."
        ]
    },

    'Gymnastique': {
        commun: {
            S1: "Présenter l'enchaînement de référence pour évaluer la capacité de mémorisation, la sécurité et le niveau technique de départ.",
            S2: "Analyse du barème de notation (Difficulté, Exécution, Composition). Apprentissage de la terminologie des éléments A, B, C, D, E. Règles de sécurité.",
            S12: "Présentation finale de l'enchaînement devant le groupe classe. Évaluation sommative basée sur la réussite des éléments et la tenue corporelle."
        },
        '1AC': [
            "Maîtriser les éléments de famille A : Roulade avant groupée et Planche (équilibre).",
            "Consolider la Roulade arrière (A) et la Chandelle (A).",
            "S'initier aux éléments de famille B : L'ATR (Appui Tendu Renversé) avec aide.",
            "Apprendre la Roue (B) : alignement des segments et passage par la verticale.",
            "Travailler les sauts de liaison (Saut groupé ou extension).",
            "Travail spécifique sur la \"fixité\" des positions (maintenir 3 secondes).",
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
            "Séance de \"nettoyage\" : éliminer les petits pas de déséquilibre à la réception."
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
            "Répétition finale : gestion du stress et présentation au \"public\"."
        ],
        '1BAC': [
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
        '2BAC': [
            "Maîtriser les éléments C comme base de travail (Lune, Souplesses).",
            "Travailler les éléments de famille D : Saut de mains, Rondade-Flic, ou Roue sans les mains.",
            "S'initier ou perfectionner les éléments de famille E : Salto arrière/avant ou Flip-flap.",
            "Travail de l'explosivité : maximiser la hauteur des envols.",
            "Stabiliser les réceptions \"pilées\" : aucune tolérance pour les déséquilibres.",
            "Travail chorégraphique : l'enchaînement doit être une prestation artistique.",
            "Finalisation de l'enchaînement (2C, 3D, 2E) : optimisation du barème.",
            "Jugement de haut niveau : déductions au dixième de point.",
            "Répétition générale : focus sur la concentration et la maîtrise de soi."
        ]
    }
};

// ============================================================================
// FONCTIONS HELPERS
// ============================================================================

const getObjectifSeance = (aps, niveau, numeroSeance, nombreTotalSeances = 10) => {
    const cycle = OBJECTIFS_CYCLE[aps];
    if (!cycle) return null;
    
    if (numeroSeance === 1) return cycle.commun.S1;
    if (numeroSeance === 2) return cycle.commun.S2;
    if (numeroSeance === nombreTotalSeances) return cycle.commun.S12;
    
    const seances = cycle[niveau] || cycle.debutant || cycle['1AC'];
    if (!seances) return null;
    
    const indexApprentissage = numeroSeance - 3;
    if (indexApprentissage >= 0 && indexApprentissage < seances.length) {
        return seances[indexApprentissage];
    }
    return seances[seances.length - 1];
};

const buildProjetCycle = (aps, niveau, nombreSeances = 10) => {
    const cycle = OBJECTIFS_CYCLE[aps];
    if (!cycle) return null;
    
    const projet = [];
    const seances = cycle[niveau] || cycle.debutant || cycle['1AC'];
    
    for (let i = 1; i <= nombreSeances; i++) {
        let phase, objectif;
        
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
            const indexMax = seances.length;
            const seancesDisponibles = nombreSeances - 3;
            const indexApprentissage = Math.floor((i - 3) * indexMax / seancesDisponibles);
            const indexFinal = Math.min(indexApprentissage, indexMax - 1);
            
            if (i <= 4) phase = 'Découverte';
            else if (i <= nombreSeances - 3) phase = 'Apprentissage';
            else phase = 'Consolidation';
            
            objectif = seances[indexFinal];
        }
        
        projet.push({ seance: i, phase, objectif });
    }
    
    return projet;
};

module.exports = { OBJECTIFS_CYCLE, getObjectifSeance, buildProjetCycle };

const FALLBACKS = {
    'Handball': { echauf: 'Manipulation balle individuelle (2 min) | Passes en binômes à 6m (3 min) | Jeu des 10 passes 4c2 (3 min)', s1t: 'Conservation et progression collective', s1b: 'Conserver la balle et atteindre la zone de marque', s1o: '4 attaquants vs 2 défenseurs, terrain 20x15m, 4 plots, 1 ballon', s1d: 'Les 4 attaquants conservent le ballon face à 2 défenseurs. 1 point si la balle arrive dans la zone. Rotation toutes les 2 min.', s1c: '1. Regarder avant de passer\n2. Passe à terre tendue\n3. Se démarquer dans l\'espace libre\n4. Appeler la balle bras levé', s1v: 'Simplifier: 4c1, 3 touches obligatoires | Complexifier: 4c3, 2 touches max', s2t: 'Match à thème', s2b: 'Marquer un but en appliquant les techniques travaillées', s2o: '2 équipes de 5 joueurs, terrain 30x20m avec 2 buts', s2d: 'Match avec obligation d\'appliquer l\'objectif. Point bonus (+1) si objectif visible.', s2c: '1. Appliquer l\'objectif travaillé\n2. S\'engager en attaque et défense\n3. Respecter les règles\n4. Communiquer', s2v: 'Simplifier: supériorité numérique | Complexifier: infériorité numérique', cr: '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine\n• Déplacement dans l\'espace libre après la passe\n• Réception à deux mains bras tendus', cs: '• 7 passes réussies sur 10 tentatives\n• Atteindre la zone 3 fois sur 5 possessions\n• Temps de possession supérieur à 20 secondes\n• Marquer 2 buts minimum en 5 minutes' },
    'Football': { echauf: 'Conduite slalom (2 min) | Passes intérieur pied 8m (3 min) | Contrôle orienté + passe (3 min)', s1t: 'Conservation et progression', s1b: 'Conserver le ballon et marquer dans le mini-but', s1o: '4c2 sur terrain 25x20m, 2 mini-buts, chasubles, 1 ballon', s1d: 'Les 4 attaquants conservent et progressent vers le but. Rotation après récupération.', s1c: '1. Contrôle orienté vers l\'espace\n2. Passe intérieur du pied\n3. Appel en profondeur\n4. Lever la tête', s1v: 'Simplifier: 4c1 | Complexifier: 4c3, 2 touches', s2t: 'Match à thème', s2b: 'Marquer en utilisant les techniques travaillées', s2o: '2 équipes de 5, terrain 40x25m avec 2 buts', s2d: 'Match avec point bonus si objectif visible.', s2c: '1. Appliquer l\'objectif\n2. Jouer vers l\'avant\n3. Se replacer\n4. Communiquer', s2v: 'Simplifier: joker offensif | Complexifier: 2 touches max', cr: '• Contrôle intérieur pied orienté vers cible\n• Surface de contact au centre du ballon\n• Pied d\'appui à côté du ballon\n• Regard ballon puis cible', cs: '• 8 contrôles réussis sur 10\n• 7 passes arrivées sur 10\n• Conservation 30 secondes minimum\n• 1 but par période de 5 min' },
    'Basketball': { echauf: 'Dribble slalom (2 min) | Passes triangle (3 min) | Lay-up sans opposition (3 min)', s1t: 'Passe et va', s1b: 'Réaliser un passe et va pour marquer', s1o: '3c2 sur demi-terrain avec panier, 1 ballon, chasubles', s1d: 'Les 3 attaquants appliquent le passe et va. Panier = 2 points. Rotation après possession.', s1c: '1. Passer et couper vers le panier\n2. Recevoir en course sans marcher\n3. Finir en lay-up main extérieure\n4. Écarter si défendu', s1v: 'Simplifier: 3c1 | Complexifier: 3c3, écran obligatoire', s2t: 'Match à thème', s2b: 'Marquer en utilisant le passe et va', s2o: '2 équipes de 4, demi-terrain', s2d: 'Match avec bonus pour panier après passe et va.', s2c: '1. Appliquer le passe et va\n2. Espacer le jeu\n3. Défendre son joueur\n4. Communiquer', s2v: 'Simplifier: supériorité | Complexifier: 2 dribbles max', cr: '• Passe tendue hauteur poitrine\n• Coupe directe vers le panier\n• Réception en course regard panier\n• Lay-up appui intérieur main extérieure', cs: '• 6 lay-up réussis sur 10\n• 3 paniers passe et va sur 5\n• 0 marcher sur 10 réceptions\n• Plus de 10 points en 5 min' },
    'Volleyball': { echauf: 'Jonglage manchette (2 min) | Échanges touche haute (3 min) | Service + réception (3 min)', s1t: 'Construction 3 touches', s1b: 'Construire une attaque en 3 touches', s1o: '3c3 terrain réduit 6x9m, filet 2m, 1 ballon', s1d: 'L\'équipe construit en 3 touches. Point bonus si respecté.', s1c: '1. Manchette vers passeur\n2. Touche haute à 1m du filet\n3. Attaque vers sol adverse\n4. Annoncer "j\'ai!"', s1v: 'Simplifier: lancer au lieu de servir | Complexifier: smash obligatoire', s2t: 'Match à thème', s2b: 'Marquer en construisant en 3 touches', s2o: '2 équipes de 4, terrain 7x14m', s2d: 'Match avec bonus point en 3 touches. Rotation toutes les 5 points.', s2c: '1. Construction 3 touches\n2. Communiquer positions\n3. Couvrir attaquant\n4. Rotation', s2v: 'Simplifier: 2 touches autorisées | Complexifier: zone imposée', cr: '• Bras tendus joints pour manchette\n• Mains coupe au-dessus front pour touche\n• Déplacement sous ballon\n• Orientation appuis vers cible', cs: '• 7 manchettes vers passeur sur 10\n• 6 touches exploitables sur 10\n• 3 attaques gagnantes sur 5\n• 4 constructions 3 touches sur 5' }
};

const SCHEMAS = {
    'Handball': {
        1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#e8f5e9;border:2px solid #2e7d32;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#2e7d32" stroke-width="2"/>
            <path d="M10,45 L35,45 L35,75 L10,75" fill="none" stroke="#2e7d32" stroke-width="2"/>
            <path d="M190,45 L165,45 L165,75 L190,75" fill="none" stroke="#2e7d32" stroke-width="2"/>
            <path d="M35,10 Q60,60 35,110" fill="none" stroke="#2e7d32" stroke-width="2" stroke-dasharray="4"/>
            <path d="M165,10 Q140,60 165,110" fill="none" stroke="#2e7d32" stroke-width="2" stroke-dasharray="4"/>
            <circle cx="60" cy="40" r="6" fill="#c1272d"/><text x="60" y="44" text-anchor="middle" fill="white" font-size="8" font-weight="bold">A</text>
            <circle cx="60" cy="80" r="6" fill="#c1272d"/><text x="60" y="84" text-anchor="middle" fill="white" font-size="8" font-weight="bold">A</text>
            <circle cx="130" cy="50" r="6" fill="#1565c0"/><text x="130" y="54" text-anchor="middle" fill="white" font-size="8" font-weight="bold">D</text>
            <circle cx="130" cy="70" r="6" fill="#1565c0"/><text x="130" y="74" text-anchor="middle" fill="white" font-size="8" font-weight="bold">D</text>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 1</text>
        </svg>`,
        2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#e8f5e9;border:2px solid #2e7d32;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#2e7d32" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="#2e7d32" stroke-width="2"/>
            <circle cx="100" cy="60" r="15" fill="none" stroke="#2e7d32" stroke-width="2"/>
            <circle cx="50" cy="40" r="5" fill="#c1272d"/>
            <circle cx="50" cy="80" r="5" fill="#c1272d"/>
            <circle cx="80" cy="60" r="5" fill="#c1272d"/>
            <circle cx="150" cy="40" r="5" fill="#1565c0"/>
            <circle cx="150" cy="80" r="5" fill="#1565c0"/>
            <circle cx="120" cy="60" r="5" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 2</text>
        </svg>`
    },
    'Football': {
        1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#81c784;border:2px solid #1b5e20;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#white" stroke-width="2"/>
            <rect x="10" y="35" width="25" height="50" fill="none" stroke="white" stroke-width="2"/>
            <rect x="165" y="35" width="25" height="50" fill="none" stroke="white" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="white" stroke-width="2"/>
            <circle cx="100" cy="60" r="15" fill="none" stroke="white" stroke-width="2"/>
            <circle cx="60" cy="40" r="6" fill="#c1272d"/>
            <circle cx="60" cy="80" r="6" fill="#c1272d"/>
            <circle cx="80" cy="60" r="6" fill="#c1272d"/>
            <circle cx="140" cy="60" r="6" fill="#1565c0"/>
            <circle cx="120" cy="40" r="6" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#white" font-size="9" font-weight="bold">Situation 1</text>
        </svg>`,
        2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#81c784;border:2px solid #1b5e20;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="white" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="white" stroke-width="2"/>
            <circle cx="100" cy="60" r="15" fill="none" stroke="white" stroke-width="2"/>
            <circle cx="40" cy="30" r="5" fill="#c1272d"/>
            <circle cx="40" cy="90" r="5" fill="#c1272d"/>
            <circle cx="70" cy="60" r="5" fill="#c1272d"/>
            <circle cx="160" cy="30" r="5" fill="#1565c0"/>
            <circle cx="160" cy="90" r="5" fill="#1565c0"/>
            <circle cx="130" cy="60" r="5" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#white" font-size="9" font-weight="bold">Situation 2</text>
        </svg>`
    },
    'Basketball': {
        1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#ffcc80;border:2px solid #e65100;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#e65100" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="#e65100" stroke-width="2"/>
            <path d="M10,40 L40,40 L40,80 L10,80" fill="none" stroke="#e65100" stroke-width="2"/>
            <path d="M10,25 Q60,60 10,95" fill="none" stroke="#e65100" stroke-width="2"/>
            <path d="M190,40 L160,40 L160,80 L190,80" fill="none" stroke="#e65100" stroke-width="2"/>
            <path d="M190,25 Q140,60 190,95" fill="none" stroke="#e65100" stroke-width="2"/>
            <circle cx="30" cy="50" r="6" fill="#c1272d"/>
            <circle cx="30" cy="70" r="6" fill="#c1272d"/>
            <circle cx="50" cy="60" r="6" fill="#c1272d"/>
            <circle cx="150" cy="50" r="6" fill="#1565c0"/>
            <circle cx="150" cy="70" r="6" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 1</text>
        </svg>`,
        2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#ffcc80;border:2px solid #e65100;border-radius:4px;">
            <rect x="10" y="10" width="180" height="100" fill="none" stroke="#e65100" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="#e65100" stroke-width="2"/>
            <circle cx="100" cy="60" r="15" fill="none" stroke="#e65100" stroke-width="2"/>
            <circle cx="40" cy="40" r="5" fill="#c1272d"/>
            <circle cx="40" cy="80" r="5" fill="#c1272d"/>
            <circle cx="70" cy="60" r="5" fill="#c1272d"/>
            <circle cx="160" cy="40" r="5" fill="#1565c0"/>
            <circle cx="160" cy="80" r="5" fill="#1565c0"/>
            <circle cx="130" cy="60" r="5" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 2</text>
        </svg>`
    },
    'Volleyball': {
        1: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#fff9c4;border:2px solid #fbc02d;border-radius:4px;">
            <rect x="20" y="20" width="160" height="80" fill="none" stroke="#fbc02d" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="#333" stroke-width="3"/>
            <line x1="60" y1="20" x2="60" y2="100" stroke="#fbc02d" stroke-width="1" stroke-dasharray="4"/>
            <line x1="140" y1="20" x2="140" y2="100" stroke="#fbc02d" stroke-width="1" stroke-dasharray="4"/>
            <circle cx="50" cy="40" r="6" fill="#c1272d"/>
            <circle cx="50" cy="60" r="6" fill="#c1272d"/>
            <circle cx="50" cy="80" r="6" fill="#c1272d"/>
            <circle cx="150" cy="40" r="6" fill="#1565c0"/>
            <circle cx="150" cy="60" r="6" fill="#1565c0"/>
            <circle cx="150" cy="80" r="6" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 1</text>
        </svg>`,
        2: `<svg viewBox="0 0 200 120" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#fff9c4;border:2px solid #fbc02d;border-radius:4px;">
            <rect x="20" y="20" width="160" height="80" fill="none" stroke="#fbc02d" stroke-width="2"/>
            <line x1="100" y1="10" x2="100" y2="110" stroke="#333" stroke-width="3"/>
            <circle cx="40" cy="40" r="5" fill="#c1272d"/>
            <circle cx="40" cy="80" r="5" fill="#c1272d"/>
            <circle cx="70" cy="60" r="5" fill="#c1272d"/>
            <circle cx="160" cy="40" r="5" fill="#1565c0"/>
            <circle cx="160" cy="80" r="5" fill="#1565c0"/>
            <circle cx="130" cy="60" r="5" fill="#1565c0"/>
            <text x="100" y="115" text-anchor="middle" fill="#333" font-size="9" font-weight="bold">Situation 2</text>
        </svg>`
    },
    'default': {
        1: `<svg viewBox="0 0 200 100" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#f5f5f5;border:2px solid #9e9e9e;border-radius:4px;">
            <rect x="10" y="10" width="180" height="90" fill="#E8E8E8" stroke="#666" stroke-width="2" rx="8"/><text x="100" y="55" text-anchor="middle" fill="#666" font-size="11">Zone de travail - Situation 1</text></svg>`,
        2: `<svg viewBox="0 0 200 100" style="width:100%;max-width:260px;height:auto;margin:8px auto;display:block;background:#f5f5f5;border:2px solid #9e9e9e;border-radius:4px;">
            <rect x="10" y="10" width="180" height="90" fill="#E8E8E8" stroke="#666" stroke-width="2" rx="8"/><text x="100" y="55" text-anchor="middle" fill="#666" font-size="11">Zone de travail - Situation 2</text></svg>`
    }
};

const getSchema = (aps, numSit) => SCHEMAS[aps]?.[numSit] || SCHEMAS['default'][numSit];

module.exports = { OTI, OTC, VOCABULAIRE_APS, getSituationReference, getGroupeAPS, CRITERES_OBS, OBJECTIFS_CYCLE, FALLBACKS, SCHEMAS, getSchema, // Obtenir l'objectif d'une séance spécifique
getObjectifSeance(aps, niveau, numeroSeance, nombreTotalSeances)

// Construire le tableau complet du projet de cycle
buildProjetCycle(aps, niveau, nombreSeances) };
