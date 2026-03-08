// Configuration Supabase
const SUPABASE_URL = 'https://gbbqxalebmeeqgdountd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_swUFy4rDoQZmugKkV4TkAw_MWGQLMSb';

// Initialiser le client Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fonctions utilitaires
const Auth = {
    // Inscription par email
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        return { data, error };
    },

    // Connexion par email
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    // Connexion Google
    async signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        return { data, error };
    },

    // Connexion Facebook
    async signInWithFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'facebook'
        });
        return { data, error };
    },

    // Déconnexion
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Vérifier si connecté
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        return { session: data.session, error };
    },

    // Écouter les changements d'état
    onAuthStateChange(callback) {
        supabase.auth.onAuthStateChange(callback);
    },

    // Obtenir l'utilisateur actuel
    async getUser() {
        const { data, error } = await supabase.auth.getUser();
        return { user: data.user, error };
    }
};

// Export pour utilisation
window.Auth = Auth;
