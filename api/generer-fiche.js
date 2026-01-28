module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { typeDocument, typeGrille, aps, objectif, niveau, niveauEleves, nomProf, etablissement, anneeScolaire, numeroSeance, nombreSeances, classe } = req.body;

        if (!aps || !niveau) return res.status(400).json({ success: false, error: 'APS et niveau requis' });

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);

        // ==================== OTI COMPLETS ====================
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
                'TC': "L'élève doit être capable de maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.",
                '1AB': "L'élève doit être capable d'analyser et d'améliorer ses points faibles pour progresser dans sa performance chronométrique.",
                '2AB': "L'élève doit être capable d'atteindre son potentiel maximal par une préparation et une exécution optimales."
            },
            'Course de durée': {
                '1AC': "L'élève doit être capable de courir de façon régulière sur une durée donnée en gérant son effort.",
                '2AC': "L'élève doit être capable d'adapter son allure de course pour maintenir un effort prolongé.",
                '3AC': "L'élève doit être capable de construire et de respecter un projet de course en fonction de ses capacités.",
                'TC': "L'élève doit être capable de planifier et de réaliser une performance en course de durée en gérant efficacement ses ressources.",
                '1AB': "L'élève doit être capable d'optimiser sa performance par une gestion stratégique de l'allure de course.",
                '2AB': "L'élève doit être capable d'atteindre ses objectifs de performance par une préparation et une stratégie adaptées."
            },
            'Lancer de poids': {
                '1AC': "L'élève doit être capable de lancer un engin en utilisant une poussée du bras depuis l'épaule.",
                '2AC': "L'élève doit être capable de coordonner la poussée des jambes et l'action du bras pour améliorer son lancer.",
                '3AC': "L'élève doit être capable d'enchaîner les actions motrices du lancer en respectant la technique et les règles.",
                'TC': "L'élève doit être capable de réaliser un lancer de poids en maîtrisant la coordination des différents segments corporels.",
                '1AB': "L'élève doit être capable d'améliorer sa performance par le perfectionnement technique et le développement de la puissance.",
                '2AB': "L'élève doit être capable d'optimiser sa performance par une maîtrise complète de la chaîne de lancer."
            },
            'Gymnastique': {
                '1AC': "L'élève doit être capable de réaliser un enchaînement simple de 3A et 2B présenté devant la classe.",
                '2AC': "L'élève doit être capable de présenter un enchaînement varié comprenant 3A, 2B et 1C avec des liaisons fluides.",
                '3AC': "L'élève doit être capable de concevoir et de réaliser un enchaînement individuel comprenant 2A, 4B et 1C.",
                'TC': "L'élève doit être capable de présenter un enchaînement gymnique comprenant 2A, 3B et 2C avec maîtrise.",
                '1AB': "L'élève doit être capable de composer et réaliser un enchaînement comprenant 2B, 3C et 2D avec continuité.",
                '2AB': "L'élève doit être capable de concevoir, réaliser et évaluer un enchaînement varié comprenant 2C, 3D et 2E."
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
            'Handball': '7 contre 7', 'Football': '5 contre 5', 'Basketball': '5 contre 5', 'Volleyball': '6 contre 6',
            'Tennis de table': 'Match simple', 'Badminton': 'Match simple',
            'Course de vitesse': isCollege ? '80m' : '80m (G) / 60m (F)',
            'Saut en longueur': '3 essais mesurés', 'Saut en hauteur': 'Concours à barres montantes',
            'Lancer de poids': '3 essais (4kg G / 3kg F)', 'Course de durée': '1000m (G) / 600m (F)',
            'Gymnastique': 'Enchaînement au sol'
        };

        // ==================== OBJECTIFS PAR NIVEAU D'ÉLÈVES ====================
        const getObjectifsParNiveau = (aps, niveau, niveauEleves, nbSeances) => {
            const sitRef = SITUATIONS_REF[aps];
            const niveauTxt = { 'debutant': 'débutant', 'moyen': 'intermédiaire', 'avance': 'avancé', 'elite': 'expert' }[niveauEleves] || 'intermédiaire';
            
            const baseObjectifs = {
                'debutant': [
                    `Évaluation diagnostique : Observer les capacités initiales des élèves débutants à travers la situation de référence (${sitRef}) pour identifier les prérequis et les besoins.`,
                    `Découverte de l'activité : Présenter les règles fondamentales, le vocabulaire spécifique et les consignes de sécurité de ${aps}.`,
                    `Familiarisation : Découvrir les gestes de base de ${aps} à travers des situations ludiques et accessibles.`,
                    `Acquisition des fondamentaux : Maîtriser les techniques de base dans des situations simplifiées sans opposition.`,
                    `Consolidation des bases : Reproduire les gestes fondamentaux avec régularité et correction.`,
                    `Application simple : Utiliser les acquis de base dans des situations aménagées à faible complexité.`,
                    `Situation facilitée : Mettre en œuvre les apprentissages dans un contexte adapté au niveau débutant.`,
                    `Intégration guidée : Enchaîner les actions apprises avec l'aide de repères et de consignes.`,
                    `Préparation à l'évaluation : Répéter la situation de référence dans des conditions facilitées.`,
                    `Évaluation terminale : Valider les acquis fondamentaux à travers la situation de référence (${sitRef}) adaptée au niveau débutant.`
                ],
                'moyen': [
                    `Évaluation diagnostique : Analyser les compétences initiales des élèves à travers la situation de référence (${sitRef}) pour orienter le cycle.`,
                    `Rappel et approfondissement : Consolider les connaissances réglementaires et approfondir les principes tactiques de ${aps}.`,
                    `Perfectionnement technique : Améliorer la qualité d'exécution des gestes fondamentaux en situations variées.`,
                    `Développement tactique : Comprendre et appliquer les principes de base de l'organisation collective ou individuelle.`,
                    `Situations complexes : Mobiliser les acquis techniques dans des situations à contraintes multiples.`,
                    `Adaptation au contexte : Ajuster ses réponses motrices en fonction des configurations de jeu ou de la situation.`,
                    `Enchaînement d'actions : Lier les différentes phases techniques avec fluidité et efficacité.`,
                    `Autonomie dans l'activité : Prendre des initiatives et faire des choix pertinents en situation.`,
                    `Intégration des apprentissages : Mobiliser l'ensemble des acquis dans une situation proche de la référence.`,
                    `Évaluation terminale : Valider les compétences acquises à travers la situation de référence (${sitRef}) selon les critères définis.`
                ],
                'avance': [
                    `Évaluation diagnostique : Évaluer précisément le niveau de maîtrise des élèves avancés à travers la situation de référence (${sitRef}).`,
                    `Analyse tactique : Approfondir la compréhension des stratégies et des systèmes de jeu de ${aps}.`,
                    `Perfectionnement avancé : Affiner les détails techniques pour gagner en efficacité et en précision.`,
                    `Lecture de jeu : Développer la capacité à anticiper et à s'adapter rapidement aux situations.`,
                    `Prise de décision : Optimiser la pertinence et la rapidité des choix en situation complexe.`,
                    `Performance sous pression : Maintenir la qualité d'exécution dans des conditions exigeantes.`,
                    `Leadership : Développer la capacité à organiser et à guider le groupe dans l'activité.`,
                    `Gestion de match : Maîtriser les aspects stratégiques et psychologiques de la compétition.`,
                    `Préparation intensive : Simuler les conditions de l'évaluation avec exigence maximale.`,
                    `Évaluation terminale : Valider un niveau de maîtrise avancé à travers la situation de référence (${sitRef}).`
                ],
                'elite': [
                    `Évaluation diagnostique : Identifier les axes de perfectionnement des élèves experts à travers la situation de référence (${sitRef}).`,
                    `Expertise tactique : Maîtriser les stratégies avancées et les variantes tactiques de haut niveau.`,
                    `Excellence technique : Atteindre un niveau d'exécution optimal sur l'ensemble des gestes spécifiques.`,
                    `Créativité motrice : Développer des réponses originales et efficaces face aux situations nouvelles.`,
                    `Gestion de la performance : Optimiser tous les paramètres (physiques, techniques, mentaux) de la performance.`,
                    `Transmission : Être capable d'analyser, d'expliquer et de démontrer les techniques aux autres.`,
                    `Arbitrage et observation : Maîtriser les règles et être capable d'évaluer les performances des pairs.`,
                    `Compétition simulée : Performer dans des conditions proches de la compétition officielle.`,
                    `Optimisation finale : Peaufiner les derniers détails en vue de l'évaluation terminale.`,
                    `Évaluation terminale : Valider un niveau d'expertise à travers la situation de référence (${sitRef}) avec critères exigeants.`
                ]
            };
            
            let objectifs = baseObjectifs[niveauEleves] || baseObjectifs['moyen'];
            while (objectifs.length < nbSeances) {
                objectifs.splice(objectifs.length - 1, 0, `Renforcement des acquis : Consolider et automatiser les compétences développées.`);
            }
            return objectifs.slice(0, nbSeances);
        };

        // ==================== CRITÈRES D'OBSERVATION ====================
        const CRITERES_OBSERVATION = {
            'Saut en longueur': {
                criteres: [
                    { nom: 'Course d\'élan', sous: ['Accélérée', 'Irrégulière'] },
                    { nom: 'Piétinement', sous: ['Absent', 'Présent'] },
                    { nom: 'Appel', sous: ['Avant', 'Sur', 'Mordu'] },
                    { nom: 'Réception', sous: ['2 pieds', 'Autre'] }
                ], perf: true
            },
            'Saut en hauteur': {
                criteres: [
                    { nom: 'Course', sous: ['Courbe', 'Droite'] },
                    { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] },
                    { nom: 'Franchissement', sous: ['Dorsal', 'Autre'] },
                    { nom: 'Réception', sous: ['Dos', 'Danger'] }
                ], perf: true
            },
            'Course de vitesse': {
                criteres: [
                    { nom: 'Départ', sous: ['Réactif', 'Lent'] },
                    { nom: 'Accélération', sous: ['Bonne', 'Faible'] },
                    { nom: 'Fréquence', sous: ['Élevée', 'Basse'] },
                    { nom: 'Ligne', sous: ['Droite', 'Déviée'] }
                ], perf: true
            },
            'Lancer de poids': {
                criteres: [
                    { nom: 'Position', sous: ['Correcte', 'Incorrecte'] },
                    { nom: 'Placement', sous: ['Cou', 'Éloigné'] },
                    { nom: 'Poussée', sous: ['Complète', 'Partielle'] },
                    { nom: 'Équilibre', sous: ['Oui', 'Non'] }
                ], perf: true
            },
            'Handball': {
                criteres: [
                    { nom: 'Passe', sous: ['Précise', 'Imprécise'] },
                    { nom: 'Réception', sous: ['Assurée', 'Hésitante'] },
                    { nom: 'Tir', sous: ['Cadré', 'Non cadré'] },
                    { nom: 'Démarquage', sous: ['Oui', 'Non'] }
                ], obs: true
            },
            'Football': {
                criteres: [
                    { nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] },
                    { nom: 'Passe', sous: ['Précise', 'Imprécise'] },
                    { nom: 'Contrôle', sous: ['Orienté', 'Subi'] },
                    { nom: 'Placement', sous: ['Bon', 'Mauvais'] }
                ], obs: true
            },
            'Basketball': {
                criteres: [
                    { nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] },
                    { nom: 'Passe', sous: ['Bonne', 'Mauvaise'] },
                    { nom: 'Tir', sous: ['Correct', 'Déséquilibré'] },
                    { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }
                ], obs: true
            },
            'Volleyball': {
                criteres: [
                    { nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] },
                    { nom: 'Passe haute', sous: ['Correcte', 'Basse'] },
                    { nom: 'Service', sous: ['Réussi', 'Faute'] },
                    { nom: 'Déplacement', sous: ['Anticipé', 'Retard'] }
                ], obs: true
            },
            'Gymnastique': {
                criteres: [
                    { nom: 'Éléments A', sous: ['Réussi', 'Raté'] },
                    { nom: 'Éléments B', sous: ['Réussi', 'Raté'] },
                    { nom: 'Éléments C', sous: ['Réussi', 'Raté'] },
                    { nom: 'Liaison', sous: ['Fluide', 'Arrêts'] }
                ], note: true
            },
            'Tennis de table': {
                criteres: [
                    { nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] },
                    { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] },
                    { nom: 'Service', sous: ['Réussi', 'Faute'] },
                    { nom: 'Déplacement', sous: ['Équilibré', 'Instable'] }
                ], obs: true
            },
            'Badminton': {
                criteres: [
                    { nom: 'Dégagé', sous: ['Fond', 'Court'] },
                    { nom: 'Amorti', sous: ['Près filet', 'Long'] },
                    { nom: 'Service', sous: ['Réussi', 'Faute'] },
                    { nom: 'Replacement', sous: ['Centre', 'Excentré'] }
                ], obs: true
            },
            'Course de durée': {
                criteres: [
                    { nom: 'Régularité', sous: ['Constante', 'Variable'] },
                    { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] },
                    { nom: 'Posture', sous: ['Correcte', 'Incorrecte'] },
                    { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }
                ], perf: true
            }
        };

        // Critères évaluation
        const CRITERES_EVAL = {
            'sports_collectifs': [
                { nom: 'Maîtrise technique', pts: 5 },
                { nom: 'Pertinence tactique', pts: 5 },
                { nom: 'Engagement', pts: 5 },
                { nom: 'Respect règles', pts: 5 }
            ],
            'athletisme': [
                { nom: 'Performance', pts: 10 },
                { nom: 'Maîtrise technique', pts: 6 },
                { nom: 'Engagement', pts: 4 }
            ],
            'gymnastique': [
                { nom: 'Difficulté', pts: 6 },
                { nom: 'Exécution', pts: 8 },
                { nom: 'Composition', pts: 6 }
            ],
            'sports_renvoi': [
                { nom: 'Technique', pts: 6 },
                { nom: 'Tactique', pts: 6 },
                { nom: 'Efficacité', pts: 8 }
            ]
        };

        // Déterminer groupe
        let groupeAPS = 'Activité physique', typeEval = 'sports_collectifs';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) { groupeAPS = 'Sports collectifs'; typeEval = 'sports_collectifs'; }
        else if (['Tennis de table', 'Badminton'].includes(aps)) { groupeAPS = 'Sports de renvoi'; typeEval = 'sports_renvoi'; }
        else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) { groupeAPS = 'Athlétisme'; typeEval = 'athletisme'; }
        else if (aps === 'Gymnastique') { groupeAPS = 'Gymnastique'; typeEval = 'gymnastique'; }

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = SITUATIONS_REF[aps] || 'Situation adaptée';
        const critObs = CRITERES_OBSERVATION[aps] || CRITERES_OBSERVATION['Handball'];
        const critEval = CRITERES_EVAL[typeEval];

        let html = '', htmlDisplay = '', filename = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            // Générer contenu via IA
            const prompt = `Expert EPS Maroc. Fiche ${aps} niveau ${niveau}, objectif: "${objectif}".
Génère (format court):
ECHAUF: [3 exercices spécifiques courts]
SIT1_TITRE: [titre]
SIT1_DEROUL: [3 phrases]
SIT1_CONSIG: [3 consignes numérotées]
SIT1_VAR: [simplifier / complexifier]
SIT2_TITRE: [titre]
SIT2_DEROUL: [3 phrases]
SIT2_CONSIG: [3 consignes numérotées]
SIT2_VAR: [simplifier / complexifier]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

            const parse = (key) => { const m = contenu.match(new RegExp(key + ':\\s*(.+?)(?=\\n[A-Z_]|$)', 's')); return m ? m[1].trim() : ''; };
            const echauf = parse('ECHAUF') || 'Exercices spécifiques adaptés';
            const s1t = parse('SIT1_TITRE') || 'Situation analytique';
            const s1d = parse('SIT1_DEROUL') || 'Travail par ateliers';
            const s1c = parse('SIT1_CONSIG') || '1. Consigne 1 2. Consigne 2 3. Consigne 3';
            const s1v = parse('SIT1_VAR') || 'Simplifier / Complexifier';
            const s2t = parse('SIT2_TITRE') || 'Situation globale';
            const s2d = parse('SIT2_DEROUL') || 'Application en jeu';
            const s2c = parse('SIT2_CONSIG') || '1. Consigne 1 2. Consigne 2 3. Consigne 3';
            const s2v = parse('SIT2_VAR') || 'Simplifier / Complexifier';

            // Schémas colorés selon l'APS
            let schema1 = '', schema2 = '';
            if (['Handball', 'Football', 'Basketball'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#e8f5e9,#fff);border:3px solid #2e7d32;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#1b5e20;margin-bottom:15px;">📐 DISPOSITIF SITUATION 1</div>
                    <div style="background:#a5d6a7;border:2px solid #2e7d32;border-radius:10px;padding:20px;position:relative;min-height:180px;">
                        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                        <div style="position:absolute;left:20%;top:25%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">A1</div>
                        <div style="position:absolute;left:20%;top:65%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">A2</div>
                        <div style="position:absolute;left:45%;top:45%;background:#ff9800;border-radius:50%;width:25px;height:25px;display:flex;align-items:center;justify-content:center;">⚽</div>
                        <div style="position:absolute;right:20%;top:25%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">D1</div>
                        <div style="position:absolute;right:20%;top:65%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">D2</div>
                        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:15px;margin-top:12px;flex-wrap:wrap;">
                        <span style="background:#1976d2;color:white;padding:4px 12px;border-radius:15px;font-size:12px;">🔵 Attaquants</span>
                        <span style="background:#c62828;color:white;padding:4px 12px;border-radius:15px;font-size:12px;">🔴 Défenseurs</span>
                        <span style="background:#ff9800;color:white;padding:4px 12px;border-radius:15px;font-size:12px;">⚽ Ballon</span>
                    </div>
                </div>`;
                schema2 = schema1.replace('SITUATION 1', 'SITUATION 2');
            } else if (['Course de vitesse', 'Course de durée'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#fff3e0,#fff);border:3px solid #e65100;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:15px;">📐 DISPOSITIF - PISTE</div>
                    <div style="background:#ffcc80;border:2px solid #e65100;border-radius:10px;padding:15px;">
                        <div style="display:flex;flex-direction:column;gap:8px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;font-size:12px;">DÉPART</div>
                                <div style="flex:1;height:25px;background:repeating-linear-gradient(90deg,#d84315,#d84315 15px,#ff7043 15px,#ff7043 30px);border-radius:5px;"></div>
                                <div style="background:#f44336;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;font-size:12px;">ARRIVÉE</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;font-size:12px;">DÉPART</div>
                                <div style="flex:1;height:25px;background:repeating-linear-gradient(90deg,#1565c0,#1565c0 15px,#42a5f5 15px,#42a5f5 30px);border-radius:5px;"></div>
                                <div style="background:#f44336;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;font-size:12px;">ARRIVÉE</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (['Saut en longueur', 'Saut en hauteur'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#f3e5f5,#fff);border:3px solid #7b1fa2;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#4a148c;margin-bottom:15px;">📐 AIRE DE SAUT</div>
                    <div style="background:#ce93d8;border:2px solid #7b1fa2;border-radius:10px;padding:15px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">🏃 ÉLAN</div>
                            <div style="flex:1;height:30px;background:linear-gradient(90deg,#ef6c00,#ff9800,#ffb74d);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">━━━➡️━━━➡️━━━</div>
                            <div style="background:#f44336;color:white;padding:8px 10px;border-radius:5px;font-weight:bold;">📍 APPEL</div>
                            <div style="background:#ffeb3b;color:#333;padding:8px 20px;border-radius:8px;font-weight:bold;">${aps.includes('longueur') ? '🏖️ FOSSE' : '📏 TAPIS'}</div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Gymnastique') {
                schema1 = `<div style="background:linear-gradient(135deg,#fce4ec,#fff);border:3px solid #c2185b;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#880e4f;margin-bottom:15px;">📐 PRATICABLE</div>
                    <div style="background:#f8bbd9;border:2px solid #c2185b;border-radius:10px;padding:20px;position:relative;min-height:150px;">
                        <div style="position:absolute;top:10%;left:10%;background:#4caf50;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;">DÉPART</div>
                        <div style="position:absolute;top:30%;left:25%;font-size:30px;">🤸</div>
                        <div style="position:absolute;top:50%;left:45%;font-size:30px;">🤸‍♀️</div>
                        <div style="position:absolute;top:70%;left:65%;font-size:30px;">🤸</div>
                        <div style="position:absolute;bottom:10%;right:10%;background:#f44336;color:white;padding:6px 12px;border-radius:5px;font-weight:bold;">FIN</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Volleyball') {
                schema1 = `<div style="background:linear-gradient(135deg,#e3f2fd,#fff);border:3px solid #1565c0;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:15px;">📐 TERRAIN VOLLEYBALL</div>
                    <div style="background:#90caf9;border:2px solid #1565c0;border-radius:10px;padding:20px;position:relative;min-height:180px;">
                        <div style="position:absolute;top:50%;left:0;right:0;height:4px;background:#fff;"></div>
                        <div style="position:absolute;top:20%;left:15%;background:#1976d2;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">1</div>
                        <div style="position:absolute;top:20%;left:35%;background:#1976d2;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">2</div>
                        <div style="position:absolute;top:35%;left:25%;background:#1976d2;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">3</div>
                        <div style="position:absolute;top:65%;right:15%;background:#c62828;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">1</div>
                        <div style="position:absolute;top:65%;right:35%;background:#c62828;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">2</div>
                        <div style="position:absolute;top:80%;right:25%;background:#c62828;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;">3</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else {
                schema1 = `<div style="background:linear-gradient(135deg,#e0f7fa,#fff);border:3px solid #00838f;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#006064;margin-bottom:15px;">📐 DISPOSITIF</div>
                    <div style="background:#80deea;border:2px solid #00838f;border-radius:10px;padding:20px;text-align:center;min-height:120px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:16px;color:#00838f;">Organisation adaptée à ${aps}</span>
                    </div>
                </div>`;
                schema2 = schema1;
            }

            // HTML pour affichage sur le site (avec schémas)
            htmlDisplay = `
            <div style="font-family:Segoe UI,sans-serif;max-width:900px;margin:0 auto;">
                <div style="background:linear-gradient(135deg,#1a5c3a,#2e7d32);color:white;padding:20px;border-radius:15px;margin-bottom:20px;">
                    <h2 style="margin:0 0 10px 0;">📋 Fiche de séance - ${aps}</h2>
                    <p style="margin:0;opacity:0.9;">Niveau: ${niveau} | Séance N°${numeroSeance || 1}</p>
                </div>
                
                <div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:15px;border-radius:0 10px 10px 0;margin-bottom:20px;">
                    <strong style="color:#1a5c3a;">🎯 OBJECTIF :</strong> ${objectif}
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:20px;margin-bottom:20px;">
                    <h3 style="color:#1a5c3a;border-bottom:2px solid #1a5c3a;padding-bottom:10px;">📌 PARTIE INTRODUCTIVE (15 min)</h3>
                    <p><strong>• Prise en main (3') :</strong> Rassemblement, appel, présentation de l'objectif, consignes de sécurité.</p>
                    <p><strong>• Échauffement général (7') :</strong> Course, mobilisation articulaire, gammes.</p>
                    <p><strong>• Échauffement spécifique (5') :</strong> ${echauf}</p>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:20px;margin-bottom:20px;">
                    <h3 style="color:#1a5c3a;border-bottom:2px solid #1a5c3a;padding-bottom:10px;">⚡ PARTIE FONDAMENTALE (35 min)</h3>
                    
                    <h4 style="color:#2e7d32;margin-top:20px;">◆ SITUATION 1 : ${s1t} (12 min)</h4>
                    ${schema1}
                    <p><strong>📋 Déroulement :</strong> ${s1d}</p>
                    <p><strong>📢 Consignes :</strong> ${s1c}</p>
                    <p><strong>🔄 Variantes :</strong> ${s1v}</p>
                    
                    <h4 style="color:#2e7d32;margin-top:30px;">◆ SITUATION 2 : ${s2t} (13 min)</h4>
                    ${schema2}
                    <p><strong>📋 Déroulement :</strong> ${s2d}</p>
                    <p><strong>📢 Consignes :</strong> ${s2c}</p>
                    <p><strong>🔄 Variantes :</strong> ${s2v}</p>
                    
                    <h4 style="color:#2e7d32;margin-top:30px;">◆ SITUATION DE RÉFÉRENCE (10 min)</h4>
                    <p style="background:#fff3e0;padding:10px;border-radius:8px;"><strong>Format :</strong> ${sitRef}</p>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:20px;">
                    <h3 style="color:#1a5c3a;border-bottom:2px solid #1a5c3a;padding-bottom:10px;">🧘 PARTIE FINALE (10 min)</h3>
                    <p><strong>• Retour au calme (5') :</strong> Marche, respiration, étirements.</p>
                    <p><strong>• Bilan (5') :</strong> Questions, feedback, rangement du matériel.</p>
                </div>
            </div>`;

            // HTML pour Word/PDF (tableau sans schémas)
            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.4cm}
body{font-family:Calibri,sans-serif;font-size:7.5pt;line-height:1.15}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px 3px;vertical-align:top}
.hd td{border:none;font-size:7.5pt;padding:1px 3px}
.tt{text-align:center;font-size:11pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:4px}
.lb{background:#e8e8e8;font-weight:bold;font-size:6.5pt;text-align:center}
.ob{background:#1a5c3a;color:#fff;font-weight:bold;font-size:7pt}
.mh{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:7pt}
.pt{font-weight:bold;text-align:center;background:#f0f0f0;font-size:7.5pt}
.ct{font-size:6.5pt;line-height:1.15}
</style></head>
<body>
<table class="hd"><tr><td style="width:33%"><b>Professeur :</b> ${nomProf||'_____'}</td><td style="text-align:center"><b>Établissement :</b> ${etablissement||'_____'}</td><td style="text-align:right"><b>Année scolaire :</b> ${anneeScolaire||'2024-2025'}</td></tr></table>
<table><tr><td class="tt">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr></table>
<table>
<tr><td class="lb" style="width:7%">Groupe APS</td><td style="width:13%">${groupeAPS}</td><td class="lb" style="width:4%">APS</td><td style="width:11%">${aps}</td><td class="lb" style="width:5%">Niveau</td><td style="width:6%">${niveau}</td><td class="lb" style="width:6%">Séance N°</td><td style="width:4%">${numeroSeance||1}</td></tr>
<tr><td class="lb">OTI</td><td colspan="7" style="font-size:6pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td colspan="7" style="font-size:6pt">${otc}</td></tr>
<tr><td class="ob">OBJECTIF</td><td colspan="7" style="background:#e8f5e9;font-weight:bold;font-size:7.5pt">${objectif}</td></tr>
</table>
<table>
<tr><th class="mh" style="width:5%">PARTIES</th><th class="mh" style="width:4%">DURÉE</th><th class="mh" style="width:52%">CONTENU / SITUATIONS D'APPRENTISSAGE</th><th class="mh" style="width:8%">BUT</th><th class="mh" style="width:15.5%">C. RÉALISATION</th><th class="mh" style="width:15.5%">C. RÉUSSITE</th></tr>
<tr>
<td class="pt">INTRO</td><td style="text-align:center;font-weight:bold">15'</td>
<td class="ct"><b>• Prise en main (3') :</b> Appel, tenues, objectif, sécurité.<br><b>• Échauffement général (7') :</b> Course, mobilisation, gammes.<br><b>• Échauffement spécifique (5') :</b> ${echauf}</td>
<td class="ct">Préparer l'organisme</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de préparation</td>
</tr>
<tr>
<td class="pt">FONDA.</td><td style="text-align:center;font-weight:bold">35'</td>
<td class="ct">
<b>◆ SIT.1 : ${s1t} (12')</b><br>Déroulement : ${s1d}<br>Consignes : ${s1c}<br>Variantes : ${s1v}<br><br>
<b>◆ SIT.2 : ${s2t} (13')</b><br>Déroulement : ${s2d}<br>Consignes : ${s2c}<br>Variantes : ${s2v}<br><br>
<b>◆ SIT. RÉFÉRENCE (10') :</b> ${sitRef}
</td>
<td class="ct">Atteindre l'objectif</td>
<td class="ct">• Placement correct<br>• Geste maîtrisé<br>• Actions fluides<br>• Prise d'info</td>
<td class="ct">• Taux ≥ 70%<br>• Progression visible<br>• Objectif atteint<br>• Engagement constant</td>
</tr>
<tr>
<td class="pt">FINALE</td><td style="text-align:center;font-weight:bold">10'</td>
<td class="ct"><b>• Retour au calme (5') :</b> Marche, étirements.<br><b>• Bilan (5') :</b> Questions, feedback, rangement.</td>
<td class="ct">Récupération et bilan</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de récupération</td>
</tr>
</table>
<p style="text-align:center;font-size:6pt;color:#666">Conforme aux Orientations Pédagogiques ${isCollege ? '2009' : '2007'} | MEN Maroc</p>
</body></html>`;
            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivEleves = niveauEleves || 'moyen';
            const nivTxt = { 'debutant': 'Débutant (Initiation)', 'moyen': 'Moyen (Apprentissage)', 'avance': 'Avancé (Perfectionnement)', 'elite': 'Élite (Expertise)' }[nivEleves];
            
            const objectifs = getObjectifsParNiveau(aps, niveau, nivEleves, nb);
            
            let rows = '';
            const seqs = ['Évaluation diagnostique', 'Acquisition', 'Apprentissage', 'Apprentissage', 'Apprentissage', 'Consolidation', 'Consolidation', 'Perfectionnement', 'Intégration', 'Évaluation terminale'];
            for (let i = 0; i < nb; i++) {
                let seq = seqs[i] || 'Apprentissage';
                if (i === 0) seq = 'Évaluation diagnostique';
                else if (i === 1) seq = 'Acquisition';
                else if (i === nb - 1) seq = 'Évaluation terminale';
                else if (i === nb - 2) seq = 'Intégration';
                rows += `<tr><td style="text-align:center;background:#f5f5f5;font-weight:bold">${seq}</td><td style="text-align:center;font-weight:bold">${i + 1}</td><td style="font-size:8pt">${objectifs[i]}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Projet ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:9pt}
table{width:100%;border-collapse:collapse;margin-bottom:6px}
th,td{border:1pt solid #000;padding:4px 6px;vertical-align:top}
.ti{font-size:20pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;border:none;color:#1a5c3a}
.hd{background:#e8e8e8;font-weight:bold;text-align:center;font-size:8pt}
.sc{background:#1a5c3a;color:#fff;font-weight:bold;font-size:9pt;text-align:center}
.lb{background:#e8e8e8;font-weight:bold;font-size:8pt}
.niv{background:#e8f5e9;font-weight:bold;color:#1a5c3a}
</style></head>
<body>
<table style="border:none"><tr><td class="ti">Projet pédagogique de cycle (${niveau})</td></tr></table>
<table>
<tr><td class="hd">MODULE</td><td class="hd">GROUPE D'APS</td><td class="hd">APS</td><td class="hd">NIVEAU SCOLAIRE</td><td class="hd">NIVEAU ÉLÈVES</td><td class="hd">SÉANCES</td></tr>
<tr><td style="text-align:center;font-size:8pt">Adaptation des réponses motrices</td><td style="text-align:center">${groupeAPS}</td><td style="text-align:center;font-weight:bold">${aps}</td><td style="text-align:center">${niveau}</td><td class="niv" style="text-align:center">${nivTxt}</td><td style="text-align:center;font-weight:bold">${nb}</td></tr>
</table>
<table>
<tr><td class="lb" style="width:20%">Objectif Terminal d'Intégration</td><td style="font-size:8pt">${oti}</td></tr>
<tr><td class="lb">Objectif Terminal du Cycle</td><td style="font-size:8pt">${otc}</td></tr>
<tr><td class="lb">Compétences visées</td><td style="font-size:8pt">• Gestion des ressources individuelles pour une meilleure réalisation.<br>• Application des lois de sécurité et de compétition.</td></tr>
</table>
<table>
<tr><td class="lb" rowspan="2" style="width:18%;vertical-align:middle;text-align:center">Acquisitions attendues</td><td class="hd">Procédurales</td><td class="hd">Conceptuelles</td><td class="hd">Comportementales</td></tr>
<tr><td style="font-size:8pt">• Maîtriser les gestes techniques<br>• Enchaîner les actions</td><td style="font-size:8pt">• Notions réglementaires<br>• Principes de sécurité</td><td style="font-size:8pt">• Assiduité • Engagement<br>• Organisation • Respect</td></tr>
</table>
<table>
<tr><td class="sc" colspan="3">PROGRESSION PÉDAGOGIQUE DES SÉANCES</td></tr>
<tr><th class="hd" style="width:18%">Séquences</th><th class="hd" style="width:8%">Séances</th><th class="hd">Objectifs opérationnels</th></tr>
${rows}
</table>
<p style="text-align:right;font-size:8pt;margin-top:8px;color:#666"><b>Professeur :</b> ${nomProf||'_____'} | <b>Établissement :</b> ${etablissement||'_____'}</p>
</body></html>`;
            htmlDisplay = html;
            filename = `Projet_Cycle_${aps.replace(/\s+/g,'_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'observation" : "Grille d'évaluation";
            
            let headMain = '', headSub = '', emptyCols = '';
            
            if (isObs) {
                critObs.criteres.forEach(c => {
                    headMain += `<th colspan="${c.sous.length}" style="background:#1a5c3a;color:#fff;font-size:7pt;text-align:center">${c.nom}</th>`;
                    c.sous.forEach(s => {
                        headSub += `<td style="background:#e8e8e8;font-size:6pt;text-align:center">${s}</td>`;
                        emptyCols += '<td style="width:4%"></td>';
                    });
                });
                if (critObs.perf) { headMain += '<th rowspan="2" style="background:#1a5c3a;color:#fff;font-size:7pt;width:7%">Perf</th>'; emptyCols += '<td></td>'; }
                else if (critObs.obs) { headMain += '<th rowspan="2" style="background:#1a5c3a;color:#fff;font-size:7pt;width:7%">Obs</th>'; emptyCols += '<td></td>'; }
                else if (critObs.note) { headMain += '<th rowspan="2" style="background:#1a5c3a;color:#fff;font-size:7pt;width:7%">Note</th>'; emptyCols += '<td></td>'; }
            } else {
                critEval.forEach(c => {
                    headMain += `<th style="background:#1a5c3a;color:#fff;font-size:7pt;width:12%">${c.nom}<br><small>(/${c.pts})</small></th>`;
                    emptyCols += '<td></td>';
                });
                headMain += '<th style="background:#1a5c3a;color:#fff;font-size:7pt;width:8%">Note<br><small>/20</small></th>';
                emptyCols += '<td></td>';
            }

            let rows = '';
            for (let i = 1; i <= 40; i++) rows += `<tr style="height:15px"><td style="text-align:center;font-size:8pt">${i}</td><td></td><td></td>${emptyCols}</tr>`;

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${titre} ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px}
.ti{font-size:18pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#1a5c3a}
</style></head>
<body>
<p class="ti">${titre} (${aps})</p>
<table style="border:none;margin-bottom:5px"><tr><td style="border:none;font-size:9pt"><b>Classe :</b> ${classe||'_______'}</td><td style="border:none;text-align:right;font-size:9pt"><b>${nomProf||'Professeur'}</b> – ${etablissement||'Établissement'}</td></tr></table>
<table>
<tr><th rowspan="2" style="background:#1a5c3a;color:#fff;width:4%;font-size:7pt">N°</th><th rowspan="2" colspan="2" style="background:#1a5c3a;color:#fff;width:18%;font-size:7pt">Nom et Prénom</th>${headMain}</tr>
${isObs ? `<tr>${headSub}</tr>` : ''}
${rows}
</table>
<p style="text-align:right;font-size:7pt;color:#666;margin-top:5px">${nomProf||''} – ${etablissement||''}</p>
</body></html>`;
            htmlDisplay = html;
            filename = `Grille_${isObs?'Observation':'Evaluation'}_${aps.replace(/\s+/g,'_')}.doc`;
        }

        return res.status(200).json({ 
            success: true, 
            html,           // Pour téléchargement Word/PDF
            htmlDisplay,    // Pour affichage sur le site
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
