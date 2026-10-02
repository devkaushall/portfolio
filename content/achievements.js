/**
 * ACHIEVEMENTS / CERTIFICATES
 * ---------------------------------------------------------------------------
 * HOUSE RULES FOR THIS FILE — please keep them:
 *
 *   • No award, certification, ranking, client or metric appears here unless it
 *     can be referenced. The default state of the system is a designed empty
 *     slot, not an invented trophy.
 *   • `verification.status` is one of:
 *       'UNVERIFIED'  — self-declared, no link or reference available yet.
 *       'REFERENCED'  — a public URL or document backs the entry.
 *       'PENDING'     — a credential exists but the link is not published yet.
 *   • `credentialUrl: null` renders a designed "credential link not published"
 *     row instead of a dead button.
 *
 * TYPE vocabulary: CERTIFICATE | LEARNING MILESTONE | PROJECT MILESTONE |
 *                  PUBLISHED WORK
 */

export const achievements = [
  {
    id: 'A-001',
    type: 'PROJECT MILESTONE',
    title: 'Command Centre v1.0 shipped',
    issuer: 'Self-published',
    issuerKind: 'PERSONAL PROJECT',
    date: '2026-09',
    year: '2026',
    category: 'WEB',
    summary:
      'A complete portfolio system was designed, built and published — content model, accessibility pass, performance budget and all destinations live.',
    evidence: 'The site itself is the evidence.',
    relatedMissions: ['M-002'],
    credential: {
      label: 'Open the project record',
      url: 'case-002-command-centre-v1.html',
      external: false
    },
    verification: {
      status: 'REFERENCED',
      method: 'PUBLIC ARTEFACT',
      reference: 'This website',
      note: 'Verifiable by inspection. Not an award and not a certification.'
    }
  },
  {
    id: 'A-002',
    type: 'PROJECT MILESTONE',
    title: 'First complete brief delivered end to end',
    issuer: 'Rathi Properties brief',
    issuerKind: 'PRACTICAL BRIEF',
    date: '2026-06',
    year: '2026',
    category: 'WEB',
    summary:
      'Message, structure, design and a maintainable WordPress build completed as one continuous piece of work.',
    evidence: 'Recorded in the mission log without commercial or performance claims.',
    relatedMissions: ['M-001'],
    credential: {
      label: 'Open the case file',
      url: 'case-001-rathi-properties.html',
      external: false
    },
    verification: {
      status: 'REFERENCED',
      method: 'INTERNAL RECORD',
      reference: 'Mission M-001',
      note: 'Presented as practical experience, not as client work or a commercial result.'
    }
  }
];

/**
 * The rest of the locker is intentionally empty. Each entry below renders as a
 * designed empty-state card with the exact fields needed to fill it. Replace the
 * `slots` array with real records when they exist.
 */
export const achievementSlots = [
  {
    id: 'slot-certificates',
    type: 'CERTIFICATE',
    title: 'No certificates published yet',
    body:
      'Certificates appear here only once a credential link can be provided. Nothing is listed as completed coursework until it is finished and referenceable.',
    fields: ['Title', 'Issuing organisation', 'Completion date', 'Credential URL'],
    cta: { label: 'See the certificates module', file: 'certificates.html' }
  },
  {
    id: 'slot-published',
    type: 'PUBLISHED WORK',
    title: 'No published articles indexed yet',
    body:
      'Once writing is live on a public domain, each piece is listed with its publication, date and a live link.',
    fields: ['Title', 'Publication', 'Published date', 'Live URL'],
    cta: { label: 'See what is in the lab', file: 'learning-lab.html' }
  },
  {
    id: 'slot-client',
    type: 'CLIENT MILESTONE',
    title: 'No client engagements on record',
    body:
      'There is no client list here because there is no client list yet. When paid or formally commissioned work exists, it will be listed with the scope and the client’s permission — never before.',
    fields: ['Client', 'Scope', 'Period', 'Permission to publish'],
    cta: { label: 'See practice missions instead', file: 'missions.html' }
  }
];

/** Verification note shown on every achievements view. */
export const verificationPolicy = {
  title: 'VERIFICATION POLICY',
  body:
    'Every entry states how it can be checked. Items with no public reference are marked as self-declared rather than verified. Self-assessment is labelled as self-assessment throughout this system.',
  levels: [
    { id: 'REFERENCED', description: 'Backed by a public URL, document or inspectable artefact.' },
    { id: 'PENDING', description: 'A credential exists but the link is not published yet.' },
    { id: 'UNVERIFIED', description: 'Self-declared. No reference available — shown as such, not hidden.' }
  ]
};

export default achievements;
