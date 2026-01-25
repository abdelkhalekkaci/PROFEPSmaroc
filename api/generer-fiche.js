module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        
        if (!GROQ_API_KEY) {
            return res.status(500).json({ success: false, error: 'GROQ_API_KEY non configurée' });
        }

        const { aps, apsAutre, objectif, niveau, nomProf, etablissement, anneeScolaire, numeroSeance } = req.body;
        const apsFinale = aps === 'Autre' ? apsAutre : aps;

        if (!apsFinale || !objectif) {
            return res.status(400).json({ success: false, error: 'APS et objectif requis' });
        }

        const isCollege = ['1AC', '2AC', '3AC'].includes(niveau);
        const opReference = isCollege ? 'OP 2009' : 'OP 2007';

        const prompt = `Tu es un expert en EPS au Maroc. Génère une fiche détaillée pour ${apsFinale} niveau ${niveau}.
OBJECTIF: ${objectif}
SÉANCE N°: ${numeroSeance || 1}

Génère une fiche avec:
<h3>📌 PARTIE INTRODUCTIVE (15 min)</h3>
- Prise en main, échauffement général et spécifique

<h3>⚡ PARTIE FONDAMENTALE (35 min)</h3>
- 2-3 situations d'apprentissage progressives
- Critères de réalisation (gestes PENDANT)
- Critères de réussite (résultats À LA FIN)
- Situation de référence

<h3>🧘 PARTIE FINALE (10 min)</h3>
- Retour au calme, étirements, bilan

===SEPARATEUR===
Version condensée pour Word
===SEPARATEUR===
3 vidéos YouTube recommandées`;

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 8000,
                temperature: 0.7
            })
        });

        if (!groqResponse.ok) {
            const err = await groqResponse.json();
            throw new Error(err.error?.message || 'Erreur Groq');
        }

        const data = await groqResponse.json();
        const contenu = data.choices[0].message.content;
        const parties = contenu.split('===SEPARATEUR===');

        const groupeAPS = ['Handball','Football','Basketball','Volleyball'].includes(apsFinale) ? 'Sport collectif' : 
                         apsFinale === 'Gymnastique' ? 'Gymnastique' : 
                         ['Course de vitesse','Saut en longueur','Lancer de poids'].includes(apsFinale) ? 'Athlétisme' : 'Sport';

        const sitRef = {
            'Handball': 'Match 7c7', 'Football': 'Match 7c7', 'Basketball': 'Match 5c5',
            'Volleyball': 'Match 6c6', 'Gymnastique': 'Enchaînement', 
            'Course de vitesse': '2 courses chrono', 'Saut en longueur': '3 essais'
        }[apsFinale] || 'Situation finale';

        const html = `<html xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><style>
@page{size:297mm 210mm;margin:0.5cm}body{font-family:Calibri;font-size:10pt}
table{width:100%;border-collapse:collapse}th,td{border:1pt solid #000;padding:4px}
.title{background:#1a5c3a;color:#fff;text-align:center;font-size:14pt;padding:8px}
.header{background:#1a5c3a;color:#fff;font-weight:bold;text-align:center}
.partie{background:#f5f5f5;font-weight:bold;text-align:center}
</style></head><body>
<table><tr><td style="border:none"><b>Prof:</b> ${nomProf||'___'}</td><td style="border:none"><b>Étab:</b> ${etablissement||'___'}</td><td style="border:none"><b>Année:</b> ${anneeScolaire||'___'}</td><td style="border:none"><b>Séance:</b> ${numeroSeance||1}</td></tr></table>
<table><tr><td class="title">FICHE - ${apsFinale.toUpperCase()}</td></tr></table>
<table><tr><td><b>Groupe:</b> ${groupeAPS}</td><td><b>APS:</b> ${apsFinale}</td><td><b>Niveau:</b> ${niveau}</td></tr>
<tr><td colspan="3" style="background:#f0f8f0"><b>OBJECTIF:</b> ${objectif}</td></tr></table>
<table><tr><th class="header">PARTIES</th><th class="header">DURÉE</th><th class="header">CONTENU</th><th class="header">BUT</th><th class="header">C.RÉALISATION</th><th class="header">C.RÉUSSITE</th></tr>
<tr><td class="partie">INTRO</td><td>15min</td><td>Prise en main, échauffement</td><td>Activation</td><td>Mobilisation progressive</td><td>Élèves échauffés</td></tr>
<tr><td class="partie">FOND.</td><td>35min</td><td>Situations + ${sitRef}</td><td>Atteindre objectif</td><td>Respect consignes</td><td>Réussites visibles</td></tr>
<tr><td class="partie">FINALE</td><td>10min</td><td>Retour calme, bilan</td><td>Récupérer</td><td>Respiration contrôlée</td><td>Participation</td></tr>
</table><p style="text-align:center;font-size:8pt">Conforme aux ${opReference} - MEN Maroc</p></body></html>`;

        return res.status(200).json({
            success: true,
            ficheDetaillee: parties[0] || contenu,
            ficheCondensee: parties[1] || '',
            videos: parties[2] || '',
            html,
            filename: `Fiche_${apsFinale}_${niveau}.doc`
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
```

4. Cliquez **Commit changes**

---

### 🔄 Attendez 2 minutes puis testez

Après le redéploiement, ouvrez :
```
https://profeps-mtd6626b2-abdelkhalekkacis-projects.vercel.app/api/generer-fiche
