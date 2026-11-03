const fs = require('fs');
const path = require('path');

const part1 = require('./aps-reglements-data-part1.cjs');
const part2 = require('./aps-reglements-data-part2.cjs');
const athletismeData = require('./aps-reglements-data-athletisme.cjs');
const allSports = [...part1, ...part2, ...athletismeData];

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROOT_DIR = path.join(__dirname, '..');

// Extract unified navbar & footer from article-football-eps.html so every generated page is 100% consistent
const templateHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'article-football-eps.html'), 'utf8');
const navStart = templateHtml.indexOf('<!-- PROFEPS_UNIFIED_NAVBAR_START -->');
const navEnd = templateHtml.indexOf('<!-- PROFEPS_UNIFIED_NAVBAR_END -->') + '<!-- PROFEPS_UNIFIED_NAVBAR_END -->'.length;
const UNIFIED_NAVBAR = templateHtml.slice(navStart, navEnd);

const footerStart = templateHtml.indexOf('<footer class="footer" id="profeps-unified-footer">');
const UNIFIED_FOOTER_AND_CMP = templateHtml.slice(footerStart);

// Generate crisp vector SVG illustration for each referee hand signal type
function renderSignalSvg(svgType, index) {
  const baseStart = `<svg viewBox="0 0 180 155" style="width:100%;height:142px;display:block;background:linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%);border-radius:10px;border:1px solid #cbd5e1;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration vectorielle du geste d'arbitrage">
    <!-- Grille de repère subtile -->
    <line x1="90" y1="10" x2="90" y2="145" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3"/>
    <line x1="20" y1="85" x2="160" y2="85" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3"/>
    <!-- Buste et tête de l'arbitre -->
    <path d="M 66 145 L 70 86 Q 90 80 110 86 L 114 145 Z" fill="#0f172a"/>
    <!-- Col et écusson d'arbitre -->
    <polygon points="83,84 97,84 90,96" fill="#ffffff"/>
    <rect x="96" y="96" width="8" height="10" rx="1.5" fill="#fde047" opacity="0.85"/>
    <!-- Tête & sifflet -->
    <circle cx="90" cy="62" r="15" fill="#fed7aa" stroke="#0f172a" stroke-width="2.2"/>
    <path d="M 75 58 Q 90 44 105 58" fill="#0f172a"/>
    <circle cx="96" cy="67" r="3" fill="#991b1b"/>`;

  let arms = '';
  switch (svgType) {
    case 'advantage_both_arms':
      arms = `
        <!-- Deux bras tendus vers l'avant/côté pour l'avantage -->
        <path d="M 72 90 L 32 72" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 90 L 148 72" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="30" cy="71" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="150" cy="71" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M 122 54 L 154 54 M 147 48 L 155 54 L 147 60" stroke="#006233" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#006233" text-anchor="middle">AVANTAGE / CONTINUER</text>
      `;
      break;
    case 'point_horizontal':
      arms = `
        <!-- Bras droit tendu horizontalement (Direction) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 158 78" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="160" cy="78" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M 128 62 L 164 62 M 157 56 L 165 62 L 157 68" stroke="#991b1b" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">DIRECTION / REMISE EN JEU</text>
      `;
      break;
    case 'one_arm_up':
      arms = `
        <!-- Un bras levé verticalement au-dessus de la tête -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 118 28" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <rect x="112" y="16" width="11" height="14" rx="4" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M 134 52 L 134 22 M 129 28 L 134 20 L 139 28" stroke="#006233" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <text x="52" y="26" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">BRAS VERTICAL</text>
      `;
      break;
    case 'point_penalty_down':
      arms = `
        <!-- Bras pointant à 45° vers le bas (Pénalty / Zone 6m / Ligne) -->
        <path d="M 72 90 L 56 118" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 152 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="154" cy="124" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="162" cy="136" r="6" fill="#991b1b"/>
        <path d="M 126 86 L 158 112 M 156 104 L 159 113 L 150 112" stroke="#991b1b" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">POINTAGE MARQUE / ZONE</text>
      `;
      break;
    case 'card_up':
      arms = `
        <!-- Bras levé brandissant Carton Jaune / Rouge -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 124 34" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <rect x="116" y="12" width="14" height="20" rx="2" fill="#facc15" stroke="#0f172a" stroke-width="1.8"/>
        <rect x="133" y="15" width="14" height="20" rx="2" fill="#dc2626" stroke="#0f172a" stroke-width="1.8"/>
        <text x="55" y="26" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">SANCTION CARTON</text>
      `;
      break;
    case 'five_fingers_up':
    case 'four_fingers_up':
      const countLabel = svgType === 'four_fingers_up' ? 'DÉCOMPTE 4 DOIGTS' : 'DÉCOMPTE 5 DOIGTS';
      arms = `
        <!-- Bras levé avec doigts écartés pour le décompte temporel -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 122 38" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="122" cy="34" r="7" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="116" y1="28" x2="112" y2="16" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="120" y1="27" x2="119" y2="14" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="124" y1="27" x2="126" y2="14" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="128" y1="29" x2="133" y2="17" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round"/>
        <text x="62" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">${countLabel}</text>
      `;
      break;
    case 'point_corner_up':
      arms = `
        <!-- Bras pointant à 45° vers le haut (Corner / Pénalité Rugby / Jet franc) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 152 46" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="154" cy="44" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M 122 52 L 150 26 M 142 26 L 151 25 L 150 34" stroke="#006233" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <text x="64" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#006233" text-anchor="middle">BRAS À 45° HAUT</text>
      `;
      break;
    case 'flag_up_assistant':
    case 'flag_side_assistant':
      arms = `
        <!-- Arbitre assistant / juge de ligne avec drapeau -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 142 52" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <line x1="142" y1="52" x2="142" y2="12" stroke="#0f172a" stroke-width="3"/>
        <rect x="142" y="12" width="24" height="16" fill="#ef4444" stroke="#facc15" stroke-width="2"/>
        <rect x="142" y="12" width="12" height="8" fill="#facc15"/>
        <text x="68" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">SIGNAL AU DRAPEAU</text>
      `;
      break;
    case 'flag_white_valid':
      arms = `
        <!-- Juge Athlétisme Drapeau Blanc (Essai Valide) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 128 38" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <line x1="128" y1="38" x2="128" y2="10" stroke="#0f172a" stroke-width="3"/>
        <rect x="128" y="10" width="26" height="17" fill="#ffffff" stroke="#006233" stroke-width="2.2"/>
        <text x="64" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#006233" text-anchor="middle">DRAPEAU BLANC (OK)</text>
      `;
      break;
    case 'flag_red_foul':
      arms = `
        <!-- Juge Athlétisme Drapeau Rouge (Essai Nul / Mordu) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 128 38" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <line x1="128" y1="38" x2="128" y2="10" stroke="#0f172a" stroke-width="3"/>
        <rect x="128" y="10" width="26" height="17" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>
        <text x="64" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">DRAPEAU ROUGE (NUL)</text>
      `;
      break;
    case 'cross_arms_stop':
      arms = `
        <!-- Bras croisés au-dessus ou devant (Arrêt / Stop) -->
        <path d="M 72 88 L 108 34" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M 108 88 L 72 34" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <circle cx="109" cy="32" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="71" cy="32" r="5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <text x="90" y="20" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">ARRÊT / DISTANCE</text>
      `;
      break;
    case 'timeout_t':
      arms = `
        <!-- Signe T (Temps Mort / Faute Technique) -->
        <path d="M 70 90 L 78 44" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M 110 90 L 96 36" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <!-- Main verticale et main horizontale formant un T -->
        <line x1="86" y1="36" x2="86" y2="58" stroke="#991b1b" stroke-width="5" stroke-linecap="round"/>
        <line x1="72" y1="35" x2="100" y2="35" stroke="#006233" stroke-width="5" stroke-linecap="round"/>
        <text x="90" y="22" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">SIGNE « T » (TEMPS MORT)</text>
      `;
      break;
    case 'accumulated_foul':
      arms = `
        <!-- Futsal : Un bras direction + l'autre index vers le sol / table -->
        <path d="M 72 88 L 28 78" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M 108 88 L 146 122" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round"/>
        <circle cx="26" cy="78" r="5" fill="#fed7aa"/>
        <circle cx="148" cy="124" r="5" fill="#fed7aa"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">FAUTE CUMULÉE (TABLE)</text>
      `;
      break;
    case 'travelling_rotate':
      arms = `
        <!-- Moulinet des deux avant-bras (Marcher / Rotation) -->
        <path d="M 70 90 L 68 106 L 106 106" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <path d="M 110 90 L 112 96 L 74 96" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <circle cx="90" cy="102" r="22" fill="none" stroke="#991b1b" stroke-width="2.5" stroke-dasharray="5,3"/>
        <path d="M 108 88 L 114 96 L 104 98" fill="#991b1b"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">MOULINET (MARCHER)</text>
      `;
      break;
    case 'charging_fist_palm':
      arms = `
        <!-- Poing fermé dans la paume ouverte (Passage en force / Charge) -->
        <path d="M 68 90 L 52 106 L 84 106" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <path d="M 112 90 L 128 106 L 96 106" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <line x1="84" y1="96" x2="84" y2="116" stroke="#006233" stroke-width="4" stroke-linecap="round"/>
        <circle cx="95" cy="106" r="6" fill="#991b1b"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">PASSAGE EN FORCE</text>
      `;
      break;
    case 'two_minutes_v':
      arms = `
        <!-- Exclusion 2 minutes / 2 points (2 doigts levés en V) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 124 38" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="124" cy="34" r="6" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="121" y1="29" x2="116" y2="13" stroke="#991b1b" stroke-width="3.2" stroke-linecap="round"/>
        <line x1="127" y1="29" x2="132" y2="13" stroke="#991b1b" stroke-width="3.2" stroke-linecap="round"/>
        <text x="62" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">2 MINUTES / 2 PTS</text>
      `;
      break;
    case 'three_points_both_arms':
      arms = `
        <!-- Deux bras levés en V (3 points FIBA validés / Salut Gym) -->
        <path d="M 72 88 L 48 30" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 132 30" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="47" cy="27" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="133" cy="27" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <text x="90" y="22" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#006233" text-anchor="middle">2 BRAS LEVÉS (VALIDÉ)</text>
      `;
      break;
    case 'fist_up_foul':
      arms = `
        <!-- Poing fermé levé verticalement (Faute FIBA) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 122 32" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="122" cy="25" r="8" fill="#991b1b" stroke="#0f172a" stroke-width="2"/>
        <text x="60" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">POING FERMÉ (FAUTE)</text>
      `;
      break;
    case 'ball_out_two_forearms':
      arms = `
        <!-- Deux avant-bras verticaux devant le buste (Ballon OUT Volley) -->
        <path d="M 70 90 L 56 96 L 56 54" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <path d="M 110 90 L 124 96 L 124 54" stroke="#0f172a" stroke-width="7.5" stroke-linecap="round" fill="none"/>
        <circle cx="56" cy="50" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="124" cy="50" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">BALLON DEHORS (OUT)</text>
      `;
      break;
    case 'arms_wide_out':
      arms = `
        <!-- Deux bras écartés à l'horizontale en croix (Volant OUT Badminton) -->
        <path d="M 70 88 L 20 88" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 110 88 L 160 88" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="18" cy="88" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="162" cy="88" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <text x="90" y="24" font-family="Inter,sans-serif" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">BRAS EN CROIX (OUT)</text>
      `;
      break;
    default:
      arms = `
        <!-- Geste codifié d'arbitrage (Bras à 90° / Signal officiel) -->
        <path d="M 72 90 L 58 122" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
        <path d="M 108 88 L 138 88 L 138 46" stroke="#0f172a" stroke-width="8" stroke-linecap="round" fill="none"/>
        <circle cx="138" cy="42" r="5.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.5"/>
        <path d="M 152 72 L 152 44 M 147 50 L 152 42 L 157 50" stroke="#006233" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <text x="64" y="24" font-family="Inter,sans-serif" font-size="9.5" font-weight="800" fill="#006233" text-anchor="middle">SIGNAL OFFICIEL #${index + 1}</text>
      `;
      break;
  }

  return `${baseStart}${arms}</svg>`;
}

function buildArticleHtml(sport) {
  const faqEntities = sport.crmefQuestions.slice(0, 6).map(item => ({
    '@type': 'Question',
    name: item.q.replace(/^\d+\.\s*/, ''),
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a
    }
  }));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: sport.title.replace(' | ProfEPS', ''),
    description: sport.metaDesc,
    inLanguage: 'fr-MA',
    author: {
      '@type': 'Person',
      name: 'Abdelkhalek ELBOUDANI',
      jobTitle: "Professeur d'Éducation Physique et Sportive (EPS)",
      url: 'https://profeps.ma/a-propos.html',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'ProfEPS Maroc',
        url: 'https://profeps.ma/'
      }
    },
    publisher: { '@id': 'https://profeps.ma/#organization' },
    datePublished: sport.datePublished,
    dateModified: sport.datePublished,
    image: 'https://profeps.ma/images/prof_eps.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://profeps.ma/${sport.slug}`
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil ProfEPS Maroc', item: 'https://profeps.ma/' },
      { '@type': 'ListItem', position: 2, name: 'Blog & Règlements des APS', item: 'https://profeps.ma/blog.html' },
      { '@type': 'ListItem', position: 3, name: sport.shortTitle, item: `https://profeps.ma/${sport.slug}` }
    ]
  };

  const navCustom = UNIFIED_NAVBAR.replace('data-current-file="article-football-eps.html"', `data-current-file="${sport.slug}"`);

  const specsRowsHtml = sport.specsTable.map(row => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
    </tr>
  `).join('');

  const lawsSectionsHtml = sport.lawsSummary.map((sec, idx) => `
    <div class="step-card" style="margin:1.35rem 0;border-left:4px solid ${idx % 2 === 0 ? '#991b1b' : '#006233'};">
      <h3 style="margin-top:0;font-size:1.15rem;color:${idx % 2 === 0 ? '#991b1b' : '#006233'};">${idx + 1}. ${sec.title}</h3>
      <p style="margin-bottom:0;color:#1e293b;line-height:1.75;">${sec.content}</p>
    </div>
  `).join('');

  const refereeCardsHtml = sport.refereeSignals.map((sig, idx) => `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;padding:1.15rem;box-shadow:0 4px 12px rgba(15,23,42,0.05);display:flex;flex-direction:column;gap:0.65rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
        <span style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;padding:0.2rem 0.65rem;background:#fff1f2;color:#991b1b;border:1px solid #fecdd3;border-radius:999px;">${sig.code}</span>
        <span style="font-size:0.72rem;font-weight:700;color:#006233;">Geste Officiel #${idx + 1}</span>
      </div>
      ${renderSignalSvg(sig.svgType, idx)}
      <h4 style="margin:0.2rem 0 0;font-size:1rem;font-weight:800;color:#0f172a;line-height:1.35;">${sig.name}</h4>
      <p style="margin:0;font-size:0.84rem;color:#334155;line-height:1.55;"><strong style="color:#991b1b;">Quand siffler :</strong> ${sig.when}</p>
      <p style="margin:0;font-size:0.84rem;color:#1e293b;background:#f8fafc;padding:0.6rem 0.75rem;border-radius:10px;border-left:3px solid #006233;line-height:1.55;"><strong style="color:#006233;">Exécution du geste :</strong> ${sig.how}</p>
    </div>
  `).join('');

  const epsRowsHtml = sport.epsAdaptationTable.map(row => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3] || 'Application progressive selon le projet de cycle OP 2007/2009'}</td>
    </tr>
  `).join('');

  const pdfCardsHtml = sport.officialPdfs.map(pdf => `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-left:5px solid #991b1b;border-radius:14px;padding:1.15rem 1.35rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;box-shadow:0 4px 12px rgba(15,23,42,0.04);">
      <div style="flex:1 1 360px;">
        <span style="display:inline-block;font-size:0.72rem;font-weight:800;text-transform:uppercase;color:#006233;margin-bottom:0.25rem;">🏛️ Source Fédérale Officielle · ${pdf.org}</span>
        <h4 style="margin:0 0 0.3rem 0;font-size:1.02rem;font-weight:800;color:#0f172a;">${pdf.label}</h4>
        <p style="margin:0;font-size:0.85rem;color:#475569;line-height:1.5;">${pdf.note}</p>
      </div>
      <a href="${pdf.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.7rem 1.25rem;background:linear-gradient(135deg,#991b1b,#7f1d1d);color:#ffffff;font-weight:800;font-size:0.85rem;border-radius:10px;text-decoration:none;box-shadow:0 4px 12px rgba(153,27,27,0.22);white-space:nowrap;">📥 Consulter / Télécharger le PDF Officiel ↗</a>
    </div>
  `).join('');

  const crmefQaHtml = sport.crmefQuestions.map(item => `
    <div class="faq-item" style="border-left:4px solid #991b1b;">
      <h4 style="color:#0f172a;font-weight:800;margin-bottom:0.5rem;">🎯 ${item.q}</h4>
      <p style="color:#334155;line-height:1.7;margin:0;"><strong>Réponse officielle :</strong> ${item.a}</p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${sport.metaDesc.replace(/"/g, '&quot;')}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="${sport.title.replace(/"/g, '&quot;')}">
    <meta property="og:description" content="${sport.metaDesc.replace(/"/g, '&quot;')}">
    <meta property="og:url" content="https://profeps.ma/${sport.slug}">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${sport.title.replace(/"/g, '&quot;')}">
    <meta name="twitter:description" content="${sport.metaDesc.replace(/"/g, '&quot;')}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="https://profeps.ma/${sport.slug}">
    <link rel="alternate" hreflang="fr-MA" href="https://profeps.ma/${sport.slug}">
    <link rel="alternate" hreflang="x-default" href="https://profeps.ma/${sport.slug}">
    <title>${sport.title}</title>
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <!-- Google tag (gtag.js) & Consent Mode v2 ProfEPS.ma -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      try {
        var saved = JSON.parse(localStorage.getItem("profeps_cookie_consent_v2") || "null");
        if (saved) {
          gtag("consent", "default", {
            "ad_storage": saved.ads ? "granted" : "denied",
            "ad_user_data": saved.ads ? "granted" : "denied",
            "ad_personalization": saved.ads ? "granted" : "denied",
            "analytics_storage": saved.analytics ? "granted" : "denied"
          });
        } else {
          gtag("consent", "default", {
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted",
            "analytics_storage": "granted"
          });
          gtag("consent", "default", {
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "analytics_storage": "denied",
            "region": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","CH"],
            "wait_for_update": 500
          });
        }
      } catch (e) {}
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TH0Z1SGNXH');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>
    <script src="profeps-cmp.js" defer></script>
    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">

    <script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>

    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary: #991b1b; --secondary: #006233; --text-primary: #0f172a; --text-secondary: #334155;
            --bg-primary: #ffffff; --bg-secondary: #f8fafc; --border: #cbd5e1; --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(15,23,42,0.06); --shadow-md: 0 4px 12px rgba(15,23,42,0.08);
            --radius: 8px; --radius-lg: 14px; --radius-full: 9999px;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Plus Jakarta Sans', var(--font-sans);
        }
        body { font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.65; }
        a { text-decoration: none; color: inherit; }
        .section-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
        .article-hero { padding: 130px 1.5rem 2.75rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); text-align: center; }
        .article-title { font-family: var(--font-display); font-size: clamp(1.65rem, 3.6vw, 2.4rem); font-weight: 900; color: var(--text-primary); max-width: 960px; margin: 0 auto 1rem; line-height: 1.25; }
        .article-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; }
        .article-container { max-width: 980px; margin: 0 auto; padding: 2.5rem 1.5rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 700; margin-bottom: 1.75rem; }
        .back-link:hover { text-decoration: underline; }
        .article-content { line-height: 1.8; color: var(--text-secondary); }
        .article-content h2 { font-size: 1.45rem; font-weight: 900; color: var(--text-primary); margin-top: 2.75rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }
        .article-content h3 { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 1.75rem; margin-bottom: 0.65rem; }
        .article-content p { margin-bottom: 1rem; }
        .article-content ul, .article-content ol { margin: 1rem 0; padding-left: 1.75rem; }
        .article-content li { margin-bottom: 0.5rem; }
        .info-box { background: #fff8f8; border: 1px solid #f5c2c7; border-left: 5px solid var(--primary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }
        .success-box { background: #f3faf6; border: 1px solid #a7d7c5; border-left: 5px solid var(--secondary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }
        .step-card { background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1.25rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .table-container { overflow-x: auto; margin: 1.5rem 0; }
        .table-container table { width: 100%; border-collapse: collapse; background: #ffffff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
        .table-container th { background: #f1f5f9; color: #0f172a; padding: 0.85rem 1rem; text-align: left; font-size: 0.88rem; font-weight: 800; border-bottom: 2px solid var(--border); }
        .table-container td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); font-size: 0.88rem; color: #1e293b; vertical-align: top; }
        .table-container tr:nth-child(even) td { background: #f8fafc; }
        .signals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); gap: 1.15rem; margin: 1.5rem 0; }
        .faq-item { background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .toc-nav { background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem; box-shadow: var(--shadow-sm); }
        .toc-nav h3 { margin: 0 0 0.75rem 0 !important; font-size: 1rem !important; color: #0f172a !important; }
        .toc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; }
        .toc-grid a { display: block; padding: 0.5rem 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }
        .toc-grid a:hover { border-color: var(--primary); color: var(--primary); background: #fff8f8; }
    </style>
</head>
<body>
${navCustom}

    <section class="article-hero">
        <span class="section-badge">${sport.badge}</span>
        <h1 class="article-title">${sport.shortTitle} : Terrain Coté, Règles Officielles, Gestes Illustrés &amp; PDF Fédéral</h1>
        <div class="article-meta">
            <span>🏛️ Référentiel : ${sport.federation}</span>
            <span>📅 Mis à jour le ${sport.dateLabel}</span>
            <span>⏱️ ${sport.readTime}</span>
            <span>✍️ Par <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">Abdelkhalek ELBOUDANI</a></span>
        </div>
    </section>

    <article class="article-container">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;">
            <a href="blog.html" class="back-link" style="margin:0;">← Retour au Blog &amp; Thématique Règlements 2026</a>
            <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
                <a href="${sport.relatedArticle}" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;font-size:0.82rem;font-weight:700;color:#0f172a;">📘 Voir le Guide Didactique &amp; Séances</a>
                <a href="#telechargement-pdf" style="padding:0.45rem 0.9rem;background:#991b1b;color:#ffffff;border-radius:8px;font-size:0.82rem;font-weight:800;">📥 Télécharger le PDF Fédéral Officiel</a>
            </div>
        </div>

        <div class="article-content">
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.05rem;">⚖️ Dossier Réglementaire Complet Conforme aux Lois ${sport.lawVersion}</h4>
                <p style="margin:0;color:#1e293b;">Ce dossier de référence rassemble <strong>toutes les règles officielles actualisées (${sport.lawVersion})</strong> de l'activité <strong>${sport.sportName}</strong> : schéma vectoriel coté du terrain, spécifications du matériel par catégorie d'âge, lois fondamentales et nouveautés 2025/2026, <strong>catalogue illustré des signes et gestes d'arbitrage</strong>, adaptations didactiques pour l'EPS au Maroc (OP 2007 Lycée &amp; OP 2009 Collège), grille d'évaluation de l'élève-arbitre, <strong>liens directs vers les PDF officiels des fédérations</strong> et questions-pièges du concours CRMEF EPS.</p>
            </div>

            <nav class="toc-nav" aria-label="Sommaire du règlement">
                <h3>🧭 Sommaire Rapide du Règlement &amp; de l'Arbitrage</h3>
                <div class="toc-grid">
                    <a href="#schema-terrain">1. Schéma Coté du Terrain &amp; Matériel</a>
                    <a href="#lois-fondamentales">2. Règlement Général &amp; Nouveautés 2026</a>
                    <a href="#gestes-arbitrage">3. Gestes d'Arbitrage Illustrés (SVG)</a>
                    <a href="#adaptation-eps-maroc">4. Règlement Fédéral vs EPS Maroc (OP)</a>
                    <a href="#grille-eleve-arbitre">5. Grille d'Évaluation de l'Élève-Arbitre</a>
                    <a href="#telechargement-pdf">6. Télécharger le PDF Officiel Fédéral</a>
                    <a href="#questions-crmef">7. Spécial Concours CRMEF (Q&amp;R Chiffrées)</a>
                    <a href="#profeps-human-field-experience">8. Retour de Terrain &amp; Références</a>
                </div>
            </nav>

            <!-- BLOC 1 : SCHÉMA COTÉ DU TERRAIN & NORMES MATÉRIELLES -->
            <h2 id="schema-terrain">I. Schéma Vectoriel Coté du Terrain &amp; Normes Réglementaires</h2>
            <p>La maîtrise des dimensions exactes des tracés, des zones restrictives, de la hauteur des cibles et de la masse des engins/ballons par catégorie d'âge est indispensable tant pour tracer un plateau sportif scolaire que pour répondre aux questions écrites (QCM) et orales des concours CRMEF et examens d'aptitude professionnelle.</p>

            <div style="margin:1.75rem 0;background:#ffffff;padding:1.25rem;border-radius:16px;border:1px solid #cbd5e1;box-shadow:0 6px 18px rgba(15,23,42,0.06);">
                ${sport.courtSvg}
                <p style="margin:0.75rem 0 0;text-align:center;font-size:0.82rem;font-weight:700;color:#475569;">Figure 1 — Schéma réglementaire coté (${sport.lawVersion}) pour l'enseignement de l'EPS, l'ASS et la préparation au concours CRMEF.</p>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="width:24%;">Paramètre Réglementaire</th>
                            <th style="width:42%;">Norme Fédérale Officielle (Loi 2025/2026)</th>
                            <th style="width:34%;">Application Scolaire EPS &amp; ASS au Maroc</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${specsRowsHtml}
                    </tbody>
                </table>
            </div>

            <!-- BLOC 2 : LOIS FONDAMENTALES & NOUVEAUTÉS 2025/2026 -->
            <h2 id="lois-fondamentales">II. Règlement Général Complet &amp; Nouveautés Réglementaires 2025/2026</h2>
            <p>Voici la synthèse structurée des règles officielles en vigueur selon le référentiel <strong>${sport.lawVersion}</strong>, incluant les derniers amendements fédéraux applicables aux compétitions officielles et scolaires :</p>
            ${lawsSectionsHtml}

            <!-- BLOC 3 : GALERIE ILLUSTRÉE DES SIGNES ET GESTES D'ARBITRAGE -->
            <h2 id="gestes-arbitrage">III. Guide Illustré des Signes et Gestes Officiels d'Arbitrage</h2>
            <p>En EPS comme en compétition fédérale, un bon arbitrage repose sur la séquence <strong>« Coup de sifflet franc → Placement lisible → Geste codifié net »</strong>. Chaque carte ci-dessous illustre le signal officiel, le moment précis où il doit être sifflé et la gestuelle attendue de l'arbitre (ou de l'élève-arbitre lors de l'évaluation en EPS) :</p>

            <div class="signals-grid">
                ${refereeCardsHtml}
            </div>

            <!-- BLOC 4 : TABLEAU COMPARATIF FÉDÉRAL VS EPS MAROC -->
            <h2 id="adaptation-eps-maroc">IV. Transposition Didactique : Règlement Fédéral vs Règlement Aménagé en EPS (OP 2007 &amp; OP 2009)</h2>
            <p>Conformément aux <strong>Orientations Pédagogiques 2009 (Collège)</strong> et <strong>2007 (Lycée Qualifiant)</strong> au Maroc, l'enseignant d'EPS ne plaque pas mécaniquement le règlement fédéral adulte sur une classe de 36 élèves : il procède à un <strong>traitement didactique</strong> qui conserve la logique interne de l'APS tout en aménageant l'espace, l'effectif et les règles pour garantir la sécurité et la réussite de tous.</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Variable Réglementaire</th>
                            <th>Règle Fédérale Officielle (2026)</th>
                            <th>Adaptation Collège (OP 2009 — 1AC/2AC/3AC)</th>
                            <th>Adaptation Lycée &amp; Bac (OP 2007 — TC/1Bac/2Bac)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${epsRowsHtml}
                    </tbody>
                </table>
            </div>

            <!-- BLOC 5 : GRILLE D'ÉVALUATION DE L'ÉLÈVE-ARBITRE EN EPS -->
            <h2 id="grille-eleve-arbitre">V. Fiche &amp; Barème d'Évaluation de l'Élève-Arbitre et du Juge en EPS (OP Maroc)</h2>
            <p>Dans les Orientations Pédagogiques marocaines, les <strong>Connaissances réglementaires (notées sur 3 points)</strong> et les <strong>Compétences comportementales / Rôles sociaux (notées de 3 à 5 points selon le niveau)</strong> représentent jusqu'à <strong>8 points sur 20</strong> ! Voici la grille opérationnelle pour évaluer vos élèves dans le rôle d'arbitre et de table de marque :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Niveau de Maîtrise de l'Élève-Arbitre</th>
                            <th>Indicateurs Observables sur le Terrain</th>
                            <th>Connaissances (sur 3 pts)</th>
                            <th>Rôle Social / Arbitrage (sur 3 à 5 pts)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Niveau 1 : Arbitre Hésitant / Passif</strong></td>
                            <td>Reste immobile au bord du terrain, oublie de siffler les fautes évidentes, confond les remises en jeu et subit la pression des joueurs.</td>
                            <td><strong>0,5 à 1 / 3 pts</strong></td>
                            <td><strong>1 / 5 pts</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Niveau 2 : Arbitre Ponctuel (Sécurité &amp; Limites)</strong></td>
                            <td>Siffle les sorties de balle, les buts/points et les fautes dangereuses grossières, mais hésite sur la gestuelle codifiée et les règles de temps.</td>
                            <td><strong>1,5 à 2 / 3 pts</strong></td>
                            <td><strong>2,5 à 3 / 5 pts</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Niveau 3 : Arbitre Officiel Autonome &amp; Codifié</strong></td>
                            <td>Se déplace avec le jeu, coup de sifflet net, <strong>exécute systématiquement le geste officiel d'arbitrage</strong> (faute + direction), gère le décompte temporel à voix haute et communique avec la table de marque en toute impartialité.</td>
                            <td><strong>2,5 à 3 / 3 pts</strong></td>
                            <td><strong>4 à 5 / 5 pts</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- BLOC 6 : TÉLÉCHARGEMENT DU PDF OFFICIEL FÉDÉRAL -->
            <h2 id="telechargement-pdf">VI. Télécharger le Règlement Officiel en PDF (Portails des Fédérations Internationales &amp; Nationales)</h2>
            <p>Pour consulter ou télécharger le texte intégral officiel publié par la fédération internationale et nationale régissant l'activité <strong>${sport.sportName}</strong>, utilisez les liens officiels vérifiés ci-dessous :</p>

            <div style="display:grid;gap:1rem;margin:1.5rem 0;">
                ${pdfCardsHtml}
            </div>

            <!-- BLOC 7 : SPÉCIAL CONCOURS CRMEF & EXAMEN PROFESSIONNEL -->
            <h2 id="questions-crmef">VII. Spécial Concours CRMEF EPS &amp; Examen Professionnel : Questions-Pièges Chiffrées sur le Règlement</h2>
            <p>Ces questions réglementaires chiffrées tombent régulièrement aux épreuves écrites (QCM de spécialité EPS) et lors de l'entretien oral au CRMEF :</p>

            <div class="faq-section">
                ${crmefQaHtml}
            </div>

            <div class="success-box" style="margin-top:2rem;">
                <h4 style="color:#006233;margin-bottom:0.5rem;">🔗 Dossiers Pédagogiques &amp; Cycles Associés sur ProfEPS.ma</h4>
                <p style="margin:0;">Pour transformer ce règlement en séances clés en main conformes aux OP 2007/2009, consultez également : <a href="${sport.relatedArticle}" style="font-weight:800;color:#991b1b;text-decoration:underline;">Le Guide Didactique Complet (${sport.sportName})</a> · <a href="${sport.relatedCycleCollege}" style="font-weight:800;color:#006233;text-decoration:underline;">Le Cycle Collège (OP 2009)</a> · <a href="${sport.relatedCycleLycee}" style="font-weight:800;color:#006233;text-decoration:underline;">Le Cycle Lycée &amp; Bac (OP 2007)</a> · <a href="qcm-specialite-eps-maroc.html" style="font-weight:800;color:#991b1b;text-decoration:underline;">Simulateur QCM Spécialité EPS &amp; Règlements des APS</a>.</p>
            </div>
        </div>
    </article>

    <!-- PROFEPS_HUMAN_FIELD_EXPERIENCE_START -->
    <section id="profeps-human-field-experience" style="max-width:960px;margin:2.25rem auto;padding:1.75rem 2rem;background:linear-gradient(135deg,#fffdf9 0%,#ffffff 55%,#f3faf6 100%);border:1px solid #cbd5e1;border-left:5px solid #006233;border-radius:18px;box-shadow:0 8px 24px -6px rgba(15,23,42,0.06);font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif;color:#1e293b;line-height:1.7;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;padding-bottom:0.85rem;border-bottom:1px dashed #cbd5e1;">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#991b1b,#006233);color:#ffffff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.95rem;flex-shrink:0;box-shadow:0 4px 10px rgba(0,98,51,0.2);">AE</div>
          <div>
            <span style="display:block;font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#006233;">🎤 Carnet de Terrain · Vécu d'Enseignant d'EPS au Maroc</span>
            <h2 style="margin:0;font-size:1.15rem;font-weight:800;color:#0f172a;border:none;padding:0;">Arbitrage Scolaire &amp; Astuces de Métier (${sport.sportName})</h2>
          </div>
        </div>
        <span style="font-size:0.76rem;font-weight:700;padding:0.3rem 0.75rem;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:999px;color:#334155;">${sport.fieldExperience.context}</span>
      </div>

      <div style="font-size:0.94rem;color:#334155;">
        <p style="margin:0 0 0.85rem 0;"><strong>Ce que l'on vit réellement sur le terrain :</strong> ${sport.fieldExperience.reality}</p>
        <div style="margin:0.95rem 0;padding:1rem 1.25rem;background:#f8fafc;border-left:4px solid #991b1b;border-radius:0 12px 12px 0;">
          <strong style="color:#991b1b;display:block;margin-bottom:0.25rem;">💡 Mon dispositif pratique d'arbitrage en séance :</strong>
          <p style="margin:0;color:#1e293b;font-size:0.92rem;">${sport.fieldExperience.tip}</p>
        </div>
      </div>

      <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid #e2e8f0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;font-size:0.82rem;color:#475569;">
        <div>
          Rédigé et vérifié sur le terrain par <strong style="color:#0f172a;"><a href="a-propos.html" style="color:#0f172a;text-decoration:underline;">Abdelkhalek ELBOUDANI</a></strong> · Professeur d'EPS au Maroc &amp; Fondateur de ProfEPS.ma.<br>
          <span style="font-size:0.76rem;color:#64748b;">Conforme aux règlements fédéraux internationaux (${sport.lawVersion}) et aux OP 2007/2009 (MENPS Maroc).</span>
        </div>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
          <a href="a-propos.html" style="padding:0.45rem 0.85rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;font-weight:700;text-decoration:none;font-size:0.78rem;">👤 Parcours de l'Auteur</a>
          <a href="blog.html" style="padding:0.45rem 0.85rem;background:#006233;color:#ffffff;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.78rem;">📚 Tous les Règlements APS</a>
        </div>
      </div>
    </section>
    <!-- PROFEPS_HUMAN_FIELD_EXPERIENCE_END -->

    <!-- PROFEPS_SCIENTIFIC_REFERENCES_START -->
    <section id="profeps-scientific-references" style="max-width:960px;margin:1.75rem auto;padding:1.5rem 1.85rem;background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #1e293b;border-radius:14px;font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif;color:#334155;font-size:0.86rem;line-height:1.65;">
      <h2 style="margin:0 0 0.75rem 0;font-size:1rem;font-weight:800;color:#0f172a;display:flex;align-items:center;gap:0.5rem;">📚 Références Réglementaires Officielles &amp; Textes Didactiques</h2>
      <ul style="margin:0;padding-left:1.25rem;display:grid;gap:0.4rem;">
        <li><strong>${sport.federation}.</strong> <em>${sport.lawVersion} — Règlement officiel, code des signaux d'arbitrage et directives techniques des compétitions.</em></li>
        <li><strong>Ministère de l'Éducation Nationale, du Préscolaire et des Sports (MENPS — Maroc).</strong> <em>Orientations Pédagogiques pour l'enseignement de l'EPS dans le cycle secondaire collégial (Août 2009) et dans le cycle secondaire qualifiant (2007).</em></li>
        <li><strong>Fédération Royale Marocaine du Sport Scolaire (FRMSS — Maroc).</strong> <em>Circulaires annuelles d'organisation des compétitions sportives scolaires ASS (catégories U13, U15 et U18).</em></li>
        <li><strong>Parlebas, P. (1999) &amp; Gréhaigne, J.-F. (2007).</strong> <em>Logique interne des APS, traitement didactique du règlement fédéral et co-arbitrage formatif en EPS.</em></li>
      </ul>
    </section>
    <!-- PROFEPS_SCIENTIFIC_REFERENCES_END -->

${UNIFIED_FOOTER_AND_CMP}`;
}

// 1. Write the 12 new regulation articles in /public and root /
let createdCount = 0;
for (const sport of allSports) {
  const html = buildArticleHtml(sport);
  fs.writeFileSync(path.join(PUBLIC_DIR, sport.slug), html, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, sport.slug), html, 'utf8');
  createdCount++;
}
console.log(`✅ Generated ${createdCount} complete APS Regulation & Illustrated Referee Signals articles.`);

// 2. Update blog.html (both in /public and root /) to add the new theme "reglements" & the 12 cards
function updateBlogHtml(blogPath) {
  if (!fs.existsSync(blogPath)) return;
  let blog = fs.readFileSync(blogPath, 'utf8');

  // A. Add CSS classes for .theme-reglements and .article-reglements if not present
  if (!blog.includes('.theme-reglements')) {
    blog = blog.replace(
      '.theme-aps        { --theme-accent: #be123c; --theme-bg-active: #fff1f2; }',
      '.theme-aps        { --theme-accent: #be123c; --theme-bg-active: #fff1f2; }\n        .theme-reglements { --theme-accent: #0f766e; --theme-bg-active: #f0fdfa; }'
    );
  }
  if (!blog.includes('.article-reglements')) {
    blog = blog.replace(
      '.article-aps        { background: linear-gradient(135deg, #7f1d1d 0%, #be123c 100%); }',
      '.article-aps        { background: linear-gradient(135deg, #7f1d1d 0%, #be123c 100%); }\n        .article-reglements { background: linear-gradient(135deg, #0f172a 0%, #0f766e 55%, #006233 100%); }'
    );
  }

  // B. Add the Theme Filter Card for "Règlements & Lois" in .themes-grid
  const themeCardHtml = `
                    <div class="theme-card theme-reglements" data-theme="reglements" onclick="window.filterByTheme('reglements')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/></svg>
                        </div>
                        <h3>Règlements &amp; Lois <span class="theme-count" id="count-reglements">${allSports.length}</span></h3>
                        <p>Lois 2026, Gestes &amp; PDF</p>
                    </div>`;

  // Remove any previous injection of data-theme="reglements" before re-inserting cleanly
  blog = blog.replace(/<div class="theme-card theme-reglements"[\s\S]*?<\/div>\s*<\/div>/g, '');
  const apsThemeMarker = '<div class="theme-card theme-aps"';
  if (blog.includes(apsThemeMarker)) {
    blog = blog.replace(apsThemeMarker, themeCardHtml + '\n\n                    ' + apsThemeMarker);
  }

  // Update static fallback counts in blog.html (93 existing + 20 reglements = 113)
  blog = blog.replace('<span class="stat-number" id="totalArticlesCount">105</span>', '<span class="stat-number" id="totalArticlesCount">113</span>');
  blog = blog.replace('<span class="theme-count" id="count-all">105</span>', '<span class="theme-count" id="count-all">113</span>');
  blog = blog.replace('Parcourez 105 articles de fond', 'Parcourez 113 articles de fond');

  // C. Add filter label in window.filterByTheme
  if (!blog.includes("reglements: 'Règlements Officiels des APS")) {
    blog = blog.replace(
      "aps: 'Activités Physiques et Sportives (APS)'",
      "aps: 'Activités Physiques et Sportives (APS)',\n                    reglements: 'Règlements Officiels des APS (Lois 2026), Gestes d\\'Arbitrage Illustrés & PDF Fédéraux'"
    );
  }

  // D. Build the 20 dedicated cards for #articlesGrid
  const cardsHtml = `
                <!-- PROFEPS_REGLEMENTS_LOIS_2026_CARDS_START -->
                ${allSports.map(sport => `
                <article class="article-card" data-category="reglements">
                    <div class="article-visual article-reglements">
                        <span class="category-badge category-reglements">⚖️ Loi 2026 · Arbitrage &amp; PDF</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="#0f766e" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">${sport.shortTitle} : Terrain, Signes Illustrés &amp; PDF</h3>
                        <p class="article-excerpt">${sport.metaDesc}</p>
                        <div class="article-footer">
                            <span class="article-date">${sport.dateLabel}</span>
                            <a href="${sport.slug}" class="read-more">Règlement &amp; PDF →</a>
                        </div>
                    </div>
                </article>`).join('\n')}
                <!-- PROFEPS_REGLEMENTS_LOIS_2026_CARDS_END -->`;

  blog = blog.replace(/<!-- PROFEPS_REGLEMENTS_LOIS_2026_CARDS_START -->[\s\S]*?<!-- PROFEPS_REGLEMENTS_LOIS_2026_CARDS_END -->\s*/g, '');
  const gridMarker = '<div class="articles-grid" id="articlesGrid">';
  if (blog.includes(gridMarker)) {
    blog = blog.replace(gridMarker, gridMarker + '\n' + cardsHtml + '\n');
  }

  fs.writeFileSync(blogPath, blog, 'utf8');
}

updateBlogHtml(path.join(PUBLIC_DIR, 'blog.html'));
updateBlogHtml(path.join(ROOT_DIR, 'blog.html'));
console.log(`✅ Updated blog.html with new theme filter "Règlements & Lois" and ${allSports.length} dedicated regulation cards.`);

// 3. Enrich existing APS articles with a prominent Regulation 2026 + Illustrated Referee Signals + Official PDF Callout Box
const existingMappings = [
  { file: 'article-football-eps.html', sportIds: ['football', 'futsal'] },
  { file: 'article-handball-eps.html', sportIds: ['handball'] },
  { file: 'article-rugby-eps-maroc.html', sportIds: ['rugby'] },
  { file: 'article-basketball-eps.html', sportIds: ['basketball', 'basket-3x3'] },
  { file: 'article-gestes-arbitres-basketball.html', sportIds: ['basketball', 'basket-3x3'] },
  { file: 'article-basket-3x3-eps.html', sportIds: ['basket-3x3', 'basketball'] },
  { file: 'article-volleyball-eps.html', sportIds: ['volleyball', 'beach-volley'] },
  { file: 'article-gestes-arbitres-volleyball.html', sportIds: ['volleyball', 'beach-volley'] },
  { file: 'article-beach-volley-eps.html', sportIds: ['beach-volley', 'volleyball'] },
  { file: 'article-badminton-eps.html', sportIds: ['badminton'] },
  { file: 'article-tennis-de-table-eps.html', sportIds: ['tennis-de-table'] },
  {
    file: 'article-fiche-seance-athletisme-eps.html',
    sportIds: [
      'athletisme-vitesse',
      'athletisme-relais',
      'athletisme-haies',
      'athletisme-fond-marathon',
      'athletisme-steeple',
      'athletisme-lancer-poids',
      'athletisme-lancers-disque-javelot-marteau',
      'athletisme-sauts-horizontaux',
      'athletisme-sauts-verticaux'
    ]
  },
  { file: 'article-seance-gymnastique.html', sportIds: ['gymnastique'] }
];

for (const mapItem of existingMappings) {
  const pubPath = path.join(PUBLIC_DIR, mapItem.file);
  if (!fs.existsSync(pubPath)) continue;
  let content = fs.readFileSync(pubPath, 'utf8');
  content = content.replace(/<!-- PROFEPS_APS_REGLEMENT_2026_CALLOUT_START -->[\s\S]*?<!-- PROFEPS_APS_REGLEMENT_2026_CALLOUT_END -->\s*/g, '');

  const matchedSports = mapItem.sportIds.map(id => allSports.find(s => s.id === id)).filter(Boolean);
  if (matchedSports.length === 0) continue;
  const primarySport = matchedSports[0];

  const buttonsHtml = matchedSports.map((sp, idx) => `
        <a href="${sp.slug}" style="padding:0.6rem 1.05rem;background:${idx === 0 ? '#0f766e' : '#991b1b'};color:#ffffff;font-weight:800;font-size:0.82rem;border-radius:10px;text-decoration:none;box-shadow:0 4px 12px rgba(15,23,42,0.12);">⚖️ ${sp.shortTitle} →</a>`).join('');

  const calloutHtml = `
  <!-- PROFEPS_APS_REGLEMENT_2026_CALLOUT_START -->
  <section style="max-width:920px;margin:2rem auto;padding:1.5rem 1.75rem;background:linear-gradient(135deg,#f0fdfa 0%,#ffffff 52%,#fff8f8 100%);border:2px solid #0f766e;border-left:6px solid #0f766e;border-radius:16px;box-shadow:0 8px 22px rgba(15,23,42,0.06);font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
      <div style="flex:1 1 420px;">
        <span style="display:inline-block;padding:0.25rem 0.75rem;background:#0f766e;color:#ffffff;font-size:0.72rem;font-weight:800;border-radius:999px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.4rem;">⚖️ Règlements Officiels 2025/2026 · Arbitrage Illustré &amp; PDF Fédéral</span>
        <h3 style="margin:0 0 0.35rem 0;font-size:1.15rem;font-weight:900;color:#0f172a;">Consultez les Dossiers Règlements Officiels &amp; Gestes d'Arbitrage Illustrés</h3>
        <p style="margin:0;font-size:0.86rem;color:#334155;line-height:1.55;">Schémas cotés (${primarySport.lawVersion}), nouvelles règles 2026, <strong>galerie vectorielle des gestes d'arbitrage et drapeaux des juges illustrés</strong>, barème de l'élève-juge et <strong>téléchargement direct du PDF officiel (${primarySport.federation})</strong> :</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.55rem;width:100%;margin-top:0.35rem;">
        ${buttonsHtml}
      </div>
    </div>
  </section>
  <!-- PROFEPS_APS_REGLEMENT_2026_CALLOUT_END -->`;

  const expMarker = '<!-- PROFEPS_HUMAN_FIELD_EXPERIENCE_START -->';
  if (content.includes(expMarker)) {
    content = content.replace(expMarker, calloutHtml + '\n  ' + expMarker);
  } else {
    const footerMarker = '<footer class="footer"';
    if (content.includes(footerMarker)) {
      content = content.replace(footerMarker, calloutHtml + '\n  ' + footerMarker);
    }
  }

  fs.writeFileSync(pubPath, content, 'utf8');
  const rootPath = path.join(ROOT_DIR, mapItem.file);
  if (fs.existsSync(rootPath)) {
    fs.writeFileSync(rootPath, content, 'utf8');
  }
}
console.log('✅ Enriched 13 existing APS articles with Regulation 2026 & Referee Signals cross-link callouts.');

// 4. Update sitemap.xml in /public and root / (and remove deleted generalist athletics URL)
function updateSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/profeps\.ma\/reglement-athletisme-world-athletics-jury-eps\.html<\/loc>[\s\S]*?<\/url>/g, '');
  for (const sport of allSports) {
    const loc = `https://profeps.ma/${sport.slug}`;
    if (!sitemap.includes(loc)) {
      const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${sport.datePublished}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`;
      sitemap = sitemap.replace('</urlset>', entry);
    }
  }
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}
updateSitemap(path.join(PUBLIC_DIR, 'sitemap.xml'));
updateSitemap(path.join(ROOT_DIR, 'sitemap.xml'));
console.log(`✅ Updated sitemap.xml with all ${allSports.length} APS regulation URLs.`);
