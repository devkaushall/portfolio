/**
 * URL / FILENAME SCHEME
 * ---------------------------------------------------------------------------
 * One place that decides how content records map to pages, so links stay
 * stable and readable:
 *
 *   missions : case-001-rathi-properties.html
 *   log      : log-004-testing-search-intent.html
 *
 * Both use the record's own id and slug from /content.
 */

export const caseFile = (mission) => `case-${mission.id.replace('M-', '')}-${mission.slug}.html`;

export const logFile = (entry) => `log-${entry.id.replace('lab-', '')}-${entry.slug}.html`;
