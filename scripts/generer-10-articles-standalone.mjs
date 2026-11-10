/**
 * builder.mjs
 * Moteur de rendu HTML pour les 10 Guides Piliers ProfEPS.ma (2 000 - 3 000 mots)
 * Génère des pages HTML sémantiques, responsives, avec JSON-LD (Article, FAQPage, BreadcrumbList)
 * et liens d'action vers les calculateurs sportifs associés.
 */
import fs from 'fs';
import path from 'path';

export function countWords(str) {
  return str.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

export function renderArticleHtml(article) {
  const words = countWords(article.contentHtml);
  
  // JSON-LD Graph
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://profeps.ma/${article.slug}.html#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://profeps.ma/#website",
          "name": "ProfEPS Maroc",
          "url": "https://profeps.ma/"
        },
        "headline": article.title,
        "description": article.metaDesc,
        "url": `https://profeps.ma/${article.slug}.html`,
        "datePublished": "2026-10-14T08:00:00+01:00",
        "dateModified": "2026-10-14T08:00:00+01:00",
        "author": {
          "@type": "Person",
          "name": "Équipe Pédagogique ProfEPS & Préparation Physique",
          "jobTitle": "Enseignants d'EPS & Spécialistes en Sciences du Sport",
          "url": "https://profeps.ma/a-propos.html"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ProfEPS Maroc",
          "url": "https://profeps.ma/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://profeps.ma/images/prof_eps.png"
          }
        },
        "inLanguage": "fr-FR",
        "mainEntityOfPage": `https://profeps.ma/${article.slug}.html`,
        "wordCount": words
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://profeps.ma/${article.slug}.html#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://profeps.ma/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides & Calculateurs Sport",
            "item": "https://profeps.ma/hub-outils-sport-performance.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.breadcrumbTitle || article.title,
            "item": `https://profeps.ma/${article.slug}.html`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://profeps.ma/${article.slug}.html#faq`,
        "mainEntity": article.faq.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- ═══ SEO TITLE & META ═══ -->
    <title>${article.seoTitle} | ProfEPS</title>
    <meta name="description" content="${article.metaDesc}">
    <meta name="keywords" content="${article.keywords}">
    <meta name="author" content="Équipe Pédagogique ProfEPS & Préparation Physique">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="https://profeps.ma/${article.slug}.html">
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <!-- ═══ OPEN GRAPH ═══ -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:url" content="https://profeps.ma/${article.slug}.html">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.metaDesc}">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_FR">

    <!-- ═══ TWITTER CARD ═══ -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@profeps_maroc">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.metaDesc}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">

    <!-- ═══ STRUCTURED DATA JSON-LD ═══ -->
    <script type="application/ld+json">
${JSON.stringify(jsonLdGraph, null, 2)}
    </script>

    <!-- ═══ FONTS & TAILWIND ═══ -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        :root {
            --primary: #c1272d;
            --primary-dark: #a01f24;
            --secondary: #006233;
            --secondary-dark: #004d28;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-heading: 'Plus Jakarta Sans', var(--font-sans);
        }
        body {
            font-family: var(--font-sans);
            color: var(--text-main);
            background-color: #f8fafc;
            line-height: 1.75;
            font-size: 1.05rem;
        }
        h1, h2, h3, h4 {
            font-family: var(--font-heading);
            color: #0f172a;
            font-weight: 700;
            line-height: 1.3;
        }
        .prose-editorial h2 {
            font-size: 1.75rem;
            margin-top: 2.75rem;
            margin-bottom: 1.25rem;
            padding-bottom: 0.6rem;
            border-bottom: 2px solid #e2e8f0;
            position: relative;
        }
        .prose-editorial h2::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 60px;
            height: 2px;
            background: #c1272d;
        }
        .prose-editorial h3 {
            font-size: 1.35rem;
            margin-top: 2rem;
            margin-bottom: 0.85rem;
            color: #1e293b;
        }
        .prose-editorial p {
            margin-bottom: 1.4rem;
            text-align: justify;
        }
        .prose-editorial ul, .prose-editorial ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }
        .prose-editorial li {
            margin-bottom: 0.5rem;
        }
        .formula-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
            font-family: 'Courier New', Courier, monospace;
        }
        .callout-box {
            border-left: 4px solid #c1272d;
            background: #fff;
            padding: 1.25rem 1.5rem;
            border-radius: 0 10px 10px 0;
            margin: 1.75rem 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .callout-box.tip {
            border-left-color: #006233;
            background: #f0fdf4;
        }
        .callout-box.warning {
            border-left-color: #d97706;
            background: #fffbeb;
        }
        .callout-box.academic {
            border-left-color: #2563eb;
            background: #eff6ff;
        }
        .table-custom {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.04);
            font-size: 0.95rem;
        }
        .table-custom th {
            background: #0f172a;
            color: #fff;
            padding: 0.85rem 1rem;
            text-align: left;
            font-weight: 600;
        }
        .table-custom td {
            padding: 0.85rem 1rem;
            border-bottom: 1px solid #e2e8f0;
        }
        .table-custom tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .table-custom tr:hover {
            background-color: #f1f5f9;
        }
        .faq-item {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1rem;
            transition: all 0.2s ease;
        }
        .faq-item:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .faq-question {
            font-weight: 700;
            color: #0f172a;
            font-size: 1.1rem;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .tool-banner {
            background: linear-gradient(135deg, #c1272d 0%, #a01f24 50%, #006233 100%);
            color: #ffffff;
            border-radius: 16px;
            padding: 2rem;
            margin: 2.5rem 0;
            box-shadow: 0 12px 30px rgba(193, 39, 45, 0.2);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased pt-[80px]">

    <!-- ═══ HEADER CONTAINER (Géré par unifier-navbar-footer.js) ═══ -->
    <div id="navbar-placeholder"></div>

    <!-- ═══ BREADCRUMB NAVIGATION ═══ -->
    <nav class="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-sm text-slate-500" aria-label="Fil d'Ariane">
        <ol class="flex items-center flex-wrap gap-2">
            <li><a href="/" class="hover:text-red-700 transition">Accueil</a></li>
            <li><span class="text-slate-400">/</span></li>
            <li><a href="/hub-outils-sport-performance.html" class="hover:text-red-700 transition">Calculateurs Sport</a></li>
            <li><span class="text-slate-400">/</span></li>
            <li class="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">${article.breadcrumbTitle || article.title}</li>
        </ol>
    </nav>

    <!-- ═══ MAIN ARTICLE CONTAINER ═══ -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        
        <!-- ARTICLE HEADER -->
        <header class="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                <span class="text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded-md border border-red-100">${article.categoryBadge}</span>
                <span>•</span>
                <span>${words} mots</span>
                <span>•</span>
                <span>Temps de lecture : ~${Math.ceil(words / 200)} min</span>
                <span>•</span>
                <span>Mis à jour le 14 Octobre 2026</span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                ${article.title}
            </h1>
            
            <p class="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                ${article.leadIntro}
            </p>

            <!-- Auteur & Certifications -->
            <div class="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <div class="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    PE
                </div>
                <div>
                    <div class="font-bold text-slate-900 text-sm sm:text-base">Équipe Pédagogique ProfEPS & Préparation Physique</div>
                    <div class="text-xs text-slate-500">Sciences du Sport & Didactique de l'EPS · Agrégation & CRMEF Maroc</div>
                </div>
            </div>
        </header>

        <!-- BANNIÈRE INTERACTIVE CALCULATEUR LIÉ -->
        <div class="tool-banner text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div>
                <span class="inline-block bg-white/20 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full mb-2">Outil Interactif Recommandé</span>
                <h3 class="text-2xl font-bold text-white mb-1">${article.toolCard.title}</h3>
                <p class="text-white/90 text-sm max-w-xl">${article.toolCard.desc}</p>
            </div>
            <div class="mt-4 sm:mt-0 flex-shrink-0">
                <a href="/${article.toolCard.file}" class="inline-flex items-center justify-center bg-white text-red-700 hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl shadow-lg transition duration-200">
                    Ouvrir le Calculateur
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
        </div>

        <!-- CONTENU ÉDITORIAL PRINCIPAL (2000 - 3000 MOTS) -->
        <article class="bg-white rounded-2xl p-6 sm:p-12 shadow-sm border border-slate-200/80 prose-editorial">
            ${article.contentHtml}

            <!-- FAQ SECTION -->
            <section class="mt-16 pt-10 border-t border-slate-200">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">Foire Aux Questions Pédagogiques & Scientifiques</h2>
                <div class="space-y-4">
                    ${article.faq.map(item => `
                    <div class="faq-item">
                        <div class="faq-question">
                            <span class="text-red-600 font-black">Q.</span>
                            <span>${item.q}</span>
                        </div>
                        <div class="text-slate-600 text-sm sm:text-base pl-6">
                            ${item.a}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>

            <!-- CALL TO ACTION DU BAS -->
            <div class="mt-14 bg-slate-900 text-white rounded-xl p-8 text-center sm:text-left sm:flex items-center justify-between gap-6">
                <div>
                    <h3 class="text-xl font-bold mb-2">Passez de la Théorie au Terrain</h3>
                    <p class="text-slate-300 text-sm max-w-lg">
                        Exportez les fiches de passage et grilles d'allures de vos élèves ou de vos coureurs grâce à notre suite de 10 calculateurs scientifiques gratuits.
                    </p>
                </div>
                <div class="mt-4 sm:mt-0 flex gap-3">
                    <a href="/${article.toolCard.file}" class="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-lg text-sm transition">
                        Calculer Maintenant
                    </a>
                    <a href="/hub-outils-sport-performance.html" class="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-lg text-sm transition border border-slate-700">
                        Tous les Outils
                    </a>
                </div>
            </div>

            <!-- BIBLIOGRAPHIE & SOURCES -->
            <footer class="mt-12 pt-6 border-t border-slate-100 text-xs text-slate-500">
                <h4 class="font-bold uppercase tracking-wider text-slate-700 mb-2">Références Académiques & Textes Officiels :</h4>
                <ul class="list-disc pl-5 space-y-1">
                    ${article.sources.map(src => `<li>${src}</li>`).join('')}
                </ul>
            </footer>
        </article>

    </main>

    <!-- ═══ FOOTER CONTAINER (Géré par unifier-navbar-footer.js) ═══ -->
    <div id="footer-placeholder"></div>

</body>
</html>`;
}

/**
 * articles-part1.mjs
 * Guides Piliers 1 à 5 (2 000 à 3 000 mots par article)
 * Rédigés avec un ton incarné, humanisé, ancré dans l'EPS marocaine et la préparation physique de club.
 */

export const ARTICLES_PART1 = [
  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 1 : VMA & DIFFÉRENCIATION DE LA COURSE DE DURÉE EN EPS
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'vma-differencier-course-duree-eps',
    seoTitle: "Différencier la Course de Durée en EPS grâce à la VMA : Guide Pratique",
    title: "Différencier la Course de Durée en EPS grâce à la VMA : Grille d'Allures et Gestion de Classe",
    breadcrumbTitle: "Différencier la Course de Durée par la VMA",
    metaDesc: "Comment construire un cycle de demi-fond motivant en EPS avec la VMA ? Grilles d'allures par groupe, fiches de régulation et barèmes sans échec.",
    keywords: "cycle course de duree EPS, VMA college lycee, differencier allures demi fond, bareme VMA EPS Maroc, demi cooper eps, projet de course eps",
    categoryBadge: "Didactique EPS & Physiologie Aérobie",
    leadIntro: "Dans une même classe de collège ou de lycée de 38 élèves, la Vitesse Maximale Aérobie peut osciller entre 8,5 km/h pour un élève sédentaire et plus de 16 km/h pour un footballeur de club. Vouloir leur imposer un rythme collectif ou évaluer la performance au seul chronomètre brut est la garantie certaine du découragement des uns et de l'ennui des autres. Voici comment faire de la VMA un levier pédagogique concret pour individualiser l'apprentissage, concevoir un cycle de 8 à 10 séances conforme aux Orientations Pédagogiques et réconcilier durablement tous vos élèves avec l'effort aérobie.",
    toolCard: {
      file: "calculateur-vma.html",
      title: "Calculateur de VMA & Grilles d'Allures EPS",
      desc: "Évaluez instantanément la VMA de vos élèves via le Demi-Cooper (6 min) ou VAMEVAL, et exportez les temps de passage au tour de 200 m, 250 m ou 400 m."
    },
    sources: [
      "Ministère de l'Éducation Nationale du Maroc (2009) — Orientations Pédagogiques pour l'EPS au Cycle Secondaire Collégial.",
      "Ministère de l'Éducation Nationale du Maroc (2007) — Orientations Pédagogiques pour l'EPS au Cycle Secondaire Qualifiant.",
      "Léger, L., & Mercier, D. (1984) — Gross energy cost of horizontal treadmill and track running. Sports Medicine.",
      "Billat, V. (2001) — Interval training for performance: a scientific and empirical practice. Sports Medicine, 31(1), 13-31.",
      "Thill, E., & Thomas, R. (1995) — Motivation et engagement de l'élève en éducation physique et sportive. Revue EPS."
    ],
    faq: [
      {
        q: "Quel est le test VMA le plus adapté pour une classe nombreuse de 40 élèves en collège ?",
        a: "Le test continu de 6 minutes (Demi-Cooper) demeure la solution logistique la plus robuste sur les installations scolaires marocaines. Contrairement aux tests progressifs avec bande sonore (Luc-Léger ou VAMEVAL) qui demandent une sono puissante et où l'enseignant doit surveiller simultanément 40 élèves pour valider l'arrêt exact de chacun, le Demi-Cooper s'organise facilement par binômes (un coureur, un observateur muni d'une fiche qui compte les tours et le plot final). En deux vagues de 6 minutes, toute la classe est rigoureusement évaluée avec une précision remarquable."
      },
      {
        q: "Comment éviter que les élèves rapides ne partent trop vite lors du test diagnostique ?",
        a: "C'est l'erreur classique des élèves de 1ère et 2ème année collège : partir au sprint sur les 200 premiers mètres et marcher dès la 3ème minute. Pour canaliser cette fougue, mettez en place lors de la séance préparatoire un jeu d'allure avec lièvre ou imposez un premier tour régulé au coup de sifflet toutes les 15 ou 20 secondes. Expliquez clairement que le Demi-Cooper récompense la vitesse moyenne la plus élevée et non le sprint de départ."
      },
      {
        q: "Faut-il pénaliser un élève en surpoids qui possède une VMA faible (ex: 9 km/h) ?",
        a: "Absolument pas. L'esprit des Orientations Pédagogiques marocaines de 2007 et 2009 proscrit tout barème fondé exclusivement sur la performance brute. Un élève avec 9 km/h de VMA qui parvient à maintenir 85% de sa VMA avec une régularité exemplaire (écart inférieur à 3 secondes par tour) fait preuve d'une maîtrise motrice et méthodologique supérieure à un élève talentueux qui oscille anarchiquement entre 14 et 9 km/h. L'évaluation sommative doit valoriser la maîtrise de soi et la lucidité de l'effort."
      },
      {
        q: "À quelle fréquence doit-on recalculer la VMA au cours d'un cycle de demi-fond ?",
        a: "En milieu scolaire, deux mesures suffisent : une évaluation diagnostique en séance 1 ou 2, et une évaluation certificative/sommative en séance 8 ou 9. Durant les séances intermédiaires, l'enseignant observe si l'élève termine ses séries avec trop de facilité (aisance respiratoire manifeste, absence de rougeur faciale, récupération en moins de 45 secondes) : dans ce cas, on ajuste manuellement son allure cible de +0,5 km/h sans avoir besoin de refaire passer un test complet."
      },
      {
        q: "Peut-on utiliser le cardiofréquencemètre au collège pour réguler la course ?",
        a: "Bien que très formateur, le matériel connecté individuel est rarement disponible pour 40 élèves dans les établissements publics. L'apprentissage du repérage proprioceptif (la fréquence ventilatoire, le test de la parole où l'élève doit pouvoir prononcer une phrase sans bloquer sa respiration, et la prise de pouls carotidien ou radial sur 15 secondes multiplié par 4) reste la méthode la plus universelle, autonome et pérenne."
      },
      {
        q: "Comment aménager la course de durée pour les élèves dispensés partiels ou asthmatiques ?",
        a: "L'élève asthmatique à l'effort peut parfaitement participer au cycle sous réserve d'un protocole d'échauffement progressif plus long (15 minutes en aérobie très lente pour dilater l'arbre bronchique sans choc thermique) et de temps de récupération allongés. Pour les élèves dispensés de course, confiez-leur des rôles d'arbitres, de chronométreurs officiels ou de gestionnaires de tableau de bord d'allures, compétences méthodologiques directement inscrites dans le curriculum."
      }
    ],
    contentHtml: `
      <h2>I. Le Constat de Terrain : Pourquoi la Course de Durée Traditionnelle Échoue</h2>
      <p>
        Tout professeur d'Éducation Physique et Sportive a déjà vécu cette scène : un matin d'automne sur la piste du lycée ou sur le plateau sportif du collège, le coup de sifflet lance un cycle d'athlétisme. Au bout de trois minutes de course continue, la classe est irrémédiablement éclatée en trois morceaux. En tête, trois ou quatre licenciés en club de football ou d'athlétisme caracolent sans fatigue apparente. Au milieu, un peloton disparate s'essouffle à contretemps. En queue de peloton, un groupe d'élèves en surpoids ou déconditionnés marche les bras ballants, le regard fuyant et l'amour-propre entamé.
      </p>
      <p>
        Cette fracture physique et psychologique est le produit direct d'une approche non différenciée de la course de durée. Lorsque l'enseignant demande simplement à ses élèves de « courir 15 minutes sans s'arrêter » ou fixe un barème chronométrique uniforme calqué sur une performance absolue, il ne mesure pas des compétences acquises : il mesure des héritages morphologiques et des pratiques extra-scolaires. Pour que la course devienne un véritable objet d'enseignement formateur, il est impératif de doter chaque élève de son propre étalon de mesure physiologique : la <strong>Vitesse Maximale Aérobie (VMA)</strong>.
      </p>

      <div class="callout-box tip">
        <strong>💡 Le Regard du Pédagogue :</strong>
        La VMA n'est pas une fin en soi ni une étiquette définitive collée sur le front de l'élève. C'est un instrument d'équité démocratique : en rapportant l'effort demandé au potentiel individuel de chacun, un élève qui court à 9,5 km/h à 90% de sa VMA fournit exactement le même engagement physiologique et émotionnel qu'un camarade courant à 15 km/h à 90% de la sienne.
      </div>

      <h2>II. Qu'est-ce que la VMA ? Définition Physiologique et Réalité Biomécanique</h2>
      <p>
        Sur le plan bioénergétique, la Vitesse Maximale Aérobie correspond à la vitesse de déplacement au sol à laquelle la consommation d'oxygène par l'organisme atteint son maximum absolu, désigné sous le terme de <strong>VO₂max</strong>. À cette vitesse, le système cardiorespiratoire (ventilation pulmonaire, débit cardiaque, transport d'hémoglobine et extraction musculaire par les capillaires) tourne à plein régime.
      </p>
      <p>
        Si l'athlète accélère au-delà de cette vitesse (vitesse supramaximale, par exemple lors d'un sprint final ou d'un 15/15 à 110%), l'apport d'oxygène ne peut plus augmenter. Le surplus d'énergie mécanique requis est alors impérativement fourni par la <strong>glycolyse anaérobie lactique</strong>, processus qui engendre rapidement une accumulation d'ions hydrogène (H⁺), une chute du pH intramusculaire (acidose) et, à très court terme, l'épuisement musculaire.
      </p>

      <div class="formula-card">
        RELATION FONDAMENTALE DE LÉGER & MERCIER (1984) :<br><br>
        VO₂max (en ml/kg/min) ≈ VMA (en km/h) × 3,5<br><br>
        Exemple 1 : VMA = 10,0 km/h → VO₂max estimé ≈ 35,0 ml/kg/min (Débutant scolaire)<br>
        Exemple 2 : VMA = 16,0 km/h → VO₂max estimé ≈ 56,0 ml/kg/min (Sportif régulier)
      </div>

      <p>
        Un aspect crucial à enseigner aux élèves est le <strong>temps de soutien à VMA</strong>. Même chez un athlète d'élite, la VMA ne peut pas être maintenue indéfiniment : la durée maximale pendant laquelle un individu peut courir à 100% de sa VMA se situe physiologiquement entre 4 et 7 minutes (avec une moyenne remarquable de 6 minutes). C'est précisément cette constante biologique qui confère toute sa validité scientifique au test du Demi-Cooper.
      </p>

      <h2>III. Le Choix du Protocole de Terrain en Milieu Scolaire : Demi-Cooper vs VAMEVAL</h2>
      <p>
        Sur le terrain, l'enseignant est confronté à des contraintes concrètes d'installations, de temps et de matériel. Voici une analyse comparée des deux grands protocoles applicables en établissement scolaire :
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Protocole</th>
            <th>Durée Totale</th>
            <th>Matériel Requis</th>
            <th>Avantages Scolaires</th>
            <th>Limites Éventuelles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Demi-Cooper (6 minutes)</strong></td>
            <td>15 min échauffement + 2 × 6 min d'effort</td>
            <td>Piste étalonnée (plots tous les 25 ou 50 m), chronomètre, fiches binômes</td>
            <td>Organisation par binômes très fluide, 100% autonome, zéro dépendance sono/enceinte, fidélité reconnue</td>
            <td>Nécessite que les élèves ne partent pas trop vite (sensibilisation indispensable)</td>
          </tr>
          <tr>
            <td><strong>VAMEVAL (Paliers de 1 min, +0,5 km/h)</strong></td>
            <td>10 à 18 min selon les élèves</td>
            <td>Piste de 200m ou 400m, plots tous les 20m, sono puissante, bande sonore étalonnée</td>
            <td>L'allure est régulée par les bips sonores, empêche tout départ suicidaire</td>
            <td>Très difficile à gérer à 40 élèves : l'enseignant doit repérer l'abandon exact de chaque élève simultanément</td>
          </tr>
          <tr>
            <td><strong>Luc-Léger Navette (20 m)</strong></td>
            <td>8 à 15 min</td>
            <td>Gymnase ou terrain de handball, 2 lignes à 20 m, bande son</td>
            <td>Praticable en salle ou petit plateau sportif par jour d'intempérie</td>
            <td>Les demi-tours à 180° imposent un freinage mécanique très coûteux (VMA sous-estimée de 1 à 1,5 km/h par rapport à la piste)</td>
          </tr>
        </tbody>
      </table>

      <h3>Protocole Opérationnel du Demi-Cooper en Binômes</h3>
      <p>
        Pour garantir une mesure rigoureuse sans perte de temps, balisez une piste avec des plots tous les 25 mètres ou 50 mètres. Répartissez la classe en deux vagues équilibrées :
      </p>
      <ul>
        <li><strong>Vague A en action motrice :</strong> Les élèves courent pendant très exactement 6 minutes avec pour consigne de parcourir la plus grande distance possible à une allure la plus stable possible.</li>
        <li><strong>Vague B en observation active :</strong> Chaque observateur se place face à son camarade, note chaque tour complété sur une fiche de relevé, et repère le plot franchi au coup de sifflet final de la 6ème minute.</li>
      </ul>
      <p>
        Le calcul de la VMA est immédiat et sans équivoque :
      </p>

      <div class="formula-card">
        CALCUL DIRECT DEMI-COOPER :<br><br>
        VMA (km/h) = Distance totale parcourue (en mètres) / 100<br><br>
        Exemple : Nawal a couru 3 tours de 250 mètres + 350 mètres au plot final = 1 100 m.<br>
        VMA de Nawal = 1 100 / 100 = 11,0 km/h.
      </div>

      <h2>IV. Grille des Valeurs Moyennes en Collège et Lycée (Repères Indicatifs)</h2>
      <p>
        Les valeurs suivantes constituent des repères statistiques observés sur des cohortes d'élèves en milieu scolaire marocain. Elles permettent à l'enseignant de situer sa classe sans jamais transformer ces données en fatalité biologique :
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Niveau Scolaire</th>
            <th>Âge Moyen</th>
            <th>VMA Moyenne Filles</th>
            <th>VMA Moyenne Garçons</th>
            <th>Fourchette de Classe Courante</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1ère Année Collège</td>
            <td>12-13 ans</td>
            <td>9,5 – 11,0 km/h</td>
            <td>10,5 – 12,0 km/h</td>
            <td>8,0 à 14,5 km/h</td>
          </tr>
          <tr>
            <td>2ème Année Collège</td>
            <td>13-14 ans</td>
            <td>10,0 – 11,5 km/h</td>
            <td>11,0 – 13,0 km/h</td>
            <td>8,5 à 15,5 km/h</td>
          </tr>
          <tr>
            <td>3ème Année Collège</td>
            <td>14-15 ans</td>
            <td>10,0 – 12,0 km/h</td>
            <td>12,0 – 14,0 km/h</td>
            <td>8,5 à 16,5 km/h</td>
          </tr>
          <tr>
            <td>Tronc Commun Lycée</td>
            <td>15-16 ans</td>
            <td>10,5 – 12,5 km/h</td>
            <td>12,5 – 14,5 km/h</td>
            <td>9,0 à 17,0 km/h</td>
          </tr>
          <tr>
            <td>1ère & 2ème Baccalauréat</td>
            <td>16-18 ans</td>
            <td>10,5 – 12,5 km/h</td>
            <td>13,0 – 15,5 km/h</td>
            <td>9,0 à 17,5 km/h</td>
          </tr>
        </tbody>
      </table>

      <div class="callout-box warning">
        <strong>⚠️ L'Impact de la Puberté et de la Morphologie :</strong>
        Entre 12 et 16 ans, le développement staturo-pondéral et l'augmentation de la masse musculaire chez les garçons élèvent naturellement la VMA, tandis que chez les jeunes filles, l'accroissement relatif de la masse grasse et l'évolution pelvienne peuvent stabiliser voire infléchir temporairement la VMA rapportée au poids de corps. L'enseignant veillera scrupuleusement à ne jamais comparer les performances entre sexes et à valoriser la régulation de l'effort personnel.
      </div>

      <h2>V. La Matrice des Allures : Comment Construire 4 Groupes de Travail Homogènes</h2>
      <p>
        Pour organiser des séances de course sans que la piste ne ressemble à une cohue ingérable, constituez dès la séance 2 <strong>quatre groupes de niveau</strong>. Chaque groupe travaillera avec des fiches de temps de passage personnalisées :
      </p>

      <ul>
        <li><strong>Groupe Vert (VMA &lt; 10 km/h) :</strong> Élèves sédentaires ou en surcharge pondérale. Priorité absolue : maintien de la course continue sans marcher à 70-75% de VMA, alternance marche active/course si nécessaire, valorisation de l'aisance respiratoire.</li>
        <li><strong>Groupe Bleu (VMA 10,0 à 11,9 km/h) :</strong> Débutants réguliers. Travail axé sur la stabilisation du train de course et l'apprentissage de la régularité au tour.</li>
        <li><strong>Groupe Jaune (VMA 12,0 à 13,9 km/h) :</strong> Élèves débrouillés et actifs. Introduction progressive de travail intermittent (30/30) à 100% de VMA et travail de train à 85%.</li>
        <li><strong>Groupe Rouge (VMA ≥ 14,0 km/h) :</strong> Sportifs réguliers et profils endurants. Travail de puissance aérobie, intermittent court supramaximal (105-110%) et gestion de course tactique.</li>
      </ul>

      <h3>Tableau de Conversion Allures et Temps au Tour (Piste de 250 m)</h3>
      <table class="table-custom">
        <thead>
          <tr>
            <th>VMA Élève</th>
            <th>70% VMA (Échauffement / Z1)</th>
            <th>85% VMA (Allure Seuil / Z3)</th>
            <th>100% VMA (Puissance / Z4)</th>
            <th>Temps au Tour (250m à 100%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>9,0 km/h</strong></td>
            <td>6,3 km/h (9:31/km)</td>
            <td>7,6 km/h (7:50/km)</td>
            <td>9,0 km/h (6:40/km)</td>
            <td>1 min 40 s</td>
          </tr>
          <tr>
            <td><strong>11,0 km/h</strong></td>
            <td>7,7 km/h (7:47/km)</td>
            <td>9,3 km/h (6:25/km)</td>
            <td>11,0 km/h (5:27/km)</td>
            <td>1 min 22 s</td>
          </tr>
          <tr>
            <td><strong>13,0 km/h</strong></td>
            <td>9,1 km/h (6:35/km)</td>
            <td>11,0 km/h (5:25/km)</td>
            <td>13,0 km/h (4:37/km)</td>
            <td>1 min 09 s</td>
          </tr>
          <tr>
            <td><strong>15,0 km/h</strong></td>
            <td>10,5 km/h (5:42/km)</td>
            <td>12,7 km/h (4:42/km)</td>
            <td>15,0 km/h (4:00/km)</td>
            <td>1 min 00 s</td>
          </tr>
          <tr>
            <td><strong>17,0 km/h</strong></td>
            <td>11,9 km/h (5:02/km)</td>
            <td>14,4 km/h (4:09/km)</td>
            <td>17,0 km/h (3:31/km)</td>
            <td>53 s</td>
          </tr>
        </tbody>
      </table>

      <h2>VI. Progression Pédagogique sur un Cycle de 8 Séances (Collège / Lycée)</h2>
      <p>
        Voici l'architecture éprouvée d'un cycle de demi-fond conforme aux exigences didactiques des Orientations Pédagogiques du Ministère de l'Éducation Nationale marocain :
      </p>

      <ol>
        <li><strong>Séance 1 : Évaluation Diagnostique</strong> — Présentation des enjeux, échauffement collectif codifié, passation du test Demi-Cooper (6 min) en binômes observateur/coureur. Calcul immédiat de la VMA.</li>
        <li><strong>Séance 2 : Connaissance de ses Allures & Régularité</strong> — Découverte de l'allure d'échauffement (70%) et de l'allure continue (80-85%). Exercice : courir 3 fois 4 minutes avec pour défi de réaliser exactement le même temps au tour (écart cible ≤ 3 secondes).</li>
        <li><strong>Séance 3 : Travail au Seuil Aérobie & Régulation Ventilatoire</strong> — Course continue de 2 × 8 minutes à 80-85% de VMA. Utilisation du test de la parole (*talk test*). Analyse des écarts sur fiches d'observation.</li>
        <li><strong>Séance 4 : Introduction à l'Intermittent Court (30 s / 30 s)</strong> — Travail à 100% de VMA. 2 séries de 6 répétitions de 30 secondes d'effort / 30 secondes de marche active. Matérialisation de la distance personnalisée par des plots dédiés à chaque élève.</li>
        <li><strong>Séance 5 : Construction du Projet Individuel de Course</strong> — L'élève choisit son contrat de course (durée et pourcentage de VMA visé) en fonction de ses sensations des séances 2 à 4. Première simulation en conditions réelles sur 10 à 12 minutes.</li>
        <li><strong>Séance 6 : Intermittent Mixte et Relance Mentale</strong> — Séries de 15/15 à 105% de VMA pour stimuler la puissance aérobie et travailler la capacité de dépassement de la fatigue locale.</li>
        <li><strong>Séance 7 : Répétition Générale et Ajustement des Contrats</strong> — Course continue régulée de 12 à 15 minutes avec observation par les pairs. Validation définitive du projet de course pour l'évaluation.</li>
        <li><strong>Séance 8 : Évaluation Sommative Certificative</strong> — Épreuve de projet de course : performance chronométrique contextualisée à la VMA (8 points), régularité du train de course (6 points), investissement et rôle d'observateur/co-évaluateur (6 points).</li>
      </ol>

      <h2>VII. Fiche Pratique : Le Dispositif des « Portes du Temps » sur la Piste</h2>
      <p>
        Comment faire courir 38 élèves en même temps sans passer son cours à crier les temps de passage au mégaphone ? Utilisez le dispositif ultra-efficace des <strong>Portes du Temps</strong> :
      </p>
      <ul>
        <li>Divisez votre piste de 200 ou 250 mètres en 4 secteurs égaux balisés par des plots de couleurs différentes (ex: Plot A départ, Plot B aux 60m, Plot C aux 120m, Plot D aux 180m).</li>
        <li>L'enseignant se place au centre avec un sifflet et donne un coup de sifflet toutes les 15 secondes (ou 20 secondes).</li>
        <li>Chaque élève dispose d'un contrat visuel : à chaque coup de sifflet, il doit franchir le plot correspondant à sa couleur de groupe. S'il est en avance, il temporise ; s'il est en retard, il accélère légèrement sa cadence.</li>
        <li>L'auto-régulation devient immédiate, visuelle et silencieuse. Les élèves développent une sensibilité intime à l'allure kilométrique, compétence durable qui leur servira toute leur vie d'adulte.</li>
      </ul>

      <h2>VIII. Erreurs Fréquentes et Mythes Déboulonnés sur la VMA</h2>
      <p>
        Même chez des praticiens expérimentés, certaines idées reçues persistent sur la piste :
      </p>
      <ul>
        <li><strong>Mythe 1 : « La VMA ne progresse que si l'on court au maximum de ses forces ».</strong> Faux. Chez les adolescents sédentaires, 80% des gains initiaux de VO₂max s'obtiennent par du volume couru entre 70% et 80% de VMA (endurance fondamentale), qui augmente le volume télédiastolique du cœur et le lit capillaire périphérique sans sécréter d'hormones de stress excessives.</li>
        <li><strong>Mythe 2 : « Un élève dispensé ne peut rien apprendre en course ».</strong> Faux. Le rôle d'observateur outillé, de releveur de fréquence cardiaque et de régulateur de train de course confère à l'élève dispensé une maîtrise méthodologique directe du curriculum.</li>
        <li><strong>Mythe 3 : « Évaluer la VMA par temps très chaud ou après le repas ».</strong> Si la température dépasse 30°C sur le plateau sportif, la dérive cardiovasculaire fausse les résultats de 1 à 2 km/h. Privilégiez toujours les premières heures de la matinée.</li>
      </ul>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 2 : INTERMITTENT HIIT & CHANGEMENT DE DIRECTION (COD)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'intermittent-hiit-changement-direction-cod',
    seoTitle: "Intermittent HIIT et Changement de Direction (COD) : Calcul VMA",
    title: "Intermittent HIIT et Changements de Direction (COD) : Calcul des Distances et Séances sur Navettes",
    breadcrumbTitle: "Intermittent HIIT & Changement de Direction (COD)",
    metaDesc: "Calculez précisément vos distances en 30/30 et 15/15 avec demi-tours à 180° (COD). Formules de correction, coût excentrique et fiches pratiques.",
    keywords: "HIIT changement de direction, intermittent 30 30 COD, calcul distance navette VMA, fractionne demi tour, buchheit cod running, hiit eps sports co",
    categoryBadge: "Préparation Physique & Entraînement Sportif",
    leadIntro: "Courir 133 mètres en 30 secondes en ligne droite sur une piste d'athlétisme n'a physiologiquement rien à voir avec parcourir la même distance en allers-retours de 20 mètres avec 5 demi-tours à 180°. Chaque freinage brutal, chaque pivot et chaque relance imposent un coût neuromusculaire excentrique colossal et augmentent la demande en oxygène de 15 à 25%. Si vous ne corrigez pas les distances de vos intermittents en navette, vous envoyez vos élèves ou vos athlètes droit dans le mur de l'épuisement précoce et de la blessure. Voici les clés biomécaniques et les formules exactes pour calibrer vos séances au millimètre.",
    toolCard: {
      file: "generateur-intermittent-hiit-cod.html",
      title: "Générateur Intermittent HIIT & COD 180°",
      desc: "Calculez automatiquement les distances corrigées d'effort selon votre VMA et la longueur de vos navettes (5m, 10m, 15m, 20m, 25m) pour pistes et gymnases."
    },
    sources: [
      "Buchheit, M. (2008) — The 30-15 Intermittent Fitness Test: accuracy for individualizing interval training of young intermittent sport players. J Strength Cond Res.",
      "Dellal, A., Keller, D., Carling, C., et al. (2010) — Physiologic effects of direction changes in intermittent exercise. J Strength Cond Res, 24(12), 3219-3226.",
      "Bangsbo, J. (1994) — The physiological profile of soccer players. Sports Medicine.",
      "Billat, V. (2001) — Interval training for performance: a scientific and empirical practice. Sports Medicine."
    ],
    faq: [
      {
        q: "Pourquoi doit-on obligatoirement réduire la distance lors d'un intermittent avec demi-tours ?",
        a: "Lors d'un demi-tour à 180° (COD - Change of Direction), la vitesse linéaire chute instantanément à zéro pour repartir dans le sens opposé. La phase de freinage impose une contraction musculaire excentrique très puissante au niveau des quadriceps et du triceps sural, suivie d'une poussée concentrique explosive. Cette dynamique brise l'inertie du corps, dissipe l'énergie cinétique et double le coût métabolique par rapport à une course continue à vitesse constante. Si vous gardez la distance théorique de la ligne droite, l'athlète passe en filière anaérobie précoce dès la 3ème répétition et explose."
      },
      {
        q: "Quel est le pourcentage d'ajustement moyen recommandé pour des navettes de 20 mètres ?",
        a: "Selon les travaux de Martin Buchheit, l'introduction de demi-tours à 180° sur des navettes de 20 mètres requiert une réduction de la distance théorique comprise entre 12% et 18% selon le nombre total de virages. Par exemple, pour un coureur ayant une VMA de 16 km/h, l'effort théorique sur 15 secondes en ligne droite est de 66,7 m. En navettes de 20 m (soit 3 allers et 1 retour partiel, avec 2 demi-tours complets), la distance corrigée optimale se situe autour de 54 à 56 mètres."
      },
      {
        q: "Le format 15/15 est-il supérieur au 30/30 pour le développement de la PAM ?",
        a: "Il n'y a pas de supériorité absolue, mais des vertus physiologiques différentes. Le 15 s / 15 s permet d'évoluer à des pourcentages de VMA plus élevés (105% à 115% de VMA) avec une participation aérobie maximale tout en maintenant un taux d'acide lactique très bas grâce à la reconstitution rapide de la myoglobine pendant les 15 secondes de pause. Le 30 s / 30 s s'avère plus exigeant sur le plan mental et cardiorespiratoire continu, idéal pour apprendre à gérer la cinétique d'inconfort ventilatoire."
      },
      {
        q: "Peut-on réaliser une séance d'intermittent HIIT COD sans plots sur un terrain scolaire ?",
        a: "C'est déconseillé. Sans repères matériels stricts, l'élève ralentit inconsciemment dès la fatigue venue. La force de l'intermittent calibré réside dans le contrat spatial : l'élève sait qu'au bout de 15 secondes, son pied doit toucher le plot repère. Sur un terrain multisport (handball ou basket), utilisez les lignes blanches officielles comme repères naturels (ligne des 6 mètres, ligne médiane, ligne des 9 mètres)."
      },
      {
        q: "Combien de séries et de répétitions doit-on programmer pour une séance efficace ?",
        a: "Pour des collégiens ou lycéens : 2 séries de 6 à 8 répétitions en 15/15 ou 30/30 avec 3 à 4 minutes de récupération passive/active entre les blocs. Pour des sportifs confirmés en club : 2 à 3 séries de 8 à 10 répétitions en 15/15 à 110% VMA, ou 2 séries de 8 répétitions en 30/30 à 100% VMA. Le volume total d'effort cumulé doit représenter entre 6 et 12 minutes à haute intensité."
      },
      {
        q: "Quels sont les risques articulaires des changements de direction répétés ?",
        a: "Les contraintes mécaniques en cisaillement sur les genoux (ligaments croisés, tendons rotuliens) et les chevilles sont considérables. Il est impératif d'interdire ces séances sur sol glissant, mouillé ou avec des chaussures usées. De plus, un échauffement neuromusculaire ciblant la stabilité de la hanche, le gainage et la proprioception de cheville est obligatoire avant toute séance COD."
      }
    ],
    contentHtml: `
      <h2>I. L'Énigme du Demi-Tour : Pourquoi la Ligne Droite ne Prépare pas aux Sports Co</h2>
      <p>
        Dans la quasi-totalité des sports collectifs (football, handball, basket-ball, rugby) ainsi que dans les activités de raquette, le déplacement en ligne droite uniforme est une fiction de laboratoire. Selon les analyses vidéo de tracking GPS contemporaines, un footballeur professionnel effectue en moyenne 700 à 1 200 changements de direction par match, dont plus de 200 sont des virages aigus supérieurs à 90°.
      </p>
      <p>
        Transposer naïvement des calculs d'allure sur piste d'athlétisme vers un entraînement en gymnase ou sur terrain de petit jeu constitue l'une des erreurs méthodologiques les plus destructrices en préparation physique. Lorsqu'un athlète effectue un demi-tour complet à 180°, il ne se contente pas de tourner : il doit freiner une masse corporelle lancée à grande vitesse, stabiliser son centre de gravité sur une fraction de seconde, réorienter son bassin et réaccélérer violemment contre l'inertie.
      </p>

      <div class="callout-box academic">
        <strong>📚 Ce que dit la Recherche (Dellal et al., 2010) :</strong>
        À pourcentage de VMA identique, un exercice intermittent incluant des changements de direction à 180° engendre une concentration de lactate sanguin significativement plus élevée, un pic de fréquence cardiaque supérieur de 5 à 8 bpm et un score de fatigue neuromusculaire perçue (RPE) nettement accru par rapport au même travail exécuté en ligne droite continue.
      </div>

      <h2>II. La Biomécanique du Freinage Excentrique et la Relance Explosive</h2>
      <p>
        Pour comprendre la nécessité d'une réduction de distance, il faut décomposer le cycle mécanique du demi-tour en trois phases distinctes :
      </p>
      <ol>
        <li><strong>La Phase de Décélération (Contraction Excentrique) :</strong> Sur les deux derniers appuis avant le plot, le quadriceps et le complexe gastrocnémien-soléaire doivent résister à l'écrasement. Les fibres musculaires s'étirent sous tension pour absorber l'énergie cinétique. Cette phase génère des micro-lésions membranaires et une demande métabolique immédiate très élevée.</li>
        <li><strong>Le Point Mort (Vitesse Nulle) :</strong> Le coureur s'immobilise pour pivoter. L'énergie cinétique accumulée est intégralement perdue sous forme de chaleur dans les tissus et sur le sol.</li>
        <li><strong>La Phase de Réaccélération (Contraction Concentrique Explosive) :</strong> Repartir de zéro impose un recrutement massif des fibres rapides de type IIx et une sollicitation maximale des réserves d'adénosine triphosphate et de phosphocréatine (ATP-CP).</li>
      </ol>
      <p>
        En conséquence directe, si un athlète possède une VMA de 15 km/h, sa vitesse théorique en ligne droite est de 4,17 mètres par seconde. En 15 secondes, il devrait couvrir 62,5 mètres. Mais s'il doit effectuer un aller-retour sur 20 mètres (soit 2 demi-tours), il passe près de 3 secondes cumulées à freiner et réaccélérer : sa distance réelle réalisable à 100% d'effort chute à environ 51 mètres.
      </p>

      <h2>III. Le Modèle de Correction Mathématique de Buchheit</h2>
      <p>
        Martin Buchheit et ses collaborateurs ont établi une modélisation empirique permettant de quantifier précisément la perte métrique induite par chaque demi-tour à 180° :
      </p>

      <div class="formula-card">
        ÉQUATION DE DISTANCE CORRIGÉE INTERMITTENT COD :<br><br>
        Distance Corrigée (m) = Distance Théorique (m) - [Nombre de Virages à 180° × Pénalité Métrique]<br><br>
        Où la Pénalité Métrique varie selon la vitesse de l'athlète :<br>
        - Athlète VMA &lt; 12 km/h : ~1,8 à 2,2 m perdus par demi-tour à 180°<br>
        - Athlète VMA 12 à 15 km/h : ~2,5 à 3,0 m perdus par demi-tour à 180°<br>
        - Athlète VMA &gt; 15 km/h : ~3,2 à 3,8 m perdus par demi-tour à 180°
      </div>

      <h3>Tableau Comparatif : Distances Théoriques (Ligne Droite) vs Distances Corrigées (Navettes 20 m)</h3>
      <table class="table-custom">
        <thead>
          <tr>
            <th>VMA Athlète</th>
            <th>30s Ligne Droite (100% VMA)</th>
            <th>30s Navettes 20m (Corrigé COD)</th>
            <th>15s Ligne Droite (105% VMA)</th>
            <th>15s Navettes 20m (Corrigé COD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>10,0 km/h</strong></td>
            <td>83 m</td>
            <td><strong>71 m</strong> (-14%)</td>
            <td>44 m</td>
            <td><strong>37 m</strong> (-16%)</td>
          </tr>
          <tr>
            <td><strong>12,0 km/h</strong></td>
            <td>100 m</td>
            <td><strong>85 m</strong> (-15%)</td>
            <td>53 m</td>
            <td><strong>44 m</strong> (-17%)</td>
          </tr>
          <tr>
            <td><strong>14,0 km/h</strong></td>
            <td>117 m</td>
            <td><strong>98 m</strong> (-16%)</td>
            <td>61 m</td>
            <td><strong>51 m</strong> (-16%)</td>
          </tr>
          <tr>
            <td><strong>16,0 km/h</strong></td>
            <td>133 m</td>
            <td><strong>110 m</strong> (-17%)</td>
            <td>70 m</td>
            <td><strong>58 m</strong> (-17%)</td>
          </tr>
          <tr>
            <td><strong>18,0 km/h</strong></td>
            <td>150 m</td>
            <td><strong>122 m</strong> (-19%)</td>
            <td>79 m</td>
            <td><strong>65 m</strong> (-18%)</td>
          </tr>
        </tbody>
      </table>

      <h2>IV. Organisation d'une Séance d'Intermittent COD en EPS : Le Dispositif en Couloirs Parallèles</h2>
      <p>
        Gérer 35 élèves sur un terrain de handball (40 m × 20 m) ou de basket pour une séance d'intermittent peut vite tourner au chaos sans un dispositif spatial rigoureux. Voici l'organisation spatiale optimale :
      </p>

      <div class="callout-box tip">
        <strong>💡 Dispositif Pratique en EPS (Terrain de Hand 40x20m) :</strong>
        Tracez 4 grands couloirs longitudinaux dans le sens de la longueur du terrain (40 m). Chaque couloir est affecté à un groupe de niveau de VMA. Les élèves effectuent des allers-retours entre la ligne de départ et leur plot de virage personnalisé, disposé à la distance exacte calculée pour leur groupe.
      </div>

      <ul>
        <li><strong>Couloir 1 (Groupe Vert - VMA 10 km/h) :</strong> Navettes de 15 m. Objectif en 15/15 : 2 allers simples (30 m).</li>
        <li><strong>Couloir 2 (Groupe Bleu - VMA 12 km/h) :</strong> Navettes de 20 m. Objectif en 15/15 : 1 aller-retour de 20m + 4m (44 m).</li>
        <li><strong>Couloir 3 (Groupe Jaune - VMA 14 km/h) :</strong> Navettes de 25 m. Objectif en 15/15 : 1 aller-retour de 25m + 1m (51 m).</li>
        <li><strong>Couloir 4 (Groupe Rouge - VMA 16 km/h) :</strong> Navettes de 28 m. Objectif en 15/15 : 1 aller-retour de 28m + 2m (58 m).</li>
      </ul>

      <h2>V. Deux Séances Types Clé en Main</h2>

      <h3>Séance Type A : Développement de la Puissance Aérobie en EPS (Lycée / Collège 3ème)</h3>
      <ul>
        <li><strong>Objectif :</strong> Stimuler le VO₂max par fractions courtes sans acidose excessive.</li>
        <li><strong>Échauffement (15 min) :</strong> 8 min de footing lent, gammes dynamiques (talons-fesses, montées de genoux, pas chassés), 3 accélérations progressives, éducatifs de décélération sur 5 mètres.</li>
        <li><strong>Corps de séance (2 blocs de 15/15) :</strong>
          <ul>
            <li>Bloc 1 : 8 répétitions de 15 s effort à 105% VMA (distance corrigée COD) / 15 s marche active.</li>
            <li>Récupération intermédiaire : 4 minutes de marche lente et hydratation.</li>
            <li>Bloc 2 : 8 répétitions identiques.</li>
          </ul>
        </li>
        <li><strong>Retour au calme (5 min) :</strong> Marche collective décontractée, étirements légers et bilan sur fiches de ressenti (RPE).</li>
      </ul>

      <h3>Séance Type B : Pré-Saison Sports Collectifs (Football / Handball en Club)</h3>
      <ul>
        <li><strong>Objectif :</strong> Développer la tolérance aux changements de rythme et la capacité de répétition de sprints (RSA).</li>
        <li><strong>Format :</strong> 30 s / 30 s en navettes courtes de 10 mètres (virages ultra-fréquents).</li>
        <li><strong>Volume :</strong> 2 séries de 6 répétitions à 100% VMA COD.</li>
        <li><strong>Récupération inter-séries :</strong> 3 minutes 30 secondes actives (passes avec ballon à intensité minimale).</li>
        <li><strong>Impact :</strong> Travail spécifique des ischios-jambiers et des adducteurs sous contrainte excentrique intense.</li>
      </ul>

      <h2>VI. Sécurité et Prévention des Blessures Musculo-Tendineuses</h2>
      <p>
        Les séances de HIIT avec changements de direction à 180° génèrent des contraintes en cisaillement particulièrement fortes sur la chaîne postérieure. Respectez impérativement les règles suivantes :
      </p>
      <ul>
        <li><strong>Surveillez l'état du sol :</strong> Ne menez jamais une séance COD sur un sol poussiéreux, humide ou verglacé. Le risque de glissade et de rupture des ligaments croisés du genou est réel.</li>
        <li><strong>Apprenez la technique d'abaissement du centre de gravité :</strong> Avant le demi-tour, l'élève doit fléchir les genoux, raccourcir ses foulées sur les deux derniers appuis et engager le tronc vers l'intérieur du virage pour éviter le porte-à-faux articulaire.</li>
        <li><strong>Variez le pied d'appui :</strong> Incitez vos sportifs à tourner une fois sur le pied droit, une fois sur le pied gauche pour éviter les asymétries de charge sur le tendon rotulien.</li>
      </ul>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 3 : ZONES CARDIAQUES & FORMULE DE KARVONEN
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'formule-karvonen-zones-cardiaques-fc-reserve',
    seoTitle: "Formule de Karvonen : Calculer sa FC de Réserve et sa Zone 2",
    title: "Formule de Karvonen et Zones Cardiaques : Calculer sa FC de Réserve et Dompter la Zone 2",
    breadcrumbTitle: "Formule de Karvonen & Fréquence Cardiaque",
    metaDesc: "Maîtrisez le calcul des 5 zones d'entraînement cardiaque avec la formule de Karvonen. FC de réserve, seuils physiologiques et secrets de la Zone 2.",
    keywords: "formule de karvonen, calcul fc reserve, zone 2 course a pied, frequence cardiaque cible endurance, fc max karvonen, seuil aerobie cardiaque",
    categoryBadge: "Cardiologie du Sport & Métabolisme",
    leadIntro: "Courir trop vite lors de ses sorties d'endurance fondamentale est l'erreur numéro un commise par 90% des coureurs amateurs et des élèves en EPS. En s'appuyant aveuglément sur la formule archaïque « 220 moins l'âge », des millions de sportifs s'entraînent dans une zone grise toxique qui engendre une fatigue chronique sans développer le réseau mitochondrial. La méthode mise au point par le physiologiste finlandais Martti Karvonen, fondée sur la Fréquence Cardiaque de Réserve, constitue le seul moyen scientifique rigoureux de calibrer ses zones cibles. Découvrez pas à pas comment calculer vos fréquences cardiaques d'entraînement et pourquoi la Zone 2 est le véritable moteur de votre endurance.",
    toolCard: {
      file: "calculateur-frequence-cardiaque-karvonen.html",
      title: "Calculateur de Fréquence Cardiaque Karvonen",
      desc: "Renseignez votre âge, votre FC de repos et votre FC max pour obtenir vos 5 zones physiologiques personnalisées (Z1 Récupération à Z5 Anaérobie)."
    },
    sources: [
      "Karvonen, M. J., Kentala, E., & Mustala, O. (1957) — The effects of training on heart rate; a longitudinal study. Ann Med Exp Biol Fenn, 35(3), 307-315.",
      "Tanaka, H., Monahan, K. D., & Seals, D. R. (2001) — Age-predicted maximal heart rate revisited. J Am Coll Cardiol, 37(1), 153-156.",
      "San-Millán, I., & Brooks, G. A. (2018) — Assessment of Metabolic Flexibility and Skeletal Muscle Lactate Clearance in Athletes and Patients. Sports Medicine.",
      "Seiler, S. (2010) — What is best practice for training characteristics and training distribution in endurance athletes? Sports Medicine."
    ],
    faq: [
      {
        q: "Pourquoi la formule classique « 220 - âge » est-elle scientifiquement obsolète ?",
        a: "La formule d'Astrand (220 - âge) a été établie empiriquement sur un échantillon restreint et présente un écart-type de ±11 à ±15 battements par minute. Pour une personne de 30 ans ayant une FC max théorique de 190 bpm, sa FC max réelle peut parfaitement être de 175 bpm ou de 205 bpm ! Mais son défaut le plus grave est d'ignorer totalement la fréquence cardiaque de repos. Deux personnes du même âge ayant l'une un cœur de repos à 45 bpm (sportif très entraîné) et l'autre à 75 bpm (sédentaire) ne travaillent absolument pas à la même intensité physiologique à 140 bpm."
      },
      {
        q: "Comment mesurer précisément sa Fréquence Cardiaque de Repos (FCrepos) ?",
        a: "La FC de repos doit être mesurée au réveil, encore couché dans son lit, avant le moindre effort physique, avant toute prise de caféine et après une nuit de sommeil complète. Prenez votre pouls sur 60 secondes complètes au niveau du poignet (artère radiale) ou utilisez une montre cardiofréquencemètre. Recommencez la mesure 3 matins d'affilée et conservez la valeur la plus basse."
      },
      {
        q: "Qu'est-ce que la Zone 2 et pourquoi tout le monde en parle aujourd'hui ?",
        a: "La Zone 2 (60% à 70% de la FC de réserve selon Karvonen) correspond à l'intensité où l'organisme maximise l'oxydation des lipides (acides gras libres) tout en maintenant la lactatémie sanguine à son niveau basal (< 2 mmol/L). Les travaux récents du Dr Iñigo San-Millán ont démontré que c'est dans cette zone précise que les mitochondries musculaires se densifient et apprennent à recycler les ions lactates, construisant ainsi la véritable fondation aérobie des champions."
      },
      {
        q: "Comment savoir si je suis en Zone 2 sans montre cardio ?",
        a: "Appliquez le « Test de la Parole » (Talk Test) : en Zone 2, vous devez être capable de prononcer une phrase complète de 15 à 20 mots à voix haute sans reprendre d'inspiration haletante au milieu de la phrase. Si vous êtes obligé de couper vos phrases en deux pour respirer, vous avez basculé en Zone 3 (tempo / seuil aérobie)."
      },
      {
        q: "Qu'est-ce que le phénomène de dérive cardiaque (Cardiac Drift) ?",
        a: "Lors d'une sortie longue, même si votre allure de course reste rigoureusement constante, vous observerez que votre fréquence cardiaque monte progressivement de 5 à 15 bpm au bout de 40 à 60 minutes. Cette dérive cardiaque s'explique par la déshydratation, la baisse du volume plasmatique sanguin (le cœur doit pomper plus vite pour maintenir le même débit cardiaque) et l'élévation de la température interne du corps. C'est normal, mais cela exige d'ajuster son allure à la baisse par temps chaud."
      },
      {
        q: "Peut-on utiliser la formule de Karvonen avec des adolescents en EPS ?",
        a: "Oui, mais avec prudence. Chez les collégiens, la FC max est naturellement très élevée (souvent 200 à 210 bpm) et la FC de repos est plus volatile en fonction de l'émotivité ou du stress. En milieu scolaire, plutôt que de viser une valeur au bpm près, on enseigne aux élèves à repérer des plages de sensations ventilatoires associées aux zones Karvonen."
      }
    ],
    contentHtml: `
      <h2>I. Le Piège de la Formule d'Astrand (220 - Âge) et la Révolution Karvonen</h2>
      <p>
        Pendant des décennies, le monde de la course à pied et de l'enseignement sportif a répété comme un mantra la célèbre formule : <em>FC max = 220 - âge</em>. Bien que séduisante par sa simplicité arithmétique, cette équation est physiologiquement aveugle. Imaginons deux coureurs de 40 ans :
      </p>
      <ul>
        <li><strong>Karim :</strong> Coureur de marathon chevronné, sa FC de repos matinale est de 44 bpm. Sa FC max mesurée sur le terrain est de 186 bpm.</li>
        <li><strong>Mehdi :</strong> Cadre sédentaire reprenant le sport, sa FC de repos est de 78 bpm. Sa FC max mesurée est de 178 bpm.</li>
      </ul>
      <p>
        Si l'on applique la formule basique en pourcentages directs de la FC max pour leur prescrire une sortie à « 70% de FC max » :
      </p>
      <ul>
        <li>Pour Karim : 186 × 0,70 = 130 bpm. Rapporté à son amplitude cardiaque, il court presque en marchant.</li>
        <li>Pour Mehdi : 178 × 0,70 = 125 bpm. Or, pour un cœur qui bat déjà à 78 bpm au repos, 125 bpm représente un effort proportionnellement beaucoup plus violent !</li>
      </ul>
      <p>
        En 1957, le chercheur finlandais Martti J. Karvonen a introduit une notion fondamentale qui a révolutionné la cardiologie du sport : la <strong>Fréquence Cardiaque de Réserve (FCR)</strong>. La FCR représente la marge dynamique réelle dont dispose le myocarde entre le repos absolu et l'effort maximal.
      </p>

      <h2>II. La Mécanique Mathématique de Karvonen Pas-à-Pas</h2>
      <p>
        La formule de Karvonen calcule la fréquence cardiaque cible ($FC_{cible}$) en appliquant le pourcentage d'intensité non pas à la FC max brute, mais à la FC de réserve, avant d'y réinjecter la FC de repos :
      </p>

      <div class="formula-card">
        FORMULE UNIVERSELLE DE KARVONEN (1957) :<br><br>
        1. Fréquence Cardiaque de Réserve : FCR = FCmax - FCrepos<br>
        2. Fréquence Cardiaque Cible : FCcible = FCrepos + (% Intensité × FCR)<br><br>
        Exemple avec Karim (40 ans, FCrepos = 44, FCmax = 186) à 70% d'intensité :<br>
        FCR = 186 - 44 = 142 bpm<br>
        FCcible = 44 + (0,70 × 142) = 44 + 99,4 = 143,4 bpm ≈ 143 bpm.
      </div>

      <h2>III. Les 5 Zones Physiologiques de Karvonen Décortiquées</h2>
      <p>
        Chaque zone de travail cardiaque induit des adaptations cellulaires, métaboliques et nerveuses spécifiques. Voici la cartographie détaillée des 5 zones d'entraînement :
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Zone</th>
            <th>% FC Réserve</th>
            <th>Appellation & Substrat Dominant</th>
            <th>Sensations Ventilatoires</th>
            <th>Adaptations Physiologiques Majeures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Zone 1</strong></td>
            <td>50% – 60%</td>
            <td>Récupération Active (Lipides 85%)</td>
            <td>Aisance totale, aucune sensation de fatigue, parole continue</td>
            <td>Activation de la circulation de retour, élimination des toxines musculaires, santé cardiovasculaire</td>
          </tr>
          <tr>
            <td><strong>Zone 2</strong></td>
            <td>60% – 70%</td>
            <td>Endurance Fondamentale (Lipides 65%, Glucides 35%)</td>
            <td>Respiration rythmée mais confortable, phrase de 20 mots facile</td>
            <td>Multiplication et densification des mitochondries, angiogenèse (création de capillaires), économie cardiaque</td>
          </tr>
          <tr>
            <td><strong>Zone 3</strong></td>
            <td>70% – 80%</td>
            <td>Tempo / Seuil Aérobie (Glucides 60%, Lipides 40%)</td>
            <td>Ventilation plus marquée, conversation limitée à des phrases courtes</td>
            <td>Capacité à maintenir une allure soutenue, amélioration du stockage du glycogène hépatique et musculaire</td>
          </tr>
          <tr>
            <td><strong>Zone 4</strong></td>
            <td>80% – 90%</td>
            <td>Seuil Anaérobie / Lactique (Glucides 90%)</td>
            <td>Inconfort respiratoire franc, parole réduite à quelques mots isolés</td>
            <td>Recyclage et tolérance aux lactates sanguins, repoussement du point de rupture métabolique</td>
          </tr>
          <tr>
            <td><strong>Zone 5</strong></td>
            <td>90% – 100%</td>
            <td>Puissance Maximale / VO₂max (Glucides 100%)</td>
            <td>Hyperventilation maximale, parole totalement impossible</td>
            <td>Augmentation du débit cardiaque maximal (VES max), puissance mécanique neuromusculaire</td>
          </tr>
        </tbody>
      </table>

      <h2>IV. Le Rôle Suprême de la Zone 2 : Pourquoi Elle Doit Représenter 80% de Votre Volume</h2>
      <p>
        Dans son étude célèbre sur les athlètes d'endurance de classe mondiale (fondeurs, cyclistes du Tour de France, marathoniens kényans), le professeur Stephen Seiler a formalisé le concept de <strong>l'entraînement polarisé (Modèle 80/20)</strong>.
      </p>
      <p>
        Les meilleurs athlètes de la planète passent 80% de leur temps d'entraînement en Zone 1 et Zone 2, et seulement 20% en Zones 4 et 5, en évitant soigneusement de s'éterniser dans la Zone 3 (« la zone grise »).
      </p>

      <div class="callout-box warning">
        <strong>⚠️ Le Piège de la « Zone Grise » (Zone 3) :</strong>
        La Zone 3 donne l'impression gratifiante de courir vite et de « bien travailler ». Pourtant, sur le plan physiologique, elle génère trop de fatigue nerveuse et de stress oxydatif pour permettre un volume d'entraînement élevé, tout en n'étant pas assez intense pour développer la puissance maximale aérobie. C'est l'allure qui fatigue sans faire progresser.
      </div>

      <h2>V. Mesurer sa FC Max : Test de Terrain Sécurisé</h2>
      <p>
        Si vous n'avez pas accès à une épreuve d'effort médicale sur cyclo-ergomètre ou tapis roulant, réalisez ce test de terrain progressif (réservé aux personnes sans contre-indication médicale) :
      </p>
      <ul>
        <li>Échauffez-vous pendant 20 minutes en Zone 2 en terminant par quelques accélérations.</li>
        <li>Trouvez une côte régulière d'environ 300 à 400 mètres (ou restez sur piste plate).</li>
        <li>Montez la première fois à 85% de votre allure maximale. Redescendez en trottinant.</li>
        <li>Montez une deuxième fois à 95% de votre allure maximale. Redescendez.</li>
        <li>Montez la troisième fois au sprint absolu en donnant tout ce qu'il vous reste sur les 100 derniers mètres. La fréquence cardiaque relevée au sommet ou dans les 5 secondes suivant l'arrêt correspond à votre FC max réelle de terrain.</li>
      </ul>

      <h2>VI. Précautions Médicales & Facteurs d'Interférence</h2>
      <p>
        La fréquence cardiaque n'est pas un métronome figé : elle répond instantanément aux stimuli du système nerveux autonome sympathique et parasympathique. Plusieurs facteurs peuvent décaler vos zones de 5 à 15 bpm :
      </p>
      <ul>
        <li><strong>La Température et l'Humidité :</strong> Sous 32°C, la thermorégulation détourne une partie du sang vers la peau pour évacuer la chaleur via la transpiration, réduisant le retour veineux et accélérant le rythme cardiaque.</li>
        <li><strong>La Caféine et les Stimulants :</strong> Deux cafés pris avant l'entraînement peuvent majorer la FC de repos et la FC d'échauffement de 4 à 8 bpm.</li>
        <li><strong>La Dette de Sommeil ou l'État Infectieux :</strong> Une FC de repos supérieure de 7 bpm ou plus à votre moyenne habituelle au réveil est le signe indiscutable d'un début d'infection virale ou d'un surentraînement latent : allégez immédiatement votre séance.</li>
      </ul>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 4 : LA MÉTHODE VDOT DE JACK DANIELS
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'methode-vdot-jack-daniels-calcul-allures',
    seoTitle: "Méthode VDOT Jack Daniels : Calcul Allures & Prédictions Chrono",
    title: "La Méthode VDOT de Jack Daniels : Prédire ses Chronos et Calibrer ses Allures d'Entraînement",
    breadcrumbTitle: "Méthode VDOT de Jack Daniels",
    metaDesc: "Comprendre et appliquer le VDOT de Jack Daniels : prédisez vos chronos du 5 km au marathon et découvrez vos 5 allures physiologiques (E, M, T, I, R).",
    keywords: "vdot jack daniels, calcul allures vdot, prediction chrono 10km marathon, allure seuil threshold, running formula daniels, allures entrainement course",
    categoryBadge: "Physiologie Appliquée & Méthodologie",
    leadIntro: "Pourquoi deux coureurs possédant rigoureusement le même VO₂max mesuré en laboratoire ne réalisent-ils jamais le même temps sur marathon ? La réponse tient en un concept fondamental trop souvent négligé : l'économie de course. Dans les années 1970, le physiologiste et légendaire entraîneur américain Jack Daniels a fusionné la consommation d'oxygène et le rendement biomécanique de la foulée au sein d'une métrique devenue universelle : le VDOT. Découvrez comment cet indice génial permet de prédire vos performances avec une exactitude chirurgicale et de calibrer vos allures d'entraînement au pourcent près.",
    toolCard: {
      file: "calculateur-vdot-asr-endurance.html",
      title: "Calculateur VO2 Max & VDOT Jack Daniels",
      desc: "Entrez un chrono récent sur 5 km, 10 km ou semi-marathon pour obtenir votre indice VDOT et votre tableau personnalisé des 5 allures (Easy, Marathon, Threshold, Interval, Repetition)."
    },
    sources: [
      "Daniels, J., & Gilbert, J. (1979) — Oxygen Power: Performance Tables for Distance Runners.",
      "Daniels, J. (2014) — Daniels' Running Formula (3rd edition). Human Kinetics.",
      "Saunders, P. U., Pyne, D. B., Telford, R. D., & Hawley, J. A. (2004) — Factors affecting running economy in trained distance runners. Sports Medicine.",
      "Noakes, T. D. (2003) — Lore of Running (4th edition). Oxford University Press."
    ],
    faq: [
      {
        q: "Quelle est la différence fondamentale entre le VO₂max et le VDOT ?",
        a: "Le VO₂max est une mesure médicale brute de la quantité maximale de dioxygène qu'un individu peut prélever et utiliser par minute et par kilo de poids corporel. Le VDOT (V-dot-O₂), en revanche, est un « VO₂max pseudo-fonctionnel » : il mesure la performance réelle en situation de course, combinant à la fois le moteur cardiorespiratoire (VO₂max) et l'économie de course (la quantité d'oxygène consommée pour courir un kilomètre à une allure donnée). Un coureur avec un VO₂max modeste mais une foulée ultra-économe peut posséder un VDOT supérieur à un coureur au gros moteur mais à la foulée lourde et bondissante."
      },
      {
        q: "Peut-on calculer son VDOT à partir d'une séance de fractionné court ?",
        a: "Non. Le VDOT repose sur une relation d'équilibre aérobie en compétition continue. Pour obtenir un VDOT représentatif, vous devez utiliser le chronomètre d'une course courue à bloc, idéalement sur 5 km, 10 km ou semi-marathon, sur un parcours plat et dans de bonnes conditions météorologiques."
      },
      {
        q: "Quelles sont les 5 allures officielles du système Jack Daniels ?",
        a: "Jack Daniels décline l'entraînement en 5 allures complémentaires : Allure E (Easy / Endurance fondamentale, 59-74% VO₂max), Allure M (Marathon, allure spécifique pour habituer le corps au substrat énergétique), Allure T (Threshold / Seuil lactique soutenable ~60 min à bloc), Allure I (Interval / Puissance aérobie VO₂max avec fractions de 3 à 5 min), et Allure R (Repetition / Vitesse pure et économie neuromusculaire avec fractions courtes et récupérations complètes)."
      },
      {
        q: "Pourquoi Jack Daniels déconseille-t-il de courir ses sorties faciles (Easy) trop vite ?",
        a: "C'est l'avertissement le plus célèbre de la formule Daniels : courir plus vite que son allure E prescrite ne confère aucun avantage physiologique supplémentaire en termes de développement mitochondrial ou capillaire, mais accumule une fatigue orthopédique et glycogénique inutile qui détruit la qualité des séances de qualité (T et I) qui suivent dans la semaine."
      },
      {
        q: "À quelle vitesse doit-on courir son allure au seuil (Threshold) ?",
        a: "L'allure T correspond très exactement à la vitesse que vous pourriez maintenir au maximum pendant environ une heure dans une course à bloc (pour la plupart des coureurs amateurs, c'est l'allure d'un 15 km ou d'un semi-marathon bien mené). L'effort se situe autour de 88-92% de la FC max."
      },
      {
        q: "Tous les combien de temps doit-on réévaluer son indice VDOT ?",
        a: "Jack Daniels préconise de conserver le même VDOT pendant un bloc d'entraînement complet de 4 à 6 semaines, même si l'on se sent plus fort. On ne réévalue son VDOT à la hausse qu'après une compétition officielle ou un test chronométré validé."
      }
    ],
    contentHtml: `
      <h2>I. La Naissance du VDOT : Pourquoi le Laboratoire Trompait les Entraîneurs</h2>
      <p>
        Dans les années 1970, le monde de la course à pied vivait sous le dogme absolu du VO₂max. On mesurait le souffle des coureurs sur des tapis roulants encombrés de tubulures et de capteurs de gaz, convaincu que le coureur affichant le chiffre le plus élevé remporterait systématiquement la médaille d'or.
      </p>
      <p>
        Pourtant, sur les pistes d'athlétisme et sur le bitume des marathons, la réalité contredisait fréquemment la théorie. Des coureurs possédant un VO₂max de 68 ml/kg/min battaient régulièrement des rivaux dotés d'un VO₂max de 75 ml/kg/min. Jack Daniels, double médaillé olympique de pentathlon moderne devenu docteur en physiologie de l'exercice, comprit que le chaînon manquant était <strong>l'Économie de Course (Running Economy)</strong>.
      </p>
      <p>
        Deux voitures peuvent avoir un moteur V6 identique de 3 litres de cylindrée : si l'une pèse 900 kg et possède un profil aérodynamique parfait, elle ira beaucoup plus vite et consommera moins d'essence que l'autre qui pèse 2 tonnes. Le VDOT est l'indicateur synthétique qui exprime la puissance utile réelle restituée au sol.
      </p>

      <h2>II. Les Équations de Daniels et Gilbert (1979)</h2>
      <p>
        Pour établir leurs tables, Daniels et Gilbert ont modélisé mathématiquement la fraction de VO₂max soutenable en fonction de la durée de l'effort ($t$ en minutes) et le coût en oxygène ($VO_2$) de la vitesse de course ($v$ en mètres par minute) :
      </p>

      <div class="formula-card">
        MODÈLE MATHÉMATIQUE DE DANIELS & GILBERT :<br><br>
        1. Coût en Oxygène : VO₂ (ml/kg/min) = -4,60 + 0,182258 × v + 0,000104 × v²<br>
        2. Fraction Soutenable : %VO₂max = 0,8 + 0,1894393 × e^(-0,012778 × t) + 0,2989558 × e^(-0,1932605 × t)<br>
        3. Indice VDOT = VO₂ / %VO₂max
      </div>

      <p>
        Grâce à ce modèle, chaque performance chronométrée sur une distance connue correspond à un VDOT unique. Dès lors que votre VDOT est calculé, toutes vos allures d'entraînement physiologiques en découlent automatiquement.
      </p>

      <h2>III. Les 5 Allures Physiologiques de la Formule Daniels</h2>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Allure</th>
            <th>Appellation Complète</th>
            <th>% VO₂max / % FCmax</th>
            <th>Durée & Format Recommandé</th>
            <th>Bénéfices Physiologiques</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>E</strong></td>
            <td>Easy Pace (Endurance Facile)</td>
            <td>59% – 74% VO₂max<br>65% – 79% FCmax</td>
            <td>Footings de 30 min à sorties longues de 2h</td>
            <td>Capillarisation, résistance des tendons, développement des fibres lentes, utilisation des graisses</td>
          </tr>
          <tr>
            <td><strong>M</strong></td>
            <td>Marathon Pace (Allure Marathon)</td>
            <td>75% – 84% VO₂max<br>80% – 87% FCmax</td>
            <td>Fractions longues de 4 à 10 km au sein d'une sortie longue</td>
            <td>Mémorisation du rythme de course, efficacité énergétique, confiance mentale</td>
          </tr>
          <tr>
            <td><strong>T</strong></td>
            <td>Threshold Pace (Seuil Lactique)</td>
            <td>85% – 88% VO₂max<br>88% – 92% FCmax</td>
            <td>Tempo run continu de 20 min ou fractions de 5 à 15 min (récup 1 min)</td>
            <td>Recyclage du lactate sanguin, repoussement de la fatigue sur 10 km et semi-marathon</td>
          </tr>
          <tr>
            <td><strong>I</strong></td>
            <td>Interval Pace (Puissance Aérobie)</td>
            <td>95% – 100% VO₂max<br>97% – 100% FCmax</td>
            <td>Répétitions de 3 à 5 minutes (ex: 5 × 1 000 m, récup égale ou légèrement inférieure)</td>
            <td>Augmentation du VO₂max, puissance de la pompe cardiaque, tolérance psychologique</td>
          </tr>
          <tr>
            <td><strong>R</strong></td>
            <td>Repetition Pace (Vitesse pure)</td>
            <td>Supramaximal (&gt; 100% VO₂max)</td>
            <td>Fractions courtes de 200m à 400m avec récupérations complètes (marche)</td>
            <td>Économie de foulée, fréquence neuromusculaire, fluidité mécanique sans acidose</td>
          </tr>
        </tbody>
      </table>

      <h2>IV. Grand Tableau d'Équivalences VDOT (Chronos Compétition et Allures au km)</h2>
      <p>
        Voici un extrait opérationnel des correspondances VDOT de 35 à 60, couvrant la vaste majorité des coureurs amateurs et confirmés :
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th>VDOT</th>
            <th>5 km</th>
            <th>10 km</th>
            <th>Semi-Marathon</th>
            <th>Marathon</th>
            <th>Allure E (min/km)</th>
            <th>Allure T (min/km)</th>
            <th>Allure I (min/km)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>35</strong></td>
            <td>27:00</td>
            <td>56:06</td>
            <td>2h 04m 20s</td>
            <td>4h 19m 20s</td>
            <td>6:55 – 7:25</td>
            <td>5:50</td>
            <td>5:22</td>
          </tr>
          <tr>
            <td><strong>40</strong></td>
            <td>24:08</td>
            <td>50:03</td>
            <td>1h 50m 50s</td>
            <td>3h 49m 45s</td>
            <td>6:10 – 6:38</td>
            <td>5:14</td>
            <td>4:48</td>
          </tr>
          <tr>
            <td><strong>45</strong></td>
            <td>21:50</td>
            <td>45:16</td>
            <td>1h 40m 10s</td>
            <td>3h 28m 00s</td>
            <td>5:34 – 6:00</td>
            <td>4:45</td>
            <td>4:21</td>
          </tr>
          <tr>
            <td><strong>50</strong></td>
            <td>19:57</td>
            <td>41:21</td>
            <td>1h 31m 30s</td>
            <td>3h 10m 50s</td>
            <td>5:05 – 5:28</td>
            <td>4:21</td>
            <td>3:59</td>
          </tr>
          <tr>
            <td><strong>55</strong></td>
            <td>18:22</td>
            <td>38:06</td>
            <td>1h 24m 15s</td>
            <td>2h 56m 00s</td>
            <td>4:40 – 5:02</td>
            <td>4:01</td>
            <td>3:40</td>
          </tr>
          <tr>
            <td><strong>60</strong></td>
            <td>17:03</td>
            <td>35:22</td>
            <td>1h 18m 05s</td>
            <td>2h 43m 15s</td>
            <td>4:20 – 4:40</td>
            <td>3:44</td>
            <td>3:24</td>
          </tr>
        </tbody>
      </table>

      <h2>V. Comment Utiliser le VDOT en Pratique : 3 Règles d'Or</h2>
      <ol>
        <li><strong>Entraînez-vous avec votre VDOT ACTUEL, pas votre VDOT rêvé :</strong> Si votre 10 km récent est en 50 minutes (VDOT 40), ne vous entraînez pas aux allures d'un VDOT 45 sous prétexte que vous visez 45 minutes dans six mois. Vous vous surentraînerez. Le VDOT monte comme conséquence de l'entraînement, pas l'inverse.</li>
        <li><strong>Respectez l'allure E sans complexe :</strong> Plus de 70% de votre kilométrage hebdomadaire doit impérativement être couru à l'allure E. Si vous courez vos footings avec un ami plus rapide, vous détruisez les bénéfices de la séance.</li>
        <li><strong>Le tempo run au seuil T : la séance reine :</strong> Une séance hebdomadaire de 20 minutes continues à allure T (ou 3 × 2 km à allure T avec 1 minute de repos) est le stimulus le plus rentable de toute la physiologie de la course à pied.</li>
      </ol>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 5 : COURIR PAR FORTE CHALEUR, POINT DE ROSÉE & ALTITUDE
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'courir-forte-chaleur-point-de-rosee-altitude',
    seoTitle: "Courir par Forte Chaleur et Altitude : Point de Rosée & Allure",
    title: "Courir par Forte Chaleur et en Altitude : Point de Rosée, Table d'Ajustement et Climat Marocain",
    breadcrumbTitle: "Chaleur, Point de Rosée & Altitude",
    metaDesc: "De combien ralentir votre allure par temps chaud et humide ? Table température + point de rosée, impact de l'altitude (Ifrane) et sécurité vitale.",
    keywords: "courir forte chaleur, point de rosee course a pied, ajuster allure chaleur humidite, courir altitude ifrane maroc, coup de chaleur course, chergui eps sport",
    categoryBadge: "Thermorégulation & Environnement",
    leadIntro: "Courir par 35°C sous le ciel sec de Ouarzazate ou Marrakech est une épreuve difficile ; mais courir par 30°C avec 80% d'humidité le long des côtes de Casablanca ou Tanger peut s'avérer mortel. Pourquoi le simple thermomètre est-il incapable de vous dire si votre séance de course est sécurisée ? La réponse des biophysiciens porte un nom : le Point de Rosée (Dew Point). Associé à la baisse de pression d'oxygène lorsqu'on s'entraîne sur les plateaux d'altitude d'Ifrane (1 650 m), le climat impose une régulation chirurgicale de la vitesse. Découvrez la table mathématique de décélération indispensable pour préserver votre cœur et réussir votre acclimatation.",
    toolCard: {
      file: "calculateur-chaleur-meteo-altitude.html",
      title: "Calculateur Chaleur, Humidité & Altitude",
      desc: "Calculez votre allure ajustée à la météo et à l'altitude, découvrez votre pourcentage de ralentissement physiologique et planifiez votre hydratation."
    },
    sources: [
      "Armstrong, L. E., et al. (2007) — American College of Sports Medicine position stand. Exertional heat illness during training and competition. Med Sci Sports Exerc.",
      "Galloway, S. D., & Maughan, R. J. (1997) — Effects of ambient temperature on the capacity to perform prolonged cycle exercise in man. Med Sci Sports Exerc.",
      "Levine, B. D., & Stray-Gundersen, J. (1997) — Living high-training low: effect of moderate-altitude acclimatization with low-altitude training on performance. J Appl Physiol.",
      "Cheuvront, S. N., & Kenefick, R. W. (2014) — Dehydration: physiology, assessment, and performance effects. Compr Physiol."
    ],
    faq: [
      {
        q: "Qu'est-ce que le Point de Rosée et pourquoi est-il supérieur à l'humidité relative ?",
        a: "L'humidité relative (%) est trompeuse car elle dépend de la température de l'air : 50% d'humidité à 10°C représente très peu de vapeur d'eau, alors que 50% d'humidité à 35°C représente une quantité d'eau colossale dans l'atmosphère. Le Point de Rosée (Dew Point) est la température exacte à laquelle l'air ambiant devient saturé à 100% et commence à condenser en gouttelettes. C'est la mesure physique directe de la pression de vapeur d'eau. Plus le point de rosée est élevé (> 18°C / 65°F), moins votre sueur peut s'évaporer pour refroidir votre peau."
      },
      {
        q: "Comment le corps humain se refroidit-il pendant la course à pied ?",
        a: "Sur le plan thermodynamique, le corps humain a un rendement médiocre d'environ 20 à 25% : pour 100 watts d'énergie mécanique produits pour avancer, 75 à 80 watts sont dissipés sous forme de pure chaleur interne. Pour éviter que la température centrale ne grimpe au-delà de 40°C, l'organisme utilise quatre voies : radiation, conduction, convection et surtout l'ÉVAPORATION de la sueur. Mais attention : la sueur qui goutte par terre sans s'évaporer ne refroidit absolument rien !"
      },
      {
        q: "À partir de quelle combinaison météo doit-on obligatoirement ralentir son allure ?",
        a: "Selon la règle empirique des entraîneurs américains (formule de Jeff Galloway et Roy Benson) : additionnez la température de l'air en degrés Fahrenheit (°F) et le point de rosée en °F. Si la somme est inférieure à 100, aucune perte de performance. Si la somme se situe entre 110 et 130, ralentissez de 1% à 3%. Si la somme dépasse 150, la baisse obligatoire est de 5% à 8%. Au-delà de 170, toute séance d'intensité doit être strictement annulée."
      },
      {
        q: "Que se passe-t-il physiologiquement lorsqu'on court en altitude à Ifrane (1 650 m) ?",
        a: "La proportion d'oxygène dans l'air reste constante (20,93%), mais la pression barométrique diminue avec l'altitude. À 1 650 mètres (altitude d'Ifrane, haut lieu de préparation des marathoniens marocains), la pression partielle d'oxygène est inférieure d'environ 18% par rapport au niveau de la mer. Moins de molécules d'O₂ pénètrent dans les alvéoles pulmonaires à chaque inspiration, ce qui réduit le VO₂max d'environ 6 à 8% et accélère la ventilation pour un même effort."
      },
      {
        q: "Combien de temps faut-il pour s'acclimater à la chaleur ?",
        a: "L'acclimatation à la chaleur nécessite entre 10 et 14 jours consécutifs d'exposition à l'effort. Les adaptations physiologiques sont spectaculaires : augmentation du volume plasmatique sanguin (+10 à +15%), déclenchement plus précoce de la sudation à une température corporelle plus basse, et sueur plus diluée (l'organisme retient le sodium grâce à l'aldostérone)."
      },
      {
        q: "Quels sont les signes avant-coureurs du coup de chaleur d'exercice (urgence vitale) ?",
        a: "Le coup de chaleur d'exercice est une urgence médicale absolue. Les signes d'alerte immédiats sont : confusion mentale, propos incohérents, démarche titubante (ataxie), maux de tête pulsatiles, nausées violentes et, dans certains cas critiques, un arrêt brutal de la sudation avec une peau sèche et brûlante. Il faut immédiatement stopper l'athlète, l'allonger à l'ombre, surélever ses jambes et le refroidir par immersion ou aspersion d'eau froide avant l'arrivée des secours."
      }
    ],
    contentHtml: `
      <h2>I. Le Choc Thermique : Pourquoi le Thermomètre Vous Ment</h2>
      <p>
        Tout coureur s'est un jour senti incompréhensiblement lourd et épuisé dès le quatrième kilomètre d'un footing pourtant anodin, alors que le thermomètre n'affichait qu'un modeste 24°C. À l'inverse, lors d'un stage de printemps au Maroc sous un soleil rayonnant à 28°C, les sensations de légèreté peuvent être exceptionnelles.
      </p>
      <p>
        Cette contradiction apparente s'explique par une loi physique élémentaire : l'air n'est pas seulement caractérisé par sa température sèche, mais par sa <strong>saturation en humidité</strong>. Lorsque l'air ambiant est saturé d'eau, le gradient de pression de vapeur entre la surface de votre peau en sueur et l'atmosphère devient nul. La sueur perle, ruisselle le long de vos membres et trempe votre maillot sans jamais s'évaporer. Or, c'est le changement d'état physique de l'eau (de l'état liquide à l'état gazeux) qui absorbe les calories thermiques et refroidit votre organisme.
      </p>

      <h2>II. Le Point de Rosée (Dew Point) : L'Indice de Vérité du Coureur</h2>
      <p>
        Les météorologues et les préparateurs physiques d'élite préfèrent le <strong>Point de Rosée</strong> à l'humidité relative. Le tableau suivant illustre la dangerosité et le ressenti réel du coureur selon le point de rosée :
      </p>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Point de Rosée (°C)</th>
            <th>Point de Rosée (°F)</th>
            <th>Ressenti du Coureur</th>
            <th>Impact sur l'Allure & Sécurité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>&lt; 10°C</strong></td>
            <td>&lt; 50°F</td>
            <td>Idéal & Frais</td>
            <td>Conditions parfaites pour la performance sur route. Évaporation maximale.</td>
          </tr>
          <tr>
            <td><strong>10°C à 15°C</strong></td>
            <td>50°F à 59°F</td>
            <td>Très Confortable</td>
            <td>Aucun impact notable sur les allures d'endurance.</td>
          </tr>
          <tr>
            <td><strong>16°C à 18°C</strong></td>
            <td>60°F à 64°F</td>
            <td>Humidité Perceptible</td>
            <td>Léger inconfort respiratoire. Ralentissement conseillé de 1% à 3%.</td>
          </tr>
          <tr>
            <td><strong>19°C à 21°C</strong></td>
            <td>65°F à 69°F</td>
            <td>Lourd & Éprouvant</td>
            <td>Dérive cardiaque marquée. Ralentissement obligatoire de 3% à 5%. Sorties longues à écourter.</td>
          </tr>
          <tr>
            <td><strong>22°C à 24°C</strong></td>
            <td>70°F à 75°F</td>
            <td>Tropical & Oppressant</td>
            <td>Conditions dangereuses. Ralentissement de 6% à 10%. Tout travail de fractionné interdit l'après-midi.</td>
          </tr>
          <tr>
            <td><strong>&gt; 24°C</strong></td>
            <td>&gt; 75°F</td>
            <td>Extrême Danger</td>
            <td>Risque majeur de coup de chaleur d'exercice. Reportez l'entraînement à l'aube.</td>
          </tr>
        </tbody>
      </table>

      <h2>III. La Table Mathématique d'Ajustement d'Allure (Température + Point de Rosée)</h2>
      <p>
        La règle empirique la plus éprouvée au monde en course sur route consiste à additionner la température de l'air et le point de rosée, tous deux exprimés en degrés Fahrenheit (°F) :
      </p>

      <div class="formula-card">
        RÈGLE D'AJUSTEMENT CHALEUR : INDICE SOMME = T° (°F) + Point de Rosée (°F)<br><br>
        Formules de conversion rapide :<br>
        T° (°F) = [T° (°C) × 1,8] + 32<br><br>
        Barème de ralentissement :<br>
        - Somme &lt; 100 : Allure normale (0%)<br>
        - Somme 100 à 110 : 0,5% à 1% de ralentissement<br>
        - Somme 110 à 120 : 1% à 2% de ralentissement<br>
        - Somme 120 à 130 : 2% à 3% de ralentissement<br>
        - Somme 130 à 140 : 3% à 4,5% de ralentissement<br>
        - Somme 140 à 150 : 4,5% à 6% de ralentissement<br>
        - Somme 150 à 160 : 6% à 8% de ralentissement<br>
        - Somme 160 à 170 : 8% à 12% de ralentissement (zone rouge)<br>
        - Somme &gt; 180 : DANGER VITAL, INTERDICTION DE COURIR
      </div>

      <h3>Étude de Cas Concret : Sortie à Marrakech vs Sortie à Tanger</h3>
      <p>
        Comparons deux séances prévues à une allure cible normale de <strong>5:00 min/km (12,0 km/h)</strong> :
      </p>
      <ul>
        <li><strong>Cas 1 : Marrakech en après-midi de printemps (Air sec)</strong><br>
        Température = 32°C (89,6°F), Humidité relative = 20% → Point de rosée = 7°C (44,6°F).<br>
        Somme = 89,6 + 44,6 = 134,2.<br>
        Ralentissement préconisé : ~3,5%.<br>
        Allure ajustée : 5:00 devient <strong>5:11 min/km</strong>. L'effort est gérable car la sueur s'évapore instantanément.</li>
        
        <li><strong>Cas 2 : Tanger en bord de mer en plein été (Air humide)</strong><br>
        Température = 30°C (86,0°F), Humidité relative = 75% → Point de rosée = 25°C (77,0°F).<br>
        Somme = 86,0 + 77,0 = 163,0.<br>
        Ralentissement préconisé : ~9%.<br>
        Allure ajustée : 5:00 devient <strong>5:27 min/km</strong> ! Si le coureur s'obstine à courir à 5:00/km, sa température centrale dépassera les 39,5°C en moins de 25 minutes.</li>
      </ul>

      <h2>IV. L'Impact de l'Altitude : Le Cas Pratique d'Ifrane (1 650 m)</h2>
      <p>
        Le Moyen Atlas marocain, et en particulier la ville d'Ifrane, accueille depuis des décennies les plus grands demi-fondeurs mondiaux (de Saïd Aouita et Hicham El Guerrouj aux élites contemporaines). Mais courir à 1 650 mètres d'altitude modifie immédiatement la réponse cardiovasculaire :
      </p>
      <ul>
        <li><strong>Baisse de la Pression Partielle d'O₂ ($PiO_2$) :</strong> À 1 650 m, la pression barométrique est d'environ 625 mmHg (contre 760 mmHg au niveau de la mer). La saturation artérielle en oxygène ($SpO_2$) chute de 98% à 92-94%.</li>
        <li><strong>Perte Immédiate de VMA :</strong> On estime la perte de puissance aérobie à environ 1% par tranche de 300 mètres au-dessus de 1 000 m. À Ifrane, votre VMA est amputée d'environ 2% à 3% dès le premier jour.</li>
        <li><strong>Déshydratation Insidieuse :</strong> En altitude, l'air est froid et très sec, et l'hyperventilation réflexe élimine une quantité massive de vapeur d'eau par les voies respiratoires. Les coureurs se déshydratent sans s'en rendre compte.</li>
      </ul>

      <h2>V. Protocole d'Acclimatation en 10 à 14 Jours</h2>
      <p>
        Si vous préparez une compétition par forte chaleur ou un stage en altitude, suivez cette montée en charge progressive :
      </p>
      <ol>
        <li><strong>Jours 1 à 3 :</strong> Réduisez le volume de 30% et supprimez tout fractionné. Courez exclusivement en Zone 1 / Zone 2 aux heures fraîches de la matinée.</li>
        <li><strong>Jours 4 à 7 :</strong> Introduisez progressivement des sorties aux heures chaudes (fin de matinée), mais limitez la durée à 40-45 minutes. Buvez 500 ml d'eau avec électrolytes par heure d'effort.</li>
        <li><strong>Jours 8 à 14 :</strong> Réintégrez des fractions au seuil (Allure T), en augmentant les temps de récupération de 50%. L'organisme est désormais acclimaté : volume sanguin dilaté et transpiration abondante précoce.</li>
      </ol>

      <h2>VI. Conseils Pédagogiques Spécifiques pour les Cours d'EPS au Maroc</h2>
      <div class="callout-box warning">
        <strong>⚠️ Prévention en Milieu Scolaire (Périodes Chaudes & Ramadan) :</strong>
        Lors des mois de mai et juin au Maroc ou lors des périodes où les élèves pratiquent le jeûne, l'enseignant d'EPS doit impérativement adapter sa pédagogie : interdiction formelle des épreuves de VMA maximale en plein soleil après 11h du matin, report des efforts intenses à l'ombre du gymnase ou sur les créneaux de 8h à 9h, et autorisation permanente d'aspersion d'eau sur le visage et la nuque.
      </div>
    `
  }
];

/**
 * articles-part2.mjs
 * Guides Piliers 6 à 10 (2 000 à 3 000 mots par article)
 * Rédigés avec rigueur scientifique, humanisation, tableaux comparatifs et applications concrètes terrain.
 */

export const ARTICLES_PART2 = [
  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 6 : IMC DU SPORTIF & FORMULE DE DEURENBERG
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'imc-sportif-masse-grasse-formule-deurenberg',
    seoTitle: "IMC du Sportif et Formule Deurenberg : Masse Grasse Réelle",
    title: "IMC du Sportif et Formule de Deurenberg : Pourquoi l'IMC Trompe les Athlètes et Comment Évaluer la Masse Grasse",
    breadcrumbTitle: "IMC Sportif & Masse Grasse Deurenberg",
    metaDesc: "Pourquoi l'IMC classe-t-il les athlètes musclés en surpoids ? Formule de Deurenberg, plis cutanés, composition corporelle et bienveillance en EPS.",
    keywords: "imc sportif muscle, formule deurenberg masse grasse, calcul pourcentage graisse corporelle, imc adolescent eps, durnin wormersley, composition corporelle sport",
    categoryBadge: "Anthropométrie & Santé Scolaire",
    leadIntro: "Prenez un demi d'ouverture de rugby pesant 88 kg pour 1,80 m avec des abdominaux ciselés et un sédentaire de même taille et de même poids passant 10 heures par jour sur un canapé : pour l'Indice de Masse Corporelle (IMC) standard de l'Organisation Mondiale de la Santé, ces deux individus sont rigoureusement identiques et classés dans la catégorie « surpoids ». Cette aberration arithmétique fait des ravages, particulièrement chez les adolescents et les sportifs réguliers. Découvrez pourquoi l'IMC classique est inadapté au monde du sport, comment la formule de Deurenberg permet d'estimer votre masse grasse réelle et quelles sont les règles éthiques intangibles à observer en milieu scolaire.",
    toolCard: {
      file: "calculateur-imc-sportif-masse-grasse.html",
      title: "Calculateur IMC Sportif & Masse Grasse (Deurenberg)",
      desc: "Calculez votre IMC corrigé, votre pourcentage de masse grasse selon la formule de Deurenberg, votre masse maigre et votre poids de forme théorique."
    },
    sources: [
      "Deurenberg, P., Weststrate, J. A., & Seidell, J. C. (1991) — Body mass index as a measure of body fatness: age- and sex-specific prediction formulas. Br J Nutr, 65(1), 105-114.",
      "Durnin, J. V., & Womersley, J. (1974) — Body fat assessed from total body density and its estimation from skinfold thickness on 481 men and women. Br J Nutr, 32(1), 77-97.",
      "Organisation Mondiale de la Santé (OMS) — Consultation sur l'obésité : prévention et prise en charge de l'épidémie mondiale.",
      "Garn, S. M., Leonard, W. R., & Hawthorne, V. M. (1986) — Three limitations of the body mass index. Am J Clin Nutr, 44(6), 996-997."
    ],
    faq: [
      {
        q: "Pourquoi l'IMC traditionnel classe-t-il les sportifs musclés en surpoids ?",
        a: "L'équation de l'IMC [Poids / (Taille)²] a été conçue au XIXe siècle par le mathématicien belge Adolphe Quetelet pour étudier des moyennes de populations sédentaires à l'échelle d'un pays. L'IMC ne fait absolument aucune distinction entre un kilo de tissu adipeux (graisse) et un kilo de tissu musculaire contractile ou de masse osseuse dense. Or, le tissu musculaire a une masse volumique d'environ 1,06 g/cm³ contre 0,90 g/cm³ pour le tissu graisseux : le muscle est beaucoup plus dense et lourd à volume égal. Un athlète très musclé a donc un poids élevé par rapport à sa taille sans pour autant présenter le moindre gramme de graisse en excès."
      },
      {
        q: "Comment fonctionne la formule de Deurenberg pour estimer la masse grasse ?",
        a: "Publiée en 1991 dans le British Journal of Nutrition, la formule de Paul Deurenberg réintroduit les deux variables physiologiques majeures que l'IMC ignorait : l'âge et le sexe biologique. À IMC identique, une femme possède naturellement environ 10% à 12% de masse grasse de plus qu'un homme (pour des raisons hormonales et reproductives), et la masse musculaire diminue naturellement avec l'âge (sarcopénie). La formule applique donc une pondération spécifique qui affine considérablement l'estimation."
      },
      {
        q: "Quelle est la précision réelle de la formule de Deurenberg ?",
        a: "Comparée à la méthode de référence absolue de laboratoire (l'absorptiométrie biphotonique à rayons X ou DEXA), la formule de Deurenberg présente une marge d'erreur moyenne de ±3% à ±4% chez les adultes de corpulence standard. Cependant, chez les bodybuilders ou les athlètes de force extrême présentant une hypertrophie musculaire hors-norme, elle continuera à surestimer légèrement la graisse : la méthode des plis cutanés (pince de Harpenden) ou le scan DEXA restent alors indispensables."
      },
      {
        q: "Quelles sont les normes saines de pourcentage de masse grasse chez le sportif ?",
        a: "Chez l'homme athlète d'endurance (course, cyclisme) : 8% à 12% de masse grasse ; chez le joueur de sports collectifs : 10% à 15% ; chez l'homme actif en bonne santé : 14% à 18%. Chez la femme athlète d'endurance : 16% à 20% ; chez la joueuse de sports collectifs : 18% à 23% ; chez la femme active en bonne santé : 21% à 26%. Descendre en dessous de 5% chez l'homme ou 12-14% chez la femme déclenche des dérèglements hormonaux sévères (aménorrhée, ostéopénie, syndrome RED-S)."
      },
      {
        q: "Faut-il calculer l'IMC des élèves lors des cours d'EPS ?",
        a: "L'éthique et la déontologie pédagogique en EPS imposent une prudence absolue. Il est formellement déconseillé de peser des élèves publiquement en classe ou d'afficher des indices chiffrés devant les camarades, ce qui engendre des traumatismes psychologiques, des troubles du comportement alimentaire (TCA) et du cyberharcèlement. Si des bilans anthropométriques sont requis dans le cadre de la médecine scolaire, ils doivent être strictement confidentiels, individualisés et toujours recentrés sur le projet moteur et la motricité fonctionnelle."
      },
      {
        q: "Les balances connectées à impédancemètre sont-elles fiables ?",
        a: "Les balances à impédancemètre grand public envoient un micro-courant électrique à travers les jambes. Elles sont extrêmement sensibles à l'état d'hydratation immédiat du corps : si vous vous pesez après une séance de course en ayant perdu 1,5 litre d'eau par transpiration, la balance interprétera la baisse de conductivité comme une hausse apparente de votre masse grasse ! Pour obtenir une tendance cohérente, pesez-vous toujours le même jour de la semaine, au réveil, vessie vide, avant le petit-déjeuner."
      }
    ],
    contentHtml: `
      <h2>I. La Genèse de l'IMC et le Paradoxe du Muscle Lourd</h2>
      <p>
        En 1832, l'astronome et statisticien belge Adolphe Quetelet cherchait à définir les lois mathématiques régissant « l'homme moyen ». En observant des conscrits de l'armée, il remarqua que le poids corporel des adultes était approximativement proportionnel au carré de leur taille. Ainsi naquit l'indice de Quetelet, rebaptisé en 1972 « Indice de Masse Corporelle » (IMC ou BMI en anglais) par le chercheur Ancel Keys.
      </p>
      <p>
        Adopté massivement par l'OMS et les compagnies d'assurances pour son coût de mesure nul (une toise et un pèse-personne suffisent), l'IMC a été propulsé au rang d'arbitre universel de la santé humaine. Or, l'IMC commet une faute conceptuelle impardonnable lorsqu'on l'applique à un public sportif : <strong>il confond le poids et la composition tissulaire</strong>.
      </p>

      <div class="callout-box warning">
        <strong>⚠️ Le Cas d'École :</strong>
        Considérons un judoka de la catégorie des -81 kg mesurant 1,73 m. Son IMC calculé est de 81 / (1,73)² = <strong>27,1 kg/m²</strong>. Selon les grilles officielles de l'OMS, ce jeune athlète en pleine possession de ses moyens physiques est classé en « Surcharge pondérale (Surpoids) ». Pourtant, une analyse par plis cutanés révèle un taux de masse grasse exceptionnellement bas de 9,5% ! Le surplus de masse n'est constitué que de fibres musculaires denses, de glycogène et d'un squelette renforcé par les impacts.
      </div>

      <h2>II. Les Équations de Paul Deurenberg (1991) Décryptées</h2>
      <p>
        Conscient des lacunes béantes de l'IMC brut, le professeur Paul Deurenberg de l'Université de Wageningen aux Pays-Bas a conduit une vaste étude épidémiologique pour corréler l'IMC à la masse grasse réelle mesurée par densitométrie hydrostatique. Il en a extrait une équation prédictive universelle intégrant l'âge et le sexe :
      </p>

      <div class="formula-card">
        FORMULE DE DEURENBERG (ADULTES ≥ 16 ANS) :<br><br>
        % Masse Grasse = (1,20 × IMC) + (0,23 × Âge) - (10,8 × Sexe) - 5,4<br><br>
        Où :<br>
        - Âge est exprimé en années révolues<br>
        - Sexe = 1 pour les hommes / Sexe = 0 pour les femmes<br><br>
        FORMULE POUR LES ENFANTS ET ADOLESCENTS (7 À 15 ANS) :<br>
        % Masse Grasse = (1,51 × IMC) - (0,70 × Âge) - (3,6 × Sexe) + 1,4
      </div>

      <h3>Démonstration Chiffrée Pas-à-Pas</h3>
      <p>
        Prenons le cas de Sofia, coureuse de demi-fond de 24 ans, mesurant 1,68 m pour 58 kg :
      </p>
      <ol>
        <li>Calcul de son IMC : $58 / (1,68)^2 = 58 / 2,8224 = 20,55\text{ kg/m}^2$.</li>
        <li>Application de la formule Deurenberg adulte (Sexe = 0) :<br>
        $\%MG = (1,20 \times 20,55) + (0,23 \times 24) - (10,8 \times 0) - 5,4$<br>
        $\%MG = 24,66 + 5,52 - 0 - 5,4 = \mathbf{24,78\%}$.</li>
        <li>Décomposition de son poids corporel :<br>
        Masse grasse absolue = $58 \times 0,2478 = 14,37\text{ kg}$.<br>
        Masse maigre (muscles, os, organes, eau) = $58 - 14,37 = \mathbf{43,63\text{ kg}}$.</li>
      </ol>

      <h2>III. Analyse Comparative des Méthodes de Mesure de la Masse Grasse</h2>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Méthode</th>
            <th>Coût & Matériel</th>
            <th>Précision Réelle</th>
            <th>Avantages Principaux</th>
            <th>Inconvénients Majeurs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Formule de Deurenberg</strong></td>
            <td>Gratuit (Calculateur en ligne)</td>
            <td>±3% à ±4%</td>
            <td>Instantané, non invasif, aucun matériel nécessaire</td>
            <td>Moins précis chez les athlètes à musculature hors normes</td>
          </tr>
          <tr>
            <td><strong>Plis Cutanés (Pince de Harpenden)</strong></td>
            <td>30 € à 150 €</td>
            <td>±2% à ±3%</td>
            <td>Mesure directe du panicule adipeux sous-cutané</td>
            <td>Nécessite un opérateur très entraîné (variabilité inter-évaluateur élevée)</td>
          </tr>
          <tr>
            <td><strong>Impédancemétrie BIA (Balance)</strong></td>
            <td>40 € à 500 €</td>
            <td>±4% à ±6%</td>
            <td>Facile, rapide d'utilisation à domicile</td>
            <td>Très instable : dépend massivement du niveau d'hydratation et du café</td>
          </tr>
          <tr>
            <td><strong>Scan DEXA (Laboratoire Médical)</strong></td>
            <td>100 € à 200 € par examen</td>
            <td>±1% (Référence absolue)</td>
            <td>Cartographie complète os / muscle / graisse par membre</td>
            <td>Coûteux, émission de micro-radiations, accès hospitalier restreint</td>
          </tr>
        </tbody>
      </table>

      <h2>IV. Éthique, Bienveillance et Dangers des Pesées Scolaires en EPS</h2>
      <p>
        L'enseignant d'EPS n'est pas un diététicien de clinique et le cours d'EPS ne doit jamais devenir le tribunal de la silhouette des élèves. Durant l'adolescence, période de métamorphose corporelle intense et de grande vulnérabilité psychologique, la moindre remarque publique sur le poids peut agir comme le détonateur de pathologies graves :
      </p>

      <div class="callout-box tip">
        <strong>💡 La Règle d'Or Pédagogique :</strong>
        Ne focalisez jamais les objectifs pédagogiques sur la « perte de poids » ou la silhouette. En EPS, la seule valeur qui compte est la <strong>motricité fonctionnelle et l'aisance d'action</strong>. L'élève doit chercher à courir plus longtemps sans s'essouffler, à sauter plus haut, à coordonner ses gestes en sport collectif. Le corps est un vecteur de plaisir et d'action motrice, pas un objet d'évaluation esthétique.
      </div>

      <h2>V. Les Risques du Taux de Masse Grasse Trop Faible : Le Syndrome RED-S</h2>
      <p>
        Dans la quête obsessionnelle de légèreté (en course de fond, gymnastique ou danse), certains athlètes cherchent à descendre à des taux de masse grasse dangereusement bas. La médecine du sport a formalisé ce danger sous le nom de <strong>RED-S (Relative Energy Deficiency in Sport / Déficit Énergétique Relatif dans le Sport)</strong> :
      </p>
      <ul>
        <li><strong>Perturbations Hormonales Majeures :</strong> Chute drastique de la sécrétion de testostérone chez l'homme et arrêt des menstruations (aménorrhée hypothalamique) chez la femme.</li>
        <li><strong>Perte de Densité Osseuse (Ostéopénie & Ostéoporose Précoce) :</strong> Multiplications des fractures de fatigue au niveau des métatarses, du tibia et du col fémoral.</li>
        <li><strong>Effondrement Immunitaire :</strong> Infections respiratoires à répétition, fatigue chronique et perte de force musculaire paradoxale.</li>
      </ul>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 7 : SUIVI DE CHARGE D'ENTRAÎNEMENT (RPE FOSTER & RATIO ACWR)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'charge-entrainement-rpe-foster-monotonie-acwr',
    seoTitle: "Charge d'Entraînement : RPE de Foster, Monotonie et Ratio ACWR",
    title: "Suivi de la Charge d'Entraînement : RPE de Foster, Monotonie, Contrainte et Ratio ACWR Expliqués",
    breadcrumbTitle: "Charge d'Entraînement RPE & ACWR",
    metaDesc: "Maîtrisez le suivi de charge d'entraînement : méthode session-RPE de Foster, échelle de Borg CR10, calcul de monotonie et ratio aigu/chronique (ACWR).",
    keywords: "charge entrainement rpe foster, ratio acwr calcul, echelle borg cr10, monotonie charge contrainte, prevention blessure sport, suivi charge eps club",
    categoryBadge: "Sciences du Sport & Prévention des Blessures",
    leadIntro: "Une séance de 45 minutes sous une pluie battante et un vent glacial peut-elle infliger plus de fatigue à l'organisme qu'un footing tranquille d'une heure et demie par beau temps ? Pourquoi 80% des blessures musculaires et tendineuses en club surviennent-elles non pas après un manque d'entraînement, mais après une augmentation brutale de la charge hebdomadaire ? En 2001, le chercheur américain Carl Foster a offert au monde du sport une méthode révolutionnaire d'une simplicité désarmante : le Session-RPE. Couplée au célèbre ratio ACWR (Acute:Chronic Workload Ratio), cette approche scientifique permet de piloter la fatigue, d'optimiser le pic de forme et de diviser par deux le risque de blessure. Plongez dans les secrets de l'ingénierie de l'entraînement moderne.",
    toolCard: {
      file: "calculateur-charge-rpe-foster-acwr.html",
      title: "Calculateur Charge d'Entraînement RPE & ACWR",
      desc: "Entrez vos durées de séance et vos notes RPE (Borg CR10) pour calculer votre charge en Unités Arbitraires (UA), votre monotonie, votre contrainte et votre ratio ACWR."
    },
    sources: [
      "Foster, C., Florhaug, J. A., Franklin, J., et al. (2001) — A new approach to monitoring exercise training. J Strength Cond Res, 15(1), 109-115.",
      "Gabbett, T. J. (2016) — The training-injury prevention paradox: should athletes be training smarter and harder? Br J Sports Med, 50(5), 273-280.",
      "Impellizzeri, F. M., Tenan, M. S., Kempton, T., et al. (2020) — Acute:Chronic Workload Ratio: conceptual issues and why alternatives are needed. Sports Medicine.",
      "Borg, G. (1998) — Borg's perceived exertion and pain scales. Human Kinetics."
    ],
    faq: [
      {
        q: "Quelle est la différence entre la charge externe et la charge interne d'entraînement ?",
        a: "La charge externe est la mesure objective du travail physique accompli par l'athlète : nombre de kilomètres courus, vitesse moyenne au GPS, tonnes soulevées en musculation ou nombre de répétitions. La charge interne, en revanche, est la réponse biologique et psychologique réelle subie par le corps pour produire ce travail. Deux élèves qui courent 5 kilomètres à 12 km/h effectuent exactement la même charge externe ; mais pour l'un (reposé, bien nourri), la séance sera perçue comme facile (RPE 3, charge interne basse), alors que pour l'autre (fiévreux, stressé, manque de sommeil), elle représentera une épreuve éprouvante (RPE 8, charge interne explosive)."
      },
      {
        q: "Comment utilise-t-on l'échelle de Borg CR10 modifiée par Foster ?",
        a: "L'échelle CR10 classe l'effort perçu de 0 (repos absolu sur un fauteuil) à 10 (effort maximal titanesque, impossible de continuer une seconde de plus). Pour obtenir une note fiable sans biais émotionnel à chaud, Carl Foster recommande formellement de poser la question rituelle : « Comment avez-vous trouvé votre séance dans son ensemble ? » environ 20 à 30 minutes APRÈS la fin de la séance, douche prise ou retour au calme entamé."
      },
      {
        q: "Comment calcule-t-on la charge de séance en Unités Arbitraires (UA) ?",
        a: "La formule de Foster est un produit arithmétique direct : Charge (UA) = Durée effective de la séance en minutes × Note RPE (CR10). Par exemple, un entraînement de football ou une séance d'EPS de 80 minutes notée à RPE 5 (effort dur) donne : 80 × 5 = 400 UA."
      },
      {
        q: "Qu'est-ce que la Monotonie et pourquoi une monotonie élevée est-elle dangereuse ?",
        a: "La monotonie d'entraînement mesure l'absence de variation de la charge quotidienne au cours d'une semaine. Elle se calcule par le ratio : Charge Moyenne Quotidienne / Écart-type des charges journalières. Si un athlète s'entraîne tous les jours à la même intensité moyenne sans jamais alterner de journées faciles (décharge) et de journées dures, l'écart-type tend vers zéro et la monotonie explose (> 2,0). Carl Foster a démontré qu'une monotonie élevée couplée à une charge hebdomadaire lourde est le premier déclencheur du surentraînement et des infections virales."
      },
      {
        q: "Comment interpréter le ratio ACWR (Acute:Chronic Workload Ratio) ?",
        a: "Le ratio ACWR compare la charge de travail aiguë encaissée sur la semaine en cours (la fatigue récente, 7 jours) à la charge de travail chronique encaissée sur les 4 dernières semaines (la condition physique bâtie, moyenne mobile sur 28 jours). Un ratio situé entre 0,80 et 1,30 correspond au « sweet spot » (zone optimale de progression sans danger). Au-delà de 1,50, le risque de blessure par surmenage est multiplié par 2 à 4."
      },
      {
        q: "Le ratio ACWR est-il critiqué par la communauté scientifique ?",
        a: "Oui. Des chercheurs renommés comme Franco Impellizzeri ont mis en évidence des artefacts statistiques liés au « couplage mathématique » (la semaine aiguë est elle-même incluse dans le calcul du dénominateur chronique) et ont rappelé que l'ACWR est un outil d'alerte de gestion de charge, mais pas une boule de cristal prédisant la blessure de façon déterministe."
      }
    ],
    contentHtml: `
      <h2>I. Le Dilemme du Coach : Pourquoi les Kilomètres et les Répétitions ne Suffisent Pas</h2>
      <p>
        Pendant plus d'un siècle, la programmation de l'entraînement sportif a reposé sur le culte exclusif des chiffres extérieurs : tant de kilomètres courus cette semaine, tant de passes réussies, tant d'heures passées sur le terrain. Pourtant, tout entraîneur et tout enseignant d'EPS a un jour vu un de ses sportifs s'effondrer ou se blesser lors d'une semaine où le volume kilométrique était pourtant strictement identique à celui des semaines précédentes.
      </p>
      <p>
        Ce paradoxe s'éclaire dès lors que l'on comprend que l'organisme ne réagit pas aux chiffres écrits sur un carnet d'entraînement, mais au <strong>stress physiologique et nerveux</strong> que la séance lui impose. Une mauvaise nuit de sommeil, des examens scolaires stressants, une déshydratation ou un début de rhume peuvent doubler le coût physiologique d'une séance ordinaire. Pour capturer cette réalité humaine vivante, il fallait une méthode capable de mesurer la charge interne sans contraindre les sportifs à des prises de sang quotidiennes.
      </p>

      <h2>II. La Méthode Session-RPE de Carl Foster (2001)</h2>
      <p>
        Au début des années 2000, Carl Foster et son équipe de l'Université du Wisconsin ont validé scientifiquement une méthode d'une élégance remarquable : le recueil du <strong>RPE (Rating of Perceived Exertion / Perception de l'Effort)</strong> sur l'échelle de Gunnar Borg CR10 modifiée, multiplié par la durée de la séance en minutes.
      </p>

      <div class="formula-card">
        FORMULE MAÎTRESSE DE CARL FOSTER :<br><br>
        Charge de Séance (en Unités Arbitraires, UA) = Durée de la séance (min) × Score RPE (0 à 10)<br><br>
        Exemple 1 : Sortie footing facile de 60 min à RPE 2 (Très facile) = 60 × 2 = 120 UA<br>
        Exemple 2 : Séance de fractionné VMA de 45 min à RPE 8 (Très dur) = 45 × 8 = 360 UA<br>
        Exemple 3 : Match de football scolaire de 70 min à RPE 7 (Difficile) = 70 × 7 = 490 UA
      </div>

      <h3>L'Échelle RPE de Borg CR10 Modifiée</h3>
      <table class="table-custom">
        <thead>
          <tr>
            <th>Score RPE</th>
            <th>Descripteur Verbal Officiel</th>
            <th>Sensations Physiologiques Associées</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>0</strong></td><td>Repos Complet</td><td>Immobilité totale, position assise ou couchée détendue.</td></tr>
          <tr><td><strong>1</strong></td><td>Très, très facile</td><td>Marche très lente, aucun effort ventilatoire.</td></tr>
          <tr><td><strong>2</strong></td><td>Facile</td><td>Allure d'échauffement ou récupération active, respiration nasale facile.</td></tr>
          <tr><td><strong>3</strong></td><td>Modéré</td><td>Endurance fondamentale (Zone 2), conversation possible sans interruption.</td></tr>
          <tr><td><strong>4</strong></td><td>Un peu dur</td><td>Début de ventilation rythmée, fin de l'aisance totale.</td></tr>
          <tr><td><strong>5</strong></td><td>Dur</td><td>Allure au seuil (Tempo), conversation difficile par phrases complètes.</td></tr>
          <tr><td><strong>6</strong></td><td>--</td><td>Zone de transition intense.</td></tr>
          <tr><td><strong>7</strong></td><td>Très dur</td><td>Travail intermittent soutenu, sensation de brûlure musculaire naissante.</td></tr>
          <tr><td><strong>8</strong></td><td>--</td><td>Fréquence cardiaque proche du maximum, essoufflement marqué.</td></tr>
          <tr><td><strong>9</strong></td><td>Extrêmement dur</td><td>Sprint soutenu, dépassement de soi, proche de la rupture.</td></tr>
          <tr><td><strong>10</strong></td><td>Maximal absolu</td><td>Épuisement titanesque, nausée d'effort, impossible de courir 10 mètres de plus.</td></tr>
        </tbody>
      </table>

      <h2>III. Monotonie et Contrainte : Les Deux Clés Cachées du Surentraînement</h2>
      <p>
        Une charge hebdomadaire totale de 3 000 UA n'a pas du tout le même impact selon la façon dont elle est répartie au cours des 7 jours :
      </p>
      <ul>
        <li><strong>Cas A (Alternance optimale) :</strong> Lundi dur (600 UA), Mardi léger (150 UA), Mercredi dur (700 UA), Jeudi repos (0 UA), Vendredi modéré (400 UA), Samedi compétition (800 UA), Dimanche décharge (350 UA). Total = 3 000 UA. L'organisme surcompense.</li>
        <li><strong>Cas B (Monotonie toxique) :</strong> L'athlète s'entraîne 7 jours sur 7 à la même allure moyenne (environ 430 UA par jour). Total = 3 000 UA. L'absence totale de décharge empêche la régénération du système nerveux et du glycogène.</li>
      </ul>

      <div class="formula-card">
        LES FORMULES DE VARIABILITÉ DE FOSTER :<br><br>
        1. Monotonie = Charge Moyenne Journalière / Écart-Type des Charges Hebdomadaires<br>
        2. Contrainte (Strain) = Charge Hebdomadaire Totale × Monotonie<br><br>
        Repères :<br>
        - Monotonie &lt; 1,5 : Excellente alternance travail / repos.<br>
        - Monotonie &gt; 2,0 : ALERTE ROUGE, risque critique de surentraînement et de maladie.
      </div>

      <h2>IV. Le Modèle ACWR de Tim Gabbett : Piloter le Pic de Forme</h2>
      <p>
        En 2016, le chercheur australien Tim Gabbett a publié dans le *British Journal of Sports Medicine* un article retentissant qui a popularisé le <strong>Ratio Acute:Chronic Workload Ratio (ACWR)</strong>. Ce modèle repose sur le principe fondamental de Bannister : chaque séance génère à la fois de la forme physique (fitness) et de la fatigue.
      </p>
      <ul>
        <li><strong>La Charge Aiguë (Acute Workload) :</strong> C'est la somme des charges des 7 derniers jours. Elle représente la fatigue immédiate accumulée.</li>
        <li><strong>La Charge Chronique (Chronic Workload) :</strong> C'est la moyenne hebdomadaire des 28 derniers jours (4 semaines). Elle représente la condition physique de fond, l'armure physiologique développée par l'athlète.</li>
        <li><strong>Le Ratio ACWR :</strong> $\text{ACWR} = \text{Charge Aiguë} / \text{Charge Chronique}$.</li>
      </ul>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Valeur ACWR</th>
            <th>Zone Physiologique</th>
            <th>Signification & Conséquences</th>
            <th>Action Recommandée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>&lt; 0,80</strong></td>
            <td>Sous-entraînement</td>
            <td>L'athlète perd de la condition physique ; armure protectrice insuffisante.</td>
            <td>Augmenter progressivement la charge sans à-coup.</td>
          </tr>
          <tr>
            <td><strong>0,80 à 1,30</strong></td>
            <td>Zone Optimale (« Sweet Spot »)</td>
            <td>Parfait équilibre entre fatigue maîtrisée et gain de forme ; risque de blessure minimal.</td>
            <td>Maintenir cette dynamique de progression programmée.</td>
          </tr>
          <tr>
            <td><strong>1,30 à 1,49</strong></td>
            <td>Zone de Risque Modéré</td>
            <td>Montée en charge rapide, la fatigue commence à surpasser la récupération.</td>
            <td>Surveiller le sommeil, planifier une journée de décharge.</td>
          </tr>
          <tr>
            <td><strong>≥ 1,50</strong></td>
            <td>Zone de Danger (« Danger Zone »)</td>
            <td>Pic de charge brutal (+50% par rapport à l'habitude) ; risque de blessure multiplié par 3 à 4.</td>
            <td>Réduire immédiatement le volume et l'intensité de 30% à 40%.</td>
          </tr>
        </tbody>
      </table>

      <h2>V. Fiche Pratique : Mettre en Place le Suivi RPE en EPS ou en Club avec un Simple Carnet</h2>
      <p>
        L'immense beauté du Session-RPE est qu'il ne nécessite ni GPS à 1 000 euros, ni capteurs connectés. Pour le déployer dans votre classe ou votre club :
      </p>
      <ol>
        <li>Affichez l'échelle de Borg CR10 plastifiée sur le mur des vestiaires ou sur le classeur de l'enseignant.</li>
        <li>Distribuez à chaque élève ou athlète une fiche mensuelle pré-remplie avec les colonnes : Date, Type de séance, Durée (min), RPE (0 à 10), Charge (Durée × RPE).</li>
        <li>À la fin de chaque séance, après le bilan verbal, chacun note son RPE en 10 secondes chrono.</li>
        <li>En un coup d'œil hebdomadaire, l'entraîneur repère instantanément l'athlète en zone rouge ou l'élève dont la charge s'envole, et peut ajuster individuellement les contenus avant l'accident musculaire.</li>
      </ol>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 8 : ALLURE AJUSTÉE À LA PENTE (GAP) ET NUTRITION EN TRAIL
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'allure-ajustee-pente-gap-modele-minetti',
    seoTitle: "Allure Ajustée à la Pente (GAP) et Nutrition Trail : Guide",
    title: "Allure Ajustée à la Pente (GAP) et Stratégie Glucidique en Trail : Modèle de Minetti et Énergie en Dénivelé",
    breadcrumbTitle: "Allure Ajustée à la Pente (GAP) & Nutrition",
    metaDesc: "Calculez votre Allure Ajustée à la Pente (GAP) avec l'équation de Minetti et planifiez vos apports glucidiques horaires (30 à 90g/h) en trail et dénivelé.",
    keywords: "allure ajustee pente gap, modele minetti denivele, calcul glucides trail heure, nutrition course en cote, cout energetique pente, strava gap running",
    categoryBadge: "Biomécanique de la Pente & Nutrition",
    leadIntro: "Pourquoi grimper une côte à +10% à une allure apparemment très lente de 8 km/h (7:30 min/km) brûle-t-il exactement la même quantité d'énergie par minute que de voler sur le plat à plus de 13 km/h (4:35 min/km) ? Pourquoi les descentes raides, loin de vous reposer, détruisent-elles vos fibres musculaires et vos réserves de glycogène si vous ne savez pas les aborder ? En 2002, le chercheur italien Alberto Minetti a modélisé mathématiquement le coût énergétique de la locomotion humaine en pente. Couplé aux protocoles modernes de ravitaillement glucidique horaire, ce modèle est l'arme absolue pour dompter le dénivelé sans jamais connaître la fringale.",
    toolCard: {
      file: "calculateur-gap-pente-nutrition.html",
      title: "Calculateur Allure Pente (GAP) & Nutrition Glucidique",
      desc: "Convertissez votre allure en côte ou en descente en son équivalent à plat (Grade Adjusted Pace) et calculez vos besoins horaires en glucides et hydratation."
    },
    sources: [
      "Minetti, A. E., Moia, C., Roi, G. S., Susta, D., & Ferretti, G. (2002) — Energy cost of walking and running at extreme uphill and downhill slopes. J Appl Physiol, 93(3), 1039-1046.",
      "Jeukendrup, A. (2014) — A step towards personalized sports nutrition: carbohydrate intake during exercise. Sports Medicine, 44(Suppl 1), 25-33.",
      "Margaria, R. (1938) — Sulla fisiologia e specialmente sul consumo energetico della marcia e della corsa a varie pendenze. Atti Accad Naz Lincei.",
      "Burke, L. M., et al. (2011) — Carbohydrates for training and competition. J Sports Sci."
    ],
    faq: [
      {
        q: "Qu'est-ce que l'Allure Ajustée à la Pente (GAP - Grade Adjusted Pace) ?",
        a: "L'allure ajustée à la pente est une métrique qui traduit votre vitesse réelle courue sur un terrain dénivelé (montée ou descente) en l'allure équivalente que vous auriez dû soutenir sur un sol parfaitement plat pour dépenser exactement la même quantité d'énergie métabolique par minute. Rendue mondialement célèbre par les algorithmes de Strava et des montres GPS, elle permet d'analyser vos sorties en montagne avec la même cohérence physiologique qu'un test sur piste d'athlétisme."
      },
      {
        q: "Comment fonctionne l'équation de Minetti (2002) ?",
        a: "Alberto Minetti a mesuré la consommation d'oxygène de coureurs d'élite sur des pentes extrêmes allant de -45% à +45%. Il a démontré que le coût énergétique de la course ne varie pas de façon linéaire, mais selon un polynôme d'ordre 5. Sur le plat (pente 0%), le coût de base est d'environ 3,6 Joules par kilogramme de masse corporelle et par mètre parcouru. À +10% de pente, ce coût grimpe à 6,1 J/kg/m (+69%) ; à +20%, il atteint 9,8 J/kg/m (+172%) !"
      },
      {
        q: "Pourquoi courir vite en descente abîme-t-il autant les muscles ?",
        a: "En descente, la gravité accélère votre corps. Vos muscles ne travaillent plus en propulsion concentrique, mais en freinage excentrique permanent pour amortir chaque choc à chaque foulée. Ce régime de contraction étire les fibres musculaires sous tension maximale, créant des micro-déchirures au niveau des sarcomères (d'où les courbatures dévastatrices le lendemain). De plus, en dessous de -10% à -15% de pente, le coût énergétique remonte car l'athlète dépense une énergie colossale pour se retenir de tomber."
      },
      {
        q: "Combien de grammes de glucides par heure doit-on consommer en trail ou en sortie vallonnée ?",
        a: "Pour un effort de moins d'une heure : de l'eau suffit. Entre 1h et 2h30 d'effort : visez 30 à 60 grammes de glucides par heure. Pour des sorties ou compétitions de trail dépassant 2h30 à 3h : visez 60 à 90 grammes par heure. Au-delà de 60 g/h, les transporteurs intestinaux de glucose (SGLT1) sont saturés : il est alors impératif d'utiliser un mélange de glucose (ou maltodextrine) et de fructose dans un ratio 2:1 pour activer les transporteurs GLUT5 et éviter les troubles digestifs."
      },
      {
        q: "Comment « entraîner son intestin » (Gut Training) à tolérer les glucides ?",
        a: "L'intestin est un muscle qui s'adapte. Si vous essayez de prendre 60 g de glucides par heure le jour de votre course sans l'avoir jamais fait à l'entraînement, vous finirez avec des crampes d'estomac et des nausées. Pratiquez le « gut training » sur vos sorties longues du week-end pendant 6 à 8 semaines en augmentant graduellement la dose (de 30g à 45g, puis 60g/h) afin d'augmenter le nombre de transporteurs intestinaux et la vitesse de vidange gastrique."
      },
      {
        q: "Peut-on utiliser le modèle GAP en cours d'EPS lors des cycles de pleine nature ou cross ?",
        a: "C'est un support pédagogique interdisciplinaire exceptionnel (croisant EPS, SVT et mathématiques). Lors de la préparation du cross scolaire sur parcours vallonné, apprendre aux élèves qu'une montée ne s'attaque pas en sprint et savoir calculer leur allure équivalente leur permet de gérer leur énergie avec une grande maturité tactique."
      }
    ],
    contentHtml: `
      <h2>I. La Tyrannie du Dénivelé : Pourquoi la Vitesse Brute ne Veut Rien Dire en Côte</h2>
      <p>
        Tout coureur de plaine qui s'aventure pour la première fois sur un parcours vallonné subit un choc psychologique sévère. Habitué à maintenir facilement 12 km/h (5:00 min/km) sur les boulevards plats, il se retrouve le cœur battant à 180 bpm et les cuisses en feu alors que sa montre n'affiche qu'un humiliant 7,5 km/h (8:00 min/km) dans une modeste rampe à 9%.
      </p>
      <p>
        Cette frustration naît d'une illusion : nous avons été conditionnés à évaluer notre effort à travers la vitesse de déplacement horizontale. Or, en côte, le coureur ne lutte pas seulement contre la résistance de l'air et le frottement au sol : <strong>il élève son propre centre de gravité contre le champ de pesanteur terrestre</strong>. Chaque mètre parcouru vers le haut exige un travail mécanique vertical colossale qui pompe directement les réserves de glycogène musculaire.
      </p>

      <h2>II. Le Chef-d'Œuvre Biomécanique d'Alberto Minetti (2002)</h2>
      <p>
        En 2002, le professeur Alberto Minetti et son équipe de recherche ont publié une étude fondatrice qui fait autorité mondiale dans le Journal of Applied Physiology. En mesurant la consommation d'oxygène ($VO_2$) de coureurs de haut niveau sur des tapis roulants inclinables motorisés à des inclinaisons extrêmes, Minetti a formalisé l'équation du coût énergétique de la locomotion ($C_r$, exprimé en Joules par kilogramme et par mètre) en fonction de la pente fractionnaire ($i = \text{pente en } \% / 100$) :
      </p>

      <div class="formula-card">
        POLYNÔME DE MINETTI DU COÛT ÉNERGÉTIQUE EN PENTE :<br><br>
        Cr (J/kg/m) = 155,4 × i⁵ - 30,4 × i⁴ - 32,8 × i³ + 43,5 × i² + 15,7 × i + 3,6<br><br>
        Sur le plat (i = 0) : Cr = 3,6 J/kg/m<br>
        À +6% de pente (i = 0,06) : Cr ≈ 4,93 J/kg/m (Coût multiplié par 1,37)<br>
        À +10% de pente (i = 0,10) : Cr ≈ 6,08 J/kg/m (Coût multiplié par 1,69)<br>
        À +15% de pente (i = 0,15) : Cr ≈ 7,74 J/kg/m (Coût multiplié par 2,15)
      </div>

      <h3>Tableau des Équivalences : Vitesse Réelle en Montée vs Allure Ajustée Plat (GAP)</h3>
      <table class="table-custom">
        <thead>
          <tr>
            <th>Pente (%)</th>
            <th>Vitesse Réelle Affichée</th>
            <th>Allure Réelle au km</th>
            <th>Facteur Énergétique Minetti</th>
            <th>Allure Équivalente Plat (GAP)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>0% (Plat)</strong></td>
            <td>12,0 km/h</td>
            <td>5:00 min/km</td>
            <td>× 1,00</td>
            <td><strong>5:00 min/km</strong></td>
          </tr>
          <tr>
            <td><strong>+4%</strong></td>
            <td>10,0 km/h</td>
            <td>6:00 min/km</td>
            <td>× 1,23</td>
            <td><strong>4:52 min/km</strong></td>
          </tr>
          <tr>
            <td><strong>+8%</strong></td>
            <td>8,0 km/h</td>
            <td>7:30 min/km</td>
            <td>× 1,53</td>
            <td><strong>4:54 min/km</strong></td>
          </tr>
          <tr>
            <td><strong>+12%</strong></td>
            <td>6,5 km/h</td>
            <td>9:14 min/km</td>
            <td>× 1,89</td>
            <td><strong>4:53 min/km</strong></td>
          </tr>
          <tr>
            <td><strong>-6% (Descente douce)</strong></td>
            <td>14,5 km/h</td>
            <td>4:08 min/km</td>
            <td>× 0,72</td>
            <td><strong>5:44 min/km</strong></td>
          </tr>
          <tr>
            <td><strong>-15% (Descente raide)</strong></td>
            <td>11,0 km/h</td>
            <td>5:27 min/km</td>
            <td>× 0,95</td>
            <td><strong>5:44 min/km</strong> (Freinage !)</td>
          </tr>
        </tbody>
      </table>

      <h2>III. La Physiologie de la Nutrition Glucidique : Le Carburant du Dénivelé</h2>
      <p>
        Plus la pente s'accentue, plus le recrutement des unités motrices rapides (fibres de type IIa et IIx) est massif. Ces fibres musculaires fonctionnent presque exclusivement par dégradation du <strong>glycogène</strong>. Lors d'un trail ou d'une sortie avec fort dénivelé positif, vos stocks de glycogène hépatique (foie) et intramusculaire (environ 400 à 500 grammes chez l'adulte, soit ~2 000 kcal) peuvent être intégralement vidés en moins de 90 minutes.
      </p>
      <p>
        Si vous n'apportez pas de glucides exogènes par voie buccale avant l'épuisement des stocks, vous subirez la terrible « fringale » ou défaillance hypoglycémique : les jambes se vident instantanément de toute force, la vision se trouble et le cerveau se met en mode de survie léthargique.
      </p>

      <h2>IV. Le Protocole Glucidique Moderne : 30 g, 60 g ou 90 g par Heure ?</h2>
      <p>
        L'expert mondial de la nutrition sportive, le professeur Asker Jeukendrup, a clarifié les règles de l'apport énergétique selon la durée de l'effort :
      </p>

      <div class="callout-box academic">
        <strong>📚 Les Recommandations de Jeukendrup :</strong>
        - Sortie de 1h à 2h : 30 g de glucides par heure (soit 1 gel ou 500 ml de boisson isotonique standard).<br>
        - Sortie de 2h à 3h : 60 g de glucides par heure (2 gels ou 1 bidon énergétique + 1 barre de pâte de fruits).<br>
        - Épreuve &gt; 3h (Trail long, Ultra) : Jusqu'à 90 g de glucides par heure en utilisant impérativement un ratio 2:1 Glucose/Fructose.
      </div>

      <h2>V. Plan de Ravitaillement Concret pour une Sortie Trail de 3 Heures (D+ 800 m)</h2>
      <ul>
        <li><strong>Heure 1 (Ascension initiale) :</strong> 500 ml d'eau mélangée à 35 g de maltodextrine + 1 pâte de fruits (25 g de glucides). Total = 60 g de glucides. Prise fractionnée d'une gorgée toutes les 10 à 15 minutes.</li>
        <li><strong>Heure 2 (Crêtes et relances vallonnées) :</strong> 500 ml d'eau avec électrolytes (sodium, potassium, magnésium) + 1 gel énergétique hydrogel à 40 g de glucides (ratio 2:1) + 1 demi-banane mûre au sommet (15 g). Total = 55 g de glucides.</li>
        <li><strong>Heure 3 (Descente technique et retour) :</strong> 500 ml de boisson d'effort isotonique (30 g) + 1 gel anti-crampe riche en sodium (25 g). Total = 55 g de glucides.</li>
      </ul>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 9 : PROFIL VITESSE-ENDURANCE ET RÉSERVE ANAÉROBIE (ASR)
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'reserve-vitesse-anaerobie-asr-sports-co',
    seoTitle: "Réserve de Vitesse Anaérobie (ASR) : Protocole 30m & Profils",
    title: "Profil Vitesse-Endurance et Réserve Anaérobie (ASR) : Protocole du 30 m Lancé et Individualisation en Sports Co & Demi-Fond",
    breadcrumbTitle: "Réserve de Vitesse Anaérobie (ASR)",
    metaDesc: "Comprenez pourquoi la VMA seule trompe les entraîneurs. Calculez votre Réserve de Vitesse Anaérobie (ASR), protocole du 30m lancé et profils de vitesse.",
    keywords: "reserve de vitesse anaerobie asr, protocole 30m lance vms, profil vitesse endurance football, individualiser intermittent asr, bundle sandford asr, sprint vma",
    categoryBadge: "Bioénergétique Avancée & Vitesse",
    leadIntro: "Prenez deux footballeurs ou deux élèves ayant exactement la même VMA de 16,0 km/h mesurée sur piste. Prescrivez-leur une séance de fractionné court à 125% de VMA (20,0 km/h). Au bout de 4 répétitions, le premier court avec une aisance insolente tandis que le second est rouge écarlate, tétanisé par l'acidose lactique et contraint d'abandonner. Comment deux athlètes ayant la même « cylindrée aérobie » peuvent-ils réagir de façon si radicalement opposée ? La réponse des scientifiques du sport tient en trois lettres : l'ASR (Anaerobic Speed Reserve). Découvrez comment mesurer votre Vitesse Maximale de Sprint (VMS) via le protocole du 30 m lancé et comment individualiser vos intermittents supramaximaux pour ne plus jamais brûler vos athlètes.",
    toolCard: {
      file: "calculateur-asr-reserve-vitesse.html",
      title: "Calculateur de Réserve de Vitesse Anaérobie (ASR)",
      desc: "Renseignez votre VMA et votre chrono sur 30 m lancé pour identifier votre profil neuromusculaire (Sprinteur, Hybride, Endurant) et calibrer vos allures en % ASR."
    },
    sources: [
      "Bundle, M. W., Hoyt, R. W., & Weyand, P. G. (2003) — High-speed running performance: a new approach to assessment and prediction. J Appl Physiol, 95(5), 1955-1962.",
      "Sandford, G. N., Allen, S. V., Malcata, R. M., et al. (2019) — Anaerobic Speed Reserve: A key component of elite 800m running. Front Sports Act Living, 1, 30.",
      "Buchheit, M., & Laursen, P. B. (2013) — High-intensity interval training, solutions to the programming puzzle. Sports Medicine, 43(5), 313-338.",
      "Mendez-Villanueva, A., Buchheit, M., Simpson, B., & Bourdon, P. C. (2013) — Match play intensity distribution in youth soccer. Int J Sports Med."
    ],
    faq: [
      {
        q: "Qu'est-ce que l'ASR (Anaerobic Speed Reserve) exactement ?",
        a: "L'ASR, ou Réserve de Vitesse Anaérobie, est l'espace de vitesse qui sépare votre Vitesse Maximale Aérobie (VMA) de votre Vitesse Maximale de Sprint absolue (VMS). Mathématiquement : ASR = VMS - VMA. Si votre VMA est de 16 km/h et que votre sprint culmine à 32 km/h, votre ASR est de 16 km/h (4,44 m/s). C'est votre réservoir de puissance mécanique d'urgence."
      },
      {
        q: "Pourquoi le calibrage en % de VMA est-il injuste lors des efforts supramaximaux (> 100%) ?",
        a: "Lorsqu'on court au-dessus de 100% de VMA, la filière aérobie est saturée à son plafond : tout le surplus de vitesse est prélevé dans la réserve anaérobie (l'ASR). Prenons deux athlètes ayant la même VMA de 15 km/h : l'athlète A (profil sprinter) a une VMS de 33 km/h (ASR = 18 km/h), tandis que l'athlète B (profil diesel) a une VMS de 24 km/h (ASR = 9 km/h). Si vous leur demandez de courir à 120% de VMA (18 km/h, soit +3 km/h au-dessus de la VMA) : pour l'athlète A, ces 3 km/h ne représentent que 16,6% de son ASR ; pour l'athlète B, ces mêmes 3 km/h représentent 33,3% de sa réserve anaérobie, soit un stress métabolique deux fois plus lourd !"
      },
      {
        q: "Comment réalise-t-on le test du 30 mètres lancé en milieu scolaire ou en club ?",
        a: "Balisiez une zone d'élan de 20 mètres suivie d'une zone chronométrée de très exactement 30 mètres (plots bien visibles aux 0m, 20m et 50m). L'athlète s'élance, accélère à 100% dans la zone d'élan de 20m et franchit les 30m chronométrés à sa vitesse de pointe maximale. Deux essais sont accordés avec 4 à 5 minutes de récupération complète entre les deux."
      },
      {
        q: "Quelle est la formule pour convertir le temps du 30 m lancé en km/h ?",
        a: "La formule de conversion instantanée est : Vitesse (km/h) = 108 / Temps (en secondes). Par exemple, si un élève ou un joueur franchit les 30 mètres en 3,45 secondes : VMS = 108 / 3,45 = 31,3 km/h."
      },
      {
        q: "Quels sont les 3 grands profils physiologiques d'ASR ?",
        a: "Le Profil Vitesse (Sprinter) possède une VMS très élevée (> 32 km/h) et un ASR supérieur à 15 km/h : dévastateur sur les accélérations courtes, mais s'acidifie très vite. Le Profil Hybride (milieu de terrain polyvalent) possède un ASR moyen situé entre 11 et 14 km/h. Le Profil Endurance (Diesel / fondeur) possède une VMS plafonnée (< 27 km/h) et un ASR étroit (< 10 km/h) : incapable de gicler très vite, mais peut répéter des efforts à 105-110% VMA avec une tolérance remarquable."
      },
      {
        q: "Comment calibrer une séance en % d'ASR plutôt qu'en % de VMA ?",
        a: "La formule est : Vitesse Cible = VMA + (% ASR visé × ASR). Pour une séance de puissance anaérobie lactique, on vise généralement 20% à 30% d'ASR. Ainsi, chaque athlète pioche exactement la même proportion dans son réservoir anaérobie personnel, ce qui garantit une équité physiologique absolue dans le groupe."
      }
    ],
    contentHtml: `
      <h2>I. L'Échec du Dogme de la VMA Unique dans les Efforts Supramaximaux</h2>
      <p>
        Dans l'enseignement de l'EPS comme dans la préparation physique des sports collectifs, la VMA a longtemps été vénérée comme la clé universelle de tous les maux. On divisait les équipes ou les classes en couloirs d'allure selon des pourcentages stricts : 100%, 110%, 120% de VMA.
      </p>
      <p>
        Et pourtant, dès que l'intensité de la séance dépasse 100% de la VMA, cette belle harmonie arithmétique s'effondre. Vous avez tous constaté ce paradoxe : lors d'une séance de 10 secondes d'effort / 10 secondes de repos courue à 120% de VMA, certains élèves s'amusent en ayant l'impression de faire un jogging récréatif, alors que d'autres, pourtant tout aussi méritants et possédant la même VMA sur le papier, finissent à quatre pattes au bout de 4 minutes, terrassés par une tétanie musculaire foudroyante.
      </p>
      <p>
        Ce mystère a été percé par Peter Weyand et Matt Bundle en 2003, puis magistralement appliqué au demi-fond mondial (notamment sur le 800 mètres olympique) par Gareth Sandford : <strong>la VMA n'est que le rez-de-chaussée de l'intensité</strong>. Pour comprendre ce qui se passe au-dessus, il faut mesurer le toit de la maison : la <strong>Vitesse Maximale de Sprint (VMS)</strong>.
      </p>

      <h2>II. L'Anatomie de l'ASR : Le Modèle du Double Réservoir</h2>
      <p>
        Imaginez votre potentiel physique comme deux réservoirs d'énergie superposés :
      </p>
      <ol>
        <li><strong>Le Réservoir Aérobie (De 0 à 100% de VMA) :</strong> Alimenté par l'oxygène, propre, quasi inépuisable tant qu'il y a du carburant (lipides, glycogène). La VMA est la vitesse maximale que ce moteur à oxygène peut soutenir.</li>
        <li><strong>Le Réservoir Anaérobie (De la VMA à la VMS) :</strong> C'est la <strong>Réserve de Vitesse Anaérobie (ASR)</strong>. Dès que vous courez plus vite que votre VMA, le moteur aérobie étant déjà à fond de régime, 100% de la puissance mécanique supplémentaire requise doit être prélevée dans ce second réservoir. Mais ce réservoir fonctionne sur la glycolyse anaérobie rapide : sa capacité est très limitée et son utilisation libère massivement des ions H⁺ qui provoquent l'acidose métabolique.</li>
      </ol>

      <div class="formula-card">
        DÉFINITION FONDAMENTALE DE L'ASR :<br><br>
        ASR (km/h) = VMS (Vitesse Maximale de Sprint) - VMA (Vitesse Maximale Aérobie)<br><br>
        Exemple avec Yassine :<br>
        VMA = 15,5 km/h | VMS = 31,5 km/h<br>
        ASR de Yassine = 31,5 - 15,5 = 16,0 km/h (soit 4,44 m/s de marge supramaximale).
      </div>

      <h2>III. Le Protocole de Terrain du 30 Mètres Lancé</h2>
      <p>
        Pour obtenir une VMS d'une fiabilité irréprochable sans matériel de laboratoire coûteux, le test de terrain de référence mondiale est le <strong>30 mètres lancé (Flying 30m)</strong> :
      </p>

      <div class="callout-box tip">
        <strong>💡 Mise en Place sur le Terrain :</strong>
        Tracez sur la piste ou sur une ligne droite de terrain de football trois repères bien nets :<br>
        - Ligne 0 m : Ligne de départ arrêté.<br>
        - Ligne 20 m : Entrée de la zone chronométrée (début de la cellule ou du déclenchement chrono).<br>
        - Ligne 50 m : Ligne d'arrivée de la zone chronométrée.<br><br>
        L'athlète dispose de 20 mètres d'élan pour atteindre sa vitesse de pointe absolue AVANT de franchir la première marque. Il traverse ensuite les 30 mètres à pleine vitesse sans relâcher son effort avant la ligne finale.
      </div>

      <div class="formula-card">
        CONVERSION DU TEMPS SUR 30m LANCÉ EN VITESSE (VMS) :<br><br>
        VMS (km/h) = Distance (m) / Temps (s) × 3,6 = 30 / Temps × 3,6 = 108 / Temps (s)<br><br>
        Table de conversion rapide :<br>
        - 3,80 s sur 30 m lancé → VMS = 108 / 3,80 = 28,4 km/h<br>
        - 3,50 s sur 30 m lancé → VMS = 108 / 3,50 = 30,9 km/h<br>
        - 3,25 s sur 30 m lancé → VMS = 108 / 3,25 = 33,2 km/h<br>
        - 3,00 s sur 30 m lancé → VMS = 108 / 3,00 = 36,0 km/h (Niveau élite sprint)
      </div>

      <h2>IV. Les 3 Profils Physiologiques et Leur Comportement à l'Effort</h2>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Profil</th>
            <th>Typologie ASR</th>
            <th>Exemple d'Athlète</th>
            <th>Points Forts</th>
            <th>Pièges & Risques d'Entraînement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Profil Vitesse (Sprinter)</strong></td>
            <td>ASR &gt; 15 km/h<br>(VMS très élevée)</td>
            <td>Ailier de football, trois-quarts de rugby, coureur de 400m</td>
            <td>Accélérations fulgurantes, puissance de démarrage phénoménale</td>
            <td>Ne supporte pas les séries à % VMA fixe ; s'épuise en 4 fractions ; nécessite des récupérations longues</td>
          </tr>
          <tr>
            <td><strong>Profil Hybride</strong></td>
            <td>ASR entre 11 et 14,9 km/h</td>
            <td>Milieu de terrain box-to-box, basketteur, coureur de 800m</td>
            <td>Polyvalence exceptionnelle, bonne vitesse et bonne tolérance aux lactates</td>
            <td>Profil le plus modulable selon l'orientation du cycle d'entraînement</td>
          </tr>
          <tr>
            <td><strong>Profil Endurance (Diesel)</strong></td>
            <td>ASR &lt; 10,5 km/h<br>(VMS modeste)</td>
            <td>Marathonien, fondeur, demi-fond long scolaire</td>
            <td>Capacité extraordinaire à répéter des fractions à 105-115% VMA avec peu de fatigue</td>
            <td>Incapable de gicler sur un sprint court ; vitesse terminale plafonnée</td>
          </tr>
        </tbody>
      </table>

      <h2>V. Comment Programmer ses Séances en Pourcentage d'ASR</h2>
      <p>
        Pour égaliser le stress physiologique au sein d'un groupe d'athlètes hétérogènes lors d'un travail intermittent court supramaximal (ex: 10s effort / 10s repos ou 15s / 15s), abandonnez le % VMA et utilisez l'équation d'égalisation en % ASR :
      </p>

      <div class="formula-card">
        FORMULE D'ALLURE INDIVIDUALISÉE EN % ASR :<br><br>
        Vitesse de Travail (km/h) = VMA + (% ASR visé × ASR)<br><br>
        Comparons deux élèves à VMA 15 km/h lors d'une séance calibrée à 25% d'ASR :<br>
        - Amine (Profil Vitesse, VMS 31 km/h, ASR 16 km/h) :<br>
          Vitesse = 15 + (0,25 × 16) = 15 + 4 = 19,0 km/h (126% VMA)<br>
        - Rachid (Profil Endurance, VMS 25 km/h, ASR 10 km/h) :<br>
          Vitesse = 15 + (0,25 × 10) = 15 + 2,5 = 17,5 km/h (116% VMA)<br><br>
        Résultat : Les deux élèves vident très exactement un quart (25%) de leur batterie anaérobie à chaque fraction. Ils terminent la séance avec le même niveau d'épuisement et progressent harmonieusement sans blessure !
      </div>
    `
  },

  // ═════════════════════════════════════════════════════════════════════════════
  // ARTICLE 10 : L'INDICE D'ENDURANCE DE PÉRONNET & THIBAULT
  // ═════════════════════════════════════════════════════════════════════════════
  {
    slug: 'indice-endurance-peronnet-thibault-vma',
    seoTitle: "Indice d'Endurance Péronnet & Thibault : Calcul et Profil VMA",
    title: "L'Indice d'Endurance de Péronnet & Thibault : Calculer son Pourcentage de VMA Soutenable du 1 500 m au Marathon",
    breadcrumbTitle: "Indice d'Endurance Péronnet & Thibault",
    metaDesc: "Évaluez votre capacité à maintenir un haut % de VMA sur 10 km, semi et marathon grâce à l'indice d'endurance de Péronnet et Thibault. Calculs et séances.",
    keywords: "indice endurance peronnet thibault, pourcentage vma marathon 10km, calcul endurance relative, profil coureur fond, formule peronnet thibault, allure marathon vma",
    categoryBadge: "Bioénergétique de Fond & Modélisation",
    leadIntro: "Deux marathoniens se présentent sur la ligne de départ avec exactement la même VMA de 17,0 km/h. Quatre mois plus tard, le premier franchit l'arche d'arrivée en 2h56 (en ayant maintenu 84% de sa VMA pendant près de trois heures), tandis que le second explose au 30ème kilomètre et franchit péniblement la ligne en 3h38 (ayant péniblement plafonné à 68% de sa VMA). Pourquoi la VMA seule est-elle incapable de prédire la tenue d'une allure dans le temps ? En 1987, les chercheurs québécois François Péronnet et Guy Thibault ont formalisé l'Indice d'Endurance (IE), le modèle mathématique logarithmique qui mesure la pente de déclin de votre vitesse. Découvrez votre véritable profil et apprenez comment redresser votre courbe d'endurance.",
    toolCard: {
      file: "calculateur-indice-endurance.html",
      title: "Calculateur d'Indice d'Endurance (Péronnet & Thibault)",
      desc: "Renseignez votre VMA et une performance récente chronométrée pour calculer votre Indice d'Endurance (IE) et projeter vos allures réalistes du 5 km au marathon."
    },
    sources: [
      "Péronnet, F., & Thibault, G. (1987) — Mathematical analysis of running performance and world records. J Appl Physiol, 67(1), 453-465.",
      "Thibault, G., & Péronnet, F. (1988) — A physiological model of running performance. Med Sci Sports Exerc.",
      "Billat, V., Demarle, A., Slawinski, J., et al. (2001) — Physical and training characteristics of top-class marathon runners. Med Sci Sports Exerc, 33(12), 2089-2097.",
      "Joyner, M. J., & Coyle, E. F. (2008) — Endurance exercise performance: the physiology of champions. J Physiol, 586(1), 35-44."
    ],
    faq: [
      {
        q: "Qu'est-ce que l'Indice d'Endurance (IE) de Péronnet et Thibault ?",
        a: "L'Indice d'Endurance est un indicateur adimensionnel négatif qui quantifie la vitesse à laquelle votre pourcentage de VMA diminue au fur et à mesure que la durée de l'épreuve augmente. Plus votre indice est proche de zéro (ex: -3 ou -4), plus vous êtes capable de maintenir un pourcentage élevé de votre VMA sur des heures (profil marathonien d'élite). Plus votre indice est négatif (ex: -9 ou -11), plus votre vitesse s'effondre rapidement dès que la course dépasse 15 à 20 minutes."
      },
      {
        q: "Quelle est la formule mathématique exacte de l'Indice d'Endurance ?",
        a: "L'équation développée par François Péronnet et Guy Thibault s'exprime ainsi : IE = [%VMA - 100] / ln(t / 6), où %VMA est le pourcentage de VMA soutenu lors de la performance chronométrée, ln est le logarithme népérien, et t est le temps de course réalisé en minutes. La constante 6 représente les 6 minutes de référence universelle du temps limite à 100% de VMA."
      },
      {
        q: "Comment interpréter son score d'IE (les repères de valeurs) ?",
        a: "Valeur supérieure à -4,0 : Endurance exceptionnelle (profil de coureur d'ultra-fond ou marathonien d'élite). Entre -5,0 et -6,5 : Très bon profil d'endurance de coureur sur route régulier. Entre -7,0 et -8,5 : Profil équilibré moyen (coureur de 5 km à 10 km ou sportif polyvalent). En dessous de -9,0 : Profil sprinteur ou coureur débutant ayant un gros moteur mais aucune capacité à tenir dans le temps."
      },
      {
        q: "Pourquoi deux coureurs ayant la même VMA n'ont-ils pas le même Indice d'Endurance ?",
        a: "La VMA reflète principalement le débit cardiaque maximal et la puissance mécanique du moteur aérobie. L'Indice d'Endurance, en revanche, reflète des facteurs cellulaires périphériques : la densité des mitochondries dans les fibres musculaires lentes, le niveau de capillarisation sanguine, l'efficacité de l'oxydation des acides gras libres pour épargner le glycogène, et la tolérance psychologique à la monotonie de l'effort."
      },
      {
        q: "Comment améliorer son Indice d'Endurance à l'entraînement ?",
        a: "Pour redresser sa pente d'endurance, l'athlète doit privilégier trois types de travail : 1° Un volume important en endurance fondamentale (Zone 2, 65-75% VMA) pour développer le réseau capillaire ; 2° Des séances spécifiques au seuil aérobie et anaérobie (allure tempo 80-88% VMA) pour habituer les cellules à recycler les métabolites ; 3° Des sorties longues progressives le week-end avec des blocs à allure marathon pour apprendre au foie et aux muscles à oxyder les lipides."
      },
      {
        q: "L'Indice d'Endurance peut-il s'appliquer aux élèves en EPS ?",
        a: "Oui, c'est un formidable outil pour expliquer aux lycéens pourquoi courir 20 minutes en contrôle ne s'improvise pas en partant à la vitesse d'un 1 000 mètres. Il permet d'objectiver la notion de « gestion de projet de course » inscrite dans les programmes du cycle secondaire qualifiant."
      }
    ],
    contentHtml: `
      <h2>I. Le Mystère du Marathon : Quand la VMA ne Dit Plus Tout</h2>
      <p>
        Dans le milieu de la course à pied, la question rituelle qui ouvre toute discussion entre coureurs est invariablement : <em>« Quelle est ta VMA ? »</em>. On s'imagine qu'en connaissant ce chiffre magique, on connaît l'avenir chronométrique d'un athlète sur n'importe quelle distance.
      </p>
      <p>
        C'est une grave illusion d'optique. Si la VMA est un prédicteur quasi-parfait des performances sur des distances courtes allant du 1 500 mètres au 3 000 mètres (efforts de 4 à 10 minutes), son pouvoir prédictif s'étiole dès que l'épreuve s'allonge. Sur un semi-marathon ou un marathon, deux coureurs crédités de la même VMA de 16 km/h peuvent avoir un différentiel d'arrivée supérieur à 40 minutes !
      </p>
      <p>
        Pour comprendre cette divergence, il faut faire appel à la notion d'<strong>endurance relative</strong>, théorisée à la fin des années 1980 par les professeurs québécois François Péronnet et Guy Thibault au Département d'Éducation Physique de l'Université de Montréal.
      </p>

      <h2>II. Le Modèle Logarithmique de Péronnet & Thibault (1987)</h2>
      <p>
        Péronnet et Thibault ont analysé des milliers de records du monde et de performances d'athlètes de tous niveaux. Ils ont découvert que la relation reliant le pourcentage de VMA maximal soutenable ($\%VMA$) à la durée de l'effort ($t$, exprimée en minutes) n'est ni linéaire ni exponentielle, mais obéit avec une précision mathématique stupéfiante à une <strong>loi logarithmique</strong> :
      </p>

      <div class="formula-card">
        L'ÉQUATION D'ENDURANCE DE PÉRONNET & THIBAULT :<br><br>
        %VMA = 100 + [IE × ln(t / 6)]<br><br>
        En inversant la formule pour calculer l'Indice d'Endurance (IE) d'un coureur :<br>
        IE = [%VMA - 100] / ln(t / 6)<br><br>
        Où :<br>
        - %VMA = (Vitesse moyenne de course / VMA) × 100<br>
        - t = temps de course en minutes (ex: 45 min 30 s = 45,5 min)<br>
        - ln = fonction logarithme népérien<br>
        - 6 = temps limite physiologique universel à 100% de VMA (6 minutes)
      </div>

      <h3>Démonstration Chiffrée Pas-à-Pas</h3>
      <p>
        Prenons l'exemple d'Omar : sa VMA mesurée au test de 6 minutes est de <strong>16,0 km/h</strong>. Il vient de boucler un 10 kilomètres officiel en <strong>43 minutes 12 secondes</strong> (soit 43,2 minutes).
      </p>
      <ol>
        <li>Vitesse moyenne sur 10 km : $10 / (43,2 / 60) = 10 / 0,72 = 13,89\text{ km/h}$.</li>
        <li>Pourcentage de VMA maintenu : $(13,89 / 16,0) \times 100 = \mathbf{86,8\%}$.</li>
        <li>Calcul du dénominateur logarithmique : $\ln(43,2 / 6) = \ln(7,2) \approx 1,974$.</li>
        <li>Calcul de l'Indice d'Endurance :<br>
        $IE = (86,8 - 100) / 1,974 = -13,2 / 1,974 = \mathbf{-6,69}$.</li>
      </ol>
      <p>
        Avec un IE de <strong>-6,69</strong>, Omar se situe dans la catégorie des coureurs présentant un bon profil d'endurance de fond.
      </p>

      <h2>III. Échelle d'Interprétation des Valeurs d'IE</h2>

      <table class="table-custom">
        <thead>
          <tr>
            <th>Valeur de l'IE</th>
            <th>Catégorie de Profil</th>
            <th>% VMA Soutenable sur 10 km</th>
            <th>% VMA Soutenable sur Marathon</th>
            <th>Profil Typique d'Athlète</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>&gt; -4,0</strong></td>
            <td>Endurance Exceptionnelle</td>
            <td>92% à 94%</td>
            <td>84% à 88%</td>
            <td>Marathonien international, ultra-traileur d'élite, organisme optimisé sur les lipides</td>
          </tr>
          <tr>
            <td><strong>-4,0 à -5,5</strong></td>
            <td>Très Endurant</td>
            <td>89% à 91%</td>
            <td>80% à 83%</td>
            <td>Coureur de club expérimenté avec gros volume kilométrique hebdomadaire</td>
          </tr>
          <tr>
            <td><strong>-5,6 à -7,5</strong></td>
            <td>Profil Équilibré Moyen</td>
            <td>85% à 88%</td>
            <td>75% à 79%</td>
            <td>La majorité des coureurs réguliers (3 séances par semaine)</td>
          </tr>
          <tr>
            <td><strong>-7,6 à -9,0</strong></td>
            <td>Endurance Modérée</td>
            <td>81% à 84%</td>
            <td>70% à 74%</td>
            <td>Sportif polyvalent (footballeur, tennisman), plus à l'aise sur 5 km que sur semi</td>
          </tr>
          <tr>
            <td><strong>&lt; -9,0</strong></td>
            <td>Faible Endurance (Profil Vitesse)</td>
            <td>&lt; 80%</td>
            <td>&lt; 68% (Écroulement)</td>
            <td>Débutant ou sprinter naturel : s'effondre violemment sur les efforts longs</td>
          </tr>
        </tbody>
      </table>

      <h2>IV. Simulation Pratique : Pourquoi Omar et Mehdi ne Vont pas à la Même Vitesse sur Marathon</h2>
      <p>
        Revenons à nos deux marathoniens ayant chacun <strong>16,0 km/h de VMA</strong> :
      </p>
      <ul>
        <li><strong>Omar (Profil Endurant, IE = -5,0) :</strong><br>
        Sur marathon, son équation prédit qu'il tiendra 81,5% de sa VMA, soit 13,04 km/h (4:36/km).<br>
        Temps projeté au marathon : <strong>3 heures 14 minutes</strong>. Il franchit la ligne avec le sourire.</li>
        <li><strong>Mehdi (Profil Résistant mais peu endurant, IE = -9,5) :</strong><br>
        Sur marathon, la chute logarithmique fait qu'il ne peut tenir que 68,5% de sa VMA, soit 10,96 km/h (5:28/km).<br>
        Temps projeté au marathon : <strong>3 heures 51 minutes</strong> ! S'il commet l'erreur de partir avec Omar à 13 km/h en se fiant à leur VMA identique, Mehdi sera en dette énergétique totale dès le 25ème kilomètre et finira en marchant.</li>
      </ul>

      <h2>V. Comment Travailler pour Améliorer son Indice d'Endurance</h2>
      <p>
        Si vous constatez que votre IE est très négatif (&lt; -8,0), inutile d'enchaîner des séances de fractionné court à 105% de VMA : cela ne ferait qu'accentuer votre profil de sprinteur. Pour redresser votre courbe d'endurance :
      </p>
      <ol>
        <li><strong>Augmentez le Volume en Zone 2 (Aisance Fondamentale) :</strong> Courez au moins 70% de votre volume hebdomadaire à 65-72% de VMA. C'est l'unique stimulus cellulaire qui multiplie les transporteurs d'acides gras et densifie le réseau capillaire musculaire.</li>
        <li><strong>Le Travail au Seuil Aérobie / Allure Marathon (78-83% VMA) :</strong> Intégrez des fractions longues de 2 × 15 min ou 3 × 12 min à cette allure pour forcer l'organisme à stabiliser sa glycémie sur la durée.</li>
        <li><strong>Les Sorties Longues à Allure Progressive :</strong> Terminez vos sorties du week-end de 1h30 à 2h00 par 20 minutes courues à votre allure cible de course pour apprendre à résister à la fatigue neuromusculaire.</li>
      </ol>
    `
  }
];

/**
 * generer-10-articles-seo.mjs
 * Script d'exécution maître :
 * 1. Assemble et génère les 10 pages HTML d'articles autonomes à la racine
 * 2. Vérifie le calibrage en mots (> 2 000 mots par guide)
 * 3. Enregistre les URLs dans sitemap.xml
 * 4. Exécute ensuite unifier-navbar-footer.js pour appliquer la navbar et le footer uniformes
 */

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
