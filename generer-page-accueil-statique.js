const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('\n================================================================');
console.log('🚀 GÉNÉRATION COMPLÈTE DE LA PAGE D\'ACCUEIL (INDEX.HTML STATIQUE)');
console.log('📂 Dossier racine :', rootDir);
console.log('================================================================\n');

function generateHomeHtml() {
  return `<!DOCTYPE html>
<html lang="fr" dir="ltr" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ProfEPS Maroc : Portail Didactique, OP 2007-2009 & Calculateurs EPS</title>
  <meta name="description" content="Plateforme de référence des professeurs d'EPS au Maroc : Orientations Pédagogiques 2007 & 2009 (MENPS), bibliothèque numérique didactique et 11 calculateurs scientifiques de performance sportive." />
  <meta name="keywords" content="prof eps maroc, orientations pedagogiques eps 2007 2009, didactique eps maroc, crmef eps, calculateur vma, vdot daniels, test 6 minutes, projet pedagogique eps" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ProfEPS Maroc : Portail Didactique, OP 2007-2009 & Calculateurs EPS" />
  <meta property="og:description" content="Plateforme de référence des professeurs d'EPS au Maroc : Orientations Pédagogiques 2007 & 2009 (MENPS), bibliothèque numérique didactique et 11 calculateurs scientifiques de performance sportive." />
  <meta property="og:url" content="https://profeps.ma/" />
  <meta property="og:site_name" content="ProfEPS Maroc" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ProfEPS Maroc : Portail Didactique, OP 2007-2009 & Calculateurs EPS" />
  <meta name="twitter:description" content="Plateforme de référence des professeurs d'EPS au Maroc : Orientations Pédagogiques 2007 & 2009 (MENPS), bibliothèque numérique didactique et 11 calculateurs scientifiques de performance sportive." />
  <link rel="canonical" href="https://profeps.ma/" />
  <link rel="icon" type="image/png" href="images/prof_eps.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="profeps-cmp.js" defer></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "ProfEPS Maroc",
        "url": "https://profeps.ma/",
        "description": "Portail didactique et scientifique des professeurs d'EPS au Maroc.",
        "inLanguage": "fr"
      },
      {
        "@type": "EducationalOrganization",
        "name": "ProfEPS Maroc",
        "url": "https://profeps.ma/",
        "logo": "https://profeps.ma/images/prof_eps.png",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61559954402311",
          "https://www.instagram.com/profeps.ma"
        ]
      }
    ]
  }
  </script>

  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
    }
    .glass-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 1rem;
      transition: all 0.25s ease;
    }
    .glass-card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06);
    }
  </style>
</head>
<body class="antialiased">

  <nav id="navbar" class="navbar"></nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" style="margin-top: 80px;">

    <!-- ═══ 1. HERO SECTION AVEC CURSEUR VMA INTERACTIF ═══ -->
    <section class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 space-y-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700">
            <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Portail Officiel Didactique · ProfEPS Maroc</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Écosystème Didactique de l’EPS, Textes Officiels & Calculateurs Sportifs
          </h1>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            La plateforme de référence pour les enseignants d’EPS au Maroc : Orientations Pédagogiques ministérielles (2007 & 2009), bibliothèque numérique didactique et 11 calculateurs physiologiques pour réguler vos séances.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="#bloc-calculateurs" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <span>Accéder aux Calculateurs</span>
              <span>↓</span>
            </a>
            <a href="#bloc-op" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <span>Orientations (OP 2007/2009)</span>
            </a>
            <a href="#bloc-biblio" class="px-5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <span>Bibliothèque Numérique</span>
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-100 text-xs text-slate-600 font-semibold">
            <span class="flex items-center gap-1.5 text-slate-700">
              <span class="text-emerald-600 font-black">✔</span> Conforme Approche par Compétences (APC)
            </span>
            <span class="flex items-center gap-1.5 text-slate-700">
              <span class="text-emerald-600 font-black">✔</span> Direction des Curricula (MENPS)
            </span>
            <span class="flex items-center gap-1.5 text-slate-700">
              <span class="text-emerald-600 font-black">✔</span> 100% Gratuit & Libre d’accès
            </span>
          </div>
        </div>

        <!-- Carte VMA Interactive Dynamique -->
        <div class="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">⚡</span>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-700">Curseur VMA Éducative</span>
            </div>
            <span class="text-xs font-mono font-bold px-2 py-0.5 bg-blue-600 text-white rounded-md">
              Temps Réel
            </span>
          </div>

          <div class="text-center py-1">
            <span id="hero-vma-val" class="text-5xl font-black text-slate-900 tracking-tight font-mono">16.0</span>
            <span class="text-lg font-bold text-slate-500 ml-1">km/h</span>
            <p class="text-xs text-slate-500 mt-1">Vitesse Maximale Aérobie de référence</p>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Ajuster la VMA :</span>
              <span id="hero-vma-label" class="font-mono text-blue-600">16.0 km/h</span>
            </div>
            <input
              id="hero-vma-range"
              type="range"
              min="8.0"
              max="24.0"
              step="0.1"
              value="16.0"
              class="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              oninput="updateHeroVma(this.value)"
            />
            <div class="flex justify-between text-[11px] text-slate-600 font-mono">
              <span>8 km/h (Collège)</span>
              <span>15 km/h (Lycée)</span>
              <span>24 km/h (Élite)</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-200 text-center">
            <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Allure 100%</div>
              <div id="hero-pace-100" class="text-sm font-black font-mono text-slate-900 mt-1">3'45"/km</div>
            </div>
            <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Seuil (85%)</div>
              <div id="hero-speed-85" class="text-sm font-black font-mono text-blue-600 mt-1">13.6 km/h</div>
            </div>
            <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Endurance (65%)</div>
              <div id="hero-speed-65" class="text-sm font-black font-mono text-emerald-600 mt-1">10.4 km/h</div>
            </div>
          </div>

          <a href="calculateur-vma.html" class="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
            <span>Ouvrir le Calculateur VMA Complet</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ 2. SECTION CALCULATEURS & GÉNÉRATEUR (PLACÉE DIRECTEMENT SOUS LE HERO) ═══ -->
    <section id="bloc-calculateurs" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>⚡</span>
            <span>Suite Scientifique Didactique</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Calculateurs Scientifiques & Générateur d’EPS
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            11 outils physiologiques calibrés selon les modèles scientifiques de référence (Billat, Cazorla, Péronnet, Karvonen, Foster) pour concevoir et réguler vos séances.
          </p>
        </div>

        <a href="hub-outils-sport-performance.html" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 shrink-0">
          <span>Voir le Hub des 11 outils</span>
          <span>→</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Cluster 1 -->
        <div class="glass-card p-6 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 font-black text-xl">
              ⚡
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-blue-600">Cluster 1</span>
              <h3 class="text-lg font-bold text-slate-900 mt-0.5">VMA, VO2 Max & Allures</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Calculs physiologiques complets du profil aérobie de l’élève et du coureur de demi-fond.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="calculateur-vma.html" class="hover:text-blue-600 font-semibold">• Calculateur VMA & Allures (km/h & min/km)</a></li>
              <li><a href="calculateur-vdot-asr-endurance.html" class="hover:text-blue-600 font-semibold">• VO2 Max & VDOT (Jack Daniels)</a></li>
              <li><a href="calculateur-asr-reserve-vitesse.html" class="hover:text-blue-600 font-semibold">• Réserve de Vitesse Anaérobie (ASR Buchheit)</a></li>
              <li><a href="calculateur-indice-endurance.html" class="hover:text-blue-600 font-semibold">• Indice d’Endurance (Péronnet & Thibault)</a></li>
            </ul>
          </div>
          <div class="pt-6">
            <a href="calculateur-vma.html" class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <span>Lancer les Calculateurs Cluster 1</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <!-- Cluster 2 -->
        <div class="glass-card p-6 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 font-black text-xl">
              ❤️
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Cluster 2</span>
              <h3 class="text-lg font-bold text-slate-900 mt-0.5">Cardio, Santé & Météo</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Zones de fréquence cardiaque, composition corporelle et facteurs thermiques.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="calculateur-frequence-cardiaque-karvonen.html" class="hover:text-emerald-600 font-semibold">• FC Karvonen & 5 Zones Cardiaques Cibles</a></li>
              <li><a href="calculateur-imc-sportif-masse-grasse.html" class="hover:text-emerald-600 font-semibold">• IMC & Masse Grasse Athlétique (Deurenberg)</a></li>
              <li><a href="calculateur-chaleur-meteo-altitude.html" class="hover:text-emerald-600 font-semibold">• Dérive Thermique, Chaleur & Altitude</a></li>
              <li><a href="calculateur-gap-pente-nutrition.html" class="hover:text-emerald-600 font-semibold">• Allure Pente (GAP) & Besoins Hydriques</a></li>
            </ul>
          </div>
          <div class="pt-6">
            <a href="calculateur-frequence-cardiaque-karvonen.html" class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <span>Lancer les Calculateurs Cluster 2</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <!-- Cluster 3 -->
        <div class="glass-card p-6 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200 font-black text-xl">
              ⏱️
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-600">Cluster 3</span>
              <h3 class="text-lg font-bold text-slate-900 mt-0.5">HIIT, Relances & Charge</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Planification des séances de course intermittente et quantification de l’effort.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="generateur-intermittent-hiit-cod.html" class="hover:text-blue-600 font-semibold">• Générateur Intermittent HIIT (15s-15s, 30s-30s)</a></li>
              <li><a href="generateur-intermittent-hiit-cod.html" class="hover:text-blue-600 font-semibold">• Navettes COD 180° Sports Collectifs</a></li>
              <li><a href="calculateur-charge-rpe-foster-acwr.html" class="hover:text-blue-600 font-semibold">• Charge sRPE Foster, Monotonie & ACWR</a></li>
              <li><a href="generateur.html" class="hover:text-blue-600 font-semibold">• Générateur de Fiches de Séances EPS</a></li>
            </ul>
          </div>
          <div class="pt-6">
            <a href="generateur-intermittent-hiit-cod.html" class="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <span>Lancer les Outils Cluster 3</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 3. SECTION ORIENTATIONS PÉDAGOGIQUES (OP 2007 & OP 2009) ═══ -->
    <section id="bloc-op" class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>📖</span>
            <span>Cadre Didactique & Textes Ministériels</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Orientations Pédagogiques EPS Maroc (2007 · 2009)
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Consultez les référentiels officiels de la Direction des Curricula (MENPS) pour structurer vos cycles d’enseignement, compétences cibles et grilles d’évaluation certificatives.
          </p>
        </div>

        <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button type="button" onclick="filterOpCards('all')" id="btn-op-all" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs">Tous les Cycles</button>
          <button type="button" onclick="filterOpCards('college')" id="btn-op-college" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900">Collège (2009)</button>
          <button type="button" onclick="filterOpCards('lycee')" id="btn-op-lycee" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900">Lycée (2007)</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Carte Lycée 2007 -->
        <div id="card-op-lycee" class="glass-card p-6 border-blue-200 hover:border-blue-300">
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-2xl font-black">
                🎓
              </div>
              <div>
                <span class="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Texte Officiel MENPS 2007</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Secondaire Qualifiant (Lycée)</h3>
              </div>
            </div>
            <span class="text-xs font-mono font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">2007</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
            Texte fondateur régissant l'EPS au lycée au Maroc : approche par compétences (APC), modules didactiques par tronc commun et filières du baccalauréat, fiches d'évaluation certificative.
          </p>

          <div class="space-y-2 mb-5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-700">Compétences Piliers Visées :</div>
            <ul class="space-y-1.5 text-xs text-slate-700">
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Gestion et régulation de l'effort physique en course de durée</li>
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Efficience motrice et choix tactiques en sports collectifs</li>
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Construction de projets d'action individuelle et collective</li>
            </ul>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <a href="orientations-pedagogiques-eps-2007-2009.html#lycee" class="text-xs font-bold text-blue-600 hover:underline">
              Lire l'Analyse Didactique Complète →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors">
              Consulter OP Lycée PDF
            </a>
          </div>
        </div>

        <!-- Carte Collège 2009 -->
        <div id="card-op-college" class="glass-card p-6 border-emerald-200 hover:border-emerald-300">
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-2xl font-black">
                🏅
              </div>
              <div>
                <span class="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Texte Officiel MENPS 2009</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Secondaire Collégial (Collège)</h3>
              </div>
            </div>
            <span class="text-xs font-mono font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">2009</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
            Référentiel pour le cycle collégial articulant développement des capacités motrices fondamentales, acquisition des rôles sociaux (arbitre, juge, capitaine) et respect des règles communes.
          </p>

          <div class="space-y-2 mb-5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-700">Compétences Cibles Collège :</div>
            <ul class="space-y-1.5 text-xs text-slate-700">
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Motricités polyvalentes et maîtrise spatio-temporelle</li>
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Coopération solidaire et respect des règles en opposition</li>
              <li class="p-2 bg-slate-50 rounded-lg border border-slate-100">• Éducation à la santé et régulation du rythme respiratoire</li>
            </ul>
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <a href="orientations-pedagogiques-eps-2007-2009.html#college" class="text-xs font-bold text-emerald-600 hover:underline">
              Lire l'Analyse Didactique Complète →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors">
              Consulter OP Collège PDF
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 4. SECTION BIBLIOTHÈQUE NUMÉRIQUE EPS ═══ -->
    <section id="bloc-biblio" class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <span>📚</span>
            <span>Fonds Documentaire Téléchargeable</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bibliothèque Numérique Didactique EPS
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Téléchargez fiches de séance, annales de concours CRMEF, guides de sécurité ministériels et protocoles de tests de VMA.
          </p>
        </div>

        <div class="w-full md:w-72">
          <input
            id="biblio-search-input"
            type="text"
            oninput="filterBiblioResources()"
            placeholder="Rechercher (VMA, Basket, CRMEF)..."
            class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button type="button" onclick="setBiblioCat('all')" id="bcat-all" class="px-3.5 py-1.5 rounded-lg font-bold bg-slate-900 text-white border border-slate-900 shadow-2xs">Toutes les Ressources</button>
        <button type="button" onclick="setBiblioCat('guides')" id="bcat-guides" class="px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200">Guides Ministériels</button>
        <button type="button" onclick="setBiblioCat('concours')" id="bcat-concours" class="px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200">Concours CRMEF</button>
        <button type="button" onclick="setBiblioCat('aps')" id="bcat-aps" class="px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200">Fiches APSA</button>
        <button type="button" onclick="setBiblioCat('fiches')" id="bcat-fiches" class="px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200">Séances & Tests</button>
      </div>

      <div id="biblio-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Ressource 1 -->
        <div class="glass-card p-5 flex flex-col justify-between biblio-item" data-cat="fiches" data-search="vma demi-fond 6 minutes protocole bareme">
          <div class="space-y-3">
            <div class="flex justify-between items-center text-[10px] font-bold">
              <span class="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-mono">PDF · 420 Ko</span>
              <span class="text-slate-600">2026</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">Protocole Test VMA 6 Minutes & Barème Éducatif</h4>
            <p class="text-xs text-slate-500 line-clamp-2">Fiche prête pour piste de 200m/400m avec cônes et calculs d'allures cibles.</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100">
            <a href="calculateur-vma.html" class="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
              <span>Télécharger / Ouvrir</span>
            </a>
          </div>
        </div>

        <!-- Ressource 2 -->
        <div class="glass-card p-5 flex flex-col justify-between biblio-item" data-cat="concours" data-search="crmef concours annales didactique sciences education">
          <div class="space-y-3">
            <div class="flex justify-between items-center text-[10px] font-bold">
              <span class="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-mono">PDF · 2.4 Mo</span>
              <span class="text-slate-600">2024-2025</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">Annales Corrigées CRMEF EPS · Didactique & Écrit</h4>
            <p class="text-xs text-slate-500 line-clamp-2">Sujets officiels et éléments de correction pour le concours de recrutement des enseignants.</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100">
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
              <span>Télécharger / Ouvrir</span>
            </a>
          </div>
        </div>

        <!-- Ressource 3 -->
        <div class="glass-card p-5 flex flex-col justify-between biblio-item" data-cat="aps" data-search="basket basketball sports collectifs arbitrage observation">
          <div class="space-y-3">
            <div class="flex justify-between items-center text-[10px] font-bold">
              <span class="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-mono">PDF · 1.8 Mo</span>
              <span class="text-slate-600">2025</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">Guide Pédagogique Basketball · Collège & Lycée</h4>
            <p class="text-xs text-slate-500 line-clamp-2">Situations d'apprentissage, grilles d'évaluation et fiches d'arbitrage scolaire.</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100">
            <a href="cycles-eps-maroc.html" class="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
              <span>Télécharger / Ouvrir</span>
            </a>
          </div>
        </div>

        <!-- Ressource 4 -->
        <div class="glass-card p-5 flex flex-col justify-between biblio-item" data-cat="guides" data-search="securite prevention risques installations reglementation">
          <div class="space-y-3">
            <div class="flex justify-between items-center text-[10px] font-bold">
              <span class="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-mono">PDF · 950 Ko</span>
              <span class="text-slate-600">2024</span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 leading-snug">Référentiel National de Sécurité en EPS (MENPS)</h4>
            <p class="text-xs text-slate-500 line-clamp-2">Consignes officielles sur le matériel, la pharmacie d'urgence et la responsabilité civile.</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100">
            <a href="securite-eps.html" class="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
              <span>Télécharger / Ouvrir</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 5. SECTION COMMUNAUTÉ — FACEBOOK & INSTAGRAM OFFICIELS UNIQUEMENT (SANS WHATSAPP NI TELEGRAM) ═══ -->
    <section class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-2 max-w-xl">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <span>👥</span>
          <span>Communauté & Réseaux Sociaux</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900">
          Suivez ProfEPS Maroc sur les Réseaux Officiels
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Rejoignez la communauté active des enseignants d’EPS et étudiants CRMEF pour suivre les actualités ministérielles, les nouvelles fiches didactiques et les partages d’expériences pédagogiques.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <!-- Bouton Page Facebook Officielle -->
        <a
          href="https://www.facebook.com/profile.php?id=61559954402311"
          target="_blank"
          rel="noopener noreferrer"
          class="px-5 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-xs transition-all hover:scale-102"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span>Page Facebook ProfEPS</span>
          <span class="text-white/80">↗</span>
        </a>

        <!-- Bouton Compte Instagram Officiel -->
        <a
          href="https://www.instagram.com/profeps.ma"
          target="_blank"
          rel="noopener noreferrer"
          class="px-5 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-xs transition-all hover:scale-102"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span>Instagram @profeps.ma</span>
          <span class="text-white/80">↗</span>
        </a>
      </div>
    </section>

  </main>

  <footer class="footer"></footer>

  <script>
    function updateHeroVma(val) {
      var vma = parseFloat(val);
      document.getElementById('hero-vma-val').textContent = vma.toFixed(1);
      document.getElementById('hero-vma-label').textContent = vma.toFixed(1) + ' km/h';

      var paceSec = Math.round(3600 / vma);
      var m = Math.floor(paceSec / 60);
      var s = paceSec % 60;
      document.getElementById('hero-pace-100').textContent = m + "'" + (s < 10 ? '0' : '') + s + '"/km';
      document.getElementById('hero-speed-85').textContent = (vma * 0.85).toFixed(1) + ' km/h';
      document.getElementById('hero-speed-65').textContent = (vma * 0.65).toFixed(1) + ' km/h';
    }

    function filterOpCards(cycle) {
      var cardLycee = document.getElementById('card-op-lycee');
      var cardCollege = document.getElementById('card-op-college');
      var btnAll = document.getElementById('btn-op-all');
      var btnCol = document.getElementById('btn-op-college');
      var btnLyc = document.getElementById('btn-op-lycee');

      [btnAll, btnCol, btnLyc].forEach(function(b) {
        b.className = 'px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900';
      });

      if (cycle === 'college') {
        cardLycee.style.display = 'none';
        cardCollege.style.display = 'block';
        btnCol.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-2xs';
      } else if (cycle === 'lycee') {
        cardLycee.style.display = 'block';
        cardCollege.style.display = 'none';
        btnLyc.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-2xs';
      } else {
        cardLycee.style.display = 'block';
        cardCollege.style.display = 'block';
        btnAll.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs';
      }
    }

    var currentBiblioCat = 'all';
    function setBiblioCat(cat) {
      currentBiblioCat = cat;
      ['all', 'guides', 'concours', 'aps', 'fiches'].forEach(function(c) {
        var btn = document.getElementById('bcat-' + c);
        if (btn) {
          btn.className = (c === cat)
            ? 'px-3.5 py-1.5 rounded-lg font-bold bg-slate-900 text-white border border-slate-900 shadow-2xs'
            : 'px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-200';
        }
      });
      filterBiblioResources();
    }

    function filterBiblioResources() {
      var q = (document.getElementById('biblio-search-input').value || '').toLowerCase().trim();
      var items = document.querySelectorAll('.biblio-item');
      items.forEach(function(el) {
        var cat = el.getAttribute('data-cat');
        var txt = (el.getAttribute('data-search') + ' ' + el.textContent).toLowerCase();
        var matchCat = (currentBiblioCat === 'all' || cat === currentBiblioCat);
        var matchQ = (q === '' || txt.indexOf(q) !== -1);
        el.style.display = (matchCat && matchQ) ? 'flex' : 'none';
      });
    }
  </script>

  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;
}

const html = generateHomeHtml();
fs.writeFileSync(path.join(rootDir, 'index.html'), html, 'utf8');
console.log('  ✔ index.html racine généré avec succès !');

if (fs.existsSync(path.join(rootDir, 'public'))) {
  fs.writeFileSync(path.join(rootDir, 'public', 'index.html'), html, 'utf8');
  console.log('  ✔ public/index.html généré avec succès !');
}

console.log('\n================================================================');
console.log('🎉 GÉNÉRATION TERMINÉE ! LANCEZ MAINTENANT L\'UNIFICATION NAVBAR/FOOTER');
console.log('================================================================\n');
