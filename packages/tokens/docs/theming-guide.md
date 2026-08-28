# Sonagi Design System - Theming Guide

Sonagi 디자인 시스템의 다중 테마 및 테마 오버라이드 가이드라인입니다.

## 1. 아키텍처 원칙

Sonagi 디자인 시스템은 **Multi-Brand** 시스템으로, 기본 테마 외에 독립 브랜드를 위한 CSS 변수 묶음을 유연하게 덮어쓸 수 있습니다.

- 모든 테마 오버라이드는 CSS 클래스가 아닌 데이터 속성 `[data-theme="테마명"]` 스코프 하에 주입됩니다.
- 오버라이드되지 않은 변수는 상위의 `:root` (기본 라이트 테마) 또는 `@media (prefers-color-scheme: dark)` 다크 테마의 글로벌 값을 그대로 상속(Fallback)받아 사용합니다.

## 2. 신규 테마 추가 프로세스

신규 브랜드를 위해 테마 오버라이드가 필요한 경우 아래 규칙을 준수합니다.

1. **JSON 파일 정의:**
   `packages/tokens/tokens/themes/theme-테마명.json` 포맷의 파일을 생성합니다.

2. **JSON 구조 채우기:**
   반드시 `semantics.json`에 선언된 정규 토큰 명칭과 위계를 맞추어 기술해야 합니다.

   ```json
   {
     "name": "브랜드명 디스플레이 네임",
     "version": "1.0.0",
     "description": "설명",
     "tokens": {
       "color": {
         "brand": {
           "primary": { "value": "#색상값", "type": "color" }
         }
       }
     }
   }
   ```

3. **빌드:**
   `pnpm build`를 수행하면 `build.js` 파이프라인이 자동으로 `themes/` 하위 JSON 파일들을 감지하여 단일 `variables.css` 파일 하단에 `[data-theme="테마명"] { --sng-...: ...; }` 선택자를 생성해 줍니다.

---

## 3. 현재 등록된 테마

**없습니다.** `themes/` 디렉토리는 의도적으로 비어 있습니다.

토큰 위계는 [ADR 0010](../../../decisions/0010-delivery-consolidation-github-packages.md)에 따라 `primitives → semantics` **2-Tier**로 확정되어 있으며, 유효한 `data-theme` 값은 다음 둘뿐입니다:

| 값                              | 설명                                    |
| ------------------------------- | --------------------------------------- |
| `light` (= `sonagi-core`, 기본) | 가을 소나기 라이트                      |
| `dark`                          | 가을 소나기 다크 (semantics 내부 Mode 분기) |

즉 위 2절의 프로세스는 **현재 사용되지 않는 확장 지점**입니다. 로더(`scripts/build.js:117`)는 `fs.existsSync` 가드가 걸려 있어 빈 디렉토리에서도 정상 동작하며, 3-Tier 복귀 시 그대로 재사용됩니다.

**재개 시점:** 가을 소나기 테마가 안정적으로 정착했음이 확인된 뒤 **겨울 소나기 테마**를 착수할 때입니다. 그때 `themes/theme-winter-sonagi.json` 하나만 추가하면 됩니다. 자세한 내용은 [`../tokens/themes/README.md`](../tokens/themes/README.md) 참조.

> 과거 존재했던 `desk-analyst` 테마는 [ADR 0009](../../../decisions/0009-typography-major-third-upgrade.md)에서 폐기되었습니다. 이제 `data-theme="desk-analyst"`를 설정해도 아무 오버라이드가 적용되지 않습니다.
