import React from 'react';
import { ToolLang } from '../../utils/sportsScience';
import { Globe } from 'lucide-react';

interface ToolLanguageToggleProps {
  lang: ToolLang;
  setLang: (lang: ToolLang) => void;
}

export const ToolLanguageToggle: React.FC<ToolLanguageToggleProps> = ({ lang, setLang }) => {
  return (
    <div
      dir="ltr"
      className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg shadow-xs shrink-0"
      title="Traduction de l'outil / Tool Language / لغة الأداة"
    >
      <Globe className="w-3.5 h-3.5 text-blue-600 ml-1.5 mr-0.5 shrink-0" />
      {(['fr', 'en', 'ar'] as ToolLang[]).map(code => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isActive
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {code === 'ar' ? 'AR عربي' : code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};
