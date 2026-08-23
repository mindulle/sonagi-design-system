# ADR 0001: Sonagi 브랜드 컬러 시스템 재정의

- **상태**: ✅ Decision 확정 (Phase 1 — 토큰 값). Figma/컴포넌트 반영은 별도 실행 단계로 진행.
- **시작일**: 2026-08-22
- **확정일**: 2026-08-22
- **관련 이슈**: CEO-926 (프로젝트), CEO-945 (화이트보드 콘텐츠), CEO-933 (MCP 파이프라인)
- **관련 문서**: `../DESIGN.md`, `../packages/tokens/tokens/variables.css`, Figma `소나기 디자인 시스템` (`KN6Bl6Pb4aW2KJXpBhS7rZ`)

## Context (왜 다시 정하나)

디자인 시스템 v3.0 작업을 재개하며 기존 색상 체계를 검증한 결과, **여러 층위에서 서로 다른 색상 값이 충돌**하고 있음을 확인했다.

### 1. DESIGN.md에 근거 기록이 없음

`DESIGN.md`는 2026-07-11 단일 커밋(`8311682`, "docs: add DESIGN.md for Open Design integration")으로 전체가 한 번에 추가됨. 팔레트 탐색, 대안 비교, 접근성 검증 등 의사결정 과정을 보여주는 커밋 히스토리가 전혀 없음 — 완성본을 주장하는 초안이 근거 없이 확정된 상태였음.

### 2. 실제 발행된 `@mindulle/tokens` 패키지에 깨진 primitive 스케일 존재

`packages/tokens/tokens/variables.css`(v1.3.2, 이미 npm에 발행되어 `blog-sonagi-space`가 `@import '@mindulle/tokens/css'`로 프로덕션에서 직접 소비 중)의 `--sng-color-blue-*` 스케일을 확인한 결과:

```css
--sng-color-blue-50: #f0f4f8; /* H~205°, 밝은 시안 계열 */
--sng-color-blue-100: #d1d9e6;
--sng-color-blue-200: #a8dcee;
--sng-color-blue-300: #6cc6e0;
--sng-color-blue-400: #3aadd1;
--sng-color-blue-500: #1c2c4d; /* 갑자기 딥 네이비로 hue 전환 */
--sng-color-blue-600: #1275b5; /* 500(L=20.6%)보다 명도가 더 높음(L=39.0%) — 단조 감소 스케일 위반 */
--sng-color-blue-700: #0d5a94;
--sng-color-blue-800: #083a64;
--sng-color-blue-900: #0a1128;
```

`--sng-color-brand-primary-hover: #1275b5`는 이 깨진 `blue-600`을 그대로 참조한 값이며, `brand-primary(#1c2c4d)`에서 HSL/OKLCH 등으로 수학적으로 파생된 hover 셰이드가 아니다. (hue shift −16.8°, 채도 +35.2%p — 정상적인 hover 파생이라면 hue는 거의 고정되고 명도만 이동해야 함.)

### 3. Figma 파일이 더 오래된 별도 팔레트로 작업돼 있음

`https://www.figma.com/design/KN6Bl6Pb4aW2KJXpBhS7rZ` 의 🎨 Foundation / 🧩 Components 페이지는 이미 상당 분량 작업되어 있으나(Shadow/Spacing/Typography/Color System, Buttons 컴포넌트 6종), Color System은 "청량하고 시원한 느낌"이라는 설명의 범용 50~900 틸-블루 스케일(`Primary 500 = #1991b9`)로 만들어져 있고, DESIGN.md의 네이비(`#1c2c4d`)+웜오프화이트(`#faf9f7`)+레인블루(`#4A90E2`) 방향과 무관함. Buttons 컴포넌트의 Primary fill도 `#1991b9`를 그대로 상속해 오염됨.

### 4. WCAG 대비 검증 미실시

DESIGN.md에 명시된 조합 중 최소 2건이 실사용 시 접근성 기준 미달:

| 조합                                         | 대비율 | 기준                                                   |
| -------------------------------------------- | ------ | ------------------------------------------------------ |
| Text muted(`#8b949e`) on 배경(`#faf9f7`)     | 2.92:1 | ❌ 본문 4.5:1, UI 최소 3:1 모두 미달                   |
| Border default(`#e6eaef`) on 배경(`#faf9f7`) | 1.15:1 | ❌ 테두리가 배경에 거의 안 보임                        |
| Accent(`#4A90E2`) 일반 본문 텍스트로 사용 시 | 3.13:1 | ⚠️ 큰 텍스트/UI 컴포넌트만 통과, 본문 텍스트는 AA 탈락 |

### 5. 로고/워드마크도 이미 두 갈래로 분기되어 있어 "고정 제약"이 아님

DESIGN.md·`@mindulle/tokens`(`--sng-color-brand-logo`)·`@mindulle/ui`의 `<Wordmark>` 컴포넌트는 전부 "로고 시안(`#00ffcc`)은 워드마크 전용"이라 명시하지만, 실제 **프로덕션에 배포된 SVG**(`blog-sonagi-space/public/brand/sonagi-wordmark-*.svg`, 현재 블로그 헤더에서 실사용 중)에는 `#00ffcc`가 아예 존재하지 않고 대신 `#4a90e2`(레인블루)를 도트 색으로 사용함. 즉 로고조차 문서·컴포넌트·실배포 자산이 서로 다른 버전으로 갈라져 있어, "로고 색은 고정이니 그대로 유지"라는 전제가 성립하지 않음 → 색 재정의를 완전 백지에서 시작하기로 함.

### 결론

- 살릴 것: Spacing 시스템(8px 기반, DESIGN.md와 완전 일치), 폰트 패밀리 선택(Pretendard/JetBrains Mono), Buttons 컴포넌트의 Variant/Size/State 구조
- 새로 해야 할 것: **Color 토큰 값 자체**를 지각적으로 균일한 색공간(OKLCH) 기반으로 재도출하고, 모든 fg/bg 조합을 WCAG 대비 검증 후 확정. `blue-*` primitive 스케일을 단조 명도 순으로 재구성. 로고/워드마크 색도 포함해 완전 재검토.
- 영향 범위: `@mindulle/tokens`(npm 발행 패키지, semver 영향 검토 필요) → `blog-sonagi-space`(프로덕션 소비처, 로고 SVG 포함) → Figma 파일(Foundation/Components 재작업) → 화이트보드(`3e4bc060`) 재시각화

### 참고 자료 (Karakeep 리스트: "색 기획 근거자료 (Color Science)")

- [Evil Martians — OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Radix Colors — Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Adobe Leonardo](https://github.com/adobe/leonardo) / [leonardocolor.io](https://leonardocolor.io/)
- [Material Design 3 — Color system](https://m3.material.io/styles/color/system/how-the-system-works)
- [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)

---

## Options Considered

브랜드 감정 방향을 먼저 정함: 기존 "네이비+데이터틱함(신뢰감·차분함)"을 유지할지, 완전히 새로 갈지 논의한 결과 **"따뜻함·인간담(에디토리얼·블로그다움)"** 으로 방향 전환 결정 (DESIGN.md에 원래 있던 Sonagi Core(따뜻함)/Desk Analyst(차가운 데이터용) 투 테마 구조는 유지 — Desk Analyst는 별도 ADR에서 다룸).

이 방향 아래 OKLCH로 hue를 고정하고 명도만 이동시켜(기존처럼 hue가 튀는 파생 오류 방지) 3개 후보를 도출, 화이트보드(`3e4bc060` → 🎨 Foundations)에 순수 색상 블록 + 중성 배경 라벨 카드로 분리해 시각 비교함:

| 방향                               | Hue 앵커 | primary/ink | accent    | accent-hover | 비고                                            |
| ---------------------------------- | -------- | ----------- | --------- | ------------ | ----------------------------------------------- |
| A. 비 갠 뒤 볕 (Terracotta+Amber)  | 40~45°   | `#462b1f`   | `#d15f35` | `#b13c11`    | 밝고 화사한 테라코타                            |
| **B. 가을 소나기 (Rust+Coral)** ✅ | 25~30°   | `#47211b`   | `#db6c66` | `#b94644`    | 채택                                            |
| C. 온기 어린 잉크 (Neutral+Honey)  | 60~80°   | `#30271f`   | `#df9c00` | `#b77b00`    | accent가 bg 대비 2.17:1로 본문 텍스트 용도 탈락 |

## Decision

**B. 가을 소나기 (Rust+Coral)** 방향으로 확정. 배경을 accent와 동일한 hue 계열(30°)로 통일해 톤 일관성을 확보하고, `bg-base` 명도를 `0.965→0.968`로 미세 조정해 `accent` 대비를 3.0:1 이상으로 맞춤(최초 계산치는 2.98:1로 미달이었음 — 배경을 어둡게 하면 오히려 accent와의 대비가 더 떨어지는 것을 확인 후 반대 방향으로 재계산).

전체 토큰 세트 (hue=30° 고정, OKLCH 기반 파생):

| 토큰                     | 값        | 배경 대비 | 판정                                              |
| ------------------------ | --------- | --------- | ------------------------------------------------- |
| `bg-base`                | `#fcf2f0` | —         | 기준 배경                                         |
| `bg-surface`             | `#f5e5e2` | —         | 카드/패널                                         |
| `bg-elevated`            | `#fefaf9` | —         | 모달/팝오버                                       |
| `text-primary`           | `#1e1311` | 16.51:1   | ✅                                                |
| `text-secondary`         | `#614f4b` | 7.00:1    | ✅                                                |
| `text-muted`             | `#7c6c6a` | 4.54:1    | ✅                                                |
| `brand-primary` / `ink`  | `#47211b` | 12.72:1   | ✅                                                |
| `accent`                 | `#db6c66` | 3.01:1    | ✅ (UI/large 기준)                                |
| `accent-hover`           | `#b94644` | 4.75:1    | ✅                                                |
| `border-default`         | `#9d8986` | 3.00:1    | ✅ (WCAG 1.4.11 UI 경계)                          |
| `border-subtle`          | `#d7c5c2` | 1.51:1    | 의도적으로 낮음 — 장식용 구분선, 기능적 경계 아님 |
| white on `accent`        | —         | 3.31:1    | ✅ 버튼 fill용                                    |
| white on `accent-hover`  | —         | 5.22:1    | ✅                                                |
| white on `brand-primary` | —         | 13.99:1   | ✅                                                |

**용도 규칙**: `accent`는 버튼 fill/아이콘/보더 등 "면적이 있는" 용도로 사용. 텍스트 링크·얇은 밑줄처럼 "가는 요소"로 쓸 땐 `accent-hover`를 기본값으로 사용해 대비 여유를 확보한다.

로고/워드마크 색상은 이 ADR 범위에서 별도로 재작업 필요 (다음 ADR 또는 후속 이슈로 분리 — CEO-926 체크리스트에 추가 예정).

## Consequences

- `@mindulle/tokens`의 `--sng-color-*` 값 전면 교체 필요 → 이미 프로덕션에서 `@import '@mindulle/tokens/css'` 하는 `blog-sonagi-space`의 실제 화면이 바뀜 → semver **major** 범프 검토 (현재 v1.3.2 → v2.0.0 후보)
- 기존 Figma `소나기 디자인 시스템` 파일의 Color System(6개 프레임) 및 Buttons 컴포넌트(6종)는 구 팔레트(`#1991b9` 계열)를 전부 새 값으로 교체해야 함
- Desk Analyst 테마(차가운 데이터 대시보드용)는 이번 결정의 영향을 받지 않음 — 별도로 hue 앵커를 유지/재검토할지 다음 ADR에서 다룸
- 로고 SVG 3종(`sonagi-wordmark-master/en/ko.svg`)의 색상 정합성 작업이 후속 과제로 남음

## Validation

- 상기 "Decision" 표의 모든 fg/bg 조합에 대해 `coloraide` 라이브러리로 WCAG 2.1 대비 계산 완료 (2026-08-22)
- hover 파생값은 전부 OKLCH에서 hue/chroma 고정, lightness만 이동시켜 계산 — 기존 문제(hue가 16.8° 튀는 등)가 재발하지 않음을 확인
- 화이트보드(`3e4bc060`)에서 순수 색상 블록 + 중성 라벨 카드로 시각 비교 완료, 사용자 확인 후 채택

---

## 부록: 실행 도구 방침 (Tooling)

Figma 클라우드 파일에 대한 쓰기 권한이 없는 상태(보유한 Figma MCP는 읽기/댓글 전용)라, 실제 반영은 **OpenPencil**(`/home/ubuntu/open-pencil`)을 실행 엔진으로 사용한다.

- OpenPencil은 `.fig`/`.pen` **로컬 파일**을 열고 저장하는 방식(`open_file`/`save_file`)이며, Figma 클라우드와 실시간 동기화되지 않음
- MCP 서버 경로는 데스크톱 GUI 앱이 떠 있어야 동작(소켓 디스커버리) → 이 headless 서버에서는 사용 불가
- **2026-08-22 검증 완료**: `openpencil` **CLI**는 GUI 앱/소켓 연결 없이도 완전히 헤드리스하게 동작함을 실증. `import`(HTML/CSS → `.fig` 생성) → `eval -w`(JS+Figma Plugin API로 노드 생성/수정, 파일에 직접 write-back) → `export -f png`(CanvasKit WASM 헤드리스 렌더링)까지 전 과정을 이 서버에서 확인. 즉 로컬 `.fig` 작업은 GUI 없이 CLI만으로 전부 자동화 가능.
- 클라우드 Figma 파일과의 왕복은 자동화하지 않고, **주요 마일스톤마다 사용자가 수동으로 익스포트(로컬 사본 저장)/임포트(클라우드 반영)** 하는 방식으로 다리를 놓는다 (이 부분만 여전히 수동)
- `render`(JSX→노드 생성), `analyze_colors`/`analyze_typography`/`analyze_spacing`(기존 대비 재검증), `create_component` 등을 CLI `eval`로 호출해 이 ADR에서 확정한 토큰을 로컬 `.fig`에 구현 예정

### 산출물 전달 경로 (2026-08-22 확정)

서버(headless)에서 만든 `.fig`/PNG를 사용자 브라우저(로컬 PC)로 전달하는 다리가 별도로 필요함이 드러남 — `design.sonagi.space`의 웹 에디터는 File System Access API를 쓰므로 **브라우저가 실행 중인 로컬 PC 파일시스템만** 열 수 있고, 서버 파일시스템은 직접 접근 불가.

- 시도 1(폐기): `design.sonagi.space`에 nginx `/exports/` 정적 서빙 경로 추가 → origin에서는 되는데 앞단 Cloudflare가 모든 경로를 SPA(index.html)로 리라이트해서 막힘. nginx 설정은 원복함.
- **채택**: 이미 레퍼런스 이미지 호스팅에 쓰이던 `cdn.sonagi.space`(MinIO, `references` 버킷)에 `design-system-exports/` 프리픽스로 업로드 → 공개 URL로 전달. `boto3`(S3 호환 API, `.env`에 자격증명 존재: `/home/ubuntu/projects/MCPs/sonagi-reference-mcp/.env`)로 업로드.
- **흐름**: 서버에서 CLI로 `.fig` 생성/렌더 → PNG를 CDN에 올려 사용자에게 URL로 미리보기 공유(빠른 검토) → 승인되면 `.fig`도 CDN 업로드 → 사용자가 다운로드해 로컬 Figma 데스크톱 앱에서 열고 "Save to Figma"로 클라우드 파일에 반영(또는 필요한 레이어만 기존 클라우드 파일에 복사)

---

## 후속 과제 (Known Gaps) — 2026-08-22 시각 검증 시 발견, 지금 당장 막지는 않음

Color System 1차 빌드(`design-system-exports/foundation/color-system.png`)를 수치로 재검증한 결과, WCAG 통과와는 별개로 아래 4가지가 남아있음이 드러남. 처리 현황:

1. ~~**Elevation 사다리 신뢰도**~~ → [ADR 0004](./0004-state-colors-and-elevation-fix.md)에서 해결 (`bg-elevated`를 순백으로 변경)
2. ~~**상태색(success/warning/error/info) 미정의**~~ → [ADR 0004](./0004-state-colors-and-elevation-fix.md)에서 해결
3. ~~**Hue 그룹 분리가 의도인지 확인**~~ → [ADR 0004](./0004-state-colors-and-elevation-fix.md)에서 의도적 원칙으로 명문화
4. **다크모드 미착수** — **의도적으로 보류 확정 (2026-08-22)**. 지금은 라이트모드(Sonagi Core) Foundation만 마무리하고, 다크모드는 실제 컴포넌트 제작 단계에서 필요해지는 시점에 별도 ADR로 다시 다루기로 사용자 결정. CEO-926 체크리스트에 "미착수 항목"으로 명시해 누락 방지.

## 재사용 체크리스트

이 세션에서 발견한 검증 항목들을 일반화해 `decisions/QA-CHECKLIST.md`로 분리 기록함 — 이후 모든 토큰/컴포넌트 작업에 공통 적용.
