## Branch protection — recommended configuration

This repository provides a helper script to apply recommended branch protection settings to the `main` branch.

Recommended settings applied by `scripts/set-branch-protection.js`:

- Require status checks to pass before merging: `PR — checks` (the PR workflow added in `.github/workflows/pr-check.yml`).
- Require pull request reviews: at least 1 approving review.
- Enforce protection for administrators.

How to run (locally):

1. Ensure you have a GitHub token with `repo` permissions. In GitHub, go to Settings → Developer settings → Personal access tokens and create a token.
2. Run the script with the token in the environment. Example:

```bash
export GITHUB_TOKEN="ghp_..."
# optional: pass owner and repo (defaults read from package.json)
node scripts/set-branch-protection.js mindulle sonagi-design-system main
```

This will call the GitHub API and set the protection rules described above.

Notes:

- You can also set branch protection manually in GitHub Settings → Branches → Branch protection rules.
- The script uses `@octokit/rest` and requires `GITHUB_TOKEN` or `GH_TOKEN` env var.
