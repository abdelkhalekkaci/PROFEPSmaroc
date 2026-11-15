const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT_INDEX = path.join(__dirname, '..', 'index.html');

// Grab standard EEAT and CMP blocks from hub-aps-sports-eps-maroc.html
const hubSample = fs.readFileSync(path.join(PUBLIC_DIR, 'hub-aps-sports-eps-maroc.html'), 'utf8');
const eeatMatch = hubSample.match(/<!-- PROFEPS_EEAT_AUTHOR_START -->[\s\S]*?<!-- PROFEPS_EEAT_AUTHOR_END -->/);
const standardEeatBlock = eeatMatch ? eeatMatch[0] : '';
const footerMatch = hubSample.match(/<footer class="footer" id="profeps-unified-footer">[\s\S]*?<\/footer>/);
const standardFooterBlock = footerMatch ? footerMatch[0] : '';
const cmpMatch = hubSample.match(/<!-- PROFEPS CMP BANNER -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
const standardCmpBlock = cmpMatch ? cmpMatch[0] : '';

// ---------------------------------------------------------------------------
// STEP 1: Fix trapped <footer id="profeps-unified-footer"> inside <script> in 9 APS files
//         + Make all .volet-panel visible + Normalize ?level=1BAC/2BAC + Pre-render containers
// ---------------------------------------------------------------------------
const apsFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('aps-') && f.endsWith('.html')).sort();

function preRenderApsDom(html, filename) {
  // Extract all inline scripts that are NOT JSON-LD and NOT profeps-master-unifier-js
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  const scriptsToRun = [];
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    const attrs = m[1] || '';
    const body = m[2] || '';
    if (attrs.includes('application/ld+json')) continue;
    if (attrs.includes('profeps-master-unifier-js')) continue;
    if (attrs.includes('src=')) continue;
    if (body.length > 1500) {
      scriptsToRun.push(body);
    }
  }
  if (!scriptsToRun.length) return html;

  // Build a lightweight DOM mock tracking elements by ID
  const elements = {};
  const idRegex = /<([a-zA-Z0-9]+)\b[^>]*\bid=["']([^"']+)["'][^>]*>/g;
  let idMatch;
  while ((idMatch = idRegex.exec(html)) !== null) {
    const tag = idMatch[1].toUpperCase();
    const id = idMatch[2];
    const fullOpenTag = idMatch[0];
    const valMatch = fullOpenTag.match(/\bvalue=["']([^"']*)["']/);
    let defaultVal = valMatch ? valMatch[1] : '';

    // If it's a <select>, find the selected <option> or first <option>
    if (tag === 'SELECT') {
      const selStart = idMatch.index + fullOpenTag.length;
      const selEnd = html.indexOf('</select>', selStart);
      if (selEnd !== -1) {
        const innerSelect = html.slice(selStart, selEnd);
        const selOpt = innerSelect.match(/<option\b[^>]*\bvalue=["']([^"']*)["'][^>]*\bselected\b/i)
          || innerSelect.match(/<option\b[^>]*\bselected\b[^>]*\bvalue=["']([^"']*)["']/i)
          || innerSelect.match(/<option\b[^>]*\bvalue=["']([^"']*)["']/i);
        if (selOpt) defaultVal = selOpt[1];
      }
    }

    elements[id] = {
      id,
      tagName: tag,
      value: defaultVal,
      innerHTML: '',
      textContent: '',
      innerText: '',
      style: {},
      dataset: {},
      classList: {
        add() {},
        remove() {},
        toggle() {},
        contains() { return false; }
      },
      setAttribute() {},
      getAttribute() { return ''; },
      addEventListener() {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
      scrollIntoView() {}
    };
  }

  function makeDummyEl(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        tagName: 'DIV',
        value: '',
        innerHTML: '',
        textContent: '',
        innerText: '',
        style: {},
        dataset: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        setAttribute() {},
        getAttribute() { return ''; },
        addEventListener() {},
        querySelector() { return null; },
        querySelectorAll() { return []; },
        scrollIntoView() {}
      };
    }
    return elements[id];
  }

  const domReadyCallbacks = [];
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    Math,
    Number,
    String,
    Boolean,
    Array,
    Object,
    RegExp,
    Date,
    JSON,
    parseFloat,
    parseInt,
    isNaN,
    isFinite,
    encodeURIComponent,
    decodeURIComponent,
    setTimeout: (fn) => { try { fn(); } catch (e) {} },
    clearTimeout: () => {},
    URLSearchParams,
    Blob: function() {},
    URL: { createObjectURL: () => '', revokeObjectURL: () => '' },
    localStorage: { getItem: () => null, setItem: () => {} },
    location: { search: '', hash: '', pathname: '/' + filename, href: 'https://profeps.ma/' + filename },
    history: { replaceState: () => {}, pushState: () => {} },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    document: {
      documentElement: {
        getAttribute: () => 'light',
        setAttribute: () => {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
      },
      body: {
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        appendChild() {},
        removeChild() {}
      },
      getElementById(id) {
        return makeDummyEl(id);
      },
      querySelector() {
        return makeDummyEl('__dummy_qs__');
      },
      querySelectorAll() {
        return [];
      },
      createElement() {
        return makeDummyEl('__dummy_ce__');
      },
      addEventListener(ev, fn) {
        if (ev === 'DOMContentLoaded') domReadyCallbacks.push(fn);
      }
    }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;

  const context = vm.createContext(sandbox);
  for (const code of scriptsToRun) {
    try {
      vm.runInContext(code, context, { timeout: 3000 });
    } catch (err) {
      console.error('Error running script in', filename, err.message);
    }
  }
  for (const fn of domReadyCallbacks) {
    try {
      fn();
    } catch (err) {
      console.error('Error in DOMContentLoaded for', filename, err.message);
    }
  }

  // Trigger extra renderers if exposed on window
  const extraCalls = [
    'renderStudioA4', 'renderEvaluationGrid', 'updatePoidsCalculator', 'updateHauteurCalculator',
    'evaluateTieBreakRT268', 'updateSautsCalculator', 'renderDureeStudio', 'renderDureeGrid',
    'recalcVMAStudio', 'renderSprintStudio', 'renderSprintGrid', 'renderGymStudio', 'renderGymGrid',
    'renderHaiesA4', 'calcHaiesIndex', 'calcHaiesCorridors', 'renderRugbyA4', 'calcRugbyNote',
    'renderRqA4', 'calcRaquettesNote', 'generateMontanteDescendante', 'renderStudio', 'renderGrille'
  ];
  for (const fnName of extraCalls) {
    if (typeof sandbox[fnName] === 'function') {
      try { sandbox[fnName](); } catch (e) {}
    }
  }

  // Target container IDs whose static HTML should be pre-rendered
  const targetContainers = [
    'rqA4Container', 'calcRqOutput', 'mdOutputContainer',
    'studioA4Preview', 'grilleA4Preview',
    'dureeA4PreviewSheet', 'dureeGridA4Container', 'vmaLiveKpis', 'vmaClassGroupsTableContainer',
    'haiesA4Container', 'calcHaiesOutput', 'calcHaiesCorridorOutput',
    'sprintA4PreviewSheet', 'sprintGridA4Container',
    'gymA4PreviewSheet', 'gymGridA4Container',
    'studioA4Sheet', 'gridPreviewContainer', 'poidsLiveKpis', 'poidsComparisonTableContainer',
    'rugbyA4Container', 'calcRugbyOutput',
    'hjLiveKpis', 'hjTablesContainer',
    'sautsLiveKpis', 'sautsTablesContainer'
  ];

  let updatedHtml = html;
  let injectedCount = 0;
  for (const cid of targetContainers) {
    const el = elements[cid];
    if (!el || !el.innerHTML || el.innerHTML.trim().length < 20) continue;

    // Replace <div ... id="cid" ...>...comment...</div>
    const pattern = new RegExp(`(<div\\b[^>]*\\bid=["']${cid}["'][^>]*>)([\\s\\S]*?)(<\\/div>)`, 'i');
    const match = updatedHtml.match(pattern);
    if (match && match[2].trim().length < 120 && match[2].trim().startsWith('<!--')) {
      updatedHtml = updatedHtml.replace(pattern, () => `${match[1]}\n${el.innerHTML}\n${match[3]}`);
      injectedCount++;
    }
  }
  console.log(`  [PreRender] ${filename}: pre-rendered ${injectedCount} dynamic containers`);
  return updatedHtml;
}

for (const file of apsFiles) {
  const filePath = path.join(PUBLIC_DIR, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Check if <footer class="footer" id="profeps-unified-footer"> is inside a <script> block
  const scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
  html = html.replace(scriptRegex, (scriptBlock) => {
    if (!scriptBlock.includes('profeps-unified-footer')) return scriptBlock;
    // Remove the injected footer from inside the script block
    let cleaned = scriptBlock.replace(/\n?<footer class="footer" id="profeps-unified-footer">[\s\S]*?<\/footer>\n?/g, '');
    // Also split literal </body></html> inside script strings so future regexes never match it
    cleaned = cleaned.replace(/<\/body><\/html>/g, "</bo\" + \"dy></ht\" + \"ml>");
    return cleaned;
  });

  // Also ensure any remaining literal </body></html> inside <script> across all APS files is escaped
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (scriptBlock) => {
    return scriptBlock.replace(/<\/body><\/html>/g, '</bo' + 'dy></ht' + 'ml>');
  });

  // 2. If the page now lacks a footer outside <script>, add standard E-E-A-T, Footer, and CMP banner before final </body>
  if (!html.includes('id="profeps-unified-footer"')) {
    const lastBodyIdx = html.lastIndexOf('</body>');
    if (lastBodyIdx !== -1) {
      const additions = [
        !html.includes('PROFEPS_EEAT_AUTHOR_START') ? standardEeatBlock : '',
        standardFooterBlock,
        !html.includes('profeps-cmp-banner') ? standardCmpBlock : ''
      ].filter(Boolean).join('\n\n');
      html = html.slice(0, lastBodyIdx) + '\n' + additions + '\n</body>' + html.slice(lastBodyIdx + 7);
    }
  }

  // 3. Make all .volet-panel visible by default so users & AdSense see all 6 Volets immediately,
  //    and make tab buttons smoothly scroll to the selected Volet while keeping all Volets visible
  html = html.replace(
    /\.volet-panel\s*\{\s*display:\s*none;\s*\}/g,
    '.volet-panel { display: block !important; margin-bottom: 2.25rem; scroll-margin-top: 90px; }\n        .volet-panel.active { display: block !important; }'
  );

  // Enhance switchVolet / switchDureeVolet / switchSprintVolet / switchGymVolet so clicking a tab scrolls smoothly to the section
  html = html.replace(
    /var target = document\.getElementById\(voletId\);\s*if \(target\) target\.classList\.add\("active"\);/g,
    'var target = document.getElementById(voletId);\n            if (target) { target.classList.add("active"); try { target.scrollIntoView({ behavior: "smooth", block: "start" }); } catch(e) {} }'
  );

  // 4. Normalize ?level=1BAC / ?level=2BAC in selectSchoolLevel and URL params for Poids, Hauteur, Longueur
  if (
    file === 'aps-lancer-poids-eps-maroc.html' ||
    file === 'aps-saut-hauteur-fosbury-eps-maroc.html' ||
    file === 'aps-saut-longueur-triple-saut-eps-maroc.html'
  ) {
    html = html.replace(
      /function selectSchoolLevel\(lvl\)\s*\{\s*if \(!SCHOOL_LEVELS\[lvl\]\) return;/,
      `function selectSchoolLevel(lvl) {
            var normMap = { '1AC': '1AC', '2AC': '2AC', '3AC': '3AC', 'TC': 'TC', '1BAC': '1Bac', '1Bac': '1Bac', '2BAC': '2Bac', '2Bac': '2Bac' };
            lvl = normMap[lvl] || normMap[String(lvl || '').toUpperCase()] || lvl;
            if (!SCHOOL_LEVELS[lvl]) return;`
    );

    if (!html.includes('URLSearchParams(window.location.search)')) {
      html = html.replace(
        /var h = \(window\.location\.hash \|\| ""\)\.replace\("#", ""\);/,
        `try {
                var params = new URLSearchParams(window.location.search);
                var qLvl = params.get("level") || params.get("niveau");
                if (qLvl) {
                    var normMap = { '1AC': '1AC', '2AC': '2AC', '3AC': '3AC', 'TC': 'TC', '1BAC': '1Bac', '1Bac': '1Bac', '2BAC': '2Bac', '2Bac': '2Bac' };
                    var mappedLvl = normMap[qLvl] || normMap[qLvl.toUpperCase()];
                    if (mappedLvl && SCHOOL_LEVELS[mappedLvl]) currentState.level = mappedLvl;
                }
            } catch (e) {}
            var h = (window.location.hash || "").replace("#", "");`
      );
    }
  }

  // 5. Pre-render dynamic Studio A4, Calculator, and Evaluation Grid containers into static HTML
  html = preRenderApsDom(html, file);

  fs.writeFileSync(filePath, html, 'utf8');
}

// ---------------------------------------------------------------------------
// STEP 2: Enrich Saut en Longueur, Saut en Hauteur & Lancer du Poids in
//         hub-aps-sports-eps-maroc.html, cycles-eps-maroc.html, ressources-atd.html, and index.html
// ---------------------------------------------------------------------------

// 2A. Enrich public/hub-aps-sports-eps-maroc.html
let hubHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'hub-aps-sports-eps-maroc.html'), 'utf8');

const oldTopGridRegex = /<!-- LES 5 PÔLES SPORTS PRIORITAIRES \(MAILLAGE RAPIDE EN 1 CLIC\) -->[\s\S]*?<\/section>/;
const newTopGridHtml = `<!-- ACCÈS RAPIDE AUX 13 PÔLES SPORTS & APS (MAILLAGE DIRECT EN 1 CLIC) -->
        <section style="background:#ffffff;border:2px solid #3347D6;border-radius:16px;padding:1.5rem;margin-bottom:2rem;box-shadow:0 6px 18px rgba(15,23,42,0.06);" aria-label="Accès Direct aux 13 Studios APS et Sports en EPS au Maroc">
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1.15rem;padding-bottom:0.85rem;border-bottom:1px solid #e2e8f0;">
                <div>
                    <span style="font-size:0.76rem;font-weight:900;text-transform:uppercase;letter-spacing:0.06em;color:#3347D6;background:var(--sky);padding:0.25rem 0.65rem;border-radius:999px;border:1px solid #cbd5e1;">🏟️ Répertoire Complet · Les 13 APS Officiellement Enseignées au Maroc</span>
                    <h2 style="font-size:1.3rem;font-weight:900;color:#0f172a;margin-top:0.4rem;">Accès Direct aux 13 Studios Sports &amp; Cycles (Collège OP 2009, Lycée OP 2007, Fiches, Calculateurs &amp; Grilles /20)</h2>
                </div>
                <a href="generateur.html" class="btn-primary-action" style="padding:0.6rem 1.1rem;font-size:0.84rem;">⚡ Générer un Cycle ou une Fiche Word/PDF →</a>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.85rem;">
                <!-- 1. Saut en Longueur & Triple Saut -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #b45309;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🦘 1. Saut en Longueur &amp; Triple Saut</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-studio" style="color:#b45309;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD, Biomécanique (20°) &amp; 3 Bonds</a>
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-calculateur-sauts" style="color:#1e293b;">→ Calculateur Élan &amp; Ratio 35-30-35%</a>
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Barèmes (5,40m / 4,10m) &amp; Grilles /20</a>
                    </div>
                </div>
                <!-- 2. Saut en Hauteur (Fosbury & Ciseaux) -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #1d4ed8;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🆙 2. Saut en Hauteur (Fosbury)</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-studio" style="color:#1d4ed8;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD Course en « J » &amp; Franchissement</a>
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-calculateur-hauteur" style="color:#1e293b;">→ Calculateur Élan en J &amp; Ex Aequo RT 26.8</a>
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Feuille (O/X/-) &amp; Barèmes (1,65m/1,35m)</a>
                    </div>
                </div>
                <!-- 3. Lancer du Poids (3kg / 4kg / 5kg) -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #3347D6;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏋️ 3. Lancer du Poids (3/4/5 kg)</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-lancer-poids-eps-maroc.html#volet-studio" style="color:#3347D6;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-lancer-poids-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD Chaîne J-B-T-B, O'Brien &amp; Sécurité</a>
                        <a href="aps-lancer-poids-eps-maroc.html#volet-calculateur-balistique" style="color:#1e293b;">→ Calculateur Balistique (40°) &amp; 34,92°</a>
                        <a href="aps-lancer-poids-eps-maroc.html#volet-grilles" style="color:#0B7A99;">→ Barèmes 3kg/4kg/5kg &amp; Grilles /20</a>
                    </div>
                </div>
                <!-- 4. Course de Durée & Demi-Fond -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #0d9488;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏃 4. Course de Durée &amp; VMA</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-course-duree-demi-fond-eps-maroc.html#volet-studio" style="color:#0d9488;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-course-duree-demi-fond-eps-maroc.html#volet-calculateurs" style="color:#1e293b;">→ Calculateur VMA &amp; Plots (25m/50m)</a>
                        <a href="article-course-duree-eps.html" style="color:#1e293b;">→ Guide Demi-Fond 600m/800m/1000m</a>
                        <a href="aps-course-duree-demi-fond-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Barèmes &amp; Grille Régularité /20</a>
                    </div>
                </div>
                <!-- 5. Course de Vitesse & Relais -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #dc2626;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">⚡ 5. Vitesse &amp; Relais</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-course-vitesse-relais-eps-maroc.html#volet-studio" style="color:#dc2626;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-course-vitesse-relais-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD Sprint (60m/80m/100m) &amp; Zone 30m</a>
                        <a href="reglement-course-vitesse-100m-200m-400m-athletisme-eps.html" style="color:#1e293b;">→ Règlement World Athletics RT 16-24</a>
                        <a href="aps-course-vitesse-relais-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Barèmes Sprint &amp; Gain Relais /20</a>
                    </div>
                </div>
                <!-- 6. Course de Haies -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #c2410c;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🚧 6. Course de Haies</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-course-haies-eps-maroc.html#volet-studio" style="color:#c2410c;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-course-haies-eps-maroc.html#volet-calculateur-haies" style="color:#1e293b;">→ Calculateur ΔT &amp; Couloirs 3/4 Appuis</a>
                        <a href="aps-course-haies-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD Franchissement Règle 2/3–1/3</a>
                        <a href="aps-course-haies-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Barèmes (Chrono + ΔT) &amp; Grilles /20</a>
                    </div>
                </div>
                <!-- 7. Handball -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #3347D6;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🤾 7. Handball</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-handball-eps-maroc.html#volet-studio" style="color:#3347D6;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="cycle-handball-college-eps-maroc.html" style="color:#1e293b;">→ Cycle Collège (OP 2009)</a>
                        <a href="cycle-handball-lycee-eps-maroc.html" style="color:#1e293b;">→ Cycle Lycée (OP 2007)</a>
                        <a href="aps-handball-eps-maroc.html#volet-grilles" style="color:#0B7A99;">→ Grilles d'Observation &amp; /20</a>
                    </div>
                </div>
                <!-- 8. Basket-Ball -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #0B7A99;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏀 8. Basket-Ball (5×5 &amp; 3×3)</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-basketball-eps-maroc.html#volet-studio" style="color:#0B7A99;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="cycle-basketball-college-eps-maroc.html" style="color:#1e293b;">→ Cycle Collège (OP 2009)</a>
                        <a href="cycle-basketball-lycee-eps-maroc.html" style="color:#1e293b;">→ Cycle Lycée (OP 2007)</a>
                        <a href="aps-basketball-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Grilles d'Observation &amp; /20</a>
                    </div>
                </div>
                <!-- 9. Volley-Ball -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #1e40af;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏐 9. Volley-Ball</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-volleyball-eps-maroc.html#volet-studio" style="color:#1e40af;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="cycle-volleyball-college-eps-maroc.html" style="color:#1e293b;">→ Cycle Collège (OP 2009)</a>
                        <a href="cycle-volleyball-lycee-eps-maroc.html" style="color:#1e293b;">→ Cycle Lycée (OP 2007)</a>
                        <a href="aps-volleyball-eps-maroc.html#volet-grilles" style="color:#0B7A99;">→ Grilles d'Observation &amp; /20</a>
                    </div>
                </div>
                <!-- 10. Football & Futsal -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #b45309;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">⚽ 10. Football &amp; Futsal</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-football-eps-maroc.html#volet-studio" style="color:#b45309;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-football-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD Foot 7×7 &amp; Futsal 5×5</a>
                        <a href="reglement-futsal-fifa-arbitrage-eps.html" style="color:#1e293b;">→ Règlement Futsal FIFA &amp; IFAB</a>
                        <a href="aps-football-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Grilles d'Observation &amp; /20</a>
                    </div>
                </div>
                <!-- 11. Rugby Scolaire & Tag -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #15803d;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏉 11. Rugby Scolaire &amp; Tag</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-studio" style="color:#15803d;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-calculateur-rugby" style="color:#1e293b;">→ Calculateur IGT &amp; Compteur 6 Tags</a>
                        <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-atd" style="color:#1e293b;">→ ATD &amp; 5 Règles d'Or de Sécurité</a>
                        <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Feuille IGT &amp; Grilles /20</a>
                    </div>
                </div>
                <!-- 12. Gymnastique au Sol -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #7c3aed;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🤸 12. Gymnastique au Sol</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-gymnastique-sol-eps-maroc.html#volet-studio" style="color:#7c3aed;">→ Studio 24 Cycles &amp; 240 Fiches A4</a>
                        <a href="aps-gymnastique-sol-eps-maroc.html#volet-atd" style="color:#1e293b;">→ Catalogue A / B / C / D &amp; Parades</a>
                        <a href="reglement-gymnastique-fig-code-pointage-eps.html" style="color:#1e293b;">→ Code de Pointage FIG &amp; Déductions</a>
                        <a href="aps-gymnastique-sol-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Fiche Projet &amp; Grilles D+E /20</a>
                    </div>
                </div>
                <!-- 13. Badminton & Tennis de Table -->
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-top:4px solid #0f766e;border-radius:12px;padding:0.95rem;">
                    <div style="font-weight:900;font-size:0.96rem;color:#0f172a;margin-bottom:0.4rem;">🏸🏓 13. Badminton &amp; Ping-Pong</div>
                    <div style="display:flex;flex-direction:column;gap:0.28rem;font-size:0.79rem;font-weight:700;">
                        <a href="aps-badminton-tennis-table-eps-maroc.html#volet-studio" style="color:#0f766e;">→ Double Studio 48 Cycles &amp; 480 Fiches</a>
                        <a href="aps-badminton-tennis-table-eps-maroc.html#volet-calculateur-raquettes" style="color:#1e293b;">→ Zones Bonus &amp; Ronde Montante</a>
                        <a href="cycle-badminton-college-eps-maroc.html" style="color:#1e293b;">→ Cycles Collège &amp; Lycée</a>
                        <a href="aps-badminton-tennis-table-eps-maroc.html#volet-grilles" style="color:#3347D6;">→ Feuilles 1pt/3pts &amp; Grilles /20</a>
                    </div>
                </div>
            </div>
        </section>`;

if (oldTopGridRegex.test(hubHtml)) {
  hubHtml = hubHtml.replace(oldTopGridRegex, newTopGridHtml);
}

// Add comprehensive technical & pedagogical reference section for Saut en Longueur, Saut en Hauteur & Lancer du Poids in hub-aps-sports-eps-maroc.html
const jumpsThrowsHubSection = `
        <!-- DOSSIER TECHNIQUE COMPLET : SAUT EN LONGUEUR, SAUT EN HAUTEUR & LANCER DU POIDS -->
        <section id="dossier-sauts-lancers-complet" style="background:#ffffff;border:2px solid #cbd5e1;border-top:5px solid #b45309;border-radius:18px;padding:1.75rem;margin-top:2.5rem;box-shadow:0 8px 24px rgba(15,23,42,0.06);">
            <div style="margin-bottom:1.25rem;">
                <span style="display:inline-block;padding:0.3rem 0.75rem;background:#fef3c7;color:#92400e;border:1px solid #fde68a;border-radius:999px;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">📐 Référentiel Didactique &amp; Biomécanique Complet · Sauts &amp; Lancers (OP 2009 &amp; OP 2007)</span>
                <h2 style="font-size:1.4rem;font-weight:900;color:#0f172a;margin:0 0 0.45rem 0;">Saut en Longueur, Saut en Hauteur (Fosbury) &amp; Lancer du Poids : Synthèse Technique, Progressions (1AC à 2Bac) &amp; Barèmes (/20)</h2>
                <p style="margin:0;color:#475569;font-size:0.9rem;line-height:1.6;">Retrouvez ci-dessous le comparatif didactique, biomécanique et réglementaire complet des trois grandes épreuves de concours athlétiques enseignées au Collège et au Lycée au Maroc, avec accès direct aux studios A4 interactifs, calculateurs et grilles d'évaluation sommative (/20).</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.15rem;margin-bottom:1.5rem;">
                <!-- Card 1: Saut en Longueur & Triple Saut -->
                <div style="background:#fffbeb;border:1px solid #fde68a;border-left:5px solid #b45309;border-radius:14px;padding:1.2rem;">
                    <h3 style="margin:0 0 0.5rem 0;font-size:1.08rem;font-weight:900;color:#92400e;">🦘 1. Saut en Longueur &amp; Triple Saut (RT 29 &amp; RT 30)</h3>
                    <ul style="margin:0 0 0.85rem 1.1rem;padding:0;font-size:0.83rem;color:#334155;line-height:1.55;display:grid;gap:0.35rem;">
                        <li><strong>Logique biomécanique :</strong> Transformer une vitesse horizontale maximale contrôlée ($v_x \\approx 7{,}5\\text{ à }9{,}2\\text{ m/s}$) en vitesse d'envol sous un angle optimal de <strong>$18^\\circ\\text{ à }22^\\circ$</strong> sans freinage sur la planche.</li>
                        <li><strong>Étalonnage de la course d'élan :</strong> 1AC/2AC : 8 à 10 foulées (18–22 m) · 3AC/TC : 12 foulées (24–28 m) · 1Bac/2Bac : 14 à 16 foulées (30–36 m, rythme accéléré sur les 3 derniers appuis).</li>
                        <li><strong>Triple Saut (Ratio équilibré) :</strong> Cloche-pied rasant (<strong>35 %</strong>) + Foulée bondissante active (<strong>30 %</strong>) + Saut final avec ramené (<strong>35 %</strong>). Séquence réglementaire : <em>Gauche-Gauche-Droit</em> ou <em>Droit-Droit-Gauche</em>.</li>
                        <li><strong>Barèmes 20/20 (2Bac) :</strong> Longueur : <strong>5,40 m</strong> (Garçons) / <strong>4,10 m</strong> (Filles) · Triple Saut : <strong>11,40 m</strong> (G) / <strong>9,00 m</strong> (F). Notation : Performance + Efficacité technique (liaison course-appel).</li>
                    </ul>
                    <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-studio" style="padding:0.4rem 0.75rem;background:#b45309;color:#ffffff;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Studio 24 Cycles &amp; Fiches →</a>
                        <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-calculateur-sauts" style="padding:0.4rem 0.75rem;background:#ffffff;color:#92400e;border:1px solid #f59e0b;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Calculateur Élan &amp; 35-30-35%</a>
                    </div>
                </div>

                <!-- Card 2: Saut en Hauteur Fosbury-Flop -->
                <div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:5px solid #1d4ed8;border-radius:14px;padding:1.2rem;">
                    <h3 style="margin:0 0 0.5rem 0;font-size:1.08rem;font-weight:900;color:#1e40af;">🆙 2. Saut en Hauteur — Fosbury-Flop &amp; Ciseaux (RT 26)</h3>
                    <ul style="margin:0 0 0.85rem 1.1rem;padding:0;font-size:0.83rem;color:#334155;line-height:1.55;display:grid;gap:0.35rem;">
                        <li><strong>Logique biomécanique :</strong> Course en « J » (3 à 5 foulées rectilignes + 3 à 4 foulées en courbe de rayon $R = 7\\text{ à }9\\text{ m}$) créant une inclinaison centripète qui se convertit à l'appel en rotation dorsale au-dessus de la barre.</li>
                        <li><strong>Règle du pied d'appel :</strong> Impulsion obligatoirement sur <strong>1 seul pied</strong> (le pied <em>éloigné</em> de la barre : appel pied gauche en venant de la droite, appel pied droit en venant de la gauche).</li>
                        <li><strong>Départage des Ex Aequo (RT 26.8) :</strong> 1° Moins d'essais à la dernière hauteur franchie → 2° Moins d'échecs (X) sur l'ensemble du concours → 3° Barrage (Jump-off) si égalité pour la 1re place.</li>
                        <li><strong>Barèmes 20/20 (2Bac) :</strong> <strong>1,65 m</strong> (Garçons) / <strong>1,35 m</strong> (Filles) · Collège 3AC : <strong>1,42 m</strong> (G) / <strong>1,20 m</strong> (F).</li>
                    </ul>
                    <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-studio" style="padding:0.4rem 0.75rem;background:#1d4ed8;color:#ffffff;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Studio 24 Cycles &amp; Fiches →</a>
                        <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-calculateur-hauteur" style="padding:0.4rem 0.75rem;background:#ffffff;color:#1e40af;border:1px solid #93c5fd;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Course en J &amp; Simulateur RT 26.8</a>
                    </div>
                </div>

                <!-- Card 3: Lancer du Poids -->
                <div style="background:#eef2ff;border:1px solid #c7d2fe;border-left:5px solid #3347D6;border-radius:14px;padding:1.2rem;">
                    <h3 style="margin:0 0 0.5rem 0;font-size:1.08rem;font-weight:900;color:#3347D6;">🏋️ 3. Lancer du Poids — Translation &amp; O'Brien (RT 33)</h3>
                    <ul style="margin:0 0 0.85rem 1.1rem;padding:0;font-size:0.83rem;color:#334155;line-height:1.55;display:grid;gap:0.35rem;">
                        <li><strong>Logique biomécanique :</strong> Portée balistique $D = \\frac{v_0^2 \\sin\\alpha \\cos\\alpha + v_0 \\cos\\alpha \\sqrt{(v_0 \\sin\\alpha)^2 + 2gh_0}}{g}$. La vitesse d'éjection $v_0$ étant au carré, la priorité absolue est un long chemin d'accélération et la chaîne <strong>Jambes → Bassin → Tronc → Bras</strong> à $\\alpha \\approx 39^\\circ\\text{–}41^\\circ$.</li>
                        <li><strong>Règlement &amp; Secteur 34,92° :</strong> Cercle $\\varnothing 2{,}135\\text{ m}$, butoir $10\\text{ cm}$. Le poids doit rester au contact du cou/clavicule, coude haut (interdiction de fronder). Tracé terrain : pour un rayon $R$, la corde entre les lignes vaut exactement <strong>$0{,}60 \\times R$</strong>. Sortie obligatoire par la moitié arrière.</li>
                        <li><strong>Masses officielles EPS Maroc :</strong> Collège 1AC/2AC : 2 kg (F) / 3 kg (G) · 3AC : 3 kg (F) / 4 kg (G) · Lycée TC/1Bac : 3 kg (F) / 4 kg (G) · 2Bac : <strong>3 kg (F) / 5 kg (G)</strong>.</li>
                        <li><strong>Barèmes 20/20 (2Bac) :</strong> <strong>11,00 m</strong> (Garçons 5 kg) / <strong>8,20 m</strong> (Filles 3 kg).</li>
                    </ul>
                    <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">
                        <a href="aps-lancer-poids-eps-maroc.html#volet-studio" style="padding:0.4rem 0.75rem;background:#3347D6;color:#ffffff;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Studio 24 Cycles &amp; Fiches →</a>
                        <a href="aps-lancer-poids-eps-maroc.html#volet-calculateur-balistique" style="padding:0.4rem 0.75rem;background:#ffffff;color:#3347D6;border:1px solid #a5b4fc;border-radius:8px;font-size:0.77rem;font-weight:800;text-decoration:none;">Calculateur Balistique &amp; 34,92°</a>
                    </div>
                </div>
            </div>

            <div class="table-wrap" style="margin-top:0.5rem;">
                <table>
                    <thead>
                        <tr>
                            <th>Épreuve Athlétique</th>
                            <th>1AC / 2AC (Collège OP 2009)</th>
                            <th>3AC (Brevet Collège OP 2009)</th>
                            <th>TC / 1ère Bac (Lycée OP 2007)</th>
                            <th>2ème Bac (Examen Bac OP 2007)</th>
                            <th>Répartition Note (/20)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>🦘 Saut en Longueur</strong></td>
                            <td>Zone large (80 cm), élan 8-10 appuis · <strong>20/20 :</strong> 3,80m (G) / 3,00m (F)</td>
                            <td>Planche 40 cm, élan étalonné 12 appuis · <strong>20/20 :</strong> 4,50m (G) / 3,50m (F)</td>
                            <td>Planche 20 cm, impulsion 20° + ciseau/extension · <strong>20/20 :</strong> 5,00m (G) / 3,85m (F)</td>
                            <td>Planche réglementaire 20 cm, ramené complet · <strong>20/20 :</strong> 5,40m (G) / 4,10m (F)</td>
                            <td>Collège : 12 (Moteur : 6 Perf + 6 Tech) + 3 + 5<br>Lycée : 14 (Moteur : 7 Perf + 7 Tech) + 3 + 3</td>
                        </tr>
                        <tr>
                            <td><strong>🦘 Triple Saut</strong></td>
                            <td>Multibonds (foulées bondissantes), découverte G-G-D · <strong>20/20 :</strong> 8,20m (G) / 6,60m (F)</td>
                            <td>Séquence G-G-D / D-D-G maîtrisée sans arrêt · <strong>20/20 :</strong> 9,60m (G) / 7,60m (F)</td>
                            <td>Équilibre des 3 bonds (35-30-35%), griffé actif · <strong>20/20 :</strong> 10,60m (G) / 8,40m (F)</td>
                            <td>Planche adaptée (7m/9m/11m), conservation vitesse · <strong>20/20 :</strong> 11,40m (G) / 9,00m (F)</td>
                            <td>Collège : 12 (6 Perf + 6 Ratio 35-30-35%) + 3 + 5<br>Lycée : 14 (7 Perf + 7 Efficacité bonds) + 3 + 3</td>
                        </tr>
                        <tr>
                            <td><strong>🆙 Saut en Hauteur</strong></td>
                            <td>Élan oblique, appel 1 pied, franchissement ciseaux · <strong>20/20 :</strong> 1,25m (G) / 1,08m (F)</td>
                            <td>Course en J (6-8 appuis), initiation Fosbury-Flop · <strong>20/20 :</strong> 1,42m (G) / 1,20m (F)</td>
                            <td>Course en J étalonnée (4+4), rotation dorsale · <strong>20/20 :</strong> 1,55m (G) / 1,28m (F)</td>
                            <td>Fosbury complet (pontage + esquive jambe) · <strong>20/20 :</strong> 1,65m (G) / 1,35m (F)</td>
                            <td>Collège : 12 (6 Hauteur + 6 Course J/Franch.) + 3 + 5<br>Lycée : 14 (7 Hauteur + 7 Indice hauteur-taille) + 3 + 3</td>
                        </tr>
                        <tr>
                            <td><strong>🏋️ Lancer du Poids</strong></td>
                            <td>Poussé du cou arrêté de profil (2kg F / 3kg G) · <strong>20/20 :</strong> 7,80m (G) / 6,20m (F)</td>
                            <td>Pas chassé rasant + blocage avant (3kg F / 4kg G) · <strong>20/20 :</strong> 9,20m (G) / 7,20m (F)</td>
                            <td>Sursaut rasant, vissage-dévissage (3kg F / 4kg G) · <strong>20/20 :</strong> 10,40m (G) / 7,80m (F)</td>
                            <td>Translation dorsale O'Brien + rattrapé (3kg F / 5kg G) · <strong>20/20 :</strong> 11,00m (G) / 8,20m (F)</td>
                            <td>Collège : 12 (6 Distance + 6 Chaîne cinétique) + 3 + 5<br>Lycée : 14 (7 Distance + 7 Gain élan/arrêt) + 3 + 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>`;

if (!hubHtml.includes('id="dossier-sauts-lancers-complet"')) {
  hubHtml = hubHtml.replace(
    '<!-- TABLEAU OFFICIEL DES OTI ET COMPÉTENCES VISÉES (1AC -> 2BAC) -->',
    jumpsThrowsHubSection + '\n\n        <!-- TABLEAU OFFICIEL DES OTI ET COMPÉTENCES VISÉES (1AC -> 2BAC) -->'
  );
}
fs.writeFileSync(path.join(PUBLIC_DIR, 'hub-aps-sports-eps-maroc.html'), hubHtml, 'utf8');

// 2B. Enrich public/cycles-eps-maroc.html
let cyclesHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'cycles-eps-maroc.html'), 'utf8');
const oldCyclesSection2Regex = /<!-- Section 2 : Répertoire des cycles par famille d'activités -->[\s\S]*?<!-- Section 3 : Passerelles Piliers & Ressources Clés -->/;
const newCyclesSection2Html = `<!-- Section 2 : Répertoire des cycles par famille d'activités -->
    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">02</span>
          <span data-i18n-fr="Cycles d'enseignement disponibles par discipline (13 APSA)" data-i18n-en="Available PE Cycles by Discipline (13 Sports)" data-i18n-ar="دورات التعلم المتوفرة حسب الأنشطة البدنية والرياضية (13 نشاطاً)">Cycles d'enseignement disponibles par discipline (13 APSA)</span>
        </h2>
        <a href="hub-aps-sports-eps-maroc.html" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow">
          🏟️ Ouvrir le Portail des 13 Sports &amp; Studios A4 →
        </a>
      </div>

      <!-- Famille 1 : Sports Collectifs -->
      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <span>🏀 Sports Collectifs de Marquage/Démarquage &amp; de Renvoi (Collège &amp; Lycée)</span>
        </h3>
        <p class="text-sm text-slate-300 mb-4">
          Développement des habiletés technico-tactiques individuelles et collectives, réversibilité des statuts attaquant/défenseur, occupation rationnelle de l'espace de jeu et grilles d'évaluation (/20).
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a href="cycle-basketball-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Collège (1AC / 2AC / 3AC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Basketball Collège →</div>
          </a>
          <a href="cycle-basketball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée (Tronc Commun / 1BAC / 2BAC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Basketball Lycée →</div>
          </a>
          <a href="cycle-handball-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Collège (1AC / 2AC / 3AC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Handball Collège →</div>
          </a>
          <a href="cycle-handball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée (TC / 1BAC / 2BAC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Handball Lycée →</div>
          </a>
          <a href="cycle-volleyball-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Collège (1AC / 2AC / 3AC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Volleyball Collège →</div>
          </a>
          <a href="cycle-volleyball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée (TC / 1BAC / 2BAC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Volleyball Lycée →</div>
          </a>
          <a href="aps-football-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Studio 1AC → 2BAC (5×5 / 7×7)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycles Football &amp; Futsal →</div>
          </a>
          <a href="aps-rugby-scolaire-tag-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Studio 1AC → 2BAC (Tag &amp; 7×7)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycles Rugby Scolaire &amp; Tag →</div>
          </a>
          <a href="hub-aps-sports-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">5 Sports Collectifs × 24 Cycles</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Tous les Studios Sports Collectifs →</div>
          </a>
        </div>
      </div>

      <!-- Famille 2 : Athlétisme (Courses, Sauts, Lancers) -->
      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
          <span>🏃 Athlétisme : Courses, Sauts (Longueur, Triple Saut, Hauteur) &amp; Lancer du Poids</span>
        </h3>
        <p class="text-sm text-slate-300 mb-4">
          Projets de cycles complets (10 à 12 séances), fiches pédagogiques A4, calculateurs biomécaniques et barèmes officiels (/20) pour les 6 épreuves athlétiques au Collège (OP 2009) et au Lycée (OP 2007).
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a href="aps-saut-longueur-triple-saut-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Sauts Horizontaux · 1AC → 2BAC</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Saut en Longueur &amp; Triple Saut →</div>
          </a>
          <a href="aps-saut-hauteur-fosbury-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Sauts Verticaux · Course en J &amp; RT 26.8</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Saut en Hauteur (Fosbury &amp; Ciseaux) →</div>
          </a>
          <a href="aps-lancer-poids-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Lancers · 3kg / 4kg / 5kg &amp; 34,92°</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Lancer du Poids (1AC → 2BAC) →</div>
          </a>
          <a href="aps-course-duree-demi-fond-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Demi-Fond &amp; VMA · 600m / 800m / 1000m</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Course de Durée &amp; VMA →</div>
          </a>
          <a href="aps-course-vitesse-relais-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Sprint &amp; Relais · 60m / 80m / 100m</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Course de Vitesse &amp; Relais →</div>
          </a>
          <a href="aps-course-haies-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition block group">
            <div class="text-xs text-amber-400 font-semibold mb-0.5">Courses d'Obstacles · 50mH / 60mH / 80mH</div>
            <div class="text-sm font-bold text-white group-hover:text-amber-300">Cycles Course de Haies &amp; Calcul ΔT →</div>
          </a>
        </div>
      </div>

      <!-- Famille 3 : Gymnastique & Sports de Raquette -->
      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
          <span>🤸 Gymnastique au Sol (A/B/C/D) &amp; 🏸 Sports de Raquette (Badminton / Tennis de Table)</span>
        </h3>
        <p class="text-sm text-slate-300 mb-4">
          Production de formes corporelles codifiées (enchaînement gymnique, sécurité, parades, jugement D+E) et sports de duel de raquettes (rupture de l'échange, zones bonus 1pt/3pts, ronde montante-descendante).
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <a href="aps-gymnastique-sol-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Studio 1AC → 2BAC · Code A/B/C/D</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Cycles Gymnastique au Sol →</div>
          </a>
          <a href="aps-badminton-tennis-table-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Double Studio BWF &amp; ITTF</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Badminton &amp; Tennis de Table →</div>
          </a>
          <a href="cycle-badminton-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Collège (OP 2009)</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Cycle Badminton Collège →</div>
          </a>
          <a href="cycle-badminton-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Lycée (OP 2007)</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Cycle Badminton Lycée →</div>
          </a>
        </div>
      </div>
    </section>

    <!-- Section 3 : Passerelles Piliers & Ressources Clés -->`;

if (oldCyclesSection2Regex.test(cyclesHtml)) {
  cyclesHtml = cyclesHtml.replace(oldCyclesSection2Regex, newCyclesSection2Html);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'cycles-eps-maroc.html'), cyclesHtml, 'utf8');
}

// 2C. Enrich public/ressources-atd.html with complete ATD tables for Saut en Longueur, Saut en Hauteur, Lancer du Poids, Courses, Gym, Foot, Rugby, Badminton
let atdHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'ressources-atd.html'), 'utf8');
const oldAtdAthGymRegex = /<!-- 4\. ATD ATHLÉTISME & GYMNASTIQUE -->[\s\S]*?<\/section>\s*<!-- PROFEPS_ATD_COMPLETE_MATRICES_END -->/;
const newAtdCompleteHtml = `<!-- 4. ATD SAUT EN LONGUEUR & TRIPLE SAUT -->
    <div id="atd-saut-longueur-triple-saut" style="margin-bottom:2rem;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #b45309;border-radius:14px;">
      <h3 style="margin:0 0 0.65rem 0;font-size:1.2rem;font-weight:800;color:#b45309;">🦘 4. Analyse et Traitement Didactique (ATD) : Saut en Longueur &amp; Triple Saut</h3>
      <p style="margin:0 0 0.75rem 0;font-size:0.9rem;color:#334155;"><strong>Définition &amp; Logique interne :</strong> Activité psychomotrice de performance mesurée en milieu stable (RT 29 &amp; RT 30 World Athletics) consistant à convertir une vitesse horizontale maximale acquise lors d'une course d'élan étalonnée en une trajectoire aérienne optimale (1 bond en longueur ; 3 bonds enchaînés <em>Cloche-pied + Foulée + Saut</em> au triple saut) sans mordre la ligne d'appel.</p>
      <ul style="margin:0 0 0.85rem 1.25rem;font-size:0.88rem;color:#334155;display:grid;gap:0.35rem;">
        <li><strong>Problèmes fondamentaux :</strong> Concilier vitesse maximale d'approche et précision spatiale sur la planche sans piétiner ; transformer la vitesse horizontale en impulsion verticale ($\\approx 20^\\circ$) sans écrasement du genou d'appel ; au triple saut, conserver l'horizontalité et l'équilibre des 3 bonds (ratio idéal <strong>35 % - 30 % - 35 %</strong>).</li>
        <li><strong>Principes &amp; Règles d'action :</strong> Étalonner sa course (départ pied fixe, accélération progressive, rythme « 1-2-3 » sur les 3 derniers appuis), poser le pied d'appel à plat par griffé actif sous le centre de gravité, grandir le buste (regard à l'horizontale) et ramener les jambes loin devant à l'atterrissage.</li>
      </ul>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;background:#ffffff;border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Niveau (OP Maroc)</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Course d'Élan &amp; Liaison Appel</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Suspension, 3 Bonds &amp; Réception</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Thème d'Étude &amp; Studio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 1 (1AC / 2AC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Course irrégulière, regard fixé sur la planche, piétinement ou freinage brusque sur les 3 derniers appuis.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Impulsion en dedans, réception debout déséquilibrée en arrière ; 2e bond écrasé au triple saut.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Accélérer en zone large (80 cm) et enchaîner G-G-D sans arrêt (<a href="aps-saut-longueur-triple-saut-eps-maroc.html" style="color:#b45309;font-weight:700;">Studio Longueur &amp; Triple Saut</a>).</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 2 (3AC / TC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Course étalonnée (10 à 12 foulées), maintien de la vitesse jusqu'à la planche avec regard horizontal.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Ouverture segmentaire en suspension et esquive latérale au sable ; 3 bonds équilibrés.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Étalonnage précis de l'élan et griffé actif sur chaque reprise d'appui.</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 3 &amp; 4 (1BAC / 2BAC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Élan 14–16 foulées à vitesse maximale contrôlée, abaissement-relèvement du centre de gravité sur les 2 derniers appuis.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Suspension en extension ou ciseau complet + ramené groupé ; ratio 35-30-35 % maîtrisé au triple saut.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Optimisation de l'angle d'envol ($20^\\circ$) et gestion du concours officiel Bac (<a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-grilles" style="color:#b45309;font-weight:700;">Barèmes /20</a>).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 5. ATD SAUT EN HAUTEUR (FOSBURY-FLOP & CISEAUX) -->
    <div id="atd-saut-hauteur" style="margin-bottom:2rem;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1d4ed8;border-radius:14px;">
      <h3 style="margin:0 0 0.65rem 0;font-size:1.2rem;font-weight:800;color:#1d4ed8;">🆙 5. Analyse et Traitement Didactique (ATD) : Saut en Hauteur (Fosbury-Flop &amp; Ciseaux)</h3>
      <p style="margin:0 0 0.75rem 0;font-size:0.9rem;color:#334155;"><strong>Définition &amp; Logique interne :</strong> Activité athlétique de saut vertical codifiée (RT 26 World Athletics) consistant à franchir une barre horizontale le plus haut possible après une course d'élan en « J » (rectiligne puis curviligne) et une impulsion obligatoire sur <strong>un seul pied</strong> (le pied éloigné de la barre), avec réception dorsale sécurisée sur tapis.</p>
      <ul style="margin:0 0 0.85rem 1.25rem;font-size:0.88rem;color:#334155;display:grid;gap:0.35rem;">
        <li><strong>Problèmes fondamentaux :</strong> Accepter de tourner le dos à la barre lors de l'envol (vaincre l'appréhension du renversement dorsal) ; utiliser l'inclinaison centripète du virage pour créer l'élévation verticale plutôt que de se jeter à plat vers le tapis ; synchroniser montée du genou libre, cambré dorsal et rappel des jambes (esquive des mollets).</li>
        <li><strong>Principes &amp; Règles d'action :</strong> Engager le virage à 4 appuis de la barre sans ralentir, placer le pied d'appel dans l'axe de la trajectoire à 70–90 cm du plan vertical des poteaux, monter le genou libre vers l'épaule opposée et déplier les jambes après le passage du bassin.</li>
      </ul>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;background:#ffffff;border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Niveau (OP Maroc)</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Course en « J » &amp; Impulsion</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Franchissement &amp; Réception</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Thème d'Étude &amp; Studio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 1 (1AC / 2AC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Course rectiligne ou virage cassé, appel trop près de la barre, erreur fréquente du pied intérieur.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Franchissement en ciseaux assis ou plongeon latéral précoce sur la barre.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Identifier le bon pied d'appel (éloigné) et courir en courbe accélérée (<a href="aps-saut-hauteur-fosbury-eps-maroc.html" style="color:#1d4ed8;font-weight:700;">Studio Saut en Hauteur</a>).</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 2 (3AC / TC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Course en J étalonnée (4 foulées droites + 4 en courbe), inclinaison centripète et montée verticale.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Rotation dorsale en Fosbury-Flop avec réception sur les épaules/haut du dos.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Transformer la vitesse courbe en impulsion verticale et engager le genou libre.</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 3 &amp; 4 (1BAC / 2BAC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Course en J fluide (8–10 foulées), appel explosif à 80 cm de la barre avec alignement pied-bassin-épaules.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Pont dorsal actif au-dessus de la barre suivi du rappel vif des jambes (esquive).</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Optimisation de l'indice Hauteur/Taille et gestion tactique du concours RT 26.8 (<a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-grilles" style="color:#1d4ed8;font-weight:700;">Feuille O/X/- &amp; Barèmes</a>).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 6. ATD LANCER DU POIDS -->
    <div id="atd-lancer-poids" style="margin-bottom:2rem;padding:1.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #3347D6;border-radius:14px;">
      <h3 style="margin:0 0 0.65rem 0;font-size:1.2rem;font-weight:800;color:#3347D6;">🏋️ 6. Analyse et Traitement Didactique (ATD) : Lancer du Poids (3 kg / 4 kg / 5 kg)</h3>
      <p style="margin:0 0 0.75rem 0;font-size:0.9rem;color:#334155;"><strong>Définition &amp; Logique interne :</strong> Activité athlétique de projection d'un engin lourd d'une seule main depuis un cercle de $\\varnothing 2{,}135\\text{ m}$ vers un secteur de $34{,}92^\\circ$ (RT 33 World Athletics), avec obligation réglementaire de <strong>pousser</strong> l'engin depuis le cou/clavicule (interdiction de lancer à bras cassé derrière l'épaule) et de sortir équilibré par la moitié arrière du cercle.</p>
      <ul style="margin:0 0 0.85rem 1.25rem;font-size:0.88rem;color:#334155;display:grid;gap:0.35rem;">
        <li><strong>Problèmes fondamentaux :</strong> Passer d'un jet exclusivement brachial (bras seul, coude bas) à la mobilisation séquentielle de toute la chaîne cinétique <strong>Jambes → Bassin → Tronc → Bras</strong> ; lier la mise en vitesse par translation rasante (pas chassé ou sursaut dorsal O'Brien) à la reprise en double appui (« position de force ») sans temps d'arrêt ; éjecter à $\\approx 40^\\circ$ en bloquant le côté gauche.</li>
        <li><strong>Sécurité d'Or en EPS :</strong> Organisation en vagues commandées au sifflet (lancer collectif → pose des engins → ramassage collectif), zone d'attente à 3 m derrière le cercle, aucun élève dans ni devant le secteur de $34{,}92^\\circ$.</li>
      </ul>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;background:#ffffff;border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Niveau (OP Maroc)</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Tenue de l'Engin &amp; Mise en Action</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Finale, Angle d'Envol &amp; Équilibre</th>
              <th style="padding:0.6rem;border:1px solid #cbd5e1;">Thème d'Étude &amp; Studio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 1 (1AC / 2AC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Poids décollé du cou, coude abaissé, départ de face sans action des jambes.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Trajectoire tendue ($<25^\\circ$) ou en cloche, flexion du buste vers l'avant à travers le butoir.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Pousser réglementairement depuis le cou (coude haut) en poussant sur les jambes (<a href="aps-lancer-poids-eps-maroc.html" style="color:#3347D6;font-weight:700;">Studio Lancer du Poids</a>).</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 2 (3AC / TC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Déplacement en pas chassé de profil avec maintien du buste vissé (dissociation bassin/épaules).</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Dévissage explosif face au secteur, éjection haute ($\\approx 40^\\circ$) et sortie par l'arrière.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Lier translation rasante et reprise en double appui dynamique (position de force).</td>
            </tr>
            <tr>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;font-weight:700;">Niveau 3 &amp; 4 (1BAC / 2BAC)</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Sursaut dorsal rasant (O'Brien), reprise d'appui droite-gauche ultra-rapide au centre du cercle.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Blocage ferme de la jambe gauche (« charnière »), fouetté final des doigts et rattrapé d'équilibre.</td>
              <td style="padding:0.6rem;border:1px solid #cbd5e1;">Continuité du chemin de lancement long et gain d'élan $\\ge +1{,}00\\text{ m}$ vs arrêté (<a href="aps-lancer-poids-eps-maroc.html#volet-grilles" style="color:#3347D6;font-weight:700;">Barèmes 3/4/5 kg</a>).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 7. ATD COURSES, GYMNASTIQUE, FOOTBALL, RUGBY & RAQUETTES -->
    <div id="atd-athletisme-gym" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;">
      <div style="padding:1.25rem;background:var(--sky);border:1px solid var(--stone);border-radius:12px;">
        <h3 style="margin:0 0 0.5rem 0;font-size:1.05rem;font-weight:800;color:#0d9488;">🏃 7. ATD Course de Durée &amp; Demi-Fond</h3>
        <p style="margin:0 0 0.5rem 0;font-size:0.85rem;color:#334155;"><strong>Logique interne :</strong> Gérer ses ressources bioénergétiques aérobies sur un effort prolongé ou fractionné (600m, 800m, 1000m) en régulant son allure autour de 85 % à 105 % de sa VMA.</p>
        <p style="margin:0;font-size:0.84rem;color:#334155;"><strong>Problèmes fondamentaux :</strong> Éviter le départ en sprint anaérobie, stabiliser l'écart par tour ($\\pm 2\\text{ s}$) et associer repères internes (respiration, FC) et externes (chronomètre/plots). Voir <a href="aps-course-duree-demi-fond-eps-maroc.html" style="color:#0d9488;font-weight:700;">Studio Course de Durée &amp; VMA</a>.</p>
      </div>
      <div style="padding:1.25rem;background:var(--sky);border:1px solid var(--stone);border-radius:12px;">
        <h3 style="margin:0 0 0.5rem 0;font-size:1.05rem;font-weight:800;color:#dc2626;">⚡🚧 8. ATD Vitesse, Relais &amp; Haies</h3>
        <p style="margin:0 0 0.5rem 0;font-size:0.85rem;color:#334155;"><strong>Logique interne :</strong> Créer et maintenir une vitesse maximale du signal d'alerte à l'arrivée en couloir individuel, en transmettant un témoin dans une zone de 30 m ou en franchissant des obstacles.</p>
        <p style="margin:0;font-size:0.84rem;color:#334155;"><strong>Problèmes fondamentaux :</strong> Poussée inclinée au départ, griffé actif, passage à l'aveugle au relais et règle 2/3 attaque – 1/3 reprise en haies ($\\Delta T = T_{\\text{Haies}} - T_{\\text{Plat}} \\le 1{,}5\\text{ s}$). Voir <a href="aps-course-vitesse-relais-eps-maroc.html" style="color:#dc2626;font-weight:700;">Studio Sprint</a> &amp; <a href="aps-course-haies-eps-maroc.html" style="color:#c2410c;font-weight:700;">Studio Haies</a>.</p>
      </div>
      <div style="padding:1.25rem;background:var(--sky);border:1px solid var(--stone);border-radius:12px;">
        <h3 style="margin:0 0 0.5rem 0;font-size:1.05rem;font-weight:800;color:#7c3aed;">🤸 9. ATD Gymnastique au Sol (A/B/C/D)</h3>
        <p style="margin:0 0 0.5rem 0;font-size:0.85rem;color:#334155;"><strong>Logique interne :</strong> Activité morphocinétique de production et d'enchaînement de formes corporelles acrobatiques et esthétiques codifiées (A, B, C, D) destinées à être vues et jugées (Note D + Note E).</p>
        <p style="margin:0;font-size:0.84rem;color:#334155;"><strong>Problèmes fondamentaux :</strong> Accepter le renversement (ATR, roues, rotations), maintenir le gainage segmentaire et assurer la parade active. Voir <a href="aps-gymnastique-sol-eps-maroc.html" style="color:#7c3aed;font-weight:700;">Studio Gymnastique au Sol</a>.</p>
      </div>
      <div style="padding:1.25rem;background:var(--sky);border:1px solid var(--stone);border-radius:12px;">
        <h3 style="margin:0 0 0.5rem 0;font-size:1.05rem;font-weight:800;color:#0f766e;">⚽🏉🏸 10. ATD Foot/Futsal, Rugby &amp; Raquettes</h3>
        <p style="margin:0 0 0.5rem 0;font-size:0.85rem;color:#334155;"><strong>Logiques internes :</strong> Motricité podale et système 1-2-1 en Futsal ; paradoxe « avancer vers l'en-but en passant en arrière » au Rugby ; rupture de l'échange en zones bonus en Badminton/Ping-Pong.</p>
        <p style="margin:0;font-size:0.84rem;color:#334155;">Accès direct : <a href="aps-football-eps-maroc.html" style="color:#b45309;font-weight:700;">Studio Foot/Futsal</a> · <a href="aps-rugby-scolaire-tag-eps-maroc.html" style="color:#15803d;font-weight:700;">Studio Rugby Tag</a> · <a href="aps-badminton-tennis-table-eps-maroc.html" style="color:#0f766e;font-weight:700;">Studio Badminton &amp; Ping-Pong</a>.</p>
      </div>
    </div>
  </section>
  <!-- PROFEPS_ATD_COMPLETE_MATRICES_END -->`;

if (oldAtdAthGymRegex.test(atdHtml)) {
  atdHtml = atdHtml.replace(oldAtdAthGymRegex, newAtdCompleteHtml);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'ressources-atd.html'), atdHtml, 'utf8');
}

// 2D. Update Block 4 (#sports-et-cycles) in public/index.html (and sync root index.html at the end)
let idxHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
const oldSportsSectionRegex = /<section class="atlas-section atlas-section-sky" id="sports-et-cycles">[\s\S]*?<\/section>/;
const newSportsSectionHtml = `<section class="atlas-section atlas-section-sky" id="sports-et-cycles">
      <div class="atlas-container">
        <div class="atlas-section-head">
          <div>
            <span class="atlas-hand-note">13 activités physiques et sportives (APSA) · Studios A4 Interactifs</span>
            <h2 style="margin:0.15rem 0 0 0;">Portail des Sports, Cycles (1AC–2BAC) &amp; Grilles d'Évaluation (/20)</h2>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
            <a href="/hub-aps-sports-eps-maroc.html" class="btn-atlas-primary">🏟️ Ouvrir le Portail des 13 Sports &amp; APS →</a>
            <a href="/generateur.html" class="btn-atlas-secondary" style="padding:0.65rem 1rem;border-radius:10px;border:1px solid #cbd5e1;background:#ffffff;color:#0f172a;font-weight:700;font-size:0.88rem;text-decoration:none;">⚡ Générateur sur mesure</a>
          </div>
        </div>

        <!-- Coach's Note -->
        <div class="atlas-coach-note" style="margin-bottom:1.5rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3347D6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <div>
            <strong>Mot du coach :</strong> Choisis ton sport ci-dessous pour ouvrir directement son <strong>Studio Complet (24 Cycles &amp; 240 Fiches de séances de 1AC à 2BAC)</strong>, son Analyse et Traitement Didactique (ATD), son calculateur spécialisé et sa grille d'évaluation sur 20 prête à exporter en Word (.doc) et PDF.
          </div>
        </div>

        <div class="atlas-bento-12">
          <!-- 1. Handball (Featured Span 6) -->
          <article class="sport-bento-card col-span-6">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.65rem;">
                <span style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--font-display);font-weight:800;font-size:1.18rem;color:var(--ink);">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#EEF1FF" stroke="#3347D6" stroke-width="2"/><path d="M5.5 8.5C9 10 15 10 18.5 8.5M5.5 15.5C9 14 15 14 18.5 15.5" stroke="#FFB300" stroke-width="2"/></svg>
                  Handball
                </span>
                <div style="display:flex;gap:0.35rem;">
                  <span class="atlas-chip atlas-chip-college">Collège 1AC–3AC</span>
                  <span class="atlas-chip atlas-chip-lycee">Lycée TC–2BAC</span>
                </div>
              </div>
              <p style="margin:0;font-size:0.9rem;color:var(--slate);">Progression de la grappe vers l'attaque placée et la contre-attaque rapide. Studio de 24 cycles et 240 fiches A4 avec grilles /20.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-handball-eps-maroc.html#volet-studio">Studio 24 Cycles</a>
              <a href="/aps-handball-eps-maroc.html#volet-grilles">Grilles /20</a>
              <a href="/generateur.html?aps=handball&amp;type=cycle">Générateur</a>
              <a href="/aps-handball-eps-maroc.html" style="margin-left:auto;background:transparent;">Silo complet →</a>
            </div>
          </article>

          <!-- 2. Basketball (Featured Span 6) -->
          <article class="sport-bento-card col-span-6">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.65rem;">
                <span style="display:inline-flex;align-items:center;gap:0.5rem;font-family:var(--font-display);font-weight:800;font-size:1.18rem;color:var(--ink);">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#FFF8E1" stroke="#3347D6" stroke-width="2"/><line x1="3" y1="12" x2="21" y2="12" stroke="#FFB300" stroke-width="2"/><line x1="12" y1="3" x2="12" y2="21" stroke="#3347D6" stroke-width="2"/></svg>
                  Basketball
                </span>
                <div style="display:flex;gap:0.35rem;">
                  <span class="atlas-chip atlas-chip-college">Collège 1AC–3AC</span>
                  <span class="atlas-chip atlas-chip-lycee">Lycée TC–2BAC</span>
                </div>
              </div>
              <p style="margin:0;font-size:0.9rem;color:var(--slate);">Dribble de progression, passe et va, tir en course (lay-up) et lecture du surnombre offensif 3c2 / 5c5 FIBA.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-basketball-eps-maroc.html#volet-studio">Studio 24 Cycles</a>
              <a href="/aps-basketball-eps-maroc.html#volet-grilles">Grilles /20</a>
              <a href="/generateur.html?aps=basketball&amp;type=cycle">Générateur</a>
              <a href="/aps-basketball-eps-maroc.html" style="margin-left:auto;background:transparent;">Silo complet →</a>
            </div>
          </article>

          <!-- 3. Saut en Longueur & Triple Saut -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Saut en Longueur &amp; Triple Saut</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Course d'élan étalonnée, impulsion active à 20° sur la planche, ratio 35-30-35% au triple saut et barèmes (/20).</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-saut-longueur-triple-saut-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-saut-longueur-triple-saut-eps-maroc.html#volet-calculateur-sauts">Calcul Élan</a>
              <a href="/aps-saut-longueur-triple-saut-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 4. Saut en Hauteur (Fosbury & Ciseaux) -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Saut en Hauteur (Fosbury)</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Course d'élan en « J », impulsion 1 pied, franchissement dorsal Fosbury-Flop, départage RT 26.8 et feuille (O/X/-).</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-saut-hauteur-fosbury-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-saut-hauteur-fosbury-eps-maroc.html#volet-calculateur-hauteur">Course en J</a>
              <a href="/aps-saut-hauteur-fosbury-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 5. Lancer du Poids (3kg / 4kg / 5kg) -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Lancer du Poids (3/4/5 kg)</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Chaîne cinétique jambes-tronc-bras, sursaut rasant O'Brien, angle optimal (~40°), secteur 34,92° et sécurité au sifflet.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-lancer-poids-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-lancer-poids-eps-maroc.html#volet-calculateur-balistique">Calcul 40°</a>
              <a href="/aps-lancer-poids-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 6. Course de Durée / Demi-fond -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Course de Durée (VMA)</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Test Navette &amp; Demi-Cooper, groupes d'allures (85% à 105% VMA), plots 25m/50m et barèmes 600m/800m/1000m.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-course-duree-demi-fond-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-course-duree-demi-fond-eps-maroc.html#volet-calculateurs">Calcul VMA</a>
              <a href="/aps-course-duree-demi-fond-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 7. Course de Vitesse & Relais -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Vitesse &amp; Relais</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Réaction au signal, mise en action, vitesse maximale (60m/80m/100m) et transmission du témoin en zone de 30m.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-course-vitesse-relais-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-course-vitesse-relais-eps-maroc.html#volet-atd">ATD Sprint</a>
              <a href="/aps-course-vitesse-relais-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 8. Course de Haies -->
          <article class="sport-bento-card col-span-4">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.5rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">Course de Haies</strong>
                <span class="atlas-chip atlas-chip-amber">Athlétisme</span>
              </div>
              <p style="margin:0;font-size:0.86rem;color:var(--slate);">Franchissement rasant (règle 2/3–1/3), rythme 3 ou 4 appuis inter-obstacles et calculateur d'indice de perte ΔT.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-course-haies-eps-maroc.html#volet-studio">Cycles &amp; Fiches</a>
              <a href="/aps-course-haies-eps-maroc.html#volet-calculateur-haies">Calcul ΔT</a>
              <a href="/aps-course-haies-eps-maroc.html#volet-grilles">Barèmes /20</a>
            </div>
          </article>

          <!-- 9. Volleyball -->
          <article class="sport-bento-card col-span-3">
            <div>
              <strong style="font-family:var(--font-display);font-size:1.02rem;display:block;margin-bottom:0.35rem;">Volleyball</strong>
              <p style="margin:0;font-size:0.84rem;color:var(--slate);">Du renvoi direct à la construction en 3 touches (R-P-A) et au système en W.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-volleyball-eps-maroc.html#volet-studio">Cycles</a>
              <a href="/aps-volleyball-eps-maroc.html#volet-atd">ATD</a>
              <a href="/aps-volleyball-eps-maroc.html#volet-grilles">Grilles /20</a>
            </div>
          </article>

          <!-- 10. Football / Futsal -->
          <article class="sport-bento-card col-span-3">
            <div>
              <strong style="font-family:var(--font-display);font-size:1.02rem;display:block;margin-bottom:0.35rem;">Football &amp; Futsal</strong>
              <p style="margin:0;font-size:0.84rem;color:var(--slate);">Conservation collective, jeu en couloirs et système 1-2-1 (5c5 / 7c7).</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-football-eps-maroc.html#volet-studio">Cycles</a>
              <a href="/aps-football-eps-maroc.html#volet-atd">ATD</a>
              <a href="/aps-football-eps-maroc.html#volet-grilles">Grilles /20</a>
            </div>
          </article>

          <!-- 11. Gymnastique au Sol -->
          <article class="sport-bento-card col-span-3">
            <div>
              <strong style="font-family:var(--font-display);font-size:1.02rem;display:block;margin-bottom:0.35rem;">Gymnastique au Sol</strong>
              <p style="margin:0;font-size:0.84rem;color:var(--slate);">Enchaînement codifié (difficultés A, B, C, D), parades et grilles D+E (/20).</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-gymnastique-sol-eps-maroc.html#volet-studio">Cycles</a>
              <a href="/aps-gymnastique-sol-eps-maroc.html#volet-atd">Code A-D</a>
              <a href="/aps-gymnastique-sol-eps-maroc.html#volet-grilles">Grilles /20</a>
            </div>
          </article>

          <!-- 12. Badminton & Tennis de Table -->
          <article class="sport-bento-card col-span-3">
            <div>
              <strong style="font-family:var(--font-display);font-size:1.02rem;display:block;margin-bottom:0.35rem;">Badminton &amp; Raquettes</strong>
              <p style="margin:0;font-size:0.84rem;color:var(--slate);">Zones bonus (1pt/3pts), rupture de l'échange et ronde montante-descendante.</p>
            </div>
            <div class="sport-links-bar">
              <a href="/aps-badminton-tennis-table-eps-maroc.html#volet-studio">Cycles</a>
              <a href="/aps-badminton-tennis-table-eps-maroc.html#volet-calculateur-raquettes">Tournoi</a>
              <a href="/aps-badminton-tennis-table-eps-maroc.html#volet-grilles">Grilles /20</a>
            </div>
          </article>

          <!-- 13. Rugby Scolaire & Tag (Full Width Banner Card) -->
          <article class="sport-bento-card col-span-12" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
            <div style="flex:1 1 420px;">
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
                <strong style="font-family:var(--font-display);font-size:1.08rem;">🏉 Rugby Scolaire, Tag Rugby &amp; Touch Rugby (1AC → 2BAC)</strong>
                <span class="atlas-chip atlas-chip-college">Sans plaquage dangereux · 5 Règles d'Or</span>
              </div>
              <p style="margin:0;font-size:0.88rem;color:var(--slate);">Avancer en continuité (paradoxe cible avant / passe arrière), soutien axial, calculateur d'Indice de Gagne-Terrain (IGT), compteur 6 Tags et 4 grilles (/20).</p>
            </div>
            <div class="sport-links-bar" style="margin-top:0;">
              <a href="/aps-rugby-scolaire-tag-eps-maroc.html#volet-studio">Studio 24 Cycles &amp; Fiches</a>
              <a href="/aps-rugby-scolaire-tag-eps-maroc.html#volet-calculateur-rugby">Calculateur IGT &amp; 6 Tags</a>
              <a href="/aps-rugby-scolaire-tag-eps-maroc.html#volet-grilles">Grilles /20</a>
            </div>
          </article>
        </div>
      </div>
    </section>`;

if (oldSportsSectionRegex.test(idxHtml)) {
  idxHtml = idxHtml.replace(oldSportsSectionRegex, newSportsSectionHtml);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), idxHtml, 'utf8');
}

// ---------------------------------------------------------------------------
// STEP 3: Replace the navbar button "Sports & cycles" (/bibliotheque-numerique-eps.html)
//         with "Portail des Sports & APS" (/hub-aps-sports-eps-maroc.html) across all 247 HTML files
//         and in the navbar normalization scripts
// ---------------------------------------------------------------------------
function updateNavbarInText(text) {
  let out = text;
  // Replace link in #pepsNavMenu
  out = out.replace(
    /<a\s+href="\/?bibliotheque-numerique-eps\.html"\s+class="peps-nav-link(\s+active)?"[^>]*>\s*Sports\s*(?:&amp;|&)\s*cycles\s*<\/a>/gi,
    '<a href="/hub-aps-sports-eps-maroc.html" class="peps-nav-link$1">Portail des Sports &amp; APS</a>'
  );
  // Replace active-link rule in #profeps-master-unifier-js
  out = out.replace(
    /\(href === 'bibliotheque-numerique-eps\.html' && \/\^\(aps-\|cycle-\|hub-aps\|fiche-\|grille-\|programmation-\)\/\.test\(curFile\)\)/g,
    "(href === 'hub-aps-sports-eps-maroc.html' && /^(aps-|cycle-|cycles-|hub-aps|fiche-|grille-|programmation-|ressources-atd|bibliotheque-numerique-eps)/.test(curFile))"
  );
  return out;
}

const allPublicHtml = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));
let navUpdatedCount = 0;
for (const f of allPublicHtml) {
  const p = path.join(PUBLIC_DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  const next = updateNavbarInText(orig);
  if (next !== orig) {
    fs.writeFileSync(p, next, 'utf8');
    navUpdatedCount++;
  }
}

// Sync root index.html with public/index.html
fs.copyFileSync(path.join(PUBLIC_DIR, 'index.html'), ROOT_INDEX);

// Also update scripts/unifier-navbar-footer.js, scripts/normalize-navbar.js, scripts/unify-crmef.js, scripts/normalize-footer.js
for (const scriptFile of ['unifier-navbar-footer.js', 'normalize-navbar.js', 'unify-crmef.js', 'normalize-footer.js']) {
  const sp = path.join(__dirname, scriptFile);
  if (fs.existsSync(sp)) {
    let sc = fs.readFileSync(sp, 'utf8');
    sc = updateNavbarInText(sc);
    // Ensure normalize-footer.js and unifier-navbar-footer.js never match </body> inside <script>
    sc = sc.replace(/content\.replace\(\/<\\\/body>\/i,/g, "content.replace(/<\\/body>(?![\\s\\S]*<\\/body>)/i,");
    fs.writeFileSync(sp, sc, 'utf8');
  }
}

console.log(`Updated navbar across ${navUpdatedCount} HTML files + root index.html + scripts.`);
