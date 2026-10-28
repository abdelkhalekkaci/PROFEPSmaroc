import re

# ==============================================================================
# 1. UPDATE qcm-didactique-eps-maroc.html
# ==============================================================================
with open('public/qcm-didactique-eps-maroc.html', 'r', encoding='utf-8') as f:
    didac = f.read()

# Tab title
didac = didac.replace(
    '<span>📚 Référentiel Complet (40 Questions)</span>',
    '<span>🏛️ 2. Cadre Référentiel CNEE & Exploration</span>'
)

# view-mode-bank
old_bank_marker = '<div id="view-mode-bank" class="hidden space-y-6">'
if old_bank_marker in didac:
    idx_start = didac.index(old_bank_marker)
    idx_end = didac.index('</main>', idx_start)
    
    new_bank_section = '''<div id="view-mode-bank" class="hidden space-y-6">
      
      <!-- Présentation du Cadre Officiel CNEE -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl font-black">
            🏛️
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-black text-slate-900">
              Cadre de Référence Officiel · Didactique de l'EPS (CNEE / OP 2007-2009)
            </h2>
            <p class="text-xs text-slate-500 font-arabic text-right dir-rtl">المركز الوطني للتقويم والامتحانات والتوجيه · التوصيف الرسمي لاختبار ديداكتيك مادة التربية البدنية والرياضية</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 1 : Compétences Motrices & Traitement Didactique des APSA</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">35%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Transposition didactique des APSA scolaires, logiques internes des familles d'activités (athlétique, gymnique, sports collectifs, duels de raquette), transformation des conduites motrices et mobilisations des ressources bioénergétiques, biomécaniques et socio-affectives.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 2 : Ingénierie Pédagogique, OTI, OTC & Fiches de Séance</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">25%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Formulation des Objectifs Terminaux d'Intégration (OTI), Objectifs Terminaux de Cycle (OTC), planification en cycles de 10 à 12 séances, structure ternaire de la séance EPS (mise en train, corps de séance, retour au calme) et différenciation pédagogique.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 3 : Évaluation Critériée Certificative & Remédiation TaRL</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">20%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Dispositifs d'évaluation diagnostique, formative et certificative selon les circulaires ministérielles EPS (Performance motrice, maîtrise technique, rôles sociaux et arbitrage), indicateurs observables et remédiation active TaRL.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 4 : Sécurité Active/Passive, Parade & Déontologie</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">20%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Gestion rigoureuse de la sécurité en milieu sportif scolaire : parade active en gymnastique, gestion de l'effort et de la météo en athlétisme, respect du matériel et conformité réglementaire, responsabilité civile et pénale de l'enseignant.
            </p>
          </div>
        </div>
      </div>

      <!-- Recherche & Exploration de la Banque Complète -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-base font-extrabold text-slate-900">Banque Officielle des Questions de Référence CNEE</h3>
            <p class="text-xs text-slate-500">Explorez et entraînez-vous sur les questions du cadre officiel sans réponses pré-cochées.</p>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input type="text" id="bank-search-input" oninput="filterBankQuestions()" placeholder="Rechercher une notion (ex: OTI, transposition, parade)..." class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 w-full sm:w-64 focus:outline-hidden focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all">
            <select id="bank-filter-theme" onchange="filterBankQuestions()" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-700 cursor-pointer">
              <option value="ALL">Tous les thèmes</option>
            </select>
          </div>
        </div>

        <div id="bank-questions-container" class="space-y-4">
          <!-- Populated by JS -->
        </div>
      </div>

    </div>
  '''
    didac = didac[:idx_start] + new_bank_section + didac[idx_end:]

# Replace filterBankQuestions function in JS
new_didac_filter_fn = '''function filterBankQuestions() {
      const themeFilter = document.getElementById('bank-filter-theme').value;
      const searchTxt = (document.getElementById('bank-search-input')?.value || '').trim().toLowerCase();
      const container = document.getElementById('bank-questions-container');
      container.innerHTML = '';

      const filtered = EPS_DIDACTIQUE_BANK.filter(q => {
        const matchTheme = (themeFilter === 'ALL' || q.theme === themeFilter);
        const matchSearch = !searchTxt || 
          q.question.toLowerCase().includes(searchTxt) ||
          q.explanation.toLowerCase().includes(searchTxt) ||
          q.reference.toLowerCase().includes(searchTxt);
        return matchTheme && matchSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">Aucune question ne correspond à votre recherche.</div>';
        return;
      }

      filtered.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-left transition-all';
        card.id = `bank-item-${q.id}`;
        
        card.innerHTML = `
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span class="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 font-black text-xs">
              Q${idx + 1} / ${filtered.length}
            </span>
            <span class="text-xs font-bold text-slate-500">${q.theme}</span>
          </div>
          
          <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">${q.question}</h3>
          
          <div class="space-y-2 pt-1">
            ${q.options.map(opt => `
              <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm flex items-start gap-3 text-slate-700 bank-opt" data-opt-id="${opt.id}">
                <span class="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-200 text-slate-700">
                  ${opt.id}
                </span>
                <span class="flex-1 leading-relaxed">${opt.text}</span>
              </div>
            `).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <button type="button" onclick="toggleBankAnswer('${q.id}')" 
              class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5">
              <span>👁️ Révéler la Réponse & Justification</span>
            </button>
            <span class="text-[11px] text-slate-400 font-semibold">Cadre : ${q.reference}</span>
          </div>

          <div id="bank-reveal-${q.id}" class="hidden mt-3 p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 space-y-1.5">
            <div class="font-black flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-teal-700 text-white font-bold">Bonne réponse : ${q.options.find(o => o.correct)?.id}</span>
              <span>💡 Justification Didactique :</span>
            </div>
            <p class="leading-relaxed font-medium">${q.explanation}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function toggleBankAnswer(qId) {
      const box = document.getElementById(`bank-reveal-${qId}`);
      const card = document.getElementById(`bank-item-${qId}`);
      if (!box || !card) return;
      const isHidden = box.classList.contains('hidden');
      if (isHidden) {
        box.classList.remove('hidden');
        const q = EPS_DIDACTIQUE_BANK.find(item => item.id === qId);
        if (q) {
          const optDivs = card.querySelectorAll('.bank-opt');
          optDivs.forEach(div => {
            const optId = div.getAttribute('data-opt-id');
            const optObj = q.options.find(o => o.id === optId);
            if (optObj && optObj.correct) {
              div.className = 'p-3 rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm flex items-start gap-3';
              div.querySelector('span').className = 'w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-emerald-700 text-white';
            }
          });
        }
      } else {
        box.classList.add('hidden');
        const optDivs = card.querySelectorAll('.bank-opt');
        optDivs.forEach(div => {
          div.className = 'p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm flex items-start gap-3 text-slate-700 bank-opt';
          div.querySelector('span').className = 'w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-200 text-slate-700';
        });
      }
    }'''

if 'function filterBankQuestions() {' in didac:
    idx_fn = didac.index('function filterBankQuestions() {')
    idx_end_fn = didac.index("document.addEventListener('DOMContentLoaded'", idx_fn)
    didac = didac[:idx_fn] + new_didac_filter_fn + '\n\n    ' + didac[idx_end_fn:]

with open('public/qcm-didactique-eps-maroc.html', 'w', encoding='utf-8') as f:
    f.write(didac)
print('public/qcm-didactique-eps-maroc.html updated successfully!')


# ==============================================================================
# 2. UPDATE qcm-specialite-eps-maroc.html
# ==============================================================================
with open('public/qcm-specialite-eps-maroc.html', 'r', encoding='utf-8') as f:
    spec = f.read()

# Tab title
spec = spec.replace(
    '<span>📚 Référentiel Complet (40 Questions)</span>',
    '<span>🏛️ 2. Cadre Référentiel CNEE & Exploration Spécialité</span>'
)

# view-mode-bank
if old_bank_marker in spec:
    idx_start = spec.index(old_bank_marker)
    idx_end = spec.index('</main>', idx_start)
    
    new_spec_bank_section = '''<div id="view-mode-bank" class="hidden space-y-6">
      
      <!-- Présentation du Cadre Officiel CNEE -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl font-black">
            🏛️
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-black text-slate-900">
              Cadre de Référence Officiel · Spécialité Académique EPS (CNEE)
            </h2>
            <p class="text-xs text-slate-500 font-arabic text-right dir-rtl">المركز الوطني للتقويم والامتحانات والتوجيه · التوصيف الرسمي لاختبار مادة التخصص في التربية البدنية والرياضية</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 1 : Physiologie de l'Effort & Bioénergétique Musculaire</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">35%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Filières bioénergétiques de resynthèse de l'ATP (anaérobie alactique, anaérobie lactique, aérobie), cinétique de consommation d'O2, VMA, VO2max, dette d'oxygène (EPOC), seuils lactiques/ventilatoires et filières d'endurance.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 2 : Biomécanique du Mouvement & Anatomie Fonctionnelle</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">25%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Chaînes cinétiques musculaires, leviers osseux anatomiques, régimes de contraction musculaire (isométrique, concentrique, excentrique, pliométrique), analyse cinématique des trajectoires et gestes techniques (courses, lancers, sauts).
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 3 : Apprentissage Moteur & Psychomotricité</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">20%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Stades de l'apprentissage moteur selon Fitts & Posner (cognitif, associatif, autonome), modèles cybernétiques de Schmidt et Adams, types de feedbacks (intrinsèque, extrinsèque KR/KP) et transfert d'apprentissage.
            </p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-teal-900 text-sm">Domaine 4 : Règlements Techniques & Analyse des APSA</h4>
              <span class="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-black text-[11px]">20%</span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Règlements fédéraux et scolaires des APSA programmées au Maroc (Athlétisme, Gymnastique, Handball, Basketball, Volleyball, Football, Badminton), gestuelle arbitrale conventionnelle et analyse tactico-technique.
            </p>
          </div>
        </div>
      </div>

      <!-- Recherche & Exploration de la Banque Complète -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-base font-extrabold text-slate-900">Banque Officielle des Questions de Spécialité CNEE</h3>
            <p class="text-xs text-slate-500">Explorez l'ensemble des questions de physiologie, biomécanique et règlements sans solutions pré-cochées.</p>
          </div>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input type="text" id="bank-search-input" oninput="filterBankQuestions()" placeholder="Rechercher une notion (ex: ATP, excentrique, Fitts)..." class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 w-full sm:w-64 focus:outline-hidden focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all">
            <select id="bank-filter-theme" onchange="filterBankQuestions()" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-700 cursor-pointer">
              <option value="ALL">Tous les thèmes</option>
            </select>
          </div>
        </div>

        <div id="bank-questions-container" class="space-y-4">
          <!-- Populated by JS -->
        </div>
      </div>

    </div>
  '''
    spec = spec[:idx_start] + new_spec_bank_section + spec[idx_end:]

# Replace filterBankQuestions in spec
new_spec_filter_fn = '''function filterBankQuestions() {
      const themeFilter = document.getElementById('bank-filter-theme').value;
      const searchTxt = (document.getElementById('bank-search-input')?.value || '').trim().toLowerCase();
      const container = document.getElementById('bank-questions-container');
      container.innerHTML = '';

      const filtered = EPS_SPECIALITE_BANK.filter(q => {
        const matchTheme = (themeFilter === 'ALL' || q.theme === themeFilter);
        const matchSearch = !searchTxt || 
          q.question.toLowerCase().includes(searchTxt) ||
          q.explanation.toLowerCase().includes(searchTxt) ||
          q.reference.toLowerCase().includes(searchTxt);
        return matchTheme && matchSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">Aucune question ne correspond à votre recherche.</div>';
        return;
      }

      filtered.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-left transition-all';
        card.id = `bank-item-${q.id}`;
        
        card.innerHTML = `
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span class="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 font-black text-xs">
              Q${idx + 1} / ${filtered.length}
            </span>
            <span class="text-xs font-bold text-slate-500">${q.theme}</span>
          </div>
          
          <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">${q.question}</h3>
          
          <div class="space-y-2 pt-1">
            ${q.options.map(opt => `
              <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm flex items-start gap-3 text-slate-700 bank-opt" data-opt-id="${opt.id}">
                <span class="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-200 text-slate-700">
                  ${opt.id}
                </span>
                <span class="flex-1 leading-relaxed">${opt.text}</span>
              </div>
            `).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <button type="button" onclick="toggleBankAnswer('${q.id}')" 
              class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5">
              <span>👁️ Révéler la Réponse & Justification</span>
            </button>
            <span class="text-[11px] text-slate-400 font-semibold">Cadre : ${q.reference}</span>
          </div>

          <div id="bank-reveal-${q.id}" class="hidden mt-3 p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 space-y-1.5">
            <div class="font-black flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md bg-teal-700 text-white font-bold">Bonne réponse : ${q.options.find(o => o.correct)?.id}</span>
              <span>💡 Justification Scientifique :</span>
            </div>
            <p class="leading-relaxed font-medium">${q.explanation}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function toggleBankAnswer(qId) {
      const box = document.getElementById(`bank-reveal-${qId}`);
      const card = document.getElementById(`bank-item-${qId}`);
      if (!box || !card) return;
      const isHidden = box.classList.contains('hidden');
      if (isHidden) {
        box.classList.remove('hidden');
        const q = EPS_SPECIALITE_BANK.find(item => item.id === qId);
        if (q) {
          const optDivs = card.querySelectorAll('.bank-opt');
          optDivs.forEach(div => {
            const optId = div.getAttribute('data-opt-id');
            const optObj = q.options.find(o => o.id === optId);
            if (optObj && optObj.correct) {
              div.className = 'p-3 rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm flex items-start gap-3';
              div.querySelector('span').className = 'w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-emerald-700 text-white';
            }
          });
        }
      } else {
        box.classList.add('hidden');
        const optDivs = card.querySelectorAll('.bank-opt');
        optDivs.forEach(div => {
          div.className = 'p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm flex items-start gap-3 text-slate-700 bank-opt';
          div.querySelector('span').className = 'w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-200 text-slate-700';
        });
      }
    }'''

if 'function filterBankQuestions() {' in spec:
    idx_fn = spec.index('function filterBankQuestions() {')
    idx_end_fn = spec.index("document.addEventListener('DOMContentLoaded'", idx_fn)
    spec = spec[:idx_fn] + new_spec_filter_fn + '\n\n    ' + spec[idx_end_fn:]

with open('public/qcm-specialite-eps-maroc.html', 'w', encoding='utf-8') as f:
    f.write(spec)
print('public/qcm-specialite-eps-maroc.html updated successfully!')
