// ============================================================================
// API GRILLES (Observation et Évaluation) - generer-grille.js
// ============================================================================
// Grille OBSERVATION: critères + colonne Observations
// Grille ÉVALUATION: critères + 4 colonnes NOTE (Procéd. | Concept. | Comport. | FINALE)
// Format: A4 PORTRAIT | Couleurs cohérentes (vert critères, rouge notes)
// ============================================================================

const CRITERES_OBS = {
    'Saut en longueur': {
        criteres: [
            { nom: 'Course d\'élan', sous: ['Accélérée', 'Irrégulière'] },
            { nom: 'Impulsion', sous: ['Active', 'Passive'] },
            { nom: 'Envol', sous: ['Équilibré', 'Déséquilibré'] },
            { nom: 'Réception', sous: ['Stable', 'Chute'] }
        ]
    },
    'Saut en hauteur': {
        criteres: [
            { nom: 'Course courbe', sous: ['Correcte', 'Droite'] },
            { nom: 'Impulsion', sous: ['Pied ext.', 'Autre'] },
            { nom: 'Franchissement', sous: ['Dorsal', 'Autre'] },
            { nom: 'Réception', sous: ['Dos', 'Danger'] }
        ]
    },
    'Course de vitesse': {
        criteres: [
            { nom: 'Départ', sous: ['Réactif', 'Lent'] },
            { nom: 'Accélération', sous: ['Progressive', 'Brutale'] },
            { nom: 'Maintien', sous: ['Stable', 'Décélère'] },
            { nom: 'Finish', sous: ['Engagé', 'Relâché'] }
        ]
    },
    'Lancer de poids': {
        criteres: [
            { nom: 'Position', sous: ['Dos aire', 'Face'] },
            { nom: 'Tenue', sous: ['Au cou', 'Éloigné'] },
            { nom: 'Poussée', sous: ['Complète', 'Partielle'] },
            { nom: 'Équilibre', sous: ['Stable', 'Chute'] }
        ]
    },
    'Course de durée': {
        criteres: [
            { nom: 'Régularité', sous: ['Constante', 'Variable'] },
            { nom: 'Allure', sous: ['Adaptée', 'Inadaptée'] },
            { nom: 'Posture', sous: ['Correcte', 'Effondrée'] },
            { nom: 'Finish', sous: ['Accéléré', 'Ralenti'] }
        ]
    },
    'Handball': {
        criteres: [
            { nom: 'Passe', sous: ['Précise', 'Imprécise'] },
            { nom: 'Réception', sous: ['Assurée', 'Manquée'] },
            { nom: 'Tir', sous: ['Cadré', 'Hors cadre'] },
            { nom: 'Démarquage', sous: ['Efficace', 'Passif'] }
        ]
    },
    'Football': {
        criteres: [
            { nom: 'Conduite', sous: ['Maîtrisée', 'Perdue'] },
            { nom: 'Passe', sous: ['Précise', 'Imprécise'] },
            { nom: 'Contrôle', sous: ['Orienté', 'Subi'] },
            { nom: 'Placement', sous: ['Pertinent', 'Inadapté'] }
        ]
    },
    'Basketball': {
        criteres: [
            { nom: 'Dribble', sous: ['Tête haute', 'Yeux balle'] },
            { nom: 'Passe', sous: ['Précise', 'Interceptée'] },
            { nom: 'Tir', sous: ['Équilibré', 'Déséquilibré'] },
            { nom: 'Démarquage', sous: ['Actif', 'Statique'] }
        ]
    },
    'Volleyball': {
        criteres: [
            { nom: 'Manchette', sous: ['Bras tendus', 'Pliés'] },
            { nom: 'Touche', sous: ['Haute', 'Basse'] },
            { nom: 'Service', sous: ['Réussi', 'Faute'] },
            { nom: 'Déplacement', sous: ['Anticipé', 'Retard'] }
        ]
    },
    'Gymnastique': {
        criteres: [
            { nom: 'Amplitude', sous: ['Suffisante', 'Insuffisante'] },
            { nom: 'Tenue', sous: ['Gainé', 'Relâché'] },
            { nom: 'Liaisons', sous: ['Fluides', 'Arrêts'] },
            { nom: 'Réception', sous: ['Stabilisée', 'Déséquilibrée'] }
        ]
    },
    'Tennis de table': {
        criteres: [
            { nom: 'Coup droit', sous: ['Contrôlé', 'Aléatoire'] },
            { nom: 'Revers', sous: ['Contrôlé', 'Aléatoire'] },
            { nom: 'Service', sous: ['Varié', 'Prévisible'] },
            { nom: 'Déplacement', sous: ['Équilibré', 'Instable'] }
        ]
    },
    'Badminton': {
        criteres: [
            { nom: 'Dégagé', sous: ['Fond', 'Court'] },
            { nom: 'Amorti', sous: ['Près filet', 'Long'] },
            { nom: 'Service', sous: ['Réglementaire', 'Faute'] },
            { nom: 'Replacement', sous: ['Centre', 'Excentré'] }
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
        const { typeGrille, aps, niveau, nomProf, etablissement, classe } = req.body;

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isObs = typeGrille === 'observation';
        const titre = isObs ? "Grille d'Observation" : "Grille d'Évaluation";
        const critObs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];

        // ==================== Construction des en-têtes ====================
        let headMain = '';
        let headSub = '';
        let emptyCols = '';

        // Colonnes des critères (fond vert)
        critObs.criteres.forEach(c => {
            headMain += '<th colspan="' + c.sous.length + '" style="background:#006233;color:#fff;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;">' + c.nom + '</th>';
            c.sous.forEach(s => {
                headSub += '<td style="background:#c8e6c9;font-size:5.5pt;text-align:center;padding:3px;border:1px solid #000;">' + s + '</td>';
                emptyCols += '<td style="border:1px solid #000;"></td>';
            });
        });

        // Colonnes spécifiques selon le type de grille
        if (!isObs) {
            // GRILLE ÉVALUATION: 4 colonnes NOTE (fond rouge)
            headMain += '<th colspan="4" style="background:#c1272d;color:#fff;font-size:7pt;text-align:center;padding:4px;border:1px solid #000;font-weight:bold;">NOTE</th>';
            headSub += '<td style="background:#ffcdd2;font-size:5.5pt;text-align:center;padding:3px;border:1px solid #000;width:5%;">Procéd.</td>';
            headSub += '<td style="background:#ffcdd2;font-size:5.5pt;text-align:center;padding:3px;border:1px solid #000;width:5%;">Concept.</td>';
            headSub += '<td style="background:#ffcdd2;font-size:5.5pt;text-align:center;padding:3px;border:1px solid #000;width:5%;">Comport.</td>';
            headSub += '<td style="background:#ef9a9a;font-size:6pt;text-align:center;padding:3px;border:1px solid #000;width:5%;font-weight:bold;">FINALE</td>';
            emptyCols += '<td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td><td style="border:1px solid #000;"></td>';
        } else {
            // GRILLE OBSERVATION: colonne Observations
            headMain += '<th rowspan="2" style="background:#c1272d;color:#fff;font-size:6pt;width:12%;border:1px solid #000;text-align:center;">Observations</th>';
            emptyCols += '<td style="border:1px solid #000;"></td>';
        }

        // ==================== Génération des lignes (35 élèves) ====================
        let rows = '';
        for (let i = 1; i <= 35; i++) {
            const bg = i % 2 === 0 ? '#fafafa' : '#ffffff';
            rows += '<tr style="height:13px;">';
            rows += '<td style="text-align:center;font-size:7pt;background:' + bg + ';border:1px solid #000;font-weight:bold;">' + i + '</td>';
            rows += '<td colspan="2" style="background:' + bg + ';border:1px solid #000;"></td>';
            // Ajouter les cellules vides avec le bon fond
            const emptyWithBg = emptyCols.replace(/<td style="border:1px solid #000;"><\/td>/g, '<td style="background:' + bg + ';border:1px solid #000;"></td>');
            rows += emptyWithBg;
            rows += '</tr>';
        }

        // ==================== HTML WORD/PDF (A4 Portrait) ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>${titre} - ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,Arial,sans-serif;font-size:7pt;margin:0;padding:0}
table{width:100%;border-collapse:collapse}
th,td{border:1px solid #000;padding:2px 3px}
.main-title{font-size:18pt;font-weight:bold;text-align:center;color:#c1272d;margin:8px 0}
.sub-title{font-size:11pt;text-align:center;color:#006233;margin:0 0 12px 0}
.info-table{margin-bottom:10px}
.info-table td{border:none;font-size:8pt;padding:3px 5px}
</style>
</head>
<body>

<p class="main-title">📋 ${titre}</p>
<p class="sub-title">${aps} - Niveau: ${niveau}</p>

<table class="info-table">
<tr>
<td style="width:30%;"><b>APS:</b> ${aps}</td>
<td style="width:25%;"><b>Classe:</b> ${classe || '____________'}</td>
<td style="width:15%;"><b>Niveau:</b> ${niveau}</td>
<td style="width:30%;text-align:right;"><b>Date:</b> ____/____/________</td>
</tr>
<tr>
<td colspan="2"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td colspan="2"><b>Établissement:</b> ${etablissement || '________________________'}</td>
</tr>
</table>

<table>
<tr>
<th rowspan="2" style="background:#c1272d;color:#fff;width:4%;font-size:6pt;border:1px solid #000;text-align:center;">N°</th>
<th rowspan="2" colspan="2" style="background:#c1272d;color:#fff;width:18%;font-size:6pt;border:1px solid #000;text-align:center;">Nom et Prénom</th>
${headMain}
</tr>
<tr>
${headSub}
</tr>
${rows}
</table>

<table style="border:none;margin-top:12px;">
<tr>
<td style="border:none;font-size:7pt;width:60%;">
<b>Légende:</b><br>
${isObs 
    ? '✓ = Critère observé | ✗ = Critère non observé | ○ = Partiellement observé' 
    : '<b>Procéd.</b> = Note Procédurale (savoir-faire) | <b>Concept.</b> = Note Conceptuelle (savoirs)<br><b>Comport.</b> = Note Comportementale (savoir-être) | <b>FINALE</b> = Note finale /20'}
</td>
<td style="border:none;text-align:right;font-size:8pt;">
<b>Signature du professeur:</b><br><br>
____________________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:6pt;color:#666;margin-top:10px;">
Document généré par Prof EPS - Conforme aux Orientations Pédagogiques du MEN Maroc
</p>

</body>
</html>`;

        // ==================== HTML DISPLAY (Site web) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',sans-serif;max-width:900px;margin:0 auto;">
    <div style="background:linear-gradient(135deg,#c1272d,#006233);color:white;padding:18px;border-radius:10px;margin-bottom:15px;">
        <h1 style="margin:0 0 6px 0;font-size:1.4rem;">📋 ${titre}</h1>
        <div style="display:flex;gap:15px;flex-wrap:wrap;font-size:0.85rem;opacity:0.9;">
            <span><strong>APS:</strong> ${aps}</span>
            <span><strong>Niveau:</strong> ${niveau}</span>
            <span><strong>Classe:</strong> ${classe || '___'}</span>
        </div>
    </div>

    <div style="background:#f8f9fa;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h3 style="color:#006233;margin:0 0 10px 0;">📊 Structure de la grille</h3>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${critObs.criteres.map(c => `
                <div style="background:#e8f5e9;border:1px solid #81c784;border-radius:6px;padding:8px 12px;">
                    <strong style="color:#2e7d32;">${c.nom}</strong><br>
                    <span style="font-size:0.8rem;color:#666;">${c.sous.join(' | ')}</span>
                </div>
            `).join('')}
            ${!isObs ? `
                <div style="background:#ffebee;border:1px solid #ef9a9a;border-radius:6px;padding:8px 12px;">
                    <strong style="color:#c62828;">NOTE</strong><br>
                    <span style="font-size:0.8rem;color:#666;">Procéd. | Concept. | Comport. | FINALE</span>
                </div>
            ` : `
                <div style="background:#ffebee;border:1px solid #ef9a9a;border-radius:6px;padding:8px 12px;">
                    <strong style="color:#c62828;">Observations</strong><br>
                    <span style="font-size:0.8rem;color:#666;">Remarques libres</span>
                </div>
            `}
        </div>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;padding:15px;">
        <h3 style="color:#c1272d;margin:0 0 10px 0;">📝 Informations</h3>
        <p style="margin:5px 0;font-size:0.9rem;"><strong>Type:</strong> ${isObs ? 'Grille d\'observation (pendant la séance)' : 'Grille d\'évaluation (fin de cycle)'}</p>
        <p style="margin:5px 0;font-size:0.9rem;"><strong>Nombre d\'élèves:</strong> 35 lignes</p>
        <p style="margin:5px 0;font-size:0.9rem;"><strong>Critères:</strong> ${critObs.criteres.length} critères avec sous-critères</p>
        ${!isObs ? `
            <div style="margin-top:10px;padding:10px;background:#fff3e0;border-radius:6px;border-left:3px solid #ff9800;">
                <strong>📌 Notes:</strong><br>
                <span style="font-size:0.85rem;">
                    • <b>Procédurale</b> = Savoir-faire (technique gestuelle)<br>
                    • <b>Conceptuelle</b> = Savoirs (connaissance des règles)<br>
                    • <b>Comportementale</b> = Savoir-être (engagement, fair-play)<br>
                    • <b>FINALE</b> = Moyenne pondérée /20
                </span>
            </div>
        ` : ''}
    </div>
</div>`;

        const filename = `Grille_${isObs ? 'Observation' : 'Evaluation'}_${aps.replace(/\s+/g, '_')}_${niveau}.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
            filename
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
