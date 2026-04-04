/**
 * Patches all article pages nav to have: navLoginBtn + nav-cta + empty navUserMenu
 * Handles both nav patterns found in the codebase.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(PUBLIC)
    .filter(f => f.startsWith('article-') && f.endsWith('.html'));

let patched = 0;
let alreadyDone = 0;
let failed = 0;

for (const file of files) {
    const filePath = path.join(PUBLIC, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Already patched (has empty navUserMenu after CTA)
    if (html.includes('id="navUserMenu" style="display: none;"></div>') &&
        html.indexOf('id="navUserMenu"') > html.indexOf('nav-cta')) {
        alreadyDone++;
        console.log('✔  Already OK:', file);
        continue;
    }

    // Pattern A: has navLoginBtn + navUserMenu (with content) + nav-cta  → move userMenu after CTA
    const patternA = /(<a href="login\.html" class="nav-btn-login" id="navLoginBtn">[\s\S]*?<\/a>\s*)<!-- Logged in: User Menu -->\s*<div class="nav-user-menu" id="navUserMenu"[^>]*>[\s\S]*?<\/div>\s*(<a href="generateur\.html" class="nav-cta">[\s\S]*?<\/a>)/;
    if (patternA.test(html)) {
        html = html.replace(patternA, (match, loginBtn, ctaBtn) => {
            return loginBtn + ctaBtn + '\n' +
                '                <!-- Logged in: User Dropdown (after CTA) -->\n' +
                '                <div class="nav-user-menu" id="navUserMenu" style="display: none;"></div>';
        });
        fs.writeFileSync(filePath, html, 'utf8');
        patched++;
        console.log('✅ Patched (A):', file);
        continue;
    }

    // Pattern B: no auth at all — just nav-cta with no login/user menu
    // Insert navLoginBtn + keep nav-cta + add empty navUserMenu
    const patternB = /(<a href="generateur\.html" class="nav-cta">✨ Créer un document<\/a>)/;
    if (patternB.test(html)) {
        const loginBtnHtml =
            '<!-- Guest: Login Button -->\n' +
            '                <a href="login.html" class="nav-btn-login" id="navLoginBtn">\n' +
            '                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>\n' +
            '                    Connexion\n' +
            '                </a>\n                ';

        html = html.replace(patternB, (match) => {
            return loginBtnHtml + match + '\n' +
                '                <!-- Logged in: User Dropdown (after CTA) -->\n' +
                '                <div class="nav-user-menu" id="navUserMenu" style="display: none;"></div>';
        });

        // Also add nav-btn-login CSS if missing
        if (!html.includes('nav-btn-login')) {
            html = html.replace('</style>', `
        .nav-btn-login {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #fff;
            color: var(--text-primary, #1a1a2e);
            font-weight: 600;
            font-size: 0.9375rem;
            border-radius: 9999px;
            border: 2px solid #e2e8f0;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .nav-btn-login:hover { border-color: var(--primary, #c1272d); color: var(--primary, #c1272d); }
        .nav-user-menu { position: relative; display: flex; align-items: center; }
</style>`);
        }

        fs.writeFileSync(filePath, html, 'utf8');
        patched++;
        console.log('✅ Patched (B):', file);
        continue;
    }

    failed++;
    console.log('❌ Could not patch:', file);
}

console.log(`\nDone. Patched: ${patched}, Already OK: ${alreadyDone}, Failed: ${failed}`);
