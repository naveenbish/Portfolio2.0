// Snapshots a user's public GitHub contribution calendar into src/data/contributions.json.
// Usage: node scripts/fetch-contributions.mjs <github-username>   (or: npm run contributions)
// No token needed: it reads the public calendar fragment GitHub serves for profile pages.
// Only contributions GitHub shows publicly are included; enable "Private contributions"
// in your GitHub profile settings if you want private activity counted too.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const user = process.argv[2];
if (!user) {
  console.error("Usage: node scripts/fetch-contributions.mjs <github-username>");
  process.exit(1);
}

const res = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
  headers: { "user-agent": "Mozilla/5.0 (contribution snapshot script)" },
});
if (!res.ok) {
  console.error(`GitHub responded ${res.status}`);
  process.exit(1);
}
const html = await res.text();

// Tooltips carry the exact count: "3 contributions on May 1st." / "No contributions on …".
const counts = new Map();
for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
  const n = /^No contributions/i.test(m[2].trim()) ? 0 : Number.parseInt(m[2], 10);
  counts.set(m[1], Number.isNaN(n) ? 0 : n);
}

const days = [];
for (const m of html.matchAll(/<td\b[^>]*>/g)) {
  const tag = m[0];
  const date = /data-date="([^"]+)"/.exec(tag)?.[1];
  const id = /\bid="([^"]+)"/.exec(tag)?.[1];
  const level = /data-level="(\d)"/.exec(tag)?.[1];
  if (!date || !id || level === undefined) continue;
  days.push({ d: date, c: counts.get(id) ?? 0, l: Number(level) });
}
days.sort((a, b) => a.d.localeCompare(b.d));

if (days.length < 300) {
  console.error(`Only parsed ${days.length} days — GitHub's markup may have changed.`);
  process.exit(1);
}

const out = {
  user,
  fetchedAt: new Date().toISOString().slice(0, 10),
  from: days[0].d,
  to: days.at(-1).d,
  total: days.reduce((sum, day) => sum + day.c, 0),
  days,
};

const file = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/contributions.json");
await mkdir(dirname(file), { recursive: true });
await writeFile(file, JSON.stringify(out) + "\n");
console.log(`${user}: ${out.total} contributions, ${out.from} → ${out.to} (${days.length} days) → ${file}`);
