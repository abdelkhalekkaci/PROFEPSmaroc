const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const ALL_APS = [
  { file: 'aps-handball-eps-maroc.html', label: '🤾 Handball', color: '#3347D6' },
  { file: 'aps-basketball-eps-maroc.html', label: '🏀 Basket', color: '#0B7A99' },
  { file: 'aps-volleyball-eps-maroc.html', label: '🏐 Volley', color: '#1e40af' },
  { file: 'aps-football-eps-maroc.html', label: '⚽ Foot', color: '#b45309' },
  { file: 'aps-rugby-scolaire-tag-eps-maroc.html', label: '🏉 Rugby', color: '#15803d' },
  { file: 'aps-gymnastique-sol-eps-maroc.html', label: '🤸 Gym Sol', color: '#7c3aed' },
  { file: 'aps-course-vitesse-relais-eps-maroc.html', label: '⚡ Vitesse/Relais', color: '#dc2626' },
  { file: 'aps-course-duree-demi-fond-eps-maroc.html', label: '🏃 Durée/VMA', color: '#0f766e' },
  { file: 'aps-course-haies-eps-maroc.html', label: '🚧 Haies', color: '#c2410c' },
  { file: 'aps-lancer-poids-eps-maroc.html', label: '🏋️ Poids', color: '#475569' },
  { file: 'aps-saut-longueur-triple-saut-eps-maroc.html', label: '🦘 Longueur/TS', color: '#b45309' },
  { file: 'aps-saut-hauteur-fosbury-eps-maroc.html', label: '🆙 Hauteur', color: '#1d4ed8' },
  { file: 'aps-badminton-tennis-table-eps-maroc.html', label: '🏸 Badminton/Ping', color: '#0f766e' },
];

function buildRow2ApsLinks(currentFile) {
  const links = ALL_APS.map((item) => {
    const isActive = item.file === currentFile;
    if (isActive) {
      return `<a href="${item.file}" class="profeps-aps-mini-link active" style="background:${item.color};color:#ffffff;border-color:${item.color};" aria-current="page">${item.label}</a>`;
    }
    return `<a href="${item.file}" class="profeps-aps-mini-link" style="color:${item.color};">${item.label}</a>`;
  }).join('\n                ');

  return `<div class="profeps-sticky-row-aps" role="navigation" aria-label="Navigation rapide entre les 13 APS">
                <span class="profeps-aps-row-label">🏟️ Autres APS :</span>
                ${links}
                <a href="hub-aps-sports-eps-maroc.html" class="profeps-aps-mini-link profeps-aps-hub-back">← Portail des Sports</a>
            </div>`;
}

const UNIFIED_STICKY_AND_STUDIO_CSS = `
/* PROFEPS_UNIFIED_APS_STICKY_AND_STUDIO_STYLES_START */
#pepsNavbar {
  margin-bottom: 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}
.volets-sticky-bar,
.volet-nav-wrapper,
.volet-nav-wrap {
  position: sticky !important;
  top: calc(var(--peps-navbar-h, 61px) - 1px) !important;
  z-index: 995 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding: 0.42rem 1rem 0.36rem !important;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(12px) !important;
  border-top: none !important;
  border-bottom: 2px solid #cbd5e1 !important;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.07) !important;
}
.volets-sticky-bar .volets-nav-inner,
.volet-nav-wrapper .volet-nav,
.volet-nav-wrap .volet-nav {
  max-width: 1340px !important;
  margin: 0 auto !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 0.34rem !important;
}
/* Ligne 1 (En haut) : Contenu de la page (Volets) — Affichage plus grand */
.volets-sticky-bar .volets-tabs,
.volet-nav-wrapper .volet-tabs,
.volet-nav-wrap .volet-tabs-row {
  display: flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scrollbar-width: none !important;
  padding: 0.1rem 0 0.28rem !important;
  width: 100% !important;
}
.volets-sticky-bar .volets-tabs::-webkit-scrollbar,
.volet-nav-wrapper .volet-tabs::-webkit-scrollbar,
.volet-nav-wrap .volet-tabs-row::-webkit-scrollbar,
.profeps-sticky-row-aps::-webkit-scrollbar {
  display: none !important;
}
.volets-sticky-bar .volet-tab-btn,
.volet-nav-wrapper .volet-tab-btn,
.volet-nav-wrap .volet-tab-btn {
  font-size: 0.86rem !important;
  font-weight: 800 !important;
  padding: 0.46rem 0.92rem !important;
  border-radius: 8px !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
  letter-spacing: -0.01em !important;
  border: 1.5px solid #cbd5e1 !important;
  background: #f8fafc !important;
  color: #0f172a !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  transition: all 0.18s ease !important;
  flex-shrink: 0 !important;
}
.volets-sticky-bar .volet-tab-btn:hover,
.volet-nav-wrapper .volet-tab-btn:hover,
.volet-nav-wrap .volet-tab-btn:hover {
  border-color: #1e3a8a !important;
  background: #eff6ff !important;
  color: #1e3a8a !important;
}
.volets-sticky-bar .volet-tab-btn.active,
.volet-nav-wrapper .volet-tab-btn.active,
.volet-nav-wrap .volet-tab-btn.active {
  background: linear-gradient(135deg, #1e3a8a, #3347D6) !important;
  color: #ffffff !important;
  border-color: #1e3a8a !important;
  box-shadow: 0 3px 10px rgba(30, 58, 138, 0.25) !important;
}
/* Ligne 2 (En dessous) : Les autres APS — Affichage plus compact */
.profeps-sticky-row-aps {
  display: flex !important;
  align-items: center !important;
  gap: 0.3rem !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scrollbar-width: none !important;
  border-top: 1px solid #e2e8f0 !important;
  padding-top: 0.3rem !important;
  width: 100% !important;
}
.profeps-aps-row-label {
  font-size: 0.68rem !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  color: #64748b !important;
  white-space: nowrap !important;
  margin-right: 0.15rem !important;
  flex-shrink: 0 !important;
}
.profeps-aps-mini-link {
  font-size: 0.71rem !important;
  font-weight: 700 !important;
  padding: 0.16rem 0.48rem !important;
  border-radius: 6px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
  transition: all 0.15s ease !important;
  flex-shrink: 0 !important;
}
.profeps-aps-mini-link:hover {
  background: #f1f5f9 !important;
  border-color: #94a3b8 !important;
  transform: translateY(-1px) !important;
}
.profeps-aps-mini-link.active {
  font-weight: 800 !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.18) !important;
}
.profeps-aps-hub-back {
  margin-left: auto !important;
  background: #0f172a !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
  font-weight: 800 !important;
}
.profeps-aps-hub-back:hover {
  background: #1e3a8a !important;
  color: #ffffff !important;
}

/* ============================================================================
   DISTINCTION VISUELLE FORTE : BOUTONS "PROJET DE CYCLE" vs "FICHE DE SÉANCE"
   Couleurs distinctes (Indigo Royal pour Cycle vs Émeraude/Ambre pour Fiche)
   + Espacement et séparateur vertical clair entre les deux groupes
   ============================================================================ */
/* 1. Switcher d'aperçu (Family A : #btnModeCycle vs #btnModeFiche / #btnModeFiches) */
.doc-mode-switch {
  display: inline-flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.9rem !important;
  background: transparent !important;
  border: none !important;
  padding: 0.15rem 0 !important;
}
#btnModeCycle {
  background: #eef2ff !important;
  color: #1e3a8a !important;
  border: 2px solid #6366f1 !important;
  border-radius: 9px !important;
  padding: 0.55rem 1.05rem !important;
  font-size: 0.84rem !important;
  font-weight: 800 !important;
  transition: all 0.18s ease !important;
}
#btnModeCycle.active {
  background: linear-gradient(135deg, #1e3a8a, #3347D6) !important;
  color: #ffffff !important;
  border-color: #1e3a8a !important;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3) !important;
}
#btnModeFiche,
#btnModeFiches {
  background: #ecfdf5 !important;
  color: #065f46 !important;
  border: 2px solid #10b981 !important;
  border-radius: 9px !important;
  padding: 0.55rem 1.05rem !important;
  font-size: 0.84rem !important;
  font-weight: 800 !important;
  margin-left: 0.35rem !important;
  transition: all 0.18s ease !important;
}
#btnModeFiche.active,
#btnModeFiches.active {
  background: linear-gradient(135deg, #065f46, #059669) !important;
  color: #ffffff !important;
  border-color: #047857 !important;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3) !important;
}

/* 2. Switcher d'aperçu (Family B : #vmode-ppc vs #vmode-all-fiches & #vmode-single-fiche) */
.view-mode-group {
  display: inline-flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.55rem !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}
#vmode-ppc {
  background: #eef2ff !important;
  color: #1e3a8a !important;
  border: 2px solid #6366f1 !important;
  border-radius: 9px !important;
  padding: 0.52rem 1rem !important;
  font-weight: 800 !important;
  margin-right: 0.75rem !important;
}
#vmode-ppc.active {
  background: linear-gradient(135deg, #1e3a8a, #3347D6) !important;
  color: #ffffff !important;
  border-color: #1e3a8a !important;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.28) !important;
}
#vmode-all-fiches,
#vmode-single-fiche {
  background: #ecfdf5 !important;
  color: #065f46 !important;
  border: 2px solid #10b981 !important;
  border-radius: 9px !important;
  padding: 0.52rem 1rem !important;
  font-weight: 800 !important;
}
#vmode-all-fiches.active,
#vmode-single-fiche.active {
  background: linear-gradient(135deg, #065f46, #059669) !important;
  color: #ffffff !important;
  border-color: #047857 !important;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.28) !important;
}

/* 3. Boutons de téléchargement Word/PDF (Séparation Cycle vs Fiche sur les 13 APS) */
.export-actions-group,
.export-btn-group,
.toolbar-actions {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.55rem !important;
}
/* Groupe PROJET DE CYCLE : Indigo Royal & Bleu Nuit */
.export-word-cycle,
.btn-word-cycle,
.btn-export.cycle-word {
  background: #1e3a8a !important;
  color: #ffffff !important;
  border: 1.5px solid #1e3a8a !important;
  border-radius: 8px !important;
  padding: 0.56rem 0.95rem !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2) !important;
}
.export-word-cycle:hover,
.btn-word-cycle:hover,
.btn-export.cycle-word:hover {
  background: #172554 !important;
}
.export-pdf-cycle,
.btn-pdf-cycle,
.btn-export.cycle-pdf {
  background: #3347D6 !important;
  color: #ffffff !important;
  border: 1.5px solid #3347D6 !important;
  border-radius: 8px !important;
  padding: 0.56rem 0.95rem !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(51, 71, 214, 0.22) !important;
}
.export-pdf-cycle:hover,
.btn-pdf-cycle:hover,
.btn-export.cycle-pdf:hover {
  background: #1e40af !important;
}

/* Groupe FICHE DE SÉANCE : Émeraude & Ambre Cuivré + Espace & Séparateur Vertical */
.export-word-fiche,
.export-word-fiches,
.btn-word-fiches,
.btn-export.word {
  background: #047857 !important;
  color: #ffffff !important;
  border: 1.5px solid #047857 !important;
  border-radius: 8px !important;
  padding: 0.56rem 0.95rem !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(4, 120, 87, 0.22) !important;
}
.export-word-fiche:hover,
.export-word-fiches:hover,
.btn-word-fiches:hover,
.btn-export.word:hover {
  background: #065f46 !important;
}
.export-pdf-fiche,
.export-pdf-fiches,
.btn-pdf-fiches,
.btn-export.pdf {
  background: #d97706 !important;
  color: #ffffff !important;
  border: 1.5px solid #b45309 !important;
  border-radius: 8px !important;
  padding: 0.56rem 0.95rem !important;
  font-weight: 800 !important;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.22) !important;
}
.export-pdf-fiche:hover,
.export-pdf-fiches:hover,
.btn-pdf-fiches:hover,
.btn-export.pdf:hover {
  background: #b45309 !important;
}

/* Espace franc + séparateur vertical entre les boutons Cycle et les boutons Fiche */
.export-word-fiche,
.export-word-fiches,
.btn-word-fiches {
  margin-left: 0.85rem !important;
  position: relative !important;
}
.export-word-fiche::before,
.export-word-fiches::before,
.btn-word-fiches::before {
  content: "" !important;
  position: absolute !important;
  left: -0.6rem !important;
  top: 12% !important;
  bottom: 12% !important;
  width: 2px !important;
  background: #94a3b8 !important;
  border-radius: 2px !important;
}
.btn-export.cycle-word {
  margin-left: 0.85rem !important;
  position: relative !important;
}
.btn-export.cycle-word::before {
  content: "" !important;
  position: absolute !important;
  left: -0.6rem !important;
  top: 12% !important;
  bottom: 12% !important;
  width: 2px !important;
  background: #94a3b8 !important;
  border-radius: 2px !important;
}
/* PROFEPS_UNIFIED_APS_STICKY_AND_STUDIO_STYLES_END */
`;

const NAVBAR_SYNC_SCRIPT = `
<!-- PROFEPS_STICKY_SYNC_SCRIPT_START -->
<script>
(function() {
  function syncPepsStickyTop() {
    var nav = document.getElementById('pepsNavbar');
    if (nav) {
      var h = Math.floor(nav.getBoundingClientRect().height);
      if (h > 30) {
        document.documentElement.style.setProperty('--peps-navbar-h', h + 'px');
      }
    }
  }
  syncPepsStickyTop();
  window.addEventListener('DOMContentLoaded', function() {
    syncPepsStickyTop();
    var nav = document.getElementById('pepsNavbar');
    if (nav && typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncPepsStickyTop).observe(nav);
    }
    var subnav = document.getElementById('profepsStickySubnav');
    if (subnav) {
      subnav.querySelectorAll('button.volet-tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var mainEl = document.querySelector('main');
          if (mainEl) {
            var rect = mainEl.getBoundingClientRect();
            var offset = (nav ? nav.offsetHeight : 61) + subnav.offsetHeight + 12;
            if (rect.top > offset + 40 || rect.top < -80) {
              window.scrollTo({
                top: window.pageYOffset + rect.top - offset,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
  });
  window.addEventListener('load', syncPepsStickyTop);
  window.addEventListener('resize', syncPepsStickyTop);
})();
</script>
<!-- PROFEPS_STICKY_SYNC_SCRIPT_END -->
`;

let updatedCount = 0;

for (const item of ALL_APS) {
  const filePath = path.join(PUBLIC_DIR, item.file);
  if (!fs.existsSync(filePath)) {
    console.warn('Missing file:', item.file);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the top quick-nav bar above the hero
  html = html.replace(
    /\s*<!-- PROFEPS_13_SILOS_QUICK_NAV_START -->[\s\S]*?<!-- PROFEPS_13_SILOS_QUICK_NAV_END -->\s*/g,
    '\n    '
  );

  // 2. Remove the duplicate buttons under the hero description inside <header class="silo-hero">
  html = html.replace(
    /(<header class="silo-hero"[\s\S]*?)<div style="display:flex;flex-wrap:wrap;gap:0\.(?:5|6)rem;">[\s\S]*?<\/div>([\s\S]*?<\/header>)/,
    '$1$2'
  );

  // 3. Extract the existing sticky sub-navbar between </header> and <main, standardize it to 2 rows, and move it directly below <!-- PROFEPS_UNIFIED_NAVBAR_END --> (glued to #pepsNavbar)
  const row2Html = buildRow2ApsLinks(item.file);

  const hEndIdx = html.indexOf('</header>');
  const mainIdx = html.indexOf('<main');

  let wrapperClass = 'volets-sticky-bar';
  let innerClass = 'volets-nav-inner';
  let tabsContainerClass = 'volets-tabs';

  const betweenHeaderAndMain = hEndIdx !== -1 && mainIdx !== -1 && mainIdx > hEndIdx
    ? html.slice(hEndIdx + '</header>'.length, mainIdx)
    : html;

  const btnMatches = betweenHeaderAndMain.match(/<(?:button|a)\b[^>]*class="[^"]*volet-tab-btn[^"]*"[^>]*>[\s\S]*?<\/(?:button|a)>/g)
    || html.match(/<(?:button|a)\b[^>]*class="[^"]*volet-tab-btn[^"]*"[^>]*>[\s\S]*?<\/(?:button|a)>/g);

  if (!btnMatches || btnMatches.length === 0) {
    console.error('Could not find volet-tab-btn in', item.file);
    continue;
  }

  const enhancedButtons = btnMatches.map((btnStr) => {
    return btnStr.replace(/\s+/g, ' ').trim();
  }).join('\n                ');

  if (html.includes('volet-nav-wrapper')) {
    wrapperClass = 'volet-nav-wrapper';
    innerClass = 'volet-nav';
    tabsContainerClass = 'volet-tabs';
  } else if (html.includes('volet-nav-wrap')) {
    wrapperClass = 'volet-nav-wrap';
    innerClass = 'volet-nav';
    tabsContainerClass = 'volet-tabs-row';
  }

  const stickyBlock = `<!-- PROFEPS_APS_2LINE_STICKY_START -->
    <div class="${wrapperClass}" id="profepsStickySubnav" role="navigation" aria-label="Navigation du contenu et des APS">
        <div class="${innerClass}">
            <div class="${tabsContainerClass}" role="tablist" aria-label="Sections de la page">
                ${enhancedButtons}
            </div>
            ${row2Html}
        </div>
    </div>
    <!-- PROFEPS_APS_2LINE_STICKY_END -->`;

  // Remove old sticky bar & separate APS bar between </header> and <main>
  if (hEndIdx !== -1 && mainIdx !== -1 && mainIdx > hEndIdx) {
    html = html.slice(0, hEndIdx + '</header>'.length) + '\n\n    ' + html.slice(mainIdx);
  }

  // Remove any existing PROFEPS_APS_2LINE_STICKY block
  html = html.replace(
    /\s*<!-- PROFEPS_APS_2LINE_STICKY_START -->[\s\S]*?<!-- PROFEPS_APS_2LINE_STICKY_END -->\s*/g,
    '\n    '
  );

  // Place the 2-line sticky sub-navbar IMMEDIATELY after <!-- PROFEPS_UNIFIED_NAVBAR_END -->
  // so it is 100% glued (collé) to the main navbar with 0px gap both at scrollY=0 and while scrolling!
  html = html.replace(
    '<!-- PROFEPS_UNIFIED_NAVBAR_END -->',
    '<!-- PROFEPS_UNIFIED_NAVBAR_END -->\n    ' + stickyBlock
  );

  // 4. Inject or update the unified CSS in <head>
  html = html.replace(
    /\s*\/\* PROFEPS_UNIFIED_APS_STICKY_AND_STUDIO_STYLES_START \*\/[\s\S]*?\/\* PROFEPS_UNIFIED_APS_STICKY_AND_STUDIO_STYLES_END \*\/\s*/g,
    ''
  );
  html = html.replace(
    '</style>',
    UNIFIED_STICKY_AND_STUDIO_CSS + '\n    </style>'
  );

  // 5. Inject or update the navbar height sync script before the final </body>
  html = html.replace(
    /\s*<!-- PROFEPS_STICKY_SYNC_SCRIPT_START -->[\s\S]*?<!-- PROFEPS_STICKY_SYNC_SCRIPT_END -->\n?/g,
    ''
  );
  const lastBodyIdx = html.lastIndexOf('</body>');
  if (lastBodyIdx !== -1) {
    html = html.slice(0, lastBodyIdx) + NAVBAR_SYNC_SCRIPT + '\n' + html.slice(lastBodyIdx);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  updatedCount++;
  console.log(`Updated ${item.file} (${btnMatches.length} volet tabs + 13 APS links on 2 lines)`);
}

console.log(`Done! Updated ${updatedCount}/13 APS pages.`);
