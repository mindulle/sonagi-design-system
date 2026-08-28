# ADR 0005: Package Distribution Strategy for Sonagi Design System

> **Status: SUPERSEDED by [ADR 0010](./0010-delivery-consolidation-github-packages.md) (2026-08-28).**
>
> This ADR ranked Git Submodule 1st, Cloudflare CDN 2nd, and GitHub Packages 3rd. Reality inverted that ranking:
> the Submodule path was never used, the `design.sonagi.space` CDN never served CSS, and GitHub Packages became
> the only working channel (`@mindulle/tokens` 1.1.1 → 1.8.0, `@mindulle/ui` 1.2.0 → 1.3.0 all shipped through it).
> Retained for historical context only. **Do not follow the recommendations below.**

## Context

사내 모노레포(`sonagi-design-system`)에 Figma v3.0 스펙을 동기화한 후, 이를 외부 블로그(KMS) 등 타 프로젝트에서 어떻게 참조하고 사용할 것인지에 대한 배포 방식 결정이 필요했습니다. 초기에 NPM 공개 레지스트리(NPM Registry) 배포를 기본값으로 고려했으나, 인증 토큰(NPM_TOKEN) 발급 및 유지 비용, 그리고 비공개 사내 자산의 보안 유지 관점에서 최적의 옵션을 검토했습니다.

## Decision

외주 고객용 퍼블릭 배포가 아닌 **자사 전용(Blog, KMS, 사내 서비스) 용도**의 특성을 감안하여, 아래 3가지 대안을 검토 후 **Git Submodule / pnpm Monorepo Workspace** 연동 방식(1순위)과 **Cloudflare Pages CDN** 연동 방식(2순위)을 최종 채택/권장하기로 결정했습니다.

### 1. Git Submodule / pnpm Monorepo Workspace (로컬/자사 전용 - 1순위)

- **방식:** 외부 NPM 레지스트리를 거치지 않고, 블로그/KMS 레포지토리에서 `sonagi-design-system`을 Git Submodule 또는 pnpm workspace로 직접 연결합니다.
- **장점:**
  - NPM 유료 계정(Org)이나 토큰 세팅이 불필요합니다.
  - 빌드 속도가 가장 빠르며, 피그마 스펙이 바뀌었을 때 패키지 재배포(Publish) 없이 로컬에서 즉시 반응합니다.
  - 사내 Private 자산의 보안이 100% 유지됩니다.

### 2. Cloudflare Pages / MinIO Static CDN 배포 (CSS & UMD Bundle - 2순위)

- **방식:** 현재 CI에서 작동 중인 Cloudflare Pages(`https://design.sonagi.space/variables.css`) 및 정적 CDN을 활용합니다.
- **장점:**
  - `<link rel="stylesheet" href="https://design.sonagi.space/variables.css">` 형태로 웹페이지나 타 플랫폼(HTML 기반)에서 손쉽게 토큰을 수혈받을 수 있습니다.
  - 별도의 NPM 인증 절차가 없습니다.

### 3. GitHub Packages (참고용 - 3순위)

- **방식:** `npm.pkg.github.com` (GitHub 내장 레지스트리) 이용.
- **장점:** `GITHUB_TOKEN`을 그대로 사용 가능. 단, 다운로드 시 인증 절차가 수반되어 1/2순위보다 구성이 다소 무겁습니다.

## Consequences

- 향후 `blog-sonagi-space` 등 신규 사내 프로젝트 세팅 시, `npm install` 방식이 아닌 Git Submodule 연동이나 Workspace 링킹을 통한 의존성 주입을 1원칙으로 채택합니다.
- 단순 CSS 변수만 필요한 프로젝트는 Cloudflare CDN 링크를 사용합니다.
- NPM 인증 에러나 CI 배포 실패로 인해 디자인 시스템 적용이 블로킹되는 문제를 완전히 해소할 수 있습니다.
