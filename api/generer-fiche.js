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

        // OTI
        const OTI = {
            '1AC': "À la fin de la 1ère année du cycle secondaire collégial, l'élève doit être capable d'acquérir une motricité correcte lui permettant de s'adapter aux exigences des différentes situations motrices et de s'intégrer positivement dans le groupe classe.",
            '2AC': "À la fin de la 2ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster et de maîtriser son énergie physique pour effectuer des réalisations motrices coordonnées et organisées.",
            '3AC': "À la fin de la 3ème année du cycle secondaire collégial, l'élève doit être capable d'ajuster les éléments de l'acte moteur et de s'adapter aux différentes situations.",
            'TC': "À la fin du Tronc Commun, l'élève doit être capable de maîtriser les composantes du comportement moteur et de s'adapter aux différentes situations motrices.",
            '1AB': "À la fin de la 1ère année du Baccalauréat, l'élève doit être capable de confronter et d'analyser différentes situations motrices complexes.",
            '2AB': "À la fin de la 2ème année du Baccalauréat, l'élève doit être capable d'analyser les différentes situations motrices et de s'intégrer dans des projets collectifs."
        };

        // OTC
        const OTC = {
            'Handball': { '1AC': "Conserver la balle et participer au jeu pour progresser vers la cible.", '2AC': "Faire progresser la balle par des déplacements variés et des passes adaptées.", '3AC': "S'inscrire dans un projet collectif basé sur l'alternance attaquant/défenseur.", 'TC': "Utiliser des moyens techniques et tactiques pour créer des situations de tir.", '1AB': "Mettre en œuvre des choix tactiques collectifs pertinents.", '2AB': "Élaborer une stratégie collective basée sur la maîtrise des rôles." },
            'Football': { '1AC': "Conserver le ballon pour progresser vers le but adverse.", '2AC': "Faire progresser le ballon par des conduites maîtrisées.", '3AC': "Participer à un projet de jeu intégrant les transitions.", 'TC': "Organiser le jeu collectif au service de la progression.", '1AB': "S'adapter aux configurations pour optimiser les choix tactiques.", '2AB': "Concevoir des stratégies adaptées au rapport de force." },
            'Basketball': { '1AC': "Conserver la balle et progresser en utilisant dribble et passe.", '2AC': "Créer des situations favorables au tir par le démarquage.", '3AC': "S'inscrire dans une organisation collective équilibrée.", 'TC': "Optimiser la circulation pour créer le déséquilibre.", '1AB': "Analyser le rapport de force et adapter ses choix.", '2AB': "Mettre en œuvre des systèmes de jeu élaborés." },
            'Volleyball': { '1AC': "Se déplacer pour renvoyer la balle dans le camp adverse.", '2AC': "Construire l'attaque par un renvoi indirect.", '3AC': "Organiser la défense et orienter vers la zone avant.", 'TC': "S'organiser collectivement dans la limite des trois touches.", '1AB': "Optimiser la construction avec des rôles différenciés.", '2AB': "Mettre en place des combinaisons offensives variées." },
            'Saut en longueur': { '1AC': "Réaliser une course d'élan accélérée suivie d'une impulsion.", '2AC': "Enchaîner course d'élan, impulsion et attitude aérienne.", '3AC': "Optimiser sa course pour coïncider avec la planche.", 'TC': "Maîtriser la course d'élan et la qualité de l'impulsion.", '1AB': "Augmenter l'efficacité par la maîtrise course-impulsion.", '2AB': "Optimiser en coordonnant les trois phases du saut." },
            'Saut en hauteur': { '1AC': "Franchir une barre avec course d'élan et impulsion.", '2AC': "Réaliser un franchissement dorsal avec course courbe.", '3AC': "Optimiser la coordination course-impulsion-franchissement.", 'TC': "Maîtriser la technique du fosbury-flop.", '1AB': "Améliorer par l'optimisation de chaque phase.", '2AB': "Réaliser une performance optimale." },
            'Course de vitesse': { '1AC': "Réagir rapidement au signal et maintenir sa vitesse.", '2AC': "Améliorer sa technique (fréquence et amplitude).", '3AC': "Gérer sa course en optimisant accélération et maintien.", 'TC': "Maîtriser les différentes phases de la course.", '1AB': "Analyser et améliorer ses points faibles.", '2AB': "Atteindre son potentiel maximal." },
            'Course de durée': { '1AC': "Courir de façon régulière en gérant son effort.", '2AC': "Adapter son allure pour maintenir un effort prolongé.", '3AC': "Construire et respecter un projet de course.", 'TC': "Planifier et réaliser une performance en gérant ses ressources.", '1AB': "Optimiser par une gestion stratégique de l'allure.", '2AB': "Atteindre ses objectifs par une stratégie adaptée." },
            'Lancer de poids': { '1AC': "Lancer en utilisant une poussée depuis l'épaule.", '2AC': "Coordonner la poussée des jambes et l'action du bras.", '3AC': "Enchaîner les actions en respectant technique et règles.", 'TC': "Maîtriser la coordination des segments corporels.", '1AB': "Améliorer par perfectionnement et puissance.", '2AB': "Optimiser par une maîtrise complète." },
            'Gymnastique': { '1AC': "Réaliser un enchaînement simple de 3A et 2B.", '2AC': "Présenter un enchaînement de 3A, 2B et 1C.", '3AC': "Concevoir un enchaînement de 2A, 4B et 1C.", 'TC': "Présenter un enchaînement de 2A, 3B et 2C.", '1AB': "Composer un enchaînement de 2B, 3C et 2D.", '2AB': "Concevoir un enchaînement de 2C, 3D et 2E." },
            'Tennis de table': { '1AC': "Maintenir un échange sur la table adverse.", '2AC': "Diriger la balle pour mettre l'adversaire en difficulté.", '3AC': "Varier trajectoires et effets pour l'initiative.", 'TC': "Construire le point par variations.", '1AB': "Élaborer des stratégies adaptées.", '2AB': "Mettre en œuvre un projet de jeu personnel." },
            'Badminton': { '1AC': "Renvoyer le volant avec les frappes de base.", '2AC': "Varier longueur et direction pour déplacer l'adversaire.", '3AC': "Alterner jeu long et court pour créer des espaces.", 'TC': "Construire le point en exploitant les espaces.", '1AB': "Élaborer des séquences tactiquement cohérentes.", '2AB': "Concevoir une stratégie personnelle adaptée." }
        };

        const SITUATIONS_REF = {
            'Handball': '7 contre 7', 'Football': '5 contre 5', 'Basketball': '5 contre 5', 'Volleyball': '6 contre 6',
            'Tennis de table': 'Match simple', 'Badminton': 'Match simple',
            'Course de vitesse': isCollege ? '80m' : '80m(G)/60m(F)',
            'Saut en longueur': '3 essais mesurés', 'Saut en hauteur': 'Concours barres montantes',
            'Lancer de poids': '3 essais (4kg G/3kg F)', 'Course de durée': '1000m(G)/600m(F)',
            'Gymnastique': 'Enchaînement au sol'
        };

        // Objectifs par niveau d'élèves pour le projet
        const getObjectifsParNiveau = (aps, niveauEleves, nbSeances) => {
            const sitRef = SITUATIONS_REF[aps];
            const obj = {
                'debutant': [`Évaluation diagnostique : Observer les capacités initiales via la situation de référence (${sitRef}).`, `Découverte : Présenter règles, vocabulaire et sécurité.`, `Familiarisation : Découvrir les gestes de base.`, `Acquisition : Maîtriser les techniques de base.`, `Consolidation : Reproduire les gestes avec régularité.`, `Application : Utiliser les acquis en situation simple.`, `Situation facilitée : Mettre en œuvre les apprentissages.`, `Intégration guidée : Enchaîner les actions apprises.`, `Préparation : Répéter la situation de référence.`, `Évaluation terminale : Valider les acquis (${sitRef}).`],
                'moyen': [`Évaluation diagnostique : Analyser les compétences via la situation de référence (${sitRef}).`, `Rappel : Consolider les connaissances réglementaires.`, `Perfectionnement : Améliorer la qualité d'exécution.`, `Développement tactique : Appliquer les principes d'organisation.`, `Situations complexes : Mobiliser les acquis avec contraintes.`, `Adaptation : Ajuster ses réponses motrices.`, `Enchaînement : Lier les phases techniques.`, `Autonomie : Prendre des initiatives.`, `Intégration : Mobiliser l'ensemble des acquis.`, `Évaluation terminale : Valider les compétences (${sitRef}).`],
                'avance': [`Évaluation diagnostique : Évaluer le niveau de maîtrise (${sitRef}).`, `Analyse tactique : Approfondir stratégies et systèmes.`, `Perfectionnement avancé : Affiner les détails techniques.`, `Lecture de jeu : Développer l'anticipation.`, `Prise de décision : Optimiser pertinence et rapidité.`, `Performance sous pression : Maintenir la qualité.`, `Leadership : Organiser et guider le groupe.`, `Gestion de match : Maîtriser aspects stratégiques.`, `Préparation intensive : Simuler les conditions d'évaluation.`, `Évaluation terminale : Valider niveau avancé (${sitRef}).`],
                'elite': [`Évaluation diagnostique : Identifier axes de perfectionnement (${sitRef}).`, `Expertise tactique : Maîtriser stratégies avancées.`, `Excellence technique : Atteindre niveau optimal.`, `Créativité motrice : Développer réponses originales.`, `Gestion performance : Optimiser tous paramètres.`, `Transmission : Analyser et démontrer.`, `Arbitrage : Maîtriser règles et évaluer.`, `Compétition simulée : Performer en conditions officielles.`, `Optimisation finale : Peaufiner les détails.`, `Évaluation terminale : Valider niveau expert (${sitRef}).`]
            };
            let o = obj[niveauEleves] || obj['moyen'];
            while (o.length < nbSeances) o.splice(-1, 0, `Renforcement : Consolider les compétences.`);
            return o.slice(0, nbSeances);
        };

        // Critères observation
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
            'sports_collectifs': [{ nom: 'Technique', pts: 5 }, { nom: 'Tactique', pts: 5 }, { nom: 'Engagement', pts: 5 }, { nom: 'Règles', pts: 5 }],
            'athletisme': [{ nom: 'Performance', pts: 10 }, { nom: 'Technique', pts: 6 }, { nom: 'Engagement', pts: 4 }],
            'gymnastique': [{ nom: 'Difficulté', pts: 6 }, { nom: 'Exécution', pts: 8 }, { nom: 'Composition', pts: 6 }],
            'sports_renvoi': [{ nom: 'Technique', pts: 6 }, { nom: 'Tactique', pts: 6 }, { nom: 'Efficacité', pts: 8 }]
        };

        let groupeAPS = 'Activité', typeEval = 'sports_collectifs';
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

            const prompt = `Expert EPS Maroc. Génère le contenu DÉTAILLÉ pour une fiche de séance.
APS: ${aps} | Niveau: ${niveau} | Objectif: ${objectif}

GÉNÈRE EXACTEMENT CE FORMAT avec du contenu SPÉCIFIQUE et DÉTAILLÉ:

ECHAUFFEMENT_SPECIFIQUE:
[3 exercices spécifiques détaillés avec organisation et durée]

SITUATION1_TITRE: [titre descriptif]
SITUATION1_BUT: [but précis]
SITUATION1_ORGANISATION: [organisation détaillée: joueurs, terrain, matériel]
SITUATION1_DEROULEMENT: [explication complète en 4-5 phrases]
SITUATION1_CONSIGNES:
1. [consigne détaillée]
2. [consigne détaillée]
3. [consigne détaillée]
SITUATION1_VARIANTES:
- Simplifier: [comment simplifier]
- Complexifier: [comment complexifier]

SITUATION2_TITRE: [titre descriptif]
SITUATION2_BUT: [but précis]
SITUATION2_ORGANISATION: [organisation détaillée]
SITUATION2_DEROULEMENT: [explication complète en 4-5 phrases]
SITUATION2_CONSIGNES:
1. [consigne détaillée]
2. [consigne détaillée]
3. [consigne détaillée]
SITUATION2_VARIANTES:
- Simplifier: [comment simplifier]
- Complexifier: [comment complexifier]

CRITERES_REALISATION: [4 critères spécifiques]
CRITERES_REUSSITE: [4 critères mesurables]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 2500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

            const extract = (key) => {
                const regex = new RegExp(key + ':\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)', 'i');
                const match = contenu.match(regex);
                return match ? match[1].trim() : '';
            };

            const echaufSpec = extract('ECHAUFFEMENT_SPECIFIQUE') || 'Exercices de manipulation, passes en binômes, déplacements spécifiques.';
            const s1Titre = extract('SITUATION1_TITRE') || 'Situation analytique';
            const s1But = extract('SITUATION1_BUT') || 'Maîtriser le geste technique';
            const s1Orga = extract('SITUATION1_ORGANISATION') || 'Ateliers de 4-5 élèves';
            const s1Deroul = extract('SITUATION1_DEROULEMENT') || 'Les élèves travaillent par groupes. Chaque groupe effectue l\'exercice. Rotation toutes les 3 minutes.';
            const s1Consignes = extract('SITUATION1_CONSIGNES') || '1. Respecter le placement\n2. Exécuter avec précision\n3. Enchaîner sans temps mort';
            const s1Variantes = extract('SITUATION1_VARIANTES') || '- Simplifier: Réduire la distance\n- Complexifier: Ajouter un défenseur';
            const s2Titre = extract('SITUATION2_TITRE') || 'Situation globale';
            const s2But = extract('SITUATION2_BUT') || 'Appliquer en situation de jeu';
            const s2Orga = extract('SITUATION2_ORGANISATION') || 'Équipes de 4 contre 4';
            const s2Deroul = extract('SITUATION2_DEROULEMENT') || 'Match à thème avec application de l\'objectif. Points bonus pour l\'application.';
            const s2Consignes = extract('SITUATION2_CONSIGNES') || '1. Appliquer l\'objectif\n2. Communiquer\n3. S\'engager';
            const s2Variantes = extract('SITUATION2_VARIANTES') || '- Simplifier: Supériorité numérique\n- Complexifier: Limiter les touches';
            const critReal = extract('CRITERES_REALISATION') || '• Placement adapté\n• Geste maîtrisé\n• Coordination\n• Prise d\'info';
            const critReuss = extract('CRITERES_REUSSITE') || '• Taux ≥ 70%\n• Progression visible\n• Objectif atteint\n• Engagement constant';

            // Schémas colorés
            let schema1 = '', schema2 = '';
            if (['Handball', 'Football', 'Basketball'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#e8f5e9,#fff);border:3px solid #006233;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#006233;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF SITUATION 1</div>
                    <div style="background:#a5d6a7;border:2px solid #006233;border-radius:10px;padding:20px;position:relative;min-height:180px;">
                        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                        <div style="position:absolute;left:22%;top:20%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 8px rgba(0,0,0,0.3);">A1</div>
                        <div style="position:absolute;left:22%;top:70%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 8px rgba(0,0,0,0.3);">A2</div>
                        <div style="position:absolute;left:42%;top:45%;background:#ff9800;border-radius:50%;width:28px;height:28px;box-shadow:0 3px 8px rgba(0,0,0,0.3);"></div>
                        <div style="position:absolute;right:22%;top:20%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 8px rgba(0,0,0,0.3);">D1</div>
                        <div style="position:absolute;right:22%;top:70%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 8px rgba(0,0,0,0.3);">D2</div>
                        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:45px;height:45px;display:flex;align-items:center;justify-content:center;font-size:20px;">🥅</div>
                    </div>
                    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
                        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔵 Attaquants</span>
                        <span style="background:#c62828;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">🔴 Défenseurs</span>
                        <span style="background:#ff9800;color:white;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:bold;">⚽ Ballon</span>
                    </div>
                </div>`;
                schema2 = schema1.replace('SITUATION 1', 'SITUATION 2');
            } else if (['Course de vitesse', 'Course de durée'].includes(aps)) {
                schema1 = `<div style="background:linear-gradient(135deg,#fff3e0,#fff);border:3px solid #e65100;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF - PISTE</div>
                    <div style="background:#ffcc80;border:2px solid #e65100;border-radius:10px;padding:20px;">
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏁 DÉPART</div>
                                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#d84315,#d84315 20px,#ff7043 20px,#ff7043 40px);border-radius:5px;"></div>
                                <div style="background:#c62828;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏆 ARRIVÉE</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏁 DÉPART</div>
                                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#1565c0,#1565c0 20px,#42a5f5 20px,#42a5f5 40px);border-radius:5px;"></div>
                                <div style="background:#c62828;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏆 ARRIVÉE</div>
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
                            <div style="background:#4caf50;color:white;padding:10px 20px;border-radius:8px;font-weight:bold;">🏃 ÉLAN</div>
                            <div style="flex:1;height:35px;background:linear-gradient(90deg,#ef6c00,#ff9800,#ffb74d);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">━━━➤━━━</div>
                            <div style="background:#c62828;color:white;padding:10px 15px;border-radius:8px;font-weight:bold;">📍 APPEL</div>
                            <div style="background:#ffeb3b;color:#333;padding:10px 25px;border-radius:10px;font-weight:bold;">${aps.includes('longueur') ? '🏖️ FOSSE' : '📏 TAPIS'}</div>
                        </div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Volleyball') {
                schema1 = `<div style="background:linear-gradient(135deg,#e3f2fd,#fff);border:3px solid #1565c0;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:15px;font-size:14px;">📐 TERRAIN VOLLEYBALL</div>
                    <div style="background:#90caf9;border:2px solid #1565c0;border-radius:10px;padding:25px;position:relative;min-height:200px;">
                        <div style="position:absolute;top:50%;left:0;right:0;height:4px;background:white;"></div>
                        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:3px 10px;border-radius:5px;font-size:11px;font-weight:bold;">FILET</div>
                        <div style="position:absolute;top:15%;left:15%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">1</div>
                        <div style="position:absolute;top:15%;left:40%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">2</div>
                        <div style="position:absolute;top:30%;left:28%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">3</div>
                        <div style="position:absolute;top:60%;right:15%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">1</div>
                        <div style="position:absolute;top:60%;right:40%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">2</div>
                        <div style="position:absolute;top:75%;right:28%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;">3</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else if (aps === 'Gymnastique') {
                schema1 = `<div style="background:linear-gradient(135deg,#fce4ec,#fff);border:3px solid #c2185b;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#880e4f;margin-bottom:15px;font-size:14px;">📐 PRATICABLE</div>
                    <div style="background:#f8bbd9;border:2px solid #c2185b;border-radius:10px;padding:25px;position:relative;min-height:150px;">
                        <div style="position:absolute;top:10%;left:8%;background:#4caf50;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🚩 DÉPART</div>
                        <div style="position:absolute;top:35%;left:28%;font-size:35px;">🤸</div>
                        <div style="position:absolute;top:25%;left:48%;font-size:35px;">🤸‍♀️</div>
                        <div style="position:absolute;top:45%;left:68%;font-size:35px;">🤸</div>
                        <div style="position:absolute;bottom:10%;right:8%;background:#c62828;color:white;padding:8px 15px;border-radius:8px;font-weight:bold;">🏁 FIN</div>
                    </div>
                </div>`;
                schema2 = schema1;
            } else {
                schema1 = `<div style="background:linear-gradient(135deg,#e0f7fa,#fff);border:3px solid #00838f;border-radius:15px;padding:20px;margin:15px 0;">
                    <div style="text-align:center;font-weight:bold;color:#006064;margin-bottom:15px;font-size:14px;">📐 DISPOSITIF</div>
                    <div style="background:#80deea;border:2px solid #00838f;border-radius:10px;padding:30px;text-align:center;">
                        <p style="font-size:14px;color:#006064;margin:0;">Organisation adaptée à ${aps}</p>
                    </div>
                </div>`;
                schema2 = schema1;
            }

            // HTML DISPLAY (site) - avec schémas + But/Déroulement/Consignes/Variantes pour SIT 1 et 2
            htmlDisplay = `
            <div style="font-family:'Segoe UI',sans-serif;max-width:900px;margin:0 auto;">
                <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:25px;border-radius:15px;margin-bottom:25px;">
                    <h2 style="margin:0 0 10px 0;font-size:1.5rem;">📋 Fiche de séance - ${aps}</h2>
                    <p style="margin:0;opacity:0.9;">Niveau: ${niveau} | Séance N°${numeroSeance || 1} | ${groupeAPS}</p>
                </div>
                
                <div style="background:#ffebee;border-left:5px solid #c1272d;padding:20px;border-radius:0 12px 12px 0;margin-bottom:25px;">
                    <strong style="color:#c1272d;font-size:1.1rem;">🎯 OBJECTIF DE LA SÉANCE</strong>
                    <p style="margin:10px 0 0 0;font-size:1.05rem;">${objectif}</p>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;margin-bottom:25px;">
                    <h3 style="color:#c1272d;border-bottom:3px solid #c1272d;padding-bottom:12px;margin-bottom:20px;">📌 PARTIE INTRODUCTIVE (15 min)</h3>
                    <p><strong>• Prise en main (3'):</strong> Appel, tenues, présentation objectif, consignes sécurité.</p>
                    <p><strong>• Échauffement général (7'):</strong> Course, mobilisation articulaire, gammes.</p>
                    <p><strong>• Échauffement spécifique (5'):</strong> ${echaufSpec}</p>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;margin-bottom:25px;">
                    <h3 style="color:#006233;border-bottom:3px solid #006233;padding-bottom:12px;margin-bottom:20px;">⚡ PARTIE FONDAMENTALE (35 min)</h3>
                    
                    <div style="background:#f5f5f5;border-radius:12px;padding:20px;margin-bottom:25px;">
                        <h4 style="color:#006233;margin:0 0 15px 0;font-size:1.1rem;">◆ SITUATION 1 : ${s1Titre} (12 min)</h4>
                        ${schema1}
                        <p><strong style="color:#006233;">🎯 But :</strong> ${s1But}</p>
                        <p><strong style="color:#006233;">📍 Organisation :</strong> ${s1Orga}</p>
                        <p><strong style="color:#006233;">📋 Déroulement :</strong> ${s1Deroul}</p>
                        <p><strong style="color:#006233;">📢 Consignes :</strong></p>
                        <div style="margin-left:15px;">${s1Consignes.replace(/\n/g, '<br>')}</div>
                        <p><strong style="color:#006233;">🔄 Variantes :</strong></p>
                        <div style="margin-left:15px;">${s1Variantes.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div style="background:#f5f5f5;border-radius:12px;padding:20px;margin-bottom:25px;">
                        <h4 style="color:#006233;margin:0 0 15px 0;font-size:1.1rem;">◆ SITUATION 2 : ${s2Titre} (13 min)</h4>
                        ${schema2}
                        <p><strong style="color:#006233;">🎯 But :</strong> ${s2But}</p>
                        <p><strong style="color:#006233;">📍 Organisation :</strong> ${s2Orga}</p>
                        <p><strong style="color:#006233;">📋 Déroulement :</strong> ${s2Deroul}</p>
                        <p><strong style="color:#006233;">📢 Consignes :</strong></p>
                        <div style="margin-left:15px;">${s2Consignes.replace(/\n/g, '<br>')}</div>
                        <p><strong style="color:#006233;">🔄 Variantes :</strong></p>
                        <div style="margin-left:15px;">${s2Variantes.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div style="background:#fff3e0;border-radius:12px;padding:15px;border-left:5px solid #ff9800;">
                        <h4 style="color:#e65100;margin:0 0 8px 0;">◆ SITUATION DE RÉFÉRENCE (10 min)</h4>
                        <p style="margin:0;"><strong>Format :</strong> ${sitRef}</p>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                    <div style="background:#e3f2fd;border-radius:12px;padding:20px;">
                        <h4 style="color:#1565c0;margin:0 0 12px 0;">✅ Critères de réalisation</h4>
                        <div>${critReal.replace(/\n/g, '<br>').replace(/•/g, '✓')}</div>
                    </div>
                    <div style="background:#e8f5e9;border-radius:12px;padding:20px;">
                        <h4 style="color:#2e7d32;margin:0 0 12px 0;">🎯 Critères de réussite</h4>
                        <div>${critReuss.replace(/\n/g, '<br>').replace(/•/g, '✓')}</div>
                    </div>
                </div>

                <div style="background:#fff;border:2px solid #e0e0e0;border-radius:15px;padding:25px;">
                    <h3 style="color:#c1272d;border-bottom:3px solid #c1272d;padding-bottom:12px;margin-bottom:20px;">🧘 PARTIE FINALE (10 min)</h3>
                    <p><strong>• Retour au calme (5'):</strong> Marche, respiration, étirements.</p>
                    <p><strong>• Bilan (5'):</strong> Questions, feedback, rangement matériel.</p>
                </div>
            </div>`;

            // HTML WORD/PDF - Phases intro/finale RÉSUMÉES, fondamentale DÉTAILLÉE avec critères
            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm}
body{font-family:Calibri,sans-serif;font-size:7pt;line-height:1.1}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px 3px;vertical-align:top}
.hd td{border:none;font-size:7pt;padding:1px 3px}
.tt{text-align:center;font-size:10pt;font-weight:bold;background:linear-gradient(135deg,#c1272d,#006233);color:#fff;padding:3px}
.lb{background:#f0f0f0;font-weight:bold;font-size:6pt;text-align:center}
.ob{background:#c1272d;color:#fff;font-weight:bold;font-size:6.5pt}
.mh{background:#006233;color:#fff;font-weight:bold;text-align:center;font-size:6.5pt}
.pt{font-weight:bold;text-align:center;background:#f5f5f5;font-size:7pt}
.ct{font-size:6pt;line-height:1.1}
.st{font-weight:bold;color:#006233}
</style></head>
<body>
<table class="hd"><tr><td style="width:33%"><b>Prof:</b> ${nomProf||'________'}</td><td style="text-align:center"><b>Étab:</b> ${etablissement||'________'}</td><td style="text-align:right"><b>Année:</b> ${anneeScolaire||'2024-2025'}</td></tr></table>
<table><tr><td class="tt">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr></table>
<table>
<tr><td class="lb" style="width:5%">Groupe</td><td style="width:11%;font-size:6pt">${groupeAPS}</td><td class="lb" style="width:3%">APS</td><td style="width:9%;font-size:6pt">${aps}</td><td class="lb" style="width:4%">Niveau</td><td style="width:4%;font-size:6pt">${niveau}</td><td class="lb" style="width:4%">Séance</td><td style="width:3%;font-size:6pt">${numeroSeance||1}</td></tr>
<tr><td class="lb">OTI</td><td colspan="7" style="font-size:5.5pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td colspan="7" style="font-size:5.5pt">${otc}</td></tr>
<tr><td class="ob">OBJECTIF</td><td colspan="7" style="background:#ffebee;font-weight:bold;font-size:7pt">${objectif}</td></tr>
</table>
<table>
<tr><th class="mh" style="width:4%">PARTIES</th><th class="mh" style="width:3%">DUR</th><th class="mh" style="width:55%">CONTENU / SITUATIONS D'APPRENTISSAGE</th><th class="mh" style="width:6%">BUT</th><th class="mh" style="width:16%">C. RÉALISATION</th><th class="mh" style="width:16%">C. RÉUSSITE</th></tr>
<tr>
<td class="pt">INTRO</td><td style="text-align:center;font-weight:bold">15'</td>
<td class="ct">Prise en main, échauffement général et spécifique (${echaufSpec.substring(0, 100)}...)</td>
<td class="ct">Préparation</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de préparation</td>
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
<td class="ct">Retour au calme, étirements, bilan et rangement.</td>
<td class="ct">Récupération</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de récupération</td>
</tr>
</table>
<p style="text-align:center;font-size:5pt;color:#666;margin-top:2px">Conforme aux OP ${isCollege ? '2009' : '2007'} | MEN Maroc</p>
</body></html>`;
            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivEleves = niveauEleves || 'moyen';
            const nivTxt = { 'debutant': 'Débutant', 'moyen': 'Moyen', 'avance': 'Avancé', 'elite': 'Élite' }[nivEleves];
            const objectifs = getObjectifsParNiveau(aps, nivEleves, nb);
            
            let rows = '';
            for (let i = 0; i < nb; i++) {
                let seq = i === 0 ? 'Éval. diagnostique' : i === 1 ? 'Acquisition' : i === nb - 1 ? 'Éval. terminale' : i === nb - 2 ? 'Intégration' : i < nb/2 ? 'Apprentissage' : 'Consolidation';
                rows += `<tr><td style="text-align:center;background:#f5f5f5">${seq}</td><td style="text-align:center;font-weight:bold">${i + 1}</td><td style="font-size:8pt">${objectifs[i]}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Projet ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:9pt}
table{width:100%;border-collapse:collapse;margin-bottom:6px}
th,td{border:1pt solid #000;padding:4px 6px;vertical-align:top}
.ti{font-size:20pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#c1272d}
.hd{background:#f0f0f0;font-weight:bold;text-align:center;font-size:8pt}
.sc{background:linear-gradient(135deg,#c1272d,#006233);color:#fff;font-weight:bold;text-align:center}
.lb{background:#f0f0f0;font-weight:bold;font-size:8pt}
.niv{background:#e8f5e9;font-weight:bold;color:#006233}
</style></head>
<body>
<table style="border:none"><tr><td class="ti" style="border:none">Projet pédagogique de cycle (${niveau})</td></tr></table>
<table>
<tr><td class="hd">MODULE</td><td class="hd">GROUPE</td><td class="hd">APS</td><td class="hd">NIVEAU</td><td class="hd">NIV. ÉLÈVES</td><td class="hd">SÉANCES</td></tr>
<tr><td style="text-align:center;font-size:8pt">Adaptation réponses motrices</td><td style="text-align:center">${groupeAPS}</td><td style="text-align:center;font-weight:bold">${aps}</td><td style="text-align:center">${niveau}</td><td class="niv" style="text-align:center">${nivTxt}</td><td style="text-align:center;font-weight:bold">${nb}</td></tr>
</table>
<table>
<tr><td class="lb" style="width:18%">OTI</td><td style="font-size:8pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td style="font-size:8pt">${otc}</td></tr>
<tr><td class="lb">Compétences visées</td><td style="font-size:8pt">• Gestion des ressources individuelles • Application des lois de sécurité et compétition</td></tr>
</table>
<table>
<tr><td class="lb" rowspan="2" style="width:16%;vertical-align:middle;text-align:center">Acquisitions</td><td class="hd">Procédurales</td><td class="hd">Conceptuelles</td><td class="hd">Comportementales</td></tr>
<tr><td style="font-size:8pt">• Maîtriser les gestes • Enchaîner les actions</td><td style="font-size:8pt">• Notions réglementaires • Sécurité</td><td style="font-size:8pt">• Assiduité • Engagement • Respect</td></tr>
</table>
<table>
<tr><td class="sc" colspan="3">PROGRESSION PÉDAGOGIQUE</td></tr>
<tr><th class="hd" style="width:16%">Séquences</th><th class="hd" style="width:7%">N°</th><th class="hd">Objectifs opérationnels</th></tr>
${rows}
</table>
<p style="text-align:right;font-size:8pt;color:#666;margin-top:5px"><b>Prof:</b> ${nomProf||'____'} | <b>Étab:</b> ${etablissement||'____'}</p>
</body></html>`;
            htmlDisplay = html;
            filename = `Projet_${aps.replace(/\s+/g,'_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'observation" : "Grille d'évaluation";
            
            let headMain = '', headSub = '', emptyCols = '';
            if (isObs) {
                critObs.criteres.forEach(c => {
                    headMain += `<th colspan="${c.sous.length}" style="background:#006233;color:#fff;font-size:7pt">${c.nom}</th>`;
                    c.sous.forEach(s => { headSub += `<td style="background:#f0f0f0;font-size:6pt;text-align:center">${s}</td>`; emptyCols += '<td style="width:4%"></td>'; });
                });
                if (critObs.perf) { headMain += '<th rowspan="2" style="background:#006233;color:#fff;font-size:7pt;width:7%">Perf</th>'; emptyCols += '<td></td>'; }
                else if (critObs.obs) { headMain += '<th rowspan="2" style="background:#006233;color:#fff;font-size:7pt;width:7%">Obs</th>'; emptyCols += '<td></td>'; }
                else if (critObs.note) { headMain += '<th rowspan="2" style="background:#006233;color:#fff;font-size:7pt;width:7%">Note</th>'; emptyCols += '<td></td>'; }
            } else {
                critEval.forEach(c => { headMain += `<th style="background:#006233;color:#fff;font-size:7pt;width:12%">${c.nom}<br><small>/${c.pts}</small></th>`; emptyCols += '<td></td>'; });
                headMain += '<th style="background:#c1272d;color:#fff;font-size:7pt;width:8%">Note<br><small>/20</small></th>';
                emptyCols += '<td></td>';
            }

            let rows = '';
            for (let i = 1; i <= 40; i++) rows += `<tr style="height:14px"><td style="text-align:center;font-size:8pt">${i}</td><td></td><td></td>${emptyCols}</tr>`;

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${titre} ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px}
.ti{font-size:18pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;color:#c1272d}
</style></head>
<body>
<p class="ti">${titre} (${aps})</p>
<table style="border:none;margin-bottom:5px"><tr><td style="border:none"><b>Classe:</b> ${classe||'________'}</td><td style="border:none;text-align:right"><b>${nomProf||'Prof'}</b> – ${etablissement||'Établissement'}</td></tr></table>
<table>
<tr><th rowspan="2" style="background:#c1272d;color:#fff;width:4%;font-size:7pt">N°</th><th rowspan="2" colspan="2" style="background:#c1272d;color:#fff;width:18%;font-size:7pt">Nom et Prénom</th>${headMain}</tr>
${isObs ? `<tr>${headSub}</tr>` : ''}
${rows}
</table>
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
