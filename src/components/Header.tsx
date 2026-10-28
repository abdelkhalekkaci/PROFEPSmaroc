import React from 'react';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'hub', label: 'Accueil · OP & Hub' },
    { id: 'crmef', label: '🎓 QCM Concours CRMEF (10 Qs)' },
    { id: 'cluster1', label: '1. VO2 Max · VDOT · ASR · IE' },
    { id: 'cluster2', label: '2. FC Karvonen · IMC · Météo' },
    { id: 'cluster3', label: '3. HIIT COD · Charge RPE' },
    { id: 'adsense', label: '★ Résolution AdSense' },
    { id: 'seo', label: 'Audit SEO' },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('hub')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-xs">
            PE
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight block leading-none">
              ProfEPS<span className="text-blue-600">.ma</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Clusters Scientifiques & Sport
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action Button -> HTML & PowerShell Exporter */}
        <div className="shrink-0">
          <button
            onClick={() => setActiveTab('export-html')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
              activeTab === 'export-html'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Code HTML & PowerShell</span>
          </button>
        </div>
      </div>
    </header>
  );
};
