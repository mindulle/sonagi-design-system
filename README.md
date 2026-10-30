# Mindulle Design System (MDS v0.1.0) 🌼

[![Storybook](https://img.shields.io/badge/Storybook-Live_Docs-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://main--6a74ac58510f8ede8dcbbdbd.chromatic.com/)
![Design System](https://img.shields.io/badge/Design%20System-Mindulle%20MDS-060911?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-11.x-f69220?style=for-the-badge&logo=pnpm&logoColor=white)

> **"겨울 끝, 민들레."** (At Winter's End, Dandelion.)  
> 민들레 스튜디오(Mindulle Studio)와 산하 프로덕트 생태계의 공식 디자인 시스템 모노레포입니다. (인프라/엔진: Sonagi)

- **The True 2px Stem (줄기선)**: 비바람에도 꺾이지 않는 단단한 줄기와 자아를 지켜내는 선명한 2px 경계선.
- **4px Weathered Radius**: 인위적이지 않게 자연스럽게 마모된 4px 모듈러 곡률.
- **No Soft Shadows**: 모호한 안개와 기만을 배제하고 선명한 평면으로 공간을 규정.
- **W3C Single SSOT**: 옵시디언 다크(`#060911`)와 민들레 골드(`#FFC837`) 기반의 단일 라이트/다크 모드.

<br/>

## 📦 모노레포 구성 (Monorepo Packages & Apps)

이 저장소는 `pnpm` workspace 및 `Turborepo`를 활용한 모노레포로 구성되어 있습니다.

| 패키지 / 앱                  | 역할 및 설명                                               | 경로 / 문서                                                  |
| :--------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------- |
| **`@mindulle/docs`**         | FumaDocs 기반 컴포넌트 실시간 프리뷰 및 W3C 토큰 공식 문서 | [`apps/docs`](./apps/docs)                                   |
| **`portal`**                 | 3D 글래스 파빌리온 및 5대 전시실 브랜드 쇼룸               | [`apps/portal`](./apps/portal)                               |
| **`@mindulle/tokens`**       | W3C 표준 Primitives & Semantics 토큰 (CSS Variables SSOT)  | [`packages/tokens`](./packages/tokens/README.md)             |
| **`@mindulle/ui`**           | 16종 UI 컴포넌트 라이브러리 및 `MindulleLogo` 심볼         | [`packages/ui`](./packages/ui/README.md)                     |
| **`@mindulle/icons`**        | 24x24 2px stroke 시스템 벡터 아이콘                        | [`packages/icons`](./packages/icons/README.md)               |
| **`@mindulle/brand-assets`** | 공식 CI 마스터 인장, 락업, 소셜 카드, 벡터 에셋 킷         | [`packages/brand-assets`](./packages/brand-assets/README.md) |
| **`@mindulle/discord-ui`**   | 디스코드 봇 메시지 디자인 가이드라인 래퍼                  | [`packages/discord-ui`](./packages/discord-ui/README.md)     |

<br/>

## 🎨 디자인 원칙 (Design Principles)

Sonagi 디자인 시스템의 시각적 테마, 팔레트 구성, 레이아웃 규칙 및 AI 에이전트를 위한 프롬프트 가이드는 아래 문서에 상세히 정의되어 있습니다.

👉 **[DESIGN.md 읽어보기](./DESIGN.md)**

<br/>

## 🚀 시작하기 (Getting Started)

저장소를 클론한 후 로컬 환경에서 개발을 시작하는 방법입니다.

### 1. 의존성 설치

```bash
# Node.js >= 22 버전 환경을 권장합니다.
pnpm install
```

### 2. 전체 패키지 빌드

의존성 패키지(tokens 등)가 먼저 빌드되어야 UI 컴포넌트가 정상적으로 작동합니다.

```bash
pnpm run build
```

### 3. Storybook 실행

로컬에서 UI 컴포넌트 목록과 문서(Docs)를 확인하며 개발할 수 있습니다.

```bash
cd packages/ui
pnpm run storybook
```

<br/>

## 🧪 시각적 테스트 및 배포 (Chromatic)

본 저장소는 **Chromatic**과 연동되어 있습니다.
컴포넌트를 수정하고 PR을 생성하면 GitHub Actions가 자동으로 시각적 회귀 테스트(Visual Regression Test)를 수행하여, 의도치 않은 UI 깨짐 현상을 사전에 방지합니다.

- **Storybook 배포 링크**: [Sonagi Design System Storybook](https://main--6a74ac58510f8ede8dcbbdbd.chromatic.com/)

<br/>

## 📄 라이선스

MIT License
