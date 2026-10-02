/**
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Global settings for the command centre. This is the first file to edit when
 * deploying the site to a real domain or wiring up the contact form.
 */

export const site = {
  // Used for canonical URLs, Open Graph tags, sitemap.xml and robots.txt.
  // Change this to the live domain before deploying.
  url: 'https://dev.digitalindiahub.com',

  // Shown in the browser tab and appended to every page title.
  name: 'Dev Kaushal',
  titleSuffix: 'Dev Kaushal — Command Centre',

  // Build/version metadata surfaced in the status layer.
  version: '1.0.0',
  buildDate: '2026-10-02',

  // Where the contact form posts to.
  //
  // Leave empty ('') to run the form in SAFE MODE: the form validates, confirms
  // receipt in the UI and tells the visitor that no delivery channel is wired
  // up yet. It never pretends a message was delivered.
  //
  // To enable live delivery, set this to a form endpoint that accepts a JSON
  // POST, for example a Formspree/Basin/Netlify Forms URL:
  //   contactEndpoint: 'https://formspree.io/f/xxxxxxx'
  contactEndpoint: '',

  // Optional: plain email address. When present, it is shown in HQ and used as
  // a fallback link on the contact form. Leave empty to display an empty state.
  publicEmail: 'devkaushal8923@gmail.com',

  // Social / outbound profiles. `null` URL = renders as a designed empty state
  // instead of a dead link. Add a URL to activate any row.
  socials: [
    { label: 'Website', handle: 'dev.digitalindiahub.com', url: 'https://dev.digitalindiahub.com', state: 'active' },
    { label: 'LinkedIn', handle: 'dev-kaushal-8215373ab', url: 'https://linkedin.com/in/dev-kaushal-8215373ab', state: 'active' },
    { label: 'WhatsApp', handle: '+91 8923162439', url: 'https://wa.me/918923162439', state: 'active' },
    { label: 'GitHub', handle: 'devkaushall', url: 'https://github.com/devkaushall', state: 'active' },
    { label: 'Email', handle: 'devkaushal8923@gmail.com', url: 'mailto:devkaushal8923@gmail.com', state: 'active' }
  ],

  // Analytics: no third-party scripts are loaded by default. If you add one,
  // load it in the <head> of build.js with defer and update the privacy note
  // in hq page content.
  analytics: null,

  // Accessibility / UX
  reducedMotionRespected: true
};

export default site;
