/**
 * ARSENAL / TOOLKIT
 * ---------------------------------------------------------------------------
 * Equipment list, not a brag list. Appearance here means the tool is in use or
 * being learned — never that it is mastered.
 *
 * STATUS vocabulary (deliberately cautious):
 *   LEARNING         Following a course or tutorial to get oriented.
 *   EXPERIMENTING    Using it on small personal tests.
 *   REGULAR USE      In the workflow most weeks.
 *   WORKING KNOWLEDGE Can be relied on for a real deliverable.
 *
 * Icons are generated monograms (see build.js), so no third-party brand assets
 * are bundled and nothing breaks if a vendor changes its logo.
 */

export const toolGroups = [
  { id: 'design', label: 'DESIGN', icon: 'layers', summary: 'Layout, brand assets and interface work.' },
  { id: 'production', label: 'PHOTO + VIDEO', icon: 'film', summary: 'Editing, grading and finishing assets.' },
  { id: 'web', label: 'WEB + WORDPRESS', icon: 'wrench', summary: 'Building and maintaining the page itself.' },
  { id: 'seo', label: 'SEO', icon: 'search', summary: 'Research, on-page work and search reporting.' },
  { id: 'analytics', label: 'ANALYTICS', icon: 'chart', summary: 'Measurement, questions and honest reporting.' },
  { id: 'ai', label: 'AI + CREATIVE', icon: 'spark', summary: 'Assisted drafting, variation and production.' },
  { id: 'social', label: 'SOCIAL + REACH', icon: 'signal', summary: 'Publishing, scheduling and audience contact.' },
  { id: 'productivity', label: 'PRODUCTIVITY', icon: 'grid', summary: 'Notes, docs and the systems that hold it together.' }
];

export const tools = [
  // ── DESIGN ────────────────────────────────────────────────────────────────
  {
    id: 'figma', name: 'Figma', monogram: 'Fi', group: 'design', status: 'REGULAR USE',
    usage: 'Layout, design systems and page structure before anything gets built.',
    note: 'Component and auto-layout workflow is the part still improving.',
    skills: ['layout-grid', 'colour-contrast', 'design-systems']
  },
  {
    id: 'canva', name: 'Canva', monogram: 'Cv', group: 'design', status: 'REGULAR USE',
    usage: 'Fast social assets, template kits and client-side editable files.',
    note: 'Chosen for handover: owners can keep using it without a designer.',
    skills: ['brand-assets', 'editorial-formats']
  },
  {
    id: 'photoshop', name: 'Adobe Photoshop', monogram: 'Ps', group: 'design', status: 'LEARNING',
    usage: 'Cropping, retouching and preparing imagery for the web.',
    note: 'Competent in the core tools; still slow on anything advanced.',
    skills: ['photo-editing', 'typography']
  },
  {
    id: 'illustrator', name: 'Adobe Illustrator', monogram: 'Ai', group: 'design', status: 'LEARNING',
    usage: 'Logo files, simple vectors and print-ready marks.',
    note: 'Basic vector work only. Not presented as a logo designer.',
    skills: ['brand-assets']
  },
  {
    id: 'lightroom', name: 'Lightroom', monogram: 'Lr', group: 'design', status: 'EXPERIMENTING',
    usage: 'Batch grading photos into a consistent look for a feed.',
    skills: ['photo-editing']
  },

  // ── PHOTO + VIDEO ─────────────────────────────────────────────────────────
  {
    id: 'capcut', name: 'CapCut', monogram: 'Cc', group: 'production', status: 'REGULAR USE',
    usage: 'Vertical edits for social: cuts, captions, sound and pacing.',
    skills: ['video-editing', 'motion-basics']
  },
  {
    id: 'premiere', name: 'Adobe Premiere Pro', monogram: 'Pr', group: 'production', status: 'EXPERIMENTING',
    usage: 'Longer edits, audio clean-up and anything CapCut will not finish.',
    note: 'Learning. Expect a slower turnaround than CapCut.',
    skills: ['video-editing', 'audio-basics']
  },
  {
    id: 'after-effects', name: 'After Effects', monogram: 'Ae', group: 'production', status: 'LEARNING',
    usage: 'Simple motion titles and animated brand elements.',
    note: 'Early stage — used sparingly and never promised on a deadline.',
    skills: ['motion-basics']
  },

  // ── WEB + WORDPRESS ───────────────────────────────────────────────────────
  {
    id: 'wordpress', name: 'WordPress', monogram: 'Wp', group: 'web', status: 'WORKING KNOWLEDGE',
    usage: 'The default build platform: block editor, patterns and page structure.',
    skills: ['wordpress', 'page-structure', 'on-page-seo']
  },
  {
    id: 'elementor', name: 'Elementor', monogram: 'El', group: 'web', status: 'REGULAR USE',
    usage: 'Faster builds where a visual editor suits the handover.',
    note: 'Used selectively — it can cost more to maintain than it saves.',
    skills: ['wordpress', 'page-structure']
  },
  {
    id: 'hostinger', name: 'Hostinger / cPanel', monogram: 'Hs', group: 'web', status: 'WORKING KNOWLEDGE',
    usage: 'Hosting, DNS, SSL, email records and staging environments.',
    skills: ['hosting-domains', 'performance']
  },
  {
    id: 'vscode', name: 'VS Code', monogram: 'Vs', group: 'web', status: 'EXPERIMENTING',
    usage: 'HTML, CSS and small scripts — plus understanding the code a theme ships.',
    skills: ['html-css-literacy', 'performance']
  },
  {
    id: 'github', name: 'GitHub', monogram: 'Gh', group: 'web', status: 'EXPERIMENTING',
    usage: 'Version control and publishing this site.',
    note: 'Comfortable with commits and branches; no team workflow experience claimed.',
    skills: ['html-css-literacy']
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  {
    id: 'search-console', name: 'Google Search Console', monogram: 'SC', group: 'seo', status: 'LEARNING',
    usage: 'Indexing, coverage, query data and sitemap submissions.',
    skills: ['search-console', 'search-intent', 'technical-seo']
  },
  {
    id: 'rank-math', name: 'Rank Math', monogram: 'RM', group: 'seo', status: 'REGULAR USE',
    usage: 'Titles, descriptions, schema basics and on-page checks.',
    skills: ['on-page-seo', 'wordpress']
  },
  {
    id: 'yoast', name: 'Yoast SEO', monogram: 'Ys', group: 'seo', status: 'EXPERIMENTING',
    usage: 'Alternative WordPress SEO layer when a project already uses it.',
    skills: ['on-page-seo']
  },
  {
    id: 'ahrefs', name: 'Ahrefs', monogram: 'Ah', group: 'seo', status: 'EXPERIMENTING',
    usage: 'Keyword grouping, SERP inspection and competitor structure.',
    note: 'Free/limited tier. Used for research, not for reporting.',
    skills: ['keyword-research', 'search-intent']
  },
  {
    id: 'ubersuggest', name: 'Ubersuggest', monogram: 'Us', group: 'seo', status: 'LEARNING',
    usage: 'Quick topic and keyword sanity checks on small projects.',
    skills: ['keyword-research']
  },
  {
    id: 'screaming-frog', name: 'Screaming Frog', monogram: 'SF', group: 'seo', status: 'LEARNING',
    usage: 'Crawling a small site to find broken links and duplicate titles.',
    note: 'Learning the free tier — crawling, not log-file analysis.',
    skills: ['technical-seo']
  },

  // ── ANALYTICS ─────────────────────────────────────────────────────────────
  {
    id: 'ga4', name: 'Google Analytics 4', monogram: 'G4', group: 'analytics', status: 'LEARNING',
    usage: 'Traffic behaviour, events and conversion paths — one question at a time.',
    skills: ['ga4-basics', 'utm-tracking', 'funnel-basics']
  },
  {
    id: 'sheets', name: 'Google Sheets', monogram: 'Sh', group: 'analytics', status: 'REGULAR USE',
    usage: 'Content plans, keyword maps, exports and everything that needs a table.',
    skills: ['sheets-data', 'utm-tracking', 'editorial-calendar']
  },
  {
    id: 'looker-studio', name: 'Looker Studio', monogram: 'LS', group: 'analytics', status: 'LEARNING',
    usage: 'Turning a spreadsheet into a one-page read for someone who will not open GA4.',
    skills: ['reporting']
  },

  // ── AI + CREATIVE ─────────────────────────────────────────────────────────
  {
    id: 'chatgpt', name: 'ChatGPT', monogram: 'GP', group: 'ai', status: 'REGULAR USE',
    usage: 'Drafting, outlining, rewriting and arguing with my own first attempt.',
    note: 'Everything published is rewritten by hand. No raw output shipped.',
    skills: ['ai-assisted', 'writing-clarity', 'idea-capture']
  },
  {
    id: 'midjourney', name: 'Midjourney', monogram: 'MJ', group: 'ai', status: 'EXPERIMENTING',
    usage: 'Backgrounds and texture studies for layout experiments.',
    note: 'Not used for people or anything presented as real photography.',
    skills: ['ai-assisted', 'colour-contrast']
  },

  // ── SOCIAL + REACH ────────────────────────────────────────────────────────
  {
    id: 'meta-business', name: 'Meta Business Suite', monogram: 'MB', group: 'social', status: 'LEARNING',
    usage: 'Page scheduling, inbox and the basic audience reports.',
    skills: ['platform-formats', 'paid-basics', 'campaign-planning']
  },
  {
    id: 'later', name: 'Later', monogram: 'Lt', group: 'social', status: 'EXPERIMENTING',
    usage: 'Visual planning of a month of posts before writing any captions.',
    skills: ['content-calendar', 'platform-formats']
  },
  {
    id: 'buffer', name: 'Buffer', monogram: 'Bf', group: 'social', status: 'EXPERIMENTING',
    usage: 'Cross-posting tests and comparing scheduling tools.',
    skills: ['content-calendar']
  },
  {
    id: 'brevo', name: 'Brevo', monogram: 'Bv', group: 'social', status: 'LEARNING',
    usage: 'Newsletter basics: lists, a simple template, one send.',
    note: 'Learning only. No list building or deliverability claims.',
    skills: ['repurposing']
  },

  // ── PRODUCTIVITY ──────────────────────────────────────────────────────────
  {
    id: 'notion', name: 'Notion', monogram: 'No', group: 'productivity', status: 'REGULAR USE',
    usage: 'The content model behind this site: missions, ideas, learning log, checklists.',
    skills: ['idea-capture', 'editorial-calendar', 'editorial-formats']
  },
  {
    id: 'gworkspace', name: 'Google Workspace', monogram: 'GW', group: 'productivity', status: 'REGULAR USE',
    usage: 'Docs, Drive, forms and the shared folders a client actually uses.',
    skills: ['sheets-data']
  },
  {
    id: 'trello', name: 'Trello', monogram: 'Tr', group: 'productivity', status: 'EXPERIMENTING',
    usage: 'Simple board tracking when a project has more than one moving part.',
    skills: ['campaign-planning']
  },
  {
    id: 'grammarly', name: 'Grammarly', monogram: 'Gr', group: 'productivity', status: 'REGULAR USE',
    usage: 'Second pair of eyes on grammar and tone before anything is published.',
    skills: ['writing-clarity']
  },
  {
    id: 'pagespeed', name: 'PageSpeed Insights', monogram: 'PS', group: 'productivity', status: 'LEARNING',
    usage: 'Checking Core Web Vitals and image weight on a real throttled connection.',
    skills: ['performance', 'technical-seo']
  }
];

/** Derived filter lists — keep filters and data in sync automatically. */
export const toolStatuses = ['REGULAR USE', 'WORKING KNOWLEDGE', 'LEARNING', 'EXPERIMENTING'];

export default tools;
