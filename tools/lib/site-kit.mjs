/**
 * SITE KIT
 * ---------------------------------------------------------------------------
 * Shared rendering helpers: escaping, icons, badges, partials (rail, dock,
 * footer, head) and small formatters. Everything page-facing is generated from
 * here so the markup stays consistent and accessible across all destinations.
 */

import { site } from '../../content/site.js';
import { profile } from '../../content/profile.js';
import { destinations, secondaryDestinations, allDestinations } from '../../content/nav.js';

/* ── Escaping & formatting ─────────────────────────────────────────────── */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text for HTML contexts. Applied to every piece of content data. */
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Escape a string for use inside a JSON-LD script block. */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/**
 * Format a date string ('YYYY-MM' or 'YYYY-MM-DD') as 'SEP 2026'.
 * Unknown/empty values return an explicit placeholder rather than a blank gap.
 */
export function fmtDate(value) {
  if (!value) return 'DATE NOT SET';
  const [y, m] = String(value).split('-');
  if (!y) return String(value);
  const idx = Number(m) - 1;
  if (Number.isNaN(idx) || !MONTHS[idx]) return y;
  return `${MONTHS[idx]} ${y}`;
}

/** Human-readable duration/label for a period string, e.g. '2026-04 → 2026-09'. */
export const fmtPeriod = (a, b) => `${fmtDate(a)}${b ? ` — ${fmtDate(b)}` : ''}`;

/* ── Status vocabulary → badge variants ────────────────────────────────── */

const STATUS_VARIANTS = {
  // Mission statuses
  ACTIVE: 'active',
  ONGOING: 'active',
  IN_PROGRESS: 'active',
  COMPLETED: 'done',
  EXPERIMENT: 'wait',
  LEARNING: 'learn',
  ARCHIVED: 'archived',
  PAUSED: 'archived',
  IDEA: 'learn',
  // Tool familiarity
  'REGULAR USE': 'active',
  'WORKING KNOWLEDGE': 'done',
  EXPERIMENTING: 'wait',
  // Verification
  REFERENCED: 'done',
  PENDING: 'wait',
  UNVERIFIED: 'archived',
  // Focus stages & skill levels
  PRACTISING: 'active',
  DEVELOPING: 'wait'
};

export const statusVariant = (status) => STATUS_VARIANTS[status] || 'archived';

/** Status badge. The label is always text — colour is a secondary cue. */
export function badge(status, extraClass = '') {
  const variant = statusVariant(status);
  return `<span class="badge badge--${variant}${extraClass ? ` ${extraClass}` : ''}">${esc(status)}</span>`;
}

/** Neutral chip, optionally a link. */
export function chip(label, href = null, className = 'chip') {
  return href
    ? `<a class="${className}" href="${esc(href)}">${esc(label)}</a>`
    : `<span class="${className}">${esc(label)}</span>`;
}

/* ── Skill levels ──────────────────────────────────────────────────────── */

export const LEVELS = ['LEARNING', 'PRACTISING', 'DEVELOPING', 'WORKING KNOWLEDGE'];
const LEVEL_SHORT = { LEARNING: 'LRN', PRACTISING: 'PRC', DEVELOPING: 'DEV', 'WORKING KNOWLEDGE': 'WRK' };

/** Segmented indicator. Decorative pips; the level text always accompanies it. */
export function pips(level) {
  const rank = LEVELS.indexOf(level) + 1 || 1;
  const bars = LEVELS.map((_, i) => {
    const on = i < rank;
    return `<span class="pips__pip${on ? ' pips__pip--on' : ''}" data-level="${i + 1}"></span>`;
  }).join('');
  return `<span class="pips" role="img" aria-label="Level ${rank} of 4: ${esc(level)}">${bars}</span>`;
}

/** Level with visible text + pip indicator. */
export function levelTag(level) {
  return `<span class="skill-node__level">${pips(level)}<span class="micro micro--plain">${esc(level)} <span class="visually-hidden">(${LEVEL_SHORT[level] || ''})</span></span></span>`;
}

/* ── Icons ─────────────────────────────────────────────────────────────── *
 * One inline stroke-icon set (24×24, currentColor). No icon font, no sprite
 * request, and every icon is aria-hidden because a visible label accompanies
 * it everywhere in the interface.
 * ----------------------------------------------------------------------- */

const PATHS = {
  dashboard: '<rect x="3" y="3" width="7.5" height="7.5"/><rect x="13.5" y="3" width="7.5" height="4.5"/><rect x="13.5" y="11" width="7.5" height="10"/><rect x="3" y="14" width="7.5" height="7"/>',
  story: '<path d="M4 4.5h6a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H4z"/><path d="M20 4.5h-6a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H20z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  tree: '<path d="M12 3v5"/><path d="M6 21v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><circle cx="12" cy="10" r="2.4"/><path d="M6 21v-2.5"/><path d="M18 21v-2.5"/>',
  tool: '<path d="M14.5 5.5a3.5 3.5 0 0 1 4.8 4.8l-8 8a3.5 3.5 0 0 1-4.8-4.8z"/><path d="M4 20l3-3"/>',
  wrench: '<path d="M15.5 3.5a5 5 0 0 0-4.2 7.6L4 18.4 5.6 20l7.3-7.3a5 5 0 0 0 7.6-4.2l-3 2.2-2.6-2.6z"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.2L5.5 17A2.5 2.5 0 0 0 7.7 21h8.6a2.5 2.5 0 0 0 2.2-4L14 9.2V3"/><path d="M7.5 14h9"/>',
  hq: '<path d="M4 21V9.5L12 4l8 5.5V21"/><path d="M9.5 21v-6h5v6"/>',
  folder: '<path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18z"/>',
  log: '<path d="M5 4.5h14v15H5z"/><path d="M8.5 9h7"/><path d="M8.5 12.5h7"/><path d="M8.5 16h4"/>',
  certificate: '<path d="M4.5 4.5h15v11h-15z"/><path d="M9 19.5l3-1.6 3 1.6v-4H9z"/><path d="M8 9h8"/>',
  mail: '<path d="M3.5 6.5h17v11h-17z"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  chevron: '<path d="M9 5l7 7-7 7"/>',
  arrow: '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5.5H4.5V6H10"/>',
  spark: '<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  layers: '<path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z"/><path d="M4 12.5l8 4.2 8-4.2"/><path d="M4 16.8l8 4.2 8-4.2"/>',
  pen: '<path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M14 6.5L17.5 10"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16.5v-5"/><path d="M12.5 16.5V7.5"/><path d="M17 16.5v-7"/>',
  signal: '<path d="M5 18.5v-4"/><path d="M10 18.5v-8"/><path d="M15 18.5v-11"/><path d="M20 18.5V5.5"/>',
  film: '<rect x="3.5" y="5" width="17" height="14"/><path d="M8 5v14"/><path d="M16 5v14"/><path d="M3.5 12h17"/>',
  grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.4 2"/>',
  pin: '<path d="M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  warn: '<path d="M12 4l8.5 15h-17z"/><path d="M12 10v4.5"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><path d="M12 7.8h.01"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  home: '<path d="M4 10.5L12 4l8 6.5V20H4z"/><path d="M10 20v-5.5h4V20"/>',
  download: '<path d="M12 4v10.5"/><path d="M7.5 11l4.5 4 4.5-4"/><path d="M5 20h14"/>',
  link: '<path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1-1"/>',
  eye: '<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12S18 17.5 12 17.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>'
};

/**
 * Inline SVG icon.
 * @param {string} name  key from PATHS
 * @param {{size?:number, cls?:string, title?:string}} [opts]
 */
export function icon(name, opts = {}) {
  const d = PATHS[name];
  if (!d) return '';
  const size = opts.size || 16;
  const cls = opts.cls ? ` class="${opts.cls}"` : '';
  const label = opts.title
    ? ` role="img" aria-label="${esc(opts.title)}"`
    : ' aria-hidden="true" focusable="false"';
  return `<svg${cls}${label} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

/* ── Navigation ────────────────────────────────────────────────────────── */

/** Primary destination list. `current` receives aria-current="page". */
export function navList(current) {
  const items = destinations
    .map((d) => {
      const active = d.id === current;
      return `      <li>
        <a class="nav-item" href="${d.file}" data-dest="${d.id}"${active ? ' aria-current="page"' : ''}>
          <span class="nav-item__id" aria-hidden="true">${esc(d.index)}</span>
          <span class="nav-item__label">${esc(d.label)}</span>
          <span class="nav-item__mark" aria-hidden="true"></span>
        </a>
      </li>`;
    })
    .join('\n');
  return `<ul class="nav-list" role="list">\n${items}\n</ul>`;
}

/** Connected-module links (CASE FILES, TOOLKIT, …). */
export function secondaryList(current) {
  const items = secondaryDestinations
    .map(
      (d) => `      <a class="nav-sub__link" href="${d.file}" data-dest="${d.id}"${
        d.id === current ? ' aria-current="page"' : ''
      }>
        <span>${esc(d.label)}</span>
        ${icon('arrow', { size: 13 })}
      </a>`
    )
    .join('\n');
  return `<div class="nav-sub__grid">\n${items}\n</div>`;
}

/* ── Status layer ──────────────────────────────────────────────────────── */

/**
 * Live clock. Renders a static placeholder server-side and is upgraded by
 * assets/js/site.js using the visitor's own browser time — no server calls.
 */
export const clock = (cls = 'clock') =>
  `<time class="${cls}" data-clock datetime="">--:--:--</time><span class="clock__zone" data-clock-zone>LOCAL</span>`;

const availabilityPip = () =>
  `<span class="pip" data-state="${esc(profile.availability.state)}">
          <span class="pip__dot" aria-hidden="true"></span>
          <span>${esc(profile.availability.label)}</span>
        </span>`;

/* ── Partials ──────────────────────────────────────────────────────────── */

/** Skip link + rail/topbar with brand, destination nav and status readout. */
export function rail(current) {
  return `  <a class="skip-link" href="#main">Skip to content</a>

  <header class="app-rail" id="site-rail">
    <div class="rail-inner">
      <div class="rail-brand">
        <a class="brand" href="index.html" aria-label="${esc(profile.name)} — home">
          <span aria-hidden="true">${esc(profile.mark.primary)}</span><span class="brand__sep" aria-hidden="true">${esc(profile.mark.separator)}</span><span class="brand__k" aria-hidden="true">${esc(profile.mark.secondary)}</span><span class="brand__cursor" aria-hidden="true"></span>
        </a>
        <div class="brand-meta">
          ${availabilityPip()}
          <span class="micro micro--muted">${esc(profile.location)}</span>
        </div>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav-wrap" data-nav-toggle>
          ${icon('menu', { size: 15 })}
          <span data-nav-toggle-label>MENU</span>
          <span class="visually-hidden">— open destination menu</span>
        </button>
      </div>

      <div class="rail-nav-wrap" id="primary-nav-wrap" data-nav-wrap>
        <nav class="rail-nav" aria-label="Primary destinations">
          <p class="nav-heading micro"><strong>SELECT</strong> DESTINATION</p>
          ${navList(current)}
        </nav>

        <nav class="nav-sub" aria-label="Connected modules">
          <p class="nav-heading micro"><strong>CONNECTED</strong> MODULES</p>
          ${secondaryList(current)}
        </nav>

        <div class="rail-status">
          <dl class="hero__readout">
            <div class="status-row"><dt>System</dt><dd>ONLINE</dd></div>
            <div class="status-row"><dt>Mode</dt><dd>${esc(profile.currentMode.value)}</dd></div>
            <div class="status-row"><dt>Location</dt><dd>${esc(profile.location.replace(/^BASED IN /, ''))}</dd></div>
            <div class="status-row"><dt>Version</dt><dd>v${esc(site.version)}</dd></div>
            <div class="status-row"><dt>Local time</dt><dd>${clock()}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </header>`;
}

/** Persistent status strip: breadcrumb + build metadata. */
export function sysStrip(current) {
  const dest = allDestinations.find((d) => d.id === current);
  const label = dest ? dest.label : 'COMMAND CENTER';
  const index = dest && dest.index ? dest.index : '—';
  return `    <aside class="sys-strip" aria-label="Page context and system status">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="index.html">COMMAND CENTER</a>
        <span class="crumbs__sep" aria-hidden="true">/</span>
        <span class="crumbs__here" aria-current="page">${esc(index)} ${esc(label)}</span>
      </nav>
      <div class="sys-strip__spacer"></div>
      <p class="sys-strip__meta">
        <span class="pip" data-state="${esc(profile.availability.state)}"><span class="pip__dot" aria-hidden="true"></span> ${esc(profile.availability.label)}</span>
        <span>MODE <b>${esc(profile.currentMode.value)}</b></span>
        <span class="sys-strip__meta--secondary">SYSTEM <b>ONLINE</b></span>
        <span class="sys-strip__meta--secondary">BUILD <b>v${esc(site.version)}</b></span>
        <span>${clock('clock util')}</span>
      </p>
    </aside>`;
}

/** Mobile mission dock — the five core destinations. */
export function dock(current) {
  const core = ['command-center', 'story-mode', 'missions', 'learning-lab', 'hq'];
  const items = core
    .map((id) => {
      const d = allDestinations.find((x) => x.id === id);
      const active = id === current;
      return `    <a class="dock-item" href="${d.file}" data-dest="${d.id}"${active ? ' aria-current="page"' : ''}>
      ${icon(d.icon, { size: 18 })}
      <span>${esc(d.short)}</span>
    </a>`;
    })
    .join('\n');
  return `  <nav class="app-dock" aria-label="Quick destinations (compact)">
${items}
  </nav>`;
}

/** System footer: destination index, connected modules, status note. */
export function sysbar(current) {
  const nav = destinations
    .map((d) => `            <li><a href="${d.file}"${d.id === current ? ' aria-current="page"' : ''}>${esc(d.label)}</a></li>`)
    .join('\n');
  const sub = secondaryDestinations
    .map((d) => `            <li><a href="${d.file}"${d.id === current ? ' aria-current="page"' : ''}>${esc(d.label)}</a></li>`)
    .join('\n');
  return `    <footer class="sysbar" id="site-footer">
      <div class="sysbar__grid">
        <div class="sysbar__block">
          <p class="micro micro--signal">${esc(profile.mark.primary)}${esc(profile.mark.separator)}${esc(profile.mark.secondary)}</p>
          <p class="util">${esc(profile.role)}</p>
          <p class="util">${esc(profile.location)}</p>
          <p class="util">${esc(profile.availability.note)}</p>
        </div>
        <div class="sysbar__block">
          <p class="micro">DESTINATIONS</p>
          <ul>
${nav}
          </ul>
        </div>
        <div class="sysbar__block">
          <p class="micro">CONNECTED MODULES</p>
          <ul>
${sub}
          </ul>
        </div>
        <div class="sysbar__block">
          <p class="micro">SYSTEM</p>
          <ul>
            <li><a href="hq.html">Profile &amp; contact</a></li>
            <li><a href="hq.html#cv">CV / résumé</a></li>
            <li><a href="hq.html#colophon">Colophon &amp; accessibility</a></li>
            <li><a href="index.html#explore">Explore the system</a></li>
          </ul>
        </div>
      </div>
      <div class="sysbar__note">
        <p>© <span data-current-year>${new Date(site.buildDate).getFullYear()}</span> ${esc(profile.name)} — built and maintained in the open. Content reflects self-reported, early-career work; nothing here is presented as verified client results.</p>
        <a class="to-top" href="#main">${icon('arrow', { size: 13, cls: 'to-top__icon' })} BACK TO TOP</a>
      </div>
    </footer>`;
}

/* ── Document shell ────────────────────────────────────────────────────── */

/**
 * Render a complete HTML document.
 *
 * @param {object} o
 * @param {string} o.title        full <title>
 * @param {string} o.description  meta description
 * @param {string} o.file         output filename, e.g. 'missions.html'
 * @param {string} o.dest         destination id for navigation state
 * @param {string} o.body         page markup (without the shell)
 * @param {string} [o.headline]   og:title override
 * @param {object|object[]} [o.schema] JSON-LD payload(s)
 */
export function documentShell({ title, description, file, dest, body, headline, schema, bodyClass = '' }) {
  const canonical = `${site.url}/${file === 'index.html' ? '' : file}`;
  const ogTitle = headline || title;
  const schemas = (Array.isArray(schema) ? schema : schema ? [schema] : [])
    .map((s) => `    <script type="application/ld+json">${jsonLd(s)}</script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="theme-color" content="#0b171f">
  <meta name="color-scheme" content="dark">
  <meta name="author" content="${esc(profile.name)}">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <!-- Open Graph / Twitter -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(profile.name)} — Command Centre">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(site.url)}/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(profile.name)} — ${esc(profile.role)}. ${esc(profile.intro)}">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(site.url)}/assets/img/og-image.png">

  <!-- Icons & manifest -->
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/icon-192.png">
  <link rel="manifest" href="manifest.webmanifest">

  <!-- Styles: fonts first so the display face is discovered early -->
  <link rel="preload" href="assets/fonts/sora-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/css/app.css">

  <!-- Reveal animations are opt-in: without JS everything is visible. -->
  <script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
${schemas}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''} data-dest="${esc(dest)}">
  <div class="app">
${rail(dest)}

    <div class="app-content">
${sysStrip(dest)}
    <main id="main" tabindex="-1">
${body}
    </main>
${sysbar(dest)}
    </div>
  </div>

${dock(dest)}
  <script src="assets/js/site.js" type="module"></script>
</body>
</html>
`;
}

/* ── Small composite helpers ───────────────────────────────────────────── */

/** Section header with micro label, heading and description. */
export function sectionHead({ label, title, desc, aside = '', level = 2, id = '' }) {
  return `      <div class="section-head">
        <p class="section-head__label micro">${esc(label)}</p>
        <h${level}${id ? ` id="${esc(id)}"` : ''}>${esc(title)}</h${level}>
        ${desc ? `<p class="section-head__desc">${esc(desc)}</p>` : ''}
        ${aside ? `<div class="section-head__aside">${aside}</div>` : ''}
      </div>`;
}

/** Designed empty state. Used everywhere information is genuinely unavailable. */
export function emptyState({ type, title, body, fields = [], cta = null, inline = false }) {
  return `      <div class="empty${inline ? ' empty--inline' : ''}">
        ${type ? `<p class="empty__type micro micro--signal">${esc(type)}</p>` : ''}
        <h3>${esc(title)}</h3>
        <p>${esc(body)}</p>
        ${
          fields.length
            ? `<div class="empty__fields">${fields.map((f) => `<span>${esc(f)}</span>`).join('')}</div>`
            : ''
        }
        ${cta ? `<p><a class="link-more" href="${esc(cta.file)}">${esc(cta.label)}</a></p>` : ''}
      </div>`;
}

/** Key/value definition rows. Empty values render an explicit placeholder. */
export function kv(rows) {
  const items = rows
    .map(
      ([k, v]) =>
        `          <dt>${esc(k)}</dt>\n          <dd>${v === null || v === undefined || v === '' ? '<span class="util">NOT PUBLISHED</span>' : v}</dd>`
    )
    .join('\n');
  return `      <dl class="kv">\n${items}\n      </dl>`;
}

export { destinations, secondaryDestinations, allDestinations, site, profile, jsonLd };
