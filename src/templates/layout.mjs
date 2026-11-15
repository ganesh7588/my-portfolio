import { profile, nav } from "../content/site.mjs";

/** Escape text for HTML. */
export const esc = (v = "") =>
  String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Join an array of HTML strings (or a mapped list). */
export const join = (arr, fn = (x) => x) => (arr || []).map(fn).join("");

const icon = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
};

/**
 * Render a full page.
 * @param {object} o
 * @param {string} o.path   output path relative to site root, e.g. "work/mahali-market-entry/"
 * @param {string} o.title  page title (without the name suffix)
 * @param {string} o.description
 * @param {string} o.body   page HTML
 * @param {string} [o.section] nav href that should be marked current
 */
export function page({ path, title, description, body, section, ogImage }) {
  const depth = path.split("/").length - 1; // "" → 0, "work/" → 1, "work/x/" → 2, "404.html" → 0
  const root = depth === 0 ? "./" : "../".repeat(depth);
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.role}`;
  const canonical = profile.domain + "/" + path;
  const og = profile.domain + "/" + (ogImage || "assets/img/site/og.png");
  const r = (href) => root + href;
  const navItems = (cls) =>
    join(nav, (n) => `<li><a class="${cls}" href="${r(n.href)}"${section === n.href ? ' aria-current="page"' : ""}>${esc(n.label)}</a></li>`);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(og)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#fcfcfa" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d0d10" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${r("assets/img/site/mark.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${r("assets/site.css")}">
<script>
  (function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}document.documentElement.classList.add("js");})();
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<header class="site-header">
  <div class="container nav">
    <a class="brand" href="${r("")}" aria-label="${esc(profile.name)}, home">
      <span class="brand-mark" aria-hidden="true">G</span>
      <span class="brand-name">${esc(profile.name)}<span class="brand-role">${esc(profile.role)}</span></span>
    </a>
    <nav aria-label="Primary"><ul class="nav-links">${navItems("nav-link")}</ul></nav>
    <div class="nav-actions">
      <button class="icon-btn theme-btn" type="button" aria-label="Switch colour theme">${icon.moon}${icon.sun}</button>
      <a class="btn btn--primary btn--sm" href="${r("contact/")}">Start a conversation</a>
      <button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${icon.menu}</button>
    </div>
  </div>
  <nav class="mobile-nav container" id="mobile-nav" aria-label="Mobile" data-open="false">
    <ul>${navItems("")}<li><a href="${r("contact/")}"${section === "contact/" ? ' aria-current="page"' : ""}>Contact</a></li></ul>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer" data-particles>
  <canvas class="footer-canvas" aria-hidden="true"></canvas>
  <div class="container footer-inner">
    <p class="footer-word" aria-hidden="true">Ganesh Gaikhe</p>
    <div class="footer-grid">
      <div class="footer-brand stack">
        <strong>${esc(profile.name)}</strong>
        <p class="muted max-40">${esc(profile.tagline)}. ${esc(profile.location)}.</p>
        <a class="link-arrow" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
      </div>
      <ul class="footer-col">
        <li class="eyebrow">Work</li>
        <li><a href="${r("work/")}">Case studies</a></li>
        <li><a href="${r("projects/")}">Projects</a></li>
        <li><a href="${r("process/")}">Design process</a></li>
        <li><a href="${r("design-system/")}">Design system</a></li>
      </ul>
      <ul class="footer-col">
        <li class="eyebrow">Practice</li>
        <li><a href="${r("freelance/")}">Freelance</a></li>
        <li><a href="${r("writing/")}">Writing</a></li>
        <li><a href="${r("about/")}">About</a></li>
        <li><a href="${r("contact/")}">Contact</a></li>
      </ul>
      <ul class="footer-col">
        <li class="eyebrow">Elsewhere</li>
        <li><a href="${esc(profile.links.linkedin)}" rel="me noopener">LinkedIn</a></li>
        <li><a href="${esc(profile.links.medium)}" rel="me noopener">Medium</a></li>
        <li><a href="${esc(profile.links.podcast)}" rel="noopener">Podcast episode</a></li>
      </ul>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(profile.name)}. Client names and branding in case studies are changed for confidentiality. Every number is sourced.</span>
      <a href="${r("design-system/")}">How this site is built</a>
    </div>
  </div>
</footer>
<script src="${r("assets/site.js")}" defer></script>
</body>
</html>
`;
}

/** Shared CTA band at the bottom of most pages. */
export function ctaBand(root, { eyebrow = "Work together", title = "If you're building a financial product at a scale your design team can't absorb yet, that's the conversation I'm best in.", body = profile.responseTime } = {}) {
  return `<section class="section--band cta-band">
  <div class="container stack stack--lg">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h2 class="type-h" data-type><span class="visually-hidden">${esc(title)}</span><span class="type-ghost" aria-hidden="true">${esc(title)}</span><span class="type-live" aria-hidden="true"></span></h2>
    <p class="max-60">${esc(body)}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="${root}contact/">Start a conversation</a>
      <a class="btn btn--secondary" href="${root}freelance/">See how engagements work</a>
    </div>
  </div>
</section>`;
}
