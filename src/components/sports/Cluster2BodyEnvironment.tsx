import React, { useState, useMemo } from 'react';
import {
  ToolLang,
  calculateHeartRateAnalysis,
  calculateBmiAnalysis,
  calculateUniversalWeatherAdjustment,
  formatPace,
} from '../../utils/sportsScience';
import { ToolLanguageToggle } from './ToolLanguageToggle';
import { CalculatorScientificCard } from './CalculatorScientificCard';
import { Heart, Scale, Sun, ExternalLink, Activity, Droplets, Mountain } from 'lucide-react';

interface Cluster2Props {
  lang: ToolLang;
  setLang: (lang: ToolLang) => void;
  onOpenHtmlExport?: (toolId: string) => void;
}

const T = {
  fr: {
    badge: 'Cluster 2 · Fréquence Cardiaque, IMC Corporel & Thermorégulation Mondiale',
    title: 'Calculateur Fréquence Cardiaque, IMC Sportif & Ajustement Météo / Altitude',
    subtitle:
      'Analysez vos zones cardiaques de Karvonen avec interprétation physiologique, votre Indice de Masse Corporelle (IMC & Masse Grasse IMG) et l’impact mondial de la chaleur, de l’humidité et de l’altitude.',
    tabHr: '2A. Fréquence Cardiaque & Interprétation',
    tabBmi: '2B. Calculateur IMC / IMG & Interprétation',
    tabWeather: '2C. Météo, Chaleur, Humidité & Altitude',
    ageLabel: 'Âge (années)',
    restHrLabel: 'FC de Repos au réveil (bpm)',
    formulaLabel: 'Méthode de calcul FC Max',
    customMaxLabel: 'FC Max mesurée (bpm)',
    maxHrResult: 'FC Maximale Retenue',
    hrrResult: 'FC de Réserve (Karvonen)',
    restDiagTitle: 'Diagnostic & Interprétation de votre FC de Repos',
    restAthletic: 'Bradycardie Athlétique (< 50 bpm) : Adaptation cardiovasculaire d’endurance avancée. Volume d’éjection systolique (VES) très élevé.',
    restExcellent: 'Excellente Condition Aérobie (50–62 bpm) : Fonction vagale parasympathique efficace et bonne récupération.',
    restNormal: 'Condition Cardiovasculaire Normale (63–76 bpm) : Valeur standard adulte. Le travail en Zone 2 (60–70% FCR) abaissera progressivement cette valeur.',
    restElevated: 'FC de Repos Élevée (> 76 bpm) : Peut indiquer un manque de base aérobie, une déshydratation ou une fatigue résiduelle.',
    zonesTableTitle: 'Les 5 Zones Cardiaques (Karvonen) & Interprétation Physiologique',
    bmiTitle: 'Calculateur d’Indice de Masse Corporelle (IMC) & Masse Grasse (IMG)',
    weightLabel: 'Poids corporel (kg)',
    heightLabel: 'Taille (cm)',
    sexLabel: 'Sexe biologique',
    male: 'Homme',
    female: 'Femme',
    weeklyHoursLabel: 'Heures d’entraînement / semaine',
    bmiScoreLabel: 'Indice IMC (kg/m²)',
    imgScoreLabel: 'Masse Grasse Estimée (IMG)',
    leanMassLabel: 'Masse Maigre Estimée',
    whoTitle: '1. Interprétation Santé Générale (Norme OMS)',
    whoUnder: 'Insuffisance pondérale (< 18.5) : Risque de déficit énergétique relatif dans le sport (RED-S), baisse immunitaire et risque de fracture de fatigue.',
    whoNormal: 'Corpulence Normale (18.5 – 24.9) : Poids santé optimal associé au plus faible risque métabolique et articulaire.',
    whoOver: 'Surpoids au sens OMS (25.0 – 29.9) : Attention, chez le sportif musclé, un IMC > 25 reflète souvent une forte masse maigre et non un excès adipeux.',
    whoObese: 'Obésité (≥ 30.0) : Charge mécanique accrue sur les tendons et articulations. Privilégier la progressivité et le travail porté.',
    athTitle: '2. Interprétation Spécifique Athlète & Impact Performance',
    athEndurance: 'Profil Optimisé Endurance : Rapport poids/puissance idéal pour la course de fond et l’économie d’oxygène.',
    athMuscular: 'Profil Puissance / Masse Musculaire Dense : Votre IMC dépasse 25 mais votre taux de masse grasse est bas grâce à l’entraînement. Vous êtes athlétique, non en surpoids.',
    athWarning: 'Alerte Disponibilité Énergétique : Masse corporelle basse. Veillez à maintenir un apport calorique et glucidique suffisant.',
    athGeneral: 'Profil Sportif Équilibré : Plage de poids santé idéale. Chaque kg superflu coûte environ ~2,1 sec/km sur 10 km et Marathon.',
    weatherTitle: 'Ajustement Universel Chaleur, Humidité, Vent & Altitude (Modèle McMillan)',
    tempLabel: 'Température ambiante (°C)',
    humLabel: 'Humidité relative (%)',
    altLabel: 'Altitude (mètres)',
    windLabel: 'Vent de face (+) / dos (-) en km/h',
    basePaceLabel: 'Allure de base au frais (min : sec /km)',
    slowdownLabel: 'Impact Physiologique Total',
    adjPaceLabel: 'Allure Ajustée Recommandée',
    dewPointLabel: 'Point de Rosée (Dew Point)',
    hydrationLabel: 'Hydratation & Sodium Recommandés',
    getHtmlBtn: 'Obtenir le code HTML & PowerShell de cet outil',
  },
  en: {
    badge: 'Cluster 2 · Heart Rate, Body Mass Index & Global Thermoregulation',
    title: 'Heart Rate Zones, Athletic BMI/Body Fat & Weather/Altitude Calculator',
    subtitle:
      'Analyze your Karvonen Heart Rate zones with full physiological interpretation, your Body Mass Index (BMI & Body Fat %) and global heat, humidity, and altitude adjustments.',
    tabHr: '2A. Heart Rate & Interpretation',
    tabBmi: '2B. BMI / Body Fat & Interpretation',
    tabWeather: '2C. Weather, Heat, Humidity & Altitude',
    ageLabel: 'Age (years)',
    restHrLabel: 'Resting Heart Rate (bpm)',
    formulaLabel: 'Max HR Formula',
    customMaxLabel: 'Measured Max HR (bpm)',
    maxHrResult: 'Target Max HR',
    hrrResult: 'Heart Rate Reserve (HRR)',
    restDiagTitle: 'Resting Heart Rate Diagnostic & Interpretation',
    restAthletic: 'Athletic Bradycardia (< 50 bpm): Advanced endurance cardiovascular adaptation and high stroke volume.',
    restExcellent: 'Excellent Aerobic Fitness (50–62 bpm): Strong parasympathetic tone and cardiorespiratory recovery.',
    restNormal: 'Normal Cardiovascular Baseline (63–76 bpm): Standard adult range. Consistent Zone 2 training will gradually lower it.',
    restElevated: 'Elevated Resting HR (> 76 bpm): May indicate low aerobic conditioning, dehydration, or accumulated fatigue.',
    zonesTableTitle: '5 Karvonen Heart Rate Zones & Physiological Interpretation',
    bmiTitle: 'Body Mass Index (BMI) & Body Fat Percentage (IMG) Calculator',
    weightLabel: 'Body Weight (kg)',
    heightLabel: 'Height (cm)',
    sexLabel: 'Biological Sex',
    male: 'Male',
    female: 'Female',
    weeklyHoursLabel: 'Weekly Training Hours',
    bmiScoreLabel: 'BMI Score (kg/m²)',
    imgScoreLabel: 'Estimated Body Fat %',
    leanMassLabel: 'Estimated Lean Mass',
    whoTitle: '1. World Health Organization (WHO) Standard Interpretation',
    whoUnder: 'Underweight (< 18.5): Risk of Relative Energy Deficiency in Sport (RED-S), hormonal suppression, and bone stress injuries.',
    whoNormal: 'Normal Weight (18.5 – 24.9): Optimal health weight range with minimal metabolic and joint stress.',
    whoOver: 'Overweight by WHO scale (25.0 – 29.9): In trained athletes, BMI > 25 often reflects dense skeletal muscle rather than excess fat.',
    whoObese: 'Class I/II Obesity (≥ 30.0): Higher mechanical load on lower-limb joints. Prioritize progressive low-impact volume.',
    athTitle: '2. Athletic Body Composition & Running Economy Interpretation',
    athEndurance: 'Optimal Endurance Profile: High power-to-weight ratio for distance running economy.',
    athMuscular: 'Muscular / Power Athlete Profile: Your BMI is ≥ 25 but estimated body fat is low due to training volume. High lean muscle mass.',
    athWarning: 'Low Energy Availability Warning: Ensure adequate carbohydrate and caloric intake to protect lean tissue.',
    athGeneral: 'Balanced Athletic Profile: Healthy weight range. Every 1 kg of excess non-functional mass costs ~2.1 sec/km over 10K–Marathon.',
    weatherTitle: 'Global Heat, Humidity, Wind & Altitude Pace Calculator (McMillan Model)',
    tempLabel: 'Ambient Temperature (°C)',
    humLabel: 'Relative Humidity (%)',
    altLabel: 'Altitude / Elevation (meters)',
    windLabel: 'Headwind (+) / Tailwind (-) in km/h',
    basePaceLabel: 'Baseline Cool-Weather Pace (min : sec /km)',
    slowdownLabel: 'Total Physiological Slowdown',
    adjPaceLabel: 'Adjusted Target Pace',
    dewPointLabel: 'Dew Point',
    hydrationLabel: 'Recommended Fluid & Sodium Intake',
    getHtmlBtn: 'Get Standalone HTML & PowerShell for this Tool',
  },
  ar: {
    badge: 'القطب 2 · نبضات القلب، مؤشر كتلة الجسم والطقس والمرتفعات عالمياً',
    title: 'حاسبة نبضات القلب (Karvonen)، مؤشر كتلة الجسم (BMI) وتعديل الحرارة والمرتفعات',
    subtitle:
      'تحليل شامل لنطاقات نبض القلب مع التفسير الفيزيولوجي، وحساب مؤشر كتلة الجسم ونسبة الدهون للرياضيين، وتأثير الحرارة والرطوبة والارتفاع.',
    tabHr: '2A. نبضات القلب والتفسير الفيزيولوجي',
    tabBmi: '2B. مؤشر كتلة الجسم (IMC) والتفسير',
    tabWeather: '2C. الحرارة، الرطوبة والمرتفعات',
    ageLabel: 'العمر (سنوات)',
    restHrLabel: 'نبض الراحة صباحاً (نبضة/د)',
    formulaLabel: 'معادلة أقصى نبض (FC Max)',
    customMaxLabel: 'أقصى نبض مقاس (bpm)',
    maxHrResult: 'أقصى نبض للقلب (FC Max)',
    hrrResult: 'احتياطي نبض القلب (Karvonen)',
    restDiagTitle: 'تشخيص وتفسير نبض القلب في وقت الراحة',
    restAthletic: 'بطء القلب الرياضي (< 50 نبضة/د): تكيف قلبي وعائي عالي المستوى وحجم ضخ كبير للقلب.',
    restExcellent: 'لياقة هوائية ممتازة (50–62 نبضة/د): كفاءة عالية للجهاز العصبي واستشفاء جيد.',
    restNormal: 'معدل طبيعي (63–76 نبضة/د): المعدل المعتاد للبالغين، ويمكن خفضه تدريجياً عبر التدريب في المنطقة الهوائية Z2.',
    restElevated: 'نبض راحة مرتفع (> 76 نبضة/د): قد يشير إلى إجهاد متراكم أو نقص السوائل أو الحاجة لتطوير القاعدة الهوائية.',
    zonesTableTitle: 'نطاقات نبض القلب الخمسة (Karvonen) والتفسير الفيزيولوجي',
    bmiTitle: 'حاسبة مؤشر كتلة الجسم (IMC) ونسبة الدهون والوزن المثالي للرياضي',
    weightLabel: 'الوزن (كغ)',
    heightLabel: 'الطول (سم)',
    sexLabel: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    weeklyHoursLabel: 'ساعات التدريب أسبوعياً',
    bmiScoreLabel: 'مؤشر كتلة الجسم (kg/m²)',
    imgScoreLabel: 'نسبة الدهون المقدرة (IMG)',
    leanMassLabel: 'الكتلة العضلية الصافية',
    whoTitle: '1. التفسير الصحي العام (معيار منظمة الصحة العالمية OMS)',
    whoUnder: 'نقص الوزن (< 18.5): خطر نقص الطاقة النسبي في الرياضة (RED-S) وإجهاد العظام.',
    whoNormal: 'وزن طبيعي وصحي (18.5 – 24.9): توازن صحي مثالي للمفاصل والتمثيل الغذائي.',
    whoOver: 'زيادة وزن حسب معيار OMS (25.0 – 29.9): تنبيه: لدى الرياضيين، غالباً ما يعكس المؤشر فوق 25 كثافة عضلية عالية وليس سمنة.',
    whoObese: 'سمنة (≥ 30.0): عبء ميكانيكي إضافي على المفاصل والأوتار؛ يُنصح بالتدرج في الحمل التدريبي.',
    athTitle: '2. التفسير الخاص بالرياضيين وتأثير الوزن على الأداء',
    athEndurance: 'نمط مثالي لرياضات التحمل: نسبة القوة إلى الوزن ممتازة لاقتصاد الجري.',
    athMuscular: 'نمط عضلي / رياضي القوة: مؤشر كتلة الجسم فوق 25 لكن نسبة الدهون منخفضة بفضل الكتلة العضلية.',
    athWarning: 'تنبيه نقص الطاقة: احرص على تغذية كافية بالكربوهيدرات والبروتينات.',
    athGeneral: 'وزن رياضي متوازن: كل 1 كغ إضافي غير عضلي يكلف حوالي ~2.1 ثانية/كم في سباقات 10 كم والماراثون.',
    weatherTitle: 'الحاسبة العالمية لتعديل الإيقاع حسب الحرارة، الرطوبة، الرياح والارتفاع',
    tempLabel: 'درجة الحرارة (°C)',
    humLabel: 'الرطوبة النسبية (%)',
    altLabel: 'الارتفاع عن سطح البحر (متر)',
    windLabel: 'سرعة الرياح المعاكسة (+) / المساعدة (-) كم/س',
    basePaceLabel: 'الإيقاع المرجعي في الطقس المعتدل (دقيقة : ثانية /كم)',
    slowdownLabel: 'نسبة التباطؤ الفيزيولوجي الإجمالية',
    adjPaceLabel: 'الإيقاع المعدل الموصى به',
    dewPointLabel: 'نقطة الندى (Dew Point)',
    hydrationLabel: 'الترطيب والصوديوم الموصى بهما في الساعة',
    getHtmlBtn: 'احصل على كود HTML وأمر PowerShell لهذه الأداة',
  },
};

export const Cluster2BodyEnvironment: React.FC<Cluster2Props> = ({
  lang,
  setLang,
  onOpenHtmlExport,
}) => {
  const t = T[lang];
  const isRtl = lang === 'ar';

  const [subTab, setSubTab] = useState<'hr' | 'bmi' | 'weather'>('hr');

  // 2A: Heart Rate States
  const [age, setAge] = useState<number>(28);
  const [restHr, setRestHr] = useState<number>(54);
  const [hrFormula, setHrFormula] = useState<'tanaka' | 'gellish' | 'astrand' | 'custom'>('tanaka');
  const [customMaxHr, setCustomMaxHr] = useState<number>(192);

  // 2B: BMI States
  const [weightKg, setWeightKg] = useState<number>(68);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [weeklyHours, setWeeklyHours] = useState<number>(6);

  // 2C: Universal Weather & Altitude States
  const [tempC, setTempC] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(65);
  const [altitudeM, setAltitudeM] = useState<number>(200);
  const [windKmh, setWindKmh] = useState<number>(10);
  const [basePaceMin, setBasePaceMin] = useState<number>(4);
  const [basePaceSec, setBasePaceSec] = useState<number>(30);

  const hrResult = useMemo(() => {
    return calculateHeartRateAnalysis(age, restHr, customMaxHr, hrFormula);
  }, [age, restHr, customMaxHr, hrFormula]);

  const bmiResult = useMemo(() => {
    return calculateBmiAnalysis(weightKg, heightCm, age, sex, weeklyHours);
  }, [weightKg, heightCm, age, sex, weeklyHours]);

  const weatherResult = useMemo(() => {
    return calculateUniversalWeatherAdjustment(
      tempC,
      humidity,
      altitudeM,
      windKmh,
      basePaceMin * 60 + basePaceSec
    );
  }, [tempC, humidity, altitudeM, windKmh, basePaceMin, basePaceSec]);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header with Top-Right Compact Language Toggle */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <Heart className="w-4 h-4" />
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
                onClick={() => onOpenHtmlExport('cluster2')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                {t.getHtmlBtn}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          {[
            { id: 'hr', label: t.tabHr, icon: Heart },
            { id: 'bmi', label: t.tabBmi, icon: Scale },
            { id: 'weather', label: t.tabWeather, icon: Sun },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  subTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
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

      {/* 2A: HEART RATE & KARVONEN WITH FULL INTERPRETATION */}
      {subTab === 'hr' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <label className="text-slate-700">{t.ageLabel}</label>
                    <span dir="ltr" className="font-mono font-bold text-blue-600 tabular-nums">
                      {age}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="85"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <label className="text-slate-700">{t.restHrLabel}</label>
                    <span dir="ltr" className="font-mono font-bold text-emerald-600 tabular-nums">
                      {restHr} bpm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="100"
                    value={restHr}
                    onChange={e => setRestHr(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {t.formulaLabel}
                  </label>
                  <select
                    value={hrFormula}
                    onChange={e => setHrFormula(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value="tanaka">Tanaka (208 − 0.7 × Âge) — {hrResult.tanakaMaxHr} bpm</option>
                    <option value="gellish">Gellish (207 − 0.7 × Âge) — {hrResult.gellishMaxHr} bpm</option>
                    <option value="astrand">Astrand (220 − Âge) — {hrResult.astrandMaxHr} bpm</option>
                    <option value="custom">Valeur mesurée sur le terrain</option>
                  </select>
                </div>

                {hrFormula === 'custom' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {t.customMaxLabel}
                    </label>
                    <input
                      type="number"
                      min="130"
                      max="225"
                      value={customMaxHr}
                      onChange={e => setCustomMaxHr(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center">
                  <div className="text-[11px] font-semibold text-blue-800">{t.maxHrResult}</div>
                  <div dir="ltr" className="text-2xl font-black font-mono text-blue-700 tabular-nums mt-1">
                    {hrResult.effectiveMaxHr} bpm
                  </div>
                </div>
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <div className="text-[11px] font-semibold text-emerald-800">{t.hrrResult}</div>
                  <div dir="ltr" className="text-2xl font-black font-mono text-emerald-700 tabular-nums mt-1">
                    {hrResult.heartRateReserve} bpm
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                <div className="font-bold text-slate-900">{t.restDiagTitle}</div>
                <p className="text-slate-700 leading-relaxed">
                  {hrResult.restHrCategory === 'athletic'
                    ? t.restAthletic
                    : hrResult.restHrCategory === 'excellent'
                    ? t.restExcellent
                    : hrResult.restHrCategory === 'normal'
                    ? t.restNormal
                    : t.restElevated}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t.zonesTableTitle}</h2>
              <div className="space-y-3">
                {hrResult.zones.map(z => (
                  <div
                    key={z.zone}
                    className={`p-4 rounded-xl border ${z.colorClass} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                  >
                    <div className="space-y-1 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase px-2 py-0.5 bg-white/80 rounded border border-current/20">
                          {z.zone} ({z.minPct}–{z.maxPct}% HRR)
                        </span>
                        <span className="text-sm font-bold">
                          {lang === 'fr' ? z.nameFr : lang === 'en' ? z.nameEn : z.nameAr}
                        </span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">
                        {lang === 'fr' ? z.effectFr : lang === 'en' ? z.effectEn : z.effectAr}
                      </p>
                      <div className="text-[11px] font-semibold opacity-80 flex flex-wrap items-center gap-2 pt-0.5">
                        <span>{lang === 'fr' ? z.substrateFr : lang === 'en' ? z.substrateEn : z.substrateAr}</span>
                        <span>·</span>
                        <span>{lang === 'fr' ? z.durationFr : lang === 'en' ? z.durationEn : z.durationAr}</span>
                      </div>
                    </div>

                    <div dir="ltr" className="text-right shrink-0 bg-white/90 px-3.5 py-2 rounded-lg border border-current/15">
                      <div className="text-lg font-black font-mono tabular-nums">
                        {z.hrMin} – {z.hrMax} <span className="text-xs font-normal">bpm</span>
                      </div>
                      <div className="text-[11px] font-mono opacity-75 tabular-nums">
                        ({z.maxHrPctMin}–{z.maxHrPctMax}% FCmax)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <div className="lg:col-span-12">
            <CalculatorScientificCard toolId="karvonen" lang={lang} />
          </div>
        </div>
      )}

      {/* 2B: BMI (IMC) & BODY COMPOSITION WITH FULL INTERPRETATION */}
      {subTab === 'bmi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">{t.bmiTitle}</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border cursor-pointer ${
                    sex === 'male'
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border cursor-pointer ${
                    sex === 'female'
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t.female}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.weightLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-red-700 tabular-nums">
                    {weightKg} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="140"
                  step="0.5"
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.heightLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-emerald-700 tabular-nums">
                    {heightCm} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="140"
                  max="215"
                  step="1"
                  value={heightCm}
                  onChange={e => setHeightCm(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.ageLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-slate-800 tabular-nums">
                    {age} ans
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="85"
                  step="1"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center flex flex-col justify-between">
                <span className="text-xs font-semibold text-blue-800">{t.bmiScoreLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-blue-700 tabular-nums my-1">
                  {bmiResult.bmi.toFixed(1)}
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-blue-700">
                  OMS : {bmiResult.healthyWeightRange[0]}–{bmiResult.healthyWeightRange[1]} kg
                </span>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center flex flex-col justify-between">
                <span className="text-xs font-semibold text-emerald-800">{t.imgScoreLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-emerald-700 tabular-nums my-1">
                  {bmiResult.bodyFatPercent}%
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-emerald-700">
                  Masse grasse : {bmiResult.fatMassKg} kg
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-700">{t.leanMassLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-slate-900 tabular-nums my-1">
                  {bmiResult.leanMassKg} kg
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-slate-600">
                  Optimum course : {bmiResult.enduranceOptimalWeightRange[0]}–{bmiResult.enduranceOptimalWeightRange[1]} kg
                </span>
              </div>
            </div>

            {/* Dual Interpretation Cards */}
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <div className="font-bold text-slate-900">{t.whoTitle}</div>
                <p className="text-slate-700 leading-relaxed">
                  {bmiResult.whoCategory === 'underweight'
                    ? t.whoUnder
                    : bmiResult.whoCategory === 'normal'
                    ? t.whoNormal
                    : bmiResult.whoCategory === 'overweight'
                    ? t.whoOver
                    : t.whoObese}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-xs">
                <div className="font-bold text-emerald-950">{t.athTitle}</div>
                <p className="text-emerald-900 leading-relaxed">
                  {bmiResult.athleticCategory === 'endurance-optimal'
                    ? t.athEndurance
                    : bmiResult.athleticCategory === 'strength-muscular'
                    ? t.athMuscular
                    : bmiResult.athleticCategory === 'low-energy-warning'
                    ? t.athWarning
                    : t.athGeneral}
                </p>
              </div>
            </div>

            {/* Official WHO & Athletic BMI Reference Table (Normal vs Abnormal) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-900 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between">
                <span>📊 Barème Officiel de Référence de l’IMC (Normal vs Anormal — OMS & Sport)</span>
                <span className="font-mono text-emerald-300">Votre IMC : {bmiResult.bmi.toFixed(1)}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px]">
                    <tr>
                      <th className="py-2 px-3">Tranche IMC</th>
                      <th className="py-2 px-3">Statut OMS</th>
                      <th className="py-2 px-3">Avis Santé & Sport</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className={bmiResult.bmi < 18.5 ? 'bg-amber-50 font-bold' : ''}>
                      <td className="py-2 px-3 font-mono text-amber-700">&lt; 18.5</td>
                      <td className="py-2 px-3 text-amber-800">⚠️ Anormal (Maigreur)</td>
                      <td className="py-2 px-3 text-slate-600">Insuffisance pondérale, risque de déficit énergétique (RED-S)</td>
                    </tr>
                    <tr className={bmiResult.bmi >= 18.5 && bmiResult.bmi < 25 ? 'bg-emerald-50 font-bold' : ''}>
                      <td className="py-2 px-3 font-mono text-emerald-700">18.5 – 24.9</td>
                      <td className="py-2 px-3 text-emerald-800">✅ NORMAL (Poids Santé)</td>
                      <td className="py-2 px-3 text-slate-600">Corpulence normale idéale santé & endurance (19.5–22.5)</td>
                    </tr>
                    <tr className={bmiResult.bmi >= 25 && bmiResult.bmi < 30 ? 'bg-orange-50 font-bold' : ''}>
                      <td className="py-2 px-3 font-mono text-orange-700">25.0 – 29.9</td>
                      <td className="py-2 px-3 text-orange-800">⚠️ Anormal (Surpoids / Athlète Musclé)</td>
                      <td className="py-2 px-3 text-slate-600">Surcharge adipeuse OU forte masse musculaire (vérifier IMG %)</td>
                    </tr>
                    <tr className={bmiResult.bmi >= 30 ? 'bg-red-50 font-bold' : ''}>
                      <td className="py-2 px-3 font-mono text-red-700">≥ 30.0</td>
                      <td className="py-2 px-3 text-red-800">🚨 Anormal (Obésité)</td>
                      <td className="py-2 px-3 text-slate-600">Surcharge mécanique articulaire importante</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Fiche Documentaire & Pédagogique Scientifique (800-1000 caractères) */}
          <div className="lg:col-span-12">
            <CalculatorScientificCard toolId="imc" lang={lang} />
          </div>
        </div>
      )}

      {/* 2C: UNIVERSAL WEATHER, HEAT, HUMIDITY & ALTITUDE */}
      {subTab === 'weather' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">{t.weatherTitle}</h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.tempLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-blue-600 tabular-nums">
                    {tempC}°C ({weatherResult.temperatureF}°F)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="44"
                  value={tempC}
                  onChange={e => setTempC(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.humLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-emerald-600 tabular-nums">
                    {humidity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={humidity}
                  onChange={e => setHumidity(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.altLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-slate-800 tabular-nums">
                    {altitudeM} m
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={altitudeM}
                  onChange={e => setAltitudeM(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <label className="text-slate-700">{t.windLabel}</label>
                  <span dir="ltr" className="font-mono font-bold text-slate-800 tabular-nums">
                    {windKmh} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="45"
                  step="5"
                  value={windKmh}
                  onChange={e => setWindKmh(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-blue-800">{t.slowdownLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-blue-700 tabular-nums my-1">
                  +{weatherResult.totalSlowdownPct}%
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-blue-700">
                  Dérive FC : +{weatherResult.cardiacDriftBpm} bpm
                </span>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-emerald-800">{t.adjPaceLabel}</span>
                <div dir="ltr" className="text-3xl font-black font-mono text-emerald-700 tabular-nums my-1">
                  {formatPace(weatherResult.adjustedPaceSecPerKm)}
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-emerald-700">
                  Base : {formatPace(basePaceMin * 60 + basePaceSec)}
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-700">{t.hydrationLabel}</span>
                <div dir="ltr" className="text-2xl font-black font-mono text-slate-900 tabular-nums my-1">
                  {weatherResult.sweatRateMlPerHour} ml/h
                </div>
                <span dir="ltr" className="text-[11px] font-mono text-slate-600">
                  Sodium : {weatherResult.sodiumMgPerHour} mg/h
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <span className="text-slate-500 block">{t.dewPointLabel}</span>
                <strong dir="ltr" className="font-mono text-slate-900 tabular-nums">
                  {weatherResult.dewPointC}°C ({weatherResult.dewPointF}°F)
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Chaleur / Hum.</span>
                <strong dir="ltr" className="font-mono text-slate-900 tabular-nums">
                  +{weatherResult.heatSlowdownPct}%
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Altitude + Vent</span>
                <strong dir="ltr" className="font-mono text-slate-900 tabular-nums">
                  +{(weatherResult.altitudeSlowdownPct + weatherResult.windSlowdownPct).toFixed(1)}%
                </strong>
              </div>
            </div>
          </div>

          {/* Fiches Documentaires & Pédagogiques Scientifiques (800-1000 caractères) */}
          <div className="lg:col-span-12 space-y-6">
            <CalculatorScientificCard toolId="meteo" lang={lang} />
            <CalculatorScientificCard toolId="gap" lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
};
