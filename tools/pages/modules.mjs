/**
 * CONNECTED MODULES
 * ---------------------------------------------------------------------------
 * SKILL TREE, ARSENAL, ACHIEVEMENTS, LEARNING LAB plus the connected views
 * (TOOLKIT, CERTIFICATES, LEARNING LOG), HQ, CONTACT and the 404 screen.
 *
 * Every one of these renders from the same content files as its parent
 * destination — the modules are views, not separate silos.
 */

import { site } from '../../content/site.js';
import { profile } from '../../content/profile.js';
import { missions } from '../../content/missions.js';
import { skillBranches, skillLevels, skillIndex } from '../../content/skills.js';
import { tools as allTools, toolGroups } from '../../content/tools.js';
import { achievements, achievementSlots, verificationPolicy } from '../../content/achievements.js';
import { learningEntries, currentlyLearning, labCategories, labStatuses } from '../../content/learning.js';
import { esc, icon, badge, chip, pips, sectionHead, emptyState, kv, fmtDate, statusVariant } from '../lib/site-kit.mjs';
import { caseFile, logFile } from '../lib/paths.mjs';
import { filterBar, destinationCards } from './primary.mjs';

export { logFile };

const toolById = Object.fromEntries(allTools.map((t) => [t.id, t]));
const entryById = Object.fromEntries(learningEntries.map((e) => [e.id, e]));
const levelRank = (level) => skillLevels.find((l) => l.id === level)?.rank || 1;

/* ===========================================================================
   04 — SKILL TREE
   =========================================================================== */

function skillNode(node, branchId) {
  const search = [node.name, node.summary, node.level, ...(node.tools || []), ...(node.missions || [])].join(' ').toLowerCase();
  return `              <article class="skill-node" id="node-${esc(node.id)}" data-level="${esc(node.level)}" data-branch="${esc(branchId)}" data-search="${esc(search)}">
                <div class="skill-node__top">
                  <h4 class="skill-node__name">${esc(node.name)}</h4>
                  <span class="skill-node__level">
                    ${pips(node.level)}
                    <span class="micro micro--plain">${esc(node.level)}</span>
                  </span>
                </div>
                <p class="skill-node__summary">${esc(node.summary)}</p>
                <div class="skill-node__refs">
                  ${
                    node.tools && node.tools.length
                      ? `<span class="micro">TOOLS</span>${node.tools
                          .map((t) => (toolById[t] ? chip(toolById[t].name, `toolkit.html#tool-${t}`, 'chip chip--tool') : chip(t, null, 'chip chip--tool')))
                          .join('')}`
                      : ''
                  }
                  ${
                    node.missions && node.missions.length
                      ? `<span class="micro" style="margin-left:0.5rem">MISSIONS</span>${node.missions
                          .map((m) => {
                            const mission = missions.find((x) => x.id === m);
                            return mission ? chip(m, caseFile(mission), 'chip') : chip(m, null, 'chip');
                          })
                          .join('')}`
                      : ''
                  }
                </div>
              </article>`;
}

export function skillTreePage() {
  const nodeCount = skillBranches.reduce((n, b) => n + b.nodes.length, 0);
  const levelCounts = Object.fromEntries(skillLevels.map((l) => [l.id, skillBranches.flatMap((b) => b.nodes).filter((n) => n.level === l.id).length]));

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">04</span> PROFICIENCY MAP</p>
          <h1 id="page-title">Skill tree</h1>
          <p class="lede">${skillBranches.length} branches, ${nodeCount} nodes, four honest levels. No percentages — a level here has to be describable, or it is not claimed.</p>
          <div class="page-head__meta">
            ${chip('Self-assessed')}
            ${chip('Updated monthly')}
            ${chip('Linked to missions')}
          </div>
        </header>

        <section class="section" aria-labelledby="levels-title">
${sectionHead({
  label: '// LEVEL SCALE',
  title: 'What each level means',
  desc: 'The definitions do the work. If a node cannot be described by one of these sentences, the level is wrong.',
  id: 'levels-title'
})}
          <div class="level-scale">
${skillLevels
  .map(
    (l) => `            <div class="level-scale__item">
              <div class="level-scale__top">
                <span class="level-scale__name">${esc(l.id)}</span>
                ${pips(l.id)}
              </div>
              <p class="level-scale__desc">${esc(l.description)}</p>
              <p class="micro" style="color:var(--slate-dim)">${levelCounts[l.id]} node${levelCounts[l.id] === 1 ? '' : 's'}</p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>

        <section class="section" aria-labelledby="map-title">
${sectionHead({
  label: '// BRANCH MAP',
  title: 'The tree at a glance',
  desc: 'Eight branches from one practice. Bar length shows the level of each node; the detailed view below repeats the same information in text.',
  id: 'map-title',
  aside: `<span class="badge badge--learn">${nodeCount} NODES</span>`
})}
          <div class="tree-map">
            <div class="tree-map__core">
              <span class="tree-map__core-mark">DEV.K</span>
              <span class="micro">PRACTICE CORE · ${esc(profile.currentMode.value)}</span>
            </div>
            <div class="tree-map__trunk" aria-hidden="true"></div>
            <div class="tree-map__branches">
${skillBranches
  .map(
    (b) => `              <a class="tree-map__branch" href="#branch-${esc(b.id)}">
                <span class="tree-map__branch-top">
                  <span class="tree-map__branch-label">${esc(b.label)}</span>
                  <span class="tree-map__node-lvl">${esc(b.index)}</span>
                </span>
                <span class="tree-map__nodes">
${b.nodes
  .map(
    (n) => `                  <span class="tree-map__node">
                    <span class="tree-map__node-bar" data-level="${levelRank(n.level)}" style="width:${levelRank(n.level) * 25}%"></span>
                    <span>${esc(n.name)}</span>
                    <span class="tree-map__node-lvl">${levelRank(n.level)}/4</span>
                  </span>`
  )
  .join('\n')}
                </span>
              </a>`
  )
  .join('\n')}
            </div>
            <div class="tree-map__legend">
${skillLevels.map((l) => `              <span class="micro micro--plain">${pips(l.id)} ${esc(l.id)}</span>`).join('\n')}
            </div>
          </div>
        </section>

        <section class="section" aria-labelledby="branches-title">
${sectionHead({
  label: '// BRANCHES',
  title: 'Open a branch',
  desc: 'Each node lists what it actually involves, the tools used and the missions it appears in. Branches collapse on small screens instead of forcing a wide diagram.',
  id: 'branches-title'
})}
${filterBar({
  idPrefix: 'skills',
  search: true,
  groups: [
    {
      key: 'level',
      label: 'Level',
      options: [{ value: 'ALL', label: 'All' }, ...skillLevels.map((l) => ({ value: l.id, label: l.id, count: levelCounts[l.id] }))]
    }
  ],
  statusId: 'skills-status'
})}

          <div class="branch-list" data-filter-list data-filter-nodes>
${skillBranches
  .map(
    (b, i) => `            <details class="branch" id="branch-${esc(b.id)}"${i === 0 ? ' open' : ''}>
              <summary class="branch__summary">
                <span class="branch__index">${esc(b.index)}</span>
                <span class="branch__title">
                  <h3 class="branch__label" id="branch-${esc(b.id)}-title">${esc(b.label)}</h3>
                  <span class="branch__summary-desc">${esc(b.summary)}</span>
                </span>
                <span class="branch__toggle">
                  <span>${b.nodes.length} nodes</span>
                  ${icon('chevron', { size: 12, cls: 'branch__chevron' })}
                </span>
              </summary>
              <div class="branch__body">
                <div class="branch__meta">
                  <span class="badge badge--archived badge--bare">${esc(b.status)}</span>
                  ${b.nodes.map((n) => `<span class="badge badge--${statusVariant(n.level)} badge--bare" style="font-size:0.5rem">${esc(n.level)}</span>`).slice(0, 1).join('')}
                </div>
${b.nodes.map((n) => skillNode(n, b.id)).join('\n')}
              </div>
            </details>`
  )
  .join('\n')}
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING NODES',
  title: 'No skill nodes match that filter',
  body: 'Reset the filters, or search for a skill by name, tool or level.',
  cta: { label: 'Back to missions', file: 'missions.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="assessment-title">
${sectionHead({ label: '// METHOD', title: 'How levels are assessed', id: 'assessment-title' })}
          <div class="grid grid--auto">
            <div class="callout callout--info">
              <h3>${icon('info', { size: 15 })} Self-assessed, and labelled as such</h3>
              <p>These levels are my own assessment against the definitions above. There is no external audit, no test score and no certificate behind them — and the interface says so rather than implying otherwise.</p>
            </div>
            <div class="callout callout--policy">
              <h3>${icon('check', { size: 15 })} What would change a level</h3>
              <p>A level moves when the work changes: completing a real brief at that standard, using the skill unaided under a deadline, or being able to explain the decision to someone else. Time spent on a course does not move a level on its own.</p>
            </div>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   05 — ARSENAL
   =========================================================================== */

function toolCard(t) {
  const search = [t.name, t.group, t.status, t.usage, t.note || '', ...(t.skills || [])].join(' ').toLowerCase();
  return `              <article class="tool-card" id="tool-${esc(t.id)}" data-group="${esc(t.group)}" data-status="${esc(t.status)}" data-search="${esc(search)}">
                <div class="tool-card__top">
                  <span class="tool-card__mono" aria-hidden="true">${esc(t.monogram)}</span>
                  <span>
                    <h3 class="tool-card__name">${esc(t.name)}</h3>
                    <p class="tool-card__group">${esc(toolGroups.find((g) => g.id === t.group)?.label || t.group)}</p>
                  </span>
                </div>
                ${badge(t.status)}
                <p class="tool-card__usage">${esc(t.usage)}</p>
                ${t.note ? `<p class="tool-card__note">${esc(t.note)}</p>` : ''}
                <div class="tool-card__foot">
                  <span class="cluster">
                    ${(t.skills || [])
                      .slice(0, 3)
                      .map((s) => (skillIndex[s] ? chip(skillIndex[s].name, `skill-tree.html#node-${s}`, 'chip chip--skill') : ''))
                      .join('')}
                  </span>
                </div>
              </article>`;
}

const statusCounts = () => Object.fromEntries(['REGULAR USE', 'WORKING KNOWLEDGE', 'LEARNING', 'EXPERIMENTING'].map((s) => [s, allTools.filter((t) => t.status === s).length]));

export function arsenalPage() {
  const counts = statusCounts();
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">05</span> EQUIPMENT</p>
          <h1 id="page-title">Arsenal</h1>
          <p class="lede">The working set of tools, grouped by discipline. Every entry carries a familiarity status, because owning a licence is not the same as being able to use it well.</p>
          <div class="page-head__meta">
            ${chip(`${allTools.length} tools`)}
            ${chip(`${toolGroups.length} groups`)}
            ${chip('Status on every entry')}
          </div>
        </header>

        <section class="section" aria-labelledby="status-title">
${sectionHead({
  label: '// STATUS KEY',
  title: 'How familiarity is labelled',
  desc: 'Four states. Nothing here claims mastery, certification or years of use — only how the tool is actually being used right now.',
  id: 'status-title'
})}
          <div class="level-scale">
${[
  ['REGULAR USE', 'In the workflow most weeks. Productive but still learning the edges.'],
  ['WORKING KNOWLEDGE', 'Can be relied on for a real deliverable without help.'],
  ['LEARNING', 'Following a course or documentation to get properly oriented.'],
  ['EXPERIMENTING', 'Used on small personal tests to work out where it fits.']
]
  .map(
    ([label, desc]) => `            <div class="level-scale__item">
              <div class="level-scale__top">
                <span class="level-scale__name" style="font-size:0.75rem">${esc(label)}</span>
                <span class="micro" style="color:var(--slate-dim)">${counts[label]}</span>
              </div>
              <p class="level-scale__desc">${esc(desc)}</p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>

        <section class="section" aria-labelledby="tools-title">
${sectionHead({
  label: '// TOOL INDEX',
  title: 'Filter the equipment list',
  desc: 'Filter by discipline or status, or search across usage notes.',
  id: 'tools-title'
})}
${filterBar({
  idPrefix: 'arsenal',
  search: true,
  groups: [
    { key: 'group', label: 'Discipline', options: [{ value: 'ALL', label: 'All', count: allTools.length }, ...toolGroups.map((g) => ({ value: g.id, label: g.label, count: allTools.filter((t) => t.group === g.id).length }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...Object.keys(counts).map((s) => ({ value: s, label: s, count: counts[s] }))] }
  ],
  statusId: 'arsenal-status'
})}

          <div data-filter-list>
${toolGroups
  .map(
    (g) => {
      const list = allTools.filter((t) => t.group === g.id);
      if (!list.length) return '';
      return `            <section class="tool-group" id="group-${esc(g.id)}" aria-labelledby="group-${esc(g.id)}-title">
              <div class="row-between">
                <h3 id="group-${esc(g.id)}-title" class="branch__label">${icon(g.icon, { size: 15 })} ${esc(g.label)}</h3>
                <p class="util">${esc(g.summary)} · ${list.length} tools</p>
              </div>
              <div class="tool-grid">
${list.map((t) => toolCard(t)).join('\n')}
              </div>
            </section>`;
    }
  )
  .join('\n')}
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING TOOLS',
  title: 'No tools match those filters',
  body: 'Reset the filters to see the full equipment list.',
  cta: { label: 'Open the toolkit view', file: 'toolkit.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="arsenal-note-title">
${sectionHead({ label: '// NOTE', title: 'On listing tools at all', id: 'arsenal-note-title' })}
          <div class="callout callout--info">
            <h3>${icon('info', { size: 15 })} A tool list is not a skill list</h3>
            <p>A long list of software proves very little. Tools appear here because they are genuinely in use or being learned, and each one states how. If a tool is dropped from the workflow, it leaves the list rather than lingering as decoration.</p>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   TOOLKIT (connected view of ARSENAL)
   =========================================================================== */

export function toolkitPage() {
  const counts = statusCounts();
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">05b</span> LOADOUT · FROM ARSENAL</p>
          <h1 id="page-title">Toolkit</h1>
          <p class="lede">The same equipment, filed as a working loadout: what each tool is for, how well it is known, and which skills depend on it. Compact view for quick reference.</p>
          <div class="page-head__meta">
            ${chip(`${allTools.length} tools`)}
            ${chip(`${toolGroups.length} disciplines`)}
            ${chip('Status labelled')}
          </div>
        </header>

        <section class="section" aria-labelledby="loadout-title">
${sectionHead({
  label: '// LOADOUT',
  title: 'Equipment by discipline',
  desc: 'Sorted by how central each tool is to current work.',
  id: 'loadout-title'
})}
${filterBar({
  idPrefix: 'toolkit',
  search: true,
  groups: [
    { key: 'group', label: 'Discipline', options: [{ value: 'ALL', label: 'All', count: allTools.length }, ...toolGroups.map((g) => ({ value: g.id, label: g.label, count: allTools.filter((t) => t.group === g.id).length }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...Object.keys(counts).map((s) => ({ value: s, label: s, count: counts[s] }))] }
  ],
  statusId: 'toolkit-status'
})}

          <div class="table-wrap" tabindex="0" role="region" aria-label="Toolkit register — scrollable table">
            <table class="data" data-filter-table>
              <caption>Toolkit register — ${allTools.length} tools across ${toolGroups.length} disciplines</caption>
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Discipline</th>
                  <th scope="col">Status</th>
                  <th scope="col">Used for</th>
                  <th scope="col">Related skills</th>
                </tr>
              </thead>
              <tbody>
${allTools
  .map(
    (t) => `                <tr data-group="${esc(t.group)}" data-status="${esc(t.status)}" data-search="${esc(
      [t.name, t.usage, t.status, t.group].join(' ').toLowerCase()
    )}">
                  <td><a href="arsenal.html#tool-${esc(t.id)}">${esc(t.name)}</a></td>
                  <td class="mono">${esc(toolGroups.find((g) => g.id === t.group)?.label || t.group)}</td>
                  <td>${badge(t.status)}</td>
                  <td>${esc(t.usage)}</td>
                  <td class="mono">${(t.skills || []).map((s) => skillIndex[s]?.name || s).slice(0, 3).join(' · ')}</td>
                </tr>`
  )
  .join('\n')}
              </tbody>
            </table>
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING TOOLS',
  title: 'Nothing in the loadout matches',
  body: 'Reset the filters to see every tool.',
  cta: { label: 'Open the arsenal', file: 'arsenal.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="toolkit-plan-title">
${sectionHead({ label: '// QUEUE', title: 'What is being added next', id: 'toolkit-plan-title' })}
          <div class="grid grid--auto">
${[
  ['Advanced Figma systems', 'Component libraries and variables — enough to hand a file to another designer.'],
  ['Looker Studio reporting', 'One page that answers three recurring questions without opening GA4.'],
  ['Screaming Frog beyond the basics', 'Log-file insight, not just broken links.'],
  ['Premiere audio workflow', 'Cleaner voice tracks without a studio setup.']
]
  .map(
    ([label, detail]) => `            <div class="callout callout--info">
              <h3>${icon('plus', { size: 15 })}${esc(label)}</h3>
              <p>${esc(detail)}</p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   06 — ACHIEVEMENTS
   =========================================================================== */

function achievementCard(a) {
  const status = a.verification.status;
  return `            <article class="ach-card${status === 'REFERENCED' ? ' ach-card--verified' : ''} reveal">
              <div class="ach-card__type">
                <span class="badge badge--archived badge--bare">${esc(a.type)}</span>
                ${badge(status)}
              </div>
              <h3>${esc(a.title)}</h3>
              <p class="ach-card__issuer">${esc(a.issuer)} · ${esc(a.issuerKind)} · ${esc(fmtDate(a.date))}</p>
              <p class="ach-card__summary">${esc(a.summary)}</p>
              <dl class="ach-verify">
                <dt>Verification method</dt>
                <dd>${esc(a.verification.method)}</dd>
                <dt>Reference</dt>
                <dd>${esc(a.verification.reference)}</dd>
                <dt>Note</dt>
                <dd>${esc(a.verification.note)}</dd>
              </dl>
              <div class="mission-card__foot">
                ${
                  a.credential
                    ? a.credential.external
                      ? `<a class="link-more" href="${esc(a.credential.url)}" rel="noopener">${esc(a.credential.label)}</a>`
                      : `<a class="link-more" href="${esc(a.credential.url)}">${esc(a.credential.label)}</a>`
                    : `<span class="util">Credential link not published</span>`
                }
                <span class="cluster">${(a.relatedMissions || [])
                  .map((id) => {
                    const m = missions.find((x) => x.id === id);
                    return m ? chip(id, caseFile(m), 'chip') : '';
                  })
                  .join('')}</span>
              </div>
            </article>`;
}

export function achievementsPage() {
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">06</span> RECORD</p>
          <h1 id="page-title">Achievements</h1>
          <p class="lede">What can be evidenced, kept separate from what has not been earned yet. Unlocked entries are milestones that exist; locked slots are honest placeholders waiting for real ones.</p>
          <div class="page-head__meta">
            ${chip(`${achievements.length} verified entries`)}
            ${chip(`${achievementSlots.length} open slots`)}
            ${chip('No invented awards')}
          </div>
        </header>

        <section class="section" aria-labelledby="policy-title">
${sectionHead({
  label: '// POLICY',
  title: verificationPolicy.title,
  desc: verificationPolicy.body,
  id: 'policy-title'
})}
          <div class="level-scale">
${verificationPolicy.levels
  .map(
    (l) => `            <div class="level-scale__item">
              <div class="level-scale__top">
                <span class="level-scale__name" style="font-size:0.75rem">${esc(l.id)}</span>
                ${badge(l.id)}
              </div>
              <p class="level-scale__desc">${esc(l.description)}</p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>

        <section class="section" aria-labelledby="unlocked-title">
${sectionHead({
  label: '// UNLOCKED',
  title: 'Recorded milestones',
  desc: 'Project milestones and published artefacts that exist and can be inspected.',
  id: 'unlocked-title'
})}
          <div class="grid grid--wide">
${achievements.map((a) => achievementCard(a)).join('\n')}
          </div>
        </section>

        <section class="section" aria-labelledby="slots-title">
${sectionHead({
  label: '// OPEN SLOTS',
  title: 'Not earned yet — and shown as such',
  desc: 'These panels stay empty until there is something real to put in them. Each one lists the exact fields needed, so filling it later is a five-minute job.',
  id: 'slots-title'
})}
          <div class="grid grid--wide">
${achievementSlots
  .map(
    (s) => `            <div class="empty reveal">
              <p class="empty__type micro micro--signal">${icon('award', { size: 13 })} ${esc(s.type)} — LOCKED</p>
              <h3>${esc(s.title)}</h3>
              <p>${esc(s.body)}</p>
              <div class="empty__fields">${s.fields.map((f) => `<span>${esc(f)}</span>`).join('')}</div>
              <p><a class="link-more" href="${esc(s.cta.file)}">${esc(s.cta.label)}</a></p>
            </div>`
  )
  .join('\n')}
          </div>
        </section>

        <section class="section" aria-labelledby="next-unlock-title">
${sectionHead({ label: '// NEXT', title: 'What the next unlock looks like', id: 'next-unlock-title' })}
          <div class="grid grid--auto">
            <div class="callout callout--info">
              <h3>${icon('certificate', { size: 15 })} First certificate</h3>
              <p>Most likely from a search or analytics fundamentals course. It gets listed with the issuer, the completion date and a credential URL — or not listed at all.</p>
            </div>
            <div class="callout callout--info">
              <h3>${icon('pen', { size: 15 })} First published piece</h3>
              <p>When a written piece appears on a public domain, it is indexed here with the publication and date.</p>
            </div>
            <div class="callout callout--info">
              <h3>${icon('target', { size: 15 })} First commissioned project</h3>
              <p>A paid or formally commissioned engagement, listed with scope and the client's permission — never assumed.</p>
            </div>
          </div>
          <div class="btn-row">
            <a class="btn btn--ghost" href="certificates.html">${icon('certificate', { size: 14 })} Certificate register</a>
            <a class="btn btn--ghost" href="learning-log.html">${icon('log', { size: 14 })} Learning log</a>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   CERTIFICATES (connected view of ACHIEVEMENTS)
   =========================================================================== */

export function certificatesPage() {
  const certificates = achievements.filter((a) => a.type === 'CERTIFICATE');
  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">06b</span> CREDENTIALS · FROM ACHIEVEMENTS</p>
          <h1 id="page-title">Certificates</h1>
          <p class="lede">A credential register. It is empty on purpose: nothing is listed here until a certificate is completed <em>and</em> a verification link exists.</p>
          <div class="page-head__meta">
            ${chip(`${certificates.length} published`)}
            ${chip('Verification required')}
            ${chip('No placeholders passed off as real')}
          </div>
        </header>

        <section class="section" aria-labelledby="register-title">
${sectionHead({
  label: '// REGISTER',
  title: 'Published credentials',
  desc: 'Each row carries the issuer, completion date, verification method and a link where one exists.',
  id: 'register-title'
})}
          ${
            certificates.length
              ? `<div class="table-wrap" tabindex="0" role="region" aria-label="Certificate register — scrollable table">
            <table class="data">
              <caption>Certificate register — ${certificates.length} published</caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Issuer</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Verification</th>
                  <th scope="col">Credential</th>
                </tr>
              </thead>
              <tbody>
${certificates
  .map(
    (c) => `                <tr>
                  <td>${esc(c.title)}</td>
                  <td>${esc(c.issuer)}</td>
                  <td class="mono">${esc(fmtDate(c.date))}</td>
                  <td>${badge(c.verification.status)}</td>
                  <td>${c.credential ? `<a href="${esc(c.credential.url)}">${esc(c.credential.label)}</a>` : '<span class="util">Not published</span>'}</td>
                </tr>`
  )
  .join('\n')}
              </tbody>
            </table>
          </div>`
              : `          <div class="table-wrap" tabindex="0" role="region" aria-label="Certificate register — scrollable table">
            <table class="data">
              <caption>Certificate register — 0 published</caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Issuer</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Verification</th>
                  <th scope="col">Credential</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="5">
                    <p class="util">No rows. Certificates in progress are not listed as completed.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
${emptyState({
  type: 'REGISTER EMPTY',
  title: 'No certificates published',
  body:
    'Coursework in progress stays out of this register. When a certificate is finished and a verification link exists, it appears here with the issuer, the completion date and the credential URL. Until then, the honest display is an empty table.',
  fields: ['Title', 'Issuing organisation', 'Completion date', 'Credential URL', 'Verification status'],
  cta: { label: 'See the achievements record', file: 'achievements.html' }
})}`
          }
        </section>

        <section class="section" aria-labelledby="rules-title">
${sectionHead({ label: '// RULES', title: 'What qualifies for this register', id: 'rules-title' })}
          <div class="grid grid--auto">
            <div class="callout callout--policy">
              <h3>${icon('check', { size: 15 })} Listed</h3>
              <ul>
                <li>Completed courses with a verifiable certificate or credential URL</li>
                <li>Formal programmes with an issuer who can confirm completion</li>
                <li>Credentials marked <b>REFERENCED</b> or <b>PENDING</b> with the reason stated</li>
              </ul>
            </div>
            <div class="callout callout--caution">
              <h3>${icon('warn', { size: 15 })} Not listed</h3>
              <ul>
                <li>Courses started but not finished</li>
                <li>Self-study, tutorials and reading (those live in the Learning Lab)</li>
                <li>Anything without an issuer or a way to verify completion</li>
              </ul>
            </div>
          </div>
          <div class="callout callout--info">
            <h3>${icon('info', { size: 15 })} How to add one</h3>
            <p>Add an object to the <code>achievements</code> array in <code>content/achievements.js</code> with <code>type: 'CERTIFICATE'</code>, the issuer, the date, a credential object and <code>verification.status</code>. It will appear here and in achievements automatically — no component changes required.</p>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   07 — LEARNING LAB
   =========================================================================== */

const logSearch = (e) =>
  [e.title, e.summary, e.category, e.status, ...(e.tags || [])].join(' ').toLowerCase();

function logCard(e) {
  return `            <article class="log-entry reveal" data-category="${esc(e.category)}" data-status="${esc(e.status)}" data-search="${esc(logSearch(e))}">
              <div class="log-entry__top">
                <span class="log-entry__date">${esc(fmtDate(e.date))}</span>
                ${badge(e.status)}
              </div>
              <h3><a href="${logFile(e)}">${esc(e.title)}</a></h3>
              <p class="log-entry__summary">${esc(e.summary)}</p>
              <div class="log-entry__foot">
                <span class="cluster">
                  <span class="badge badge--archived badge--bare">${esc(e.category)}</span>
                  ${(e.tags || []).slice(0, 2).map((t) => `<span class="chip">${esc(t)}</span>`).join('')}
                </span>
                <a class="link-more" href="${logFile(e)}">Read entry</a>
              </div>
            </article>`;
}

export function learningLabPage() {
  const catCounts = Object.fromEntries(labCategories.filter((c) => c !== 'ALL').map((c) => [c, learningEntries.filter((e) => e.category === c).length]));
  const statusCountsLab = Object.fromEntries(labStatuses.map((s) => [s, learningEntries.filter((e) => e.status === s).length]));

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">07</span> R&amp;D</p>
          <h1 id="page-title">Learning lab</h1>
          <p class="lede">${learningEntries.length} dated entries from an ongoing process: tests, notes, research questions and things that failed informatively. The point is visible progress, not a finished résumé.</p>
          <div class="page-head__meta">
            ${chip(`${learningEntries.length} entries`)}
            ${chip(`${labCategories.length - 1} categories`)}
            ${chip('Updated continuously')}
          </div>
        </header>

        <section class="section" aria-labelledby="current-title">
${sectionHead({
  label: '// ' + currentlyLearning.headline,
  title: 'Open on the desk right now',
  desc: currentlyLearning.intro,
  id: 'current-title',
  aside: `<span class="badge badge--learn">UPDATED ${esc(fmtDate(currentlyLearning.updated))}</span>`
})}
          <div class="currently-learning">
            <div class="cl-head">
              <p class="micro micro--signal">ACTIVE STUDY QUEUE</p>
              <p class="util">Edit in content/learning.js → currentlyLearning</p>
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

        <section class="section" aria-labelledby="entries-title">
${sectionHead({
  label: '// ENTRIES',
  title: 'Filter the lab',
  desc: 'Every entry is a real note with a date. Categories describe the discipline; status describes how far the thinking got.',
  id: 'entries-title'
})}
${filterBar({
  idPrefix: 'lab',
  search: true,
  groups: [
    { key: 'category', label: 'Category', options: [{ value: 'ALL', label: 'All', count: learningEntries.length }, ...labCategories.filter((c) => c !== 'ALL').map((c) => ({ value: c, label: c, count: catCounts[c] }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...labStatuses.map((s) => ({ value: s, label: s, count: statusCountsLab[s] }))] }
  ],
  statusId: 'lab-status'
})}

          <div class="log-grid" data-filter-list>
${[...learningEntries].sort((a, b) => (a.date < b.date ? 1 : -1)).map((e) => logCard(e)).join('\n')}
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING ENTRIES',
  title: 'No entries match those filters',
  body: 'Try another category, clear the search box or reset the filters.',
  cta: { label: 'Open the learning log table', file: 'learning-log.html' }
})}
          </div>
        </section>

        <section class="section" aria-labelledby="method-title">
${sectionHead({ label: '// METHOD', title: 'How entries are written', id: 'method-title' })}
          <div class="grid grid--auto">
            <div class="callout callout--info">
              <h3>${icon('log', { size: 15 })} Each entry records</h3>
              <ul>
                <li>What was actually tried, with a date</li>
                <li>What was found — including what did not work</li>
                <li>What it changed in the next attempt</li>
              </ul>
            </div>
            <div class="callout callout--caution">
              <h3>${icon('warn', { size: 15 })} What entries avoid</h3>
              <ul>
                <li>Rewriting history after a better result appeared</li>
                <li>Turning a small test into a case study</li>
                <li>Presenting reading as experience</li>
              </ul>
            </div>
          </div>
        </section>
      </div>`;
  return body;
}

/* ===========================================================================
   LEARNING LOG (tabular view of the lab)
   =========================================================================== */

export function learningLogPage() {
  const catCounts = Object.fromEntries(labCategories.filter((c) => c !== 'ALL').map((c) => [c, learningEntries.filter((e) => e.category === c).length]));
  const sorted = [...learningEntries].sort((a, b) => (a.date < b.date ? 1 : -1));

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">07b</span> LOG · FROM LEARNING LAB</p>
          <h1 id="page-title">Learning log</h1>
          <p class="lede">The lab as a single dated table: ${learningEntries.length} entries in reverse chronological order. Filters and search work exactly as they do in the lab view.</p>
          <div class="page-head__meta">
            ${chip(`${learningEntries.length} entries`)}
            ${chip('Reverse chronological')}
            ${chip('Same data as the lab')}
          </div>
        </header>

        <section class="section" aria-labelledby="log-title">
${sectionHead({
  label: '// FULL LOG',
  title: 'Every entry, dated',
  desc: 'Scroll horizontally on small screens — this is a data table and keeps its column structure rather than collapsing.',
  id: 'log-title'
})}
${filterBar({
  idPrefix: 'log',
  search: true,
  groups: [
    { key: 'category', label: 'Category', options: [{ value: 'ALL', label: 'All', count: learningEntries.length }, ...labCategories.filter((c) => c !== 'ALL').map((c) => ({ value: c, label: c, count: catCounts[c] }))] },
    { key: 'status', label: 'Status', options: [{ value: 'ALL', label: 'All' }, ...labStatuses.filter((s) => learningEntries.some((e) => e.status === s)).map((s) => ({ value: s, label: s }))] }
  ],
  statusId: 'log-status'
})}
          <div class="table-wrap" tabindex="0" role="region" aria-label="Toolkit register — scrollable table">
            <table class="data" data-filter-table>
              <caption>Learning log — ${learningEntries.length} entries, newest first</caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Entry</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Related</th>
                </tr>
              </thead>
              <tbody>
${sorted
  .map(
    (e) => `                <tr data-category="${esc(e.category)}" data-status="${esc(e.status)}" data-year="${esc(e.date.slice(0, 4))}" data-search="${esc(logSearch(e))}">
                  <td class="mono">${esc(fmtDate(e.date))}</td>
                  <td><a href="${logFile(e)}">${esc(e.title)}</a><br><span class="util" style="font-size:0.75rem">${esc(e.summary.slice(0, 96))}…</span></td>
                  <td class="mono">${esc(e.category)}</td>
                  <td>${badge(e.status)}</td>
                  <td class="mono">${(e.missions || []).map((m) => m).join(' · ') || '—'}</td>
                </tr>`
  )
  .join('\n')}
              </tbody>
            </table>
          </div>

          <div data-filter-empty hidden>
${emptyState({
  type: 'NO MATCHING ENTRIES',
  title: 'No log entries match',
  body: 'Reset the filters to restore the full log.',
  cta: { label: 'Back to the lab', file: 'learning-lab.html' }
})}
          </div>
        </section>
      </div>`;
  return body;
}

/* ── Log entry detail ─────────────────────────────────────────────────── */

export function logDetail(e) {
  const idx = learningEntries.findIndex((x) => x.id === e.id);
  const prev = learningEntries[idx - 1];
  const next = learningEntries[idx + 1];
  const related = (e.missions || []).map((id) => missions.find((m) => m.id === id)).filter(Boolean);

  const body = `      <div class="page">
        <p><a class="back-link" href="learning-log.html">${icon('arrow', { size: 13 })} Back to the learning log</a></p>

        <header class="case-head">
          <div class="case-head__row">
            <span class="mission-card__id">${esc(e.id.toUpperCase())}</span>
            ${badge(e.status)}
            <span class="badge badge--archived badge--bare">${esc(e.category)}</span>
            <span class="micro">${esc(fmtDate(e.date))}</span>
          </div>
          <h1 id="page-title">${esc(e.title)}</h1>
          <p class="lede">${esc(e.summary)}</p>
        </header>

        <div class="split split--aside">
          <div class="stack stack--m">
            <section class="section" aria-labelledby="entry-title">
${sectionHead({ label: '// ENTRY', title: 'What happened', id: 'entry-title' })}
              <div class="prose prose--wide">
${e.body.map((p) => `                <p>${esc(p)}</p>`).join('\n')}
              </div>
            </section>

            <section class="section" aria-labelledby="findings-title">
${sectionHead({ label: '// FINDINGS', title: 'What was learned', id: 'findings-title' })}
              <ul class="bullets bullets--check">
${e.findings.map((f) => `                <li>${esc(f)}</li>`).join('\n')}
              </ul>
            </section>

            <section class="section" aria-labelledby="next-title">
${sectionHead({ label: '// NEXT', title: 'What happens next', id: 'next-title' })}
              <div class="callout callout--info">
                <h3>${icon('arrow', { size: 15 })} Follow-up</h3>
                <p>${esc(e.next)}</p>
              </div>
            </section>
          </div>

          <aside class="stack stack--m" aria-label="Entry metadata">
            <div class="panel">
              <div class="panel__head"><span class="panel__index">ENTRY</span><span class="panel__title">RECORD</span></div>
              <div class="panel__body">
${kv([
  ['Entry ID', esc(e.id.toUpperCase())],
  ['Date', esc(fmtDate(e.date))],
  ['Category', esc(e.category)],
  ['Status', badge(e.status)],
  ['Tags', (e.tags || []).map((t) => esc(t)).join(', ') || null]
])}
              </div>
            </div>

            <div class="panel">
              <div class="panel__head"><span class="panel__index">LINKS</span><span class="panel__title">CONNECTED</span></div>
              <div class="panel__body stack stack--s">
                <p class="micro">SKILLS</p>
                <div class="cluster">${(e.skills || []).map((s) => (skillIndex[s] ? chip(skillIndex[s].name, `skill-tree.html#node-${s}`, 'chip chip--skill') : chip(s, null, 'chip chip--skill'))).join('')}</div>
                <p class="micro" style="margin-top:0.6rem">TOOLS</p>
                <div class="cluster">${(e.tools || []).map((t) => (toolById[t] ? chip(toolById[t].name, `toolkit.html#tool-${t}`, 'chip chip--tool') : chip(t, null, 'chip chip--tool'))).join('')}</div>
                ${
                  related.length
                    ? `<p class="micro" style="margin-top:0.6rem">MISSIONS</p><div class="cluster">${related
                        .map((m) => chip(`${m.id} ${m.title}`, caseFile(m), 'chip'))
                        .join('')}</div>`
                    : ''
                }
              </div>
            </div>

            <div class="panel panel--pad stack stack--s">
              <p class="micro micro--signal">NAVIGATE</p>
              <div class="pager" style="border:0;padding:0">
                ${prev ? `<a class="link-more" href="${logFile(prev)}">Newer entry</a>` : '<span class="util">Newest entry</span>'}
                ${next ? `<a class="link-more" href="${logFile(next)}">Older entry</a>` : '<span class="util">Oldest entry</span>'}
              </div>
            </div>
          </aside>
        </div>
      </div>`;
  return body;
}

/* ===========================================================================
   08 — HQ
   =========================================================================== */

export function hqPage() {
  const activeSocials = site.socials.filter((s) => s.url);
  const pendingSocials = site.socials.filter((s) => !s.url);

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">08</span> CONTACT HUB</p>
          <h1 id="page-title">HQ</h1>
          <p class="lede">${esc(profile.summary)}</p>
          <div class="page-head__meta">
            ${chip(profile.role)}
            ${chip(profile.location)}
            ${chip(profile.availability.label)}
          </div>
        </header>

        <div class="hq-layout">
          <div class="stack stack--l">
            <section class="section" aria-labelledby="profile-title">
${sectionHead({ label: '// PROFILE', title: 'The short version', id: 'profile-title' })}
              <div class="panel panel--pad-lg stack">
                <p class="lede" style="font-size:var(--step-0);color:var(--sand)">${esc(profile.intro)}</p>
                <p style="color:var(--slate)">I work at the point where message, structure and design meet: understanding what a business actually offers, deciding what matters most, then building the page, post or asset that communicates it. Most of that work is unglamorous — writing, restructuring, testing, and cutting things that do not help.</p>
                <p style="color:var(--slate)">This practice is early. Rather than presenting an inflated track record, the site shows the record honestly: the missions completed, the tools in use, the lessons learned and what is still being learned. If that matches what you need, the contact form is right there.</p>
                <div class="trait-row">
${profile.traits.map((t) => `                  <span class="badge badge--archived">${esc(t)}</span>`).join('\n')}
                </div>
              </div>
            </section>

            <section class="section" aria-labelledby="capabilities-title">
${sectionHead({
  label: '// CAPABILITIES',
  title: 'What I can take on',
  desc: 'Each capability carries an honest confidence label — the same four-level ladder used in the skill tree.',
  id: 'capabilities-title'
})}
              <div class="profile-capabilities">
${profile.capabilities
  .map(
    (c) => `                <div class="capability">
                  <p class="capability__title">${esc(c.title)}</p>
                  ${badge(c.level)}
                  <p class="capability__detail">${esc(c.detail)}</p>
                </div>`
  )
  .join('\n')}
              </div>
            </section>

            <section class="section" aria-labelledby="interests-title">
${sectionHead({ label: '// INTERESTS', title: 'Professional interests', id: 'interests-title' })}
              <ul class="bullets">
${profile.interests.map((i) => `                <li>${esc(i)}</li>`).join('\n')}
              </ul>
            </section>

            <section class="section" id="cv" aria-labelledby="cv-title">
${sectionHead({ label: '// DOCUMENTS', title: 'CV / résumé', desc: 'A downloadable PDF, when one exists.', id: 'cv-title' })}
              ${
                profile.resume.url
                  ? `<div class="dl-actions">
                <a class="btn" href="${esc(profile.resume.url)}" download>${icon('download', { size: 14 })} ${esc(profile.resume.label)}</a>
                <span class="util">${esc(profile.resume.meta)}</span>
              </div>`
                  : emptyState({
                      type: 'DOCUMENT SLOT OPEN',
                      title: 'No CV uploaded yet',
                      body:
                        'There is no PDF here because none has been produced. The button is not shown as a dead link — it will appear automatically once a file is placed in assets/files/ and pointed to in content/profile.js.',
                      fields: ['File', 'assets/files/cv.pdf', 'Field', 'profile.resume.url']
                    })
              }
            </section>

            <section class="section" id="colophon" aria-labelledby="colophon-title">
${sectionHead({ label: '// COLOPHON', title: 'How this site is built', id: 'colophon-title' })}
              <div class="grid grid--auto">
                <div class="panel panel--pad stack stack--s">
                  <p class="micro micro--signal">BUILD</p>
                  <dl class="kv">
                    <dt>Stack</dt><dd>Static HTML generated from structured content modules</dd>
                    <dt>Scripting</dt><dd>Native ES modules, no framework, no runtime dependencies</dd>
                    <dt>Type</dt><dd>Sora, Manrope, JetBrains Mono (self-hosted variable subsets)</dd>
                    <dt>Version</dt><dd>v${esc(site.version)} — ${esc(fmtDate(site.buildDate))}</dd>
                  </dl>
                </div>
                <div class="panel panel--pad stack stack--s">
                  <p class="micro micro--signal">ACCESSIBILITY</p>
                  <ul class="bullets">
                    <li>Semantic landmarks and a single h1 per page</li>
                    <li>Keyboard-operable navigation, filters and forms</li>
                    <li>Visible focus states and colour-independent status labelling</li>
                    <li><code>prefers-reduced-motion</code> honoured throughout</li>
                    <li>Content readable without JavaScript</li>
                  </ul>
                </div>
                <div class="panel panel--pad stack stack--s">
                  <p class="micro micro--signal">PRIVACY</p>
                  <ul class="bullets">
                    <li>No third-party requests: fonts, scripts and images are self-hosted</li>
                    <li>No analytics scripts installed</li>
                    <li>The live clock reads your device time and sends nothing</li>
                    <li>Contact messages are sent only where a form endpoint is configured</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <aside class="hq-aside" aria-label="Quick facts and channels">
            <div class="panel">
              <div class="panel__head"><span class="panel__index">STATUS</span><span class="panel__title">QUICK READ</span></div>
              <div class="panel__body">
${kv([
  ['Name', esc(profile.name)],
  ['Role', esc(profile.role)],
  ['Based', esc(profile.location.replace(/^BASED IN /, ''))],
  ['Mode', esc(profile.currentMode.value)],
  ['Availability', badge(profile.availability.label === 'AVAILABLE' ? 'ACTIVE' : 'PENDING')],
  ['Local time', `<span data-clock-inline>--:--:--</span>`]
])}
              </div>
            </div>

            <div class="panel">
              <div class="panel__head"><span class="panel__index">CHANNELS</span><span class="panel__title">PROFILES</span></div>
              <div class="panel__body stack stack--s">
                <div class="link-list">
${activeSocials
  .map(
    (s) => `                  <a class="link-list__item" href="${esc(s.url)}" rel="me noopener">
                    <span class="link-list__left">${icon('link', { size: 15 })}<span><span class="link-list__label">${esc(s.label)}</span><br><span class="link-list__handle">${esc(s.handle)}</span></span></span>
                    ${icon('external', { size: 14 })}
                  </a>`
  )
  .join('\n')}
${pendingSocials
  .map(
    (s) => `                  <div class="link-list__item link-list__item--pending">
                    <span class="link-list__left">${icon('link', { size: 15 })}<span><span class="link-list__label">${esc(s.label)}</span><br><span class="link-list__handle">Not linked yet</span></span></span>
                    <span class="link-list__state">PENDING</span>
                  </div>`
  )
  .join('\n')}
                </div>
                <p class="util" style="font-size:0.625rem">Unlinked profiles show a pending state rather than a broken link. Add URLs in <code>content/site.js</code>.</p>
              </div>
            </div>

            <div class="note">
              <p class="note__label micro">${icon('mail', { size: 13 })} OPEN A CHANNEL</p>
              <p class="note__text">${esc(profile.companionNote)}</p>
              <p class="note__foot">A short brief is enough to start. Reply time is usually within a day or two.</p>
              <div class="btn-row">
                <a class="btn" href="contact.html">Contact form</a>
              </div>
            </div>
          </aside>
        </div>
      </div>`;
  return body;
}

/* ===========================================================================
   CONTACT
   =========================================================================== */

export function contactPage() {
  const safeMode = !site.contactEndpoint;
  const activeSocials = site.socials.filter((s) => s.url);

  const body = `      <div class="page">
        <header class="page-head">
          <p class="page-head__index micro"><span aria-hidden="true">08b</span> CHANNEL · FROM HQ</p>
          <h1 id="page-title">Contact</h1>
          <p class="lede">A short brief is enough: what you are working on, what needs clarifying, and when you need it. If it is not a fit, that will be said plainly.</p>
          <div class="page-head__meta">
            ${chip(profile.availability.label)}
            ${chip('Usually replies within 1–2 days')}
            ${chip('No obligation')}
          </div>
        </header>

        <div class="contact-layout">
          <section class="section" aria-labelledby="form-title">
${sectionHead({ label: '// TRANSMISSION', title: 'Send a message', desc: 'All fields marked with an asterisk are required.', id: 'form-title' })}
            <div class="panel panel--pad-lg">
              <form class="form" data-contact-form data-endpoint="${esc(site.contactEndpoint)}" novalidate>
                <div class="form__status${safeMode ? ' form__status--safe' : ''}" data-form-status role="status" aria-live="polite" tabindex="-1"></div>

                <div class="form__grid">
                  <div class="field" data-field="name">
                    <label class="field__label" for="cf-name">Name <span class="field__req" aria-hidden="true">*</span></label>
                    <input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-error" placeholder="Who is writing?">
                    <p class="field__error" id="cf-name-error" data-error-for="name"></p>
                  </div>

                  <div class="field" data-field="email">
                    <label class="field__label" for="cf-email">Email <span class="field__req" aria-hidden="true">*</span></label>
                    <input id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-error" placeholder="name@example.com">
                    <p class="field__error" id="cf-email-error" data-error-for="email"></p>
                  </div>

                  <div class="field field--full" data-field="subject">
                    <label class="field__label" for="cf-subject">Subject <span class="field__req" aria-hidden="true">*</span></label>
                    <select id="cf-subject" name="subject" required aria-describedby="cf-subject-error">
                      <option value="">Select a subject…</option>
                      <option value="Project enquiry">Project enquiry</option>
                      <option value="Website / WordPress">Website or WordPress work</option>
                      <option value="SEO or content">SEO or content</option>
                      <option value="Design / social">Design or social media</option>
                      <option value="Collaboration">Collaboration or partnership</option>
                      <option value="Something else">Something else</option>
                    </select>
                    <p class="field__error" id="cf-subject-error" data-error-for="subject"></p>
                  </div>

                  <div class="field field--full" data-field="message">
                    <label class="field__label" for="cf-message">Message <span class="field__req" aria-hidden="true">*</span></label>
                    <textarea id="cf-message" name="message" required minlength="20" aria-describedby="cf-message-error cf-message-hint" placeholder="What are you working on, and what would be most useful?"></textarea>
                    <p class="field__error" id="cf-message-error" data-error-for="message"></p>
                    <p class="field__hint" id="cf-message-hint">Minimum 20 characters. Plain text is fine — a rough brief beats a polished one.</p>
                  </div>

                  <div class="field field--full" data-field="consent">
                    <label class="checkline" for="cf-consent">
                      <input id="cf-consent" name="consent" type="checkbox" required aria-describedby="cf-consent-error">
                      <span>I understand this message will be used only to reply to this enquiry. <span class="field__req" aria-hidden="true">*</span></span>
                    </label>
                    <p class="field__error" id="cf-consent-error" data-error-for="consent"></p>
                  </div>
                </div>

                <div style="position:absolute;left:-9999px" aria-hidden="true">
                  <label for="cf-company">Company (leave blank)</label>
                  <input id="cf-company" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
                </div>

                <div class="row-between">
                  <button class="btn" type="submit" data-submit>${icon('arrow', { size: 14 })} Transmit message</button>
                  <p class="util" style="font-size:0.625rem">${safeMode ? 'Delivery is not configured on this build — see the note below.' : 'Delivered through a form endpoint. No trackers attached.'}</p>
                </div>
              </form>
            </div>

            ${
              safeMode
                ? `<div class="callout callout--caution" style="margin-top:1rem">
              <h3>${icon('warn', { size: 15 })} Delivery not configured yet — this form does not send anywhere</h3>
              <p>This build has no form endpoint set, so the form validates your message, confirms it was captured and then tells you plainly that nothing was transmitted. To switch delivery on, set <code>site.contactEndpoint</code> in <code>content/site.js</code> to a form service URL (Formspree, Basin, Netlify Forms, or your own handler).</p>
              <p>The interface never reports a message as sent when no channel exists.</p>
            </div>`
                : ''
            }
          </section>

          <aside class="stack stack--m" aria-label="Contact details">
            <div class="panel">
              <div class="panel__head"><span class="panel__index">DIRECT</span><span class="panel__title">CHANNELS</span></div>
              <div class="panel__body stack stack--s">
                ${
                  site.publicEmail
                    ? `<div class="link-list">
                  <a class="link-list__item" href="mailto:${esc(site.publicEmail)}">
                    <span class="link-list__left">${icon('mail', { size: 15 })}<span><span class="link-list__label">Email</span><br><span class="link-list__handle">${esc(site.publicEmail)}</span></span></span>
                    ${icon('arrow', { size: 14 })}
                  </a>
                </div>`
                    : emptyState({
                        inline: true,
                        type: 'DIRECT EMAIL NOT PUBLISHED',
                        title: 'No public email address on this build',
                        body:
                          'Rather than printing an address that is not monitored, this slot stays empty. Set site.publicEmail in content/site.js to activate it.',
                        fields: ['site.publicEmail']
                      })
                }
                <div class="link-list" style="margin-top:0.6rem">
${activeSocials
  .map(
    (s) => `                  <a class="link-list__item" href="${esc(s.url)}" rel="me noopener">
                    <span class="link-list__left">${icon('link', { size: 15 })}<span class="link-list__label">${esc(s.label)}</span></span>
                    ${icon('external', { size: 14 })}
                  </a>`
  )
  .join('\n')}
                </div>
              </div>
            </div>

            <div class="callout callout--info">
              <h3>${icon('info', { size: 15 })} What happens next</h3>
              <ul>
                <li>A reply is sent to the address you provide — usually within one or two days.</li>
                <li>If it is not a match for either side, that is said directly rather than left hanging.</li>
                <li>No addresses are added to a mailing list, because there is no mailing list.</li>
              </ul>
            </div>

            <div class="panel panel--pad stack stack--s">
              <p class="micro micro--signal">STATUS</p>
              <dl class="kv">
                <dt>Availability</dt><dd>${esc(profile.availability.label)}</dd>
                <dt>Mode</dt><dd>${esc(profile.currentMode.value)}</dd>
                <dt>Timezone</dt><dd>IST (UTC+05:30)</dd>
                <dt>Local time</dt><dd><span data-clock-inline>--:--:--</span></dd>
              </dl>
            </div>

            <div class="panel panel--pad stack stack--s">
              <p class="micro micro--signal">NOT SURE YET?</p>
              <p style="font-size:0.875rem;color:var(--slate)">Browse the case files first — they show the kind of work and the level it is pitched at.</p>
              <div class="btn-row">
                <a class="btn btn--ghost" href="case-files.html">Case files</a>
                <a class="btn btn--quiet" href="hq.html">HQ</a>
              </div>
            </div>
          </aside>
        </div>
      </div>`;
  return body;
}

/* ===========================================================================
   404
   =========================================================================== */

export function notFoundPage() {
  const body = `      <div class="page">
        <section class="lost ticks" aria-labelledby="page-title">
          <p class="micro micro--signal">SYSTEM ALERT · ROUTE NOT FOUND</p>
          <p class="lost__code">4<span>0</span>4</p>
          <h1 id="page-title">Signal lost — this destination does not exist</h1>
          <p class="lede">The address you followed is not part of the command map. It may have been a mistyped URL, an old link, or a section that has since been renamed.</p>
          <div class="page-head__meta">
            <span class="badge badge--wait">ROUTE UNRESOLVED</span>
            <span class="badge badge--archived">SYSTEM OTHERWISE ONLINE</span>
          </div>
          <div class="btn-row">
            <a class="btn" href="index.html">${icon('home', { size: 14 })} Return to command centre</a>
            <a class="btn btn--ghost" href="case-files.html">${icon('folder', { size: 14 })} Case files</a>
            <a class="btn btn--ghost" href="contact.html">${icon('mail', { size: 14 })} Contact</a>
          </div>
        </section>

        <section class="section" aria-labelledby="recovery-title">
${sectionHead({
  label: '// RECOVERY',
  title: 'Select a destination instead',
  desc: 'Every route in the system, in case the one you wanted is not the one you typed.',
  id: 'recovery-title'
})}
          <div class="dest-grid">
${destinationCards('not-found')}
          </div>
        </section>

        <section class="section" aria-labelledby="recovery-2-title">
${sectionHead({ label: '// OR', title: 'Connected modules', id: 'recovery-2-title' })}
          <div class="routes">
${[
  ['case-files.html', 'folder', 'CASE FILES', 'Structured records of every mission.'],
  ['toolkit.html', 'wrench', 'TOOLKIT', 'The working toolset, status labelled.'],
  ['learning-log.html', 'log', 'LEARNING LOG', 'Dated notes from the lab.'],
  ['certificates.html', 'certificate', 'CERTIFICATES', 'Credential register, verifications only.'],
  ['contact.html', 'mail', 'CONTACT', 'Open a channel.']
]
  .map(
    ([file, ico, label, blurb]) => `            <a class="route" href="${file}">
              <span class="route__top">${icon(ico, { size: 18 })}</span>
              <span class="route__label">${esc(label)}</span>
              <span class="route__blurb">${esc(blurb)}</span>
            </a>`
  )
  .join('\n')}
          </div>
        </section>
      </div>`;
  return body;
}
