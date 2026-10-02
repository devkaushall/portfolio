/**
 * BUILD
 * ---------------------------------------------------------------------------
 * Generates the production site into /public from the content modules in
 * /content. No framework, no bundler — plain Node and template strings.
 *
 *   npm run build          # regenerate every page + assets + sitemap
 *   npm test               # build, HTML validation and a11y checks
 *
 * Output: public/  (deployable to any static host)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../content/site.js';
import { profile } from '../content/profile.js';
import { destinations, secondaryDestinations, allDestinations } from '../content/nav.js';
import { missions } from '../content/missions.js';
import { tools as allTools } from '../content/tools.js';
import { learningEntries } from '../content/learning.js';
import { achievements } from '../content/achievements.js';

import { documentShell, esc } from './lib/site-kit.mjs';
import { caseFile, logFile } from './lib/paths.mjs';
import { commandCenter, storyMode, missionsPage, caseFilesPage, missionDetail } from './pages/primary.mjs';
import {
  skillTreePage, arsenalPage, toolkitPage, achievementsPage, certificatesPage,
  learningLabPage, learningLogPage, logDetail, hqPage, contactPage, notFoundPage
} from './pages/modules.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT = path.join(ROOT, 'public');
const r = (...parts) => path.join(ROOT, ...parts);

/* ── Helpers ───────────────────────────────────────────────────────────── */

const read = (p) => fs.readFile(p, 'utf8');
const write = async (p, data) => {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, data);
};

/** Conservative CSS minification: comments and redundant whitespace only.
 *  Nothing is rewritten inside functions, so calc() spacing stays intact. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .replace(/ ?([{};,]) ?/g, '$1')
    .replace(/\n/g, '')
    .trim();
}

/** Copy a directory tree into the build output. */
async function copyDir(from, to) {
  let entries;
  try {
    entries = await fs.readdir(from, { withFileTypes: true });
  } catch {
    return 0;
  }
  let count = 0;
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) count += await copyDir(src, dest);
    else {
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(src, dest);
      count += 1;
    }
  }
  return count;
}

/* ── SEO / structured data ─────────────────────────────────────────────── */

const abs = (file) => `${site.url}/${file === 'index.html' ? '' : file}`;

const breadcrumb = (name, file) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Command Center', item: `${site.url}/` },
    ...(file === 'index.html' ? [] : [{ '@type': 'ListItem', position: 2, name, item: abs(file) }])
  ]
});

const personNode = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: profile.name,
  jobTitle: profile.role.split(' + ').map((s) => s.charAt(0) + s.slice(1).toLowerCase()).join(' & '),
  description:
    'Early-career digital marketer and designer working across content, SEO, social media, design and WordPress builds.',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  knowsAbout: [
    'Digital marketing', 'Search engine optimisation', 'Content strategy',
    'Graphic design', 'Social media marketing', 'WordPress', 'Web analytics'
  ],
  url: `${site.url}/`,
  ...(site.publicEmail ? { email: site.publicEmail } : {})
};

const pageSchema = (name, description, file, type = 'WebPage') => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  description,
  url: abs(file),
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#person` },
  breadcrumb: breadcrumb(name, file)
});

/* ── Page registry ─────────────────────────────────────────────────────── */

const pages = [];

/* 01 — COMMAND CENTER */
pages.push({
  file: 'index.html',
  dest: 'command-center',
  title: `${profile.name} — Digital Marketer + Designer | Command Centre`,
  description:
    'A personal command centre, not a conventional portfolio: current focus areas, missions, skills, tools and an open learning log from an early-career digital marketer and designer based in India. No superhero origin story — just steady learning.',
  body: commandCenter(),
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: `${profile.name} — Command Centre`,
      url: `${site.url}/`,
      description: 'Gamified personal command centre for an early-career digital marketer and designer.',
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#person` }
    },
    { '@context': 'https://schema.org', ...personNode },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `${profile.name} — player profile`,
      url: `${site.url}/`,
      mainEntity: { '@id': `${site.url}/#person` },
      breadcrumb: breadcrumb('Command Center', 'index.html')
    }
  ]
});

/* 02 — STORY MODE */
pages.push({
  file: 'story-mode.html',
  dest: 'story-mode',
  title: `Story Mode — how curiosity became a path | ${profile.name}`,
  description:
    'Six chapters on how an interest in visual work turned into a practical digital marketing practice: what was learned, in what order, and what is still being worked out.',
  body: storyMode(),
  schema: [pageSchema('Story Mode', 'Chapters of learning from curiosity to practical digital skills.', 'story-mode.html', 'AboutPage')]
});

/* 03 — MISSIONS */
pages.push({
  file: 'missions.html',
  dest: 'missions',
  title: `Missions — projects, practice briefs and experiments | ${profile.name}`,
  description: `A filterable record of ${missions.length} missions: objectives, approaches, outcomes and lessons. Practice work is labelled as practice work, with no invented clients or results.`,
  body: missionsPage(),
  schema: [pageSchema('Missions', 'Filterable mission index with objectives, status and outcomes.', 'missions.html', 'CollectionPage')]
});

/* 04 — SKILL TREE */
pages.push({
  file: 'skill-tree.html',
  dest: 'skill-tree',
  title: `Skill Tree — eight branches, four honest levels | ${profile.name}`,
  description:
    'A visual skill tree organised by discipline with four self-assessed levels — learning, practising, developing, working knowledge. No arbitrary percentages.',
  body: skillTreePage(),
  schema: [pageSchema('Skill Tree', 'Skill progression by branch with self-assessed levels and linked tools.', 'skill-tree.html', 'CollectionPage')]
});

/* 05 — ARSENAL */
pages.push({
  file: 'arsenal.html',
  dest: 'arsenal',
  title: `Arsenal — tools and platforms in use | ${profile.name}`,
  description: `The ${allTools.length} tools in use or being learned, grouped by discipline and labelled with an honest familiarity status.`,
  body: arsenalPage(),
  schema: [pageSchema('Arsenal', 'Tools grouped by discipline with familiarity status.', 'arsenal.html', 'CollectionPage')]
});

/* 06 — ACHIEVEMENTS */
pages.push({
  file: 'achievements.html',
  dest: 'achievements',
  title: `Achievements — milestones, certificates and published work | ${profile.name}`,
  description:
    'Only what can be evidenced: recorded milestones, verification status for every entry, and designed empty slots where nothing has been earned yet.',
  body: achievementsPage(),
  schema: [pageSchema('Achievements', 'Verifiable milestones with explicit empty states for what is not yet earned.', 'achievements.html', 'CollectionPage')]
});

/* 07 — LEARNING LAB */
pages.push({
  file: 'learning-lab.html',
  dest: 'learning-lab',
  title: `Learning Lab — an ongoing log of experiments | ${profile.name}`,
  description:
    'A dated, filterable record of tests, research and lessons learned while building practical digital marketing, SEO, content and design skills.',
  body: learningLabPage(),
  schema: [pageSchema('Learning Lab', 'Ongoing learning and experimentation log.', 'learning-lab.html', 'CollectionPage')]
});

/* 08 — HQ */
pages.push({
  file: 'hq.html',
  dest: 'hq',
  title: `HQ — profile, capabilities and contact hub | ${profile.name}`,
  description:
    'The profile hub: a concise introduction, capabilities with honest confidence levels, professional interests, links, CV slot and contact routes.',
  body: hqPage(),
  schema: [pageSchema('HQ', 'Profile, capabilities, interests and contact hub.', 'hq.html', 'AboutPage')]
});

/* Connected modules */
pages.push({
  file: 'case-files.html',
  dest: 'case-files',
  title: `Case Files — the evidence room | ${profile.name}`,
  description:
    'Every mission filed for reference: objective, context, approach, outcome and the explicit evidence status of each record.',
  body: caseFilesPage(),
  schema: [pageSchema('Case Files', 'Register of mission case files with evidence status.', 'case-files.html', 'CollectionPage')]
});

pages.push({
  file: 'toolkit.html',
  dest: 'toolkit',
  title: `Toolkit — the working loadout | ${profile.name}`,
  description: 'The compact working loadout: every tool, its discipline, its familiarity status and the skills that depend on it.',
  body: toolkitPage(),
  schema: [pageSchema('Toolkit', 'Tabular view of the toolset with status per tool.', 'toolkit.html', 'CollectionPage')]
});

pages.push({
  file: 'learning-log.html',
  dest: 'learning-log',
  title: `Learning Log — every entry, dated | ${profile.name}`,
  description: `The learning lab as a single dated table: ${learningEntries.length} entries in reverse chronological order, filterable by category and status.`,
  body: learningLogPage(),
  schema: [pageSchema('Learning Log', 'Reverse-chronological table of learning entries.', 'learning-log.html', 'CollectionPage')]
});

pages.push({
  file: 'certificates.html',
  dest: 'certificates',
  title: `Certificates — credential register | ${profile.name}`,
  description:
    'A credential register that stays empty until certificates are completed and verifiable. No placeholders are passed off as real qualifications.',
  body: certificatesPage(),
  schema: [pageSchema('Certificates', 'Credential register with verification requirements.', 'certificates.html', 'CollectionPage')]
});

pages.push({
  file: 'contact.html',
  dest: 'contact',
  title: `Contact — open a channel | ${profile.name}`,
  description:
    'A short brief is enough to start a conversation about content, SEO, design or WordPress work. Accessible form with clear validation and honest delivery states.',
  body: contactPage(),
  schema: [pageSchema('Contact', 'Contact form and direct channels with clear delivery states.', 'contact.html', 'ContactPage')]
});

/* Detail pages: missions → case files, log entries → log pages */
for (const m of missions) {
  pages.push({
    file: caseFile(m),
    dest: 'case-files',
    title: `${m.id} ${m.title} — case file | ${profile.name}`,
    description: `${m.objective} Recorded as a ${m.briefType.toLowerCase()} with outcome, lessons and explicit evidence status.`,
    body: missionDetail(m),
    schema: [
      pageSchema(`${m.id} ${m.title}`, m.objective, caseFile(m), 'CreativeWork'),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: m.title,
        description: m.objective,
        creator: { '@id': `${site.url}/#person` },
        dateCreated: m.date,
        genre: m.category,
        keywords: [...m.skills, ...m.tools].join(', ')
      }
    ]
  });
}

for (const e of learningEntries) {
  pages.push({
    file: logFile(e),
    dest: 'learning-log',
    title: `${e.title} — learning log | ${profile.name}`,
    description: e.summary.slice(0, 180),
    body: logDetail(e),
    schema: [
      pageSchema(e.title, e.summary, logFile(e), 'Article'),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: e.title,
        datePublished: e.date,
        articleSection: e.category,
        author: { '@id': `${site.url}/#person` },
        keywords: (e.tags || []).join(', ')
      }
    ]
  });
}

/* 404 */
pages.push({
  file: '404.html',
  dest: 'not-found',
  title: `404 — signal lost | ${profile.name}`,
  description: 'Route not found. Return to the command centre or select one of the eight destinations.',
  body: notFoundPage(),
  schema: null
});

/* ── Build ─────────────────────────────────────────────────────────────── */

async function build() {
  const started = Date.now();
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  /* Styles: fonts + four layers, concatenated into one request. */
  const cssParts = await Promise.all(
    ['assets/fonts/fonts.css', 'assets/css/01-tokens.css', 'assets/css/02-layout.css', 'assets/css/03-components.css', 'assets/css/04-pages.css'].map(
      (f) => read(r(f))
    )
  );
  // fonts.css lives beside the fonts in /assets/fonts, but is bundled into
  // /assets/css/app.css — so its relative URLs get rewritten here.
  const css = minifyCss(
    `/* Dev Kaushal — Command Centre v${site.version} · build ${site.buildDate} */\n` +
      cssParts.join('\n').replace(/url\('fonts\//g, "url('../fonts/")
  );
  await write(path.join(OUT, 'assets/css/app.css'), css);

  /* Server configuration for Apache/cPanel hosting (ignored by other hosts). */
  await fs.copyFile(r('deploy/.htaccess'), path.join(OUT, '.htaccess')).catch(() => {});

  /* Assets: fonts, scripts, images, downloadable documents. */
  const fontCount = await copyDir(r('assets/fonts'), path.join(OUT, 'assets/fonts'));
  const jsCount = await copyDir(r('assets/js'), path.join(OUT, 'assets/js'));
  const imgCount = await copyDir(r('assets/img'), path.join(OUT, 'assets/img'));
  const fileCount = await copyDir(r('assets/files'), path.join(OUT, 'assets/files'));

  /* Pages. */
  for (const page of pages) {
    const html = documentShell(page);
    await write(path.join(OUT, page.file), html);
  }

  /* Sitemap: primary destinations and detail pages, excluding 404. */
  const indexable = pages.filter((p) => p.file !== '404.html');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) => `  <url>
    <loc>${abs(p.file)}</loc>
    <lastmod>${site.buildDate}</lastmod>
    <changefreq>${p.file === 'index.html' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.file === 'index.html' ? '1.0' : destinations.some((d) => d.file === p.file) ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  await write(path.join(OUT, 'sitemap.xml'), sitemap);

  await write(
    path.join(OUT, 'robots.txt'),
    `# ${profile.name} — Command Centre
User-agent: *
Allow: /

# No tracking scripts are loaded by this site.
Sitemap: ${site.url}/sitemap.xml
`
  );

  await write(
    path.join(OUT, 'manifest.webmanifest'),
    JSON.stringify(
      {
        name: `${profile.name} — Command Centre`,
        short_name: 'DEV.K',
        description: 'Personal command centre of Dev Kaushal — digital marketer and designer.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b171f',
        theme_color: '#0b171f',
        icons: [
          { src: 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      },
      null,
      2
    ) + '\n'
  );

  await write(
    path.join(OUT, 'humans.txt'),
    `/* TEAM */
  Owner, design, content: ${profile.name}
  Role: ${profile.role}
  Location: ${profile.location}
  Contact: ${site.publicEmail || 'see contact page'}

/* SITE */
  Built: ${site.buildDate}
  Version: v${site.version}
  Stack: static HTML generated from structured content modules (Node build script)
  Type: Sora, Manrope, JetBrains Mono — self-hosted
  Fonts, scripts and images: all first-party; no third-party requests on the critical path
`
  );

  /* ── Validation: internal links must resolve to generated files ────────── */
  const generated = new Set([...indexable.map((p) => p.file), '404.html']);
  const problems = [];
  for (const page of pages) {
    const hrefs = [...page.body.matchAll(/href="([^"#?][^"]*)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      const target = href.split('#')[0].split('?')[0];
      if (!target) continue;
      if (!generated.has(target)) problems.push(`${page.file} → ${href}`);
    }
  }

  /* ── Validation: cross-references inside content data ─────────────────── */
  const toolIds = new Set(allTools.map((t) => t.id));
  const missionIds = new Set(missions.map((m) => m.id));
  const entryIds = new Set(learningEntries.map((e) => e.id));
  const { skillIndex } = await import('../content/skills.js');
  const skillIds = new Set(Object.keys(skillIndex));

  for (const m of missions) {
    for (const id of m.skills) if (!skillIds.has(id)) problems.push(`mission ${m.id}: unknown skill "${id}"`);
    for (const id of m.tools) if (!toolIds.has(id)) problems.push(`mission ${m.id}: unknown tool "${id}"`);
    for (const id of m.linkedLab || []) if (!entryIds.has(id)) problems.push(`mission ${m.id}: unknown log entry "${id}"`);
  }
  for (const e of learningEntries) {
    for (const id of e.missions || []) if (!missionIds.has(id)) problems.push(`entry ${e.id}: unknown mission "${id}"`);
    for (const id of e.skills || []) if (!skillIds.has(id)) problems.push(`entry ${e.id}: unknown skill "${id}"`);
    for (const id of e.tools || []) if (!toolIds.has(id)) problems.push(`entry ${e.id}: unknown tool "${id}"`);
  }
  for (const t of allTools) {
    for (const id of t.skills || []) if (!skillIds.has(id)) problems.push(`tool ${t.id}: unknown skill "${id}"`);
  }
  for (const a of achievements) {
    for (const id of a.relatedMissions || []) if (!missionIds.has(id)) problems.push(`achievement ${a.id}: unknown mission "${id}"`);
  }

  /* ── Report ───────────────────────────────────────────────────────────── */
  const cssSize = (await fs.stat(path.join(OUT, 'assets/css/app.css'))).size;
  const htmlSizes = await Promise.all(
    pages.map(async (p) => ({ file: p.file, size: (await fs.stat(path.join(OUT, p.file))).size }))
  );
  const totalHtml = htmlSizes.reduce((n, h) => n + h.size, 0);

  console.log(`\n  DEV.K — COMMAND CENTRE · build v${site.version}`);
  console.log('  ' + '─'.repeat(58));
  console.log(`  pages generated     ${String(pages.length).padStart(4)}`);
  console.log(`  destinations        ${String(destinations.length).padStart(4)}  (+ ${secondaryDestinations.length} connected modules)`);
  console.log(`  case files          ${String(missions.length).padStart(4)}`);
  console.log(`  log entries         ${String(learningEntries.length).padStart(4)}`);
  console.log(`  assets copied       ${String(fontCount + jsCount + imgCount + fileCount).padStart(4)}  (fonts ${fontCount}, js ${jsCount}, img ${imgCount}, files ${fileCount})`);
  console.log(`  css bundle          ${(cssSize / 1024).toFixed(1).padStart(4)} KB  (unminified ${(cssParts.join('').length / 1024).toFixed(1)} KB)`);
  console.log(`  html total          ${(totalHtml / 1024).toFixed(1).padStart(4)} KB  (avg ${(totalHtml / pages.length / 1024).toFixed(1)} KB/page)`);
  console.log(`  built in            ${String(Date.now() - started).padStart(4)} ms`);
  if (problems.length) {
    console.log(`\n  ⚠ ${problems.length} issue(s) found:`);
    problems.slice(0, 40).forEach((p) => console.log(`     · ${p}`));
    process.exitCode = 1;
  } else {
    console.log('  integrity checks    PASS — all internal links and cross-references resolve\n');
  }
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});

export { pages, minifyCss };
