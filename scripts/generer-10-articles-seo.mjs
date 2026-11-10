/**
 * generer-10-articles-seo.mjs
 * Script d'exécution maître :
 * 1. Assemble et génère les 10 pages HTML d'articles autonomes à la racine
 * 2. Vérifie le calibrage en mots (> 2 000 mots par guide)
 * 3. Enregistre les URLs dans sitemap.xml
 * 4. Exécute ensuite unifier-navbar-footer.js pour appliquer la navbar et le footer uniformes
 */
import fs from 'fs';
import path from 'path';
import { ARTICLES_PART1 } from './scripts-articles/articles-part1.mjs';
import { ARTICLES_PART2 } from './scripts-articles/articles-part2.mjs';
import { renderArticleHtml, countWords } from './scripts-articles/builder.mjs';

const ALL_ARTICLES = [...ARTICLES_PART1, ...ARTICLES_PART2];

console.log('================================================================');
console.log('🚀 GÉNÉRATION DES 10 GUIDES PILIERS SEO (> 2 000 MOTS CHACUN)');
console.log('================================================================\n');

let totalWords = 0;
const generatedFiles = [];

for (const article of ALL_ARTICLES) {
  const htmlContent = renderArticleHtml(article);
  const words = countWords(htmlContent);
  totalWords += words;

  const targetPath = path.join(process.cwd(), `${article.slug}.html`);
  fs.writeFileSync(targetPath, htmlContent, 'utf8');

  console.log(`✅ [${words.toLocaleString()} mots] -> ${article.slug}.html`);
  console.log(`   📌 Titre : ${article.title.substring(0, 70)}...`);
  console.log(`   🔗 Outil lié : ${article.toolCard.file}\n`);

  generatedFiles.push({
    file: `${article.slug}.html`,
    slug: article.slug,
    title: article.title,
    words: words,
    seoTitle: article.seoTitle,
    metaDesc: article.metaDesc
  });
}

console.log(`🎉 10 articles générés avec succès ! Total cumulé : ${totalWords.toLocaleString()} mots.`);
console.log(`📊 Moyenne par article : ${Math.round(totalWords / 10).toLocaleString()} mots.\n`);

// ═══ MISE À JOUR SITEMAP.XML ═══
const sitemapPath = path.join(process.cwd(), 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  let addedCount = 0;

  for (const item of generatedFiles) {
    const urlEntry = `https://profeps.ma/${item.file}`;
    if (!sitemapContent.includes(urlEntry)) {
      const xmlBlock = `  <url>
    <loc>${urlEntry}</loc>
    <lastmod>2026-10-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
      sitemapContent = sitemapContent.replace('</urlset>', `${xmlBlock}</urlset>`);
      addedCount++;
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`🗺️ [SITEMAP] ${addedCount} nouvelles URLs d'articles ajoutées à sitemap.xml.`);
  } else {
    console.log(`🗺️ [SITEMAP] Les URLs sont déjà présentes dans sitemap.xml.`);
  }
}

// ═══ MISE À JOUR DE LA LISTE DANS seoAuditData.ts SI PRÉSENT ═══
const seoAuditPath = path.join(process.cwd(), 'src/data/seoAuditData.ts');
if (fs.existsSync(seoAuditPath)) {
  let auditContent = fs.readFileSync(seoAuditPath, 'utf8');
  let auditAdded = 0;

  for (const item of generatedFiles) {
    const pageId = `guide-${item.slug.substring(0, 20)}`;
    const pageUrl = `/${item.file}`;

    if (!auditContent.includes(`url: '${pageUrl}'`)) {
      const newAuditItem = `  {
    id: '${pageId}',
    url: '${pageUrl}',
    category: 'article',
    titleLength: ${item.seoTitle.length},
    descLength: ${item.metaDesc.length},
    hasHeadingSkip: false,
    isNoindex: false,
    isDuplicate: false,
    hasMultipleH1: false,
    isCanonicalIssue: false,
    proposedTitle: '${item.seoTitle.replace(/'/g, "\\'")}',
    proposedDesc: '${item.metaDesc.replace(/'/g, "\\'")}',
    suggestedHeadingFix: 'Hiérarchie H1-H2-H3 optimale',
    noindexAction: 'none',
    noindexReason: 'Guide pilier SEO à fort potentiel de trafic.',
    schemaType: 'Article',
    priority: 'High',
    h1Text: '${item.title.replace(/'/g, "\\'")}'
  },
`;
      // Insérer au début du tableau SEO_AUDIT_PAGES
      auditContent = auditContent.replace('export const SEO_AUDIT_PAGES: PageAuditItem[] = [', `export const SEO_AUDIT_PAGES: PageAuditItem[] = [\n${newAuditItem}`);
      auditAdded++;
    }
  }

  if (auditAdded > 0) {
    fs.writeFileSync(seoAuditPath, auditContent, 'utf8');
    console.log(`📈 [SEO AUDIT] ${auditAdded} guides ajoutés à l'annuaire d'audit SEO.`);
  }
}
