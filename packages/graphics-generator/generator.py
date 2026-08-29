"""
Autumn Sonagi key-visual generator.

Conforms to ADR 0001:
  §2.3 SSOT      — canonical tokens only, semantic-first, no hardcoded colour
  §2.4           — explicit seed, provenance recorded in SVG metadata
  Rule A         — ripple: 3 rings at 1.0/0.7/0.4, opacity decays with radius
  Rule B         — rain: single shared angle, density cap 180 @ 1200x630
"""

from __future__ import annotations

import argparse
import random
import subprocess
import sys
from pathlib import Path
from xml.sax.saxutils import escape

sys.path.insert(0, str(Path(__file__).parent / "src"))
from tokens import Tokens  # noqa: E402

HERE = Path(__file__).parent
OUTPUT_DIR = HERE / "output"

GENERATOR_VERSION = "0.3.0"

# Rule A — radius bounded so rings close inside the canvas and read as one set
RIPPLE_RATIOS = (1.0, 0.88, 0.76)
RIPPLE_RADIUS_MIN, RIPPLE_RADIUS_MAX = 40, 180
RIPPLE_OPACITY_CAP = 0.4
# Rule B — direction vector (0.4L, 0.9L); every streak shares this angle
RAIN_DX, RAIN_DY = 0.4, 0.9
RAIN_DENSITY_CAP = 180
RAIN_STROKE_WIDTH = 1.2
# Rule F — safe zone: the centre must stay legible as a text carrier
SAFE_ZONE_W, SAFE_ZONE_H = 0.62, 0.44
SAFE_ZONE_KEEP = 0.18  # probability an element inside the safe zone survives
SAFE_ZONE_OPACITY = 0.35  # opacity multiplier for survivors


def build_palette(tokens: Tokens) -> dict[str, str]:
    """Semantic-first palette. Every colour traces back to a token."""
    return {
        "background": tokens.color("color.background.base"),
        "ink": tokens.color("color.brand.ink"),
        "accent": tokens.color("color.brand.accent"),
        "muted": tokens.color("color.text.muted"),
    }
    # NOTE: color.brand.cyan (#00ffcc) is deliberately absent. It is annotated
    # "로고/에셋 전용" in primitives.json and, when used as a field colour over the
    # warm burgundy palette, reads as a glitch rather than rain. Reserved for
    # symbol accents (Rule E).


def in_safe_zone(x: float, y: float, w: int, h: int) -> bool:
    """Rule F — centred region reserved for text."""
    return (
        abs(x - w / 2) < w * SAFE_ZONE_W / 2 and abs(y - h / 2) < h * SAFE_ZONE_H / 2
    )


def safe_zone_gate(rng: random.Random, x: float, y: float, w: int, h: int) -> float | None:
    """Return an opacity multiplier, or None if the element should be dropped."""
    if not in_safe_zone(x, y, w, h):
        return 1.0
    if rng.random() > SAFE_ZONE_KEEP:
        return None
    return SAFE_ZONE_OPACITY


def render_ripples(rng: random.Random, palette: dict[str, str], w: int, h: int) -> list[str]:
    out: list[str] = []
    for _ in range(25):
        cx = rng.randint(-100, w + 100)
        cy = rng.randint(-100, h + 100)
        base_r = rng.randint(RIPPLE_RADIUS_MIN, RIPPLE_RADIUS_MAX)
        base_opacity = rng.uniform(0.05, RIPPLE_OPACITY_CAP)
        # warm palette only; brand.cyan is reserved for symbols (ADR 0001 Rule E)
        colour = rng.choice([palette["accent"], palette["ink"], palette["muted"]])
        gate = safe_zone_gate(rng, cx, cy, w, h)
        if gate is None:
            continue
        for ratio in RIPPLE_RATIOS:
            stroke = rng.uniform(0.5, 2.0) if ratio == 1.0 else 0.5
            out.append(
                f'<circle cx="{cx}" cy="{cy}" r="{base_r * ratio:.2f}" '
                f'stroke="{colour}" stroke-width="{stroke:.2f}" fill="none" '
                f'opacity="{base_opacity * ratio * gate:.3f}" />'
            )
    return out


def render_rain(rng: random.Random, palette: dict[str, str], w: int, h: int, count: int) -> list[str]:
    if count > RAIN_DENSITY_CAP:
        raise ValueError(
            f"rain count {count} exceeds ADR 0001 Rule B density cap {RAIN_DENSITY_CAP}"
        )
    out: list[str] = []
    for _ in range(count):
        x = rng.randint(-200, w + 200)
        y = rng.randint(-200, h)
        length = rng.randint(10, 80)
        colour = rng.choice([palette["accent"], palette["muted"]])
        opacity = rng.uniform(0.1, 0.6)
        gate = safe_zone_gate(rng, x, y, w, h)
        if gate is None:
            continue
        out.append(
            f'<line x1="{x}" y1="{y}" x2="{x + length * RAIN_DX:.2f}" '
            f'y2="{y + length * RAIN_DY:.2f}" stroke="{colour}" '
            f'stroke-width="{RAIN_STROKE_WIDTH}" opacity="{opacity * gate:.3f}" />'
        )
    return out


def generate(
    seed: int, theme: str, width: int, height: int, rain: int, name: str = "autumn-sonagi"
) -> Path:
    tokens = Tokens(theme)
    palette = build_palette(tokens)
    rng = random.Random(seed)

    prov = tokens.provenance()
    meta = (
        f"seed={seed} theme={theme} "
        f"tokens={prov['tokens_version']} generator={GENERATOR_VERSION}"
    )

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" role="img" aria-label="Autumn Sonagi key visual">',
        f"<title>Autumn Sonagi key visual</title>",
        f"<metadata>{escape(meta)}</metadata>",
        f'<rect width="{width}" height="{height}" fill="{palette["background"]}" />',
        '<g data-rule="A-ripple">',
        *render_ripples(rng, palette, width, height),
        "</g>",
        '<g data-rule="B-rain">',
        *render_rain(rng, palette, width, height, rain),
        "</g>",
        "</svg>",
    ]

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    # ADR 0001 §4.2 — {category}-{name}-{variant}-{seed}.{ext}
    stem = f"keyvisual-{name}-{theme}-{seed}"
    svg_path = OUTPUT_DIR / f"{stem}.svg"
    svg_path.write_text("\n".join(parts))
    return svg_path


def rasterize(svg_path: Path, dpi: int = 150) -> Path:
    png_path = svg_path.with_suffix(".png")
    subprocess.run(
        ["inkscape", str(svg_path), "--export-filename", str(png_path), f"--export-dpi={dpi}"],
        check=True,
        capture_output=True,
    )
    return png_path


def main() -> None:
    ap = argparse.ArgumentParser(description="Generate an Autumn Sonagi key visual.")
    ap.add_argument("--seed", type=int, default=1034)
    ap.add_argument("--theme", choices=("light", "dark"), default="dark")
    ap.add_argument("--width", type=int, default=1200)
    ap.add_argument("--height", type=int, default=630)
    ap.add_argument("--rain", type=int, default=150)
    ap.add_argument("--png", action="store_true", help="also rasterize via Inkscape")
    args = ap.parse_args()

    svg_path = generate(args.seed, args.theme, args.width, args.height, args.rain)
    print(f"[+] SVG  {svg_path}")
    if args.png:
        print(f"[+] PNG  {rasterize(svg_path)}")


if __name__ == "__main__":
    main()
