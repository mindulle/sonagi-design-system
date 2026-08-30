"""
Rule D — 24x24 icon grid engine.

Enforces ADR 0001 Rule D as executable constraints rather than prose:
  - viewBox 0 0 24 24, stroke-width 2, round cap/join
  - fill none, stroke currentColor (colour is decided by CSS, never by us)
  - live area 20x20 (2px margin on every side)
  - every vertex snapped to the 0.5px grid
  - adjacent stroke centrelines at least 2px apart

Violations raise. An icon that cannot satisfy the grid is a design problem,
not something to silently emit.
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass, field

CANVAS = 24
STROKE_WIDTH = 2
MARGIN = 2
LIVE_MIN = MARGIN
LIVE_MAX = CANVAS - MARGIN
GRID = 0.5
MIN_STROKE_GAP = 2.0

_NUM = re.compile(r"-?\d+(?:\.\d+)?")


class GridViolation(ValueError):
    """Raised when a primitive breaks the Rule D grid contract."""


def snapped(value: float) -> bool:
    return abs(value / GRID - round(value / GRID)) < 1e-9


def snap(value: float) -> float:
    return round(value / GRID) * GRID


SAMPLES = 48  # flattening resolution for curved primitives


@dataclass
class Line:
    x1: float
    y1: float
    x2: float
    y2: float

    def coords(self) -> list[float]:
        return [self.x1, self.y1, self.x2, self.y2]

    def polyline(self) -> list[tuple[float, float]]:
        return [(self.x1, self.y1), (self.x2, self.y2)]

    def svg(self) -> str:
        return f'<line x1="{self.x1}" y1="{self.y1}" x2="{self.x2}" y2="{self.y2}"/>'


@dataclass
class QuadCurve:
    """Quadratic Bézier. Flattened exactly, so it participates in every check."""

    x1: float
    y1: float
    cx: float
    cy: float
    x2: float
    y2: float

    def coords(self) -> list[float]:
        return [self.x1, self.y1, self.cx, self.cy, self.x2, self.y2]

    def polyline(self) -> list[tuple[float, float]]:
        pts = []
        for i in range(SAMPLES + 1):
            t = i / SAMPLES
            u = 1 - t
            pts.append((
                u * u * self.x1 + 2 * u * t * self.cx + t * t * self.x2,
                u * u * self.y1 + 2 * u * t * self.cy + t * t * self.y2,
            ))
        return pts

    def svg(self) -> str:
        return f'<path d="M {self.x1} {self.y1} Q {self.cx} {self.cy} {self.x2} {self.y2}"/>'


@dataclass
class Ellipse:
    cx: float
    cy: float
    rx: float
    ry: float

    def coords(self) -> list[float]:
        return [self.cx, self.cy, self.rx, self.ry]

    def polyline(self) -> list[tuple[float, float]]:
        pts = []
        for i in range(SAMPLES + 1):
            a = 2 * math.pi * i / SAMPLES
            pts.append((self.cx + self.rx * math.cos(a), self.cy + self.ry * math.sin(a)))
        return pts

    def svg(self) -> str:
        if abs(self.rx - self.ry) < 1e-9:
            return f'<circle cx="{self.cx}" cy="{self.cy}" r="{self.rx}"/>'
        return f'<ellipse cx="{self.cx}" cy="{self.cy}" rx="{self.rx}" ry="{self.ry}"/>'


@dataclass
@dataclass
class Path:
    """
    Freeform path.
    
    Parses a subset of SVG path commands (M, L, H, V, C, Q, Z, both absolute and
    relative) and flattens them into polylines for rigorous gap and bounds checking.
    Arc (A) and smooth (S, T) commands are not supported and will raise an error,
    as they should be flattened or simplified in the design tool first.
    """

    d: str

    def coords(self) -> list[float]:
        return [float(m.group()) for m in _NUM.finditer(self.d)]

    def polyline(self) -> list[tuple[float, float]]:
        tokens = [t for t in re.split(r'([a-zA-Z])|[,\s]+', self.d) if t and t.strip()]
        i = 0
        cmd = ''
        pts = []
        curr = (0.0, 0.0)
        start = (0.0, 0.0)
        
        while i < len(tokens):
            if tokens[i].isalpha():
                cmd = tokens[i]
                i += 1
                
            is_rel = cmd.islower()
            c = cmd.upper()
            
            def nxt():
                nonlocal i
                if i >= len(tokens):
                    raise GridViolation(f"Path command {cmd} missing arguments")
                v = float(tokens[i])
                i += 1
                return v
                
            if c == 'M':
                x, y = nxt(), nxt()
                if is_rel:
                    x += curr[0]; y += curr[1]
                curr = (x, y)
                start = curr
                pts.append(curr)
                cmd = 'l' if is_rel else 'L'  # Implicit subsequent L
                
            elif c == 'L':
                x, y = nxt(), nxt()
                if is_rel:
                    x += curr[0]; y += curr[1]
                curr = (x, y)
                pts.append(curr)
                
            elif c == 'H':
                x = nxt()
                if is_rel:
                    x += curr[0]
                curr = (x, curr[1])
                pts.append(curr)
                
            elif c == 'V':
                y = nxt()
                if is_rel:
                    y += curr[1]
                curr = (curr[0], y)
                pts.append(curr)
                
            elif c == 'C':
                x1, y1 = nxt(), nxt()
                x2, y2 = nxt(), nxt()
                x, y = nxt(), nxt()
                if is_rel:
                    x1 += curr[0]; y1 += curr[1]
                    x2 += curr[0]; y2 += curr[1]
                    x += curr[0]; y += curr[1]
                
                for s in range(1, SAMPLES + 1):
                    t = s / SAMPLES
                    u = 1 - t
                    px = u**3 * curr[0] + 3 * u**2 * t * x1 + 3 * u * t**2 * x2 + t**3 * x
                    py = u**3 * curr[1] + 3 * u**2 * t * y1 + 3 * u * t**2 * y2 + t**3 * y
                    pts.append((px, py))
                curr = (x, y)
                
            elif c == 'Q':
                x1, y1 = nxt(), nxt()
                x, y = nxt(), nxt()
                if is_rel:
                    x1 += curr[0]; y1 += curr[1]
                    x += curr[0]; y += curr[1]
                    
                for s in range(1, SAMPLES + 1):
                    t = s / SAMPLES
                    u = 1 - t
                    px = u**2 * curr[0] + 2 * u * t * x1 + t**2 * x
                    py = u**2 * curr[1] + 2 * u * t * y1 + t**2 * y
                    pts.append((px, py))
                curr = (x, y)
                
            elif c == 'Z':
                curr = start
                pts.append(curr)
                
            else:
                raise GridViolation(
                    f"Path command '{cmd}' is not supported. Use M, L, H, V, C, Q, Z only."
                )

        return pts

    def svg(self) -> str:
        return f'<path d="{self.d}"/>'


def _point_to_segment(px: float, py: float, ax: float, ay: float, bx: float, by: float) -> float:
    dx, dy = bx - ax, by - ay
    denom = dx * dx + dy * dy
    t = 0.0 if denom == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / denom))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def _polyline_distance(p: list[tuple[float, float]], q: list[tuple[float, float]]) -> float:
    """
    Minimum distance between two flattened primitives.

    Every primitive except `Path` reduces to a polyline, so one routine covers
    line/line, line/curve, curve/curve and concentric-ring cases uniformly.
    """
    best = float("inf")
    for px, py in p:
        for (ax, ay), (bx, by) in zip(q, q[1:]):
            best = min(best, _point_to_segment(px, py, ax, ay, bx, by))
    for qx, qy in q:
        for (ax, ay), (bx, by) in zip(p, p[1:]):
            best = min(best, _point_to_segment(qx, qy, ax, ay, bx, by))
    return best


@dataclass
class Icon:
    name: str
    elements: list = field(default_factory=list)

    def add(self, element):
        self.elements.append(element)
        return self

    def validate(self) -> None:
        for el in self.elements:
            kind = type(el).__name__

            pts = el.polyline()
            xs = [p[0] for p in pts]
            ys = [p[1] for p in pts]
            if min(xs) < LIVE_MIN or min(ys) < LIVE_MIN or max(xs) > LIVE_MAX or max(ys) > LIVE_MAX:
                raise GridViolation(
                    f"{self.name}: {kind} spans ({min(xs):.2f},{min(ys):.2f})-"
                    f"({max(xs):.2f},{max(ys):.2f}), outside live area {LIVE_MIN}..{LIVE_MAX}"
                )
            for v in el.coords():
                if not snapped(v):
                    raise GridViolation(
                        f"{self.name}: {kind} coordinate {v} is not on the {GRID}px grid"
                    )

        # Uniform minimum-gap check across every primitive pair.
        flat = [(type(e).__name__, e.polyline()) for e in self.elements]
        for i, (kind_a, a) in enumerate(flat):
            for kind_b, b in flat[i + 1:]:
                gap = _polyline_distance(a, b)
                if gap < MIN_STROKE_GAP:
                    raise GridViolation(
                        f"{self.name}: {kind_a}/{kind_b} are {gap:.2f}px apart "
                        f"(minimum {MIN_STROKE_GAP}px) — they will merge visually"
                    )

    def to_svg(self) -> str:
        self.validate()
        body = "\n  ".join(el.svg() for el in self.elements)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS} {CANVAS}" '
            f'width="{CANVAS}" height="{CANVAS}" fill="none" stroke="currentColor" '
            f'stroke-width="{STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round" '
            f'role="img" aria-label="{self.name}">\n'
            f"  <title>{self.name}</title>\n"
            f"  {body}\n"
            f"</svg>\n"
        )
