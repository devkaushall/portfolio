/**
 * PLAYER PROFILE
 * ---------------------------------------------------------------------------
 * The identity block used by the command centre header, hero, HQ and footer.
 * All copy here is self-reported. Nothing in this file should claim verified
 * results, awards or client relationships that cannot be evidenced.
 */

export const profile = {
  // Personal mark shown top-left and in the hero.
  mark: { primary: 'DEV', separator: '.', secondary: 'K' },

  name: 'Dev Kaushal',

  role: 'WORDPRESS & WEB OPERATIONS SPECIALIST',

  location: 'GURUGRAM, HARYANA (DELHI NCR)',

  // Availability is a status, not a claim. `state` drives colour + the label's
  // accessible text: 'open' | 'limited' | 'closed'.
  availability: {
    state: 'open',
    label: 'AVAILABLE',
    note: 'Open for Full-Time Roles & WordPress Web Support Deployments.'
  },

  // The single "what am I doing right now" state shown on every screen.
  currentMode: {
    label: 'CURRENT MODE',
    value: 'DEPLOYING',
    note: 'Managing WordPress sites, optimizing site speed, and technical web support.'
  },

  // Hero statement — two stacked lines, as in the reference design.
  tagline: ['RELIABLE CODELESS BUILDS.', 'OPERATIONAL UPTIME.'],

  // The positioning line. Preserved from the reference build.
  intro:
    'Hands-on WordPress specialist focused on clean site deployments, technical maintenance, and speed optimization. Zero fluff—just reliable web operations.',

  // Longer, human version of the intro used on Story Mode and HQ.
  summary:
    'I build and maintain fast, mobile-friendly WordPress websites with Elementor, Astra, and LiteSpeed Cache. I focus on what actually matters to businesses: site uptime, quick load speeds, clean lead forms, and zero-downtime maintenance.',

  // Quote block shown in Story Mode.
  mindset:
    'Websites should simply work: fast to load, easy for clients to update, and reliable when traffic arrives.',

  // Small, personal note from the reference build. Kept as a note, not a slogan.
  companionNote: 'Focused on reliable WordPress builds and technical website maintenance.',

  // Personality tags — descriptive, not performance claims.
  traits: ['DETAIL-ORIENTED', 'PRAGMATIC', 'PROCESS-DRIVEN', 'PROBLEM SOLVER'],

  // Areas of interest / where the work is heading.
  interests: [
    'WordPress technical support and maintenance workflows',
    'LiteSpeed cache and Core Web Vitals optimization',
    'Website migration and disaster recovery without data loss',
    'Clean on-page technical SEO (headings, meta tags, schema)',
    'Practical AI tools for faster site maintenance and code snippets'
  ],

  // Capabilities are phrased as work types, with an honest confidence label so
  // nothing reads as a mastery claim. Level wording matches the skill tree.
  capabilities: [
    {
      title: 'WordPress & Elementor Builds',
      detail: 'Building responsive layouts, landing pages, menus, forms, and WhatsApp lead triggers.',
      level: 'WORKING KNOWLEDGE'
    },
    {
      title: 'Speed & Cache Optimization',
      detail: 'LiteSpeed cache configuration, WebP image compression, and Core Web Vitals auditing.',
      level: 'WORKING KNOWLEDGE'
    },
    {
      title: 'Web Maintenance & Operations',
      detail: 'cPanel navigation, backup routines (UpdraftPlus), and resolving maintenance mode errors.',
      level: 'PRACTISING'
    },
    {
      title: 'Technical On-Page SEO',
      detail: 'Meta titles, meta descriptions, image alt attributes, and clean heading hierarchy.',
      level: 'PRACTISING'
    },
    {
      title: 'Graphic Assets for Web',
      detail: 'Creating clean web banners, hero cards, and promotional visuals using Canva.',
      level: 'WORKING KNOWLEDGE'
    },
    {
      title: 'AI Assisted Web Snippets',
      detail: 'Using ChatGPT and Claude for PHP functions, troubleshooting prompts, and content drafting.',
      level: 'PRACTISING'
    }
  ],

  // Resume/CV. Drop a PDF into assets/files/ and point this at it to activate
  // the download buttons. Left null, the UI shows a designed empty state.
  resume: {
    url: null,
    label: 'Download CV (PDF)',
    meta: 'Not uploaded yet'
  }

  // Portrait / identity image used by the companion module on the command
  // centre. Leave `src` null to render the built-in abstract identity visual.
  // To insert a real photo:
  //   1. Save the file as assets/img/profile/portrait.jpg (or .webp/.svg)
  //   2. Set src below, plus a descriptive alt and the real pixel dimensions.
  // The module keeps the same aspect ratio (4:5) and object-fit: cover, so no
  // layout changes are needed.
  ,
  portrait: {
    src: null,
    webp: null,
    alt: '',
    width: 800,
    height: 1000,
    caption: 'IDENTITY VISUAL — PLACEHOLDER',
    note: 'Slot ready for a portrait, logo or generated artwork (4:5).'
  }
};

export default profile;
