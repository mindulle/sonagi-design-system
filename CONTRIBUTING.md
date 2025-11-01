## Contributing to Sonagi Design System

Thanks for helping improve the Sonagi design system. This document describes the repository conventions, branch & commit rules, and how to prepare a high-quality PR.

### Branch naming

- Use the pattern: `<type>/<issue-number>-<short-description>`
  - Examples: `feature/123-add-token-build`, `fix/456-button-hover`, `hotfix/789-critical-null`

### Commit messages

- We follow Conventional Commits: `<type>(<scope>): <short summary>`
  - `type`: feat, fix, docs, style, refactor, perf, test, chore, ci
  - Example: `feat(tokens): generate CSS variables from sonagi-tokens.json`

- Install commit hooks locally (run once after cloning):

```bash
pnpm install
pnpm run prepare
```

This sets up Husky hooks (commit-msg, pre-commit) which will validate commit messages and run lint-staged.

### Pull requests

- Open a PR from a feature branch to `main`. Fill the PR template and link the related issue.
- Ensure CI checks pass (build, lint, type-check, tests).

### Local checks

- Use `pnpm run lint` and `pnpm run type-check` before pushing.
