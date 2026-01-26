module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { aps, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance } = req.body;
        if (!aps || !objectif || !niveau) return res.status(400).json({ success: false, error: 'APS, objectif et niveau requis' });

        // ==================== DONNÉES OFFICIELLES ====================
        
        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const opReference = isCollege ? 'Orientations Pédagogiques 2009' : 'Orientations Pédagogiques 2007';

        // OTI officiels
        const OTI = {
            '1AC': "L'élève de la 1ère année doit acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
            '2AC': "L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées.",
            '3AC': "L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adaptation aux différentes situations en fonction de ses exigences organisationnelles et réglementaires.",
            'TC': "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations.",
            '1AB': "L'élève de la 1ère année Bac doit pouvoir confronter et analyser différentes situations motrices et améliorer ses réalisations.",
            '2AB': "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer dans la réalisation de projets."
        };

        // OTC Sports Collectifs
        const OTC_SPORTS_COLLECTIFS = {
            '1AC': "Conserver la balle et participer au jeu collectif pour gagner la rencontre.",
            '2AC': "Gagner la rencontre par des déplacements variés pour une progression avec la balle.",
            '3AC': "Participer au projet collectif basé sur le passage rapide attaque-défense.",
            'TC': "Utiliser des moyens adaptés pour conserver la balle jusqu'à la zone adverse.",
            '1AB': "Mettre en œuvre des choix tactiques collectifs avec vitesse d'exécution.",
            '2AB': "Mettre en place une attaque basée sur la maîtrise des rôles et l'occupation de l'espace."
        };

        // OTC Athlétisme
        const OTC_ATHLETISME = {
            '1AC': "Organiser les mouvements du corps et adapter les efforts pour des performances correctes.",
            '2AC': "Consolider les habiletés et améliorer un niveau de performance.",
            '3AC': "Gérer l'effort physique pour réaliser des prestations correctes et efficaces.",
            'TC': "Maîtriser l'organisation du corps et la gestion de l'effort.",
            '1AB': "Augmenter l'efficacité de la performance par la maîtrise du geste.",
            '2AB': "Utiliser des moyens stratégiques pour mobiliser un niveau de performance optimal."
        };

        // OTC Gymnastique
        const OTC_GYMNASTIQUE = {
            '1AC': "Réaliser un enchaînement simple devant la classe. Composition : 3A 2B 0C",
            '2AC': "Présenter un enchaînement varié en éléments et rythme. Composition : 3A 2B 1C",
            '3AC': "Concevoir et réaliser un enchaînement individuel. Composition : 2A 4B 1C",
            'TC': "Présenter un enchaînement gymnique devant la classe. Composition : 2A 3B 2C",
            '1AB': "Organiser et réaliser un enchaînement gymnique. Composition : 2B 3C 2D",
            '2AB': "Concevoir, réaliser et juger un enchaînement varié. Composition : 2C 3D 2E"
        };

        // OTC Sports de Renvoi
        const OTC_SPORTS_RENVOI = {
            '1AC': "Déplacement et placement adéquats pour défendre et renvoyer.",
            '2AC': "Renvoi indirect de la balle vers le camp adverse.",
            '3AC': "Défense de terrain et orientation de la balle vers la zone avant.",
            'TC': "Organisation collective pour défendre et renvoyer (2-3 touches).",
            '1AB': "Récupérer et renvoyer dans la limite de 3 touches.",
            '2AB': "Récupérer, conserver et marquer des points."
        };

        // Situations de référence
        const SITUATIONS_REFERENCE = {
            'Handball': { description: "Match 7 contre 7 avec règles officielles adaptées.", format: "7c7" },
            'Football': { description: "Match 5 contre 5 sur terrain réduit.", format: "5c5" },
            'Basketball': { description: "Match 5 contre 5 avec règles officielles.", format: "5c5" },
            'Volleyball': { description: "Match 6 contre 6 avec règles adaptées.", format: "6c6" },
            'Tennis de table': { description: "Match simple (sets de 11 points).", format: "Simple" },
            'Badminton': { description: "Match simple (sets de 21 points).", format: "Simple" },
            'Course de vitesse': { 
                description: isCollege ? "Courir 80m le plus vite possible." : "Courir 80m (G) / 60m (F) le plus vite possible.", 
                format: isCollege ? "80m" : "80m/60m" 
            },
            'Course de relais': { description: "Relais 4x60m avec transmission dans la zone.", format: "4x60m" },
            'Saut en longueur': { description: "Courir, sauter le plus loin possible, mesurer.", format: "3 essais" },
            'Saut en hauteur': { description: "Courir, sauter le plus haut possible, mesurer.", format: "3 essais/hauteur" },
            'Lancer de poids': { description: "Lancer le poids (4kg G / 3kg F) le plus loin possible.", format: "3 essais" },
            'Course de durée': { description: "Courir 1000m (G) / 600m (F) en gérant l'effort.", format: "1000m/600m" },
            'Gymnastique': { description: "Présenter un enchaînement devant la classe.", format: "Enchaînement" }
        };

        // Déterminer le groupe APS et type
        let groupeAPS, otc, situationRef, typeActivite;

        if (['Handball', 'Football', 'Basketball'].includes(aps)) {
            groupeAPS = 'Sports collectifs';
            otc = OTC_SPORTS_COLLECTIFS[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_collectif';
        } else if (aps === 'Volleyball') {
            groupeAPS = 'Sports collectifs (renvoi)';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_collectif';
        } else if (['Tennis de table', 'Badminton'].includes(aps)) {
            groupeAPS = 'Sports de renvoi';
            otc = OTC_SPORTS_RENVOI[niveau];
            situationRef = SITUATIONS_REFERENCE[aps];
            typeActivite = 'sport_renvoi';
        } else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) {
            groupeAPS = 'Athlétisme';
            otc = OTC_ATHLETISME[niveau];
            situationRef = SITUATIONS_REFERENCE[aps] || SITUATIONS_REFERENCE['Course de vitesse'];
            typeActivite = 'athletisme';
        } else if (aps === 'Gymnastique') {
            groupeAPS = 'Gymnastique';
            otc = OTC_GYMNASTIQUE[niveau];
            situationRef = SITUATIONS_REFERENCE['Gymnastique'];
            typeActivite = 'gymnastique';
        } else {
            groupeAPS = 'Activité physique';
            otc = "Développer les capacités motrices.";
            situationRef = { description: 'Situation adaptée', format: 'Adapté' };
            typeActivite = 'autre';
        }

        const oti = OTI[niveau];

        // ==================== SCHÉMAS HTML COLORÉS ====================
        
        // Générer des schémas HTML selon le type d'activité
        let schema1HTML = '';
        let schema2HTML = '';
        let schemaRefHTML = '';

        if (typeActivite === 'sport_collectif') {
            schema1HTML = `
<div style="background:linear-gradient(135deg,#e8f5e9,#fff);border:3px solid #2e7d32;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#1b5e20;margin-bottom:15px;font-size:16px;">📐 DISPOSITIF - Terrain ${aps} (20m × 15m)</div>
    <div style="background:#a5d6a7;border:2px solid #2e7d32;border-radius:10px;padding:20px;position:relative;min-height:200px;">
        <!-- Ligne médiane -->
        <div style="position:absolute;top:0;bottom:0;left:50%;width:2px;background:#1b5e20;"></div>
        <!-- Zone gauche -->
        <div style="position:absolute;left:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:50px;height:50px;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 8px rgba(0,0,0,0.2);">🥅</div>
        <!-- Attaquants -->
        <div style="position:absolute;left:25%;top:30%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">A1</div>
        <div style="position:absolute;left:25%;top:60%;background:#1976d2;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">A2</div>
        <div style="position:absolute;left:40%;top:45%;background:#ff9800;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 3px 6px rgba(0,0,0,0.3);">⚽</div>
        <!-- Flèches -->
        <div style="position:absolute;left:35%;top:45%;color:#c62828;font-size:24px;font-weight:bold;">➡️➡️➡️</div>
        <!-- Défenseurs -->
        <div style="position:absolute;right:25%;top:30%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">D1</div>
        <div style="position:absolute;right:25%;top:60%;background:#c62828;color:white;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 3px 6px rgba(0,0,0,0.3);">D2</div>
        <!-- Zone droite -->
        <div style="position:absolute;right:5%;top:50%;transform:translateY(-50%);background:#ffeb3b;border:2px solid #f57f17;border-radius:50%;width:50px;height:50px;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 8px rgba(0,0,0,0.2);">🥅</div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔵 Attaquants</span>
        <span style="background:#c62828;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔴 Défenseurs</span>
        <span style="background:#ff9800;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">⚽ Ballon</span>
        <span style="background:#ffeb3b;color:#333;padding:5px 15px;border-radius:20px;font-size:14px;">🥅 But</span>
    </div>
</div>`;

            schema2HTML = `
<div style="background:linear-gradient(135deg,#e3f2fd,#fff);border:3px solid #1565c0;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#0d47a1;margin-bottom:15px;font-size:16px;">📐 JEU RÉDUIT - Situation de match (25m × 20m)</div>
    <div style="background:#90caf9;border:2px solid #1565c0;border-radius:10px;padding:20px;position:relative;min-height:220px;">
        <!-- But gauche -->
        <div style="position:absolute;left:2%;top:40%;background:#4caf50;color:white;padding:10px 5px;border-radius:5px;font-size:12px;writing-mode:vertical-rl;">BUT</div>
        <!-- Équipe bleue -->
        <div style="position:absolute;left:15%;top:20%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">1</div>
        <div style="position:absolute;left:15%;top:50%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">2</div>
        <div style="position:absolute;left:15%;top:75%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">3</div>
        <div style="position:absolute;left:35%;top:35%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">4</div>
        <div style="position:absolute;left:35%;top:60%;background:#1976d2;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">5</div>
        <!-- Ballon au centre -->
        <div style="position:absolute;left:48%;top:45%;background:#ff9800;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:16px;">⚽</div>
        <!-- Équipe rouge -->
        <div style="position:absolute;right:35%;top:35%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">1</div>
        <div style="position:absolute;right:35%;top:60%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">2</div>
        <div style="position:absolute;right:15%;top:20%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">3</div>
        <div style="position:absolute;right:15%;top:50%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">4</div>
        <div style="position:absolute;right:15%;top:75%;background:#c62828;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;">5</div>
        <!-- But droit -->
        <div style="position:absolute;right:2%;top:40%;background:#4caf50;color:white;padding:10px 5px;border-radius:5px;font-size:12px;writing-mode:vertical-rl;">BUT</div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔵 Équipe A</span>
        <span style="background:#c62828;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔴 Équipe B</span>
    </div>
</div>`;
        } else if (typeActivite === 'athletisme') {
            if (aps.includes('Course')) {
                schema1HTML = `
<div style="background:linear-gradient(135deg,#fff3e0,#fff);border:3px solid #e65100;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#bf360c;margin-bottom:15px;font-size:16px;">📐 PISTE D'ATHLÉTISME - ${aps}</div>
    <div style="background:#ffcc80;border:2px solid #e65100;border-radius:10px;padding:20px;position:relative;min-height:150px;">
        <!-- Couloirs -->
        <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">DÉPART</div>
                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#d84315,#d84315 20px,#ff7043 20px,#ff7043 40px);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">COULOIR 1 ━━━━━━━➡️</div>
                <div style="background:#f44336;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">ARRIVÉE</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">DÉPART</div>
                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#1565c0,#1565c0 20px,#42a5f5 20px,#42a5f5 40px);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">COULOIR 2 ━━━━━━━➡️</div>
                <div style="background:#f44336;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">ARRIVÉE</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="background:#4caf50;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">DÉPART</div>
                <div style="flex:1;height:30px;background:repeating-linear-gradient(90deg,#7b1fa2,#7b1fa2 20px,#ba68c8 20px,#ba68c8 40px);border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">COULOIR 3 ━━━━━━━➡️</div>
                <div style="background:#f44336;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">ARRIVÉE</div>
            </div>
        </div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#4caf50;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🟢 Départ</span>
        <span style="background:#f44336;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔴 Arrivée</span>
        <span style="background:#ff9800;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">➡️ Direction</span>
    </div>
</div>`;
            } else if (aps.includes('Saut')) {
                schema1HTML = `
<div style="background:linear-gradient(135deg,#f3e5f5,#fff);border:3px solid #7b1fa2;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#4a148c;margin-bottom:15px;font-size:16px;">📐 AIRE DE ${aps.toUpperCase()}</div>
    <div style="background:#ce93d8;border:2px solid #7b1fa2;border-radius:10px;padding:20px;position:relative;min-height:120px;">
        <div style="display:flex;align-items:center;gap:10px;">
            <div style="background:#4caf50;color:white;padding:10px 20px;border-radius:5px;font-weight:bold;font-size:14px;">🏃 ÉLAN<br>(15-20m)</div>
            <div style="flex:1;height:40px;background:linear-gradient(90deg,#ef6c00,#ff9800,#ffb74d);border-radius:5px;display:flex;align-items:center;justify-content:center;">
                <span style="color:white;font-weight:bold;font-size:18px;">━━━━━➡️━━━━━➡️━━━━━</span>
            </div>
            <div style="background:#f44336;color:white;padding:10px;border-radius:5px;font-weight:bold;text-align:center;font-size:14px;">📍<br>APPEL</div>
            <div style="background:#ffeb3b;color:#333;padding:10px 30px;border-radius:10px;font-weight:bold;text-align:center;font-size:14px;">${aps.includes('longueur') ? '🏖️ FOSSE<br>SABLE' : '📏 TAPIS<br>RÉCEPTION'}</div>
        </div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#4caf50;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🏃 Course d'élan</span>
        <span style="background:#f44336;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">📍 Zone d'appel</span>
        <span style="background:#ffeb3b;color:#333;padding:5px 15px;border-radius:20px;font-size:14px;">🎯 Réception</span>
    </div>
</div>`;
            } else {
                schema1HTML = `
<div style="background:linear-gradient(135deg,#ffebee,#fff);border:3px solid #c62828;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#b71c1c;margin-bottom:15px;font-size:16px;">📐 AIRE DE ${aps.toUpperCase()}</div>
    <div style="background:#ef9a9a;border:2px solid #c62828;border-radius:10px;padding:20px;display:flex;align-items:center;justify-content:center;gap:30px;min-height:150px;">
        <div style="background:#1976d2;color:white;border-radius:50%;width:80px;height:80px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:12px;font-weight:bold;box-shadow:0 4px 8px rgba(0,0,0,0.3);">
            <span style="font-size:24px;">🏋️</span>
            CERCLE
        </div>
        <div style="color:#c62828;font-size:40px;">➡️➡️➡️</div>
        <div style="background:#4caf50;color:white;padding:20px 40px;border-radius:10px;font-weight:bold;text-align:center;box-shadow:0 4px 8px rgba(0,0,0,0.3);">
            <span style="font-size:24px;">🎯</span><br>
            ZONE DE<br>CHUTE
        </div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#1976d2;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔵 Cercle de lancer</span>
        <span style="background:#4caf50;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🟢 Zone de chute</span>
    </div>
</div>`;
            }
            schema2HTML = schema1HTML.replace('SITUATION 1', 'SITUATION 2');
        } else if (typeActivite === 'gymnastique') {
            schema1HTML = `
<div style="background:linear-gradient(135deg,#fce4ec,#fff);border:3px solid #c2185b;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#880e4f;margin-bottom:15px;font-size:16px;">📐 PRATICABLE GYMNASTIQUE (12m × 12m)</div>
    <div style="background:#f8bbd9;border:2px solid #c2185b;border-radius:10px;padding:20px;position:relative;min-height:200px;">
        <!-- Diagonale -->
        <div style="position:absolute;top:10%;left:5%;background:#4caf50;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">DÉPART</div>
        <div style="position:absolute;top:25%;left:15%;font-size:40px;">🤸</div>
        <div style="position:absolute;top:40%;left:35%;font-size:30px;color:#c2185b;">↘️</div>
        <div style="position:absolute;top:50%;left:45%;font-size:40px;">🤸‍♀️</div>
        <div style="position:absolute;top:65%;left:65%;font-size:30px;color:#c2185b;">↘️</div>
        <div style="position:absolute;top:75%;left:75%;font-size:40px;">🤸</div>
        <div style="position:absolute;bottom:10%;right:5%;background:#f44336;color:white;padding:8px 15px;border-radius:5px;font-weight:bold;">FIN</div>
        <!-- Pareur -->
        <div style="position:absolute;right:15%;top:30%;background:#ff9800;color:white;padding:10px;border-radius:50%;font-size:12px;text-align:center;">👤<br>Pareur</div>
    </div>
    <div style="display:flex;justify-content:center;gap:20px;margin-top:15px;flex-wrap:wrap;">
        <span style="background:#4caf50;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🟢 Départ</span>
        <span style="background:#f44336;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">🔴 Fin</span>
        <span style="background:#ff9800;color:white;padding:5px 15px;border-radius:20px;font-size:14px;">👤 Pareur</span>
    </div>
</div>`;
            schema2HTML = schema1HTML;
        } else {
            schema1HTML = `
<div style="background:linear-gradient(135deg,#e0f7fa,#fff);border:3px solid #00838f;border-radius:15px;padding:20px;margin:15px 0;font-family:Arial,sans-serif;">
    <div style="text-align:center;font-weight:bold;color:#006064;margin-bottom:15px;font-size:16px;">📐 DISPOSITIF - ${aps}</div>
    <div style="background:#80deea;border:2px solid #00838f;border-radius:10px;padding:20px;text-align:center;min-height:150px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:18px;color:#00838f;">Schéma adapté à l'activité ${aps}</span>
    </div>
</div>`;
            schema2HTML = schema1HTML;
        }

        // ==================== PROMPT AMÉLIORÉ ====================

        const prompt = `Tu es un expert en EPS au Maroc. Génère une fiche de séance pour ${aps} niveau ${niveau}.

**INFORMATIONS:**
- APS: ${aps}
- Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
- Objectif: ${objectif}
- OTI: ${oti}
- OTC: ${otc}
- Situation de référence: ${situationRef.description}

**IMPORTANT - TYPE D'ACTIVITÉ: ${typeActivite}**
${typeActivite === 'athletisme' ? '⚠️ PAS de matchs, défenseurs ou attaquants. Utiliser: coureur, sauteur, lanceur, athlète.' : ''}
${typeActivite === 'gymnastique' ? '⚠️ PAS de matchs ou opposition. Utiliser: gymnaste, pareur, juge.' : ''}

**FORMAT DE SORTIE (HTML):**

<h2>📌 PARTIE INTRODUCTIVE (15 min)</h2>

<h3>🔹 Prise en main (3 min)</h3>
<p>Rassemblement, appel, présentation objectif, consignes sécurité.</p>

<h3>🔹 Échauffement général (7 min)</h3>
<p>Course légère, mobilisation articulaire progressive, gammes athlétiques.</p>

<h3>🔹 Échauffement spécifique (5 min)</h3>
<p>[3-4 exercices spécifiques à ${aps}]</p>

<hr>

<h2>⚡ PARTIE FONDAMENTALE (35 min)</h2>

<div style="background:#e8f5e9;border-left:4px solid #2e7d32;padding:15px;margin:15px 0;border-radius:8px;">
<p><strong>🎯 OBJECTIF:</strong> ${objectif}</p>
<p><strong>⚡ BUT:</strong> [Formule le but unique de cette phase en UNE phrase]</p>
</div>

<h3>🎯 SITUATION 1: [Titre] (12 min)</h3>

[LE SCHÉMA HTML COLORÉ SERA INSÉRÉ ICI PAR LE SYSTÈME]

<p><strong>📋 Déroulement:</strong> [Description détaillée en 5-6 phrases]</p>

<p><strong>📢 Consignes:</strong></p>
<ol>
<li>[Consigne 1]</li>
<li>[Consigne 2]</li>
<li>[Consigne 3]</li>
</ol>

<p><strong>🔄 Variantes:</strong></p>
<ul>
<li><strong>Simplifier:</strong> [modification]</li>
<li><strong>Complexifier:</strong> [modification]</li>
</ul>

<p><strong>🔵 Critères de réalisation:</strong></p>
<ul>
<li>[Geste technique 1]</li>
<li>[Geste technique 2]</li>
</ul>

<p><strong>🟢 Critères de réussite:</strong></p>
<ul>
<li>[Résultat quantifié 1]</li>
<li>[Résultat quantifié 2]</li>
</ul>

<h3>🎯 SITUATION 2: [Titre] (13 min)</h3>
[MÊME STRUCTURE - situation plus globale]

<h3>🏆 SITUATION DE RÉFÉRENCE (10 min)</h3>
<p><strong>Format:</strong> ${situationRef.format}</p>
<p><strong>Description:</strong> ${situationRef.description}</p>
<p>[Organisation et règles]</p>

<hr>

<h2>🧘 PARTIE FINALE (10 min)</h2>

<h3>🔹 Retour au calme (5 min)</h3>
<p>Marche, respiration, étirements des groupes musculaires sollicités.</p>

<h3>🔹 Bilan (5 min)</h3>
<p>Questions aux élèves, feedback, rangement matériel.</p>`;

        // Appel API Groq
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 6000,
                temperature: 0.7
            })
        });

        if (!groqResponse.ok) {
            const err = await groqResponse.json();
            throw new Error(err.error?.message || 'Erreur Groq API');
        }

        const groqData = await groqResponse.json();
        let ficheDetaillee = groqData.choices[0].message.content;

        // Insérer les schémas HTML colorés
        ficheDetaillee = ficheDetaillee.replace(
            /<h3>🎯 SITUATION 1:/,
            schema1HTML + '<h3>🎯 SITUATION 1:'
        );
        ficheDetaillee = ficheDetaillee.replace(
            /<h3>🎯 SITUATION 2:/,
            schema2HTML + '<h3>🎯 SITUATION 2:'
        );

        // ==================== HTML WORD ====================
        
        let contenuIntro, contenuFonda, contenuFinale;
        
        if (typeActivite === 'athletisme') {
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, objectif, sécurité.<br><br>
<b>• Échauffement général (7'):</b> Course légère, mobilisation articulaire, gammes athlétiques.<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices techniques adaptés à ${aps}.`;
            contenuFonda = `<b>• SITUATION 1 (12'):</b> Exercice analytique par ateliers.<br>
<i>Variantes:</i> ± distance, ± intensité.<br><br>
<b>• SITUATION 2 (13'):</b> Exercice global avec mesure des performances.<br><br>
<b>• SITUATION DE RÉFÉRENCE (10'):</b> ${situationRef.description}`;
            contenuFinale = `<b>• Retour au calme (5'):</b> Marche, étirements.<br><br>
<b>• Bilan (5'):</b> Feedback, rangement.`;
        } else if (typeActivite === 'gymnastique') {
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, sécurité (parade).<br><br>
<b>• Échauffement général (7'):</b> Course, mobilisation, renforcement.<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices préparatoires aux éléments.`;
            contenuFonda = `<b>• SITUATION 1 (12'):</b> Travail par ateliers en binômes.<br><br>
<b>• SITUATION 2 (13'):</b> Construction de l'enchaînement.<br><br>
<b>• SITUATION DE RÉFÉRENCE (10'):</b> ${situationRef.description}`;
            contenuFinale = `<b>• Retour au calme (5'):</b> Étirements, souplesse.<br><br>
<b>• Bilan (5'):</b> Retour sur les enchaînements.`;
        } else {
            contenuIntro = `<b>• Prise en main (3'):</b> Appel, tenues, objectif, règles.<br><br>
<b>• Échauffement général (7'):</b> Course avec changements de direction, mobilisation, gammes.<br><br>
<b>• Échauffement spécifique (5'):</b> Exercices avec ballon.`;
            contenuFonda = `<b>• SITUATION 1 (12'):</b> Exercice analytique sur terrain réduit.<br>
<i>Variantes:</i> ± opposition, ± contraintes.<br><br>
<b>• SITUATION 2 (13'):</b> Jeu réduit avec opposition réelle.<br><br>
<b>• SITUATION DE RÉFÉRENCE (10'):</b> ${situationRef.description}`;
            contenuFinale = `<b>• Retour au calme (5'):</b> Marche, étirements.<br><br>
<b>• Bilan (5'):</b> Questions, feedback, rangement.`;
        }

        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche ${aps} - ${niveau}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.3cm 0.5cm}
body{font-family:Calibri,sans-serif;font-size:9pt;line-height:1.2}
table{width:100%;border-collapse:collapse}
th,td{border:1.5pt solid #000;padding:4px 5px;vertical-align:top}
.header-table td{border:none;padding:2px 6px;font-size:9pt}
.title-cell{text-align:center;font-size:14pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:6px;border:2pt solid #000}
.label-cell{background:#e8e8e8;font-weight:bold;font-size:8pt;text-align:center}
.value-cell{font-size:8pt}
.objectif-label{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:9pt}
.objectif-value{background:#f0f8f0;font-size:9pt;font-weight:bold}
.main-header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:9pt;padding:4px}
.partie-cell{font-weight:bold;text-align:center;background:#f5f5f5;font-size:9pt;width:8%}
.duree-cell{text-align:center;font-weight:bold;font-size:9pt;width:5%}
.contenu-cell{font-size:8pt;line-height:1.25}
.but-cell{font-size:8pt;line-height:1.25}
.critere-cell{font-size:8pt;line-height:1.25}
.footer-text{text-align:center;font-size:7pt;color:#555;margin-top:3px}
</style>
</head>
<body>
<div class="Section1">
<table class="header-table" style="margin-bottom:2px">
<tr>
<td style="text-align:left;width:30%"><b>Professeur:</b> ${nomProf || '________________'}</td>
<td style="text-align:center;width:40%"><b>Établissement:</b> ${etablissement || '________________'}</td>
<td style="text-align:right;width:30%"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>
<table style="margin-bottom:2px">
<tr><td class="title-cell">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr>
</table>
<table style="margin-bottom:2px">
<tr>
<td class="label-cell" style="width:8%">Groupe APS</td>
<td class="value-cell" style="width:17%">${groupeAPS}</td>
<td class="label-cell" style="width:5%">APS</td>
<td class="value-cell" style="width:15%">${aps}</td>
<td class="label-cell" style="width:6%">Niveau</td>
<td class="value-cell" style="width:10%">${niveau}</td>
<td class="label-cell" style="width:6%">Séance</td>
<td class="value-cell" style="width:8%">${numeroSeance || 1}</td>
</tr>
<tr>
<td class="label-cell">OTI</td>
<td class="value-cell" colspan="7" style="font-size:7.5pt">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td class="value-cell" colspan="7" style="font-size:7.5pt">${otc}</td>
</tr>
<tr>
<td class="objectif-label">OBJECTIF</td>
<td class="objectif-value" colspan="7">${objectif}</td>
</tr>
</table>
<table>
<thead>
<tr>
<th class="main-header" style="width:8%">PARTIES</th>
<th class="main-header" style="width:5%">DURÉE</th>
<th class="main-header" style="width:40%">CONTENU</th>
<th class="main-header" style="width:12%">BUT</th>
<th class="main-header" style="width:17.5%">RÉALISATION</th>
<th class="main-header" style="width:17.5%">RÉUSSITE</th>
</tr>
</thead>
<tbody>
<tr>
<td class="partie-cell">INTRO</td>
<td class="duree-cell">15min</td>
<td class="contenu-cell">${contenuIntro}</td>
<td class="but-cell">Préparer l'organisme et mobiliser l'attention.</td>
<td class="critere-cell" colspan="2" style="text-align:center;vertical-align:middle;font-style:italic;">Phase de préparation</td>
</tr>
<tr>
<td class="partie-cell">FONDA.</td>
<td class="duree-cell">35min</td>
<td class="contenu-cell">${contenuFonda}</td>
<td class="but-cell">Réaliser les actions pour atteindre l'objectif.</td>
<td class="critere-cell">• Placement correct<br>• Geste technique précis<br>• Enchaînement fluide<br>• Prise d'information</td>
<td class="critere-cell">• 7/10 réussites min<br>• Taux > 70%<br>• Progression visible<br>• Objectif démontré</td>
</tr>
<tr>
<td class="partie-cell">FINALE</td>
<td class="duree-cell">10min</td>
<td class="contenu-cell">${contenuFinale}</td>
<td class="but-cell">Récupération et bilan.</td>
<td class="critere-cell" colspan="2" style="text-align:center;vertical-align:middle;font-style:italic;">Phase de récupération</td>
</tr>
</tbody>
</table>
<div class="footer-text">Conforme aux ${opReference} | Ministère de l'Éducation Nationale - Maroc</div>
</div>
</body>
</html>`;

        return res.status(200).json({
            success: true,
            ficheDetaillee,
            html,
            filename: `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`,
            oti,
            otc,
            situationReference: situationRef,
            groupeAPS,
            opReference
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
