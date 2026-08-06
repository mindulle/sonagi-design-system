# @sonagi/tokens

Sonagi 디자인 시스템의 공식 디자인 토큰 패키지입니다.
CSS Custom Properties와 W3C Design Tokens JSON 포맷을 제공합니다.

## 설치

```bash
npm install @sonagi/tokens
# 또는
pnpm add @sonagi/tokens
```

## 사용법

### CSS (모든 프레임워크)

```css
@import '@sonagi/tokens/css';

.button {
  background-color: var(--sng-color-brand-primary);
  color: var(--sng-color-text-inverse);
  border-radius: var(--sng-radius-base);
}
```

### Next.js / React

```tsx
// app/layout.tsx 또는 globals.css에서 한 번만 import
import '@sonagi/tokens/css';
```

### Evidence (Svelte)

```js
// evidence.config.yaml 또는 app.css에서 import
@import '@sonagi/tokens/css';
```

## 다크모드

토큰은 라이트/다크 모드를 자동으로 지원합니다.

- **기본**: 라이트모드 값 적용
- **다크모드**: `<html>` 요소에 `data-theme="dark"` 속성 추가

```js
// 다크모드 전환
document.documentElement.setAttribute('data-theme', 'dark');

// 라이트모드 전환
document.documentElement.removeAttribute('data-theme');
```

## 토큰 목록

### 색상

| 변수                              | 라이트    | 다크      | 용도           |
| --------------------------------- | --------- | --------- | -------------- |
| `--sng-color-brand-primary`       | `#1c2c4d` | `#1c2c4d` | 주 브랜드 색상 |
| `--sng-color-brand-primary-dark`  | `#0a1128` | `#0a1128` | 딥 블루        |
| `--sng-color-brand-primary-hover` | `#1275b5` | `#1275b5` | hover 상태     |
| `--sng-color-bg-base`             | `#faf9f7` | `#010609` | 페이지 배경    |
| `--sng-color-bg-surface`          | `#fff8f2` | `#0d1117` | 카드, 패널     |
| `--sng-color-bg-elevated`         | `#ffffff` | `#161b22` | 모달, 드롭다운 |
| `--sng-color-bg-overlay`          | `#f0ede8` | `#1c2128` | hover 오버레이 |
| `--sng-color-text-primary`        | `#0d1117` | `#f0f6fc` | 본문 텍스트    |
| `--sng-color-text-secondary`      | `#30363d` | `#c9d1d9` | 보조 텍스트    |
| `--sng-color-text-muted`          | `#8b949e` | `#8b949e` | placeholder    |
| `--sng-color-border-default`      | `#e6eaef` | `#30363d` | 기본 테두리    |
| `--sng-color-border-strong`       | `#1c2c4d` | `#1c2c4d` | 강조 테두리    |
| `--sng-color-state-success`       | `#2ea043` | `#2ea043` | 성공           |
| `--sng-color-state-warning`       | `#d29922` | `#d29922` | 경고           |
| `--sng-color-state-error`         | `#f85149` | `#f85149` | 오류           |

### 타이포그래피

| 변수                   | 값                           |
| ---------------------- | ---------------------------- |
| `--sng-font-sans`      | Pretendard, Inter, system-ui |
| `--sng-font-serif`     | Noto Serif KR, Merriweather  |
| `--sng-font-mono`      | JetBrains Mono, Fira Code    |
| `--sng-font-size-base` | 16px                         |

### 간격 / 반경 / 기타

| 변수                 | 값                           |
| -------------------- | ---------------------------- |
| `--sng-radius-base`  | 6px                          |
| `--sng-radius-md`    | 8px                          |
| `--sng-radius-full`  | 9999px                       |
| `--sng-border-thin`  | 1px                          |
| `--sng-border-base`  | 2px                          |
| `--sng-shadow-focus` | 0 0 0 3px (브랜드 컬러 기반) |

전체 목록은 [`tokens/variables.css`](./tokens/variables.css) 참조.

## 버전

| 버전  | 내용                                                    |
| ----- | ------------------------------------------------------- |
| 1.2.0 | 토큰 네이밍 개편 및 CDN 쇼케이스 자동화 적용            |
| 1.1.0 | Primitive/Semantic 2-레이어, 라이트/다크 모드 완전 지원 |
| 1.0.0 | 초기 릴리즈, 다크모드 전용                              |
