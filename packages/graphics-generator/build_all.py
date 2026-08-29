"""
Build every generated asset and emit a manifest for the Storybook gallery.

The gallery is data-driven: it renders whatever this manifest declares. Adding a
variant here is the only step needed to make it appear in Storybook — no story
file edits, so the catalogue cannot drift from what the generator actually emits.

Assets are build artifacts (ADR 0001 §4.3): `output/` is not tracked in git.
Run this before `pnpm storybook` / `pnpm build-storybook`.
"""

from __future__ import annotations

import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE / "src"))

import build_icons  # noqa: E402
import generator  # noqa: E402
from tokens import Tokens  # noqa: E402

OUTPUT = HERE / "output"

# Key visual variants. Seeds are explicit so every entry is reproducible.
KEY_VISUALS = [
    {
        "name": "og-card",
        "theme": "dark",
        "seed": 1034,
        "width": 1200,
        "height": 630,
        "rain": 150,
        "usage": "OG 이미지·소셜 카드. 중앙 세이프 존에 타이틀을 얹는 것을 전제로 한다.",
    },
    {
        "name": "og-card",
        "theme": "light",
        "seed": 1034,
        "width": 1200,
        "height": 630,
        "rain": 150,
        "usage": "라이트 테마 OG 이미지. 대비가 낮으므로 텍스트는 text.primary 사용.",
    },
    {
        "name": "hero-wide",
        "theme": "dark",
        "seed": 7,
        "width": 1920,
        "height": 640,
        "rain": 180,
        "usage": "페이지 상단 히어로 배너. 밀도 상한(180)에서 운용.",
    },
    {
        "name": "panel-square",
        "theme": "dark",
        "seed": 42,
        "width": 800,
        "height": 800,
        "rain": 90,
        "usage": "정방형 카드·썸네일. 좁은 폭에서는 밀도를 낮춰 파문이 뭉치지 않게 한다.",
    },
]


def build_key_visuals() -> list[dict]:
    entries = []
    for spec in KEY_VISUALS:
        svg = generator.generate(
            spec["seed"], spec["theme"], spec["width"], spec["height"], spec["rain"],
            name=spec["name"],
        )
        entries.append({
            "id": f"{spec['name']}-{spec['theme']}-{spec['seed']}",
            "category": "keyvisual",
            "name": spec["name"],
            "path": svg.relative_to(OUTPUT).as_posix(),
            "theme": spec["theme"],
            "seed": spec["seed"],
            "width": spec["width"],
            "height": spec["height"],
            "rules": ["A", "B", "F"],
            "usage": spec["usage"],
        })
    return entries


def build_icon_set() -> list[dict]:
    entries = []
    icon_dir = build_icons.OUT
    icon_dir.mkdir(parents=True, exist_ok=True)
    for factory in build_icons.ICONS:
        icon = factory()
        path = icon_dir / f"{icon.name}.svg"
        path.write_text(icon.to_svg())  # validates against Rule D on write
        entries.append({
            "id": icon.name,
            "category": "icon",
            "name": icon.name,
            "path": path.relative_to(OUTPUT).as_posix(),
            "theme": None,
            "seed": None,
            "width": 24,
            "height": 24,
            "rules": ["D"],
            "usage": "lucide가 제공하지 않는 브랜드 고유 모티프. currentColor를 따른다.",
        })
    return entries


def main() -> None:
    # Rebuild from scratch. Without this, artifacts from removed variants or ad-hoc
    # runs linger in output/ and get shipped by Storybook's staticDirs copy even
    # though the manifest no longer references them.
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True, exist_ok=True)

    assets = build_key_visuals() + build_icon_set()

    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "tokensVersion": Tokens("dark").provenance()["tokens_version"],
        "generatorVersion": generator.GENERATOR_VERSION,
        "assets": assets,
    }
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))

    for a in assets:
        print(f"  [{a['category']:9s}] {a['path']}")
    print(f"\n[+] {len(assets)} assets, manifest at {OUTPUT / 'manifest.json'}")


if __name__ == "__main__":
    main()
