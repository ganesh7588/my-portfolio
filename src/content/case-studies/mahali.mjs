// Mahali — market entry in four weeks.
// Every fact in this file comes from the published portfolio and project records.
// Do not add metrics that cannot be sourced (see CONTENT-TODO.md).

export default {
  slug: "mahali-market-entry",
  client: "Mahali",
  order: 2,
  card: {
    title: "A market entry with four weeks on the clock",
    line: "Shipped on Android and iOS inside the one-month window, as one configurable product rather than a regional fork.",
    tags: ["Retail banking", "Design system", "Brand from zero"],
  },
  heroTitle: ["Four people, 2,000 screens, and a market that had ", "never heard of us."],
  dek: "Mahali needed its entry product for a new market on Android and iOS, on a one-month deadline, as one global solution rather than a regional fork. No brand, no design system, no customers we had met. This is how the month was run, and the six problems we hit along the way.",
  domain: "Retail banking · Southern Africa",
  cover: { src: "img/mahali/cover.png", alt: "Mahali banking app screens: account overview, country selection, transfers, loan calculator and card management" },
  facts: [
    ["My role", "Design Lead: direction, cadence, stakeholders"],
    ["Team", "2 UI designers, 1 UX researcher, me"],
    ["Timeline", "4 weeks, end to end"],
    ["Platforms", "Android · iOS, one shared system"],
  ],
  metrics: [
    { num: "2,000+", label: "screens designed, reviewed and frozen across four weekly cycles", source: "Project files" },
    { num: "4", label: "research → design → freeze cycles, run in parallel rather than in sequence", source: "Delivery plan" },
    { num: "2", label: "platforms shipped from one token and component foundation", source: "Design system" },
  ],
  brief: {
    lede: "The month worked because of operating decisions made in week one, not because of any single screen.",
    situation: "Mahali's entry into a new regional market, and the top priority on its roadmap.",
    constraint: "Launch in one month, and launch as one global solution rather than a patchwork of regional fixes. Those two demands pull against each other.",
    mandate: "Own all of it: set direction, build a working rhythm for four people, keep stakeholder input from derailing the schedule, and still ship something customers in an unfamiliar market would trust.",
  },
  lifecycle: [
    {
      id: "mandate",
      phase: "Mandate",
      when: "Week 1",
      title: "Two demands that could not both be met the normal way",
      challenge: "A one-month deadline and a one-global-product requirement. The scope covered Android, iOS, a design system and a brand identity that did not exist yet. A normal plan (discover, define, design, test) needed about three months.",
      moves: [
        "Rewrote the plan as three operating decisions instead of a phase chart, so the team knew the rules before anyone drew a screen.",
        "Split the work into whole flows with clear owners, so two designers could work in parallel without waiting on each other.",
        "Became the only entry point for stakeholders and project managers, so the makers got decisions instead of noise.",
      ],
      unlocked: "From the first week the team had one way of working that would last until launch. Nobody re-planned in week two.",
    },
    {
      id: "discovery",
      phase: "Discovery",
      when: "Week 1–4, weekly",
      title: "Discovery would have eaten the whole month",
      challenge: "Proper discovery takes weeks we did not have. Skipping it meant designing for a market none of us knew first-hand.",
      moves: [
        "Ran discovery and design side by side. Our researcher ran user, group and stakeholder interviews every week while design kept moving.",
        "Fed each week's findings straight into the screens being designed, so we could change course while it was still cheap.",
        "Had the designers sit in on interviews, so they built their own sense of the customer instead of only reading tickets.",
      ],
      decision: {
        title: "Run research and design in parallel, not in sequence",
        tension: "Up-front discovery protects quality but burns the calendar. Desk research is fast but blind.",
        options: "A short discovery sprint, then design. Desk research only. Or weekly research cycles feeding design as it moved.",
        choice: "Weekly parallel cycles. Design started on stated assumptions, and every week's synthesis corrected course. We never lost a week waiting.",
        cost: "Two weeks of screens were built on assumptions that turned out wrong and had to be redrawn. Cheaper than a two-week wait, but not free.",
      },
      evidence: [
        {
          type: "cards",
          label: "What the audit and interviews found",
          cards: [
            { n: "01", title: "Four countries behaved like four different banks", body: "Feature sets, billers, payment rails and compliance rules differed sharply. One market needed dual-currency handling, another had FX accounts that could not trade FX, a third required live cost display." },
            { n: "02", title: "Engagement died after the transaction", body: "Login frequency dropped sharply: customers paid once and disappeared for weeks. Stakeholders blamed a thin biller ecosystem and a dull landing screen, which made the home dashboard the battleground." },
            { n: "03", title: "Branches were absorbing what the app could not do", body: "Confirmation letters, proof-of-payment documents and beneficiary changes all went through branch staff by hand. Moving these into self-service became the backbone of the new information architecture." },
          ],
        },
        { type: "tags", label: "Methods", tags: ["User interviews", "Group interviews", "Stakeholder interviews", "Interview synthesis", "Usability testing"] },
      ],
      unlocked: "By the end of week one, real evidence was shaping the screens. Before, it would have been a slide deck still waiting for a design phase.",
    },
    {
      id: "definition",
      phase: "Definition",
      when: "Week 1 onward",
      title: "Fork per market, or configure one product?",
      challenge: "The market differences were real, and every stakeholder had a reasonable regional request. Each fix on its own made sense. Together they would have turned the product into four apps that shared a logo.",
      moves: [
        "Put the findings from all four markets side by side on one synthesis canvas. It showed the differences were settings (billers, currencies, disclosure rules), not different products.",
        "Built the information architecture around self-service: everything branches were doing by hand became a place in the app.",
        "Sorted every one-off request against one global design direction before it reached a designer.",
      ],
      decision: {
        title: "Absorb ad-hoc requests into one global solution",
        tension: "Internal calls kept producing one-off requests. Each was reasonable alone, and each pulled toward a regional patch.",
        options: "Patch each request as it came. Defer everything to post-launch. Or triage every request against a single global design direction.",
        choice: "Triage into the global solution. Every request was handled, but as part of a pattern the whole product shares rather than as an exception.",
        cost: "Saying yes took longer. Several stakeholders waited days for an answer a quick local fix would have given them in an hour.",
      },
      evidence: [
        { type: "figure", src: "img/mahali/synthesis.png", constrained: true, alt: "Research synthesis artefact mapping findings across the four markets", caption: "The synthesis artefact that settled the fork-versus-configure argument. Laid out side by side, the market differences turned out to be settings, not separate products." },
      ],
      unlocked: "A new market became a configuration task, not a rebuild. That is the reason the same design could serve the markets that came after.",
    },
    {
      id: "system",
      phase: "Design & system",
      when: "Week 1–4",
      title: "Consistency at 2,000 screens cannot be checked in review",
      challenge: "With two UI designers and thousands of screens, drawing each screen was the easy part. Keeping them consistent was the hard part, and no review meeting can catch drift at that volume.",
      moves: [
        "Built foundations before modules: a brand identity from the moodboard work, then tokens and components every screen drew from.",
        "Specified motion inside the system, so transitions behaved the same on Android and iOS instead of being improvised per screen.",
        "Specified every state of the core transfer flow, failures included, before any visual polish.",
      ],
      evidence: [
        { type: "figure", src: "img/mahali/transfer-flow.png", constrained: true, alt: "The core transfer and payment flow across multiple app states", caption: "The flow we protected above all others: a transfer that a first-time digital banking user can finish without leaving the screen to ask someone." },
        {
          type: "figpair",
          items: [
            { src: "img/mahali/brand-states.png", alt: "Screen states rendered in the new brand identity", caption: "The brand applied as tokens rather than a style guide. Colour, type and spacing reached the screens as variables." },
            { src: "img/mahali/motion-spec.png", alt: "Motion specification for key interface transitions", caption: "Motion specified once in the system, so the same transition behaves the same on both platforms." },
          ],
        },
        { type: "compare", before: "img/mahali/home-light.png", after: "img/mahali/home-dark.png", beforeLabel: "Light", afterLabel: "Dark", alt: "The Mahali account home screen in light and dark themes", caption: "Drag to compare. A complete dark theme made by changing token values, not by redesigning screens: same components, same layout, different values." },
      ],
      unlocked: "Review time went on decisions, not on spotting mismatched buttons. Volume stopped being the risk.",
    },
    {
      id: "delivery",
      phase: "Stakeholders & delivery",
      when: "Every Wednesday",
      title: "Feedback that never stopped arriving",
      challenge: "Stakeholder and PM feedback came in all the time, through several channels. Left unmanaged, every comment reopens finished screens, and at 2,000 screens that compounds fast.",
      moves: [
        "Set up a fixed Wednesday design and flow review with stakeholders, followed by a hard freeze.",
        "Used the review to teach as well: designers presented their own flows and defended their own decisions to business stakeholders.",
        "Took every call, channel and ad-hoc request myself and passed the team decisions instead.",
      ],
      decision: {
        title: "Freeze design every Wednesday, with stakeholders in the room",
        tension: "Stakeholders need to be heard. Designers need decisions that stay made.",
        options: "Review feedback as it arrived. One big sign-off at the end. Or a fixed weekly review with a hard freeze afterwards.",
        choice: "The Wednesday freeze. Stakeholders got a guaranteed weekly slot, and in exchange decisions stayed closed. Every Thursday morning the team built on settled ground.",
        cost: "Good ideas that arrived on Thursday waited a week or went to the backlog. At least two of them were better than what shipped.",
      },
      unlocked: "Rework stopped piling up. Each week's output became a foundation for the next week, not something to reopen.",
    },
    {
      id: "launch",
      phase: "Validation & launch",
      when: "Week 4",
      title: "Proving it with the people who would actually use it",
      challenge: "A product designed in four weeks for an unfamiliar market had to be tested with real customers before release, with no time left for a second round of redesign.",
      moves: [
        "Ran usability testing with actual Mahali customers, not internal proxies.",
        "Fixed the core flows on that evidence and focused the last days on the transfer and home journeys.",
        "Handed over a system, not a set of screens, so later markets and themes could build on it.",
      ],
      unlocked: "The product shipped on Android and iOS inside the one-month window, as one configurable solution.",
    },
  ],
  team: {
    heading: "Four people, set up like a team three times that size",
    body: "Shipping 2,000+ screens in a month with two UI designers only works if nobody waits and nobody redoes work. My job was to make both true.",
    topology: [
      { who: "UI designer × 2", what: "Each owned whole flows end to end, not scattered screens, so they built judgement and pace." },
      { who: "UX researcher", what: "Ran a weekly interview cycle. Findings landed directly in the designers' files." },
      { who: "Me", what: "Direction, cadence, the system's foundations, and the single point of contact for every stakeholder." },
    ],
    testimonial: {
      quote: "Ganesh creates clarity where there is ambiguity. He challenges the team to think deeper, keeps everyone aligned to the customer problem, and never asks for a standard solution when a better one is possible.",
      who: "Rohan Mehra",
      what: "VP, Digital Banking",
    },
  },
  outcomes: {
    measured: [
      { title: "Delivered on the deadline", body: "Shipped on Android and iOS inside the one-month window, as one configurable solution rather than a regional one-off.", source: "Release" },
      { title: "Validated before launch", body: "Usability testing with actual Mahali customers. The core flows were fixed on that evidence before release.", source: "Test sessions, week 4" },
      { title: "Foundations that outlived the project", body: "The design system and brand identity became the base for later markets and themes, including a full dark theme made without redesigning screens.", source: "Design system" },
    ],
    notMeasured: {
      title: "What I did not measure, and will not claim",
      body: "I do not have verified post-launch adoption, activation or satisfaction figures for this product, and I will not publish numbers I cannot source. What I can say: the design was validated with customers before release and delivered on time. The business metrics after launch were outside my engagement.",
    },
  },
  reflection: [
    { b: "Freeze earlier than feels comfortable.", rest: "The first freeze came after a week of open feedback, and that one week caused more rework than the next three combined. I now lock the cadence on day one." },
    { b: "Protect the researcher's synthesis time.", rest: "Running interviews and synthesis in the same weekly cycle stretched one person too thin. Next time I would pair a designer with them on synthesis day." },
    { b: "Align stakeholders before asking the team to execute.", rest: "The biggest delays were not design problems. Different stakeholders assumed they were solving the same problem when they were not. A few hours on shared success criteria in week one would have saved days." },
  ],
};
