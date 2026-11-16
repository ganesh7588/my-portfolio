# Ganesh Gaikhe — Portfolio

Portfolio of Ganesh Gaikhe, Product Design Lead (banking, credit, payments, identity, insurance).

A static site with **no runtime dependencies**. Content lives in plain data files; a small Node script renders them to HTML.

```bash
npm run dev     # build + preview at http://localhost:4173
npm run build   # build to dist/
npm run check   # build + verify links, anchors, placeholders and contrast claims
```

Requires Node 18+. Nothing to install.

## Pages

| Page | Path | What it's for |
| --- | --- | --- |
| Home | `/` | Positioning, case studies, situations, principles, testimonial, projects, systems, writing |
| Case studies | `/work/` | Index of the three lifecycle case studies |
| Case study | `/work/<slug>/` | Brief → challenge map → one section per lifecycle phase → team → outcomes → reflection |
| Projects | `/projects/` | Shorter write-ups: challenge, what I led, scope. Filterable |
| Design process | `/process/` | Six stages (Frame, Find, Decide, Systemise, Ship, Validate & learn), checkpoints, rituals |
| Design system | `/design-system/` | How I build systems, live token demo, systems led, and this site's tokens with measured contrast |
| Freelance | `/freelance/` | Who it's for, four engagements, how an engagement runs, ground rules, FAQ |
| Writing | `/writing/` | Featured essays, topics, filterable archive, drafts, the editorial framework |
| About | `/about/` | Bio, capabilities, experience timeline, principles |
| Contact | `/contact/` | Email with a pre-filled brief, links |

## How case studies are structured

Every case study is told as a lead designer's account of the project lifecycle, not as a set of screens:

1. **The brief in one breath**: situation, constraint, my mandate as lead, sourced metrics.
2. **The challenge map**: every phase and the problem that could have sunk it, on one strip.
3. **One section per phase**, each with the same parts:
   - *The challenge*: what went wrong or pushed back
   - *What I did as lead*: the leadership moves
   - *Decision record*: tension → options → choice → cost
   - *Evidence*: research, artefacts, screens
   - *What it unlocked*: what the decision made possible next
4. **Leading the team**: team setup and testimonial.
5. **Outcomes**: what is measured and sourced, and a separate, explicit "what I won't claim".
6. **Reflection**: what I'd do differently.

## Editing content

| To change… | Edit |
| --- | --- |
| Name, email, nav, hero, principles, timeline, bio | `src/content/site.mjs` |
| A case study | `src/content/case-studies/*.mjs` |
| Projects (and whether a client is named) | `src/content/projects.mjs` (`nameApproved`) |
| Essays, topics, drafts | `src/content/writing.mjs` |
| Freelance engagements and FAQ | `src/content/freelance.mjs` |
| Design process stages and rituals | `src/content/process.mjs` |
| Tokens, colour, type | `src/styles/site.css` (then update the tables in `src/templates/pages/design-system.mjs`; `npm run check` verifies the contrast numbers) |

Images live in `src/assets/img/`. See **CONTENT-TODO.md** for items to confirm before going public.

## Deploying

`.github/workflows/pages.yml` builds and deploys `dist/` to GitHub Pages on every push to `master`. Enable it under *Settings → Pages → Source: GitHub Actions*. The site uses relative links, so it works at a custom domain or under `/<repo>/`.
