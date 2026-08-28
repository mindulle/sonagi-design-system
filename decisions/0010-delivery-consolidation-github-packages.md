# ADR 0010: 배포 채널 GitHub Packages 단일화 및 2-Tier 토큰 위계 확정

## Status

**Accepted** (2026-08-28) — [ADR 0005](./0005-package-distribution-strategy.md)를 supersede 한다.

## Context

Figma 작업물이 초기 완성 단계에 도달한 시점에서 배포 경로를 점검한 결과, 문서가 선언한 전략과 실제로 동작하는 경로가 정반대로 뒤집혀 있음이 확인되었다.

### 1. 선언된 전략 vs 실제 (ADR 0005 검증 결과)

| 채널                     | ADR 0005 선언        | 2026-08-28 실측                                              |
| ------------------------ | -------------------- | ------------------------------------------------------------ |
| Git Submodule / Workspace | **1순위**            | 소비 사례 0건. 구현된 적 없음                                |
| Cloudflare CDN            | **2순위**            | **작동 불가** (아래 2번)                                     |
| GitHub Packages           | 3순위 — "다소 무겁다" | **유일하게 작동. `@mindulle/tokens` 1.1.1 → 1.8.0 실 운영 중** |

ADR 0005가 GitHub Packages를 3순위로 내린 근거는 "NPM 인증 토큰 발급 및 유지 비용"이었다. 그러나 `.github/workflows/release.yml`의 semantic-release 파이프라인이 `GITHUB_TOKEN`만으로 이 문제를 이미 해소했고, 실제로 tokens 8회 / ui 3회의 릴리스가 무인으로 성공했다. 즉 기각 근거 자체가 소멸했다.

### 2. 문서가 언급하는 CDN 호스트 2개 모두 CSS를 서빙하지 않는다

문서마다 서로 다른 호스트를 정본으로 지목하고 있었다. 2026-08-28 두 호스트를 모두 실측한 결과는 다음과 같다.

#### 2-A. `design.sonagi.space` — 폐기된 SPA가 점유 (`DESIGN.md`, ADR 0005가 지목)

`/variables.css`, `/dist/variables.css`, `/tokens/variables.css`, `/` — **모든 경로**가 동일한 응답을 반환한다:

```
status=200  content-type=text/html; charset=utf-8  size=5667
```

본문은 폐기된 **OpenPencil SPA의 `index.html`** 이다. Cloudflare 앞단이 모든 경로를 SPA로 리라이트하기 때문이며, 이 현상은 [ADR 0001](./0001-color-system-redefinition.md)의 "시도 1(폐기)" 항목에 이미 기록되어 있었다.

이 실패 양상이 특히 위험한 이유는 **404가 아니라 200을 반환한다**는 점이다. `<link rel="stylesheet">` 는 조용히 무시되고, 소비자는 스타일이 전혀 적용되지 않은 화면을 원인 표시 없이 받게 된다. 그런데도 `DESIGN.md`의 Agent Prompt Guide는 "모든 HTML 산출물의 `<head>`에 이 링크를 넣으라"고 지시하고 있었다.

#### 2-B. `cdn.sonagi.space` — MinIO 버킷, 공개 읽기 불가 (`.opencode/SKILL.md`가 지목)

```
GET /                      → 403 AccessDenied  (application/xml)
GET /variables.css         → 403 AccessDenied  <BucketName>variables.css</BucketName>
GET /dist/variables.css    → 403 AccessDenied  <BucketName>dist</BucketName><Key>variables.css</Key>
```

응답이 S3 프로토콜 XML이며 경로를 `버킷/키`로 해석하고 있다. 즉 이 호스트는 **MinIO/S3 오브젝트 스토어**이고, 토큰 CSS는 공개 읽기 권한으로 게시된 적이 없다.

`.opencode/SKILL.md`는 이 호스트에 대해 "빌드 결과물이 **Cloudflare Pages**의 Git 통합으로 `cdn.sonagi.space`에 무중단 자동 배포된다 (스크립트 작성 불필요)"고 기술하고 있었으나, 위 응답은 Cloudflare Pages가 아니라 S3 계열 엔드포인트의 것이다. 해당 서술은 사실이 아니다.

**결론: 문서에 등장하는 CDN 채널은 2개 모두 실체가 없다.** 한쪽은 무관한 SPA가 점유했고, 다른 한쪽은 권한이 닫힌 오브젝트 스토어다.

### 3. 토큰 3-Tier 위계의 3층이 비어 있다

design-ops 거버넌스는 `primitives.json → semantics.json → themes/*.json` 3계층 미러링을 요구한다. 그러나 [ADR 0009](./0009-typography-major-third-upgrade.md)에서 `theme-desk-analyst.json`을 척결한 이후 `packages/tokens/tokens/themes/` 는 완전히 빈 디렉토리 상태이며, 현재 유효한 테마는 **가을 소나기(Sonagi Core) 단 하나**다. Light/Dark는 3층이 아니라 semantics 계층 내부 분기로 처리된다 (`build.js:108-110`).

테마가 1개인 상태에서 3계층을 형식적으로 유지하는 것은 순수 오버헤드다.

## Decision

### 1. 배포는 GitHub Packages로 단일화한다

- 정본 채널은 `https://npm.pkg.github.com` 이며, `.github/workflows/release.yml`의 semantic-release가 유일한 발행 주체다.
- 소비 방식:
  - 번들러 사용 프로젝트: `import '@mindulle/tokens/css';`
  - 순수 HTML 산출물: 설치된 파일을 직접 링크 (`./node_modules/@mindulle/tokens/dist/variables.css`)
- 신규 사내 프로젝트 세팅 시 Git Submodule 연동을 1원칙으로 삼던 ADR 0005의 지침은 폐기한다.

### 2. 토큰 CDN 채널을 공식 폐기한다

- `design.sonagi.space` 와 `cdn.sonagi.space` 는 **둘 다 토큰 배포 경로가 아니다.** 코드·문서·에이전트 프롬프트에서 두 호스트에 대한 스타일시트 링크 지시를 전부 제거한다.
- `.opencode/SKILL.md`의 "CDN 및 인프라 배포 시스템" 절은 검증되지 않은 서술이므로 사실에 맞게 교체한다.
- 향후 CDN이 실제로 필요해지면 **기존 두 도메인을 재활용하지 않고** 별도 호스트로 신설하며, 그때 별도 ADR로 다룬다. 재도입 시 최소 검증 기준은 `curl -I` 응답의 `content-type`이 `text/css` 인지 확인하는 것이다 (200 상태코드만으로는 불충분하다 — 위 2-A가 그 반례다).
- ADR 0001의 `design.sonagi.space` 언급은 실패 이력 기록이므로 원문을 보존한다.

### 3. 토큰 위계를 2-Tier로 확정한다 (조건부)

- 현행 정본 구조는 **`primitives.json` → `semantics.json`** 2계층이며, Light/Dark는 semantics 내부 Mode 분기로 처리한다.
- `themes/` 디렉토리와 `build.js`의 테마 로더는 **제거하지 않고 보존**한다. `fs.existsSync(THEMES_DIR)` 가드가 걸려 있어 빈 상태에서도 빌드가 정상 동작하며(`build.js:117`), 이것이 3-Tier 복귀 시 사용할 확장 지점이다.
- **재검토 조건**: 가을 소나기 테마가 안정적으로 정착했음이 확인되고 **겨울 소나기 테마**를 착수하는 시점에 3-Tier를 재개한다. 그 시점에 `themes/theme-winter-sonagi.json`을 추가하는 것만으로 로더가 자동 활성화된다.

### 4. 저장소 잔재를 제거한다

| 대상                                                | 사유                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| 추적 중인 `.tgz` 5개                                | `.gitignore`에 `*.tgz`가 있으나 이미 인덱스 등록됨. 구 `@sonagi` 스코프 2개 포함 |
| `packages/tokens/tokens/primitives.json.patch`      | 어디서도 참조되지 않는 no-op diff 잔재                            |
| `.github/workflows/debug-oidc.yml`                  | main push마다 실행되나 대상이 폐기된 `@sonagi/tokens` + npmjs.org OIDC |
| `PR_BODY.md`                                        | 1회성 PR 본문 잔재                                                |

## Consequences

- **Positive**: 문서를 믿고 링크를 걸면 조용히 실패하던 함정이 제거된다. 배포 채널이 1개로 좁혀져 "무엇이 정본인가"라는 질문이 사라진다.
- **Positive**: 테마가 1개인 동안 3계층 유지 비용을 지불하지 않으면서, 확장 지점은 코드에 그대로 남아 겨울 소나기 착수 시 재구현이 불필요하다.
- **Negative**: GitHub Packages는 다운로드 시 인증을 요구하므로, 빌드 스텝이 없는 외부 정적 페이지에서 토큰을 즉시 수혈받을 수 없다. 해당 요구가 실제로 발생하면 신규 CDN 호스트를 별도 ADR로 신설한다.
- **Follow-up**: `@mindulle/icons`, `@mindulle/discord-ui`는 `publishConfig`가 없고 `release.yml`에 job도 없어 영구 미배포 상태다. 배포 대상 편입 여부는 별도 판단이 필요하다.
