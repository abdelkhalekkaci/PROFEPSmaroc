#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Integrates all questions & answers from /public/assets/aistudio/science_d_edu_a7cad55a.pdf
into /public/qcm-sciences-education-crmef.html and updates /public/concours-crmef-hub.html.
Strictly never touches /public/generateur.html.
"""

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path("/app/applet") if Path("/app/applet/public").exists() else Path(".")
sys.path.insert(0, str(ROOT / "scripts"))

from pdf_se_data_part1 import PART1_AND_3_RAW
from pdf_se_data_part2 import PART2_RAW
from pdf_se_data_part3 import PART3_RAW


def build_new_questions():
    raw_all = []
    # Tag source group so we preserve exact option order for Part 1A (first 56 items)
    for idx, item in enumerate(PART1_AND_3_RAW):
        raw_all.append(("p1" if idx < 56 else "p1b", item))
    for item in PART2_RAW:
        raw_all.append(("p2", item))
    for item in PART3_RAW:
        raw_all.append(("p3", item))

    seen_q = set()
    unique_items = []
    for grp, item in raw_all:
        theme, ref, q_ar, opts_ar, corr_ltr, exp_ar = item
        norm_q = re.sub(r"\s+", " ", q_ar).strip()
        if norm_q in seen_q:
            continue
        seen_q.add(norm_q)
        unique_items.append((grp, theme, ref, q_ar, list(opts_ar), corr_ltr, exp_ar))

    # Ensure total count is a multiple of 10 so every Series has 10 questions
    remainder = len(unique_items) % 10
    if remainder != 0:
        unique_items = unique_items[: len(unique_items) - remainder]

    letters = ["A", "B", "C", "D"]
    built = []
    for i, (grp, theme, ref, q_ar, opts_ar, corr_ltr, exp_ar) in enumerate(unique_items):
        q_num = 101 + i
        qid = f"se-{q_num:03d}"

        corr_idx = letters.index(corr_ltr) if corr_ltr in letters else 0

        # For p1b/p2/p3 where correct answer was placed at index 0 ("A"),
        # rotate options deterministically so correct answers are evenly distributed across A, B, C, D
        if grp != "p1" and corr_idx == 0 and len(opts_ar) == 4:
            target_idx = (i + 1) % 4
            if target_idx != 0:
                correct_text = opts_ar[0]
                distractors = opts_ar[1:]
                new_opts = []
                d_ptr = 0
                for pos in range(4):
                    if pos == target_idx:
                        new_opts.append(correct_text)
                    else:
                        new_opts.append(distractors[d_ptr])
                        d_ptr += 1
                opts_ar = new_opts
                corr_idx = target_idx
                corr_ltr = letters[corr_idx]

        options_objs = []
        for idx, opt_txt in enumerate(opts_ar[:4]):
            ltr = letters[idx]
            options_objs.append({
                "id": ltr,
                "text": opt_txt,
                "textAr": opt_txt,
                "correct": (idx == corr_idx)
            })

        built.append({
            "id": qid,
            "theme": theme,
            "reference": ref,
            "question": q_ar,
            "questionAr": q_ar,
            "options": options_objs,
            "explanation": exp_ar
        })

    return built


def generate_qa_card_html(q_obj, index_1based):
    theme = q_obj.get("theme", "علوم التربية · CRMEF")
    ref = q_obj.get("reference", "الإطار المرجعي لمباريات التعليم")
    question_fr = q_obj.get("question", "")
    question_ar = q_obj.get("questionAr", "")
    exp = q_obj.get("explanation", "")

    correct_opt = next((o for o in q_obj.get("options", []) if o.get("correct")), q_obj["options"][0])
    ans_id = correct_opt.get("id", "A")
    ans_txt = correct_opt.get("text", "")

    is_ar_only = bool(re.search(r"[\u0600-\u06FF]", question_fr)) and (question_fr == question_ar or not question_ar)

    search_blob = f"{theme} {ref} {question_fr} {question_ar} {ans_txt} {exp}".lower()
    search_attr = html.escape(search_blob, quote=True)

    ar_sub_html = ""
    if question_ar and question_ar != question_fr:
        ar_sub_html = f'\n          <p class="text-sm font-arabic font-bold text-slate-700 text-right dir-rtl mb-2">{html.escape(question_ar)}</p>'

    dir_attr = ' dir="rtl" style="text-align:right;"' if is_ar_only else ' dir="auto"'
    ans_label = "✓ الجواب الصحيح" if is_ar_only else "✓ Bonne réponse"
    exp_label = "💡 تعليل الجواب :" if is_ar_only else "💡 Explication :"

    return f"""        <article class="peps-qa-card" data-qa-search="{search_attr}">
          <div class="peps-qa-meta">
            <span class="peps-qa-num">Q{index_1based}</span>
            <span class="peps-qa-theme">{html.escape(theme)}</span>
            <span class="text-[11px] text-slate-500 font-medium ml-auto">{html.escape(ref)}</span>
          </div>
          <h3 class="peps-qa-q"{dir_attr}>{html.escape(question_fr)}</h3>{ar_sub_html}
          <div class="peps-qa-ans"{dir_attr}>{ans_label} ({html.escape(ans_id)}) : {html.escape(ans_txt)}</div>
          <div class="peps-qa-exp"{dir_attr}><strong>{exp_label}</strong> {html.escape(exp)}</div>
        </article>"""


def main():
    se_path = ROOT / "public" / "qcm-sciences-education-crmef.html"
    content = se_path.read_text(encoding="utf-8")

    # 1. Extract existing first 100 questions from const BANK = [...];
    m = re.search(r"const BANK = (\[.*?\]);\s*window\.PEPS_QCM_BANK = BANK;", content, flags=re.S)
    if not m:
        raise RuntimeError("Could not locate const BANK in qcm-sciences-education-crmef.html")

    existing_bank = json.loads(m.group(1))
    base_100 = [q for q in existing_bank if int(q["id"].split("-")[1]) <= 100]
    assert len(base_100) == 100, f"Expected 100 base questions, found {len(base_100)}"

    new_questions = build_new_questions()
    full_bank = base_100 + new_questions
    total_q = len(full_bank)
    num_series = total_q // 10
    print(f"Base questions: {len(base_100)}, New PDF questions: {len(new_questions)}, Total BANK: {total_q} ({num_series} series)")

    # 2. Build <select id="peps-series-select"> options
    options_html_parts = []
    for s in range(num_series):
        start_q = s * 10 + 1
        end_q = (s + 1) * 10
        lang_tag = " · عربي/PDF" if start_q >= 101 else " · FR/AR"
        options_html_parts.append(
            f'<option value="{s}">Série {s + 1} (Questions {start_q} à {end_q}{lang_tag})</option>'
        )
    select_options_str = "".join(options_html_parts)

    content = re.sub(
        r'(<select id="peps-series-select"[^>]*>\s*)(.*?)(\s*</select>)',
        lambda match: match.group(1) + select_options_str + match.group(3),
        content,
        flags=re.S
    )

    # 3. Update count badges in qcm-sciences-education-crmef.html
    content = re.sub(
        r"🎯 1\. Test QCM \(\d+ Q\)",
        f"🎯 1. Test QCM ({total_q} Q)",
        content
    )
    content = re.sub(
        r"📖 2\. Questions &amp; Réponses \(\d+\)",
        f"📖 2. Questions &amp; Réponses ({total_q})",
        content
    )
    content = re.sub(
        r"Banque officielle : <strong>\d+ QCM corrigés</strong>",
        f"Banque officielle : <strong>{total_q} QCM corrigés (FR + AR)</strong>",
        content
    )
    content = re.sub(
        r'placeholder="🔍 Rechercher parmi les \d+ questions et réponses corrigées\.\.\."',
        f'placeholder="🔍 Rechercher parmi les {total_q} questions et réponses corrigées (FR / عربي)..."',
        content
    )
    content = re.sub(
        r'(<span id="peps-qa-count-badge"[^>]*>\s*)\d+ QCM(\s*</span>)',
        f"\\g<1>{total_q} QCM\\g<2>",
        content
    )
    content = re.sub(
        r"<!-- ================= BANQUE OFFICIELLE \(\d+ QCM\) & MOTEUR DE SÉRIES ================= -->",
        f"<!-- ================= BANQUE OFFICIELLE ({total_q} QCM) & MOTEUR DE SÉRIES ================= -->",
        content
    )

    # Add direct PDF reference pill in the series selection bar if not already present
    pdf_badge_html = (
        '<a href="/assets/aistudio/science_d_edu_a7cad55a.pdf" target="_blank" rel="noopener" '
        'class="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors">'
        '📥 PDF علوم التربية مع التصحيح'
        '</a>'
    )
    if "science_d_edu_a7cad55a.pdf" not in content:
        content = content.replace(
            '<button type="button" onclick="window.pepsRandomSeries()"',
            pdf_badge_html + '\n          <button type="button" onclick="window.pepsRandomSeries()"'
        )

    # 4. Regenerate #peps-qa-cards-list with all 340/350 cards
    qa_cards_html = "\n\n".join(
        generate_qa_card_html(q_obj, idx + 1) for idx, q_obj in enumerate(full_bank)
    )
    content = re.sub(
        r'(<div id="peps-qa-cards-list">\s*)(.*?)(\s*</div>\s*</div>\s*<!-- PANEL 3 : CADRE RÉFÉRENTIEL CNEE -->)',
        lambda match: match.group(1) + qa_cards_html + match.group(3),
        content,
        flags=re.S
    )

    # 5. Replace const BANK and upgrade renderQuestion / showResults for seamless RTL Arabic support
    bank_json = json.dumps(full_bank, ensure_ascii=False)

    new_script_block = f"""  <!-- ================= BANQUE OFFICIELLE ({total_q} QCM) & MOTEUR DE SÉRIES ================= -->
  <script>
  (function() {{
    const BANK = {bank_json};
    window.PEPS_QCM_BANK = BANK;

    let currentSeriesIndex = 0;
    let isRandomMode = false;
    let currentSeries = [];
    let currentIndex = 0;
    let userAnswers = {{}};

    function hasArabic(str) {{
      return /[\\u0600-\\u06FF]/.test(str || '');
    }}

    function loadSeriesByIndex(sIdx) {{
      isRandomMode = false;
      const numSeries = Math.ceil(BANK.length / 10);
      currentSeriesIndex = Math.max(0, Math.min(Number(sIdx) || 0, numSeries - 1));
      const sel = document.getElementById('peps-series-select');
      if (sel) sel.value = String(currentSeriesIndex);

      const start = currentSeriesIndex * 10;
      currentSeries = BANK.slice(start, start + 10);
      currentIndex = 0;
      userAnswers = {{}};

      const badge = document.getElementById('quiz-series-badge');
      if (badge) badge.textContent = 'Série ' + (currentSeriesIndex + 1) + ' (Q' + (start + 1) + '–Q' + (start + currentSeries.length) + ')';

      document.getElementById('results-card').classList.add('hidden');
      document.getElementById('quiz-card').classList.remove('hidden');
      renderQuestion();
    }}

    function loadRandomSeries() {{
      isRandomMode = true;
      const shuffled = BANK.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {{
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = tmp;
      }}
      currentSeries = shuffled.slice(0, 10);
      currentIndex = 0;
      userAnswers = {{}};

      const badge = document.getElementById('quiz-series-badge');
      if (badge) badge.textContent = '🎲 Série Aléatoire (10 Q)';

      document.getElementById('results-card').classList.add('hidden');
      document.getElementById('quiz-card').classList.remove('hidden');
      renderQuestion();
    }}

    function renderQuestion() {{
      const q = currentSeries[currentIndex];
      if (!q) return;

      document.getElementById('quiz-current-num').textContent = String(currentIndex + 1);
      const totalEl = document.getElementById('quiz-total-num');
      if (totalEl) totalEl.textContent = String(currentSeries.length);

      document.getElementById('quiz-theme-badge').textContent = q.theme || 'CRMEF';
      const refEl = document.getElementById('quiz-ref-badge');
      if (refEl) refEl.textContent = q.reference || 'Cadre Référentiel MENPS';

      const qFr = document.getElementById('quiz-question-fr');
      const isPrimaryAr = hasArabic(q.question) && (!q.questionAr || q.questionAr === q.question);
      qFr.textContent = q.question || '';
      if (isPrimaryAr) {{
        qFr.setAttribute('dir', 'rtl');
        qFr.className = 'text-base sm:text-lg font-arabic font-bold text-slate-900 text-right dir-rtl leading-relaxed';
      }} else {{
        qFr.setAttribute('dir', 'ltr');
        qFr.className = 'text-base sm:text-lg font-black text-slate-900 leading-snug';
      }}

      const qAr = document.getElementById('quiz-question-ar');
      if (qAr) {{
        if (q.questionAr && q.questionAr !== q.question) {{
          qAr.textContent = q.questionAr;
          qAr.classList.remove('hidden');
        }} else {{
          qAr.textContent = '';
          qAr.classList.add('hidden');
        }}
      }}

      const prog = ((currentIndex + 1) / currentSeries.length) * 100;
      document.getElementById('quiz-progress-fill').style.width = prog + '%';

      const container = document.getElementById('quiz-options-container');
      container.innerHTML = '';

      (q.options || []).forEach(function(opt) {{
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = userAnswers[q.id] === opt.id;
        const optIsAr = hasArabic(opt.text) && (!opt.textAr || opt.textAr === opt.text);

        btn.className = 'w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3.5 cursor-pointer ' +
          (isSelected
            ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20 shadow-xs'
            : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50 bg-white');
        if (optIsAr) {{
          btn.setAttribute('dir', 'rtl');
        }}

        btn.onclick = function() {{
          userAnswers[q.id] = opt.id;
          renderQuestion();
        }};

        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'w-7 h-7 rounded-lg ' + (isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700') + ' font-black text-xs flex items-center justify-center shrink-0 uppercase transition-colors';
        badgeSpan.textContent = opt.id;

        const textDiv = document.createElement('div');
        textDiv.className = 'flex-1 space-y-1';

        const mainSpan = document.createElement('span');
        mainSpan.className = 'text-xs sm:text-sm ' + (isSelected ? 'text-blue-950 font-bold' : 'text-slate-800 font-semibold') + ' block' + (optIsAr ? ' font-arabic text-right dir-rtl' : '');
        mainSpan.textContent = opt.text;
        textDiv.appendChild(mainSpan);

        if (opt.textAr && opt.textAr !== opt.text) {{
          const arSpan = document.createElement('span');
          arSpan.className = 'text-xs font-arabic text-slate-700 block text-right dir-rtl';
          arSpan.textContent = opt.textAr;
          textDiv.appendChild(arSpan);
        }}

        btn.appendChild(badgeSpan);
        btn.appendChild(textDiv);
        container.appendChild(btn);
      }});

      const nextBtn = document.getElementById('btn-next-question');
      if (userAnswers[q.id]) {{
        nextBtn.disabled = false;
        nextBtn.className = 'px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm transition-colors';
        nextBtn.textContent = currentIndex === currentSeries.length - 1 ? 'Terminer & Voir la Correction ✓' : 'Question suivante →';
      }} else {{
        nextBtn.disabled = true;
        nextBtn.className = 'px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 text-slate-400 cursor-not-allowed';
        nextBtn.textContent = 'Question suivante →';
      }}

      const prevBtn = document.getElementById('btn-prev-question');
      if (currentIndex > 0) {{
        prevBtn.disabled = false;
        prevBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer';
      }} else {{
        prevBtn.disabled = true;
        prevBtn.className = 'px-4 py-2 rounded-xl text-xs font-bold text-slate-300 cursor-not-allowed';
      }}
    }}

    function showResults() {{
      document.getElementById('quiz-card').classList.add('hidden');
      const resCard = document.getElementById('results-card');
      resCard.classList.remove('hidden');

      let score = 0;
      currentSeries.forEach(function(q) {{
        const correctOpt = (q.options || []).find(function(o) {{ return o.correct; }}) || q.options[0];
        if (userAnswers[q.id] === correctOpt.id) score++;
      }});

      const total = currentSeries.length || 10;
      const note20 = ((score / total) * 20).toFixed(1);
      document.getElementById('results-score-display').textContent = score + ' / ' + total;
      document.getElementById('results-note-20').textContent = 'Note officielle estimée : ' + note20 + ' / 20';

      const diagBox = document.getElementById('results-diagnosis-box');
      if (score >= 8) {{
        diagBox.className = 'max-w-md mx-auto p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-bold space-y-1';
        diagBox.innerHTML = '🏆 <strong>Excellente Maîtrise : Profil Admissible</strong><p class="text-[11px] font-normal text-emerald-800 mt-1">Vous maîtrisez les attendus officiels du cadre référentiel MENPS pour cette série.</p>';
      }} else if (score >= 6) {{
        diagBox.className = 'max-w-md mx-auto p-4 rounded-xl border border-blue-300 bg-blue-50 text-blue-900 text-xs font-bold space-y-1';
        diagBox.innerHTML = '🎯 <strong>Bon Niveau : Acquis Solides</strong><p class="text-[11px] font-normal text-blue-800 mt-1">Consolidez les points subtils grâce aux justifications détaillées ci-dessous.</p>';
      }} else {{
        diagBox.className = 'max-w-md mx-auto p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold space-y-1';
        diagBox.innerHTML = '📚 <strong>Approfondissement Requis</strong><p class="text-[11px] font-normal text-amber-800 mt-1">Étudiez les corrigés de cette série et consultez l\\'onglet Questions & Réponses (' + BANK.length + ' QCM).</p>';
      }}

      const corrContainer = document.getElementById('corrections-container');
      corrContainer.innerHTML = '';

      currentSeries.forEach(function(q, idx) {{
        const correctOpt = (q.options || []).find(function(o) {{ return o.correct; }}) || q.options[0];
        const userChoiceId = userAnswers[q.id];
        const isRight = userChoiceId === correctOpt.id;
        const selectedOpt = (q.options || []).find(function(o) {{ return o.id === userChoiceId; }});
        const qIsAr = hasArabic(q.question) && (!q.questionAr || q.questionAr === q.question);

        const item = document.createElement('div');
        item.className = 'p-4 sm:p-5 rounded-2xl border ' + (isRight ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/40') + ' space-y-2';
        if (qIsAr) item.setAttribute('dir', 'rtl');

        item.innerHTML =
          '<div class="flex items-center justify-between text-xs gap-2 flex-wrap">' +
            '<span class="font-extrabold text-slate-700">Question ' + (idx + 1) + ' · ' + (q.theme || '') + '</span>' +
            '<span class="px-2.5 py-0.5 rounded-full font-bold text-[11px] ' + (isRight ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800') + '">' +
              (isRight ? '✓ Validée (+1)' : '✗ Incorrect (0)') +
            '</span>' +
          '</div>' +
          '<h4 class="text-sm font-black text-slate-900"></h4>' +
          '<div class="text-xs space-y-1.5 pt-1">' +
            '<div class="user-ans-line"></div>' +
            (!isRight ? '<div class="correct-ans-line"></div>' : '') +
            '<div class="p-3 bg-white rounded-xl text-slate-700 leading-relaxed border border-slate-200/80 mt-2 text-xs exp-box"></div>' +
          '</div>';

        item.querySelector('h4').textContent = q.question;
        const uLine = item.querySelector('.user-ans-line');
        uLine.innerHTML = (qIsAr ? 'إجابتك : ' : 'Votre réponse : ') + '<strong class="' + (isRight ? 'text-emerald-700' : 'text-red-700') + '"></strong>';
        uLine.querySelector('strong').textContent = selectedOpt ? (selectedOpt.id + ') ' + selectedOpt.text) : (qIsAr ? 'بدون إجابة' : 'Non répondu');

        if (!isRight) {{
          const cLine = item.querySelector('.correct-ans-line');
          cLine.innerHTML = (qIsAr ? '✓ الجواب الصحيح : ' : '✓ Bonne réponse : ') + '<strong class="text-emerald-800"></strong>';
          cLine.querySelector('strong').textContent = correctOpt.id + ') ' + correctOpt.text;
        }}

        const expBox = item.querySelector('.exp-box');
        expBox.innerHTML = (qIsAr ? '💡 <strong>التعليل البيداغوجي :</strong> ' : '💡 <strong>Justification officielle :</strong> ') + '<span class="exp-text"></span><div class="text-[11px] text-slate-500 mt-1 italic ref-text"></div>';
        expBox.querySelector('.exp-text').textContent = q.explanation || '';
        expBox.querySelector('.ref-text').textContent = (qIsAr ? '📌 المرجع : ' : '📌 Référence : ') + (q.reference || 'Cadre Référentiel Officiel MENPS Maroc');

        corrContainer.appendChild(item);
      }});
    }}

    window.pepsSelectSeries = function(val) {{
      loadSeriesByIndex(Number(val) || 0);
    }};
    window.pepsRandomSeries = function() {{
      loadRandomSeries();
    }};
    window.pepsNextSeriesOrder = function() {{
      const numSeries = Math.ceil(BANK.length / 10);
      loadSeriesByIndex((currentSeriesIndex + 1) % numSeries);
    }};
    window.pepsPrevQuestion = function() {{
      if (currentIndex > 0) {{
        currentIndex--;
        renderQuestion();
      }}
    }};
    window.pepsNextQuestion = function() {{
      if (currentIndex < currentSeries.length - 1) {{
        currentIndex++;
        renderQuestion();
      }} else {{
        showResults();
      }}
    }};

    // Legacy global aliases
    window.startNewSeries = loadRandomSeries;
    window.prevQuestion = window.pepsPrevQuestion;
    window.nextQuestion = window.pepsNextQuestion;

    loadSeriesByIndex(0);
  }})();
  </script>"""

    content = re.sub(
        r"<!-- ================= BANQUE OFFICIELLE \(\d+ QCM\) & MOTEUR DE SÉRIES ================= -->\s*<script>.*?</script>\s*</body>",
        lambda _: new_script_block + "\n</body>",
        content,
        flags=re.S
    )

    se_path.write_text(content, encoding="utf-8")
    print(f"Updated {se_path} successfully.")

    # 6. Also update badge in /public/concours-crmef-hub.html
    hub_path = ROOT / "public" / "concours-crmef-hub.html"
    if hub_path.exists():
        hub_txt = hub_path.read_text(encoding="utf-8")
        hub_txt = re.sub(
            r"\d+ Questions corrigées · 3 onglets \(Test QCM · Questions & Réponses · Cadre Référentiel\)",
            f"{total_q} Questions corrigées (FR & AR) · 3 onglets (Test QCM · Questions & Réponses · Cadre Référentiel)",
            hub_txt
        )
        hub_txt = re.sub(
            r"🎯 QCM Sciences de l'Éducation \(\d+ Q\) →",
            f"🎯 QCM Sciences de l'Éducation ({total_q} Q) →",
            hub_txt
        )
        hub_path.write_text(hub_txt, encoding="utf-8")
        print(f"Updated {hub_path} badge counts to {total_q} Q.")


if __name__ == "__main__":
    main()
