// ============================================================================
// API PROJETS DE CYCLE - generer-projet.js
// ============================================================================
// Format: A4 PAYSAGE (297x210mm)
// Objectifs: 1-2 phrases explicites et claires par séance
// Situation de référence: Phrase complète
// ============================================================================


const { OTI, OTC, VOCABULAIRE_APS, getSituationReference, getGroupeAPS, OBJECTIFS_CYCLE } = require('./data/references.js');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { aps, niveau, niveauEleves, nombreSeances, nomProf, etablissement, anneeScolaire } = req.body;

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const nb = parseInt(nombreSeances) || 10;
        const nivEleves = niveauEleves || 'moyen';
        const nivTxt = { 'debutant': 'Débutant', 'moyen': 'Moyen', 'avance': 'Avancé', 'elite': 'Expert' }[nivEleves] || 'Moyen';

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = getSituationReference(aps, isCollege);
        const groupeAPS = getGroupeAPS(aps);

        // Récupérer les objectifs depuis la structure complète avec commun + niveaux
        const cycleData = OBJECTIFS_CYCLE[aps] || OBJECTIFS_CYCLE['Football'];
        
        // Construire le tableau d'objectifs selon la structure du cycle
        let objectifs = [];
        
        // S1: Évaluation diagnostique
        if (cycleData.commun && cycleData.commun.S1) {
            objectifs.push(cycleData.commun.S1);
        }
        
        // S2: Théorie/Règlement
        if (cycleData.commun && cycleData.commun.S2) {
            objectifs.push(cycleData.commun.S2);
        }
        
        // Séances d'apprentissage selon le niveau des élèves
        // Pour Gymnastique, utiliser le niveau scolaire (1AC, 2AC, etc.)
        let niveauKey = nivEleves;
        if (aps === 'Gymnastique' && ['1AC', '2AC', '3AC', 'TC', '1AB', '2AB'].includes(niveau)) {
            niveauKey = niveau;
        }
        
        const seancesNiveau = cycleData[niveauKey] || cycleData['moyen'] || cycleData['debutant'] || [];
        
        // Calculer combien de séances d'apprentissage on peut ajouter
        // nb - 3 car on a déjà S1, S2 et on garde la dernière pour S12
        const nbSeancesApprentissage = Math.max(0, nb - 3);
        
        if (seancesNiveau && seancesNiveau.length > 0) {
            // Répartir les séances disponibles sur le nombre demandé
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                const index = Math.floor(i * seancesNiveau.length / nbSeancesApprentissage);
                objectifs.push(seancesNiveau[Math.min(index, seancesNiveau.length - 1)]);
            }
        } else {
            // Fallback si pas de séances définies pour ce niveau
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
            }
        }
        
        // S12: Évaluation terminale
        if (cycleData.commun && cycleData.commun.S12) {
            objectifs.push(cycleData.commun.S12);
        }
        
        // S'assurer qu'on a exactement le nombre de séances demandé
        while (objectifs.length < nb) {
            objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
        }
        objectifs = objectifs.slice(0, nb);

        // Générer les lignes du tableau
        let rows = '';
        for (let i = 0; i < nb; i++) {
            let phase, phaseColor;
            if (i === 0) { phase = 'Éval. diagnostique'; phaseColor = '#f5f5f5'; }
            else if (i === nb - 1) { phase = 'Éval. terminale'; phaseColor = '#e8eef4'; }
            else if (i < nb / 3) { phase = 'Découverte'; phaseColor = '#fafafa'; }
            else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseColor = '#f5f5f5'; }
            else { phase = 'Consolidation'; phaseColor = '#fafafa'; }

            rows += `<tr>
                <td style="text-align:center;background:${phaseColor};font-size:7pt;font-weight:bold;border:1px solid #000;">${phase}</td>
                <td style="text-align:center;font-weight:bold;font-size:9pt;background:#f5f5f5;border:1px solid #000;">${i + 1}</td>
                <td style="font-size:7.5pt;padding:4px 8px;border:1px solid #000;line-height:1.4;text-align:left;">${objectifs[i]}</td>
            </tr>`;
        }

        // Couleurs pour l'affichage
        const COLOR_PRIMARY = '#006233';
        const COLOR_PRIMARY_LIGHT = '#e8f5e9';
        const COLOR_SECONDARY = '#4a8b5c';

        // ==================== HTML WORD/PDF - A4 PAYSAGE ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Projet de Cycle - ${aps}</title>
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
    size: 297mm 210mm;
    mso-page-orientation: landscape;
    margin: 0.5cm 0.5cm 0.5cm 0.5cm;
}
body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 9pt;
    margin: 0;
    padding: 0.3cm;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    table-layout: fixed;
}
th, td {
    border: 1px solid #000;
    padding: 4px 6px;
    vertical-align: middle;
    word-wrap: break-word;
}
.header-table {
    border: none;
    margin-bottom: 8px;
}
.header-table td {
    border: none;
    padding: 3px 0;
    font-size: 9pt;
}
.main-title {
    font-size: 16pt;
    font-weight: bold;
    text-align: center;
    color: ${COLOR_PRIMARY};
    margin: 8px 0 4px 0;
}
.sub-title {
    font-size: 11pt;
    text-align: center;
    color: ${COLOR_SECONDARY};
    margin: 0 0 12px 0;
}
.info-table td {
    font-size: 8pt;
    padding: 4px 8px;
}
.section-header {
    background: #e8e8e8;
    font-weight: bold;
    text-align: center;
    font-size: 7.5pt;
}
.cycle-header {
    background: ${COLOR_PRIMARY};
    color: #fff;
    font-weight: bold;
    font-size: 10pt;
    text-align: center;
    padding: 8px;
}
.label-cell {
    background: #f5f5f5;
    font-weight: bold;
    font-size: 7.5pt;
    text-align: left;
    padding: 5px 8px;
}
.content-cell {
    font-size: 7.5pt;
    line-height: 1.35;
    padding: 5px 8px;
    text-align: left;
}
.competences-cell {
    background: ${COLOR_PRIMARY_LIGHT};
    font-size: 7pt;
    line-height: 1.35;
    padding: 8px;
}
.progression-table {
    margin-top: 8px;
}
.phase-header {
    background: ${COLOR_PRIMARY};
    color: #fff;
    font-size: 8pt;
    font-weight: bold;
    text-align: center;
    padding: 6px 4px;
}
.footer-table {
    border: none;
    margin-top: 12px;
}
.footer-table td {
    border: none;
    font-size: 7pt;
    padding: 3px 0;
}
</style>
</head>
<body>

<p class="main-title">📊 PROJET PÉDAGOGIQUE DE CYCLE</p>
<p class="sub-title">${aps} - ${niveau} - Niveau élèves: ${nivTxt}</p>

<table class="header-table">
<tr>
<td style="width:33%;text-align:left;"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td style="width:34%;text-align:center;"><b>Établissement:</b> ${etablissement || '________________________'}</td>
<td style="width:33%;text-align:right;"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table class="info-table">
<colgroup>
<col style="width:10%">
<col style="width:12%">
<col style="width:4%">
<col style="width:12%">
<col style="width:6%">
<col style="width:5%">
<col style="width:9%">
<col style="width:8%">
<col style="width:7%">
<col style="width:5%">
</colgroup>
<tr>
<td class="section-header">GROUPE APS</td>
<td style="text-align:center;font-size:8pt;">${groupeAPS}</td>
<td class="section-header">APS</td>
<td style="text-align:center;font-size:9pt;font-weight:bold;color:${COLOR_PRIMARY};">${aps}</td>
<td class="section-header">NIVEAU</td>
<td style="text-align:center;font-size:8pt;">${niveau}</td>
<td class="section-header">NIV. ÉLÈVES</td>
<td style="text-align:center;font-weight:bold;color:${COLOR_PRIMARY};">${nivTxt}</td>
<td class="section-header">SÉANCES</td>
<td style="text-align:center;font-size:10pt;font-weight:bold;">${nb}</td>
</tr>
</table>

<table>
<colgroup>
<col style="width:13%">
<col style="width:87%">
</colgroup>
<tr>
<td class="label-cell">OTI</td>
<td class="content-cell">${oti}</td>
</tr>
<tr>
<td class="label-cell">OTC</td>
<td class="content-cell">${otc}</td>
</tr>
<tr>
<td class="label-cell">COMPÉTENCES VISÉES</td>
<td class="competences-cell">
<b>Compétences visées par l'APS ${aps}:</b><br>
- Maîtriser les gestes techniques fondamentaux de l'APS<br>
- S'adapter aux différentes situations motrices proposées<br>
- Respecter les règles et faire preuve d'esprit sportif<br>
- Concevoir et réaliser des projets collectifs ou individuels
</td>
</tr>
<tr>
<td class="label-cell">SITUATION DE RÉFÉRENCE</td>
<td class="content-cell" style="font-weight:bold;color:${COLOR_PRIMARY};">${sitRef}</td>
</tr>
</table>

<table class="progression-table">
<colgroup>
<col style="width:12%">
<col style="width:4%">
<col style="width:84%">
</colgroup>
<tr>
<td class="cycle-header" colspan="3">PROGRESSION PÉDAGOGIQUE DU CYCLE</td>
</tr>
<tr>
<th class="phase-header">PHASE</th>
<th class="phase-header">N°</th>
<th class="phase-header">OBJECTIF OPÉRATIONNEL DE LA SÉANCE</th>
</tr>
${rows}
</table>

<table class="footer-table">
<tr>
<td style="width:60%;text-align:left;">
<b>Légende des phases:</b> 🟠 Éval. diagnostique | 🔵 Découverte | 🟢 Apprentissage | 🟣 Consolidation | 🔴 Éval. terminale
</td>
<td style="width:40%;text-align:right;">
<b>Signature du professeur:</b> ____________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:7pt;color:#666;margin-top:10px;">
Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - MEN Maroc
</p>

</body>
</html>`;

        // ==================== HTML DISPLAY (Site) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',sans-serif;max-width:950px;margin:0 auto;line-height:1.5;">
    <div style="background:${COLOR_PRIMARY};color:white;padding:20px;border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0 0 8px 0;font-size:1.5rem;">📊 Projet de Cycle - ${aps}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>Niveau:</strong> ${niveau}</span>
            <span><strong>Niveau élèves:</strong> ${nivTxt}</span>
            <span><strong>Séances:</strong> ${nb}</span>
            <span><strong>Groupe:</strong> ${groupeAPS}</span>
        </div>
    </div>

    <div style="background:#f8f9fa;border:1px solid #e0e0e0;border-radius:10px;padding:15px;margin-bottom:15px;">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 10px 0;font-size:0.95rem;">📋 Références officielles</h3>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTI:</strong> ${oti}</p>
        <p style="margin:0 0 8px 0;font-size:0.85rem;"><strong>OTC:</strong> ${otc}</p>
        <div style="background:${COLOR_PRIMARY_LIGHT};padding:10px;border-radius:6px;margin:10px 0;border-left:3px solid ${COLOR_PRIMARY};">
            <p style="margin:0 0 5px 0;font-size:0.85rem;font-weight:bold;color:${COLOR_PRIMARY};">🎯 Compétences visées:</p>
            <p style="margin:0;font-size:0.8rem;line-height:1.4;">
                • Maîtriser les gestes techniques fondamentaux de l'APS ${aps}<br>
                • S'adapter aux différentes situations motrices proposées<br>
                • Respecter les règles et faire preuve d'esprit sportif<br>
                • Concevoir et réaliser des projets collectifs ou individuels
            </p>
        </div>
        <p style="margin:0;font-size:0.85rem;"><strong>Situation de référence:</strong> <span style="color:${COLOR_PRIMARY};font-weight:500;">${sitRef}</span></p>
    </div>

    <div style="background:white;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
        <div style="background:${COLOR_PRIMARY};color:white;padding:12px;text-align:center;font-weight:bold;">
            PROGRESSION PÉDAGOGIQUE
        </div>
        <table style="width:100%;border-collapse:collapse;">
            <tr style="background:${COLOR_PRIMARY};color:white;">
                <th style="padding:10px;width:15%;font-size:0.8rem;">Phase</th>
                <th style="padding:10px;width:5%;font-size:0.8rem;">N°</th>
                <th style="padding:10px;font-size:0.8rem;">Objectif opérationnel</th>
            </tr>
            ${objectifs.map((obj, i) => {
                let phase, phaseBg, phaseColor;
                if (i === 0) { phase = 'Éval. diag.'; phaseBg = '#f5f5f5'; phaseColor = COLOR_PRIMARY; }
                else if (i === nb - 1) { phase = 'Éval. term.'; phaseBg = '#e8eef4'; phaseColor = COLOR_PRIMARY; }
                else if (i < nb / 3) { phase = 'Découverte'; phaseBg = '#fafafa'; phaseColor = COLOR_SECONDARY; }
                else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseBg = '#f5f5f5'; phaseColor = COLOR_PRIMARY; }
                else { phase = 'Consolidation'; phaseBg = '#fafafa'; phaseColor = COLOR_SECONDARY; }
                return `<tr style="border-bottom:1px solid #e0e0e0;">
                    <td style="padding:10px;background:${phaseBg};text-align:center;font-weight:bold;color:${phaseColor};font-size:0.8rem;">${phase}</td>
                    <td style="padding:10px;text-align:center;font-weight:bold;font-size:1rem;background:#f5f5f5;">${i + 1}</td>
                    <td style="padding:10px;font-size:0.85rem;">${obj}</td>
                </tr>`;
            }).join('')}
        </table>
    </div>
</div>`;

        const filename = `Projet_Cycle_${aps.replace(/\s+/g, '_')}_${niveau}_${nb}seances.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
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
