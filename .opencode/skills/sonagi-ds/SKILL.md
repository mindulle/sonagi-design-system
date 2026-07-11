# Sonagi Design System (sonagi-design-system)

**Description:** Core guidelines for developing the Sonagi Design System. Load this skill whenever making changes to the UI components, tokens, or Storybook within this repository.

## 🚨 CORE PRINCIPLES (절대 원칙)

1. **Framework-Agnostic (프레임워크 독립성)**
   - NEVER use React, Vue, Svelte, or any JS framework for UI components.
   - All components MUST be written in pure HTML and CSS (or SCSS).
   - This ensures the design system can be consumed by Vanilla JS (web tools), React (admin panels), and easily ported to Flutter (mobile).

2. **Token-Driven Development**
   - Hardcoded values (e.g., `#FF0000`, `16px`) are STRICTLY FORBIDDEN.
   - Always use CSS Variables derived from design tokens (e.g., `var(--sng-color-primary)`, `var(--sng-space-4)`).

## 🏗️ ARCHITECTURE & RULES

1. **CSS Naming Convention**
   - Use the `.sng-` prefix for all component classes to prevent CSS collisions in consumer applications.
   - Example: `.sng-btn`, `.sng-btn--primary`, `.sng-input-text` (BEM methodology is recommended).

2. **Storybook (HTML Mode)**
   - Storybook is strictly used for Visual QA of HTML/CSS.
   - Components in Storybook must be written using the HTML renderer (`@storybook/html`), returning pure HTML string templates with applied CSS classes.

3. **Workspace Structure (Turborepo)**
   - `packages/tokens/`: Contains raw JSON tokens (from Figma) and build scripts to convert them into `variables.css`.
   - `packages/ui/`: Contains core CSS stylesheets and HTML-based Storybook stories.

## 📝 GIT & COMMIT CONVENTION

- This repository uses `husky` and `commitlint`.
- Commit messages must follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `style:`).
- **PR-First Workflow (NO DIRECT PUSH):**
  - NEVER push changes directly to the `main` branch.
  - Always create a new feature branch (e.g., `feat/ui-button`, `fix/token-colors`).
  - After committing, push the branch and ALWAYS create a Pull Request (PR) using `gh pr create` or notify the user to create one.
