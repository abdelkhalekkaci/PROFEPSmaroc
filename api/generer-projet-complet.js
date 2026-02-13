// ============================================================================
// API PROJET COMPLET - generer-projet-complet.js
// ============================================================================
// Génère un document Word unique contenant :
// - Page 1 : Projet de cycle
// - Pages suivantes : Fiches de séance (1 par page)
// Format: A4 PAYSAGE (297x210mm)
// Compatible: Word 2003, 2007, 2010, 2013, 2016, 2019, 365
// ============================================================================

const { OTI, OTC, VOCABULAIRE_APS, getSituationReference, getGroupeAPS, FALLBACKS, getSchema, OBJECTIFS_CYCLE } = require('./data/references.js');
const { getSituations } = require('./data/situations_fiches.js');

// Fonction pour obtenir les objectifs du cycle
const getObjectifsCycle = (aps, niveau, niveauEleves, nombreSeances) => {
    const cycleData = OBJECTIFS_CYCLE[aps] || OBJECTIFS_CYCLE['Football'];
    let objectifs = [];
    const nb = parseInt(nombreSeances) || 10;
    
    if (cycleData.commun?.S1) objectifs.push(cycleData.commun.S1);
    if (cycleData.commun?.S2) objectifs.push(cycleData.commun.S2);
    
    let niveauKey = niveauEleves;
    if (aps === 'Gymnastique' && ['1AC', '2AC', '3AC', 'TC', '1AB', '2AB'].includes(niveau)) {
        niveauKey = niveau;
    }
    
    const seancesNiveau = cycleData[niveauKey] || cycleData['moyen'] || cycleData['debutant'] || [];
    const nbSeancesApprentissage = Math.max(0, nb - 3);
    
    if (seancesNiveau?.length > 0) {
        for (let i = 0; i < nbSeancesApprentissage; i++) {
            const index = Math.floor(i * seancesNiveau.length / nbSeancesApprentissage);
            objectifs.push(seancesNiveau[Math.min(index, seancesNiveau.length - 1)]);
        }
    } else {
        for (let i = 0; i < nbSeancesApprentissage; i++) {
            objectifs.push("Consolider les acquis techniques et tactiques.");
        }
    }
    
    if (cycleData.commun?.S12) objectifs.push(cycleData.commun.S12);
    
    while (objectifs.length < nb) {
        objectifs.push("Consolider les acquis techniques et tactiques.");
    }
    
    return objectifs.slice(0, nb);
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

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

        const objectifs = getObjectifsCycle(aps, niveau, nivEleves, nb);

        // Couleurs
        const COLOR_PRIMARY = '#006233';
        const COLOR_PRIMARY_LIGHT = '#e8f5e9';
        const COLOR_SECONDARY = '#4a8b5c';
        const COLOR_BLUE = '#1e3a5f';

        // ==================== GÉNÉRATION DU PROJET DE CYCLE (PAGE 1) ====================
        let projetRows = '';
        for (let i = 0; i < nb; i++) {
            let phase, phaseColor;
            if (i === 0) { phase = 'Éval. diagnostique'; phaseColor = '#f5f5f5'; }
            else if (i === nb - 1) { phase = 'Éval. terminale'; phaseColor = '#e8eef4'; }
            else if (i < nb / 3) { phase = 'Découverte'; phaseColor = '#fafafa'; }
            else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseColor = '#f5f5f5'; }
            else { phase = 'Consolidation'; phaseColor = '#fafafa'; }

            projetRows += `<tr>
<td style="text-align:center;background:${phaseColor};font-size:7pt;font-weight:bold;border:1px solid #000;">${phase}</td>
<td style="text-align:center;font-weight:bold;font-size:9pt;background:#f5f5f5;border:1px solid #000;">${i + 1}</td>
<td style="font-size:7.5pt;padding:4px 8px;border:1px solid #000;line-height:1.4;">${objectifs[i]}</td>
</tr>`;
        }

        const projetHtml = `
<p style="text-align:center;font-size:16pt;font-weight:bold;color:${COLOR_PRIMARY};margin:8px 0 4px 0;">📊 PROJET PÉDAGOGIQUE DE CYCLE</p>
<p style="text-align:center;font-size:11pt;color:${COLOR_SECONDARY};margin:0 0 12px 0;">${aps} - ${niveau} - Niveau élèves: ${nivTxt}</p>

<table style="border:none;margin-bottom:8px;">
<tr>
<td style="border:none;width:33%;text-align:left;font-size:9pt;"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td style="border:none;width:34%;text-align:center;font-size:9pt;"><b>Établissement:</b> ${etablissement || '________________________'}</td>
<td style="border:none;width:33%;text-align:right;font-size:9pt;"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table>
<colgroup>
<col style="width:10%"><col style="width:12%"><col style="width:4%"><col style="width:12%">
<col style="width:6%"><col style="width:5%"><col style="width:9%"><col style="width:8%">
<col style="width:7%"><col style="width:5%">
</colgroup>
<tr>
<td style="background:#e8e8e8;font-weight:bold;text-align:center;font-size:7.5pt;">GROUPE APS</td>
<td style="text-align:center;font-size:8pt;">${groupeAPS}</td>
<td style="background:#e8e8e8;font-weight:bold;text-align:center;font-size:7.5pt;">APS</td>
<td style="text-align:center;font-size:9pt;font-weight:bold;color:${COLOR_PRIMARY};">${aps}</td>
<td style="background:#e8e8e8;font-weight:bold;text-align:center;font-size:7.5pt;">NIVEAU</td>
<td style="text-align:center;font-size:8pt;">${niveau}</td>
<td style="background:#e8e8e8;font-weight:bold;text-align:center;font-size:7.5pt;">NIV. ÉLÈVES</td>
<td style="text-align:center;font-weight:bold;color:${COLOR_PRIMARY};">${nivTxt}</td>
<td style="background:#e8e8e8;font-weight:bold;text-align:center;font-size:7.5pt;">SÉANCES</td>
<td style="text-align:center;font-size:10pt;font-weight:bold;">${nb}</td>
</tr>
</table>

<table>
<colgroup><col style="width:13%"><col style="width:87%"></colgroup>
<tr>
<td style="background:#f5f5f5;font-weight:bold;font-size:7.5pt;padding:5px 8px;">OTI</td>
<td style="font-size:7.5pt;line-height:1.35;padding:5px 8px;">${oti}</td>
</tr>
<tr>
<td style="background:#f5f5f5;font-weight:bold;font-size:7.5pt;padding:5px 8px;">OTC</td>
<td style="font-size:7.5pt;line-height:1.35;padding:5px 8px;">${otc}</td>
</tr>
<tr>
<td style="background:#f5f5f5;font-weight:bold;font-size:7.5pt;padding:5px 8px;">SITUATION DE RÉFÉRENCE</td>
<td style="font-size:7.5pt;font-weight:bold;color:${COLOR_PRIMARY};padding:5px 8px;">${sitRef}</td>
</tr>
</table>

<table>
<colgroup><col style="width:12%"><col style="width:4%"><col style="width:84%"></colgroup>
<tr>
<td colspan="3" style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;font-size:10pt;text-align:center;padding:8px;">PROGRESSION PÉDAGOGIQUE DU CYCLE</td>
</tr>
<tr>
<th style="background:${COLOR_PRIMARY};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px;">PHASE</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px;">N°</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px;">OBJECTIF OPÉRATIONNEL DE LA SÉANCE</th>
</tr>
${projetRows}
</table>

<table style="border:none;margin-top:12px;">
<tr>
<td style="border:none;width:60%;text-align:left;font-size:7pt;">
<b>Légende:</b> 🟠 Éval. diagnostique | 🔵 Découverte | 🟢 Apprentissage | 🟣 Consolidation | 🔴 Éval. terminale
</td>
<td style="border:none;width:40%;text-align:right;font-size:8pt;">
<b>Signature:</b> ____________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:7pt;color:#666;margin-top:10px;">
Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - MEN Maroc
</p>`;

        // ==================== GÉNÉRATION DES FICHES DE SÉANCE ====================
        let fichesHtml = '';
        
        for (let seanceNum = 1; seanceNum <= nb; seanceNum++) {
            const objectifSeance = objectifs[seanceNum - 1];
            
            const situationsRef = getSituations(aps, objectifSeance, seanceNum);
            const isTest = situationsRef && (situationsRef.isTestObservation || situationsRef.isTestBilan);
            
            const situationsContext = situationsRef ? (isTest ? `
SÉANCE SPÉCIALE ${situationsRef.isTestObservation ? 'TEST D\'OBSERVATION' : 'TEST BILAN'}
ÉCHAUFFEMENT: ${situationsRef.echauffement}
SITUATION UNIQUE - "${situationsRef.situation1.titre}":
- But: ${situationsRef.situation1.but}
- Organisation: ${situationsRef.situation1.organisation}
- Déroulement: ${situationsRef.situation1.deroulement}
- Consignes: ${situationsRef.situation1.consignes}
- Variantes: ${situationsRef.situation1.variantes}
CRITÈRES DE RÉALISATION: ${situationsRef.criteresRealisation}
CRITÈRES DE RÉUSSITE: ${situationsRef.criteresReussite}` : `
ÉCHAUFFEMENT: ${situationsRef.echauffement}
SITUATION 1 - "${situationsRef.situation1.titre}": But: ${situationsRef.situation1.but} | Organisation: ${situationsRef.situation1.organisation}
SITUATION 2 - "${situationsRef.situation2.titre}": But: ${situationsRef.situation2.but} | Organisation: ${situationsRef.situation2.organisation}
CRITÈRES: ${situationsRef.criteresRealisation} | ${situationsRef.criteresReussite}`) : '';

            const prompt = `Tu es un expert EPS. Génère une fiche de séance pour ${aps}, niveau ${niveau}, séance ${seanceNum}/${nb}.
OBJECTIF: "${objectifSeance}"
${situationsContext}

Réponds UNIQUEMENT avec ces clés (format strict):
ECHAUFFEMENT_SPECIFIQUE: [3 exercices avec durées]
BUT_PHASE_FONDAMENTALE: [1-2 phrases]
SITUATION1_TITRE: [titre court]
SITUATION1_BUT: [ce que l'élève doit FAIRE]
SITUATION1_ORGANISATION: [joueurs, terrain, matériel]
SITUATION1_DEROULEMENT: [4-5 phrases]
SITUATION1_CONSIGNES: [4 consignes]
SITUATION1_VARIANTES: [simplifier/complexifier]
${!isTest ? `SITUATION2_TITRE: [titre]
SITUATION2_BUT: [action]
SITUATION2_ORGANISATION: [organisation]
SITUATION2_DEROULEMENT: [déroulement]
SITUATION2_CONSIGNES: [consignes]
SITUATION2_VARIANTES: [variantes]
` : ''}CRITERES_REALISATION: [4 critères COMMENT faire]
CRITERES_REUSSITE: [4 critères MESURABLES]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 2500,
                    temperature: 0.7
                })
            });

            const data = await groqResp.json();
            const contenu = data.choices?.[0]?.message?.content || '';

            const extract = (key) => {
                const regex = new RegExp(`(?:\\*\\*|##)?\\s*${key}(?:\\*\\*|##)?\\s*:?\\s*([\\s\\S]*?)(?=\\n\\s*(?:\\*\\*|##)?\\s*[A-Z][A-Z0-9_]+(?:\\*\\*|##)?\\s*:|$)`, 'i');
                const match = contenu.match(regex);
                return match ? match[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim() : '';
            };

            let echaufSpec = extract('ECHAUFFEMENT_SPECIFIQUE');
            let butFonda = extract('BUT_PHASE_FONDAMENTALE');
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

            const fb = FALLBACKS[aps] || FALLBACKS['Handball'];
            const sitRefData = situationsRef;
            
            if (!echaufSpec || echaufSpec.length < 20) echaufSpec = sitRefData ? sitRefData.echauffement : fb.echauf;
            if (!butFonda || butFonda.length < 10) butFonda = isTest ? (situationsRef?.isTestObservation ? 'Identifier le niveau initial des élèves' : 'Évaluer les progrès réalisés') : `Atteindre l'objectif: ${objectifSeance}`;
            if (!s1Titre || s1Titre.length < 5) s1Titre = sitRefData ? sitRefData.situation1.titre : fb.s1t;
            if (!s1But || s1But.length < 10) s1But = sitRefData ? sitRefData.situation1.but : fb.s1b;
            if (!s1Orga || s1Orga.length < 20) s1Orga = sitRefData ? sitRefData.situation1.organisation : fb.s1o;
            if (!s1Deroul || s1Deroul.length < 50) s1Deroul = sitRefData ? sitRefData.situation1.deroulement : fb.s1d;
            if (!s1Consignes || s1Consignes.length < 30) s1Consignes = sitRefData ? sitRefData.situation1.consignes : fb.s1c;
            if (!s1Variantes || s1Variantes.length < 20) s1Variantes = sitRefData ? sitRefData.situation1.variantes : fb.s1v;
            
            if (!isTest) {
                if (!s2Titre || s2Titre.length < 5) s2Titre = sitRefData?.situation2 ? sitRefData.situation2.titre : fb.s2t;
                if (!s2But || s2But.length < 10) s2But = sitRefData?.situation2 ? sitRefData.situation2.but : fb.s2b;
                if (!s2Orga || s2Orga.length < 20) s2Orga = sitRefData?.situation2 ? sitRefData.situation2.organisation : fb.s2o;
                if (!s2Deroul || s2Deroul.length < 30) s2Deroul = sitRefData?.situation2 ? sitRefData.situation2.deroulement : fb.s2d;
                if (!s2Consignes || s2Consignes.length < 30) s2Consignes = sitRefData?.situation2 ? sitRefData.situation2.consignes : fb.s2c;
                if (!s2Variantes || s2Variantes.length < 20) s2Variantes = sitRefData?.situation2 ? sitRefData.situation2.variantes : fb.s2v;
            }
            
            if (!critReal || critReal.length < 50) critReal = sitRefData ? sitRefData.criteresRealisation : fb.cr;
            if (!critReuss || critReuss.length < 50) critReuss = sitRefData ? sitRefData.criteresReussite : fb.cs;

            // HTML de la fiche avec saut de page AVANT (sauf pour la première fiche)
            fichesHtml += `
<br clear="all" style="mso-special-character:line-break;page-break-before:always">

<table style="border:none;margin-bottom:5px;">
<tr>
<td style="border:none;width:25%;font-size:8pt;"><b>Professeur:</b> ${nomProf || '________'}</td>
<td style="border:none;width:30%;text-align:center;font-size:8pt;"><b>Établissement:</b> ${etablissement || '________'}</td>
<td style="border:none;width:20%;text-align:center;font-size:8pt;"><b>Séance:</b> ${seanceNum}/${nb}</td>
<td style="border:none;width:25%;text-align:right;font-size:8pt;"><b>Année:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table>
<tr><td style="text-align:center;font-size:11pt;font-weight:bold;background:${COLOR_BLUE};color:#fff;padding:5px;">FICHE DE SÉANCE EPS - ${aps.toUpperCase()} - SÉANCE ${seanceNum}</td></tr>
</table>

<table>
<tr>
<td style="background:#e8e8e8;font-weight:bold;font-size:7pt;text-align:center;width:8%;">Groupe APS</td>
<td style="width:12%;font-size:7.5pt;text-align:center;">${groupeAPS}</td>
<td style="background:#e8e8e8;font-weight:bold;font-size:7pt;text-align:center;width:5%;">APS</td>
<td style="width:10%;font-size:8pt;text-align:center;font-weight:bold;color:${COLOR_BLUE};">${aps}</td>
<td style="background:#e8e8e8;font-weight:bold;font-size:7pt;text-align:center;width:6%;">Niveau</td>
<td style="width:6%;font-size:7.5pt;text-align:center;">${niveau}</td>
<td style="background:#e8e8e8;font-weight:bold;font-size:7pt;text-align:center;width:6%;">Séance</td>
<td style="width:5%;font-size:9pt;text-align:center;font-weight:bold;">${seanceNum}</td>
</tr>
<tr>
<td style="background:#e8e8e8;font-weight:bold;font-size:6pt;text-align:center;">OTI</td>
<td colspan="7" style="font-size:6pt;line-height:1.2;padding:3px;">${oti}</td>
</tr>
<tr>
<td style="background:#e8e8e8;font-weight:bold;font-size:6pt;text-align:center;">OTC</td>
<td colspan="7" style="font-size:6pt;line-height:1.2;padding:3px;">${otc}</td>
</tr>
<tr>
<td style="background:${COLOR_BLUE};color:#fff;font-weight:bold;font-size:7pt;text-align:center;">OBJECTIF</td>
<td colspan="7" style="background:#e8eef4;font-size:8pt;font-weight:bold;padding:5px;">${objectifSeance}</td>
</tr>
</table>

<table>
<colgroup>
<col style="width:6%"><col style="width:54%"><col style="width:10%"><col style="width:15%"><col style="width:15%">
</colgroup>
<tr>
<th style="background:${COLOR_BLUE};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;">PARTIES</th>
<th style="background:${COLOR_BLUE};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th style="background:${COLOR_BLUE};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;">BUT</th>
<th style="background:${COLOR_BLUE};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;">C. RÉALISATION</th>
<th style="background:${COLOR_BLUE};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;">C. RÉUSSITE</th>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#f5f5f5;font-size:7pt;vertical-align:middle;">INTRO<br>15 min</td>
<td style="font-size:7pt;line-height:1.3;padding:4px;">
<b>• Prise en main:</b> Appel, tenues, présentation objectif, consignes sécurité<br>
<b>• Échauffement général:</b> Course lente, montées genoux, talons-fesses<br>
<b>• Échauffement spécifique:</b> ${echaufSpec}
</td>
<td style="background:#f5f5f5;font-size:7pt;text-align:center;vertical-align:middle;">Préparer le corps</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;">—</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;">—</td>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#f5f5f5;font-size:7pt;vertical-align:middle;">FONDA<br>30 min</td>
<td style="font-size:7pt;line-height:1.25;padding:4px;">
<div style="font-weight:bold;color:${COLOR_BLUE};font-size:7.5pt;margin-bottom:2px;">${isTest ? '◆ SITUATION DE RÉFÉRENCE' : '◆ SITUATION 1'}: ${s1Titre}</div>
<b>But:</b> ${s1But}<br>
<b>Orga:</b> ${s1Orga}<br>
<b>Déroulement:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s1Variantes.replace(/\n/g, ' | ')}
${!isTest ? `<br><br><div style="font-weight:bold;color:#1565c0;font-size:7.5pt;margin-bottom:2px;">◆ SITUATION 2: ${s2Titre}</div>
<b>But:</b> ${s2But}<br>
<b>Orga:</b> ${s2Orga}<br>
<b>Déroulement:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s2Variantes.replace(/\n/g, ' | ')}<br><br>
<div style="font-weight:bold;color:#e65100;font-size:7pt;">◆ SIT. RÉFÉRENCE:</div> ${sitRef}` : ''}
</td>
<td style="background:#f5f5f5;font-size:6pt;text-align:center;vertical-align:middle;padding:3px;">${butFonda}</td>
<td style="font-size:6.5pt;line-height:1.3;padding:3px;">${critReal.replace(/\n/g, '<br>')}</td>
<td style="font-size:6.5pt;line-height:1.3;padding:3px;">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#f5f5f5;font-size:7pt;vertical-align:middle;">FINALE<br>10 min</td>
<td style="font-size:7pt;line-height:1.3;padding:4px;">
<b>•</b> Marche lente avec respiration profonde<br>
<b>•</b> Étirements des groupes musculaires sollicités<br>
<b>•</b> Bilan de séance et rangement du matériel
</td>
<td style="background:#f5f5f5;font-size:7pt;text-align:center;vertical-align:middle;">Retour au calme</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;">—</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;">—</td>
</tr>
</table>`;
        }

        // ==================== ASSEMBLAGE DU DOCUMENT COMPLET ====================
        const htmlComplet = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Projet Complet - ${aps} - ${niveau}</title>
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
    margin-bottom: 6px;
    table-layout: fixed;
}
th, td {
    border: 1px solid #000;
    padding: 4px 6px;
    vertical-align: top;
    word-wrap: break-word;
}
br {
    mso-data-placement: same-cell;
}
</style>
</head>
<body>

${projetHtml}

${fichesHtml}

</body>
</html>`;

        const filename = `Projet_Complet_${aps.replace(/\s+/g, '_')}_${niveau}_${nb}seances.doc`;

        return res.status(200).json({
            success: true,
            html: htmlComplet,
            filename,
            nombreSeances: nb
        });

    } catch (error) {
        console.error('Erreur generer-projet-complet:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
