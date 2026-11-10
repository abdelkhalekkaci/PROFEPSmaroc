// Données encyclopédiques des Règlements Officiels 2025/2026 & Gestes d'Arbitrage Illustrés — Partie 2 (Volley, Beach-Volley, Raquettes, Athlétisme & Gymnastique)
module.exports = [
  // ============================================================================
  // 7. VOLLEYBALL 6x6 (FIVB OFFICIAL VOLLEYBALL RULES 2025-2028)
  // ============================================================================
  {
    id: 'volleyball',
    slug: 'reglement-volleyball-fivb-gestes-arbitrage-eps.html',
    relatedArticle: 'article-volleyball-eps.html',
    relatedCycleCollege: 'cycle-volleyball-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-volleyball-lycee-eps-maroc.html',
    sportName: 'Volleyball (6×6 & Formes Scolaires)',
    shortTitle: 'Règlement Volleyball (Règles FIVB 2026) & Gestes d\'Arbitrage',
    title: 'Règlement Officiel du Volleyball (Règles FIVB 2025-2028), Terrain 18×9m, Gestes d\'Arbitrage Illustrés & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Volleyball conforme au code FIVB 2025-2028 : terrain 18x9m, hauteur du filet, rotations, libéro, nouveautés 2026, gestes officiels du 1er et 2e arbitre illustrés et téléchargement PDF FIVB.',
    badge: '🏐 Règlement Officiel FIVB 2025–2028 & Gestes des Arbitres',
    federation: 'FIVB (Fédération Internationale de Volleyball) / CAVB / FRMVB Maroc',
    lawVersion: 'Règles Officielles de Volleyball FIVB 2025–2028',
    datePublished: '2026-10-29',
    dateLabel: '29 Octobre 2026',
    readTime: '29 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Officielles du Volleyball FIVB 2025–2028 (PDF)',
        org: 'FIVB — Official Volleyball Rules & Refereeing Guidelines',
        url: 'https://www.fivb.com/volleyball/the-game/official-volleyball-rules/',
        note: 'Document officiel intégral de la FIVB (édition 2025–2028 en français/anglais) avec les schémas des terrains et les gestes officiels des arbitres et juges de ligne.'
      },
      {
        label: 'Textes Règlementaires & Arbitrage FFVolley (Version Française FIVB)',
        org: 'FFVolley / Commission Centrale d\'Arbitrage',
        url: 'https://www.ffvb.org/arbitrage/regles-officielles/',
        note: 'Traduction officielle en français des règles FIVB, cas d\'arbitrage et protocole des officiels.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Volleyball FIVB 18m x 9m">
        <rect width="800" height="460" fill="#0f766e"/>
        <!--Terrain 18m x 9m-->
        <rect x="90" y="65" width="620" height="310" fill="#ea580c" stroke="#ffffff" stroke-width="3.5"/>
        <!--Zones avant (3m de chaque côté du filet)-->
        <rect x="297" y="65" width="206" height="310" fill="#f97316" stroke="#ffffff" stroke-width="3"/>
        <!--Filet central et antennes-->
        <line x1="400" y1="48" x2="400" y2="392" stroke="#fde047" stroke-width="5"/>
        <circle cx="400" cy="65" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <circle cx="400" cy="375" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <!--Prolongements pointillés de la ligne d'attaque des 3m (1,75m)-->
        <line x1="297" y1="35" x2="297" y2="65" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5,5"/>
        <line x1="297" y1="375" x2="297" y2="405" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5,5"/>
        <line x1="503" y1="35" x2="503" y2="65" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5,5"/>
        <line x1="503" y1="375" x2="503" y2="405" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5,5"/>
        <!--Marques de la zone de service (9m de large derrière la ligne de fond)-->
        <line x1="68" y1="65" x2="84" y2="65" stroke="#ffffff" stroke-width="3"/>
        <line x1="68" y1="375" x2="84" y2="375" stroke="#ffffff" stroke-width="3"/>
        <line x1="716" y1="65" x2="732" y2="65" stroke="#ffffff" stroke-width="3"/>
        <line x1="716" y1="375" x2="732" y2="375" stroke="#ffffff" stroke-width="3"/>
        <!--Positions de rotation 1 à 6 (camp gauche)-->
        <g font-family="Inter, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">
          <circle cx="165" cy="315" r="16" fill="rgba(15,23,42,0.55)"/><text x="165" y="320">P1</text>
          <circle cx="345" cy="315" r="16" fill="rgba(15,23,42,0.55)"/><text x="345" y="320">P2</text>
          <circle cx="345" cy="220" r="16" fill="rgba(15,23,42,0.55)"/><text x="345" y="225">P3</text>
          <circle cx="345" cy="125" r="16" fill="rgba(15,23,42,0.55)"/><text x="345" y="130">P4</text>
          <circle cx="165" cy="125" r="16" fill="rgba(15,23,42,0.55)"/><text x="165" y="130">P5</text>
          <circle cx="165" cy="220" r="16" fill="rgba(15,23,42,0.55)"/><text x="165" y="225">P6</text>
        </g>
        <!--Annotations-->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">LONGUEUR : 18,00 m (2 camps de 9×9 m) · LARGEUR : 9,00 m · Zone libre : min 3 m tout autour</text>
          <text x="36" y="220" transform="rotate(-90 36 220)" fill="#fde047">Zone de Service : 9,00 m</text>
          <text x="348" y="88" font-size="11" fill="#fde047">Zone Avant : 3,00 m</text>
          <text x="452" y="88" font-size="11" fill="#fde047">Zone Avant : 3,00 m</text>
          <text x="195" y="88" font-size="11">Zone Arrière : 6,00 m</text>
          <text x="605" y="88" font-size="11">Zone Arrière : 6,00 m</text>
          <text x="400" y="422" fill="#fde047">Hauteur du filet : Hommes = 2,43 m · Femmes = 2,24 m · Collège EPS = 2,00 m à 2,15 m</text>
          <text x="400" y="442" fill="#ffffff">Rotation dans le sens des aiguilles d'une montre (P2 → P1 au service) · Lignes de 5 cm INCLUSES dans le terrain</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Règle 1)', 'Rectangle de 18,00 m × 9,00 m (soit 2 camps carrés de 9 m × 9 m) entouré d\'une zone libre d\'au moins 3 m (5 m et 6,5 m en FIVB)', 'Les lignes de 5 cm de large sont INCLUSES dans le terrain : un ballon qui touche même 1 mm de la ligne est « IN » (BON) !'],
      ['Ligne d\'attaque & Zone de service', 'Ligne d\'attaque tracée à 3,00 m de l\'axe de la ligne centrale · Zone de service sur toute la largeur des 9,00 m derrière la ligne de fond', 'Au service, le serveur a 8 secondes après le coup de sifflet du 1er arbitre pour frapper le ballon'],
      ['Hauteur du Filet & Antennes (Règle 2)', 'Seniors Hommes : 2,43 m · Seniors Femmes : 2,24 m · Filet : 1 m de haut × 9,50 à 10 m de long · 2 antennes (mires) de 1,80 m (dépassant de 80 cm)', 'Cadets/Lycée : 2,35 m (G) / 2,15 m (F) · Minimes/Collège : 2,15 m (G) / 2,05 m (F)'],
      ['Le Ballon (Règle 3)', 'Circonférence : 65 à 67 cm · Poids : 260 à 280 g · Pression interne : 0,30 à 0,325 kg/cm² (294 à 318 mbar)', 'Ballon le plus léger des grands sports collectifs de ballon'],
      ['Joueurs, Rotations & Libéro', '6 joueurs sur le terrain (3 avants : P4, P3, P2 ; 3 arrières : P5, P6, P1) + jusqu\'à 2 Libéros', 'Quand l\'équipe en réception gagne l\'échange, ses joueurs tournent d\'une position dans le sens HORAIRE (P2 passe en P1 pour servir)'],
      ['Score & Sets (Règle 6)', 'Match au meilleur des 5 sets (3 sets gagnants) · Sets 1 à 4 en 25 points (avec 2 pts d\'écart) · 5e set décisif (Tie-break) en 15 points (2 pts d\'écart)', 'En ASS / EPS : matchs en 2 sets gagnants de 15 ou 21 points (ou au temps en séance)']
    ],
    lawsSummary: [
      {
        title: 'Les 3 Touches d\'Équipe, le Contre et les Contacts Corporels (Règle 9)',
        content: 'Chaque équipe a droit à un maximum de 3 touches pour renvoyer le ballon par-dessus le filet (entre les deux antennes). Le contact effectué au CONTRE (Block) ne compte PAS comme une touche d\'équipe : après un contre, l\'équipe dispose donc encore de 3 touches, et le joueur qui vient de toucher le ballon au contre a le droit d\'effectuer la 1re touche suivante ! Le ballon peut toucher n\'importe quelle partie du corps (y compris le pied). Lors de la 1re touche de l\'équipe (réception de service ou défense d\'attaque), les contacts multiples consécutifs (« double contact ») sont autorisés à condition qu\'ils aient lieu au cours d\'une seule et même action.'
      },
      {
        title: 'Les Positions, les Rotations et le Rôle du Libéro (Règles 7 et 19)',
        content: 'Au moment où le ballon est frappé par le serveur, chaque joueur (en particulier de l\'équipe en réception) doit être dans sa position : chaque joueur avant (P4, P3, P2) doit avoir au moins une partie d\'un pied plus proche de la ligne centrale que son arrière correspondant (P5, P6, P1), et les joueurs de gauche/droite doivent respecter leur ordre latéral. Dès que le ballon est frappé au service, les joueurs peuvent permuter librement ! Le Libéro (maillot de couleur contrastée) est un spécialiste défensif limité aux postes arrières (P1, P6, P5) : il ne peut ni servir, ni contrer, ni tenter de contrer, ni attaquer un ballon entièrement au-dessus du bord supérieur du filet. Si le Libéro effectue une passe haute à dix doigts (touche) en étant dans la zone avant (3m), son partenaire ne peut pas attaquer ce ballon au-dessus de la hauteur du filet.'
      },
      {
        title: 'Fautes au Filet, Franchissement de la Ligne Centrale et Attaque d\'un Arrière',
        content: 'Toucher la bande blanche ou le filet entre les antennes pendant l\'action de jouer le ballon est une faute. Sous le filet, il est permis de toucher le camp adverse avec les pieds à condition qu\'une partie du pied qui franchit reste en contact avec (ou directement au-dessus de) la ligne centrale (si le pied entier franchit complètement dans le camp adverse : faute de pénétration !). Un joueur arrière (P1, P6, P5) peut attaquer un ballon au-dessus de la hauteur du filet à condition que son impulsion (appel) ait lieu DERRIÈRE la ligne d\'attaque des 3 mètres (sans toucher la ligne des 3m) ; il a ensuite le droit de retomber dans la zone avant.'
      },
      {
        title: 'Nouveautés Réglementaires FIVB 2025–2028 à retenir',
        content: '1) Assouplissement sur la position de l\'équipe au service : l\'équipe qui sert est désormais dispensée des fautes de position strictes au moment de la frappe afin de fluidifier l\'enchaînement service-défense (tandis que l\'équipe en réception reste soumise aux positions). 2) Tolérance sur le « Double Contact » en 2e touche : lorsqu\'un joueur effectue une 2e passe qui reste dans son propre camp pour un coéquipier, un léger double contact involontaire au cours d\'un seul geste de passe n\'est plus systématiquement sifflé s\'il ne constitue pas un ballon tenu/porté. 3) Interdiction stricte de l\'écran au service (lever les bras au-dessus de la tête pour masquer la trajectoire).'
      }
    ],
    refereeSignals: [
      {
        code: 'FIVB · Signal 1 & 2',
        name: 'Autorisation du Service (n°1) & Équipe qui Sert / Gagne le Point (n°2)',
        when: 'n°1 : début de chaque échange (8s pour servir). n°2 : fin de l\'échange pour indiquer le camp vainqueur du point.',
        how: 'n°1 : coup de sifflet et mouvement du bras tendu vers l\'intérieur pour inviter à servir. n°2 : le 1er arbitre tend le bras horizontalement du côté de l\'équipe qui gagne le point et va servir.',
        svgType: 'point_horizontal'
      },
      {
        code: 'FIVB · Signal 14 & 15',
        name: 'Ballon « IN » (Dedans — n°14) vs Ballon « OUT » (Dehors — n°15)',
        when: 'n°14 : le ballon touche le sol du terrain (ou une ligne). n°15 : le ballon tombe hors des lignes sans être touché par le contre/défense.',
        how: 'Ballon IN (n°14) : l\'arbitre pointe le bras et la main ouverte à 45° vers le sol du terrain. Ballon OUT (n°15) : l\'arbitre lève les deux avant-bras verticalement devant lui, mains ouvertes et paumes tournées vers le corps.',
        svgType: 'ball_out_two_forearms'
      },
      {
        code: 'FIVB · Signal 16',
        name: 'Ballon Tenu / Porté / Accompagné (Catch / Lift)',
        when: 'Le ballon n\'est pas frappé nettement mais accompagné, bloqué ou lancé.',
        how: 'L\'arbitre lève lentement un avant-bras devant sa poitrine avec la paume de la main tournée vers le haut.',
        svgType: 'lift_palm_up'
      },
      {
        code: 'FIVB · Signal 17 & 18',
        name: 'Double Touche (2 doigts — n°17) & Quatre Touches (4 doigts — n°18)',
        when: 'n°17 : un même joueur touche 2 fois de suite le ballon (hors contre et 1re touche). n°18 : l\'équipe effectue 4 touches avant de renvoyer.',
        how: 'L\'arbitre lève verticalement le bras en montrant 2 doigts écartés (Double touche) ou 4 doigts écartés (Quatre touches).',
        svgType: 'four_fingers_up'
      },
      {
        code: 'FIVB · Signal 19',
        name: 'Filet Touché par un Joueur ou Ballon de Service dans le Filet',
        when: 'Un joueur touche le filet entre les antennes pendant l\'action de jeu, ou le service ne franchit pas le filet.',
        how: 'L\'arbitre touche le côté correspondant du filet avec la main du côté fautif.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'FIVB · Signal 13',
        name: 'Faute de Position ou de Rotation',
        when: 'Les joueurs ne respectent pas leur ordre sur le terrain au moment de la frappe de service ou un mauvais joueur sert.',
        how: 'L\'arbitre effectue un mouvement circulaire horizontal de l\'index pointé vers le sol.',
        svgType: 'rotation_circle_finger'
      },
      {
        code: 'FIVB · Signal 22',
        name: 'Pénétration sous le Filet dans le Camp Adverse (Ligne Centrale)',
        when: 'Le pied entier d\'un joueur franchit complètement la ligne centrale dans le camp adverse.',
        how: 'L\'arbitre pointe l\'index vers la ligne centrale sous le filet.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'FIVB · Signal 24',
        name: 'Ballon « Touché » (Ball Touched — Contre ou Défense avant de sortir)',
        when: 'Le ballon sort hors des limites après avoir effleuré les doigts d\'un contreur ou d\'un défenseur.',
        how: 'L\'arbitre frotte la paume d\'une main verticale sur le bout des doigts de l\'autre main tenue horizontalement au-dessus.',
        svgType: 'ball_touched_brush'
      },
      {
        code: 'FIVB · Signal 4 & 5',
        name: 'Temps Mort (n°4 — 30 secondes) & Remplacement de Joueur (n°5)',
        when: 'Demande de temps mort (max 2 par set) ou de remplacement (max 6 par équipe et par set).',
        how: 'Temps mort : signe « T » avec les mains puis désignation de l\'équipe. Remplacement : mouvement circulaire des deux avant-bras l\'un autour de l\'autre.',
        svgType: 'travelling_rotate'
      },
      {
        code: 'FIVB · Signal 6A & 6B',
        name: 'Sanctions d\'Inconduite : Carton Jaune (Avertissement) vs Carton Rouge (Pénalité = 1 point)',
        when: 'En Volleyball FIVB, le Carton Rouge donne 1 POINT et le service à l\'adversaire (sans exclure le joueur) !',
        how: 'Jaune seul = Avertissement. Rouge seul = Pénalité (1 point + service à l\'adversaire). Jaune + Rouge ensemble dans UNE main = Expulsion pour le reste du set. Jaune + Rouge dans DEUX mains séparées = Disqualification du match.',
        svgType: 'card_up'
      }
    ],
    epsAdaptationTable: [
      ['Dimensions & Effectif', '6 contre 6 sur 18×9 m (9×9 m par camp)', 'Collège 1AC/2AC (OP 2009) : 2c2 ou 3c3 sur terrain réduit dans la largeur (6×4,5 m ou 7×5 m) pour multiplier par 3 les contacts par élève', '3AC & Lycée (OP 2007) : 4c4 (losange : 1 passeur P3, 2 ailiers, 1 arrière) ou 6c6 avec système 3-3 / passeur pénétrant'],
      ['Hauteur du Filet', '2,43 m (H) / 2,24 m (F)', 'Collège : ruban élastique ou filet abaissé à 2,00 m–2,10 m (ou incliné de 2,00 m à 2,25 m selon les couloirs de niveau)', 'Lycée : 2,15 m (Filles) et 2,30 m–2,35 m (Garçons)'],
      ['Frappe du Ballon (Ballon tenu)', 'Frappe nette obligatoire dès la 1re touche', 'Débutant (Niveau 1) : autorisation d\'un « Bloqué-Lancé » uniquement sur le 2e contact (au niveau du passeur avant) pour permettre de construire une vraie passe et une attaque !', 'Niveau 2 & Bac : 3 frappes réglementaires (bonus de 2 ou 3 points si le point est marqué après l\'enchaînement Réception → Passe → Attaque)'],
      ['Service', 'Derrière la ligne de fond des 9 m', 'En 1AC/2AC : ligne de service avancée à 6 mètres du filet et service cuillère obligatoire (maximum 3 services consécutifs par même élève avant rotation)', 'En Lycée : service cuillère ou tennis à 9 mètres']
    ],
    crmefQuestions: [
      {
        q: '1. Quelle est la signification exacte du Carton Rouge en Volleyball FIVB (question piège classique du CRMEF) ?',
        a: 'Contrairement au Football ou au Handball, en Volleyball FIVB le Carton Rouge présenté seul n\'exclut PAS le joueur ! C\'est une « Pénalité » qui sanctionne l\'équipe fautive par la perte de l\'échange : l\'équipe adverse marque 1 point et récupère le service. Pour exclure un joueur pour le set (Expulsion), l\'arbitre tient le carton jaune et le carton rouge ensemble dans UNE seule main ; pour l\'exclure du match (Disqualification), il les tient dans ses DEUX mains séparées.'
      },
      {
        q: '2. Le contact effectué au Contre (Block) compte-t-il dans les 3 touches autorisées d\'une équipe en Volleyball ?',
        a: 'Non (Règle 9.1 et 14.4). Le contact du contre ne compte pas comme une touche d\'équipe. Après un contact au contre, l\'équipe a encore droit à 3 touches pour renvoyer le ballon, et le premier contact après le contre peut être effectué par n\'importe quel joueur, y compris celui qui a touché le ballon au contre.'
      },
      {
        q: '3. Dans quel sens s\'effectue la rotation des joueurs en Volleyball et dans quel sens sont numérotées les 6 zones du terrain ?',
        a: 'C\'est une distinction fondamentale à l\'examen : la NUMÉROTATION des 6 postes (P1 arrière droit, P2 avant droit, P3 avant centre, P4 avant gauche, P5 arrière gauche, P6 arrière centre) suit le sens INVERSE des aiguilles d\'une montre (anti-horaire), tandis que la ROTATION des joueurs sur le terrain s\'effectue dans le sens DES AIGUILLES D\'UNE MONTRE (sens horaire : P2 descend en P1 pour servir, P1 va en P6, etc.).'
      },
      {
        q: '4. De combien de secondes dispose le serveur pour frapper le ballon après le coup de sifflet du 1er arbitre ?',
        a: 'Le serveur dispose de 8 secondes (Règle 12.4.4) en Volleyball 6×6 (contre 5 secondes en Beach-Volley).'
      },
      {
        q: '5. Un ballon de service touche le bord supérieur du filet avant de retomber dans le camp adverse (« Let »). Le service est-il valable ?',
        a: 'OUI ! Depuis la réforme FIVB de 2000, le ballon de service a le droit de toucher le filet en le franchissant à l\'intérieur de l\'espace de passage entre les deux antennes : le jeu continue sans rejouer le service.'
      },
      {
        q: '6. Quelles sont les hauteurs officielles du filet de Volleyball pour les Seniors Hommes et les Seniors Femmes ?',
        a: '2,43 mètres pour les Hommes et 2,24 mètres pour les Femmes (mesurées au centre du terrain ; aux lignes de côté, la hauteur ne doit pas dépasser la hauteur officielle de plus de 2 cm).'
      },
      {
        q: '7. Est-il permis de jouer le ballon avec le pied en Volleyball FIVB ?',
        a: 'Oui (Règle 9.2.1), le ballon peut toucher n\'importe quelle partie du corps, y compris le pied.'
      },
      {
        q: '8. Quand y a-t-il faute de pénétration sous le filet au niveau de la ligne centrale (Règle 11.2.2) ?',
        a: 'Il est permis de toucher le camp adverse avec un pied (ou les pieds) à condition qu\'une partie du pied qui pénètre reste en contact avec la ligne centrale ou soit directement au-dessus d\'elle. Il n\'y a faute que si le pied ENTIER a franchi complètement la ligne centrale dans le camp adverse (ou si cela gêne le jeu de l\'adversaire).'
      },
      {
        q: '9. Quelles sont les restrictions réglementaires qui s\'appliquent au joueur Libéro ?',
        a: 'Le Libéro est restreint aux zones arrières (P1, P6, P5). Il ne peut ni servir, ni contrer, ni tenter de contrer, ni effectuer une frappe d\'attaque si le ballon est entièrement au-dessus du bord supérieur du filet. De plus, si le Libéro effectue une passe haute avec les doigts (touche) en se trouvant dans sa zone avant (devant la ligne des 3m), aucun coéquipier ne peut attaquer ce ballon au-dessus du bord supérieur du filet.'
      },
      {
        q: '10. En didactique de l\'EPS, pourquoi le Volleyball est-il qualifié de sport collectif de « renvoi à frappe explosive » ?',
        a: 'Contrairement aux sports de préhension (Handball, Basket, Rugby) où l\'élève peut bloquer le ballon pour dissocier la prise d\'information de l\'action motrice, en Volleyball l\'interdiction de tenir la balle impose une coïncidence spazio-temporelle immédiate : l\'élève doit se déplacer AVANT la chute du ballon (« se déplacer pour se placer sous la balle ») et orienter ses appuis vers la cible (le passeur en P3).'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Volleyball Collège & Lycée · Épreuve du Baccalauréat EPS au Maroc',
      reality: 'Si vous mettez des élèves de 1AC ou de Tronc Commun à 6 contre 6 sur un terrain de 9×9 m avec les règles fédérales strictes, l\'échange s\'arrête au bout de 1 ou 2 contacts (service raté ou réception directe dehors) : 80 % du temps de la séance est passé à ramasser les ballons !',
      tip: 'Pour garantir un vrai jeu en 3 touches dès la 2e séance, j\'utilise deux leviers réglementaires en EPS : 1) En début de cycle (4c4 en losange), le joueur placé au poste de passeur avant (P3 près du filet) a le droit de « bloquer-lancer » rapidement le 2e ballon au-dessus du front s\'il a ses deux pieds dans une zone cerceau au filet ; 2) Un point gagné en renvoyant dès la 1re touche vaut 1 point, mais un point gagné après 3 touches collectives (Réception → Passe → Attaque) vaut 3 POINTS ! En une séance, plus aucun élève ne renvoie le ballon directement en manchette.'
    }
  },

  // ============================================================================
  // 8. BEACH-VOLLEY & VOLLEY 4x4 (FIVB BEACH VOLLEYBALL RULES 2025-2028)
  // ============================================================================
  {
    id: 'beach-volley',
    slug: 'reglement-beach-volley-fivb-arbitrage-eps.html',
    relatedArticle: 'article-beach-volley-eps.html',
    relatedCycleCollege: 'cycle-volleyball-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-volleyball-lycee-eps-maroc.html',
    sportName: 'Beach-Volley (2×2) & Volley Extérieur Réduit',
    shortTitle: 'Règlement Beach-Volley (Règles FIVB 2026) & Arbitrage',
    title: 'Règlement Officiel du Beach-Volley (Règles FIVB 2025-2028), Terrain 16×8m, Différences avec le 6×6, Arbitrage & PDF | ProfEPS',
    metaDesc: 'Règlement officiel complet du Beach-Volley FIVB 2025-2028 : terrain 16x8m sans ligne centrale, contre comptant pour 1 touche, interdiction de la feinte à doigts ouverts (Open Hand Tip), arbitrage et PDF officiel.',
    badge: '🏖️ Règlement Officiel FIVB Beach-Volley 2025–2028',
    federation: 'FIVB Beach Volleyball / CAVB / FRMVB Maroc',
    lawVersion: 'Règles Officielles de Beach-Volley FIVB 2025–2028',
    datePublished: '2026-10-29',
    dateLabel: '29 Octobre 2026',
    readTime: '22 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Officielles du Beach-Volley FIVB 2025–2028 (PDF)',
        org: 'FIVB — Official Beach Volleyball Rules',
        url: 'https://www.fivb.com/beach-volleyball/the-game/official-beach-volleyball-rules/',
        note: 'Texte officiel intégral des règles FIVB de Beach-Volley et directives d\'arbitrage sur sable.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 440" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Beach-Volley FIVB 16m x 8m">
        <rect width="800" height="440" fill="#d97706"/>
        <!--Sable du terrain 16m x 8m (Rubans de 5 cm)-->
        <rect x="110" y="65" width="580" height="290" fill="#fbbf24" stroke="#1e3a8a" stroke-width="5"/>
        <!--Filet central (PAS de ligne centrale ni de ligne des 3m sur le sable !)-->
        <line x1="400" y1="45" x2="400" y2="375" stroke="#991b1b" stroke-width="6"/>
        <circle cx="400" cy="65" r="6" fill="#ffffff" stroke="#991b1b" stroke-width="2"/>
        <circle cx="400" cy="355" r="6" fill="#ffffff" stroke="#991b1b" stroke-width="2"/>
        <!--Joueurs 2x2-->
        <circle cx="240" cy="145" r="16" fill="#1e3a8a"/><text x="240" y="150" font-family="Inter" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">J1</text>
        <circle cx="240" cy="275" r="16" fill="#1e3a8a"/><text x="240" y="280" font-family="Inter" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">J2</text>
        <circle cx="560" cy="145" r="16" fill="#991b1b"/><text x="560" y="150" font-family="Inter" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">J1</text>
        <circle cx="560" cy="275" r="16" fill="#991b1b"/><text x="560" y="280" font-family="Inter" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">J2</text>
        <!--Annotations-->
        <g font-family="Inter, sans-serif" font-size="12.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fef08a">LONGUEUR : 16,00 m (2 camps de 8×8 m) · LARGEUR : 8,00 m (Plus petit que le 6×6 de 18×9 m !)</text>
          <text x="65" y="210" transform="rotate(-90 65 210)" fill="#fef08a">LARGEUR : 8,00 m</text>
          <text x="255" y="215" fill="#1e293b">Camp 8 m × 8 m (Aucune ligne centrale ni ligne de 3 m)</text>
          <text x="400" y="402" fill="#fef08a">Différences majeures : Le CONTRE compte comme 1 touche · Match en 2 sets gagnants de 21 pts (Tie-break 15 pts)</text>
          <text x="400" y="422" fill="#ffffff">Changement de camp tous les 7 points (Sets 1 &amp; 2) et tous les 5 points au 3e set pour égaliser le vent et le soleil</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain', '16,00 m × 8,00 m (2 camps de 8 m × 8 m) délimités par des rubans souples de 5 cm · AUCUNE ligne centrale ni ligne des 3 m !', 'Soit 1 mètre de moins en largeur et 2 mètres de moins en longueur qu\'en Volleyball en salle (18×9 m)'],
      ['Hauteur du Filet', 'Identique au 6×6 : Hommes = 2,43 m · Femmes = 2,24 m · U16 : 2,24 m', 'Filet de 8,50 m de long sur 1 m de haut'],
      ['Le Ballon de Beach-Volley', 'Circonférence légèrement plus grande : 66 à 68 cm · Poids : 260 à 280 g · Pression plus basse : 0,175 à 0,225 kg/cm²', 'Plus souple et légèrement plus grand pour ralentir sa vitesse dans le vent'],
      ['Effectif & Positions', '2 joueurs par équipe (sans remplaçant ni coaching pendant le match)', 'Aucune faute de position sur le terrain : seul l\'ordre d\'alternance au service doit être respecté'],
      ['Format des Sets & Changement de côté', '2 sets gagnants de 21 points (2 pts d\'écart) · 3e set décisif en 15 points (2 pts d\'écart)', 'Les équipes changent de camp tous les 7 points joués (sets 1 & 2) et tous les 5 points (set 3) pour compenser le soleil et le vent'],
      ['Le Contre (Différence cruciale !)', 'Le contact effectué au CONTRE COMPTE COMME 1 TOUCHE d\'équipe !', 'Après un contre touché, il ne reste donc plus que 2 touches à l\'équipe (mais le contreur a le droit de faire la 2e touche)']
    ],
    lawsSummary: [
      {
        title: 'Les 7 Différences Clés entre le Beach-Volley (2×2) et le Volleyball en Salle (6×6)',
        content: 'C\'est une question classique des concours CRMEF et examens professionnels EPS : 1) Terrain : 16×8 m sans ligne centrale ni ligne des 3m (contre 18×9 m en salle). 2) Effectif : 2 joueurs sans remplaçant et sans faute de position (contre 6 joueurs avec rotations et libéro). 3) Le Contre : en Beach-Volley, toucher le ballon au contre COMPTE comme la 1re touche de l\'équipe (il ne reste que 2 touches). 4) La Feinte à doigts ouverts (« Open Hand Tip ») est INTERDITE : on ne peut envoyer le ballon de l\'autre côté en attaque douce qu\'avec les phalanges repliées (« Pokey ») ou en manchette. 5) Renvoi en Passe Haute (Touche à 10 doigts) : on ne peut renvoyer le ballon dans le camp adverse en touche haute que si la trajectoire est strictement perpendiculaire à la ligne des épaules du joueur. 6) Changement de camp tous les 7 points (et tous les 5 points au tie-break). 7) Délai de 5 secondes pour servir (contre 8 secondes en salle).'
      }
    ],
    refereeSignals: [
      {
        code: 'Beach FIVB · Signal 1',
        name: 'Changement de Camp (Tous les 7 points / 5 points)',
        when: 'Lorsque la somme des points des deux équipes est un multiple de 7 (sets 1-2) ou de 5 (set 3).',
        how: 'L\'arbitre lève les deux avant-bras devant la poitrine et derrière le dos en les faisant pivoter autour de son buste.',
        svgType: 'travelling_rotate'
      },
      {
        code: 'Beach FIVB · Signal 2',
        name: 'Ballon Tenu ou Feinte Illégale à Doigts Ouverts (« Open Hand Tip »)',
        when: 'Un joueur attaque en poussant le ballon du bout des doigts ouverts ou réalise une passe haute doublée/accompagnée.',
        how: 'L\'arbitre lève lentement l\'avant-bras devant lui, paume ouverte vers le haut.',
        svgType: 'lift_palm_up'
      },
      {
        code: 'Beach FIVB · Signal 3',
        name: 'Quatre Touches (Contre + 3 touches = Faute !)',
        when: 'Après un contact au contre (qui compte pour 1 touche en Beach-Volley), l\'équipe effectue encore 3 touches.',
        how: 'L\'arbitre lève le bras en montrant 4 doigts écartés.',
        svgType: 'four_fingers_up'
      },
      {
        code: 'Beach FIVB · Signal 4',
        name: 'Ballon IN vs Ballon OUT',
        when: 'Le ballon touche le sable/ruban de ligne (IN) ou tombe à l\'extérieur des rubans (OUT).',
        how: 'IN : bras tendu pointant vers le sable du camp. OUT : les deux avant-bras levés verticalement, paumes vers le corps.',
        svgType: 'ball_out_two_forearms'
      },
      {
        code: 'Beach FIVB · Signal 5',
        name: 'Signaux Tactiques Cachés du Partenaire au Contre (Derrière le dos)',
        when: 'Pendant que le partenaire s\'apprête à servir, le joueur au filet indique dans son dos quelle zone il va contrer.',
        how: '1 doigt = je contre la ligne (couloir) ; 2 doigts = je contre la diagonale ; Poing fermé = je ne saute pas au contre (main gauche = adversaire de gauche, main droite = adversaire de droite).',
        svgType: 'two_minutes_v'
      }
    ],
    epsAdaptationTable: [
      ['Usage en EPS au Maroc', '2 contre 2 sur sable 16×8 m', 'Formule 2c2 ou 3c3 sur petits terrains (6×6 m ou 7×7 m) tracés sur un plateau extérieur ou terrain sablonneux d\'établissement', 'Changement de côté à mi-match (à 7 points sur un match en 15 pts) indispensable sur nos terrains extérieurs ensoleillés ou venteux !']
    ],
    crmefQuestions: [
      {
        q: '1. En Beach-Volley FIVB, combien reste-t-il de touches à une équipe après que son contreur a touché le ballon au contre ?',
        a: 'Il ne lui reste que 2 touches (contrairement au Volleyball en salle où il en reste 3), car en Beach-Volley le contact du contre compte comme la 1re touche de l\'équipe.'
      },
      {
        q: '2. Quelles sont les dimensions d\'un terrain de Beach-Volley et pourquoi change-t-on de camp tous les 7 points ?',
        a: 'Le terrain mesure 16 m × 8 m (deux camps de 8×8 m) sans ligne centrale ni ligne d\'attaque des 3m. Les équipes changent de camp tous les 7 points joués (et tous les 5 points au 3e set) pour que les deux équipes soient soumises de manière équitable au soleil, au vent et à l\'état du sable.'
      },
      {
        q: '3. Pourquoi la feinte du bout des doigts ouverts (« Open Hand Tip ») est-elle interdite en Beach-Volley ?',
        a: 'Parce qu\'à 2 joueurs seulement pour couvrir 64 m² de sable, une feinte poussée à doigts ouverts derrière le contreur serait pratiquement indéfendable. Les attaques placées (« Shots ») doivent donc être frappées ou exécutées avec les phalanges repliées (« Pokey »).'
      }
    ],
    fieldExperience: {
      context: '📍 Tournoi Volley 2×2 / 3×3 en extérieur · Lycées côtiers & Plateaux scolaires au Maroc',
      reality: 'Sur les plateaux extérieurs des lycées marocains, le soleil de face et le vent faussent souvent les matchs de volley : une équipe gagne 15-3 du bon côté du vent !',
      tip: 'J\'applique systématiquement la règle du Beach-Volley en EPS extérieur : changement obligatoire de côté de terrain dès qu\'une équipe atteint 8 points (sur un set en 15 points). Cela supprime toute excuse liée au soleil ou au vent et relance totalement le suspense du match.'
    }
  },

  // ============================================================================
  // 9. BADMINTON (BWF LAWS OF BADMINTON 2026)
  // ============================================================================
  {
    id: 'badminton',
    slug: 'reglement-badminton-bwf-arbitrage-eps.html',
    relatedArticle: 'article-badminton-eps.html',
    relatedCycleCollege: 'cycle-badminton-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-badminton-lycee-eps-maroc.html',
    sportName: 'Badminton (Simple & Double)',
    shortTitle: 'Règlement Badminton (Lois BWF 2026) & Arbitrage',
    title: 'Règlement Officiel du Badminton (Lois BWF 2026), Terrain 13,40×6,10m, Service à 1,15m, Arbitrage & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Badminton conforme aux Lois BWF 2026 : schéma du terrain simple et double, hauteur du filet (1,55m/1,524m), service à 1,15m, score en 21 pts, gestes d\'arbitrage illustrés et PDF officiel.',
    badge: '🏸 Règlement Officiel BWF 2026 & Gestes d\'Arbitrage',
    federation: 'BWF (Badminton World Federation) / BCA / FRMBad Maroc',
    lawVersion: 'Laws of Badminton BWF 2025/2026',
    datePublished: '2026-10-30',
    dateLabel: '30 Octobre 2026',
    readTime: '25 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Lois Officielles du Badminton BWF 2026 (PDF)',
        org: 'BWF — Badminton World Federation (Statutes & Laws of Badminton)',
        url: 'https://corporate.bwfbadminton.com/statutes/',
        note: 'Section 4.1 : Laws of Badminton & Instructions to Technical Officials (Umpires, Service Judges & Line Judges).'
      },
      {
        label: 'Règles Officielles du Badminton en Français (FFBaD / BWF)',
        org: 'FFBaD — Guide Réglementaire & Arbitrage',
        url: 'https://www.ffbad.org/pratiquer-s-informer-les-regles-du-jeu',
        note: 'Traduction française officielle des règles du jeu BWF et schémas des zones de service simple/double.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un terrain de Badminton BWF 13,40m x 6,10m">
        <rect width="800" height="460" fill="#064e3b"/>
        <!--Terrain complet de Double : 13,40 m x 6,10 m-->
        <rect x="90" y="65" width="620" height="310" fill="#047857" stroke="#ffffff" stroke-width="3"/>
        <!--Couloirs latéraux de Double (0,46 m chacun -> Simple = 5,18 m de large)-->
        <line x1="90" y1="88" x2="710" y2="88" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="90" y1="352" x2="710" y2="352" stroke="#ffffff" stroke-width="2.5"/>
        <!--Couloirs arrières de Service Long de Double (0,76 m de la ligne de fond)-->
        <line x1="125" y1="65" x2="125" y2="375" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="675" y1="65" x2="675" y2="375" stroke="#ffffff" stroke-width="2.5"/>
        <!--Lignes de Service Court (à 1,98 m du filet)-->
        <line x1="308" y1="65" x2="308" y2="375" stroke="#fde047" stroke-width="3"/>
        <line x1="492" y1="65" x2="492" y2="375" stroke="#fde047" stroke-width="3"/>
        <!--Ligne médiane (entre la ligne de service court et la ligne de fond)-->
        <line x1="90" y1="220" x2="308" y2="220" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="492" y1="220" x2="710" y2="220" stroke="#ffffff" stroke-width="2.5"/>
        <!--Filet central (1,55 m aux poteaux / 1,524 m au centre)-->
        <line x1="400" y1="50" x2="400" y2="390" stroke="#f87171" stroke-width="5"/>
        <!--Annotations-->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">LONGUEUR TOTALE : 13,40 m · LARGEUR DOUBLE : 6,10 m · LARGEUR SIMPLE : 5,18 m (Lignes de 4 cm incluses)</text>
          <text x="38" y="220" transform="rotate(-90 38 220)" fill="#fde047">6,10 m (Double) / 5,18 m (Simple)</text>
          <text x="354" y="155" fill="#fde047" font-size="11">Zone Service Court</text>
          <text x="354" y="172" fill="#fde047" font-size="11">(1,98 m du filet)</text>
          <text x="215" y="145" font-size="11.5">Zone Service Gauche (Impair)</text>
          <text x="215" y="295" font-size="11.5">Zone Service Droite (Pair : 0, 2, 4...)</text>
          <text x="107" y="220" transform="rotate(-90 107 220)" font-size="10.5" fill="#fef08a">Couloir 0,76 m (Faute au service en Double)</text>
          <text x="400" y="418" fill="#fde047">Règle d'or Mémorisation : En SIMPLE = Couloir « Fin et Long » · Au Service en DOUBLE = « Large et Court »</text>
          <text x="400" y="438" fill="#ffffff">Filet : 1,55 m aux poteaux (1,524 m au centre) · Service BWF : volant frappé sous 1,15 m de hauteur</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du terrain (Loi 1)', 'Longueur : 13,40 m (pour Simple ET Double) · Largeur en Simple : 5,18 m · Largeur en Double : 6,10 m (couloirs latéraux de 46 cm)', 'Toutes les lignes (4 cm de large) font partie de la surface qu\'elles délimitent (volant sur la ligne = IN)'],
      ['Hauteur du Filet', '1,55 m au niveau des poteaux (placés sur les lignes de côté de double) et 1,524 m au centre du filet', 'Filet de 76 cm de hauteur avec bande blanche supérieure de 7,5 cm'],
      ['Le Volant & la Raquette (Loi 2 & 4)', 'Volant plumes : 16 plumes fixées dans la base en liège · Poids : 4,74 à 5,50 g · Raquette : max 68 cm de long × 23 cm de large', 'En EPS Maroc : volants synthétiques (nylon) à jupe jaune/blanche et bouchon bleu (vitesse moyenne)'],
      ['Score & Sets (Loi 7 — Rally Point)', 'Match au meilleur des 3 sets de 21 points (Rally Point : chaque échange donne 1 point) · 2 points d\'écart à 20–20, avec point décisif absolu à 29–29 (le 30e point gagne !)', 'En EPS : sets courts en 11 ou 15 points (montante-descendante ou poules de niveau)'],
      ['Zones de Service (Pair vs Impair)', 'Score du serveur PAIR (0, 2, 4, 6...) : service depuis la zone DROITE en diagonale · Score IMPAIR (1, 3, 5...) : service depuis la zone GAUCHE en diagonale', 'En Double : le couloir arrière de 0,76 m est FAUTE au service, mais devient BON dès que le service est retourné !']
    ],
    lawsSummary: [
      {
        title: 'La Règle du Service BWF (Hauteur fixe de 1,15 m — Loi 9)',
        content: 'Au service, le serveur et le receveur doivent se tenir dans leurs zones de service diagonalement opposées sans toucher les lignes, avec une partie des deux pieds en contact immobile avec le sol jusqu\'à la frappe. Depuis la réforme BWF de la Loi 9.1.6, au moment de l\'impact de la raquette sur la base du volant, le volant tout entier doit se trouver à une hauteur inférieure à 1,15 mètre de la surface du terrain (en EPS/scolaire sans gabarit à 1,15 m : le volant doit être frappé au-dessous des côtes flottantes / de la taille, avec la tige de la raquette inclinée vers le bas). Le mouvement de la tête de raquette du serveur doit être continu vers l\'avant.'
      },
      {
        title: 'Changement de Côté et Pauses Réglementaires (Loi 8 et 16)',
        content: 'Les joueurs changent de côté à la fin du 1er set, à la fin du 2e set (s\'il y a un 3e set) et au 3e set dès que le premier joueur atteint 11 points. Une pause de 60 secondes maximum est accordée dans chaque set dès qu\'un camp atteint 11 points, et une pause de 120 secondes (2 minutes) entre chaque set.'
      },
      {
        title: 'Les Fautes Courantes en Jeu et au Filet (Loi 13)',
        content: 'Il y a faute si : 1) Le volant tombe hors des limites, passe à travers ou sous le filet, touche le plafond ou les murs, ou touche le corps/vêtements d\'un joueur ; 2) Un joueur touche le filet ou ses poteaux avec sa raquette, son corps ou ses vêtements pendant que le volant est en jeu ; 3) Un joueur frappe le volant avant qu\'il ait franchi le filet dans son propre camp (toutefois, la raquette peut suivre le mouvement par-dessus le filet APRÈS avoir frappé le volant dans son propre camp) ; 4) Le volant est frappé deux fois de suite par le même joueur ou par les deux partenaires en double.'
      }
    ],
    refereeSignals: [
      {
        code: 'BWF · Juge de Service 1',
        name: 'Faute de Service : Volant Frappé trop Haut (> 1,15 m / au-dessus de la taille)',
        when: 'Le serveur frappe le volant au-dessus de la hauteur réglementaire de 1,15 m (ou au-dessus des côtes en EPS).',
        how: 'Le juge de service (ou l\'élève-arbitre) annonce « Faute de service ! » et place sa main ouverte horizontalement à plat contre son flanc (hauteur des côtes / 1,15 m).',
        svgType: 'hands_on_hips_blocking'
      },
      {
        code: 'BWF · Juge de Service 2',
        name: 'Faute de Pied au Service (Pied sur la ligne ou décollé)',
        when: 'Le serveur ou le receveur marche sur une ligne de la zone de service ou lève complètement un pied avant la frappe.',
        how: 'L\'arbitre tend la jambe et pointe avec sa main vers son propre pied.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'BWF · Juge de Ligne 3',
        name: 'Volant « IN » (Bon / Dedans)',
        when: 'Le bouchon du volant touche le sol à l\'intérieur du terrain ou sur la ligne de 4 cm.',
        how: 'Le juge de ligne pointe les deux mains réunies à 45° vers la ligne au sol en regardant l\'arbitre de chaise.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'BWF · Juge de Ligne 4',
        name: 'Volant « OUT » (Dehors / Faute)',
        when: 'Le bouchon du volant touche le sol complètement à l\'extérieur de la ligne.',
        how: 'Le juge de ligne crie immédiatement « OUT ! » et écarte grand les deux bras horizontalement sur les côtés (en croix), paumes vers l\'avant.',
        svgType: 'arms_wide_out'
      },
      {
        code: 'BWF · Arbitre 5',
        name: '« LET » (Échange à rejouer)',
        when: 'Un volant provenant d\'un terrain voisin perturbe l\'échange, le receveur n\'était pas prêt au service, ou la jupe du volant se détache du liège.',
        how: 'L\'arbitre annonce « LET ! » et lève un bras (ou les deux mains) au-dessus de la tête pour faire rejouer le point.',
        svgType: 'one_arm_up'
      }
    ],
    epsAdaptationTable: [
      ['Organisation des terrains', '1 terrain pour 2 (Simple) ou 4 joueurs (Double)', 'En EPS avec 36 élèves sur 4 terrains : formule « Ronde Italienne par Équipes de 3 » ou « Montante-Descendante » en matchs de 4 min (2 élèves jouent, le 3e arbitre avec une fiche d\'observation des zones avant/arrière)', 'Valorisation des zones cibles : tout volant qui touche le sol dans le couloir avant (entre le filet et la ligne de service court) ou dans le couloir de fond vaut 3 points (« Point Bonus Rupture ») !']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions exactes d\'un terrain de Badminton en Simple et en Double, et quelle est la hauteur du filet ?',
        a: 'La longueur est toujours de 13,40 mètres (en simple comme en double). La largeur est de 5,18 mètres en Simple et de 6,10 mètres en Double. Le filet mesure 1,55 mètre de haut au niveau des poteaux et 1,524 mètre au centre.'
      },
      {
        q: '2. À quel score maximum absolu s\'arrête un set de Badminton BWF en cas d\'égalité prolongée ?',
        a: 'Un set se joue en 21 points avec 2 points d\'écart à partir de 20–20. Toutefois, si le score atteint 29–29, le camp qui marque le 30e point remporte le set (30–29 est le score maximum absolu).'
      },
      {
        q: '3. Pourquoi dit-on que la zone de service en Simple est « fine et longue » alors qu\'en Double elle est « large et courte » ?',
        a: 'En Simple, les couloirs latéraux de 46 cm sont exclus (largeur 5,18 m), mais le service va jusqu\'à la ligne de fond extrême. En Double, toute la largeur de 6,10 m est comprise, mais au SERVICE le couloir arrière de 76 cm est exclu (service trop long = faute) ; dès que le service est retourné, tout le terrain de 13,40 m × 6,10 m devient valable.'
      },
      {
        q: '4. Quelle est la hauteur maximale réglementaire à laquelle le volant doit être frappé au service selon la BWF ?',
        a: 'Selon la Loi 9.1.6 BWF, la totalité du volant doit se trouver à moins de 1,15 mètre de la surface du court à l\'instant où il est frappé par la raquette du serveur.'
      },
      {
        q: '5. Au service, le volant touche le sommet du filet et tombe dans la bonne zone de service diagonale adverse. Est-ce « Let » comme au Tennis ?',
        a: 'NON ! Au Badminton (comme au Volleyball), il n\'y a PAS de « Let » lorsque le volant touche le filet au service : dès lors qu\'il retombe dans le carré de service diagonal adverse (au-delà de la ligne de service court de 1,98 m), le service est 100 % VALABLE et le jeu continue.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Badminton Collège & Lycée · Gymnase ou Cour abritée du vent',
      reality: 'Au début d\'un cycle de Badminton, les élèves jouent au « jeu du volant d\'or » : ils restent plantés au centre du terrain et s\'envoient le volant en cloche au milieu sans jamais chercher à déplacer l\'adversaire.',
      tip: 'Je trace à la craie (ou avec des coupelles plates) une « Zone Interdite / Zone Neutre » au centre de chaque demi-terrain : un volant qui tombe au milieu sur faute adverse ne rapporte que 1 point, mais un volant gagnant placé dans la zone avant (amorti devant la ligne de 1,98 m) ou dans la zone de fond (dégagé/smash dans le dernier mètre) rapporte 3 points ! L\'élève-arbitre coche sur sa fiche les points à 1 pt et les points à 3 pts (qui servent directement pour la note du Bac EPS).'
    }
  },

  // ============================================================================
  // 10. TENNIS DE TABLE (ITTF STATUTES & RULES 2026)
  // ============================================================================
  {
    id: 'tennis-de-table',
    slug: 'reglement-tennis-de-table-ittf-arbitrage-eps.html',
    relatedArticle: 'article-tennis-de-table-eps.html',
    relatedCycleCollege: 'article-tennis-de-table-eps.html',
    relatedCycleLycee: 'article-tennis-de-table-eps.html',
    sportName: 'Tennis de Table (Ping-Pong — Simple & Double)',
    shortTitle: 'Règlement Tennis de Table (Lois ITTF 2026) & Arbitrage',
    title: 'Règlement Officiel du Tennis de Table (Règles ITTF 2026), Dimensions de la Table, Service, Arbitrage & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Tennis de Table conforme aux lois ITTF 2026 : dimensions de la table (2,74m x 1,525m, hauteur 76cm, filet 15,25cm), service avec lancer de 16cm, sets en 11 pts, gestes d\'arbitrage et PDF officiel.',
    badge: '🏓 Règlement Officiel ITTF 2026 & Arbitrage',
    federation: 'ITTF (International Table Tennis Federation) / ATTF / FRMTT Maroc',
    lawVersion: 'ITTF Statutes — Chapter 2 : The Laws of Table Tennis (2025/2026)',
    datePublished: '2026-10-30',
    dateLabel: '30 Octobre 2026',
    readTime: '23 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Officielles du Tennis de Table ITTF 2026 (PDF)',
        org: 'ITTF — International Table Tennis Federation (Statutes & Handbook)',
        url: 'https://www.ittf.com/statutes/',
        note: 'Chapitre 2 (Laws of Table Tennis) et Chapitre 3 (Regulations for International Competitions & Match Officials).'
      },
      {
        label: 'Règles du Jeu Officielles en Français (FFTT / ITTF)',
        org: 'FFTT — Textes Réglementaires',
        url: 'https://www.fftt.com/site/jouer/les-regles-du-jeu',
        note: 'Traduction officielle en français des règles ITTF pour le simple, le double et l\'arbitrage.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 430" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'une table de Tennis de Table ITTF 2,74m x 1,525m">
        <rect width="800" height="430" fill="#0f172a"/>
        <!--Table 2,74 m x 1,525 m-->
        <rect x="120" y="70" width="560" height="270" fill="#1d4ed8" stroke="#ffffff" stroke-width="4"/>
        <!--Ligne centrale de Double (3 mm de large)-->
        <line x1="120" y1="205" x2="680" y2="205" stroke="#ffffff" stroke-width="2"/>
        <!--Filet central (15,25 cm de haut + dépassement de 15,25 cm de chaque côté)-->
        <line x1="400" y1="45" x2="400" y2="365" stroke="#fde047" stroke-width="5"/>
        <!--Trajectoire diagonale obligatoire du service en Double uniquement-->
        <path d="M 210 280 L 590 130" stroke="#fde047" stroke-width="2.5" stroke-dasharray="8,6"/>
        <circle cx="210" cy="280" r="8" fill="#fde047"/>
        <circle cx="590" cy="130" r="8" fill="#fde047"/>
        <!--Annotations-->
        <g font-family="Inter, sans-serif" font-size="12.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">LONGUEUR DE LA TABLE : 2,74 m · LARGEUR : 1,525 m · HAUTEUR AU SOL : 76 cm exactement</text>
          <text x="72" y="205" transform="rotate(-90 72 205)" fill="#fde047">LARGEUR : 1,525 m</text>
          <text x="260" y="135" font-size="11.5">Demi-camp Gauche</text>
          <text x="260" y="295" font-size="11.5">Demi-camp Droit (Service obligatoire en Double → Diagonale)</text>
          <text x="400" y="390" fill="#fde047">Hauteur du filet : 15,25 cm (Longueur totale du filet : 1,83 m, soit +15,25 cm de chaque côté)</text>
          <text x="400" y="410" fill="#ffffff">Balle ABS Ø 40 mm (2,7 g) · Lancer vertical au service : min 16 cm paume ouverte derrière la ligne de fond</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions de la Table (Loi 2.1)', 'Longueur : 2,74 m · Largeur : 1,525 m · Hauteur de la surface de jeu par rapport au sol : 76 cm · Lignes blanches de 2 cm (ligne centrale de 3 mm)', 'Les arêtes supérieures font partie de la surface de jeu (« bord valable »), mais PAS les côtés verticaux de la tranche !'],
      ['Le Filet (Loi 2.2)', 'Hauteur du bord supérieur : 15,25 cm · Dépassement des supports à l\'extérieur de chaque ligne de côté : 15,25 cm (Longueur totale : 1,83 m)', 'Vérifié par les arbitres avec la jauge officielle de 15,25 cm'],
      ['La Balle & la Raquette (Loi 2.3 & 2.4)', 'Balle sphérique en polymère/ABS (blanche ou orange mate) : Diamètre 40 mm · Poids : 2,7 g', 'Raquette : au moins 85 % du bois en matériau naturel · Revêtements de deux couleurs distinctes (un côté noir, l\'autre rouge ou couleur homologuée vive)'],
      ['Score, Sets & Service (Loi 2.11 & 2.13)', 'Set en 11 points (avec 2 points d\'écart à partir de 10–10) · Match au meilleur de 5 ou 7 sets', 'Changement de serveur tous les 2 points (et tous les 1 point à partir de 10–10) !']
    ],
    lawsSummary: [
      {
        title: 'La Règle Stricte du Service en Tennis de Table (Loi 2.6 ITTF)',
        content: 'Au service, la balle doit reposer librement sur la PAUME OUVERTE et immobile de la main libre, AU-DESSUS du niveau de la surface de jeu et DERRIÈRE la ligne de fond du serveur. Le serveur doit lancer la balle presque verticalement vers le haut, sans lui communiquer d\'effet, de sorte qu\'elle s\'élève d\'au moins 16 cm après avoir quitté la paume, puis la frapper lorsqu\'elle redescend de manière à ce qu\'elle touche d\'abord son propre camp puis, après avoir franchi le filet, le camp du relanceur. Pendant toute la phase du service, la balle ne doit jamais être cachée au relanceur par le corps ou le bras libre du serveur ! En Simple, le service est libre sur toute la table ; en Double uniquement, le service doit obligatoirement partir du demi-camp DROIT vers le demi-camp DROIT adverse (en diagonale).'
      },
      {
        title: 'Balle à Remettre (« Let ») et Fautes de Jeu (Lois 2.9 et 2.10)',
        content: 'L\'échange est « Let » (à rejouer) si la balle de service touche l\'ensemble du filet en le franchissant et tombe dans le camp adverse (contrairement au Volley et au Badminton où le jeu continue !). Un joueur perd le point si : 1) Il frappe la balle de volée au-dessus de la surface de la table sans qu\'elle ait touché son camp ; 2) Il déplace la surface de la table pendant l\'échange ; 3) Sa main libre (celle qui ne tient pas la raquette) touche la surface de jeu pendant l\'échange ; 4) En Double, les deux partenaires ne frappent pas la balle chacun à leur tour (alternance stricte obligatoire).'
      }
    ],
    refereeSignals: [
      {
        code: 'ITTF · Signal 1',
        name: 'Point Accordé (Bras levé du côté du vainqueur)',
        when: 'À la fin de chaque échange lorsqu\'un joueur marque un point.',
        how: 'L\'arbitre lève le bras du côté du joueur (ou de la paire) qui a gagné le point, de façon à ce que le haut du bras soit horizontal et l\'avant-bras vertical (90°), main fermée.',
        svgType: 'arm_90_up'
      },
      {
        code: 'ITTF · Signal 2',
        name: '« LET » (Échange à rejouer — Balle touchant le filet au service)',
        when: 'La balle de service touche le filet et retombe sur la demi-table adverse, ou une balle extérieure perturbe l\'échange.',
        how: 'L\'arbitre lève la main au-dessus de la tête (paume ouverte) et annonce « Let ! » pour interrompre l\'échange.',
        svgType: 'one_arm_up'
      },
      {
        code: 'ITTF · Signal 3',
        name: 'Service Illégal (Lancer < 16 cm, Paume fermée ou Balle cachée)',
        when: 'Le serveur ne lance pas la balle d\'au moins 16 cm, la lance depuis dessous la table, ou cache l\'impact avec son bras libre.',
        how: 'L\'arbitre arrête immédiatement l\'échange (« Faute ! ») et accorde directement le point au relanceur.',
        svgType: 'point_horizontal'
      },
      {
        code: 'ITTF · Signal 4',
        name: 'Temps Mort (Time-Out — 1 minute par match)',
        when: 'Un joueur ou capitaine demande son unique temps mort d\'1 minute du match entre deux échanges.',
        how: 'L\'arbitre forme un « T » avec ses mains et pose le marqueur blanc de temps mort sur le demi-camp du joueur qui l\'a demandé.',
        svgType: 'timeout_t'
      },
      {
        code: 'ITTF · Signal 5',
        name: 'Balle de Bord (Edge Ball — Valable) vs Tranche Latérale (Faute)',
        when: 'La balle effleure l\'arête supérieure de la table (valable) ou tape le côté vertical de la table sous l\'arête (faute).',
        how: 'Si l\'arête supérieure est touchée : l\'arbitre touche le bord supérieur de son index pour confirmer que la balle était bonne.',
        svgType: 'point_penalty_down'
      }
    ],
    epsAdaptationTable: [
      ['Service en EPS', 'Lancer vertical de 16 cm paume ouverte derrière la table', 'En début de cycle Collège : interdiction de frapper la balle dans la main (balle lancée obligatoire) ; service diagonal obligatoire même en simple pendant les 2 premières séances pour stabiliser une cible', 'Montante-Descendante sur 6 à 8 tables (la « Table 1 » est la table Ligue des Champions)']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions exactes d\'une table de Tennis de Table ITTF et la hauteur du filet ?',
        a: 'Longueur : 2,74 m ; Largeur : 1,525 m ; Hauteur de la surface de jeu au-dessus du sol : 76 cm ; Hauteur du filet : 15,25 cm (avec un dépassement latéral des poteaux de 15,25 cm de chaque côté).'
      },
      {
        q: '2. De quelle hauteur minimale la balle doit-elle être lancée au service en Tennis de Table ?',
        a: 'Elle doit être lancée presque verticalement vers le haut depuis la paume ouverte et immobile d\'au moins 16 cm avant d\'être frappée dans sa phase descendante, derrière la ligne de fond et au-dessus du niveau de la table.'
      },
      {
        q: '3. En Simple au Tennis de Table, est-il obligatoire de servir en diagonale ?',
        a: 'NON (erreur fréquente !). En Simple, le service est libre : la balle peut rebondir n\'importe où sur le demi-camp du serveur puis n\'importe où sur le demi-camp du relanceur. Le service en diagonale (du carré droit vers le carré droit adverse) n\'est obligatoire qu\'en DOUBLE.'
      },
      {
        q: '4. Que se passe-t-il si un joueur pose sa main libre (celle qui ne tient pas la raquette) sur la table pendant l\'échange ?',
        a: 'Il perd immédiatement le point (Loi 2.10.1.10) ! En revanche, toucher la table avec son corps ou son maillot n\'est une faute que si cela fait bouger/déplacer la surface de jeu.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Tennis de Table Collège & Lycée · Salle polyvalente',
      reality: 'Au Tennis de Table, la faute la plus répandue chez les élèves est de servir « à la volée » ou en cachant la balle sous la table, et de s\'appuyer de la main gauche sur la table pour aller chercher un amorti.',
      tip: 'L\'élève-arbitre placé face au filet tient un carton vert (« Service Valide : paume ouverte + lancer 16 cm ») et un carton orange (« Faute de service / Main libre sur la table »). En 2 séances, 100 % de la classe réalise un service réglementaire propre.'
    }
  },

  // ============================================================================
  // 11. GYMNASTIQUE AU SOL (CODE DE POINTAGE FIG 2025-2028 & CODE SCOLAIRE OP MAROC)
  // ============================================================================
  {
    id: 'gymnastique',
    slug: 'reglement-gymnastique-fig-code-pointage-eps.html',
    relatedArticle: 'article-seance-gymnastique.html',
    relatedCycleCollege: 'cycle-gymnastique-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-gymnastique-lycee-eps-maroc.html',
    sportName: 'Gymnastique au Sol (Code FIG & Code Scolaire EPS Maroc)',
    shortTitle: 'Règlement Gymnastique au Sol (Code FIG 2026 & Code A/B/C/D EPS)',
    title: 'Règlement Officiel de la Gymnastique au Sol (Code FIG 2025-2028 & Code Scolaire A/B/C/D OP Maroc), Praticable 12×12m, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet de la Gymnastique au Sol conforme au Code de Pointage FIG 2025-2028 et aux OP Maroc (Collège 2009 / Lycée 2007) : praticable 12x12m, familles d\'éléments A/B/C/D, déductions d\'exécution (0,1 / 0,3 / 0,5 / 1,0 pt), jury d\'élèves et PDF officiel.',
    badge: '🤸 Règlement Officiel FIG 2025–2028 & Code Scolaire EPS Maroc',
    federation: 'FIG (Fédération Internationale de Gymnastique) / UAG / FRMG Maroc',
    lawVersion: 'Code de Pointage FIG 2025–2028 & Référentiel National EPS Maroc (OP 2007/2009)',
    datePublished: '2026-10-31',
    dateLabel: '31 Octobre 2026',
    readTime: '30 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger le Code de Pointage Officiel FIG 2025–2028 (PDF Français)',
        org: 'FIG — Fédération Internationale de Gymnastique (Règlements & Codes)',
        url: 'https://www.gymnastics.sport/site/rules/#3',
        note: 'Code de Pointage officiel de Gymnastique Artistique Masculine (GAM) et Féminine (GAF) 2025–2028 en français.'
      },
      {
        label: 'Orientations Pédagogiques EPS Maroc (Grilles Gymnastique A/B/C/D)',
        org: 'Portail ProfEPS Maroc — OP 2007 & OP 2009',
        url: 'orientations-pedagogiques-eps-maroc.html',
        note: 'Tableaux officiels de difficulté (A, B, C, D), exigences de composition de l\'enchaînement et barèmes de notation pour le Collège et le Baccalauréat.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel d'un praticable de Gymnastique au Sol 12m x 12m et organisation de l'enchaînement EPS">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Zone de sécurité extérieure (14m x 14m)-->
        <rect x="65" y="45" width="350" height="350" fill="#991b1b" stroke="#ffffff" stroke-width="2"/>
        <!--Praticable officiel 12m x 12m (Lignes blanches de 5 cm incluses)-->
        <rect x="90" y="70" width="300" height="300" fill="#1d4ed8" stroke="#ffffff" stroke-width="3.5"/>
        <!--Diagonales acrobatiques (16,97 m) & Médianes chorégraphiques-->
        <line x1="95" y1="365" x2="385" y2="75" stroke="#fde047" stroke-width="3" stroke-dasharray="8,5"/>
        <line x1="95" y1="75" x2="385" y2="365" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,5"/>
        <line x1="95" y1="220" x2="385" y2="220" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="4,4"/>
        <!--Panneau de droite : Calcul de la Note Finale FIG & EPS Maroc-->
        <rect x="445" y="45" width="305" height="350" rx="14" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <!--Annotations-->
        <g font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="#ffffff">
          <text x="240" y="30" fill="#fde047" text-anchor="middle">PRATICABLE FIG : 12,00 m × 12,00 m (+ Bordure 1 m)</text>
          <text x="240" y="135" fill="#fde047" text-anchor="middle">Diagonale Acrobatique = 16,97 m</text>
          <text x="240" y="212" fill="#ffffff" text-anchor="middle">Médiane (Maintien / Souplesse / Chorégraphie)</text>
          <text x="240" y="388" fill="#fca5a5" text-anchor="middle" font-size="11">Sortie de praticable : -0,1 pt (1 pied/main) · -0,3 pt (2 pieds)</text>
          <!--Contenu du panneau de droite-->
          <text x="597" y="75" fill="#fde047" font-size="13.5" text-anchor="middle">⚖️ STRUCTURE DE LA NOTATION</text>
          <text x="465" y="105" fill="#38bdf8">1. Note D (Difficulté + Composition) :</text>
          <text x="465" y="126" font-weight="600" font-size="11.5">• Valeur des éléments : A, B, C, D (et E en Bac)</text>
          <text x="465" y="146" font-weight="600" font-size="11.5">• Exigences de familles (Acrobatie, Maintien, Saut)</text>
          <text x="465" y="166" font-weight="600" font-size="11.5">• Logique d'occupation de l'espace (Aller-Retour)</text>
          <text x="465" y="202" fill="#4ade80">2. Note E (Exécution &amp; Déductions) :</text>
          <text x="465" y="223" font-weight="600" font-size="11.5">• Petite faute (pied pointé, léger déséquilibre) : -0,10 pt</text>
          <text x="465" y="243" font-weight="600" font-size="11.5">• Faute moyenne (jambes fléchies, écart) : -0,30 pt</text>
          <text x="465" y="263" font-weight="600" font-size="11.5">• Grosse faute (grand pas de réception) : -0,50 pt</text>
          <text x="465" y="283" font-weight="600" font-size="11.5">• Chute au sol ou aide d'un pareur : -1,00 pt</text>
          <text x="465" y="319" fill="#fbbf24">3. Règle du Temps &amp; du Maintien :</text>
          <text x="465" y="340" font-weight="600" font-size="11.5">• Tout élément statique (ATR, Planche, Équerre)</text>
          <text x="465" y="358" font-weight="600" font-size="11.5">  doit être maintenu immobile 2 à 3 SECONDES !</text>
          <text x="465" y="378" font-weight="600" font-size="11.5">• Durée : 50 à 70 s (GAM) / 70 à 90 s en musique (GAF)</text>
          <text x="400" y="432" fill="#ffffff" text-anchor="middle">En EPS au Maroc : Piste de tapis de 12 m × 2 m (ou 2 pistes croisées en L) · Salut initial et final obligatoire au Jury</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Dimensions du Praticable (FIG)', 'Carré de 12,00 m × 12,00 m (lignes blanches de 5 cm incluses dans la surface) entouré d\'une bordure de sécurité inclinée de 1 m à 2 m', 'En EPS Maroc : piste longitudinale de tapis de 12 à 14 m × 2 m (ou praticable en L / en carré avec 6 à 8 tapis sarneige)'],
      ['Durée de l\'Exercice au Sol', 'GAM (Hommes) : 50 à 70 secondes (sans musique) · GAF (Femmes) : 70 à 90 secondes (90 s max en musique orchestrale sans paroles chantées)', 'En EPS : l\'enchaînement est évalué sur sa continuité, son rythme (sans arrêt parasite) et la tenue des maintiens (3 secondes)'],
      ['Classification Scolaire Maroc (OP 2007/2009)', 'Éléments classés par niveau de difficulté croissant : A (0,5 pt), B (1,0 pt), C (1,5 pt), D (2,0 pts)', '1AC : 4A + 1B · 2AC : 3A + 2B · 3AC : 2A + 3B + 1C · TC : 3B + 2C · 1Bac : 2B + 3C + 1D · 2Bac : 3C + 3D'],
      ['Les Familles Gymniques en EPS', '1) Rotation avant/arrière (Roulades, Salto) · 2) Renversement / Appui tendu (ATR, Roue, Rondade, Souplesse, Lune) · 3) Maintien / Force / Souplesse (Planche, Équerre, Pont, Grand écart, Chandelle) · 4) Sauts gymniques & Pirouettes', 'Un enchaînement complet au Bac doit combiner au moins 3 familles différentes avec des éléments de liaison chorégraphique'],
      ['Barème des Déductions d\'Exécution (FIG)', 'Petite faute : -0,10 pt · Faute moyenne : -0,30 pt · Grosse faute : -0,50 pt · Chute ou appui des mains au sol à la réception : -1,00 pt', 'Sortie de praticable : -0,10 pt (un pied ou une main hors ligne) · -0,30 pt (les deux pieds ou chute hors ligne)']
    ],
    lawsSummary: [
      {
        title: 'Le Fonctionnement du Code de Pointage FIG (Note D + Note E − Pénalités Neutres)',
        content: 'En Gymnastique Artistique moderne (Code FIG 2025–2028) comme dans l\'évaluation EPS au Maroc, la note finale repose sur l\'addition de deux jurys distincts : 1) Le Jury D (Difficulté — « Qu\'est-ce que l\'élève présente ? ») : il additionne la valeur des éléments de difficulté réussis (A, B, C, D...), la satisfaction des exigences de composition (familles obligatoires) et les bonifications de liaison ; 2) Le Jury E (Exécution — « Comment l\'élève le réalise-t-il ? ») : il part d\'un capital de 10,00 points (ou 6 à 8 points en EPS) et applique des déductions standardisées (-0,1 / -0,3 / -0,5 / -1,0 pt) pour chaque faute de tenue de corps (pointes de pieds, jambes fléchies ou écartées, manque d\'amplitude, déséquilibre à la réception).'
      },
      {
        title: 'La Règle des Éléments de Maintien (2 à 3 Secondes) et de la Réception Stabilisée',
        content: 'Tout élément statique de maintien, d\'équilibre ou de souplesse (Planche faciale/costale, Chandelle, Trépied, ATR maintenu, Équerre, Grand écart, Pont) doit être maintenu immobile pendant au moins 2 secondes en FIG (et 3 secondes en EPS scolaire) pour être reconnu à sa pleine valeur : s\'il n\'est que « traversé » sans arrêt contrôlé, il subit une déduction de -0,30 pt ou est déclassé au niveau inférieur. De même, chaque série acrobatique (ex. Rondade + Flip ou Roue + Roulade arrière bras tendus) doit se terminer par une réception stabilisée pieds joints avant d\'enchaîner.'
      },
      {
        title: 'La Sécurité Passive et Active (La Parade en EPS)',
        content: 'En Gymnastique scolaire, la sécurité repose sur deux piliers : 1) La sécurité passive (aménagement des tapis sans interstice, distance de sécurité avec les murs, échauffement articulaire spécifique des poignets, de la nuque et des chevilles) ; 2) La sécurité active (la Parade) : un élève-pareur formé se place latéralement près de l\'épaule du gymnaste lors des ateliers d\'apprentissage (ATR, Lune, Roue, Roulade arrière piquée) pour accompagner le bassin ou protéger la nuque. Lors de l\'évaluation sommative, un élément réalisé avec l\'aide physique du pareur n\'est pas comptabilisé dans la note de difficulté.'
      }
    ],
    refereeSignals: [
      {
        code: 'FIG / Jury EPS · Signal 1',
        name: 'Salut Initial et Final + Signal Vert du Juge-Arbitre (30s pour débuter)',
        when: 'L\'élève se présente devant la table du jury avant et après son enchaînement.',
        how: 'Le gymnaste lève un bras ou les deux bras en V face au jury (salut obligatoire : -0,30 pt en cas d\'oubli). Le président du jury lève le bras (ou drapeau vert) pour autoriser le départ.',
        svgType: 'three_points_both_arms'
      },
      {
        code: 'FIG / Jury EPS · Signal 2',
        name: 'Juge de Ligne : Sortie du Praticable (Drapeau Levé)',
        when: 'Un pied, une main ou toute autre partie du corps touche le sol à l\'extérieur de la ligne blanche des 12×12 m.',
        how: 'Le juge de ligne lève immédiatement son drapeau (ou le bras) et note par écrit la pénalité neutre (-0,10 pt pour 1 appui hors ligne, -0,30 pt pour 2 appuis).',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'FIG / Jury EPS · Signal 3',
        name: 'Décompte des 3 Secondes sur Élément de Maintien (Planche, ATR, Équerre)',
        when: 'Le gymnaste réalise un élément statique de maintien, de souplesse ou d\'équilibre.',
        how: 'L\'élève-juge chargé de l\'exécution compte à voix mi-haute « 1001 - 1002 - 1003 : Validé ! » en levant 3 doigts.',
        svgType: 'four_fingers_up'
      },
      {
        code: 'FIG / Jury EPS · Signal 4',
        name: 'Symboles Tachygrahiques du Jury D (Validation A / B / C / D)',
        when: 'En temps réel pendant le passage de l\'élève sur la fiche de jugement.',
        how: 'Le juge D entoure la lettre (A, B, C ou D) si l\'élément est reconnu, ou la barre d\'une croix s\'il est incomplet/chuté.',
        svgType: 'one_arm_up'
      },
      {
        code: 'FIG / Jury EPS · Signal 5',
        name: 'Posture de Sécurité de l\'Élève-Pareur (Placement Latéral)',
        when: 'Lors de tout atelier de renversement (ATR, Lune, Rondade, Souplesse).',
        how: 'Le pareur se place de profil par rapport à l\'axe de déplacement (jamais devant ni derrière), jambes fléchies en fente avant, une main prête sous l\'épaule et l\'autre au niveau du bassin/cuisse.',
        svgType: 'advantage_both_arms'
      }
    ],
    epsAdaptationTable: [
      ['Catalogue de Difficulté (A/B/C/D)', 'A = Roulade avant/arrière simple, Chandelle, Planche faciale, Saut droit demi-tour · B = Roue, ATR passager, Roulade avant jambes tendues/écartées, Roulade arrière jambes tendues, Pont, Grand écart, Saut de chat', 'C = Rondade, ATR maintenu 3s, ATR roulade avant, Roulade arrière piquée à l\'ATR, Équerre maintenue 3s, Souplesse avant/arrière · D = Lune (renversement avant), Flip-flap, Rondade + saut cambré/flip, Salto avant (sur gros tapis de réception)'],
      ['Organisation du Jury d\'Élèves', 'Jury D + Jury E + Juges de ligne + Chronométreur', 'En EPS Maroc : chaque groupe de 4 élèves tourne sur 4 rôles : 1 Gymnaste qui passe + 1 Pareur de sécurité + 1 Juge Difficulté (qui coche les éléments A/B/C/D réalisés par rapport à la fiche projet) + 1 Juge Exécution (qui note l\'alignement, le rythme et les réceptions)']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions exactes d\'un praticable de Gymnastique au Sol selon la FIG ?',
        a: 'La surface de performance mesure 12 mètres × 12 mètres, délimitée par une ligne blanche de 5 cm qui fait partie intégrante de la surface du praticable (toucher la ligne n\'est donc pas une faute ; il n\'y a sortie que lorsque le pied touche le tapis à l\'EXTÉRIEUR de la ligne blanche). La diagonale mesure 16,97 mètres.'
      },
      {
        q: '2. Quelle est la logique interne de la Gymnastique au Sol en didactique de l\'EPS (Parlebas / Goirand) ?',
        a: 'C\'est une activité psychomotrice (sans incertitude liée au milieu ni à l\'adversaire) de production de formes corporelles codifiées (morphocinèse) à caractère acrobatique et esthétique, destinée à être « vue et jugée » selon un code de référence. Sa formule pédagogique résumée par Paul Goirand est : « Voler, tourner, se renverser sans perdre ses repères pour se recevoir équilibré devant un public ».'
      },
      {
        q: '3. Quelles sont les 4 valeurs standardisées de déduction pour faute d\'exécution dans le Code de Pointage FIG ?',
        a: 'Petite faute = -0,10 pt ; Faute moyenne = -0,30 pt ; Grosse faute = -0,50 pt ; Chute au sol (ou appui des mains au sol à la réception) = -1,00 pt.'
      },
      {
        q: '4. Quelles sont les exigences de composition d\'un mini-enchaînement en Collège (OP 2009) et en Lycée (OP 2007) au Maroc ?',
        a: '1re AC : 4A + 1B ; 2e AC : 3A + 2B ; 3e AC : 2A + 3B + 1C ; Tronc Commun : 3B + 2C ; 1re Bac : 2B + 3C + 1D ; 2e Bac : 3C + 3D (ou équivalent selon le projet de l\'élève, avec obligation de relier les éléments acrobatiques et gymniques sur au moins un aller-retour de tapis).'
      },
      {
        q: '5. Quels sont les critères biomécaniques de réussite d\'un Appui Tendu Renversé (ATR) et d\'une Roue ?',
        a: 'Pour l\'ATR : 1) Pose des mains à largeur d\'épaules (doigts écartés vers l\'avant) après une fente avant ; 2) Fouetté de la jambe libre suivi de la poussée de la jambe d\'appui ; 3) Alignement segmentaire vertical strict « Mains - Épaules - Bassin - Pieds » (ouverture complète de l\'angle bras-tronc et rétroversion du bassin en gainage abdominal/fessier) ; 4) Regard fixé sur les mains. Pour la Roue : pose alternative et alignée sur une ligne droite selon le rythme régulier « Pied 1 - Main 1 - Main 2 - Pied 2 » en passant par la verticale jambes tendues et écartées.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Gymnastique au Sol Collège & Lycée · Épreuve du Baccalauréat EPS au Maroc',
      reality: 'En Gymnastique au Sol, beaucoup d\'élèves juxtaposent 5 éléments les uns derrière les autres en marchant, en s\'arrêtant pour réfléchir et en remontant leur survêtement entre chaque roulade !',
      tip: 'J\'exige que chaque élève remplisse sa « Fiche Projet d\'Enchaînement Illustrée » dès la séance 6 avec 3 règles non négociables pour obtenir les points d\'exécution : 1) Salut initial bras en V + 2 secondes d\'immobilité ; 2) Interdiction de marcher entre deux éléments (toute liaison doit être un pas chassé, un demi-tour sur pointes ou un saut gymnique) ; 3) Chaque élément de maintien (Planche, Chandelle, ATR) est validé à haute voix « 1-2-3 » par l\'élève-juge. Le résultat visuel le jour de l\'évaluation du Bac est spectaculaire !'
    }
  }
];
