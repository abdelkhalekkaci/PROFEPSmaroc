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
    'Course en durée': {
        '1AC': "Courir de façon régulière sur une durée donnée (8-10 min) en gérant son effort et en maintenant une allure constante.",
        '2AC': "Adapter son allure de course pour maintenir un effort prolongé (10-12 min), en utilisant des repères de temps et de distance.",
        '3AC': "Construire et respecter un projet de course en fonction de ses capacités, sur une durée de 12-15 min, en régulant son allure.",
        'TC': "Planifier et réaliser une performance en gérant efficacement ses ressources énergétiques, sur une distance ou durée définie.",
        '1AB': "Optimiser sa performance par une gestion stratégique de l'allure, en s'appuyant sur la connaissance de ses capacités.",
        '2AB': "Atteindre ses objectifs personnels par une préparation et une stratégie de course adaptées à ses ressources."
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
    },
    'Course de haies': {
        '1AC': "Franchir des haies basses en maintenant une course régulière avec une technique de franchissement de base.",
        '2AC': "Améliorer sa coordination et son rythme pour franchir des haies à hauteur réglementaire.",
        '3AC': "Optimiser sa technique de franchissement et maintenir sa vitesse à travers les haies.",
        'TC': "Maîtriser la technique de franchissement et gérer sa course de haies avec efficacité.",
        '1AB': "Analyser et améliorer ses points faibles techniques pour progresser vers sa performance optimale.",
        '2AB': "Atteindre son potentiel maximal en course de haies par une préparation et une exécution optimales."
    },
    'Course de relais': {
        '1AC': "Transmettre le témoin à un partenaire en mouvement sans perdre le témoin.",
        '2AC': "Améliorer la synchronisation et la vitesse de transmission du témoin.",
        '3AC': "Optimiser la transmission du témoin à vitesse maximale sans perte.",
        'TC': "Maîtriser les techniques de transmission et la gestion collective du relais.",
        '1AB': "Analyser et améliorer les transmissions pour maximiser les performances collectives.",
        '2AB': "Coordonner efficacement un équipe de relais pour atteindre des performances optimales."
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
        'Course de haies': isCollege ? 'Course chronométrée sur 40m haies (hauteur adaptée) en couloir individuel' : 'Course chronométrée sur 60m haies (hauteur 84cm G / 76cm F) en couloir individuel',
        'Course de relais': 'Course en binôme 2x30m avec transmission du témoin dans la zone de passage',
        'Saut en longueur': 'Concours de 3 essais mesurés avec course d\'élan libre, la meilleure performance est retenue',
        'Saut en hauteur': 'Concours à barres montantes avec 3 essais maximum par hauteur, technique libre',
        'Lancer de poids': 'Concours de 3 essais mesurés depuis le plateau de lancer, la meilleure performance est retenue',
        'Course de durée': 'Course de 12 minutes en régulant son allure, la distance parcourue est mesurée',
        'Course en durée': 'Course de 1000m (Garçons) / 600m (Filles) en régulant son allure pour mesurer le temps de passage',
        'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés du niveau'
    };
    return situations[aps] || 'Situation adaptée au niveau';
};

const getGroupeAPS = (aps) => {
    if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) return 'Sports collectifs';
    if (['Tennis de table', 'Badminton'].includes(aps)) return 'Sports de renvoi';
    if (['Course de vitesse', 'Course de haies', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée', 'Course en durée'].includes(aps)) return 'Athlétisme';
    if (aps === 'Gymnastique') return 'Gymnastique';
    return 'Activité';
};

// ==================== OBJECTIFS EXPLICITES PAR APS (1-2 phrases) ====================
// Structure: commun {S1, S2, S12} + niveaux {debutant, moyen, avance, elite, 1AC, 2AC, 3AC, TC, 1AB, 2AB}
const OBJECTIFS_CYCLE = {
    'Football': {
        commun: {
            S1: "Test d'observation - Évaluer le niveau initial des élèves (capacités motrices, techniques et tactiques) afin de diagnostiquer les besoins et constituer des groupes de niveau.",
            S2: "Maîtriser les lois du jeu (FIFA adaptées au milieu scolaire), comprendre les principes de l'occupation de l'espace (bloc équipe) et les valeurs du fair-play.",
            S12: "Test bilan - Évaluer le degré d'atteinte des objectifs du cycle, mesurer la progression technique et tactique et valider les acquis en situation de match."
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
            S1: "Évaluer le niveau initial des élèves (capacité à maintenir le ballon en l'air, respect des zones de jeu) pour établir un diagnostic et former des groupes homogènes.",
            S2: "Étude du règlement officiel (FIVB adapté), compréhension du système de rotation, des fautes de filet, et des principes tactiques de base (réception-passe-attaque).",
            S12: "Évaluer les progrès techniques individuels et l'efficacité de l'organisation collective en situation de match officiel."
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
            S1: "Évaluer le temps de réaction et la vitesse maximale sur 30m ou 60m (chronométrage de référence).",
            S2: "Comprendre la physiologie de la vitesse (anaérobie alactique), les phases de la course (départ, accélération, maintien) et le règlement.",
            S12: "Mesurer la performance finale et comparer avec le test initial pour valider la progression."
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
            S1: "Évaluer le niveau initial (force et coordination) et identifier les élèves qui lancent au lieu de pousser.",
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
            "Travailler la vitesse de la course d'élan (progressive et non maximale immédiatement).",
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
    },
    'Course en durée': {
        commun: {
            S1: "Situation de référence (1000m G / 600m F) pour mesurer le temps de base et observer la gestion spontanée de l'effort.",
            S2: "Test Navette (Luc Léger) pour déterminer la VMA et constituer les groupes physiologiques. Partie théorique : analyse des résultats, explication des zones d'entraînement (Capacité vs Puissance) et remise des fiches de suivi.",
            S3: "Partie Pratique (La Posture) : Travail technique sur la 'foulée économique' (regard à l'horizon, buste droit, relâchement des épaules, mouvement des bras en piston, attaque médio-pied). Exercices de gammes (montées de genoux, talons-fesses) axés sur le placement.",
            S12: "Test Bilan : courir (1000m G / 600m F) pour mesurer le temps de passage et observer la gestion de l'effort."
        },
        debutant: [
            "S4 (Capacité Aérobie) : 10 min de course continue en aisance respiratoire (pouvoir parler en courant).",
            "S5 (Capacité Aérobie) : 12 min de course continue en aisance respiratoire.",
            "S6 (Capacité Aérobie) : 15 min de course continue en aisance respiratoire.",
            "S7 (Capacité Aérobie) : Alterner 4 min course / 1 min marche (3 séries) en aisance respiratoire.",
            "S8 (Puissance Aérobie) : Initiation au fractionné très doux : 45\" course rapide / 45\" marche (2 séries de 5).",
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
            "S8 (Puissance Aérobie) : Séance de 30\"/30\" à 100% VMA (2 séries de 8 répétitions).",
            "S9 (Puissance Aérobie) : Séance de 30\"/30\" à 100% VMA (2 séries de 8 répétitions).",
            "S10 (Puissance Aérobie) : Intervalles de 200m à 100% VMA (récupération égale au temps de course).",
            "S11 (Puissance Aérobie) : Simulation de course sur 800m (G) / 500m (F) à l'allure du test bilan.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ],
        avance: [
            "S4 (Capacité Aérobie) : 20 min en variation d'allure (allure 1, 2, 3).",
            "S5 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S6 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S7 (Capacité Aérobie) : Intervalles longs 3 x 1000m à 85% VMA (repos 3 min). Travail sur le maintien de la posture malgré la fatigue.",
            "S8 (Puissance Aérobie) : Séance de 45\"/30\" à 105% VMA.",
            "S9 (Puissance Aérobie) : Répétitions de 400m à 100% VMA (repos 1'30\"). Focus sur l'efficacité des bras dans le dernier virage.",
            "S10 (Puissance Aérobie) : Répétitions de 400m à 100% VMA (repos 1'30\"). Focus sur l'efficacité des bras dans le dernier virage.",
            "S11 (Puissance Aérobie) : Travail spécifique sur le 'Sprint final' : 600m à allure test + 200m accélération maximale.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ],
        elite: [
            "S4 (Capacité Aérobie) : Travail au seuil 2 x 10 min à 90% VMA.",
            "S5 (Capacité Aérobie) : Travail au seuil 2 x 10 min à 90% VMA.",
            "S6 (Capacité Aérobie) : Pyramide de capacité (400m - 800m - 1200m - 800m - 400m) à 90% VMA.",
            "S7 (Capacité Aérobie) : Pyramide de capacité (400m - 800m - 1200m - 800m - 400m) à 90% VMA.",
            "S8 (Puissance Aérobie) : Fractionné court intense : 200m à 110% VMA avec récupération très courte (45\").",
            "S9 (Puissance Aérobie) : Fractionné court intense : 200m à 110% VMA avec récupération très courte (45\").",
            "S10 (Puissance Aérobie) : Séance spécifique : 3 x 600m à 105% VMA (récupération complète).",
            "S11 (Puissance Aérobie) : Préparation mentale et tactique : simulation de départ rapide et gestion des dépassements.",
            "S12 (Évaluation) : Test Bilan final sur 1000m (G) / 600m (F)."
        ]
    },
    'Saut en hauteur': {
        commun: {
            S1: "Évaluer la technique de franchissement et la souplesse dorsale via des sauts à hauteur progressive.",
            S2: "Biomécanique du saut (Vitesse d'approche + Impulsion = Hauteur), règlement (3 essais, barre montante) et sécurité.",
            S12: "Concours à barres montantes. Validation de la progression technique et de la hauteur franchie."
        },
        debutant: [
            "Découvrir la course d'élan courbe et l'impulsion sur le pied extérieur.",
            "Travailler le franchissement ventral simple sans barre (saut sur plot).",
            "S'initier à la rotation dorsale (Fosbury-flop) sur tapis épais.",
            "Améliorer la souplesse du dos (pont, cambrures) pour faciliter le franchissement.",
            "Apprendre à synchroniser la course et l'impulsion.",
            "Travailler l'atterrissage sécurisé sur le dos dans le tapis.",
            "Comprendre le règlement : 3 essais par hauteur, barre montante.",
            "S'initier au rôle de juge : lever/baisser la barre et vérifier les touches.",
            "Test initial : franchissement à hauteur du genou puis de la taille."
        ],
        moyen: [
            "Stabiliser la course d'élan courbe avec 5-7 foulées régulières.",
            "Améliorer l'impulsion : bras et genou libre montent simultanément.",
            "Travailler la rotation dorsale complète : épaules, dos, hanches au-dessus de la barre.",
            "Optimiser l'esquive : jambes ramenées après le franchissement du dos.",
            "Travailler la concentration avant le départ (visualisation).",
            "Gérer le stress de la barre montante et des échecs.",
            "Analyser la technique : regarder la vidéo ou demander un retour.",
            "S'initier à la stratégie de concours : quand passer une hauteur.",
            "Concours blanc avec barres montantes de 5cm en 5cm."
        ],
        avance: [
            "Optimiser la vitesse d'approche sans perte de contrôle.",
            "Travailler l'impulsion explosive : griffé du sol et extension complète.",
            "Perfectionner la technique de l'esquive : jambes en ciseaux ou groupées.",
            "Maîtriser la réception enroulée pour amortir la chute.",
            "Travail spécifique de souplesse et de gainage pour la position en arc.",
            "Gestion mentale : rester concentré malgré les échecs.",
            "Analyser les erreurs : mordu, manque de vitesse, impulsion trop tôt.",
            "S'initier à la planification de la saison et aux cycles d'entraînement.",
            "Concours avec objectif de hauteur personnel à atteindre."
        ],
        elite: [
            "Maîtriser la course d'élan courbe à haute vitesse.",
            "Optimisation de l'impulsion : angle et puissance maximale.",
            "Technique avancée de l'esquive : rotation complète et rapide.",
            "Travail de pliométrie pour augmenter la puissance au sol.",
            "Gestion parfaite du stress compétitif et de la concentration.",
            "Stratégie de concours : gestion des essais et des hauteurs.",
            "Analyse vidéo détaillée et correction des micro-défauts.",
            "Préparation mentale et visualisation avant chaque saut.",
            "Compétition finale : recherche du record personnel."
        ]
    },
    'Tennis de table': {
        commun: {
            S1: "Évaluer la capacité à maintenir un échange, la qualité des frappes et la connaissance des règles.",
            S2: "Étude du règlement (service, comptage, fautes), prise de raquette et placement à la table.",
            S12: "Matchs de compétition avec évaluation technique et tactique des échanges."
        },
        debutant: [
            "Découvrir la prise de raquette orthodoxe (pouce et index en V).",
            "Apprendre le coup droit : frappe devant soi, bras accompagnant la balle.",
            "S'initier au revers : coude près du corps, frappe sur le côté gauche.",
            "Maintenir un échange de 5 à 10 frappes avec un partenaire.",
            "Découvrir le service : balle lancée verticalement, frappée derrière la table.",
            "Travailler le placement latéral : se déplacer pour frapper la balle.",
            "Comprendre le comptage des points et les changements de service.",
            "S'initier à l'arbitrage : compter les points et signaler les fautes.",
            "Matchs de découverte : focus sur la régularité des échanges."
        ],
        moyen: [
            "Améliorer la régularité du coup droit : précision et contrôle.",
            "Développer le revers : puissance et précision sur la table.",
            "Varier les placements : jouer droite, gauche, court, long.",
            "Travailler le service : variation de longueur et de trajectoire.",
            "S'initier aux effets : balle coupée et balle liftée.",
            "Apprendre le smash : frappe haute et puissante sur balle lobée.",
            "Travailler le bloc : interception rapide près du filet.",
            "Comprendre la tactique : déplacer l'adversaire pour créer l'espace.",
            "Tournoi interne : matchs au meilleur des 3 sets."
        ],
        avance: [
            "Maîtriser les effets : coupé, lifté, top-spin pour varier le jeu.",
            "Développer le service avec effet : rotation et trajectoire variées.",
            "Travailler le topspin : balle qui plonge après le rebond.",
            "Construire le point : service, 3ème balle, attaque.",
            "Maîtriser le contre-topspin sur balle attaquée.",
            "Travailler la défense : balle coupée défensive et lob.",
            "Gérer les changements de rythme : attaque/défense.",
            "Analyse tactique : identifier les points faibles de l'adversaire.",
            "Matchs compétitifs avec analyse des statistiques."
        ],
        elite: [
            "Optimisation technique de toutes les frappes.",
            "Maîtrise avancée des effets et des rotations.",
            "Service agressif avec effets variés et trajectoires imprévisibles.",
            "Jeu de pieds rapide et placement optimal à chaque frappe.",
            "Construction tactique complète du point.",
            "Gestion mentale : concentration et gestion du stress.",
            "Adaptation au style de jeu adverse en cours de match.",
            "Préparation physique spécifique (réflexes, déplacements).",
            "Compétition de haut niveau avec objectif de victoire."
        ]
    },
    'Badminton': {
        commun: {
            S1: "Évaluer la capacité à renvoyer le volant, les déplacements et la connaissance des règles.",
            S2: "Étude du règlement (service, comptage, fautes), prise de raquette et déplacements sur le terrain.",
            S12: "Matchs de compétition avec évaluation technique et tactique des échanges."
        },
        debutant: [
            "Découvrir la prise de raquette universelle.",
            "Apprendre le dégagé (clear) : frappe haute vers le fond du terrain.",
            "S'initier à l'amorti (drop shot) : frappe douce près du filet.",
            "Maintenir un échange de 5 à 10 frappes avec un partenaire.",
            "Découvrir le service : court et long selon la situation.",
            "Travailler les déplacements de base : pas chassés et fente.",
            "Comprendre le comptage des points (21 points, 2 points d'écart).",
            "S'initier à l'arbitrage : compter les points et signaler les fautes.",
            "Matchs de découverte : focus sur la régularité des échanges."
        ],
        moyen: [
            "Améliorer la précision du dégagé : fond de court et zones.",
            "Développer l'amorti : variation de hauteur et de placement.",
            "Apprendre le smash : frappe puissante et descendante.",
            "Varier les services : court, long, droit, revers.",
            "Travailler les déplacements : replacement rapide au centre.",
            "S'initier au drive : frappe plate et rapide.",
            "Comprendre la tactique : alterner jeu long et jeu court.",
            "Travailler la coordination avec un partenaire en double.",
            "Tournoi interne : matchs au meilleur des 3 sets."
        ],
        avance: [
            "Maîtriser le smash : puissance, précision et angles.",
            "Développer le smash sauté : saut et frappe simultanés.",
            "Varier les amortis : dissimulation et trajectoire.",
            "Travailler le service avec effet : trajectoire imprévisible.",
            "Maîtriser les déplacements rapides dans tous les coins.",
            "Construire le point : déplacer l'adversaire puis finir au smash.",
            "Gérer le double : communication et couverture du terrain.",
            "Analyse tactique : exploiter les faiblesses adverses.",
            "Matchs compétitifs avec stratégie de jeu."
        ],
        elite: [
            "Optimisation technique de toutes les frappes.",
            "Maîtrise avancée des effets et des déceptions.",
            "Smash explosif avec variation d'angles.",
            "Jeu de pieds rapide et anticipation des trajectoires.",
            "Construction tactique complète du point.",
            "Gestion mentale : concentration et gestion du stress.",
            "Adaptation au style de jeu adverse en cours de match.",
            "Préparation physique spécifique (explosivité, endurance).",
            "Compétition de haut niveau avec objectif de victoire."
        ]
    },
    'Course de haies': {
        commun: {
            S1: "Évaluer le niveau initial des élèves (coordination, rythme et confiance) pour diagnostiquer les besoins et constituer des groupes homogènes.",
            S2: "Comprendre la technique de franchissement des haies (jambe d'attaque, jambe d'esquive) et les règles de la course avec obstacles.",
            S12: "Mesurer la performance finale et comparer avec le test initial pour valider la progression technique."
        },
        debutant: [
            "Apprendre la posture de course : buste légèrement penché vers l'avant, bras en piston.",
            "Développer la coordination bras/jambes par des exercices de montée de genoux et talons-fesses.",
            "S'initier au franchissement de haies basses (30-40cm) sans crainte.",
            "Apprendre la technique de base : jambe d'attaque tendue, jambe d'esquive pliée vers l'arrière.",
            "Travailler le placement des appuis avant et après la haie.",
            "Améliorer le rythme de course entre les haies (3-5 foulées).",
            "S'initier au départ en position basse et à l'accélération vers la première haie.",
            "Apprendre à franchir la ligne d'arrivée sans ralentir.",
            "Pré-test chronométré avec gestion du stress du franchissement."
        ],
        moyen: [
            "Perfectionner la technique de franchissement (jambe d'attaque haute, jambe d'esquive rapide).",
            "Augmenter progressivement la hauteur des haies (50-60cm).",
            "Développer le rythme régulier entre les haies (3-5 foulées selon la distance).",
            "Améliorer la fluidité de la course enchaînant haies et phases de course.",
            "Travailler la vitesse d'approche et l'accélération après le franchissement.",
            "S'initier au réglage des haies selon la taille de l'élève.",
            "Apprendre à maintenir sa trajectoire droite dans son couloir.",
            "Chronométrage de sections : 1ère haie, entre haies, finish.",
            "Compétition interne : course chronométrée avec focus technique."
        ],
        avance: [
            "Optimiser la technique de franchissement pour maintenir la vitesse.",
            "Travailler la puissance du contact au sol avant et après la haie.",
            "Améliorer la fluidité de la transition haie-course-haie.",
            "Développer la vitesse de pointe entre les haies (résistance à la décélération).",
            "Apprendre à ajuster sa distance de prise d'appel selon la haie.",
            "Perfectionner le timing de la jambe d'esquive (rapidité du ramené).",
            "Analyse technique : utiliser la vidéo pour corriger les erreurs de franchissement.",
            "Gestion de la fatigue sur les dernières haies.",
            "Meeting d'athlétisme scolaire : recherche du record personnel."
        ],
        elite: [
            "Perfectionnement biomécanique du cycle de franchissement.",
            "Travail spécifique de la puissance explosive des membres inférieurs.",
            "Optimisation de la vitesse de franchissement (minimisation du temps de vol).",
            "Entraînement au départ avec pistolet et haies réglementaires.",
            "Travail de survitesse : course avec haies espacées ou en légère descente.",
            "Analyse de la fréquence gestuelle et de l'amplitude des foulées.",
            "Gestion mentale de la course : concentration sur chaque franchissement.",
            "Planification de l'affûtage avant les compétitions régionales/nationales.",
            "Test de performance en conditions réelles (vent, opposants de même niveau)."
        ]
    },
    'Course de relais': {
        commun: {
            S1: "Évaluer le niveau initial des élèves (réactivité, vitesse et coordination) pour diagnostiquer les besoins et constituer des groupes homogènes.",
            S2: "Comprendre les techniques de transmission du témoin (main à main), les règles de la zone de passage et les principes de travail collectif.",
            S12: "Mesurer la performance finale du relais et comparer avec le test initial pour valider la progression collective."
        },
        debutant: [
            "Apprendre la prise correcte du témoin (doigts fermement autour du tube).",
            "Développer la course avec témoin sans le faire tomber (bras tendu vers l'arrière).",
            "S'initier à la transmission stationnaire (récepteur immobile, transmetteur en course).",
            "Travailler la communication verbale (Maintenant !, Vas-y !).",
            "Améliorer la course en ligne droite sans oscillation du témoin.",
            "Apprendre à accélérer progressivement dans la zone de transmission.",
            "S'initier au rôle de chronométreur et d'observateur.",
            "Transmission en binôme sans perte du témoin sur 20m.",
            "Pré-test chronométré avec gestion du stress de la transmission."
        ],
        moyen: [
            "Perfectionner la transmission en mouvement (récepteur en course à vitesse réduite).",
            "Maîtriser la transmission sans ralentir (zone de passage optimisée).",
            "Développer la synchronisation entre les deux relayeurs.",
            "Travailler la course d'approche et la sortie de zone de transmission.",
            "Améliorer le maintien de la vitesse pendant la transmission.",
            "Apprendre à ajuster sa vitesse pour arriver au bon moment dans la zone.",
            "S'initier au relais en ligne avec 4 athletes.",
            "Transmission avec changement de main (gauche/droite).",
            "Compétition interne : relais 4x30m chronométrés."
        ],
        avance: [
            "Maîtriser la transmission à vitesse maximale sans perte du témoin.",
            "Optimiser le placement des mains pour une prise optimale du témoin.",
            "Développer la communication non-verbale (signes, regards) pour la synchronisation.",
            "Travailler le passage de relais sur distances variables (20m, 30m, 50m).",
            "Améliorer la transition entre les différentes zones de transmission.",
            "Perfectionner la sortie de zone pour maintenir la vitesse acquise.",
            "Apprendre à courir sa portion de relais à vitesse optimale.",
            "Gestion des relais en compétition : placement et préparation mentale.",
            "Meeting d'athlétisme scolaire : relais 4x60m avec chronométrage officiel."
        ],
        elite: [
            "Perfectionnement de la transmission express (moins de 0.1s de perte).",
            "Optimisation de la vitesse de passage dans la zone de transmission.",
            "Travail spécifique du premier et dernier relayeur (départ et finish).",
            "Analyse vidéo pour corriger les erreurs de synchronisation.",
            "Gestion mentale de la pression de compétition en relais.",
            "Entraînement au départ avec blocs et signaux de compétition.",
            "Planification stratégique des ordres de passage selon les profils.",
            "Relayage en conditions réelles (opposants, vent, stress).",
            "Test de performance en relais avec chronométrage précis."
        ]
    }
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

        // Récupérer les objectifs depuis la structure complète avec commun + niveaux
        const cycleData = OBJECTIFS_CYCLE[aps] || OBJECTIFS_CYCLE['Football'];
        
        // Construire le tableau d'objectifs selon la structure du cycle
        let objectifs = [];
        
        // S1: Évaluation diagnostique
        if (cycleData.commun && cycleData.commun.S1) {
            objectifs.push(cycleData.commun.S1);
        }
        
        // S2: Théorie/Règlement
        if (cycleData.commun && cycleData.commun.S2) {
            objectifs.push(cycleData.commun.S2);
        }
        
        // Séances d'apprentissage selon le niveau des élèves
        // Pour Gymnastique, utiliser le niveau scolaire (1AC, 2AC, etc.)
        let niveauKey = nivEleves;
        if (aps === 'Gymnastique' && ['1AC', '2AC', '3AC', 'TC', '1AB', '2AB'].includes(niveau)) {
            niveauKey = niveau;
        }
        
        const seancesNiveau = cycleData[niveauKey] || cycleData['moyen'] || cycleData['debutant'] || [];
        
        // Calculer combien de séances d'apprentissage on peut ajouter
        // nb - 3 car on a déjà S1, S2 et on garde la dernière pour S12
        const nbSeancesApprentissage = Math.max(0, nb - 3);
        
        if (seancesNiveau && seancesNiveau.length > 0) {
            // Répartir les séances disponibles sur le nombre demandé
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                const index = Math.floor(i * seancesNiveau.length / nbSeancesApprentissage);
                objectifs.push(seancesNiveau[Math.min(index, seancesNiveau.length - 1)]);
            }
        } else {
            // Fallback si pas de séances définies pour ce niveau
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
            }
        }
        
        // S12: Évaluation terminale
        if (cycleData.commun && cycleData.commun.S12) {
            objectifs.push(cycleData.commun.S12);
        }
        
        // S'assurer qu'on a exactement le nombre de séances demandé
        while (objectifs.length < nb) {
            objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
        }
        objectifs = objectifs.slice(0, nb);

        // Générer les lignes du tableau
        let rows = '';
        for (let i = 0; i < nb; i++) {
            let phase, phaseColor;
            if (i === 0) { phase = 'Éval. diagnostique'; phaseColor = '#f5f5f5'; }
            else if (i === nb - 1) { phase = 'Éval. terminale'; phaseColor = '#e8eef4'; }
            else if (i < nb / 3) { phase = 'Découverte'; phaseColor = '#fafafa'; }
            else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseColor = '#f5f5f5'; }
            else { phase = 'Consolidation'; phaseColor = '#fafafa'; }

            rows += `<tr>
                <td style="text-align:center;background:${phaseColor};font-size:7pt;font-weight:bold;border:1px solid #000;">${phase}</td>
                <td style="text-align:center;font-weight:bold;font-size:9pt;background:#f5f5f5;border:1px solid #000;">${i + 1}</td>
                <td style="font-size:7.5pt;padding:4px 6px;border:1px solid #000;line-height:1.3;">${objectifs[i]}</td>
            </tr>`;
        }

        // Couleurs pour le document Word/PDF (bleu marine)
        const WORD_COLOR_PRIMARY = '#1e3a5f';
        const WORD_COLOR_PRIMARY_LIGHT = '#e8eef4';
        const WORD_COLOR_SECONDARY = '#4a6fa5';
        const WORD_COLOR_ACCENT = '#f5f5f5';

        // Couleurs pour l'affichage site web (vert marocain)
        const COLOR_PRIMARY = '#006233'; // Vert principal
        const COLOR_PRIMARY_LIGHT = '#e8f5e9'; // Vert très clair
        const COLOR_SECONDARY = '#4a8b5c'; // Vert secondaire
        const COLOR_ACCENT = '#f5f5f5'; // Gris clair
        const COLOR_BEIGE = '#f5f5dc'; // Beige clair
        const COLOR_WHITE = '#ffffff'; // Blanc

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
.main-title{font-size:18pt;font-weight:bold;text-align:center;color:${COLOR_PRIMARY};margin:5px 0;border:none}
.sub-title{font-size:11pt;text-align:center;color:${COLOR_SECONDARY};margin:0 0 10px 0;border:none}
.section-header{background:#e8e8e8;font-weight:bold;text-align:center;font-size:7pt}
.cycle-header{background:${COLOR_PRIMARY};color:#fff;font-weight:bold;font-size:9pt;text-align:center;padding:6px}
.label-cell{background:#f5f5f5;font-weight:bold;font-size:7pt;width:12%}
.info-row td{border:none;font-size:8pt;padding:2px 5px}
.competences-cell{background:${COLOR_PRIMARY_LIGHT};font-size:6.5pt;line-height:1.3;padding:8px;border:1px solid ${COLOR_PRIMARY}}
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
<td style="width:10%;text-align:center;font-size:9pt;font-weight:bold;color:${COLOR_PRIMARY}">${aps}</td>
<td class="section-header" style="width:6%">NIVEAU</td>
<td style="width:6%;text-align:center;font-size:8pt">${niveau}</td>
<td class="section-header" style="width:8%">NIV. ÉLÈVES</td>
<td style="width:8%;text-align:center;font-weight:bold;color:${COLOR_PRIMARY}">${nivTxt}</td>
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
<td class="label-cell">COMPÉTENCES VISÉES</td>
<td class="competences-cell">
<b>Compétences visées par l'APS ${aps}:</b><br>
• Maîtriser les gestes techniques fondamentaux de l'APS<br>
• S'adapter aux différentes situations motrices proposées<br>
• Respecter les règles et faire preuve d'esprit sportif<br>
• Concevoir et réaliser des projets collectifs ou individuels
</td>
</tr>
<tr>
<td class="label-cell">SITUATION DE RÉFÉRENCE</td>
<td style="font-size:7.5pt;font-weight:bold;color:${COLOR_PRIMARY}">${sitRef}</td>
</tr>
</table>

<table>
<tr>
<td class="cycle-header" colspan="3">PROGRESSION PÉDAGOGIQUE DU CYCLE</td>
</tr>
<tr>
<th style="background:${COLOR_PRIMARY};color:#fff;width:15%;font-size:7pt;text-align:center">PHASE</th>
<th style="background:${COLOR_PRIMARY};color:#fff;width:5%;font-size:7pt;text-align:center">N°</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-size:7pt;text-align:center">OBJECTIF OPÉRATIONNEL DE LA SÉANCE</th>
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
    <div style="background:${COLOR_PRIMARY};color:white;padding:20px;border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0 0 8px 0;font-size:1.5rem;">📊 Projet de Cycle - ${aps}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>Niveau:</strong> ${niveau}</span>
            <span><strong>Niveau élèves:</strong> ${nivTxt}</span>
            <span><strong>Séances:</strong> ${nb}</span>
            <span><strong>Groupe:</strong> ${groupeAPS}</span>
        </div>
    </div>

    <div style="background:#f8f9fa;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 10px 0;font-size:0.95rem;">📋 Références officielles</h3>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTI:</strong> ${oti}</p>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTC:</strong> ${otc}</p>
        <div style="background:${COLOR_PRIMARY_LIGHT};padding:10px;border-radius:6px;margin:10px 0;border-left:3px solid ${COLOR_PRIMARY};">
            <p style="margin:0 0 5px 0;font-size:0.85rem;font-weight:bold;color:${COLOR_PRIMARY};">🎯 Compétences visées:</p>
            <p style="margin:0;font-size:0.8rem;line-height:1.4;">
                • Maîtriser les gestes techniques fondamentaux de l'APS ${aps}<br>
                • S'adapter aux différentes situations motrices proposées<br>
                • Respecter les règles et faire preuve d'esprit sportif<br>
                • Concevoir et réaliser des projets collectifs ou individuels
            </p>
        </div>
        <p style="margin:0;font-size:0.85rem;"><strong>Situation de référence:</strong> <span style="color:${COLOR_PRIMARY};font-weight:500;">${sitRef}</span></p>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
        <div style="background:${COLOR_PRIMARY};color:white;padding:12px;text-align:center;font-weight:bold;">
            PROGRESSION PÉDAGOGIQUE
        </div>
        <table style="width:100%;border-collapse:collapse;">
            <tr style="background:${COLOR_PRIMARY};color:white;">
                <th style="padding:10px;width:15%;font-size:0.8rem;">Phase</th>
                <th style="padding:10px;width:5%;font-size:0.8rem;">N°</th>
                <th style="padding:10px;font-size:0.8rem;">Objectif opérationnel</th>
            </tr>
            ${objectifs.map((obj, i) => {
                let phase, phaseBg, phaseColor;
                if (i === 0) { phase = 'Éval. diag.'; phaseBg = '#f5f5f5'; phaseColor = COLOR_PRIMARY; }
                else if (i === nb - 1) { phase = 'Éval. term.'; phaseBg = '#e8eef4'; phaseColor = COLOR_PRIMARY; }
                else if (i < nb / 3) { phase = 'Découverte'; phaseBg = '#fafafa'; phaseColor = COLOR_SECONDARY; }
                else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseBg = '#f5f5f5'; phaseColor = COLOR_PRIMARY; }
                else { phase = 'Consolidation'; phaseBg = '#fafafa'; phaseColor = COLOR_SECONDARY; }
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
