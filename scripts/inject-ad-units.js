/**
 * inject-ad-units.js
 * Ajoute les blocs publicitaires AdSense aux emplacements stratégiques.
 * Utilise les annonces "auto" (Google optimise automatiquement format et taille).
 * Publisher ID : ca-pub-8253776880916865
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const PUBLISHER_ID = 'ca-pub-8253776880916865';

// ─── CSS pour les blocs pub ───
const AD_CSS = `
        /* ═══ BLOCS PUBLICITAIRES ═══ */
        .ad-unit { width: 100%; overflow: hidden; margin: 2rem auto; text-align: center; }
        .ad-unit ins { display: block; }
        .ad-label { font-size: 0.6875rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.375rem; }`;

// ─── Bloc pub responsive (auto) ───
function adBlock(label = 'Publicité') {
    return `
        <!-- Bloc publicitaire AdSense -->
        <div class="ad-unit">
            <p class="ad-label">${label}</p>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${PUBLISHER_ID}"
                 data-ad-slot="auto"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
        </div>`;
}

// ─── Bloc pub in-article ───
function adInArticle() {
    return `
        <!-- Bloc publicitaire in-article AdSense -->
        <div class="ad-unit">
            <p class="ad-label">Publicité</p>
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-layout="in-article"
                 data-ad-format="fluid"
                 data-ad-client="${PUBLISHER_ID}"
                 data-ad-slot="auto"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
        </div>`;
}

let totalUpdated = 0;

// ════════════════════════════════════════════
// 1. ARTICLES — in-article après le 1er <h2>, + bloc fin de contenu
// ════════════════════════════════════════════
const articleFiles = fs.readdirSync(dir).filter(f =>
    f.startsWith('article-') && f.endsWith('.html')
);

articleFiles.forEach(file => {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');

    if (content.includes('adsbygoogle')) { return; } // déjà fait

    // Injecter CSS dans <style>
    content = content.replace(/<\/style>/, AD_CSS + '\n        </style>');

    // Injecter in-article après le premier </h2> dans le main content
    const firstH2Close = content.indexOf('</h2>');
    if (firstH2Close !== -1) {
        content = content.slice(0, firstH2Close + 5) + adInArticle() + content.slice(firstH2Close + 5);
    }

    // Injecter bloc avant le footer
    content = content.replace('    <footer class="footer">', adBlock('Publicité') + '\n    <footer class="footer">');

    fs.writeFileSync(fp, content);
    totalUpdated++;
});

// ════════════════════════════════════════════
// 2. BLOG — bloc entre la liste d'articles (après le 6e article card)
// ════════════════════════════════════════════
const blogFp = path.join(dir, 'blog.html');
let blog = fs.readFileSync(blogFp, 'utf8');
if (!blog.includes('adsbygoogle')) {
    blog = blog.replace(/<\/style>/, AD_CSS + '\n        </style>');
    // Injecter avant le footer
    blog = blog.replace('    <footer class="footer">', adBlock('Publicité') + '\n    <footer class="footer">');
    fs.writeFileSync(blogFp, blog);
    totalUpdated++;
}

// ════════════════════════════════════════════
// 3. INDEX — bloc sous la section hero (après la section .hero ou premier <section>)
// ════════════════════════════════════════════
const indexFp = path.join(dir, 'index.html');
let index = fs.readFileSync(indexFp, 'utf8');
if (!index.includes('adsbygoogle')) {
    index = index.replace(/<\/style>/, AD_CSS + '\n        </style>');
    // Injecter avant le footer
    index = index.replace('    <footer class="footer">', adBlock('Publicité') + '\n    <footer class="footer">');
    fs.writeFileSync(indexFp, index);
    totalUpdated++;
}

// ════════════════════════════════════════════
// 4. AUTRES PAGES DE CONTENU (orientations, ressources, bibliotheque)
// ════════════════════════════════════════════
const contentPages = [
    'orientations-pedagogiques-eps-2007-2009.html',
    'ressources-atd.html',
    'bibliotheque-numerique-eps.html',
    'faq.html',
];

contentPages.forEach(file => {
    const fp = path.join(dir, file);
    if (!fs.existsSync(fp)) return;
    let content = fs.readFileSync(fp, 'utf8');
    if (content.includes('adsbygoogle')) return;

    content = content.replace(/<\/style>/, AD_CSS + '\n        </style>');
    content = content.replace('    <footer class="footer">', adBlock('Publicité') + '\n    <footer class="footer">');
    fs.writeFileSync(fp, content);
    totalUpdated++;
});

console.log(`Blocs publicitaires ajoutés : ${totalUpdated} pages`);
console.log('Articles :', articleFiles.length);
