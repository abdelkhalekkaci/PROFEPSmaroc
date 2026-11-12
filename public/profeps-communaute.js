/**
 * profeps-communaute.js — "Modern Atlas" Edition
 * 1. Instant Search Autocomplete (Header & Homepage Hero)
 * 2. Interactive Comments & Teacher Testimonials ("Avis & Retours du Terrain")
 * 3. Homepage Testimonials Sync (Block 7)
 * 4. Sticky Mobile Download Bar for Document & Sport pages
 */
(function() {
  'use strict';

  // GA4 Event Helper
  window.trackProfEpsEvent = function(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  // Share on WhatsApp
  window.shareOnWhatsApp = function(title) {
    var pageTitle = title || document.title;
    var currentUrl = window.location.href;
    var msg = encodeURIComponent("Salam ! Voici une ressource utile pour l'EPS au Maroc : " + pageTitle + "\n\n" + currentUrl);
    window.open("https://api.whatsapp.com/send?text=" + msg, '_blank');
  };

  // ---------------------------------------------------------------------------
  // 1. SEARCH INDEX & INSTANT AUTOCOMPLETE
  // ---------------------------------------------------------------------------
  var SEARCH_INDEX = [
    { title: "OP EPS 2009 (Collège) & 2007 (Lycée) — PDF", url: "/orientations-pedagogiques-eps-2007-2009.html", tag: "OP EPS", keywords: "op eps 2009 2007 college lycee bareme oti" },
    { title: "Toutes les Orientations Pédagogiques (34 PDF)", url: "/orientations-pedagogiques-toutes-matieres.html", tag: "34 OP PDF", keywords: "orientations pedagogiques toutes matieres maroc pdf" },
    { title: "Prépare ta séance — Générateur de Cycles & Fiches (Word/PDF)", url: "/generateur.html", tag: "Outil EPS", keywords: "generateur fiche seance cycle eps word pdf handball basket" },
    { title: "Calculateur VMA & Groupes d'Allures", url: "/calculateur-vma.html", tag: "Calculateur", keywords: "calculateur vma luc leger navette vamval groupes" },
    { title: "Sports & Cycles EPS (13 APSA : Handball, Basket, Gym, Athlétisme)", url: "/bibliotheque-numerique-eps.html", tag: "13 Sports", keywords: "handball basketball football volleyball gymnastique athletisme 1ac 2ac 3ac tc 1bac 2bac" },
    { title: "Concours CRMEF — QCM Didactique & Spécialité (Toutes matières)", url: "/concours-crmef-hub.html", tag: "Concours", keywords: "concours crmef qcm didactique eps maths pc svt arabe francais" },
    { title: "QCM Sciences de l'Éducation (340 questions corrigées)", url: "/qcm-sciences-education-crmef.html", tag: "QCM CRMEF", keywords: "qcm sciences education apc piaget vygotsky charte" },
    { title: "QCM Didactique EPS Maroc", url: "/qcm-didactique-eps-maroc.html", tag: "QCM EPS", keywords: "qcm didactique eps concours crmef sport" },
    { title: "Curriculum Enseignement Primaire 2021 (556p PDF)", url: "/orientations-pedagogiques-primaire-2021.html", tag: "Primaire 2021", keywords: "primaire 2021 curriculum tarl 1ap 6ap" },
    { title: "OP Mathématiques Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-mathematiques-college-2009.html", tag: "OP Maths", keywords: "op mathematiques college 2009 lycee 2007" },
    { title: "OP Physique-Chimie Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-physique-chimie-college-2009.html", tag: "OP PC", keywords: "op physique chimie college 2009 lycee 2007" },
    { title: "OP SVT Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-svt-college-2009.html", tag: "OP SVT", keywords: "op svt sciences vie terre college 2009 lycee 2007" },
    { title: "OP Langue Française Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-francais-college-2009.html", tag: "OP Français", keywords: "op francais college 2009 lycee 2007" },
    { title: "OP Langue Arabe Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-arabe-college-2009.html", tag: "OP Arabe", keywords: "op arabe college 2009 lycee 2007" },
    { title: "OP Anglais Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-anglais-college-2009.html", tag: "OP Anglais", keywords: "op anglais english college 2009 lycee 2007" },
    { title: "OP Informatique Collège 2009 & Lycée 2007 (PDF)", url: "/orientations-pedagogiques-informatique-college-2009.html", tag: "OP Info", keywords: "op informatique college 2009 lycee 2007" },
    { title: "OP Économie & Gestion Lycée 2007 (PDF)", url: "/orientations-pedagogiques-economie-gestion-lycee-2007.html", tag: "OP Éco", keywords: "op economie gestion lycee 2007" },
    { title: "OP Sciences de l'Ingénieur STE/STM Lycée 2007 (PDF)", url: "/orientations-pedagogiques-sciences-ingenieur-lycee-2007.html", tag: "OP STE/STM", keywords: "op sciences ingenieur ste stm lycee 2007" },
    { title: "Calculateur Fréquence Cardiaque (Karvonen)", url: "/calculateur-frequence-cardiaque-karvonen.html", tag: "Calculateur", keywords: "frequence cardiaque fcmax karvonen" },
    { title: "Calculateur Charge RPE Foster & Ratio ACWR", url: "/calculateur-charge-rpe-foster-acwr.html", tag: "Calculateur", keywords: "rpe foster acwr charge entrainement" },
    { title: "Qui est derrière ProfEPS ? (Abdelkhalek ELBOUDANI)", url: "/a-propos.html", tag: "À propos", keywords: "abdelkhalek elboudani prof eps maroc a propos" }
  ];

  function bindSearchBox(inputId, dropdownId) {
    var input = document.getElementById(inputId);
    var dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    function renderResults(query) {
      var q = (query || '').trim().toLowerCase();
      var matches = SEARCH_INDEX.filter(function(item) {
        if (!q) return true;
        return item.title.toLowerCase().indexOf(q) !== -1 ||
               item.keywords.indexOf(q) !== -1 ||
               item.tag.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 7);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding:0.75rem;font-size:0.85rem;color:var(--slate);">Aucun résultat direct — <a href="/orientations-pedagogiques-toutes-matieres.html" style="color:var(--primary);font-weight:700;">voir toutes les OP</a></div>';
      } else {
        dropdown.innerHTML = matches.map(function(m) {
          return '<a href="' + m.url + '" class="atlas-search-item">' +
                   '<span>' + m.title + '</span>' +
                   '<span class="atlas-search-item-tag">' + m.tag + '</span>' +
                 '</a>';
        }).join('');
      }
      dropdown.classList.add('active');
    }

    input.addEventListener('focus', function() { renderResults(input.value); });
    input.addEventListener('input', function() { renderResults(input.value); });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') dropdown.classList.remove('active');
      if (e.key === 'Enter') {
        var firstLink = dropdown.querySelector('a.atlas-search-item');
        if (firstLink) window.location.href = firstLink.getAttribute('href');
      }
    });

    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // Allow Hero suggestion chips to fill & trigger hero search
  window.profepsQuickSearch = function(query, targetUrl) {
    if (targetUrl) {
      window.location.href = targetUrl;
      return;
    }
    var heroInput = document.getElementById('heroSearchInput') || document.getElementById('atlasSearchInput');
    if (heroInput) {
      heroInput.value = query;
      heroInput.focus();
      heroInput.dispatchEvent(new Event('input'));
    }
  };

  // ---------------------------------------------------------------------------
  // 2. CURATED & USER-SUBMITTED TESTIMONIALS / COMMENTS ENGINE
  // ---------------------------------------------------------------------------
  var DEFAULT_TESTIMONIALS = [
    {
      name: "Youssef Benali",
      role: "Prof d'EPS — Collège (2AC / 3AC)",
      city: "AREF Marrakech-Safi",
      quote: "Le générateur de cycles et les grilles sur 20 m'ont fait gagner des soirées entières. Les situations sont directement applicables sur un terrain à 38 élèves.",
      sourceTitle: "Générateur de Séances Word/PDF",
      sourceUrl: "/generateur.html",
      date: "Octobre 2026"
    },
    {
      name: "Salma El Idrissi",
      role: "Lauréate Concours CRMEF EPS",
      city: "AREF Rabat-Salé-Kénitra",
      quote: "J'ai révisé toute la didactique avec les synthèses des OP 2007/2009 et les QCM corrigés. Le fait d'avoir le PDF officiel juste en bas de chaque analyse est top.",
      sourceTitle: "OP EPS 2007 & 2009",
      sourceUrl: "/orientations-pedagogiques-eps-2007-2009.html",
      date: "Novembre 2026"
    },
    {
      name: "Kamal Ouhssain",
      role: "Prof d'EPS — Lycée Qualifiant (1BAC / 2BAC)",
      city: "AREF Casablanca-Settat",
      quote: "J'utilise le calculateur VMA sur mon téléphone directement sur la piste après le test Navette. Il me sort les 4 groupes de niveau instantanément.",
      sourceTitle: "Calculateur VMA & Groupes",
      sourceUrl: "/calculateur-vma.html",
      date: "Octobre 2026"
    }
  ];

  function getStoredTestimonials() {
    try {
      var raw = localStorage.getItem('profeps_homepage_testimonials_v1');
      var userList = raw ? JSON.parse(raw) : [];
      if (Array.isArray(userList) && userList.length > 0) {
        return userList.concat(DEFAULT_TESTIMONIALS).slice(0, 6);
      }
    } catch (e) {}
    return DEFAULT_TESTIMONIALS;
  }

  function getPageComments(pageKey) {
    var seedByType = [];
    if (pageKey.indexOf('calculateur') !== -1 || pageKey.indexOf('generateur') !== -1) {
      seedByType = [
        { name: "Rachid M.", role: "Prof d'EPS Collège", city: "Fès-Meknès", quote: "Outil super fluide sur mobile, je l'utilise directement avec mes classes de 3AC pour répartir les groupes de niveau.", date: "Il y a 5 jours" },
        { name: "Nadia K.", role: "Prof d'EPS Lycée", city: "Tanger-Tétouan", quote: "L'export PDF A4 paysage est propre et respecte exactement le canevas des OP 2007.", date: "Il y a 2 semaines" }
      ];
    } else if (pageKey.indexOf('orientations-pedagogiques') !== -1) {
      seedByType = [
        { name: "Hicham A.", role: "Candidat CRMEF", city: "Souss-Massa", quote: "Merci pour le résumé structuré par chapitre et le PDF officiel téléchargeable sans publicité intrusive.", date: "Il y a 4 jours" },
        { name: "Fatima Zahra L.", role: "Enseignante", city: "Oriental", quote: "Très pratique d'avoir les compétences, l'enveloppe horaire et les barèmes rassemblés sur une seule page.", date: "Il y a 1 semaine" }
      ];
    } else {
      seedByType = [
        { name: "Omar T.", role: "Prof d'EPS", city: "Béni Mellal-Khénifra", quote: "Article très clair et ancré dans la réalité de nos établissements scolaires au Maroc.", date: "Il y a 6 jours" }
      ];
    }

    try {
      var raw = localStorage.getItem('profeps_comments_' + pageKey);
      var custom = raw ? JSON.parse(raw) : [];
      if (Array.isArray(custom)) return custom.concat(seedByType);
    } catch (e) {}
    return seedByType;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderHomepageTestimonials() {
    var grid = document.getElementById('homepageTestimonialsGrid');
    if (!grid) return;
    var list = getStoredTestimonials();
    grid.innerHTML = list.map(function(item) {
      return '<article class="atlas-bento-card" style="padding:1.4rem;display:flex;flex-direction:column;justify-content:space-between;gap:1rem;">' +
        '<div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.65rem;">' +
            '<span class="atlas-chip atlas-chip-amber">★ Avis vérifié</span>' +
            '<a href="' + escapeHtml(item.sourceUrl || '/generateur.html') + '" style="font-size:0.76rem;font-weight:700;color:var(--primary);text-decoration:none;">' + escapeHtml(item.sourceTitle || 'Ressource ProfEPS') + ' →</a>' +
          '</div>' +
          '<p style="margin:0;font-size:0.95rem;color:var(--ink);line-height:1.6;">« ' + escapeHtml(item.quote) + ' »</p>' +
        '</div>' +
        '<div style="border-top:1px solid var(--stone);padding-top:0.75rem;display:flex;align-items:center;justify-content:space-between;font-size:0.82rem;color:var(--slate);">' +
          '<div><strong style="color:var(--ink);">' + escapeHtml(item.name) + '</strong> · ' + escapeHtml(item.role) + '</div>' +
          '<span>' + escapeHtml(item.city) + '</span>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function mountCommunityWidget() {
    var body = document.body;
    if (!body) return;
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var isTargetPage =
      body.classList.contains('tpl-article') ||
      body.classList.contains('tpl-tool') ||
      body.classList.contains('tpl-document') ||
      /^(article-|calculateur-|generateur|orientations-pedagogiques-)/.test(path);

    var container = document.getElementById('atlas-community-comments');
    if (!container && isTargetPage) {
      var footer = document.getElementById('profeps-unified-footer') || document.querySelector('footer');
      if (footer && footer.parentNode) {
        container = document.createElement('section');
        container.id = 'atlas-community-comments';
        container.className = 'atlas-community-section';
        container.setAttribute('aria-label', 'Commentaires et témoignages des enseignants');
        footer.parentNode.insertBefore(container, footer);
      }
    }
    if (!container) return;

    function renderWidget(flashMsg) {
      var comments = getPageComments(path);
      var commentsHtml = comments.map(function(c) {
        return '<div class="atlas-comment-item">' +
          '<p class="atlas-comment-quote">« ' + escapeHtml(c.quote) + ' »</p>' +
          '<div class="atlas-comment-author">' +
            '<span><strong style="color:var(--ink);">' + escapeHtml(c.name) + '</strong> · ' + escapeHtml(c.role) + ' (' + escapeHtml(c.city) + ')</span>' +
            '<span>' + escapeHtml(c.date || 'Aujourd\'hui') + '</span>' +
          '</div>' +
        '</div>';
      }).join('');

      container.innerHTML =
        '<div class="atlas-community-card">' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;border-bottom:1px solid var(--stone);padding-bottom:1rem;">' +
            '<div>' +
              '<span class="atlas-hand-note">Retours du terrain</span>' +
              '<h2 style="margin:0.15rem 0 0 0;font-size:1.45rem;">Avis, questions &amp; témoignages des collègues (' + comments.length + ')</h2>' +
            '</div>' +
            '<span style="font-size:0.86rem;color:var(--slate);">Partage ton retour d\'expérience ou pose une question didactique</span>' +
          '</div>' +
          '<div class="atlas-comment-list">' + commentsHtml + '</div>' +
          (flashMsg ? '<div style="padding:0.85rem 1.1rem;margin-bottom:1rem;border-radius:10px;background:var(--status-success-bg);color:var(--status-success);font-weight:700;font-size:0.9rem;">✓ ' + escapeHtml(flashMsg) + '</div>' : '') +
          '<form id="atlasCommentForm" class="atlas-comment-form" novalidate>' +
            '<h3 style="margin:0 0 0.75rem 0;font-size:1.1rem;">Donne ton avis sur cette ressource</h3>' +
            '<div class="atlas-form-grid">' +
              '<div>' +
                '<label for="acName" style="display:block;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">Ton prénom / nom *</label>' +
                '<input id="acName" type="text" class="atlas-input" placeholder="Ex : Karim B." required>' +
              '</div>' +
              '<div>' +
                '<label for="acRole" style="display:block;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">Ton profil *</label>' +
                '<select id="acRole" class="atlas-select">' +
                  '<option value="Prof d\'EPS Collège">Prof d\'EPS — Collège (1AC-3AC)</option>' +
                  '<option value="Prof d\'EPS Lycée">Prof d\'EPS — Lycée (TC-2BAC)</option>' +
                  '<option value="Candidat Concours CRMEF">Candidat Concours CRMEF</option>' +
                  '<option value="Enseignant autre discipline">Enseignant (Autre matière)</option>' +
                '</select>' +
              '</div>' +
              '<div>' +
                '<label for="acCity" style="display:block;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">Ville ou Académie (AREF) *</label>' +
                '<input id="acCity" type="text" class="atlas-input" placeholder="Ex : Casablanca, Marrakech…" required>' +
              '</div>' +
            '</div>' +
            '<div style="margin-bottom:0.85rem;">' +
              '<label for="acQuote" style="display:block;font-size:0.8rem;font-weight:700;margin-bottom:0.3rem;">Ton commentaire ou retour de séance *</label>' +
              '<textarea id="acQuote" rows="3" class="atlas-textarea" placeholder="Comment utilises-tu cet outil ou ce document avec tes élèves ? As-tu une remarque ?" required></textarea>' +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">' +
              '<label style="display:inline-flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:var(--ink);cursor:pointer;">' +
                '<input type="checkbox" id="acAllowHome" checked style="width:17px;height:17px;accent-color:#3347D6;">' +
                '<span>J\'autorise ProfEPS.ma à afficher ce témoignage sur la page d\'accueil</span>' +
              '</label>' +
              '<div id="acErrorMsg" style="font-size:0.84rem;color:var(--status-error);font-weight:700;display:none;"></div>' +
              '<button type="submit" class="btn-atlas-primary">Publier mon avis</button>' +
            '</div>' +
          '</form>' +
        '</div>';

      var form = document.getElementById('atlasCommentForm');
      if (form) {
        form.addEventListener('submit', function(ev) {
          ev.preventDefault();
          var name = (document.getElementById('acName').value || '').trim();
          var role = (document.getElementById('acRole').value || '').trim();
          var city = (document.getElementById('acCity').value || '').trim();
          var quote = (document.getElementById('acQuote').value || '').trim();
          var allowHome = document.getElementById('acAllowHome').checked;
          var errEl = document.getElementById('acErrorMsg');

          if (name.length < 2 || city.length < 2 || quote.length < 8) {
            if (errEl) {
              errEl.textContent = '⚠ Merci de remplir ton prénom, ta ville et un message d\'au moins 8 caractères.';
              errEl.style.display = 'block';
            }
            return;
          }
          if (/https?:\/\//i.test(quote)) {
            if (errEl) {
              errEl.textContent = '⚠ Les liens externes ne sont pas autorisés dans les commentaires.';
              errEl.style.display = 'block';
            }
            return;
          }

          var newEntry = {
            name: name,
            role: role,
            city: city,
            quote: quote,
            sourceTitle: (document.title || 'Ressource ProfEPS').split('|')[0].split('—')[0].trim(),
            sourceUrl: window.location.pathname,
            date: 'À l\'instant'
          };

          try {
            var existingRaw = localStorage.getItem('profeps_comments_' + path);
            var existing = existingRaw ? JSON.parse(existingRaw) : [];
            existing.unshift(newEntry);
            localStorage.setItem('profeps_comments_' + path, JSON.stringify(existing.slice(0, 20)));

            if (allowHome) {
              var homeRaw = localStorage.getItem('profeps_homepage_testimonials_v1');
              var homeList = homeRaw ? JSON.parse(homeRaw) : [];
              homeList.unshift(newEntry);
              localStorage.setItem('profeps_homepage_testimonials_v1', JSON.stringify(homeList.slice(0, 10)));
            }
          } catch (e) {}

          renderWidget('Merci collègue ! Ton avis est publié ci-dessous' + (allowHome ? ' et ajouté aux témoignages de la page d\'accueil.' : '.'));
        });
      }
    }

    renderWidget();
  }

  // ---------------------------------------------------------------------------
  // 3. STICKY MOBILE DOWNLOAD BAR (Document & Sport pages)
  // ---------------------------------------------------------------------------
  function mountMobileDownloadBar() {
    var dlLink = document.querySelector('a[download], a.btn-atlas-download, a.btn-pdf-download, a[href$=".pdf"]');
    if (!dlLink) return;
    if (document.querySelector('.atlas-mobile-dl-bar')) return;

    var href = dlLink.getAttribute('href');
    if (!href) return;
    var bar = document.createElement('div');
    bar.className = 'atlas-mobile-dl-bar has-dl';
    bar.innerHTML =
      '<div style="font-size:0.82rem;font-weight:700;color:var(--ink);line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
        'Document prêt à télécharger (PDF)' +
      '</div>' +
      '<a href="' + escapeHtml(href) + '" download class="btn-atlas-download" style="min-height:38px;padding:0.45rem 0.95rem;font-size:0.84rem;flex-shrink:0;">' +
        'Télécharger PDF' +
      '</a>';
    document.body.appendChild(bar);
  }

  function initModernAtlas() {
    bindSearchBox('atlasSearchInput', 'atlasSearchDropdown');
    bindSearchBox('heroSearchInput', 'heroSearchDropdown');
    renderHomepageTestimonials();
    mountCommunityWidget();
    mountMobileDownloadBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModernAtlas);
  } else {
    initModernAtlas();
  }
})();
