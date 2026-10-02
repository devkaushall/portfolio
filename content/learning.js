/**
 * LEARNING LAB / LEARNING LOG
 * ---------------------------------------------------------------------------
 * The most expandable part of the system. Every entry gets its own detail page
 * at log-<id>.html, an index card in the lab, and a row in the log table.
 *
 * `status`: ACTIVE | ONGOING | COMPLETED | PAUSED | IDEA
 * `category`: SEO | DESIGN | CONTENT | MARKETING | WEB | EXPERIMENTS
 *
 * The CURRENTLY LEARNING block is defined once below and appears on the
 * command centre, the lab and the log — so it only needs updating in one place.
 */

export const currentlyLearning = {
  updated: '2026-10',
  headline: 'CURRENTLY LEARNING',
  intro:
    'What is open on the desk right now, with an honest note on how far along each one is. Updated monthly.',
  items: [
    {
      label: 'Technical SEO foundations',
      detail: 'Indexing, canonicals, sitemaps and page speed — learning what actually changes outcomes.',
      progress: ['Crawl basics', 'Search Console coverage', 'Core Web Vitals'],
      ref: 'lab-004'
    },
    {
      label: 'GA4 without vanity metrics',
      detail: 'One written question per session, then the single report that answers it.',
      progress: ['Event model', 'Conversions', 'Reading reports'],
      ref: 'lab-008'
    },
    {
      label: 'Content repurposing systems',
      detail: 'Making one decent idea produce a week of output without repeating itself.',
      progress: ['Idea capture', 'Format mapping', 'Distribution'],
      ref: 'lab-009'
    }
  ]
};

export const learningEntries = [
  {
    id: 'lab-001',
    slug: 'retired-skill-percentage-bars',
    title: 'Retired the skill percentage bars',
    date: '2026-04',
    category: 'DESIGN',
    status: 'COMPLETED',
    summary:
      'The first portfolio listed skills as confident percentages. Nothing behind them could be defended, so the whole scale was replaced.',
    body: [
      'The original build had a familiar widget: eight skills, eight bars, most of them at 80% or above. It looked reassuring and it meant nothing. Nobody had measured anything, and the numbers moved depending on how generous I felt that day.',
      'The replacement is a four-level ladder — LEARNING, PRACTISING, DEVELOPING, WORKING KNOWLEDGE — where each level has a written definition and a node can only claim it if the description holds true. It is less impressive on a screenshot and considerably more useful in a conversation.',
      'The wider lesson: any display of skill is an argument, and an argument needs evidence. When there is no evidence yet, the honest move is to design a state that shows the gap clearly.'
    ],
    findings: [
      'A number nobody can justify is worse than an empty slot.',
      'Levels need written definitions or they become percentages with extra words.',
      'Honest design systems look emptier at the start — that is a feature.'
    ],
    next: 'Keep the ladder definitions next to the data so they cannot quietly drift.',
    tools: ['figma', 'vscode'],
    skills: ['design-systems', 'layout-grid'],
    missions: ['M-009', 'M-002'],
    tags: ['honesty', 'design system', 'skills']
  },
  {
    id: 'lab-002',
    slug: 'thirty-ideas-one-sitting',
    title: 'Thirty ideas in one sitting',
    date: '2026-05',
    category: 'CONTENT',
    status: 'COMPLETED',
    summary:
      'A timed capture exercise: thirty raw ideas in ninety minutes, then a brutal cull to find out which ones survived a night’s sleep.',
    body: [
      'The block was not a lack of ideas — it was a habit of judging each one while writing it. So the rule was simple: no editing, no evaluating, ninety minutes, thirty entries.',
      'The following morning, eleven of the thirty still felt worth something and four were worth writing properly. That is a better strike rate than waiting for a good idea to arrive fully formed, which is what the previous approach had been.',
      'The capture file now sits in Notion and gets reviewed weekly. Most entries there will never be used, and that is fine — the cost of keeping them is close to zero.'
    ],
    findings: [
      'Separate generating from judging; doing both at once does neither well.',
      'A weekly review turns a pile of notes into a shortlist.',
      'Volume first, taste second — the reverse order produces nothing.'
    ],
    next: 'Try the same exercise from customer questions rather than from my own head.',
    tools: ['notion', 'chatgpt'],
    skills: ['idea-capture', 'editorial-formats'],
    missions: ['M-003'],
    tags: ['ideation', 'writing', 'process']
  },
  {
    id: 'lab-003',
    slug: 'one-sentence-before-any-design',
    title: 'One sentence before any design',
    date: '2026-06',
    category: 'MARKETING',
    status: 'COMPLETED',
    summary:
      'On the property brief, the first screen was written as a plain sentence before a single layout decision was made. It changed the whole page order.',
    body: [
      'The instinct was to open a design file. Instead the first hour went into one sentence: what does this business actually do for the person reading, and why would they care on a Tuesday afternoon.',
      'Writing that sentence changed the structure. Sections that had felt essential moved down a level, and a section that seemed like a footnote became the third thing on the page because it answered the obvious follow-up question.',
      'This is now the default first step. It costs an hour and prevents the more expensive mistake of designing around a message that was never decided.'
    ],
    findings: [
      'The first screen is an agreement about meaning, not a layout.',
      'If the sentence is vague, the page will be too — no amount of spacing fixes it.',
      'Order pages as a decision path rather than as a list of features.'
    ],
    next: 'Test the same approach on a service business where the buying cycle is longer.',
    tools: ['notion', 'wordpress'],
    skills: ['positioning', 'page-structure', 'writing-clarity'],
    missions: ['M-001'],
    tags: ['messaging', 'structure', 'client work']
  },
  {
    id: 'lab-004',
    slug: 'testing-search-intent',
    title: 'Testing search intent, one page at a time',
    date: '2026-09',
    category: 'SEO',
    status: 'ACTIVE',
    summary:
      'A small practice site used to check what actually happens when one page targets one clear intent — and to find out how wrong early guesses are.',
    body: [
      'Reading about search intent is easy. Applying it makes the guesswork visible. The setup is deliberately small: five pages, one intent each, titles and descriptions written by hand.',
      'The first pass showed a predictable failure. Two pages were targeting slightly different phrasings of the same underlying question, so they competed with each other and neither read as the obvious answer. One was rewritten around the actual question and the internal link structure was flattened.',
      'Changes are logged one at a time with the date, because two simultaneous changes teach nothing. This entry is the running record for that experiment.'
    ],
    findings: [
      'Intent mismatch is invisible in analytics and obvious in the search results.',
      'Overlapping pages are usually a clarity problem wearing a technical costume.',
      'One change at a time, dated, or the results mean nothing.'
    ],
    next: 'Add structured data to one page type and observe whether anything changes at all.',
    tools: ['wordpress', 'rank-math', 'search-console'],
    skills: ['search-intent', 'on-page-seo', 'keyword-research'],
    missions: ['M-004'],
    tags: ['seo', 'experiment', 'in progress']
  },
  {
    id: 'lab-005',
    slug: 'six-templates-thirty-days',
    title: 'Six templates, thirty days',
    date: '2026-07',
    category: 'CONTENT',
    status: 'COMPLETED',
    summary:
      'A constraint test on a fictional café: can a small business run a month of content from six reusable layouts without looking lazy?',
    body: [
      'The premise was that a café owner will not design thirty individual posts. If a system only works with unlimited time, it is not a system.',
      'Six post types were defined — product, process, people, place, promo, proof — each with a locked Canva layout and a caption structure. Producing a month of content in one session was the whole point of the exercise.',
      'It worked, and then it started to grate. By week four the grid felt mechanical. The finding was not that templates fail, but that templates need one user-facing variable per week to stay interesting. Two layouts were retired and replaced with formats built around the questions customers actually ask.'
    ],
    findings: [
      'A template protects the decision it encodes — remove the wrong one and the layout collapses.',
      'Repetition becomes a problem when the content repeats, not the design.',
      'Constraint makes weak ideas fail early, which is cheaper.'
    ],
    next: 'Rebuild the kit with question-led formats and test it on a real local business.',
    tools: ['canva', 'meta-business', 'later'],
    skills: ['brand-assets', 'platform-formats', 'content-calendar'],
    missions: ['M-005'],
    tags: ['social', 'templates', 'constraints']
  },
  {
    id: 'lab-006',
    slug: 'same-poster-twenty-times',
    title: 'The same poster, twenty times',
    date: '2026-05',
    category: 'DESIGN',
    status: 'COMPLETED',
    summary:
      'One message, one grid, twenty typographic variations. No images and no colour trickery, to see what hierarchy alone can carry.',
    body: [
      'With imagery removed, the only available tools are scale, weight, alignment and space. That is uncomfortable at first and extremely instructive afterwards.',
      'The contact-sheet review mattered more than any individual study. Seen side by side, a pattern appeared: the strongest versions had exactly one dominant element and a clear second level, while everything that failed had three or four things shouting equally.',
      'Ten were kept as a reference set. The rest were deleted without ceremony. The useful outcome is a shorter list of default moves — fewer fonts, fewer weights, more space.'
    ],
    findings: [
      'If everything is emphasised, nothing is. Hierarchy is subtraction.',
      'A contact-sheet review exposes patterns that single-file review hides.',
      'Editing your own output is faster than reading another tutorial.'
    ],
    next: 'Repeat the exercise with a long-form page instead of a single poster.',
    tools: ['figma', 'photoshop'],
    skills: ['typography', 'layout-grid'],
    missions: ['M-006'],
    tags: ['typography', 'practice', 'restraint']
  },
  {
    id: 'lab-007',
    slug: 'who-maintains-this-page',
    title: 'Who actually maintains this page?',
    date: '2026-08',
    category: 'WEB',
    status: 'ACTIVE',
    summary:
      'Rebuilding one page four ways to compare not how fast it can be built, but how painful it is to edit six months later.',
    body: [
      'The measurement that matters to a small business owner is not build speed. It is whether they can change a price, a photo or a phone number without booking an hour of someone’s time.',
      'Four builds of the same page: block editor with patterns, hand-built blocks, a page builder, and a child theme. Each was then edited from a cold start, as if returning after several months, with the developer unavailable.',
      'The cleanest result came from a small set of rehearsed block patterns — hero, proof, detail, action, contact. The page builder was faster to assemble and the slowest to safely modify. That trade-off is now documented rather than assumed.'
    ],
    findings: [
      'The person maintaining the site later is the real user of the build.',
      'Fewer plugins is a maintenance decision before it is a performance decision.',
      'Handover notes are part of the deliverable, not a courtesy.'
    ],
    next: 'Turn the notes into a one-page checklist that ships with every build.',
    tools: ['wordpress', 'elementor', 'vscode'],
    skills: ['wordpress', 'page-structure', 'hosting-domains'],
    missions: ['M-001', 'M-007'],
    tags: ['wordpress', 'handover', 'maintenance']
  },
  {
    id: 'lab-008',
    slug: 'one-question-per-analytics-session',
    title: 'One question per analytics session',
    date: '2026-09',
    category: 'MARKETING',
    status: 'ONGOING',
    summary:
      'A fixed habit: write the question down before opening GA4, then read only the one report that answers it.',
    body: [
      'The first month with GA4 was mostly scrolling: every report, no conclusion. The problem was not the interface, it was the absence of a question.',
      'The new rule is a sentence on paper before the browser opens. For example: did the pricing page get seen by people who arrived from search this month. Then one report, one answer, and one line written down — including what the data could not tell me.',
      'Sessions are now around ten minutes. The written answers are more useful than any dashboard screenshot, and the doubt log prevents overconfident conclusions later.'
    ],
    findings: [
      'A metric without a question is decoration.',
      'Traffic sources flatter; landing pages tell the truth.',
      'Writing down what the data cannot explain is part of the analysis.'
    ],
    next: 'Build one screen in Looker Studio that answers the three recurring questions.',
    tools: ['ga4', 'sheets', 'notion'],
    skills: ['ga4-basics', 'reporting', 'sheets-data'],
    missions: ['M-008'],
    tags: ['analytics', 'habits', 'reporting']
  },
  {
    id: 'lab-009',
    slug: 'one-idea-four-formats',
    title: 'One idea, four formats',
    date: '2026-09',
    category: 'CONTENT',
    status: 'ACTIVE',
    summary:
      'Testing whether a single substantial idea can honestly become a long piece, a carousel, a short note and a video script without padding.',
    body: [
      'Repurposing usually fails in one of two directions: the same post appears everywhere in slightly different clothing, or the smaller formats have nothing to say on their own.',
      'The rule being tested is that each format has to answer a different question drawn from the same idea. The long piece explains, the carousel compares, the note argues for one choice, the script shows the result.',
      'Two rounds in, the carousel is consistently the weakest — it is being used to summarise instead of to compare. That is a format decision rather than a writing failure, which is useful to know.'
    ],
    findings: [
      'Each format should answer a different question, not repeat the same answer.',
      'Summarising is the least valuable thing a format can do.',
      'The weakest format usually reveals a decision that was never made.'
    ],
    next: 'Define the question for each format before writing anything, then test again.',
    tools: ['notion', 'canva', 'capcut'],
    skills: ['repurposing', 'editorial-formats', 'editorial-calendar'],
    missions: ['M-003'],
    tags: ['content system', 'distribution', 'experiment']
  },
  {
    id: 'lab-010',
    slug: 'utm-naming-convention',
    title: 'UTM naming that survives a spreadsheet',
    date: '2026-09',
    category: 'EXPERIMENTS',
    status: 'COMPLETED',
    summary:
      'Two months of campaign links were unusable because every one had been named a little differently. A lowercase convention fixed it.',
    body: [
      'The problem was embarrassingly simple. Links had been built by hand, in a hurry, with inconsistent capitalisation and three different spellings of the same source. The reports were split into three rows for one channel.',
      'The fix is a written convention — all lowercase, hyphenated, source before medium, no spaces, no dates in the source field — plus a saved builder link used for every campaign. It sits in a document now, not in memory.',
      'A secondary finding: naming convention failures look like measurement failures. Half of what people call bad data is bad labelling.'
    ],
    findings: [
      'Naming conventions are a data quality control, not a formatting preference.',
      'A saved builder link prevents more mistakes than a rule people have to remember.',
      'Inconsistent labels read as inconsistent performance.'
    ],
    next: 'Add a validation column to the campaign sheet that flags non-conforming links.',
    tools: ['sheets', 'ga4'],
    skills: ['utm-tracking', 'sheets-data'],
    missions: ['M-008'],
    tags: ['tracking', 'process', 'data hygiene']
  },
  {
    id: 'lab-011',
    slug: 'comments-as-research',
    title: 'Reading the comments as research',
    date: '2026-07',
    category: 'MARKETING',
    status: 'COMPLETED',
    summary:
      'Collected customer language from public review sections and comment threads for a week, without deviating from the actual words used.',
    body: [
      'Businesses describe their product in their own vocabulary. Customers describe it in theirs. The gap between the two is where most unclear copy comes from.',
      'For a week, phrases were collected verbatim into a spreadsheet: how people named the problem, what they were worried about, what they compared it to. No paraphrasing allowed, because paraphrasing quietly restores the marketing voice.',
      'The resulting list of phrases is now the first place to look when writing a heading. It is unglamorous research and it has more effect on clarity than any tone-of-voice document.'
    ],
    findings: [
      'Collect verbatim language; paraphrasing reintroduces your own assumptions.',
      'Customers name the problem, businesses name the solution — use both.',
      'Objections appear in reviews long before they appear in a sales conversation.'
    ],
    next: 'Map the collected phrases directly onto page headings and measure the change.',
    tools: ['sheets', 'notion'],
    skills: ['audience-research', 'writing-clarity', 'positioning'],
    missions: ['M-005', 'M-003'],
    tags: ['research', 'language', 'copy']
  },
  {
    id: 'lab-012',
    slug: 'palette-contrast-checks',
    title: 'Rebuilt the palette around contrast checks',
    date: '2026-05',
    category: 'DESIGN',
    status: 'COMPLETED',
    summary:
      'A dark palette that looked excellent on a laptop was nearly unreadable outdoors. Every pair is now measured, not judged by eye.',
    body: [
      'The original palette was chosen by feel, which works until it meets a mid-range phone screen in daylight. Three of the six colour pairs failed contrast badly and one accent was invisible on the darker surface.',
      'Every combination used for text and interface states was checked and adjusted until it passed. Where a colour could not be fixed without losing its role, it was restricted to decoration only — never used to carry meaning.',
      'The rule that came out of it: colour never communicates state alone. Every status also has a label, a shape or a text weight doing the same job.'
    ],
    findings: [
      'Colour is unreliable on real devices; pair it with text or shape.',
      'An accent that only works on one surface is a liability, not an accent.',
      'Measuring contrast takes minutes and is not a matter of taste.'
    ],
    next: 'Audit this site’s dark surfaces against the same checks before each release.',
    tools: ['figma'],
    skills: ['colour-contrast', 'design-systems'],
    missions: ['M-006', 'M-002'],
    tags: ['accessibility', 'colour', 'contrast']
  },
  {
    id: 'lab-013',
    slug: 'crawled-my-own-site',
    title: 'Crawled my own site and found the boring errors',
    date: '2026-09',
    category: 'SEO',
    status: 'ACTIVE',
    summary:
      'First crawl of a personal site: broken internal links, three duplicate titles and a redirect chain nobody had noticed.',
    body: [
      'Running a crawler on your own site is a humbling thirty minutes. Nothing was catastrophic; almost everything was careless.',
      'Three pages shared a title, several internal links pointed at redirects, and one image was over a megabyte. None of it required expertise to fix — it required looking.',
      'The crawl is now part of the publish checklist. Technical SEO is often described as advanced, but the first pass is mostly tidying up after yourself.'
    ],
    findings: [
      'Most early technical SEO work is maintenance, not optimisation.',
      'Duplicate titles are easy to create accidentally with templates.',
      'Crawl your own site before offering to crawl anyone else’s.'
    ],
    next: 'Automate the crawl in the build step and flag regressions in the log.',
    tools: ['screaming-frog', 'search-console', 'pagespeed'],
    skills: ['technical-seo', 'on-page-seo', 'performance'],
    missions: ['M-004', 'M-007'],
    tags: ['technical seo', 'audit', 'maintenance']
  },
  {
    id: 'lab-014',
    slug: 'javascript-build-budget',
    title: 'A build budget: 200KB of JavaScript',
    date: '2026-09',
    category: 'WEB',
    status: 'ONGOING',
    summary:
      'This site was written inside a hard budget: no framework, no animation library and almost no JavaScript on the critical path.',
    body: [
      'The temptation with an interface like this one is a component framework and a motion library. Both would have been justified in the abstract and both would have cost the visitor a slower first load for very little in return.',
      'Instead the site ships as static HTML with a small set of native ES modules, a build script that generates every page, and CSS for all animation. Interaction is layered on top of content that already works without it.',
      'The budget is written down so it survives enthusiasm: a hard limit on script weight, images served in modern formats with explicit dimensions, and no third-party requests on the critical path.'
    ],
    findings: [
      'Content that works without JavaScript is also content that survives a bad connection.',
      'CSS handles transitions, reveals and state changes without a library.',
      'Budgets only work if they are written down and checked at build time.'
    ],
    next: 'Add automated size checks to the build so a regression fails loudly.',
    tools: ['vscode', 'github', 'pagespeed'],
    skills: ['html-css-literacy', 'performance', 'design-systems'],
    missions: ['M-002'],
    tags: ['performance', 'static site', 'budget']
  },
  {
    id: 'lab-015',
    slug: 'page-builder-vs-block-editor',
    title: 'Tested a page builder against the block editor',
    date: '2026-08',
    category: 'EXPERIMENTS',
    status: 'COMPLETED',
    summary:
      'Same page, same content, two build paths — timed for assembly and then timed again for a realistic edit three months later.',
    body: [
      'The builder won the first measurement comfortably: roughly half the assembly time. It lost the second measurement, which is the one that matters over a project’s life.',
      'Simple edits took longer, markup was harder to inspect, and a plugin update had visibly shifted a spacing rule. Nothing broke, but the page had changed without anyone deciding to change it.',
      'The conclusion is not that page builders are wrong — they are a reasonable choice when the client will edit the site themselves and the design is simple. It is that the choice should be made on maintenance, not on build speed.'
    ],
    findings: [
      'Optimise for the edit six months later, not the build this afternoon.',
      'Unexpected visual drift is a maintenance cost, not a bug.',
      'Write the trade-off down, or the argument restarts next project.'
    ],
    next: 'Document a short decision tree for choosing a build approach.',
    tools: ['wordpress', 'elementor', 'vscode'],
    skills: ['wordpress', 'page-structure', 'hosting-domains'],
    missions: ['M-007'],
    tags: ['wordpress', 'comparison', 'maintenance']
  },
  {
    id: 'lab-016',
    slug: 'wrote-empty-states-first',
    title: 'Wrote the empty states first',
    date: '2026-09',
    category: 'DESIGN',
    status: 'COMPLETED',
    summary:
      'Before building any content page for this site, the state for “nothing here yet” was designed and written for each one.',
    body: [
      'Most portfolio systems are designed on the assumption that the evidence already exists. This one had to be built while it does not — which turned out to be the more useful constraint.',
      'Each module got an empty state before a filled one: what it will hold, which fields are required, and why nothing is listed yet. The achievements locker, the published-work list and the client record were all specified this way.',
      'The result is a system that can be published honestly today and improved incrementally, without ever redesigning a page to accommodate the first real entry. That is a content architecture decision that happened to look like a design decision.'
    ],
    findings: [
      'Design the absence before the presence, or the absence looks broken.',
      'An empty state is a specification for the content that will fill it.',
      'Saying “nothing yet, and here is why” is stronger than saying nothing.'
    ],
    next: 'Keep the empty-state copy under review as real entries replace it.',
    tools: ['figma', 'notion'],
    skills: ['design-systems', 'layout-grid', 'writing-clarity'],
    missions: ['M-002'],
    tags: ['systems', 'empty states', 'content model']
  }
];

export const labCategories = ['ALL', 'SEO', 'DESIGN', 'CONTENT', 'MARKETING', 'WEB', 'EXPERIMENTS'];
export const labStatuses = ['ACTIVE', 'ONGOING', 'COMPLETED', 'PAUSED', 'IDEA'];

export default learningEntries;
