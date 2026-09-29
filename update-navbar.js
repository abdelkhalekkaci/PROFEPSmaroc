/**
 * update-navbar.js
 * Script Node.js ciblant le dossier "public"
 * Titres très gras (font-weight: 800) et tous parfaitement centrés.
 */

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
// Cible automatiquement le dossier public s'il existe, sinon le dossier courant
const targetDir = fs.existsSync(path.join(rootDir, 'public')) 
    ? path.join(rootDir, 'public') 
    : rootDir;

console.log('\n======================================================');
console.log('🚀 UNIFICATEUR DE NAVBAR — PROF EPS MAROC');
console.log('📂 Dossier scanné :', targetDir);
console.log('======================================================\n');

// ═══ 1. CSS Canonique (Titres 800 très gras + Centrage garanti) ═══
const NAVBAR_CSS_BLOCK = `
/* ═══ NAVBAR CANONIQUE UNIFIÉE ═══ */
.navbar { 
    position: fixed !important; 
    top: 0 !important; 
    left: 0 !important; 
    right: 0 !important; 
    z-index: 1000 !important; 
    padding: 1rem 2rem !important; 
    background: rgba(255,255,255,0.96) !important; 
    backdrop-filter: blur(20px) !important; 
    -webkit-backdrop-filter: blur(20px) !important; 
    border-bottom: 1px solid rgba(226,232,240,0.7) !important; 
    transition: all 0.3s ease !important; 
}
.navbar.scrolled { 
    padding: 0.5rem 2rem !important; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; 
    background: rgba(255,255,255,0.99) !important; 
}
.nav-container { 
    max-width: 1400px !important; 
    margin: 0 auto !important; 
    display: grid !important; 
    grid-template-columns: 1fr auto 1fr !important; 
    align-items: center !important; 
}
.nav-logo { 
    justify-self: start !important; 
    display: flex !important; 
    align-items: center !important; 
}
.nav-logo img { 
    height: 56px !important; 
    transition: all 0.3s ease !important; 
}
.navbar.scrolled .nav-logo img { 
    height: 46px !important; 
}
.nav-menu { 
    display: flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    text-align: center !important; 
    gap: 1.75rem !important; 
}
.nav-right { 
    justify-self: end !important; 
    display: flex !important; 
    align-items: center !important; 
    gap: 0.75rem !important; 
}
.nav-link { 
    font-size: 0.95rem !important; 
    font-weight: 800 !important; /* TITRES BIEN PLUS GRAS */
    color: #1a1a2e !important; 
    padding: 0.5rem 0.75rem !important; 
    text-align: center !important; 
    display: inline-flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    position: relative !important; 
    transition: color 0.3s ease !important; 
    text-decoration: none !important; 
    letter-spacing: -0.01em !important;
}
.nav-link::after { 
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
.nav-link.active::after { 
    left: 0.4rem !important; 
    right: 0.4rem !important; 
}
.nav-link:hover, 
.nav-link.active { 
    color: #c1272d !important; 
}
.nav-btn-login { 
    display: inline-flex !important; 
    align-items: center !important; 
    gap: 0.5rem !important; 
    padding: 0.5rem 1.25rem !important; 
    background: transparent !important; 
    color: #c1272d !important; 
    font-weight: 800 !important; 
    font-size: 0.9375rem !important; 
    border-radius: 9999px !important; 
    border: 2px solid #c1272d !important; 
    transition: all 0.3s ease !important; 
    text-decoration: none !important; 
    white-space: nowrap !important; 
}
.nav-cta { 
    display: inline-flex !important; 
    align-items: center !important; 
    gap: 0.5rem !important; 
    padding: 0.5rem 1.25rem !important; 
    background: linear-gradient(135deg, #c1272d, #006233) !important; 
    color: white !important; 
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
    .nav-container { display: flex !important; justify-content: space-between !important; }
    .nav-right { gap: 0.5rem !important; }
    .nav-menu { 
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
    .nav-menu.active { 
        transform: translateY(0) !important; 
        opacity: 1 !important; 
        pointer-events: auto !important; 
    }
    .nav-link { 
        padding: 0.6rem 0 !important; 
        width: 100% !important; 
        text-align: center !important; 
        justify-content: center !important; 
        font-weight: 800 !important; 
    }
    .nav-toggle { display: flex !important; }
    .nav-cta.nav-cta-mobile { display: inline-flex !important; width: 100% !important; justify-content: center !important; margin-top: 0.5rem !important; }
    .nav-cta.nav-cta-desktop { display: none !important; }
}
@media (max-width: 480px) {
    .navbar { padding: 0.75rem 1rem !important; }
}
`;

// ═══ 2. Script JavaScript unique pour le menu ═══
const NAVBAR_SCRIPT_TAG = `
<script id="profeps-navbar-script">
(() => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
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

        navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }
})();
</script>
`;

function getActiveKey(filename) {
    const b = path.basename(filename).toLowerCase();
    if (b === 'index.html' || b === 'home.html') return 'accueil';
    if (b.includes('generateur')) return 'generateur';
    if (b.includes('calculateur') || b.includes('vma')) return 'vma';
    if (b.includes('blog') || b.startsWith('article-') || b.includes('op-') || b.includes('orientation') || b.includes('ressources-') || b.includes('qa-') || b.includes('howto-')) {
        return 'blog';
    }
    return '';
}

function buildNavbarHTML(filePath) {
    const key = getActiveKey(filePath);
    const act = (k) => (key === k ? ' active' : '');

    return `
    <div class="nav-backdrop" id="navBackdrop"></div>
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="/" class="nav-logo" aria-label="Prof EPS Maroc - Accueil">
                <img src="/images/prof_eps.png" alt="Prof EPS Maroc" width="140" height="40" fetchpriority="high" decoding="async" style="height:56px; width:auto; max-width:180px; object-fit:contain; display:block;">
            </a>
            <div class="nav-menu" id="navMenu">
                <a href="/" class="nav-link${act('accueil')}">Accueil</a>
                <a href="generateur.html" class="nav-link${act('generateur')}">Générateur</a>
                <a href="calculateur-vma.html" class="nav-link${act('vma')}">Calculateur VMA</a>
                <a href="blog.html" class="nav-link${act('blog')}">Blog</a>
                <a href="generateur.html" class="nav-cta nav-cta-mobile"><span>✨</span> Créer un document</a>
            </div>
            <div class="nav-right">
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

// ═══ Exécution ═══
const files = findHtmlFiles(targetDir);

if (files.length === 0) {
    console.log('⚠️ Aucun fichier .html trouvé dans :', targetDir);
    process.exit(0);
}

console.log(`✅ ${files.length} fichier(s) HTML détecté(s) dans ${targetDir}.\nTraitement en cours...\n`);

let count = 0;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const oldHtml = html;

    // 1. Style dédié injecté
    const customStyleTag = `<style id="profeps-navbar-styles">\n${NAVBAR_CSS_BLOCK.trim()}\n</style>`;
    html = html.replace(/<style id="profeps-navbar-styles">[\s\S]*?<\/style>/g, '');
    
    if (html.includes('</head>')) {
        html = html.replace('</head>', `${customStyleTag}\n</head>`);
    } else {
        html = customStyleTag + html;
    }

    // 2. Remplacer la Navbar
    const newNav = buildNavbarHTML(file);
    html = html.replace(/<div class="nav-backdrop"[^>]*><\/div>/g, '');

    const navMatch = /<nav[\s\S]*?<\/nav>/i;
    if (navMatch.test(html)) {
        html = html.replace(navMatch, newNav.trim());
    } else {
        html = html.replace(/(<body[^>]*>)/i, `$1\n${newNav.trim()}`);
    }

    // 3. Remplacer le script JS
    html = html.replace(/<script id="profeps-navbar-script">[\s\S]*?<\/script>/g, '');
    if (html.includes('</body>')) {
        html = html.replace('</body>', `${NAVBAR_SCRIPT_TAG.trim()}\n</body>`);
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
console.log('Les titres sont désormais plus gras (800) et tous centrés.');
console.log('======================================================\n');