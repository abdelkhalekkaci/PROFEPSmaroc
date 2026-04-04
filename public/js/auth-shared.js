/**
 * ProfEPS - Shared Authentication Module
 * Handles auth state, navbar updates, generation saving, and favorites across all pages.
 */

const SUPABASE_URL = 'https://gbbqxalebmeeqgdountd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiYnF4YWxlYm1lZXFnZG91bnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4OTQ1NjYsImV4cCI6MjA4ODQ3MDU2Nn0.HRM35OtgfLv52jDwiqF155bCGf85ynWIw0LXJDhimQk';

// Initialize Supabase client (singleton)
let _supabaseClient = null;
function getSupabase() {
    if (!_supabaseClient) {
        _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return _supabaseClient;
}

// ── Inject dropdown CSS once ───────────────────────────────────────
(function injectDropdownCSS() {
    if (document.getElementById('profeps-dropdown-css')) return;
    const style = document.createElement('style');
    style.id = 'profeps-dropdown-css';
    style.textContent = `
        .nav-user-menu {
            position: relative;
            display: flex;
            align-items: center;
        }
        .nav-avatar-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c1272d, #006233);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 0.9375rem;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s ease;
            user-select: none;
            position: relative;
        }
        .nav-avatar-btn:hover,
        .nav-avatar-btn.active {
            border-color: #c1272d;
            box-shadow: 0 0 0 3px rgba(193, 39, 45, 0.15);
        }
        .nav-avatar-btn.active {
            box-shadow: 0 0 0 3px rgba(193, 39, 45, 0.25);
        }

        /* Dropdown */
        .nav-dropdown {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 280px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px) scale(0.97);
            transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
            z-index: 2000;
            overflow: hidden;
        }
        .nav-dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        /* Arrow */
        .nav-dropdown::before {
            content: '';
            position: absolute;
            top: -6px;
            right: 14px;
            width: 12px;
            height: 12px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-bottom: none;
            border-right: none;
            transform: rotate(45deg);
            z-index: 1;
        }

        /* Header */
        .nav-dropdown-header {
            padding: 1rem 1rem 0.75rem;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .nav-dropdown-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c1272d, #006233);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.1rem;
            flex-shrink: 0;
        }
        .nav-dropdown-info {
            overflow: hidden;
        }
        .nav-dropdown-name {
            font-weight: 700;
            font-size: 0.9375rem;
            color: #1a1a2e;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .nav-dropdown-email {
            font-size: 0.8125rem;
            color: #6b7280;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Links */
        .nav-dropdown-links {
            padding: 0.375rem 0;
        }
        .nav-dropdown-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.625rem 1rem;
            color: #1a1a2e;
            font-size: 0.9375rem;
            font-weight: 500;
            transition: background 0.15s ease;
            text-decoration: none;
            cursor: pointer;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            font-family: inherit;
        }
        .nav-dropdown-link:hover {
            background: #f8fafc;
        }
        .nav-dropdown-link svg {
            width: 20px;
            height: 20px;
            color: #6b7280;
            flex-shrink: 0;
        }
        .nav-dropdown-link:hover svg {
            color: #c1272d;
        }
        .nav-dropdown-divider {
            height: 1px;
            background: #f1f5f9;
            margin: 0.25rem 0;
        }
        .nav-dropdown-link.logout {
            color: #dc2626;
        }
        .nav-dropdown-link.logout svg {
            color: #dc2626;
        }
        .nav-dropdown-link.logout:hover {
            background: #fef2f2;
        }

        /* Backdrop for closing */
        .nav-dropdown-backdrop {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1999;
        }
        .nav-dropdown-backdrop.open {
            display: block;
        }
    `;
    document.head.appendChild(style);
})();

// ── Navbar Auth State ──────────────────────────────────────────────
async function updateNavAuth() {
    try {
        const { data } = await getSupabase().auth.getSession();

        const loginBtn = document.getElementById('navLoginBtn');
        const userMenu = document.getElementById('navUserMenu');

        if (!loginBtn || !userMenu) return;

        if (data.session && data.session.user) {
            const user = data.session.user;
            const meta = user.user_metadata || {};
            const displayName = meta.nom || meta.full_name || (user.email ? user.email.split('@')[0] : 'User');
            const initial = displayName.charAt(0).toUpperCase();
            const email = user.email || '';

            loginBtn.style.display = 'none';
            userMenu.style.display = 'flex';

            // Build the dropdown HTML (replaces old content)
            userMenu.innerHTML = `
                <div class="nav-dropdown-backdrop" id="navDropdownBackdrop"></div>
                <button class="nav-avatar-btn" id="navAvatarBtn" title="${displayName}">${initial}</button>
                <div class="nav-dropdown" id="navDropdown">
                    <div class="nav-dropdown-header">
                        <div class="nav-dropdown-avatar">${initial}</div>
                        <div class="nav-dropdown-info">
                            <div class="nav-dropdown-name">${displayName}</div>
                            <div class="nav-dropdown-email">${email}</div>
                        </div>
                    </div>
                    <div class="nav-dropdown-links">
                        <a href="/dashboard.html" class="nav-dropdown-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                            Mon Espace
                        </a>
                        <a href="/dashboard.html#modeles" class="nav-dropdown-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            Mes Mod\u00e8les
                        </a>
                        <a href="/generateur.html" class="nav-dropdown-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                            Nouveau document
                        </a>
                        <div class="nav-dropdown-divider"></div>
                        <button class="nav-dropdown-link logout" id="navDropdownLogout">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            D\u00e9connexion
                        </button>
                    </div>
                </div>
            `;

            // Wire up toggle
            const avatarBtn = document.getElementById('navAvatarBtn');
            const dropdown = document.getElementById('navDropdown');
            const backdrop = document.getElementById('navDropdownBackdrop');
            const logoutBtn = document.getElementById('navDropdownLogout');

            function openDropdown() {
                dropdown.classList.add('open');
                backdrop.classList.add('open');
                avatarBtn.classList.add('active');
            }
            function closeDropdown() {
                dropdown.classList.remove('open');
                backdrop.classList.remove('open');
                avatarBtn.classList.remove('active');
            }

            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
            });
            backdrop.addEventListener('click', closeDropdown);
            logoutBtn.addEventListener('click', handleNavLogout);

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeDropdown();
            });

        } else {
            loginBtn.style.display = 'inline-flex';
            userMenu.style.display = 'none';
        }
    } catch (e) {
        console.log('Auth check failed:', e);
    }
}

async function handleNavLogout() {
    await getSupabase().auth.signOut();
    window.location.href = '/login.html';
}

// ── Profile helpers ────────────────────────────────────────────────
async function ensureProfile(user) {
    const sb = getSupabase();
    const { data } = await sb.from('profiles').select('*').eq('user_id', user.id).single();
    if (!data) {
        const meta = user.user_metadata || {};
        await sb.from('profiles').insert({
            user_id: user.id,
            email: user.email,
            nom: meta.nom || meta.full_name || '',
            etablissement: meta.etablissement || '',
            ville: meta.ville || '',
            niveau_enseigne: meta.niveau_enseigne || ''
        });
    }
    return data;
}

// ── Generation History ─────────────────────────────────────────────
async function saveGeneration(type, aps, niveau, titre, params) {
    try {
        const { data: sessionData } = await getSupabase().auth.getSession();
        if (!sessionData.session) return; // not logged in, skip silently

        await getSupabase().from('historique').insert({
            user_id: sessionData.session.user.id,
            type_document: type,
            aps: aps,
            niveau: niveau,
            titre: titre,
            params: params
        });
    } catch (e) {
        console.log('Save generation failed (table may not exist yet):', e);
    }
}

// ── Favorites ──────────────────────────────────────────────────────
async function toggleFavorite(articleSlug, articleTitle, articleUrl) {
    const sb = getSupabase();
    const { data: sessionData } = await sb.auth.getSession();
    if (!sessionData.session) {
        // Redirect to login
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return false;
    }

    const userId = sessionData.session.user.id;

    // Check if already favorited
    const { data: existing } = await sb
        .from('favoris')
        .select('id')
        .eq('user_id', userId)
        .eq('article_slug', articleSlug)
        .single();

    if (existing) {
        // Remove favorite
        await sb.from('favoris').delete().eq('id', existing.id);
        return false; // now unfavorited
    } else {
        // Add favorite
        await sb.from('favoris').insert({
            user_id: userId,
            article_slug: articleSlug,
            article_title: articleTitle,
            article_url: articleUrl
        });
        return true; // now favorited
    }
}

async function isFavorited(articleSlug) {
    try {
        const sb = getSupabase();
        const { data: sessionData } = await sb.auth.getSession();
        if (!sessionData.session) return false;

        const { data } = await sb
            .from('favoris')
            .select('id')
            .eq('user_id', sessionData.session.user.id)
            .eq('article_slug', articleSlug)
            .single();

        return !!data;
    } catch (e) {
        return false;
    }
}

// ── Favorite Button Component ──────────────────────────────────────
function createFavoriteButton(articleSlug, articleTitle, articleUrl, small) {
    const btn = document.createElement('button');
    btn.className = 'btn-favorite' + (small ? ' btn-favorite-sm' : '');
    btn.dataset.slug = articleSlug;
    btn.innerHTML = `
        <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="${small ? 18 : 22}" height="${small ? 18 : 22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
    `;
    btn.title = 'Ajouter aux favoris';

    // Check initial state
    isFavorited(articleSlug).then(fav => {
        if (fav) {
            btn.classList.add('favorited');
            btn.title = 'Retirer des favoris';
        }
    });

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.disabled = true;
        const nowFav = await toggleFavorite(articleSlug, articleTitle, articleUrl);
        if (nowFav === false && !document.querySelector('.btn-favorite')) return; // redirected
        btn.classList.toggle('favorited', nowFav);
        btn.title = nowFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
        btn.disabled = false;
    });

    return btn;
}

// ── Auto-init on page load ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();
});

// Expose globally
window.ProfEPS = {
    getSupabase,
    updateNavAuth,
    handleNavLogout,
    ensureProfile,
    saveGeneration,
    toggleFavorite,
    isFavorited,
    createFavoriteButton
};
// Keep handleNavLogout global for onclick handlers in HTML
window.handleNavLogout = handleNavLogout;
