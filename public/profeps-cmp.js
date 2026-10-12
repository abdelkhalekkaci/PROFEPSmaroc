(function() {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var CONSENT_KEY = 'profeps_cookie_consent_v2';
  var savedConsent = null;
  try { var raw = localStorage.getItem(CONSENT_KEY); if (raw) savedConsent = JSON.parse(raw); } catch(e) {}
  if (!savedConsent) {
    gtag('consent', 'default', { 'ad_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied', 'analytics_storage': 'denied', 'wait_for_update': 500 });
  } else {
    gtag('consent', 'default', { 'ad_storage': savedConsent.ads ? 'granted' : 'denied', 'ad_user_data': savedConsent.ads ? 'granted' : 'denied', 'ad_personalization': savedConsent.ads ? 'granted' : 'denied', 'analytics_storage': savedConsent.analytics ? 'granted' : 'denied' });
  }
  function applyConsent(obj) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(obj)); } catch(e) {}
    gtag('consent', 'update', { 'ad_storage': obj.ads ? 'granted' : 'denied', 'ad_user_data': obj.ads ? 'granted' : 'denied', 'ad_personalization': obj.ads ? 'granted' : 'denied', 'analytics_storage': obj.analytics ? 'granted' : 'denied' });
    var b = document.getElementById('profeps-cmp-banner'); if (b) b.style.display = 'none';
    var m = document.getElementById('profeps-cmp-modal'); if (m) m.style.display = 'none';
  }
  window.ProfEPS_CMP = {
    open: function() { var m = document.getElementById('profeps-cmp-modal'); if (m) m.style.display = 'flex'; },
    acceptAll: function() { applyConsent({ essential: true, analytics: true, ads: true }); },
    rejectAll: function() { applyConsent({ essential: true, analytics: false, ads: false }); },
    saveCustom: function() {
      var ana = document.getElementById('cmp-opt-analytics');
      var ads = document.getElementById('cmp-opt-ads');
      applyConsent({ essential: true, analytics: ana ? ana.checked : false, ads: ads ? ads.checked : false });
    }
  };
  document.addEventListener('DOMContentLoaded', function() {
    if (!savedConsent) setTimeout(function() { var b = document.getElementById('profeps-cmp-banner'); if (b) b.style.display = 'block'; }, 600);
  });
})();