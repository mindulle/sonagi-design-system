/**
 * Semantic Release Configuration — @sonagi/ui
 * @sonagi/tokens와 독립적으로 버전이 관리됩니다.
 */
module.exports = {
  branches: ['main'],
  tagFormat: "ui-v${version}",
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      { changelogFile: 'CHANGELOG.md' },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): @sonagi/ui ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/index.js', label: 'UI Components (ESM)' },
          { path: 'dist/index.cjs', label: 'UI Components (CJS)' },
        ],
      },
    ],
  ],
};