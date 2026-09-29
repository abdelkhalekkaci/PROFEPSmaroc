const fs = require('fs');
const path = require('path');

function getNavbar(activePage) {
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

const footerHtml = `    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <a href="/" aria-label="Prof EPS Maroc"><img src="/images/prof_eps.png" alt="Prof EPS Maroc" width="140" height="40" loading="lazy" decoding="async" style="height:48px; width:auto; object-fit:contain; filter:brightness(0) invert(1); margin-bottom:1rem;"></a>
                <p><strong>Prof EPS Maroc (profeps.ma)</strong> — le premier générateur intelligent de fiches pédagogiques pour les professeurs d'EPS au Maroc, conforme aux Orientations Pédagogiques 2007 (lycée) et 2009 (collège).</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/profile.php?id=61559954402311" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/profeps.ma/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/eps-prof-maroc-814590190/" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                </div>
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

const cssRules = `
        .nav-cta.nav-cta-mobile { display: none !important; }
        .nav-cta.nav-cta-desktop { display: inline-flex !important; }
        @media (max-width: 768px) {
            .nav-cta.nav-cta-mobile { display: inline-flex !important; }
            .nav-cta.nav-cta-desktop { display: none !important; }
        }
        .footer-social { display: flex !important; gap: 0.625rem !important; margin-top: 0.75rem !important; }
        .footer-social a { display: flex !important; align-items: center !important; justify-content: center !important; width: 36px !important; height: 36px !important; background: rgba(255,255,255,0.08) !important; border: 1px solid rgba(255,255,255,0.12) !important; border-radius: 50% !important; }
        .footer-social svg { width: 16px !important; height: 16px !important; max-width: 16px !important; max-height: 16px !important; fill: rgba(255,255,255,0.8) !important; }
`;

function getAllHtmlFiles(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getAllHtmlFiles(fullPath));
        } else if (entry.name.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = getAllHtmlFiles('.');
let updated = 0;

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const base = path.basename(file);
    let active = '';
    if (base === 'index.html') active = 'home';
    else if (base === 'generateur.html') active = 'generateur';
    else if (base === 'blog.html') active = 'blog';
    else if (base === 'calculateur-vma.html') active = 'vma';

    content = content.replace(/<nav[\s\S]*?<\/nav>/i, getNavbar(active));
    content = content.replace(/<footer[\s\S]*?<\/footer>/i, footerHtml);
    content = content.replace(/>\s*n'\s*</g, '><');
    content = content.replace(/n'\s*<a/g, '<a');
    content = content.replace(/n'\s*<ul>/g, '<ul>');
    content = content.replace(/`n/g, '');

    if (content.includes('</style>') && !content.includes('nav-cta.nav-cta-mobile')) {
        content = content.replace('</style>', cssRules + '\n    </style>');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fichier corrigé : ${file}`);
    updated++;
}

if (fs.existsSync('public')) {
    if (fs.existsSync('calculateur-vma.html')) {
        fs.copyFileSync('calculateur-vma.html', 'public/calculateur-vma.html');
        console.log('✅ Synchronisé avec public/calculateur-vma.html');
    }
}

console.log(`\n🎉 SUCCÈS TOTAL : ${updated} fichiers ont été 100% harmonisés et nettoyés !`);
