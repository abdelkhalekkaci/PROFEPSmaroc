import fs from 'fs';
import path from 'path';
import { TOOLS_800_WORDS } from './generer-textes-800-mots.mjs';

const rootDir = process.cwd();

// 1. Mettre à jour src/data/calculatorEducationalContent.ts
const tsContent = `/**
 * Fiches Documentaires & Guides Scientifiques Complets pour les 10 Calculateurs Sport ProfEPS.ma
 * Calibrés rigoureusement à PLUS DE 800 MOTS PAR OUTIL (800 à 1 250 mots).
 * Contient : Guide d'utilisation, Relations mathématiques, Données requises et Interprétation des résultats.
 */

export interface MathFormulaItem {
  label: string;
  formula: string;
}

export interface BenchmarkItem {
  label: string;
  value: string;
  desc: string;
  tone?: 'emerald' | 'blue' | 'amber' | 'rose' | 'slate';
}

export interface ToolEducationalContent {
  id: string;
  fileName: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  badge: string;
  guideSteps: string[];
  mathFormulas: MathFormulaItem[];
  interpretationSummary: string;
  benchmarks: BenchmarkItem[];
  fullRawText: string;
  charCount: number;
  wordCount: number;
}

export const CALCULATOR_EDUCATIONAL_DATA: Record<string, ToolEducationalContent> = ${JSON.stringify(TOOLS_800_WORDS, null, 2)};
`;

fs.writeFileSync(path.join(rootDir, 'src/data/calculatorEducationalContent.ts'), tsContent, 'utf-8');
console.log('✅ src/data/calculatorEducationalContent.ts mis à jour avec les 10 guides de 800+ mots.');

// 2. Mettre à jour les 10 fichiers HTML autonomes
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtmlCard(tool) {
  const stepsHtml = tool.guideSteps.map((step, idx) => `
        <div class="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3">
          <span class="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
          <p class="text-xs text-slate-700 leading-relaxed m-0">${escapeHtml(step)}</p>
        </div>`).join('');

  const formulasHtml = tool.mathFormulas.map((f) => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1 border-b border-slate-800 last:border-0">
          <span class="text-slate-400 font-medium">${escapeHtml(f.label)} :</span>
          <code class="text-emerald-400 font-mono font-semibold tracking-wide tabular-nums bg-slate-800/80 px-2 py-0.5 rounded">${escapeHtml(f.formula)}</code>
        </div>`).join('');

  const benchmarksHtml = tool.benchmarks.map((b) => `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <div class="text-[11px] font-bold uppercase tracking-tight text-slate-500 mb-0.5">${escapeHtml(b.label)}</div>
            <div class="text-sm font-extrabold tabular-nums mb-1 text-slate-900">${escapeHtml(b.value)}</div>
          </div>
          <div class="text-[11px] text-slate-600 leading-normal">${escapeHtml(b.desc)}</div>
        </div>`).join('');

  const escapedRawText = JSON.stringify(tool.fullRawText);

  return `<!-- FICHE SCIENTIFIQUE & PÉDAGOGIQUE OFFICIELLE (${tool.wordCount} MOTS MINIMUM) -->
    <section class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mt-8" id="fiche-pedagogique-officielle" style="max-width:48rem;margin:2rem auto 0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:1.75rem;box-shadow:0 10px 28px -8px rgba(15,23,42,0.06);">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span class="text-red-700 font-bold">${escapeHtml(tool.badge)}</span>
            <span aria-hidden="true">·</span>
            <span>Guide Didactique &amp; Scientifique Complet</span>
          </div>
          <h2 class="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 m-0">
            <span style="font-size:1.15rem;">📘</span>
            ${escapeHtml(tool.titleFr)}
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md tabular-nums border border-emerald-200">
            ${tool.wordCount} mots (Guide Approfondi)
          </span>
          <button type="button" onclick="copierFichePedagogique()" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200" title="Copier le guide officiel complet (${tool.wordCount} mots)">
            <span id="btn-copy-ico">📋</span>
            <span id="btn-copy-txt">Copier le guide complet</span>
          </button>
        </div>
      </div>

      <!-- 1. Guide d'utilisation pas-à-pas -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#006233;">🧭</span>
          1. Guide d'utilisation pas-à-pas &amp; Protocoles terrain
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${stepsHtml}
        </div>
      </div>

      <!-- 2. Relations mathématiques en exergue -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#c1272d;">📐</span>
          2. Relations mathématiques &amp; Équations biomécaniques
        </h3>
        <div class="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-inner">
          ${formulasHtml}
        </div>
      </div>

      <!-- 3. Interprétation des résultats & repères terrain -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#d97706;">💡</span>
          3. Interprétation des résultats &amp; Seuils d'entraînement
        </h3>
        <p class="text-xs text-slate-700 leading-relaxed bg-amber-50/60 border border-amber-200/70 p-3.5 rounded-xl m-0">
          ${escapeHtml(tool.interpretationSummary)}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          ${benchmarksHtml}
        </div>
      </div>

      <!-- 4. Traité Scientifique & Pédagogique Intégral (+800 mots) -->
      <div class="space-y-3 pt-2 border-t border-slate-100">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
            <span style="color:#2563eb;">📖</span>
            4. Manuel Scientifique &amp; Didactique Détaillé (${tool.wordCount} mots)
          </h3>
          <button type="button" onclick="toggleTexteIntegral()" id="btn-toggle-texte" class="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
            Afficher le texte complet ▼
          </button>
        </div>
        
        <div id="bloc-texte-integral" class="hidden p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
${escapeHtml(tool.fullRawText)}
        </div>
      </div>
    </section>

    <script>
      function toggleTexteIntegral() {
        var el = document.getElementById('bloc-texte-integral');
        var btn = document.getElementById('btn-toggle-texte');
        if (el && btn) {
          if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            btn.textContent = 'Masquer le texte complet ▲';
          } else {
            el.classList.add('hidden');
            btn.textContent = 'Afficher le texte complet ▼';
          }
        }
      }

      function copierFichePedagogique() {
        var texte = ${escapedRawText};
        navigator.clipboard.writeText(texte).then(function() {
          var ico = document.getElementById('btn-copy-ico');
          var txt = document.getElementById('btn-copy-txt');
          if (ico && txt) {
            ico.textContent = '✓';
            txt.textContent = 'Guide copié (${tool.wordCount} mots) !';
            setTimeout(function() {
              ico.textContent = '📋';
              txt.textContent = 'Copier le guide complet';
            }, 2500);
          }
        });
      }
    </script>`;
}

// Remplacer ou insérer la fiche pédagogique dans chaque fichier HTML
for (const tool of Object.values(TOOLS_800_WORDS)) {
  const filePath = path.join(rootDir, tool.fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Fichier introuvable : ${tool.fileName}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  const cardHtml = buildHtmlCard(tool);

  if (content.includes('id="fiche-pedagogique-officielle"')) {
    // Remplacer l'ancienne section
    content = content.replace(
      /<!-- FICHE SCIENTIFIQUE & PÉDAGOGIQUE OFFICIELLE[\s\S]*?<\/section>\s*<script>[\s\S]*?<\/script>/,
      cardHtml
    );
  } else {
    // Insérer avant </main>
    content = content.replace('</main>', `  ${cardHtml}\n  </main>`);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${tool.fileName} mis à jour (${tool.wordCount} mots intégrés).`);
}

console.log('--- TOUS LES FICHIERS HTML ET DONNÉES REACT SONT SYNCHRONISÉS À 800+ MOTS ---');
