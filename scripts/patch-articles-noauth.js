/**
 * Patch script for article files that DON'T have any Supabase auth yet.
 * Injects the shared auth module + favorite button before </body>.
 *
 * Run: node scripts/patch-articles-noauth.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('article-') && f.endsWith('.html'));

const scriptsBlock = `
    <!-- Supabase SDK -->
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

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already patched
    if (content.includes('auth-shared.js')) {
        return;
    }

    // Skip if already has supabase (should have been handled by first script)
    if (content.includes('supabase.createClient')) {
        console.log(`  SKIP (has supabase but not patched - check manually): ${file}`);
        return;
    }

    // Inject scripts before </body>
    const bodyClose = content.lastIndexOf('</body>');
    if (bodyClose === -1) {
        console.log(`  WARNING: No </body> in ${file}`);
        return;
    }

    content = content.slice(0, bodyClose) + scriptsBlock + '\n' + content.slice(bodyClose);

    // Inject CSS before last </style>
    if (!content.includes('.btn-favorite')) {
        const lastStyleClose = content.lastIndexOf('</style>');
        if (lastStyleClose !== -1) {
            content = content.slice(0, lastStyleClose) + favoriteCss + '\n    </style>' + content.slice(lastStyleClose + '</style>'.length);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  PATCHED: ${file}`);
    patchedCount++;
});

console.log(`\nDone! Patched: ${patchedCount} additional files.`);
