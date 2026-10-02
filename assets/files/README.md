# Downloadable documents

Place files here that visitors can download. The only slot wired into the interface is
the CV/résumé.

```
assets/files/cv.pdf
```

```js
// content/profile.js
resume: {
  url: 'assets/files/cv.pdf',
  label: 'Download CV (PDF)',
  meta: 'Updated Oct 2026',
  bytes: '184 KB'          // optional; shown next to the button if present
}
```

## Behaviour

* While `resume.url` is `null`, HQ shows a designed empty state explaining that no
  document exists yet. No dead button is ever rendered.
* Once a URL is set, the download button appears automatically on the HQ page.

## Guidance

* Keep the PDF under ~500 KB: export text as text (not images), and avoid embedded
  videos or large fonts.
* Add PDF metadata (title, author) so the file is identifiable once downloaded.
* Everything in `assets/files/` is copied verbatim into the build output — do not put
  source documents or drafts here.
