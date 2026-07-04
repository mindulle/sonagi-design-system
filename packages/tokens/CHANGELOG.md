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
