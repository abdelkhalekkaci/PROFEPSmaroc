import React, { useState } from 'react';
import {
  CALCULATOR_EDUCATIONAL_DATA,
  ToolEducationalContent,
} from '../../data/calculatorEducationalContent';
import {
  BookOpen,
  Calculator,
  Compass,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

interface CalculatorScientificCardProps {
  toolId: string;
  lang?: 'fr' | 'en' | 'ar';
}

export const CalculatorScientificCard: React.FC<CalculatorScientificCardProps> = ({
  toolId,
  lang = 'fr',
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullText, setShowFullText] = useState(true);
  const data: ToolEducationalContent | undefined = CALCULATOR_EDUCATIONAL_DATA[toolId];

  if (!data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.fullRawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const title = lang === 'en' ? data.titleEn : lang === 'ar' ? data.titleAr : data.titleFr;

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-7">
      {/* En-tête de la carte E-E-A-T */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
            <span className="text-red-700 font-bold">{data.badge}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              Rédigé par Abdelkhalek ELBOUDANI (Prof d'EPS au Maroc)
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-600 shrink-0" />
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md tabular-nums border border-emerald-200">
            {data.wordCount} mots (Guide Certifié)
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title={`Copier le guide complet (${data.wordCount} mots)`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copié ({data.wordCount} mots)</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copier le guide</span>
              </>
            )}
          </button>
          <a
            href={data.fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            title={`Ouvrir la page autonome ${data.fileName}`}
          >
            <span>Page HTML</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ZONE 2 : INTERPRÉTATION DES RÉSULTATS & BARÈMES SCOLAIRES (Placée immédiatement sous le calculateur) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Zone 2 : Interprétation Immédiate &amp; Barèmes Scolaires Marocains
          </h4>
          <span className="text-[11px] font-semibold text-slate-500">Repères terrain &amp; seuils de performance</span>
        </div>

        <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl text-xs text-slate-800 leading-relaxed space-y-2">
          <div className="font-bold text-amber-950 flex items-center gap-2">
            <span>Analyse personnalisée du profil moteur :</span>
          </div>
          <p>{data.interpretationSummary}</p>
        </div>

        {/* Grille des benchmarks de performance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.benchmarks.map((bench, idx) => {
            const toneColors = {
              emerald: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
              blue: 'border-blue-200 bg-blue-50/40 text-blue-900',
              amber: 'border-amber-200 bg-amber-50/40 text-amber-900',
              rose: 'border-rose-200 bg-rose-50/40 text-rose-900',
              slate: 'border-slate-200 bg-slate-50 text-slate-900',
            }[bench.tone || 'slate'];

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${toneColors} flex flex-col justify-between`}
              >
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-tight text-slate-500 mb-0.5">
                    {bench.label}
                  </div>
                  <div className="text-base font-black tabular-nums mb-1.5">
                    {bench.value}
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 leading-normal">
                  {bench.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ZONE 3 : TRAITÉ DIDACTIQUE & SITUATIONS DE TERRAIN EN EPS AU MAROC */}
      <section className="space-y-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Zone 3 : Application Didactique EPS Maroc &amp; Gestion de Terrain
          </h4>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Orientations MENPS 2007/2009
          </span>
        </div>

        {/* Étapes pas-à-pas de gestion sur le terrain */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.guideSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* Texte didactique complet rédigé par Abdelkhalek ELBOUDANI */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Manuel Didactique &amp; Situations de Classe ({data.wordCount} mots)
            </span>
            <button
              type="button"
              onClick={() => setShowFullText(!showFullText)}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1"
            >
              <span>{showFullText ? 'Réduire la lecture ▲' : 'Lire le traité intégral ▼'}</span>
            </button>
          </div>

          {showFullText && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans shadow-inner">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                <span>Auteur : Abdelkhalek ELBOUDANI</span>
                <span>·</span>
                <span>Professeur d'Éducation Physique et Sportive (Maroc)</span>
                <span>·</span>
                <span>Orientations Pédagogiques Officielles 2007-2009</span>
              </div>
              {data.fullRawText}
            </div>
          )}
        </div>
      </section>

      {/* ZONE 4 : FONDEMENTS PHYSIOLOGIQUES & RELATIONS MATHÉMATIQUES */}
      <section className="space-y-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-red-600" />
            Zone 4 : Fondements Physiologiques &amp; Relations Mathématiques
          </h4>
          <span className="text-[11px] font-semibold text-slate-500">Formules validées par les pairs</span>
        </div>

        <div className="p-5 bg-slate-950 text-white rounded-xl space-y-2.5 border border-slate-800 shadow-inner">
          <div className="text-[11px] text-slate-400 font-medium mb-1">
            Équations de calcul exactes implémentées dans le moteur ProfEPS.ma :
          </div>
          {data.mathFormulas.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1.5 border-b border-slate-800 last:border-0"
            >
              <span className="text-slate-300 font-medium">{item.label} :</span>
              <code className="text-emerald-400 font-mono font-semibold tracking-wide tabular-nums bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                {item.formula}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
