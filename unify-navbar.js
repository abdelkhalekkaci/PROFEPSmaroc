/**
 * unify-navbar.js
 * Script Node.js pour unifier la barre de navigation sur tous les fichiers HTML.
 * Style Canonique Prof EPS avec titres plus gras (font-weight: 700) et tous centrés.
 *
 * Exécution :
 *   node unify-navbar.js
 *   node unify-navbar.js --backup  (sauvegarde chaque fichier en .bak avant modif)
 *   node unify-navbar.js --dry-run (simulation sans écriture)
 */

const fs = require('fs');
const path = require('path');

const isDryRun = process.argv.includes('--dry-run');
const createBackup = process.argv.includes('--backup');

// ═══ 1. CSS Canonique (Titres 700 + Centrage) ═══
const NAVBAR_CSS = `
/* ═══ NAVBAR CANONIQUE UNIFIÉE (Prof EPS) ═══ */
.navbar { 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    z-index: 1000; 
    padding: 1rem 2rem; 
    background: rgba(255,255,255,0.96); 
    backdrop-filter: blur(20px); 
    -webkit-backdrop-filter: blur(20px); 
    border-bottom: 1px solid rgba(226,232,240,0.7); 
    transition: all 0.3s ease; 
}
.navbar.scrolled { 
    padding: 0.5rem 2rem; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
    background: rgba(255,255,255,0.99); 
}
.nav-container { 
    max-width: 1400px; 
    margin: 0 auto; 
    display: grid; 
    grid-template-columns: 1fr auto 1fr; 
    align-items: center; 
}
.nav-logo { 
    justify-self: start; 
    display: flex; 
    align-items: center; 
}
.nav-logo img { 
    height: 56px; 
    transition: all 0.3s ease; 
}
.navbar.scrolled .nav-logo img { 
    height: 46px; 
}
.nav-menu { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    text-align: center;
    gap: 1.75rem; 
}
.nav-right { 
    justify-self: end; 
    display: flex; 
    align-items: center; 
    gap: 0.75rem; 
}
.nav-link { 
    font-size: 0.95rem; 
    font-weight: 700; /* Titres plus gras */
    color: #2b2b3d; 
    padding: 0.5rem 0.75rem; 
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative; 
    transition: color 0.3s ease; 
    text-decoration: none; 
    letter-spacing: -0.01em;
}
.nav-link::after { 
    content: ''; 
    position: absolute; 
    bottom: -2px; 
    left: 50%; 
    right: 50%; 
    height: 3px; 
    background: linear-gradient(90deg, #c1272d, #006233); 
    border-radius: 2px; 
    transition: left 0.3s ease, right 0.3s ease; 
}
.nav-link:hover::after, 
.nav-link.active::after { 
    left: 0.5rem; 
    right: 0.5rem; 
}
.nav-link:hover, 
.nav-link.active { 
    color: #c1272d; 
}
.nav-btn-login { 
    display: inline-flex; 
    align-items: center; 
    gap: 0.5rem; 
    padding: 0.5rem 1.25rem; 
    background: transparent; 
    color: #c1272d; 
    font-weight: 700; 
    font-size: 0.9375rem; 
    border-radius: 9999px; 
    border: 2px solid #c1272d; 
    transition: all 0.3s ease; 
    text-decoration: none; 
    white-space: nowrap; 
    line-height: 1.4; 
}
.nav-btn-login:hover { 
    background: #c1272d; 
    color: white; 
    box-shadow: 0 4px 14px rgba(193,39,45,0.3); 
    transform: translateY(-1px); 
}
.nav-cta { 
    display: inline-flex; 
    align-items: center; 
    gap: 0.5rem; 
    padding: 0.5rem 1.25rem; 
    background: linear-gradient(135deg, #c1272d, #006233); 
    color: white; 
    font-weight: 700; 
    font-size: 0.9375rem; 
    border-radius: 9999px; 
    border: 2px solid transparent; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
    transition: transform 0.3s ease, box-shadow 0.3s ease; 
    text-decoration: none; 
    white-space: nowrap; 
    line-height: 1.4; 
}
.nav-cta:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 8px 25px rgba(193,39,45,0.3); 
}
.nav-cta.nav-cta-mobile { display: none; }
.nav-cta.nav-cta-desktop { display: inline-flex; }
.nav-toggle { 
    display: none; 
    flex-direction: column; 
    gap: 5px; 
    background: none; 
    border: none; 
    cursor: pointer; 
    padding: 8px; 
    width: 36px; 
    height: 36px; 
    justify-content: center; 
    align-items: center; 
    border-radius: 8px; 
    transition: background 0.3s ease; 
}
.nav-toggle:hover { 
    background: rgba(193,39,45,0.06); 
}
.nav-toggle span { 
    display: block; 
    width: 22px; 
    height: 2px; 
    background: #1a1a2e; 
    border-radius: 2px; 
    transition: transform 0.3s ease, opacity 0.3s ease; 
}
.nav-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav-backdrop { 
    display: none; 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background: rgba(0,0,0,0.3); 
    z-index: 99; 
    opacity: 0; 
    transition: opacity 0.3s ease; 
}
.nav-backdrop.active { 
    display: block; 
    opacity: 1; 
}
@media (max-width: 768px) {
    .nav-container { display: flex; justify-content: space-between; }
    .nav-right { gap: 0.5rem; }
    .nav-menu { 
        position: absolute; 
        top: 100%; 
        left: 1rem; 
        right: 1rem; 
        background: white; 
        flex-direction: column; 
        padding: 1.5rem; 
        box-shadow: 0 10px 40px rgba(0,0,0,0.12); 
        border-radius: 16px; 
        gap: 0.75rem; 
        transform: translateY(-10px); 
        opacity: 0; 
        pointer-events: none; 
        transition: transform 0.3s ease, opacity 0.3s ease; 
        z-index: 100; 
        border: 1px solid #f1f5f9; 
        justify-content: center; 
        align-items: center; 
        text-align: center;
    }
    .nav-menu.active { 
        transform: translateY(0); 
        opacity: 1; 
        pointer-events: auto; 
    }
    .nav-link { 
        padding: 0.6rem 0; 
        width: 100%; 
        text-align: center; 
        justify-content: center;
        font-weight: 700;
    }
    .nav-link::after { bottom: 0; }
    .nav-toggle { display: flex; }
    .nav-cta.nav-cta-mobile { display: inline-flex; width: 100%; justify-content: center; margin-top: 0.5rem; }
    .nav-cta.nav-cta-desktop { display: none; }
    .nav-btn-login { display: none; }
}
@media (max-width: 480px) {
    .navbar { padding: 0.75rem 1rem; }
    .navbar.scrolled { padding: 0.375rem 1rem; }
}
`;

// ═══ 2. Script JavaScript Navbar (Scroll & Menu Mobile) ═══
const NAVBAR_JS = `
<script id="profeps-navbar-script">
(() => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    if (navToggle && navMenu && navBackdrop) {
        function toggleNav() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navBackdrop.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        function closeNav() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navBackdrop.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNav();
        });

        navBackdrop.addEventListener('click', closeNav);

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

/**
 * Détermine quelle page doit avoir la classe active
 */
function getActivePageKey(filename) {
    const base = path.basename(filename).toLowerCase();
    if (base === 'index.html' || base === '' || base === 'home.html') return 'accueil';
    if (base.includes('generateur') || base.includes('generator')) return 'generateur';
    if (base.includes('calculateur') || base.includes('vma')) return 'vma';
    if (
        base.includes('blog') ||
        base.startsWith('article-') ||
        base.includes('orientations-') ||
        base.includes('ressources-') ||
        base.includes('qa-') ||
        base.includes('howto-')
    ) {
        return 'blog';
    }
    return '';
}

/**
 * Génère le code HTML exact de la barre de navigation
 */
function generateNavbarHTML(filename) {
    const activeKey = getActivePageKey(filename);

    const isAccueil = activeKey === 'accueil' ? ' active' : '';
    const isGenerateur = activeKey === 'generateur' ? ' active' : '';
    const isVma = activeKey === 'vma' ? ' active' : '';
    const isBlog = activeKey === 'blog' ? ' active' : '';

    return `
    <div class="nav-backdrop" id="navBackdrop"></div>
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="/" class="nav-logo" aria-label="Prof EPS Maroc - Accueil">
                <img src="/images/prof_eps.png" alt="Prof EPS Maroc" width="140" height="40" fetchpriority="high" decoding="async" style="height:56px; width:auto; max-width:180px; object-fit:contain; display:block;">
            </a>
            <div class="nav-menu" id="navMenu">
                <a href="/" class="nav-link${isAccueil}">Accueil</a>
                <a href="generateur.html" class="nav-link${isGenerateur}">Générateur</a>
                <a href="calculateur-vma.html" class="nav-link${isVma}">Calculateur VMA</a>
                <a href="blog.html" class="nav-link${isBlog}">Blog</a>
                <a href="generateur.html" class="nav-cta nav-cta-mobile"><span>✨</span> Créer un document</a>
            </div>
            <div class="nav-right">
                <a href="generateur.html" class="nav-cta nav-cta-desktop"><span>✨</span> Créer un document</a>
                <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu"><span></span><span></span><span></span></button>
            </div>
        </div>
    </nav>`;
}

/**
 * Recherche récursive des fichiers .html
 */
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(file)) {
            continue;
        }
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findHtmlFiles(fullPath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

/**
 * Met à jour un fichier HTML
 */
function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // 1. Remplacement ou insertion du bloc CSS canonique
    const regexCss = /\/\* ═══ NAVBAR CANONIQUE[\s\S]*?@media \(max-width: 480px\) \{[\s\S]*?\}/;
    if (regexCss.test(content)) {
        content = content.replace(regexCss, NAVBAR_CSS.trim());
    } else {
        if (content.includes('</style>')) {
            content = content.replace('</style>', `\n${NAVBAR_CSS.trim()}\n</style>`);
        } else if (content.includes('</head>')) {
            content = content.replace('</head>', `<style>\n${NAVBAR_CSS.trim()}\n</style>\n</head>`);
        }
    }

    // 2. Remplacement du HTML de la Navbar
    const newNavbarHTML = generateNavbarHTML(filePath);

    // Nettoyer l'ancien backdrop
    content = content.replace(/<div class="nav-backdrop"[^>]*><\/div>/g, '');

    // Remplacer l'élément <nav ...>...</nav>
    const navRegex = /<nav\s+class="navbar"[\s\S]*?<\/nav>/i;
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newNavbarHTML.trim());
    } else {
        const genericNavRegex = /<nav[\s\S]*?<\/nav>/i;
        if (genericNavRegex.test(content)) {
            content = content.replace(genericNavRegex, newNavbarHTML.trim());
        } else {
            content = content.replace(/(<body[^>]*>)/i, `$1\n${newNavbarHTML.trim()}`);
        }
    }

    // 3. Remplacement ou injection du script JS unique
    content = content.replace(/<script id="profeps-navbar-script">[\s\S]*?<\/script>/g, '');
    if (content.includes('</body>')) {
        content = content.replace('</body>', `${NAVBAR_JS.trim()}\n</body>`);
    } else {
        content += NAVBAR_JS.trim();
    }

    // 4. Écriture si modifié
    if (content !== originalContent) {
        if (createBackup && !isDryRun) {
            fs.writeFileSync(`${filePath}.bak`, originalContent, 'utf8');
        }
        if (!isDryRun) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
        return { path: filePath, updated: true };
    }

    return { path: filePath, updated: false };
}

// ═══ Exécution principale ═══
console.log('====================================================');
console.log('🚀 UNIFICATEUR DE NAVBAR — PROF EPS MAROC');
console.log('====================================================');
if (isDryRun) console.log('⚠️  Mode simulation (--dry-run) : aucun fichier ne sera altéré.');
if (createBackup) console.log('💾 Sauvegardes activées (.bak créés).');

const rootDir = process.cwd();
console.log(`📁 Dossier : ${rootDir}`);

const htmlFiles = findHtmlFiles(rootDir);
console.log(`📄 ${htmlFiles.length} fichiers HTML détectés.\n`);

let updatedCount = 0;
htmlFiles.forEach(file => {
    const rel = path.relative(rootDir, file);
    try {
        const res = updateHtmlFile(file);
        if (res.updated) {
            updatedCount++;
            console.log(`  ✅ Harmonisé : ${rel}`);
        } else {
            console.log(`  ℹ️ Déjà à jour : ${rel}`);
        }
    } catch (err) {
        console.error(`  ❌ Erreur sur ${rel}: ${err.message}`);
    }
});

console.log('\n====================================================');
console.log(`🎉 Terminé ! ${updatedCount} / ${htmlFiles.length} fichiers HTML mis à jour.`);
console.log('Titres plus gras (700) et centrés sur toutes les pages.');
console.log('====================================================');