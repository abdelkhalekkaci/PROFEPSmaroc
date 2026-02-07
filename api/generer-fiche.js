// ============================================================================
// API FICHES DE SÉANCE - /api/generer-fiche.js
// ============================================================================
// Format: A4 PAYSAGE (297x210mm) | Sans colonne DURÉE | Schémas colorés
// OBJECTIF = ce que l'élève APPREND | BUT = ce que l'élève FAIT
// Critères RÉALISATION = COMMENT faire | Critères RÉUSSITE = MESURABLE
// ============================================================================

const { OTI, OTC, VOCABULAIRE_APS, getSituationReference, getGroupeAPS, FALLBACKS, getSchema } = require('./data/references.js');
const { getSituations } = require('./data/situations_fiches.js');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        if (!GROQ_API_KEY) return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });

        const { aps, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance, classe } = req.body;

        if (!aps || !niveau || !objectif) {
            return res.status(400).json({ success: false, error: 'APS, niveau et objectif requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const oti = OTI[niveau] || '';
        const otc = OTC[aps]?.[niveau] || '';
        const sitRef = getSituationReference(aps, isCollege);
        const groupeAPS = getGroupeAPS(aps);
        const vocabAPS = VOCABULAIRE_APS[aps] || '';

        // Récupération des situations de référence si disponibles
        // IMPORTANT: Passer numeroSeance pour détecter les tests d'observation et bilans
        const situationsRef = getSituations(aps, objectif, numeroSeance);
        
        // Vérifier si c'est un test d'observation ou un test bilan
        const isTest = situationsRef && (situationsRef.isTestObservation || situationsRef.isTestBilan);
        
        const situationsContext = situationsRef ? (isTest ? `
🎯 SÉANCE SPÉCIALE ${situationsRef.isTestObservation ? 'TEST D\'OBSERVATION (Séance 1)' : 'TEST BILAN (Dernière séance)'}

Cette séance utilise la SITUATION DE RÉFÉRENCE avec organisation en 3 groupes :
- JOUEURS : disputent le match/réalisent la performance
- OBSERVATEURS : utilisent des grilles d'observation
- ORGANISATEURS : gèrent l'arbitrage, le chronométrage, le matériel

ÉCHAUFFEMENT SPÉCIFIQUE:
${situationsRef.echauffement}

SITUATION UNIQUE - "${situationsRef.situation1.titre}":
- But: ${situationsRef.situation1.but}
- Organisation: ${situationsRef.situation1.organisation}
- Déroulement: ${situationsRef.situation1.deroulement}
- Consignes: ${situationsRef.situation1.consignes}
- Variantes: ${situationsRef.situation1.variantes}

CRITÈRES DE RÉALISATION (Comment bien faire):
${situationsRef.criteresRealisation}

CRITÈRES DE RÉUSSITE (Mesurable):
${situationsRef.criteresReussite}

⚠️ INSTRUCTION SPÉCIALE POUR ${situationsRef.isTestObservation ? 'TEST D\'OBSERVATION' : 'TEST BILAN'}:
- N'invente PAS de situation 2, il y a UNE SEULE situation : la situation de référence
- Respecte STRICTEMENT l'organisation en 3 groupes (JOUEURS, OBSERVATEURS, ORGANISATEURS)
- Le professeur utilise des grilles d'observation pour ${situationsRef.isTestObservation ? 'identifier le niveau initial' : 'mesurer les progrès réalisés'}
- Insiste sur l'importance de la rotation entre les 3 rôles
- Le but de la phase fondamentale est : ${situationsRef.isTestObservation ? 'Identifier le niveau initial des élèves dans l\'activité' : 'Évaluer les progrès réalisés et le niveau final des élèves'}` : `
SITUATIONS DE RÉFÉRENCE PÉDAGOGIQUES (utilise-les comme base et adapte selon l'objectif):

ÉCHAUFFEMENT SPÉCIFIQUE DE RÉFÉRENCE:
${situationsRef.echauffement}

SITUATION 1 (Apprentissage structuré) - "${situationsRef.situation1.titre}":
- But: ${situationsRef.situation1.but}
- Organisation: ${situationsRef.situation1.organisation}
- Déroulement: ${situationsRef.situation1.deroulement}
- Consignes: ${situationsRef.situation1.consignes}
- Variantes: ${situationsRef.situation1.variantes}

SITUATION 2 (Transfert/Jeu) - "${situationsRef.situation2.titre}":
- But: ${situationsRef.situation2.but}
- Organisation: ${situationsRef.situation2.organisation}
- Déroulement: ${situationsRef.situation2.deroulement}
- Consignes: ${situationsRef.situation2.consignes}
- Variantes: ${situationsRef.situation2.variantes}

CRITÈRES DE RÉALISATION (Comment bien faire):
${situationsRef.criteresRealisation}

CRITÈRES DE RÉUSSITE (Mesurable):
${situationsRef.criteresReussite}

⚠️ INSTRUCTION: Utilise ces situations comme BASE et ADAPTE-LES pour correspondre EXACTEMENT à l'objectif "${objectif}". Conserve la structure pédagogique (S1 apprentissage → S2 transfert) mais personnalise le contenu.`) : '';

        // ==================== PROMPT IA ====================
        const prompt = `Tu es un expert en EPS au Maroc, spécialiste de ${aps}.

SÉANCE À PRÉPARER:
- APS: ${aps}
- Niveau: ${niveau} (${isCollege ? 'Collège' : 'Lycée'})
- OBJECTIF DE LA SÉANCE (ce que l'élève va APPRENDRE): "${objectif}"

VOCABULAIRE TECHNIQUE OBLIGATOIRE pour ${aps}: ${vocabAPS}

DISTINCTIONS PÉDAGOGIQUES IMPORTANTES:
- OBJECTIF = ce que l'élève APPREND (apprentissage visé)
- BUT = ce que l'élève FAIT dans la situation (action concrète, mesurable)
- CRITÈRES DE RÉALISATION = COMMENT bien faire (qualité technique du geste)
- CRITÈRES DE RÉUSSITE = EST-CE RÉUSSI ? (indicateurs mesurables, chiffrés)

${situationsContext}

🛑 IMPORTANT : FORMAT DE RÉPONSE STRICT 🛑
- N'utilise PAS de markdown (gras **, titres ##) pour les CLÉS.
- Écris CHAQUE CLÉ exactement comme demandé, suivie de deux points.
- Ne mets pas de texte introductif ou conclusif.
${situationsRef ? (isTest ? '- UTILISE STRICTEMENT la situation de référence ci-dessus SANS modification.' : '- ADAPTE les situations de référence ci-dessus pour qu\'elles correspondent PARFAITEMENT à l\'objectif.') : ''}

GÉNÈRE CE CONTENU 100% SPÉCIFIQUE à ${aps}:

ECHAUFFEMENT_SPECIFIQUE: [3 exercices spécifiques à ${aps} avec durées, format: exercice1 (durée) | exercice2 (durée) | exercice3 (durée)]
BUT_PHASE_FONDAMENTALE: [1-2 phrases complètes décrivant le but global de la partie principale en lien avec l'objectif "${objectif}"]

SITUATION1_TITRE: [titre court et percutant lié à l'objectif]
SITUATION1_BUT: [ce que l'élève doit FAIRE - UNE phrase d'action concrète et mesurable]
SITUATION1_ORGANISATION: [nombre joueurs, dimensions terrain en mètres, matériel nécessaire]
SITUATION1_DEROULEMENT: [4-5 phrases décrivant précisément le déroulement de la situation]
SITUATION1_CONSIGNES: [4 consignes techniques spécifiques et précises, une par ligne, sans astérisques]
SITUATION1_VARIANTES: [Simplifier: 1-2 façons | Complexifier: 1-2 façons]

${!isTest ? `SITUATION2_TITRE: [titre - situation plus proche du jeu réel ou de la performance]
SITUATION2_BUT: [ce que l'élève doit FAIRE - UNE phrase d'action]
SITUATION2_ORGANISATION: [organisation détaillée avec dimensions et matériel]
SITUATION2_DEROULEMENT: [4-5 phrases décrivant le déroulement]
SITUATION2_CONSIGNES: [4 consignes techniques]
SITUATION2_VARIANTES: [variantes de simplification et complexification]

` : ''}CRITERES_REALISATION: [4 critères décrivant COMMENT bien faire - qualité technique du geste, avec bullet points •]
CRITERES_REUSSITE: [4 critères MESURABLES avec CHIFFRES - pourcentages, nombres, temps, distances]`;

        // Appel API Groq
        const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 3500,
                temperature: 0.7
            })
        });

        const data = await groqResp.json();
        const contenu = data.choices?.[0]?.message?.content || '';

        // Fonction d'extraction robuste (tolère les ** et formats variés)
        const extract = (key) => {
            // Cherche la clé, avec ou sans **, suivie de :
            // Capture tout jusqu'à la prochaine clé (reconnue par saut de ligne + MAJUSCULES + :)
            const regex = new RegExp(`(?:\\*\\*|##)?\\s*${key}(?:\\*\\*|##)?\\s*:?\\s*([\\s\\S]*?)(?=\\n\\s*(?:\\*\\*|##)?\\s*[A-Z][A-Z0-9_]+(?:\\*\\*|##)?\\s*:|$)`, 'i');
            const match = contenu.match(regex);
            if (!match) return '';

            // Nettoyage du contenu capturé (enlève les **, les sauts de ligne excessifs)
            return match[1]
                .replace(/^\*\*/, '')
                .replace(/\*\*$/, '')
                .trim();
        };

        // Extraction des données
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

        // Appliquer fallbacks si nécessaire - Priorité aux situations de référence, puis FALLBACKS
        const fb = FALLBACKS[aps] || FALLBACKS['Handball'];
        const sitRefData = situationsRef; // Utiliser les situations de référence si disponibles
        
        // Pour les tests, situation2 est null donc on ne doit pas générer de situation 2
        const skipSituation2 = isTest;
        
        if (!echaufSpec || echaufSpec.length < 20) {
            echaufSpec = sitRefData ? sitRefData.echauffement : fb.echauf;
        }
        if (!butFonda || butFonda.length < 10) {
            butFonda = isTest ? 
                (situationsRef.isTestObservation ? 
                    'Identifier le niveau initial des élèves dans l\'activité par l\'observation' : 
                    'Évaluer les progrès réalisés et le niveau final des élèves') :
                `Atteindre l'objectif: ${objectif}`;
        }
        if (!s1Titre || s1Titre.length < 5) {
            s1Titre = sitRefData ? sitRefData.situation1.titre : fb.s1t;
        }
        if (!s1But || s1But.length < 10) {
            s1But = sitRefData ? sitRefData.situation1.but : fb.s1b;
        }
        if (!s1Orga || s1Orga.length < 20) {
            s1Orga = sitRefData ? sitRefData.situation1.organisation : fb.s1o;
        }
        if (!s1Deroul || s1Deroul.length < 50) {
            s1Deroul = sitRefData ? sitRefData.situation1.deroulement : fb.s1d;
        }
        if (!s1Consignes || s1Consignes.length < 30) {
            s1Consignes = sitRefData ? sitRefData.situation1.consignes : fb.s1c;
        }
        if (!s1Variantes || s1Variantes.length < 20) {
            s1Variantes = sitRefData ? sitRefData.situation1.variantes : fb.s1v;
        }
        
        // NE PAS APPLIQUER de fallbacks pour situation2 si c'est un test
        if (!skipSituation2) {
            if (!s2Titre || s2Titre.length < 5) {
                s2Titre = sitRefData && sitRefData.situation2 ? sitRefData.situation2.titre : fb.s2t;
            }
            if (!s2But || s2But.length < 10) {
                s2But = sitRefData && sitRefData.situation2 ? sitRefData.situation2.but : fb.s2b;
            }
            if (!s2Orga || s2Orga.length < 20) {
                s2Orga = sitRefData && sitRefData.situation2 ? sitRefData.situation2.organisation : fb.s2o;
            }
            if (!s2Deroul || s2Deroul.length < 30) {
                s2Deroul = sitRefData && sitRefData.situation2 ? sitRefData.situation2.deroulement : fb.s2d;
            }
            if (!s2Consignes || s2Consignes.length < 30) {
                s2Consignes = sitRefData && sitRefData.situation2 ? sitRefData.situation2.consignes : fb.s2c;
            }
            if (!s2Variantes || s2Variantes.length < 20) {
                s2Variantes = sitRefData && sitRefData.situation2 ? sitRefData.situation2.variantes : fb.s2v;
            }
        } else {
            // Pour les tests, on met des valeurs vides pour situation2
            s2Titre = '';
            s2But = '';
            s2Orga = '';
            s2Deroul = '';
            s2Consignes = '';
            s2Variantes = '';
        }
        
        if (!critReal || critReal.length < 50) {
            critReal = sitRefData ? sitRefData.criteresRealisation : fb.cr;
        }
        if (!critReuss || critReuss.length < 50) {
            critReuss = sitRefData ? sitRefData.criteresReussite : fb.cs;
        }

        // Schémas SVG
        const schema1 = getSchema(aps, 1);
        const schema2 = getSchema(aps, 2);

        // Couleurs pour le document Word/PDF (bleu marine)
        const WORD_COLOR_PRIMARY = '#1e3a5f';
        const WORD_COLOR_PRIMARY_LIGHT = '#e8eef4';
        const WORD_COLOR_SECONDARY = '#4a6fa5';
        const WORD_COLOR_ACCENT = '#f5f5f5';

        // Couleurs pour l'affichage site web (vert marocain)
        const COLOR_PRIMARY = '#006233'; // Vert principal
        const COLOR_PRIMARY_LIGHT = '#e8f5e9'; // Vert très clair
        const COLOR_SECONDARY = '#4a8b5c'; // Vert secondaire
        const COLOR_ACCENT = '#f5f5f5'; // Gris clair
        const COLOR_BEIGE = '#f5f5dc'; // Beige clair
        const COLOR_WHITE = '#ffffff'; // Blanc

        // ==================== HTML DISPLAY (SITE WEB) ====================
        const htmlDisplay = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:950px;margin:0 auto;line-height:1.5;">
    <!-- EN-TÊTE -->
    <div style="background:${COLOR_PRIMARY};color:white;padding:20px 25px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 15px rgba(0,0,0,0.2);">
        <h1 style="margin:0 0 8px 0;font-size:1.5rem;font-weight:700;">📋 Fiche de Séance - ${aps}</h1>
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.9rem;opacity:0.95;">
            <span><strong>📊 Niveau:</strong> ${niveau}</span>
            <span><strong>🔢 Séance:</strong> N°${numeroSeance || 1}</span>
            <span><strong>🏷️ Groupe:</strong> ${groupeAPS}</span>
            <span><strong>⏱️ Durée:</strong> 55 min</span>
        </div>
    </div>

    <!-- OBJECTIF DE LA SÉANCE -->
    <div style="background:${COLOR_PRIMARY_LIGHT};border-left:5px solid ${COLOR_PRIMARY};padding:15px 20px;border-radius:0 12px 12px 0;margin-bottom:20px;box-shadow:0 2px 8px rgba(30,58,95,0.15);">
        <h2 style="color:${COLOR_PRIMARY};margin:0 0 5px 0;font-size:1rem;display:flex;align-items:center;gap:8px;">
            🎯 OBJECTIF DE LA SÉANCE
            <span style="font-size:0.75rem;font-weight:normal;color:#666;font-style:italic;">(Ce que l'élève va APPRENDRE)</span>
        </h2>
        <p style="margin:0;font-size:1.1rem;font-weight:600;color:#333;">${objectif}</p>
    </div>

    <!-- PARTIE INTRODUCTIVE -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color:${COLOR_PRIMARY};border-bottom:3px solid ${COLOR_PRIMARY};padding-bottom:8px;margin:0 0 15px 0;font-size:1rem;display:flex;align-items:center;gap:8px;">
            📌 PARTIE INTRODUCTIVE
            <span style="background:${COLOR_PRIMARY};color:white;padding:2px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">15 min</span>
        </h2>
        <div style="background:${COLOR_PRIMARY_LIGHT};padding:10px 15px;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};margin-bottom:12px;">
            <strong style="color:${COLOR_PRIMARY};">🎯 But:</strong> <span style="font-weight:500;">Préparer le corps à l'effort</span>
        </div>
        <div style="background:#f8f9fa;padding:12px 15px;border-radius:8px;font-size:0.9rem;line-height:1.7;">
            <div style="margin-bottom:6px;">• <strong>Prise en main:</strong> Appel, vérification des tenues, présentation de l'objectif, consignes de sécurité</div>
            <div style="margin-bottom:6px;">• <strong>Échauffement général:</strong> Course lente, montées de genoux, talons-fesses, mobilisation articulaire</div>
            <div>• <strong>Échauffement spécifique:</strong> ${echaufSpec}</div>
        </div>
    </div>

    <!-- PARTIE FONDAMENTALE -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color:${COLOR_PRIMARY};border-bottom:3px solid ${COLOR_PRIMARY};padding-bottom:8px;margin:0 0 15px 0;font-size:1rem;display:flex;align-items:center;gap:8px;">
            ⚡ PARTIE FONDAMENTALE
            <span style="background:${COLOR_PRIMARY};color:white;padding:2px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">30 min</span>
        </h2>
        <div style="background:${COLOR_PRIMARY_LIGHT};padding:10px 15px;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};margin-bottom:18px;">
            <strong style="color:${COLOR_PRIMARY};">🎯 But:</strong> <span style="font-weight:500;">${butFonda}</span>
        </div>

        <!-- SITUATION 1 -->
        <div style="background:#f8f9fa;border-radius:10px;padding:15px 18px;margin-bottom:18px;border:1px solid #d0d0d0;">
            <h3 style="color:${COLOR_PRIMARY};margin:0 0 12px 0;font-size:0.95rem;display:flex;align-items:center;gap:8px;">
                <span style="background:${COLOR_PRIMARY};color:white;padding:3px 10px;border-radius:6px;font-size:0.7rem;font-weight:700;">SIT 1</span>
                ${s1Titre}
            </h3>
            <div style="background:white;padding:10px 15px;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};margin-bottom:12px;">
                <strong style="color:${COLOR_PRIMARY};">🎯 But:</strong> <em style="color:#666;font-size:0.85rem;">(Ce que l'élève doit FAIRE)</em><br>
                <span style="font-weight:600;font-size:1rem;">${s1But}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.85rem;">
                <div>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_PRIMARY};">📍 Organisation:</strong> ${s1Orga}</p>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_PRIMARY};">📋 Déroulement:</strong> ${s1Deroul}</p>
                </div>
                <div>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_PRIMARY};">📢 Consignes:</strong></p>
                    <div style="margin-left:10px;line-height:1.6;">${s1Consignes.split('\n').map(c => '<div>→ ' + c.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '') + '</div>').join('')}</div>
                </div>
            </div>
            <div style="background:${COLOR_ACCENT};padding:8px 12px;border-radius:6px;margin-top:10px;font-size:0.85rem;">
                <strong style="color:${COLOR_PRIMARY};">🔄 Variantes:</strong> ${s1Variantes.replace(/\n/g, ' | ')}
            </div>
            <div style="margin-top:12px;padding:12px;background:${COLOR_ACCENT};border-radius:8px;text-align:center;">
                <p style="font-weight:bold;color:${COLOR_PRIMARY};margin:0 0 8px 0;font-size:0.85rem;">📐 Schéma d'organisation</p>
                ${schema1}
            </div>
        </div>

        <!-- SITUATION 2 -->
        <div style="background:#f8f9fa;border-radius:10px;padding:15px 18px;margin-bottom:18px;border:1px solid #d0d0d0;">
            <h3 style="color:${COLOR_SECONDARY};margin:0 0 12px 0;font-size:0.95rem;display:flex;align-items:center;gap:8px;">
                <span style="background:${COLOR_SECONDARY};color:white;padding:3px 10px;border-radius:6px;font-size:0.7rem;font-weight:700;">SIT 2</span>
                ${s2Titre}
            </h3>
            <div style="background:white;padding:10px 15px;border-radius:8px;border-left:4px solid ${COLOR_SECONDARY};margin-bottom:12px;">
                <strong style="color:${COLOR_SECONDARY};">🎯 But:</strong> <em style="color:#666;font-size:0.85rem;">(Ce que l'élève doit FAIRE)</em><br>
                <span style="font-weight:600;font-size:1rem;">${s2But}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.85rem;">
                <div>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_SECONDARY};">📍 Organisation:</strong> ${s2Orga}</p>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_SECONDARY};">📋 Déroulement:</strong> ${s2Deroul}</p>
                </div>
                <div>
                    <p style="margin:0 0 8px 0;"><strong style="color:${COLOR_SECONDARY};">📢 Consignes:</strong></p>
                    <div style="margin-left:10px;line-height:1.6;">${s2Consignes.split('\n').map(c => '<div>→ ' + c.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '') + '</div>').join('')}</div>
                </div>
            </div>
            <div style="background:${COLOR_ACCENT};padding:8px 12px;border-radius:6px;margin-top:10px;font-size:0.85rem;">
                <strong style="color:${COLOR_PRIMARY};">🔄 Variantes:</strong> ${s2Variantes.replace(/\n/g, ' | ')}
            </div>
            <div style="margin-top:12px;padding:12px;background:${COLOR_ACCENT};border-radius:8px;text-align:center;">
                <p style="font-weight:bold;color:${COLOR_SECONDARY};margin:0 0 8px 0;font-size:0.85rem;">📐 Schéma d'organisation</p>
                ${schema2}
            </div>
        </div>

        <!-- SITUATION DE RÉFÉRENCE -->
        <div style="background:${COLOR_ACCENT};border-radius:10px;padding:12px 18px;border:1px solid #d0d0d0;">
            <h3 style="color:${COLOR_PRIMARY};margin:0 0 8px 0;font-size:0.9rem;">◆ SITUATION DE RÉFÉRENCE</h3>
            <p style="margin:0;font-size:0.9rem;font-weight:500;">${sitRef}</p>
        </div>
    </div>

    <!-- CRITÈRES -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px;">
        <div style="background:${COLOR_ACCENT};border-radius:10px;padding:15px 18px;border:1px solid #d0d0d0;">
            <h3 style="color:${COLOR_PRIMARY};margin:0 0 5px 0;font-size:0.9rem;">✅ Critères de RÉALISATION</h3>
            <p style="font-size:0.75rem;color:#666;margin:0 0 10px 0;font-style:italic;">COMMENT bien faire (qualité du geste)</p>
            <div style="font-size:0.85rem;line-height:1.7;">${critReal.split('\n').map(c => '<div>✓ ' + c.replace(/^[•\-]\s*/, '') + '</div>').join('')}</div>
        </div>
        <div style="background:${COLOR_ACCENT};border-radius:10px;padding:15px 18px;border:1px solid #d0d0d0;">
            <h3 style="color:${COLOR_SECONDARY};margin:0 0 5px 0;font-size:0.9rem;">🎯 Critères de RÉUSSITE</h3>
            <p style="font-size:0.75rem;color:#666;margin:0 0 10px 0;font-style:italic;">EST-CE RÉUSSI ? (mesurable, chiffré)</p>
            <div style="font-size:0.85rem;line-height:1.7;">${critReuss.split('\n').map(c => '<div>✓ ' + c.replace(/^[•\-]\s*/, '') + '</div>').join('')}</div>
        </div>
    </div>

    <!-- PARTIE FINALE -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color:${COLOR_PRIMARY};border-bottom:3px solid ${COLOR_PRIMARY};padding-bottom:8px;margin:0 0 15px 0;font-size:1rem;display:flex;align-items:center;gap:8px;">
            🧘 PARTIE FINALE
            <span style="background:${COLOR_PRIMARY};color:white;padding:2px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">10 min</span>
        </h2>
        <div style="background:${COLOR_PRIMARY_LIGHT};padding:10px 15px;border-radius:8px;border-left:4px solid ${COLOR_PRIMARY};margin-bottom:12px;">
            <strong style="color:${COLOR_PRIMARY};">🎯 But:</strong> <span style="font-weight:500;">Retour au calme</span>
        </div>
        <div style="background:#f8f9fa;padding:12px 15px;border-radius:8px;font-size:0.9rem;line-height:1.7;">
            <div style="margin-bottom:6px;">• Marche lente avec respiration profonde (inspiration nasale, expiration buccale)</div>
            <div style="margin-bottom:6px;">• Étirements des groupes musculaires sollicités (quadriceps, ischio-jambiers, mollets, épaules)</div>
            <div>• Bilan de séance avec les élèves et rangement du matériel</div>
        </div>
    </div>
</div>`;

        // ==================== HTML WORD/PDF - A4 PAYSAGE ====================
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="UTF-8">
<title>Fiche Séance ${aps} ${niveau}</title>
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
    margin: 0.5cm;
}
@page Section1 {
    size: 297mm 210mm;
    mso-page-orientation: landscape;
    margin: 0.5cm;
}
div.Section1 {
    page: Section1;
}
body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 8pt;
    line-height: 1.2;
    margin: 0;
    padding: 0;
}
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}
th, td {
    border: 0.5pt solid #000;
    padding: 3px 4px;
    vertical-align: top;
}
.header-table td {
    border: none;
    padding: 2px 4px;
    font-size: 7.5pt;
}
.main-title {
    text-align: center;
    font-size: 11pt;
    font-weight: bold;
    background: #1e3a5f;
    color: #fff;
    padding: 4px;
}
.section-header {
    background: #f0f0f0;
    font-weight: bold;
    font-size: 6.5pt;
    text-align: center;
}
.obj-row {
    background: #1e3a5f;
    color: #fff;
    font-weight: bold;
    font-size: 8pt;
}
.table-header {
    background: #1e3a5f;
    color: #fff;
    font-weight: bold;
    text-align: center;
    font-size: 7pt;
    padding: 4px;
}
.partie-cell {
    font-weight: bold;
    text-align: center;
    background: #f5f5f5;
    font-size: 8pt;
    writing-mode: vertical-rl;
    text-orientation: mixed;
}
.content-cell {
    font-size: 7pt;
    line-height: 1.25;
}
.sit-title {
    font-weight: bold;
    color: #1e3a5f;
    font-size: 7.5pt;
    margin-bottom: 2px;
}
.but-cell {
    background: #f5f5f5;
    font-size: 7pt;
    text-align: center;
    vertical-align: middle;
}
.crit-cell {
    font-size: 6.5pt;
    line-height: 1.3;
}
</style>
</head>
<body>
<div class="Section1">

<table class="header-table">
<tr>
<td style="width:25%"><b>Professeur:</b> ${nomProf || '________________________'}</td>
<td style="width:30%;text-align:center"><b>Établissement:</b> ${etablissement || '________________________'}</td>
<td style="width:20%;text-align:center"><b>Classe:</b> ${classe || '__________'}</td>
<td style="width:25%;text-align:right"><b>Année scolaire:</b> ${anneeScolaire || '2024-2025'}</td>
</tr>
</table>

<table>
<tr><td class="main-title" colspan="5">FICHE DE SÉANCE EPS - ${aps.toUpperCase()}</td></tr>
</table>

<table>
<tr>
<td class="section-header" style="width:8%">Groupe APS</td>
<td style="width:12%;font-size:7.5pt;text-align:center">${groupeAPS}</td>
<td class="section-header" style="width:5%">APS</td>
<td style="width:10%;font-size:8pt;text-align:center;font-weight:bold;color:#1e3a5f">${aps}</td>
<td class="section-header" style="width:6%">Niveau</td>
<td style="width:6%;font-size:7.5pt;text-align:center">${niveau}</td>
<td class="section-header" style="width:6%">Séance</td>
<td style="width:5%;font-size:9pt;text-align:center;font-weight:bold">${numeroSeance || 1}</td>
</tr>
<tr>
<td class="section-header">OTI</td>
<td colspan="7" style="font-size:6pt;line-height:1.2">${oti}</td>
</tr>
<tr>
<td class="section-header">OTC</td>
<td colspan="7" style="font-size:6pt;line-height:1.2">${otc}</td>
</tr>
<tr>
<td class="obj-row" style="text-align:center">OBJECTIF</td>
<td colspan="7" style="background:#e8eef4;font-size:8pt;font-weight:bold;padding:5px">${objectif}</td>
</tr>
</table>

<table>
<tr>
<th class="table-header" style="width:6%">PARTIES</th>
<th class="table-header" style="width:54%">CONTENU / SITUATIONS D'APPRENTISSAGE</th>
<th class="table-header" style="width:10%">BUT</th>
<th class="table-header" style="width:15%">C. RÉALISATION<br><span style="font-weight:normal;font-size:5.5pt">(comment faire)</span></th>
<th class="table-header" style="width:15%">C. RÉUSSITE<br><span style="font-weight:normal;font-size:5.5pt">(est-ce réussi?)</span></th>
</tr>

<tr style="height:55px;">
<td class="partie-cell">INTRO<br>15 min</td>
<td class="content-cell">
<b>• Prise en main:</b> Appel, tenues, présentation objectif, consignes sécurité<br>
<b>• Échauffement général:</b> Course lente, montées genoux, talons-fesses, mobilisation articulaire<br>
<b>• Échauffement spécifique:</b> ${echaufSpec}
</td>
<td class="but-cell">Préparer le corps à l'effort</td>
<td class="crit-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666">—</td>
<td class="crit-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666">—</td>
</tr>

<tr style="height:180px;">
<td class="partie-cell">FONDA<br>30 min</td>
<td class="content-cell">
<div class="sit-title">◆ SITUATION 1: ${s1Titre}</div>
<b>But:</b> ${s1But}<br>
<b>Organisation:</b> ${s1Orga}<br>
<b>Déroulement:</b> ${s1Deroul}<br>
<b>Consignes:</b> ${s1Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s1Variantes.replace(/\n/g, ' | ')}<br><br>

${!skipSituation2 ? `<div class="sit-title" style="color:#1565c0">◆ SITUATION 2: ${s2Titre}</div>
<b>But:</b> ${s2But}<br>
<b>Organisation:</b> ${s2Orga}<br>
<b>Déroulement:</b> ${s2Deroul}<br>
<b>Consignes:</b> ${s2Consignes.replace(/\n/g, ' | ')}<br>
<b>Variantes:</b> ${s2Variantes.replace(/\n/g, ' | ')}<br><br>` : ''}

<div class="sit-title" style="color:#e65100">◆ SITUATION DE RÉFÉRENCE:</div>
${sitRef}
</td>
<td class="but-cell" style="font-size:6.5pt;padding:4px">${butFonda}</td>
<td class="crit-cell">${critReal.replace(/\n/g, '<br>')}</td>
<td class="crit-cell">${critReuss.replace(/\n/g, '<br>')}</td>
</tr>

<tr style="height:45px;">
<td class="partie-cell">FINALE<br>10 min</td>
<td class="content-cell">
<b>•</b> Marche lente avec respiration profonde (inspiration nasale, expiration buccale)<br>
<b>•</b> Étirements des groupes musculaires sollicités (quadriceps, ischio-jambiers, mollets)<br>
<b>•</b> Bilan de séance avec les élèves et rangement du matériel
</td>
<td class="but-cell">Retour au calme</td>
<td class="crit-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666">—</td>
<td class="crit-cell" style="text-align:center;vertical-align:middle;font-style:italic;color:#666">—</td>
</tr>
</table>

<p style="text-align:center;font-size:6pt;color:#666;margin-top:4px">
Document conforme aux Orientations Pédagogiques ${isCollege ? '2009 (Collège)' : '2007 (Lycée)'} - Ministère de l'Éducation Nationale - Maroc
</p>

</div>
</body>
</html>`;

        const filename = `Fiche_${aps.replace(/\s+/g, '_')}_${niveau}_S${numeroSeance || 1}.doc`;

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
        console.error('Erreur generer-fiche:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
