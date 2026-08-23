# [1.2.0](https://github.com/mindulle/sonagi-design-system/compare/ui-v1.1.0...ui-v1.2.0) (2026-08-23)


### Bug Fixes

* adjust categorical chart colors to sonagi quiet-depth theme ([7b30476](https://github.com/mindulle/sonagi-design-system/commit/7b304767fd8289bd962b7624d7ce6b73bbe28a94))
* **ci:** bump node version to 22 for pnpm 11 compatibility ([74b48d0](https://github.com/mindulle/sonagi-design-system/commit/74b48d0838e6c67dfd324d57bd2080c7ade9313e))
* **ci:** ensure @sonagi/tokens is built before @sonagi/ui in release workflow ([#19](https://github.com/mindulle/sonagi-design-system/issues/19)) ([724476b](https://github.com/mindulle/sonagi-design-system/commit/724476b6672420d47befec0be425032667aa2ea2))
* **pkg:** scope package names to [@mindulle](https://github.com/mindulle) for GitHub Packages publishing ([#21](https://github.com/mindulle/sonagi-design-system/issues/21)) ([227e6d3](https://github.com/mindulle/sonagi-design-system/commit/227e6d3ee98b8cb47fefc128fe29ef4b5aa62102))
* **pkg:** update pnpm-lock.yaml and discord-ui workspace dependency ([#22](https://github.com/mindulle/sonagi-design-system/issues/22)) ([9282918](https://github.com/mindulle/sonagi-design-system/commit/9282918c6f1160d0dcdafdd45782d24efe74f4bf))
* **release:** migrate release pipeline to GitHub Packages (npm.pkg.github.com) ([#20](https://github.com/mindulle/sonagi-design-system/issues/20)) ([d6d97f1](https://github.com/mindulle/sonagi-design-system/commit/d6d97f1b3a977dbc5826df95cd6a37b7efc9dd15))
* **tokens:** build 스크립트 및 variables.css 다크모드 prefers-color-scheme 불일치 해결 ([ea9eae9](https://github.com/mindulle/sonagi-design-system/commit/ea9eae995fa7716283277b65fa098164f0466e4a))
* **ui:** bump version to trigger GitHub Packages release ([#23](https://github.com/mindulle/sonagi-design-system/issues/23)) ([ae8b7cd](https://github.com/mindulle/sonagi-design-system/commit/ae8b7cd90d244efc1db1a997c91534988fd9366c))
* **ui:** chmod +x build-css.sh for CI release runner ([#18](https://github.com/mindulle/sonagi-design-system/issues/18)) ([f9b86ca](https://github.com/mindulle/sonagi-design-system/commit/f9b86ca6676913259ab92be3863a2cae706dd353))
* **ui:** mdx meta 컴포넌트 임포트 경로를 addon-docs/blocks로 변경 ([91a7d54](https://github.com/mindulle/sonagi-design-system/commit/91a7d54669c72d3b93b1e368362f6c644e8b9f6d))
* **ui:** storybook blocks 의존성 추가 및 mdx meta 컴포넌트 임포트 ([b9db32e](https://github.com/mindulle/sonagi-design-system/commit/b9db32edbc12c970e5ce06bd9831ac5801eee43e))


### Features

* [Design-to-Code] Figma v3.0 토큰 및 컴포넌트 스펙 동기화 ([#17](https://github.com/mindulle/sonagi-design-system/issues/17)) ([6e4deaf](https://github.com/mindulle/sonagi-design-system/commit/6e4deafdfeed2a00f9d252d59c76492943824bb2)), closes [#083a64](https://github.com/mindulle/sonagi-design-system/issues/083a64) [#1275b5](https://github.com/mindulle/sonagi-design-system/issues/1275b5)
* add metabase chart color tokens and notification ci pipeline ([9bd0b53](https://github.com/mindulle/sonagi-design-system/commit/9bd0b53f026e8d1a9304d6228a519244d2d640f3))
* define metabase chart color tokens ([56ca489](https://github.com/mindulle/sonagi-design-system/commit/56ca4891fdab020fa7aa1e43818c9ff8482d5eff))
* **discord-ui:** create discord bot ui wrapper package ([f82e34f](https://github.com/mindulle/sonagi-design-system/commit/f82e34fe3b6dcd3614f5a392ca88e7cc6358d5ef))
* **tokens:** add chart categorical colors ([70b22ed](https://github.com/mindulle/sonagi-design-system/commit/70b22edeb47bd1c68cac8d5c9ae647a41a9f487b))
* **ui:** add AI-specific components (AIBadge, AISkeleton, AIPendingApproval) ([edfd21b](https://github.com/mindulle/sonagi-design-system/commit/edfd21bd9616126e78038c5dce06027c13a16116))
* **ui:** publish @mindulle/ui v1.3.0 to GitHub Packages ([#24](https://github.com/mindulle/sonagi-design-system/issues/24)) ([4113385](https://github.com/mindulle/sonagi-design-system/commit/4113385f3a1205ea3f37489c2f7f6d54869b661c))
* 디자인 토큰 개편 후속 정렬 및 UI 컴포넌트 구현 ([#7](https://github.com/mindulle/sonagi-design-system/issues/7)) ([ae69f09](https://github.com/mindulle/sonagi-design-system/commit/ae69f094ff4a7b91bc87b638ca2c4785c0ea6a83))

# [1.1.0](https://github.com/mindulle/sonagi-design-system/compare/ui-v1.0.0...ui-v1.1.0) (2026-07-11)

### Bug Fixes

- **ci:** fix invalid plugins configuration in releaserc ([1585d81](https://github.com/mindulle/sonagi-design-system/commit/1585d81f86d32970439a8cc48dd0beaa4501dea8))
- **ci:** install playwright chromium before ui tests ([54ca79f](https://github.com/mindulle/sonagi-design-system/commit/54ca79f7bb441ea02cbc70956f5d25b0bc32b128))
- **ci:** restore npm plugin to semantic-release to actually publish to npm registry ([a994d0d](https://github.com/mindulle/sonagi-design-system/commit/a994d0db2b4d36bb177191ff6b0e4b20b4a21168))
- **ci:** trigger fresh release to actually publish v1.0.12 to npm ([58a965d](https://github.com/mindulle/sonagi-design-system/commit/58a965d64d0d90e517f9cdf6a1337a145abe35ec))

### Features

- **ui:** copy variables.css into storybook-static after build ([d48de4d](https://github.com/mindulle/sonagi-design-system/commit/d48de4d6818206de19c41ad4d39f0b3a741396a4))
- 디자인 토큰 개편 및 UI Storybook 테스트 환경 구축 (CEO-339) ([#6](https://github.com/mindulle/sonagi-design-system/issues/6)) ([5540835](https://github.com/mindulle/sonagi-design-system/commit/55408357492bdff799dff9f3c89c5014e4d5c2c7))

# 1.0.0 (2026-07-04)

### Bug Fixes

- **ci:** add provenance true to package.json publishConfig to enforce OIDC publishing ([29e189c](https://github.com/mindulle/sonagi-design-system/commit/29e189c221eeb9c85da4c6cb93553ba98dd8c6d7))
- **ci:** bypass husky during semantic-release to prevent commitlint failure ([fc88349](https://github.com/mindulle/sonagi-design-system/commit/fc88349859904f024b396bc861415be292720ccf))
- **ci:** completely remove NPM_CONFIG_PROVENANCE to disable OIDC signing ([773590e](https://github.com/mindulle/sonagi-design-system/commit/773590e9910a6a6018a091053b05a01eb2715427))
- **ci:** completely remove registry-url from setup-node to prevent empty auth token breaking OIDC ([ce4a6bb](https://github.com/mindulle/sonagi-design-system/commit/ce4a6bbe5118714a89c4e0fc301743647209b4c4))
- **ci:** correct syntax error in build script ([a669250](https://github.com/mindulle/sonagi-design-system/commit/a6692500b5fb5c75c3dc19077f72a5d3930528ce))
- **ci:** correctly remove pnpm version without breaking yaml syntax ([7c06d75](https://github.com/mindulle/sonagi-design-system/commit/7c06d7572b2a87cf0a0c8c83187bf4743b54f171))
- **ci:** debug OIDC token exchange in release.yml ([a734d3f](https://github.com/mindulle/sonagi-design-system/commit/a734d3f3279d83374047e42ed5b1106d1cb33844))
- **ci:** decouple npm publish from semantic-release for OIDC ([6517246](https://github.com/mindulle/sonagi-design-system/commit/65172467eddf5fe009e02706c438745344c058c9))
- **ci:** deduplicate registry-url ([bab3dfe](https://github.com/mindulle/sonagi-design-system/commit/bab3dfe9b6eaf374e1cb52438f6ba62b5fa65868))
- **ci:** ensure publishConfig.registry has trailing slash to fix semantic-release OIDC check ([555100c](https://github.com/mindulle/sonagi-design-system/commit/555100cc4e1f4bf094504d493080f504ba99228d))
- **ci:** fix path to publish.js for pnpm in semantic-release patch ([ab15ffc](https://github.com/mindulle/sonagi-design-system/commit/ab15ffc5f3e50812276a3c5791ee1361785f7625))
- **ci:** fix top-level await in debug script ([d13a092](https://github.com/mindulle/sonagi-design-system/commit/d13a0926c1dc068419166b4e566efb635a1c039c))
- **ci:** fix yaml syntax error in release workflow ([d65b07e](https://github.com/mindulle/sonagi-design-system/commit/d65b07e93606b2da7020423ced13e9b890842dc1))
- **ci:** fix yaml syntax for debug script ([de0b122](https://github.com/mindulle/sonagi-design-system/commit/de0b122d933c0c75259679e864a4603b62d1661d))
- **ci:** patch semantic-release to pass --provenance and restore id-token for OIDC ([f6f923e](https://github.com/mindulle/sonagi-design-system/commit/f6f923e8eff210c294b00955cb31a7d265fa0a01))
- **ci:** provide NODE_AUTH_TOKEN with NPM_TOKEN for setup-node .npmrc auth ([388f49c](https://github.com/mindulle/sonagi-design-system/commit/388f49c9bee5e03b6044268e768050f9bd08e07c))
- **ci:** relax token version validation to allow semantic-release bump ([3793417](https://github.com/mindulle/sonagi-design-system/commit/3793417886ba9df2464cf77c45b84da17f469ba9))
- **ci:** remove id-token permission to disable broken OIDC path and fallback to valid NPM_TOKEN ([bb0497f](https://github.com/mindulle/sonagi-design-system/commit/bb0497f7296cd4d48193d83aa49a49dcc6eded5a))
- **ci:** remove NODE_AUTH_TOKEN causing npm authentication conflict ([654841a](https://github.com/mindulle/sonagi-design-system/commit/654841a6982116858d8cbf7559cb9a8f2fdd5c5f))
- **ci:** remove process.exit from warning to fix semantic-release build ([8158ca3](https://github.com/mindulle/sonagi-design-system/commit/8158ca3339eabdf0788ea927f8a98ebe02e3a1f1))
- **ci:** remove provenance to publish using standard NPM_TOKEN with bypass 2FA ([a5908ed](https://github.com/mindulle/sonagi-design-system/commit/a5908ed2fa7096e6fe74d9f50063b179a2e35a40))
- **ci:** remove redundant pnpm version in release workflow ([161213f](https://github.com/mindulle/sonagi-design-system/commit/161213fb6755bc1fa77f8191323bce1da006ee3b))
- **ci:** remove registry from publishConfig to fix OIDC registry URL mismatch ([29378a9](https://github.com/mindulle/sonagi-design-system/commit/29378a98ad0db5d30dc813eefecae30a1c162563))
- **ci:** remove registry-url from setup-node to prevent empty npmrc breaking native NPM OIDC publish ([1c6af7d](https://github.com/mindulle/sonagi-design-system/commit/1c6af7db8da0dc5fc5d605e7cc1c5a0f707fce9d))
- **ci:** remove registry-url from setup-node to prevent empty npmrc generation breaking OIDC publish ([b4d850a](https://github.com/mindulle/sonagi-design-system/commit/b4d850a8dea43e8f75fc445a46761ed043a84548))
- **ci:** rename .releaserc.js to .releaserc.cjs for ES module compatibility ([09fb8c8](https://github.com/mindulle/sonagi-design-system/commit/09fb8c81ab5a96aac4d66e83c4ac330e0e7c2aa3))
- **ci:** restore NPM_TOKEN to pass semantic-release verifyConditions while using OIDC for publish ([fcd2573](https://github.com/mindulle/sonagi-design-system/commit/fcd2573a336be11989c841b91f4ed100171c5d82))
- **ci:** restore package.json version to 3.1.0 to match design tokens ([296236a](https://github.com/mindulle/sonagi-design-system/commit/296236a5aeb79d39ba1ca96e494f96a4b7cfe00f))
- **ci:** restore registry-url for npm publish OIDC now that semantic-release npm plugin is removed ([affb81e](https://github.com/mindulle/sonagi-design-system/commit/affb81e3566cb4b892aa7502cbca6c6fe85b30c3))
- **ci:** restore registry-url for setup-node to enable NPM OIDC auth flow ([d8b8c99](https://github.com/mindulle/sonagi-design-system/commit/d8b8c9940fb941a5288025da3e9d05313dbd5975))
- **ci:** restore registry-url to setup-node for NPM OIDC ([fbec8ee](https://github.com/mindulle/sonagi-design-system/commit/fbec8eed8d75b11f3fd976ad06ddd26d29d37421))
- **ci:** restore simple NPM_TOKEN publish workflow ([6fa96fa](https://github.com/mindulle/sonagi-design-system/commit/6fa96fa974b81490e24518763c1d2ef418acc860))
- **ci:** revert back to npm public registry and wait for valid NPM_TOKEN ([5f9cec8](https://github.com/mindulle/sonagi-design-system/commit/5f9cec8a50a36a4a8f636b0b89e83756c631bc5a))
- **ci:** switch semantic-release publishing target to GitHub Packages and fix releaserc syntax ([30d76fa](https://github.com/mindulle/sonagi-design-system/commit/30d76fa5730aecdbb47af90212c672cf41ae3875))
- **ci:** trigger release using NPM Trusted Publishing (OIDC) ([e97eb06](https://github.com/mindulle/sonagi-design-system/commit/e97eb064c158b3986c4ed7f9df703cf3cd2f337a))
- **ci:** update node version to 22 for pnpm 11 compatibility ([5e595df](https://github.com/mindulle/sonagi-design-system/commit/5e595df6e9c60d8ba3b1b9d49ba0146276039951))
- **ci:** use unique tagFormat for monorepo packages in semantic-release ([3c6e735](https://github.com/mindulle/sonagi-design-system/commit/3c6e735246a16d2d3f6eb55138e980ccc9986a44))

### Features

- add @mindulle/ui package scaffold ([e8946bd](https://github.com/mindulle/sonagi-design-system/commit/e8946bd423752e53d33bc316671baf4ef6fe72b0))
- **infra:** 도입 AI 자동 PR 리뷰 파이프라인 (Key Rotation) ([e96b597](https://github.com/mindulle/sonagi-design-system/commit/e96b59741a8af3a2239e0185e3f863e7a171be11))
- initial release @mindulle/tokens v1.1.0 ([e220357](https://github.com/mindulle/sonagi-design-system/commit/e2203573bf3805c9edd279a735a43a740de47c9b)), closes [#faf9f7](https://github.com/mindulle/sonagi-design-system/issues/faf9f7) [#010609](https://github.com/mindulle/sonagi-design-system/issues/010609) [#1991B9](https://github.com/mindulle/sonagi-design-system/issues/1991B9) [#083A64](https://github.com/mindulle/sonagi-design-system/issues/083A64)
- synchronize v3.1.0 brand tokens with design system ([b79e3ed](https://github.com/mindulle/sonagi-design-system/commit/b79e3eddafe2542db0b4bc9f22a8027627801885))
