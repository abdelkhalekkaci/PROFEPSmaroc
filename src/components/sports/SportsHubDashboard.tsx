import React from 'react';
import {
  Activity,
  Heart,
  Dumbbell,
  ExternalLink,
  ArrowRight,
  Terminal,
  Gauge,
  BookOpen,
  CheckCircle2,
  FolderArchive,
  Zap,
  Facebook,
  Instagram,
} from 'lucide-react';
import { PedagogicalOrientationsBlock } from '../home/PedagogicalOrientationsBlock';
import { DigitalLibraryBlock } from '../home/DigitalLibraryBlock';

interface SportsHubDashboardProps {
  onNavigateTab: (tab: string) => void;
  globalVma: number;
  setGlobalVma: (vma: number) => void;
}

export const SportsHubDashboard: React.FC<SportsHubDashboardProps> = ({
  onNavigateTab,
  globalVma,
  setGlobalVma,
}) => {
  const pace100 = (3600 / (globalVma * 1000) * 1000).toFixed(0);
  const paceMinutes = Math.floor(Number(pace100) / 60);
  const paceSeconds = Math.round(Number(pace100) % 60);
  const formattedPace = `${paceMinutes}'${paceSeconds < 10 ? '0' : ''}${paceSeconds}"/km`;

  const pace85 = (globalVma * 0.85).toFixed(1);
  const pace65 = (globalVma * 0.65).toFixed(1);

  return (
    <div className="space-y-10">
      {/* 1. HERO SECTION — Palette officielle ProfEPS.ma (Bleu Roi, Blanc, Ardoise & Émeraude) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Activity className="w-4 h-4" />
              <span>Portail Officiel · ProfEPS Maroc (profeps.ma)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight text-balance">
              Écosystème Didactique de l’EPS, Textes Officiels & Calculateurs Sportifs
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              La plateforme de référence pour les enseignants d’EPS au Maroc : suite de calculateurs
              physiologiques pour l’entraînement, orientations pédagogiques ministérielles (2007 & 2009)
              et bibliothèque numérique didactique.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#bloc-calculateurs"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Accéder aux Calculateurs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#bloc-op"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Orientations Pédagogiques (OP)</span>
              </a>

              <a
                href="#bloc-biblio"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <FolderArchive className="w-4 h-4 text-emerald-600" />
                <span>Bibliothèque EPS</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Conforme Approche par Compétences (APC)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Direction des Curricula MENPS
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  VMA Éducative Globale
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                Synchro Tous Outils
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
                {globalVma.toFixed(1)}
              </span>
              <span className="text-base font-bold text-slate-500 ml-1.5">km/h</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Régler la VMA :</span>
                <span className="font-mono text-blue-600">{globalVma.toFixed(1)} km/h</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="24.0"
                step="0.1"
                value={globalVma}
                onChange={e => setGlobalVma(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>8.0 (Collège)</span>
                <span>15.0 (Lycée)</span>
                <span>24.0 (Élite)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Allure 100%</div>
                <div className="text-xs font-bold font-mono text-slate-800 mt-0.5">{formattedPace}</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Seuil (85%)</div>
                <div className="text-xs font-bold font-mono text-blue-600 mt-0.5">{pace85} km/h</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Endurance (65%)</div>
                <div className="text-xs font-bold font-mono text-emerald-600 mt-0.5">{pace65} km/h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION CALCULATEURS & GÉNÉRATEUR (PLACÉE DIRECTEMENT SOUS LE HERO) */}
      <section id="bloc-calculateurs" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Zap className="w-4 h-4" />
              <span>Suite Scientifique Didactique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Calculateurs Scientifiques & Générateur d’EPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Outils physiologiques calibrés selon les modèles scientifiques de référence (Billat, Cazorla,
              Péronnet, Karvonen, Foster) pour concevoir et réguler vos séances.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('cluster1')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Voir tous les modules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cluster 1 : VMA, VO2 Max, ASR & Péronnet */}
          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Activity className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Cluster 1</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">VMA, VO2 Max & Allures</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Calculs physiologiques complets du profil aérobie de l’élève et du coureur.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1A.</span>
                  <span><strong>Calculateur VMA & Allures :</strong> Vitesse en km/h, temps de passage et allures cibles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1B.</span>
                  <span><strong>VO2 Max & VDOT (Daniels) :</strong> Équivalences de performance et temps prédits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1C.</span>
                  <span><strong>Réserve de Vitesse (ASR) :</strong> Modèle de Buchheit pour l\'intermittent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1D.</span>
                  <span><strong>Indice d’Endurance (Péronnet) :</strong> Capacité à maintenir un % de VMA dans le temps.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster1')}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 1 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cluster 2 : Cardio, Santé, Météo & GAP */}
          <div className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Heart className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Cluster 2</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Cardio, Santé & Météo</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Zones de fréquence cardiaque, composition corporelle et facteurs environnementaux.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2A.</span>
                  <span><strong>Fréquence Cardiaque Karvonen :</strong> FC Réserve, FC Cible et 5 zones d\'intensité.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2B.</span>
                  <span><strong>IMC & Masse Grasse Sportif :</strong> Formule Deurenberg adaptée aux athlètes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2C.</span>
                  <span><strong>Chaleur, Météo & Altitude :</strong> Dérive cardiaque et ajustement en période chaude.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2D.</span>
                  <span><strong>Allure Pente (GAP) & Nutrition :</strong> Coût énergétique et hydratation.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster2')}
              className="mt-6 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 2 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cluster 3 : Intermittent HIIT, COD & Charge Foster */}
          <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
                <Dumbbell className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Cluster 3</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">HIIT, Relances & Charge</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Planification des séries de course intermittente et quantification de la charge d\'effort.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3A.</span>
                  <span><strong>Générateur Intermittent HIIT :</strong> Distances en 10s-10s, 15s-15s, 30s-30s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3B.</span>
                  <span><strong>Navettes COD 180° (Sports Co) :</strong> Calcul de relance biomécanique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3C.</span>
                  <span><strong>Charge sRPE Foster & ACWR :</strong> Monotonie, contrainte et ratio de charge.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster3')}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 3 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SECTION ORIENTATIONS PÉDAGOGIQUES (OP 2007 & OP 2009) */}
      <section id="bloc-op">
        <PedagogicalOrientationsBlock onNavigateTab={onNavigateTab} />
      </section>

      {/* 4. SECTION BIBLIOTHÈQUE NUMÉRIQUE EPS */}
      <section id="bloc-biblio">
        <DigitalLibraryBlock />
      </section>

      {/* 5. SECTION COMMUNAUTÉ — Liens Officiels Facebook & Instagram de ProfEPS Maroc (Sans WhatsApp ni Telegram) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Activity className="w-4 h-4" />
            <span>Communauté & Réseaux Sociaux</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Suivez ProfEPS Maroc sur les Réseaux Officiels
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Rejoignez la communauté active des enseignants d’EPS et étudiants CRMEF pour suivre les
            actualités, les nouvelles fiches didactiques et les partages d’expériences pédagogiques.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://www.facebook.com/profile.php?id=61559954402311"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span>Page Facebook ProfEPS</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          <a
            href="https://www.instagram.com/profeps.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram @profeps.ma</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </section>
    </div>
  );
};