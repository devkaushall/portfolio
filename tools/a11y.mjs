/**
 * ACCESSIBILITY AUDIT
 * ---------------------------------------------------------------------------
 * Runs axe-core (WCAG 2.0/2.1 A + AA rules) against every built page at
 * desktop and mobile widths, then reports violations with the offending nodes.
 *
 *   npm run serve      # in one terminal
 *   npm run a11y
 *
 * Any violation fails the run, so this can be wired into CI alongside npm test.
 */

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.QA_BASE || 'http://localhost:4173';
const PAGES = [
  'index.html',
  'story-mode.html',
  'missions.html',
  'case-001-rathi-properties.html',
  'skill-tree.html',
  'arsenal.html',
  'achievements.html',
  'learning-lab.html',
  'learning-log.html',
  'log-004-testing-search-intent.html',
  'hq.html',
  'contact.html',
  'toolkit.html',
  'case-files.html',
  'certificates.html',
  '404.html'
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'mobile', width: 390, height: 844 }
];

const failures = [];

const browser = await chromium.launch();

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();

  for (const file of PAGES) {
    await page.goto(`${BASE}/${file}`, { waitUntil: 'load' });
    await page.waitForTimeout(250);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    for (const violation of results.violations) {
      const nodes = violation.nodes.slice(0, 3).map((n) => n.target.join(' '));
      failures.push({
        page: file,
        viewport: viewport.name,
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        count: violation.nodes.length,
        nodes
      });
    }
  }

  await context.close();
}

await browser.close();

console.log('\n  ACCESSIBILITY AUDIT — axe-core (WCAG 2.1 A/AA + best practice)');
console.log('  ' + '─'.repeat(58));
console.log(`  pages scanned   ${PAGES.length} × ${VIEWPORTS.length} viewports`);

if (!failures.length) {
  console.log('  result          PASS — no violations detected\n');
} else {
  const grouped = new Map();
  for (const f of failures) {
    const key = `${f.id}|${f.impact}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(f);
  }
  console.log(`  result          ${grouped.size} distinct rule violation(s)\n`);
  for (const [key, list] of grouped) {
    const first = list[0];
    console.log(`  · [${first.impact}] ${first.id} — ${first.help}`);
    console.log(`    pages: ${[...new Set(list.map((l) => `${l.page}@${l.viewport}`))].slice(0, 7).join(', ')}${list.length > 7 ? ' …' : ''}`);
    console.log(`    nodes: ${first.nodes.join(' | ')}`);
    console.log('');
  }
  process.exitCode = 1;
}
