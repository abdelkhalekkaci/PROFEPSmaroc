/**
 * profeps-communaute.js
 * Outils communautaires, partage social et tracking des conversions d'outils EPS
 */
(function() {
  'use strict';

  // Tracking GA4 des calculs et interactions
  window.trackProfEpsEvent = function(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  // Partage direct sur WhatsApp avec message contextualisé
  window.shareOnWhatsApp = function(title) {
    var pageTitle = title || document.title;
    var currentUrl = window.location.href;
    var msg = encodeURIComponent("Salam ! Voici une excellente ressource pour l'EPS au Maroc : " + pageTitle + "\n\n" + currentUrl);
    var waUrl = "https://api.whatsapp.com/send?text=" + msg;
    window.open(waUrl, '_blank');
    if (window.trackProfEpsEvent) window.trackProfEpsEvent('share_whatsapp', { page: window.location.pathname });
  };

  // Copier le lien
  window.copyPageLink = function() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Lien de la page copié dans le presse-papier !');
    });
  };
})();
