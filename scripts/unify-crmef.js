/**
 * scripts/unify-crmef.js
 * 
 * Script autonome d'unification pour ProfEPS.ma :
 * Unifie la Charte Graphique, la Navbar Maître 80px, le sélecteur de langue bilingue,
 * le Footer 5 Colonnes et la palette tricolore (Rouge Marocain #c1272d, Vert Palmier #006233, Slate)
 * sur le Hub Concours CRMEF et l'intégralité des 24 pages disciplinaires.
 *
 * Utilisation :
 *   node scripts/unify-crmef.js
 *   ou via npm : npm run unify:crmef
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

console.log('\n================================================================');
console.log('🇲🇦  UNIFICATION GRAPHIQUE & STRUCTURELLE · HUB CRMEF & DISCIPLINES');
console.log('📂  Dossier racine :', rootDir);
console.log('================================================================\n');

// ═══ 1. LISTE EXHAUSTIVE DES PAGES CIBLES CRMEF ═══
const TARGET_FILES = [
  'concours-crmef-hub.html',
  'qcm-concours-crmef.html',
  'qcm-sciences-education-crmef.html',
  // 12 Didactiques Disciplinaires
  'qcm-didactique-eps-maroc.html',
  'qcm-didactique-maths-maroc.html',
  'qcm-didactique-physique-chimie-maroc.html',
  'qcm-didactique-svt-maroc.html',
  'qcm-didactique-francais-maroc.html',
  'qcm-didactique-arabe-maroc.html',
  'qcm-didactique-histoire-geographie-maroc.html',
  'qcm-didactique-philosophie-maroc.html',
  'qcm-didactique-anglais-maroc.html',
  'qcm-didactique-informatique-maroc.html',
  'qcm-didactique-primaire-maroc.html',
  'qcm-didactique-education-islamique-maroc.html',
  'qcm-didactique-economie-gestion-maroc.html',
  // 12 Épreuves de Spécialité Disciplinaire
  'qcm-specialite-eps-maroc.html',
  'qcm-specialite-maths-maroc.html',
  'qcm-specialite-physique-chimie-maroc.html',
  'qcm-specialite-svt-maroc.html',
  'qcm-specialite-francais-maroc.html',
  'qcm-specialite-arabe-maroc.html',
  'qcm-specialite-histoire-geographie-maroc.html',
  'qcm-specialite-philosophie-maroc.html',
  'qcm-specialite-anglais-maroc.html',
  'qcm-specialite-informatique-maroc.html',
  'qcm-specialite-primaire-maroc.html',
  'qcm-specialite-education-islamique-maroc.html',
  'qcm-specialite-economie-gestion-maroc.html',
];

// ═══ 2. DONNÉES DU MENU DÉROULANT DES CALCULATEURS SPORT ═══
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
  { href: 'calculateur-charge-rpe-foster-acwr.html', fr: '🛡️ Charge RPE Foster & ACWR', en: '🛡️ Foster sRPE Load & ACWR Ratio', ar: '🛡️ حمل التدريب (RPE Foster) ونسبة ACWR' },
];

// ═══ 3. CSS MAÎTRE ISOLÉ (.peps-*) ═══
const MASTER_CSS = `<style id="profeps-master-unifier-css">
/* ═══ 1. VARIABLES & FONDAMENTAUX DE LA CHARTE PROFEPS.MA ═══ */
:root {
  --peps-red: #c1272d;
  --peps-red-dark: #991b1b;
  --peps-green: #006233;
  --peps-green-dark: #064e3b;
  --peps-slate-dark: #0f172a;
  --peps-slate-light: #f8fafc;
}
html {
  overflow-y: scroll !important;
  scroll-behavior: smooth;
}
body {
  padding-top: 80px !important;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}
.font-arabic {
  font-family: 'Noto Kufi Arabic', -apple-system, sans-serif !important;
}

/* ═══ 2. NAVBAR FIXE MAÎTRE (80PX) ═══ */
nav.navbar, #navbar, .navbar-decoy {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  width: 0 !important;
  position: absolute !important;
  z-index: -9999 !important;
}
#pepsNavbar.peps-navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 80px !important;
  min-height: 80px !important;
  max-height: 80px !important;
  padding: 0 1.5rem !important;
  margin: 0 !important;
  z-index: 2147483000 !important;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9) !important;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04) !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  visibility: visible !important;
  opacity: 1 !important;
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
  grid-template-columns: auto 1fr auto !important;
  align-items: center !important;
  gap: 1.5rem !important;
  box-sizing: border-box !important;
  direction: ltr !important;
}
#pepsNavbar .peps-nav-logo {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
  height: 52px !important;
  text-decoration: none !important;
}
#pepsNavbar .peps-nav-logo img {
  height: 48px !important;
  max-height: 48px !important;
  width: auto !important;
  max-width: 160px !important;
  object-fit: contain !important;
  display: block !important;
}
#pepsNavbar .peps-nav-menu {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 1.75rem !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
  height: 80px !important;
}
#pepsNavbar .peps-nav-right {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 0.75rem !important;
}
#pepsNavbar .peps-nav-link {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  color: #1a1a2e !important;
  padding: 0.5rem 0.6rem !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  position: relative !important;
  white-space: nowrap !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
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
#pepsNavbar .peps-dropdown:hover > .peps-nav-link::after {
  left: 0.35rem !important;
  right: 0.35rem !important;
}
#pepsNavbar .peps-nav-link:hover,
#pepsNavbar .peps-nav-link.active,
#pepsNavbar .peps-dropdown:hover > .peps-nav-link {
  color: #c1272d !important;
}
#pepsNavbar .peps-dropdown {
  position: relative !important;
  height: 80px !important;
  display: flex !important;
  align-items: center !important;
}
#pepsNavbar .peps-dropdown-caret {
  font-size: 0.7rem !important;
  transition: transform 0.2s ease !important;
  color: #64748b !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-caret {
  transform: rotate(180deg) !important;
  color: #c1272d !important;
}
#pepsNavbar .peps-dropdown-menu {
  position: absolute !important;
  top: 76px !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(8px) !important;
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 16px !important;
  box-shadow: 0 18px 45px -10px rgba(15, 23, 42, 0.16) !important;
  padding: 0.5rem !important;
  min-width: 310px !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  z-index: 2147483010 !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-menu,
#pepsNavbar .peps-dropdown.open .peps-dropdown-menu {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: translateX(-50%) translateY(0) !important;
}
#pepsNavbar .peps-dropdown-item {
  display: block !important;
  padding: 0.55rem 0.85rem !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #1e293b !important;
  text-decoration: none !important;
  border-radius: 10px !important;
  transition: all 0.15s ease !important;
}
#pepsNavbar .peps-dropdown-item:hover {
  background: #f1f5f9 !important;
  color: #c1272d !important;
}
#pepsNavbar .peps-dropdown-hub {
  background: linear-gradient(135deg, rgba(193, 39, 45, 0.08), rgba(0, 98, 51, 0.08)) !important;
  color: #c1272d !important;
  font-weight: 700 !important;
  border: 1px solid rgba(193, 39, 45, 0.2) !important;
  margin-bottom: 0.35rem !important;
}
#pepsNavbar .peps-dropdown-hub:hover {
  background: linear-gradient(135deg, #c1272d, #006233) !important;
  color: #ffffff !important;
}

/* ═══ 3. SÉLECTEUR DE LANGUE (FR / EN / عربي) ═══ */
#pepsNavbar .peps-lang-switch {
  display: inline-flex !important;
  align-items: center !important;
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 9999px !important;
  padding: 3px 4px !important;
  gap: 2px !important;
  direction: ltr !important;
}
#pepsNavbar .peps-lang-btn {
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 4px 10px !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 0.76rem !important;
  font-weight: 700 !important;
  color: #475569 !important;
  border-radius: 9999px !important;
  transition: all 0.18s ease !important;
}
#pepsNavbar .peps-lang-btn.active {
  background: #ffffff !important;
  color: #0f172a !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.12) !important;
}
#pepsNavbar .peps-lang-btn:hover:not(.active) {
  color: #c1272d !important;
}
#pepsNavbar .peps-lang-sep {
  font-size: 0.72rem !important;
  color: #cbd5e1 !important;
  user-select: none !important;
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
  width: 22px !important;
  height: 2px !important;
  background: #0f172a !important;
  border-radius: 2px !important;
}

/* ═══ 4. SOUS-BARRE DE NAVIGATION CRMEF (STICKY 80PX) ═══ */
.peps-crmef-subnav {
  position: sticky !important;
  top: 80px !important;
  z-index: 2147482000 !important;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.95) !important;
  box-shadow: 0 4px 14px -3px rgba(15, 23, 42, 0.04) !important;
}
.specialty-card {
  scroll-margin-top: 145px !important;
}
#specialites-section {
  scroll-margin-top: 140px !important;
}


/* ═══ 5. BOUTONS & COMPOSANTS UNIFIÉS CHARTE PROFEPS ═══ */
/* 5.1 BOUTON DIDACTIQUE (ROUGE ROYAL HARMONISÉ) */
.peps-btn-didactique, .peps-btn-primary, .peps-btn-red {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: linear-gradient(135deg, #c1272d 0%, #991b1b 100%) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 800 !important;
  font-size: 0.85rem !important;
  line-height: 1.3 !important;
  padding: 0.85rem 1.25rem !important;
  border-radius: 0.85rem !important;
  border: 1.5px solid #991b1b !important;
  box-shadow: 0 4px 14px rgba(193, 39, 45, 0.32) !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.peps-btn-didactique:hover, .peps-btn-primary:hover, .peps-btn-red:hover {
  background: linear-gradient(135deg, #a81d22 0%, #7f1d1d 100%) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 22px rgba(193, 39, 45, 0.45) !important;
}

/* 5.2 BOUTON SPÉCIALITÉ (FOND BLANC ÉLÉGANT AVEC BORDURE ROUGE VIVE & TEXTE ROUGE NET) */
.peps-btn-specialite, .peps-btn-slate, .peps-btn-green {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: #ffffff !important;
  color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 800 !important;
  font-size: 0.85rem !important;
  line-height: 1.3 !important;
  padding: 0.85rem 1.25rem !important;
  border-radius: 0.85rem !important;
  border: 2px solid #c1272d !important;
  box-shadow: 0 2px 10px rgba(193, 39, 45, 0.08) !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.peps-btn-specialite:hover, .peps-btn-slate:hover, .peps-btn-green:hover {
  background-color: #fef2f2 !important;
  color: #991b1b !important;
  -webkit-text-fill-color: #991b1b !important;
  border-color: #991b1b !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 18px rgba(193, 39, 45, 0.2) !important;
}

.peps-hero-gradient {
  background: radial-gradient(circle at 18% 20%, rgba(193, 39, 45, 0.08) 0%, transparent 45%),
              radial-gradient(circle at 82% 80%, rgba(153, 27, 27, 0.05) 0%, transparent 45%),
              linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
}
.peps-card {
  background: #ffffff !important;
  border: 1px solid rgba(226, 232, 240, 0.95) !important;
  border-radius: 1.25rem !important;
  transition: all 0.22s ease !important;
  box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.04) !important;
}
.peps-card:hover {
  border-color: #cbd5e1 !important;
  box-shadow: 0 12px 30px -8px rgba(15, 23, 42, 0.08) !important;
}

/* ═══ 6. FOOTER MAÎTRE UNIFIÉ À 5 COLONNES ═══ */
footer.footer, #profeps-unified-footer {
  background: linear-gradient(135deg, #15192b 0%, #162038 100%) !important;
  color: #ffffff !important;
  padding: 3.5rem 2rem 0 !important;
  margin-top: 4rem !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  box-sizing: border-box !important;
  width: 100% !important;
  display: block !important;
}
#profeps-unified-footer .footer-container {
  max-width: 1360px !important;
  margin: 0 auto !important;
  padding: 0 !important;
}
#profeps-unified-footer .footer-grid {
  display: grid !important;
  grid-template-columns: 1.65fr 0.95fr 1.15fr 1.45fr 1fr !important;
  gap: 2.25rem !important;
  padding-bottom: 2.75rem !important;
  align-items: start !important;
}
#profeps-unified-footer .footer-brand {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}
#profeps-unified-footer .footer-brand img {
  height: 46px !important;
  width: auto !important;
  max-width: 155px !important;
  object-fit: contain !important;
  border-radius: 8px !important;
  margin-bottom: 0.9rem !important;
  display: block !important;
}
#profeps-unified-footer .footer-brand p {
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 0.84rem !important;
  line-height: 1.65 !important;
  margin: 0 0 1.25rem 0 !important;
}
#profeps-unified-footer .footer-stats {
  display: flex !important;
  gap: 1.2rem !important;
  flex-wrap: wrap !important;
}
#profeps-unified-footer .footer-stat-item {
  display: flex !important;
  flex-direction: column !important;
}
#profeps-unified-footer .footer-stat-num {
  font-size: 1.25rem !important;
  font-weight: 900 !important;
  color: #c1272d !important;
  line-height: 1 !important;
}
#profeps-unified-footer .footer-stat-lbl {
  font-size: 0.7rem !important;
  color: rgba(255, 255, 255, 0.6) !important;
  margin-top: 0.2rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}
#profeps-unified-footer .footer-col-title {
  color: #ffffff !important;
  font-size: 0.8rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  margin-bottom: 1.1rem !important;
  position: relative !important;
  padding-bottom: 0.5rem !important;
}
#profeps-unified-footer .footer-col-title::after {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  bottom: 0 !important;
  width: 24px !important;
  height: 2px !important;
  background: #c1272d !important;
  border-radius: 2px !important;
}
#profeps-unified-footer .footer-col ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
#profeps-unified-footer .footer-col ul li {
  margin-bottom: 0.55rem !important;
}
#profeps-unified-footer .footer-col ul li a {
  color: rgba(255, 255, 255, 0.72) !important;
  text-decoration: none !important;
  font-size: 0.82rem !important;
  transition: all 0.18s ease !important;
  display: inline-block !important;
}
#profeps-unified-footer .footer-col ul li a:hover {
  color: #ffffff !important;
  transform: translateX(3px) !important;
}
#profeps-unified-footer .footer-hub-highlight {
  color: #38bdf8 !important;
  font-weight: 700 !important;
}
#profeps-unified-footer .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding: 1.5rem 0 2rem !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 1rem !important;
  font-size: 0.78rem !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

@media (max-width: 1024px) {
  #pepsNavbar .peps-nav-menu { display: none !important; }
  #pepsNavbar .peps-nav-toggle { display: flex !important; }
  #profeps-unified-footer .footer-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 2rem !important;
  }
}
@media (max-width: 640px) {
  #profeps-unified-footer .footer-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>`;

// ═══ 4. NAVBAR MAÎTRE HTML ═══
function buildNavbarHtml(fileName) {
  const isCrmef = true;
  const dropdownLinks = DROPDOWN_ITEMS.map((item) => {
    const cls = item.isHub ? 'peps-dropdown-item peps-dropdown-hub' : 'peps-dropdown-item';
    return `            <a href="${item.href}" class="${cls}" data-i18n-fr="${item.fr.replace(/"/g, '&quot;')}" data-i18n-en="${item.en.replace(/"/g, '&quot;')}" data-i18n-ar="${item.ar.replace(/"/g, '&quot;')}">${item.fr}</a>`;
  }).join('\n');

  return `<!-- PROFEPS_UNIFIED_NAVBAR_START -->
  <div class="peps-navbar" id="pepsNavbar" role="navigation" aria-label="Navigation principale" data-current-file="${fileName}">
    <div class="peps-nav-container">
      <a href="index.html" class="peps-nav-logo" aria-label="Prof EPS Maroc - Accueil">
        <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:48px !important;width:auto !important;max-width:160px !important;object-fit:contain !important;display:block !important;">
      </a>
      <div class="peps-nav-menu" id="pepsNavMenu">
        <a href="index.html" class="peps-nav-link" data-i18n-fr="Accueil" data-i18n-en="Home" data-i18n-ar="الرئيسية">Accueil</a>
        <a href="generateur.html" class="peps-nav-link" data-i18n-fr="Générateur" data-i18n-en="Generator" data-i18n-ar="المولّد">Générateur</a>
        <div class="peps-dropdown" id="pepsCalcDropdown">
          <a href="hub-outils-sport-performance.html" class="peps-nav-link" id="pepsDropdownTrigger">
            <span id="pepsDropdownTriggerText" data-i18n-fr="Calculateurs Sport" data-i18n-en="Sports Calculators" data-i18n-ar="الحاسبات الرياضية">Calculateurs Sport</span>
            <span class="peps-dropdown-caret">▾</span>
          </a>
          <div class="peps-dropdown-menu" id="pepsDropdownMenu">
${dropdownLinks}
          </div>
        </div>
        <a href="concours-crmef-hub.html" class="peps-nav-link active" data-i18n-fr="Concours CRMEF" data-i18n-en="CRMEF Exam" data-i18n-ar="مباراة التعليم">Concours CRMEF</a>
        <a href="blog.html" class="peps-nav-link" data-i18n-fr="Blog" data-i18n-en="Blog" data-i18n-ar="المدونة">Blog</a>
      </div>
      <div class="peps-nav-right">
        <div dir="ltr" class="peps-lang-switch" aria-label="Sélecteur de langue">
          <button type="button" class="peps-lang-btn active" id="peps-btn-lang-fr" data-lang="fr" onclick="window.profepsSetLang('fr')">FR</button>
          <span class="peps-lang-sep">/</span>
          <button type="button" class="peps-lang-btn" id="peps-btn-lang-en" data-lang="en" onclick="window.profepsSetLang('en')">EN</button>
          <span class="peps-lang-sep">/</span>
          <button type="button" class="peps-lang-btn" id="peps-btn-lang-ar" data-lang="ar" onclick="window.profepsSetLang('ar')">عربي</button>
        </div>
        <button type="button" class="peps-nav-toggle" id="pepsNavToggle" aria-label="Menu Mobile">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>`;
}


// ═══ 5. SOUS-BARRE DE NAVIGATION CRMEF MAÎTRE (13 DISCIPLINES + TRONC COMMUN) ═══
const CRMEF_NAV_ITEMS = [
  { key: "hub", label: "🏛️ Hub National", href: "concours-crmef-hub.html", anchor: "top" },
  { key: "se", label: "📚 Tronc Commun", href: "qcm-sciences-education-crmef.html", anchor: "tronc-commun" },
  { key: "eps", label: "🏃 EPS", didac: "qcm-didactique-eps-maroc.html", spec: "qcm-specialite-eps-maroc.html", anchor: "card-eps" },
  { key: "primaire", label: "🎒 Primaire", didac: "qcm-didactique-primaire-maroc.html", spec: "qcm-specialite-primaire-maroc.html", anchor: "card-primaire" },
  { key: "maths", label: "📐 Maths", didac: "qcm-didactique-maths-maroc.html", spec: "qcm-specialite-maths-maroc.html", anchor: "card-maths" },
  { key: "pc", label: "⚛️ Physique-Chimie", didac: "qcm-didactique-physique-chimie-maroc.html", spec: "qcm-specialite-physique-chimie-maroc.html", anchor: "card-pc" },
  { key: "svt", label: "🌿 SVT", didac: "qcm-didactique-svt-maroc.html", spec: "qcm-specialite-svt-maroc.html", anchor: "card-svt" },
  { key: "francais", label: "🇫🇷 Français", didac: "qcm-didactique-francais-maroc.html", spec: "qcm-specialite-francais-maroc.html", anchor: "card-francais" },
  { key: "arabe", label: "🇲🇦 Arabe", didac: "qcm-didactique-arabe-maroc.html", spec: "qcm-specialite-arabe-maroc.html", anchor: "card-arabe" },
  { key: "hg", label: "🌍 Histoire-Géo", didac: "qcm-didactique-histoire-geographie-maroc.html", spec: "qcm-specialite-histoire-geographie-maroc.html", anchor: "card-hg" },
  { key: "philo", label: "💭 Philosophie", didac: "qcm-didactique-philosophie-maroc.html", spec: "qcm-specialite-philosophie-maroc.html", anchor: "card-philo" },
  { key: "info", label: "💻 Informatique", didac: "qcm-didactique-informatique-maroc.html", spec: "qcm-specialite-informatique-maroc.html", anchor: "card-info" },
  { key: "anglais", label: "🇬🇧 Anglais", didac: "qcm-didactique-anglais-maroc.html", spec: "qcm-specialite-anglais-maroc.html", anchor: "card-anglais" },
  { key: "islam", label: "🕌 Éduc. Islamique", didac: "qcm-didactique-education-islamique-maroc.html", spec: "qcm-specialite-education-islamique-maroc.html", anchor: "card-islam" },
  { key: "eco", label: "📊 Éco-Gestion", didac: "qcm-didactique-economie-gestion-maroc.html", spec: "qcm-specialite-economie-gestion-maroc.html", anchor: "card-eco" }
];

function buildCrmefSubnavHtml(fileName) {
  const isHub = fileName === "concours-crmef-hub.html" || fileName === "qcm-concours-crmef.html";

  // Identifier la discipline courante et le type dépreuve
  let currentKey = "hub";
  let isDidactique = false;
  let isSpecialite = false;

  if (isHub) {
    currentKey = "hub";
  } else if (fileName.includes("sciences-education")) {
    currentKey = "se";
  } else {
    for (const item of CRMEF_NAV_ITEMS) {
      if (item.didac && fileName === item.didac) {
        currentKey = item.key;
        isDidactique = true;
        break;
      }
      if (item.spec && fileName === item.spec) {
        currentKey = item.key;
        isSpecialite = true;
        break;
      }
    }
  }

  // Construction des liens de disciplines
  const linksHtml = CRMEF_NAV_ITEMS.map(item => {
    const isActive = item.key === currentKey;
    let targetUrl = item.href;
    if (!targetUrl) {
      if (isHub) {
        targetUrl = `#${item.anchor}`;
      } else {
        targetUrl = item.didac || item.spec;
      }
    }

    const baseClass = "px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap text-xs font-bold shrink-0";
    const activeClass = "bg-slate-900 text-white shadow-xs font-black ring-1 ring-slate-900/10";
    const inactiveClass = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

    return `        <a href="${targetUrl}" class="${baseClass} ${isActive ? activeClass : inactiveClass}">
          ${item.label}
        </a>`;
  }).join("\n");

  // Si on est sur une page spécifique d une discipline, ajouter le switch Didactique / Spécialité
  let dualToggleHtml = "";
  const currentDiscipline = CRMEF_NAV_ITEMS.find(d => d.key === currentKey);
  if (currentDiscipline && currentDiscipline.didac && currentDiscipline.spec) {
    dualToggleHtml = `
      <div class="flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shrink-0 text-xs">
        <a href="${currentDiscipline.didac}" class="px-3.5 py-1.5 rounded-full font-black transition-all ${isDidactique ? "bg-[#c1272d] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}">
          📘 Didactique
        </a>
        <a href="${currentDiscipline.spec}" class="px-3.5 py-1.5 rounded-full font-black transition-all ${isSpecialite ? "bg-white text-[#c1272d] border border-[#c1272d] shadow-xs" : "text-slate-600 hover:text-slate-900"}">
          📗 Spécialité
        </a>
      </div>`;
  }

  return `  <!-- ================= CRMEF DISCIPLINE STICKY SUBNAV ================= -->
  <div class="peps-crmef-subnav" role="navigation" aria-label="Sous-navigation des Disciplines CRMEF">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 overflow-x-auto scrollbar-none">
      <div class="flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
${linksHtml}
      </div>
${dualToggleHtml ? `      <div class="flex items-center justify-center gap-2 shrink-0">
${dualToggleHtml}
      </div>` : ""}
    </div>
  </div>`;
}

// ═══ 6. FOOTER MAÎTRE UNIFIÉ À 5 COLONNES ═══
function buildFooterHtml() {
  return `<footer class="footer" id="profeps-unified-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:46px !important;max-height:46px !important;width:auto !important;max-width:155px !important;object-fit:contain !important;display:block !important;">
          <p data-i18n-fr="La plateforme de référence pour les professeurs d'EPS et candidats aux concours de l'enseignement au Maroc. QCM conformes aux cadres de référence officiels du MENPS." data-i18n-en="The reference platform for PE teachers and CRMEF candidates in Morocco. Official curriculum-aligned quizzes." data-i18n-ar="المنصة المرجعية لأساتذة التربية البدنية والمترشحين لمباريات التعليم بالمغرب. أسئلة QCM متوافقة مع الأطر المرجعية الرسمية.">La plateforme de référence pour les professeurs d'EPS et candidats aux concours de l'enseignement au Maroc. QCM conformes aux cadres de référence officiels du MENPS.</p>
          <div class="footer-stats">
            <div class="footer-stat-item">
              <span class="footer-stat-num">16+</span>
              <span class="footer-stat-lbl" data-i18n-fr="APS couvertes" data-i18n-en="Sports covered" data-i18n-ar="نشاط رياضي">APS couvertes</span>
            </div>
            <div class="footer-stat-item">
              <span class="footer-stat-num">24</span>
              <span class="footer-stat-lbl" data-i18n-fr="Silos Disciplines" data-i18n-en="Disciplines" data-i18n-ar="تخصصات ومواد">Silos Disciplines</span>
            </div>
            <div class="footer-stat-item">
              <span class="footer-stat-num">100%</span>
              <span class="footer-stat-lbl" data-i18n-fr="Gratuit" data-i18n-en="Free" data-i18n-ar="مجاني">Gratuit</span>
            </div>
          </div>
        </div>

        <div class="footer-col">
          <p class="footer-col-title" data-i18n-fr="NAVIGATION" data-i18n-en="NAVIGATION" data-i18n-ar="تصفح الموقع">NAVIGATION</p>
          <ul>
            <li><a href="index.html" data-i18n-fr="Accueil" data-i18n-en="Home" data-i18n-ar="الرئيسية">Accueil</a></li>
            <li><a href="concours-crmef-hub.html" data-i18n-fr="Hub Concours CRMEF" data-i18n-en="CRMEF Hub" data-i18n-ar="بوابة مباراة التعليم">Hub Concours CRMEF</a></li>
            <li><a href="generateur.html" data-i18n-fr="Générateur PDF" data-i18n-en="PDF Generator" data-i18n-ar="مولد الوثائق PDF">Générateur PDF</a></li>
            <li><a href="blog.html" data-i18n-fr="Articles &amp; Blog" data-i18n-en="Articles &amp; Blog" data-i18n-ar="المقالات والمدونة">Articles &amp; Blog</a></li>
            <li><a href="a-propos.html" data-i18n-fr="À propos" data-i18n-en="About Us" data-i18n-ar="من نحن">À propos</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-title" data-i18n-fr="CONCOURS CRMEF" data-i18n-en="CRMEF EXAM" data-i18n-ar="مباراة التعليم">CONCOURS CRMEF</p>
          <ul>
            <li><a href="qcm-sciences-education-crmef.html" data-i18n-fr="Tronc Commun (Sciences Éduc)" data-i18n-en="Education Sciences" data-i18n-ar="علوم التربية والديداكتيك">Tronc Commun (Sciences Éduc)</a></li>
            <li><a href="qcm-didactique-eps-maroc.html" data-i18n-fr="Didactique EPS" data-i18n-en="PE Didactics" data-i18n-ar="ديداكتيك التربية البدنية">Didactique EPS</a></li>
            <li><a href="qcm-specialite-eps-maroc.html" data-i18n-fr="Spécialité EPS" data-i18n-en="PE Specialty" data-i18n-ar="تخصص التربية البدنية">Spécialité EPS</a></li>
            <li><a href="qcm-didactique-primaire-maroc.html" data-i18n-fr="Didactique Primaire (TaRL)" data-i18n-en="Primary Education" data-i18n-ar="ديداكتيك الابتدائي">Didactique Primaire (TaRL)</a></li>
            <li><a href="qcm-specialite-maths-maroc.html" data-i18n-fr="Spécialité Mathématiques" data-i18n-en="Mathematics" data-i18n-ar="تخصص الرياضيات">Spécialité Mathématiques</a></li>
          </ul>
        </div>

        <div class="footer-col" id="footer-col-calculators">
          <p class="footer-col-title" data-i18n-fr="CALCULATEURS SPORT" data-i18n-en="SPORTS CALCULATORS" data-i18n-ar="الحاسبات الرياضية">CALCULATEURS SPORT</p>
          <ul>
            <li><a href="hub-outils-sport-performance.html" class="footer-hub-highlight" data-i18n-fr="★ Hub Tous les Calculateurs" data-i18n-en="★ All Calculators Hub" data-i18n-ar="★ بوابة جميع الحاسبات الرياضية">★ Hub Tous les Calculateurs</a></li>
            <li><a href="calculateur-vma.html" data-i18n-fr="Calculateur VMA" data-i18n-en="MAS (VMA) Calculator" data-i18n-ar="حاسبة السرعة VMA">Calculateur VMA</a></li>
            <li><a href="calculateur-vdot-asr-endurance.html" data-i18n-fr="Calculateur VO2 Max &amp; VDOT" data-i18n-en="VO2 Max &amp; VDOT" data-i18n-ar="حاسبة VO2 Max و VDOT">Calculateur VO2 Max &amp; VDOT</a></li>
            <li><a href="calculateur-asr-reserve-vitesse.html" data-i18n-fr="Réserve Anaérobie (ASR)" data-i18n-en="Speed Reserve (ASR)" data-i18n-ar="احتياطي السرعة ASR">Réserve Anaérobie (ASR)</a></li>
            <li><a href="calculateur-charge-rpe-foster-acwr.html" data-i18n-fr="Charge RPE Foster &amp; ACWR" data-i18n-en="Foster RPE &amp; ACWR" data-i18n-ar="حمل التدريب RPE و ACWR">Charge RPE Foster &amp; ACWR</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <p class="footer-col-title" data-i18n-fr="LÉGAL &amp; CONTACT" data-i18n-en="LEGAL &amp; CONTACT" data-i18n-ar="قانوني واتصل بنا">LÉGAL &amp; CONTACT</p>
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
        <span data-i18n-fr="Fait avec ❤️ pour les enseignants et candidats CRMEF au Maroc" data-i18n-en="Made with ❤️ for teachers &amp; candidates in Morocco" data-i18n-ar="صنع بـ ❤️ لأساتذة التربية البدنية والمترشحين بالمغرب">Fait avec ❤️ pour les enseignants et candidats CRMEF au Maroc</span>
      </div>
    </div>
  </footer>`;
}

// ═══ 7. SCRIPT JS MAÎTRE INLINE ═══
const MASTER_JS = `<script id="profeps-master-unifier-js">
(function() {
  function initPepsDropdown() {
    var dropdown = document.getElementById('pepsCalcDropdown');
    var dropdownMenu = document.getElementById('pepsDropdownMenu');
    var closeTimeout = null;

    function openDropdown() {
      if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
      if (dropdown) dropdown.classList.add('open');
    }
    function closeDropdown() {
      closeTimeout = setTimeout(function() {
        if (dropdown) dropdown.classList.remove('open');
      }, 150);
    }

    if (dropdown) {
      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);
    }
    if (dropdownMenu) {
      dropdownMenu.addEventListener('mouseenter', openDropdown);
      dropdownMenu.addEventListener('mouseleave', closeDropdown);
    }

    // Support tactile & clic
    var trigger = document.getElementById('pepsDropdownTrigger');
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          if (dropdown) dropdown.classList.toggle('open');
        }
      });
    }
  }

  // Hamburger mobile
  var navToggle = document.getElementById('pepsNavToggle');
  var navMenu = document.getElementById('pepsNavMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navMenu.classList.contains('active')) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#ffffff';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        navMenu.style.zIndex = '2147483005';
      } else {
        navMenu.style.display = '';
      }
    });
  }

  // Scroll Navbar Effect
  window.addEventListener('scroll', function() {
    var nav = document.getElementById('pepsNavbar');
    if (nav) {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Sélecteur de langue universel
  window.profepsSetLang = function(lang) {
    try { localStorage.setItem('profeps_lang', lang); } catch(e) {}
    ['fr', 'en', 'ar'].forEach(function(code) {
      var btn = document.getElementById('peps-btn-lang-' + code);
      if (btn) btn.className = (code === lang) ? 'peps-lang-btn active' : 'peps-lang-btn';
    });
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el) {
      var val = el.getAttribute('data-i18n-' + lang);
      if (val) el.textContent = val;
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  };

  var saved = 'fr';
  try { saved = localStorage.getItem('profeps_lang') || 'fr'; } catch(e) {}
  if (saved && saved !== 'fr') {
    window.profepsSetLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPepsDropdown);
  } else {
    initPepsDropdown();
  }
})();
</script>
<!-- PROFEPS_UNIFIED_NAVBAR_END -->`;

// ═══ 8. TRAITEMENT AUTOMATISÉ DES FICHIERS ═══
let processedCount = 0;
let errorsCount = 0;

TARGET_FILES.forEach((fileName) => {
  const filePath = path.join(publicDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  [FICHIER NON TROUVÉ] -> ${fileName}`);
    return;
  }

  try {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Nettoyer les anciens blocs d'unification
    html = html.replace(/<!-- PROFEPS_UNIFIED_NAVBAR_START -->[\s\S]*?<!-- PROFEPS_UNIFIED_NAVBAR_END -->\s*/g, '');
    html = html.replace(/<!-- ================= CRMEF DISCIPLINE STICKY SUBNAV ================= -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
    html = html.replace(/<style id="profeps-master-unifier-css">[\s\S]*?<\/style>\s*/g, '');
    html = html.replace(/<script id="profeps-master-unifier-js">[\s\S]*?<\/script>\s*/g, '');

    // 2. Supprimer tout ancien <header ...>...</header> de navigation ou ancien <nav class="navbar">
    html = html.replace(/<!-- ================= TOP PROF-EPS BRANDED HEADER ================= -->[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<!-- ================= TOP UNIVERSAL HEADER & SILO NAVIGATION ================= -->[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<!-- ================= HEADER & NAVIGATION ================= -->[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<header\b[^>]*class=["'][^"']*(?:sticky|border-b)[^"']*["'][^>]*>[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<nav[^>]*(?:id=["']navbar["']|class=["'][^"']*navbar[^"']*["'])[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

    // 3. Injecter le CSS maître avant </head>
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, `${MASTER_CSS}\n</head>`);
    }

    // 4. Injecter la Navbar Maître 80px + la sous-barre sticky + le JS maître après <body...>
    const newNav = `${buildNavbarHtml(fileName)}\n${buildCrmefSubnavHtml(fileName)}\n${MASTER_JS}`;
    if (/<body[^>]*>/i.test(html)) {
      html = html.replace(/<body([^>]*)>/i, (m, attrs) => {
        // Garantir que body a bg-slate-50 et le padding requis
        let newAttrs = attrs;
        if (!/bg-slate-50/i.test(newAttrs)) {
          newAttrs = newAttrs.replace(/class=["']([^"']*)["']/, 'class="$1 bg-slate-50"');
        }
        return `<body${newAttrs}>\n${newNav}`;
      });
    }

    // 5. Remplacer ou injecter le Footer Maître 5 colonnes
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

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ [UNIFIÉ AVEC SUCCÈS] -> ${fileName}`);
    processedCount++;
  } catch (err) {
    console.error(`❌ [ERREUR] Impossible de traiter ${fileName}:`, err.message);
    errorsCount++;
  }
});

console.log('\n================================================================');
console.log(`🎉 OPÉRATION TERMINÉE : ${processedCount} fichiers unifiés avec succès (${errorsCount} erreurs).`);
console.log('💡 Commande VS Code : node scripts/unify-crmef.js');
console.log('================================================================\n');
