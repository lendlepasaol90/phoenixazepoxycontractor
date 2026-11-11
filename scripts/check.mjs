// Post-build checks: word counts, internal links, metadata uniqueness, headings.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const DIST = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && files.push(p); });
walk(DIST);
let problems = 0;
const titles = new Map(), descs = new Map();
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const rows = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rel = '/' + f.slice(DIST.length).replace(/index\.html$/, '');
  const main = (html.match(/<main[^>]*>([\s\S]*)<\/main>/) || [, ''])[1];
  // exclude the shared drawer form? it's outside main. count main only
  const words = text(main).split(' ').filter((w) => /[a-z]/i.test(w)).length;
  // unique words: exclude shared related-services and CTA/form sections
  const uniq = main.replace(/<section class="section related"[\s\S]*?<\/section>/, '').replace(/<section class="section cta-final"[\s\S]*?<\/section>/, '');
  const uwords = text(uniq).split(' ').filter((w) => /[a-z]/i.test(w)).length;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const h1s = (main.match(/<h1[\s>]/g) || []).length;
  rows.push([rel, words + '/' + uwords, h1s, title?.length, desc?.length]);
  if (h1s !== 1) { problems++; console.log('H1 count', h1s, rel); }
  if (titles.has(title)) { problems++; console.log('Dup title', rel, titles.get(title)); } titles.set(title, rel);
  if (descs.has(desc)) { problems++; console.log('Dup desc', rel); } descs.set(desc, rel);
  // internal links
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const u = m[1];
    const target = u.endsWith('/') ? join(DIST, u, 'index.html') : join(DIST, u);
    if (!existsSync(target)) { problems++; console.log('Broken', u, 'on', rel); }
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (!existsSync(join(DIST, u))) { problems++; console.log('Missing srcset', u, rel); } }
  for (const m of html.matchAll(/<img (?![^>]*alt=")[^>]*>/g)) { problems++; console.log('img without alt', rel); }
}
rows.sort((a, b) => a[0].localeCompare(b[0]));
console.log('page'.padEnd(46), 'words', 'h1', 'title', 'desc');
for (const r of rows) console.log(r[0].padEnd(46), String(r[1]).padStart(10), r[2], String(r[3]).padStart(5), String(r[4]).padStart(4));
console.log(problems ? `${problems} problem(s)` : 'All checks passed');
process.exitCode = problems ? 1 : 0;
