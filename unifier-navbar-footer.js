const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const targetDir = fs.existsSync(path.join(rootDir, 'public'))
  ? path.join(rootDir, 'public')
  : rootDir;

['update-navbar.js', path.join('public', 'update-navbar.js')].forEach((oldFile) => {
  const fullOldPath = path.join(rootDir, oldFile);
  if (fs.existsSync(fullOldPath)) {
    try { fs.unlinkSync(fullOldPath); } catch (e) {}
  }
});

console.log('\n======================================================');
console.log('🚀 UNIFICATEUR GLOBAL NAVBAR + FOOTER + TRADUCTEUR — PROFEPS.MA');
console.log('📂 Dossier scanné :', targetDir);
console.log('======================================================\n');

const TOOL_INFO = {
  'calculateur-vma.html': { fr: 'Calculateur VMA', en: 'MAS Calculator', ar: 'حاسبة السرعة الهوائية VMA' },
  'hub-outils-sport-performance.html': { fr: 'Hub Calculateurs Sport', en: 'Sports Calculators Hub', ar: 'بوابة الحاسبات الرياضية' },
  'calculateur-vdot-asr-endurance.html': { fr: 'Calculateur VO2 Max', en: 'VO2 Max Calculator', ar: 'حاسبة VO2 Max' },
  'calculateur-asr-reserve-vitesse.html': { fr: 'Calculateur ASR', en: 'ASR Speed Reserve', ar: 'احتياطي السرعة اللاهوائية ASR' },
  'calculateur-indice-endurance.html': { fr: "Indice d'Endurance", en: 'Endurance Index', ar: 'مؤشر التحمل (Péronnet)' },
  'calculateur-frequence-cardiaque-karvonen.html': { fr: 'Fréquence Cardiaque', en: 'Heart Rate (Karvonen)', ar: 'معدل نبضات القلب (Karvonen)' },
  'calculateur-imc-sportif-masse-grasse.html': { fr: 'Calculateur IMC & IMG', en: 'Athletic BMI & Body Fat', ar: 'مؤشر كتلة الجسم والدهون' },
  'calculateur-chaleur-meteo-altitude.html': { fr: 'Chaleur & Altitude', en: 'Heat & Altitude', ar: 'الحرارة والارتفاع عن البحر' },
  'calculateur-gap-pente-nutrition.html': { fr: 'Allure Pente (GAP)', en: 'Grade Adjusted Pace', ar: 'إيقاع الجري في المنحدرات GAP' },
  'generateur-intermittent-hiit-cod.html': { fr: 'Intermittent HIIT & COD', en: 'HIIT & 180° Shuttle', ar: 'التدريب المتقطع HIIT و COD' },
  'calculateur-charge-rpe-foster-acwr.html': { fr: 'Charge RPE & ACWR', en: 'RPE Load & ACWR', ar: 'حمل التدريب RPE و ACWR' }
};

const DROPDOWN_ITEMS = [
  { href: 'hub-outils-sport-performance.html', isHub: true, fr: '🧭 Hub de Tous les Calculateurs Sport', en: '🧭 All Sports Calculators Hub', ar: '🧭 بوابة جميع الحاسبات الرياضية' },
  { href: 'calculateur-vma.html', fr: '⚡ Calculateur VMA & Allures', en: '⚡ MAS (VMA) & Paces Calculator', ar: '⚡ حاسبة السرعة الهوائية القصوى (VMA)' },
  { href: 'calculateur-vdot-asr-endurance.html', fr: '🫁 Calculateur VO2 Max & VDOT', en: '🫁 VO2 Max & VDOT Calculator', ar: '🫁 حاسبة VO2 Max ومؤشر VDOT' },
  { href: 'calculateur-asr-reserve-vitesse.html', fr: '🚀 Réserve de Vitesse Anaérobie (ASR)', en: '🚀 Anaerobic Speed Reserve (ASR)', ar: '🚀 احتياطي السرعة اللاهوائية (ASR)' },
  { href: 'calculateur-indice-endurance.html', fr: "📈 Indice d'Endurance (Péronnet)", en: '📈 Endurance Index (Péronnet)', ar: '📈 مؤشر التحمل (نموذج بيروني)' },
  { href: 'calculateur-frequence-cardiaque-karvonen.html', fr: '❤️ Fréquence Cardiaque (Karvonen)', en: '❤️ Heart Rate Zones (Karvonen)', ar: '❤️ نبضات القلب ومناطق التدريب (Karvonen)' },
  { href: 'calculateur-imc-sportif-masse-grasse.html', fr: '⚖️ Calculateur IMC & Masse Grasse', en: '⚖️ Athletic BMI & Body Fat %', ar: '⚖️ حاسبة مؤشر كتلة الجسم ونسبة الدهون' },
  { href: 'calculateur-chaleur-meteo-altitude.html', fr: '☀️ Chaleur, Humidité & Altitude', en: '☀️ Heat, Humidity & Altitude', ar: '☀️ تأثير الحرارة والرطوبة والارتفاع' },
  { href: 'calculateur-gap-pente-nutrition.html', fr: '⛰️ Allure Pente (GAP) & Nutrition', en: '⛰️ Grade Adjusted Pace & Nutrition', ar: '⛰️ إيقاع المنحدرات (GAP) والتغذية' },
  { href: 'generateur-intermittent-hiit-cod.html', fr: '🔄 Intermittent HIIT & COD 180°', en: '🔄 HIIT Intermittent & 180° COD', ar: '🔄 مولد التدريب المتقطع HIIT وتغيير الاتجاه' },
  { href: 'calculateur-charge-rpe-foster-acwr.html', fr: '🛡️ Charge RPE Foster & ACWR', en: '🛡️ Foster sRPE Load & ACWR Ratio', ar: '🛡️ حمل التدريب (RPE Foster) ونسبة ACWR' }
];

const MASTER_CSS = `
<style id="profeps-master-unifier-css">
html { overflow-y: scroll !important; }
nav.navbar, #navbar.navbar, .navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 80px !important;
  min-height: 80px !important;
  max-height: 80px !important;
  padding: 0 2rem !important;
  margin: 0 !important;
  z-index: 99999 !important;
  background: rgba(255, 255, 255, 0.97) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85) !important;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04) !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  overflow: visible !important;
  transition: box-shadow 0.25s ease, background 0.25s ease !important;
  direction: ltr !important;
}
nav.navbar.scrolled, #navbar.navbar.scrolled, .navbar.scrolled {
  height: 80px !important;
  min-height: 80px !important;
  max-height: 80px !important;
  padding: 0 2rem !important;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08) !important;
  background: rgba(255, 255, 255, 0.99) !important;
}
#navbar .nav-container, nav.navbar .nav-container, .nav-container {
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
#navbar .nav-logo, nav.navbar .nav-logo, .nav-logo {
  justify-self: start !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 54px !important;
  text-decoration: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
#navbar .nav-logo img, nav.navbar .nav-logo img, .navbar.scrolled .nav-logo img, .nav-logo img {
  height: 52px !important;
  max-height: 52px !important;
  width: auto !important;
  object-fit: contain !important;
  display: block !important;
  margin: 0 !important;
}
#navbar #navMenu.nav-menu, nav.navbar .nav-menu, .nav-menu {
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
}
#navbar .nav-right, nav.navbar .nav-right, .nav-right {
  justify-self: end !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 0.75rem !important;
  margin: 0 !important;
  padding-right: 0.25rem !important;
}
#navbar .nav-link, nav.navbar .nav-link, .nav-link {
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.96rem !important;
  font-weight: 800 !important;
  color: #1a1a2e !important;
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
  letter-spacing: -0.01em !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  transition: color 0.2s ease !important;
}
#navbar .nav-link::after, nav.navbar .nav-link::after, .nav-link::after {
  content: '' !important;
  position: absolute !important;
  bottom: -2px !important;
  left: 50% !important;
  right: 50% !important;
  height: 3px !important;
  background: linear-gradient(90deg, #c1272d, #006233) !important;
  border-radius: 2px !important;
  transition: left 0.25s ease, right 0.25s ease !important;
}
#navbar .nav-link:hover::after,
#navbar .nav-link.active::after,
.nav-dropdown:hover > .nav-link::after,
.nav-link:hover::after,
.nav-link.active::after {
  left: 0.35rem !important;
  right: 0.35rem !important;
}
#navbar .nav-link:hover,
#navbar .nav-link.active,
.nav-dropdown:hover > .nav-link,
.nav-link:hover,
.nav-link.active {
  color: #c1272d !important;
}
#navbar .nav-dropdown, nav.navbar .nav-dropdown, .nav-dropdown {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  height: auto !important;
  overflow: visible !important;
}
.nav-dropdown-caret {
  font-size: 0.75rem !important;
  line-height: 1 !important;
  display: inline-block !important;
  transition: transform 0.25s ease !important;
}
.nav-dropdown:hover .nav-dropdown-caret,
.nav-dropdown.open .nav-dropdown-caret {
  transform: rotate(180deg) !important;
  color: #c1272d !important;
}
#navbar #navMenu .nav-dropdown .nav-dropdown-menu,
nav.navbar .nav-dropdown .nav-dropdown-menu,
.nav-dropdown-menu {
  position: absolute !important;
  top: calc(100% + 8px) !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(8px) !important;
  width: 335px !important;
  min-width: 335px !important;
  height: auto !important;
  max-height: none !important;
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 14px !important;
  box-shadow: 0 20px 42px -6px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(0, 0, 0, 0.06) !important;
  padding: 0.55rem !important;
  margin: 0 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease !important;
  z-index: 999999 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: 2px !important;
  overflow: visible !important;
  box-sizing: border-box !important;
  text-align: left !important;
}
.nav-dropdown::after {
  content: '' !important;
  position: absolute !important;
  top: 100% !important;
  left: -10px !important;
  right: -10px !important;
  height: 16px !important;
  background: transparent !important;
}
#navbar #navMenu .nav-dropdown:hover .nav-dropdown-menu,
#navbar #navMenu .nav-dropdown.open .nav-dropdown-menu,
nav.navbar .nav-dropdown:hover .nav-dropdown-menu,
nav.navbar .nav-dropdown.open .nav-dropdown-menu,
.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown.open .nav-dropdown-menu {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: translateX(-50%) translateY(0) !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item,
nav.navbar .nav-dropdown-menu a.nav-dropdown-item,
.nav-dropdown-menu a.nav-dropdown-item {
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
  font-weight: 600 !important;
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
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item::after,
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item::before,
.nav-dropdown-menu a.nav-dropdown-item::after,
.nav-dropdown-menu a.nav-dropdown-item::before {
  display: none !important;
  content: none !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item:hover,
.nav-dropdown-menu a.nav-dropdown-item:hover {
  background: #f1f5f9 !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.active-tool,
.nav-dropdown-menu a.nav-dropdown-item.active-tool {
  background: rgba(193, 39, 45, 0.09) !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
  font-weight: 800 !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub,
.nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub {
  background: linear-gradient(135deg, rgba(193, 39, 45, 0.09), rgba(0, 98, 51, 0.09)) !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
  font-weight: 800 !important;
  border: 1px solid rgba(193, 39, 45, 0.22) !important;
  margin-bottom: 0.35rem !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub:hover,
.nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub:hover {
  background: linear-gradient(135deg, #c1272d, #006233) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}
#navbar .lang-switch, nav.navbar .lang-switch, .lang-switch {
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
#navbar .lang-btn, nav.navbar .lang-btn, .lang-btn {
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 5px 11px !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.78rem !important;
  font-weight: 800 !important;
  color: #475569 !important;
  border-radius: 9999px !important;
  line-height: 1.2 !important;
  transition: all 0.2s ease !important;
}
#navbar .lang-btn.active, nav.navbar .lang-btn.active, .lang-btn.active {
  background: #ffffff !important;
  color: #0f172a !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.14) !important;
}
#navbar .lang-btn:hover:not(.active), .lang-btn:hover:not(.active) {
  color: #c1272d !important;
}
#navbar .lang-sep, .lang-sep {
  font-size: 0.75rem !important;
  color: #cbd5e1 !important;
  user-select: none !important;
  padding: 0 1px !important;
}
.nav-toggle {
  display: none !important;
  flex-direction: column !important;
  gap: 5px !important;
  background: none !important;
  border: none !important;
  cursor: pointer !important;
  padding: 0.5rem !important;
}
.nav-toggle span {
  display: block !important;
  width: 24px !important;
  height: 2.5px !important;
  background: #1a1a2e !important;
  border-radius: 2px !important;
}
footer.footer, .footer {
  background: linear-gradient(135deg, #15192b 0%, #162038 100%) !important;
  color: #ffffff !important;
  padding: 3.5rem 2rem 0 !important;
  margin-top: 4rem !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  box-sizing: border-box !important;
}
.footer .footer-container, .footer .footer-inner {
  max-width: 1360px !important;
  margin: 0 auto !important;
  padding: 0 !important;
}
.footer .footer-grid {
  display: grid !important;
  grid-template-columns: 1.65fr 0.9fr 1.1fr 1.45fr 1fr !important;
  gap: 2.25rem !important;
  padding-bottom: 2.75rem !important;
  align-items: start !important;
}
.footer .footer-brand img {
  height: 44px !important;
  width: auto !important;
  filter: brightness(0) invert(1) !important;
  margin-bottom: 0.9rem !important;
  display: block !important;
}
.footer .footer-brand p {
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 0.84rem !important;
  line-height: 1.65 !important;
  margin: 0 0 1.25rem 0 !important;
}
.footer .footer-stats {
  display: flex !important;
  align-items: center !important;
  gap: 1.25rem !important;
  flex-wrap: wrap !important;
  padding-top: 0.5rem !important;
}
.footer .footer-stat-item {
  display: flex !important;
  flex-direction: column !important;
}
.footer .footer-stat-num {
  font-size: 1.05rem !important;
  font-weight: 800 !important;
  color: #ffffff !important;
}
.footer .footer-stat-lbl {
  font-size: 0.7rem !important;
  color: rgba(255, 255, 255, 0.55) !important;
}
.footer .footer-col h4 {
  font-size: 0.76rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: rgba(255, 255, 255, 0.48) !important;
  margin: 0 0 1rem 0 !important;
}
.footer .footer-col ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.52rem !important;
}
.footer .footer-col ul li { margin: 0 !important; padding: 0 !important; }
.footer .footer-col ul li a {
  color: rgba(255, 255, 255, 0.76) !important;
  font-size: 0.83rem !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  transition: color 0.2s ease, transform 0.2s ease !important;
  display: inline-block !important;
  line-height: 1.35 !important;
}
.footer .footer-col ul li a:hover {
  color: #ffffff !important;
  transform: translateX(2px) !important;
}
.footer .footer-col ul li a.footer-hub-highlight {
  color: #4ade80 !important;
  font-weight: 800 !important;
}
.footer .footer-col ul li a.footer-hub-highlight:hover {
  color: #86efac !important;
}
.footer .footer-bottom {
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
@media (max-width: 1024px) {
  .footer .footer-grid { grid-template-columns: 1fr 1fr !important; }
}
@media (max-width: 900px) {
  #navbar .nav-container, nav.navbar .nav-container, .nav-container {
    display: flex !important;
    justify-content: space-between !important;
  }
  .nav-toggle { display: flex !important; }
  #navbar #navMenu.nav-menu, nav.navbar .nav-menu, .nav-menu {
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
    box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
    display: none !important;
  }
  #navbar #navMenu.nav-menu.active, nav.navbar .nav-menu.active, .nav-menu.active {
    display: flex !important;
  }
}
@media (max-width: 640px) {
  .footer .footer-grid { grid-template-columns: 1fr !important; }
}
</style>
`;

function buildNavbarHtml(fileName) {
  const isHome = fileName === 'index.html';
  const isGen = fileName === 'generateur.html';
  const isBlog = fileName === 'blog.html' || fileName.startsWith('article-') || fileName.startsWith('guide-');
  const isTool = Boolean(TOOL_INFO[fileName]);
  const currentTool = TOOL_INFO[fileName] || TOOL_INFO['calculateur-vma.html'];
  const triggerHref = TOOL_INFO[fileName] ? fileName : 'calculateur-vma.html';

  const dropdownLinks = DROPDOWN_ITEMS.map((item) => {
    const isCurrent = item.href === fileName;
    const cls = item.isHub
      ? 'nav-dropdown-item nav-dropdown-hub'
      : isCurrent
      ? 'nav-dropdown-item active-tool'
      : 'nav-dropdown-item';
    return `            <a href="${item.href}" class="${cls}" data-i18n-fr="${item.fr.replace(/"/g, '&quot;')}" data-i18n-en="${item.en.replace(/"/g, '&quot;')}" data-i18n-ar="${item.ar.replace(/"/g, '&quot;')}">${item.fr}</a>`;
  }).join('\n');

  return `<nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo" aria-label="Prof EPS Maroc - Accueil">
        <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc">
      </a>
      <div class="nav-menu" id="navMenu">
        <a href="index.html" class="nav-link${isHome ? ' active' : ''}" data-i18n-fr="Accueil" data-i18n-en="Home" data-i18n-ar="الرئيسية">Accueil</a>
        <a href="generateur.html" class="nav-link${isGen ? ' active' : ''}" data-i18n-fr="Générateur" data-i18n-en="Generator" data-i18n-ar="المولّد">Générateur</a>
        <!-- PROFEPS_DROPDOWN_START --><div class="nav-dropdown" id="navCalcDropdown">
          <a href="${triggerHref}" class="nav-link${isTool ? ' active' : ''}" id="navDropdownTrigger"><span id="navDropdownTriggerText" data-i18n-fr="${currentTool.fr.replace(/"/g, '&quot;')}" data-i18n-en="${currentTool.en.replace(/"/g, '&quot;')}" data-i18n-ar="${currentTool.ar.replace(/"/g, '&quot;')}">${currentTool.fr}</span> <span class="nav-dropdown-caret">▾</span></a>
          <div class="nav-dropdown-menu">
${dropdownLinks}
          </div>
        </div><!-- PROFEPS_DROPDOWN_END -->
        <a href="blog.html" class="nav-link${isBlog ? ' active' : ''}" data-i18n-fr="Blog" data-i18n-en="Blog" data-i18n-ar="المدونة">Blog</a>
      </div>
      <div class="nav-right">
        <div dir="ltr" class="lang-switch" aria-label="Sélecteur de langue">
          <button type="button" class="lang-btn active" id="btn-lang-fr" data-lang="fr" onclick="window.profepsSetLang('fr')">FR</button>
          <span class="lang-sep">/</span>
          <button type="button" class="lang-btn" id="btn-lang-en" data-lang="en" onclick="window.profepsSetLang('en')">EN</button>
          <span class="lang-sep">/</span>
          <button type="button" class="lang-btn" id="btn-lang-ar" data-lang="ar" onclick="window.profepsSetLang('ar')">عربي</button>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>`;
}

function buildFooterHtml() {
  return `<footer class="footer" id="profeps-unified-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc">
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
          <h4 data-i18n-fr="RESSOURCES EPS" data-i18n-en="PE RESOURCES" data-i18n-ar="موارد التربية البدنية">RESSOURCES EPS</h4>
          <ul>
            <li><a href="cycles-eps-maroc.html" data-i18n-fr="Cycles d'EPS au Maroc" data-i18n-en="PE Cycles in Morocco" data-i18n-ar="أسلاك التربية البدنية بالمغرب">Cycles d'EPS au Maroc</a></li>
            <li><a href="programme-eps-maroc.html" data-i18n-fr="Programme EPS Maroc" data-i18n-en="Morocco PE Curriculum" data-i18n-ar="برنامج التربية البدنية بالمغرب">Programme EPS Maroc</a></li>
            <li><a href="evaluation-eps.html" data-i18n-fr="Évaluation en EPS" data-i18n-en="PE Assessment" data-i18n-ar="التقويم في التربية البدنية">Évaluation en EPS</a></li>
            <li><a href="securite-eps.html" data-i18n-fr="Sécurité en EPS" data-i18n-en="Safety in PE" data-i18n-ar="السلامة في التربية البدنية">Sécurité en EPS</a></li>
            <li><a href="bibliotheque-numerique-eps.html" data-i18n-fr="Bibliothèque numérique" data-i18n-en="Digital Library" data-i18n-ar="المكتبة الرقمية">Bibliothèque numérique</a></li>
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

const MASTER_JS = `
<script id="profeps-master-unifier-js">
(function() {
  var nav = document.getElementById('navbar');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var dropdown = document.getElementById('navCalcDropdown');

  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }
  if (dropdown) {
    dropdown.addEventListener('mouseenter', function() { dropdown.classList.add('open'); });
    dropdown.addEventListener('mouseleave', function() { dropdown.classList.remove('open'); });
  }

  var PAGE_PHRASES = [
    { fr: "Générateur de Documents Pédagogiques EPS", en: "PE Educational Document Generator", ar: "مولد الوثائق التربوية للتربية البدنية" },
    { fr: "Créez vos fiches de cycle et de séance en quelques clics", en: "Create your unit and lesson plans in a few clicks", ar: "أنشئ جذاذات الأسلاك والحصص التربوية في بضع نقرات" },
    { fr: "Générer mon document", en: "Generate my document", ar: "إنشاء وثيقتي" },
    { fr: "Télécharger en PDF", en: "Download PDF", ar: "تحميل بصيغة PDF" },
    { fr: "Informations générales", en: "General Information", ar: "معلومات عامة" },
    { fr: "Niveau scolaire", en: "School Level", ar: "المستوى الدراسي" },
    { fr: "Activité physique et sportive", en: "Physical & Sports Activity", ar: "النشاط البدني والرياضي" },
    { fr: "Compétence visée", en: "Target Competency", ar: "الكفاية المستهدفة" },
    { fr: "Objectif terminal d'intégration", en: "Terminal Integration Objective", ar: "هدف الإدماج النهائي" },
    { fr: "Blog & Ressources Pédagogiques EPS", en: "PE Blog & Educational Resources", ar: "مدونة وموارد التربية البدنية والرياضية" },
    { fr: "Lire l'article", en: "Read article", ar: "اقرأ المقال" },
    { fr: "Calculer ma VMA", en: "Calculate my MAS", ar: "احسب سرعة VMA" }
  ];

  window.profepsSetLang = function(lang) {
    try { localStorage.setItem('profeps_lang', lang); } catch(e) {}

    ['fr', 'en', 'ar'].forEach(function(code) {
      var btn = document.getElementById('btn-lang-' + code);
      if (btn) btn.className = (code === lang) ? 'lang-btn active' : 'lang-btn';
      document.querySelectorAll('.lang-btn[data-lang="' + code + '"]').forEach(function(b) {
        b.className = (code === lang) ? 'lang-btn active' : 'lang-btn';
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

    PAGE_PHRASES.forEach(function(item) {
      document.querySelectorAll('h1, h2, h3, p, button, label, span, a').forEach(function(node) {
        if (node.children.length === 0 && node.textContent) {
          var t = node.textContent.trim();
          if (t === item.fr || t === item.en || t === item.ar) {
            node.textContent = item[lang];
          }
        }
      });
    });
  };

  window.addEventListener('DOMContentLoaded', function() {
    var saved = 'fr';
    try { saved = localStorage.getItem('profeps_lang') || 'fr'; } catch(e) {}
    if (saved && saved !== 'fr') {
      window.profepsSetLang(saved);
    }
  });
})();
</script>
`;

const files = fs.readdirSync(targetDir).filter((f) => f.endsWith('.html'));
let updatedCount = 0;

files.forEach((file) => {
  const filePath = path.join(targetDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/<style id="profeps-navbar-styles">[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<style id="profeps-vma-dropdown-footer-css">[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<style id="profeps-master-unifier-css">[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<script id="profeps-navbar-script">[\s\S]*?<\/script>\s*/g, '');
  html = html.replace(/<script id="profeps-master-unifier-js">[\s\S]*?<\/script>\s*/g, '');
  html = html.replace(/<div[^>]*class="[^"]*in-page-lang-switch[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${MASTER_CSS}\n</head>`);
  }

  const newNav = buildNavbarHtml(file);
  if (/<nav[\s\S]*?<\/nav>/i.test(html)) {
    html = html.replace(/<nav[\s\S]*?<\/nav>/i, newNav);
  } else {
    html = html.replace(/<body[^>]*>/i, (match) => `${match}\n${newNav}`);
  }

  const newFooter = buildFooterHtml();
  const lastFooterStart = html.lastIndexOf('<footer');
  const lastFooterEnd = html.lastIndexOf('</footer>');
  if (lastFooterStart !== -1 && lastFooterEnd !== -1 && lastFooterEnd > lastFooterStart) {
    html = html.slice(0, lastFooterStart) + newFooter + html.slice(lastFooterEnd + '</footer>'.length);
  } else {
    const lastBodyIdx = html.lastIndexOf('</body>');
    if (lastBodyIdx !== -1) {
      html = html.slice(0, lastBodyIdx) + `\n${newFooter}\n` + html.slice(lastBodyIdx);
    }
  }

  const realBodyCloseIdx = html.lastIndexOf('</body>');
  if (realBodyCloseIdx !== -1) {
    html = html.slice(0, realBodyCloseIdx) + `${MASTER_JS}\n` + html.slice(realBodyCloseIdx);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ [UNIFIÉ : NAVBAR + DROPDOWN + TRADUCTEUR + FOOTER 5 COL] -> ${file}`);
  updatedCount++;
});

console.log('\n======================================================');
console.log(`🎉 SUCCÈS : ${updatedCount} / ${files.length} pages HTML unifiées avec succès !`);
console.log('======================================================\n');
