## Issue workflow & triage

This document explains how to create, triage and track issues for the Sonagi design system.

1. Create an issue using the templates in `.github/ISSUE_TEMPLATE`.
2. Include required information:
   - Short summary
   - Steps to reproduce (bug) or acceptance criteria (feature)
   - Notion page link (if applicable)
   - Attach `notion-page.json` or reference MCP JSON for token/design changes
3. Triage: the maintainer/team assigns `priority`, `area` labels and a milestone.
4. Branching: create a branch using the naming convention in `CONTRIBUTING.md`.
5. PR: follow the PR template and make sure CI checks pass.

### Labels

- `type:bug`, `type:feature`, `type:chore`
- `area:tokens`, `area:ui`, `area:docs`, `area:build`
- `priority:high`, `priority:medium`, `priority:low`

### Triage cadence

Maintainters should triage incoming issues at least twice a week. Label and assign owner within the triage window.
