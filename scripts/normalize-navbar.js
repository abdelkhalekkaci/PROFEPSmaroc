/**
 * normalize-navbar.js
 * Standardise le CSS + HTML + JS du navbar sur toutes les pages HTML.
 * - 3-col grid layout identique sur toutes les pages
 * - Bouton Connexion (outlined rouge) et CTA (gradient) même taille, même radius
 * - nav-right à l'extrême droite avec les deux boutons
 * - Mobile hamburger cohérent
 * - auth-shared.js injecté si absent
 */

const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '../public');
const files = fs.readdirSync(PUBLIC).filter(f => f.endsWith('.html'));

// ─── CSS CANONIQUE ────────────────────────────────────────────────────────────
const NAVBAR_CSS = `        /* ═══ NAVBAR CANONIQUE ═══ */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 2rem; background: rgba(255,255,255,0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(226,232,240,0.7); transition: all 0.3s ease; }
        .navbar.scrolled { padding: 0.5rem 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: rgba(255,255,255,0.99); }
        .nav-container { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
        .nav-logo { justify-self: start; display: flex; align-items: center; }
        .nav-logo img { height: 56px; transition: all 0.3s ease; }
        .navbar.scrolled .nav-logo img { height: 46px; }
        .nav-menu { display: flex; align-items: center; justify-content: center; gap: 1.5rem; }
        .nav-right { justify-self: end; display: flex; align-items: center; gap: 0.75rem; }
        .nav-link { font-size: 0.9375rem; font-weight: 500; color: #4a4a68; padding: 0.5rem; position: relative; transition: color 0.3s ease; text-decoration: none; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%; height: 2px; background: linear-gradient(90deg, #c1272d, #006233); border-radius: 2px; transition: left 0.3s ease, right 0.3s ease; }
        .nav-link:hover::after, .nav-link.active::after { left: 0; right: 0; }
        .nav-link:hover, .nav-link.active { color: #c1272d; }
        .nav-btn-login { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.25rem; background: transparent; color: #c1272d; font-weight: 600; font-size: 0.9375rem; border-radius: 9999px; border: 2px solid #c1272d; transition: all 0.3s ease; text-decoration: none; white-space: nowrap; line-height: 1.4; }
        .nav-btn-login:hover { background: #c1272d; color: white; box-shadow: 0 4px 14px rgba(193,39,45,0.3); transform: translateY(-1px); }
        .nav-cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.25rem; background: linear-gradient(135deg, #c1272d, #006233); color: white; font-weight: 600; font-size: 0.9375rem; border-radius: 9999px; border: 2px solid transparent; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none; white-space: nowrap; line-height: 1.4; }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(193,39,45,0.3); }
        .nav-cta.nav-cta-mobile { display: none; }
        .nav-cta.nav-cta-desktop { display: inline-flex; }
        .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; width: 36px; height: 36px; justify-content: center; align-items: center; border-radius: 8px; transition: background 0.3s ease; }
        .nav-toggle:hover { background: rgba(193,39,45,0.06); }
        .nav-toggle span { display: block; width: 22px; height: 2px; background: #1a1a2e; border-radius: 2px; transition: transform 0.3s ease, opacity 0.3s ease; }
        .nav-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nav-backdrop { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 99; opacity: 0; transition: opacity 0.3s ease; }
        .nav-backdrop.active { display: block; opacity: 1; }
        .nav-user-menu { display: flex; align-items: center; gap: 0.5rem; }
        .nav-user-info { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.75rem 0.375rem 0.375rem; background: #f8f9fa; border-radius: 9999px; transition: all 0.3s ease; text-decoration: none; cursor: pointer; }
        .nav-user-info:hover { background: #f1f5f9; }
        .nav-user-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #c1272d, #006233); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.8125rem; flex-shrink: 0; }
        .nav-user-name { font-weight: 600; font-size: 0.875rem; color: #1a1a2e; }
        .nav-btn-logout { width: 36px; height: 36px; border-radius: 50%; background: #f8f9fa; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6b7280; transition: all 0.3s ease; }
        .nav-btn-logout:hover { background: #fee2e2; color: #c1272d; }
        @media (max-width: 768px) {
            .nav-container { display: flex; justify-content: space-between; }
            .nav-right { gap: 0.5rem; }
            .nav-menu { position: absolute; top: 100%; left: 1rem; right: 1rem; background: white; flex-direction: column; padding: 1.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.12); border-radius: 16px; gap: 0.5rem; transform: translateY(-10px); opacity: 0; pointer-events: none; transition: transform 0.3s ease, opacity 0.3s ease; z-index: 100; border: 1px solid #f1f5f9; justify-content: flex-start; align-items: flex-start; }
            .nav-menu.active { transform: translateY(0); opacity: 1; pointer-events: auto; }
            .nav-link { padding: 0.5rem 0; width: 100%; }
            .nav-link::after { bottom: 0; }
            .nav-toggle { display: flex; }
            .nav-cta.nav-cta-mobile { display: inline-flex; }
            .nav-cta.nav-cta-desktop { display: none; }
            .nav-btn-login { display: none; }
        }
        @media (max-width: 480px) {
            .navbar { padding: 0.75rem 1rem; }
            .navbar.scrolled { padding: 0.375rem 1rem; }
        }`;

// ─── JS CANONIQUE ────────────────────────────────────────────────────────────
const NAVBAR_JS = `    <script>
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });
        const navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        document.body.appendChild(navBackdrop);
        function toggleMenu() {
            const open = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', open);
            navBackdrop.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
            navToggle.setAttribute('aria-expanded', open);
        }
        function closeMenu() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
        navToggle.addEventListener('click', e => { e.stopPropagation(); toggleMenu(); });
        navBackdrop.addEventListener('click', closeMenu);
        document.addEventListener('click', e => { if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) closeMenu(); });
        navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(l => l.addEventListener('click', closeMenu));
    </script>`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const LOGIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`;

function getActiveLink(filename) {
  if (filename === 'index.html') return 'index';
  if (filename === 'blog.html') return 'blog';
  if (filename === 'generateur.html') return 'generateur';
  if (filename.startsWith('article-') || filename === 'bibliotheque-numerique-eps.html' || filename === 'orientations-pedagogiques-eps-2007-2009.html' || filename === 'ressources-atd.html') return 'blog';
  return '';
}

function buildNavMenu(active) {
  const a = (href, label, key) => {
    const cls = `nav-link${active === key ? ' active' : ''}`;
    return `                <a href="${href}" class="${cls}">${label}</a>`;
  };
  return [
    a('index.html', 'Accueil', 'index'),
    a('generateur.html', 'Générateur', 'generateur'),
    a('blog.html', 'Blog', 'blog'),
    `                <a href="generateur.html" class="nav-cta nav-cta-mobile"><span>✨</span> Créer un document</a>`
  ].join('\n');
}

function buildNavHTML(filename) {
  const active = getActiveLink(filename);
  return `    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">
                <img src="/images/prof_eps.png" alt="Prof EPS">
            </a>
            <div class="nav-menu" id="navMenu">
${buildNavMenu(active)}
            </div>
            <div class="nav-right">
                <a href="login.html" class="nav-btn-login" id="navLoginBtn" style="display:none">
                    ${LOGIN_ICON}
                    Connexion
                </a>
                <a href="generateur.html" class="nav-cta nav-cta-desktop"><span>✨</span> Créer un document</a>
                <div class="nav-user-menu" id="navUserMenu" style="display: none;"></div>
                <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu"><span></span><span></span><span></span></button>
            </div>
        </div>
    </nav>`;
}

// ─── CSS PATTERNS TO REMOVE ──────────────────────────────────────────────────
// All known navbar CSS lines that appear across the various page types
const NAV_CSS_PATTERNS = [
  /^\s*\.navbar\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.navbar\.scrolled\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-container\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-logo\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-logo\s+img\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.navbar\.scrolled\s+\.nav-logo\s+img\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-menu\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-right\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link::after\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link:hover::after[^}]*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link\.active::after\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link:hover[^}]*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-btn-login\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-btn-login:hover\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-cta\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-cta:hover\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-cta\.nav-cta-mobile\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-cta\.nav-cta-desktop\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-cta\.nav-cta-mobile\s*\{[^}]+\}\s*$/gm,
  /^\s*\.nav-toggle\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-toggle:hover\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-toggle\s+span\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-toggle\.active\s+span[^{]+\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-backdrop\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-backdrop\.active\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-user-menu\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-user-info\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-user-info:hover\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-user-avatar\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-user-name\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-btn-logout\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-btn-logout:hover\s*\{[^}]+\}\s*\n/gm,
  /^\s*\.nav-link-active\s*\{[^}]+\}\s*\n/gm,
];

// Single-line condensed variants (some pages pack multiple rules on one line)
const CONDENSED_SINGLE_LINE_PATTERNS = [
  /^\s*\.nav-toggle\.active span:nth-child\(\d\)\s*\{[^}]+\}\s*\n/gm,
];

// ─── PROCESS EACH FILE ────────────────────────────────────────────────────────
// Skip login.html — it has a custom layout
const SKIP = new Set(['login.html', 'google9e56188ccdfea7e9.html']);

let updated = 0;

files.forEach(filename => {
  if (SKIP.has(filename)) return;

  const filepath = path.join(PUBLIC, filename);
  let html = fs.readFileSync(filepath, 'utf8');

  // ── 1. Replace existing navbar <nav> block ──────────────────────────────
  // Match from <nav class="navbar" to the closing </nav>
  const navRegex = /<nav\s+class="navbar"[^>]*>[\s\S]*?<\/nav>/;
  const newNav = buildNavHTML(filename);
  if (navRegex.test(html)) {
    html = html.replace(navRegex, newNav);
  }

  // ── 2. Replace old navbar CSS inside <style> ────────────────────────────
  // Strategy: inject the canonical CSS block right before </style>
  // but first remove all old navbar-related rules

  // Remove old nav CSS patterns (multi-line rules)
  [...NAV_CSS_PATTERNS, ...CONDENSED_SINGLE_LINE_PATTERNS].forEach(pat => {
    html = html.replace(pat, '');
  });

  // Also remove the old "/* NAVBAR */" or "/* ── NAVBAR ──*/" comment markers
  html = html.replace(/^\s*\/\*[^*]*NAVBAR[^*]*\*\/\s*\n/gim, '');
  html = html.replace(/^\s*\/\* ═+[^*]*═+ \*\/\s*\n/gim, '');

  // Inject canonical CSS before first </style>
  if (html.includes('</style>') && !html.includes('NAVBAR CANONIQUE')) {
    html = html.replace('</style>', NAVBAR_CSS + '\n        </style>');
  }

  // ── 3. Replace old navbar JS ─────────────────────────────────────────────
  // Find the script block that contains navToggle logic and replace it
  const oldJsPatterns = [
    // Pattern A: standalone script with navToggle
    /<script>\s*const navbar[^<]*<\/script>/s,
    // Pattern B: simpler toggle
    /<script>\s*(?:const\s+)?navToggle[^<]*<\/script>/s,
    // Pattern C: window.addEventListener + navToggle
    /<script>\s*window\.addEventListener\('scroll'[^<]*navToggle[^<]*<\/script>/s,
  ];

  let jsReplaced = false;
  for (const pat of oldJsPatterns) {
    if (pat.test(html)) {
      html = html.replace(pat, NAVBAR_JS);
      jsReplaced = true;
      break;
    }
  }

  // If no JS found, inject before </body>
  if (!jsReplaced && html.includes('</body>') && !html.includes("navBackdrop = document.createElement")) {
    html = html.replace('</body>', NAVBAR_JS + '\n</body>');
  }

  // ── 4. Add auth-shared.js + supabase if missing ──────────────────────────
  if (!html.includes('auth-shared.js') && !html.includes('supabase-client.js')) {
    // Inject before </body>
    const authScripts = `    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="/js/auth-shared.js"></script>`;
    html = html.replace('</body>', authScripts + '\n</body>');
  }

  // ── 5. Fix login page's nav-link-active for login page ──────────────────
  if (filename === 'login.html') return; // already skipped above

  // Write result
  fs.writeFileSync(filepath, html, 'utf8');
  updated++;
});

console.log(`✅ Navbar normalized on ${updated} pages.`);
