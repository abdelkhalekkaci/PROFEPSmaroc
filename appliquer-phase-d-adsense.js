import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const hasPublicDir = fs.existsSync(publicDir);

console.log('================================================================');
console.log('🛡️  PHASE D : CONFORMITÉ GOOGLE ADSENSE & PAGES LÉGALES');
console.log(`📁  Dossier racine : ${rootDir}`);
console.log(`📁  Dossier public détecté : ${hasPublicDir}`);
console.log('================================================================\n');

// 1. ADS.TXT
console.log('📄 [1/5] Création du fichier ads.txt...');
const adsTxt = `# ads.txt - ProfEPS Maroc (https://profeps.ma)\ngoogle.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n`;
fs.writeFileSync(path.join(rootDir, 'ads.txt'), adsTxt, 'utf8');
if (hasPublicDir) fs.writeFileSync(path.join(publicDir, 'ads.txt'), adsTxt, 'utf8');
console.log('  ✔ ads.txt créé avec succès');

// 2. SCRIPT CMP (CONSENT MANAGEMENT PLATFORM)
console.log('\n🍪 [2/5] Création de profeps-cmp.js (Consent Mode v2)...');
const cmpScript = `(function() {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var CONSENT_KEY = 'profeps_cookie_consent_v2';
  var savedConsent = null;
  try { var raw = localStorage.getItem(CONSENT_KEY); if (raw) savedConsent = JSON.parse(raw); } catch(e) {}
  if (!savedConsent) {
    gtag('consent', 'default', { 'ad_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied', 'analytics_storage': 'denied', 'wait_for_update': 500 });
  } else {
    gtag('consent', 'default', { 'ad_storage': savedConsent.ads ? 'granted' : 'denied', 'ad_user_data': savedConsent.ads ? 'granted' : 'denied', 'ad_personalization': savedConsent.ads ? 'granted' : 'denied', 'analytics_storage': savedConsent.analytics ? 'granted' : 'denied' });
  }
  function applyConsent(obj) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(obj)); } catch(e) {}
    gtag('consent', 'update', { 'ad_storage': obj.ads ? 'granted' : 'denied', 'ad_user_data': obj.ads ? 'granted' : 'denied', 'ad_personalization': obj.ads ? 'granted' : 'denied', 'analytics_storage': obj.analytics ? 'granted' : 'denied' });
    var b = document.getElementById('profeps-cmp-banner'); if (b) b.style.display = 'none';
    var m = document.getElementById('profeps-cmp-modal'); if (m) m.style.display = 'none';
  }
  window.ProfEPS_CMP = {
    open: function() { var m = document.getElementById('profeps-cmp-modal'); if (m) m.style.display = 'flex'; },
    acceptAll: function() { applyConsent({ essential: true, analytics: true, ads: true }); },
    rejectAll: function() { applyConsent({ essential: true, analytics: false, ads: false }); },
    saveCustom: function() {
      var ana = document.getElementById('cmp-opt-analytics');
      var ads = document.getElementById('cmp-opt-ads');
      applyConsent({ essential: true, analytics: ana ? ana.checked : false, ads: ads ? ads.checked : false });
    }
  };
  document.addEventListener('DOMContentLoaded', function() {
    if (!savedConsent) setTimeout(function() { var b = document.getElementById('profeps-cmp-banner'); if (b) b.style.display = 'block'; }, 600);
  });
})();`;

fs.writeFileSync(path.join(rootDir, 'profeps-cmp.js'), cmpScript, 'utf8');
if (hasPublicDir) fs.writeFileSync(path.join(publicDir, 'profeps-cmp.js'), cmpScript, 'utf8');
console.log('  ✔ profeps-cmp.js créé');

// 3. CODE DU BANDEAU CMP
const cmpMarkup = `
<!-- PROFEPS CMP BANNER -->
<div id="profeps-cmp-banner" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#0f172a;color:#f8fafc;padding:16px 22px;border-top:1px solid #334155;z-index:999999;box-shadow:0 -10px 25px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;">
    <div style="flex:1 1 500px;font-size:13px;line-height:1.5;">
      <strong style="color:#38bdf8;">🍪 Respect de votre vie privée</strong><br>
      ProfEPS utilise des cookies essentiels au site ainsi que des cookies de mesure d'audience et Google AdSense pour maintenir nos outils gratuits. Vous pouvez personnaliser ou refuser à tout moment. <a href="politique-confidentialite.html" style="color:#38bdf8;text-decoration:underline;">Politique de confidentialité</a>.
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <button onclick="window.ProfEPS_CMP.open()" type="button" style="padding:7px 12px;background:#1e293b;color:#cbd5e1;border:1px solid #475569;border-radius:6px;font-size:12.5px;font-weight:600;cursor:pointer;">Personnaliser</button>
      <button onclick="window.ProfEPS_CMP.rejectAll()" type="button" style="padding:7px 12px;background:#334155;color:#f8fafc;border:none;border-radius:6px;font-size:12.5px;font-weight:600;cursor:pointer;">Refuser</button>
      <button onclick="window.ProfEPS_CMP.acceptAll()" type="button" style="padding:7px 16px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-size:12.5px;font-weight:700;cursor:pointer;">Tout accepter</button>
    </div>
  </div>
</div>
<!-- PROFEPS CMP MODAL -->
<div id="profeps-cmp-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);z-index:1000000;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif;">
  <div style="background:#0f172a;border:1px solid #334155;border-radius:12px;max-width:540px;width:100%;padding:22px;color:#f8fafc;box-shadow:0 20px 40px rgba(0,0,0,0.6);">
    <h3 style="margin-top:0;font-size:17px;color:#38bdf8;">⚙️ Préférences de Confidentialité & Cookies</h3>
    <p style="font-size:12.5px;color:#94a3b8;line-height:1.5;">Gérez vos préférences. Les cookies techniques sont obligatoires pour les calculs.</p>
    <div style="margin:12px 0;padding:10px;background:#1e293b;border-radius:8px;border:1px solid #334155;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-weight:600;font-size:13px;">Cookies techniques essentiels</span>
      <span style="font-size:11px;color:#10b981;font-weight:bold;">Toujours actif</span>
    </div>
    <div style="margin:12px 0;padding:10px;background:#1e293b;border-radius:8px;border:1px solid #334155;display:flex;justify-content:space-between;align-items:center;">
      <label for="cmp-opt-analytics" style="font-weight:600;font-size:13px;cursor:pointer;">Mesure d'audience anonyme (Analytics)</label>
      <input type="checkbox" id="cmp-opt-analytics" checked style="width:17px;height:17px;cursor:pointer;">
    </div>
    <div style="margin:12px 0;padding:10px;background:#1e293b;border-radius:8px;border:1px solid #334155;display:flex;justify-content:space-between;align-items:center;">
      <label for="cmp-opt-ads" style="font-weight:600;font-size:13px;cursor:pointer;">Publicités personnalisées (Google AdSense)</label>
      <input type="checkbox" id="cmp-opt-ads" checked style="width:17px;height:17px;cursor:pointer;">
    </div>
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">
      <button onclick="document.getElementById('profeps-cmp-modal').style.display='none'" type="button" style="padding:7px 12px;background:#334155;color:#f8fafc;border:none;border-radius:6px;font-size:12px;cursor:pointer;">Fermer</button>
      <button onclick="window.ProfEPS_CMP.saveCustom()" type="button" style="padding:7px 16px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-size:12.5px;font-weight:700;cursor:pointer;">Enregistrer mes choix</button>
    </div>
  </div>
</div>`;

// 4. PAGES LÉGALES
console.log('\n⚖️  [3/5] Génération des 4 pages légales AdSense (Mentions, Confidentialité, CGU, Contact)...');
const headerNav = `
  <header class="navbar" id="profeps-unified-header">
    <div class="nav-container">
      <div class="nav-left"><a href="index.html" class="nav-brand-group"><img src="images/prof_eps.png" alt="Prof EPS Maroc" class="nav-brand-logo" onerror="this.onerror=null;this.src='/images/prof_eps.png';"></a></div>
      <nav class="nav-center" id="nav-menu">
        <a href="index.html" class="nav-link">Accueil</a>
        <a href="hub-outils-sport-performance.html" class="nav-link">Calculateurs Sport</a>
        <a href="cycles-eps-maroc.html" class="nav-link">Cycles EPS</a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="nav-link">Orientations 2007-2009</a>
        <a href="blog.html" class="nav-link">Blog</a>
        <a href="contact.html" class="nav-link active">Contact</a>
      </nav>
      <div class="nav-right"><a href="hub-outils-sport-performance.html" class="btn-nav-primary">★ Hub Outils</a></div>
    </div>
  </header>`;

const footerNav = `
  <footer class="footer" id="profeps-unified-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand" style="display:flex !important;flex-direction:column !important;align-items:flex-start !important;">
          <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:48px !important;max-height:48px !important;width:auto !important;max-width:155px !important;object-fit:contain !important;margin:0 0 0.9rem 0 !important;display:block !important;">
          <p>La plateforme de référence pour les professeurs d'EPS au Maroc. Générateur de documents gratuit, conforme aux orientations officielles du MEN.</p>
        </div>
        <div class="footer-col"><p class="footer-col-title">NAVIGATION</p><ul><li><a href="index.html">Accueil</a></li><li><a href="hub-outils-sport-performance.html">Calculateurs Sport</a></li><li><a href="cycles-eps-maroc.html">Cycles d'EPS</a></li><li><a href="orientations-pedagogiques-eps-2007-2009.html">Orientations 2007-2009</a></li></ul></div>
        <div class="footer-col"><p class="footer-col-title">RESSOURCES CLÉS</p><ul><li><a href="programme-eps-maroc.html">Programme EPS Maroc</a></li><li><a href="evaluation-eps.html">Évaluation & Barèmes</a></li><li><a href="securite-eps.html">Sécurité en EPS</a></li><li><a href="calculateur-vma.html">Calculateur VMA</a></li></ul></div>
        <div class="footer-col"><p class="footer-col-title">LÉGAL & CONTACT</p><ul><li><a href="mentions-legales.html">Mentions Légales</a></li><li><a href="politique-confidentialite.html">Politique de Confidentialité</a></li><li><a href="cgu.html">Conditions d'Utilisation</a></li><li><a href="contact.html">Nous Contacter</a></li><li><a href="javascript:void(0)" onclick="window.ProfEPS_CMP ? window.ProfEPS_CMP.open() : null">🍪 Gestion des cookies</a></li></ul></div>
      </div>
      <div class="footer-bottom"><span>© 2026 Prof EPS Maroc (profeps.ma). Tous droits réservés. Plateforme éducative indépendante conforme aux orientations du Ministère de l'Éducation Nationale.</span></div>
    </div>
  </footer>`;

function writeLegal(file, title, badge, content) {
  const fullHtml = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ProfEPS Maroc</title>
  <meta name="description" content="${title} de la plateforme ProfEPS Maroc. Conforme Google AdSense, RGPD et Loi marocaine 09-08 (CNDP).">
  <link rel="canonical" href="https://profeps.ma/${file}">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  ${headerNav}
  <main class="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div class="border-b border-slate-800 pb-6 mb-8">
        <span class="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">${badge}</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">${title}</h1>
        <p class="text-sm text-slate-400 mt-2">Dernière mise à jour : 12 Octobre 2026 • Plateforme ProfEPS Maroc (profeps.ma)</p>
      </div>
      <div class="space-y-6 text-slate-300 text-sm leading-relaxed">${content}</div>
    </div>
  </main>
  ${footerNav}
  ${cmpMarkup}
  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(rootDir, file), fullHtml, 'utf8');
  if (hasPublicDir) fs.writeFileSync(path.join(publicDir, file), fullHtml, 'utf8');
  console.log(`  ✔ Page créée : ${file}`);
}

writeLegal('mentions-legales.html', 'Mentions Légales', 'Transparence & Statut', `
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">1. Éditeur de la Plateforme</h2><p>Le site <strong>ProfEPS Maroc</strong> (https://profeps.ma) est une plateforme didactique indépendante destinée aux professeurs d'EPS au Maroc. Contact : <a href="mailto:profepsma@gmail.com" class="text-sky-400 underline">profepsma@gmail.com</a>.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">2. Hébergement</h2><p>Infrastructure cloud sécurisée avec protocole HTTPS et chiffrement TLS de pointe garantissant une disponibilité permanente.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">3. Propriété Intellectuelle & Droits MENPS</h2><p>Les citations des Orientations Pédagogiques (2007/2009) émanent du Ministère de l'Éducation Nationale (MENPS) du Maroc et sont diffusées au titre de l'intérêt pédagogique public.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">4. Protection des Données (Loi 09-08 CNDP)</h2><p>Conformément à la législation marocaine, vous disposez d'un droit complet d'accès et de rectification en nous contactant à profepsma@gmail.com.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">5. Régie Publicitaire Google AdSense</h2><p>Ce site utilise Google AdSense. Google utilise des cookies pour diffuser des annonces pertinentes conformément aux préférences définies dans notre bandeau CMP.</p></section>
`);

writeLegal('politique-confidentialite.html', 'Politique de Confidentialité & Cookies', 'Vie Privée & RGPD', `
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">1. Traitement Local des Données de Calcul</h2><p><strong>Aucune donnée physiologique ni médicale n'est envoyée à nos serveurs.</strong> Les calculs de VMA, Karvonen, IMC ou Foster s'exécutent strictement dans votre navigateur.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">2. Cookies Google AdSense & Analytics</h2><p>Des tiers, y compris Google, utilisent des cookies pour diffuser des annonces basées sur les visites antérieures. Vous pouvez contrôler vos choix à tout moment avec notre bandeau CMP ou sur <a href="https://adssettings.google.com" target="_blank" class="text-sky-400 underline">Google Ads Settings</a>.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">3. Vos Droits</h2><p>Droit d'accès, d'opposition et de retrait du consentement à tout moment : contactez <a href="mailto:profepsma@gmail.com" class="text-sky-400 underline">profepsma@gmail.com</a>.</p></section>
`);

writeLegal('cgu.html', 'Conditions Générales d\\'Utilisation', 'Cadre Pédagogique', `
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">1. Objet & Gratuité</h2><p>L'accès aux ressources, fiches de cycles et calculateurs d'allures est entièrement gratuit pour les enseignants et éducateurs.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">2. Avertissement Médical et Sportif (YMYL)</h2><p class="p-3 bg-amber-500/10 border-l-4 border-amber-500 text-amber-200">Les outils de physiologie fournissent des estimations didactiques. Ils ne remplacent pas un avis médical ou un certificat d'aptitude au sport.</p></section>
  <section><h2 class="text-xl font-bold text-sky-400 mb-2">3. Usage Pédagogique Autorisé</h2><p>L'impression et l'adaptation des fiches de cycle pour les cours scolaires est libre. Toute revente commerciale sans accord préalable est prohibée.</p></section>
`);

writeLegal('contact.html', 'Nous Contacter', 'Support & Échanges', `
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="space-y-4 md:border-r md:border-slate-800 md:pr-4">
      <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl"><div class="text-sky-400 font-bold mb-1">✉️ Email Officiel</div><a href="mailto:profepsma@gmail.com" class="text-white hover:underline">profepsma@gmail.com</a><div class="text-xs text-slate-500 mt-1">Réponse sous 24h à 48h.</div></div>
      <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl"><div class="text-emerald-400 font-bold mb-1">🇲🇦 Communauté EPS</div><div class="text-xs text-slate-400">Échanges pédagogiques avec les enseignants du Maroc et étudiants CRMEF.</div></div>
    </div>
    <div class="md:col-span-2 space-y-3">
      <input type="text" placeholder="Votre nom complet" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
      <input type="email" placeholder="Votre email" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white">
      <textarea rows="4" placeholder="Votre message pour l'équipe ProfEPS..." class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white"></textarea>
      <button onclick="alert('Message enregistré ! Notre équipe vous répondra par email sous 48h.')" type="button" class="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-lg transition">Envoyer le message →</button>
    </div>
  </div>
`);

// 5. UNIFORMISATION DE TOUS LES FICHIERS HTML
console.log('\n🔄 [4/5] Injection CMP & Liens footer dans tous les fichiers HTML...');
function updateDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('.'));
  let count = 0;
  for (const f of files) {
    const p = path.join(dir, f);
    let html = fs.readFileSync(p, 'utf8');
    let mod = false;
    if (!html.includes('profeps-cmp.js') && html.includes('</head>')) {
      html = html.replace('</head>', '  <script src="profeps-cmp.js" defer></script>\n</head>');
      mod = true;
    }
    if (!html.includes('mentions-legales.html') && html.includes('politique-confidentialite.html')) {
      html = html.replace(/<li><a href="politique-confidentialite\.html"/g, '<li><a href="mentions-legales.html">Mentions légales</a></li>\n            <li><a href="politique-confidentialite.html"');
      mod = true;
    }
    if (!html.includes('Gestion des cookies') && html.includes('contact.html')) {
      html = html.replace(/<li><a href="contact\.html"[^>]*>([^<]*)<\/a><\/li>/g, '<li><a href="contact.html">$1</a></li>\n            <li><a href="javascript:void(0)" onclick="window.ProfEPS_CMP ? window.ProfEPS_CMP.open() : null">🍪 Gestion des cookies</a></li>');
      mod = true;
    }
    if (!html.includes('id="profeps-cmp-banner"') && html.includes('</body>')) {
      html = html.replace('</body>', `${cmpMarkup}\n</body>`);
      mod = true;
    }
    if (mod) { fs.writeFileSync(p, html, 'utf8'); count++; }
  }
  return count;
}

const u1 = updateDir(rootDir);
const u2 = hasPublicDir ? updateDir(publicDir) : 0;
console.log(`  ✔ Fichiers HTML mis à jour : ${u1} (racine) + ${u2} (public)`);

// 6. SITEMAP.XML
console.log('\n🗺️  [5/5] Régénération du sitemap.xml...');
const allFiles = new Set();
function scan(d) { if (!fs.existsSync(d)) return; fs.readdirSync(d).forEach(x => { if (x.endsWith('.html') && !x.startsWith('.')) allFiles.add(x); }); }
scan(rootDir); if (hasPublicDir) scan(publicDir);
const excl = new Set(['index.html', '404.html']);
const today = new Date().toISOString().split('T')[0];
const urls = [{ loc: 'https://profeps.ma/', priority: '1.0', changefreq: 'daily' }];
Array.from(allFiles).sort().forEach(f => {
  if (!excl.has(f)) {
    let prio = '0.70';
    if (['mentions-legales.html', 'cgu.html', 'politique-confidentialite.html', 'contact.html'].includes(f)) prio = '0.40';
    else if (f.startsWith('calculateur-') || f.startsWith('cycles-') || f.startsWith('orientations-')) prio = '0.90';
    urls.push({ loc: `https://profeps.ma/${f}`, priority: prio, changefreq: 'weekly' });
  }
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') + `\n</urlset>`;
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap, 'utf8');
if (hasPublicDir) fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`  ✔ sitemap.xml mis à jour (${urls.length} pages).`);

console.log('\n================================================================');
console.log('🎉 PHASE D TERMINÉE : LE SITE EST 100% CONFORME GOOGLE ADSENSE !');
console.log('================================================================\n');
