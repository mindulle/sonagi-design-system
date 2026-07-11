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

## 3. 대표 테마 소개: The Desk Analyst

- **목적:** 데이터 대시보드 및 스프레드시트 화면에 최적화된 고대비/고밀도 테마입니다.
- **활성화 방식:** `<html data-theme="desk-analyst">`
- **주요 오버라이드 항목:**
  - `--sng-color-brand-primary`: `#2563EB` (고대비 선명한 파란색)
  - `--sng-color-bg-base`: `#FFFFFF` (순수 흰색 배경)
  - `--sng-color-bg-surface`: `#F9FAFB` (카드 및 제브라 테이블 행 배경)
  - `--sng-line-height-normal`: `1.6` (가로형 긴 표 데이터 읽기 성능을 높이기 위해 기본 1.5에서 1.6으로 높임)
  - `--sng-radius-md`: `6px` (기본 8px보다 날카롭고 컴팩트하게 조율)
