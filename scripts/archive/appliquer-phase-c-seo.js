/**
 * appliquer-phase-c-seo.js - Phase C SEO ProfEPS Maroc
 */
(async () => {
const fs = await import('fs');
const path = await import('path');

const rootDir = process.cwd();
const hasPublicDir = fs.existsSync(path.join(rootDir, 'public')) && fs.statSync(path.join(rootDir, 'public')).isDirectory();

console.log('================================================================');
console.log('🚀 DÉMARRAGE DE LA PHASE C : PAGES PILIERS & ENRICHISSEMENT DU CONTENU');
console.log('📁 Dossier public détecté :', hasPublicDir);
console.log('================================================================\n');

const HUB_EDITORIAL_HTML = `
    <!-- PHASE C : GUIDE D'ORIENTATION SCIENTIFIQUE & PÉDAGOGIQUE PAR PROFIL -->
    <section class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div class="border-b border-slate-100 pb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 mb-2">
          🧭 Cadre Méthodologique & Didactique
        </span>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Pourquoi et Comment Utiliser les Calculateurs Scientifiques ProfEPS ?
        </h2>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">
          La planification de la course de durée, du demi-fond et de la préparation physique en milieu scolaire ou fédéral ne peut reposer sur l'approximation. Développés en stricte conformité avec la physiologie de l'effort moderne et les Orientations Pédagogiques Officielles du Ministère de l'Éducation Nationale marocain, nos 10 outils interactifs traduisent les équations de référence en repères concrets de terrain.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm">
              👨‍🏫
            </div>
            <h3 class="text-base font-extrabold text-slate-900">
              Pour l'Enseignant d'EPS
            </h3>
            <p class="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">
              Collège & Lycée (Demi-Fond / EPS)
            </p>
            <p class="text-xs text-slate-600 leading-relaxed">
              Exploitez les résultats des tests diagnostiques (Demi-Cooper, Luc Léger, 6 minutes) pour concevoir des groupes de niveau homogènes. Calibrez les plots de course au mètre près, programmez des séances de 15"/15" ou 30"/30" personnalisées et ajustez les temps d'effort en cas de forte chaleur ou de jeûne.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 text-xs font-bold text-red-700">
            Outils recommandés : VMA, HIIT 180°, Chaleur & Rosée
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm">
              🏃
            </div>
            <h3 class="text-base font-extrabold text-slate-900">
              Pour le Coureur & Athlète
            </h3>
            <p class="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              Route, Piste, Trail & Cross
            </p>
            <p class="text-xs text-slate-600 leading-relaxed">
              Prédisez vos allures de compétition du 1500m au marathon grâce au modèle Jack Daniels VDOT. Analysez votre Indice d'Endurance (Péronnet) pour déterminer si votre priorité d'entraînement doit être le travail de seuil ou le développement de la VMA, et anticipez le coût énergétique de la pente (Minetti GAP).
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 text-xs font-bold text-emerald-700">
            Outils recommandés : VO2 Max VDOT, Indice d'Endurance, GAP Pente
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm">
              ⚡
            </div>
            <h3 class="text-base font-extrabold text-slate-900">
              Pour l'Entraîneur & Préparateur
            </h3>
            <p class="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
              Sports Collectifs & Performance
            </p>
            <p class="text-xs text-slate-600 leading-relaxed">
              Individualisez les sollicitations supramaximales en utilisant la Réserve de Vitesse Anaérobie (ASR) : deux athlètes ayant la même VMA mais un sprint différent ne subissent pas la même fatigue. Surveillez la charge aiguë et chronique (Foster sRPE & ACWR) pour prévenir le risque de blessure tissulaire.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 text-xs font-bold text-blue-700">
            Outils recommandés : ASR, Foster ACWR, Fréquence Cardiaque Karvonen
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-red-50 via-slate-50 to-emerald-50 border border-slate-200 rounded-xl p-5 mt-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>📚</span>
            <span>Ressources Pédagogiques & Textes Officiels Associés</span>
          </h3>
          <span class="text-xs text-slate-500">Conformité Ministère de l'Éducation Nationale</span>
        </div>
        <p class="text-xs text-slate-600 mb-4 leading-relaxed">
          L'utilisation de ces calculateurs s'inscrit directement dans les modules d'enseignement et l'évaluation certificative de l'EPS au Maroc :
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a href="cycles-eps-maroc.html" class="bg-white border border-slate-200 hover:border-red-500 rounded-lg p-3 text-center transition block group shadow-xs">
            <span class="text-lg block mb-1">🏃‍♂️</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-red-700 block">Cycles d'EPS</span>
            <span class="text-[11px] text-slate-500">Collège & Lycée</span>
          </a>
          <a href="programme-eps-maroc.html" class="bg-white border border-slate-200 hover:border-red-500 rounded-lg p-3 text-center transition block group shadow-xs">
            <span class="text-lg block mb-1">📖</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-red-700 block">Programme EPS</span>
            <span class="text-[11px] text-slate-500">Compétences & Horaires</span>
          </a>
          <a href="evaluation-eps.html" class="bg-white border border-slate-200 hover:border-emerald-500 rounded-lg p-3 text-center transition block group shadow-xs">
            <span class="text-lg block mb-1">📊</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-emerald-700 block">Évaluation EPS</span>
            <span class="text-[11px] text-slate-500">Barèmes & 20 Points</span>
          </a>
          <a href="securite-eps.html" class="bg-white border border-slate-200 hover:border-blue-500 rounded-lg p-3 text-center transition block group shadow-xs">
            <span class="text-lg block mb-1">🛡️</span>
            <span class="text-xs font-bold text-slate-800 group-hover:text-blue-700 block">Sécurité EPS</span>
            <span class="text-[11px] text-slate-500">Prévention & Secours</span>
          </a>
        </div>
      </div>

      <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span class="text-amber-600 text-lg shrink-0 mt-0.5">⚠️</span>
        <div class="text-xs text-amber-900 leading-relaxed">
          <strong>Avertissement médical et sécurité physique :</strong> Les équations et barèmes proposés constituent des aides méthodologiques et pédagogiques destinées aux enseignants et sportifs réguliers. Ils ne se substituent en aucun cas à un examen médical spécialisé ou à un électrocardiogramme. La réalisation d'efforts intenses et de tests maximaux (VMA, intermittents) nécessite une aptitude physique médicale certifiée et un protocole d'échauffement adapté.
        </div>
      </div>
    </section>
`;

const MEDICAL_DISCLAIMER_HTML = `
    <!-- AVERTISSEMENT DE PRUDENCE PHYSIQUE & CONFORMITÉ SANTÉ -->
    <div class="peps-medical-notice max-w-3xl mx-auto my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs leading-relaxed flex items-start gap-3 shadow-xs">
      <span class="text-amber-500 text-base shrink-0">⚠️</span>
      <div>
        <strong class="text-slate-800">Avertissement de sécurité et de prudence sportive :</strong> Les calculs physiologiques fournis sont des estimations théoriques validées scientifiquement à des fins pédagogiques et d'entraînement. Ils ne remplacent pas un avis médical personnalisé. Avant d'entreprendre des efforts à haute intensité, assurez-vous d'une aptitude médicale complète et respectez des phases d'échauffement et d'hydratation progressives.
      </div>
    </div>
`;

function updateHubFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Pourquoi et Comment Utiliser les Calculateurs Scientifiques ProfEPS')) {
    const mainMatch = content.match(/(<main[^>]*>)/i);
    if (mainMatch) {
      content = content.replace(mainMatch[1], mainMatch[1] + '\n' + HUB_EDITORIAL_HTML);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
  }
  return false;
}

function updateCalculatorNotice(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('peps-medical-notice') && !content.includes('Avertissement de sécurité et de prudence sportive')) {
    if (content.includes('</main>')) {
      content = content.replace('</main>', MEDICAL_DISCLAIMER_HTML + '\n  </main>');
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
  }
  return false;
}

const CALC_FILES = [
  'calculateur-vma.html',
  'calculateur-vdot-asr-endurance.html',
  'calculateur-asr-reserve-vitesse.html',
  'calculateur-indice-endurance.html',
  'calculateur-frequence-cardiaque-karvonen.html',
  'calculateur-imc-sportif-masse-grasse.html',
  'calculateur-chaleur-meteo-altitude.html',
  'calculateur-gap-pente-nutrition.html',
  'generateur-intermittent-hiit-cod.html',
  'calculateur-charge-rpe-foster-acwr.html'
];

let hubUpdated = 0;
let calcsUpdated = 0;

if (updateHubFile(path.join(rootDir, 'hub-outils-sport-performance.html'))) hubUpdated++;
CALC_FILES.forEach(file => {
  if (updateCalculatorNotice(path.join(rootDir, file))) calcsUpdated++;
});

if (hasPublicDir) {
  if (updateHubFile(path.join(rootDir, 'public', 'hub-outils-sport-performance.html'))) hubUpdated++;
  CALC_FILES.forEach(file => {
    if (updateCalculatorNotice(path.join(rootDir, 'public', file))) calcsUpdated++;
  });
}

console.log(`✔ Hub enrichi avec introduction structurée (3 profils + maillage 4 piliers) : ${hubUpdated} fichier(s).`);
console.log(`✔ Avertissements médicaux et prudence physique injectés : ${calcsUpdated} calculateur(s).`);

const htaccessPath = path.join(rootDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  let htContent = fs.readFileSync(htaccessPath, 'utf8');
  const consolidationRules = [
    'Redirect 301 /article-what-is-maximal-aerobic-speed-mas.html https://profeps.ma/article-test-vma-eps.html',
    'Redirect 301 /article-6-minute-mas-test-protocol.html https://profeps.ma/calculateur-vma.html',
    'Redirect 301 /article-convert-beep-test-to-mas.html https://profeps.ma/calculateur-vma.html'
  ];

  let added = 0;
  consolidationRules.forEach(rule => {
    const key = rule.split(' ')[1];
    if (!htContent.includes(key)) {
      htContent += '\n' + rule;
      added++;
    }
  });

  if (added > 0) {
    fs.writeFileSync(htaccessPath, htContent, 'utf8');
    console.log(`✔ .htaccess mis à jour avec ${added} redirections 301 de consolidation.`);
  } else {
    console.log('✔ .htaccess déjà à jour.');
  }
}

console.log('\n================================================================');
console.log('🎉 PHASE C APPLIQUÉE AVEC SUCCÈS !');
console.log('================================================================\n');
})();
