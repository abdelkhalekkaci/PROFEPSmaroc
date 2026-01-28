module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { typeDocument, typeGrille, aps, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance, nombreSeances, classe } = req.body;

        if (!aps || !niveau) return res.status(400).json({ success: false, error: 'APS et niveau requis' });

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);

        // ==================== OTI COMPLETS (Orientations Pédagogiques) ====================
        const OTI = {
            '1AC': "À la fin de la 1ère année du cycle secondaire collégial, l'élève doit être capable d'acquérir une motricité correcte lui permettant de s'adapter aux exigences des différentes situations motrices (forme et rythme) et de s'intégrer positivement dans le groupe classe tout en respectant les règles de sécurité et de fair-play.",
            '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées, tout en développant ses capacités d'adaptation aux situations variées et son sens de la coopération.",
            '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations en fonction de leurs exigences organisationnelles et réglementaires, tout en faisant preuve d'autonomie et de responsabilité.",
            'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices, de faire face aux défis qu'elles présentent et d'accepter l'intégration harmonieuse dans le groupe tout en développant son sens critique.",
            '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes, d'améliorer ses réalisations par une gestion efficace de ses ressources et de contribuer activement à la dynamique du groupe.",
            '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser finement les différentes situations et interactions motrices, de s'intégrer efficacement dans la réalisation de projets collectifs et individuels, et de faire preuve de maturité dans ses choix stratégiques."
        };

        // ==================== OTC COMPLETS PAR APS ====================
        const OTC = {
            'Handball': {
                '1AC': "L'élève doit être capable de conserver collectivement la balle et de participer activement au jeu pour permettre à son équipe de progresser vers la cible adverse et marquer.",
                '2AC': "L'élève doit être capable de faire progresser la balle vers la cible adverse par des déplacements variés (avec ou sans ballon), des passes adaptées et une occupation rationnelle de l'espace de jeu.",
                '3AC': "L'élève doit être capable de s'inscrire dans un projet collectif basé sur l'alternance rapide des rôles attaquant/défenseur et sur l'exploitation des espaces libres pour créer le déséquilibre.",
                'TC': "L'élève doit être capable d'utiliser des moyens techniques et tactiques adaptés pour conserver la balle, progresser collectivement et créer des situations favorables au tir dans la zone de marque.",
                '1AB': "L'élève doit être capable de mettre en œuvre des choix tactiques collectifs pertinents avec une vitesse d'exécution adaptée aux exigences du rapport de force.",
                '2AB': "L'élève doit être capable d'élaborer et de mettre en place une stratégie collective basée sur la maîtrise des différents rôles et l'occupation optimale de l'espace de jeu."
            },
            'Football': {
                '1AC': "L'élève doit être capable de conserver le ballon individuellement et collectivement pour permettre à son équipe de progresser vers le but adverse.",
                '2AC': "L'élève doit être capable de faire progresser le ballon vers le but adverse par des conduites de balle maîtrisées et des passes précises.",
                '3AC': "L'élève doit être capable de participer à un projet de jeu collectif intégrant les transitions attaque-défense.",
                'TC': "L'élève doit être capable d'organiser le jeu collectif en utilisant les fondamentaux techniques au service de la progression vers le but.",
                '1AB': "L'élève doit être capable de s'adapter aux configurations de jeu pour optimiser les choix tactiques individuels et collectifs.",
                '2AB': "L'élève doit être capable de concevoir et d'appliquer des stratégies de jeu adaptées au rapport de force."
            },
            'Basketball': {
                '1AC': "L'élève doit être capable de conserver la balle et de progresser vers la cible en utilisant le dribble et la passe.",
                '2AC': "L'élève doit être capable de créer et d'exploiter des situations favorables au tir par le jeu sans ballon et le démarquage.",
                '3AC': "L'élève doit être capable de s'inscrire dans une organisation collective offensive et défensive équilibrée.",
                'TC': "L'élève doit être capable d'optimiser la circulation de balle et les déplacements pour créer le déséquilibre défensif.",
                '1AB': "L'élève doit être capable d'analyser le rapport de force et d'adapter ses choix tactiques en conséquence.",
                '2AB': "L'élève doit être capable de mettre en œuvre des systèmes de jeu élaborés en attaque et en défense."
            },
            'Volleyball': {
                '1AC': "L'élève doit être capable de se déplacer et de se placer correctement pour défendre son camp et renvoyer la balle dans le camp adverse.",
                '2AC': "L'élève doit être capable de construire l'attaque par un renvoi indirect utilisant un relais (deux touches minimum).",
                '3AC': "L'élève doit être capable d'organiser la défense du terrain et d'orienter la construction offensive vers la zone avant.",
                'TC': "L'élève doit être capable de s'organiser collectivement pour défendre, construire et renvoyer dans la limite des trois touches réglementaires.",
                '1AB': "L'élève doit être capable d'optimiser la construction du point en utilisant les trois touches avec des rôles différenciés.",
                '2AB': "L'élève doit être capable de mettre en place une organisation collective élaborée intégrant des combinaisons offensives variées."
            },
            'Saut en longueur': {
                '1AC': "L'élève doit être capable de réaliser une course d'élan progressivement accélérée suivie d'une impulsion et d'une réception équilibrée dans la fosse.",
                '2AC': "L'élève doit être capable d'enchaîner une course d'élan régulière, une impulsion sur la planche et un saut avec une attitude aérienne simple.",
                '3AC': "L'élève doit être capable d'optimiser sa course d'élan étalonnée pour coïncider avec la planche d'appel et réaliser une impulsion efficace.",
                'TC': "L'élève doit être capable de maîtriser l'organisation de sa course d'élan et la qualité de son impulsion pour mobiliser un niveau de performance optimal tout en respectant les règles de la compétition.",
                '1AB': "L'élève doit être capable d'augmenter l'efficacité de sa performance par la maîtrise de la liaison course-impulsion et l'amélioration de la phase aérienne.",
                '2AB': "L'élève doit être capable d'optimiser sa performance en coordonnant efficacement les trois phases du saut (élan, impulsion, suspension-réception)."
            },
            'Saut en hauteur': {
                '1AC': "L'élève doit être capable de franchir une barre en utilisant une course d'élan et une impulsion vers le haut.",
                '2AC': "L'élève doit être capable de réaliser un franchissement dorsal avec une course d'élan courbe adaptée.",
                '3AC': "L'élève doit être capable d'optimiser son franchissement par une meilleure coordination course-impulsion-franchissement.",
                'TC': "L'élève doit être capable de maîtriser la technique du fosbury-flop avec une course d'élan et une impulsion efficaces.",
                '1AB': "L'élève doit être capable d'améliorer sa performance par l'optimisation de chaque phase technique.",
                '2AB': "L'élève doit être capable de réaliser une performance optimale en gérant les paramètres techniques et psychologiques."
            },
            'Course de vitesse': {
                '1AC': "L'élève doit être capable de réagir rapidement à un signal de départ et de maintenir sa vitesse sur une distance courte.",
                '2AC': "L'élève doit être capable d'améliorer sa technique de course (fréquence et amplitude) pour optimiser sa vitesse.",
                '3AC': "L'élève doit être capable de gérer sa course du départ à l'arrivée en optimisant les phases d'accélération et de maintien.",
                'TC': "L'élève doit être capable de maîtriser les différentes phases de la course de vitesse (réaction, accélération, vitesse maximale, maintien) pour réaliser sa meilleure performance.",
                '1AB': "L'élève doit être capable d'analyser et d'améliorer ses points faibles pour progresser dans sa performance chronométrique.",
                '2AB': "L'élève doit être capable d'atteindre son potentiel maximal par une préparation et une exécution optimales."
            },
            'Course de durée': {
                '1AC': "L'élève doit être capable de courir de façon régulière sur une durée donnée en gérant son effort.",
                '2AC': "L'élève doit être capable d'adapter son allure de course pour maintenir un effort prolongé.",
                '3AC': "L'élève doit être capable de construire et de respecter un projet de course en fonction de ses capacités.",
                'TC': "L'élève doit être capable de planifier et de réaliser une performance en course de durée en gérant efficacement ses ressources énergétiques.",
                '1AB': "L'élève doit être capable d'optimiser sa performance par une gestion stratégique de l'allure de course.",
                '2AB': "L'élève doit être capable d'atteindre ses objectifs de performance par une préparation et une stratégie de course adaptées."
            },
            'Lancer de poids': {
                '1AC': "L'élève doit être capable de lancer un engin en utilisant une poussée du bras depuis l'épaule.",
                '2AC': "L'élève doit être capable de coordonner la poussée des jambes et l'action du bras pour améliorer son lancer.",
                '3AC': "L'élève doit être capable d'enchaîner les actions motrices du lancer en respectant la technique et les règles.",
                'TC': "L'élève doit être capable de réaliser un lancer de poids en maîtrisant la coordination des différents segments corporels pour optimiser la distance.",
                '1AB': "L'élève doit être capable d'améliorer sa performance par le perfectionnement technique et le développement de la puissance.",
                '2AB': "L'élève doit être capable d'optimiser sa performance par une maîtrise complète de la chaîne de lancer."
            },
            'Gymnastique': {
                '1AC': "L'élève doit être capable de réaliser un enchaînement simple de 3 éléments de la famille A et 2 éléments de la famille B, présenté devant la classe.",
                '2AC': "L'élève doit être capable de présenter un enchaînement varié comprenant 3A, 2B et 1C avec des liaisons fluides.",
                '3AC': "L'élève doit être capable de concevoir et de réaliser un enchaînement individuel comprenant 2A, 4B et 1C avec qualité d'exécution.",
                'TC': "L'élève doit être capable de présenter un enchaînement gymnique comprenant 2A, 3B et 2C avec maîtrise et amplitude.",
                '1AB': "L'élève doit être capable de composer et réaliser un enchaînement gymnique comprenant 2B, 3C et 2D avec continuité et expression.",
                '2AB': "L'élève doit être capable de concevoir, réaliser et évaluer un enchaînement varié comprenant 2C, 3D et 2E avec virtuosité."
            },
            'Tennis de table': {
                '1AC': "L'élève doit être capable de maintenir un échange en renvoyant la balle sur la table adverse.",
                '2AC': "L'élève doit être capable de diriger la balle dans différentes zones pour mettre l'adversaire en difficulté.",
                '3AC': "L'élève doit être capable de varier les trajectoires et les effets pour prendre l'initiative du point.",
                'TC': "L'élève doit être capable de construire le point en utilisant des variations de placement, de vitesse et d'effet.",
                '1AB': "L'élève doit être capable d'élaborer des stratégies de jeu adaptées aux caractéristiques de l'adversaire.",
                '2AB': "L'élève doit être capable de mettre en œuvre un projet de jeu personnel et de l'adapter en cours de match."
            },
            'Badminton': {
                '1AC': "L'élève doit être capable de renvoyer le volant dans le terrain adverse en utilisant les frappes de base.",
                '2AC': "L'élève doit être capable de varier la longueur et la direction de ses frappes pour déplacer l'adversaire.",
                '3AC': "L'élève doit être capable d'alterner jeu long et jeu court pour créer des espaces et marquer le point.",
                'TC': "L'élève doit être capable de construire le point en exploitant les espaces libres et en variant les trajectoires.",
                '1AB': "L'élève doit être capable d'élaborer des séquences de jeu tactiquement cohérentes.",
                '2AB': "L'élève doit être capable de concevoir et d'appliquer une stratégie de jeu personnelle adaptée à l'adversaire."
            }
        };

        // ==================== SITUATIONS DE RÉFÉRENCE ====================
        const SITUATIONS_REF = {
            'Handball': '7 contre 7',
            'Football': '5 contre 5',
            'Basketball': '5 contre 5',
            'Volleyball': '6 contre 6',
            'Tennis de table': 'Match en simple',
            'Badminton': 'Match en simple',
            'Course de vitesse': isCollege ? '80 mètres chronométrés' : '80m (garçons) / 60m (filles)',
            'Course de relais': '4 x 60 mètres',
            'Saut en longueur': '3 essais mesurés avec course d\'élan libre',
            'Saut en hauteur': 'Concours à hauteurs progressives',
            'Lancer de poids': '3 essais avec engin réglementaire (4kg G / 3kg F)',
            'Course de durée': '1000m (garçons) / 600m (filles)',
            'Gymnastique': 'Présentation d\'un enchaînement individuel au sol'
        };

        // ==================== OBJECTIFS DE SÉANCES PAR APS ====================
        const OBJECTIFS_SEANCES = {
            'Handball': {
                college: [
                    "Évaluation diagnostique : Identifier le niveau initial des élèves à travers une situation de jeu 7c7 avec observation des comportements individuels et collectifs.",
                    "Appropriation du règlement : Connaître et appliquer les règles fondamentales du handball (marcher, reprise de dribble, engagement, zone).",
                    "Maîtrise de la passe : Être capable de réaliser des passes précises (à hauteur de poitrine, à rebond) en situation statique puis dynamique.",
                    "Amélioration de la réception : Être capable de recevoir le ballon en mouvement tout en préparant l'action suivante (passe ou tir).",
                    "Travail du tir : Être capable de réaliser un tir en course avec une impulsion correcte et un armé efficace du bras.",
                    "Démarquage et appels de balle : Être capable de se démarquer pour offrir une solution de passe au porteur de balle.",
                    "Jeu en supériorité numérique : Être capable d'exploiter une situation de surnombre (2c1, 3c2) pour progresser vers la cible.",
                    "Organisation défensive : Être capable de se replacer défensivement et de gêner la progression adverse.",
                    "Intégration en situation de jeu : Être capable d'appliquer les acquis dans une situation de jeu à effectif réduit.",
                    "Évaluation terminale : Valider les acquis à travers une situation de référence 7c7 avec critères d'observation définis."
                ],
                lycee: [
                    "Évaluation diagnostique : Analyser les compétences initiales à travers une situation de match 7c7 pour identifier les axes de travail.",
                    "Cadre réglementaire et tactique : Maîtriser le règlement et comprendre les principes de base de l'organisation collective.",
                    "Perfectionnement technique : Consolider les gestes fondamentaux (passes variées, tirs, feintes) en situations aménagées.",
                    "Circulation de balle : Être capable de faire circuler la balle rapidement pour déstabiliser la défense adverse.",
                    "Contre-attaque : Être capable de déclencher et conclure une contre-attaque à partir d'une récupération de balle.",
                    "Systèmes offensifs : Être capable de mettre en place une attaque placée avec permutations et écrans.",
                    "Organisation défensive en zone : Être capable de défendre en zone (0-6, 1-5) en fonction du système adverse.",
                    "Gestion du rapport de force : Être capable d'adapter son jeu au rapport de force adverse.",
                    "Préparation à l'évaluation : Affiner les automatismes collectifs et préparer la situation de référence.",
                    "Évaluation terminale : Valider les compétences dans une situation de référence 7c7 selon les critères officiels."
                ]
            },
            'Saut en longueur': {
                college: [
                    "Évaluation diagnostique : Observer et mesurer les capacités initiales de chaque élève sur 3 sauts libres pour identifier les points forts et les axes d'amélioration.",
                    "Appropriation de l'activité : Connaître le règlement, les règles de sécurité et le vocabulaire spécifique du saut en longueur.",
                    "Détermination du pied d'appel : Identifier son pied d'impulsion dominant à travers des exercices variés (sauts, franchissements).",
                    "Construction de la course d'élan : Être capable de réaliser une course progressivement accélérée avec régularité des appuis.",
                    "Étalonnage de la course : Prendre des repères pour ajuster sa course d'élan et coïncider avec la planche d'appel.",
                    "Travail de l'impulsion : Être capable de transformer la vitesse horizontale en vitesse verticale par une impulsion dynamique.",
                    "Amélioration de la suspension : Être capable de maintenir une attitude aérienne favorable (ramené ou extension) pendant la phase de vol.",
                    "Optimisation de la réception : Être capable de se réceptionner activement (pieds en avant, déséquilibre avant) pour optimiser la marque.",
                    "Intégration du saut global : Être capable d'enchaîner les trois phases (élan-impulsion-réception) de manière coordonnée.",
                    "Évaluation terminale : Réaliser 3 sauts mesurés en appliquant les critères techniques travaillés pour valider ses acquis."
                ],
                lycee: [
                    "Évaluation diagnostique : Analyser les performances et comportements techniques initiaux sur 3 essais mesurés.",
                    "Cadre réglementaire et technique : Approfondir les connaissances réglementaires et les principes biomécaniques du saut.",
                    "Optimisation de la course d'élan : Augmenter la vitesse d'élan tout en conservant la précision sur la planche.",
                    "Perfectionnement de l'impulsion : Améliorer l'efficacité de l'impulsion (placement du bassin, action des bras).",
                    "Travail de l'angle d'envol : Être capable de trouver l'angle d'envol optimal en fonction de sa vitesse d'élan.",
                    "Technique de suspension : Maîtriser une technique de suspension (ramené, extension, ciseau) adaptée à son profil.",
                    "Préparation de la réception : Optimiser le gain de distance par une réception active et équilibrée.",
                    "Saut en conditions de compétition : Être capable de gérer les aspects psychologiques et l'enchaînement des essais.",
                    "Affinage technique : Corriger les derniers détails techniques et stabiliser les automatismes.",
                    "Évaluation terminale : Valider ses compétences sur 3 essais officiels selon le protocole réglementaire."
                ]
            },
            'Course de vitesse': {
                college: [
                    "Évaluation diagnostique : Mesurer le temps de référence sur la distance réglementaire pour établir le niveau initial.",
                    "Règlement et sécurité : Connaître les règles de la course de vitesse (départ, couloirs, faux départ) et les consignes de sécurité.",
                    "Travail du départ : Être capable de réagir rapidement au signal et d'adopter une position de départ efficace.",
                    "Phase d'accélération : Être capable d'augmenter progressivement sa vitesse sur les 30 premiers mètres.",
                    "Amélioration de la fréquence : Augmenter la fréquence des appuis tout en maintenant une amplitude correcte.",
                    "Travail de l'amplitude : Être capable d'allonger sa foulée sans perdre en fréquence.",
                    "Phase de vitesse maximale : Être capable de maintenir sa vitesse maximale le plus longtemps possible.",
                    "Passage de la ligne d'arrivée : Être capable de franchir la ligne d'arrivée sans ralentir (buste en avant).",
                    "Course complète : Être capable d'enchaîner toutes les phases de la course de manière fluide.",
                    "Évaluation terminale : Réaliser 2 courses chronométrées pour valider sa meilleure performance."
                ],
                lycee: [
                    "Évaluation diagnostique : Établir le profil de coureur à travers des tests sur différentes distances.",
                    "Analyse technique : Identifier ses points forts et points faibles par observation vidéo et feedback.",
                    "Optimisation du départ : Perfectionner la technique de départ pour améliorer le temps de réaction.",
                    "Développement de la puissance : Améliorer la poussée au départ et l'accélération initiale.",
                    "Technique de course à haute vitesse : Optimiser le placement du bassin, l'action des bras et des segments libres.",
                    "Maintien de la vitesse : Développer la capacité à maintenir la vitesse maximale jusqu'à la ligne.",
                    "Gestion de la course : Être capable de produire sa meilleure performance dans des conditions de compétition.",
                    "Travail spécifique individualisé : Corriger ses points faibles identifiés lors du diagnostic.",
                    "Préparation mentale : Gérer le stress et optimiser sa concentration avant la course.",
                    "Évaluation terminale : Réaliser 2 courses chronométrées dans les conditions réglementaires."
                ]
            },
            'Gymnastique': {
                college: [
                    "Évaluation diagnostique : Observer les capacités gymniques initiales à travers des éléments simples au sol.",
                    "Sécurité et parade : Connaître les règles de sécurité, les techniques de parade et le respect du matériel.",
                    "Éléments de la famille A : Maîtriser les roulades avant et arrière avec différentes positions de départ et d'arrivée.",
                    "Éléments de la famille B : Être capable de réaliser l'ATR, la roue et leurs variantes avec aide puis seul.",
                    "Travail des liaisons : Être capable d'enchaîner deux éléments avec fluidité et continuité.",
                    "Éléments de la famille C : Découvrir et travailler les éléments acrobatiques adaptés au niveau.",
                    "Construction de l'enchaînement : Composer un enchaînement respectant les exigences de composition.",
                    "Qualité d'exécution : Améliorer l'amplitude, le rythme et la présentation de l'enchaînement.",
                    "Répétition et stabilisation : Stabiliser l'enchaînement pour une présentation fiable.",
                    "Évaluation terminale : Présenter son enchaînement devant la classe selon les critères définis."
                ],
                lycee: [
                    "Évaluation diagnostique : Évaluer le niveau technique et les capacités physiques de chaque élève.",
                    "Renforcement spécifique : Développer les qualités physiques nécessaires (gainage, souplesse, coordination).",
                    "Perfectionnement des éléments connus : Améliorer la qualité d'exécution des éléments déjà maîtrisés.",
                    "Apprentissage de nouveaux éléments : Acquérir des éléments de difficulté supérieure avec parade.",
                    "Travail des acrobaties : Maîtriser des éléments acrobatiques adaptés au niveau visé.",
                    "Composition de l'enchaînement : Élaborer un enchaînement original respectant les exigences de composition.",
                    "Liaisons et rythme : Optimiser les transitions et varier le rythme de l'enchaînement.",
                    "Expression et présentation : Travailler la dimension artistique et expressive de l'enchaînement.",
                    "Préparation à l'évaluation : Répéter et stabiliser l'enchaînement dans les conditions de l'évaluation.",
                    "Évaluation terminale : Présenter son enchaînement selon les critères de difficulté, exécution et composition."
                ]
            }
        };

        // Objectifs par défaut pour les APS non détaillées
        const getObjectifsDefaut = (aps, isCollege, nbSeances) => {
            const sitRef = SITUATIONS_REF[aps];
            const objectifs = [
                `Évaluation diagnostique : Observer et analyser les capacités initiales des élèves à travers la situation de référence (${sitRef}).`,
                `Appropriation de l'activité : Connaître le règlement, les règles de sécurité et le vocabulaire spécifique de ${aps.toLowerCase()}.`
            ];
            
            for (let i = 3; i < nbSeances; i++) {
                objectifs.push(`Séance ${i} : Développer les compétences techniques et tactiques spécifiques à ${aps.toLowerCase()}.`);
            }
            
            objectifs.push(`Évaluation terminale : Valider les acquis du cycle à travers la situation de référence (${sitRef}) selon les critères définis.`);
            return objectifs;
        };

        // ==================== CRITÈRES D'OBSERVATION DIDACTIQUES ====================
        const CRITERES_OBSERVATION = {
            'Saut en longueur': {
                criteres: [
                    { nom: 'Course d\'élan', sousCriteres: ['Progressivement accélérée', 'Irrégulière'] },
                    { nom: 'Piétinement', sousCriteres: ['Absent', 'Présent'] },
                    { nom: 'Appel', sousCriteres: ['Avant planche', 'Sur planche', 'Mordu'] },
                    { nom: 'Réception', sousCriteres: ['Pieds joints devant', 'Déséquilibrée'] }
                ],
                performance: true
            },
            'Saut en hauteur': {
                criteres: [
                    { nom: 'Course d\'élan', sousCriteres: ['Courbe régulière', 'Rectiligne'] },
                    { nom: 'Impulsion', sousCriteres: ['Pied extérieur', 'Mauvais pied'] },
                    { nom: 'Franchissement', sousCriteres: ['Dorsal correct', 'Ventral/Autre'] },
                    { nom: 'Réception', sousCriteres: ['Sur le dos', 'Dangereuse'] }
                ],
                performance: true
            },
            'Course de vitesse': {
                criteres: [
                    { nom: 'Départ', sousCriteres: ['Réactif', 'Retardé'] },
                    { nom: 'Accélération', sousCriteres: ['Progressive', 'Brutale/Lente'] },
                    { nom: 'Fréquence', sousCriteres: ['Élevée', 'Faible'] },
                    { nom: 'Ligne de course', sousCriteres: ['Rectiligne', 'Déviée'] }
                ],
                performance: true
            },
            'Lancer de poids': {
                criteres: [
                    { nom: 'Position initiale', sousCriteres: ['Correcte', 'Incorrecte'] },
                    { nom: 'Placement engin', sousCriteres: ['Sous le menton', 'Éloigné'] },
                    { nom: 'Poussée', sousCriteres: ['Complète', 'Partielle'] },
                    { nom: 'Équilibre final', sousCriteres: ['Maintenu', 'Perdu'] }
                ],
                performance: true
            },
            'Handball': {
                criteres: [
                    { nom: 'Passe', sousCriteres: ['Précise', 'Imprécise'] },
                    { nom: 'Réception', sousCriteres: ['Assurée', 'Hésitante'] },
                    { nom: 'Tir', sousCriteres: ['Cadré/Efficace', 'Non cadré'] },
                    { nom: 'Démarquage', sousCriteres: ['Pertinent', 'Absent'] }
                ],
                performance: false,
                observation: true
            },
            'Football': {
                criteres: [
                    { nom: 'Conduite', sousCriteres: ['Maîtrisée', 'Perdue'] },
                    { nom: 'Passe', sousCriteres: ['Précise', 'Imprécise'] },
                    { nom: 'Contrôle', sousCriteres: ['Orienté', 'Subi'] },
                    { nom: 'Placement', sousCriteres: ['Adapté', 'Inadapté'] }
                ],
                performance: false,
                observation: true
            },
            'Basketball': {
                criteres: [
                    { nom: 'Dribble', sousCriteres: ['Tête haute', 'Yeux sur balle'] },
                    { nom: 'Passe', sousCriteres: ['Bonne décision', 'Mauvais choix'] },
                    { nom: 'Tir', sousCriteres: ['Position correcte', 'Déséquilibré'] },
                    { nom: 'Démarquage', sousCriteres: ['Efficace', 'Passif'] }
                ],
                performance: false,
                observation: true
            },
            'Volleyball': {
                criteres: [
                    { nom: 'Manchette', sousCriteres: ['Bras tendus', 'Bras pliés'] },
                    { nom: 'Passe haute', sousCriteres: ['Au-dessus front', 'Trop basse'] },
                    { nom: 'Service', sousCriteres: ['Dans le terrain', 'Faute'] },
                    { nom: 'Déplacement', sousCriteres: ['Anticipé', 'En retard'] }
                ],
                performance: false,
                observation: true
            },
            'Gymnastique': {
                criteres: [
                    { nom: 'Éléments A', sousCriteres: ['Réussi', 'Chute/Aide'] },
                    { nom: 'Éléments B', sousCriteres: ['Réussi', 'Chute/Aide'] },
                    { nom: 'Éléments C', sousCriteres: ['Réussi', 'Chute/Aide'] },
                    { nom: 'Enchaînement', sousCriteres: ['Fluide', 'Arrêts'] }
                ],
                performance: false,
                note: true
            },
            'Tennis de table': {
                criteres: [
                    { nom: 'Coup droit', sousCriteres: ['Contrôlé', 'Aléatoire'] },
                    { nom: 'Revers', sousCriteres: ['Contrôlé', 'Aléatoire'] },
                    { nom: 'Service', sousCriteres: ['Réglementaire', 'Faute'] },
                    { nom: 'Déplacement', sousCriteres: ['Équilibré', 'Déséquilibré'] }
                ],
                performance: false,
                observation: true
            },
            'Badminton': {
                criteres: [
                    { nom: 'Dégagé', sousCriteres: ['Fond de court', 'Court'] },
                    { nom: 'Amorti', sousCriteres: ['Près du filet', 'Trop long'] },
                    { nom: 'Service', sousCriteres: ['Réglementaire', 'Faute'] },
                    { nom: 'Replacement', sousCriteres: ['Au centre', 'Excentré'] }
                ],
                performance: false,
                observation: true
            }
        };

        // ==================== CRITÈRES D'ÉVALUATION ====================
        const CRITERES_EVALUATION = {
            'sports_collectifs': [
                { nom: 'Maîtrise technique', points: 5, description: 'Qualité des gestes fondamentaux' },
                { nom: 'Pertinence tactique', points: 5, description: 'Qualité des choix et décisions' },
                { nom: 'Engagement moteur', points: 5, description: 'Intensité et continuité de l\'engagement' },
                { nom: 'Respect des règles', points: 5, description: 'Application du règlement et fair-play' }
            ],
            'athletisme': [
                { nom: 'Performance', points: 10, description: 'Résultat chronométré ou mesuré' },
                { nom: 'Maîtrise technique', points: 6, description: 'Qualité d\'exécution des gestes' },
                { nom: 'Engagement', points: 4, description: 'Investissement dans l\'effort' }
            ],
            'gymnastique': [
                { nom: 'Difficulté', points: 6, description: 'Niveau des éléments réalisés' },
                { nom: 'Exécution', points: 8, description: 'Qualité de réalisation des éléments' },
                { nom: 'Composition', points: 6, description: 'Originalité et enchaînement' }
            ],
            'sports_renvoi': [
                { nom: 'Maîtrise technique', points: 6, description: 'Qualité des frappes et déplacements' },
                { nom: 'Efficacité tactique', points: 6, description: 'Pertinence des choix de jeu' },
                { nom: 'Gain des échanges', points: 8, description: 'Points marqués / échanges gagnés' }
            ]
        };

        // Déterminer le groupe APS
        let groupeAPS = 'Activité physique';
        let typeEval = 'sports_collectifs';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) {
            groupeAPS = 'Sports collectifs';
            typeEval = 'sports_collectifs';
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            typeEval = 'sports_renvoi';
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            typeEval = 'athletisme';
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            typeEval = 'gymnastique';
        }

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || OTC['Handball']?.[niveau] || '';
        const sitRef = SITUATIONS_REF[aps] || 'Situation adaptée';
        const criteresObs = CRITERES_OBSERVATION[aps] || CRITERES_OBSERVATION['Handball'];
        const criteresEval = CRITERES_EVALUATION[typeEval];

        let html = '', filename = '', ficheDetaillee = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            const prompt = `Expert EPS Maroc. Fiche ${aps} niveau ${niveau}, objectif: "${objectif}".
Génère (format court):
ECHAUF: [3 exercices spécifiques en une phrase chacun]
SIT1_TITRE: [titre court]
SIT1_DEROUL: [déroulement en 3 phrases max]
SIT1_CONSIG: [3 consignes courtes]
SIT1_VAR: [simplifier / complexifier]
SIT2_TITRE: [titre court]
SIT2_DEROUL: [déroulement en 3 phrases max]
SIT2_CONSIG: [3 consignes courtes]
SIT2_VAR: [simplifier / complexifier]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            ficheDetaillee = data.choices?.[0]?.message?.content || '';

            const parse = (key) => { const m = ficheDetaillee.match(new RegExp(key + ':\\s*(.+?)(?=\\n[A-Z_]|$)', 's')); return m ? m[1].trim() : ''; };
            const echauf = parse('ECHAUF') || 'Exercices spécifiques adaptés';
            const s1t = parse('SIT1_TITRE') || 'Situation analytique';
            const s1d = parse('SIT1_DEROUL') || 'Travail technique en groupes';
            const s1c = parse('SIT1_CONSIG') || '1. Respecter les consignes 2. Travailler ensemble 3. S\'engager';
            const s1v = parse('SIT1_VAR') || 'Simplifier: réduire contraintes / Complexifier: ajouter opposition';
            const s2t = parse('SIT2_TITRE') || 'Situation globale';
            const s2d = parse('SIT2_DEROUL') || 'Application en situation de jeu';
            const s2c = parse('SIT2_CONSIG') || '1. Appliquer l\'objectif 2. Communiquer 3. S\'adapter';
            const s2v = parse('SIT2_VAR') || 'Simplifier: effectif réduit / Complexifier: contrainte temps';

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.4cm}
body{font-family:Calibri,sans-serif;font-size:7.5pt;line-height:1.15}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px 3px;vertical-align:top}
.hd td{border:none;font-size:7.5pt;padding:1px 3px}
.tt{text-align:center;font-size:11pt;font-weight:bold;background:#2c3e50;color:#fff;padding:4px}
.lb{background:#ecf0f1;font-weight:bold;font-size:6.5pt;text-align:center}
.ob{background:#2c3e50;color:#fff;font-weight:bold;font-size:7pt}
.mh{background:#2c3e50;color:#fff;font-weight:bold;text-align:center;font-size:7pt}
.pt{font-weight:bold;text-align:center;background:#f8f9fa;font-size:7.5pt}
.ct{font-size:6.5pt;line-height:1.15}
b{color:#2c3e50}
</style></head>
<body>
<table class="hd"><tr><td style="width:33%"><b>Professeur :</b> ${nomProf||'_____'}</td><td style="text-align:center"><b>Établissement :</b> ${etablissement||'_____'}</td><td style="text-align:right"><b>Année scolaire :</b> ${anneeScolaire||'2024-2025'}</td></tr></table>
<table><tr><td class="tt">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr></table>
<table>
<tr><td class="lb" style="width:7%">Groupe APS</td><td style="width:13%">${groupeAPS}</td><td class="lb" style="width:4%">APS</td><td style="width:11%">${aps}</td><td class="lb" style="width:5%">Niveau</td><td style="width:6%">${niveau}</td><td class="lb" style="width:6%">Séance N°</td><td style="width:4%">${numeroSeance||1}</td></tr>
<tr><td class="lb">OTI</td><td colspan="7" style="font-size:6pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td colspan="7" style="font-size:6pt">${otc}</td></tr>
<tr><td class="ob">OBJECTIF</td><td colspan="7" style="background:#eaf2f8;font-weight:bold;font-size:7.5pt">${objectif}</td></tr>
</table>
<table>
<tr><th class="mh" style="width:5%">PARTIES</th><th class="mh" style="width:4%">DURÉE</th><th class="mh" style="width:52%">CONTENU / SITUATIONS D'APPRENTISSAGE</th><th class="mh" style="width:8%">BUT</th><th class="mh" style="width:15.5%">C. DE RÉALISATION</th><th class="mh" style="width:15.5%">C. DE RÉUSSITE</th></tr>
<tr>
<td class="pt">INTRODUCTIVE</td><td style="text-align:center;font-weight:bold">15'</td>
<td class="ct"><b>• Prise en main (3') :</b> Rassemblement, appel, vérification des tenues, présentation de l'objectif et des consignes de sécurité.<br><b>• Échauffement général (7') :</b> Course, mobilisation articulaire progressive, gammes athlétiques.<br><b>• Échauffement spécifique (5') :</b> ${echauf}</td>
<td class="ct">Préparer l'organisme à l'effort et mobiliser l'attention.</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic;color:#7f8c8d">Phase de préparation - Observation de l'engagement</td>
</tr>
<tr>
<td class="pt">FONDAMENTALE</td><td style="text-align:center;font-weight:bold">35'</td>
<td class="ct">
<b>◆ SITUATION 1 : ${s1t} (12')</b><br>
<u>Déroulement :</u> ${s1d}<br>
<u>Consignes :</u> ${s1c}<br>
<u>Variantes :</u> ${s1v}<br><br>
<b>◆ SITUATION 2 : ${s2t} (13')</b><br>
<u>Déroulement :</u> ${s2d}<br>
<u>Consignes :</u> ${s2c}<br>
<u>Variantes :</u> ${s2v}<br><br>
<b>◆ SITUATION DE RÉFÉRENCE (10') :</b> ${sitRef}
</td>
<td class="ct">Atteindre l'objectif à travers des situations d'apprentissage progressives.</td>
<td class="ct">• Placement corporel adapté<br>• Geste technique maîtrisé<br>• Actions enchaînées avec fluidité<br>• Prise d'information pertinente</td>
<td class="ct">• Taux de réussite ≥ 70%<br>• Progression observable<br>• Objectif atteint en situation<br>• Engagement constant</td>
</tr>
<tr>
<td class="pt">FINALE</td><td style="text-align:center;font-weight:bold">10'</td>
<td class="ct"><b>• Retour au calme (5') :</b> Marche, respiration profonde, étirements des groupes musculaires sollicités.<br><b>• Bilan (5') :</b> Questionnement des élèves, feedback sur les apprentissages, rangement du matériel.</td>
<td class="ct">Permettre la récupération et faire le bilan des apprentissages.</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic;color:#7f8c8d">Phase de récupération - Évaluation formative</td>
</tr>
</table>
<p style="text-align:center;font-size:6pt;color:#7f8c8d;margin-top:3px">Document conforme aux Orientations Pédagogiques ${isCollege ? '2009' : '2007'} | Ministère de l'Éducation Nationale - Maroc</p>
</body></html>`;
            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            
            // Obtenir les objectifs appropriés
            let objectifs;
            if (OBJECTIFS_SEANCES[aps]) {
                objectifs = isCollege ? OBJECTIFS_SEANCES[aps].college : OBJECTIFS_SEANCES[aps].lycee;
            } else {
                objectifs = getObjectifsDefaut(aps, isCollege, nb);
            }
            
            // Ajuster au nombre de séances demandé
            while (objectifs.length < nb) {
                objectifs.splice(objectifs.length - 1, 0, `Consolidation et perfectionnement des acquis en ${aps.toLowerCase()}.`);
            }
            objectifs = objectifs.slice(0, nb);

            let rows = '';
            const sequences = ['Évaluation diagnostique', 'Acquisition', 'Apprentissage', 'Apprentissage', 'Apprentissage', 'Consolidation', 'Consolidation', 'Perfectionnement', 'Intégration', 'Évaluation terminale'];
            
            for (let i = 0; i < nb; i++) {
                let seq = sequences[i] || 'Apprentissage';
                if (i === 0) seq = 'Évaluation diagnostique';
                else if (i === 1) seq = 'Acquisition';
                else if (i === nb - 1) seq = 'Évaluation terminale';
                else if (i === nb - 2) seq = 'Intégration';
                
                rows += `<tr><td style="text-align:center;background:#f8f9fa">${seq}</td><td style="text-align:center;font-weight:bold">${i + 1}</td><td style="font-size:8pt">${objectifs[i]}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Projet ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.6cm}
body{font-family:Calibri,sans-serif;font-size:9pt}
table{width:100%;border-collapse:collapse;margin-bottom:6px}
th,td{border:1pt solid #000;padding:4px 6px;vertical-align:top}
.ti{font-size:20pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;border:none;color:#2c3e50}
.hd{background:#ecf0f1;font-weight:bold;text-align:center;font-size:8pt}
.sc{background:#2c3e50;color:#fff;font-weight:bold;font-size:9pt}
.lb{background:#ecf0f1;font-weight:bold;font-size:8pt}
</style></head>
<body>
<table style="border:none"><tr><td class="ti">Projet pédagogique de cycle (${niveau})</td></tr></table>
<table>
<tr><td class="hd">MODULE</td><td class="hd">GROUPE D'APS</td><td class="hd">APS</td><td class="hd">NIVEAU SCOLAIRE</td><td class="hd">NOMBRE DE SÉANCES</td></tr>
<tr><td style="text-align:center;font-size:8pt">Adaptation des réponses motrices en fonction des changements des situations</td><td style="text-align:center">${groupeAPS}</td><td style="text-align:center;font-weight:bold">${aps}</td><td style="text-align:center">${niveau}</td><td style="text-align:center;font-weight:bold">${nb}</td></tr>
</table>
<table>
<tr><td class="lb" style="width:22%">Objectif Terminal d'Intégration</td><td style="font-size:8pt">${oti}</td></tr>
<tr><td class="lb">Objectif Terminal du Cycle</td><td style="font-size:8pt">${otc}</td></tr>
<tr><td class="lb">Compétences visées</td><td style="font-size:8pt">• Gestion des ressources individuelles pour une meilleure réalisation possible.<br>• Application des principales lois de la sécurité et de la compétition concernant l'APS.</td></tr>
</table>
<table>
<tr><td class="lb" rowspan="2" style="width:18%;vertical-align:middle;text-align:center">Acquisitions attendues</td><td class="hd" style="width:27%">Connaissances procédurales</td><td class="hd" style="width:27%">Connaissances conceptuelles</td><td class="hd" style="width:28%">Connaissances comportementales</td></tr>
<tr><td style="font-size:8pt">• Optimiser la prestation en opérant les gestes techniques fondamentaux.<br>• Enchaîner les actions motrices avec efficacité.</td><td style="font-size:8pt">• Notions réglementaires de l'APS.<br>• Vocabulaire spécifique.<br>• Principes de sécurité.</td><td style="font-size:8pt">• Assiduité et ponctualité.<br>• Engagement dans l'activité.<br>• Organisation au sein du groupe.<br>• Respect des règles et des partenaires.</td></tr>
</table>
<table>
<tr><td class="sc" colspan="3" style="text-align:center">PROGRESSION PÉDAGOGIQUE DES SÉANCES</td></tr>
<tr><th class="hd" style="width:18%">Séquences</th><th class="hd" style="width:8%">Séances</th><th class="hd">Objectifs opérationnels</th></tr>
${rows}
</table>
<p style="text-align:right;font-size:8pt;margin-top:8px;color:#7f8c8d"><b>Professeur :</b> ${nomProf||'_____'} | <b>Établissement :</b> ${etablissement||'_____'} | <b>Année scolaire :</b> ${anneeScolaire||'2024-2025'}</p>
</body></html>`;
            filename = `Projet_Cycle_${aps.replace(/\s+/g,'_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'observation" : "Grille d'évaluation";
            
            let headMain = '', headSub = '', emptyCols = '';
            
            if (isObs) {
                // Grille d'observation avec critères didactiques
                criteresObs.criteres.forEach(c => {
                    headMain += `<th colspan="${c.sousCriteres.length}" style="text-align:center;background:#2c3e50;color:#fff;font-size:7pt">${c.nom}</th>`;
                    c.sousCriteres.forEach(sc => {
                        headSub += `<td style="text-align:center;font-size:6pt;background:#ecf0f1">${sc}</td>`;
                        emptyCols += '<td style="width:4%"></td>';
                    });
                });
                if (criteresObs.performance) {
                    headMain += '<th rowspan="2" style="background:#2c3e50;color:#fff;font-size:7pt;width:8%">Perf.</th>';
                    emptyCols += '<td></td>';
                } else if (criteresObs.observation) {
                    headMain += '<th rowspan="2" style="background:#2c3e50;color:#fff;font-size:7pt;width:8%">Obs.</th>';
                    emptyCols += '<td></td>';
                } else if (criteresObs.note) {
                    headMain += '<th rowspan="2" style="background:#2c3e50;color:#fff;font-size:7pt;width:8%">Note</th>';
                    emptyCols += '<td></td>';
                }
            } else {
                // Grille d'évaluation avec barème
                criteresEval.forEach(c => {
                    headMain += `<th style="background:#2c3e50;color:#fff;font-size:7pt;width:12%">${c.nom}<br><small>(/${c.points})</small></th>`;
                    emptyCols += '<td></td>';
                });
                headMain += '<th style="background:#2c3e50;color:#fff;font-size:7pt;width:8%">Note<br><small>/20</small></th>';
                emptyCols += '<td></td>';
            }

            let rows = '';
            for (let i = 1; i <= 40; i++) {
                rows += `<tr style="height:15px"><td style="text-align:center;font-size:8pt">${i}</td><td></td><td></td>${emptyCols}</tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${titre} ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px}
.ti{font-size:18pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#2c3e50}
</style></head>
<body>
<p class="ti">${titre} (${aps})</p>
<table style="border:none;margin-bottom:5px"><tr><td style="border:none;font-size:9pt"><b>Classe :</b> ${classe||'_______'}</td><td style="border:none;text-align:right;font-size:9pt"><b>${nomProf||'Professeur'}</b> – ${etablissement||'Établissement'}</td></tr></table>
<table>
<tr><th rowspan="2" style="background:#2c3e50;color:#fff;width:4%;font-size:7pt">N°</th><th rowspan="2" colspan="2" style="background:#2c3e50;color:#fff;width:20%;font-size:7pt">Nom et Prénom</th>${headMain}</tr>
${isObs ? `<tr>${headSub}</tr>` : ''}
${rows}
</table>
<p style="text-align:right;font-size:7pt;color:#7f8c8d;margin-top:5px">${nomProf||''} – ${etablissement||''}</p>
</body></html>`;
            filename = `Grille_${isObs?'Observation':'Evaluation'}_${aps.replace(/\s+/g,'_')}.doc`;
        }

        return res.status(200).json({ success: true, html, filename, ficheDetaillee, oti, otc, groupeAPS, situationReference: sitRef });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
