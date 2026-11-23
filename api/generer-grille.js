// ============================================================================
// API GRILLES (Observation et Évaluation) - /api/generer-grille.js
// ============================================================================
// Format: A4 PORTRAIT (210x297mm)
// Grille OBSERVATION: N° + Nom et Prénom + Critères alignés au Calculateur
//   (sans notes Conceptuel / Comportemental / Processus / Procédural)
// Grille ÉVALUATION: Critères alignés + 5 colonnes NOTE (Individ./Produit |
//   Équipe/Process. | Concept. | Comport. | FINALE)
// ============================================================================

const { CRITERES_OBS, CRITERES_COLLECTIF, GYM_CONTRATS_OP, getGymCriteresObs, getGroupeAPS } = require('./data/references.js');

function escapeHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function buildDefaultCriteres(aps, niveau) {
    if (aps === 'Gymnastique' && typeof getGymCriteresObs === 'function') {
        return getGymCriteresObs(niveau).map(c => ({
            nom: c.nom,
            sous: Array.isArray(c.sous) && c.sous.length >= 2 ? [c.sous[0], c.sous[1]] : ['Acquis', 'En cours'],
            groupe: 'processus'
        }));
    }
    if (CRITERES_COLLECTIF && CRITERES_COLLECTIF[aps]) {
        const indiv = (CRITERES_COLLECTIF[aps].indiv || []).map(c => ({
            nom: c.nom,
            sous: Array.isArray(c.sous) && c.sous.length >= 2 ? [c.sous[0], c.sous[1]] : ['Acquis', 'En cours'],
            groupe: 'indiv'
        }));
        const collectif = (CRITERES_COLLECTIF[aps].collectif || []).map(c => ({
            nom: c.nom,
            sous: Array.isArray(c.sous) && c.sous.length >= 2 ? [c.sous[0], c.sous[1]] : ['Acquis', 'En cours'],
            groupe: 'collectif'
        }));
        return [...indiv, ...collectif];
    }
    const obs = CRITERES_OBS[aps] || CRITERES_OBS['Handball'];
    return (obs.criteres || []).map(c => ({
        nom: c.nom,
        sous: Array.isArray(c.sous) && c.sous.length >= 2 ? [c.sous[0], c.sous[1]] : ['Acquis', 'En cours'],
        groupe: 'processus'
    }));
}

function sanitizeCustomCriteres(rawList, fallbackList) {
    if (!Array.isArray(rawList) || rawList.length === 0) return fallbackList;
    const cleaned = [];
    for (let i = 0; i < Math.min(rawList.length, 14); i++) {
        const item = rawList[i];
        if (!item || typeof item !== 'object') continue;
        const nom = String(item.nom || '').trim().slice(0, 42);
        if (!nom) continue;
        const rawSous = Array.isArray(item.sous) ? item.sous : [];
        const pos = String(rawSous[0] || 'Acquis').trim().slice(0, 28) || 'Acquis';
        const neg = String(rawSous[1] || 'En cours').trim().slice(0, 28) || 'En cours';
        const rawGrp = String(item.groupe || '').trim().toLowerCase();
        const groupe = (rawGrp === 'indiv' || rawGrp === 'collectif' || rawGrp === 'processus') ? rawGrp : 'processus';
        cleaned.push({ nom, sous: [pos, neg], groupe });
    }
    return cleaned.length > 0 ? cleaned : fallbackList;
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const body = req.body || {};
        const typeGrille = String(body.typeGrille || 'observation').trim();
        const aps = String(body.aps || '').trim().slice(0, 60);
        const niveau = String(body.niveau || '').trim().slice(0, 30);
        const nomProf = String(body.nomProf || '').trim().slice(0, 120);
        const etablissement = String(body.etablissement || '').trim().slice(0, 140);
        const classe = String(body.classe || '').trim().slice(0, 50);
        const anneeScolaire = String(body.anneeScolaire || '').trim().slice(0, 30);

        const parsedNb = parseInt(body.nbEleves, 10);
        const nbEleves = Number.isFinite(parsedNb) ? Math.max(1, Math.min(60, parsedNb)) : 35;
        const includeObsCol = Boolean(body.includeObsCol);

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isObs = typeGrille === 'observation';
        const titre = isObs ? "Grille d'Observation" : "Grille d'Évaluation";
        const groupeAPS = getGroupeAPS(aps);

        const defaultCriteres = buildDefaultCriteres(aps, niveau);
        const criteres = sanitizeCustomCriteres(body.customCriteres, defaultCriteres);

        const hasDualGroups = criteres.some(c => c.groupe === 'indiv') && criteres.some(c => c.groupe === 'collectif');
        const isDuelsRenvoi = ['Badminton', 'Tennis de table'].includes(aps);
        const sportsCollectifs = ['Handball', 'Football', 'Basketball', 'Basketball 3x3', 'Rugby', 'Volleyball'];
        const isSportCollectif = sportsCollectifs.includes(aps);
        const isGym = aps === 'Gymnastique';
        const normNiv = String(niveau || '').toUpperCase() === '1BAC' ? '1AB' : (String(niveau || '').toUpperCase() === '2BAC' ? '2AB' : String(niveau || '').toUpperCase());
        const gymOp = (isGym && GYM_CONTRATS_OP && GYM_CONTRATS_OP[normNiv]) ? GYM_CONTRATS_OP[normNiv] : null;
        const gymCompMax = gymOp ? (gymOp.compExig !== undefined ? (gymOp.compExig + gymOp.compQual) : 2) : 2;

        // Couleurs Modern Atlas
        const COLOR_PRIMARY = '#3347D6';       // Majorelle principal
        const COLOR_PRIMARY_DEEP = '#2434A8';  // Majorelle Deep
        const COLOR_PRIMARY_LIGHT = '#EAF0FF'; // Sky clair
        const COLOR_SECONDARY = '#0B7A99';     // Cyan Deep
        const COLOR_SECONDARY_LIGHT = '#E6F6FA';
        const COLOR_ACCENT = '#2434A8';        // Majorelle Deep

        const safeAps = escapeHtml(aps);
        const safeNiveau = escapeHtml(niveau);
        const safeGroupeAPS = escapeHtml(groupeAPS);
        const safeClasse = escapeHtml(classe);
        const safeNomProf = escapeHtml(nomProf);
        const safeEtab = escapeHtml(etablissement);
        const safeAnnee = escapeHtml(anneeScolaire);

        // ==================== Construction des en-têtes ====================
        let headGroupRow = '';
        let headMain = '';
        let headSub = '';
        let colCount = 0;

        if (hasDualGroups) {
            // Regrouper en maintenant l'ordre Indiv -> Collectif -> autres
            const indivCrits = criteres.filter(c => c.groupe === 'indiv');
            const collCrits = criteres.filter(c => c.groupe === 'collectif');
            const otherCrits = criteres.filter(c => c.groupe !== 'indiv' && c.groupe !== 'collectif');

            const indivSubSpan = indivCrits.reduce((acc, c) => acc + c.sous.length, 0);
            const collSubSpan = collCrits.reduce((acc, c) => acc + c.sous.length, 0);
            const otherSubSpan = otherCrits.reduce((acc, c) => acc + c.sous.length, 0);

            if (indivSubSpan > 0) {
                const labelIndiv = isDuelsRenvoi ? 'Volet Technique (Individuel)' : 'Capacité Individuelle';
                headGroupRow += `<th colspan="${indivSubSpan}" style="background:${COLOR_PRIMARY_DEEP};color:#fff;font-size:6.5pt;text-align:center;padding:3px 4px;border:1px solid #000;font-weight:bold;">${labelIndiv}</th>`;
            }
            if (collSubSpan > 0) {
                const labelColl = isDuelsRenvoi ? 'Volet Tactique (Renvoi)' : 'Capacité Collective';
                headGroupRow += `<th colspan="${collSubSpan}" style="background:${COLOR_SECONDARY};color:#fff;font-size:6.5pt;text-align:center;padding:3px 4px;border:1px solid #000;font-weight:bold;">${labelColl}</th>`;
            }
            if (otherSubSpan > 0) {
                headGroupRow += `<th colspan="${otherSubSpan}" style="background:#475569;color:#fff;font-size:6.5pt;text-align:center;padding:3px 4px;border:1px solid #000;font-weight:bold;">Critères Complémentaires</th>`;
            }
        }

        const orderedCriteres = hasDualGroups
            ? [
                ...criteres.filter(c => c.groupe === 'indiv'),
                ...criteres.filter(c => c.groupe === 'collectif'),
                ...criteres.filter(c => c.groupe !== 'indiv' && c.groupe !== 'collectif')
              ]
            : criteres;

        const critFont = orderedCriteres.length > 6 ? '6pt' : '7pt';
        const subFont = orderedCriteres.length > 6 ? '5.2pt' : '6pt';

        orderedCriteres.forEach(c => {
            const isColl = hasDualGroups && c.groupe === 'collectif';
            const hdrBg = isColl ? COLOR_SECONDARY : COLOR_PRIMARY;
            const subBg = isColl ? COLOR_SECONDARY_LIGHT : COLOR_PRIMARY_LIGHT;
            headMain += `<th colspan="${c.sous.length}" style="background:${hdrBg};color:#fff;font-size:${critFont};text-align:center;padding:4px 2px;border:1px solid #000;font-weight:bold;">${escapeHtml(c.nom)}</th>`;
            c.sous.forEach(s => {
                headSub += `<td style="background:${subBg};color:#0E1633;font-size:${subFont};text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;">${escapeHtml(s)}</td>`;
                colCount++;
            });
        });

        const headerRowspan = hasDualGroups ? 3 : 2;
        const noteColsCount = isGym ? 6 : 5;
        const extraColsCount = !isObs ? noteColsCount : (includeObsCol ? 1 : 0);

        if (!isObs) {
            // GRILLE ÉVALUATION: 5 colonnes NOTE (6 pour Gymnastique Annexe 4)
            const noteTargetRow = hasDualGroups ? 'headGroupRow' : 'headMain';
            const noteTopHtml = `<th rowspan="${hasDualGroups ? 2 : 1}" colspan="${noteColsCount}" style="background:${COLOR_ACCENT};color:#fff;font-size:7.5pt;text-align:center;padding:4px;border:1px solid #000;font-weight:bold;">NOTE${gymOp ? ` (${escapeHtml(gymOp.contrat)})` : ''}</th>`;
            if (noteTargetRow === 'headGroupRow') {
                headGroupRow += noteTopHtml;
            } else {
                headMain += noteTopHtml;
            }
            if (isGym && gymOp) {
                headSub += `<td style="background:#F8FAFC;font-size:5.3pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4%;">Diff.<br>/${gymOp.diffMax}</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.3pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4%;">Comp.<br>/${gymCompMax}</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.3pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4%;">Exéc.<br>/${gymOp.execMax}</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.3pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4%;">Conc.<br>/${gymOp.concep}</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.3pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4%;">Comp.<br>/${gymOp.comp}</td>`;
            } else if (isSportCollectif) {
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Individ.</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Équipe</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Concept.</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Comport.</td>`;
            } else {
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Produit</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Process.</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Concept.</td>`;
                headSub += `<td style="background:#F8FAFC;font-size:5.5pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:600;width:4.5%;">Comport.</td>`;
            }
            headSub += `<td style="background:${COLOR_PRIMARY_LIGHT};color:#0E1633;font-size:6.2pt;text-align:center;padding:3px 2px;border:1px solid #000;font-weight:bold;width:5%;">FINALE</td>`;
        } else if (includeObsCol) {
            const obsTh = `<th rowspan="${headerRowspan}" style="background:${COLOR_ACCENT};color:#fff;font-size:6.5pt;width:13%;border:1px solid #000;text-align:center;font-weight:bold;">Observations</th>`;
            if (hasDualGroups) {
                headGroupRow += obsTh;
            } else {
                headMain += obsTh;
            }
        }

        const numWidth = isObs ? '4%' : '3.5%';
        const nameWidth = isObs ? '18%' : '15%';

        function buildTableHead(bgNumName) {
            const numTh = `<th rowspan="${headerRowspan}" style="background:${bgNumName};color:#fff;width:${numWidth};font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">N°</th>`;
            const nameTh = `<th rowspan="${headerRowspan}" colspan="2" style="background:${bgNumName};color:#fff;width:${nameWidth};font-size:7pt;border:1px solid #000;text-align:center;font-weight:bold;">Nom et Prénom</th>`;
            if (hasDualGroups) {
                return `
                    <tr>${numTh}${nameTh}${headGroupRow}</tr>
                    <tr>${headMain}</tr>
                    <tr>${headSub}</tr>
                `;
            }
            return `
                <tr>${numTh}${nameTh}${headMain}</tr>
                <tr>${headSub}</tr>
            `;
        }

        // ==================== Génération des lignes (nbEleves) ====================
        function buildRows(count, rowHeightPx) {
            let out = '';
            for (let i = 1; i <= count; i++) {
                const bgColor = i % 2 === 0 ? '#F8FAFC' : '#ffffff';
                out += `<tr style="height:${rowHeightPx}px;">`;
                out += `<td style="text-align:center;font-size:8pt;background:${bgColor};border:1px solid #000;font-weight:bold;width:${numWidth};">${i}</td>`;
                out += `<td colspan="2" style="background:${bgColor};border:1px solid #000;width:${nameWidth};"></td>`;
                for (let c = 0; c < colCount; c++) {
                    out += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
                }
                for (let e = 0; e < extraColsCount; e++) {
                    out += `<td style="background:${bgColor};border:1px solid #000;"></td>`;
                }
                out += '</tr>';
            }
            return out;
        }

        const docRowHeight = nbEleves <= 35 ? 14 : (nbEleves <= 45 ? 12 : 10);
        const rows = buildRows(nbEleves, docRowHeight);
        const previewCount = Math.min(5, nbEleves);
        let previewRows = buildRows(previewCount, 20);
        if (nbEleves > previewCount) {
            previewRows += `<tr style="height:20px;">`;
            previewRows += `<td colspan="${3 + colCount + extraColsCount}" style="text-align:center;font-size:8pt;background:#F8FAFC;border:1px solid #000;color:#55607A;">... ${nbEleves - previewCount} lignes supplémentaires ...</td>`;
            previewRows += '</tr>';
        }

        // ==================== HTML DISPLAY (Site web) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:960px;margin:0 auto;color:#0E1633;">
    <!-- EN-TÊTE -->
    <div style="background:linear-gradient(135deg, ${COLOR_PRIMARY} 0%, #6D4AFF 100%);color:white;padding:18px 22px;border-radius:12px;margin-bottom:18px;box-shadow:0 4px 15px rgba(51,71,214,0.2);">
        <h1 style="margin:0 0 8px 0;font-size:1.35rem;font-weight:700;color:#fff;">📋 ${titre} — ${safeAps}</h1>
        <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:0.88rem;opacity:0.95;color:#fff;">
            <span><strong>⚽ APS:</strong> ${safeAps}</span>
            <span><strong>📊 Niveau:</strong> ${safeNiveau}</span>
            <span><strong>👥 Effectif:</strong> ${nbEleves} élèves</span>
            <span><strong>🏷️ Classe:</strong> ${safeClasse || '___'}</span>
            <span><strong>🏫 Établissement:</strong> ${safeEtab || '___'}</span>
        </div>
    </div>

    <!-- TABLEAU DE LA GRILLE (Aperçu) -->
    <div style="background:#fff;border:1px solid #E4E2DA;border-radius:12px;padding:16px 20px;margin-bottom:18px;box-shadow:0 2px 8px rgba(0,0,0,0.05);overflow-x:auto;">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 12px 0;font-size:0.98rem;">📊 Aperçu de la grille (${previewCount} premières lignes sur ${nbEleves})</h3>
        <table style="width:100%;border-collapse:collapse;font-size:8pt;">
            ${buildTableHead(COLOR_PRIMARY_DEEP)}
            ${previewRows}
        </table>
    </div>

    <!-- STRUCTURE DE LA GRILLE -->
    <div style="background:#fff;border:1px solid #E4E2DA;border-radius:12px;padding:16px 20px;margin-bottom:18px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 12px 0;font-size:0.98rem;">📋 Structure des critères (${orderedCriteres.length} critères — alignée au Calculateur)</h3>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${orderedCriteres.map(c => {
                const isColl = hasDualGroups && c.groupe === 'collectif';
                const badgeTxt = hasDualGroups ? (isColl ? '<span style="font-size:0.68rem;color:#0B7A99;font-weight:700;">Collectif</span> · ' : '<span style="font-size:0.68rem;color:#3347D6;font-weight:700;">Indiv.</span> · ') : '';
                return `
                <div style="background:#F8FAFC;border:1px solid #E4E2DA;border-radius:8px;padding:8px 12px;min-width:120px;">
                    ${badgeTxt}<strong style="color:${isColl ? COLOR_SECONDARY : COLOR_PRIMARY};font-size:0.86rem;">${escapeHtml(c.nom)}</strong><br>
                    <span style="font-size:0.76rem;color:#55607A;">${escapeHtml(c.sous.join(' | '))}</span>
                </div>`;
            }).join('')}
            ${!isObs ? `
                <div style="background:#F8FAFC;border:1px solid #E4E2DA;border-radius:8px;padding:8px 12px;min-width:180px;">
                    <strong style="color:${COLOR_ACCENT};font-size:0.86rem;">NOTE</strong><br>
                    <span style="font-size:0.76rem;color:#55607A;">${(isGym && gymOp) ? `Diff.(/${gymOp.diffMax}) | Comp.(/${gymCompMax}) | Exéc.(/${gymOp.execMax}) | Concept.(/${gymOp.concep}) | Comport.(/${gymOp.comp}) | FINALE` : (isSportCollectif ? 'Individ. | Équipe | Concept. | Comport. | FINALE' : 'Produit | Process. | Concept. | Comport. | FINALE')}</span>
                </div>
            ` : (includeObsCol ? `
                <div style="background:#F8FAFC;border:1px solid #E4E2DA;border-radius:8px;padding:8px 12px;">
                    <strong style="color:${COLOR_ACCENT};font-size:0.86rem;">Observations</strong><br>
                    <span style="font-size:0.76rem;color:#55607A;">Remarques libres</span>
                </div>
            ` : '')}
        </div>
    </div>

    <!-- INFORMATIONS -->
    <div style="background:#fff;border:1px solid #E4E2DA;border-radius:12px;padding:16px 20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="color:${COLOR_PRIMARY};margin:0 0 10px 0;font-size:0.98rem;">📝 Informations</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.88rem;">
            <p style="margin:4px 0;"><strong>Type:</strong> ${isObs ? "Grille d'observation (N° + Nom & Prénom + Critères uniquement)" : "Grille d'évaluation sommative (/20)"}</p>
            <p style="margin:4px 0;"><strong>Nombre de lignes:</strong> ${nbEleves} élèves</p>
            <p style="margin:4px 0;"><strong>Critères:</strong> ${orderedCriteres.length} critères (${colCount} colonnes d'observation)</p>
            <p style="margin:4px 0;"><strong>Format:</strong> A4 Portrait</p>
        </div>
        ${!isObs ? `
            <div style="margin-top:12px;padding:10px 14px;background:#F8FAFC;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};">
                <strong style="color:${COLOR_PRIMARY};">📌 Signification des notes:</strong><br>
                <div style="font-size:0.83rem;margin-top:6px;line-height:1.6;">
                    ${(isGym && gymOp) ? `
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Difficultés (/${gymOp.diffMax})</b></span> = Contrat ${escapeHtml(gymOp.detail)} (rempl. inf. = 0,25 pt)<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Composition (/${gymCompMax})</b></span> = ${gymOp.compExig !== undefined ? `Exigences 3 fam. (${gymOp.compExig}) + Qualité d'enchaîn. (${gymOp.compQual})` : `4 fam. (${gymOp.compFam}) + Série (${gymOp.compSerie} : G 2 acrob. / F 3 chorég.)`}<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Exécution (/${gymOp.execMax})</b></span> = Analytique (-0,1/-0,2/-0,3/-0,5) ou Globale (1/1, 3/4, 1/2, 1/4, 0) → Procédural /${gymOp.procTotal}
                    ` : (isSportCollectif ? `
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Individuel</b></span> = Performance personnelle (technique, maîtrise)<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Équipe</b></span> = Contribution collective (coopération, organisation)
                    ` : `
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Produit</b></span> = Résultat atteint (performance mesurée)<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Processus</b></span> = Démarche suivie (technique, organisation)
                    `)}<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Conceptuelle</b></span> = Connaissances réglementaires et tactiques<br>
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 8px;border-radius:4px;margin:2px;"><b>Comportementale</b></span> = Savoir-être (engagement, fair-play, coopération)<br>
                    <span style="display:inline-block;background:#FEF3C7;padding:2px 8px;border-radius:4px;margin:2px;"><b>FINALE</b></span> = Note globale /20 conforme aux OP 2007/2009
                </div>
            </div>
        ` : `
            <div style="margin-top:12px;padding:10px 14px;background:#F8FAFC;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};">
                <strong style="color:${COLOR_PRIMARY};">📌 Légende d'observation:</strong><br>
                <div style="font-size:0.83rem;margin-top:6px;">
                    <span style="display:inline-block;background:${COLOR_PRIMARY_LIGHT};padding:2px 10px;border-radius:4px;margin:3px;">✓</span> Critère maîtrisé / observé &nbsp;
                    <span style="display:inline-block;background:#FEF3C7;padding:2px 10px;border-radius:4px;margin:3px;">○</span> En cours d'acquisition &nbsp;
                    <span style="display:inline-block;background:#fff;padding:2px 10px;border-radius:4px;margin:3px;border:1px solid #ccc;">✗</span> Non maîtrisé
                </div>
            </div>
        `}
    </div>
</div>`;

        // ==================== HTML WORD/PDF (A4 Portrait) ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>${titre} - ${safeAps}</title>
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
    margin: 0.7cm;
}
@page Section1 {
    size: 210mm 297mm;
    mso-page-orientation: portrait;
    margin: 0.7cm;
}
div.Section1 {
    page: Section1;
}
body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 8pt;
    margin: 0;
    padding: 0;
    color: #0E1633;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #000;
    padding: 2.5px 3px;
}
.main-title {
    font-size: 15pt;
    font-weight: bold;
    text-align: center;
    color: ${COLOR_PRIMARY};
    margin: 6px 0 3px 0;
}
.sub-title {
    font-size: 10pt;
    text-align: center;
    color: ${COLOR_SECONDARY};
    margin: 0 0 10px 0;
    font-weight: bold;
}
.info-table {
    margin-bottom: 10px;
}
.info-table td {
    border: none;
    font-size: 8.5pt;
    padding: 3px 5px;
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
<p class="sub-title">${safeAps} - Niveau: ${safeNiveau} - ${safeGroupeAPS}</p>

<table class="info-table">
<tr>
<td style="width:32%;"><b>APS:</b> ${safeAps}</td>
<td style="width:24%;"><b>Classe:</b> ${safeClasse || '____________'}</td>
<td style="width:16%;"><b>Niveau:</b> ${safeNiveau}</td>
<td style="width:28%;text-align:right;"><b>Année:</b> ${safeAnnee || '____-____'} &nbsp; <b>Date:</b> ___/___/____</td>
</tr>
<tr>
<td colspan="2"><b>Professeur:</b> ${safeNomProf || '________________________'}</td>
<td colspan="2"><b>Établissement:</b> ${safeEtab || '________________________'}</td>
</tr>
</table>

<table>
${buildTableHead(COLOR_ACCENT)}
${rows}
</table>

<table style="border:none;margin-top:10px;">
<tr>
<td style="border:none;font-size:7.5pt;width:65%;vertical-align:top;">
<b>Légende:</b><br>
${isObs
    ? '<span style="background:#EAF0FF;padding:1px 6px;">✓</span> Critère maîtrisé &nbsp;&nbsp; <span style="background:#FEF3C7;padding:1px 6px;">○</span> En cours &nbsp;&nbsp; <span style="background:#FEE2E2;padding:1px 6px;">✗</span> Non maîtrisé'
    : (isGym && gymOp)
        ? `<b>Diff. (/${gymOp.diffMax})</b> = ${escapeHtml(gymOp.detail)} &nbsp;·&nbsp; <b>Comp. (/${gymCompMax})</b> = ${gymOp.compExig !== undefined ? `3 fam. (${gymOp.compExig}) + Enchaîn. (${gymOp.compQual})` : `4 fam. (${gymOp.compFam}) + Série (${gymOp.compSerie})`} &nbsp;·&nbsp; <b>Exéc. (/${gymOp.execMax})</b> = -0,1/-0,2/-0,3/-0,5 ou globale<br><b>Conc. (/${gymOp.concep})</b> &nbsp;·&nbsp; <b>Comp. (/${gymOp.comp})</b> &nbsp;·&nbsp; <b>FINALE</b> = Note /20`
        : isSportCollectif
            ? '<b>Individ.</b> = Performance personnelle &nbsp;·&nbsp; <b>Équipe</b> = Contribution collective<br><b>Concept.</b> = Connaissances &nbsp;·&nbsp; <b>Comport.</b> = Savoir-être &nbsp;·&nbsp; <b>FINALE</b> = Note /20'
            : '<b>Produit</b> = Résultat (performance) &nbsp;·&nbsp; <b>Process.</b> = Démarche technique<br><b>Concept.</b> = Connaissances &nbsp;·&nbsp; <b>Comport.</b> = Savoir-être &nbsp;·&nbsp; <b>FINALE</b> = Note /20'}
</td>
<td style="border:none;text-align:right;font-size:8.5pt;vertical-align:bottom;">
<b>Signature du professeur:</b><br><br>
____________________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:7pt;color:#55607A;margin-top:8px;">
Document généré par Prof EPS Maroc - Conforme aux Orientations Pédagogiques du MEN
</p>

</div>
</body>
</html>`;

        const safeFileAps = aps.replace(/[^a-zA-Z0-9À-ÿ_-]+/g, '_').replace(/^_+|_+$/g, '') || 'APS';
        const safeFileNiv = niveau.replace(/[^a-zA-Z0-9_-]+/g, '_') || 'EPS';
        const filename = `Grille_${isObs ? 'Observation' : 'Evaluation'}_${safeFileAps}_${safeFileNiv}.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
            filename,
            typeGrille: isObs ? 'observation' : 'evaluation',
            groupeAPS,
            nbEleves,
            criteres: orderedCriteres
        });

    } catch (error) {
        console.error('Erreur generer-grille:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
