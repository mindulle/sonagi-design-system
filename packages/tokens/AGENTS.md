# AGENTS.md — @mindulle/tokens

이 패키지는 Sonagi 디자인 시스템의 **토큰 단일 소스(SSOT)** 입니다.
AI가 이 패키지를 수정할 때 반드시 따라야 할 규칙입니다.

---

## 파일 구조 — 무엇이 소스이고 무엇이 생성물인가

### ✍️ 소스 (직접 수정하는 파일)

| 파일                   | 역할                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `tokens/primitives.json` | **Tier 1.** 색상 팔레트 원시값, 절대 크기값. UI가 직접 참조하지 않습니다. |
| `tokens/semantics.json`  | **Tier 2.** 의미 기반 토큰. Light/Dark를 이 계층 내부에서 Mode로 분기합니다. |

### 🤖 생성물 (절대 손으로 고치지 말 것)

| 파일                  | 생성 주체                                     |
| --------------------- | --------------------------------------------- |
| `tokens/variables.css` | `scripts/build.js` (`build.js:133`)           |
| `dist/variables.css`   | `scripts/build.js` (`build.js:132`)           |
| `dist/index.js/.mjs/.d.ts` | `scripts/build.js` (`build.js:217-219`)   |
| `dist/index.html`      | `scripts/build.js` — 토큰 쇼케이스 프리뷰     |

> 🚨 **`variables.css`를 직접 편집하면 다음 `pnpm build`에서 덮어써집니다.**
> 파일 상단에 `Generated automatically from JSON tokens` 헤더가 있는 파일은 모두 생성물입니다.
> 색상·타이포·간격을 바꾸려면 `primitives.json` 또는 `semantics.json`을 고치고 빌드하십시오.

### 💤 휴면 (현재 비어 있음)

| 경로              | 상태                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `tokens/themes/`  | **의도적으로 비어 있음.** 2-Tier 확정 (ADR 0010). 겨울 소나기 테마 착수 시 재개. |

**컴포넌트 코드는 이 패키지에 없습니다** (`packages/ui`에 있습니다). 여기서는 토큰만 관리합니다.

---

## 수정 규칙

### 1. 소스만 고치고, 빌드로 반영한다

```bash
# 1) tokens/primitives.json 또는 tokens/semantics.json 수정
# 2) 빌드 + 검증
pnpm --filter @mindulle/tokens build
pnpm --filter @mindulle/tokens test   # validate-tokens.js + vitest
```

`variables.css`의 변경분은 빌드 결과로 커밋에 함께 포함되어야 합니다 (생성물이지만 저장소에 추적됩니다).

### 2. 색상값 변경 시 확인 사항

- 라이트/다크 **둘 다** 대응값이 있는지 확인합니다.
- Light/Dark는 `semantics.json` 내부의 Mode 분기로 표현합니다. CSS 셀렉터는 빌드가 생성합니다:
  - Light → `:root, [data-theme="light"], [data-theme="sonagi-core"]` (`build.js:108`)
  - Dark → `[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` (`build.js:109-110`)
- `.dark` **클래스 셀렉터는 사용하지 않습니다.** 데이터 속성 방식입니다.

### 3. 토큰 이름 규칙

모든 CSS 변수는 **`--sng-` 접두사**를 가집니다. 접두사 없는 `--color-*` 는 존재하지 않습니다.

```
형식: --sng-color-{category}-{role}
카테고리: brand | bg | text | border | state | shadow

예시:
  --sng-color-brand-primary   ✅
  --sng-color-bg-surface      ✅
  --sng-color-text-muted      ✅
  --sng-color-myCustomThing   ❌ (카테고리 없음)
  --sng-color-blue-500        ⚠️ Primitive — UI에서 직접 참조 금지
  --color-brand-primary       ❌ (--sng- 접두사 누락)
```

접두사 변환 로직은 `build.js`의 `getCssVarName()`에 있습니다. 이름 규칙을 바꾸려면 그 함수를 고쳐야 합니다.

### 4. 절대 하지 말 것

- 생성물(`variables.css`, `dist/*`)을 직접 편집하지 말 것
- Primitive 값(`#1991B9` 등)을 컴포넌트가 직접 쓸 수 있는 곳에 노출하지 말 것
- 에이전트 아이덴티티 컬러 추가 금지 (별도 결정 전까지)
- `--sng-color-brand-logo: #00ffcc` 를 UI 토큰으로 쓰지 말 것 (로고 에셋 전용)

### 5. 버전 관리 — 손으로 올리지 말 것

**`package.json`의 `version`을 직접 수정하지 마십시오.**
`.github/workflows/release.yml`의 **semantic-release**가 Conventional Commits를 분석해 자동으로 버전을 올리고, 태그·CHANGELOG·GitHub Packages 발행까지 수행합니다.

에이전트가 통제하는 것은 **커밋 메시지 타입**입니다:

| 커밋 타입                    | 결과  |
| ---------------------------- | ----- |
| `fix:`                       | patch |
| `feat:`                      | minor |
| `feat!:` / `BREAKING CHANGE:` | major |
| `chore:` / `docs:` / `style:` | 릴리스 없음 |

### 6. 작업 제출 규칙 (PR 생성 의무)

로컬에서 빌드·테스트를 통과하더라도 **절대 `main` 브랜치에 직접 푸시하지 마십시오.**
반드시 새 브랜치를 파서 푸시한 뒤 **Pull Request를 생성**해야 합니다. 이를 통해 Chromatic 시각적 회귀 테스트 및 릴리스 파이프라인이 정상 동작합니다.

---

## 배포 (Delivery)

**GitHub Packages 단일 채널입니다** (ADR 0010). 토큰용 공개 CDN은 존재하지 않습니다 — `design.sonagi.space`, `cdn.sonagi.space` 어느 쪽도 CSS를 서빙하지 않으므로 링크를 걸지 마십시오.

| 항목       | 값                                                          |
| ---------- | ----------------------------------------------------------- |
| 레지스트리 | `https://npm.pkg.github.com`                                |
| CSS 진입점 | `@mindulle/tokens/css` → `dist/variables.css`               |
| JS 진입점  | `@mindulle/tokens` → `dist/index.mjs` / `index.js`          |
| 원본 접근  | `@mindulle/tokens/tokens/*` (예: `.../tokens/semantics.json`) |

## 소비자 저장소 목록

| 저장소              | 프레임워크        | import 방식                             |
| ------------------- | ----------------- | --------------------------------------- |
| `blog-sonagi-space` | Next.js (React)   | `import '@mindulle/tokens/css'`         |
| BI 대시보드         | Evidence (Svelte) | `import '@mindulle/tokens/css'`         |
| `@mindulle/ui`      | (워크스페이스)    | `@import '../../tokens/dist/variables.css'` |

## ⚠️ 알려진 미해결 사항

`tokens/` 아래 손작성 CSS 3개(`spacing.css`, `opacity.css`, `radius.css`)는 **생성물 `variables.css`에 통합되어 있지 않으며, 현재 아무 곳에서도 참조되지 않습니다.**

- `spacing.css`의 `--sng-space-gap-*` / `--sng-space-container-*` 는 `variables.css`의 `--sng-spacing-{0..24}` 와 **명명 체계가 다른 중복 정의**입니다.
- `opacity.css`의 `--sng-opacity-*` 는 `variables.css`에 **대응 토큰이 아예 없습니다.**

`@mindulle/tokens/css` 만 import 하는 소비자는 이 토큰들을 받지 못합니다. 통합·삭제·유지 중 어느 쪽으로 갈지는 미결정 상태이므로, 새 컴포넌트에서 이 변수들을 **참조하지 마십시오.**
