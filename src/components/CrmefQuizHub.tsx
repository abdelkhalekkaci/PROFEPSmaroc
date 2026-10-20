import React, { useState, useMemo } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Timer,
  ChevronRight,
  GraduationCap,
  Activity,
  Flame,
  ArrowRight,
  TrendingUp,
  Share2,
  HelpCircle,
  FileText,
  BadgeCheck,
  Zap,
  Search,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Building2,
  Scale,
  Compass,
} from 'lucide-react';
import {
  INITIAL_QUIZ_BANK,
  QUIZ_SUBJECTS,
  OFFICIAL_SOURCES_GUIDE,
  QuizQuestion,
} from '../data/crmefQuizBank';

export const CrmefQuizHub: React.FC = () => {
  // Navigation mode inside Hub
  const [hubMode, setHubMode] = useState<'exam' | 'browse' | 'sources' | 'import'>('exam');

  // Config state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('eps');
  const [selectedModule, setSelectedModule] = useState<'all' | 'sciences_education' | 'specialite' | 'didactique'>('sciences_education');
  const [langPreference, setLangPreference] = useState<'both' | 'fr' | 'ar'>('both');

  // Dynamic questions bank (supports user additions via import)
  const [dynamicBank, setDynamicBank] = useState<QuizQuestion[]>(INITIAL_QUIZ_BANK);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTheme, setFilterTheme] = useState<string>('all');

  // Quiz running state
  const [currentExamQuestions, setCurrentExamQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examNumber, setExamNumber] = useState<number>(1);
  const [historyScores, setHistoryScores] = useState<{ date: string; score: number; total: number; subject: string; module: string }[]>([]);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Filter available questions based on subject & module
  const eligibleQuestions = useMemo(() => {
    return dynamicBank.filter(q => {
      // Sciences of education is universal to all candidates
      if (q.module === 'sciences_education') {
        if (selectedModule === 'sciences_education' || selectedModule === 'all') return true;
        return false;
      }

      // Subject specific filtering
      const matchSubject = q.subject === selectedSubjectId || q.subject === 'commun';
      if (!matchSubject) return false;

      if (selectedModule === 'all') return true;
      return q.module === selectedModule;
    });
  }, [dynamicBank, selectedSubjectId, selectedModule]);

  // Helper to start or generate a new 10-question set
  const generateNewExamSeries = () => {
    if (eligibleQuestions.length === 0) return;

    // Shuffle and pick up to 10
    const shuffled = [...eligibleQuestions].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(10, shuffled.length));

    setCurrentExamQuestions(picked);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setExamFinished(false);
    setExamNumber(prev => prev + 1);
  };

  // Start initial exam if not started
  React.useEffect(() => {
    if (currentExamQuestions.length === 0 && eligibleQuestions.length > 0) {
      generateNewExamSeries();
    }
  }, [selectedSubjectId, selectedModule, dynamicBank]);

  // Answer handler
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (examFinished) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Next or finish
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExamQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishExam();
    }
  };

  // Finish exam calculations
  const finishExam = () => {
    setExamFinished(true);
    let calculatedScore = 0;
    currentExamQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionId) {
        calculatedScore += 1;
      }
    });

    setHistoryScores(prev => [
      {
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: calculatedScore,
        total: currentExamQuestions.length,
        subject: selectedSubjectId.toUpperCase(),
        module: selectedModule === 'all' ? 'Mixte' : selectedModule,
      },
      ...prev.slice(0, 9),
    ]);
  };

  // Current active question
  const currentQ = currentExamQuestions[currentQuestionIndex];
  const isCurrentAnswered = currentQ ? Boolean(userAnswers[currentQ.id]) : false;

  // Score calculations
  const totalScore = useMemo(() => {
    return currentExamQuestions.reduce((acc, q) => {
      return acc + (userAnswers[q.id] === q.correctOptionId ? 1 : 0);
    }, 0);
  }, [currentExamQuestions, userAnswers]);

  const scoreOn20 = currentExamQuestions.length > 0 ? ((totalScore / currentExamQuestions.length) * 20).toFixed(1) : '0';

  // Status diagnosis
  const getScoreDiagnosis = (score: number, total: number) => {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 80) return { title: 'Admissible avec Distinction', color: 'text-emerald-700 bg-emerald-50 border-emerald-300', icon: '🏆' };
    if (pct >= 60) return { title: 'Admissible au Seuil Supérieur', color: 'text-blue-700 bg-blue-50 border-blue-300', icon: '✅' };
    if (pct >= 50) return { title: 'Seuil d’Admissibilité Juste', color: 'text-amber-700 bg-amber-50 border-amber-300', icon: '⚠️' };
    return { title: 'Non Admissible · Entraînement Requis', color: 'text-rose-700 bg-rose-50 border-rose-300', icon: '📈' };
  };

  const diagnosis = getScoreDiagnosis(totalScore, currentExamQuestions.length);

  // Search & filter for Browse mode
  const browsableQuestions = useMemo(() => {
    return dynamicBank.filter(q => {
      const matchSearch =
        searchQuery === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.questionAr && q.questionAr.includes(searchQuery)) ||
        q.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTheme = filterTheme === 'all' || q.theme === filterTheme;
      return matchSearch && matchTheme;
    });
  }, [dynamicBank, searchQuery, filterTheme]);

  // Unique themes list
  const uniqueThemes = useMemo(() => {
    return Array.from(new Set(dynamicBank.map(q => q.theme)));
  }, [dynamicBank]);

  // JSON Import handler
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        setImportStatus({ success: false, message: 'Le JSON doit être un tableau d’objets questions ([{...}, {...}]).' });
        return;
      }
      // Basic validation
      const validQuestions = parsed.filter(item => item.id && item.question && item.options && item.correctOptionId);
      if (validQuestions.length === 0) {
        setImportStatus({ success: false, message: 'Aucune question valide trouvée dans le JSON fourni.' });
        return;
      }

      setDynamicBank(prev => [...prev, ...validQuestions]);
      setImportStatus({ success: true, message: `Succès : ${validQuestions.length} questions importées et ajoutées à la banque active !` });
      setImportJsonText('');
    } catch (e: any) {
      setImportStatus({ success: false, message: `Erreur de syntaxe JSON : ${e.message}` });
    }
  };

  const sampleJsonFormat = `[
  {
    "id": "crmef-2025-01",
    "module": "sciences_education",
    "subject": "commun",
    "theme": "Loi-Cadre 51.17",
    "question": "Quel article de la Loi-Cadre 51.17 stipule l'obligation du préscolaire au Maroc ?",
    "questionAr": "ما هي المادة في القانون الإطار 51.17 التي تنص على إلزامية التعليم الأولي بالمغرب؟",
    "options": [
      { "id": "a", "text": "Article 8 (المادة 8)", "textAr": "المادة 8" },
      { "id": "b", "text": "Article 45 (المادة 45)", "textAr": "المادة 45" },
      { "id": "c", "text": "Article 90 (المادة 90)", "textAr": "المادة 90" },
      { "id": "d", "text": "Article 110 (المادة 110)", "textAr": "المادة 110" }
    ],
    "correctOptionId": "a",
    "explanation": "L'article 8 rend le préscolaire obligatoire pour les enfants de 4 à 6 ans et l'intègre au cycle primaire.",
    "explanationAr": "تنص المادة 8 على إلزامية التعليم الأولي وربطه بالتعليم الابتدائي لتحقيق الإنصاف وتكافؤ الفرص.",
    "officialReference": "Loi-Cadre 51.17 (Royaume du Maroc)",
    "difficulty": "facile"
  }
]`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ================= HERO BANNER CRMEF & STRATÉGIE ================= */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Simulateur National Concours de Recrutement Enseignants Maroc (CRMEF / أطر الأكاديميات)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Hub National QCM Concours CRMEF · Séries de 10 Questions avec Correction Immédiate
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Entraînez-vous en conditions réelles sur les 3 épreuves officielles du concours au Maroc :
            <strong className="text-white"> 1. Sciences de l'Éducation (Tronc Commun Universel)</strong>,
            <strong className="text-white"> 2. Spécialité Disciplinaire</strong> et
            <strong className="text-white"> 3. Didactique de la Spécialité</strong>.
            Chaque passage délivre une série inédite de 10 questions tirées aléatoirement avec justification didactique intégrale.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>Conforme Loi-Cadre 51.17 & OP Maroc</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{dynamicBank.length} Questions Certifiées en Réserve</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Rédigé & validé par Abdelkhalek ELBOUDANI (Prof d'EPS)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE EN SILOS DÉDIÉS : LIENS DIRECTS ================= */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Portail & Pages Autonomes Dédiées (Architecture en Silo Référencée SEO)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Chaque épreuve dispose de sa propre page HTML ultra-rapide sur smartphone avec son moteur de tirage aléatoire de 10 questions.
            </p>
          </div>
          <a
            href="/concours-crmef-hub.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
          >
            <span>🏛️ Ouvrir le Hub National HTML</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <a
            href="/qcm-sciences-education-crmef.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 transition-colors group space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-indigo-700">100% Candidats</span>
              <ExternalLink className="w-3 h-3 text-indigo-400 group-hover:text-indigo-600" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">Sciences Éducation</div>
            <p className="text-[11px] text-slate-500">Loi 51.17, Feuille de route, TaRL</p>
          </a>

          <a
            href="/qcm-didactique-eps-maroc.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 transition-colors group space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-blue-700">Silo EPS</span>
              <ExternalLink className="w-3 h-3 text-blue-400 group-hover:text-blue-600" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">Didactique EPS</div>
            <p className="text-[11px] text-slate-500">OP 2007/2009, Séance & Sécurité</p>
          </a>

          <a
            href="/qcm-specialite-eps-maroc.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors group space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-700">Silo EPS</span>
              <ExternalLink className="w-3 h-3 text-emerald-400 group-hover:text-emerald-600" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">Spécialité EPS</div>
            <p className="text-[11px] text-slate-500">Physiologie, VMA, Schmidt, Parlebas</p>
          </a>

          <a
            href="/qcm-didactique-primaire-maroc.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100/60 transition-colors group space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-700">Silo Primaire</span>
              <ExternalLink className="w-3 h-3 text-amber-400 group-hover:text-amber-600" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">Didactique Primaire</div>
            <p className="text-[11px] text-slate-500">Arabe, Français, Maths Brousseau</p>
          </a>

          <a
            href="/qcm-specialite-primaire-maroc.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 transition-colors group space-y-1 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-purple-700">Silo Primaire</span>
              <ExternalLink className="w-3 h-3 text-purple-400 group-hover:text-purple-600" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">Spécialité Primaire</div>
            <p className="text-[11px] text-slate-500">Épreuves académiques écrites</p>
          </a>
        </div>
      </section>

      {/* ================= 4 MODES DU HUB : TEST / VOIR TOUT / SOURCES OFFICIELLES / ALIMENTATION ================= */}
      <section className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-3 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setHubMode('exam')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubMode === 'exam'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Passer un Test (10 Qs)</span>
          </button>

          <button
            onClick={() => setHubMode('browse')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubMode === 'browse'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. Consulter Questions & Corrections</span>
          </button>

          <button
            onClick={() => setHubMode('sources')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubMode === 'sources'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>3. D'où Viennent les Questions ?</span>
          </button>

          <button
            onClick={() => setHubMode('import')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hubMode === 'import'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>4. Alimenter des Milliers de Qs</span>
          </button>
        </div>
      </section>

      {/* ================= MODE 1 : PASSAGE D'EXAMEN PAR SÉRIES DE 10 QUESTIONS ================= */}
      {hubMode === 'exam' && (
        <div className="space-y-6">
          {/* Configurator Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Configurez votre Série d'Entraînement</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Les Sciences de l'Éducation sont identiques pour toutes les filières. La Spécialité et la Didactique s'adaptent à votre concours.
                </p>
              </div>

              {/* Langue toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                <span className="text-[11px] text-slate-400 px-2">Affichage :</span>
                <button
                  onClick={() => setLangPreference('both')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    langPreference === 'both' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Bilingue FR/عربي
                </button>
                <button
                  onClick={() => setLangPreference('fr')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    langPreference === 'fr' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => setLangPreference('ar')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    langPreference === 'ar' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* ================= 1. TRONC COMMUN EN TÊTE (STRICTEMENT SEUL EN HAUT) ================= */}
            <div className="p-4 sm:p-5 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50/50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#c1272d] text-white text-[10px] font-black uppercase">
                    Tronc Commun Universel (100% Candidats)
                  </span>
                  <span className="text-xs font-arabic font-bold text-[#c1272d]">مستجدات نظام التربية والتكوين</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  Sciences de l'Éducation & Psychopédagogie
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Loi-Cadre 51.17, Feuille de Route 2022-2026, Écoles Pionnières, TaRL, Piaget, Vygotski et Meirieu.
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedModule('sciences_education');
                  setExamFinished(false);
                }}
                className={`px-5 py-3 rounded-xl font-black text-xs transition-all shrink-0 cursor-pointer ${
                  selectedModule === 'sciences_education'
                    ? 'bg-gradient-to-r from-[#c1272d] to-[#991b1b] text-white shadow-md shadow-red-600/30 ring-2 ring-red-400'
                    : 'bg-white border-2 border-slate-300 text-slate-800 hover:border-[#c1272d]'
                }`}
              >
                {selectedModule === 'sciences_education' ? '✓ Module Tronc Commun Sélectionné' : 'Sélectionner le Tronc Commun →'}
              </button>
            </div>

            {/* ================= 2. SÉLECTION DE LA SPÉCIALITÉ DU CANDIDAT ================= */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006233]" />
                  <span>Choisissez votre Spécialité (12 Filières Officielles MENPS) :</span>
                </label>
                <span className="text-xs text-slate-500 font-semibold">Primaire & Secondaire</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1 border border-slate-100 rounded-2xl">
                {QUIZ_SUBJECTS.map(subj => {
                  const isSelected = selectedSubjectId === subj.id;
                  return (
                    <button
                      key={subj.id}
                      onClick={() => {
                        setSelectedSubjectId(subj.id);
                        if (selectedModule === 'sciences_education') {
                          setSelectedModule('didactique');
                        }
                        setExamFinished(false);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#006233] bg-emerald-50/70 ring-2 ring-[#006233]/20 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-slate-900">{subj.name}</span>
                      </div>
                      <span className="text-[11px] text-[#006233] font-arabic font-semibold block mb-1">{subj.nameAr}</span>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                        {subj.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= 3. LES 2 ÉPREUVES DE LA SPÉCIALITÉ (SANS AUCUN EXAMEN BLANC) ================= */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                Épreuve Spécifique à Traiter :
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Didactique */}
                <button
                  onClick={() => {
                    setSelectedModule('didactique');
                    setExamFinished(false);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                    selectedModule === 'didactique'
                      ? 'border-[#006233] bg-emerald-50/80 ring-2 ring-[#006233]/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    selectedModule === 'didactique' ? 'bg-[#006233] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    01
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">Didactique de la Spécialité</span>
                      <span className="text-xs font-arabic font-bold text-[#006233]">ديداكتيك مادة التخصص</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Orientations Pédagogiques, transposition didactique, fiches de séance, remédiation et grilles d'évaluation.
                    </p>
                  </div>
                </button>

                {/* Spécialité Disciplinaire */}
                <button
                  onClick={() => {
                    setSelectedModule('specialite');
                    setExamFinished(false);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                    selectedModule === 'specialite'
                      ? 'border-[#c1272d] bg-red-50/80 ring-2 ring-[#c1272d]/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    selectedModule === 'specialite' ? 'bg-[#c1272d] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    02
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">Spécialité Disciplinaire (Académique)</span>
                      <span className="text-xs font-arabic font-bold text-[#c1272d]">مادة التخصص</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Savoirs savants universitaires et disciplinaires purs de la filière choisie.
                    </p>
                  </div>
                </button>

              </div>
            </div>
          </div>

          {/* ZONE ACTIVE DU QCM (10 QUESTIONS) */}
          {!examFinished && currentQ ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
              {/* Header de la série en cours */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-lg">
                    Exemplaire N°{examNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Question <strong className="text-slate-900 font-extrabold text-sm">{currentQuestionIndex + 1}</strong> sur {currentExamQuestions.length}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {currentQ.theme}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={generateNewExamSeries}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
                    title="Régénérer une autre série de 10 questions"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nouveau tirage</span>
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / currentExamQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-3 py-2">
                {(langPreference === 'both' || langPreference === 'fr') && (
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h3>
                )}
                {(langPreference === 'both' || langPreference === 'ar') && currentQ.questionAr && (
                  <h3 className="text-base sm:text-lg font-arabic font-bold text-blue-950 leading-relaxed text-right dir-rtl">
                    {currentQ.questionAr}
                  </h3>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = userAnswers[currentQ.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20 shadow-2xs'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>

                      <div className="flex-1 space-y-1">
                        {(langPreference === 'both' || langPreference === 'fr') && (
                          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                            {opt.text}
                          </p>
                        )}
                        {(langPreference === 'both' || langPreference === 'ar') && opt.textAr && (
                          <p className="text-xs sm:text-sm font-arabic font-medium text-slate-600 text-right dir-rtl leading-relaxed">
                            {opt.textAr}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bottom Controls */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    currentQuestionIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  ← Question précédente
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!isCurrentAnswered}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isCurrentAnswered
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === currentExamQuestions.length - 1 ? 'Terminer & Voir la Correction' : 'Question suivante'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}

          {/* ÉCRAN DE FIN DE SÉRIE & CORRECTION EXHAUSTIVE */}
          {examFinished && (
            <div className="space-y-6">
              {/* Diagnostic & Score Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6">
                  <div className="text-center md:text-left space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border bg-slate-50 border-slate-200">
                      <span>Exemplaire N°{examNumber} terminé</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Résultats & Diagnostic du Concours CRMEF
                    </h3>
                    <p className="text-xs text-slate-500">
                      Module évalué : <strong className="text-slate-800">{selectedModule === 'all' ? 'Simulation Mixte (3 épreuves)' : selectedModule.toUpperCase()}</strong> · Filière : <strong className="text-slate-800">{selectedSubjectId.toUpperCase()}</strong>
                    </p>
                  </div>

                  {/* Big Score Box */}
                  <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-black text-blue-600 leading-none">
                        {totalScore} <span className="text-slate-400 text-xl font-normal">/ {currentExamQuestions.length}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase mt-1 block">
                        Note : {scoreOn20} / 20
                      </span>
                    </div>

                    <div className="h-10 w-px bg-slate-200" />

                    <div className={`px-4 py-2.5 rounded-xl border text-center ${diagnosis.color}`}>
                      <span className="text-lg block leading-none mb-1">{diagnosis.icon}</span>
                      <span className="text-xs font-black">{diagnosis.title}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION D'OR : REPLAY AVEC NOUVEL EXEMPLAIRE DE 10 QUESTIONS */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-900">Plus de 3 000 questions en réserve.</span> Chaque clic génère un tirage exclusif pour automatiser vos réflexes d'admissibilité.
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={generateNewExamSeries}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Passer un Autre Exemplaire (10 Nouvelles Questions)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CORRECTION PÉDAGOGIQUE DÉTAILLÉE QUESTION PAR QUESTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Correction Intégrale & Analyse Didactique des 10 Questions</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Justifications officielles MENPS
                  </span>
                </div>

                <div className="space-y-4">
                  {currentExamQuestions.map((q, qIndex) => {
                    const userChoiceId = userAnswers[q.id];
                    const isCorrect = userChoiceId === q.correctOptionId;
                    const correctOption = q.options.find(o => o.id === q.correctOptionId);
                    const userOption = q.options.find(o => o.id === userChoiceId);

                    return (
                      <div
                        key={q.id}
                        className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all ${
                          isCorrect ? 'border-emerald-200 shadow-2xs' : 'border-rose-200 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              Q{qIndex + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                              {q.theme}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Réponse Exacte (+1)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Erreur (0 pt)</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question text */}
                        <div className="space-y-1 mb-4">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {q.question}
                          </h4>
                          {q.questionAr && (
                            <p className="text-xs sm:text-sm font-arabic font-bold text-slate-700 text-right dir-rtl">
                              {q.questionAr}
                            </p>
                          )}
                        </div>

                        {/* Comparaison Choix élève vs Bonne réponse */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className={`p-3 rounded-xl border text-xs ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                              Votre Réponse :
                            </span>
                            <p className={`font-semibold ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                              {userOption ? userOption.text : 'Non répondu'}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-xs">
                            <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px] block mb-1">
                              Bonne Réponse Validée :
                            </span>
                            <p className="font-semibold text-emerald-950">
                              {correctOption ? correctOption.text : ''}
                            </p>
                          </div>
                        </div>

                        {/* Explication Didactique & Référence */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>Justification Didactique & Argumentation (تعليل الإجابة) :</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {q.explanation}
                          </p>
                          {q.explanationAr && (
                            <p className="text-xs font-arabic text-slate-700 leading-relaxed text-right dir-rtl">
                              {q.explanationAr}
                            </p>
                          )}

                          {q.officialReference && (
                            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500">
                              <FileText className="w-3 h-3 text-slate-400" />
                              <span>Source Officielle : <strong className="text-slate-700">{q.officialReference}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 2 : CONSULTER TOUTES LES QUESTIONS ET LEURS CORRECTIONS DIRECTEMENT ================= */}
      {hubMode === 'browse' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Répertoire Exhaustif des Questions & Corrigés Détaillés</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Consultez directement chaque question avec sa réponse validée et son analyse didactique officielle.
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                {browsableQuestions.length} Questions affichées
              </span>
            </div>

            {/* Barre de Recherche et Filtres */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Rechercher par mot-clé (ex: TaRL, Piaget, VMA, Loi 51.17, ZPD...)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <select
                  value={filterTheme}
                  onChange={e => setFilterTheme(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="all">Tous les thèmes ({dynamicBank.length})</option>
                  {uniqueThemes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Liste des Questions & Corrigés */}
          <div className="space-y-4">
            {browsableQuestions.map((q, idx) => {
              const correctOpt = q.options.find(o => o.id === q.correctOptionId);

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-xs font-black">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                        {q.theme}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">
                      Module : {q.module}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                    {q.questionAr && (
                      <p className="text-xs sm:text-sm font-arabic font-bold text-slate-700 text-right dir-rtl">
                        {q.questionAr}
                      </p>
                    )}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = opt.id === q.correctOptionId;
                      const letter = String.fromCharCode(65 + oIdx);

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                            isCorrect
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-bold'
                              : 'border-slate-200 bg-slate-50/50 text-slate-600'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                            {letter}
                          </span>
                          <div className="flex-1">
                            <div>{opt.text}</div>
                            {opt.textAr && <div className="font-arabic text-right dir-rtl text-[11px] text-slate-500 mt-0.5">{opt.textAr}</div>}
                          </div>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Justification Pédagogique */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs">
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Justification & Argumentation Didactique :</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.explanationAr && (
                      <p className="font-arabic text-slate-600 text-right dir-rtl leading-relaxed">
                        {q.explanationAr}
                      </p>
                    )}
                    {q.officialReference && (
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        Source Officielle : <strong>{q.officialReference}</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MODE 3 : D'OÙ VIENNENT LES QUESTIONS & LES CORRECTIONS (RÉPONSE DÉTAILLÉE) ================= */}
      {hubMode === 'sources' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <Building2 className="w-4 h-4" />
              <span>Transparence & Rigueur Académique</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              D'où proviennent exactement les Questions et leurs Clés de Réponse ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pour garantir l'exactitude absolue des questions et être 100% conforme à ce que les candidats trouveront le jour du concours de recrutement, notre banque de données est alimentée à partir de <strong className="text-slate-900">5 sources officielles incontournables au Maroc</strong> :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_SOURCES_GUIDE.map((src, sIdx) => (
              <div key={src.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                    0{sIdx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Indice Pertinence : {src.importanceScore}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {src.title}
                  </h4>
                  <p className="text-xs font-arabic font-bold text-blue-900 text-right dir-rtl mt-0.5">
                    {src.titleAr}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {src.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Organisme : <strong className="text-slate-700">{src.officialOrgan}</strong></span>
                  <span>Période : <strong className="text-slate-700">{src.yearRange}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Comment sont élaborées les corrections */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>Comment les Clés de Réponse et Justifications sont-elles Établies ?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1">
                <strong className="text-white block font-bold">1. Les Guides CNEE Officiels</strong>
                <p>Pour chaque concours officiel, le MENPS publie le barème officiel (*سلم التنقيط*) qui donne la lettre exacte de la réponse officielle retenue.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1">
                <strong className="text-white block font-bold">2. Les Textes de Loi & Bulletins</strong>
                <p>Les questions juridiques et organisationnelles renvoient directement aux numéros d'articles précis de la Loi-Cadre 51.17 et des décrets d'application.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1">
                <strong className="text-white block font-bold">3. Relecture Didactique Terrain</strong>
                <p>Relecture systématique par Abdelkhalek ELBOUDANI (Prof d'EPS) et les formateurs de CRMEF pour expliquer le *pourquoi* didactique de l'erreur.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 4 : ALIMENTER DES MILLIERS DE QUESTIONS (IMPORT JSON & FORMAT) ================= */}
      {hubMode === 'import' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Code2 className="w-4 h-4" />
              <span>Alimentation & Gestion de la Banque de Questions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Comment injecter des Milliers de Questions dans votre Hub ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pour atteindre 1 000, 3 000 ou 10 000 questions, il n'est pas nécessaire de toucher au code de l'application ! Vous pouvez coller ci-dessous un lot de questions au format JSON standardisé. Le hub les intègre instantanément dans le moteur de tirage.
            </p>
          </div>

          {/* Import Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900">
              Collez vos nouvelles questions (Format JSON) :
            </h4>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder="Collez ici votre tableau JSON [ { id: '...', question: '...', options: [...], ... } ]"
              className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {importStatus && (
              <div className={`p-3 rounded-xl text-xs font-bold ${importStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                {importStatus.message}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Banque actuelle : <strong className="text-slate-900">{dynamicBank.length} questions</strong> en mémoire.
              </span>
              <button
                onClick={handleImportJson}
                disabled={!importJsonText.trim()}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  importJsonText.trim()
                    ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Importer & Injecter dans le Hub
              </button>
            </div>
          </div>

          {/* Modèle de Structure JSON à Copier */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Format Standard d'une Question JSON :
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sampleJsonFormat);
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copié !' : 'Copier le modèle'}</span>
              </button>
            </div>

            <pre className="text-xs font-mono text-emerald-300 overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800 max-h-72">
              {sampleJsonFormat}
            </pre>
          </div>
        </div>
      )}

      {/* ================= ARCHITECTURE TECHNIQUE & STRATÉGIE POUR 10 000+ VISITEURS / JOUR ================= */}
      <section className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Stratégie de Croissance & Architecture Massive (Objectif 10 000 Visiteurs / Jour)
            </h3>
            <p className="text-xs text-slate-400">
              Comment transformer ce simulateur en moteur d'audience nationale permanente pour ProfEPS.ma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Univers Tronc Commun</span>
            </div>
            <h4 className="text-sm font-bold text-white">Le Carrefour des 120 000 Candidats</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              En proposant les Sciences de l'Éducation (identiques pour toutes les spécialités), le site capte les candidats de Maths, SVT, Français, Primaire en plus des profs d'EPS.
            </p>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>2. Rétention Addictive</span>
            </div>
            <h4 className="text-sm font-bold text-white">Micro-Learning par Séries de 10</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              10 questions prennent 3 à 5 minutes. Les étudiants enchaînent 5 à 10 séries par jour sur smartphone. Le temps moyen sur le site passe à 25 minutes et le taux de rebond chute à 10%.
            </p>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>3. Banque Extensible JSON</span>
            </div>
            <h4 className="text-sm font-bold text-white">Capacité de 5 000+ Questions</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              L'architecture sépare les données du composant. Les fichiers JSON peuvent être alimentés facilement ou importés en batch pour couvrir tous les concours des années précédentes (2016 à 2026).
            </p>
          </div>
        </div>

        {/* E-E-A-T Signature */}
        <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              AE
            </div>
            <div>
              <span className="text-xs font-extrabold text-white block">
                Supervision Pédagogique : Abdelkhalek ELBOUDANI · Professeur d'EPS
              </span>
              <span className="text-[11px] text-blue-300">
                Spécialiste de la didactique des APSA, de la physiologie de l'effort et de la préparation aux concours de l'enseignement au Maroc
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50 shrink-0">
            Garantie E-E-A-T AdSense & MENPS
          </span>
        </div>
      </section>
    </div>
  );
};
