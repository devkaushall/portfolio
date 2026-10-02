/**
 * DESTINATION MODEL
 * ---------------------------------------------------------------------------
 * The navigation is a routing table, not decoration. Every destination below
 * maps to a real page. `id` is used for the active-state check, so the same
 * nav works on every screen without client-side routing.
 *
 * SECONDARY destinations (case files, toolkit, learning log, certificates,
 * contact) are connected views into the primary modules: they share data
 * sources with MISSIONS, ARSENAL, LEARNING LAB, ACHIEVEMENTS and HQ.
 */

export const destinations = [
  {
    id: 'command-center',
    index: '01',
    label: 'COMMAND CENTER',
    short: 'HOME',
    file: 'index.html',
    icon: 'dashboard',
    blurb: 'The dashboard: identity, current focus and every route into the system.',
    meta: 'OVERVIEW'
  },
  {
    id: 'story-mode',
    index: '02',
    label: 'STORY MODE',
    short: 'STORY',
    file: 'story-mode.html',
    icon: 'story',
    blurb: 'How curiosity became a path — chapters of learning, not a résumé brag sheet.',
    meta: 'NARRATIVE'
  },
  {
    id: 'missions',
    index: '03',
    label: 'MISSIONS',
    short: 'MISSIONS',
    file: 'missions.html',
    icon: 'target',
    blurb: 'Real projects, practice briefs and experiments, with objectives and outcomes.',
    meta: 'WORK'
  },
  {
    id: 'skill-tree',
    index: '04',
    label: 'SKILL TREE',
    short: 'SKILLS',
    file: 'skill-tree.html',
    icon: 'tree',
    blurb: 'Eight branches, four honest levels — what is being learned and what is practised.',
    meta: 'PROFICIENCY'
  },
  {
    id: 'arsenal',
    index: '05',
    label: 'ARSENAL',
    short: 'ARSENAL',
    file: 'arsenal.html',
    icon: 'tool',
    blurb: 'Tools and platforms in use, with a truthful familiarity status on every one.',
    meta: 'TOOLS'
  },
  {
    id: 'achievements',
    index: '06',
    label: 'ACHIEVEMENTS',
    short: 'AWARDS',
    file: 'achievements.html',
    icon: 'award',
    blurb: 'Certificates, milestones and published work — only what can be referenced.',
    meta: 'RECORD'
  },
  {
    id: 'learning-lab',
    index: '07',
    label: 'LEARNING LAB',
    short: 'LAB',
    file: 'learning-lab.html',
    icon: 'flask',
    blurb: 'An ongoing log of tests, notes, research and lessons learned the slow way.',
    meta: 'R&D'
  },
  {
    id: 'hq',
    index: '08',
    label: 'HQ',
    short: 'HQ',
    file: 'hq.html',
    icon: 'hq',
    blurb: 'The profile hub: capabilities, interests, links and a way to reach out.',
    meta: 'CONTACT HUB'
  }
];

export const secondaryDestinations = [
  {
    id: 'case-files',
    label: 'CASE FILES',
    file: 'case-files.html',
    icon: 'folder',
    connects: 'missions',
    blurb: 'The evidence room — every mission opened up as a case file.',
    meta: 'FROM MISSIONS'
  },
  {
    id: 'toolkit',
    label: 'TOOLKIT',
    file: 'toolkit.html',
    icon: 'wrench',
    connects: 'arsenal',
    blurb: 'Equipped for the job — the working set of tools, grouped by discipline.',
    meta: 'FROM ARSENAL'
  },
  {
    id: 'learning-log',
    label: 'LEARNING LOG',
    file: 'learning-log.html',
    icon: 'log',
    connects: 'learning-lab',
    blurb: 'Dated entries from the lab — what was tried, what broke, what stuck.',
    meta: 'FROM LEARNING LAB'
  },
  {
    id: 'certificates',
    label: 'CERTIFICATES',
    file: 'certificates.html',
    icon: 'certificate',
    connects: 'achievements',
    blurb: 'Credentials and completed milestones, with verification status shown.',
    meta: 'FROM ACHIEVEMENTS'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    file: 'contact.html',
    icon: 'mail',
    connects: 'hq',
    blurb: 'Open a channel — a short brief is enough to start a conversation.',
    meta: 'FROM HQ'
  }
];

/** Flat lookup used by templates and the active-state helper. */
export const allDestinations = [...destinations, ...secondaryDestinations];

/** Fast lookup by id. */
export const byId = Object.fromEntries(allDestinations.map((d) => [d.id, d]));

export default destinations;
