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

        // ==================== OTI COMPLETS (non résumés) ====================
        const OTI = {
            '1AC': "À la fin de la 1ère année du cycle secondaire collégial, l'élève doit être capable d'acquérir une motricité correcte lui permettant de s'adapter aux exigences des différentes situations motrices et de s'intégrer positivement dans le groupe classe tout en respectant les règles de sécurité et de fair-play.",
            '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées, tout en développant ses capacités d'adaptation aux situations variées et en respectant les règles de jeu.",
            '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations en fonction de leurs exigences organisationnelles et réglementaires, tout en faisant preuve d'autonomie et de responsabilité.",
            'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices tout en développant son sens critique et sa capacité à gérer efficacement ses ressources physiques et mentales.",
            '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes et d'améliorer ses réalisations par une gestion efficace de ses ressources, tout en s'inscrivant dans une démarche de projet individuel ou collectif.",
            '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser finement les différentes situations motrices et de s'intégrer efficacement dans la réalisation de projets collectifs et individuels, en faisant preuve d'expertise technique et d'intelligence tactique."
        };

        // ==================== OTC COMPLETS PAR APS (non résumés) ====================
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
                '2AC': "Enchaîner une course d'élan régulière et accélérée, une impulsion active sur la planche d'appel et un saut avec une attitude aérienne simple (ramené ou extension).",
                '3AC': "Optimiser sa course d'élan étalonnée pour faire coïncider la vitesse maximale avec la planche d'appel, et améliorer l'efficacité de l'impulsion et de la suspension.",
                'TC': "Maîtriser l'organisation de sa course d'élan et la qualité de son impulsion pour réaliser une performance optimale, en adoptant une technique aérienne efficace.",
                '1AB': "Augmenter l'efficacité du saut par la maîtrise de la liaison course-impulsion et l'amélioration de la phase aérienne (ciseau ou hitch-kick).",
                '2AB': "Optimiser sa performance en coordonnant les trois phases du saut (course, impulsion, suspension-réception) avec une technique aérienne maîtrisée."
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
                '3AC': "Gérer sa course du départ à l'arrivée en optimisant l'accélération, le maintien de la vitesse maximale et la finition, sur 80m.",
                'TC': "Maîtriser les différentes phases de la course de vitesse (réaction, mise en action, accélération, maintien) pour réaliser sa meilleure performance.",
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
                '1AC': "Lancer un engin (2-3 kg) en utilisant une poussée du bras depuis l'épaule, dans le respect des règles de sécurité et de l'aire de lancer.",
                '2AC': "Coordonner la poussée des jambes et l'action du bras lanceur pour améliorer la distance de lancer, en respectant la technique en translation.",
                '3AC': "Enchaîner les actions motrices du lancer (placement, élan, poussée, dégagé) en respectant la technique et les règles de la compétition.",
                'TC': "Réaliser un lancer en maîtrisant la coordination des différents segments corporels dans une technique en translation ou rotation.",
                '1AB': "Améliorer sa performance par le perfectionnement technique et le développement de la puissance musculaire spécifique.",
                '2AB': "Optimiser sa performance par une maîtrise complète de la chaîne de lancer et une gestion efficace de la compétition."
            },
            'Gymnastique': {
                '1AC': "Réaliser un enchaînement simple au sol comprenant au minimum 3 éléments de la famille A et 2 de la famille B, présenté avec maîtrise devant la classe.",
                '2AC': "Présenter un enchaînement gymnique varié comprenant 3 éléments A, 2 éléments B et 1 élément C, avec des liaisons fluides et une présentation soignée.",
                '3AC': "Concevoir et réaliser un enchaînement individuel au sol comprenant 2 éléments A, 4 éléments B et 1 élément C, avec originalité et maîtrise.",
                'TC': "Présenter un enchaînement gymnique au sol comprenant 2 éléments A, 3 éléments B et 2 éléments C, avec maîtrise technique et qualité de présentation.",
                '1AB': "Composer et réaliser un enchaînement au sol comprenant 2 éléments B, 3 éléments C et 2 éléments D, avec continuité et expression personnelle.",
                '2AB': "Concevoir, réaliser et évaluer un enchaînement gymnique varié comprenant 2 éléments C, 3 éléments D et 2 éléments E, avec expertise et créativité."
            },
            'Tennis de table': {
                '1AC': "Maintenir un échange en renvoyant la balle sur la table adverse, en utilisant le coup droit et le revers, dans le respect des règles du service et du jeu.",
                '2AC': "Diriger la balle dans différentes zones de la table pour mettre l'adversaire en difficulté, en variant les placements et les vitesses.",
                '3AC': "Varier les trajectoires, les vitesses et les effets pour prendre l'initiative du point et déstabiliser l'adversaire.",
                'TC': "Construire le point en utilisant des variations de placement, de vitesse et d'effet, en s'adaptant au jeu de l'adversaire.",
                '1AB': "Élaborer des stratégies de jeu adaptées aux caractéristiques de l'adversaire, en exploitant ses points faibles.",
                '2AB': "Mettre en œuvre un projet de jeu personnel et l'adapter en cours de match en fonction de l'évolution du rapport de force."
            },
            'Badminton': {
                '1AC': "Renvoyer le volant dans le terrain adverse en utilisant les frappes de base (dégagé, service), dans le respect des règles et des limites du terrain.",
                '2AC': "Varier la longueur et la direction de ses frappes (dégagé, amorti) pour déplacer l'adversaire et créer des espaces.",
                '3AC': "Alterner jeu long (dégagé) et jeu court (amorti, contre-amorti) pour créer des espaces libres et marquer le point.",
                'TC': "Construire le point en exploitant les espaces libres du terrain adverse, en variant les trajectoires hautes et basses.",
                '1AB': "Élaborer des séquences de jeu tactiquement cohérentes, en utilisant les feintes et les variations de rythme.",
                '2AB': "Concevoir et appliquer une stratégie de jeu personnelle adaptée à l'adversaire, en optimisant ses points forts."
            }
        };

        const SITUATIONS_REF = {
            'Handball': '7 contre 7 sur terrain réglementaire',
            'Football': '5 contre 5 sur terrain réduit',
            'Basketball': '5 contre 5 sur demi-terrain',
            'Volleyball': '6 contre 6 sur terrain réglementaire',
            'Tennis de table': 'Match en simple (2 sets gagnants)',
            'Badminton': 'Match en simple (2 sets gagnants)',
            'Course de vitesse': isCollege ? '80 mètres chronométré' : '80m (G) / 60m (F)',
            'Saut en longueur': '3 essais mesurés (meilleure performance)',
            'Saut en hauteur': 'Concours à barres montantes',
            'Lancer de poids': '3 essais mesurés (4kg G / 3kg F)',
            'Course de durée': isCollege ? '1000m (G) / 600m (F)' : '12 minutes (distance)',
            'Gymnastique': 'Enchaînement au sol noté'
        };

        // Objectifs par niveau d'élèves pour projet
        const getObjectifsParNiveau = (aps, niveauEleves, nbSeances) => {
            const sitRef = SITUATIONS_REF[aps];
            const obj = {
                'debutant': [`Évaluation diagnostique : Observer les capacités initiales via la situation de référence (${sitRef}).`, `Découverte : Présenter les règles fondamentales, le vocabulaire spécifique et les consignes de sécurité.`, `Familiarisation : Découvrir les gestes de base à travers des situations ludiques et accessibles.`, `Acquisition : Maîtriser les techniques fondamentales dans des situations simplifiées.`, `Consolidation : Reproduire les gestes avec régularité et correction.`, `Application : Utiliser les acquis dans des situations aménagées.`, `Situation facilitée : Mettre en œuvre les apprentissages dans un contexte adapté.`, `Intégration guidée : Enchaîner les actions apprises avec repères.`, `Préparation : Répéter la situation de référence dans des conditions facilitées.`, `Évaluation terminale : Valider les acquis fondamentaux (${sitRef}).`],
                'moyen': [`Évaluation diagnostique : Analyser les compétences initiales (${sitRef}).`, `Rappel : Consolider les connaissances réglementaires et tactiques.`, `Perfectionnement : Améliorer la qualité d'exécution des gestes.`, `Développement tactique : Appliquer les principes d'organisation.`, `Situations complexes : Mobiliser les acquis avec contraintes.`, `Adaptation : Ajuster ses réponses motrices aux configurations.`, `Enchaînement : Lier les phases techniques avec fluidité.`, `Autonomie : Prendre des initiatives et faire des choix pertinents.`, `Intégration : Mobiliser l'ensemble des acquis en situation.`, `Évaluation terminale : Valider les compétences (${sitRef}).`],
                'avance': [`Évaluation diagnostique : Évaluer le niveau de maîtrise (${sitRef}).`, `Analyse tactique : Approfondir stratégies et systèmes.`, `Perfectionnement avancé : Affiner les détails techniques.`, `Lecture de jeu : Développer l'anticipation et l'adaptation.`, `Prise de décision : Optimiser pertinence et rapidité des choix.`, `Performance sous pression : Maintenir la qualité en conditions exigeantes.`, `Leadership : Organiser et guider le groupe.`, `Gestion de match : Maîtriser les aspects stratégiques.`, `Préparation intensive : Simuler les conditions d'évaluation.`, `Évaluation terminale : Valider niveau avancé (${sitRef}).`],
                'elite': [`Évaluation diagnostique : Identifier axes de perfectionnement (${sitRef}).`, `Expertise tactique : Maîtriser stratégies avancées.`, `Excellence technique : Atteindre niveau optimal.`, `Créativité motrice : Développer réponses originales.`, `Gestion performance : Optimiser tous paramètres.`, `Transmission : Analyser et démontrer les techniques.`, `Arbitrage : Maîtriser règles et évaluer les pairs.`, `Compétition simulée : Performer en conditions officielles.`, `Optimisation finale : Peaufiner les derniers détails.`, `Évaluation terminale : Valider niveau expert (${sitRef}).`]
            };
            let o = obj[niveauEleves] || obj['moyen'];
            while (o.length < nbSeances) o.splice(-1, 0, `Renforcement : Consolider et automatiser les compétences acquises.`);
            return o.slice(0, nbSeances);
        };

        // Critères observation
        const CRITERES_OBS = {
            'Saut en longueur': { criteres: [{ nom: 'Course', sous: ['Accélérée', 'Irrégulière'] }, { nom: 'Appel', sous: ['Avant', 'Sur', 'Mordu'] }, { nom: 'Envol', sous: ['Groupé', 'Extension'] }, { nom: 'Réception', sous: ['2 pieds', 'Déséq.'] }], perf: true },
            'Saut en hauteur': { criteres: [{ nom: 'Course', sous: ['Courbe', 'Droite'] }, { nom: 'Appel', sous: ['Pied ext.', 'Autre'] }, { nom: 'Franch.', sous: ['Dorsal', 'Autre'] }, { nom: 'Réception', sous: ['Dos', 'Danger'] }], perf: true },
            'Course de vitesse': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Accél.', sous: ['Progressive', 'Brutale'] }, { nom: 'Fréquence', sous: ['Haute', 'Basse'] }, { nom: 'Ligne', sous: ['Droite', 'Déviée'] }], perf: true },
            'Lancer de poids': { criteres: [{ nom: 'Placement', sous: ['Correct', 'Incorrect'] }, { nom: 'Tenue', sous: ['Cou', 'Éloigné'] }, { nom: 'Poussée', sous: ['Complète', 'Partielle'] }, { nom: 'Équilibre', sous: ['Stable', 'Instable'] }], perf: true },
            'Course de durée': { criteres: [{ nom: 'Régularité', sous: ['Constante', 'Variable'] }, { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] }, { nom: 'Posture', sous: ['Correcte', 'Incorrecte'] }, { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }], perf: true },
            'Handball': { criteres: [{ nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Récept.', sous: ['Assurée', 'Hésitante'] }, { nom: 'Tir', sous: ['Cadré', 'Non cadré'] }, { nom: 'Démarq.', sous: ['Efficace', 'Passif'] }], obs: true },
            'Football': { criteres: [{ nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Contrôle', sous: ['Orienté', 'Subi'] }, { nom: 'Placement', sous: ['Bon', 'Mauvais'] }], obs: true },
            'Basketball': { criteres: [{ nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Tir', sous: ['Équilibré', 'Déséq.'] }, { nom: 'Démarq.', sous: ['Actif', 'Passif'] }], obs: true },
            'Volleyball': { criteres: [{ nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] }, { nom: 'Touche', sous: ['Haute', 'Basse'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Déplact.', sous: ['Anticipé', 'Retard'] }], obs: true },
            'Gymnastique': { criteres: [{ nom: 'Éléments A', sous: ['Réussi', 'Raté'] }, { nom: 'Éléments B', sous: ['Réussi', 'Raté'] }, { nom: 'Éléments C', sous: ['Réussi', 'Raté'] }, { nom: 'Liaison', sous: ['Fluide', 'Arrêts'] }], note: true },
            'Tennis de table': { criteres: [{ nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Déplact.', sous: ['Équilibré', 'Instable'] }], obs: true },
            'Badminton': { criteres: [{ nom: 'Dégagé', sous: ['Fond', 'Court'] }, { nom: 'Amorti', sous: ['Près filet', 'Long'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Replace.', sous: ['Centre', 'Excentré'] }], obs: true }
        };

        const CRITERES_EVAL = {
            'sports_collectifs': [{ nom: 'Technique', pts: 5 }, { nom: 'Tactique', pts: 5 }, { nom: 'Engagement', pts: 5 }, { nom: 'Fair-play', pts: 5 }],
            'athletisme': [{ nom: 'Performance', pts: 10 }, { nom: 'Maîtrise tech.', pts: 6 }, { nom: 'Engagement', pts: 4 }],
            'gymnastique': [{ nom: 'Difficulté', pts: 6 }, { nom: 'Exécution', pts: 8 }, { nom: 'Composition', pts: 6 }],
            'sports_renvoi': [{ nom: 'Technique', pts: 6 }, { nom: 'Tactique', pts: 6 }, { nom: 'Efficacité', pts: 8 }]
        };

        let groupeAPS = 'Activité', typeEval = 'sports_collectifs';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) { groupeAPS = 'Sports collectifs'; typeEval = 'sports_collectifs'; }
        else if (['Tennis de table', 'Badminton'].includes(aps)) { groupeAPS = 'Sports de renvoi'; typeEval = 'sports_renvoi'; }
        else if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) { groupeAPS = 'Athlétisme'; typeEval = 'athletisme'; }
        else if (aps === 'Gymnastique') { groupeAPS = 'Gymnastique'; typeEval = 'gymnastique'; }

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = SITUATIONS_REF[aps] || 'Situation adaptée';
        const critObs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];
        const critEval = CRITERES_EVAL[typeEval];

        let html = '', htmlDisplay = '', filename = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            const prompt = `Tu es un expert en EPS au Maroc. Génère le contenu DÉTAILLÉ pour une fiche de séance.
APS: ${aps} | Niveau: ${niveau} | Objectif: ${objectif}

GÉNÈRE EXACTEMENT CE FORMAT avec contenu SPÉCIFIQUE et DÉTAILLÉ:

ECHAUFFEMENT_SPECIFIQUE:
[3 exercices spécifiques détaillés avec organisation et durée]

SITUATION1_TITRE: [titre court et descriptif]
SITUATION1_ORGANISATION: [organisation détaillée: nombre joueurs, dimensions terrain, matériel nécessaire]
SITUATION1_DEROULEMENT: [explication complète en 5-6 phrases détaillées du déroulement]
SITUATION1_CONSIGNES:
1. [consigne technique précise]
2. [consigne tactique précise]
3. [consigne comportementale]
4. [consigne de sécurité si nécessaire]
SITUATION1_VARIANTES:
- Simplifier: [2 façons de simplifier]
- Complexifier: [2 façons de complexifier]

SITUATION2_TITRE: [titre court et descriptif]
SITUATION2_ORGANISATION: [organisation détaillée]
SITUATION2_DEROULEMENT: [explication complète en 5-6 phrases]
SITUATION2_CONSIGNES:
1. [consigne technique]
2. [consigne tactique]
3. [consigne comportementale]
4. [autre consigne]
SITUATION2_VARIANTES:
- Simplifier: [2 façons de simplifier]
- Complexifier: [2 façons de complexifier]

CRITERES_REALISATION:
• [critère technique 1]
• [critère technique 2]
• [critère tactique]
• [critère comportemental]

CRITERES_REUSSITE:
• [critère mesurable 1 avec %]
• [critère mesurable 2]
• [critère qualitatif]
• [critère de progression]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 3000, temperature: 0.7 })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

            const extract = (key) => {
                const regex = new RegExp(key + ':\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)', 'i');
                const match = contenu.match(regex);
                return match ? match[1].trim() : '';
            };

            const echaufSpec = extract('ECHAUFFEMENT_SPECIFIQUE') || 'Manipulation de balle individuelle (1 min), passes en binômes sur place puis en déplacement (2 min), jeu des 10 passes sans opposition (2 min).';
            const s1Titre = extract('SITUATION1_TITRE') || 'Conservation et progression';
            const s1Orga = extract('SITUATION1_ORGANISATION') || 'Terrain de 20x15m, 2 équipes de 4-5 joueurs, 4 plots pour délimiter, 1 ballon par terrain.';
            const s1Deroul = extract('SITUATION1_DEROULEMENT') || 'Les élèves sont répartis en deux équipes. L\'équipe en possession doit conserver le ballon et progresser vers la zone adverse. Les défenseurs tentent de récupérer la balle. Chaque passe réussie dans la zone de marque rapporte 1 point. Rotation des équipes toutes les 3 minutes.';
            const s1Consignes = extract('SITUATION1_CONSIGNES') || '1. Regarder avant de passer (prise d\'information)\n2. Se démarquer dans les espaces libres\n3. Communiquer avec ses partenaires\n4. Respecter les limites du terrain';
            const s1Variantes = extract('SITUATION1_VARIANTES') || '- Simplifier: Jouer en supériorité numérique (4c3), autoriser 3 touches de balle\n- Complexifier: Limiter à 2 touches, ajouter un défenseur, réduire le temps';
            const s2Titre = extract('SITUATION2_TITRE') || 'Jeu en mouvement vers la cible';
            const s2Orga = extract('SITUATION2_ORGANISATION') || 'Terrain de 25x20m avec 2 buts, 2 équipes de 5 joueurs, chasubles de 2 couleurs, 2 ballons.';
            const s2Deroul = extract('SITUATION2_DEROULEMENT') || 'Match à thème avec obligation d\'appliquer l\'objectif de la séance. L\'équipe qui marque en appliquant l\'objectif gagne 2 points au lieu d\'1. Temps de jeu de 5 minutes par manche. L\'enseignant arrête le jeu pour corriger et faire des feedbacks.';
            const s2Consignes = extract('SITUATION2_CONSIGNES') || '1. Appliquer l\'objectif travaillé en situation 1\n2. Enchaîner réception et passe rapidement\n3. S\'engager dans toutes les phases de jeu\n4. Respecter les règles et l\'arbitrage';
            const s2Variantes = extract('SITUATION2_VARIANTES') || '- Simplifier: Supériorité numérique offensive, zone protégée devant le but\n- Complexifier: Nombre de passes minimum avant de tirer, temps limité pour marquer';
            const critReal = extract('CRITERES_REALISATION') || '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine\n• Appel de balle dans l\'espace libre\n• Enchaînement réception-passe sans temps d\'arrêt';
            const critReuss = extract('CRITERES_REUSSITE') || '• 7 passes réussies sur 10 tentatives (70%)\n• Progression visible vers la cible adverse\n• Temps de conservation supérieur à 30 secondes\n• Application de l\'objectif en situation de jeu';

            // Schémas colorés selon l'APS
            let schema1 = '', schema2 = '';
            if (['Handball', 'Football', 'Basketball'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border:3px solid #2e7d32;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#1b5e20;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF - SITUATION 1</div>
                    <div style="background:#a5d6a7;border:2px solid #2e7d32;border-radius:12px;padding:25px;position:relative;min-height:200px;">
                        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffd54f;border:3px solid #f57f17;border-radius:8px;width:50px;height:70px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:bold;">🥅</div>
                        <div style="position:absolute;left:22%;top:18%;background:#1565c0;color:white;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);">A1</div>
                        <div style="position:absolute;left:22%;top:72%;background:#1565c0;color:white;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);">A2</div>
                        <div style="position:absolute;left:38%;top:45%;background:#1565c0;color:white;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);">A3</div>
                        <div style="position:absolute;left:48%;top:45%;background:#ff9800;border-radius:50%;width:30px;height:30px;box-shadow:0 4px 10px rgba(0,0,0,0.4);border:2px solid #e65100;"></div>
                        <div style="position:absolute;right:22%;top:18%;background:#c62828;color:white;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);">D1</div>
                        <div style="position:absolute;right:22%;top:72%;background:#c62828;color:white;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);">D2</div>
                        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffd54f;border:3px solid #f57f17;border-radius:8px;width:50px;height:70px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:bold;">🥅</div>
                        <div style="position:absolute;top:5px;left:50%;transform:translateX(-50%);background:white;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">→ Sens du jeu →</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:25px;margin-top:18px;flex-wrap:wrap;">
                        <span style="background:#1565c0;color:white;padding:6px 18px;border-radius:25px;font-size:13px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🔵 Attaquants (A)</span>
                        <span style="background:#c62828;color:white;padding:6px 18px;border-radius:25px;font-size:13px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🔴 Défenseurs (D)</span>
                        <span style="background:#ff9800;color:white;padding:6px 18px;border-radius:25px;font-size:13px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🟠 Ballon</span>
                    </div>
                </div>`;
                schema2 = schema1.replace('SITUATION 1', 'SITUATION 2');
            } else if (['Course de vitesse', 'Course de durée'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#fff3e0,#ffe0b2);border:3px solid #e65100;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF - PISTE D'ATHLÉTISME</div>
                    <div style="background:#ffcc80;border:2px solid #e65100;border-radius:12px;padding:25px;">
                        <div style="display:flex;flex-direction:column;gap:15px;">
                            <div style="display:flex;align-items:center;gap:12px;">
                                <div style="background:#4caf50;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">🏁 DÉPART</div>
                                <div style="flex:1;height:35px;background:repeating-linear-gradient(90deg,#d84315,#d84315 25px,#ff7043 25px,#ff7043 50px);border-radius:8px;position:relative;">
                                    <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:white;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:bold;">Couloir 1 - 🏃</span>
                                </div>
                                <div style="background:#f44336;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">🏆 ARRIVÉE</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;">
                                <div style="background:#4caf50;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">🏁 DÉPART</div>
                                <div style="flex:1;height:35px;background:repeating-linear-gradient(90deg,#1565c0,#1565c0 25px,#42a5f5 25px,#42a5f5 50px);border-radius:8px;position:relative;">
                                    <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:white;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:bold;">Couloir 2 - 🏃</span>
                                </div>
                                <div style="background:#f44336;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">🏆 ARRIVÉE</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (['Saut en longueur', 'Saut en hauteur'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#f3e5f5,#e1bee7);border:3px solid #7b1fa2;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#4a148c;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF - AIRE DE SAUT</div>
                    <div style="background:#ce93d8;border:2px solid #7b1fa2;border-radius:12px;padding:25px;">
                        <div style="display:flex;align-items:center;gap:15px;">
                            <div style="background:#4caf50;color:white;padding:12px 22px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">🏃 ÉLAN</div>
                            <div style="flex:1;height:40px;background:linear-gradient(90deg,#ef6c00,#ff9800,#ffb74d);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                                <span style="color:white;font-weight:bold;font-size:22px;text-shadow:1px 1px 2px rgba(0,0,0,0.3);">━━━➤━━━➤━━━➤</span>
                            </div>
                            <div style="background:#f44336;color:white;padding:12px 18px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">📍 APPEL</div>
                            <div style="background:#ffd54f;color:#333;padding:12px 28px;border-radius:12px;font-weight:bold;font-size:15px;box-shadow:0 3px 8px rgba(0,0,0,0.25);">${aps.includes('longueur') ? '🏖️ FOSSE' : '📏 TAPIS'}</div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Volleyball') {
                schema1 = `<div style="background:linear-gradient(135deg,#e3f2fd,#bbdefb);border:3px solid #1565c0;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF - TERRAIN VOLLEYBALL</div>
                    <div style="background:#90caf9;border:2px solid #1565c0;border-radius:12px;padding:30px;position:relative;min-height:220px;">
                        <div style="position:absolute;top:50%;left:0;right:0;height:5px;background:white;box-shadow:0 0 8px rgba(0,0,0,0.3);"></div>
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:5px 15px;border-radius:8px;font-size:13px;font-weight:bold;z-index:1;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏐 FILET</div>
                        <div style="position:absolute;top:12%;left:12%;background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">4</div>
                        <div style="position:absolute;top:12%;left:42%;background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">3</div>
                        <div style="position:absolute;top:12%;right:12%;background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">2</div>
                        <div style="position:absolute;top:32%;left:27%;background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">5</div>
                        <div style="position:absolute;top:32%;right:27%;background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">6</div>
                        <div style="position:absolute;top:32%;left:50%;transform:translateX(-50%);background:#1565c0;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">1</div>
                        <div style="position:absolute;bottom:12%;left:12%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">4</div>
                        <div style="position:absolute;bottom:12%;left:42%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">3</div>
                        <div style="position:absolute;bottom:12%;right:12%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;">2</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:25px;margin-top:18px;">
                        <span style="background:#1565c0;color:white;padding:6px 18px;border-radius:25px;font-size:13px;font-weight:bold;">🔵 Équipe A</span>
                        <span style="background:#c62828;color:white;padding:6px 18px;border-radius:25px;font-size:13px;font-weight:bold;">🔴 Équipe B</span>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Gymnastique') {
                schema1 = `<div style="background:linear-gradient(135deg,#fce4ec,#f8bbd9);border:3px solid #c2185b;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#880e4f;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF - PRATICABLE GYMNASTIQUE</div>
                    <div style="background:#f48fb1;border:2px solid #c2185b;border-radius:12px;padding:30px;position:relative;min-height:160px;">
                        <div style="position:absolute;top:15%;left:8%;background:#4caf50;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;">🚩 DÉPART</div>
                        <div style="position:absolute;top:40%;left:28%;font-size:40px;">🤸</div>
                        <div style="position:absolute;top:30%;left:48%;font-size:40px;">🤸‍♀️</div>
                        <div style="position:absolute;top:50%;left:68%;font-size:40px;">🤸</div>
                        <div style="position:absolute;bottom:15%;right:8%;background:#f44336;color:white;padding:10px 18px;border-radius:10px;font-weight:bold;font-size:14px;">🏁 FIN</div>
                        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:white;padding:5px 15px;border-radius:8px;font-size:12px;font-weight:bold;">Direction de l'enchaînement →</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else {
                schema1 = `<div style="background:linear-gradient(135deg,#e0f7fa,#b2ebf2);border:3px solid #00838f;border-radius:15px;padding:20px;margin:20px 0;">
                    <div style="text-align:center;font-weight:bold;color:#006064;margin-bottom:15px;font-size:15px;">📐 DISPOSITIF D'APPRENTISSAGE</div>
                    <div style="background:#80deea;border:2px solid #00838f;border-radius:12px;padding:35px;text-align:center;">
                        <p style="font-size:16px;color:#006064;margin:0;font-weight:500;">Organisation adaptée à l'activité : ${aps}</p>
                        <p style="font-size:14px;color:#00838f;margin-top:10px;">Disposition des élèves selon les consignes de l'enseignant</p>
                    </div>
                </div>`;
                schema2 = schema1;
            }

            // HTML DISPLAY (site) - Contenu détaillé, bien structuré, BUT AU-DESSUS DU SCHÉMA
            htmlDisplay = `
            <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:950px;margin:0 auto;line-height:1.6;">
                <!-- En-tête -->
                <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:28px 30px;border-radius:18px;margin-bottom:25px;box-shadow:0 8px 25px rgba(0,0,0,0.15);">
                    <h1 style="margin:0 0 12px 0;font-size:1.7rem;font-weight:700;">📋 Fiche de Séance - ${aps}</h1>
                    <div style="display:flex;gap:25px;flex-wrap:wrap;font-size:0.95rem;opacity:0.95;">
                        <span><strong>Niveau:</strong> ${niveau}</span>
                        <span><strong>Séance:</strong> N°${numeroSeance || 1}</span>
                        <span><strong>Groupe:</strong> ${groupeAPS}</span>
                        <span><strong>Durée:</strong> 55 min</span>
                    </div>
                </div>

                <!-- Objectif -->
                <div style="background:linear-gradient(135deg,#ffebee,#fce4ec);border-left:6px solid #c1272d;padding:22px 25px;border-radius:0 15px 15px 0;margin-bottom:25px;box-shadow:0 4px 15px rgba(0,0,0,0.08);">
                    <h2 style="color:#c1272d;margin:0 0 10px 0;font-size:1.2rem;font-weight:700;">🎯 OBJECTIF DE LA SÉANCE</h2>
                    <p style="margin:0;font-size:1.1rem;color:#333;font-weight:500;">${objectif}</p>
                </div>

                <!-- Partie Introductive -->
                <div style="background:white;border:2px solid #e0e0e0;border-radius:18px;padding:25px 28px;margin-bottom:25px;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
                    <h2 style="color:#c1272d;border-bottom:3px solid #c1272d;padding-bottom:12px;margin:0 0 20px 0;font-size:1.25rem;font-weight:700;">📌 PARTIE INTRODUCTIVE <span style="font-weight:normal;font-size:0.9rem;color:#666;">(15 min)</span></h2>
                    <div style="display:grid;gap:15px;">
                        <div style="background:#f8f9fa;padding:15px 18px;border-radius:12px;border-left:4px solid #c1272d;">
                            <strong style="color:#c1272d;font-size:0.95rem;">• Prise en main (3 min)</strong>
                            <p style="margin:8px 0 0 0;color:#555;">Rassemblement, appel, vérification des tenues. Présentation de l'objectif et rappel des consignes de sécurité.</p>
                        </div>
                        <div style="background:#f8f9fa;padding:15px 18px;border-radius:12px;border-left:4px solid #c1272d;">
                            <strong style="color:#c1272d;font-size:0.95rem;">• Échauffement général (7 min)</strong>
                            <p style="margin:8px 0 0 0;color:#555;">Course lente (3 tours), mobilisation articulaire progressive (chevilles → nuque), gammes athlétiques.</p>
                        </div>
                        <div style="background:#f8f9fa;padding:15px 18px;border-radius:12px;border-left:4px solid #c1272d;">
                            <strong style="color:#c1272d;font-size:0.95rem;">• Échauffement spécifique (5 min)</strong>
                            <p style="margin:8px 0 0 0;color:#555;">${echaufSpec}</p>
                        </div>
                    </div>
                </div>

                <!-- Partie Fondamentale -->
                <div style="background:white;border:2px solid #e0e0e0;border-radius:18px;padding:25px 28px;margin-bottom:25px;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
                    <h2 style="color:#006233;border-bottom:3px solid #006233;padding-bottom:12px;margin:0 0 25px 0;font-size:1.25rem;font-weight:700;">⚡ PARTIE FONDAMENTALE <span style="font-weight:normal;font-size:0.9rem;color:#666;">(35 min)</span></h2>

                    <!-- Situation 1 -->
                    <div style="background:linear-gradient(135deg,#f1f8e9,#dcedc8);border-radius:15px;padding:22px 25px;margin-bottom:25px;border:1px solid #aed581;">
                        <h3 style="color:#33691e;margin:0 0 18px 0;font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:10px;">
                            <span style="background:#006233;color:white;padding:5px 12px;border-radius:8px;font-size:0.85rem;">SITUATION 1</span>
                            ${s1Titre} <span style="font-weight:normal;color:#666;font-size:0.9rem;">(12 min)</span>
                        </h3>
                        
                        <!-- BUT AU-DESSUS DU SCHÉMA -->
                        <div style="background:white;padding:15px 18px;border-radius:10px;margin-bottom:15px;border-left:4px solid #006233;">
                            <strong style="color:#006233;font-size:1rem;">🎯 But de la situation</strong>
                            <p style="margin:8px 0 0 0;color:#333;font-size:1rem;">Permettre aux élèves de ${objectif.toLowerCase()}</p>
                        </div>
                        
                        ${schema1}
                        
                        <div style="display:grid;gap:15px;margin-top:18px;">
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#006233;">📍 Organisation</strong>
                                <p style="margin:8px 0 0 0;color:#444;">${s1Orga}</p>
                            </div>
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#006233;">📋 Déroulement</strong>
                                <p style="margin:8px 0 0 0;color:#444;line-height:1.7;">${s1Deroul}</p>
                            </div>
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#006233;">📢 Consignes</strong>
                                <div style="margin:10px 0 0 0;color:#444;line-height:1.8;">${s1Consignes.split('\n').map(c => `<div style="padding:5px 0;border-bottom:1px dashed #e0e0e0;">${c}</div>`).join('')}</div>
                            </div>
                            <div style="background:#fff8e1;padding:15px 18px;border-radius:10px;border-left:4px solid #ffc107;">
                                <strong style="color:#f57c00;">🔄 Variantes</strong>
                                <div style="margin:10px 0 0 0;color:#444;line-height:1.7;">${s1Variantes.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Situation 2 -->
                    <div style="background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:15px;padding:22px 25px;margin-bottom:25px;border:1px solid #64b5f6;">
                        <h3 style="color:#0d47a1;margin:0 0 18px 0;font-size:1.15rem;font-weight:700;display:flex;align-items:center;gap:10px;">
                            <span style="background:#1565c0;color:white;padding:5px 12px;border-radius:8px;font-size:0.85rem;">SITUATION 2</span>
                            ${s2Titre} <span style="font-weight:normal;color:#666;font-size:0.9rem;">(13 min)</span>
                        </h3>
                        
                        <!-- BUT AU-DESSUS DU SCHÉMA -->
                        <div style="background:white;padding:15px 18px;border-radius:10px;margin-bottom:15px;border-left:4px solid #1565c0;">
                            <strong style="color:#1565c0;font-size:1rem;">🎯 But de la situation</strong>
                            <p style="margin:8px 0 0 0;color:#333;font-size:1rem;">Appliquer l'objectif en situation de jeu aménagé</p>
                        </div>
                        
                        ${schema2}
                        
                        <div style="display:grid;gap:15px;margin-top:18px;">
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#1565c0;">📍 Organisation</strong>
                                <p style="margin:8px 0 0 0;color:#444;">${s2Orga}</p>
                            </div>
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#1565c0;">📋 Déroulement</strong>
                                <p style="margin:8px 0 0 0;color:#444;line-height:1.7;">${s2Deroul}</p>
                            </div>
                            <div style="background:white;padding:15px 18px;border-radius:10px;">
                                <strong style="color:#1565c0;">📢 Consignes</strong>
                                <div style="margin:10px 0 0 0;color:#444;line-height:1.8;">${s2Consignes.split('\n').map(c => `<div style="padding:5px 0;border-bottom:1px dashed #e0e0e0;">${c}</div>`).join('')}</div>
                            </div>
                            <div style="background:#fff8e1;padding:15px 18px;border-radius:10px;border-left:4px solid #ffc107;">
                                <strong style="color:#f57c00;">🔄 Variantes</strong>
                                <div style="margin:10px 0 0 0;color:#444;line-height:1.7;">${s2Variantes.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Situation de référence -->
                    <div style="background:linear-gradient(135deg,#fff3e0,#ffe0b2);border-radius:15px;padding:18px 22px;border-left:5px solid #ff9800;">
                        <h3 style="color:#e65100;margin:0 0 10px 0;font-size:1.05rem;font-weight:700;">◆ SITUATION DE RÉFÉRENCE <span style="font-weight:normal;color:#666;font-size:0.9rem;">(10 min)</span></h3>
                        <p style="margin:0;color:#333;font-size:1rem;"><strong>Format :</strong> ${sitRef}</p>
                    </div>
                </div>

                <!-- Critères -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                    <div style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-radius:15px;padding:22px 25px;border:1px solid #81c784;">
                        <h3 style="color:#2e7d32;margin:0 0 15px 0;font-size:1.1rem;font-weight:700;">✅ Critères de Réalisation</h3>
                        <div style="color:#333;line-height:1.9;">${critReal.split('\n').map(c => `<div style="padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.1);">${c.replace('•', '✓')}</div>`).join('')}</div>
                    </div>
                    <div style="background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:15px;padding:22px 25px;border:1px solid #64b5f6;">
                        <h3 style="color:#1565c0;margin:0 0 15px 0;font-size:1.1rem;font-weight:700;">🎯 Critères de Réussite</h3>
                        <div style="color:#333;line-height:1.9;">${critReuss.split('\n').map(c => `<div style="padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.1);">${c.replace('•', '✓')}</div>`).join('')}</div>
                    </div>
                </div>

                <!-- Partie Finale -->
                <div style="background:white;border:2px solid #e0e0e0;border-radius:18px;padding:25px 28px;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
                    <h2 style="color:#c1272d;border-bottom:3px solid #c1272d;padding-bottom:12px;margin:0 0 20px 0;font-size:1.25rem;font-weight:700;">🧘 PARTIE FINALE <span style="font-weight:normal;font-size:0.9rem;color:#666;">(10 min)</span></h2>
                    <div style="display:grid;gap:15px;">
                        <div style="background:#f8f9fa;padding:15px 18px;border-radius:12px;border-left:4px solid #c1272d;">
                            <strong style="color:#c1272d;">• Retour au calme (5 min)</strong>
                            <p style="margin:8px 0 0 0;color:#555;">Marche lente, respiration profonde, étirements des groupes musculaires sollicités.</p>
                        </div>
                        <div style="background:#f8f9fa;padding:15px 18px;border-radius:12px;border-left:4px solid #c1272d;">
                            <strong style="color:#c1272d;">• Bilan (5 min)</strong>
                            <p style="margin:8px 0 0 0;color:#555;">Questionnement sur les apprentissages, feedback collectif et individuel, rangement du matériel.</p>
                        </div>
                    </div>
                </div>
            </div>`;

            // HTML WORD/PDF - Sans schémas, 1 seule page A4 paysage, BUT GLOBAL pour partie fonda
            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps} - ${niveau}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.4cm 0.5cm}
body{font-family:Calibri,Arial,sans-serif;font-size:7pt;line-height:1.15;margin:0;padding:0}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th,td{border:0.5pt solid #000;padding:2px 4px;vertical-align:top;word-wrap:break-word}
.header-row td{border:none;padding:1px 4px;font-size:7pt}
.main-title{text-align:center;font-size:11pt;font-weight:bold;background:linear-gradient(90deg,#c1272d,#006233);color:#fff;padding:4px;letter-spacing:0.5px}
.section-header{background:#f0f0f0;font-weight:bold;font-size:6.5pt;text-align:center;padding:2px}
.obj-row{background:#c1272d;color:#fff;font-weight:bold;font-size:7pt}
.table-header{background:#006233;color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:3px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:7.5pt;writing-mode:vertical-rl;text-orientation:mixed}
.content-cell{font-size:6.5pt;line-height:1.2}
.sit-title{font-weight:bold;color:#006233;font-size:7pt}
.footer-note{text-align:center;font-size:5.5pt;color:#666;margin-top:2px;border:none}
</style></head>
<body>
<table class="header-row"><tr>
<td style="width:25%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="width:30%;text-align:center"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="width:20%;text-align:center"><b>Classe:</b> ${classe || '______'}</td>
<td style="width:25%;text-align:right"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr></table>

<table><tr><td class="main-title" colspan="6">FICHE DE PRÉPARATION D'UNE SÉANCE D'ÉDUCATION PHYSIQUE ET SPORTIVE</td></tr></table>

<table>
<tr>
<td class="section-header" style="width:8%">Groupe d'APS</td>
<td style="width:14%;font-size:7pt;text-align:center">${groupeAPS}</td>
<td class="section-header" style="width:6%">APS</td>
<td style="width:12%;font-size:7pt;text-align:center;font-weight:bold">${aps}</td>
<td class="section-header" style="width:6%">Niveau</td>
<td style="width:8%;font-size:7pt;text-align:center">${niveau}</td>
<td class="section-header" style="width:6%">Séance</td>
<td style="width:5%;font-size:7pt;text-align:center;font-weight:bold">${numeroSeance || 1}</td>
<td class="section-header" style="width:6%">Durée</td>
<td style="width:8%;font-size:7pt;text-align:center">55 min</td>
</tr>
<tr>
<td class="section-header">OTI</td>
<td colspan="9" style="font-size:6pt;line-height:1.15">${oti}</td>
</tr>
<tr>
<td class="section-header">OTC</td>
<td colspan="9" style="font-size:6pt;line-height:1.15">${otc}</td>
</tr>
<tr>
<td class="obj-row" style="text-align:center">OBJECTIF</td>
<td colspan="9" style="background:#ffebee;font-size:7.5pt;font-weight:bold;padding:4px">${objectif}</td>
</tr>
</table>

<table>
<tr>
<th class="table-header" style="width:5%">PARTIES</th>
<th class="table-header" style="width:4%">DURÉE</th>
<th class="table-header" style="width:52%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="table-header" style="width:8%">BUT</th>
<th class="table-header" style="width:15.5%">CRITÈRES DE RÉALISATION</th>
<th class="table-header" style="width:15.5%">CRITÈRES DE RÉUSSITE</th>
</tr>
<tr>
<td class="partie-cell" rowspan="1" style="height:45px">INTRO</td>
<td style="text-align:center;font-weight:bold;font-size:8pt">15'</td>
<td class="content-cell"><b>Prise en main:</b> Appel, tenues, objectif, sécurité<br><b>Échauff. général:</b> Course, mobilisation articulaire, gammes<br><b>Échauff. spécifique:</b> ${echaufSpec.substring(0, 120)}...</td>
<td class="content-cell" style="text-align:center;vertical-align:middle">Préparer l'organisme à l'effort</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666" colspan="2">Phase de préparation physique et mentale</td>
</tr>
<tr>
<td class="partie-cell" rowspan="1" style="height:180px">FONDA.</td>
<td style="text-align:center;font-weight:bold;font-size:8pt">35'</td>
<td class="content-cell">
<span class="sit-title">◆ SITUATION 1: ${s1Titre} (12')</span><br>
<b>Organisation:</b> ${s1Orga}<br>
<b>Déroulement:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s1Variantes.replace(/\n/g, ' | ')}<br><br>
<span class="sit-title">◆ SITUATION 2: ${s2Titre} (13')</span><br>
<b>Organisation:</b> ${s2Orga}<br>
<b>Déroulement:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s2Variantes.replace(/\n/g, ' | ')}<br><br>
<span class="sit-title">◆ SITUATION DE RÉFÉRENCE (10'):</span> ${sitRef}
</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-weight:bold;font-size:7pt;background:#f9f9f9">Atteindre l'objectif:<br><br>${objectif.substring(0, 80)}...</td>
<td class="content-cell" style="font-size:6.5pt">${critReal.replace(/\n/g, '<br>')}</td>
<td class="content-cell" style="font-size:6.5pt">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>
<tr>
<td class="partie-cell" rowspan="1" style="height:35px">FINALE</td>
<td style="text-align:center;font-weight:bold;font-size:8pt">10'</td>
<td class="content-cell"><b>Retour au calme:</b> Marche, respiration, étirements des groupes musculaires sollicités<br><b>Bilan:</b> Questionnement, feedback collectif et individuel, rangement du matériel</td>
<td class="content-cell" style="text-align:center;vertical-align:middle">Récupération et bilan</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666" colspan="2">Phase de récupération et d'analyse</td>
</tr>
</table>

<p class="footer-note">Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - Ministère de l'Éducation Nationale - Royaume du Maroc</p>
</body></html>`;

            filename = `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivEleves = niveauEleves || 'moyen';
            const nivTxt = { 'debutant': 'Débutant (Initiation)', 'moyen': 'Moyen (Apprentissage)', 'avance': 'Avancé (Perfectionnement)', 'elite': 'Élite (Expertise)' }[nivEleves];
            const objectifs = getObjectifsParNiveau(aps, nivEleves, nb);

            let rows = '';
            for (let i = 0; i < nb; i++) {
                let seq = i === 0 ? 'Éval. diagnostique' : i === 1 ? 'Acquisition' : i === nb - 1 ? 'Éval. terminale' : i === nb - 2 ? 'Intégration' : i < nb / 2 ? 'Apprentissage' : 'Consolidation';
                rows += `<tr><td style="text-align:center;background:#f8f8f8;font-size:8pt">${seq}</td><td style="text-align:center;font-weight:bold;font-size:9pt">${i + 1}</td><td style="font-size:8pt;padding:4px 6px">${objectifs[i]}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Projet de cycle - ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.6cm}
body{font-family:Calibri,Arial,sans-serif;font-size:9pt}
table{width:100%;border-collapse:collapse;margin-bottom:8px}
th,td{border:0.5pt solid #000;padding:4px 6px;vertical-align:top}
.main-title{font-size:22pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#c1272d;border:none;padding:10px}
.section-header{background:#e8e8e8;font-weight:bold;text-align:center;font-size:8pt}
.cycle-header{background:linear-gradient(90deg,#c1272d,#006233);color:#fff;font-weight:bold;font-size:10pt;text-align:center;padding:6px}
.label-cell{background:#f5f5f5;font-weight:bold;font-size:8pt}
.level-highlight{background:#e8f5e9;font-weight:bold;color:#006233;text-align:center}
</style></head>
<body>
<table style="border:none"><tr><td class="main-title" style="border:none">Projet Pédagogique de Cycle</td></tr></table>

<table>
<tr>
<td class="section-header" style="width:12%">MODULE</td>
<td class="section-header" style="width:15%">GROUPE D'APS</td>
<td class="section-header" style="width:15%">APS</td>
<td class="section-header" style="width:12%">NIVEAU SCOLAIRE</td>
<td class="section-header" style="width:18%">NIVEAU DES ÉLÈVES</td>
<td class="section-header" style="width:10%">SÉANCES</td>
</tr>
<tr>
<td style="text-align:center;font-size:8pt">Adaptation des réponses motrices</td>
<td style="text-align:center;font-size:9pt">${groupeAPS}</td>
<td style="text-align:center;font-size:10pt;font-weight:bold">${aps}</td>
<td style="text-align:center;font-size:9pt">${niveau}</td>
<td class="level-highlight" style="font-size:9pt">${nivTxt}</td>
<td style="text-align:center;font-size:10pt;font-weight:bold">${nb}</td>
</tr>
</table>

<table>
<tr><td class="label-cell" style="width:18%">Objectif Terminal d'Intégration (OTI)</td><td style="font-size:8pt">${oti}</td></tr>
<tr><td class="label-cell">Objectif Terminal du Cycle (OTC)</td><td style="font-size:8pt">${otc}</td></tr>
<tr><td class="label-cell">Compétences visées</td><td style="font-size:8pt">• Gestion efficace des ressources individuelles pour une meilleure réalisation motrice<br>• Application des règles de sécurité et respect du règlement de l'activité</td></tr>
</table>

<table>
<tr>
<td class="label-cell" rowspan="2" style="width:15%;vertical-align:middle;text-align:center">Acquisitions attendues</td>
<td class="section-header" style="width:28%">Procédurales (savoir-faire)</td>
<td class="section-header" style="width:28%">Conceptuelles (savoirs)</td>
<td class="section-header" style="width:29%">Comportementales (savoir-être)</td>
</tr>
<tr>
<td style="font-size:8pt">• Maîtriser les gestes techniques fondamentaux<br>• Enchaîner les actions avec fluidité</td>
<td style="font-size:8pt">• Connaître les règles et le vocabulaire<br>• Comprendre les principes tactiques</td>
<td style="font-size:8pt">• Assiduité et engagement dans l'effort<br>• Respect des règles et fair-play</td>
</tr>
</table>

<table>
<tr><td class="cycle-header" colspan="3">PROGRESSION PÉDAGOGIQUE DES SÉANCES</td></tr>
<tr>
<th class="section-header" style="width:18%">Séquences</th>
<th class="section-header" style="width:8%">N°</th>
<th class="section-header">Objectifs opérationnels de chaque séance</th>
</tr>
${rows}
</table>

<table style="border:none;margin-top:10px"><tr>
<td style="border:none;font-size:8pt"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="border:none;text-align:right;font-size:8pt"><b>Établissement:</b> ${etablissement || '________________'}</td>
</tr></table>
</body></html>`;

            htmlDisplay = html;
            filename = `Projet_Cycle_${aps.replace(/\s+/g, '_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'Observation" : "Grille d'Évaluation";

            let headMain = '', headSub = '', emptyCols = '';

            if (isObs) {
                critObs.criteres.forEach(c => {
                    headMain += `<th colspan="${c.sous.length}" style="background:#006233;color:#fff;font-size:7pt;text-align:center;padding:3px">${c.nom}</th>`;
                    c.sous.forEach(s => {
                        headSub += `<td style="background:#e8e8e8;font-size:6pt;text-align:center;padding:2px">${s}</td>`;
                        emptyCols += '<td style="width:4%"></td>';
                    });
                });
                if (critObs.perf) { headMain += '<th rowspan="2" style="background:#c1272d;color:#fff;font-size:7pt;width:8%">Perf.</th>'; emptyCols += '<td></td>'; }
                else if (critObs.obs) { headMain += '<th rowspan="2" style="background:#c1272d;color:#fff;font-size:7pt;width:8%">Obs.</th>'; emptyCols += '<td></td>'; }
                else if (critObs.note) { headMain += '<th rowspan="2" style="background:#c1272d;color:#fff;font-size:7pt;width:8%">Note</th>'; emptyCols += '<td></td>'; }
            } else {
                critEval.forEach(c => {
                    headMain += `<th style="background:#006233;color:#fff;font-size:7pt;width:12%;padding:3px">${c.nom}<br><small style="font-weight:normal">/${c.pts} pts</small></th>`;
                    emptyCols += '<td></td>';
                });
                headMain += '<th style="background:#c1272d;color:#fff;font-size:7pt;width:8%;padding:3px">NOTE<br><small style="font-weight:normal">/20</small></th>';
                emptyCols += '<td></td>';
            }

            let rows = '';
            for (let i = 1; i <= 40; i++) {
                rows += `<tr style="height:14px"><td style="text-align:center;font-size:8pt;background:${i % 2 === 0 ? '#fafafa' : '#fff'}">${i}</td><td style="background:${i % 2 === 0 ? '#fafafa' : '#fff'}"></td><td style="background:${i % 2 === 0 ? '#fafafa' : '#fff'}"></td>${emptyCols.replace(/<td/g, `<td style="background:${i % 2 === 0 ? '#fafafa' : '#fff'};"`)}</tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${titre} - ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,Arial,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:0.5pt solid #000;padding:2px}
.main-title{font-size:20pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#c1272d;margin:5px 0}
.info-row{font-size:9pt;margin-bottom:8px}
</style></head>
<body>
<p class="main-title">${titre}</p>
<table style="border:none;margin-bottom:8px" class="info-row">
<tr>
<td style="border:none;width:40%"><b>APS:</b> ${aps}</td>
<td style="border:none;width:30%"><b>Classe:</b> ${classe || '____________'}</td>
<td style="border:none;width:30%;text-align:right"><b>Date:</b> ____/____/________</td>
</tr>
<tr>
<td style="border:none" colspan="2"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="border:none;text-align:right"><b>Établissement:</b> ${etablissement || '________________'}</td>
</tr>
</table>

<table>
<tr>
<th rowspan="2" style="background:#c1272d;color:#fff;width:4%;font-size:7pt">N°</th>
<th rowspan="2" colspan="2" style="background:#c1272d;color:#fff;width:20%;font-size:7pt">Nom et Prénom de l'élève</th>
${headMain}
</tr>
${isObs ? `<tr>${headSub}</tr>` : ''}
${rows}
</table>

<p style="text-align:right;font-size:7pt;color:#666;margin-top:5px">Signature du professeur: ________________</p>
</body></html>`;

            htmlDisplay = html;
            filename = `Grille_${isObs ? 'Observation' : 'Evaluation'}_${aps.replace(/\s+/g, '_')}.doc`;
        }

        return res.status(200).json({ success: true, html, htmlDisplay, filename, oti, otc, groupeAPS, situationReference: sitRef });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
