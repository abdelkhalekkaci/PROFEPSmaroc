/**
 * generer-10-outils.js
 * Script 1 dédié à la génération propre et complète des 10 nouvelles pages d'outils sportifs ProfEPS.ma :
 * - Flux interactif identique au Calculateur VMA :
 *   1. Saisie des paramètres
 *   2. Clic sur le bouton d'action CTA "Calculer"
 *   3. Apparition dynamique de la zone de résultats (masquée avant le clic)
 * - Interprétation individuelle sous chaque chiffre/statistique + Bilan global & Conseils EPS (FR / EN / AR avec RTL)
 * - Aucun bouton traducteur en doublon dans le contenu (uniquement celui de la Navbar en haut à droite)
 * - Footer 5 colonnes sans doublons blindé contre le reset CSS de Tailwind CDN
 */

(async () => {
const fs = await import('fs');
const path = await import('path');

const rootDir = process.cwd();

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

function buildNavbarHtml(fileName) {
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
        <a href="index.html" class="peps-nav-link" data-i18n-fr="Accueil" data-i18n-en="Home" data-i18n-ar="الرئيسية">Accueil</a>
        <a href="generateur.html" class="peps-nav-link" data-i18n-fr="Générateur" data-i18n-en="Generator" data-i18n-ar="المولّد">Générateur</a>
        <div class="peps-dropdown" id="pepsCalcDropdown">
          <a href="${triggerHref}" class="peps-nav-link active" id="pepsDropdownTrigger"><span id="pepsDropdownTriggerText" data-i18n-fr="${currentTool.fr.replace(/"/g, '&quot;')}" data-i18n-en="${currentTool.en.replace(/"/g, '&quot;')}" data-i18n-ar="${currentTool.ar.replace(/"/g, '&quot;')}">${currentTool.fr}</span><span class="peps-dropdown-caret">▾</span></a>
          <div class="peps-dropdown-menu" id="pepsDropdownMenu">
${dropdownLinks}
          </div>
        </div>
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
        <button type="button" class="peps-nav-toggle" id="pepsNavToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>`;
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

const SHARED_MASTER_CSS = `<style id="profeps-master-unifier-css">
:root {
  --primary: #c1272d;
  --primary-dark: #a01f24;
  --secondary: #006233;
  --secondary-dark: #004d28;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --text-light: #64748b;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --border: #e2e8f0;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Plus Jakarta Sans', var(--font-sans);
}
html { overflow-y: scroll !important; }
body { font-family: var(--font-sans); background: #f8fafc; color: var(--text-primary); line-height: 1.5; margin: 0; }
.tabular-nums { font-variant-numeric: tabular-nums; }

/* ═══ 1. NAVBAR FIXE ISOLÉE (.peps-*) — 80PX VERROUILLÉ ═══ */
nav.navbar, #navbar, .navbar-decoy {
  display: none !important; visibility: hidden !important; opacity: 0 !important;
  pointer-events: none !important; height: 0 !important; width: 0 !important;
  overflow: hidden !important; position: absolute !important; z-index: -9999 !important;
}
#pepsNavbar.peps-navbar {
  position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important;
  height: 80px !important; min-height: 80px !important; max-height: 80px !important;
  padding: 0 2rem !important; margin: 0 !important; z-index: 2147483000 !important;
  background: rgba(255, 255, 255, 0.97) !important;
  backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85) !important;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04) !important;
  box-sizing: border-box !important; display: flex !important; align-items: center !important;
  visibility: visible !important; opacity: 1 !important; overflow: visible !important; direction: ltr !important;
}
#pepsNavbar .peps-nav-container {
  width: 100% !important; max-width: 1400px !important; height: 80px !important;
  margin: 0 auto !important; padding: 0 !important; display: grid !important;
  grid-template-columns: 1fr auto 1fr !important; align-items: center !important;
  box-sizing: border-box !important; overflow: visible !important; direction: ltr !important;
}
#pepsNavbar .peps-nav-logo {
  justify-self: start !important; display: inline-flex !important; align-items: center !important;
  height: 54px !important; text-decoration: none !important; margin: 0 !important; padding: 0 !important;
}
#pepsNavbar .peps-nav-logo img {
  height: 52px !important; max-height: 52px !important; width: auto !important; max-width: 160px !important;
  object-fit: contain !important; display: block !important; margin: 0 !important;
}
#pepsNavbar .peps-nav-menu {
  display: flex !important; flex-direction: row !important; align-items: center !important;
  justify-content: center !important; gap: 2rem !important; margin: 0 !important; padding: 0 !important;
  list-style: none !important; height: 80px !important; overflow: visible !important;
  visibility: visible !important; opacity: 1 !important;
}
#pepsNavbar .peps-nav-right {
  justify-self: end !important; display: flex !important; align-items: center !important;
  justify-content: flex-end !important; gap: 0.75rem !important; margin: 0 !important; padding-right: 0.25rem !important;
}
#pepsNavbar .peps-nav-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.9375rem !important; font-weight: 500 !important;
  color: #1a1a2e !important; -webkit-text-fill-color: #1a1a2e !important;
  padding: 0.5rem 0.65rem !important; margin: 0 !important; text-decoration: none !important;
  display: inline-flex !important; align-items: center !important; justify-content: center !important;
  gap: 0.35rem !important; position: relative !important; white-space: nowrap !important;
  line-height: 1.2 !important; background: transparent !important; border: none !important;
  cursor: pointer !important; transition: color 0.2s ease !important;
}
#pepsNavbar .peps-nav-link::after {
  content: '' !important; position: absolute !important; bottom: -2px !important;
  left: 50% !important; right: 50% !important; height: 2.5px !important;
  background: linear-gradient(90deg, #c1272d, #006233) !important;
  border-radius: 2px !important; transition: left 0.25s ease, right 0.25s ease !important;
}
#pepsNavbar .peps-nav-link:hover::after,
#pepsNavbar .peps-nav-link.active::after,
#pepsNavbar .peps-dropdown:hover > .peps-nav-link::after,
#pepsNavbar .peps-dropdown.open > .peps-nav-link::after {
  left: 0.35rem !important; right: 0.35rem !important;
}
#pepsNavbar .peps-nav-link:hover,
#pepsNavbar .peps-nav-link.active,
#pepsNavbar .peps-dropdown:hover > .peps-nav-link,
#pepsNavbar .peps-dropdown.open > .peps-nav-link {
  color: #c1272d !important; -webkit-text-fill-color: #c1272d !important;
}

/* ═══ 2. MENU DÉROULANT (.peps-dropdown) ═══ */
#pepsNavbar .peps-dropdown {
  position: relative !important; display: inline-flex !important; align-items: center !important;
  height: 80px !important; overflow: visible !important;
}
#pepsNavbar .peps-dropdown-caret {
  font-size: 0.75rem !important; line-height: 1 !important; display: inline-block !important;
  margin-left: 0.25rem !important; transition: transform 0.22s ease !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-caret,
#pepsNavbar .peps-dropdown.open .peps-dropdown-caret {
  transform: rotate(180deg) !important; color: #c1272d !important;
}
#pepsNavbar .peps-dropdown::after {
  content: '' !important; position: absolute !important; top: 100% !important;
  left: -20px !important; right: -20px !important; height: 18px !important;
  background: transparent !important; pointer-events: auto !important;
}
#pepsNavbar .peps-dropdown .peps-dropdown-menu {
  position: absolute !important; top: calc(100% - 6px) !important; left: 50% !important;
  transform: translateX(-50%) translateY(8px) !important; width: 340px !important; min-width: 340px !important;
  background: #ffffff !important; border: 1px solid #e2e8f0 !important; border-radius: 14px !important;
  box-shadow: 0 20px 45px -6px rgba(15, 23, 42, 0.22), 0 4px 14px rgba(0, 0, 0, 0.08) !important;
  padding: 0.55rem !important; margin: 0 !important; display: flex !important; flex-direction: column !important;
  gap: 3px !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease !important;
  z-index: 2147483647 !important; box-sizing: border-box !important; text-align: left !important; direction: ltr !important;
}
#pepsNavbar .peps-dropdown:hover .peps-dropdown-menu,
#pepsNavbar .peps-dropdown.open .peps-dropdown-menu,
#pepsNavbar .peps-dropdown:focus-within .peps-dropdown-menu {
  opacity: 1 !important; visibility: visible !important; pointer-events: auto !important;
  transform: translateX(-50%) translateY(0) !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item {
  display: flex !important; flex-direction: row !important; align-items: center !important;
  gap: 0.55rem !important; width: 100% !important; min-height: 36px !important;
  padding: 0.5rem 0.75rem !important; margin: 0 !important; border-radius: 9px !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.83rem !important; font-weight: 500 !important; line-height: 1.35 !important;
  color: #0f172a !important; -webkit-text-fill-color: #0f172a !important;
  background: transparent !important; text-decoration: none !important; white-space: nowrap !important;
  box-sizing: border-box !important; border: 1px solid transparent !important;
  transition: background 0.15s ease, color 0.15s ease !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item:hover {
  background: #f1f5f9 !important; color: #c1272d !important; -webkit-text-fill-color: #c1272d !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.active-tool {
  background: rgba(193, 39, 45, 0.09) !important; color: #c1272d !important;
  -webkit-text-fill-color: #c1272d !important; font-weight: 600 !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.peps-dropdown-hub {
  background: linear-gradient(135deg, rgba(193, 39, 45, 0.1), rgba(0, 98, 51, 0.1)) !important;
  color: #c1272d !important; -webkit-text-fill-color: #c1272d !important; font-weight: 600 !important;
  border: 1px solid rgba(193, 39, 45, 0.24) !important; margin-bottom: 0.3rem !important;
}
#pepsNavbar .peps-dropdown-menu a.peps-dropdown-item.peps-dropdown-hub:hover {
  background: linear-gradient(135deg, #c1272d, #006233) !important;
  color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;
}

/* ═══ 3. BOUTON TRADUCTEUR UNIVERSEL (FR / EN / عربي) À DROITE ═══ */
#pepsNavbar .peps-lang-switch {
  display: inline-flex !important; align-items: center !important; background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important; border-radius: 9999px !important; padding: 3px 4px !important;
  gap: 2px !important; margin-left: 0.5rem !important; direction: ltr !important; box-sizing: border-box !important;
}
#pepsNavbar .peps-lang-btn {
  background: transparent !important; border: none !important; cursor: pointer !important;
  padding: 5px 11px !important; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.78rem !important; font-weight: 600 !important; color: #475569 !important;
  border-radius: 9999px !important; line-height: 1.2 !important; transition: all 0.2s ease !important;
}
#pepsNavbar .peps-lang-btn.active {
  background: #ffffff !important; color: #0f172a !important; font-weight: 600 !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.14) !important;
}
#pepsNavbar .peps-lang-btn:hover:not(.active) { color: #c1272d !important; }
#pepsNavbar .peps-lang-sep { font-size: 0.75rem !important; color: #cbd5e1 !important; user-select: none !important; padding: 0 1px !important; }
#pepsNavbar .peps-nav-toggle {
  display: none !important; flex-direction: column !important; gap: 5px !important;
  background: none !important; border: none !important; cursor: pointer !important; padding: 0.5rem !important;
}
#pepsNavbar .peps-nav-toggle span {
  display: block !important; width: 24px !important; height: 2.5px !important;
  background: #1a1a2e !important; border-radius: 2px !important;
}

/* ═══ 4. HERO, CARTES ALIGNÉES & BOUTON CTA CALCULER (STYLE VMA PREMIUM) ═══ */
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

/* Cartes calculateurs avec barre supérieure bicolore Maroc et alignement strict des cases */
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

/* Alignement parfait des grilles de champs (input / select) même si un label fait 2 lignes */
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

/* Cartes de résultats KPI alignées en hauteur */
#tool-results-panel .grid > div {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100% !important;
}

/* Bouton Call-To-Action (CTA) ultra-attrayant style Calculateur VMA */
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

/* ═══ 5. FOOTER UNIFIÉ À 5 COLONNES BLINDÉ CONTRE TAILWIND CDN ═══ */
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
footer.footer .footer-container {
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
@media (max-width: 1024px) {
  #profeps-unified-footer .footer-grid, footer.footer .footer-grid {
    grid-template-columns: 1fr 1fr !important;
  }
}
@media (max-width: 900px) {
  #pepsNavbar .peps-nav-container { display: flex !important; justify-content: space-between !important; }
  #pepsNavbar .peps-nav-toggle { display: flex !important; }
  #pepsNavbar .peps-nav-menu {
    position: fixed !important; top: 80px !important; left: 0 !important; right: 0 !important;
    height: auto !important; max-height: calc(100vh - 80px) !important; overflow-y: auto !important;
    background: #ffffff !important; flex-direction: column !important; padding: 1.25rem !important;
    gap: 0.75rem !important; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important; display: none !important;
  }
  #pepsNavbar .peps-nav-menu.active { display: flex !important; }
  #pepsNavbar .peps-dropdown { flex-direction: column !important; height: auto !important; width: 100% !important; }
  #pepsNavbar .peps-dropdown .peps-dropdown-menu {
    position: static !important; transform: none !important; width: 100% !important; min-width: 0 !important;
    opacity: 1 !important; visibility: visible !important; pointer-events: auto !important;
    box-shadow: none !important; border: 1px solid #e2e8f0 !important; margin-top: 0.5rem !important;
  }
}
@media (max-width: 640px) {
  #profeps-unified-footer .footer-grid, footer.footer .footer-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>`;

const SHARED_NAV_JS = `(function() {
  var dropdown = document.getElementById('pepsCalcDropdown');
  var dropdownMenu = document.getElementById('pepsDropdownMenu');
  var closeTimer = null;

  function openDropdown() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
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
    });
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el) {
      var val = el.getAttribute('data-i18n-' + lang);
      if (val) el.textContent = val;
    });
    if (typeof window.setToolLang === 'function') window.setToolLang(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  };

  var saved = 'fr';
  try { saved = localStorage.getItem('profeps_lang') || 'fr'; } catch(e) {}
  if (saved && saved !== 'fr') {
    window.addEventListener('DOMContentLoaded', function() { window.profepsSetLang(saved); });
  }
})();`;

const SEO_GUIDES = {
  'calculateur-vdot-asr-endurance.html': {
    howFr: "1. Choisissez votre mode d'entrée : soit un chrono récent sur course étalonnée (1 500 m, 3 000 m, 5 km, 10 km, Semi-Marathon ou Marathon), soit directement votre VMA (km/h) mesurée lors d'un test terrain (Luc Léger, Vameval, Demi-Cooper). 2. Indiquez votre âge et votre sexe biologique pour situer votre VO2 Max dans les barèmes officiels de l'ACSM. 3. Cliquez sur le bouton Calculer pour afficher votre VO2 Max en ml/kg/min, votre score VDOT (Jack Daniels), vos 5 zones d'allures d'entraînement et vos chronos prédits.",
    howEn: "1. Select your input mode: either a recent race time (1500m to Marathon) or your field-tested MAS/VMA (km/h). 2. Enter your age and biological sex for ACSM percentile ranking. 3. Click Calculate to unlock your VO2 Max (ml/kg/min), Jack Daniels VDOT score, 5 training pace zones, and equivalent race predictions.",
    howAr: "1. اختر طريقة الحساب: إما انطلاقاً من توقيت سباق رسمي (من 1500 متر إلى الماراثون) أو من سرعة VMA المقاسة في اختبار ميداني. 2. أدخل عمرك وجنسك لمقارنة نتيجتك بمعايير الكلية الأمريكية للطب الرياضي (ACSM). 3. اضغط على زر الحساب لإظهار قيمة VO2 Max ومناطق التدريب الخمس وتوقعات السباقات.",
    inputsFr: "Chrono de course (Heures, Minutes, Secondes) : permet d'évaluer le coût énergétique réel et la fraction d'oxygène soutenue. VMA (km/h) : Vitesse Maximale Aérobie convertie via l'équation de Léger & Mercier (VO2 Max = 3,5 × VMA). Âge & Sexe : indispensables pour interpréter votre plafond aérobie selon les normes physiologiques par tranche d'âge.",
    inputsEn: "Race Time (h/m/s): computes oxygen cost and fractional utilization. MAS / VMA (km/h): Maximal Aerobic Speed converted via Léger & Mercier (VO2 Max = 3.5 × MAS). Age & Sex: required to classify your aerobic ceiling against ACSM normative tables.",
    inputsAr: "توقيت السباق: يحسب التكلفة الطاقية ونسبة استغلال الأكسجين. سرعة VMA (كم/س): تحول وفق معادلة ليجير ومرسييه (VO2 Max = 3.5 × VMA). العمر والجنس: ضروريان لتصنيف مستواك مقارنة بالمعايير العالمية.",
    faqQFr: "Quelle est la différence entre VO2 Max, VMA et VDOT en course à pied ?",
    faqAFr: "Le VO2 Max (en ml/kg/min) mesure le débit maximal d'oxygène que votre organisme peut consommer par minute. La VMA (en km/h) est la vitesse de course atteinte à 100 % du VO2 Max. Le VDOT (Jack Daniels) intègre à la fois votre VO2 Max et votre économie de course (coût énergétique de la foulée) pour prédire vos chronos du 1 500 m au marathon."
  },
  'calculateur-frequence-cardiaque-karvonen.html': {
    howFr: "1. Renseignez votre âge en années. 2. Mesurez et indiquez votre Fréquence Cardiaque de Repos (FC Repos) prise le matin au réveil allongé pendant 1 minute. 3. Si vous connaissez votre FC Maximale réelle mesurée sur le terrain ou sur tapis, saisissez-la ; sinon laissez le champ vide pour appliquer la formule scientifique de Tanaka (208 − 0,7 × Âge). 4. Cliquez sur Calculer pour obtenir vos 5 zones cardiaques de Karvonen (Z1 à Z5).",
    howEn: "1. Enter your age. 2. Input your morning Resting Heart Rate (bpm). 3. Optionally enter your field-measured Max HR, or leave blank to use the validated Tanaka formula (208 − 0.7 × Age). 4. Click Calculate to display your 5 Karvonen Heart Rate Reserve zones (Z1–Z5).",
    howAr: "1. أدخل عمرك بالسنوات. 2. أدخل نبض القلب في وقت الراحة صباحاً عند الاستيقاظ (bpm). 3. يمكنك إدخال أقصى نبض مقاس ميدانياً أو تركه فارغاً لتطبيق معادلة تاناكا الدقيقة (208 − 0.7 × العمر). 4. اضغط على زر الحساب للحصول على مناطق التدريب الخمس.",
    inputsFr: "Âge : détermine la baisse physiologique naturelle de la FC Max avec le temps. FC de Repos (bpm) : indicateur clé du tonus vagal parasympathique et du volume d'éjection systolique (plus elle est basse chez l'athlète, plus le cœur est endurant). FC de Réserve (FCR = FC Max − FC Repos) : amplitude cardiaque utile utilisée par la formule de Karvonen.",
    inputsEn: "Age: estimates chronological Max HR decline. Resting HR (bpm): reflects parasympathetic vagal tone and stroke volume efficiency. Heart Rate Reserve (HRR = Max HR − Rest HR): usable cardiac range matched to % VO2 Max.",
    inputsAr: "العمر: يحدد الانخفاض الطبيعي لأقصى نبض مع التقدم في السن. نبض الراحة (bpm): يعكس كفاءة عضلة القلب وحجم الضخ القلبي. احتياطي النبض (HRR = الأقصى − الراحة): المدى الفعلي المعتمد في معادلة كارفونين.",
    faqQFr: "Pourquoi utiliser la méthode de Karvonen plutôt que le simple pourcentage de FC Max ?",
    faqAFr: "Le calcul classique en % de FC Max ignore votre fréquence cardiaque de repos et sous-estime vos zones d'entraînement. En prenant en compte la Fréquence Cardiaque de Réserve (FC Max − FC Repos), la formule de Karvonen aligne exactement vos zones Z1 à Z5 sur votre pourcentage de réserve d'oxygène (% VO2 Max)."
  },
  'calculateur-imc-sportif-masse-grasse.html': {
    howFr: "1. Entrez votre poids corporel en kilogrammes (kg) pesé le matin à jeun. 2. Indiquez votre taille exacte en centimètres (cm). 3. Précisez votre âge et votre sexe biologique (Homme ou Femme). 4. Cliquez sur Calculer pour obtenir votre Indice de Masse Corporelle (IMC), votre taux de masse grasse estimé (IMG %), votre masse maigre active et votre positionnement dans le barème de référence officiel (Normal vs Anormal).",
    howEn: "1. Enter your morning body weight in kilograms (kg). 2. Enter your height in centimeters (cm). 3. Select your age and biological sex. 4. Click Calculate to get your BMI, estimated Body Fat % (IMG), active lean body mass, and your exact classification on the official WHO & Athletic reference scale.",
    howAr: "1. أدخل وزنك بالكيلوغرام (كغ) صباحاً. 2. أدخل طولك بالسنتيمتر (سم). 3. حدد عمرك وجنسك (ذكر أو أنثى). 4. اضغط على زر الحساب لمعرفة مؤشر كتلة الجسم (IMC)، نسبة الدهون (IMG)، الكتلة العضلية الصافية وموقعك في جدول المعايير الصحية والرياضية.",
    inputsFr: "Poids (kg) & Taille (cm) : permettent de calculer l'IMC selon la formule officielle d'Adolphe Quetelet (Poids / Taille² en mètres) ainsi que la plage de poids normal (18,5 à 24,9 kg/m²). Âge & Sexe : indispensables pour estimer l'Indice de Masse Grasse (IMG selon l'équation de Deurenberg) car la répartition physiologique entre masse musculaire et tissu adipeux diffère entre l'homme et la femme.",
    inputsEn: "Weight (kg) & Height (cm): compute BMI (Weight / Height²) and your healthy weight range in kg. Age & Sex: required by Deurenberg's equation to estimate body fat percentage (IMG) and Fat-Free Mass Index (FFMI).",
    inputsAr: "الوزن (كغ) والطول (سم): لحساب مؤشر كتلة الجسم (الوزن ÷ مربع الطول بالمتر) ونطاق الوزن الطبيعي. العمر والجنس: ضروريان لحساب نسبة الدهون في الجسم (IMG) حسب معادلة دورينبيرغ والتمييز بين الكتلة العضلية والدهون.",
    faqQFr: "Quel est l'IMC normal et pourquoi le barème IMC classique peut-il tromper un sportif ?",
    faqAFr: "Selon l'OMS, un IMC normal se situe entre 18,5 et 24,9 kg/m². En dessous de 18,5 on parle d'insuffisance pondérale (maigreur), entre 25,0 et 29,9 de surpoids, et à partir de 30,0 d'obésité. Toutefois, chez un sportif musclé, l'IMC peut dépasser 25 kg/m² tout en ayant un faible taux de masse grasse (IMG < 15 % chez l'homme, < 22 % chez la femme) : c'est pourquoi notre calculateur croise le barème IMC avec l'IMG et l'indice musculaire FFMI."
  },
  'calculateur-chaleur-meteo-altitude.html': {
    howFr: "1. Renseignez la température de l'air à l'ombre (°C) et le taux d'humidité relative (%). 2. Indiquez l'altitude du lieu d'entraînement ou de compétition en mètres (0 m pour le niveau de la mer, 1 600 m pour Ifrane, etc.). 3. Entrez votre allure habituelle en secondes par kilomètre (ex : 270 s = 4:30/km). 4. Cliquez sur Calculer pour obtenir votre ralentissement physiologique, votre allure cible ajustée et votre besoin hydrique.",
    howEn: "1. Enter ambient shade temperature (°C) and relative humidity (%). 2. Input altitude in meters. 3. Enter your normal cool-weather pace in seconds per km (e.g., 270 = 4:30/km). 4. Click Calculate to get your dew point, pace slowdown %, adjusted pace, and hourly hydration/sodium targets.",
    howAr: "1. أدخل درجة الحرارة في الظل (°C) ونسبة الرطوبة (%). 2. حدد الارتفاع عن سطح البحر بالمتر (مثلاً 1650م بمدينة إفران). 3. أدخل إيقاعك المعتاد بالثواني لكل كم (270 ثانية = 4:30/كم). 4. اضغط على زر الحساب لمعرفة الإيقاع المعدل وخطة شرب الماء والأملاح.",
    inputsFr: "Température (°C) & Humidité (%) : déterminent le Point de Rosée (Dew Point), véritable juge de l'efficacité d'évaporation de la sueur. Altitude (m) : mesure la baisse de pression partielle d'oxygène (hypoxie) qui réduit le VO2 Max au-delà de 900 m. Allure de base (sec/km) : vitesse de référence par temps frais (10–14 °C) servant à calculer l'allure corrigée.",
    inputsEn: "Temperature (°C) & Humidity (%): compute the Dew Point and evaporative cooling efficiency. Altitude (m): accounts for hypoxia above 900m. Base Pace (sec/km): cool-weather reference pace adjusted for cardiac drift.",
    inputsAr: "درجة الحرارة والرطوبة: تحددان نقطة الندى وكفاءة تبخر العرق لتبريد الجسم. الارتفاع (متر): يقيس نقص ضغط الأكسجين فوق 900 متر. الإيقاع المرجعي: سرعتك في الطقس المعتدل لتعديلها بدقة.",
    faqQFr: "Comment la chaleur, l'humidité et l'altitude ralentissent-elles votre allure de course ?",
    faqAFr: "Lorsque la température et le point de rosée grimpent, une partie importante du débit sanguin est détournée vers la peau pour refroidir le corps (dérive cardiaque), réduisant l'oxygène disponible pour les muscles. En altitude (> 1 000 m), la baisse de pression barométrique diminue le VO2 Max d'environ 1,5 à 2 % tous les 300 mètres."
  },
  'generateur-intermittent-hiit-cod.html': {
    howFr: "1. Indiquez la VMA (km/h) de l'élève, du joueur ou du groupe homogène. 2. Choisissez la durée de la fraction d'effort en secondes (ex : 10 s, 15 s ou 30 s) et le pourcentage de VMA visé (ex : 100 % à 115 % VMA). 3. Indiquez la longueur maximale disponible sur votre terrain ou gymnase (ex : 20 m ou 40 m ; mettez 0 pour une piste d'athlétisme sans demi-tour). 4. Cliquez sur Calculer pour obtenir la distance exacte où placer vos plots.",
    howEn: "1. Enter athlete or group MAS/VMA (km/h). 2. Set work interval duration in seconds (10s, 15s, 30s) and target % MAS (100%–120%). 3. Enter court shuttle length in meters (e.g., 20m or 40m; set 0 for a linear track). 4. Click Calculate to get linear and 180° COD-adjusted cone distances.",
    howAr: "1. أدخل سرعة VMA للتلميذ أو المجموعة (كم/س). 2. حدد مدة الجهد بالثواني (15 أو 30 ثانية) ونسبة الشدة المستهدفة (% من VMA). 3. أدخل طول الملعب المتاح بالمتر (مثلاً 20م أو 40م؛ ضع 0 للمضمار المستقيم). 4. اضغط على زر الحساب لمعرفة مسافة وضع الأقماع بدقة.",
    inputsFr: "VMA (km/h) & Intensité (% VMA) : fixent la vitesse mécanique cible en mètres par seconde (m/s). Durée d'effort (s) : temps de course entre deux coups de sifflet. Longueur Navette Terrain (m) : applique l'équation biomécanique de Martin Buchheit (~0,72 s perdue par demi-tour à 180°) pour corriger la distance de plots en sports collectifs et EPS.",
    inputsEn: "MAS (km/h) & Intensity (%): set mechanical target speed (m/s). Work Duration (s): interval duration. Shuttle Length (m): applies Buchheit's 180° change-of-direction time penalty (~0.72s per turn) for court sports and PE.",
    inputsAr: "سرعة VMA ونسبة الشدة: تحددان السرعة بالمتر في الثانية. مدة الجهد: زمن الجري بين الصافرتين. طول المكوك بالمتر: يطبق معادلة بوخيت لتعويض الوقت الضائع في الفرملة والدوران 180° (~0.72 ثانية لكل دوران).",
    faqQFr: "Pourquoi faut-il réduire la distance des plots lors d'un 15/15 en navette avec demi-tours (COD 180°) ?",
    faqAFr: "Sur un terrain de handball, de basket ou une cour d'établissement scolaire, chaque demi-tour à 180° oblige à freiner puis relancer, ce qui coûte environ 0,72 seconde et un surplus d'énergie musculaire excentrique. Sans réduction de la distance des plots, l'élève est en surcharge lactique précoce."
  },
  'calculateur-charge-rpe-foster-acwr.html': {
    howFr: "1. Calculez la charge de chaque séance selon la méthode de Carl Foster : Durée de la séance (en minutes) × RPE ressenti (de 1 à 10 sur l'échelle de Borg CR10). 2. Additionnez vos charges des 7 derniers jours pour obtenir la Charge Aiguë (en Unités Arbitraires UA). 3. Indiquez votre Charge Chronique (moyenne hebdomadaire des 4 dernières semaines). 4. Cliquez sur Calculer pour obtenir votre ratio ACWR et votre plafond sécuritaire.",
    howEn: "1. Multiply session duration (minutes) by Borg CR10 RPE (1–10) for each workout. 2. Sum the last 7 days to enter your Acute Load (AU). 3. Enter your 4-week rolling average Weekly Chronic Load (AU). 4. Click Calculate to check your ACWR injury risk ratio and next week's safe ceiling.",
    howAr: "1. احسب حمل كل حصة بضرب المدة (بالدقائق) في شدة الجهد المدرك RPE (من 1 إلى 10). 2. اجمع حمل آخر 7 أيام لإدخال الحمل الحاد (UA). 3. أدخل المتوسط الأسبوعي لآخر 4 أسابيع (الحمل المزمن). 4. اضغط على زر الحساب لمعرفة نسبة ACWR ومستوى الوقاية من الإصابات.",
    inputsFr: "Charge Aiguë 7 jours (UA) : reflète la fatigue récente accumulée sur la semaine en cours. Charge Chronique 28 jours (UA) : représente l'état de préparation physique (« fitness ») construit sur le dernier mois. Ratio ACWR (Aigu / Chronique) : indicateur de Tim Gabbett identifiant la zone optimale (« Sweet Spot » entre 0,80 et 1,30) et la zone de danger (> 1,50).",
    inputsEn: "Acute Load (7d AU): recent weekly fatigue. Chronic Load (28d AU): 4-week rolling fitness baseline. ACWR Ratio: Gabbett's workload index identifying the 0.80–1.30 sweet spot vs >1.50 injury danger zone.",
    inputsAr: "الحمل الحاد (7 أيام): يعبر عن الإجهاد الحديث للأسبوع الحالي. الحمل المزمن (4 أسابيع): يعكس مستوى الجاهزية البدنية التراكمي. نسبة ACWR: مؤشر غابيت لتحديد المنطقة الآمنة (0.80 إلى 1.30) وتفادي منطقة الخطر (> 1.50).",
    faqQFr: "Quel est le ratio ACWR idéal pour progresser sans se blesser ?",
    faqAFr: "Selon les travaux de Tim Gabbett et Carl Foster, le ratio ACWR optimal (« Sweet Spot ») se situe entre 0,80 et 1,30. Lorsque le ratio dépasse 1,50 (hausse brutale de plus de 50 % de la charge hebdomadaire), le risque de blessure musculaire ou tendineuse double dans les 7 à 14 jours suivants."
  },
  'calculateur-asr-reserve-vitesse.html': {
    howFr: "1. Indiquez votre VMA / MAS (en km/h) obtenue lors d'un test aérobie progressif. 2. Renseignez votre Vitesse Maximale de Sprint (MSS en km/h), mesurée par exemple sur un sprint de 20 m ou 30 m lancé à vitesse maximale. 3. Cliquez sur Calculer pour obtenir votre Réserve de Vitesse Anaérobie (ASR = MSS − VMA), votre ratio de vitesse (profilage fibres lentes vs rapides) et vos vitesses cibles de +10 % à +50 % ASR.",
    howEn: "1. Enter your MAS / VMA (km/h). 2. Input your Maximal Sprint Speed (MSS in km/h) measured over a flying 20–30m sprint. 3. Click Calculate to unlock your Anaerobic Speed Reserve (ASR = MSS − MAS), speed ratio fiber profile, and 10%–50% ASR supramaximal HIIT targets.",
    howAr: "1. أدخل سرعة VMA الخاصة بك (كم/س). 2. أدخل أقصى سرعة انطلاق في السبرينت (MSS بالكم/س) مقاسة في مسافة 20 أو 30 متر مع انطلاق مسبق. 3. اضغط على زر الحساب لمعرفة احتياطي السرعة اللاهوائية (ASR) وتصنيف أليافك العضلية.",
    inputsFr: "VMA (km/h) : limite supérieure du système aérobie (100 % VO2 Max). Vitesse Max Sprint — MSS (km/h) : plafond locomoteur neuromusculaire et alactique. Réserve Anaérobie (ASR = MSS − VMA) : marge de vitesse disponible au-dessus de la VMA (modèle de Buchheit & Sandford) permettant d'individualiser les séances intermittentes supramaximales.",
    inputsEn: "MAS (km/h): aerobic ceiling. Max Sprint Speed — MSS (km/h): neuromuscular speed ceiling. Anaerobic Speed Reserve (ASR = MSS − MAS): supramaximal speed bandwidth used to equalize HIIT strain across athletes.",
    inputsAr: "سرعة VMA (كم/س): السقف الهوائي. أقصى سرعة سبرينت MSS (كم/س): السقف العصبي العضلي اللاهوائي. احتياطي السرعة (ASR = MSS − VMA): الهامش الفاصل لتخصيص شدة التمارين فوق القصوى بدقة.",
    faqQFr: "Pourquoi prescrire le fractionné court en % d'ASR plutôt qu'en % de VMA au-delà de 100 % VMA ?",
    faqAFr: "Deux coureurs ou joueurs ayant la même VMA (ex : 16 km/h) peuvent avoir une vitesse de sprint maximal très différente (27 km/h vs 34 km/h). À 115 % de VMA (18,4 km/h), le profil endurant puise à 22 % de sa réserve anaérobie tandis que le sprinteur n'utilise que 13 % de son ASR : calibrer à +25 % d'ASR garantit une fatigue physiologique équivalente."
  },
  'calculateur-indice-endurance.html': {
    howFr: "1. Saisissez votre VMA (en km/h). 2. Indiquez la distance exacte d'une course officielle ou d'un test chronométré (en mètres, ex : 3 000 m, 5 000 m, 10 000 m, 21 097 m). 3. Entrez le temps total réalisé exprimé en minutes (ex : 42,5 min pour 42 min 30 s). 4. Cliquez sur Calculer pour obtenir votre Indice d'Endurance de Péronnet & Thibault (IE), le % de VMA soutenu et votre axe prioritaire d'entraînement.",
    howEn: "1. Enter your MAS / VMA (km/h). 2. Input the race distance in meters (e.g., 5000m, 10000m). 3. Enter your finish time in decimal minutes (e.g., 42.5 for 42m30s). 4. Click Calculate to get your Péronnet & Thibault Endurance Index (EI), sustained % MAS, and training priority.",
    howAr: "1. أدخل سرعة VMA (كم/س). 2. أدخل مسافة السباق بالمتر (مثلاً 5000م أو 10000م). 3. أدخل الزمن المحقق بالدقائق (مثلاً 42.5 دقيقة). 4. اضغط على زر الحساب لمعرفة مؤشر التحمل (IE) ونسبة VMA المحافظ عليها وأولوية تدريبك.",
    inputsFr: "VMA (km/h) : vitesse soutenable pendant ~6 minutes (100 % VMA). Distance (m) & Temps réalisé (min) : permettent de calculer le pourcentage de VMA maintenu sur la durée et la pente logarithmique de baisse de vitesse (formule : IE = (%VMA − 100) / ln(Temps / 6 min)).",
    inputsEn: "MAS (km/h): 6-minute reference aerobic speed. Distance (m) & Finish Time (min): compute fractional MAS utilization and logarithmic decay slope (EI = (%MAS − 100) / ln(Time / 6 min)).",
    inputsAr: "سرعة VMA (كم/س): السرعة المرجعية لمدة 6 دقائق. المسافة (متر) والزمن (دقائق): لحساب النسبة المئوية من VMA المحافظ عليها وميل انخفاض السرعة اللوغاريتمي (نموذج بيروني وتيبو).",
    faqQFr: "Comment interpréter son Indice d'Endurance (IE) entre -4 et -12 ?",
    faqAFr: "Plus l'Indice d'Endurance est proche de -4 (ex : -5,0 à -6,0), plus votre capacité à maintenir un haut pourcentage de VMA longtemps est exceptionnelle (seuil lactique très élevé). S'il est inférieur à -8,0, votre VMA est sous-exploitée sur le long : vous devez prioriser le travail au seuil anaérobie (Tempo / Zone T) et l'endurance fondamentale."
  },
  'calculateur-gap-pente-nutrition.html': {
    howFr: "1. Indiquez le pourcentage de pente moyen de la section (+6 % pour une montée, -5 % pour une descente). 2. Entrez votre allure de référence sur le plat en secondes par kilomètre (ex : 270 s = 4:30/km). 3. Précisez la durée totale prévue de votre sortie, trail ou marathon en minutes. 4. Cliquez sur Calculer pour obtenir votre Allure Ajustée à la Pente (GAP selon Minetti) et votre plan de ravitaillement glucidique (g/h).",
    howEn: "1. Enter slope gradient percentage (+% uphill, -% downhill). 2. Input your flat-ground reference pace in seconds per km (e.g., 270 = 4:30/km). 3. Enter total workout or race duration in minutes. 4. Click Calculate to get your Minetti Grade Adjusted Pace (GAP) and hourly carbohydrate fueling plan.",
    howAr: "1. أدخل نسبة انحدار الطريق بالمئة (+% للصعود، -% للهبوط). 2. أدخل إيقاعك على الأرض المنبسطة بالثواني لكل كم (270 = 4:30/كم). 3. حدد المدة الإجمالية للسباق بالدقائق. 4. اضغط على زر الحساب لمعرفة الإيقاع المعدل للمنحدر وخطة الكربوهيدرات.",
    inputsFr: "Pente (%) : dénivelé vertical divisé par la distance horizontale (ex : +60 m sur 1 km = +6 %). Allure sur le plat (sec/km) : vitesse étalon convertie via l'équation polynomiale du coût énergétique de Minetti (2002). Durée totale (min) : détermine la cible d'oxydation exogène de glucides (30, 60 ou 90 g/h) selon les recommandations de l'ACSM et d'Asker Jeukendrup.",
    inputsEn: "Slope (%): vertical gain/loss per 100m horizontal distance. Flat Pace (sec/km): converted via Minetti's (2002) locomotion energy cost equation. Duration (min): sets exogenous carbohydrate intake (30–90 g/h).",
    inputsAr: "نسبة الانحدار (%): الارتفاع العمودي لكل 100 متر أفقي. الإيقاع المنبسط: يحول وفق معادلة مينيتي للتكلفة الطاقية في الصعود والهبوط. مدة الجهد: تحدد حاجيات الكربوهيدرات في الساعة (30 إلى 90 غ/ساعة).",
    faqQFr: "Qu'est-ce que l'Allure Ajustée à la Pente (GAP) en course sur route et en trail ?",
    faqAFr: "L'Allure Ajustée à la Pente (Grade Adjusted Pace ou GAP) calcule l'allure en montée ou en descente qui exige exactement la même dépense métabolique (VO2) que votre allure sur terrain plat. Chaque +1 % de pente en montée augmente le coût énergétique d'environ 3,3 à 3,5 %."
  },
  'hub-outils-sport-performance.html': {
    howFr: "1. Identifiez votre besoin pédagogique ou sportif parmi nos 3 pôles scientifiques : Cluster 1 (Performance Aérobie : VMA, VO2 Max VDOT, Réserve ASR, Indice d'Endurance), Cluster 2 (Physiologie & Environnement : Fréquence Cardiaque Karvonen, IMC & Masse Grasse, Chaleur/Altitude, Allure Pente GAP) et Cluster 3 (Terrain EPS & Charge : Intermittent HIIT COD 180°, Charge RPE Foster & ACWR). 2. Cliquez sur l'outil souhaité, renseignez vos mesures et cliquez sur Calculer.",
    howEn: "1. Choose the calculator matching your goal across our 3 sports science clusters: Cluster 1 (MAS, VO2 Max VDOT, ASR, Endurance Index), Cluster 2 (Karvonen HR, BMI & Body Fat, Heat/Altitude, GAP & Nutrition), and Cluster 3 (HIIT 180° COD, Foster RPE & ACWR). 2. Open the tool, enter your data, and click Calculate.",
    howAr: "1. اختر الأداة المناسبة لهدفك التربوي أو التدريبي ضمن الأقطاب العلمية الثلاثة: القطب 1 (القدرات الهوائية VMA و VO2 Max و ASR ومؤشر التحمل)، القطب 2 (نبضات القلب كارفونين، مؤشر كتلة الجسم IMC، الحرارة والارتفاع، والمنحدرات)، والقطب 3 (التدريب المتقطع HIIT وحمل التدريب RPE ACWR). 2. افتح الحاسبة وأدخل معطياتك ثم اضغط على احسب.",
    inputsFr: "Tests de terrain EPS (Luc Léger, Demi-Cooper, Vameval), chronos de course (1 500 m au Marathon), paramètres anthropométriques (Poids, Taille, Âge, Sexe), données cardio (FC Repos, FC Max), météo (Température, Humidité, Altitude) et suivi de charge (Durée × RPE).",
    inputsEn: "Field test scores (Beep test, Cooper, Vameval), race times, anthropometric measurements (Weight, Height, Age, Sex), heart rate metrics, weather/altitude inputs, and sRPE training loads.",
    inputsAr: "نتائج الاختبارات الميدانية (لوك ليجير، نصف كوبر، فاميفال)، أزمنة السباقات، القياسات الجسمية (الوزن، الطول، العمر، الجنس)، نبض القلب، بيانات الطقس والارتفاع، وحمل التدريب.",
    faqQFr: "Pourquoi utiliser les calculateurs scientifiques Prof EPS Maroc pour l'EPS et la course à pied ?",
    faqAFr: "Tous nos outils reposent sur les équations de référence internationale (Léger & Mercier, Jack Daniels VDOT, Karvonen, Tanaka, Deurenberg, Buchheit COD 180°, Péronnet & Thibault, Minetti, Foster & Gabbett) et fournissent une interprétation immédiate en Français, Anglais et Arabe conforme aux orientations pédagogiques d'EPS."
  }
};

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSeoGuideSection(config) {
  if (config.filename === 'hub-outils-sport-performance.html') {
    return '';
  }
  const g = SEO_GUIDES[config.filename];
  if (!g) return '';

  const stepsFr = g.howFr.split(/\s*(?=[1-4]\.\s)/).map((s) => s.replace(/^[1-4]\.\s*/, '').trim()).filter(Boolean);
  const stepsEn = g.howEn.split(/\s*(?=[1-4]\.\s)/).map((s) => s.replace(/^[1-4]\.\s*/, '').trim()).filter(Boolean);
  const stepsAr = g.howAr.split(/\s*(?=[1-4]\.\s)/).map((s) => s.replace(/^[1-4]\.\s*/, '').trim()).filter(Boolean);

  const stepCardsHtml = stepsFr.map((stFr, idx) => {
    const stEn = stepsEn[idx] || stFr;
    const stAr = stepsAr[idx] || stFr;
    const num = idx + 1;
    return `
          <div class="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 shadow-xs hover:border-red-200 transition-all" style="display:flex;align-items:flex-start;gap:0.85rem;padding:1rem;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
            <span class="w-7 h-7 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs" style="width:28px;height:28px;border-radius:9999px;background:linear-gradient(135deg,#c1272d,#991b1b);color:#ffffff;font-weight:800;font-size:0.78rem;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 8px rgba(193,39,45,0.28);">${num}</span>
            <p class="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed m-0" style="font-size:0.84rem;line-height:1.55;color:#334155;margin:0;" data-i18n-fr="${escapeAttr(stFr)}" data-i18n-en="${escapeAttr(stEn)}" data-i18n-ar="${escapeAttr(stAr)}">${escapeHtmlText(stFr)}</p>
          </div>`;
  }).join('');

  const partsFr = g.inputsFr.split(/\.\s+(?=[A-ZÉÀÂÎÔÛÇ0-9])/).map((s) => s.trim().replace(/\.$/, '')).filter(Boolean);
  const partsEn = g.inputsEn.split(/\.\s+(?=[A-Z0-9])/).map((s) => s.trim().replace(/\.$/, '')).filter(Boolean);
  const partsAr = g.inputsAr.split(/\.\s+/).map((s) => s.trim().replace(/\.$/, '')).filter(Boolean);

  const inputCardsHtml = partsFr.map((pFr, idx) => {
    const pEn = (partsEn[idx] || pFr) + '.';
    const pAr = (partsAr[idx] || pFr) + '.';
    const fullFr = pFr + '.';
    return `
          <div class="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80" style="display:flex;align-items:flex-start;gap:0.75rem;padding:0.9rem 1rem;border-radius:12px;background:rgba(236,253,245,0.55);border:1px solid rgba(167,243,208,0.85);">
            <span class="w-6 h-6 rounded-lg bg-emerald-700 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5" style="width:24px;height:24px;border-radius:8px;background:#006233;color:#ffffff;font-size:0.72rem;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">✓</span>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed m-0" style="font-size:0.83rem;line-height:1.55;color:#1e293b;margin:0;" data-i18n-fr="${escapeAttr(fullFr)}" data-i18n-en="${escapeAttr(pEn)}" data-i18n-ar="${escapeAttr(pAr)}">${escapeHtmlText(fullFr)}</p>
          </div>`;
  }).join('');

  const kwList = (config.keywordsFr || 'calculateur sport, vma, vo2 max, eps maroc').split(',').map((k) => k.trim()).filter(Boolean);
  const kwBadges = kwList.map((kw) => `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200" style="display:inline-flex;align-items:center;padding:0.22rem 0.65rem;border-radius:9999px;font-size:0.72rem;font-weight:600;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;">${escapeHtmlText(kw)}</span>`).join('\n            ');

  return `
    <!-- GUIDE D'UTILISATION VISUEL & EXPLICATION DES PARAMÈTRES (SEO) -->
    <section class="peps-seo-guide-card max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mt-8" style="max-width:48rem;margin:2rem auto 0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:1.75rem;box-shadow:0 10px 28px -8px rgba(15,23,42,0.06);" aria-labelledby="seo-guide-title">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.5rem;border-bottom:1px solid #f1f5f9;padding-bottom:1rem;">
        <div class="flex items-center gap-2.5" style="display:flex;align-items:center;gap:0.65rem;">
          <span class="w-9 h-9 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-center font-black text-base shrink-0" style="width:36px;height:36px;border-radius:10px;background:#fef2f2;border:1px solid #fecaca;display:inline-flex;align-items:center;justify-content:center;font-size:1rem;">📘</span>
          <div>
            <h2 id="seo-guide-title" class="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight m-0" style="font-size:1.05rem;font-weight:800;color:#0f172a;margin:0;" data-i18n-fr="Mode d'Emploi & Signification des Paramètres" data-i18n-en="How It Works & Input Parameter Guide" data-i18n-ar="طريقة الاستخدام وشرح المعطيات المطلوبة">Mode d'Emploi & Signification des Paramètres</h2>
          </div>
        </div>
        <span class="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto" style="font-size:0.74rem;font-weight:700;color:#065f46;background:#ecfdf5;border:1px solid #a7f3d0;padding:0.25rem 0.75rem;border-radius:9999px;" data-i18n-fr="Guide Scientifique & EPS" data-i18n-en="Sports Science & PE Guide" data-i18n-ar="دليل علمي وتربوي">Guide Scientifique & EPS</span>
      </div>

      <div class="space-y-2.5">
        <h3 class="text-xs font-extrabold uppercase tracking-wider text-red-700 m-0" style="font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#b91c1c;margin:0 0 0.5rem 0;" data-i18n-fr="1. Étapes d'utilisation du calculateur" data-i18n-en="1. Step-by-Step Instructions" data-i18n-ar="1. خطوات استخدام الحاسبة">1. Étapes d'utilisation du calculateur</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${stepCardsHtml}
        </div>
      </div>

      <div class="space-y-2.5 pt-2">
        <h3 class="text-xs font-extrabold uppercase tracking-wider text-emerald-800 m-0" style="font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#065f46;margin:0 0 0.5rem 0;" data-i18n-fr="2. Explication des informations demandées" data-i18n-en="2. Explanation of Requested Inputs" data-i18n-ar="2. شرح المعلومات والمعطيات المطلوبة">2. Explication des informations demandées</h3>
        <div class="grid grid-cols-1 gap-2.5">
          ${inputCardsHtml}
        </div>
      </div>

      <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5" style="padding:1rem 1.15rem;border-radius:14px;background:#fffbeb;border:1px solid #fde68a;">
        <h3 class="text-xs font-extrabold uppercase tracking-wider text-amber-900 m-0" style="font-size:0.76rem;font-weight:800;color:#78350f;margin:0 0 0.35rem 0;">💡 ${escapeHtmlText(g.faqQFr)}</h3>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed m-0" style="font-size:0.83rem;line-height:1.55;color:#334155;margin:0;">${escapeHtmlText(g.faqAFr)}</p>
      </div>

      <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5" style="padding-top:0.75rem;border-top:1px solid #f1f5f9;display:flex;flex-wrap:wrap;align-items:center;gap:0.4rem;">
        <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1" style="font-size:0.68rem;font-weight:700;text-transform:uppercase;color:#94a3b8;margin-right:0.35rem;" data-i18n-fr="Thématiques :" data-i18n-en="Topics:" data-i18n-ar="مواضيع ذات صلة:">Thématiques :</span>
        ${kwBadges}
      </div>
    </section>`;
}

const CALCULATOR_UI_STANDALONE_CSS = `<style id="profeps-calculator-ui-css">
/* Styles dédiés aux pages Calculateurs (Hero, Alignement des cases & Bouton CTA VMA) */
.vma-hero {
  margin-top: 80px !important;
  padding: 2.75rem 1.25rem 2.25rem !important;
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif !important;
  font-size: clamp(1.55rem, 3vw, 2.25rem) !important;
  font-weight: 800 !important; color: #0f172a !important; margin: 0 auto 0.65rem auto !important;
  max-width: 880px !important; line-height: 1.22 !important; letter-spacing: -0.02em !important;
}
.vma-hero p {
  font-size: 0.95rem !important; color: #475569 !important; max-width: 760px !important;
  margin: 0 auto !important; line-height: 1.6 !important;
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
button.peps-cta-btn,
#btn-calc-main {
  width: 100% !important;
  padding: 1.05rem 1.6rem !important;
  margin-top: 0.65rem !important;
  background: linear-gradient(135deg, #c1272d 0%, #991b1b 52%, #006233 100%) !important;
  background-color: #c1272d !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif !important;
  font-size: 1.02rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.01em !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 14px !important;
  cursor: pointer !important;
  box-shadow: 0 12px 28px -5px rgba(193, 39, 45, 0.48), 0 4px 12px -2px rgba(0, 98, 51, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, filter 0.2s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.75rem !important;
  position: relative !important;
  overflow: hidden !important;
  text-align: center !important;
}
button.peps-cta-btn:hover,
#btn-calc-main:hover {
  transform: translateY(-2px) scale(1.005) !important;
  box-shadow: 0 16px 34px -5px rgba(193, 39, 45, 0.58), 0 6px 16px -2px rgba(0, 98, 51, 0.34) !important;
  filter: brightness(1.07) !important;
}
button.peps-cta-btn:active,
#btn-calc-main:active {
  transform: translateY(0) scale(0.995) !important;
}
</style>`;

function upgradeCtaButtonsInHtml(bodyHtml) {
  return bodyHtml.replace(
    /<button([^>]*id="btn-calc-main"[^>]*)>([\s\S]*?)<\/button>/g,
    function(_, attrs, inner) {
      return `<button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn w-full mt-3 py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer select-none" style="width:100% !important;margin-top:0.7rem !important;padding:1.05rem 1.6rem !important;border-radius:14px !important;background:linear-gradient(135deg,#c1272d 0%,#991b1b 52%,#006233 100%) !important;background-color:#c1272d !important;color:#ffffff !important;-webkit-text-fill-color:#ffffff !important;font-weight:800 !important;font-size:1.02rem !important;letter-spacing:0.01em !important;border:1px solid rgba(255,255,255,0.26) !important;box-shadow:0 12px 28px -5px rgba(193,39,45,0.48),0 4px 12px -2px rgba(0,98,51,0.28),inset 0 1px 0 rgba(255,255,255,0.28) !important;display:flex !important;align-items:center !important;justify-content:center !important;gap:0.75rem !important;cursor:pointer !important;text-align:center !important;">${inner.trim()}<span class="peps-cta-arrow" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:rgba(255,255,255,0.2);font-size:1rem;font-weight:900;line-height:1;flex-shrink:0;margin-left:0.25rem;">→</span></button>`;
    }
  );
}

function buildPageHtml(config) {
  const g = SEO_GUIDES[config.filename] || SEO_GUIDES['hub-outils-sport-performance.html'];
  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": config.titleFr,
        "url": "https://profeps.ma/" + config.filename,
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "inLanguage": ["fr", "en", "ar"],
        "description": config.subFr,
        "keywords": config.keywordsFr,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": g.faqQFr,
            "acceptedAnswer": { "@type": "Answer", "text": g.faqAFr }
          }
        ]
      }
    ]
  });

  const upgradedBodyHtml = upgradeCtaButtonsInHtml(config.bodyHtml);

  return `<!DOCTYPE html>
<html lang="fr" dir="ltr" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtmlText(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}</title>
  <meta name="description" id="metaDesc" content="${escapeAttr(config.seoDesc || config.subFr)}" />
  <meta name="keywords" content="${escapeAttr(config.keywordsFr || 'calculateur vma, calculateur vo2 max, préparation physique, prof eps maroc')}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeAttr(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}" />
  <meta property="og:description" content="${escapeAttr(config.seoDesc || config.subFr)}" />
  <meta property="og:url" content="https://profeps.ma/${config.filename}" />
  <meta property="og:site_name" content="Prof EPS Maroc" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}" />
  <meta name="twitter:description" content="${escapeAttr(config.seoDesc || config.subFr)}" />
  <link rel="canonical" href="https://profeps.ma/${config.filename}" />
  <link rel="icon" type="image/png" href="images/prof_eps.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${schemaJson}</script>
  <script src="https://cdn.tailwindcss.com"></script>
  ${CALCULATOR_UI_STANDALONE_CSS}
  ${SHARED_MASTER_CSS}
</head>
<body class="min-h-screen flex flex-col bg-slate-50">
  ${buildNavbarHtml(config.filename)}
  <script id="profeps-master-unifier-js">
${SHARED_NAV_JS}
  </script>
  <!-- PROFEPS_UNIFIED_NAVBAR_END -->

  <header class="vma-hero" style="margin-top:80px;padding:2.75rem 1.25rem 2.25rem;text-align:center;border-bottom:1px solid #e2e8f0;background:radial-gradient(circle at 18% 20%,rgba(193,39,45,0.07) 0%,transparent 45%),radial-gradient(circle at 82% 80%,rgba(0,98,51,0.07) 0%,transparent 45%),linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);">
    <div id="ui-badge" class="hero-badge" style="display:inline-flex;align-items:center;gap:0.45rem;background:linear-gradient(135deg,rgba(193,39,45,0.1),rgba(0,98,51,0.08));color:#c1272d;padding:0.4rem 1.1rem;border-radius:9999px;font-size:0.76rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.85rem;border:1px solid rgba(193,39,45,0.22);" data-i18n-fr="⚡ ${escapeAttr(config.clusterBadgeFr)}" data-i18n-en="⚡ ${escapeAttr(config.clusterBadgeEn)}" data-i18n-ar="⚡ ${escapeAttr(config.clusterBadgeAr)}">⚡ ${escapeHtmlText(config.clusterBadgeFr)}</div>
    <h1 id="ui-title" style="font-size:clamp(1.55rem,3vw,2.25rem);font-weight:800;color:#0f172a;margin:0 auto 0.65rem auto;max-width:880px;line-height:1.22;" data-i18n-fr="${escapeAttr(config.titleFr)}" data-i18n-en="${escapeAttr(config.titleEn)}" data-i18n-ar="${escapeAttr(config.titleAr)}">${escapeHtmlText(config.titleFr)}</h1>
    <p id="ui-sub" style="font-size:0.95rem;color:#475569;max-width:760px;margin:0 auto;line-height:1.6;" data-i18n-fr="${escapeAttr(config.subFr)}" data-i18n-en="${escapeAttr(config.subEn)}" data-i18n-ar="${escapeAttr(config.subAr)}">${escapeHtmlText(config.subFr)}</p>
  </header>

  <main class="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-6">
    ${upgradedBodyHtml}
    ${buildSeoGuideSection(config)}
  </main>

  ${buildFooterHtml()}

  <script id="profeps-tool-engine-js">
    var currentLang = 'fr';
    var hasCalculated = false;

    function setToolLang(lang) {
      currentLang = lang;
      var root = document.getElementById('html-root');
      if (root) {
        root.lang = lang;
        root.dir = (lang === 'ar') ? 'rtl' : 'ltr';
      }
      document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el) {
        var val = el.getAttribute('data-i18n-' + lang);
        if (val) el.textContent = val;
      });
      if (typeof applyToolTranslations === 'function') applyToolTranslations(lang);
      if (hasCalculated && typeof computeTool === 'function') computeTool();
    }

    function triggerCalculation() {
      hasCalculated = true;
      var panel = document.getElementById('tool-results-panel');
      if (panel) {
        panel.classList.remove('hidden');
        panel.classList.remove('peps-results-reveal');
        void panel.offsetWidth;
        panel.classList.add('peps-results-reveal');
      }
      if (typeof computeTool === 'function') computeTool();
      if (panel && window.innerWidth < 768) {
        setTimeout(function() {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }

    function onInputUpdated() {
      if (hasCalculated && typeof computeTool === 'function') {
        computeTool();
      }
    }

    ${config.scriptJs}
  </script>
</body>
</html>`;
}

// ═══ DÉFINITION COMPLÈTE DES 10 PAGES D'OUTILS SPORTIFS ═══
const PAGES = [
  // 1. VO2 Max & VDOT
  {
    filename: 'calculateur-vdot-asr-endurance.html',
    seoTitle: "Calculateur VO2 Max & VDOT Course | Prof EPS",
    seoDesc: "Calculez votre VO2 Max, vos allures d’entraînement VDOT et vos chronos prédits selon votre niveau. Barème ACSM et repères EPS.",
    keywordsFr: 'calculateur vo2 max, calculer vo2max, vo2 max course à pied, estimation vo2 max ml/kg/min, tableau vo2 max age homme femme, vdot jack daniels, calculer sa vo2max avec vma',
    clusterBadgeFr: 'Cluster 1A · Consommation Maximale d’Oxygène (VO2 Max) & VDOT',
    clusterBadgeEn: 'Cluster 1A · Maximal Oxygen Uptake (VO2 Max) & Jack Daniels VDOT',
    clusterBadgeAr: 'القطب 1A · حاسبة الحد الأقصى لاستهلاك الأكسجين (VO2 Max) ومؤشر VDOT',
    titleFr: 'Calculateur de VO2 Max (ml/kg/min) & Allures VDOT Course à Pied',
    titleEn: 'VO2 Max Calculator (ml/kg/min), Fitness Norms & VDOT Running Paces',
    titleAr: 'حاسبة VO2 Max (مل/كغ/دقيقة) وإيقاعات الجري وتوقع نتائج السباقات',
    subFr: 'Entrez votre chrono de course ou votre VMA puis cliquez sur Calculer pour obtenir votre VO2 Max (ml/kg/min), votre classement ACSM par âge/sexe, vos 5 zones d’allures et vos chronos prédits.',
    subEn: 'Enter your race time or MAS and click Calculate to unlock your VO2 Max (ml/kg/min), ACSM fitness tier, 5 training zones, and race predictions.',
    subAr: 'أدخل توقيت سباقك أو سرعة VMA ثم اضغط على "احسب" لاكتشاف قيمة VO2 Max، تصنيفك الصحي، مناطق التدريب الخمس وتوقعات السباقات.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Vos Paramètres Physiologiques & Chrono" data-i18n-en="1. Your Physiological & Race Parameters" data-i18n-ar="1. معطياتك الفيزيولوجية وتوقيت السباق">1. Vos Paramètres Physiologiques & Chrono</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">ml/kg/min · VDOT</span>
      </div>

      <div>
        <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Méthode d'estimation du VO2 Max" data-i18n-en="VO2 Max Estimation Method" data-i18n-ar="طريقة حساب VO2 Max">Méthode d'estimation du VO2 Max</label>
        <select id="inp-mode" onchange="toggleVo2Mode(); onInputUpdated();" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900">
          <option value="race" selected data-i18n-fr="À partir d'un Chrono de Course (1 500 m à Marathon)" data-i18n-en="From a Recent Race Time (1500m to Marathon)" data-i18n-ar="انطلاقاً من توقيت سباق (1500م إلى الماراثون)">À partir d'un Chrono de Course (1 500 m à Marathon)</option>
          <option value="vma" data-i18n-fr="À partir de ma VMA (km/h) issue d'un test terrain (Luc Léger, Demi-Cooper)" data-i18n-en="From my MAS / VMA (km/h) field test" data-i18n-ar="انطلاقاً من سرعة VMA (كم/س) عبر اختبار ميداني">À partir de ma VMA (km/h) issue d'un test terrain (Luc Léger, Demi-Cooper)</option>
        </select>
      </div>

      <div id="box-race-inputs" class="space-y-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Distance de course de référence" data-i18n-en="Reference Race Distance" data-i18n-ar="مسافة السباق المرجعية">Distance de course de référence</label>
          <select id="inp-dist" onchange="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900">
            <option value="1500">1 500 m</option>
            <option value="3000">3 000 m</option>
            <option value="5000">5 km (5 000 m)</option>
            <option value="10000" selected>10 km (10 000 m)</option>
            <option value="21097.5" data-i18n-fr="Semi-Marathon (21,097 km)" data-i18n-en="Half-Marathon (21.097 km)" data-i18n-ar="نصف ماراثون (21.097 كم)">Semi-Marathon (21,097 km)</option>
            <option value="42195" data-i18n-fr="Marathon (42,195 km)" data-i18n-en="Marathon (42.195 km)" data-i18n-ar="ماراثون (42.195 كم)">Marathon (42,195 km)</option>
          </select>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-xs font-bold text-slate-600 block mb-1" data-i18n-fr="Heures (h)" data-i18n-en="Hours (h)" data-i18n-ar="ساعات">Heures (h)</label>
            <input id="inp-h" type="number" value="0" min="0" max="10" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-base font-mono font-bold text-center" />
          </div>
          <div>
            <label class="text-xs font-bold text-slate-600 block mb-1" data-i18n-fr="Minutes (min)" data-i18n-en="Minutes (min)" data-i18n-ar="دقائق">Minutes (min)</label>
            <input id="inp-m" type="number" value="42" min="0" max="59" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-base font-mono font-bold text-center" />
          </div>
          <div>
            <label class="text-xs font-bold text-slate-600 block mb-1" data-i18n-fr="Secondes (s)" data-i18n-en="Seconds (s)" data-i18n-ar="ثواني">Secondes (s)</label>
            <input id="inp-s" type="number" value="30" min="0" max="59" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-base font-mono font-bold text-center" />
          </div>
        </div>
      </div>

      <div id="box-vma-inputs" class="hidden space-y-3">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Votre VMA (km/h) — Relation Léger & Mercier (VO2 Max = 3,5 × VMA)" data-i18n-en="Your MAS / VMA (km/h) — Léger & Mercier equation (VO2 Max = 3.5 × MAS)" data-i18n-ar="سرعة VMA (كم/س) — معادلة ليجير ومرسييه (VO2 Max = 3.5 × VMA)">Votre VMA (km/h) — Relation Léger & Mercier (VO2 Max = 3,5 × VMA)</label>
          <input id="inp-vma-direct" type="number" value="16.0" min="7" max="26" step="0.2" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Âge (années — pour le barème ACSM)" data-i18n-en="Age (years — for ACSM percentile)" data-i18n-ar="العمر (بالسنوات — لتصنيف ACSM)">Âge (années — pour le barème ACSM)</label>
          <input id="inp-age" type="number" value="28" min="12" max="85" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Sexe biologique (normes VO2 Max)" data-i18n-en="Biological Sex (VO2 Max norms)" data-i18n-ar="الجنس (لمعايير VO2 Max)">Sexe biologique (normes VO2 Max)</label>
          <select id="inp-sex" onchange="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900">
            <option value="M" selected data-i18n-fr="Homme" data-i18n-en="Male" data-i18n-ar="ذكر">Homme</option>
            <option value="F" data-i18n-fr="Femme" data-i18n-en="Female" data-i18n-ar="أنثى">Femme</option>
          </select>
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>⚡</span>
        <span data-i18n-fr="Calculer mon VO2 Max, mes Allures & Interprétations" data-i18n-en="Calculate My VO2 Max, Paces & Interpretations" data-i18n-ar="احسب قيمة VO2 Max وإيقاعات التدريب والتفسير العلمي">Calculer mon VO2 Max, mes Allures & Interprétations</span>
      </button>
    </div>

    <!-- PANNEAU DE RÉSULTATS MASQUÉ AVANT LE CLIC SUR CALCULER -->
    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="2. Vos Résultats Chiffrés & Interprétation par Indicateur" data-i18n-en="2. Your Calculated Metrics & Per-Indicator Interpretation" data-i18n-ar="2. نتائجك الرقمية وتفسير كل مؤشر">2. Vos Résultats Chiffrés & Interprétation par Indicateur</h3>
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200" data-i18n-fr="✓ Calcul validé" data-i18n-en="✓ Calculation complete" data-i18n-ar="✓ تم الحساب بنجاح">✓ Calcul validé</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="VO2 Max Estimé" data-i18n-en="Estimated VO2 Max" data-i18n-ar="الحد الأقصى لاستهلاك الأكسجين">VO2 Max Estimé</div>
            <div id="out-vo2max" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div class="text-[11px] font-bold text-red-800">ml / kg / min</div>
            <div id="out-vo2-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 mt-1 border border-red-100"></div>
          </div>

          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="VMA Équivalente" data-i18n-en="Equivalent MAS (VMA)" data-i18n-ar="السرعة الهوائية القصوى المكافئة">VMA Équivalente</div>
            <div id="out-vma-eq" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-norm-badge" class="text-xs font-extrabold text-emerald-900">--</div>
            <div id="out-vma-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 mt-1 border border-emerald-100"></div>
          </div>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Score VDOT (Jack Daniels)" data-i18n-en="VDOT Score (Jack Daniels)" data-i18n-ar="مؤشر الكفاءة VDOT">Score VDOT (Jack Daniels)</div>
            <div id="out-vdot" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div class="text-[11px] font-bold text-blue-800" data-i18n-fr="Puissance & Économie" data-i18n-en="Power & Running Economy" data-i18n-ar="القوة واقتصاد الجري">Puissance & Économie</div>
            <div id="out-vdot-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 mt-1 border border-blue-100"></div>
          </div>
        </div>

        <div id="out-vo2-interp" class="p-5 bg-slate-50 border-l-4 border-red-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>

        <div>
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3" data-i18n-fr="Les 5 Zones d'Allures d'Entraînement (Modèle VDOT Daniels)" data-i18n-en="Your 5 VDOT Training Pace Zones (Daniels)" data-i18n-ar="مناطق إيقاعات التدريب الخمسة حسب مؤشر VDOT">Les 5 Zones d'Allures d'Entraînement (Modèle VDOT Daniels)</h3>
          <div id="out-zones-list" class="space-y-2.5"></div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
        <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-800" data-i18n-fr="Potentiel Chronométrique Équivalent (1 500 m au Marathon)" data-i18n-en="Equivalent Race Time Potential (1500m to Marathon)" data-i18n-ar="الأزمنة المتوقعة والمكافئة في السباقات (من 1500م إلى الماراثون)">Potentiel Chronométrique Équivalent (1 500 m au Marathon)</h3>
        <div id="out-pred-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-3"></div>
      </div>
    </div>`,
    scriptJs: `function toggleVo2Mode() {
      var mode = document.getElementById('inp-mode').value;
      document.getElementById('box-race-inputs').className = (mode === 'race') ? 'space-y-4' : 'hidden';
      document.getElementById('box-vma-inputs').className = (mode === 'vma') ? 'space-y-3' : 'hidden';
    }
    function fmtPace(secPerKm) {
      var s = Math.max(120, Math.round(secPerKm));
      var m = Math.floor(s / 60);
      var r = String(s % 60).padStart(2, '0');
      return m + ':' + r + ' /km';
    }
    function fmtRaceTime(totalSec) {
      var s = Math.round(totalSec);
      var h = Math.floor(s / 3600);
      var m = Math.floor((s % 3600) / 60);
      var sec = String(s % 60).padStart(2, '0');
      return h > 0 ? h + 'h ' + String(m).padStart(2, '0') + 'm ' + sec + 's' : m + 'm ' + sec + 's';
    }
    function computeTool() {
      var mode = document.getElementById('inp-mode').value;
      var age = parseFloat(document.getElementById('inp-age').value) || 28;
      var sex = document.getElementById('inp-sex').value || 'M';
      var vo2max = 56.0;
      var vmaEq = 16.0;

      if (mode === 'race') {
        var dist = parseFloat(document.getElementById('inp-dist').value) || 10000;
        var h = parseFloat(document.getElementById('inp-h').value) || 0;
        var m = parseFloat(document.getElementById('inp-m').value) || 0;
        var s = parseFloat(document.getElementById('inp-s').value) || 0;
        var tMin = Math.max(3, h * 60 + m + s / 60);
        var v = dist / tMin;
        var vo2Cost = -4.60 + 0.182258 * v + 0.000104 * v * v;
        var pctVo2 = 0.8 + 0.1894393 * Math.exp(-0.012778 * tMin) + 0.2989558 * Math.exp(-0.1932605 * tMin);
        vo2max = Math.max(22, Math.min(92, vo2Cost / pctVo2));
        vmaEq = vo2max / 3.5;
      } else {
        vmaEq = Math.max(7, Math.min(26, parseFloat(document.getElementById('inp-vma-direct').value) || 16));
        vo2max = vmaEq * 3.5;
      }

      var baseRef = (sex === 'M' ? 50 : 42) - Math.max(0, age - 25) * 0.35;
      var normFr = 'Bon / Actif', normEn = 'Good / Active', normAr = 'مستوى جيد ونشط';
      var vmaTierFr = 'Coureur régulier', vmaTierEn = 'Regular runner', vmaTierAr = 'عداء منتظم';
      if (vo2max >= baseRef + 12) {
        normFr = 'Athlète Élite (Top 5% ACSM)'; normEn = 'Superior / Elite (Top 5% ACSM)'; normAr = 'مستوى نخبة ممتاز (أعلى 5%)';
        vmaTierFr = 'Haut niveau régional/national'; vmaTierEn = 'Competitive athlete'; vmaTierAr = 'مستوى تنافسي عالٍ';
      } else if (vo2max >= baseRef + 5) {
        normFr = 'Excellent (Top 15% ACSM)'; normEn = 'Excellent (Top 15% ACSM)'; normAr = 'ممتاز (أعلى 15%)';
        vmaTierFr = 'Coureur entraîné performant'; vmaTierEn = 'Well-trained runner'; vmaTierAr = 'عداء متمرس';
      } else if (vo2max < baseRef - 3) {
        normFr = 'En développement aérobie'; normEn = 'Developing Aerobic Base'; normAr = 'قاعدة هوائية قيد التطوير';
        vmaTierFr = 'Marge de progression élevée'; vmaTierEn = 'High improvement margin'; vmaTierAr = 'هامش تطور كبير';
      }

      document.getElementById('out-vo2max').textContent = vo2max.toFixed(1);
      document.getElementById('out-vdot').textContent = vo2max.toFixed(1);
      document.getElementById('out-vma-eq').textContent = vmaEq.toFixed(1) + ' km/h';
      document.getElementById('out-norm-badge').textContent = currentLang === 'fr' ? normFr : currentLang === 'en' ? normEn : normAr;

      var vmaSecPerKm = 3600 / vmaEq;
      if (currentLang === 'fr') {
        document.getElementById('out-vo2-meaning').textContent = 'Plafond d’oxygène : ' + normFr;
        document.getElementById('out-vma-meaning').textContent = 'Allure 100% VMA : ' + fmtPace(vmaSecPerKm) + ' (' + vmaTierFr + ')';
        document.getElementById('out-vdot-meaning').textContent = 'Indice combinant VO2 Max et économie de foulée';
      } else if (currentLang === 'en') {
        document.getElementById('out-vo2-meaning').textContent = 'Oxygen ceiling: ' + normEn;
        document.getElementById('out-vma-meaning').textContent = '100% MAS Pace: ' + fmtPace(vmaSecPerKm) + ' (' + vmaTierEn + ')';
        document.getElementById('out-vdot-meaning').textContent = 'Combines VO2 Max & running economy';
      } else {
        document.getElementById('out-vo2-meaning').textContent = 'سقف الأكسجين: ' + normAr;
        document.getElementById('out-vma-meaning').textContent = 'إيقاع 100% VMA: ' + fmtPace(vmaSecPerKm) + ' (' + vmaTierAr + ')';
        document.getElementById('out-vdot-meaning').textContent = 'يجمع بين استهلاك الأكسجين واقتصاد الجري';
      }

      var zones = [
        { code: 'Zone E · Endurance Fondamentale (65–74% VO2 Max)', descFr: 'Développement mitochondrial & capillaire (75–80% du volume hebdo)', en: 'Zone E · Easy Aerobic (65–74% VO2 Max)', descEn: 'Mitochondrial & capillary base (75–80% of weekly volume)', ar: 'منطقة E · التحمل الأساسي (65–74% VO2 Max)', descAr: 'بناء القاعدة الهوائية والشعيرات الدموية (80% من حجم التدريب)', f1: 1.36, f2: 1.24, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
        { code: 'Zone M · Allure Spécifique Marathon (78–83% VO2 Max)', descFr: 'Économie énergétique & oxydation mixte lipides/glucides', en: 'Zone M · Marathon Pace (78–83% VO2 Max)', descEn: 'Aerobic running economy & glycogen sparing', ar: 'منطقة M · إيقاع الماراثون (78–83% VO2 Max)', descAr: 'تحسين الاقتصاد الطاقي على المسافات الطويلة', f1: 1.19, f2: 1.15, color: 'text-blue-700 bg-blue-50 border-blue-200' },
        { code: 'Zone T · Seuil Anaérobie Lactique / Tempo (86–88% VO2 Max)', descFr: 'Repousse l’accumulation des lactates (allure tenable ~45-60 min)', en: 'Zone T · Lactate Threshold (86–88% VO2 Max)', descEn: 'Raises lactate clearance ceiling (~45-60 min effort)', ar: 'منطقة T · العتبة اللاهوائية (86–88% VO2 Max)', descAr: 'رفع عتبة تراكم اللاكتات في العضلات', f1: 1.12, f2: 1.09, color: 'text-amber-800 bg-amber-50 border-amber-200' },
        { code: 'Zone I · Intervalle VO2 Max / PMA (97–100% VO2 Max)', descFr: 'Sollicitation maximale du débit cardiaque (fractions de 2 à 5 min)', en: 'Zone I · VO2 Max Intervals (97–100% VO2 Max)', descEn: 'Maximal stroke volume & VO2 stimulus (2–5 min reps)', ar: 'منطقة I · تطوير VO2 Max القصوى (97–100%)', descAr: 'تحفيز أقصى ضخ للقلب واستهلاك للأكسجين', f1: 1.02, f2: 0.99, color: 'text-red-700 bg-red-50 border-red-200' },
        { code: 'Zone R · Répétitions / Économie Neuromusculaire (105–110%)', descFr: 'Vitesse gestuelle et raideur élastique avec récupération complète', en: 'Zone R · Economy Repetitions (105–110% VO2 Max)', descEn: 'Neuromuscular speed & stride mechanics with full recovery', ar: 'منطقة R · السرعة والاقتصاد العصبي العضلي (105–110%)', descAr: 'تحسين كفاءة الخطوة والسرعة مع راحة كاملة', f1: 0.95, f2: 0.91, color: 'text-purple-800 bg-purple-50 border-purple-200' }
      ];
      document.getElementById('out-zones-list').innerHTML = zones.map(function(z) {
        var label = currentLang === 'fr' ? z.code : currentLang === 'en' ? z.en : z.ar;
        var sub = currentLang === 'fr' ? z.descFr : currentLang === 'en' ? z.descEn : z.descAr;
        return '<div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><div class="text-xs font-extrabold text-slate-900">' + label + '</div><div class="text-[11px] text-slate-600">' + sub + '</div></div><span dir="ltr" class="font-mono text-xs font-black px-3 py-1.5 rounded-lg border shrink-0 ' + z.color + '">' + fmtPace(vmaSecPerKm * z.f2) + ' – ' + fmtPace(vmaSecPerKm * z.f1) + '</span></div>';
      }).join('');

      var preds = [
        { d: '1 500 m', dist: 1500, pct: 1.01, noteFr: '101% VMA', noteEn: '101% MAS', noteAr: '101% VMA' },
        { d: '3 000 m', dist: 3000, pct: 0.96, noteFr: '96% VMA', noteEn: '96% MAS', noteAr: '96% VMA' },
        { d: '5 km', dist: 5000, pct: 0.925, noteFr: '92,5% VMA', noteEn: '92.5% MAS', noteAr: '92.5% VMA' },
        { d: '10 km', dist: 10000, pct: 0.885, noteFr: '88,5% VMA', noteEn: '88.5% MAS', noteAr: '88.5% VMA' },
        { d: 'Semi-Marathon', dist: 21097.5, pct: 0.835, noteFr: '83,5% VMA', noteEn: '83.5% MAS', noteAr: '83.5% VMA' },
        { d: 'Marathon', dist: 42195, pct: 0.785, noteFr: '78,5% VMA', noteEn: '78.5% MAS', noteAr: '78.5% VMA' }
      ];
      document.getElementById('out-pred-grid').innerHTML = preds.map(function(p) {
        var spdKmh = vmaEq * p.pct;
        var sec = (p.dist / 1000) * (3600 / spdKmh);
        var n = currentLang === 'fr' ? p.noteFr : currentLang === 'en' ? p.noteEn : p.noteAr;
        return '<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5"><div class="text-xs font-extrabold text-slate-700">' + p.d + '</div><div dir="ltr" class="text-base font-black font-mono text-slate-900">' + fmtRaceTime(sec) + '</div><div dir="ltr" class="text-xs font-mono text-red-700 font-bold">' + fmtPace(3600 / spdKmh) + '</div><div class="text-[10px] font-semibold text-slate-500">' + n + '</div></div>';
      }).join('');

      var interp = document.getElementById('out-vo2-interp');
      if (currentLang === 'fr') {
        interp.innerHTML = '<p><strong>📊 Bilan Physiologique :</strong> Votre consommation maximale d’oxygène est évaluée à <strong>' + vo2max.toFixed(1) + ' ml/kg/min</strong>, ce qui correspond à une VMA fonctionnelle de <strong>' + vmaEq.toFixed(1) + ' km/h</strong> et vous situe dans la catégorie <strong>« ' + normFr + ' »</strong> selon les normes ACSM pour votre âge (' + age + ' ans).</p><p><strong>🏃‍♂️ Recommandation Entraînement & EPS :</strong> Pour faire progresser ce plafond aérobie, respectez la polarisation 80/20 : 80 % de votre volume en <strong>Zone E (' + fmtPace(vmaSecPerKm * 1.24) + ' à ' + fmtPace(vmaSecPerKm * 1.36) + ')</strong> et 1 séance clé hebdomadaire en <strong>Zone I (' + fmtPace(vmaSecPerKm * 0.99) + ' à ' + fmtPace(vmaSecPerKm * 1.02) + ')</strong> sous forme de 5 × 1 000 m (récup 2 min) ou 12 × 300 m (récup 45 s).</p>';
      } else if (currentLang === 'en') {
        interp.innerHTML = '<p><strong>📊 Physiological Assessment:</strong> Your maximal oxygen uptake is <strong>' + vo2max.toFixed(1) + ' ml/kg/min</strong>, matching an equivalent MAS of <strong>' + vmaEq.toFixed(1) + ' km/h</strong> and placing you in the <strong>"' + normEn + '"</strong> ACSM category for age ' + age + '.</p><p><strong>🏃‍♂️ Coaching & PE Prescription:</strong> Follow an 80/20 polarized distribution: 80% of weekly mileage in <strong>Zone E (' + fmtPace(vmaSecPerKm * 1.24) + '–' + fmtPace(vmaSecPerKm * 1.36) + ')</strong> and 1 weekly interval session in <strong>Zone I (' + fmtPace(vmaSecPerKm * 0.99) + '–' + fmtPace(vmaSecPerKm * 1.02) + ')</strong> such as 5 × 1000m (2 min rest).</p>';
      } else {
        interp.innerHTML = '<p><strong>📊 التقييم الفيزيولوجي الشامل:</strong> يبلغ الحد الأقصى لاستهلاك الأكسجين لديك <strong>' + vo2max.toFixed(1) + ' مل/كغ/دقيقة</strong>، أي ما يعادل سرعة هوائية قصوى (VMA) قدرها <strong>' + vmaEq.toFixed(1) + ' كم/س</strong>، مما يضعك في فئة <strong>« ' + normAr + ' »</strong> حسب معايير ACSM لعمر ' + age + ' سنة.</p><p><strong>🏃‍♂️ نصيحة التدريب والتربية البدنية:</strong> لتطوير هذا السقف الهوائي، اعتمد قاعدة 80/20: 80% من الجري في <strong>المنطقة E (' + fmtPace(vmaSecPerKm * 1.24) + ' إلى ' + fmtPace(vmaSecPerKm * 1.36) + ')</strong> مع حصة أسبوعية في <strong>المنطقة I (' + fmtPace(vmaSecPerKm * 0.99) + ' إلى ' + fmtPace(vmaSecPerKm * 1.02) + ')</strong> مثل 5 × 1000م.</p>';
      }
    }`,
  },

  // 2. Fréquence Cardiaque Karvonen
  {
    filename: 'calculateur-frequence-cardiaque-karvonen.html',
    seoTitle: "Calculateur Fréquence Cardiaque Karvonen | Prof EPS",
    seoDesc: "Déterminez votre FC Max, FC de réserve et vos 5 zones cibles d’entraînement avec la méthode Karvonen. Repères pour l’EPS.",
    keywordsFr: 'calculateur fréquence cardiaque karvonen, zone cardiaque course à pied, fc max tanaka, fréquence cardiaque de réserve, zones entrainement cardiaque eps',
    clusterBadgeFr: 'Cluster 2A · Cardiologie Sportive & Méthode de Karvonen',
    clusterBadgeEn: 'Cluster 2A · Sports Cardiology & Karvonen HR Reserve',
    clusterBadgeAr: 'القطب 2A · نبضات القلب للرياضيين وطريقة كارفونين (Karvonen)',
    titleFr: 'Calculateur de Fréquence Cardiaque, Zones Karvonen & Interprétation',
    titleEn: 'Heart Rate Zones Calculator (Karvonen) & Physiological Interpretation',
    titleAr: 'حاسبة نبضات القلب (Karvonen) والتفسير الفيزيولوجي للنطاقات التدريبية',
    subFr: 'Saisissez votre âge et votre fréquence cardiaque de repos puis cliquez sur Calculer pour obtenir votre FC Max (Tanaka), votre Réserve Cardiaque (HRR) et vos 5 zones Z1 à Z5 expliquées.',
    subEn: 'Enter your age and resting heart rate, then click Calculate to get your Tanaka Max HR, Heart Rate Reserve (HRR), and 5 explained training zones.',
    subAr: 'أدخل عمرك ونبض الراحة ثم اضغط على "احسب" لمعرفة أقصى نبض للقلب، احتياطي النبض (HRR) ومناطق التدريب الخمس بالتفصيل.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Vos Paramètres Cardiaques" data-i18n-en="1. Your Heart Rate Parameters" data-i18n-ar="1. معطيات نبضات القلب">1. Vos Paramètres Cardiaques</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">Karvonen · BPM</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Âge (années)" data-i18n-en="Age (years)" data-i18n-ar="العمر (بالسنوات)">Âge (années)</label>
          <input id="inp-age" type="number" value="28" min="10" max="90" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="FC de Repos au réveil (bpm)" data-i18n-en="Morning Resting HR (bpm)" data-i18n-ar="نبض القلب في الراحة صباحاً (bpm)">FC de Repos au réveil (bpm)</label>
          <input id="inp-rest" type="number" value="54" min="32" max="110" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="FC Max Réelle (optionnel, bpm)" data-i18n-en="Measured Max HR (optional, bpm)" data-i18n-ar="أقصى نبض مقاس ميدانياً (اختياري)">FC Max Réelle (optionnel, bpm)</label>
          <input id="inp-fcmax-custom" type="number" placeholder="Auto (Tanaka)" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>❤️</span>
        <span data-i18n-fr="Calculer mes Zones Cardiaques Karvonen & mon Diagnostic" data-i18n-en="Calculate My Karvonen Heart Rate Zones & Diagnosis" data-i18n-ar="احسب مناطق نبضات القلب (Karvonen) والتشخيص الفيزيولوجي">Calculer mes Zones Cardiaques Karvonen & mon Diagnostic</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Indicateurs Cardiaques & Interprétation Individuelle" data-i18n-en="2. Your Cardiac Metrics & Individual Interpretation" data-i18n-ar="2. مؤشرات القلب وتفسير كل رقم">2. Vos Indicateurs Cardiaques & Interprétation Individuelle</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="FC Maximale (Plafond)" data-i18n-en="Max Heart Rate (Ceiling)" data-i18n-ar="أقصى نبض للقلب (FC Max)">FC Maximale (Plafond)</div>
            <div id="out-fcmax" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-fcmax-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="FC de Réserve (Karvonen)" data-i18n-en="Heart Rate Reserve (HRR)" data-i18n-ar="احتياطي نبض القلب (HRR)">FC de Réserve (Karvonen)</div>
            <div id="out-hrr" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-hrr-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="FC de Repos & Tonus Vagal" data-i18n-en="Resting HR & Vagal Tone" data-i18n-ar="نبض الراحة والكفاءة القلبية">FC de Repos & Tonus Vagal</div>
            <div id="out-rest-val" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-rest-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
        </div>

        <div id="out-rest-diag" class="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>

        <div>
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3" data-i18n-fr="Vos 5 Zones d'Entraînement Cardiaque (Formule Karvonen : FCR × % + FC Repos)" data-i18n-en="Your 5 Karvonen Heart Rate Zones (HRR × % + Resting HR)" data-i18n-ar="مناطق التدريب الخمس حسب طريقة كارفونين (HRR × % + نبض الراحة)">Vos 5 Zones d'Entraînement Cardiaque (Formule Karvonen : FCR × % + FC Repos)</h4>
          <div id="zones-container" class="space-y-2.5"></div>
        </div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var age = parseFloat(document.getElementById('inp-age').value) || 28;
      var rest = parseFloat(document.getElementById('inp-rest').value) || 54;
      var customMax = parseFloat(document.getElementById('inp-fcmax-custom').value);
      var fcMax = (customMax && customMax > 120) ? Math.round(customMax) : Math.round(208 - 0.7 * age);
      var hrr = Math.max(40, fcMax - rest);

      document.getElementById('out-fcmax').textContent = fcMax + ' bpm';
      document.getElementById('out-hrr').textContent = hrr + ' bpm';
      document.getElementById('out-rest-val').textContent = rest + ' bpm';

      var restBadgeFr = rest < 52 ? 'Bradycardie sportive (Athlète endurant)' : rest <= 65 ? 'Tonus vagal actif & sain' : 'Marge d’amélioration aérobie';
      var restBadgeEn = rest < 52 ? 'Athletic bradycardia (Endurance trained)' : rest <= 65 ? 'Healthy active vagal tone' : 'Room for aerobic conditioning';
      var restBadgeAr = rest < 52 ? 'نبض رياضي منخفض ممتاز (تحمل عالٍ)' : rest <= 65 ? 'نبض راحة صحي ونشط' : 'قابل للتحسن عبر تمارين التحمل';

      if (currentLang === 'fr') {
        document.getElementById('out-fcmax-meaning').textContent = customMax ? 'Valeur mesurée sur le terrain' : 'Formule scientifique Tanaka (208 − 0,7 × âge)';
        document.getElementById('out-hrr-meaning').textContent = 'Amplitude cardiaque utile (FC Max − FC Repos)';
        document.getElementById('out-rest-meaning').textContent = restBadgeFr;
      } else if (currentLang === 'en') {
        document.getElementById('out-fcmax-meaning').textContent = customMax ? 'Field-measured value' : 'Tanaka equation (208 − 0.7 × age)';
        document.getElementById('out-hrr-meaning').textContent = 'Usable cardiac range (Max HR − Rest HR)';
        document.getElementById('out-rest-meaning').textContent = restBadgeEn;
      } else {
        document.getElementById('out-fcmax-meaning').textContent = customMax ? 'قيمة مقاسة ميدانياً' : 'معادلة تاناكا الدقيقة (208 − 0.7 × العمر)';
        document.getElementById('out-hrr-meaning').textContent = 'المدى القلبي المتاح للمجهود (الأقصى − الراحة)';
        document.getElementById('out-rest-meaning').textContent = restBadgeAr;
      }

      var diag = document.getElementById('out-rest-diag');
      var z2Min = Math.round(rest + hrr * 0.60), z2Max = Math.round(rest + hrr * 0.70);
      var z4Min = Math.round(rest + hrr * 0.80), z4Max = Math.round(rest + hrr * 0.90);
      if (currentLang === 'fr') {
        diag.innerHTML = '<p><strong>📊 Pourquoi la méthode de Karvonen est supérieure au % FC Max classique :</strong> En intégrant votre réserve cardiaque (<strong>' + hrr + ' bpm</strong>), Karvonen aligne vos zones sur votre véritable consommation d’oxygène (% VO2 Max).</p><p><strong>🏃‍♂️ Conseils EPS & Entraînement :</strong> Effectuez vos footings de récupération et d’endurance fondamentale entre <strong>' + z2Min + ' et ' + z2Max + ' bpm (Zone 2)</strong> pour stimuler le volume d’éjection systolique sans fatigue nerveuse, et ciblez <strong>' + z4Min + ' à ' + z4Max + ' bpm (Zone 4)</strong> lors de vos blocs au seuil anaérobie.</p>';
      } else if (currentLang === 'en') {
        diag.innerHTML = '<p><strong>📊 Why Karvonen HR Reserve beats simple % Max HR:</strong> By factoring in your <strong>' + hrr + ' bpm</strong> Heart Rate Reserve, Karvonen zones match your actual % VO2 Reserve.</p><p><strong>🏃‍♂️ Coaching & PE Advice:</strong> Keep base aerobic runs inside <strong>' + z2Min + '–' + z2Max + ' bpm (Zone 2)</strong> to maximize stroke volume, and target <strong>' + z4Min + '–' + z4Max + ' bpm (Zone 4)</strong> for threshold intervals.</p>';
      } else {
        diag.innerHTML = '<p><strong>📊 لماذا تعتبر طريقة كارفونين أدق علمياً؟</strong> لأنها تعتمد على احتياطي النبض (<strong>' + hrr + ' نبضة/دقيقة</strong>) مما يطابق نسبة استهلاك الأكسجين الفعلية.</p><p><strong>🏃‍♂️ نصيحة التدريب والتربية البدنية:</strong> حافظ على الجري الأساسي بين <strong>' + z2Min + ' و ' + z2Max + ' نبضة/دقيقة (المنطقة 2)</strong>، واستهدف <strong>' + z4Min + ' إلى ' + z4Max + ' نبضة/دقيقة (المنطقة 4)</strong> لتطوير العتبة اللاهوائية.</p>';
      }

      var zones = [
        { z: 'Z1 (50–60% FCR)', min: 0.5, max: 0.6, fr: 'Récupération Active & Échauffement', subFr: 'Élimination des déchets métaboliques, footing très souple', en: 'Active Recovery & Warm-Up', subEn: 'Metabolic recovery & blood flow', ar: 'الاستشفاء النشط والإحماء', subAr: 'إزالة الفضلات الاستقلابية واسترجاع الطراوة', cls: 'bg-slate-100 text-slate-800 border-slate-300' },
        { z: 'Z2 (60–70% FCR)', min: 0.6, max: 0.7, fr: 'Endurance Fondamentale & Lipolyse (SV1)', subFr: 'Oxydation maximale des graisses, base aérobie (conversations aisées)', en: 'Aerobic Base & Fat Oxidation (VT1)', subEn: 'Mitochondrial density & fat metabolism', ar: 'التحمل الأساسي وأكسدة الدهون (SV1)', subAr: 'تطوير القاعدة الهوائية وحرق الدهون', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        { z: 'Z3 (70–80% FCR)', min: 0.7, max: 0.8, fr: 'Endurance Active / Allure Tempo & Marathon', subFr: 'Développement du glycogène musculaire et efficacité cardiaque', en: 'Tempo / Aerobic Power & Marathon Pace', subEn: 'Sustained aerobic pace & glycogen efficiency', ar: 'التحمل النشط / إيقاع الماراثون (Tempo)', subAr: 'تحمل السرعة المتوسطة وكفاءة عضلة القلب', cls: 'bg-blue-50 text-blue-800 border-blue-200' },
        { z: 'Z4 (80–90% FCR)', min: 0.8, max: 0.9, fr: 'Seuil Anaérobie Lactique (SV2 / Allure 10 km)', subFr: 'Élévation du seuil de tolérance aux ions H+ et au lactate', en: 'Lactate Threshold (VT2 / 10K Pace)', subEn: 'Raises anaerobic threshold & lactate clearance', ar: 'العتبة اللاهوائية (SV2 / إيقاع 10 كم)', subAr: 'رفع قدرة العضلات على تحمل وتصريف اللاكتات', cls: 'bg-amber-50 text-amber-900 border-amber-200' },
        { z: 'Z5 (90–100% FCR)', min: 0.9, max: 1.0, fr: 'Puissance Aérobie Maximale (VO2 Max / VMA)', subFr: 'Effort maximal par intervalles courts (30"/30" à 3 min)', en: 'Maximal Aerobic Power (VO2 Max / MAS)', subEn: 'High-intensity intervals (30s to 3 min)', ar: 'القوة الهوائية القصوى (VO2 Max / VMA)', subAr: 'تمارين متقطعة عالية الشدة لتطوير السقف الهوائي', cls: 'bg-red-50 text-red-800 border-red-200' }
      ];
      document.getElementById('zones-container').innerHTML = zones.map(function(item) {
        var zMin = Math.round(rest + hrr * item.min);
        var zMax = Math.round(rest + hrr * item.max);
        var label = currentLang === 'fr' ? item.fr : currentLang === 'en' ? item.en : item.ar;
        var sub = currentLang === 'fr' ? item.subFr : currentLang === 'en' ? item.subEn : item.subAr;
        return '<div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><div class="text-xs font-extrabold text-slate-900">' + item.z + ' · ' + label + '</div><div class="text-[11px] text-slate-600">' + sub + '</div></div><strong dir="ltr" class="font-mono text-sm font-black px-3 py-1.5 rounded-lg border shrink-0 ' + item.cls + '">' + zMin + ' – ' + zMax + ' bpm</strong></div>';
      }).join('');
    }`,
  },

  // 3. IMC Sportif & Masse Grasse
  {
    filename: 'calculateur-imc-sportif-masse-grasse.html',
    seoTitle: "Calculateur IMC Sportif & Masse Grasse | Prof EPS",
    seoDesc: "Estimez votre IMC, taux de masse grasse et masse maigre active. Interprétation athlétique et repères officiels pour l’EPS.",
    keywordsFr: 'calculateur imc, calcul imc homme femme, barème imc normal anormal oms, indice masse corporelle, indice masse grasse img, poids idéal selon taille, imc sportif masse maigre',
    clusterBadgeFr: 'Cluster 2B · Indice de Masse Corporelle (IMC), Barème OMS & Masse Grasse (IMG)',
    clusterBadgeEn: 'Cluster 2B · Body Mass Index (BMI), WHO Reference Scale & Body Fat %',
    clusterBadgeAr: 'القطب 2B · مؤشر كتلة الجسم (IMC)، سلم المعايير ونسبة الدهون (IMG)',
    titleFr: 'Calculateur d’IMC, Barème de Référence (Normal / Anormal) & Masse Grasse',
    titleEn: 'BMI Calculator, Official WHO Reference Scale (Normal vs Abnormal) & Body Fat %',
    titleAr: 'حاسبة مؤشر كتلة الجسم (IMC) وجدول المعايير الصحية (طبيعي / غير طبيعي) ونسبة الدهون',
    subFr: 'Renseignez votre poids, votre taille, votre âge et votre sexe puis cliquez sur Calculer pour obtenir votre IMC, votre taux de masse grasse (IMG) et votre position exacte sur le barème officiel (ce qui est normal et ce qui est anormal).',
    subEn: 'Enter your weight, height, age, and sex, then click Calculate to get your BMI, body fat % (IMG), and your exact position on the official normal vs abnormal reference scale.',
    subAr: 'أدخل الوزن والطول والعمر والجنس ثم اضغط على "احسب" لمعرفة مؤشر كتلة الجسم ونسبة الدهون وموقعك الدقيق في سلم المعايير (الطبيعي وغير الطبيعي).',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Vos Mensurations Corporelles" data-i18n-en="1. Your Body Measurements" data-i18n-ar="1. قياساتك الجسمية">1. Vos Mensurations Corporelles</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">IMC · IMG · Barème OMS</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Poids corporel (kg)" data-i18n-en="Body Weight (kg)" data-i18n-ar="الوزن (كغ)">Poids corporel (kg)</label>
          <input id="inp-w" type="number" value="68" min="30" max="200" step="0.5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Taille (cm)" data-i18n-en="Height (cm)" data-i18n-ar="الطول (سم)">Taille (cm)</label>
          <input id="inp-h" type="number" value="175" min="120" max="230" step="1" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Âge (années)" data-i18n-en="Age (years)" data-i18n-ar="العمر (سنوات)">Âge (années)</label>
          <input id="inp-age" type="number" value="28" min="12" max="90" step="1" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Sexe biologique" data-i18n-en="Biological Sex" data-i18n-ar="الجنس">Sexe biologique</label>
          <select id="inp-sex" onchange="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold">
            <option value="1" selected data-i18n-fr="Homme" data-i18n-en="Male" data-i18n-ar="ذكر">Homme</option>
            <option value="0" data-i18n-fr="Femme" data-i18n-en="Female" data-i18n-ar="أنثى">Femme</option>
          </select>
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>⚖️</span>
        <span data-i18n-fr="Calculer mon IMC, ma Masse Grasse & Voir le Barème de Référence" data-i18n-en="Calculate My BMI, Body Fat % & View Reference Scale" data-i18n-ar="احسب مؤشر كتلة الجسم ونسبة الدهون واعرض جدول المعايير">Calculer mon IMC, ma Masse Grasse & Voir le Barème de Référence</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="2. Vos Résultats Anthropométriques & Diagnostic" data-i18n-en="2. Your Anthropometric Results & Diagnosis" data-i18n-ar="2. نتائج القياسات الجسمية والتشخيص">2. Vos Résultats Anthropométriques & Diagnostic</h3>
          <span id="out-bmi-status-pill" class="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">--</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Indice IMC (kg/m²)" data-i18n-en="BMI Index (kg/m²)" data-i18n-ar="مؤشر كتلة الجسم (IMC)">Indice IMC (kg/m²)</div>
            <div id="out-bmi" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-bmi-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="Masse Grasse Estimée (IMG)" data-i18n-en="Estimated Body Fat %" data-i18n-ar="نسبة الدهون المقدرة (IMG)">Masse Grasse Estimée (IMG)</div>
            <div id="out-fat" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-fat-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Masse Maigre & Poids Santé" data-i18n-en="Lean Mass & Healthy Weight" data-i18n-ar="الكتلة العضلية والوزن الصحي">Masse Maigre & Poids Santé</div>
            <div id="out-lean" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-lean-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
        </div>

        <div id="out-bmi-interp" class="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-xl text-xs sm:text-sm text-slate-700 space-y-2.5 leading-relaxed"></div>

        <!-- BARÈME OFFICIEL DE RÉFÉRENCE DE L'IMC (NORMAL VS ANORMAL) -->
        <div class="space-y-3 pt-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 class="text-sm font-extrabold uppercase tracking-wider text-slate-900" data-i18n-fr="3. Barème Officiel de Référence de l'IMC (Ce qui est Normal vs Anormal — Normes OMS)" data-i18n-en="3. Official WHO BMI Reference Scale (What is Normal vs Abnormal)" data-i18n-ar="3. جدول المعايير المرجعي لمؤشر كتلة الجسم (ما هو طبيعي وما هو غير طبيعي - منظمة الصحة العالمية)">3. Barème Officiel de Référence de l'IMC (Ce qui est Normal vs Anormal — Normes OMS)</h4>
            <span id="out-ideal-range-badge" class="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full"></span>
          </div>
          <p class="text-xs text-slate-600" data-i18n-fr="Le tableau ci-dessous vous permet d'avoir une opinion claire et objective sur votre IMC : la zone verte (18,5 à 24,9 kg/m²) correspond à l'IMC normal de référence pour la santé, tandis que les zones inférieures ou supérieures signalent un écart à interpréter selon votre masse musculaire." data-i18n-en="The reference scale below shows where your BMI stands: the green zone (18.5 to 24.9 kg/m²) represents the normal healthy reference range, while values outside require interpretation alongside muscle mass." data-i18n-ar="يوضح الجدول المرجعي أدناه موقعك بدقة: المنطقة الخضراء (18.5 إلى 24.9 كغ/م²) تمثل المعدل الطبيعي والصحي، بينما تشير الفئات الأخرى إلى نقص أو زيادة في الوزن.">Le tableau ci-dessous vous permet d'avoir une opinion claire et objective sur votre IMC : la zone verte (18,5 à 24,9 kg/m²) correspond à l'IMC normal de référence pour la santé, tandis que les zones inférieures ou supérieures signalent un écart à interpréter selon votre masse musculaire.</p>
          <div id="out-bmi-scale-rows" class="space-y-2"></div>
        </div>

        <!-- BARÈME DE RÉFÉRENCE DU TAUX DE MASSE GRASSE (IMG %) -->
        <div class="space-y-2.5 pt-2 border-t border-slate-100">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-800" data-i18n-fr="4. Barème de Référence de l'Indice de Masse Grasse (IMG % — Homme vs Femme)" data-i18n-en="4. Body Fat Percentage (IMG %) Reference Norms (Male vs Female)" data-i18n-ar="4. المعايير المرجعية لنسبة الدهون في الجسم (IMG % — الرجال والنساء)">4. Barème de Référence de l'Indice de Masse Grasse (IMG % — Homme vs Femme)</h4>
          <div id="out-img-scale-grid" class="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs"></div>
        </div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var w = parseFloat(document.getElementById('inp-w').value) || 68;
      var hCm = parseFloat(document.getElementById('inp-h').value) || 175;
      var h = hCm / 100;
      var age = parseFloat(document.getElementById('inp-age').value) || 28;
      var sex = parseFloat(document.getElementById('inp-sex').value);
      if (isNaN(sex)) sex = 1;

      var bmi = w / (h * h);
      var img = Math.max(sex === 1 ? 5.5 : 12.0, 1.2 * bmi + 0.23 * age - 10.8 * sex - 5.4);
      var lean = w * (1 - img / 100);
      var ffmi = lean / (h * h);
      var minW = (18.5 * h * h).toFixed(1);
      var maxW = (24.9 * h * h).toFixed(1);

      document.getElementById('out-bmi').textContent = bmi.toFixed(1);
      document.getElementById('out-fat').textContent = img.toFixed(1) + ' %';
      document.getElementById('out-lean').textContent = lean.toFixed(1) + ' kg';

      var isNormal = (bmi >= 18.5 && bmi < 25);
      var pill = document.getElementById('out-bmi-status-pill');
      if (pill) {
        if (isNormal) {
          pill.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300';
          pill.textContent = currentLang === 'fr' ? '✓ IMC Normal (Zone Santé Optimale)' : currentLang === 'en' ? '✓ Normal BMI (Optimal Health Zone)' : '✓ مؤشر طبيعي وصحي';
        } else if (bmi < 18.5) {
          pill.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300';
          pill.textContent = currentLang === 'fr' ? '⚠️ IMC Bas (< 18,5 · Insuffisance pondérale)' : currentLang === 'en' ? '⚠️ Low BMI (< 18.5 · Underweight)' : '⚠️ مؤشر منخفض (< 18.5 · نقص الوزن)';
        } else if (bmi < 30) {
          pill.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300';
          pill.textContent = currentLang === 'fr' ? 'ℹ️ IMC > 25 (Surpoids OMS ou Profil Musclé)' : currentLang === 'en' ? 'ℹ️ BMI > 25 (Overweight or Muscular)' : 'ℹ️ مؤشر فوق 25 (زيادة وزن أو كثافة عضلية)';
        } else {
          pill.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-red-100 text-red-900 border border-red-300';
          pill.textContent = currentLang === 'fr' ? '❗ IMC Élevé (≥ 30 · Zone Obésité OMS)' : currentLang === 'en' ? '❗ High BMI (≥ 30 · WHO Obesity Zone)' : '❗ مؤشر مرتفع (≥ 30 · سمنة حسب OMS)';
        }
      }

      var idealBadge = document.getElementById('out-ideal-range-badge');
      if (idealBadge) {
        idealBadge.textContent = currentLang === 'fr'
          ? 'Poids normal pour ' + hCm + ' cm : ' + minW + ' kg à ' + maxW + ' kg'
          : currentLang === 'en'
          ? 'Normal weight for ' + hCm + ' cm: ' + minW + ' kg to ' + maxW + ' kg'
          : 'الوزن الطبيعي لطول ' + hCm + ' سم: من ' + minW + ' إلى ' + maxW + ' كغ';
      }

      var whoFr = bmi < 18.5 ? 'Anormal (Bas) · Insuffisance pondérale' : bmi < 25 ? 'Normal · Corpulence santé idéale' : bmi < 30 ? 'Au-dessus de la norme · Surpoids ou Musclé' : 'Anormal (Élevé) · Obésité OMS';
      var whoEn = bmi < 18.5 ? 'Abnormal (Low) · Underweight' : bmi < 25 ? 'Normal · Healthy weight range' : bmi < 30 ? 'Above norm · Overweight or Muscular' : 'Abnormal (High) · WHO Obesity';
      var whoAr = bmi < 18.5 ? 'غير طبيعي (منخفض) · نقص الوزن' : bmi < 25 ? 'طبيعي · وزن صحي مثالي' : bmi < 30 ? 'فوق المعدل · زيادة وزن أو عضلات' : 'غير طبيعي (مرتفع) · سمنة';

      var fatTierFr = (sex === 1 ? (img < 13 ? 'Athlète affûté (6–13%)' : img < 18 ? 'Normal / Fitness (14–17%)' : img < 25 ? 'Moyen / Standard (18–24%)' : 'Élevé (≥ 25% — Excès adipeux)') : (img < 20 ? 'Athlète affûtée (14–20%)' : img < 25 ? 'Normal / Fitness (21–24%)' : img < 32 ? 'Moyen / Standard (25–31%)' : 'Élevé (≥ 32% — Excès adipeux)'));
      var fatTierEn = (sex === 1 ? (img < 13 ? 'Lean Athlete (6–13%)' : img < 18 ? 'Normal / Fit (14–17%)' : img < 25 ? 'Average (18–24%)' : 'High (≥ 25% — Excess fat)') : (img < 20 ? 'Lean Athlete (14–20%)' : img < 25 ? 'Normal / Fit (21–24%)' : img < 32 ? 'Average (25–31%)' : 'High (≥ 32% — Excess fat)'));
      var fatTierAr = (sex === 1 ? (img < 13 ? 'رياضي رشيق (6–13%)' : img < 18 ? 'طبيعي / لياقة جيدة (14–17%)' : img < 25 ? 'متوسط / عادي (18–24%)' : 'مرتفع (≥ 25% — دهون زائدة)') : (img < 20 ? 'رياضية رشيقة (14–20%)' : img < 25 ? 'طبيعي / لياقة جيدة (21–24%)' : img < 32 ? 'متوسط / عادي (25–31%)' : 'مرتفع (≥ 32% — دهون زائدة)'));

      if (currentLang === 'fr') {
        document.getElementById('out-bmi-meaning').textContent = whoFr;
        document.getElementById('out-fat-meaning').textContent = fatTierFr + ' (Formule Deurenberg)';
        document.getElementById('out-lean-meaning').textContent = 'Poids normal : ' + minW + '–' + maxW + ' kg (FFMI ' + ffmi.toFixed(1) + ')';
      } else if (currentLang === 'en') {
        document.getElementById('out-bmi-meaning').textContent = whoEn;
        document.getElementById('out-fat-meaning').textContent = fatTierEn + ' (Deurenberg formula)';
        document.getElementById('out-lean-meaning').textContent = 'Normal weight: ' + minW + '–' + maxW + ' kg (FFMI ' + ffmi.toFixed(1) + ')';
      } else {
        document.getElementById('out-bmi-meaning').textContent = whoAr;
        document.getElementById('out-fat-meaning').textContent = fatTierAr;
        document.getElementById('out-lean-meaning').textContent = 'الوزن الطبيعي: ' + minW + '–' + maxW + ' كغ (FFMI ' + ffmi.toFixed(1) + ')';
      }

      var scaleBrackets = [
        {
          active: bmi < 18.5,
          range: '< 18,5 kg/m²',
          wRange: '< ' + minW + ' kg',
          statusFr: 'ANORMAL (BAS) · Insuffisance pondérale (Maigreur)',
          statusEn: 'ABNORMAL (LOW) · Underweight',
          statusAr: 'غير طبيعي (منخفض) · نقص الوزن (نحافة)',
          descFr: 'Poids inférieur à la référence santé. Risque de fatigue chronique, carence énergétique (RED-S) et baisse d’immunité.',
          descEn: 'Below healthy weight reference. Risk of low energy availability (RED-S), fatigue, and bone stress.',
          descAr: 'أقل من الوزن الصحي المرجعي. قد يؤدي إلى إجهاد مبكر ونقص في الطاقة والمناعة.',
          cls: 'border-amber-300 bg-amber-50/70 text-amber-950'
        },
        {
          active: bmi >= 18.5 && bmi < 25.0,
          range: '18,5 – 24,9 kg/m²',
          wRange: minW + ' – ' + maxW + ' kg',
          statusFr: 'NORMAL (RÉFÉRENCE SANTÉ) · Corpulence normale idéale',
          statusEn: 'NORMAL (HEALTHY REFERENCE) · Ideal Normal Weight',
          statusAr: 'طبيعي (المرجع الصحي المثالي) · وزن طبيعي ومتوازن',
          descFr: 'Zone normale officielle de l’OMS. Équilibre métabolique, cardiovasculaire et articulaire optimal pour la santé et l’endurance.',
          descEn: 'Official WHO normal reference bracket. Optimal metabolic, cardiovascular, and joint health.',
          descAr: 'النطاق الطبيعي الرسمي لمنظمة الصحة العالمية. توازن مثالي للصحة والمفاصل واللياقة البدنية.',
          cls: 'border-emerald-300 bg-emerald-50/80 text-emerald-950'
        },
        {
          active: bmi >= 25.0 && bmi < 30.0,
          range: '25,0 – 29,9 kg/m²',
          wRange: (25.0 * h * h).toFixed(1) + ' – ' + (29.9 * h * h).toFixed(1) + ' kg',
          statusFr: 'AU-DESSUS DE LA NORME · Surpoids OMS (ou Sportif Musclé)',
          statusEn: 'ABOVE NORMAL · WHO Overweight (or Muscular Athlete)',
          statusAr: 'فوق المعدل الطبيعي · زيادة وزن (أو بنية عضلية قوية)',
          descFr: 'Anormal chez le sédentaire (surpoids modéré), mais fréquent et normal chez le sportif ayant une forte masse musculaire (vérifiez votre IMG ci-dessus).',
          descEn: 'Overweight in sedentary adults, but common in strength/team-sport athletes with high lean muscle mass.',
          descAr: 'يعتبر زيادة وزن لدى غير الممارسين، لكنه شائع لدى الرياضيين ذوي الكتلة العضلية العالية.',
          cls: 'border-amber-300 bg-amber-50/70 text-amber-950'
        },
        {
          active: bmi >= 30.0 && bmi < 35.0,
          range: '30,0 – 34,9 kg/m²',
          wRange: (30.0 * h * h).toFixed(1) + ' – ' + (34.9 * h * h).toFixed(1) + ' kg',
          statusFr: 'ANORMAL (ÉLEVÉ) · Obésité modérée (Classe I OMS)',
          statusEn: 'ABNORMAL (HIGH) · Moderate Obesity (WHO Class I)',
          statusAr: 'غير طبيعي (مرتفع) · سمنة متوسطة (الدرجة الأولى)',
          descFr: 'Excès pondéral augmentant la contrainte mécanique sur les genoux/chevilles et le coût énergétique de course (~2,1 s/km par kg).',
          descEn: 'Elevated mechanical load on lower-limb joints and higher cardiorespiratory cost.',
          descAr: 'زيادة العبء الميكانيكي على المفاصل والركبتين؛ ينصح بالتدرج في الأنشطة الهوائية.',
          cls: 'border-orange-300 bg-orange-50/80 text-orange-950'
        },
        {
          active: bmi >= 35.0,
          range: '≥ 35,0 kg/m²',
          wRange: '≥ ' + (35.0 * h * h).toFixed(1) + ' kg',
          statusFr: 'ANORMAL (CRITIQUE) · Obésité sévère à massive (Classes II & III)',
          statusEn: 'ABNORMAL (SEVERE) · Severe Obesity (WHO Class II & III)',
          statusAr: 'غير طبيعي (مرتفع جداً) · سمنة مفرطة (الدرجة الثانية والثالثة)',
          descFr: 'Nécessite un accompagnement médical et la priorité aux activités portées (marche active, vélo, natation) pour protéger les articulations.',
          descEn: 'Prioritize low-impact non-weight-bearing endurance activities and medical guidance.',
          descAr: 'ينصح بالأنشطة الخفيفة على المفاصل (المشي السريع، السباحة، الدراجة) والمتابعة الصحية.',
          cls: 'border-red-300 bg-red-50/80 text-red-950'
        }
      ];

      document.getElementById('out-bmi-scale-rows').innerHTML = scaleBrackets.map(function(b) {
        var st = currentLang === 'fr' ? b.statusFr : currentLang === 'en' ? b.statusEn : b.statusAr;
        var ds = currentLang === 'fr' ? b.descFr : currentLang === 'en' ? b.descEn : b.descAr;
        var youBadge = b.active
          ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black bg-slate-900 text-white">' + (currentLang === 'fr' ? '👈 VOTRE IMC (' + bmi.toFixed(1) + ')' : currentLang === 'en' ? '👈 YOUR BMI (' + bmi.toFixed(1) + ')' : '👈 مؤشرك الحالي (' + bmi.toFixed(1) + ')') + '</span>'
          : '';
        var ring = b.active ? 'ring-2 ring-slate-900 shadow-md ' : 'opacity-85 ';
        return '<div class="p-3.5 rounded-xl border ' + ring + b.cls + ' flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all"><div class="space-y-0.5"><div class="flex flex-wrap items-center gap-2"><span class="text-xs font-extrabold">' + st + '</span>' + youBadge + '</div><div class="text-[11px] opacity-90">' + ds + '</div></div><div dir="ltr" class="text-right shrink-0 font-mono"><div class="text-xs font-black px-2.5 py-1 rounded bg-white/90 border border-current/15">' + b.range + '</div><div class="text-[10px] font-bold mt-0.5 opacity-80">' + b.wRange + '</div></div></div>';
      }).join('');

      var imgNorms = sex === 1
        ? [
            { tFr: 'Athlète (Homme)', tEn: 'Athlete (Male)', tAr: 'رياضي (رجل)', r: '6% – 13%', act: img < 14 },
            { tFr: 'Normal / Fitness', tEn: 'Normal / Fit', tAr: 'طبيعي / لياقة', r: '14% – 17%', act: img >= 14 && img < 18 },
            { tFr: 'Standard Acceptable', tEn: 'Acceptable Average', tAr: 'متوسط مقبول', r: '18% – 24%', act: img >= 18 && img < 25 },
            { tFr: 'Anormal (Excès Grasse)', tEn: 'High Body Fat', tAr: 'غير طبيعي (دهون زائدة)', r: '≥ 25%', act: img >= 25 }
          ]
        : [
            { tFr: 'Athlète (Femme)', tEn: 'Athlete (Female)', tAr: 'رياضية (امرأة)', r: '14% – 20%', act: img < 21 },
            { tFr: 'Normal / Fitness', tEn: 'Normal / Fit', tAr: 'طبيعي / لياقة', r: '21% – 24%', act: img >= 21 && img < 25 },
            { tFr: 'Standard Acceptable', tEn: 'Acceptable Average', tAr: 'متوسط مقبول', r: '25% – 31%', act: img >= 25 && img < 32 },
            { tFr: 'Anormal (Excès Grasse)', tEn: 'High Body Fat', tAr: 'غير طبيعي (دهون زائدة)', r: '≥ 32%', act: img >= 32 }
          ];

      document.getElementById('out-img-scale-grid').innerHTML = imgNorms.map(function(n) {
        var lbl = currentLang === 'fr' ? n.tFr : currentLang === 'en' ? n.tEn : n.tAr;
        var cls = n.act ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-bold shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-700';
        return '<div class="p-3 rounded-xl text-center ' + cls + '"><div class="text-[11px] font-bold">' + lbl + '</div><div dir="ltr" class="text-sm font-black font-mono mt-0.5">' + n.r + '</div></div>';
      }).join('');

      var diffIdeal = w - parseFloat(maxW);
      var box = document.getElementById('out-bmi-interp');
      if (currentLang === 'fr') {
        box.innerHTML = '<p><strong>1. Votre Avis Objectif (Normal vs Anormal) :</strong> Avec <strong>' + w + ' kg</strong> pour <strong>' + hCm + ' cm</strong>, votre IMC est de <strong>' + bmi.toFixed(1) + ' kg/m²</strong>. La zone normale de référence OMS se situe entre <strong>18,5 et 24,9 kg/m²</strong>, ce qui correspond pour votre taille à un poids normal compris entre <strong>' + minW + ' kg et ' + maxW + ' kg</strong>.</p><p><strong>2. Analyse Masse Grasse (' + img.toFixed(1) + ' %) & Course à Pied :</strong> ' + (isNormal ? 'Votre IMC est parfaitement dans la norme santé. Votre masse maigre active est estimée à <strong>' + lean.toFixed(1) + ' kg</strong>.' : bmi < 18.5 ? 'Votre IMC est en dessous du seuil normal (18,5). Il vous manque environ <strong>' + (parseFloat(minW) - w).toFixed(1) + ' kg</strong> pour atteindre la zone de poids santé minimale.' : 'Votre IMC dépasse 25,0 kg/m² (+' + diffIdeal.toFixed(1) + ' kg au-dessus du plafond OMS de ' + maxW + ' kg). En course à pied, chaque kg adipeux superflu coûte environ <strong>~2,1 sec/km</strong>.') + '</p>';
      } else if (currentLang === 'en') {
        box.innerHTML = '<p><strong>1. Objective Assessment (Normal vs Abnormal):</strong> At <strong>' + w + ' kg</strong> and <strong>' + hCm + ' cm</strong>, your BMI is <strong>' + bmi.toFixed(1) + ' kg/m²</strong>. The normal WHO reference range is <strong>18.5 to 24.9 kg/m²</strong>, which corresponds to <strong>' + minW + ' kg – ' + maxW + ' kg</strong> for your height.</p><p><strong>2. Body Fat (' + img.toFixed(1) + '%) & Running Economy:</strong> ' + (isNormal ? 'Your BMI is squarely within the healthy normal range, with <strong>' + lean.toFixed(1) + ' kg</strong> of lean mass.' : bmi < 18.5 ? 'Your BMI is below the 18.5 normal threshold (about <strong>' + (parseFloat(minW) - w).toFixed(1) + ' kg</strong> below minimum normal weight).' : 'Your BMI is above 25.0 (+' + diffIdeal.toFixed(1) + ' kg above the ' + maxW + ' kg WHO ceiling). Each excess non-functional kg costs ~2.1 sec/km.') + '</p>';
      } else {
        box.innerHTML = '<p><strong>1. التقييم الموضوعي (الطبيعي مقابل غير الطبيعي):</strong> بوزن <strong>' + w + ' كغ</strong> وطول <strong>' + hCm + ' سم</strong>، يبلغ مؤشر كتلة الجسم لديك <strong>' + bmi.toFixed(1) + ' كغ/م²</strong>. المعدل الطبيعي الصحي يتراوح بين <strong>18.5 و 24.9 كغ/م²</strong>، وهو ما يعادل وزناً طبيعياً بين <strong>' + minW + ' كغ و ' + maxW + ' كغ</strong> لطولك.</p><p><strong>2. تحليل نسبة الدهون (' + img.toFixed(1) + '%) والأداء الرياضي:</strong> ' + (isNormal ? 'مؤشرك يقع في المنطقة الطبيعية المثالية للصحة، مع كتلة عضلية صافية تقدر بـ <strong>' + lean.toFixed(1) + ' كغ</strong>.' : bmi < 18.5 ? 'مؤشرك أقل من الحد الطبيعي (18.5)، وتحتاج إلى حوالي <strong>' + (parseFloat(minW) - w).toFixed(1) + ' كغ</strong> للوصول إلى النطاق الصحي.' : 'مؤشرك يتجاوز 25.0 كغ/م² (+' + diffIdeal.toFixed(1) + ' كغ فوق الحد الأعلى الطبيعي ' + maxW + ' كغ).') + '</p>';
      }
    }`,
  },

  // 4. Chaleur, Humidité & Altitude
  {
    filename: 'calculateur-chaleur-meteo-altitude.html',
    seoTitle: "Ajustement Chaleur, Météo & Altitude | Prof EPS",
    seoDesc: "Ajustez vos allures de course selon la météo et l’altitude. Point de rosée, hydratation et consignes de sécurité thermique.",
    keywordsFr: 'calculateur chaleur course à pied, humidité point de rosée running, entrainement altitude hypoxie, hydratation course à pied chaleur',
    clusterBadgeFr: 'Cluster 2C · Thermorégulation, Humidité & Altitude',
    clusterBadgeEn: 'Cluster 2C · Heat, Dew Point & Altitude Pace Adjustment',
    clusterBadgeAr: 'القطب 2C · تعديل الإيقاع حسب الحرارة والرطوبة والارتفاع عن سطح البحر',
    titleFr: 'Calculateur d’Ajustement Chaleur, Humidité & Altitude (McMillan)',
    titleEn: 'Heat, Humidity & Altitude Running Pace Calculator',
    titleAr: 'حاسبة تعديل إيقاع الجري حسب الحرارة والرطوبة والارتفاع',
    subFr: 'Entrez les conditions météo, l’altitude et votre allure habituelle puis cliquez sur Calculer pour obtenir votre allure ajustée, le point de rosée et votre plan d’hydratation.',
    subEn: 'Enter weather conditions, altitude, and baseline pace, then click Calculate to get your adjusted pace, dew point, and hourly hydration plan.',
    subAr: 'أدخل درجة الحرارة والرطوبة والارتفاع وإيقاعك المعتاد ثم اضغط على "احسب" لمعرفة الإيقاع المعدل ونقطة الندى وخطة شرب الماء.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Conditions Météorologiques, Altitude & Allure" data-i18n-en="1. Weather Conditions, Altitude & Base Pace" data-i18n-ar="1. الظروف الجوية والارتفاع والإيقاع المرجعي">1. Conditions Météorologiques, Altitude & Allure</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">°C · % HR · Altitude</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Température à l'ombre (°C)" data-i18n-en="Shade Temperature (°C)" data-i18n-ar="درجة الحرارة في الظل (°C)">Température à l'ombre (°C)</label>
          <input id="inp-temp" type="number" value="28" min="-10" max="50" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Humidité Relative (%)" data-i18n-en="Relative Humidity (%)" data-i18n-ar="الرطوبة النسبية (%)">Humidité Relative (%)</label>
          <input id="inp-hum" type="number" value="65" min="5" max="100" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Altitude (mètres)" data-i18n-en="Altitude (meters)" data-i18n-ar="الارتفاع عن البحر (متر)">Altitude (mètres)</label>
          <input id="inp-alt" type="number" value="200" min="0" max="4500" step="100" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Allure normale (sec/km, 270=4:30)" data-i18n-en="Normal Pace (sec/km, 270=4:30)" data-i18n-ar="الإيقاع المعتاد (ثانية/كم)">Allure normale (sec/km, 270=4:30)</label>
          <input id="inp-base-pace" type="number" value="270" min="150" max="600" step="5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>☀️</span>
        <span data-i18n-fr="Calculer l'Impact Thermique, l'Allure Ajustée & l'Hydratation" data-i18n-en="Calculate Heat Impact, Adjusted Pace & Hydration Plan" data-i18n-ar="احسب تأثير الحرارة والإيقاع المعدل وخطة الترطيب">Calculer l'Impact Thermique, l'Allure Ajustée & l'Hydratation</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Résultats Thermorégulation & Interprétation de Chaque Valeur" data-i18n-en="2. Thermoregulation Metrics & Per-Value Interpretation" data-i18n-ar="2. نتائج التنظيم الحراري وتفسير كل مؤشر">2. Résultats Thermorégulation & Interprétation de Chaque Valeur</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Ralentissement & Allure Cible" data-i18n-en="Slowdown % & Adjusted Pace" data-i18n-ar="نسبة التباطؤ والإيقاع المعدل">Ralentissement & Allure Cible</div>
            <div id="out-slow" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-slow-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-amber-900" data-i18n-fr="Point de Rosée (Humidité Réelle)" data-i18n-en="Dew Point (Evaporative Load)" data-i18n-ar="نقطة الندى (إعاقة تبخر العرق)">Point de Rosée (Humidité Réelle)</div>
            <div id="out-dew" dir="ltr" class="text-3xl font-black font-mono text-amber-800 tabular-nums">--</div>
            <div id="out-dew-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-amber-100"></div>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Hydratation & Sodium / Heure" data-i18n-en="Hourly Fluids & Sodium" data-i18n-ar="حاجيات الماء والصوديوم / ساعة">Hydratation & Sodium / Heure</div>
            <div id="out-hyd" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-hyd-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
        </div>

        <div id="out-weather-interp" class="p-5 bg-slate-50 border-l-4 border-amber-500 rounded-xl text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed"></div>
      </div>
    </div>`,
    scriptJs: `function fmtPaceSimple(sec) {
      var s = Math.max(120, Math.round(sec));
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' /km';
    }
    function computeTool() {
      var t = parseFloat(document.getElementById('inp-temp').value) || 28;
      var h = parseFloat(document.getElementById('inp-hum').value) || 65;
      var alt = parseFloat(document.getElementById('inp-alt').value) || 0;
      var baseSec = parseFloat(document.getElementById('inp-base-pace').value) || 270;

      var alpha = (17.27 * t) / (237.7 + t) + Math.log(Math.max(5, h) / 100);
      var dewC = (237.7 * alpha) / (17.27 - alpha);
      var hsi = (t * 1.8 + 32) + (dewC * 1.8 + 32);
      var heatPct = hsi > 105 ? ((hsi - 105) * 0.14) : 0;
      var altPct = alt > 900 ? ((alt - 900) / 300) * 1.7 : 0;
      var totalPct = heatPct + altPct;
      var adjSec = Math.round(baseSec * (1 + totalPct / 100));
      var fluidMl = hsi > 145 ? 1050 : hsi > 125 ? 850 : 650;
      var sodiumMg = hsi > 145 ? 800 : hsi > 125 ? 600 : 400;

      document.getElementById('out-slow').textContent = '+' + totalPct.toFixed(1) + ' %';
      document.getElementById('out-dew').textContent = dewC.toFixed(1) + ' °C';
      document.getElementById('out-hyd').textContent = fluidMl + ' ml/h';

      var dewTierFr = dewC < 15 ? 'Confortable (évaporation optimale)' : dewC < 20 ? 'Lourd (sudation accrue)' : 'Oppressant (évaporation bloquée)';
      var dewTierEn = dewC < 15 ? 'Comfortable (optimal cooling)' : dewC < 20 ? 'Muggy (heavy sweating)' : 'Oppressive (impaired evaporation)';
      var dewTierAr = dewC < 15 ? 'مريح (تبخر مثالي للعرق)' : dewC < 20 ? 'رطب (تعرق مرتفع)' : 'خانق (صعوبة تبريد الجسم)';

      if (currentLang === 'fr') {
        document.getElementById('out-slow-meaning').textContent = 'Allure ajustée : ' + fmtPaceSimple(adjSec) + ' (au lieu de ' + fmtPaceSimple(baseSec) + ')';
        document.getElementById('out-dew-meaning').textContent = dewTierFr;
        document.getElementById('out-hyd-meaning').textContent = 'Sodium recommandé : ~' + sodiumMg + ' mg/h';
      } else if (currentLang === 'en') {
        document.getElementById('out-slow-meaning').textContent = 'Adjusted pace: ' + fmtPaceSimple(adjSec) + ' (vs ' + fmtPaceSimple(baseSec) + ')';
        document.getElementById('out-dew-meaning').textContent = dewTierEn;
        document.getElementById('out-hyd-meaning').textContent = 'Recommended Sodium: ~' + sodiumMg + ' mg/h';
      } else {
        document.getElementById('out-slow-meaning').textContent = 'الإيقاع المعدل: ' + fmtPaceSimple(adjSec) + ' (بدل ' + fmtPaceSimple(baseSec) + ')';
        document.getElementById('out-dew-meaning').textContent = dewTierAr;
        document.getElementById('out-hyd-meaning').textContent = 'الصوديوم الموصى به: ~' + sodiumMg + ' ملغ/ساعة';
      }

      var box = document.getElementById('out-weather-interp');
      if (currentLang === 'fr') {
        box.innerHTML = '<p><strong>🌡️ Analyse Thermique & Hypoxique :</strong> Avec <strong>' + t + ' °C</strong> et <strong>' + h + ' %</strong> d’humidité (Point de rosée = <strong>' + dewC.toFixed(1) + ' °C</strong>) à <strong>' + alt + ' m</strong> d’altitude, votre dérive cardiovasculaire impose de ralentir de <strong>+' + totalPct.toFixed(1) + ' %</strong> pour conserver la même fréquence cardiaque.</p><p><strong>🛡️ Consignes Sécurité EPS & Entraînement :</strong> Visez <strong>' + fmtPaceSimple(adjSec) + '</strong> au lieu de ' + fmtPaceSimple(baseSec) + ', fractionnez les pauses d’hydratation toutes les 15 minutes (<strong>' + Math.round(fluidMl / 4) + ' ml</strong> par prise) et privilégiez l’ombre ou les horaires matinaux si le point de rosée dépasse 18 °C.</p>';
      } else if (currentLang === 'en') {
        box.innerHTML = '<p><strong>🌡️ Thermal & Altitude Analysis:</strong> At <strong>' + t + '°C</strong> and <strong>' + h + '%</strong> humidity (Dew point = <strong>' + dewC.toFixed(1) + '°C</strong>) and <strong>' + alt + ' m</strong> elevation, cardiac drift requires a <strong>+' + totalPct.toFixed(1) + '%</strong> pace adjustment to maintain equivalent internal effort.</p><p><strong>🛡️ PE & Training Safety:</strong> Target <strong>' + fmtPaceSimple(adjSec) + '</strong> instead of ' + fmtPaceSimple(baseSec) + ', and drink <strong>' + Math.round(fluidMl / 4) + ' ml</strong> every 15 minutes with electrolytes (~' + sodiumMg + ' mg Na+/h).</p>';
      } else {
        box.innerHTML = '<p><strong>🌡️ التحليل الحراري والارتفاع:</strong> عند درجة حرارة <strong>' + t + '°C</strong> ورطوبة <strong>' + h + '%</strong> (نقطة الندى = <strong>' + dewC.toFixed(1) + '°C</strong>) وارتفاع <strong>' + alt + ' م</strong>، يتطلب الحفاظ على نفس الشدة الفيزيولوجية خفض السرعة بنسبة <strong>+' + totalPct.toFixed(1) + '%</strong>.</p><p><strong>🛡️ إرشادات السلامة في التربية البدنية:</strong> اعتمد إيقاع <strong>' + fmtPaceSimple(adjSec) + '</strong> واشرب <strong>' + Math.round(fluidMl / 4) + ' مل</strong> من الماء كل 15 دقيقة.</p>';
      }
    }`,
  },

  // 5. Intermittent HIIT & COD 180°
  {
    filename: 'generateur-intermittent-hiit-cod.html',
    seoTitle: "Calculateur HIIT & Navettes COD 180° | Prof EPS",
    seoDesc: "Calculez vos distances d’intermittent HIIT avec ou sans demi-tours 180°. Modèle Buchheit pour sports collectifs et cours d’EPS.",
    keywordsFr: 'calculateur intermittent 15/15 30/30, distance plots vma eps, navette cod 180 buchheit, entrainement fractionné sports collectifs',
    clusterBadgeFr: 'Cluster 3A/B · Intermittent HIIT & Changement de Direction (COD 180°)',
    clusterBadgeEn: 'Cluster 3A/B · HIIT Intervals & 180° Shuttle COD Calculator',
    clusterBadgeAr: 'القطب 3A/B · التمارين المتقطعة HIIT وتغيير الاتجاه 180° للملاعب الجماعية',
    titleFr: 'Calculateur d’Intermittent HIIT & Navettes Sports Collectifs (COD 180°)',
    titleEn: 'HIIT Interval & Team Sports 180° Shuttle Cone Distance Calculator',
    titleAr: 'حاسبة مسافات التمارين المتقطعة والمكوك (COD 180°) للرياضات الجماعية',
    subFr: 'Paramétrez votre VMA, la durée d’effort, le % VMA et la longueur du terrain puis cliquez sur Calculer pour obtenir vos distances de plots sur piste et avec relances à 180° (modèle Buchheit).',
    subEn: 'Set your MAS, interval duration, % MAS, and court shuttle length, then click Calculate to get linear track and 180° COD-adjusted cone distances.',
    subAr: 'حدد سرعة VMA ومدة الجهد ونسبة الشدة وطول الملعب ثم اضغط على "احسب" لمعرفة المسافات الدقيقة للأقماع على المضمار أو مع تغيير الاتجاه 180°.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Paramètres de la Séance Intermittente (10s/10s, 15s/15s, 30s/30s)" data-i18n-en="1. HIIT Session Parameters (10s/10s, 15s/15s, 30s/30s)" data-i18n-ar="1. معطيات حصة التدريب المتقطع (15/15، 30/30)">1. Paramètres de la Séance Intermittente (10s/10s, 15s/15s, 30s/30s)</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">Piste & COD 180°</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="VMA du groupe/athlète (km/h)" data-i18n-en="Athlete/Group MAS (km/h)" data-i18n-ar="سرعة VMA (كم/س)">VMA du groupe/athlète (km/h)</label>
          <input id="inp-vma" type="number" value="16" min="8" max="25" step="0.5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Durée d'effort (secondes)" data-i18n-en="Work Duration (seconds)" data-i18n-ar="مدة الجهد (بالثواني)">Durée d'effort (secondes)</label>
          <input id="inp-sec" type="number" value="15" min="5" max="180" step="5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Intensité cible (% VMA)" data-i18n-en="Target Intensity (% MAS)" data-i18n-ar="الشدة المستهدفة (% من VMA)">Intensité cible (% VMA)</label>
          <input id="inp-pct" type="number" value="110" min="80" max="140" step="5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Navette Terrain (m) [0 = Piste]" data-i18n-en="Shuttle Length (m) [0 = Track]" data-i18n-ar="طول المكوك بالمتر [0 = مضمار]">Navette Terrain (m) [0 = Piste]</label>
          <input id="inp-shuttle" type="number" value="20" min="0" max="100" step="5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>🔄</span>
        <span data-i18n-fr="Calculer les Distances de Plots (Piste & Navettes COD 180°)" data-i18n-en="Calculate Cone Distances (Linear Track & 180° Shuttles)" data-i18n-ar="احسب مسافات الأقماع (على المضمار ومع تغيير الاتجاه 180°)">Calculer les Distances de Plots (Piste & Navettes COD 180°)</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Distances Cibles & Interprétation Biomécanique" data-i18n-en="2. Target Cone Distances & Biomechanical Interpretation" data-i18n-ar="2. المسافات المستهدفة والتفسير البيوميكانيكي">2. Vos Distances Cibles & Interprétation Biomécanique</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Distance Linéaire (Sur Piste)" data-i18n-en="Linear Distance (Track)" data-i18n-ar="المسافة الخطية (مضمار بدون دوران)">Distance Linéaire (Sur Piste)</div>
            <div id="out-lin" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-lin-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="Distance Corrigée COD 180°" data-i18n-en="180° COD Adjusted Distance" data-i18n-ar="المسافة المعدلة مع الدوران 180°">Distance Corrigée COD 180°</div>
            <div id="out-cod" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-cod-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Vitesse Cible Mécanique" data-i18n-en="Target Mechanical Speed" data-i18n-ar="السرعة الميكانيكية المستهدفة">Vitesse Cible Mécanique</div>
            <div id="out-spd" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-spd-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
        </div>

        <div id="out-hiit-interp" class="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed"></div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var vma = parseFloat(document.getElementById('inp-vma').value) || 16;
      var sec = parseFloat(document.getElementById('inp-sec').value) || 15;
      var pct = parseFloat(document.getElementById('inp-pct').value) || 110;
      var sh = parseFloat(document.getElementById('inp-shuttle').value) || 0;

      var spdKmh = (vma * pct) / 100;
      var vMs = spdKmh / 3.6;
      var lin = Math.round(vMs * sec);
      var turns = sh > 0 ? Math.max(0, Math.floor((lin - 1) / sh)) : 0;
      var adj = sh > 0 ? Math.max(sh, Math.round(lin - turns * 0.72 * vMs)) : lin;

      document.getElementById('out-lin').textContent = lin + ' m';
      document.getElementById('out-cod').textContent = adj + ' m';
      document.getElementById('out-spd').textContent = spdKmh.toFixed(1) + ' km/h';

      if (currentLang === 'fr') {
        document.getElementById('out-lin-meaning').textContent = 'En ligne droite continue sur ' + sec + ' s';
        document.getElementById('out-cod-meaning').textContent = turns + ' demi-tour(s) à 180° (gain/perte : −' + (lin - adj) + ' m)';
        document.getElementById('out-spd-meaning').textContent = 'Soit ' + vMs.toFixed(2) + ' m/s à ' + pct + '% VMA';
      } else if (currentLang === 'en') {
        document.getElementById('out-lin-meaning').textContent = 'Continuous straight line over ' + sec + 's';
        document.getElementById('out-cod-meaning').textContent = turns + ' × 180° turn(s) (−' + (lin - adj) + ' m COD cost)';
        document.getElementById('out-spd-meaning').textContent = vMs.toFixed(2) + ' m/s at ' + pct + '% MAS';
      } else {
        document.getElementById('out-lin-meaning').textContent = 'في خط مستقيم مستمر خلال ' + sec + ' ثانية';
        document.getElementById('out-cod-meaning').textContent = turns + ' دوران 180° (خصم ' + (lin - adj) + ' م لتكلفة الدوران)';
        document.getElementById('out-spd-meaning').textContent = vMs.toFixed(2) + ' م/ثانية عند ' + pct + '% VMA';
      }

      var box = document.getElementById('out-hiit-interp');
      if (currentLang === 'fr') {
        box.innerHTML = '<p><strong>📐 Modèle Biomécanique de Buchheit (COD 180°) :</strong> Chaque demi-tour à 180° impose une phase de freinage excentrique et une relance concentrique équivalant à ~0,72 seconde par changement de direction. Sur un terrain de <strong>' + (sh || 40) + ' m</strong>, l’élève ou joueur réalise <strong>' + turns + ' demi-tour(s)</strong> : placer le plot à <strong>' + adj + ' m</strong> génère exactement la même sollicitation cardiorespiratoire (VO2) que <strong>' + lin + ' m</strong> en ligne droite.</p><p><strong>🎯 Organisation EPS :</strong> Formez des couloirs par groupes de VMA (ex. 12, 14, 16, 18 km/h) avec un coup de sifflet toutes les <strong>' + sec + ' secondes</strong>.</p>';
      } else if (currentLang === 'en') {
        box.innerHTML = '<p><strong>📐 Buchheit 180° COD Model:</strong> Each 180° turn requires eccentric braking and concentric re-acceleration (~0.72s cost per turn). With <strong>' + turns + ' turn(s)</strong>, placing the target cone at <strong>' + adj + ' m</strong> elicits the exact same cardiorespiratory load as <strong>' + lin + ' m</strong> on a straight track.</p><p><strong>🎯 PE Class Setup:</strong> Group students by MAS lanes and use a whistle signal every <strong>' + sec + ' seconds</strong>.</p>';
      } else {
        box.innerHTML = '<p><strong>📐 النموذج البيوميكانيكي لتغيير الاتجاه (Buchheit 180°):</strong> كل دوران بزاوية 180° يستهلك طاقة إضافية للفرملة وإعادة الانطلاق (~0.72 ثانية لكل دوران). لذلك فإن قطع مسافة <strong>' + adj + ' م</strong> مع <strong>' + turns + ' دوران</strong> يعادل تماماً مجهود <strong>' + lin + ' م</strong> على مضمار مستقيم.</p><p><strong>🎯 التنظيم في حصة التربية البدنية:</strong> وزع التلاميذ في ممرات حسب مجموعات VMA مع صافرة كل <strong>' + sec + ' ثانية</strong>.</p>';
      }
    }`,
  },

  // 6. Charge RPE Foster & ACWR
  {
    filename: 'calculateur-charge-rpe-foster-acwr.html',
    seoTitle: "Calculateur Charge RPE & Ratio ACWR | Prof EPS",
    seoDesc: "Suivez votre charge d’entraînement aiguë/chronique et évaluez votre ratio ACWR pour prévenir les blessures selon Gabbett.",
    keywordsFr: 'calculateur charge rpe foster, ratio acwr blessure, charge aigue chronique sport, calcul sRPE entrainement',
    clusterBadgeFr: 'Cluster 3C · Monitoring de la Charge Interne (Foster sRPE & ACWR)',
    clusterBadgeEn: 'Cluster 3C · Internal Training Load (Foster sRPE & ACWR Ratio)',
    clusterBadgeAr: 'القطب 3C · مراقبة الحمل التدريبي (Foster sRPE) والوقاية من الإصابات (ACWR)',
    titleFr: 'Calculateur de Charge RPE Foster & Ratio ACWR Prévention des Blessures',
    titleEn: 'Foster sRPE Training Load, Monotony & ACWR Injury Risk Calculator',
    titleAr: 'حاسبة الحمل التدريبي Foster sRPE ونسبة الوقاية من الإصابات ACWR',
    subFr: 'Saisissez votre charge aiguë (7 derniers jours) et votre charge chronique (moyenne 4 semaines) puis cliquez sur Calculer pour évaluer votre ratio ACWR et votre risque de blessure.',
    subEn: 'Enter your 7-day acute load and 28-day chronic average load, then click Calculate to evaluate your ACWR ratio and injury risk zone.',
    subAr: 'أدخل الحمل التدريبي الحاد (آخر 7 أيام) والحمل المزمن (متوسط 4 أسابيع) ثم اضغط على "احسب" لتقييم نسبة ACWR ومخاطر الإصابة.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Paramètres de Charge d'Entraînement (Méthode Foster sRPE)" data-i18n-en="1. Training Load Inputs (Foster sRPE Method)" data-i18n-ar="1. معطيات الحمل التدريبي (طريقة Foster sRPE)">1. Paramètres de Charge d'Entraînement (Méthode Foster sRPE)</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">UA · Ratio ACWR</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Charge Aiguë — 7 derniers jours (UA = Σ Durée min × RPE)" data-i18n-en="Acute Load — Last 7 days (AU = Σ Duration min × RPE)" data-i18n-ar="الحمل الحاد — آخر 7 أيام (وحدة = المدة × RPE)">Charge Aiguë — 7 derniers jours (UA = Σ Durée min × RPE)</label>
          <input id="inp-acute" type="number" value="2150" min="100" max="10000" step="50" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Charge Chronique — Moyenne hebdo sur 4 semaines (UA)" data-i18n-en="Chronic Load — 4-week rolling weekly average (AU)" data-i18n-ar="الحمل المزمن — المتوسط الأسبوعي لـ 4 أسابيع">Charge Chronique — Moyenne hebdo sur 4 semaines (UA)</label>
          <input id="inp-chronic" type="number" value="1900" min="100" max="10000" step="50" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>🛡️</span>
        <span data-i18n-fr="Calculer mon Ratio ACWR & le Diagnostic Prévention Blessures" data-i18n-en="Calculate My ACWR Ratio & Injury Risk Diagnosis" data-i18n-ar="احسب نسبة ACWR وتشخيص الوقاية من الإصابات">Calculer mon Ratio ACWR & le Diagnostic Prévention Blessures</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Indicateurs de Charge & Interprétation du Risque" data-i18n-en="2. Load Metrics & Injury Risk Interpretation" data-i18n-ar="2. مؤشرات الحمل التدريبي وتفسير مستوى الخطر">2. Vos Indicateurs de Charge & Interprétation du Risque</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="Ratio ACWR (Aigu / Chronique)" data-i18n-en="ACWR Ratio (Acute / Chronic)" data-i18n-ar="نسبة ACWR (الحاد / المزمن)">Ratio ACWR (Aigu / Chronique)</div>
            <div id="out-acwr" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-acwr-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Variation Hebdomadaire" data-i18n-en="Weekly Load Progression" data-i18n-ar="نسبة التغير الأسبوعي للحمل">Variation Hebdomadaire</div>
            <div id="out-diff" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-diff-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Plafond Sécuritaire Semaine Suivante" data-i18n-en="Safe Max Load Next Week" data-i18n-ar="الحد الآمن للأسبوع القادم">Plafond Sécuritaire Semaine Suivante</div>
            <div id="out-safe-max" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-safe-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
        </div>

        <div id="out-acwr-diag" class="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var a = parseFloat(document.getElementById('inp-acute').value) || 2150;
      var c = Math.max(200, parseFloat(document.getElementById('inp-chronic').value) || 1900);
      var ratio = a / c;
      var diffPct = ((a - c) / c) * 100;
      var safeMax = Math.round(c * 1.25);

      document.getElementById('out-acwr').textContent = ratio.toFixed(2);
      document.getElementById('out-diff').textContent = (diffPct >= 0 ? '+' : '') + diffPct.toFixed(0) + ' %';
      document.getElementById('out-safe-max').textContent = safeMax + ' UA';

      var statusFr = 'Sweet Spot Optimal (0.80–1.30)', statusEn = 'Optimal Sweet Spot (0.80–1.30)', statusAr = 'المنطقة الآمنة المثالية (0.80–1.30)';
      if (ratio > 1.50) { statusFr = 'Danger Critique (> 1.50)'; statusEn = 'High Injury Risk (> 1.50)'; statusAr = 'خطر إصابة مرتفع جداً (> 1.50)'; }
      else if (ratio > 1.30) { statusFr = 'Vigilance Surcharge (1.31–1.50)'; statusEn = 'Overload Warning (1.31–1.50)'; statusAr = 'تنبيه: حمل زائد (1.31–1.50)'; }
      else if (ratio < 0.80) { statusFr = 'Sous-charge / Affûtage (< 0.80)'; statusEn = 'Underload / Taper (< 0.80)'; statusAr = 'حمل منخفض / استشفاء (< 0.80)'; }

      if (currentLang === 'fr') {
        document.getElementById('out-acwr-meaning').textContent = statusFr;
        document.getElementById('out-diff-meaning').textContent = 'Écart brut : ' + (a - c >= 0 ? '+' : '') + Math.round(a - c) + ' UA';
        document.getElementById('out-safe-meaning').textContent = 'Limite haute recommandée (ACWR ≤ 1.25)';
      } else if (currentLang === 'en') {
        document.getElementById('out-acwr-meaning').textContent = statusEn;
        document.getElementById('out-diff-meaning').textContent = 'Net delta: ' + (a - c >= 0 ? '+' : '') + Math.round(a - c) + ' AU';
        document.getElementById('out-safe-meaning').textContent = 'Recommended upper ceiling (ACWR ≤ 1.25)';
      } else {
        document.getElementById('out-acwr-meaning').textContent = statusAr;
        document.getElementById('out-diff-meaning').textContent = 'الفارق الصافي: ' + (a - c >= 0 ? '+' : '') + Math.round(a - c) + ' وحدة';
        document.getElementById('out-safe-meaning').textContent = 'السقف الآمن الموصى به (ACWR ≤ 1.25)';
      }

      var d = document.getElementById('out-acwr-diag');
      if (currentLang === 'fr') {
        d.innerHTML = '<p><strong>📊 Modèle de Gabbett & Foster :</strong> Votre ratio Aigu:Chronique est de <strong>' + ratio.toFixed(2) + '</strong> (<strong>' + statusFr + '</strong>). Une séance de 60 minutes à RPE 7/10 génère 420 UA.</p><p><strong>🛡️ Recommandation Prévention :</strong> ' + (ratio > 1.3 ? 'Votre charge hebdomadaire a augmenté trop brusquement (+' + diffPct.toFixed(0) + '%). Réduisez le volume ou l’intensité de 20 à 25 % sur les 5 prochains jours pour protéger les tendons et ischio-jambiers.' : 'Votre progression est maîtrisée. Pour la semaine prochaine, ne dépassez pas <strong>' + safeMax + ' UA</strong> afin de rester dans la fenêtre protectrice.') + '</p>';
      } else if (currentLang === 'en') {
        d.innerHTML = '<p><strong>📊 Gabbett & Foster Load Model:</strong> Your Acute:Chronic Workload Ratio is <strong>' + ratio.toFixed(2) + '</strong> (<strong>' + statusEn + '</strong>).</p><p><strong>🛡️ Injury Prevention Advice:</strong> ' + (ratio > 1.3 ? 'Weekly load spiked by +' + diffPct.toFixed(0) + '%. Reduce intensity/volume by 20–25% over the next 5 days.' : 'Progression is well controlled. Keep next week below <strong>' + safeMax + ' AU</strong>.') + '</p>';
      } else {
        d.innerHTML = '<p><strong>📊 نموذج غابيت وفوستر للحمل التدريبي:</strong> تبلغ نسبة الحمل الحاد إلى المزمن <strong>' + ratio.toFixed(2) + '</strong> (<strong>' + statusAr + '</strong>).</p><p><strong>🛡️ نصيحة الوقاية من الإصابات:</strong> ' + (ratio > 1.3 ? 'ارتفع الحمل الأسبوعي بشكل مفاجئ (+' + diffPct.toFixed(0) + '%). ينصح بخفض الحجم أو الشدة بنسبة 20% خلال الأيام القادمة.' : 'تدرج الحمل متوازن وآمن. لا تتجاوز <strong>' + safeMax + ' وحدة</strong> في الأسبوع القادم.') + '</p>';
      }
    }`,
  },

  // 7. Réserve Anaérobie de Vitesse (ASR)
  {
    filename: 'calculateur-asr-reserve-vitesse.html',
    seoTitle: "Calculateur Réserve de Vitesse ASR | Prof EPS",
    seoDesc: "Analysez votre profil neuromusculaire (endurant, hybride, sprinteur) et personnalisez vos séances intermittentes avec l’ASR.",
    keywordsFr: 'calculateur asr reserve vitesse anaerobie, vitesse maximale sprint vma, profilage sprinteur endurant, hiit supramaximal asr',
    clusterBadgeFr: 'Cluster 1B · Réserve de Vitesse Anaérobie (ASR = MSS − VMA)',
    clusterBadgeEn: 'Cluster 1B · Anaerobic Speed Reserve (ASR = MSS − MAS)',
    clusterBadgeAr: 'القطب 1B · احتياطي السرعة اللاهوائية (ASR = أقصى سرعة − VMA)',
    titleFr: 'Calculateur de Réserve de Vitesse Anaérobie (ASR) & Profilage Athlète',
    titleEn: 'Anaerobic Speed Reserve (ASR) & Supramaximal HIIT Calculator',
    titleAr: 'حاسبة احتياطي السرعة اللاهوائية (ASR) وتصنيف العداء',
    subFr: 'Saisissez votre VMA et votre Vitesse Maximale de Sprint (MSS) puis cliquez sur Calculer pour découvrir votre Réserve Anaérobie (ASR), votre profil neuromusculaire et vos cibles de 10% à 50% ASR.',
    subEn: 'Enter your MAS (VMA) and Max Sprint Speed (MSS), then click Calculate to unlock your Anaerobic Speed Reserve, athlete profile, and 10%–50% ASR targets.',
    subAr: 'أدخل سرعة VMA وأقصى سرعة انطلاق (MSS) ثم اضغط على "احسب" لمعرفة احتياطي السرعة اللاهوائية ونوع ملفك العضلي والمسافات المستهدفة.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Vos Vitesses Aérobie (VMA) & Sprint Maximal (MSS)" data-i18n-en="1. Your Aerobic Speed (MAS) & Max Sprint Speed (MSS)" data-i18n-ar="1. السرعة الهوائية (VMA) وأقصى سرعة انطلاق (MSS)">1. Vos Vitesses Aérobie (VMA) & Sprint Maximal (MSS)</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">ASR · Buchheit & Sandford</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Votre VMA / MAS (km/h)" data-i18n-en="Your MAS / VMA (km/h)" data-i18n-ar="سرعة VMA (كم/س)">Votre VMA / MAS (km/h)</label>
          <input id="inp-vma" type="number" value="16.0" min="8" max="25" step="0.5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Vitesse Max Sprint — MSS (km/h, ex: test 30m lancé)" data-i18n-en="Max Sprint Speed — MSS (km/h, e.g. flying 30m)" data-i18n-ar="أقصى سرعة سبرينت MSS (كم/س)">Vitesse Max Sprint — MSS (km/h, ex: test 30m lancé)</label>
          <input id="inp-mss" type="number" value="29.5" min="15" max="42" step="0.5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>🚀</span>
        <span data-i18n-fr="Calculer ma Réserve Anaérobie (ASR) & mon Profil Neuromusculaire" data-i18n-en="Calculate My Anaerobic Speed Reserve (ASR) & Profile" data-i18n-ar="احسب احتياطي السرعة اللاهوائية (ASR) وتصنيفك العضلي">Calculer ma Réserve Anaérobie (ASR) & mon Profil Neuromusculaire</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Indicateurs ASR & Interprétation du Profil" data-i18n-en="2. Your ASR Metrics & Fiber Profile Interpretation" data-i18n-ar="2. نتائج احتياطي السرعة وتفسير الملف العضلي">2. Vos Indicateurs ASR & Interprétation du Profil</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Réserve ASR (MSS − VMA)" data-i18n-en="ASR Reserve (MSS − MAS)" data-i18n-ar="احتياطي السرعة (ASR)">Réserve ASR (MSS − VMA)</div>
            <div id="out-asr" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-asr-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="Ratio de Vitesse (MSS / VMA)" data-i18n-en="Speed Ratio (MSS / MAS)" data-i18n-ar="نسبة السرعة (MSS / VMA)">Ratio de Vitesse (MSS / VMA)</div>
            <div id="out-ratio" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-ratio-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Cible HIIT Supramax (+25% ASR)" data-i18n-en="Supramax HIIT Target (+25% ASR)" data-i18n-ar="السرعة المثالية للتدريب المتقطع (+25% ASR)">Cible HIIT Supramax (+25% ASR)</div>
            <div id="out-asr25" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-asr25-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
        </div>

        <div id="out-asr-diag" class="p-5 bg-slate-50 border-l-4 border-red-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>

        <div>
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3" data-i18n-fr="Barème d'Individualisation Supramaximale (10% à 50% de la Réserve ASR)" data-i18n-en="Supramaximal Prescription Table (10% to 50% ASR)" data-i18n-ar="جدول ضبط المسافات فوق القصوى (من 10% إلى 50% من احتياطي ASR)">Barème d'Individualisation Supramaximale (10% à 50% de la Réserve ASR)</h4>
          <div id="out-asr-table" class="space-y-2"></div>
        </div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var vma = parseFloat(document.getElementById('inp-vma').value) || 16;
      var mss = Math.max(vma + 2, parseFloat(document.getElementById('inp-mss').value) || 29.5);
      var asr = mss - vma;
      var ratio = mss / vma;
      var spd25 = vma + 0.25 * asr;

      document.getElementById('out-asr').textContent = asr.toFixed(1) + ' km/h';
      document.getElementById('out-ratio').textContent = ratio.toFixed(2);
      document.getElementById('out-asr25').textContent = spd25.toFixed(1) + ' km/h';

      var profFr = ratio < 1.80 ? 'Profil Endurant (Fibres I dominantes)' : ratio > 1.95 ? 'Profil Explosif / Sprinteur (Fibres IIa/IIx)' : 'Profil Hybride Équilibré (Demi-fond / Sports Co)';
      var profEn = ratio < 1.80 ? 'Endurance Profile (Slow-twitch dominant)' : ratio > 1.95 ? 'Speed / Sprinter Profile (Fast-twitch)' : 'Balanced Hybrid Profile';
      var profAr = ratio < 1.80 ? 'ملف تحملي (هيمنة الألياف البطيئة)' : ratio > 1.95 ? 'ملف انفجاري / عداء سرعة (ألياف سريعة)' : 'ملف هجين متوازن (مسافات متوسطة / رياضات جماعية)';

      if (currentLang === 'fr') {
        document.getElementById('out-asr-meaning').textContent = 'Soit ' + (asr / 3.6).toFixed(2) + ' m/s de marge au-dessus de la VMA';
        document.getElementById('out-ratio-meaning').textContent = profFr;
        document.getElementById('out-asr25-meaning').textContent = 'Équivaut à ' + ((spd25 / vma) * 100).toFixed(0) + '% de votre VMA';
      } else if (currentLang === 'en') {
        document.getElementById('out-asr-meaning').textContent = (asr / 3.6).toFixed(2) + ' m/s margin above MAS';
        document.getElementById('out-ratio-meaning').textContent = profEn;
        document.getElementById('out-asr25-meaning').textContent = 'Equals ' + ((spd25 / vma) * 100).toFixed(0) + '% of your MAS';
      } else {
        document.getElementById('out-asr-meaning').textContent = 'هامش ' + (asr / 3.6).toFixed(2) + ' م/ثانية فوق VMA';
        document.getElementById('out-ratio-meaning').textContent = profAr;
        document.getElementById('out-asr25-meaning').textContent = 'يعادل ' + ((spd25 / vma) * 100).toFixed(0) + '% من سرعة VMA';
      }

      var diag = document.getElementById('out-asr-diag');
      if (currentLang === 'fr') {
        diag.innerHTML = '<p><strong>🔬 Pourquoi calibrer en % d’ASR plutôt qu’en % de VMA ?</strong> Deux élèves ayant la même VMA (16 km/h) mais un sprint max différent (27 vs 33 km/h) ne subissent pas la même fatigue à 115% VMA. Votre profil est <strong>« ' + profFr + ' »</strong> (Ratio = <strong>' + ratio.toFixed(2) + '</strong>).</p><p><strong>🏃‍♂️ Conseil Séance :</strong> Pour vos 15"/15" ou 30"/30" supramaximaux, ciblez <strong>+20% à +30% ASR (' + spd25.toFixed(1) + ' km/h)</strong> afin d’homogénéiser la contrainte métabolique entre tous les profils.</p>';
      } else if (currentLang === 'en') {
        diag.innerHTML = '<p><strong>🔬 Why prescribe in % ASR instead of % MAS?</strong> Athletes with identical MAS but different Max Sprint Speeds experience vastly different strain above 100% MAS. Your profile is <strong>"' + profEn + '"</strong> (Ratio = <strong>' + ratio.toFixed(2) + '</strong>).</p><p><strong>🏃‍♂️ Workout Advice:</strong> Use <strong>+20% to +30% ASR (' + spd25.toFixed(1) + ' km/h)</strong> for 15s/15s or 30s/30s HIIT sessions.</p>';
      } else {
        diag.innerHTML = '<p><strong>🔬 لماذا نعتمد نسبة ASR بدل نسبة VMA فوق القصوى؟</strong> تلميذان بنفس سرعة VMA ولكن بسرعة قصوى مختلفة لا يتحملان نفس الشدة فوق 100% VMA. تصنيفك هو: <strong>« ' + profAr + ' »</strong>.</p><p><strong>🏃‍♂️ نصيحة التدريب:</strong> في تمارين 15"/15" استهدف <strong>+20% إلى +30% من احتياطي ASR (' + spd25.toFixed(1) + ' كم/س)</strong>.</p>';
      }

      document.getElementById('out-asr-table').innerHTML = [10, 20, 30, 40, 50].map(function(pct) {
        var spd = vma + (asr * pct) / 100;
        var pctVma = ((spd / vma) * 100).toFixed(0);
        var d15 = Math.round((spd / 3.6) * 15);
        var d30 = Math.round((spd / 3.6) * 30);
        var useFr = pct <= 20 ? 'HIIT Long (30"/30")' : pct <= 35 ? 'HIIT Court (15"/15")' : 'Sprint Répété / RSA (10"/20")';
        var useEn = pct <= 20 ? 'Long HIIT (30s/30s)' : pct <= 35 ? 'Short HIIT (15s/15s)' : 'Repeated Sprint (10s/20s)';
        var useAr = pct <= 20 ? 'متقطع طويل (30"/30")' : pct <= 35 ? 'متقطع قصير (15"/15")' : 'تكرارات سرعة (10"/20")';
        var u = currentLang === 'fr' ? useFr : currentLang === 'en' ? useEn : useAr;
        return '<div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"><div class="font-bold text-slate-900">+' + pct + '% ASR → <span class="text-red-700 font-mono">' + spd.toFixed(1) + ' km/h</span> (' + pctVma + '% VMA) · <span class="text-slate-600">' + u + '</span></div><strong dir="ltr" class="font-mono text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">15s : ' + d15 + ' m | 30s : ' + d30 + ' m</strong></div>';
      }).join('');
    }`,
  },

  // 8. Indice d'Endurance (Péronnet & Thibault)
  {
    filename: 'calculateur-indice-endurance.html',
    seoTitle: "Calculateur Indice d’Endurance (IE) | Prof EPS",
    seoDesc: "Mesurez votre maintien de VMA sur la distance (modèle Péronnet). Diagnostic précis entre travail du seuil et de la VMA.",
    keywordsFr: 'calculateur indice endurance peronnet, pourcentage vma soutenu, diagnostic seuil lactique vma, calculer son indice endurance course',
    clusterBadgeFr: 'Cluster 1C · Modèle Physiologique de Péronnet & Thibault',
    clusterBadgeEn: 'Cluster 1C · Péronnet & Thibault Endurance Index Model',
    clusterBadgeAr: 'القطب 1C · حاسبة مؤشر التحمل (نموذج Péronnet & Thibault)',
    titleFr: 'Calculateur d’Indice d’Endurance (IE) & Diagnostic Seuil Lactique',
    titleEn: 'Endurance Index (EI) & Fractional MAS Utilization Calculator',
    titleAr: 'حاسبة مؤشر التحمل (IE) وتشخيص العتبة اللاهوائية',
    subFr: 'Entrez votre VMA, la distance de course et votre temps réalisé puis cliquez sur Calculer pour obtenir votre Indice d’Endurance (échelle de -4 à -12) et savoir s’il faut travailler le Seuil ou la VMA.',
    subEn: 'Enter your MAS, race distance, and finish time, then click Calculate to get your Endurance Index (-4 to -12 scale) and determine whether to prioritize Threshold or MAS.',
    subAr: 'أدخل سرعة VMA ومسافة السباق والزمن المحقق ثم اضغط على "احسب" لمعرفة مؤشر التحمل (من -4 إلى -12) وتشخيص أولوية تدريبك.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Votre VMA & Votre Performance sur Distance" data-i18n-en="1. Your MAS & Race Performance" data-i18n-ar="1. سرعة VMA والنتيجة المحققة في السباق">1. Votre VMA & Votre Performance sur Distance</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">Péronnet & Thibault</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Votre VMA / MAS (km/h)" data-i18n-en="Your MAS / VMA (km/h)" data-i18n-ar="سرعة VMA (كم/س)">Votre VMA / MAS (km/h)</label>
          <input id="inp-vma" type="number" value="16.0" min="8" max="26" step="0.2" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Distance de course (mètres)" data-i18n-en="Race Distance (meters)" data-i18n-ar="مسافة السباق (بالمتر)">Distance de course (mètres)</label>
          <input id="inp-dist" type="number" value="10000" min="1500" max="42195" step="500" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Temps réalisé (en minutes, ex: 42.5)" data-i18n-en="Finish Time (in minutes, e.g. 42.5)" data-i18n-ar="الزمن المحقق (بالدقائق، مثلاً 42.5)">Temps réalisé (en minutes, ex: 42.5)</label>
          <input id="inp-min" type="number" value="42.5" min="4" max="360" step="0.5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>📈</span>
        <span data-i18n-fr="Calculer mon Indice d'Endurance (IE) & mon Axe Prioritaire" data-i18n-en="Calculate My Endurance Index (EI) & Training Priority" data-i18n-ar="احسب مؤشر التحمل (IE) وأولوية التدريب">Calculer mon Indice d'Endurance (IE) & mon Axe Prioritaire</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Indicateurs d'Endurance & Interprétation Scientifique" data-i18n-en="2. Endurance Metrics & Scientific Interpretation" data-i18n-ar="2. مؤشرات التحمل والتفسير العلمي">2. Vos Indicateurs d'Endurance & Interprétation Scientifique</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Indice d'Endurance (IE)" data-i18n-en="Endurance Index (EI)" data-i18n-ar="مؤشر التحمل (IE)">Indice d'Endurance (IE)</div>
            <div id="out-ie" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-ie-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="% de VMA Soutenu" data-i18n-en="Sustained % of MAS" data-i18n-ar="نسبة VMA المحافظ عليها">% de VMA Soutenu</div>
            <div id="out-pct" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-pct-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Vitesse & Allure Moyenne" data-i18n-en="Average Race Speed & Pace" data-i18n-ar="السرعة والإيقاع المتوسط">Vitesse & Allure Moyenne</div>
            <div id="out-spd" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-spd-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
        </div>

        <div id="out-ie-diag" class="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var vma = parseFloat(document.getElementById('inp-vma').value) || 16;
      var dist = parseFloat(document.getElementById('inp-dist').value) || 10000;
      var min = parseFloat(document.getElementById('inp-min').value) || 42.5;
      var spd = (dist / (min * 60)) * 3.6;
      var pct = (spd / vma) * 100;
      var ie = (pct - 100) / Math.log(Math.max(1.15, (min * 60) / 360));
      var secKm = Math.round(3600 / spd);
      var paceStr = Math.floor(secKm / 60) + ':' + String(secKm % 60).padStart(2, '0') + ' /km';

      document.getElementById('out-ie').textContent = ie.toFixed(1);
      document.getElementById('out-pct').textContent = pct.toFixed(1) + ' %';
      document.getElementById('out-spd').textContent = spd.toFixed(1) + ' km/h';

      var tierFr = ie >= -5.5 ? 'Endurance Élite / Exceptionnelle' : ie >= -7.0 ? 'Bonne Endurance Aérobie' : ie >= -8.8 ? 'Endurance Moyenne (Seuil à renforcer)' : 'Déficit d’Endurance marqué';
      var tierEn = ie >= -5.5 ? 'Elite / Exceptional Endurance' : ie >= -7.0 ? 'Good Aerobic Endurance' : ie >= -8.8 ? 'Moderate Endurance (Build Threshold)' : 'Low Endurance Index';
      var tierAr = ie >= -5.5 ? 'تحمل ممتاز / نخبة' : ie >= -7.0 ? 'تحمل هوائي جيد' : ie >= -8.8 ? 'تحمل متوسط (يحتاج تقوية العتبة)' : 'نقص واضح في التحمل';

      if (currentLang === 'fr') {
        document.getElementById('out-ie-meaning').textContent = tierFr + ' (échelle -4 à -12)';
        document.getElementById('out-pct-meaning').textContent = 'Fraction de VMA tenue pendant ' + min + ' min';
        document.getElementById('out-spd-meaning').textContent = 'Allure moyenne : ' + paceStr;
      } else if (currentLang === 'en') {
        document.getElementById('out-ie-meaning').textContent = tierEn + ' (-4 to -12 scale)';
        document.getElementById('out-pct-meaning').textContent = 'Fraction of MAS held for ' + min + ' min';
        document.getElementById('out-spd-meaning').textContent = 'Average pace: ' + paceStr;
      } else {
        document.getElementById('out-ie-meaning').textContent = tierAr + ' (سلم -4 إلى -12)';
        document.getElementById('out-pct-meaning').textContent = 'نسبة VMA المحافظ عليها لمدة ' + min + ' دقيقة';
        document.getElementById('out-spd-meaning').textContent = 'الإيقاع المتوسط: ' + paceStr;
      }

      var diag = document.getElementById('out-ie-diag');
      if (currentLang === 'fr') {
        diag.innerHTML = '<p><strong>📊 Modèle de Péronnet & Thibault :</strong> L’Indice d’Endurance mesure la pente de décroissance de votre vitesse avec la durée. Avec <strong>IE = ' + ie.toFixed(1) + '</strong> (' + tierFr + '), vous avez soutenu <strong>' + pct.toFixed(1) + ' %</strong> de votre VMA sur ' + dist + ' m.</p><p><strong>🎯 Orientation Prioritaire de l’Entraînement :</strong> ' + (ie >= -6.8 ? 'Votre capacité à soutenir un haut % de VMA est déjà très élevée (Seuil SV2 fort). Pour progresser, votre priorité est de <strong>développer le plafond de votre VMA</strong> (séances en Zone I à 100–105% VMA).' : 'Votre VMA est sous-exploitée sur la durée. Priorisez les séances au <strong>Seuil Anaérobie (3 × 8 min à 85–88% VMA)</strong> et augmentez le volume en Endurance Fondamentale (Zone 2).') + '</p>';
      } else if (currentLang === 'en') {
        diag.innerHTML = '<p><strong>📊 Péronnet & Thibault Model:</strong> With <strong>EI = ' + ie.toFixed(1) + '</strong> (' + tierEn + '), you sustained <strong>' + pct.toFixed(1) + '%</strong> of your MAS over ' + dist + ' m.</p><p><strong>🎯 Training Priority:</strong> ' + (ie >= -6.8 ? 'Your fractional utilization is already high. Focus on raising your <strong>MAS ceiling</strong> (VO2 Max intervals at 100–105% MAS).' : 'Your MAS is under-utilized over distance. Prioritize <strong>Lactate Threshold blocks (3 × 8 min at 85–88% MAS)</strong> and Zone 2 volume.') + '</p>';
      } else {
        diag.innerHTML = '<p><strong>📊 نموذج بيروني وتيبو:</strong> يقيس مؤشر التحمل مدى قدرتك على الحفاظ على نسبة عالية من VMA مع زيادة المسافة. حصلت على <strong>IE = ' + ie.toFixed(1) + '</strong> (' + tierAr + ') وحافظت على <strong>' + pct.toFixed(1) + '%</strong> من VMA.</p><p><strong>🎯 أولوية التدريب:</strong> ' + (ie >= -6.8 ? 'عتبتك اللاهوائية ممتازة؛ ركز الآن على <strong>رفع سقف VMA</strong> عبر التمارين المتقطعة (100–105% VMA).' : 'قدرتك على استغلال VMA في المسافات الطويلة تحتاج دعماً؛ ركز على <strong>حصص العتبة اللاهوائية (85–88% VMA)</strong> والتحمل الأساسي.') + '</p>';
      }
    }`,
  },

  // 9. Allure Pente (GAP) & Nutrition
  {
    filename: 'calculateur-gap-pente-nutrition.html',
    seoTitle: "Calculateur Allure Pente GAP & Glucides | Prof EPS",
    seoDesc: "Convertissez votre effort en dénivelé en allure équivalente sur le plat (Minetti) et planifiez vos apports glucidiques.",
    keywordsFr: 'calculateur gap allure pente trail, cout energetique pente minetti, glucides par heure marathon trail, nutrition course à pied',
    clusterBadgeFr: 'Cluster 2D · Biomécanique de la Pente (GAP) & Nutrition d’Endurance',
    clusterBadgeEn: 'Cluster 2D · Grade Adjusted Pace (GAP) & Race Fueling Strategy',
    clusterBadgeAr: 'القطب 2D · تعديل الإيقاع حسب الانحدار (GAP) والتغذية الرياضية',
    titleFr: 'Calculateur d’Allure Ajustée à la Pente (GAP) & Plan Ravitaillement Glucides',
    titleEn: 'Grade Adjusted Pace (GAP) & Endurance Carbohydrate/Fluid Calculator',
    titleAr: 'حاسبة تعديل الإيقاع حسب المرتفعات والانحدار (GAP) وخطة التغذية',
    subFr: 'Indiquez le pourcentage de pente, votre allure sur le plat et la durée de l’épreuve puis cliquez sur Calculer pour obtenir votre allure cible en côte/descente (modèle Minetti) et vos besoins en glucides.',
    subEn: 'Enter slope gradient %, flat pace, and race duration, then click Calculate to get your uphill/downhill target pace (Minetti model) and hourly carb intake.',
    subAr: 'أدخل نسبة الانحدار (%) وإيقاعك في الأرض المنبسطة ومدة السباق ثم اضغط على "احسب" لمعرفة الإيقاع المستهدف وخطة الكربوهيدرات.',
    bodyHtml: `<div class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider" data-i18n-fr="1. Pente du Parcours, Allure Plat & Durée" data-i18n-en="1. Slope Gradient, Flat Pace & Duration" data-i18n-ar="1. نسبة الانحدار والإيقاع المنبسط والمدة">1. Pente du Parcours, Allure Plat & Durée</h2>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">Minetti GAP · CHO g/h</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Pente (% positif montée / négatif descente)" data-i18n-en="Slope Gradient (% uphill / -% downhill)" data-i18n-ar="نسبة الانحدار (% صعود / -% هبوط)">Pente (% positif montée / négatif descente)</label>
          <input id="inp-slope" type="number" value="6" min="-25" max="35" step="1" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Allure sur le plat (sec/km, ex: 270 = 4:30/km)" data-i18n-en="Flat Pace (sec/km, e.g. 270 = 4:30/km)" data-i18n-ar="الإيقاع في المنبسط (ثانية/كم، 270 = 4:30)">Allure sur le plat (sec/km, ex: 270 = 4:30/km)</label>
          <input id="inp-pace" type="number" value="270" min="150" max="600" step="5" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5" data-i18n-fr="Durée totale de l'effort (minutes)" data-i18n-en="Total Effort Duration (minutes)" data-i18n-ar="المدة الإجمالية للجهد (بالدقائق)">Durée totale de l'effort (minutes)</label>
          <input id="inp-dur" type="number" value="120" min="20" max="600" step="15" oninput="onInputUpdated()" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold" />
        </div>
      </div>

      <button type="button" id="btn-calc-main" onclick="triggerCalculation()" class="peps-cta-btn">
        <span>⛰️</span>
        <span data-i18n-fr="Calculer mon Allure Pente (GAP) & mon Plan Nutritionnel" data-i18n-en="Calculate My Grade Adjusted Pace (GAP) & Fueling Plan" data-i18n-ar="احسب إيقاع المنحدرات (GAP) وخطة التغذية الرياضية">Calculer mon Allure Pente (GAP) & mon Plan Nutritionnel</span>
      </button>
    </div>

    <div id="tool-results-panel" class="hidden space-y-6">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3" data-i18n-fr="2. Vos Résultats Biomécaniques & Nutritionnels Interprétés" data-i18n-en="2. Biomechanical & Nutritional Results Explained" data-i18n-ar="2. النتائج البيوميكانيكية والغذائية مع التفسير">2. Vos Résultats Biomécaniques & Nutritionnels Interprétés</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-blue-900" data-i18n-fr="Allure Cible dans la Pente" data-i18n-en="Target Pace on Slope" data-i18n-ar="الإيقاع المستهدف في المنحدر">Allure Cible dans la Pente</div>
            <div id="out-gap" dir="ltr" class="text-3xl font-black font-mono text-blue-700 tabular-nums">--</div>
            <div id="out-gap-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-blue-100"></div>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-red-900" data-i18n-fr="Variation du Coût Énergétique" data-i18n-en="Energy Cost Delta (Minetti)" data-i18n-ar="تغير التكلفة الطاقية (Minetti)">Variation du Coût Énergétique</div>
            <div id="out-cost" dir="ltr" class="text-3xl font-black font-mono text-red-700 tabular-nums">--</div>
            <div id="out-cost-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-red-100"></div>
          </div>
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div class="text-xs font-extrabold uppercase text-emerald-900" data-i18n-fr="Apport Glucidique (CHO)" data-i18n-en="Carbohydrate Intake (CHO)" data-i18n-ar="الحاجيات من الكربوهيدرات">Apport Glucidique (CHO)</div>
            <div id="out-carbs" dir="ltr" class="text-3xl font-black font-mono text-emerald-700 tabular-nums">--</div>
            <div id="out-carbs-meaning" class="text-xs font-semibold text-slate-700 bg-white/80 rounded-lg p-2 border border-emerald-100"></div>
          </div>
        </div>

        <div id="out-gap-interp" class="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2"></div>
      </div>
    </div>`,
    scriptJs: `function computeTool() {
      var slope = parseFloat(document.getElementById('inp-slope').value) || 0;
      var baseSec = parseFloat(document.getElementById('inp-pace').value) || 270;
      var dur = parseFloat(document.getElementById('inp-dur').value) || 120;

      var factor = slope >= 0 ? (1 + slope * 0.033 + slope * slope * 0.0012) : Math.max(0.84, 1 + slope * 0.018);
      var adjSec = Math.round(baseSec * factor);
      var costPct = (factor - 1) * 100;
      var m = Math.floor(adjSec / 60), s = String(adjSec % 60).padStart(2, '0');
      var bm = Math.floor(baseSec / 60), bs = String(baseSec % 60).padStart(2, '0');
      var carbsPerH = dur <= 60 ? 30 : dur <= 150 ? 60 : 90;
      var totalCarbs = Math.round((carbsPerH * dur) / 60);

      document.getElementById('out-gap').textContent = m + ':' + s + ' /km';
      document.getElementById('out-cost').textContent = (costPct >= 0 ? '+' : '') + costPct.toFixed(1) + ' %';
      document.getElementById('out-carbs').textContent = carbsPerH + ' g/h';

      if (currentLang === 'fr') {
        document.getElementById('out-gap-meaning').textContent = 'Équivalent plat : ' + bm + ':' + bs + ' /km';
        document.getElementById('out-cost-meaning').textContent = slope >= 0 ? 'Travail concentrique de montée' : 'Travail excentrique de descente';
        document.getElementById('out-carbs-meaning').textContent = 'Total épreuve (' + dur + ' min) : ~' + totalCarbs + ' g de glucides';
      } else if (currentLang === 'en') {
        document.getElementById('out-gap-meaning').textContent = 'Flat equivalent: ' + bm + ':' + bs + ' /km';
        document.getElementById('out-cost-meaning').textContent = slope >= 0 ? 'Concentric uphill cost' : 'Eccentric downhill braking';
        document.getElementById('out-carbs-meaning').textContent = 'Total event (' + dur + ' min): ~' + totalCarbs + ' g carbs';
      } else {
        document.getElementById('out-gap-meaning').textContent = 'المكافئ في المنبسط: ' + bm + ':' + bs + ' /كم';
        document.getElementById('out-cost-meaning').textContent = slope >= 0 ? 'جهد عضلي صاعد' : 'انقباض لا مركزي هابط';
        document.getElementById('out-carbs-meaning').textContent = 'إجمالي السباق (' + dur + ' د): ~' + totalCarbs + ' غ كربوهيدرات';
      }

      var box = document.getElementById('out-gap-interp');
      if (currentLang === 'fr') {
        box.innerHTML = '<p><strong>⛰️ Biomécanique de Minetti (Pente ' + slope + ' %) :</strong> Courir à <strong>' + m + ':' + s + ' /km</strong> sur une pente de <strong>' + slope + ' %</strong> demande exactement la même dépense métabolique que courir à <strong>' + bm + ':' + bs + ' /km</strong> sur le plat. En montée, augmentez la fréquence de foulée (cadence ~175–185 ppm) en réduisant l’amplitude.</p><p><strong>🍌 Stratégie Ravitaillement (' + dur + ' min) :</strong> Consommez <strong>' + carbsPerH + ' g de glucides/heure</strong> (soit ~1 gel ou 500 ml de boisson isotonique toutes les 25–30 minutes) pour prévenir la déplétion du glycogène hépatique et musculaire.</p>';
      } else if (currentLang === 'en') {
        box.innerHTML = '<p><strong>⛰️ Minetti Slope Biomechanics (' + slope + '% grade):</strong> Running at <strong>' + m + ':' + s + ' /km</strong> on a <strong>' + slope + '%</strong> grade requires the exact same metabolic power as <strong>' + bm + ':' + bs + ' /km</strong> on flat ground. Shorten your stride and keep cadence high.</p><p><strong>🍌 Fueling Strategy (' + dur + ' min):</strong> Target <strong>' + carbsPerH + ' g/h of carbohydrates</strong> (~' + totalCarbs + ' g total) to prevent glycogen depletion.</p>';
      } else {
        box.innerHTML = '<p><strong>⛰️ بيوميكانيك الانحدار (نموذج Minetti عند ' + slope + '%):</strong> الجري بإيقاع <strong>' + m + ':' + s + ' /كم</strong> في منحدر <strong>' + slope + '%</strong> يتطلب نفس الطاقة الفيزيولوجية للجري بإيقاع <strong>' + bm + ':' + bs + ' /كم</strong> على أرض منبسطة.</p><p><strong>🍌 خطة التغذية (' + dur + ' دقيقة):</strong> تناول <strong>' + carbsPerH + ' غرام كربوهيدرات في الساعة</strong> (إجمالي ~' + totalCarbs + ' غ) لتفادي نفاد الجليكوجين العضلي.</p>';
      }
    }`,
  },

  // 10. Hub Central des 3 Clusters
  {
    filename: 'hub-outils-sport-performance.html',
    seoTitle: "Calculateurs Sport & Physiologie EPS | Prof EPS",
    seoDesc: "Accédez aux 9 calculateurs sportifs interactifs : VO2 Max, Karvonen, ACWR, HIIT, VDOT, ASR et nutrition pour l’EPS et le running.",
    keywordsFr: 'calculateur vo2 max, calculateur vma, calculer vo2max course à pied, vdot jack daniels, fréquence cardiaque karvonen, imc sportif, préparation physique eps',
    clusterBadgeFr: '🧭 Hub Scientifique · 3 Clusters Sport & EPS',
    clusterBadgeEn: '🧭 Scientific Hub · 3 Sports & PE Calculator Clusters',
    clusterBadgeAr: '🧭 البوابة العلمية · 3 أقطاب لحاسبات الرياضة والتربية البدنية',
    titleFr: 'Tous les Calculateurs VO2 Max, VMA, Physiologie & Préparation Physique',
    titleEn: 'All VO2 Max, MAS, Physiology & Physical Conditioning Calculators',
    titleAr: 'جميع حاسبات VO2 Max و VMA والفسيولوجيا والإعداد البدني',
    subFr: 'Accédez directement à chaque calculateur interactif avec interprétation scientifique par indicateur et conseils pédagogiques pour l’EPS et l’entraînement.',
    subEn: 'Access every interactive calculator with per-metric scientific interpretation and coaching advice for PE and endurance training.',
    subAr: 'انتقل مباشرة إلى كل حاسبة تفاعلية مع تفسير علمي لكل رقم ونصائح تطبيقية لحصص التربية البدنية والتدريب الرياضي.',
    bodyHtml: `<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <a href="calculateur-vma.html" class="bg-white border-2 border-red-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-white bg-red-600 px-2.5 py-1 rounded-full" data-i18n-fr="Outil Phare · VMA" data-i18n-en="Flagship Tool · MAS" data-i18n-ar="الأداة الرئيسية · VMA">Outil Phare · VMA</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="⚡ Calculateur de VMA, Tests Terrain & Allures" data-i18n-en="⚡ MAS (VMA) Field Tests & Paces Calculator" data-i18n-ar="⚡ حاسبة السرعة الهوائية القصوى (VMA) والاختبارات الميدانية">⚡ Calculateur de VMA, Tests Terrain & Allures</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Luc Léger, Demi-Cooper, Vameval, 5 zones d'allures et programmation de séances EPS." data-i18n-en="Beep test, 6-min Cooper, Vameval, 5 pace zones and PE session builder." data-i18n-ar="اختبارات لوك ليجير ونصف كوبر وفاميفال مع حساب الإيقاعات والحصص التدريبية.">Luc Léger, Demi-Cooper, Vameval, 5 zones d'allures et programmation de séances EPS.</p>
      </a>

      <a href="calculateur-vdot-asr-endurance.html" class="bg-white border border-slate-200 hover:border-red-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Cluster 1A · VO2 Max</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="🫁 Calculateur de VO2 Max (ml/kg/min) & VDOT" data-i18n-en="🫁 VO2 Max (ml/kg/min) & VDOT Calculator" data-i18n-ar="🫁 حاسبة VO2 Max (مل/كغ/دقيقة) ومؤشر VDOT">🫁 Calculateur de VO2 Max (ml/kg/min) & VDOT</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Consommation maximale d'oxygène, barème ACSM par âge/sexe, 5 zones VDOT et chronos prédits." data-i18n-en="Maximal oxygen uptake, ACSM age/sex norms, 5 VDOT pace zones and race predictions." data-i18n-ar="الحد الأقصى لاستهلاك الأكسجين، تصنيف ACSM حسب العمر والجنس وتوقعات السباقات.">Consommation maximale d'oxygène, barème ACSM par âge/sexe, 5 zones VDOT et chronos prédits.</p>
      </a>

      <a href="calculateur-asr-reserve-vitesse.html" class="bg-white border border-slate-200 hover:border-red-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Cluster 1B · Réserve ASR</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="🚀 Calculateur de Réserve Anaérobie (ASR)" data-i18n-en="🚀 Anaerobic Speed Reserve (ASR) Calculator" data-i18n-ar="🚀 حاسبة احتياطي السرعة اللاهوائية (ASR)">🚀 Calculateur de Réserve Anaérobie (ASR)</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Écart entre Sprint Max (MSS) et VMA pour individualiser le travail supramaximal (10% à 50% ASR)." data-i18n-en="Gap between Max Sprint Speed (MSS) and MAS to individualize supramaximal HIIT." data-i18n-ar="الفارق بين أقصى سرعة سبرينت و VMA لتخصيص التمارين فوق القصوى.">Écart entre Sprint Max (MSS) et VMA pour individualiser le travail supramaximal (10% à 50% ASR).</p>
      </a>

      <a href="calculateur-indice-endurance.html" class="bg-white border border-slate-200 hover:border-red-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Cluster 1C · Modèle Péronnet</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="📈 Calculateur d'Indice d'Endurance (IE)" data-i18n-en="📈 Endurance Index (EI - Péronnet) Calculator" data-i18n-ar="📈 حاسبة مؤشر التحمل (IE - بيروني)">📈 Calculateur d'Indice d'Endurance (IE)</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Mesurez le % de VMA soutenu sur la durée et diagnostiquez votre profil Seuil Anaérobie vs VMA." data-i18n-en="Measure fractional MAS utilization and diagnose Threshold vs MAS priority." data-i18n-ar="قياس نسبة VMA المحافظ عليها وتشخيص أولوية العتبة اللاهوائية مقابل VMA.">Mesurez le % de VMA soutenu sur la durée et diagnostiquez votre profil Seuil Anaérobie vs VMA.</p>
      </a>

      <a href="calculateur-frequence-cardiaque-karvonen.html" class="bg-white border border-slate-200 hover:border-emerald-700 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Cluster 2A · Cardiologie</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="❤️ Fréquence Cardiaque & Zones Karvonen" data-i18n-en="❤️ Heart Rate Reserve & Karvonen Zones" data-i18n-ar="❤️ نبضات القلب ومناطق التدريب (Karvonen)">❤️ Fréquence Cardiaque & Zones Karvonen</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="FC Max (Tanaka), FC de Réserve (HRR), tonus vagal et les 5 zones cardiaques Z1 à Z5 expliquées." data-i18n-en="Tanaka Max HR, Heart Rate Reserve (HRR), vagal tone and explained Z1–Z5 zones." data-i18n-ar="أقصى نبض للقلب، احتياطي النبض، وتفسير مناطق التدريب القلبية من Z1 إلى Z5.">FC Max (Tanaka), FC de Réserve (HRR), tonus vagal et les 5 zones cardiaques Z1 à Z5 expliquées.</p>
      </a>

      <a href="calculateur-imc-sportif-masse-grasse.html" class="bg-white border border-slate-200 hover:border-emerald-700 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Cluster 2B · Anthropométrie</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="⚖️ Calculateur IMC Sportif & Masse Grasse (IMG)" data-i18n-en="⚖️ Athletic BMI, Body Fat % & Lean Mass" data-i18n-ar="⚖️ حاسبة مؤشر كتلة الجسم ونسبة الدهون للرياضي">⚖️ Calculateur IMC Sportif & Masse Grasse (IMG)</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Double lecture OMS + Athlète (distinction masse musculaire active vs masse adipeuse)." data-i18n-en="Dual WHO + Athletic reading (active lean mass vs body fat and running economy)." data-i18n-ar="قراءة مزدوجة وفق منظمة الصحة العالمية والملف العضلي للرياضي.">Double lecture OMS + Athlète (distinction masse musculaire active vs masse adipeuse).</p>
      </a>

      <a href="calculateur-chaleur-meteo-altitude.html" class="bg-white border border-slate-200 hover:border-emerald-700 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Cluster 2C · Thermorégulation</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="☀️ Chaleur, Humidité (Rosée) & Altitude" data-i18n-en="☀️ Heat, Dew Point & Altitude Calculator" data-i18n-ar="☀️ تأثير الحرارة والرطوبة والارتفاع عن البحر">☀️ Chaleur, Humidité (Rosée) & Altitude</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Point de rosée, ralentissement d'allure (%) et plan d'hydratation / sodium par heure." data-i18n-en="Dew point, pace slowdown (%) and hourly fluid/sodium replacement plan." data-i18n-ar="نقطة الندى، نسبة تباطؤ الإيقاع، وخطة شرب الماء والصوديوم في الساعة.">Point de rosée, ralentissement d'allure (%) et plan d'hydratation / sodium par heure.</p>
      </a>

      <a href="calculateur-gap-pente-nutrition.html" class="bg-white border border-slate-200 hover:border-emerald-700 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">Cluster 2D · Trail & Nutrition</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="⛰️ Allure Ajustée à la Pente (GAP) & Glucides" data-i18n-en="⛰️ Grade Adjusted Pace (GAP) & Carb Fueling" data-i18n-ar="⛰️ إيقاع المنحدرات (GAP) والتغذية الرياضية">⛰️ Allure Ajustée à la Pente (GAP) & Glucides</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Conversion des pentes positives/négatives (%) en effort plat (Minetti) et glucides (g/h)." data-i18n-en="Uphill/downhill grade conversion (Minetti) and hourly carbohydrate intake." data-i18n-ar="تحويل الصعود والهبوط (%) إلى إيقاع مكافئ وخطة الكربوهيدرات في الساعة.">Conversion des pentes positives/négatives (%) en effort plat (Minetti) et glucides (g/h).</p>
      </a>

      <a href="generateur-intermittent-hiit-cod.html" class="bg-white border border-slate-200 hover:border-blue-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full">Cluster 3A/B · Terrain & EPS</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="🔄 Intermittent HIIT & Navettes COD 180°" data-i18n-en="🔄 HIIT Intervals & 180° Shuttle COD" data-i18n-ar="🔄 التمارين المتقطعة HIIT ومكوك 180°">🔄 Intermittent HIIT & Navettes COD 180°</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Distances de plots pour 15s/15s, 30s/30s sur piste ou avec relances 180° (modèle Buchheit)." data-i18n-en="Cone distances for 15s/15s, 30s/30s on track or with 180° shuttle turns (Buchheit)." data-i18n-ar="مسافات الأقماع لتمارين 15/15 و 30/30 على المضمار أو مع تغيير الاتجاه 180°.">Distances de plots pour 15s/15s, 30s/30s sur piste ou avec relances 180° (modèle Buchheit).</p>
      </a>

      <a href="calculateur-charge-rpe-foster-acwr.html" class="bg-white border border-slate-200 hover:border-blue-600 rounded-2xl p-5 shadow-sm transition hover:shadow-md block">
        <span class="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full">Cluster 3C · Monitoring</span>
        <h2 class="text-base font-extrabold text-slate-900 mt-2.5" data-i18n-fr="🛡️ Charge RPE Foster & Ratio ACWR Blessures" data-i18n-en="🛡️ Foster sRPE Load & ACWR Injury Ratio" data-i18n-ar="🛡️ حمل التدريب (Foster RPE) ونسبة ACWR">🛡️ Charge RPE Foster & Ratio ACWR Blessures</h2>
        <p class="text-xs text-slate-600 mt-1.5" data-i18n-fr="Charge aiguë (7j) vs chronique (28j) et maintien dans la zone optimale (ACWR 0.80–1.30)." data-i18n-en="Acute (7d) vs chronic (28d) workload ratio to stay inside the 0.80–1.30 sweet spot." data-i18n-ar="مقارنة الحمل الحاد بالمزمن للبقاء في المنطقة الآمنة للوقاية من الإصابات (0.80–1.30).">Charge aiguë (7j) vs chronique (28j) et maintien dans la zone optimale (ACWR 0.80–1.30).</p>
      </a>
    </div>`,
    scriptJs: `function computeTool() {}`,
  },
];

// Écriture des 10 pages dans le dossier racine (et dans /public s'il existe)
const targetDirs = [rootDir];
const pubDir = path.join(rootDir, 'public');
if (fs.existsSync(pubDir)) {
  targetDirs.push(pubDir);
}

console.log('\n======================================================');
console.log('🚀 GÉNÉRATION DES 10 PAGES D\'OUTILS INTERACTIFS (MODE VMA)');
console.log('======================================================\n');

PAGES.forEach((pageConfig) => {
  const fullHtml = buildPageHtml(pageConfig);
  targetDirs.forEach((dir) => {
    const outPath = path.join(dir, pageConfig.filename);
    fs.writeFileSync(outPath, fullHtml, 'utf8');
    console.log(`✅ [OUTIL GÉNÉRÉ] -> ${path.relative(rootDir, outPath)}`);
  });
});

console.log('\n🎉 Les 10 pages ont été régénérées avec le bouton Calculer, les interprétations FR/EN/AR et le Footer corrigé !\n');
})();
