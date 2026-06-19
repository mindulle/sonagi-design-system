# AGENTS.md — sonagi-tokens

이 저장소는 Sonagi 디자인 시스템의 **토큰 단일 소스**입니다.
AI가 이 저장소를 수정할 때 반드시 따라야 할 규칙입니다.

---

## 이 저장소가 하는 일

- `tokens/variables.css` — CSS Custom Properties (라이트/다크 모드 대응)
- `tokens/design-tokens.json` — W3C Design Tokens 포맷 (원시값 + 시맨틱 매핑)

**컴포넌트 코드는 이 저장소에 없습니다.** 토큰만 관리합니다.

---

## 수정 규칙

### 1. 두 파일을 항상 함께 수정

`variables.css`와 `design-tokens.json`은 항상 동기화되어야 합니다.
하나만 수정하면 안 됩니다.

### 2. 색상값 변경 시 확인 사항

- 라이트/다크 모드 **둘 다** 대응값이 있는지 확인
- `variables.css`의 `:root` (라이트)와 `.dark` (다크) 블록 **모두** 업데이트
- `design-tokens.json`의 `semantic.light`와 `semantic.dark` **모두** 업데이트

### 3. 새 토큰 추가 규칙

```
이름 형식: --color-{category}-{role}
카테고리: brand | bg | text | border | state | shadow

예시:
  --color-brand-primary       ✅
  --color-bg-surface          ✅
  --color-text-muted          ✅
  --color-myCustomThing       ❌ (카테고리 없음)
  --blue-500                  ❌ (시맨틱하지 않음)
```

### 4. 절대 하지 말 것

- Primitive 값(`#1991B9` 등)을 컴포넌트가 직접 쓸 수 있는 곳에 노출하지 말 것
- 에이전트 아이덴티티 컬러 추가 금지 (별도 결정 전까지)
- `--color-brand-logo: #00ffcc` 를 UI 토큰으로 쓰지 말 것 (로고 에셋 전용)

### 5. 버전 관리

토큰 변경 시 `package.json`의 버전을 올립니다:

- 토큰 **추가** → patch (1.1.0 → 1.1.1)
- 토큰 **이름 변경 / 삭제** → minor (1.1.0 → 1.2.0) + README 변경 이력 업데이트
- 구조 변경 → major (1.1.0 → 2.0.0)

---

## 소비자 저장소 목록

| 저장소              | 프레임워크        | import 방식                               |
| ------------------- | ----------------- | ----------------------------------------- |
| `blog-sonagi-space` | Next.js (React)   | `@import '@sonagi/tokens'` in globals.css |
| BI 대시보드         | Evidence (Svelte) | `@import '@sonagi/tokens'` in app.css     |
