# portfolio-vintage — Bludit Vlog Theme

Matches the vintage science monochrome aesthetic of krishnabhatt.com.
Run all commands from your **Bludit installation root** (the directory containing `bl-themes/`).

## Theme structure

```text
bl-themes/
└── portfolio-vintage/
    ├── metadata.json
    ├── index.php        ← vlog feed / post list
    ├── post.php         ← single entry view
    ├── page.php         ← static pages (About, etc.)
    ├── 404.php
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

Activate under **Admin → Settings → General → Theme → portfolio-vintage**.

---

## Step 1 — Scaffold

```bash
THEME=portfolio-vintage
mkdir -p bl-themes/$THEME/css bl-themes/$THEME/js bl-themes/$THEME/img bl-themes/$THEME/languages
```

---

## Step 2 — languages/en.json  *(required for theme detection)*

```bash
cat > bl-themes/$THEME/languages/en.json << 'EOF'
{
    "theme-data":
    {
        "name": "Portfolio Vintage",
        "description": "Vintage science monochrome vlog theme"
    }
}
EOF
```

---

## Step 3 — metadata.json

```bash
cat > bl-themes/$THEME/metadata.json << 'EOF'
{
    "author": "Krishna Bhatt",
    "email": "",
    "website": "",
    "version": "1.0",
    "releaseDate": "2026-05-17",
    "license": "MIT",
    "compatible": "3.0",
    "notes": ""
}
EOF
```

---

## Step 4 — css/style.css  *(6 parts — run in order)*

### 3a — Fonts, variables, reset, base typography

```bash
cat > bl-themes/$THEME/css/style.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

:root {
  --color-ink:       #1a1a1a;
  --color-ink-light: #2d2d2d;
  --color-charcoal:  #3d3d3d;
  --color-graphite:  #5a5a5a;
  --color-slate:     #7a7a7a;
  --color-stone:     #9a9a9a;
  --color-ash:       #b8b8b8;
  --color-pearl:     #d4d4d4;
  --color-parchment: #e8e4df;
  --color-cream:     #f5f3ef;
  --color-ivory:     #faf9f6;

  --font-serif:   'EB Garamond', Georgia, serif;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-elegant: 'Cormorant Garamond', Georgia, serif;
  --font-mono:    'Courier New', monospace;

  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  2rem;
  --space-xl:  4rem;
  --space-2xl: 6rem;

  --transition-base:    0.3s ease;
  --transition-elegant: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-serif);
  background-color: var(--color-ivory);
  color: var(--color-ink);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection { background: var(--color-ink); color: var(--color-ivory); }

::-webkit-scrollbar       { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-cream); }
::-webkit-scrollbar-thumb { background: var(--color-stone); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-graphite); }

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); }
h3 { font-size: clamp(1.3rem, 2vw, 1.75rem); }

p { margin-bottom: 1rem; }
a { color: inherit; text-decoration: none; transition: var(--transition-base); }
img { max-width: 100%; height: auto; display: block; }
EOF
```

### 3b — Layout, navigation, page hero

```bash
cat >> bl-themes/$THEME/css/style.css << 'EOF'

/* ── Layout ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}
.section {
  padding-top: var(--space-xl);
  padding-bottom: var(--space-lg);
}

/* ── Navigation ── */
.navigation {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.navigation.scrolled {
  background: rgba(250, 249, 246, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 1px 0 rgba(0,0,0,0.05);
}
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-ink);
}
.nav-logo span { color: var(--color-stone); margin: 0 0.1rem; }
.nav-items { display: flex; align-items: center; gap: 2rem; }
.nav-item {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--color-graphite);
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}
.nav-item:hover  { color: var(--color-ink); }
.nav-item.active { color: var(--color-ink); }
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: var(--color-ink);
}

/* ── Page hero ── */
.page-hero {
  min-height: 40vh;
  display: flex;
  align-items: flex-end;
  padding-top: 8rem;
  padding-bottom: var(--space-xl);
  position: relative;
  overflow: hidden;
}
.page-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
}
.page-hero-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 0%, var(--color-ivory) 75%);
  z-index: 1;
}
.page-hero-content { position: relative; z-index: 2; width: 100%; }
.page-hero-eyebrow {
  font-family: var(--font-elegant);
  font-size: 0.95rem; font-style: italic;
  color: var(--color-graphite);
  letter-spacing: 0.2em; text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400; letter-spacing: -0.02em; line-height: 1;
  margin-bottom: 1rem;
}
.page-hero-desc {
  font-family: var(--font-elegant);
  font-size: 1.1rem; color: var(--color-graphite);
  max-width: 520px;
}
EOF
```

### 3c — Section header, ornament, vintage border, buttons

```bash
cat >> bl-themes/$THEME/css/style.css << 'EOF'

/* ── Section header ── */
.section-header {
  display: flex; align-items: center;
  gap: 1.5rem; margin-bottom: 3rem;
}
.section-number { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-stone); }
.section-title  { font-family: var(--font-display); font-size: 2.5rem; font-weight: 400; margin: 0; }
.section-line   { flex: 1; height: 1px; background: var(--color-ash); }

/* ── Ornament / divider ── */
.ornament {
  display: flex; align-items: center;
  justify-content: center;
  gap: var(--space-md); margin: var(--space-lg) 0;
  color: var(--color-stone);
}
.ornament::before,
.ornament::after {
  content: ''; height: 1px; width: 60px;
  background: linear-gradient(to right, transparent, var(--color-stone), transparent);
}
.divider {
  width: 100%; height: 1px;
  background: linear-gradient(to right, transparent, var(--color-ash), transparent);
  margin: var(--space-xl) 0;
}

/* ── Vintage border ── */
.vintage-border {
  border: 1px solid var(--color-ash);
  padding: var(--space-lg); position: relative;
}
.vintage-border::before {
  content: ''; position: absolute; inset: 4px;
  border: 1px solid var(--color-pearl);
  pointer-events: none;
}

/* ── Buttons ── */
.btn {
  display: inline-flex; align-items: center; gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  font-family: var(--font-serif); font-size: 0.9rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  border: 1px solid var(--color-ink);
  background: transparent; color: var(--color-ink);
  cursor: pointer; transition: var(--transition-elegant);
}
.btn:hover { background: var(--color-ink); color: var(--color-ivory); }
.btn-ghost { border-color: var(--color-stone); color: var(--color-graphite); }
.btn-ghost:hover { border-color: var(--color-ink); background: var(--color-ink); color: var(--color-ivory); }
EOF
```

### 3d — Post feed (index / vlog list)

```bash
cat >> bl-themes/$THEME/css/style.css << 'EOF'

/* ── Post feed ── */
.post-feed { display: flex; flex-direction: column; gap: 0; }

.post-card {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 2rem; padding: 2rem 0;
  border-bottom: 1px solid var(--color-pearl);
  color: var(--color-ink);
  transition: all 0.3s ease; cursor: pointer;
}
.post-card:first-child { border-top: 1px solid var(--color-pearl); }
.post-card:hover {
  background: linear-gradient(to right, var(--color-cream), transparent);
  padding-left: 1rem; margin-left: -1rem;
  padding-right: 1rem;
}

.post-date-col {
  display: flex; flex-direction: column;
  gap: 0.25rem; padding-top: 0.3rem;
}
.post-date-day   { font-family: var(--font-display); font-size: 2rem; font-weight: 400; line-height: 1; }
.post-date-month { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-stone); }
.post-date-year  { font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-ash); }

.post-card-title {
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 500;
  margin: 0 0 0.5rem;
  transition: color 0.3s ease;
}
.post-card-desc {
  font-family: var(--font-elegant);
  font-style: italic; font-size: 1rem;
  color: var(--color-graphite); line-height: 1.6;
  margin-bottom: 0.75rem;
}
.post-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.post-tag {
  font-family: var(--font-mono); font-size: 0.65rem;
  letter-spacing: 0.05em; color: var(--color-stone);
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--color-pearl);
  background: var(--color-cream);
}

.post-thumb {
  width: 90px; height: 60px; object-fit: cover;
  border: 1px solid var(--color-ash);
  flex-shrink: 0; align-self: center;
  opacity: 0.85; transition: opacity 0.3s ease;
}
.post-card:hover .post-thumb { opacity: 1; }

.post-arrow {
  color: var(--color-stone); opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  align-self: center; font-size: 1.2rem;
}
.post-card:hover .post-arrow { opacity: 1; transform: translateX(0); }
EOF
```

### 3e — Single post view

```bash
cat >> bl-themes/$THEME/css/style.css << 'EOF'

/* ── Single post ── */
.post-single { padding-top: 2rem; }

.post-single-header {
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-ash);
  padding-bottom: var(--space-lg);
}
.post-single-meta { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; }
.post-meta-date { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-stone); letter-spacing: 0.05em; }
.post-meta-divider { width: 1px; height: 14px; background: var(--color-ash); }
.post-single-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400;
  letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1rem;
}
.post-single-desc {
  font-family: var(--font-elegant); font-size: 1.25rem;
  font-style: italic; color: var(--color-graphite); line-height: 1.7;
}

.post-cover { width: 100%; border: 1px solid var(--color-ash); margin-bottom: 0.75rem; }
.post-cover-caption { display: flex; align-items: center; gap: 1rem; margin-bottom: var(--space-xl); }
.post-cover-caption .caption-line { flex: 1; height: 1px; background: var(--color-ash); }
.post-cover-caption .caption-text { font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-stone); letter-spacing: 0.05em; }

.post-content {
  max-width: 720px;
  font-size: 1.1rem; line-height: 1.9; color: var(--color-charcoal);
}
.post-content p  { margin-bottom: 1.5rem; }
.post-content h2 { font-family: var(--font-display); font-size: 1.75rem; margin: 2.5rem 0 1rem; color: var(--color-ink); }
.post-content h3 { font-family: var(--font-display); font-size: 1.35rem; margin: 2rem 0 0.75rem; color: var(--color-ink); }
.post-content blockquote {
  border-left: 2px solid var(--color-stone);
  padding: 0.5rem 0 0.5rem 1.5rem; margin: 2rem 0;
  font-family: var(--font-elegant); font-style: italic;
  font-size: 1.15rem; color: var(--color-graphite);
}
.post-content a { color: var(--color-ink); border-bottom: 1px solid var(--color-ash); }
.post-content a:hover { border-bottom-color: var(--color-ink); }
.post-content ul,
.post-content ol  { padding-left: 1.5rem; margin-bottom: 1.5rem; }
.post-content li  { margin-bottom: 0.5rem; }
.post-content hr  { border: none; height: 1px; background: linear-gradient(to right, transparent, var(--color-ash), transparent); margin: 2.5rem 0; }
.post-content pre {
  background: var(--color-cream); border: 1px solid var(--color-ash);
  padding: 1.5rem; overflow-x: auto; margin-bottom: 1.5rem;
  font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6;
}
.post-content code { font-family: var(--font-mono); font-size: 0.875em; background: var(--color-cream); padding: 0.15em 0.4em; border: 1px solid var(--color-pearl); }
.post-content pre code { background: none; border: none; padding: 0; }

/* Video / iframe embeds */
.post-content iframe,
.post-content video { max-width: 100%; border: 1px solid var(--color-ash); margin: 1.5rem 0; }
.video-wrap { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 1px solid var(--color-ash); margin: 1.5rem 0; }
.video-wrap iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; margin: 0; }

.post-footer {
  margin-top: var(--space-xl); padding-top: var(--space-lg);
  border-top: 1px solid var(--color-ash);
  display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
}
.post-footer-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.post-footer-back {
  margin-left: auto;
  font-family: var(--font-serif); font-size: 0.85rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--color-graphite);
  display: flex; align-items: center; gap: 0.5rem;
  transition: color 0.3s ease;
}
.post-footer-back:hover { color: var(--color-ink); }
EOF
```

### 3f — Pagination, 404, footer, noise overlay, animations, responsive

```bash
cat >> bl-themes/$THEME/css/style.css << 'EOF'

/* ── Pagination ── */
.pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; padding: var(--space-xl) 0; }
.pagination a,
.pagination span { font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-graphite); padding: 0.5rem 1rem; border: 1px solid var(--color-pearl); transition: all 0.3s ease; }
.pagination a:hover { border-color: var(--color-ink); color: var(--color-ink); }
.pagination .current { background: var(--color-ink); color: var(--color-ivory); border-color: var(--color-ink); }

/* ── 404 ── */
.error-page { min-height: 70vh; display: flex; align-items: center; justify-content: center; text-align: center; padding-top: 8rem; }
.error-code { font-family: var(--font-display); font-size: clamp(5rem, 15vw, 10rem); font-weight: 400; line-height: 1; color: var(--color-pearl); display: block; margin-bottom: 1rem; }
.error-message { font-family: var(--font-elegant); font-style: italic; color: var(--color-graphite); margin-bottom: var(--space-lg); }

/* ── Footer ── */
.footer { background: var(--color-ink); color: var(--color-ivory); padding: 2rem 0; }
.footer-content { max-width: 800px; margin: 0 auto; text-align: center; }
.footer-ornament { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 2rem; }
.footer-ornament-line { width: 60px; height: 1px; background: var(--color-charcoal); }
.footer-ornament-sym  { color: var(--color-stone); font-size: 0.75rem; }
.footer-title   { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; margin-bottom: 0.5rem; }
.footer-tagline { font-family: var(--font-elegant); font-size: 0.95rem; color: var(--color-stone); margin-bottom: 2rem; letter-spacing: 0.1em; }
.footer-nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 2rem; }
.footer-nav a { font-family: var(--font-serif); font-size: 0.9rem; color: var(--color-stone); transition: color 0.3s ease; }
.footer-nav a:hover { color: var(--color-ivory); }
.footer-bottom { padding-top: 2rem; border-top: 1px solid var(--color-charcoal); }
.footer-copy { font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-graphite); letter-spacing: 0.05em; }

/* ── Noise texture overlay ── */
.noise-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 9999; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Fade-in animation ── */
.fade-in { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 900px) { .nav-items { display: none; } }

@media (max-width: 768px) {
  html { font-size: 14px; }
  .container { padding: 0 1.5rem; }
  .post-card { grid-template-columns: 1fr; gap: 0.75rem; }
  .post-date-col { flex-direction: row; align-items: baseline; gap: 0.5rem; }
  .post-date-day { font-size: 1.1rem; }
  .post-arrow { display: none; }
  .post-content { font-size: 1rem; }
}

@media (max-width: 480px) {
  .navigation         { padding: 1rem; }
  .navigation.scrolled { padding: 0.75rem 1rem; }
}
EOF
```

---

## Step 5 — js/script.js

```bash
cat > bl-themes/$THEME/js/script.js << 'EOF'
(function () {
  var nav = document.querySelector('.navigation');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
})();
EOF
```

---

## Step 5 — index.php  *(vlog feed — 2 parts)*

### 5a — head + nav + hero

```bash
cat > bl-themes/$THEME/index.php << 'PHPEOF'
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $site->title() ?></title>
  <meta name="description" content="<?php echo $site->description() ?>">
  <?php Theme::css('css/style.css') ?>
  <?php Theme::plugins('siteHead') ?>
</head>
<body>
<?php Theme::plugins('siteBodyBegin') ?>
<div class="noise-overlay"></div>

<nav class="navigation" role="navigation">
  <div class="nav-container">
    <a class="nav-logo" href="<?php echo DOMAIN ?>">
      <?php echo $site->title() ?><span>.</span>
    </a>
    <div class="nav-items">
      <a class="nav-item active" href="<?php echo DOMAIN ?>">Log</a>
      <a class="nav-item" href="<?php echo buildUrl('about') ?>">About</a>
    </div>
  </div>
</nav>

<header class="page-hero">
  <div class="page-hero-grid"></div>
  <div class="page-hero-vignette"></div>
  <div class="page-hero-content container">
    <p class="page-hero-eyebrow">Visual Journal</p>
    <h1 class="page-hero-title"><?php echo $site->title() ?></h1>
    <?php if ($site->description()): ?>
      <p class="page-hero-desc"><?php echo $site->description() ?></p>
    <?php endif ?>
  </div>
</header>
PHPEOF
```

### 5b — post feed + pagination + footer

```bash
cat >> bl-themes/$THEME/index.php << 'PHPEOF'
<main class="section">
  <div class="container">

    <div class="section-header fade-in">
      <span class="section-number">00</span>
      <h2 class="section-title">Entries</h2>
      <span class="section-line"></span>
    </div>

    <div class="post-feed">
      <?php foreach ($content as $page): ?>
      <article class="post-card fade-in">
        <a href="<?php echo $page->permalink() ?>" style="display:contents;">

          <div class="post-date-col">
            <span class="post-date-day"><?php echo $page->date('d') ?></span>
            <span class="post-date-month"><?php echo $page->date('M') ?></span>
            <span class="post-date-year"><?php echo $page->date('Y') ?></span>
          </div>

          <div class="post-body">
            <h3 class="post-card-title"><?php echo $page->title() ?></h3>
            <?php if ($page->description()): ?>
              <p class="post-card-desc"><?php echo $page->description() ?></p>
            <?php endif ?>
            <?php if ($page->tags()): ?>
              <div class="post-tags">
                <?php foreach ($page->tags() as $tag): ?>
                  <span class="post-tag"><?php echo $tag->name() ?></span>
                <?php endforeach ?>
              </div>
            <?php endif ?>
          </div>

          <?php if ($page->coverImage()): ?>
            <img class="post-thumb"
                 src="<?php echo $page->coverImageOriginal() ?>"
                 alt="<?php echo $page->title() ?>">
          <?php endif ?>

          <span class="post-arrow">&#8594;</span>

        </a>
      </article>
      <?php endforeach ?>
    </div>

    <?php if ($pages->numberOfPages() > 1): ?>
    <nav class="pagination" aria-label="Posts">
      <?php if ($pages->currentPage() > 1): ?>
        <a href="<?php echo $pages->previousPageUrl() ?>">&#8592; Older</a>
      <?php endif ?>
      <span class="current">
        <?php echo $pages->currentPage() ?> / <?php echo $pages->numberOfPages() ?>
      </span>
      <?php if ($pages->currentPage() < $pages->numberOfPages()): ?>
        <a href="<?php echo $pages->nextPageUrl() ?>">Newer &#8594;</a>
      <?php endif ?>
    </nav>
    <?php endif ?>

  </div>
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-ornament">
        <span class="footer-ornament-line"></span>
        <span class="footer-ornament-sym">&#10022;</span>
        <span class="footer-ornament-line"></span>
      </div>
      <p class="footer-title"><?php echo $site->title() ?></p>
      <?php if ($site->slogan()): ?>
        <p class="footer-tagline"><?php echo $site->slogan() ?></p>
      <?php endif ?>
      <nav class="footer-nav">
        <a href="<?php echo DOMAIN ?>">Log</a>
        <a href="<?php echo buildUrl('about') ?>">About</a>
      </nav>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; <?php echo date('Y') ?> <?php echo $site->title() ?></p>
      </div>
    </div>
  </div>
</footer>

<?php Theme::plugins('siteBodyEnd') ?>
<?php Theme::js('js/script.js') ?>
</body>
</html>
PHPEOF
```

---

## Step 6 — post.php  *(single entry — 2 parts)*

### 6a — head + nav + post header

```bash
cat > bl-themes/$THEME/post.php << 'PHPEOF'
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $page->title() ?> &#8212; <?php echo $site->title() ?></title>
  <meta name="description" content="<?php echo $page->description() ?>">
  <?php Theme::css('css/style.css') ?>
  <?php Theme::plugins('siteHead') ?>
</head>
<body>
<?php Theme::plugins('siteBodyBegin') ?>
<div class="noise-overlay"></div>

<nav class="navigation" role="navigation">
  <div class="nav-container">
    <a class="nav-logo" href="<?php echo DOMAIN ?>">
      <?php echo $site->title() ?><span>.</span>
    </a>
    <div class="nav-items">
      <a class="nav-item" href="<?php echo DOMAIN ?>">Log</a>
      <a class="nav-item" href="<?php echo buildUrl('about') ?>">About</a>
    </div>
  </div>
</nav>

<main class="section" style="padding-top:8rem;">
  <div class="container">
    <article class="post-single">

      <header class="post-single-header fade-in">
        <div class="post-single-meta">
          <span class="post-meta-date"><?php echo $page->date('F j, Y') ?></span>
          <?php if ($page->tags()): ?>
            <span class="post-meta-divider"></span>
            <?php foreach ($page->tags() as $tag): ?>
              <a class="post-tag" href="<?php echo $tag->permalink() ?>"><?php echo $tag->name() ?></a>
            <?php endforeach ?>
          <?php endif ?>
        </div>
        <h1 class="post-single-title"><?php echo $page->title() ?></h1>
        <?php if ($page->description()): ?>
          <p class="post-single-desc"><?php echo $page->description() ?></p>
        <?php endif ?>
      </header>

      <?php if ($page->coverImage()): ?>
      <figure class="fade-in">
        <img class="post-cover"
             src="<?php echo $page->coverImageOriginal() ?>"
             alt="<?php echo $page->title() ?>">
        <div class="post-cover-caption">
          <span class="caption-line"></span>
          <span class="caption-text"><?php echo $page->title() ?> &#8212; <?php echo $page->date('Y') ?></span>
          <span class="caption-line"></span>
        </div>
      </figure>
      <?php endif ?>
PHPEOF
```

### 6b — content + footer + closing tags

```bash
cat >> bl-themes/$THEME/post.php << 'PHPEOF'
      <div class="post-content fade-in">
        <?php echo $page->content() ?>
      </div>

      <footer class="post-footer fade-in">
        <?php if ($page->tags()): ?>
          <div class="post-footer-tags">
            <?php foreach ($page->tags() as $tag): ?>
              <a class="post-tag" href="<?php echo $tag->permalink() ?>"><?php echo $tag->name() ?></a>
            <?php endforeach ?>
          </div>
        <?php endif ?>
        <a class="post-footer-back" href="<?php echo DOMAIN ?>">&#8592; All entries</a>
      </footer>

    </article>
  </div>
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-ornament">
        <span class="footer-ornament-line"></span>
        <span class="footer-ornament-sym">&#10022;</span>
        <span class="footer-ornament-line"></span>
      </div>
      <p class="footer-title"><?php echo $site->title() ?></p>
      <nav class="footer-nav">
        <a href="<?php echo DOMAIN ?>">Log</a>
        <a href="<?php echo buildUrl('about') ?>">About</a>
      </nav>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; <?php echo date('Y') ?> <?php echo $site->title() ?></p>
      </div>
    </div>
  </div>
</footer>

<?php Theme::plugins('siteBodyEnd') ?>
<?php Theme::js('js/script.js') ?>
</body>
</html>
PHPEOF
```

---

## Step 7 — page.php  *(static pages)*

```bash
cat > bl-themes/$THEME/page.php << 'PHPEOF'
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $page->title() ?> &#8212; <?php echo $site->title() ?></title>
  <meta name="description" content="<?php echo $page->description() ?>">
  <?php Theme::css('css/style.css') ?>
  <?php Theme::plugins('siteHead') ?>
</head>
<body>
<?php Theme::plugins('siteBodyBegin') ?>
<div class="noise-overlay"></div>

<nav class="navigation" role="navigation">
  <div class="nav-container">
    <a class="nav-logo" href="<?php echo DOMAIN ?>">
      <?php echo $site->title() ?><span>.</span>
    </a>
    <div class="nav-items">
      <a class="nav-item" href="<?php echo DOMAIN ?>">Log</a>
      <a class="nav-item active" href="<?php echo buildUrl('about') ?>">About</a>
    </div>
  </div>
</nav>

<main class="section" style="padding-top:8rem;">
  <div class="container">
    <header class="section-header fade-in">
      <span class="section-number">&#8212;</span>
      <h1 class="section-title"><?php echo $page->title() ?></h1>
      <span class="section-line"></span>
    </header>
    <div class="post-content fade-in">
      <?php echo $page->content() ?>
    </div>
    <div class="fade-in" style="margin-top:3rem;">
      <a class="btn btn-ghost" href="<?php echo DOMAIN ?>">&#8592; Back to log</a>
    </div>
  </div>
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-ornament">
        <span class="footer-ornament-line"></span>
        <span class="footer-ornament-sym">&#10022;</span>
        <span class="footer-ornament-line"></span>
      </div>
      <p class="footer-title"><?php echo $site->title() ?></p>
      <nav class="footer-nav">
        <a href="<?php echo DOMAIN ?>">Log</a>
        <a href="<?php echo buildUrl('about') ?>">About</a>
      </nav>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; <?php echo date('Y') ?> <?php echo $site->title() ?></p>
      </div>
    </div>
  </div>
</footer>

<?php Theme::plugins('siteBodyEnd') ?>
<?php Theme::js('js/script.js') ?>
</body>
</html>
PHPEOF
```

---

## Step 8 — 404.php

```bash
cat > bl-themes/$THEME/404.php << 'PHPEOF'
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Not Found &#8212; <?php echo $site->title() ?></title>
  <?php Theme::css('css/style.css') ?>
</head>
<body>
<div class="noise-overlay"></div>

<nav class="navigation scrolled" role="navigation">
  <div class="nav-container">
    <a class="nav-logo" href="<?php echo DOMAIN ?>">
      <?php echo $site->title() ?><span>.</span>
    </a>
  </div>
</nav>

<main class="error-page">
  <div>
    <span class="error-code">404</span>
    <div class="ornament">&#10022;</div>
    <p class="error-message">This entry does not exist.</p>
    <a class="btn" href="<?php echo DOMAIN ?>">Return to log</a>
  </div>
</main>

<?php Theme::js('js/script.js') ?>
</body>
</html>
PHPEOF
```

---

## Video embeds

Bludit stores raw HTML in post content. Wrap YouTube/Vimeo iframes in `.video-wrap` for responsive 16:9:

```html
<div class="video-wrap">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
</div>
```

Bare `<iframe>` tags also work but won't be responsive.

---

## Bludit PHP API reference

| Variable / function | What it is |
| --- | --- |
| `$content` | Array of page objects for current view (index.php) |
| `$page` | Current single page object (post.php, page.php) |
| `$site->title()` | Site title (Admin → Settings) |
| `$site->description()` | Site description |
| `$site->slogan()` | Site slogan |
| `$pages->numberOfPages()` | Total paginated pages |
| `$pages->currentPage()` | Current page number |
| `$pages->previousPageUrl()` | URL for previous page |
| `$pages->nextPageUrl()` | URL for next page |
| `$page->title()` | Post title |
| `$page->content()` | Full post HTML |
| `$page->description()` | Excerpt / description field |
| `$page->permalink()` | Full post URL |
| `$page->date('F j, Y')` | Formatted date (PHP date format) |
| `$page->coverImage()` | Cover filename (empty string if none) |
| `$page->coverImageOriginal()` | Full URL to original cover image |
| `$page->tags()` | Array of Tag objects |
| `$tag->name()` | Tag label |
| `$tag->permalink()` | Tag archive URL |
| `DOMAIN` | Site root URL |
| `DOMAIN_THEME` | URL to theme directory |
| `buildUrl('slug')` | Build URL for a page slug |
| `Theme::css('path')` | Output `<link>` tag for theme asset |
| `Theme::js('path')` | Output `<script>` tag for theme asset |
| `Theme::plugins('hook')` | Fire plugin hook (`siteHead`, `siteBodyBegin`, `siteBodyEnd`) |
