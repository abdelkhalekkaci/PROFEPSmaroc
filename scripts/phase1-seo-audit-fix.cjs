const fs = require('fs');
const path = require('path');

const pubDir = path.join(process.cwd(), 'public');
const allFiles = fs.readdirSync(pubDir)
  .filter(f => f.endsWith('.html') && f !== 'google9e56188ccdfea7e9.html')
  .sort();

const OG_IMAGE_DEFAULT = 'https://profeps.ma/images/prof_eps.png';
const TODAY = '2026-11-03';

let fixedCanonical = 0;
let fixedOgImage = 0;
let fixedTwitterImage = 0;
let fixedJsonLd = 0;

for (const file of allFiles) {
  const filePath = path.join(pubDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  const pageUrl = file === 'index.html'
    ? 'https://profeps.ma/'
    : `https://profeps.ma/${file}`;

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'ProfEPS Maroc';

  const descMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["'][^>]*name=["']description["']/i);
  const description = descMatch
    ? descMatch[1].trim()
    : 'Plateforme didactique, scientifique et préparation aux concours CRMEF pour les enseignants au Maroc.';

  // 1. Canonical tag
  if (!html.includes('rel="canonical"') && !html.includes("rel='canonical'")) {
    const canonicalTag = `  <link rel="canonical" href="${pageUrl}" />\n`;
    if (html.includes('</title>')) {
      html = html.replace('</title>', `</title>\n${canonicalTag.trimEnd()}`);
    } else {
      html = html.replace('</head>', `${canonicalTag}</head>`);
    }
    fixedCanonical++;
    modified = true;
  }

  // 2. og:image tag
  if (!html.includes('property="og:image"') && !html.includes("property='og:image'")) {
    const ogImgTag = `  <meta property="og:image" content="${OG_IMAGE_DEFAULT}" />\n`;
    if (html.includes('property="og:site_name"')) {
      html = html.replace(/(<meta\s+property=["']og:site_name["'][^>]*>)/i, `$1\n${ogImgTag.trimEnd()}`);
    } else if (html.includes('</title>')) {
      html = html.replace('</title>', `</title>\n${ogImgTag.trimEnd()}`);
    } else {
      html = html.replace('</head>', `${ogImgTag}</head>`);
    }
    fixedOgImage++;
    modified = true;
  }

  // 3. twitter:image tag
  if (!html.includes('name="twitter:image"') && !html.includes("name='twitter:image'")) {
    const twImgTag = `  <meta name="twitter:image" content="${OG_IMAGE_DEFAULT}" />\n`;
    if (html.includes('name="twitter:description"')) {
      html = html.replace(/(<meta\s+name=["']twitter:description["'][^>]*>)/i, `$1\n${twImgTag.trimEnd()}`);
    } else if (html.includes('property="og:image"')) {
      html = html.replace(/(<meta\s+property=["']og:image["'][^>]*>)/i, `$1\n${twImgTag.trimEnd()}`);
    } else {
      html = html.replace('</head>', `${twImgTag}</head>`);
    }
    fixedTwitterImage++;
    modified = true;
  }

  // 4. JSON-LD Schema.org structured data
  if (!html.includes('application/ld+json')) {
    let schemaObj;
    if (file.startsWith('qcm-')) {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: title,
        description: description,
        url: pageUrl,
        inLanguage: ['fr', 'ar'],
        educationalAlignment: {
          '@type': 'AlignmentObject',
          alignmentType: 'educationalSubject',
          educationalFramework: 'Concours CRMEF Maroc - MENPS',
          targetName: title
        },
        provider: {
          '@type': 'EducationalOrganization',
          name: 'ProfEPS Maroc',
          url: 'https://profeps.ma/',
          logo: OG_IMAGE_DEFAULT
        }
      };
    } else if (file.startsWith('calculateur-') || file.startsWith('generateur') || file === 'widget-vma.html') {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description: description,
        url: pageUrl,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        inLanguage: ['fr', 'en', 'ar'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'MAD'
        }
      };
    } else if (file.startsWith('article-') || file.startsWith('guide-') || file.startsWith('qa-')) {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        url: pageUrl,
        image: OG_IMAGE_DEFAULT,
        inLanguage: 'fr',
        author: {
          '@type': 'Organization',
          name: 'ProfEPS Maroc',
          url: 'https://profeps.ma/'
        },
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'ProfEPS Maroc',
          logo: {
            '@type': 'ImageObject',
            url: OG_IMAGE_DEFAULT
          }
        }
      };
    } else {
      schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: pageUrl,
        inLanguage: 'fr',
        isPartOf: {
          '@type': 'WebSite',
          name: 'ProfEPS Maroc',
          url: 'https://profeps.ma/'
        }
      };
    }

    const ldScript = `  <script type="application/ld+json">${JSON.stringify(schemaObj)}</script>\n`;
    if (html.includes('<style')) {
      html = html.replace('<style', `${ldScript}  <style`);
    } else {
      html = html.replace('</head>', `${ldScript}</head>`);
    }
    fixedJsonLd++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
}

// 5. Sync public/index.html to root index.html
fs.copyFileSync(path.join(pubDir, 'index.html'), path.join(process.cwd(), 'index.html'));

// 6. Generate exhaustive sitemap.xml with all 149 indexable URLs
function getUrlConfig(file) {
  if (file === 'index.html') {
    return { loc: 'https://profeps.ma/', changefreq: 'daily', priority: '1.0', rank: 1 };
  }
  const topHubs = new Set([
    'concours-crmef-hub.html',
    'generateur.html',
    'hub-outils-sport-performance.html',
    'qcm-sciences-education-crmef.html'
  ]);
  if (topHubs.has(file)) {
    return { loc: `https://profeps.ma/${file}`, changefreq: 'daily', priority: '0.98', rank: 2 };
  }
  if (file.startsWith('qcm-')) {
    return { loc: `https://profeps.ma/${file}`, changefreq: 'weekly', priority: '0.95', rank: 3 };
  }
  if (file.startsWith('calculateur-') || file === 'generateur-intermittent-hiit-cod.html' || file === 'widget-vma.html') {
    return { loc: `https://profeps.ma/${file}`, changefreq: 'weekly', priority: '0.95', rank: 4 };
  }
  const pillars = new Set([
    'orientations-pedagogiques-eps-maroc.html',
    'programme-eps-maroc.html',
    'cycles-eps-maroc.html',
    'evaluation-eps.html',
    'securite-eps.html',
    'bibliotheque-numerique-eps.html',
    'projet-pedagogique-eps.html',
    'blog.html',
    'vma-differencier-course-duree-eps.html',
    'intermittent-hiit-changement-direction-cod.html',
    'formule-karvonen-zones-cardiaques-fc-reserve.html',
    'methode-vdot-jack-daniels-calcul-allures.html',
    'courir-forte-chaleur-point-de-rosee-altitude.html',
    'imc-sportif-masse-grasse-formule-deurenberg.html',
    'charge-entrainement-rpe-foster-monotonie-acwr.html',
    'allure-ajustee-pente-gap-modele-minetti.html',
    'reserve-vitesse-anaerobie-asr-sports-co.html',
    'indice-endurance-peronnet-thibault-vma.html'
  ]);
  if (pillars.has(file) || file.startsWith('guide-')) {
    return { loc: `https://profeps.ma/${file}`, changefreq: 'weekly', priority: '0.90', rank: 5 };
  }
  const legal = new Set([
    'a-propos.html',
    'contact.html',
    'mentions-legales.html',
    'politique-confidentialite.html',
    'cgu.html'
  ]);
  if (legal.has(file)) {
    return { loc: `https://profeps.ma/${file}`, changefreq: 'monthly', priority: '0.50', rank: 7 };
  }
  return { loc: `https://profeps.ma/${file}`, changefreq: 'weekly', priority: '0.85', rank: 6 };
}

const sitemapEntries = allFiles.map(getUrlConfig).sort((a, b) => {
  if (a.rank !== b.rank) return a.rank - b.rank;
  return a.loc.localeCompare(b.loc);
});

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
];

for (const entry of sitemapEntries) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${entry.loc}</loc>`);
  xmlLines.push(`    <lastmod>${TODAY}</lastmod>`);
  xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  xmlLines.push(`    <priority>${entry.priority}</priority>`);
  xmlLines.push('  </url>');
}
xmlLines.push('</urlset>');
xmlLines.push('');

fs.writeFileSync(path.join(pubDir, 'sitemap.xml'), xmlLines.join('\n'), 'utf8');

console.log(JSON.stringify({
  totalIndexablePages: allFiles.length,
  fixedCanonical,
  fixedOgImage,
  fixedTwitterImage,
  fixedJsonLd,
  sitemapUrlsGenerated: sitemapEntries.length
}, null, 2));
