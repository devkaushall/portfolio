/**
 * SKILL TREE
 * ---------------------------------------------------------------------------
 * The tree is organised into branches. Each node declares a LEVEL from the
 * four-level ladder below — never a self-assigned percentage.
 *
 *   LEARNING          Following guidance or a course; needs a reference open.
 *   PRACTISING        Doing it repeatedly on real tasks; still checking work.
 *   DEVELOPING        Doing it unaided and improving; not yet routine.
 *   WORKING KNOWLEDGE Reliable for real work; can explain and defend choices.
 *
 * Levels are self-assessed. Edit them as the work changes — the legend, the
 * node pips, the branch counters and the filters all read from this file.
 */

export const skillLevels = [
  { id: 'LEARNING', rank: 1, short: 'LRN', description: 'Following guidance or a course; a reference is always open.' },
  { id: 'PRACTISING', rank: 2, short: 'PRC', description: 'Repeating it on real tasks; still checking the work.' },
  { id: 'DEVELOPING', rank: 3, short: 'DEV', description: 'Doing it unaided and improving; not yet routine.' },
  { id: 'WORKING KNOWLEDGE', rank: 4, short: 'WRK', description: 'Reliable for real work; can explain and defend choices.' }
];

export const skillBranches = [
  {
    id: 'digital-marketing',
    index: 'B-01',
    label: 'DIGITAL MARKETING',
    icon: 'target',
    summary: 'How a business gets found, understood and chosen — the strategic layer under every channel.',
    status: 'CORE',
    nodes: [
      {
        id: 'marketing-fundamentals',
        name: 'Marketing fundamentals',
        level: 'LEARNING',
        summary: 'Audience, offer, channel fit and the difference between attention and demand.',
        tools: ['notion', 'chatgpt'],
        missions: []
      },
      {
        id: 'audience-research',
        name: 'Audience & customer research',
        level: 'LEARNING',
        summary: 'Reading reviews, comments and search queries to hear how people describe the problem themselves.',
        tools: ['chatgpt', 'sheets', 'notion'],
        missions: ['M-005']
      },
      {
        id: 'positioning',
        name: 'Positioning & messaging',
        level: 'PRACTISING',
        summary: 'Reducing a business to one defensible sentence, then building the page or post around it.',
        tools: ['notion', 'figma'],
        missions: ['M-001', 'M-003']
      },
      {
        id: 'campaign-planning',
        name: 'Campaign planning',
        level: 'LEARNING',
        summary: 'Objective, audience, message, channel and a way of knowing whether it worked.',
        tools: ['notion', 'sheets', 'meta-business'],
        missions: ['M-005']
      },
      {
        id: 'funnel-basics',
        name: 'Funnel & journey basics',
        level: 'LEARNING',
        summary: 'Mapping what has to be true before someone enquires, rather than counting post likes.',
        tools: ['sheets', 'ga4'],
        missions: ['M-008']
      }
    ]
  },
  {
    id: 'seo',
    index: 'B-02',
    label: 'SEO',
    icon: 'search',
    summary: 'Earning attention that already exists. Slow, structural and mostly unglamorous.',
    status: 'CURRENT FOCUS',
    nodes: [
      {
        id: 'keyword-research',
        name: 'Keyword & topic research',
        level: 'PRACTISING',
        summary: 'Grouping queries by meaning instead of volume, and rejecting topics the business cannot serve.',
        tools: ['ahrefs', 'ubersuggest', 'sheets'],
        missions: ['M-004']
      },
      {
        id: 'search-intent',
        name: 'Search intent mapping',
        level: 'PRACTISING',
        summary: 'Reading the SERP before writing: what format is already winning, and why.',
        tools: ['search-console', 'ahrefs'],
        missions: ['M-004']
      },
      {
        id: 'on-page-seo',
        name: 'On-page optimisation',
        level: 'PRACTISING',
        summary: 'Titles, headings, internal links and descriptive metadata that match the page honestly.',
        tools: ['rank-math', 'wordpress'],
        missions: ['M-004', 'M-002']
      },
      {
        id: 'technical-seo',
        name: 'Technical foundations',
        level: 'LEARNING',
        summary: 'Indexing, canonical tags, sitemaps — currently learning the parts that actually move the needle.',
        tools: ['search-console', 'screaming-frog'],
        missions: ['M-004']
      },
      {
        id: 'search-console',
        name: 'Search Console & reporting',
        level: 'PRACTISING',
        summary: 'Query, coverage and enhancement reports read as evidence rather than as a scoreboard.',
        tools: ['search-console', 'sheets'],
        missions: ['M-004', 'M-008']
      }
    ]
  },
  {
    id: 'content-strategy',
    index: 'B-03',
    label: 'CONTENT STRATEGY',
    icon: 'pen',
    summary: 'Turning a pile of ideas into something coherent, useful and repeatable.',
    status: 'CURRENT FOCUS',
    nodes: [
      {
        id: 'idea-capture',
        name: 'Idea capture & research',
        level: 'PRACTISING',
        summary: 'One place for raw ideas, reviewed weekly — so nothing good is lost to memory.',
        tools: ['notion', 'chatgpt'],
        missions: ['M-003']
      },
      {
        id: 'editorial-formats',
        name: 'Editorial formats',
        level: 'PRACTISING',
        summary: 'Knowing whether an idea wants to be a note, a carousel, a page or a three-minute video.',
        tools: ['canva', 'notion'],
        missions: ['M-003', 'M-005']
      },
      {
        id: 'writing-clarity',
        name: 'Writing for clarity',
        level: 'PRACTISING',
        summary: 'Short sentences, plain words, one idea per paragraph. Edited until it stops being tiring to read.',
        tools: ['notion', 'grammarly'],
        missions: ['M-001', 'M-003']
      },
      {
        id: 'repurposing',
        name: 'Repurposing & distribution',
        level: 'LEARNING',
        summary: 'Making one substantial idea produce several smaller pieces without repetition.',
        tools: ['notion', 'canva'],
        missions: ['M-003']
      },
      {
        id: 'editorial-calendar',
        name: 'Editorial calendar',
        level: 'PRACTISING',
        summary: 'A schedule modest enough to keep, with room for whatever the week actually brings.',
        tools: ['notion', 'sheets'],
        missions: ['M-003', 'M-005']
      }
    ]
  },
  {
    id: 'design',
    index: 'B-04',
    label: 'DESIGN',
    icon: 'layers',
    summary: 'Making things legible. Layout, type and colour in service of the message.',
    status: 'CORE',
    nodes: [
      {
        id: 'layout-grid',
        name: 'Layout & grid',
        level: 'PRACTISING',
        summary: 'Alignment, spacing rhythm and hierarchy — the decisions that make a page feel considered.',
        tools: ['figma', 'canva'],
        missions: ['M-002', 'M-006']
      },
      {
        id: 'typography',
        name: 'Typography',
        level: 'PRACTISING',
        summary: 'Scale, weight and measure used to control where the eye lands first.',
        tools: ['figma', 'photoshop'],
        missions: ['M-006', 'M-002']
      },
      {
        id: 'colour-contrast',
        name: 'Colour & contrast',
        level: 'PRACTISING',
        summary: 'Restrained palettes, and contrast ratios checked rather than eyeballed.',
        tools: ['figma'],
        missions: ['M-006']
      },
      {
        id: 'brand-assets',
        name: 'Brand assets',
        level: 'PRACTISING',
        summary: 'Repeatable templates, social kits and layout rules that survive contact with daily use.',
        tools: ['canva', 'figma'],
        missions: ['M-005', 'M-002']
      },
      {
        id: 'design-systems',
        name: 'Design systems',
        level: 'LEARNING',
        summary: 'Components, tokens and states — the point where design starts behaving like engineering.',
        tools: ['figma', 'vscode'],
        missions: ['M-002']
      }
    ]
  },
  {
    id: 'social-media',
    index: 'B-05',
    label: 'SOCIAL MEDIA',
    icon: 'signal',
    summary: 'Platform-native publishing, community behaviour and the discipline of showing up.',
    status: 'ACTIVE',
    nodes: [
      {
        id: 'platform-formats',
        name: 'Platform formats',
        level: 'PRACTISING',
        summary: 'Writing and designing for how each platform is actually consumed, not for how it is described.',
        tools: ['canva', 'meta-business'],
        missions: ['M-005', 'M-003']
      },
      {
        id: 'content-calendar',
        name: 'Content calendars',
        level: 'PRACTISING',
        summary: 'Planning a month without over-committing to a schedule nobody can sustain.',
        tools: ['notion', 'later', 'buffer'],
        missions: ['M-005']
      },
      {
        id: 'community-replies',
        name: 'Community & replies',
        level: 'LEARNING',
        summary: 'Comment sections as research, and answering without sounding like a support script.',
        tools: ['meta-business'],
        missions: []
      },
      {
        id: 'paid-basics',
        name: 'Paid social basics',
        level: 'LEARNING',
        summary: 'Objective setting, audience definition and reading a result honestly. No campaign spend claimed.',
        tools: ['meta-business', 'ga4'],
        missions: []
      }
    ]
  },
  {
    id: 'web-wordpress',
    index: 'B-06',
    label: 'WEB + WORDPRESS',
    icon: 'wrench',
    summary: 'Shipping pages someone else can maintain, on infrastructure that will not fight them later.',
    status: 'STRONGEST',
    nodes: [
      {
        id: 'wordpress',
        name: 'WordPress builds',
        level: 'WORKING KNOWLEDGE',
        summary: 'Blocks, reusable patterns and sensible plugin restraint for small business sites.',
        tools: ['wordpress', 'elementor', 'rank-math'],
        missions: ['M-001', 'M-007']
      },
      {
        id: 'page-structure',
        name: 'Page & IA structure',
        level: 'WORKING KNOWLEDGE',
        summary: 'Ordering content as a decision path: what it is, why it is credible, what happens next.',
        tools: ['figma', 'wordpress'],
        missions: ['M-001', 'M-002']
      },
      {
        id: 'html-css-literacy',
        name: 'HTML & CSS literacy',
        level: 'DEVELOPING',
        summary: 'Editing markup and writing layout CSS confidently; debugging rather than copying fixes blindly.',
        tools: ['vscode', 'github'],
        missions: ['M-002']
      },
      {
        id: 'performance',
        name: 'Performance basics',
        level: 'LEARNING',
        summary: 'Image weight, font loading and layout stability — tested on slow connections, not just locally.',
        tools: ['pagespeed', 'vscode'],
        missions: ['M-007', 'M-002']
      },
      {
        id: 'hosting-domains',
        name: 'Hosting, domains & handover',
        level: 'WORKING KNOWLEDGE',
        summary: 'DNS, SSL, staging and a written handover an owner can follow without a call.',
        tools: ['hostinger', 'notion'],
        missions: ['M-001', 'M-007']
      }
    ]
  },
  {
    id: 'analytics',
    index: 'B-07',
    label: 'ANALYTICS',
    icon: 'chart',
    summary: 'Answering a question with data instead of decorating a dashboard.',
    status: 'DEVELOPING',
    nodes: [
      {
        id: 'ga4-basics',
        name: 'GA4 fundamentals',
        level: 'LEARNING',
        summary: 'Events, conversions and reports — working through one real question per session.',
        tools: ['ga4', 'sheets'],
        missions: ['M-008']
      },
      {
        id: 'reporting',
        name: 'Reporting & conclusions',
        level: 'LEARNING',
        summary: 'Writing short findings that include what the data cannot explain.',
        tools: ['sheets', 'looker-studio'],
        missions: ['M-008']
      },
      {
        id: 'utm-tracking',
        name: 'UTM & tracking hygiene',
        level: 'DEVELOPING',
        summary: 'Consistent naming conventions so campaign data is comparable rather than accidental.',
        tools: ['sheets', 'ga4'],
        missions: ['M-008']
      },
      {
        id: 'sheets-data',
        name: 'Spreadsheet analysis',
        level: 'PRACTISING',
        summary: 'Pivot tables, lookups and clean exports — the least fashionable and most useful analytics skill.',
        tools: ['sheets'],
        missions: ['M-008', 'M-004']
      }
    ]
  },
  {
    id: 'creative-production',
    index: 'B-08',
    label: 'CREATIVE PRODUCTION',
    icon: 'film',
    summary: 'Finishing work: the editing pass that turns assets into something publishable.',
    status: 'ACTIVE',
    nodes: [
      {
        id: 'photo-editing',
        name: 'Photo editing',
        level: 'DEVELOPING',
        summary: 'Cropping, grading and retouching for social formats without over-processing the subject.',
        tools: ['photoshop', 'lightroom'],
        missions: ['M-005']
      },
      {
        id: 'video-editing',
        name: 'Short-form video editing',
        level: 'PRACTISING',
        summary: 'Cutting for retention: hook, pace, captions, sound. Vertical-first by default.',
        tools: ['capcut', 'premiere'],
        missions: ['M-005']
      },
      {
        id: 'motion-basics',
        name: 'Motion basics',
        level: 'LEARNING',
        summary: 'Simple transitions and kinetic text that do not get in the way of the message.',
        tools: ['after-effects', 'capcut'],
        missions: ['M-006']
      },
      {
        id: 'audio-basics',
        name: 'Audio basics',
        level: 'LEARNING',
        summary: 'Levels, background noise and voice clarity — usually the difference between amateur and edited.',
        tools: ['premiere', 'capcut'],
        missions: []
      },
      {
        id: 'ai-assisted',
        name: 'AI-assisted production',
        level: 'PRACTISING',
        summary: 'Using models for drafts, variations and grunt work, then editing everything by hand.',
        tools: ['chatgpt', 'midjourney'],
        missions: ['M-002', 'M-003']
      }
    ]
  }
];

/** Flat node lookup so missions/tools can cross-reference skills by id. */
export const skillIndex = Object.fromEntries(
  skillBranches.flatMap((b) => b.nodes.map((n) => [n.id, { ...n, branch: b.label, branchId: b.id }]))
);

export default skillBranches;
