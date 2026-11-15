const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(PUBLIC_DIR).filter((f) => f.endsWith('.html')).sort();

const DARK_CONTRAST_GUARD_JS = `
  // Real-time Dark Mode Contrast Guard & Persistence
  (function() {
    function parseRgb(str) {
      if (!str) return null;
      var m = str.match(/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)/i);
      if (!m) return null;
      return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
    }
    function relLum(rgb) {
      var sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(function(c) {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    }
    function getEffectiveBg(el) {
      var cur = el;
      while (cur && cur !== document.documentElement) {
        var bg = window.getComputedStyle(cur).backgroundColor;
        var rgb = parseRgb(bg);
        if (rgb && rgb.a > 0.15) return rgb;
        cur = cur.parentElement;
      }
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return isDark ? { r: 11, g: 18, b: 38, a: 1 } : { r: 251, g: 250, b: 247, a: 1 };
    }
    window.profepsSyncDarkContrast = function() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (!isDark) {
        document.querySelectorAll('[data-peps-dm-fixed]').forEach(function(el) {
          var origColor = el.getAttribute('data-peps-orig-color');
          var origBg = el.getAttribute('data-peps-orig-bg');
          if (origColor !== null) {
            if (origColor === '') el.style.removeProperty('color');
            else el.style.color = origColor;
          }
          if (origBg !== null) {
            if (origBg === '') el.style.removeProperty('background');
            else el.style.background = origBg;
          }
          el.removeAttribute('data-peps-dm-fixed');
        });
        return;
      }
      var nodes = document.querySelectorAll('main *, header.silo-hero *, header.hub-hero *, header.vma-hero *, #profepsStickySubnav *');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!el || !el.tagName) continue;
        var tag = el.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'PATH' || tag === 'CIRCLE' || tag === 'LINE' || tag === 'RECT') continue;
        var cs = window.getComputedStyle(el);
        var fg = parseRgb(cs.color);
        if (!fg) continue;
        var bg = getEffectiveBg(el);
        var fgL = relLum(fg);
        var bgL = relLum(bg);
        // Case 1: Light background inside Dark Mode (e.g. bgL > 0.65) -> convert card/box bg to Dark Surface unless it is an Amber button
        var ownBg = parseRgb(cs.backgroundColor);
        var isAmberBtn = ownBg && ownBg.r > 200 && ownBg.g > 140 && ownBg.b < 60;
        if (ownBg && ownBg.a > 0.4 && relLum(ownBg) > 0.68 && !isAmberBtn) {
          if (!el.hasAttribute('data-peps-dm-fixed')) {
            el.setAttribute('data-peps-orig-bg', el.style.background || '');
            el.setAttribute('data-peps-orig-color', el.style.color || '');
            el.setAttribute('data-peps-dm-fixed', '1');
          }
          el.style.setProperty('background', '#131E3A', 'important');
          el.style.setProperty('color', '#E8ECFA', 'important');
          el.style.setProperty('border-color', '#263558', 'important');
          bgL = 0.015;
          fgL = 0.85;
        }
        // Case 2: Dark text on dark background (both fgL < 0.20 and bgL < 0.20)
        if (fgL < 0.20 && bgL < 0.20) {
          if (!el.hasAttribute('data-peps-dm-fixed')) {
            el.setAttribute('data-peps-orig-color', el.style.color || '');
            el.setAttribute('data-peps-orig-bg', el.style.background || '');
            el.setAttribute('data-peps-dm-fixed', '1');
          }
          // Preserve semantic hue if blue/green/amber/red
          if (fg.b > fg.r + 35 && fg.b > fg.g + 15) {
            el.style.setProperty('color', '#93A8FF', 'important');
          } else if (fg.g > fg.r + 25) {
            el.style.setProperty('color', '#34D399', 'important');
          } else if (fg.r > fg.b + 40 && fg.g > fg.b + 20) {
            el.style.setProperty('color', '#FBBF24', 'important');
          } else if (fg.r > fg.g + 40 && fg.r > fg.b + 40) {
            el.style.setProperty('color', '#F87171', 'important');
          } else {
            el.style.setProperty('color', '#E8ECFA', 'important');
          }
        }
        // Case 3: Light text on light background (both fgL > 0.65 and bgL > 0.65)
        else if (fgL > 0.65 && bgL > 0.65 && !isAmberBtn) {
          if (!el.hasAttribute('data-peps-dm-fixed')) {
            el.setAttribute('data-peps-orig-color', el.style.color || '');
            el.setAttribute('data-peps-orig-bg', el.style.background || '');
            el.setAttribute('data-peps-dm-fixed', '1');
          }
          el.style.setProperty('color', '#0E1633', 'important');
        }
      }
    };
    try {
      var saved = localStorage.getItem('profeps_theme');
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
        if (saved === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        syncThemeUI(saved);
      }
    } catch (e) {}
    var origToggle = window.profepsToggleTheme;
    window.profepsToggleTheme = function() {
      if (origToggle) origToggle();
      window.profepsSyncDarkContrast();
    };
    window.addEventListener('DOMContentLoaded', function() {
      window.profepsSyncDarkContrast();
      if (typeof MutationObserver !== 'undefined' && document.body) {
        var timer = null;
        new MutationObserver(function() {
          if (document.documentElement.getAttribute('data-theme') !== 'dark') return;
          if (timer) clearTimeout(timer);
          timer = setTimeout(window.profepsSyncDarkContrast, 80);
        }).observe(document.body, { childList: true, subtree: true });
      }
    });
    window.addEventListener('load', window.profepsSyncDarkContrast);
  })();
`;

let updatedFiles = 0;

for (const f of files) {
  if (f === 'google9e56188ccdfea7e9.html') continue;
  const filePath = path.join(PUBLIC_DIR, f);
  let html = fs.readFileSync(filePath, 'utf8');
  const origHtml = html;

  // 1. Scope page-level :root { in <style> blocks to :root:not([data-theme="dark"]) {
  html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (fullMatch, cssContent) => {
    let updatedCss = cssContent.replace(/:root\s*\{/g, ':root:not([data-theme="dark"]) {');

    // 2. Replace hardcoded light-mode !important colors inside <style> blocks with theme-aware CSS variables
    updatedCss = updatedCss
      .replace(/color\s*:\s*#0f172a\s*!important/gi, 'color: var(--ink) !important')
      .replace(/color\s*:\s*#1e293b\s*!important/gi, 'color: var(--ink) !important')
      .replace(/color\s*:\s*#2434A8\s*!important/gi, 'color: var(--primary) !important')
      .replace(/color\s*:\s*#0B7A99\s*!important/gi, 'color: var(--cyan) !important')
      .replace(/color\s*:\s*#085E77\s*!important/gi, 'color: var(--cyan) !important')
      .replace(/color\s*:\s*#92400e\s*!important/gi, 'color: var(--amber) !important')
      .replace(/background-color\s*:\s*#ffffff\s*!important/gi, 'background-color: var(--surface) !important')
      .replace(/border-bottom\s*:\s*2px\s+solid\s+#cbd5e1\s*!important/gi, 'border-bottom: 2px solid var(--stone) !important')
      .replace(/border-top\s*:\s*1px\s+solid\s+#e2e8f0\s*!important/gi, 'border-top: 1px solid var(--stone) !important')
      .replace(/border-bottom\s*:\s*1px\s+solid\s+#e2e8f0\s*!important/gi, 'border-bottom: 1px solid var(--stone) !important');

    return fullMatch.replace(cssContent, updatedCss);
  });

  // 3. Inject or update the real-time Dark Mode Contrast Guard inside profeps-master-unifier-js
  html = html.replace(
    /(<script id="profeps-master-unifier-js">[\s\S]*?)(\}\)\(\);\s*<\/script>)/,
    (m, before, endTag) => {
      const cleanedBefore = before.replace(/\/\/ Real-time Dark Mode Contrast Guard & Persistence[\s\S]*$/g, '');
      return cleanedBefore + DARK_CONTRAST_GUARD_JS + '\n' + endTag;
    }
  );

  if (html !== origHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedFiles++;
  }
}

console.log(`Updated ${updatedFiles} HTML files with Dark Mode CSS scoping and Real-Time Contrast Guard.`);
