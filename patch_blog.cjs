// patch_blog.cjs
const fs = require('fs');

console.log("⚡ Démarrage de la mise à jour PROFEPS...");

// 1. MISE À JOUR DE public/blog.html
const blogPath = fs.existsSync('public/blog.html') ? 'public/blog.html' : (fs.existsSync('blog.html') ? 'blog.html' : null);

if (blogPath) {
  let blogContent = fs.readFileSync(blogPath, 'utf8');

  const newThemesGrid = `                <div class="themes-grid">
                    <div class="theme-card theme-all active" data-theme="all" onclick="window.filterByTheme('all')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
                        </div>
                        <h3>Tous les articles <span class="theme-count" id="count-all">93</span></h3>
                        <p>Voir tout le contenu</p>
                    </div>

                    <div class="theme-card theme-vma" data-theme="vma" onclick="window.filterByTheme('vma')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <h3>VMA & Demi-Fond <span class="theme-count" id="count-vma">22</span></h3>
                        <p>Tests, Allures & Calculs (FR & EN)</p>
                    </div>

                    <div class="theme-card theme-documents" data-theme="documents" onclick="window.filterByTheme('documents')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                        <h3>Documents Officiels <span class="theme-count" id="count-documents">8</span></h3>
                        <p>OP 2007-2009 & Référentiels</p>
                    </div>

                    <div class="theme-card theme-didactique" data-theme="didactique" onclick="window.filterByTheme('didactique')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <h3>Didactique <span class="theme-count" id="count-didactique">13</span></h3>
                        <p>Pédagogie & Méthodes</p>
                    </div>

                    <div class="theme-card theme-carriere" data-theme="carriere" onclick="window.filterByTheme('carriere')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <h3>Carrière <span class="theme-count" id="count-carriere">11</span></h3>
                        <p>Concours & Examens</p>
                    </div>

                    <div class="theme-card theme-pratique" data-theme="pratique" onclick="window.filterByTheme('pratique')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <h3>Pratique & Santé <span class="theme-count" id="count-pratique">19</span></h3>
                        <p>Sécurité, Climat & Gestion</p>
                    </div>

                    <div class="theme-card theme-aps" data-theme="aps" onclick="window.filterByTheme('aps')" role="button" tabindex="0">
                        <div class="theme-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M5 4.5C7.5 7 9 9.5 9 12s-1.5 5-4 7.5"/><path d="M19 4.5C16.5 7 15 9.5 15 12s1.5 5 4 7.5"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                        </div>
                        <h3>APS <span class="theme-count" id="count-aps">20</span></h3>
                        <p>Sports Collectifs & Individuels</p>
                    </div>
                </div>`;

  blogContent = blogContent.replace(/<div class="themes-grid">[\s\S]*?<\/div>(\s*<\/section>)/, newThemesGrid + '$1');

  if (!blogContent.includes('.theme-card * { pointer-events: none; }')) {
    blogContent = blogContent.replace(/\.theme-card\s*\{/, '.theme-card * { pointer-events: none; }\n        .theme-card {');
  }

  const newBlogScript = `    <!-- SCRIPT FILTRAGE DES THÉMATIQUES 100% RÉACTIF -->
    <script>
        window.filterByTheme = function(theme) {
            theme = theme || 'all';

            var themeCards = document.querySelectorAll('.theme-card');
            themeCards.forEach(function(card) {
                var cardTheme = card.getAttribute('data-theme');
                if (cardTheme === theme) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });

            var articleCards = document.querySelectorAll('.article-card');
            var visibleCount = 0;
            articleCards.forEach(function(card) {
                var cardCat = card.getAttribute('data-category');
                if (theme === 'all' || cardCat === theme) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            var countEl = document.getElementById('articlesCount');
            if (countEl) {
                countEl.textContent = visibleCount + ' article' + (visibleCount > 1 ? 's' : '');
            }

            var titleEl = document.querySelector('.articles-header h2');
            if (titleEl) {
                var labels = {
                    all: 'Tous les articles & guides',
                    vma: 'VMA, Tests & Demi-Fond',
                    documents: 'Documents Officiels (OP 2007-2009)',
                    didactique: 'Didactique & Pédagogie de l’EPS',
                    carriere: 'Carrière, Concours CRMEF & Examens',
                    pratique: 'Pratique de Terrain, Climat & Santé',
                    aps: 'Activités Physiques et Sportives (APS)'
                };
                titleEl.textContent = labels[theme] || 'Articles sélectionnés';
            }

            var headerEl = document.querySelector('.articles-header');
            if (headerEl) {
                var navOffset = 90;
                var elPosition = headerEl.getBoundingClientRect().top;
                var offsetPosition = elPosition + window.pageYOffset - navOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        function refreshBlogStats() {
            var articleCards = document.querySelectorAll('.article-card');
            var counts = { all: articleCards.length };
            articleCards.forEach(function(card) {
                var cat = card.getAttribute('data-category');
                if (cat) counts[cat] = (counts[cat] || 0) + 1;
            });
            for (var cat in counts) {
                var badge = document.getElementById('count-' + cat);
                if (badge) badge.textContent = counts[cat];
            }
            var countEl = document.getElementById('articlesCount');
            if (countEl) countEl.textContent = counts.all + ' articles';
        }

        document.addEventListener('DOMContentLoaded', function() {
            refreshBlogStats();
            var heroSlides = document.querySelectorAll('.hero-slide');
            var heroDots = document.querySelectorAll('.hero-carousel-dot');
            var heroPrev = document.getElementById('heroPrev');
            var heroNext = document.getElementById('heroNext');
            var heroCurrentSlide = 0;
            var heroInterval = null;

            function showHeroSlide(index) {
                if (!heroSlides.length) return;
                heroSlides.forEach(function(slide, i) { slide.classList.toggle('active', i === index); });
                heroDots.forEach(function(dot, i) { dot.classList.toggle('active', i === index); });
                heroCurrentSlide = index;
            }

            function nextHeroSlide() { showHeroSlide((heroCurrentSlide + 1) % heroSlides.length); }
            function prevHeroSlide() { showHeroSlide((heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length); }

            function startHeroCarousel() { 
                if (heroInterval) clearInterval(heroInterval);
                heroInterval = setInterval(nextHeroSlide, 5000); 
            }
            function stopHeroCarousel() { 
                if (heroInterval) clearInterval(heroInterval); 
            }

            if (heroPrev) heroPrev.addEventListener('click', function() { stopHeroCarousel(); prevHeroSlide(); startHeroCarousel(); });
            if (heroNext) heroNext.addEventListener('click', function() { stopHeroCarousel(); nextHeroSlide(); startHeroCarousel(); });
            heroDots.forEach(function(dot, index) {
                dot.addEventListener('click', function() { stopHeroCarousel(); showHeroSlide(index); startHeroCarousel(); });
            });
            startHeroCarousel();
        });
    </script>
</body>
</html>`;

  blogContent = blogContent.replace(/<script>[\s\S]*?<\/script>\s*<\/body>\s*<\/html>/i, newBlogScript);
  fs.writeFileSync(blogPath, blogContent, 'utf8');
  console.log("✅ public/blog.html : clics thématiques réactifs + défilement automatique activés !");
}

// 2. MISE À JOUR DE index.html
if (fs.existsSync('index.html')) {
  let indexContent = fs.readFileSync('index.html', 'utf8');

  if (!indexContent.includes('function filterBlogHome')) {
    const scriptFilter = `
    function filterBlogHome(theme) {
      theme = theme || 'all';
      var cards = document.querySelectorAll('#grid-blog-home article');
      var buttons = [
        { id: 'btn-blog-all', theme: 'all' },
        { id: 'btn-blog-vma', theme: 'vma' },
        { id: 'btn-blog-sciences', theme: 'sciences' },
        { id: 'btn-blog-pedagogie', theme: 'pedagogie' }
      ];

      buttons.forEach(function(b) {
        var el = document.getElementById(b.id);
        if (!el) return;
        if (b.theme === theme) {
          el.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white transition cursor-pointer';
        } else {
          el.className = 'px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer';
        }
      });

      cards.forEach(function(card) {
        var cat = card.getAttribute('data-blog-cat');
        if (theme === 'all' || cat === theme) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  `;
    indexContent = indexContent.replace('</script>\n</body>', scriptFilter + '\n</script>\n</body>');
    indexContent = indexContent.replace('</script>\r\n</body>', scriptFilter + '\r\n</script>\r\n</body>');
    fs.writeFileSync('index.html', indexContent, 'utf8');
    console.log("✅ index.html : fonction filterBlogHome activée !");
  } else {
    console.log("ℹ️ index.html possède déjà la fonction filterBlogHome.");
  }
}

console.log("🎉 Mise à jour terminée avec succès !");