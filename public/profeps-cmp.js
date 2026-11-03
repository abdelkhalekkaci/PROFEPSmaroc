(function() {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var CONSENT_KEY = 'profeps_cookie_consent_v2';
  var LEGACY_KEY = 'profeps_consent';
  var savedConsent = null;

  try {
    var raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      savedConsent = JSON.parse(raw);
    } else {
      var legacyRaw = localStorage.getItem(LEGACY_KEY);
      if (legacyRaw) {
        var parsedLegacy = JSON.parse(legacyRaw);
        savedConsent = {
          essential: true,
          analytics: parsedLegacy.granted !== false,
          ads: parsedLegacy.granted !== false
        };
      }
    }
  } catch (e) {}

  if (savedConsent) {
    gtag('consent', 'default', {
      'ad_storage': savedConsent.ads ? 'granted' : 'denied',
      'ad_user_data': savedConsent.ads ? 'granted' : 'denied',
      'ad_personalization': savedConsent.ads ? 'granted' : 'denied',
      'analytics_storage': savedConsent.analytics ? 'granted' : 'denied'
    });
  } else {
    // Par défaut hors EEE (notamment Maroc MA) : analytics_storage = granted pour mesurer 100% du trafic réel
    gtag('consent', 'default', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
    // Conformité RGPD stricte uniquement pour les visiteurs EEE / UK / Suisse
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'],
      'wait_for_update': 500
    });
  }

  function applyConsent(obj) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(obj));
      localStorage.setItem(LEGACY_KEY, JSON.stringify({
        granted: Boolean(obj.analytics || obj.ads),
        version: '1',
        timestamp: Date.now()
      }));
    } catch (e) {}

    gtag('consent', 'update', {
      'ad_storage': obj.ads ? 'granted' : 'denied',
      'ad_user_data': obj.ads ? 'granted' : 'denied',
      'ad_personalization': obj.ads ? 'granted' : 'denied',
      'analytics_storage': obj.analytics ? 'granted' : 'denied'
    });

    var b = document.getElementById('profeps-cmp-banner');
    if (b) b.style.display = 'none';
    var m = document.getElementById('profeps-cmp-modal');
    if (m) m.style.display = 'none';
    var legacyBanner = document.getElementById('profeps-consent-banner');
    if (legacyBanner && legacyBanner.parentNode) legacyBanner.parentNode.removeChild(legacyBanner);
  }

  window.ProfEPS_CMP = {
    open: function() {
      var m = document.getElementById('profeps-cmp-modal');
      if (m) m.style.display = 'flex';
    },
    acceptAll: function() {
      applyConsent({ essential: true, analytics: true, ads: true });
    },
    rejectAll: function() {
      applyConsent({ essential: true, analytics: false, ads: false });
    },
    saveCustom: function() {
      var ana = document.getElementById('cmp-opt-analytics');
      var ads = document.getElementById('cmp-opt-ads');
      applyConsent({
        essential: true,
        analytics: ana ? ana.checked : false,
        ads: ads ? ads.checked : false
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    if (!savedConsent) {
      setTimeout(function() {
        var b = document.getElementById('profeps-cmp-banner');
        if (b) b.style.display = 'block';
      }, 600);
    }
  });
})();