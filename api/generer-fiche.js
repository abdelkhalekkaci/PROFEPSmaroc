module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { 
            typeDocument, typeGrille, aps, objectif, niveau, niveauEleves,
            nomProf, etablissement, anneeScolaire, numeroSeance, nombreSeances, classe
        } = req.body;

        if (!aps || !niveau) return res.status(400).json({ success: false, error: 'APS et niveau requis' });

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const opReference = isCollege ? 'OP 2009' : 'OP 2007';

        // OTI
        const OTI = {
            '1AC': "Acquérir une motricité correcte permettant de s'adapter aux exigences des situations.",
            '2AC': "Ajuster l'énergie physique pour effectuer des réalisations coordonnées.",
            '3AC': "Ajuster les éléments de l'acte moteur et s'adapter aux différentes situations.",
            'TC': "Maîtriser les composantes du comportement moteur et s'adapter aux différentes situations.",
            '1AB': "Confronter et analyser différentes situations motrices et améliorer ses réalisations.",
            '2AB': "Analyser différentes situations motrices et s'intégrer dans des projets."
        };

        // OTC par groupe
        const OTC = {
            'Sports collectifs': {
                '1AC': "Conserver la balle et participer au jeu collectif.", '2AC': "Progresser avec la balle par des déplacements variés.",
                '3AC': "Projet collectif basé sur le passage rapide attaque-défense.", 'TC': "Conserver la balle jusqu'à la zone adverse.",
                '1AB': "Choix tactiques collectifs avec vitesse d'exécution.", '2AB': "Attaque basée sur la maîtrise des rôles."
            },
            'Athlétisme': {
                '1AC': "Organiser les mouvements pour des performances correctes.", '2AC': "Consolider les habiletés et améliorer la performance.",
                '3AC': "Gérer l'effort pour des prestations efficaces.", 'TC': "Maîtriser l'organisation du corps et la gestion de l'effort.",
                '1AB': "Augmenter l'efficacité par la maîtrise du geste.", '2AB': "Mobiliser un niveau de performance optimal."
            },
            'Gymnastique': {
                '1AC': "Enchaînement simple (3A 2B 0C).", '2AC': "Enchaînement varié (3A 2B 1C).",
                '3AC': "Enchaînement individuel (2A 4B 1C).", 'TC': "Enchaînement (2A 3B 2C).",
                '1AB': "Enchaînement (2B 3C 2D).", '2AB': "Enchaînement varié (2C 3D 2E)."
            },
            'Sports de renvoi': {
                '1AC': "Défendre et renvoyer.", '2AC': "Renvoi indirect vers le camp adverse.",
                '3AC': "Orientation vers la zone avant.", 'TC': "Organisation collective (3 touches).",
                '1AB': "Récupérer et renvoyer (3 touches).", '2AB': "Récupérer, conserver et marquer."
            }
        };

        const SITUATIONS_REF = {
            'Handball': '7c7', 'Football': '5c5', 'Basketball': '5c5', 'Volleyball': '6c6',
            'Tennis de table': 'Simple', 'Badminton': 'Simple',
            'Course de vitesse': isCollege ? '80m' : '80m(G)/60m(F)',
            'Saut en longueur': '3 essais', 'Saut en hauteur': '3 essais/hauteur',
            'Lancer de poids': '4kg(G)/3kg(F)', 'Course de durée': '1000m(G)/600m(F)',
            'Gymnastique': 'Enchaînement'
        };

        // Critères d'observation
        const CRITERES_OBS = {
            'Saut en longueur': { 
                headers: ['Course accélérée|Oui|Non', 'Piétinement|Oui|Non', 'Appel|Avant|Sur|Mordu', 'Réception|2pieds|Autre', 'Perf'],
                colspan: [2, 2, 3, 2, 1]
            },
            'Saut en hauteur': { headers: ['Course|Oui|Non', 'Impulsion|Oui|Non', 'Franchissement|Bon|Moyen', 'Réception|Oui|Non', 'Perf'], colspan: [2, 2, 2, 2, 1] },
            'Course de vitesse': { headers: ['Départ|Bon|Moyen', 'Accélération|Oui|Non', 'Fréquence|Haute|Basse', 'Amplitude|Grande|Petite', 'Perf'], colspan: [2, 2, 2, 2, 1] },
            'Lancer de poids': { headers: ['Position|Bonne|Mauvaise', 'Poussée|Complète|Partielle', 'Équilibre|Oui|Non', 'Perf'], colspan: [2, 2, 2, 1] },
            'Handball': { headers: ['Passe', 'Réception', 'Tir', 'Démarquage', 'Obs'], colspan: [1, 1, 1, 1, 1] },
            'Football': { headers: ['Conduite', 'Passe', 'Contrôle', 'Tir', 'Obs'], colspan: [1, 1, 1, 1, 1] },
            'Basketball': { headers: ['Dribble', 'Passe', 'Tir', 'Défense', 'Obs'], colspan: [1, 1, 1, 1, 1] },
            'Volleyball': { headers: ['Manchette', 'Passe haute', 'Service', 'Attaque', 'Obs'], colspan: [1, 1, 1, 1, 1] },
            'Gymnastique': { headers: ['Éléments A', 'Éléments B', 'Éléments C', 'Enchaînement', 'Note'], colspan: [1, 1, 1, 1, 1] }
        };

        const CRITERES_EVAL = ['Maîtrise technique (/5)', 'Comportement tactique (/5)', 'Engagement (/5)', 'Règles (/5)', 'Note (/20)'];

        // Déterminer groupe
        let groupeAPS = 'Activité physique';
        if (['Handball', 'Football', 'Basketball', 'Volleyball'].includes(aps)) groupeAPS = 'Sports collectifs';
        else if (['Tennis de table', 'Badminton'].includes(aps)) groupeAPS = 'Sports de renvoi';
        else if (['Course de vitesse', 'Course de relais', 'Saut en longueur', 'Saut en hauteur', 'Lancer de poids', 'Course de durée'].includes(aps)) groupeAPS = 'Athlétisme';
        else if (aps === 'Gymnastique') groupeAPS = 'Gymnastique';

        const oti = OTI[niveau] || '';
        const otc = OTC[groupeAPS]?.[niveau] || '';
        const sitRef = SITUATIONS_REF[aps] || 'Adapté';

        let html = '', filename = '', ficheDetaillee = '';

        // ==================== FICHE DE SÉANCE ====================
        if (typeDocument === 'fiche' || !typeDocument) {
            if (!objectif) return res.status(400).json({ success: false, error: 'Objectif requis' });

            const prompt = `Expert EPS Maroc. Fiche ${aps} niveau ${niveau}, objectif: "${objectif}".
Génère UNIQUEMENT (format très court, 2-3 lignes par section):
ECHAUF_SPEC: [3 exercices spécifiques courts]
SIT1_DEROUL: [déroulement situation 1 en 2-3 phrases]
SIT1_CONSIG: [3 consignes numérotées]
SIT1_VARIAN: [simplifier | complexifier]
SIT2_DEROUL: [déroulement situation 2 en 2-3 phrases]
SIT2_CONSIG: [3 consignes numérotées]
SIT2_VARIAN: [simplifier | complexifier]`;

            const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1500, temperature: 0.7 })
            });

            const data = await groqResp.json();
            ficheDetaillee = data.choices?.[0]?.message?.content || '';

            // Parser
            const parse = (key) => { const m = ficheDetaillee.match(new RegExp(key + ':\\s*(.+?)(?=\\n[A-Z]|$)', 's')); return m ? m[1].trim() : ''; };
            const echauf = parse('ECHAUF_SPEC') || 'Exercices spécifiques adaptés à l\'APS';
            const s1d = parse('SIT1_DEROUL') || 'Travail analytique en groupes sur terrain réduit';
            const s1c = parse('SIT1_CONSIG') || '1. Respecter les consignes 2. Travailler en équipe 3. S\'engager';
            const s1v = parse('SIT1_VARIAN') || 'Simplifier: réduire les contraintes | Complexifier: ajouter opposition';
            const s2d = parse('SIT2_DEROUL') || 'Situation globale avec application de l\'objectif';
            const s2c = parse('SIT2_CONSIG') || '1. Appliquer l\'objectif 2. Communiquer 3. S\'adapter';
            const s2v = parse('SIT2_VARIAN') || 'Simplifier: moins de défenseurs | Complexifier: contrainte de temps';

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Fiche ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.4cm}
body{font-family:Calibri,sans-serif;font-size:7.5pt;line-height:1.1}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px 3px;vertical-align:top}
.hd td{border:none;font-size:7pt;padding:1px 3px}
.tt{text-align:center;font-size:11pt;font-weight:bold;background:#1a5c3a;color:#fff;padding:3px}
.lb{background:#e8e8e8;font-weight:bold;font-size:6.5pt;text-align:center}
.ob{background:#1a5c3a;color:#fff;font-weight:bold;font-size:7pt}
.mh{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center;font-size:7pt}
.pt{font-weight:bold;text-align:center;background:#f0f0f0;font-size:7pt}
.ct{font-size:6.5pt;line-height:1.1}
b{color:#1a5c3a}
</style></head>
<body>
<table class="hd"><tr><td style="width:33%"><b>Prof:</b> ${nomProf||'_____'}</td><td style="text-align:center"><b>Étab:</b> ${etablissement||'_____'}</td><td style="text-align:right"><b>Année:</b> ${anneeScolaire||'24-25'}</td></tr></table>
<table><tr><td class="tt">FICHE DE PRÉPARATION D'UNE SÉANCE D'EPS</td></tr></table>
<table>
<tr><td class="lb" style="width:6%">Groupe</td><td style="width:12%">${groupeAPS}</td><td class="lb" style="width:4%">APS</td><td style="width:10%">${aps}</td><td class="lb" style="width:5%">Niveau</td><td style="width:6%">${niveau}</td><td class="lb" style="width:5%">Séance</td><td style="width:4%">${numeroSeance||1}</td></tr>
<tr><td class="lb">OTI</td><td colspan="7" style="font-size:6pt">${oti}</td></tr>
<tr><td class="lb">OTC</td><td colspan="7" style="font-size:6pt">${otc}</td></tr>
<tr><td class="ob">OBJECTIF</td><td colspan="7" style="background:#e8f5e9;font-weight:bold;font-size:7pt">${objectif}</td></tr>
</table>
<table>
<tr><th class="mh" style="width:5%">PARTIES</th><th class="mh" style="width:4%">DURÉE</th><th class="mh" style="width:52%">CONTENU / SITUATIONS D'APPRENTISSAGE</th><th class="mh" style="width:8%">BUT</th><th class="mh" style="width:15.5%">C. RÉALISATION</th><th class="mh" style="width:15.5%">C. RÉUSSITE</th></tr>
<tr>
<td class="pt">INTRO</td><td style="text-align:center;font-weight:bold">15'</td>
<td class="ct"><b>Prise en main (3'):</b> Appel, tenues, objectif, sécurité.<br><b>Échauf. général (7'):</b> Course, mobilisation, gammes.<br><b>Échauf. spécifique (5'):</b> ${echauf}</td>
<td class="ct">Préparer l'organisme</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de préparation</td>
</tr>
<tr>
<td class="pt">FONDA.</td><td style="text-align:center;font-weight:bold">35'</td>
<td class="ct">
<b>◆ SITUATION 1 (12'):</b><br>
<u>Déroulement:</u> ${s1d}<br>
<u>Consignes:</u> ${s1c}<br>
<u>Variantes:</u> ${s1v}<br><br>
<b>◆ SITUATION 2 (13'):</b><br>
<u>Déroulement:</u> ${s2d}<br>
<u>Consignes:</u> ${s2c}<br>
<u>Variantes:</u> ${s2v}<br><br>
<b>◆ SITUATION DE RÉFÉRENCE (10'):</b> ${sitRef}
</td>
<td class="ct">Atteindre l'objectif via situations progressives</td>
<td class="ct">• Placement correct<br>• Geste technique précis<br>• Enchaînement fluide<br>• Prise d'information</td>
<td class="ct">• 7/10 réussites min<br>• Taux > 70%<br>• Progression visible<br>• Objectif démontré</td>
</tr>
<tr>
<td class="pt">FINALE</td><td style="text-align:center;font-weight:bold">10'</td>
<td class="ct"><b>Retour au calme (5'):</b> Marche, étirements.<br><b>Bilan (5'):</b> Questions, feedback, rangement.</td>
<td class="ct">Récupération et bilan</td>
<td class="ct" colspan="2" style="text-align:center;font-style:italic">Phase de récupération</td>
</tr>
</table>
<p style="text-align:center;font-size:5.5pt;color:#666">Conforme aux ${opReference} | MEN Maroc</p>
</body></html>`;
            filename = `Fiche_${aps.replace(/\s+/g,'_')}_${niveau}_S${numeroSeance||1}.doc`;

        // ==================== PROJET DE CYCLE ====================
        } else if (typeDocument === 'projet') {
            const nb = parseInt(nombreSeances) || 10;
            const nivTxt = {'debutant':'Débutant','moyen':'Moyen','avance':'Avancé','elite':'Élite'}[niveauEleves] || 'Moyen';

            let rows = '';
            for (let i = 1; i <= nb; i++) {
                let seq = '', obj = '';
                if (i === 1) { seq = 'Test diagnostique'; obj = `Évaluer le niveau initial (situation de référence: ${sitRef})`; }
                else if (i === 2) { seq = 'Leçon théorique'; obj = `Règlement, sécurité et fondamentaux de ${aps}`; }
                else if (i === nb) { seq = 'Test bilan'; obj = `Évaluer les acquis (même dispositif que S1: ${sitRef})`; }
                else if (i === nb - 1) { seq = 'Intégration'; obj = `Pré-test - Intégration des apprentissages`; }
                else { seq = i <= nb * 0.5 ? 'Apprentissage' : 'Consolidation'; obj = `Objectif de la séance ${i}`; }
                rows += `<tr><td style="text-align:center">${seq}</td><td style="text-align:center;font-weight:bold">${i}</td><td>${obj}</td></tr>`;
            }

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>Projet ${aps}</title>
<style>
@page{size:297mm 210mm;mso-page-orientation:landscape;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:3px 5px;vertical-align:top}
.ti{font-size:18pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center;border:none}
.hd{background:#e8e8e8;font-weight:bold;text-align:center}
.sc{background:#1a5c3a;color:#fff;font-weight:bold}
</style></head>
<body>
<table style="border:none"><tr><td class="ti">Projet prévisionnel (${niveau})</td></tr></table>
<table><tr><td class="hd">MODULE</td><td class="hd">GROUPE D'APS</td><td class="hd">APS</td><td class="hd">NIVEAU</td><td class="hd">NIVEAU ÉLÈVES</td><td class="hd">SÉANCES</td></tr>
<tr><td style="text-align:center">Adaptation des réponses motrices</td><td style="text-align:center">${groupeAPS}</td><td style="text-align:center;font-weight:bold">${aps}</td><td style="text-align:center">${niveau}</td><td style="text-align:center;font-weight:bold;color:#1a5c3a">${nivTxt}</td><td style="text-align:center">${nb}</td></tr></table>
<table><tr><td class="hd" style="width:20%">OTI</td><td>${oti}</td></tr><tr><td class="hd">OTC</td><td>${otc}</td></tr>
<tr><td class="hd">Compétences visées</td><td>• Gestion des ressources individuelles<br>• Application des lois de sécurité et de compétition</td></tr></table>
<table><tr><td class="hd" rowspan="2" style="width:18%">Acquisitions attendues</td><td class="hd">Procédurales</td><td class="hd">Conceptuelles</td><td class="hd">Comportementales</td></tr>
<tr><td>• Optimiser la prestation<br>• Réaliser les gestes fondamentaux</td><td>• Notions réglementaires<br>• Vocabulaire spécifique</td><td>• Assiduité • Engagement<br>• Organisation • Respect</td></tr></table>
<table><tr><td class="sc" colspan="3">PROGRESSION DES SÉANCES</td></tr>
<tr><th class="hd" style="width:18%">Séquences</th><th class="hd" style="width:8%">Séances</th><th class="hd">Objectifs</th></tr>
${rows}</table>
<p style="text-align:center;font-size:7pt;margin-top:5px"><b>Prof:</b> ${nomProf||'_____'} | <b>Étab:</b> ${etablissement||'_____'} | <b>Année:</b> ${anneeScolaire||'24-25'}</p>
</body></html>`;
            filename = `Projet_${aps.replace(/\s+/g,'_')}_${niveau}.doc`;

        // ==================== GRILLE ====================
        } else if (typeDocument === 'grille') {
            const isObs = typeGrille === 'observation';
            const titre = isObs ? "Grille d'observation" : "Grille d'évaluation";
            const crit = CRITERES_OBS[aps] || { headers: ['C1', 'C2', 'C3', 'C4', 'Obs'], colspan: [1, 1, 1, 1, 1] };

            let headMain = '', headSub = '', emptyC = '';
            if (isObs) {
                crit.headers.forEach((h, i) => {
                    const parts = h.split('|');
                    headMain += `<th style="text-align:center" colspan="${crit.colspan[i]}">${parts[0]}</th>`;
                    if (parts.length > 1) for (let j = 1; j < parts.length; j++) headSub += `<td style="text-align:center;font-size:6pt">${parts[j]}</td>`;
                    else headSub += `<td></td>`.repeat(crit.colspan[i]);
                    emptyC += `<td></td>`.repeat(crit.colspan[i]);
                });
            } else {
                CRITERES_EVAL.forEach(c => { headMain += `<th style="text-align:center;font-size:7pt">${c}</th>`; emptyC += `<td></td>`; });
            }

            let rows = '';
            for (let i = 1; i <= 40; i++) rows += `<tr style="height:16px"><td style="text-align:center">${i}</td><td colspan="2"></td>${emptyC}</tr>`;

            html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${titre} ${aps}</title>
<style>
@page{size:210mm 297mm;margin:0.5cm}
body{font-family:Calibri,sans-serif;font-size:8pt}
table{width:100%;border-collapse:collapse}
th,td{border:1pt solid #000;padding:2px}
.ti{font-size:16pt;font-weight:bold;font-family:'Brush Script MT',cursive;text-align:center}
.hd{background:#e8e8e8;font-weight:bold;font-size:7pt}
</style></head>
<body>
<p class="ti">${titre} (${aps})</p>
<table style="border:none;margin-bottom:3px"><tr><td style="border:none"><b>Classe:</b> ${classe||'_____'}</td><td style="border:none;text-align:right"><b>${nomProf||'Prof'}</b> – ${etablissement||'Établissement'}</td></tr></table>
<table>
<tr><th class="hd" rowspan="2" style="width:4%">N°</th><th class="hd" rowspan="2" colspan="2" style="width:18%">Nom & Prénom</th>${headMain}</tr>
<tr>${headSub}</tr>
${rows}
</table>
</body></html>`;
            filename = `Grille_${isObs?'Obs':'Eval'}_${aps.replace(/\s+/g,'_')}.doc`;
        }

        return res.status(200).json({ success: true, html, filename, ficheDetaillee, oti, otc, groupeAPS, opReference, situationReference: sitRef });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
