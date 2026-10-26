import React, { useState, useMemo } from 'react';
import { LIBRARY_RESOURCES, LibraryResource } from '../../data/pedagogicalData';
import {
  FolderArchive,
  Search,
  Download,
  FileText,
  CheckCircle,
  BookMarked,
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
    { id: 'concours', label: 'Concours & CRMEF' },
    { id: 'aps', label: 'Fiches APS & Cycles' },
    { id: 'fiches', label: 'Didactique & Sécurité' },
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1.5">
            <FolderArchive className="w-4 h-4" />
            <span>Fonds Documentaire Téléchargeable</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bibliothèque Numérique Didactique EPS
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Téléchargez librement fiches de séance, annales de concours CRMEF, guides de sécurité et
            référentiels d’évaluation pour vos cours d’EPS.
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher (ex: VMA, Basket, CRMEF)..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all border ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredResources.map(res => {
          const isPdf = res.format === 'PDF';
          return (
            <div
              key={res.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isPdf
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {res.format} · {res.fileSize}
                  </span>
                  <span className="text-[11px] font-medium text-slate-600">{res.year}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {res.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {res.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActivePreviewResource(res)}
                  className="p-1.5 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  title="Aperçu rapide"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(res)}
                  className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activePreviewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {activePreviewResource.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {activePreviewResource.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activePreviewResource.description}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
              <div><strong>Format :</strong> {activePreviewResource.format} ({activePreviewResource.fileSize})</div>
              <div><strong>Auteur / Source :</strong> {activePreviewResource.author}</div>
              <div><strong>Année scolaire :</strong> {activePreviewResource.year}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => handleDownload(activePreviewResource)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la Ressource</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};