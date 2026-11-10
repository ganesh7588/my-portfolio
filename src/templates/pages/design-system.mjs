import { page, esc, join, ctaBand } from "../layout.mjs";
import { systemDemo } from "../blocks.mjs";

const principles = [
  { n: "01", title: "Foundations before modules", body: "Tokens, type, spacing, elevation, accessibility and grid come first. The first weeks produce no visible screens, and that is a decision I defend, not apologise for.", proof: ["equitas-credit-card", "Equitas: what I'd lock even earlier"] },
  { n: "02", title: "Brand arrives as tokens, not a style guide", body: "Colour, type and spacing reach screens as variables. A complete dark theme becomes a change of values, not a redesign.", proof: ["fcb-market-entry", "FCB: dark theme from a token change"] },
  { n: "03", title: "Configure, don't fork", body: "Market, partner and segment differences become settings in the system. A new market or white-label client is set up through configuration, not a new codebase.", proof: ["fcb-market-entry", "FCB: four markets, one product"] },
  { n: "04", title: "Motion and states live in the system", body: "Transitions, error states, empty states and loading are specified once, so they behave the same on Android, iOS and web.", proof: ["fcb-market-entry", "FCB: motion inside the system"] },
  { n: "05", title: "Govern it like a product", body: "A system needs an owner, a contribution path, a changelog and design QA. Without those it slowly falls apart as the organisation grows.", proof: ["orion180-pryzmiq", "Orion180: two years of governance"] },
  { n: "06", title: "Measure the system's value from day one", body: "Agree up front how you'll measure cycle time, rework and coverage. The biggest gap in my Orion180 story is that nobody measured the baseline.", proof: ["orion180-pryzmiq", "Orion180: the lesson"] },
];

const anatomy = [
  { t: "Tokens", d: "Colour, type, space, radius, elevation, motion. Semantic names on top of primitives." },
  { t: "Components", d: "Inputs, buttons, tables, cards, alerts, navigation, with every state." },
  { t: "Patterns", d: "Forms, filters, onboarding, capture, approvals: components working together." },
  { t: "Templates", d: "Dashboards, detail pages and flows, built to be extended." },
  { t: "Products", d: "Portals, apps, SDKs and white-label variants, all from one source." },
];

const coverage = [
  ["FCB", "Retail banking app", "Android · iOS", "Brand from zero, tokens, motion spec, dark theme"],
  ["Equitas", "Credit card app", "Mobile", "IA + tokens + component library across 30+ modules"],
  ["Orion180 & PryzmIQ", "Insurance ecosystem", "Web · PWA · native", "One system across six surfaces, governance and design QA"],
  ["IdentitySense", "KYC SDK", "Mobile · desktop", "White-label theming through tokens, no code per partner"],
];

const colours = [
  { name: "Paper", token: "--paper", hex: "#fcfcfa", note: "Page background" },
  { name: "Ink", token: "--ink", hex: "#0b0b0c", note: "19.2:1 on paper" },
  { name: "Ink muted", token: "--ink-muted", hex: "#4f4f55", note: "7.9:1 on paper" },
  { name: "Ink subtle", token: "--ink-subtle", hex: "#66666d", note: "5.5:1 on paper · metadata" },
  { name: "Signal", token: "--signal", hex: "#1b36ff", note: "6.8:1 on paper · links, focus" },
  { name: "Signal wash", token: "--signal-wash", hex: "#eceefe", note: "Highlight surfaces" },
];

const contrast = [
  ["Ink on paper", "#0b0b0c / #fcfcfa", "19.2:1", "AAA"],
  ["Ink muted on paper", "#4f4f55 / #fcfcfa", "7.9:1", "AAA"],
  ["Ink subtle on paper", "#66666d / #fcfcfa", "5.5:1", "AA"],
  ["Signal on paper", "#1b36ff / #fcfcfa", "6.8:1", "AA"],
  ["Signal on signal wash", "#1b36ff / #eceefe", "6.0:1", "AA"],
  ["Dark: text on ground", "#f1f1ee / #0d0d10", "17.1:1", "AAA"],
  ["Dark: signal on ground", "#93a2ff / #0d0d10", "8.2:1", "AAA"],
];

const type = [
  ["Display", "--fs-display", "clamp(40 → 84px)", "font-family:var(--font-display);font-size:clamp(2rem,1.4rem + 2.6vw,3.25rem);font-weight:650;letter-spacing:-.035em;line-height:1", "Decide weekly."],
  ["Heading 2", "--fs-h2", "clamp(30 → 48px)", "font-family:var(--font-display);font-size:var(--fs-h2);font-weight:650;letter-spacing:-.022em;line-height:1.05", "Hold the decision."],
  ["Heading 3", "--fs-h3", "clamp(20 → 26px)", "font-family:var(--font-display);font-size:var(--fs-h3);font-weight:650", "The challenge map"],
  ["Lede", "--fs-lg", "18px", "font-size:var(--fs-lg);color:var(--text-muted)", "Research did not decorate this brief. It changed it."],
  ["Body", "--fs-md", "16px", "font-size:var(--fs-md)", "Every request was handled as part of a shared pattern."],
  ["Eyebrow", "--fs-xs mono", "12px", "font-family:var(--font-mono);font-size:var(--fs-xs);letter-spacing:.1em;text-transform:uppercase;color:var(--text-subtle)", "Phase 02 · Discovery"],
];

const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

const motion = [
  ["--t-fast", "140ms", "Hover, press, focus, border and colour changes"],
  ["--t-normal", "220ms", "Menus, tabs, panels, link arrows"],
  ["--t-slow", "600ms", "Scroll reveals, image transitions, token demo"],
  ["--ease-enter", "cubic-bezier(.16,1,.3,1)", "Anything arriving on screen"],
];

export function designSystemPage() {
  const root = "../";
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div class="stack stack--lg">
      <p class="eyebrow eyebrow--accent">Design systems</p>
      <h1>A design system is a delivery decision <em>made before anyone asks for it.</em></h1>
    </div>
    <div class="hero-side">
      <p class="lede">At 2,000 or 3,000 screens, drawing each screen is the easy part and keeping them consistent is the hard part. This page covers how I build systems that make volume safe, and the system this site is built on, with contrast ratios measured.</p>
      <div class="btn-row"><a class="btn btn--secondary btn--sm" href="#approach">My approach</a><a class="btn btn--secondary btn--sm" href="#this-site">This site's system</a></div>
    </div>
  </div>
</section>

<section class="section" id="approach" style="padding-top:0" aria-labelledby="ap-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Approach</p><h2 id="ap-h">Six principles, each learned on a real project.</h2></div></div>
    <div class="grid-3">${join(principles, (p) => `<div class="card reveal"><span class="card-n">${esc(p.n)}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><a class="link-arrow" href="${root}work/${esc(p.proof[0])}/">${esc(p.proof[1])}</a></div>`)}</div>
  </div>
</section>

<section class="section section--muted" aria-labelledby="an-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0"><div><p class="eyebrow">Anatomy</p><h2 id="an-h">From a token to a product.</h2></div><p>Every layer only uses the layer before it. That rule is what lets a new market, partner or theme be set up through configuration.</p></div>
    <ol class="anatomy">${join(anatomy, (a) => `<li><strong>${esc(a.t)}</strong><span>${esc(a.d)}</span></li>`)}</ol>
  </div>
</section>

<section class="section" aria-labelledby="demo-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0"><div><p class="eyebrow">See it work</p><h2 id="demo-h">Three surfaces, one set of tokens.</h2></div><p>A working example of the Orion180 idea: a customer portal, an ops queue and a capture screen, all drawing from the same variables. Change a token and every surface follows.</p></div>
    ${systemDemo()}
  </div>
</section>

<section class="section section--muted" aria-labelledby="cov-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0"><div><p class="eyebrow">Systems I've led</p><h2 id="cov-h">Where these principles were tested.</h2></div></div>
    <div class="table-wrap"><table class="data">
      <thead><tr><th scope="col">Project</th><th scope="col">Product</th><th scope="col">Platforms</th><th scope="col">What the system did</th></tr></thead>
      <tbody>${join(coverage, (r) => `<tr>${join(r, (c) => `<td>${esc(c)}</td>`)}</tr>`)}</tbody>
    </table></div>
  </div>
</section>

<section class="section" id="this-site" aria-labelledby="site-h">
  <div class="container stack stack--lg">
    <div class="section-head" style="margin-bottom:0"><div><p class="eyebrow">This site's system</p><h2 id="site-h">The same rules, applied to this portfolio.</h2></div><p>One token file drives every page. Light and dark are value swaps. Every text colour meets WCAG AA, and most meet AAA.</p></div>

    <h3>Colour</h3>
    <div class="swatches">${join(colours, (c) => `<div class="swatch"><div class="swatch-chip" style="background:${c.hex}"></div><div class="swatch-body"><strong>${esc(c.name)}</strong><code>${esc(c.token)} · ${esc(c.hex)}</code><span class="muted">${esc(c.note)}</span></div></div>`)}</div>

    <h3 class="mt-7">Measured contrast</h3>
    <div class="table-wrap"><table class="data">
      <thead><tr><th scope="col">Pair</th><th scope="col">Values</th><th scope="col">Ratio</th><th scope="col">WCAG</th></tr></thead>
      <tbody>${join(contrast, (r) => `<tr><td>${esc(r[0])}</td><td><code>${esc(r[1])}</code></td><td>${esc(r[2])}</td><td class="pass">${esc(r[3])}</td></tr>`)}</tbody>
    </table></div>

    <h3 class="mt-7">Type</h3>
    <p class="muted max-60">Archivo for display, Inter for reading, a system monospace for labels. Six steps, fluid between 390px and 1440px.</p>
    <div class="type-scale">${join(type, (t) => `<div class="type-row"><span><strong>${esc(t[0])}</strong><br><code>${esc(t[1])} · ${esc(t[2])}</code></span><span style="${t[3]}">${esc(t[4])}</span></div>`)}</div>

    <div class="grid-2 mt-7">
      <div class="stack"><h3>Space</h3><p class="muted">A 4px base, used for every gap and padding.</p>
        <div class="spacing">${join(space, (s) => `<div class="spacing-row"><span>${s}px</span><span class="spacing-bar" style="width:${(s / 128) * 100}%"></span></div>`)}</div>
      </div>
      <div class="stack"><h3>Motion</h3><p class="muted">Every animation has a reduced-motion equivalent that shows the final state immediately. Nothing is only visible after it moves.</p>
        <div class="table-wrap"><table class="data"><thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Used for</th></tr></thead>
        <tbody>${join(motion, (m) => `<tr><td><code>${esc(m[0])}</code></td><td>${esc(m[1])}</td><td>${esc(m[2])}</td></tr>`)}</tbody></table></div>
      </div>
    </div>
  </div>
</section>
${ctaBand(root, { eyebrow: "Systems work", title: "If your product has outgrown its foundations, let's talk about the system before the next feature." })}`;
  return page({ path: "design-system/", title: "Design system", description: "How I build design systems that make volume safe: principles, anatomy, systems I've led, and this site's own tokens with measured contrast.", body, section: "design-system/" });
}
