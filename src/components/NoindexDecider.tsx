import React, { useState } from 'react';
import { SEO_AUDIT_PAGES, PageAuditItem } from '../data/seoAuditData';
import { 
  EyeOff, 
  Eye, 
  Check, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles,
  Search,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';

interface NoindexDeciderProps {
  onMarkFixed: (pageId: string) => void;
  fixedPages: Record<string, boolean>;
}

export const NoindexDecider: React.FC<NoindexDeciderProps> = ({
  onMarkFixed,
  fixedPages
}) => {
  const noindexPages = SEO_AUDIT_PAGES.filter(p => p.isNoindex);
  const [decisions, setDecisions] = useState<Record<string, 'index' | 'noindex'>>(() => {
    const init: Record<string, 'index' | 'noindex'> = {};
    noindexPages.forEach(p => {
      init[p.id] = p.noindexAction === 'un-noindex' ? 'index' : 'noindex';
    });
    return init;
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggle = (id: string, decision: 'index' | 'noindex') => {
    setDecisions(prev => ({ ...prev, [id]: decision }));
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const indexCount = Object.values(decisions).filter(d => d === 'index').length;
  const keepNoindexCount = Object.values(decisions).filter(d => d === 'noindex').length;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
              <AlertTriangle className="w-4 h-4" /> Étape 1 : Arbitrage des 13 Pages en `noindex`
            </div>
            <h2 className="text-xl font-bold text-white">
              Débloquez le Référencement des Pages Concours & Q&A Stratégiques
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Une balise <code className="text-amber-300 font-mono">noindex</code> ordonne expressément aux moteurs de recherche de ne pas indexer la page. La grande majorité de ces 13 pages contiennent des sujets très recherchés par les enseignants d'EPS (CRMEF, Examen Pro, Inspection, Barème Bac).
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl">
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-xl font-black text-emerald-400">{indexCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">À Indexer</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-amber-400">{keepNoindexCount}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">À Garder Noindex</div>
            </div>
          </div>
        </div>
      </div>

      {/* Code replacement helper */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-xs text-slate-300">
          <span className="font-semibold text-white">Action dans le code HTML de la page :</span>
          <p>
            Remplacer <code className="text-red-400 font-mono">&lt;meta name="robots" content="noindex, follow"&gt;</code> par :
          </p>
        </div>
        <div className="flex items-center gap-2">
          <code className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded font-mono text-emerald-400 text-xs">
            &lt;meta name="robots" content="index, follow"&gt;
          </code>
          <button
            onClick={() => copyCode('<meta name="robots" content="index, follow">', 'global-index-tag')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedId === 'global-index-tag' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copier la balise
          </button>
        </div>
      </div>

      {/* 13 Pages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {noindexPages.map((page, idx) => {
          const currentDecision = decisions[page.id] || 'index';
          const isDone = !!fixedPages[page.id];

          return (
            <div 
              key={page.id}
              className={`border rounded-xl p-4 transition ${
                currentDecision === 'index'
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-amber-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-mono text-xs font-semibold text-emerald-400 break-all">
                    {page.url}
                  </span>
                </div>
                <button
                  onClick={() => onMarkFixed(page.id)}
                  className={`p-1.5 rounded-lg border transition text-xs flex items-center gap-1 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                  title={isDone ? 'Marqué comme résolu' : 'Marquer comme résolu'}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">{isDone ? 'Fait' : 'À faire'}</span>
                </button>
              </div>

              {/* Decision Toggle */}
              <div className="mt-3 flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleToggle(page.id, 'index')}
                  className={`flex-1 py-1 px-2.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    currentDecision === 'index'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Index it (Recommandé)</span>
                </button>
                <button
                  onClick={() => handleToggle(page.id, 'noindex')}
                  className={`flex-1 py-1 px-2.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    currentDecision === 'noindex'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Keep noindex</span>
                </button>
              </div>

              {/* Rationale & Action Plan */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                    Justification & Potentiel SEO :
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {page.noindexReason}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-slate-400">Titre optimisé (50-60 car) :</div>
                  <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-slate-200 border border-slate-800/80 flex items-center justify-between">
                    <span className="truncate pr-2">{page.proposedTitle}</span>
                    <span className="text-[10px] text-emerald-400 shrink-0 font-bold">
                      {page.proposedTitle.length} car
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-slate-400">Méta-description optimisée (120-155 car) :</div>
                  <div className="p-2 bg-slate-950 rounded text-[11px] text-slate-300 border border-slate-800/80 flex items-center justify-between">
                    <span className="line-clamp-2 pr-2">{page.proposedDesc}</span>
                    <span className="text-[10px] text-emerald-400 shrink-0 font-bold self-start">
                      {page.proposedDesc.length} car
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
