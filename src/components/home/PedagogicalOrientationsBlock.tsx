import React, { useState } from 'react';
import { OP_DOCUMENTS, OpDocument } from '../../data/pedagogicalData';
import {
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Layers,
  ChevronRight,
  Download,
} from 'lucide-react';

interface PedagogicalOrientationsBlockProps {
  onNavigateTab?: (tab: string) => void;
}

export const PedagogicalOrientationsBlock: React.FC<PedagogicalOrientationsBlockProps> = ({
  onNavigateTab,
}) => {
  const [selectedCycle, setSelectedCycle] = useState<'all' | 'college' | 'lycee'>('all');
  const [activePreviewDoc, setActivePreviewDoc] = useState<OpDocument | null>(null);

  const displayedDocs =
    selectedCycle === 'all'
      ? OP_DOCUMENTS
      : OP_DOCUMENTS.filter(doc => doc.cycle === selectedCycle);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Cadre Didactique & Textes Ministériels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Orientations Pédagogiques EPS Maroc (2007 · 2009)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Consultez les référentiels officiels du Ministère de l’Éducation Nationale pour bâtir vos
            cycles d’apprentissage, fiches de séance et évaluations certificatives.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedCycle('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCycle === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tous les Cycles
          </button>
          <button
            type="button"
            onClick={() => setSelectedCycle('college')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCycle === 'college'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Collège (OP 2009)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCycle('lycee')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCycle === 'lycee'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lycée (OP 2007)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedDocs.map(doc => {
          const isLycee = doc.cycle === 'lycee';
          return (
            <div
              key={doc.id}
              className={`relative bg-white border rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md ${
                isLycee ? 'hover:border-blue-300' : 'hover:border-emerald-300'
              } border-slate-200`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isLycee
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}
                  >
                    {isLycee ? (
                      <GraduationCap className="w-6 h-6" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${doc.colorScheme.badgeBg}`}
                    >
                      {doc.statusBadge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                      {isLycee
                        ? 'Cycle Secondaire Qualifiant (Lycée)'
                        : 'Cycle Secondaire Collégial (Collège)'}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
                  {doc.year}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {doc.description}
              </p>

              <div className="space-y-2 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Compétences Cibles & Piliers APC</span>
                </div>
                <ul className="space-y-1.5">
                  {doc.keyCompetencies.slice(0, 3).map((comp, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          isLycee ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}
                      />
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Architecture des Modules</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {doc.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-medium text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80 flex items-center justify-between"
                    >
                      <span className="truncate">{mod}</span>
                      <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(doc)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consulter la Synthèse</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Officiel</span>
                  </a>

                  {onNavigateTab ? (
                    <button
                      type="button"
                      onClick={() => onNavigateTab('cluster1')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors ${
                        isLycee ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      <span>Appliquer aux Cycles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={doc.pageUrl}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-xs transition-colors ${
                        isLycee ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      <span>Détails Complets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md mb-2">
                  {activePreviewDoc.statusBadge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activePreviewDoc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activePreviewDoc.officialRef}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-b border-slate-100 py-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Compétences Générales Visées
              </h4>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-600">
                {activePreviewDoc.keyCompetencies.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-900 flex items-center gap-2 pt-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Modules Didactiques Détaillés
              </h4>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-600">
                {activePreviewDoc.modules.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Fermer
              </button>
              <a
                href={activePreviewDoc.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Document MENPS</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};