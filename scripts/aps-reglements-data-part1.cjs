// Données encyclopédiques des Règlements Officiels 2025/2026 & Gestes d'Arbitrage Illustrés — Partie 1 (Sports Collectifs Majeurs)
module.exports = [
  // ============================================================================
  // 1. FOOTBALL (IFAB / FIFA 2025-2026)
  // ============================================================================
  {
    id: 'football',
    slug: 'reglement-football-lois-jeu-ifab-arbitrage-eps.html',
    relatedArticle: 'article-football-eps.html',
    relatedCycleCollege: 'cycle-football-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-football-lycee-eps-maroc.html',
    sportName: 'Football (à 11, à 7 & Mini-Foot Scolaire)',
    shortTitle: 'Règlement Football (Lois IFAB 2026) & Gestes d\'Arbitrage',
    title: 'Règlement Officiel du Football (Lois du Jeu IFAB 2026), Schéma du Terrain, Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Football conforme aux 17 Lois du Jeu IFAB/FIFA 2025-2026 : dimensions du terrain, fautes, hors-jeu, règle des 8s du gardien, gestes d\'arbitrage illustrés, adaptation EPS Maroc et PDF officiel.',
    badge: '⚽ Règlement Officiel IFAB 2025/2026 & Arbitrage',
    federation: 'IFAB (International Football Association Board) / FIFA / FRMF',
    lawVersion: 'Lois du Jeu IFAB 2025/2026 (Loi 1 à Loi 17)',
    datePublished: '2026-10-26',
    dateLabel: '26 Octobre 2026',
    readTime: '28 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Lois du Jeu Officiel IFAB 2025/2026 (PDF Français)',
        org: 'The IFAB (International Football Association Board)',
        url: 'https://www.theifab.com/fr/laws-of-the-game-documents/?language=fr',
        note: 'Document officiel intégral en français : Lois 1 à 17, protocole VAR, directives pratiques pour les arbitres et glossaire.'
      },
      {
        label: 'Portail Réglementaire & Arbitrage FIFA (Documents Officiels)',
        org: 'FIFA — Fédération Internationale de Football Association',
        url: 'https://inside.fifa.com/fr/legal/documents',
        note: 'Règlements des compétitions FIFA, normes d\'équipement et manuels techniques d\'arbitrage.'
      },
      {
        label: 'Fédération Royale Marocaine de Football (FRMF — Textes & Règlements)',
        org: 'FRMF Maroc',
        url: 'https://frmf.ma/fr/statuts-et-reglements/',
        note: 'Règlements généraux des compétitions nationales et catégories jeunes au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 500" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de football IFAB 105m x 68m">
        <rect width="800" height="500" fill="#15803d"/>
        <!-- Bandes de tonte -->
        <g fill="#166534" opacity="0.45">
          <rect x="50" y="40" width="70" height="420"/><rect x="190" y="40" width="70" height="420"/>
          <rect x="330" y="40" width="70" height="420"/><rect x="470" y="40" width="70" height="420"/>
          <rect x="610" y="40" width="70" height="420"/>
        </g>
        <!-- Lignes principales -->
        <g stroke="#ffffff" stroke-width="3" fill="none">
          <rect x="50" y="40" width="700" height="420"/>
          <line x1="400" y1="40" x2="400" y2="460"/>
          <circle cx="400" cy="250" r="61"/>
          <circle cx="400" cy="250" r="4" fill="#ffffff"/>
          <!-- Surface de réparation gauche (16.5m x 40.32m) -->
          <rect x="50" y="125" width="110" height="250"/>
          <!-- Surface de but gauche (5.5m x 18.32m) -->
          <rect x="50" y="193" width="37" height="114"/>
          <!-- Point de pénalty gauche (11m) + Arc R=9.15m -->
          <circle cx="123" cy="250" r="3.5" fill="#ffffff"/>
          <path d="M 160 202 A 61 61 0 0 1 160 298"/>
          <!-- But gauche (7.32m x 2.44m) -->
          <rect x="34" y="226" width="16" height="48" stroke-width="2.5"/>
          <!-- Surface de réparation droite -->
          <rect x="640" y="125" width="110" height="250"/>
          <rect x="713" y="193" width="37" height="114"/>
          <circle cx="677" cy="250" r="3.5" fill="#ffffff"/>
          <path d="M 640 202 A 61 61 0 0 0 640 298"/>
          <rect x="750" y="226" width="16" height="48" stroke-width="2.5"/>
          <!-- Arcs de corner (R=1m) -->
          <path d="M 50 52 A 12 12 0 0 0 62 40"/>
          <path d="M 738 40 A 12 12 0 0 0 750 52"/>
          <path d="M 62 460 A 12 12 0 0 0 50 448"/>
          <path d="M 750 448 A 12 12 0 0 0 738 460"/>
        </g>
        <!-- Annotations cotées -->
        <g font-family="Inter, sans-serif" font-size="13" font-weight="800" fill="#fef08a" text-anchor="middle">
          <text x="400" y="25">LONGUEUR : 90 m à 120 m (Standard FIFA / International : 105 m)</text>
          <text x="22" y="250" transform="rotate(-90 22 250)">LARGEUR : 45 m à 90 m (Standard : 68 m)</text>
          <text x="400" y="180" fill="#ffffff">R = 9,15 m</text>
          <text x="105" y="116">Surface réparation : 16,50 m × 40,32 m</text>
          <text x="95" y="186" font-size="11.5">Surface but : 5,50 m</text>
          <text x="123" y="272" font-size="11.5" fill="#fde047">Pénalty : 11 m</text>
          <text x="400" y="485" fill="#ffffff">But officiel : Largeur 7,32 m × Hauteur 2,44 m | Poteaux/Barre : 12 cm max</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Loi 1)', 'Longueur : 90 à 120 m (Standard FIFA : 105 m) · Largeur : 45 à 90 m (Standard FIFA : 68 m)', 'En EPS / Mini-Foot (7c7) : 50 à 65 m × 30 à 45 m (ou terrain de Handball 40×20 m en 5c5)'],
      ['Dimensions des buts', 'Largeur : 7,32 m (8 yards) · Hauteur : 2,44 m (8 pieds) sous la barre transversale', 'Foot à 7 / Jeunes : 6 m × 2,10 m · Mini-buts EPS / Futsal : 3 m × 2 m'],
      ['Surface de réparation & Pénalty', '16,50 m de profondeur × 40,32 m de largeur · Point de pénalty à 11 m · Arc de cercle à 9,15 m', 'En Foot à 7 : surface à 13 m et point de pénalty à 9 m'],
      ['Le Ballon (Loi 2)', 'Taille 5 : Circonférence 68 à 70 cm · Poids : 410 à 450 g · Pression : 0,6 à 1,1 bar', 'Collège (1AC/2AC) : Taille 4 (63,5–66 cm, 350–390 g) pour faciliter la maîtrise technique'],
      ['Joueurs & Remplacements (Loi 3)', '11 contre 11 (minimum 7 joueurs sur le terrain pour continuer le match) · 5 remplacements en 3 fenêtres (compétition pro)', 'En EPS & ASS : effectif réduit 5c5, 7c7 ou 8c8 avec remplacements volants illimités dans la zone dédiée'],
      ['Durée du match (Loi 7)', '2 × 45 minutes + mi-temps de 15 min max (Prolongation : 2 × 15 min)', 'ASS Collège : 2 × 20 ou 25 min · En séance EPS : rotations de 6 à 10 minutes']
    ],
    lawsSummary: [
      {
        title: 'Lois 1 à 4 : Terrain, Ballon, Joueurs et Équipement',
        content: 'Toutes les lignes (12 cm de largeur max) font partie intégrante de la surface qu\'elles délimitent : un ballon sur la ligne est donc en jeu, et une faute commise sur la ligne de la surface de réparation entraîne un pénalty. Chaque équipe aligne 11 joueurs max dont 1 gardien. Si une équipe tombe à moins de 7 joueurs (après exclusions ou blessures), le match est arrêté. Les protège-tibias sont obligatoires sous les chaussettes ; tout bijou (bague, montre, bracelet) est strictement interdit (même recouvert de sparadrap).'
      },
      {
        title: 'Lois 5 à 10 : Corps arbitral, Durée, Engagement, Ballon en jeu et Issue du match',
        content: 'L\'arbitre central dispose d\'une autorité complète dès son entrée dans l\'enceinte jusqu\'à sa sortie. Le ballon n\'est hors du jeu que lorsqu\'il a entièrement franchi la ligne de but ou de touche, au sol ou en l\'air (et de même pour un but : il doit franchir entièrement la ligne entre les poteaux). Un but peut être marqué directement sur coup d\'envoi, coup de pied de but (6m) ou corner (dans le but adverse).'
      },
      {
        title: 'Loi 11 : Le Hors-Jeu (Critères exacts IFAB 2026)',
        content: 'Être en position de hors-jeu n\'est pas une infraction en soi. Un joueur est en position de hors-jeu s\'il est dans la moitié de terrain adverse et plus près de la ligne de but adverse que le ballon et l\'avant-dernier adversaire (généralement le gardien + 1 défenseur). Les mains et les bras de tous les joueurs (y compris les gardiens) ne sont pas pris en compte pour juger la position (la limite est le bas de l\'aisselle). Il n\'y a JAMAIS de hors-jeu directement sur : une rentrée de touche, un coup de pied de but (6m) ou un coup de pied de coin (corner).'
      },
      {
        title: 'Loi 12 : Fautes, Mains et Incorrections (Cartons)',
        content: 'Coup franc direct (ou pénalty si dans sa propre surface) pour : charger, sauter sur, donner un coup de pied, bousculer, frapper, tacler, faire trébucher, tenir un adversaire, cracher/mordre, ou commettre une faute de main délibérée (ou agrandir artificiellement la surface de son corps avec le bras). Coup franc indirect pour : jeu dangereux sans contact (pied haut), faire obstacle à la progression sans contact, ou lorsque le gardien reprend de la main une passe volontaire du pied d\'un coéquipier ou une rentrée de touche directe d\'un coéquipier.'
      },
      {
        title: 'Nouveautés Réglementaires IFAB 2025/2026 à connaître absolument',
        content: '1) Règle des 8 secondes du gardien : le gardien qui contrôle le ballon avec ses mains/bras dispose désormais de 8 secondes maximum pour le lâcher (l\'arbitre effectue un décompte visuel de la main pour les 5 dernières secondes) ; en cas de dépassement, la sanction est un corner (coup de pied de coin) accordé à l\'équipe adverse (et non plus un coup franc indirect). 2) Dialogue réservé au capitaine : seul le capitaine (identifié par son brassard) est autorisé à s\'approcher de l\'arbitre pour demander l\'explication d\'une décision majeure ; tout autre joueur qui conteste ou entoure l\'arbitre reçoit un carton jaune. 3) Remplacement supplémentaire permanent en cas de commotion cérébrale.'
      }
    ],
    refereeSignals: [
      {
        code: 'Loi 5 · Signal 1',
        name: 'Avantage (Laisser jouer)',
        when: 'L\'équipe victime d\'une faute conserve une occasion favorable d\'attaque.',
        how: 'L\'arbitre tend un bras ou les deux bras vers l\'avant (hauteur de poitrine, paumes vers le haut) dans le sens de l\'attaque tout en continuant sa course.',
        svgType: 'advantage_both_arms'
      },
      {
        code: 'Loi 5 · Signal 2',
        name: 'Coup Franc Direct (CFD)',
        when: 'Faute avec contact physique ou main sanctionnable hors de la surface.',
        how: 'Un coup de sifflet franc, puis un seul bras tendu horizontalement (30° vers le haut) pointant clairement dans la direction de l\'équipe qui bénéficie du coup franc.',
        svgType: 'point_horizontal'
      },
      {
        code: 'Loi 5 · Signal 3',
        name: 'Coup Franc Indirect (CFI)',
        when: 'Hors-jeu, jeu dangereux sans contact, passe en retrait au gardien reprise à la main.',
        how: 'Après avoir indiqué la direction, l\'arbitre lève un bras verticalement au-dessus de la tête (paume ouverte) et le maintient levé jusqu\'à ce que le ballon soit touché par un second joueur ou sorte du jeu.',
        svgType: 'one_arm_up'
      },
      {
        code: 'Loi 14 · Signal 4',
        name: 'Penalty (Coup de pied de réparation)',
        when: 'Infraction passible d\'un coup franc direct commise par un défenseur dans sa propre surface de réparation.',
        how: 'Coup de sifflet long et énergique ; l\'arbitre pointe résolument l\'index et le bras tendu à 45° vers le bas en direction de la marque de réparation (11 mètres).',
        svgType: 'point_penalty_down'
      },
      {
        code: 'Loi 12 · Signal 5',
        name: 'Carton Jaune (Avertissement) & Carton Rouge (Exclusion)',
        when: 'Comportement antisportif, contestation, antijeu (Jaune) ou faute grossière, anéantissement d\'occasion nette de but (DOGSO), 2e avertissement (Rouge).',
        how: 'L\'arbitre s\'arrête, regarde le joueur fautif et brandit le carton jaune ou rouge bras tendu bien haut au-dessus de la tête.',
        svgType: 'card_up'
      },
      {
        code: 'Loi 12 · Signal 6',
        name: 'Décompte des 5 dernières secondes du Gardien (Règle des 8s)',
        when: 'Le gardien conserve le ballon en mains depuis plus de 3 secondes (nouveauté IFAB 2025/2026).',
        how: 'L\'arbitre lève un bras et effectue un décompte visuel clair de 5 à 0 avec ses doigts. Au-delà de 8s : coup de sifflet et bras pointant le poteau de corner.',
        svgType: 'five_fingers_up'
      },
      {
        code: 'Loi 16 & 17 · Signal 7',
        name: 'Coup de pied de but (6m) vs Corner',
        when: 'Le ballon franchit entièrement la ligne de but (touché en dernier par un attaquant = 6m ; par un défenseur = corner).',
        how: 'Pour les 6m : bras tendu horizontalement vers la surface de but. Pour le corner : bras tendu pointant vers le drapeau de coin le plus proche.',
        svgType: 'point_corner_up'
      },
      {
        code: 'Loi 6 · Signal 8 (Assistant)',
        name: 'Hors-Jeu (Arbitre Assistant au drapeau)',
        when: 'Un joueur en position de hors-jeu intervient dans le jeu ou tire avantage de sa position.',
        how: 'Premier temps : l\'assistant lève le drapeau verticalement (bras tendu). Après le coup de sifflet de l\'arbitre : il incline le drapeau à 45° vers le haut (hors-jeu lointain), à l\'horizontale (milieu) ou à 45° vers le bas (hors-jeu proche).',
        svgType: 'flag_up_assistant'
      },
      {
        code: 'Loi 6 · Signal 9 (Assistant)',
        name: 'Rentrée de Touche (Arbitre Assistant)',
        when: 'Le ballon franchit entièrement la ligne de touche au sol ou en l\'air.',
        how: 'L\'arbitre assistant lève le drapeau à 45° au-dessus de l\'horizontale du côté de la direction d\'attaque de l\'équipe bénéficiaire.',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'Loi 5 · Signal 10',
        name: 'Zone réservée au Capitaine (« Captain Only »)',
        when: 'Plusieurs joueurs s\'approchent pour contester une décision arbitrale (Directive IFAB 2025/2026).',
        how: 'L\'arbitre croise les deux avant-bras devant lui puis tend les paumes vers l\'extérieur pour inviter les joueurs autres que le capitaine à reculer à au moins 4 mètres.',
        svgType: 'cross_arms_stop'
      }
    ],
    epsAdaptationTable: [
      ['Dimensions & Effectif', '11 contre 11 sur 105 × 68 m', 'Collège (OP 2009) : 5c5 ou 6c6 sur terrain de Handball (40×20 m) ou demi-terrain', 'Lycée (OP 2007) : 7c7 (sur demi-terrain) ou 5c5 en Futsal selon les installations'],
      ['Règle du Hors-Jeu', 'Hors-jeu sur toute la moitié de terrain adverse', 'Pas de hors-jeu en 5c5 (pour favoriser les appels en profondeur et la continuité)', 'En 7c7 Lycée : hors-jeu uniquement dans la zone des 13 derniers mètres'],
      ['Rentrée de Touche', 'À la main (les deux pieds au sol derrière ou sur la ligne)', 'Au pied (passe au sol) en 1AC/2AC ou sur terrain bétonné pour accélérer la remise en jeu', 'À la main ou au pied avec règle des 4 secondes pour éviter les pertes de temps'],
      ['Tacles glissés & Contacts', 'Tacles glissés autorisés s\'ils sont contrôlés sur le ballon', 'Tacles glissés strictement INTERDITS sur terrain scolaire en béton/bitume (sécurité)', 'Défense exclusivement debout (« cadrer-intercepter » sans charge violente)'],
      ['Sanctions disciplinaires', 'Carton Jaune / Carton Rouge définitif', 'Exclusion temporaire pédagogique de 2 minutes (remplacement par un coéquipier ou infériorité)', 'Exclusion temporaire 2 min + passage obligatoire au poste d\'arbitre/observateur']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions exactes d\'un but de football officiel (Loi 1 IFAB) ?',
        a: 'La distance entre l\'intérieur des deux poteaux est de 7,32 mètres (8 yards) et la hauteur entre le sol et le bord inférieur de la barre transversale est de 2,44 mètres (8 pieds). Les poteaux et la barre ont une largeur/épaisseur identique ne dépassant pas 12 cm.'
      },
      {
        q: '2. Que dit la nouvelle règle IFAB 2025/2026 lorsque le gardien garde le ballon en main plus de 8 secondes ?',
        a: 'Depuis l\'amendement IFAB 2025/2026 de la Loi 12, le gardien dispose de 8 secondes maximum (avec décompte visuel de l\'arbitre sur les 5 dernières secondes). S\'il dépasse les 8 secondes, l\'arbitre siffle et accorde un coup de pied de coin (corner) à l\'équipe adverse (et non plus un coup franc indirect).'
      },
      {
        q: '3. Sur quelles remises en jeu un joueur ne peut-il JAMAIS être sanctionné pour hors-jeu ?',
        a: 'Conformément à la Loi 11, il n\'y a pas d\'infraction de hors-jeu si un joueur reçoit le ballon directement sur : 1) un coup de pied de but (6 mètres), 2) une rentrée de touche, ou 3) un coup de pied de coin (corner).'
      },
      {
        q: '4. Un joueur tire directement un coup d\'envoi et le ballon entre dans le but adverse sans être touché. Décision ?',
        a: 'Le but est VALIDE (Loi 8). En revanche, si un joueur marque directement contre son camp sur son propre coup d\'envoi, le but n\'est pas accordé : l\'arbitre donne un corner à l\'équipe adverse.'
      },
      {
        q: '5. À quelle distance minimale doit se placer le mur adverse lors d\'un coup franc et d\'une rentrée de touche ?',
        a: 'Lors d\'un coup franc (ou corner/coup d\'envoi), les adversaires doivent se trouver à au moins 9,15 mètres (10 yards) du ballon. Lors d\'une rentrée de touche (Loi 15), tous les adversaires doivent se tenir à au moins 2 mètres du point de la ligne de touche où elle est exécutée.'
      },
      {
        q: '6. Quel est le nombre minimal de joueurs requis par équipe pour qu\'un match de football à 11 puisse débuter ou se poursuivre ?',
        a: 'Selon la Loi 3 de l\'IFAB, un match ne peut ni commencer ni se poursuivre si l\'une des équipes compte moins de 7 joueurs sur le terrain.'
      },
      {
        q: '7. Quelle est la circonférence et la masse réglementaires d\'un ballon de football Taille 5 ?',
        a: 'Selon la Loi 2, le ballon Taille 5 a une circonférence comprise entre 68 cm et 70 cm, une masse comprise entre 410 g et 450 g au début du match, et une pression de 0,6 à 1,1 atmosphère (600 à 1 100 g/cm²).'
      },
      {
        q: '8. Lors d\'un coup de pied de réparation (pénalty), où doit se trouver le gardien de but au moment de la frappe ?',
        a: 'Selon la Loi 14, le gardien doit rester sur sa ligne de but, face au tireur, entre les poteaux, sans toucher les poteaux, la barre transversale ni le filet, et avoir au moins une partie d\'un pied qui touche la ligne de but (ou se trouve au-dessus ou derrière celle-ci) au moment où le ballon est botté.'
      },
      {
        q: '9. Quelle est la répartition des points de la note EPS en Football selon les OP 2009 (Collège) et OP 2007 (Lycée) au Maroc ?',
        a: 'Au Collège (OP 2009) en sports collectifs : Habiletés motrices / Produit & Processus = 12 pts (6 pts individuel + 6 pts collectif), Connaissances réglementaires = 3 pts, Comportements et attitudes (arbitrage, fair-play) = 5 pts. Au Lycée (OP 2007) : Habiletés motrices = 14 pts (TC), 13 pts (1Bac) ou 12 pts (2Bac), Connaissances = 3 pts, Attitudes/Rôles sociaux = 3 pts (TC), 4 pts (1Bac) ou 5 pts (2Bac).'
      },
      {
        q: '10. Sur une rentrée de touche, un joueur envoie directement le ballon dans le but adverse sans que personne ne le touche. Décision ?',
        a: 'Le but est REFUSÉ (Loi 15) : on ne peut pas marquer directement sur une rentrée de touche. Le jeu reprend par un coup de pied de but (6m) pour l\'équipe adverse (et par un corner si le ballon entre directement dans le propre but du lanceur).'
      }
    ],
    fieldExperience: {
      context: '📍 Tournoi interclasses Collège & Lycée · Terrain bitumé 40×20 m · Formation des élèves-arbitres',
      reality: 'En séance d\'EPS au Maroc, 90 % des conflits entre élèves en football viennent de deux choses : les fautes de main contestées (« c\'est involontaire monsieur ! ») et les tacles dangereux sur le goudron.',
      tip: 'Dès la séance 1, j\'affiche les 6 gestes d\'arbitrage fondamentaux au mur du vestiaire et j\'applique deux règles d\'or non négociables en EPS : 1) « Tout tacle glissé au sol = coup franc + exclusion temporaire de 2 minutes » (sécurité absolue sur terrain dur) ; 2) « Seul le capitaine porteur du brassard jaune a le droit d\'adresser la parole à l\'élève-arbitre » (application directe de la directive IFAB 2025/2026). L\'élève-arbitre qui siffle ET réalise le geste codifié du bras obtient 3/3 en connaissances et rôles sociaux.'
    }
  },

  // ============================================================================
  // 2. FUTSAL (FIFA FUTSAL LAWS OF THE GAME 2025-2026)
  // ============================================================================
  {
    id: 'futsal',
    slug: 'reglement-futsal-fifa-arbitrage-eps.html',
    relatedArticle: 'article-football-eps.html',
    relatedCycleCollege: 'cycle-football-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-football-lycee-eps-maroc.html',
    sportName: 'Futsal (Football en Salle 5×5)',
    shortTitle: 'Règlement Futsal (Lois FIFA 2026) & Gestes d\'Arbitrage',
    title: 'Règlement Officiel du Futsal (Lois du Jeu FIFA 2026), Terrain 40×20m, Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Guide complet du règlement Futsal FIFA 2025-2026 pour l\'EPS et l\'ASS au Maroc : terrain 40x20m, règle des 4 secondes, fautes cumulées (jet franc à 10m), gardien volant, gestes d\'arbitrage illustrés et PDF officiel FIFA.',
    badge: '🥅 Règlement Officiel FIFA Futsal 2025/2026 & Arbitrage',
    federation: 'FIFA (Lois du Jeu du Futsal) / FRMF Maroc',
    lawVersion: 'Lois du Jeu du Futsal FIFA 2025/2026',
    datePublished: '2026-10-27',
    dateLabel: '27 Octobre 2026',
    readTime: '26 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Lois du Jeu du Futsal FIFA 2025/2026 (PDF Officiel)',
        org: 'FIFA — Fédération Internationale de Football Association',
        url: 'https://inside.fifa.com/fr/legal/documents',
        note: 'Texte officiel complet des 17 Lois du Jeu du Futsal de la FIFA + Guide des signaux des arbitres de Futsal.'
      },
      {
        label: 'Centre de Ressources Techniques Futsal FIFA',
        org: 'FIFA Training Centre — Futsal',
        url: 'https://www.fifatrainingcentre.com/fr/game/futsal/',
        note: 'Analyses tactiques, arbitrage et développement du Futsal (où l\'Équipe Nationale du Maroc est triple championne d\'Afrique et top mondial).'
      },
      {
        label: 'FRMF — Département Futsal & Compétitions Nationales',
        org: 'Fédération Royale Marocaine de Football',
        url: 'https://frmf.ma/fr/statuts-et-reglements/',
        note: 'Règlements officiels du championnat national de Futsal au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Futsal FIFA 40m x 20m">
        <rect width="800" height="460" fill="#0f172a"/>
        <!-- Surface de jeu 40m x 20m -->
        <rect x="60" y="50" width="680" height="340" fill="#0284c7" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Ligne médiane & Cercle central R=3m -->
        <line x1="400" y1="50" x2="400" y2="390" stroke="#ffffff" stroke-width="3"/>
        <circle cx="400" cy="220" r="51" fill="none" stroke="#ffffff" stroke-width="3"/>
        <circle cx="400" cy="220" r="4" fill="#ffffff"/>
        <!-- Surface de réparation gauche (Arcs R=6m) -->
        <path d="M 60 112 L 105 112 A 102 102 0 0 1 207 220 A 102 102 0 0 1 105 328 L 60 328" fill="rgba(255,255,255,0.1)" stroke="#ffffff" stroke-width="3"/>
        <!-- Point de pénalty 6m & Second point de pénalty 10m gauche -->
        <circle cx="162" cy="220" r="4.5" fill="#fde047"/>
        <circle cx="230" cy="220" r="4.5" fill="#f87171"/>
        <!-- Marque des 5m du gardien -->
        <line x1="145" y1="214" x2="145" y2="226" stroke="#ffffff" stroke-width="2.5"/>
        <!-- But gauche 3m x 2m -->
        <rect x="40" y="194" width="20" height="52" fill="none" stroke="#f87171" stroke-width="3.5"/>
        <!-- Surface de réparation droite (Arcs R=6m) -->
        <path d="M 740 112 L 695 112 A 102 102 0 0 0 593 220 A 102 102 0 0 0 695 328 L 740 328" fill="rgba(255,255,255,0.1)" stroke="#ffffff" stroke-width="3"/>
        <circle cx="638" cy="220" r="4.5" fill="#fde047"/>
        <circle cx="570" cy="220" r="4.5" fill="#f87171"/>
        <line x1="655" y1="214" x2="655" y2="226" stroke="#ffffff" stroke-width="2.5"/>
        <rect x="740" y="194" width="20" height="52" fill="none" stroke="#f87171" stroke-width="3.5"/>
        <!-- Zones de remplacement (de 5m à 10m de la ligne médiane) -->
        <line x1="230" y1="42" x2="230" y2="58" stroke="#fde047" stroke-width="3"/>
        <line x1="315" y1="42" x2="315" y2="58" stroke="#fde047" stroke-width="3"/>
        <line x1="485" y1="42" x2="485" y2="58" stroke="#fde047" stroke-width="3"/>
        <line x1="570" y1="42" x2="570" y2="58" stroke="#fde047" stroke-width="3"/>
        <!-- Annotations -->
        <g font-family="Inter, sans-serif" font-size="12.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">LONGUEUR : 40 m (Compétition internationale : 38 à 42 m) — Identique au terrain de Handball EPS</text>
          <text x="24" y="220" transform="rotate(-90 24 220)" fill="#fde047">LARGEUR : 20 m (18 à 25 m)</text>
          <text x="272" y="38" font-size="11" fill="#fde047">Zone remplacement (5 m)</text>
          <text x="527" y="38" font-size="11" fill="#fde047">Zone remplacement (5 m)</text>
          <text x="400" y="158">Cercle R = 3 m</text>
          <text x="162" y="205" fill="#fde047" font-size="11">Pénalty : 6 m</text>
          <text x="230" y="242" fill="#fca5a5" font-size="11">2e Pénalty : 10 m</text>
          <text x="400" y="425" fill="#ffffff">But : 3,00 m × 2,00 m | Surface : 6 m | Fautes cumulées : Jet franc direct à 10 m dès la 6e faute d'équipe</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Loi 1)', '40 m × 20 m (Matches internationaux : Longueur 38–42 m, Largeur 20–25 m)', '100 % compatible avec tous les terrains de Handball des collèges et lycées marocains !'],
      ['Dimensions des buts', 'Largeur : 3,00 m · Hauteur : 2,00 m (Poteaux et barre de 8 cm d\'épaisseur)', 'Identiques aux buts de Handball scolaires'],
      ['Points de pénalty', '1er point de pénalty : à 6 m · 2e point de pénalty (6e faute cumulée) : à 10 m', 'Marques de 5 m de part et d\'autre du point des 10 m'],
      ['Le Ballon de Futsal (Loi 2)', 'Taille 4 à rebond contrôlé : Circonférence 62 à 64 cm · Poids : 400 à 440 g', 'Premier rebond compris entre 50 cm et 65 cm lorsqu\'il est lâché de 2 m de hauteur'],
      ['Joueurs & Remplacements (Loi 3)', '5 joueurs sur le terrain (4 joueurs de champ + 1 gardien) et jusqu\'à 9 remplaçants', 'Remplacements volants illimités dans la zone de 5 m sans arrêter le chronomètre'],
      ['Durée & Temps Morts (Loi 7)', '2 × 20 minutes en temps effectif (chronomètre arrêté à chaque sortie/faute) + 1 temps mort d\'1 min par équipe et par mi-temps', 'En ASS / EPS : 2 × 12 ou 15 min (temps continu ou semi-effectif)']
    ],
    lawsSummary: [
      {
        title: 'Pourquoi le Futsal est l\'APS reine dans les établissements marocains',
        content: 'Au Maroc, porté par le rayonnement mondial des Lions de l\'Atlas de Futsal (Hicham Dguig) et par le fait que 95 % des collèges et lycées disposent d\'un plateau de Handball de 40 m × 20 m avec des buts de 3 m × 2 m, le Futsal est la forme de pratique la plus adaptée en EPS et en ASS. Le ballon taille 4 à faible rebond reste au sol, multiplie par 3 le nombre de contacts par élève et favorise la maîtrise technique des filles comme des garçons.'
      },
      {
        title: 'La Règle des 4 Secondes (Touche au pied, Corner, Coup franc et Gardien)',
        content: 'En Futsal FIFA, le joueur dispose de 4 secondes maximum (décomptées visuellement par l\'arbitre bras levé) pour exécuter : 1) une rentrée de touche (qui se fait obligatoirement AU PIED, ballon immobile sur la ligne), 2) un coup de pied de coin (corner), 3) un coup franc, ou 4) une sortie de balle du gardien (dégagement de but) et tout contrôle du ballon par le gardien (à la main ou au pied) dans sa propre moitié de terrain. Si les 4 secondes sont dépassées : coup franc indirect pour l\'adversaire (ou touche donnée à l\'adversaire sur rentrée de touche).'
      },
      {
        title: 'Les Fautes Cumulées et le Jet Franc Direct à 10 mètres (Loi 13)',
        content: 'Toutes les fautes sanctionnées d\'un coup franc direct sont comptabilisées par la table de marque à chaque mi-temps (compteur remis à zéro à la pause, mais conservé en prolongation). Les 5 premières fautes donnent lieu à un coup franc direct classique avec mur à 5 mètres. Dès la 6e faute cumulée (et toutes les suivantes), l\'équipe adverse bénéficie d\'un coup franc direct SANS MUR tiré depuis le 2e point de pénalty à 10 mètres (ou depuis le lieu de la faute si elle est commise entre les 6m et les 10m) : le tireur doit tirer directement au but et le gardien doit rester à au moins 5 mètres du ballon jusqu\'au tir.'
      },
      {
        title: 'Règles spécifiques au Gardien de But & Power Play',
        content: 'Une fois que le gardien a joué le ballon dans son camp, il ne peut plus le retoucher dans sa propre moitié de terrain suite à une passe volontaire d\'un coéquipier tant que le ballon n\'a pas été touché par un adversaire (sinon : coup franc indirect à 6m). En revanche, le gardien est libre de jouer dans la moitié de terrain adverse sans limite des 4 secondes (tactique du « Gardien Volant / Power Play » à 5 contre 4).'
      },
      {
        title: 'Absence de Hors-Jeu, Distance du Mur (5m) et Exclusion de 2 minutes',
        content: 'Il n\'y a AUCUN hors-jeu en Futsal. Sur toutes les remises en jeu (touche, corner, coup franc, coup d\'envoi), les adversaires doivent se placer à au moins 5 mètres du ballon. Lorsqu\'un joueur reçoit un carton rouge, il est définitivement exclu du match et son équipe joue en infériorité numérique (4 contre 5) pendant 2 minutes effectives, sauf si elle encaisse un but avant la fin des 2 minutes (auquel cas un 5e joueur remplaçant peut entrer immédiatement).'
      }
    ],
    refereeSignals: [
      {
        code: 'Futsal · Signal 1',
        name: 'Décompte des 4 Secondes',
        when: 'Sur chaque touche au pied, corner, coup franc, sortie de but ou contrôle du gardien dans son camp.',
        how: 'L\'arbitre lève verticalement un bras au-dessus de la tête et déplie successivement les 4 doigts (1, 2, 3, 4) de manière bien visible pour les joueurs.',
        svgType: 'four_fingers_up'
      },
      {
        code: 'Futsal · Signal 2',
        name: 'Faute Cumulée (Signal à la Table de Marque)',
        when: 'Après chaque coup franc direct sifflé (ou après la fin d\'un avantage sur faute directe).',
        how: 'Après avoir indiqué la direction du coup franc d\'un bras, l\'arbitre pointe l\'index de l\'autre main vers le sol à 45° en direction de la table de marque pour faire enregistrer la faute cumulée.',
        svgType: 'accumulated_foul'
      },
      {
        code: 'Futsal · Signal 3',
        name: '5e Faute Cumulée d\'Équipe',
        when: 'Une équipe atteint sa 5e faute cumulée de la mi-temps (dernière faute avant le jet franc à 10m sans mur).',
        how: 'La table de marque lève le panneau rouge « 5 fautes » et l\'arbitre montre la main ouverte (5 doigts) vers les bancs.',
        svgType: 'five_fingers_up'
      },
      {
        code: 'Futsal · Signal 4',
        name: 'Temps Mort (Time-Out — 1 minute)',
        when: 'Demandé par l\'entraîneur auprès du chronométreur lorsque son équipe a la possession du ballon hors du jeu.',
        how: 'L\'arbitre forme la lettre « T » en plaçant la paume d\'une main à plat sur le bout des doigts verticaux de l\'autre main.',
        svgType: 'timeout_t'
      },
      {
        code: 'Futsal · Signal 5',
        name: 'Coup Franc Direct vs Coup Franc Indirect',
        when: 'CFD : contact/main (faute cumulée). CFI : 4 secondes dépassées, 2e touche du gardien dans son camp, jeu dangereux.',
        how: 'CFD : un bras à l\'horizontale dans le sens de l\'attaque. CFI : l\'autre bras levé verticalement au-dessus de la tête jusqu\'à ce que le ballon soit touché par un 2e joueur.',
        svgType: 'one_arm_up'
      },
      {
        code: 'Futsal · Signal 6',
        name: 'Avantage en Futsal (1 ou 2 bras)',
        when: 'Une équipe subit une faute mais conserve le ballon dans une situation offensive avantageuse.',
        how: 'L\'arbitre tend les deux bras en avant (paumes vers le haut) ; dès l\'arrêt de jeu suivant, il signale la faute cumulée à la table de marque.',
        svgType: 'advantage_both_arms'
      },
      {
        code: 'Futsal · Signal 7',
        name: 'Jet Franc Direct aux 10 mètres (6e faute cumulée)',
        when: 'Une équipe commet sa 6e faute directe (ou plus) au cours de la même période.',
        how: 'L\'arbitre siffle, désigne le second point de réparation à 10 mètres et fait reculer tous les joueurs derrière la ligne imaginaire du ballon (aucun mur autorisé).',
        svgType: 'point_penalty_down'
      },
      {
        code: 'Futsal · Signal 8',
        name: 'Rentrée de Touche au Pied (Direction)',
        when: 'Le ballon franchit entièrement la ligne de touche ou touche le plafond de la salle.',
        how: 'L\'arbitre tend le bras à l\'horizontale dans la direction de l\'équipe bénéficiaire, puis lève l\'autre bras pour lancer le décompte des 4 secondes.',
        svgType: 'point_horizontal'
      },
      {
        code: 'Futsal · Signal 9',
        name: 'Arrêt du Chronomètre (Temps Effectif)',
        when: 'Blessure, demande d\'arrêt du temps, avertissement ou remplacement litigieux.',
        how: 'L\'arbitre croise les deux poignets au-dessus de la tête en regardant le chronométreur à la table de marque.',
        svgType: 'cross_arms_stop'
      },
      {
        code: 'Futsal · Signal 10',
        name: 'But Validé en Futsal',
        when: 'Le ballon a franchi entièrement la ligne de but entre les poteaux de 3m × 2m.',
        how: 'L\'arbitre donne un coup de sifflet net et pointe le bras tendu vers le rond central tout en reculant vers le milieu de terrain.',
        svgType: 'point_corner_up'
      }
    ],
    epsAdaptationTable: [
      ['Chronométrage', '2 × 20 min en temps effectif (arrêté à chaque sortie)', 'En EPS Collège (OP 2009) : matchs de 7 à 10 min en temps continu + règle des 4s', 'En Lycée (OP 2007) : 2 × 8 min avec élève-chronométreur à la table de marque'],
      ['Fautes cumulées', 'Jet franc sans mur à 10m dès la 6e faute cumulée', 'En EPS (match court de 8 min) : Jet franc sans mur à 9m ou 10m dès la 4e faute d\'équipe !', 'Permet de responsabiliser immédiatement l\'équipe sur la propreté défensive'],
      ['Remplacements', 'Zone de remplacement de 5m devant les bancs', 'Rotation obligatoire toutes les 3 minutes pour équilibrer le temps de jeu de tous les élèves', 'Le joueur sortant doit taper dans la main du joueur entrant dans la zone de 5m'],
      ['Règle du Gardien', '4 secondes dans son camp + interdiction de 2e touche', 'Interdiction pour le gardien de dégager de volée au-delà de la ligne médiane en 1AC/2AC (relance courte obligatoire)', 'Autorisation du gardien volant en 1Bac/2Bac pour travailler le surnombre 5c4']
    ],
    crmefQuestions: [
      {
        q: '1. Quelle est la différence exacte entre un ballon de Football et un ballon de Futsal (Loi 2 FIFA) ?',
        a: 'Le ballon de Futsal est de Taille 4 (circonférence 62 à 64 cm, contre 68 à 70 cm en Foot Taille 5) avec un poids de 400 à 440 g et surtout une mousse interne à rebond réduit : lâché d\'une hauteur de 2 mètres, son premier rebond doit se situer entre 50 cm et 65 cm.'
      },
      {
        q: '2. À partir de quelle faute cumulée l\'équipe adverse tire-t-elle un jet franc direct sans mur à 10 mètres en Futsal ?',
        a: 'À partir de la 6e faute cumulée de la mi-temps (les 5 premières fautes donnent lieu à un coup franc direct avec mur autorisé à 5 mètres). Le compteur de fautes est remis à zéro à la mi-temps, mais les fautes de la 2e mi-temps continuent de courir pendant d\'éventuelles prolongations.'
      },
      {
        q: '3. À quelle distance minimale doivent se trouver les joueurs adverses sur une touche, un corner ou un coup franc en Futsal ?',
        a: 'À au moins 5 mètres du ballon (contre 9,15 m sur coup franc et 2 m sur touche en football à 11).'
      },
      {
        q: '4. Un joueur de Futsal peut-il marquer un but directement sur une rentrée de touche au pied ?',
        a: 'Non. Si le ballon entre directement dans le but adverse sur une rentrée de touche au pied sans être touché par aucun joueur, le but est refusé et le jeu reprend par une sortie de but (dégagement du gardien) pour l\'équipe adverse.'
      },
      {
        q: '5. Que se passe-t-il en Futsal lorsqu\'un joueur est expulsé (carton rouge) ?',
        a: 'Le joueur expulsé ne peut plus revenir en jeu ni s\'asseoir sur le banc. Son équipe joue à 4 contre 5 pendant 2 minutes effectives. Si l\'équipe en infériorité numérique encaisse un but avant l\'expiration des 2 minutes, un joueur remplaçant peut entrer immédiatement pour rétablir le 5 contre 5.'
      },
      {
        q: '6. Comment le gardien de but de Futsal remet-il le ballon en jeu lors d\'une sortie de but (sortie en ligne de fond) ?',
        a: 'En Futsal, la sortie de but s\'effectue exclusivement À LA MAIN (dégagement à la main) par le gardien depuis n\'importe quel point de sa surface de réparation (6m) dans un délai de 4 secondes. Le ballon est en jeu dès qu\'il est lâché et quitte les mains du gardien.'
      },
      {
        q: '7. Le hors-jeu existe-t-il en Futsal FIFA ?',
        a: 'Non, il n\'y a pas de hors-jeu en Futsal (Loi 11).'
      },
      {
        q: '8. Que fait l\'arbitre si le ballon touche le plafond du gymnase en plein match de Futsal ?',
        a: 'Le jeu est arrêté et reprend par une rentrée de touche au pied en faveur de l\'équipe adverse, exécutée sur la ligne de touche au point le plus proche de l\'endroit sous lequel le ballon a heurté le plafond.'
      },
      {
        q: '9. Combien de temps morts sont accordés en Futsal et qui peut les demander ?',
        a: 'Chaque équipe a droit à 1 temps mort d\'une durée de 1 minute par période (aucun temps mort en prolongation). Il n\'est accordé que lorsque le ballon est hors du jeu et que l\'équipe qui le demande est en possession de la remise en jeu.'
      },
      {
        q: '10. Quelle est la sanction si un remplacement volant est mal exécuté (le remplaçant entre avant que le joueur remplacé n\'ait franchi la ligne dans la zone de 5m) ?',
        a: 'Si le jeu est arrêté par l\'arbitre pour cette infraction, le joueur remplaçant reçoit un carton jaune (avertissement) et le jeu reprend par un coup franc indirect en faveur de l\'équipe adverse à l\'endroit où se trouvait le ballon.'
      }
    ],
    fieldExperience: {
      context: '📍 Compétition ASS Futsal & Cycles EPS Collège/Lycée · Plateau 40×20 m',
      reality: 'Sur les terrains marocains, les élèves ont le réflexe du football à 11 : ils veulent faire les touches à la main, prennent 15 secondes pour poser le ballon et se collent à 50 cm du tireur sur les touches.',
      tip: 'J\'impose systématiquement à l\'élève-arbitre de lever le bras bien haut et de compter à voix haute « UN, DEUX, TROIS, QUATRE ! » sur chaque touche au pied et chaque relance du gardien. Si un défenseur reste à moins de 5 mètres (soit environ 5 grands pas) sur une touche, l\'arbitre siffle immédiatement une faute cumulée. Dès la 4e faute cumulée d\'une équipe dans un match de 8 minutes, l\'adversaire obtient un tir franc direct sans mur à 9 mètres : je vous garantis que les fautes d\'antijeu disparaissent dès la 2e séance !'
    }
  },

  // ============================================================================
  // 3. RUGBY (WORLD RUGBY LAWS 2026 — XV, 7s & TAG/RUGBY SCOLAIRE)
  // ============================================================================
  {
    id: 'rugby',
    slug: 'reglement-rugby-world-rugby-arbitrage-eps.html',
    relatedArticle: 'article-rugby-eps-maroc.html',
    relatedCycleCollege: 'article-rugby-eps-maroc.html',
    relatedCycleLycee: 'article-rugby-eps-maroc.html',
    sportName: 'Rugby (XV, Rugby à 7 & Rugby Scolaire EPS)',
    shortTitle: 'Règlement Rugby (Lois World Rugby 2026) & Arbitrage',
    title: 'Règlement Officiel du Rugby (Lois World Rugby 2026), Terrain, Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Rugby conforme aux Lois du Jeu World Rugby 2026 : dimensions du terrain, en-avant, hors-jeu, plaquage sécurisé en EPS, gestes d\'arbitrage illustrés, adaptation Maroc et PDF officiel World Rugby.',
    badge: '🏉 Règlement Officiel World Rugby 2026 & Arbitrage',
    federation: 'World Rugby / Rugby Afrique / FRMR (Fédération Royale Marocaine de Rugby)',
    lawVersion: 'Règles du Jeu World Rugby 2026 (XV, Sevens & Scolaire)',
    datePublished: '2026-10-27',
    dateLabel: '27 Octobre 2026',
    readTime: '27 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger le Livre des Règles du Jeu World Rugby 2026 (PDF Français)',
        org: 'World Rugby Passport — Laws of the Game',
        url: 'https://www.world.rugby/the-game/laws/home',
        note: 'Texte officiel intégral en français des Règles du Jeu World Rugby, variations Rugby à 7 (Sevens), U19 et Guide complet des signaux des arbitres.'
      },
      {
        label: 'Guide des Signaux d\'Arbitrage World Rugby (Officiel)',
        org: 'World Rugby — Match Officials Signals',
        url: 'https://www.world.rugby/the-game/laws/signals/primary',
        note: 'Référentiel officiel des gestes primaires et secondaires de l\'arbitre de Rugby.'
      },
      {
        label: 'Programme Rugby Ready & Sécurité du Plaquage (World Rugby)',
        org: 'World Rugby Passport',
        url: 'https://passport.world.rugby/fr/prevention-des-blessures-et-gestion-medicale/rugby-ready/',
        note: 'Protocoles de sécurité pour l\'initiation scolaire au contact, au plaquage bas et aux postures en mêlée.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 480" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Rugby World Rugby 100m x 70m">
        <rect width="800" height="480" fill="#14532d"/>
        <!-- En-buts gauche et droit (10 à 22m) -->
        <rect x="45" y="45" width="75" height="390" fill="#166534" stroke="#ffffff" stroke-width="3"/>
        <rect x="680" y="45" width="75" height="390" fill="#166534" stroke="#ffffff" stroke-width="3"/>
        <!-- Champ de jeu 100m x 70m -->
        <rect x="120" y="45" width="560" height="390" fill="#15803d" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Ligne médiane (50m) -->
        <line x1="400" y1="45" x2="400" y2="435" stroke="#ffffff" stroke-width="3"/>
        <!-- Lignes des 22 mètres (traits pleins) -->
        <line x1="243" y1="45" x2="243" y2="435" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="557" y1="45" x2="557" y2="435" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Lignes des 10 mètres (pointillés) -->
        <line x1="344" y1="45" x2="344" y2="435" stroke="#ffffff" stroke-width="2" stroke-dasharray="10,8"/>
        <line x1="456" y1="45" x2="456" y2="435" stroke="#ffffff" stroke-width="2" stroke-dasharray="10,8"/>
        <!-- Lignes des 5m devant l'en-but (pointillés) -->
        <line x1="148" y1="45" x2="148" y2="435" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="8,8"/>
        <line x1="652" y1="45" x2="652" y2="435" stroke="#ffffff" stroke-width="1.8" stroke-dasharray="8,8"/>
        <!-- Couloirs des 5m et 15m parallèles aux touches -->
        <line x1="120" y1="73" x2="680" y2="73" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10,10"/>
        <line x1="120" y1="129" x2="680" y2="129" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10,10"/>
        <line x1="120" y1="407" x2="680" y2="407" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10,10"/>
        <line x1="120" y1="351" x2="680" y2="351" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10,10"/>
        <!-- Poteaux en H sur la ligne de but -->
        <g stroke="#fde047" stroke-width="4">
          <line x1="120" y1="215" x2="120" y2="265"/>
          <line x1="95" y1="215" x2="120" y2="215"/>
          <line x1="95" y1="265" x2="120" y2="265"/>
          <line x1="680" y1="215" x2="680" y2="265"/>
          <line x1="680" y1="215" x2="705" y2="215"/>
          <line x1="680" y1="265" x2="705" y2="265"/>
        </g>
        <!-- Annotations -->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">CHAMP DE JEU : 94 à 100 m max · EN-BUTS : 6 à 22 m chacun (Longueur totale max : 144 m)</text>
          <text x="20" y="240" transform="rotate(-90 20 240)" fill="#fde047">LARGEUR : 68 à 70 m</text>
          <text x="82" y="240" transform="rotate(-90 82 240)" fill="#bbf7d0">EN-BUT (6 à 22 m)</text>
          <text x="718" y="240" transform="rotate(-90 718 240)" fill="#bbf7d0">EN-BUT (6 à 22 m)</text>
          <text x="243" y="240" fill="#fde047">Ligne 22 m</text>
          <text x="557" y="240" fill="#fde047">Ligne 22 m</text>
          <text x="344" y="240" font-size="11">10 m</text>
          <text x="456" y="240" font-size="11">10 m</text>
          <text x="400" y="205">Ligne médiane (50 m)</text>
          <text x="400" y="462" fill="#fde047">Poteaux en H : Écartement 5,60 m · Barre transversale à 3,00 m du sol · Hauteur poteaux > 3,40 m</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Règle 1)', 'Champ de jeu : 94 à 100 m de long × 68 à 70 m de large · Deux en-buts de 6 à 22 m de profondeur', 'En EPS Maroc : terrain réduit engazonné ou stabilisé de 40×20 m à 60×35 m avec en-buts de 5 m (plots souples)'],
      ['Les Poteaux de But en H', 'Écartement intérieur entre les poteaux : 5,60 m · Barre transversale à 3,00 m du sol · Hauteur minimale des poteaux : 3,40 m', 'En EPS : l\'essai (aplatir le ballon dans l\'en-but) est le mode de marque principal sans obligation de poteaux en H'],
      ['Le Ballon Ovale (Règle 2)', 'Ballon à 4 panneaux (Taille 5) : Longueur 28 à 30 cm · Poids : 410 à 460 g', 'Collège (1AC–3AC) : Taille 4 pour faciliter la prise à deux mains et la passe vissée/torpille'],
      ['Effectifs selon la variante', 'Rugby à XV : 15 joueurs · Rugby à 7 (Olympique / Sevens) : 7 joueurs · Rugby Scolaire : 5c5 à 8c8', 'En EPS : Tag Rugby (foulards/scratchs) ou Touch Rugby en début de cycle, puis plaquage bas à la taille'],
      ['Durée du match (Règle 5)', 'Rugby à XV : 2 × 40 min (U19/Scolaire : 2 × 35 min max) · Rugby à 7 : 2 × 7 min', 'En EPS : séquences intenses de 2 × 5 min ou 2 × 6 min'],
      ['Système de décompte des points (Règle 8)', 'Essai (et Essai de pénalité) : 5 pts (Essai de pénalité = 7 pts directs sans transformation) · Transformation : 2 pts · Pénalité : 3 pts · Drop-goal : 3 pts', 'En EPS : Essai = 5 pts (ou bonus à 10 pts si marqué après 4 passes ou par une élève en mixité)']
    ],
    lawsSummary: [
      {
        title: 'La Logique Interne Fondamentale du Rugby (Le Paradoxe Moteur)',
        content: 'En didactique de l\'EPS, le rugby est le seul sport collectif de combat et de démarquage où la cible (l\'en-but adverse) est située EN AVANT, mais où la passe à la main ne peut s\'effectuer QUE VERS L\'ARRIÈRE (ou sur la même ligne horizontale). Le gagne-terrain ne peut donc se faire que par la course balle en main (combat/évitement) ou par le jeu au pied vers l\'avant (pour les partenaires situés derrière le botteur au moment de la frappe).'
      },
      {
        title: 'L\'En-Avant (Knock-on) et la Passe en Avant (Throw forward — Règle 11)',
        content: 'Il y a « En-avant » lorsqu\'un joueur perd la possession du ballon et que celui-ci va vers la ligne de ballon mort adverse et touche le sol ou un autre joueur avant que le joueur d\'origine ait pu le récupérer. Il y a « Passe en avant » lorsqu\'un joueur lance ou passe le ballon vers la ligne de ballon mort adverse. Sanction pour un en-avant ou une passe en avant involontaire : Mêlée ordonnée avec introduction à l\'équipe non fautive (si l\'en-avant est volontaire : coup de pied de pénalité).'
      },
      {
        title: 'Le Hors-Jeu en Rugby (Jeu courant, Ruck, Maul, Mêlée et Touche)',
        content: 'Dans le jeu courant, un joueur est hors-jeu s\'il se trouve devant un coéquipier qui porte le ballon ou devant un coéquipier qui a joué le ballon en dernier : il ne doit pas interférer avec le jeu ni avancer vers le ballon. Lors d\'un plaquage suivi d\'un Ruck (ballon au sol, au moins 1 joueur debout de chaque équipe au contact au-dessus du ballon), deux lignes de hors-jeu apparaissent au niveau du dernier pied de chaque camp : tout joueur qui rejoint le ruck doit entrer par l\'arrière (« passer par la porte ») et rester sur ses appuis.'
      },
      {
        title: 'Le Plaquage, la Sécurité et les Nouveautés World Rugby 2026',
        content: 'Lors d\'un plaquage (porteur du ballon mis au sol et tenu), trois obligations immédiates s\'appliquent : 1) Le plaqueur doit relâcher immédiatement le joueur plaqué et rouler sur le côté pour sortir de la zone ; 2) Le joueur plaqué doit passer, lâcher ou poser immédiatement le ballon ; 3) Les joueurs qui arrivent au soutien doivent rester debout sur leurs pieds (interdiction de plonger au sol dans le ruck). Nouveautés World Rugby 2025/2026 : Abaissement strict de la hauteur légale du plaquage au niveau de la base du sternum (et à la ceinture en milieu scolaire/EPS) ; règle du 50:22 (coup de pied tapé depuis sa propre moitié qui rebondit dans les 22m adverses avant de sortir en touche donne le lancer à l\'équipe qui a botté) ; renvoi sur la ligne de but (Goal-line drop-out) lorsqu\'un attaquant porte le ballon dans l\'en-but et qu\'il y est tenu ou commet un en-avant.'
      }
    ],
    refereeSignals: [
      {
        code: 'World Rugby · Signal 1',
        name: 'Essai Accordé / Essai de Pénalité (5 ou 7 pts)',
        when: 'Un attaquant aplatit le ballon (pression de haut en bas avec les mains/bras/torse) dans l\'en-but adverse ou sur la ligne de but.',
        how: 'L\'arbitre se place sur la ligne de but, donne un coup de sifflet long et lève un bras verticalement au-dessus de la tête en regardant les poteaux (pour un essai de pénalité : il court sous le centre des poteaux et lève le bras).',
        svgType: 'one_arm_up'
      },
      {
        code: 'World Rugby · Signal 2',
        name: 'En-Avant (Knock-On)',
        when: 'Le ballon échappe des mains ou rebondit sur les bras d\'un joueur vers l\'avant.',
        how: 'L\'arbitre lève un bras plié à hauteur de la tête et effectue un mouvement de va-et-vient d\'arrière en avant avec la main ouverte au-dessus du front.',
        svgType: 'knock_on_forward'
      },
      {
        code: 'World Rugby · Signal 3',
        name: 'Passe en Avant (Throw Forward)',
        when: 'Un joueur transmet le ballon à la main en direction de l\'en-but adverse.',
        how: 'L\'arbitre mime le geste d\'une passe à deux mains vers l\'avant à hauteur des hanches.',
        svgType: 'pass_forward_hands'
      },
      {
        code: 'World Rugby · Signal 4',
        name: 'Coup de Pied de Pénalité (Penalty Kick)',
        when: 'Faute grave : hors-jeu, plaquage haut, joueur plaqué qui garde le ballon au sol, entrée latérale dans le ruck.',
        how: 'L\'arbitre siffle fort et tend un bras vers le haut à 45° au-dessus de l\'horizontale en direction du camp de l\'équipe qui bénéficie de la pénalité.',
        svgType: 'point_corner_up'
      },
      {
        code: 'World Rugby · Signal 5',
        name: 'Coup de Pied Franc (Free Kick)',
        when: 'Infraction technique en mêlée ou en touche (fausse introduction, alignement, arrêt de volée / Mark dans ses 22m).',
        how: 'L\'arbitre lève le bras plié à angle droit (90° : bras horizontal, avant-bras vertical, main ouverte) du côté de l\'équipe bénéficiaire.',
        svgType: 'arm_90_up'
      },
      {
        code: 'World Rugby · Signal 6',
        name: 'Ordonner une Mêlée (Scrum)',
        when: 'Reprise du jeu après un en-avant, une passe en avant ou un ballon injouable dans un ruck/maul.',
        how: 'Un bras est tendu horizontalement vers l\'équipe qui introduit le ballon, tandis que l\'autre main touche le sommet de l\'épaule opposée pour former une voûte.',
        svgType: 'point_horizontal'
      },
      {
        code: 'World Rugby · Signal 7',
        name: 'Avantage en Cours',
        when: 'Une équipe commet une faute mais l\'équipe adverse peut tirer un profit tactique ou territorial.',
        how: 'L\'arbitre tend le bras horizontalement à hauteur de la taille en direction de l\'équipe non fautive pendant toute la durée de l\'avantage.',
        svgType: 'advantage_both_arms'
      },
      {
        code: 'World Rugby · Signal 8',
        name: 'Plaquage Haut (High Tackle — Sécurité)',
        when: 'Un défenseur plaque le porteur du ballon au-dessus de la ligne des épaules / du sternum (cou ou tête).',
        how: 'Après avoir signalé la pénalité, l\'arbitre passe sa main ouverte horizontalement devant son cou ou sa poitrine supérieure.',
        svgType: 'high_tackle_neck'
      },
      {
        code: 'World Rugby · Signal 9',
        name: 'Joueur Plaqué ne lâchant pas le Ballon (Holding On)',
        when: 'Le porteur du ballon mis au sol garde le ballon dans ses bras au lieu de le libérer immédiatement.',
        how: 'L\'arbitre ramène ses deux bras pliés contre sa poitrine (comme s\'il serrait un ballon contre son torse).',
        svgType: 'holding_ball_chest'
      },
      {
        code: 'World Rugby · Signal 10',
        name: 'Carton Jaune (Exclusion 10 min / Sin Bin) & Carton Rouge',
        when: 'Jeu déloyal, fautes répétées ou anti-jeu près de sa ligne d\'en-but (Jaune = 10 min en XV, 2 min en Rugby à 7).',
        how: 'L\'arbitre appelle le joueur fautif et le capitaine, puis lève le carton jaune ou rouge bras tendu.',
        svgType: 'card_up'
      }
    ],
    epsAdaptationTable: [
      ['Type de contact', 'Plaquage complet au sol + Ruck et Mêlée poussée', 'Début de cycle / Collège : Tag Rugby (arracher le foulard à la ceinture) ou Touché à 2 mains simultanées sur le short', 'Lycée (sur herbe ou tapis) : Plaquage bas contrôlé (ceinture-cuisses) uniquement de face ou de profil'],
      ['La Mêlée', 'Mêlée à 8 contre 8 avec poussée (1,5 m max en U19)', 'Mêlée simulée à 3 contre 3 SANS POUSSÉE (les 3 joueurs se lient pour fixer les avants, et le demi de mêlée joue)', 'Sécurité cervicale absolue garantie conformément aux circulaires scolaires'],
      ['La Touche', 'Alignement avec saut et ascenseur (lifters)', 'Touche rapide à 2 ou 3 joueurs SANS ascenseur (interdiction de soulever un élève en EPS)', 'Remise en jeu rapide à 2 mains ou passe directe à 5 mètres'],
      ['Le Jeu au Pied', 'Autorisé partout sur le terrain', 'Interdit en 1AC/2AC (pour obliger les élèves à conserver le ballon et résoudre le problème affectif du contact)', 'Autorisé en Lycée uniquement sous forme de coup de pied rasant dans l\'espace libre']
    ],
    crmefQuestions: [
      {
        q: '1. Quelle est la valeur en points de chaque action de marque en Rugby (Règle 8 World Rugby) ?',
        a: 'Essai = 5 points ; Transformation après essai = 2 points ; Essai de pénalité = 7 points (accordés directement sans tenter de transformation) ; Coup de pied de pénalité réussi entre les poteaux = 3 points ; Drop-goal (coup de pied tombé en cours de jeu) = 3 points.'
      },
      {
        q: '2. Quelle est la durée d\'une exclusion temporaire (Carton Jaune / Sin Bin) en Rugby à XV et en Rugby à 7 ?',
        a: 'En Rugby à XV, le carton jaune entraîne une exclusion temporaire de 10 minutes de temps de jeu effectif. En Rugby à 7 (Sevens, où le match dure 2 × 7 minutes), l\'exclusion temporaire sur carton jaune est de 2 minutes.'
      },
      {
        q: '3. Quelles sont les dimensions exactes des poteaux de but en H en Rugby ?',
        a: 'La distance entre l\'intérieur des deux poteaux est de 5,60 mètres. Le bord supérieur de la barre transversale est situé à 3,00 mètres du sol, et la hauteur minimale des poteaux au-dessus du sol est de 3,40 mètres.'
      },
      {
        q: '4. Quelle est la différence entre un Ruck (mêlée ouverte) et un Maul (groupé pénétrant) ?',
        a: 'Dans un Ruck, le ballon est AU SOL et au moins un joueur de chaque équipe est debout sur ses pieds et au contact physique au-dessus du ballon (il est interdit d\'utiliser les mains dans le ruck). Dans un Maul, le porteur du ballon est DEBOUT et tenu par un ou plusieurs adversaires ainsi qu\'au moins un coéquipier lié à lui.'
      },
      {
        q: '5. Lors d\'un coup d\'envoi ou d\'un renvoi au centre, quelle ligne le ballon doit-il obligatoirement franchir ?',
        a: 'Le ballon botté en coup de pied tombé (drop) doit atteindre au moins la ligne des 10 mètres adverse. S\'il n\'atteint pas les 10 mètres (sans avoir été touché par un adversaire), l\'équipe adverse a le choix entre faire recommencer le coup d\'envoi ou bénéficier d\'une mêlée (ou coup franc en Rugby à 7) au centre du terrain.'
      },
      {
        q: '6. Qu\'est-ce qu\'un « Arrêt de volée » (Mark) en Rugby et où peut-il être effectué ?',
        a: 'Un joueur situé dans ses propres 22 mètres (ou dans son en-but) qui réceptionne proprement de volée un coup de pied adverse (hors coup d\'envoi) en criant « Mark ! » obtient un coup de pied franc (Free Kick) que lui seul doit exécuter.'
      },
      {
        q: '7. À quelle distance de la ligne de hors-jeu doivent reculer les défenseurs lors d\'un coup de pied de pénalité ou d\'un coup franc ?',
        a: 'Tous les joueurs de l\'équipe fautive doivent reculer d\'au moins 10 mètres vers leur propre ligne de but (ou jusqu\'à leur ligne de but si elle est à moins de 10 mètres de la marque).'
      },
      {
        q: '8. En didactique de l\'EPS, quel est l\'obstacle principal du débutant en rugby et comment le traiter ?',
        a: 'L\'obstacle majeur est d\'ordre affectif et informationnel : la peur du contact (qui pousse l\'élève à se débarrasser du ballon en reculant ou en faisant un en-avant) couplée au paradoxe « avancer vers l\'avant en passant vers l\'arrière ». On le traite par des règles progressives de touché/foulards (Tag Rugby) puis de plaquage sécurisé à genoux/debout à la taille.'
      },
      {
        q: '9. En quoi consiste la règle du 50:22 introduite par World Rugby ?',
        a: 'Si l\'équipe en possession botte le ballon depuis sa propre moitié de terrain (avant la ligne des 50m) et que le ballon rebondit dans le champ de jeu avant de sortir en touche dans les 22 mètres adverses, le lancer en touche est attribué à l\'équipe qui a botté le ballon.'
      },
      {
        q: '10. Quelles sont les 3 règles d\'or de sécurité de la mêlée scolaire en EPS ?',
        a: '1) Effectif réduit (3 contre 3) ; 2) Commandement séquentiel de l\'arbitre (« Flexion - Liez - Jeu ») ; 3) Mêlée simulée SANS poussée (interdiction absolue d\'impact et de poussée pour protéger le rachis cervical des élèves).'
      }
    ],
    fieldExperience: {
      context: '📍 Initiation Rugby Scolaire & Tag Rugby en EPS · Collège & Lycée au Maroc',
      reality: 'Beaucoup de collègues hésitent à programmer le rugby par crainte des blessures sur des terrains scolaires durs ou sablonneux. Pourtant, en formule Tag Rugby (avec deux rubans scratchs ou deux chasubles glissées de chaque côté du short), le rugby devient l\'une des APS les plus intenses, les plus mixtes et les plus formatrices de toute l\'année !',
      tip: 'Dans mes séances de Rugby EPS, la règle est limpide : dès qu\'un défenseur arrache le foulard (ou touche le porteur à deux mains sur les hanches en criant « TOUCHÉ ! »), il lève le bras verticalement. Le porteur dispose de 3 pas ou 3 secondes maximum pour faire une passe en arrière à un partenaire au soutien. Au 4e touché consécutif sans essai, le ballon change de camp. Les élèves comprennent en 15 minutes toute la logique du soutien axial et de la ligne d\'avantage sans aucun risque de traumatisme.'
    }
  },

  // ============================================================================
  // 4. HANDBALL (IHF RULES OF THE GAME 2025-2026 & 18 GESTES D'ARBITRAGE IHF)
  // ============================================================================
  {
    id: 'handball',
    slug: 'reglement-handball-ihf-gestes-arbitrage-eps.html',
    relatedArticle: 'article-handball-eps.html',
    relatedCycleCollege: 'cycle-handball-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-handball-lycee-eps-maroc.html',
    sportName: 'Handball (7×7 & Mini-Hand Scolaire)',
    shortTitle: 'Règlement Handball (Lois IHF 2026 & 18 Gestes d\'Arbitrage)',
    title: 'Règlement Officiel du Handball (Règles IHF 2026), Terrain 40×20m, Les 18 Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Handball conforme aux Règles du Jeu IHF 2025-2026 : schéma du terrain 40x20m, zone des 6m, 3 pas/3s, jeu passif à 4 passes, les 18 gestes officiels d\'arbitrage IHF illustrés et PDF officiel.',
    badge: '🤾 Règlement Officiel IHF 2025/2026 & 18 Gestes d\'Arbitrage',
    federation: 'IHF (International Handball Federation) / CAHB / FRMHB Maroc',
    lawVersion: 'Règles de Jeu IHF 2025/2026 (Règle 1 à Règle 18 + Catalogue des 18 Gestes)',
    datePublished: '2026-10-28',
    dateLabel: '28 Octobre 2026',
    readTime: '30 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles de Jeu Officielles IHF 2025/2026 (PDF Officiel)',
        org: 'IHF — International Handball Federation (Statutes & Regulations)',
        url: 'https://www.ihf.info/regulations-documents/355?selected=Rules%20of%20the%20Game',
        note: 'Document officiel IHF (IX. Rules of the Game — Indoor Handball) incluant les 18 règles et le catalogue illustré des 18 gestes des arbitres.'
      },
      {
        label: 'Textes Règlementaires & Arbitrage FFHandball (Version Française IHF)',
        org: 'FFHandball / Commission Centrale d\'Arbitrage',
        url: 'https://www.ffhandball.fr/competitions/arbitrage/regles-du-jeu/',
        note: 'Traduction officielle en français du code d\'arbitrage IHF et livret de l\'arbitrage.'
      },
      {
        label: 'Centre d\'Éducation & Arbitrage IHF (Playing Rules & Referees)',
        org: 'IHF Education Centre',
        url: 'https://www.ihf.info/competitions/referees-and-delegates',
        note: 'Directives d\'interprétation 2025/2026 : zone d\'engagement rapide (4m), jeu passif à 4 passes et protection du gardien.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Handball IHF 40m x 20m">
        <rect width="800" height="460" fill="#1e293b"/>
        <!-- Surface de jeu 40m x 20m -->
        <rect x="60" y="50" width="680" height="340" fill="#2563eb" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Zone de but gauche (6m) en orange/ocre -->
        <path d="M 60 92 L 96 92 A 102 102 0 0 1 162 194 L 162 246 A 102 102 0 0 1 96 348 L 60 348 Z" fill="#ea580c" stroke="#ffffff" stroke-width="3"/>
        <!-- Zone de but droite (6m) -->
        <path d="M 740 92 L 704 92 A 102 102 0 0 0 638 194 L 638 246 A 102 102 0 0 0 704 348 L 740 348 Z" fill="#ea580c" stroke="#ffffff" stroke-width="3"/>
        <!-- Ligne de jet franc à 9m (pointillés de 15cm) gauche et droite -->
        <path d="M 60 45 A 153 153 0 0 1 213 194 L 213 246 A 153 153 0 0 1 60 395" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="9,7"/>
        <path d="M 740 45 A 153 153 0 0 0 587 194 L 587 246 A 153 153 0 0 0 740 395" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="9,7"/>
        <!-- Ligne médiane & Zone d'engagement rapide IHF (Cercle diamètre 4m) -->
        <line x1="400" y1="50" x2="400" y2="390" stroke="#ffffff" stroke-width="3"/>
        <circle cx="400" cy="220" r="34" fill="rgba(253,224,71,0.22)" stroke="#fde047" stroke-width="2.5" stroke-dasharray="6,4"/>
        <!-- Marques de 4m (restriction gardien) et de 7m (Jet de 7m) -->
        <line x1="128" y1="215" x2="128" y2="225" stroke="#ffffff" stroke-width="3"/>
        <line x1="179" y1="212" x2="179" y2="228" stroke="#fde047" stroke-width="3.5"/>
        <line x1="672" y1="215" x2="672" y2="225" stroke="#ffffff" stroke-width="3"/>
        <line x1="621" y1="212" x2="621" y2="228" stroke="#fde047" stroke-width="3.5"/>
        <!-- Buts 3m x 2m (Largeur ligne de but 8cm entre les poteaux) -->
        <rect x="42" y="194" width="18" height="52" fill="none" stroke="#fde047" stroke-width="4"/>
        <rect x="740" y="194" width="18" height="52" fill="none" stroke="#fde047" stroke-width="4"/>
        <!-- Zones de changement (4,50 m de part et d'autre de la ligne médiane) -->
        <line x1="323" y1="42" x2="323" y2="58" stroke="#fde047" stroke-width="3"/>
        <line x1="477" y1="42" x2="477" y2="58" stroke="#fde047" stroke-width="3"/>
        <!-- Annotations -->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">LONGUEUR : 40,00 m · LARGEUR : 20,00 m (Le terrain roi des lycées et collèges au Maroc)</text>
          <text x="24" y="220" transform="rotate(-90 24 220)" fill="#fde047">LARGEUR : 20,00 m</text>
          <text x="400" y="38" font-size="11" fill="#fde047">Zones de changement : 4,50 m de chaque côté de la ligne médiane</text>
          <text x="112" y="155" font-size="11.5">Zone 6 m</text>
          <text x="128" y="242" font-size="10.5">4 m (GB)</text>
          <text x="179" y="203" fill="#fde047" font-size="11">Jet de 7 m</text>
          <text x="242" y="140" font-size="11.5">Pointillés : 9 m</text>
          <text x="400" y="176" fill="#fde047" font-size="11">Zone d'engagement Ø 4 m</text>
          <text x="400" y="425" fill="#ffffff">But : 3,00 m × 2,00 m | Lignes : 5 cm (8 cm entre les poteaux) | Règle d'or : 3 pas max · 3 secondes max</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Règle 1)', 'Longueur : 40,00 m · Largeur : 20,00 m · Zone de sécurité : 1 m le long des touches et 2 m derrière les lignes de but', 'Dimensions exactes de la quasi-totalité des terrains scolaires d\'EPS au Maroc'],
      ['Dimensions des buts & Lignes', 'Largeur intérieure : 3,00 m · Hauteur intérieure : 2,00 m · Poteaux carrés de 8 cm', 'Toutes les lignes mesurent 5 cm de large, SAUF la ligne de but entre les poteaux qui mesure 8 cm !'],
      ['Zones & Marques clés', 'Ligne de surface de but : 6 m · Ligne de jet franc (pointillés) : 9 m · Jet de 7 m · Ligne du gardien : 4 m · Zone de changement : 4,50 m', 'Nouveau IHF : Cercle d\'engagement rapide au centre de 4 m de diamètre'],
      ['Le Ballon (Règle 3 — Sans résine / Avec résine)', 'Taille 3 (Hommes > 16 ans) : 58–60 cm, 425–475 g · Taille 2 (Femmes > 14 ans & Garçons 12–16 ans) : 54–56 cm, 325–375 g', 'Taille 1 (Filles 8–14 ans & Garçons 8–12 ans / Collège 1AC) : 50–52 cm, 290–330 g'],
      ['Joueurs & Remplacements (Règle 4)', '7 joueurs sur le terrain (6 joueurs de champ + 1 gardien) sur 14 ou 16 inscrits', 'Remplacements volants illimités dans la zone de 4,50 m (le sortant doit avoir quitté le terrain avant l\'entrée du remplaçant)'],
      ['Durée du match (Règle 2)', 'Seniors / +16 ans : 2 × 30 min (pause 10–15 min) · 12–16 ans (Collège/ASS) : 2 × 25 min · 8–12 ans : 2 × 20 min', 'Prolongation : 2 × 5 min (pause 1 min) · 3 temps morts d\'équipe (1 min) par match (max 2 par mi-temps)']
    ],
    lawsSummary: [
      {
        title: 'La Règle de Base du Maniement du Ballon (Règle 7 : Les 3 Pas et les 3 Secondes)',
        content: 'Un joueur est autorisé à : 1) Tenir le ballon pendant 3 secondes au maximum (même s\'il est au sol) ; 2) Faire 3 pas au maximum avec le ballon tenu en main sans dribbler ; 3) Dribbler de manière continue d\'une main, puis reprendre le ballon à une ou deux mains et refaire 3 pas (ou garder 3s) pour passer ou tirer. S\'il reprend son dribble une seconde fois (« reprise de dribble ») ou fait un 4e pas (« marcher »), les arbitres sifflent un jet franc pour l\'adversaire. Toucher volontairement le ballon avec la jambe au-dessous du genou ou le pied est une faute (« pied »), sauf si le ballon a été lancé sur le pied du défenseur par un adversaire.'
      },
      {
        title: 'La Surface de But des 6 Mètres et le Rôle du Gardien (Règles 5 et 6)',
        content: 'Seul le gardien de but a le droit de se trouver dans la surface de but (qui inclut la ligne des 6 mètres). Un joueur de champ qui touche la ligne des 6m ou le sol de la zone avec une partie quelconque du corps commet un « empiètement de zone ». Toutefois, un joueur de champ est autorisé à sauter depuis l\'extérieur des 6m (appel avant la ligne) pour tirer ou passer en suspension, à condition d\'avoir lâché le ballon AVANT de retomber au sol dans la zone. Dans sa zone des 6m, le gardien peut toucher le ballon avec toutes les parties de son corps (y compris les pieds) pour défendre son but, sans limite de pas ni des 3 secondes.'
      },
      {
        title: 'Comportement envers l\'Adversaire (Règle 8) & Échelle des Sanctions (Règle 16)',
        content: 'Il est permis d\'utiliser les bras et les mains pour bloquer le ballon et d\'utiliser son corps (buste) pour barrer le chemin à l\'adversaire. Il est strictement INTERDIT d\'arracher ou de frapper le ballon que l\'adversaire tient dans ses mains, de ceinturer, retenir, pousser, ou de mettre en danger le tireur en suspension (surtout par un contact latéral ou dans le dos). L\'échelle progressive des sanctions disciplinaires comprend : 1) Avertissement (Carton Jaune — max 3 par équipe et 1 par joueur) ; 2) Exclusion temporaire de 2 minutes (signe des 2 doigts levés — l\'équipe joue à 6 contre 7 pendant 2 min) ; 3) Disqualification (Carton Rouge — à la 3e exclusion de 2 min d\'un même joueur ou sur faute grossière : l\'équipe joue à 6 pendant 2 min puis un autre joueur peut entrer) ; 4) Disqualification avec rapport écrit (Carton Bleu montré après le Carton Rouge).'
      },
      {
        title: 'Les 3 Nouveautés Majeures IHF (2024–2026) à maîtriser pour le CRMEF',
        content: '1) Le Jeu Passif limité à 4 passes maximum : dès que les arbitres lèvent le bras (Geste n°17 : signal d\'avertissement de jeu passif), l\'équipe en attaque dispose désormais d\'un maximum de 4 PASSES pour tirer au but (contre 6 passes auparavant). Si aucun tir n\'est déclenché après la 4e passe, l\'arbitre siffle jet franc contre l\'attaque. 2) La Zone d\'Engagement Rapide (Cercle central de 4m de diamètre) : le joueur qui engage n\'est plus obligé de poser le pied sur la ligne centrale ; il peut engager en mouvement dès qu\'il se trouve à l\'intérieur du cercle central de 4m et que l\'arbitre a sifflé ! 3) Protection de la tête du gardien : tout tir direct (non dévié) qui frappe la tête d\'un gardien en mouvement libre (hors jet de 7m où la sanction est un Carton Rouge) est désormais sanctionné d\'une exclusion directe de 2 minutes pour le tireur.'
      }
    ],
    refereeSignals: [
      {
        code: 'IHF · Geste n°1 & 2',
        name: 'Empiètement dans la Surface de But (6m) / Reprise de Dribble',
        when: 'Geste 1 : un joueur de champ pose le pied sur la ligne ou dans la zone des 6m. Geste 2 : double dribble ou ballon porté.',
        how: 'Geste 1 (Empiètement 6m) : mouvement du bras tendu du haut vers le bas en pointant à plat vers la zone de but. Geste 2 (Dribble) : mouvement alternatif de haut en bas des deux avant-bras à plat (comme un dribble).',
        svgType: 'point_penalty_down'
      },
      {
        code: 'IHF · Geste n°3',
        name: 'Marcher (Plus de 3 pas) ou Tenir le ballon plus de 3 secondes',
        when: 'Le porteur effectue 4 pas ou plus sans dribbler, ou conserve le ballon immobile plus de 3 secondes.',
        how: 'L\'arbitre place ses deux avant-bras horizontalement devant sa poitrine et les fait tourner l\'un autour de l\'autre (« moulinet »).',
        svgType: 'travelling_rotate'
      },
      {
        code: 'IHF · Geste n°4',
        name: 'Ceinturer, Retenir ou Pousser',
        when: 'Un défenseur retient le maillot ou le bras de l\'attaquant ou le ceinture.',
        how: 'L\'arbitre ferme ses deux poings et les croise/serre l\'un contre l\'autre devant sa poitrine.',
        svgType: 'holding_ball_chest'
      },
      {
        code: 'IHF · Geste n°5 & 6',
        name: 'Frapper sur le bras (n°5) / Passage en force — Faute d\'attaquant (n°6)',
        when: 'n°5 : coup sur l\'avant-bras du tireur. n°6 : l\'attaquant percute un défenseur déjà placé et stationnaire.',
        how: 'n°6 (Passage en force) : le poing droit fermé vient frapper la paume ouverte de la main gauche devant le buste.',
        svgType: 'charging_fist_palm'
      },
      {
        code: 'IHF · Geste n°7 & 8',
        name: 'Touche — Direction (n°7) / Renvoi par le Gardien (n°8)',
        when: 'n°7 : ballon sorti en touche. n°8 : ballon sorti derrière la ligne de fond par l\'attaque ou le gardien.',
        how: 'n°7 : les deux bras tendus à l\'horizontale avec paumes face à face dans le sens de l\'équipe bénéficiaire. n°8 : un bras tendu vers le but avec la paume tournée vers l\'intérieur.',
        svgType: 'point_horizontal'
      },
      {
        code: 'IHF · Geste n°9 & 10',
        name: 'Jet Franc — Direction (n°9) / Non-respect de la distance de 3 mètres (n°10)',
        when: 'Infraction sifflée (Jet franc) et obligation pour la défense de reculer à 3 mètres du ballon.',
        how: 'n°9 : un bras tendu dans la direction de l\'équipe qui bénéficie du jet franc. n°10 : un bras plié à l\'horizontale devant le corps, paume tournée vers l\'extérieur.',
        svgType: 'point_corner_up'
      },
      {
        code: 'IHF · Geste n°11 & 12',
        name: 'Jeu Passif (n°11) & Signal d\'Avertissement de Jeu Passif — 4 passes max (n°17)',
        when: 'L\'équipe en possession ne manifeste aucune volonté claire d\'attaquer ou de tirer au but.',
        how: 'Signal d\'avertissement (Geste 17) : l\'arbitre lève un avant-bras verticalement (paume vers l\'avant) pendant que le jeu continue (4 passes max !). Si le jeu passif est sifflé (Geste 11) : il croise les avant-bras en levant un poignet avec l\'autre main.',
        svgType: 'one_arm_up'
      },
      {
        code: 'IHF · Geste n°12',
        name: 'But Accordé (Validation du But)',
        when: 'Le ballon a franchi entièrement la ligne de but de 8 cm entre les poteaux et sous la barre.',
        how: 'Deux coups de sifflet brefs + l\'arbitre de but lève un bras verticalement au-dessus de la tête tout en pointant l\'autre bras vers le centre du terrain.',
        svgType: 'goal_handball_two_arms'
      },
      {
        code: 'IHF · Geste n°13 & 14',
        name: 'Carton Jaune / Rouge / Bleu (n°13) & Exclusion Temporaire 2 Minutes (n°14)',
        when: 'Sanction disciplinaire progressive ou faute mettant en danger l\'intégrité physique de l\'adversaire.',
        how: 'Pour l\'exclusion de 2 minutes (Geste 14) : l\'arbitre tend le bras bien haut au-dessus de la tête en formant un « V » avec l\'index et le majeur (2 doigts).',
        svgType: 'two_minutes_v'
      },
      {
        code: 'IHF · Geste n°15',
        name: 'Temps Mort (Time-Out — 3 coups de sifflet)',
        when: 'Arrêt du temps de jeu par les arbitres (exclusion 2 min, jet de 7m, temps mort d\'équipe, blessure).',
        how: 'Trois coups de sifflet brefs accompagnés du signe « T » formé avec les deux mains à plat et verticales au-dessus de la tête.',
        svgType: 'timeout_t'
      }
    ],
    epsAdaptationTable: [
      ['Effectif sur le terrain', '7 contre 7 (6 joueurs de champ + 1 gardien)', 'Collège 1AC/2AC (OP 2009) : 5c5 ou 6c6 pour libérer des espaces de pénétration dans la défense', '3AC & Lycée (OP 2007) : 7c7 complet avec organisation défensive en 0-6 (zone) ou 1-5'],
      ['Usage du Dribble', 'Dribble illimité autorisé (tant qu\'il n\'y a pas de reprise de dribble)', 'Situation d\'apprentissage EPS : « Interdiction de dribbler » ou « 1 seul rebond autorisé » pour forcer les élèves à lever la tête et jouer en passes', 'Match d\'évaluation : dribble autorisé uniquement en couloir de contre-attaque'],
      ['Défense sur le porteur', 'Contact de face autorisé (buste contre buste)', 'En 1AC/2AC : défense individuelle ou de zone avec interdiction d\'arracher le ballon des mains (récupération uniquement sur interception)', 'En Lycée : contact contrôlé de face autorisé ; toute poussée sur tireur en suspension = Jet de 7m + 2 minutes'],
      ['Jeu Passif', '4 passes maximum après le bras levé de l\'arbitre', 'En EPS : l\'élève-arbitre lève le bras dès que l\'équipe fait des passes latérales sans avancer pendant 15 secondes, et compte à voix haute « 1, 2, 3, 4 passes ! »', 'Excellent outil pédagogique pour obliger l\'équipe à rechercher le tir vers la cible']
    ],
    crmefQuestions: [
      {
        q: '1. Quelle est la particularité réglementaire de la largeur des lignes d\'un terrain de Handball (Règle 1 IHF) ?',
        a: 'Toutes les lignes du terrain de handball mesurent 5 cm de largeur, à une seule exception : la ligne de but située entre les deux poteaux mesure 8 cm de largeur (exactement comme l\'épaisseur des poteaux carrés de 8 cm × 8 cm).'
      },
      {
        q: '2. Combien de passes maximum sont autorisées après que les arbitres ont levé le bras d\'avertissement de jeu passif (Règle IHF 2025/2026) ?',
        a: 'Depuis la réforme IHF, l\'équipe en attaque a droit à un maximum de 4 PASSES après l\'apparition du geste n°17 (bras levé). Si aucun tir n\'est effectué après la 4e passe, les arbitres sifflent immédiatement un jet franc en faveur de la défense.'
      },
      {
        q: '3. Que se passe-t-il si un défenseur entre volontairement dans sa propre zone des 6 mètres pour empêcher une occasion manifeste de but ?',
        a: 'Cette infraction (« défense en zone » annihilant une occasion nette de but) est sanctionnée d\'un Jet de 7 mètres en faveur de l\'équipe attaquante (Règle 14).'
      },
      {
        q: '4. À quelle distance minimale doivent se trouver les adversaires lors de l\'exécution d\'un engagement, d\'une touche ou d\'un jet franc ?',
        a: 'Les joueurs adverses doivent toujours se tenir à au moins 3 mètres du porteur qui exécute le jet. Lors d\'un jet franc, aucun coéquipier de l\'équipe attaquante ne peut se trouver entre la ligne des 6m et la ligne des 9m avant que le ballon ait quitté la main du passeur.'
      },
      {
        q: '5. Lors d\'un Jet de 7 mètres, jusqu\'où le gardien de but a-t-il le droit de s\'avancer ?',
        a: 'Le gardien peut s\'avancer depuis sa ligne de but jusqu\'à la ligne de restriction des 4 mètres (marque de 15 cm tracée à 4m du but), mais il ne doit pas franchir cette ligne des 4 mètres avant que le ballon ait quitté la main du tireur.'
      },
      {
        q: '6. Qu\'est-ce que le Carton Bleu en Handball IHF ?',
        a: 'Introduit par l\'IHF, le Carton Bleu est brandi par les arbitres APRÈS un Carton Rouge (disqualification) pour informer les équipes et le public qu\'un rapport disciplinaire écrit sera annexé à la feuille de match (pour une faute particulièrement grave ou antisportive).'
      },
      {
        q: '7. Combien d\'exclusions temporaires de 2 minutes un même joueur peut-il recevoir au cours d\'un match ?',
        a: 'Un joueur qui reçoit une 3e exclusion temporaire de 2 minutes au cours du même match se voit automatiquement présenter le Carton Rouge (Disqualification définitive du match).'
      },
      {
        q: '8. Un gardien de but sort de sa surface des 6 mètres dans le champ de jeu. À quelles règles est-il alors soumis ?',
        a: 'Dès qu\'il quitte sa surface de but (6m), le gardien est soumis exactement aux mêmes règles qu\'un joueur de champ (3 pas, 3 secondes, interdiction de toucher le ballon du pied) et il lui est interdit de rentrer dans sa zone des 6m avec le ballon en mains (sanction : jet franc à 9m).'
      },
      {
        q: '9. Quelle est la sanction IHF si un joueur tire directement (sans déviation) dans le visage du gardien de but ?',
        a: 'Sur un Jet de 7 mètres (ou jet franc direct après le temps réglementaire) où le gardien ne bouge pas la tête vers le ballon : Disqualification directe (Carton Rouge). En cours de jeu ouvert sur tir libre non dévié par un défenseur : Exclusion directe de 2 minutes pour le tireur.'
      },
      {
        q: '10. En didactique du Handball au Maroc (ATD), quels sont les 4 niveaux de jeu typiques observés chez les élèves ?',
        a: 'Niveau 1 : « Grappe / Essaim » autour du ballon (passes aléatoires, dribbles sur place). Niveau 2 : « Jeu en comète / Couloir central » (course individuelle en dribble vers le but). Niveau 3 : « Jeu en gagne-terrain par passes » mais blocage face à la zone placée. Niveau 4 : « Attaque placée et contre-attaque organisée » (occupation de la largeur avec ailiers, circulation de balle et tirs en suspension à 6m).'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Handball Collège & Lycée au Maroc · Terrain 40×20 m · Évaluation Baccalauréat',
      reality: 'Le Handball est l\'APS numéro 1 au Maroc (présente dans presque tous les établissements et aux examens du Bac et du CRMEF). Sur le terrain, les deux fautes les plus fréquentes chez nos élèves sont le « Marcher » (4 ou 5 petits pas avant l\'appel de tir) et l\'« Empiètement de zone à 6 mètres » parce qu\'ils regardent le gardien au lieu de repérer la ligne au sol.',
      tip: 'Pour former mes élèves-arbitres en Handball, je les place à deux (comme dans le vrai arbitrage IHF) : un « Arbitre de Zone/But » placé près du poteau qui surveille exclusivement les pieds sur la ligne des 6 mètres et valide les buts (2 coups de sifflet), et un « Arbitre de Champ » placé derrière les 9 mètres qui surveille les 3 pas (geste du moulinet), la reprise de dribble et les contacts sur le bras du tireur. Cette répartition à 2 élèves-arbitres transforme complètement la qualité de l\'arbitrage en classe !'
    }
  },

  // ============================================================================
  // 5. BASKETBALL 5x5 (FIBA OFFICIAL BASKETBALL RULES 2025-2026)
  // ============================================================================
  {
    id: 'basketball',
    slug: 'reglement-basketball-fiba-gestes-arbitrage-eps.html',
    relatedArticle: 'article-basketball-eps.html',
    relatedCycleCollege: 'cycle-basketball-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-basketball-lycee-eps-maroc.html',
    sportName: 'Basketball (5×5)',
    shortTitle: 'Règlement Basketball (Règles FIBA 2026) & Gestes d\'Arbitrage',
    title: 'Règlement Officiel du Basketball (Règles FIBA 2026), Terrain 28×15m, Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Basketball 5x5 conforme au code FIBA 2025-2026 : schéma du terrain 28x15m, règle du pas zéro, 3s/5s/8s/24s, fautes, gestes officiels d\'arbitrage FIBA illustrés et téléchargement PDF.',
    badge: '🏀 Règlement Officiel FIBA 2025/2026 & Signaux des Arbitres',
    federation: 'FIBA (Fédération Internationale de Basketball) / FIBA Afrique / FRMBB Maroc',
    lawVersion: 'Règles Officielles de Basketball FIBA 2025/2026 & Code des Signaux d\'Arbitrage',
    datePublished: '2026-10-28',
    dateLabel: '28 Octobre 2026',
    readTime: '29 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger le Règlement Officiel du Basketball FIBA 2025/2026 (PDF)',
        org: 'FIBA — Official Basketball Rules & Interpretations',
        url: 'https://about.fiba.basketball/fr/services/fiba-rules-and-regulations/official-basketball-rules',
        note: 'Document officiel intégral de la FIBA incluant l\'Annexe A : Le Code Officiel des Signaux des Arbitres (Horloge, Score, Violations et Fautes).'
      },
      {
        label: 'Portail Arbitrage FFBB / Traduction Française Officielle FIBA',
        org: 'FFBB / Commission Fédérale des Officiels',
        url: 'https://www.ffbb.com/jouer/reglements-officiels',
        note: 'Règlement officiel FIBA en français, interprétations officielles et manuel de la table de marque.'
      },
      {
        label: 'Fédération Royale Marocaine de Basket-Ball (FRMBB)',
        org: 'FRMBB Maroc',
        url: 'https://frmbb.ma/',
        note: 'Règlements sportifs nationaux et compétitions jeunes au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Basketball FIBA 28m x 15m">
        <rect width="800" height="460" fill="#1e293b"/>
        <!-- Parquet 28m x 15m -->
        <rect x="65" y="50" width="670" height="360" fill="#d97706" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Raquettes / Zones restrictives rectangulaires FIBA (5.80m x 4.90m) -->
        <rect x="65" y="171" width="139" height="118" fill="#991b1b" stroke="#ffffff" stroke-width="3"/>
        <rect x="596" y="171" width="139" height="118" fill="#991b1b" stroke="#ffffff" stroke-width="3"/>
        <!-- Cercles des lancers francs (R=1.80m) -->
        <circle cx="204" cy="230" r="43" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="596" cy="230" r="43" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Ligne médiane & Cercle central (R=1.80m) -->
        <line x1="400" y1="50" x2="400" y2="410" stroke="#ffffff" stroke-width="3"/>
        <circle cx="400" cy="230" r="43" fill="#991b1b" stroke="#ffffff" stroke-width="3"/>
        <!-- Lignes à 3 points FIBA (6.75m, et 6.60m dans les corners) -->
        <path d="M 65 72 L 136 72 A 161 161 0 0 1 136 388 L 65 388" fill="none" stroke="#ffffff" stroke-width="3"/>
        <path d="M 735 72 L 664 72 A 161 161 0 0 0 664 388 L 735 388" fill="none" stroke="#ffffff" stroke-width="3"/>
        <!-- Panneaux (à 1.20m de la ligne de fond), Anneaux (à 1.575m) et demi-cercles de non-charge (R=1.25m) -->
        <line x1="94" y1="208" x2="94" y2="252" stroke="#fde047" stroke-width="3.5"/>
        <circle cx="103" cy="230" r="7" fill="none" stroke="#fde047" stroke-width="2.5"/>
        <path d="M 94 200 A 30 30 0 0 1 94 260" fill="none" stroke="#ffffff" stroke-width="2"/>
        <line x1="706" y1="208" x2="706" y2="252" stroke="#fde047" stroke-width="3.5"/>
        <circle cx="697" cy="230" r="7" fill="none" stroke="#fde047" stroke-width="2.5"/>
        <path d="M 706 200 A 30 30 0 0 0 706 260" fill="none" stroke="#ffffff" stroke-width="2"/>
        <!-- Annotations -->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">LONGUEUR FIBA : 28,00 m · LARGEUR : 15,00 m · Hauteur de l'anneau : 3,05 m exactement</text>
          <text x="24" y="230" transform="rotate(-90 24 230)" fill="#fde047">LARGEUR : 15,00 m</text>
          <text x="135" y="162" font-size="11">Raquette : 5,80 m × 4,90 m</text>
          <text x="275" y="125" fill="#fde047">Ligne des 3 pts : 6,75 m (Coins : 6,60 m)</text>
          <text x="204" y="290" font-size="11">Lancer franc : 4,60 m du panneau</text>
          <text x="400" y="176" font-size="11">Cercle R = 1,80 m</text>
          <text x="400" y="438" fill="#ffffff">Règles de temps : 3s (Raquette) · 5s (Touche/Joueur serré) · 8s (Zone arrière) · 24s / 14s (Tir)</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Art. 2)', 'Longueur : 28,00 m · Largeur : 15,00 m (Lignes blanches de 5 cm situées À L\'EXTÉRIEUR de la surface de jeu)', 'Un joueur qui touche la ligne de touche ou de fond est HORS DU JEU (contrairement au Football et au Volleyball)'],
      ['Hauteur du panier & Panneau', 'Hauteur du bord supérieur de l\'anneau : 3,05 m · Diamètre intérieur de l\'anneau : 45 cm · Panneau : 1,80 m × 1,05 m (avancé de 1,20 m dans le terrain)', 'Mini-Basket (U11) : hauteur abaissée à 2,60 m · Collège et Lycée : 3,05 m'],
      ['Ligne à 3 points & Raquette', 'Arc à 3 points : 6,75 m du centre de l\'anneau (6,60 m dans les corners) · Raquette rectangulaire : 5,80 m × 4,90 m · Lancer franc à 4,60 m du panneau', 'Demi-cercle de non-charge sous le panier : rayon de 1,25 m'],
      ['Le Ballon (Art. 3)', 'Taille 7 (Hommes & Garçons U15+) : 74,9–78 cm, 567–650 g · Taille 6 (Femmes & Garçons U12–U14 / Collège) : 72,4–73,7 cm, 510–567 g', 'Taille 5 (Mini-Basket / U11) : 69–70 cm, 470–500 g'],
      ['Joueurs & Durée (Art. 4 & 8)', '5 joueurs sur le terrain (sur 12 inscrits) · 4 quart-temps de 10 minutes en temps effectif (Prolongations de 5 min)', 'Pause de 2 min entre QT1/QT2 et QT3/QT4, et mi-temps de 15 min'],
      ['Fautes Individuelles & d\'Équipe', 'Un joueur est exclu à sa 5e faute personnelle (ou technique/antisportive) · Pénalité d\'équipe : 2 lancers francs dès la 5e faute d\'équipe dans le quart-temps', 'Un joueur qui reçoit 2 fautes techniques ou 2 fautes antisportives (ou 1 FT + 1 FA) est automatiquement disqualifié (GD)']
    ],
    lawsSummary: [
      {
        title: 'La Règle du Marcher et le « Pas Zéro » (Gather Step — Art. 25 FIBA)',
        content: 'Lorsqu\'un joueur reçoit le ballon en mouvement (ou met fin à son dribble alors qu\'il a un pied au sol), ce pied déjà au sol est appelé le « Pas Zéro » (Gather Step). L\'appui suivant qui touche le sol devient le Pied 1 (pied de pivot), puis le joueur peut poser le Pied 2 avant de lâcher le ballon pour passer ou tirer en course (lay-up). En revanche, s\'il s\'arrête après ses deux appuis, il ne peut plus lever son pied de pivot (Pied 1) avant que le ballon ait quitté ses mains pour débuter un dribble ! S\'il lève son pied de pivot avant de lâcher la balle pour dribbler : violation de « Marcher ».'
      },
      {
        title: 'Les 4 Règles Temporelles Fondamentales (3s, 5s, 8s et 24s / 14s)',
        content: '1) Règle des 3 secondes (Art. 26) : aucun joueur attaquant ne peut rester plus de 3 secondes consécutives dans la zone restrictive (raquette) adverse lorsque son équipe a le contrôle du ballon en zone avant. 2) Règle des 5 secondes (Art. 27) : 5s max pour effectuer une remise en jeu, 5s max pour tirer un lancer franc, et 5s max lorsqu\'un joueur étroitement marqué (à moins d\'1 mètre) tient le ballon sans dribbler, passer ni tirer. 3) Règle des 8 secondes (Art. 28) : l\'équipe qui contrôle le ballon dans sa zone arrière a 8 secondes pour l\'amener en zone avant (et ne peut plus le renvoyer en zone arrière : « retour en zone »). 4) Règle des 24 secondes / 14 secondes (Art. 29) : 24s pour tenter un tir qui touche l\'anneau ; sur rebond offensif après que le ballon a touché l\'anneau (ou sur faute défensive en zone avant), le chronomètre des tirs est réinitialisé à 14 secondes (et non 24s).'
      },
      {
        title: 'La Règle du Cylindre et des Contacts (Art. 33 à 38 FIBA)',
        content: 'Au Basketball, chaque joueur a le droit d\'occuper son « cylindre » imaginaire (délimité par ses paumes à l\'avant, ses fesses à l\'arrière et l\'extérieur de ses bras/jambes sur les côtés). Un défenseur qui est arrivé le premier sur sa position avec les deux pieds au sol et face à son adversaire est dans une position légale de défense : si l\'attaquant lui fonce dans le torse, c\'est une faute offensive (« Passage en force / Charge »), sauf si le défenseur a les pieds à l\'intérieur du demi-cercle de non-charge (R=1,25 m) sous le panier. La Faute Antisportive (critères C1 à C5 FIBA : contact excessif, pas de tentative légitime de jouer le ballon, faute d\'arrêt de contre-attaque par derrière/côté sans adversaire entre le porteur et le panier) est punie de 2 lancers francs + possession au niveau de la ligne de remise en jeu en zone avant.'
      }
    ],
    refereeSignals: [
      {
        code: 'FIBA · Signal 1 à 3',
        name: 'Validation du Panier : 1 point, 2 points ou 3 points',
        when: 'Lancer franc réussi (1 pt), panier intérieur (2 pts) ou tir derrière l\'arc de 6,75 m (3 pts).',
        how: '1 pt : 1 doigt levé avec flexion du poignet. 2 pts : 2 doigts levés avec flexion du poignet. 3 pts : l\'arbitre lève 1 bras avec 3 doigts tendus pendant le tir, puis lève les DEUX bras avec 3 doigts si le panier à 3 points est marqué.',
        svgType: 'three_points_both_arms'
      },
      {
        code: 'FIBA · Signal 5 & 6',
        name: 'Arrêter le Chronomètre pour Violation vs pour Faute',
        when: 'Tout coup de sifflet de l\'arbitre arrête immédiatement le chronomètre de jeu.',
        how: 'Pour une Violation (marcher, sortie, 3s) : un bras levé verticalement, paume ouverte. Pour une Faute personnelle : un bras levé verticalement, POING FERMÉ.',
        svgType: 'fist_up_foul'
      },
      {
        code: 'FIBA · Signal 12',
        name: 'Violation de Marcher (Travelling)',
        when: 'Déplacement illégal du pied de pivot ou plus de 2 pas après le pas zéro sans dribbler.',
        how: 'Coup de sifflet + bras levé paume ouverte (violation), suivi de la rotation des deux poings l\'un autour de l\'autre devant la poitrine.',
        svgType: 'travelling_rotate'
      },
      {
        code: 'FIBA · Signal 13',
        name: 'Double Dribble ou Dribble Illégal (Porté de balle)',
        when: 'Le joueur reprend son dribble après l\'avoir arrêté à deux mains, ou passe la main sous le ballon (« porté »).',
        how: 'Pour la reprise de dribble : mouvement alternatif de tapotement de haut en bas avec les deux mains ouvertes à plat. Pour le porté : demi-rotation de la paume de la main.',
        svgType: 'double_dribble_hands'
      },
      {
        code: 'FIBA · Signal 15 à 18',
        name: 'Violations de Temps : 3 secondes, 5 secondes, 8 secondes et 24 secondes',
        when: 'Dépassement du temps réglementaire (dans la raquette, sur remise en jeu, en zone arrière ou sur possession).',
        how: '3s : bras tendu montrant 3 doigts vers la raquette. 5s : 5 doigts levés. 8s : 8 doigts montrés à deux mains. 24s : l\'arbitre tapote le sommet de son épaule du bout des doigts.',
        svgType: 'tap_shoulder_24s'
      },
      {
        code: 'FIBA · Signal 19',
        name: 'Retour en Zone (Ballon retourné en zone arrière)',
        when: 'L\'équipe qui contrôle le ballon en zone avant est la dernière à le toucher avant qu\'il ne retourne en zone arrière.',
        how: 'L\'arbitre balance son bras tendu devant son corps de gauche à droite avec l\'index et le majeur tendus.',
        svgType: 'point_horizontal'
      },
      {
        code: 'FIBA · Signal 37 & 38',
        name: 'Usage Illégal des Mains (n°37) & Bloquer / Obstruction (n°38)',
        when: 'n°37 : défenseur qui tape sur les bras du dribbleur/tireur. n°38 : défenseur en retard qui coupe la trajectoire de l\'attaquant.',
        how: 'n°37 : frapper le poignet avec l\'autre main. n°38 (Obstruction) : l\'arbitre pose ses deux mains sur ses hanches.',
        svgType: 'hands_on_hips_blocking'
      },
      {
        code: 'FIBA · Signal 40 & 42',
        name: 'Tenir (n°40) & Passage en Force / Charge avec Ballon (n°42)',
        when: 'n°40 : retenir le maillot ou le bras. n°42 : l\'attaquant percute le torse d\'un défenseur stationnaire.',
        how: 'n°40 : saisir son poignet vers le bas. n°42 (Passage en force) : frapper la paume ouverte d\'une main avec le poing fermé de l\'autre main, puis pointer dans le sens de la défense.',
        svgType: 'charging_fist_palm'
      },
      {
        code: 'FIBA · Signal 46',
        name: 'Faute Technique (Signe T)',
        when: 'Infraction de comportement sans contact (contestation, simulation/flopping, retarder le jeu).',
        how: 'L\'arbitre forme un « T » en plaçant la paume d\'une main perpendiculairement sur les doigts de l\'autre main. Sanction : 1 lancer franc + le jeu reprend là où il a été arrêté.',
        svgType: 'timeout_t'
      },
      {
        code: 'FIBA · Signal 47',
        name: 'Faute Antisportive (C1 à C5)',
        when: 'Contact dur, absence d\'action sur le ballon ou arrêt illicite d\'une contre-attaque.',
        how: 'L\'arbitre lève les deux bras au-dessus de la tête et saisit son poignet avec l\'autre main. Sanction : 2 lancers francs + remise en jeu en zone avant.',
        svgType: 'unsportsmanlike_wrist'
      }
    ],
    epsAdaptationTable: [
      ['Effectif & Espace', '5 contre 5 sur terrain 28 × 15 m', 'Collège (OP 2009) : 3c3 sur demi-terrain (panier unique) ou 4c4 sur terrain entier pour désengorger la raquette', 'Lycée (OP 2007) : 5c5 avec attaque placée contre défense individuelle ou défense de zone 2-1-2'],
      ['Règle du Marcher', 'Application stricte du pied de pivot et du pas zéro', 'En 1AC/2AC : tolérance pédagogique sur le pied de pivot à l\'arrêt si l\'élève lève la tête pour chercher un partenaire démarqué', 'En 3AC et Lycée : application complète du double pas (lay-up) et du départ en dribble direct'],
      ['Règle des 3s / 24s', 'Chronomètres officiels 24s / 14s et 3 secondes', 'En EPS : un élève à la table de marque annonce « 3 secondes dans la peinture ! » si un pivot campe sous le cercle', 'Remplacement des 24s par une règle de 5 passes maximum pour déclencher un tir près du cercle'],
      ['Contacts (« Non-contact »)', 'Principe du cylindre et de la verticalité', 'Règle d\'or en EPS : « Défense à 1 bras de distance sur le porteur immobile » en début de cycle pour supprimer l\'arrachage agressif du ballon', 'Toute faute sur un tireur en double pas accorde 1 point automatique + lancer franc']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions exactes d\'un terrain de Basketball FIBA et à quelle hauteur se situe l\'anneau ?',
        a: 'Le terrain mesure 28 mètres de long sur 15 mètres de large (mesurés depuis le bord intérieur des lignes de 5 cm, qui ne font pas partie du terrain). Le bord supérieur de l\'anneau est situé à 3,05 mètres exactement du sol.'
      },
      {
        q: '2. À quelle distance du panier se situe la ligne à 3 points et la ligne de lancer franc en FIBA ?',
        a: 'L\'arc à 3 points est tracé à un rayon de 6,75 mètres du centre de l\'anneau (et à 6,60 mètres sur les lignes droites parallèles aux lignes de touche dans les coins). La ligne de lancer franc est située à 5,80 mètres de la ligne de fond (soit à 4,60 mètres de la planche du panneau).'
      },
      {
        q: '3. Quelle est la différence dans le geste de l\'arbitre FIBA entre l\'arrêt du chronomètre pour une Violation et pour une Faute ?',
        a: 'Pour une Violation (marcher, retour en zone, sortie, 3s), l\'arbitre siffle et lève un bras verticalement avec la PAUME OUVERTE. Pour une Faute personnelle (contact illégal), l\'arbitre siffle et lève un bras verticalement avec le POING FERMÉ.'
      },
      {
        q: '4. À combien de secondes le chronomètre des tirs (24s) est-il réinitialisé après un rebond offensif suite à un tir qui a touché l\'anneau ?',
        a: 'Il est réinitialisé à 14 secondes (et non à 24 secondes), afin d\'accélérer le rythme du jeu en zone avant.'
      },
      {
        q: '5. Quand y a-t-il « Retour en zone » (Ballon retourné en zone arrière — Art. 30 FIBA) ?',
        a: 'Il faut la réunion de 3 conditions : 1) L\'équipe a le contrôle d\'un ballon vivant dans sa zone avant ; 2) Un joueur de cette équipe est le dernier à toucher le ballon dans sa zone avant ; 3) Un joueur de cette même équipe est le premier à toucher le ballon après qu\'il a touché la zone arrière (ou la ligne médiane).'
      },
      {
        q: '6. À partir de combien de fautes un joueur est-il exclu en FIBA, et à partir de combien de fautes d\'équipe par quart-temps accorde-t-on 2 lancers francs ?',
        a: 'Un joueur doit quitter le jeu dès qu\'il commet sa 5e faute personnelle/technique. Une équipe est en situation de pénalité de fautes d\'équipe après sa 4e faute dans un quart-temps : ainsi, à partir de la 5e faute d\'équipe du quart-temps, toute faute défensive (même non commise sur un joueur en train de tirer) donne droit à 2 lancers francs.'
      },
      {
        q: '7. Quelle est la sanction d\'une Faute Technique et d\'une Faute Antisportive en Basketball FIBA ?',
        a: 'Faute Technique (Geste T) : 1 lancer franc tiré par n\'importe quel joueur de l\'équipe adverse, puis le jeu reprend à l\'endroit et en faveur de l\'équipe qui avait la possession au moment de l\'arrêt. Faute Antisportive (poignet saisi au-dessus de la tête) : 2 lancers francs (ou 3 sur tir à 3 pts manqué, ou 1 si panier marqué) + remise en jeu à la ligne de remise en jeu en zone avant avec 14 secondes de possession.'
      },
      {
        q: '8. En quoi consiste le principe de la « Possession alternée » (flèche à la table de marque) en Basketball FIBA ?',
        a: 'En FIBA, seul l\'entre-deux initial au début du 1er quart-temps est disputé au cercle central. Toutes les situations d\'entre-deux suivantes (ballon tenu simultanément par deux adversaires, ballon coincé entre l\'anneau et la planche, début des QT2, QT3 et QT4) sont réglées par une remise en jeu de touche selon le sens de la flèche de possession alternée.'
      },
      {
        q: '9. Qu\'est-ce que le « Pas Zéro » (Gather Step) introduit par la FIBA dans l\'Article 25 ?',
        a: 'Lorsqu\'un joueur contrôle le ballon alors qu\'il est en mouvement et a déjà un pied en contact avec le sol, ce pied ne compte pas dans les 2 appuis autorisés : c\'est le « pas zéro ». Le prochain pied qui touche le sol est l\'appui 1 (pied de pivot), suivi de l\'appui 2 pour tirer ou passer.'
      },
      {
        q: '10. Comment le candidat au CRMEF communique-t-il une faute à la table de marque selon le protocole FIBA en 3 étapes ?',
        a: 'Après avoir sifflé (poing levé) et indiqué la nature de la faute sur place, l\'arbitre se place à 6–8 mètres de la table de marque à l\'arrêt et effectue dans l\'ordre : 1) Le numéro du joueur fautif ; 2) Le type de faute (ex. tenir, pousser, obstruction) ; 3) La sanction / nombre de lancers francs ou la direction de la remise en jeu.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Basketball Collège & Lycée · Épreuve du Baccalauréat EPS au Maroc',
      reality: 'Au Basketball en EPS, le défaut numéro 1 des élèves débutants est de regarder le ballon en dribblant sur place, puis de s\'arrêter à deux mains dès qu\'un défenseur s\'approche... et de repartir en dribble (double dribble) ou de lever les deux pieds (marcher).',
      tip: 'J\'apprends à mes élèves la règle du « Triple Menace (Tir - Passe - Dribble) » dès la réception : tant que tu n\'as pas dribblé, tu as le droit aux 3 actions. Dès que tu arrêtes ton dribble à deux mains, l\'élève-arbitre compte à voix haute « 1, 2, 3, 4, 5 secondes ! » : cela oblige le porteur à pivoter immédiatement sur son pied d\'appui et ses partenaires à couper vers le panier (jeu en Give and Go / Passe et va).'
    }
  },

  // ============================================================================
  // 6. BASKET 3x3 (FIBA 3x3 OFFICIAL RULES 2026)
  // ============================================================================
  {
    id: 'basket-3x3',
    slug: 'reglement-basket-3x3-fiba-arbitrage-eps.html',
    relatedArticle: 'article-basket-3x3-eps.html',
    relatedCycleCollege: 'cycle-basketball-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-basketball-lycee-eps-maroc.html',
    sportName: 'Basket 3×3 (Discipline Olympique & Scolaire)',
    shortTitle: 'Règlement Basket 3×3 (Règles FIBA 3×3 2026) & Arbitrage',
    title: 'Règlement Officiel du Basket 3×3 (Règles FIBA 2026), Demi-Terrain 15×11m, Check-Ball, Arbitrage & PDF | ProfEPS',
    metaDesc: 'Règlement officiel complet du Basket 3x3 FIBA 2026 adapté à l\'EPS et l\'ASS au Maroc : demi-terrain 15x11m, match en 10 min ou 21 pts, 12 secondes de tir, check-ball, dégagement derrière l\'arc, arbitrage et PDF officiel.',
    badge: '🔥 Règlement Officiel FIBA 3×3 2026 & Arbitrage',
    federation: 'FIBA 3×3 / FRMBB / FRMSS (Sport Scolaire Maroc)',
    lawVersion: 'Règles Officielles FIBA 3×3 2025/2026 (Version Intégrale)',
    datePublished: '2026-10-29',
    dateLabel: '29 Octobre 2026',
    readTime: '22 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Officielles du Basket 3×3 FIBA 2026 (PDF)',
        org: 'FIBA 3×3 — Official 3x3 Basketball Rules',
        url: 'https://fiba3x3.com/en/rules.html',
        note: 'Texte officiel complet des règles FIBA 3×3 (version courte et version intégrale) et interprétations officielles.'
      },
      {
        label: 'Règlement Officiel 3×3 en Français (FFBB / FIBA)',
        org: 'FFBB 3×3',
        url: 'https://www.3x3ffbb.com/page/regles-du-jeu',
        note: 'Synthèse officielle en français du règlement 3×3 pour les tournois scolaires et fédéraux.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Basket 3x3 FIBA 15m x 11m">
        <rect width="800" height="460" fill="#0f172a"/>
        <!-- Demi-terrain 3x3 : Largeur 15m x Profondeur 11m -->
        <rect x="130" y="55" width="540" height="350" fill="#0369a1" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Raquette 5.80m x 4.90m en haut -->
        <rect x="312" y="55" width="176" height="184" fill="#991b1b" stroke="#ffffff" stroke-width="3"/>
        <circle cx="400" cy="239" r="57" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Arc à 2 points (6.75m) -->
        <path d="M 162 55 L 162 145 A 238 238 0 0 0 638 145 L 638 55" fill="none" stroke="#fde047" stroke-width="3.5"/>
        <!-- Panneau, Anneau et Demi-cercle de non-charge (R=1.25m) -->
        <line x1="368" y1="93" x2="432" y2="93" stroke="#fde047" stroke-width="4"/>
        <circle cx="400" cy="105" r="9" fill="none" stroke="#fde047" stroke-width="3"/>
        <path d="M 355 93 A 45 45 0 0 0 445 93" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Zone de Check-Ball au sommet de l'arc -->
        <circle cx="400" cy="365" r="24" fill="rgba(253,224,71,0.25)" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5,4"/>
        <!-- Annotations -->
        <g font-family="Inter, sans-serif" font-size="12.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="30" fill="#fde047">LARGEUR : 15,00 m · PROFONDEUR : 11,00 m (1 seul panier à 3,05 m — Idéal pour 2 terrains par plateau EPS)</text>
          <text x="95" y="230" transform="rotate(-90 95 230)" fill="#fde047">PROFONDEUR : 11,00 m</text>
          <text x="400" y="160">Zone restrictive (3s)</text>
          <text x="400" y="218" font-size="11.5">Panier intérieur = 1 POINT</text>
          <text x="400" y="315" fill="#fde047">Derrière l'arc de 6,75 m = 2 POINTS (et zone de dégagement « Clear »)</text>
          <text x="400" y="369" fill="#fde047" font-size="11">Zone de Check-Ball</text>
          <text x="400" y="435" fill="#ffffff">Durée : 10 min ou 1re équipe à 21 points · Possession : 12 secondes · Ballon unique FIBA 3×3 (Taille 6 / Poids 7)</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain', 'Largeur : 15,00 m × Profondeur : 11,00 m avec 1 seul panier (ou un demi-terrain de Basketball 5×5 classique)', 'Permet de faire jouer 4 équipes simultanément sur les 2 paniers d\'un seul terrain scolaire !'],
      ['Le Ballon officiel FIBA 3×3', 'Circonférence d\'un ballon Taille 6 (72,4 cm) mais avec la masse d\'un ballon Taille 7 (567–650 g)', 'Utilisé pour TOUTES les catégories (Hommes, Femmes et Mixte) pour résister au vent en extérieur'],
      ['Effectif & Remplacements', '3 joueurs sur le terrain + 1 remplaçant (4 joueurs par équipe) · Aucun coaching autorisé depuis les tribunes/banc', 'Remplacements volants illimités derrière la ligne opposée au panier lorsque le ballon est mort (avant le Check-Ball)'],
      ['Décompte des points (Art. 5)', 'Panier à l\'intérieur de l\'arc : 1 point · Panier derrière l\'arc de 6,75 m : 2 points · Lancer franc réussi : 1 point', 'Échelle 1 pt / 2 pts qui valorise fortement l\'adresse extérieure'],
      ['Durée & Condition de victoire', '1 seule période de 10 minutes en temps effectif OU la première équipe qui atteint 21 points (ou plus) avant la fin des 10 min gagne immédiatement !', 'En cas d\'égalité à la fin des 10 min : prolongation sans limite de temps, la première équipe qui marque 2 points gagne !'],
      ['Chronomètre de tir & Fautes', '12 secondes seulement pour tenter un tir · Pas d\'exclusion individuelle à 5 fautes (sauf 2 fautes antisportives)', 'Fautes d\'équipe : Fautes 1 à 6 = Check-ball · Fautes 7, 8 et 9 = 2 lancers francs · Faute 10 et + = 2 lancers francs + possession !']
    ],
    lawsSummary: [
      {
        title: 'La Règle du Dégagement (« Clear the Ball » derrière l\'arc de 6,75 m)',
        content: 'C\'est la règle tactique centrale du Basket 3×3 :- Après chaque panier encaissé : il n\'y a PAS de remise en jeu derrière la ligne de fond ! Un joueur de l\'équipe qui vient d\'encaisser le panier reprend immédiatement le ballon en dribblant ou en passant depuis l\'intérieur du demi-cercle de non-charge sous le panier vers un partenaire situé DERRIÈRE l\'arc de 6,75 m (et les défenseurs n\'ont pas le droit de défendre sur lui tant qu\'il est dans le demi-cercle de non-charge).- Après un tir manqué (rebond défensif) ou une interception : l\'équipe qui récupère le ballon doit obligatoirement le « sortir / dégager » derrière l\'arc de 6,75 m (le porteur ou le réceptionneur doit avoir les DEUX pieds derrière l\'arc). Si elle tire sans avoir dégagé le ballon derrière l\'arc : violation !'
      },
      {
        title: 'Le « Check-Ball » au sommet de l\'arc',
        content: 'Après chaque ballon mort (sortie en touche, faute hors lancers francs, marcher, 3 secondes), le jeu reprend par un « Check-Ball » au sommet de l\'arc de 6,75 m face au panier : le défenseur remet le ballon à l\'attaquant par une passe rebondie ou directe. Dès que l\'attaquant contrôle le ballon, le jeu est ouvert (il peut immédiatement tirer, passer ou dribbler).'
      },
      {
        title: 'La Règle des 12 Secondes et du « Stalling » (Refus de jouer)',
        content: 'L\'équipe en attaque ne dispose que de 12 secondes pour déclencher un tir qui touche l\'anneau. De plus, en 3×3, le fait de dribbler dos au panier ou sur le côté pendant plus de 3 à 5 secondes sans chercher activement à attaquer le cercle est une violation de « Stalling » (jeu passif).'
      }
    ],
    refereeSignals: [
      {
        code: 'FIBA 3×3 · Signal 1',
        name: 'Check-Ball au Sommet de l\'Arc',
        when: 'Reprise du jeu après tout ballon mort (sortie, violation, faute d\'équipe 1 à 6).',
        how: 'L\'arbitre désigne le sommet de l\'arc (zone de Check-ball) ; le défenseur tend le ballon à l\'attaquant à 1 mètre de distance.',
        svgType: 'point_horizontal'
      },
      {
        code: 'FIBA 3×3 · Signal 2',
        name: 'Violation de Non-Dégagement (« Ball Not Cleared »)',
        when: 'Après un rebond défensif ou une interception, l\'équipe tire au panier sans avoir préalablement sorti le ballon (les 2 pieds) derrière l\'arc.',
        how: 'Coup de sifflet + bras levé paume ouverte (violation), puis l\'arbitre pointe les deux index vers la ligne de l\'arc de 6,75 m.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'FIBA 3×3 · Signal 3',
        name: 'Panier à 1 Point vs Panier à 2 Points',
        when: 'En 3×3, un tir intérieur vaut 1 point et un tir derrière l\'arc de 6,75 m vaut 2 points.',
        how: '1 point : 1 doigt levé avec cassure du poignet. 2 points (derrière l\'arc) : 2 doigts levés pendant le tir puis les deux bras levés si réussi.',
        svgType: 'two_minutes_v'
      },
      {
        code: 'FIBA 3×3 · Signal 4',
        name: 'Violation des 12 Secondes (Chronomètre de tir)',
        when: 'L\'équipe en possession n\'a pas tiré au panier (avec contact sur l\'anneau) dans les 12 secondes.',
        how: 'L\'arbitre lève un bras paume ouverte puis tapote son épaule du bout des doigts.',
        svgType: 'tap_shoulder_24s'
      },
      {
        code: 'FIBA 3×3 · Signal 5',
        name: 'Violation de « Stalling » (Jeu Passif > 5s)',
        when: 'Un attaquant dribble sur place ou dos au panier plus de 5 secondes sans tenter d\'attaquer le cercle (surtout sur terrain EPS sans chrono 12s).',
        how: 'L\'arbitre effectue un décompte des 5 dernières secondes de la main puis siffle la perte de balle.',
        svgType: 'five_fingers_up'
      },
      {
        code: 'FIBA 3×3 · Signal 6',
        name: 'Gêne illégale dans le Demi-Cercle de Non-Charge après Panier',
        when: 'Après avoir marqué un panier, le défenseur tente d\'intercepter ou de gêner la relance alors que le relanceur est encore dans le demi-cercle sous l\'anneau.',
        how: 'Avertissement au 1er cas, puis Faute Technique (1 lancer franc + possession) en cas de récidive.',
        svgType: 'timeout_t'
      },
      {
        code: 'FIBA 3×3 · Signal 7',
        name: 'Situation d\'Entre-Deux (Toujours au profit de la Défense !)',
        when: 'Deux adversaires tiennent fermement le ballon en même temps (Held Ball) ou le ballon se coince sur le support de l\'anneau.',
        how: 'L\'arbitre lève les deux pouces en l\'air puis accorde systématiquement la possession (Check-Ball) à l\'équipe qui DÉFENDAIT !',
        svgType: 'thumbs_up_jumpball'
      },
      {
        code: 'FIBA 3×3 · Signal 8',
        name: 'Pénalité d\'Équipe (7e, 8e, 9e et 10e faute d\'équipe)',
        when: 'Une équipe atteint 7 fautes collectives (2 LF) ou 10 fautes collectives (2 LF + possession).',
        how: 'L\'arbitre lève le poing (faute), indique le numéro du joueur, puis lève 2 doigts pour les 2 lancers francs.',
        svgType: 'fist_up_foul'
      },
      {
        code: 'FIBA 3×3 · Signal 9',
        name: 'Marcher (Travelling)',
        when: 'Violation des appuis au départ en dribble ou à l\'arrêt.',
        how: 'Rotation des deux poings l\'un autour de l\'autre devant le buste.',
        svgType: 'travelling_rotate'
      },
      {
        code: 'FIBA 3×3 · Signal 10',
        name: 'Faute Antisportive (2 LF / 2 LF + Possession)',
        when: 'Contact dur ou dangereux : la 1re FA = 2 LF ; la 2e FA d\'un même joueur = Disqualification du match.',
        how: 'L\'arbitre saisit son poignet au-dessus de la tête.',
        svgType: 'unsportsmanlike_wrist'
      }
    ],
    epsAdaptationTable: [
      ['Occupation des paniers', '1 demi-terrain officiel 15 × 11 m', 'Sur un plateau scolaire possédant 2 paniers (et éventuellement 2 paniers latéraux) : 2 à 4 terrains de 3×3 en simultané pour faire jouer 24 élèves !', 'Les élèves remplaçants assurent l\'arbitrage du Check-ball et le décompte à voix haute des 12 secondes'],
      ['Relance après panier', 'Dribble/passe direct depuis le demi-cercle vers derrière l\'arc', 'En 1AC/2AC : autorisation d\'un Check-ball au sommet de l\'arc même après un panier encaissé pour laisser 3 secondes à la défense pour se replacer', 'En Lycée : relance rapide officielle depuis le demi-cercle de non-charge (travail de la transition attaque/défense immédiate)'],
      ['Durée & Score cible', '10 min ou 21 points', 'En séance d\'EPS : matchs sprint de 5 minutes ou première équipe à 7 points (« King of the Court / Montante-Descendante »)', 'Permet d\'enchaîner 5 à 6 matchs par séance avec une intensité cardio-vasculaire maximale']
    ],
    crmefQuestions: [
      {
        q: '1. Comment se termine un match officiel de Basket 3×3 FIBA en temps réglementaire et en prolongation ?',
        a: 'En temps réglementaire (10 minutes), la première équipe qui atteint ou dépasse 21 points gagne immédiatement le match avant la fin du chronomètre. En cas d\'égalité à la fin des 10 minutes, après 1 minute de pause, la première équipe qui marque 2 points en prolongation remporte immédiatement le match.'
      },
      {
        q: '2. À qui revient la possession du ballon lors d\'une situation d\'entre-deux (ballon tenu) en Basket 3×3 FIBA ?',
        a: 'Contrairement au 5×5 (qui utilise la flèche de possession alternée), en Basket 3×3 toute situation d\'entre-deux donne systématiquement la possession du ballon à l\'équipe DÉFENSIVE (par un Check-Ball au sommet de l\'arc).'
      },
      {
        q: '3. Comment le jeu reprend-il après un panier marqué dans le jeu courant en Basket 3×3 ?',
        a: 'L\'arbitre ne touche pas le ballon et il n\'y a pas de remise en jeu derrière la ligne de fond : un joueur de l\'équipe qui vient d\'encaisser le panier prend le ballon directement sous le cercle (à l\'intérieur du demi-cercle de non-charge) et doit le dribbler ou le passer vers un emplacement situé derrière l\'arc de 6,75 m.'
      },
      {
        q: '4. Combien de fautes personnelles entraînent l\'exclusion d\'un joueur en Basket 3×3 FIBA ?',
        a: 'En Basket 3×3, un joueur n\'est PAS exclu pour 5 fautes personnelles normales : seules les fautes d\'équipe sont comptabilisées (2 LF à partir de la 7e faute d\'équipe, 2 LF + possession à partir de la 10e). En revanche, un joueur qui commet 2 fautes antisportives est disqualifié du match.'
      },
      {
        q: '5. Quelle est la durée du chronomètre des tirs en Basket 3×3 ?',
        a: 'Elle est de 12 secondes (contre 24/14 secondes en Basketball 5×5).'
      }
    ],
    fieldExperience: {
      context: '📍 Tournoi 3×3 en EPS & ASS · 2 demi-terrains simultanés · 36 élèves',
      reality: 'En classe de 36 à 40 élèves avec seulement 2 paniers de basket, le 5 contre 5 sur terrain entier ne fait jouer que 10 élèves pendant que 26 attendent assis ! Le passage au Basket 3×3 sur les deux demi-terrains résout instantanément ce problème d\'engagement moteur.',
      tip: 'J\'organise ma classe en 6 équipes de 3 joueurs par demi-terrain (soit 12 équipes au total sur les 2 paniers) en formule « Roi du Terrain » : match de 4 minutes ou premier à 5 points, arbitrage assuré par l\'équipe qui attend au Check-Ball avec décompte sonore des 12 secondes. Le temps d\'engagement moteur réel des élèves est doublé dès la première séance !'
    }
  }
];
