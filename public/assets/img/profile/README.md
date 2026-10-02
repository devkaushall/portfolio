# Portrait slot

Drop the profile image here, then point `content/profile.js` at it.

```
assets/img/profile/portrait.webp      # preferred (or .jpg / .png / .svg)
```

```js
// content/profile.js
portrait: {
  src: 'assets/img/profile/portrait.webp',
  webp: null,                       // optional: a second source for <picture>
  alt: 'Dev Kaushal',               // describe the image, not "profile photo"
  width: 800,
  height: 1000,                     // keep 4:5 — the frame and the layout depend on it
  caption: 'PORTRAIT',
  note: 'Photographed 2026.'
}
```

## What happens automatically

* The abstract `DK` placeholder SVG is replaced by the real image.
* The frame keeps its 4:5 aspect ratio and `object-fit: cover`, so any crop works and
  nothing below it moves (no layout shift — width/height are set on the `<img>`).
* The image loads lazily and is excluded from the mobile critical path.

## Guidance

* 4:5 portrait, ideally 800×1000 or larger. Anything wider than 4:5 is centre-cropped.
* Export as WebP for size, and add a JPEG fallback only if you need very old browser
  support (`.webp` has broad support in 2026).
* Keep the file under ~150 KB. The site's whole performance budget assumes small images.
* A logo or generated identity artwork works just as well as a photograph — the only
  requirement is an honest `alt` description.
