# ADR 0006: 다크모드 팔레트 확정 및 ADR 0001 라이트 준수화

- **상태**: ✅ Decision 확정 (Phase 1 — 토큰 값). Figma/컴포넌트 반영은 CEO-1003에서 진행.
- **시작일**: 2026-08-27
- **확정일**: 2026-08-27
- **관련 이슈**: CEO-1014 (본 ADR), CEO-1013 (발견 경로), CEO-1003 (Figma 반영), CEO-981
- **관련 문서**: [ADR 0001(색상 재정의)](./0001-color-system-redefinition.md), [ADR 0003(shadow/elevation)](./0003-shadow-elevation-redefinition.md), `../packages/tokens/tokens/semantics.json`

## Context (왜 다시 정하나)

### 1. ADR 0001이 어디에도 완전히 구현되지 않았음

ADR 0001은 2026-08-22에 OKLCH 기반 파생과 WCAG 대비 검증을 거쳐 **B. 가을 소나기(Rust+Coral)** 방향을 확정했다. 그러나 상태 줄에 명시된 대로 "Figma/컴포넌트 반영은 별도 실행 단계"였고, 그 실행 단계(CEO-1003)가 미착수인 상태에서 각 레이어가 제각기 갈라졌다.

| 항목                      | ADR 0001 규정 | `semantics.json` | Figma V3                   |
| ------------------------- | ------------- | ---------------- | -------------------------- |
| `bg-base`                 | `#fcf2f0`     | `#fcf2f0` ✅     | `#fef2f2` ❌               |
| `bg-elevated`             | `#fefaf9`     | `#ffffff` ❌     | `#ffffff` ❌               |
| `text-primary`            | `#1e1311`     | `#1e1311` ✅     | `#111827` ❌               |
| `accent`                  | `#db6c66`     | `#db6c66` ✅     | — (`brand-secondary` 자리) |
| **`brand-primary`/`ink`** | **`#47211b`** | **`#1991B9`** ❌ | **`#2170cc`** ❌           |

`#1991B9`는 ADR 0001 Context 3항이 _"DESIGN.md의 방향과 무관함"_ 이라며 폐기 대상으로 지목한 바로 그 구형 틸블루다. 즉 ADR이 고치려던 값이 그대로 남아 발행되고 있었다.

### 2. Figma와 토큰의 "100% parity" 주장은 사실이 아님

커밋 `bc2353f`("perfect 100% parity with Foundation-v3")와 `llm-wiki/20_Wiki/Design/02_Areas/Design_System/Tokens/Foundation-Tokens.md:12`("100% 동기화되어 있습니다")를 검증하기 위해, Figma 파일 `Sonagi Design System V3`(`AEoW19jmlUh3rFgzhhV1vH`)의 시맨틱 토큰 30개를 `semantics.json`과 전수 비교했다.

```
비교 30건 → 일치 0건
  값 불일치        15건
  JSON에 부재      15건 (brand-secondary 계열, state-danger 계열, text-brand 등)
```

추가로 Figma 측 자체 결함도 확인됨: `background/bg-base`가 red-50(`#fef2f2`), `bg-surface`가 red-100(`#fee2e2`)에 매핑되어 페이지 배경이 붉은 램프를 참조하고 있으며, 토큰명에 오타(`text/text-sucess`)가 있고, `brand-primary-active`·`text-muted`·`state-danger-active`는 light/dark 모드값이 동일하다.

### 3. 현재 발행 중인 팔레트에 접근성 실패 4건

`@mindulle/tokens`는 `blog-sonagi-space`가 프로덕션에서 소비 중이다.

| 조합                                                    | 대비   | 기준        | 판정 |
| ------------------------------------------------------- | ------ | ----------- | ---- |
| `brand-primary`(`#1991B9`) on `bg-base`(`#fcf2f0`)      | 3.30:1 | 본문 4.5:1  | ❌   |
| `text-muted`(`#6e7681`) on dark `bg-base`(`#010609`)    | 4.43:1 | 본문 4.5:1  | ❌   |
| `text-muted`(`#6e7681`) on dark `bg-surface`(`#0d1117`) | 4.12:1 | 본문 4.5:1  | ❌   |
| `border-subtle`(`#30363d`) on dark `bg-base`            | 1.67:1 | UI 경계 3:1 | ❌   |

### 4. 다크모드에 명세와 근거가 없음

ADR 0001은 라이트 모드만 다뤘다. 현재 다크값(`#010609` / `#0d1117` / `#58a6ff` / `#f0f6fc`)은 GitHub 다크 팔레트에서 유래한 것으로 보이며, 어떤 ADR에도 도출 근거가 없다. 라이트가 웜(OKLCH hue 30°) 계열인데 다크는 쿨 계열이라 모드 전환 시 브랜드 동일성이 깨진다.

### 5. ADR 0001의 수치 신뢰성 재검증

방향을 정하기 전에 ADR 0001 Decision 표의 대비율을 독립적으로 재계산했다.

```
text-primary   16.51 (주장) / 16.51 (실측)     brand-primary  12.72 / 12.72
text-secondary  7.00 / 7.00                   accent          3.01 / 3.01
text-muted      4.54 / 4.54                   accent-hover    4.75 / 4.75
border-default  3.00 / 3.00                   border-subtle   1.51 / 1.51
white on accent 3.31 / 3.31   white on accent-hover 5.22 / 5.22   white on ink 13.99 / 13.99
                                                              → 11/11 소수점까지 일치
```

ADR 0001은 실제로 계산해서 작성된 문서다. 따라서 **라이트 팔레트는 재논의 대상이 아니며, 구현이 안 된 것이 문제**라고 판단한다.

## Options Considered

### 라이트 모드

| 안                      | 내용                                                            | 판정                                                      |
| ----------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| **ADR 0001 완전 적용**  | `brand-primary`를 `#47211b`로, `bg-elevated`를 `#fefaf9`로 교정 | ✅ 채택                                                   |
| 틸블루 유지             | `#1991B9` 계열을 살리되 명도를 낮춰 4.5:1 확보                  | 기각 — ADR 0001의 에디토리얼 방향 전환 결정을 되돌리는 것 |
| Figma V3(Tailwind) 채택 | `#2170cc` 기반                                                  | 기각 — 근거 기록 없음, `bg-base`=red-50 결함 포함         |

### 다크 모드 — 도출 방식

| 안                                    | 내용                               | 판정                                                                                       |
| ------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| 라이트 값 그대로 반전 사용            | 동일 hex를 어두운 배경에 재사용    | 기각 — 4개 중 3개 대비 탈락 (`accent-hover` 3.58:1, `ink` 1.34:1, `text-secondary` 2.43:1) |
| **OKLCH hue·chroma 승계 + 명도 반전** | ADR 0001과 동일 절차를 다크에 적용 | ✅ 채택                                                                                    |
| 현행 GitHub 팔레트 공식화             | `#010609`/`#58a6ff` 유지           | 기각 — 근거 부재, 모드 간 브랜드 불일치, 접근성 실패 3건 포함                              |

### 다크 `brand-primary` — 존재감 조정

명도만 반전한 `#e6bab2`(C 0.052)는 대비 10.39:1로 충분하나 로고로서 존재감이 약했다. chroma 상향안을 검토.

**상한 제약 도출**: 라이트에서 `ink`(C 0.0596)는 `accent`(C 0.1403)의 **42%**다. 다크에서 이 위계를 뒤집지 않으려면 `C ≤ 0.105`(accent의 75%)여야 한다.

| 안    | C         | accent 대비 비율 | dE(accent) | 대비        | 판정                                                                                 |
| ----- | --------- | ---------------- | ---------- | ----------- | ------------------------------------------------------------------------------------ |
| 현행  | 0.052     | 42%              | 0.125      | 10.39:1     | 존재감 부족                                                                          |
| **A** | **0.070** | **50%**          | **0.112**  | **10.13:1** | **✅ 채택**                                                                          |
| B     | 0.090     | 64%              | 0.099      | 9.88:1      | 기각 — 시각 검증에서 로고·고스트버튼 테두리·accent 버튼이 동일 색으로 읽혀 위계 붕괴 |
| C     | 0.110     | 79%              | 0.086      | 9.46:1      | 기각 — ink가 accent보다 선명해져 관계 역전                                           |
| D~E   | 0.130+    | 93%+             | 0.066↓     | —           | 기각 — sRGB 색역 이탈                                                                |

세 안을 동일 UI에 적용해 렌더링 비교한 뒤 A를 확정했다. 대비는 세 안 모두 9.8:1 이상이라 접근성이 아닌 **위계** 기준으로 판단했다.

## Decision

### 1. 라이트 — ADR 0001 규정값으로 교정

```
brand-primary / ink   #1991B9  →  #47211b     (3.30:1 → 12.72:1)
bg-elevated           #ffffff  →  #fefaf9
```

나머지 라이트 토큰은 이미 ADR 0001과 일치하므로 변경 없음.

### 2. 다크 — hue 24~34° 승계, 명도 반전으로 신규 확정

라이트 토큰 11개를 OKLCH로 역변환한 결과 hue가 24.3°~34.3°에 분포함을 확인했다(ADR 0001의 "hue 30° 고정" 주장이 OKLCH 기준으로 정확함). 이 hue와 chroma를 승계하고 명도(L)만 반전 배치했다.

| 토큰                    | 값        | vs `bg-base` | vs `bg-surface` | 기준 | 판정          |
| ----------------------- | --------- | ------------ | --------------- | ---- | ------------- |
| `bg-base`               | `#1c1412` | —            | —               | —    | 기준 배경     |
| `bg-surface`            | `#2c201e` | —            | —               | —    | 카드/패널     |
| `bg-elevated`           | `#392e2c` | —            | —               | —    | 모달/팝오버   |
| `text-primary`          | `#f7eeec` | 15.88:1      | 13.81:1         | 4.5  | ✅            |
| `text-secondary`        | `#c3b4b1` | 9.05:1       | 7.87:1          | 4.5  | ✅            |
| `text-muted`            | `#988a88` | 5.46:1       | 4.75:1          | 4.5  | ✅            |
| `text-disabled`         | `#6c605e` | 3.00:1       | 2.61:1          | —    | 비활성 표시용 |
| `brand-primary` / `ink` | `#eeb4a9` | 10.13:1      | 8.81:1          | 3.0  | ✅            |
| `accent`                | `#e5867f` | 6.95:1       | 6.04:1          | 3.0  | ✅            |
| `accent-hover`          | `#f7a7a1` | 9.50:1       | 8.25:1          | 4.5  | ✅            |
| `border-default`        | `#796966` | 3.48:1       | 3.02:1          | 3.0  | ✅            |
| `border-subtle`         | `#392d2b` | 1.37:1       | 1.19:1          | —    | 장식용 구분선 |
| `border-strong`         | `#eeb4a9` | 10.13:1      | 8.81:1          | 3.0  | ✅            |

**기능 토큰 전수 통과.** `border-default`는 최초 도출값(L 0.470, `#665754`)이 `bg-surface` 대비 2.64:1로 미달하여 최소 통과 명도를 역산해 L 0.534로 보정했다.

버튼 fill 검증:

```
bg-base on accent         6.95:1     bg-base on accent-hover   9.50:1
bg-base on brand-primary 10.13:1
```

다크 모드에서 버튼 전경색은 흰색이 아니라 `bg-base`(`#1c1412`)를 사용한다. `white on accent`는 2.00:1로 탈락한다.

**용도 규칙(ADR 0001에서 승계)**: `accent`는 버튼 fill·아이콘·보더 등 면적이 있는 용도. 텍스트 링크·얇은 밑줄에는 `accent-hover`를 사용한다. 다크에서는 hover가 라이트와 반대로 **더 밝아지는** 방향이다.

**Elevation 규칙**: 다크에서는 그림자가 아니라 배경 명도 상승으로 고도를 표현한다(`bg-base` → `bg-surface` → `bg-elevated`). 그림자 3단계 구조 자체는 ADR 0003 결정을 따른다.

### 3. 순수 검정·순수 흰색 배제

`bg-base`는 `#000000`이 아니라 hue 31° 틴트가 들어간 `#1c1412`를 쓴다. `text-primary`도 `#ffffff`가 아니라 `#f7eeec`이다. 이는 `llm-wiki/20_Wiki/Design/Sonagi_Figma_Architecture_Guide.md` 4-3항에 기록된 HeroUI 벤치마킹 결론(눈의 피로도 저감)과 일치한다.

### 4. ADR 0001 보정 — `bg-surface` 대비 미검증 구간 수정

다크 팔레트를 두 배경(`bg-base`, `bg-surface`) 모두에 대해 검증하는 과정에서, **ADR 0001은 `bg-base` 한 곳에만 대비를 검증했음**을 발견했다. 실제 UI에서 카드·패널은 `bg-surface`(`#f5e5e2`, L 0.934)를 사용하며 그 위에 본문·보조 텍스트·버튼이 올라간다. `bg-surface`는 `bg-base`(L 0.968)보다 어두우므로 대비가 낮아진다.

| 토큰             | ADR 0001 값 | vs `bg-base` | vs `bg-surface` | 기준 | 판정 |
| ---------------- | ----------- | ------------ | --------------- | ---- | ---- |
| `accent`         | `#db6c66`   | 3.01 ✅      | **2.71**        | 3.0  | ❌   |
| `accent-hover`   | `#b94644`   | 4.75 ✅      | **4.27**        | 4.5  | ❌   |
| `text-muted`     | `#7c6c6a`   | 4.54 ✅      | **4.08**        | 4.5  | ❌   |
| `border-default` | `#9d8986`   | 3.00 ✅      | **2.70**        | 3.0  | ❌   |

해당 조합은 WCAG 1.4.3(본문 대비) 및 1.4.11(비텍스트 대비) 위반이다.

#### 검토한 대안

| 안                      | 내용                                               | 판정                                                                                         |
| ----------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **전경 토큰 명도 하향** | 4개 토큰을 `bg-surface` 기준 통과 최소 명도로 역산 | ✅ 채택                                                                                      |
| `bg-surface` 명도 상향  | 배경을 밝혀 대비 확보                              | 기각 — 통과 지점이 L 0.969인데 `bg-base`가 L 0.968이라 두 배경이 동일해짐. surface 위계 소멸 |
| 용도 제약 문서화        | 값 유지, "카드 안에서는 다른 토큰 사용" 규칙 추가  | 기각 — 지킬 수 없는 예외 규칙을 늘리는 방향. 값 자체가 어디서든 안전한 편이 낫다             |

#### 보정 결과

hue·chroma는 그대로 두고 OKLCH 명도만 하향했다. 변화폭 ΔL 0.02~0.03으로 육안 식별이 어렵다.

| 토큰             | 기존      | 보정      | vs `bg-base` | vs `bg-surface` |
| ---------------- | --------- | --------- | ------------ | --------------- |
| `accent`         | `#db6c66` | `#d2645f` | 3.33         | 3.00 ✅         |
| `accent-hover`   | `#b94644` | `#b44240` | 5.03         | 4.53 ✅         |
| `text-muted`     | `#7c6c6a` | `#756563` | 5.03         | 4.53 ✅         |
| `border-default` | `#9d8986` | `#95817f` | 3.34         | 3.00 ✅         |

`--sng-shadow-focus`의 라이트 값도 구 `accent-hover`(`rgba(185,70,68,0.3)`)를 참조하고 있었으므로 `rgba(180,66,64,0.3)`로 함께 교정했다.

**신규 검증 규칙**: 이후 모든 전경 토큰은 `bg-base`와 `bg-surface` **양쪽**에 대해 검증한다. 가장 불리한 배경을 기준으로 삼는다.

## Consequences

### 영향 범위

1. **`@mindulle/tokens`** — `semantics.json` / `variables.css` 동시 수정 (해당 저장소 `AGENTS.md` §1: 두 파일 항상 함께 수정). 색상 전면 변경이므로 **semver major 후보**.
2. **`blog-sonagi-space`** — 프로덕션 소비처. `@import '@mindulle/tokens/css'` 경유로 즉시 영향. 로고 SVG 색상은 ADR 0001에서 미해결로 남긴 사안이라 별도 처리 필요.
3. **`@mindulle/ui`** — Button/Modal/Pagination 등 컴포넌트가 시맨틱 토큰만 참조한다면 코드 변경 불필요. 하드코딩된 hex가 있으면 교체 대상.
4. **Figma V3** — CEO-1003에서 Local Variables를 본 ADR 값으로 재작성. Variables 구조·모드 배선·컴포넌트 바인딩(fill 100%, padding 27개소, radius 29개소)은 값과 분리되어 있으므로 **재사용 가능**하며, 값 교체만으로 컴포넌트가 따라온다.
5. **Foundation 페이지 시각화** — 수기로 그려진 색칩·라벨은 폐기 대상. CEO-1012에서 스크립트 재생성하기로 합의된 범위다.

### 미해결로 남기는 것

- **`state-*` 계열 (info/success/warning/error)** — 현재 라이트는 웜 계열과 무관한 값(`#2ea043`, `#d29922` 등)이고 다크는 GitHub 팔레트다. 상태색은 의미 전달이 우선이라 브랜드 hue 고정 대상이 아닐 수 있어 별도 판단이 필요하다. **ADR 0007로 분리**.
- **`brand-secondary` 계열** — Figma에만 존재하고 JSON에 없다. ADR 0001이 정의한 2색 체계(ink + accent)에 3번째 브랜드색이 필요한지 판단 필요.
- **로고/워드마크 색상** — ADR 0001이 명시적으로 범위 밖으로 남긴 사안. 프로덕션 SVG는 `#4a90e2`, 토큰은 `#00ffcc`, 문서는 또 다름.
- **Figma 측 결함** — `text-sucess` 오타, `bg-base`=red-50 매핑, 모드 미분화 토큰 3건. CEO-1003 범위.

### 검증 방법

본 ADR의 모든 대비율은 WCAG 2.1 상대휘도 공식으로 계산했다. 재현 시 동일 절차를 사용한다.

```
1. sRGB → 선형 RGB (임계값 0.03928, 감마 2.4)
2. L = 0.2126R + 0.7152G + 0.0722B
3. ratio = (L_light + 0.05) / (L_dark + 0.05)
```

OKLCH 변환은 Björn Ottosson의 Oklab 행렬을 사용했다(sRGB linear → LMS → cbrt → Oklab → LCh).

## 참고 자료

ADR 0001의 "색 기획 근거자료 (Color Science)" 목록을 승계한다.

- [Evil Martians — OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Björn Ottosson — Oklab](https://bottosson.github.io/posts/oklab/)
- [Radix Colors — Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [WCAG 2.1 — Contrast Minimum (1.4.3)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 2.1 — Non-text Contrast (1.4.11)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)
