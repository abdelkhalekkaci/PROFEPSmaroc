import React, { useState } from 'react';
import { FEATURED_BLOG_ARTICLES, BlogArticle } from '../../data/pedagogicalData';
import {
  Newspaper,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookMarked
} from 'lucide-react';

export const BlogArticlesCarousel: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'all' | 'vma' | 'sciences' | 'pedagogie'>('all');

  const topics = [
    { id: 'all' as const, label: 'Tous les guides (14)' },
    { id: 'vma' as const, label: 'VMA & Demi-Fond (6)' },
    { id: 'sciences' as const, label: 'Physiologie & Charge (4)' },
    { id: 'pedagogie' as const, label: 'Pédagogie & Textes (4)' },
  ];

  const filteredArticles = FEATURED_BLOG_ARTICLES.filter(
    art => selectedTopic === 'all' || art.topic === selectedTopic
  );

  const getBadgeStyle = (color: BlogArticle['badgeColor']) => {
    switch (color) {
      case 'red':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'emerald':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'blue':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      case 'amber':
      default:
        return 'text-amber-800 bg-amber-50 border-amber-200';
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1.5">
            <Newspaper className="w-4 h-4" />
            <span>Actualités Didactiques & Guides Piliers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Le Blog Didactique & Scientifique de l’Enseignant d’EPS
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Analyses des textes officiels, méthodologies d’entraînement approfondies (&gt; 2 500 mots) et conseils pratiques pour le terrain.
          </p>
        </div>

        {/* Accès intégralité blog */}
        <div className="flex items-center gap-2">
          <a
            href="blog.html"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs"
          >
            <BookMarked className="w-3.5 h-3.5 text-red-400" />
            <span>Accéder au Blog Complet (93 Articles)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Sélecteur de Thématiques Réactif */}
      <div className="flex flex-wrap items-center gap-2">
        {topics.map(t => {
          const isActive = selectedTopic === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Grille des Articles et Guides Filtrés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredArticles.map(article => {
          const badgeClass = getBadgeStyle(article.badgeColor);
          return (
            <article
              key={article.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative overflow-hidden group"
            >
              {/* Barre supérieure d'accent coloré */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-emerald-600 opacity-90"
              />

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                  <a href={article.url}>
                    {article.title}
                  </a>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{article.date}</span>
                <a
                  href={article.url}
                  className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 transition"
                >
                  <span>Lire l’article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bannière de redirection rapide vers tout le catalogue d'articles */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/50 border border-slate-800 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Plus de 90 articles didactiques et scientifiques disponibles</h4>
            <p className="text-xs text-slate-400">
              Examens du Bac EPS, préparation aux concours CRMEF, fiches d'APS, cardiologie et biomécanique sportive.
            </p>
          </div>
        </div>

        <a
          href="https://profeps.ma/blog.html"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 shadow-md"
        >
          <span>Consulter les Archives du Blog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
