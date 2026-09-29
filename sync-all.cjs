const fs = require('fs');
const path = require('path');

function getCanonicalNavbar(activePage) {
    return `    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="/" class="nav-logo" aria-label="Prof EPS Maroc - Accueil">
                <img src="/images/prof_eps.png" alt="Prof EPS Maroc" width="140" height="40" fetchpriority="high" decoding="async" style="height:56px; width:auto; max-width:180px; object-fit:contain; display:block;">
            </a>
            <div class="nav-menu" id="navMenu">
                <a href="/" class="nav-link${activePage === 'home' ? ' active' : ''}">Accueil</a>
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

const canonicalFooter = `    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <a href="/" aria-label="Prof EPS Maroc"><img src="/images/prof_eps.png" alt="Prof EPS Maroc" width="140" height="40" loading="lazy" decoding="async" style="height:48px; width:auto; object-fit:contain; filter:brightness(0) invert(1);"></a>
                <p><strong>Prof EPS Maroc (profeps.ma)</strong> — le premier générateur intelligent de fiches pédagogiques pour les professeurs d'EPS au Maroc, conforme aux Orientations Pédagogiques 2007 (lycée) et 2009 (collège).</p>
            </div>
            <div class="footer-col">
                <h4>Navigation</h4>
                <ul>
                    <li><a href="/"><span class="dot"></span>Accueil</a></li>
                    <li><a href="generateur.html"><span class="dot"></span>Générateur</a></li>
                    <li><a href="calculateur-vma.html"><span class="dot"></span>Calculateur VMA</a></li>
                    <li><a href="blog.html"><span class="dot"></span>Blog</a></li>
                    <li><a href="a-propos.html"><span class="dot"></span>À propos</a></li>
                    <li><a href="contact.html"><span class="dot"></span>Contact</a></li>
                    <li><a href="faq.html"><span class="dot"></span>FAQ</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Ressources</h4>
                <ul>
                    <li><a href="calculateur-vma.html"><span class="dot"></span>Calculateur VMA</a></li>
                    <li><a href="blog.html"><span class="dot"></span>Articles</a></li>
                    <li><a href="article-op.html"><span class="dot"></span>Orientations Pédagogiques</a></li>
                    <li><a href="article-eval.html"><span class="dot"></span>Évaluation en EPS</a></li>
                    <li><a href="article-securite.html"><span class="dot"></span>Sécurité en EPS</a></li>
                    <li><a href="bibliotheque-numerique-eps.html"><span class="dot"></span>Bibliothèque numérique</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Légal &amp; Contact</h4>
                <ul>
                    <li><a href="politique-confidentialite.html"><span class="dot"></span>Politique de confidentialité</a></li>
                    <li><a href="cgu.html"><span class="dot"></span>CGU</a></li>
                    <li><a href="contact.html"><span class="dot"></span>Nous contacter</a></li>
                    <li><a href="mailto:profepsma@gmail.com"><span class="dot"></span>profepsma@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-copyright">© 2026 Prof EPS Maroc (profeps.ma). Tous droits réservés.</p>
            <p class="footer-tagline">Fait avec ❤️ pour les profs d'EPS au Maroc</p>
        </div>
    </footer>`;

function getHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist') return;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = getHtmlFiles('.');
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const baseName = path.basename(file);
    let activePage = '';
    if (baseName === 'index.html') activePage = 'home';
    else if (baseName === 'generateur.html') activePage = 'generateur';
    else if (baseName === 'blog.html') activePage = 'blog';
    else if (baseName === 'calculateur-vma.html') activePage = 'vma';

    let changed = false;

    // 1. Replace Navbar cleanly
    const navRegex = /<nav\s+class=["']navbar["'][\s\S]*?<\/nav>/i;
    if (navRegex.test(content)) {
        content = content.replace(navRegex, getCanonicalNavbar(activePage));
        changed = true;
    }

    // 2. Replace Footer cleanly
    const footerRegex = /<footer\s+class=["']footer["'][\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, canonicalFooter);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ Mis à jour : ${file}`);
        count++;
    }
});

console.log(`\n🎉 SUCCÈS ! ${count} fichiers ont été uniformisés.`);