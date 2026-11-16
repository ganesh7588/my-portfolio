import { page, esc, join, ctaBand } from "../layout.mjs";
import { decision, evidence } from "../blocks.mjs";

export function caseStudyPage(cs, next) {
  const path = `work/${cs.slug}/`;
  const root = "../../";
  const img = (src) => root + "assets/" + src;
  let decisionN = 0;

  const phases = cs.lifecycle.map((p, i) => {
    const decisions = p.decisions || (p.decision ? [p.decision] : []);
    return `<section class="phase" id="${esc(p.id)}" aria-labelledby="${esc(p.id)}-h">
  <div class="phase-head reveal">
    <div class="phase-tag"><span class="pill">Phase ${String(i + 1).padStart(2, "0")} · ${esc(p.phase)}</span><span class="eyebrow">${esc(p.when)}</span></div>
    <h2 id="${esc(p.id)}-h">${esc(p.title)}</h2>
  </div>
  <div class="phase-grid">
    <div class="panel panel--challenge"><p class="eyebrow">The challenge</p><p>${esc(p.challenge)}</p></div>
    <div class="panel panel--moves"><p class="eyebrow">What I did as lead</p><ul>${join(p.moves, (m) => `<li>${esc(m)}</li>`)}</ul></div>
  </div>
  ${join(decisions, (d) => decision(d, String(++decisionN).padStart(2, "0")))}
  ${p.evidence ? `<div class="phase-evidence">${join(p.evidence, (b) => evidence(b, img))}</div>` : ""}
  <div class="unlocked"><span class="eyebrow">What it unlocked</span><p>${esc(p.unlocked)}</p></div>
</section>`;
  });

  const tocItems = [
    ...cs.lifecycle.map((p, i) => ({ id: p.id, n: String(i + 1).padStart(2, "0"), label: p.phase })),
    { id: "team", n: "→", label: "Leading the team" },
    { id: "outcomes", n: "→", label: "Outcomes" },
    { id: "reflection", n: "→", label: "Reflection" },
  ];

  const body = `
<article>
<header class="container cs-hero">
  <p class="eyebrow eyebrow--accent">${esc(cs.client)} · ${esc(cs.domain)}</p>
  <h1 class="mt-5">${esc(cs.heroTitle[0])}<em>${esc(cs.heroTitle[1])}</em></h1>
  <p class="cs-dek">${esc(cs.dek)}</p>
  <dl class="facts">${join(cs.facts, ([k, v]) => `<div><dt class="eyebrow">${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}</dl>
  <p class="cs-note">Client name, logos and identifying details have been changed for confidentiality.</p>
  <div class="cs-cover"><img src="${img(cs.cover.src)}" alt="${esc(cs.cover.alt)}" fetchpriority="high"></div>
</header>

<section class="section" aria-labelledby="brief-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0">
      <div><p class="eyebrow">The brief in one breath</p><h2 id="brief-h">${esc(cs.brief.lede)}</h2></div>
    </div>
    <div class="brief">
      <div><p class="eyebrow">Situation</p><p>${esc(cs.brief.situation)}</p></div>
      <div><p class="eyebrow">Constraint</p><p>${esc(cs.brief.constraint)}</p></div>
      <div><p class="eyebrow">My mandate as lead</p><p>${esc(cs.brief.mandate)}</p></div>
    </div>
    <div class="metrics mt-7">${join(cs.metrics, (m) => `<div class="metric"><span class="metric-num">${esc(m.num)}</span><span class="metric-label">${esc(m.label)}</span><span class="metric-source">Source · ${esc(m.source)}</span></div>`)}</div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="map-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0">
      <div><p class="eyebrow">The challenge map</p><h2 id="map-h">${cs.lifecycle.length} phases, ${cs.lifecycle.length} problems that could have sunk the project.</h2></div>
      <p>Each phase below follows the same structure: the challenge that came up, what I did about it as the lead, the decision and what it cost, and what it made possible next.</p>
    </div>
    <ol class="lifemap" style="--cols:${cs.lifecycle.length}">
      ${join(cs.lifecycle, (p, i) => `<li><a href="#${esc(p.id)}"><span class="lifemap-n">${String(i + 1).padStart(2, "0")}</span><span class="lifemap-phase">${esc(p.phase)}</span><span class="lifemap-challenge">${esc(p.title)}</span></a></li>`)}
    </ol>
  </div>
</section>

<div class="container cs-layout section">
  <nav class="cs-toc" aria-label="Sections in this case study">
    <p class="eyebrow">In this case study</p>
    <ol>${join(tocItems, (t) => `<li><a href="#${t.id}"><span>${t.n}</span><span>${esc(t.label)}</span></a></li>`)}</ol>
  </nav>
  <div>
    ${phases.join("\n")}

    <section class="phase" id="team" aria-labelledby="team-h">
      <div class="phase-head"><div class="phase-tag"><span class="pill">Leading the team</span></div><h2 id="team-h">${esc(cs.team.heading)}</h2></div>
      <p class="lede mb-5">${esc(cs.team.body)}</p>
      <ul class="topology mt-5">${join(cs.team.topology, (t) => `<li><strong>${esc(t.who)}</strong><span>${esc(t.what)}</span></li>`)}</ul>
      ${cs.team.testimonial ? `<blockquote class="testimonial mt-9"><p>“${esc(cs.team.testimonial.quote)}”</p><cite><strong>${esc(cs.team.testimonial.who)}</strong>${esc(cs.team.testimonial.what)}</cite></blockquote>` : ""}
    </section>

    <section class="phase" id="outcomes" aria-labelledby="outcomes-h">
      <div class="phase-head"><div class="phase-tag"><span class="pill">Outcomes</span></div><h2 id="outcomes-h">What shipped, and where the evidence stops.</h2></div>
      <div class="outcomes">${join(cs.outcomes.measured, (o) => `<div class="card"><h3>${esc(o.title)}</h3><p>${esc(o.body)}</p><span class="metric-source mt-3">Source · ${esc(o.source)}</span></div>`)}</div>
      <div class="not-claimed"><p class="eyebrow">${esc(cs.outcomes.notMeasured.title)}</p><p>${esc(cs.outcomes.notMeasured.body)}</p></div>
      ${cs.links ? `<div class="btn-row mt-7">${join(cs.links, (l) => `<a class="btn btn--secondary btn--sm" href="${esc(l.href)}" rel="noopener">${esc(l.text)} ↗</a>`)}</div>` : ""}
    </section>

    <section class="phase" id="reflection" aria-labelledby="reflection-h">
      <div class="phase-head"><div class="phase-tag"><span class="pill">Reflection</span></div><h2 id="reflection-h">What I would do differently.</h2></div>
      <ol class="reflection">${join(cs.reflection, (r) => `<li><p><strong>${esc(r.b)}</strong>${esc(r.rest)}</p></li>`)}</ol>
    </section>

    <nav class="next-case" aria-label="Next case study">
      <div class="stack"><p class="eyebrow">Next case study</p><h2>${esc(next.card.title)}</h2></div>
      <a class="btn btn--primary" href="../${esc(next.slug)}/">Read the ${esc(next.client.split(" ")[0])} case study</a>
    </nav>
  </div>
</div>
</article>
${ctaBand(root)}`;

  return page({
    path,
    title: `${cs.client}: ${cs.card.title}`,
    description: cs.card.line,
    body,
    section: "work/",
  });
}
