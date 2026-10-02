/**
 * TEST SUITE (no browser required)
 * ---------------------------------------------------------------------------
 *   npm test
 *
 * Runs the build, then checks the generated output:
 *   · every internal href resolves to a generated file
 *   · every cross-reference in /content resolves (skills, tools, missions, logs)
 *   · required SEO metadata exists on every page
 *   · one h1 per page, no heading-level jumps, no unlabelled controls
 *   · every image has an alt attribute and explicit dimensions
 *   · content files contain no invented metrics, awards or client claims
 *   · bundle budgets (CSS + average HTML size) are respected
 *
 * Accessibility and visual checks need a browser: see `npm run qa` and
 * `npm run a11y`.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = path.join(ROOT, 'public');

const failures = [];
const checks = [];
const ok = (name, detail = '') => checks.push({ name, detail, pass: true });
const fail = (name, detail) => {
  checks.push({ name, detail, pass: false });
  failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

/* ── 1. Build (the build itself validates links and id cross-references) ── */
try {
  const { stdout } = await run('node', [path.join(ROOT, 'tools/build.mjs')], { cwd: ROOT });
  ok('build completes', stdout.trim().split('\n').filter(Boolean).pop().trim());
} catch (error) {
  fail('build completes', String(error.stdout || error.message).trim().slice(-400));
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

/* ── 2. Inspect the generated HTML ─────────────────────────────────────── */
const files = (await fs.readdir(OUT)).filter((f) => f.endsWith('.html'));
const pages = new Map();
for (const file of files) pages.set(file, await fs.readFile(path.join(OUT, file), 'utf8'));

const attr = (html, re) => (html.match(re) || []).slice(1);

/* Required metadata per page */
const missingMeta = [];
for (const [file, html] of pages) {
  const checksFor = {
    title: /<title>([^<]{10,})<\/title>/,
    description: /<meta name="description" content="([^"]{40,})"/,
    canonical: /<link rel="canonical" href="(https?:\/\/[^"]+)"/,
    ogImage: /<meta property="og:image" content="([^"]+)"/,
    ogTitle: /<meta property="og:title" content="([^"]+)"/,
    viewport: /<meta name="viewport" content="([^"]+)"/,
    lang: /<html lang="([a-z-]+)"/,
    main: /<main id="main"/,
    skipLink: /class="skip-link"/
  };
  for (const [key, re] of Object.entries(checksFor)) {
    if (!re.test(html)) missingMeta.push(`${file}:${key}`);
  }
  if (file !== '404.html' && !/application\/ld\+json/.test(html)) missingMeta.push(`${file}:jsonLd`);
  if (file !== '404.html' && !/name="robots" content="index/.test(html)) missingMeta.push(`${file}:robots`);
}
missingMeta.length
  ? fail('required metadata present', `${missingMeta.length} missing (${missingMeta.slice(0, 6).join(', ')})`)
  : ok('required metadata present', `${pages.size} pages`);

/* Exactly one h1, sensible outline, no heading jumps */
const headingProblems = [];
for (const [file, html] of pages) {
  const levels = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) headingProblems.push(`${file}: ${h1s} h1`);
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      headingProblems.push(`${file}: h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }
}
headingProblems.length
  ? fail('heading outline valid', headingProblems.slice(0, 5).join(', '))
  : ok('heading outline valid');

/* Images: alt + intrinsic dimensions (prevents layout shift) */
const imageProblems = [];
for (const [file, html] of pages) {
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(tag)) imageProblems.push(`${file}: img without alt`);
    if (!/\swidth=/.test(tag) || !/\sheight=/.test(tag)) imageProblems.push(`${file}: img without width/height`);
    if (!/\sloading=/.test(tag)) imageProblems.push(`${file}: img without loading attribute`);
  }
}
imageProblems.length ? fail('images accessible & sized', imageProblems.slice(0, 5).join(', ')) : ok('images accessible & sized');

/* Controls: every input labelled, every button named */
const controlProblems = [];
for (const [file, html] of pages) {
  const formBlocks = html.match(/<form[\s\S]*?<\/form>/g) || [];
  for (const block of formBlocks) {
    for (const input of block.match(/<(input|select|textarea)\b[^>]*>/g) || []) {
      const id = (input.match(/id="([^"]+)"/) || [])[1];
      const isHidden = /type="(hidden|submit|button)"/.test(input) || /aria-hidden="true"/.test(input);
      if (isHidden) continue;
      if (!id || !new RegExp(`for="${id}"`).test(block)) controlProblems.push(`${file}: ${id || 'input'} has no label`);
    }
  }
  for (const button of html.match(/<button\b[^>]*>([\s\S]*?)<\/button>/g) || []) {
    const text = button.replace(/<[^>]+>/g, '').trim();
    if (!text && !/aria-label=/.test(button)) controlProblems.push(`${file}: unnamed button`);
  }
}
controlProblems.length ? fail('form & button labelling', controlProblems.slice(0, 5).join(', ')) : ok('form & button labelling');

/* Status labels never rely on colour alone: every badge/branding pip has text */
const colourOnly = [];
for (const [file, html] of pages) {
  for (const badge of html.match(/<span class="badge[^"]*"[^>]*>[\s\S]*?<\/span>/g) || []) {
    if (!badge.replace(/<[^>]+>/g, '').trim()) colourOnly.push(`${file}: empty badge`);
  }
  for (const pip of html.match(/<span class="pip"[^>]*>[\s\S]*?<\/span>\s*<\/span>/g) || []) {
    if (!pip.replace(/<[^>]+>/g, '').trim()) colourOnly.push(`${file}: pip without label`);
  }
}
colourOnly.length ? fail('status text accompanies colour', colourOnly.slice(0, 5).join(', ')) : ok('status text accompanies colour');

/* Honesty guard: no invented numbers, awards, clients or revenue in content */
const contentDir = path.join(ROOT, 'content');
const banned = [
  /award[- ]winning/i,
  /roi of \d/i,
  /\d+%\s*(increase|growth|uplift|conversion)/i,
  /\$\d+[km]?\s*(revenue|in sales)/i,
  /years of experience/i,
  /client testimonials?/i,
  /trusted by \d+/i,
  /\bbest[- ]selling\b/i
];
const contentIssues = [];
for (const file of (await fs.readdir(contentDir)).filter((f) => f.endsWith('.js'))) {
  const text = await fs.readFile(path.join(contentDir, file), 'utf8');
  for (const re of banned) {
    const hit = text.match(re);
    if (hit) contentIssues.push(`${file}: "${hit[0]}"`);
  }
  // Percentage-based skill claims are disallowed by design.
  for (const hit of text.matchAll(/level:\s*'?\d{1,3}%'/g) || []) contentIssues.push(`${file}: ${hit[0]}`);
}
contentIssues.length ? fail('no fabricated claims in content', contentIssues.join(', ')) : ok('no fabricated claims in content');

/* Filter data present on filterable collections */
const arrowOnly = [];
for (const [file, html] of pages) {
  if (/data-filter-list|data-filter-table/.test(html) && !/data-search="/.test(html)) {
    if (file !== 'certificates.html') arrowOnly.push(file);
  }
}
arrowOnly.length ? fail('filterable items expose search data', arrowOnly.join(', ')) : ok('filterable items expose search data');

/* ── 3. Budgets ───────────────────────────────────────────────────────── */
const cssSize = (await fs.stat(path.join(OUT, 'assets/css/app.css'))).size;
cssSize <= 120 * 1024 ? ok('CSS budget', `${(cssSize / 1024).toFixed(1)} KB ≤ 120 KB`) : fail('CSS budget', `${(cssSize / 1024).toFixed(1)} KB > 120 KB`);

let jsBytes = 0;
const jsFiles = await fs.readdir(path.join(OUT, 'assets/js'));
for (const f of jsFiles) jsBytes += (await fs.stat(path.join(OUT, 'assets/js', f))).size;
jsBytes <= 90 * 1024 ? ok('JS budget', `${(jsBytes / 1024).toFixed(1)} KB ≤ 90 KB (unminified source)`) : fail('JS budget', `${(jsBytes / 1024).toFixed(1)} KB > 90 KB`);

const sizes = await Promise.all([...pages.keys()].map(async (f) => ({ f, s: (await fs.stat(path.join(OUT, f))).size })));
const biggest = sizes.sort((a, b) => b.s - a.s)[0];
biggest.s <= 120 * 1024 ? ok('page weight budget', `largest page ${biggest.f} ${(biggest.s / 1024).toFixed(1)} KB ≤ 120 KB`) : fail('page weight budget', `${biggest.f} ${(biggest.s / 1024).toFixed(1)} KB`);

/* Fonts must be self-hosted woff2 subsets */
const fontFiles = (await fs.readdir(path.join(OUT, 'assets/fonts'))).filter((f) => f.endsWith('.woff2'));
fontFiles.length === 3 ? ok('fonts self-hosted', `${fontFiles.length} variable subsets`) : fail('fonts self-hosted', `${fontFiles.length} found (expected 3)`);

/* No third-party requests in the generated shell */
const thirdParty = [];
for (const [file, html] of pages) {
  for (const url of (html.match(/(?:src|href)="(https?:\/\/[^"]+)"/g) || [])) {
    const value = url.split('"')[1];
    if (!value.startsWith('https://schema.org') && !value.startsWith('https://dev.digitalindiahub.com')) {
      thirdParty.push(`${file}: ${value}`);
    }
  }
}
thirdParty.length ? fail('no third-party runtime requests', thirdParty.slice(0, 5).join(', ')) : ok('no third-party runtime requests');

/* Sitemap coverage */
const sitemap = await fs.readFile(path.join(OUT, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
urls === files.filter((f) => f !== '404.html').length
  ? ok('sitemap covers every page', `${urls} URLs`)
  : fail('sitemap coverage', `${urls} URLs vs ${files.filter((f) => f !== '404.html').length} pages`);

/* ── Report ───────────────────────────────────────────────────────────── */
console.log('\n  TEST SUITE');
console.log('  ' + '─'.repeat(58));
for (const c of checks) {
  console.log(`  ${c.pass ? '✓' : '✗'} ${c.name.padEnd(34)} ${c.detail || ''}`);
}
console.log('  ' + '─'.repeat(58));
console.log(`  ${failures.length ? `${failures.length} FAILING` : 'All checks passed'}\n`);
if (failures.length) {
  failures.forEach((f) => console.log(`   · ${f}`));
  console.log();
  process.exitCode = 1;
}
