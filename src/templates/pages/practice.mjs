import { page, esc, join, ctaBand } from "../layout.mjs";
import { freelance as f } from "../../content/freelance.mjs";
import { articles, categories, drafts, framework, featured, postHref, isExternal } from "../../content/writing.mjs";
import { profile, aboutBio, timeline, capabilities, testimonials, principles } from "../../content/site.mjs";

export function freelancePage() {
  const root = "../";
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">${esc(f.eyebrow)}</p>
      <h1>${esc(f.title[0])}<em>${esc(f.title[1])}</em></h1>
    </div>
    <div class="hero-side">
      <p class="lede">${esc(f.lede)}</p>
      <div class="btn-row"><a class="btn btn--primary" href="${root}contact/">Book an intro call</a><a class="btn btn--secondary" href="#offers">See engagements</a></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0" aria-labelledby="who-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Who it's for</p><h2 id="who-h">Teams with a regulated product, a real deadline, and no time to get it wrong twice.</h2></div></div>
    <div class="grid-3">${join(f.forWho, (w) => `<div class="card reveal"><h3>${esc(w.title)}</h3><p>${esc(w.body)}</p></div>`)}</div>
  </div>
</section>

<section class="section section--muted" id="offers" aria-labelledby="off-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Engagements</p><h2 id="off-h">Four ways to work together, each with a defined outcome.</h2></div><p>Every engagement is quoted as a fixed fee after a short intro call. There is no hourly billing and no open-ended retainer without a scope.</p></div>
    <div class="grid-2">${join(f.offers, (o) => `<article class="offer reveal" id="${esc(o.id)}">
      <div class="offer-head"><h3>${esc(o.name)}</h3><span class="offer-dur">${esc(o.duration)}</span></div>
      <p>${esc(o.for)}</p>
      <p class="eyebrow">What you get</p>
      <ul class="checklist">${join(o.get, (g) => `<li>${esc(g)}</li>`)}</ul>
      <p class="offer-note">${esc(o.note)}</p>
    </article>`)}</div>
  </div>
</section>

<section class="section section--band" aria-labelledby="how-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">How an engagement runs</p><h2 id="how-h">From first call to a handover that doesn't depend on me.</h2></div></div>
    <ol class="steps">${join(f.how, (s) => `<li><span>${esc(s.n)}</span><strong>${esc(s.title)}</strong><p>${esc(s.body)}</p></li>`)}</ol>
  </div>
</section>

<section class="section" aria-labelledby="pr-h">
  <div class="container grid-2">
    <div class="stack stack--lg">
      <p class="eyebrow">Ground rules</p>
      <h2 id="pr-h">What you can hold me to.</h2>
      <ul class="checklist stack">${join(f.principles, (p) => `<li>${esc(p)}</li>`)}</ul>
    </div>
    <div class="stack stack--lg">
      <p class="eyebrow">Sectors</p>
      <h2>Where my experience is deepest.</h2>
      <ul class="tag-row">${join(f.sectors, (s) => `<li class="tag">${esc(s)}</li>`)}</ul>
      <p class="muted">Proof: <a href="${root}work/">three detailed case studies</a> and <a href="${root}projects/">recent projects</a>, plus a <a href="${root}process/">documented process</a> you can check the work against.</p>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="faq-h">
  <div class="container--narrow stack stack--lg">
    <p class="eyebrow">Questions</p>
    <h2 id="faq-h">Before you get in touch.</h2>
    <div class="faq">${join(f.faq, (q) => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`)}</div>
  </div>
</section>
${ctaBand(root, { eyebrow: "Next step", title: "Tell me what you're trying to decide or ship, and by when.", body: `A 30-minute intro call, then a one-page scope with a fixed fee within two working days. ${profile.responseTime}` })}`;
  return page({ path: "freelance/", title: "Freelance", description: "Independent design engagements for banks, fintechs and insurers: design sprints, discovery and service blueprints, end-to-end product design, and design leadership advisory.", body, section: "freelance/" });
}

export function writingPage() {
  const root = "../";
  const total = framework.reduce((n, p) => n + p.share, 0);
  const feat = featured.map((t) => articles.find((a) => a.title === t)).filter(Boolean);
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">Writing</p>
      <h1>Notes on design at scale, <em>and how teams are run.</em></h1>
    </div>
    <div class="hero-side">
      <p class="lede">${articles.length} essays on design leadership, delivery, strategy and craft, written from projects rather than theory. Published on Medium, with new essays every few weeks.</p>
      <div class="btn-row"><a class="btn btn--primary" href="${esc(profile.links.medium)}" rel="noopener">Follow on Medium ↗</a><a class="btn btn--secondary" href="${esc(profile.links.podcast)}" rel="noopener">Podcast episode ↗</a></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0" aria-labelledby="feat-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Start here</p><h2 id="feat-h">Three essays that explain how I think.</h2></div></div>
    <div class="grid-3">${join(feat, (a) => `<a class="card reveal" href="${esc(postHref(a, root))}"><span class="card-n">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.note)}</p><span class="link-arrow">Read the essay</span></a>`)}</div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="cat-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Topics</p><h2 id="cat-h">Five themes I keep coming back to.</h2></div></div>
    <div class="grid-3">${join(categories, (c) => `<div class="card"><h3>${esc(c.id)}</h3><p>${esc(c.body)}</p><span class="card-n">${articles.filter((a) => a.category === c.id).length} essays</span></div>`)}</div>
  </div>
</section>

<section class="section" aria-labelledby="all-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Archive</p><h2 id="all-h">Every essay.</h2></div></div>
    <div class="filters" role="group" aria-label="Filter essays by topic" data-filter-group="writing">
      ${join(["All", ...categories.map((c) => c.id)], (c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`)}
    </div>
    <ul class="article-list" data-filter-list="writing">${join(articles, (a) => `<li data-category="${esc(a.category)}"><a class="article" href="${esc(postHref(a, root))}"${isExternal(a) ? ' rel="noopener"' : ""}><span class="article-title">${esc(a.title)}</span><span class="article-cat">${esc(a.category)}</span><span class="article-note">${esc(a.note)}</span></a></li>`)}</ul>
    <div class="stack mt-9">
      <p class="eyebrow">In draft</p>
      <div class="grid-2">${join(drafts, (d) => `<div class="card"><span class="card-n">${esc(d.category)} · coming soon</span><h3>${esc(d.title)}</h3><p>${esc(d.note)}</p></div>`)}</div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="fw-h">
  <div class="container grid-2" style="align-items:start">
    <div class="stack stack--lg">
      <p class="eyebrow">How the essays are written</p>
      <h2 id="fw-h">Every essay has the same structure.</h2>
      <p class="lede">People don't share information. They share new perspectives, strong opinions, personal experience and frameworks they can reuse. Each essay is built to give the reader at least one of those.</p>
    </div>
    <div class="stack stack--lg">
      <div class="framework" role="img" aria-label="Essay structure: hook 10%, story 25%, insight 35%, framework 20%, ending 10%">
        ${join(framework, (p) => `<span style="flex:${p.share}">${esc(p.part)}</span>`)}
      </div>
      <ol class="reflection">${join(framework, (p) => `<li><p><strong>${esc(p.part)} · ${Math.round((p.share / total) * 100)}%</strong>${esc(p.body)}</p></li>`)}</ol>
    </div>
  </div>
</section>
${ctaBand(root, { eyebrow: "Speaking & writing", title: "Want me on a panel, podcast or in your publication?", body: "I talk about design leadership in regulated products, design systems at volume, and how design teams can deliver faster." })}`;
  return page({ path: "writing/", title: "Writing", description: "Essays on design leadership, delivery, strategy, AI in finance and craft by Ganesh Gaikhe.", body, section: "writing/" });
}

export function aboutPage() {
  const root = "../";
  const body = `
<section class="hero">
  <div class="container">
    <div class="bio-grid">
      <img class="bio-photo" src="${root}assets/img/site/portrait.png" alt="Portrait of ${esc(profile.name)}">
      <div class="stack stack--lg">
        <p class="eyebrow eyebrow--accent">About</p>
        <h1 style="font-size:clamp(2.25rem,1.4rem + 3.2vw,4rem)">I take ownership of the decisions around the screen.</h1>
        <div class="prose">${join(aboutBio, (p) => `<p>${esc(p)}</p>`)}</div>
        <div class="btn-row">
          <a class="btn btn--primary" href="${root}contact/">Get in touch</a>
          <a class="btn btn--secondary" href="${esc(profile.links.linkedin)}" rel="me noopener">LinkedIn ↗</a>
          ${profile.resume ? `<a class="btn btn--secondary" href="${root}assets/${esc(profile.resume)}" download>Download CV</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="cap-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Capabilities</p><h2 id="cap-h">What I'm hired to own.</h2></div></div>
    <div class="grid-4">${join(capabilities, (c) => `<div class="stack"><p class="eyebrow eyebrow--accent">${esc(c.group)}</p><ul class="tag-row">${join(c.items, (i) => `<li class="tag">${esc(i)}</li>`)}</ul></div>`)}</div>
  </div>
</section>

<section class="section" aria-labelledby="exp-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Experience</p><h2 id="exp-h">Twelve years, from interaction design to design leadership.</h2></div></div>
    <ol class="timeline">${join(timeline, (t) => `<li><span class="when">${esc(t.when)}</span><div><h3 style="font-size:var(--fs-lg)">${esc(t.role)} · ${esc(t.org)}</h3><p>${esc(t.body)}</p></div></li>`)}</ol>
  </div>
</section>

<section class="section section--band" aria-label="How I lead">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">How I lead</p><h2>Principles, with their costs.</h2></div><a class="link-arrow" href="${root}process/">The full process</a></div>
    <div class="grid-3">${join(principles, (p) => `<div class="card"><span class="card-n">${esc(p.n)}</span><h3>${esc(p.title)}</h3><p>${esc(p.tradeoff)}</p></div>`)}</div>
    <blockquote class="testimonial mt-9"><p>“${esc(testimonials[0].quote)}”</p><cite><strong>${esc(testimonials[0].who)}</strong>${esc(testimonials[0].what)}</cite></blockquote>
  </div>
</section>
${ctaBand(root)}`;
  return page({ path: "about/", title: "About", description: `${profile.name}: product design lead with twelve years across banking, credit, payments, identity and insurance.`, body, section: "about/" });
}

export function contactPage() {
  const root = "../";
  const subject = encodeURIComponent("Project enquiry");
  const brief = encodeURIComponent("Hi Ganesh,\n\n1. What we're building:\n2. Who it's for:\n3. The deadline or decision driving it:\n4. Who is on the team today:\n5. What a good outcome looks like:\n\nThanks,");
  const body = `
<section class="hero">
  <div class="container contact-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">Contact</p>
      <h1 style="font-size:clamp(2.25rem,1.4rem + 3.2vw,4.25rem)">Tell me what you're trying to ship, and by when.</h1>
      <p class="lede">Full-time leadership roles, freelance engagements, speaking and writing: email is fastest. ${esc(profile.responseTime)}</p>
      <div class="btn-row"><a class="btn btn--accent" href="mailto:${esc(profile.email)}?subject=${subject}&body=${brief}">Email me a brief</a><a class="btn btn--secondary" href="${root}freelance/">Freelance engagements</a></div>
    </div>
    <div class="stack">
      <div class="contact-item"><span class="eyebrow">Email</span><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></div>
      <div class="contact-item"><span class="eyebrow">LinkedIn</span><a href="${esc(profile.links.linkedin)}" rel="me noopener">Ganesh Gaikhe ↗</a></div>
      <div class="contact-item"><span class="eyebrow">Writing</span><a href="${esc(profile.links.medium)}" rel="me noopener">Medium ↗</a></div>
      <div class="contact-item"><span class="eyebrow">Based in</span><span>${esc(profile.location)}</span></div>
    </div>
  </div>
</section>
<section class="section section--muted">
  <div class="container--narrow brief-template stack">
    <p class="eyebrow">A useful first email answers five questions</p>
    <ol class="stack">
      <li>What you're building, and what stage it's at.</li>
      <li>Who it's for: customers, staff, partners.</li>
      <li>The deadline, launch or decision driving the timing.</li>
      <li>Who's on the team today: design, product, engineering.</li>
      <li>What a good outcome looks like in three months.</li>
    </ol>
    <p class="muted">The “Email me a brief” button above opens a draft with these questions already filled in.</p>
  </div>
</section>`;
  return page({ path: "contact/", title: "Contact", description: "Get in touch about design leadership roles, freelance engagements, speaking or writing.", body, section: "contact/" });
}

export function notFoundPage() {
  const body = `<section class="hero"><div class="container stack stack--lg"><p class="eyebrow eyebrow--accent">404</p><h1>This page was frozen <em>before it shipped.</em></h1><p class="lede">The link may be from an older version of the portfolio.</p><div class="btn-row"><a class="btn btn--primary" href="/">Go home</a><a class="btn btn--secondary" href="/work/">See the case studies</a></div></div></section>`;
  return page({ path: "404.html", title: "Not found", description: "Page not found.", body });
}
