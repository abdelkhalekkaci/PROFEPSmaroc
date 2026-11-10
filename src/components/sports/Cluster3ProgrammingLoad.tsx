import React, { useState, useMemo } from 'react';
import {
  ToolLang,
  calculateHiitAndCod,
  calculateFosterLoad,
} from '../../utils/sportsScience';
import { ToolLanguageToggle } from './ToolLanguageToggle';
import { CalculatorScientificCard } from './CalculatorScientificCard';
import { Dumbbell, Activity, ShieldAlert, ExternalLink, Timer, Repeat } from 'lucide-react';

interface Cluster3Props {
  lang: ToolLang;
  setLang: (lang: ToolLang) => void;
  globalVma: number;
  setGlobalVma: (vma: number) => void;
  onOpenHtmlExport?: (toolId: string) => void;
}

const T = {
  fr: {
    badge: 'Cluster 3 · Programmation HIIT, Navettes COD 180° & Charge RPE Foster',
    title: 'Générateur d’Intermittent HIIT, Sports Co (COD 180°) & Charge RPE / ACWR',
    subtitle:
      'Calculez vos distances cibles au plot sur piste linéaire ou en navettes avec changement de direction (180° Buchheit), et pilotez la charge interne sRPE Foster (Monotonie, Contrainte et Ratio ACWR prévention blessures).',
    tabHiit: '3A & 3B. Intermittent HIIT & Sports Co (COD 180°)',
    tabFoster: '3C. Charge RPE Foster & Prévention Blessures (ACWR)',
    vmaLabel: 'VMA / MAS de l’athlète ou du groupe (km/h)',
    workSecLabel: 'Durée de l’effort (secondes)',
    restSecLabel: 'Durée de récupération (secondes)',
    intensityLabel: 'Intensité cible (% VMA)',
    shuttleModeLabel: 'Configuration du terrain / Navette',
    linearTrack: 'Piste linéaire (Sans changement de direction)',
    shuttle20m: 'Terrain Sports Co — Navette 20 m (COD 180°)',
    shuttle25m: 'Terrain / Gymnase — Navette 25 m (COD 180°)',
    shuttle30m: 'Terrain Football / Rugby — Navette 30 m (COD 180°)',
    shuttle40m: 'Grand Terrain — Navette 40 m (COD 180°)',
    linearDistResult: 'Distance Piste Linéaire',
    adjustedCodResult: 'Distance Cible Ajustée (avec COD)',
    turnsCountLabel: 'Nombre de relances 180°',
    codPenaltyLabel: 'Coût énergétique / Pénalité COD',
    shuttleBreakdownLabel: 'Repère Plots Terrain',
    presetsTitle: 'Modèles de Séances Intermittentes Standards (Campus & Prépa Physique)',
    fosterTitle: 'Calculateur de Charge Interne sRPE (Foster) & Ratio ACWR (Gabbett)',
    fosterDesc:
      'Charge de séance (UA) = Durée (min) × RPE (0 à 10). Le ratio Aigu:Chronique (ACWR) compare la charge des 7 derniers jours à la moyenne des 4 dernières semaines pour prévenir les blessures.',
    chronicLoadLabel: 'Charge Chronique Moyenne (4 dernières semaines en UA)',
    dayCol: 'Jour',
    durCol: 'Durée (min)',
    rpeCol: 'RPE (0–10)',
    loadCol: 'Charge (UA)',
    weeklyLoadResult: 'Charge Hebdomadaire Aiguë',
    monotonyResult: 'Indice de Monotonie',
    strainResult: 'Indice de Contrainte (Strain)',
    acwrResult: 'Ratio Aigu:Chronique (ACWR)',
    diagTitle: 'Diagnostic Prévention des Blessures & Interprétation',
    diagUnder: 'Sous-entraînement / Déconditionnement (ACWR < 0.80) : Charge aiguë faible par rapport à votre habitude. Risque de perte d’adaptations.',
    diagOptimal: 'Zone Optimale "Sweet Spot" (0.80 ≤ ACWR ≤ 1.30) : Progression idéale de la charge avec risque minimal de blessure musculaire ou tendineuse.',
    diagWarning: 'Zone de Vigilance Surcharge (1.31 ≤ ACWR ≤ 1.50) : Augmentation rapide de la charge. Surveiller la qualité du sommeil, l’hydratation et réduire la monotonie.',
    diagDanger: 'Zone Critique / Risque Élevé de Blessure (ACWR > 1.50) : Pic de charge excessif (+50%). Intégrer immédiatement 1 à 2 jours de récupération complète ou Z1.',
    getHtmlBtn: 'Obtenir le code HTML & PowerShell de cet outil',
  },
  en: {
    badge: 'Cluster 3 · HIIT Programming, Team Sports COD 180° & Foster sRPE Load',
    title: 'HIIT Interval Generator, 180° Shuttle COD & Foster sRPE / ACWR Load Calculator',
    subtitle:
      'Compute exact cone distances on a linear track or with 180° Change of Direction (Buchheit model), and monitor internal sRPE training load (Monotony, Strain, and ACWR injury risk).',
    tabHiit: '3A & 3B. HIIT Intervals & Team Sports (COD 180°)',
    tabFoster: '3C. Foster sRPE Load & Injury Prevention (ACWR)',
    vmaLabel: 'Athlete or Squad MAS / VMA (km/h)',
    workSecLabel: 'Work Interval Duration (seconds)',
    restSecLabel: 'Recovery Duration (seconds)',
    intensityLabel: 'Target Intensity (% MAS)',
    shuttleModeLabel: 'Field / Shuttle Configuration',
    linearTrack: 'Linear Running Track (No turns)',
    shuttle20m: 'Indoor Court — 20m Shuttle (180° COD)',
    shuttle25m: 'Field / Court — 25m Shuttle (180° COD)',
    shuttle30m: 'Pitch — 30m Shuttle (180° COD)',
    shuttle40m: 'Full Pitch — 40m Shuttle (180° COD)',
    linearDistResult: 'Linear Track Distance',
    adjustedCodResult: 'COD-Adjusted Target Distance',
    turnsCountLabel: 'Number of 180° Turns',
    codPenaltyLabel: 'COD Time / Distance Penalty',
    shuttleBreakdownLabel: 'Field Cone Layout',
    presetsTitle: 'Standard HIIT Workout Presets',
    fosterTitle: 'Foster sRPE Internal Training Load & ACWR Injury Risk Calculator',
    fosterDesc:
      'Session Load (AU) = Duration (min) × RPE (0–10). The Acute:Chronic Workload Ratio (ACWR) compares 7-day acute load against 4-week chronic load.',
    chronicLoadLabel: 'Chronic Weekly Load Baseline (4-week average in AU)',
    dayCol: 'Day',
    durCol: 'Duration (min)',
    rpeCol: 'RPE (0–10)',
    loadCol: 'Load (AU)',
    weeklyLoadResult: 'Acute Weekly Load',
    monotonyResult: 'Training Monotony',
    strainResult: 'Training Strain',
    acwrResult: 'Acute:Chronic Ratio (ACWR)',
    diagTitle: 'Injury Prevention Diagnostic & Coaching Interpretation',
    diagUnder: 'Undertraining Zone (ACWR < 0.80): Acute workload is below chronic baseline. Safe for tapering, otherwise risk of detraining.',
    diagOptimal: 'Optimal "Sweet Spot" (0.80 ≤ ACWR ≤ 1.30): Progressive overload with lowest statistical risk of soft-tissue injury.',
    diagWarning: 'Overload Caution Zone (1.31 ≤ ACWR ≤ 1.50): Rapid workload spike. Monitor soreness and avoid high monotony (> 2.0).',
    diagDanger: 'High Injury Risk Spike (ACWR > 1.50): Excessive workload spike (>50%). Schedule immediate recovery days to prevent non-contact injury.',
    getHtmlBtn: 'Get Standalone HTML & PowerShell for this Tool',
  },
  ar: {
    badge: 'القطب 3 · برمجة التمارين المتقطعة HIIT، تغيير الاتجاه COD 180° وحمل التدريب Foster',
    title: 'مولد التمارين المتقطعة (HIIT)، الملاعب الجماعية (COD 180°) وحاسبة الحمل التدريبي sRPE',
    subtitle:
      'حساب المسافات الدقيقة بالأقماع على المضمار أو مع تغيير الاتجاه 180° للرياضات الجماعية، ومتابعة الحمل التدريبي الداخلي (Foster sRPE) ومؤشر الوقاية من الإصابات (ACWR).',
    tabHiit: '3A & 3B. التمارين المتقطعة وتغيير الاتجاه (COD 180°)',
    tabFoster: '3C. حمل التدريب Foster sRPE والوقاية من الإصابات (ACWR)',
    vmaLabel: 'السرعة الهوائية القصوى VMA للرياضي (كم/س)',
    workSecLabel: 'مدة الجهد (ثواني)',
    restSecLabel: 'مدة الاسترجاع (ثواني)',
    intensityLabel: 'الشدة المستهدفة (% VMA)',
    shuttleModeLabel: 'طبيعة الملعب / المكوك (Navette)',
    linearTrack: 'مضمار مستقيم (بدون تغيير اتجاه)',
    shuttle20m: 'ملعب قاعة — مكوك 20 متر (تغيير اتجاه 180°)',
    shuttle25m: 'ملعب — مكوك 25 متر (تغيير اتجاه 180°)',
    shuttle30m: 'ملعب كرة قدم — مكوك 30 متر (تغيير اتجاه 180°)',
    shuttle40m: 'ملعب كبير — مكوك 40 متر (تغيير اتجاه 180°)',
    linearDistResult: 'المسافة الخطية على المضمار',
    adjustedCodResult: 'المسافة المعدلة مع تغيير الاتجاه (COD)',
    turnsCountLabel: 'عدد مرات تغيير الاتجاه 180°',
    codPenaltyLabel: 'تكلفة الدوران (الوقت والمسافة)',
    shuttleBreakdownLabel: 'توزيع الأقماع على الملعب',
    presetsTitle: 'نماذج حصص التمارين المتقطعة المعتمدة',
    fosterTitle: 'حاسبة الحمل التدريبي الداخلي (Foster sRPE) ونسبة الوقاية من الإصابات (ACWR)',
    fosterDesc:
      'حمل الحصة (وحدة) = المدة (دقيقة) × شدة الجهد المدرك RPE (0-10). تقارن نسبة ACWR حمل الأسبوع الحالي بمتوسط آخر 4 أسابيع.',
    chronicLoadLabel: 'متوسط الحمل الأسبوعي المزمن (آخر 4 أسابيع)',
    dayCol: 'اليوم',
    durCol: 'المدة (دقيقة)',
    rpeCol: 'الشدة RPE (0–10)',
    loadCol: 'الحمل (وحدة)',
    weeklyLoadResult: 'الحمل الأسبوعي الحاد',
    monotonyResult: 'مؤشر الرتابة (Monotony)',
    strainResult: 'مؤشر الإجهاد (Strain)',
    acwrResult: 'نسبة الحمل الحاد إلى المزمن (ACWR)',
    diagTitle: 'تشخيص الوقاية من الإصابات وتفسير الحمل التدريبي',
    diagUnder: 'حمل منخفض (ACWR < 0.80): مناسب لفترات الاستشفاء قبل المنافسات، أو يشير إلى نقص التحفيز التدريبي.',
    diagOptimal: 'المنطقة المثالية الآمنة (0.80 ≤ ACWR ≤ 1.30): تطور مثالي للحمل التدريبي مع أقل خطر للإصابات العضلية والمفصلية.',
    diagWarning: 'منطقة الحذر (1.31 ≤ ACWR ≤ 1.50): ارتفاع سريع في الحمل التدريبي. يُنصح بمراقبة النوم وتجنب الرتابة العالية.',
    diagDanger: 'خطر إصابة مرتفع جداً (ACWR > 1.50): قفزة مفرطة في الحمل التدريبي. يجب إدراج أيام استشفاء فورية لتفادي الإصابات.',
    getHtmlBtn: 'احصل على كود HTML وأمر PowerShell لهذه الأداة',
  },
};

export const Cluster3ProgrammingLoad: React.FC<Cluster3Props> = ({
  lang,
  setLang,
  globalVma,
  setGlobalVma,
  onOpenHtmlExport,
}) => {
  const t = T[lang];
  const isRtl = lang === 'ar';

  const [subTab, setSubTab] = useState<'hiit' | 'foster'>('hiit');

  // 3A & 3B States
  const [workSec, setWorkSec] = useState<number>(15);
  const [restSec, setRestSec] = useState<number>(15);
  const [intensityPct, setIntensityPct] = useState<number>(110);
  const [shuttleLen, setShuttleLen] = useState<number>(20);

  // 3C Foster States (7 days of Duration + RPE)
  const [chronicLoad, setChronicLoad] = useState<number>(1850);
  const [weekDays, setWeekDays] = useState<Array<{ dayFr: string; dayEn: string; dayAr: string; duration: number; rpe: number }>>([
    { dayFr: 'Lundi', dayEn: 'Monday', dayAr: 'الإثنين', duration: 60, rpe: 6 },
    { dayFr: 'Mardi', dayEn: 'Tuesday', dayAr: 'الثلاثاء', duration: 75, rpe: 7 },
    { dayFr: 'Mercredi', dayEn: 'Wednesday', dayAr: 'الأربعاء', duration: 40, rpe: 3 },
    { dayFr: 'Jeudi', dayEn: 'Thursday', dayAr: 'الخميس', duration: 70, rpe: 8 },
    { dayFr: 'Vendredi', dayEn: 'Friday', dayAr: 'الجمعة', duration: 0, rpe: 0 },
    { dayFr: 'Samedi', dayEn: 'Saturday', dayAr: 'السبت', duration: 85, rpe: 7 },
    { dayFr: 'Dimanche', dayEn: 'Sunday', dayAr: 'الأحد', duration: 45, rpe: 4 },
  ]);

  const hiitResult = useMemo(() => {
    return calculateHiitAndCod(globalVma, workSec, intensityPct, shuttleLen, shuttleLen > 0 ? 180 : 0);
  }, [globalVma, workSec, intensityPct, shuttleLen]);

  const fosterResult = useMemo(() => {
    const dailyLoads = weekDays.map(d => d.duration * d.rpe);
    return calculateFosterLoad(dailyLoads, chronicLoad);
  }, [weekDays, chronicLoad]);

  const updateDay = (idx: number, field: 'duration' | 'rpe', val: number) => {
    setWeekDays(prev =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: Math.max(0, val) } : item))
    );
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header with Top-Right Compact Language Toggle */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Dumbbell className="w-4 h-4" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {t.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">{t.subtitle}</p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <ToolLanguageToggle lang={lang} setLang={setLang} />
            {onOpenHtmlExport && (
              <button
                type="button"
                onClick={() => onOpenHtmlExport('cluster3')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                {t.getHtmlBtn}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          {[
            { id: 'hiit', label: t.tabHiit, icon: Repeat },
            { id: 'foster', label: t.tabFoster, icon: ShieldAlert },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  subTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3A & 3B: HIIT & TEAM SPORTS COD 180° */}
      {subTab === 'hiit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">{t.vmaLabel}</label>
                <span dir="ltr" className="font-mono font-bold text-blue-600 tabular-nums">
                  {globalVma.toFixed(1)} km/h
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="24"
                step="0.5"
                value={globalVma}
                onChange={e => setGlobalVma(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">{t.workSecLabel}</label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  step="5"
                  value={workSec}
                  onChange={e => setWorkSec(Math.max(5, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">{t.restSecLabel}</label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  step="5"
                  value={restSec}
                  onChange={e => setRestSec(Math.max(5, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">{t.intensityLabel}</label>
                <span dir="ltr" className="font-mono font-bold text-emerald-600 tabular-nums">
                  {intensityPct}% VMA ({hiitResult.targetSpeedKmh} km/h)
                </span>
              </div>
              <input
                type="range"
                min="85"
                max="130"
                step="5"
                value={intensityPct}
                onChange={e => setIntensityPct(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                {t.shuttleModeLabel}
              </label>
              <select
                value={shuttleLen}
                onChange={e => setShuttleLen(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900"
              >
                <option value={0}>{t.linearTrack}</option>
                <option value={20}>{t.shuttle20m}</option>
                <option value={25}>{t.shuttle25m}</option>
                <option value={30}>{t.shuttle30m}</option>
                <option value={40}>{t.shuttle40m}</option>
              </select>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase">{t.presetsTitle}</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '15"/15" @ 110%', w: 15, r: 15, p: 110 },
                  { label: '30"/30" @ 105%', w: 30, r: 30, p: 105 },
                  { label: '45"/15" @ 100%', w: 45, r: 15, p: 100 },
                  { label: '60"/30" @ 95%', w: 60, r: 30, p: 95 },
                ].map((pr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setWorkSec(pr.w);
                      setRestSec(pr.r);
                      setIntensityPct(pr.p);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md text-xs font-mono font-semibold cursor-pointer"
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-600">{t.linearDistResult}</span>
                <div dir="ltr" className="text-4xl font-black font-mono text-slate-900 tabular-nums my-1">
                  {hiitResult.linearDistanceMeters} m
                </div>
                <span dir="ltr" className="text-xs font-mono text-slate-500">
                  {hiitResult.targetSpeedMs} m/s · Sans relance
                </span>
              </div>

              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-emerald-800">{t.adjustedCodResult}</span>
                <div dir="ltr" className="text-4xl font-black font-mono text-emerald-700 tabular-nums my-1">
                  {hiitResult.adjustedDistanceMeters} m
                </div>
                <span dir="ltr" className="text-xs font-mono text-emerald-700">
                  {shuttleLen > 0
                    ? `${hiitResult.fullShuttlesCount} × ${shuttleLen}m + ${hiitResult.remainderMeters}m`
                    : 'Piste directe'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-center text-xs">
              <div>
                <span className="text-slate-600 block">{t.turnsCountLabel}</span>
                <strong dir="ltr" className="font-mono text-base font-extrabold text-blue-700 tabular-nums">
                  {hiitResult.numTurns} COD (180°)
                </strong>
              </div>
              <div>
                <span className="text-slate-600 block">{t.codPenaltyLabel}</span>
                <strong dir="ltr" className="font-mono text-base font-extrabold text-blue-700 tabular-nums">
                  -{hiitResult.codDistancePenaltyMeters} m ({hiitResult.codTimeLossSeconds}s)
                </strong>
              </div>
              <div>
                <span className="text-slate-600 block">{t.shuttleBreakdownLabel}</span>
                <strong dir="ltr" className="font-mono text-base font-extrabold text-emerald-700 tabular-nums">
                  {shuttleLen > 0
                    ? `${hiitResult.fullShuttlesCount} A/R + ${hiitResult.remainderMeters}m`
                    : `${hiitResult.linearDistanceMeters}m`}
                </strong>
              </div>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <div className="lg:col-span-12">
            <CalculatorScientificCard toolId="hiit" lang={lang} />
          </div>
        </div>
      )}

      {/* 3C: FOSTER sRPE TRAINING LOAD & ACWR INJURY PREVENTION */}
      {subTab === 'foster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">{t.fosterTitle}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{t.fosterDesc}</p>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">{t.chronicLoadLabel}</label>
                <span dir="ltr" className="font-mono font-bold text-blue-600 tabular-nums">
                  {chronicLoad} UA
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="4500"
                step="50"
                value={chronicLoad}
                onChange={e => setChronicLoad(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2 px-2">{t.dayCol}</th>
                    <th className="py-2 px-2 text-center">{t.durCol}</th>
                    <th className="py-2 px-2 text-center">{t.rpeCol}</th>
                    <th className="py-2 px-2 text-right">{t.loadCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {weekDays.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-2 font-semibold text-slate-900">
                        {lang === 'fr' ? d.dayFr : lang === 'en' ? d.dayEn : d.dayAr}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="300"
                          value={d.duration}
                          onChange={e => updateDay(i, 'duration', Number(e.target.value))}
                          className="w-20 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-center font-mono font-bold text-slate-900 tabular-nums"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={d.rpe}
                          onChange={e => updateDay(i, 'rpe', Math.min(10, Number(e.target.value)))}
                          className="w-16 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-center font-mono font-bold text-slate-900 tabular-nums"
                        />
                      </td>
                      <td dir="ltr" className="py-2 px-2 text-right font-mono font-bold text-blue-600 tabular-nums">
                        {d.duration * d.rpe} UA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-blue-800">{t.weeklyLoadResult}</span>
                <div dir="ltr" className="text-2xl font-black font-mono text-blue-700 tabular-nums mt-1">
                  {fosterResult.weeklyLoadAu} UA
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-emerald-800">{t.acwrResult}</span>
                <div dir="ltr" className="text-2xl font-black font-mono text-emerald-700 tabular-nums mt-1">
                  {fosterResult.acwr.toFixed(2)}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-700">{t.monotonyResult}</span>
                <div dir="ltr" className="text-2xl font-black font-mono text-slate-900 tabular-nums mt-1">
                  {fosterResult.monotony.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500">Seuil alerte &gt; 2.0</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-700">{t.strainResult}</span>
                <div dir="ltr" className="text-2xl font-black font-mono text-slate-900 tabular-nums mt-1">
                  {fosterResult.strain}
                </div>
                <span className="text-[10px] text-slate-500">Charge × Monotonie</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">{t.diagTitle}</div>
              <p className="text-slate-700 leading-relaxed">
                {fosterResult.riskCategory === 'undertraining'
                  ? t.diagUnder
                  : fosterResult.riskCategory === 'optimal'
                  ? t.diagOptimal
                  : fosterResult.riskCategory === 'overload-warning'
                  ? t.diagWarning
                  : t.diagDanger}
              </p>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <div className="lg:col-span-12">
            <CalculatorScientificCard toolId="charge" lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
};
