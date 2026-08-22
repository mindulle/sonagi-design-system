# ADR 0001: Sonagi 브랜드 컬러 시스템 재정의

- **상태**: 🟡 논의 중 (Context 확정, Decision 미정)
- **시작일**: 2026-08-22
- **관련 이슈**: CEO-926 (프로젝트), CEO-945 (화이트보드 콘텐츠), CEO-933 (MCP 파이프라인)
- **관련 문서**: `../DESIGN.md`, `../packages/tokens/tokens/variables.css`, Figma `소나기 디자인 시스템` (`KN6Bl6Pb4aW2KJXpBhS7rZ`)

## Context (왜 다시 정하나)

디자인 시스템 v3.0 작업을 재개하며 기존 색상 체계를 검증한 결과, **여러 층위에서 서로 다른 색상 값이 충돌**하고 있음을 확인했다.

### 1. DESIGN.md에 근거 기록이 없음

`DESIGN.md`는 2026-07-11 단일 커밋(`8311682`, "docs: add DESIGN.md for Open Design integration")으로 전체가 한 번에 추가됨. 팔레트 탐색, 대안 비교, 접근성 검증 등 의사결정 과정을 보여주는 커밋 히스토리가 전혀 없음 — 완성본을 주장하는 초안이 근거 없이 확정된 상태였음.

### 2. 실제 발행된 `@sonagi/tokens` 패키지에 깨진 primitive 스케일 존재

`packages/tokens/tokens/variables.css`(v1.3.2, 이미 npm에 발행되어 `blog-sonagi-space`가 `@import '@sonagi/tokens/css'`로 프로덕션에서 직접 소비 중)의 `--sng-color-blue-*` 스케일을 확인한 결과:

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

### 결론

- 살릴 것: Spacing 시스템(8px 기반, DESIGN.md와 완전 일치), 폰트 패밀리 선택(Pretendard/JetBrains Mono), Buttons 컴포넌트의 Variant/Size/State 구조
- 새로 해야 할 것: **Color 토큰 값 자체**를 지각적으로 균일한 색공간(OKLCH) 기반으로 재도출하고, 모든 fg/bg 조합을 WCAG 대비 검증 후 확정. `blue-*` primitive 스케일을 단조 명도 순으로 재구성.
- 영향 범위: `@sonagi/tokens`(npm 발행 패키지, semver 영향 검토 필요) → `blog-sonagi-space`(프로덕션 소비처) → Figma 파일(Foundation/Components 재작업) → 화이트보드(`3e4bc060`) 재시각화

### 참고 자료 (Karakeep 리스트: "색 기획 근거자료 (Color Science)")

- [Evil Martians — OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Radix Colors — Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- [Adobe Leonardo](https://github.com/adobe/leonardo) / [leonardocolor.io](https://leonardocolor.io/)
- [Material Design 3 — Color system](https://m3.material.io/styles/color/system/how-the-system-works)
- [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)

---

## Options Considered

_(다음 논의에서 채움)_

## Decision

_(다음 논의에서 채움)_

## Consequences

_(다음 논의에서 채움)_

## Validation

_(다음 논의에서 채움)_
