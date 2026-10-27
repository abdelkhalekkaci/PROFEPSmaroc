/**
 * unifier-navbar-footer.js
 * Script maître unique pour ProfEPS.ma :
 * 1. Supprime définitivement les pages login/dashboard, auth-shared.js et Supabase (fichiers + code dans tout le projet)
 * 2. Unifie la Navbar fixe (80px, classes isolées .peps-* impossibles à écraser par d'anciens scripts/CSS)
 * 3. Active le menu déroulant des 11 outils sur 100 % des pages (CSS :hover + JS fluide, affiche l'outil actif)
 * 4. Intègre le bouton traducteur universel (FR / EN / عربي) à droite dans la Navbar et supprime les doublons
 * 5. Unifie le Footer à 5 colonnes sans doublons avec logo au bon format
 */

(async () => {
const fs = await import('fs');
const path = await import('path');

const rootDir = process.cwd();

console.log('\n======================================================');
console.log('🚀 NETTOYAGE SUPABASE/LOGIN/DASHBOARD & UNIFICATION NAVBAR/FOOTER');
console.log('📂 Dossier racine :', rootDir);
console.log('======================================================\n');

// ═══ ÉTAPE 1 : SUPPRESSION DÉFINITIVE DES FICHIERS LOGIN, DASHBOARD & SUPABASE ═══
const OBSOLETE_FILE_PATTERNS = [
  /^login\.html$/i,
  /^dashboard\.html$/i,
  /^connexion\.html$/i,
  /^inscription\.html$/i,
  /^register\.html$/i,
  /^signup\.html$/i,
  /^auth\.html$/i,
  /^auth-shared\.js$/i,
  /^auth\.js$/i,
  /^login\.js$/i,
  /^dashboard\.js$/i,
  /^supabase.*\.js$/i,
  /^supabase.*\.ts$/i,
  /^login\.css$/i,
  /^dashboard\.css$/i,
  /^auth\.css$/i,
  /^update-navbar\.js$/i,
  /^navbar\.js$/i,
];

function cleanObsoleteFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === '.next' ||
      entry.name === 'dist' ||
      entry.name === '.aistudio'
    ) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanObsoleteFilesRecursively(fullPath);
    } else if (entry.isFile()) {
      if (OBSOLETE_FILE_PATTERNS.some((rx) => rx.test(entry.name))) {
        try {
          fs.unlinkSync(fullPath);
          console.log(`🗑️  [FICHIER SUPPRIMÉ] -> ${path.relative(rootDir, fullPath)}`);
        } catch (e) {
          // ignore
        }
      }
    }
  }
}

cleanObsoleteFilesRecursively(rootDir);

// Nettoyer package.json de toute dépendance @supabase/*
const pkgPath = path.join(rootDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    let pkgChanged = false;
    ['dependencies', 'devDependencies'].forEach((depKey) => {
      if (pkg[depKey]) {
        Object.keys(pkg[depKey]).forEach((k) => {
          if (k.toLowerCase().includes('supabase')) {
            delete pkg[depKey][k];
            pkgChanged = true;
            console.log(`🗑️  [PACKAGE.JSON] Dépendance supprimée : ${k}`);
          }
        });
      }
    });
    if (pkgChanged) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    }
  } catch (e) {
    // ignore
  }
}

// Nettoyer les références Supabase / login / dashboard dans tous les fichiers .js / .ts / .tsx restants
function cleanCodeFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === '.aistudio' ||
      entry.name === 'unifier-navbar-footer.js' ||
      entry.name === 'generer-10-outils.js'
    ) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanCodeFilesRecursively(fullPath);
    } else if (/\.(js|ts|tsx)$/i.test(entry.name)) {
      try {
        const original = fs.readFileSync(fullPath, 'utf8');
        let cleaned = original
          // Supprimer les imports Supabase
          .replace(/^\s*import\s+.*from\s+['"][^'"]*supabase[^'"]*['"];?\s*$/gm, '')
          .replace(/^\s*const\s+.*=\s*require\(['"][^'"]*supabase[^'"]*['"]\);?\s*$/gm, '')
          // Neutraliser toute redirection forcée vers login.html ou dashboard.html
          .replace(/(?:window\.)?location\.(?:href|replace|assign)\s*=?\s*\(?['"][^'"]*(?:login|dashboard)\.html[^'"]*['"]\)?/gi, 'void 0')
          // Neutraliser toute manipulation de l'ancienne navbar dans les scripts JS restants
          .replace(/document\.querySelector\(['"]\.navbar['"]\)/g, "document.getElementById('navbar')")
          .replace(/document\.querySelector\(['"]nav\.navbar['"]\)/g, "document.getElementById('navbar')")
          .replace(/document\.querySelector\(['"]\.nav-menu['"]\)/g, "document.getElementById('navMenu')")
          .replace(/document\.querySelector\(['"]\.nav-right['"]\)/g, "document.getElementById('navRightDecoy')");

        if (cleaned !== original) {
          fs.writeFileSync(fullPath, cleaned, 'utf8');
          console.log(`🧹 [CODE NETTOYÉ] -> ${path.relative(rootDir, fullPath)}`);
        }
      } catch (e) {
        // ignore
      }
    }
  }
}

cleanCodeFilesRecursively(rootDir);

// ═══ ÉTAPE 2 : DONNÉES DES 11 OUTILS & DU MENU DÉROULANT ═══
const TOOL_INFO = {
  'calculateur-vma.html': {
    fr: 'Calculateur VMA',
    en: 'MAS Calculator',
    ar: 'حاسبة السرعة الهوائية VMA',
  },
  'hub-outils-sport-performance.html': {
    fr: 'Hub Calculateurs Sport',
    en: 'Sports Calculators Hub',
    ar: 'بوابة الحاسبات الرياضية',
  },
  'calculateur-vdot-asr-endurance.html': {
    fr: 'Calculateur VO2 Max',
    en: 'VO2 Max Calculator',
    ar: 'حاسبة VO2 Max',
  },
  'calculateur-asr-reserve-vitesse.html': {
    fr: 'Calculateur ASR',
    en: 'ASR Speed Reserve',
    ar: 'احتياطي السرعة اللاهوائية ASR',
  },
  'calculateur-indice-endurance.html': {
    fr: "Indice d'Endurance",
    en: 'Endurance Index',
    ar: 'مؤشر التحمل (Péronnet)',
  },
  'calculateur-frequence-cardiaque-karvonen.html': {
    fr: 'Fréquence Cardiaque',
    en: 'Heart Rate (Karvonen)',
    ar: 'معدل نبضات القلب (Karvonen)',
  },
  'calculateur-imc-sportif-masse-grasse.html': {
    fr: 'Calculateur IMC & IMG',
    en: 'Athletic BMI & Body Fat',
    ar: 'مؤشر كتلة الجسم والدهون',
  },
  'calculateur-chaleur-meteo-altitude.html': {
    fr: 'Chaleur & Altitude',
    en: 'Heat & Altitude',
    ar: 'الحرارة والارتفاع عن البحر',
  },
  'calculateur-gap-pente-nutrition.html': {
    fr: 'Allure Pente (GAP)',
    en: 'Grade Adjusted Pace',
    ar: 'إيقاع الجري في المنحدرات GAP',
  },
  'generateur-intermittent-hiit-cod.html': {
    fr: 'Intermittent HIIT & COD',
    en: 'HIIT & 180° Shuttle',
    ar: 'التدريب المتقطع HIIT و COD',
  },
  'calculateur-charge-rpe-foster-acwr.html': {
    fr: 'Charge RPE & ACWR',
    en: 'RPE Load & ACWR',
    ar: 'حمل التدريب RPE و ACWR',
  },
};

const DROPDOWN_ITEMS = [
  {
    href: 'hub-outils-sport-performance.html',
    isHub: true,
    fr: '🧭 Hub de Tous les Calculateurs Sport',
    en: '🧭 All Sports Calculators Hub',
    ar: '🧭 بوابة جميع الحاسبات الرياضية',
  },
  {
    href: 'calculateur-vma.html',
    fr: '⚡ Calculateur VMA & Allures',
    en: '⚡ MAS (VMA) & Paces Calculator',
    ar: '⚡ حاسبة السرعة الهوائية القصوى (VMA)',
  },
  {
    href: 'calculateur-vdot-asr-endurance.html',
    fr: '🫁 Calculateur VO2 Max & VDOT',
    en: '🫁 VO2 Max & VDOT Calculator',
    ar: '🫁 حاسبة VO2 Max ومؤشر VDOT',
  },
  {
    href: 'calculateur-asr-reserve-vitesse.html',
    fr: '🚀 Réserve de Vitesse Anaérobie (ASR)',
    en: '🚀 Anaerobic Speed Reserve (ASR)',
    ar: '🚀 احتياطي السرعة اللاهوائية (ASR)',
  },
  {
    href: 'calculateur-indice-endurance.html',
    fr: "📈 Indice d'Endurance (Péronnet)",
    en: '📈 Endurance Index (Péronnet)',
    ar: '📈 مؤشر التحمل (نموذج بيروني)',
  },
  {
    href: 'calculateur-frequence-cardiaque-karvonen.html',
    fr: '❤️ Fréquence Cardiaque (Karvonen)',
    en: '❤️ Heart Rate Zones (Karvonen)',
    ar: '❤️ نبضات القلب ومناطق التدريب (Karvonen)',
  },
  {
    href: 'calculateur-imc-sportif-masse-grasse.html',
    fr: '⚖️ Calculateur IMC & Masse Grasse',
    en: '⚖️ Athletic BMI & Body Fat %',
    ar: '⚖️ حاسبة مؤشر كتلة الجسم ونسبة الدهون',
  },
  {
    href: 'calculateur-chaleur-meteo-altitude.html',
    fr: '☀️ Chaleur, Humidité & Altitude',
    en: '☀️ Heat, Humidity & Altitude',
    ar: '☀️ تأثير الحرارة والرطوبة والارتفاع',
  },
  {
    href: 'calculateur-gap-pente-nutrition.html',
    fr: '⛰️ Allure Pente (GAP) & Nutrition',
    en: '⛰️ Grade Adjusted Pace & Nutrition',
    ar: '⛰️ إيقاع المنحدرات (GAP) والتغذية',
  },
  {
    href: 'generateur-intermittent-hiit-cod.html',
    fr: '🔄 Intermittent HIIT & COD 180°',
    en: '🔄 HIIT Intermittent & 180° COD',
    ar: '🔄 مولد التدريب المتقطع HIIT وتغيير الاتجاه',
  },
  {
    href: 'calculateur-charge-rpe-foster-acwr.html',
    fr: '🛡️ Charge RPE Foster & ACWR',
    en: '🛡️ Foster sRPE Load & ACWR Ratio',
    ar: '🛡️ حمل التدريب (RPE Foster) ونسبة ACWR',
  },
];

// ═══ ÉTAPE 3 : CSS MAÎTRE ISOLÉ (.peps-*) INVISIBLE AUX ANCIENS SCRIPTS/CSS ═══
const MASTER_CSS = `<style id="profeps-master-unifier-css">
/* ═══ 1. NAVBAR FIXE ISOLÉE (.peps-*) — 80PX VERROUILLÉ SUR TOUTES LES PAGES ═══ */
html {
  overflow-y: scroll !important;
}
/* Masquer tout ancien <nav class="navbar"> ou leurre #navbar pour éviter toute superposition */
nav.navbar, #navbar, .navbar-decoy {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  width: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  z-index: -9999 !important;
}
/* Masquer tout bouton traducteur en doublon dans le contenu des pages (hors #pepsNavbar) */
.lang-switch:not(.peps-lang-switch),
.in-page-lang-switch,
header .lang-switch,
main .lang-switch,
.vma-hero .lang-switch,
#btn-lang-fr,
#btn-lang-en,
#btn-lang-ar,
button[onclick*="setToolLang"],
button[onclick*="changeLang"],
button.lang-btn:not(.peps-lang-btn) {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  overflow: hidden !important;
}
#pepsNavbar.peps-navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 80px !important;
  min-height: 80px !important;
  max-height: 80px !important;
  padding: 0 2rem !important;
  margin: 0 !important;
  z-index: 2147483000 !important;
  background: rgba(255, 255, 255, 0.97) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85) !important;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04) !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  visibility: visible !important;
  opacity: 1 !important;
  overflow: visible !important;
  direction: ltr !important;
}
#pepsNavbar.peps-navbar.scrolled {
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08) !important;
  background: rgba(255, 255, 255, 0.99) !important;
}
#pepsNavbar .peps-nav-container {
  width: 100% !important;
  max-width: 1400px !important;
  height: 80px !important;
  margin: 0 auto !important;
  padding: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr auto 1fr !important;
  align-items: center !important;
  box-sizing: border-box !important;
  overflow: visible !important;
  direction: ltr !important;
}
#pepsNavbar .peps-nav-logo {
  justify-self: start !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 54px !important;
  text-decoration: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
#pepsNavbar .peps-nav-logo img {
  height: 52px !important;
  max-height: 52px !important;
  width: auto !important;
  max-width: 160px !important;
  object-fit: contain !important;
  display: block !important;
  margin: 0 !important;
}
#pepsNavbar .peps-nav-menu {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 2rem !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
  height: 80px !important;
  overflow: visible !important;
  visibility: visible !important;
  opacity: 1 !important;
}
#pepsNavbar .peps-nav-right {
  justify-self: end !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 0.75rem !important;
  margin: 0 !important;
  padding-right: 0.25rem !important;
}
#pepsNavbar .peps-nav-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.9375rem !important;
  font-weight: 500 !important;
  color: #1a1a2e !important;
  -webkit-text-fill-color: #1a1a2e !important;
  padding: 0.5rem 0.65rem !important;
  margin: 0 !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.35rem !important;
  position: relative !important;
  white-space: nowrap !important;
  line-height: 1.2 !important;
  letter-spacing: 0 !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  visibility: visible !important;
  opacity: 1 !important;
  transition: color 0.2s ease !important;
}
#pepsNavbar .peps-nav-link::after {
  content: '' !important;
  position: absolute !important;
  bottom: -2px !important;
  left: 50% !important;
  right: 50% !important;
  height: 2.5px !important;
  background: linear-gradient(90deg, #c1272d, #006233) !important;
  border-radius: 2px !important;
  transition: left 0.25s ease, right 0.25s ease !important;
}
#pepsNavbar .peps-nav-link:hover::after,
#pepsNavbar .peps-nav-link.active::after,
#pepsNavbar .peps-dropdown:hover > .peps-nav-link::after,
#pepsNavbar .peps-dropdown.open > .peps-nav-link::after {
  left: 0.35rem !important;
  right: 0.35rem !important;
}
#pepsNavbar .peps-nav-link:hover,
#pepsNavbar .peps-nav-link.active,
#pepsNavbar .peps-dropdown:hover > .peps-nav-link,
#pepsNavbar .peps-dropdown.open > .peps-nav-link {
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
}

/* ═══ 2. MENU DÉROULANT (.peps-dropdown) — HOVER CSS + JS SUR 100 % DES PAGES ═══ */
#pepsNavbar .peps-dropdown {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 80px !important;
  overflow: visible !important;
  visibility: visible !important;
  opacity: 1 !important;
}
#pepsNavbar .peps-dropdown-caret {
  font-size: 0.75rem !important;
  line-height: 1 !important;
  display: inline-block !important;
  margin-left: 0.25rem !important;
  transition: transform 0.22s ease !important;
  color: inherit !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-caret,
#pepsNavbar .peps-dropdown.open .peps-dropdown-caret {
  transform: rotate(180deg) !important;
  color: #c1272d !important;
}
/* Pont invisible sous le bouton pour garder le hover actif en descendant vers la liste */
#pepsNavbar .peps-dropdown::after {
  content: '' !important;
  position: absolute !important;
  top: 100% !important;
  left: -20px !important;
  right: -20px !important;
  height: 18px !important;
  background: transparent !important;
  pointer-events: auto !important;
}
#pepsNavbar .peps-dropdown .peps-dropdown-menu {
  position: absolute !important;
  top: calc(100% - 6px) !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(8px) !important;
  width: 340px !important;
  min-width: 340px !important;
  height: auto !important;
  max-height: none !important;
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 14px !important;
  box-shadow: 0 20px 45px -6px rgba(15, 23, 42, 0.22), 0 4px 14px rgba(0, 0, 0, 0.08) !important;
  padding: 0.55rem !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 3px !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease !important;
  z-index: 2147483647 !important;
  overflow: visible !important;
  box-sizing: border-box !important;
  text-align: left !important;
  direction: ltr !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-menu,
#pepsNavbar .peps-dropdown.open .peps-dropdown-menu,
#pepsNavbar .peps-dropdown:focus-within .peps-dropdown-menu {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: translateX(-50%) translateY(0) !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 0.55rem !important;
  width: 100% !important;
  min-height: 36px !important;
  height: auto !important;
  padding: 0.5rem 0.75rem !important;
  margin: 0 !important;
  border-radius: 9px !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.83rem !important;
  font-weight: 500 !important;
  line-height: 1.35 !important;
  color: #0f172a !important;
  -webkit-text-fill-color: #0f172a !important;
  background: transparent !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  opacity: 1 !important;
  visibility: visible !important;
  position: relative !important;
  transform: none !important;
  border: 1px solid transparent !important;
  transition: background 0.15s ease, color 0.15s ease !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item::after,
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item::before {
  display: none !important;
  content: none !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item:hover {
  background: #f1f5f9 !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.active-tool {
  background: rgba(193, 39, 45, 0.09) !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
  font-weight: 600 !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.peps-dropdown-hub {
  background: linear-gradient(135deg, rgba(193, 39, 45, 0.1), rgba(0, 98, 51, 0.1)) !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
  font-weight: 600 !important;
  border: 1px solid rgba(193, 39, 45, 0.24) !important;
  margin-bottom: 0.3rem !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.peps-dropdown-hub:hover {
  background: linear-gradient(135deg, #c1272d, #006233) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}

/* ═══ 3. BOUTON TRADUCTEUR UNIVERSEL (FR / EN / عربي) À DROITE ═══ */
#pepsNavbar .peps-lang-switch {
  display: inline-flex !important;
  align-items: center !important;
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 9999px !important;
  padding: 3px 4px !important;
  gap: 2px !important;
  margin-left: 0.5rem !important;
  direction: ltr !important;
  box-sizing: border-box !important;
}
#pepsNavbar .peps-lang-btn {
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 5px 11px !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  color: #475569 !important;
  border-radius: 9999px !important;
  line-height: 1.2 !important;
  transition: all 0.2s ease !important;
}
#pepsNavbar .peps-lang-btn.active {
  background: #ffffff !important;
  color: #0f172a !important;
  font-weight: 600 !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.14) !important;
}
#pepsNavbar .peps-lang-btn:hover:not(.active) {
  color: #c1272d !important;
}
#pepsNavbar .peps-lang-sep {
  font-size: 0.75rem !important;
  color: #cbd5e1 !important;
  user-select: none !important;
  padding: 0 1px !important;
}
#pepsNavbar .peps-nav-toggle {
  display: none !important;
  flex-direction: column !important;
  gap: 5px !important;
  background: none !important;
  border: none !important;
  cursor: pointer !important;
  padding: 0.5rem !important;
}
#pepsNavbar .peps-nav-toggle span {
  display: block !important;
  width: 24px !important;
  height: 2.5px !important;
  background: #1a1a2e !important;
  border-radius: 2px !important;
}

/* ═══ 3B. HERO, CARTES ALIGNÉES & BOUTON CTA CALCULER (STYLE VMA PREMIUM) ═══ */
.vma-hero {
  margin-top: 80px !important;
  padding: 2.85rem 1.25rem 2.35rem !important;
  background: radial-gradient(circle at 18% 20%, rgba(193, 39, 45, 0.07) 0%, transparent 45%),
              radial-gradient(circle at 82% 80%, rgba(0, 98, 51, 0.07) 0%, transparent 45%),
              linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
  border-bottom: 1px solid #e2e8f0 !important;
  text-align: center !important;
  position: relative !important;
}
.hero-badge {
  display: inline-flex !important; align-items: center !important; gap: 0.45rem !important;
  background: linear-gradient(135deg, rgba(193, 39, 45, 0.1), rgba(0, 98, 51, 0.08)) !important;
  color: #c1272d !important;
  padding: 0.4rem 1.1rem !important; border-radius: 9999px !important;
  font-size: 0.76rem !important; font-weight: 800 !important; text-transform: uppercase !important;
  letter-spacing: 0.05em !important; margin-bottom: 0.85rem !important;
  border: 1px solid rgba(193, 39, 45, 0.22) !important;
  box-shadow: 0 2px 8px rgba(193, 39, 45, 0.08) !important;
}
.vma-hero h1 {
  font-family: var(--font-display) !important;
  font-size: clamp(1.6rem, 3.1vw, 2.3rem) !important;
  font-weight: 800 !important; color: #0f172a !important; margin: 0 auto 0.65rem auto !important;
  max-width: 880px !important; line-height: 1.22 !important; letter-spacing: -0.02em !important;
}
.vma-hero p {
  font-size: 0.96rem !important; color: #475569 !important; max-width: 760px !important;
  margin: 0 auto !important; line-height: 1.6 !important;
}
.peps-hero-pills {
  display: flex !important; flex-wrap: wrap !important; justify-content: center !important;
  gap: 0.55rem !important; margin-top: 1.15rem !important;
}
.peps-hero-pill {
  display: inline-flex !important; align-items: center !important; gap: 0.35rem !important;
  background: #ffffff !important; border: 1px solid #e2e8f0 !important; border-radius: 9999px !important;
  padding: 0.3rem 0.8rem !important; font-size: 0.74rem !important; font-weight: 700 !important;
  color: #334155 !important; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04) !important;
}
main > div.max-w-3xl,
#tool-results-panel > div,
.peps-seo-guide-card {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 20px !important;
  border: 1px solid rgba(203, 213, 225, 0.85) !important;
  box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.07), 0 2px 6px rgba(15, 23, 42, 0.03) !important;
  background: #ffffff !important;
}
main > div.max-w-3xl::before {
  content: '' !important;
  position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important;
  height: 4px !important;
  background: linear-gradient(90deg, #c1272d 0%, #e11d48 50%, #006233 100%) !important;
}
main > div.max-w-3xl .grid {
  align-items: stretch !important;
}
main > div.max-w-3xl .grid > div {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
  box-sizing: border-box !important;
}
main > div.max-w-3xl .grid > div > label {
  margin-bottom: 0.45rem !important;
  line-height: 1.3 !important;
  min-height: 2.1rem !important;
  display: flex !important;
  align-items: flex-end !important;
}
main > div.max-w-3xl input[type="number"],
main > div.max-w-3xl select {
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  border: 1.5px solid #cbd5e1 !important;
  background-color: #f8fafc !important;
  padding: 0 0.9rem !important;
  font-size: 0.95rem !important;
  color: #0f172a !important;
  transition: all 0.18s ease !important;
  margin-top: auto !important;
}
main > div.max-w-3xl input[type="number"]:focus,
main > div.max-w-3xl select:focus {
  outline: none !important;
  border-color: #c1272d !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 4px rgba(193, 39, 45, 0.12) !important;
}
#tool-results-panel .grid > div {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
}
.peps-cta-btn {
  width: 100% !important;
  padding: 1.05rem 1.6rem !important;
  margin-top: 0.5rem !important;
  background: linear-gradient(135deg, #c1272d 0%, #991b1b 55%, #006233 100%) !important;
  background-size: 160% 160% !important;
  color: #ffffff !important;
  font-family: var(--font-display) !important;
  font-size: 1.02rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.01em !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  border-radius: 14px !important;
  cursor: pointer !important;
  box-shadow: 0 10px 25px -4px rgba(193, 39, 45, 0.45), 0 4px 10px -2px rgba(0, 98, 51, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, filter 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.65rem !important;
  position: relative !important;
  overflow: hidden !important;
}
.peps-cta-btn::after {
  content: '→' !important;
  font-size: 1.15rem !important;
  font-weight: 900 !important;
  margin-left: 0.25rem !important;
  transition: transform 0.2s ease !important;
}
html[dir="rtl"] .peps-cta-btn::after {
  content: '←' !important;
  margin-left: 0 !important;
  margin-right: 0.25rem !important;
}
.peps-cta-btn:hover {
  transform: translateY(-2.5px) scale(1.005) !important;
  box-shadow: 0 16px 32px -5px rgba(193, 39, 45, 0.55), 0 6px 14px -2px rgba(0, 98, 51, 0.3) !important;
  filter: brightness(1.07) !important;
}
.peps-cta-btn:hover::after {
  transform: translateX(4px) !important;
}
html[dir="rtl"] .peps-cta-btn:hover::after {
  transform: translateX(-4px) !important;
}
.peps-cta-btn:active {
  transform: translateY(0) scale(0.995) !important;
}
@keyframes pepsFadeSlideUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.peps-results-reveal {
  animation: pepsFadeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ═══ 4. FOOTER UNIFIÉ À 5 COLONNES SANS DOUBLONS (BLINDÉ CONTRE TAILWIND CDN) ═══ */
footer.footer, #profeps-unified-footer {
  background: linear-gradient(135deg, #15192b 0%, #162038 100%) !important;
  color: #ffffff !important;
  padding: 3.5rem 2rem 0 !important;
  margin-top: 4rem !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  box-sizing: border-box !important;
  width: 100% !important;
  display: block !important;
}
#profeps-unified-footer .footer-container,
footer.footer .footer-container,
.footer .footer-inner {
  max-width: 1360px !important;
  margin: 0 auto !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}
#profeps-unified-footer .footer-grid,
footer.footer .footer-grid {
  display: grid !important;
  grid-template-columns: 1.65fr 0.9fr 1.1fr 1.45fr 1fr !important;
  gap: 2.25rem !important;
  padding-bottom: 2.75rem !important;
  align-items: start !important;
}
#profeps-unified-footer .footer-brand,
footer.footer .footer-brand {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}
#profeps-unified-footer .footer-brand img,
footer.footer .footer-brand img {
  height: 46px !important;
  max-height: 46px !important;
  width: auto !important;
  max-width: 155px !important;
  object-fit: contain !important;
  align-self: flex-start !important;
  filter: none !important;
  border-radius: 8px !important;
  margin: 0 0 0.9rem 0 !important;
  padding: 0 !important;
  display: block !important;
}
#profeps-unified-footer .footer-brand p,
footer.footer .footer-brand p {
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 0.84rem !important;
  line-height: 1.65 !important;
  margin: 0 0 1.25rem 0 !important;
}
#profeps-unified-footer .footer-stats,
footer.footer .footer-stats {
  display: flex !important;
  align-items: center !important;
  gap: 1.25rem !important;
  flex-wrap: wrap !important;
  padding-top: 0.5rem !important;
}
#profeps-unified-footer .footer-stat-item,
footer.footer .footer-stat-item {
  display: flex !important;
  flex-direction: column !important;
}
#profeps-unified-footer .footer-stat-num,
footer.footer .footer-stat-num {
  font-size: 1.05rem !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
}
#profeps-unified-footer .footer-stat-lbl,
footer.footer .footer-stat-lbl {
  font-size: 0.7rem !important;
  color: rgba(255, 255, 255, 0.55) !important;
}
#profeps-unified-footer .footer-col h4,
footer.footer .footer-col h4 {
  font-size: 0.76rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: rgba(255, 255, 255, 0.48) !important;
  margin: 0 0 1rem 0 !important;
  line-height: 1.3 !important;
}
#profeps-unified-footer .footer-col ul,
footer.footer .footer-col ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.52rem !important;
}
#profeps-unified-footer .footer-col ul li,
footer.footer .footer-col ul li {
  margin: 0 !important;
  padding: 0 !important;
}
#profeps-unified-footer .footer-col ul li a,
footer.footer .footer-col ul li a {
  color: rgba(255, 255, 255, 0.76) !important;
  font-size: 0.83rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
  display: inline-block !important;
  line-height: 1.35 !important;
}
#profeps-unified-footer .footer-col ul li a:hover,
footer.footer .footer-col ul li a:hover {
  color: #ffffff !important;
  transform: translateX(2px) !important;
}
#profeps-unified-footer .footer-col ul li a.footer-hub-highlight,
footer.footer .footer-col ul li a.footer-hub-highlight {
  color: #4ade80 !important;
  font-weight: 800 !important;
}
#profeps-unified-footer .footer-col ul li a.footer-hub-highlight:hover,
footer.footer .footer-col ul li a.footer-hub-highlight:hover {
  color: #86efac !important;
}
#profeps-unified-footer .footer-bottom,
footer.footer .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.09) !important;
  padding: 1.25rem 0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 0.75rem !important;
  font-size: 0.79rem !important;
  color: rgba(255, 255, 255, 0.48) !important;
}

/* ═══ 5. RESPONSIVE MOBILE & TABLETTE ═══ */
@media (max-width: 1024px) {
  .footer .footer-grid {
    grid-template-columns: 1fr 1fr !important;
  }
}
@media (max-width: 900px) {
  #pepsNavbar .peps-nav-container {
    display: flex !important;
    justify-content: space-between !important;
  }
  #pepsNavbar .peps-nav-toggle {
    display: flex !important;
  }
  #pepsNavbar .peps-nav-menu {
    position: fixed !important;
    top: 80px !important;
    left: 0 !important;
    right: 0 !important;
    height: auto !important;
    max-height: calc(100vh - 80px) !important;
    overflow-y: auto !important;
    background: #ffffff !important;
    flex-direction: column !important;
    padding: 1.25rem !important;
    gap: 0.75rem !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
    display: none !important;
  }
  #pepsNavbar .peps-nav-menu.active {
    display: flex !important;
  }
  #pepsNavbar .peps-dropdown {
    flex-direction: column !important;
    height: auto !important;
    width: 100% !important;
  }
  #pepsNavbar .peps-dropdown .peps-dropdown-menu {
    position: static !important;
    transform: none !important;
    width: 100% !important;
    min-width: 0 !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
    margin-top: 0.5rem !important;
  }
}
@media (max-width: 640px) {
  .footer .footer-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>`;

function buildNavbarHtml(fileName) {
  const isHome = fileName === 'index.html';
  const isGen = fileName === 'generateur.html';
  const isBlog =
    fileName === 'blog.html' ||
    fileName.startsWith('article-') ||
    fileName.startsWith('guide-');
  const isCrmef =
    fileName === 'concours-crmef-hub.html' ||
    fileName.startsWith('qcm-') ||
    fileName.includes('crmef');
  const isTool = Boolean(TOOL_INFO[fileName]);

  const currentTool = TOOL_INFO[fileName] || TOOL_INFO['calculateur-vma.html'];
  const triggerHref = TOOL_INFO[fileName] ? fileName : 'calculateur-vma.html';

  const dropdownLinks = DROPDOWN_ITEMS.map((item) => {
    const isCurrent = item.href === fileName;
    const cls = item.isHub
      ? 'peps-dropdown-item peps-dropdown-hub'
      : isCurrent
      ? 'peps-dropdown-item active-tool'
      : 'peps-dropdown-item';
    return `            <a href="${item.href}" class="${cls}" data-i18n-fr="${item.fr.replace(/"/g, '&quot;')}" data-i18n-en="${item.en.replace(/"/g, '&quot;')}" data-i18n-ar="${item.ar.replace(/"/g, '&quot;')}">${item.fr}</a>`;
  }).join('\n');

  return `<!-- PROFEPS_UNIFIED_NAVBAR_START -->
  <nav id="navbar" class="navbar navbar-decoy" style="display:none !important;visibility:hidden !important;opacity:0 !important;width:0 !important;height:0 !important;overflow:hidden !important;position:absolute !important;pointer-events:none !important;z-index:-9999 !important;" aria-hidden="true">
    <div class="nav-container">
      <div id="navMenu" class="nav-menu"></div>
      <div id="navRightDecoy" class="nav-right"></div>
      <button id="navToggle" class="nav-toggle" type="button"></button>
    </div>
  </nav>
  <div class="peps-navbar" id="pepsNavbar" role="navigation" aria-label="Navigation principale" data-current-file="${fileName}">
    <div class="peps-nav-container">
      <a href="index.html" class="peps-nav-logo" aria-label="Prof EPS Maroc - Accueil">
        <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:52px !important;width:auto !important;max-width:160px !important;object-fit:contain !important;display:block !important;">
      </a>
      <div class="peps-nav-menu" id="pepsNavMenu">
        <a href="blog.html" class="peps-nav-link${isBlog ? " active" : ""}" data-i18n-fr="Blog" data-i18n-en="Blog" data-i18n-ar="المدونة">Blog</a>
        <a href="generateur.html" class="peps-nav-link${isGen ? " active" : ""}" data-i18n-fr="Générateur" data-i18n-en="Generator" data-i18n-ar="المولّد">Générateur</a>
        <div class="peps-dropdown" id="pepsCalcDropdown">
          <a href="${triggerHref}" class="peps-nav-link${isTool ? " active" : ""}" id="pepsDropdownTrigger"><span id="pepsDropdownTriggerText" data-i18n-fr="${currentTool.fr.replace(/"/g, "&quot;")}" data-i18n-en="${currentTool.en.replace(/"/g, "&quot;")}" data-i18n-ar="${currentTool.ar.replace(/"/g, "&quot;")}"><span class="peps-dropdown-title">${currentTool.fr}</span></span><span class="peps-dropdown-caret">▾</span></a>
          <div class="peps-dropdown-menu" id="pepsDropdownMenu">${dropdownLinks}
          </div>
        </div>
        <a href="concours-crmef-hub.html" class="peps-nav-link${isCrmef ? " active" : ""}" data-i18n-fr="Préparer Concours CRMEF" data-i18n-en="CRMEF Preparation" data-i18n-ar="الاستعداد لمباراة التعليم">Préparer Concours CRMEF</a>
      </div>
      <div class="peps-nav-right">
        <div dir="ltr" class="peps-lang-switch" aria-label="Sélecteur de langue">
          <button type="button" class="peps-lang-btn active" id="peps-btn-lang-fr" data-lang="fr" onclick="window.profepsSetLang('fr')">FR</button>
          <span class="peps-lang-sep">/</span>
          <button type="button" class="peps-lang-btn" id="peps-btn-lang-en" data-lang="en" onclick="window.profepsSetLang('en')">EN</button>
          <span class="peps-lang-sep">/</span>
          <button type="button" class="peps-lang-btn" id="peps-btn-lang-ar" data-lang="ar" onclick="window.profepsSetLang('ar')">عربي</button>
        </div>
        <button type="button" class="peps-nav-toggle" id="pepsNavToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>`;
}

function buildFooterHtml(isPublicDir = false) {
  const pfx = "";
  return `<footer class="footer" id="profeps-unified-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand" style="display:flex !important;flex-direction:column !important;align-items:flex-start !important;">
          <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:48px !important;max-height:48px !important;width:auto !important;max-width:155px !important;object-fit:contain !important;align-self:flex-start !important;filter:none !important;border-radius:8px !important;margin:0 0 0.9rem 0 !important;display:block !important;">
          <p data-i18n-fr="La plateforme de référence pour les professeurs d'EPS au Maroc. Générateur de documents pédagogiques gratuit, conforme aux orientations pédagogiques officielles (MEN)." data-i18n-en="The reference platform for PE teachers in Morocco. Free educational document generator & sports science calculators aligned with official MEN guidelines." data-i18n-ar="المنصة المرجعية لأساتذة التربية البدنية بالمغرب. مولد وثائق تربوية مجاني وحاسبات علمية للرياضة وفق التوجيهات التربوية الرسمية.">La plateforme de référence pour les professeurs d'EPS au Maroc. Générateur de documents pédagogiques gratuit, conforme aux orientations pédagogiques officielles (MEN).</p>
          <div class="footer-stats">
            <div class="footer-stat-item">
              <span class="footer-stat-num">16+</span>
              <span class="footer-stat-lbl" data-i18n-fr="APS couvertes" data-i18n-en="Sports covered" data-i18n-ar="نشاط رياضي">APS couvertes</span>
            </div>
            <div class="footer-stat-item">
              <span class="footer-stat-num">6</span>
              <span class="footer-stat-lbl" data-i18n-fr="Niveaux scolaires" data-i18n-en="School levels" data-i18n-ar="مستويات دراسية">Niveaux scolaires</span>
            </div>
            <div class="footer-stat-item">
              <span class="footer-stat-num">100%</span>
              <span class="footer-stat-lbl" data-i18n-fr="Gratuit" data-i18n-en="Free" data-i18n-ar="مجاني">Gratuit</span>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <h4 data-i18n-fr="NAVIGATION" data-i18n-en="NAVIGATION" data-i18n-ar="تصفح الموقع">NAVIGATION</h4>
          <ul>
            <li><a href="index.html" data-i18n-fr="Accueil" data-i18n-en="Home" data-i18n-ar="الرئيسية">Accueil</a></li>
            <li><a href="generateur.html" data-i18n-fr="Générateur PDF" data-i18n-en="PDF Generator" data-i18n-ar="مولد ملفات PDF">Générateur PDF</a></li>
            <li><a href="blog.html" data-i18n-fr="Articles &amp; Blog" data-i18n-en="Articles &amp; Blog" data-i18n-ar="المقالات والمدونة">Articles &amp; Blog</a></li>
            <li><a href="a-propos.html" data-i18n-fr="À propos" data-i18n-en="About Us" data-i18n-ar="من نحن">À propos</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 data-i18n-fr="PRÉPARATION CRMEF" data-i18n-en="CRMEF PREPARATION" data-i18n-ar="الاستعداد لمباراة التعليم">PRÉPARATION CRMEF</h4>
          <ul>
            <li><a href="concours-crmef-hub.html" data-i18n-fr="🏛️ Hub National CRMEF" data-i18n-en="🏛️ National CRMEF Hub" data-i18n-ar="🏛️ بوابة مباريات التعليم">🏛️ Hub National CRMEF</a></li>
            <li><a href="qcm-sciences-education-crmef.html" data-i18n-fr="📚 Tronc Commun (Sciences Éduc)" data-i18n-en="📚 Education Sciences" data-i18n-ar="📚 علوم التربية والديداكتيك">📚 Tronc Commun (Sciences Éduc)</a></li>
            <li><a href="qcm-specialite-eps-maroc.html" data-i18n-fr="🏃 Spécialité EPS" data-i18n-en="🏃 PE Specialty" data-i18n-ar="🏃 تخصص التربية البدنية">🏃 Spécialité EPS</a></li>
            <li><a href="qcm-didactique-eps-maroc.html" data-i18n-fr="⚡ Didactique EPS" data-i18n-en="⚡ PE Didactics" data-i18n-ar="⚡ ديداكتيك التربية البدنية">⚡ Didactique EPS</a></li>
            <li><a href="concours-crmef-hub.html#discipline-eps" data-i18n-fr="🎯 Les 12 Spécialités CRMEF" data-i18n-en="🎯 All 12 CRMEF Specialties" data-i18n-ar="🎯 التخصصات الـ12 لمباراة التعليم">🎯 Les 12 Spécialités CRMEF</a></li>
          </ul>
        </div>
        <div class="footer-col" id="footer-col-calculators">
          <h4 data-i18n-fr="CALCULATEURS SPORT" data-i18n-en="SPORTS CALCULATORS" data-i18n-ar="الحاسبات الرياضية">CALCULATEURS SPORT</h4>
          <ul>
            <li><a href="hub-outils-sport-performance.html" class="footer-hub-highlight" data-i18n-fr="★ Hub des Calculateurs Sport" data-i18n-en="★ All Sports Calculators Hub" data-i18n-ar="★ بوابة جميع الحاسبات الرياضية">★ Hub des Calculateurs Sport</a></li>
            <li><a href="calculateur-vma.html" data-i18n-fr="Calculateur VMA" data-i18n-en="MAS (VMA) Calculator" data-i18n-ar="حاسبة السرعة الهوائية VMA">Calculateur VMA</a></li>
            <li><a href="calculateur-vdot-asr-endurance.html" data-i18n-fr="Calculateur VO2 Max &amp; VDOT" data-i18n-en="VO2 Max &amp; VDOT Calculator" data-i18n-ar="حاسبة VO2 Max و VDOT">Calculateur VO2 Max &amp; VDOT</a></li>
            <li><a href="calculateur-asr-reserve-vitesse.html" data-i18n-fr="Réserve Anaérobie (ASR)" data-i18n-en="Anaerobic Speed Reserve (ASR)" data-i18n-ar="احتياطي السرعة اللاهوائية ASR">Réserve Anaérobie (ASR)</a></li>
            <li><a href="calculateur-indice-endurance.html" data-i18n-fr="Indice d'Endurance (IE)" data-i18n-en="Endurance Index (Péronnet)" data-i18n-ar="مؤشر التحمل (IE)">Indice d'Endurance (IE)</a></li>
            <li><a href="calculateur-frequence-cardiaque-karvonen.html" data-i18n-fr="Fréquence Cardiaque Karvonen" data-i18n-en="Heart Rate (Karvonen)" data-i18n-ar="نبضات القلب Karvonen">Fréquence Cardiaque Karvonen</a></li>
            <li><a href="calculateur-imc-sportif-masse-grasse.html" data-i18n-fr="Calculateur IMC &amp; IMG Sport" data-i18n-en="Athletic BMI &amp; Body Fat" data-i18n-ar="حاسبة كتلة الجسم والدهون">Calculateur IMC &amp; IMG Sport</a></li>
            <li><a href="calculateur-chaleur-meteo-altitude.html" data-i18n-fr="Chaleur, Humidité &amp; Altitude" data-i18n-en="Heat, Humidity &amp; Altitude" data-i18n-ar="الحرارة والرطوبة والارتفاع">Chaleur, Humidité &amp; Altitude</a></li>
            <li><a href="calculateur-gap-pente-nutrition.html" data-i18n-fr="Allure Pente (GAP) &amp; Nutrition" data-i18n-en="Grade Pace (GAP) &amp; Nutrition" data-i18n-ar="إيقاع المنحدرات والتغذية">Allure Pente (GAP) &amp; Nutrition</a></li>
            <li><a href="generateur-intermittent-hiit-cod.html" data-i18n-fr="Intermittent HIIT &amp; COD 180°" data-i18n-en="HIIT Intermittent &amp; 180° COD" data-i18n-ar="التدريب المتقطع HIIT و COD">Intermittent HIIT &amp; COD 180°</a></li>
            <li><a href="calculateur-charge-rpe-foster-acwr.html" data-i18n-fr="Charge RPE Foster &amp; ACWR" data-i18n-en="Foster RPE Load &amp; ACWR" data-i18n-ar="حمل التدريب RPE و ACWR">Charge RPE Foster &amp; ACWR</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 data-i18n-fr="LÉGAL &amp; CONTACT" data-i18n-en="LEGAL &amp; CONTACT" data-i18n-ar="قانوني واتصل بنا">LÉGAL &amp; CONTACT</h4>
          <ul>
            <li><a href="politique-confidentialite.html" data-i18n-fr="Politique de confidentialité" data-i18n-en="Privacy Policy" data-i18n-ar="سياسة الخصوصية">Politique de confidentialité</a></li>
            <li><a href="cgu.html" data-i18n-fr="Conditions d'utilisation" data-i18n-en="Terms of Use" data-i18n-ar="شروط الاستخدام">Conditions d'utilisation</a></li>
            <li><a href="contact.html" data-i18n-fr="Nous contacter" data-i18n-en="Contact Us" data-i18n-ar="اتصل بنا">Nous contacter</a></li>
            <li><a href="mailto:profepsma@gmail.com">✉️ profepsma@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span data-i18n-fr="© 2026 Prof EPS Maroc (profeps.ma). Tous droits réservés." data-i18n-en="© 2026 Prof EPS Morocco (profeps.ma). All rights reserved." data-i18n-ar="© 2026 أستاذ التربية البدنية المغرب (profeps.ma). جميع الحقوق محفوظة.">© 2026 Prof EPS Maroc (profeps.ma). Tous droits réservés.</span>
        <span data-i18n-fr="Fait avec ❤️ pour les enseignants d'EPS au Maroc" data-i18n-en="Made with ❤️ for PE teachers &amp; runners" data-i18n-ar="صنع بـ ❤️ لأساتذة التربية البدنية والعدائين">Fait avec ❤️ pour les enseignants d'EPS au Maroc</span>
      </div>
    </div>
  </footer>`;
}

// ═══ ÉTAPE 4 : JS MAÎTRE (SANS AUCUNE SÉQUENCE D'ÉCHAPPEMENT FRAGILE) ═══
const MASTER_JS_BODY = `(function() {
  // Stub silencieux au cas où un ancien script de page appelle encore window.supabase
  var dummyAuth = {
    getSession: function() { return Promise.resolve({ data: { session: null }, error: null }); },
    getUser: function() { return Promise.resolve({ data: { user: null }, error: null }); },
    onAuthStateChange: function() { return { data: { subscription: { unsubscribe: function() {} } } }; },
    signOut: function() { return Promise.resolve({ error: null }); }
  };
  var dummyClient = {
    auth: dummyAuth,
    from: function() {
      return {
        select: function() { return Promise.resolve({ data: [], error: null }); },
        insert: function() { return Promise.resolve({ data: null, error: null }); },
        update: function() { return Promise.resolve({ data: null, error: null }); },
        delete: function() { return Promise.resolve({ data: null, error: null }); }
      };
    }
  };
  window.supabase = { createClient: function() { return dummyClient; } };
  window.supabaseClient = dummyClient;

  var dropdown = document.getElementById('pepsCalcDropdown');
  var dropdownMenu = document.getElementById('pepsDropdownMenu');
  var closeTimer = null;

  function openDropdown() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    var dd = document.getElementById('pepsCalcDropdown');
    var dm = document.getElementById('pepsDropdownMenu');
    if (dd) dd.classList.add('open');
    if (dm) {
      dm.style.setProperty('opacity', '1', 'important');
      dm.style.setProperty('visibility', 'visible', 'important');
      dm.style.setProperty('pointer-events', 'auto', 'important');
      dm.style.setProperty('transform', 'translateX(-50%) translateY(0)', 'important');
    }
  }

  function closeDropdownDelayed() {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(function() {
      var dd = document.getElementById('pepsCalcDropdown');
      var dm = document.getElementById('pepsDropdownMenu');
      if (dd) dd.classList.remove('open');
      if (dm) {
        dm.style.removeProperty('opacity');
        dm.style.removeProperty('visibility');
        dm.style.removeProperty('pointer-events');
        dm.style.removeProperty('transform');
      }
    }, 180);
  }

  if (dropdown) {
    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdownDelayed);
  }
  if (dropdownMenu) {
    dropdownMenu.addEventListener('mouseenter', openDropdown);
    dropdownMenu.addEventListener('mouseleave', closeDropdownDelayed);
  }

  // Délégation globale en renfort pour garantir l'ouverture au survol sur 100 % des pages
  document.addEventListener('mouseover', function(e) {
    var t = e.target;
    if (t && t.closest && (t.closest('#pepsCalcDropdown') || t.closest('#pepsDropdownMenu'))) {
      openDropdown();
    }
  });
  document.addEventListener('mouseout', function(e) {
    var t = e.target;
    if (t && t.closest && (t.closest('#pepsCalcDropdown') || t.closest('#pepsDropdownMenu'))) {
      var rel = e.relatedTarget;
      if (!rel || !rel.closest || (!rel.closest('#pepsCalcDropdown') && !rel.closest('#pepsDropdownMenu'))) {
        closeDropdownDelayed();
      }
    }
  });

  // Supprimer tout ancien <nav class="navbar"> résiduel ET tout bouton traducteur en doublon dans le contenu
  function cleanPageDuplicates() {
    document.querySelectorAll('nav.navbar:not(.navbar-decoy), .navbar:not(.navbar-decoy)').forEach(function(oldNav) {
      if (oldNav.id !== 'pepsNavbar') {
        if (oldNav.parentNode) oldNav.parentNode.removeChild(oldNav);
      }
    });
    document.querySelectorAll('.lang-switch:not(.peps-lang-switch), .in-page-lang-switch, #btn-lang-fr, #btn-lang-en, #btn-lang-ar, button[onclick*="setToolLang"], button[onclick*="changeLang"], button.lang-btn:not(.peps-lang-btn)').forEach(function(el) {
      if (!el.closest || !el.closest('#pepsNavbar')) {
        var wrapper = el.closest ? (el.closest('.lang-switch, .in-page-lang-switch, [aria-label="Language selection"], [title*="Traduction"]') || el) : el;
        if (wrapper === el && el.parentNode && el.parentNode.tagName === 'DIV') {
          var parentTxt = (el.parentNode.textContent || '').trim();
          if (parentTxt.length <= 50 && (!el.parentNode.closest || !el.parentNode.closest('#pepsNavbar'))) {
            wrapper = el.parentNode;
          }
        }
        if (wrapper && wrapper.parentNode && (!wrapper.closest || !wrapper.closest('#pepsNavbar'))) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    });
  }
  cleanPageDuplicates();
  window.addEventListener('DOMContentLoaded', cleanPageDuplicates);
  var obs = new MutationObserver(cleanPageDuplicates);
  obs.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('scroll', function() {
    var n = document.getElementById('pepsNavbar');
    if (n) n.classList.toggle('scrolled', window.scrollY > 40);
  });

  document.addEventListener('click', function(e) {
    var t = e.target;
    if (t && t.closest && t.closest('#pepsNavToggle')) {
      var toggleBtn = document.getElementById('pepsNavToggle');
      var navMenuEl = document.getElementById('pepsNavMenu');
      if (toggleBtn && navMenuEl) {
        toggleBtn.classList.toggle('active');
        navMenuEl.classList.toggle('active');
      }
    }
  });

  window.profepsSetLang = function(lang) {
    try { localStorage.setItem('profeps_lang', lang); } catch(e) {}
    ['fr', 'en', 'ar'].forEach(function(code) {
      var btn = document.getElementById('peps-btn-lang-' + code);
      if (btn) btn.className = (code === lang) ? 'peps-lang-btn active' : 'peps-lang-btn';
      document.querySelectorAll('.peps-lang-btn[data-lang="' + code + '"]').forEach(function(b) {
        b.className = (code === lang) ? 'peps-lang-btn active' : 'peps-lang-btn';
      });
    });
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el) {
      var val = el.getAttribute('data-i18n-' + lang);
      if (val) el.textContent = val;
    });
    if (typeof window.setToolLang === 'function') window.setToolLang(lang);
    if (typeof window.changeLang === 'function') window.changeLang(lang);
    if (typeof window.setLanguage === 'function') window.setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  };

  var saved = 'fr';
  try { saved = localStorage.getItem('profeps_lang') || 'fr'; } catch(e) {}
  if (saved && saved !== 'fr') {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', function() { window.profepsSetLang(saved); });
    } else {
      window.profepsSetLang(saved);
    }
  }
})();`;

// Vérification syntaxique automatique du JS maître avant injection
try {
  new Function(MASTER_JS_BODY);
} catch (syntaxErr) {
  console.error('❌ Erreur de syntaxe dans MASTER_JS_BODY :', syntaxErr);
  process.exit(1);
}

const MASTER_JS = `<script id="profeps-master-unifier-js">\n${MASTER_JS_BODY}\n</script>\n<!-- PROFEPS_UNIFIED_NAVBAR_END -->`;

// ═══ ÉTAPE 5 : MISE À JOUR ET NETTOYAGE DE TOUTES LES PAGES HTML DU PROJET ═══
const dirsToScan = [rootDir];
if (fs.existsSync(path.join(rootDir, 'public'))) {
  dirsToScan.push(path.join(rootDir, 'public'));
}

let updatedCount = 0;

dirsToScan.forEach((dir) => {
  const htmlFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  htmlFiles.forEach((file) => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Protéger index.html qui a sa propre structure canonique riche
    if (file === 'index.html') {
      return;
    }

    // 1. Supprimer toutes les balises <script> Supabase / auth-shared / login / dashboard / navbar.js
    html = html.replace(/<script[^>]*src=["'][^"']*(?:supabase|auth-shared|auth\.js|login\.js|dashboard\.js|navbar\.js)[^"']*["'][^>]*>\s*<\/script>\s*/gi, '');
    html = html.replace(/<link[^>]*href=["'][^"']*(?:login|dashboard|auth)\.css[^"']*["'][^>]*>\s*/gi, '');

    // 2. Supprimer tout bloc <script> inline qui ne sert qu'à initialiser Supabase / auth-shared
    html = html.replace(/<script(?![^>]*id=["']profeps-master-unifier-js["'])[^>]*>([\s\S]*?)<\/script>/gi, (fullMatch, scriptContent) => {
      const hasSupabaseOrAuth = /(?:supabase\.co|createClient|auth-shared|initAuth|updateAuthUI)/i.test(scriptContent);
      const hasImportantPageLogic = /(?:jspdf|html2pdf|generatePDF|calculateVMA|calculateVDOT|calculateKarvonen|Chart\b)/i.test(scriptContent);
      if (hasSupabaseOrAuth && !hasImportantPageLogic && scriptContent.length < 6000) {
        return '';
      }
      return fullMatch
        .replace(/(?:window\.)?location\.(?:href|replace|assign)\s*=?\s*\(?['"][^'"]*(?:login|dashboard)\.html[^'"]*['"]\)?/gi, 'void 0');
    });

    // 3. Supprimer tous les liens <a> vers login.html ou dashboard.html
    html = html.replace(/<a[^>]*href=["'][^"']*(?:login|dashboard)\.html[^"']*["'][^>]*>[\s\S]*?<\/a>\s*/gi, '');

    // Sauvegarder la sous-barre des disciplines CRMEF si elle existe
    let preservedCrmefSubnav = '';
    const subnavMatch = html.match(/<!-- ================= CRMEF DISCIPLINE STICKY SUBNAV ================= -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>|<div class="peps-crmef-subnav"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
    if (subnavMatch) {
      preservedCrmefSubnav = '\n  ' + subnavMatch[0].trim() + '\n';
    } else if (file.startsWith('qcm-')) {
      preservedCrmefSubnav = `
  <!-- ================= CRMEF DISCIPLINE STICKY SUBNAV ================= -->
  <div class="peps-crmef-subnav" role="navigation" aria-label="Disciplines CRMEF">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
      <div class="flex items-center gap-1.5 shrink-0 text-xs font-bold">
        <a href="concours-crmef-hub.html" class="px-3 py-1.5 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          🏛️ Hub National
        </a>
        <a href="qcm-sciences-education-crmef.html" class="px-3 py-1.5 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          📚 Tronc Commun
        </a>
        <a href="qcm-didactique-eps-maroc.html" class="px-3 py-1.5 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          🏃 Didactique EPS
        </a>
        <a href="qcm-specialite-eps-maroc.html" class="px-3 py-1.5 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          ⚡ Spécialité EPS
        </a>
        <a href="qcm-didactique-primaire-maroc.html" class="px-3 py-1.5 rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          🎒 Primaire
        </a>
      </div>
      <div class="hidden sm:flex items-center gap-2 shrink-0">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#006233] text-xs font-bold border border-emerald-200">
          <span class="w-2 h-2 rounded-full bg-[#006233] animate-pulse"></span>
          <span>Session CRMEF 2026</span>
        </span>
      </div>
    </div>
  </div>\n`;
    }

    // 4. Nettoyer tous les anciens styles/scripts d'unification et anciennes navbars
    html = html.replace(/<!-- PROFEPS_UNIFIED_NAVBAR_START -->[\s\S]*?<!-- PROFEPS_UNIFIED_NAVBAR_END -->\s*/g, '');
    html = html.replace(/<nav id="navbar" class="navbar navbar-decoy"[\s\S]*?<\/nav>\s*/g, '');
    html = html.replace(/<div id="navbar" class="navbar-decoy"[\s\S]*?<\/div>\s*<\/div>\s*/g, '');
    html = html.replace(/<div[^>]*class=["'][^"']*nav-backdrop[^"']*["'][^>]*>\s*<\/div>\s*/gi, '');
    html = html.replace(/<style id="profeps-navbar-styles">[\s\S]*?<\/style>\s*/g, '');
    html = html.replace(/<style id="profeps-vma-dropdown-footer-css">[\s\S]*?<\/style>\s*/g, '');
    html = html.replace(/<style id="profeps-master-unifier-css">[\s\S]*?<\/style>\s*/g, '');
    html = html.replace(/<script id="profeps-navbar-script">[\s\S]*?<\/script>\s*/g, '');
    html = html.replace(/<script id="profeps-master-unifier-js">[\s\S]*?<\/script>\s*/g, '');
    html = html.replace(/\/\*\s*═══\s*NAVBAR CANONIQUE UNIFIÉE\s*═══\s*\*\/[\s\S]*?(?=<\/style>)/g, '');

    // Supprimer TOUTES les anciennes balises <nav class="navbar"> ou <nav id="navbar">
    html = html.replace(/<nav[^>]*(?:id=["']navbar["']|class=["'][^"']*navbar[^"']*["'])[^>]*>[\s\S]*?<\/nav>\s*/gi, '');
    html = html.replace(/<!-- ================= HEADER & NAVIGATION ================= -->\s*<header[\s\S]*?<\/header>\s*/gi, '');
    html = html.replace(/<header class="bg-white border-b border-slate-200 sticky top-0[\s\S]*?<\/header>\s*/gi, '');

    // Supprimer uniquement les conteneurs explicites de sélecteurs de langue en doublon (sans jamais toucher aux balises <footer ou <script)
    html = html.replace(/<div\b[^>]*class=["'][^"']*in-page-lang-switch[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, '');
    html = html.replace(/<div\b[^>]*class=["'][^"']*\blang-switch\b[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, '');
    html = html.replace(/<div\b[^>]*class=["'][^"']*\bpeps-hero-pills\b[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, '');

    // Renforcer le style inline du bouton Call-To-Action (#btn-calc-main) sur toutes les pages calculateurs
    html = html.replace(
      /<button([^>]*id="btn-calc-main"[^>]*)>([\s\S]*?)<\/button>/g,
      function(fullMatch, attrs, inner) {
        const cleanInner = inner.replace(/<span class="peps-cta-arrow"[\s\S]*?<\/span>/g, '').trim();
        return `<button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn w-full mt-3 py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer select-none" style="width:100% !important;margin-top:0.7rem !important;padding:1.05rem 1.6rem !important;border-radius:14px !important;background:linear-gradient(135deg,#c1272d 0%,#991b1b 52%,#006233 100%) !important;background-color:#c1272d !important;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;font-weight:800 !important;font-size:1.02rem !important;letter-spacing:0.01em !important;border:1px solid rgba(255,255,255,0.26) !important;box-shadow:0 12px 28px -5px rgba(193,39,45,0.48),0 4px 12px -2px rgba(0,98,51,0.28),inset 0 1px 0 rgba(255,255,255,0.28) !important;display:flex !important;align-items:center !important;justify-content:center !important;gap:0.75rem !important;cursor:pointer !important;text-align:center !important;">${cleanInner}<span class="peps-cta-arrow" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:rgba(255,255,255,0.2);font-size:1rem;font-weight:900;line-height:1;flex-shrink:0;margin-left:0.25rem;">→</span></button>`;
      }
    );

    // 5. Injecter le CSS maître juste avant </head>
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, `${MASTER_CSS}\n</head>`);
    }

    // 6. Injecter la nouvelle Navbar isolée (#pepsNavbar) + le JS maître juste après <body...>
    const newNavWithJs = `${buildNavbarHtml(file)}${preservedCrmefSubnav ? '\n' + preservedCrmefSubnav : ''}\n${MASTER_JS}`;
    if (/<body[^>]*>/i.test(html)) {
      html = html.replace(/<body[^>]*>/i, (match) => `${match}\n${newNavWithJs}`);
    } else if (/<nav[\s\S]*?<\/nav>/i.test(html)) {
      html = html.replace(/<nav[\s\S]*?<\/nav>/i, newNavWithJs);
    }

    // 7. Remplacer le <footer> par le Footer à 5 colonnes sans doublons
    const newFooter = buildFooterHtml();
    const lastFooterStart = html.lastIndexOf('<footer');
    const lastFooterEnd = html.lastIndexOf('</footer>');
    if (lastFooterStart !== -1 && lastFooterEnd !== -1 && lastFooterEnd > lastFooterStart) {
      html =
        html.slice(0, lastFooterStart) +
        newFooter +
        html.slice(lastFooterEnd + '</footer>'.length);
    } else {
      const lastBodyIdx = html.lastIndexOf('</body>');
      if (lastBodyIdx !== -1) {
        html = html.slice(0, lastBodyIdx) + `\n${newFooter}\n` + html.slice(lastBodyIdx);
      }
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ [UNIFIÉ & NETTOYÉ DE SUPABASE] -> ${path.relative(rootDir, filePath)}`);
    updatedCount++;
  });
});

console.log(`\n🎉 SUCCÈS TOTAL : ${updatedCount} pages HTML unifiées, login/dashboard/Supabase supprimés définitivement !`);
})();
