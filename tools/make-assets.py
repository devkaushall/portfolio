#!/usr/bin/env python3
"""
BRAND ASSET GENERATOR (one-off)
-------------------------------------------------------------------------------
Produces the raster brand assets that live in assets/img/:

    favicon.svg        hand-written (see FAVICON below)
    icon-192.png       PWA / Android icon
    icon-512.png       PWA / Android icon, large
    apple-touch-icon.png
    og-image.png       1200×630 social card

These are committed to the repository. Re-run this script only when the
branding, palette or tagline changes:

    pip install pillow cairosvg
    python3 tools/make-assets.py

Fonts are fetched from the Google Fonts repository (SIL Open Font License) so
the social card matches the site's typography.
"""

import io
import os
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")
os.makedirs(IMG, exist_ok=True)

# ── Palette (mirrors assets/css/01-tokens.css) ─────────────────────────────
INK = (11, 23, 31)
INK_DEEP = (6, 15, 22)
INK_PANEL = (15, 30, 40)
PAPER = (246, 242, 236)
SAND = (232, 219, 199)
SLATE = (156, 169, 171)
SIGNAL = (200, 106, 56)
SIGNAL_LIGHT = (229, 148, 95)
MOSS = (124, 154, 106)
LINE = (45, 62, 74)

FONT_SOURCES = {
    "Sora": "https://raw.githubusercontent.com/google/fonts/main/ofl/sora/Sora%5Bwght%5D.ttf",
    "JetBrainsMono": "https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
}


def fetch_fonts() -> dict:
    """Download the variable TTFs once and cache them in the system temp dir."""
    import tempfile

    cache = os.path.join(tempfile.gettempdir(), "devk-fonts")
    os.makedirs(cache, exist_ok=True)
    paths = {}
    for name, url in FONT_SOURCES.items():
        path = os.path.join(cache, f"{name}.ttf")
        if not os.path.exists(path):
            urllib.request.urlretrieve(url, path)
        paths[name] = path
    return paths


def face(path: str, size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(path, size)
    try:
        font.set_variation_by_name(weight)
    except Exception:
        pass
    return font


# ── Favicon (hand-written SVG: readable at 16px) ───────────────────────────
FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Dev Kaushal">
  <rect width="64" height="64" fill="#0b171f"/>
  <rect x="0.5" y="0.5" width="63" height="63" fill="none" stroke="#e8dbc7" stroke-opacity="0.22"/>
  <g stroke="#f6f2ec" stroke-width="6.5" stroke-linecap="square" fill="none">
    <path d="M19 13v38"/>
    <path d="M41 13L23 32l18 19"/>
  </g>
  <rect x="45" y="43" width="9" height="9" fill="#c86a38"/>
</svg>
"""

with open(os.path.join(IMG, "favicon.svg"), "w", encoding="utf-8") as fh:
    fh.write(FAVICON)

fonts = fetch_fonts()

# ── Application icons: the same mark, rasterised ──────────────────────────
def icon(size: int) -> Image.Image:
    import cairosvg

    png = cairosvg.svg2png(bytestring=FAVICON.encode("utf-8"), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGB")


for size, name in ((192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")):
    icon(size).save(os.path.join(IMG, name), optimize=True)
    print(f"wrote assets/img/{name}")


# ── Social card ───────────────────────────────────────────────────────────
W, H = 1200, 630
card = Image.new("RGB", (W, H), INK)
draw = ImageDraw.Draw(card, "RGBA")

# Technical lattice
for x in range(0, W, 88):
    draw.line([(x, 0), (x, H)], fill=(45, 62, 74, 60), width=1)
for y in range(0, H, 88):
    draw.line([(0, y), (W, y)], fill=(45, 62, 74, 60), width=1)

# Warm glow, top-left, matching the hero treatment
glow = Image.new("L", (W, H), 0)
gdraw = ImageDraw.Draw(glow)
for i in range(240, 0, -6):
    alpha = int(38 * (1 - i / 240))
    gdraw.ellipse([180 - i * 2.6, 120 - i * 1.5, 180 + i * 2.6, 120 + i * 1.5], fill=alpha)
card.paste(Image.new("RGB", (W, H), SIGNAL), (0, 0), glow)

# Frame ticks
draw.rectangle([40, 40, W - 40, H - 40], outline=(45, 62, 74, 220), width=1)
for cx, cy, dx, dy in ((40, 40, 1, 1), (W - 40, H - 40, -1, -1)):
    draw.line([(cx, cy), (cx + 34 * dx, cy)], fill=SIGNAL_LIGHT, width=2)
    draw.line([(cx, cy), (cx, cy + 34 * dy)], fill=SIGNAL_LIGHT, width=2)

# Micro label
mono = face(fonts["JetBrainsMono"], 20, "Medium")
draw.text((72, 78), "P E R S O N A L   C O M M A N D   C E N T R E", font=mono, fill=SLATE)

# Wordmark
sora_xl = face(fonts["Sora"], 132, "ExtraBold")
x, y = 68, 118
for ch, colour in (("D", PAPER), ("E", PAPER), ("V", PAPER), (".", SIGNAL), ("K", SIGNAL)):
    draw.text((x, y), ch, font=sora_xl, fill=colour)
    x += draw.textlength(ch, font=sora_xl)

# Tagline
sora_l = face(fonts["Sora"], 58, "Bold")
draw.text((72, 300), "CREATIVE MIND.", font=sora_l, fill=PAPER)
draw.text((72, 372), "GROWING SKILLS.", font=sora_l, fill=SAND)

# Rule + positioning line
draw.line([(72, 470), (W - 72, 470)], fill=(45, 62, 74), width=1)
body = face(fonts["JetBrainsMono"], 22, "Regular")
draw.text((72, 494), "No superhero origin story — steady learning, creative experiments", font=body, fill=SLATE)
draw.text((72, 528), "and a growing sense of direction.", font=body, fill=SLATE)

# Status chips
chip = face(fonts["JetBrainsMono"], 20, "Medium")
cx = 72
for label, colour in (("AVAILABLE", MOSS), ("BASED IN INDIA", SLATE), ("DIGITAL MARKETER + DESIGNER", SLATE)):
    w = draw.textlength(label, font=chip)
    draw.rectangle([cx, 534, cx + w + 28, 574], outline=colour, width=1)
    draw.text((cx + 14, 542), label, font=chip, fill=colour)
    cx += w + 44

card.save(os.path.join(IMG, "og-image.png"), optimize=True)
print("wrote assets/img/og-image.png")
