# Sonagi Design System (sonagi-design-system)

**Description:** Core guidelines for developing the Sonagi Design System. Load this skill whenever making changes to the UI components, tokens, or Storybook within this repository.

## 🚨 CORE PRINCIPLES (절대 원칙)

1. **React 19+ Foundation (UI 컴포넌트)**
   - `@mindulle/ui`의 모든 컴포넌트는 **React (Server-Component Ready)**로 작성됩니다.
   - 외부 블로그 연동을 위한 Vanilla JS 제약은 폐기되었습니다.
   - 스타일링은 Tailwind CSS를 기본으로 사용하며, 사전에 정의된 토큰 유틸리티 클래스만 사용합니다.

2. **Framework-Agnostic Tokens (토큰 계층)**
   - 컴포넌트는 React로 작성되지만, **디자인 토큰 계층은 프레임워크와 무관**합니다.
   - `@mindulle/tokens`에서 배포되는 CSS Custom Properties(`var(--sng-*)`)가 유일한 시각적 진실 공급원(SSOT)입니다.
   - Hardcoded values (e.g., `#FF0000`, `16px`) are STRICTLY FORBIDDEN.
   - Always use defined variables (e.g., `var(--sng-color-bg-base)`, `var(--sng-radius-md)`).

## 🏗️ ARCHITECTURE & RULES

1. **Tailwind CSS Naming Convention**
   - Tailwind 설정(`tailwind.config.ts`)에 토큰이 매핑되어 있습니다.
   - 임의의 유틸리티 값(`w-[15px]`, `bg-[#123123]`) 사용을 지양하고, 매핑된 클래스(`gap-sng-sm`, `rounded-sng-md`, `bg-bg-surface` 등)를 적극 사용합니다.

2. **Storybook (React Mode)**
   - Storybook은 React 컴포넌트의 Visual QA 및 문서화(Docs) 목적으로 사용됩니다.
   - `@storybook/react` 기반이며, `*.stories.tsx`로 작성합니다.

3. **Workspace Structure (Turborepo)**
   - `packages/tokens/`: Figma JSON 토큰을 파싱하여 `variables.css` 및 TS Export로 변환.
   - `packages/ui/`: React 기반 UI 컴포넌트, Tailwind 설정 및 Storybook 문서 포함.

## 📝 GIT & COMMIT CONVENTION

- This repository uses `husky` and `commitlint`.
- Commit messages must follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `style:`).
- **PR-First Workflow (NO DIRECT PUSH):**
  - NEVER push changes directly to the `main` branch.
  - Always create a new feature branch (e.g., `feat/ui-button`, `fix/token-colors`).
  - After committing, push the branch and ALWAYS create a Pull Request (PR) using `gh pr create` or notify the user to create one.
