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

// ---------------------------------------------------------------------------
// Feature sections: text on the left, a live visual on the right.
// ---------------------------------------------------------------------------

/** This site's real tokens, grouped the way a variables panel groups them. */
const collections = [
  { name: "Themes", rows: [
    ["background", "paper", "#fcfcfa"], ["foreground", "ink", "#0b0b0c"], ["surface", "paper-raised", "#ffffff"],
    ["surface-muted", "paper-sunken", "#f1f1ec"], ["text-muted", "ink-muted", "#4f4f55"], ["text-subtle", "ink-subtle", "#66666d"],
    ["border", "line", "#e2e2dc"], ["border-strong", "line-strong", "#c9c9c0"], ["accent", "signal", "#1b36ff"],
    ["accent-wash", "signal-wash", "#eceefe"], ["label", "flare", "#c2410c"],
  ] },
  { name: "Typography", rows: [
    ["font-display", "Newsreader"], ["font-sans", "Inter"], ["font-mono", "ui-monospace"],
    ["fs-display", "clamp 40 → 84px"], ["fs-h2", "clamp 30 → 48px"], ["fs-h3", "clamp 20 → 26px"],
    ["fs-lg", "18px"], ["fs-md", "16px"], ["fs-sm", "14px"], ["fs-xs", "12px"],
  ] },
  { name: "Spacing", rows: [["s-1", "4px"], ["s-2", "8px"], ["s-3", "12px"], ["s-4", "16px"], ["s-5", "24px"], ["s-6", "32px"], ["s-7", "40px"], ["s-8", "48px"], ["s-9", "64px"], ["s-10", "80px"], ["s-11", "96px"], ["s-12", "128px"]] },
  { name: "Radius", rows: [["r-sm", "6px"], ["r-md", "10px"], ["r-lg", "14px"], ["r-pill", "999px"]] },
  { name: "Motion", rows: [["t-fast", "140ms"], ["t-normal", "220ms"], ["t-slow", "600ms"], ["ease", "cubic-bezier(.2,.8,.2,1)"], ["ease-enter", "cubic-bezier(.16,1,.3,1)"]] },
];

export const tokenPanel = () => `<div class="tp" data-tp>
  <div class="tp-side">
    <p class="tp-title"><span class="tp-dot" aria-hidden="true"></span>Collections</p>
    <div class="tp-tabs" role="tablist" aria-label="Token collections">
      ${join(collections, (c, i) => `<button type="button" role="tab" class="tp-tab" aria-selected="${i === 0}" data-tp-tab="${i}"><span>${esc(c.name)}</span><span class="tp-count">${c.rows.length}</span></button>`)}
    </div>
  </div>
  <div class="tp-table">
    ${join(collections, (c, i) => `<ul class="tp-rows" role="tabpanel" data-tp-panel="${i}"${i === 0 ? "" : " hidden"}>
      ${join(c.rows, (r, j) => `<li style="--i:${j}"><span class="tp-name"><span class="tp-ico" aria-hidden="true"></span>${esc(r[0])}</span><span class="tp-val">${r[2] ? `<span class="tp-sw" style="background:${r[2]}" aria-hidden="true"></span>` : ""}${esc(r[1])}</span></li>`)}
    </ul>`)}
  </div>
</div>`;

/** An angled sheet of small components. Every figure on it comes from the case studies. */
export const isoCollage = () => {
  const signal = [["Rewards", 82], ["Add-on cards", 32], ["Travel", 22], ["Billing cycle", 21], ["Charges", 20], ["UPI", 19], ["Limits", 16]];
  return `<div class="iso" data-iso aria-hidden="true">
  <div class="iso-plane">
    <div class="iso-card iso-card--wide" style="--z:0">
      <span class="iso-label">Interview signal · n=45</span>
      <div class="iso-bars">${join(signal, (s) => `<span style="--h:${Math.round((s[1] / 82) * 100)}%"${s[0] === "Rewards" || s[0] === "Charges" ? ' class="is-lead"' : ""}><i></i><b>${esc(s[0])}</b></span>`)}</div>
    </div>
    <div class="iso-card" style="--z:1"><span class="iso-label">Screens frozen</span><strong class="iso-kpi">2,000+</strong><span class="iso-sub">4 weekly cycles</span></div>
    <div class="iso-card" style="--z:2"><span class="iso-label">Wednesday review</span><div class="iso-row"><span>Freeze decisions</span><span class="iso-toggle"></span></div><div class="iso-row"><span>Late ideas → next cycle</span><span class="iso-toggle"></span></div></div>
    <div class="iso-card" style="--z:1"><span class="iso-label">Verify</span><div class="iso-otp"><span>4</span><span>2</span><span class="is-on">1</span><span></span></div><span class="iso-btn">Continue</span></div>
    <div class="iso-card iso-card--wide" style="--z:3">
      <span class="iso-label">QA queue</span>
      <div class="iso-row"><span>INS-2041 · Roof</span><span class="iso-pill iso-pill--warn">Needs retake</span></div>
      <div class="iso-row"><span>INS-2038 · Kitchen</span><span class="iso-pill iso-pill--ok">Approved</span></div>
      <div class="iso-row"><span>INS-2033 · Exterior</span><span class="iso-pill">In review</span></div>
    </div>
    <div class="iso-card" style="--z:2"><span class="iso-label">Surfaces on one library</span><strong class="iso-kpi">6</strong><div class="iso-seg"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
    <div class="iso-card" style="--z:0"><span class="iso-label">Tokens</span><div class="iso-swatches"><i style="background:#0b0b0c"></i><i style="background:#1b36ff"></i><i style="background:#c2410c"></i><i style="background:#eceefe"></i><i style="background:#f1f1ec"></i></div><span class="iso-sub">Light · Dark · Partner</span></div>
    <div class="iso-card" style="--z:1"><span class="iso-label">Phase 1 scope</span><div class="iso-row"><span>Charges up front</span><span class="iso-check"></span></div><div class="iso-row"><span>Family cards</span><span class="iso-check"></span></div><div class="iso-row"><span>Two onboarding paths</span><span class="iso-check"></span></div></div>
    <div class="iso-card iso-card--wide" style="--z:2"><span class="iso-label">Inspection journey</span><div class="iso-steps"><span class="is-done">Verify</span><span class="is-done">Profile</span><span class="is-done">Interior</span><span class="is-now">Exterior</span><span>Utilities</span><span>Quality check</span></div></div>
  </div>
</div>`;
};

/**
 * @param {object} o  { eyebrow, title, lede, checks[], cta:{href,label}, visual (html), id, flip }
 */
export const featureSplit = (o) => `<div class="feature${o.flip ? " feature--flip" : ""}">
  <div class="feature-copy reveal">
    <p class="eyebrow eyebrow--accent">${esc(o.eyebrow)}</p>
    <h2${o.id ? ` id="${esc(o.id)}"` : ""}>${esc(o.title)}</h2>
    <p class="lede">${esc(o.lede)}</p>
    <ul class="checklist checklist--quiet">${join(o.checks, (c) => `<li>${esc(c)}</li>`)}</ul>
    ${o.cta ? `<a class="btn btn--secondary" href="${esc(o.cta.href)}">${esc(o.cta.label)}<span class="btn-arrow" aria-hidden="true">↗</span></a>` : ""}
  </div>
  <div class="feature-visual reveal">${o.visual}</div>
</div>`;
