// Données encyclopédiques des Règlements Officiels World Athletics 2025/2026 & Gestes des Juges Illustrés — Disciplines Athlétiques (Article par Article)
module.exports = [
  // ============================================================================
  // 1. COURSE DE VITESSE (100m, 200m, 400m & SPRINT SCOLAIRE 60m/80m EPS)
  // ============================================================================
  {
    id: 'athletisme-vitesse',
    slug: 'reglement-course-vitesse-100m-200m-400m-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Course de Vitesse (100m, 200m, 400m & 60m/80m EPS)',
    shortTitle: 'Règlement Course de Vitesse (100m, 200m, 400m)',
    title: 'Règlement Officiel de la Course de Vitesse (100m, 200m, 400m — World Athletics 2026), Starting-Blocks, Faux Départ, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet des courses de vitesse (100m, 200m, 400m et 60m/80m EPS Maroc) conforme aux Règles Techniques World Athletics 2026 : couloirs 1,22m, décalages, commandements du starter, faux départ (0,100s), vent (+2,0 m/s), arrivée au torse, signaux et PDF.',
    badge: '⚡ Règlement Officiel World Athletics 2026 · Sprint 100m / 200m / 400m',
    federation: 'World Athletics (RT 16, 17, 18) / CAA / FRMA (Fédération Royale Marocaine d\'Athlétisme)',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 16 à 21)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '28 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques World Athletics 2025/2026 (Courses & Sprint — PDF)',
        org: 'World Athletics — Book of Rules (C2.1 Technical Rules)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Texte officiel intégral des Règles Techniques RT 16 (Départ), RT 17 (La Course et les Couloirs), RT 18 (L\'Arrivée) et RT 19 (Chronométrage et Photo-finish).'
      },
      {
        label: 'Règlements Techniques en Français (FFA / World Athletics)',
        org: 'FFA / Commission Nationale des Officiels d\'Athlétisme',
        url: 'https://www.athle.fr/asp.net/main.html/html.aspx?htmlid=125',
        note: 'Version française officielle des règles World Athletics, protocole du starter et des juges à l\'arrivée.'
      },
      {
        label: 'Fédération Royale Marocaine d\'Athlétisme (FRMA)',
        org: 'FRMA Maroc',
        url: 'https://frma.ma/',
        note: 'Textes fédéraux nationaux et barèmes des compétitions sur piste au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel d'une piste d'athlétisme 400m avec départs du 100m, 200m et 400m en couloirs décalés">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Piste de 400m avec couloirs-->
        <rect x="70" y="50" width="660" height="250" rx="125" ry="125" fill="#b91c1c" stroke="#ffffff" stroke-width="3.5"/>
        <rect x="98" y="78" width="604" height="194" rx="97" ry="97" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="1.8"/>
        <rect x="126" y="106" width="548" height="138" rx="69" ry="69" fill="#15803d" stroke="#ffffff" stroke-width="3"/>
        <!--Prolongement du 100m en ligne droite haute-->
        <rect x="20" y="50" width="175" height="56" fill="#b91c1c" stroke="#ffffff" stroke-width="3"/>
        <line x1="20" y1="78" x2="195" y2="78" stroke="rgba(255,255,255,0.65)" stroke-width="1.8"/>
        <!--Ligne de départ 100m-->
        <line x1="40" y1="50" x2="40" y2="106" stroke="#fde047" stroke-width="4"/>
        <!--Ligne d'arrivée commune (en haut à droite de la ligne droite)-->
        <line x1="600" y1="50" x2="600" y2="106" stroke="#fde047" stroke-width="5"/>
        <!--Décalages au départ du 200m (entrée du 2e virage en bas à droite)-->
        <line x1="600" y1="244" x2="600" y2="300" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,3"/>
        <circle cx="600" cy="252" r="5" fill="#38bdf8"/>
        <circle cx="635" cy="268" r="5" fill="#38bdf8"/>
        <circle cx="670" cy="286" r="5" fill="#38bdf8"/>
        <!--Décalages au départ du 400m (près de la ligne d'arrivée)-->
        <circle cx="600" cy="98" r="5" fill="#4ade80"/>
        <circle cx="645" cy="82" r="5" fill="#4ade80"/>
        <circle cx="690" cy="64" r="5" fill="#4ade80"/>
        <!--Anémomètre à 50m de l'arrivée-->
        <circle cx="380" cy="126" r="8" fill="#fbbf24" stroke="#ffffff" stroke-width="2"/>
        <!--Cartes techniques en bas-->
        <rect x="50" y="322" width="225" height="118" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="288" y="322" width="225" height="118" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="526" y="322" width="225" height="118" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">COURSES DE VITESSE (100m, 200m, 400m) : INTÉGRALEMENT EN COULOIRS DE 1,22 m (± 0,01 m)</text>
          <text x="85" y="42" fill="#fde047">Départ 100 m (Ligne droite)</text>
          <text x="600" y="42" fill="#fde047">ARRIVÉE UNIQUE (Torse)</text>
          <text x="495" y="218" fill="#38bdf8">Départs décalés 200 m (1 virage + 1 ligne droite)</text>
          <text x="510" y="132" fill="#4ade80">Départs décalés 400 m (2 virages : ~7,04 m / couloir)</text>
          <text x="380" y="150" fill="#fbbf24" font-size="10.5">Anémomètre 100m/200m (Max +2,0 m/s)</text>
          <!--Boîte 1-->
          <text x="162" y="344" fill="#fde047" font-size="12.5">🔫 DÉPART &amp; BLOCKS (RT 16)</text>
          <text x="162" y="365" font-weight="600">• 5 appuis au sol à « À vos marques ! »</text>
          <text x="162" y="384" font-weight="600">• Mains DERRIÈRE la ligne blanche (5 cm)</text>
          <text x="162" y="403" font-weight="600">• Commandes : « À vos marques - Prêts - Feu »</text>
          <text x="162" y="422" font-weight="600">• Temps de réaction &lt; 0,100 s = Faux départ</text>
          <!--Boîte 2-->
          <text x="400" y="344" fill="#38bdf8" font-size="12.5">🛣️ COULOIRS &amp; DÉCALAGES (RT 17)</text>
          <text x="400" y="365" font-weight="600">• 8 couloirs de 1,22 m (ligne droite incluse)</text>
          <text x="400" y="384" font-weight="600">• Décalage 200 m : ~3,52 m à 3,83 m / couloir</text>
          <text x="400" y="403" font-weight="600">• Décalage 400 m : ~7,04 m à 7,67 m / couloir</text>
          <text x="400" y="422" font-weight="600">• Piétiner la ligne intérieure en virage = DQ</text>
          <!--Boîte 3-->
          <text x="638" y="344" fill="#4ade80" font-size="12.5">🏁 ARRIVÉE &amp; VENT (RT 18-19)</text>
          <text x="638" y="365" font-weight="600">• Arrivée jugée exclusivement au TORSE</text>
          <text x="638" y="384" font-weight="600">• Vent mesuré sur 10 s (100m) et 10 s (200m)</text>
          <text x="638" y="403" font-weight="600">• Homologation record : Vent ≤ +2,0 m/s</text>
          <text x="638" y="422" font-weight="600">• Bac Maroc : 100m (G) / 80m ou 100m (F)</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Les Distances Officielles de Sprint', 'Piste extérieure (400m) : 100 m (ligne droite), 200 m (1 virage + 1 ligne droite), 400 m (1 tour complet = 2 virages + 2 lignes droites) · Piste courte / Salle : 60 m, 200 m, 400 m', 'En EPS Maroc (OP 2009 / OP 2007) : 60 m en Collège (1AC/2AC/3AC), 80 m (Filles) et 100 m (Garçons) au Lycée et au Baccalauréat'],
      ['Largeur des Couloirs & Décalages (RT 14 & 17)', '8 couloirs (parfois 9) de 1,22 m (± 0,01 m) chacun, incluant la ligne blanche de 5 cm située à droite dans le sens de la course', 'Pour compenser le rayon des virages, le départ est avancé d\'environ 3,83 m par couloir au 200 m (1 virage) et de 7,67 m au couloir 2 puis 7,67 m par couloir au 400 m (2 virages)'],
      ['Commandements du Starter & Starting-Blocks (RT 16)', 'Starting-blocks obligatoires du 100 m au 400 m inclus · 2 commandements vocaux : 1) « À vos marques ! » (5 appuis au sol : 2 pieds, 2 mains, at least 1 genou) → 2) « Prêts ! » (élévation du bassin) → Coup de pistolet', 'Les mains et les pieds doivent rester strictement DERRIÈRE le bord arrière de la ligne blanche de départ (toucher la ligne = faute)'],
      ['La Règle du Faux Départ (RT 16.7 & 16.8)', 'Tout mouvement d\'amorce de départ avant le coup de feu ou tout temps de réaction sur les capteurs des blocks strictement inférieur à 0,100 seconde (100 millisecondes) constitue un faux départ', 'Disqualification directe (Carton Rouge et Noir) dès le 1er faux départ en compétition World Athletics (sauf Épreuves Combinées : avertissement au 1er, DQ au 2e)'],
      ['Respect du Couloir en Virage (RT 17.2 & 17.3)', 'Chaque sprinter doit courir du départ à l\'arrivée dans son couloir assigné. En virage (200 m et 400 m), marcher SUR ou à l\'intérieur de la ligne blanche de GAUCHE (côté corde) entraîne la disqualification', 'En ligne droite (100 m), empiéter sur un couloir voisin n\'entraîne la disqualification que si cela gêne matériellement un autre athlète'],
      ['Jugement de l\'Arrivée & Anémométrie (RT 18 & 17.8)', 'L\'arrivée est jugée à l\'instant où une partie quelconque du TORSE (buste, hors tête, cou, bras, mains, jambes, pieds) atteint le plan vertical du bord intérieur de la ligne d\'arrivée', 'Mesure du vent (100 m et 200 m uniquement, pas au 400 m) : un record n\'est homologué que si le vent favorable ne dépasse pas +2,0 m/s']
    ],
    lawsSummary: [
      {
        title: 'Le Protocole de Départ et la Détection du Faux Départ (Règle Technique 16)',
        content: 'Au commandement « À vos marques ! », l\'athlète prend place dans ses starting-blocks : les deux pieds doivent être en contact avec les cales, les deux mains au sol derrière la ligne blanche de départ (sans la toucher), et au moins un genou doit toucher le sol (soit 5 points d\'appui). Une fois tous les sprinters immobiles, le starter annonce « Prêts ! » : les athlètes lèvent le bassin pour adopter leur position finale d\'impulsion. Dès qu\'ils sont tous immobiles, le starter tire le coup de feu. Selon la RT 16.7, un athlète qui amorce son mouvement après « Prêts ! » mais avant le coup de pistolet — ou dont le temps de réaction enregistré par le système d\'information des départs (SID) est inférieur à 0,100 s — commet un faux départ et est immédiatement disqualifié (Carton Rouge et Noir en diagonale).'
      },
      {
        title: 'Course en Couloir, Empiètement en Virage et Règles Techniques 17.2 / 17.3',
        content: 'Dans les courses courues en couloir (100 m, 200 m, 400 m), chaque coureur doit rester dans son couloir du départ à l\'arrivée. La Règle Technique 17.2 précise une distinction essentielle pour l\'examen CRMEF : dans un VIRAGE (au 200 m et au 400 m), le coureur n\'a pas le droit de toucher ou de franchir avec le pied la ligne de gauche de son couloir (côté intérieur/corde) car cela raccourcirait la distance à parcourir. Depuis la révision World Athletics, un seul appui clairement sur ou à gauche de la ligne intérieure en virage suffit à entraîner la disqualification (sauf si l\'athlète a été poussé ou bousculé par un tiers). En revanche, toucher la ligne de droite (qui fait partie de son couloir) ou sortir en ligne droite sans gêner personne et sans avantage matériel n\'est pas sanctionné.'
      },
      {
        title: 'L\'Arrivée au Torse (Photo-Finish) et la Mesure du Vent (RT 18 et RT 17.8)',
        content: 'Les athlètes sont classés dans l\'ordre exact où une partie quelconque de leur TORSE (c\'est-à-dire le tronc/buste, à l\'exclusion expresse de la tête, du cou, des bras, des jambes, des mains et des pieds) atteint le plan vertical du bord de la ligne d\'arrivée le plus proche du départ. La caméra de photo-finish (au 1/1000e de seconde) est alignée exactement sur ce bord intérieur. Concernant le vent (RT 17.8), l\'anémomètre est placé à 50 m de la ligne d\'arrivée : il fonctionne pendant 10 secondes à partir du coup de feu pour le 100 m, et pendant 10 secondes à partir du moment où le premier coureur entre dans la ligne droite finale pour le 200 m. Il n\'y a pas de mesure de vent sur le 400 m (course en boucle complète).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Starter 1',
        name: 'Commandements « À vos marques ! » puis « Prêts ! » (Bras armé levé)',
        when: 'Au départ de toutes les courses de sprint jusqu\'au 400 m inclus (100m, 200m, 400m).',
        how: 'Le starter vérifie le drapeau blanc du juge-arbitre d\'arrivée, annonce « À vos marques ! », puis lève le bras tenant le pistolet (ou claquoir en EPS) en annonçant « Prêts ! » avant de tirer.',
        svgType: 'one_arm_up'
      },
      {
        code: 'World Athletics · Starter 2',
        name: 'Carton Rouge et Noir (Disqualification pour Faux Départ)',
        when: 'Un sprinter anticipe le coup de feu ou réagit en moins de 0,100 seconde (RT 16.8).',
        how: 'Le starter tire un 2e coup de feu de rappel. L\'aide-starter présente devant le couloir de l\'athlète fautif le CARTON ROUGE ET NOIR divisé en diagonale.',
        svgType: 'card_up'
      },
      {
        code: 'World Athletics · Starter 3',
        name: 'Carton Vert (Interruption de Départ sans Fautif) & Carton Jaune/Noir (Avertissement)',
        when: 'Un bruit extérieur perturbe le départ (Carton Vert) ou un athlète tarde à prendre sa position / 1er faux départ en Décathlon (Carton Jaune et Noir).',
        how: 'Le starter ordonne « Relevez-vous ! » et l\'aide-starter lève le Carton Vert devant tous les couloirs (aucune pénalité) ou le Carton Jaune/Noir au coureur concerné.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Piste 4',
        name: 'Commissaire de Course : Drapeau Jaune (Infraction de Couloir en Virage)',
        when: 'Au 200 m ou au 400 m, un coureur pose le pied sur ou à gauche de sa ligne intérieure en virage (RT 17.2).',
        how: 'Le commissaire de virage lève immédiatement son DRAPEAU JAUNE pour signaler l\'infraction au Juge-Arbitre des courses et marque l\'endroit exact sur la piste.',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'World Athletics · Arrivée 5',
        name: 'Cassé du Torse sur le Plan Vertical de la Ligne d\'Arrivée',
        when: 'Franchissement de la ligne d\'arrivée par les sprinters.',
        how: 'Les juges à l\'arrivée (et le juge chef de la photo-finish) pointent exclusivement le bord antérieur du TORSE (clavicules/poitrine) sur le bord intérieur de la ligne blanche.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'World Athletics · Chronométrage 6',
        name: 'Déclenchement du Chronomètre à la Flamme / Fumée (et non au Son !)',
        when: 'En chronométrage manuel (EPS et compétitions scolaires ASS).',
        how: 'L\'élève-chronométreur déclenche son chronomètre à l\'instant où il VOIT la fumée/flamme du pistolet ou le rapprochement des deux planchettes du claquoir (car le son met ~0,3 s à parcourir 100 m !).',
        svgType: 'point_corner_up'
      }
    ],
    epsAdaptationTable: [
      ['Distances de Sprint en EPS Maroc', '100 m, 200 m, 400 m en compétition fédérale', 'En Collège (OP 2009) : 60 m plat · En Lycée & Baccalauréat (OP 2007) : 80 m (Filles) et 100 m (Garçons) sur piste ou plateau tracé', 'Permet d\'évaluer l\'explosion au départ, la mise en action et le maintien de la vitesse maximale sans épuisement lactique excessif'],
      ['Outil de Départ & Chronométrage Scolaire', 'Pistolet électronique relié à la photo-finish (+0,24 s d\'écart avec le manuel sur 100m/200m)', 'Utilisation d\'un CLAQUOIR visuel (2 planchettes de bois peintes en blanc/rouge) : le starter dit « À vos marques - Prêts » puis claque les planches au-dessus de sa tête pour que le chronométreur à l\'arrivée déclenche au signal VISUEL', 'Supprime l\'erreur liée à la vitesse du son (340 m/s) entre le départ et l\'arrivée'],
      ['Tolérance sur le Faux Départ en EPS', 'Disqualification dès le 1er faux départ (RT 16.8)', 'En séance d\'EPS et au Bac : 1er faux départ = rappel et avertissement pédagogique (Carton Jaune) ; 2e faux départ du même élève = pénalité ou départ différé', 'Garantit que chaque élève réalise sa course d\'évaluation']
    ],
    crmefQuestions: [
      {
        q: '1. Quel est le temps de réaction minimal autorisé par World Athletics au départ d\'un 100 m, 200 m ou 400 m (RT 16.7) ?',
        a: 'Le temps de réaction minimal physiologique fixé par World Athletics est de 0,100 seconde (100 millisecondes). Si les capteurs de pression des starting-blocks enregistrent une poussée dans un délai strictement inférieur à 0,100 s après la détonation du pistolet, le système signale automatiquement un faux départ acoustique dans le casque du starter.'
      },
      {
        q: '2. Pourquoi l\'élève-chronométreur placé à l\'arrivée d\'un 100 m doit-il déclencher son chronomètre à la VUE du claquoir/fumée et jamais au SON ?',
        a: 'Parce que la lumière se propage quasi instantanément ($300\\,000\\text{ km/s}$) alors que le son se propage dans l\'air à environ $340\\text{ m/s}$. Sur un 100 m, le son met donc près de $0,29\\text{ seconde}$ à parvenir à la ligne d\'arrivée : déclencher au son fausserait (raccourcirait artificiellement) le chrono de l\'élève de près de 3 dixièmes de seconde !'
      },
      {
        q: '3. Quelle est la valeur exacte de la majoration appliquée à un temps manuel (au 1/10e s) pour le comparer à un temps électrique (au 1/100e s) sur 100 m et 200 m ?',
        a: 'En statistique et réglementation d\'athlétisme, on ajoute $+0,24\\text{ seconde}$ au temps manuel sur 100 m et 200 m (et $+0,14\\text{ seconde}$ sur 400 m) pour compenser le temps de réaction du chronométreur humain au déclenchement.'
      },
      {
        q: '4. Quelles sont les 4 phases biomécaniques d\'une course de vitesse (100 m) à enseigner en EPS ?',
        a: '1) Le temps de réaction et l\'impulsion dans les blocks (sortie rasante, poussée complète de la jambe avant) ; 2) La phase d\'accélération / mise en action (0 à 30 m : tronc incliné vers l\'avant, augmentation progressive de l\'amplitude et de la fréquence) ; 3) La phase de vitesse maximale (30 à 60/70 m : redressement du buste, appuis actifs en « griffé » sous le centre de gravité, bassin haut en rétroversion) ; 4) Le maintien de la vitesse / décélération minimale (70 à 100 m : relâchement des épaules et de la mâchoire) et le « cassé » du buste sur la ligne.'
      },
      {
        q: '5. Quelle est la vitesse maximale du vent favorable pour homologuer un record au 100 m et au 200 m, et pourquoi n\'y a-t-il pas d\'anémomètre au 400 m ?',
        a: 'La limite maximale de vent favorable est de $+2,0\\text{ m/s}$ (au-delà, la performance reste valable pour le classement de la course mais n\'est pas homologuée comme record). Il n\'y a pas de mesure de vent sur le 400 m car la course s\'effectue sur un tour complet de piste (un vent favorable sur la ligne droite opposée devient défavorable dans la ligne droite d\'arrivée).'
      },
      {
        q: '6. Quelle est la différence réglementaire entre mordre la ligne de gauche et la ligne de droite de son couloir en virage (200 m / 400 m) ?',
        a: 'En virage, poser le pied SUR ou à gauche de la ligne intérieure (côté corde) réduit la distance à parcourir et entraîne la disqualification (RT 17.2). En revanche, poser le pied sur la ligne de droite ne réduit pas la distance (et la ligne de droite de 5 cm fait réglementairement partie du couloir) : l\'athlète n\'est disqualifié que s\'il gêne le coureur du couloir extérieur.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Course de Vitesse (60m Collège / 80m & 100m Lycée et Baccalauréat) au Maroc',
      reality: 'Au départ du 60 m ou du 80 m en EPS, deux erreurs reviennent chez 80 % des élèves : 1) Ils se redressent complètement dès le 1er appui en sortant des blocks ; 2) Ils ralentissent à 3 mètres de la ligne d\'arrivée ou sautent à pieds joints sur la ligne !',
      tip: 'Pour corriger le redressement précoce, je tends un élastique souple (ou je tiens une perche en mousse) à 1,30 m de haut à 2 mètres devant la ligne de départ : l\'élève est obligé de jaillir bas (« tête dans le guidon ») sous l\'élastique pendant ses 4 premiers appuis. Et pour éliminer la décélération finale, je place deux cônes rouges 5 mètres APRÈS la ligne blanche d\'arrivée en leur disant : « Le chronomètre s\'arrête à la ligne blanche, mais l\'évaluateur technique vous note jusqu\'aux cônes rouges ! ».'
    }
  },

  // ============================================================================
  // 2. COURSE DE RELAIS (4x100m [400m], 4x400m, RELAIS 1200m / MEDLEY & EPS)
  // ============================================================================
  {
    id: 'athletisme-relais',
    slug: 'reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Course de Relais (4×100m [400m], 4×400m, Relais 1200m & EPS)',
    shortTitle: 'Règlement Course de Relais (4×100m, 4×400m, 1200m)',
    title: 'Règlement Officiel des Courses de Relais (4×100m, 4×400m, Relais 1200m — World Athletics RT 24), Zone 30m, Témoin, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet des courses de relais (4x100m, 4x400m, relais 1200m et relais scolaire EPS) conforme à la Règle Technique 24 World Athletics 2026 : zone de transmission de 30m vs 20m, témoin (50g, 28-30cm), rabattement, chute du témoin, signaux des juges et PDF.',
    badge: ' baton · Règlement Officiel World Athletics RT 24 · Relais 4×100m / 4×400m / 1200m',
    federation: 'World Athletics (Règle Technique 24) / CAA / FRMA & FRMSS Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règle Technique 24 — Relais)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '27 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger la Règle Technique 24 (Courses de Relais World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 24 Relay Races)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règle Technique 24 intégrale : dimensions du témoin, zones de transmission de 30 m (4×100m) et 20 m (4×400m), rabattement après 500 m et infractions.'
      },
      {
        label: 'Guide Officiel du Juge de Relais & Arbitrage Piste (FFA / World Athletics)',
        org: 'FFA / Commission Nationale des Officiels',
        url: 'https://www.athle.fr/asp.net/main.html/html.aspx?htmlid=125',
        note: 'Schémas des marques de zone (triangles jaunes et bleus) et protocole des commissaires de zone de relais.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel de la zone de transmission de 30m en relais 4x100m et 20m en relais 4x400m">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Bande supérieure : Zoom sur la Zone de Transmission 30m du 4x100m-->
        <rect x="45" y="48" width="710" height="125" rx="8" fill="#b91c1c" stroke="#ffffff" stroke-width="3"/>
        <line x1="45" y1="110" x2="755" y2="110" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-dasharray="8,6"/>
        <!--Zone de 30 mètres (4x100m)-->
        <rect x="140" y="48" width="510" height="125" fill="rgba(253,224,71,0.25)" stroke="#fde047" stroke-width="3.5"/>
        <!--Ancienne marque centrale (10m d'élan + 20m)-->
        <line x1="310" y1="48" x2="310" y2="173" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5,4"/>
        <!--Marque de contrôle (scotch) posée par le receveur-->
        <rect x="92" y="75" width="10" height="22" fill="#4ade80"/>
        <!--Témoin transmis au coeur de la zone-->
        <rect x="465" y="74" width="52" height="12" rx="6" fill="#fde047" stroke="#0f172a" stroke-width="2"/>
        <!--Bande médiane : Piste 400m avec les 3 passages et le rabattement du 4x400m / 1200m-->
        <rect x="45" y="198" width="710" height="120" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="45" y="334" width="225" height="108" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="288" y="334" width="225" height="108" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="334" width="225" height="108" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">ZONE DE TRANSMISSION OFFICIELLE : 30 MÈTRES (4×100 m) · 20 MÈTRES (4×400 m &amp; Relais 1200 m)</text>
          <text x="95" y="66" fill="#4ade80" font-size="10.5">Marque d'élan (5×40 cm max)</text>
          <text x="140" y="42" fill="#fde047">Entrée Zone (0 m)</text>
          <text x="310" y="42" fill="#38bdf8">+10 m (Ex-entrée)</text>
          <text x="490" y="66" fill="#fde047">TÉMOIN (28–30 cm · ≥ 50 g)</text>
          <text x="650" y="42" fill="#fde047">Sortie Zone (30 m)</text>
          <text x="395" y="152" fill="#ffffff">RÈGLE D'OR (RT 24.7) : Seule la position du TÉMOIN (et non des pieds/corps des coureurs) fait foi !</text>
          <!--Bande médiane : Comparaison des 3 formats de relais-->
          <text x="400" y="220" fill="#38bdf8" font-size="12.5">📊 COMPARATIF DES FORMATS DE RELAIS (PISTE &amp; SCOLAIRE)</text>
          <text x="400" y="244" font-weight="600">• Relais 4×100 m (400 m) : Intégralement en couloirs · 3 zones de transmission de 30 m chacune (20 m avant + 10 m après la ligne)</text>
          <text x="400" y="266" font-weight="600">• Relais 4×400 m (1600 m) : 1er tour + 1er virage du 2e relayeur en couloirs (500 m) → Rabattement à la corde · Zones de 20 m</text>
          <text x="400" y="288" font-weight="600">• Relais 1200 m (4×300m ou Medley 100m-200m-300m-600m / Cross-Relais ASS) : Zones de 20 m · Passage à vue</text>
          <text x="400" y="308" font-weight="600" fill="#fde047">• EPS Maroc : Relais 4×50 m ou 4×60 m (Collège) et 4×80 m ou 4×100 m (Lycée) · Gain de vitesse du témoin</text>
          <!--Boîtes du bas-->
          <text x="157" y="356" fill="#fde047" font-size="12">🥖 LE TÉMOIN (RT 24.5)</text>
          <text x="157" y="376" font-weight="600">• Tube lisse creux d'une seule pièce</text>
          <text x="157" y="394" font-weight="600">• Longueur : 28 cm à 30 cm</text>
          <text x="157" y="412" font-weight="600">• Poids : minimum 50 grammes</text>
          <text x="157" y="430" font-weight="600">• Circonférence : 12 à 13 cm (Ø ~4cm)</text>
          <text x="400" y="356" fill="#38bdf8" font-size="12">🔄 LA TRANSMISSION (RT 24.6)</text>
          <text x="400" y="376" font-weight="600">• Porté à la main toute la course</text>
          <text x="400" y="394" font-weight="600">• Interdit de lancer le témoin !</text>
          <text x="400" y="412" font-weight="600">• Chute : ramassé PAR CELUI qui</text>
          <text x="400" y="430" font-weight="600">  l'a fait tomber (sans gêner)</text>
          <text x="642" y="356" fill="#f87171" font-size="12">🚫 MOTIFS DE DISQUALIFICATION</text>
          <text x="642" y="376" font-weight="600">• Témoin pris avant la ligne d'entrée</text>
          <text x="642" y="394" font-weight="600">• Témoin lâché après la ligne de sortie</text>
          <text x="642" y="412" font-weight="600">• Pousser le receveur au départ</text>
          <text x="642" y="430" font-weight="600">• Gêner un adversaire après passage</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Les Distances de Relais (RT 24)', 'Relais 4×100 m (soit 400 m au total) · Relais 4×200 m (800 m) · Relais 4×400 m (Hommes, Femmes et Mixte) · Relais 1200 m (4×300 m scolaire ou Relais Medley 100m-200m-300m-600m / 1200m-400m-800m-1600m)', 'En EPS Maroc : relais navette ou sur piste 4×50 m / 4×60 m (Collège) et 4×80 m / 4×100 m (Lycée)'],
      ['Caractéristiques du Témoin (RT 24.5)', 'Tube lisse, creux, de section circulaire, fait de bois, de métal ou de plastique rigide d\'une seule pièce · Longueur : 280 à 300 mm (28 à 30 cm) · Masse : au moins 50 g · Circonférence : 120 à 130 mm', 'Le témoin doit être porté à la main pendant toute la course (gants et substances adhésives sur les mains interdits : RT 24.6)'],
      ['Longueur des Zones de Transmission (RT 24.3)', 'Relais 4×100 m et 4×200 m : Zone de 30 MÈTRES (depuis la suppression de la pré-zone de 10 m : 20 m avant la ligne théorique + 10 m après) · Relais 4×400 m et Relais ≥ 4×300 m (1200 m) : Zone de 20 MÈTRES (10 m de part et d\'autre de la ligne)', 'Le relayeur (receveur) a l\'obligation de prendre son départ à l\'INTÉRIEUR de la zone de 30 m (ou 20 m)'],
      ['Critère de Validation du Passage (RT 24.7)', 'La transmission commence dès que le témoin est touché par le receveur et est terminée au moment précis où il est uniquement dans la main du receveur', 'Seule la position du TÉMOIN par rapport aux lignes de la zone est prise en compte (la position des pieds ou du buste des coureurs n\'a aucune importance !)'],
      ['Marque de Contrôle sur la Piste (RT 24.4)', 'Lorsqu\'un relais est couru entièrement ou partiellement en couloirs, un athlète peut placer UNE SEULE marque de contrôle (ruban adhésif de 5 cm × 40 cm max) sur la piste à l\'intérieur de son propre couloir', 'En EPS : indispensable pour régler la distance d\'élan (ex. 14 à 18 pieds avant la zone) entre le donneur et le receveur'],
      ['Rabattement au 4×400 m & Relais 1200 m (RT 24.15)', 'Au 4×400 m, le 1er tour (400 m) ainsi que le 1er virage du 2e tour (jusqu\'à la ligne de rabattement après 500 m de course) sont courus en couloirs. Ensuite, les coureurs se rabattent à la corde', 'Aux 2e et 3e passages du 4×400 m, les receveurs sont placés par un officiel dans l\'ordre de passage de leurs partenaires à 200 m de l\'arrivée (et ne doivent plus changer d\'ordre !)']
    ],
    lawsSummary: [
      {
        title: 'La Règle de la Zone de 30 Mètres (4×100m) vs 20 Mètres (4×400m / 1200m)',
        content: 'Depuis la réforme historique de World Athletics (ex-IAAF), l\'ancienne « zone d\'élan » (pré-zone de 10 m) a été fusionnée avec la zone de transmission de 20 m sur le relais 4×100 m (et les relais jusqu\'au 4×200 m) pour former une ZONE DE TRANSMISSION UNIQUE DE 30 MÈTRES (délimitée par des triangles jaunes). Le receveur doit obligatoirement démarrer à l\'intérieur de ces 30 m (il n\'a pas le droit d\'attendre avant la ligne d\'entrée des 30 m). Pour le relais 4×400 m et les relais plus longs (comme le relais 1200 m scolaire/medley), la zone de transmission mesure 20 MÈTRES (10 m avant et 10 m après la ligne de départ/arrivée).'
      },
      {
        title: 'Jugement du Témoin, Chute du Témoin et Comportement Après le Passage (RT 24.6 à 24.11)',
        content: 'Trois règles impératives gouvernent la manipulation du témoin : 1) Le témoin doit être passé de la main à la main (le lancer ou le faire rouler au sol entraîne la disqualification immédiate) ; 2) Si le témoin tombe pendant la course ou pendant le passage, il doit obligatoirement être ramassé PAR L\'ATHLÈTE QUI L\'A FAIT TOMBER (si c\'est pendant la phase d\'échange où les deux ont la main dessus, l\'un ou l\'autre peut le ramasser, mais si seul le donneur le tenait, seul le donneur peut le ramasser !). Il peut quitter son couloir pour le récupérer à condition de ne gêner personne et de ne pas réduire la distance à courir ; 3) Après avoir transmis le témoin, le donneur doit rester dans son couloir (ou dans sa trajectoire droite) jusqu\'à ce que la piste soit totalement dégagée pour ne pas gêner les autres équipes.'
      },
      {
        title: 'Les Deux Techniques de Transmission en EPS (De Bas en Haut vs De Haut en Bas) et l\'Alternance des Mains',
        content: 'Sur le plan technico-didactique en EPS et au CRMEF : 1) Pour éviter de changer le témoin de main pendant la course et pour courir au plus près de la corde en virage, on alterne les mains et le placement dans le couloir : le 1er relayeur (virage) tient le témoin de la main DROITE (intérieur du couloir) → le passe au 2e relayeur (ligne droite) dans la main GAUCHE (extérieur) → qui le passe au 3e relayeur (2e virage) dans la main DROITE (intérieur) → qui le passe au 4e relayeur (ligne droite finale) dans la main GAUCHE (extérieur) ; 2) On distingue la technique « de bas en haut » (paume du receveur orientée vers le bas/arrière en V inversé, sécurisante pour les élèves au collège) et la technique « de haut en bas » (paume ouverte vers le ciel à hauteur d\'épaule, privilégiée au lycée pour maximiser la distance libre entre les deux coureurs).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Relais 1',
        name: 'Juge Chef de Zone : Drapeau Blanc (Tous les Passages Valides)',
        when: 'Les 8 équipes ont transmis le témoin à l\'intérieur des limites de la zone de 30 m (ou 20 m) sans gêne.',
        how: 'Dès que tous les coureurs ont quitté la zone, le chef de zone lève le DRAPEAU BLANC vers le Juge-Arbitre des courses.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Relais 2',
        name: 'Drapeau Jaune + Marquage au Sol (Transmission Hors Zone des 30m)',
        when: 'Le témoin est lâché par le donneur avant l\'entrée de la zone (0 m) ou après la ligne de sortie de la zone (30 m).',
        how: 'Le commissaire de zone pointe immédiatement le sol à l\'endroit précis où la transmission s\'est achevée, y colle un ruban repère et lève le DRAPEAU JAUNE (suivi du Carton Rouge de DQ par le Juge-Arbitre).',
        svgType: 'point_penalty_down'
      },
      {
        code: 'World Athletics · Relais 3',
        name: 'Signal « Poussée ou Assistance Illicite » (RT 24.19)',
        when: 'Le donneur pousse dans le dos le receveur pour le lancer, ou le receveur prend appui hors de la zone de 30 m.',
        how: 'Le commissaire signale l\'infraction des deux bras tendus vers l\'avant et lève son drapeau jaune pour le Juge-Arbitre.',
        svgType: 'advantage_both_arms'
      },
      {
        code: 'World Athletics · Relais 4',
        name: 'Drapeau Vert / Cônes de Rabattement (500 m au Relais 4×400 m)',
        when: 'Après le 1er virage du 2e relayeur au 4×400 m (ligne arquée de rabattement).',
        how: 'Le commissaire placé à la ligne de rabattement contrôle qu\'aucun 2e relayeur ne quitte son couloir avant d\'avoir franchi la ligne marquée de petits cônes/prismes verts.',
        svgType: 'point_horizontal'
      },
      {
        code: 'World Athletics · Relais 5',
        name: 'Placement des Receveurs par Ordre aux 200 m (4×400 m & 1200 m)',
        when: 'Avant les 2e et 3e transmissions du 4×400 m (course à la corde).',
        how: 'L\'officiel aligne les receveurs de la corde vers l\'extérieur dans l\'ordre exact où leurs partenaires franchissent la marque des 200 m : une fois alignés, ils ont interdiction de permuter !',
        svgType: 'cross_arms_stop'
      },
      {
        code: 'World Athletics · Relais 6',
        name: 'Signal Vocal du Donneur (« HOP ! ») & Bras Arrière Verrouillé',
        when: 'Communication codifiée entre le donneur et le receveur au cœur de la zone.',
        how: 'Le receveur sprinte en regardant droit devant lui ; au cri « HOP ! » du donneur (à ~2 m), il tend le bras en arrière sans se retourner.',
        svgType: 'point_corner_up'
      }
    ],
    epsAdaptationTable: [
      ['Formule d\'Évaluation en EPS Maroc', 'Chrono brut du 4×100 m fédéral', 'En EPS (Collège/Lycée) : on évalue l\'INDICE D\'EFFICACITÉ DU RELAIS en comparant le temps du relais ($T_{\\text{relais}}$ sur $4 \\times 50\\text{ m}$) à la somme des 4 temps individuels ($\\sum T_{\\text{indiv}}$) : plus le gain de temps est élevé (grâce à la vitesse lancée du receveur), meilleure est la note collective !', 'Valorise la coordination technique (« donner en courant à quelqu\'un qui court déjà ») plutôt que la seule vitesse brute'],
      ['Sécurisation de la Zone en Séance', 'Zone unique de 30 m', 'Traçage de 3 sous-zones de couleur (10 m d\'accélération bleue + 10 m de transmission verte optimale + 10 m d\'alerte orange) : un passage réussi dans la zone verte centrale rapporte un bonus de +2 points d\'exécution !', 'Apprend aux élèves à transmettre à pleine vitesse entre le 18e et le 25e mètre'],
      ['Rôle de l\'Élève-Juge de Zone', 'Commissaires de piste', 'Un binôme d\'élèves-juges par zone : l\'un observe l\'entrée (vérifie que le receveur part au moment où le donneur franchit sa marque d\'élan), l\'autre juge la sortie des 30 m avec un drapeau blanc (valide) et un drapeau rouge (hors zone)', 'Responsabilisation immédiate sur la Règle Technique 24']
    ],
    crmefQuestions: [
      {
        q: '1. Quelle est la longueur exacte de la zone de transmission au 4×100 m et au 4×400 m selon la Règle Technique 24 de World Athletics ?',
        a: 'Au relais 4×100 m (et 4×200 m), la zone de transmission mesure 30 mètres de long (intégrant les 10 m d\'élan et les 20 m de l\'ancienne zone). Au relais 4×400 m (ainsi que sur les relais plus longs type 1200 m), la zone de transmission mesure 20 mètres (10 m de part et d\'autre de la ligne).'
      },
      {
        q: '2. Si les deux pieds du receveur ont déjà franchi la ligne de sortie des 30 mètres, mais que le témoin se trouve encore au-dessus de la zone de 30 m au moment où le donneur le lâche, le passage est-il valide ?',
        a: 'OUI, le passage est 100 % VALIDE ! La Règle Technique 24.7 est formelle : seule la position du TÉMOIN (et non celle des pieds, des mains ou du corps des coureurs) par rapport au plan vertical des lignes de zone détermine la validité de la transmission.'
      },
      {
        q: '3. Quel est l\'enchaînement réglementaire et biomécanique optimal des mains (Droite / Gauche) sur un relais 4×100 m ?',
        a: '1er relayeur (départ en virage) : main DROITE (court à la corde) → 2e relayeur (ligne droite opposée) : main GAUCHE (extérieur du couloir) → 3e relayeur (2e virage) : main DROITE (intérieur/corde) → 4e relayeur (ligne droite finale) : main GAUCHE (extérieur). Aucun coureur ne change le témoin de main pendant sa course.'
      },
      {
        q: '4. Combien de mètres sont courus en couloirs lors d\'un relais 4×400 m avant le rabattement à la corde ?',
        a: '500 mètres au total (soit 3 virages en couloirs) : le 1er relayeur parcourt ses 400 mètres intégralement dans son couloir, et le 2e relayeur court son premier virage (100 m) dans son couloir avant de se rabattre à la corde au niveau de la ligne de rabattement située à la sortie du 1er virage.'
      },
      {
        q: '5. Comment calcule-t-on l\'Indice d\'Efficacité Technique d\'une équipe de relais en didactique de l\'EPS ?',
        a: 'On additionne les 4 temps individuels départ arrêté des élèves (ex. sur 50 m : $7,0 + 7,2 + 6,8 + 7,0 = 28,0\\text{ s}$) et on soustrait le temps réalisé par l\'équipe au relais $4 \\times 50\\text{ m}$ (ex. $26,2\\text{ s}$). L\'indice de gain est ici de $+1,8\\text{ s}$ : comme les relayeurs 2, 3 et 4 sont lancés et que le témoin parcourt ~1 m de bras tendu à bras tendu à chaque passage, une équipe coordonnée bat toujours la somme de ses temps individuels.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Course de Relais Vitesse (4×50m Collège / 4×80m & 4×100m Lycée) au Maroc',
      reality: 'En début de cycle de relais, 90 % des receveurs courent la tête retournée en arrière en tendant les deux mains comme pour attraper un ballon, ce qui détruit complètement leur vitesse et provoque des collisions avec le donneur !',
      tip: 'J\'applique la règle du « Regard Fixe + Cri Codé » : le receveur place sa marque au sol (à 15 pieds avant la zone). Dès que le donneur écrase cette marque, le receveur sprinte à 100 % en fixant un cône jaune placé devant lui au bout du couloir (interdiction absolue de tourner la tête : s\'il se retourne, l\'équipe perd 1 point de maîtrise !). Il ne tend le bras en arrière qu\'au cri « HOP ! » de son partenaire. Dès la 2e séance, les collisions disparaissent et le chrono baisse d\'une seconde pleine.'
    }
  },

  // ============================================================================
  // 3. COURSE DE HAIES (100m HAIES, 110m HAIES, 400m HAIES & HAIES EPS)
  // ============================================================================
  {
    id: 'athletisme-haies',
    slug: 'reglement-course-haies-100m-110m-400m-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Course de Haies (100m Haies, 110m Haies, 400m Haies & EPS)',
    shortTitle: 'Règlement Course de Haies (100m, 110m, 400m Haies)',
    title: 'Règlement Officiel des Courses de Haies (100m, 110m, 400m Haies — World Athletics RT 22), Hauteurs, Intervalles, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet des courses de haies (100m haies F, 110m haies H, 400m haies et haies scolaires EPS) conforme à la Règle Technique 22 World Athletics 2026 : tableau des 10 haies (hauteurs et distances exactes), fautes de franchissement, signaux des juges et PDF.',
    badge: '🚧 Règlement Officiel World Athletics RT 22 · 100m / 110m / 400m Haies',
    federation: 'World Athletics (Règle Technique 22) / CAA / FRMA Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règle Technique 22 — Courses de Haies)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '28 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger la Règle Technique 22 (Courses de Haies World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 22 Hurdle Races)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Tableau officiel des hauteurs, espacements des 10 haies par catégorie (U18, U20, Seniors), force de basculement (3,6 à 4 kg) et infractions.'
      },
      {
        label: 'Fiches Officielles des Courses de Haies en Français (FFA / World Athletics)',
        org: 'FFA / Commission Nationale des Officiels',
        url: 'https://www.athle.fr/asp.net/main.html/html.aspx?htmlid=125',
        note: 'Repères de piste de couleurs pour le placement des haies (100mH jaune, 110mH bleu, 400mH vert) et jugement des fautes.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel des distances et hauteurs des 10 haies au 100m haies, 110m haies et 400m haies">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Couloir 1 : 110m Haies Hommes-->
        <rect x="40" y="46" width="720" height="72" rx="6" fill="#1e3a8a" stroke="#ffffff" stroke-width="2.5"/>
        <!--Couloir 2 : 100m Haies Femmes-->
        <rect x="40" y="132" width="720" height="72" rx="6" fill="#991b1b" stroke="#ffffff" stroke-width="2.5"/>
        <!--Couloir 3 : 400m Haies H & F-->
        <rect x="40" y="218" width="720" height="72" rx="6" fill="#065f46" stroke="#ffffff" stroke-width="2.5"/>
        <!--10 Haies symbolisées-->
        <g stroke="#fde047" stroke-width="3.5">
          <line x1="155" y1="52" x2="155" y2="112"/><line x1="210" y1="52" x2="210" y2="112"/><line x1="265" y1="52" x2="265" y2="112"/><line x1="320" y1="52" x2="320" y2="112"/><line x1="375" y1="52" x2="375" y2="112"/><line x1="430" y1="52" x2="430" y2="112"/><line x1="485" y1="52" x2="485" y2="112"/><line x1="540" y1="52" x2="540" y2="112"/><line x1="595" y1="52" x2="595" y2="112"/><line x1="650" y1="52" x2="650" y2="112"/>
          <line x1="155" y1="138" x2="155" y2="198"/><line x1="210" y1="138" x2="210" y2="198"/><line x1="265" y1="138" x2="265" y2="198"/><line x1="320" y1="138" x2="320" y2="198"/><line x1="375" y1="138" x2="375" y2="198"/><line x1="430" y1="138" x2="430" y2="198"/><line x1="485" y1="138" x2="485" y2="198"/><line x1="540" y1="138" x2="540" y2="198"/><line x1="595" y1="138" x2="595" y2="198"/><line x1="650" y1="138" x2="650" y2="198"/>
          <line x1="155" y1="224" x2="155" y2="284"/><line x1="210" y1="224" x2="210" y2="284"/><line x1="265" y1="224" x2="265" y2="284"/><line x1="320" y1="224" x2="320" y2="284"/><line x1="375" y1="224" x2="375" y2="284"/><line x1="430" y1="224" x2="430" y2="284"/><line x1="485" y1="224" x2="485" y2="284"/><line x1="540" y1="224" x2="540" y2="284"/><line x1="595" y1="224" x2="595" y2="284"/><line x1="650" y1="224" x2="650" y2="284"/>
        </g>
        <!--Cartes récapitulatives en bas-->
        <rect x="40" y="310" width="230" height="130" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="285" y="310" width="230" height="130" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="310" width="230" height="130" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="28" fill="#fde047">COURSES DE HAIES (RT 22) : TOUJOURS 10 HAIES PAR COULOIR (100mH · 110mH · 400mH)</text>
          <!--110mH-->
          <text x="98" y="75" fill="#fde047">110m Haies H</text>
          <text x="98" y="95" font-size="10.5">Départ→H1 : 13,72 m</text>
          <text x="402" y="86" fill="#ffffff" font-size="12">10 Haies de 1,067 m · Intervalle = 9,14 m (3 appuis)</text>
          <text x="705" y="86" font-size="10.5">H10→Arrivée : 14,02 m</text>
          <!--100mH-->
          <text x="98" y="161" fill="#fde047">100m Haies F</text>
          <text x="98" y="181" font-size="10.5">Départ→H1 : 13,00 m</text>
          <text x="402" y="172" fill="#ffffff" font-size="12">10 Haies de 0,838 m (84 cm) · Intervalle = 8,50 m</text>
          <text x="705" y="172" font-size="10.5">H10→Arrivée : 10,50 m</text>
          <!--400mH-->
          <text x="98" y="247" fill="#fde047">400m Haies H/F</text>
          <text x="98" y="267" font-size="10.5">Départ→H1 : 45,00 m</text>
          <text x="402" y="258" fill="#ffffff" font-size="12">10 Haies (0,914 m H / 0,762 m F) · Intervalle = 35,00 m</text>
          <text x="705" y="258" font-size="10.5">H10→Arrivée : 40,00 m</text>
          <!--Boîtes du bas-->
          <text x="155" y="334" fill="#fde047" font-size="12">📐 LA HAIE OFFICIELLE (RT 22.2)</text>
          <text x="155" y="355" font-weight="600">• Largeur : 1,18 m à 1,20 m</text>
          <text x="155" y="375" font-weight="600">• Longueur des pieds : max 70 cm</text>
          <text x="155" y="395" font-weight="600">• Poids total : au moins 10 kg</text>
          <text x="155" y="415" font-weight="600">• Force de bascule : 3,6 à 4,0 kg</text>
          <text x="400" y="334" fill="#4ade80" font-size="12">✅ RÈGLE DU RENVERSÉ (RT 22.6)</text>
          <text x="400" y="355" font-weight="600">• Faire tomber des haies involon-</text>
          <text x="400" y="375" font-weight="600">  tairement N'EST PAS UNE FAUTE !</text>
          <text x="400" y="395" font-weight="600">• Même les records du monde sont</text>
          <text x="400" y="415" font-weight="600">  homologués si des haies tombent</text>
          <text x="645" y="334" fill="#f87171" font-size="12">🚫 LES 3 FAUTES DE DQ (RT 22.6)</text>
          <text x="645" y="355" font-weight="600">1. Pied/jambe passe À CÔTÉ (sous</text>
          <text x="645" y="375" font-weight="600">   le plan horizontal du sommet)</text>
          <text x="645" y="395" font-weight="600">2. Renverser avec la MAIN ou le</text>
          <text x="645" y="415" font-weight="600">   buste volontairement / gêner</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Nombre de Haies par Course (RT 22.1)', 'TOUJOURS 10 HAIES dans chaque couloir pour toutes les courses officielles en plein air : 100 m Haies (Femmes), 110 m Haies (Hommes) et 400 m Haies (Hommes et Femmes)', 'En salle (60 m Haies) : 5 haies par couloir · En EPS Maroc : 4 à 6 haies basses sur 50 m, 60 m ou 80 m'],
      ['110 m Haies Hommes (RT 22.1)', 'Hauteur Seniors : 1,067 m (Juniors U20 : 0,991 m · Cadets U18 : 0,914 m) · Départ → 1re haie : 13,72 m · Intervalle entre les haies : 9,14 m · 10e haie → Arrivée : 14,02 m', 'Course rythmée en 8 appuis jusqu\'à la 1re haie puis 3 appuis (4 foulées) entre chaque haie'],
      ['100 m Haies Femmes (RT 22.1)', 'Hauteur Seniors/Juniors : 0,838 m (84 cm) (Cadettes U18 : 0,762 m) · Départ → 1re haie : 13,00 m · Intervalle entre les haies : 8,50 m · 10e haie → Arrivée : 10,50 m', '9 intervals de 8,50 m = 76,50 m (+ 13,00 m + 10,50 m = 100,00 m exacts)'],
      ['400 m Haies Hommes & Femmes (RT 22.1)', 'Hauteur Hommes : 0,914 m (Cadets : 0,838 m) · Hauteur Femmes : 0,762 m · Départ → 1re haie : 45,00 m · Intervalle entre les haies : 35,00 m · 10e haie → Arrivée : 40,00 m', '9 intervalles de 35,00 m = 315,00 m (+ 45,00 m + 40,00 m = 400,00 m exacts ! Très fréquent au QCM CRMEF)'],
      ['Dimensions & Contrepoids de la Haie (RT 22.2)', 'Largeur : 1,18 m à 1,20 m · Longueur maximale des bases (pieds orientés vers le départ) : 70 cm · Masse totale : ≥ 10 kg · Barre supérieure en bois de 7 cm de haut avec bandes noires et blanches', 'Force de basculement (contrepoids réglables) : il faut exercer une force horizontale de 3,6 kg à 4,0 kg au milieu du bord supérieur pour la renverser'],
      ['Motifs de Disqualification (RT 22.6)', '1) Le pied ou la jambe passe à côté de la haie en dessous du plan horizontal du haut de la haie · 2) Franchir une haie qui n\'est pas dans son couloir · 3) Renverser délibérément une haie avec la main ou le corps (ou gêner un voisin avec une haie renversée)', 'Renverser involontairement une ou plusieurs haies avec le pied ou la jambe n\'entraîne AUCUNE disqualification ni annulation de record !']
    ],
    lawsSummary: [
      {
        title: 'Les Cotes Officielles des 10 Haies (110mH, 100mH, 400mH — Règle Technique 22.1)',
        content: 'C\'est l\'un des tableaux les plus demandés au concours du CRMEF EPS : dans les trois épreuves olympiques (100 m haies, 110 m haies, 400 m haies), chaque couloir comporte exactement 10 haies (soit 9 intervalles inter-obstacles). Au 110 m haies Hommes : hauteur 1,067 m, départ–H1 = 13,72 m, intervalle = 9,14 m, H10–arrivée = 14,02 m. Au 100 m haies Femmes : hauteur 0,838 m (84 cm), départ–H1 = 13,00 m, intervalle = 8,50 m, H10–arrivée = 10,50 m. Au 400 m haies (H & F) : hauteur 0,914 m (H) et 0,762 m (F), départ–H1 = 45,00 m, intervalle = 35,00 m, H10–arrivée = 40,00 m. Les pieds en L des haies doivent toujours être tournés vers la ligne de DÉPART pour que la haie bascule vers l\'avant en cas de choc.'
      },
      {
        title: 'Les Fautes de Franchissement et le Mythe des Haies Renversées (RT 22.6)',
        content: 'Contrairement à une croyance répandue chez les élèves, faire tomber des haies pendant la course n\'entraîne aucune pénalité ni disqualification (et n\'empêche même plus l\'homologation d\'un record du monde), dès lors que le renversement n\'est pas intentionnel. En revanche, selon la RT 22.6, un hurdler est disqualifié si : 1) Son pied ou sa jambe d\'esquive passe à côté de la haie (à l\'extérieur de l\'extrémité de la barre) en dessous du plan horizontal supérieur de cette haie ; 2) Il renverse délibérément une haie avec la main, le bras ou la poitrine ; 3) Il franchit une haie située dans un autre couloir ou si une haie qu\'il a renversée se déplace dans un couloir voisin et gêne un autre coureur.'
      },
      {
        title: 'Biomécanique du Franchissement en EPS : « Courir par-dessus la haie » et Non « Sauter »',
        content: 'En didactique de l\'EPS (Collège OP 2009 / Lycée OP 2007), l\'objectif fondamental est de transformer un « saut en cloche avec piétinement d\'appel » en un « franchissement rasant intégré à la foulée de sprint ». Cela repose sur 4 repères : 1) Une attaque de la jambe avant (jambe d\'attaque) genou haut à ~2,00 m devant la haie (2/3 de la parabole avant la haie, 1/3 après la haie) ; 2) Une inclinaison prononcée du buste vers le genou d\'attaque ; 3) Un retour actif de la jambe d\'appui (jambe d\'esquive) fléchie à l\'horizontale en abduction ; 4) Une reprise d\'appui active au sol sur l\'avant-pied (bassin haut) pour relancer immédiatement en 3, 4 ou 5 appuis réguliers dans l\'intervalle.'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Haies 1',
        name: 'Commissaire de Haies : Jambe d\'Esquive Passant sous le Plan Horizontal (Drapeau Jaune)',
        when: 'En virage (400m haies) ou en ligne droite, la jambe de retour du coureur passe à côté du montant sous le niveau de la barre.',
        how: 'Le commissaire de piste mime le passage latéral bas du bras et lève immédiatement le DRAPEAU JAUNE en notant le numéro du couloir et le numéro de la haie (H1 à H10).',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'World Athletics · Haies 2',
        name: 'Renversement Volontaire avec la Main (Disqualification RT 22.6)',
        when: 'Un coureur déséquilibré pousse ou couche volontairement la haie avec la main avant de la franchir.',
        how: 'Le commissaire signale le contact de la main par un mouvement de poussée vers l\'avant et dresse son drapeau jaune vers le Juge-Arbitre.',
        svgType: 'point_horizontal'
      },
      {
        code: 'World Athletics · Haies 3',
        name: 'Vérification du Sens de Pose des Pieds des Haies (Vers le Départ !)',
        when: 'Avant le départ de chaque série (sécurité critique en EPS et en compétition).',
        how: 'Le chef juge de piste vérifie que les bases (pieds en L) de toutes les haies pointent vers la ligne de DÉPART afin que la haie bascule en cas de heurt (à l\'envers, la haie est bloquée et provoque une chute grave !).',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Haies 4',
        name: 'Infraction de Gêne dans le Couloir Voisin (Haie Projetée)',
        when: 'Un coureur heurte violemment sa haie qui pivote dans le couloir voisin et fait trébucher un adversaire.',
        how: 'Le commissaire lève le drapeau jaune ; le Juge-Arbitre peut disqualifier le coureur fautif et autoriser l\'athlète gêné à recourir en finale (RT 17.2 / 22.6).',
        svgType: 'cross_arms_stop'
      },
      {
        code: 'World Athletics · Haies 5',
        name: 'Comptage Rythmique de l\'Élève-Observateur en EPS (3, 4 ou 5 Appuis)',
        when: 'Lors de l\'évaluation diagnostique et sommative en course de haies scolaire.',
        how: 'L\'élève-juge placé latéralement compte à voix haute les appuis dans chaque intervalle (« 1 - 2 - 3 - Haie ! ») et lève 3 ou 4 doigts pour indiquer la régularité rythmique.',
        svgType: 'four_fingers_up'
      }
    ],
    epsAdaptationTable: [
      ['Aménagement des Couloirs par Niveau en EPS', 'Intervalle fixe unique (9,14 m H / 8,50 m F)', 'En EPS Maroc : mise en place de 4 COULOIRS À INTERVALLES DIFFÉRENCIÉS (ex. Couloir A = 5,50 m · Couloir B = 6,20 m · Couloir C = 6,80 m · Couloir D = 7,50 m) avec des haies basses sécurisées (50 à 76 cm)', 'Permet à chaque élève (quelle que soit sa taille et sa vitesse) de courir en 3 ou 4 appuis sans jamais piétiner devant l\'obstacle !'],
      ['Critère d\'Évaluation Efficacité Haies', 'Chrono brut uniquement', 'En EPS (OP 2007/2009) : comparaison entre le temps au 60 m plat ($T_{\\text{plat}}$) et le temps au 60 m haies ($T_{\\text{haies}}$) : l\'indice de perte de vitesse ($\\Delta T = T_{\\text{haies}} - T_{\\text{plat}}$) doit être inférieur à $1,2\\text{ s}$ à $1,5\\text{ s}$ pour 4 haies !', 'Récompense la qualité technique du franchissement rasant indépendamment des qualités physiques brutes'],
      ['Sécurité Passive Absolue sur le Plateau', 'Haies métalliques à contrepoids', 'Interdiction absolue de franchir une haie à contresens (pieds de la haie tournés vers l\'arrivée) · En début de cycle Collège, utilisation de lattes posées sur deux cônes à encoches', 'Supprime totalement la peur de l\'obstacle (blocage affectif) dès la 1re séance']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les distances exactes (Départ→H1, Intervalle entre les haies, H10→Arrivée) au 400 m Haies Hommes et Femmes ?',
        a: 'Au 400 m Haies (Hommes comme Femmes), il y a 10 haies : la distance du départ à la 1re haie est de 45,00 mètres ; l\'intervalle entre chacune des 10 haies est de 35,00 mètres (soit $9 \\times 35 = 315\\text{ m}$) ; et la distance de la 10e haie à la ligne d\'arrivée est de 40,00 mètres ($45 + 315 + 40 = 400\\text{ m}$). Seule la hauteur change : $0,914\\text{ m}$ pour les Hommes et $0,762\\text{ m}$ pour les Femmes.'
      },
      {
        q: '2. Quelles sont les hauteurs et distances exactes au 110 m Haies Seniors Hommes et au 100 m Haies Seniors Femmes ?',
        a: '• 110 m Haies Hommes : 10 haies de $1,067\\text{ m}$ de haut ; Départ→H1 = $13,72\\text{ m}$ ; Intervalle = $9,14\\text{ m}$ ; H10→Arrivée = $14,02\\text{ m}$. • 100 m Haies Femmes : 10 haies de $0,838\\text{ m}$ ($84\\text{ cm}$) de haut ; Départ→H1 = $13,00\\text{ m}$ ; Intervalle = $8,50\\text{ m}$ ; H10→Arrivée = $10,50\\text{ m}$.'
      },
      {
        q: '3. Quelle est la différence didactique entre un intervalle franchi en « 3 appuis » (nombre impair) et en « 4 appuis » (nombre pair) en EPS ?',
        a: '• En 3 appuis (soit 4 foulées), l\'élève attaque TOUJOURS toutes les haies avec la MÊME jambe d\'attaque (sa jambe préférentielle). • En 4 appuis (soit 5 foulées), l\'élève est obligé d\'ALTERNER sa jambe d\'attaque d\'une haie sur l\'autre (Droite puis Gauche puis Droite), ce qui développe l\'ambidextrie motrice au collège et prépare au 400 m haies.'
      },
      {
        q: '4. Dans quel sens doivent obligatoirement être orientés les pieds (bases en L) d\'une haie d\'athlétisme et pourquoi ?',
        a: 'Les pieds horizontaux de la haie doivent obligatoirement pointer vers la ligne de DÉPART (face au coureur qui arrive). Ainsi, si le coureur heurte la barre supérieure, la haie bascule facilement vers l\'avant (ligne d\'arrivée). Si la haie est posée à l\'envers, les pieds bloquent le basculement et l\'élève s\'empale sur un obstacle fixe !'
      },
      {
        q: '5. Comment calcule-t-on et interprète-t-on l\'Indice d\'Obstacle ($I_O = T_{\\text{haies}} - T_{\\text{plat}}$) en évaluation EPS ?',
        a: 'Pour une même distance (ex. 60 m), on soustrait le temps sur 60 m plat du temps sur 60 m haies (4 haies). Plus cet écart ($\\Delta T$) est faible (autour de $1,0\\text{ s}$ à $1,4\\text{ s}$), plus la technique de franchissement de l\'élève est rasante et fluide (conservation de la vitesse horizontale).'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Course de Haies (Collège & Lycée) · Sécurité et Rythme Inter-Obstacles au Maroc',
      reality: 'La règle de sécurité numéro 1 que je martèle à mes stagiaires CRMEF : sur un plateau d\'EPS, dès qu\'un élève termine son passage de haies et revient en trottinant vers le départ, il a le réflexe dangereux de vouloir « sauter une haie en sens inverse » pour s\'amuser — et c\'est la fracture du poignet assurée car la haie ne bascule pas à l\'envers !',
      tip: 'J\'instaure deux règles d\'or dès la 1re minute du cycle : 1) Retour obligatoire par les couloirs extérieurs de dégagement (franchir une haie à l\'envers = 0/20 immédiat en sécurité) ; 2) Pour empêcher les élèves de sauter en cloche (« saut de cabri »), je place une latte plate en mousse au sol à 1,80 m DEVANT la haie (zone d\'impulsion éloignée) et une autre à 1,00 m DERRIÈRE la haie (zone de reprise active) : l\'élève entend immédiatement au bruit de son appui s\'il a « griffé » derrière la haie.'
    }
  },

  // ============================================================================
  // 4. COURSE DE DEMI-FOND, FOND & MARATHON (800m, 1500m, 3000m, 5000m, 10000m, MARATHON & BAC EPS)
  // ============================================================================
  {
    id: 'athletisme-fond-marathon',
    slug: 'reglement-course-fond-1500m-3000m-5000m-marathon-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Course de Demi-Fond, Fond & Marathon (800m, 1500m, 3000m, 5000m, 10 000m & Marathon 42,195 km)',
    shortTitle: 'Règlement Demi-Fond, Fond (1500m, 3000m, 5000m) & Marathon',
    title: 'Règlement Officiel des Courses de Demi-Fond, Fond & Marathon (800m, 1500m, 3000m, 5000m, 42,195 km — World Athletics 2026), Départ Debout, Rabattement & PDF | ProfEPS',
    metaDesc: 'Règlement complet des courses de demi-fond, fond et marathon (800m, 1000m Bac Maroc, 1500m, 3000m, 5000m, 10000m et Marathon 42,195 km) conforme à World Athletics 2026 : départ debout à 1 seul commandement (« À vos marques ! »), ligne de rabattement, compte-tours, ravitaillement et PDF.',
    badge: '🏃‍♂️ Règlement Officiel World Athletics 2026 · 800m / 1500m / 3000m / 5000m / Marathon',
    federation: 'World Athletics (RT 16, 17, 55) / CAA / FRMA (Fédération Royale Marocaine d\'Athlétisme)',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 16, 17 & 55)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '29 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques World Athletics 2026 (Demi-Fond, Fond & Route RT 55 — PDF)',
        org: 'World Athletics — Book of Rules (Technical Rules & Road Races)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règles officielles des courses hors couloirs (800m à 10 000m) et des courses sur route (RT 55 : 10 km, Semi-Marathon et Marathon 42,195 km).'
      },
      {
        label: 'Fédération Royale Marocaine d\'Athlétisme (FRMA — Demi-Fond, Cross & Route)',
        org: 'FRMA Maroc',
        url: 'https://frma.ma/',
        note: 'Règlements nationaux du demi-fond, du cross-country et des marathons internationaux au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel d'une piste d'athlétisme 400m montrant les lignes de départ en involute du 1500m, 3000m, 5000m et le rabattement du 800m">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Piste de 400m-->
        <rect x="65" y="45" width="670" height="245" rx="122" ry="122" fill="#b91c1c" stroke="#ffffff" stroke-width="3.5"/>
        <rect x="120" y="100" width="560" height="135" rx="67" ry="67" fill="#15803d" stroke="#ffffff" stroke-width="3"/>
        <!--Ligne d'arrivée (en haut à droite)-->
        <line x1="590" y1="45" x2="590" y2="100" stroke="#fde047" stroke-width="5"/>
        <!--Départ du 1500m (3 tours 3/4 : entrée de la ligne droite opposée, à 300m de l'arrivée)-->
        <path d="M 210 235 Q 225 262 248 290" stroke="#fde047" stroke-width="4" fill="none"/>
        <!--Départ du 3000m & 5000m (à 200m de l'arrivée : entrée du 2e virage)-->
        <path d="M 590 235 Q 608 262 630 290" stroke="#38bdf8" stroke-width="4" fill="none"/>
        <!--Ligne de rabattement du 800m (sortie du 1er virage en bas à gauche)-->
        <path d="M 210 235 Q 195 262 175 290" stroke="#4ade80" stroke-width="3.5" stroke-dasharray="5,4" fill="none"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="45" y="310" width="230" height="132" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="285" y="310" width="230" height="132" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="525" y="310" width="230" height="132" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">DEMI-FOND (800m, 1500m, 3000m), FOND (5000m, 10 000m) &amp; MARATHON (42,195 km)</text>
          <text x="590" y="38" fill="#fde047">Arrivée + Départ 800m / 10 000m</text>
          <text x="315" y="224" fill="#fde047">Départ 1500 m (3 tours + 300 m)</text>
          <text x="520" y="224" fill="#38bdf8">Départ 3000 m (7,5 tours) &amp; 5000 m (12,5 tours)</text>
          <text x="275" y="130" fill="#4ade80">Ligne de rabattement 800 m (après 100 m en couloirs)</text>
          <text x="400" y="168" fill="#ffffff" font-size="12">🔔 Cloche officielle : sonnée à l'entame du DERNIER TOUR (400 m restants) pour chaque coureur</text>
          <!--Boîtes du bas-->
          <text x="160" y="334" fill="#fde047" font-size="12">🧍 DÉPART DEBOUT (RT 16.3)</text>
          <text x="160" y="355" font-weight="600">• Dès le 800 m : DÉPART DEBOUT</text>
          <text x="160" y="374" font-weight="600">• 1 SEUL commandement vocal :</text>
          <text x="160" y="393" font-weight="600">  « À vos marques ! » → Coup de feu</text>
          <text x="160" y="412" font-weight="600">• PAS de « Prêts ! », PAS de blocks</text>
          <text x="160" y="431" font-weight="600">• Interdit de toucher le sol (mains)</text>
          <text x="400" y="334" fill="#38bdf8" font-size="12">🔄 NOMBRE DE TOURS (PISTE 400m)</text>
          <text x="400" y="355" font-weight="600">• 800 m = 2 tours · 1000 m Bac = 2,5 t</text>
          <text x="400" y="374" font-weight="600">• 1500 m = 3 tours ¾ (3t + 300 m)</text>
          <text x="400" y="393" font-weight="600">• 3000 m = 7 tours ½ (7t + 200 m)</text>
          <text x="400" y="412" font-weight="600">• 5000 m = 12 tours ½ · 10 000 m = 25 t</text>
          <text x="400" y="431" font-weight="600">• Départ en groupes si &gt; 12 coureurs</text>
          <text x="640" y="334" fill="#4ade80" font-size="12">🏅 MARATHON (42,195 km — RT 55)</text>
          <text x="640" y="355" font-weight="600">• Distance exacte : 42 km et 195 m</text>
          <text x="640" y="374" font-weight="600">• Semi-Marathon : 21,0975 km</text>
          <text x="640" y="393" font-weight="600">• Postes ravitaillement tous les 5 km</text>
          <text x="640" y="412" font-weight="600">• Ravitaillement hors poste = DQ</text>
          <text x="640" y="431" font-weight="600">• Pente globale max : 1 m / km (0,1%)</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Demi-Fond vs Fond vs Route', 'Demi-fond : 800 m (2 tours), 1000 m (2,5 tours — épreuve reine du Bac Garçons Maroc), 1500 m (3 tours ¾), 3000 m (7,5 tours) · Fond sur piste : 5000 m (12,5 tours), 10 000 m (25 tours) · Route (RT 55) : 10 km, Semi-Marathon (21,0975 km), Marathon (42,195 km)', 'En EPS Maroc : Course en durée (VMA) + Barème national Bac 600m/800m (Filles) et 1000m (Garçons)'],
      ['Le Départ Debout & l\'Unique Commandement (RT 16.3)', 'Dans toutes les courses strictement supérieures à 400 m (à partir du 800 m inclus), les starting-blocks sont interdits : le départ est DEBOUT avec UN SEUL commandement vocal : « À vos marques ! » suivi du coup de feu', 'À « À vos marques ! », aucun coureur n\'a le droit de toucher le sol avec la ou les mains !'],
      ['Spécificité du 800 m : 1er Virage en Couloirs (RT 17.5)', 'Le 800 m démarre en couloirs décalés pour le 1er virage uniquement (100 premiers mètres). À la sortie du 1er virage, les coureurs franchissent la ligne arquée de rabattement (marquée par des cônes verts) et se rabattent à la corde', 'Se rabattre à la corde AVANT la ligne de rabattement des 100 m entraîne la disqualification !'],
      ['Lignes de Départ en Involute & Départ en 2 Groupes (RT 17.5)', 'Pour les 1500 m, 3000 m, 5000 m et 10 000 m, la ligne de départ est courbe (« en involute ») afin que les coureurs placés à l\'extérieur aient exactement la même distance jusqu\'à l\'entrée du virage', 'S\'il y a plus de 12 athlètes (5000m/10000m), ils peuvent être divisés en 2 groupes : ~65% à la corde et ~35% sur une 2e ligne décalée dans la moitié extérieure de la piste pendant le 1er virage'],
      ['La Lice Intérieure & Sortie de Piste (RT 17.2 & 17.6)', 'La piste est bordée à l\'intérieur par une lice (bordure de 5 cm de haut et 5 cm de large). Marcher sur ou à gauche de la lice en virage est interdit et entraîne la disqualification (sauf bousculade subie)', 'Si un coureur quitte volontairement la piste en cours d\'épreuve (abandon), il n\'a plus le droit de reprendre la course'],
      ['Le Marathon (42,195 km) & Ravitaillement (RT 55)', 'Distance officielle immuable depuis les JO de Londres 1908 (homologuée en 1921) : 42,195 km · Postes d\'eau et de ravitaillement tous les 5 km (et postes d\'épongeage/eau intermédiaires tous les 2,5 km si > 5 km)', 'Un marathonien qui prend un ravitaillement en dehors des postes officiels (ou se fait accompagner par un entraîneur à vélo) s\'expose à la disqualification (Carton Jaune puis Rouge RT 55.8)']
    ],
    lawsSummary: [
      {
        title: 'Le Protocole du Départ Debout à partir du 800 m (Règle Technique 16.3)',
        content: 'C\'est une règle fondamentale en arbitrage d\'athlétisme et aux examens professionnels : dès que la distance dépasse 400 m (donc pour le 800 m, 1000 m, 1500 m, 3000 m, 5000 m, 10 000 m et Marathon), on n\'utilise JAMAIS de starting-blocks et le starter ne prononce JAMAIS le mot « Prêts ! ». Le protocole comporte un seul commandement vocal : « À vos marques ! ». Les coureurs s\'avancent jusqu\'à la ligne de départ courbe (sans la toucher avec les pieds) et s\'immobilisent debout, jambes fléchies, sans toucher le sol avec les mains. Dès que tous les coureurs sont immobiles, le starter tire le coup de feu.'
      },
      {
        title: 'Le Calcul Exact des Départs sur Piste de 400 m (800m, 1500m, 3000m, 5000m, 10 000m)',
        content: 'En athlétisme sur piste (tour de 400 m à la corde), la ligne d\'arrivée est TOUJOURS fixe (à la fin de la première ligne droite) ; c\'est la ligne de départ qui change selon la distance : 1) 800 m (2 tours) et 10 000 m (25 tours) : départ au niveau de la ligne d\'arrivée ; 2) 1500 m (3 tours et 3/4, soit $3 \\times 400 + 300\\text{ m}$) : départ au début de la ligne droite opposée (à 300 m de l\'arrivée) ; 3) 1000 m Bac Maroc (2 tours et 1/2), 3000 m (7 tours et 1/2) et 5000 m (12 tours et 1/2) : départ à 200 m de l\'arrivée (à la sortie de la ligne droite opposée / entrée du 2e virage). Un juge compte-tours affiche le nombre de tours restants et fait sonner la cloche à l\'entame du dernier tour de chaque coureur.'
      },
      {
        title: 'Règles de Course en Peloton (Bousculade, Lice) et Spécificités du Marathon (RT 17 et RT 55)',
        content: 'En course en peloton (hors couloirs), tout athlète qui bouscule, coudoie ou fait obstruction à un autre coureur de manière à gêner sa progression s\'expose à la disqualification (RT 17.1). De même, couper à l\'intérieur de la lice en virage (sauf s\'il y a été poussé par un adversaire et sans gain d\'avantage matériel) est sanctionné. Sur route et au Marathon (42,195 km — RT 55), le parcours est mesuré par le « chemin le plus court possible » (méthode du vélo calibré Jones Counter avec facteur de sécurité de +0,1 %). Pour qu\'un record du monde sur route soit homologué, le dénivelé négatif entre le départ et l\'arrivée ne doit pas dépasser 1 mètre par kilomètre (soit 42 m max sur un marathon) et la distance à vol d\'oiseau entre le départ et l\'arrivée ne doit pas excéder 50 % de la distance de la course (pour éviter un vent de dos permanent).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Starter 1',
        name: 'Commandement Unique « À vos marques ! » (Départ Debout > 400 m)',
        when: 'Au départ du 800 m, 1000 m, 1500 m, 3000 m, 5000 m, 10 000 m et Marathon.',
        how: 'Les coureurs se placent à 3 m derrière la ligne. Au commandement « À vos marques ! », ils s\'approchent de la ligne et s\'immobilisent debout ; le starter lève le bras et tire dès l\'immobilité complète.',
        svgType: 'one_arm_up'
      },
      {
        code: 'World Athletics · Piste 2',
        name: 'Juge de Rabattement aux 100 m (Drapeau Vert / Jaune au 800 m)',
        when: 'À la sortie du 1er virage du 800 m (ligne arquée de rabattement).',
        how: 'Le commissaire vérifie que chaque coureur de 800 m franchit la ligne de rabattement dans son propre couloir avant de plonger vers la corde (Drapeau Jaune en cas de rabattement anticipé).',
        svgType: 'point_horizontal'
      },
      {
        code: 'World Athletics · Compte-Tours 3',
        name: 'Cloche du Dernier Tour (400 m Restants — RT 18.9)',
        when: 'Lorsqu\'un coureur (le leader, puis chaque concurrent y compris les doublés) entame son dernier tour de piste.',
        how: 'Le juge aux tours change le panneau afficheur sur « 1 » et agite vigoureusement la CLOCHE au passage du coureur.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Piste 4',
        name: 'Drapeau Jaune : Empiètement à l\'Intérieur de la Lice ou Bousculade (RT 17.1-17.2)',
        when: 'Un coureur pose un ou plusieurs appuis à gauche de la lice en virage ou bouscule un adversaire dans le peloton.',
        how: 'Le commissaire de virage lève son DRAPEAU JAUNE et consigne le numéro de dossard et la nature exacte de l\'infraction pour le Juge-Arbitre.',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'World Athletics · Route 5',
        name: 'Carton Jaune puis Carton Rouge en Course sur Route / Marathon (RT 55.8)',
        when: 'Prise de ravitaillement hors zone officielle ou aide illicite (accompagnateur à vélo) sur Marathon.',
        how: 'L\'arbitre de course sur route montre un Carton Jaune d\'avertissement (1re infraction) puis le Carton Rouge de disqualification en cas de récidive.',
        svgType: 'card_up'
      }
    ],
    epsAdaptationTable: [
      ['Course en Durée vs Demi-Fond Bac Maroc', 'Chrono sec sur 1500m / 5000m en compétition fédérale', 'En EPS Maroc (OP 2007/2009) : 1) En cycle d\'apprentissage (Course en durée) : travail par groupes de VMA (90 % à 105 % VMA) avec évaluation conjointe de la performance et de la RÉGULARITÉ (écart ≤ 2s à 3s par tour par rapport au projet d\'allure) · 2) À l\'examen du Bac : 1000 m (Garçons) et 600 m ou 800 m (Filles)', 'Transforme une course subie (« partir en sprint et finir en marchant ») en une gestion énergétique consciente et régulée'],
      ['Dispositif du Binôme Coureur / Chronométreur-Compte-Tours', 'Tableau électronique de compte-tours', 'Chaque coureur sur la piste est associé à un élève-observateur placé à la ligne de départ/arrivée qui tient une fiche de suivi tour par tour : il lui annonce son temps de passage à chaque tour de 200m/250m (« +2s trop rapide, relâche ! » ou « Pile dans ton contrat ! »)', 'Garantit 100 % d\'engagement cognitif des élèves qui ne courent pas'],
      ['Sécurité & Récupération Active', 'Arrêt libre après la ligne d\'arrivée', 'Interdiction formelle de s\'asseoir ou de s\'allonger par terre après la ligne d\'arrivée du 1000 m ou du test VMA : couloir de marche obligatoire de 3 minutes mains sur les hanches ou derrière la nuque', 'Évite le malaise vagal par chute brutale du retour veineux après un effort lactique/aérobie maximal']
    ],
    crmefQuestions: [
      {
        q: '1. Où se situent exactement les lignes de départ du 800 m, du 1000 m, du 1500 m, du 3000 m, du 5000 m et du 10 000 m sur une piste standard de 400 m ?',
        a: 'La ligne d\'arrivée étant toujours fixe à la fin de la 1re ligne droite : • 800 m (2 tours) et 10 000 m (25 tours) : départ sur la ligne d\'arrivée ; • 1000 m (2,5 tours), 3000 m (7,5 tours) et 5000 m (12,5 tours) : départ à 200 m de l\'arrivée (entrée du 2e virage) ; • 1500 m (3,75 tours = 3 tours + 300 m) : départ à 300 m de l\'arrivée (entrée de la ligne droite opposée).'
      },
      {
        q: '2. Quelle est la distance exacte du Marathon et d\'où vient ce chiffre de 42,195 km ?',
        a: 'La distance officielle du Marathon est de 42 kilomètres et 195 mètres (42,195 km, et 21,0975 km pour le Semi-Marathon). Elle provient des Jeux Olympiques de Londres en 1908, où la course reliait le château de Windsor à la loge royale du stade de White City (soit 26 miles et 385 yards), avant d\'être définitivement standardisée par l\'IAAF en 1921.'
      },
      {
        q: '3. Pourquoi n\'y a-t-il qu\'un seul commandement vocal (« À vos marques ! ») à partir du 800 m et pourquoi est-il interdit de toucher le sol avec les mains ?',
        a: 'Selon la Règle Technique 16.3, les courses de plus de 400 m ne se courent pas en explosion anaérobie alactique dans des starting-blocks, mais avec un départ debout en peloton (ou en couloirs sur 100 m au 800 m). Le commandement « Prêts ! » est donc supprimé, et poser une main au sol est interdit pour éviter qu\'un coureur en déséquilibre quadrupédique ne soit piétiné au départ par le peloton.'
      },
      {
        q: '4. Quelles sont les filières énergétiques prédominantes sur un 800 m, un 1500 m, un 5000 m et un Marathon ?',
        a: '• 800 m (~1 min 41 à 2 min 15) : mixte Anaérobie Lactique (~40 %) / Aérobie (~60 %) à ~115-120 % de la VMA ; • 1500 m (~3 min 26 à 4 min 30) : prédominance Aérobie (~75-80 % — Puissance Maximale Aérobie / VO2max à ~105-110 % VMA) + Anaérobie Lactique (~20-25 %) ; • 3000 m : ~98 à 100 % de la VMA (VO2max) ; • 5000 m (~93-95 % VMA) et Marathon (~80-85 % VMA) : filière Aérobie stricte (Capacité Aérobie, oxydation du glycogène et des lipides).'
      },
      {
        q: '5. Sur quelle distance est couru le 800 m en couloirs avant le rabattement à la corde ?',
        a: 'Sur les 100 premiers mètres uniquement (soit le 1er virage). Les coureurs prennent le départ en couloirs décalés et doivent attendre d\'avoir franchi la ligne arquée de rabattement (située à l\'entrée de la ligne droite opposée) pour se rabattre à la corde.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Course en Durée (Collège & Lycée) et Préparation au 1000m / 600m du Baccalauréat EPS au Maroc',
      reality: 'Le jour de l\'évaluation diagnostique du 1000 m (Garçons) ou du 600 m (Filles), 9 élèves sur 10 partent au sprint à 130 % de leur VMA sur les 150 premiers mètres pour « être premier devant les camarades », puis s\'asphyxient dans l\'acidose lactique et finissent en marchant !',
      tip: 'J\'utilise le dispositif des « Plots Sonores de VMA » : je place un plot tous les 50 mètres autour du terrain et je donne un coup de sifflet toutes les X secondes (selon le groupe de VMA). Au 1er tour du 1000 m, tout élève qui dépasse son plot AVANT mon coup de sifflet (excès de vitesse au départ !) perd automatiquement 1 point de maîtrise d\'exécution. Les élèves comprennent dès la 2e séance que courir vite sur 1000 m, c\'est d\'abord refuser de sprinter pendant les 200 premiers mètres.'
    }
  },

  // ============================================================================
  // 5. COURSE DE STEEPLE (3000m STEEPLE, 2000m STEEPLE & FRANCHISSEMENT DE LA RIVIÈRE — RT 23)
  // ============================================================================
  {
    id: 'athletisme-steeple',
    slug: 'reglement-course-steeple-3000m-2000m-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Course de Steeple (3000m Steeple, 2000m Steeple & Rivière)',
    shortTitle: 'Règlement Course de Steeple (3000m & 2000m Steeple)',
    title: 'Règlement Officiel du 3000m Steeple & 2000m Steeple (World Athletics RT 23), 28 Barrières + 7 Rivières, Fosse 3,66m, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet du 3000m Steeple et 2000m Steeple conforme à la Règle Technique 23 World Athletics 2026 : 28 barrières + 7 sauts de rivière (35 obstacles), hauteurs 0,914m H / 0,762m F, dimensions de la fosse d\'eau (3,66m x 3,66m), fautes de franchissement et PDF officiel.',
    badge: '🌊 Règlement Officiel World Athletics RT 23 · 3000m & 2000m Steeple (Spécialité Marocaine)',
    federation: 'World Athletics (Règle Technique 23) / CAA / FRMA (Fédération Royale Marocaine d\'Athlétisme)',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règle Technique 23 — Steeplechase)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '26 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger la Règle Technique 23 (Courses de Steeple World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 23 Steeplechase Races)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règle Technique 23 intégrale : nombre d\'obstacles (28 + 7 au 3000m, 18 + 5 au 2000m), dimensions des barrières fixes (80 à 100 kg) et de la fosse de rivière (3,66 m × 3,66 m).'
      },
      {
        label: 'Fédération Royale Marocaine d\'Athlétisme (FRMA — Discipline Reine du Maroc)',
        org: 'FRMA Maroc',
        url: 'https://frma.ma/',
        note: 'Règlements et palmarès historique du 3000 m steeple marocain (Boulami, Ezzine, El Bakkali).'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel du 3000m Steeple (28 barrières + 7 rivières) et coupe cotée de la fosse de rivière 3,66m x 3,66m">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Piste à gauche : Disposition des 5 obstacles par tour (4 barrières + 1 rivière)-->
        <rect x="40" y="48" width="420" height="235" rx="117" ry="117" fill="#b91c1c" stroke="#ffffff" stroke-width="3.5"/>
        <rect x="90" y="98" width="320" height="135" rx="67" ry="67" fill="#15803d" stroke="#ffffff" stroke-width="2.5"/>
        <!--Virage de la rivière (intérieur ou extérieur)-->
        <rect x="335" y="138" width="46" height="55" rx="6" fill="#0284c7" stroke="#fde047" stroke-width="2.5"/>
        <!--Les 4 barrières sèches sur le tour-->
        <rect x="235" y="44" width="8" height="32" fill="#fde047"/>
        <rect x="38" y="155" width="32" height="8" fill="#fde047"/>
        <rect x="195" y="255" width="8" height="32" fill="#fde047"/>
        <rect x="315" y="255" width="8" height="32" fill="#fde047"/>
        <!--Panneau de droite : Coupe cotée de la Rivière (3,66m x 3,66m)-->
        <rect x="485" y="48" width="275" height="235" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!--Barrière de rivière + fosse d'eau en pente-->
        <line x1="525" y1="125" x2="525" y2="195" stroke="#fde047" stroke-width="6"/>
        <polygon points="528,195 725,195 528,225" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="40" y="305" width="230" height="135" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="285" y="305" width="230" height="135" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="305" width="230" height="135" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">3000 m STEEPLE (RT 23) : 28 BARRIÈRES + 7 SAUTS DE RIVIÈRE = 35 OBSTACLES AU TOTAL</text>
          <text x="240" y="38" fill="#fde047" font-size="10.5">Barrière 4</text>
          <text x="88" y="162" fill="#fde047" font-size="10.5">Barrière 3</text>
          <text x="195" y="248" fill="#fde047" font-size="10.5">Barrière 1</text>
          <text x="315" y="248" fill="#fde047" font-size="10.5">Barrière 2</text>
          <text x="358" y="130" fill="#38bdf8" font-size="11">Rivière (#4)</text>
          <text x="250" y="168" fill="#ffffff" font-size="11">Départ : ~200m sans obstacle puis 7 tours complets</text>
          <!--Coupe de la rivière-->
          <text x="622" y="74" fill="#38bdf8" font-size="12.5">🌊 LA FOSSE DE RIVIÈRE (RT 23.6)</text>
          <text x="622" y="98" font-weight="600">• Carré de 3,66 m × 3,66 m</text>
          <text x="622" y="116" font-weight="600">• Profondeur max au pied : 50 à 70 cm</text>
          <text x="626" y="182" fill="#fde047" font-size="10.5">Longueur = 3,66 m (en pente remontante)</text>
          <text x="622" y="248" font-weight="600" font-size="11">• Autorisé de poser le pied SUR la barrière !</text>
          <text x="622" y="266" font-weight="600" font-size="11">• Autorisé de passer les deux pieds dans l'eau</text>
          <!--Boîtes du bas-->
          <text x="155" y="329" fill="#fde047" font-size="12">🔢 COMPTAGE DES OBSTACLES</text>
          <text x="155" y="350" font-weight="600">• 3000 m Steeple : 28 barrières</text>
          <text x="155" y="369" font-weight="600">  + 7 sauts de rivière = 35 obstacles</text>
          <text x="155" y="388" font-weight="600">• 2000 m Steeple (Jeunes/U18) :</text>
          <text x="155" y="407" font-weight="600">  18 barrières + 5 rivières = 23</text>
          <text x="155" y="426" font-weight="600">• 5 obstacles par tour complet</text>
          <text x="400" y="329" fill="#38bdf8" font-size="12">🪵 LA BARRIÈRE DE STEEPLE</text>
          <text x="400" y="350" font-weight="600">• Hauteur Hommes : 0,914 m (±3mm)</text>
          <text x="400" y="369" font-weight="600">• Hauteur Femmes : 0,762 m (±3mm)</text>
          <text x="400" y="388" font-weight="600">• Largeur : au moins 3,94 m</text>
          <text x="400" y="407" font-weight="600">• Section poutre : 12,7 × 12,7 cm</text>
          <text x="400" y="426" font-weight="600">• Poids lourd fixe : 80 à 100 kg !</text>
          <text x="645" y="329" fill="#f87171" font-size="12">🚫 FAUTES &amp; DROITS (RT 23.7)</text>
          <text x="645" y="350" font-weight="600">• Poser le pied ou la main SUR la</text>
          <text x="645" y="369" font-weight="600">  barrière est 100% AUTORISÉ !</text>
          <text x="645" y="388" font-weight="600">• DQ si : passe à côté de la barrière,</text>
          <text x="645" y="407" font-weight="600">  passe à côté de l'eau, ou jambe</text>
          <text x="645" y="426" font-weight="600">  sous le plan horizontal de la barre</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Les Distances Officielles de Steeple (RT 23.1)', 'Distances standards : 3000 m Steeple (Hommes et Femmes aux JO et Mondiaux) et 2000 m Steeple (Cadets U18 et catégories jeunes)', 'Le Maroc détient une tradition légendaire au 3000 m Steeple (double titre olympique et mondial de Soufiane El Bakkali, record du monde de Brahim Boulami)'],
      ['Nombre Exact d\'Obstacles (RT 23.2 & 23.4)', '3000 m Steeple : 28 franchissements de barrières + 7 sauts de rivière (soit 35 obstacles au total) · 2000 m Steeple : 18 franchissements de barrières + 5 sauts de rivière (soit 23 obstacles au total)', 'Dans un tour complet de steeple, il y a 5 obstacles (4 barrières sèches + la rivière qui est toujours le 4e obstacle du tour). Au 3000 m, les ~200 premiers mètres après le départ ne comportent aucun obstacle'],
      ['Hauteurs & Dimensions de la Barrière (RT 23.3)', 'Hauteur Seniors/U20 Hommes : 0,914 m · Hauteur Cadets (U18) : 0,838 m · Hauteur Toutes Catégories Femmes : 0,762 m · Largeur minimale : 3,94 m · Poids : 80 kg à 100 kg (ne bascule pas !)', 'La poutre supérieure a une section carrée de 12,7 cm × 12,7 cm : les coureurs ont le droit de prendre appui avec le pied dessus'],
      ['Dimensions de la Fosse de Rivière (RT 23.6)', 'Longueur : 3,66 m · Largeur : 3,66 m (barrière fixe de 3,66 m de large placée devant) · Profondeur de l\'eau tout contre la barrière : 50 cm (nouvelle norme) à 70 cm (ancienne norme), remontant en pente douce jusqu\'au niveau de la piste', 'La rivière peut être située à l\'intérieur ou à l\'extérieur du 2e virage (ce qui modifie légèrement le périmètre du tour : ~390 m ou ~410 m)'],
      ['Ce qui est Autorisé au Franchissement (RT 23.7)', 'Tout athlète a le droit de franchir chaque barrière par n\'importe quel moyen (en attaque directe de haie ou en posant un pied ou la main sur le dessus de la poutre de 12,7 cm) et de marcher dans l\'eau ou de sauter par-dessus l\'eau', 'Contrairement aux haies de sprint, les barrières de steeple sont massives (80-100 kg) et partagées par tout le peloton'],
      ['Les 3 Motifs de Disqualification (RT 23.7)', 'Un athlète est disqualifié s\'il : 1) Ne franchit pas une barrière · 2) Passe d\'un côté ou de l\'autre de la rivière (sans passer au-dessus ou dans l\'eau) · 3) Laisse traîner le pied ou la jambe en dessous du plan horizontal du bord supérieur d\'une barrière à l\'instant du franchissement', 'Question piège QCM CRMEF : poser le pied sur la barrière de la rivière est une obligation biomécanique et est 100 % autorisé par la RT 23.7 !']
    ],
    lawsSummary: [
      {
        title: 'Le Décompte Officiel des Obstacles au 3000 m Steeple (28 + 7) et au 2000 m Steeple (18 + 5)',
        content: 'La Règle Technique 23 de World Athletics fixe le décompte exact qui tombe très souvent aux concours (CRMEF, cadres sportifs) : chaque tour complet comporte 5 obstacles répartis régulièrement (dans l\'ordre : 1re barrière, 2e barrière, 3e barrière, 4e obstacle = le saut de la rivière, puis 5e obstacle = la dernière barrière dans la ligne droite d\'arrivée). Sur le 3000 m Steeple, la fraction initiale de ~200 m au départ se court à plat sans obstacle (les barrières ne sont installées qu\'après le premier passage des coureurs), suivie de 7 tours complets comportant chacun 4 barrières et 1 rivière : soit $7 \\times 4 = 28$ barrières et $7 \\times 1 = 7$ sauts de rivière (35 obstacles au total). Sur le 2000 m Steeple, l\'épreuve comporte 18 barrières et 5 sauts de rivière (23 obstacles au total), le premier obstacle franchi étant la 3e barrière d\'un tour normal.'
      },
      {
        title: 'Les Caractéristiques Techniques des Barrières (80–100 kg) et de la Fosse de Rivière (3,66 m × 3,66 m)',
        content: 'À la différence des haies de 110 m ou 400 m (qui pèsent 10 kg et basculent sous une poussée de 3,6 kg), les barrières de steeple sont de véritables poutres fixes pesant entre 80 kg et 100 kg, larges d\'au moins 3,94 m, dont la barre supérieure mesure 12,7 cm × 12,7 cm de côté. Leur hauteur est de 0,914 m pour les Hommes et 0,762 m pour les Femmes. Le saut de la rivière (RT 23.6) est constitué d\'une barrière fixe de 3,66 m de large suivie d\'une fosse remplie d\'eau mesurant 3,66 m de long sur 3,66 m de large. La profondeur de l\'eau au pied de la barrière est de 50 cm (sur les stades récents homologués WA) ou 70 cm (stades historiques), avec un fond incliné qui remonte progressivement jusqu\'au niveau de la piste à 3,66 m.'
      },
      {
        title: 'Règles de Franchissement et Fautes Éliminatoires (Règle Technique 23.7)',
        content: 'Chaque coureur doit passer par-dessus ou dans l\'eau à chaque saut de rivière. Il est strictement interdit de contourner une barrière, de passer à gauche ou à droite de la fosse d\'eau, ou de laisser passer son pied ou sa jambe d\'esquive sur le côté de la barrière en dessous du plan horizontal supérieur de la poutre (RT 23.7). Tant que cette règle est respectée, le coureur peut franchir la barrière de n\'importe quelle manière : en attaque directe (« en haie » sans toucher la poutre) ou en posant un pied d\'appui sur le dessus de la poutre (technique systématique sur la barrière de la rivière pour se propulser le plus loin possible vers la sortie de l\'eau).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Steeple 1',
        name: 'Juge à la Rivière : Drapeau Jaune (Pied passant à côté de la fosse d\'eau)',
        when: 'Un coureur contourne la barrière de la rivière ou pose son pied de réception sur la bordure latérale hors de la largeur des 3,66 m.',
        how: 'Le commissaire posté au saut de la rivière lève immédiatement le DRAPEAU JAUNE et note le numéro de dossard pour disqualification (RT 23.7b).',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'World Athletics · Steeple 2',
        name: 'Juge de Barrière : Jambe sous le Plan Horizontal du Sommet (RT 23.7c)',
        when: 'Aux extrémités des barrières de 3,94 m, un coureur fait passer sa jambe de retour sur le côté en dessous du niveau supérieur de la poutre.',
        how: 'Le commissaire signale le passage latéral bas du bras et lève le DRAPEAU JAUNE vers le Juge-Arbitre des courses.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'World Athletics · Steeple 3',
        name: 'Installation Rapide de la 1re et 2e Barrière Après les 200 premiers mètres',
        when: 'Au 3000 m Steeple, dès que le peloton a franchi les 200 premiers mètres à plat.',
        how: 'Le chef d\'équipe du matériel lève le DRAPEAU BLANC une fois que les barrières mobiles sont verrouillées sur la piste avant le retour du peloton.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Steeple 4',
        name: 'Compte-Tours & Cloche des 5 Derniers Obstacles (Dernier Tour)',
        when: 'Lorsque le leader et chaque concurrent entament le 7e et dernier tour complet.',
        how: 'Le juge compte-tours affiche « 1 » et sonne la CLOCHE : il reste alors 4 barrières sèches et le 7e saut de rivière avant l\'arrivée.',
        svgType: 'one_arm_up'
      }
    ],
    epsAdaptationTable: [
      ['Transposition en EPS Maroc (Course d\'Obstacles Longue / Cross-Obstacles)', 'Barrières fixes de 80 kg et fosse d\'eau de 3,66 m', 'En EPS (Collège / Lycée) : création d\'un parcours « Steeple Scolaire / Cross-Obstacles » de 1000 m à 1500 m intégrant par tour : 3 haies basses en mousse (50–60 cm) + 1 « rivière sèche » matérialisée par un tapis plat de 2,50 m derrière une haie basse sur plinthe stable', 'Développe simultanément l\'endurance aérobie (VMA) et l\'adaptation perceptivo-motrice de la foulée en état de fatigue'],
      ['Apprentissage de l\'Appui sur l\'Obstacle (Rivière)', 'Poutre de 12,7 cm de large', 'Utilisation d\'un banc suédois stable ou d\'un plinthe bas précédant un tapis de réception : apprendre aux élèves à poser le pied à plat sur le caisson en conservant le centre de gravité vers l\'avant pour rebondir loin au-delà de la zone « eau »', 'Permet aussi aux élèves moins véloces d\'apprendre la sécurité du franchissement posé']
    ],
    crmefQuestions: [
      {
        q: '1. Combien de barrières et combien de sauts de rivière un athlète franchit-il exactement lors d\'un 3000 m Steeple et d\'un 2000 m Steeple (RT 23) ?',
        a: '• Au 3000 m Steeple : 28 franchissements de barrières et 7 sauts de rivière, soit 35 obstacles au total (7 tours complets à 5 obstacles par tour, après ~200 m initiaux sans obstacle). • Au 2000 m Steeple : 18 franchissements de barrières et 5 sauts de rivière, soit 23 obstacles au total.'
      },
      {
        q: '2. Quelles sont les hauteurs officielles des barrières de steeple pour les Hommes et pour les Femmes, et quelle est leur différence fondamentale avec une haie de 110 m ?',
        a: 'La hauteur est de 0,914 m pour les Hommes (0,838 m en Cadets U18) et de 0,762 m pour les Femmes. Contrairement à une haie de couloir (large de 1,20 m et légère de 10 kg qui bascule au moindre choc), la barrière de steeple mesure au moins 3,94 m de large, pèse entre 80 et 100 kg (elle est fixe et ne bascule pas) et possède une poutre supérieure de 12,7 cm × 12,7 cm sur laquelle il est autorisé de poser le pied.'
      },
      {
        q: '3. Quelles sont les dimensions exactes de la fosse de rivière au steeple (RT 23.6) ?',
        a: 'La fosse d\'eau est un carré de 3,66 mètres de long sur 3,66 mètres de large, précédé d\'une barrière fixe de 3,66 m de large. La profondeur de l\'eau tout contre la barrière est de 50 cm (nouvelle norme World Athletics) à 70 cm, et le fond remonte en pente régulière jusqu\'au niveau de la piste à l\'extrémité des 3,66 m.'
      },
      {
        q: '4. Quel est l\'ordre de placement de la rivière parmi les 5 obstacles d\'un tour de piste au 3000 m Steeple ?',
        a: 'Selon la Règle Technique 23.2, le saut de la rivière est TOUJOURS le 4e obstacle de chaque tour complet (situé dans le deuxième virage, avant la 5e et dernière barrière placée dans la ligne droite d\'arrivée).'
      }
    ],
    fieldExperience: {
      context: '📍 Séances de Cross-Obstacles & Culture Athlétique Marocaine (Hommage à l\'École Marocaine du 3000m Steeple)',
      reality: 'Au Maroc, dès qu\'on prononce les mots « 3000 m Steeple » ou « Soufiane El Bakkali » devant une classe de collège ou de lycée, les yeux des élèves s\'illuminent ! C\'est le levier motivationnel le plus puissant pour faire aimer les courses de demi-fond à des élèves qui détestent tourner en rond sur une piste nue.',
      tip: 'Lors de mon cycle de course en durée, je consacre toujours la séance 5 au « Défi El Bakkali (2000m Steeple Scolaire en Relais Duo) » : sur le tour de terrain de 250 m, j\'installe 3 obstacles bas en mousse (40 cm) et 1 « zone rivière » (2 lattes espacées de 2 mètres à franchir d\'un bond après un appui sur un step stable). Les élèves apprennent ainsi à relancer leur foulée immédiatement après la réception sans casser leur rythme respiratoire.'
    }
  },

  // ============================================================================
  // 6. LANCER DU POIDS (WORLD ATHLETICS RT 32 & 33 + ÉPREUVE BAC EPS MAROC)
  // ============================================================================
  {
    id: 'athletisme-lancer-poids',
    slug: 'reglement-lancer-poids-athletisme-bac-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Lancer du Poids (Cercle Ø 2,135m, Butoir & Barème Bac EPS Maroc)',
    shortTitle: 'Règlement Lancer du Poids (3kg, 4kg, 5kg, 7,26kg & Bac)',
    title: 'Règlement Officiel du Lancer du Poids (World Athletics RT 32 & 33), Cercle 2,135m, Secteur 34,92°, Masses (3kg à 7,26kg), Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Lancer du Poids conforme aux Règles Techniques 32 et 33 World Athletics 2026 et au Bac EPS Maroc : cercle 2,135m, butoir 10cm, secteur 34,92°, masses officielles (3kg, 4kg, 5kg, 6kg, 7,260kg), sortie arrière, drapeaux des juges et PDF.',
    badge: '☄️ Règlement Officiel World Athletics RT 32-33 · Lancer du Poids & Bac EPS Maroc',
    federation: 'World Athletics (Règles Techniques 32 & 33) / CAA / FRMA & MENPS Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 32 & 33)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '28 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques 32 & 33 (Lancer du Poids World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 32 General Throwing Rules & RT 33 Shot Put)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règles Techniques 32 et 33 complètes : dimensions du cercle (2,135 m), du butoir (10 cm de haut, 1,21 m de long), secteur de 34,92°, masses et diamètres des poids.'
      },
      {
        label: 'Orientations Pédagogiques & Barèmes Nationaux du Lancer du Poids au Baccalauréat (Maroc)',
        org: 'Portail ProfEPS Maroc — OP 2007 (Lycée) & OP 2009 (Collège)',
        url: 'orientations-pedagogiques-eps-maroc.html',
        note: 'Grilles de notation officielles Produit + Processus au lancer du poids (3 kg / 4 kg / 5 kg) pour le Collège et le Lycée.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'une aire de Lancer du Poids avec cercle de 2,135m, butoir de 10cm, lignes de sortie arrière et secteur de 34,92 degrés">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Secteur de chute en gazon/cendrée (Angle 34,92°)-->
        <polygon points="180,175 730,45 730,305" fill="#15803d" stroke="#ffffff" stroke-width="3.5"/>
        <!--Arcs de distance à 6m, 8m, 10m, 12m, 14m-->
        <path d="M 310 144 Q 332 175 310 206" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="5,4"/>
        <path d="M 430 116 Q 465 175 430 234" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="5,4"/>
        <path d="M 550 88 Q 598 175 550 262" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="6,4"/>
        <path d="M 670 60 Q 730 175 670 290" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="5,4"/>
        <!--Cercle de lancer en béton (Diamètre intérieur = 2,135 m)-->
        <circle cx="180" cy="175" r="68" fill="#64748b" stroke="#ffffff" stroke-width="4"/>
        <!--Ligne médiane partageant la moitié avant et la moitié arrière + prolongements extérieurs de 75 cm-->
        <line x1="180" y1="72" x2="180" y2="278" stroke="#ffffff" stroke-width="3.5"/>
        <!--Zone de sortie arrière autorisée (moitié gauche)-->
        <path d="M 180 107 A 68 68 0 0 0 180 243" fill="rgba(74,222,128,0.28)" stroke="#4ade80" stroke-width="4"/>
        <!--Butoir blanc arqué à l'avant du cercle (hauteur 10 cm, largeur 11,2-30 cm, corde 1,15 m)-->
        <path d="M 236 136 A 68 68 0 0 1 236 214" fill="none" stroke="#fde047" stroke-width="10" stroke-linecap="round"/>
        <!--Impact du poids et mesure passant par le centre du cercle-->
        <circle cx="520" cy="155" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <line x1="180" y1="175" x2="520" y2="155" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5,3"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="40" y="318" width="230" height="124" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="285" y="318" width="230" height="124" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="318" width="230" height="124" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="25" fill="#fde047">AIRE DE LANCER DU POIDS (RT 33) : CERCLE Ø 2,135 m (±5 mm) · BUTOIR 10 cm · SECTEUR 34,92°</text>
          <text x="180" y="62" fill="#ffffff">Ligne médiane (+75 cm dehors)</text>
          <text x="85" y="175" fill="#4ade80">SORTIE ARRIÈRE</text>
          <text x="85" y="192" fill="#4ade80" font-size="10.5">OBLIGATOIRE</text>
          <text x="275" y="178" fill="#fde047" font-size="11">Butoir (H = 10 cm)</text>
          <text x="460" y="142" fill="#38bdf8" font-size="11">Ruban passant par le centre (0 au bord intérieur)</text>
          <text x="580" y="205" fill="#fde047">Angle du secteur : 34,92° (6 m d'ouverture à 10 m)</text>
          <text x="550" y="288" fill="#fca5a5" font-size="11">Lignes blanches de 5 cm EXCLUSES du secteur (toucher la ligne = NUL !)</text>
          <!--Boîtes du bas-->
          <text x="155" y="340" fill="#fde047" font-size="12">⚖️ MASSES PAR CATÉGORIE</text>
          <text x="155" y="361" font-weight="600">• Seniors Hommes : 7,260 kg</text>
          <text x="155" y="380" font-weight="600">• Juniors H (U20) : 6,000 kg</text>
          <text x="155" y="399" font-weight="600">• Cadets (U18) &amp; Bac G : 5,000 kg</text>
          <text x="155" y="418" font-weight="600">• Minimes G &amp; Seniors F : 4,000 kg</text>
          <text x="155" y="435" font-weight="600">• Cadettes / Minimes / Bac F : 3 kg</text>
          <text x="400" y="340" fill="#38bdf8" font-size="12">💪 TECHNIQUE RÉGLEMENTAIRE</text>
          <text x="400" y="361" font-weight="600">• Poids poussé d'UNE SEULE MAIN</text>
          <text x="400" y="380" font-weight="600">• Collé au cou ou sous le menton</text>
          <text x="400" y="399" font-weight="600">• Interdit de descendre la main ou</text>
          <text x="400" y="418" font-weight="600">  de ramener derrière l'épaule</text>
          <text x="400" y="435" font-weight="600">• Intérieur du butoir autorisé</text>
          <text x="645" y="340" fill="#f87171" font-size="12">🚫 LES 5 CAUSES D'ESSAI NUL</text>
          <text x="645" y="361" font-weight="600">1. Poids décollé du cou (« lancé »)</text>
          <text x="645" y="380" font-weight="600">2. Toucher le DESSUS du butoir/cercle</text>
          <text x="645" y="399" font-weight="600">3. Toucher le sol hors du cercle</text>
          <text x="645" y="418" font-weight="600">4. Impact sur/hors ligne de secteur</text>
          <text x="645" y="435" font-weight="600">5. Sortir avant impact ou par l'avant</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Le Cercle de Lancer (RT 32.5)', 'Diamètre intérieur : 2,135 m (± 5 mm) · Jante métallique d\'au moins 6 mm d\'épaisseur peinte en blanc · Surface intérieure en béton, enfoncée de 2,0 cm (± 6 mm) par rapport au sol environnant', 'Deux lignes blanches de 5 cm de large et d\'au moins 75 cm de long sont tracées de chaque côté à l\'extérieur pour délimiter la moitié avant et la moitié arrière'],
      ['Le Butoir (Stop Board — RT 33.2)', 'Construit en bois ou matériau approprié, peint en blanc, en forme d\'arc épousant le bord intérieur avant du cercle · Hauteur : 10,0 cm (± 2 mm) par rapport au niveau intérieur du cercle · Longueur intérieure (corde) : 1,14 m à 1,16 m · Largeur : 11,2 à 30 cm', 'L\'athlète A LE DROIT de toucher la face INTÉRIEURE verticale du butoir et du cercle, mais a l\'interdiction absolue d\'en toucher le DESSUS !'],
      ['Le Secteur de Chute (RT 32.9)', 'Angle d\'ouverture : 34,92 degrés exactement (défini géométriquement de sorte qu\'à 20 m du centre du cercle, l\'écartement entre les deux lignes soit de 12,00 m — soit 6 m à 10 m)', 'Attention (contrairement aux sports collectifs) : les lignes blanches de 5 cm du secteur NE FONT PAS PARTIE du secteur ! Un poids qui touche la ligne est NUL (Drapeau Rouge) !'],
      ['Masses Officielles par Catégorie (RT 33.4 & OP Maroc)', 'Seniors Hommes : 7,260 kg (Ø 110–130 mm) · Juniors H (U20) : 6,000 kg · Cadets H (U18) & Baccalauréat Garçons Maroc : 5,000 kg · Minimes Garçons (Collège) & Seniors/U20 Femmes : 4,000 kg (Ø 95–110 mm) · Cadettes (U18), Minimes Filles & Bac Filles Maroc : 3,000 kg', 'Tableau incontournable des épreuves écrites du CRMEF EPS !'],
      ['Action de Lancer & Gants (RT 32.13 & 33.1)', 'Le poids doit être poussé de l\'épaule d\'une seule main. Au moment où l\'athlète prend place pour commencer son essai, le poids doit toucher ou être très proche du cou ou du menton, et la main ne doit pas s\'abaisser ni reculer derrière le plan des épaules', 'L\'usage de gants est interdit (sauf au marteau), et il est interdit de lier deux doigts ou plus ensemble avec du sparadrap'],
      ['Nombre d\'Essais & Mesure (RT 25 & RT 32.19)', 'Concours à plus de 8 athlètes : 3 essais chacun, puis les 8 meilleurs ont droit à 3 essais supplémentaires (dans l\'ordre inverse du classement) · S\'il y a 8 athlètes ou moins : 6 essais pour tous', 'En EPS / Baccalauréat Maroc : 3 essais par élève (la meilleure performance mesurée au cm inférieur est retenue)']
    ],
    lawsSummary: [
      {
        title: 'La Règle Technique du « Poussé » depuis le Cou / Menton (RT 33.1)',
        content: 'En anglais, l\'épreuve s\'appelle « Shot Put » (pousser le boulet) et non « Shot Throw » : la Règle Technique 33.1 impose que le poids soit poussé depuis l\'épaule avec une seule main. Dès que l\'athlète prend sa position dans le cercle pour débuter son essai (en translation dorsale de type O\'Brien ou en rotation), le poids doit être en contact avec (ou très proche de) son cou ou son menton. Pendant toute la phase d\'élan et de poussée finale, la main ne doit jamais s\'abaisser en dessous de cette position et le poids ne doit jamais être ramené en arrière de la ligne des épaules (le geste de lancer « comme une pierre ou une balle de handball » est immédiatement sanctionné d\'un essai nul — Drapeau Rouge).'
      },
      {
        title: 'Les Limites du Cercle, le Butoir, le Secteur de 34,92° et la Sortie par la Moitié Arrière (RT 32.14 à 32.17)',
        content: 'Un essai est jugé NUL (Drapeau Rouge) dans l\'un des cas suivants : 1) Après être entré dans le cercle et avoir commencé son essai, l\'athlète touche avec une partie quelconque de son corps le DESSUS de la jante métallique, le DESSUS du butoir (10 cm) ou le sol à l\'extérieur du cercle ; 2) Le poids touche lors de son premier impact au sol la ligne blanche de 5 cm délimitant le secteur de 34,92° ou le sol à l\'extérieur de cette ligne ; 3) L\'athlète quitte le cercle AVANT que le poids n\'ait touché le sol ; 4) L\'athlète quitte le cercle autrement que par la MOITIÉ ARRIÈRE (son premier contact avec le dessus de la jante ou le sol à l\'extérieur du cercle doit obligatoirement se situer en arrière des deux lignes blanches latérales de 75 cm). En revanche, l\'athlète a le droit d\'interrompre son essai s\'il est gêné, de poser le poids dans ou hors du cercle, de sortir réglementairement par l\'arrière puis de rentrer à nouveau pour recommencer (tant que son délai de 60 secondes n\'est pas écoulé).'
      },
      {
        title: 'La Procédure Exacte de Mesure au Centimètre Inférieur (RT 32.19 et 32.20)',
        content: 'La mesure de chaque jet valide est effectuée immédiatement après l\'essai : un juge plante le piquet zéro du décamètre sur le bord de l\'empreinte laissée par le poids LE PLUS PROCHE du centre du cercle. Le ruban est tendu de manière à passer exactement par le CENTRE du cercle de lancer (qui se trouve à 1,0675 m du bord intérieur), mais la lecture de la distance est prise sur le BORD INTÉRIEUR de la circonférence du cercle (ou du butoir), arrondie au centimètre inférieur (ex. 11,488 m est enregistré 11,48 m).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Poids 1',
        name: 'Juge Chef au Cercle : Drapeau Blanc (Essai Valide)',
        when: 'Le poids a été poussé depuis le cou, est tombé dans le secteur de 34,92° et le lanceur est sorti en équilibre par la moitié arrière du cercle.',
        how: 'Le chef juge attend que le lanceur ait posé son premier pied hors de la moitié arrière, annonce « Essai valide ! » et lève le DRAPEAU BLANC bras tendu.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Poids 2',
        name: 'Juge Chef au Cercle : Drapeau Rouge (Essai Nul : Poids décollé, Mordu ou Sortie Avant)',
        when: 'Poids décollé du cou (« lancé »), pied sur le dessus du butoir, chute sur la ligne de secteur ou sortie par la moitié avant.',
        how: 'Le chef juge crie « Nul ! », désigne la faute commise (cou, butoir ou sortie) et lève verticalement le DRAPEAU ROUGE.',
        svgType: 'flag_red_foul'
      },
      {
        code: 'World Athletics · Poids 3',
        name: 'Juge à la Chute : Pointage de l\'Empreinte & Drapeau de Secteur',
        when: 'Au moment de l\'impact du poids sur le sol dans le secteur de 34,92°.',
        how: 'Le juge de chute plante la fiche au bord de l\'empreinte le plus proche du cercle ; si le poids touche la ligne blanche de 5 cm, il fait signe au chef juge que l\'essai est hors secteur.',
        svgType: 'point_penalty_down'
      },
      {
        code: 'World Athletics · Poids 4',
        name: 'Drapeau Jaune des 15 Dernières Secondes (Temps d\'Essai : 60 s)',
        when: 'Il ne reste plus que 15 secondes à l\'athlète appelé pour amorcer son lancer.',
        how: 'Le juge au chronomètre lève le DRAPEAU JAUNE et le maintient levé jusqu\'à la fin des 60 secondes imparties.',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'EPS Maroc · Sécurité 5',
        name: 'Commandement de Sécurité EPS : « Personne dans le Secteur / Ramassage au Sifflet »',
        when: 'Organisation matérielle et sécurité absolue lors des séances de lancer du poids en collège et lycée.',
        how: 'L\'enseignant (ou le chef juge) croise les bras pour interdire l\'entrée dans le secteur tant que les 4 lanceurs de la vague n\'ont pas terminé ; un coup de sifflet unique autorise le ramassage en marchant.',
        svgType: 'cross_arms_stop'
      }
    ],
    epsAdaptationTable: [
      ['Barème & Masses au Baccalauréat EPS Maroc', '7,260 kg (Hommes) / 4,000 kg (Femmes) en Seniors World Athletics', 'En EPS Maroc (OP 2009 Collège / OP 2007 Lycée) : • Collège (1AC/2AC/3AC) : 3 kg (Filles) et 4 kg (Garçons) · • Lycée & Baccalauréat : 3 kg ou 4 kg (Filles) et 5 kg (Garçons) · Évaluation sur 20 (ou sur 6 pts dans l\'épreuve athlétique) combinant la distance (Produit) et la chaîne cinétique Jambes-Tronc-Bras (Processus)', 'Adapte l\'engin à la maturation ostéo-articulaire des élèves tout en respectant les standards U18/U16'],
      ['Sécurité Passive & Active d\'Or en EPS', 'Juges dans le secteur en compétition', 'Règle d\'or absolue en EPS et à l\'oral du CRMEF : AUCUN élève ne se trouve jamais dans ni à côté du secteur de chute pendant les lancers ! Tous les élèves attendent derrière une ligne tracée à 4 m EN ARRIÈRE du cercle, et les élèves-juges de mesure se tiennent à l\'extérieur à 2 m des lignes du secteur en regardant le lanceur', 'Zéro accident sur l\'atelier le plus sensible de l\'EPS'],
      ['Progression Didactique du Lancer', 'Rotation ou translation O\'Brien complète', '1) Lancer de face à l\'arrêt (découverte du poussé depuis le cou) → 2) Départ de profil avec vissage/dévissage de la ligne d\'épaules par rapport au bassin → 3) Pas chassé rasant ou sursaut dorsal (O\'Brien) sans perte de contact du poids avec le cou', 'Permet de gagner +1,50 m à +2,50 m grâce à la pré-tension musculaire (chaîne cinétique)']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les masses officielles du poids pour les différentes catégories (Minimes, Cadets, Juniors, Seniors) et pour le Baccalauréat au Maroc ?',
        a: '• Seniors Hommes : 7,260 kg ; • Juniors Hommes (U20) : 6,000 kg ; • Cadets Hommes (U18) & Baccalauréat Garçons au Maroc : 5,000 kg ; • Minimes Garçons (Collège) & Seniors/Juniors Femmes : 4,000 kg ; • Cadettes (U18), Minimes Filles & Baccalauréat Filles : 3,000 kg (ou 4 kg selon l\'académie).'
      },
      {
        q: '2. Quels sont le diamètre intérieur du cercle de lancer du poids, la hauteur du butoir et l\'angle exact du secteur de chute (RT 32 & 33) ?',
        a: 'Le diamètre intérieur du cercle de lancer du poids est de 2,135 mètres (± 5 mm). La hauteur du butoir placé à l\'avant du cercle est de 10 centimètres (± 2 mm). L\'angle d\'ouverture du secteur de chute est de 34,92 degrés (soit un écartement de 6 mètres entre les deux lignes à 10 mètres du centre du cercle).'
      },
      {
        q: '3. Comment trace-t-on géométriquement un secteur réglementaire de 34,92° sur un terrain d\'EPS avec un simple décamètre (sans rapporteur d\'angle) ?',
        a: 'C\'est l\'astuce officielle World Athletics (RT 32.9) : à partir du CENTRE du cercle, on déroule deux rubans de 10,00 mètres vers la zone de chute, et on écarte leurs extrémités de exactement 6,00 mètres (ou bien 20,00 m de rayon et 12,00 m d\'écartement). Le triangle isocèle de côtés $10\\text{ m} - 10\\text{ m} - 6\\text{ m}$ forme automatiquement un angle au sommet de $2 \\times \\arcsin(3/10) = 34,915^\\circ \\approx 34,92^\\circ$ !'
      },
      {
        q: '4. Un élève touche avec sa chaussure la face intérieure verticale du butoir pendant son lancer, puis le poids tombe sur la ligne blanche de 5 cm du secteur : quelles sont les deux décisions du juge ?',
        a: '1) Toucher la face INTÉRIEURE verticale du butoir est 100 % AUTORISÉ (seul le dessus du butoir est interdit) ; 2) En revanche, toucher la ligne blanche de 5 cm du secteur rend l\'essai NUL (Drapeau Rouge), car en lancers athlétiques les lignes délimitant le secteur sont exclues du secteur !'
      },
      {
        q: '5. Quelle est l\'organisation de la chaîne cinétique segmentaire efficace au lancer du poids ?',
        a: 'La transmission des forces s\'effectue du bas vers le haut (proximal → distal) par sommation des vitesses : 1) Poussée-extension de la jambe arrière et blocage ferme de la jambe avant (« levier de blocage ») ; 2) Antéversion-rotation du bassin face à la zone de chute ; 3) Dévissage explosif du tronc (retard des épaules sur le bassin) ; 4) Poussée finale du bras et fouetté des doigts à un angle d\'envol optimal d\'environ $38^\\circ$ à $41^\\circ$.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Lancer du Poids (Collège 3kg/4kg & Lycée/Baccalauréat 3kg/5kg) au Maroc',
      reality: 'En début de cycle, les élèves commettent deux erreurs systématiques : 1) Ils écartent le coude vers le bas et « lancent » le poids comme une balle de baseball (risque d\'entorse du coude et essai nul) ; 2) Ils lancent uniquement avec la force du bras en restant les jambes raides !',
      tip: 'Pour verrouiller le poids contre le cou, je demande à l\'élève de coincer un petit dossard plié (ou sa propre main jusqu\'à l\'instant de la poussée) entre le poids et la base de son oreille/clavicule, avec la consigne « Coude haut derrière le poids ! ». Et pour obliger les élèves à pousser avec les jambes et à lancer haut ($40^\\circ$), je tends une cordelette élastique entre deux poteaux de saut en hauteur à 2,50 m de haut et à 2,50 m devant le cercle : tout poids qui passe SOUS la cordelette ne marque aucun point d\'exécution !'
    }
  },

  // ============================================================================
  // 7. LANCERS DU DISQUE, DU JAVELOT & DU MARTEAU (WORLD ATHLETICS RT 34 À 39)
  // ============================================================================
  {
    id: 'athletisme-lancers-disque-javelot-marteau',
    slug: 'reglement-lancers-disque-javelot-marteau-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Lancers du Disque, du Javelot & du Marteau (RT 34 à 39)',
    shortTitle: 'Règlement Lancers : Disque, Javelot & Marteau',
    title: 'Règlement Officiel des Lancers : Disque, Javelot & Marteau (World Athletics RT 34-39), Cercle 2,50m, Piste 4m, Secteurs 34,92° / 28,96° & PDF | ProfEPS',
    metaDesc: 'Règlement complet des lancers du Disque, du Javelot et du Marteau conforme aux Règles Techniques 34 à 39 World Athletics 2026 : cercle disque 2,50m, marteau 2,135m, piste javelot 4m (arc R=8m, secteur 28,96°), masses par catégorie, pointe en premier, drapeaux des juges et PDF.',
    badge: '🥏 Règlement Officiel World Athletics RT 34-39 · Disque, Javelot & Marteau',
    federation: 'World Athletics (Règles Techniques 34 à 39) / CAA / FRMA Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 34 à 39)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '29 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques 34 à 39 (Disque, Marteau & Javelot World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 34-35 Discus, RT 36-37 Hammer, RT 38-39 Javelin)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Spécifications officielles des engins, des cages de sécurité, des cercles (2,50 m et 2,135 m), de la piste de javelot (arc de rayon 8 m) et des règles de validité.'
      },
      {
        label: 'Guide Officiel des Juges de Lancers Longs (FFA / World Athletics)',
        org: 'FFA / Commission Nationale des Officiels',
        url: 'https://www.athle.fr/asp.net/main.html/html.aspx?htmlid=125',
        note: 'Tableaux récapitulatifs des masses d\'engins par catégorie d\'âge et règles de sécurité des lancers longs.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma comparatif officiel des aires de lancer du Disque (cercle 2,50m), du Marteau (cercle 2,135m) et du Javelot (piste 4m, arc R=8m, secteur 28,96 degrés)">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Moitié Gauche : Disque (Ø 2,50 m) & Marteau (Ø 2,135 m) en Cage + Secteur 34,92°-->
        <rect x="35" y="45" width="355" height="255" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <polygon points="115,175 370,85 370,265" fill="#15803d" stroke="#ffffff" stroke-width="2.5"/>
        <!--Cage de sécurité en U-->
        <path d="M 165 110 A 65 65 0 1 0 165 240" fill="none" stroke="#fde047" stroke-width="4" stroke-dasharray="6,4"/>
        <!--Cercle Disque 2,50 m + Cercle concentrique Marteau 2,135 m-->
        <circle cx="115" cy="175" r="42" fill="#64748b" stroke="#ffffff" stroke-width="3"/>
        <circle cx="115" cy="175" r="32" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="4,3"/>
        <line x1="115" y1="120" x2="115" y2="230" stroke="#ffffff" stroke-width="2.5"/>
        <!--Moitié Droite : Piste de Javelot (Largeur 4 m · Arc R = 8 m · Secteur 28,96°)-->
        <rect x="410" y="45" width="355" height="255" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <polygon points="505,175 748,95 748,255" fill="#15803d" stroke="#ffffff" stroke-width="2.5"/>
        <!--Couloir d'élan du Javelot (30 à 36,50 m x 4,00 m)-->
        <rect x="425" y="143" width="135" height="64" fill="#b91c1c" stroke="#ffffff" stroke-width="2.5"/>
        <!--Arc de lancer (Rayon = 8,00 m, bande blanche de 7 cm) + Prolongements latéraux de 75 cm-->
        <path d="M 555 143 A 85 85 0 0 1 555 207" fill="none" stroke="#fde047" stroke-width="5"/>
        <line x1="555" y1="125" x2="555" y2="143" stroke="#fde047" stroke-width="4"/>
        <line x1="555" y1="207" x2="555" y2="225" stroke="#fde047" stroke-width="4"/>
        <!--Centre des 8 mètres (point O de convergence des lignes du secteur)-->
        <circle cx="490" cy="175" r="4.5" fill="#38bdf8"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="35" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="283" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">LANCERS LONGS (RT 34–39) : DISQUE (Ø 2,50 m) · MARTEAU (Ø 2,135 m) · JAVELOT (PISTE 4 m, ARC R=8 m)</text>
          <!--Annotations Gauche-->
          <text x="212" y="68" fill="#fde047" font-size="12">🥏 DISQUE &amp; 🔨 MARTEAU (EN CAGE)</text>
          <text x="115" y="102" fill="#ffffff" font-size="10.5">Disque : Ø 2,50 m</text>
          <text x="115" y="258" fill="#38bdf8" font-size="10.5">Marteau : Ø 2,135 m (sans butoir)</text>
          <text x="285" y="178" fill="#fde047">Secteur : 34,92°</text>
          <text x="212" y="286" fill="#4ade80" font-size="10.5">Sortie par la moitié arrière APRÈS l'impact au sol</text>
          <!--Annotations Droite-->
          <text x="587" y="68" fill="#38bdf8" font-size="12">avelin · LANCER DU JAVELOT (RT 38–39)</text>
          <text x="488" y="134" fill="#ffffff" font-size="10.5">Piste : 30 à 36,5 m × 4,00 m</text>
          <text x="490" y="192" fill="#38bdf8" font-size="9.5">Centre R=8m</text>
          <text x="595" y="134" fill="#fde047" font-size="10.5">Arc R=8 m (largeur 7 cm)</text>
          <text x="675" y="178" fill="#fde047">Secteur : 28,96° (≈ 29°)</text>
          <text x="587" y="286" fill="#4ade80" font-size="10.5">La pointe métallique DOIT toucher le sol en premier !</text>
          <!--Boîtes du bas-->
          <text x="152" y="338" fill="#fde047" font-size="12">🥏 LANCER DU DISQUE (RT 34)</text>
          <text x="152" y="359" font-weight="600">• Cercle : Ø 2,50 m (le plus grand !)</text>
          <text x="152" y="378" font-weight="600">• Pas de butoir · Cage obligatoire</text>
          <text x="152" y="397" font-weight="600">• Seniors H : 2,000 kg (U20: 1,75kg)</text>
          <text x="152" y="416" font-weight="600">• Cadets U18 : 1,5 kg · Femmes : 1 kg</text>
          <text x="152" y="433" font-weight="600">• Secteur : 34,92° (filet touche = OK)</text>
          <text x="400" y="338" fill="#38bdf8" font-size="12">🔱 LANCER DU JAVELOT (RT 38)</text>
          <text x="400" y="359" font-weight="600">• Tenu à la cordelière (1 seule main)</text>
          <text x="400" y="378" font-weight="600">• Lancé au-dessus de l'épaule</text>
          <text x="400" y="397" font-weight="600">• Interdit de tourner le dos à l'arc !</text>
          <text x="400" y="416" font-weight="600">• Seniors H : 800 g · Femmes : 600 g</text>
          <text x="400" y="433" font-weight="600">• Cadets : 700 g · Cadettes : 500 g</text>
          <text x="647" y="338" fill="#4ade80" font-size="12">🔨 LANCER DU MARTEAU (RT 36)</text>
          <text x="647" y="359" font-weight="600">• Cercle : Ø 2,135 m (= Poids)</text>
          <text x="647" y="378" font-weight="600">• Gant de protection AUTORISÉ</text>
          <text x="647" y="397" font-weight="600">• Tête du marteau peut toucher le</text>
          <text x="647" y="416" font-weight="600">  sol/cercle avant le lancer (OK !)</text>
          <text x="647" y="433" font-weight="600">• Seniors H : 7,260 kg · Femmes : 4 kg</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['Comparatif des Aires de Lancer (RT 32 à 39)', '• Disque : Cercle Ø 2,50 m (± 5 mm) sans butoir · • Marteau : Cercle Ø 2,135 m (± 5 mm) sans butoir (réducteur posé dans le cercle de disque) · • Javelot : Piste d\'élan de 30 m à 36,50 m de long sur 4,00 m de large, terminée par un arc de cercle de 8,00 m de rayon (bande blanche de 7 cm de large)', 'Question QCM CRMEF : la ligne d\'arc du javelot fait 7 cm de large (toutes les autres lignes de piste font 5 cm) !'],
      ['Comparatif des Angles de Secteur', '• Poids, Disque et Marteau : 34,92 degrés (écartement de 6 m à 10 m du centre du cercle) · • Javelot : 28,96 degrés (environ 29° — les deux lignes partent du centre du rayon de 8 m et passent par les intersections de l\'arc avec les lignes de couloir de 4 m)', 'Dans les 4 lancers, les lignes de 5 cm du secteur sont EXCLUES de la zone valide !'],
      ['Masses Officielles du Disque (RT 34)', 'Seniors Hommes : 2,000 kg (Ø 219–221 mm) · Juniors H (U20) : 1,750 kg · Cadets H (U18) : 1,500 kg · Minimes G : 1,200 kg · Seniors/U20/U18 Femmes : 1,000 kg (Ø 180–182 mm) · Minimes F : 0,800 kg', 'Au disque et au marteau, si l\'engin heurte le filet de la cage puis retombe à l\'intérieur du secteur de 34,92° sans qu\'aucune autre faute ne soit commise, l\'essai est VALIDE !'],
      ['Masses & Longueurs du Javelot (RT 38)', 'Seniors/U20 Hommes : 800 g (longueur 2,60 m à 2,70 m) · Cadets H (U18) : 700 g · Minimes G & Seniors/U20 Femmes : 600 g (longueur 2,20 m à 2,30 m) · Cadettes (U18) & Minimes F : 500 g', 'Le javelot se compose de 3 parties : une pointe métallique, un fût et une cordelière de prise'],
      ['Masses & Longueurs du Marteau (RT 36)', 'Seniors Hommes : 7,260 kg (longueur totale 117,5 à 121,5 cm) · Juniors H (U20) : 6,000 kg · Cadets H (U18) : 5,000 kg · Seniors/U20 Femmes : 4,000 kg (longueur 116 à 119,5 cm) · Cadettes (U18) : 3,000 kg', 'Le marteau est le SEUL lancer où le port d\'un gant de cuir lisse (doigts découverts, pouce non attaché) est autorisé (RT 32.13)'],
      ['Validité Spécifique du Javelot (RT 38.1 à 38.6)', '1) Tenu à la cordelière d\'une seule main · 2) Lancé par-dessus l\'épaule ou la partie supérieure du bras lanceur (interdit de le projeter en fronde/rotation !) · 3) Interdiction de tourner complètement le dos à l\'arc avant le lâcher · 4) La pointe métallique doit toucher le sol AVANT toute autre partie du javelot', 'Même si le javelot retombe à plat après que la pointe a touché le sol en premier (sans se planter), l\'essai est 100 % VALIDE !']
    ],
    lawsSummary: [
      {
        title: 'Les Règles Techniques du Lancer du Disque et du Lancer du Marteau en Cage (RT 34 à 37)',
        content: 'Le lancer du disque (cercle de 2,50 m de diamètre) et le lancer du marteau (cercle de 2,135 m de diamètre) s\'effectuent tous deux à l\'intérieur d\'une cage de sécurité en U pour protéger les officiels et les autres athlètes. Trois points réglementaires clés doivent être retenus : 1) Il n\'y a PAS de butoir au disque ni au marteau (le butoir de 10 cm est réservé au seul lancer du poids) ; 2) Si le disque ou le marteau touche ou rebondit sur le filet de la cage après le lâcher mais retombe finalement dans les limites du secteur de 34,92°, le jet est VALIDE (à condition que l\'athlète n\'ait pas mordu le cercle) ; 3) Spécificité exclusive du marteau (RT 36.2) : avant et pendant ses moulinets préliminaires ou ses rotations, le lanceur a le droit de faire toucher la tête du marteau sur le sol à l\'intérieur OU à l\'extérieur du cercle sans que cela soit considéré comme une faute ! En revanche, si le câble du marteau casse pendant la rotation (sans faute du lanceur), un nouvel essai de remplacement lui est accordé.'
      },
      {
        title: 'Les Règles Techniques du Lancer du Javelot (RT 38 et 39) : Cordelière, Épaule, Dos et Pointe',
        content: 'Contrairement aux trois autres lancers qui s\'effectuent en rotation ou translation dans un cercle, le javelot se lance après une course d\'élan rectiligne dans un couloir de 4,00 m de large terminé par un arc de cercle blanc de 7 cm de large (rayon de 8,00 m) prolongé de chaque côté par deux lignes perpendiculaires de 75 cm (largeur 7 cm). Quatre règles techniques gouvernent la validité du geste (RT 38.1) : 1) Le javelot doit obligatoirement être tenu par la cordelière ; 2) Il doit être lancé par-dessus l\'épaule ou la partie supérieure du bras lanceur ; 3) Les styles non orthodoxes (rotation complète façon disque) sont interdits pour des raisons évidentes de sécurité : à aucun moment, jusqu\'à ce que le javelot ait été lâché, l\'athlète ne peut tourner complètement le dos vers l\'arc de lancer ; 4) Pour que l\'essai soit validé, la pointe de la tête métallique doit toucher le sol dans le secteur de 28,96° AVANT toute autre partie du javelot. L\'athlète doit ensuite quitter la piste d\'élan en arrière de l\'arc et de ses prolongements latéraux de 75 cm APRÈS l\'atterrissage du javelot.'
      },
      {
        title: 'Mesure Scientifique au Disque, au Marteau et au Javelot (RT 32.19)',
        content: 'La logique géométrique de la mesure dépend du centre du rayon de l\'aire d\'élan : • Au Disque (R = 1,25 m) et au Marteau (R = 1,0675 m), le ruban est tendu depuis le bord de l\'impact le plus proche en passant par le CENTRE DU CERCLE, et la lecture se fait au bord intérieur de la jante métallique. • Au Javelot, le ruban est tendu depuis le point où la pointe du javelot a touché le sol pour la première fois en passant par le POINT SITUÉ À 8,00 MÈTRES EN ARRIÈRE DE L\'ARC (centre géométrique de l\'arc de rayon 8 m, matérialisé sur la piste), et la lecture se fait sur le bord intérieur de l\'arc blanc de 7 cm !'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Lancers 1',
        name: 'Juge Chef à l\'Arc / au Cercle : Drapeau Blanc (Jet Valide)',
        when: 'L\'engin a atterri dans le secteur (pointe en premier au javelot) et l\'athlète est sorti réglementairement en arrière des lignes de 75 cm après l\'impact.',
        how: 'Le chef juge vérifie le signal du juge de chute, attend la sortie contrôlée de l\'athlète et lève le DRAPEAU BLANC.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Lancers 2',
        name: 'Drapeau Rouge : Javelot à Plat / Queue en Premier ou Mordu sur l\'Arc de 7 cm',
        when: 'Au javelot : la queue ou le fût touche le sol avant la pointe métallique, le lanceur tourne le dos avant de lâcher, ou son pied touche la bande blanche de 7 cm.',
        how: 'Le juge de chute (pour l\'impact à plat) ou le chef juge à l\'arc (pour le mordu/sortie) lève immédiatement le DRAPEAU ROUGE.',
        svgType: 'flag_red_foul'
      },
      {
        code: 'World Athletics · Lancers 3',
        name: 'Geste Technique Non Réglementaire au Javelot (Bras tendu sur le côté / Fronde)',
        when: 'L\'athlète ne lance pas par-dessus l\'épaule ou lâche la cordelière avant la projection.',
        how: 'Le chef juge signale l\'infraction technique (bras écarté) et lève le DRAPEAU ROUGE.',
        svgType: 'arms_wide_out'
      },
      {
        code: 'World Athletics · Lancers 4',
        name: 'Repérage Immédiat du Premier Point d\'Impact de la Pointe (Juge de Chute)',
        when: 'Le javelot touche le sol par la pointe puis glisse ou rebondit sur l\'herbe.',
        how: 'Le juge de secteur pointe du doigt et plante la fiche métallique à l\'endroit exact du PREMIER contact de la pointe avec le sol (et non là où le javelot s\'immobilise !).',
        svgType: 'point_penalty_down'
      }
    ],
    epsAdaptationTable: [
      ['Transposition Sécurisée en EPS Maroc', 'Javelot métallique (600g/800g) et Disque lourd (1kg/2kg)', 'Dans les établissements scolaires marocains (Collège/Lycée) : • Initiation Javelot avec balles lestées à ruban (Vortex / Javelot mousse « Turbojav » de 300 g à 400 g) pour apprendre le chemin de lancement rectiligne et le pas croisé (« hop-step ») · • Initiation Disque avec anneaux de caoutchouc ou disques souples d\'initiation de 600 g à 800 g', 'Permet d\'enseigner la famille des lancers en rotation et en translation longue en toute sécurité sur un terrain scolaire'],
      ['Règle de Transport du Javelot', 'Règles de sécurité des concours', 'Interdiction absolue de renvoyer un javelot ou un disque en le relançant vers la piste d\'élan ! Le javelot est TOUJOURS ramené en marchant, tenu verticalement pointe vers le bas le long du corps', 'Prévention totale des accidents sur le plateau d\'EPS']
    ],
    crmefQuestions: [
      {
        q: '1. Quels sont les diamètres exacts des cercles de lancer et les angles de secteur pour les 4 lancers olympiques (Poids, Disque, Marteau, Javelot) ?',
        a: '• Lancer du Poids : cercle Ø 2,135 m (avec butoir de 10 cm) — secteur 34,92° ; • Lancer du Marteau : cercle Ø 2,135 m (sans butoir, en cage) — secteur 34,92° ; • Lancer du Disque : cercle Ø 2,50 m (sans butoir, en cage) — secteur 34,92° ; • Lancer du Javelot : piste de 4,00 m de large terminée par un arc de cercle de rayon 8,00 m (largeur de ligne 7 cm) — secteur de 28,96° (≈ 29°).'
      },
      {
        q: '2. Quelles sont les masses officielles du Disque, du Javelot et du Marteau pour les Seniors Hommes et les Seniors Femmes ?',
        a: '• Disque : 2,000 kg (Hommes) / 1,000 kg (Femmes) ; • Javelot : 800 g (Hommes) / 600 g (Femmes) ; • Marteau : 7,260 kg (Hommes — exactement comme le poids !) / 4,000 kg (Femmes — exactement comme le poids !).'
      },
      {
        q: '3. Si un javelot ne se plante pas dans le gazon mais que sa pointe métallique effleure l\'herbe un centième de seconde avant que le fût ne retombe à plat, l\'essai est-il valide ?',
        a: 'OUI, l\'essai est 100 % VALIDE ! Selon la Règle Technique 38.5 de World Athletics, il n\'est nullement obligatoire que le javelot reste fiché/planté dans le sol : il suffit que la pointe de la tête métallique touche le sol dans le secteur AVANT toute autre partie du javelot.'
      },
      {
        q: '4. Pourquoi un record du monde de Félix Erausquin (lancer du javelot en rotation en 1956 à plus de 100 m) a-t-il conduit l\'IAAF à modifier la Règle Technique 38 ?',
        a: 'Parce que lancer un javelot en tournant sur soi-même comme un discobole (avec le javelot savonné) rendait la trajectoire latérale totalement incontrôlable et mortellement dangereuse pour le public et les juges. L\'IAAF a donc inscrit dans la RT 38 l\'obligation de tenir la cordelière, de lancer par-dessus l\'épaule et l\'interdiction formelle de tourner le dos à l\'arc de lancer avant le lâcher.'
      }
    ],
    fieldExperience: {
      context: '📍 Séances de Découverte des Lancers (Javelot Mousse / Vortex & Disque Souple) en Collège et ASS au Maroc',
      reality: 'Au lancer du javelot (ou Vortex en 1re AC), les élèves courent de face jusqu\'à la ligne puis s\'arrêtent net les deux pieds joints pour lancer uniquement à la force du coude (en « cassant » le bras comme une catapulte), ce qui annule toute la vitesse de leur course d\'élan !',
      tip: 'J\'enseigne la comptine rythmique des 4 derniers appuis de profil : « GAUCHE - DROITE (pas croisé d\'impulsion, bras lanceur tendu loin derrière à l\'horizontale) - GAUCHE (jambe avant tendue qui bloque sec comme un mur) - FOUETTÉ ! ». Je trace au sol les 2 empreintes du dernier double appui pour que l\'élève sente physiquement le blocage de la jambe gauche qui projette la poitrine et le bras vers l\'avant.'
    }
  },

  // ============================================================================
  // 8. SAUTS HORIZONTAUX : SAUT EN LONGUEUR & TRIPLE SAUT (WORLD ATHLETICS RT 29 & 30 + BAC MAROC)
  // ============================================================================
  {
    id: 'athletisme-sauts-horizontaux',
    slug: 'reglement-saut-longueur-triple-saut-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Sauts Horizontaux : Saut en Longueur & Triple Saut (RT 29 & 30)',
    shortTitle: 'Règlement Saut en Longueur & Triple Saut',
    title: 'Règlement Officiel du Saut en Longueur & Triple Saut (World Athletics RT 29 & 30), Piste 40m, Planche 20cm, Mesure, Jury & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Saut en Longueur et du Triple Saut conforme aux Règles Techniques 29 et 30 World Athletics 2026 et au Bac EPS Maroc : piste d\'élan 40m, planche 20cm (1-3m et 11/13m), cloche-pied/foulée/saut, mesure perpendiculaire, drapeaux des juges et PDF.',
    badge: '🦘 Règlement Officiel World Athletics RT 29-30 · Saut en Longueur & Triple Saut',
    federation: 'World Athletics (Règles Techniques 29 & 30) / CAA / FRMA & MENPS Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 29 & 30)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '29 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques 29 & 30 (Longueur & Triple Saut World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 29 Horizontal Jumps & RT 30 Triple Jump)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règles officielles complètes des sauts horizontaux : piste d\'élan (40 m × 1,22 m), planche d\'appel (20 cm), ligne d\'appel verticale, fosse de sable (2,75 à 3,00 m), vent (+2,0 m/s) et règles du triple saut.'
      },
      {
        label: 'Orientations Pédagogiques & Barèmes du Saut en Longueur au Baccalauréat (Maroc)',
        org: 'Portail ProfEPS Maroc — OP 2007 & OP 2009',
        url: 'orientations-pedagogiques-eps-maroc.html',
        note: 'Grilles d\'évaluation nationales du saut en longueur et du triple saut au Collège et au Lycée au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un sautoir de Saut en Longueur et de Triple Saut avec piste de 40m, planches d'appel de 20cm et fosse de sable">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Piste d'élan (Minimum 40 m x 1,22 m)-->
        <rect x="40" y="135" width="445" height="62" fill="#b91c1c" stroke="#ffffff" stroke-width="3"/>
        <!--Planche de Triple Saut (à 11 m F / 13 m H de la fosse)-->
        <rect x="275" y="135" width="14" height="62" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="289" y1="125" x2="289" y2="207" stroke="#38bdf8" stroke-width="3"/>
        <!--Planche de Saut en Longueur (à 1 m – 3 m de la fosse : 20 cm de large)-->
        <rect x="442" y="135" width="14" height="62" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="456" y1="115" x2="456" y2="217" stroke="#fde047" stroke-width="4"/>
        <!--Fosse de réception en sable humide (Largeur 2,75 m à 3,00 m · Longueur min 7 à 9 m)-->
        <rect x="485" y="102" width="275" height="128" rx="6" fill="#fbbf24" stroke="#ffffff" stroke-width="3.5"/>
        <!--Enchaînement Triple Saut : Cloche-pied (G->G) + Foulée (G->D) + Saut (D->2 pieds)-->
        <path d="M 289 166 Q 332 122 375 166" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="5,3"/>
        <path d="M 375 166 Q 418 122 456 166" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-dasharray="5,3"/>
        <path d="M 456 166 Q 535 95 620 166" fill="none" stroke="#fde047" stroke-width="4"/>
        <!--Trace la plus proche dans le sable et mesure perpendiculaire-->
        <circle cx="602" cy="175" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <circle cx="622" cy="164" r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
        <line x1="456" y1="175" x2="602" y2="175" stroke="#ef4444" stroke-width="3" stroke-dasharray="6,3"/>
        <!--Flèche de sortie obligatoire vers l'avant/côté-->
        <path d="M 622 164 L 685 112" stroke="#15803d" stroke-width="3.5"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="40" y="295" width="230" height="145" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="285" y="295" width="230" height="145" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="295" width="230" height="145" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">SAUTS HORIZONTAUX (RT 29 &amp; 30) : PISTE ≥ 40 m × 1,22 m · PLANCHE 20 cm · FOSSE 2,75 à 3,00 m</text>
          <text x="155" y="124" fill="#ffffff">Piste d'élan : min 40 m (2 marques autorisées)</text>
          <text x="282" y="114" fill="#38bdf8" font-size="11">Planche Triple Saut (13 m H / 11 m F)</text>
          <text x="456" y="102" fill="#fde047" font-size="11">LIGNE D'APPEL Longueur (1 à 3 m de la fosse)</text>
          <text x="332" y="220" fill="#38bdf8" font-size="10.5">1. Cloche-pied (G→G)</text>
          <text x="415" y="220" fill="#4ade80" font-size="10.5">2. Foulée (G→D)</text>
          <text x="535" y="248" fill="#fde047" font-size="11">3. Saut + Mesure PERPENDICULAIRE depuis la trace la plus proche (602)</text>
          <text x="692" y="94" fill="#4ade80" font-size="11">Sortie vers l'avant obligatoire</text>
          <!--Boîtes du bas-->
          <text x="155" y="319" fill="#fde047" font-size="12">📏 LA PLANCHE D'APPEL (RT 29.3)</text>
          <text x="155" y="340" font-weight="600">• Longueur : 1,22 m · Épaisseur : 10 cm</text>
          <text x="155" y="359" font-weight="600">• Largeur planche blanche : 20 cm</text>
          <text x="155" y="378" font-weight="600">• Plan vertical d'appel : bord côté</text>
          <text x="155" y="397" font-weight="600">  fosse (dépasser ce plan = Mordu)</text>
          <text x="155" y="416" font-weight="600">• Distance planche→fin fosse ≥ 10 m</text>
          <text x="400" y="319" fill="#38bdf8" font-size="12">🐇 LE TRIPLE SAUT (RT 30)</text>
          <text x="400" y="340" font-weight="600">• 1er bond (Cloche-pied / Hop) :</text>
          <text x="400" y="359" font-weight="600">  retomber sur le MÊME PIED d'appel</text>
          <text x="400" y="378" font-weight="600">• 2e bond (Foulée / Step) : retomber</text>
          <text x="400" y="397" font-weight="600">  sur l'AUTRE PIED</text>
          <text x="400" y="416" font-weight="600">• 3e bond (Saut / Jump) : dans le sable</text>
          <text x="645" y="319" fill="#f87171" font-size="12">🚫 LES 5 CAUSES D'ESSAI NUL</text>
          <text x="645" y="340" font-weight="600">1. Pied dépasse le plan de la ligne</text>
          <text x="645" y="359" font-weight="600">2. Appel pris en dehors des côtés</text>
          <text x="645" y="378" font-weight="600">3. Appel à 2 pieds ou salto en l'air</text>
          <text x="645" y="397" font-weight="600">4. Toucher le sol hors de la fosse</text>
          <text x="645" y="416" font-weight="600">5. Sortir en reculant derrière sa trace</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['La Piste d\'Élan (RT 29.1)', 'Longueur minimale : 40,00 m (mesurée depuis la ligne d\'appel correspondante) · Largeur : 1,22 m (± 0,01 m) · L\'athlète peut placer au maximum 2 marques repères (fournies par l\'organisation) le long de la piste (pas sur la piste elle-même)', 'En EPS Maroc : élan étalonné de 12 à 18 foulées (20 à 30 m) avec marque de départ précise'],
      ['La Planche d\'Appel & la Ligne d\'Appel (RT 29.3)', 'Planche rectangulaire en bois peinte en blanc : longueur 1,22 m, largeur 20,0 cm (± 2 mm), profondeur 10 cm · Le bord de la planche situé du côté de la fosse de sable constitue la LIGNE D\'APPEL', 'En saut en longueur, la ligne d\'appel est placée entre 1,00 m et 3,00 m du bord proche de la fosse (et à au moins 10 m du bord éloigné de la fosse)'],
      ['Distances de la Planche au Triple Saut (RT 30.2)', 'Compétitions internationales Seniors : au moins 13,00 m du bord proche de la fosse pour les Hommes, et au moins 11,00 m pour les Femmes', 'En compétitions scolaires / EPS Maroc : planches adaptées à 7 m, 9 m et 11 m selon la catégorie (Collège / Lycée)'],
      ['La Fosse de Réception & l\'Anémomètre (RT 29.6 & 29.10)', 'Largeur de la fosse : 2,75 m minimum à 3,00 m maximum · Remplie de sable fin humide nivelé exactement à la hauteur de la planche d\'appel', 'Anémomètre placé à 20 m de la ligne d\'appel, enclenché pendant 5 secondes : homologation des records jusqu\'à +2,0 m/s de vent favorable'],
      ['Séquence Obligatoire du Triple Saut (RT 30.1)', '1) Un Cloche-pied (Hop) avec réception sur le MÊME pied que le pied d\'appel (ex. Gauche → Gauche ou Droite → Droite) · 2) Une Foulée bondissante (Step) avec réception sur l\'AUTRE pied (Gauche → Droite) · 3) Un Saut (Jump) avec réception dans la fosse de sable', 'Si pendant le saut la jambe libre (« jambe dormante ») effleure le sol, cela n\'est PAS considéré comme une faute (RT 30.2) !'],
      ['Règle de Mesure Perpendiculaire (RT 29.9)', 'Tous les sauts sont mesurés depuis la marque la plus proche faite dans la fosse par N\'IMPORTE QUELLE partie du corps ou des membres, PERPENDICULAIREMENT à la ligne d\'appel ou à son prolongement', 'Le zéro du décamètre est placé dans le sable (sur la trace la plus proche de la planche) et la lecture est faite sur la ligne d\'appel au cm inférieur']
    ],
    lawsSummary: [
      {
        title: 'La Règle du Plan Vertical de la Ligne d\'Appel et les Infractions (Règle Technique 29.5)',
        content: 'Dans tous les sauts horizontaux (Longueur et Triple saut), l\'impulsion doit obligatoirement être prise sur UN SEUL PIED. Un athlète commet une faute (essai nul — Drapeau Rouge) si : 1) Tandis qu\'il prend son appel, son pied (chaussure) dépasse le PLAN VERTICAL de la ligne d\'appel (qu\'il touche le sol/plastiline au-delà ou non : depuis la réforme World Athletics 2020/2026 contrôlée par caméra vidéo latérale, le simple dépassement du plan vertical au-dessus de la ligne de faute suffit à annuler l\'essai) ; 2) Il prend son appel en dehors des extrémités latérales de la planche (que ce soit devant ou derrière le prolongement de la ligne d\'appel) ; 3) Il exécute une forme quelconque de salto (culbute périlleuse) pendant la course d\'élan ou en l\'air ; 4) Après l\'impulsion, mais avant son premier contact avec la fosse, il touche la piste d\'élan ou le sol à l\'extérieur de la fosse ; 5) En quittant la fosse de réception, son PREMIER contact du pied avec la bordure ou le sol à l\'extérieur est plus proche de la ligne d\'appel que la marque la plus proche laissée dans le sable.'
      },
      {
        title: 'Le Règlement Spécifique du Triple Saut (Règle Technique 30)',
        content: 'Le triple saut consiste en un cloche-pied, une foulée bondissante et un saut, effectués dans cet ordre strict (RT 30.1). Le cloche-pied doit être exécuté de telle façon que l\'athlète retombe d\'abord sur le MÊME pied que celui avec lequel il a pris son appel sur la planche ; dans la foulée bondissante, il doit retomber sur l\'AUTRE pied, sur lequel il prend ensuite son impulsion finale pour atterrir dans le sable. Deux combinaisons sont donc possibles : « Gauche - Gauche - Droite - Réception » ou « Droite - Droite - Gauche - Réception ». Point réglementaire subtil souvent posé au CRMEF (RT 30.2) : il n\'y a PAS faute si l\'athlète, en sautant, touche le sol avec sa jambe « dormante » (jambe libre qui balaye). Par ailleurs, prendre son appel AVANT la planche (sans la toucher) n\'est jamais une faute (mais la mesure reste toujours prise jusqu\'au bord avant de la planche).'
      },
      {
        title: 'Mesure Perpendiculaire et Départage des Ex Aequo en Sauts Horizontaux (RT 25.22 et RT 29.9)',
        content: 'La mesure est toujours prise perpendiculairement à la ligne d\'appel (ou à son prolongement) depuis l\'empreinte la plus proche de la planche laissée dans le sable par n\'importe quelle partie du corps (pieds, fesses, main posée en arrière ou même casquette/lunettes tombées dans le sable si c\'est le point le plus proche !), arrondie au centimètre inférieur. Si deux athlètes réalisent exactement la même meilleure performance au terme du concours (ex. 7,12 m tous les deux), comment les départage-t-on ? Contrairement au saut en hauteur, on compare leur DEUXIÈME meilleure performance du concours (puis leur 3e meilleure performance si nécessaire) !'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Sauts H 1',
        name: 'Juge à la Planche : Drapeau Blanc (Appel Valide & Sortie vers l\'Avant)',
        when: 'Le pied d\'appel n\'a pas dépassé le plan vertical de la ligne d\'appel et le sauteur est sorti de la fosse en avant de sa trace.',
        how: 'Le juge à l\'appel attend que l\'athlète ait franchi le bord de la fosse vers l\'avant, puis lève le DRAPEAU BLANC bras tendu.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Sauts H 2',
        name: 'Juge à la Planche : Drapeau Rouge (Essai Mordu / Salto / Sortie Arrière)',
        when: 'La pointe de la chaussure dépasse la ligne d\'appel (plastiline marquée), l\'élève saute à 2 pieds ou ressort de la fosse en marchant vers l\'arrière.',
        how: 'Le juge crie « Nul ! » et lève immédiatement le DRAPEAU ROUGE verticalement.',
        svgType: 'flag_red_foul'
      },
      {
        code: 'World Athletics · Sauts H 3',
        name: 'Juge à la Fosse : Piquet Zéro sur la Trace la Plus Proche (Main ou Bassin !)',
        when: 'Dès la réception et la sortie réglementaire du sauteur.',
        how: 'Le juge de fosse pointe et maintient la fiche métallique (avec le zéro du décamètre) sur le bord de la trace de sable le plus proche de la planche (souvent la main posée en arrière chez les élèves !).',
        svgType: 'point_penalty_down'
      },
      {
        code: 'World Athletics · Sauts H 4',
        name: 'Juge du Triple Saut : Contrôle de la Séquence « Cloche-pied → Foulée → Saut »',
        when: 'Pendant les 3 bonds successifs du triple saut (RT 30.1).',
        how: 'Le juge placé entre la planche de 11m/13m et la fosse vérifie le rythme « Même pied (G-G) puis Autre pied (D) » ; s\'il effectue une double foulée (G-D-G), il signale l\'infraction au chef juge.',
        svgType: 'point_horizontal'
      },
      {
        code: 'World Athletics · Sauts H 5',
        name: 'Drapeau Jaune des 15 Dernières Secondes & Girouette de Vent',
        when: 'Gestion du temps d\'essai (60 secondes en concours classique) et contrôle de l\'anémomètre (5 secondes).',
        how: 'Le juge chronométreur lève le DRAPEAU JAUNE lorsqu\'il ne reste plus que 15 secondes pour s\'élancer sur la piste des 40 m.',
        svgType: 'flag_side_assistant'
      }
    ],
    epsAdaptationTable: [
      ['La « Zone d\'Appel Élargie » (Mesure Effective) en Collège', 'Planche étroite de 20 cm en compétition', 'En EPS Collège (OP 2009) : remplacement de la planche de 20 cm par une ZONE D\'APPEL DE 60 À 80 CM saupoudrée de talc ou de craie. La mesure est prise depuis l\'empreinte exacte de la pointe du pied d\'appel dans la zone jusqu\'à la réception dans le sable (« mesure effective ») !', 'Libère l\'élève de la hantise du mordu : il garde le regard horizontal et conserve 100 % de sa vitesse d\'élan au lieu de piétiner en baissant la tête'],
      ['Répartition Équilibrée des 3 Bonds au Triple Saut', 'Tendance débutant : grand 1er bond puis écrasement au 2e bond', 'Traçage à la craie sur la piste de zones cibles selon le ratio biomécanique optimal 35 % (Cloche-pied) — 30 % (Foulée) — 35 % (Saut) (ex. pour une cible à 9 m : 3,15 m + 2,70 m + 3,15 m) avec appuis en « griffé actif à plat »', 'Empêche l\'écrasement de la foulée bondissante (2e bond) qui est le défaut majeur en lycée'],
      ['Organisation du Jury d\'Élèves (3 Rôles)', 'Jury fédéral', '1) Élève-Juge d\'Appel (tient les drapeaux Blanc/Rouge et lit les centimètres sur la planche) · 2) Élève-Juge de Fosse (tient le 0 du décamètre sur la trace la plus proche) · 3) Élève-Râtisseur (nivelle le sable après chaque saut)', 'Fonctionnement fluide et sécurisé de l\'atelier']
    ],
    crmefQuestions: [
      {
        q: '1. Quelles sont les dimensions officielles de la planche d\'appel, de la piste d\'élan et de la fosse de réception au saut en longueur (RT 29) ?',
        a: '• Piste d\'élan : longueur minimale de 40,00 m et largeur de 1,22 m (± 0,01 m) ; • Planche d\'appel : longueur 1,22 m, largeur 20 cm (± 2 mm) et épaisseur 10 cm, placée entre 1,00 m et 3,00 m du bord proche de la fosse (et à au moins 10 m du bord éloigné) ; • Fosse de réception : largeur comprise entre 2,75 m et 3,00 m.'
      },
      {
        q: '2. De quel côté du décamètre (ruban) place-t-on le ZÉRO (0 cm) lors de la mesure d\'un saut en longueur ou d\'un lancer du poids ?',
        a: 'Le ZÉRO (0 cm) du décamètre est TOUJOURS placé dans la fosse de sable (ou sur l\'empreinte du poids dans le secteur) au point d\'impact le plus proche de la ligne d\'appel, et la lecture des mètres/centimètres s\'effectue sur la LIGNE D\'APPEL (bord de la planche côté fosse) ou au bord intérieur du cercle !'
      },
      {
        q: '3. Un élève réalise un saut magnifique dont les talons atterrissent à 5,40 m, mais en se redressant il pose une main en arrière dans le sable à 4,85 m, puis sort par le côté de la fosse à 5,10 m : quelle est la décision du juge ?',
        a: '1) L\'essai est VALIDE (Drapeau Blanc) car son premier appui en sortant hors de la fosse (5,10 m) est plus éloigné de la planche que sa trace la plus proche (4,85 m) ; 2) Sa performance retenue est de 4,85 mètres (et non 5,40 m), car on mesure toujours depuis la marque la plus proche de la ligne d\'appel laissée par n\'importe quelle partie du corps.'
      },
      {
        q: '4. Comment départage-t-on deux athlètes ex aequo à la 1re place au saut en longueur (ex. 6,50 m tous les deux) ?',
        a: 'Selon la Règle Technique 25.22 (Concours où le résultat est déterminé par une distance : Longueur, Triple saut, Poids, Disque, Javelot, Marteau), l\'égalité est départagée en comparant la DEUXIÈME meilleure performance des athlètes ex aequo (puis la 3e meilleure performance si l\'égalité persiste).'
      },
      {
        q: '5. Quels sont les 4 facteurs biomécaniques qui déterminent la performance au saut en longueur ?',
        a: '1) La vitesse horizontale en fin de course d\'élan (qui représente ~70 % de la variance de la performance !) ; 2) L\'impulsion verticale sur la planche (création d\'une vitesse verticale par griffé actif et blocage du segment libre genou haut, donnant un angle d\'envol optimal autour de $20^\\circ$ à $22^\\circ$) ; 3) L\'équilibration aérienne (ciseaux, extension ou groupé pour retarder la rotation avant) ; 4) Le ramené des jambes loin devant au-delà de la trajectoire du centre de gravité à l\'atterrissage.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Saut en Longueur & Triple Saut (Collège & Lycée / Baccalauréat EPS) au Maroc',
      reality: 'Au saut en longueur, la moitié des élèves perdent 50 à 70 centimètres sur chaque saut uniquement parce qu\'à la réception dans le sable, ils gardent le buste en arrière et posent les deux mains derrière leurs fesses pour s\'équilibrer !',
      tip: 'Pour automatiser la bascule vers l\'avant à la réception, je place un cône souple jaune au milieu de la fosse à 50 cm devant leur zone d\'atterrissage habituelle avec la consigne : « Dès que vos talons touchent le sable, vos deux bras doivent plonger vers l\'avant pour venir toucher ou dépasser le cône jaune ! ». En une seule séance, plus aucune main ne traîne en arrière et toute la classe gagne un demi-mètre.'
    }
  },

  // ============================================================================
  // 9. SAUTS VERTICAUX : SAUT EN HAUTEUR & SAUT À LA PERCHE (WORLD ATHLETICS RT 26, 27 & 28 + BAC MAROC)
  // ============================================================================
  {
    id: 'athletisme-sauts-verticaux',
    slug: 'reglement-saut-hauteur-perche-athletisme-eps.html',
    relatedArticle: 'article-fiche-seance-athletisme-eps.html',
    relatedCycleCollege: 'cycle-course-duree-college-eps-maroc.html',
    relatedCycleLycee: 'cycle-course-duree-lycee-eps-maroc.html',
    sportName: 'Sauts Verticaux : Saut en Hauteur & Saut à la Perche (RT 26 à 28)',
    shortTitle: 'Règlement Saut en Hauteur & Saut à la Perche',
    title: 'Règlement Officiel du Saut en Hauteur & Saut à la Perche (World Athletics RT 26-28), Appel 1 Pied, Barre 4m/4,50m, 3 Échecs, Ex Aequo & PDF | ProfEPS',
    metaDesc: 'Règlement complet du Saut en Hauteur (Fosbury, ciseaux) et du Saut à la Perche conforme aux Règles Techniques 26, 27 et 28 World Athletics 2026 et au Bac EPS Maroc : appel sur 1 pied, barre 4,00m/4,50m, 3 échecs consécutifs, départage des ex aequo, drapeaux des juges et PDF.',
    badge: '🆙 Règlement Officiel World Athletics RT 26-28 · Saut en Hauteur & Saut à la Perche',
    federation: 'World Athletics (Règles Techniques 26, 27 & 28) / CAA / FRMA & MENPS Maroc',
    lawVersion: 'World Athletics Competition & Technical Rules 2025/2026 (Règles Techniques 26, 27 & 28)',
    datePublished: '2026-11-01',
    dateLabel: '1 Novembre 2026',
    readTime: '28 min de lecture',
    officialPdfs: [
      {
        label: 'Télécharger les Règles Techniques 26, 27 & 28 (Hauteur & Perche World Athletics 2026 — PDF)',
        org: 'World Athletics — Book of Rules (RT 26 Vertical Jumps, RT 27 High Jump, RT 28 Pole Vault)',
        url: 'https://worldathletics.org/about-iaaf/documents/book-of-rules',
        note: 'Règles officielles complètes des sauts verticaux : élimination après 3 échecs consécutifs, impasse (« Pass »), départage des ex aequo, dimensions de la barre (4,00 m et 4,50 m) et du butoir de perche.'
      },
      {
        label: 'Orientations Pédagogiques & Barèmes du Saut en Hauteur au Baccalauréat (Maroc)',
        org: 'Portail ProfEPS Maroc — OP 2007 (Lycée) & OP 2009 (Collège)',
        url: 'orientations-pedagogiques-eps-maroc.html',
        note: 'Barèmes nationaux du saut en hauteur (Fosbury-flop / Rouleau ventral) pour le Collège et le Lycée au Maroc.'
      }
    ],
    courtSvg: `
      <svg viewBox="0 0 800 460" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,0.12);" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma officiel coté d'un sautoir de Saut en Hauteur (barre 4,00m, tapis 5x3m, course en J Fosbury) et de Saut à la Perche">
        <rect width="800" height="460" fill="#0f172a"/>
        <!--Moitié Gauche : Saut en Hauteur (RT 27) — Tapis 5x3m, Barre 4,00m, Course en J-->
        <rect x="35" y="45" width="355" height="255" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!--Matelas de réception Hauteur (min 5m x 3m x 0,70m)-->
        <rect x="85" y="68" width="255" height="105" rx="8" fill="#1d4ed8" stroke="#ffffff" stroke-width="3"/>
        <!--Poteaux et Barre transversale (4,00 m ± 2 cm, poids max 2,0 kg)-->
        <circle cx="80" cy="180" r="6" fill="#fde047"/>
        <circle cx="345" cy="180" r="6" fill="#fde047"/>
        <line x1="80" y1="180" x2="345" y2="180" stroke="#fde047" stroke-width="5"/>
        <!--Course d'élan en J du Fosbury-Flop (3-5 foulées rectilignes + 3-5 foulées en courbe)-->
        <path d="M 315 285 L 315 235 Q 315 190 225 186" fill="none" stroke="#4ade80" stroke-width="3.5" stroke-dasharray="6,4"/>
        <circle cx="225" cy="186" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <!--Moitié Droite : Saut à la Perche (RT 28) & Feuille de Concours (O / X / -)-->
        <rect x="410" y="45" width="355" height="255" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <!--Matelas Perche (6m x 6m x 0,80m) + Boîtier d'appui + Barre 4,50m-->
        <rect x="475" y="68" width="225" height="110" rx="8" fill="#0f766e" stroke="#ffffff" stroke-width="3"/>
        <rect x="572" y="178" width="30" height="18" fill="#fde047" stroke="#0f172a" stroke-width="1.5"/>
        <line x1="468" y1="178" x2="706" y2="178" stroke="#fde047" stroke-width="5"/>
        <rect x="568" y="196" width="38" height="90" fill="#b91c1c" stroke="#ffffff" stroke-width="2"/>
        <!--Cartes récapitulatives en bas-->
        <rect x="35" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="283" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <rect x="530" y="316" width="235" height="125" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <g font-family="Inter, sans-serif" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">
          <text x="400" y="26" fill="#fde047">SAUTS VERTICAUX (RT 26–28) : SAUT EN HAUTEUR (BARRE 4,00 m) &amp; PERCHE (BARRE 4,50 m)</text>
          <!--Annotations Hauteur-->
          <text x="212" y="60" fill="#fde047" font-size="12">🆙 SAUT EN HAUTEUR (RT 27)</text>
          <text x="212" y="115" fill="#ffffff">Tapis : min 5,00 m × 3,00 m (ép. 70 cm)</text>
          <text x="212" y="138" fill="#93c5fd" font-size="10.5">Barre : 4,00 m (±2 cm) · Max 2,00 kg · Ø 30 mm</text>
          <text x="200" y="205" fill="#fde047" font-size="10.5">Appel OBLIGATOIRE sur 1 SEUL PIED (pied éloigné en Fosbury)</text>
          <text x="200" y="255" fill="#4ade80" font-size="11">Course d'élan en « J » (Rayon 8 à 10 m)</text>
          <!--Annotations Perche-->
          <text x="587" y="60" fill="#38bdf8" font-size="12">🎋 SAUT À LA PERCHE (RT 28)</text>
          <text x="587" y="115" fill="#ffffff">Tapis : min 6,00 m × 6,00 m (ép. 80 cm)</text>
          <text x="587" y="138" fill="#fde047" font-size="10.5">Barre : 4,50 m (±2 cm) · Max 2,25 kg</text>
          <text x="665" y="230" fill="#38bdf8" font-size="10.5">Boîtier (1,00 m × 60/15 cm)</text>
          <text x="665" y="250" fill="#ffffff" font-size="10.5">Piste : min 40 m × 1,22 m</text>
          <!--Boîtes du bas-->
          <text x="152" y="338" fill="#fde047" font-size="12">❌ RÈGLE DES 3 ÉCHECS (RT 26.2)</text>
          <text x="152" y="359" font-weight="600">• Élimination après 3 ÉCHECS</text>
          <text x="152" y="378" font-weight="600">  CONSÉCUTIFS (quelle que soit</text>
          <text x="152" y="397" font-weight="600">  la hauteur : ex. X à 1m80 puis</text>
          <text x="152" y="416" font-weight="600">  impasse « - » et XX à 1m85 = Éliminé)</text>
          <text x="152" y="433" font-weight="600">• Code : O = Réussi · X = Raté · - = Impasse</text>
          <text x="400" y="338" fill="#4ade80" font-size="12">⚖️ DÉPARTAGE EX AEQUO (RT 26.8)</text>
          <text x="400" y="359" font-weight="600">1. Le MOINS d'essais à la hauteur</text>
          <text x="400" y="378" font-weight="600">   où l'égalité s'est produite</text>
          <text x="400" y="397" font-weight="600">2. Le MOINS d'échecs (« X ») sur</text>
          <text x="400" y="416" font-weight="600">   tout le concours jusqu'à la</text>
          <text x="400" y="433" font-weight="600">   dernière hauteur franchie incluse</text>
          <text x="647" y="338" fill="#f87171" font-size="12">🚫 LES CAUSES D'ESSAI NUL</text>
          <text x="647" y="359" font-weight="600">1. La barre tombe des taquets</text>
          <text x="647" y="378" font-weight="600">2. Toucher le sol/tapis AU-DELÀ du</text>
          <text x="647" y="397" font-weight="600">   plan vertical des montants sans</text>
          <text x="647" y="416" font-weight="600">   avoir franchi la barre</text>
          <text x="647" y="433" font-weight="600">3. Hauteur : appel à 2 pieds = NUL</text>
        </g>
      </svg>
    `,
    specsTable: [
      ['La Barre Transversale & les Montants (RT 26.3 & 27.4)', '• Saut en Hauteur : Longueur de la barre = 4,00 m (± 2 cm) · Masse maximale = 2,00 kg · Diamètre = 30 mm (± 1 mm) · Écartement des montants : 4,00 m à 4,04 m · • Saut à la Perche : Longueur de la barre = 4,50 m (± 2 cm) · Masse max = 2,25 kg', 'Les taquets (supports plats de 4 cm × 6 cm) se font face : un espace d\'au moins 1 cm doit toujours exister entre les extrémités de la barre et les montants !'],
      ['La Piste d\'Élan & le Tapis de Réception (RT 27 & 28)', '• Hauteur : Piste semi-circulaire d\'au moins 15 m (20–25 m en grand championnat) · Matelas de réception : au moins 5,00 m × 3,00 m × 0,70 m · • Perche : Piste de 40 m × 1,22 m · Boîtier d\'appui de 1,00 m de long · Matelas : au moins 6,00 m × 6,00 m × 0,80 m', 'En saut en hauteur, le matelas est placé à au moins 10 cm des montants pour ne jamais les faire bouger lors de la chute de l\'athlète'],
      ['Règle Fondamentale de l\'Appel en Hauteur (RT 27.1)', 'Au saut en hauteur, l\'athlète DOIT obligatoirement prendre son appel sur UN SEUL PIED (l\'impulsion à deux pieds est immédiatement sanctionnée d\'un essai nul — Drapeau Rouge)', 'En technique Fosbury-Flop (dorsale), l\'appel se prend toujours sur le pied ÉLOIGNÉ de la barre (pied extérieur au virage) ! En ciseaux, l\'appel se prend aussi sur le pied éloigné'],
      ['Élimination après 3 Échecs Consécutifs & Impasse (RT 26.2)', 'Un athlète dispose de 3 essais par hauteur. Il est éliminé du concours dès qu\'il totalise 3 ÉCHECS CONSÉCUTIFS, quelle que soit la hauteur où ces échecs se sont produits !', 'Règle de l\'impasse (« - ») : après 1 échec (X) ou 2 échecs (XX) à une hauteur, l\'athlète a le droit de faire impasse et de garder les essais restants (2 ou 1 seul !) pour la hauteur supérieure'],
      ['Montée de la Barre & Mesure au Sommet (RT 26.4 & 26.5)', 'La hauteur est mesurée perpendiculairement depuis le sol jusqu\'au BORD SUPÉRIEUR de la barre en son point le plus bas (au milieu de la barre) · La barre monte d\'au moins 2 cm par barre en Hauteur et d\'au moins 5 cm en Perche (sauf lorsqu\'il ne reste qu\'un seul athlète en lice)', 'En Épreuves Combinées (Décathlon/Heptathlon), la montée est fixe : +3 cm partout en Hauteur et +10 cm partout à la Perche'],
      ['Spécificités du Saut à la Perche (RT 28)', 'L\'athlète utilise sa propre perche (longueur et diamètre libres, surface lisse). Il est INTERDIT pendant le saut de déplacer la main supérieure vers le haut sur la perche (« grimper à la perche ») après avoir quitté le sol, ou de stabiliser/remettre la barre avec la main', 'Les reculs des montants (de 0 cm au niveau de la ligne zéro du butoir jusqu\'à 80 cm vers le tapis) sont choisis par chaque perchiste avant son saut']
    ],
    lawsSummary: [
      {
        title: 'Les Causes d\'Essai Nul en Saut en Hauteur et Saut à la Perche (RT 27.2 et RT 28.2)',
        content: 'Un athlète échoue dans son essai (noté « X » sur la feuille de concours, Drapeau Rouge) si : 1) Après le saut, la barre ne reste pas sur les taquets du fait de l\'action de l\'athlète pendant le saut ; 2) Il touche le sol ou la zone de réception (matelas) AU-DELÀ du plan vertical du bord le plus proche de la barre (entre ou en dehors des montants) avec une partie quelconque de son corps (ou de sa perche) SANS avoir préalablement franchi la barre (note : si en courant il touche le tapis mais que l\'arbitre estime qu\'il n\'en a tiré aucun avantage, le saut n\'est pas annulé pour cette seule raison s\'il s\'arrête avant de sauter, mais s\'il passe sous la barre après le plan vertical, c\'est NUL !) ; 3) Au saut en hauteur uniquement : il prend son impulsion des deux pieds (RT 27.1) ; 4) Au saut à la perche uniquement : après avoir quitté le sol, il place sa main inférieure au-dessus de la supérieure ou déplace sa main supérieure plus haut sur la perche, ou bien quelqu\'un (même lui) touche la perche alors qu\'elle est en train de retomber vers la barre et pourrait la faire tomber (RT 28.4) !'
      },
      {
        title: 'Le Mécanisme de l\'Impasse (« - ») et des 3 Échecs Consécutifs (RT 26.2 et 26.3)',
        content: 'Ce point fait l\'objet de questions fréquentes au QCM CRMEF : un sauteur est éliminé après 3 échecs consécutifs (« XXX »), même s\'ils sont répartis sur plusieurs hauteurs différentes. Exemple concret : un athlète tente 1,90 m, échoue à son 1er essai (« X ») et décide de faire impasse (« X - ») pour passer directement à 1,95 m. À 1,95 m, il ne dispose plus que de DEUX essais (et non trois !), car il a déjà consommé un échec consécutif à 1,90 m. S\'il échoue ses deux essais à 1,95 m (« XX »), il cumule 3 échecs consécutifs (1 à 1,90 m + 2 à 1,95 m) et est éliminé ! En revanche, dès qu\'il franchit une barre (« O »), son compteur d\'échecs consécutifs retombe à zéro et il retrouve droit à 3 essais complets à la hauteur suivante.'
      },
      {
        title: 'La Règle Officielle de Départage des Ex Aequo en Sauts Verticaux (RT 26.8 et 26.9)',
        content: 'Comment classe-t-on deux athlètes qui terminent le concours avec exactement la même meilleure hauteur franchie (ex. 2,00 m tous les deux) ? On applique dans l\'ordre les deux critères mathématiques de la Règle Technique 26.8 : • Critère 1 : L\'athlète qui a effectué le MOINS D\'ESSAIS À LA HAUTEUR OÙ L\'ÉGALITÉ S\'EST PRODUITE (ici à 2,00 m) est classé devant (ex. celui qui a franchi 2,00 m au 1er essai « O » bat celui qui l\'a franchi au 2e essai « XO ») ; • Critère 2 : Si les deux ont franchi 2,00 m au même essai (ex. « XO » tous les deux), l\'athlète qui compte le MOINS D\'ÉCHECS (« X ») SUR L\'ENSEMBLE DU CONCOURS jusqu\'à la dernière hauteur franchie comprise (2,00 m) est classé devant ! • Critère 3 : Si l\'égalité persiste encore : s\'il s\'agit d\'une 2e, 3e ou autre place, les athlètes sont classés ex aequo ; s\'il s\'agit de la 1re place, ils peuvent soit décider de partager la médaille d\'or (comme Barshim et Tamberi aux JO de Tokyo !), soit disputer un barrage (1 seul essai par barre).'
      }
    ],
    refereeSignals: [
      {
        code: 'World Athletics · Sauts V 1',
        name: 'Juge Chef à la Barre : Drapeau Blanc (Barre Franchie « O »)',
        when: 'L\'athlète a franchi la barre sur un pied d\'appel, a quitté le tapis et la barre est restée en place sur les taquets.',
        how: 'Le chef juge attend que l\'athlète soit descendu du matelas (et que la barre ait fini d\'osciller), note « O » et lève le DRAPEAU BLANC.',
        svgType: 'flag_white_valid'
      },
      {
        code: 'World Athletics · Sauts V 2',
        name: 'Juge Chef à la Barre : Drapeau Rouge (Barre Tombée « X » ou Passage sous le Plan)',
        when: 'La barre tombe des taquets, l\'athlète touche le tapis au-delà du plan vertical sans sauter, ou prend son appel à 2 pieds.',
        how: 'Le chef juge crie « Nul ! », note « X » sur la feuille de concours et lève verticalement le DRAPEAU ROUGE.',
        svgType: 'flag_red_foul'
      },
      {
        code: 'World Athletics · Sauts V 3',
        name: 'Drapeau Jaune des 15 Dernières Secondes (Temps Imparti : 30s / 1min / 1min30 / 2min)',
        when: 'Il ne reste plus que 15 secondes sur le chronomètre de l\'essai.',
        how: 'Le juge au temps lève le DRAPEAU JAUNE et le maintient levé pendant les 15 dernières secondes.',
        svgType: 'flag_side_assistant'
      },
      {
        code: 'World Athletics · Perche 4',
        name: 'Annonce du Recul des Montants au Saut à la Perche (de 0 à 80 cm)',
        when: 'Avant chaque saut à la perche, l\'athlète indique à quelle distance derrière la ligne zéro du butoir il souhaite placer les montants.',
        how: 'Le juge aux montants règle la crémaillère (entre 0 cm et 80 cm vers le tapis) et confirme la mesure à l\'athlète.',
        svgType: 'point_horizontal'
      },
      {
        code: 'EPS Maroc · Sécurité 5',
        name: 'Vérification de la Jonction des Tapis de Réception (Sécurité Fosbury)',
        when: 'Avant chaque série de saut en hauteur en technique dorsale (Fosbury-Flop) en EPS.',
        how: 'Les deux élèves-juges vérifient que les gros tapis de réception sont solidement sanglés ensemble sans aucun interstice et centrés face à la barre.',
        svgType: 'advantage_both_arms'
      }
    ],
    epsAdaptationTable: [
      ['Choix Technique & Sécurité en EPS Maroc', 'Fosbury-Flop sur matelas olympique de 70 cm d\'épaisseur', 'Règle de sécurité absolue en EPS Maroc : • Si l\'établissement dispose d\'un vrai matelas de chute épais (≥ 50–60 cm) : enseignement du FOSBURY-FLOP (ou du Rouleau Ventral) · • Si l\'établissement ne dispose que de tapis de gymnastique fins ou d\'une fosse de sable : INTERDICTION FORMELLE du Fosbury-Flop (risque cervical) → enseignement exclusif du saut en CISEAUX avec réception debout équilibrée sur les pieds !', 'Point crucial évalué par les jurys d\'oral du CRMEF sur la sécurité passive'],
      ['L\'Élastique Pédagogique en Apprentissage', 'Barre rigide en fibre de verre', 'Pendant les séances d\'apprentissage (1 à 5), remplacement de la barre rigide par un ÉLASTIQUE bicolore tendu entre les poteaux (+ pose de 2 cônes sur l\'élastique pour matérialiser la zone centrale de franchissement)', 'Supprime la peur de retomber sur la barre et fait gagner un temps considérable (plus besoin de remettre la barre à chaque essai)'],
      ['Étalonnage de la Course en « J » (Fosbury)', 'Course libre', 'Traçage à la craie au sol d\'un arc de cercle de 4 foulées (rayon 6 à 8 m) précédé de 4 foulées rectilignes : l\'élève qui prend son appel du pied GAUche part à DROITE (et inversement !)', 'Évite l\'erreur classique de l\'élève qui attaque du mauvais pied et tourne le ventre à la barre au lieu du dos']
    ],
    crmefQuestions: [
      {
        q: '1. Quel pied d\'appel un élève doit-il obligatoirement utiliser en technique Fosbury-Flop et en technique Ciseaux s\'il arrive par le côté DROIT du sautoir ?',
        a: 'S\'il s\'élance depuis le côté DROIT du sautoir, il doit obligatoirement prendre son appel sur le pied GAUCHE (c\'est-à-dire le pied ÉLOIGNÉ de la barre / pied extérieur au virage), aussi bien en Fosbury-Flop qu\'en Ciseaux ! En Fosbury, le genou libre (droit) monte en rotation vers l\'intérieur pour placer le dos face à la barre ; en Ciseaux, la jambe libre (droite, la plus proche de la barre) attaque et franchit la barre en premier.'
      },
      {
        q: '2. Exercice classique du QCM CRMEF : à 1,85 m, l\'athlète A franchit au 1er essai (« O ») et l\'athlète B au 2e essai (« XO »). À 1,90 m (leur hauteur finale), A franchit au 2e essai (« XO ») et B franchit au 1er essai (« O »). Tous deux échouent 3 fois à 1,95 m. Qui gagne le concours ?',
        a: 'C\'est l\'athlète B qui gagne ! Pourquoi ? Selon la Règle Technique 26.8, le 1er critère de départage regarde uniquement le nombre d\'essais à la DERNIÈRE hauteur franchie où l\'égalité s\'est produite (ici 1,90 m) : B a franchi 1,90 m au 1er essai (« O ») alors que A l\'a franchi au 2e essai (« XO »). Le 2e critère (nombre total d\'échecs sur le concours) n\'est utilisé que s\'ils sont à égalité sur le 1er critère !'
      },
      {
        q: '3. Quelles sont les longueurs et masses officielles de la barre transversale au saut en hauteur et au saut à la perche ?',
        a: '• Au Saut en Hauteur : longueur de 4,00 mètres (± 2 cm) et masse maximale de 2,00 kg ; • Au Saut à la Perche : longueur de 4,50 mètres (± 2 cm) et masse maximale de 2,25 kg.'
      },
      {
        q: '4. Pourquoi la course d\'élan du Fosbury-Flop est-elle curviligne (en forme de « J ») sur les 4 derniers appuis ?',
        a: 'L\'élan curviligne soumet le sauteur à une force centrifuge qui l\'oblige à s\'incliner vers l\'intérieur du virage (à l\'opposé de la barre). Au moment de l\'impulsion verticale sur le dernier appui, le redressement brusque crée un moment cinétique (rotation longitudinale et transversale gratuite) qui fait pivoter le dos face à la barre et abaisse momentanément le centre de gravité sous la barre lors de l\'esquive cambrée.'
      }
    ],
    fieldExperience: {
      context: '📍 Cycle Saut en Hauteur (Collège Ciseaux/Fosbury & Lycée/Baccalauréat) au Maroc',
      reality: 'En saut en hauteur (Fosbury), 80 % des débutants courent en ligne droite vers le milieu de la barre puis tournent le dos au dernier moment en prenant leur appel collés sous la barre : résultat, ils montent tout droit et retombent sur la barre avant même d\'être entrés sur le tapis !',
      tip: 'Je trace à la craie (ou avec 4 coupelles souples) la courbe exacte du « J » au sol, et je place une marque d\'appel à 70 cm DEVANT le plan de la barre (jamais dessous !). Surtout, je place un cône sur la barre au niveau du premier tiers (et non au milieu) : l\'élève apprend à franchir dans le 1er tiers en conservant sa vitesse tangentielle pour atterrir au cœur du matelas sur les épaules (jamais sur les fesses ni sur la nuque).'
    }
  }
];

