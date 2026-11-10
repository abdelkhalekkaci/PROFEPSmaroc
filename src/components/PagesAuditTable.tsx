import React, { useState } from 'react';
import { PageAuditItem } from '../data/seoAuditData';
import { 
  Search, 
  Filter, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Sparkles,
  Eye,
  AlertTriangle,
  Monitor,
  Smartphone,
  ChevronRight,
  Info
} from 'lucide-react';

interface PagesAuditTableProps {
  pages: PageAuditItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fixedPages: Record<string, boolean>;
  onToggleFixed: (pageId: string) => void;
}

export const PagesAuditTable: React.FC<PagesAuditTableProps> = ({
  pages,
  searchTerm,
  setSearchTerm,
  fixedPages,
  onToggleFixed
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<string>('all');
  const [selectedPageForPreview, setSelectedPageForPreview] = useState<PageAuditItem | null>(pages[0] || null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter logic
  const filteredPages = pages.filter((page) => {
    const matchesSearch = 
      page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.proposedTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.proposedDesc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'all' || page.category === selectedCategory;

    let matchesIssue = true;
    if (selectedIssue === 'noindex') matchesIssue = page.isNoindex;
    else if (selectedIssue === 'duplicate') matchesIssue = page.isDuplicate;
    else if (selectedIssue === 'multipleH1') matchesIssue = page.hasMultipleH1;
    else if (selectedIssue === 'headingSkip') matchesIssue = page.hasHeadingSkip;
    else if (selectedIssue === 'longTitle') matchesIssue = (page.titleLength || 0) > 65;
    else if (selectedIssue === 'longDesc') matchesIssue = (page.descLength || 0) > 160;
    else if (selectedIssue === 'pending') matchesIssue = !fixedPages[page.id];
    else if (selectedIssue === 'fixed') matchesIssue = !!fixedPages[page.id];

    return matchesSearch && matchesCategory && matchesIssue;
  });

  return (
    <div className="space-y-6">
      {/* Filtering Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'Toutes les Pages (92)' },
            { id: 'core', label: 'Pages Clés (8)' },
            { id: 'article', label: 'Articles (55)' },
            { id: 'cycle', label: 'Cycles (8)' },
            { id: 'qa', label: 'Q&A (8)' },
            { id: 'tool', label: 'Outils (2)' },
            { id: 'legal', label: 'Mentions (2)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Issue Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">Tous les filtres d'anomalies</option>
            <option value="noindex">Pages Noindex (13)</option>
            <option value="duplicate">Titres Dupliqués (2)</option>
            <option value="multipleH1">Multiples H1 (1)</option>
            <option value="longTitle">Titres Trop Longs (&gt;65 car)</option>
            <option value="longDesc">Méta-Descriptions Trop Longues (&gt;160 car)</option>
            <option value="headingSkip">Saut de niveau Heading</option>
            <option value="pending">En attente de correction</option>
            <option value="fixed">Déjà corrigées</option>
          </select>
        </div>
      </div>

      {/* Main Table + SERP Preview Drawer Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table View (2 Cols on XL) */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-850/50">
            <span className="text-xs font-semibold text-slate-300">
              Affichage de <strong className="text-emerald-400">{filteredPages.length}</strong> pages correspondantes
            </span>
            <span className="text-[11px] text-slate-400">
              Cliquez sur une ligne pour tester dans le simulateur SERP
            </span>
          </div>

          <div className="overflow-x-auto max-h-[700px] overflow-y-auto divide-y divide-slate-800/60 scrollbar-thin">
            {filteredPages.map((page) => {
              const isSelected = selectedPageForPreview?.id === page.id;
              const isDone = !!fixedPages[page.id];

              return (
                <div
                  key={page.id}
                  onClick={() => setSelectedPageForPreview(page)}
                  className={`p-4 transition cursor-pointer hover:bg-slate-800/40 flex flex-col gap-2.5 ${
                    isSelected ? 'bg-emerald-950/20 ring-1 ring-emerald-500/30' : ''
                  }`}
                >
                  {/* Top Bar: URL + Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFixed(page.id);
                        }}
                        className="text-emerald-400 hover:text-emerald-300 p-0.5"
                        title={isDone ? 'Marqué comme fait' : 'Marquer comme fait'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600" />
                        )}
                      </button>

                      <span className={`font-mono text-xs font-bold truncate ${
                        isDone ? 'text-slate-400 line-through' : 'text-white'
                      }`}>
                        {page.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {page.isNoindex && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          NI (Noindex)
                        </span>
                      )}
                      {page.isDuplicate && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Dup Title
                        </span>
                      )}
                      {page.hasMultipleH1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          4 H1
                        </span>
                      )}
                      {page.hasHeadingSkip && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">
                          Head Skip
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-emerald-400 border border-slate-700">
                        {page.schemaType}
                      </span>
                    </div>
                  </div>

                  {/* Audit vs Target Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {/* Title length before */}
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Titre Audit</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`font-bold ${
                          (page.titleLength || 0) > 65 ? 'text-rose-400' : 'text-slate-300'
                        }`}>
                          {page.titleLength !== null ? `${page.titleLength} car` : '-'}
                        </span>
                        {(page.titleLength || 0) > 65 && (
                          <span className="text-[10px] text-rose-400">Trop long</span>
                        )}
                      </div>
                    </div>

                    {/* Proposed title length */}
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-emerald-950/60">
                      <span className="text-[10px] text-emerald-400/80 uppercase block font-medium">Titre Corrigé</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-bold text-emerald-400">
                          {page.proposedTitle.length} car
                        </span>
                        <span className="text-[10px] text-emerald-400/70">50-60</span>
                      </div>
                    </div>

                    {/* Desc length before */}
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Desc Audit</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`font-bold ${
                          (page.descLength || 0) > 160 ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          {page.descLength !== null ? `${page.descLength} car` : '-'}
                        </span>
                      </div>
                    </div>

                    {/* Proposed desc length */}
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-emerald-950/60">
                      <span className="text-[10px] text-emerald-400/80 uppercase block font-medium">Desc Corrigée</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-bold text-emerald-400">
                          {page.proposedDesc.length} car
                        </span>
                        <span className="text-[10px] text-emerald-400/70">120-155</span>
                      </div>
                    </div>
                  </div>

                  {/* Proposed Title String */}
                  <div className="text-xs">
                    <div className="text-[11px] text-slate-400 font-medium mb-0.5">Titre optimisé :</div>
                    <div className="text-slate-200 font-medium bg-slate-950/50 p-2 rounded border border-slate-800/60">
                      {page.proposedTitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live SERP Preview & Details Box (1 Col on XL) */}
        {selectedPageForPreview && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5 sticky top-24 self-start">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Simulateur SERP Google Live
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded cursor-pointer transition ${
                    previewDevice === 'desktop' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'
                  }`}
                  title="Aperçu Ordinateur"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded cursor-pointer transition ${
                    previewDevice === 'mobile' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'
                  }`}
                  title="Aperçu Mobile"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google SERP Card Preview */}
            <div className={`bg-white text-slate-900 rounded-xl p-4 shadow-md font-sans space-y-1.5 ${
              previewDevice === 'mobile' ? 'max-w-[320px] mx-auto' : ''
            }`}>
              <div className="flex items-center gap-2 text-xs text-[#202124]">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px]">
                  PE
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-medium">ProfEPS Maroc</span>
                  <span className="text-[11px] text-[#5f6368] font-mono">
                    https://profeps.ma{selectedPageForPreview.url}
                  </span>
                </div>
              </div>

              <h4 className="text-[#1a0dab] hover:underline text-base font-normal leading-snug cursor-pointer line-clamp-2">
                {selectedPageForPreview.proposedTitle}
              </h4>

              <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">
                {selectedPageForPreview.proposedDesc}
              </p>
            </div>

            {/* HTML Ready-to-paste Meta Tags */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                  Balises HTML Prêtes à l'Emploi
                </span>
                <button
                  onClick={() => {
                    const snippet = `<title>${selectedPageForPreview.proposedTitle}</title>\n<meta name="description" content="${selectedPageForPreview.proposedDesc}" />\n<meta name="robots" content="${selectedPageForPreview.isNoindex && selectedPageForPreview.noindexAction === 'keep-noindex' ? 'noindex, follow' : 'index, follow'}" />\n<link rel="canonical" href="https://profeps.ma${selectedPageForPreview.url}" />`;
                    copyText(snippet, `html-${selectedPageForPreview.id}`);
                  }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedKey === `html-${selectedPageForPreview.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier tout le bloc</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl font-mono text-xs text-slate-300 space-y-2 border border-slate-800 overflow-x-auto">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-emerald-400 select-all">
                    &lt;title&gt;{selectedPageForPreview.proposedTitle}&lt;/title&gt;
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-teal-300 select-all">
                    &lt;meta name="description" content="{selectedPageForPreview.proposedDesc}" /&gt;
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sky-300 select-all">
                    &lt;link rel="canonical" href="https://profeps.ma{selectedPageForPreview.url}" /&gt;
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-amber-300 select-all">
                    &lt;meta name="robots" content="{selectedPageForPreview.isNoindex && selectedPageForPreview.noindexAction === 'keep-noindex' ? 'noindex, follow' : 'index, follow'}" /&gt;
                  </span>
                </div>
              </div>
            </div>

            {/* Semantic Structure Outline */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/80 space-y-2 text-xs">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hiérarchie des Titres Recommandée :</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                {selectedPageForPreview.suggestedHeadingFix}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
