# Sonagi

> Category: Korean Product

## 🎯 Figma SSOT (정본)

|                      |                                                                             |
| -------------------- | --------------------------------------------------------------------------- |
| **파일**             | `Sonagi Design System V3`                                                   |
| **키**               | `AEoW19jmlUh3rFgzhhV1vH`                                                    |
| **URL**              | https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3 |
| **Foundations 보드** | node `198:2974` — "Sonagi Foundations (SSOT Live Sync)"                     |

**이 파일이 유일한 디자인 정본입니다.** 아래 두 파일은 폐기된 이력이므로 참조하지 마십시오.

| 폐기된 파일            | 키                       | 상태                                                                          |
| ---------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `Core-Primitives-v3`   | `1hgAgnMvqn2uCF8i45Do4x` | `Test Page` 한 장짜리 스크래치. Button 매트릭스 + 다크모드 테스트 보드만 존재 |
| `소나기 디자인 시스템` | `KN6Bl6Pb4aW2KJXpBhS7rZ` | 2026-04-30 이후 방치. ADR 0001에서 방향 불일치로 판정됨                       |

## 개요

Built for Korean-first products that run at the intersection of analytics and editorial — think data dashboards that still feel human. 단일 테마 **가을 소나기(Sonagi Core)** 의 light / dark 2모드로 구성됩니다.

## Visual Theme & Atmosphere

Quiet depth. The brand lives in the deep and warm brownish tones (`#47211b`) and surfaces upward through warm off-whites (`#fcf2f0`, `#f5e5e2`). The cyan logo accent (`#00ffcc`) is reserved for the wordmark only — never used as a UI accent. A muted brick red (`#d2645f`) serves as the single interactive accent. Typography is Pretendard-first with Inter fallback; Korean and Latin share the same optical weight.

## Color Palette & Roles

**Sonagi Core (light mode)**

- **Background base:** `#fcf2f0` — warm off-white, never pure white
- **Surface:** `#f5e5e2` — cards, panels, input forms
- **Elevated:** `#fefaf9` — modals, popovers, tooltips
- **Brand primary:** `#47211b` — deep warm brown, main CTA fill, active elements
- **Brand primary hover:** `#38130e`
- **Accent:** `#d2645f` — links, focused borders, interactive highlights; one accent per screen
- **Accent hover:** `#b44240`
- **Logo cyan:** `#00ffcc` — wordmark dot only; never used as UI color
- **Text primary:** `#1e1311`
- **Text secondary:** `#614f4b`
- **Text muted:** `#756563`
- **Text disabled:** `#9d8986`
- **Border default:** `#95817f`
- **Border subtle:** `#d7c5c2`
- **Border strong:** `#47211b`
- **Success:** `#2ea043` (`#eaf4eb` bg) / **Warning:** `#d29922` (`#fdf5e5` bg) / **Danger (Error):** `#c83e4d` (`#fde8e8` bg) / **Info:** `#1275b5` (`#e8f1f8` bg)

**Dark mode** (`[data-theme="dark"]` or `prefers-color-scheme: dark`)

- **Background base:** `#1c1412` — near-black warm
- **Surface:** `#2c201e`
- **Elevated:** `#392e2c`
- **Brand primary:** `#eeb4a9`
- **Brand primary hover:** `#ffc6bc`
- **Accent:** `#e5867f`
- **Accent hover:** `#f7a7a1`
- **Text primary:** `#f7eeec`
- **Text secondary:** `#c3b4b1`
- **Text muted:** `#988a88`
- **Text disabled:** `#6c605e`
- **Border default:** `#796966`
- **Border subtle:** `#392d2b`
- **Border strong:** `#eeb4a9`
- **Success:** `#56d364` (`#132e19` bg) / **Warning:** `#e3b341` (`#2e2305` bg) / **Danger (Error):** `#f85149` (`#421818` bg) / **Info:** `#79c0ff` (`#1c2d42` bg)

There are no other themes. `sonagi-core` (light) and `dark` are the only valid values for `data-theme` — the token set is 2-Tier (primitives → semantics) until the 겨울 소나기 theme is introduced. See [ADR 0010](./decisions/0010-delivery-consolidation-github-packages.md).

Never use `#00ffcc` outside the wordmark context.

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
- **Tables:** Zebra striping with `--sng-color-background-surface` on odd rows. Mono font for numeric columns.

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
- Do not use drop shadows on inputs. Use border + focus ring instead.
- No gradients except a subtle `brand-primary → brand-primary-dark` on hero banners, used sparingly.
- No neumorphism. No glassmorphism.

## Responsive Behavior

- **Desktop ≥ 1024px:** 12-col grid, full sidebar, 24px gutters.
- **Tablet 640–1023px:** 8-col grid, sidebar collapses to icon-only, 16px gutters.
- **Mobile < 640px:** 4-col grid, sidebar hidden (bottom nav or hamburger), 12px gutters. Hero drops to 40vh. Font scale steps down one size.

## Macro-Architecture (Atlassian / Jira Model)

- **Global App Switcher:** The Sonagi platform (`blog`, `wiki`, `draw`, `bots`) is connected via a global sidebar/app switcher.
- **Independent Sub-Apps:** Each application maintains its distinct layout and UI flow suited for its purpose, tied together by the global navigation.
- **Unified Context:** Allows users to easily switch between completely different tools while feeling anchored in the Sonagi ecosystem.

## Micro-Architecture & Philosophy (Meta Astryx Inspired)

- **AI-Ready First:** APIs, classes, and CLI tools must be strictly typed and predictable so both human engineers and AI coding agents can consume them perfectly.
- **React 19+ Foundation:** Components must be server-component ready and utilize modern React primitives.
- **Brand-level Theming:** Avoid forking/wrapping components. Rely on deep token override capabilities to allow flexible customization without bloat.
- **Self-documenting Primitives:** Components must declare their behavior clearly (e.g., `Shadcn UI` pattern) to eliminate "magic" behavior.

## Agent Prompt Guide

- Tokens are available as CSS custom properties prefixed `--sng-*`. Use semantic tokens (`--sng-color-bg-base`, `--sng-color-text-primary`) over primitives (`--sng-color-neutral-100`).
- **Distribution is GitHub Packages only** (see ADR 0010). Install `@mindulle/tokens` from `https://npm.pkg.github.com` and import the stylesheet via the package export:
  - Bundled apps: `import '@mindulle/tokens/css';`
  - Plain HTML artifacts: link the installed file, e.g. `<link rel="stylesheet" href="./node_modules/@mindulle/tokens/dist/variables.css">`
- **There is no public CDN for tokens.** Do not link `design.sonagi.space` — that host serves an unrelated SPA and returns HTML for every path, so a stylesheet link there fails silently.
- Default to **Sonagi Core** (light). Apply `data-theme="dark"` to `<html>` for dark mode. No other themes exist yet — the token set is intentionally 2-Tier (primitives → semantics) until the 겨울 소나기 theme is introduced (ADR 0010).
- If a color is needed outside the palette, surface a comment `/* WARNING: color outside sonagi palette */` and use the nearest semantic token as a fallback.
- Pretendard must be loaded from CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css`
