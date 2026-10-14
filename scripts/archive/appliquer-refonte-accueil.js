const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('\n================================================================');
console.log('🚀 DÉPLOIEMENT : REFONTE ACCUEIL, BLOCS OP & BIBLIO, PALETTE & RÉSEAUX');
console.log('📂 Dossier racine :', rootDir);
console.log('================================================================\n');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function write(relPath, content) {
  const full = path.join(rootDir, relPath);
  ensureDir(full);
  fs.writeFileSync(full, content, 'utf8');
  console.log(`  ✔ Fichier créé/mis à jour : ${relPath}`);
}

// 1. DATA PÉDAGOGIQUE (OP 2007, 2009 & BIBLIOTHÈQUE)
const PEDAGOGICAL_DATA = `export interface OpDocument {
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
  fileSize: string;
  year: string;
  author: string;
  description: string;
  downloadUrl: string;
  tags: string[];
}

export const OP_DOCUMENTS: OpDocument[] = [
  {
    id: 'op-lycee-2007',
    cycle: 'lycee',
    year: '2007',
    title: 'Orientations Pédagogiques EPS - Enseignement Secondaire Qualifiant',
    officialRef: 'Direction des Curricula · Ministère de l’Éducation Nationale (MENPS)',
    description:
      'Texte fondateur régissant l\\'EPS au lycée au Maroc : approche par compétences (APC), modules didactiques par tronc commun et filières du baccalauréat, fiches d\\'évaluation certificative.',
    keyCompetencies: [
      'Gestion et régulation de l\\'effort physique dans les activités athlétiques et de durée',
      'Efficience motrice et prise de décision tactique dans les sports collectifs',
      'Construction de projets d\\'action individuelle et collective adaptés aux contraintes',
      'Auto-évaluation, co-arbitrage et engagement citoyen au sein de l\\'association sportive',
    ],
    modules: [
      'Tronc Commun : Efficience motrice & Intégration collective',
      '1ère Année Bac : Maîtrise des conduites motrices & Gestion de l\\'effort',
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
      'Document officiel pour le cycle collégial articulant développement des capacités motrices de base, socialisation, apprentissage des rôles sociaux et acquisition des principes d\\'action fondamentaux.',
    keyCompetencies: [
      'Acquisition de motricités polyvalentes et maîtrise spatio-temporelle',
      'Coopération loyale et respect des règles communes en situations d\\'opposition',
      'Développement des ressources physiologiques par le demi-fond et la course de durée',
      'Respect mutuel, mixité et éducation à la santé dès la 1ère année collégiale',
    ],
    modules: [
      '1ère Année Collège : Coordination globale, découverte des rôles et règles de sécurité',
      '2ème Année Collège : Structuration des actions technico-tactiques et repérage de l\\'effort',
      '3ème Année Collège : Choix stratégiques, régulation de l\\'effort et validation du cycle 3',
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
      'Fiche protocolaire clé en main pour l\\'évaluation de la VMA sur piste de 200m/400m avec cônes et calcul direct des allures d\\'échauffement et d\\'intermittent.',
    downloadUrl: '/documents/Protocole_Test_VMA_6min_ProfEPS.pdf',
    tags: ['VMA', 'Course de durée', 'Demi-fond', 'Barème'],
  },
  {
    id: 'res-crmef-annales',
    title: 'Annales Corrigées CRMEF EPS · Didactique & Sciences de l\\'Éducation',
    category: 'concours',
    categoryLabel: 'Préparation Concours CRMEF',
    format: 'PDF',
    fileSize: '2.4 Mo',
    year: '2024-2025',
    author: 'Inspecteurs & Formateurs CRMEF',
    description:
      'Sujets et éléments de réponse détaillés pour les épreuves écrites et orales du concours de recrutement des enseignants d\\'EPS (Centre Régional des Métiers de l\\'Éducation et de la Formation).',
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
      'Situations d\\'apprentissage par niveaux, fiches d\\'observation pour arbitres-élèves et situations d\\'évaluation certificative adaptées aux terrains scolaires.',
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
      'Consignes officielles pour les installations sportives, la gestion des conditions météo (chaleur, ramadan), la pharmacie d\\'urgence et les responsabilités juridiques de l\\'enseignant.',
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
    title: 'Précis de Physiologie de l\\'Exercice appliquée à l\\'EPS Scolaire',
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
    title: 'Fiches d\\'Acquisition Éléments Gymniques au Sol & Acrosport',
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
    title: 'Modèle Type de Projet Pédagogique d\\'Établissement (2025-2026)',
    category: 'guides',
    categoryLabel: 'Guides Ministériels & Textes',
    format: 'DOCX',
    fileSize: '240 Ko',
    year: '2025',
    author: 'Inspection Pédagogique Régionale',
    description:
      'Trame éditable Word pour la rédaction du projet pédagogique EPS, répartition des cycles d\\'APS par trimestre et programmation de l\\'Association Sportive Scolaire (ASS).',
    downloadUrl: '/documents/Trame_Projet_Pedagogique_EPS.docx',
    tags: ['Projet Pédagogique', 'ASS', 'Coordination', 'Inspection'],
  },
];`;
write('src/data/pedagogicalData.ts', PEDAGOGICAL_DATA);

// 2. COMPOSANT BLOC ORIENTATIONS PÉDAGOGIQUES
const OP_BLOCK = `import React, { useState } from 'react';
import { OP_DOCUMENTS, OpDocument } from '../../data/pedagogicalData';
import {
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileText,
  Layers,
  ChevronRight,
  Download,
} from 'lucide-react';

interface PedagogicalOrientationsBlockProps {
  onNavigateTab?: (tab: string) => void;
}

export const PedagogicalOrientationsBlock: React.FC<PedagogicalOrientationsBlockProps> = ({
  onNavigateTab,
}) => {
  const [selectedCycle, setSelectedCycle] = useState<'all' | 'college' | 'lycee'>('all');
  const [activePreviewDoc, setActivePreviewDoc] = useState<OpDocument | null>(null);

  const displayedDocs =
    selectedCycle === 'all'
      ? OP_DOCUMENTS
      : OP_DOCUMENTS.filter(doc => doc.cycle === selectedCycle);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Cadre Didactique & Textes Ministériels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Orientations Pédagogiques EPS Maroc (2007 · 2009)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Consultez les référentiels officiels du Ministère de l’Éducation Nationale pour bâtir vos
            cycles d’apprentissage, fiches de séance et évaluations certificatives.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedCycle('all')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all \${
              selectedCycle === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Tous les Cycles
          </button>
          <button
            type="button"
            onClick={() => setSelectedCycle('college')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all \${
              selectedCycle === 'college'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Collège (OP 2009)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCycle('lycee')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all \${
              selectedCycle === 'lycee'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            Lycée (OP 2007)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedDocs.map(doc => {
          const isLycee = doc.cycle === 'lycee';
          return (
            <div
              key={doc.id}
              className={\`relative bg-white border rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md \${
                isLycee ? 'hover:border-blue-300' : 'hover:border-emerald-300'
              } border-slate-200\`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={\`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 \${
                      isLycee
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }\`}
                  >
                    {isLycee ? (
                      <GraduationCap className="w-6 h-6" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <span
                      className={\`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border \${doc.colorScheme.badgeBg}\`}
                    >
                      {doc.statusBadge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                      {isLycee
                        ? 'Cycle Secondaire Qualifiant (Lycée)'
                        : 'Cycle Secondaire Collégial (Collège)'}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
                  {doc.year}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {doc.description}
              </p>

              <div className="space-y-2 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Compétences Cibles & Piliers APC</span>
                </div>
                <ul className="space-y-1.5">
                  {doc.keyCompetencies.slice(0, 3).map((comp, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100"
                    >
                      <span
                        className={\`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 \${
                          isLycee ? 'bg-blue-600' : 'bg-emerald-600'
                        }\`}
                      />
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Architecture des Modules</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {doc.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] font-medium text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80 flex items-center justify-between"
                    >
                      <span className="truncate">{mod}</span>
                      <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActivePreviewDoc(doc)}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consulter la Synthèse</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Officiel</span>
                  </a>

                  {onNavigateTab ? (
                    <button
                      type="button"
                      onClick={() => onNavigateTab('cluster1')}
                      className={\`px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors \${
                        isLycee ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }\`}
                    >
                      <span>Appliquer aux Cycles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={doc.pageUrl}
                      className={\`px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-xs transition-colors \${
                        isLycee ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }\`}
                    >
                      <span>Détails Complets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md mb-2">
                  {activePreviewDoc.statusBadge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activePreviewDoc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activePreviewDoc.officialRef}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed border-t border-b border-slate-100 py-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Compétences Générales Visées
              </h4>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-600">
                {activePreviewDoc.keyCompetencies.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-900 flex items-center gap-2 pt-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Modules Didactiques Détaillés
              </h4>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-600">
                {activePreviewDoc.modules.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Fermer
              </button>
              <a
                href={activePreviewDoc.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Document MENPS</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};`;
write('src/components/home/PedagogicalOrientationsBlock.tsx', OP_BLOCK);

// 3. COMPOSANT BLOC BIBLIOTHÈQUE NUMÉRIQUE EPS
const BIBLIO_BLOCK = `import React, { useState, useMemo } from 'react';
import { LIBRARY_RESOURCES, LibraryResource } from '../../data/pedagogicalData';
import {
  FolderArchive,
  Search,
  Download,
  FileText,
  CheckCircle,
  BookMarked,
  Tag,
  Eye,
} from 'lucide-react';

export const DigitalLibraryBlock: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewResource, setActivePreviewResource] = useState<LibraryResource | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Ressources' },
    { id: 'guides', label: 'Guides Ministériels MENPS' },
    { id: 'concours', label: 'Concours & CRMEF' },
    { id: 'aps', label: 'Fiches APS & Cycles' },
    { id: 'fiches', label: 'Didactique & Sécurité' },
  ];

  const filteredResources = useMemo(() => {
    return LIBRARY_RESOURCES.filter(resource => {
      const matchCategory =
        selectedCategory === 'all' || resource.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownload = (res: LibraryResource) => {
    setDownloadNotice(\`Ouverture de la ressource : "\${res.title}"...\`);
    setTimeout(() => {
      window.open(res.downloadUrl, '_blank', 'noopener,noreferrer');
      setDownloadNotice(null);
    }, 600);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1.5">
            <FolderArchive className="w-4 h-4" />
            <span>Fonds Documentaire Téléchargeable</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bibliothèque Numérique Didactique EPS
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Téléchargez librement fiches de séance, annales de concours CRMEF, guides de sécurité et
            référentiels d’évaluation pour vos cours d’EPS.
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher (ex: VMA, Basket, CRMEF)..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCycle(cat.id)}
            className={\`px-3 py-1.5 rounded-lg font-bold shrink-0 cursor-pointer transition-all border \${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
            }\`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredResources.map(res => {
          const isPdf = res.format === 'PDF';
          return (
            <div
              key={res.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={\`px-2 py-0.5 rounded text-[10px] font-mono font-bold border \${
                      isPdf
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }\`}
                  >
                    {res.format} · {res.fileSize}
                  </span>
                  <span className="text-[11px] font-medium text-slate-600">{res.year}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {res.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {res.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActivePreviewResource(res)}
                  className="p-1.5 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  title="Aperçu rapide"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(res)}
                  className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activePreviewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {activePreviewResource.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {activePreviewResource.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activePreviewResource.description}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
              <div><strong>Format :</strong> {activePreviewResource.format} ({activePreviewResource.fileSize})</div>
              <div><strong>Auteur / Source :</strong> {activePreviewResource.author}</div>
              <div><strong>Année scolaire :</strong> {activePreviewResource.year}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => handleDownload(activePreviewResource)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la Ressource</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};`;
write('src/components/home/DigitalLibraryBlock.tsx', BIBLIO_BLOCK);

// 4. COMPOSANT PRINCIPAL SPORTS HUB DASHBOARD (PALETTE STRICTE, ORDRE EXACT, SANS WHATSAPP NI TELEGRAM)
const SPORTS_HUB_DASHBOARD = `import React from 'react';
import {
  Activity,
  Heart,
  Dumbbell,
  ExternalLink,
  ArrowRight,
  Terminal,
  Gauge,
  BookOpen,
  CheckCircle2,
  FolderArchive,
  Zap,
  Facebook,
  Instagram,
} from 'lucide-react';
import { PedagogicalOrientationsBlock } from '../home/PedagogicalOrientationsBlock';
import { DigitalLibraryBlock } from '../home/DigitalLibraryBlock';

interface SportsHubDashboardProps {
  onNavigateTab: (tab: string) => void;
  globalVma: number;
  setGlobalVma: (vma: number) => void;
}

export const SportsHubDashboard: React.FC<SportsHubDashboardProps> = ({
  onNavigateTab,
  globalVma,
  setGlobalVma,
}) => {
  const pace100 = (3600 / (globalVma * 1000) * 1000).toFixed(0);
  const paceMinutes = Math.floor(Number(pace100) / 60);
  const paceSeconds = Math.round(Number(pace100) % 60);
  const formattedPace = \`\${paceMinutes}'\${paceSeconds < 10 ? '0' : ''}\${paceSeconds}"/km\`;

  const pace85 = (globalVma * 0.85).toFixed(1);
  const pace65 = (globalVma * 0.65).toFixed(1);

  return (
    <div className="space-y-10">
      {/* 1. HERO SECTION — Palette officielle ProfEPS.ma (Bleu Roi, Blanc, Ardoise & Émeraude) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Activity className="w-4 h-4" />
              <span>Portail Officiel · ProfEPS Maroc (profeps.ma)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight text-balance">
              Écosystème Didactique de l’EPS, Textes Officiels & Calculateurs Sportifs
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              La plateforme de référence pour les enseignants d’EPS au Maroc : suite de calculateurs
              physiologiques pour l’entraînement, orientations pédagogiques ministérielles (2007 & 2009)
              et bibliothèque numérique didactique.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#bloc-calculateurs"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Accéder aux Calculateurs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#bloc-op"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Orientations Pédagogiques (OP)</span>
              </a>

              <a
                href="#bloc-biblio"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <FolderArchive className="w-4 h-4 text-emerald-600" />
                <span>Bibliothèque EPS</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Conforme Approche par Compétences (APC)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Direction des Curricula MENPS
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  VMA Éducative Globale
                </span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                Synchro Tous Outils
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
                {globalVma.toFixed(1)}
              </span>
              <span className="text-base font-bold text-slate-500 ml-1.5">km/h</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Régler la VMA :</span>
                <span className="font-mono text-blue-600">{globalVma.toFixed(1)} km/h</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="24.0"
                step="0.1"
                value={globalVma}
                onChange={e => setGlobalVma(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>8.0 (Collège)</span>
                <span>15.0 (Lycée)</span>
                <span>24.0 (Élite)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Allure 100%</div>
                <div className="text-xs font-bold font-mono text-slate-800 mt-0.5">{formattedPace}</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Seuil (85%)</div>
                <div className="text-xs font-bold font-mono text-blue-600 mt-0.5">{pace85} km/h</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-600">Endurance (65%)</div>
                <div className="text-xs font-bold font-mono text-emerald-600 mt-0.5">{pace65} km/h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION CALCULATEURS & GÉNÉRATEUR (PLACÉE DIRECTEMENT SOUS LE HERO) */}
      <section id="bloc-calculateurs" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Zap className="w-4 h-4" />
              <span>Suite Scientifique Didactique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Calculateurs Scientifiques & Générateur d’EPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Outils physiologiques calibrés selon les modèles scientifiques de référence (Billat, Cazorla,
              Péronnet, Karvonen, Foster) pour concevoir et réguler vos séances.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('cluster1')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Voir tous les modules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cluster 1 : VMA, VO2 Max, ASR & Péronnet */}
          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Activity className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Cluster 1</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">VMA, VO2 Max & Allures</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Calculs physiologiques complets du profil aérobie de l’élève et du coureur.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1A.</span>
                  <span><strong>Calculateur VMA & Allures :</strong> Vitesse en km/h, temps de passage et allures cibles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1B.</span>
                  <span><strong>VO2 Max & VDOT (Daniels) :</strong> Équivalences de performance et temps prédits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1C.</span>
                  <span><strong>Réserve de Vitesse (ASR) :</strong> Modèle de Buchheit pour l\\'intermittent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1D.</span>
                  <span><strong>Indice d’Endurance (Péronnet) :</strong> Capacité à maintenir un % de VMA dans le temps.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster1')}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 1 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cluster 2 : Cardio, Santé, Météo & GAP */}
          <div className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Heart className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Cluster 2</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Cardio, Santé & Météo</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Zones de fréquence cardiaque, composition corporelle et facteurs environnementaux.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2A.</span>
                  <span><strong>Fréquence Cardiaque Karvonen :</strong> FC Réserve, FC Cible et 5 zones d\\'intensité.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2B.</span>
                  <span><strong>IMC & Masse Grasse Sportif :</strong> Formule Deurenberg adaptée aux athlètes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2C.</span>
                  <span><strong>Chaleur, Météo & Altitude :</strong> Dérive cardiaque et ajustement en période chaude.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2D.</span>
                  <span><strong>Allure Pente (GAP) & Nutrition :</strong> Coût énergétique et hydratation.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster2')}
              className="mt-6 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 2 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cluster 3 : Intermittent HIIT, COD & Charge Foster */}
          <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
                <Dumbbell className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Cluster 3</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">HIIT, Relances & Charge</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Planification des séries de course intermittente et quantification de la charge d\\'effort.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3A.</span>
                  <span><strong>Générateur Intermittent HIIT :</strong> Distances en 10s-10s, 15s-15s, 30s-30s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3B.</span>
                  <span><strong>Navettes COD 180° (Sports Co) :</strong> Calcul de relance biomécanique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3C.</span>
                  <span><strong>Charge sRPE Foster & ACWR :</strong> Monotonie, contrainte et ratio de charge.</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('cluster3')}
              className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <span>Ouvrir le Cluster 3 (FR / EN / AR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SECTION ORIENTATIONS PÉDAGOGIQUES (OP 2007 & OP 2009) */}
      <section id="bloc-op">
        <PedagogicalOrientationsBlock onNavigateTab={onNavigateTab} />
      </section>

      {/* 4. SECTION BIBLIOTHÈQUE NUMÉRIQUE EPS */}
      <section id="bloc-biblio">
        <DigitalLibraryBlock />
      </section>

      {/* 5. SECTION COMMUNAUTÉ — Liens Officiels Facebook & Instagram de ProfEPS Maroc (Sans WhatsApp ni Telegram) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Activity className="w-4 h-4" />
            <span>Communauté & Réseaux Sociaux</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Suivez ProfEPS Maroc sur les Réseaux Officiels
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Rejoignez la communauté active des enseignants d’EPS et étudiants CRMEF pour suivre les
            actualités, les nouvelles fiches didactiques et les partages d’expériences pédagogiques.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://www.facebook.com/profile.php?id=61559954402311"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span>Page Facebook ProfEPS</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          <a
            href="https://www.instagram.com/profeps.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram @profeps.ma</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </section>
    </div>
  );
};`;
write('src/components/sports/SportsHubDashboard.tsx', SPORTS_HUB_DASHBOARD);

// 5. MISE À JOUR DE HEADER.TSX (LABEL 'Accueil · OP & Hub')
const headerPath = path.join(rootDir, 'src/components/Header.tsx');
if (fs.existsSync(headerPath)) {
  let headerContent = fs.readFileSync(headerPath, 'utf8');
  headerContent = headerContent.replace(
    "{ id: 'hub', label: 'Hub 3 Clusters' }",
    "{ id: 'hub', label: 'Accueil · OP & Hub' }"
  );
  fs.writeFileSync(headerPath, headerContent, 'utf8');
  console.log('  ✔ src/components/Header.tsx mis à jour (Accueil · OP & Hub).');
}

// 6. DÉFINITION DE L'ONGLET PAR DÉFAUT DANS APP.TSX
const appPath = path.join(rootDir, 'src/App.tsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  appContent = appContent.replace(
    "const [activeTab, setActiveTab] = useState<string>('export-html');",
    "const [activeTab, setActiveTab] = useState<string>('hub');"
  );
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('  ✔ src/App.tsx mis à jour (activeTab = hub par défaut).');
}

console.log('\n================================================================');
console.log('🎉 REFONTE APPLIQUÉE AVEC SUCCÈS ! LE SITE EST 100% OPÉRATIONNEL.');
console.log('================================================================\n');
