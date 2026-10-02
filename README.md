# DEV.K — COMMAND CENTRE

A personal portfolio built as a **command centre**: a content-driven static site for
Dev Kaushal — digital marketer and designer, based in India.

It keeps the "SELECT DESTINATION / COMMAND CENTER / player profile" framing of the
original build and finishes it: eight working destinations, five connected modules,
real detail views, filters, a validated contact form, justified empty states, and a
design system that stays readable.

> **What this site deliberately is not:** a superhero origin story. There are no invented
> clients, revenues, rankings, conversion rates, awards, certifications or testimonials
> anywhere in this repository. Where information does not exist, the interface says so and
> shows the slot that will hold it later.

---

## 1. Quick start

```bash
npm run build     # generate /public from /content
npm run serve     # preview at http://localhost:4173
npm run dev       # build, then serve
npm test          # build + 14 structural/SEO/honesty checks (no browser needed)
npm run qa        # headless browser: layout, overflow, interactions, screenshots
npm run a11y      # axe-core WCAG 2.1 A/AA audit — 16 pages × 2 viewports
```

`qa` and `a11y` need a running server (`npm run serve`) in another terminal.

No build framework is required: the only development dependency is Playwright, used
solely for the browser-based checks. Node 20+ and nothing else for the build itself.

---

## 2. Project structure

```
content/                 ← ALL EDITABLE CONTENT LIVES HERE (plain JS objects)
  site.js                domain, version, contact endpoint, social links, analytics
  profile.js             identity, tagline, availability, capabilities, portrait slot, CV
  nav.js                 the destination model (8 destinations + 5 modules)
  focus.js               CURRENT FOCUS cards + their checklists
  story.js               STORY MODE chapters
  missions.js            mission records → missions + case files
  skills.js              skill tree: 8 branches, 4 levels
  tools.js               arsenal / toolkit
  achievements.js        achievements + empty slots + verification policy
  learning.js            learning lab entries + CURRENTLY LEARNING block

tools/
  build.mjs              generator → public/
  serve.mjs              local preview server (0.0.0.0, no dependencies)
  test.mjs               structural, SEO and honesty checks
  qa.mjs                 headless layout/interaction checks + screenshots
  a11y.mjs               axe-core audit
  fetch-fonts.mjs        re-download the self-hosted font subsets
  make-assets.py         regenerate favicon, app icons and the social card
  lib/site-kit.mjs       escaping, icons, badges, partials (rail, dock, footer, shell)
  lib/paths.mjs          filename scheme for case files and log entries
  pages/primary.mjs      COMMAND CENTER, STORY MODE, MISSIONS, CASE FILES, detail pages
  pages/modules.mjs      SKILL TREE, ARSENAL, ACHIEVEMENTS, LAB, HQ, CONTACT, 404, modules

assets/
  css/01-tokens.css      palette, type scale, spacing, motion tokens + reset
  css/02-layout.css      app shell, rail, mobile dock, responsive recomposition
  css/03-components.css  every reusable component
  css/04-pages.css       per-destination composition
  js/site.js             clock, nav sheet, reveals, filters, form (progressive enhancement)
  fonts/                 3 self-hosted variable woff2 subsets (Sora, Manrope, JetBrains Mono)
  img/                   favicon, app icons, social card, profile/ (portrait slot)
  files/                 downloadable documents (CV goes here)

deploy/.htaccess         Apache/cPanel rules — copied into public/ on build
public/                  ← BUILD OUTPUT. Deploy this folder.
```

---

## 3. Editing content

Everything on the site comes from `content/*.js`. Nothing is hardcoded in a template, so
you never need to touch HTML to add a mission, tool, skill or log entry.

### Add a mission (a case file)

```js
// content/missions.js — append to the missions array
{
  id: 'M-010',                   // M-0NN → produces case-0NN-<slug>.html
  slug: 'short-kebab-case',
  title: 'Project name',
  category: 'SEO',               // new categories appear in the filter automatically
  status: 'ACTIVE',              // ACTIVE | COMPLETED | EXPERIMENT | LEARNING | ARCHIVED
  date: '2026-10',               // YYYY-MM
  year: '2026',
  briefType: 'SPEC BRIEF — NOT A CLIENT PROJECT',
  client: null,
  clientNote: 'State plainly what this was and was not.',
  objective: 'One line.',
  description: 'Short paragraph.',
  context: 'Why it existed.',
  approach: ['Step one.', 'Step two.'],
  outcome: 'What happened — including what did not.',
  lessons: ['What changed afterwards.'],
  skills: ['on-page-seo'],       // must exist in content/skills.js
  tools: ['wordpress'],          // must exist in content/tools.js
  evidence: [],                  // or [{ label, url, note }]
  metrics: [],                   // keep empty unless you measured it yourself
  linkedLab: ['lab-004']         // must exist in content/learning.js
}
```

The build **fails loudly** if a cross-reference points at something that does not exist,
so typos cannot ship as broken links.

### Add a skill level

Levels are words, never percentages: `LEARNING`, `PRACTISING`, `DEVELOPING`,
`WORKING KNOWLEDGE`. Each has a written definition in `content/skills.js` — a node only
claims a level its definition supports.

### Update the CURRENT FOCUS state

Focus progress is a **checklist**, not an opinion: tick `done: true` on a step and the
meter, counter and stage label all follow on the next build. There is no percentage to
invent.

### Update CURRENTLY LEARNING

One block in `content/learning.js` (`currentlyLearning`) is shared by the command centre,
the lab and the log. Edit once.

### Insert a real portrait

1. Save the image as `assets/img/profile/portrait.webp` (or `.jpg`/`.svg`).
2. In `content/profile.js`:

```js
portrait: {
  src: 'assets/img/profile/portrait.webp',
  webp: null,            // optional <source srcset> for modern formats
  alt: 'Dev Kaushal working at a desk',
  width: 800,
  height: 1000,          // 4:5 — keeps the frame and prevents layout shift
  caption: 'PORTRAIT',
  note: 'Photographed 2026.'
}
```

The frame, corner ticks and grid overlay are part of the layout; the placeholder SVG is
replaced automatically, and no other change is needed.

### Publish a CV

Drop the PDF at `assets/files/cv.pdf`, then in `content/profile.js`:

```js
resume: { url: 'assets/files/cv.pdf', label: 'Download CV (PDF)', meta: 'Updated Oct 2026' }
```

The download button replaces the empty state automatically.

### Turn on contact delivery

Out of the box the form runs in **safe mode**: it validates, then tells the visitor
plainly that no delivery channel is configured. It never claims a message was sent. To
enable delivery, set an endpoint that accepts a JSON `POST` (Formspree, Basin, Netlify
Forms, or your own handler):

```js
// content/site.js
contactEndpoint: 'https://formspree.io/f/xxxxxxxx'
```

### Activate social links

Any profile with `url: null` renders as a designed `PENDING` row instead of a dead link.
Add a URL to activate it.

---

## 4. Deployment

`public/` is a plain static site — HTML, one CSS file, one JS module, fonts and images.
No server-side code, no database, no runtime dependencies.

### Option A — replace the current site at `dev.digitalindiahub.com`

The existing site lives in a WordPress container. Two clean paths:

1. **Static hosting on the subdomain (recommended).** Point the subdomain's document root
   at a folder containing `public/`, or deploy to Netlify/Vercel/Cloudflare Pages and point
   the DNS record at it. Nothing else on the domain is affected.
2. **Upload into the existing hosting.** Upload the *contents* of `public/` (including
   `.htaccess`) into the folder that serves `dev.digitalindiahub.com`. The included
   `.htaccess` wires up the custom 404, compression, caching and MIME types.

If the subdomain is inside a WordPress installation that you must keep, move the
WordPress install to a subfolder first, then drop the static build in the document root.
Do not merge the two into one document root.

### Option B — Netlify / Vercel / Cloudflare Pages / GitHub Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` (or skip and deploy `public/` directly) |
| Publish directory | `public` |
| Node version | 20+ |

Then configure the equivalent of the `.htaccess` rules:

* **Netlify** — `_redirects` file in `public/`: `/*  /404.html  404`
* **Vercel** — `vercel.json`: `{ "cleanUrls": true }` and a 404 rewrite
* **Cloudflare Pages** — works as-is; 404.html is picked up automatically
* **GitHub Pages** — add a `.nojekyll` file to `public/` so `_`-prefixed paths are served

### Before going live

1. Set the real domain in `content/site.js` → `url` (drives canonical URLs, Open Graph
   tags, `sitemap.xml` and `robots.txt`).
2. Add a contact endpoint if the form should deliver.
3. Add real social URLs, or leave them as `PENDING` — that is a legitimate state.
4. Submit `sitemap.xml` in Google Search Console and confirm `robots.txt`.

---

## 5. Design system

The palette comes from the original build and is extended with accessible derivatives:

| Token | Value | Role |
| --- | --- | --- |
| `--ink-800` | `#0b171f` | page surface (reference base) |
| `--ink-700` | `#13232f` | rail and panels (reference) |
| `--paper` | `#f6f2ec` | primary display type (reference) |
| `--sand` | `#e8dbc7` | warm ink used for hero lines and headings (reference) |
| `--slate` | `#9ca9ab` | body copy on dark — 7.6:1 (reference) |
| `--signal` | `#c86a38` | primary accent, fills and rules (reference) |
| `--signal-ink` | `#e5945f` | accent for small text — 7.6:1 on ink |
| `--moss` | `#8cae79` | progress and verified states — 7.1:1 |
| `--line` | `rgba(232,219,199,.15)` | hairline rules (reference) |

Type: **Sora** (display), **Manrope** (body), **JetBrains Mono** (micro labels,
metadata, numerics) — the same families as the reference, self-hosted as three variable
woff2 subsets (~80 KB total) so the site makes no third-party requests.

Rules that hold everywhere:

* Colour never communicates state alone — every status carries text plus a marker.
* Focus is always visible: `2px` accent outline, with a dark halo on the darkest panels.
* All animation is CSS `transform`/`opacity`, and `prefers-reduced-motion` removes it.
* Content is complete and navigable with JavaScript disabled; JS only adds convenience.

---

## 6. Accessibility

* Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` per page, no
  heading-level jumps.
* Full keyboard operation: skip link, mobile menu with focus management and `Escape`,
  operable filters, labelled form fields with inline errors.
* `aria-current="page"` marks the active destination in the rail and the mobile dock.
* Validated with **axe-core (WCAG 2.1 A + AA)**: `npm run a11y` currently reports
  **zero violations across 16 pages × 2 viewports**.
* Reduced-motion users get the same content with animation switched off — verified in
  `npm run qa`.

---

## 7. Honesty guardrails (please keep them)

These are enforced by `npm test`, not just documented:

* No awards, certifications, rankings, client names, revenue or conversion figures in
  `content/`. The test suite greps the content files for fabricated-claim patterns.
* Skill levels cannot be percentages — only the four defined words.
* Mission `metrics` stay empty unless the numbers were measured and the period recorded.
* Practice work is labelled `SPEC BRIEF` / `LEARNING EXERCISE`, never presented as
  client work. `client: null` is the default.
* Achievements state their verification method: `REFERENCED`, `PENDING` or `UNVERIFIED`.
  Self-assessment is labelled as self-assessment.
* The contact form reports "not transmitted" rather than faking a successful send.

---

## 8. Performance

* One CSS request (~72 KB, minified), one JS module (~17 KB unminified source, no
  framework, no polyfills), three font files (~80 KB).
* Static HTML for every page — nothing is rendered client-side. Largest page ~104 KB
  including markup.
* No third-party requests on the critical path: no CDN, no analytics, no icon fonts,
  no tracking pixels. Images carry explicit dimensions to prevent layout shift.
* Cross-document navigation uses the View Transitions API where supported, and is a
  normal page load everywhere else.

---

## 9. Credits

Built for **Dev Kaushal** — digital marketer and designer, based in India.
Typography: Sora, Manrope and JetBrains Mono (SIL Open Font License).
All content, structure and code in this repository are original work.
