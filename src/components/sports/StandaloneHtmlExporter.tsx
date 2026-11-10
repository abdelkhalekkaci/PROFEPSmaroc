import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, FileCode, Play, Layers, Eye } from 'lucide-react';
import generer10OutilsScript from '../../../generer-10-outils.js?raw';
import unifierNavbarFooterScript from '../../../unifier-navbar-footer.js?raw';

import htmlVma from '../../../calculateur-vma.html?raw';
import htmlVdot from '../../../calculateur-vdot-asr-endurance.html?raw';
import htmlKarvonen from '../../../calculateur-frequence-cardiaque-karvonen.html?raw';
import htmlImc from '../../../calculateur-imc-sportif-masse-grasse.html?raw';
import htmlMeteo from '../../../calculateur-chaleur-meteo-altitude.html?raw';
import htmlHiit from '../../../generateur-intermittent-hiit-cod.html?raw';
import htmlRpe from '../../../calculateur-charge-rpe-foster-acwr.html?raw';
import htmlAsr from '../../../calculateur-asr-reserve-vitesse.html?raw';
import htmlIe from '../../../calculateur-indice-endurance.html?raw';
import htmlGap from '../../../calculateur-gap-pente-nutrition.html?raw';
import htmlHub from '../../../hub-outils-sport-performance.html?raw';

export interface StandaloneToolSpec {
  id: string;
  cluster: string;
  filename: string;
  titleFr: string;
  descFr: string;
  htmlCode: string;
}

const STANDALONE_TOOLS_LIST: StandaloneToolSpec[] = [
  {
    id: 'vma',
    cluster: 'Outil Phare · Vitesse Maximale Aérobie',
    filename: 'calculateur-vma.html',
    titleFr: 'Calculateur de VMA, Tests Terrain & Allures',
    descFr: 'Tests Demi-Cooper, Luc-Léger et VAMEVAL, tableau des 5 allures d’entraînement, fiche pédagogique (893 car.) et CTA responsive.',
    htmlCode: htmlVma,
  },
  {
    id: 'imc',
    cluster: 'Cluster 2 · Composition Corporelle & Barème OMS',
    filename: 'calculateur-imc-sportif-masse-grasse.html',
    titleFr: 'Calculateur IMC, Masse Grasse (IMG) & Barème Normal/Anormal',
    descFr: '4 entrées alignées (sans séances/semaine), barème IMC normal vs anormal OMS & Sport, bouton CTA style VMA et guide SEO.',
    htmlCode: htmlImc,
  },
  {
    id: 'vdot',
    cluster: 'Cluster 1 · Physiologie Aérobie',
    filename: 'calculateur-vdot-asr-endurance.html',
    titleFr: 'Calculateur VO2 Max, VMA & VDOT (Jack Daniels)',
    descFr: 'Estimez votre VO2 Max, équivalences du 1500m au Marathon, interprétation par chiffre et guide d’utilisation SEO.',
    htmlCode: htmlVdot,
  },
  {
    id: 'karvonen',
    cluster: 'Cluster 2 · Cardiologie Sportive',
    filename: 'calculateur-frequence-cardiaque-karvonen.html',
    titleFr: 'Calculateur Fréquence Cardiaque (Karvonen) & 5 Zones',
    descFr: 'FC Max (Tanaka/Gellish/Astrand), FC de Réserve, diagnostic FC repos, 5 zones cibles et guide SEO.',
    htmlCode: htmlKarvonen,
  },
  {
    id: 'meteo',
    cluster: 'Cluster 2 · Thermorégulation & Hypoxie',
    filename: 'calculateur-chaleur-meteo-altitude.html',
    titleFr: 'Calculateur Chaleur, Humidité, Vent & Altitude',
    descFr: 'Ajustement d’allure thermique et hypoxique, point de rosée, hydratation/sodium et guide SEO.',
    htmlCode: htmlMeteo,
  },
  {
    id: 'hiit',
    cluster: 'Cluster 3 · Programmation Terrain & EPS',
    filename: 'generateur-intermittent-hiit-cod.html',
    titleFr: 'Générateur Intermittent HIIT (30/30, 15/15) & Navette COD 180°',
    descFr: 'Distances exactes en mètres avec pénalité de virage 180°, charge métabolique et guide SEO.',
    htmlCode: htmlHiit,
  },
  {
    id: 'rpe',
    cluster: 'Cluster 3 · Monitoring & Prévention Blessures',
    filename: 'calculateur-charge-rpe-foster-acwr.html',
    titleFr: 'Calculateur Charge RPE (Foster) & Ratio ACWR',
    descFr: 'Unités arbitraires sRPE, ratio aigu:chronique (Sweet Spot 0.80–1.30) et guide SEO.',
    htmlCode: htmlRpe,
  },
  {
    id: 'asr',
    cluster: 'Cluster 1 · Profilage Neuromusculaire',
    filename: 'calculateur-asr-reserve-vitesse.html',
    titleFr: 'Calculateur Réserve de Vitesse Anaérobie (ASR)',
    descFr: 'Ratio Sprint Max / VMA (Méthode Buchheit & Sandford), profilage Diesel/Hybride/Explosif et guide SEO.',
    htmlCode: htmlAsr,
  },
  {
    id: 'ie',
    cluster: 'Cluster 1 · Modélisation Aérobie',
    filename: 'calculateur-indice-endurance.html',
    titleFr: 'Calculateur Indice d’Endurance (Modèle Péronnet & Thibault)',
    descFr: 'Pente de maintien de %VMA sur la durée, diagnostic d’endurance et guide SEO.',
    htmlCode: htmlIe,
  },
  {
    id: 'gap',
    cluster: 'Cluster 2 · Biomécanique Trail & Énergétique',
    filename: 'calculateur-gap-pente-nutrition.html',
    titleFr: 'Calculateur Allure Ajustée à la Pente (GAP) & Nutrition',
    descFr: 'Modèle Minetti (coût énergétique montée/descente), glucides/h et guide SEO.',
    htmlCode: htmlGap,
  },
  {
    id: 'hub',
    cluster: 'Hub Central · 10 Outils Sport & EPS',
    filename: 'hub-outils-sport-performance.html',
    titleFr: 'Hub de Tous les Calculateurs Sport, VMA, IMC & EPS',
    descFr: 'Portail central regroupant tous les calculateurs avec guide de parcours complet et FAQ SEO.',
    htmlCode: htmlHub,
  },
];

export const StandaloneHtmlExporter: React.FC<{ initialToolId?: string }> = ({ initialToolId }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(() => {
    if (initialToolId === 'cluster1') return 1;
    if (initialToolId === 'cluster3') return 4;
    return 0; // Default to VMA/IMC Calculator
  });
  const currentTool = STANDALONE_TOOLS_LIST[selectedIdx] || STANDALONE_TOOLS_LIST[0];
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedPsAllInOne, setCopiedPsAllInOne] = useState(false);
  const [copiedScript1, setCopiedScript1] = useState(false);
  const [copiedScript2, setCopiedScript2] = useState(false);

  const dualScriptsCommand = `node appliquer-textes-pedagogiques-10-outils.mjs ; node unifier-navbar-footer.js`;

  const toBase64Utf8 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  };

  const copyPowerShellAllInOne = () => {
    const b64Script1 = toBase64Utf8(generer10OutilsScript);
    const b64Script2 = toBase64Utf8(unifierNavbarFooterScript);
    const psCmd = `[IO.File]::WriteAllBytes("$PWD\\generer-10-outils.js", [Convert]::FromBase64String("${b64Script1}")); [IO.File]::WriteAllBytes("$PWD\\unifier-navbar-footer.js", [Convert]::FromBase64String("${b64Script2}")); node generer-10-outils.js; node unifier-navbar-footer.js`;
    navigator.clipboard.writeText(psCmd);
    setCopiedPsAllInOne(true);
    setTimeout(() => setCopiedPsAllInOne(false), 3000);
  };

  const copyToClipboard = (text: string, type: 'html' | 'cmd' | 'script1' | 'script2') => {
    navigator.clipboard.writeText(text);
    if (type === 'html') {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } else if (type === 'cmd') {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } else if (type === 'script1') {
      setCopiedScript1(true);
      setTimeout(() => setCopiedScript1(false), 2000);
    } else if (type === 'script2') {
      setCopiedScript2(true);
      setTimeout(() => setCopiedScript2(false), 2000);
    }
  };

  const downloadTextFile = (content: string, filename: string, mime = 'application/javascript;charset=utf-8') => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHtmlFile = () => {
    downloadTextFile(currentTool.htmlCode, currentTool.filename, 'text/html;charset=utf-8');
  };

  return (
    <div className="space-y-6">
      {/* Banner explaining the 2 separate scripts + 1-click PowerShell installer */}
      <div className="bg-emerald-950 text-white border border-emerald-800 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
              <Layers className="w-4 h-4" />
              <span>Installation & Exécution Directe pour PowerShell Windows</span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              Mettez à jour vos 10 pages localement en 1 clic (Design VMA, Alignement, Barème IMC & Guides SEO)
            </h2>
            <p className="text-xs text-emerald-200 max-w-3xl leading-relaxed">
              Cliquez sur le bouton vert ci-contre puis faites <strong>Clic-droit / Coller + Entrée</strong> dans votre PowerShell ouvert dans <code className="text-white font-mono">C:\Users\thinkpad\Desktop\PROFEPS\PROFEPSmaroc-main</code> : il écrit automatiquement la nouvelle version de <code className="text-white font-mono">generer-10-outils.js</code> et <code className="text-white font-mono">unifier-navbar-footer.js</code> sur votre disque puis les exécute immédiatement !
            </p>
          </div>
          <button
            type="button"
            onClick={copyPowerShellAllInOne}
            className="px-5 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-2.5 shrink-0 cursor-pointer shadow-lg transition-all"
          >
            {copiedPsAllInOne ? <Check className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>
              {copiedPsAllInOne
                ? '✅ Commande PowerShell copiée ! Collez-la dans votre terminal'
                : '⚡ 1-CLIC : Copier la Commande PowerShell (Crée + Exécute les 2 Scripts)'}
            </span>
          </button>
        </div>

        {/* Individual Script Cards (Download or Copy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-emerald-800/70">
          <div className="bg-slate-950/80 border border-emerald-800/60 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Script 1 · Les 10 Outils Sportifs + Guides SEO</div>
              <div className="text-sm font-extrabold text-white font-mono mt-0.5">generer-10-outils.js</div>
              <p className="text-xs text-slate-300 mt-1">
                Inclut l’IMC sans séances/semaine + barème officiel Normal/Anormal, l’alignement strict des cases, le bouton CTA style VMA et le Guide d’Utilisation + Mots-Clés SEO sur chaque page.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => downloadTextFile(generer10OutilsScript, 'generer-10-outils.js')}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger generer-10-outils.js</span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(generer10OutilsScript, 'script1')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedScript1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript1 ? 'Code copié !' : 'Copier le code'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-800/60 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Script 2 · Navbar & Footer 5 Colonnes</div>
              <div className="text-sm font-extrabold text-white font-mono mt-0.5">unifier-navbar-footer.js</div>
              <p className="text-xs text-slate-300 mt-1">
                Unifie la Navbar (police équilibrée, menu déroulant, 1 seul traducteur) et le Footer 5 colonnes anti-Tailwind sur tout le site sans toucher aux scripts de calcul.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => downloadTextFile(unifierNavbarFooterScript, 'unifier-navbar-footer.js')}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger unifier-navbar-footer.js</span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(unifierNavbarFooterScript, 'script2')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedScript2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript2 ? 'Code copié !' : 'Copier le code'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/90 border border-emerald-800/60 p-3 rounded-xl">
          <div className="text-xs text-slate-300">
            Si vous téléchargez les 2 fichiers dans <code className="text-emerald-300">C:\Users\thinkpad\Desktop\PROFEPS\PROFEPSmaroc-main</code>, lancez :
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-emerald-300 bg-slate-900 px-2.5 py-1 rounded">
              {dualScriptsCommand}
            </code>
            <button
              type="button"
              onClick={() => copyToClipboard(dualScriptsCommand, 'cmd')}
              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {copiedCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd ? 'Copié' : 'Copier'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tool Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Terminal className="w-4 h-4" />
              <span>Sélecteur & Aperçu en Direct des 10 Pages Générées</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {currentTool.titleFr}
            </h1>
            <p className="text-xs text-slate-600">{currentTool.descFr}</p>
          </div>
          <button
            type="button"
            onClick={downloadHtmlFile}
            className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger {currentTool.filename}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
          {STANDALONE_TOOLS_LIST.map((tool, idx) => {
            const active = idx === selectedIdx;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-red-50 border-red-700 text-slate-950 shadow-xs ring-2 ring-red-700/15'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider line-clamp-1">{tool.cluster}</div>
                  <div className="text-xs font-extrabold mt-0.5 line-clamp-2">{tool.titleFr}</div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-2 truncate">{tool.filename}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Preview of the Selected HTML Page */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-slate-900 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Aperçu Interactif en Direct :</span>
            <code className="text-emerald-300 font-mono">{currentTool.filename}</code>
          </div>
          <span className="text-[11px] text-slate-300">
            Testez le bouton « Calculer », le barème IMC Normal/Anormal et le Guide d’Utilisation SEO ci-dessous
          </span>
        </div>
        <iframe
          key={currentTool.filename}
          title={currentTool.titleFr}
          srcDoc={currentTool.htmlCode}
          className="w-full h-[920px] border-0 bg-slate-50"
        />
      </div>

      {/* Raw HTML Code Block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-red-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Code HTML Autonome — <span className="font-mono text-red-700">{currentTool.filename}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(currentTool.htmlCode, 'html')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHtml ? 'Code HTML Copié !' : 'Copier Code HTML'}</span>
          </button>
        </div>
        <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96 leading-relaxed">
          {currentTool.htmlCode}
        </pre>
      </div>
    </div>
  );
};
