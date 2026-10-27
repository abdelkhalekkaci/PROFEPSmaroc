import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://profeps.ma';
const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

// Collect all unique html files across root and public
const htmlFiles = new Set();

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry.endsWith('.html')) {
      htmlFiles.add(entry);
    }
  }
}

scanDir(rootDir);
scanDir(publicDir);

// Blacklist of pages that must NOT be in sitemap (redirects, 404, or non-indexable)
const EXCLUDED_FILES = new Set([
  'index.html', // represented by /
  '404.html',
  'orientations-pedagogiques-2007-2009.html', // duplicate 301
  'programme-eps.html', // duplicate 301
  'cycles-eps.html', // duplicate 301
  'evaluation-eps-baremes.html', // duplicate 301
  'securite.html', // duplicate 301
]);

const today = new Date().toISOString().split('T')[0];

function getUrlMeta(filename) {
  if (filename === '') {
    return { priority: '1.0', changefreq: 'daily' };
  }
  if (filename === 'orientations-pedagogiques-eps-2007-2009.html') {
    return { priority: '0.95', changefreq: 'weekly' };
  }
  if ([
    'cycles-eps-maroc.html',
    'programme-eps-maroc.html',
    'evaluation-eps.html',
    'securite-eps.html',
    'hub-outils-sport-performance.html'
  ].includes(filename)) {
    return { priority: '0.90', changefreq: 'weekly' };
  }
  if (filename.startsWith('calculateur-') || filename.startsWith('generateur-')) {
    return { priority: '0.85', changefreq: 'weekly' };
  }
  if (filename.startsWith('article-') || filename.startsWith('cycle-') || filename.startsWith('qa-')) {
    return { priority: '0.80', changefreq: 'monthly' };
  }
  if (['cgu.html', 'contact.html', 'politique-confidentialite.html', 'a-propos.html'].includes(filename)) {
    return { priority: '0.30', changefreq: 'yearly' };
  }
  return { priority: '0.70', changefreq: 'monthly' };
}

// Build URL list
const urls = [
  { loc: `${BASE_URL}/`, ...getUrlMeta('') }
];

const sortedFiles = Array.from(htmlFiles).sort();
for (const file of sortedFiles) {
  if (EXCLUDED_FILES.has(file)) continue;
  urls.push({
    loc: `${BASE_URL}/${file}`,
    ...getUrlMeta(file)
  });
}

// Generate XML content
const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`),
  '</urlset>'
];

const sitemapXml = xmlLines.join('\n');

// Write to root and public
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`[OK] sitemap.xml generated at root with ${urls.length} URLs`);

if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`[OK] sitemap.xml generated in public/ with ${urls.length} URLs`);
}
