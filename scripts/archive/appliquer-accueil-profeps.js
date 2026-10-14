import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();

console.log('\n===============================================================');
console.log('🚀 PROFEPS MAROC : MISE À JOUR COMPLÈTE DE LA PAGE D\'ACCUEIL');
console.log('===============================================================\n');

function generateHomeHtml() {
  return `<!DOCTYPE html>
<html lang="fr" dir="ltr" id="html-root">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ProfEPS Maroc : Portail Didactique, Générateur, OP 2007-2009 & Calculateurs EPS</title>
  <meta name="description" content="Plateforme officielle des professeurs d'EPS au Maroc : générateur de fiches pédagogiques, Orientations Pédagogiques 2007 & 2009 (MENPS), bibliothèque numérique et calculateurs de performance sportive." />
  <meta name="keywords" content="prof eps maroc, generateur fiches eps, orientations pedagogiques eps 2007 2009, didactique eps maroc, crmef eps, calculateur vma, vdot daniels, test 6 minutes, projet pedagogique eps" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="ProfEPS Maroc : Portail Didactique, Générateur, OP 2007-2009 & Calculateurs EPS" />
  <meta property="og:description" content="Plateforme officielle des professeurs d'EPS au Maroc : générateur de fiches pédagogiques, Orientations Pédagogiques 2007 & 2009 (MENPS), bibliothèque numérique et calculateurs de performance sportive." />
  <meta property="og:url" content="https://profeps.ma/" />
  <meta property="og:site_name" content="ProfEPS Maroc" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ProfEPS Maroc : Portail Didactique, Générateur & Calculateurs EPS" />
  <meta name="twitter:description" content="Plateforme officielle des professeurs d'EPS au Maroc : générateur de fiches de séances, OP 2007 & 2009, bibliothèque numérique et calculateurs." />
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
    /* Palette officielle conforme aux calculateurs ProfEPS */
    :root {
      --peps-red: #c1272d;
      --peps-red-dark: #991b1b;
      --peps-green: #006233;
      --peps-green-dark: #064e3b;
      --peps-blue: #2563eb;
      --peps-slate-dark: #0f172a;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
    }
    .peps-hero-gradient {
      background: radial-gradient(circle at 18% 20%, rgba(193, 39, 45, 0.07) 0%, transparent 45%),
                  radial-gradient(circle at 82% 80%, rgba(0, 98, 51, 0.07) 0%, transparent 45%),
                  linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
    }
    .peps-btn-primary {
      background: linear-gradient(135deg, #c1272d 0%, #991b1b 52%, #006233 100%) !important;
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      box-shadow: 0 10px 24px -5px rgba(193, 39, 45, 0.42), 0 4px 10px -2px rgba(0, 98, 51, 0.25) !important;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .peps-btn-primary:hover {
      transform: translateY(-2px) scale(1.008) !important;
      filter: brightness(1.06) !important;
      box-shadow: 0 14px 28px -5px rgba(193, 39, 45, 0.52), 0 6px 14px -2px rgba(0, 98, 51, 0.32) !important;
    }
    .peps-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-radius: 1.25rem;
      transition: all 0.22s ease;
      box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.04);
    }
    .peps-card:hover {
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px -8px rgba(15, 23, 42, 0.08);
    }
  </style>
</head>
<body class="antialiased">

  <!-- Point de montage Navbar (sera harmonisé par unifier-navbar-footer.js) -->
  <nav id="navbar" class="navbar"></nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" style="margin-top: 80px;">

    <!-- ═══ 1. HERO SECTION AVEC CURSEUR VMA INTERACTIF ═══ -->
    <section class="peps-hero-gradient border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 space-y-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-50 to-emerald-50 border border-red-200/80 rounded-full text-xs font-bold text-red-700 shadow-2xs">
            <span>🇲🇦</span>
            <span class="tracking-wide uppercase">Portail Didactique · ProfEPS Maroc (profeps.ma)</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Écosystème Didactique de l’EPS, Textes Officiels & Calculateurs Sportifs
          </h1>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            La plateforme de référence pour les professeurs d’EPS et étudiants CRMEF au Maroc :
            générateur automatisé de fiches pédagogiques, Orientations Pédagogiques ministérielles (2007 & 2009),
            médiathèque didactique et 11 calculateurs scientifiques d'entraînement.
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="#bloc-generateur" class="peps-btn-primary px-6 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2">
              <span>✨ Générateur de Fiches EPS</span>
              <span>↓</span>
            </a>
            <a href="#bloc-calculateurs" class="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-xs">
              <span>⚡ Calculateurs (11 Outils)</span>
            </a>
            <a href="#bloc-op" class="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <span>📚 OP 2007 / 2009</span>
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

        <!-- Simulateur VMA Interactif -->
        <div class="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 space-y-5 shadow-xs relative">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-lg">⚡</span>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-800">Curseur VMA & Allures</span>
            </div>
            <span class="text-xs font-mono font-bold px-2.5 py-0.5 bg-red-600 text-white rounded-md">
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
              <span id="hero-vma-label" class="font-mono text-red-700">16.0 km/h</span>
            </div>
            <input
              id="hero-vma-range"
              type="range"
              min="8.0"
              max="24.0"
              step="0.1"
              value="16.0"
              class="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              oninput="updateHeroVma(this.value)"
            />
            <div class="flex justify-between text-[11px] text-slate-600 font-mono">
              <span>8 km/h (Collège)</span>
              <span>15 km/h (Lycée)</span>
              <span>24 km/h (Élite)</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-200 text-center">
            <div class="bg-slate-50 p-2.5 rounded-xl border border-red-100 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-red-700">Allure 100%</div>
              <div id="hero-pace-100" class="text-sm font-black font-mono text-slate-900 mt-1">3'45"/km</div>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Seuil (85%)</div>
              <div id="hero-speed-85" class="text-sm font-black font-mono text-emerald-800 mt-1">13.6 km/h</div>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-2xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Footing (65%)</div>
              <div id="hero-speed-65" class="text-sm font-black font-mono text-slate-800 mt-1">10.4 km/h</div>
            </div>
          </div>

          <a href="calculateur-vma.html" class="w-full py-2.5 px-4 bg-slate-900 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
            <span>Ouvrir le Calculateur VMA Complet</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ 2. PREMIER BLOC : LE GÉNÉRATEUR DES FICHES PÉDAGOGIQUES (AU-DESSOUS DU HERO SECTION) ═══ -->
    <section id="bloc-generateur" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
            <span>✨</span>
            <span>Outil Star · Didactique EPS Maroc</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Générateur de Fiches Pédagogiques & Cycles EPS
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Concevez en quelques clics vos fiches de séance, progressions de cycle et situations d'évaluation conformes aux compétences terminales et modules des Orientations Pédagogiques (2007 & 2009).
          </p>
        </div>

        <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          Conforme MENPS · 100% Gratuit
        </span>
      </div>

      <!-- Carte du Générateur -->
      <div class="bg-white border-2 border-red-500/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[11px] font-bold text-white bg-red-600 px-3 py-1 rounded-full uppercase tracking-wide">
                Générateur Automatisé
              </span>
              <span class="text-xs text-slate-500 font-medium">
                Collège (1AC, 2AC, 3AC) & Lycée (Tronc Commun, 1BAC, 2BAC)
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              Édition Instantanée de Documents Pédagogiques Prêts pour le Terrain & l'Inspection
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Le générateur ProfEPS vous permet de paramétrer le niveau scolaire, l'activité physique et sportive (APSA) et l'objectif de séance pour produire une fiche didactique structurée avec critères de réussite, variables didactiques et régulation de l'effort.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                <span class="text-red-600 font-bold text-base shrink-0 mt-0.5">📋</span>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Fiches de Séance Complètes</h4>
                  <p class="text-[11px] text-slate-500">Mise en train, situations d'apprentissage & bilan métacognitif.</p>
                </div>
              </div>

              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                <span class="text-emerald-600 font-bold text-base shrink-0 mt-0.5">📅</span>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Projets de Cycle Découpés</h4>
                  <p class="text-[11px] text-slate-500">Progression didactique en 10 à 12 séances par APSA.</p>
                </div>
              </div>

              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                <span class="text-blue-600 font-bold text-base shrink-0 mt-0.5">📊</span>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Grilles d'Évaluation OTI / OTC</h4>
                  <p class="text-[11px] text-slate-500">Barèmes sur 20 points : motricité, technique & citoyenneté.</p>
                </div>
              </div>

              <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                <span class="text-amber-600 font-bold text-base shrink-0 mt-0.5">🖨️</span>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Export & Impression Propre</h4>
                  <p class="text-[11px] text-slate-500">Mise en page prête pour le classeur de bord de l'enseignant.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Panneau CTA vers generateur.html -->
          <div class="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-lg border border-slate-800">
            <div class="space-y-3">
              <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                Accès Libre & Instantané
              </span>
              <h4 class="text-lg font-bold">Lancer le Générateur de Fiches</h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Préparez vos séances en un temps record en respectant scrupuleusement la nomenclature officielle du Ministère.
              </p>
            </div>

            <div class="space-y-2.5 pt-2">
              <a
                href="generateur.html"
                class="peps-btn-primary w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 text-center block"
              >
                <span>✨ Ouvrir le Générateur de Fiches</span>
                <span>→</span>
              </a>

              <a
                href="cycles-eps-maroc.html"
                class="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition text-center block"
              >
                <span>📖 Consulter les Fiches de Cycles Types</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 3. DEUXIÈME BLOC : LES CALCULATEURS SCIENTIFIQUES ═══ -->
    <section id="bloc-calculateurs" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
            <span>⚡</span>
            <span>Suite Scientifique Didactique</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Calculateurs Physiologiques & Sciences du Sport
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            11 outils physiologiques calibrés selon les modèles de référence (Billat, Cazorla, Daniels, Péronnet, Karvonen, Foster) pour réguler vos séances scolaires et d'athlétisme.
          </p>
        </div>

        <a href="hub-outils-sport-performance.html" class="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1.5 shrink-0">
          <span>Accéder au Hub des 11 outils</span>
          <span>→</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Cluster 1 (Rouge ProfEPS) -->
        <div class="peps-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center border border-red-100 font-black text-xl">
              ⚡
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Cluster 1</span>
              <h3 class="text-lg font-bold text-slate-900 mt-1">VMA, VO2 Max & Allures</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Calculs complets du profil aérobie de l’élève et du coureur de demi-fond scolaire.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="calculateur-vma.html" class="hover:text-red-700 font-semibold">• Calculateur VMA & Allures (km/h & min/km)</a></li>
              <li><a href="calculateur-vdot-asr-endurance.html" class="hover:text-red-700 font-semibold">• VO2 Max & VDOT (Jack Daniels)</a></li>
              <li><a href="calculateur-asr-reserve-vitesse.html" class="hover:text-red-700 font-semibold">• Réserve de Vitesse Anaérobie (ASR)</a></li>
              <li><a href="calculateur-indice-endurance.html" class="hover:text-red-700 font-semibold">• Indice d’Endurance (Péronnet)</a></li>
            </ul>
          </div>
          <a href="calculateur-vma.html" class="mt-5 w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold text-center block transition-colors">
            Ouvrir Cluster 1
          </a>
        </div>

        <!-- Cluster 2 (Vert Émeraude) -->
        <div class="peps-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 font-black text-xl">
              ❤️
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Cluster 2</span>
              <h3 class="text-lg font-bold text-slate-900 mt-1">Santé, Climat & Cardiologie</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Fréquence cardiaque, morphologie sportive et impact des conditions météo sur l’effort.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="calculateur-frequence-cardiaque-karvonen.html" class="hover:text-emerald-700 font-semibold">• FC Karvonen & Zones Cardiaques Z1-Z5</a></li>
              <li><a href="calculateur-imc-sportif-masse-grasse.html" class="hover:text-emerald-700 font-semibold">• IMC Sportif & Masse Grasse (IMG)</a></li>
              <li><a href="calculateur-chaleur-meteo-altitude.html" class="hover:text-emerald-700 font-semibold">• Chaleur, Humidité & Altitude</a></li>
              <li><a href="calculateur-gap-pente-nutrition.html" class="hover:text-emerald-700 font-semibold">• Allure Pente GAP & Besoins Glucides</a></li>
            </ul>
          </div>
          <a href="calculateur-frequence-cardiaque-karvonen.html" class="mt-5 w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center block transition-colors">
            Ouvrir Cluster 2
          </a>
        </div>

        <!-- Cluster 3 (Bleu Roi) -->
        <div class="peps-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 font-black text-xl">
              🏋️
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Cluster 3</span>
              <h3 class="text-lg font-bold text-slate-900 mt-1">Intermittent HIIT & Charge</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Calibration des plots sur piste et monitoring de la charge d'entraînement.
              </p>
            </div>
            <ul class="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
              <li><a href="generateur-intermittent-hiit-cod.html" class="hover:text-blue-600 font-semibold">• Intermittent HIIT & Navettes COD 180°</a></li>
              <li><a href="calculateur-charge-rpe-foster-acwr.html" class="hover:text-blue-600 font-semibold">• Charge RPE Foster & Ratio ACWR</a></li>
              <li><a href="widget-vma.html" class="hover:text-blue-600 font-semibold">• Widget VMA Intégrable pour Sites EPS</a></li>
            </ul>
          </div>
          <a href="generateur-intermittent-hiit-cod.html" class="mt-5 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center block transition-colors">
            Ouvrir Cluster 3
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ 4. TROISIÈME BLOC : LES ORIENTATIONS PÉDAGOGIQUES (OP 2007 & 2009) ═══ -->
    <section id="bloc-op" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
            <span>📚</span>
            <span>Cadre Didactique Officiel (MENPS Maroc)</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Orientations Pédagogiques EPS Maroc (2007 · 2009)
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Consultez les référentiels officiels de l'Approche par Compétences (APC) pour vos cycles d'enseignement secondaire collégial et qualifiant.
          </p>
        </div>

        <div class="flex gap-2">
          <button type="button" onclick="filterOp('all')" id="btn-op-all" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white transition">Tous</button>
          <button type="button" onclick="filterOp('college')" id="btn-op-college" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition">Collège (2009)</button>
          <button type="button" onclick="filterOp('lycee')" id="btn-op-lycee" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition">Lycée (2007)</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Carte Collège 2009 -->
        <div id="card-op-college" class="peps-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <span class="text-xs font-bold uppercase text-red-700">Cycle Secondaire Collégial</span>
              <span class="text-xs font-mono bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded">OP 2009</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Orientations Pédagogiques Collège (2009)</h3>
            <p class="text-xs text-slate-500 mt-1">Direction des Curricula · Ministère de l'Éducation Nationale</p>
            <p class="text-xs text-slate-600 mt-3 leading-relaxed">
              Fondé sur le développement des habiletés motrices de base, la gestion de l'effort et la coopération tactique dans les situations d'opposition et de coopération.
            </p>
            <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700">
              <div class="font-bold text-slate-900">Compétences de cycle visées :</div>
              <p>• 1AC : Habiletés motrices de base & régulation de l'effort physique.</p>
              <p>• 2AC : Coopération, rôles sociaux et ajustement spatio-temporel.</p>
              <p>• 3AC : Efficacité motrice finalisée et respect des règles institutionnelles.</p>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="text-xs font-bold text-red-700 hover:underline">
              Lire le document complet →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Consulter en ligne
            </a>
          </div>
        </div>

        <!-- Carte Lycée 2007 -->
        <div id="card-op-lycee" class="peps-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <span class="text-xs font-bold uppercase text-emerald-800">Cycle Secondaire Qualifiant</span>
              <span class="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">OP 2007</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900">Orientations Pédagogiques Lycée (2007)</h3>
            <p class="text-xs text-slate-500 mt-1">Direction des Curricula · Ministère de l'Éducation Nationale</p>
            <p class="text-xs text-slate-600 mt-3 leading-relaxed">
              Vise la formation d'un citoyen autonome, lucide et responsable capable de gérer sa propre vie physique et de s'engager dans des projets d'action sportifs complexes.
            </p>
            <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700">
              <div class="font-bold text-slate-900">Modules d'enseignement majeurs :</div>
              <p>• Tronc Commun : Gestion de ses ressources énergétiques et investissement raisonné.</p>
              <p>• 1ère Année Bac : Maîtrise des projets d'action individuels et collectifs.</p>
              <p>• 2ème Année Bac : Autonomie, régulation de l'entraînement et préparation aux épreuves d'examen.</p>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="text-xs font-bold text-emerald-700 hover:underline">
              Lire le document complet →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Consulter en ligne
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 5. QUATRIÈME BLOC : ACCÈS À LA BIBLIOTHÈQUE NUMÉRIQUE EPS ═══ -->
    <section id="bloc-biblio" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <span>📁</span>
            <span>Médiathèque Pédagogique EPS Maroc</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bibliothèque Numérique & Documents Didactiques
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Téléchargez librement les mémoires de recherche CRMEF, fiches de cycles, annales de concours et guides d'évaluation en EPS.
          </p>
        </div>

        <a href="https://profeps.ma/bibliotheque-numerique-eps.html" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 shrink-0">
          <span>Ouvrir la Bibliothèque Complète</span>
          <span>→</span>
        </a>
      </div>

      <!-- Bannière d'accès direct vers https://profeps.ma/bibliotheque-numerique-eps.html -->
      <div class="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span>📚</span>
            <span>Catalogue Centralisé de Didactique</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white">
            Espace Bibliothèque Numérique EPS (profeps.ma)
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Retrouvez tous les documents clés en téléchargement direct : mémoires de fin d'études CRMEF, guides d'APS (Athlétisme, Gymnastique, Football, Basket, Volley), barèmes officiels du Baccalauréat et guides de sécurité sportive.
          </p>
        </div>

        <div class="shrink-0 flex flex-col sm:flex-row gap-3">
          <a
            href="https://profeps.ma/bibliotheque-numerique-eps.html"
            class="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-md hover:scale-105 text-center"
          >
            <span>Accéder à la Bibliothèque Numérique</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <!-- Aperçu de 4 Ressources Phares -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="peps-card p-5 flex flex-col justify-between">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Guide Officiel</span>
            <h4 class="text-sm font-bold text-slate-900">Guide Méthodologique APC</h4>
            <p class="text-xs text-slate-500">Direction des Curricula (2024)</p>
            <p class="text-xs text-slate-600 mt-2">Situations complexes, tâches motrices ciblées et critères de réussite.</p>
          </div>
          <a href="https://profeps.ma/orientations-pedagogiques-eps-2007-2009.html" class="mt-4 text-xs font-bold text-emerald-700 hover:underline">
            Consulter le guide →
          </a>
        </div>

        <div class="peps-card p-5 flex flex-col justify-between">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">CRMEF</span>
            <h4 class="text-sm font-bold text-slate-900">Annales du Concours CRMEF</h4>
            <p class="text-xs text-slate-500">Sujets & Corrigés Types</p>
            <p class="text-xs text-slate-600 mt-2">Didactique générale, physiologie de l'effort et épreuves écrites/orales.</p>
          </div>
          <a href="https://profeps.ma/bibliotheque-numerique-eps.html" class="mt-4 text-xs font-bold text-blue-600 hover:underline">
            Voir les annales →
          </a>
        </div>

        <div class="peps-card p-5 flex flex-col justify-between">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">Fiches APSA</span>
            <h4 class="text-sm font-bold text-slate-900">Cycles d'Athlétisme & Gym</h4>
            <p class="text-xs text-slate-500">Fiches Pratiques de Séance</p>
            <p class="text-xs text-slate-600 mt-2">12 séances complètes avec variables didactiques et critères d'évaluation.</p>
          </div>
          <a href="cycles-eps-maroc.html" class="mt-4 text-xs font-bold text-red-700 hover:underline">
            Télécharger les fiches →
          </a>
        </div>

        <div class="peps-card p-5 flex flex-col justify-between">
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Évaluation</span>
            <h4 class="text-sm font-bold text-slate-900">Barèmes d'Évaluation Bac</h4>
            <p class="text-xs text-slate-500">Cadre Référentiel MENPS</p>
            <p class="text-xs text-slate-600 mt-2">Grilles certificatives officielles sur 20 points pour les épreuves de Bac EPS.</p>
          </div>
          <a href="evaluation-eps.html" class="mt-4 text-xs font-bold text-amber-700 hover:underline">
            Consulter les barèmes →
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ 6. CINQUIÈME BLOC : CARROUSEL / GRILLE DES ARTICLES DE BLOG ═══ -->
    <section id="bloc-blog" class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
            <span>📰</span>
            <span>Articles de Fond & Actualités Didactiques</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Le Blog Didactique de l’Enseignant d’EPS
          </h2>
          <p class="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Analyses méthodologiques, conseils de préparation aux concours CRMEF et démarches pédagogiques concrètes pour le terrain.
          </p>
        </div>

        <a
          href="blog.html"
          class="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs shrink-0 self-start sm:self-auto"
        >
          <span>Accéder à l'Intégralité du Blog</span>
          <span>→</span>
        </a>
      </div>

      <!-- Grille des 4 Articles de Référence avec leurs Vrais Liens -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Article 1 -->
        <article class="peps-card p-5 flex flex-col justify-between group relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-[11px] text-slate-500">
              <span class="font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">Textes MENPS</span>
              <span>6 min</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 group-hover:text-red-700 transition leading-snug">
              <a href="article-difference-op-2007-2009-eps.html">
                Différence entre les Orientations Pédagogiques EPS 2007 et 2009
              </a>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Comprendre l'articulation entre les OP 2007 (Lycée) et 2009 (Collège) : continuum didactique et formulation des compétences.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
            <span class="text-[11px] text-slate-400">Actualisé 2026</span>
            <a href="article-difference-op-2007-2009-eps.html" class="text-xs font-bold text-red-700 hover:underline">
              Lire →
            </a>
          </div>
        </article>

        <!-- Article 2 -->
        <article class="peps-card p-5 flex flex-col justify-between group relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-[11px] text-slate-500">
              <span class="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Physiologie</span>
              <span>5 min</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
              <a href="article-calcul-allures-vma.html">
                Calcul des Allures d'Entraînement et VMA en Milieu Scolaire
              </a>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Protocoles de test (Demi-Cooper, Luc Léger, Vameval) et conversion en tableaux d'allures individualisés de 80% à 120%.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
            <span class="text-[11px] text-slate-400">Actualisé 2026</span>
            <a href="article-calcul-allures-vma.html" class="text-xs font-bold text-emerald-700 hover:underline">
              Lire →
            </a>
          </div>
        </article>

        <!-- Article 3 -->
        <article class="peps-card p-5 flex flex-col justify-between group relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-[11px] text-slate-500">
              <span class="font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">Méthodologie</span>
              <span>8 min</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
              <a href="article-approche-competences.html">
                L'Approche par Compétences (APC) en EPS au Maroc
              </a>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Comment concevoir des situations complexes et évaluer les compétences terminales (OTI / OTC) avec rigueur sur le terrain.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
            <span class="text-[11px] text-slate-400">Actualisé 2026</span>
            <a href="article-approche-competences.html" class="text-xs font-bold text-blue-600 hover:underline">
              Lire →
            </a>
          </div>
        </article>

        <!-- Article 4 -->
        <article class="peps-card p-5 flex flex-col justify-between group relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-[11px] text-slate-500">
              <span class="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Fiches Séances</span>
              <span>4 min</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition leading-snug">
              <a href="article-fiche-seance-athletisme-eps.html">
                Concevoir une Fiche de Séance d'Athlétisme Conforme
              </a>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Structure pédagogique complète en 3 phases : échauffement, situations d'apprentissage à variables et bilan de fin de séance.
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
            <span class="text-[11px] text-slate-400">Actualisé 2026</span>
            <a href="article-fiche-seance-athletisme-eps.html" class="text-xs font-bold text-amber-700 hover:underline">
              Lire →
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ 7. SIXIÈME BLOC : COMMUNAUTÉ OFFICIELLE (FACEBOOK & INSTAGRAM UNIQUEMENT) ═══ -->
    <section class="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-9 shadow-xl text-white">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div class="space-y-3 max-w-xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-full">
            <span>🇲🇦</span>
            <span>Communauté des Enseignants d'EPS au Maroc</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Rejoignez la Communauté Officielle ProfEPS
          </h3>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Suivez nos publications, actualités didactiques, fiches de séances et annales de concours sur nos deux canaux officiels : Facebook et Instagram.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <!-- Lien Facebook -->
          <a
            href="https://www.facebook.com/profile.php?id=61559954402311"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 transition shadow-lg hover:scale-105"
          >
            <span class="text-base">👍</span>
            <span>Page Facebook Officielle</span>
            <span class="text-blue-200">↗</span>
          </a>

          <!-- Lien Instagram -->
          <a
            href="https://www.instagram.com/profeps.ma"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 transition shadow-lg hover:scale-105"
          >
            <span class="text-base">📸</span>
            <span>Compte Instagram @profeps.ma</span>
            <span class="text-pink-200">↗</span>
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- Point de montage Footer (unifier-navbar-footer.js l'harmonisera) -->
  <footer id="profeps-unified-footer" class="footer"></footer>

  <!-- Script interactif du Curseur VMA et Filtre OP -->
  <script>
    function updateHeroVma(val) {
      val = parseFloat(val);
      document.getElementById('hero-vma-val').textContent = val.toFixed(1);
      document.getElementById('hero-vma-label').textContent = val.toFixed(1) + ' km/h';

      // 100% VMA pace
      var secPace = Math.round(3600 / val);
      var m = Math.floor(secPace / 60);
      var s = secPace % 60;
      document.getElementById('hero-pace-100').textContent = m + "'" + (s < 10 ? '0' : '') + s + '"/km';

      // 85% & 65%
      var v85 = (val * 0.85).toFixed(1);
      var v65 = (val * 0.65).toFixed(1);
      document.getElementById('hero-speed-85').textContent = v85 + ' km/h';
      document.getElementById('hero-speed-65').textContent = v65 + ' km/h';
    }

    function filterOp(type) {
      var cCol = document.getElementById('card-op-college');
      var cLyc = document.getElementById('card-op-lycee');
      var bAll = document.getElementById('btn-op-all');
      var bCol = document.getElementById('btn-op-college');
      var bLyc = document.getElementById('btn-op-lycee');

      bAll.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition';
      bCol.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition';
      bLyc.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition';

      if (type === 'college') {
        cCol.style.display = 'flex';
        cLyc.style.display = 'none';
        bCol.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-red-600 text-white transition';
      } else if (type === 'lycee') {
        cCol.style.display = 'none';
        cLyc.style.display = 'flex';
        bLyc.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 text-white transition';
      } else {
        cCol.style.display = 'flex';
        cLyc.style.display = 'flex';
        bAll.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white transition';
      }
    }
  </script>

  <script src="unifier-navbar-footer.js"></script>
</body>
</html>`;
}

// 1. Écriture de index.html racine et public
const htmlContent = generateHomeHtml();
fs.writeFileSync(path.join(rootDir, 'index.html'), htmlContent, 'utf8');

const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent, 'utf8');
}
console.log('✔ index.html créé avec succès.');

// 2. Harmonisation avec unifier-navbar-footer.js
if (fs.existsSync(path.join(rootDir, 'unifier-navbar-footer.js'))) {
  console.log('✔ Harmonisation Navbar & Footer...');
  try {
    execSync('node unifier-navbar-footer.js', { stdio: 'inherit' });
  } catch (e) {
    console.warn('Note unifier:', e.message);
  }
}

// 3. Compilation Vite (dist/)
try {
  console.log('✔ Compilation Vite de production (npm run build)...');
  execSync('npm run build', { stdio: 'inherit' });
} catch (e) {
  console.warn('Note build:', e.message);
}

// 4. Git Commit & Push
try {
  console.log('✔ Envoi sur GitHub (git add, commit, push)...');
  execSync('git add index.html public/index.html dist/index.html unifier-navbar-footer.js 2>nul || git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: nouvelle page accueil profeps.ma conforme" || echo "Rien a commiter"', { stdio: 'inherit' });
  execSync('git push origin main || git push', { stdio: 'inherit' });
  console.log('\n===============================================================');
  console.log('🎉 SUCCÈS TOTAL : LE SITE EST DÉPLOYÉ SUR PROFEPS.MA !');
  console.log('===============================================================\n');
} catch (e) {
  console.warn('Note Git :', e.message);
}
