const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'public');

// ═══ CSS canonique footer ═══
const FOOTER_CSS = `        /* ═══ FOOTER CANONIQUE ═══ */
        .footer { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 3.5rem 2rem 0; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; }
        .footer-brand { display: flex; flex-direction: column; gap: 1rem; }
        .footer-brand img { height: 48px; filter: brightness(0) invert(1); }
        .footer-brand p { color: rgba(255,255,255,0.65); font-size: 0.875rem; line-height: 1.75; }
        .footer-social { display: flex; gap: 0.625rem; margin-top: 0.25rem; }
        .footer-social a { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 50%; transition: all 0.3s ease; }
        .footer-social a:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
        .footer-social svg { width: 16px; height: 16px; fill: rgba(255,255,255,0.8); }
        .footer-col h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 1.125rem; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.625rem; }
        .footer-col ul li a { color: rgba(255,255,255,0.7); font-size: 0.875rem; transition: color 0.2s ease; display: inline-flex; align-items: center; gap: 0.375rem; }
        .footer-col ul li a:hover { color: white; }
        .footer-col ul li a .dot { width: 4px; height: 4px; border-radius: 50%; background: #c1272d; flex-shrink: 0; opacity: 0; transition: opacity 0.2s ease; }
        .footer-col ul li a:hover .dot { opacity: 1; }
        .footer-bottom { max-width: 1200px; margin: 0 auto; padding: 1.5rem 0; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .footer-copyright { color: rgba(255,255,255,0.35); font-size: 0.8125rem; }
        .footer-tagline { color: rgba(255,255,255,0.35); font-size: 0.8125rem; font-style: italic; }
        @media (max-width: 968px) { .footer-inner { grid-template-columns: 1fr 1fr; } .footer-brand { grid-column: 1 / -1; } }
        @media (max-width: 640px) { .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; } .footer-brand { grid-column: 1 / -1; } .footer-bottom { flex-direction: column; text-align: center; } }`;

// ═══ HTML canonique footer ═══
const FOOTER_HTML = `    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <a href="index.html"><img src="/images/prof_eps.png" alt="Prof EPS"></a>
                <p>Le premier générateur intelligent de fiches pédagogiques pour les professeurs d'EPS au Maroc — conforme aux OP 2007-2009.</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/profile.php?id=61586684012757" target="_blank" rel="noopener" aria-label="Facebook">
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
                    <li><a href="index.html"><span class="dot"></span>Accueil</a></li>
                    <li><a href="generateur.html"><span class="dot"></span>Générateur</a></li>
                    <li><a href="blog.html"><span class="dot"></span>Blog</a></li>
                    <li><a href="a-propos.html"><span class="dot"></span>À propos</a></li>
                    <li><a href="contact.html"><span class="dot"></span>Contact</a></li>
                    <li><a href="faq.html"><span class="dot"></span>FAQ</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Ressources</h4>
                <ul>
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
            <p class="footer-copyright">© 2026 Prof EPS. Tous droits réservés.</p>
            <p class="footer-tagline">Fait avec ❤️ pour les profs d'EPS au Maroc</p>
        </div>
    </footer>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updated = 0, skipped = 0;

files.forEach(file => {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');

    // 1. Replace the footer HTML block (multiline)
    const footerRegex = /<footer[\s\S]*?<\/footer>/;
    if (!footerRegex.test(content)) { skipped++; console.log('SKIP (no footer):', file); return; }
    content = content.replace(footerRegex, FOOTER_HTML);

    // 2. Strip all old footer CSS rules from <style> block
    // Match any CSS rule whose selector contains a footer class
    content = content.replace(/[ \t]*\.[a-zA-Z-]*footer[a-zA-Z-]*(?:\s+[^{]*)?\{[^}]*\}[ \t]*/g, '');

    // Clean up excessive blank lines inside <style>
    content = content.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (match, open, body, close) => {
        const cleaned = body.replace(/\n{3,}/g, '\n\n');
        return open + cleaned + close;
    });

    // 3. Inject canonical footer CSS just before </style>
    // Only inject once (before first </style>)
    content = content.replace(/<\/style>/, FOOTER_CSS + '\n        </style>');

    fs.writeFileSync(fp, content);
    updated++;
});

console.log('\nTotal updated:', updated, '| Skipped:', skipped);
