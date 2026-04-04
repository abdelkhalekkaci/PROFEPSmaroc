/**
 * Patch script: Updates all article-*.html files to:
 * 1. Replace inline Supabase auth with shared auth-shared.js module
 * 2. Add favorite button + CSS
 *
 * Run: node scripts/patch-articles-auth.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Find all article files
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('article-') && f.endsWith('.html'));

console.log(`Found ${files.length} article files to patch.`);

// Pattern to match the inline Supabase auth block (various formatting)
const supabaseBlockRegex = /<!-- Supabase SDK -->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2"><\/script>\s*<script>[\s\S]*?updateNavAuth\(\);\s*<\/script>/;

const replacement = `<!-- Supabase SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="/js/auth-shared.js"></script>

    <script>
        // Add favorite button to article hero
        (function() {
            var slug = window.location.pathname.replace('.html', '').replace(/^\\//, '');
            var title = document.querySelector('.article-title, h1')?.textContent || document.title;
            var url = window.location.pathname;

            var heroMeta = document.querySelector('.article-meta');
            if (heroMeta) {
                var favBtn = ProfEPS.createFavoriteButton(slug, title, url, false);
                heroMeta.appendChild(favBtn);
            }
        })();
    </script>`;

// Favorite button CSS to inject in <style>
const favoriteCss = `
        /* FAVORITE BUTTON */
        .btn-favorite {
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(8px);
            border: 2px solid rgba(255,255,255,0.3);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .btn-favorite .heart-icon {
            color: rgba(255,255,255,0.8);
            transition: all 0.3s ease;
        }
        .btn-favorite:hover .heart-icon {
            color: #ef4444;
            transform: scale(1.15);
        }
        .btn-favorite.favorited .heart-icon {
            color: #ef4444;
            fill: #ef4444;
        }
        .btn-favorite:disabled {
            opacity: 0.5;
            cursor: wait;
        }`;

let patchedCount = 0;
let skippedCount = 0;

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already patched
    if (content.includes('auth-shared.js')) {
        console.log(`  SKIP (already patched): ${file}`);
        skippedCount++;
        return;
    }

    // 1. Replace inline Supabase auth block
    if (supabaseBlockRegex.test(content)) {
        content = content.replace(supabaseBlockRegex, replacement);
    } else {
        console.log(`  WARNING: Could not find Supabase auth block in ${file}`);
        skippedCount++;
        return;
    }

    // 2. Inject favorite button CSS before closing </style>
    if (!content.includes('.btn-favorite')) {
        // Find the last </style> tag and inject before it
        const lastStyleClose = content.lastIndexOf('</style>');
        if (lastStyleClose !== -1) {
            content = content.slice(0, lastStyleClose) + favoriteCss + '\n    </style>' + content.slice(lastStyleClose + '</style>'.length);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  PATCHED: ${file}`);
    patchedCount++;
});

console.log(`\nDone! Patched: ${patchedCount}, Skipped: ${skippedCount}`);
