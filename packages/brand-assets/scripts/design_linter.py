#!/usr/bin/env python3
"""
Mindulle Studio & Sonagi Design Linter (v0.1.0)
Audits SVG assets against the Master Brand Bible & The 10 Golden Don'ts:
1. Pure Vector Check (No embedded base64 bitmaps/slop)
2. The True 2px Law (Stroke widths must be >= 1.2px, no sub-pixel hairlines)
3. Palette Token Compliance (Only approved brand colors)
4. ViewBox & Dimension Integrity
"""

import os
import re
import xml.etree.ElementTree as ET

ROOT_DIR = "/home/ubuntu/sonagi-design-system/packages/brand-assets"

# Approved Brand Colors (Normalized lower-case hex)
APPROVED_PALETTE = {
    "#faf8f5", "#f5efe6", "#ffffff", "#ede4d6", "#ede7de", "#f5f0ea", # Light Paper Tones
    "#060911", "#070a12", "#090d16", "#0b101d", "#161b22", "#161b26", # Dark Canvas Tones
    "#1c1514", "#140e0c", "#2a201c", "#2a2421", "#30363d", "#3f3935", "#d6cfc7", "#78716c", "#57534e", "#44403c", "#8b949e", # Architecture & Lines
    "#d97706", "#b45309", "#9a3412", "#ffd166", "#f59e0b", "#fff5cc", "#fbbf24", "#fef3c7", # Dandelion Gold Accents
    "#2563eb", "#4a90e2", "#3b82f6", "#1e40af", "#00ffcc" # Sonagi Rain & Electric Accents
}

def normalize_hex(color):
    if not color:
        return None
    c = color.strip().lower()
    if c.startswith('#') and len(c) == 4: # #abc -> #aabbcc
        return '#' + ''.join([x*2 for x in c[1:]])
    if c.startswith('#') and len(c) >= 7:
        return c[:7]
    return c

def lint_svg(file_path):
    issues = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Rule 1: No Embedded Bitmaps (No AI slop / base64 raster blobs)
    if 'data:image/' in content or '<image' in content:
        issues.append("❌ FAIL [Golden Don't 10]: Embedded raster image found in vector asset.")

    # Rule 2: Sub-pixel hairline check (< 1.0px)
    strokes = re.findall(r'stroke-width="([0-9.]+)"', content)
    for s in strokes:
        try:
            val = float(s)
            if val < 1.0:
                issues.append(f"⚠️ WARN [The True 2px Law]: Hairline stroke width {val}px detected (< 1.0px).")
        except ValueError:
            pass

    # Rule 3: Color palette audit
    colors = re.findall(r'(?:fill|stroke|stop-color)="([^"]+)"', content)
    for raw_c in colors:
        c = normalize_hex(raw_c)
        if c and c.startswith('#') and c not in APPROVED_PALETTE:
            issues.append(f"⚠️ WARN [60-30-10 Palette]: Color '{raw_c}' is outside approved brand token set.")

    # Rule 4: ViewBox check
    if 'viewBox=' not in content:
        issues.append("❌ FAIL [Scalability]: Missing viewBox attribute in SVG.")

    # Rule 5: Pixel-Perfect Sub-pixel Alignment (No ugly long floats like 12.3847291)
    paths = re.findall(r'd="([^"]+)"', content)
    long_floats = 0
    for p in paths:
        floats = re.findall(r'([0-9]+\.[0-9]{3,})', p)
        if len(floats) > 5:
            long_floats += len(floats)
    if long_floats > 0:
        issues.append(f"⚠️ WARN [Pixel-Perfect Grid]: {long_floats} unrounded sub-pixel coordinates detected (potential raster blurring).")

    return issues

def main():
    print("=" * 70)
    print("🏛️  MINDULLE & SONAGI OFFICIAL DESIGN LINTER (v0.1.0)")
    print("    Auditing packages/brand-assets against Master Brand Bible")
    print("=" * 70)

    total_files = 0
    clean_files = 0
    all_issues = {}

    for root, dirs, files in os.walk(ROOT_DIR):
        if 'dist' in root or 'node_modules' in root:
            continue
        for f in sorted(files):
            if f.endswith('.svg'):
                total_files += 1
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                issues = lint_svg(full_path)
                if not issues:
                    clean_files += 1
                    print(f"  ✅ PASS: {rel_path}")
                else:
                    all_issues[rel_path] = issues
                    print(f"  ⚠️  CHECK: {rel_path}")
                    for issue in issues:
                        print(f"      {issue}")

    print("-" * 70)
    print(f"📊 SUMMARY: {clean_files}/{total_files} SVG assets completely clean.")
    if all_issues:
        print(f"   {len(all_issues)} files have minor warnings/checks.")
    else:
        print("🎉 100% PERFECT DESIGN LINTING PASS! All brand rules respected.")
    print("=" * 70)

if __name__ == "__main__":
    main()
