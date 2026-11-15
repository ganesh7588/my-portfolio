import { page, esc, join, ctaBand } from "../layout.mjs";
import { hero, principles, situations, testimonials, profile } from "../../content/site.mjs";
import { articles, featured } from "../../content/writing.mjs";
import { projects } from "../../content/projects.mjs";
import { featureSplit, isoCollage } from "../blocks.mjs";

export function workCard(cs, root) {
  return `<a class="work-card reveal" href="${root}work/${esc(cs.slug)}/">
  <div class="work-media"><img src="${root}assets/${esc(cs.cover.src)}" alt="${esc(cs.cover.alt)}" loading="lazy"></div>
  <div class="work-body">
    <span class="work-meta">${esc(cs.client)} · ${esc(cs.facts.find((f) => f[0] === "Timeline")[1])}</span>
    <h3>${esc(cs.card.title)}</h3>
    <p class="work-line">${esc(cs.card.line)}</p>
    <ul class="tag-row">${join(cs.card.tags, (t) => `<li class="tag">${esc(t)}</li>`)}</ul>
    <span class="link-arrow">Read how it was led · ${cs.lifecycle.length} challenges</span>
  </div>
</a>`;
}

export function homePage(studies) {
  const root = "./";
  const bySlug = Object.fromEntries(studies.map((s) => [s.slug, s]));
  const feat = featured.map((t) => articles.find((a) => a.title === t)).filter(Boolean);
  const named = projects.filter((p) => p.nameApproved).slice(0, 2);

  const body = `
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div class="stack stack--lg">
        <p class="eyebrow eyebrow--accent">${esc(hero.eyebrow)}</p>
        <h1>${esc(hero.title[0])}<em>${esc(hero.title[1])}</em></h1>
      </div>
      <div class="hero-side">
        <p class="lede">${esc(hero.lede)}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="work/">See the case studies</a>
          <a class="btn btn--secondary" href="process/">How I run a project</a>
        </div>
      </div>
    </div>
    <p class="proof"><strong>Recent work for</strong> ${join(hero.proof, (p) => `<span>${esc(p)}</span>`)}</p>
  </div>
</section>

<section class="section" aria-labelledby="work-h">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Selected case studies</p><h2 id="work-h">Three projects, told as what actually happened.</h2></div>
      <p>Not just screens and a problem statement. Each case study follows the project from start to finish: the challenges that came up in each phase, what I did about them, and what each decision cost.</p>
    </div>
    <div class="work-list">${join(studies, (s) => workCard(s, root))}</div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="sit-h">
  <div class="container">
    <div class="section-head section-head--wide">
      <div><p class="eyebrow">When teams bring me in</p><h2 id="sit-h">Three situations I've led through,<br> and would again.</h2></div>
    </div>
    <div class="scroller" data-scroller>
      <div class="scroller-bar">
        <p class="scroller-count" aria-live="polite"><span data-scroller-index>01</span> / ${String(situations.length).padStart(2, "0")}</p>
        <div class="scroller-nav">
          <button type="button" class="icon-btn" data-scroller-prev aria-label="Previous situation">←</button>
          <button type="button" class="icon-btn" data-scroller-next aria-label="Next situation">→</button>
        </div>
      </div>
      <ul class="scroller-track" tabindex="0" aria-label="Situations, scroll sideways">
        ${join(situations, (s) => `<li class="scroller-item"><a class="card card--situation" href="work/${esc(s.slug)}/">
          <span class="situation-n" aria-hidden="true">${esc(s.n)}</span>
          <h3>${esc(s.title)}</h3><p>${esc(s.body)}</p>
          <span class="link-arrow">${esc(s.cta)}</span>
        </a></li>`)}
      </ul>
      <div class="scroller-progress" aria-hidden="true"><span data-scroller-bar></span></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="pr-h">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">How I lead</p><h2 id="pr-h">Three operating principles, each with a cost I'm willing to pay.</h2></div>
      <a class="link-arrow" href="process/">The full design process</a>
    </div>
    <div class="grid-3">${join(principles, (p) => `<div class="card reveal"><span class="card-n">${esc(p.n)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><p><em>${esc(p.tradeoff)}</em></p><a class="link-arrow" href="work/${esc(p.proof.slug)}/">${esc(p.proof.label)}</a></div>`)}</div>
  </div>
</section>

<section class="section section--band" aria-label="Testimonial">
  <div class="container">
    <blockquote class="testimonial"><p>“${esc(testimonials[0].quote)}”</p><cite><strong>${esc(testimonials[0].who)}</strong>${esc(testimonials[0].what)}</cite></blockquote>
  </div>
</section>

<section class="section" aria-labelledby="more-h">
  <div class="container">
    <div class="section-head section-head--wide">
      <div><p class="eyebrow">More work</p><h2 id="more-h">Products, platforms and audits<br> beyond the case studies.</h2></div>
      <a class="link-arrow" href="projects/">All ${projects.length} projects</a>
    </div>
    <div class="grid-2">${join(named, (p) => `<a class="card reveal" href="projects/#${esc(p.id)}"><span class="card-n">${esc(p.category)} · ${esc(p.org)}</span><h3>${esc(p.publicName)}</h3><p>${esc(p.summary)}</p><span class="link-arrow">What I led</span></a>`)}</div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="sys-h">
  <div class="container">
    ${featureSplit({
      id: "sys-h",
      eyebrow: "Design systems",
      title: "The system is what makes the volume possible",
      lede: "2,000 screens in four weeks. 3,000 across 30+ modules. Six surfaces on one library. I build systems that make a new market a configuration task, not a rebuild.",
      checks: ["Foundations before modules", "Brand arrives as tokens, not a style guide", "Governed like a product, with an owner and design QA"],
      cta: { href: "design-system/", label: "How I build design systems" },
      visual: isoCollage(),
    })}
  </div>
</section>

<section class="section" aria-labelledby="writing-h">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Writing</p><h2 id="writing-h">On design at scale and how teams are run.</h2></div>
      <a class="link-arrow" href="writing/">All ${articles.length} essays</a>
    </div>
    <ul class="article-list">${join(feat, (a) => `<li><a class="article" href="${esc(a.url)}" rel="noopener"><span class="article-title">${esc(a.title)}</span><span class="article-cat">${esc(a.category)}</span><span class="article-note">${esc(a.note)}</span></a></li>`)}</ul>
  </div>
</section>
${ctaBand(root)}`;

  return page({ path: "", title: "", description: `${profile.name}, ${profile.tagline}. Case studies, design process, design systems, freelance engagements and writing.`, body, section: "" });
}
