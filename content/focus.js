/**
 * CURRENT FOCUS
 * ---------------------------------------------------------------------------
 * Three focus areas, carried over from the reference build. Each one exposes
 * a label, a one-line description and a *checklist-based* progress signal.
 *
 * Progress is never a made-up percentage: it is simply the number of completed
 * steps out of the steps listed. Tick a step (`done: true`) and the meter,
 * counter and stage label all update on the next build.
 *
 * Useful vocabulary for `stage`: LEARNING | PRACTISING | WORKING KNOWLEDGE
 * (the same four-level ladder used by the skill tree).
 */

export const focusAreas = [
  {
    id: 'wordpress-deployment',
    index: 'F-01',
    label: 'WORDPRESS DEPLOYMENT',
    tagline: 'Clean & responsive business sites',
    summary:
      'Designing and setting up high-converting landing pages and property showcase sites using WordPress, Elementor, and Astra theme.',
    stage: 'WORKING KNOWLEDGE',
    accent: 'signal',
    updated: '2026-10',
    selfReported: true,
    steps: [
      { label: 'Responsive Elementor layouts', done: true },
      { label: 'Form & WhatsApp lead triggers', done: true },
      { label: 'Property listing catalog structures', done: true },
      { label: 'Client handover documentation', done: false }
    ],
    next: 'Package 3 live real-estate templates for quick agency client deployment.',
    links: [
      { label: 'Missions', file: 'missions.html' },
      { label: 'Skill Tree', file: 'skill-tree.html' }
    ]
  },
  {
    id: 'site-performance',
    index: 'F-02',
    label: 'SITE PERFORMANCE',
    tagline: 'LiteSpeed cache & Core Web Vitals',
    summary:
      'Configuring server-level caching, WebP next-gen image compression, CSS/JS deferral, and achieving 80+ scores on PageSpeed Insights.',
    stage: 'PRACTISING',
    accent: 'moss',
    updated: '2026-10',
    selfReported: true,
    steps: [
      { label: 'LiteSpeed server cache rules', done: true },
      { label: 'WebP image replacement pipeline', done: true },
      { label: 'Render-blocking JS deferral', done: true },
      { label: 'Database & transient cleanup routine', done: false }
    ],
    next: 'Complete speed audit on dev.digitalindiahub.com and benchmark with PageSpeed Insights.',
    links: [
      { label: 'Arsenal', file: 'arsenal.html' },
      { label: 'Skill Tree', file: 'skill-tree.html' }
    ]
  },
  {
    id: 'web-operations',
    index: 'F-03',
    label: 'WEB OPERATIONS',
    tagline: 'Technical maintenance & SEO setup',
    summary:
      'Zero-downtime website backups, cPanel file management, troubleshooting stuck maintenance files, and clean on-page technical SEO.',
    stage: 'PRACTISING',
    accent: 'sand',
    updated: '2026-10',
    selfReported: true,
    steps: [
      { label: 'Cloud backup routines (UpdraftPlus)', done: true },
      { label: 'cPanel file management & error fixes', done: true },
      { label: 'On-page meta tags & heading hierarchy', done: true },
      { label: 'Disaster recovery runbook', done: false }
    ],
    next: 'Document step-by-step troubleshooting guide for WordPress critical errors.',
    links: [
      { label: 'Missions', file: 'missions.html' },
      { label: 'HQ', file: 'hq.html' }
    ]
  }
];

export default focusAreas;
