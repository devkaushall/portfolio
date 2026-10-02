/**
 * MISSION INDEX / CASE FILES
 * ---------------------------------------------------------------------------
 * MISSION RECORD RULES (read before adding an entry):
 *
 * 1. Everything here describes work that actually happened or is genuinely in
 *    progress. There is no invented client, revenue figure, ranking or result.
 * 2. `metrics` is an explicitly empty array on every mission. If a number is
 *    ever added it must be one you measured yourself, with the period noted.
 * 3. `client` stays null unless the work was paid or formally commissioned by a
 *    named organisation. Self-assigned briefs use `briefType: 'SPEC BRIEF'` so
 *    practice work is never presented as client work.
 * 4. `evidence` holds optional links to the live artefact. Empty arrays render
 *    a designed empty state rather than a broken link.
 *
 * STATUS vocabulary: ACTIVE | COMPLETED | EXPERIMENT | LEARNING | ARCHIVED
 */

export const missions = [
  {
    id: 'M-001',
    slug: 'rathi-properties',
    title: 'Rathi Properties',
    category: 'WEB + WORDPRESS',
    status: 'COMPLETED',
    date: '2026-06',
    year: '2026',
    briefType: 'PRACTICAL BRIEF',
    client: null,
    clientNote: 'Not recorded as a paid engagement. No contract, budget or commercial result is claimed.',
    objective: 'Create a clearer digital presence for a property brand.',
    description:
      'A property brand brief used to practise the whole path: understanding what the business actually sells, deciding page hierarchy, writing plain-language copy and delivering a WordPress build that the owner can update without a developer.',
    context:
      'Property marketing is often over-styled and under-explained. The brief was treated as an information problem first — what does a buyer need to see, in what order — and a visual problem second.',
    approach: [
      'Rewrote the core message around one plain sentence before touching design.',
      'Structured the pages as a decision path: what it is, where it is, what happens next.',
      'Built in WordPress with a small reusable block set so content stays editable.',
      'Reviewed the result on a mid-range phone and a slow connection, not just a desktop.'
    ],
    outcome:
      'A complete, maintainable build was produced and the structure held up on review. Business results were outside the scope of the exercise and were not measured — no traffic, lead or ranking figures are claimed here.',
    lessons: [
      'The hardest part of a site is agreeing what the first screen should say.',
      'Handover quality is a design decision, not an afterthought.',
      'Naming and structure in WordPress matter more than the visual theme.'
    ],
    skills: ['wordpress', 'page-structure', 'positioning', 'writing-clarity', 'layout-grid'],
    tools: ['wordpress', 'elementor', 'canva', 'hostinger'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-003', 'lab-007']
  },
  {
    id: 'M-002',
    slug: 'command-centre-v1',
    title: 'Command Centre v1',
    category: 'WEB + WORDPRESS',
    status: 'ACTIVE',
    date: '2026-09',
    year: '2026',
    briefType: 'SELF-INITIATED',
    client: null,
    clientNote: 'Personal project. The site you are reading is the deliverable.',
    objective: 'Present an early-career practice honestly instead of inflating it.',
    description:
      'A portfolio built as a personal operating system: identity and status at the top, current focus in the middle, and every piece of evidence — missions, skills, tools, lessons — one tap away.',
    context:
      'Most portfolios for people early in their career either overstate the work or hide behind a template. This one was designed around a simple rule: show the process, label the level, publish the gaps.',
    approach: [
      'Wrote the content model first — missions, skills, tools, lessons as structured data.',
      'Built the interface as a dashboard: status layer, destination rail, panel grid.',
      'Kept the honest copy from the first draft — nothing upgraded for effect.',
      'Designed the empty states before the filled ones, so missing evidence has a home.'
    ],
    outcome:
      'Version 1.0 is live and maintained. Ongoing work covers accessibility passes, performance budgets and adding real evidence as it appears.',
    lessons: [
      'Empty states are a content problem, not a design problem.',
      'Restraint is easier to defend than decoration.',
      'A site you can update in five minutes is a site you will actually update.'
    ],
    skills: ['layout-grid', 'typography', 'brand-assets', 'page-structure', 'writing-clarity'],
    tools: ['figma', 'vscode', 'github', 'wordpress'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-001', 'lab-006']
  },
  {
    id: 'M-003',
    slug: 'personal-brand-voice',
    title: 'One Useful Thing',
    category: 'CONTENT STRATEGY',
    status: 'ACTIVE',
    date: '2026-08',
    year: '2026',
    briefType: 'SELF-INITIATED',
    client: null,
    clientNote: 'Personal publishing practice.',
    objective: 'Write one genuinely useful piece a week in a consistent voice.',
    description:
      'A publishing discipline rather than a campaign: capture ideas as they arrive, pick the one with the most use in it, and ship it in whatever format fits best that week.',
    context:
      'Personal branding fails quietly when the voice changes every week. The exercise is consistency — same tone, same standard, no filler.',
    approach: [
      'Maintain one capture file for raw ideas, reviewed weekly.',
      'Score each idea on usefulness to a small business owner, not on how clever it sounds.',
      'Publish in the format the idea deserves: note, carousel, short piece or page update.',
      'Re-read last month’s output before writing the next one.'
    ],
    outcome:
      'The rhythm is established and the voice is narrowing. Audience growth is not claimed — it is too early to report meaningfully.',
    lessons: [
      'Useful beats impressive every single time.',
      'A capture habit is worth more than a content calendar.',
      'Consistency is a format decision as much as a schedule decision.'
    ],
    skills: ['idea-capture', 'writing-clarity', 'editorial-calendar', 'platform-formats'],
    tools: ['notion', 'canva', 'meta-business', 'chatgpt'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-002', 'lab-009']
  },
  {
    id: 'M-004',
    slug: 'search-foundations-practice',
    title: 'Search Foundations Practice Site',
    category: 'SEO',
    status: 'LEARNING',
    date: '2026-09',
    year: '2026',
    briefType: 'LEARNING EXERCISE',
    client: null,
    clientNote: 'Practice environment. Not a commercial project.',
    objective: 'Apply on-page SEO end to end on a site small enough to understand completely.',
    description:
      'A deliberately tiny site used as a controlled environment: choose a topic, map intent to pages, write titles and descriptions, link pages together properly and then watch what search does with it.',
    context:
      'Advice about SEO is everywhere and mostly untested. This exists to test it at a scale where cause and effect are actually visible.',
    approach: [
      'Mapped one clear intent per page before writing anything.',
      'Wrote titles and meta descriptions by hand, then compared them against the rendered result.',
      'Kept a flat internal linking structure and tracked every change in the learning log.',
      'Used Search Console coverage and query reports as the feedback loop.'
    ],
    outcome:
      'In progress. The site indexes correctly and the page-level patterns are being recorded. No ranking or traffic claims are made — the sample is far too small to mean anything.',
    lessons: [
      'Intent mismatch is invisible in data and obvious in the SERP.',
      'Most “SEO problems” on small sites are clarity problems.',
      'Change one thing at a time or learn nothing.'
    ],
    skills: ['keyword-research', 'search-intent', 'on-page-seo', 'technical-seo', 'search-console'],
    tools: ['wordpress', 'rank-math', 'search-console', 'ahrefs'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-004', 'lab-010']
  },
  {
    id: 'M-005',
    slug: 'local-cafe-social-kit',
    title: 'Local Café Social Kit',
    category: 'SOCIAL MEDIA',
    status: 'EXPERIMENT',
    date: '2026-07',
    year: '2026',
    briefType: 'SPEC BRIEF — NOT A CLIENT PROJECT',
    client: null,
    clientNote: 'Self-assigned brief for a fictional café. No real business, client or result is implied.',
    objective: 'Test whether a small food business can run a month of content on six template layouts.',
    description:
      'A self-set constraint exercise: one fictional café, six reusable layouts, thirty days of posts, no bespoke design per post. The point was to see how far a system stretches before it starts repeating itself.',
    context:
      'Small businesses rarely have a designer on call. A kit that a non-designer can operate is more valuable than one beautiful poster.',
    approach: [
      'Defined six post types: product, process, people, place, promo, proof.',
      'Built each layout in Canva with locked elements that survive careless editing.',
      'Wrote caption structures that work even when the photo is average.',
      'Stress-tested the kit by producing a month of content in one sitting.'
    ],
    outcome:
      'The system held for a month, then started to feel mechanical — a useful finding. Two layouts were retired and replaced with formats built around customer questions.',
    lessons: [
      'Templates should protect decisions, not remove them.',
      'Repetition is only a problem when the content repeats too.',
      'Constraints make weak ideas visible faster.'
    ],
    skills: ['brand-assets', 'platform-formats', 'content-calendar', 'writing-clarity'],
    tools: ['canva', 'figma', 'meta-business', 'later'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-005', 'lab-011']
  },
  {
    id: 'M-006',
    slug: 'poster-grid-studies',
    title: 'Poster Grid Studies',
    category: 'DESIGN',
    status: 'EXPERIMENT',
    date: '2026-05',
    year: '2026',
    briefType: 'DESIGN EXERCISE',
    client: null,
    clientNote: 'Personal exercise. No client output.',
    objective: 'Practise typographic hierarchy by rebuilding the same message twenty different ways.',
    description:
      'One short message, one grid, twenty variations — changing only scale, weight, alignment and negative space. No imagery, no colour tricks, no stock photography.',
    context:
      'Hierarchy is the skill that separates a poster that works from one that is merely decorated. Restricting the variables forces the eye to learn where it lands first.',
    approach: [
      'Fixed a single modular grid and never broke it.',
      'Changed one typographic variable per study and recorded the effect.',
      'Reviewed the set as a contact sheet rather than one at a time.',
      'Kept the ten strongest and discarded the rest without sentiment.'
    ],
    outcome:
      'A sharper eye and a smaller number of default moves — which is, arguably, the point. The set is kept as a personal reference library.',
    lessons: [
      'Contrast does most of the work; decoration does the least.',
      'If everything is emphasised, nothing is.',
      'Editing your own output is the fastest way to improve it.'
    ],
    skills: ['layout-grid', 'typography', 'colour-contrast'],
    tools: ['figma', 'photoshop', 'canva'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-006', 'lab-012']
  },
  {
    id: 'M-007',
    slug: 'wordpress-theme-notes',
    title: 'WordPress Build Notes',
    category: 'WEB + WORDPRESS',
    status: 'LEARNING',
    date: '2026-08',
    year: '2026',
    briefType: 'LEARNING EXERCISE',
    client: null,
    clientNote: 'Documentation exercise based on personal rebuilds.',
    objective: 'Work out a lean, repeatable WordPress setup worth handing to a client owner.',
    description:
      'Rebuilding the same page four times — block editor, block patterns, page builder and a child theme — then writing down what each approach costs the person maintaining it later.',
    context:
      'The fastest build is rarely the cheapest build. This exercise measured maintainability rather than speed to first draft.',
    approach: [
      'Standardised a reusable block set: hero, proof, detail, action, contact.',
      'Compared editor experience and long-term editability, not developer preference.',
      'Wrote handover notes a non-technical owner could actually follow.',
      'Checked performance against a mid-range Android device on a throttled connection.'
    ],
    outcome:
      'In progress. Notes and a checklist are being consolidated for reuse in future builds — with an honest record of which approach caused the most post-handover support.',
    lessons: [
      'Whoever maintains the site later is the real user.',
      'Fewer plugins is a maintenance decision.',
      'Documentation is part of the deliverable, not a favour.'
    ],
    skills: ['wordpress', 'page-structure', 'performance', 'hosting-domains'],
    tools: ['wordpress', 'elementor', 'vscode', 'hostinger'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-007', 'lab-013']
  },
  {
    id: 'M-008',
    slug: 'reading-ga4',
    title: 'Reading GA4 Without Panic',
    category: 'ANALYTICS',
    status: 'ACTIVE',
    date: '2026-09',
    year: '2026',
    briefType: 'LEARNING EXERCISE',
    client: null,
    clientNote: 'Practice on personal properties only.',
    objective: 'Learn to answer one question per report instead of staring at every chart.',
    description:
      'A structured habit: write the question down first, open the single report that answers it, then record the answer and the doubt. Twenty questions later, the interface starts to feel less arbitrary.',
    context:
      'Analytics is a reading skill. The tooling is a maze of defaults, and most beginners leave it confused rather than informed.',
    approach: [
      'One written question per session, before opening the tool.',
      'Set up events that map to outcomes that matter to a small business.',
      'Kept a doubt log — what the numbers could not explain.',
      'Ignored vanity metrics entirely for the first month.'
    ],
    outcome:
      'In progress. Sessions are now shorter and conclusions are hedged appropriately, which is progress. No client analytics data is used or shown anywhere in this system.',
    lessons: [
      'A metric without a question is decoration.',
      'Traffic sources lie politely; check the landing page.',
      'Recording doubt prevents overconfidence later.'
    ],
    skills: ['ga4-basics', 'reporting', 'utm-tracking', 'search-console'],
    tools: ['ga4', 'search-console', 'sheets', 'notion'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-008', 'lab-010']
  },
  {
    id: 'M-009',
    slug: 'first-portfolio-draft',
    title: 'First Portfolio Draft',
    category: 'WEB + WORDPRESS',
    status: 'ARCHIVED',
    date: '2026-04',
    year: '2026',
    briefType: 'SELF-INITIATED',
    client: null,
    clientNote: 'Superseded by Command Centre v1. Kept for the record.',
    objective: 'Get something — anything — online as a first portfolio.',
    description:
      'A template-based site built quickly to have a presence. It listed skills as confident percentages and had no evidence behind any of them, which is exactly why it was retired.',
    context:
      'Keeping this entry matters more than hiding it. The gap between this version and the current one is the clearest measure of progress in the whole system.',
    approach: [
      'Started from a free theme and changed the colours.',
      'Listed every skill at a high percentage because the fields existed.',
      'Added no case studies, no process and no source for any claim.'
    ],
    outcome:
      'Archived and replaced. The rebuild replaced percentage bars with levels that can be defended, and claims with records.',
    lessons: [
      'A number you cannot justify is worse than no number.',
      'Templates are a fine starting point and a poor finishing point.',
      'Archiving honestly is a legitimate way to improve a portfolio.'
    ],
    skills: ['wordpress', 'layout-grid'],
    tools: ['wordpress', 'canva'],
    evidence: [],
    metrics: [],
    linkedLab: ['lab-001']
  }
];

/** Category list derived from the data so filters never drift out of sync. */
export const missionCategories = [...new Set(missions.map((m) => m.category))].sort();
export const missionStatuses = ['ACTIVE', 'COMPLETED', 'EXPERIMENT', 'LEARNING', 'ARCHIVED'];
export const missionYears = [...new Set(missions.map((m) => m.year))].sort().reverse();

export default missions;
