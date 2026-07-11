# Sonagi Design System (SDS) Core Guidelines

이 문서는 `sonagi-design-system` 리포지토리를 작업하는 Agent와 개발자를 위한 핵심 컨텍스트, 아키텍처 철학, 인프라스트럭처 가이드라인입니다.

## 1. 아키텍처 철학 (Architecture Philosophy)

본 디자인 시스템은 단순한 React UI 라이브러리가 아닙니다. **다양한 마이크로 SaaS, 사내 웹 플랫폼, 외부 블로그(Blogger, Tistory 등)**에 디자인의 일관성을 부여하는 '중앙 통제소'입니다.

- **Headless & Platform Agnostic:** 특정 프레임워크(React, Vue 등)에 종속되지 않습니다. 모든 디자인 토큰은 순수 CSS Custom Properties(`var(--...)`)로 컴파일되어야 합니다.
- **Multi-Brand Support:** '소나기(Sonagi Core)' 테마뿐만 아니라 'The Desk Analyst', 'Eagle Gallery' 등 여러 독립 브랜드의 테마를 동시에 지원해야 합니다.
- **Single Source of Truth:** 모든 디자인 파라미터(컬러, 폰트, 간격)는 `packages/tokens` 하위의 JSON 파일에서 출발하여 코드로 컴파일됩니다.

## 2. 디자인 토큰 아키텍처 (3-Tier Token System)

모든 토큰은 다음 3단계 계층을 통해 조립됩니다. 시스템 수정 시 이 위계를 반드시 지켜야 합니다.

1. **Primitive Tokens (`primitives.json`)**
   - 색상 팔레트 베이스(예: `blue-500: #1275b5`), 절대적인 크기 값.
   - **사용 규칙:** 컴포넌트나 UI에서 절대 직접 참조하지 않습니다. Semantic 토큰을 정의할 때만 사용됩니다.
2. **Semantic Tokens (`semantics.json`)**
   - 의미와 용도를 부여한 토큰(예: `color-primary: {primitive.blue.500}`).
   - 라이트(Light) / 다크(Dark) 모드를 이 계층에서 분기하여 매핑합니다.
   - **사용 규칙:** 모든 UI 컴포넌트(`packages/ui`)와 외부 CSS는 이 Semantic 계층을 참조해야 합니다.
3. **Theme Overrides (`themes/*.json`)**
   - 특정 브랜드(`theme-desk-analyst.json` 등)를 위한 오버라이드.
   - 기본 Semantic 토큰의 일부 값을 덮어써서 브랜드 고유의 아이덴티티를 만듭니다.

## 3. CDN 및 인프라 배포 시스템 (CDN & Infra)

저장소의 산출물은 `npm` 패키지뿐만 아니라 **정적 에셋 CDN**을 통해서도 배포됩니다. 외부 플랫폼(구글 Blogger, Tistory 등)은 npm 설치가 불가능하므로 `<link rel="stylesheet">` 방식으로 자체 CDN을 참조합니다.

- **글로벌 인프라 연동:** 소나기 인프라는 수동 배포(Ad-hoc)를 지양하고 **Ansible (IaC)**를 기반으로 관리됩니다(`sonagi-infra` 스킬 참조).
- **CDN 동기화 (Serverless):** CSS 배포 시 불필요한 K8s 리소스를 낭비하지 않도록, 빌드 결과물은 GitHub Actions가 아닌 **Cloudflare Pages**의 원네이티브 Git 통합 기능을 통해 `cdn.sonagi.space` 도메인으로 무중단 자동 배포됩니다. (스크립트 작성 불필요)
- **스코프(Scope) 분리:** 여러 테마가 하나의 CDN에서 충돌 없이 동작하도록, CSS 빌드 파이프라인(`scripts/build.js`)은 각 테마를 `[data-theme="테마명"]` 스코프로 감싸서 단일 또는 테마별 파일로 출력해야 합니다.
- **하위 호환성 (Backward Compatibility):** 이미 CDN 링크를 사용 중인 수많은 블로그/서비스가 깨지지 않도록, 기존 Semantic 변수명을 함부로 변경하거나 삭제해서는 안 되며, 파이프라인 수정 시 멱등성을 보장해야 합니다.

## 4. 개발 및 커밋 규칙 (Development Rules)

- **Monorepo:** `pnpm` workspace 및 `turbo` 기반 모노레포 환경입니다. 의존성 추가 시 최상위가 아닌 각 패키지에 맞게 추가하세요 (`pnpm add <pkg> --filter @sonagi/tokens`).
- **Commitlint:** `Conventional Commits` 규칙을 엄격히 따릅니다. 커밋 훅(`husky`, `commitlint`)이 적용되어 있으므로 `feat:`, `fix:`, `docs:`, `chore:` 등의 접두사를 반드시 사용하세요.
- **Code Formatting:** 저장 시 `prettier`가 자동으로 작동합니다. CSS, JSON 파일 수정 시 포맷이 깨지지 않도록 주의하세요.
