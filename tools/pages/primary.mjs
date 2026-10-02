/**
 * PRIMARY DESTINATIONS
 * ---------------------------------------------------------------------------
 * COMMAND CENTER, STORY MODE, MISSIONS, CASE FILES and the mission detail
 * pages. Each builder returns page markup; documentShell() wraps it.
 */

import { site } from '../../content/site.js';
import { profile } from '../../content/profile.js';
import { destinations, secondaryDestinations } from '../../content/nav.js';
import { focusAreas } from '../../content/focus.js';
import { story } from '../../content/story.js';
import { missions, missionCategories, missionStatuses, missionYears } from '../../content/missions.js';
import { skillIndex } from '../../content/skills.js';
import { tools as allTools } from '../../content/tools.js';
import { learningEntries, currentlyLearning } from '../../content/learning.js';
import {
  esc, icon, badge, chip, levelTag, sectionHead, emptyState, clock, kv, fmtDate
} from '../lib/site-kit.mjs';
import { caseFile, logFile } from '../lib/paths.mjs';

export { caseFile, logFile };

/* Lookup maps keep cross-references fast and safe. */
const toolById = Object.fromEntries(allTools.map((t) => [t.id, t]));
const missionById = Object.fromEntries(missions.map((m) => [m.id, m]));
const entryById = Object.fromEntries(learningEntries.map((e) => [e.id, e]));


/** Skill / tool chips with links into the relevant destination. */
const skillChips = (ids, limit = 6) =>
  ids
    .slice(0, limit)
    .map((id) => {
      const s = skillIndex[id];
      return s
        ? chip(s.name, `skill-tree.html#node-${id}`, 'chip chip--skill')
        : chip(id, null, 'chip chip--skill');
    })
    .join('');

const toolChips = (ids, limit = 6) =>
  ids
    .slice(0, limit)
    .map((id) => {
      const t = toolById[id];
      return t ? chip(t.name, `toolkit.html#tool-${id}`, 'chip chip--tool') : chip(id, null, 'chip chip--tool');
    })
    .join('');

/* ===========================================================================
   01 — COMMAND CENTER
   =========================================================================== */

function focusCard(area, i) {
  const done = area.steps.filter((s) => s.done).length;
  const total = area.steps.length;
  const pct = Math.round((done / total) * 100);
  return `        <article class="focus-card reveal" data-accent="${esc(area.accent)}" style="--rd:${i * 70}ms" aria-labelledby="focus-${esc(area.id)}">
          <div class="focus-card__head">
            <span class="focus-card__index">${esc(area.index)}</span>
            ${badge(area.stage)}
          </div>
          <h3 class="focus-card__title" id="focus-${esc(area.id)}">${esc(area.label)}</h3>
          <p class="focus-card__tagline">${esc(area.tagline)}</p>
          <p class="focus-card__summary">${esc(area.summary)}</p>

          <div class="meter" data-accent="${esc(area.accent)}">
            <div class="meter__track"><div class="meter__fill" style="--meter-value:${pct}%"></div></div>
            <p class="meter__meta">
              <span>Progress <span class="meter__value">${done}/${total}</span> steps</span>
              <span>Updated ${esc(fmtDate(area.updated))}</span>
            </p>
          </div>

          <div class="steps" role="list" aria-label="${esc(area.label)} checklist">
${area.steps
  .map(
    (s) => `            <div class="steps__row" role="listitem" data-done="${s.done}">
              <span class="steps__box" aria-hidden="true"></span>
              <span><span class="visually-hidden">${s.done ? 'Complete: ' : 'Outstanding: '}</span>${esc(s.label)}</span>
            </div>`
  )
  .join('\n')}
          </div>

          <div class="focus-card__foot">
            <p class="util" style="max-width:26ch">NEXT: ${esc(area.next)}</p>
            <span class="cluster">${area.links.map((l) => `<a class="link-more" href="${esc(l.file)}">${esc(l.label)}</a>`).join('')}</span>
          </div>
          <p class="micro" style="color:var(--slate-dim)">Self-assessed — no external measurement claimed</p>
        </article>`;
}

/** Abstract identity slot, used until a real portrait is supplied. */
function portraitSlot() {
  const p = profile.portrait;
  if (p.src) {
    return `        <figure class="portrait">
          <div class="portrait__frame">
            <picture>
              ${p.webp ? `<source srcset="${esc(p.webp)}" type="image/webp">` : ''}
              <img class="portrait__img" src="${esc(p.src)}" width="${esc(p.width)}" height="${esc(p.height)}" alt="${esc(
                p.alt || `${profile.name} — profile image`
              )}" loading="lazy" decoding="async">
            </picture>
          </div>
          <figcaption class="portrait__meta">
            <p class="micro micro--signal">${esc(p.caption)}</p>
            <p class="portrait__note">${esc(p.note)}</p>
          </figcaption>
        </figure>`;
  }
  return `        <figure class="portrait">
          <div class="portrait__frame">
            <div class="portrait__fallback">
              <svg viewBox="0 0 400 500" role="img" aria-label="Identity visual placeholder: a technical frame marked D K, reserved for a future portrait">
                <defs>
                  <linearGradient id="pgx" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#c86a38" stop-opacity="0.28"/>
                    <stop offset="1" stop-color="#c86a38" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <circle cx="200" cy="215" r="118" fill="none" stroke="#e8dbc7" stroke-opacity="0.18"/>
                <circle cx="200" cy="215" r="86" fill="none" stroke="#c86a38" stroke-opacity="0.5" stroke-dasharray="4 6"/>
                <circle cx="200" cy="215" r="150" fill="none" stroke="#e8dbc7" stroke-opacity="0.1" stroke-dasharray="1 10"/>
                <path d="M200 65v300M50 215h300" stroke="#e8dbc7" stroke-opacity="0.12"/>
                <rect x="128" y="171" width="144" height="88" fill="url(#pgx)" stroke="#e8dbc7" stroke-opacity="0.22"/>
                <text x="200" y="232" text-anchor="middle" font-family="Sora, sans-serif" font-size="46" font-weight="800" fill="#e8dbc7" fill-opacity="0.92">DK</text>
                <text x="200" y="392" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" letter-spacing="3" fill="#9ca9ab">IDENTITY SLOT · 4:5</text>
                <text x="200" y="412" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="2" fill="#9ca9ab" fill-opacity="0.7">PORTRAIT NOT SUPPLIED</text>
              </svg>
            </div>
            <div class="portrait__grid" aria-hidden="true"></div>
            <span class="portrait__corner portrait__corner--tl" aria-hidden="true"></span>
            <span class="portrait__corner portrait__corner--br" aria-hidden="true"></span>
            <span class="portrait__badge badge badge--archived">PLACEHOLDER</span>
          </div>
          <figcaption class="portrait__meta">
            <p class="micro micro--signal">${esc(p.caption)}</p>
            <p class="portrait__note">${esc(p.note)} Drop the file into <code>assets/img/profile/</code> and set <code>portrait.src</code> in the profile content file — the frame keeps its 4:5 ratio.</p>
          </figcaption>
        </figure>`;
}

export function commandCenter() {
  const recentLog = [...learningEntries].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  const stats = [
    { label: 'Destinations', value: '08', note: 'All routes live' },
    { label: 'Case files', value: String(missions.length).padStart(2, '0'), note: 'Recorded missions' },
    { label: 'Lab entries', value: String(learningEntries.length).padStart(2, '0'), note: 'Dated log entries' },
    { label: 'Tools in use', value: String(allTools.length), note: 'Status labelled' },
    { label: 'Certificates', value: '00', note: 'None published yet' }
  ];

  const body = `      <div class="page">

        <!-- ── IDENTITY & STATUS ─────────────────────────────────────────── -->
        <section class="hero ticks" aria-labelledby="hero-title">
          <div class="hero__main">
            <div class="hero__top">
              <div class="hero__status">
                <span class="pip" data-state="${esc(profile.availability.state)}"><span class="pip__dot" aria-hidden="true"></span> ${esc(profile.availability.label)}</span>
                ${chip(profile.location, null, 'chip')}
                ${chip(profile.role, null, 'chip')}
              </div>
              <p class="hero__mark" aria-hidden="true">
                <span>${esc(profile.mark.primary)}</span><span class="brand__sep">${esc(profile.mark.separator)}</span><span class="brand__k">${esc(profile.mark.secondary)}</span>
              </p>
            </div>

            <div class="hero__identity">
              <p class="micro hero__profile-label">PLAYER PROFILE: ${esc(profile.name.toUpperCase())}</p>
              <h1 class="hero__tagline" id="hero-title">
${profile.tagline.map((line, i) => `                <span${i === 1 ? ' style="color:var(--sand)"' : ''}>${esc(line)}</span>`).join('\n')}
              </h1>
              <p class="hero__intro">${esc(profile.intro)}</p>
            </div>

            <div class="hero__actions">
              <a class="btn" href="story-mode.html">${icon('story', { size: 14 })} Enter Story Mode</a>
              <a class="btn btn--ghost" href="missions.html">${icon('target', { size: 14 })} Open Missions</a>
              <a class="btn btn--ghost" href="#explore">${icon('grid', { size: 14 })} Explore The System</a>
            </div>
          </div>

          <div class="hero__side">
            <div class="hero__side-block">
              <div class="hero__side-label">
                <span class="micro">${esc(profile.currentMode.label)}</span>
                <span class="signalbars" data-strength="4" role="img" aria-label="Status indicator: active"><i></i><i></i><i></i><i></i></span>
              </div>
              <p class="hero__mode">${esc(profile.currentMode.value)}</p>
              <p class="hero__mode-note">${esc(profile.currentMode.note)}</p>
            </div>

            <div class="hero__side-block">
              <p class="micro">SYSTEM READOUT</p>
              <dl class="hero__readout">
                <div class="readout"><dt>Local time</dt><dd class="is-live">${clock()}</dd></div>
                <div class="readout"><dt>Status</dt><dd>ONLINE</dd></div>
                <div class="readout"><dt>Availability</dt><dd>${esc(profile.availability.label)}</dd></div>
                <div class="readout"><dt>Location</dt><dd>${esc(profile.location.replace(/^BASED IN /, ''))}</dd></div>
                <div class="readout"><dt>Role</dt><dd>${esc(profile.role)}</dd></div>
                <div class="readout"><dt>Version</dt><dd>v${esc(site.version)}</dd></div>
                <div class="readout"><dt>Last updated</dt><dd>${esc(fmtDate(site.buildDate))}</dd></div>
              </dl>
              <p class="util" style="font-size:0.625rem">Time is read from your device — nothing is sent to a server.</p>
            </div>
          </div>
        </section>

        <!-- ── POSITIONING ───────────────────────────────────────────────── -->
        <section class="section" aria-labelledby="positioning-title">
${sectionHead({
  label: '// POSITIONING',
  title: 'What this is — and what it is not',
  desc: profile.summary,
  id: 'positioning-title',
  aside: profile.traits.map((t) => `<span class="badge badge--archived">${esc(t)}</span>`).join('')
})}
          <div class="stat-strip reveal">
${stats
  .map(
    (s) => `            <div class="stat">
              <p class="stat__label">${esc(s.label)}</p>
              <p class="stat__value">${esc(s.value)}</p>
              <p class="stat__note">${esc(s.note)}</p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>

        <!-- ── CURRENT FOCUS ─────────────────────────────────────────────── -->
        <section class="section" aria-labelledby="focus-title">
${sectionHead({
  label: '// CURRENT FOCUS',
  title: 'Three things being worked on right now',
  desc: 'Each module lists its own checklist. Progress counts completed steps only — no percentages are invented, and the state is self-assessed.',
  id: 'focus-title',
  aside: `<span class="badge badge--active">UPDATED ${esc(fmtDate(site.buildDate))}</span>`
})}
          <div class="focus-grid">
${focusAreas.map((a, i) => focusCard(a, i)).join('\n')}
          </div>
        </section>

        <!-- ── COMPANION NOTE + IDENTITY SLOT ────────────────────────────── -->
        <section class="section" aria-labelledby="companion-title">
          <h2 class="visually-hidden" id="companion-title">Companion note and identity visual</h2>
          <div class="companion">
            <div class="companion-note">
              <div class="stack">
                <p class="micro micro--signal">COMPANION NOTE</p>
                <p class="companion-note__quote">“${esc(profile.companionNote)}”</p>
                <p class="measure-tight" style="color:var(--slate)">${esc(profile.availability.note)} A short brief, a question or a project that needs clearer communication — all of it is welcome, and a reply is the default expectation.</p>
              </div>
              <div class="companion-note__meta">
                <div class="hr-label micro">DETAILS</div>
                <dl class="hero__readout">
                  <div class="readout"><dt>Availability</dt><dd>${esc(profile.availability.label)}</dd></div>
                  <div class="readout"><dt>Base</dt><dd>${esc(profile.location.replace(/^BASED IN /, ''))}</dd></div>
                  <div class="readout"><dt>Working hours</dt><dd>FLEXIBLE — IST</dd></div>
                </dl>
                <div class="btn-row">
                  <a class="btn" href="contact.html">${icon('mail', { size: 14 })} Open a channel</a>
                  <a class="btn btn--quiet" href="hq.html">View HQ</a>
                </div>
              </div>
            </div>
${portraitSlot()}
          </div>
        </section>

        <!-- ── EXPLORATION ROUTES ────────────────────────────────────────── -->
        <section class="section" id="explore" aria-labelledby="explore-title">
${sectionHead({
  label: '// EXPLORATION',
  title: 'Routes into the system',
  desc: 'Five connected modules hold the detail: the evidence, the equipment, the notes, the credentials and the channel.',
  id: 'explore-title'
})}
          <div class="routes">
            <a class="route reveal" href="case-files.html" style="--rd:0ms">
              <span class="route__top">${icon('folder', { size: 18 })}<span class="route__meta">FROM MISSIONS</span></span>
              <span class="route__label">CASE FILES</span>
              <span class="route__blurb">Every mission opened up: objective, approach, outcome, lessons.</span>
            </a>
            <a class="route reveal" href="toolkit.html" style="--rd:60ms">
              <span class="route__top">${icon('wrench', { size: 18 })}<span class="route__meta">FROM ARSENAL</span></span>
              <span class="route__label">TOOLKIT</span>
              <span class="route__blurb">The working set of tools, each labelled with an honest familiarity status.</span>
            </a>
            <a class="route reveal" href="learning-log.html" style="--rd:120ms">
              <span class="route__top">${icon('log', { size: 18 })}<span class="route__meta">FROM LEARNING LAB</span></span>
              <span class="route__label">LEARNING LOG</span>
              <span class="route__blurb">Dated entries: what was tried, what did not work, what stuck.</span>
            </a>
            <a class="route reveal" href="certificates.html" style="--rd:180ms">
              <span class="route__top">${icon('certificate', { size: 18 })}<span class="route__meta">FROM ACHIEVEMENTS</span></span>
              <span class="route__label">CERTIFICATES</span>
              <span class="route__blurb">Credential register with verification status. Empty until it is real.</span>
            </a>
            <a class="route reveal" href="contact.html" style="--rd:240ms">
              <span class="route__top">${icon('mail', { size: 18 })}<span class="route__meta">FROM HQ</span></span>
              <span class="route__label">CONTACT</span>
              <span class="route__blurb">A short brief is enough to start a conversation.</span>
            </a>
          </div>
        </section>

        <!-- ── DESTINATION GRID ──────────────────────────────────────────── -->
        <section class="section" aria-labelledby="dest-title">
${sectionHead({
  label: '// SELECT DESTINATION',
  title: 'The full command map',
  desc: 'Eight destinations, one system. Navigation keeps its active state, so you always know where you are.'
  ,
  id: 'dest-title'
})}
          <div class="dest-grid">
${destinationCards('command-center')}
          </div>
        </section>

        <!-- ── LATEST SIGNALS ────────────────────────────────────────────── -->
        <section class="section" aria-labelledby="signals-title">
${sectionHead({
  label: '// LATEST SIGNALS',
  title: 'Most recent log entries',
  desc: 'The learning log is the fastest-moving module. Everything below is dated and traceable.',
  id: 'signals-title',
  aside: `<a class="link-more" href="learning-lab.html">Open the lab</a>`
})}
          <div class="signal-list">
${recentLog
  .map(
    (e) => `            <a class="signal-list__row" href="${logFile(e)}">
              <span class="signal-list__date">${esc(fmtDate(e.date))}</span>
              <span class="signal-list__title">${esc(e.title)}</span>
              <span class="signal-list__cat">${esc(e.category)}</span>
            </a>`
  )
  .join('\n')}
          </div>
        </section>

        <!-- ── CURRENTLY LEARNING ────────────────────────────────────────── -->
        <section class="section" aria-labelledby="learning-title">
${sectionHead({
  label: '// CURRENTLY LEARNING',
  title: currentlyLearning.headline,
  desc: currentlyLearning.intro,
  id: 'learning-title',
  aside: `<span class="badge badge--learn">UPDATED ${esc(fmtDate(currentlyLearning.updated))}</span>`
})}
          <div class="currently-learning">
            <div class="cl-head">
              <p class="micro micro--signal">ACTIVE STUDY QUEUE</p>
              <p class="util">${currentlyLearning.items.length} tracks · reviewed monthly</p>
            </div>
${currentlyLearning.items
  .map(
    (i) => `            <div class="cl-card">
              <p class="cl-card__label">${esc(i.label)}</p>
              <p class="cl-card__detail">${esc(i.detail)}</p>
              <div class="cl-card__progress">${i.progress.map((p) => `<span>${esc(p)}</span>`).join('')}</div>
              <p><a class="link-more" href="${logFile(entryById[i.ref])}">Read entry</a></p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>
      </div>`;

  return body;
}

/**
 * Destination cards, shared by the command centre and the 404 recovery panel.
 * @param {string} current  destination id to mark as active
 * @param {Array}  [list]   override the destination set
 */
export function destinationCards(current, list) {
  const items = list || destinations;
  return items
    .map((d) => {
      const active = d.id === current;
      return `            <a class="dest-card" href="${d.file}" data-dest="${d.id}"${active ? ' aria-current="page"' : ''}>
              <span class="dest-card__top">
                <span class="dest-card__index">${esc(d.index)}</span>
                <span class="dest-card__icon">${icon(d.icon, { size: 20 })}</span>
              </span>
              <span class="dest-card__label">${esc(d.label)}</span>
              <span class="dest-card__blurb">${esc(d.blurb)}</span>
              <span class="dest-card__foot">
                <span class="dest-card__meta">${esc(d.meta)}${active ? ' · YOU ARE HERE' : ''}</span>
                ${icon('arrow', { size: 15 })}
              </span>
            </a>`;
    })
    .join('\n');
}

/** Connected-module cards used on hub pages. */
export function moduleCards(current, list) {
  const items = list || secondaryDestinations;
  return items
    .map(
      (d) => `            <a class="module" href="${d.file}" data-dest="${d.id}"${d.id === current ? ' aria-current="page"' : ''}>
              <span class="module__label"><b>${esc(d.label)}</b><span>${esc(d.meta)}</span></span>
              <span class="module__desc">${esc(d.blurb)}</span>
              <span class="module__label" style="justify-content:flex-start;gap:0.4rem">${icon(d.icon, { size: 14 })}<span>OPEN MODULE</span></span>
            </a>`
    )
    .join('\n');
}

/* ===========================================================================
   02 — STORY MODE
   =========================================================================== */

export function storyMode() {
  const chapters = story.chapters;
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">02</span> ${esc(story.eyebrow)}</p>
          <h1 class="story-headline" id="page-title">
${story.headline.map((l, i) => `            <span${i === 1 ? ' style="color:var(--sand)"' : ''}>${esc(l)}</span>`).join('\n')}
          </h1>
          <p class="lede">${esc(story.lead)}</p>
          <div class="page-head__meta">
            ${badge('ONGOING')}
            ${chip(`${chapters.length} chapters`)}
            ${chip(`Updated ${fmtDate(site.buildDate)}`)}
            ${chip('Self-reported narrative')}
          </div>
        </header>

        <section class="section" aria-labelledby="mindset-title">
          <h2 class="visually-hidden" id="mindset-title">Player mindset</h2>
          <div class="mindset reveal">
            <p class="micro micro--signal">PLAYER MINDSET</p>
            <blockquote>“${esc(profile.mindset)}”</blockquote>
            <div class="trait-row">
${profile.traits.map((t) => `              <span class="badge badge--archived">${esc(t)}</span>`).join('\n')}
            </div>
          </div>
        </section>

        <section class="section" aria-labelledby="path-title">
${sectionHead({
  label: '// PROGRESSION',
  title: 'Follow the path in order',
  desc: 'Six chapters, in the order the skills actually arrived. Jump to any chapter — nothing here depends on an animation finishing.',
  id: 'path-title'
})}
          <div class="split">
            <div class="timeline" id="chapters">
${chapters
  .map(
    (c) => `              <article class="chapter reveal" id="${esc(c.id.toLowerCase())}" aria-labelledby="${esc(c.id.toLowerCase())}-title">
                <div class="chapter__aside">
                  <p class="chapter__id"><span class="chapter__marker" aria-hidden="true"></span>${esc(c.id)}</p>
                  <p class="chapter__period">${esc(c.period)}</p>
                  ${badge(c.state)}
                </div>
                <div class="chapter__main">
                  <p class="chapter__label">${esc(c.label)}</p>
                  <h3 id="${esc(c.id.toLowerCase())}-title">${esc(c.title)}</h3>
                  <div class="chapter__body prose">
${c.body.map((p) => `                    <p>${esc(p)}</p>`).join('\n')}
                  </div>
                  <ul class="takeaways" role="list">
${c.takeaways.map((t) => `                    <li class="takeaway">${esc(t)}</li>`).join('\n')}
                  </ul>
                </div>
              </article>`
  )
  .join('\n')}
            </div>

            <aside class="story-rail" aria-label="Chapter index">
              <nav class="progress-rail" aria-label="Chapters">
${chapters
  .map(
    (c) => `                <a class="progress-rail__row" href="#${esc(c.id.toLowerCase())}">
                  <span class="progress-rail__idx">${esc(c.id)}</span>
                  <span class="progress-rail__label">${esc(c.label)} — ${esc(c.title)}</span>
                  <span class="progress-rail__state">${esc(c.state)}</span>
                </a>`
  )
  .join('\n')}
              </nav>
              <div class="callout callout--info" style="margin-top:1rem">
                <h3>Nothing here is a milestone claim</h3>
                <p>Chapters describe skills being learned, not achievements completed. Dates are deliberately general because a precise timeline would imply a rigour this journey does not have.</p>
              </div>
            </aside>
          </div>
        </section>

        <section class="section" aria-labelledby="next-title">
${sectionHead({
  label: '// HEADING TOWARDS',
  title: 'What the next chapters are about',
  desc: 'Written down so it can be checked later. If this list never changes, something has gone wrong.',
  id: 'next-title'
})}
          <div class="next-grid">
${story.nextSteps
  .map(
    (s) => `            <div class="next-card">
              <p class="next-card__label">${esc(s.label)}</p>
              <p class="next-card__detail">${esc(s.detail)}</p>
            </div>`
  )
  .join('\n')}
          </div>
          <div class="btn-row">
            <a class="btn" href="missions.html">${icon('target', { size: 14 })} See the missions</a>
            <a class="btn btn--ghost" href="case-files.html">${icon('folder', { size: 14 })} Open case files</a>
            <a class="btn btn--ghost" href="hq.html">${icon('hq', { size: 14 })} Profile &amp; contact</a>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   03 — MISSIONS
   =========================================================================== */

/** Shared filter bar for missions / case files / log. */
export function filterBar({ idPrefix, groups, search = true, statusId = 'filter-status' }) {
  const groupMarkup = groups
    .map(
      (g, i) => `            <div class="filter-group" data-filter-group="${esc(g.key)}">
              <p class="filter-group__label" id="${esc(idPrefix)}-${esc(g.key)}-label">${esc(g.label)}</p>
              <div class="filter-group__options" role="group" aria-labelledby="${esc(idPrefix)}-${esc(g.key)}-label">
${g.options
  .map(
    (o) => `                <button class="filter-chip" type="button" data-filter="${esc(g.key)}" data-value="${esc(o.value)}" aria-pressed="${
      o.value === 'ALL' || (g.defaultValue && o.value === g.defaultValue) ? 'true' : 'false'
    }">${esc(o.label)}${o.count !== undefined ? ` <span class="filter-chip__count">${esc(String(o.count).padStart(2, '0'))}</span>` : ''}</button>`
  )
  .join('\n')}
              </div>
            </div>`
    )
    .join('\n');

  return `          <div class="filter-bar" data-filters="${esc(idPrefix)}">
            <div class="filter-row">
${groupMarkup}
              ${
                search
                  ? `<div class="filter-group">
                <label class="filter-group__label" for="${esc(idPrefix)}-search">Search</label>
                <div class="search">
                  ${icon('search', { size: 14 })}
                  <input id="${esc(idPrefix)}-search" type="search" data-filter-search placeholder="Search records…" autocomplete="off" spellcheck="false">
                </div>
              </div>`
                  : ''
              }
            </div>
            <div class="filter-status" id="${esc(statusId)}" role="status" aria-live="polite">
              <p><span class="results-count" data-results-count>0</span> records shown · <span data-results-total>0</span> total</p>
              <button class="filter-chip" type="button" data-filter-reset>Reset filters</button>
            </div>
          </div>`;
}

export function missionsPage() {
  const categoryCounts = Object.fromEntries(missionCategories.map((c) => [c, missions.filter((m) => m.category === c).length]));
  const statusCounts = Object.fromEntries(missionStatuses.map((s) => [s, missions.filter((m) => m.status === s).length]));

  // Skills used across the record, most-used first. Only skills that actually
  // appear are offered, so the filter can never return an empty set.
  const skillUse = {};
  missions.forEach((m) => m.skills.forEach((id) => (skillUse[id] = (skillUse[id] || 0) + 1)));
  const missionSkills = Object.entries(skillUse)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([id, count]) => ({ id, count, label: skillIndex[id]?.name || id }));

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">03</span> MISSION CONTROL</p>
          <h1 id="page-title">Missions &amp; practice briefs</h1>
          <p class="lede">Real work, self-set exercises and course-led experiments. Each mission records its objective, approach and outcome — including what it did not achieve.</p>
          <div class="page-head__meta">
            ${chip(`${missions.length} records`)}
            ${chip('Evidence-led')}
            ${chip('No invented results')}
          </div>
        </header>

        <section class="section" aria-labelledby="policy-title">
          <h2 class="visually-hidden" id="policy-title">How missions are recorded</h2>
          <div class="callout callout--policy reveal">
            <h3>${icon('info', { size: 15 })} Recording rules for this module</h3>
            <ul>
              <li><b>Practice work is labelled.</b> Self-set briefs are marked SPEC BRIEF or LEARNING EXERCISE — never as client work.</li>
              <li><b>No metrics are invented.</b> Where results were not measured, the metrics panel stays empty and says so.</li>
              <li><b>Evidence is optional but explicit.</b> If a link or document exists it is listed; if not, the empty state explains what is missing.</li>
              <li><b>Archived work stays visible.</b> Superseded work is archived rather than deleted, because the gap is the useful part.</li>
            </ul>
          </div>
        </section>

        <section class="section" aria-labelledby="missions-title">
${sectionHead({
  label: '// MISSION INDEX',
  title: 'Filter the record',
  desc: 'Filter by category, status and year, or search across objectives, tools and skills.',
  id: 'missions-title'
})}
${filterBar({
  idPrefix: 'missions',
  groups: [
    { key: 'category', label: 'Category', options: [{ value: 'ALL', label: 'All', count: missions.length }, ...missionCategories.map((c) => ({ value: c, label: c, count: categoryCounts[c] }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...missionStatuses.map((s) => ({ value: s, label: s, count: statusCounts[s] }))] },
    { key: 'year', label: 'Year', options: [{ value: 'ALL', label: 'All' }, ...missionYears.map((y) => ({ value: y, label: y }))] },
    {
      key: 'skill',
      label: 'Skill',
      options: [{ value: 'ALL', label: 'All' }, ...missionSkills.map((s) => ({ value: s.id, label: s.label, count: s.count }))]
    }
  ]
})}

          <div class="mission-grid" data-filter-list>
${missions.map((m) => missionCard(m)).join('\n')}
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING RECORDS',
  title: 'Nothing matches those filters',
  body: 'Try a broader category, clear the search field or reset the filters. The full record is still there.',
  cta: { label: 'Open all case files', file: 'case-files.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="casefiles-title">
${sectionHead({
  label: '// CASE FILES',
  title: 'The evidence room',
  desc: 'Every mission has a case file with the same structure: objective, context, approach, outcome, lessons, skills, tools and evidence status.',
  id: 'casefiles-title'
})}
          <div class="btn-row">
            <a class="btn" href="case-files.html">${icon('folder', { size: 14 })} Open case files</a>
            <a class="btn btn--ghost" href="learning-log.html">${icon('log', { size: 14 })} Read the learning log</a>
          </div>
        </section>
      </div>`;
  return body;
}

export function missionCard(m) {
  const search = [m.title, m.objective, m.description, m.category, m.status, m.date, m.skills.join(' '), m.tools.join(' '), m.briefType]
    .join(' ')
    .toLowerCase();
  return `            <article class="mission-card reveal" data-category="${esc(m.category)}" data-status="${esc(m.status)}" data-year="${esc(m.year)}" data-skill="${esc(m.skills.join(' '))}" data-search="${esc(search)}">
              <div class="mission-card__head">
                <span class="mission-card__id">${esc(m.id)}</span>
                ${badge(m.status)}
              </div>
              <h3 class="mission-card__title"><a href="${caseFile(m)}">${esc(m.title)}</a></h3>
              <p class="mission-card__objective">${esc(m.objective)}</p>
              <p class="mission-card__desc">${esc(m.description)}</p>
              <div class="cluster">${skillChips(m.skills, 3)}${toolChips(m.tools, 3)}</div>
              <div class="mission-card__meta">
                <span>${icon('grid', { size: 12 })}${esc(m.category)}</span>
                <span>${icon('clock', { size: 12 })}${esc(fmtDate(m.date))}</span>
                <span>${icon('info', { size: 12 })}${esc(m.briefType)}</span>
              </div>
              <div class="mission-card__foot">
                <a class="link-more" href="${caseFile(m)}">Open case file</a>
                <span class="micro" style="color:var(--slate-dim)">${m.evidence.length ? 'EVIDENCE LINKED' : 'NO PUBLIC EVIDENCE'}</span>
              </div>
            </article>`;
}

/* ===========================================================================
   CASE FILES (index over the same mission data)
   =========================================================================== */

export function caseFilesPage() {
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">04</span> EVIDENCE ROOM · FROM MISSIONS</p>
          <h1 id="page-title">Case files</h1>
          <p class="lede">The same missions, filed for reference: what the brief was, what was actually attempted, and how it turned out. Each file states plainly what could not be evidenced.</p>
          <div class="page-head__meta">
            ${chip(`${missions.length} files`)}
            ${chip('Linked to MISSION INDEX')}
            ${chip('Structured records')}
          </div>
        </header>

        <section class="section" aria-labelledby="register-title">
${sectionHead({
  label: '// REGISTER',
  title: 'All case files',
  desc: 'Sorted newest first. Status, category and evidence state are shown for each record.',
  id: 'register-title'
})}
${filterBar({
  idPrefix: 'casefiles',
  search: true,
  groups: [
    { key: 'category', label: 'Category', options: [{ value: 'ALL', label: 'All' }, ...missionCategories.map((c) => ({ value: c, label: c }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...missionStatuses.map((s) => ({ value: s, label: s }))] }
  ],
  statusId: 'casefiles-status'
})}

          <div class="table-wrap" tabindex="0" role="region" aria-label="Case file register — scrollable table">
            <table class="data" data-filter-table>
              <caption>Case file register — ${missions.length} records</caption>
              <thead>
                <tr>
                  <th scope="col">Case</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Period</th>
                  <th scope="col">Brief type</th>
                  <th scope="col">Evidence</th>
                </tr>
              </thead>
              <tbody>
${missions
  .map(
    (m) => `                <tr data-category="${esc(m.category)}" data-status="${esc(m.status)}" data-year="${esc(m.year)}" data-skill="${esc(m.skills.join(' '))}" data-search="${esc(
      [m.title, m.objective, m.category, m.status, m.briefType, m.skills.join(' ')].join(' ').toLowerCase()
    )}">
                  <td class="mono">${esc(m.id)}</td>
                  <td><a href="${caseFile(m)}">${esc(m.title)}</a></td>
                  <td class="mono">${esc(m.category)}</td>
                  <td>${badge(m.status)}</td>
                  <td class="mono">${esc(fmtDate(m.date))}</td>
                  <td class="mono">${esc(m.briefType)}</td>
                  <td class="mono">${m.evidence.length ? `${m.evidence.length} linked` : 'Not public'}</td>
                </tr>`
  )
  .join('\n')}
              </tbody>
            </table>
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING FILES',
  title: 'No case files match those filters',
  body: 'Reset the filters to see the complete register.',
  cta: { label: 'Back to missions', file: 'missions.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="evidence-title">
${sectionHead({
  label: '// EVIDENCE POLICY',
  title: 'What “case file” means here',
  desc: 'A case file is a structured record of work, not a promise of a commercial result.',
  id: 'evidence-title'
})}
          <div class="grid grid--auto">
            <div class="panel panel--pad stack">
              <p class="micro micro--signal">WHAT IS RECORDED</p>
              <ul class="bullets">
                <li>Objective, context and the approach actually taken</li>
                <li>Outcome, including limits and things that did not work</li>
                <li>Skills and tools used, linked to the skill tree and toolkit</li>
                <li>Lessons that changed how the next project was handled</li>
              </ul>
            </div>
            <div class="panel panel--pad stack">
              <p class="micro micro--signal">WHAT IS NOT</p>
              <ul class="bullets">
                <li>Invented client names, budgets or revenue figures</li>
                <li>Conversion rates, rankings or traffic that was never measured</li>
                <li>Testimonials from people who have not given them</li>
                <li>Awards, certifications or partnerships that do not exist</li>
              </ul>
            </div>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   MISSION DETAIL (case file)
   =========================================================================== */

export function missionDetail(m) {
  const idx = missions.findIndex((x) => x.id === m.id);
  const prev = missions[idx - 1];
  const next = missions[idx + 1];
  const linkedLogs = (m.linkedLab || []).map((id) => entryById[id]).filter(Boolean);

  const body = `      <div class="page">
        <p><a class="back-link" href="case-files.html">${icon('arrow', { size: 13 })} Back to case files</a></p>

        <header class="case-head">
          <div class="case-head__row">
            <span class="mission-card__id">${esc(m.id)}</span>
            ${badge(m.status)}
            <span class="badge badge--archived badge--bare">${esc(m.briefType)}</span>
          </div>
          <h1 id="page-title">${esc(m.title)}</h1>
          <p class="lede">${esc(m.objective)}</p>
          <div class="cluster">
            ${skillChips(m.skills, 8)}
            ${toolChips(m.tools, 8)}
          </div>
        </header>

        <div class="split split--aside">
          <div class="stack stack--m">
            <section class="section" aria-labelledby="overview-title">
${sectionHead({ label: '// OVERVIEW', title: 'What the brief asked for', id: 'overview-title' })}
              <div class="prose prose--wide">
                <p>${esc(m.description)}</p>
                <p>${esc(m.context)}</p>
              </div>
            </section>

            <section class="section" aria-labelledby="approach-title">
${sectionHead({ label: '// APPROACH', title: 'What was actually done', id: 'approach-title' })}
              <ol class="unordered">
${m.approach.map((a) => `                <li>${esc(a)}</li>`).join('\n')}
              </ol>
            </section>

            <section class="section" aria-labelledby="outcome-title">
${sectionHead({ label: '// OUTCOME', title: 'How it turned out', id: 'outcome-title' })}
              <div class="callout callout--policy">
                <h3>${icon('check', { size: 15 })} Result as recorded</h3>
                <p>${esc(m.outcome)}</p>
              </div>
            </section>

            <section class="section" aria-labelledby="lessons-title">
${sectionHead({ label: '// LESSONS', title: 'What changed afterwards', id: 'lessons-title' })}
              <ul class="bullets bullets--check">
${m.lessons.map((l) => `                <li>${esc(l)}</li>`).join('\n')}
              </ul>
            </section>

            <section class="section" aria-labelledby="metrics-title">
${sectionHead({ label: '// METRICS', title: 'Measured results', desc: 'Nothing is claimed here that was not measured and recorded.', id: 'metrics-title' })}
              ${
                m.metrics.length
                  ? `<dl class="kv">${m.metrics.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`
                  : emptyState({
                      inline: true,
                      type: 'NO METRICS RECORDED',
                      title: 'No performance data was collected for this mission',
                      body:
                        'Either the work was not measured, or the measurement period is too short to mean anything. This panel is deliberately empty rather than filled with an estimate. Add real values in content/missions.js when they exist.',
                      fields: ['File to fill', 'content/missions.js', 'Field: metrics']
                    })
              }
            </section>

            <section class="section" aria-labelledby="evidence-title">
${sectionHead({ label: '// EVIDENCE', title: 'Artefacts & links', id: 'evidence-title' })}
              ${
                m.evidence.length
                  ? `<ul class="bullets">${m.evidence
                      .map((e) => `<li><a href="${esc(e.url)}">${esc(e.label)}</a> — ${esc(e.note || '')}</li>`)
                      .join('')}</ul>`
                  : emptyState({
                      inline: true,
                      type: 'EVIDENCE NOT PUBLISHED',
                      title: 'No public artefact is linked to this file',
                      body:
                        'This does not mean the work did not happen — it means there is nothing publishable yet (no live URL, no client permission, or the work was internal). The slot is ready for a link, screenshot or document.',
                      fields: ['Live URL', 'Screenshot', 'Document', 'Client permission']
                    })
              }
            </section>

            ${
              linkedLogs.length
                ? `<section class="section" aria-labelledby="log-title">
${sectionHead({ label: '// LINKED LOG ENTRIES', title: 'Notes written during this work', id: 'log-title' })}
              <div class="signal-list">
${linkedLogs
  .map(
    (e) => `                <a class="signal-list__row" href="${logFile(e)}">
                  <span class="signal-list__date">${esc(fmtDate(e.date))}</span>
                  <span class="signal-list__title">${esc(e.title)}</span>
                  <span class="signal-list__cat">${esc(e.category)}</span>
                </a>`
  )
  .join('\n')}
              </div>
            </section>`
                : ''
            }
          </div>

          <aside class="stack stack--m" aria-label="Case file metadata">
            <div class="panel">
              <div class="panel__head">
                <span class="panel__index">FILE</span>
                <span class="panel__title">RECORD</span>
              </div>
              <div class="panel__body">
${kv([
  ['Mission ID', esc(m.id)],
  ['Category', esc(m.category)],
  ['Status', badge(m.status)],
  ['Period', esc(fmtDate(m.date))],
  ['Brief type', esc(m.briefType)],
  ['Client', m.client ? esc(m.client) : '<span class="util">NONE — PRACTICE BRIEF</span>'],
  ['Year', esc(m.year)]
])}
                <p class="util" style="margin-top:0.9rem">${esc(m.clientNote)}</p>
              </div>
            </div>

            <div class="panel">
              <div class="panel__head">
                <span class="panel__index">SKILLS &amp; TOOLS</span>
                <span class="panel__title">LINKED</span>
              </div>
              <div class="panel__body stack stack--s">
                <p class="micro">SKILLS USED</p>
                <div class="cluster">${m.skills.map((s) => (skillIndex[s] ? chip(skillIndex[s].name, `skill-tree.html#node-${s}`, 'chip chip--skill') : chip(s, null, 'chip chip--skill'))).join('')}</div>
                <p class="micro" style="margin-top:0.6rem">TOOLS USED</p>
                <div class="cluster">${m.tools.map((t) => (toolById[t] ? chip(toolById[t].name, `toolkit.html#tool-${t}`, 'chip chip--tool') : chip(t, null, 'chip chip--tool'))).join('')}</div>
              </div>
            </div>

            <div class="panel panel--pad stack stack--s">
              <p class="micro micro--signal">NAVIGATE</p>
              <div class="pager" style="border:0;padding:0">
                ${
                  prev
                    ? `<a class="link-more" href="${caseFile(prev)}">Previous: ${esc(prev.id)}</a>`
                    : '<span class="util">First record</span>'
                }
                ${
                  next
                    ? `<a class="link-more" href="${caseFile(next)}">Next: ${esc(next.id)}</a>`
                    : '<span class="util">Latest record</span>'
                }
              </div>
            </div>
          </aside>
        </div>
      </div>`;
  return body;
}

