// Equitas Small Finance Bank — a bank's first credit card.
// Facts sourced from the published portfolio and field-research records.

export default {
  slug: "equitas-credit-card",
  client: "Equitas Small Finance Bank",
  order: 1,
  card: {
    title: "A bank's first credit card, built on what customers already resented",
    line: "A full credit card application in one 12-week phase: 3,000+ screens across 30+ modules, on an IA and design system built to extend by configuration.",
    tags: ["Credit cards", "Field research", "Design system"],
  },
  heroTitle: ["A first credit card, and every reason customers ", "distrust credit cards."],
  dek: "Equitas Small Finance Bank's first credit card application, delivered end to end in a single 12-week Phase 1. Research, information architecture, design system and development ran in parallel. The strongest signal in 45 interviews was not rewards. It was that people did not trust what their card was charging them.",
  domain: "Credit cards · India",
  cover: { src: "img/equitas/cover.png", alt: "Equitas credit card app: dashboard, card management, rewards and bill payment screens" },
  facts: [
    ["My role", "Product Design Lead: research to shipped system"],
    ["Team", "Researchers, UI designers, developers"],
    ["Timeline", "12 weeks, Phase 1"],
    ["Scope", "3,000+ screens · 30+ modules"],
  ],
  metrics: [
    { num: "45", label: "research participants over four days in Chennai, 16–19 October 2023", source: "Field research" },
    { num: "3,000+", label: "screens across 30+ modules, on one IA and one design system", source: "Project files" },
    { num: "14", label: "competitor products benchmarked feature by feature", source: "Competitive benchmark" },
  ],
  brief: {
    lede: "Research did not decorate this brief. It changed it: the differentiator became transparency, not rate.",
    situation: "A small finance bank launching its first credit card, aimed at its existing customer base (about 60% vehicle-finance holders) and an underserved lower-net-worth segment.",
    constraint: "A complete application, reviewed and built inside one 12-week phase, in a regulated category the bank had never shipped in.",
    mandate: "Lead research through to a shipped system, and make sure what customers actually needed, not the loudest feature request, set the scope.",
  },
  lifecycle: [
    {
      id: "mandate",
      phase: "Mandate",
      when: "Kick-off",
      title: "A first-of-its-kind product, judged against the biggest banks",
      challenge: "The card was meant to lead into a wider ecosystem: deposits, prepaid and forex cards, savings, loans on the card, insurance. But the target customers already carried cards from large private banks and used fintech apps to manage them. The new product would be judged against both from day one.",
      moves: [
        "Framed the goal as fixing what incumbents get wrong, not matching their feature lists.",
        "Brought compliance and business stakeholders into week one, so regulatory limits shaped the design instead of rejecting it later.",
        "Planned research, IA, design and development as overlapping tracks on one shared foundation.",
      ],
      unlocked: "A brief that asked the right question: what makes people close a card, not what they put on a wishlist.",
    },
    {
      id: "research",
      phase: "Research",
      when: "16–19 Oct 2023",
      title: "Forty-five people told us what credit cards keep getting wrong",
      challenge: "Four days, 45 participants, two very different audiences, and a team that needed findings it could act on in week three, not a report in week six.",
      moves: [
        "Ran focus groups and one-to-one interviews (30–60 minutes each) with stakeholders and customers in Chennai.",
        "Ranked themes by how often they came up, and kept separate what people asked for and what they complained about.",
        "Turned the findings into three personas the team designed against every week.",
      ],
      evidence: [
        {
          type: "chart",
          label: "Interview signal · number of interviews raising each theme (n=45)",
          caption: "Rewards were the loudest request. Transparency of charges was the loudest complaint, and complaints are what make people close a card. Phase 1 was scoped against this chart and the benchmark, not against a wishlist.",
          max: 90,
          rows: [
            { label: "Rewards & benefits", value: 82, lead: true },
            { label: "Add-on cards for family", value: 32 },
            { label: "Travel benefits", value: 22 },
            { label: "Customisable billing cycle", value: 21 },
            { label: "Transparency of charges", value: 20, lead: true },
            { label: "UPI on credit card", value: 19 },
            { label: "Setting spend limits", value: 16 },
          ],
        },
        {
          type: "cards",
          label: "Personas we designed against",
          cards: [
            { n: "Persona", title: "Senior, non-frequent", body: "Age 60+. Uses a card for emergencies. Wants it inside the existing bank app, strong two-factor security, and rewards that make sense without study." },
            { n: "Persona", title: "Fintech-native user", body: "Age 20–40. Wants no-cost EMI, a changeable billing cycle, unified offers, and to pay the bill over UPI." },
            { n: "Persona", title: "Small-business owner", body: "Age 40–60. Wants spend limits on add-on cards, prepaid cards for children, scan and pay, and reminders before a due date." },
          ],
        },
      ],
      unlocked: "A clear difference between the loudest request (rewards) and the biggest reason people leave (charges they didn't expect). That difference became the strategy.",
    },
    {
      id: "strategy",
      phase: "Strategy & scope",
      when: "After research",
      title: "A focused Phase 1, under pressure to ship the wishlist",
      challenge: "Rewards dominated every conversation, inside the bank and in interviews. A focused 12-week Phase 1 could not do everything, and every inclusion had to justify its place against that pressure.",
      moves: [
        "Benchmarked 14 competitor products feature by feature, to see where Equitas could lead and where it only needed to match.",
        "Linked every Phase 1 bet to both an interview finding and a gap in the benchmark.",
        "Argued internally for showing charges up front, including the numbers that are easier to sell when nobody mentions them.",
      ],
      decisions: [
        {
          title: "Make charges radically transparent",
          tension: "Charge transparency was the biggest frustration in the interviews. Some users had closed cards over fees they only found on a statement.",
          options: "Keep charges in the statement, as everyone does. Push SMS alerts. Or build a plain-language charges section and show charges before a payment is confirmed.",
          choice: "A dedicated charges section, with charges shown before payment. It answered the top complaint and turned a weakness of the whole category into a reason to trust this card.",
          cost: "Customers would see, unprompted, exactly what they would pay. That took a real argument to win internally.",
        },
        {
          title: "In-app family add-on cards, with controls",
          tension: "32 interviews raised add-on cards, but the existing process meant a branch visit, and almost no competitor offered real in-app family controls.",
          options: "Leave add-on cards at the branch. Offer a basic supplementary card. Or build in-app family cards with sub-limits, parental controls, one bill and dual OTP.",
          choice: "Full in-app family cards. The benchmark showed a real gap, and it matched the strongest household need in the research.",
          cost: "The most complex module in Phase 1. It touched almost every other module and took effort away from rewards.",
        },
        {
          title: "Custom billing cycle and UPI on the card, in Phase 1",
          tension: "Flexible billing (21 interviews) and UPI on credit card (19) were highly requested. Salaried users wanted due dates that matched payday.",
          options: "A fixed billing cycle like a traditional bank. UPI later. Or both in the launch feature set.",
          choice: "Both, in Phase 1. These were the places where Equitas could lead on card services, not just match.",
          cost: "Two features the launch could have survived without took weeks that could have gone into rewards, the thing customers asked for loudest.",
        },
        {
          title: "Instant virtual card with two onboarding paths",
          tension: "Two very different audiences, new-to-bank and existing customers, and one product.",
          options: "One generic onboarding. Physical card first, with a wait. Or separate onboarding per audience, with an instant virtual card on approval.",
          choice: "Two paths: device and SIM binding, OTP and MPIN for new-to-bank customers; card-detail validation for existing ones. Both end in an instant virtual card.",
          cost: "Two onboarding paths to design, test, build and maintain for good, instead of one at half the work.",
        },
      ],
      evidence: [
        { type: "figure", src: "img/equitas/benchmark.png", alt: "Competitive feature analysis grid, MVP versus aspirational feature mapping, and synthesised UX takeaways", caption: "The benchmark alongside the interview data. Fourteen products scored feature by feature showed almost no competitor offering in-app family cards or plain-language charge disclosure. That is how two of the four Phase 1 bets were chosen." },
      ],
      unlocked: "A Phase 1 scope where every feature could point to evidence. Scope arguments became much shorter.",
    },
    {
      id: "system",
      phase: "IA & design system",
      when: "Across Phase 1",
      title: "3,000 screens cannot be designed one at a time",
      challenge: "30+ modules (pre-login, registration, dashboard, card controls, statements, add-on cards, rewards, bill payments, EMI conversions, limit increase, UPI, tap and pay) had to stay consistent while design and development ran at the same time.",
      moves: [
        "Designed one information architecture for the whole app before module work, built to extend into later phases.",
        "Built a design system of tokens and components that every module drew from, so weekly reviews could focus on decisions, not on visual consistency.",
        "Designed onboarding as two paths that meet at the same instant virtual card.",
      ],
      evidence: [
        {
          type: "stickystory",
          label: "How the Phase 1 bets show up in the product",
          steps: [
            { n: "Bet", title: "Family cards, issued in-app", src: "img/equitas/family-cards.png", alt: "Family and friends add-on cards, relationship selection, and transaction history screens", body: "Add-on cards with sub-limits, one combined bill and dual OTP, issued without a branch visit. The clearest point of difference in Phase 1, and the most expensive module to build." },
            { n: "Bet", title: "Charges, before the payment", src: "img/equitas/dashboard.png", alt: "Dashboard, billing, transaction control and card management screens", body: "Charges shown in plain language before a payment is confirmed, not after it on a statement. A weakness of the whole category turned into the product's argument for trust." },
            { n: "Bet", title: "Onboarding that converges", src: "img/equitas/onboarding.png", alt: "Virtual card activation and onboarding flow from approval through limit setup to success", body: "Different checks for new-to-bank and existing customers, the same card at the end. Instant virtual cards without running two separate onboarding products." },
            { n: "Foundation", title: "One library under all of it", src: "img/equitas/design-system.png", alt: "The Equitas design system: components, system illustrations and colour tokens", body: "Every module built from the same tokens and components. With 30+ modules, that is what made a weekly review possible." },
          ],
        },
      ],
      unlocked: "A product built to extend. Deposits, prepaid and forex cards, savings, loans and insurance were planned as configurations of the same system, not new design projects.",
    },
    {
      id: "delivery",
      phase: "Delivery",
      when: "Across Phase 1",
      title: "Twelve weeks left no room to work in sequence",
      challenge: "Research fed IA, IA fed design, and design fed development, all overlapping. With a client team who had never shipped a card, decisions also had to be made where the client could see them, and then stay closed.",
      moves: [
        "Ran weekly “Show me” reviews, walking Equitas through the app module by module, so feedback stayed on what was in front of them.",
        "Ran two onsite workshops in Chennai mid-engagement to settle the hardest flows and compliance questions face to face.",
        "Led researchers, designers and developers as one team, split along clean module boundaries against one source of truth.",
      ],
      evidence: [
        { type: "quote", quote: "Across 45 interviews the message was consistent: people did not want more credit. They wanted control, clarity, and rewards they could actually understand.", attribution: "My summary of the Chennai research, and the sentence every module was checked against" },
      ],
      unlocked: "3,000+ screens that stayed consistent, with decisions that stayed closed, inside a single phase.",
    },
  ],
  team: {
    heading: "One team, many disciplines, split along clean seams",
    body: "Researchers, UI designers and developers worked as one unit. My job was to keep the research landing in the files, the files landing in the build, and the client deciding in the room rather than over email.",
    topology: [
      { who: "Research", what: "Field study, synthesis, personas, and a competitive benchmark that became the gate for scope." },
      { who: "UI design", what: "Owned modules end to end, built from the shared library." },
      { who: "Development", what: "Built in parallel against the same tokens and components." },
      { who: "Me", what: "Strategy, IA, system governance, client reviews and onsite workshops." },
    ],
  },
  outcomes: {
    measured: [
      { title: "A complete application in one phase", body: "3,000+ screens across 30+ modules on one IA and one design system.", source: "Project files" },
      { title: "Research that changed the strategy", body: "The differentiator moved from rate and rewards to charge transparency and family controls, because 45 interviews and a 14-product benchmark showed that was the gap.", source: "Field research + benchmark" },
      { title: "A foundation built to extend", body: "Later phases and related products were planned as configurations of the same system, not new design efforts.", source: "Design system + IA" },
    ],
    notMeasured: {
      title: "What I did not measure, and will not claim",
      body: "I do not have verified post-launch issuance, activation or retention numbers for this card, so I am not publishing any. What I can show is the research, the decisions it drove, and what Phase 1 delivered in twelve weeks. If you want to test the thinking, read the strategy section.",
    },
  },
  links: [
    { href: "https://www.figma.com/design/cdrLa8TwnzBAg5A3Pvesbg/Equitas-Credit-Card-V1.1?node-id=7097-27560", text: "Figma · Credit Card V1.1" },
    { href: "https://www.figma.com/design/nYjjIBKQ01iSYDcJqobsTm/Equitas-CC-2.0?node-id=2772-34262", text: "Figma · Credit Card V2.0" },
  ],
  reflection: [
    { b: "Lock the design system before the screens, not alongside them.", rest: "Tokens and components were still forming while modules were already in progress. Freezing the foundation a week earlier would have removed real rework." },
    { b: "Bring development into reviews sooner.", rest: "Research and design were in sync from week one. Pulling developers into the weekly review earlier would have caught feasibility issues before the build." },
    { b: "Pair a designer with the researcher on synthesis.", rest: "Forty-five interviews in four days is a lot to synthesise alone. Pairing would have been faster and built deeper customer understanding across the team." },
    { b: "Make the benchmark the explicit gate for scope.", rest: "We kept the feature set focused, but a few requests still stretched it. A hard benchmark gate would have protected the timeline further." },
  ],
};
