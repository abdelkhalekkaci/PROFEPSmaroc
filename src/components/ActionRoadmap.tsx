import React, { useState } from 'react';
import { 
  ROADMAP_STEPS, 
  SEO_AUDIT_PAGES 
} from '../data/seoAuditData';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Flame, 
  ArrowRight, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface ActionRoadmapProps {
  completedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const ActionRoadmap: React.FC<ActionRoadmapProps> = ({
  completedTasks,
  toggleTask,
  onNavigateTab
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <Flame className="w-4 h-4" /> Plan Consolidé : Audit Expert + Search Console + Content Strategy
            </div>
            <h2 className="text-xl font-bold text-white">
              Feuille de Route d'Exécution : Des Urgences Immédiates aux Pages Piliers &amp; AdSense
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Phase A (Urgences U1 noindex OP &amp; U2 404 du pied de page résolues) → Phase B (Corrections techniques &amp; balises) → Phase C (Piliers &amp; contenu &gt; 800 mots) → Phase D (Conformité Google AdSense) → Phase E (Visibilité et marque ProfEPS Maroc).
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center flex-wrap">
            <button
              onClick={() => onNavigateTab('github')}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <span>Pousser vers GitHub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('noindex')}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <span>Étape 1 (Noindex)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {ROADMAP_STEPS.map((step) => {
          const isExpanded = expandedStep === step.step;
          const totalTasksInStep = step.tasks.length;
          const completedInStep = step.tasks.filter((_, idx) => completedTasks[`step-${step.step}-${idx}`]).length;
          const isStepDone = totalTasksInStep > 0 && completedInStep === totalTasksInStep;

          return (
            <div 
              key={step.step}
              className={`border rounded-xl transition overflow-hidden ${
                isStepDone 
                  ? 'border-emerald-500/40 bg-slate-900/60' 
                  : isExpanded 
                    ? 'border-slate-700 bg-slate-900/90 shadow-lg ring-1 ring-slate-700/50' 
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Step Header */}
              <div 
                onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                    isStepDone
                      ? 'bg-emerald-500 text-white'
                      : step.step === 1 || step.step === 2 || step.step === 3
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {isStepDone ? <Check className="w-4 h-4" /> : step.step}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white truncate">
                        Étape {step.step} - {step.title}
                      </h3>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        step.impact.includes('Très Élevé') 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : step.impact.includes('Élevé') 
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        Impact : {step.impact}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{step.time}</span>
                  </div>

                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    {completedInStep}/{totalTasksInStep}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Step Body (Expanded) */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-sm bg-slate-950/30">
                  <p className="text-slate-300 text-xs sm:text-sm">
                    {step.description}
                  </p>

                  {/* Step-specific guidance / actionable code presets */}
                  {step.step === 1 && (
                    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-amber-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Action requise pour les 13 pages noindex :
                      </div>
                      <p className="text-slate-300">
                        Dans l'en-tête HTML <code className="text-amber-200">&lt;head&gt;</code> de chaque page concernée, remplacez la directive restrictive :
                      </p>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between font-mono text-slate-300">
                        <code>&lt;meta name="robots" content="index, follow"&gt;</code>
                        <button
                          onClick={() => copyToClipboard('<meta name="robots" content="index, follow">', 'step1-tag')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'step1-tag' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copier
                        </button>
                      </div>
                      <button
                        onClick={() => onNavigateTab('noindex')}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold underline inline-flex items-center gap-1 text-xs mt-1 cursor-pointer"
                      >
                        Consulter la matrice détaillée des 13 pages avec décision recommandée &rarr;
                      </button>
                    </div>
                  )}

                  {step.step === 2 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-rose-300">
                        Règle de redirection 301 (.htaccess / Apache) pour les pages en doublon :
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between font-mono text-slate-300">
                        <code>Redirect 301 /article-s%C3%A9ance.html https://profeps.ma/article-structure-seance.html</code>
                        <button
                          onClick={() => copyToClipboard('Redirect 301 /article-s%C3%A9ance.html https://profeps.ma/article-structure-seance.html\nRedirect 301 /article-séance.html https://profeps.ma/article-structure-seance.html', 'step2-ht')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'step2-ht' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copier .htaccess
                        </button>
                      </div>
                    </div>
                  )}

                  {step.step === 3 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-purple-300">
                        Correction du gabarit de <span className="font-mono">blog.html</span> :
                      </div>
                      <p className="text-slate-300">
                        Gardez un unique <code className="text-purple-200">&lt;h1&gt;Blog ProfEPS : Actualités & Pédagogie&lt;/h1&gt;</code> et changez les balises des cartes d'articles de <code className="text-rose-300">&lt;h1&gt;</code> en <code className="text-emerald-300">&lt;h2 class="text-xl font-bold"&gt;</code>.
                      </p>
                    </div>
                  )}

                  {step.step === 4 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-sky-300">
                        Formule éprouvée pour les 80 balises <code className="font-mono">&lt;title&gt;</code> (50-60 car) :
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded font-mono text-sky-200 text-xs border border-slate-800">
                        [Mot-clé Principal] : [Bénéfice ou Spécificité] | ProfEPS
                      </div>
                      <p className="text-slate-400">
                        Exemple : <span className="text-emerald-300">"Échauffement EPS : Fiches & Exercices par Sport | ProfEPS" (56 car)</span>
                      </p>
                    </div>
                  )}

                  {step.step === 5 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-teal-300">
                        Formule pour les 81 balises <code className="font-mono">&lt;meta name="description"&gt;</code> (120-155 car) :
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded font-mono text-teal-200 text-xs border border-slate-800">
                        [Ce que la page apporte] + [Détail concret clé] + [Action courte: Découvrez / Téléchargez].
                      </div>
                      <p className="text-slate-400">
                        Exemple : <span className="text-emerald-300">"Guide de l'échauffement en EPS : phases cardio, articulaire et exercices ludiques. Téléchargez les fiches prêtes à l'emploi." (126 car)</span>
                      </p>
                    </div>
                  )}

                  {step.step === 6 && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                      <div className="font-semibold text-indigo-300">
                        Correction du saut de niveau d'en-tête (Heading skip sur 87 pages) :
                      </div>
                      <p className="text-slate-300">
                        Puisque 87 pages sur 92 ont cette anomalie, le saut provient du <strong>template partagé</strong> (Sidebar "Articles Récents", Footer ou Table des Matières). Modifiez la balise de ce sous-composant de <code className="text-rose-300">&lt;h3&gt;</code> ou <code className="text-rose-300">&lt;h4&gt;</code> vers le niveau consécutif requis (<code className="text-emerald-300">&lt;h2&gt;</code> si sous le H1).
                      </p>
                    </div>
                  )}

                  {/* Checklist of subtasks */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Actions à Cocher
                    </h4>
                    <div className="space-y-1.5">
                      {step.tasks.map((task, idx) => {
                        const taskId = `step-${step.step}-${idx}`;
                        const isDone = !!completedTasks[taskId];

                        return (
                          <div
                            key={taskId}
                            onClick={() => toggleTask(taskId)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg border transition cursor-pointer ${
                              isDone
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300 line-through'
                                : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <button className="mt-0.5 text-emerald-400 shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                            <span className="text-xs leading-relaxed">{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
