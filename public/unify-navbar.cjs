const fs = require('fs');
const path = require('path');

// ═══ 1. CSS DE LA NAVBAR UNIFIÉE (IDENTIQUE SUR TOUT LE SITE) ═══
const unifiedNavbarCss = `        /* ═══ NAVBAR UNIFIÉE (IDENTIQUE SUR TOUT LE SITE) ═══ */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 0.65rem 1.5rem; background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #e2e8f0; transition: all 0.25s ease; }
        .navbar.scrolled { box-shadow: 0 2px 10px rgba(0,0,0,0.06); padding: 0.5rem 1.5rem; }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; }
        .nav-logo img { height: 44px; width: auto; max-width: 160px; object-fit: contain; display: block; }
        .nav-menu { display: flex; align-items: center; gap: 1.25rem; }
        .nav-link { font-size: 0.9rem; font-weight: 600; color: #475569; padding: 0.4rem 0.2rem; position: relative; text-decoration: none; transition: all 0.25s ease; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 50%; right: 50%; height: 2px; background: linear-gradient(90deg, #c1272d, #006233); border-radius: 2px; transition: left 0.25s ease, right 0.25s ease; }
        .nav-link:hover::after, .nav-link.active::after { left: 0; right: 0; }
        .nav-link:hover, .nav-link.active { color: #c1272d; }
        .nav-right { display: flex; align-items: center; gap: 0.75rem; }
        .nav-cta { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 1.15rem; background: linear-gradient(135deg, #c1272d, #006233); color: white; font-weight: 600; font-size: 0.875rem; border-radius: 9999px; box-shadow: 0 2px 6px rgba(193,39,45,0.25); text-decoration: none; transition: all 0.25s ease; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(193,39,45,0.35); }
        .nav-cta.nav-cta-mobile { display: none; }
        .nav-cta.nav-cta-desktop { display: inline-flex; }
        .nav-toggle { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 6px; width: 34px; height: 34px; justify-content: center; align-items: center; border-radius: 6px; }
        .nav-toggle span { display: block; width: 20px; height: 2px; background: #1e293b; border-radius: 2px; }

        @media (max-width: 868px) {
            .nav-menu { display: none; position: fixed; top: 58px; left: 0; right: 0; background: white; flex-direction: column; padding: 1.25rem; border-bottom: 1px solid #e2e8f0; box-shadow: 0 8px 20px rgba(0,0,0,0.08); gap: 0.75rem; }
            .nav-menu.active { display: flex; }
            .nav-toggle { display: flex; }
            .nav-cta.nav-cta-mobile { display: inline-flex; }
            .nav-cta.nav-cta-desktop { display: none; }
        }`;

// ═══ 2. HTML DE LA NAVBAR UNIFIÉE ═══
function getUnifiedNavbarHtml(activePage) {
    return `    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo" aria-label="Prof EPS - Accueil">
                <img src="/images/prof_eps.png" onerror="this.onerror=null; this.src='images/prof_eps.png'; if(!this.complete || this.naturalWidth === 0) { this.src='https://profeps.ma/images/prof_eps.png'; }" alt="Prof EPS" width="140" height="40" fetchpriority="high" decoding="async">
            </a>
            <div class="nav-menu" id="navMenu">
                <a href="index.html" class="nav-link${activePage === 'home' ? ' active' : ''}">Accueil</a>
                <a href="generateur.html" class="nav-link${activePage === 'generateur' ? ' active' : ''}">Générateur</a>
                <a href="calculateur-vma.html" class="nav-link${activePage === 'vma' ? ' active' : ''}">Calculateur VMA</a>
                <a href="blog.html" class="nav-link${activePage === 'blog' ? ' active' : ''}">Blog</a>
                <a href="generateur.html" class="nav-cta nav-cta-mobile"><span>✨</span> Créer un document</a>
            </div>
            <div class="nav-right">
                <a href="generateur.html" class="nav-cta nav-cta-desktop"><span>✨</span> Créer un document</a>
                <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu"><span></span><span></span><span></span></button>
            </div>
        </div>
    </nav>`;
}

// ═══ 3. SCAN ET HARMONISATION DE TOUS LES FICHIERS HTML ═══
function getAllHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist') return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = getAllHtmlFiles('.');
let updatedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const base = path.basename(filePath);
    let activePage = '';
    if (base === 'index.html') activePage = 'home';
    else if (base === 'generateur.html') activePage = 'generateur';
    else if (base === 'calculateur-vma.html') activePage = 'vma';
    else if (base.startsWith('blog') || base.startsWith('article-') || base.includes('bibliotheque')) activePage = 'blog';

    // Remplacement HTML de la navbar
    const navHtmlRegex = /<nav\s+class=["']navbar["'][\s\S]*?<\/nav>/i;
    if (navHtmlRegex.test(content)) {
        content = content.replace(navHtmlRegex, getUnifiedNavbarHtml(activePage));
        modified = true;
    }

    // Remplacement CSS de la navbar dans <style>
    const navCssRegex1 = /\/\*\s*═══\s*NAVBAR[\s\S]*?(?=\/\*\s*═══\s*FOOTER|\/\*\s*═══\s*CONTENT|<\/style>)/i;
    const navCssRegex2 = /\.navbar\s*\{\s*position:\s*fixed[\s\S]*?(?=\/\*\s*═══\s*FOOTER|\/\*\s*═══\s*CONTENT|<\/style>)/i;

    if (navCssRegex1.test(content)) {
        content = content.replace(navCssRegex1, unifiedNavbarCss + '\n        ');
        modified = true;
    } else if (navCssRegex2.test(content)) {
        content = content.replace(navCssRegex2, unifiedNavbarCss + '\n        ');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Navbar harmonisée dans : ${filePath}`);
        updatedCount++;
    }
});

console.log(`\n🎉 TERMINÉ ! ${updatedCount} fichiers HTML ont été harmonisés.`);