# ADR 0002: Sonagi 타이포그래피 스케일 재정의

- **상태**: ✅ Decision 확정
- **시작일**: 2026-08-22
- **확정일**: 2026-08-22
- **관련 이슈**: CEO-926 (프로젝트), CEO-945 (화이트보드 콘텐츠)
- **관련 문서**: `../DESIGN.md`, `../packages/tokens/tokens/variables.css`, [ADR 0001(색상)](./0001-color-system-redefinition.md)

## Context (왜 다시 정하나)

ADR 0001(색상)과 동일한 검증 절차를 타이포그래피에도 적용해야 한다는 지적(사용자)에 따라 재검토함. 처음엔 "발행된 `@mindulle/tokens`와 DESIGN.md가 일치하니 문제없다"고 판단했으나, **일치한다고 해서 검증된 것은 아님**을 지적받음.

### 스케일의 실제 출처 확인

DESIGN.md의 스케일(`12·14·16·18·20·24·30·36`)을 수학적으로 분석한 결과:

- 스텝 간 비율이 1.111~1.25로 불규칙 — 일정 비율로 커지는 진짜 모듈러 스케일이 아님
- **Tailwind CSS 기본 폰트 스케일(`xs~4xl`)과 정확히 일치** — 즉 독자적으로 설계된 스케일이 아니라 프레임워크 기본값을 그대로 가져온 것
- Figma 목업의 H1(48px)은 Tailwind의 `5xl`에 해당 — DESIGN.md 작성자가 나열을 4xl(36px)에서 멈춘 것이 의도된 상한선인지, 단순 누락인지 불분명함. 즉 "48px가 스펙 초과"라는 최초 판단은 DESIGN.md 자체가 이미 불완전한 나열이었을 가능성을 고려하지 않은 것이었음.

### 결론

색상과 동일하게, **진짜 방법론(고정 비율 모듈러 스케일)으로 재도출**하기로 함. 기준 크기 16px에서 특정 비율로 위/아래 스텝을 계산.

## Options Considered

기준 16px에서 3개 비율 비교 (사용자에게 실제 계산값 제시 후 논의):

| 비율                   | 성격                         | H1   | Caption |
| ---------------------- | ---------------------------- | ---- | ------- |
| Minor Third (1.200)    | 안정적, UI 밀도형            | 48px | 11px    |
| Major Third (1.250)    | 균형, 범용 에디토리얼        | 61px | 10px    |
| Perfect Fourth (1.333) | 화사함, 표현력 강한 블로그형 | 90px | 9px     |

Perfect Fourth/Major Third는 "가을 소나기(따뜻함·에디토리얼)" 방향엔 어울리지만, 이 시스템이 Desk Analyst(데이터 밀도형 대시보드) 테마와 공존해야 하므로 H1이 지나치게 커지는 것은 부담으로 판단.

## Decision

**Minor Third(1.200)** 채택. 우연히 기존 Figma H1(48px)과 반올림값이 일치 — 새 스케일이 임의로 튀지 않고 기존 직관과도 맞아떨어짐을 확인.

| 토큰                      | 값   | 매핑              |
| ------------------------- | ---- | ----------------- |
| `--sng-font-size-caption` | 11px | 캡션/메타데이터   |
| `--sng-font-size-sm`      | 13px | Label, Body Small |
| `--sng-font-size-base`    | 16px | Body Base         |
| `--sng-font-size-lg`      | 19px | H6, Body Large    |
| `--sng-font-size-xl`      | 23px | H5                |
| `--sng-font-size-2xl`     | 28px | H4                |
| `--sng-font-size-3xl`     | 33px | H3                |
| `--sng-font-size-4xl`     | 40px | H2                |
| `--sng-font-size-5xl`     | 48px | H1                |

**Line-height 매핑** (기존 Figma가 레벨마다 임의 소수점을 썼던 것을, 실재하는 named 토큰으로 정리):

- H1~H3 (큰 디스플레이 텍스트): `--sng-line-height-tight` (1.25)
- H4~H6 (본문에 가까운 작은 헤딩): `--sng-line-height-snug` (1.375)
- Body 전체(Large/Base/Small): `--sng-line-height-normal` (1.5) — DESIGN.md 원문 규칙("1.5 body") 그대로, Figma의 Body Large 1.75는 어떤 토큰에도 없는 값이라 제거

**폰트 패밀리**: 기존 유지 — Pretendard(sans)/Noto Serif KR(serif)/JetBrains Mono(mono) 전부 이미 정확히 발행돼 있었음(재검증 완료, 변경 없음).

## Consequences

- `@mindulle/tokens`의 `--sng-font-size-*` 값 전면 교체 (xs/sm/lg/xl/2xl/3xl/4xl 값 변경, 8→9단계로 재구성) → ADR 0001과 마찬가지로 semver **major** 범프에 포함
- Figma `소나기 디자인 시스템` 파일의 Typography System 프레임 전면 재작업 (H1~H6, Body 3종, Line-height 재적용)
- Noto Serif KR 실사용 샘플 섹션을 Figma에 신규 추가 필요(토큰엔 있었지만 시각적 목업이 없었음)
- `@mindulle/ui` 컴포넌트가 구 스케일 값을 하드코딩한 곳이 있는지 별도 점검 필요(후속 이슈)

## Validation

- 스케일 비율 균일성(1.2 고정) 파이썬으로 재계산 검증 완료
- Line-height 매핑이 기존 발행된 named 토큰(`tight`/`snug`/`normal`)에만 대응하도록 확인 — 임의 소수점 제거
- 폰트 패밀리 토큰은 재검증 결과 기존 값 유지(변경 없음)
