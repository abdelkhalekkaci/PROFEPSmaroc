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
            '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées, tout en développant ses capacités d'adaptation aux situations variées.",
            '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations en fonction de leurs exigences organisationnelles et réglementaires.",
            'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices tout en développant son sens critique.",
            '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes et d'améliorer ses réalisations par une gestion efficace de ses ressources.",
            '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser finement les différentes situations motrices et de s'intégrer efficacement dans la réalisation de projets collectifs et individuels."
        };

        // ==================== OTC PAR APS ====================
        const OTC = {
            'Handball': {
                '1AC': "Conserver collectivement la balle et participer activement au jeu pour progresser vers la cible adverse et marquer.",
                '2AC': "Faire progresser la balle vers la cible par des déplacements variés et des passes adaptées.",
                '3AC': "S'inscrire dans un projet collectif basé sur l'alternance rapide attaquant/défenseur.",
                'TC': "Utiliser des moyens techniques et tactiques adaptés pour créer des situations favorables au tir.",
                '1AB': "Mettre en œuvre des choix tactiques collectifs pertinents avec vitesse d'exécution adaptée.",
                '2AB': "Élaborer une stratégie collective basée sur la maîtrise des rôles et l'occupation de l'espace."
            },
            'Football': {
                '1AC': "Conserver le ballon individuellement et collectivement pour progresser vers le but adverse.",
                '2AC': "Faire progresser le ballon par des conduites maîtrisées et des passes précises.",
                '3AC': "Participer à un projet de jeu collectif intégrant les transitions attaque-défense.",
                'TC': "Organiser le jeu collectif en utilisant les fondamentaux techniques.",
                '1AB': "S'adapter aux configurations de jeu pour optimiser les choix tactiques.",
                '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force."
            },
            'Basketball': {
                '1AC': "Conserver la balle et progresser vers la cible en utilisant le dribble et la passe.",
                '2AC': "Créer et exploiter des situations favorables au tir par le démarquage.",
                '3AC': "S'inscrire dans une organisation collective offensive et défensive équilibrée.",
                'TC': "Optimiser la circulation de balle pour créer le déséquilibre défensif.",
                '1AB': "Analyser le rapport de force et adapter ses choix tactiques.",
                '2AB': "Mettre en œuvre des systèmes de jeu élaborés en attaque et en défense."
            },
            'Volleyball': {
                '1AC': "Se déplacer et se placer correctement pour renvoyer la balle dans le camp adverse.",
                '2AC': "Construire l'attaque par un renvoi indirect utilisant un relais.",
                '3AC': "Organiser la défense et orienter la construction offensive vers la zone avant.",
                'TC': "S'organiser collectivement dans la limite des trois touches réglementaires.",
                '1AB': "Optimiser la construction du point avec des rôles différenciés.",
                '2AB': "Mettre en place une organisation collective avec combinaisons offensives variées."
            },
            'Saut en longueur': {
                '1AC': "Réaliser une course d'élan progressivement accélérée suivie d'une impulsion et d'une réception équilibrée.",
                '2AC': "Enchaîner une course d'élan régulière, une impulsion sur la planche et un saut avec attitude aérienne.",
                '3AC': "Optimiser sa course d'élan étalonnée pour coïncider avec la planche d'appel.",
                'TC': "Maîtriser l'organisation de sa course d'élan et la qualité de son impulsion pour une performance optimale.",
                '1AB': "Augmenter l'efficacité par la maîtrise de la liaison course-impulsion et l'amélioration de la phase aérienne.",
                '2AB': "Optimiser sa performance en coordonnant les trois phases du saut."
            },
            'Saut en hauteur': {
                '1AC': "Franchir une barre en utilisant une course d'élan et une impulsion vers le haut.",
                '2AC': "Réaliser un franchissement dorsal avec une course d'élan courbe adaptée.",
                '3AC': "Optimiser son franchissement par une meilleure coordination course-impulsion-franchissement.",
                'TC': "Maîtriser la technique du fosbury-flop avec une course d'élan et une impulsion efficaces.",
                '1AB': "Améliorer sa performance par l'optimisation de chaque phase technique.",
                '2AB': "Réaliser une performance optimale en gérant les paramètres techniques et psychologiques."
            },
            'Course de vitesse': {
                '1AC': "Réagir rapidement au signal de départ et maintenir sa vitesse sur une distance courte.",
                '2AC': "Améliorer sa technique de course (fréquence et amplitude) pour optimiser sa vitesse.",
                '3AC': "Gérer sa course du départ à l'arrivée en optimisant accélération et maintien.",
                'TC': "Maîtriser les différentes phases de la course de vitesse pour réaliser sa meilleure performance.",
                '1AB': "Analyser et améliorer ses points faibles pour progresser.",
                '2AB': "Atteindre son potentiel maximal par une préparation et une exécution optimales."
            },
            'Course de durée': {
                '1AC': "Courir de façon régulière sur une durée donnée en gérant son effort.",
                '2AC': "Adapter son allure de course pour maintenir un effort prolongé.",
                '3AC': "Construire et respecter un projet de course en fonction de ses capacités.",
                'TC': "Planifier et réaliser une performance en gérant efficacement ses ressources.",
                '1AB': "Optimiser sa performance par une gestion stratégique de l'allure.",
                '2AB': "Atteindre ses objectifs par une préparation et une stratégie adaptées."
            },
            'Lancer de poids': {
                '1AC': "Lancer un engin en utilisant une poussée du bras depuis l'épaule.",
                '2AC': "Coordonner la poussée des jambes et l'action du bras pour améliorer son lancer.",
                '3AC': "Enchaîner les actions motrices du lancer en respectant la technique et les règles.",
                'TC': "Réaliser un lancer en maîtrisant la coordination des différents segments corporels.",
                '1AB': "Améliorer sa performance par le perfectionnement technique et la puissance.",
                '2AB': "Optimiser sa performance par une maîtrise complète de la chaîne de lancer."
            },
            'Gymnastique': {
                '1AC': "Réaliser un enchaînement simple de 3A et 2B présenté devant la classe.",
                '2AC': "Présenter un enchaînement varié comprenant 3A, 2B et 1C avec des liaisons fluides.",
                '3AC': "Concevoir et réaliser un enchaînement individuel comprenant 2A, 4B et 1C.",
                'TC': "Présenter un enchaînement gymnique comprenant 2A, 3B et 2C avec maîtrise.",
                '1AB': "Composer et réaliser un enchaînement comprenant 2B, 3C et 2D avec continuité.",
                '2AB': "Concevoir, réaliser et évaluer un enchaînement varié comprenant 2C, 3D et 2E."
            },
            'Tennis de table': {
                '1AC': "Maintenir un échange en renvoyant la balle sur la table adverse.",
                '2AC': "Diriger la balle dans différentes zones pour mettre l'adversaire en difficulté.",
                '3AC': "Varier les trajectoires et les effets pour prendre l'initiative du point.",
                'TC': "Construire le point en utilisant des variations de placement, vitesse et effet.",
                '1AB': "Élaborer des stratégies adaptées aux caractéristiques de l'adversaire.",
                '2AB': "Mettre en œuvre un projet de jeu personnel et l'adapter en cours de match."
            },
            'Badminton': {
                '1AC': "Renvoyer le volant dans le terrain adverse en utilisant les frappes de base.",
                '2AC': "Varier la longueur et la direction de ses frappes pour déplacer l'adversaire.",
                '3AC': "Alterner jeu long et jeu court pour créer des espaces et marquer.",
                'TC': "Construire le point en exploitant les espaces libres et en variant les trajectoires.",
                '1AB': "Élaborer des séquences de jeu tactiquement cohérentes.",
                '2AB': "Concevoir et appliquer une stratégie de jeu personnelle adaptée à l'adversaire."
            }
        };

        // Situations de référence
        const SITUATIONS_REF = {
            'Handball': '7 contre 7', 'Football': '5 contre 5', 'Basketball': '5 contre 5', 'Volleyball': '6 contre 6',
            'Tennis de table': 'Match simple', 'Badminton': 'Match simple',
            'Course de vitesse': isCollege ? '80m' : '80m(G)/60m(F)',
            'Saut en longueur': '3 essais mesurés', 'Saut en hauteur': 'Concours barres montantes',
            'Lancer de poids': '3 essais (4kg G/3kg F)', 'Course de durée': '1000m(G)/600m(F)',
            'Gymnastique': 'Enchaînement au sol'
        };

        // Objectifs par niveau d'élèves
        const getObjectifsParNiveau = (aps, niveauEleves, nbSeances) => {
            const sitRef = SITUATIONS_REF[aps];
            const objectifs = {
                'debutant': [
                    `Évaluation diagnostique : Observer les capacités initiales des élèves débutants à travers la situation de référence (${sitRef}).`,
                    `Découverte : Présenter les règles fondamentales, le vocabulaire et les consignes de sécurité.`,
                    `Familiarisation : Découvrir les gestes de base à travers des situations ludiques et accessibles.`,
                    `Acquisition : Maîtriser les techniques de base dans des situations simplifiées sans opposition.`,
                    `Consolidation : Reproduire les gestes fondamentaux avec régularité et correction.`,
                    `Application : Utiliser les acquis dans des situations aménagées à faible complexité.`,
                    `Situation facilitée : Mettre en œuvre les apprentissages dans un contexte adapté.`,
                    `Intégration guidée : Enchaîner les actions apprises avec repères et consignes.`,
                    `Préparation : Répéter la situation de référence dans des conditions facilitées.`,
                    `Évaluation terminale : Valider les acquis fondamentaux à travers la situation de référence (${sitRef}).`
                ],
                'moyen': [
                    `Évaluation diagnostique : Analyser les compétences initiales à travers la situation de référence (${sitRef}).`,
                    `Rappel : Consolider les connaissances réglementaires et approfondir les principes tactiques.`,
                    `Perfectionnement : Améliorer la qualité d'exécution des gestes fondamentaux.`,
                    `Développement tactique : Comprendre et appliquer les principes d'organisation.`,
                    `Situations complexes : Mobiliser les acquis techniques avec contraintes multiples.`,
                    `Adaptation : Ajuster ses réponses motrices en fonction des configurations.`,
                    `Enchaînement : Lier les différentes phases techniques avec fluidité.`,
                    `Autonomie : Prendre des initiatives et faire des choix pertinents.`,
                    `Intégration : Mobiliser l'ensemble des acquis en situation proche de la référence.`,
                    `Évaluation terminale : Valider les compétences à travers la situation de référence (${sitRef}).`
                ],
                'avance': [
                    `Évaluation diagnostique : Évaluer le niveau de maîtrise à travers la situation de référence (${sitRef}).`,
                    `Analyse tactique : Approfondir les stratégies et systèmes de jeu.`,
                    `Perfectionnement avancé : Affiner les détails techniques pour plus d'efficacité.`,
                    `Lecture de jeu : Développer la capacité à anticiper et s'adapter rapidement.`,
                    `Prise de décision : Optimiser la pertinence et rapidité des choix.`,
                    `Performance sous pression : Maintenir la qualité dans des conditions exigeantes.`,
                    `Leadership : Organiser et guider le groupe dans l'activité.`,
                    `Gestion de match : Maîtriser les aspects stratégiques et psychologiques.`,
                    `Préparation intensive : Simuler les conditions d'évaluation avec exigence.`,
                    `Évaluation terminale : Valider un niveau avancé à travers la situation de référence (${sitRef}).`
                ],
                'elite': [
                    `Évaluation diagnostique : Identifier les axes de perfectionnement à travers la situation de référence (${sitRef}).`,
                    `Expertise tactique : Maîtriser les stratégies avancées et variantes de haut niveau.`,
                    `Excellence technique : Atteindre un niveau d'exécution optimal.`,
                    `Créativité motrice : Développer des réponses originales et efficaces.`,
                    `Gestion performance : Optimiser tous les paramètres de la performance.`,
                    `Transmission : Analyser, expliquer et démontrer les techniques.`,
                    `Arbitrage : Maîtriser les règles et évaluer les performances des pairs.`,
                    `Compétition simulée : Performer dans des conditions proches de l'officiel.`,
                    `Optimisation finale : Peaufiner les derniers détails.`,
                    `Évaluation terminale : Valider un niveau d'expertise à travers la situation de référence (${sitRef}).`
                ]
            };
            let obj = objectifs[niveauEleves] || objectifs['moyen'];
            while (obj.length < nbSeances) obj.splice(obj.length - 1, 0, `Renforcement : Consolider et automatiser les compétences.`);
            return obj.slice(0, nbSeances);
        };

        // Critères d'observation
        const CRITERES_OBS = {
            'Saut en longueur': { criteres: [{ nom: 'Course', sous: ['Accélérée', 'Irrégulière'] }, { nom: 'Piétinement', sous: ['Absent', 'Présent'] }, { nom: 'Appel', sous: ['Avant', 'Sur', 'Mordu'] }, { nom: 'Réception', sous: ['2 pieds', 'Autre'] }], perf: true },
            'Saut en hauteur': { criteres: [{ nom: 'Course', sous: ['Courbe', 'Droite'] }, { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] }, { nom: 'Franchissement', sous: ['Dorsal', 'Autre'] }, { nom: 'Réception', sous: ['Dos', 'Danger'] }], perf: true },
            'Course de vitesse': { criteres: [{ nom: 'Départ', sous: ['Réactif', 'Lent'] }, { nom: 'Accélération', sous: ['Bonne', 'Faible'] }, { nom: 'Fréquence', sous: ['Élevée', 'Basse'] }, { nom: 'Ligne', sous: ['Droite', 'Déviée'] }], perf: true },
            'Lancer de poids': { criteres: [{ nom: 'Position', sous: ['Correcte', 'Incorrecte'] }, { nom: 'Placement', sous: ['Cou', 'Éloigné'] }, { nom: 'Poussée', sous: ['Complète', 'Partielle'] }, { nom: 'Équilibre', sous: ['Oui', 'Non'] }], perf: true },
            'Course de durée': { criteres: [{ nom: 'Régularité', sous: ['Constante', 'Variable'] }, { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] }, { nom: 'Posture', sous: ['Correcte', 'Incorrecte'] }, { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }], perf: true },
            'Handball': { criteres: [{ nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Réception', sous: ['Assurée', 'Hésitante'] }, { nom: 'Tir', sous: ['Cadré', 'Non cadré'] }, { nom: 'Démarquage', sous: ['Oui', 'Non'] }], obs: true },
            'Football': { criteres: [{ nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] }, { nom: 'Passe', sous: ['Précise', 'Imprécise'] }, { nom: 'Contrôle', sous: ['Orienté', 'Subi'] }, { nom: 'Placement', sous: ['Bon', 'Mauvais'] }], obs: true },
            'Basketball': { criteres: [{ nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] }, { nom: 'Passe', sous: ['Bonne', 'Mauvaise'] }, { nom: 'Tir', sous: ['Correct', 'Déséquilibré'] }, { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }], obs: true },
            'Volleyball': { criteres: [{ nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] }, { nom: 'Passe haute', sous: ['Correcte', 'Basse'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Déplacement', sous: ['Anticipé', 'Retard'] }], obs: true },
            'Gymnastique': { criteres: [{ nom: 'Éléments A', sous: ['Réussi', 'Raté'] }, { nom: 'Éléments B', sous: ['Réussi', 'Raté'] }, { nom: 'Éléments C', sous: ['Réussi', 'Raté'] }, { nom: 'Liaison', sous: ['Fluide', 'Arrêts'] }], note: true },
            'Tennis de table': { criteres: [{ nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Déplacement', sous: ['Équilibré', 'Instable'] }], obs: true },
            'Badminton': { criteres: [{ nom: 'Dégagé', sous: ['Fond', 'Court'] }, { nom: 'Amorti', sous: ['Près filet', 'Long'] }, { nom: 'Service', sous: ['Réussi', 'Faute'] }, { nom: 'Replacement', sous: ['Centre', 'Excentré'] }], obs: true }
        };

        const CRITERES_EVAL = {
            'sports_collectifs': [{ nom: 'Maîtrise technique', pts: 5 }, { nom: 'Pertinence tactique', pts: 5 }, { nom: 'Engagement', pts: 5 }, { nom: 'Respect règles', pts: 5 }],
            'athletisme': [{ nom: 'Performance', pts: 10 }, { nom: 'Maîtrise technique', pts: 6 }, { nom: 'Engagement', pts: 4 }],
            'gymnastique': [{ nom: 'Difficulté', pts: 6 }, { nom: 'Exécution', pts: 8 }, { nom: 'Composition', pts: 6 }],
            'sports_renvoi': [{ nom: 'Technique', pts: 6 }, { nom: 'Tactique', pts: 6 }, { nom: 'Efficacité', pts: 8 }]
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
        const critObs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];
        const critEval = CRITERES_EVAL[typeEval];

        let html = '', htmlDisplay = '', filename = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            // Prompt amélioré pour contenu détaillé
            const prompt = `Tu es un expert en EPS au Maroc. Génère le contenu DÉTAILLÉ pour une fiche de séance.

APS: ${aps}
Niveau: ${niveau}
Objectif: ${objectif}

GÉNÈRE EXACTEMENT CE FORMAT (avec du contenu DÉTAILLÉ et SPÉCIFIQUE, pas de texte générique):

ECHAUFFEMENT_SPECIFIQUE:
[Décris 3 exercices spécifiques à l'APS avec détails précis : organisation, durée, consignes]

SITUATION1_TITRE:
[Titre descriptif de la situation 1]

SITUATION1_BUT:
[But précis de la situation]

SITUATION1_ORGANISATION:
[Description détaillée : nombre de joueurs, terrain, matériel, zones, placement]

SITUATION1_DEROULEMENT:
[Explication complète du déroulement en 4-5 phrases détaillées]

SITUATION1_CONSIGNES:
1. [Consigne précise et détaillée]
2. [Consigne précise et détaillée]
3. [Consigne précise et détaillée]

SITUATION1_VARIANTES:
- Simplifier: [Comment simplifier la situation]
- Complexifier: [Comment complexifier la situation]

SITUATION2_TITRE:
[Titre descriptif de la situation 2]

SITUATION2_BUT:
[But précis de la situation]

SITUATION2_ORGANISATION:
[Description détaillée : nombre de joueurs, terrain, matériel, zones, placement]

SITUATION2_DEROULEMENT:
[Explication complète du déroulement en 4-5 phrases détaillées]

SITUATION2_CONSIGNES:
1. [Consigne précise et détaillée]
2. [Consigne précise et détaillée]
3. [Consigne précise et détaillée]

SITUATION2_VARIANTES:
- Simplifier: [Comment simplifier la situation]
- Complexifier: [Comment complexifier la situation]

CRITERES_REALISATION:
[4 critères de réalisation spécifiques à l'objectif]

CRITERES_REUSSITE:
[4 critères de réussite mesurables]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 2500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

            // Parsing amélioré
            const extract = (key) => {
                const regex = new RegExp(key + ':\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)', 'i');
                const match = contenu.match(regex);
                return match ? match[1].trim() : '';
            };

            const echaufSpec = extract('ECHAUFFEMENT_SPECIFIQUE') || 'Exercices de manipulation de balle, passes courtes en binômes, déplacements spécifiques avec changements de direction.';
            const s1Titre = extract('SITUATION1_TITRE') || 'Situation d\'apprentissage technique';
            const s1But = extract('SITUATION1_BUT') || 'Maîtriser le geste technique fondamental';
            const s1Orga = extract('SITUATION1_ORGANISATION') || 'Ateliers de 4-5 élèves, terrain divisé en zones';
            const s1Deroul = extract('SITUATION1_DEROULEMENT') || 'Les élèves travaillent par groupes de niveau. Chaque groupe effectue l\'exercice en respectant les consignes. Rotation toutes les 3 minutes.';
            const s1Consignes = extract('SITUATION1_CONSIGNES') || '1. Respecter le placement indiqué\n2. Exécuter le geste avec précision\n3. Enchaîner les actions sans temps mort';
            const s1Variantes = extract('SITUATION1_VARIANTES') || '- Simplifier: Réduire la distance, enlever l\'opposition\n- Complexifier: Ajouter un défenseur, limiter le temps';
            
            const s2Titre = extract('SITUATION2_TITRE') || 'Situation de jeu aménagé';
            const s2But = extract('SITUATION2_BUT') || 'Appliquer l\'objectif en situation de jeu';
            const s2Orga = extract('SITUATION2_ORGANISATION') || 'Équipes de 4 contre 4, terrain réduit avec zones';
            const s2Deroul = extract('SITUATION2_DEROULEMENT') || 'Match à thème avec application de l\'objectif. Les équipes s\'affrontent en respectant les consignes spécifiques. Points bonus pour l\'application de l\'objectif.';
            const s2Consignes = extract('SITUATION2_CONSIGNES') || '1. Appliquer l\'objectif de la séance\n2. Communiquer avec ses partenaires\n3. S\'engager dans toutes les phases de jeu';
            const s2Variantes = extract('SITUATION2_VARIANTES') || '- Simplifier: Jouer en supériorité numérique\n- Complexifier: Limiter le nombre de touches';

            const critReal = extract('CRITERES_REALISATION') || '• Placement corporel adapté\n• Geste technique maîtrisé\n• Coordination des actions\n• Prise d\'information continue';
            const critReuss = extract('CRITERES_REUSSITE') || '• Taux de réussite ≥ 70%\n• Progression observable\n• Objectif démontré en jeu\n• Engagement constant';

            // Schémas colorés selon l'APS
            let schema1 = '', schema2 = '';
            if (['Handball', 'Football', 'Basketball'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#e8f5e9,#fff);border:3px solid #2e7d32;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#1b5e20;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF SITUATION 1</div>
                    <div style="background:#a5d6a7;border:2px solid #2e7d32;border-radius:10px;padding:20px;position:relative;min-height:180px;">
                        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                        <div style="position:absolute;left:20%;top:20%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">A1</div>
                        <div style="position:absolute;left:20%;top:70%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">A2</div>
                        <div style="position:absolute;left:40%;top:45%;background:#ff9800;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 6px rgba(0,0,0,0.3);">⚽</div>
                        <div style="position:absolute;right:25%;top:20%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">D1</div>
                        <div style="position:absolute;right:25%;top:70%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">D2</div>
                        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                        <div style="position:absolute;left:50%;top:5%;transform:translateX(-50%);background:#fff;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:bold;">Zone offensive</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
                        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔵 Attaquants</span>
                        <span style="background:#c62828;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔴 Défenseurs</span>
                        <span style="background:#ff9800;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">⚽ Ballon</span>
                    </div>
                </div>`;
                schema2 = schema1.replace('SITUATION 1', 'SITUATION 2').replace('Zone offensive', 'Match à thème');
            } else if (['Course de vitesse', 'Course de durée'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#fff3e0,#fff);border:3px solid #e65100;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF - PISTE D'ATHLÉTISME</div>
                    <div style="background:#ffcc80;border:2px solid #e65100;border-radius:10px;padding:20px;">
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;font-size:13px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏁 DÉPART</div>
                                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#d84315,#d84315 20px,#ff7043 20px,#ff7043 40px);border-radius:5px;position:relative;">
                                    <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:white;padding:2px 8px;border-radius:3px;font-size:10px;font-weight:bold;">Couloir 1</span>
                                </div>
                                <div style="background:#f44336;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;font-size:13px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏆 ARRIVÉE</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;font-size:13px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏁 DÉPART</div>
                                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#1565c0,#1565c0 20px,#42a5f5 20px,#42a5f5 40px);border-radius:5px;position:relative;">
                                    <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:white;padding:2px 8px;border-radius:3px;font-size:10px;font-weight:bold;">Couloir 2</span>
                                </div>
                                <div style="background:#f44336;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;font-size:13px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏆 ARRIVÉE</div>
                            </div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (['Saut en longueur', 'Saut en hauteur'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#f3e5f5,#fff);border:3px solid #7b1fa2;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#4a148c;margin-bottom:15px;font-size:14px;">📐 AIRE DE SAUT</div>
                    <div style="background:#ce93d8;border:2px solid #7b1fa2;border-radius:10px;padding:20px;">
                        <div style="display:flex;align-items:center;gap:15px;">
                            <div style="background:#4caf50;color:white;padding:10px 20px;border-radius:8px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">🏃 ÉLAN</div>
                            <div style="flex:1;height:35px;background:linear-gradient(90deg,#ef6c00,#ff9800,#ffb74d);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:18px;">━━━➤━━━➤━━━</div>
                            <div style="background:#f44336;color:white;padding:10px 15px;border-radius:8px;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.2);">📍 APPEL</div>
                            <div style="background:#ffeb3b;color:#333;padding:10px 25px;border-radius:10px;font-weight:bold;font-size:14px;box-shadow:0 2px 5px rgba(0,0,0,0.2);">${aps.includes('longueur') ? '🏖️ FOSSE' : '📏 TAPIS'}</div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Volleyball') {
                schema1 = `<div style="background:linear-gradient(135deg,#e3f2fd,#fff);border:3px solid #1565c0;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:15px;font-size:14px;">📐 TERRAIN DE VOLLEYBALL</div>
                    <div style="background:#90caf9;border:2px solid #1565c0;border-radius:10px;padding:25px;position:relative;min-height:200px;">
                        <div style="position:absolute;top:50%;left:0;right:0;height:4px;background:white;box-shadow:0 0 5px rgba(0,0,0,0.3);"></div>
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:bold;z-index:1;">FILET</div>
                        <div style="position:absolute;top:15%;left:15%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">1</div>
                        <div style="position:absolute;top:15%;left:40%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">2</div>
                        <div style="position:absolute;top:30%;left:28%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">3</div>
                        <div style="position:absolute;top:60%;right:15%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">1</div>
                        <div style="position:absolute;top:60%;right:40%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">2</div>
                        <div style="position:absolute;top:75%;right:28%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">3</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;">
                        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔵 Équipe A</span>
                        <span style="background:#c62828;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔴 Équipe B</span>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Gymnastique') {
                schema1 = `<div style="background:linear-gradient(135deg,#fce4ec,#fff);border:3px solid #c2185b;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#880e4f;margin-bottom:15px;font-size:14px;">📐 PRATICABLE GYMNASTIQUE</div>
                    <div style="background:#f8bbd9;border:2px solid #c2185b;border-radius:10px;padding:25px;position:relative;min-height:150px;">
                        <div style="position:absolute;top:10%;left:8%;background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🚩 DÉPART</div>
                        <div style="position:absolute;top:35%;left:28%;font-size:35px;">🤸</div>
                        <div style="position:absolute;top:25%;left:48%;font-size:35px;">🤸‍♀️</div>
                        <div style="position:absolute;top:45%;left:68%;font-size:35px;">🤸</div>
                        <div style="position:absolute;bottom:10%;right:8%;background:#f44336;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏁 FIN</div>
                        <div style="position:absolute;bottom:5%;left:50%;transform:translateX(-50%);background:white;padding:3px 12px;border-radius:5px;font-size:11px;">Direction de l'enchaînement →</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else {
                schema1 = `<div style="background:linear-gradient(135deg,#e0f7fa,#fff);border:3px solid #00838f;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#006064;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF D'APPRENTISSAGE</div>
                    <div style="background:#80deea;border:2px solid #00838f;border-radius:10px;padding:30px;text-align:center;">
                        <p style="font-size:14px;color:#006064;margin:0;">Organisation adaptée à ${aps}</p>
                    </div>
                </div>`;
                schema2 = schema1;
            }

            // HTML pour affichage sur le site (avec schémas + contenu détaillé)
            htmlDisplay = `
            <div style="font-family:'Segoe UI',sans-serif;max-width:900px;margin:0 auto;">
                <div style="background:linear-gradient(135deg,#1a5c3a,#2e7d32);color:white;padding:25px;border-radius:15px;margin-bottom:25px;">
                    <h2 style="margin:0 0 10px 0;font-size:1.5rem;">📋 Fiche de séance - ${aps}</h2>
                    <p style="margin:0;opacity:0.9;">Niveau: ${niveau} | Séance N°${numeroSeance || 1} | ${groupeAPS}</p>
                </div>
                
                <div style="background:#e8f5e9;border-left:5px solid #2e7d32;padding:20px;border-radius:0 12px 12px 0;margin-bottom:25px;">
                    <strong style="color:#1a5c3a;font-size:1.1rem;">🎯 OBJECTIF DE LA SÉANCE</strong>
                    <p style="margin:10px 0 0 0;font-size:1.05rem;">${objectif}</p>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;margin-bottom:25px;">
                    <h3 style="color:#1a5c3a;border-bottom:3px solid #1a5c3a;padding-bottom:12px;margin-bottom:20px;font-size:1.2rem;">📌 PARTIE INTRODUCTIVE (15 min)</h3>
                    <div style="margin-bottom:15px;">
                        <strong style="color:#2e7d32;">• Prise en main (3 min) :</strong>
                        <p style="margin:5px 0 0 15px;">Rassemblement des élèves, appel, vérification des tenues. Présentation de l'objectif de la séance et rappel des consignes de sécurité.</p>
                    </div>
                    <div style="margin-bottom:15px;">
                        <strong style="color:#2e7d32;">• Échauffement général (7 min) :</strong>
                        <p style="margin:5px 0 0 15px;">Course lente autour du terrain (3 tours), mobilisation articulaire progressive (chevilles, genoux, hanches, épaules, nuque), gammes athlétiques (montées de genoux, talons-fesses, pas chassés).</p>
                    </div>
                    <div>
                        <strong style="color:#2e7d32;">• Échauffement spécifique (5 min) :</strong>
                        <p style="margin:5px 0 0 15px;">${echaufSpec}</p>
                    </div>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;margin-bottom:25px;">
                    <h3 style="color:#1a5c3a;border-bottom:3px solid #1a5c3a;padding-bottom:12px;margin-bottom:20px;font-size:1.2rem;">⚡ PARTIE FONDAMENTALE (35 min)</h3>
                    
                    <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:25px;">
                        <h4 style="color:#1a5c3a;margin:0 0 15px 0;font-size:1.1rem;">◆ SITUATION 1 : ${s1Titre} (12 min)</h4>
                        ${schema1}
                        <div style="margin-top:15px;">
                            <p><strong style="color:#2e7d32;">🎯 But :</strong> ${s1But}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📍 Organisation :</strong> ${s1Orga}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📋 Déroulement :</strong></p>
                            <p style="margin:5px 0 0 15px;line-height:1.6;">${s1Deroul}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📢 Consignes :</strong></p>
                            <div style="margin:5px 0 0 15px;line-height:1.8;">${s1Consignes.replace(/\n/g, '<br>')}</div>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">🔄 Variantes :</strong></p>
                            <div style="margin:5px 0 0 15px;line-height:1.6;">${s1Variantes.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    
                    <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:25px;">
                        <h4 style="color:#1a5c3a;margin:0 0 15px 0;font-size:1.1rem;">◆ SITUATION 2 : ${s2Titre} (13 min)</h4>
                        ${schema2}
                        <div style="margin-top:15px;">
                            <p><strong style="color:#2e7d32;">🎯 But :</strong> ${s2But}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📍 Organisation :</strong> ${s2Orga}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📋 Déroulement :</strong></p>
                            <p style="margin:5px 0 0 15px;line-height:1.6;">${s2Deroul}</p>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">📢 Consignes :</strong></p>
                            <div style="margin:5px 0 0 15px;line-height:1.8;">${s2Consignes.replace(/\n/g, '<br>')}</div>
                            <p style="margin-top:10px;"><strong style="color:#2e7d32;">🔄 Variantes :</strong></p>
                            <div style="margin:5px 0 0 15px;line-height:1.6;">${s2Variantes.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    
                    <div style="background:#fff3e0;border-radius:12px;padding:20px;border-left:5px solid #ff9800;">
                        <h4 style="color:#e65100;margin:0 0 10px 0;">◆ SITUATION DE RÉFÉRENCE (10 min)</h4>
                        <p><strong>Format :</strong> ${sitRef}</p>
                        <p style="margin-top:8px;">Application des acquis en situation réelle pour évaluer la progression des élèves.</p>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                    <div style="background:#e3f2fd;border-radius:12px;padding:20px;">
                        <h4 style="color:#1565c0;margin:0 0 12px 0;">✅ Critères de réalisation</h4>
                        <div style="line-height:1.8;">${critReal.replace(/\n/g, '<br>').replace(/•/g, '✓')}</div>
                    </div>
                    <div style="background:#e8f5e9;border-radius:12px;padding:20px;">
                        <h4 style="color:#2e7d32;margin:0 0 12px 0;">🎯 Critères de réussite</h4>
                        <div style="line-height:1.8;">${critReuss.replace(/\n/g, '<br>').replace(/•/g, '✓')}</div>
                    </div>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;">
                    <h3 style="color:#1a5c3a;border-bottom:3px solid #1a5c3a;padding-bottom:12px;margin-bottom:20px;font-size:1.2rem;">🧘 PARTIE FINALE (10 min)</h3>
                    <div style="margin-bottom:15px;">
                        <strong style="color:#2e7d32;">• Retour au calme (5 min) :</strong>
                        <p style="margin:5px 0 0 15px;">Marche lente, respiration profonde, étirements des groupes musculaires sollicités (quadriceps, ischio-jambiers, mollets, épaules).</p>
                    </div>
                    <div>
                        <strong style="color:#2e7d32;">• Bilan (5 min) :</strong>
                        <p style="margin:5px 0 0 15px;">Questionnement des élèves sur les apprentissages, feedback collectif et individuel, rangement du matériel.</p>
                    </div>
                </div>
            </div>`;

            // HTML pour Word/PDF (tableau SANS schémas mais avec contenu détaillé)
            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm}
body{font-family:Calibri,sans-serif;font-size:7pt;line-height:1.1}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px 3px;vertical-align:top}
.hd td{border:none;font-size:7pt;padding:1px 3px}
.tt{text-align:center;font-size:10pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:3px}
.lb{background:#e8e8e8;font-weight:bold;font-size:6pt;text-align:center}
.ob{background:#1a5c3a;color:#fff;font-weight:bold;font-size:6.5pt}
.mh{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:6.5pt}
.pt{font-weight:bold;text-align:center;background:#f0f0f0;font-size:7pt}
.ct{font-size:6pt;line-height:1.1}
.st{font-weight:bold;color:#1a5c3a}
</style></head>
<body>
<table class="hd"><tr><td style="width:33%"><b>Professeur:</b> ${nomProf||'________'}</td><td style="text-align:center"><b>Établissement:</b> ${etablissement||'________'}</td><td style="text-align:right"><b>Année:</b> ${anneeScolaire||'2024-2025'}</td></tr></table>
<table><tr><td class="tt">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr></table>
<table>
<tr><td class="lb" style="width:6%">Groupe</td><td style="width:12%;font-size:6.5pt">${groupeAPS}</td><td class="lb" style="width:4%">APS</td><td style="width:10%;font-size:6.5pt">${aps}</td><td class="lb" style="width:4%">Niveau</td><td style="width:5%;font-size:6.5pt">${niveau}</td><td class="lb" style="width:5%">Séance</td><td style="width:3%;font-size:6.5pt">${numeroSeance||1}</td></tr>
<tr><td class="lb">OTI</td><td colspan="7" style="font-size:5.5pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td colspan="7" style="font-size:5.5pt">${otc}</td></tr>
<tr><td class="ob">OBJECTIF</td><td colspan="7" style="background:#e8f5e9;font-weight:bold;font-size:7pt">${objectif}</td></tr>
</table>
<table>
<tr><th class="mh" style="width:5%">PARTIES</th><th class="mh" style="width:3%">DUR.</th><th class="mh" style="width:54%">CONTENU / SITUATIONS D'APPRENTISSAGE</th><th class="mh" style="width:7%">BUT</th><th class="mh" style="width:15.5%">C. RÉALISATION</th><th class="mh" style="width:15.5%">C. RÉUSSITE</th></tr>
<tr>
<td class="pt">INTRO</td><td style="text-align:center;font-weight:bold">15'</td>
<td class="ct"><span class="st">Prise en main (3'):</span> Appel, tenues, objectif, sécurité.<br><span class="st">Échauffement général (7'):</span> Course, mobilisation articulaire, gammes.<br><span class="st">Échauffement spécifique (5'):</span> ${echaufSpec}</td>
<td class="ct">Préparer l'organisme</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic;color:#666">Phase de préparation</td>
</tr>
<tr>
<td class="pt">FONDA.</td><td style="text-align:center;font-weight:bold">35'</td>
<td class="ct">
<span class="st">◆ SIT.1: ${s1Titre} (12')</span><br>
<b>But:</b> ${s1But}<br>
<b>Organisation:</b> ${s1Orga}<br>
<b>Déroulement:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' ')}<br>
<b>Variantes:</b> ${s1Variantes.replace(/\n/g, ' ')}<br><br>
<span class="st">◆ SIT.2: ${s2Titre} (13')</span><br>
<b>But:</b> ${s2But}<br>
<b>Organisation:</b> ${s2Orga}<br>
<b>Déroulement:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' ')}<br>
<b>Variantes:</b> ${s2Variantes.replace(/\n/g, ' ')}<br><br>
<span class="st">◆ SIT. RÉFÉRENCE (10'):</span> ${sitRef}
</td>
<td class="ct">Atteindre l'objectif</td>
<td class="ct">${critReal.replace(/\n/g, '<br>')}</td>
<td class="ct">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>
<tr>
<td class="pt">FINALE</td><td style="text-align:center;font-weight:bold">10'</td>
<td class="ct"><span class="st">Retour au calme (5'):</span> Marche, respiration, étirements.<br><span class="st">Bilan (5'):</span> Questions, feedback, rangement.</td>
<td class="ct">Récupération</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic;color:#666">Phase de récupération</td>
</tr>
</table>
<p style="text-align:center;font-size:5.5pt;color:#666;margin-top:2px">Conforme aux Orientations Pédagogiques ${isCollege ? '2009' : '2007'} | MEN Maroc</p>
</body></html>`;
            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivEleves = niveauEleves || 'moyen';
            const nivTxt = { 'debutant': 'Débutant (Initiation)', 'moyen': 'Moyen (Apprentissage)', 'avance': 'Avancé (Perfectionnement)', 'elite': 'Élite (Expertise)' }[nivEleves];
            
            const objectifs = getObjectifsParNiveau(aps, nivEleves, nb);
            
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
<p style="text-align:right;font-size:8pt;margin-top:8px;color:#666"><b>Professeur:</b> ${nomProf||'________'} | <b>Établissement:</b> ${etablissement||'________'}</p>
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
<table style="border:none;margin-bottom:5px"><tr><td style="border:none;font-size:9pt"><b>Classe:</b> ${classe||'________'}</td><td style="border:none;text-align:right;font-size:9pt"><b>${nomProf||'Professeur'}</b> – ${etablissement||'Établissement'}</td></tr></table>
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

        return res.status(200).json({ success: true, html, htmlDisplay, filename, oti, otc, groupeAPS, situationReference: sitRef });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
