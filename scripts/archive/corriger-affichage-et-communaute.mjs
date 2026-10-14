import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const targetDirs = [rootDir, path.join(rootDir, 'public')].filter(d => fs.existsSync(d));

console.log('======================================================');
console.log('🛠️ CORRECTION AFFICHAGE VMA (IMAGE B) & SUPPRESSION COMMUNAUTÉ (IMAGE A)');
console.log('======================================================\n');

function cleanCommunityBlock(html) {
  // Supprime le bloc communauté
  const pattern = /<!--\s*BLOC COMMUNAUTÉ ENSEIGNANTS EPS MAROC[\s\S]*?<\/section>/g;
  return html.replace(pattern, '');
}

targetDirs.forEach(dir => {
  const dirName = path.relative(rootDir, dir) || '.';

  // 1. IMAGE A : Suppression du bloc communauté sur karvonen
  const karvonenPath = path.join(dir, 'calculateur-frequence-cardiaque-karvonen.html');
  if (fs.existsSync(karvonenPath)) {
    let karvonenHtml = fs.readFileSync(karvonenPath, 'utf8');
    karvonenHtml = cleanCommunityBlock(karvonenHtml);
    fs.writeFileSync(karvonenPath, karvonenHtml, 'utf8');
    console.log(`✅ [${dirName}] Bloc communauté supprimé de calculateur-frequence-cardiaque-karvonen.html (Image A)`);
  }

  // 2. IMAGE B : Réparation complète de l'affichage sur calculateur-vma.html
  const vmaPath = path.join(dir, 'calculateur-vma.html');
  if (fs.existsSync(vmaPath)) {
    let vmaHtml = fs.readFileSync(vmaPath, 'utf8');

    // Retrait du bloc communauté superflu
    vmaHtml = cleanCommunityBlock(vmaHtml);

    // Titre et métadonnées propres
    vmaHtml = vmaHtml.replace(
      /<title>.*?<\/title>/,
      '<title>Calculateur de VMA &amp; Allures de Course | ProfEPS</title>'
    );
    vmaHtml = vmaHtml.replace(
      /<meta property="og:title" content=".*?" \/>/,
      '<meta property="og:title" content="Calculateur de VMA &amp; Allures de Course | Prof EPS" />'
    );
    vmaHtml = vmaHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      '<meta name="twitter:title" content="Calculateur de VMA &amp; Allures de Course | Prof EPS" />'
    );

    // JSON-LD valide et fermé
    const validJsonLd = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebApplication","name":"Calculateur de VMA & Allures de Course","url":"https://profeps.ma/calculateur-vma.html","applicationCategory":"HealthApplication","operatingSystem":"All","inLanguage":["fr","en","ar"],"description":"Calculez votre VMA (km/h) par test continu ou progressif, convertissez en VO2 Max et obtenez vos allures Z1 à Z5.","keywords":"calculateur vma, vitesse maximale aérobie, demi-cooper 6 min, luc leger, test vameval, allures entrainement course","offers":{"@type":"Offer","price":"0","priceCurrency":"MAD"}},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Comment calculer sa VMA avec le test Demi-Cooper de 6 minutes ?","acceptedAnswer":{"@type":"Answer","text":"Divisez simplement la distance parcourue en mètres en 6 minutes par 100. Par exemple, 1 500 mètres en 6 minutes équivaut à une VMA de 15 km/h."}}]}]}</script>`;
    vmaHtml = vmaHtml.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      validJsonLd
    );

    // Fermeture des balises du Hero (fin des citations et chevrons manquants)
    vmaHtml = vmaHtml.replace(
      /<div id="ui-badge"[^>]*data-i18n-fr="[^"]*<\/div>/,
      '<div id="ui-badge" class="hero-badge" style="display:inline-flex;align-items:center;gap:0.45rem;background:linear-gradient(135deg,rgba(193,39,45,0.1),rgba(0,98,51,0.08));color:#c1272d;padding:0.4rem 1.1rem;border-radius:9999px;font-size:0.76rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.85rem;border:1px solid rgba(193,39,45,0.22);" data-i18n-fr="⚡ Outil Phare · Vitesse Maximale Aérobie (VMA)" data-i18n-en="⚡ Flagship Tool · Maximal Aerobic Speed (MAS)" data-i18n-ar="⚡ الأداة الرئيسية · السرعة الهوائية القصوى (VMA)">⚡ Outil Phare · Vitesse Maximale Aérobie (VMA)</div>'
    );

    vmaHtml = vmaHtml.replace(
      /<h1 id="ui-title"[^>]*data-i18n-fr="[^"]*<\/h1>/,
      '<h1 id="ui-title" style="font-size:clamp(1.55rem,3vw,2.25rem);font-weight:800;color:#0f172a;margin:0 auto 0.65rem auto;max-width:880px;line-height:1.22;" data-i18n-fr="Calculateur de VMA &amp; Allures de Course" data-i18n-en="MAS &amp; Running Paces Calculator" data-i18n-ar="حاسبة السرعة الهوائية ومناطق الجري">Calculateur de VMA &amp; Allures de Course</h1>'
    );

    fs.writeFileSync(vmaPath, vmaHtml, 'utf8');
    console.log(`✅ [${dirName}] Affichage, CSS et structure HTML réparés pour calculateur-vma.html (Image B)`);
  }
});

console.log('\n======================================================');
console.log('🎉 TOUTES LES CORRECTIONS ONT ÉTÉ APPLIQUÉES !');
console.log('======================================================\n');