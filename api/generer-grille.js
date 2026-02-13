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

        // Couleurs pour le document Word/PDF (bleu marine)
        const WORD_COLOR_PRIMARY = '#1e3a5f';
        const WORD_COLOR_PRIMARY_LIGHT = '#e8eef4';
        const WORD_COLOR_SECONDARY = '#4a6fa5';
        const WORD_COLOR_ACCENT = '#2c4a6e';

        // Couleurs pour l'affichage site web (vert marocain)
        const COLOR_PRIMARY = '#006233'; // Vert principal
        const COLOR_PRIMARY_LIGHT = '#e8f5e9'; // Vert très clair
        const COLOR_SECONDARY = '#4a8b5c'; // Vert secondaire
        const COLOR_ACCENT = '#2c5f3e'; // Vert foncé
        const COLOR_BEIGE = '#f5f5dc'; // Beige clair
        const COLOR_WHITE = '#ffffff'; // Blanc
        
        // Colonnes des critères (fond bleu marine unifié)
        critObs.criteres.forEach(c => {
            headMain += `<th colspan="${c.sous.length}" style="background:${COLOR_PRIMARY};color:#fff;font-size:7pt;text-align:center;padding:5px;border:1px solid #000;font-weight:bold;">${c.nom}</th>`;
            c.sous.forEach(s => {
                headSub += `<td style="background:${COLOR_PRIMARY_LIGHT};font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:500;">${s}</td>`;
                emptyCols += '<td style="border:1px solid #000;width:3%;"></td>';
                colCount++;
            });
        });

        // Déterminer si c'est un sport collectif
        const sportsCollectifs = ['Handball', 'Football', 'Basketball', 'Volleyball'];
        const isSportCollectif = sportsCollectifs.includes(aps);

        // Colonnes spécifiques selon le type de grille
        if (!isObs) {
            // GRILLE ÉVALUATION: 5 colonnes NOTE
            headMain += `<th colspan="5" style="background:${COLOR_ACCENT};color:#fff;font-size:8pt;text-align:center;padding:5px;border:1px solid #000;font-weight:bold;">NOTE</th>`;
            // Adapter les libellés selon le type de sport
            if (isSportCollectif) {
                // Sports collectifs: Individuel / Équipe / Conceptuel / Comportemental / Finale
                headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Individ.</td>`;
                headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Équipe</td>`;
            } else {
                // Autres sports: Produit / Processus / Conceptuel / Comportemental / Finale
                headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Produit</td>`;
                headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Process.</td>`;
            }
            headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Concept.</td>`;
            headSub += `<td style="background:#f5f5f5;font-size:6pt;text-align:center;padding:4px;border:1px solid #000;font-weight:600;width:5%;">Comport.</td>`;
            headSub += `<td style="background:${COLOR_PRIMARY_LIGHT};font-size:7pt;text-align:center;padding:4px;border:1px solid #000;font-weight:bold;width:5%;">FINALE</td>`;
            emptyCols += '<td style="border:1px solid #000;width:5%;"></td>'.repeat(5);
        } else {
            // GRILLE OBSERVATION: colonne Observations
            headMain += `<th rowspan="2" style="background:${COLOR_ACCENT};color:#fff;font-size:7pt;width:15%;border:1px solid #000;text-align:center;font-weight:bold;">Observations</th>`;
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
                rows += `<td style="background:${bgColor};border:1px solid #000;"></td>`.repeat(5);
            } else {
                rows += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
            }
            rows += '</tr>';
        }

        // ==================== HTML DISPLAY (Site web) ====================
        // Construire un aperçu réduit de la grille (premières lignes)
        let previewRows = '';
        for (let i = 1; i <= 5; i++) {
            const bgColor = i % 2 === 0 ? '#fafafa' : '#ffffff';
            previewRows += `<tr style="height:20px;">`;
            previewRows += `<td style="text-align:center;font-size:8pt;background:${bgColor};border:1px solid #000;font-weight:bold;width:4%;">${i}</td>`;
            previewRows += `<td colspan="2" style="background:${bgColor};border:1px solid #000;width:18%;"></td>`;
            
            // Cellules des critères
            critObs.criteres.forEach(c => {
                c.sous.forEach(() => {
                    previewRows += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
                });
            });
            
            // Cellules supplémentaires selon type
            if (!isObs) {
                previewRows += `<td style="background:${bgColor};border:1px solid #000;"></td>`.repeat(5);
            } else {
                previewRows += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
            }
            previewRows += '</tr>';
        }
        
        // Ligne indicatrice pour les lignes restantes
        previewRows += `<tr style="height:20px;">`;
        previewRows += `<td colspan="${3 + colCount + (isObs ? 1 : 5)}" style="text-align:center;font-size:8pt;background:#f5f5f5;border:1px solid #000;color:#666;">... ${35 - 5} lignes supplémentaires ...</td>`;
        previewRows += '</tr>';
        
        const htmlDisplay = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:900px;margin:0 auto;">
    <!-- EN-TÊTE -->
    <div style="background:${COLOR_PRIMARY};color:white;padding:20px 25px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
        <h1 style="margin:0 0 8px 0;font-size:1.4rem;font-weight:700;">📋 ${titre}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>⚽ APS:</strong> ${aps}</span>
            <span><strong>📊 Niveau:</strong> ${niveau}</span>
            <span><strong>🏷️ Classe:</strong> ${classe || '___'}</span>
            <span><strong>🏫 Établissement:</strong> ${etablissement || '___'}</span>
        </div>
    </div>

    <!-- TABLEAU DE LA GRILLE (Aperçu) -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);overflow-x:auto;">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 15px 0;font-size:1rem;">📊 Aperçu de la grille (5 premières lignes sur 35)</h3>
        <table style="width:100%;border-collapse:collapse;font-size:8pt;">
            <tr>
                <th rowspan="2" style="background:#006233;color:#fff;width:4%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">N°</th>
                <th rowspan="2" colspan="2" style="background:#006233;color:#fff;width:18%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">Nom et Prénom</th>
                ${headMain}
            </tr>
            <tr>
                ${headSub}
            </tr>
            ${previewRows}
        </table>
    </div>

    <!-- STRUCTURE DE LA GRILLE -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 15px 0;font-size:1rem;">📋 Structure des critères</h3>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
            ${critObs.criteres.map(c => `
                <div style="background:#f5f5f5;border:1px solid #d0d0d0;border-radius:8px;padding:10px 15px;min-width:120px;">
                    <strong style="color:${COLOR_PRIMARY};font-size:0.9rem;">${c.nom}</strong><br>
                    <span style="font-size:0.8rem;color:#555;">${c.sous.join(' | ')}</span>
                </div>
            `).join('')}
            ${!isObs ? `
                <div style="background:#f5f5f5;border:1px solid #d0d0d0;border-radius:8px;padding:10px 15px;min-width:180px;">
                    <strong style="color:${COLOR_PRIMARY};font-size:0.9rem;">NOTE</strong><br>
                    <span style="font-size:0.8rem;color:#555;">${isSportCollectif ? 'Individ. | Équipe | Concept. | Comport. | FINALE' : 'Produit | Process. | Concept. | Comport. | FINALE'}</span>
                </div>
            ` : `
                <div style="background:#f5f5f5;border:1px solid #d0d0d0;border-radius:8px;padding:10px 15px;">
                    <strong style="color:${COLOR_PRIMARY};font-size:0.9rem;">Observations</strong><br>
                    <span style="font-size:0.8rem;color:#555;">Remarques libres</span>
                </div>
            `}
        </div>
    </div>

    <!-- INFORMATIONS -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 12px 0;font-size:1rem;">📝 Informations</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.9rem;">
            <p style="margin:5px 0;"><strong>Type:</strong> ${isObs ? 'Grille d\'observation (pendant la séance)' : 'Grille d\'évaluation (fin de cycle)'}</p>
            <p style="margin:5px 0;"><strong>Nombre de lignes:</strong> 35 élèves</p>
            <p style="margin:5px 0;"><strong>Critères:</strong> ${critObs.criteres.length} critères avec sous-critères</p>
            <p style="margin:5px 0;"><strong>Format:</strong> A4 Portrait</p>
        </div>
        ${!isObs ? `
            <div style="margin-top:15px;padding:12px 15px;background:#f5f5f5;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};">
                <strong style="color:${COLOR_PRIMARY};">📌 Signification des notes:</strong><br>
                <div style="font-size:0.85rem;margin-top:8px;line-height:1.6;">
                    ${isSportCollectif ? `
                    <span style="display:inline-block;background:#e8eef4;padding:2px 8px;border-radius:4px;margin:2px;"><b>Individuel</b></span> = Performance personnelle (technique, réussite)<br>
                    <span style="display:inline-block;background:#e8eef4;padding:2px 8px;border-radius:4px;margin:2px;"><b>Équipe</b></span> = Contribution collective (coopération, organisation)
                    ` : `
                    <span style="display:inline-block;background:#e8eef4;padding:2px 8px;border-radius:4px;margin:2px;"><b>Produit</b></span> = Résultat atteint (performance, réussite)<br>
                    <span style="display:inline-block;background:#e8eef4;padding:2px 8px;border-radius:4px;margin:2px;"><b>Processus</b></span> = Démarche suivie (technique, organisation)
                    `}<br>
                    <span style="display:inline-block;background:#e8eef4;padding:2px 8px;border-radius:4px;margin:2px;"><b>Comportementale</b></span> = Savoir-être (engagement, fair-play, coopération)<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>FINALE</b></span> = Moyenne pondérée /20 selon barème établi
                </div>
            </div>
        ` : `
            <div style="margin-top:15px;padding:12px 15px;background:#f5f5f5;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};">
                <strong style="color:${COLOR_PRIMARY};">📌 Légende d'observation:</strong><br>
                <div style="font-size:0.85rem;margin-top:8px;">
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 10px;border-radius:4px;margin:3px;">✓</span> Critère observé / maîtrisé<br>
                    <span style="display:inline-block;background:#e8eef4;padding:2px 10px;border-radius:4px;margin:3px;">○</span> Partiellement observé / en cours d'acquisition<br>
                    <span style="display:inline-block;background:#fff;padding:2px 10px;border-radius:4px;margin:3px;border:1px solid #ccc;">✗</span> Critère non observé / non maîtrisé
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
    color: #1e3a5f;
    margin: 10px 0;
}
.sub-title {
    font-size: 11pt;
    text-align: center;
    color: #1e3a5f;
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
@media print {
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    .Section1 {
        page-break-inside: auto;
    }
    tr {
        page-break-inside: avoid;
    }
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
<th rowspan="2" style="background:#006233;color:#fff;width:4%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">N°</th>
<th rowspan="2" colspan="2" style="background:#006233;color:#fff;width:18%;font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">Nom et Prénom</th>
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
    : isSportCollectif
        ? '<b>Individ.</b> = Performance personnelle (technique, réussite)<br><b>Équipe</b> = Contribution collective (coopération, organisation)<br><b>Comport.</b> = Note Comportementale (savoir-être)<br><b>FINALE</b> = Note finale /20 (moyenne pondérée)'
        : '<b>Produit</b> = Résultat atteint (performance, réussite)<br><b>Process.</b> = Démarche suivie (technique, organisation)<br><b>Comport.</b> = Note Comportementale (savoir-être)<br><b>FINALE</b> = Note finale /20 (moyenne pondérée)'}
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
