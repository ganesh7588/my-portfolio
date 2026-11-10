// Post-build checks: every internal link and image resolves, no unfilled
// placeholders ship, and the documented contrast ratios are true.
import { readFile, readdir, stat } from "node:fs/promises";
import { join, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));
const errors = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const exists = async (p) => { try { const s = await stat(p); return s.isDirectory() ? exists(join(p, "index.html")) : true; } catch { return false; } };

for (const file of await walk(DIST)) {
  const html = await readFile(file, "utf8");
  const rel = file.slice(DIST.length + 1);
  for (const [, attr] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(attr)) continue;
    if (rel === "404.html" && attr.startsWith("/")) continue;
    const target = normalize(join(dirname(file), attr.split("#")[0]));
    if (!(await exists(target))) errors.push(`${rel}: broken link → ${attr}`);
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${id}"`)) errors.push(`${rel}: missing anchor #${id}`);
  }
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  for (const m of text.matchAll(/\[(?:Add|TODO|YOUR|TBD)[^\]]*\]/gi)) errors.push(`${rel}: placeholder "${m[0]}"`);
}

// WCAG contrast for the pairs documented on /design-system/
const lum = (hex) => {
  const c = hex.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const ds = await readFile(join(DIST, "design-system/index.html"), "utf8");
for (const [, a, b, claimed] of ds.matchAll(/<code>(#[0-9a-f]{6}) \/ (#[0-9a-f]{6})<\/code><\/td><td>([\d.]+):1/gi)) {
  const real = ratio(a, b);
  if (Math.abs(real - Number(claimed)) > 0.1) errors.push(`design-system: ${a} on ${b} is ${real.toFixed(2)}:1, page says ${claimed}:1`);
}

if (errors.length) { console.error(errors.join("\n")); console.error(`\n${errors.length} problem(s).`); process.exit(1); }
console.log("All links, anchors, placeholders and contrast claims check out.");
