# Sonagi

> Category: Korean Product

Dark-navy foundation, rain-blue accent, warm off-white surface. Built for Korean-first products that run at the intersection of analytics and editorial — think data dashboards that still feel human. Two modes: **Sonagi Core** (warm light / deep dark) and **Desk Analyst** (clinical light, high-contrast data).

## Visual Theme & Atmosphere

Quiet depth. The brand lives in the deep navy (`#1c2c4d`) and surfaces upward through warm off-whites (`#faf9f7`, `#fff8f2`). The cyan logo accent (`#00ffcc`) is reserved for the wordmark only — never used as a UI accent. Rain blue (`#4A90E2`) is the single interactive accent. Typography is Pretendard-first with Inter fallback; Korean and Latin share the same optical weight.

## Color Palette & Roles

**Sonagi Core (light mode)**

- **Background base:** `#faf9f7` — warm off-white, never pure white
- **Surface:** `#fff8f2` — cards, panels
- **Elevated:** `#ffffff` — modals, popovers
- **Brand primary:** `#1c2c4d` — deep navy, main CTA fill, sidebar, header
- **Brand primary hover:** `#1275b5`
- **Accent:** `#4A90E2` — links, focused borders, interactive highlights; one accent per screen
- **Accent hover:** `#2a6bbf`
- **Logo cyan:** `#00ffcc` — wordmark dot only; never used as UI color
- **Text primary:** `#0d1117`
- **Text secondary:** `#30363d`
- **Text muted:** `#8b949e`
- **Text disabled:** `#c9d1d9`
- **Border default:** `#e6eaef`
- **Border subtle:** `#f0ede8`
- **Border strong:** `#1c2c4d`
- **Success:** `#2ea043` / **Warning:** `#d29922` / **Error:** `#f85149` / **Info:** `#4A90E2`

**Dark mode** (`[data-theme="dark"]` or `prefers-color-scheme: dark`)

- **Background base:** `#010609` — near-black
- **Surface:** `#0d1117`
- **Elevated:** `#161b22`
- **Text primary:** `#f0f6fc`
- **Border default:** `#30363d`
- Same accent and state colors as light

**Desk Analyst theme** (`[data-theme="desk-analyst"]`)

- Clinical white (`#FFFFFF`) base, blue-600 primary (`#2563EB`)
- Tight radius (`sm: 4px`, `md: 6px`, `lg: 8px`) for dense data UI
- Higher line-height body: `1.6` for readability in long tables

Do not mix themes. Never use `#00ffcc` outside the wordmark context.

## Typography Rules

- **Primary sans:** `'Pretendard', 'Inter', system-ui, sans-serif` — all body and UI copy
- **Serif (editorial):** `'Noto Serif KR', 'Merriweather', Georgia, serif` — long-form content only
- **Mono:** `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` — code, numbers in tables
- **Wordmark EN:** `'Jura Light', sans-serif` / **Wordmark KO:** `'Designhouse Light', sans-serif` — brand use only

**Scale (px):** 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36

**Weights:** Regular 400 · Medium 500 · Semibold 600 · Bold 700

**Line-height:** 1.5 body (`--sng-line-height-normal`), 1.25 headings (`--sng-line-height-tight`)

**Letter-spacing:** `-0.025em` tight for display ≥30px; `0em` normal for body; `0.05em` wide for captions and labels

## Component Stylings

- **Buttons:** `border-radius: 6px` (`--sng-radius-base`). Primary = navy fill + white label. Secondary = 1px border (`--sng-color-border-default`) transparent fill. Danger = error fill. Padding: `10px 16px`.
- **Cards:** `border-radius: 12px` (`--sng-radius-lg`), 1px border (`--sng-color-border-default`), surface background, `shadow-sm` by default. Internal padding: `20px`.
- **Inputs:** `border-radius: 8px` (`--sng-radius-md`), 1px border, accent border + `shadow-focus` on focus. Height: 40px.
- **Badges / Tags:** `border-radius: 9999px` (`--sng-radius-full`) for status pills; `border-radius: 4px` (`--sng-radius-sm`) for category labels.
- **Links:** accent blue, no underline, underline on hover. Visited state stays accent.
- **Tables (Desk Analyst):** Zebra striping with `--sng-color-bg-surface` on odd rows. Mono font for numeric columns.

## Layout Principles

- **Grid:** 12-column, 1200px max-width, `24px` gutters (`--sng-spacing-6`).
- **Hero:** 40–56vh. Content top-biased; never vertically centered.
- **Section spacing:** `80px` desktop (`--sng-spacing-20`) · `48px` tablet (`--sng-spacing-12`) · `32px` mobile (`--sng-spacing-8`).
- **Sidebar width:** 240px; collapses to icon-only 64px below 1024px.
- Whitespace is the primary separator. Dividers (`1px`, `--sng-color-border-subtle`) only between structurally unrelated blocks.
- Do not nest cards inside cards.

## Depth & Elevation

Three levels:

- **Flat (0):** default content area, no shadow.
- **Raised (1):** cards, sticky headers. `shadow-sm: 0 1px 3px rgba(8,58,100,0.1)`.
- **Floating (2):** dropdowns, modals, toasts. `shadow-md: 0 4px 12px rgba(8,58,100,0.12)`.

Focus ring: `shadow-focus: 0 0 0 3px rgba(18,117,181,0.3)` — always visible, never suppressed.

Z-index ladder: base 0 · raised 10 · dropdown 100 · sticky 200 · modal 300 · toast 400 · tooltip 500.

## Do's and Don'ts

- Use `--sng-color-*` semantic tokens. Never hardcode hex values.
- One accent element per screen. The navy and warm surfaces do the heavy lifting.
- Korean copy: sentence-case. English copy: sentence-case headings, title-case for proper nouns only.
- Motion: `150ms` base (`--sng-duration-base`), `cubic-bezier(0.4, 0, 0.2, 1)` (`--sng-ease-default`). Fast interactions: `100ms`. No motion over `250ms` for UI feedback.
- Do not use `#00ffcc` (logo cyan) anywhere except the wordmark SVG.
- Do not mix `desk-analyst` theme components with `sonagi-core` components in the same view.
- Do not use drop shadows on inputs. Use border + focus ring instead.
- No gradients except a subtle `brand-primary → brand-primary-dark` on hero banners, used sparingly.
- No neumorphism. No glassmorphism.

## Responsive Behavior

- **Desktop ≥ 1024px:** 12-col grid, full sidebar, 24px gutters.
- **Tablet 640–1023px:** 8-col grid, sidebar collapses to icon-only, 16px gutters.
- **Mobile < 640px:** 4-col grid, sidebar hidden (bottom nav or hamburger), 12px gutters. Hero drops to 40vh. Font scale steps down one size.

## Agent Prompt Guide

- Tokens are available as CSS custom properties prefixed `--sng-*`. Use semantic tokens (`--sng-color-bg-base`, `--sng-color-text-primary`) over primitives (`--sng-color-neutral-100`).
- The CDN stylesheet is at `https://design.sonagi.space/variables.css` — link it in the `<head>` of any HTML artifact.
- Default to **Sonagi Core** (light). Apply `data-theme="dark"` to `<html>` for dark mode. Apply `data-theme="desk-analyst"` for data-dense dashboard artifacts.
- When creating a prototype, add `<link rel="stylesheet" href="https://design.sonagi.space/variables.css">` and reference only `--sng-*` variables. Do not invent new hex values.
- If a color is needed outside the palette, surface a comment `/* WARNING: color outside sonagi palette */` and use the nearest semantic token as a fallback.
- Pretendard must be loaded from CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css`
