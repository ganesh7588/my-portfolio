// Site-wide content: identity, positioning, principles, career.

export const profile = {
  name: "Ganesh Gaikhe",
  role: "Product Design Lead",
  tagline: "Product design lead for regulated financial products",
  email: "ganesh.gaikhe90@gmail.com",
  location: "India · working with teams across India, the US, Africa and the GCC",
  domain: "https://ganeshgaikhe.com",
  links: {
    linkedin: "https://www.linkedin.com/in/ganesh-gaikhe%F0%9F%87%AE%F0%9F%87%B3-54957a102/",
    medium: "https://ganesh-gaikhe90.medium.com/",
    podcast: "https://open.spotify.com/episode/5hkfTE7g0UYRbh5nFsnbZB",
  },
  // Drop your CV into src/assets/ and set this to its filename to show the download link.
  resume: null,
  responseTime: "I reply to every message within two working days.",
  availability: "Taking on a small number of independent engagements alongside my lead role.",
};

export const nav = [
  { href: "work/", label: "Work" },
  { href: "projects/", label: "Projects" },
  { href: "process/", label: "Process" },
  { href: "design-system/", label: "Design system" },
  { href: "freelance/", label: "Freelance" },
  { href: "writing/", label: "Writing" },
  { href: "about/", label: "About" },
];

export const hero = {
  eyebrow: "Product Design Lead · banking, credit, insurance",
  title: ["I lead design for financial products where ", "the hard part is everything around the screen."],
  lede: "A bank's first credit card in a 12-week phase. A market entry shipped on two platforms in four weeks. An insurance ecosystem unified on one design system over two years. Each one was won or lost on decisions about scope, cadence, stakeholders and systems, and those are the decisions I lead.",
  proof: ["a small finance bank in India", "a retail bank in Southern Africa", "a US property insurer", "Winjit Technologies"],
};

// The three operating principles, each tied to the project that proved it.
export const principles = [
  {
    n: "01",
    title: "Decide weekly, and hold the decision",
    body: "Deadlines are usually killed by open feedback loops, not hard problems. I run a fixed review where stakeholders are heard, and a freeze afterwards where decisions stay closed.",
    tradeoff: "The cost: a better idea that arrives on Thursday waits for the next cycle.",
    proof: { label: "Proved at Mahali", slug: "mahali-market-entry" },
  },
  {
    n: "02",
    title: "The system is what makes the volume possible",
    body: "At three thousand screens, drawing each screen is the easy part and keeping them consistent is the hard part. Tokens and components come before modules, not alongside them.",
    tradeoff: "The cost: the first weeks produce foundations instead of screens, and that is uncomfortable to defend.",
    proof: { label: "Proved at Nivara", slug: "nivara-credit-card" },
  },
  {
    n: "03",
    title: "Criteria beat opinions",
    body: "Every significant decision is judged on the same five criteria (user evidence, business impact, technical feasibility, operational load, scalability) in front of the people it affects.",
    tradeoff: "The cost: it is slower than deciding in the room, and it sometimes rules against the nicer design.",
    proof: { label: "Proved at Aster360", slug: "aster360-lumora" },
  },
];

// The situations I'm brought in for.
export const situations = [
  { n: "01", title: "Market entry under a hard deadline", body: "A product has to exist in a new market in weeks, on both platforms, with no brand and no system to build on.", slug: "mahali-market-entry", cta: "Mahali, four weeks" },
  { n: "02", title: "A first-of-its-kind product in a regulated category", body: "The institution has never shipped this product before. Research has to set the strategy, and compliance is involved from week one.", slug: "nivara-credit-card", cta: "Nivara, first credit card" },
  { n: "03", title: "An ecosystem that outgrew its foundations", body: "Several products, several platforms, no shared language. Every new feature pays the inconsistency cost twice: once in design, once in build.", slug: "aster360-lumora", cta: "Aster360, two years" },
];

export const testimonials = [
  {
    quote: "Ganesh creates clarity where there is ambiguity. He challenges the team to think deeper, keeps everyone aligned to the customer problem, and never asks for a standard solution when a better one is possible.",
    who: "Rohan Mehra",
    what: "VP, Digital Banking",
  },
];

export const timeline = [
  { when: "2019 — present", org: "Winjit Technologies", role: "Product Design Lead (UX Consultant)", body: "Design lead on client engagements in banking, credit, payments, identity and insurance. Owned research through to shipped system on Nivara, Mahali and Aster360, including design-system governance, delivery rhythm and day-to-day work with product and engineering. Product design on Winjit's own IdentitySense and AuthSense platforms." },
  { when: "2017 — 2019", org: "DIFADBIZ", role: "UX Designer", body: "Product and platform work across B2B and consumer web, with a growing share of research and information architecture." },
  { when: "2016 — 2018", org: "Digiperfect", role: "UX Designer", body: "End-to-end interface design for web and mobile products, working directly with founders and small delivery teams." },
  { when: "2014 — 2016", org: "Vajrakaya", role: "Junior UX Designer", body: "Where I started: interaction design, prototyping, and my first real experience of designing within constraints set by someone else." },
];

export const capabilities = [
  { group: "Leadership", items: ["Design direction", "Team cadence & rituals", "Stakeholder management", "Scrum facilitation", "Mentoring & critique", "Design operations"] },
  { group: "Strategy & research", items: ["Field research", "Interview synthesis", "Competitive benchmarking", "Service design & blueprints", "Scope & roadmap shaping", "Workshop facilitation"] },
  { group: "Systems & craft", items: ["Design systems & tokens", "Information architecture", "Interaction & motion", "Prototyping", "Accessibility (WCAG)", "White-label theming"] },
  { group: "Domains", items: ["Retail & digital banking", "Credit cards", "Payments & UPI", "KYC & identity", "Property insurance", "Regulated & compliance-heavy products"] },
];

export const aboutBio = [
  "I'm a product design lead with more than a decade of experience in banking, credit, payments, identity and insurance. Most of my work happens where the design problem is tangled up with a delivery problem: a deadline that does not move, a regulator in the room, five audiences sharing one workflow, or thousands of screens that must stay consistent.",
  "I've learned that this kind of product is rarely made or broken by a single screen. It depends on the decisions around the screen: what goes into Phase 1, when feedback closes, which request becomes a pattern and which waits, and whether the system arrives before the volume. Those are the decisions I take ownership of.",
  "I've been at Winjit Technologies since 2019, leading design on client engagements and on Winjit's own platforms. Before that I worked as a UX designer at DIFADBIZ, Digiperfect and Vajrakaya. I write about design leadership on Medium and take on a small number of independent engagements each year.",
];
