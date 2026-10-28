/**
 * International Sports Science & Exercise Physiology Engine — ProfEPS.ma
 * Covers the 3 Global Clusters:
 * - Cluster 1: Jack Daniels VDOT, Anaerobic Speed Reserve (ASR), Endurance Index (Péronnet & Thibault)
 * - Cluster 2: Heart Rate (Tanaka/Gellish/Astrand + Karvonen + Interpretation), BMI & Athletic Body Composition (Deurenberg + Interpretation), Universal Weather/Heat/Altitude Adjustment (McMillan)
 * - Cluster 3: HIIT Intermittent & Team Sports Change of Direction (COD 180°), Foster sRPE Training Load & ACWR Injury Risk
 */

export type ToolLang = 'fr' | 'en' | 'ar';

export interface RaceDistance {
  id: string;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  meters: number;
}

export const COMMON_DISTANCES: RaceDistance[] = [
  { id: '800m', nameFr: '800 m', nameEn: '800m', nameAr: '800 متر', meters: 800 },
  { id: '1500m', nameFr: '1 500 m', nameEn: '1,500m', nameAr: '1500 متر', meters: 1500 },
  { id: 'mile', nameFr: '1 Mile (1 609 m)', nameEn: '1 Mile (1,609m)', nameAr: '1 ميل (1609 م)', meters: 1609.34 },
  { id: '3000m', nameFr: '3 000 m', nameEn: '3,000m', nameAr: '3000 متر', meters: 3000 },
  { id: '5k', nameFr: '5 km', nameEn: '5K', nameAr: '5 كم', meters: 5000 },
  { id: '10k', nameFr: '10 km', nameEn: '10K', nameAr: '10 كم', meters: 10000 },
  { id: '15k', nameFr: '15 km', nameEn: '15K', nameAr: '15 كم', meters: 15000 },
  { id: 'semi', nameFr: 'Semi-Marathon (21,1 km)', nameEn: 'Half Marathon (21.1K)', nameAr: 'نصف ماراثون (21.1 كم)', meters: 21097.5 },
  { id: 'marathon', nameFr: 'Marathon (42,195 km)', nameEn: 'Marathon (42.2K)', nameAr: 'ماراثون (42.195 كم)', meters: 42195 },
];

/* ==========================================================================
   CLUSTER 1A: JACK DANIELS VDOT CALCULATIONS
   ========================================================================== */

function getVo2FromVelocity(velocityMPerMin: number): number {
  return -4.60 + 0.182258 * velocityMPerMin + 0.000104 * Math.pow(velocityMPerMin, 2);
}

function getPercentVo2MaxForTime(timeMinutes: number): number {
  return (
    0.8 +
    0.1894393 * Math.exp(-0.012778 * timeMinutes) +
    0.2989558 * Math.exp(-0.1932605 * timeMinutes)
  );
}

export function calculateVdot(distanceMeters: number, timeSeconds: number): number {
  if (distanceMeters <= 0 || timeSeconds <= 0) return 30;
  const timeMinutes = timeSeconds / 60;
  const velocityMPerMin = distanceMeters / timeMinutes;
  const vo2 = getVo2FromVelocity(velocityMPerMin);
  const percentVo2Max = getPercentVo2MaxForTime(timeMinutes);
  const vdot = vo2 / percentVo2Max;
  return Math.max(20, Math.min(85, Math.round(vdot * 10) / 10));
}

export function predictRaceTimeFromVdot(distanceMeters: number, vdot: number): number {
  if (distanceMeters <= 0 || vdot <= 0) return 0;
  let lowSeconds = 30;
  let highSeconds = 24 * 3600;
  const epsilon = 0.05;

  for (let iter = 0; iter < 45; iter++) {
    const midSeconds = (lowSeconds + highSeconds) / 2;
    const computedVdot = calculateVdot(distanceMeters, midSeconds);
    if (Math.abs(computedVdot - vdot) < epsilon) {
      return Math.round(midSeconds);
    }
    if (computedVdot > vdot) {
      lowSeconds = midSeconds;
    } else {
      highSeconds = midSeconds;
    }
  }
  return Math.round((lowSeconds + highSeconds) / 2);
}

export interface DanielsTrainingPaces {
  vdot: number;
  easyPaceSecPerKm: [number, number];
  marathonPaceSecPerKm: number;
  thresholdPaceSecPerKm: number;
  intervalPaceSecPerKm: number;
  repetitionPaceSecPerKm: number;
}

export function getDanielsTrainingPaces(vdot: number): DanielsTrainingPaces {
  function velocityFromTargetVo2(targetVo2: number): number {
    const a = 0.000104;
    const b = 0.182258;
    const c = -(4.60 + targetVo2);
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return 150;
    return (-b + Math.sqrt(discriminant)) / (2 * a);
  }

  const vRep = velocityFromTargetVo2(vdot * 1.07);
  const vInterval = velocityFromTargetVo2(vdot * 0.975);
  const vThreshold = velocityFromTargetVo2(vdot * 0.88);
  const vMarathon = velocityFromTargetVo2(vdot * 0.80);
  const vEasyFast = velocityFromTargetVo2(vdot * 0.74);
  const vEasySlow = velocityFromTargetVo2(vdot * 0.62);

  function secPerKm(vMPerMin: number): number {
    if (vMPerMin <= 0) return 360;
    return Math.round(60000 / vMPerMin);
  }

  return {
    vdot,
    easyPaceSecPerKm: [secPerKm(vEasyFast), secPerKm(vEasySlow)],
    marathonPaceSecPerKm: secPerKm(vMarathon),
    thresholdPaceSecPerKm: secPerKm(vThreshold),
    intervalPaceSecPerKm: secPerKm(vInterval),
    repetitionPaceSecPerKm: secPerKm(vRep),
  };
}

/* ==========================================================================
   CLUSTER 1B: ANAEROBIC SPEED RESERVE (ASR) & SUPRAMAXIMAL PRESCRIPTION
   ========================================================================== */

export interface AsrProfileResult {
  vmaKmh: number;
  maxSprintKmh: number;
  asrKmh: number;
  asrMs: number;
  speedReserveRatio: number; // MSS / MAS
  profileType: 'endurant' | 'hybrid' | 'sprinter';
  supramaxTargets: Array<{
    percentAsr: number;
    targetSpeedKmh: number;
    targetSpeedMs: number;
    equivPercentVma: number;
    dist15s: number;
    dist30s: number;
  }>;
}

export function calculateAsrProfile(vmaKmh: number, maxSprintKmh: number): AsrProfileResult {
  const safeVma = Math.max(8, vmaKmh);
  const safeSprint = Math.max(safeVma + 2, maxSprintKmh);
  const asrKmh = Math.round((safeSprint - safeVma) * 10) / 10;
  const asrMs = Math.round((asrKmh / 3.6) * 100) / 100;
  const speedReserveRatio = Math.round((safeSprint / safeVma) * 100) / 100;

  let profileType: AsrProfileResult['profileType'] = 'hybrid';
  if (speedReserveRatio < 1.80) {
    profileType = 'endurant';
  } else if (speedReserveRatio > 1.95) {
    profileType = 'sprinter';
  }

  const percentages = [10, 20, 30, 40, 50];
  const supramaxTargets = percentages.map(pct => {
    const targetSpeedKmh = Math.round((safeVma + (asrKmh * pct) / 100) * 10) / 10;
    const targetSpeedMs = Math.round((targetSpeedKmh / 3.6) * 100) / 100;
    const equivPercentVma = Math.round((targetSpeedKmh / safeVma) * 100);
    return {
      percentAsr: pct,
      targetSpeedKmh,
      targetSpeedMs,
      equivPercentVma,
      dist15s: Math.round(targetSpeedMs * 15),
      dist30s: Math.round(targetSpeedMs * 30),
    };
  });

  return {
    vmaKmh: safeVma,
    maxSprintKmh: safeSprint,
    asrKmh,
    asrMs,
    speedReserveRatio,
    profileType,
    supramaxTargets,
  };
}

/* ==========================================================================
   CLUSTER 1C: ENDURANCE INDEX (PÉRONNET & THIBAULT)
   ========================================================================== */

export interface EnduranceIndexResult {
  vmaKmh: number;
  raceSpeedKmh: number;
  percentVmaSustained: number;
  enduranceIndex: number; // Typically between -4 and -12
  category: 'elite-endurance' | 'good-endurance' | 'average-endurance' | 'low-endurance';
}

export function calculateEnduranceIndex(
  vmaKmh: number,
  distanceMeters: number,
  timeSeconds: number
): EnduranceIndexResult {
  const safeVma = Math.max(8, vmaKmh);
  const raceSpeedKmh = timeSeconds > 0 ? (distanceMeters / timeSeconds) * 3.6 : safeVma * 0.85;
  const percentVmaSustained = Math.round((raceSpeedKmh / safeVma) * 1000) / 10;

  // Péronnet & Thibault: t_MAS ~ 360s (6 minutes)
  // IE = (percentVmaSustained - 100) / ln(timeSeconds / 360)
  const timeRatio = Math.max(1.1, timeSeconds / 360);
  const rawIe = (percentVmaSustained - 100) / Math.log(timeRatio);
  const enduranceIndex = Math.max(-16, Math.min(-2, Math.round(rawIe * 10) / 10));

  let category: EnduranceIndexResult['category'] = 'average-endurance';
  if (enduranceIndex >= -5.5) {
    category = 'elite-endurance';
  } else if (enduranceIndex >= -7.5) {
    category = 'good-endurance';
  } else if (enduranceIndex >= -9.5) {
    category = 'average-endurance';
  } else {
    category = 'low-endurance';
  }

  return {
    vmaKmh: safeVma,
    raceSpeedKmh: Math.round(raceSpeedKmh * 10) / 10,
    percentVmaSustained,
    enduranceIndex,
    category,
  };
}

/* ==========================================================================
   CLUSTER 2A: HEART RATE CALCULATOR & KARVONEN WITH INTERPRETATION
   ========================================================================== */

export interface HeartRateZoneDetail {
  zone: string;
  minPct: number;
  maxPct: number;
  hrMin: number;
  hrMax: number;
  maxHrPctMin: number;
  maxHrPctMax: number;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  substrateFr: string;
  substrateEn: string;
  substrateAr: string;
  effectFr: string;
  effectEn: string;
  effectAr: string;
  durationFr: string;
  durationEn: string;
  durationAr: string;
  colorClass: string;
}

export interface HeartRateAnalysisResult {
  age: number;
  restHr: number;
  effectiveMaxHr: number;
  heartRateReserve: number;
  tanakaMaxHr: number;
  gellishMaxHr: number;
  astrandMaxHr: number;
  restHrCategory: 'athletic' | 'excellent' | 'normal' | 'elevated';
  zones: HeartRateZoneDetail[];
}

export function calculateHeartRateAnalysis(
  age: number,
  restHr: number,
  customMaxHr: number,
  formula: 'tanaka' | 'gellish' | 'astrand' | 'custom'
): HeartRateAnalysisResult {
  const safeAge = Math.max(10, Math.min(90, age));
  const safeRest = Math.max(32, Math.min(110, restHr));

  const tanakaMaxHr = Math.round(208 - 0.7 * safeAge);
  const gellishMaxHr = Math.round(207 - 0.7 * safeAge);
  const astrandMaxHr = Math.round(220 - safeAge);

  let effectiveMaxHr = tanakaMaxHr;
  if (formula === 'gellish') effectiveMaxHr = gellishMaxHr;
  else if (formula === 'astrand') effectiveMaxHr = astrandMaxHr;
  else if (formula === 'custom') effectiveMaxHr = Math.max(130, Math.min(230, customMaxHr));

  const heartRateReserve = Math.max(40, effectiveMaxHr - safeRest);

  let restHrCategory: HeartRateAnalysisResult['restHrCategory'] = 'normal';
  if (safeRest < 50) restHrCategory = 'athletic';
  else if (safeRest <= 62) restHrCategory = 'excellent';
  else if (safeRest <= 76) restHrCategory = 'normal';
  else restHrCategory = 'elevated';

  const rawZones = [
    {
      zone: 'Z1',
      minPct: 50,
      maxPct: 60,
      nameFr: 'Récupération Active & Régénération',
      nameEn: 'Active Recovery & Regeneration',
      nameAr: 'الاستشفاء النشط والتجديد',
      substrateFr: '85% Lipides · 15% Glucides',
      substrateEn: '85% Fats · 15% Carbs',
      substrateAr: '85% دهون · 15% كربوهيدرات',
      effectFr: 'Capillarisation, retour veineux, élimination des métabolites sans stress nerveux.',
      effectEn: 'Capillarization, venous return, metabolite clearance without neural fatigue.',
      effectAr: 'تنشيط الدورة الدموية وإزالة الفضلات الأيضية دون إجهاد عصبي.',
      durationFr: '20 à 45 min (échauffement / récup)',
      durationEn: '20 to 45 min (warm-up / recovery)',
      durationAr: '20 إلى 45 دقيقة (إحماء / استشفاء)',
      colorClass: 'bg-sky-50 border-sky-200 text-sky-900',
    },
    {
      zone: 'Z2',
      minPct: 60,
      maxPct: 70,
      nameFr: 'Endurance Fondamentale (Base Aérobie)',
      nameEn: 'Fundamental Endurance (Aerobic Base)',
      nameAr: 'التحمل الأساسي (القاعدة الهوائية)',
      substrateFr: '70% Lipides · 30% Glucides',
      substrateEn: '70% Fats · 30% Carbs',
      substrateAr: '70% دهون · 30% كربوهيدرات',
      effectFr: 'Biogenèse mitochondriale, augmentation du volume d’éjection systolique (VES) et économie de course.',
      effectEn: 'Mitochondrial biogenesis, increased stroke volume (SV), and running economy.',
      effectAr: 'زيادة كثافة الميتوكوندريا وحجم ضخ القلب واقتصاد الجري.',
      durationFr: '45 min à 2h30+ (sorties longues)',
      durationEn: '45 min to 2h30+ (long runs)',
      durationAr: '45 دقيقة إلى ساعتين ونصف (جري طويل)',
      colorClass: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
    {
      zone: 'Z3',
      minPct: 70,
      maxPct: 80,
      nameFr: 'Endurance Active / Tempo (Seuil Aérobie SV1)',
      nameEn: 'Active Endurance / Tempo (Aerobic Threshold LT1)',
      nameAr: 'التحمل النشط / الإيقاع (العتبة الهوائية)',
      substrateFr: '40% Lipides · 60% Glucides',
      substrateEn: '40% Fats · 60% Carbs',
      substrateAr: '40% دهون · 60% كربوهيدرات',
      effectFr: 'Capacité aérobie, maintien de l’allure Marathon, recyclage du lactate (navette lactate).',
      effectEn: 'Aerobic capacity, Marathon pace sustainability, lactate shuttle efficiency.',
      effectAr: 'القدرة الهوائية، الحفاظ على إيقاع الماراثون، وتدوير اللاكتات.',
      durationFr: '25 à 60 min (continu ou blocs de 15 min)',
      durationEn: '25 to 60 min (continuous or 15-min blocks)',
      durationAr: '25 إلى 60 دقيقة (مستمر أو مقاطع)',
      colorClass: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      zone: 'Z4',
      minPct: 80,
      maxPct: 90,
      nameFr: 'Seuil Anaérobie Lactique (SV2 / Allure Semi-10k)',
      nameEn: 'Anaerobic Lactate Threshold (LT2 / 10K-Half Pace)',
      nameAr: 'العتبة اللاهوائية (إيقاع 10 كم ونصف ماراثون)',
      substrateFr: '15% Lipides · 85% Glucides',
      substrateEn: '15% Fats · 85% Carbs',
      substrateAr: '15% دهون · 85% كربوهيدرات',
      effectFr: 'Élévation du seuil d’accumulation du lactate sanguin (~4 mmol/L), tolérance à l’acidose.',
      effectEn: 'Raises onset of blood lactate accumulation (OBLA ~4 mmol/L) and acidosis tolerance.',
      effectAr: 'رفع عتبة تراكم اللاكتات في الدم (~4 مليمول/لتر) وتحمل الحموضة.',
      durationFr: '15 à 30 min (ex: 3 × 8 min ou 4 × 1000m)',
      durationEn: '15 to 30 min (e.g. 3 × 8 min or 4 × 1000m)',
      durationAr: '15 إلى 30 دقيقة (مثل 3 × 8 دقائق)',
      colorClass: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    {
      zone: 'Z5',
      minPct: 90,
      maxPct: 100,
      nameFr: 'Puissance Aérobie Maximale (VO₂max / VMA)',
      nameEn: 'Maximal Aerobic Power (VO₂max / MAS)',
      nameAr: 'القوة الهوائية القصوى (VO₂max / VMA)',
      substrateFr: '100% Glucides (Glycolyse + ATP-CP)',
      substrateEn: '100% Carbs (Glycolysis + ATP-PCr)',
      substrateAr: '100% كربوهيدرات (تحلل سكري)',
      effectFr: 'Sollicitation maximale du débit cardiaque et de l’extraction périphérique d’oxygène (VO₂max).',
      effectEn: 'Maximizes cardiac output and peripheral oxygen extraction (VO₂max).',
      effectAr: 'أقصى تحفيز للنتاج القلبي واستخلاص الأكسجين المحيطي.',
      durationFr: 'Intermittent 15"/15", 30"/30" ou répétitions de 2 à 4 min',
      durationEn: 'Intermittent 15s/15s, 30s/30s or 2–4 min intervals',
      durationAr: 'تدريب متقطع 30/30 أو تكرارات من 2 إلى 4 دقائق',
      colorClass: 'bg-rose-50 border-rose-200 text-rose-900',
    },
  ];

  const zones: HeartRateZoneDetail[] = rawZones.map(z => {
    const hrMin = Math.round(safeRest + (heartRateReserve * z.minPct) / 100);
    const hrMax = Math.round(safeRest + (heartRateReserve * z.maxPct) / 100);
    return {
      ...z,
      hrMin,
      hrMax,
      maxHrPctMin: Math.round((hrMin / effectiveMaxHr) * 100),
      maxHrPctMax: Math.round((hrMax / effectiveMaxHr) * 100),
    };
  });

  return {
    age: safeAge,
    restHr: safeRest,
    effectiveMaxHr,
    heartRateReserve,
    tanakaMaxHr,
    gellishMaxHr,
    astrandMaxHr,
    restHrCategory,
    zones,
  };
}

/* ==========================================================================
   CLUSTER 2B: BMI (IMC) & ATHLETIC BODY COMPOSITION WITH INTERPRETATION
   ========================================================================== */

export interface BmiAnalysisResult {
  weightKg: number;
  heightCm: number;
  bmi: number;
  bodyFatPercent: number; // Deurenberg IMG adjusted for training volume
  fatMassKg: number;
  leanMassKg: number;
  whoCategory: 'underweight' | 'normal' | 'overweight' | 'obese-1' | 'obese-2';
  athleticCategory: 'endurance-optimal' | 'strength-muscular' | 'general-fit' | 'low-energy-warning' | 'excess-mass';
  healthyWeightRange: [number, number];
  enduranceOptimalWeightRange: [number, number];
  secPerKmDeltaPerKg: number; // ~2.0 sec/km per kg at 4:30/km
}

export function calculateBmiAnalysis(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female',
  weeklyTrainingHours: number = 5
): BmiAnalysisResult {
  const safeHeightM = Math.max(1.2, Math.min(2.3, heightCm / 100));
  const safeWeight = Math.max(30, Math.min(200, weightKg));
  const safeAge = Math.max(12, Math.min(90, age));

  const bmi = Math.round((safeWeight / (safeHeightM * safeHeightM)) * 10) / 10;

  // Deurenberg formula: IMG% = 1.20 * BMI + 0.23 * Age - 10.8 * Sex - 5.4
  // Adjusted by -0.35% per weekly training hour (up to -3.5%) to reflect higher lean muscle density in athletes
  const sexFactor = sex === 'male' ? 1 : 0;
  const trainingCorrection = Math.min(3.5, weeklyTrainingHours * 0.35);
  const rawBodyFat = 1.2 * bmi + 0.23 * safeAge - 10.8 * sexFactor - 5.4 - trainingCorrection;
  const minFat = sex === 'male' ? 5.0 : 11.0;
  const bodyFatPercent = Math.max(minFat, Math.min(50, Math.round(rawBodyFat * 10) / 10));

  const fatMassKg = Math.round(((safeWeight * bodyFatPercent) / 100) * 10) / 10;
  const leanMassKg = Math.round((safeWeight - fatMassKg) * 10) / 10;

  let whoCategory: BmiAnalysisResult['whoCategory'] = 'normal';
  if (bmi < 18.5) whoCategory = 'underweight';
  else if (bmi < 25.0) whoCategory = 'normal';
  else if (bmi < 30.0) whoCategory = 'overweight';
  else if (bmi < 35.0) whoCategory = 'obese-1';
  else whoCategory = 'obese-2';

  let athleticCategory: BmiAnalysisResult['athleticCategory'] = 'general-fit';
  const lowFatThreshold = sex === 'male' ? 16 : 23;
  if (bmi < 18.5) {
    athleticCategory = 'low-energy-warning';
  } else if (bmi >= 19.0 && bmi <= 22.8 && weeklyTrainingHours >= 4) {
    athleticCategory = 'endurance-optimal';
  } else if (bmi >= 25.0 && bodyFatPercent <= lowFatThreshold && weeklyTrainingHours >= 5) {
    athleticCategory = 'strength-muscular';
  } else if (bmi >= 26.5 && bodyFatPercent > lowFatThreshold) {
    athleticCategory = 'excess-mass';
  } else {
    athleticCategory = 'general-fit';
  }

  const healthyWeightRange: [number, number] = [
    Math.round(18.5 * safeHeightM * safeHeightM * 10) / 10,
    Math.round(24.9 * safeHeightM * safeHeightM * 10) / 10,
  ];

  const enduranceOptimalWeightRange: [number, number] = [
    Math.round(19.5 * safeHeightM * safeHeightM * 10) / 10,
    Math.round(22.5 * safeHeightM * safeHeightM * 10) / 10,
  ];

  return {
    weightKg: safeWeight,
    heightCm,
    bmi,
    bodyFatPercent,
    fatMassKg,
    leanMassKg,
    whoCategory,
    athleticCategory,
    healthyWeightRange,
    enduranceOptimalWeightRange,
    secPerKmDeltaPerKg: 2.1,
  };
}

/* ==========================================================================
   CLUSTER 2C: UNIVERSAL WEATHER, HEAT, HUMIDITY & ALTITUDE (MCMILLAN MODEL)
   ========================================================================== */

export interface UniversalWeatherResult {
  temperatureC: number;
  temperatureF: number;
  humidityPercent: number;
  altitudeMeters: number;
  windKmh: number;
  dewPointC: number;
  dewPointF: number;
  heatStressIndex: number; // Temp(F) + DewPoint(F)
  heatSlowdownPct: number;
  altitudeSlowdownPct: number;
  windSlowdownPct: number;
  totalSlowdownPct: number;
  adjustedPaceSecPerKm: number;
  cardiacDriftBpm: number;
  sweatRateMlPerHour: number;
  sodiumMgPerHour: number;
  riskLevel: 'optimal' | 'moderate' | 'high' | 'severe' | 'extreme';
}

export function calculateDewPoint(temperatureC: number, humidityPercent: number): number {
  const a = 17.27;
  const b = 237.7;
  const safeHum = Math.max(5, Math.min(100, humidityPercent));
  const alpha = (a * temperatureC) / (b + temperatureC) + Math.log(safeHum / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
}

export function calculateUniversalWeatherAdjustment(
  tempC: number,
  humidity: number,
  altitudeMeters: number = 0,
  windKmh: number = 0,
  basePaceSecPerKm: number = 270
): UniversalWeatherResult {
  const tempF = Math.round(((tempC * 9) / 5 + 32) * 10) / 10;
  const dewPointC = calculateDewPoint(tempC, humidity);
  const dewPointF = Math.round(((dewPointC * 9) / 5 + 32) * 10) / 10;
  const heatStressIndex = Math.round(tempF + dewPointF);

  let heatSlowdownPct = 0;
  let riskLevel: UniversalWeatherResult['riskLevel'] = 'optimal';
  let sweatRateMlPerHour = 550;
  let sodiumMgPerHour = 350;
  let cardiacDriftBpm = 2;

  if (heatStressIndex <= 105) {
    heatSlowdownPct = 0;
    riskLevel = 'optimal';
    sweatRateMlPerHour = 500;
    sodiumMgPerHour = 300;
    cardiacDriftBpm = 0;
  } else if (heatStressIndex <= 120) {
    heatSlowdownPct = ((heatStressIndex - 105) / 15) * 1.5;
    riskLevel = 'moderate';
    sweatRateMlPerHour = 750;
    sodiumMgPerHour = 500;
    cardiacDriftBpm = 5;
  } else if (heatStressIndex <= 140) {
    heatSlowdownPct = 1.5 + ((heatStressIndex - 120) / 20) * 3.0;
    riskLevel = 'high';
    sweatRateMlPerHour = 1000;
    sodiumMgPerHour = 700;
    cardiacDriftBpm = 10;
  } else if (heatStressIndex <= 160) {
    heatSlowdownPct = 4.5 + ((heatStressIndex - 140) / 20) * 4.0;
    riskLevel = 'severe';
    sweatRateMlPerHour = 1250;
    sodiumMgPerHour = 950;
    cardiacDriftBpm = 15;
  } else {
    heatSlowdownPct = 8.5 + Math.min(7.5, ((heatStressIndex - 160) / 25) * 6.0);
    riskLevel = 'extreme';
    sweatRateMlPerHour = 1500;
    sodiumMgPerHour = 1150;
    cardiacDriftBpm = 22;
  }

  // Altitude effect: above 1000m, VO2max drops by ~1% every 150m (~2% pace penalty per 300m above 1000m)
  let altitudeSlowdownPct = 0;
  if (altitudeMeters > 1000) {
    altitudeSlowdownPct = ((altitudeMeters - 1000) / 300) * 1.8;
  }

  // Headwind effect: ~0.15% per km/h of headwind above 10 km/h
  let windSlowdownPct = 0;
  if (windKmh > 10) {
    windSlowdownPct = (windKmh - 10) * 0.18;
  } else if (windKmh < 0) {
    // Tailwind helps slightly (half the magnitude of headwind)
    windSlowdownPct = Math.max(-2.0, windKmh * 0.07);
  }

  heatSlowdownPct = Math.round(heatSlowdownPct * 10) / 10;
  altitudeSlowdownPct = Math.round(altitudeSlowdownPct * 10) / 10;
  windSlowdownPct = Math.round(windSlowdownPct * 10) / 10;
  const totalSlowdownPct = Math.max(
    -2,
    Math.round((heatSlowdownPct + altitudeSlowdownPct + windSlowdownPct) * 10) / 10
  );

  const adjustedPaceSecPerKm = Math.round(basePaceSecPerKm * (1 + totalSlowdownPct / 100));

  return {
    temperatureC: tempC,
    temperatureF: tempF,
    humidityPercent: humidity,
    altitudeMeters,
    windKmh,
    dewPointC,
    dewPointF,
    heatStressIndex,
    heatSlowdownPct,
    altitudeSlowdownPct,
    windSlowdownPct,
    totalSlowdownPct,
    adjustedPaceSecPerKm,
    cardiacDriftBpm,
    sweatRateMlPerHour,
    sodiumMgPerHour,
    riskLevel,
  };
}

/* ==========================================================================
   CLUSTER 3A & 3B: HIIT INTERMITTENT & TEAM SPORTS COD (180° SHUTTLE)
   ========================================================================== */

export interface HiitCodResult {
  targetSpeedKmh: number;
  targetSpeedMs: number;
  linearDistanceMeters: number;
  numTurns: number;
  codTimeLossSeconds: number;
  codDistancePenaltyMeters: number;
  adjustedDistanceMeters: number;
  fullShuttlesCount: number;
  remainderMeters: number;
}

export function calculateHiitAndCod(
  vmaKmh: number,
  workDurationSec: number,
  intensityPercentVma: number,
  shuttleLengthMeters: number = 0, // 0 = linear track
  codAngle: 0 | 90 | 180 = 180
): HiitCodResult {
  const targetSpeedKmh = Math.round(((vmaKmh * intensityPercentVma) / 100) * 10) / 10;
  const targetSpeedMs = targetSpeedKmh / 3.6;
  const linearDistanceMeters = Math.round(targetSpeedMs * workDurationSec);

  if (shuttleLengthMeters <= 0 || codAngle === 0) {
    return {
      targetSpeedKmh,
      targetSpeedMs: Math.round(targetSpeedMs * 100) / 100,
      linearDistanceMeters,
      numTurns: 0,
      codTimeLossSeconds: 0,
      codDistancePenaltyMeters: 0,
      adjustedDistanceMeters: linearDistanceMeters,
      fullShuttlesCount: 0,
      remainderMeters: linearDistanceMeters,
    };
  }

  // Estimate number of turns
  const rawTurns = Math.max(0, Math.floor((linearDistanceMeters - 1) / shuttleLengthMeters));
  // Buchheit (2008) 30-15 IFT / COD physiology: each 180° turn costs ~0.7s (or ~0.4s for 90°)
  const secCostPerTurn = codAngle === 180 ? 0.72 : 0.42;
  const codTimeLossSeconds = Math.round(rawTurns * secCostPerTurn * 10) / 10;
  const codDistancePenaltyMeters = Math.round(codTimeLossSeconds * targetSpeedMs);
  const adjustedDistanceMeters = Math.max(
    shuttleLengthMeters,
    linearDistanceMeters - codDistancePenaltyMeters
  );

  const fullShuttlesCount = Math.floor(adjustedDistanceMeters / shuttleLengthMeters);
  const remainderMeters = Math.round(adjustedDistanceMeters % shuttleLengthMeters);

  return {
    targetSpeedKmh,
    targetSpeedMs: Math.round(targetSpeedMs * 100) / 100,
    linearDistanceMeters,
    numTurns: rawTurns,
    codTimeLossSeconds,
    codDistancePenaltyMeters,
    adjustedDistanceMeters,
    fullShuttlesCount,
    remainderMeters,
  };
}

/* ==========================================================================
   CLUSTER 3C: FOSTER sRPE TRAINING LOAD & ACWR INJURY PREVENTION
   ========================================================================== */

export interface FosterLoadResult {
  weeklyLoadAu: number;
  dailyMeanAu: number;
  dailyStdDevAu: number;
  monotony: number;
  strain: number;
  acwr: number;
  riskCategory: 'undertraining' | 'optimal' | 'overload-warning' | 'high-injury-risk';
}

export function calculateFosterLoad(
  dailyLoadsAu: number[], // 7 days of (durationMin * rpe)
  chronicWeeklyLoadAu: number
): FosterLoadResult {
  const days = dailyLoadsAu.length === 7 ? dailyLoadsAu : [300, 450, 0, 500, 350, 600, 0];
  const weeklyLoadAu = days.reduce((acc, v) => acc + v, 0);
  const dailyMeanAu = weeklyLoadAu / 7;

  const variance = days.reduce((acc, v) => acc + Math.pow(v - dailyMeanAu, 2), 0) / 7;
  const dailyStdDevAu = Math.sqrt(variance);

  const monotony =
    dailyStdDevAu > 0 ? Math.round((dailyMeanAu / dailyStdDevAu) * 100) / 100 : 1.0;
  const strain = Math.round(weeklyLoadAu * monotony);

  const safeChronic = Math.max(200, chronicWeeklyLoadAu);
  const acwr = Math.round((weeklyLoadAu / safeChronic) * 100) / 100;

  let riskCategory: FosterLoadResult['riskCategory'] = 'optimal';
  if (acwr < 0.8) riskCategory = 'undertraining';
  else if (acwr <= 1.3) riskCategory = 'optimal';
  else if (acwr <= 1.5) riskCategory = 'overload-warning';
  else riskCategory = 'high-injury-risk';

  return {
    weeklyLoadAu: Math.round(weeklyLoadAu),
    dailyMeanAu: Math.round(dailyMeanAu),
    dailyStdDevAu: Math.round(dailyStdDevAu),
    monotony,
    strain,
    acwr,
    riskCategory,
  };
}

/* ==========================================================================
   FORMATTING UTILITIES
   ========================================================================== */

export function formatSecondsToHhMmSs(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return '00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

export function formatSecondsToMinSec(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return '0:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  if (seconds === 60) {
    return `${minutes + 1}:00`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatPace(secPerKm: number): string {
  if (isNaN(secPerKm) || secPerKm <= 0) return '-:--';
  const mins = Math.floor(secPerKm / 60);
  const secs = Math.round(secPerKm % 60);
  if (secs === 60) {
    return `${mins + 1}:00 /km`;
  }
  return `${mins}:${String(secs).padStart(2, '0')} /km`;
}

export function formatPaceMile(secPerKm: number): string {
  if (isNaN(secPerKm) || secPerKm <= 0) return '-:--';
  const secPerMile = secPerKm * 1.60934;
  const mins = Math.floor(secPerMile / 60);
  const secs = Math.round(secPerMile % 60);
  if (secs === 60) {
    return `${mins + 1}:00 /mi`;
  }
  return `${mins}:${String(secs).padStart(2, '0')} /mi`;
}
