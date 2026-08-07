# Sonagi Design System 🌧️

![Sonagi Design System](https://img.shields.io/badge/Design%20System-Sonagi-1c2c4d?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-11.x-f69220?style=for-the-badge&logo=pnpm&logoColor=white)

한국적 정서가 담긴 다크-네이비 기반, 비오는 날의 푸른빛(Rain-blue) 악센트를 사용하는 **Sonagi(소나기)** 프로덕트 생태계의 공식 디자인 시스템 모노레포입니다.

데이터 분석 대시보드처럼 밀도 높은 화면에서도 가독성을 잃지 않으며, 인간적이고 따뜻한 느낌을 유지하는 것을 목표로 합니다.

<br/>

## 📦 패키지 구성 (Packages)

이 저장소는 `pnpm` workspace 및 `Turborepo`를 활용한 모노레포로 구성되어 있습니다.

| 패키지               | 설명                                                                    | 문서                                  |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| **`@sonagi/tokens`** | 디자인 토큰 (색상, 타이포그래피, 간격 등) 및 프레임워크 독립적 CSS 변수 | [README](./packages/tokens/README.md) |
| **`@sonagi/ui`**     | `@sonagi/tokens` 기반으로 제작된 React UI 컴포넌트 라이브러리           | [README](./packages/ui/README.md)     |

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

- **Storybook 배포 링크**: [Sonagi Design System Storybook](https://6a74ac58510f8ede8dcbbdbd-zmycltjulb.chromatic.com/)

<br/>

## 📄 라이선스

MIT License
