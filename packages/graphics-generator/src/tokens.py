"""
Canonical token loader for the Sonagi graphics generator.

SSOT (ADR 0001 §2.3):
  packages/tokens/tokens/primitives.json   — primitive scale (direct use discouraged)
  packages/tokens/tokens/semantics.json    — semantic layer (preferred entry point)

Both follow the W3C Design Tokens Community Group format ($value / $type).
The wiki copy at 00_System/design-tokens/design-tokens.json is NOT canonical
and must not be read from here.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

# packages/graphics-generator/src/tokens.py -> packages/tokens/tokens
TOKENS_DIR = Path(__file__).resolve().parents[2] / "tokens" / "tokens"

_ALIAS = re.compile(r"^\{([^}]+)\}$")


class TokenError(KeyError):
    """Raised when a token path cannot be resolved."""


def _flatten(node, prefix: str, out: dict[str, str]) -> None:
    if not isinstance(node, dict):
        return
    if "$value" in node:
        out[prefix] = node["$value"]
        return
    for key, child in node.items():
        if key.startswith("$"):
            continue
        _flatten(child, f"{prefix}.{key}" if prefix else key, out)


class Tokens:
    """Flattened, alias-resolved view over the canonical token files."""

    def __init__(self, theme: str = "light") -> None:
        self.theme = theme
        primitives_path = TOKENS_DIR / "primitives.json"
        semantics_path = TOKENS_DIR / "semantics.json"

        primitives_raw = json.loads(primitives_path.read_text())
        semantics_raw = json.loads(semantics_path.read_text())

        self.version = primitives_raw.get("meta", {}).get("version", "unknown")

        flat: dict[str, str] = {}
        _flatten(primitives_raw, "", flat)
        _flatten(semantics_raw, "", flat)
        self._flat = flat

    def _resolve(self, value: str, depth: int = 0) -> str:
        if depth > 10:
            raise TokenError(f"alias cycle while resolving {value!r}")
        match = _ALIAS.match(value.strip()) if isinstance(value, str) else None
        if not match:
            return value
        target = match.group(1)
        if target not in self._flat:
            raise TokenError(f"alias target not found: {target!r}")
        return self._resolve(self._flat[target], depth + 1)

    def raw(self, path: str) -> str:
        if path not in self._flat:
            raise TokenError(f"token not found: {path!r}")
        return self._resolve(self._flat[path])

    def color(self, semantic_path: str) -> str:
        """
        Resolve a semantic colour for the active theme.

        `semantic_path` is given without the theme segment, e.g.
        "color.background.base" -> "semantic.<theme>.color.background.base".

        ADR 0001 §2.3: semantic first. Primitive access requires `primitive()`
        and should be justified.
        """
        value = self.raw(f"semantic.{self.theme}.{semantic_path}")
        if not str(value).startswith("#"):
            raise TokenError(
                f"semantic.{self.theme}.{semantic_path} resolved to non-hex "
                f"value {value!r}; it is not usable as a generator colour"
            )
        return value

    def primitive(self, path: str, *, reason: str) -> str:
        """
        Escape hatch for primitives with no semantic equivalent.
        `reason` is mandatory and exists to make the exception visible in review.
        """
        assert reason, "primitive() requires a justification"
        return self.raw(f"primitive.{path}")

    def provenance(self) -> dict[str, str]:
        return {"tokens_version": self.version, "theme": self.theme}
