// ============================================================================
// API PROJETS DE CYCLE - generer-projet.js
// ============================================================================
// Format: A4 PAYSAGE (297x210mm) — 100% préservé
// Palette: Modern Atlas (#3347D6 Majorelle, #2434A8 Majorelle Deep, #EAF0FF Sky, #0B7A99 Cyan Deep)
// Retourne à la fois :
// - html : Projet de Cycle seul (1 page A4 Paysage)
// - completHtml : Projet Complet (Cycle + toutes les Fiches de séance A4 Paysage)
// - pages : Tableau des feuillets A4 Paysage [Cycle, Séance 1, Séance 2, ...] pour le Lecteur PDF Web
// ============================================================================

const { OTI, OTC, VOCABULAIRE_APS, getSituationReference, getGroupeAPS, FALLBACKS, OBJECTIFS_CYCLE } = require('./data/references.js');
const { getSituations } = require('./data/situations_fiches.js');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const body = req.body || {};
        const aps = String(body.aps || '').trim();
        const niveau = String(body.niveau || '').trim();
        const niveauEleves = String(body.niveauEleves || 'moyen').trim();
        const nombreSeances = body.nombreSeances;
        const nomProf = String(body.nomProf || '').trim().slice(0, 120);
        const etablissement = String(body.etablissement || '').trim().slice(0, 140);
        const anneeScolaire = String(body.anneeScolaire || '').trim().slice(0, 30);

        if (!aps || !niveau) {
            return res.status(400).json({ success: false, error: 'APS et niveau requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const nb = Math.min(16, Math.max(6, parseInt(nombreSeances, 10) || 10));
        const nivEleves = niveauEleves || 'moyen';
        const nivTxt = { 'debutant': 'Débutant', 'moyen': 'Moyen', 'avance': 'Avancé', 'elite': 'Expert' }[nivEleves] || 'Moyen';

        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = getSituationReference(aps, isCollege);
        const groupeAPS = getGroupeAPS(aps);

        // Récupérer les objectifs depuis la structure complète avec commun + niveaux
        const cycleData = OBJECTIFS_CYCLE[aps] || OBJECTIFS_CYCLE['Football'];
        let objectifs = [];

        // S1: Évaluation diagnostique
        if (cycleData.commun && cycleData.commun.S1) {
            objectifs.push(cycleData.commun.S1);
        }

        // S2: Théorie/Règlement ou Acquisition
        if (cycleData.commun && cycleData.commun.S2) {
            objectifs.push(cycleData.commun.S2);
        }

        let niveauKey = nivEleves;
        if (aps === 'Gymnastique' && ['1AC', '2AC', '3AC', 'TC', '1AB', '2AB'].includes(niveau)) {
            niveauKey = niveau;
        }

        const seancesNiveau = cycleData[niveauKey] || cycleData['moyen'] || cycleData['debutant'] || [];
        const nbSeancesApprentissage = Math.max(0, nb - 3);

        if (seancesNiveau && seancesNiveau.length > 0) {
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                const index = Math.floor(i * seancesNiveau.length / nbSeancesApprentissage);
                objectifs.push(seancesNiveau[Math.min(index, seancesNiveau.length - 1)]);
            }
        } else {
            for (let i = 0; i < nbSeancesApprentissage; i++) {
                objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
            }
        }

        // Dernière séance: Évaluation terminale
        if (cycleData.commun && cycleData.commun.S12) {
            objectifs.push(cycleData.commun.S12);
        }

        while (objectifs.length < nb) {
            objectifs.push("Consolider les acquis techniques et tactiques à travers des situations variées.");
        }
        objectifs = objectifs.slice(0, nb);

        // Palette Modern Atlas (remplace l'ancien vert #006233 sans toucher au format)
        const COLOR_PRIMARY = '#3347D6';       // Majorelle
        const COLOR_PRIMARY_DEEP = '#2434A8';  // Majorelle Deep
        const COLOR_PRIMARY_LIGHT = '#EAF0FF'; // Sky
        const COLOR_SECONDARY = '#0B7A99';     // Cyan Deep
        const COLOR_AMBER_DARK = '#B45309';    // Ambre profond lisible sur papier

        // Générer les lignes du tableau de progression du cycle
        let rows = '';
        for (let i = 0; i < nb; i++) {
            let phase, phaseColor;
            if (i === 0) { phase = 'Éval. diagnostique'; phaseColor = '#EAF0FF'; }
            else if (i === nb - 1) { phase = 'Éval. terminale'; phaseColor = '#FEF3C7'; }
            else if (i < nb / 3) { phase = 'Découverte'; phaseColor = '#F8FAFC'; }
            else if (i < 2 * nb / 3) { phase = 'Apprentissage'; phaseColor = '#EAF0FF'; }
            else { phase = 'Consolidation'; phaseColor = '#F8FAFC'; }

            rows += `<tr>
                <td style="text-align:center;background:${phaseColor};font-size:7pt;font-weight:bold;border:1px solid #000;color:#0E1633;">${phase}</td>
                <td style="text-align:center;font-weight:bold;font-size:9pt;background:#F8FAFC;border:1px solid #000;color:${COLOR_PRIMARY_DEEP};">${i + 1}</td>
                <td style="font-size:7.5pt;padding:4px 8px;border:1px solid #000;line-height:1.4;text-align:left;color:#0E1633;">${objectifs[i]}</td>
            </tr>`;
        }

        // Corps HTML de la Page 1 (Projet de Cycle)
        const projetPageBody = `
<p class="main-title" style="font-size:16pt;font-weight:bold;text-align:center;color:${COLOR_PRIMARY};margin:8px 0 4px 0;">📊 PROJET PÉDAGOGIQUE DE CYCLE</p>
<p class="sub-title" style="font-size:11pt;text-align:center;color:${COLOR_SECONDARY};margin:0 0 12px 0;font-weight:bold;">${aps} - ${niveau} - Niveau élèves: ${nivTxt}</p>

<table class="header-table" style="border:none;margin-bottom:8px;width:100%;border-collapse:collapse;">
<tr>
<td style="border:none;width:33%;text-align:left;font-size:9pt;padding:3px 0;"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td style="border:none;width:34%;text-align:center;font-size:9pt;padding:3px 0;"><b>Établissement:</b> ${etablissement || '________________________'}</td>
<td style="border:none;width:33%;text-align:right;font-size:9pt;padding:3px 0;"><b>Année scolaire:</b> ${anneeScolaire || '2025-2026'}</td>
</tr>
</table>

<table class="info-table" style="width:100%;border-collapse:collapse;margin-bottom:10px;table-layout:fixed;">
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
<td class="section-header" style="background:#EAF0FF;color:#0E1633;font-weight:bold;text-align:center;font-size:7.5pt;border:1px solid #000;padding:4px 6px;">GROUPE APS</td>
<td style="text-align:center;font-size:8pt;border:1px solid #000;padding:4px 6px;">${groupeAPS}</td>
<td class="section-header" style="background:#EAF0FF;color:#0E1633;font-weight:bold;text-align:center;font-size:7.5pt;border:1px solid #000;padding:4px 6px;">APS</td>
<td style="text-align:center;font-size:9pt;font-weight:bold;color:${COLOR_PRIMARY};border:1px solid #000;padding:4px 6px;">${aps}</td>
<td class="section-header" style="background:#EAF0FF;color:#0E1633;font-weight:bold;text-align:center;font-size:7.5pt;border:1px solid #000;padding:4px 6px;">NIVEAU</td>
<td style="text-align:center;font-size:8pt;border:1px solid #000;padding:4px 6px;font-weight:bold;">${niveau}</td>
<td class="section-header" style="background:#EAF0FF;color:#0E1633;font-weight:bold;text-align:center;font-size:7.5pt;border:1px solid #000;padding:4px 6px;">NIV. ÉLÈVES</td>
<td style="text-align:center;font-weight:bold;color:${COLOR_SECONDARY};border:1px solid #000;padding:4px 6px;">${nivTxt}</td>
<td class="section-header" style="background:#EAF0FF;color:#0E1633;font-weight:bold;text-align:center;font-size:7.5pt;border:1px solid #000;padding:4px 6px;">SÉANCES</td>
<td style="text-align:center;font-size:10pt;font-weight:bold;border:1px solid #000;padding:4px 6px;color:${COLOR_PRIMARY_DEEP};">${nb}</td>
</tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-bottom:10px;table-layout:fixed;">
<colgroup>
<col style="width:13%">
<col style="width:87%">
</colgroup>
<tr>
<td class="label-cell" style="background:#F8FAFC;font-weight:bold;font-size:7.5pt;text-align:left;padding:5px 8px;border:1px solid #000;color:#0E1633;">OTI</td>
<td class="content-cell" style="font-size:7.5pt;line-height:1.35;padding:5px 8px;text-align:left;border:1px solid #000;">${oti}</td>
</tr>
<tr>
<td class="label-cell" style="background:#F8FAFC;font-weight:bold;font-size:7.5pt;text-align:left;padding:5px 8px;border:1px solid #000;color:#0E1633;">OTC</td>
<td class="content-cell" style="font-size:7.5pt;line-height:1.35;padding:5px 8px;text-align:left;border:1px solid #000;">${otc}</td>
</tr>
<tr>
<td class="label-cell" style="background:#F8FAFC;font-weight:bold;font-size:7.5pt;text-align:left;padding:5px 8px;border:1px solid #000;color:#0E1633;">COMPÉTENCES VISÉES</td>
<td class="competences-cell" style="background:${COLOR_PRIMARY_LIGHT};font-size:7pt;line-height:1.35;padding:8px;border:1px solid #000;color:#0E1633;">
<b>Compétences visées par l'APS ${aps}:</b><br>
- Maîtriser les gestes techniques fondamentaux de l'APS<br>
- S'adapter aux différentes situations motrices proposées<br>
- Respecter les règles et faire preuve d'esprit sportif<br>
- Concevoir et réaliser des projets collectifs ou individuels
</td>
</tr>
<tr>
<td class="label-cell" style="background:#F8FAFC;font-weight:bold;font-size:7.5pt;text-align:left;padding:5px 8px;border:1px solid #000;color:#0E1633;">SITUATION DE RÉFÉRENCE</td>
<td class="content-cell" style="font-size:7.5pt;line-height:1.35;padding:5px 8px;text-align:left;font-weight:bold;color:${COLOR_PRIMARY};border:1px solid #000;">${sitRef}</td>
</tr>
</table>

<table class="progression-table" style="width:100%;border-collapse:collapse;margin-top:8px;margin-bottom:10px;table-layout:fixed;">
<colgroup>
<col style="width:12%">
<col style="width:4%">
<col style="width:84%">
</colgroup>
<tr>
<td class="cycle-header" colspan="3" style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;font-size:10pt;text-align:center;padding:8px;border:1px solid #000;">PROGRESSION PÉDAGOGIQUE DU CYCLE</td>
</tr>
<tr>
<th class="phase-header" style="background:${COLOR_PRIMARY_DEEP};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px 4px;border:1px solid #000;">PHASE</th>
<th class="phase-header" style="background:${COLOR_PRIMARY_DEEP};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px 4px;border:1px solid #000;">N°</th>
<th class="phase-header" style="background:${COLOR_PRIMARY_DEEP};color:#fff;font-size:8pt;font-weight:bold;text-align:center;padding:6px 4px;border:1px solid #000;">OBJECTIF OPÉRATIONNEL DE LA SÉANCE</th>
</tr>
${rows}
</table>

<table class="footer-table" style="border:none;margin-top:12px;width:100%;border-collapse:collapse;">
<tr>
<td style="border:none;width:60%;text-align:left;font-size:7pt;padding:3px 0;">
<b>Légende des phases:</b> 🟦 Éval. diagnostique | ⬜ Découverte | 🟦 Apprentissage | ⬜ Consolidation | 🟨 Éval. terminale
</td>
<td style="border:none;width:40%;text-align:right;font-size:7pt;padding:3px 0;">
<b>Signature du professeur:</b> ____________________
</td>
</tr>
</table>

<p style="text-align:center;font-size:7pt;color:#55607A;margin-top:10px;">
Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - MEN Maroc
</p>`;

        // ==================== GÉNÉRATION DES FICHES DE SÉANCE DU CYCLE (S1 à S_nb) ====================
        const pages = [
            {
                id: 'cycle',
                pageNumber: 1,
                shortLabel: '📊 Cycle',
                title: `Page 1 — Projet de Cycle (${aps} · ${niveau})`,
                sheetHtml: projetPageBody
            }
        ];

        let fichesWordHtml = '';
        const fb = FALLBACKS[aps] || FALLBACKS['Handball'];

        for (let seanceNum = 1; seanceNum <= nb; seanceNum++) {
            const objectifSeance = objectifs[seanceNum - 1];
            const situationsRef = getSituations(aps, objectifSeance, seanceNum);
            const isTest = situationsRef && (situationsRef.isTestObservation || situationsRef.isTestBilan);

            const echaufSpec = situationsRef ? situationsRef.echauffement : fb.echauf;
            const butFonda = isTest
                ? (situationsRef?.isTestObservation ? 'Identifier le niveau initial des élèves' : 'Évaluer les progrès réalisés')
                : `Atteindre l'objectif: ${objectifSeance}`;
            const s1Titre = situationsRef ? situationsRef.situation1.titre : fb.s1t;
            const s1But = situationsRef ? situationsRef.situation1.but : fb.s1b;
            const s1Orga = situationsRef ? situationsRef.situation1.organisation : fb.s1o;
            const s1Deroul = situationsRef ? situationsRef.situation1.deroulement : fb.s1d;
            const s1Consignes = situationsRef ? situationsRef.situation1.consignes : fb.s1c;
            const s1Variantes = situationsRef ? situationsRef.situation1.variantes : fb.s1v;

            const s2Titre = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.titre : fb.s2t) : '';
            const s2But = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.but : fb.s2b) : '';
            const s2Orga = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.organisation : fb.s2o) : '';
            const s2Deroul = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.deroulement : fb.s2d) : '';
            const s2Consignes = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.consignes : fb.s2c) : '';
            const s2Variantes = !isTest ? (situationsRef?.situation2 ? situationsRef.situation2.variantes : fb.s2v) : '';

            const critReal = situationsRef ? situationsRef.criteresRealisation : fb.cr;
            const critReuss = situationsRef ? situationsRef.criteresReussite : fb.cs;

            const ficheBody = `
<table style="border:none;margin-bottom:5px;width:100%;border-collapse:collapse;">
<tr>
<td style="border:none;width:25%;font-size:8pt;padding:3px 0;"><b>Professeur:</b> ${nomProf || '________'}</td>
<td style="border:none;width:30%;text-align:center;font-size:8pt;padding:3px 0;"><b>Établissement:</b> ${etablissement || '________'}</td>
<td style="border:none;width:20%;text-align:center;font-size:8pt;padding:3px 0;"><b>Séance:</b> ${seanceNum}/${nb}</td>
<td style="border:none;width:25%;text-align:right;font-size:8pt;padding:3px 0;"><b>Année:</b> ${anneeScolaire || '2025-2026'}</td>
</tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-bottom:6px;table-layout:fixed;">
<tr><td style="text-align:center;font-size:11pt;font-weight:bold;background:${COLOR_PRIMARY};color:#fff;padding:5px;border:1px solid #000;">FICHE DE SÉANCE EPS - ${aps.toUpperCase()} - SÉANCE ${seanceNum}/${nb}</td></tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-bottom:6px;table-layout:fixed;">
<tr>
<td style="background:#EAF0FF;color:#0E1633;font-weight:bold;font-size:7pt;text-align:center;width:8%;border:1px solid #000;padding:4px 6px;">Groupe APS</td>
<td style="width:12%;font-size:7.5pt;text-align:center;border:1px solid #000;padding:4px 6px;">${groupeAPS}</td>
<td style="background:#EAF0FF;color:#0E1633;font-weight:bold;font-size:7pt;text-align:center;width:5%;border:1px solid #000;padding:4px 6px;">APS</td>
<td style="width:10%;font-size:8pt;text-align:center;font-weight:bold;color:${COLOR_PRIMARY};border:1px solid #000;padding:4px 6px;">${aps}</td>
<td style="background:#EAF0FF;color:#0E1633;font-weight:bold;font-size:7pt;text-align:center;width:6%;border:1px solid #000;padding:4px 6px;">Niveau</td>
<td style="width:6%;font-size:7.5pt;text-align:center;font-weight:bold;border:1px solid #000;padding:4px 6px;">${niveau}</td>
<td style="background:#EAF0FF;color:#0E1633;font-weight:bold;font-size:7pt;text-align:center;width:6%;border:1px solid #000;padding:4px 6px;">Séance</td>
<td style="width:5%;font-size:9pt;text-align:center;font-weight:bold;color:${COLOR_PRIMARY_DEEP};border:1px solid #000;padding:4px 6px;">${seanceNum}</td>
</tr>
<tr>
<td style="background:#F8FAFC;font-weight:bold;font-size:6pt;text-align:center;border:1px solid #000;padding:3px;">OTI</td>
<td colspan="7" style="font-size:6pt;line-height:1.2;padding:3px;border:1px solid #000;">${oti}</td>
</tr>
<tr>
<td style="background:#F8FAFC;font-weight:bold;font-size:6pt;text-align:center;border:1px solid #000;padding:3px;">OTC</td>
<td colspan="7" style="font-size:6pt;line-height:1.2;padding:3px;border:1px solid #000;">${otc}</td>
</tr>
<tr>
<td style="background:${COLOR_PRIMARY_DEEP};color:#fff;font-weight:bold;font-size:7pt;text-align:center;border:1px solid #000;padding:4px;">OBJECTIF</td>
<td colspan="7" style="background:${COLOR_PRIMARY_LIGHT};color:#0E1633;font-size:8pt;font-weight:bold;padding:5px;border:1px solid #000;">${objectifSeance}</td>
</tr>
</table>

<table style="width:100%;border-collapse:collapse;margin-bottom:6px;table-layout:fixed;">
<colgroup>
<col style="width:6%"><col style="width:54%"><col style="width:10%"><col style="width:15%"><col style="width:15%">
</colgroup>
<tr>
<th style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;border:1px solid #000;">PARTIES</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;border:1px solid #000;">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;border:1px solid #000;">BUT</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;border:1px solid #000;">C. RÉALISATION</th>
<th style="background:${COLOR_PRIMARY};color:#fff;font-weight:bold;text-align:center;font-size:7pt;padding:4px;border:1px solid #000;">C. RÉUSSITE</th>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#F8FAFC;font-size:7pt;vertical-align:middle;border:1px solid #000;padding:4px;">INTRO<br>15 min</td>
<td style="font-size:7pt;line-height:1.3;padding:4px;border:1px solid #000;">
<b>• Prise en main:</b> Appel, tenues, présentation objectif, consignes sécurité<br>
<b>• Échauffement général:</b> Course lente, montées genoux, talons-fesses<br>
<b>• Échauffement spécifique:</b> ${echaufSpec}
</td>
<td style="background:#F8FAFC;font-size:7pt;text-align:center;vertical-align:middle;border:1px solid #000;padding:4px;">Préparer le corps</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;border:1px solid #000;padding:4px;">—</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;border:1px solid #000;padding:4px;">—</td>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#F8FAFC;font-size:7pt;vertical-align:middle;border:1px solid #000;padding:4px;">FONDA<br>30 min</td>
<td style="font-size:7pt;line-height:1.25;padding:4px;border:1px solid #000;">
<div style="font-weight:bold;color:${COLOR_PRIMARY};font-size:7.5pt;margin-bottom:2px;">${isTest ? '◆ SITUATION DE RÉFÉRENCE' : '◆ SITUATION 1'}: ${s1Titre}</div>
<b>But:</b> ${s1But}<br>
<b>Orga:</b> ${s1Orga}<br>
<b>Déroulement:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s1Variantes.replace(/\n/g, ' | ')}
${!isTest ? `<br><br><div style="font-weight:bold;color:${COLOR_SECONDARY};font-size:7.5pt;margin-bottom:2px;">◆ SITUATION 2: ${s2Titre}</div>
<b>But:</b> ${s2But}<br>
<b>Orga:</b> ${s2Orga}<br>
<b>Déroulement:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s2Variantes.replace(/\n/g, ' | ')}<br><br>
<div style="font-weight:bold;color:${COLOR_AMBER_DARK};font-size:7pt;">◆ SIT. RÉFÉRENCE:</div> ${sitRef}` : ''}
</td>
<td style="background:#F8FAFC;font-size:6pt;text-align:center;vertical-align:middle;padding:3px;border:1px solid #000;">${butFonda}</td>
<td style="font-size:6.5pt;line-height:1.3;padding:3px;border:1px solid #000;">${critReal.replace(/\n/g, '<br>')}</td>
<td style="font-size:6.5pt;line-height:1.3;padding:3px;border:1px solid #000;">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>

<tr>
<td style="font-weight:bold;text-align:center;background:#F8FAFC;font-size:7pt;vertical-align:middle;border:1px solid #000;padding:4px;">FINALE<br>10 min</td>
<td style="font-size:7pt;line-height:1.3;padding:4px;border:1px solid #000;">
<b>•</b> Marche lente avec respiration profonde<br>
<b>•</b> Étirements des groupes musculaires sollicités<br>
<b>•</b> Bilan de séance et rangement du matériel
</td>
<td style="background:#F8FAFC;font-size:7pt;text-align:center;vertical-align:middle;border:1px solid #000;padding:4px;">Retour au calme</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;border:1px solid #000;padding:4px;">—</td>
<td style="font-size:6.5pt;text-align:center;vertical-align:middle;color:#666;border:1px solid #000;padding:4px;">—</td>
</tr>
</table>`;

            pages.push({
                id: `seance-${seanceNum}`,
                pageNumber: seanceNum + 1,
                shortLabel: `S${seanceNum}`,
                title: `Page ${seanceNum + 1} — Fiche de Séance ${seanceNum}/${nb}`,
                sheetHtml: ficheBody
            });

            fichesWordHtml += `\n<br clear="all" style="mso-special-character:line-break;page-break-before:always">\n` + ficheBody;
        }

        // ==================== HTML WORD/PDF (PROJET SEUL - 1 PAGE A4 PAYSAGE) ====================
        const wordStyles = `
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
    color: #0E1633;
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
br {
    mso-data-placement: same-cell;
}`;

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
<style>${wordStyles}</style>
</head>
<body>
${projetPageBody}
</body>
</html>`;

        // ==================== HTML WORD/PDF (PROJET COMPLET : CYCLE + TOUTES LES FICHES) ====================
        const completHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
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
<style>${wordStyles}</style>
</head>
<body>
${projetPageBody}
${fichesWordHtml}
</body>
</html>`;

        // ==================== HTML DISPLAY (Fallback Web) ====================
        const htmlDisplay = projetPageBody;

        const filename = `Projet_Cycle_${aps.replace(/\s+/g, '_')}_${niveau}_${nb}seances.doc`;
        const completFilename = `Projet_Complet_${aps.replace(/\s+/g, '_')}_${niveau}_${nb}seances.doc`;

        return res.status(200).json({
            success: true,
            html,
            htmlDisplay,
            filename,
            completHtml,
            completFilename,
            pages,
            nombreSeances: nb,
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
