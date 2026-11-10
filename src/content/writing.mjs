// Writing: published essays, the categories they sit in, and how the blog is written.

export const categories = [
  { id: "Leadership", body: "Running design teams, culture and maturity, and how they wear down or improve under growth." },
  { id: "Delivery", body: "Speed, cadence and the gap between what clients ask for and what teams can ship." },
  { id: "Strategy", body: "Getting to the right problem early, and making design strategy something you can act on." },
  { id: "Finance", body: "Designing AI and money products people can trust." },
  { id: "Craft", body: "Judgement, micro-interactions, inclusive and sustainable design, and the tools that change the work." },
];

export const featured = ["Taste Is the Last Moat", "Fast Is a Moat", "DesignOps Debt & Process Decay: The Silent Killer of Scalable Design"];

export const articles = [
  { title: "Taste Is the Last Moat", category: "Craft", url: "https://ganesh-gaikhe90.medium.com/taste-is-the-last-moat-0e07c4a92198", note: "When execution gets cheap, judgement is what's left." },
  { title: "Fast Is a Moat", category: "Delivery", url: "https://ganesh-gaikhe90.medium.com/fast-is-a-moat-5333e3689ddf", note: "Why speed compounds into a lasting advantage, not just a better quarter." },
  { title: "DesignOps Debt & Process Decay: The Silent Killer of Scalable Design", category: "Leadership", url: "https://ganesh-gaikhe90.medium.com/designops-debt-process-decay-the-silent-killer-of-scalable-design-0a8dd2fa8b5c", note: "Process decays quietly. This is what it costs before anyone notices." },
  { title: "Trust, Transparency & Control: The UX Trifecta for AI in Finance", category: "Finance", url: "https://ganesh-gaikhe90.medium.com/trust-transparency-and-control-the-ux-trifecta-for-ai-in-finance-0f821d1bc07d", note: "What an AI product owes a customer when their money is involved." },
  { title: "From Pixels to Profit: How AI Empowers Designers to Drive Business Outcomes", category: "Finance", url: "https://ganesh-gaikhe90.medium.com/from-pixels-to-profit-how-ai-empowers-designers-to-drive-business-outcomes-ac89e51b452d", note: "Moving design's contribution from deliverables to outcomes." },
  { title: "Clients Want Magic, Teams Need Math", category: "Delivery", url: "https://ganesh-gaikhe90.medium.com/clients-want-magic-teams-need-math-8620c5621cdd", note: "Turning a client's wish for magic into a plan a team can deliver." },
  { title: "Design Strategy: A Tactical Approach", category: "Strategy", url: "https://ganesh-gaikhe90.medium.com/design-strategy-tactical-approach-3a9379bf0a14", note: "Strategy that changes what ships on Monday." },
  { title: "Getting Smart Early: Turning Good Ideas Into Success", category: "Strategy", url: "https://ganesh-gaikhe90.medium.com/getting-smart-early-how-to-turn-good-ideas-into-success-a8e4f75ff764", note: "Front-loading the learning that later costs the most." },
  { title: "10 Reasons Why UX Maturity Matters", category: "Leadership", url: "https://ganesh-gaikhe90.medium.com/10-reasons-why-ux-maturity-matters-unveiling-the-magic-behind-outstanding-experiences-ac13a0ae3f3e", note: "What changes as an organisation's design practice matures." },
  { title: "How to Create and Transform a UX Culture", category: "Leadership", url: "https://ganesh-gaikhe90.medium.com/how-do-you-create-and-transform-a-ux-culture-d7c234c8645c", note: "Culture is built in the rituals, not the manifesto." },
  { title: "Managing Creative Burnout in Hypergrowth Teams", category: "Leadership", url: "https://ganesh-gaikhe90.medium.com/managing-creative-burnout-in-hypergrowth-teams-65370a264a4b", note: "Protecting the people who do the work when the roadmap doubles." },
  { title: "Cross-Disciplinary Collaboration Without Turf Wars", category: "Leadership", url: "https://ganesh-gaikhe90.medium.com/cross-disciplinary-collaboration-without-turf-wars-fa660fa8cac1", note: "Shared criteria instead of territory." },
  { title: "Game-Changing AI Tools in UX Design", category: "Craft", url: "https://ganesh-gaikhe90.medium.com/game-changing-ai-tools-in-ux-design-426d1b0a5d79", note: "Which tools changed the work, and which only changed the demos." },
  { title: "The Magic of Micro-Interactions", category: "Craft", url: "https://ganesh-gaikhe90.medium.com/elevating-user-experience-the-magic-of-micro-interactions-7ba83006da09", note: "The small moments that tell people the product is paying attention." },
  { title: "A Sustainable UX Design Approach", category: "Craft", url: "https://ganesh-gaikhe90.medium.com/sustainable-ux-design-approach-56829f4d7d68", note: "Designing for less waste: in pixels, in bytes, in rework." },
  { title: "Why Inclusive & Equitable UX Design Matters", category: "Craft", url: "https://ganesh-gaikhe90.medium.com/why-is-inclusive-and-equitable-ux-design-important-a191483521a6", note: "Who gets left out by default, and how to stop it." },
];

// Essays in progress, from the blog backlog. Shown as "In draft".
export const drafts = [
  { title: "Exposure Is a Career Strategy", category: "Leadership", note: "Why the designers who grow fastest are the ones closest to the business, not the best at Figma." },
  { title: "Designers Who Can't Ship", category: "Delivery", note: "Craft without delivery is a hobby. On closing the gap between the file and the release." },
];

// How every essay is built — the blog's editorial framework.
export const framework = [
  { part: "Hook", share: 10, body: "One line that stops the scroll. Usually a belief the reader holds that I'm about to challenge." },
  { part: "Story", share: 25, body: "A real situation, the conflict in it, and what I realised. Never a hypothetical." },
  { part: "Insight", share: 35, body: "Problem, observation, insight. The part a reader should be able to repeat to someone else." },
  { part: "Framework", share: 20, body: "A model, checklist or equation the reader can reuse on Monday." },
  { part: "Ending", share: 10, body: "A question worth arguing about in the comments." },
];
