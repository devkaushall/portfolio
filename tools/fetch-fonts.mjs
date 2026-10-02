/**
 * Downloads the variable woff2 latin subsets used by the design system and
 * writes assets/fonts/fonts.css.
 *
 * Fonts are self-hosted: the site makes no third-party requests on the critical
 * path. Google serves one variable file per family, so a single @font-face with
 * a weight range covers every weight the design system uses.
 *
 *   node tools/fetch-fonts.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const FAMILIES = [
  { name: 'Sora', query: 'Sora:wght@400..800', file: 'sora-var.woff2', range: '400 800' },
  { name: 'Manrope', query: 'Manrope:wght@400..700', file: 'manrope-var.woff2', range: '400 700' },
  { name: 'JetBrains Mono', query: 'JetBrains+Mono:wght@400..500', file: 'jetbrains-mono-var.woff2', range: '400 500' }
];

const OUT = 'assets/fonts';
const css = [];

for (const fam of FAMILIES) {
  const res = await fetch(`https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`, {
    headers: { 'User-Agent': UA }
  });
  const text = await res.text();
  const blocks = text.split('@font-face').slice(1);
  const latin = blocks.find((b) => /unicode-range:\s*U\+0000-00FF/.test(b));
  if (!latin) throw new Error(`no latin subset found for ${fam.name}`);
  const src = (latin.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
  if (!src) throw new Error(`no woff2 url found for ${fam.name}`);
  const bin = Buffer.from(await (await fetch(src)).arrayBuffer());
  await fs.writeFile(path.join(OUT, fam.file), bin);
  css.push(
    `@font-face{font-family:'${fam.name}';font-style:normal;font-weight:${fam.range};font-display:swap;` +
      `src:url('fonts/${fam.file}') format('woff2');` +
      `unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`
  );
  console.log(`saved ${fam.file} (${(bin.length / 1024).toFixed(1)} KB)`);
}

await fs.writeFile(path.join(OUT, 'fonts.css'), css.join('\n') + '\n');
console.log('wrote assets/fonts/fonts.css');
