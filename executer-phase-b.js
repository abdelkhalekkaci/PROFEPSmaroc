import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

console.log("======================================================");
console.log("🚀 EXÉCUTION DE LA PHASE B : CORRECTIONS TECHNIQUES");
console.log("======================================================");

// 1. MISE À JOUR DE generer-10-outils.js AVEC LES TITRES & DESCRIPTIONS SEO (B1 & B2)
if (fs.existsSync('generer-10-outils.js')) {
  let scriptCode = fs.readFileSync('generer-10-outils.js', 'utf8');

  // Remplacement dans buildPageHtml
  if (!scriptCode.includes('const pageTitle = config.seoTitle')) {
    scriptCode = scriptCode.replace(
      '<title>${escapeHtmlText(config.titleFr)} | Prof EPS Maroc</title>',
      '<title>${escapeHtmlText(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}</title>'
    );
    scriptCode = scriptCode.replace(
      '<meta name="description" id="metaDesc" content="${escapeAttr(config.subFr)}" />',
      '<meta name="description" id="metaDesc" content="${escapeAttr(config.seoDesc || config.subFr)}" />'
    );
    scriptCode = scriptCode.replace(
      '<meta property="og:title" content="${escapeAttr(config.titleFr)} | Prof EPS Maroc" />',
      '<meta property="og:title" content="${escapeAttr(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}" />'
    );
    scriptCode = scriptCode.replace(
      '<meta property="og:description" content="${escapeAttr(config.subFr)}" />',
      '<meta property="og:description" content="${escapeAttr(config.seoDesc || config.subFr)}" />'
    );
    scriptCode = scriptCode.replace(
      '<meta name="twitter:title" content="${escapeAttr(config.titleFr)} | Prof EPS Maroc" />',
      '<meta name="twitter:title" content="${escapeAttr(config.seoTitle || (config.titleFr + " | Prof EPS Maroc"))}" />'
    );
    scriptCode = scriptCode.replace(
      '<meta name="twitter:description" content="${escapeAttr(config.subFr)}" />',
      '<meta name="twitter:description" content="${escapeAttr(config.seoDesc || config.subFr)}" />'
    );
  }

  const SEO_MAP = {
    'calculateur-vdot-asr-endurance.html': {
      seoTitle: 'Calculateur VO2 Max & VDOT Course | Prof EPS',
      seoDesc: 'Calculez votre VO2 Max, vos allures d’entraînement VDOT et vos chronos prédits selon votre niveau. Barème ACSM et repères EPS.'
    },
    'calculateur-frequence-cardiaque-karvonen.html': {
      seoTitle: 'Calculateur Fréquence Cardiaque Karvonen | Prof EPS',
      seoDesc: 'Déterminez votre FC Max, FC de réserve et vos 5 zones cibles d’entraînement avec la méthode Karvonen. Repères pour l’EPS.'
    },
    'calculateur-imc-sportif-masse-grasse.html': {
      seoTitle: 'Calculateur IMC Sportif & Masse Grasse | Prof EPS',
      seoDesc: 'Estimez votre IMC, taux de masse grasse et masse maigre active. Interprétation athlétique et repères officiels pour l’EPS.'
    },
    'calculateur-chaleur-meteo-altitude.html': {
      seoTitle: 'Ajustement Chaleur, Météo & Altitude | Prof EPS',
      seoDesc: 'Ajustez vos allures de course selon la météo et l’altitude. Point de rosée, hydratation et consignes de sécurité thermique.'
    },
    'generateur-intermittent-hiit-cod.html': {
      seoTitle: 'Calculateur HIIT & Navettes COD 180° | Prof EPS',
      seoDesc: 'Calculez vos distances d’intermittent HIIT avec ou sans demi-tours 180°. Modèle Buchheit pour sports collectifs et cours d’EPS.'
    },
    'calculateur-charge-rpe-foster-acwr.html': {
      seoTitle: 'Calculateur Charge RPE & Ratio ACWR | Prof EPS',
      seoDesc: 'Suivez votre charge d’entraînement aiguë/chronique et évaluez votre ratio ACWR pour prévenir les blessures selon Gabbett.'
    },
    'calculateur-asr-reserve-vitesse.html': {
      seoTitle: 'Calculateur Réserve de Vitesse ASR | Prof EPS',
      seoDesc: 'Analysez votre profil neuromusculaire (endurant, hybride, sprinteur) et personnalisez vos séances intermittentes avec l’ASR.'
    },
    'calculateur-indice-endurance.html': {
      seoTitle: 'Calculateur Indice d’Endurance (IE) | Prof EPS',
      seoDesc: 'Mesurez votre maintien de VMA sur la distance (modèle Péronnet). Diagnostic précis entre travail du seuil et de la VMA.'
    },
    'calculateur-gap-pente-nutrition.html': {
      seoTitle: 'Calculateur Allure Pente GAP & Glucides | Prof EPS',
      seoDesc: 'Convertissez votre effort en dénivelé en allure équivalente sur le plat (Minetti) et planifiez vos apports glucidiques.'
    },
    'hub-outils-sport-performance.html': {
      seoTitle: 'Calculateurs Sport & Physiologie EPS | Prof EPS',
      seoDesc: 'Accédez aux 9 calculateurs sportifs interactifs : VO2 Max, Karvonen, ACWR, HIIT, VDOT, ASR et nutrition pour l’EPS et le running.'
    }
  };

  for (const [fn, meta] of Object.entries(SEO_MAP)) {
    if (!scriptCode.includes(`seoTitle: ${JSON.stringify(meta.seoTitle)}`)) {
      scriptCode = scriptCode.replace(
        `filename: '${fn}',`,
        `filename: '${fn}',\n    seoTitle: ${JSON.stringify(meta.seoTitle)},\n    seoDesc: ${JSON.stringify(meta.seoDesc)},`
      );
    }
  }

  fs.writeFileSync('generer-10-outils.js', scriptCode, 'utf8');
  console.log('✅ [B1/B2] generer-10-outils.js mis à jour avec les balises SEO cibles.');
}

// 2. CONFIGURATION DU .HTACCESS : REDIRECTIONS 301, GZIP ET CACHE (B4, B5, B6)
const htaccessContent = `# ==============================================================================
# ProfEPS.ma - Configuration Apache, Redirections 301 & Vitesse (PageSpeed)
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Redirection 301 /index.html vers la racine /
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\\ /index\\.html\\ HTTP/
  RewriteRule ^index\\.html$ https://profeps.ma/ [R=301,L]

  # 2. Redirection 301 de l'ancienne variante OP sans "eps" vers la page canonique
  RewriteRule ^orientations-pedagogiques-2007-2009\\.html$ /orientations-pedagogiques-eps-2007-2009.html [R=301,L]

  # 3. Redirections des anciennes URLs / doublons vers les pages canoniques
  RewriteRule ^evaluation-eps-baremes\\.html$ /evaluation-eps.html [R=301,L]
  RewriteRule ^programme-eps\\.html$ /programme-eps-maroc.html [R=301,L]
  RewriteRule ^cycles-eps\\.html$ /cycles-eps-maroc.html [R=301,L]
  RewriteRule ^securite\\.html$ /securite-eps.html [R=301,L]

  # 4. Redirection vers HTTPS canonique
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP_HOST} ^(?:www\\.)?profeps\\.ma$ [NC]
  RewriteRule ^(.*)$ https://profeps.ma/$1 [R=301,L]
</IfModule>

# En-têtes robots
<IfModule mod_headers.c>
  Header always unset X-Robots-Tag
</IfModule>

# 5. Compression Gzip / Deflate pour la vitesse
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# 6. Mise en cache prolongée des médias statiques (PageSpeed)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
`;

fs.writeFileSync('.htaccess', htaccessContent, 'utf8');
if (fs.existsSync('public')) {
  fs.writeFileSync('public/.htaccess', htaccessContent, 'utf8');
}
console.log('✅ [B4/B5/B6] .htaccess configuré (Redirections 301, Gzip et Cache navigateur).');

// 3. GÉNÉRATEUR AUTOMATISÉ DU SITEMAP.XML SANS 404 NI REDIRECTIONS (B7)
const BASE_URL = 'https://profeps.ma';
const htmlFiles = new Set();

function scan(d) {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).forEach(f => {
    if (f.endsWith('.html')) htmlFiles.add(f);
  });
}
scan(rootDir);
scan(publicDir);

const EXCLUDED = new Set([
  'index.html',
  '404.html',
  'orientations-pedagogiques-2007-2009.html',
  'programme-eps.html',
  'cycles-eps.html',
  'evaluation-eps-baremes.html',
  'securite.html'
]);

const today = new Date().toISOString().split('T')[0];
const sitemapEntries = [
  `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`
];

Array.from(htmlFiles).sort().forEach(file => {
  if (EXCLUDED.has(file)) return;
  let prio = '0.80';
  let freq = 'monthly';
  if (file === 'orientations-pedagogiques-eps-2007-2009.html') { prio = '0.95'; freq = 'weekly'; }
  else if (['cycles-eps-maroc.html', 'programme-eps-maroc.html', 'evaluation-eps.html', 'securite-eps.html', 'hub-outils-sport-performance.html'].includes(file)) { prio = '0.90'; freq = 'weekly'; }
  else if (file.startsWith('calculateur-') || file.startsWith('generateur-')) { prio = '0.85'; freq = 'weekly'; }
  else if (['cgu.html', 'contact.html', 'politique-confidentialite.html', 'a-propos.html'].includes(file)) { prio = '0.30'; freq = 'yearly'; }

  sitemapEntries.push(`  <url>\n    <loc>${BASE_URL}/${file}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`);
});

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>`;
fs.writeFileSync('sitemap.xml', sitemapContent, 'utf8');
if (fs.existsSync('public')) {
  fs.writeFileSync('public/sitemap.xml', sitemapContent, 'utf8');
}
console.log(`✅ [B7] sitemap.xml généré (${sitemapEntries.length} URLs valides, zéro 404, zéro redirection).`);
