import React from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Layers, 
  EyeOff, 
  Copy, 
  Heading1,
  Compass
} from 'lucide-react';

interface StatsBannerProps {
  onSelectFilter: (filterKey: string) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ onSelectFilter }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Total Findings */}
      <div 
        onClick={() => onSelectFilter('all')}
        className="bg-slate-850/80 border border-slate-700/80 hover:border-emerald-500/50 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-slate-800/40 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Éléments</span>
          <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">265</span>
          <span className="text-xs text-slate-400">/ 92 pages</span>
        </div>
        <p className="text-[11px] text-emerald-400/80 mt-1 font-medium">0 erreurs 404/500</p>
      </div>

      {/* Noindex Pages */}
      <div 
        onClick={() => onSelectFilter('noindex')}
        className="bg-slate-850/80 border border-amber-500/30 hover:border-amber-500/60 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-amber-950/20 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Pages Noindex</span>
          <EyeOff className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-300">13</span>
          <span className="text-xs text-amber-400/80 font-semibold">Priorité 1</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">12 à dé-noindexer d'urgence</p>
      </div>

      {/* Duplicate Titles */}
      <div 
        onClick={() => onSelectFilter('duplicate')}
        className="bg-slate-850/80 border border-rose-500/30 hover:border-rose-500/60 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-rose-950/20 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Titres Dupliqués</span>
          <Copy className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-300">2</span>
          <span className="text-xs text-rose-400/80 font-semibold">Warning</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Rediriger 301 vers URL propre</p>
      </div>

      {/* Multiple H1s */}
      <div 
        onClick={() => onSelectFilter('multipleH1')}
        className="bg-slate-850/80 border border-purple-500/30 hover:border-purple-500/60 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-purple-950/20 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Multiples H1</span>
          <Heading1 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-300">4 H1</span>
          <span className="text-xs text-purple-400/80">sur blog.html</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">1 seul H1 par page HTML</p>
      </div>

      {/* Long Titles */}
      <div 
        onClick={() => onSelectFilter('longTitle')}
        className="bg-slate-850/80 border border-sky-500/30 hover:border-sky-500/60 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-sky-950/20 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">Titres Trop Longs</span>
          <AlertCircle className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-sky-300">80</span>
          <span className="text-xs text-slate-400">médiane 77c</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Cible : 50-60 caractères</p>
      </div>

      {/* Heading Skips */}
      <div 
        onClick={() => onSelectFilter('headingSkip')}
        className="bg-slate-850/80 border border-indigo-500/30 hover:border-indigo-500/60 p-3.5 rounded-xl transition cursor-pointer group bg-gradient-to-b from-indigo-950/20 to-slate-900/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Saut de Titres</span>
          <Compass className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-indigo-300">87</span>
          <span className="text-xs text-slate-400">pages</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">À fixer dans le template commun</p>
      </div>
    </div>
  );
};
