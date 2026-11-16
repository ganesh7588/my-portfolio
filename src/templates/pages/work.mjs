import { page, esc, join, ctaBand } from "../layout.mjs";
import { workCard } from "./home.mjs";
import { projects, projectCategories } from "../../content/projects.mjs";
import { process } from "../../content/process.mjs";

export function workPage(studies) {
  const root = "../";
  const totalChallenges = studies.reduce((n, s) => n + s.lifecycle.length, 0);
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">Case studies</p>
      <h1>Three products, <em>${totalChallenges} challenges, and the decisions that got them shipped.</em></h1>
    </div>
    <div class="hero-side">
      <p class="lede">Each case study follows the project from start to finish. For every phase you'll see the challenge that came up, what I did about it as the lead, the decision I made and what it cost, and what that decision made possible next. The outcomes section says plainly what was measured and what wasn't.</p>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container"><div class="work-list">${join(studies, (s) => workCard(s, root))}</div></div>
</section>
<section class="section section--muted">
  <div class="container grid-2" style="align-items:center">
    <div class="stack"><p class="eyebrow">Beyond the case studies</p><h2>${projects.length} more projects across payments, identity, banking and service design.</h2></div>
    <div class="stack"><p class="lede">Shorter write-ups of products and engagements: what the challenge was, what I led, and the scope delivered.</p><a class="btn btn--primary" href="${root}projects/" style="align-self:flex-start">Browse projects</a></div>
  </div>
</section>
${ctaBand(root)}`;
  return page({ path: "work/", title: "Case studies", description: "Case studies in banking, credit cards and insurtech, told across the project lifecycle: challenges, leadership decisions, trade-offs and honest outcomes.", body, section: "work/" });
}

export function projectsPage() {
  const root = "../";
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">Projects</p>
      <h1>Products and engagements, <em>with the challenge each one had to solve.</em></h1>
    </div>
    <div class="hero-side">
      <p class="lede">Not every project needs a long case study. These are the products, platforms and audits I've led or designed recently, each with the problem behind it and the work I owned.</p>
      <p class="subtle" style="font-size:var(--fs-sm)">Some clients are described rather than named until they've approved being shown publicly.</p>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="filters" role="group" aria-label="Filter projects by category" data-filter-group="projects">
      ${join(projectCategories, (c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)}
    </div>
    <div data-filter-list="projects">
    ${join(projects, (p) => `<article class="project reveal" id="${esc(p.id)}" data-category="${esc(p.category)}">
      <div class="project-meta">
        <span class="eyebrow eyebrow--accent">${esc(p.category)}</span>
        <h3>${esc(p.nameApproved ? p.name : p.publicName)}</h3>
        <span class="eyebrow">${esc(p.org)} · ${esc(p.year)}</span>
        <span class="tag" style="align-self:flex-start">${esc(p.role)}</span>
      </div>
      <div class="project-body">
        <p>${esc(p.summary)}</p>
        <div class="panel panel--challenge"><p class="eyebrow">The challenge</p><p>${esc(p.challenge)}</p></div>
        <div class="panel panel--moves"><p class="eyebrow">What I led</p><ul>${join(p.lead, (l) => `<li>${esc(l)}</li>`)}</ul></div>
        <ul class="tag-row" style="grid-column:1/-1" aria-label="Scope">${join(p.scope, (s) => `<li class="tag">${esc(s)}</li>`)}</ul>
      </div>
    </article>`)}
    </div>
  </div>
</section>
${ctaBand(root)}`;
  return page({ path: "projects/", title: "Projects", description: "Products and engagements across identity and KYC, banking security, payments, digital banking, marketplaces, accessibility and service design.", body, section: "projects/" });
}

export function processPage(slugTitles) {
  const root = "../";
  const p = process;
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">${esc(p.eyebrow)}</p>
      <h1>${esc(p.title[0])}<em>${esc(p.title[1])}</em></h1>
    </div>
    <div class="hero-side"><p class="lede">${esc(p.lede)}</p></div>
  </div>
  <div class="container mt-9">
    <ol class="loop" aria-label="The six stages">${join(p.stages, (s) => `<li><a href="#${esc(s.id)}"><span>${esc(s.n)}</span><strong>${esc(s.name)}</strong></a></li>`)}</ol>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    ${join(p.stages, (s) => `<article class="stage" id="${esc(s.id)}">
      <div class="stage-n" aria-hidden="true">${esc(s.n)}</div>
      <div class="stage-body">
        <div class="stack"><h2>${esc(s.name)}</h2><p class="stage-q">${esc(s.question)}</p></div>
        <div class="stage-cols">
          <div class="panel panel--moves"><p class="eyebrow">What I lead</p><ul>${join(s.lead, (l) => `<li>${esc(l)}</li>`)}</ul></div>
          <div class="panel"><p class="eyebrow">Artefacts</p><ul class="tag-row">${join(s.artefacts, (a) => `<li class="tag">${esc(a)}</li>`)}</ul>
            <p class="eyebrow mt-5">Seen in practice</p><a class="link-arrow" href="${root}work/${esc(s.seen.slug)}/">${esc(s.seen.label)}</a></div>
        </div>
        <p class="gate"><strong>Checkpoint</strong><span>${esc(s.gate)}</span></p>
      </div>
    </article>`)}
  </div>
</section>

<section class="section section--band" aria-labelledby="par-h">
  <div class="container grid-2" style="align-items:center">
    <div class="stack stack--lg"><p class="eyebrow">Compressed timelines</p><h2 id="par-h">${esc(p.parallel.title)}</h2><p>${esc(p.parallel.body)}</p><a class="link-arrow" href="${root}work/mahali-market-entry/">See it at Mahali</a></div>
    <div class="gantt" role="img" aria-label="Research, design, system and weekly review tracks overlapping across four weeks">
      ${join(p.parallel.tracks, (t) => `<div class="gantt-row"><span>${esc(t.name)}</span><span class="gantt-lane"><span class="gantt-bar${t.weekly ? " gantt-bar--weekly" : ""}" style="left:${t.span[0]}%;width:${t.span[1] - t.span[0]}%"></span></span></div>`)}
      <div class="gantt-weeks">${join(p.parallel.weeks, (w) => `<span>${esc(w)}</span>`)}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="rit-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Rituals</p><h2 id="rit-h">The habits that make the process hold up under pressure.</h2></div><p>Processes fail when they're only documented. These rituals are what keep the stages honest week to week.</p></div>
    <div class="grid-3">${join(p.rituals, (r) => `<div class="card reveal"><span class="card-n">${esc(r.cadence)}</span><h3>${esc(r.name)}</h3><p>${esc(r.body)}</p></div>`)}</div>
  </div>
</section>
${ctaBand(root)}`;
  return page({ path: "process/", title: "Design process", description: "How I run a product from mandate to launch: six stages, the rituals that hold them, and where each one happened in real projects.", body, section: "process/" });
}
