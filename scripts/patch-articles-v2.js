/**
 * Patch script for article files with Supabase but without the "<!-- Supabase SDK -->" comment.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('article-') && f.endsWith('.html'));

const replacement = `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
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

// Match the inline supabase block without the comment
const supabaseBlockRegex = /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2"><\/script>\s*<script>\s*const supabaseClient[\s\S]*?updateNavAuth\(\);\s*<\/script>/;

let patchedCount = 0;

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('auth-shared.js')) return; // already patched

    if (!content.includes('supabase.createClient')) return; // no supabase

    if (supabaseBlockRegex.test(content)) {
        content = content.replace(supabaseBlockRegex, replacement);

        // Inject CSS
        if (!content.includes('.btn-favorite')) {
            const lastStyleClose = content.lastIndexOf('</style>');
            if (lastStyleClose !== -1) {
                content = content.slice(0, lastStyleClose) + favoriteCss + '\n    </style>' + content.slice(lastStyleClose + '</style>'.length);
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  PATCHED: ${file}`);
        patchedCount++;
    } else {
        console.log(`  STILL FAILED: ${file}`);
    }
});

console.log(`\nDone! Patched: ${patchedCount}`);
