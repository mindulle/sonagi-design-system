## [1.0.15](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.14...tokens-v1.0.15) (2026-07-04)


### Bug Fixes

* **ci:** restore registry-url for npm publish OIDC now that semantic-release npm plugin is removed ([affb81e](https://github.com/mindulle/sonagi-design-system/commit/affb81e3566cb4b892aa7502cbca6c6fe85b30c3))

## [1.0.14](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.13...tokens-v1.0.14) (2026-07-04)


### Bug Fixes

* **ci:** remove registry-url from setup-node to prevent empty npmrc breaking native NPM OIDC publish ([1c6af7d](https://github.com/mindulle/sonagi-design-system/commit/1c6af7db8da0dc5fc5d605e7cc1c5a0f707fce9d))

## [1.0.13](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.12...tokens-v1.0.13) (2026-07-04)


### Bug Fixes

* **ci:** deduplicate registry-url ([bab3dfe](https://github.com/mindulle/sonagi-design-system/commit/bab3dfe9b6eaf374e1cb52438f6ba62b5fa65868))
* **ci:** restore registry-url to setup-node for NPM OIDC ([fbec8ee](https://github.com/mindulle/sonagi-design-system/commit/fbec8eed8d75b11f3fd976ad06ddd26d29d37421))

## [1.0.12](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.11...tokens-v1.0.12) (2026-07-04)


### Bug Fixes

* **ci:** decouple npm publish from semantic-release for OIDC ([6517246](https://github.com/mindulle/sonagi-design-system/commit/65172467eddf5fe009e02706c438745344c058c9))

## [1.0.11](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.10...tokens-v1.0.11) (2026-07-04)


### Bug Fixes

* **ci:** fix path to publish.js for pnpm in semantic-release patch ([ab15ffc](https://github.com/mindulle/sonagi-design-system/commit/ab15ffc5f3e50812276a3c5791ee1361785f7625))
* **ci:** patch semantic-release to pass --provenance and restore id-token for OIDC ([f6f923e](https://github.com/mindulle/sonagi-design-system/commit/f6f923e8eff210c294b00955cb31a7d265fa0a01))

## [1.0.10](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.9...tokens-v1.0.10) (2026-07-04)


### Bug Fixes

* **ci:** completely remove NPM_CONFIG_PROVENANCE to disable OIDC signing ([773590e](https://github.com/mindulle/sonagi-design-system/commit/773590e9910a6a6018a091053b05a01eb2715427))

## [1.0.9](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.8...tokens-v1.0.9) (2026-07-04)


### Bug Fixes

* **ci:** remove provenance to publish using standard NPM_TOKEN with bypass 2FA ([a5908ed](https://github.com/mindulle/sonagi-design-system/commit/a5908ed2fa7096e6fe74d9f50063b179a2e35a40))

## [1.0.8](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.7...tokens-v1.0.8) (2026-07-04)


### Bug Fixes

* **ci:** remove id-token permission to disable broken OIDC path and fallback to valid NPM_TOKEN ([bb0497f](https://github.com/mindulle/sonagi-design-system/commit/bb0497f7296cd4d48193d83aa49a49dcc6eded5a))

## [1.0.7](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.6...tokens-v1.0.7) (2026-07-04)


### Bug Fixes

* **ci:** completely remove registry-url from setup-node to prevent empty auth token breaking OIDC ([ce4a6bb](https://github.com/mindulle/sonagi-design-system/commit/ce4a6bbe5118714a89c4e0fc301743647209b4c4))

## [1.0.6](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.5...tokens-v1.0.6) (2026-07-04)


### Bug Fixes

* **ci:** ensure publishConfig.registry has trailing slash to fix semantic-release OIDC check ([555100c](https://github.com/mindulle/sonagi-design-system/commit/555100cc4e1f4bf094504d493080f504ba99228d))

## [1.0.5](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.4...tokens-v1.0.5) (2026-07-04)


### Bug Fixes

* **ci:** restore registry-url for setup-node to enable NPM OIDC auth flow ([d8b8c99](https://github.com/mindulle/sonagi-design-system/commit/d8b8c9940fb941a5288025da3e9d05313dbd5975))

## [1.0.4](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.3...tokens-v1.0.4) (2026-07-04)


### Bug Fixes

* **ci:** add provenance true to package.json publishConfig to enforce OIDC publishing ([29e189c](https://github.com/mindulle/sonagi-design-system/commit/29e189c221eeb9c85da4c6cb93553ba98dd8c6d7))

## [1.0.3](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.2...tokens-v1.0.3) (2026-07-04)


### Bug Fixes

* **ci:** remove registry from publishConfig to fix OIDC registry URL mismatch ([29378a9](https://github.com/mindulle/sonagi-design-system/commit/29378a98ad0db5d30dc813eefecae30a1c162563))

## [1.0.2](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.1...tokens-v1.0.2) (2026-07-04)


### Bug Fixes

* **ci:** remove registry-url from setup-node to prevent empty npmrc generation breaking OIDC publish ([b4d850a](https://github.com/mindulle/sonagi-design-system/commit/b4d850a8dea43e8f75fc445a46761ed043a84548))
* **ci:** restore NPM_TOKEN to pass semantic-release verifyConditions while using OIDC for publish ([fcd2573](https://github.com/mindulle/sonagi-design-system/commit/fcd2573a336be11989c841b91f4ed100171c5d82))
* **ci:** trigger release using NPM Trusted Publishing (OIDC) ([e97eb06](https://github.com/mindulle/sonagi-design-system/commit/e97eb064c158b3986c4ed7f9df703cf3cd2f337a))

## [1.0.1](https://github.com/mindulle/sonagi-design-system/compare/tokens-v1.0.0...tokens-v1.0.1) (2026-07-04)


### Bug Fixes

* **ci:** correct syntax error in build script ([a669250](https://github.com/mindulle/sonagi-design-system/commit/a6692500b5fb5c75c3dc19077f72a5d3930528ce))
* **ci:** relax token version validation to allow semantic-release bump ([3793417](https://github.com/mindulle/sonagi-design-system/commit/3793417886ba9df2464cf77c45b84da17f469ba9))
* **ci:** remove process.exit from warning to fix semantic-release build ([8158ca3](https://github.com/mindulle/sonagi-design-system/commit/8158ca3339eabdf0788ea927f8a98ebe02e3a1f1))

# 1.0.0 (2026-07-04)


### Bug Fixes

* **ci:** bypass husky during semantic-release to prevent commitlint failure ([fc88349](https://github.com/mindulle/sonagi-design-system/commit/fc88349859904f024b396bc861415be292720ccf))
* **ci:** correctly remove pnpm version without breaking yaml syntax ([7c06d75](https://github.com/mindulle/sonagi-design-system/commit/7c06d7572b2a87cf0a0c8c83187bf4743b54f171))
* **ci:** fix yaml syntax error in release workflow ([d65b07e](https://github.com/mindulle/sonagi-design-system/commit/d65b07e93606b2da7020423ced13e9b890842dc1))
* **ci:** provide NODE_AUTH_TOKEN with NPM_TOKEN for setup-node .npmrc auth ([388f49c](https://github.com/mindulle/sonagi-design-system/commit/388f49c9bee5e03b6044268e768050f9bd08e07c))
* **ci:** remove NODE_AUTH_TOKEN causing npm authentication conflict ([654841a](https://github.com/mindulle/sonagi-design-system/commit/654841a6982116858d8cbf7559cb9a8f2fdd5c5f))
* **ci:** remove redundant pnpm version in release workflow ([161213f](https://github.com/mindulle/sonagi-design-system/commit/161213fb6755bc1fa77f8191323bce1da006ee3b))
* **ci:** restore package.json version to 3.1.0 to match design tokens ([296236a](https://github.com/mindulle/sonagi-design-system/commit/296236a5aeb79d39ba1ca96e494f96a4b7cfe00f))
* **ci:** revert back to npm public registry and wait for valid NPM_TOKEN ([5f9cec8](https://github.com/mindulle/sonagi-design-system/commit/5f9cec8a50a36a4a8f636b0b89e83756c631bc5a))
* **ci:** switch semantic-release publishing target to GitHub Packages and fix releaserc syntax ([30d76fa](https://github.com/mindulle/sonagi-design-system/commit/30d76fa5730aecdbb47af90212c672cf41ae3875))
* **ci:** update node version to 22 for pnpm 11 compatibility ([5e595df](https://github.com/mindulle/sonagi-design-system/commit/5e595df6e9c60d8ba3b1b9d49ba0146276039951))
* **ci:** use unique tagFormat for monorepo packages in semantic-release ([3c6e735](https://github.com/mindulle/sonagi-design-system/commit/3c6e735246a16d2d3f6eb55138e980ccc9986a44))


### Features

* add @sonagi/ui package scaffold ([e8946bd](https://github.com/mindulle/sonagi-design-system/commit/e8946bd423752e53d33bc316671baf4ef6fe72b0))
* **infra:** 도입 AI 자동 PR 리뷰 파이프라인 (Key Rotation) ([e96b597](https://github.com/mindulle/sonagi-design-system/commit/e96b59741a8af3a2239e0185e3f863e7a171be11))
* initial release @sonagi/tokens v1.1.0 ([e220357](https://github.com/mindulle/sonagi-design-system/commit/e2203573bf3805c9edd279a735a43a740de47c9b)), closes [#faf9f7](https://github.com/mindulle/sonagi-design-system/issues/faf9f7) [#010609](https://github.com/mindulle/sonagi-design-system/issues/010609) [#1991B9](https://github.com/mindulle/sonagi-design-system/issues/1991B9) [#083A64](https://github.com/mindulle/sonagi-design-system/issues/083A64)
* synchronize v3.1.0 brand tokens with design system ([b79e3ed](https://github.com/mindulle/sonagi-design-system/commit/b79e3eddafe2542db0b4bc9f22a8027627801885))

# 1.0.0 (2026-07-04)


### Bug Fixes

* **ci:** bypass husky during semantic-release to prevent commitlint failure ([fc88349](https://github.com/mindulle/sonagi-design-system/commit/fc88349859904f024b396bc861415be292720ccf))
* **ci:** correctly remove pnpm version without breaking yaml syntax ([7c06d75](https://github.com/mindulle/sonagi-design-system/commit/7c06d7572b2a87cf0a0c8c83187bf4743b54f171))
* **ci:** fix yaml syntax error in release workflow ([d65b07e](https://github.com/mindulle/sonagi-design-system/commit/d65b07e93606b2da7020423ced13e9b890842dc1))
* **ci:** provide NODE_AUTH_TOKEN with NPM_TOKEN for setup-node .npmrc auth ([388f49c](https://github.com/mindulle/sonagi-design-system/commit/388f49c9bee5e03b6044268e768050f9bd08e07c))
* **ci:** remove NODE_AUTH_TOKEN causing npm authentication conflict ([654841a](https://github.com/mindulle/sonagi-design-system/commit/654841a6982116858d8cbf7559cb9a8f2fdd5c5f))
* **ci:** remove redundant pnpm version in release workflow ([161213f](https://github.com/mindulle/sonagi-design-system/commit/161213fb6755bc1fa77f8191323bce1da006ee3b))
* **ci:** revert back to npm public registry and wait for valid NPM_TOKEN ([5f9cec8](https://github.com/mindulle/sonagi-design-system/commit/5f9cec8a50a36a4a8f636b0b89e83756c631bc5a))
* **ci:** switch semantic-release publishing target to GitHub Packages and fix releaserc syntax ([30d76fa](https://github.com/mindulle/sonagi-design-system/commit/30d76fa5730aecdbb47af90212c672cf41ae3875))
* **ci:** update node version to 22 for pnpm 11 compatibility ([5e595df](https://github.com/mindulle/sonagi-design-system/commit/5e595df6e9c60d8ba3b1b9d49ba0146276039951))


### Features

* add @sonagi/ui package scaffold ([e8946bd](https://github.com/mindulle/sonagi-design-system/commit/e8946bd423752e53d33bc316671baf4ef6fe72b0))
* **infra:** 도입 AI 자동 PR 리뷰 파이프라인 (Key Rotation) ([e96b597](https://github.com/mindulle/sonagi-design-system/commit/e96b59741a8af3a2239e0185e3f863e7a171be11))
* initial release @sonagi/tokens v1.1.0 ([e220357](https://github.com/mindulle/sonagi-design-system/commit/e2203573bf3805c9edd279a735a43a740de47c9b)), closes [#faf9f7](https://github.com/mindulle/sonagi-design-system/issues/faf9f7) [#010609](https://github.com/mindulle/sonagi-design-system/issues/010609) [#1991B9](https://github.com/mindulle/sonagi-design-system/issues/1991B9) [#083A64](https://github.com/mindulle/sonagi-design-system/issues/083A64)
* synchronize v3.1.0 brand tokens with design system ([b79e3ed](https://github.com/mindulle/sonagi-design-system/commit/b79e3eddafe2542db0b4bc9f22a8027627801885))
