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

// ── Navbar Auth State ──────────────────────────────────────────────
async function updateNavAuth() {
    try {
        const { data } = await getSupabase().auth.getSession();

        const loginBtn = document.getElementById('navLoginBtn');
        const userMenu = document.getElementById('navUserMenu');
        const avatarEl = document.getElementById('navUserAvatar');
        const nameEl = document.getElementById('navUserName');

        if (!loginBtn || !userMenu) return; // page has no nav auth elements

        if (data.session && data.session.user) {
            const user = data.session.user;
            const meta = user.user_metadata || {};
            const displayName = meta.nom || meta.full_name || (user.email ? user.email.split('@')[0] : 'User');
            const initial = displayName.charAt(0).toUpperCase();

            loginBtn.style.display = 'none';
            userMenu.style.display = 'flex';
            if (avatarEl) avatarEl.textContent = initial;
            if (nameEl) nameEl.textContent = displayName;
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
