import React, { useState, useMemo } from 'react';
import {
  ToolLang,
  COMMON_DISTANCES,
  calculateVdot,
  predictRaceTimeFromVdot,
  getDanielsTrainingPaces,
  calculateAsrProfile,
  calculateEnduranceIndex,
  formatSecondsToHhMmSs,
  formatSecondsToMinSec,
  formatPace,
  formatPaceMile,
} from '../../utils/sportsScience';
import { ToolLanguageToggle } from './ToolLanguageToggle';
import { CalculatorScientificCard } from './CalculatorScientificCard';
import {
  Activity,
  Zap,
  TrendingUp,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Info,
  Gauge,
} from 'lucide-react';

interface Cluster1PerformanceProps {
  lang: ToolLang;
  setLang: (lang: ToolLang) => void;
  globalVma: number;
  setGlobalVma: (vma: number) => void;
  onOpenHtmlExport?: (toolId: string) => void;
}

const T = {
  fr: {
    clusterBadge: 'Cluster 1 · VO2 Max, VDOT, Réserve ASR & Endurance',
    title: 'Calculateur de VO2 Max (ml/kg/min), VDOT, Réserve ASR & Indice d’Endurance',
    subtitle:
      'Chaque outil possède sa propre page HTML dédiée : Calculateur de VO2 Max & VDOT (ml/kg/min), Réserve de Vitesse Anaérobie (ASR) et Indice d’Endurance (Péronnet & Thibault).',
    tabVdot: '1A. Calculateur VO2 Max (ml/kg/min) & VDOT',
    tabAsr: '1B. Réserve de Vitesse Anaérobie (ASR)',
    tabIe: '1C. Indice d’Endurance (IE)',
    vdotScoreLabel: 'VO2 Max & Indice VDOT (ml/kg/min)',
    vo2Equiv: 'Consommation maximale d’oxygène (VO2 Max)',
    selectRaceDist: 'Distance de course récente',
    raceTimeLabel: 'Temps réalisé (Heures : Min : Sec)',
    avgPaceLabel: 'Allure Moyenne',
    danielsPacesTitle: 'Les 5 Zones d’Allures d’Entraînement selon votre VO2 Max (Jack Daniels)',
    equivTableTitle: 'Prédicteur de Chronos Équivalents selon votre VO2 Max (800m au Marathon)',
    distCol: 'Distance',
    predTimeCol: 'Temps Prédit',
    paceKmCol: 'Allure /km',
    paceMiCol: 'Allure /mile',
    asrTitle: 'Calculateur de Réserve de Vitesse Anaérobie (ASR)',
    asrDesc:
      'Au-delà de 100% VMA, prescrire en % de VMA crée des inégalités entre un profil sprinteur et un profil endurant. L’ASR (Vitesse Max Sprint − VMA) égalise la sollicitation anaérobie.',
    vmaInputLabel: 'VMA / MAS (km/h)',
    sprintInputLabel: 'Vitesse Max Sprint — MSS (km/h)',
    asrReserveLabel: 'Réserve ASR (Vmax − VMA)',
    speedRatioLabel: 'Ratio de Vitesse (MSS / MAS)',
    profileLabel: 'Profil Neuromusculaire & Interprétation',
    profileEndurant: 'Profil Endurant (Ratio < 1.80) : Haute économie aérobie, réserve anaérobie étroite. Prioriser le travail de vitesse maximale et de pliométrie.',
    profileHybrid: 'Profil Hybride / Complet (Ratio 1.80 – 1.95) : Équilibre optimal entre puissance aérobie (VMA) et explosivité anaérobie.',
    profileSprinter: 'Profil Explosif / Sprinteur (Ratio > 1.95) : Grande réserve anaérobie mais risque d’acidose rapide. Réduire le % VMA sur les intermittents courts ou travailler en % ASR.',
    supramaxTableTitle: 'Prescription Supramaximale en % ASR (Séances 15"/15" & 30"/30")',
    ieTitle: 'Calculateur d’Indice d’Endurance (Modèle Péronnet & Thibault)',
    ieDesc:
      'L’Indice d’Endurance (IE) mesure la pente de décroissance du % de VMA maintenu lorsque la durée de course s’allonge (échelle de -4 excellent à -12 faible).',
    ieScoreLabel: 'Indice d’Endurance (IE)',
    pctVmaSustainedLabel: '% VMA Soutenu sur l’épreuve',
    ieInterpretationTitle: 'Interprétation Physiologique de l’Indice d’Endurance',
    ieElite: 'Endurance Exceptionnelle (IE ≥ -5.5) : Capacité remarquable à maintenir un haut % de VMA (Seuil lactique SV2 très élevé). Idéal pour le 10 km, Semi et Marathon. Axe de progrès : développer le plafond de VMA.',
    ieGood: 'Bonne Endurance Aérobie (-7.5 ≤ IE < -5.5) : Profil bien équilibré entre VMA et capacité de soutien aérobie.',
    ieAverage: 'Endurance Moyenne (-9.5 ≤ IE < -7.5) : Décroissance standard avec la distance. Intégrer davantage de séances au Seuil Anaérobie (85–88% VMA).',
    ieLow: 'Endurance Faible / Profil Vitesse (IE < -9.5) : Votre VMA est élevée par rapport à votre chrono en course. Priorité absolue : travail au seuil, tempo et volume en endurance fondamentale (Z2).',
    seoLinksTitle: 'Maillage Scientifique ProfEPS.ma Associé',
    getHtmlBtn: 'Obtenir le code HTML & PowerShell de cet outil',
  },
  en: {
    clusterBadge: 'Cluster 1 · VO2 Max, VDOT, ASR & Endurance',
    title: 'VO2 Max Calculator (ml/kg/min), VDOT, Anaerobic Speed Reserve (ASR) & Endurance Index',
    subtitle:
      'Each calculator has its own dedicated standalone HTML page: VO2 Max & VDOT Calculator (ml/kg/min), Anaerobic Speed Reserve (ASR), and Péronnet-Thibault Endurance Index.',
    tabVdot: '1A. VO2 Max (ml/kg/min) & VDOT Calculator',
    tabAsr: '1B. Anaerobic Speed Reserve (ASR)',
    tabIe: '1C. Endurance Index (EI)',
    vdotScoreLabel: 'Estimated VO2 Max & VDOT (ml/kg/min)',
    vo2Equiv: 'Maximal oxygen uptake (VO2 Max)',
    selectRaceDist: 'Recent race distance',
    raceTimeLabel: 'Finish Time (Hours : Min : Sec)',
    avgPaceLabel: 'Average Pace',
    danielsPacesTitle: 'Official Jack Daniels Training Paces (E, M, T, I, R)',
    equivTableTitle: 'Equivalent Race Time Predictor (800m to Marathon)',
    distCol: 'Distance',
    predTimeCol: 'Predicted Time',
    paceKmCol: 'Pace /km',
    paceMiCol: 'Pace /mile',
    asrTitle: 'Anaerobic Speed Reserve (ASR) Calculator',
    asrDesc:
      'Above 100% MAS, prescribing by % MAS creates unequal strain between sprinters and endurance profiles. ASR (Max Sprint Speed − MAS) equalizes anaerobic load.',
    vmaInputLabel: 'MAS / VMA (km/h)',
    sprintInputLabel: 'Max Sprint Speed — MSS (km/h)',
    asrReserveLabel: 'ASR Reserve (MSS − MAS)',
    speedRatioLabel: 'Speed Reserve Ratio (MSS / MAS)',
    profileLabel: 'Neuromuscular Profile & Interpretation',
    profileEndurant: 'Endurance Profile (Ratio < 1.80): High aerobic economy, narrow anaerobic reserve. Prioritize max velocity sprints and plyometrics.',
    profileHybrid: 'Hybrid / All-Round Profile (Ratio 1.80 – 1.95): Optimal balance between aerobic power (MAS) and anaerobic explosiveness.',
    profileSprinter: 'Explosive / Sprinter Profile (Ratio > 1.95): Large anaerobic reserve with rapid acidosis onset. Prescribe short intervals using % ASR.',
    supramaxTableTitle: 'Supramaximal Prescription by % ASR (15s/15s & 30s/30s HIIT)',
    ieTitle: 'Endurance Index Calculator (Péronnet & Thibault Model)',
    ieDesc:
      'The Endurance Index (EI) quantifies the rate of decline in sustainable % MAS as race duration increases (scale from -4 elite to -12 low).',
    ieScoreLabel: 'Endurance Index (EI)',
    pctVmaSustainedLabel: '% MAS Sustained in Race',
    ieInterpretationTitle: 'Physiological Interpretation of Endurance Index',
    ieElite: 'Exceptional Endurance (EI ≥ -5.5): Outstanding fractional utilization of MAS (high LT2 threshold). Focus on raising ceiling VO₂max/MAS.',
    ieGood: 'Good Aerobic Endurance (-7.5 ≤ EI < -5.5): Well-balanced relationship between MAS and submaximal stamina.',
    ieAverage: 'Moderate Endurance (-9.5 ≤ EI < -7.5): Standard pace decay over distance. Add lactate threshold intervals (85–88% MAS).',
    ieLow: 'Low Endurance / Speed Profile (EI < -9.5): High MAS relative to race performance. Priority: threshold runs, tempo blocks, and Zone 2 volume.',
    seoLinksTitle: 'Related ProfEPS.ma Scientific Guides',
    getHtmlBtn: 'Get Standalone HTML & PowerShell for this Tool',
  },
  ar: {
    clusterBadge: 'القطب 1 · الأداء، مؤشر VDOT، احتياطي السرعة اللاهوائية والتحمل',
    title: 'حاسبة VDOT جاك دانيالز، احتياطي السرعة اللاهوائية (ASR) ومؤشر التحمل',
    subtitle:
      'ضبط علمي دقيق لإيقاعات التدريب الهوائية (VDOT)، احتياطي السرعة فوق القصوى (ASR = أقصى سرعة − VMA)، ومؤشر التحمل (Péronnet & Thibault).',
    tabVdot: '1A. حاسبة VDOT وتوقعات السباقات',
    tabAsr: '1B. احتياطي السرعة اللاهوائية (ASR)',
    tabIe: '1C. مؤشر التحمل (IE)',
    vdotScoreLabel: 'مؤشر VDOT جاك دانيالز',
    vo2Equiv: 'مؤشر الكفاءة الهوائية الفعلي',
    selectRaceDist: 'مسافة السباق المرجعي',
    raceTimeLabel: 'الزمن المحقق (ساعة : دقيقة : ثانية)',
    avgPaceLabel: 'متوسط الإيقاع',
    danielsPacesTitle: 'إيقاعات التدريب الخمسة المعتمدة (E, M, T, I, R)',
    equivTableTitle: 'جدول التوقعات والأزمنة المكافئة (من 800 متر إلى الماراثون)',
    distCol: 'المسافة',
    predTimeCol: 'الزمن المتوقع',
    paceKmCol: 'الإيقاع /كم',
    paceMiCol: 'الإيقاع /ميل',
    asrTitle: 'حاسبة احتياطي السرعة اللاهوائية (ASR)',
    asrDesc:
      'فوق 100% من السرعة الهوائية القصوى (VMA)، يختلف الإجهاد اللاهوائي بين العداء السريع وعداء التحمل. يتيح حساب ASR (أقصى سرعة انطلاق − VMA) توحيد الحمل التدريبي.',
    vmaInputLabel: 'السرعة الهوائية القصوى VMA (كم/س)',
    sprintInputLabel: 'أقصى سرعة انطلاق MSS (كم/س)',
    asrReserveLabel: 'احتياطي السرعة ASR',
    speedRatioLabel: 'نسبة السرعة (MSS / VMA)',
    profileLabel: 'التفسير الفيزيولوجي ونوع العداء',
    profileEndurant: 'نمط التحمل (النسبة < 1.80): كفاءة هوائية عالية واحتياطي لاهوائي محدود. يُنصح بتطوير السرعة القصوى والقوة الانفجارية.',
    profileHybrid: 'نمط متوازن / شامل (1.80 – 1.95): توازن مثالي بين القوة الهوائية (VMA) والقدرة الانفجارية.',
    profileSprinter: 'نمط انفجاري / سريع (النسبة > 1.95): احتياطي لاهوائي كبير مع تراكم سريع للاكتات. يُنصح بضبط التمارين المتقطعة وفق نسبة % ASR.',
    supramaxTableTitle: 'جدول السرعات والمسافات فوق القصوى حسب % ASR (تمارين 15/15 و 30/30)',
    ieTitle: 'حاسبة مؤشر التحمل (نموذج Péronnet & Thibault)',
    ieDesc:
      'يقيس مؤشر التحمل (IE) قدرة الرياضي على الحفاظ على نسبة عالية من VMA مع زيادة مسافة السباق (من -4 ممتاز إلى -12 ضعيف).',
    ieScoreLabel: 'مؤشر التحمل (IE)',
    pctVmaSustainedLabel: 'نسبة % VMA المحققة في السباق',
    ieInterpretationTitle: 'التفسير الفيزيولوجي لمؤشر التحمل وتوجيه التدريب',
    ieElite: 'تحمل ممتاز جداً (IE ≥ -5.5): قدرة عالية على الحفاظ على نسبة مرتفعة من VMA. الأولوية: تطوير سقف VMA.',
    ieGood: 'تحمل هوائي جيد (-7.5 ≤ IE < -5.5): توازن جيد بين السرعة القصوى الهوائية والقدرة على التحمل.',
    ieAverage: 'تحمل متوسط (-9.5 ≤ IE < -7.5): يُنصح بزيادة حصص العتبة اللاهوائية (85%–88% VMA).',
    ieLow: 'تحمل منخفض / نمط سرعة (IE < -9.5): سرعة VMA عالية مقارنة بزمن السباق. الأولوية القصوى: تمارين العتبة والتحمل الأساسي (Z2).',
    seoLinksTitle: 'مقالات علمية مرتبطة على موقع ProfEPS.ma',
    getHtmlBtn: 'احصل على كود HTML وأمر PowerShell لهذه الأداة',
  },
};

export const Cluster1Performance: React.FC<Cluster1PerformanceProps> = ({
  lang,
  setLang,
  globalVma,
  setGlobalVma,
  onOpenHtmlExport,
}) => {
  const t = T[lang];
  const isRtl = lang === 'ar';

  const [subTab, setSubTab] = useState<'vdot' | 'asr' | 'ie'>('vdot');

  // VDOT state
  const [selectedDistId, setSelectedDistId] = useState<string>('10k');
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(42);
  const [seconds, setSeconds] = useState<number>(30);

  // ASR state
  const [maxSprintKmh, setMaxSprintKmh] = useState<number>(29.5);

  // Calculations
  const currentDistObj = useMemo(() => {
    return COMMON_DISTANCES.find(d => d.id === selectedDistId) || COMMON_DISTANCES[5];
  }, [selectedDistId]);

  const totalRaceSec = useMemo(() => hours * 3600 + minutes * 60 + seconds, [hours, minutes, seconds]);

  const vdotScore = useMemo(() => {
    return calculateVdot(currentDistObj.meters, totalRaceSec);
  }, [currentDistObj.meters, totalRaceSec]);

  const danielsPaces = useMemo(() => getDanielsTrainingPaces(vdotScore), [vdotScore]);

  const equivRaces = useMemo(() => {
    return COMMON_DISTANCES.map(d => {
      const sec = predictRaceTimeFromVdot(d.meters, vdotScore);
      const paceSec = Math.round(sec / (d.meters / 1000));
      return {
        ...d,
        predictedFormatted: formatSecondsToHhMmSs(sec),
        paceKm: formatPace(paceSec),
        paceMile: formatPaceMile(paceSec),
      };
    });
  }, [vdotScore]);

  const asrResult = useMemo(() => {
    return calculateAsrProfile(globalVma, maxSprintKmh);
  }, [globalVma, maxSprintKmh]);

  const ieResult = useMemo(() => {
    return calculateEnduranceIndex(globalVma, currentDistObj.meters, totalRaceSec);
  }, [globalVma, currentDistObj.meters, totalRaceSec]);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Top Tool Card Header with Top-Right Compact Language Toggle */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Activity className="w-4 h-4" />
              <span>{t.clusterBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {t.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">{t.subtitle}</p>
          </div>

          {/* Compact Language Toggle exclusively on Added Tool Pages */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <ToolLanguageToggle lang={lang} setLang={setLang} />
            {onOpenHtmlExport && (
              <button
                type="button"
                onClick={() => onOpenHtmlExport('cluster1')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                {t.getHtmlBtn}
              </button>
            )}
          </div>
        </div>

        {/* Sub-tool Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          {[
            { id: 'vdot', label: t.tabVdot },
            { id: 'asr', label: t.tabAsr },
            { id: 'ie', label: t.tabIe },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                subTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1A: VDOT Jack Daniels */}
      {subTab === 'vdot' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {t.selectRaceDist}
                  </label>
                  <select
                    value={selectedDistId}
                    onChange={e => setSelectedDistId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                  >
                    {COMMON_DISTANCES.map(d => (
                      <option key={d.id} value={d.id}>
                        {lang === 'fr' ? d.nameFr : lang === 'en' ? d.nameEn : d.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {t.raceTimeLabel}
                  </label>
                  <div dir="ltr" className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={hours}
                      onChange={e => setHours(Math.max(0, Number(e.target.value)))}
                      placeholder="HH"
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-center text-sm font-mono font-bold text-slate-900 tabular-nums"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={e => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                      placeholder="MM"
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-center text-sm font-mono font-bold text-slate-900 tabular-nums"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={e => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                      placeholder="SS"
                      className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-center text-sm font-mono font-bold text-slate-900 tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* 5 Daniels Paces */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h2 className="text-sm font-bold text-slate-900">{t.danielsPacesTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    {
                      code: 'Easy (E)',
                      pct: '62–74% VO₂',
                      pace: `${formatPace(danielsPaces.easyPaceSecPerKm[1])} - ${formatPace(danielsPaces.easyPaceSecPerKm[0])}`,
                      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
                    },
                    {
                      code: 'Marathon (M)',
                      pct: '80% VO₂',
                      pace: formatPace(danielsPaces.marathonPaceSecPerKm),
                      color: 'bg-blue-50 border-blue-200 text-blue-900',
                    },
                    {
                      code: 'Threshold (T)',
                      pct: '88% VO₂',
                      pace: formatPace(danielsPaces.thresholdPaceSecPerKm),
                      color: 'bg-amber-50 border-amber-200 text-amber-900',
                    },
                    {
                      code: 'Interval (I)',
                      pct: '98% VO₂',
                      pace: formatPace(danielsPaces.intervalPaceSecPerKm),
                      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
                    },
                    {
                      code: 'Repetition (R)',
                      pct: '107% VO₂',
                      pace: formatPace(danielsPaces.repetitionPaceSecPerKm),
                      color: 'bg-rose-50 border-rose-200 text-rose-900',
                    },
                  ].map((p, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${p.color}`}>
                      <div className="text-xs font-bold">{p.code}</div>
                      <div dir="ltr" className="text-sm font-extrabold font-mono tabular-nums mt-1">
                        {p.pace}
                      </div>
                      <div className="text-[11px] opacity-75 font-mono mt-0.5">{p.pct}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VDOT Score Highlight Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-emerald-600 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                  {t.vdotScoreLabel}
                </span>
                <div dir="ltr" className="text-5xl font-black font-mono tabular-nums my-2">
                  {vdotScore.toFixed(1)}
                </div>
                <p className="text-xs text-blue-100">{t.vo2Equiv}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20 text-xs">
                <div>
                  <span className="text-blue-100 block">{t.avgPaceLabel}</span>
                  <strong dir="ltr" className="font-mono text-base tabular-nums">
                    {formatPace(Math.round(totalRaceSec / (currentDistObj.meters / 1000)))}
                  </strong>
                </div>
                <div>
                  <span className="text-blue-100 block">400m (I-Pace)</span>
                  <strong dir="ltr" className="font-mono text-base tabular-nums">
                    {formatSecondsToMinSec(danielsPaces.intervalPaceSecPerKm * 0.4)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Equivalent Race Predictions Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">{t.equivTableTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2.5 px-3">{t.distCol}</th>
                    <th className="py-2.5 px-3 text-right">{t.predTimeCol}</th>
                    <th className="py-2.5 px-3 text-right">{t.paceKmCol}</th>
                    <th className="py-2.5 px-3 text-right">{t.paceMiCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {equivRaces.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {lang === 'fr' ? r.nameFr : lang === 'en' ? r.nameEn : r.nameAr}
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono font-bold text-blue-600 tabular-nums">
                        {r.predictedFormatted}
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono text-slate-700 tabular-nums">
                        {r.paceKm}
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono text-slate-500 tabular-nums">
                        {r.paceMile}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <CalculatorScientificCard toolId="vdot" lang={lang} />
        </div>
      )}

      {/* 1B: Anaerobic Speed Reserve (ASR) */}
      {subTab === 'asr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">{t.asrTitle}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{t.asrDesc}</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.vmaInputLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-emerald-600 tabular-nums">
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
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.sprintInputLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-blue-600 tabular-nums">
                    {maxSprintKmh.toFixed(1)} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="38"
                  step="0.5"
                  value={maxSprintKmh}
                  onChange={e => setMaxSprintKmh(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <div className="text-[11px] font-semibold text-blue-800">{t.asrReserveLabel}</div>
                <div dir="ltr" className="text-2xl font-extrabold font-mono text-blue-700 tabular-nums mt-1">
                  {asrResult.asrKmh} km/h
                </div>
                <div dir="ltr" className="text-[11px] font-mono text-blue-600">
                  ({asrResult.asrMs} m/s)
                </div>
              </div>
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <div className="text-[11px] font-semibold text-emerald-800">{t.speedRatioLabel}</div>
                <div dir="ltr" className="text-2xl font-extrabold font-mono text-emerald-700 tabular-nums mt-1">
                  {asrResult.speedReserveRatio.toFixed(2)}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 uppercase mt-0.5">
                  {asrResult.profileType}
                </div>
              </div>
            </div>

            {/* Interpretation Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">{t.profileLabel}</div>
              <p className="text-slate-700 leading-relaxed">
                {asrResult.profileType === 'endurant'
                  ? t.profileEndurant
                  : asrResult.profileType === 'hybrid'
                  ? t.profileHybrid
                  : t.profileSprinter}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">{t.supramaxTableTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="py-2.5 px-3">% ASR</th>
                    <th className="py-2.5 px-3 text-right">Vitesse Cible</th>
                    <th className="py-2.5 px-3 text-right">Équiv. % VMA</th>
                    <th className="py-2.5 px-3 text-right">Plot 15 sec</th>
                    <th className="py-2.5 px-3 text-right">Plot 30 sec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {asrResult.supramaxTargets.map(row => (
                    <tr key={row.percentAsr} className="hover:bg-slate-50">
                      <td dir="ltr" className="py-2.5 px-3 font-mono font-bold text-blue-600 tabular-nums">
                        100% VMA + {row.percentAsr}% ASR
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                        {row.targetSpeedKmh} km/h ({row.targetSpeedMs} m/s)
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono text-emerald-700 tabular-nums">
                        {row.equivPercentVma}% VMA
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono font-bold text-slate-800 tabular-nums">
                        {row.dist15s} m
                      </td>
                      <td dir="ltr" className="py-2.5 px-3 text-right font-mono font-bold text-slate-800 tabular-nums">
                        {row.dist30s} m
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <div className="lg:col-span-12">
            <CalculatorScientificCard toolId="asr" lang={lang} />
          </div>
        </div>
      )}

      {/* 1C: Endurance Index (Péronnet & Thibault) */}
      {subTab === 'ie' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="max-w-3xl space-y-1.5">
              <h2 className="text-base font-bold text-slate-900">{t.ieTitle}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{t.ieDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-blue-800">{t.ieScoreLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-blue-700 tabular-nums my-1">
                  {ieResult.enduranceIndex}
                </div>
                <span className="text-[11px] text-blue-700">Péronnet & Thibault</span>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-emerald-800">{t.pctVmaSustainedLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-emerald-700 tabular-nums my-1">
                  {ieResult.percentVmaSustained}%
                </div>
                <span dir="ltr" className="text-[11px] text-emerald-700">
                  {ieResult.raceSpeedKmh} km/h / VMA {ieResult.vmaKmh} km/h
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-900 mb-1">{t.ieInterpretationTitle}</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {ieResult.category === 'elite-endurance'
                    ? t.ieElite
                    : ieResult.category === 'good-endurance'
                    ? t.ieGood
                    : ieResult.category === 'average-endurance'
                    ? t.ieAverage
                    : t.ieLow}
                </p>
              </div>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <CalculatorScientificCard toolId="ie" lang={lang} />
        </div>
      )}

      {/* Contextual SEO Internal Linking Bar to ProfEPS.ma */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700">{t.seoLinksTitle} :</span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://profeps.ma/article-anaerobic-speed-reserve-asr-mas.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>Réserve de Vitesse Anaérobie (ASR)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">·</span>
          <a
            href="https://profeps.ma/article-predict-race-times-from-mas-vma.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>Prédire les Chronos depuis la VMA</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">·</span>
          <a
            href="https://profeps.ma/article-mas-vs-vo2max-running-economy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>VMA, VO₂max & Économie de Course</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
