/**
 * STORY MODE
 * ---------------------------------------------------------------------------
 * A modular chapter list. Add a chapter object and it appears in the timeline,
 * in the page's table of contents and in the progression rail — no template
 * changes required.
 *
 * `state` drives the chapter marker: LOGGED | IN PROGRESS | ONGOING | NEXT
 * Period labels are intentionally non-specific: nothing here claims a date
 * that cannot be checked.
 */

export const story = {
  eyebrow: 'STORY MODE: A WORK IN PROGRESS',
  headline: ['HOW CURIOSITY', 'BECAME A PATH.'],
  lead:
    'I help brands communicate clearly through social media, content, design and thoughtful WordPress experiences. This is not a reconstruction of a heroic past — it is the honest order in which the skills arrived.',
  chapters: [
    {
      id: 'CH-00',
      label: 'ORIGIN',
      title: 'Curiosity, with no plan attached',
      period: 'WHERE IT STARTED',
      state: 'LOGGED',
      icon: 'spark',
      body: [
        'It started with noticing things: why one post made sense and another didn’t, why some pages felt calm and others felt like a queue. No strategy, no deck — just an itch to understand how communication works.',
        'There was no grand decision to become a marketer or a designer. There was only the habit of taking an idea apart to see how it was built.'
      ],
      takeaways: ['Curiosity first', 'No formal plan yet', 'Learning by noticing']
    },
    {
      id: 'CH-01',
      label: 'FIRST CONTACT',
      title: 'Visual work: making things look intentional',
      period: 'EARLY DAYS',
      state: 'LOGGED',
      icon: 'layers',
      body: [
        'The first practical skills were visual. Layout, spacing, hierarchy, colour — the difference between a graphic that shouts and one that explains.',
        'Working inside Canva and then Figma taught an early lesson that still holds: most design problems are really editorial problems. Deciding what matters is the hard part; styling it is the easy part.'
      ],
      takeaways: ['Layout and hierarchy', 'Tools: Canva → Figma', 'Taste built by iteration']
    },
    {
      id: 'CH-02',
      label: 'THE WORD PROBLEM',
      title: 'Design was not the hard part. Writing was.',
      period: 'THEN',
      state: 'LOGGED',
      icon: 'pen',
      body: [
        'A layout can be clean and still say nothing. Realising that pushed the work towards copy: noticing what a business actually means, then writing it plainly.',
        'Content became the centre of the practice — captions, page copy, scripts, short pieces that had to earn the next sentence.'
      ],
      takeaways: ['Clarity over cleverness', 'Content as the core skill', 'Story before style']
    },
    {
      id: 'CH-03',
      label: 'SEARCH',
      title: 'Learning how people actually arrive',
      period: 'RECENT',
      state: 'IN PROGRESS',
      icon: 'search',
      body: [
        'Social media asks people to stop. Search asks what they were already looking for. The second one is less glamorous and far more useful to a small business.',
        'Currently working through search intent, page structure, metadata and the slow business of reading Search Console without jumping to conclusions.'
      ],
      takeaways: ['Intent before keywords', 'Structure and metadata', 'Evidence over guesses']
    },
    {
      id: 'CH-04',
      label: 'BUILDING',
      title: 'From files to something a client can run',
      period: 'RECENT',
      state: 'ONGOING',
      icon: 'wrench',
      body: [
        'A design that never leaves a canvas is not finished work. Learning WordPress changed the deliverable: pages that someone else can edit, publish and maintain without calling anyone.',
        'That came with new responsibilities — hosting, structure, loading speed, and the discipline of handing over something documented.'
      ],
      takeaways: ['WordPress delivery', 'Handover-friendly builds', 'Own the whole path']
    },
    {
      id: 'CH-05',
      label: 'NOW',
      title: 'The command centre is the work',
      period: 'CURRENT',
      state: 'ONGOING',
      icon: 'dashboard',
      body: [
        'This site is the current experiment: presenting an early-career practice without inflating it. Goals, missions, tools and lessons, all visible in one place.',
        'The next chapters are already in the lab — technical SEO, content systems, and getting better at saying more with less.'
      ],
      takeaways: ['Learning in public', 'Honest presentation', 'Systems thinking']
    }
  ],
  // Where the story is heading. Kept separate so it can be edited as a block.
  nextSteps: [
    { label: 'Technical SEO', detail: 'Indexing, page speed, structured data.' },
    { label: 'Content systems', detail: 'Turning one idea into a week of useful output.' },
    { label: 'Design restraint', detail: 'Fewer elements, stronger hierarchy.' },
    { label: 'Client-ready delivery', detail: 'Clear scopes, documented handovers, no loose ends.' }
  ]
};

export default story;
