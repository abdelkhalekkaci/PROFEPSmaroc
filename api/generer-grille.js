// ============================================================================
// API GRILLES (Observation et Évaluation) - /api/generer-grille.js
// ============================================================================
// Format: A4 PORTRAIT (210x297mm)
// Grille OBSERVATION: critères + colonne Observations
// Grille ÉVALUATION: critères + 4 colonnes NOTE (Procéd. | Concept. | Comport. | FINALE)
// Couleurs: Vert (#006233) pour critères | Rouge (#c1272d) pour notes
// ============================================================================

const { CRITERES_OBS, getGroupeAPS } = require('./data/references.js');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { typeGrille, aps, niveau, nomProf, etablissement, classe, anneeScolaire } = req.body;

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isObs = typeGrille === 'observation';
        const titre = isObs ? "Grille d'Observation" : "Grille d'Évaluation";
        const groupeAPS = getGroupeAPS(aps);
        const critObs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];

        // ==================== Construction des en-têtes ====================
        let headMain = '';
        let headSub = '';
        let emptyCols = '';
        let colCount = 0;

        // Colonnes des critères (fond vert)
        critObs.criteres.forEach(c => {
            headMain += `<th colspan="${c.sous.length}" style="background:#006233;color:#fff;font-size:7pt;text-align:center;padding:5px;border:1px solid #000;font-weight:bold;">${c.nom}</th>`;
            c.sous.forEach(s => {
                headSub += `<td style="background:#c8e6c9;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:500;">${s}</td>`;
                emptyCols += '<td style="border:1px solid #000;width:3%;"></td>';
                colCount++;
            });
        });

        // Colonnes spécifiques selon le type de grille
        if (!isObs) {
            // GRILLE ÉVALUATION: 4 colonnes NOTE (fond rouge dégradé)
            headMain += `<th colspan="4" style="background:#c1272d;color:#fff;font-size:8pt;text-align:center;padding:5px;border:1px solid #000;font-weight:bold;">NOTE</th>`;
            headSub += `<td style="background:#ffcdd2;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Procéd.</td>`;
            headSub += `<td style="background:#ffcdd2;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Concept.</td>`;
            headSub += `<td style="background:#ffcdd2;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Comport.</td>`;
            headSub += `<td style="background:#ef9a9a;font-size:7pt;text-align:center;padding:4px;border:1px solid #000;font-weight:bold;width:5%;">FINALE</td>`;
            emptyCols += '<td style="border:1px solid #000;width:5%;"></td>'.repeat(4);
        } else {
            // GRILLE OBSERVATION: colonne Observations
            headMain += `<th rowspan="2" style="background:#c1272d;color:#fff;font-size:7pt;width:15%;border:1px solid #000;text-align:center;font-weight:bold;">Observations</th>`;
            emptyCols += '<td style="border:1px solid #000;width:15%;"></td>';
        }

        // ==================== Génération des lignes (35 élèves) ====================
        let rows = '';
        for (let i = 1; i <= 35; i++) {
            const bgColor = i % 2 === 0 ? '#fafafa' : '#ffffff';
            rows += `<tr style="height:14px;">`;
            rows += `<td style="text-align:center;font-size:8pt;background:${bgColor};border:1px solid #000;font-weight:bold;width:4%;">${i}</td>`;
            rows += `<td colspan="2" style="background:${bgColor};border:1px solid #000;width:18%;"></td>`;
            
            // Cellules des critères
            critObs.criteres.forEach(c => {
                c.sous.forEach(() => {
                    rows += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
                });
            });
            
            // Cellules supplémentaires selon type
            if (!isObs) {
                rows += `<td style="background:${bgColor};border:1px solid #000;"></td>`.repeat(4);
            } else {
                rows += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
            }
            rows += '</tr>';
        }

        // ==================== HTML DISPLAY (Site web) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:900px;margin:0 auto;">
    <!-- EN-TÊTE -->
    <div style="background:linear-gradient(135deg,#c1272d 0%,#006233 100%);color:white;padding:20px 25px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
        <h1 style="margin:0 0 8px 0;font-size:1.4rem;font-weight:700;">📋 ${titre}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>⚽ APS:</strong> ${aps}</span>
            <span><strong>📊 Niveau:</strong> ${niveau}</span>
            <span><strong>🏷️ Classe:</strong> ${classe || '___'}</span>
            <span><strong>🏫 Établissement:</strong> ${etablissement || '___'}</span>
        </div>
    </div>

    <!-- STRUCTURE DE LA GRILLE -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:#006233;margin:0 0 15px 0;font-size:1rem;">📊 Structure de la grille</h3>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
            ${critObs.criteres.map(c => `
                <div style="background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border:1px solid #81c784;border-radius:8px;padding:10px 15px;min-width:120px;">
                    <strong style="color:#2e7d32;font-size:0.9rem;">${c.nom}</strong><br>
                    <span style="font-size:0.8rem;color:#555;">${c.sous.join(' | ')}</span>
                </div>
            `).join('')}
            ${!isObs ? `
                <div style="background:linear-gradient(135deg,#ffebee,#ffcdd2);border:1px solid #ef9a9a;border-radius:8px;padding:10px 15px;min-width:180px;">
                    <strong style="color:#c62828;font-size:0.9rem;">NOTE</strong><br>
                    <span style="font-size:0.8rem;color:#555;">Procéd. | Concept. | Comport. | FINALE</span>
                </div>
            ` : `
                <div style="background:linear-gradient(135deg,#ffebee,#ffcdd2);border:1px solid #ef9a9a;border-radius:8px;padding:10px 15px;">
                    <strong style="color:#c62828;font-size:0.9rem;">Observations</strong><br>
                    <span style="font-size:0.8rem;color:#555;">Remarques libres</span>
                </div>
            `}
        </div>
    </div>

    <!-- INFORMATIONS -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:#c1272d;margin:0 0 12px 0;font-size:1rem;">📝 Informations</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.9rem;">
            <p style="margin:5px 0;"><strong>Type:</strong> ${isObs ? 'Grille d\'observation (pendant la séance)' : 'Grille d\'évaluation (fin de cycle)'}</p>
            <p style="margin:5px 0;"><strong>Nombre de lignes:</strong> 35 élèves</p>
            <p style="margin:5px 0;"><strong>Critères:</strong> ${critObs.criteres.length} critères avec sous-critères</p>
            <p style="margin:5px 0;"><strong>Format:</strong> A4 Portrait</p>
        </div>
        ${!isObs ? `
            <div style="margin-top:15px;padding:12px 15px;background:linear-gradient(135deg,#fff3e0,#ffe0b2);border-radius:8px;border-left:4px solid #ff9800;">
                <strong style="color:#e65100;">📌 Signification des notes:</strong><br>
                <div style="font-size:0.85rem;margin-top:8px;line-height:1.6;">
                    <span style="display:inline-block;background:#ffcdd2;padding:2px 8px;border-radius:4px;margin:2px;"><b>Procédurale</b></span> = Savoir-faire (technique gestuelle, exécution)<br>
                    <span style="display:inline-block;background:#ffcdd2;padding:2px 8px;border-radius:4px;margin:2px;"><b>Conceptuelle</b></span> = Savoirs (connaissance des règles, vocabulaire)<br>
                    <span style="display:inline-block;background:#ffcdd2;padding:2px 8px;border-radius:4px;margin:2px;"><b>Comportementale</b></span> = Savoir-être (engagement, fair-play, coopération)<br>
                    <span style="display:inline-block;background:#ef9a9a;padding:2px 8px;border-radius:4px;margin:2px;"><b>FINALE</b></span> = Moyenne pondérée /20 selon barème établi
                </div>
            </div>
        ` : `
            <div style="margin-top:15px;padding:12px 15px;background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:8px;border-left:4px solid #2196f3;">
                <strong style="color:#1565c0;">📌 Légende d'observation:</strong><br>
                <div style="font-size:0.85rem;margin-top:8px;">
                    <span style="display:inline-block;background:#c8e6c9;padding:2px 10px;border-radius:4px;margin:3px;">✓</span> Critère observé / maîtrisé<br>
                    <span style="display:inline-block;background:#ffcdd2;padding:2px 10px;border-radius:4px;margin:3px;">✗</span> Critère non observé / non maîtrisé<br>
                    <span style="display:inline-block;background:#fff9c4;padding:2px 10px;border-radius:4px;margin:3px;">○</span> Partiellement observé / en cours d'acquisition
                </div>
            </div>
        `}
    </div>
</div>`;

        // ==================== HTML WORD/PDF (A4 Portrait) ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>${titre} - ${aps}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
@page {
    size: 210mm 297mm;
    mso-page-orientation: portrait;
    margin: 0.8cm;
}
@page Section1 {
    size: 210mm 297mm;
    mso-page-orientation: portrait;
    margin: 0.8cm;
}
div.Section1 {
    page: Section1;
}
body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 8pt;
    margin: 0;
    padding: 0;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #000;
    padding: 3px 4px;
}
.main-title {
    font-size: 16pt;
    font-weight: bold;
    text-align: center;
    color: #c1272d;
    margin: 10px 0;
}
.sub-title {
    font-size: 11pt;
    text-align: center;
    color: #006233;
    margin: 0 0 15px 0;
}
.info-table {
    margin-bottom: 12px;
}
.info-table td {
    border: none;
    font-size: 9pt;
    padding: 4px 6px;
}
</style>
</head>
<body>
<div class="Section1">

<p class="main-title">📋 ${titre}</p>
<p class="sub-title">${aps} - Niveau: ${niveau} - ${groupeAPS}</p>

<table class="info-table">
<tr>
<td style="width:35%;"><b>APS:</b> ${aps}</td>
<td style="width:25%;"><b>Classe:</b> ${classe || '____________'}</td>
<td style="width:15%;"><b>Niveau:</b> ${niveau}</td>
<td style="width:25%;text-align:right;"><b>Date:</b> ____/____/________</td>
</tr>
<tr>
<td colspan="2"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td colspan="2"><b>Établissement:</b> ${etablissement || '________________________'}</td>
</tr>
</table>

<table>
<tr>
<th rowspan="2" style="background:#c1272d;color:#fff;width:4%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">N°</th>
<th rowspan="2" colspan="2" style="background:#c1272d;color:#fff;width:18%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">Nom et Prénom</th>
${headMain}
</tr>
<tr>
${headSub}
</tr>
${rows}
</table>

<table style="border:none;margin-top:15px;">
<tr>
<td style="border:none;font-size:8pt;width:65%;vertical-align:top;">
<b>Légende:</b><br>
${isObs 
    ? '<span style="background:#c8e6c9;padding:1px 6px;">✓</span> Critère observé &nbsp;&nbsp; <span style="background:#ffcdd2;padding:1px 6px;">✗</span> Non observé &nbsp;&nbsp; <span style="background:#fff9c4;padding:1px 6px;">○</span> Partiellement' 
    : '<b>Procéd.</b> = Note Procédurale (savoir-faire technique)<br><b>Concept.</b> = Note Conceptuelle (savoirs, règles)<br><b>Comport.</b> = Note Comportementale (savoir-être)<br><b>FINALE</b> = Note finale /20 (moyenne pondérée)'}
</td>
<td style="border:none;text-align:right;font-size:9pt;vertical-align:bottom;">
<b>Signature du professeur:</b><br><br>
____________________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:7pt;color:#666;margin-top:12px;">
Document généré par Prof EPS Maroc - Conforme aux Orientations Pédagogiques du MEN
</p>

</div>
</body>
</html>`;

        const filename = `Grille_${isObs ? 'Observation' : 'Evaluation'}_${aps.replace(/\s+/g, '_')}_${niveau}.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
            filename,
            typeGrille: isObs ? 'observation' : 'evaluation',
            groupeAPS
        });

    } catch (error) {
        console.error('Erreur generer-grille:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
