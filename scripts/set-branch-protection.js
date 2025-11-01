#!/usr/bin/env node
/*
  Usage:
    GITHUB_TOKEN=xxx node scripts/set-branch-protection.js [owner] [repo] [branch]

  If owner/repo are omitted, this script will attempt to read them from package.json's repository.url.
*/

const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

function parseRepoUrl(url) {
  // accept formats like https://github.com/owner/repo.git
  if (!url) return null;
  const m = url.match(/github.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
  if (!m) return null;
  return { owner: m[1], repo: m[2] };
}

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const repoInfo = parseRepoUrl(pkg.repository && pkg.repository.url);

const owner =
  process.argv[2] || process.env.REPO_OWNER || (repoInfo && repoInfo.owner);
const repo =
  process.argv[3] || process.env.REPO_NAME || (repoInfo && repoInfo.repo);
const branch = process.argv[4] || process.env.BRANCH || 'main';

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!token) {
  console.error('Missing GITHUB_TOKEN or GH_TOKEN in environment. Aborting.');
  process.exit(1);
}

if (!owner || !repo) {
  console.error(
    'Could not determine owner/repo. Provide as args or set REPO_OWNER/REPO_NAME env vars.'
  );
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

async function run() {
  console.log(`Applying branch protection for ${owner}/${repo}@${branch}`);

  try {
    await octokit.rest.repos.updateBranchProtection({
      owner,
      repo,
      branch,
      required_status_checks: {
        strict: true,
        contexts: ['PR — checks'],
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        required_approving_review_count: 1,
        dismiss_stale_reviews: true,
      },
      restrictions: null,
    });

    console.log('✅ Branch protection applied');
  } catch (err) {
    console.error('❌ Failed to apply branch protection:', err.message || err);
    process.exit(1);
  }
}

run();
