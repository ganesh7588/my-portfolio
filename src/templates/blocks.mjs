import { esc, join } from "./layout.mjs";

// Evidence blocks used inside case-study lifecycle phases.
// `img(src)` resolves an asset path relative to the current page.

export function decision(d, n) {
  return `<article class="decision">
  <div class="decision-head"><span class="card-n">Decision ${esc(n)}</span><h3>${esc(d.title)}</h3></div>
  <div class="decision-grid">
    <div class="decision-cell"><p class="eyebrow">The tension</p><p>${esc(d.tension)}</p></div>
    <div class="decision-cell"><p class="eyebrow">Options on the table</p><p>${esc(d.options)}</p></div>
    <div class="decision-cell decision-cell--choice"><p class="eyebrow">What I chose, and why</p><p>${esc(d.choice)}</p></div>
    <div class="decision-cell decision-cell--cost"><p class="eyebrow">What it cost</p><p>${esc(d.cost)}</p></div>
  </div>
</article>`;
}

export function figure(b, img) {
  return `<figure class="fig${b.constrained ? " fig--constrained" : ""}">
  <div class="fig-media"><img src="${img(b.src)}" alt="${esc(b.alt)}" loading="lazy" decoding="async"></div>
  ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}
</figure>`;
}

const cards = (b) => `<div class="stack">
  ${b.label ? `<p class="eyebrow">${esc(b.label)}</p>` : ""}
  <div class="grid-${Math.min(b.cards.length, 3)}">${join(b.cards, (c) => `<div class="card"><span class="card-n">${esc(c.n)}</span><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></div>`)}</div>
</div>`;

const tags = (b) => `<div class="stack">
  ${b.label ? `<p class="eyebrow">${esc(b.label)}</p>` : ""}
  <ul class="tag-row">${join(b.tags, (t) => `<li class="tag">${esc(t)}</li>`)}</ul>
</div>`;

const chart = (b) => `<figure class="fig">
  <p class="eyebrow mb-5">${esc(b.label)}</p>
  <div class="chart" role="list">
    ${join(b.rows, (r) => `<div class="chart-row${r.lead ? " chart-row--lead" : ""}" role="listitem">
      <span class="chart-label">${esc(r.label)}</span>
      <span class="chart-track" aria-hidden="true"><span class="chart-bar" style="width:${((r.value / b.max) * 100).toFixed(1)}%"></span></span>
      <span class="chart-val">${esc(r.value)}</span>
    </div>`)}
  </div>
  <figcaption>${esc(b.caption)}</figcaption>
</figure>`;

const compare = (b, img) => `<figure class="fig compare-fig">
  <div class="compare" style="--pos:50%">
    <span class="compare-tag compare-tag--a">${esc(b.beforeLabel)}</span>
    <span class="compare-tag compare-tag--b">${esc(b.afterLabel)}</span>
    <img src="${img(b.before)}" alt="${esc(b.alt)} (${esc(b.beforeLabel)})" loading="lazy">
    <div class="compare-top"><img src="${img(b.after)}" alt="${esc(b.alt)} (${esc(b.afterLabel)})" loading="lazy"></div>
    <span class="compare-handle" aria-hidden="true"></span>
    <input type="range" min="0" max="100" value="50" aria-label="Compare ${esc(b.beforeLabel)} and ${esc(b.afterLabel)}">
  </div>
  <figcaption>${esc(b.caption)}</figcaption>
</figure>`;

const quote = (b) => `<blockquote class="quote"><p>${esc(b.quote)}</p><cite>${esc(b.attribution)}</cite></blockquote>`;

const story = (b, img) => `<div class="stack">
  <p class="eyebrow">${esc(b.label)}</p>
  <div class="story" data-story>
    <div class="story-media"><div class="story-frame">
      ${join(b.steps, (s, i) => `<img src="${img(s.src)}" alt="${esc(s.alt)}" class="${i === 0 ? "is-active" : ""}" loading="lazy">`)}
    </div></div>
    <ol class="story-steps">
      ${join(b.steps, (s, i) => `<li class="story-step${i === 0 ? " is-active" : ""}" data-i="${i}">
        <span class="eyebrow eyebrow--accent">${esc(s.n)}</span>
        <h3>${esc(s.title)}</h3>
        <div class="story-inline"><img src="${img(s.src)}" alt="" loading="lazy"></div>
        <p>${esc(s.body)}</p>
      </li>`)}
    </ol>
  </div>
</div>`;

export const systemDemo = () => `<div class="demo" data-demo>
  <div class="demo-controls">
    <fieldset><legend class="eyebrow">Theme</legend><div class="seg" data-group="theme">
      <button type="button" data-v="light" aria-pressed="true">Light</button><button type="button" data-v="dark" aria-pressed="false">Dark</button><button type="button" data-v="partner" aria-pressed="false">Partner brand</button>
    </div></fieldset>
    <fieldset><legend class="eyebrow">Radius</legend><div class="seg" data-group="radius">
      <button type="button" data-v="4" aria-pressed="false">Sharp</button><button type="button" data-v="12" aria-pressed="true">Soft</button><button type="button" data-v="22" aria-pressed="false">Round</button>
    </div></fieldset>
    <fieldset><legend class="eyebrow">Density</legend><div class="seg" data-group="density">
      <button type="button" data-v="14" aria-pressed="false">Compact</button><button type="button" data-v="20" aria-pressed="true">Comfortable</button>
    </div></fieldset>
  </div>
  <div class="demo-stage">
    <div class="d-card"><span class="d-eyebrow">Customer portal · Policy</span><span class="d-kpi">$1,284.00</span><span class="d-muted">Annual premium · renews 14 Mar</span><span class="d-btn">Review coverage</span></div>
    <div class="d-card"><span class="d-eyebrow">Ops tool · QA queue</span>
      <div class="d-row"><span>INS-2041 · Roof</span><span class="d-pill">Needs retake</span></div>
      <div class="d-row"><span>INS-2038 · Kitchen</span><span class="d-pill">Approved</span></div>
      <div class="d-row"><span>INS-2033 · Exterior</span><span class="d-pill">In review</span></div>
    </div>
    <div class="d-card"><span class="d-eyebrow">Inspection app · Capture</span><span class="d-field">Front elevation, whole house in frame</span><span class="d-muted">Step 4 of 7 · Exterior</span><span class="d-btn">Take photo</span></div>
  </div>
  <pre aria-live="polite" data-demo-code></pre>
</div>`;

export function evidence(b, img) {
  switch (b.type) {
    case "figure": return figure(b, img);
    case "figpair": return `<div class="fig-pair">${join(b.items, (i) => figure(i, img))}</div>`;
    case "cards": return cards(b);
    case "tags": return tags(b);
    case "chart": return chart(b);
    case "compare": return compare(b, img);
    case "quote": return quote(b);
    case "stickystory": return story(b, img);
    case "systemdemo": return `<div class="stack"><p class="eyebrow">Try the mechanism: three surfaces, one set of tokens</p>${systemDemo()}<p class="muted" style="font-size:var(--fs-sm)">Change a token and every surface follows. That is why a new feature could be built as an extension rather than a new design project.</p></div>`;
    default: return "";
  }
}
