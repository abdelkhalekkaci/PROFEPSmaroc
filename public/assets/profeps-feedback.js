/**
 * ProfEPS.ma — Unified Feedback & Community System (/assets/profeps-feedback.js)
 * 1. Homepage (index.html): Testimonials section + "Rédiger un avis" form (Cloud Firestore backed).
 *    - Zero pre-selected stars (0/5 by default, mandatory selection).
 *    - No Schema.org AggregateRating markup.
 *    - Average rating displayed only when >= 3 published reviews exist.
 * 2. Blog Articles (129 pure editorial articles from blog.html): Bottom Pedagogical Comments section.
 *    - Supports French (LTR), English (LTR), and Arabic (RTL) automatically.
 * 3. First Document Generation / Download Popup:
 *    - Triggers ONLY ONCE per visitor (localStorage 'profeps_first_doc_prompted_v1'), 1.5s after first PDF/Word download or fiche/cycle/grille generation.
 * 4. Anti-Spam & Moderation:
 *    - Honeypot field + >= 3s dwell time + character limits + URL blocker.
 *    - Community "Signaler" button + Password-protected Admin Delete.
 */
(function () {
  'use strict';

  if (window.__PROFEPS_FEEDBACK_LOADED__) return;
  window.__PROFEPS_FEEDBACK_LOADED__ = true;

  var FIRST_DOC_STORAGE_KEY = 'profeps_first_doc_prompted_v1';
  var ADMIN_PASS_SESSION_KEY = 'profeps_admin_mod_pass';

  // Exact allowlist of editorial articles from blog.html (excludes APS studios, calculators, QCMs, OP hubs, and library hubs)
  var BLOG_ARTICLE_SLUGS = new Set([
    'absences-conges-enseignant-eps-maroc-droits-procedures.html',
    'accident-scolaire-eps-maroc-rapport-procedure.html',
    'allure-ajustee-pente-gap-modele-minetti.html',
    'ar-baremes-bac-sport-maroc.html',
    'ar-concours-crmef-eps-maroc.html',
    'ar-daraja-momtaza-kharij-salam-chorout-statut-2024.html',
    'ar-fiches-seance-cycles-eps-maroc.html',
    'ar-idara-tarbawiya-taftich-assatida-bahitin-statut-2024.html',
    'ar-idmaj-otour-jadida-molhaq-momawin-mostachar-statut-2024.html',
    'ar-inkhirat-moassassat-mohammed-6-fm6-wataiq-imtiyazat.html',
    'ar-istirjaa-dariba-ir-asatida-maroc.html',
    'ar-jadwal-taawidat-ziyada-ojour-mada-59-statut-2024.html',
    'ar-ma-yamnaoho-nidam-assassi-dorous-khossoussiya-statut-2024.html',
    'ar-orientations-pedagogiques-eps-maroc.html',
    'ar-otour-hayat-tadris-darajat-ostad-mobarraz-statut-2024.html',
    'ar-saat-amal-osbouiya-saat-idafiya-takwin-mostamir-statut-2024.html',
    'ar-taqyim-adaa-oqoubat-otla-haraka-intiqaliya-statut-2024.html',
    'ar-tarqiya-rotba-daraja-ansaq-ihada-tartib-statut-2024.html',
    'ar-tasjil-taadodiya-cnops-mgen-wataiq-taawidat.html',
    'ar-tawdif-tarsim-motadarribin-tarqiya-chahadat-master-statut-2024.html',
    'ar-tgr-eservices-tafil-cnie-shahadat-ojra-maroc.html',
    'article-6-minute-mas-test-protocol.html',
    'article-anaerobic-speed-reserve-asr-mas.html',
    'article-approche-competences.html',
    'article-association-sportive.html',
    'article-badminton-eps.html',
    'article-baremes-bac-sport-maroc-officiels-libres.html',
    'article-basket-3x3-eps.html',
    'article-basketball-eps.html',
    'article-beach-volley-eps.html',
    'article-calcul-allures-vma.html',
    'article-competition-scolaire.html',
    'article-concours-administration-educative.html',
    'article-concours-examen-professionnel-crmef-primaire.html',
    'article-concours-inspection-primaire.html',
    'article-concours-orientation-planification.html',
    'article-concours.html',
    'article-convert-beep-test-to-mas.html',
    'article-course-duree-eps.html',
    'article-creer-ass.html',
    'article-criteres.html',
    'article-difference-op-2007-2009-eps.html',
    'article-echauffement-eps.html',
    'article-eleves-timides.html',
    'article-eps-confiance-en-soi.html',
    'article-eps-coupe-du-monde-2030.html',
    'article-eps-inclusive-maroc.html',
    'article-eps-ramadan.html',
    'article-eps-reussite-scolaire.html',
    'article-erreurs-debutants.html',
    'article-eval.html',
    'article-examen-pro.html',
    'article-examen-sortie-crmef-eps.html',
    'article-fiche-seance-athletisme-eps.html',
    'article-football-eps.html',
    'article-gestes-arbitres-basketball.html',
    'article-gestion-grands-effectifs-dispenses-eps-maroc.html',
    'article-handball-eps.html',
    'article-inspection-pedagogique-titularisation-eps-maroc.html',
    'article-mas-interval-training-hiit-prescriptions.html',
    'article-mas-pace-chart-track-lap-splits.html',
    'article-mas-team-sports-conditioning-soccer-rugby.html',
    'article-mas-vs-vo2max-running-economy.html',
    'article-nutrition-sport-eps.html',
    'article-op.html',
    'article-oral-crmef-eps.html',
    'article-orientation-prof-eps.html',
    'article-predict-race-times-from-mas-vma.html',
    'article-prevention-blessures-eps.html',
    'article-projet-annuel-ass.html',
    'article-projet-etablissement-eps.html',
    'article-rugby-eps-maroc.html',
    'article-seance-gymnastique.html',
    'article-securite.html',
    'article-sport-etudes-maroc.html',
    'article-sport-scolaire-maroc.html',
    'article-structure-seance.html',
    'article-tennis-de-table-eps.html',
    'article-test-cooper-12-minutes.html',
    'article-test-demi-cooper-vma.html',
    'article-test-vameval-vma.html',
    'article-test-vma-eps.html',
    'article-volleyball-eps.html',
    'article-what-is-maximal-aerobic-speed-mas.html',
    'article-youth-mas-testing-physical-education.html',
    'cahier-de-textes-obligations-horaires-professeur-eps-maroc.html',
    'certificat-medical-dispense-eps-maroc-procedure-evaluation.html',
    'charge-entrainement-rpe-foster-monotonie-acwr.html',
    'commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html',
    'comparatif-generateur-eps-gratuit-maroc.html',
    'conseil-discipline-conseils-etablissement-incident-eps-maroc.html',
    'courir-forte-chaleur-point-de-rosee-altitude.html',
    'deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html',
    'formule-karvonen-zones-cardiaques-fc-reserve.html',
    'howto-preparer-bac-eps-maroc.html',
    'imc-sportif-masse-grasse-formule-deurenberg.html',
    'indice-endurance-peronnet-thibault-vma.html',
    'inspection-pedagogique-notation-avancement-professeur-eps-maroc.html',
    'intermittent-hiit-changement-direction-cod.html',
    'methode-vdot-jack-daniels-calcul-allures.html',
    'organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html',
    'qa-atd-eps.html',
    'qa-coefficient-eps-bac-maroc.html',
    'qa-difference-op-2007-2009.html',
    'qa-duree-seance-eps.html',
    'qa-evaluation-eps-bac.html',
    'qa-fiche-seance-eps.html',
    'qa-situation-apprentissage-eps.html',
    'qa-volume-horaire-eps-maroc.html',
    'reglement-badminton-bwf-arbitrage-eps.html',
    'reglement-basket-3x3-fiba-arbitrage-eps.html',
    'reglement-basketball-fiba-gestes-arbitrage-eps.html',
    'reglement-beach-volley-fivb-arbitrage-eps.html',
    'reglement-course-fond-1500m-3000m-5000m-marathon-eps.html',
    'reglement-course-haies-100m-110m-400m-athletisme-eps.html',
    'reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html',
    'reglement-course-steeple-3000m-2000m-athletisme-eps.html',
    'reglement-course-vitesse-100m-200m-400m-athletisme-eps.html',
    'reglement-football-lois-jeu-ifab-arbitrage-eps.html',
    'reglement-futsal-fifa-arbitrage-eps.html',
    'reglement-gymnastique-fig-code-pointage-eps.html',
    'reglement-handball-ihf-gestes-arbitrage-eps.html',
    'reglement-lancer-poids-athletisme-bac-eps.html',
    'reglement-lancers-disque-javelot-marteau-athletisme-eps.html',
    'reglement-rugby-world-rugby-arbitrage-eps.html',
    'reglement-saut-hauteur-perche-athletisme-eps.html',
    'reglement-saut-longueur-triple-saut-athletisme-eps.html',
    'reglement-tennis-de-table-ittf-arbitrage-eps.html',
    'reglement-volleyball-fivb-gestes-arbitrage-eps.html',
    'reserve-vitesse-anaerobie-asr-sports-co.html',
    'responsabilite-civile-penale-professeur-eps-maroc.html',
    'vma-differencier-course-duree-eps.html'
  ]);

  function getCurrentFileSlug() {
    var nav = document.getElementById('pepsNavbar');
    if (nav && nav.getAttribute('data-current-file')) {
      return nav.getAttribute('data-current-file').trim();
    }
    var p = window.location.pathname.split('/').pop() || 'index.html';
    if (!p || p === '/') return 'index.html';
    return p.indexOf('.html') === -1 ? p + '.html' : p;
  }

  function isRtlPage(slug) {
    return slug.indexOf('ar-') === 0 || document.documentElement.getAttribute('dir') === 'rtl';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function formatDateHuman(isoStr, isRtl) {
    if (!isoStr) return '';
    try {
      var d = new Date(isoStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(isRtl ? 'ar-MA' : 'fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (_e) {
      return '';
    }
  }

  function renderStarsSvg(rating) {
    var html = '<span class="peps-stars-inline" aria-label="Note ' + rating + ' sur 5">';
    for (var i = 1; i <= 5; i++) {
      var filled = i <= rating;
      html +=
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="' +
        (filled ? '#FFB300' : 'none') +
        '" stroke="' +
        (filled ? '#FFB300' : '#94A3B8') +
        '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
    html += '</span>';
    return html;
  }

  function getAdminPassword() {
    try {
      return sessionStorage.getItem(ADMIN_PASS_SESSION_KEY) || '';
    } catch (_e) {
      return '';
    }
  }

  function setAdminPassword(pw) {
    try {
      if (pw) sessionStorage.setItem(ADMIN_PASS_SESSION_KEY, pw);
      else sessionStorage.removeItem(ADMIN_PASS_SESSION_KEY);
    } catch (_e) {}
  }

  // =========================================================================
  // 1. HOMEPAGE TESTIMONIALS SECTION (ONLY ON index.html)
  // =========================================================================
  var homeSliderState = {
    items: [],
    page: 0,
    perPage: 3,
    totalPages: 1,
    timer: null,
    userPaused: false,
    hovered: false,
    focusedWithin: false,
    expandedCount: 0,
    eventsWired: false
  };

  function getTestimonialsPerPage() {
    var w = window.innerWidth || document.documentElement.clientWidth || 1200;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function isSliderAutoBlocked() {
    return (
      homeSliderState.userPaused ||
      homeSliderState.hovered ||
      homeSliderState.focusedWithin ||
      homeSliderState.expandedCount > 0 ||
      document.hidden ||
      homeSliderState.totalPages <= 1
    );
  }

  function updatePauseButtonUi() {
    var pauseBtn = document.getElementById('pepsSliderPauseBtn');
    if (!pauseBtn) return;
    if (homeSliderState.userPaused) {
      pauseBtn.classList.add('is-paused');
      pauseBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.setAttribute('aria-label', 'Reprendre le défilement automatique');
      pauseBtn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>' +
        '<span>Reprendre</span>';
    } else {
      pauseBtn.classList.remove('is-paused');
      pauseBtn.setAttribute('aria-pressed', 'false');
      pauseBtn.setAttribute('aria-label', 'Mettre en pause le défilement automatique');
      pauseBtn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>' +
        '<span>Pause</span>';
    }
  }

  function syncSliderAutoPlay() {
    if (homeSliderState.timer) {
      clearInterval(homeSliderState.timer);
      homeSliderState.timer = null;
    }
    updatePauseButtonUi();
    if (!isSliderAutoBlocked()) {
      homeSliderState.timer = setInterval(function () {
        goToTestimonialsSlide(homeSliderState.page + 1, true);
      }, 6000);
    }
  }

  function collapseAllExpandedCards() {
    var trackEl = document.getElementById('pepsHomeTestimonialsList');
    if (!trackEl) return;
    var btns = trackEl.querySelectorAll('.peps-read-more-btn[aria-expanded="true"]');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var wrap = btn.parentNode;
      var bodyEl = wrap ? wrap.querySelector('.peps-fb-body') : null;
      if (bodyEl) bodyEl.classList.add('is-clamped');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Lire la suite';
    }
    homeSliderState.expandedCount = 0;
  }

  function measureTestimonialReadMoreButtons() {
    var trackEl = document.getElementById('pepsHomeTestimonialsList');
    if (!trackEl) return;
    var wraps = trackEl.querySelectorAll('.peps-fb-body-wrap');
    for (var i = 0; i < wraps.length; i++) {
      var wrap = wraps[i];
      var bodyEl = wrap.querySelector('.peps-fb-body');
      var btn = wrap.querySelector('.peps-read-more-btn');
      if (!bodyEl || !btn) continue;
      if (btn.getAttribute('aria-expanded') === 'true') {
        btn.hidden = false;
        continue;
      }
      bodyEl.classList.add('is-clamped');
      var isTruncated = bodyEl.scrollHeight > bodyEl.clientHeight + 2;
      btn.hidden = !isTruncated;
    }
  }

  function goToTestimonialsSlide(targetPage, collapseExpanded) {
    var trackEl = document.getElementById('pepsHomeTestimonialsList');
    if (!trackEl || homeSliderState.totalPages <= 0) return;

    if (collapseExpanded) {
      collapseAllExpandedCards();
    }

    var total = homeSliderState.totalPages;
    var nextPage = ((targetPage % total) + total) % total;
    homeSliderState.page = nextPage;
    trackEl.style.transform = 'translateX(-' + (nextPage * 100) + '%)';

    var dotsWrap = document.getElementById('pepsSliderDots');
    if (dotsWrap) {
      var dots = dotsWrap.querySelectorAll('.peps-slider-dot');
      for (var i = 0; i < dots.length; i++) {
        var active = i === nextPage;
        dots[i].classList.toggle('active', active);
        if (active) dots[i].setAttribute('aria-current', 'true');
        else dots[i].removeAttribute('aria-current');
      }
    }

    var counterEl = document.getElementById('pepsSliderCounter');
    if (counterEl && homeSliderState.items.length > 0) {
      var start = nextPage * homeSliderState.perPage + 1;
      var end = Math.min(homeSliderState.items.length, start + homeSliderState.perPage - 1);
      counterEl.textContent = start + '–' + end + ' sur ' + homeSliderState.items.length + ' avis';
    }

    syncSliderAutoPlay();
  }

  function renderTestimonialsSlider(preserveFirstIndex) {
    var sliderWrap = document.getElementById('pepsHomeTestimonialsSliderWrap');
    var trackEl = document.getElementById('pepsHomeTestimonialsList');
    var controlsEl = document.getElementById('pepsSliderControls');
    var dotsWrap = document.getElementById('pepsSliderDots');
    if (!sliderWrap || !trackEl) return;

    var items = homeSliderState.items;
    if (!items || items.length === 0) {
      sliderWrap.style.display = 'none';
      trackEl.innerHTML = '';
      if (homeSliderState.timer) {
        clearInterval(homeSliderState.timer);
        homeSliderState.timer = null;
      }
      return;
    }

    var perPage = getTestimonialsPerPage();
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    homeSliderState.perPage = perPage;
    homeSliderState.totalPages = totalPages;
    homeSliderState.expandedCount = 0;

    if (typeof preserveFirstIndex === 'number' && preserveFirstIndex >= 0) {
      homeSliderState.page = Math.min(totalPages - 1, Math.floor(preserveFirstIndex / perPage));
    } else {
      homeSliderState.page = Math.min(totalPages - 1, Math.max(0, homeSliderState.page));
    }

    var pagesHtml = '';
    for (var p = 0; p < totalPages; p++) {
      var sliceStart = p * perPage;
      var sliceEnd = Math.min(items.length, sliceStart + perPage);
      pagesHtml += '<div class="peps-fb-slide-page" role="group" aria-roledescription="slide" aria-label="Groupe ' + (p + 1) + ' sur ' + totalPages + '">';
      for (var j = sliceStart; j < sliceEnd; j++) {
        var item = items[j];
        var metaParts = [];
        if (item.profession) metaParts.push('<span dir="auto">' + escapeHtml(item.profession) + '</span>');
        if (item.city) metaParts.push('<span dir="auto">' + escapeHtml(item.city) + '</span>');
        var dateStr = formatDateHuman(item.createdAtIso, false);
        if (dateStr) metaParts.push('<span dir="ltr">' + escapeHtml(dateStr) + '</span>');

        pagesHtml +=
          '<article class="peps-fb-card" data-fb-id="' + escapeHtml(item.id) + '">' +
            '<div class="peps-fb-card-top">' +
              '<div>' +
                '<strong class="peps-fb-author" dir="auto">' + escapeHtml(item.name) + '</strong>' +
                (metaParts.length > 0
                  ? '<div class="peps-fb-meta">' + metaParts.join(' <span aria-hidden="true">·</span> ') + '</div>'
                  : '') +
              '</div>' +
              renderStarsSvg(Number(item.rating) || 5) +
            '</div>' +
            '<div class="peps-fb-body-wrap">' +
              '<p class="peps-fb-body is-clamped" dir="auto">' + escapeHtml(item.comment) + '</p>' +
              '<button type="button" class="peps-read-more-btn" aria-expanded="false" hidden>Lire la suite</button>' +
            '</div>' +
            '<div class="peps-fb-card-foot">' +
              '<button type="button" class="peps-report-btn" data-report-type="testimonial" data-report-id="' + escapeHtml(item.id) + '">Signaler</button>' +
            '</div>' +
          '</article>';
      }
      pagesHtml += '</div>';
    }

    sliderWrap.style.display = 'block';
    trackEl.innerHTML = pagesHtml;

    var readMoreBtns = trackEl.querySelectorAll('.peps-read-more-btn');
    for (var b = 0; b < readMoreBtns.length; b++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var wrap = btn.parentNode;
          var bodyEl = wrap ? wrap.querySelector('.peps-fb-body') : null;
          if (!bodyEl) return;
          var willExpand = btn.getAttribute('aria-expanded') !== 'true';
          if (willExpand) {
            bodyEl.classList.remove('is-clamped');
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = 'Réduire';
          } else {
            bodyEl.classList.add('is-clamped');
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = 'Lire la suite';
          }
          homeSliderState.expandedCount = trackEl.querySelectorAll('.peps-read-more-btn[aria-expanded="true"]').length;
          syncSliderAutoPlay();
        });
      })(readMoreBtns[b]);
    }

    if (controlsEl) {
      controlsEl.style.display = totalPages > 1 ? 'flex' : 'none';
    }

    if (dotsWrap) {
      var dotsHtml = '';
      if (totalPages > 1) {
        for (var d = 0; d < totalPages; d++) {
          dotsHtml +=
            '<button type="button" class="peps-slider-dot' +
            (d === homeSliderState.page ? ' active' : '') +
            '" data-slide-page="' + d + '" aria-label="Afficher le groupe ' + (d + 1) + ' sur ' + totalPages + '"' +
            (d === homeSliderState.page ? ' aria-current="true"' : '') +
            '></button>';
        }
      }
      dotsWrap.innerHTML = dotsHtml;
      var dotBtns = dotsWrap.querySelectorAll('.peps-slider-dot');
      for (var k = 0; k < dotBtns.length; k++) {
        (function (dotBtn) {
          dotBtn.addEventListener('click', function () {
            var idx = Number(dotBtn.getAttribute('data-slide-page')) || 0;
            goToTestimonialsSlide(idx, true);
          });
        })(dotBtns[k]);
      }
    }

    wireReportAndDeleteButtons(trackEl, function () {
      loadHomepageTestimonials(false);
    });
    goToTestimonialsSlide(homeSliderState.page, false);

    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(measureTestimonialReadMoreButtons);
    } else {
      measureTestimonialReadMoreButtons();
    }
  }

  function wireTestimonialsSliderEvents() {
    if (homeSliderState.eventsWired) return;
    var sliderWrap = document.getElementById('pepsHomeTestimonialsSliderWrap');
    if (!sliderWrap) return;
    homeSliderState.eventsWired = true;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      homeSliderState.userPaused = true;
    }

    var prevBtn = document.getElementById('pepsSliderPrevBtn');
    var nextBtn = document.getElementById('pepsSliderNextBtn');
    var pauseBtn = document.getElementById('pepsSliderPauseBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToTestimonialsSlide(homeSliderState.page - 1, true);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToTestimonialsSlide(homeSliderState.page + 1, true);
      });
    }
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        homeSliderState.userPaused = !homeSliderState.userPaused;
        syncSliderAutoPlay();
      });
    }

    sliderWrap.addEventListener('mouseenter', function () {
      homeSliderState.hovered = true;
      syncSliderAutoPlay();
    });
    sliderWrap.addEventListener('mouseleave', function () {
      homeSliderState.hovered = false;
      syncSliderAutoPlay();
    });
    sliderWrap.addEventListener('focusin', function () {
      homeSliderState.focusedWithin = true;
      syncSliderAutoPlay();
    });
    sliderWrap.addEventListener('focusout', function (e) {
      if (!e.relatedTarget || !sliderWrap.contains(e.relatedTarget)) {
        homeSliderState.focusedWithin = false;
        syncSliderAutoPlay();
      }
    });

    sliderWrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToTestimonialsSlide(homeSliderState.page - 1, true);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToTestimonialsSlide(homeSliderState.page + 1, true);
      }
    });

    var touchStartX = 0;
    var touchStartY = 0;
    sliderWrap.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    sliderWrap.addEventListener('touchend', function (e) {
      if (!e.changedTouches || !e.changedTouches[0] || homeSliderState.totalPages <= 1) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx < 0) goToTestimonialsSlide(homeSliderState.page + 1, true);
        else goToTestimonialsSlide(homeSliderState.page - 1, true);
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      syncSliderAutoPlay();
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!homeSliderState.items || homeSliderState.items.length === 0) return;
        var nextPerPage = getTestimonialsPerPage();
        if (nextPerPage !== homeSliderState.perPage) {
          var firstIdx = homeSliderState.page * homeSliderState.perPage;
          renderTestimonialsSlider(firstIdx);
        } else {
          measureTestimonialReadMoreButtons();
        }
      }, 150);
    });
  }

  function mountHomepageTestimonials() {
    var existingSection = document.getElementById('peps-home-testimonials');
    if (existingSection && existingSection.getAttribute('data-peps-fb-mounted') === '1') return;

    var targetAnchor = document.getElementById('communaute-et-journal') || document.getElementById('profeps-unified-footer');
    if (!existingSection && !targetAnchor) return;

    var section = existingSection || document.createElement('section');
    section.className = 'atlas-section peps-feedback-section';
    section.id = 'peps-home-testimonials';
    section.setAttribute('data-peps-fb-mounted', '1');
    section.innerHTML =
      '<div class="atlas-container">' +
        '<div class="peps-fb-header">' +
          '<div>' +
            '<span class="atlas-hand-note">Retours d\'expérience de la communauté EPS</span>' +
            '<h2 class="peps-fb-title">Témoignages des enseignants &amp; candidats CRMEF</h2>' +
            '<div id="pepsHomeAvgWrap" class="peps-fb-avg-wrap" style="display:none;"></div>' +
          '</div>' +
          '<div class="peps-fb-header-actions">' +
            '<button type="button" id="pepsBtnToggleReviewForm" class="btn-atlas-primary peps-nowrap-btn" style="display:none;">' +
              'Rédiger un avis' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<!-- Testimonials Carousel (3 visible on desktop, 2 on tablet, 1 on mobile) -->' +
        '<div id="pepsHomeTestimonialsSliderWrap" class="peps-fb-slider-wrap" style="display:none;" role="region" aria-roledescription="carrousel" aria-label="Témoignages des enseignants">' +
          '<div class="peps-fb-slider-viewport">' +
            '<div id="pepsHomeTestimonialsList" class="peps-fb-slider-track" aria-live="polite"></div>' +
          '</div>' +
          '<div id="pepsSliderControls" class="peps-fb-slider-controls">' +
            '<div class="peps-fb-slider-nav-group">' +
              '<button type="button" id="pepsSliderPrevBtn" class="peps-slider-arrow-btn" aria-label="Avis précédents">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
              '</button>' +
              '<button type="button" id="pepsSliderNextBtn" class="peps-slider-arrow-btn" aria-label="Avis suivants">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
              '</button>' +
              '<button type="button" id="pepsSliderPauseBtn" class="peps-slider-pause-btn" aria-pressed="false" aria-label="Mettre en pause le défilement automatique">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>' +
                '<span>Pause</span>' +
              '</button>' +
            '</div>' +
            '<div id="pepsSliderDots" class="peps-fb-slider-dots" role="tablist" aria-label="Pages de témoignages"></div>' +
            '<div id="pepsSliderCounter" class="peps-fb-slider-counter"></div>' +
          '</div>' +
        '</div>' +

        '<!-- Permanent Review Form Below Slider -->' +
        '<div id="pepsHomeReviewFormWrap" class="peps-fb-form-card" style="display:block;">' +
          '<form id="pepsHomeReviewForm" novalidate>' +
            '<div class="peps-fb-form-head">' +
              '<h3 class="peps-fb-form-subtitle">Partager votre avis sur ProfEPS.ma</h3>' +
              '<p class="peps-fb-form-note">Les champs marqués d\'une astérisque (*) sont obligatoires. Aucun compte requis.</p>' +
            '</div>' +
            '<!-- Honeypot field (hidden from humans) -->' +
            '<div class="peps-hp-trap" aria-hidden="true">' +
              '<label for="pepsHomeHpUrl">Ne pas remplir ce champ</label>' +
              '<input type="text" id="pepsHomeHpUrl" name="website_url" tabindex="-1" autocomplete="off">' +
            '</div>' +
            '<!-- Star Rating Selector (0/5 by default) -->' +
            '<div class="peps-fb-field">' +
              '<label class="peps-fb-label">Votre note globale <span class="peps-req">*</span></label>' +
              '<div class="peps-star-picker" id="pepsHomeStarPicker" role="radiogroup" aria-label="Choisir une note de 1 à 5 étoiles">' +
                createStarPickerButtonsHtml('home') +
                '<span id="pepsHomeStarHint" class="peps-star-hint">Sélectionnez une note (1 à 5 ★)</span>' +
              '</div>' +
            '</div>' +
            '<div class="peps-fb-grid-3">' +
              '<div class="peps-fb-field">' +
                '<label for="pepsHomeName" class="peps-fb-label">Nom ou Prénom <span class="peps-req">*</span></label>' +
                '<input type="text" id="pepsHomeName" class="peps-fb-input" required minlength="2" maxlength="60" placeholder="Ex : Youssef B.">' +
              '</div>' +
              '<div class="peps-fb-field">' +
                '<label for="pepsHomeProf" class="peps-fb-label">Profession / Statut <span class="peps-opt">(facultatif)</span></label>' +
                '<input type="text" id="pepsHomeProf" class="peps-fb-input" maxlength="80" placeholder="Ex : Professeur EPS Collège, Candidat CRMEF">' +
              '</div>' +
              '<div class="peps-fb-field">' +
                '<label for="pepsHomeCity" class="peps-fb-label">Ville ou AREF <span class="peps-opt">(facultatif)</span></label>' +
                '<input type="text" id="pepsHomeCity" class="peps-fb-input" maxlength="80" placeholder="Ex : AREF Casablanca-Settat">' +
              '</div>' +
            '</div>' +
            '<div class="peps-fb-field">' +
              '<div class="peps-fb-label-row">' +
                '<label for="pepsHomeComment" class="peps-fb-label">Votre commentaire <span class="peps-req">*</span></label>' +
                '<span id="pepsHomeCharCount" class="peps-char-counter">0 / 800</span>' +
              '</div>' +
              '<textarea id="pepsHomeComment" class="peps-fb-textarea" rows="3" required minlength="5" maxlength="800" placeholder="Quels outils ou documents vous ont le plus aidé dans votre préparation ?"></textarea>' +
            '</div>' +
            '<div id="pepsHomeFormStatus" class="peps-fb-status" role="status" aria-live="polite"></div>' +
            '<div class="peps-fb-form-actions">' +
              '<button type="submit" id="pepsHomeSubmitBtn" class="btn-atlas-primary peps-nowrap-btn">Publier mon avis</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';

    if (!existingSection && targetAnchor && targetAnchor.parentNode) {
      targetAnchor.parentNode.insertBefore(section, targetAnchor);
    }

    var selectedRating = 0;
    var formOpenedAt = Date.now();
    var formWrap = document.getElementById('pepsHomeReviewFormWrap');
    var jumpBtn = document.getElementById('pepsBtnToggleReviewForm');
    var commentInput = document.getElementById('pepsHomeComment');
    var charCount = document.getElementById('pepsHomeCharCount');

    if (jumpBtn && formWrap) {
      jumpBtn.addEventListener('click', function () {
        formWrap.style.display = 'block';
        formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(function () {
          var nameEl = document.getElementById('pepsHomeName');
          if (nameEl) nameEl.focus({ preventScroll: true });
        }, 350);
      });
    }

    if (commentInput && charCount) {
      commentInput.addEventListener('input', function () {
        if (!formOpenedAt) formOpenedAt = Date.now();
        charCount.textContent = commentInput.value.length + ' / 800';
      });
    }

    wireStarPicker('pepsHomeStarPicker', 'pepsHomeStarHint', function (val) {
      if (!formOpenedAt) formOpenedAt = Date.now();
      selectedRating = val;
    });

    var formEl = document.getElementById('pepsHomeReviewForm');
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('pepsHomeFormStatus');
      var submitBtn = document.getElementById('pepsHomeSubmitBtn');
      var nameVal = (document.getElementById('pepsHomeName').value || '').trim();
      var profVal = (document.getElementById('pepsHomeProf').value || '').trim();
      var cityVal = (document.getElementById('pepsHomeCity').value || '').trim();
      var commVal = (document.getElementById('pepsHomeComment').value || '').trim();
      var hpVal = (document.getElementById('pepsHomeHpUrl').value || '').trim();

      if (selectedRating < 1 || selectedRating > 5) {
        setStatusMessage(statusEl, 'error', 'Veuillez cliquer sur une étoile (de 1 à 5 ★) pour noter le site.');
        return;
      }
      if (nameVal.length < 2) {
        setStatusMessage(statusEl, 'error', 'Veuillez indiquer votre nom ou prénom (minimum 2 caractères).');
        return;
      }
      if (commVal.length < 5) {
        setStatusMessage(statusEl, 'error', 'Veuillez écrire un avis d\'au moins 5 caractères.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Publication en cours...';
      setStatusMessage(statusEl, 'info', 'Vérification anti-spam et enregistrement...');

      var elapsed = formOpenedAt ? Date.now() - formOpenedAt : 0;
      var waitBeforeSend = elapsed < 3100 ? 3100 - elapsed : 0;

      setTimeout(function () {
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_testimonial',
            rating: selectedRating,
            name: nameVal,
            profession: profVal,
            city: cityVal,
            comment: commVal,
            source: 'homepage',
            website_url: hpVal,
            formOpenedAt: formOpenedAt || Date.now() - 4000,
            dwellMs: Math.max(3500, elapsed + waitBeforeSend)
          })
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publier mon avis';
            if (!data || !data.success) {
              setStatusMessage(statusEl, 'error', (data && data.error) || 'Erreur lors de la publication.');
              return;
            }
            try { localStorage.setItem(FIRST_DOC_STORAGE_KEY, '1'); } catch (_e) {}
            formEl.reset();
            if (charCount) charCount.textContent = '0 / 800';
            selectedRating = 0;
            resetStarPicker('pepsHomeStarPicker', 'pepsHomeStarHint');
            setStatusMessage(statusEl, 'success', 'Merci ! Votre avis a été publié avec succès.');
            loadHomepageTestimonials(true);
            setTimeout(function () {
              setStatusMessage(statusEl, '', '');
            }, 3500);
          })
          .catch(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publier mon avis';
            setStatusMessage(statusEl, 'error', 'Impossible de contacter le serveur. Veuillez réessayer.');
          });
      }, waitBeforeSend);
    });

    wireTestimonialsSliderEvents();
    loadHomepageTestimonials(true);
  }

  function loadHomepageTestimonials(resetToFirstPage) {
    var sliderWrap = document.getElementById('pepsHomeTestimonialsSliderWrap');
    var trackEl = document.getElementById('pepsHomeTestimonialsList');
    var avgWrap = document.getElementById('pepsHomeAvgWrap');
    var formWrap = document.getElementById('pepsHomeReviewFormWrap');
    var jumpBtn = document.getElementById('pepsBtnToggleReviewForm');
    if (!trackEl) return;

    fetch('/api/feedback?type=testimonials')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var items = (data && Array.isArray(data.items)) ? data.items : [];
        homeSliderState.items = items;
        if (resetToFirstPage) homeSliderState.page = 0;

        if (formWrap) formWrap.style.display = 'block';

        if (items.length === 0) {
          if (avgWrap) {
            avgWrap.style.display = 'none';
            avgWrap.innerHTML = '';
          }
          if (sliderWrap) sliderWrap.style.display = 'none';
          trackEl.innerHTML = '';
          if (jumpBtn) jumpBtn.style.display = 'none';
          if (homeSliderState.timer) {
            clearInterval(homeSliderState.timer);
            homeSliderState.timer = null;
          }
          return;
        }

        // Rule #4: Show average rating ONLY if >= 3 reviews exist, without Schema.org AggregateRating
        if (avgWrap) {
          if (items.length >= 3) {
            var sum = 0;
            for (var i = 0; i < items.length; i++) sum += Number(items[i].rating) || 5;
            var avg = (sum / items.length).toFixed(1);
            avgWrap.style.display = 'flex';
            avgWrap.innerHTML =
              renderStarsSvg(Math.round(Number(avg))) +
              '<span class="peps-avg-num">' + avg + ' / 5</span>' +
              '<span aria-hidden="true">·</span>' +
              '<span>Basé sur ' + items.length + ' avis d\'enseignants</span>';
          } else {
            avgWrap.style.display = 'none';
            avgWrap.innerHTML = '';
          }
        }

        if (jumpBtn) {
          jumpBtn.style.display = 'inline-flex';
          jumpBtn.textContent = 'Rédiger un avis';
        }
        renderTestimonialsSlider();
      })
      .catch(function () {
        homeSliderState.items = [];
        if (sliderWrap) sliderWrap.style.display = 'none';
        trackEl.innerHTML = '';
        if (formWrap) formWrap.style.display = 'block';
        if (jumpBtn) jumpBtn.style.display = 'none';
      });
  }

  // =========================================================================
  // 2. BLOG ARTICLE COMMENTS SECTION (ONLY ON THE 129 BLOG ARTICLES)
  // =========================================================================
  function mountArticleComments(slug) {
    if (document.getElementById('peps-article-comments-section')) return;
    var anchor =
      document.querySelector('.peps-related-mesh') ||
      document.getElementById('profeps-unified-footer') ||
      document.querySelector('footer');
    if (!anchor) return;

    var rtl = isRtlPage(slug);
    var labels = rtl
      ? {
          kicker: 'نقاش تربوي وتبادل الخبرات',
          title: 'التعليقات والأسئلة التربوية حول المقال',
          sub: 'شارك تجربتك الميدانية أو اطرح سؤالك. الحقول المشار إليها بـ (*) إجبارية.',
          nameLabel: 'الاسم الكامل أو الشخصي',
          profLabel: 'المهنة / الصفة (اختياري)',
          profPlaceholder: 'مثال: أستاذ التربية البدنية، مترشح لمباراة التعليم',
          cityLabel: 'المدينة أو الأكاديمية (اختياري)',
          cityPlaceholder: 'مثال: أكاديمية الدار البيضاء سطات',
          commentLabel: 'تعليقك أو سؤالك التربوي',
          commentPlaceholder: 'اكتب تعليقك أو ملاحظتك التربوية هنا...',
          submitBtn: 'نشر التعليق',
          emptyText: 'لا توجد تعليقات بعد. كن أول من يشارك تعليقاً تربوياً حول هذا المقال.',
          reportBtn: 'إبلاغ'
        }
      : {
          kicker: 'Discussion & retour de terrain',
          title: 'Commentaires & Questions Pédagogiques',
          sub: 'Partagez votre retour d\'expérience ou posez une question sur cet article. Nom et commentaire obligatoires (*).',
          nameLabel: 'Nom ou Prénom',
          profLabel: 'Profession / Statut (facultatif)',
          profPlaceholder: 'Ex : Professeur EPS, Candidat CRMEF',
          cityLabel: 'Ville ou AREF (facultatif)',
          cityPlaceholder: 'Ex : AREF Rabat-Salé-Kénitra',
          commentLabel: 'Votre commentaire',
          commentPlaceholder: 'Rédigez votre commentaire ou question pédagogique...',
          submitBtn: 'Publier le commentaire',
          emptyText: 'Aucun commentaire pour le moment. Soyez le premier à réagir à cet article.',
          reportBtn: 'Signaler'
        };

    var section = document.createElement('section');
    section.id = 'peps-article-comments-section';
    section.className = 'peps-article-comments-wrap';
    if (rtl) section.setAttribute('dir', 'rtl');

    section.innerHTML =
      '<div class="peps-art-comments-card">' +
        '<div class="peps-fb-header">' +
          '<div>' +
            '<span class="atlas-hand-note">' + labels.kicker + '</span>' +
            '<h2 class="peps-fb-title">' + labels.title + '</h2>' +
            '<p class="peps-fb-form-note">' + labels.sub + '</p>' +
          '</div>' +
        '</div>' +

        '<form id="pepsArticleCommentForm" class="peps-art-form" novalidate>' +
          '<div class="peps-hp-trap" aria-hidden="true">' +
            '<input type="text" id="pepsArtHpUrl" name="website_url" tabindex="-1" autocomplete="off">' +
          '</div>' +
          '<div class="peps-fb-grid-3">' +
            '<div class="peps-fb-field">' +
              '<label for="pepsArtName" class="peps-fb-label">' + labels.nameLabel + ' <span class="peps-req">*</span></label>' +
              '<input type="text" id="pepsArtName" class="peps-fb-input" required minlength="2" maxlength="60">' +
            '</div>' +
            '<div class="peps-fb-field">' +
              '<label for="pepsArtProf" class="peps-fb-label">' + labels.profLabel + '</label>' +
              '<input type="text" id="pepsArtProf" class="peps-fb-input" maxlength="80" placeholder="' + labels.profPlaceholder + '">' +
            '</div>' +
            '<div class="peps-fb-field">' +
              '<label for="pepsArtCity" class="peps-fb-label">' + labels.cityLabel + '</label>' +
              '<input type="text" id="pepsArtCity" class="peps-fb-input" maxlength="80" placeholder="' + labels.cityPlaceholder + '">' +
            '</div>' +
          '</div>' +
          '<div class="peps-fb-field">' +
            '<div class="peps-fb-label-row">' +
              '<label for="pepsArtComment" class="peps-fb-label">' + labels.commentLabel + ' <span class="peps-req">*</span></label>' +
              '<span id="pepsArtCharCount" class="peps-char-counter">0 / 800</span>' +
            '</div>' +
            '<textarea id="pepsArtComment" class="peps-fb-textarea" rows="3" required minlength="5" maxlength="800" placeholder="' + labels.commentPlaceholder + '"></textarea>' +
          '</div>' +
          '<div id="pepsArtFormStatus" class="peps-fb-status" role="status" aria-live="polite"></div>' +
          '<div class="peps-fb-form-actions">' +
            '<button type="submit" id="pepsArtSubmitBtn" class="btn-atlas-primary peps-nowrap-btn">' + labels.submitBtn + '</button>' +
          '</div>' +
        '</form>' +

        '<div id="pepsArticleCommentsList" class="peps-art-comments-list"></div>' +
      '</div>';

    anchor.parentNode.insertBefore(section, anchor);

    var formOpenedAt = 0;
    var nameInput = document.getElementById('pepsArtName');
    var commentInput = document.getElementById('pepsArtComment');
    var charCount = document.getElementById('pepsArtCharCount');

    nameInput.addEventListener('focus', function () {
      if (!formOpenedAt) formOpenedAt = Date.now();
    });
    commentInput.addEventListener('input', function () {
      if (!formOpenedAt) formOpenedAt = Date.now();
      charCount.textContent = commentInput.value.length + ' / 800';
    });

    function loadArticleComments() {
      var listEl = document.getElementById('pepsArticleCommentsList');
      if (!listEl) return;
      fetch('/api/feedback?type=comments&slug=' + encodeURIComponent(slug))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var items = (data && Array.isArray(data.items)) ? data.items : [];
          if (items.length === 0) {
            listEl.innerHTML = '<div class="peps-art-empty">' + labels.emptyText + '</div>';
            return;
          }
          var html = '';
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var metaParts = [];
            if (item.profession) metaParts.push(escapeHtml(item.profession));
            if (item.city) metaParts.push(escapeHtml(item.city));
            var dateStr = formatDateHuman(item.createdAtIso, rtl);
            if (dateStr) metaParts.push(dateStr);

            html +=
              '<article class="peps-fb-card" data-fb-id="' + escapeHtml(item.id) + '">' +
                '<div class="peps-fb-card-top">' +
                  '<div>' +
                    '<strong class="peps-fb-author">' + escapeHtml(item.name) + '</strong>' +
                    (metaParts.length > 0
                      ? '<div class="peps-fb-meta">' + metaParts.join(' <span aria-hidden="true">·</span> ') + '</div>'
                      : '') +
                  '</div>' +
                '</div>' +
                '<p class="peps-fb-body">' + escapeHtml(item.comment) + '</p>' +
                '<div class="peps-fb-card-foot">' +
                  '<button type="button" class="peps-report-btn" data-report-type="comment" data-report-id="' + escapeHtml(item.id) + '">' + labels.reportBtn + '</button>' +
                '</div>' +
              '</article>';
          }
          listEl.innerHTML = html;
          wireReportAndDeleteButtons(listEl, loadArticleComments);
        })
        .catch(function () {
          listEl.innerHTML = '<div class="peps-art-empty">' + labels.emptyText + '</div>';
        });
    }

    var formEl = document.getElementById('pepsArticleCommentForm');
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('pepsArtFormStatus');
      var submitBtn = document.getElementById('pepsArtSubmitBtn');
      var nameVal = (nameInput.value || '').trim();
      var profVal = (document.getElementById('pepsArtProf').value || '').trim();
      var cityVal = (document.getElementById('pepsArtCity').value || '').trim();
      var commVal = (commentInput.value || '').trim();
      var hpVal = (document.getElementById('pepsArtHpUrl').value || '').trim();

      if (nameVal.length < 2) {
        setStatusMessage(statusEl, 'error', rtl ? 'يرجى إدخال الاسم (حرفان على الأقل).' : 'Veuillez indiquer votre nom (minimum 2 caractères).');
        return;
      }
      if (commVal.length < 5) {
        setStatusMessage(statusEl, 'error', rtl ? 'يرجى كتابة تعليق واضح.' : 'Veuillez rédiger un commentaire (minimum 5 caractères).');
        return;
      }

      submitBtn.disabled = true;
      var elapsed = formOpenedAt ? Date.now() - formOpenedAt : 0;
      var waitBeforeSend = elapsed < 3100 ? 3100 - elapsed : 0;

      setTimeout(function () {
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_comment',
            articleSlug: slug,
            name: nameVal,
            profession: profVal,
            city: cityVal,
            comment: commVal,
            website_url: hpVal,
            formOpenedAt: formOpenedAt || Date.now() - 4000,
            dwellMs: Math.max(3500, elapsed + waitBeforeSend)
          })
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            submitBtn.disabled = false;
            if (!data || !data.success) {
              setStatusMessage(statusEl, 'error', (data && data.error) || 'Erreur lors de l\'envoi.');
              return;
            }
            formEl.reset();
            charCount.textContent = '0 / 800';
            setStatusMessage(statusEl, 'success', rtl ? 'شكراً لك! تم نشر تعليقك بنجاح.' : 'Merci ! Votre commentaire a été publié.');
            loadArticleComments();
            setTimeout(function () {
              setStatusMessage(statusEl, '', '');
            }, 3000);
          })
          .catch(function () {
            submitBtn.disabled = false;
            setStatusMessage(statusEl, 'error', 'Erreur réseau. Veuillez réessayer.');
          });
      }, waitBeforeSend);
    });

    loadArticleComments();
  }

  // =========================================================================
  // 3. FIRST DOCUMENT GENERATION / DOWNLOAD POPUP (ONCE PER VISITOR, +1.5s)
  // =========================================================================
  function hasAlreadyPromptedFirstDownload() {
    try {
      return localStorage.getItem(FIRST_DOC_STORAGE_KEY) === '1';
    } catch (_e) {
      return false;
    }
  }

  function markFirstDownloadPrompted() {
    try {
      localStorage.setItem(FIRST_DOC_STORAGE_KEY, '1');
    } catch (_e) {}
  }

  function showFirstDownloadRatingPopup() {
    if (hasAlreadyPromptedFirstDownload()) return;
    if (document.getElementById('pepsFirstDownloadModal')) return;
    markFirstDownloadPrompted();

    var modalOpenedAt = Date.now();
    var selectedRating = 0;

    var overlay = document.createElement('div');
    overlay.id = 'pepsFirstDownloadModal';
    overlay.className = 'peps-modal-backdrop';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'pepsModalTitle');

    overlay.innerHTML =
      '<div class="peps-modal-card">' +
        '<div class="peps-modal-head">' +
          '<div>' +
            '<span class="atlas-hand-note">Votre document est prêt</span>' +
            '<h3 id="pepsModalTitle" class="peps-modal-title">Ce document vous est utile ? Notez ProfEPS.ma</h3>' +
            '<p class="peps-fb-form-note">Votre avis aide les enseignants d\'EPS et candidats CRMEF au Maroc. Nom, note et commentaire obligatoires (*).</p>' +
          '</div>' +
          '<button type="button" id="pepsModalCloseBtn" class="peps-modal-close" aria-label="Fermer">✕</button>' +
        '</div>' +

        '<form id="pepsModalReviewForm" novalidate>' +
          '<div class="peps-hp-trap" aria-hidden="true">' +
            '<input type="text" id="pepsModalHpUrl" name="website_url" tabindex="-1" autocomplete="off">' +
          '</div>' +
          '<div class="peps-fb-field">' +
            '<label class="peps-fb-label">Votre note <span class="peps-req">*</span></label>' +
            '<div class="peps-star-picker" id="pepsModalStarPicker" role="radiogroup" aria-label="Choisir une note de 1 à 5 étoiles">' +
              createStarPickerButtonsHtml('modal') +
              '<span id="pepsModalStarHint" class="peps-star-hint">Cliquez pour noter (1 à 5 ★)</span>' +
            '</div>' +
          '</div>' +
          '<div class="peps-fb-field">' +
            '<label for="pepsModalName" class="peps-fb-label">Nom ou Prénom <span class="peps-req">*</span></label>' +
            '<input type="text" id="pepsModalName" class="peps-fb-input" required minlength="2" maxlength="60" placeholder="Votre nom ou prénom">' +
          '</div>' +
          '<div class="peps-fb-grid-2">' +
            '<div class="peps-fb-field">' +
              '<label for="pepsModalProf" class="peps-fb-label">Profession <span class="peps-opt">(facultatif)</span></label>' +
              '<input type="text" id="pepsModalProf" class="peps-fb-input" maxlength="80" placeholder="Ex : Prof EPS, Candidat CRMEF">' +
            '</div>' +
            '<div class="peps-fb-field">' +
              '<label for="pepsModalCity" class="peps-fb-label">Ville / AREF <span class="peps-opt">(facultatif)</span></label>' +
              '<input type="text" id="pepsModalCity" class="peps-fb-input" maxlength="80" placeholder="Ex : Rabat, Fès...">' +
            '</div>' +
          '</div>' +
          '<div class="peps-fb-field">' +
            '<label for="pepsModalComment" class="peps-fb-label">Votre commentaire <span class="peps-req">*</span></label>' +
            '<textarea id="pepsModalComment" class="peps-fb-textarea" rows="3" required minlength="10" maxlength="800" placeholder="Que pensez-vous de la qualité des fiches, grilles ou documents ?"></textarea>' +
          '</div>' +
          '<div id="pepsModalStatus" class="peps-fb-status" role="status" aria-live="polite"></div>' +
          '<div class="peps-fb-form-actions">' +
            '<button type="button" id="pepsModalSkipBtn" class="btn-atlas-secondary peps-nowrap-btn">Plus tard</button>' +
            '<button type="submit" id="pepsModalSubmitBtn" class="btn-atlas-primary peps-nowrap-btn">Envoyer mon avis</button>' +
          '</div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(overlay);

    function closeModal() {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }

    document.getElementById('pepsModalCloseBtn').addEventListener('click', closeModal);
    document.getElementById('pepsModalSkipBtn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    wireStarPicker('pepsModalStarPicker', 'pepsModalStarHint', function (val) {
      selectedRating = val;
    });

    var formEl = document.getElementById('pepsModalReviewForm');
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('pepsModalStatus');
      var submitBtn = document.getElementById('pepsModalSubmitBtn');
      var nameVal = (document.getElementById('pepsModalName').value || '').trim();
      var profVal = (document.getElementById('pepsModalProf').value || '').trim();
      var cityVal = (document.getElementById('pepsModalCity').value || '').trim();
      var commVal = (document.getElementById('pepsModalComment').value || '').trim();
      var hpVal = (document.getElementById('pepsModalHpUrl').value || '').trim();

      if (selectedRating < 1 || selectedRating > 5) {
        setStatusMessage(statusEl, 'error', 'Veuillez sélectionner une note de 1 à 5 étoiles.');
        return;
      }
      if (nameVal.length < 2) {
        setStatusMessage(statusEl, 'error', 'Le nom est obligatoire (minimum 2 caractères).');
        return;
      }
      if (commVal.length < 5) {
        setStatusMessage(statusEl, 'error', 'Veuillez écrire un commentaire d\'au moins 5 caractères.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi...';

      var elapsed = Date.now() - modalOpenedAt;
      var waitMs = elapsed < 3100 ? 3100 - elapsed : 0;

      setTimeout(function () {
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create_testimonial',
            rating: selectedRating,
            name: nameVal,
            profession: profVal,
            city: cityVal,
            comment: commVal,
            source: 'download_popup',
            website_url: hpVal,
            formOpenedAt: modalOpenedAt,
            dwellMs: Math.max(3500, elapsed + waitMs)
          })
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer mon avis';
            if (!data || !data.success) {
              setStatusMessage(statusEl, 'error', (data && data.error) || 'Erreur lors de l\'envoi.');
              return;
            }
            setStatusMessage(statusEl, 'success', 'Merci pour votre avis ! Il est désormais publié sur la page d\'accueil.');
            if (typeof loadHomepageTestimonials === 'function' && document.getElementById('pepsHomeTestimonialsList')) {
              loadHomepageTestimonials();
            }
            setTimeout(closeModal, 1400);
          })
          .catch(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer mon avis';
            setStatusMessage(statusEl, 'error', 'Erreur de connexion. Veuillez réessayer.');
          });
      }, waitMs);
    });
  }

  function schedulePopupAfterFirstDocAction() {
    if (hasAlreadyPromptedFirstDownload()) return;
    setTimeout(function () {
      showFirstDownloadRatingPopup();
    }, 1500);
  }

  function wireFirstDownloadAndGenerationListeners() {
    // 1. Listen to clicks on PDF links, Word export buttons, print buttons, and generator buttons
    document.addEventListener('click', function (e) {
      if (hasAlreadyPromptedFirstDownload()) return;
      var target = e.target;
      if (!target || !target.closest) return;

      var link = target.closest('a[href]');
      if (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var hasDownloadAttr = link.hasAttribute('download');
        if (href.indexOf('.pdf') !== -1 || href.indexOf('.doc') !== -1 || hasDownloadAttr) {
          schedulePopupAfterFirstDocAction();
          return;
        }
      }

      var btn = target.closest('button, a.btn-atlas-download');
      if (btn) {
        var onclickStr = (btn.getAttribute('onclick') || '').toLowerCase();
        var btnId = (btn.id || '').toLowerCase();
        var btnText = (btn.textContent || '').toLowerCase();
        if (
          onclickStr.indexOf('export') !== -1 ||
          onclickStr.indexOf('download') !== -1 ||
          onclickStr.indexOf('print') !== -1 ||
          onclickStr.indexOf('telecharger') !== -1 ||
          onclickStr.indexOf('generer') !== -1 ||
          btnId.indexOf('export') !== -1 ||
          btnId.indexOf('download') !== -1 ||
          btnId.indexOf('btngenerer') !== -1 ||
          (btnText.indexOf('word') !== -1 && (btnText.indexOf('.doc') !== -1 || btnText.indexOf('télécharger') !== -1 || btnText.indexOf('exporter') !== -1)) ||
          (btnText.indexOf('pdf') !== -1 && (btnText.indexOf('télécharger') !== -1 || btnText.indexOf('exporter') !== -1 || btnText.indexOf('imprimer') !== -1)) ||
          btnText.indexOf('générer la fiche') !== -1 ||
          btnText.indexOf('générer le projet') !== -1 ||
          btnText.indexOf('générer la grille') !== -1
        ) {
          schedulePopupAfterFirstDocAction();
        }
      }
    }, true);

    // 2. Also hook into window.ProfEPS.saveGeneration if called by generateur.html
    if (window.ProfEPS && typeof window.ProfEPS.saveGeneration === 'function') {
      var origSave = window.ProfEPS.saveGeneration;
      window.ProfEPS.saveGeneration = function () {
        schedulePopupAfterFirstDocAction();
        return origSave.apply(this, arguments);
      };
    }
  }

  // =========================================================================
  // 4. SHARED UI HELPERS (Star Picker, Status Messages, Reporting, Admin Delete)
  // =========================================================================
  function createStarPickerButtonsHtml(prefix) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html +=
        '<button type="button" class="peps-star-btn" data-star-val="' + i + '" id="' + prefix + 'StarBtn' + i + '" aria-label="' + i + ' étoile' + (i > 1 ? 's' : '') + '">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' +
          '</svg>' +
        '</button>';
    }
    return html;
  }

  var STAR_LABELS = {
    1: '1/5 ★ — Insuffisant',
    2: '2/5 ★ — Moyen',
    3: '3/5 ★ — Bien',
    4: '4/5 ★ — Très bien',
    5: '5/5 ★ — Excellent'
  };

  function wireStarPicker(pickerId, hintId, onSelect) {
    var picker = document.getElementById(pickerId);
    var hint = document.getElementById(hintId);
    if (!picker) return;
    var btns = picker.querySelectorAll('.peps-star-btn');
    var currentVal = 0;

    function paintStars(val) {
      for (var i = 0; i < btns.length; i++) {
        var bVal = Number(btns[i].getAttribute('data-star-val'));
        var poly = btns[i].querySelector('polygon');
        if (bVal <= val) {
          btns[i].classList.add('active');
          if (poly) {
            poly.setAttribute('fill', '#FFB300');
            poly.setAttribute('stroke', '#FFB300');
          }
        } else {
          btns[i].classList.remove('active');
          if (poly) {
            poly.setAttribute('fill', 'none');
            poly.setAttribute('stroke', 'currentColor');
          }
        }
      }
    }

    for (var j = 0; j < btns.length; j++) {
      (function (btn) {
        var val = Number(btn.getAttribute('data-star-val'));
        btn.addEventListener('mouseenter', function () {
          paintStars(val);
          if (hint) hint.textContent = STAR_LABELS[val] || '';
        });
        btn.addEventListener('mouseleave', function () {
          paintStars(currentVal);
          if (hint) {
            hint.textContent = currentVal > 0 ? STAR_LABELS[currentVal] : 'Sélectionnez une note (1 à 5 ★)';
          }
        });
        btn.addEventListener('click', function () {
          currentVal = val;
          paintStars(currentVal);
          if (hint) hint.textContent = STAR_LABELS[currentVal] || '';
          onSelect(currentVal);
        });
      })(btns[j]);
    }
  }

  function resetStarPicker(pickerId, hintId) {
    var picker = document.getElementById(pickerId);
    var hint = document.getElementById(hintId);
    if (!picker) return;
    var btns = picker.querySelectorAll('.peps-star-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('active');
      var poly = btns[i].querySelector('polygon');
      if (poly) {
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', 'currentColor');
      }
    }
    if (hint) hint.textContent = 'Sélectionnez une note (1 à 5 ★)';
  }

  function setStatusMessage(el, type, msg) {
    if (!el) return;
    if (!msg) {
      el.style.display = 'none';
      el.textContent = '';
      el.className = 'peps-fb-status';
      return;
    }
    el.style.display = 'block';
    el.className = 'peps-fb-status peps-fb-status-' + type;
    el.textContent = msg;
  }

  function wireReportAndDeleteButtons(container, reloadCallback) {
    var reportBtns = container.querySelectorAll('.peps-report-btn');
    for (var i = 0; i < reportBtns.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-report-id');
          var tType = btn.getAttribute('data-report-type');
          btn.disabled = true;
          btn.textContent = 'Signalé';
          fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'report',
              targetType: tType,
              id: id
            })
          })
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (data && data.hidden && typeof reloadCallback === 'function') {
                reloadCallback();
              }
            })
            .catch(function () {});
        });
      })(reportBtns[i]);
    }

    var delBtns = container.querySelectorAll('.peps-admin-del-btn');
    for (var j = 0; j < delBtns.length; j++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-del-id');
          var tType = btn.getAttribute('data-del-type');
          var pw = getAdminPassword();
          btn.disabled = true;
          btn.textContent = 'Suppression...';
          fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'admin_delete',
              targetType: tType,
              id: id,
              adminPassword: pw
            })
          })
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (!data || !data.success) {
                setAdminPassword('');
                btn.textContent = 'Mot de passe invalide';
                return;
              }
              if (typeof reloadCallback === 'function') reloadCallback();
            })
            .catch(function () {});
        });
      })(delBtns[j]);
    }
  }

  function handleAdminToggle(reloadCallback) {
    var existingPass = getAdminPassword();
    if (existingPass) {
      setAdminPassword('');
      if (typeof reloadCallback === 'function') reloadCallback();
      return;
    }
    var modal = document.createElement('div');
    modal.className = 'peps-modal-backdrop';
    modal.innerHTML =
      '<div class="peps-modal-card" style="max-width:420px;">' +
        '<div class="peps-modal-head">' +
          '<h3 class="peps-modal-title">Accès Modération Admin</h3>' +
          '<button type="button" class="peps-modal-close" id="pepsAdminModalClose">✕</button>' +
        '</div>' +
        '<form id="pepsAdminLoginForm">' +
          '<div class="peps-fb-field">' +
            '<label for="pepsAdminPassInput" class="peps-fb-label">Mot de passe administrateur</label>' +
            '<input type="password" id="pepsAdminPassInput" class="peps-fb-input" required placeholder="Mot de passe de modération">' +
          '</div>' +
          '<div class="peps-fb-form-actions">' +
            '<button type="submit" class="btn-atlas-primary peps-nowrap-btn">Activer la suppression</button>' +
          '</div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);
    var closeBtn = document.getElementById('pepsAdminModalClose');
    closeBtn.addEventListener('click', function () {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    });
    document.getElementById('pepsAdminLoginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var val = (document.getElementById('pepsAdminPassInput').value || '').trim();
      if (val) {
        setAdminPassword(val);
        if (modal.parentNode) modal.parentNode.removeChild(modal);
        if (typeof reloadCallback === 'function') reloadCallback();
      }
    });
  }

  // =========================================================================
  // 5. INITIALIZATION ROUTER
  // =========================================================================
  function initProfEPSFeedback() {
    var curSlug = getCurrentFileSlug();

    // 1. Mount Testimonials ONLY on Homepage (index.html)
    if (curSlug === 'index.html') {
      mountHomepageTestimonials();
    }
    // 2. Mount Article Comments ONLY on the 129 Editorial Articles from blog.html
    else if (BLOG_ARTICLE_SLUGS.has(curSlug)) {
      mountArticleComments(curSlug);
    }

    // 3. Wire 1st Document Generation / Download Rating Popup across all pages
    wireFirstDownloadAndGenerationListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfEPSFeedback);
  } else {
    initProfEPSFeedback();
  }
})();
