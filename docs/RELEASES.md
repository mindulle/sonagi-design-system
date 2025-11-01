## Releases and tokens

This document explains the release automation and required secrets for releases.

### What runs automatically

- The `release` workflow (`.github/workflows/release.yml`) runs on `push` to `main`.
- It runs `pnpm run build` then `pnpm run release` which invokes `semantic-release`.
- `semantic-release` will generate a changelog, create a GitHub release and attach assets configured in `.releaserc.js` (e.g. `packages/*/dist/**`, `CHANGELOG.md`).

### Required secrets

- `GITHUB_TOKEN` (provided by Actions) is used by `semantic-release` to create a GitHub Release. Ensure Actions have write permission to contents/releases in repo settings.
- `NPM_TOKEN` (optional) — if you want to publish built packages to npm, create a Personal Access Token or npm automation token and add it to repository secrets as `NPM_TOKEN`. Then configure `@semantic-release/npm` plugin in `.releaserc.js` and add the `NPM_TOKEN` env in the release workflow.

> Note: The repository root is `private: true`. The release configuration publishes the `@sonagi/tokens` package from `packages/tokens`. Ensure `packages/tokens/package.json` is configured for publishing (name, version, files) and that you intend to publish that package.

### Local testing

To test releases locally, you can run `pnpm run release` with environment variables set, but be careful — it will attempt to create releases if configured. Prefer testing on a fork or with a dry run configuration.
