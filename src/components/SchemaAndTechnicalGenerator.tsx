import React, { useState } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Layers, 
  Share2, 
  Compass, 
  Cpu, 
  FileText,
  ShieldCheck,
  Code
} from 'lucide-react';
import { SEO_AUDIT_PAGES } from '../data/seoAuditData';

export const SchemaAndTechnicalGenerator: React.FC = () => {
  const [activeSchema, setActiveSchema] = useState<'article' | 'faq' | 'webapp' | 'breadcrumb' | 'robots' | 'sitemap'>('article');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const articleSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Échauffement EPS : Exercices, Fiches & Progressions",
  "description": "Guide complet de l'échauffement en EPS : phases cardio, articulaire et spécifique avec fiches prêtes à l'emploi.",
  "image": "https://profeps.ma/images/echauffement-eps-og.jpg",
  "author": {
    "@type": "Organization",
    "name": "Équipe Pédagogique ProfEPS",
    "url": "https://profeps.ma"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ProfEPS Maroc",
    "logo": {
      "@type": "ImageObject",
      "url": "https://profeps.ma/logo.png"
    }
  },
  "datePublished": "2024-09-01T08:00:00+01:00",
  "dateModified": "2025-01-15T10:30:00+01:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://profeps.ma/article-echauffement-eps.html"
  },
  "inLanguage": "fr"
}
</script>`;

  const faqSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le coefficient de l'EPS au baccalauréat au Maroc ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au Maroc, l'Éducation Physique et Sportive (EPS) est évaluée dans le cadre du contrôle continu au baccalauréat. Son coefficient varie généralement de 1 à 2 selon les branches générales ou techniques."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée réglementaire d'une séance d'EPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La durée standard d'une séance d'EPS au collège et au lycée est de 2 heures hebdomadaires consécutives, incluant le temps de prise en main, l'échauffement, la phase d'apprentissage et le retour au calme."
      }
    },
    {
      "@type": "Question",
      "name": "Comment calculer facilement la VMA avec le test Demi-Cooper ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour le test Demi-Cooper (6 minutes de course), la formule directe est : VMA (km/h) = Distance parcourue en mètres / 100."
      }
    }
  ]
}
</script>`;

  const webAppSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur VMA & Allures de Course ProfEPS",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "url": "https://profeps.ma/calculateur-vma.html",
  "description": "Calculateur en ligne gratuit de Vitesse Maximale Aérobie (VMA) et tableau d'allures d'entraînement (80% à 120%) pour professeurs d'EPS.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MAD"
  },
  "inLanguage": "fr"
}
</script>`;

  const breadcrumbSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      "name": "Cycles d'Apprentissage",
      "item": "https://profeps.ma/ressources-atd.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cycle Badminton Collège",
      "item": "https://profeps.ma/cycle-badminton-college-eps-maroc.html"
    }
  ]
}
</script>`;

  const robotsTxt = `# robots.txt for profeps.ma
User-agent: *
Allow: /

# Exclusions techniques / privées
Disallow: /admin/
Disallow: /tmp/
Disallow: /private/

# Sitemap Officiel
Sitemap: https://profeps.ma/sitemap.xml`;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Page d'Accueil Principale (Racine / uniquement, pas /index.html) -->
  <url>
    <loc>https://profeps.ma/</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://profeps.ma/calculateur-vma.html</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://profeps.ma/generateur.html</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://profeps.ma/concours-eps-maroc.html</loc>
    <lastmod>2025-01-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://profeps.ma/article-structure-seance.html</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://profeps.ma/article-echauffement-eps.html</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- + 85 autres URLs validées sans doublon -->
</urlset>`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Code className="w-4 h-4" /> Étape 9 & Données Structurées Schema.org
            </div>
            <h2 className="text-xl font-bold text-white">
              Générateur de Fichiers Techniques & Rich Snippets Google
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Les données structurées permettent à Google de comprendre le type de contenu (articles de fond, calculateurs interactifs, foires aux questions, fil d'Ariane) et d'afficher des <strong>Rich Snippets</strong> (étoiles, accordéons de questions, aperçus riches).
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'article', label: 'Article Schema (55 Guides)', icon: FileText },
            { id: 'faq', label: 'FAQPage Schema (Q&A)', icon: Compass },
            { id: 'webapp', label: 'WebApplication Schema (Outils)', icon: Cpu },
            { id: 'breadcrumb', label: 'BreadcrumbList (Fil d\'ariane)', icon: Layers },
            { id: 'robots', label: 'robots.txt', icon: ShieldCheck },
            { id: 'sitemap', label: 'sitemap.xml', icon: FileCode2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSchema(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeSchema === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Viewer */}
        <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-4 relative">
          <pre className="font-mono text-xs text-blue-200 overflow-x-auto whitespace-pre leading-relaxed max-h-[450px]">
            {activeSchema === 'article' && articleSchema}
            {activeSchema === 'faq' && faqSchema}
            {activeSchema === 'webapp' && webAppSchema}
            {activeSchema === 'breadcrumb' && breadcrumbSchema}
            {activeSchema === 'robots' && robotsTxt}
            {activeSchema === 'sitemap' && sitemapXml}
          </pre>

          <button
            onClick={() => {
              const code = 
                activeSchema === 'article' ? articleSchema :
                activeSchema === 'faq' ? faqSchema :
                activeSchema === 'webapp' ? webAppSchema :
                activeSchema === 'breadcrumb' ? breadcrumbSchema :
                activeSchema === 'robots' ? robotsTxt : sitemapXml;
              copyToClipboard(code, `tech-${activeSchema}`);
            }}
            className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer shadow-md"
          >
            {copiedKey === `tech-${activeSchema}` ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copié dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier le snippet</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Heading Skip Bulk Fix Guide (87 pages) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" /> Résolution du Heading Levels Skip (87 Pages)
        </div>
        <h3 className="text-base font-bold text-white">
          Comment corriger les 87 pages en 1 seule modification de template ?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Le saut de hiérarchie (par exemple un <code>&lt;h1&gt;</code> suivi directement d'un <code>&lt;h3&gt;</code>) est présent sur <strong>87 des 92 pages</strong>. Cela confirme mathématiquement que l'erreur se trouve dans vos <strong>composants partagés</strong> (Header, Sidebar "Articles Liés", Footer ou Table des Matières).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
            <span className="font-bold text-red-400 font-sans">Composant Sidebar Actuel (Erreur de saut)</span>
            <div className="p-2 bg-slate-950 rounded text-slate-300 space-y-1">
              <div className="text-red-300">&lt;!-- Dans le template sidebar.html / footer.html --&gt;</div>
              <div className="text-red-400">&lt;h3 class="widget-title"&gt;Articles Récents&lt;/h3&gt;</div>
              <div className="text-slate-400 text-[10px] font-sans">
                → Provoque un saut H1 → H3 si le corps de l'article n'a pas encore de H2 !
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-400 font-sans">Correction du Template (Conforme SEO & W3C)</span>
            <div className="p-2 bg-slate-950 rounded text-slate-300 space-y-1">
              <div className="text-emerald-300">&lt;!-- Remplacer la balise heading par H2 ou un div stylé --&gt;</div>
              <div className="text-emerald-400">&lt;h2 class="text-lg font-bold"&gt;Articles Récents&lt;/h2&gt;</div>
              <div className="text-slate-400 text-[10px] font-sans">
                → Garantit une arborescence valide H1 → H2 → H3 sans aucun saut.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
