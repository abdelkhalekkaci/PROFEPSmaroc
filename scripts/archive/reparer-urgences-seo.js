/**
 * reparer-urgences-seo.js
 * 
 * Script maître de résolution SEO (Phase A & B) pour ProfEPS Maroc :
 * U1. Dé-noindexation immédiate de la page OP (orientations-pedagogiques-eps-2007-2009.html)
 * U2. Génération / vérification des 4 pages piliers du pied de page :
 *     - cycles-eps-maroc.html
 *     - programme-eps-maroc.html
 *     - evaluation-eps.html
 *     - securite-eps.html
 * U3. Suppression des sauts de hiérarchie H4 dans le footer (remplacement par <p class="footer-col-title">)
 * U4. Configuration des redirections 301 canoniques et du cache navigateur dans .htaccess
 * B1. Calibrage des balises Title et Meta Description sur les calculateurs et le Hub
 * B2. Harmonisation des slugs canoniques des cycles EPS
 * B3. Génération automatique du sitemap.xml
 */

(async () => {
const fs = await import('fs');
const path = await import('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const hasPublicDir = fs.existsSync(publicDir);

console.log('\n================================================================');
console.log('🛡️  PHASE A & B : RÉPARATION SEO COMPLÈTE (PROFEPS MAROC)');
console.log('📂  Dossier racine :', rootDir);
console.log('📁  Dossier public détecté :', hasPublicDir);
console.log('================================================================\n');

// ═══ 1. VÉRIFICATION & CRÉATION DES 4 PAGES PILIERS (U2) ═══
console.log('📋 [ÉTAPE 1/6] Vérification et création des 4 pages piliers du pied de page...');

// Fonctions d'aide pour générer le code source complet de chaque page pilier
function getPillarTemplate(filename) {
  const meta = {
    'cycles-eps-maroc.html': {
      title: "Cycles d'EPS au Maroc : Programmes Collège & Lycée | ProfEPS",
      desc: "Tous les cycles d'apprentissage EPS au Maroc par APSA et niveau scolaire (collège et lycée) selon les orientations pédagogiques officielles du MEN.",
      h1: "Cycles d'Apprentissage en EPS au Maroc",
      sub: "Guide didactique complet, programmation des modules et cycles d'enseignement par APSA (Collège & Lycée) conformes aux Orientations Pédagogiques Officielles (OP 2007 & 2009)."
    },
    'programme-eps-maroc.html': {
      title: "Programme EPS Maroc : Horaires, Modules & MEN | ProfEPS",
      desc: "Programme officiel d'EPS au Maroc : volume horaire par niveau, compétences visées au collège et lycée, modules d'enseignement et directives ministérielles.",
      h1: "Programme Officiel d'EPS au Maroc (Collège & Lycée)",
      sub: "Volumes horaires réglementaires, compétences visées par cycle d'enseignement, modules didactiques et finalités éducatives selon les Orientations Pédagogiques Officielles (MEN)."
    },
    'evaluation-eps.html': {
      title: "Évaluation EPS Maroc : Barèmes Officiels & Bac | ProfEPS",
      desc: "Guide de l'évaluation en EPS au Maroc : critères officiels, barèmes d'examen du Baccalauréat, évaluation diagnostique, formative et sommative.",
      h1: "Évaluation et Barèmes Officiels en EPS au Maroc",
      sub: "Modalités d'évaluation diagnostique, formative et certificative, barèmes officiels des épreuves du Baccalauréat marocain et grilles critériées d'observation."
    },
    'securite-eps.html': {
      title: "Sécurité en EPS Maroc : Protocoles & Prévention | ProfEPS",
      desc: "Règles de sécurité et prévention des accidents en EPS : devoirs de surveillance de l'enseignant, trousse de secours et protocole d'urgence au Maroc.",
      h1: "Sécurité et Prévention des Accidents en EPS au Maroc",
      sub: "Obligations juridiques de l'enseignant, contrôle des aires de pratique sportive, prévention des traumatismes et protocole de premiers secours en milieu scolaire."
    }
  }[filename];

  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://profeps.ma/${filename}">

  <!-- OpenGraph & Twitter Cards -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:url" content="https://profeps.ma/${filename}">
  <meta property="og:site_name" content="ProfEPS Maroc">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.desc}">

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${meta.h1}",
    "description": "${meta.desc}",
    "mainEntityOfPage": "https://profeps.ma/${filename}",
    "author": {
      "@type": "Organization",
      "name": "ProfEPS Maroc",
      "url": "https://profeps.ma"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProfEPS Maroc",
      "url": "https://profeps.ma"
    }
  }
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    html[lang="ar"] body { font-family: 'Tajawal', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-slate-950">

  <!-- En-tête de la page -->
  <header class="pt-28 pb-12 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
        <span>🇲🇦 Orientations Officielles MEN</span>
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Ressource Pédagogique EPS</span>
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
        ${meta.h1}
      </h1>
      <p class="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
        ${meta.sub}
      </p>
    </div>
  </header>

  <!-- Contenu Principal -->
  <main class="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
    ${getPillarBody(filename)}
  </main>

</body>
</html>`;
}

function getPillarBody(filename) {
  if (filename === 'cycles-eps-maroc.html') {
    return `
    <section class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">01</span>
        <span>Architecture d'un cycle d'enseignement en EPS au Maroc</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        Conformément aux Orientations Pédagogiques Officielles (OP 2007 pour le collège et OP 2009 pour le secondaire qualifiant), un cycle d'apprentissage en EPS au Maroc s'articule généralement sur une durée de 10 à 12 séances de 2 heures chacune.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
          <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Séance 1</div>
          <div class="font-bold text-white text-sm mb-1">Évaluation Diagnostique</div>
          <p class="text-xs text-slate-400">Entrée dans l'activité, recueil des données initiales, identification des conduites motrices et niveaux initiaux des élèves.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
          <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Séances 2 à 9/10</div>
          <div class="font-bold text-white text-sm mb-1">Apprentissage &amp; Régulation</div>
          <p class="text-xs text-slate-400">Situations complexes, tâches ciblées, critères de réalisation et de réussite, différenciation pédagogique.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
          <div class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Séances 11 et 12</div>
          <div class="font-bold text-white text-sm mb-1">Évaluation Bilan (Sommative)</div>
          <p class="text-xs text-slate-400">Mesure des progrès accomplis, validation de l'Objectif Terminal de Cycle (OTC) et attribution de la note officielle.</p>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">02</span>
        <span>Cycles d'enseignement disponibles par discipline</span>
      </h2>

      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <span>🏀 Sports Collectifs (Collège &amp; Lycée)</span>
        </h3>
        <p class="text-sm text-slate-300 mb-4">
          Développement des habiletés technico-tactiques individuelles et collectives, réversibilité des statuts attaquant/défenseur, occupation rationnelle de l'espace de jeu.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a href="cycle-basketball-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Collège (1AC / 2AC / 3AC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Basketball Collège →</div>
          </a>
          <a href="cycle-basketball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée (Tronc Commun / 1BAC / 2BAC)</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Basketball Lycée →</div>
          </a>
          <a href="cycle-volleyball-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Collège</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Volleyball Collège →</div>
          </a>
          <a href="cycle-volleyball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Volleyball Lycée →</div>
          </a>
          <a href="cycle-handball-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition block group">
            <div class="text-xs text-emerald-400 font-semibold mb-0.5">Lycée</div>
            <div class="text-sm font-bold text-white group-hover:text-emerald-300">Cycle Handball Lycée →</div>
          </a>
        </div>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
          <span>🏸 Sports de Raquette (Badminton)</span>
        </h3>
        <p class="text-sm text-slate-300 mb-4">
          Rupture de l'échange, alternance des trajectoires hautes/basses et courtes/longues, gestion du replacement et stratégie de match.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="cycle-badminton-college-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Collège (Toutes filières)</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Cycle Badminton Collège →</div>
          </a>
          <a href="cycle-badminton-lycee-eps-maroc.html" class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition block group">
            <div class="text-xs text-sky-400 font-semibold mb-0.5">Lycée (Préparation épreuves)</div>
            <div class="text-sm font-bold text-white group-hover:text-sky-300">Cycle Badminton Lycée →</div>
          </a>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
      <h2 class="text-xl font-bold text-white mb-2">Ressources Officielles Pédagogiques Associées</h2>
      <p class="text-sm text-slate-300 mb-6">Approfondissez votre préparation pédagogique en consultant les textes officiels et les outils didactiques :</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Textes Officiels OP</div>
          <div class="text-xs text-slate-400">Téléchargement des OP 2007 (Collège) &amp; 2009 (Lycée)</div>
        </a>
        <a href="programme-eps-maroc.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Programme EPS</div>
          <div class="text-xs text-slate-400">Volumes horaires officiels et compétences visées</div>
        </a>
        <a href="evaluation-eps.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Évaluation &amp; Barèmes</div>
          <div class="text-xs text-slate-400">Barèmes d'examen Bac et fiches critériées</div>
        </a>
        <a href="securite-eps.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Sécurité en EPS</div>
          <div class="text-xs text-slate-400">Prévention des blessures et protocole d'urgence</div>
        </a>
      </div>
    </section>`;
  }

  if (filename === 'programme-eps-maroc.html') {
    return `
    <section class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">01</span>
        <span>Volume Horaire Réglementaire en EPS</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        L'Éducation Physique et Sportive constitue une discipline d'enseignement obligatoire pour l'ensemble des élèves scolarisés au collège et au lycée au Maroc.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5">
          <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Collège (1AC, 2AC, 3AC)</div>
          <div class="text-2xl font-black text-white mb-2">2 Heures / Semaine</div>
          <p class="text-xs text-slate-400 leading-relaxed">Une séance hebdomadaire de deux heures consécutives. Enseignement axé sur l'appropriation des conduites motrices fondamentales et le respect des règles citoyennes.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5">
          <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Lycée Qualifiant (TC, 1BAC, 2BAC)</div>
          <div class="text-2xl font-black text-white mb-2">2 Heures / Semaine</div>
          <p class="text-xs text-slate-400 leading-relaxed">Séance de 2 heures axée sur le projet de performance, l'auto-régulation de l'effort, la gestion de sa vie physique et la préparation de l'épreuve d'EPS au Baccalauréat.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">02</span>
        <span>Compétences Visées et Familles d'Activités</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        Le programme national structure l'enseignement autour de 3 grandes familles d'activités physiques et sportives (APSA) réparties sur l'année :
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
          <h3 class="font-bold text-emerald-400 text-sm">1. Activités Athlétiques</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Course de durée / Demi-fond, vitesse, sauts et lancers. Mesure de la performance objective, régularité des allures et gestion du potentiel aérobie.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
          <h3 class="font-bold text-sky-400 text-sm">2. Sports Collectifs &amp; Raquette</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Basketball, Volleyball, Handball, Football, Badminton. Coopération, réversibilité des rôles attaquant/défenseur et arbitrage.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
          <h3 class="font-bold text-amber-400 text-sm">3. Activités Gymniques</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Gymnastique au sol, acrosport. Maîtrise du risque, alignement postural, création d'enchaînements techniques et parades de sécurité.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-xl font-bold text-white mb-2">Liens Directs &amp; Modules Associés</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Orientations Pédagogiques →</div>
          <div class="text-xs text-slate-400">OP 2007 Collège &amp; 2009 Lycée</div>
        </a>
        <a href="cycles-eps-maroc.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Cycles d'EPS au Maroc →</div>
          <div class="text-xs text-slate-400">Découpage par séance et fiches</div>
        </a>
        <a href="evaluation-eps.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Évaluation en EPS →</div>
          <div class="text-xs text-slate-400">Modalités d'examen et critères</div>
        </a>
        <a href="securite-eps.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Sécurité en EPS →</div>
          <div class="text-xs text-slate-400">Prévention des risques sportifs</div>
        </a>
      </div>
    </section>`;
  }

  if (filename === 'evaluation-eps.html') {
    return `
    <section class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">01</span>
        <span>Les trois temps fondamentaux de l'évaluation</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        L'évaluation en EPS n'est pas une simple sanction chiffrée en fin de cycle. Elle accompagne le processus d'apprentissage à travers trois phases complémentaires prescrites par le Ministère :
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. Évaluation Diagnostique</div>
          <h3 class="text-base font-bold text-white">État des lieux initial</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Permet à l'enseignant de situer les conduites motrices initiales des apprenants, d'identifier les obstacles d'apprentissage et d'adapter les situations didactiques.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-sky-400 uppercase tracking-wider">2. Évaluation Formative</div>
          <h3 class="text-base font-bold text-white">Régulation continue</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Fournit des retours réguliers (feedbacks), favorise l'auto-évaluation et la co-évaluation entre pairs grâce à des critères de réalisation explicites.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Évaluation Sommative</div>
          <h3 class="text-base font-bold text-white">Bilan et certification</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Valide le niveau d'acquisition des compétences motrices et méthodologiques visées à l'issue du cycle d'apprentissage et attribue la note chiffrée officielle sur 20.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">02</span>
        <span>Ventilation officielle de la note sur 20 points (Baccalauréat)</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        Conformément aux cadres de référence du Baccalauréat marocain, la note d'EPS est ventilée de manière équilibrée entre performance mesurée, efficacité technico-tactique et conduites citoyennes :
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 border-l-4 border-l-emerald-500">
          <div class="text-2xl font-black text-emerald-400 mb-1">10 à 14 pts</div>
          <div class="font-bold text-white text-sm mb-2">Performance &amp; Habileté Motrice</div>
          <p class="text-xs text-slate-400 leading-relaxed">Résultat chronométré / mesuré (en course, saut, lancer) ou efficacité collective / individuelle observée dans les sports de balle ou de raquette.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 border-l-4 border-l-sky-500">
          <div class="text-2xl font-black text-sky-400 mb-1">4 à 6 pts</div>
          <div class="font-bold text-white text-sm mb-2">Maîtrise Technique &amp; Projet</div>
          <p class="text-xs text-slate-400 leading-relaxed">Qualité d'exécution biomécanique, régularité des foulées, gestion de l'allure, pertinence des choix tactiques et sécurité des actions.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 border-l-4 border-l-purple-500">
          <div class="text-2xl font-black text-purple-400 mb-1">2 à 4 pts</div>
          <div class="font-bold text-white text-sm mb-2">Conduites Citoyennes &amp; Rôles</div>
          <p class="text-xs text-slate-400 leading-relaxed">Tenue de sport réglementaire, assiduité, arbitrage, respect des camarades, aide à l'installation du matériel et esprit sportif.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-xl font-bold text-white mb-2">Outils et Guides pour l'Évaluation EPS</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <a href="calculateur-vma.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Calculateur VMA &amp; Allures →</div>
          <div class="text-xs text-slate-400">Évaluez la VMA et les barèmes de demi-fond</div>
        </a>
        <a href="qa-evaluation-eps-bac.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">FAQ Évaluation Bac →</div>
          <div class="text-xs text-slate-400">Détails officiels des épreuves du Baccalauréat</div>
        </a>
        <a href="qa-coefficient-eps-bac-maroc.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Coefficients par Filière →</div>
          <div class="text-xs text-slate-400">Poids de l'EPS selon la série du Bac</div>
        </a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Orientations Pédagogiques →</div>
          <div class="text-xs text-slate-400">Textes complets OP 2007 et 2009</div>
        </a>
      </div>
    </section>`;
  }

  if (filename === 'securite-eps.html') {
    return `
    <section class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">01</span>
        <span>La responsabilité juridique de l'enseignant d'EPS</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        L'enseignant d'Éducation Physique et Sportive assume une obligation de moyens renforcée quant à la sécurité corporelle des élèves placés sous sa surveillance. Ce cadre repose sur trois obligations fondamentales :
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. Présence &amp; Surveillance Active</div>
          <h3 class="text-base font-bold text-white">Continuité de surveillance</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Interdiction absolue d'abandonner les élèves sans surveillance sur les installations sportives ou dans les vestiaires, du début à la fin de la séance officielle.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-sky-400 uppercase tracking-wider">2. Vérification des Lieux &amp; Matériel</div>
          <h3 class="text-base font-bold text-white">Contrôle préalable des aires</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Inspection visuelle systématique des sols (débris, flaques glissantes), fixation des buts de handball/football et poteaux avant toute activité.</p>
        </div>
        <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
          <div class="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Consignes &amp; Progressivité</div>
          <h3 class="text-base font-bold text-white">Sécurité active de l'élève</h3>
          <p class="text-xs text-slate-400 leading-relaxed">Échauffement complet obligatoire, règles d'action claires (distances de sécurité, parades, non-violence) et respect des capacités de chacun.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">02</span>
        <span>Protocole d'intervention en cas d'accident corporel</span>
      </h2>
      <p class="text-slate-300 leading-relaxed">
        Lorsqu'une blessure survient (entorse, contusion, malaise ou choc à la tête), l'application de la chaîne d'alerte et des gestes d'urgence est capitale :
      </p>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div class="text-emerald-400 font-bold text-xs uppercase mb-1">Étape 1</div>
          <div class="font-bold text-white text-sm mb-1">Mettre en Sécurité</div>
          <p class="text-xs text-slate-400">Stopper immédiatement le jeu collectif pour éviter un sur-accident et maintenir le blessé immobile.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div class="text-sky-400 font-bold text-xs uppercase mb-1">Étape 2</div>
          <div class="font-bold text-white text-sm mb-1">Évaluer l'État</div>
          <p class="text-xs text-slate-400">Vérifier la conscience, la respiration, et déceler une éventuelle déformation traumatique ou plaie ouverte.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div class="text-amber-400 font-bold text-xs uppercase mb-1">Étape 3</div>
          <div class="font-bold text-white text-sm mb-1">Alerter la Direction</div>
          <p class="text-xs text-slate-400">Prévenir l'administration de l'établissement, appeler les secours (Protection Civile 15) si malaise grave.</p>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div class="text-rose-400 font-bold text-xs uppercase mb-1">Étape 4</div>
          <div class="font-bold text-white text-sm mb-1">Déclaration d'Accident</div>
          <p class="text-xs text-slate-400">Rédiger le rapport circonstancié d'accident scolaire sous 24-48h pour l'assurance scolaire officielle.</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
      <h2 class="text-xl font-bold text-white mb-2">Outils Scientifiques Associés à la Sécurité</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <a href="calculateur-chaleur-meteo-altitude.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Calculateur Chaleur &amp; Météo →</div>
          <div class="text-xs text-slate-400">Indice WBGT et gestion du coup de chaleur</div>
        </a>
        <a href="calculateur-frequence-cardiaque-karvonen.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Zones FC Karvonen →</div>
          <div class="text-xs text-slate-400">Surveillance cardiaque et intensité d'effort</div>
        </a>
        <a href="cycles-eps-maroc.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Cycles d'EPS au Maroc →</div>
          <div class="text-xs text-slate-400">Consignes de sécurité spécifiques par sport</div>
        </a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" class="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition block">
          <div class="text-emerald-400 font-bold text-sm mb-1">Orientations Pédagogiques →</div>
          <div class="text-xs text-slate-400">Cadre officiel du Ministère de l'Éducation</div>
        </a>
      </div>
    </section>`;
  }

  return '';
}

const PILLAR_PAGES = [
  'cycles-eps-maroc.html',
  'programme-eps-maroc.html',
  'evaluation-eps.html',
  'securite-eps.html'
];

PILLAR_PAGES.forEach((pillar) => {
  const rootPillarPath = path.join(rootDir, pillar);
  if (!fs.existsSync(rootPillarPath) || fs.statSync(rootPillarPath).size < 1000) {
    fs.writeFileSync(rootPillarPath, getPillarTemplate(pillar), 'utf8');
    console.log(`  ✔ Page pilier créée à la racine : ${pillar}`);
  } else {
    console.log(`  ✔ Page pilier déjà existante à la racine : ${pillar}`);
  }

  if (hasPublicDir) {
    const publicPillarPath = path.join(publicDir, pillar);
    if (!fs.existsSync(publicPillarPath) || fs.statSync(publicPillarPath).size < 1000) {
      fs.writeFileSync(publicPillarPath, getPillarTemplate(pillar), 'utf8');
      console.log(`  ✔ Page pilier copiée dans public/ : ${pillar}`);
    }
  }
});

// ═══ 2. TRAITEMENT DE LA PAGE ORIENTATIONS PÉDAGOGIQUES (U1) ═══
console.log('\n🔍 [ÉTAPE 2/6] Traitement de la page Orientations Pédagogiques (Urgence U1)...');
const opFiles = [
  'orientations-pedagogiques-eps-2007-2009.html',
  'orientations-pedagogiques-2007-2009.html'
];

opFiles.forEach((opFile) => {
  const targets = [path.join(rootDir, opFile)];
  if (hasPublicDir) targets.push(path.join(publicDir, opFile));

  targets.forEach((opPath) => {
    if (fs.existsSync(opPath)) {
      let content = fs.readFileSync(opPath, 'utf8');
      let modified = false;

      // Supprimer le noindex ou remplacer par index, follow
      if (/noindex/i.test(content)) {
        content = content.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        content = content.replace(/<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        modified = true;
        console.log(`  🚨 NOINDEX DÉTECTÉ ET RETIRÉ avec succès sur ${path.basename(opPath)} !`);
      } else if (!/<meta[^>]*name=["']robots["']/i.test(content)) {
        if (content.includes('</head>')) {
          content = content.replace('</head>', '  <meta name="robots" content="index, follow">\n</head>');
          modified = true;
        }
      }

      if (!/<link[^>]*rel=["']canonical["']/i.test(content)) {
        if (content.includes('</head>')) {
          content = content.replace('</head>', `  <link rel="canonical" href="https://profeps.ma/${opFile}">\n</head>`);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(opPath, content, 'utf8');
        console.log(`  💾 ${path.relative(rootDir, opPath)} mis à jour.`);
      }
    }
  });
});

// ═══ 3. CALIBRAGE DES TITRES & DESCRIPTIONS DES 10 OUTILS (B1) ═══
console.log('\n🏷️  [ÉTAPE 3/6] Calibrage des balises Title & Meta Description (Phase B1)...');

const TOOLS_META = {
  'hub-outils-sport-performance.html': {
    title: "Hub Outils & Calculateurs Sportifs EPS | ProfEPS",
    desc: "Suite de 10 outils et calculateurs pour l'évaluation physique, la programmation d'entraînement et les séances EPS au collège et lycée."
  },
  'calculateur-vdot-asr-endurance.html': {
    title: "Calculateur VO2 Max & VDOT Course | ProfEPS",
    desc: "Calculez votre VO2 Max, score VDOT, zones d'allures et prédictions de chronos avec repères scientifiques adaptés aux séances EPS."
  },
  'calculateur-frequence-cardiaque-karvonen.html': {
    title: "Calculateur FC Max & Zones Karvonen | ProfEPS",
    desc: "Déterminez vos zones cibles d'entraînement cardiaque (Z1 à Z5) selon la formule de Karvonen avec conseils physiologiques en EPS."
  },
  'calculateur-imc-sportif-masse-grasse.html': {
    title: "Calculateur IMC Sportif & Masse Grasse | ProfEPS",
    desc: "Évaluez votre indice de masse corporelle, taux de masse grasse et masse maigre avec interprétations athlétiques pour l'EPS."
  },
  'calculateur-chaleur-meteo-altitude.html': {
    title: "Calculateur Chaleur, Humidité & Altitude | ProfEPS",
    desc: "Ajustez vos allures de course et besoins d'hydratation selon la température, l'humidité et l'altitude en EPS et compétition."
  },
  'generateur-intermittent-hiit-cod.html': {
    title: "Générateur Intermittent HIIT & COD 180° | ProfEPS",
    desc: "Calculez les distances d'intermittent course linéaire et avec changements de direction 180° pour les cycles d'EPS."
  },
  'calculateur-charge-rpe-foster-acwr.html': {
    title: "Calculateur Charge RPE Foster & ACWR | ProfEPS",
    desc: "Suivez votre charge aiguë, chronique et ratio ACWR selon la méthode Foster pour prévenir le surentraînement en EPS."
  },
  'calculateur-asr-reserve-vitesse.html': {
    title: "Calculateur Réserve Anaérobie (ASR) | ProfEPS",
    desc: "Calculez votre réserve de vitesse anaérobie (ASR) et individualisez vos séances d'intermittent supramaximal en EPS."
  },
  'calculateur-indice-endurance.html': {
    title: "Calculateur Indice d'Endurance (IE) | ProfEPS",
    desc: "Mesurez votre indice d'endurance selon Péronnet et équilibrez vos séances d'endurance aérobie et de VMA en EPS."
  },
  'calculateur-gap-pente-nutrition.html': {
    title: "Calculateur Allure Pente (GAP) & Nutrition | ProfEPS",
    desc: "Ajustez votre allure en côte (GAP Minetti) et estimez vos besoins en glucides et hydratation pour vos séances sportives."
  }
};

// ═══ 4. TRAITEMENT DE TOUTES LES PAGES HTML (U3, B2, Footer H4, Liens brisés) ═══
console.log('\n🧹 [ÉTAPE 4/6] Traitement des titres H4 footer, maillage et liens orphelins...');

let scannedCount = 0;
let modifiedCount = 0;

function processHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === '.aistudio'
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processHtmlFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      scannedCount++;
      let html = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Retrait noindex involontaire
      const isPrivate = /^(login|register|dashboard|connexion|inscription|auth|admin)\.html$/i.test(entry.name);
      if (!isPrivate && /noindex/i.test(html)) {
        html = html.replace(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        html = html.replace(/<meta[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots" content="index, follow">');
        changed = true;
      }

      // Remplacer les <h4> du footer par <p class="footer-col-title"> (U3)
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

      // Remplacement des liens orphelins du footer
      const brokenLinks = [
        { oldHref: 'cycles-eps.html', newHref: 'cycles-eps-maroc.html' },
        { oldHref: 'programme-eps.html', newHref: 'programme-eps-maroc.html' },
        { oldHref: 'evaluation.html', newHref: 'evaluation-eps.html' },
        { oldHref: 'securite.html', newHref: 'securite-eps.html' },
        { oldHref: 'evaluation-eps-baremes.html', newHref: 'evaluation-eps.html' }
      ];

      brokenLinks.forEach(({ oldHref, newHref }) => {
        const r = new RegExp(`href=["']${oldHref}["']`, 'gi');
        if (r.test(html)) {
          html = html.replace(r, `href="${newHref}"`);
          changed = true;
        }
      });

      // Calibrage Title & Meta Description si c'est un outil
      if (TOOLS_META[entry.name]) {
        const { title, desc } = TOOLS_META[entry.name];
        // Title
        const titleRegex = /<title>[\s\S]*?<\/title>/i;
        if (titleRegex.test(html)) {
          html = html.replace(titleRegex, `<title>${title}</title>`);
          changed = true;
        }
        // Meta description
        const descRegex = /<meta\s+name=["']description["']\s+content=["'][^"']*["'][^>]*>/i;
        if (descRegex.test(html)) {
          html = html.replace(descRegex, `<meta name="description" content="${desc}">`);
          changed = true;
        }
      }

      // Harmonisation des slugs de cycles sur cycles-eps-maroc.html (B2)
      if (entry.name === 'cycles-eps-maroc.html') {
        const cycleReplacements = [
          { oldSlug: 'cycle-basketball-college.html', newSlug: 'cycle-basketball-college-eps-maroc.html' },
          { oldSlug: 'cycle-basketball-lycee.html', newSlug: 'cycle-basketball-lycee-eps-maroc.html' },
          { oldSlug: 'cycle-volleyball-college.html', newSlug: 'cycle-volleyball-college-eps-maroc.html' },
          { oldSlug: 'cycle-volleyball-lycee.html', newSlug: 'cycle-volleyball-lycee-eps-maroc.html' },
          { oldSlug: 'cycle-handball-lycee.html', newSlug: 'cycle-handball-lycee-eps-maroc.html' },
          { oldSlug: 'cycle-badminton-college.html', newSlug: 'cycle-badminton-college-eps-maroc.html' },
          { oldSlug: 'cycle-badminton-lycee.html', newSlug: 'cycle-badminton-lycee-eps-maroc.html' }
        ];

        cycleReplacements.forEach(({ oldSlug, newSlug }) => {
          if (html.includes(oldSlug)) {
            html = html.replaceAll(oldSlug, newSlug);
            changed = true;
          }
        });
      }

      if (changed) {
        fs.writeFileSync(fullPath, html, 'utf8');
        modifiedCount++;
      }
    }
  }
}

processHtmlFiles(rootDir);
console.log(`  ✔ ${scannedCount} pages HTML analysées.`);
console.log(`  ✔ ${modifiedCount} pages HTML mises à jour (titres H4 footer, maillage, balises SEO).`);

// ═══ 5. CONFIGURATION DU FICHIER .HTACCESS (U4, B6) ═══
console.log('\n⚙️  [ÉTAPE 5/6] Configuration du fichier serveur .htaccess...');

const htaccessContent = `# ==============================================================================
# ProfEPS.ma - Configuration Apache, Redirections 301 & Optimisation de Vitesse
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Redirection 301 /index.html vers la racine /
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\\ /index\\.html\\ HTTP/
  RewriteRule ^index\\.html$ https://profeps.ma/ [R=301,L]

  # 2. Redirection 301 de l'ancienne variante OP sans "eps" vers la page canonique officielle
  RewriteRule ^orientations-pedagogiques-2007-2009\\.html$ /orientations-pedagogiques-eps-2007-2009.html [R=301,L]

  # 3. Redirections des anciennes URLs / doublons vers les pages canoniques
  RewriteRule ^evaluation-eps-baremes\\.html$ /evaluation-eps.html [R=301,L]
  RewriteRule ^programme-eps\\.html$ /programme-eps-maroc.html [R=301,L]
  RewriteRule ^cycles-eps\\.html$ /cycles-eps-maroc.html [R=301,L]
  RewriteRule ^securite\\.html$ /securite-eps.html [R=301,L]

  # 4. Redirection vers HTTPS canonique si le protocole est HTTP
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP_HOST} ^(?:www\\.)?profeps\\.ma$ [NC]
  RewriteRule ^(.*)$ https://profeps.ma/$1 [R=301,L]
</IfModule>

# En-têtes de sécurité et robots (Débloquer l'indexation)
<IfModule mod_headers.c>
  Header always unset X-Robots-Tag
</IfModule>

# ==============================================================================
# B6 - OPTIMISATION DE VITESSE & MISE EN CACHE DU NAVIGATEUR
# ==============================================================================

# 1. Compression Gzip / Deflate pour réduire le poids des pages et scripts
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# 2. Mise en cache prolongée des ressources statiques (Images, Styles, Polices)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # Images et icônes : 1 an
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # Polices de caractères : 1 an
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"

  # Styles CSS et Scripts JS : 1 mois
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
`;

fs.writeFileSync(path.join(rootDir, '.htaccess'), htaccessContent, 'utf8');
console.log('  ✔ .htaccess enregistré à la racine.');
if (hasPublicDir) {
  fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccessContent, 'utf8');
  console.log('  ✔ .htaccess copié dans public/.');
}

// ═══ 6. GÉNÉRATION DU SITEMAP.XML (B3) ═══
console.log('\n🗺️  [ÉTAPE 6/6] Génération automatique du sitemap.xml...');

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
  if (['cgu.html', 'contact.html', 'politique-confidentialite.html', 'a-propos.html'].includes(filename)) return { priority: '0.30', changefreq: 'yearly' };
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
console.log(`  ✔ sitemap.xml généré à la racine avec ${sitemapUrls.length} URLs.`);
if (hasPublicDir) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ✔ sitemap.xml généré dans public/ avec ${sitemapUrls.length} URLs.`);
}

// ═══ 7. UNIFICATION DU HEADER ET DU FOOTER SI UNIFIER-NAVBAR-FOOTER EXISTE ═══
const unifierScriptPath = path.join(rootDir, 'unifier-navbar-footer.js');
if (fs.existsSync(unifierScriptPath)) {
  console.log('\n🔗 [BONUS] Application de unifier-navbar-footer.js sur les pages créées...');
  try {
    const { execSync } = await import('child_process');
    execSync('node unifier-navbar-footer.js', { stdio: 'inherit' });
  } catch (err) {
    console.log('  ℹ️  Exécution séparée de unifier-navbar-footer.js possible après cette étape.');
  }
}

console.log('\n================================================================');
console.log('🎉 TOUTES LES MODIFICATIONS ONT ÉTÉ APPLIQUÉES AVEC SUCCÈS !');
console.log('================================================================\n');

})();
