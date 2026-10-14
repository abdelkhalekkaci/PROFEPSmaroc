(async () => {
const fs = await import('fs');
const path = await import('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const hasPublicDir = fs.existsSync(publicDir);

console.log('\n================================================================');
console.log('🛡️  PHASE A & B : RÉPARATION SEO COMPLÈTE (PROFEPS MAROC)');
console.log('📂  Dossier racine :', rootDir);
console.log('📁  Dossier public détecté :', hasPublicDir);
console.log('================================================================\n');

// 1. CRÉATION DES 4 PAGES PILIERS SI ABSENTES
const PILLAR_PAGES = [
  'cycles-eps-maroc.html',
  'programme-eps-maroc.html',
  'evaluation-eps.html',
  'securite-eps.html'
];

function getPillarTemplate(filename) {
  const meta = {
    'cycles-eps-maroc.html': {
      title: "Cycles d'EPS au Maroc : Programmes Collège & Lycée | ProfEPS",
      desc: "Tous les cycles d'apprentissage EPS au Maroc par APSA et niveau scolaire (collège et lycée) selon les orientations pédagogiques officielles du MEN.",
      h1: "Cycles d'Apprentissage en EPS au Maroc",
      sub: "Guide didactique complet, programmation des modules et cycles d'enseignement par APSA (Collège & Lycée) conformes aux Orientations Pédagogiques Officielles (OP 2007 & 2009)."
    },
    'programme-eps-maroc.html': {
      title: "Programme EPS Maroc : Horaires, Modules & MEN | ProfEPS",
      desc: "Programme officiel d'EPS au Maroc : volume horaire par niveau, compétences visées au collège et lycée, modules d'enseignement et directives ministérielles.",
      h1: "Programme Officiel d'EPS au Maroc (Collège & Lycée)",
      sub: "Volumes horaires réglementaires, compétences visées par cycle d'enseignement, modules didactiques et finalités éducatives selon les Orientations Pédagogiques Officielles (MEN)."
    },
    'evaluation-eps.html': {
      title: "Évaluation EPS Maroc : Barèmes Officiels & Bac | ProfEPS",
      desc: "Guide de l'évaluation en EPS au Maroc : critères officiels, barèmes d'examen du Baccalauréat, évaluation diagnostique, formative et sommative.",
      h1: "Évaluation et Barèmes Officiels en EPS au Maroc",
      sub: "Modalités d'évaluation diagnostique, formative et certificative, barèmes officiels des épreuves du Baccalauréat marocain et grilles critériées d'observation."
    },
    'securite-eps.html': {
      title: "Sécurité en EPS Maroc : Protocoles & Prévention | ProfEPS",
      desc: "Règles de sécurité et prévention des accidents en EPS : devoirs de surveillance de l'enseignant, trousse de secours et protocole d'urgence au Maroc.",
      h1: "Sécurité et Prévention des Accidents en EPS au Maroc",
      sub: "Obligations juridiques de l'enseignant, contrôle des aires de pratique sportive, prévention des traumatismes et protocole de premiers secours en milieu scolaire."
    }
  }[filename];

  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://profeps.ma/${filename}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
  <header class="pt-28 pb-12 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80">
    <div class="max-w-5xl mx-auto px-4 text-center space-y-4">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${meta.h1}</h1>
      <p class="max-w-3xl mx-auto text-base text-slate-300">${meta.sub}</p>
    </div>
  </header>
  <main class="flex-grow max-w-5xl mx-auto px-4 py-10 space-y-8">
    <section class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-2xl font-bold text-white">Contenu Pédagogique Officiel (MEN)</h2>
      <p class="text-slate-300 leading-relaxed">${meta.desc}</p>
    </section>
  </main>
</body>
</html>`;
}

PILLAR_PAGES.forEach((pillar) => {
  const rootPillarPath = path.join(rootDir, pillar);
  if (!fs.existsSync(rootPillarPath) || fs.statSync(rootPillarPath).size < 500) {
    fs.writeFileSync(rootPillarPath, getPillarTemplate(pillar), 'utf8');
    console.log(`  ✔ Page pilier créée : ${pillar}`);
  }
  if (hasPublicDir) {
    const publicPillarPath = path.join(publicDir, pillar);
    if (!fs.existsSync(publicPillarPath) || fs.statSync(publicPillarPath).size < 500) {
      fs.writeFileSync(publicPillarPath, getPillarTemplate(pillar), 'utf8');
      console.log(`  ✔ Page pilier copiée dans public/ : ${pillar}`);
    }
  }
});

// 2. CORRECTION DU NOINDEX SUR LA PAGE OP (U1)
const opFiles = ['orientations-pedagogiques-eps-2007-2009.html', 'orientations-pedagogiques-2007-2009.html'];
opFiles.forEach((opFile) => {
  const targets = [path.join(rootDir, opFile)];
  if (hasPublicDir) targets.push(path.join(publicDir, opFile));
  targets.forEach((opPath) => {
    if (fs.existsSync(opPath)) {
      let content = fs.readFileSync(opPath, 'utf8');
      content = content.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
      content = content.replace(/<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
      fs.writeFileSync(opPath, content, 'utf8');
      console.log(`  ✔ Noindex retiré sur ${path.basename(opPath)}`);
    }
  });
});

// 3. REMPLACEMENT DES H4 FOOTER ET MAILLAGE INTERNE (U3, B2)
let modifiedCount = 0;
function scanAndFixHtml(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', '.aistudio'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanAndFixHtml(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // H4 vers <p class="footer-col-title">
      const h4Regex = /<h4\b([^>]*(?:data-i18n-(?:fr|en|ar)|class=["'][^"']*footer|NAVIGATION|RESSOURCES|CALCULATEURS|LÉGAL)[^>]*)>([\s\S]*?)<\/h4>/gi;
      if (h4Regex.test(html)) {
        html = html.replace(h4Regex, (m, attrs, inner) => `<p ${attrs.trim()} class="footer-col-title">${inner}</p>`);
        changed = true;
      }

      // Liens brisés footer
      const broken = [
        { oldHref: 'cycles-eps.html', newHref: 'cycles-eps-maroc.html' },
        { oldHref: 'programme-eps.html', newHref: 'programme-eps-maroc.html' },
        { oldHref: 'evaluation.html', newHref: 'evaluation-eps.html' },
        { oldHref: 'securite.html', newHref: 'securite-eps.html' },
        { oldHref: 'evaluation-eps-baremes.html', newHref: 'evaluation-eps.html' }
      ];
      broken.forEach(({ oldHref, newHref }) => {
        if (html.includes(`href="${oldHref}"`)) {
          html = html.replaceAll(`href="${oldHref}"`, `href="${newHref}"`);
          changed = true;
        }
      });

      // Maillage slugs cycles sur cycles-eps-maroc.html
      if (entry.name === 'cycles-eps-maroc.html') {
        const cycleSlugs = ['cycle-basketball-college', 'cycle-basketball-lycee', 'cycle-volleyball-college', 'cycle-volleyball-lycee', 'cycle-handball-lycee', 'cycle-badminton-college', 'cycle-badminton-lycee'];
        cycleSlugs.forEach((slug) => {
          if (html.includes(`${slug}.html`)) {
            html = html.replaceAll(`${slug}.html`, `${slug}-eps-maroc.html`);
            changed = true;
          }
        });
      }

      if (changed) {
        fs.writeFileSync(fullPath, html, 'utf8');
        modifiedCount++;
      }
    }
  }
}
scanAndFixHtml(rootDir);
console.log(`  ✔ ${modifiedCount} fichiers HTML mis à jour (H4 footer + liens corrigés).`);

// 4. CRÉATION DU FICHIER .HTACCESS (U4, B6)
const htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\\ /index\\.html\\ HTTP/
  RewriteRule ^index\\.html$ https://profeps.ma/ [R=301,L]
  RewriteRule ^orientations-pedagogiques-2007-2009\\.html$ /orientations-pedagogiques-eps-2007-2009.html [R=301,L]
  RewriteRule ^evaluation-eps-baremes\\.html$ /evaluation-eps.html [R=301,L]
  RewriteRule ^programme-eps\\.html$ /programme-eps-maroc.html [R=301,L]
  RewriteRule ^cycles-eps\\.html$ /cycles-eps-maroc.html [R=301,L]
  RewriteRule ^securite\\.html$ /securite-eps.html [R=301,L]
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP_HOST} ^(?:www\\.)?profeps\\.ma$ [NC]
  RewriteRule ^(.*)$ https://profeps.ma/$1 [R=301,L]
</IfModule>
<IfModule mod_headers.c>
  Header always unset X-Robots-Tag
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
`;
fs.writeFileSync(path.join(rootDir, '.htaccess'), htaccess, 'utf8');
if (hasPublicDir) fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccess, 'utf8');
console.log('  ✔ .htaccess enregistré.');

// 5. GÉNÉRATION DU SITEMAP.XML (B3)
const allHtml = new Set();
function collect(d) {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).forEach(f => { if (f.endsWith('.html') && !f.startsWith('.')) allHtml.add(f); });
}
collect(rootDir);
if (hasPublicDir) collect(publicDir);

const sitemapUrls = ['https://profeps.ma/'];
allHtml.forEach(f => {
  if (!['index.html', '404.html', 'cycles-eps.html', 'programme-eps.html', 'securite.html', 'evaluation-eps-baremes.html'].includes(f)) {
    sitemapUrls.push(`https://profeps.ma/${f}`);
  }
});
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u === 'https://profeps.ma/' ? '1.0' : '0.85'}</priority>\n  </url>`).join('\n') +
  `\n</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
if (hasPublicDir) fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`  ✔ sitemap.xml généré (${sitemapUrls.length} pages).`);

// 6. APPLICATION DU FOOTER UNIFIÉ SI PRÉSENT
if (fs.existsSync(path.join(rootDir, 'unifier-navbar-footer.js'))) {
  const { execSync } = await import('child_process');
  try { execSync('node unifier-navbar-footer.js', { stdio: 'inherit' }); } catch (e) {}
}

console.log('\n🎉 TOUTES LES MODIFICATIONS ONT ÉTÉ APPLIQUÉES !');
})();
