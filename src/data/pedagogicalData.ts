export interface OpDocument {
  id: string;
  cycle: 'college' | 'lycee';
  year: string;
  title: string;
  officialRef: string;
  description: string;
  keyCompetencies: string[];
  modules: string[];
  downloadUrl: string;
  pageUrl: string;
  statusBadge: string;
  colorScheme: {
    primary: string;
    badgeBg: string;
    border: string;
  };
}

export interface LibraryResource {
  id: string;
  title: string;
  category: 'guides' | 'concours' | 'aps' | 'fiches';
  categoryLabel: string;
  format: 'PDF' | 'DOCX';
  fileFormat?: 'PDF' | 'DOCX';
  fileSize: string;
  year: string;
  author: string;
  description: string;
  downloadUrl: string;
  tags: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  topic: 'vma' | 'sciences' | 'pedagogie';
  category: string;
  badgeColor: 'red' | 'emerald' | 'blue' | 'amber';
  readTime: string;
  date: string;
  summary: string;
  url: string;
}

export const OP_DOCUMENTS: OpDocument[] = [
  {
    id: 'op-lycee-2007',
    cycle: 'lycee',
    year: '2007',
    title: 'Orientations Pédagogiques EPS - Enseignement Secondaire Qualifiant',
    officialRef: 'Direction des Curricula · Ministère de l’Éducation Nationale (MENPS)',
    description:
      'Texte fondateur régissant l\'EPS au lycée au Maroc : approche par compétences (APC), modules didactiques par tronc commun et filières du baccalauréat, fiches d\'évaluation certificative.',
    keyCompetencies: [
      'Gestion et régulation de l\'effort physique dans les activités athlétiques et de durée',
      'Efficience motrice et prise de décision tactique dans les sports collectifs',
      'Construction de projets d\'action individuelle et collective adaptés aux contraintes',
      'Auto-évaluation, co-arbitrage et engagement citoyen au sein de l\'association sportive',
    ],
    modules: [
      'Tronc Commun : Efficience motrice & Intégration collective',
      '1ère Année Bac : Maîtrise des conduites motrices & Gestion de l\'effort',
      '2ème Année Bac : Autonomie, régulation de la charge & Performance certificative',
    ],
    downloadUrl: '/documents/OP_EPS_Lycee_2007_Maroc.pdf',
    pageUrl: 'orientations-pedagogiques-eps-2007-2009.html#lycee',
    statusBadge: 'Texte Officiel MENPS 2007',
    colorScheme: {
      primary: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      border: 'border-blue-200 hover:border-blue-400',
    },
  },
  {
    id: 'op-college-2009',
    cycle: 'college',
    year: '2009',
    title: 'Orientations Pédagogiques EPS - Enseignement Secondaire Collégial',
    officialRef: 'Direction des Curricula · Ministère de l’Éducation Nationale (MENPS)',
    description:
      'Document officiel pour le cycle collégial articulant développement des capacités motrices de base, socialisation, apprentissage des rôles sociaux et acquisition des principes d\'action fondamentaux.',
    keyCompetencies: [
      'Acquisition de motricités polyvalentes et maîtrise spatio-temporelle',
      'Coopération loyale et respect des règles communes en situations d\'opposition',
      'Développement des ressources physiologiques par le demi-fond et la course de durée',
      'Respect mutuel, mixité et éducation à la santé dès la 1ère année collégiale',
    ],
    modules: [
      '1ère Année Collège : Coordination globale, découverte des rôles et règles de sécurité',
      '2ème Année Collège : Structuration des actions technico-tactiques et repérage de l\'effort',
      '3ème Année Collège : Choix stratégiques, régulation de l\'effort et validation du cycle 3',
    ],
    downloadUrl: '/documents/OP_EPS_College_2009_Maroc.pdf',
    pageUrl: 'orientations-pedagogiques-eps-2007-2009.html#college',
    statusBadge: 'Texte Officiel MENPS 2009',
    colorScheme: {
      primary: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      border: 'border-emerald-200 hover:border-emerald-400',
    },
  },
];

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: 'res-guide-vma',
    title: 'Protocole de Test VMA 6 Minutes & Barème Éducatif',
    category: 'fiches',
    categoryLabel: 'Fiches de Séance & Tests',
    format: 'PDF',
    fileSize: '420 Ko',
    year: '2026',
    author: 'Cellule Didactique ProfEPS',
    description:
      'Fiche protocolaire clé en main pour l\'évaluation de la VMA sur piste de 200m/400m avec cônes et calcul direct des allures d\'échauffement et d\'intermittent.',
    downloadUrl: '/documents/Protocole_Test_VMA_6min_ProfEPS.pdf',
    tags: ['VMA', 'Course de durée', 'Demi-fond', 'Barème'],
  },
  {
    id: 'res-crmef-annales',
    title: 'Annales Corrigées CRMEF EPS · Didactique & Sciences de l\'Éducation',
    category: 'concours',
    categoryLabel: 'Préparation Concours CRMEF',
    format: 'PDF',
    fileSize: '2.4 Mo',
    year: '2024-2025',
    author: 'Inspecteurs & Formateurs CRMEF',
    description:
      'Sujets et éléments de réponse détaillés pour les épreuves écrites et orales du concours de recrutement des enseignants d\'EPS (Centre Régional des Métiers de l\'Éducation et de la Formation).',
    downloadUrl: '/documents/Annales_CRMEF_EPS_Maroc.pdf',
    tags: ['CRMEF', 'Concours', 'Didactique', 'Oral'],
  },
  {
    id: 'res-guide-aps-basket',
    title: 'Guide Pédagogique Basketball en EPS · Cycles Collège & Lycée',
    category: 'aps',
    categoryLabel: 'Règlements & Didactique APS',
    format: 'PDF',
    fileSize: '1.8 Mo',
    year: '2025',
    author: 'Commission Pédagogique Sports Collectifs',
    description:
      'Situations d\'apprentissage par niveaux, fiches d\'observation pour arbitres-élèves et situations d\'évaluation certificative adaptées aux terrains scolaires.',
    downloadUrl: '/documents/Guide_Basketball_EPS_Maroc.pdf',
    tags: ['Basketball', 'Sports Collectifs', 'Fiche élève', 'Évaluation'],
  },
  {
    id: 'res-guide-securite',
    title: 'Référentiel National de Sécurité et Prévention des Risques en EPS',
    category: 'guides',
    categoryLabel: 'Guides Ministériels & Textes',
    format: 'PDF',
    fileSize: '950 Ko',
    year: '2024',
    author: 'MENPS Direction de la Vie Scolaire',
    description:
      'Consignes officielles pour les installations sportives, la gestion des conditions météo (chaleur, ramadan), la pharmacie d\'urgence et les responsabilités juridiques de l\'enseignant.',
    downloadUrl: '/documents/Guide_Securite_EPS_Maroc.pdf',
    tags: ['Sécurité', 'Réglementation', 'Météo', 'Responsabilité'],
  },
  {
    id: 'res-intermittent-fiches',
    title: 'Fiche Synthétique : Programmation Intermittent 15s-15s / 30s-30s',
    category: 'fiches',
    categoryLabel: 'Fiches de Séance & Tests',
    format: 'DOCX',
    fileSize: '310 Ko',
    year: '2026',
    author: 'Laboratoire Performance ProfEPS',
    description:
      'Tableau prêt à imprimer pour la gestion des plots de distance en course intermittente selon les pourcentages de VMA (105% à 120%) et navettes COD 180°.',
    downloadUrl: '/documents/Fiche_Programmation_HIIT_EPS.docx',
    tags: ['HIIT', 'Intermittent', 'COD', 'Cardio'],
  },
  {
    id: 'res-agreg-physio',
    title: 'Précis de Physiologie de l\'Exercice appliquée à l\'EPS Scolaire',
    category: 'concours',
    categoryLabel: 'Préparation Concours CRMEF',
    format: 'PDF',
    fileSize: '3.1 Mo',
    year: '2025',
    author: 'Professeur Agrégé EPS',
    description:
      'Synthèse approfondie : filières énergétiques, cinétique de VO2max, modèle ASR de Buchheit et régulation de la charge sRPE (Foster & ACWR).',
    downloadUrl: '/documents/Precis_Physiologie_EPS.pdf',
    tags: ['Physiologie', 'Agrégation', 'VO2Max', 'Foster'],
  },
  {
    id: 'res-gymnastique-sol',
    title: 'Fiches d\'Acquisition Éléments Gymniques au Sol & Acrosport',
    category: 'aps',
    categoryLabel: 'Règlements & Didactique APS',
    format: 'PDF',
    fileSize: '1.2 Mo',
    year: '2024',
    author: 'Équipe Didactique EPS Rabat',
    description:
      'Illustrations pas-à-pas des pyramides acrosport à 3, 4 et 5 élèves, critères de réalisation et barème de difficulté pour collèges et lycées.',
    downloadUrl: '/documents/Fiches_Gymnastique_Acrosport_EPS.pdf',
    tags: ['Gymnastique', 'Acrosport', 'Parades', 'Sécurité'],
  },
  {
    id: 'res-projet-pedagogique',
    title: 'Modèle Type de Projet Pédagogique d\'Établissement (2025-2026)',
    category: 'guides',
    categoryLabel: 'Guides Ministériels & Textes',
    format: 'DOCX',
    fileSize: '240 Ko',
    year: '2025',
    author: 'Inspection Pédagogique Régionale',
    description:
      'Trame éditable Word pour la rédaction du projet pédagogique EPS, répartition des cycles d\'APS par trimestre et programmation de l\'Association Sportive Scolaire (ASS).',
    downloadUrl: '/documents/Trame_Projet_Pedagogique_EPS.docx',
    tags: ['Projet Pédagogique', 'ASS', 'Coordination', 'Inspection'],
  },
];

export const FEATURED_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-vma-1',
    title: 'Différencier en Course de Durée grâce à la VMA en EPS',
    topic: 'vma',
    category: 'VMA & Demi-Fond',
    badgeColor: 'red',
    readTime: '8 min',
    date: 'Octobre 2026',
    summary: 'Méthodologie complète pour organiser des groupes de niveau VMA homogènes au collège et au lycée.',
    url: 'vma-differencier-course-duree-eps.html',
  },
  {
    id: 'art-sci-1',
    title: 'Méthode VDOT de Jack Daniels : Calcul des Allures',
    topic: 'sciences',
    category: 'Physiologie',
    badgeColor: 'blue',
    readTime: '10 min',
    date: 'Octobre 2026',
    summary: 'Comprendre l’indice VDOT combinant VO2max et économie de course pour individualiser les séances.',
    url: 'methode-vdot-jack-daniels-calcul-allures.html',
  },
  {
    id: 'art-ped-1',
    title: 'Différences entre les OP 2007 (Lycée) et OP 2009 (Collège)',
    topic: 'pedagogie',
    category: 'Textes Officiels',
    badgeColor: 'emerald',
    readTime: '7 min',
    date: 'Octobre 2026',
    summary: 'Analyse comparative des Orientations Pédagogiques ministérielles pour le concours CRMEF EPS.',
    url: 'article-difference-op-2007-2009-eps.html',
  },
  {
    id: 'art-sci-2',
    title: 'Charge d’Entraînement sRPE de Foster, Monotonie & ACWR',
    topic: 'sciences',
    category: 'Charge & Prévention',
    badgeColor: 'amber',
    readTime: '9 min',
    date: 'Octobre 2026',
    summary: 'Quantifier la charge interne en EPS et prévenir le surentraînement avec le ratio aigu/chronique.',
    url: 'charge-entrainement-rpe-foster-monotonie-acwr.html',
  },
];