/**
 * Semantic Release Configuration
 * 커밋 메시지를 분석하여 버전을 결정하고, NPM 배포 및 GitHub 릴리스를 자동화합니다.
 */
module.exports = {
  branches: ['main'],
  tagFormat: "tokens-v${version}",
  plugins: [
    // 1. 커밋 메시지 분석 (@commitlint/config-conventional 기준)
    '@semantic-release/commit-analyzer',
    
    // 2. 릴리스 노트 자동 생성
    '@semantic-release/release-notes-generator',
    
    // 3. CHANGELOG.md 파일 생성/업데이트
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    
    // 4. package.json 버전 업데이트 및 NPM 배포
    // npmPublish: true로 설정 시 NPM_TOKEN이 환경변수로 필요합니다.
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    
    // 5. 변경된 package.json과 CHANGELOG.md를 Git 저장소에 커밋
    // pnpm 모노레포에서는 package-lock.json이 없으므로 제거
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): @sonagi/tokens ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],

    // 6. GitHub Releases에 새 릴리스 생성 (압축된 빌드 산출물 첨부)
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