# @sonagi/ui

Sonagi 디자인 시스템의 공식 UI 컴포넌트 라이브러리입니다.
이 패키지는 프레임워크 비종속적인 스타일(Core CSS)과 React 래퍼 컴포넌트들을 제공합니다.

## 설치

```bash
npm install @sonagi/ui @sonagi/tokens
# 또는
pnpm add @sonagi/ui @sonagi/tokens
```

> **Note:** 이 패키지는 `react >= 18` 및 `react-dom >= 18`을 peerDependency로 요구합니다.

## 설정 및 사용법

### 1. 글로벌 스타일시트 불러오기

애플리케이션의 최상위 진입점(예: Next.js의 `app/layout.tsx` 또는 `pages/_app.tsx`)에서 디자인 토큰과 글로벌 CSS 스타일시트를 임포트합니다.

```tsx
import '@sonagi/tokens/css';
import '@sonagi/ui/global.css';
```

### 2. React 컴포넌트 사용하기

임포트한 후, 원하는 React 컴포넌트를 가져와 사용합니다.

```tsx
import { Button, Card, Input, Badge, Wordmark, HoverPreview } from '@sonagi/ui';

function App() {
  return (
    <Card>
      <Wordmark lang="en">sonagi</Wordmark>
      <p>
        디자인 시스템의 자세한 내용은{' '}
        <HoverPreview
          slug="design-token"
          fetchNote={async (slug) => ({ title: 'Design Token', excerpt: '...' })}
        >
          디자인 토큰 문서
        </HoverPreview>
        를 확인하세요.
      </p>
      <Input placeholder="이름을 입력하세요" />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button variant="primary">제출</Button>
        <Badge color="success">활성화됨</Badge>
      </div>
    </Card>
  );
}
```

## 제공되는 컴포넌트 명세

### 1. `Button`

기본 대화형 요소인 버튼 컴포넌트입니다.

- **Props:**
  - `variant`?: `'primary' | 'secondary' | 'danger'` (기본값: `'primary'`)
  - `size`?: `'sm' | 'md' | 'lg'` (기본값: `'md'`)
  - `loading`?: `boolean` (로딩 스피너 및 disabled 활성화)
  - `disabled`?: `boolean`
  - 표준 `<button>` 엘리먼트의 HTML 속성들을 상속받습니다.

### 2. `Card`

콘텐츠의 구획을 구분하고 카드 레이아웃을 생성합니다.

- **Props:**
  - `clickable`?: `boolean` (hover/active 인터랙션 및 키보드 접근성 지원)
  - `children`: `React.ReactNode`

### 3. `Input`

사용자 입력을 받기 위한 표준 텍스트 필드입니다.

- **Props:**
  - `error`?: `boolean` (에러 경계 스타일 및 `aria-invalid` 자동 바인딩)
  - `disabled`?: `boolean`
  - 표준 `<input>` 엘리먼트의 HTML 속성들을 상속받으며, `React.forwardRef`를 통한 Ref 바인딩을 지원합니다.

### 4. `Badge`

상태 또는 분류 레이블을 표시합니다.

- **Props:**
  - `variant`?: `'pill' | 'label'` (기본값: `'pill'`)
  - `color`?: `'success' | 'warning' | 'error' | 'info'` (기본값: `'info'`)
  - `children`: `React.ReactNode`

### 5. `Wordmark`

브랜드 로고를 고유의 포인트 컬러(로고 전용 `#00ffcc` 색상 도트)와 함께 표시합니다.

- **Props:**
  - `lang`?: `'en' | 'ko'` (기본값: `'en'`)
  - `children`: `React.ReactNode`

### 6. `HoverPreview`

위키링크 위에 마우스를 300ms 이상 머무르면 비동기로 해당 노트의 요약을 툴팁 팝업 형태로 보여줍니다.

- **Props:**
  - `slug`: `string` (노트 식별자)
  - `href`?: `string` (클릭 시 이동할 링크, 생략 시 `/notes/{slug}`로 이동)
  - `fetchNote`: `(slug: string) => Promise<{ title: string; excerpt: string }>` (비동기 노트 페칭 함수)
  - `children`: `React.ReactNode` (위키링크 텍스트)
