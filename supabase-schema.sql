-- =====================================================
-- ProfEPS - Espace Utilisateur - Supabase Schema
-- =====================================================
-- Run this SQL in your Supabase Dashboard > SQL Editor
-- URL: https://supabase.com/dashboard/project/gbbqxalebmeeqgdountd/sql
-- =====================================================

-- 1. PROFILES TABLE
-- Stores additional user info (nom, etablissement, ville, niveau)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    nom TEXT DEFAULT '',
    etablissement TEXT DEFAULT '',
    ville TEXT DEFAULT '',
    niveau_enseigne TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- 2. HISTORIQUE TABLE
-- Stores document generation history
CREATE TABLE IF NOT EXISTS historique (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type_document TEXT NOT NULL,  -- 'fiche', 'grille', 'projet'
    aps TEXT DEFAULT '',
    niveau TEXT DEFAULT '',
    titre TEXT DEFAULT '',
    params JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_historique_user_id ON historique(user_id);
CREATE INDEX IF NOT EXISTS idx_historique_created_at ON historique(created_at DESC);

-- 3. FAVORIS TABLE
-- Stores user article favorites
CREATE TABLE IF NOT EXISTS favoris (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    article_slug TEXT NOT NULL,
    article_title TEXT DEFAULT '',
    article_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    -- Prevent duplicate favorites
    UNIQUE(user_id, article_slug)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_favoris_user_id ON favoris(user_id);

-- 4. MODELES TABLE
-- Stores user-saved templates for quick re-generation
CREATE TABLE IF NOT EXISTS modeles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type_document TEXT NOT NULL,  -- 'fiche', 'grille', 'projet'
    aps TEXT DEFAULT '',
    niveau TEXT DEFAULT '',
    titre TEXT DEFAULT '',
    nom TEXT DEFAULT '',          -- user-given template name
    params JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_modeles_user_id ON modeles(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Each user can only see/modify their own data
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE historique ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoris ENABLE ROW LEVEL SECURITY;
ALTER TABLE modeles ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read and update only their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- HISTORIQUE: Users can CRUD only their own history
CREATE POLICY "Users can view own history"
    ON historique FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
    ON historique FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
    ON historique FOR DELETE
    USING (auth.uid() = user_id);

-- FAVORIS: Users can CRUD only their own favorites
CREATE POLICY "Users can view own favorites"
    ON favoris FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
    ON favoris FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
    ON favoris FOR DELETE
    USING (auth.uid() = user_id);

-- MODELES: Users can CRUD only their own templates
CREATE POLICY "Users can view own templates"
    ON modeles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
    ON modeles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
    ON modeles FOR DELETE
    USING (auth.uid() = user_id);
