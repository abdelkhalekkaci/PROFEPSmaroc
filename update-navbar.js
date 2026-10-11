/**
 * update-navbar.js
 * Script Node.js ciblant le dossier "public" (et la racine si des HTML y sont présents)
 * Corrige l'injection sur le dernier </body>, nettoie les anciens styles et affiche le menu déroulant sur 100% des pages.
 */

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const targetDir = fs.existsSync(path.join(rootDir, 'public'))
    ? path.join(rootDir, 'public')
    : rootDir;

console.log('\n======================================================');
console.log('🚀 UNIFICATEUR DE NAVBAR + MENU DÉROULANT — PROF EPS MAROC');
console.log('📂 Dossier scanné :', targetDir);
console.log('======================================================\n');

const TOOL_NAV_LABELS = {
    'calculateur-vma.html': 'Calculateur VMA',
    'hub-outils-sport-performance.html': 'Hub Calculateurs Sport',
    'calculateur-vdot-asr-endurance.html': 'Calculateur VO2 Max',
    'calculateur-asr-reserve-vitesse.html': 'Calculateur ASR',
    'calculateur-indice-endurance.html': "Indice d'Endurance",
    'calculateur-frequence-cardiaque-karvonen.html': 'Fréquence Cardiaque',
    'calculateur-imc-sportif-masse-grasse.html': 'Calculateur IMC Sport',
    'calculateur-chaleur-meteo-altitude.html': 'Chaleur & Altitude',
    'calculateur-gap-pente-nutrition.html': 'Allure Pente (GAP)',
    'generateur-intermittent-hiit-cod.html': 'Intermittent HIIT & COD',
    'calculateur-charge-rpe-foster-acwr.html': 'Charge RPE & ACWR'
};

const DROPDOWN_ITEMS = [
    { href: 'hub-outils-sport-performance.html', label: '🧭 Hub de Tous les Calculateurs Sport', isHub: true },
    { href: 'calculateur-vma.html', label: '⚡ Calculateur VMA & Allures' },
    { href: 'calculateur-vdot-asr-endurance.html', label: '🫁 Calculateur VO2 Max & VDOT' },
    { href: 'calculateur-asr-reserve-vitesse.html', label: '🚀 Réserve de Vitesse Anaérobie (ASR)' },
    { href: 'calculateur-indice-endurance.html', label: "📈 Indice d'Endurance (Péronnet)" },
    { href: 'calculateur-frequence-cardiaque-karvonen.html', label: '❤️ Fréquence Cardiaque (Karvonen)' },
    { href: 'calculateur-imc-sportif-masse-grasse.html', label: '⚖️ Calculateur IMC & Masse Grasse' },
    { href: 'calculateur-chaleur-meteo-altitude.html', label: '☀️ Chaleur, Humidité & Altitude' },
    { href: 'calculateur-gap-pente-nutrition.html', label: '⛰️ Allure Pente (GAP) & Nutrition' },
    { href: 'generateur-intermittent-hiit-cod.html', label: '🔄 Intermittent HIIT & COD 180°' },
    { href: 'calculateur-charge-rpe-foster-acwr.html', label: '🛡️ Charge RPE Foster & ACWR' }
];

const NAVBAR_CSS_BLOCK = `
/* ═══ NAVBAR CANONIQUE UNIFIÉE + DROPDOWN ═══ */
.navbar, #navbar { 
    position: fixed !important; 
    top: 0 !important; 
    left: 0 !important; 
    right: 0 !important; 
    z-index: 10000 !important; 
    padding: 0.9rem 2rem !important; 
    background: rgba(255,255,255,0.97) !important; 
    backdrop-filter: blur(20px) !important; 
    -webkit-backdrop-filter: blur(20px) !important; 
    border-bottom: 1px solid rgba(226,232,240,0.8) !important; 
    transition: all 0.3s ease !important;
    overflow: visible !important;
    height: auto !important;
}
.navbar.scrolled, #navbar.scrolled { 
    padding: 0.55rem 2rem !important; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; 
    background: rgba(255,255,255,0.99) !important; 
}
.nav-container, #navbar .nav-container { 
    max-width: 1400px !important; 
    margin: 0 auto !important; 
    display: grid !important; 
    grid-template-columns: 1fr auto 1fr !important; 
    align-items: center !important;
    overflow: visible !important;
}
.nav-logo, #navbar .nav-logo { 
    justify-self: start !important; 
    display: flex !important; 
    align-items: center !important; 
}
.nav-logo img, #navbar .nav-logo img { 
    height: 54px !important; 
    width: auto !important;
    transition: all 0.3s ease !important; 
}
.navbar.scrolled .nav-logo img { 
    height: 46px !important; 
}
.nav-menu, #navbar #navMenu { 
    display: flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    text-align: center !important; 
    gap: 1.75rem !important;
    overflow: visible !important;
}
.nav-right, #navbar .nav-right { 
    justify-self: end !important; 
    display: flex !important; 
    align-items: center !important; 
    gap: 0.75rem !important; 
}
.nav-link, #navbar .nav-link { 
    font-size: 0.95rem !important; 
    font-weight: 800 !important;
    color: #1a1a2e !important; 
    padding: 0.5rem 0.75rem !important; 
    text-align: center !important; 
    display: inline-flex !important; 
    align-items: center !important; 
    justify-content: center !important;
    gap: 0.35rem !important;
    position: relative !important; 
    transition: color 0.3s ease !important; 
    text-decoration: none !important; 
    letter-spacing: -0.01em !important;
    white-space: nowrap !important;
}
.nav-link::after, #navbar .nav-link::after { 
    content: '' !important; 
    position: absolute !important; 
    bottom: -2px !important; 
    left: 50% !important; 
    right: 50% !important; 
    height: 3px !important; 
    background: linear-gradient(90deg, #c1272d, #006233) !important; 
    border-radius: 2px !important; 
    transition: left 0.3s ease, right 0.3s ease !important; 
}
.nav-link:hover::after, 
.nav-link.active::after,
#navbar .nav-link:hover::after,
#navbar .nav-link.active::after { 
    left: 0.4rem !important; 
    right: 0.4rem !important; 
}
.nav-link:hover, 
.nav-link.active,
#navbar .nav-link:hover,
#navbar .nav-link.active { 
    color: #c1272d !important; 
}

/* ═══ MENU DÉROULANT CALCULATEURS SPORT (100% COMPATIBLE SANS TAILWIND) ═══ */
#navbar .nav-dropdown, .nav-dropdown {
    position: relative !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
}
#navbar .nav-dropdown-caret, .nav-dropdown-caret {
    font-size: 0.72rem !important;
    line-height: 1 !important;
    display: inline-block !important;
    margin-left: 0.2rem !important;
    transition: transform 0.22s ease !important;
    color: inherit !important;
}
#navbar .nav-dropdown:hover .nav-dropdown-caret,
#navbar .nav-dropdown.open .nav-dropdown-caret {
    transform: rotate(180deg) !important;
    color: #c1272d !important;
}
#navbar .nav-dropdown::after, .nav-dropdown::after {
    content: '' !important;
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    right: 0 !important;
    height: 14px !important;
    background: transparent !important;
}
#navbar #navMenu .nav-dropdown-menu,
#navbar .nav-dropdown-menu,
.nav-dropdown-menu {
    position: absolute !important;
    top: calc(100% + 6px) !important;
    left: 50% !important;
    transform: translateX(-50%) translateY(8px) !important;
    width: 325px !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 14px !important;
    box-shadow: 0 18px 38px -5px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    padding: 0.55rem !important;
    margin: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease !important;
    z-index: 99999 !important;
    display: block !important;
    text-align: left !important;
    box-sizing: border-box !important;
}
#navbar #navMenu .nav-dropdown:hover > .nav-dropdown-menu,
#navbar #navMenu .nav-dropdown.open > .nav-dropdown-menu,
#navbar .nav-dropdown:hover > .nav-dropdown-menu,
#navbar .nav-dropdown.open > .nav-dropdown-menu,
.nav-dropdown:hover > .nav-dropdown-menu {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    transform: translateX(-50%) translateY(0) !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item,
#navbar .nav-dropdown-menu a.nav-dropdown-item,
.nav-dropdown-menu a.nav-dropdown-item {
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 0.55rem !important;
    width: 100% !important;
    height: auto !important;
    padding: 0.5rem 0.75rem !important;
    margin: 0 0 2px 0 !important;
    border-radius: 9px !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 0.83rem !important;
    font-weight: 700 !important;
    line-height: 1.4 !important;
    color: #0f172a !important;
    -webkit-text-fill-color: #0f172a !important;
    background: transparent !important;
    text-align: left !important;
    text-decoration: none !important;
    white-space: nowrap !important;
    cursor: pointer !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: relative !important;
    transform: none !important;
    transition: background 0.15s ease, color 0.15s ease !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item::before,
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item::after {
    display: none !important;
    content: none !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item:hover {
    background: #fef2f2 !important;
    color: #c1272d !important;
    -webkit-text-fill-color: #c1272d !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.active-tool {
    background: #fef2f2 !important;
    color: #c1272d !important;
    -webkit-text-fill-color: #c1272d !important;
    font-weight: 800 !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub {
    background: linear-gradient(135deg, rgba(193, 39, 45, 0.1), rgba(0, 98, 51, 0.1)) !important;
    color: #c1272d !important;
    -webkit-text-fill-color: #c1272d !important;
    font-weight: 800 !important;
    border: 1px solid rgba(193, 39, 45, 0.25) !important;
    margin-bottom: 6px !important;
}
#navbar #navMenu .nav-dropdown-menu a.nav-dropdown-item.nav-dropdown-hub:hover {
    background: linear-gradient(135deg, rgba(193, 39, 45, 0.18), rgba(0, 98, 51, 0.18)) !important;
}

/* ═══ BOUTON TRADUCTEUR DANS LA NAVBAR (PAGES OUTILS) ═══ */
.lang-switcher { display: inline-flex !important; align-items: center !important; background: #f1f5f9 !important; padding: 3px !important; border-radius: 9999px !important; border: 1px solid #e2e8f0 !important; gap: 2px !important; }
.lang-btn { border: none !important; background: transparent !important; padding: 0.28rem 0.6rem !important; border-radius: 9999px !important; font-size: 0.73rem !important; font-weight: 700 !important; color: #475569 !important; cursor: pointer !important; transition: all 0.2s ease !important; }
.lang-btn.active { background: #ffffff !important; color: #c1272d !important; box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important; }

.nav-cta { 
    display: inline-flex !important; 
    align-items: center !important; 
    gap: 0.5rem !important; 
    padding: 0.5rem 1.25rem !important; 
    background: linear-gradient(135deg, #c1272d, #006233) !important; 
    color: white !important;
    -webkit-text-fill-color: white !important;
    font-weight: 800 !important; 
    font-size: 0.9375rem !important; 
    border-radius: 9999px !important; 
    border: 2px solid transparent !important; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important; 
    transition: transform 0.3s ease, box-shadow 0.3s ease !important; 
    text-decoration: none !important; 
    white-space: nowrap !important; 
}
.nav-cta:hover { 
    transform: translateY(-2px) !important; 
    box-shadow: 0 8px 25px rgba(193,39,45,0.3) !important; 
}
.nav-cta.nav-cta-mobile { display: none !important; }
.nav-cta.nav-cta-desktop { display: inline-flex !important; }
.nav-toggle { 
    display: none !important; 
    flex-direction: column !important; 
    gap: 5px !important; 
    background: none !important; 
    border: none !important; 
    cursor: pointer !important; 
    padding: 8px !important; 
    width: 36px !important; 
    height: 36px !important; 
    justify-content: center !important; 
    align-items: center !important; 
    border-radius: 8px !important; 
}
.nav-toggle span { 
    display: block !important; 
    width: 22px !important; 
    height: 2px !important; 
    background: #1a1a2e !important; 
    border-radius: 2px !important; 
    transition: transform 0.3s ease, opacity 0.3s ease !important; 
}
.nav-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg) !important; }
.nav-toggle.active span:nth-child(2) { opacity: 0 !important; transform: scaleX(0) !important; }
.nav-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg) !important; }
.nav-backdrop { 
    display: none; 
    position: fixed !important; 
    top: 0 !important; 
    left: 0 !important; 
    right: 0 !important; 
    bottom: 0 !important; 
    background: rgba(0,0,0,0.3) !important; 
    z-index: 99 !important; 
    opacity: 0; 
    transition: opacity 0.3s ease !important; 
}
.nav-backdrop.active { 
    display: block !important; 
    opacity: 1 !important; 
}
@media (max-width: 768px) {
    .nav-container, #navbar .nav-container { display: flex !important; justify-content: space-between !important; }
    .nav-right, #navbar .nav-right { gap: 0.5rem !important; }
    .nav-menu, #navbar #navMenu { 
        position: absolute !important; 
        top: 100% !important; 
        left: 1rem !important; 
        right: 1rem !important; 
        background: white !important; 
        flex-direction: column !important; 
        padding: 1.5rem !important; 
        box-shadow: 0 10px 40px rgba(0,0,0,0.12) !important; 
        border-radius: 16px !important; 
        gap: 0.75rem !important; 
        transform: translateY(-10px) !important; 
        opacity: 0 !important; 
        pointer-events: none !important; 
        transition: transform 0.3s ease, opacity 0.3s ease !important; 
        z-index: 100 !important; 
        border: 1px solid #f1f5f9 !important; 
        justify-content: center !important; 
        align-items: center !important; 
        text-align: center !important; 
    }
    .nav-menu.active, #navbar #navMenu.active { 
        transform: translateY(0) !important; 
        opacity: 1 !important; 
        pointer-events: auto !important; 
    }
    .nav-link, #navbar .nav-link { 
        padding: 0.6rem 0 !important; 
        width: 100% !important; 
        text-align: center !important; 
        justify-content: center !important; 
        font-weight: 800 !important; 
    }
    #navbar .nav-dropdown {
        width: 100% !important;
        flex-direction: column !important;
    }
    #navbar #navMenu .nav-dropdown-menu {
        position: static !important;
        transform: none !important;
        width: 100% !important;
        box-shadow: none !important;
        border: 1px solid #e2e8f0 !important;
        margin-top: 0.35rem !important;
        display: none !important;
    }
    #navbar #navMenu .nav-dropdown:hover > .nav-dropdown-menu,
    #navbar #navMenu .nav-dropdown.open > .nav-dropdown-menu {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
    }
    .nav-toggle { display: flex !important; }
    .nav-cta.nav-cta-mobile { display: inline-flex !important; width: 100% !important; justify-content: center !important; margin-top: 0.5rem !important; }
    .nav-cta.nav-cta-desktop { display: none !important; }
}
@media (max-width: 480px) {
    .navbar, #navbar { padding: 0.75rem 1rem !important; }
}
`;

const NAVBAR_SCRIPT_TAG = `
<script id="profeps-navbar-script">
(() => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navDropdown = document.querySelector('#navbar .nav-dropdown');
    let backdrop = document.getElementById('navBackdrop');

    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'navBackdrop';
        backdrop.className = 'nav-backdrop';
        document.body.prepend(backdrop);
    }

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    if (navDropdown) {
        navDropdown.addEventListener('mouseenter', () => navDropdown.classList.add('open'));
        navDropdown.addEventListener('mouseleave', () => navDropdown.classList.remove('open'));
    }

    if (navToggle && navMenu) {
        function toggleNav() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            if (backdrop) backdrop.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        function closeNav() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNav();
        });

        if (backdrop) backdrop.addEventListener('click', closeNav);

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeNav();
            }
        });

        navMenu.querySelectorAll('.nav-dropdown-item, .nav-cta').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }
})();
</script>
`;

function getActiveKey(filename) {
    const b = path.basename(filename).toLowerCase();
    if (TOOL_NAV_LABELS[b]) return 'vma';
    if (b === 'index.html' || b === 'home.html') return 'accueil';
    if (b.includes('generateur')) return 'generateur';
    if (b.includes('calculateur') || b.includes('vma')) return 'vma';
    if (b.includes('blog') || b.startsWith('article-') || b.includes('op-') || b.includes('orientation') || b.includes('ressources-') || b.includes('qa-') || b.includes('howto-')) {
        return 'blog';
    }
    return '';
}

function buildNavbarHTML(filePath, existingLangSwitcherHtml = '') {
    const baseName = path.basename(filePath).toLowerCase();
    const key = getActiveKey(filePath);
    const act = (k) => (key === k ? ' active' : '');

    const currentDropdownLabel = TOOL_NAV_LABELS[baseName] || 'Calculateur VMA';
    const currentDropdownHref = TOOL_NAV_LABELS[baseName] ? baseName : 'calculateur-vma.html';

    const dropdownLinksHtml = DROPDOWN_ITEMS.map(item => {
        const isCurrent = item.href.toLowerCase() === baseName;
        const cls = item.isHub
            ? `nav-dropdown-item nav-dropdown-hub${isCurrent ? ' active-tool' : ''}`
            : `nav-dropdown-item${isCurrent ? ' active-tool' : ''}`;
        return `                        <a href="${item.href}" class="${cls}">${item.label}</a>`;
    }).join('\n');

    return `
    <div class="nav-backdrop" id="navBackdrop"></div>
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="/" class="nav-logo" aria-label="Prof EPS Maroc - Accueil">
                <img src="/images/prof_eps.png" onerror="this.onerror=null;this.src='https://profeps.ma/images/prof_eps.png';" alt="Prof EPS Maroc" width="140" height="40" fetchpriority="high" decoding="async" style="height:54px; width:auto; max-width:180px; object-fit:contain; display:block;">
            </a>
            <div class="nav-menu" id="navMenu">
                <a href="/" class="nav-link${act('accueil')}">Accueil</a>
                <a href="generateur.html" class="nav-link${act('generateur')}">Générateur</a>
                <div class="nav-dropdown">
                    <a href="${currentDropdownHref}" class="nav-link${act('vma')}"><span id="nav-current-tool-label">${currentDropdownLabel}</span> <span class="nav-dropdown-caret">▾</span></a>
                    <div class="nav-dropdown-menu">
${dropdownLinksHtml}
                    </div>
                </div>
                <a href="blog.html" class="nav-link${act('blog')}">Blog</a>
                <a href="generateur.html" class="nav-cta nav-cta-mobile"><span>✨</span> Créer un document</a>
            </div>
            <div class="nav-right">
                ${existingLangSwitcherHtml}
                <a href="generateur.html" class="nav-cta nav-cta-desktop"><span>✨</span> Créer un document</a>
                <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu"><span></span><span></span><span></span></button>
            </div>
        </div>
    </nav>`;
}

function findHtmlFiles(dir, list = []) {
    if (!fs.existsSync(dir)) return list;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(item)) continue;
        const full = path.join(dir, item);
        const s = fs.statSync(full);
        if (s.isDirectory()) {
            findHtmlFiles(full, list);
        } else if (item.toLowerCase().endsWith('.html')) {
            list.push(full);
        }
    }
    return list;
}

const files = findHtmlFiles(rootDir);

if (files.length === 0) {
    console.log('⚠️ Aucun fichier .html trouvé.');
    process.exit(0);
}

console.log(`✅ ${files.length} fichier(s) HTML détecté(s).\nTraitement en cours...\n`);

let count = 0;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const oldHtml = html;
    const baseName = path.basename(file).toLowerCase();

    // 0. Supprimer tous les anciens styles dropdown parasites (y compris profeps-vma-dropdown-footer-css)
    html = html.replace(/<style id="profeps-vma-dropdown-footer-css">[\s\S]*?<\/style>/gi, '');
    html = html.replace(/\/\* === PROFEPS DROPDOWN[\s\S]*?(?=<\/style>)/g, '');
    html = html.replace(/\/\* === DROPDOWN MENU[\s\S]*?(?=<\/style>)/g, '');

    // Réparer spécifiquement la chaîne template pageHtml dans generateur.html si un script y avait été injecté
    html = html.replace(
        /<\/head><body>\$\{pagesToRender\[i\]\}[\s\S]*?<\/body><\/html>`;/g,
        '</head><body>${pagesToRender[i]}</body></html>`;'
    );

    // Préserver le sélecteur de langue dans .nav-right s'il s'agit d'une page calculateur
    let langSwitcherHtml = '';
    const existingNavMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
    if (existingNavMatch) {
        const langMatch = existingNavMatch[0].match(/<div[^>]*class="[^"]*lang-switcher[^"]*"[^>]*>[\s\S]*?<\/div>/i);
        if (langMatch) {
            langSwitcherHtml = langMatch[0];
        }
    }
    if (!langSwitcherHtml && TOOL_NAV_LABELS[baseName] && baseName !== 'calculateur-vma.html') {
        langSwitcherHtml = `<div class="lang-switcher"><button id="btn-fr" onclick="setLang('fr')" class="lang-btn active">FR</button><button id="btn-en" onclick="setLang('en')" class="lang-btn">EN</button><button id="btn-ar" onclick="setLang('ar')" class="lang-btn">العربية</button></div>`;
    }

    // 1. Style dédié injecté sur le PREMIER </head> uniquement
    const customStyleTag = `<style id="profeps-navbar-styles">\n${NAVBAR_CSS_BLOCK.trim()}\n</style>`;
    html = html.replace(/<style id="profeps-navbar-styles">[\s\S]*?<\/style>/gi, '');

    const firstHeadClose = html.toLowerCase().indexOf('</head>');
    if (firstHeadClose !== -1) {
        html = html.slice(0, firstHeadClose) + `${customStyleTag}\n` + html.slice(firstHeadClose);
    } else {
        html = customStyleTag + html;
    }

    // 2. Remplacer la Navbar complète
    const newNav = buildNavbarHTML(file, langSwitcherHtml);
    html = html.replace(/<div class="nav-backdrop"[^>]*><\/div>/gi, '');

    const navMatch = /<nav[\s\S]*?<\/nav>/i;
    if (navMatch.test(html)) {
        html = html.replace(navMatch, newNav.trim());
    } else {
        html = html.replace(/(<body[^>]*>)/i, `$1\n${newNav.trim()}`);
    }

    // 3. Remplacer le script JS de la Navbar uniquement avant le DERNIER </body> du fichier
    html = html.replace(/<script id="profeps-navbar-script">[\s\S]*?<\/script>/gi, '');
    const lastBodyClose = html.toLowerCase().lastIndexOf('</body>');
    if (lastBodyClose !== -1) {
        html = html.slice(0, lastBodyClose) + `${NAVBAR_SCRIPT_TAG.trim()}\n` + html.slice(lastBodyClose);
    } else {
        html += NAVBAR_SCRIPT_TAG.trim();
    }

    // 4. Écriture
    if (html !== oldHtml) {
        fs.writeFileSync(file, html, 'utf8');
        count++;
        console.log(`  ✨ Modifié : ${path.relative(rootDir, file)}`);
    } else {
        console.log(`  ℹ️ Sans changement : ${path.relative(rootDir, file)}`);
    }
});

console.log('\n======================================================');
console.log(`🎉 SUCCÈS : ${count} / ${files.length} fichier(s) HTML mis à jour !`);
console.log('======================================================\n');
