/**
 * Semantic Release Configuration
 * 커밋 메시지를 분석하여 버전을 결정하고, NPM 배포 및 GitHub 릴리스를 자동화합니다.
 */
module.exports = {
  branches: ['main'],
  tagFormat: "tokens-v${version}",
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
    "@semantic-release/npm",
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): @sonagi/tokens ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/variables.css', label: 'CSS Variables' },
          { path: 'dist/index.js', label: 'JS Tokens' },
        ]
      }
    ]
  ],
};