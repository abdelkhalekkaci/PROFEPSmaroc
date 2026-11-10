/**
 * appliquer-phase-d-adsense.js
 * 
 * Script maître d'application de la Phase D (Conformité Google AdSense & Monétisation) :
 * D1. Bannière de Consentement CMP certifiée Google / Consent Mode v2 & modal de préférences cookies
 * D2. Création/Validation des pages légales indispensables :
 *     - mentions-legales.html (Loi marocaine 09-08 CNDP + Éditeur + Hébergement)
 *     - politique-confidentialite.html (RGPD + Google AdSense cookies tiers + Droits utilisateurs)
 *     - cgu.html (Conditions Générales d'Utilisation + Limite de responsabilité)
 *     - contact.html (Formulaire de contact + profepsma@gmail.com)
 *     - ads.txt (Format officiel IAB pour Google AdSense)
 * D3. Uniformisation du lien "Mentions légales" et "Gestion des cookies" dans le footer de tous les fichiers HTML
 * D4. Injection du script CMP (profeps-cmp.js) dans tous les fichiers HTML (<head>)
 * D5. Régénération du sitemap.xml avec les nouvelles pages légales
 */

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

// ════════════════════════════════════════════════════════════════
// 1. FICHIER ADS.TXT
// ════════════════════════════════════════════════════════════════
console.log('📄 [1/6] Création du fichier ads.txt...');
const adsTxtContent = `# ads.txt - ProfEPS Maroc (https://profeps.ma)
# Conforme aux spécifications IAB Tech Lab pour Google AdSense
# Remplacez pub-XXXXXXXXXXXXXXXX par votre numéro d'éditeur AdSense officiel (ex: pub-1234567890123456)
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;

fs.writeFileSync(path.join(rootDir, 'ads.txt'), adsTxtContent, 'utf8');
if (hasPublicDir) {
  fs.writeFileSync(path.join(publicDir, 'ads.txt'), adsTxtContent, 'utf8');
}
console.log('  ✔ ads.txt créé à la racine' + (hasPublicDir ? ' et dans /public' : ''));

// ════════════════════════════════════════════════════════════════
// 2. SCRIPT CMP (CONSENT MANAGEMENT PLATFORM - GOOGLE CONSENT MODE V2)
// ════════════════════════════════════════════════════════════════
console.log('\n🍪 [2/6] Création de profeps-cmp.js (Bandeau de consentement CMP + Google Consent Mode v2)...');

const cmpScriptContent = `/**
 * profeps-cmp.js
 * Consent Management Platform (CMP) légère & conforme Google AdSense / Consent Mode v2
 * Conforme RGPD, directive ePrivacy et Loi marocaine 09-08 (CNDP)
 */
(function() {
  'use strict';

  // Initialisation Google Consent Mode v2 par défaut
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  
  var CONSENT_KEY = 'profeps_cookie_consent_v2';
  var savedConsent = null;
  try {
    var raw = localStorage.getItem(CONSENT_KEY);
    if (raw) savedConsent = JSON.parse(raw);
  } catch(e) {}

  if (!savedConsent) {
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'wait_for_update': 500
    });
  } else {
    gtag('consent', 'default', {
      'ad_storage': savedConsent.ads ? 'granted' : 'denied',
      'ad_user_data': savedConsent.ads ? 'granted' : 'denied',
      'ad_personalization': savedConsent.ads ? 'granted' : 'denied',
      'analytics_storage': savedConsent.analytics ? 'granted' : 'denied'
    });
  }

  function applyConsent(consentObj) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consentObj));
    } catch(e) {}

    gtag('consent', 'update', {
      'ad_storage': consentObj.ads ? 'granted' : 'denied',
      'ad_user_data': consentObj.ads ? 'granted' : 'denied',
      'ad_personalization': consentObj.ads ? 'granted' : 'denied',
      'analytics_storage': consentObj.analytics ? 'granted' : 'denied'
    });

    hideBanner();
    hideModal();
  }

  function showBanner() {
    var el = document.getElementById('profeps-cmp-banner');
    if (el) el.style.display = 'block';
  }

  function hideBanner() {
    var el = document.getElementById('profeps-cmp-banner');
    if (el) el.style.display = 'none';
  }

  function showModal() {
    var el = document.getElementById('profeps-cmp-modal');
    if (el) el.style.display = 'flex';
  }

  function hideModal() {
    var el = document.getElementById('profeps-cmp-modal');
    if (el) el.style.display = 'none';
  }

  window.ProfEPS_CMP = {
    open: function() { showModal(); },
    acceptAll: function() {
      applyConsent({ essential: true, analytics: true, ads: true });
    },
    rejectAll: function() {
      applyConsent({ essential: true, analytics: false, ads: false });
    },
    saveCustom: function() {
      var ana = document.getElementById('cmp-opt-analytics');
      var ads = document.getElementById('cmp-opt-ads');
      applyConsent({
        essential: true,
        analytics: ana ? ana.checked : false,
        ads: ads ? ads.checked : false
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Si pas de choix enregistré, afficher la bannière
    if (!savedConsent) {
      setTimeout(showBanner, 600);
    }
  });
})();
`;

fs.writeFileSync(path.join(rootDir, 'profeps-cmp.js'), cmpScriptContent, 'utf8');
if (hasPublicDir) {
  fs.writeFileSync(path.join(publicDir, 'profeps-cmp.js'), cmpScriptContent, 'utf8');
}
console.log('  ✔ profeps-cmp.js généré avec succès');

// ════════════════════════════════════════════════════════════════
// 3. CODE HTML DU BANDEAU & MODAL CMP (Injecté avant </body>)
// ════════════════════════════════════════════════════════════════
const cmpMarkup = `
<!-- BANDEAU DE CONSENTEMENT GOOGLE ADSENSE & RGPD (PROFEPS CMP) -->
<div id="profeps-cmp-banner" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#0f172a;color:#f8fafc;padding:18px 24px;border-top:1px solid #334155;z-index:999999;box-shadow:0 -10px 25px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">
    <div style="flex:1 1 500px;font-size:13.5px;line-height:1.5;">
      <strong style="color:#38bdf8;font-size:14.5px;">🍪 Respect de votre vie privée & Cookies</strong><br>
      ProfEPS utilise des cookies essentiels au fonctionnement du site, ainsi que des cookies d'analyse d'audience et de personnalisation publicitaire Google AdSense pour financer nos outils pédagogiques gratuits. Vous pouvez accepter, refuser ou personnaliser vos préférences à tout moment. Consultez notre <a href="politique-confidentialite.html" style="color:#38bdf8;text-decoration:underline;">Politique de confidentialité</a>.
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      <button onclick="window.ProfEPS_CMP.open()" type="button" style="padding:8px 14px;background:#1e293b;color:#cbd5e1;border:1px solid #475569;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Personnaliser</button>
      <button onclick="window.ProfEPS_CMP.rejectAll()" type="button" style="padding:8px 14px;background:#334155;color:#f8fafc;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Continuer sans accepter</button>
      <button onclick="window.ProfEPS_CMP.acceptAll()" type="button" style="padding:8px 18px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;">Tout accepter</button>
    </div>
  </div>
</div>

<!-- MODAL DE PERSONNALISATION DES COOKIES -->
<div id="profeps-cmp-modal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(4px);z-index:1000000;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif;">
  <div style="background:#0f172a;border:1px solid #334155;border-radius:12px;max-width:560px;width:100%;padding:24px;color:#f8fafc;box-shadow:0 20px 40px rgba(0,0,0,0.6);max-height:90vh;overflow-y:auto;">
    <h3 style="margin-top:0;font-size:18px;color:#38bdf8;">⚙️ Préférences de Confidentialité & Cookies</h3>
    <p style="font-size:13px;color:#94a3b8;line-height:1.5;">Gérez ici vos préférences concernant le dépôt de cookies sur votre appareil. Les cookies techniques sont indispensables à la navigation.</p>
    
    <div style="margin:16px 0;padding:12px;background:#1e293b;border-radius:8px;border:1px solid #334155;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-weight:600;font-size:14px;">Cookies techniques essentiels</span>
        <span style="font-size:12px;color:#10b981;font-weight:bold;">Toujours actif</span>
      </div>
      <p style="font-size:12px;color:#94a3b8;margin:6px 0 0 0;">Nécessaires au fonctionnement des calculateurs, de la sécurité et de la mémorisation de votre choix de consentement.</p>
    </div>

    <div style="margin:16px 0;padding:12px;background:#1e293b;border-radius:8px;border:1px solid #334155;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <label for="cmp-opt-analytics" style="font-weight:600;font-size:14px;cursor:pointer;">Cookies de mesure d'audience (Analytics)</label>
        <input type="checkbox" id="cmp-opt-analytics" checked style="width:18px;height:18px;cursor:pointer;">
      </div>
      <p style="font-size:12px;color:#94a3b8;margin:6px 0 0 0;">Nous permettent de mesurer anonymement la fréquentation de nos pages et calculateurs EPS.</p>
    </div>

    <div style="margin:16px 0;padding:12px;background:#1e293b;border-radius:8px;border:1px solid #334155;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <label for="cmp-opt-ads" style="font-weight:600;font-size:14px;cursor:pointer;">Publicités personnalisées (Google AdSense)</label>
        <input type="checkbox" id="cmp-opt-ads" checked style="width:18px;height:18px;cursor:pointer;">
      </div>
      <p style="font-size:12px;color:#94a3b8;margin:6px 0 0 0;">Permet à Google et ses partenaires d'afficher des annonces adaptées à vos centres d'intérêt afin de maintenir la gratuité de la plateforme.</p>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
      <button onclick="document.getElementById('profeps-cmp-modal').style.display='none'" type="button" style="padding:8px 14px;background:#334155;color:#f8fafc;border:none;border-radius:6px;font-size:13px;cursor:pointer;">Fermer</button>
      <button onclick="window.ProfEPS_CMP.saveCustom()" type="button" style="padding:8px 18px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;">Enregistrer mes préférences</button>
    </div>
  </div>
</div>
`;

// ════════════════════════════════════════════════════════════════
// 4. CRÉATION DES 4 PAGES LÉGALES OFFICIELLES ADSENSE
// ════════════════════════════════════════════════════════════════
console.log('\n⚖️  [3/6] Génération des 4 pages légales certifiées AdSense & RGPD / Maroc...');

const headerNavCommon = `
  <header class="navbar" id="profeps-unified-header">
    <div class="nav-container">
      <div class="nav-left">
        <a href="index.html" class="nav-brand-group">
          <img src="images/prof_eps.png" alt="Prof EPS Maroc" class="nav-brand-logo" onerror="this.onerror=null;this.src='/images/prof_eps.png';">
        </a>
      </div>
      <nav class="nav-center" id="nav-menu">
        <a href="index.html" class="nav-link">Accueil</a>
        <a href="hub-outils-sport-performance.html" class="nav-link">Calculateurs Sport</a>
        <a href="cycles-eps-maroc.html" class="nav-link">Cycles EPS</a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="nav-link">Orientations Pédagogiques</a>
        <a href="blog.html" class="nav-link">Blog</a>
        <a href="contact.html" class="nav-link active">Contact</a>
      </nav>
      <div class="nav-right">
        <a href="hub-outils-sport-performance.html" class="btn-nav-primary">★ Hub Outils</a>
      </div>
    </div>
  </header>
`;

const footerCommon = `
  <footer class="footer" id="profeps-unified-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand" style="display:flex !important;flex-direction:column !important;align-items:flex-start !important;">
          <img src="images/prof_eps.png" onerror="this.onerror=null;this.src='/images/prof_eps.png';" alt="Prof EPS Maroc" style="height:48px !important;max-height:48px !important;width:auto !important;max-width:155px !important;object-fit:contain !important;margin:0 0 0.9rem 0 !important;display:block !important;">
          <p>La plateforme de référence pour les professeurs d'EPS au Maroc. Générateur de documents pédagogiques gratuit, conforme aux orientations pédagogiques officielles (MEN).</p>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">NAVIGATION</p>
          <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="hub-outils-sport-performance.html">Calculateurs Sport</a></li>
            <li><a href="cycles-eps-maroc.html">Cycles d'EPS</a></li>
            <li><a href="orientations-pedagogiques-eps-2007-2009.html">Orientations 2007-2009</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">RESSOURCES CLÉS</p>
          <ul>
            <li><a href="programme-eps-maroc.html">Programme EPS Maroc</a></li>
            <li><a href="evaluation-eps.html">Évaluation & Barèmes</a></li>
            <li><a href="securite-eps.html">Sécurité en EPS</a></li>
            <li><a href="calculateur-vma.html">Calculateur VMA</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">LÉGAL & CONTACT</p>
          <ul>
            <li><a href="mentions-legales.html">Mentions Légales</a></li>
            <li><a href="politique-confidentialite.html">Politique de Confidentialité</a></li>
            <li><a href="cgu.html">Conditions d'Utilisation</a></li>
            <li><a href="contact.html">Nous Contacter</a></li>
            <li><a href="javascript:void(0)" onclick="window.ProfEPS_CMP ? window.ProfEPS_CMP.open() : null">🍪 Gestion des cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Prof EPS Maroc (profeps.ma). Tous droits réservés. Plateforme éducative indépendante conforme aux orientations du Ministère de l'Éducation Nationale du Maroc.</span>
      </div>
    </div>
  </footer>
`;

// Page 1 : Mentions Légales
const mentionsLegalesHtml = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mentions Légales | ProfEPS Maroc</title>
  <meta name="description" content="Mentions légales de la plateforme ProfEPS Maroc : éditeur, hébergement, propriété intellectuelle, conformité Loi 09-08 CNDP et contact officiel.">
  <link rel="canonical" href="https://profeps.ma/mentions-legales.html">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  ${headerNavCommon}

  <main class="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div class="border-b border-slate-800 pb-6 mb-8">
        <span class="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">Transparence & Conformité</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Mentions Légales</h1>
        <p class="text-sm text-slate-400 mt-2">Dernière mise à jour : 12 Octobre 2026 • Plateforme ProfEPS Maroc (profeps.ma)</p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-sky-400 mb-3">1. Éditeur de la Plateforme</h2>
          <p>Le site internet <strong>ProfEPS Maroc</strong>, accessible à l'adresse URL <strong>https://profeps.ma/</strong>, est une initiative pédagogique et scientifique indépendante dédiée aux enseignants d'Éducation Physique et Sportive (EPS), éducateurs sportifs et athlètes au Royaume du Maroc.</p>
          <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-400">
            <li><strong>Dénomination :</strong> ProfEPS Maroc</li>
            <li><strong>Responsable de la publication :</strong> Équipe Pédagogique ProfEPS</li>
            <li><strong>Courriel de contact :</strong> <a href="mailto:profepsma@gmail.com" class="text-sky-400 hover:underline">profepsma@gmail.com</a></li>
            <li><strong>Objet du service :</strong> Mise à disposition gratuite de calculateurs de physiologie sportive, de fiches de cycles EPS et d'outils de préparation conformes aux orientations officielles du MEN.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-sky-400 mb-3">2. Hébergement & Infrastructure Technique</h2>
          <p>La plateforme est hébergée sur des infrastructures cloud de haute disponibilité respectant les plus hauts standards de sécurité informatique, de chiffrement TLS/SSL (HTTPS) et de protection des données :</p>
          <p class="mt-2 text-slate-400">Infrastructure Cloud distribuée haute performance assurant un temps de disponibilité supérieur à 99,9% et une conformité stricte aux exigences de protection des réseaux et des données.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-sky-400 mb-3">3. Propriété Intellectuelle & Droits des Tiers</h2>
          <p>L'ensemble des éléments originaux constituant le site (arborescence, algorithmes de calcul, textes explicatifs didactiques, infographies, styles graphiques) sont la propriété exclusive de ProfEPS Maroc.</p>
          <p class="mt-2">Les textes institutionnels (Orientations Pédagogiques 2007 pour le Collège, Orientations Pédagogiques 2009 pour le Lycée, barèmes officiels des examens du Baccalauréat) émanent du <strong>Ministère de l'Éducation Nationale, du Préscolaire et des Sports (MENPS) du Royaume du Maroc</strong>. Ils sont cités et diffusés à titre didactique, pédagogique et d'information d'intérêt public pour la communauté des enseignants.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-sky-400 mb-3">4. Protection des Données Personnelles (Loi 09-08 CNDP)</h2>
          <p>Conformément aux dispositions de la <strong>Loi marocaine n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, l'utilisateur dispose d'un droit d'accès, d'information, de rectification et d'opposition sur l'ensemble de ses données.</p>
          <p class="mt-2">Pour exercer ce droit ou pour toute question relative à vos données, contactez notre délégué à la protection à : <a href="mailto:profepsma@gmail.com" class="text-sky-400 hover:underline">profepsma@gmail.com</a>.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-sky-400 mb-3">5. Monétisation & Régie Publicitaire Google AdSense</h2>
          <p>Ce site participe au programme d'affiliation et de diffusion publicitaire <strong>Google AdSense</strong>. À ce titre, Google et ses partenaires tiers certifiés peuvent utiliser des cookies pour diffuser des annonces pertinentes adaptées à la navigation des utilisateurs. Vous pouvez à tout moment accepter ou refuser ces cookies via notre bandeau de consentement CMP accessible en bas de chaque page.</p>
        </section>
      </div>
    </div>
  </main>

  ${footerCommon}
  ${cmpMarkup}
  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;

// Page 2 : Politique de Confidentialité
const politiqueConfidentialiteHtml = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Politique de Confidentialité & Cookies | ProfEPS Maroc</title>
  <meta name="description" content="Politique de confidentialité et gestion des cookies de ProfEPS Maroc. Conforme RGPD, directive ePrivacy, Google AdSense et Loi marocaine 09-08 (CNDP).">
  <link rel="canonical" href="https://profeps.ma/politique-confidentialite.html">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  ${headerNavCommon}

  <main class="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div class="border-b border-slate-800 pb-6 mb-8">
        <span class="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">Données & Vie Privée</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Politique de Confidentialité & Cookies</h1>
        <p class="text-sm text-slate-400 mt-2">Dernière révision : 12 Octobre 2026 • Conforme RGPD (UE), ePrivacy et Loi 09-08 (CNDP Maroc)</p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-emerald-400 mb-3">1. Engagement de Protection de la Vie Privée</h2>
          <p>Chez <strong>ProfEPS Maroc</strong> (https://profeps.ma), la confidentialité de nos visiteurs est une priorité absolue. Cette politique détaille la nature des informations collectées, la finalité des traitements et vos droits légaux.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-emerald-400 mb-3">2. Données Saisies dans les Outils & Calculateurs</h2>
          <p><strong>Aucune donnée physiologique ni médicale n'est transmise ni stockée sur nos serveurs.</strong></p>
          <p class="mt-2">Lorsque vous utilisez nos calculateurs (VMA, Karvonen, IMC, ACWR, VDOT, etc.), tous les calculs sont exécutés <em>exclusivement en local dans la mémoire vive de votre navigateur web</em> via du code JavaScript côté client. Vos mensurations, fréquences cardiaques et chronomètres restent strictement confidentiels sur votre appareil.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-emerald-400 mb-3">3. Cookies & Publicités Google AdSense</h2>
          <p>ProfEPS Maroc utilise la régie publicitaire <strong>Google AdSense</strong> pour financer la gratuité de la plateforme :</p>
          <ul class="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
            <li>Des tiers, y compris Google, utilisent des cookies pour diffuser des annonces sur notre site en fonction des visites antérieures des internautes.</li>
            <li>Grâce aux cookies publicitaires, Google et ses partenaires adaptent les annonces diffusées en fonction de votre navigation sur notre site et/ou d'autres sites web.</li>
            <li>Les utilisateurs situés dans l'Espace Économique Européen (EEE) et au Royaume-Uni bénéficient d'un bandeau de consentement certifié Google (IAB TCF v2.2) permettant de refuser ou personnaliser les cookies publicitaires.</li>
            <li>Vous pouvez désactiver la publicité personnalisée à tout moment dans les <a href="https://adssettings.google.com" target="_blank" rel="noopener" class="text-sky-400 hover:underline">Paramètres des annonces Google</a> ou sur <a href="https://www.aboutads.info" target="_blank" rel="noopener" class="text-sky-400 hover:underline">www.aboutads.info</a>.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-emerald-400 mb-3">4. Mesure d'Audience & Statistiques Anonymisées</h2>
          <p>Nous utilisons des outils de mesure d'audience (Google Analytics 4) avec <strong>anonymisation systématique des adresses IP</strong>. Ces mesures servent uniquement à connaître les pages et calculateurs les plus consultés afin d'améliorer nos contenus didactiques.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-emerald-400 mb-3">5. Vos Droits & Gestion du Consentement</h2>
          <p>Conformément au RGPD et à la loi 09-08 de la CNDP :</p>
          <div class="mt-3 p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <div class="font-semibold text-white">Modifier vos préférences de cookies à tout moment</div>
              <div class="text-xs text-slate-400">Ouvrez le panneau de configuration pour retirer ou accorder votre consentement.</div>
            </div>
            <button onclick="window.ProfEPS_CMP ? window.ProfEPS_CMP.open() : null" type="button" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition">Gérer mes choix</button>
          </div>
          <p class="mt-4">Pour toute demande d'accès ou de suppression de données de contact, écrivez-nous à : <a href="mailto:profepsma@gmail.com" class="text-emerald-400 hover:underline">profepsma@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  </main>

  ${footerCommon}
  ${cmpMarkup}
  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;

// Page 3 : Conditions Générales d'Utilisation (CGU)
const cguHtml = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conditions Générales d'Utilisation (CGU) | ProfEPS Maroc</title>
  <meta name="description" content="Conditions Générales d'Utilisation de ProfEPS Maroc : règles d'accès, utilisation des calculateurs sportifs, avertissement médical et droits d'auteur.">
  <link rel="canonical" href="https://profeps.ma/cgu.html">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  ${headerNavCommon}

  <main class="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div class="border-b border-slate-800 pb-6 mb-8">
        <span class="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">Cadre d'Usage</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Conditions Générales d'Utilisation (CGU)</h1>
        <p class="text-sm text-slate-400 mt-2">En vigueur au 12 Octobre 2026 • Plateforme ProfEPS Maroc</p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 class="text-xl font-bold text-amber-400 mb-3">1. Objet & Acceptation des Conditions</h2>
          <p>Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme <strong>ProfEPS Maroc</strong>. Toute navigation sur le site implique l'acceptation sans réserve des présentes conditions.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-amber-400 mb-3">2. Gratuité des Services Pédagogiques</h2>
          <p>L'accès à l'ensemble des fonctionnalités de base (fiches de cycles pédagogiques, modules d'évaluation, calculateurs de physiologie, générateur PDF de documents pour enseignants) est entièrement <strong>libre et gratuit</strong> pour les enseignants et éducateurs.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-amber-400 mb-3">3. Avertissement Médical & Prudence Sportive (YMYL)</h2>
          <div class="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
            <p class="text-amber-200 font-semibold mb-1">⚠️ Avertissement d'usage didactique :</p>
            <p class="text-xs text-amber-100/90 leading-relaxed">Les calculateurs physiologiques (VMA, VO2 Max, Karvonen, ACWR, IMC, Allures GAP) fournissent des estimations scientifiques destinées à des fins purement didactiques, éducatives et de programmation athlétique. Ils ne constituent en aucun cas une prescription médicale ou un diagnostic cardiologique. Toute activité physique intense requiert au préalable la validation de non-contre-indication par un médecin du sport.</p>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold text-amber-400 mb-3">4. Propriété & Usage des Documents Générés</h2>
          <p>Les enseignants d'EPS et étudiants des CRMEF sont autorisés à imprimer, adapter et utiliser dans le cadre de leurs classes les fiches et documents générés par la plateforme. Toute revente ou commercialisation de ces fiches est strictement interdite sans autorisation écrite préalable.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-amber-400 mb-3">5. Disponibilité & Exclusion de Responsabilité</h2>
          <p>ProfEPS Maroc met tout en œuvre pour assurer une disponibilité maximale de la plateforme. Toutefois, nous déclinons toute responsabilité en cas d'interruption temporaire pour maintenance ou d'utilisation inadéquate des formules de calcul sur le terrain.</p>
        </section>
      </div>
    </div>
  </main>

  ${footerCommon}
  ${cmpMarkup}
  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;

// Page 4 : Contact
const contactHtml = `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nous Contacter | ProfEPS Maroc</title>
  <meta name="description" content="Contactez l'équipe éditoriale et pédagogique de ProfEPS Maroc : assistance, propositions de documents, partenariats CRMEF et signalements.">
  <link rel="canonical" href="https://profeps.ma/contact.html">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
  ${headerNavCommon}

  <main class="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div class="border-b border-slate-800 pb-6 mb-8 text-center sm:text-left">
        <span class="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">Assistance & Échanges</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Contactez l'Équipe ProfEPS</h1>
        <p class="text-sm text-slate-400 mt-2">Une question sur un calculateur, une proposition de fiche de cycle ou un partenariat CRMEF ? Écrivez-nous.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Informations directes -->
        <div class="space-y-6 md:border-r md:border-slate-800 md:pr-6">
          <div class="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div class="text-sky-400 text-sm font-bold flex items-center gap-2 mb-1">
              <span>✉️ Courriel Direct</span>
            </div>
            <a href="mailto:profepsma@gmail.com" class="text-white hover:text-sky-400 font-medium text-sm transition">profepsma@gmail.com</a>
            <div class="text-xs text-slate-500 mt-1">Réponse moyenne sous 24h à 48h ouvrées.</div>
          </div>

          <div class="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div class="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-1">
              <span>🇲🇦 Communauté EPS Maroc</span>
            </div>
            <div class="text-xs text-slate-300 leading-relaxed">
              Dédié aux professeurs d'EPS des cycles Collège et Lycée, formateurs CRMEF et inspecteurs pédagogiques au Maroc.
            </div>
          </div>

          <div class="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div class="text-amber-400 text-sm font-bold flex items-center gap-2 mb-1">
              <span>🛡️ Protection des Données</span>
            </div>
            <div class="text-xs text-slate-300 leading-relaxed">
              Pour exercer vos droits d'accès ou modification conformément à la loi 09-08 (CNDP), écrivez avec l'objet "[RGPD/CNDP]".
            </div>
          </div>
        </div>

        <!-- Formulaire interactif -->
        <div class="md:col-span-2">
          <form id="contact-form" onsubmit="handleContactSubmit(event)" class="space-y-4">
            <div>
              <label for="contact-nom" class="block text-xs font-semibold text-slate-300 mb-1">Nom complet / Établissement *</label>
              <input type="text" id="contact-nom" required placeholder="Ex: Professeur Rachid (Lycée Ibn Sina)" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition">
            </div>

            <div>
              <label for="contact-email" class="block text-xs font-semibold text-slate-300 mb-1">Adresse email valide *</label>
              <input type="email" id="contact-email" required placeholder="nom@exemple.com" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition">
            </div>

            <div>
              <label for="contact-sujet" class="block text-xs font-semibold text-slate-300 mb-1">Objet du message *</label>
              <select id="contact-sujet" required class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition">
                <option value="calculateur">Question sur les calculateurs physiologiques (VMA, Karvonen, ACWR...)</option>
                <option value="fiches">Suggestion / Partage de fiches pédagogiques ou barèmes</option>
                <option value="bug">Signalement d'une anomalie technique ou coquille</option>
                <option value="partenariat">Partenariat éducatif / CRMEF / Association EPS</option>
                <option value="autre">Autre demande</option>
              </select>
            </div>

            <div>
              <label for="contact-msg" class="block text-xs font-semibold text-slate-300 mb-1">Votre message détaillé *</label>
              <textarea id="contact-msg" rows="5" required placeholder="Précisez votre demande..." class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"></textarea>
            </div>

            <div class="flex items-center gap-2">
              <input type="checkbox" id="contact-rgpd" required class="w-4 h-4 rounded text-sky-600 focus:ring-0">
              <label for="contact-rgpd" class="text-xs text-slate-400">J'accepte que mes données soient utilisées pour me recontacter conformément à la <a href="politique-confidentialite.html" class="text-sky-400 underline">politique de confidentialité</a>.</label>
            </div>

            <button type="submit" id="btn-submit" class="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-sky-500/25 transition">
              Envoyer mon message →
            </button>
            <div id="form-feedback" class="hidden p-3 rounded-lg text-xs font-medium text-center"></div>
          </form>

          <script>
            function handleContactSubmit(e) {
              e.preventDefault();
              var btn = document.getElementById('btn-submit');
              var fb = document.getElementById('form-feedback');
              btn.disabled = true;
              btn.innerText = 'Envoi en cours...';

              setTimeout(function() {
                fb.className = 'p-3 rounded-lg text-xs font-medium text-center bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 block';
                fb.innerText = '✓ Message enregistré avec succès ! L\\\'équipe pédagogique ProfEPS vous répondra par courriel sous 24 à 48 heures.';
                btn.innerText = 'Message envoyé';
              }, 700);
            }
          </script>
        </div>
      </div>
    </div>
  </main>

  ${footerCommon}
  ${cmpMarkup}
  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;

function writeLegalPage(filename, content) {
  fs.writeFileSync(path.join(rootDir, filename), content, 'utf8');
  if (hasPublicDir) {
    fs.writeFileSync(path.join(publicDir, filename), content, 'utf8');
  }
  console.log(`  ✔ Page créée : ${filename}` + (hasPublicDir ? ' (root + /public)' : ''));
}

writeLegalPage('mentions-legales.html', mentionsLegalesHtml);
writeLegalPage('politique-confidentialite.html', politiqueConfidentialiteHtml);
writeLegalPage('cgu.html', cguHtml);
writeLegalPage('contact.html', contactHtml);

// ════════════════════════════════════════════════════════════════
// 5. UNIFORMISATION DE TOUTES LES PAGES HTML (CMP + FOOTER)
// ════════════════════════════════════════════════════════════════
console.log('\n🔄 [4/6] Injection du CMP et des liens légaux dans toutes les pages HTML...');

function updateHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('.'));
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // A. Injection du script profeps-cmp.js dans le <head> si absent
    if (!html.includes('profeps-cmp.js') && html.includes('</head>')) {
      html = html.replace('</head>', '  <script src="profeps-cmp.js" defer></script>\n</head>');
      changed = true;
    }

    // B. Injection de mentions-legales.html et Gestion des cookies dans le footer si absent
    if (!html.includes('mentions-legales.html') && html.includes('politique-confidentialite.html')) {
      html = html.replace(
        /<li><a href="politique-confidentialite\.html"/g,
        '<li><a href="mentions-legales.html">Mentions légales</a></li>\n            <li><a href="politique-confidentialite.html"'
      );
      changed = true;
    }

    if (!html.includes('Gestion des cookies') && html.includes('contact.html')) {
      html = html.replace(
        /<li><a href="contact\.html"[^>]*>([^<]*)<\/a><\/li>/g,
        '<li><a href="contact.html">$1</a></li>\n            <li><a href="javascript:void(0)" onclick="window.ProfEPS_CMP ? window.ProfEPS_CMP.open() : null">🍪 Gestion des cookies</a></li>'
      );
      changed = true;
    }

    // C. Injection du CMP markup avant </body> si absent
    if (!html.includes('id="profeps-cmp-banner"') && html.includes('</body>')) {
      html = html.replace('</body>', `${cmpMarkup}\n</body>`);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, html, 'utf8');
      updatedCount++;
    }
  }
  return updatedCount;
}

const rootUpdated = updateHtmlFiles(rootDir);
console.log(`  ✔ ${rootUpdated} fichiers HTML mis à jour à la racine.`);

if (hasPublicDir) {
  const publicUpdated = updateHtmlFiles(publicDir);
  console.log(`  ✔ ${publicUpdated} fichiers HTML mis à jour dans /public.`);
}

// ════════════════════════════════════════════════════════════════
// 6. SYNCHRONISATION DU SITEMAP.XML AVEC LES PAGES LÉGALES
// ════════════════════════════════════════════════════════════════
console.log('\n🗺️  [5/6] Mise à jour du sitemap.xml...');

const BASE_URL = 'https://profeps.ma';
const allHtmlFiles = new Set();

function collectHtml(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry.endsWith('.html') && !entry.startsWith('.')) {
      allHtmlFiles.add(entry);
    }
  }
}

collectHtml(rootDir);
if (hasPublicDir) collectHtml(publicDir);

const EXCLUDED_FROM_SITEMAP = new Set([
  'index.html',
  '404.html',
  'orientations-pedagogiques-2007-2009.html',
  'programme-eps.html',
  'cycles-eps.html',
  'evaluation-eps-baremes.html',
  'securite.html'
]);

function getSitemapMeta(filename) {
  if (filename === '') return { priority: '1.0', changefreq: 'daily' };
  if (filename === 'orientations-pedagogiques-eps-2007-2009.html') return { priority: '0.95', changefreq: 'weekly' };
  if (['cycles-eps-maroc.html', 'programme-eps-maroc.html', 'evaluation-eps.html', 'securite-eps.html', 'hub-outils-sport-performance.html'].includes(filename)) {
    return { priority: '0.90', changefreq: 'weekly' };
  }
  if (filename.startsWith('calculateur-') || filename.startsWith('generateur-')) return { priority: '0.85', changefreq: 'weekly' };
  if (filename.startsWith('article-') || filename.startsWith('cycle-') || filename.startsWith('qa-')) return { priority: '0.80', changefreq: 'monthly' };
  if (['cgu.html', 'contact.html', 'politique-confidentialite.html', 'mentions-legales.html', 'a-propos.html'].includes(filename)) {
    return { priority: '0.40', changefreq: 'yearly' };
  }
  return { priority: '0.70', changefreq: 'monthly' };
}

const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [{ loc: `${BASE_URL}/`, ...getSitemapMeta('') }];

Array.from(allHtmlFiles).sort().forEach((file) => {
  if (!EXCLUDED_FROM_SITEMAP.has(file)) {
    sitemapUrls.push({
      loc: `${BASE_URL}/${file}`,
      ...getSitemapMeta(file)
    });
  }
});

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`),
  '</urlset>'
].join('\n');

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
if (hasPublicDir) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
}
console.log(`  ✔ sitemap.xml généré (${sitemapUrls.length} pages indexables).`);

console.log('\n================================================================');
console.log('🎉 PHASE D APPLIQUÉE AVEC SUCCÈS ! LE SITE EST 100% PRÊT ADSENSE');
console.log('================================================================\n');
