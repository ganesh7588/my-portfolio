// Zero-dependency static build: content (src/content) + templates (src/templates) → dist/
import { mkdir, writeFile, rm, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import mahali from "../src/content/case-studies/mahali.mjs";
import nivara from "../src/content/case-studies/nivara.mjs";
import aster from "../src/content/case-studies/aster360.mjs";
import { homePage } from "../src/templates/pages/home.mjs";
import { caseStudyPage } from "../src/templates/pages/case-study.mjs";
import { workPage, projectsPage, processPage } from "../src/templates/pages/work.mjs";
import { designSystemPage } from "../src/templates/pages/design-system.mjs";
import { freelancePage, writingPage, aboutPage, contactPage, notFoundPage } from "../src/templates/pages/practice.mjs";
import { profile } from "../src/content/site.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..");
const OUT = join(ROOT, "dist");

const studies = [mahali, nivara, aster].sort((a, b) => a.order - b.order);

const pages = new Map();
pages.set("index.html", homePage(studies));
pages.set("work/index.html", workPage(studies));
studies.forEach((s, i) => pages.set(`work/${s.slug}/index.html`, caseStudyPage(s, studies[(i + 1) % studies.length])));
pages.set("projects/index.html", projectsPage());
pages.set("process/index.html", processPage());
pages.set("design-system/index.html", designSystemPage());
pages.set("freelance/index.html", freelancePage());
pages.set("writing/index.html", writingPage());
pages.set("about/index.html", aboutPage());
pages.set("contact/index.html", contactPage());
pages.set("404.html", notFoundPage());

await rm(OUT, { recursive: true, force: true });
await mkdir(join(OUT, "assets"), { recursive: true });
await cp(join(ROOT, "src/assets"), join(OUT, "assets"), { recursive: true });
await cp(join(ROOT, "src/styles/site.css"), join(OUT, "assets/site.css"));
await cp(join(ROOT, "src/scripts/site.js"), join(OUT, "assets/site.js"));

for (const [file, html] of pages) {
  const dest = join(OUT, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, html);
}

// sitemap + robots
const urls = [...pages.keys()].filter((f) => f !== "404.html").map((f) => profile.domain + "/" + f.replace(/index\.html$/, ""));
await writeFile(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${profile.domain}/sitemap.xml\n`);
await writeFile(join(OUT, ".nojekyll"), "");

console.log(`Built ${pages.size} pages → dist/`);
