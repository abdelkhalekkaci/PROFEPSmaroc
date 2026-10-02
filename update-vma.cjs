const fs = require('fs');
const path = require('path');
const targetFile = path.resolve('calculateur-vma.html');
if (!fs.existsSync(targetFile)) {
  console.error("❌ 'calculateur-vma.html' introuvable.");
  process.exit(1);
}
let html = fs.readFileSync(targetFile, 'utf8');

const faqSchema = `
    <!-- ═══ SCHEMA.ORG FAQPAGE ═══ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment calculer sa VMA facilement ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Le test Demi-Cooper (6 minutes) : distance en mètres x 0.01 = VMA en km/h." }
        },
        {
          "@type": "Question",
          "name": "How to calculate MAS (Maximal Aerobic Speed)?",
          "acceptedAnswer": { "@type": "Answer", "text": "Demi-Cooper 6-minute test: distance in meters x 0.01 = MAS in km/h." }
        }
      ]
    }
    </script>
`;
if (!html.includes('FAQPage')) html = html.replace('</head>', faqSchema + '\n</head>');

const extraCSS = `
        /* ═══ CARTES PRÉDICTION & JAUGE VISUELLE ═══ */
        .track-chips-wrapper { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.4rem 0 0.6rem; }
        .track-chip { background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.65rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease; }
        .track-chip:hover, .track-chip.active { background: #c1272d; color: white; border-color: #c1272d; }
        .race-predict-section { margin: 1.5rem 0; }
        .race-predict-title { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .race-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        @media (max-width: 768px) { .race-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .race-grid { grid-template-columns: 1fr; } }
        .race-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-top: 3px solid #0284c7; }
        .race-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .race-dist-name { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #64748b; }
        .race-time-val { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0; }
        .race-pace-sub { font-size: 0.75rem; color: #0284c7; font-weight: 600; }
        .vma-gauge-box { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; }
        .vma-gauge-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .vma-gauge-bar { height: 12px; border-radius: 9999px; background: linear-gradient(90deg, #64748b 0%, #0284c7 25%, #10b981 50%, #f97316 75%, #ef4444 100%); position: relative; }
        .vma-gauge-needle { position: absolute; top: -6px; width: 4px; height: 24px; background: #0f172a; border-radius: 2px; transform: translateX(-50%); transition: left 0.4s ease; }
        .vma-gauge-labels { display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; font-weight: 600; margin-top: 0.4rem; }
`;
if (!html.includes('race-predict-section')) html = html.replace('</style>', extraCSS + '\n</style>');

const trackChipsHTML = `
    <div class="track-chips-wrapper">
        <span style="font-size:0.75rem; font-weight:600; color:#64748b; align-self:center;">Pistes types :</span>
        <button type="button" class="track-chip" onclick="setTrackDistance(200)">200m (Gym/Salle)</button>
        <button type="button" class="track-chip active" onclick="setTrackDistance(250)">250m (Collège/Lycée)</button>
        <button type="button" class="track-chip" onclick="setTrackDistance(300)">300m</button>
        <button type="button" class="track-chip" onclick="setTrackDistance(400)">400m (Olympique)</button>
    </div>
`;
if (!html.includes('track-chips-wrapper')) {
  html = html.replace('<input type="number" id="trackLengthInput"', trackChipsHTML + '<input type="number" id="trackLengthInput"');
}

const racePredictorHTML = `
            <!-- Jauge visuelle de Niveau & Intensité -->
            <div class="vma-gauge-box">
                <div class="vma-gauge-header">
                    <span style="font-size:0.85rem; font-weight:700; color:#0f172a;">Spectre Physiologique & Intensité</span>
                    <span id="gaugeLevelBadge" style="font-size:0.75rem; font-weight:700; background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:9999px;">Niveau Récréatif</span>
                </div>
                <div class="vma-gauge-bar"><div class="vma-gauge-needle" id="gaugeNeedle" style="left: 50%;"></div></div>
                <div class="vma-gauge-labels"><span>Récup (60%)</span><span>Endurance (75%)</span><span>Seuil (88%)</span><span>100% VMA</span><span>Sprint (>110%)</span></div>
            </div>
            <!-- Cartes de Prédictions Chronométriques -->
            <div class="race-predict-section">
                <div class="race-predict-title"><span>🎯</span> Estimations Chronométriques de Course (Selon votre VMA)</div>
                <div class="race-grid">
                    <div class="race-card" style="border-top-color:#0284c7;"><div class="race-dist-name">5 Km</div><div class="race-time-val" id="pred5k">--:--</div><div class="race-pace-sub" id="pace5k">-- min/km (~88% VMA)</div></div>
                    <div class="race-card" style="border-top-color:#10b981;"><div class="race-dist-name">10 Km</div><div class="race-time-val" id="pred10k">--:--</div><div class="race-pace-sub" id="pace10k">-- min/km (~85% VMA)</div></div>
                    <div class="race-card" style="border-top-color:#f59e0b;"><div class="race-dist-name">Semi-Marathon</div><div class="race-time-val" id="predSemi">--:--:--</div><div class="race-pace-sub" id="paceSemi">-- min/km (~80% VMA)</div></div>
                    <div class="race-card" style="border-top-color:#ef4444;"><div class="race-dist-name">Marathon</div><div class="race-time-val" id="predMarathon">--:--:--</div><div class="race-pace-sub" id="paceMarathon">-- min/km (~75% VMA)</div></div>
                </div>
            </div>
`;
if (!html.includes('race-predict-section')) {
  html = html.replace('<div id="results-wrapper">', '<div id="results-wrapper">\n' + racePredictorHTML);
}

const extraJS = `
    function setTrackDistance(val) {
        const input = document.getElementById("trackLengthInput");
        if (input) {
            input.value = val;
            document.querySelectorAll(".track-chip").forEach(c => c.classList.remove("active"));
            if (event && event.target) event.target.classList.add("active");
            updatePacesTable();
        }
    }
    function formatRaceTime(min) {
        if (!min || isNaN(min)) return "--:--";
        const h = Math.floor(min / 60), m = Math.floor(min % 60), s = Math.round((min * 60) % 60);
        return h > 0 ? (h + "h " + (m < 10 ? "0" + m : m) + "m") : ((m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s));
    }
    function formatPace(spd) {
        if (!spd) return "--:--";
        const p = 60 / spd, m = Math.floor(p), s = Math.round((p - m) * 60);
        return m + ":" + (s < 10 ? "0" + s : s) + " /km";
    }
    function updateRacePredictions(vma) {
        if (!vma) return;
        const p5 = document.getElementById("pred5k"), pc5 = document.getElementById("pace5k");
        if (p5) p5.textContent = formatRaceTime((5 / (vma * 0.88)) * 60);
        if (pc5) pc5.textContent = formatPace(vma * 0.88) + " (~88%)";
        const p10 = document.getElementById("pred10k"), pc10 = document.getElementById("pace10k");
        if (p10) p10.textContent = formatRaceTime((10 / (vma * 0.85)) * 60);
        if (pc10) pc10.textContent = formatPace(vma * 0.85) + " (~85%)";
        const pS = document.getElementById("predSemi"), pcS = document.getElementById("paceSemi");
        if (pS) pS.textContent = formatRaceTime((21.0975 / (vma * 0.80)) * 60);
        if (pcS) pcS.textContent = formatPace(vma * 0.80) + " (~80%)";
        const pM = document.getElementById("predMarathon"), pcM = document.getElementById("paceMarathon");
        if (pM) pM.textContent = formatRaceTime((42.195 / (vma * 0.75)) * 60);
        if (pcM) pcM.textContent = formatPace(vma * 0.75) + " (~75%)";
    }
    function updateVmaGauge(vma) {
        const needle = document.getElementById("gaugeNeedle"), badge = document.getElementById("gaugeLevelBadge");
        if (!needle || !badge) return;
        let pct = Math.max(0, Math.min(100, ((vma - 8) / 16) * 100));
        needle.style.left = pct + "%";
        badge.textContent = vma < 12 ? "Débutant / Santé" : vma < 15 ? "Intermédiaire / Récréatif" : vma < 18 ? "Confirmé / Club" : "Élite / Haut Niveau";
    }
`;
if (!html.includes('function updateRacePredictions')) {
  html = html.replace('function updatePacesTable', extraJS + '\n    function updatePacesTable');
  html = html.replace('resultsWrapper.style.display = "block";', 'resultsWrapper.style.display = "block"; updateRacePredictions(vma); updateVmaGauge(vma);');
}

fs.writeFileSync(targetFile, html, 'utf8');
console.log("✅ MODIFICATION RÉUSSIE : " + html.length + " octets écrits dans calculateur-vma.html !");
