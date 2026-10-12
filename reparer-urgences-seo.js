import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
console.log('--- RESOLUTION DES URGENCES SEO PROFEPS MAROC (PHASE A) ---');

// 1. Definition et creation des 4 pages piliers si absentes
const pillars = [
  {
    file: 'cycles-eps-maroc.html',
    title: "Cycles d'EPS au Maroc : Programmes Collège & Lycée | ProfEPS",
    desc: "Guide complet des cycles d'apprentissage en EPS au Maroc (collège et lycée) : basketball, volleyball, handball, athlétisme, gymnastique et badminton.",
    h1: "Cycles d'Apprentissage en EPS au Maroc",
    badge: "Orientations Pédagogiques Officielles MEN",
    body: `
      <h2>1. Architecture des Cycles d'EPS au Maroc</h2>
      <p>Au Maroc, l'enseignement de l'Éducation Physique et Sportive (EPS) est structuré en cycles d'apprentissage cohérents de 10 à 12 séances de 2 heures, conformément aux <strong>Orientations Pédagogiques de 2007 (Collège)</strong> et <strong>2009 (Lycée)</strong>.</p>
      <h2>2. Répertoire des Cycles par APSA et Niveau Scolaire</h2>
      <ul>
        <li><a href="cycle-basketball-college-eps-maroc.html">Cycle Basketball Collège</a> &bull; <a href="cycle-basketball-lycee-eps-maroc.html">Cycle Basketball Lycée</a></li>
        <li><a href="cycle-volleyball-college-eps-maroc.html">Cycle Volleyball Collège</a> &bull; <a href="cycle-volleyball-lycee-eps-maroc.html">Cycle Volleyball Lycée</a></li>
        <li><a href="cycle-handball-college-eps-maroc.html">Cycle Handball Collège</a> &bull; <a href="cycle-handball-lycee-eps-maroc.html">Cycle Handball Lycée</a></li>
        <li><a href="cycle-badminton-college-eps-maroc.html">Cycle Badminton Collège</a> &bull; <a href="cycle-badminton-lycee-eps-maroc.html">Cycle Badminton Lycée</a></li>
      </ul>
      <h2>3. Outils Pratiques pour l'Enseignant</h2>
      <p>Pour concevoir vos séances d'endurance et de demi-fond, utilisez le <a href="calculateur-vma.html">Calculateur VMA</a> et le <a href="generateur.html">Générateur de Fiches de Séance</a>.</p>
    `
  },
  {
    file: 'programme-eps-maroc.html',
    title: "Programme EPS Maroc : Horaires, Modules & MEN | ProfEPS",
    desc: "Programme officiel de l'EPS au Maroc : volumes horaires au collège et lycée, compétences disciplinaires, modules d'enseignement et textes officiels MEN.",
    h1: "Programme Officiel de l'EPS au Maroc",
    badge: "Cadre Réglementaire & Horaires MEN",
    body: `
      <h2>1. Volumes Horaires Réglementaires</h2>
      <p>Au collège comme au lycée d'enseignement général, le volume horaire officiel est de <strong>2 heures hebdomadaires par classe</strong> (séance de 2h consécutives). Pour les détails administratifs, consultez notre fiche <a href="qa-volume-horaire-eps-maroc.html">Volume horaire officiel de l'EPS au Maroc</a>.</p>
      <h2>2. Les Compétences Visées</h2>
      <p>Les programmes sont axés sur le développement de la motricité, de la gestion de la vie physique et de la citoyenneté. Consultez le texte fondateur sur <a href="orientations-pedagogiques-eps-2007-2009.html">les Orientations Pédagogiques EPS 2007 et 2009</a>.</p>
      <h2>3. Modules d'Enseignement au Lycée</h2>
      <p>Le cursus du secondaire qualifiant articule des modules thématiques : gestion de l'effort, coopération et confrontation collective, maîtrise des émotions.</p>
    `
  },
  {
    file: 'evaluation-eps.html',
    title: "Évaluation EPS Maroc : Barèmes & Épreuves Bac | ProfEPS",
    desc: "Cadre d'évaluation en EPS au Maroc : barèmes officiels, coefficient de l'EPS au Baccalauréat, évaluation diagnostique, formative et sommative.",
    h1: "Évaluation et Barèmes en EPS au Maroc",
    badge: "Épreuves et Coefficients MEN",
    body: `
      <h2>1. Modalités de l'Évaluation au Baccalauréat</h2>
      <p>L'EPS est une discipline obligatoire pour l'obtention du Baccalauréat marocain (coefficient 1 pour l'ensemble des filières générales). Pour tout comprendre sur le calcul, consultez <a href="qa-coefficient-eps-bac-maroc.html">le coefficient de l'EPS au Bac Maroc</a> et <a href="qa-evaluation-eps-bac.html">le déroulement des épreuves du Bac EPS</a>.</p>
      <h2>2. Les Trois Temps de l'Évaluation</h2>
      <ul>
        <li><strong>Évaluation diagnostique</strong> : identification des conduites initiales et mesure de la VMA avec le <a href="calculateur-vma.html">Calculateur VMA</a>.</li>
        <li><strong>Évaluation formative</strong> : régulation continue des apprentissages pendant le cycle.</li>
        <li><strong>Évaluation sommative</strong> : mesure finale des acquis selon la grille ministérielle (Performance, Maîtrise, Conduite).</li>
      </ul>
      <h2>3. Articles et Guides d'Évaluation</h2>
      <p>Consultez nos analyses détaillées : <a href="article-eval.html">Guide de l'évaluation pédagogique en EPS</a> et <a href="article-criteres.html">Critères d'évaluation par famille d'activités</a>.</p>
    `
  },
  {
    file: 'securite-eps.html',
    title: "Sécurité en EPS au Maroc : Prévention & Règlements | ProfEPS",
    desc: "Consignes de sécurité, prévention des blessures et responsabilités juridiques de l'enseignant d'EPS au Maroc dans les établissements scolaires.",
    h1: "Sécurité et Prévention des Risques en EPS",
    badge: "Protocoles Sanitaires & Réglementation",
    body: `
      <h2>1. Responsabilité Pédagogique et Juridique de l'Enseignant</h2>
      <p>L'enseignant d'EPS est garant de l'intégrité physique de ses élèves. La sécurité active (échauffement méthodique, consignes claires) et la sécurité passive (conformité des installations et des agrès) sont obligatoires.</p>
      <h2>2. Prévention des Blessures et Gestion de l'Effort</h2>
      <p>Une bonne gestion de l'effort prévient les accidents musculo-tendineux. Consultez notre guide complet sur la <a href="article-prevention-blessures-eps.html">Prévention des blessures en EPS</a> et notre dossier sur la <a href="article-securite.html">Sécurité des installations scolaires</a>.</p>
      <h2>3. Outils de Calcul Physiologique pour la Santé</h2>
      <p>Adaptez l'effort de vos élèves en fonction des conditions ambiantes et cardiaques grâce à notre <a href="calculateur-chaleur-meteo-altitude.html">Calculateur Chaleur & Météo</a> et le <a href="calculateur-frequence-cardiaque-karvonen.html">Calculateur de Fréquence Cardiaque Karvonen</a>.</p>
    `
  }
];

function generatePillarHtml(p) {
  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}">
  <link rel="canonical" href="https://profeps.ma/${p.file}">
  <meta name="robots" content="index, follow">
  <link rel="stylesheet" href="css/style.css">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f1f5f9; margin: 0; line-height: 1.6; }
    .page-container { max-width: 960px; margin: 0 auto; padding: 40px 20px 80px; }
    .badge { display: inline-block; background: rgba(37,99,235,0.2); color: #60a5fa; border: 1px solid rgba(96,165,250,0.3); padding: 4px 14px; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 16px; }
    h1 { font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 24px; line-height: 1.25; }
    h2 { font-size: 1.45rem; font-weight: 700; color: #93c5fd; margin-top: 36px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
    p, li { font-size: 1.05rem; color: #cbd5e1; }
    a { color: #38bdf8; text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; color: #7dd3fc; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 28px; margin-top: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    ul { padding-left: 24px; }
    li { margin-bottom: 8px; }
    .cta-box { background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); border: 1px solid #3b82f6; border-radius: 12px; padding: 24px; margin-top: 40px; text-align: center; }
    .cta-btn { display: inline-block; background: #2563eb; color: #ffffff; font-weight: 700; padding: 12px 24px; border-radius: 8px; margin-top: 12px; transition: background 0.2s; }
    .cta-btn:hover { background: #1d4ed8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="page-container">
    <span class="badge">${p.badge}</span>
    <h1>${p.h1}</h1>
    <div class="card">
      ${p.body}
    </div>
    <div class="cta-box">
      <h3 style="color:#ffffff; margin-top:0;">Préparez vos cycles avec nos calculateurs gratuits</h3>
      <p style="color:#94a3b8; margin-bottom:12px;">Évaluez la VMA, planifiez le fractionné et structurez vos fiches de séance en conformité avec les OP.</p>
      <a href="hub-outils-sport-performance.html" class="cta-btn">Accéder aux Calculateurs EPS</a>
    </div>
  </div>
</body>
</html>`;
}

// Creation des 4 pages piliers
pillars.forEach(p => {
  const pPath = path.join(rootDir, p.file);
  if (!fs.existsSync(pPath)) {
    fs.writeFileSync(pPath, generatePillarHtml(p), 'utf8');
    console.log(`✔ Page pilier créée : ${p.file}`);
  } else {
    console.log(`ℹ Page pilier déjà existante : ${p.file}`);
  }
});

// 2. Traitement de la page Orientations Pedagogiques (Urgence U1 : suppression noindex)
const opFiles = ['orientations-pedagogiques-eps-2007-2009.html', 'orientations-pedagogiques-2007-2009.html'];
opFiles.forEach(opName => {
  const opPath = path.join(rootDir, opName);
  if (fs.existsSync(opPath)) {
    let content = fs.readFileSync(opPath, 'utf8');
    let mod = false;
    if (/noindex/i.test(content)) {
      content = content.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
      content = content.replace(/<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
      mod = true;
      console.log(`🚨 URGENCE U1 : noindex supprimé de ${opName} !`);
    } else if (!/<meta[^>]*name=["']robots["']/i.test(content)) {
      content = content.replace('</head>', '  <meta name="robots" content="index, follow">\n</head>');
      mod = true;
      console.log(`✔ Balise robots index, follow ajoutée à ${opName}`);
    }
    if (!/<link[^>]*rel=["']canonical["']/i.test(content)) {
      content = content.replace('</head>', `  <link rel="canonical" href="https://profeps.ma/${opName}">\n</head>`);
      mod = true;
    }
    if (mod) fs.writeFileSync(opPath, content, 'utf8');
  }
});

// 3. Traitement de toutes les pages HTML du dossier (Correction 404 du footer + Sauts de H4)
let filesChecked = 0;
function scanAndFixHtml(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist' || item.name === '.aistudio') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanAndFixHtml(full);
    } else if (item.isFile() && item.name.endsWith('.html')) {
      filesChecked++;
      let html = fs.readFileSync(full, 'utf8');
      let changed = false;

      // Correction noindex involontaire sur pages de contenu
      if (!/^(login|register|dashboard|connexion|admin)\.html$/i.test(item.name) && /noindex/i.test(html)) {
        html = html.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        html = html.replace(/<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        changed = true;
      }

      // Remplacer les <h4> du footer par des <p class="footer-col-title">
      const h4Regex = /<h4\b([^>]*(?:data-i18n-(?:fr|en|ar)|class=["'][^"']*footer|NAVIGATION|RESSOURCES|CALCULATEURS|LÉGAL)[^>]*)>([\s\S]*?)<\/h4>/gi;
      if (h4Regex.test(html)) {
        html = html.replace(h4Regex, (m, attrs, inner) => {
          let classAttr = 'class="footer-col-title"';
          if (attrs.includes('class=')) {
            attrs = attrs.replace(/class=["']([^"']*)["']/i, 'class="$1 footer-col-title"');
          } else {
            attrs = `${attrs} ${classAttr}`;
          }
          return `<p ${attrs.trim()}>${inner}</p>`;
        });
        changed = true;
      }

      // Correction d'anciens liens orphelins éventuels
      const redirects = [
        { oldH: 'cycles-eps.html', newH: 'cycles-eps-maroc.html' },
        { oldH: 'programme-eps.html', newH: 'programme-eps-maroc.html' },
        { oldH: 'evaluation.html', newH: 'evaluation-eps.html' },
        { oldH: 'securite.html', newH: 'securite-eps.html' }
      ];
      redirects.forEach(r => {
        const regex = new RegExp(`href=["']${r.oldH}["']`, 'gi');
        if (regex.test(html)) {
          html = html.replace(regex, `href="${r.newH}"`);
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(full, html, 'utf8');
      }
    }
  }
}
scanAndFixHtml(rootDir);
console.log(`✔ ${filesChecked} fichiers HTML vérifiés et corrigés.`);

// 4. Creation du fichier .htaccess pour les redirections 301
const htaccessPath = path.join(rootDir, '.htaccess');
const htaccessContent = `# Redirections Canoniques ProfEPS.ma
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\\ /index\\.html\\ HTTP/
  RewriteRule ^index\\.html$ https://profeps.ma/ [R=301,L]
  RewriteRule ^orientations-pedagogiques-2007-2009\\.html$ https://profeps.ma/orientations-pedagogiques-eps-2007-2009.html [R=301,L]
</IfModule>
`;
fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');
console.log('✔ Fichier .htaccess généré avec succès.');
console.log('\n--- TOUTES LES URGENCES DE LA PHASE A SONT CORRIGÉES ! ---\n');
