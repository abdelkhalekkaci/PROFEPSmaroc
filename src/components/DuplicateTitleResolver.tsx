import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ArrowRight, 
  Heading1, 
  AlertTriangle, 
  GitMerge, 
  FileCode, 
  ShieldAlert,
  Server,
  Layers
} from 'lucide-react';

interface DuplicateTitleResolverProps {
  onMarkFixed: (key: string) => void;
  fixedItems: Record<string, boolean>;
}

export const DuplicateTitleResolver: React.FC<DuplicateTitleResolverProps> = ({
  onMarkFixed,
  fixedItems
}) => {
  const [activeConfigTab, setActiveConfigTab] = useState<'htaccess' | 'nginx' | 'netlify' | 'vercel'>('htaccess');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const htaccessCode = `# ========================================================
# PROF-EPS.MA - SEO 301 REDIRECTS (FIX DUPLICATE TITLE)
# ========================================================
RewriteEngine On

# 1. Rediriger l'URL avec accent et encodage UTF-8 (%C3%A9) vers l'URL propre
RewriteRule ^article-s%C3%A9ance\\.html$ /article-structure-seance.html [R=301,L,NE]
RewriteRule ^article-séance\\.html$ /article-structure-seance.html [R=301,L,NE]

# 2. Canonicalisation /index.html vers /
RewriteCond %{THE_REQUEST} ^.*/index\\.html
RewriteRule ^(.*)index\\.html$ /$1 [R=301,L]`;

  const nginxCode = `# Nginx Configuration for profeps.ma
location = /article-s%C3%A9ance.html {
    return 301 /article-structure-seance.html;
}
location = /article-séance.html {
    return 301 /article-structure-seance.html;
}

# Rediriger index.html vers la racine
if ($request_uri ~* "^(.*/)index\\.html$") {
    return 301 $1;
}`;

  const netlifyCode = `# _redirects for Netlify
/article-s%C3%A9ance.html   /article-structure-seance.html   301!
/article-séance.html         /article-structure-seance.html   301!
/index.html                  /                                301!`;

  const vercelCode = `{
  "redirects": [
    {
      "source": "/article-s%C3%A9ance.html",
      "destination": "/article-structure-seance.html",
      "permanent": true
    },
    {
      "source": "/article-séance.html",
      "destination": "/article-structure-seance.html",
      "permanent": true
    },
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
  ]
}`;

  return (
    <div className="space-y-8">
      {/* SECTION 1: Step 2 - Duplicate Titles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" /> Étape 2 : Résolution du Titre Dupliqué & URL Accentuée
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Fusionner <code className="text-rose-400 font-mono text-sm">/article-séance.html</code> vers <code className="text-emerald-400 font-mono text-sm">/article-structure-seance.html</code>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              Les deux pages partagent exactement le même titre (61 car) et le même sujet (la structure didactique d'une séance). L'URL avec accent pose un problème d'encodage (<code className="text-slate-200">%C3%A9</code>). La solution recommandée est une <strong>redirection permanente 301</strong>.
            </p>
          </div>
          <button
            onClick={() => onMarkFixed('dup-titles')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer ${
              fixedItems['dup-titles']
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {fixedItems['dup-titles'] ? <Check className="w-4 h-4 text-emerald-400" /> : <GitMerge className="w-4 h-4 text-rose-400" />}
            <span>{fixedItems['dup-titles'] ? 'Redirection 301 Validée' : 'Marquer comme Résolu'}</span>
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400">Ancienne URL à Rediriger (301)</span>
              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded font-mono text-[10px]">Abandonner</span>
            </div>
            <p className="font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
              /article-séance.html (%C3%A9ance)
            </p>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Risque de double encodage dans les navigateurs</li>
              <li>Divise l'autorité et crée de la cannibalisation SEO</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400">URL Finale Propre Conservée</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono text-[10px]">Cible 301</span>
            </div>
            <p className="font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
              /article-structure-seance.html
            </p>
            <div className="space-y-1">
              <span className="text-slate-400">Nouveau titre optimisé :</span>
              <div className="text-emerald-300 font-semibold">
                Structure d'une Séance d'EPS : Les 3 Phases Clés | ProfEPS (57 car)
              </div>
            </div>
          </div>
        </div>

        {/* Server Config Generator */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Générateur de Règle de Redirection Serveur</span>
            </div>
            <div className="flex items-center gap-1">
              {(['htaccess', 'nginx', 'netlify', 'vercel'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveConfigTab(tab)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition cursor-pointer ${
                    activeConfigTab === tab
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'htaccess' ? '.htaccess' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 relative">
            <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
              {activeConfigTab === 'htaccess' && htaccessCode}
              {activeConfigTab === 'nginx' && nginxCode}
              {activeConfigTab === 'netlify' && netlifyCode}
              {activeConfigTab === 'vercel' && vercelCode}
            </pre>
            <button
              onClick={() => {
                const code = 
                  activeConfigTab === 'htaccess' ? htaccessCode :
                  activeConfigTab === 'nginx' ? nginxCode :
                  activeConfigTab === 'netlify' ? netlifyCode : vercelCode;
                copyToClipboard(code, `redirect-${activeConfigTab}`);
              }}
              className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer shadow-md"
            >
              {copiedKey === `redirect-${activeConfigTab}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Step 3 - Multiple H1 on blog.html */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Heading1 className="w-4 h-4" /> Étape 3 : Correction des 4 Balises &lt;H1&gt; sur blog.html
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Restructurer <code className="text-purple-300 font-mono text-sm">/blog.html</code> vers 1 Seul &lt;H1&gt; Sémantique
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              L'audit a détecté 4 balises <code>&lt;h1&gt;</code> sur la page de blog. Pour respecter la norme W3C et Google SEO, une page ne doit avoir qu'un seul H1 représentant le titre global de la page. Les titres d'articles ou sections doivent être rétrogradés en <code>&lt;h2&gt;</code> ou <code>&lt;h3&gt;</code>.
            </p>
          </div>
          <button
            onClick={() => onMarkFixed('blog-h1')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer ${
              fixedItems['blog-h1']
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {fixedItems['blog-h1'] ? <Check className="w-4 h-4 text-emerald-400" /> : <Heading1 className="w-4 h-4 text-purple-400" />}
            <span>{fixedItems['blog-h1'] ? 'H1 Unique Validé' : 'Marquer comme Résolu'}</span>
          </button>
        </div>

        {/* Code Before & After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Avant */}
          <div className="bg-slate-950 p-4 rounded-xl border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between text-red-400 font-bold font-sans">
              <span>AVANT (4 H1 - Non Conforme)</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-[10px]">Warning SEO</span>
            </div>
            <div className="space-y-1.5 text-slate-400">
              <div className="text-red-400 font-bold bg-red-950/40 p-1.5 rounded">
                &lt;h1&gt;Le Blog ProfEPS&lt;/h1&gt;
              </div>
              <div className="text-red-300/80 p-1.5 bg-slate-900 rounded">
                &lt;h1&gt;Préparation Concours CRMEF EPS 2024&lt;/h1&gt;
              </div>
              <div className="text-red-300/80 p-1.5 bg-slate-900 rounded">
                &lt;h1&gt;Guide du Test VMA Demi-Cooper&lt;/h1&gt;
              </div>
              <div className="text-red-300/80 p-1.5 bg-slate-900 rounded">
                &lt;h1&gt;Comment Réussir son Échauffement en EPS&lt;/h1&gt;
              </div>
            </div>
          </div>

          {/* Après */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold font-sans">
              <span>APRÈS (1 Seul H1 + H2/H3 Sémantiques)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px]">100% Conforme</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="text-emerald-400 font-bold bg-emerald-950/40 p-1.5 rounded">
                &lt;h1 class="text-3xl font-bold"&gt;Blog EPS : Articles, Pédagogie & Guides&lt;/h1&gt;
              </div>
              <div className="text-emerald-300/90 p-1.5 bg-slate-900 rounded">
                &lt;h2 class="text-xl font-semibold"&gt;Préparation Concours CRMEF EPS 2024&lt;/h2&gt;
              </div>
              <div className="text-emerald-300/90 p-1.5 bg-slate-900 rounded">
                &lt;h2 class="text-xl font-semibold"&gt;Guide du Test VMA Demi-Cooper&lt;/h2&gt;
              </div>
              <div className="text-emerald-300/90 p-1.5 bg-slate-900 rounded">
                &lt;h2 class="text-xl font-semibold"&gt;Comment Réussir son Échauffement en EPS&lt;/h2&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
