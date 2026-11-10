const fs = require('fs');
const path = require('path');

const pubDir = path.join(process.cwd(), 'public');
const allHtml = fs.readdirSync(pubDir).filter(f => f.endsWith('.html') && f !== 'google9e56188ccdfea7e9.html');

// 1. Fix any remaining "2007 (Collège) & 2009 (Lycée)" or "2007 (Collège) et 2009 (Lycée)" text across all HTML files
let fixedInvertedOpText = 0;
for (const file of allHtml) {
  const fp = path.join(pubDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;
  html = html
    .replace(/2007\s*\(Collège\)\s*(&|&amp;|et)\s*2009\s*\(Lycée\)/gi, '2007 (Lycée) $1 2009 (Collège)')
    .replace(/OP\s*2007\s*\(Collège\)/gi, 'OP 2007 (Lycée)')
    .replace(/OP\s*2009\s*\(Lycée\)/gi, 'OP 2009 (Collège)');
  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    const rootCopy = path.join(process.cwd(), file);
    if (fs.existsSync(rootCopy)) fs.writeFileSync(rootCopy, html, 'utf8');
    fixedInvertedOpText++;
  }
}

// 2. Add Grille d'Évaluation Barémée Course en Durée (OP 2009 Collège & OP 2007 Lycée) + FAQPage JSON-LD to article-course-duree-eps.html
const courseDureePath = path.join(pubDir, 'article-course-duree-eps.html');
let courseHtml = fs.readFileSync(courseDureePath, 'utf8');

if (!courseHtml.includes('id="grille-evaluation-course-duree"')) {
  const grilleBlock = `
            <section id="grille-evaluation-course-duree" style="margin:2.5rem 0;padding:1.75rem;background:linear-gradient(135deg,#fff8f8 0%,#f8fafc 50%,#f3faf6 100%);border:1px solid #cbd5e1;border-left:5px solid #991b1b;border-radius:16px;">
                <h2 style="margin-top:0;color:#0f172a;font-size:1.45rem;font-weight:800;">📊 Grille d'Évaluation Barémée en Course de Durée (Collège OP 2009 &amp; Lycée OP 2007)</h2>
                <p style="color:#334155;font-size:0.95rem;line-height:1.65;">Conformément aux <strong>Orientations Pédagogiques 2009 (Collège — sur 20 pts)</strong> et <strong>OP 2007 (Lycée : Tronc Commun, 1ère Bac, 2ème Bac)</strong>, l'évaluation sommative en course en durée combine la <strong>Performance (% VMA soutenu sur 6 à 12 min)</strong>, la <strong>Régularité d'allure (écart par tour de 200m)</strong> et les <strong>Connaissances / Rôles sociaux (chronométreur-observateur)</strong>.</p>
                <div class="table-container" style="margin-top:1rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>Niveau Scolaire</th>
                                <th>Produit / Performance (% VMA)</th>
                                <th>Processus / Régularité d'Allure</th>
                                <th>Connaissances &amp; Co-Évaluation</th>
                                <th>Outil de Calcul Associé</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Collège (1ère, 2ème, 3ème AC — OP 2009)</strong></td>
                                <td><strong>8 à 10 pts</strong><br>Maintenir 85% à 95% de sa VMA sur 6 min (Test Demi-Cooper) sans marcher.</td>
                                <td><strong>6 à 8 pts</strong><br>Écart &le; &plusmn;5 sec par tour de 200m (respect des plots sonores tous les 25m).</td>
                                <td><strong>4 pts</strong><br>Échauffement autonome, prise de FC et tenue de la fiche d'observation.</td>
                                <td><a href="calculateur-vma.html" style="color:#991b1b;font-weight:700;text-decoration:underline;">⚡ Calculateur VMA &amp; Plots</a></td>
                            </tr>
                            <tr>
                                <td><strong>Lycée — Tronc Commun (OP 2007)</strong></td>
                                <td><strong>6 pts</strong><br>Courir 8 min ou 2&times;5 min entre 90% et 100% VMA.</td>
                                <td><strong>8 pts</strong><br>Régularité inter-tours (&plusmn;3 sec/tour) et aisance respiratoire.</td>
                                <td><strong>6 pts</strong><br>Connaissance de sa VMA, FC de récupération et arbitrage.</td>
                                <td><a href="article-test-demi-cooper-vma.html" style="color:#006233;font-weight:700;text-decoration:underline;">📏 Protocole Demi-Cooper 6'</a></td>
                            </tr>
                            <tr>
                                <td><strong>Lycée — 1ère &amp; 2ème Bac (OP 2007)</strong></td>
                                <td><strong>7 pts</strong><br>Réaliser un projet personnel d'allure (95% à 105% VMA en continu ou fractionné).</td>
                                <td><strong>7 pts</strong><br>Respect strict du projet annoncé (&lt; 5% d'écart global) et foulée économique.</td>
                                <td><strong>6 pts</strong><br>Justification physiologique du projet et régulation de la charge.</td>
                                <td><a href="vma-differencier-course-duree-eps.html" style="color:#2563eb;font-weight:700;text-decoration:underline;">📘 Guide Groupes VMA EPS</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>`;
  courseHtml = courseHtml.replace('</div>\n    </article>', grilleBlock + '\n        </div>\n    </article>');
  fs.writeFileSync(courseDureePath, courseHtml, 'utf8');
}

// 3. Inject "Bandeau Urgence Concours CRMEF 2026 + Maillage Direct vers les 43 pages à indexer" into key hub pages
const urgencyMeshHtml = `
<!-- PROFEPS_CRMEF_URGENCY_MESH_START -->
<section id="profeps-crmef-urgency-banner" style="max-width:1200px;margin:1.75rem auto;padding:1.5rem;background:linear-gradient(135deg,#fff8f8 0%,#ffffff 50%,#f3faf6 100%);border:2px solid #991b1b;border-left:6px solid #991b1b;border-radius:18px;box-shadow:0 10px 28px -8px rgba(153,27,27,0.14);font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif;">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.85rem;">
    <div>
      <span style="display:inline-block;padding:0.25rem 0.75rem;background:#991b1b;color:#ffffff;font-size:0.72rem;font-weight:800;border-radius:999px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.35rem;">🔥 Spécial Concours CRMEF 2026 · مباراة التعليم</span>
      <h2 style="margin:0;font-size:1.25rem;font-weight:900;color:#0f172a;">Révision Express Concours d'Enseignement CRMEF : 29 Simulateurs QCM &amp; Guides Officiels</h2>
      <p style="margin:0.25rem 0 0;font-size:0.85rem;color:#334155;">Accès direct aux banques de QCM corrigés (Sciences de l'Éducation, Didactique &amp; Spécialité — Toutes les 13 filières) et aux 10 guides scientifiques EPS.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
      <a href="concours-crmef-hub.html" style="padding:0.65rem 1.15rem;background:#991b1b;color:#ffffff;font-weight:800;font-size:0.82rem;border-radius:10px;text-decoration:none;box-shadow:0 4px 12px rgba(153,27,27,0.25);">🎓 Ouvrir le Hub Concours CRMEF</a>
      <a href="qcm-150-questions-crmef-eps.html" style="padding:0.65rem 1.15rem;background:#006233;color:#ffffff;font-weight:800;font-size:0.82rem;border-radius:10px;text-decoration:none;box-shadow:0 4px 12px rgba(0,98,51,0.22);">⚡ 150 QCM Concours EPS</a>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0.5rem;font-size:0.78rem;font-weight:700;">
    <a href="qcm-sciences-education-crmef.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📘 QCM Sciences de l'Éducation (علوم التربية)</a>
    <a href="qcm-concours-crmef.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🎯 Simulateur QCM Général CRMEF</a>
    <a href="qcm-didactique-eps-maroc.html" style="padding:0.5rem 0.75rem;background:#fff8f8;border:1px solid #f5c2c7;border-radius:8px;color:#991b1b;text-decoration:none;">🏃 QCM Didactique EPS (OP 2007/2009)</a>
    <a href="qcm-specialite-eps-maroc.html" style="padding:0.5rem 0.75rem;background:#fff8f8;border:1px solid #f5c2c7;border-radius:8px;color:#991b1b;text-decoration:none;">🏅 QCM Spécialité EPS &amp; Biomécanique</a>
    <a href="qcm-didactique-primaire-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🏫 QCM Didactique Primaire (الابتدائي)</a>
    <a href="qcm-specialite-primaire-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📚 QCM Spécialité Primaire</a>
    <a href="qcm-didactique-francais-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📖 QCM Didactique Français (OP Lycée/Collège)</a>
    <a href="qcm-specialite-francais-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">✍️ QCM Spécialité Français</a>
    <a href="qcm-didactique-maths-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📐 QCM Didactique Mathématiques</a>
    <a href="qcm-specialite-maths-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🧮 QCM Spécialité Mathématiques</a>
    <a href="qcm-didactique-physique-chimie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">⚗️ QCM Didactique Physique-Chimie</a>
    <a href="qcm-specialite-physique-chimie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">⚛️ QCM Spécialité Physique-Chimie</a>
    <a href="qcm-didactique-svt-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🧬 QCM Didactique SVT</a>
    <a href="qcm-specialite-svt-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🌿 QCM Spécialité SVT</a>
    <a href="qcm-didactique-arabe-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🕌 QCM ديداكتيك اللغة العربية</a>
    <a href="qcm-specialite-arabe-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📜 QCM تخصص اللغة العربية</a>
    <a href="qcm-didactique-education-islamique-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🌙 QCM ديداكتيك التربية الإسلامية</a>
    <a href="qcm-specialite-education-islamique-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">⚖️ QCM تخصص التربية الإسلامية</a>
    <a href="qcm-didactique-histoire-geographie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🌍 QCM ديداكتيك الاجتماعيات</a>
    <a href="qcm-specialite-histoire-geographie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🗺️ QCM تخصص التاريخ والجغرافيا</a>
    <a href="qcm-didactique-philosophie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🦉 QCM ديداكتيك الفلسفة</a>
    <a href="qcm-specialite-philosophie-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🏛️ QCM تخصص الفلسفة</a>
    <a href="qcm-didactique-anglais-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🇬🇧 QCM Didactique Anglais (ELT)</a>
    <a href="qcm-specialite-anglais-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🎓 QCM Spécialité Anglais</a>
    <a href="qcm-didactique-informatique-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">💻 QCM Didactique Informatique</a>
    <a href="qcm-specialite-informatique-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">🖥️ QCM Spécialité Informatique</a>
    <a href="qcm-didactique-economie-gestion-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📊 QCM Didactique Éco-Gestion</a>
    <a href="qcm-specialite-economie-gestion-maroc.html" style="padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;">📈 QCM Spécialité Éco-Gestion</a>
  </div>

  <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px dashed #cbd5e1;display:flex;flex-wrap:wrap;gap:0.5rem;font-size:0.76rem;">
    <strong style="color:#006233;">🔬 Guides Scientifiques &amp; Q&amp;A EPS :</strong>
    <a href="vma-differencier-course-duree-eps.html" style="color:#0f172a;text-decoration:underline;">Course de durée &amp; VMA</a> ·
    <a href="methode-vdot-jack-daniels-calcul-allures.html" style="color:#0f172a;text-decoration:underline;">Méthode VDOT Daniels</a> ·
    <a href="formule-karvonen-zones-cardiaques-fc-reserve.html" style="color:#0f172a;text-decoration:underline;">Formule de Karvonen</a> ·
    <a href="charge-entrainement-rpe-foster-monotonie-acwr.html" style="color:#0f172a;text-decoration:underline;">Charge RPE Foster &amp; ACWR</a> ·
    <a href="intermittent-hiit-changement-direction-cod.html" style="color:#0f172a;text-decoration:underline;">Intermittent HIIT &amp; COD</a> ·
    <a href="reserve-vitesse-anaerobie-asr-sports-co.html" style="color:#0f172a;text-decoration:underline;">Réserve Vitesse ASR</a> ·
    <a href="indice-endurance-peronnet-thibault-vma.html" style="color:#0f172a;text-decoration:underline;">Indice Endurance Péronnet</a> ·
    <a href="imc-sportif-masse-grasse-formule-deurenberg.html" style="color:#0f172a;text-decoration:underline;">IMC Sportif Deurenberg</a> ·
    <a href="courir-forte-chaleur-point-de-rosee-altitude.html" style="color:#0f172a;text-decoration:underline;">Chaleur &amp; Altitude</a> ·
    <a href="allure-ajustee-pente-gap-modele-minetti.html" style="color:#0f172a;text-decoration:underline;">Allure Pente GAP Minetti</a> ·
    <a href="article-difference-op-2007-2009-eps.html" style="color:#0f172a;text-decoration:underline;">Différence OP 2007 vs 2009</a> ·
    <a href="howto-preparer-bac-eps-maroc.html" style="color:#0f172a;text-decoration:underline;">Préparer le Bac EPS</a> ·
    <a href="qa-coefficient-eps-bac-maroc.html" style="color:#0f172a;text-decoration:underline;">Coefficient EPS Bac</a> ·
    <a href="qa-evaluation-eps-bac.html" style="color:#0f172a;text-decoration:underline;">Évaluation EPS Bac</a> ·
    <a href="qa-fiche-seance-eps.html" style="color:#0f172a;text-decoration:underline;">Modèle Fiche de Séance</a> ·
    <a href="qa-volume-horaire-eps-maroc.html" style="color:#0f172a;text-decoration:underline;">Volume Horaire EPS</a> ·
    <a href="cycle-badminton-lycee-eps-maroc.html" style="color:#0f172a;text-decoration:underline;">Cycle Badminton Lycée</a>
  </div>
</section>
<!-- PROFEPS_CRMEF_URGENCY_MESH_END -->`;

const targetHubFiles = [
  'index.html',
  'orientations-pedagogiques-eps-2007-2009.html',
  'article-op.html',
  'article-concours.html',
  'concours-eps-maroc.html',
  'concours-crmef-hub.html',
  'calculateur-vma.html',
  'blog.html',
  'hub-outils-sport-performance.html'
];

let injectedMeshPages = 0;
for (const file of targetHubFiles) {
  const fp = path.join(pubDir, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('id="profeps-crmef-urgency-banner"')) {
    if (html.includes('<footer')) {
      html = html.replace('<footer', urgencyMeshHtml + '\n<footer');
      fs.writeFileSync(fp, html, 'utf8');
      const rootCopy = path.join(process.cwd(), file);
      if (fs.existsSync(rootCopy)) fs.writeFileSync(rootCopy, html, 'utf8');
      injectedMeshPages++;
    }
  }
}

// 4. Add Bilingual FAQPage JSON-LD to concours-crmef-hub.html
const crmefHubPath = path.join(pubDir, 'concours-crmef-hub.html');
let crmefHubHtml = fs.readFileSync(crmefHubPath, 'utf8');
if (!crmefHubHtml.includes('"@type":"FAQPage"')) {
  const crmefFaqLd = `  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Comment préparer efficacement le concours CRMEF 2026 (مباراة التعليم) au Maroc ?","acceptedAnswer":{"@type":"Answer","text":"La préparation au concours d'accès aux CRMEF 2026 repose sur 3 piliers : 1) Sciences de l'Éducation (علوم التربية : théories d'apprentissage, APC, Loi-cadre 51.17, Feuille de route 2022-2026), 2) Didactique de la discipline (Orientations Pédagogiques 2007 Lycée et 2009 Collège, planification, gestion et évaluation), et 3) Spécialité académique via nos 29 simulateurs QCM corrigés sur ProfEPS.ma."}},{"@type":"Question","name":"Quelles sont les spécialités disponibles en QCM corrigés sur le Hub CRMEF ProfEPS.ma ?","acceptedAnswer":{"@type":"Answer","text":"Le Hub CRMEF ProfEPS.ma propose 29 simulateurs gratuits couvrant le Tronc Commun (Sciences de l'Éducation) et les 13 filières (Didactique + Spécialité) : EPS, Enseignement Primaire (TaRL), Français, Mathématiques, SVT, Physique-Chimie, Langue Arabe, Éducation Islamique, Histoire-Géographie, Philosophie, Anglais, Informatique et Économie-Gestion."}},{"@type":"Question","name":"ما هي التوجيهات التربوية المعتمدة في مباراة التعليم تخصص التربية البدنية 2026؟","acceptedAnswer":{"@type":"Answer","text":"تعتمد مباراة التعليم لتوظيف أساتذة التربية البدنية والرياضية بالمغرب (CRMEF 2026) على التوجيهات التربوية لسنة 2009 الخاصة بالسلك الثانوي الإعدادي، والتوجيهات التربوية لسنة 2007 الخاصة بالسلك الثانوي التأهيلي، بالإضافة إلى مستجدات علوم التربية والقانون الإطار 51.17."}}]}</script>\n`;
  crmefHubHtml = crmefHubHtml.replace('</head>', crmefFaqLd + '</head>');
  fs.writeFileSync(crmefHubPath, crmefHubHtml, 'utf8');
  const rootCrmef = path.join(process.cwd(), 'concours-crmef-hub.html');
  if (fs.existsSync(rootCrmef)) fs.writeFileSync(rootCrmef, crmefHubHtml, 'utf8');
}

console.log(JSON.stringify({ fixedInvertedOpText, injectedMeshPages }, null, 2));
