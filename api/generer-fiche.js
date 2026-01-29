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
            '1AC': "À la fin de la 1ère année du cycle secondaire collégial, l'élève doit être capable d'acquérir une motricité correcte lui permettant de s'adapter aux exigences des différentes situations motrices et de s'intégrer positivement dans le groupe classe tout en respectant les règles de sécurité et de fair-play.",
            '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées, tout en développant ses capacités d'adaptation aux situations variées et en respectant les règles de jeu.",
            '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations en fonction de leurs exigences organisationnelles et réglementaires, tout en faisant preuve d'autonomie et de responsabilité.",
            'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices tout en développant son sens critique et sa capacité à gérer efficacement ses ressources physiques et mentales.",
            '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes et d'améliorer ses réalisations par une gestion efficace de ses ressources, tout en s'inscrivant dans une démarche de projet individuel ou collectif.",
            '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser finement les différentes situations motrices et de s'intégrer efficacement dans la réalisation de projets collectifs et individuels, en faisant preuve d'expertise technique et d'intelligence tactique."
        };

        // ==================== OTC COMPLETS PAR APS ====================
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

        // SITUATIONS DE RÉFÉRENCE COMPLÈTES
        const SITUATIONS_REF = {
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
            'Course de durée': isCollege ? 'Course de 12 minutes en régulant son allure, la distance parcourue est mesurée' : 'Course de 12 minutes pour parcourir la plus grande distance en gérant son effort',
            'Gymnastique': 'Présentation d\'un enchaînement au sol de 1 minute minimum comprenant les éléments imposés du niveau'
        };

        // Vocabulaire spécifique par APS
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

        let groupeAPS = 'Activité';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) groupeAPS = 'Sports collectifs';
        else if (['Tennis de table', 'Badminton'].includes(aps)) groupeAPS = 'Sports de renvoi';
        else if (['Course de vitesse', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) groupeAPS = 'Athlétisme';
        else if (aps === 'Gymnastique') groupeAPS = 'Gymnastique';

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = SITUATIONS_REF[aps] || 'Situation adaptée au niveau';
        const vocabAPS = VOCABULAIRE_APS[aps] || '';

        // Critères d'observation par APS
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

        let html = '', htmlDisplay = '', filename = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            // PROMPT avec distinction claire critères réalisation/réussite et objectif/but
            const prompt = `Tu es un expert en EPS au Maroc, spécialiste de ${aps}.

SÉANCE À PRÉPARER:
- APS: ${aps}
- Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
- OBJECTIF DE LA SÉANCE (ce que l'élève va APPRENDRE): "${objectif}"

VOCABULAIRE TECHNIQUE pour ${aps}: ${vocabAPS}

DISTINCTIONS IMPORTANTES:
- OBJECTIF = ce que l'élève APPREND (pédagogique)
- BUT = ce que l'élève FAIT dans la situation (action concrète)
- CRITÈRES DE RÉALISATION = COMMENT faire (qualité du geste, manière de faire)
- CRITÈRES DE RÉUSSITE = EST-CE RÉUSSI ? (mesurable, chiffré, observable)

GÉNÈRE CE CONTENU SPÉCIFIQUE à ${aps} et à l'objectif "${objectif}":

ECHAUFFEMENT_SPECIFIQUE: [3 exercices spécifiques à ${aps} préparant à l'objectif, format: nom (durée)]

SITUATION1_TITRE: [titre court lié à l'objectif]
SITUATION1_BUT: [ce que l'élève doit FAIRE concrètement dans cette situation - une phrase simple]
SITUATION1_ORGANISATION: [nombre joueurs, dimensions en mètres, matériel, placement]
SITUATION1_DEROULEMENT: [4-5 phrases décrivant précisément ce qui se passe]
SITUATION1_CONSIGNES: [4 consignes techniques pour ${aps}]
SITUATION1_VARIANTES: [Simplifier: 2 façons | Complexifier: 2 façons]

SITUATION2_TITRE: [titre - situation plus proche du jeu réel]
SITUATION2_BUT: [ce que l'élève doit FAIRE dans cette situation]
SITUATION2_ORGANISATION: [organisation détaillée]
SITUATION2_DEROULEMENT: [4-5 phrases]
SITUATION2_CONSIGNES: [4 consignes]
SITUATION2_VARIANTES: [Simplifier et complexifier]

CRITERES_REALISATION: [4 critères décrivant COMMENT bien faire - qualité du geste, manière de faire]
CRITERES_REUSSITE: [4 critères MESURABLES avec CHIFFRES - pourcentages, distances, nombres]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 3500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

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

            // Fallbacks spécifiques par APS
            const fb = {
                'Handball': {
                    echauf: 'Manipulation de balle individuelle (2 min) | Passes en binômes à 6m (3 min) | Jeu des 10 passes en mouvement (3 min)',
                    s1t: 'Conservation et progression collective', s1b: 'Conserver la balle et progresser vers la zone de marque pour marquer un point',
                    s1o: '4 attaquants vs 2 défenseurs, terrain 20x15m, 4 plots, 1 ballon', s1d: 'Les 4 attaquants conservent le ballon face à 2 défenseurs. Objectif: atteindre la zone adverse par des passes. 1 point si la balle arrive dans la zone de marque. Rotation toutes les 2 minutes.',
                    s1c: '1. Regarder avant de passer\n2. Passe à terre tendue\n3. Se démarquer dans l\'espace libre\n4. Appeler la balle bras levé', s1v: 'Simplifier: 4c1, 3 touches | Complexifier: 4c3, 2 touches max',
                    s2t: 'Match à thème', s2b: 'Marquer un but en appliquant l\'objectif travaillé', s2o: '2 équipes de 5, terrain 30x20m avec 2 buts', s2d: 'Match avec obligation d\'appliquer l\'objectif. Point bonus (+1) si l\'objectif est visible. Arrêts de jeu pour feedback.',
                    s2c: '1. Appliquer l\'objectif\n2. S\'engager en attaque et défense\n3. Respecter les règles\n4. Communiquer', s2v: 'Simplifier: supériorité numérique | Complexifier: infériorité',
                    cr: '• Orientation du corps vers la cible avant la passe\n• Passe tendue à hauteur de poitrine\n• Démarquage dans l\'espace libre\n• Enchaînement réception-passe sans arrêt',
                    cs: '• 7 passes réussies sur 10 tentatives\n• Atteindre la zone de marque 3 fois sur 5\n• Temps de possession supérieur à 20 secondes\n• Marquer au moins 2 buts en 5 minutes'
                },
                'Football': {
                    echauf: 'Conduite de balle en slalom (2 min) | Passes intérieur du pied à 8m (3 min) | Contrôle orienté + passe (3 min)',
                    s1t: 'Conservation et progression', s1b: 'Conserver le ballon et marquer dans le mini-but adverse',
                    s1o: '4c2 sur terrain 25x20m, 2 mini-buts, chasubles', s1d: 'Les 4 attaquants conservent et progressent vers le but. Le défenseur qui récupère devient attaquant. Rotation toutes les 3 min.',
                    s1c: '1. Contrôle orienté vers l\'espace\n2. Passe courte intérieur du pied\n3. Appel en profondeur\n4. Lever la tête avant de passer', s1v: 'Simplifier: 4c1 | Complexifier: 4c3',
                    s2t: 'Match à thème', s2b: 'Marquer un but en utilisant les techniques travaillées', s2o: '2 équipes de 5, terrain 40x25m', s2d: 'Match avec point bonus si application de l\'objectif visible.',
                    s2c: '1. Appliquer l\'objectif\n2. Jouer vers l\'avant\n3. Se replacer défensivement\n4. Communiquer', s2v: 'Simplifier: joker offensif | Complexifier: 2 touches',
                    cr: '• Contrôle avec l\'intérieur du pied orienté vers la cible\n• Passe au sol vers le pied du partenaire\n• Appel de balle dans le dos du défenseur\n• Enchaînement contrôle-passe fluide',
                    cs: '• 8 contrôles réussis sur 10\n• 7 passes arrivées au partenaire sur 10\n• Conserver le ballon 30 secondes minimum\n• Marquer au moins 1 but par période'
                }
            };

            const fallback = fb[aps] || fb['Handball'];
            if (!echaufSpec || echaufSpec.length < 20) echaufSpec = fallback.echauf;
            if (!s1Titre) s1Titre = fallback.s1t;
            if (!s1But) s1But = fallback.s1b;
            if (!s1Orga) s1Orga = fallback.s1o;
            if (!s1Deroul) s1Deroul = fallback.s1d;
            if (!s1Consignes) s1Consignes = fallback.s1c;
            if (!s1Variantes) s1Variantes = fallback.s1v;
            if (!s2Titre) s2Titre = fallback.s2t;
            if (!s2But) s2But = fallback.s2b;
            if (!s2Orga) s2Orga = fallback.s2o;
            if (!s2Deroul) s2Deroul = fallback.s2d;
            if (!s2Consignes) s2Consignes = fallback.s2c;
            if (!s2Variantes) s2Variantes = fallback.s2v;
            if (!critReal || critReal.length < 30) critReal = fallback.cr;
            if (!critReuss || critReuss.length < 30) critReuss = fallback.cs;

            // BUT de la partie fondamentale (lié à l'objectif)
            const butFonda = `Atteindre l'objectif: ${objectif}`;

            // Schémas
            let schema1 = '', schema2 = '';
            if (['Handball', 'Football', 'Basketball'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border:2px solid #2e7d32;border-radius:10px;padding:12px;margin:12px 0;">
                    <div style="text-align:center;font-weight:bold;color:#1b5e20;margin-bottom:8px;font-size:13px;">📐 DISPOSITIF</div>
                    <div style="background:#a5d6a7;border:1px solid #2e7d32;border-radius:8px;padding:15px;position:relative;min-height:120px;">
                        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffd54f;border:2px solid #f57f17;border-radius:5px;width:35px;height:50px;display:flex;align-items:center;justify-content:center;font-size:16px;">🥅</div>
                        <div style="position:absolute;left:18%;top:20%;background:#1565c0;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;">A1</div>
                        <div style="position:absolute;left:18%;top:70%;background:#1565c0;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;">A2</div>
                        <div style="position:absolute;left:38%;top:45%;background:#1565c0;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;">A3</div>
                        <div style="position:absolute;left:48%;top:45%;background:#ff9800;border-radius:50%;width:18px;height:18px;border:2px solid #e65100;"></div>
                        <div style="position:absolute;right:18%;top:35%;background:#c62828;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;">D1</div>
                        <div style="position:absolute;right:18%;top:65%;background:#c62828;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11px;">D2</div>
                        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffd54f;border:2px solid #f57f17;border-radius:5px;width:35px;height:50px;display:flex;align-items:center;justify-content:center;font-size:16px;">🥅</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:12px;margin-top:10px;font-size:10px;">
                        <span style="background:#1565c0;color:white;padding:3px 10px;border-radius:12px;">🔵 Attaquants</span>
                        <span style="background:#c62828;color:white;padding:3px 10px;border-radius:12px;">🔴 Défenseurs</span>
                        <span style="background:#ff9800;color:white;padding:3px 10px;border-radius:12px;">🟠 Ballon</span>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (['Course de vitesse', 'Course de durée'].includes(aps)) {
                schema1 = `<div style="background:#fff3e0;border:2px solid #e65100;border-radius:10px;padding:12px;margin:12px 0;">
                    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:8px;font-size:13px;">📐 PISTE</div>
                    <div style="background:#ffcc80;border:1px solid #e65100;border-radius:8px;padding:12px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div style="background:#4caf50;color:white;padding:5px 10px;border-radius:5px;font-weight:bold;font-size:11px;">🏁 DÉPART</div>
                            <div style="flex:1;height:20px;background:repeating-linear-gradient(90deg,#d84315,#d84315 15px,#ff7043 15px,#ff7043 30px);border-radius:4px;"></div>
                            <div style="background:#f44336;color:white;padding:5px 10px;border-radius:5px;font-weight:bold;font-size:11px;">🏆 ARRIVÉE</div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Volleyball') {
                schema1 = `<div style="background:#e3f2fd;border:2px solid #1565c0;border-radius:10px;padding:12px;margin:12px 0;">
                    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:8px;font-size:13px;">📐 TERRAIN</div>
                    <div style="background:#90caf9;border:1px solid #1565c0;border-radius:8px;padding:15px;position:relative;min-height:100px;">
                        <div style="position:absolute;top:50%;left:0;right:0;height:3px;background:white;"></div>
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:bold;">🏐 FILET</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else {
                schema1 = `<div style="background:#f3e5f5;border:2px solid #7b1fa2;border-radius:10px;padding:12px;margin:12px 0;">
                    <div style="text-align:center;font-weight:bold;color:#4a148c;margin-bottom:8px;font-size:13px;">📐 DISPOSITIF</div>
                    <div style="background:#ce93d8;border:1px solid #7b1fa2;border-radius:8px;padding:20px;text-align:center;">
                        <p style="font-size:12px;color:#4a148c;margin:0;">Organisation adaptée à ${aps}</p>
                    </div>
                </div>`;
                schema2 = schema1;
            }

            // HTML DISPLAY (site)
            htmlDisplay = `
            <div style="font-family:'Segoe UI',sans-serif;max-width:900px;margin:0 auto;line-height:1.45;">
                <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:18px;border-radius:10px;margin-bottom:15px;">
                    <h1 style="margin:0 0 6px 0;font-size:1.4rem;">📋 Fiche de Séance - ${aps}</h1>
                    <div style="display:flex;gap:15px;flex-wrap:wrap;font-size:0.85rem;opacity:0.9;">
                        <span><strong>Niveau:</strong> ${niveau}</span><span><strong>Séance:</strong> N°${numeroSeance || 1}</span><span><strong>Groupe:</strong> ${groupeAPS}</span>
                    </div>
                </div>
                <div style="background:#ffebee;border-left:4px solid #c1272d;padding:12px 15px;border-radius:0 8px 8px 0;margin-bottom:15px;">
                    <h2 style="color:#c1272d;margin:0 0 5px 0;font-size:0.95rem;">🎯 OBJECTIF DE LA SÉANCE</h2>
                    <p style="margin:0;font-size:0.95rem;color:#333;">${objectif}</p>
                </div>
                <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
                    <h2 style="color:#c1272d;border-bottom:2px solid #c1272d;padding-bottom:6px;margin:0 0 12px 0;font-size:0.95rem;">📌 PARTIE INTRODUCTIVE (15 min)</h2>
                    <p style="margin:0 0 5px 0;"><strong>But:</strong> Préparer le corps à l'effort</p>
                    <div style="background:#f8f9fa;padding:10px;border-radius:6px;font-size:0.85rem;">
                        • Prise en main: appel, tenues, objectif, sécurité<br>
                        • Échauffement général: course, mobilisation articulaire<br>
                        • Échauffement spécifique: ${echaufSpec}
                    </div>
                </div>
                <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
                    <h2 style="color:#006233;border-bottom:2px solid #006233;padding-bottom:6px;margin:0 0 15px 0;font-size:0.95rem;">⚡ PARTIE FONDAMENTALE (30 min)</h2>
                    <p style="margin:0 0 12px 0;"><strong>But:</strong> ${butFonda}</p>
                    <div style="background:#f1f8e9;border-radius:8px;padding:12px;margin-bottom:15px;border:1px solid #aed581;">
                        <h3 style="color:#33691e;margin:0 0 8px 0;font-size:0.9rem;"><span style="background:#006233;color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-right:6px;">SIT 1</span>${s1Titre}</h3>
                        <p style="margin:0 0 8px 0;background:white;padding:8px;border-radius:5px;border-left:3px solid #006233;"><strong>🎯 But:</strong> ${s1But}</p>
                        ${schema1}
                        <div style="font-size:0.85rem;">
                            <p><strong>📍 Organisation:</strong> ${s1Orga}</p>
                            <p><strong>📋 Déroulement:</strong> ${s1Deroul}</p>
                            <p><strong>📢 Consignes:</strong></p><div style="margin-left:15px;">${s1Consignes.split('\n').map(c=>`<div>${c}</div>`).join('')}</div>
                            <p style="background:#fff8e1;padding:8px;border-radius:5px;margin-top:8px;"><strong>🔄 Variantes:</strong> ${s1Variantes.replace(/\n/g,' | ')}</p>
                        </div>
                    </div>
                    <div style="background:#e3f2fd;border-radius:8px;padding:12px;margin-bottom:15px;border:1px solid #64b5f6;">
                        <h3 style="color:#0d47a1;margin:0 0 8px 0;font-size:0.9rem;"><span style="background:#1565c0;color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-right:6px;">SIT 2</span>${s2Titre}</h3>
                        <p style="margin:0 0 8px 0;background:white;padding:8px;border-radius:5px;border-left:3px solid #1565c0;"><strong>🎯 But:</strong> ${s2But}</p>
                        ${schema2}
                        <div style="font-size:0.85rem;">
                            <p><strong>📍 Organisation:</strong> ${s2Orga}</p>
                            <p><strong>📋 Déroulement:</strong> ${s2Deroul}</p>
                            <p><strong>📢 Consignes:</strong></p><div style="margin-left:15px;">${s2Consignes.split('\n').map(c=>`<div>${c}</div>`).join('')}</div>
                            <p style="background:#fff8e1;padding:8px;border-radius:5px;margin-top:8px;"><strong>🔄 Variantes:</strong> ${s2Variantes.replace(/\n/g,' | ')}</p>
                        </div>
                    </div>
                    <div style="background:#fff3e0;border-radius:8px;padding:10px 12px;border-left:3px solid #ff9800;">
                        <h3 style="color:#e65100;margin:0 0 5px 0;font-size:0.85rem;">◆ SITUATION DE RÉFÉRENCE</h3>
                        <p style="margin:0;font-size:0.85rem;">${sitRef}</p>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:15px;">
                    <div style="background:#e8f5e9;border-radius:8px;padding:12px;border:1px solid #81c784;">
                        <h3 style="color:#2e7d32;margin:0 0 8px 0;font-size:0.85rem;">✅ Critères de RÉALISATION</h3>
                        <p style="font-size:0.75rem;color:#666;margin:0 0 8px 0;font-style:italic;">COMMENT bien faire (qualité du geste)</p>
                        <div style="font-size:0.8rem;line-height:1.5;">${critReal.split('\n').map(c=>`<div>${c.replace('•','✓')}</div>`).join('')}</div>
                    </div>
                    <div style="background:#e3f2fd;border-radius:8px;padding:12px;border:1px solid #64b5f6;">
                        <h3 style="color:#1565c0;margin:0 0 8px 0;font-size:0.85rem;">🎯 Critères de RÉUSSITE</h3>
                        <p style="font-size:0.75rem;color:#666;margin:0 0 8px 0;font-style:italic;">EST-CE RÉUSSI ? (mesurable, chiffré)</p>
                        <div style="font-size:0.8rem;line-height:1.5;">${critReuss.split('\n').map(c=>`<div>${c.replace('•','✓')}</div>`).join('')}</div>
                    </div>
                </div>
                <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;">
                    <h2 style="color:#c1272d;border-bottom:2px solid #c1272d;padding-bottom:6px;margin:0 0 12px 0;font-size:0.95rem;">🧘 PARTIE FINALE (10 min)</h2>
                    <p style="margin:0 0 5px 0;"><strong>But:</strong> Retour au calme</p>
                    <div style="background:#f8f9fa;padding:10px;border-radius:6px;font-size:0.85rem;">
                        • Marche lente et respiration profonde<br>
                        • Étirements des groupes musculaires sollicités<br>
                        • Bilan de séance et rangement du matériel
                    </div>
                </div>
            </div>`;

            // HTML WORD/PDF - FORMAT A4 PAYSAGE OBLIGATOIRE
            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps} ${niveau}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm}
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
<td style="width:22%"><b>Prof:</b> ${nomProf||'________'}</td>
<td style="width:28%;text-align:center"><b>Établissement:</b> ${etablissement||'________'}</td>
<td style="width:18%;text-align:center"><b>Classe:</b> ${classe||'____'}</td>
<td style="width:32%;text-align:right"><b>Année:</b> ${anneeScolaire||'2024-2025'}</td>
</tr></table>
<table><tr><td class="main-title">FICHE DE SÉANCE EPS - ${aps.toUpperCase()}</td></tr></table>
<table>
<tr>
<td class="section-header" style="width:7%">Groupe</td><td style="width:11%;font-size:6.5pt;text-align:center">${groupeAPS}</td>
<td class="section-header" style="width:4%">APS</td><td style="width:9%;font-size:7pt;text-align:center;font-weight:bold">${aps}</td>
<td class="section-header" style="width:5%">Niveau</td><td style="width:6%;font-size:6.5pt;text-align:center">${niveau}</td>
<td class="section-header" style="width:5%">Séance</td><td style="width:4%;font-size:7pt;text-align:center;font-weight:bold">${numeroSeance||1}</td>
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
<td class="partie-cell" style="height:32px">INTRO<br>15 min</td>
<td class="content-cell">• Prise en main: appel, tenues, objectif, sécurité<br>• Échauffement général: course, mobilisation articulaire<br>• Échauffement spécifique: ${echaufSpec}</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt">Préparer le corps à l'effort</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666;font-size:5.5pt" colspan="2">—</td>
</tr>
<tr>
<td class="partie-cell" style="height:145px">FONDA<br>30 min</td>
<td class="content-cell">
<span class="sit-title">◆ SIT.1: ${s1Titre}</span><br>
<b>But:</b> ${s1But}<br>
<b>Org:</b> ${s1Orga}<br><b>Déroul:</b> ${s1Deroul}<br><b>Consignes:</b> ${s1Consignes.replace(/\n/g,' | ')}<br><b>Var:</b> ${s1Variantes.replace(/\n/g,' | ')}<br><br>
<span class="sit-title">◆ SIT.2: ${s2Titre}</span><br>
<b>But:</b> ${s2But}<br>
<b>Org:</b> ${s2Orga}<br><b>Déroul:</b> ${s2Deroul}<br><b>Consignes:</b> ${s2Consignes.replace(/\n/g,' | ')}<br><b>Var:</b> ${s2Variantes.replace(/\n/g,' | ')}<br><br>
<span class="sit-title">◆ SIT.REF:</span> ${sitRef}
</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt;background:#f9f9f9;padding:3px">${butFonda}</td>
<td class="content-cell" style="font-size:6pt">${critReal.replace(/\n/g,'<br>')}</td>
<td class="content-cell" style="font-size:6pt">${critReuss.replace(/\n/g,'<br>')}</td>
</tr>
<tr>
<td class="partie-cell" style="height:25px">FINALE<br>10 min</td>
<td class="content-cell">• Marche lente et respiration profonde<br>• Étirements des groupes musculaires sollicités<br>• Bilan de séance et rangement du matériel</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-size:6pt">Retour au calme</td>
<td class="content-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666;font-size:5.5pt" colspan="2">—</td>
</tr>
</table>
<p style="text-align:center;font-size:5pt;color:#666;margin-top:1px">OP ${isCollege?'2009 (Collège)':'2007 (Lycée)'} - MEN Maroc</p>
</body></html>`;

            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivEleves = niveauEleves || 'moyen';
            const nivTxt = {'debutant':'Débutant','moyen':'Moyen','avance':'Avancé','elite':'Expert'}[nivEleves];

            const getObjExplicites = (aps, niv, n) => {
                const base = {
                    'Handball': [
                        `Évaluer le niveau initial des élèves via un match 4c4 pour identifier les acquis en passe, réception et démarquage.`,
                        `Découvrir les règles fondamentales (marcher, reprise, zone) et manipuler le ballon avec aisance.`,
                        `Améliorer la qualité de la passe à terre: orientation du corps, passe tendue à hauteur de poitrine.`,
                        `Apprendre à se démarquer efficacement pour recevoir le ballon dans un espace libre.`,
                        `Enchaîner réception et passe rapidement pour maintenir la continuité du jeu collectif.`,
                        `Découvrir le tir en appui et améliorer la précision vers les différentes zones du but.`,
                        `Organiser le jeu collectif: occupation de l'espace en largeur et profondeur, rôles des joueurs.`,
                        `Appliquer les principes d'attaque (écartement, pénétration) en situation de surnombre 4c3.`,
                        `Intégrer les acquis techniques et tactiques dans un match 5c5 avec arbitrage élève.`,
                        `Évaluer les compétences via ${sitRef}.`
                    ],
                    'Football': [
                        `Évaluer le niveau initial via un match 4c4 pour observer conduite, passes et placements.`,
                        `Découvrir les règles (hors-jeu, fautes) et manipuler le ballon avec différentes surfaces.`,
                        `Améliorer la conduite de balle et le contrôle orienté pour enchaîner vers une action.`,
                        `Travailler la passe courte intérieur du pied vers un partenaire fixe puis en mouvement.`,
                        `Se démarquer efficacement pour offrir une solution de passe et progresser.`,
                        `Découvrir le tir et améliorer la frappe vers le but avec précision.`,
                        `Organiser le jeu: circulation, appui-soutien, occupation des couloirs.`,
                        `Appliquer le jeu en triangle et les combinaisons (une-deux) en situation réduite.`,
                        `Intégrer les acquis dans un match avec respect des règles et des rôles.`,
                        `Évaluer via ${sitRef}.`
                    ]
                };
                let obj = base[aps] || base['Handball'];
                while (obj.length < n) obj.splice(-1,0,`Consolider les acquis par des situations de jeu variées.`);
                return obj.slice(0,n);
            };

            const objectifs = getObjExplicites(aps, nivEleves, nb);
            let rows = '';
            for (let i = 0; i < nb; i++) {
                let phase = i===0?'Éval. diag.':i===nb-1?'Éval. term.':i<nb/3?'Découverte':i<2*nb/3?'Apprentissage':'Consolidation';
                rows += `<tr><td style="text-align:center;background:#f8f8f8;font-size:7pt">${phase}</td><td style="text-align:center;font-weight:bold;font-size:8pt">${i+1}</td><td style="font-size:7pt;padding:3px 5px">${objectifs[i]}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><title>Projet ${aps}</title>
<style>@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}body{font-family:Calibri;font-size:8pt}table{width:100%;border-collapse:collapse;margin-bottom:5px}th,td{border:0.5pt solid #000;padding:3px 4px}.main-title{font-size:16pt;font-weight:bold;text-align:center;color:#c1272d;border:none;padding:6px}.section-header{background:#e8e8e8;font-weight:bold;text-align:center;font-size:7pt}.cycle-header{background:#006233;color:#fff;font-weight:bold;font-size:8pt;text-align:center;padding:4px}.label-cell{background:#f5f5f5;font-weight:bold;font-size:7pt}</style></head>
<body>
<p class="main-title">📊 Projet de Cycle - ${aps}</p>
<table><tr>
<td class="section-header" style="width:10%">GROUPE</td><td style="width:14%;text-align:center;font-size:8pt">${groupeAPS}</td>
<td class="section-header" style="width:6%">APS</td><td style="width:10%;text-align:center;font-size:9pt;font-weight:bold">${aps}</td>
<td class="section-header" style="width:8%">NIVEAU</td><td style="width:8%;text-align:center;font-size:8pt">${niveau}</td>
<td class="section-header" style="width:10%">NIV.ÉLÈVES</td><td style="width:8%;text-align:center;font-weight:bold;color:#006233">${nivTxt}</td>
<td class="section-header" style="width:8%">SÉANCES</td><td style="width:5%;text-align:center;font-size:9pt;font-weight:bold">${nb}</td>
</tr></table>
<table>
<tr><td class="label-cell" style="width:12%">OTI</td><td style="font-size:6.5pt">${oti}</td></tr>
<tr><td class="label-cell">OTC</td><td style="font-size:6.5pt">${otc}</td></tr>
<tr><td class="label-cell">Sit. Référence</td><td style="font-size:7pt;font-weight:bold">${sitRef}</td></tr>
</table>
<table>
<tr><td class="cycle-header" colspan="3">PROGRESSION PÉDAGOGIQUE</td></tr>
<tr><th class="section-header" style="width:12%">Phase</th><th class="section-header" style="width:5%">N°</th><th class="section-header">Objectif opérationnel</th></tr>
${rows}
</table>
<table style="border:none;margin-top:6px"><tr><td style="border:none;font-size:7pt"><b>Prof:</b> ${nomProf||'________'}</td><td style="border:none;text-align:right;font-size:7pt"><b>Établissement:</b> ${etablissement||'________'}</td></tr></table>
</body></html>`;
            htmlDisplay = html;
            filename = `Projet_${aps.replace(/\s+/g,'_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'Observation" : "Grille d'Évaluation";
            const critObs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];

            let headMain = '', headSub = '', emptyCols = '';
            critObs.criteres.forEach(c => {
                headMain += `<th colspan="${c.sous.length}" style="background:#006233;color:#fff;font-size:6pt;text-align:center;padding:2px">${c.nom}</th>`;
                c.sous.forEach(s => {
                    headSub += `<td style="background:#e8e8e8;font-size:5pt;text-align:center;padding:1px">${s}</td>`;
                    emptyCols += '<td style="width:3%"></td>';
                });
            });

            // 4 colonnes NOTE avec couleurs cohérentes
            if (!isObs) {
                headMain += `<th colspan="4" style="background:#c1272d;color:#fff;font-size:6pt;text-align:center;padding:2px">NOTE</th>`;
                headSub += `<td style="background:#ffcdd2;font-size:5pt;text-align:center;padding:1px">Procéd.</td>`;
                headSub += `<td style="background:#ffcdd2;font-size:5pt;text-align:center;padding:1px">Concept.</td>`;
                headSub += `<td style="background:#ffcdd2;font-size:5pt;text-align:center;padding:1px">Comport.</td>`;
                headSub += `<td style="background:#ef9a9a;font-size:5pt;text-align:center;padding:1px;font-weight:bold">FINALE</td>`;
                emptyCols += '<td style="width:4%"></td><td style="width:4%"></td><td style="width:4%"></td><td style="width:5%"></td>';
            } else {
                headMain += '<th rowspan="2" style="background:#c1272d;color:#fff;font-size:6pt;width:8%">Observations</th>';
                emptyCols += '<td></td>';
            }

            let rows = '';
            for (let i = 1; i <= 35; i++) {
                const bg = i%2===0?'#fafafa':'#fff';
                rows += `<tr style="height:11px"><td style="text-align:center;font-size:7pt;background:${bg}">${i}</td><td colspan="2" style="background:${bg}"></td>${emptyCols.replace(/<td/g,`<td style="background:${bg};"`)}</tr>`;
            }

            html = `<html><head><meta charset="UTF-8"><title>${titre} ${aps}</title>
<style>@page{size:210mm 297mm;margin:0.4cm}body{font-family:Calibri;font-size:7pt}table{width:100%;border-collapse:collapse}th,td{border:0.5pt solid #000;padding:1px 2px}.main-title{font-size:14pt;font-weight:bold;text-align:center;color:#c1272d;margin:2px 0}</style></head>
<body>
<p class="main-title">${titre}</p>
<table style="border:none;margin-bottom:4px;font-size:7pt"><tr>
<td style="border:none;width:30%"><b>APS:</b> ${aps}</td>
<td style="border:none;width:20%"><b>Classe:</b> ${classe||'______'}</td>
<td style="border:none;width:15%"><b>Niveau:</b> ${niveau}</td>
<td style="border:none;width:35%;text-align:right"><b>Date:</b> ___/___/______</td>
</tr><tr>
<td style="border:none" colspan="2"><b>Prof:</b> ${nomProf||'______'}</td>
<td style="border:none" colspan="2"><b>Étab:</b> ${etablissement||'______'}</td>
</tr></table>
<table>
<tr><th rowspan="2" style="background:#c1272d;color:#fff;width:3%;font-size:5.5pt">N°</th><th rowspan="2" colspan="2" style="background:#c1272d;color:#fff;width:16%;font-size:5.5pt">Nom et Prénom</th>${headMain}</tr>
<tr>${headSub}</tr>
${rows}
</table>
<p style="text-align:right;font-size:6pt;color:#666;margin-top:2px">Signature: ________</p>
</body></html>`;
            htmlDisplay = html;
            filename = `Grille_${isObs?'Obs':'Eval'}_${aps.replace(/\s+/g,'_')}.doc`;
        }

        return res.status(200).json({ success: true, html, htmlDisplay, filename, oti, otc, groupeAPS, situationReference: sitRef });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
