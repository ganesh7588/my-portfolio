# Content to confirm before publishing

The site ships with **no placeholders on screen**: `npm run check` fails the build if one appears. These are the items only you can confirm. Each one is safe as it stands, but some could be stronger.

## Client permissions
- [ ] **Projects page**: BHIM, TMB, the public-sector bank card app, HFCB, AHIDF, The Privileged Club and the healthcare voucher work are shown with *descriptive* names (`publicName`). Set `nameApproved: true` in `src/content/projects.mjs` for each client who agrees to be named.
- [ ] **Case studies are white-labelled** under codenames (Nivara, Mahali, Aster360, MY360, Lumora). Check the codenames are free of clashes in your markets before going live. Screens still show real geography and currencies (Mahali: Malawi, Zambia, Botswana, Zimbabwe, MWK), which an informed reader could use to identify the client. Decide whether that is acceptable.
- [ ] The testimonial now runs under a pseudonym ("Rohan Mehra, VP, Digital Banking"), in line with the confidentiality note. The quote itself is real; confirm the person is happy for it to appear this way.
- [ ] **Blog posts**: paste the full text of each featured essay into `src/content/blog/<slug>.md` (taste-is-the-last-moat, fast-is-a-moat, designops-debt). Until a file exists, that post page shows the summary and a link to Medium.
- [ ] **Reaction counts**: to count reactions across all visitors, add an Upstash Redis database to the Vercel project (Storage → Upstash → Redis). Vercel sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Without it, reactions are remembered only in each visitor's own browser.
- [ ] Confirm **IdentitySense** and **AuthSense** can be shown publicly as Winjit products.

## Facts to check
- [ ] Project categories and sectors in `projects.mjs`, especially HFCB ("Property marketplace") and AHIDF ("Public sector"). These are inferred from project files.
- [ ] Project years (all set to 2026).
- [ ] Freelance: the **Design leadership advisory** engagement is new. The other three come from your Dubai playbook. Remove it if you don't want to offer it.
- [ ] Freelance FAQ says you work across IST, GST and US time zones and can run workshops on site.
- [ ] Writing: the two drafts ("Exposure Is a Career Strategy", "Designers Who Can't Ship") come from your blog backlog. Rename or remove them as they progress.

## Would make the site stronger
- [ ] **One sourced outcome metric per case study** (activation, KYC completion, QA turnaround, cycle time). Each "what I won't claim" section can then become a real result.
- [ ] **CV**: add a PDF to `src/assets/` and set `profile.resume` in `src/content/site.mjs`. The download button appears automatically.
- [ ] **Project imagery**: the Projects page is text-only. Add a cover image per project when clients approve.
- [ ] A second and third **testimonial** (Nivara, Aster360).
- [ ] Higher-resolution **Mahali cover** (the current one is 1136×300).
- [ ] Point **ganeshgaikhe.com** at GitHub Pages (canonical and OG URLs already use it).
