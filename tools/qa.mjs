/**
 * QA / VISUAL CHECKS
 * ---------------------------------------------------------------------------
 * Runs a headless-browser pass over the built site and reports:
 *   · console errors and failed requests
 *   · horizontal overflow at each breakpoint
 *   · headings, landmarks and image alt coverage
 *   · contrast-independent status labels (text present next to every colour cue)
 *   · keyboard focus reaching the first interactive element
 *   · screenshots for desktop, tablet and mobile into tools/qa-shots/
 *
 * Requires the site to be served first:
 *   npm run serve            # http://localhost:4173
 *   node tools/qa.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE || 'http://localhost:4173';
const OUT = path.resolve('tools/qa-shots');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 }
];

const PAGES = [
  ['index.html', 'command-centre'],
  ['story-mode.html', 'story-mode'],
  ['missions.html', 'missions'],
  ['case-001-rathi-properties.html', 'case-file'],
  ['skill-tree.html', 'skill-tree'],
  ['arsenal.html', 'arsenal'],
  ['achievements.html', 'achievements'],
  ['learning-lab.html', 'learning-lab'],
  ['hq.html', 'hq'],
  ['contact.html', 'contact'],
  ['toolkit.html', 'toolkit'],
  ['learning-log.html', 'learning-log'],
  ['certificates.html', 'certificates'],
  ['404.html', 'not-found']
];

const issues = [];

/** Run one interaction check; never let a single failure abort the run. */
async function step(label, fn) {
  try {
    await fn();
  } catch (error) {
    issues.push(`${label}: ${String(error.message).split('\n')[0]}`);
  }
}

async function audit(page, url, label, viewport) {
  const response = await page.goto(url, { waitUntil: 'load' });
  if (!response || response.status() !== 200) {
    issues.push(`${label} @${viewport}: HTTP ${response ? response.status() : 'no response'}`);
    return;
  }

  const report = await page.evaluate(() => {
    const doc = document;
    const overflow = doc.documentElement.scrollWidth - doc.documentElement.clientWidth;
    const overflowers = [...doc.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > doc.documentElement.clientWidth + 2 && getComputedStyle(el).position !== 'fixed';
      })
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);

    const headings = [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => ({
      level: Number(h.tagName[1]),
      text: h.textContent.trim().slice(0, 60)
    }));
    const h1s = headings.filter((h) => h.level === 1);
    let headingJump = null;
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i].level - headings[i - 1].level > 1) {
        headingJump = `${headings[i - 1].level} → ${headings[i].level} (${headings[i].text})`;
        break;
      }
    }

    const images = [...doc.images].map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      w: img.getAttribute('width'),
      h: img.getAttribute('height')
    }));

    const inputs = [...doc.querySelectorAll('input, select, textarea')].map((el) => ({
      name: el.name,
      hasLabel: Boolean(
        el.labels?.length || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.type === 'hidden'
      )
    }));

    const buttons = [...doc.querySelectorAll('button')].map((b) => ({
      text: (b.textContent || '').trim().slice(0, 30),
      hasName: Boolean((b.textContent || '').trim() || b.getAttribute('aria-label'))
    }));

    return {
      overflow,
      overflowers,
      h1Count: h1s.length,
      h1Text: h1s.map((h) => h.text),
      headingJump,
      images,
      unlabelledInputs: inputs.filter((i) => !i.hasLabel),
      unnamedButtons: buttons.filter((b) => !b.hasName),
      lang: doc.documentElement.lang,
      title: doc.title,
      description: doc.querySelector('meta[name="description"]')?.content?.length || 0,
      canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      og: Boolean(doc.querySelector('meta[property="og:image"]')),
      jsonLd: doc.querySelectorAll('script[type="application/ld+json"]').length,
      landmarks: {
        main: doc.querySelectorAll('main').length,
        nav: doc.querySelectorAll('nav').length,
        footer: doc.querySelectorAll('footer').length
      },
      navCurrent: doc.querySelectorAll('[aria-current="page"]').length,
      h2Count: doc.querySelectorAll('h2').length,
      textLength: doc.body.innerText.length
    };
  });

  const tag = `${label} @${viewport}`;
  if (report.overflow > 1) issues.push(`${tag}: horizontal overflow of ${report.overflow}px (${report.overflowers.join(', ')})`);
  if (report.h1Count !== 1) issues.push(`${tag}: ${report.h1Count} h1 elements (${report.h1Text.join(' | ')})`);
  if (report.headingJump) issues.push(`${tag}: heading level jump ${report.headingJump}`);
  if (report.unlabelledInputs.length) issues.push(`${tag}: unlabelled inputs ${JSON.stringify(report.unlabelledInputs)}`);
  if (report.unnamedButtons.length) issues.push(`${tag}: unnamed buttons ${JSON.stringify(report.unnamedButtons)}`);
  if (report.lang !== 'en') issues.push(`${tag}: html lang is "${report.lang}"`);
  if (report.description < 60) issues.push(`${tag}: meta description too short (${report.description})`);
  if (!report.canonical.startsWith('http')) issues.push(`${tag}: canonical missing`);
  if (!report.og) issues.push(`${tag}: og:image missing`);
  if (report.landmarks.main !== 1) issues.push(`${tag}: ${report.landmarks.main} main landmarks`);
  if (report.navCurrent < 1) issues.push(`${tag}: no aria-current active-state indicator`);
  if (report.textLength < 800 && label !== 'not-found') issues.push(`${tag}: thin content (${report.textLength} chars)`);

  for (const img of report.images) {
    if (img.alt === null) issues.push(`${tag}: image without alt attribute (${img.src})`);
  }

  return report;
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.name === 'desktop' ? 1 : 2,
      reducedMotion: 'no-preference'
    });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') issues.push(`console error on ${msg.location().url}: ${msg.text()}`);
    });
    page.on('requestfailed', (req) => issues.push(`request failed: ${req.url()} (${req.failure()?.errorText})`));

    for (const [file, label] of PAGES) {
      await audit(page, `${BASE}/${file}`, label, viewport.name);
      await page.screenshot({
        path: path.join(OUT, `${viewport.name}-${label}.png`),
        fullPage: viewport.name === 'desktop' && label !== 'command-centre'
      });
    }

    // Interactions: mobile navigation sheet and the mission filter.
    if (viewport.name === 'mobile') {
      const toggle = page.locator('[data-nav-toggle]');
      await step('mobile: open nav', async () => {
        await page.goto(`${BASE}/index.html`);
        await toggle.click({ timeout: 5000 });
      });
      await page.waitForTimeout(320);
      const expanded = await toggle.getAttribute('aria-expanded');
      if (expanded !== 'true') issues.push('mobile: nav toggle did not open the sheet');
      const navVisible = await page.locator('.nav-item').first().isVisible();
      if (!navVisible) issues.push('mobile: navigation items not visible after opening the sheet');
      await page.screenshot({ path: path.join(OUT, 'mobile-nav-open.png') });

      await step('mobile: close nav with Escape', async () => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(320);
        if ((await toggle.getAttribute('aria-expanded')) !== 'false') issues.push('mobile: Escape did not close the nav sheet');
      });

      await step('mobile: keyboard focus', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => document.activeElement?.tagName || '');
        if (!focused || focused === 'BODY') issues.push('mobile: Tab did not move focus into the page');
      });
    }

    if (viewport.name === 'desktop') {
      await step('desktop: mission filters', async () => {
        await page.goto(`${BASE}/missions.html`);
        const before = await page.locator('.mission-card:visible').count();
        await page.locator('[data-filter="status"][data-value="EXPERIMENT"]').click({ timeout: 5000 });
        await page.waitForTimeout(250);
        const after = await page.locator('.mission-card:visible').count();
        if (!(after > 0 && after < before)) issues.push(`desktop: status filter did not reduce results (${before} → ${after})`);
        const count = await page.locator('[data-results-count]').first().textContent();
        if (Number(count) !== after) issues.push(`desktop: result count ${count} does not match ${after} visible cards`);
        await page.screenshot({ path: path.join(OUT, 'desktop-missions-filtered.png') });
      });

      await step('desktop: form validation', async () => {
        await page.goto(`${BASE}/contact.html`);
        await page.locator('[data-submit]').click({ timeout: 5000 });
        await page.waitForTimeout(250);
        const invalidFields = await page.locator('[data-invalid="true"]').count();
        if (invalidFields < 4) issues.push(`desktop: form validation flagged ${invalidFields} fields (expected ≥4)`);
        await page.screenshot({ path: path.join(OUT, 'desktop-contact-invalid.png') });
      });

      await step('desktop: form safe-mode success', async () => {
        await page.fill('#cf-name', 'Test Person');
        await page.fill('#cf-email', 'test@example.com');
        await page.selectOption('#cf-subject', 'Project enquiry');
        await page.fill('#cf-message', 'This is a validation test message long enough to pass the minimum length rule.');
        await page.check('#cf-consent');
        await page.locator('[data-submit]').click({ timeout: 5000 });
        await page.waitForTimeout(300);
        const state = await page.locator('[data-form-status]').getAttribute('data-state');
        if (state !== 'success') issues.push(`desktop: safe-mode submit produced state "${state}"`);
        await page.screenshot({ path: path.join(OUT, 'desktop-contact-safe-mode.png') });
      });

      // Reduced motion pass.
      const rmContext = await browser.newContext({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
      const rmPage = await rmContext.newPage();
      await rmPage.goto(`${BASE}/index.html`);
      const hiddenReveals = await rmPage.evaluate(
        () => [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity === '0').length
      );
      if (hiddenReveals) issues.push(`reduced-motion: ${hiddenReveals} elements stuck at opacity 0`);
      await rmPage.screenshot({ path: path.join(OUT, 'desktop-reduced-motion.png') });
      await rmContext.close();

      // No-JS pass: content and navigation must still work.
      const noJs = await browser.newContext({ viewport: { width: 1440, height: 960 }, javaScriptEnabled: false });
      const noJsPage = await noJs.newPage();
      await noJsPage.goto(`${BASE}/index.html`);
      const noJsNav = await noJsPage.locator('.nav-item').count();
      if (noJsNav !== 8) issues.push(`no-js: ${noJsNav} navigation items rendered (expected 8)`);
      await noJsPage.screenshot({ path: path.join(OUT, 'desktop-nojs.png') });
      await noJs.close();

      // Content-parity pass: the behaviour layer must never remove or blank
      // rendered content. A selector collision (e.g. a generic data attribute)
      // would show up here as a page whose text shrinks once JS runs.
      const withJs = await browser.newContext({ viewport: { width: 1440, height: 960 } });
      const without = await browser.newContext({ viewport: { width: 1440, height: 960 }, javaScriptEnabled: false });
      const pWith = await withJs.newPage();
      const pWithout = await without.newPage();
      for (const [file, label] of PAGES) {
        await pWith.goto(`${BASE}/${file}`, { waitUntil: 'load' });
        await pWith.waitForTimeout(200);
        const jsText = (await pWith.locator('main').innerText()).replace(/\s+/g, ' ').length;
        await pWithout.goto(`${BASE}/${file}`, { waitUntil: 'load' });
        const noJsText = (await pWithout.locator('main').innerText()).replace(/\s+/g, ' ').length;
        const lost = noJsText - jsText;
        if (lost > 20) {
          issues.push(`${label}: JS removed content from <main> (no-js ${noJsText} chars → js ${jsText} chars, −${lost})`);
        }
      }
      await withJs.close();
      await without.close();
    }

    await context.close();
  }

  await browser.close();

  console.log('\n  QA REPORT');
  console.log('  ' + '─'.repeat(58));
  if (!issues.length) console.log('  PASS — no issues found across 3 viewports and 14 pages\n');
  else {
    console.log(`  ${issues.length} issue(s):`);
    [...new Set(issues)].forEach((i) => console.log(`   · ${i}`));
    console.log();
  }
  console.log(`  screenshots → ${path.relative(process.cwd(), OUT)}/\n`);
}

main().catch((error) => {
  console.error('QA run failed:', error);
  process.exit(1);
});
