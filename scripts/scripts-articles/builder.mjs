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
          "name": "Abdelkhalek ELBOUDANI",
          "jobTitle": "Professeur d'Éducation Physique et Sportive (Prof d'EPS au Maroc)",
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
                    <div class="font-bold text-slate-900 text-sm sm:text-base">Abdelkhalek ELBOUDANI</div>
                    <div class="text-xs text-slate-500">Professeur d'Éducation Physique et Sportive (Maroc) · Didactique de l'EPS &amp; CRMEF</div>
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
