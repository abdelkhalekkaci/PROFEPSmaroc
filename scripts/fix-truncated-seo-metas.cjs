const fs = require('fs');
const path = require('path');

// 1. Extract all proposedTitle and proposedDesc from src/data/seoAuditData.ts
const seoAuditRaw = fs.readFileSync(path.join(process.cwd(), 'src/data/seoAuditData.ts'), 'utf8');
const auditMap = new Map();

const itemRegex = /url:\s*'\/([^']+)'[\s\S]*?proposedTitle:\s*'((?:\\'|[^'])+)'[\s\S]*?proposedDesc:\s*'((?:\\'|[^'])+)'/g;
let match;
while ((match = itemRegex.exec(seoAuditRaw)) !== null) {
  const file = match[1] === '' ? 'index.html' : match[1];
  const title = match[2].replace(/\\'/g, "'").trim();
  const desc = match[3].replace(/\\'/g, "'").trim();
  auditMap.set(file, { title, desc });
}

// 2. High-CTR overrides & complete descriptions for CRMEF 2026 Hub, QCMs, Homepage, Criteres & Course de Durée
const customMetaOverrides = {
  'index.html': {
    title: 'ProfEPS Maroc : OP 2007/2009 PDF, Fiches EPS & QCM CRMEF',
    desc: "Portail N°1 de l'EPS au Maroc : Orientations Pédagogiques 2007 et 2009 PDF, générateur de fiches de séance, cycles collège/lycée, calculateur VMA et QCM CRMEF 2026 corrigés."
  },
  'a-propos.html': {
    title: 'À Propos de ProfEPS Maroc & Abdelkhalek ELBOUDANI',
    desc: "Découvrez la démarche pédagogique d'Abdelkhalek ELBOUDANI et de ProfEPS.ma : outils scientifiques VMA, générateurs conformes aux OP 2007/2009 et préparation aux concours CRMEF au Maroc."
  },
  'concours-crmef-hub.html': {
    title: 'Concours CRMEF Maroc 2026 : QCM Corrigés & 13 Spécialités',
    desc: "Portail national de préparation au concours CRMEF 2026 (مباراة التعليم) au Maroc : QCM corrigés en Sciences de l'Éducation, Didactique et Spécialité (EPS, Primaire, Français, Maths, SVT, PC, Arabe)."
  },
  'concours-eps-maroc.html': {
    title: 'Concours EPS Maroc 2026 (CRMEF) : QCM, OP 2007/2009 & Oral',
    desc: "Préparation complète au concours d'enseignement EPS Maroc (CRMEF 2026) : 150 QCM corrigés, synthèse des Orientations Pédagogiques 2007 et 2009 PDF, traitement didactique des APSA et épreuve orale."
  },
  'qcm-concours-crmef.html': {
    title: 'Simulateur QCM Concours CRMEF 2026 : Didactique & Éducation',
    desc: "Simulateur interactif gratuit de QCM pour le concours d'enseignement CRMEF 2026 au Maroc : entraînez-vous par série chronométrée avec correction détaillée conforme aux cadres de référence MENPS."
  },
  'qcm-150-questions-crmef-eps.html': {
    title: '150 Questions QCM Concours EPS Maroc (CRMEF 2026) Corrigées',
    desc: "Banque officielle de 150 questions QCM corrigées pour le concours CRMEF EPS au Maroc : Orientations Pédagogiques 2007/2009, didactique des APSA, physiologie de l'effort, VMA et règlement sportif."
  },
  'qcm-sciences-education-crmef.html': {
    title: "QCM Sciences de l'Éducation CRMEF 2026 · 100 Séries Corrigées",
    desc: "Simulateur officiel de QCM en Sciences de l'Éducation (علوم التربية) pour le concours CRMEF 2026 au Maroc : théories d'apprentissage (Piaget, Vygotski), APC, Loi-cadre 51.17 et feuille de route 2022-2026."
  },
  'qcm-didactique-eps-maroc.html': {
    title: "QCM Didactique de l'EPS CRMEF Maroc 2026 · 100 Séries",
    desc: "Simulateur officiel de QCM en Didactique de l'EPS pour le concours CRMEF 2026 au Maroc : OP 2007 (Lycée), OP 2009 (Collège), OTI/OTC, cycles d'apprentissage, évaluation et traitement didactique."
  },
  'qcm-specialite-eps-maroc.html': {
    title: 'QCM Spécialité EPS CRMEF Maroc 2026 · Biomécanique & APSA',
    desc: "Banque officielle de 100 séries de QCM pour l'épreuve de spécialité du concours CRMEF EPS au Maroc : physiologie de l'exercice, filières énergétiques, anatomie, VMA et règlements officiels des APSA."
  },
  'qcm-didactique-primaire-maroc.html': {
    title: 'QCM Didactique Primaire CRMEF 2026 · Arabe, Français, Maths',
    desc: "Simulateur officiel de QCM en Didactique de l'Enseignement Primaire (التعليم الابتدائي) pour le concours CRMEF 2026 au Maroc : didactique du français, arabe, mathématiques et éveil scientifique."
  },
  'qcm-specialite-primaire-maroc.html': {
    title: 'QCM Spécialité Primaire CRMEF Maroc 2026 · Épreuves Corrigées',
    desc: "Simulateur officiel de QCM pour l'épreuve de spécialité du concours d'enseignement primaire CRMEF 2026 au Maroc : langue française, langue arabe, mathématiques et sciences avec corrections détaillées."
  },
  'qcm-didactique-francais-maroc.html': {
    title: 'QCM Didactique du Français CRMEF 2026 · Collège & Lycée',
    desc: "Simulateur officiel de QCM en Didactique du Français pour le concours CRMEF 2026 au Maroc : Orientations Pédagogiques 2007 (Lycée) et 2009 (Collège), lecture méthodique, séquence didactique et évaluation."
  },
  'qcm-specialite-francais-maroc.html': {
    title: 'QCM Spécialité Français CRMEF Maroc 2026 · Langue & Œuvres',
    desc: "Simulateur officiel de QCM en Spécialité Français pour le concours CRMEF 2026 au Maroc : littérature marocaine et française, œuvres intégrales du programme lycée, grammaire, linguistique et stylistique."
  },
  'qcm-didactique-maths-maroc.html': {
    title: 'QCM Didactique des Mathématiques CRMEF 2026 · 100 Séries',
    desc: "Plateforme officielle de préparation au concours CRMEF 2026 en Didactique des Mathématiques au Maroc : situations didactiques de Brousseau, contrat didactique, transposition et obstacles épistémologiques."
  },
  'qcm-specialite-maths-maroc.html': {
    title: 'QCM Spécialité Mathématiques CRMEF Maroc 2026 · 100 Séries',
    desc: "Banque officielle de 100 séries QCM corrigées en Spécialité Mathématiques pour le concours CRMEF secondaire au Maroc : analyse, algèbre linéaire, géométrie, probabilités et nombres complexes."
  },
  'qcm-didactique-svt-maroc.html': {
    title: 'QCM Didactique des SVT CRMEF Maroc 2026 · Démarche OHERIC',
    desc: "Simulateur officiel de QCM en Didactique des SVT pour le concours CRMEF 2026 au Maroc : démarche d'investigation scientifique (OHERIC), concepts intégrateurs, modélisation et évaluation par compétences."
  },
  'qcm-specialite-svt-maroc.html': {
    title: 'QCM Spécialité SVT CRMEF Maroc 2026 · Biologie & Géologie',
    desc: "Simulateur officiel de QCM en Spécialité SVT pour le concours CRMEF 2026 au Maroc : génétique, immunologie, physiologie nerveuse, métabolisme cellulaire, géodynamique et chaînes de montagnes."
  },
  'qcm-didactique-physique-chimie-maroc.html': {
    title: 'QCM Didactique Physique-Chimie CRMEF Maroc 2026 · 100 Séries',
    desc: "Plateforme officielle de QCM en Didactique de la Physique-Chimie pour le concours CRMEF 2026 au Maroc : démarche expérimentale, représentations initiales des élèves, sécurité au laboratoire et évaluation."
  },
  'qcm-specialite-physique-chimie-maroc.html': {
    title: 'QCM Spécialité Physique-Chimie CRMEF Maroc 2026 · 100 Séries',
    desc: "Simulateur officiel de QCM en Spécialité Physique-Chimie pour le concours CRMEF 2026 au Maroc : mécanique de Newton, électricité RC/RL/RLC, ondes, physique nucléaire, cinétique et acides-bases."
  },
  'qcm-didactique-anglais-maroc.html': {
    title: 'QCM Didactique Anglais (ELT) CRMEF Maroc 2026 · 100 Séries',
    desc: "Simulateur officiel de QCM en Didactique de l'Anglais (ELT Pedagogy & Methodology) pour le concours CRMEF 2026 au Maroc : Standards-Based Approach, lesson planning, four skills et assessment."
  },
  'qcm-specialite-anglais-maroc.html': {
    title: 'QCM Spécialité Anglais CRMEF Maroc 2026 · Applied Linguistics',
    desc: "Simulateur officiel de l'épreuve de Spécialité Anglais pour le concours CRMEF 2026 au Maroc : advanced grammar, phonetics, morphology, syntax, pragmatics et compréhension écrite."
  },
  'qcm-didactique-economie-gestion-maroc.html': {
    title: "QCM Didactique Économie & Gestion CRMEF Maroc 2026",
    desc: "Plateforme officielle d'entraînement aux QCM de Didactique de l'Économie et Gestion pour le concours CRMEF 2026 au Maroc : exploitation de dossiers documentaires, étude de cas et programmes lycée."
  },
  'qcm-specialite-economie-gestion-maroc.html': {
    title: 'QCM Spécialité Économie & Gestion CRMEF Maroc 2026',
    desc: "Plateforme officielle de QCM en Spécialité Économie et Gestion pour le concours CRMEF 2026 au Maroc : comptabilité générale et analytique, macroéconomie, management stratégique et analyse financière."
  },
  'qcm-didactique-informatique-maroc.html': {
    title: "QCM Didactique de l'Informatique CRMEF Maroc 2026",
    desc: "Plateforme d'entraînement aux QCM de Didactique de l'Informatique pour le concours CRMEF 2026 au Maroc : pensée computationnelle, résolution de problèmes par projet, algorithmique et programmes officiels."
  },
  'qcm-specialite-informatique-maroc.html': {
    title: 'QCM Spécialité Informatique CRMEF Maroc 2026 · Algorithmique',
    desc: "Plateforme de QCM en Spécialité Informatique pour le concours CRMEF 2026 au Maroc : algorithmique et programmation Python/C, bases de données SQL, réseaux TCP/IP, architecture et systèmes."
  },
  'qcm-didactique-arabe-maroc.html': {
    title: 'QCM ديداكتيك اللغة العربية مباراة التعليم CRMEF 2026',
    desc: "منصة تفاعلية لاختبارات QCM في ديداكتيك اللغة العربية لمباراة التعليم (CRMEF 2026) بالمغرب: القراءة المنهجية، الدرس اللغوي، التعبير والإنشاء، والتقويم والدعم وفق التوجيهات التربوية."
  },
  'qcm-specialite-arabe-maroc.html': {
    title: 'QCM تخصص اللغة العربية مباراة التعليم CRMEF المغرب 2026',
    desc: "منصة اختبارات QCM لمادة التخصص في اللغة العربية لمباراة التعليم CRMEF 2026 بالمغرب: النحو والصرف، علوم البلاغة، العروض والقافية، النقد الأدبي وتاريخ الأدب العربي."
  },
  'qcm-didactique-education-islamique-maroc.html': {
    title: 'QCM ديداكتيك التربية الإسلامية مباراة التعليم CRMEF 2026',
    desc: "المنصة الرسمية لاختبارات ديداكتيك التربية الإسلامية لمباراة التعليم بالمغرب CRMEF 2026: المداخل الخمسة (التزكية، الاقتداء، الاستجابة، القسط، الحكمة)، الوضعية المشكلة والتقويم."
  },
  'qcm-specialite-education-islamique-maroc.html': {
    title: 'QCM تخصص التربية الإسلامية والعلوم الشرعية مباراة التعليم 2026',
    desc: "المنصة الرسمية لاختبارات مادة التخصص في التربية الإسلامية لمباراة التعليم CRMEF 2026: علوم القرآن والتفسير، علوم الحديث، أصول الفقه المالكي، القواعد الفقهية والسيرة النبوية."
  },
  'qcm-didactique-histoire-geographie-maroc.html': {
    title: 'QCM ديداكتيك التاريخ والجغرافيا مباراة التعليم CRMEF 2026',
    desc: "منصة تفاعلية لاختبارات QCM في ديداكتيك الاجتماعيات (التاريخ والجغرافيا والتربية على المواطنة) لمباراة التعليم CRMEF 2026 بالمغرب: النهج التاريخي والنهج الجغرافي."
  },
  'qcm-specialite-histoire-geographie-maroc.html': {
    title: 'QCM تخصص التاريخ والجغرافيا مباراة التعليم CRMEF المغرب 2026',
    desc: "منصة اختبارات QCM لمادة التخصص في التاريخ والجغرافيا لمباراة التعليم CRMEF 2026 بالمغرب: تاريخ المغرب والعالم المعاصر، جغرافية المجال المغربي، القوى الاقتصادية الكبرى والإبستيمولوجيا."
  },
  'qcm-didactique-philosophie-maroc.html': {
    title: 'QCM ديداكتيك الفلسفة مباراة التعليم CRMEF المغرب 2026',
    desc: "منصة تفاعلية لاختبارات QCM في ديداكتيك الدرس الفلسفي لمباراة التعليم CRMEF 2026 بالمغرب: الكفايات الفلسفية (الأشكلة، المفهمة، المحاججة)، بناء النص الفلسفي والتقويم."
  },
  'qcm-specialite-philosophie-maroc.html': {
    title: 'QCM تخصص الفلسفة مباراة التعليم CRMEF المغرب 2026',
    desc: "منصة تفاعلية لاجتياز اختبارات تخصص الفلسفة لمباراة التعليم CRMEF 2026 بالمغرب: تاريخ الفلسفة، المجزوءات الأربع (الوضع البشري، المعرفة، السياسة، الأخلاق) والإبستيمولوجيا."
  },
  'article-criteres.html': {
    title: 'Critère de Réalisation vs Réussite EPS : Tableau par APSA',
    desc: "Quelle différence entre critère de réalisation (comment faire) et critère de réussite (résultat chiffré) en EPS ? Définition OP 2007/2009 et tableau d'exemples par APSA : Course en durée, Gym, Basket, Hand."
  },
  'article-course-duree-eps.html': {
    title: 'Cycle Course en Durée EPS Collège & Lycée : Fiche & Barème',
    desc: "Cycle complet de course en durée en EPS (Collège OP 2009 & Lycée OP 2007) : test Demi-Cooper VMA, situations d'apprentissage, fiche de séance et grille d'évaluation barémée sur 20."
  },
  'vma-differencier-course-duree-eps.html': {
    title: 'Course en Durée EPS & Demi-Cooper : Groupes VMA & Grille',
    desc: "Comment différencier en course de durée en EPS grâce au test Demi-Cooper (6 min) : constitution des groupes VMA, projets d'allure (90% à 110% VMA) et grille d'évaluation lycée et collège."
  },
  'article-test-demi-cooper-vma.html': {
    title: 'Test Demi-Cooper (6 min) en EPS : Formule VMA & Barème',
    desc: "Protocole complet du test Demi-Cooper 6 minutes en EPS : formule de calcul directe VMA = Distance / 100, placement des plots tous les 25m et barème d'évaluation collège et lycée au Maroc."
  },
  'courir-forte-chaleur-point-de-rosee-altitude.html': {
    title: 'Courir par Forte Chaleur & Altitude : Point de Rosée & VMA',
    desc: "Adaptez vos allures de course à la chaleur, à l'humidité (point de rosée Magnus-Tetens) et à l'altitude : perte de VO2max, hydratation et sécurité thermique en séance d'EPS."
  },
  'allure-ajustee-pente-gap-modele-minetti.html': {
    title: 'Allure Ajustée à la Pente (GAP) & Modèle de Minetti en Trail',
    desc: "Calculez votre Allure Ajustée à la Pente (GAP) avec l'équation biomécanique de Minetti et planifiez vos apports glucidiques horaires (30 à 90g/h) en course et trail."
  },
  'bibliotheque-numerique-eps.html': {
    title: 'Bibliothèque Numérique EPS Maroc : OP 2007/2009, Cycles & PDF',
    desc: "Téléchargez gratuitement les documents officiels EPS au Maroc : Orientations Pédagogiques 2007 (Lycée) et 2009 (Collège) PDF, projets de cycles, fiches de séance et annales CRMEF."
  },
  'qa-fiche-seance-eps.html': {
    title: 'Comment Préparer une Fiche de Séance EPS : Modèle OP Maroc',
    desc: "Méthode pas à pas pour rédiger une fiche de séance EPS conforme aux OP 2007/2009 au Maroc : objectif de séance, parties préparatoire/fondamentale/finale, critères de réalisation et de réussite."
  }
};

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function cleanTruncatedTitle(title) {
  let t = title.trim();
  // Remove trailing dangling prepositions/symbols
  t = t.replace(/\s+(&|·|\||du|de|des|et|la|le|les|aux|en|par|pour)$/i, '').trim();
  return t;
}

const pubDir = path.join(process.cwd(), 'public');
const htmlFiles = fs.readdirSync(pubDir).filter(f => f.endsWith('.html') && f !== 'google9e56188ccdfea7e9.html');

let updatedTitles = 0;
let updatedDescs = 0;

for (const file of htmlFiles) {
  const filePath = path.join(pubDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  const override = customMetaOverrides[file] || auditMap.get(file);

  // Extract current title and desc
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const currentTitle = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)
    || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  const currentDesc = descMatch ? descMatch[1].trim() : '';

  let targetTitle = currentTitle;
  if (customMetaOverrides[file]?.title) {
    targetTitle = customMetaOverrides[file].title;
  } else if (/(\s[&·|:-]|\s(de|du|des|et|la|le|les|aux|en|par|pour))$/i.test(currentTitle)) {
    targetTitle = cleanTruncatedTitle(override?.title || currentTitle);
  }

  let targetDesc = currentDesc;
  const isDescBroken = /(\s[dlqucnsj]\.\s+Conforme|\s[&·-]$|\.\s+Conforme aux Orientations Pédagogiques 2007\/2009 et aux cadres de référence CRMEF au\.?$|\.\s+Conforme aux Orientations Pédagogiques\.?$)/i.test(currentDesc)
    || currentDesc.length < 80
    || /\([a-z0-9\s]+\)\.?$/i.test(currentDesc);

  if (customMetaOverrides[file]?.desc) {
    targetDesc = customMetaOverrides[file].desc;
  } else if (isDescBroken && override?.desc) {
    targetDesc = override.desc;
  } else if (isDescBroken) {
    // Fallback: check JSON-LD description inside the page
    const ldMatch = html.match(/"description"\s*:\s*"([^"]{70,220})"/);
    if (ldMatch && !/Conforme aux Orientations Pédagogiques 2007\/2009 et aux cadres/.test(ldMatch[1])) {
      targetDesc = ldMatch[1];
    }
  }

  if (targetTitle && targetTitle !== currentTitle) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${targetTitle}</title>`);
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(targetTitle)}">`);
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(targetTitle)}">`);
    updatedTitles++;
    modified = true;
  }

  if (targetDesc && targetDesc !== currentDesc) {
    const safeDesc = escapeAttr(targetDesc);
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${safeDesc}">`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${safeDesc}">`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${safeDesc}">`);
    updatedDescs++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    // If file also exists in root directory, sync it
    const rootCopy = path.join(process.cwd(), file);
    if (fs.existsSync(rootCopy)) {
      fs.writeFileSync(rootCopy, html, 'utf8');
    }
  }
}

console.log(JSON.stringify({ updatedTitles, updatedDescs }, null, 2));
