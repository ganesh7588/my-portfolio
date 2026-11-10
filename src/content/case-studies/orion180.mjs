// Orion180 & PryzmIQ — one system, six surfaces, a two-year engagement.

export default {
  slug: "orion180-pryzmiq",
  client: "Orion180 & PryzmIQ",
  order: 3,
  card: {
    title: "An insurance ecosystem that had outgrown its own foundations",
    line: "One design system across six surfaces, and a guided property inspection rebuilt around the point where it was actually failing.",
    tags: ["InsurTech", "Design system governance", "Service design"],
  },
  heroTitle: ["Five audiences, six surfaces, and ", "no shared foundation."],
  dek: "Two years leading product design for the Orion180 insurance ecosystem and the PryzmIQ property-inspection platform. The work covered design-system governance, workflow design, and the delivery rhythm that got research into shipped screens. The interesting part is not the system. It is that inspections were failing at the photograph, not at the form.",
  domain: "InsurTech · United States",
  cover: { src: "img/orion180/cover.png", alt: "Orion180 MY180 dashboards shown in light mode, dark mode and on mobile" },
  facts: [
    ["My role", "Lead Product Designer + Scrum facilitation"],
    ["Working with", "PMs, engineering leads, QA, inspection ops, customer success"],
    ["Timeline", "2 years, 2024–2026"],
    ["Scope", "Design system · web · PWA · native"],
  ],
  metrics: [
    { num: "1", label: "design system replacing per-product pattern kits across the ecosystem", source: "Orion180 Design System" },
    { num: "6", label: "surfaces on one foundation: Admin, Customer and Agent portals, ops tools, PryzmIQ native and PWA", source: "System coverage" },
    { num: "5", label: "audiences in one inspection chain: homeowner, inspector, concierge, QA reviewer, operations", source: "Workflow mapping" },
  ],
  brief: {
    lede: "My longest engagement, and the one where design leadership was mostly operating leadership.",
    situation: "A multi-platform insurance ecosystem that had grown faster than its design foundations, with property inspection running through several costly workflows.",
    constraint: "A roadmap-driven organisation, several teams shipping in parallel, and no central design system. Every inconsistency was paid for twice, once in design and once in build.",
    mandate: "Build a design foundation that scales, fix the inspection journey where it actually breaks, and make design decisions happen predictably across product, engineering, QA and operations.",
  },
  lifecycle: [
    {
      id: "inherit",
      phase: "Inheriting the ecosystem",
      when: "Start of engagement",
      title: "The same table, modal and form, solved three ways by three teams",
      challenge: "Experiences were split across web, PWA and native, with inconsistent patterns and components. Every new feature meant extra design work and extra development effort.",
      moves: [
        "Audited every surface and listed the duplicated patterns, so the cost of inconsistency could be counted instead of argued about.",
        "Mapped who used which surface, and why, before proposing any structure.",
        "Set up design QA and review rituals with engineering leads from the start.",
      ],
      unlocked: "A shared, evidence-based picture of the problem that both product and engineering agreed with. That was the basis for asking to invest in a system.",
    },
    {
      id: "discovery",
      phase: "Discovery",
      when: "Early, then continuous",
      title: "Inspection is not a flow. It is a chain, and one link was breaking",
      challenge: "A homeowner captures the property, a concierge team schedules and assists, a QA reviewer approves the images, and operations manages the queue. Looking at any one step on its own hid the real failure.",
      moves: [
        "Mapped all five roles and every hand-off on one canvas.",
        "Kept validating continuously with interviews, stakeholder workshops, benchmarking and usability testing, and fed the results into prioritisation.",
        "Followed the cost of a rejected submission through the whole chain instead of stopping at the homeowner's screen.",
      ],
      evidence: [
        {
          type: "cards",
          label: "What the mapping showed",
          cards: [
            { n: "01", title: "Inconsistency was paid for twice", body: "Without a central system every team solved the same UI problems again. Mixed patterns across web, PWA and native added design and development effort to every feature." },
            { n: "02", title: "Photo capture is where inspections fail", body: "Homeowners didn't know what an acceptable photo looked like, so submissions were rejected and redone. The real drop-off was the camera, not the form." },
            { n: "03", title: "Operations carried the overhead", body: "QA review and admin work were full of repeated actions and slow turnaround. The biggest efficiency gains were in internal tools, not the customer app." },
          ],
        },
        { type: "figure", src: "img/orion180/workflow-maps.png", alt: "Workflow maps and the end-to-end customer journey across the inspection pipeline", caption: "Mapping all five roles on one canvas made the capture failure visible. As a homeowner flow it looks like a form problem. As a chain, a rejected photo becomes concierge time, QA time and a second homeowner session." },
      ],
      unlocked: "The work was reframed: fix the capture moment and the internal tools, not just the customer form.",
    },
    {
      id: "system",
      phase: "Making the case for the system",
      when: "Foundation phase",
      title: "Months of work that shipped no visible feature",
      challenge: "A design system needs months of foundation work before it saves anyone time. A roadmap-driven organisation measures progress in features shipped.",
      moves: [
        "Presented the system as a delivery investment, using the audit's duplicate count, not as a design preference.",
        "Built the foundation layer first: colour tokens, typography, spacing, elevation, accessibility standards and a responsive grid.",
        "Treated the system as a product, with ownership, documentation and governance, so it would hold as the organisation grew.",
      ],
      decision: {
        title: "Build a centralised design system first",
        tension: "Fragmented patterns were slowing every feature. Fixing them meant slowing features for a while.",
        options: "Keep patching per platform. Maintain separate kits per product. Or invest up front in one tokenised system and a shared component library.",
        choice: "One Orion180 Design System covering the Admin, Customer and Agent portals, internal ops tools, and PryzmIQ native and PWA.",
        cost: "Months of work with no visible feature. Defending that to a roadmap-driven organisation was the hardest part of the two years.",
      },
      evidence: [
        { type: "figure", src: "img/orion180/design-system.png", alt: "Orion180 Design System: colour, KPI cards, inputs, buttons, typography, toasts and illustrations", caption: "One library behind six surfaces. The real test of a system is whether a new feature can be built from it. After this, new work drew from the library instead of starting fresh." },
        { type: "systemdemo" },
      ],
      unlocked: "New features started as extensions of the library, not fresh design projects, across all six surfaces.",
    },
    {
      id: "capture",
      phase: "Designing the chain",
      when: "Ongoing",
      title: "Putting a model in the path of a customer task",
      challenge: "Fixing photo capture with AI-assisted guidance meant designing for when the model is wrong. A confidently wrong answer is worse than no answer at all.",
      moves: [
        "Designed capture guidance that shows photo requirements on screen at the moment the photo is taken.",
        "Designed the uncertain and wrong-answer states as carefully as the happy path, with the reviewer able to see confidence scores and exceptions.",
        "Turned inspection into a guided sequence with clear progress and a quality check at the end.",
      ],
      decisions: [
        {
          title: "Make image capture guided and AI-assisted",
          tension: "Help articles and static example photos had not stopped rejected submissions.",
          options: "Add a help article. Show static example photos. Or design AI-assisted capture that explains requirements in context and checks the photo as it's taken.",
          choice: "AI-assisted capture that shows requirements in place, helps homeowners take acceptable photos, and reduces rejected submissions.",
          cost: "A model in the path of a customer task means planning for it to be wrong, and accepting that a confident wrong answer is worse than none.",
        },
        {
          title: "Treat inspection as a guided journey, not a checklist",
          tension: "An inspection covers verification, home profile, interior, exterior and utilities, which is easy to find overwhelming when doing it alone.",
          options: "One long form. A free-roam checklist. Or a step-by-step journey with clear progress and a quality check at the end.",
          choice: "A guided journey: property verification, location check, home profile, interior, exterior, utilities, then a quality check.",
          cost: "Fixed steps remove flexibility. A homeowner who wants to do the roof first has to follow the system's order.",
        },
      ],
      evidence: [
        { type: "figure", src: "img/orion180/inspection-tracker.png", alt: "PryzmIQ inspection tracker showing guided capture categories, AI confidence scoring and QA review", caption: "The inspection tracker is where the chain becomes one product. The homeowner sees progress and requirements, the reviewer sees confidence scores and exceptions, and both look at the same record." },
        { type: "figpair", items: [
          { src: "img/orion180/ai-capture.png", alt: "AI-assisted image capture showing photo requirements and compliant-capture guidance", caption: "Homeowner capture: requirements shown when the photo is taken, not in a help article." },
          { src: "img/orion180/concierge-qa.png", alt: "Concierge scheduling interface and the QA reviewer approval experience", caption: "Concierge and QA: the two internal tools that absorb the cost of a bad photo." },
        ] },
      ],
      unlocked: "The capture problem was addressed where it starts, instead of downstream in QA.",
    },
    {
      id: "ops",
      phase: "Internal workflows",
      when: "Ongoing",
      title: "The overhead lived where nobody was asking for design",
      challenge: "QA review and admin operations were slow and repetitive, but internal tools always lost the fight for design capacity against customer-facing work.",
      moves: [
        "Redesigned QA review to surface failed inspections faster.",
        "Simplified admin work (inspection and user management, status tracking, escalation, audit trails) with information architecture built around the task, not the database.",
        "Kept the internal tools on the same design system, so the improvements cost less to build.",
      ],
      decision: {
        title: "Redesign the internal workflows, not just the app",
        tension: "Every sprint, internal tools competed with customer-facing work for the same designers.",
        options: "Leave ops tools as they are. Add filters on top. Or redesign the reviewer and admin experiences around the real task.",
        choice: "Redesigned QA and admin around the reviewer's actual task: finding failed inspections, tracking status, escalation and audit trails.",
        cost: "Internal tools competed with customer work for design capacity every sprint, for two years.",
      },
      unlocked: "Operations teams got tools designed for their work, not inherited from the database schema.",
    },
    {
      id: "operating",
      phase: "Operating leadership",
      when: "Throughout",
      title: "Insight kept stalling between design and engineering",
      challenge: "With several teams shipping in parallel, good research and good designs still stalled at hand-off. Decisions had no set place to be made and no one owning them.",
      moves: [
        "Ran daily stand-ups as Scrum facilitator, tracked design dependencies, removed blockers and kept sprint commitments realistic.",
        "Introduced a five-criteria decision framework: user evidence, business impact, technical feasibility, operational load, and scalability.",
        "Owned design QA, led reviews and mentored the team.",
      ],
      evidence: [
        { type: "quote", quote: "Once every call ran through one framework (user, business, feasibility, operations, scale) the debates got shorter and the alignment got real.", attribution: "My description of the decision framework that anchored every review" },
      ],
      unlocked: "Research reliably reached shipped screens. Every decision had a place to be made, a record, and an owner.",
    },
  ],
  team: {
    heading: "Leadership here was mostly unblocking",
    body: "Two years in, what changed delivery was not a better component. It was that every decision had a place to be made, a record, and a person responsible for unblocking it.",
    topology: [
      { who: "Product managers", what: "Set priorities, weighed against the five criteria in every review." },
      { who: "Engineering leads", what: "Joined design QA and system governance from the start." },
      { who: "QA, inspection ops, customer success", what: "Users of the internal tools and the people closest to the failures." },
      { who: "Me", what: "Design direction, system governance, Scrum facilitation, mentoring." },
    ],
  },
  outcomes: {
    measured: [
      { title: "One system across six surfaces", body: "Admin, Customer and Agent portals, internal ops tools, and PryzmIQ native and PWA all use the same tokens and component library.", source: "Design system coverage" },
      { title: "The capture failure fixed where it starts", body: "Guided, AI-assisted capture replaced help articles and static examples at the exact point where submissions were being rejected.", source: "PryzmIQ inspection journey" },
      { title: "Internal workflows designed, not inherited", body: "QA review and admin operations rebuilt around the reviewer's actual task.", source: "Ops tooling" },
    ],
    notMeasured: {
      title: "What I did not measure, and will not claim",
      body: "I do not have clean before-and-after figures for inspection completion, QA turnaround or design-to-development cycle time. Those numbers exist in the organisation's tools, but they were never tracked as a design measure, and I would not repeat that mistake. What I can show is the system's coverage, the redesigned workflows, and a review rhythm that held for two years.",
    },
  },
  reflection: [
    { b: "Measure the design work from day one.", rest: "The biggest gap in this case study is that I cannot show the numbers. Nobody measured the baseline. I now agree how we will measure before the work starts." },
    { b: "Design the chain, not the screen.", rest: "Improving one step in isolation just moves the bottleneck somewhere else." },
    { b: "A decision framework beats opinions, and seniority.", rest: "Using the same five criteria for every call shortened debates, including in rooms where I was not the most senior person." },
    { b: "Leadership here was mostly unblocking.", rest: "Stand-ups, dependency tracking and clearing blockers did as much for predictable delivery as any single design decision." },
  ],
};
