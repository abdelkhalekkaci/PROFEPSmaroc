import React, { useState, useMemo } from 'react';
import { LIBRARY_RESOURCES, LibraryResource } from '../../data/pedagogicalData';
import {
  FolderArchive,
  Search,
  Download,
  FileText,
  Filter,
  CheckCircle,
  ExternalLink,
  BookMarked,
  FileCode,
  Tag,
  Eye,
} from 'lucide-react';

export const DigitalLibraryBlock: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewResource, setActivePreviewResource] = useState<LibraryResource | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Ressources' },
    { id: 'guides', label: 'Guides Ministériels MENPS' },
    { id: 'crmef', label: 'Concours & CRMEF' },
    { id: 'apsa', label: 'Fiches APSA & Cycles' },
    { id: 'didactique', label: 'Didactique & Sécurité' },
  ];

  const filteredResources = useMemo(() => {
    return LIBRARY_RESOURCES.filter(resource => {
      const matchCategory =
        selectedCategory === 'all' || resource.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownload = (res: LibraryResource) => {
    setDownloadNotice(`Ouverture de la ressource : "${res.title}"...`);
    setTimeout(() => {
      window.open(res.downloadUrl, '_blank', 'noopener,noreferrer');
      setDownloadNotice(null);
    }, 600);
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1.5">
            <FolderArchive className="w-4 h-4" />
            <span>Médiathèque Pédagogique EPS Maroc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bibliothèque Numérique & Documents Didactiques
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Téléchargez les annales de concours, guides méthodologiques, fiches de séances et cadres
            réglementaires pour enrichir votre pratique sur le terrain.
          </p>
        </div>

        {/* Global Resource Count Badge */}
        <div className="text-right shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} disponible{filteredResources.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Search Bar */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Filter Tabs (Clean Segmented Buttons, Zero-Pill) */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative min-w-[240px] sm:max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par APSA, CRMEF, sujet..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-600">
            Aucun document ne correspond à votre recherche « {searchQuery} ».
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredResources.map(resource => {
            return (
              <div
                key={resource.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
              >
                <div className="space-y-3">
                  {/* Top Metadata Line (Zero-Pill Typographic Hierarchy) */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="font-bold text-emerald-700">{resource.categoryLabel}</span>
                    <span className="font-mono text-slate-400">
                      {resource.fileFormat} · {resource.fileSize}
                    </span>
                  </div>

                  {/* Resource Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Author / Source */}
                  <p className="text-[11px] text-slate-500">
                    Source : <span className="font-medium text-slate-700">{resource.author}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Clean Tags Line (No Pills, Just Minimal Text Separators) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>{resource.tags.join(' · ')}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePreviewResource(resource)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer py-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Aperçu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Ouvrir</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bannière d'accès direct vers l'espace complet de la Bibliothèque Numérique */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <BookMarked className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Bibliothèque Numérique EPS Complète</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Accès Libre</span>
            </h4>
            <p className="text-xs text-slate-300">
              Consultez l'ensemble des mémoires de recherche, thèses didactiques et fiches d'APS téléchargeables en PDF.
            </p>
          </div>
        </div>

        <a
          href="https://profeps.ma/bibliotheque-numerique-eps.html"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shrink-0 shadow-md cursor-pointer"
        >
          <span>Accéder à la Bibliothèque Numérique</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Modal Aperçu Ressource */}
      {activePreviewResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-600 block">
                  {activePreviewResource.categoryLabel} · {activePreviewResource.year}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {activePreviewResource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Émetteur / Institution :</strong> {activePreviewResource.author}
              </p>
              <p>
                <strong>Format & Poids :</strong> {activePreviewResource.fileFormat} (
                {activePreviewResource.fileSize})
              </p>
              <div>
                <strong className="text-slate-800 block mb-1">Résumé Didactique :</strong>
                <p>{activePreviewResource.description}</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Mots-clés associés :</strong>
                <div className="flex flex-wrap gap-1 text-slate-500">
                  {activePreviewResource.tags.map((tag, idx) => (
                    <span key={idx}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  handleDownload(activePreviewResource);
                  setActivePreviewResource(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger la Ressource ({activePreviewResource.fileFormat})</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
