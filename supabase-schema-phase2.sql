-- =====================================================
-- ProfEPS - Phase 2 - Modeles Table
-- =====================================================
-- Run this SQL in your Supabase Dashboard > SQL Editor
-- (You already ran the Phase 1 schema for profiles, historique, favoris)
-- =====================================================

-- MODELES TABLE
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

-- Enable RLS
ALTER TABLE modeles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own templates"
    ON modeles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
    ON modeles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
    ON modeles FOR DELETE
    USING (auth.uid() = user_id);
