// ============================================================================
// BIBLIOTHÈQUE DE SITUATIONS PÉDAGOGIQUES POUR FICHES DE SÉANCE
// /api/data/situations_fiches.js
// ============================================================================
// Structure : SITUATIONS_FICHES[SPORT][OBJECTIF] = { echauffement, situation1, situation2, situation3, criteresRealisation, criteresReussite }
// Objectifs couverts : passe, tir, démarquage, defense, conduite, dribble, give-and-go, manchette, smash, service
// ============================================================================

const SITUATIONS_FICHES = {
    // ============================================================================
    // HANDBALL
    // ============================================================================
    'Handball': {
        'passe': {
            echauffement: 'Manipulation balle individuelle (2 min) : passe d\'épaule en place, rotation des poignets | Passes en binômes à 6m (3 min) : passe à terre précise, réception à deux mains | Jeu des 10 passes 4c2 (3 min) : conservation avec déplacement',
            situation1: {
                titre: 'Le carré de passe',
                but: 'Réaliser 10 passes consécutives sans interception en se déplaçant dans le carré',
                organisation: '4 attaquants vs 2 défenseurs, carré 12x12m, 1 ballon, chasubles',
                deroulement: 'Les 4 attaquants sont positionnés aux coins du carré. Les 2 défenseurs tentent d\'intercepter les passes. Les attaquants doivent se déplacer après chaque passe pour occuper un autre coin. Un point est marqué toutes les 10 passes réussies. Rotation des défenseurs toutes les 2 minutes.',
                consignes: 'Passe à terre tendue vers les mains du partenaire\nSe déplacer immédiatement après la passe\nAppeler la balle en levant les bras\nRegarder avant de passer (tête haute)',
                variantes: 'Simplifier : 5c1, passe en cloche autorisée | Complexifier : 4c3, 2 touches max, passe obligatoire en diagonale'
            },
            situation2: {
                titre: 'Match avec obligation de passe',
                but: 'Marquer un but après au moins 3 passes consécutives',
                organisation: '2 équipes de 5 joueurs, terrain 30x20m, 2 buts, 1 ballon',
                deroulement: 'Match en conditions réelles avec obligation de réaliser 3 passes avant de tirer. Un but marqué après 3 passes = 2 points. Un but sans les 3 passes = 1 point. Les défenseurs comptent à voix haute les passes. Arrêts fréquents pour feedback technique.',
                consignes: 'Compter les passes à haute voix\nPrivilégier la passe à terre\nSe démarquer avant de recevoir\nCommuniquer avec les coéquipiers',
                variantes: 'Simplifier : 2 passes obligatoires | Complexifier : 4 passes obligatoires, défense en zone'
            },
            criteresRealisation: '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine du receveur\n• Réception à deux mains, doigts écartés\n• Déplacement immédiat dans l\'espace libre après la passe',
            criteresReussite: '• 8 passes réussies sur 10 tentatives\n• Moins de 2 interceptions par période de 2 min\n• 70% des passes à terre (hauteur < genoux)\n• Temps moyen de possession > 15 secondes'
        },
        'tir': {
            echauffement: 'Tir en place face au but (2 min) : position pied d\'appui, bras lanceur | Tir en mouvement sans opposition (3 min) : 3 pas, impulsion, extension | Jeu des 7 mètres (3 min) : tirs rapides avec gardien',
            situation1: {
                titre: 'Circuit technique de tir',
                but: 'Enchaîner 5 tirs variés avec précision sur cibles',
                organisation: 'Par groupe de 4, 1 but, 5 plots cibles, 1 ballon par groupe',
                deroulement: 'Les élèves tournent sur 5 postes : 1) Tir en appui (pied opposé devant), 2) Tir en suspension (saut vertical), 3) Tir de l\'aile (angle fermé), 4) Tir de pivot (demi-tour rapide), 5) Tir rapide (reception-tir en 1 temps). 3 essais par poste, comptage des cibles touchées.',
                consignes: 'Pied d\'appui opposé au bras lanceur devant\nCoude haut au-dessus de l\'épaule\nRegard fixé sur la cible visée\nSuivre le tir après la frappe',
                variantes: 'Simplifier : Tir sans gardien, cibles grandes | Complexifier : Gardien actif, cibles plus petites, temps limité'
            },
            situation2: {
                titre: 'Match avec zones de tir',
                but: 'Marquer des buts en respectant les zones de tir imposées',
                organisation: '2 équipes de 5, terrain 30x20m, zones colorées (rouge=2pts, bleu=1pt), 1 gardien tournant',
                deroulement: 'Match où les buts marqués depuis la zone rouge (loin) valent 2 points, depuis la zone bleue (près) valent 1 point. Les élèves doivent varier leurs positions de tir. Rotation du gardien toutes les 3 minutes. Analyse des choix de tir.',
                consignes: 'Évaluer la distance avant de tirer\nUtiliser le tir en suspension près de la zone\nFeinter avant de tirer si marqué\nCoopérer pour créer des décalages',
                variantes: 'Simplifier : Zones plus grandes, pas de gardien | Complexifier : Zones plus petites, défense agressive'
            },
            criteresRealisation: '• Pied d\'appui stable et orienté vers le but\n• Bras lanceur avec coude au-dessus de l\'épaule\n• Extension complète du bras vers la cible\n• Impulsion verticale pour le tir en suspension',
            criteresReussite: '• 6 tirs cadrés sur 10 tentatives\n• 4 buts marqués sur 10 tirs (40%)\n• 3 tirs différents réussis sur les 5 proposés\n• Temps réception-tir < 2 secondes'
        },
        'démarquage': {
            echauffement: 'Déplacements sans ballon (2 min) : appels, feintes, changements de direction | Jeu du chat (3 min) : 1 chasseur, autres doivent éviter en se déplaçant | Passes avec démarquage (3 min) : recevoir en mouvement',
            situation1: {
                titre: 'Démarquage en 1 contre 1',
                but: 'Recevoir une passe en s\'étant démarqué de son défenseur',
                organisation: 'Par poste de 3 (1 passeur, 1 attaquant, 1 défenseur), zone 8x8m, 1 ballon',
                deroulement: 'L\'attaquant doit se démarquer du défenseur pour recevoir une passe du passeur. 3 types de démarquage à alterner : feinte de direction + changement, appel en profondeur + retour, décrochage dans le dos du défenseur. 5 réussites puis rotation des rôles.',
                consignes: 'Varier les types d\'appels (profondeur, largeur)\nAccélérer après la feinte\nCrier "ici!" au moment du démarquage réussi\nFixer le défenseur avant de partir',
                variantes: 'Simplifier : Défenseur passif, pas de marquage serré | Complexifier : Défenseur actif, temps limité 3 secondes pour recevoir'
            },
            situation2: {
                titre: 'Match avec consignes de démarquage',
                but: 'Marquer après un démarquage réussi en attaque placée',
                organisation: '2 équipes de 5, terrain 30x20m, attaque placée obligatoire avant le tir',
                deroulement: 'Match avec obligation de construire en attaque placée (pas de contre-attaque). Les attaquants doivent se démarquer pour recevoir. Point bonus si le but est marqué après un changement de direction du porteur de balle. Observation et feedback sur la qualité des démarquages.',
                consignes: 'S\'écarter pour créer des lignes de passe\nSe démarquer avant l\'arrivée du ballon\nVarier les appels (profondeur/largeur)\nAider le porteur de balle en m\'offrant',
                variantes: 'Simplifier : Supériorité numérique 6c4 | Complexifier : Défense en zone 6-0, temps limité 20s'
            },
            criteresRealisation: '• Accélération explosive après la feinte\n• Changement de direction franc et net\n• Appel vocal pour signaler la disponibilité\n• Réception orientée vers le jeu',
            criteresReussite: '• 7 démarquages réussis sur 10 tentatives\n• Réception du ballon dans les 3s après l\'appel\n• 4 buts marqués après démarquage sur 10 actions\n• Espace créé > 2 mètres avec le défenseur'
        },
        'defense': {
            echauffement: 'Déplacements défensifs (2 min) : pas chassés, recul, pivot | Position défensive en place (2 min) : bras écartés, genoux fléchis | 1c1 défensif (4 min) : empêcher la progression',
            situation1: {
                titre: 'Défense en 2 contre 2',
                but: 'Empêcher la progression vers la zone et provoquer une perte de balle',
                organisation: '2 défenseurs vs 2 attaquants, zone 15x12m avec ligne de fond, 1 ballon',
                deroulement: 'Les 2 attaquants doivent progresser vers la ligne de fond. Les 2 défenseurs doivent les empêcher de passer par un marquage individuel ou une défense collective. Si les attaquants atteignent la ligne = 1 point. Si les défenseurs récupèrent ou font sortir le ballon = 1 point. Rotation toutes les 2 minutes.',
                consignes: 'Se placer entre le ballon et le but\nBras écartés pour fermer les lignes de passe\nReculer en pas chassés face au porteur\nCommuniquer pour le switch si nécessaire',
                variantes: 'Simplifier : 2c1, défenseur supplémentaire | Complexifier : 2c3, travail en infériorité numérique'
            },
            situation2: {
                titre: 'Match avec focus défensif',
                but: 'Garder son adversaire à 0 but marqué pendant son temps de jeu',
                organisation: '2 équipes de 5, terrain 30x20m, match avec objectifs défensifs individuels',
                deroulement: 'Match classique avec un objectif défensif pour chaque joueur : marquer son adversaire direct. À chaque but encaissé par son adversaire, le défenseur perd 1 point. À chaque récupération ou interception, +1 point. Les défenseurs changent d\'adversaire toutes les 3 minutes. Classement défensif en fin de match.',
                consignes: 'Identifier et suivre son adversaire direct\nAnticiper les passes vers son adversaire\nProvoquer le tir difficile ou le mauvais passe\nRécupérer et transmettre rapidement au collectif',
                variantes: 'Simplifier : Défense en zone collective | Complexifier : Défense individuelle stricte avec switch interdit'
            },
            criteresRealisation: '• Position basse avec genoux fléchis (angle 90°)\n• Bras écartés à hauteur des épaules\n• Déplacement latéral en pas chassés\n• Regard alterné entre ballon et adversaire',
            criteresReussite: '• 5 récupérations ou interceptions sur 10 possessions adverses\n• Adversaire marqué : moins de 3 tirs cadrés\n• Temps de récupération < 3 secondes après perte\n• 80% des duels défensifs gagnés'
        }
    },

    // ============================================================================
    // FOOTBALL
    // ============================================================================
    'Football': {
        'conduite': {
            echauffement: 'Dribble linéaire (2 min) : conduite de balle en ligne droite, tête levée | Slalom lent (3 min) : conduite entre plots, changements de direction | Jeu du chat dribbleur (3 min) : conserver son ballon en zone limitée',
            situation1: {
                titre: 'Slalom chronométré avec opposition',
                but: 'Traverser le circuit de slalom le plus rapidement possible sans perdre le ballon',
                organisation: 'Par groupe de 4, circuit slalom 6 plots espacés de 2m, 1 défenseur mobile, 1 ballon par joueur',
                deroulement: 'Chaque joueur doit traverser le slalom avec son ballon. Un défenseur se déplace pour tenter de toucher les ballons (pas de tacle). Chronométrage du parcours. Si le ballon est touché ou sort du circuit, le joueur recommence. 3 essais par joueur, meilleur temps retenu.',
                consignes: 'Conduire le ballon avec l\'intérieur/extérieur du pied\nLever la tête pour voir le défenseur\nAdapter la vitesse à la proximité du défenseur\nProtéger le ballon avec son corps',
                variantes: 'Simplifier : Pas de défenseur, slalom plus large | Complexifier : 2 défenseurs, slalom plus serré, ballon à remettre au départ si perdu'
            },
            situation2: {
                titre: 'Match avec zones de conduite obligatoire',
                but: 'Marquer un but après avoir conduit le ballon dans une zone spécifique',
                organisation: '2 équipes de 5, terrain 40x25m, 3 zones de conduite marquées, 2 buts',
                deroulement: 'Match où un but ne compte que si le buteur a conduit le ballon dans une des 3 zones de conduite avant de tirer. Les zones sont positionnées sur les ailes et au centre. Cela oblige les joueurs à conduire le ballon et à varier les zones d\'attaque. Point bonus pour but après conduite > 10m.',
                consignes: 'Conduire le ballon dans l\'espace libre\nAccélérer après le contrôle\nProtéger le ballon si pressé\nChercher la zone de conduite avant de passer',
                variantes: 'Simplifier : Zones plus grandes, conduite de 5m suffisante | Complexifier : Zones plus petites, obligation de conduite + passe décisive'
            },
            criteresRealisation: '• Contact avec le ballon à chaque pas (petites touches)\n• Ballon proche du pied (< 50cm)\n• Tête levée, regard vers l\'avant\n• Utilisation des deux pieds pour conduire',
            criteresReussite: '• Parcours slalom < 10 secondes sans faute\n• 0 perte de balle sur 5 conduites en match\n• Distance de conduite moyenne > 8 mètres\n• Réussite > 80% des changements de direction'
        },
        'passe': {
            echauffement: 'Passes en binômes 5m (2 min) : intérieur du pied, réception orientée | Triangle de passes (3 min) : 3 joueurs, déplacement après la passe | Passes en mouvement (3 min) : recevoir en course, passe en avant',
            situation1: {
                titre: 'Le jeu des 4 carrés',
                but: 'Conserver le ballon en réalisant des passes précises entre les zones',
                organisation: '8 joueurs (4 équipes de 2), terrain divisé en 4 carrés 10x10m, 1 ballon, 1 défenseur par carré',
                deroulement: 'Les 4 équipes sont positionnées chacune dans un carré. Le ballon doit circuler entre les carrés par des passes. Les défenseurs tentent d\'intercepter. Si une passe est interceptée ou sort, l\'équipe qui a fait la faute échange avec les défenseurs. Comptage des passes réussies consécutives.',
                consignes: 'Passe avec l\'intérieur du pied\nRéception orientée vers la cible suivante\nCommuniquer avant de recevoir\nVarier les cibles de passe',
                variantes: 'Simplifier : 2 carrés seulement, passe en cloche autorisée | Complexifier : 2 touches max, obligation de passe en diagonale'
            },
            situation2: {
                titre: 'Match avec obligation de passe courte',
                but: 'Construire une action avec au moins 4 passes avant de tirer',
                organisation: '2 équipes de 5, terrain 40x25m, zones de construction marquées, 2 buts',
                deroulement: 'Match où un but ne compte que si l\'équipe a réalisé au moins 4 passes consécutives dans la zone de construction (moitié de terrain). Les défenseurs comptent les passes à voix haute. Si la chaîne de passes est coupée, le compteur repart à zéro. Point bonus pour 6 passes ou plus.',
                consignes: 'S\'offrir en permanence pour la passe\nJouer vers l\'avant quand possible\nPrivilégier la passe à terre\nSe regrouper après la perte du ballon',
                variantes: 'Simplifier : 2 passes suffisent | Complexifier : 6 passes obligatoires, 2 touches maximum'
            },
            criteresRealisation: '• Pied d\'appui placé à côté du ballon\n• Surface de contact : intérieur du pied\n• Trajectoire de passe rasante (< genoux)\n• Réception orientée vers le jeu',
            criteresReussite: '• 8 passes sur 10 atteignent le partenaire\n• 70% des passes jouées vers l\'avant\n• Temps de possession moyen > 20 secondes\n• Moins de 3 interceptions par période de 5 min'
        },
        'tir': {
            echauffement: 'Tir en place (2 min) : position, appui, frappe | Tir en mouvement sans gardien (3 min) : contrôle, préparation, frappe | Tirs sur cibles (3 min) : précision sur coins du but',
            situation1: {
                titre: 'Circuit technique de finition',
                but: 'Enchaîner 4 situations de tir différentes avec précision',
                organisation: 'Par groupe de 4, 1 but avec gardien, 4 postes de tir, 1 ballon par groupe',
                deroulement: 'Circuit de 4 postes : 1) Tir de face à 10m (précision), 2) Tir de l\'aile après conduite (angle fermé), 3) Tir en première intention après passe (vitesse d\'exécution), 4) Tir en pivot (demi-tour et frappe). 3 essais par poste, rotation toutes les 3 minutes. Comptage des buts et des cadrages.',
                consignes: 'Regard sur le but avant de frapper\nPied d\'appui placé à côté du ballon\nCoup de pied verrouillé (cheville ferme)\nSuivre le tir après la frappe',
                variantes: 'Simplifier : Sans gardien, cibles au sol | Complexifier : Gardien actif, temps limité 3 secondes pour tirer'
            },
            situation2: {
                titre: 'Match avec zones de valeur',
                but: 'Marquer des buts en visant les zones à points différents',
                organisation: '2 équipes de 5, terrain 40x25m, but avec zones colorées (coins=3pts, centre=1pt), gardien tournant',
                deroulement: 'Match classique où les buts marqués valent des points différents selon la zone touchée : 3 points pour les coins, 2 points pour les côtés, 1 point pour le centre. Cela encourage la précision dans le tir. Rotation du gardien toutes les 3 minutes. Classement par points.',
                consignes: 'Viser les coins si position centrale\nFrapper avant que le gardien ne sorte\nVarier les types de tir (puissance/placé)\nFeinter le gardien si face à face',
                variantes: 'Simplifier : Zones plus grandes, pas de gardien | Complexifier : Zones plus petites, temps limité pour tirer'
            },
            criteresRealisation: '• Pied d\'appui stable et orienté vers le but\n• Cheville verrouillée au moment du contact\n• Frappe au centre du ballon (tir ras)\n• Bras opposé équilibrant le geste',
            criteresReussite: '• 5 tirs cadrés sur 10 tentatives\n• 3 buts marqués sur 10 tirs (30%)\n• 2 zones différentes touchées sur 4 postes\n• Temps contrôle-tir < 2 secondes'
        },
        'defense': {
            echauffement: 'Déplacements défensifs (2 min) : pas chassés, recul, pivot | Position défensive (2 min) : genoux fléchis, bras écartés | Duel 1c1 (4 min) : empêcher la conduite',
            situation1: {
                titre: '2 contre 2 avec zones',
                but: 'Empêcher les attaquants de marquer ou de franchir la zone',
                organisation: '2 défenseurs vs 2 attaquants, zone 20x15m avec but, 1 ballon',
                deroulement: 'Les 2 attaquants doivent marquer dans le but. Les 2 défenseurs doivent les empêcher de tirer ou les chasser hors de la zone. Si les défenseurs récupèrent, ils doivent sortir le ballon de la zone. Rotation des rôles toutes les 2 minutes. Comptage des actions défensives réussies.',
                consignes: 'Un défenseur sur le porteur, l\'autre couvre\nSe placer entre le ballon et le but\nGuider l\'adversaire vers l\'extérieur\nTacler uniquement si sûr de réussir',
                variantes: 'Simplifier : 2c1 avec défenseur supplémentaire | Complexifier : 2c3 en infériorité numérique'
            },
            situation2: {
                titre: 'Match avec objectifs défensifs',
                but: 'Gagner le match en encaissant le moins de buts possible',
                organisation: '2 équipes de 5, terrain 40x25m, système de points défensifs et offensifs',
                deroulement: 'Match classique avec un système de points : +3 pour une victoire, +1 pour match nul, +1 pour clean sheet (0 but encaissé), +1 pour 3 récupérations consécutives. Cela valorise le travail défensif. Les équipes peuvent gagner sans marquer beaucoup de buts grâce à la solidité défensive.',
                consignes: 'Presser le porteur immédiatement\nRéduire les espaces entre les lignes\nCommuniquer pour le marquage\nRécupérer et constrir calmement',
                variantes: 'Simplifier : Défense en zone simple | Complexifier : Marquage individuel strict avec consignes de pressing'
            },
            criteresRealisation: '• Position basse (genoux fléchis, buste penché)\n• Distance de 1-2m avec l\'adversaire\n• Bras écartés pour fermer les lignes de passe\n• Déplacement latéral sans croiser les jambes',
            criteresReussite: '• 60% des duels défensifs gagnés\n• Moins de 3 tirs cadrés encaissés par match\n• 5 récupérations par joueur en 10 min\n• Temps de récupération < 4 secondes'
        }
    },

    // ============================================================================
    // BASKETBALL
    // ============================================================================
    'Basketball': {
        'dribble': {
            echauffement: 'Dribble statique (2 min) : main droite, main gauche, alternance | Dribble en mouvement (3 min) : avancer en dribblant, tête haute | Slalom dribble (3 min) : entre plots, changements de direction',
            situation1: {
                titre: 'Circuit technique de dribble',
                but: 'Traverser le circuit en respectant les consignes de dribble spécifiques',
                organisation: 'Par groupe de 4, circuit 4 postes (slalom, dribble rapide, changement main, dribble protection), 1 ballon par joueur',
                deroulement: 'Circuit de 4 postes : 1) Slalom entre 4 plots avec changement de main, 2) Dribble rapide sur 10m (main dominante), 3) Changement de main devant/soi tous les 2 pas, 4) Dribble de protection (protéger le ballon d\'un défenseur fictif). Chronométrage, 3 essais, meilleur temps.',
                consignes: 'Dribbler sans regarder le ballon\nProtéger le ballon avec le corps\nAccélérer après chaque changement\nGarder le ballon sous contrôle',
                variantes: 'Simplifier : Sans chronométrage, dribble libre | Complexifier : Avec défenseur qui met la pression, 2 touches max par main'
            },
            situation2: {
                titre: 'Match avec zones de dribble',
                but: 'Marquer un panier après avoir dribblé dans une zone spécifique',
                organisation: '2 équipes de 4, demi-terrain, 3 zones de dribble marquées, 1 panier',
                deroulement: 'Match où un panier ne compte que si le joueur a dribblé dans une des zones de construction avant de tirer ou de passer décisive. Les zones sont placées sur les ailes et au centre. Cela oblige les joueurs à utiliser le dribble de progression. Point bonus pour lay-up après dribble.',
                consignes: 'Dribbler vers l\'avant pour progresser\nChanger de main si défenseur présent\nArrêter le dribble au bon moment\nProtéger le ballon avant la passe ou le tir',
                variantes: 'Simplifier : Zones plus grandes, dribble court suffisant | Complexifier : Zones plus petites, obligation de dribble + tir'
            },
            criteresRealisation: '• Dribble avec les doigts, pas la paume\n• Ballon rebondit à hauteur de genou\n• Tête levée, regard vers le panier\n• Corps entre le ballon et le défenseur',
            criteresReussite: '• Circuit complété en < 20 secondes\n• 0 perte de balle sur 5 dribbles en match\n• 80% des dribbles sans regarder le ballon\n• Réussite > 70% des changements de main'
        },
        'passe': {
            echauffement: 'Passes en binômes (2 min) : poitrine, au-dessus tête, à terre | Triangle de passes (3 min) : déplacement après passe | Passes en mouvement (3 min) : recevoir en course',
            situation1: {
                titre: 'Le carré de passe avec pression',
                but: 'Réaliser 8 passes consécutives sans interception malgré la pression défensive',
                organisation: '4 attaquants aux coins d\'un carré 8x8m, 2 défenseurs au centre, 1 ballon',
                deroulement: 'Les 4 attaquants doivent faire circuler le ballon par des passes. Les 2 défenseurs au centre tentent d\'intercepter. Les attaquants peuvent se déplacer sur leur côté. Objectif : 8 passes consécutives = 1 point. Si interception, les rôles s\'inversent. Rotation toutes les 2 minutes.',
                consignes: 'Passe précise vers les mains du partenaire\nFaire feinte avant de passer\nVarier les types de passe\nCommuniquer avant la réception',
                variantes: 'Simplifier : 1 seul défenseur, carré plus grand | Complexifier : 3 défenseurs, 2 touches max, passe en 2 secondes'
            },
            situation2: {
                titre: 'Match avec obligation de passe décisive',
                but: 'Marquer un panier après une passe décisive (le marqueur n\'a pas dribblé)',
                organisation: '2 équipes de 4, demi-terrain, 1 panier, règle de passe décisive',
                deroulement: 'Match où un panier vaut 2 points classiquement, mais 3 points si le marqueur n\'a pas dribblé avant de tirer (passe décisive). Cela encourage la circulation du ballon et les passes vers les joueurs démarqués. Les défenseurs doivent anticiper les lignes de passe.',
                consignes: 'Circuler le ballon rapidement\nChercher le joueur démarqué\nPasse en anticipation du démarquage\nFeinter avant de passer si marqué',
                variantes: 'Simplifier : Passe décisive = 2 points (au lieu de 3) | Complexifier : Obligation de 3 passes avant de tirer'
            },
            criteresRealisation: '• Passe à deux mains, doigts écartés\n• Extension complète des bras vers la cible\n• Passe à hauteur de poitrine du receveur\n• Réception en position de triple menace',
            criteresReussite: '• 8 passes sur 10 atteignent le partenaire\n• 4 paniers après passe décisive sur 10 actions\n• Moins de 2 interceptions par période\n• Temps passe-réception < 1 seconde'
        },
        'tir': {
            echauffement: 'Tir en place (2 min) : position, équilibre, extension | Tir sans opposition (3 min) : après passe, après dribble | Lay-up (3 min) : pas de course, finition',
            situation1: {
                titre: 'Circuit de tir avec variétés',
                but: 'Enchaîner 4 types de tir différents avec précision',
                organisation: 'Par groupe de 4, 1 panier, 4 postes de tir, 1 ballon par groupe',
                deroulement: 'Circuit de 4 postes : 1) Tir en suspension (jump shot) à 3m, 2) Lay-up main extérieure après dribble, 3) Tir à l\'arrêt après passe, 4) Tir en pivot (demi-tour et shoot). 5 essais par poste, comptage des paniers. Rotation toutes les 4 minutes.',
                consignes: 'Position d\'équilibre (pieds écartés épaules)\nGenoux fléchis pour l\'impulsion\nExtension complète vers le panier\nSuivre le tir (main en cuillère)',
                variantes: 'Simplifier : Postes plus proches du panier | Complexifier : Avec défenseur passif, temps limité 3 secondes'
            },
            situation2: {
                titre: 'Match avec zones de points',
                but: 'Marquer le maximum de points en utilisant les zones de valeur',
                organisation: '2 équipes de 4, demi-terrain avec zones marquées (paint=1pt, extérieur=2pts, 3pts=3pts)',
                deroulement: 'Match classique avec un système de points par zone : 1 point dans la raquette (paint), 2 points à mi-distance, 3 points derrière la ligne. Cela encourage les joueurs à varier leurs tirs et à prendre des décisions tactiques. Match en 15 points.',
                consignes: 'Évaluer la position avant de tirer\nPrivilégier le tir ouvert\nTir en suspension si pressé\nAttaquer la raquette si extérieur fermé',
                variantes: 'Simplifier : 2 zones seulement | Complexifier : Obligation de marquer dans chaque zone pour gagner'
            },
            criteresRealisation: '• Position stable avec pieds écartés\n• Coude aligné avec le panier\n• Extension complète du bras de tir\n• Main de guidage sur le côté du ballon',
            criteresReussite: '• 50% de réussite sur les tirs à 3m\n• 4 lay-up réussis sur 5 tentatives\n• 2 zones différentes utilisées\n• 40% de réussite globale en match'
        },
        'give-and-go': {
            echauffement: 'Passes en mouvement (2 min) : couper après la passe | Dribble et passe (3 min) : conduire puis passer en course | Déplacements sans ballon (3 min) : appels, feintes',
            situation1: {
                titre: 'Passe et va en 3 contre 2',
                but: 'Marquer un panier en utilisant le passe et va (give and go)',
                organisation: '3 attaquants vs 2 défenseurs, demi-terrain, 1 ballon, chasubles',
                deroulement: 'Les 3 attaquants doivent marquer en utilisant obligatoirement le passe et va : un joueur passe à un coéquipier et coupe immédiatement vers le panier pour recevoir la balle en retour. Panier après passe et va = 3 points. Panier autrement = 1 point. Rotation des défenseurs toutes les 2 minutes.',
                consignes: 'Passer et couper immédiatement vers le panier\nAppeler la balle en levant les bras\nLe passeur doit attendre le retour\nAccélérer après la passe',
                variantes: 'Simplifier : 3c1, défenseur passif | Complexifier : 3c3 avec obligation de passe et va avant chaque tir'
            },
            situation2: {
                titre: 'Match avec bonus passe et va',
                but: 'Gagner le match en utilisant le passe et va comme arme principale',
                organisation: '2 équipes de 4, demi-terrain, système de points avec bonus',
                deroulement: 'Match classique où un panier classique vaut 2 points, mais un panier après passe et va vaut 4 points. Cela encourage fortement les joueurs à utiliser ce fondamental. Les défenseurs doivent anticiper les coupes après les passes. Match en 20 points.',
                consignes: 'Chercher le passe et va dès que possible\nVarier les directions de coupe (intérieur/extérieur)\nLe passeur doit être prêt à repasser\nCommuniquer pour le timing de la passe',
                variantes: 'Simplifier : Bonus de 3 points (au lieu de 4) | Complexifier : Obligation de passe et va pour marquer'
            },
            criteresRealisation: '• Coupe immédiate après la passe (pas d\'arrêt)\n• Trajectoire de coupe vers le panier\n• Appel vocal et visuel pour la balle\n• Réception en position de tir ou de nouveau passe et va',
            criteresReussite: '• 5 paniers après passe et va sur 10 tentatives\n• Temps passe-coupe < 1 seconde\n• 70% des passes suivies d\'une coupe\n• 0 marcher sur les réceptions en course'
        }
    },

    // ============================================================================
    // VOLLEYBALL
    // ============================================================================
    'Volleyball': {
        'manchette': {
            echauffement: 'Jonglage manchette individuel (2 min) : contrôle en l\'air | Manchette en binômes 3m (3 min) : passes précises | Manchette en mouvement (3 min) : recevoir et orienter',
            situation1: {
                titre: 'Réception vers cible',
                but: 'Réceptionner 8 balles consécutives vers la zone passeur',
                organisation: 'Par groupe de 4, 1 lanceur, 1 receveur, 2 défenseurs, zone 6x6m',
                deroulement: 'Le lanceur envoie des balles sur le receveur qui doit les renvoyer vers une zone cible (zone passeur) avec la manchette. Les défenseurs tentent d\'intercepter si la manchette est imprécise. Objectif : 8 manchettes consécutives vers la cible. Rotation des rôles toutes les 3 minutes.',
                consignes: 'Bras tendus et joints à l\'impact\nSe placer sous le ballon avant de frapper\nOrientation des épaules vers la cible\nGenoux fléchis pour l\'amorti',
                variantes: 'Simplifier : Lanceur statique, balles faciles | Complexifier : Lanceur mobile, balles plus difficiles, temps limité'
            },
            situation2: {
                titre: 'Match avec obligation de manchette',
                but: 'Construire l\'attaque avec une manchette de qualité en première touche',
                organisation: '2 équipes de 4, terrain 9x9m, filet à 2m, règle de construction',
                deroulement: 'Match où la première touche doit obligatoirement être une manchette (pas de touche haute en réception). Point bonus si la manchette amène le ballon dans la zone passeur (zone 3). Cela valorise la qualité de la réception. Les équipes alternent au service.',
                consignes: 'Anticiper la trajectoire du service\nSe déplacer sous le ballon\nManchette vers la zone 3 (passeur)\nCommuniquer "j\'ai!" avant la réception',
                variantes: 'Simplifier : Service lancé, pas de filet | Complexifier : Service smashé, filet réglementaire'
            },
            criteresRealisation: '• Bras tendus et joints à l\'impact\n• Contact au niveau du centre de gravité\n• Orientation du plan de frappe vers la cible\n• Amorti avec les jambes fléchies',
            criteresReussite: '• 7 manchettes sur 10 atteignent la zone passeur\n• 0 balles retombées sur le filet\n• Moins de 2 fautes de manchette (bras pliés) par set\n• Temps réception-passe < 3 secondes'
        },
        'passe': {
            echauffement: 'Touche haute en place (2 min) : position des mains, extension | Passe en binômes 3m (3 min) : précision, hauteur | Passe en mouvement (3 min) : recevoir et passer',
            situation1: {
                titre: 'Passe vers zones d\'attaque',
                but: 'Réaliser 6 passes exploitables vers les zones d\'attaque imposées',
                organisation: 'Par groupe de 4, 1 passeur, 1 lanceur, 2 attaquants, filet à 2m',
                deroulement: 'Le lanceur envoie des balles au passeur qui doit les remonter vers les attaquants positionnés dans des zones différentes (aile gauche, centre, aile droite). Les attaquants appellent leur zone. Objectif : 6 passes exploitables (hauteur et position). Rotation des rôles.',
                consignes: 'Mains en coupe au-dessus du front\nExtension complète vers la cible\nHauteur de passe 2-3m au-dessus du filet\nOrientation des appuis vers l\'attaquant',
                variantes: 'Simplifier : Zones proches, passe lente | Complexifier : Zones éloignées, passe rapide, défenseur qui gêne'
            },
            situation2: {
                titre: 'Construction en 3 touches',
                but: 'Marquer le point en construisant systématiquement en 3 touches',
                organisation: '2 équipes de 4, terrain 9x18m, filet à 2m, règle des 3 touches',
                deroulement: 'Match avec obligation de construire en 3 touches : 1) Manchette, 2) Passe, 3) Attaque. Point bonus si les 3 touches sont respectées. Si l\'équipe utilise moins de 3 touches, le point compte mais sans bonus. Cela apprend la construction collective.',
                consignes: 'Annoncer sa touche avant de frapper\nLa passe doit être haute et précise\nL\'attaquant doit attendre la passe\nCouvrir l\'attaquant après la passe',
                variantes: 'Simplifier : 2 touches minimum | Complexifier : Passe obligatoire en zone 3, attaque obligatoire en zone 4'
            },
            criteresRealisation: '• Mains en coupe, doigts écartés\n• Contact au-dessus du front\n• Extension complète vers la cible\n• Trajectoire en cloche (hauteur 3-4m)',
            criteresReussite: '• 6 passes exploitables sur 10 tentatives\n• Hauteur de passe entre 2.5m et 4m\n• 4 constructions 3 touches réussies sur 5\n• Précision : passe dans 1m de l\'attaquant'
        },
        'smash': {
            echauffement: 'Attaque sans ballon (2 min) : approche, impulsion, frappe | Smash sur balle lancée (3 min) : timing, bras tendu | Smash avec passeur (3 min) : coordination passeur/attaquant',
            situation1: {
                titre: 'Circuit technique d\'attaque',
                but: 'Enchaîner 4 types d\'attaque différents avec précision',
                organisation: 'Par groupe de 4, 1 passeur, 1 attaquant, 2 cibles, filet à 2m',
                deroulement: 'Circuit de 4 postes : 1) Smash de puissance (zone 4), 2) Smash de précision (viser une cible), 3) Tip (amorti au-dessus du bloc), 4) Attaque en zone 2 (aile droite). 5 essais par poste, comptage des attaques gagnantes. Rotation des rôles.',
                consignes: 'Approche en 3 pas (gauche-droite-gauche ou inverse)\nImpulsion verticale, bras en arc\nFrappe au point le plus haut\nRegard sur la zone visée',
                variantes: 'Simplifier : Sans filet, balle lancée | Complexifier : Avec filet, défenseur en opposition'
            },
            situation2: {
                titre: 'Match avec zones d\'attaque',
                but: 'Marquer des points en variant les zones et types d\'attaque',
                organisation: '2 équipes de 4, terrain 9x18m, filet à 2m, zones d\'attaque marquées',
                deroulement: 'Match où les points marqués valent différemment selon la zone et le type d\'attaque : smash puissance = 2 points, tip/amorti = 3 points, attaque de zone 2 = 2 points. Cela encourage les attaquants à varier leurs frappes et à utiliser le tip.',
                consignes: 'Lire la position du bloc adverse\nVarier les attaques (puissance/précision)\nUtiliser le tip si le bloc est haut\nCommuniquer avec le passeur',
                variantes: 'Simplifier : Pas de bloc, zones grandes | Complexifier : Bloc à 2, zones petites'
            },
            criteresRealisation: '• Approche en 3 pas régulière\n• Impulsion verticale maximale\n• Frappe au sommet de la trajectoire\n• Bras tendu, main ouverte',
            criteresReussite: '• 5 attaques gagnantes sur 10 tentatives\n• 2 types d\'attaque différents réussis\n• Hauteur de frappe > 2.5m au-dessus du filet\n• Précision : 60% dans la zone adverse'
        },
        'service': {
            echauffement: 'Service en place (2 min) : position, frappe, placement | Service vers cible (3 min) : précision sur zones | Service en série (3 min) : régularité et consistance',
            situation1: {
                titre: 'Service vers zones cibles',
                but: 'Réaliser 5 services dans les zones cibles sur 10 tentatives',
                organisation: 'Par groupe de 4, 1 serveur, 3 zones cibles marquées, filet à 2m',
                deroulement: 'Le serveur doit envoyer le ballon dans l\'une des 3 zones cibles du terrain adverse (fond gauche, fond droit, zone 1). 10 services par joueur, comptage des services réussis dans les zones. Rotation des zones à viser. Analyse de la régularité.',
                consignes: 'Position de profil ou de face selon le service\nFrappe au centre du ballon (service cuillère)\nOu frappe sous le ballon (service tennis)\nViser au-dessus du filet avec marge',
                variantes: 'Simplifier : Zones grandes, pas de filet | Complexifier : Zones petites, filet réglementaire, service sous pression'
            },
            situation2: {
                titre: 'Match avec rotation de service',
                but: 'Gagner ses points au service et construire après réception',
                organisation: '2 équipes de 4, terrain 9x18m, filet à 2m, rotation obligatoire',
                deroulement: 'Match avec rotation obligatoire après chaque point gagné au service. Chaque joueur doit servir. Point bonus si le service est gagnant direct (ace) ou si la réception adverse est mauvaise (passe impossible). Cela valorise le service comme arme offensive.',
                consignes: 'Varier les services (cuillère/tennis)\nViser les zones faibles de l\'adversaire\nPrendre son temps avant de servir\nSe replacer après le service',
                variantes: 'Simplifier : Service lancé autorisé | Complexifier : Service obligatoire tennis, zones précises'
            },
            criteresRealisation: '• Position stable avant le service\n• Frappe au centre ou sous le ballon\n• Trajectoire au-dessus du filet (hauteur 2-3m)\n• Retour rapide en position défensive',
            criteresReussite: '• 5 services réussis sur 10 (dans le terrain)\n• 2 services dans les zones cibles\n• 1 ace ou service gagnant\n• Moins de 3 fautes de filet ou pied'
        }
    },

    // ============================================================================
    // ATHLÉTISME - COURSE DE VITESSE
    // ============================================================================
    'Course de vitesse': {
        'départ': {
            echauffement: 'Course au ralenti 50m (2 min) : technique de course | Montées de genoux 30m (2 min) : amplitude | Talons-fesses 30m (2 min) : fréquence | Accélérations progressives 40m (4 min) : mise en vitesse',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (course, impulsion, suspension, réception), par groupe de 4 élèves',
                deroulement: 'Rotation sur les stations : 1) Course d\'élan marquée (5-7 pas), 2) Impulsion sur planche sans élan, 3) Exercices de réactivité au signal, 4) Franchissement ligne d\'arrivée. Chaque station = 3 min. Objectif : maîtriser les habiletés liées à la course de vitesse.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement, pas de chronométrage | Complexifier : Ajout d\'un relais par équipe'
            },
            situation2: {
                titre: 'Départ réactif au signal',
                but: 'Partir en moins de 0.3 seconde après le signal sonore',
                organisation: 'Par couloir de 1m de large, lignes de départ et d\'arrivée à 20m, sifflet ou claquoir',
                deroulement: 'Les élèves sont en position de départ (debout ou starting-blocks selon niveau). Au signal, ils doivent partir le plus vite possible et parcourir les 20m. Chronométrage du temps de réaction (départ au signal) et du temps sur 20m. 5 essais par élève, meilleur temps retenu.',
                consignes: 'Position de départ : un pied devant, genoux fléchis\nPoids du corps vers l\'avant\nRéaction immédiate au signal\nPremiers pas puissants et courts',
                variantes: 'Simplifier : Position debout, départ au compte à rebours | Complexifier : Starting-blocks, départ au pistolet, faux départ sanctionné'
            },
            situation3: {
                titre: 'Course complète avec chronométrage',
                but: 'Réaliser sa meilleure performance sur 60m (collège) ou 80m (lycée)',
                organisation: 'Piste avec couloirs délimités, starting-blocks ou position debout, chronomètres',
                deroulement: 'Course chronométrée sur la distance adaptée au niveau. Départ au signal, course dans son couloir, franchissement de la ligne d\'arrivée sans ralentir. 3 essais par élève avec récupération complète (5-8 min). Meilleur temps retenu. Analyse des phases de course.',
                consignes: 'Départ explosif les 10 premiers mètres\nCourse redressée progressivement\nMaintien de la vitesse maximale\nFranchir la ligne sans ralentir',
                variantes: 'Simplifier : Distance 40m, départ debout | Complexifier : Distance 100m, avec vent, compétition officielle'
            },
            criteresRealisation: '• Position de départ stable et équilibrée\n• Réaction immédiate au signal (< 0.3s)\n• Premiers pas courts et fréquents\n• Course redressée progressive (10-15m)',
            criteresReussite: '• Temps de réaction < 0.3 secondes\n• 20m en < 3.5 secondes (garçons) / < 4 secondes (filles)\n• 60m en < 8.5 secondes (G 3AC) / < 9.5 secondes (F 3AC)\n• Vitesse maximale maintenue sur 30m'
        },
        'technique': {
            echauffement: 'Course au ralenti avec focus bras (2 min) : amplitude | Course au ralenti avec focus jambes (2 min) : griffé | Montées de genoux (2 min) : fréquence et amplitude | Accélérations 30-30-30 (4 min) : technique en vitesse',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (bras, jambes, posture, foulée), par groupe de 4 élèves',
                deroulement: 'Rotation sur les stations : 1) Exercices de bras (piston, amplitude), 2) Exercices de jambes (montées genoux, talons-fesses), 3) Travail de la posture (buste, regard), 4) Exercices de foulée (fréquence, amplitude). Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station vidéo-feedback'
            },
            situation2: {
                titre: 'Analyse et correction technique',
                but: 'Améliorer un élément technique spécifique de sa course',
                organisation: 'Par groupe de 4, 1 couloir par élève, fiches d\'observation, vidéo (si possible)',
                deroulement: 'Chaque élève court 40m en étant filmé ou observé par un partenaire. Analyse des points à améliorer : bras, jambes, posture, foulée. L\'élève choisit un point à travailler et effectue 5 répétitions en se concentrant sur cet élément. Feedback entre pairs.',
                consignes: 'Bras : piston alterné, mains relâchées\nJambes : griffé du sol, genoux hauts\nPosture : buste droit, regard devant\nFoulée : fréquence et amplitude adaptées',
                variantes: 'Simplifier : Observation simple par le professeur | Complexifier : Analyse vidéo détaillée avec logiciel de chronophotographie'
            },
            situation3: {
                titre: 'Course avec contraintes techniques',
                but: 'Maintenir la technique malgré la fatigue et la vitesse',
                organisation: 'Piste 60m, plots de repère tous les 10m, chronomètres',
                deroulement: 'Course de 60m avec des contraintes techniques à respecter : passage sur la pointe des pieds, bras en piston, genoux montés. Un observateur par couloir évalue le respect des contraintes. Notation technique + temps. Coursenotée = (temps + note technique) / 2.',
                consignes: 'Maintenir la technique sur toute la distance\nNe pas se relâcher sur la fin\nFréquence de bras maintenue\nGriffé du sol jusqu\'au bout',
                variantes: 'Simplifier : 40m, 1 contrainte | Complexifier : 100m, 3 contraintes, avec vent'
            },
            criteresRealisation: '• Bras : mouvement de piston avant-arrière\n• Jambes : griffé actif du sol\n• Posture : buste légèrement penché vers l\'avant\n• Foulée : fréquence élevée, amplitude adaptée',
            criteresReussite: '• Note technique > 3.5/5\n• Fréquence de foulée > 4.5 pas/sec\n• Amplitude de foulée > 1.8m (G) / 1.6m (F)\n• Maintien de la posture sur 100% de la distance'
        },
        'fréquence': {
            echauffement: 'Course sur place rapide (2 min) : fréquence maximale | Montées de genoux rapides (2 min) : hauteur moyenne, vitesse élevée | Exercices de réactivité (2 min) : réaction au signal | Accélérations courtes (4 min) : 10-15m',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (course sur place, montées genoux, talons-fesses rapides, sprints courts), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course sur place rapide (fréquence max), 2) Montées de genoux rapides, 3) Talons-fesses rapides, 4) Sprints courts de 15m. Chaque station = 3 min. Focus sur la fréquence des appuis.',
                consignes: 'Respecter le temps à chaque station\nPrivilégier la fréquence à l\'amplitude\nGarder une cadence régulière\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un tempo sonore'
            },
            situation2: {
                titre: 'Travail de la fréquence de foulée',
                but: 'Augmenter le nombre d\'appuis par seconde',
                organisation: 'Piste avec plots espacés de 80cm, couloirs individuels',
                deroulement: 'Course sur 30m avec obligation de passer entre tous les plots (fréquence imposée). Chronométrage. Si l\'élève manque un plot, il recommence. Objectif : maintenir une fréquence > 4.5 pas/sec sur toute la distance.',
                consignes: 'Petits pas rapides\nNe pas sauter entre les plots\nBras actifs en phase avec les jambes\nRegard vers l\'avant',
                variantes: 'Simplifier : Plots espacés de 1m | Complexifier : Plots espacés de 60cm'
            },
            situation3: {
                titre: 'Course de vitesse avec contrainte de fréquence',
                but: 'Réaliser sa meilleure performance en maintenant une fréquence élevée',
                organisation: 'Piste avec couloirs délimités, starting-blocks ou position debout, chronomètres',
                deroulement: 'Course chronométrée sur 60m avec objectif de fréquence (comptage des pas). L\'élève doit réaliser au minimum 25 pas sur 60m. Analyse du rapport temps/fréquence après la course.',
                consignes: 'Maintenir la fréquence jusqu\'au bout\nNe pas allonger la foulée en fin de course\nBras actifs jusqu\'à la ligne\nFranchir la ligne sans ralentir',
                variantes: 'Simplifier : Objectif 22 pas sur 60m | Complexifier : Objectif 28 pas sur 60m'
            },
            criteresRealisation: '• Contact rapide avec le sol\n• Pas de saut vertical inutile\n• Bras synchronisés avec les jambes\n• Maintien de la fréquence sur toute la distance',
            criteresReussite: '• Fréquence > 4.5 pas/sec sur 60m\n• 60m en < 9 secondes (F) / < 8 secondes (G)\n• Moins de 10% de variation de fréquence entre début et fin\n• Technique de bras maintenue'
        },
        'amplitude': {
            echauffement: 'Grands enjambements (2 min) : amplitude maximale | Exercices d\'extension (2 min) : grandissement du geste | Accélérations progressives (3 min) : mise en amplitude | Bondissements (3 min) : élévation',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (enjambements, bondissements, exercices d\'extension, sprints amplitude), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Grands enjambements sur 20m, 2) Bondissements alternés, 3) Exercices d\'extension de jambe, 4) Sprints avec focus amplitude. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nPrivilégier l\'amplitude à la vitesse\nOuvrir au maximum l\'angle de jambe\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'obstacles à franchir'
            },
            situation2: {
                titre: 'Travail de l\'amplitude de foulée',
                but: 'Augmenter la longueur des foulées',
                organisation: 'Piste avec plots espacés de 2m, couloirs individuels',
                deroulement: 'Course sur 50m avec obligation de passer sur tous les plots (amplitude imposée). Chronométrage. Si l\'élève manque un plot, il recommence. Objectif : maintenir une amplitude > 1.8m (G) / 1.6m (F).',
                consignes: 'Grands pas avec extension complète\nPousser fort sur la jambe d\'appui\nBras amplifiés en phase avec les jambes\nRegard vers l\'avant',
                variantes: 'Simplifier : Plots espacés de 1.5m | Complexifier : Plots espacés de 2.2m'
            },
            situation3: {
                titre: 'Course de vitesse avec contrainte d\'amplitude',
                but: 'Réaliser sa meilleure performance en optimisant l\'amplitude',
                organisation: 'Piste avec couloirs délimités, starting-blocks ou position debout, chronomètres',
                deroulement: 'Course chronométrée sur 60m avec objectif d\'amplitude (comptage des pas). L\'élève doit réaliser au maximum 32 pas sur 60m. Analyse du rapport temps/amplitude après la course.',
                consignes: 'Ouvrir la foulée progressivement\nMaintenir l\'amplitude jusqu\'au bout\nNe pas raccourcir en fin de course\nFranchir la ligne sans ralentir',
                variantes: 'Simplifier : Objectif 35 pas sur 60m | Complexifier : Objectif 28 pas sur 60m'
            },
            criteresRealisation: '• Extension complète de la jambe d\'appui\n• Amplitude des bras synchronisée\n• Pas de raccourcissement en fin de course\n• Maintien de la posture',
            criteresReussite: '• Amplitude > 1.8m (G) / > 1.6m (F)\n• 60m en < 9 secondes (F) / < 8 secondes (G)\n• Moins de 32 pas sur 60m (G)\n• Technique de course maintenue'
        }
    },

    // ============================================================================
    // ATHLÉTISME - COURSE DE HAIES
    // ============================================================================
    'Course de haies': {
        'franchissement': {
            echauffement: 'Course au ralenti avec haies basses (2 min) : franchissement | Exercices de jambes (2 min) : jambe d\'attaque, jambe d\'esquive | Franchissements lents (3 min) : technique sans vitesse | Accélérations entre 2 haies (3 min) : reprise d\'appui',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (jambe d\'attaque, jambe d\'esquive, franchissement ralenti, reprise d\'appui), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Exercices de jambe d\'attaque (genou haut, extension), 2) Exercices de jambe d\'esquive (ouverture latérale), 3) Franchissements ralentis sur haie basse, 4) Reprises d\'appui actives. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station timing'
            },
            situation2: {
                titre: 'Circuit technique de franchissement',
                but: 'Enchaîner 5 franchissements avec technique correcte',
                organisation: 'Piste avec 5 haies espacées de 7-8m, hauteur adaptée (50-60cm), couloirs',
                deroulement: 'Course sur 40m haies avec 5 obstacles. Focus sur la technique : jambe d\'attaque (genou haut, extension), jambe d\'esquive (ouverture latérale), reprise d\'appui active. Chronométrage + observation technique. 3 essais, meilleur temps avec technique correcte.',
                consignes: 'Attaquer la haie loin devant\nJambe d\'attaque : genou haut puis extension\nJambe d\'esquive : ouvrir sur le côté\nReprise d\'appui immédiate et active',
                variantes: 'Simplifier : Haies plus basses, espacement 8m | Complexifier : Haies officielles, espacement 7m, 3 pas obligatoires'
            },
            situation3: {
                titre: 'Course complète chronométrée',
                but: 'Réaliser sa meilleure performance sur 40m ou 60m haies',
                organisation: 'Piste haies avec couloirs, starting-blocks ou position debout, chronomètres',
                deroulement: 'Course chronométrée sur la distance adaptée (40m collège, 60m lycée). Départ au signal, franchissement des haies en respectant le rythme de 3 pas entre chaque haie. 3 essais avec récupération complète. Analyse du nombre de pas entre les haies et de la régularité.',
                consignes: 'Départ explosif jusqu\'à la première haie\nRythme de 3 pas entre les haies\nNe pas ralentir avant l\'obstacle\nSprint final après la dernière haie',
                variantes: 'Simplifier : 30m haies, pas de contrainte de rythme | Complexifier : 60m haies officiel, avec vent'
            },
            criteresRealisation: '• Jambe d\'attaque : genou monté puis extension\n• Jambe d\'esquive : ouverture latérale rapide\n• Reprise d\'appui : griffé immédiat du sol\n• Trajectoire : rasante, sans saut en hauteur',
            criteresReussite: '• 0 haie renversée sur la course\n• Rythme de 3 pas respecté sur 80% des haies\n• 40m haies en < 7 secondes (G) / < 8 secondes (F)\n• Maintien de la vitesse entre les haies'
        },
        'rythme': {
            echauffement: 'Course au ralenti avec haies (2 min) : régularité | Exercices de pas (2 min) : compter les appuis | Accélérations avec haies (3 min) : rythme régulier | Franchissements rapides (3 min) : vitesse',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (comptage des pas, franchissement rythmé, accélération entre haies, sprint final), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Compter les pas entre 2 haies, 2) Franchissement avec rythme imposé (3 pas), 3) Accélération entre 2 haies, 4) Sprint final après dernière haie. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nCompter les pas à voix haute\nMaintenir un rythme régulier\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un métronome'
            },
            situation2: {
                titre: 'Travail du rythme de 3 pas',
                but: 'Automatiser le rythme de 3 pas entre les haies',
                organisation: 'Piste avec 3 haies espacées de 7-8m, couloirs individuels',
                deroulement: 'Course répétée sur 3 haies avec focus sur le rythme de 3 pas. Un observateur compte les pas à voix haute. Objectif : arriver sur la jambe d\'attaque devant chaque haie. 5 répétitions avec récupération.',
                consignes: 'Compter : un-deux-trois-saute\nJambe d\'attaque devant la haie\nNe pas ralentir avant de franchir\nReprise d\'appui immédiate',
                variantes: 'Simplifier : 5 pas autorisés | Complexifier : Rythme de 3 pas sur haies officielles'
            },
            situation3: {
                titre: 'Course avec objectif de régularité',
                but: 'Réaliser une course régulière avec rythme constant',
                organisation: 'Piste haies complète avec couloirs, chronomètres',
                deroulement: 'Course chronométrée avec objectif de régularité. Mesure des temps intermédiaires entre les haies. Objectif : écarts < 10% entre les temps de passage. Analyse de la régularité après chaque course.',
                consignes: 'Maintenir le même rythme du début à la fin\nNe pas accélérer avant les haies\nFranchir chaque haie de la même façon\nSprint final après la dernière haie',
                variantes: 'Simplifier : 3 haies seulement | Complexifier : 8 haies avec objectif de régularité stricte'
            },
            criteresRealisation: '• Rythme de 3 pas respecté\n• Régularité des franchissements\n• Pas d\'accélération avant les haies\n• Maintien de la vitesse entre les haies',
            criteresReussite: '• Rythme de 3 pas sur 90% des haies\n• Écart de temps < 10% entre les passages\n• 0 haie renversée\n• Vitesse finale maintenue'
        }
    },

    // ============================================================================
    // ATHLÉTISME - COURSE DE RELAIS
    // ============================================================================
    'Course de relais': {
        'transmission': {
            echauffement: 'Course avec témoin individuelle (2 min) : tenue du témoin | Transmission à l\'arrêt (2 min) : technique de passage | Transmission en mouvement lent (3 min) : synchronisation | Accélérations 30m (3 min) : vitesse',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (tenue du témoin, transmission à l\'arrêt, synchronisation, accélération), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Tenue du témoin en course, 2) Transmission à l\'arrêt (technique), 3) Synchronisation donneur/receveur, 4) Accélération sur 20m. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station timing'
            },
            situation2: {
                titre: 'Travail de la transmission',
                but: 'Réaliser 5 transmissions réussies consécutives en mouvement',
                organisation: 'Par binôme, zone de transmission 20m (entre 20m et 40m), 1 témoin, lignes de repère',
                deroulement: 'Le donneur court les 60m et doit transmettre le témoin au receveur dans la zone de passage (20m-40m). Le receveur démarre à la marque de repère (5-7m avant la zone). Travail de la transmission visuelle puis non-visuelle. 5 transmissions par rôle, comptage des réussites.',
                consignes: 'Donneur : maintenir la vitesse jusqu\'au bout du bras\nReceveur : regarder le donneur, tendre la main en arrière\nSignal vocal "hand!" au moment de la transmission\nTransmission dans la zone de 20m',
                variantes: 'Simplifier : Transmission à l\'arrêt, marque au sol | Complexifier : Vitesse maximale, transmission non-visuelle'
            },
            situation3: {
                titre: 'Course de relais complète',
                but: 'Réaliser la meilleure performance en binôme sur 2x30m',
                organisation: 'Piste avec zones de transmission délimitées, 2 couloirs par équipe, chronomètres',
                deroulement: 'Course chronométrée en binôme : 1er relayeur 30m, transmission, 2ème relayeur 30m. Objectif : réaliser la meilleure performance collective. 3 essais par binôme avec récupération. Analyse du gain ou de la perte de temps à la transmission.',
                consignes: 'Départ réactif du 1er relayeur\nAccélération du receveur avant la transmission\nTransmission au bout du bras tendu\nSprint jusqu\'au bout sans ralentir',
                variantes: 'Simplifier : 2x20m, transmission à l\'arrêt | Complexifier : 2x50m, avec opposition dans le couloir voisin'
            },
            criteresRealisation: '• Donneur : bras tendu, témoin bien en main\n• Receveur : main en arrière, paume vers le haut\n• Transmission dans la zone réglementaire\n• Aucun ralentissement lors du passage',
            criteresReussite: '• 100% de transmissions réussies (pas de chute)\n• Transmission dans la zone de 20m\n• 2x30m en < 9 secondes (G) / < 10 secondes (F)\n• Gain de temps à la transmission (pas de perte)'
        },
        'synchronisation': {
            echauffement: 'Course avec témoin (2 min) : tenue en course | Exercices de départ (2 min) : réaction au signal | Travail des marques (2 min) : placement du receveur | Accélérations (4 min) : vitesse',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (tenue du témoin, départ, placement receveur, accélération), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Tenue du témoin en course, 2) Départ réactif au signal, 3) Placement du receveur (marque au sol), 4) Accélération sur 20m. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un chronométrage'
            },
            situation2: {
                titre: 'Travail de la synchronisation',
                but: 'Optimiser le timing entre donneur et receveur',
                organisation: 'Par binôme, zone de transmission, marques au sol, chronomètre',
                deroulement: 'Le receveur doit partir au bon moment pour recevoir le témoin en pleine course. Travail sur la marque de départ du receveur. Ajustement progressif de la marque selon la vitesse du donneur. Objectif : transmission fluide sans ralentissement.',
                consignes: 'Receveur : partir quand le donneur franchit la marque\nDonneur : crier "hand!" au moment de donner\nMaintenir la vitesse pendant la transmission\nBras tendu pour le passage',
                variantes: 'Simplifier : Marque fixe | Complexifier : Marque ajustée selon niveau'
            },
            situation3: {
                titre: 'Relais compétitif',
                but: 'Réaliser la meilleure performance en compétition',
                organisation: 'Piste avec 2 couloirs, zones de transmission, chronomètres officiels',
                deroulement: 'Compétition en binômes avec 3 essais. Classement selon le temps réalisé. Analyse vidéo des transmissions pour identifier les points d\'amélioration. Récompense du binôme le plus régulier et du binôme le plus rapide.',
                consignes: 'Concentration maximale avant le départ\nRespecter la procédure de transmission\nSprint jusqu\'à la ligne d\'arrivée\nAnalyser sa performance après la course',
                variantes: 'Simplifier : 1 essai par binôme | Complexifier : Finale avec les 4 meilleurs binômes'
            },
            criteresRealisation: '• Départ réactif du receveur\n• Timing parfait de la transmission\n• Pas de ralentissement au passage\n• Vitesse maintenue jusqu\'à l\'arrivée',
            criteresReussite: '• Transmission fluide sans à-coup\n• Temps total optimisé\n• 0 faute de zone\n• Amélioration entre le 1er et 3ème essai'
        }
    },

    // ============================================================================
    // ATHLÉTISME - SAUT EN LONGUEUR
    // ============================================================================
    'Saut en longueur': {
        'impulsion': {
            echauffement: 'Course d\'élan marquée (2 min) : régularité des foulées | Sauts sans élan (3 min) : impulsion verticale | Sauts avec élan réduit (3 min) : coordination course-impulsion | Sauts complets (2 min) : technique globale',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (course d\'élan, impulsion, suspension, réception), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course d\'élan marquée (5-7 pas), 2) Impulsion sur planche sans élan, 3) Exercices de suspension (ramené), 4) Réception dans le sable. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station vidéo'
            },
            situation2: {
                titre: 'Travail de l\'impulsion',
                but: 'Réaliser une impulsion efficace avec décollage sur la planche',
                organisation: 'Piste d\'élan avec planche d\'appel, fosse, 1 couloir par élève, marques d\'élan',
                deroulement: 'Sauts avec élan réduit (5-7 pas) en se concentrant sur l\'impulsion : griffé du dernier appui, extension complète de la jambe d\'appel, montée des bras, projection du bassin. 5 essais par élève. Observation de la position du décollage (sur, avant, après la planche).',
                consignes: 'Griffer le sol sur le dernier appui\nJambe d\'appel complètement étendue au décollage\nBras montés vers le haut simultanément\nBassin projeté vers l\'avant et le haut',
                variantes: 'Simplifier : Sans élan, saut depuis la planche | Complexifier : Élan complet, barre d\'appel à franchir'
            },
            situation3: {
                titre: 'Concours de saut en longueur',
                but: 'Réaliser sa meilleure performance sur 3 essais',
                organisation: 'Aire de saut complète avec couloirs, planche, fosse, règle de mesure',
                deroulement: 'Concours avec 3 essais mesurés par élève. Course d\'élan libre (12-16 pas), impulsion sur la planche, phase de vol, réception dans le sable. Respect des règles (pas de mordu, départ derrière la planche). Meilleure performance retenue. Classement.',
                consignes: 'Course d\'élan progressive et régulière\nImpulsion sur la planche sans la dépasser\nPhase de vol : ramené des jambes\nRéception sur les deux pieds, jambes fléchies',
                variantes: 'Simplifier : Élan réduit, pas de mesure officielle | Complexifier : Concours officiel avec élimination après 3 échecs'
            },
            criteresRealisation: '• Course d\'élan : régulière et accélérée\n• Impulsion : griffé actif, extension complète\n• Phase de vol : ramené des jambes vers la poitrine\n• Réception : deux pieds simultanés, jambes fléchies',
            criteresReussite: '• 0 mordu sur les 3 essais\n• Distance > 4m (G 3AC) / > 3.5m (F 3AC)\n• Réception stable sans chute arrière\n• Impulsion sur la planche (pas avant/après)'
        },
        'course élan': {
            echauffement: 'Course d\'élan marquée (3 min) : régularité | Accélérations progressives (3 min) : mise en vitesse | Exercices de marques (2 min) : placement | Sauts complets (2 min) : technique',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (course marquée, accélération, placement marques, enchaînement), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course d\'élan avec marques au sol, 2) Accélération progressive, 3) Placement des marques personnelles, 4) Enchaînement course-impulsion sans saut. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nCompter ses foulées\nPlacer ses marques précisément\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un chronométrage de la course'
            },
            situation2: {
                titre: 'Travail de la course d\'élan',
                but: 'Optimiser la régularité et la vitesse de la course d\'élan',
                organisation: 'Piste d\'élan avec marques au sol, couloirs individuels',
                deroulement: 'Travail sur la course d\'élan avec marques personnelles. Objectif : arriver sur la planche à vitesse maximale sans ralentir. Ajustement des marques selon la vitesse. Chronométrage des 6 dernières foulées.',
                consignes: 'Course progressive et accélérée\nNe pas ralentir avant la planche\nRegarder la zone d\'appel en fin d\'élan\nDerniers pas actifs',
                variantes: 'Simplifier : Élan court (5 pas) | Complexifier : Élan long (16 pas) avec marques optimisées'
            },
            situation3: {
                titre: 'Concours avec focus course d\'élan',
                but: 'Réaliser sa meilleure performance avec une course d\'élan optimale',
                organisation: 'Aire de saut complète avec couloirs, planche, fosse, chronomètre',
                deroulement: 'Concours avec analyse de la course d\'élan. Mesure du temps des 10 derniers mètres. Objectif : correlation entre vitesse d\'élan et distance de saut. 3 essais avec ajustement des marques si nécessaire.',
                consignes: 'Vitesse maximale sur la planche\nCourse régulière sans à-coup\nAjustement des marques si besoin\nConcentration avant chaque essai',
                variantes: 'Simplifier : Pas d\'analyse de vitesse | Complexifier : Analyse vidéo de la course d\'élan'
            },
            criteresRealisation: '• Course régulière et accélérée\n• Vitesse maximale sur la planche\n• Pas de ralentissement avant l\'impulsion\n• Marques respectées',
            criteresReussite: '• Vitesse d\'élan > 7 m/s sur les 10 derniers mètres\n• Distance > 4m (G) / > 3.5m (F)\n• 0 mordu sur les 3 essais\n• Amélioration de la distance entre essais'
        },
        'suspension': {
            echauffement: 'Sauts sans élan (2 min) : impulsion | Exercices de ramené (3 min) : technique | Sauts avec élan réduit (3 min) : coordination | Sauts complets (2 min) : technique globale',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (impulsion, ramené, extension, réception), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Impulsion verticale, 2) Exercices de ramené (genoux-poitrine), 3) Exercices d\'extension, 4) Réception dans le sable. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'obstacles à franchir'
            },
            situation2: {
                titre: 'Travail de la suspension',
                but: 'Améliorer la technique de suspension (ramené)',
                organisation: 'Aire de saut avec planche, fosse, couloirs individuels',
                deroulement: 'Sauts avec focus sur la phase de suspension. Travail du ramené : genoux montés vers la poitrine, buste penché vers l\'avant. Exercices au sol puis en saut. Observation de la position en l\'air.',
                consignes: 'Monter les genoux vers la poitrine\nBassin projeté vers l\'avant\nBuste penché vers l\'avant\nPréparation à la réception',
                variantes: 'Simplifier : Exercices au sol seulement | Complexifier : Saut avec obstacle à franchir'
            },
            situation3: {
                titre: 'Concours avec focus suspension',
                but: 'Réaliser sa meilleure performance avec une suspension optimale',
                organisation: 'Aire de saut complète avec couloirs, planche, fosse, observateurs',
                deroulement: 'Concours avec évaluation de la suspension. Notation technique de la phase de vol. Objectif : association vitesse d\'élan + qualité de suspension = distance maximale. 3 essais avec feedback après chaque saut.',
                consignes: 'Ramené actif et rapide\nPosition aérienne stable\nPréparation précoce à la réception\nExtension avant l\'atterrissage',
                variantes: 'Simplifier : Pas de notation technique | Complexifier : Notation détaillée de la suspension'
            },
            criteresRealisation: '• Genoux montés vers la poitrine\n• Bassin projeté vers l\'avant\n• Buste penché\n• Préparation à la réception',
            criteresReussite: '• Note technique de suspension > 3/5\n• Distance > 4m (G) / > 3.5m (F)\n• Réception stable\n• Amélioration de la technique entre essais'
        },
        'réception': {
            echauffement: 'Exercices de réception (3 min) : chute avant | Exercices de souplesse (2 min) : grandissement | Sauts avec élan réduit (3 min) : réception | Sauts complets (2 min) : technique globale',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (chute avant, souplesse, réception deux pieds, roulé), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Exercices de chute avant, 2) Exercices de souplesse, 3) Réception sur deux pieds, 4) Technique du roulé. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un tapis de réception'
            },
            situation2: {
                titre: 'Travail de la réception',
                but: 'Améliorer la technique de réception dans le sable',
                organisation: 'Fosse avec sable, planche d\'appel, couloirs individuels',
                deroulement: 'Sauts avec focus sur la réception. Travail de l\'atterrissage : jambes fléchies, bras en avant, chute contrôlée. Exercices de roulé pour éviter la chute en arrière. Observation de la trace dans le sable.',
                consignes: 'Jambes fléchies à l\'atterrissage\nBras tendus vers l\'avant\nPoids du corps vers l\'avant\nRoulé si déséquilibre',
                variantes: 'Simplifier : Réception sur tapis | Complexifier : Saut avec mesure de la réception'
            },
            situation3: {
                titre: 'Concours avec focus réception',
                but: 'Réaliser sa meilleure performance avec une réception optimale',
                organisation: 'Aire de saut complète avec couloirs, planche, fosse, juges',
                deroulement: 'Concours avec évaluation de la réception. Un saut est validé si la réception est contrôlée (pas de chute en arrière). Objectif : maximiser la distance avec une réception stable. 3 essais avec mesure officielle.',
                consignes: 'Préparation précoce à la réception\nJambes fléchies à l\'atterrissage\nPoids vers l\'avant\nPas de chute en arrière',
                variantes: 'Simplifier : Réception sur tapis | Complexifier : Réception avec roulé obligatoire'
            },
            criteresRealisation: '• Jambes fléchies à l\'atterrissage\n• Bras en avant\n• Poids vers l\'avant\n• Pas de chute en arrière',
            criteresReussite: '• 100% de réceptions contrôlées\n• Distance > 4m (G) / > 3.5m (F)\n• Pas de chute en arrière\n• Trace dans le sable régulière'
        }
    },

    // ============================================================================
    // ATHLÉTISME - SAUT EN HAUTEUR
    // ============================================================================
    'Saut en hauteur': {
        'franchissement': {
            echauffement: 'Course d\'élan courbe lentement (2 min) : trajectoire en J | Sauts sans barre (2 min) : impulsion verticale | Sauts sur barre basse (3 min) : technique de franchissement | Sauts complets (3 min) : coordination globale',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (course courbe, impulsion, rotation dorsale, réception), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course courbe sans barre (trajectoire en J), 2) Impulsion verticale sur place, 3) Exercices de rotation dorsale au sol, 4) Réception sur le dos. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station vidéo'
            },
            situation2: {
                titre: 'Travail de la technique de franchissement',
                but: 'Franchir une barre à 1m avec technique Fosbury-Flop correcte',
                organisation: 'Aire de saut avec barre, tapis, couloir d\'élan, barre à hauteur adaptée',
                deroulement: 'Sauts avec élan courbe (5-7 pas) sur barre à hauteur accessible (1m-1.10m). Focus sur la technique : course courbe, impulsion sur le pied extérieur, rotation dorsale, pontage, chute sur les épaules. 5 essais par élève. Observation et correction.',
                consignes: 'Course en courbe, regard vers la barre\nImpulsion sur le pied extérieur (droitier = pied gauche)\nRotation dorsale au-dessus de la barre\nChute sur les épaules, regard vers le plafond',
                variantes: 'Simplifier : Barre très basse (80cm), sans élan | Complexifier : Barre montante par paliers de 5cm'
            },
            situation3: {
                titre: 'Concours de saut en hauteur',
                but: 'Franchir la hauteur maximale en 3 essais par hauteur',
                organisation: 'Aire de saut complète avec barre montante, tapis, juge-mesureur',
                deroulement: 'Concours avec barres montantes par paliers de 5cm. Chaque élève a 3 essais par hauteur. 3 échecs consécutifs = élimination. Dernière hauteur franchie = performance. Respect des règles (appel un pied, pas de toucher la barre). Classement final.',
                consignes: 'Préparer son élan avant chaque saut\nConcentration maximale avant l\'élan\nTechnique respectée même sous pression\nAccepter l\'échec et se préparer pour le prochain essai',
                variantes: 'Simplifier : Paliers de 10cm, 4 essais | Complexifier : Paliers de 3cm, 2 essais, élimination immédiate'
            },
            criteresRealisation: '• Course d\'élan : trajectoire en J régulière\n• Impulsion : pied extérieur, poussée verticale\n• Franchissement : rotation dorsale, pontage\n• Réception : chute sur les épaules, dos au tapis',
            criteresReussite: '• Hauteur franchie > 1.20m (G 3AC) / > 1.10m (F 3AC)\n• 0 barre touchée sur les sauts réussis\n• 3 essais maximum par hauteur\n• Technique Fosbury-Flop respectée'
        },
        'course élan courbe': {
            echauffement: 'Course courbe lente (2 min) : trajectoire | Exercices de courbe (3 min) : accélération en courbe | Placement des marques (2 min) : repères au sol | Sauts complets (3 min) : technique',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (courbe lente, accélération courbe, placement marques, enchaînement), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course courbe lente (trajectoire en J), 2) Accélération en courbe, 3) Placement des marques au sol, 4) Enchaînement course-impulsion sans saut. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nTracer une courbe régulière\nPlacer ses marques précisément\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un chronométrage'
            },
            situation2: {
                titre: 'Travail de la course d\'élan courbe',
                but: 'Optimiser la trajectoire en J et la vitesse en courbe',
                organisation: 'Aire de saut avec couloir d\'élan, marques au sol, couloirs individuels',
                deroulement: 'Travail sur la course d\'élan courbe avec marques personnelles. Objectif : accélérer en courbe sans ralentir. Ajustement des marques selon la vitesse. Observation de la trajectoire (doit dessiner un J régulier).',
                consignes: 'Course progressive et accélérée\nTrajectoire en J régulière\nInclinaison du buste vers l\'intérieur\nDerniers pas actifs',
                variantes: 'Simplifier : Courbe large | Complexifier : Courbe serrée avec accélération maximale'
            },
            situation3: {
                titre: 'Concours avec focus course d\'élan',
                but: 'Réaliser sa meilleure performance avec une course d\'élan optimale',
                organisation: 'Aire de saut complète avec barre, tapis, observateurs',
                deroulement: 'Concours avec analyse de la course d\'élan. Observation de la trajectoire et de l\'accélération. Objectif : correlation entre qualité de la course et hauteur franchie. 3 essais avec ajustement des marques si nécessaire.',
                consignes: 'Trajectoire en J régulière\nAccélération jusqu\'à l\'impulsion\nAjustement des marques si besoin\nConcentration avant chaque essai',
                variantes: 'Simplifier : Pas d\'analyse de trajectoire | Complexifier : Analyse vidéo de la course'
            },
            criteresRealisation: '• Trajectoire en J régulière\n• Accélération en courbe\n• Inclinaison du buste adaptée\n• Marques respectées',
            criteresReussite: '• Trajectoire régulière observée\n• Hauteur > 1.20m (G) / > 1.10m (F)\n• 0 barre touchée\n• Amélioration de la hauteur entre essais'
        },
        'impulsion': {
            echauffement: 'Sauts sans élan (2 min) : impulsion verticale | Exercices de jambes (3 min) : genou haut | Exercices de bras (2 min) : double bras | Sauts avec élan réduit (3 min) : coordination',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (impulsion verticale, genou haut, double bras, coordination), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Impulsion verticale sur place, 2) Exercices de genou haut, 3) Exercices de double bras, 4) Coordination bras-jambes. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'obstacles'
            },
            situation2: {
                titre: 'Travail de l\'impulsion',
                but: 'Améliorer la puissance de l\'impulsion',
                organisation: 'Aire de saut avec barre basse, tapis, couloirs individuels',
                deroulement: 'Sauts avec focus sur l\'impulsion. Travail du griffé du sol, extension complète de la jambe d\'appel, montée des bras. Exercices au sol puis sur barre basse. Observation de la hauteur de décollage.',
                consignes: 'Griffer le sol sur le dernier appui\nExtension complète de la jambe\nDouble bras actif\nPoussée verticale maximale',
                variantes: 'Simplifier : Exercices au sol seulement | Complexifier : Saut avec élastique de résistance'
            },
            situation3: {
                titre: 'Concours avec focus impulsion',
                but: 'Réaliser sa meilleure performance avec une impulsion optimale',
                organisation: 'Aire de saut complète avec barre, tapis, observateurs',
                deroulement: 'Concours avec évaluation de l\'impulsion. Observation de la technique de décollage. Objectif : impulsion puissante et verticale = hauteur maximale. 3 essais avec feedback après chaque saut.',
                consignes: 'Impulsion puissante et verticale\nExtension complète de la jambe\nDouble bras actif\nConcentration maximale',
                variantes: 'Simplifier : Barre fixe | Complexifier : Barre montante rapide'
            },
            criteresRealisation: '• Griffé du sol actif\n• Extension complète de la jambe\n• Double bras monté\n• Poussée verticale',
            criteresReussite: '• Note technique d\'impulsion > 3/5\n• Hauteur > 1.20m (G) / > 1.10m (F)\n• 0 barre touchée\n• Amélioration de la technique entre essais'
        }
    },

    // ============================================================================
    // ATHLÉTISME - LANCER DE POIDS
    // ============================================================================
    'Lancer de poids': {
        'technique': {
            echauffement: 'Échauffement articulaire (2 min) : épaules, poignets, hanches | Mouvements sans poids (2 min) : geste du lancer | Lancers légers (3 min) : medecine-ball 1kg | Lancers avec poids (3 min) : technique progressive',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (position départ, translation, poussée, équilibre), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Position de départ (dos à la zone, poids au cou), 2) Translation/sursaut (glissement arrière), 3) Poussée (extension jambes + bras), 4) Équilibre final. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement, sans poids | Complexifier : Ajout d\'un chronométrage'
            },
            situation2: {
                titre: 'Circuit technique de lancer',
                but: 'Enchaîner les phases du lancer avec coordination',
                organisation: 'Aire de lancer avec cercle, poids adapté (3-4kg), plots de repère',
                deroulement: 'Travail par postes : 1) Position de départ (dos à la zone, poids au cou), 2) Translation/Sursaut (glissement arrière), 3) Poussée (extension jambes + bras), 4) Équilibre final. 5 répétitions par poste, puis enchaînement complet. Observation technique.',
                consignes: 'Tenue du poids : main en dessous, poids au cou\nCoude haut au-dessus de l\'épaule\nPoussée des jambes avant le bras\nRestez dans le cercle après le lancer',
                variantes: 'Simplifier : Sans poids, mouvement à vide | Complexifier : Avec élan complet, mesure de la distance'
            },
            situation3: {
                titre: 'Concours de lancer de poids',
                but: 'Réaliser sa meilleure distance sur 3 essais',
                organisation: 'Aire de lancer complète avec cercle, butoir, secteur de chute, ruban de mesure',
                deroulement: 'Concours avec 3 essais mesurés. Respect des règles (lancer depuis le cercle, poids au cou, pas de sortie avant le signal, rester dans le cercre après le lancer). Mesure de la distance à la trace la plus proche du cercle. Meilleure performance retenue.',
                consignes: 'Position stable avant le départ\nCoordination translation-poussée\nExtension complète du bras lanceur\nÉquilibre final dans le cercle',
                variantes: 'Simplifier : Sans mesure officielle, focus technique | Complexifier : 6 essais, élimination après 2 jets nuls'
            },
            criteresRealisation: '• Tenue : poids au cou, coude haut\n• Translation : glissement arrière contrôlé\n• Poussée : jambes puis bras, extension complète\n• Équilibre : position stable dans le cercle après le jet',
            criteresReussite: '• Distance > 7m (G 3AC 4kg) / > 6m (F 3AC 3kg)\n• 0 jet nul (sortie du cercle avant le signal)\n• 3 essais réussis sur 3\n• Technique en translation respectée'
        },
        'translation': {
            echauffement: 'Mouvements sans poids (2 min) : translation | Exercices de jambes (3 min) : sursaut | Exercices avec poids léger (3 min) : coordination | Lancers complets (2 min) : technique',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (position, sursaut, poussée jambes, équilibre), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Position de départ, 2) Sursaut/glissement arrière, 3) Poussée des jambes, 4) Équilibre final. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'une station timing'
            },
            situation2: {
                titre: 'Travail de la translation',
                but: 'Améliorer la coordination translation-poussée',
                organisation: 'Aire de lancer avec cercle, poids adapté, couloirs individuels',
                deroulement: 'Lancers avec focus sur la translation. Travail du sursaut arrière, reprise d\'appui active, enchaînement avec la poussée. Exercices sans poids puis avec poids. Observation de la fluidité du mouvement.',
                consignes: 'Glissement arrière contrôlé\nReprise d\'appui immédiate\nJambe droite active (droitier)\nEnchaînement fluide',
                variantes: 'Simplifier : Sans poids | Complexifier : Avec élan complet'
            },
            situation3: {
                titre: 'Concours avec focus translation',
                but: 'Réaliser sa meilleure performance avec une translation optimale',
                organisation: 'Aire de lancer complète avec cercle, butoir, observateurs',
                deroulement: 'Concours avec évaluation de la translation. Observation de la fluidité du mouvement. Objectif : translation fluide et puissante = distance maximale. 3 essais avec feedback après chaque lancer.',
                consignes: 'Translation fluide et rapide\nReprise d\'appui active\nCoordination avec la poussée\nConcentration maximale',
                variantes: 'Simplifier : Pas d\'évaluation technique | Complexifier : Notation détaillée'
            },
            criteresRealisation: '• Glissement arrière contrôlé\n• Reprise d\'appui active\n• Enchaînement fluide\n• Poussée des jambes avant le bras',
            criteresReussite: '• Note technique > 3/5\n• Distance > 7m (G) / > 6m (F)\n• 0 jet nul\n• Amélioration entre essais'
        },
        'poussée': {
            echauffement: 'Mouvements sans poids (2 min) : poussée | Exercices de bras (3 min) : extension | Exercices avec poids léger (3 min) : coordination | Lancers complets (2 min) : technique',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (coude haut, extension, fouetté, équilibre), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Position coude haut, 2) Extension du bras, 3) Fouetté du poignet, 4) Équilibre final. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'obstacles'
            },
            situation2: {
                titre: 'Travail de la poussée',
                but: 'Améliorer la puissance de la poussée',
                organisation: 'Aire de lancer avec cercle, poids adapté, couloirs individuels',
                deroulement: 'Lancers avec focus sur la poussée. Travail de l\'extension complète du bras, du fouetté du poignet, de la coordination jambes-bras. Exercices au mur puis lancers complets. Observation de la trajectoire.',
                consignes: 'Extension complète du bras\nFouetté actif du poignet\nCoordination jambes-bras\nDirection vers le haut (45°)',
                variantes: 'Simplifier : Exercices au mur | Complexifier : Lancer avec cible'
            },
            situation3: {
                titre: 'Concours avec focus poussée',
                but: 'Réaliser sa meilleure performance avec une poussée optimale',
                organisation: 'Aire de lancer complète avec cercle, butoir, observateurs',
                deroulement: 'Concours avec évaluation de la poussée. Observation de l\'extension et du fouetté. Objectif : poussée puissante et directionnelle = distance maximale. 3 essais avec feedback après chaque lancer.',
                consignes: 'Poussée puissante et complète\nFouetté du poignet\nDirection 45° vers le haut\nConcentration maximale',
                variantes: 'Simplifier : Pas d\'évaluation technique | Complexifier : Notation détaillée'
            },
            criteresRealisation: '• Extension complète du bras\n• Fouetté du poignet\n• Coordination jambes-bras\n• Trajectoire optimale (45°)',
            criteresReussite: '• Note technique > 3/5\n• Distance > 7m (G) / > 6m (F)\n• 0 jet nul\n• Amélioration entre essais'
        }
    },

    // ============================================================================
    // ATHLÉTISME - COURSE DE DURÉE
    // ============================================================================
    'Course de durée': {
        'endurance': {
            echauffement: 'Course lente 5 min (2 min) : échauffement progressif | Exercices de technique (3 min) : posture, bras, foulée | Accélérations courtes (3 min) : 50m rapide/50m lent | Course spécifique (2 min) : allure de course',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (posture, bras, foulée, respiration), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Travail de la posture (buste droit), 2) Mouvement des bras (piston), 3) Foulée économique, 4) Respiration (ventrale). Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un cardio-fréquencemètre'
            },
            situation2: {
                titre: 'Course à allure régulière',
                but: 'Maintenir une allure constante sur 12-15 minutes',
                organisation: 'Piste ou parcours de 200-400m, plots de repère tous les 100m, chronomètre',
                deroulement: 'Course continue de 12-15 minutes (selon niveau) avec objectif d\'allure régulière. Passage aux plots noté pour vérifier la régularité. Allure choisie en fonction des capacités (doit permettre de parler en courant). Observation de la gestion de l\'effort.',
                consignes: 'Allure choisie maintenue du début à la fin\nRespiration régulière et profonde\nPosture droite même en fatigué\nPacer son effort sur la durée totale',
                variantes: 'Simplifier : 8 minutes, allure très lente | Complexifier : 15 minutes avec accélération finale'
            },
            situation3: {
                titre: 'Test de course de durée',
                but: 'Réaliser sa meilleure performance sur 1000m (G) ou 600m (F)',
                organisation: 'Piste 400m ou parcours mesuré, chronomètres, classement',
                deroulement: 'Course chronométrée sur la distance réglementaire. Départ groupé ou échelonné. Objectif : réaliser le meilleur temps possible en gérant son effort (ne pas partir trop vite). Chronométrage individuel. Comparaison avec les résultats précédents.',
                consignes: 'Gestion de l\'allure : ne pas partir trop vite\nMaintenir l\'effort sur le 2ème tour\nAccélérer sur les 200 derniers mètres\nFinir "sur les jambes" sans s\'écrouler',
                variantes: 'Simplifier : 600m pour tous, allure libre | Complexifier : 1500m, avec temps intermédiaires à respecter'
            },
            criteresRealisation: '• Posture : buste droit, regard à l\'horizon\n• Foulée : régulière, pas de raccourcissement\n• Respiration : profonde et rythmée\n• Bras : mouvement de piston avant-arrière',
            criteresReussite: '• Allure régulière : écart < 10% entre les passages\n• 1000m en < 4min30 (G) / < 5min (F) pour 3AC\n• Capacité à parter en fin de course\n• Fréquence cardiaque de récupération < 120 bpm en 2 min'
        },
        'allure': {
            echauffement: 'Course lente (2 min) : échauffement | Exercices de technique (3 min) : posture, bras | Travail d\'allure (3 min) : différentes vitesses | Course spécifique (2 min) : allure cible',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (allure lente, allure moyenne, allure rapide, récupération), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Course allure lente (peut parler), 2) Course allure moyenne (respiration modérée), 3) Course allure rapide (essoufflé), 4) Récupération active. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nAdapter son effort à l\'allure demandée\nRessentir la différence entre les allures\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 allures seulement | Complexifier : Ajout d\'un cardio-fréquencemètre'
            },
            situation2: {
                titre: 'Travail des différentes allures',
                but: 'Apprendre à moduler son allure selon l\'objectif',
                organisation: 'Piste ou parcours de 400m, plots de repère, chronomètre',
                deroulement: 'Course avec changements d\'allure imposés : 2 min lent, 2 min moyen, 1 min rapide, répété 2-3 fois. Passage aux plots noté pour vérifier le respect des allures. Objectif : sentir la différence et savoir adapter.',
                consignes: 'Respecter les temps d\'allure imposés\nAccélérer progressivement\nNe pas s\'écrouler en allure rapide\nRécupérer activement en allure lente',
                variantes: 'Simplifier : Allures moins contrastées | Complexifier : Allures basées sur la FC'
            },
            situation3: {
                titre: 'Course avec objectif d\'allure',
                but: 'Réaliser une course en respectant une allure cible',
                organisation: 'Piste ou parcours mesuré, chronomètres, fiches de passage',
                deroulement: 'Course sur distance définie avec objectif d\'allure précis (ex: 1000m en 5 min = allure de 2min/km). Passages chronométrés tous les 200m. Objectif : écarts < 5% par rapport à l\'allure cible.',
                consignes: 'Calculer son allure cible avant de partir\nVérifier ses temps de passage\nAjuster si en avance ou en retard\nFinir dans les temps prévus',
                variantes: 'Simplifier : Allure libre | Complexifier : Allure négative (accélérer)'
            },
            criteresRealisation: '• Capacité à moduler l\'allure\n• Respect des temps de passage\n• Gestion de l\'effort adaptée\n• Récupération active',
            criteresReussite: '• Écarts < 5% par rapport à l\'allure cible\n• Course terminée dans les temps\n• Capacité à accélérer en fin de course\n• Récupération rapide (< 120 bpm en 2 min)'
        },
        'gestion effort': {
            echauffement: 'Course lente (2 min) : échauffement | Exercices de respiration (3 min) : ventrale | Travail de pacing (3 min) : régularité | Course spécifique (2 min) : gestion',
            situation1: {
                titre: 'Parcours d\'habiletés motrices',
                but: 'Enchaîner les différentes stations du parcours en maîtrisant les habiletés de base',
                organisation: '4 stations (respiration, posture, régularité, mental), par groupe de 4',
                deroulement: 'Rotation sur les stations : 1) Respiration ventrale, 2) Posture économique, 3) Régularité des appuis, 4) Concentration mentale. Chaque station = 3 min.',
                consignes: 'Respecter le temps à chaque station\nÉcouter les consignes spécifiques\nSe concentrer sur la qualité du geste\nPasser à la station suivante au signal',
                variantes: 'Simplifier : 2 stations seulement | Complexifier : Ajout d\'un cardio-fréquencemètre'
            },
            situation2: {
                titre: 'Travail de la gestion de l\'effort',
                but: 'Apprendre à gérer son effort sur la durée',
                organisation: 'Piste ou parcours de 400m, plots de repère, chronomètre',
                deroulement: 'Course de 10-12 min avec auto-évaluation de la perception de l\'effort (échelle de Borg). Toutes les 2 min, l\'élève évalue son effort de 1 (très facile) à 10 (maximal). Objectif : apprendre à reconnaître ses sensations.',
                consignes: 'Évaluer honnêtement son effort\nEssayer de maintenir un effort constant\nNe pas partir trop vite\nGérer son effort sur la durée',
                variantes: 'Simplifier : Évaluation simplifiée (facile/moyen/dur) | Complexifier : Avec FC cible'
            },
            situation3: {
                titre: 'Course avec gestion optimale',
                but: 'Réaliser sa meilleure performance en gérant parfaitement son effort',
                organisation: 'Piste ou parcours mesuré, chronomètres, fiches d\'évaluation',
                deroulement: 'Course sur distance définie avec gestion optimale de l\'effort. Objectif : répartition égale de l\'effort (pas de départ trop rapide, accélération finale). Analyse des temps de passage et de la sensation de l\'élève.',
                consignes: 'Partir à allure contrôlée\nMaintenir l\'effort au milieu\nAccélérer à la fin si possible\nÉvaluer sa gestion après la course',
                variantes: 'Simplifier : Allure libre | Complexifier : Gestion basée sur la FC'
            },
            criteresRealisation: '• Départ contrôlé\n• Maintien de l\'effort\n• Accélération finale si possible\n• Récupération rapide',
            criteresReussite: '• Répartition équilibrée de l\'effort\n• Temps de passage réguliers\n• Capacité à accélérer en fin\n• Sensation de maîtrise de l\'effort'
        }
    },

    // ============================================================================
    // GYMNASTIQUE
    // ============================================================================
    'Gymnastique': {
        'enchaînement': {
            echauffement: 'Mobilité articulaire (3 min) : chevilles, genoux, hanches, épaules, poignets | Renforcement (3 min) : gainage, squats, pompes | Technique au sol (2 min) : roulades, appuis, équilibres | Préparation mentale (2 min) : visualisation',
            situation1: {
                titre: 'Travail des éléments imposés',
                but: 'Réaliser correctement les éléments de l\'enchaînement du niveau',
                organisation: 'Par groupe de 6, 1 tapis par groupe, fiches techniques, observateurs',
                deroulement: 'Chaque élève travaille les éléments imposés de son niveau : 1AC (2A, 3B), 2AC (2A, 4B, 1C), 3AC (2A, 4B, 1C), etc. Rotation sur les postes avec un temps de pratique et un temps d\'observation/feedback. L\'élève choisit un élément à améliorer.',
                consignes: 'Respecter la technique de chaque élément\nAmplitude maximale dans les mouvements\nLiaisons fluides entre les éléments\nTenue gainée pendant l\'exécution',
                variantes: 'Simplifier : Avec assistance, éléments simplifiés | Complexifier : Sans assistance, enchaînement complet'
            },
            situation2: {
                titre: 'Présentation de l\'enchaînement',
                but: 'Présenter un enchaînement complet avec qualité technique et artistique',
                organisation: 'Tapis individuel ou par groupe, jury (élèves ou professeur), barème d\'évaluation',
                deroulement: 'Présentation de l\'enchaînement complet (45-60 secondes) devant le groupe. Évaluation selon les critères : difficulté, exécution, composition, amplitude, tenue, liaisons. Chaque élève passe une fois. Feedback constructif après chaque passage.',
                consignes: 'Entrée sur le tapis avec assurance\nRespect du quota d\'éléments (A, B, C, D, E)\nLiaisons fluides et continues\nSortie contrôlée et gracieuse',
                variantes: 'Simplifier : Enchaînement court, assistance autorisée | Complexifier : Enchaînement libre, notation stricte'
            },
            criteresRealisation: '• Amplitude : ouverture maximale des angles\n• Tenue : corps gainé, pas de relâchement\n• Liaisons : transitions fluides, pas d\'arrêt\n• Réception : stable, contrôlée, sans pas de déséquilibre',
            criteresReussite: '• Réussite de tous les éléments imposés\n• Note d\'exécution > 7/10\n• Enchaînement complet en < 60 secondes\n• Maximum 2 pas de déséquilibre sur l\'ensemble'
        },
        'technique': {
            echauffement: 'Mobilité spécifique (3 min) : souplesse, amplitude | Renforcement ciblé (3 min) : selon l\'élément travaillé | Révisions (2 min) : éléments acquis précédemment | Visualisation (2 min) : imaginer la réussite',
            situation1: {
                titre: 'Atelier technique par famille',
                but: 'Améliorer la technique d\'un élément spécifique',
                organisation: '4 ateliers (renversements, équilibres, sauts, souplesses), rotation toutes les 5 min',
                deroulement: 'Les élèves tournent sur 4 ateliers selon leurs besoins : 1) Renversements (roulades, rondades), 2) Équilibres (ATR, pont, planche), 3) Sauts (saut de chat, sissonne), 4) Souplesses (fentes, ponts). À chaque atelier, exercices préparatoires et travail de l\'élément.',
                consignes: 'Écouter les consignes de l\'atelier\nProgresser par étapes (assistance -> autonomie)\nDemander de l\'aide si nécessaire\nAider les autres en retour',
                variantes: 'Simplifier : Exercices au sol, assistance maximale | Complexifier : Éléments complexes, autonomie'
            },
            situation2: {
                titre: 'Perfectionnement individuel',
                but: 'Travailler un élément difficile avec un partenaire',
                organisation: 'Par binôme, 1 tapis, fiche d\'objectifs personnels, observateur/assistant',
                deroulement: 'Chaque élève choisit un élément à perfectionner. Son partenaire l\'observe, lui donne des feedbacks et l\'assiste si nécessaire. 10 minutes par élève. Alternance entre tentatives et corrections. Objectif : améliorer la qualité de l\'élément choisi.',
                consignes: 'Choisir un élément réaliste mais challengeant\nAccepter les feedbacks du partenaire\nFaire des tentatives complètes, pas seulement des essais\nCélébrer les progrès, même petits',
                variantes: 'Simplifier : Élément facile, professeur présent | Complexifier : Élément difficile, autonomie'
            },
            criteresRealisation: '• Précision : placement des mains/pieds correct\n• Amplitude : ouverture maximale\n• Fixité : maintien des positions (3 secondes)\n• Réception : contrôlée, sans déséquilibre',
            criteresReussite: '• Élément réussi 3 fois consécutives\n• Amplitude jugée suffisante (> 160° pour les angles)\n• Fixité respectée sur les équilibres\n• Progrès observable par rapport au début de séance'
        }
    }
};

// ============================================================================
// FONCTION HELPER : Récupérer les situations pour un sport et un objectif
// ============================================================================

const getSituations = (sport, objectif) => {
    const sportData = SITUATIONS_FICHES[sport];
    if (!sportData) return null;
    
    // Recherche exacte
    if (sportData[objectif]) {
        return sportData[objectif];
    }
    
    // Recherche partielle (insensible à la casse et aux accents)
    const objectifLower = objectif.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const [key, value] of Object.entries(sportData)) {
        const keyLower = key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (keyLower.includes(objectifLower) || objectifLower.includes(keyLower)) {
            return value;
        }
    }
    
    return null;
};

// ============================================================================
// FONCTION HELPER : Lister les objectifs disponibles pour un sport
// ============================================================================

const getObjectifsDisponibles = (sport) => {
    const sportData = SITUATIONS_FICHES[sport];
    if (!sportData) return [];
    return Object.keys(sportData);
};

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    SITUATIONS_FICHES,
    getSituations,
    getObjectifsDisponibles
};
