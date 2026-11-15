/**
 * profeps-communaute.js — "Modern Atlas" Edition
 * 1. Instant Search Autocomplete (Header & Homepage Hero)
 * 2. Sticky Mobile Download Bar for Document & Sport pages
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
    { title: "QCM Sciences de l'Éducation (330 questions corrigées)", url: "/qcm-sciences-education-crmef.html", tag: "QCM CRMEF", keywords: "qcm sciences education apc piaget vygotsky charte" },
    { title: "QCM Didactique EPS Maroc (100 QCM)", url: "/qcm-didactique-eps-maroc.html", tag: "QCM EPS", keywords: "qcm didactique eps concours crmef sport" },
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

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------------------------------------------------------------------------
  // 2. STICKY MOBILE DOWNLOAD BAR (Document & Sport pages)
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
    mountMobileDownloadBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModernAtlas);
  } else {
    initModernAtlas();
  }
})();
