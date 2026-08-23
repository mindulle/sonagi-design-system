# ADR 0003: Sonagi Shadow / Elevation 시스템 재정의

- **상태**: ✅ Decision 확정
- **시작일**: 2026-08-22
- **확정일**: 2026-08-22
- **관련 이슈**: CEO-926 (프로젝트), CEO-945 (화이트보드 콘텐츠)
- **관련 문서**: `../DESIGN.md`, `../packages/tokens/tokens/variables.css`, [ADR 0001(색상)](./0001-color-system-redefinition.md)

## Context (왜 다시 정하나)

색상(ADR 0001)·타이포(ADR 0002)와 동일한 검증 절차를 Shadow에도 적용함.

### 색조(rgba 틴트)의 실제 출처 확인

발행된 `@mindulle/tokens`의 shadow 값:

```css
--sng-shadow-sm: 0 1px 3px rgba(8, 58, 100, 0.1);
--sng-shadow-md: 0 4px 12px rgba(8, 58, 100, 0.12);
```

DESIGN.md의 focus ring: `0 0 0 3px rgba(18,117,181,0.3)`

이 rgba 값들을 hex로 역산한 결과:

- `rgba(8,58,100)` = `#083a64` → ADR 0001에서 찾아낸 **깨진 `--sng-color-blue-800`** 그 자체
- `rgba(18,117,181)` = `#1275b5` → ADR 0001에서 명도 역전 버그로 지목한 **깨진 `blue-600`/구 `brand-primary-hover`** 그 자체

즉 Shadow는 별도로 잘못 설계된 게 아니라, **이미 폐기하기로 한 깨진 blue 스케일을 그대로 재사용**하고 있었을 뿐임. 색만 오염됐을 뿐 **3단계 구조(Flat/Raised/Floating) + Focus ring 자체는 CEO-945 체크리스트에도 명시된 합리적인 설계**이므로 구조는 유지.

### Figma 목업과의 구조 불일치

Figma `소나기 디자인 시스템`의 Shadow 프레임은 6단계(XS/SM/Base/MD/LG/XL)에 색조 없는 검정(`rgba(0,0,0,x)`)을 사용 — DESIGN.md의 3단계·네이비틴트 정의와 구조·색 둘 다 다름. 6→3 매핑 필요.

## Decision

**색**: ADR 0001에서 확정한 브랜드 색을 셰도우 틴트로 그대로 재사용 (새로 발명하지 않음).

| 토큰                         | 값                               | 근거                                      |
| ---------------------------- | -------------------------------- | ----------------------------------------- |
| `--sng-shadow-sm` (Raised)   | `0 1px 3px rgba(71,33,27,0.1)`   | 틴트 = ADR 0001 `primary/ink`(`#47211b`)  |
| `--sng-shadow-md` (Floating) | `0 4px 12px rgba(71,33,27,0.12)` | 동일                                      |
| `--sng-shadow-focus`         | `0 0 0 3px rgba(185,70,68,0.3)`  | 틴트 = ADR 0001 `accent-hover`(`#b94644`) |

**구조**: 3단계 유지 (DESIGN.md 원안 그대로) — Figma의 6단계를 아래처럼 수렴:

| 레벨                       | Figma 6단계 매핑    | 용도                              |
| -------------------------- | ------------------- | --------------------------------- |
| Flat (0)                   | — (그림자 없음)     | 기본 콘텐츠 영역                  |
| Raised (1) = `shadow-sm`   | XS + SM + Base 통합 | 카드, sticky 헤더                 |
| Floating (2) = `shadow-md` | MD + LG + XL 통합   | 드롭다운, 모달, 토스트, 강조 요소 |

Figma의 XS(아주 미세한 구분선)는 DESIGN.md의 "Do not use drop shadows on inputs — use border + focus ring instead" 원칙과 상충하므로 폐기. 얇은 구분은 그림자 대신 `border-subtle`(ADR 0001)을 사용.

## Consequences

- `@mindulle/tokens`의 `--sng-shadow-*` 값 교체 → ADR 0001과 같은 major 범프에 포함
- Figma Shadow 프레임 6단계 → 3단계로 재구성, 색조 전면 교체
- Z-index 사다리(base 0·raised 10·dropdown 100·sticky 200·modal 300·toast 400·tooltip 500)는 색·수치 문제 없음 확인, 변경 없음

## Validation

- rgba 틴트 값이 ADR 0001에서 WCAG 검증까지 마친 `primary/ink`·`accent-hover`의 정확한 RGB와 일치하는지 재계산으로 확인
- 구조(3단계)가 CEO-945 체크리스트의 "3단계 Elevation(Depth) 및 Focus Ring 룰 정리" 요구사항과 부합함을 확인
