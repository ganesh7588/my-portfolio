import { page, esc, join, ctaBand } from "../layout.mjs";
import { markdown } from "../markdown.mjs";
import { reactions, postHref } from "../../content/writing.mjs";
import { profile } from "../../content/site.mjs";

/** Odometer: one column of digits per place, rolled by the script. */
const odometer = () => `<span class="odo" data-odo aria-hidden="true"><span class="odo-col"><span class="odo-strip">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => `<span>${d}</span>`).join("")}</span></span></span>`;

export const reactionsBlock = (slug) => `<section class="react" data-react="${esc(slug)}" aria-labelledby="react-h">
  <div class="react-head">
    <h2 id="react-h">How did this land?</h2>
    <p class="muted">Tap once to react, again to take it back.</p>
  </div>
  <div class="react-row" role="group" aria-label="Reactions">
    ${join(reactions, (r) => `<button type="button" class="react-btn" data-react-id="${esc(r.id)}" aria-pressed="false">
      <span class="react-dial" aria-hidden="true"><span class="react-needle"></span></span>
      <span class="react-emoji" aria-hidden="true">${r.emoji}</span>
      <span class="react-count">${odometer()}<span class="visually-hidden" data-react-sr>0</span></span>
      <span class="react-label">${esc(r.label)}</span>
    </button>`)}
  </div>
  <p class="react-note subtle" data-react-note hidden>Saved in this browser.</p>
</section>`;

/**
 * @param a      article from writing.mjs (has slug)
 * @param body   Markdown string, or null when the text has not been added yet
 * @param others the other featured articles, for "Keep reading"
 */
export function postPage(a, body, others) {
  const root = "../../";
  const md = body ? markdown(body) : null;
  const meta = [a.category, md ? `${md.minutes} min read` : null].filter(Boolean);

  const article = md
    ? `<div class="post-layout">
        ${md.headings.length > 1 ? `<nav class="post-toc" aria-label="In this essay"><p class="eyebrow">In this essay</p><ol>${join(md.headings, (h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`)}</ol></nav>` : "<div></div>"}
        <div class="post-body prose-post">${md.html}</div>
      </div>`
    : `<div class="post-layout"><div></div><div class="post-body prose-post">
        <p class="post-standfirst">${esc(a.note)}</p>
        <p><a class="btn btn--secondary" href="${esc(a.url)}" rel="noopener">Read the full essay on Medium<span class="btn-arrow" aria-hidden="true">↗</span></a></p>
      </div></div>`;

  const body_ = `
<article class="post">
  <header class="container post-hero">
    <a class="post-back link-arrow link-arrow--back" href="${root}writing/">All writing</a>
    <p class="eyebrow eyebrow--accent">${esc(meta.join(" · "))}</p>
    <h1>${esc(a.title)}</h1>
    <p class="post-dek">${esc(a.note)}</p>
    <div class="post-byline">
      <span class="brand-mark" aria-hidden="true">G</span>
      <span><strong>${esc(profile.name)}</strong><br><span class="subtle">${esc(profile.role)}</span></span>
      <a class="post-medium" href="${esc(a.url)}" rel="noopener">Also on Medium ↗</a>
    </div>
  </header>
  <div class="container section" style="padding-top:var(--s-8)">
    ${article}
    <div class="post-end">
      ${reactionsBlock(a.slug)}
    </div>
  </div>
</article>
<section class="section section--muted" aria-labelledby="more-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Keep reading</p><h2 id="more-h">More from the essays.</h2></div><a class="link-arrow" href="${root}writing/">All essays</a></div>
    <div class="grid-2">${join(others, (o) => `<a class="card reveal" href="${esc(postHref(o, root))}"><span class="card-n">${esc(o.category)}</span><h3>${esc(o.title)}</h3><p>${esc(o.note)}</p><span class="link-arrow">Read the essay</span></a>`)}</div>
  </div>
</section>
${ctaBand(root, { eyebrow: "Speaking & writing", title: "Want me on a panel, podcast or in your publication?", body: "I talk about design leadership in regulated products, design systems at volume, and how design teams can deliver faster." })}`;

  return page({ path: `writing/${a.slug}/`, title: a.title, description: a.note, body: body_, section: "writing/" });
}
