module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    // Publish packages/tokens to npm when NPM_TOKEN is provided
    ['@semantic-release/npm', { pkgRoot: 'packages/tokens', npmPublish: true }],
    ['@semantic-release/npm', { pkgRoot: 'packages/react', npmPublish: true }],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'packages/tokens/package.json',
          'packages/react/package.json',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        // Attach built artifacts from packages/*/dist when available
        assets: [
          { path: 'packages/**/dist/**', label: 'build-artifacts' },
          'CHANGELOG.md',
        ],
      },
    ],
  ],
};
