/**
 * consent.js — Bannière de consentement RGPD + Google Consent Mode v2
 * Prof EPS Maroc | ca-pub-8253776880916865
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'profeps_consent';
    var CONSENT_VERSION = '1';

    // ─── Lire le consentement stocké ───
    function getStoredConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    // ─── Sauvegarder le consentement ───
    function saveConsent(granted) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                granted: granted,
                version: CONSENT_VERSION,
                timestamp: Date.now()
            }));
        } catch (e) {}
    }

    // ─── Mettre à jour Google Consent Mode v2 ───
    function updateConsentMode(granted) {
        if (typeof gtag !== 'function') return;
        var state = granted ? 'granted' : 'denied';
        gtag('consent', 'update', {
            'ad_storage': state,
            'ad_user_data': state,
            'ad_personalization': state,
            'analytics_storage': state
        });
    }

    // ─── Supprimer la bannière ───
    function removeBanner() {
        var banner = document.getElementById('profeps-consent-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            banner.style.opacity = '0';
            setTimeout(function () {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 400);
        }
    }

    // ─── Accepter tout ───
    function acceptAll() {
        saveConsent(true);
        updateConsentMode(true);
        removeBanner();
    }

    // ─── Refuser (non-essentiel) ───
    function rejectAll() {
        saveConsent(false);
        updateConsentMode(false);
        removeBanner();
    }

    // ─── Afficher les options détaillées ───
    function showOptions() {
        var panel = document.getElementById('profeps-consent-panel');
        var banner = document.getElementById('profeps-consent-banner');
        if (panel) {
            panel.style.display = 'block';
            if (banner) banner.style.display = 'none';
        }
    }

    // ─── Sauvegarder les options personnalisées ───
    function saveOptions() {
        var analytics = document.getElementById('consent-analytics');
        var ads = document.getElementById('consent-ads');
        var analyticsGranted = analytics ? analytics.checked : false;
        var adsGranted = ads ? ads.checked : false;
        var granted = analyticsGranted || adsGranted;

        saveConsent(granted);

        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': adsGranted ? 'granted' : 'denied',
                'ad_user_data': adsGranted ? 'granted' : 'denied',
                'ad_personalization': adsGranted ? 'granted' : 'denied',
                'analytics_storage': analyticsGranted ? 'granted' : 'denied'
            });
        }

        var panel = document.getElementById('profeps-consent-panel');
        if (panel) {
            panel.style.opacity = '0';
            setTimeout(function () { if (panel.parentNode) panel.parentNode.removeChild(panel); }, 400);
        }
    }

    // ─── Créer la bannière ───
    function createBanner() {
        var banner = document.createElement('div');
        banner.id = 'profeps-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'true');
        banner.setAttribute('aria-label', 'Consentement aux cookies');
        banner.innerHTML = [
            '<div class="pcb-inner">',
            '  <div class="pcb-text">',
            '    <p class="pcb-title">🍪 Vos préférences de confidentialité</p>',
            '    <p class="pcb-desc">Nous utilisons des cookies pour mesurer l\'audience et diffuser des publicités pertinentes.',
            '    Ces données peuvent être partagées avec Google (Analytics, AdSense).',
            '    Vous pouvez accepter, refuser ou personnaliser vos choix.</p>',
            '  </div>',
            '  <div class="pcb-actions">',
            '    <button class="pcb-btn pcb-btn-secondary" id="pcb-manage">Gérer les options</button>',
            '    <button class="pcb-btn pcb-btn-secondary" id="pcb-reject">Refuser</button>',
            '    <button class="pcb-btn pcb-btn-primary" id="pcb-accept">Tout accepter</button>',
            '  </div>',
            '</div>'
        ].join('');

        // Styles inline pour isolation totale
        banner.style.cssText = [
            'position:fixed',
            'bottom:0',
            'left:0',
            'right:0',
            'z-index:99999',
            'background:#fff',
            'border-top:1px solid #e2e8f0',
            'box-shadow:0 -4px 24px rgba(0,0,0,0.12)',
            'padding:1.25rem 1.5rem',
            'transform:translateY(0)',
            'transition:transform 0.4s ease, opacity 0.4s ease',
            'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif'
        ].join(';');

        // CSS de la bannière via style tag
        var style = document.createElement('style');
        style.textContent = [
            '#profeps-consent-banner .pcb-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}',
            '#profeps-consent-banner .pcb-text{flex:1;min-width:200px;}',
            '#profeps-consent-banner .pcb-title{font-weight:700;font-size:0.9375rem;color:#1a1a2e;margin:0 0 0.25rem;}',
            '#profeps-consent-banner .pcb-desc{font-size:0.8125rem;color:#6b7280;margin:0;line-height:1.5;}',
            '#profeps-consent-banner .pcb-actions{display:flex;gap:0.625rem;flex-wrap:wrap;flex-shrink:0;}',
            '#profeps-consent-banner .pcb-btn{padding:0.5rem 1.125rem;border-radius:9999px;font-size:0.875rem;font-weight:600;cursor:pointer;border:2px solid transparent;transition:all 0.2s ease;white-space:nowrap;}',
            '#profeps-consent-banner .pcb-btn-primary{background:linear-gradient(135deg,#c1272d,#006233);color:#fff;border-color:transparent;}',
            '#profeps-consent-banner .pcb-btn-primary:hover{opacity:0.9;transform:translateY(-1px);}',
            '#profeps-consent-banner .pcb-btn-secondary{background:#fff;color:#4a4a68;border-color:#e2e8f0;}',
            '#profeps-consent-banner .pcb-btn-secondary:hover{border-color:#c1272d;color:#c1272d;}',
            '@media(max-width:640px){#profeps-consent-banner .pcb-inner{flex-direction:column;gap:1rem;}',
            '#profeps-consent-banner .pcb-actions{width:100%;justify-content:stretch;}',
            '#profeps-consent-banner .pcb-btn{flex:1;text-align:center;}}'
        ].join('');
        document.head.appendChild(style);

        return banner;
    }

    // ─── Créer le panneau d'options ───
    function createPanel() {
        var panel = document.createElement('div');
        panel.id = 'profeps-consent-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Options de confidentialité');
        panel.style.cssText = [
            'position:fixed',
            'top:0','left:0','right:0','bottom:0',
            'z-index:100000',
            'background:rgba(0,0,0,0.5)',
            'display:none',
            'align-items:center',
            'justify-content:center',
            'padding:1rem',
            'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif'
        ].join(';');

        panel.innerHTML = [
            '<div style="background:#fff;border-radius:16px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;padding:2rem;box-shadow:0 20px 60px rgba(0,0,0,0.3);">',
            '  <h2 style="font-size:1.25rem;font-weight:800;color:#1a1a2e;margin:0 0 0.5rem;">Gérer mes préférences</h2>',
            '  <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem;line-height:1.6;">',
            '    Vous pouvez choisir quels cookies vous souhaitez activer. Les cookies essentiels sont toujours actifs car ils sont nécessaires au fonctionnement du site.',
            '  </p>',
            '  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:flex-start;">',
            '    <div style="flex:1;padding-right:1rem;">',
            '      <p style="font-weight:600;color:#1a1a2e;margin:0 0 0.25rem;font-size:0.9375rem;">Cookies essentiels</p>',
            '      <p style="font-size:0.8125rem;color:#6b7280;margin:0;">Nécessaires au fonctionnement du site (authentification, session). Toujours actifs.</p>',
            '    </div>',
            '    <span style="background:#006233;color:#fff;font-size:0.75rem;font-weight:600;padding:0.25rem 0.75rem;border-radius:9999px;white-space:nowrap;">Toujours actif</span>',
            '  </div>',
            '  <label style="border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:flex-start;cursor:pointer;">',
            '    <div style="flex:1;padding-right:1rem;">',
            '      <p style="font-weight:600;color:#1a1a2e;margin:0 0 0.25rem;font-size:0.9375rem;">Cookies analytiques</p>',
            '      <p style="font-size:0.8125rem;color:#6b7280;margin:0;">Google Analytics — mesure d\'audience anonymisée pour améliorer le site.</p>',
            '    </div>',
            '    <input type="checkbox" id="consent-analytics" style="width:18px;height:18px;cursor:pointer;accent-color:#c1272d;flex-shrink:0;margin-top:2px;">',
            '  </label>',
            '  <label style="border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:1.5rem;display:flex;justify-content:space-between;align-items:flex-start;cursor:pointer;">',
            '    <div style="flex:1;padding-right:1rem;">',
            '      <p style="font-weight:600;color:#1a1a2e;margin:0 0 0.25rem;font-size:0.9375rem;">Cookies publicitaires</p>',
            '      <p style="font-size:0.8125rem;color:#6b7280;margin:0;">Google AdSense — affichage de publicités pertinentes pour financer le service gratuit.</p>',
            '    </div>',
            '    <input type="checkbox" id="consent-ads" style="width:18px;height:18px;cursor:pointer;accent-color:#c1272d;flex-shrink:0;margin-top:2px;">',
            '  </label>',
            '  <p style="font-size:0.75rem;color:#9ca3af;margin:0 0 1.25rem;">',
            '    En savoir plus : <a href="/politique-confidentialite.html" style="color:#c1272d;">Politique de confidentialité</a> | <a href="/cgu.html" style="color:#c1272d;">CGU</a>',
            '  </p>',
            '  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">',
            '    <button id="pcb-save-options" style="flex:1;padding:0.625rem 1.25rem;border-radius:9999px;background:linear-gradient(135deg,#c1272d,#006233);color:#fff;font-weight:700;font-size:0.9375rem;border:none;cursor:pointer;">Sauvegarder mes choix</button>',
            '    <button id="pcb-accept-all-panel" style="flex:1;padding:0.625rem 1.25rem;border-radius:9999px;background:#f8f9fa;color:#4a4a68;font-weight:600;font-size:0.9375rem;border:2px solid #e2e8f0;cursor:pointer;">Tout accepter</button>',
            '  </div>',
            '</div>'
        ].join('');

        return panel;
    }

    // ─── Initialisation ───
    function init() {
        var stored = getStoredConsent();

        if (stored && stored.version === CONSENT_VERSION) {
            // Consentement déjà donné — appliquer immédiatement
            updateConsentMode(stored.granted);
            return;
        }

        // Pas de consentement — afficher la bannière
        var banner = createBanner();
        var panel = createPanel();
        document.body.appendChild(panel);
        document.body.appendChild(banner);

        // Événements bannière
        document.getElementById('pcb-accept').addEventListener('click', acceptAll);
        document.getElementById('pcb-reject').addEventListener('click', rejectAll);
        document.getElementById('pcb-manage').addEventListener('click', showOptions);

        // Événements panneau
        document.getElementById('pcb-save-options').addEventListener('click', saveOptions);
        document.getElementById('pcb-accept-all-panel').addEventListener('click', function () {
            var panel2 = document.getElementById('profeps-consent-panel');
            if (panel2) panel2.style.display = 'none';
            acceptAll();
        });
    }

    // Lancer après chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
