// Vercel serverless function: shared reaction counts for blog posts.
//
// Storage is an Upstash Redis database (Vercel → Storage → Upstash → Redis).
// Vercel injects KV_REST_API_URL and KV_REST_API_TOKEN when it is connected.
// Without them this returns 501 and the page falls back to per-browser counts.
//
// GET  /api/reactions?post=<slug>                → { counts: { like: 3, ... } }
// POST /api/reactions { post, id, delta: 1|-1 }  → { counts: {...} }

const IDS = ["like", "love", "mind", "wow"];
const POST_RE = /^[a-z0-9-]{1,80}$/;

async function redis(cmd) {
  const res = await fetch(process.env.KV_REST_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

async function read(post) {
  const flat = (await redis(["HGETALL", `reactions:${post}`])) || [];
  const counts = Object.fromEntries(IDS.map((id) => [id, 0]));
  for (let i = 0; i < flat.length; i += 2) if (IDS.includes(flat[i])) counts[flat[i]] = Math.max(0, parseInt(flat[i + 1], 10) || 0);
  return counts;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return res.status(501).json({ error: "storage not configured" });

  try {
    if (req.method === "GET") {
      const post = String(req.query.post || "");
      if (!POST_RE.test(post)) return res.status(400).json({ error: "bad post" });
      return res.status(200).json({ counts: await read(post) });
    }
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { post, id } = body;
      const delta = body.delta === -1 ? -1 : 1;
      if (!POST_RE.test(String(post)) || !IDS.includes(id)) return res.status(400).json({ error: "bad input" });
      const next = await redis(["HINCRBY", `reactions:${post}`, id, String(delta)]);
      if (next < 0) await redis(["HSET", `reactions:${post}`, id, "0"]);
      return res.status(200).json({ counts: await read(post) });
    }
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(502).json({ error: "storage unavailable" });
  }
}
