(function() {
  'use strict';
  window.trackProfEpsEvent = function(eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params || {});
  };
  window.shareOnWhatsApp = function(title) {
    var pageTitle = title || document.title;
    var currentUrl = window.location.href;
    var msg = encodeURIComponent("Salam ! Voici une excellente ressource pour l'EPS au Maroc : " + pageTitle + "\n\n" + currentUrl);
    window.open("https://api.whatsapp.com/send?text=" + msg, '_blank');
    if (window.trackProfEpsEvent) window.trackProfEpsEvent('share_whatsapp', { page: window.location.pathname });
  };
  window.copyPageLink = function() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Lien de la page copié dans le presse-papier !');
    });
  };
})();