# Sonagi Design System (SDS) Core Guidelines

이 문서는 `sonagi-design-system` 리포지토리를 작업하는 Agent와 개발자를 위한 핵심 컨텍스트, 아키텍처 철학, 인프라스트럭처 가이드라인입니다.

## 0. Figma SSOT (정본)

| | |
| --- | --- |
| **파일** | `Sonagi Design System V3` |
| **키** | `AEoW19jmlUh3rFgzhhV1vH` |
| **Foundations** | node `198:2974` — "Sonagi Foundations (SSOT Live Sync)" |

폐기된 파일: `1hgAgnMvqn2uCF8i45Do4x`(스크래치 Test Page), `KN6Bl6Pb4aW2KJXpBhS7rZ`(4월자 방치). **참조 금지.**

읽기·검수용 PAT는 `~/.secrets/figma-pat` 에 있습니다. 환경변수 `FIGMA_TOKEN` 은 403이므로 사용하지 마십시오.

## 1. 아키텍처 철학 (Architecture Philosophy)

본 디자인 시스템은 단순한 React UI 라이브러리가 아닙니다. 여러 마이크로 SaaS와 사내 웹 플랫폼에 디자인 일관성을 부여하는 '중앙 통제소'입니다.

- **토큰 계층이 계약이다:** Figma 정본이 규정하는 것은 컴포넌트 API가 아니라 **토큰과 시각 상태**입니다. 실제로 정본 파일에는 `TEXT`/`BOOLEAN`/`INSTANCE_SWAP` 컴포넌트 속성이 하나도 없고 VARIANT 축(`Size`/`Type`/`State`)만 존재하며, `State` 축은 `Hover`/`Active`/`Focused` 처럼 **CSS 의사클래스에 대응**하는 형태입니다. 따라서 여러 소비자가 공유하는 재사용 단위는 `--sng-*` 토큰이고, React 컴포넌트는 그 소비자 중 하나입니다.
- **Headless & Platform Agnostic:** 토큰은 특정 프레임워크에 종속되지 않고 순수 CSS Custom Properties(`var(--sng-*)`)로 컴파일됩니다.
- **Single Source of Truth:** 모든 디자인 파라미터는 Figma 정본 → `packages/tokens` 하위 JSON → 코드로 흐릅니다.

> **이력 정리:** 과거 이 문서는 "외부 블로그(Blogger, Tistory)에 우겨넣기" 를 플랫폼 무관성의 근거로 들었고, 그 때문에 컴포넌트를 순수 HTML/CSS로만 작성해야 한다는 제약이 파생됐습니다. 해당 전제는 폐기되었습니다(페이지를 직접 구현하는 방식으로 전환). 'The Desk Analyst', 'Eagle Gallery' 등 멀티브랜드 요구도 함께 폐기되었습니다(ADR 0009 / 0010). 컴포넌트 구현 기술 선택은 미결정 상태이며, 토큰 계층의 프레임워크 무관성만 유효합니다.

## 2. 디자인 토큰 아키텍처 (2-Tier Token System)

모든 토큰은 다음 3단계 계층을 통해 조립됩니다. 시스템 수정 시 이 위계를 반드시 지켜야 합니다.

1. **Primitive Tokens (`primitives.json`)**
   - 색상 팔레트 베이스(예: `blue-500: #1275b5`), 절대적인 크기 값.
   - **사용 규칙:** 컴포넌트나 UI에서 절대 직접 참조하지 않습니다. Semantic 토큰을 정의할 때만 사용됩니다.
2. **Semantic Tokens (`semantics.json`)**
   - 의미와 용도를 부여한 토큰(예: `color-primary: {primitive.blue.500}`).
   - 라이트(Light) / 다크(Dark) 모드를 이 계층에서 분기하여 매핑합니다.
   - **사용 규칙:** 모든 UI 컴포넌트(`packages/ui`)와 외부 CSS는 이 Semantic 계층을 참조해야 합니다.
3. **Theme Overrides (`themes/*.json`)** — **현재 비활성 (확장 지점)**
   - 특정 브랜드를 위한 오버라이드 계층입니다.
   - **지금은 사용하지 않습니다.** 유효한 테마가 가을 소나기 하나뿐이므로 위계는 **2-Tier(Primitive → Semantic)** 로 확정되었고, `themes/` 디렉토리는 의도적으로 비어 있습니다 (ADR 0010).
   - 로더는 `fs.existsSync` 가드와 함께 보존되어 있어(`scripts/build.js:117`) **겨울 소나기 테마** 착수 시 JSON 파일 하나만 추가하면 자동 활성화됩니다. 자세한 내용은 `packages/tokens/tokens/themes/README.md` 참조.

## 3. 배포 채널 (Delivery)

**배포 채널은 GitHub Packages 단일화되어 있습니다** (ADR 0010). `.github/workflows/release.yml`의 semantic-release가 유일한 발행 주체입니다.

- **정본 레지스트리:** `https://npm.pkg.github.com` — `@mindulle/tokens`, `@mindulle/ui`
- **소비 방식:**
  - 번들러 사용 프로젝트: `import '@mindulle/tokens/css';`
  - 순수 HTML 산출물: 설치된 파일 직접 링크 (`./node_modules/@mindulle/tokens/dist/variables.css`)
- **🚨 토큰용 공개 CDN은 존재하지 않습니다.** `design.sonagi.space`(무관한 SPA가 점유, 모든 경로에 200 + HTML 반환)와 `cdn.sonagi.space`(MinIO, 403 AccessDenied) **모두 CSS를 서빙하지 않습니다.** 이 호스트들에 스타일시트 링크를 걸지 마십시오 — 특히 전자는 404가 아니라 200을 주므로 **조용히 실패**합니다.
- **CDN 재도입 시:** 기존 두 도메인을 재활용하지 말고 신규 호스트를 세우며, 별도 ADR로 결정합니다. 검증 기준은 응답의 `content-type`이 `text/css`인지 확인하는 것입니다 (상태코드 200만으로는 불충분).
- **스코프(Scope) 분리:** CSS 빌드 파이프라인(`scripts/build.js`)은 테마를 `[data-theme="테마명"]` 스코프로 감싸 출력합니다. 이 규약은 겨울 소나기 테마 도입 시에도 유지합니다.
- **하위 호환성:** 소비자 저장소(`blog-sonagi-space` 등)가 깨지지 않도록 기존 Semantic 변수명을 함부로 변경·삭제하지 않으며, 파이프라인 수정 시 멱등성을 보장합니다.

## 4. 개발 및 커밋 규칙 (Development Rules)

- **Monorepo:** `pnpm` workspace 및 `turbo` 기반 모노레포 환경입니다. 의존성 추가 시 최상위가 아닌 각 패키지에 맞게 추가하세요 (`pnpm add <pkg> --filter @mindulle/tokens`).
- **Commitlint:** `Conventional Commits` 규칙을 엄격히 따릅니다. 커밋 훅(`husky`, `commitlint`)이 적용되어 있으므로 `feat:`, `fix:`, `docs:`, `chore:` 등의 접두사를 반드시 사용하세요.
- **Code Formatting:** 저장 시 `prettier`가 자동으로 작동합니다. CSS, JSON 파일 수정 시 포맷이 깨지지 않도록 주의하세요.
