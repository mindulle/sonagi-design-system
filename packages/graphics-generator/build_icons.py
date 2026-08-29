"""
Build the Sonagi brand icon set (ADR 0001 Rule D).

These icons exist to fill gaps lucide cannot: brand-specific motifs (rain at the
Rule B angle, ripple, droplet). Everything else should keep coming from lucide.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "src"))
from icons.grid import Icon, Line  # noqa: E402

OUT = Path(__file__).parent / "output" / "icons"

# Rule B angle: direction vector (0.4L, 0.9L). Here (3.5, 8) => ratio 0.4375.
RAIN_DX, RAIN_DY = 3.5, 8


def rain() -> Icon:
    icon = Icon("sonagi-rain")
    for x, y in ((5, 5), (10, 7), (15, 5)):
        icon.add(Line(x, y, x + RAIN_DX, y + RAIN_DY))
    return icon


# ---------------------------------------------------------------------------
# Withdrawn icons. Kept as comments so the same ground is not re-explored.
#
# sonagi-droplet — WITHDRAWN (duplicate).
#   lucide already ships `droplet` with the same form:
#   "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5..."
#   Violates ADR 0001 D-1 "중복 금지". Import Droplet from lucide-react instead.
#
# sonagi-ripple — WITHDRAWN after three attempts, each colliding with an
# established glyph (ADR 0001 D-1):
#   1. Ellipse(12,13,9,6) + Ellipse(12,13,4.5,3)   -> read as eye / record button
#   2. three QuadCurve arcs at y=8/13/18           -> read as inverted wifi
#   3. Line(12,3.5,12,6) + two QuadCurve arcs      -> read as a parachute
#   The concentric-expansion form is already saturated by wifi, signal, target,
#   eye, record and parachute. Use lucide `waves` when a water motif is needed;
#   its wavy horizontals do not collide.
# ---------------------------------------------------------------------------

ICONS = [rain]


def contact_sheet(names: list[str]) -> Path:
    """Render each icon at 24px and 16px so legibility can actually be judged."""
    sizes = (24, 16)
    pad, gap = 24, 56
    w = pad * 2 + len(names) * gap
    h = pad * 2 + 60
    rows = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">',
        f'<rect width="{w}" height="{h}" fill="#fcf2f0"/>',
        '<g fill="none" stroke="#47211b" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round">',
    ]
    for col, name in enumerate(names):
        svg = (OUT / f"{name}.svg").read_text()
        inner = svg.split(">", 1)[1].rsplit("</svg>", 1)[0]
        inner = inner.replace("<title>", "<!--").replace("</title>", "-->")
        y = pad
        for size in sizes:
            scale = size / 24
            x = pad + col * gap
            rows.append(f'<g transform="translate({x},{y}) scale({scale})">{inner}</g>')
            y += 32
    rows.append("</g></svg>")

    sheet = OUT / "_contact-sheet.svg"
    sheet.write_text("\n".join(rows))
    png = sheet.with_suffix(".png")
    subprocess.run(
        ["inkscape", str(sheet), "--export-filename", str(png), "--export-dpi=384"],
        check=True,
        capture_output=True,
    )
    return png


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    names = []
    for factory in ICONS:
        icon = factory()
        (OUT / f"{icon.name}.svg").write_text(icon.to_svg())  # validates on write
        names.append(icon.name)
        print(f"[+] {icon.name}  (Rule D: PASS)")
    print(f"[+] contact sheet {contact_sheet(names)}")


if __name__ == "__main__":
    main()
