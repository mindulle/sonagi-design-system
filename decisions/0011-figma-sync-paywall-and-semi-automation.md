# ADR 0011: Figma to Code 동기화 파이프라인의 유료화 장벽과 반자동화(Semi-automation) 채택

## Status

Accepted (2026-08-31)

## Context

Sonagi Design System V3 구축 과정에서, Figma의 디자인 토큰(Variables 및 Styles) 변경 사항을 코드베이스(`@mindulle/tokens`)로 100% 무인 자동화(Zero-click CI/CD)하여 동기화하려는 목표가 있었습니다. 기획된 파이프라인은 'Figma Webhook ➡️ GitHub Actions ➡️ PR 자동 생성'이었습니다.

하지만 이 파이프라인을 구축하는 과정에서 다음과 같은 업계의 치명적인 유료화(Paywall) 장벽에 부딪혔습니다:

1. **Figma Native API 제한**: 변수(Variables)를 읽어오기 위한 REST API 권한(`file_variables:read`)은 **Figma Enterprise 요금제**에서만 제공됩니다.
2. **Tokens Studio 플러그인 제한**: 대안으로 Tokens Studio 플러그인의 GitHub Sync 기능을 검토했으나, 플러그인에서 변경한 토큰을 다시 피그마 캔버스의 변수로 양방향 반영(Export to Variables)하는 핵심 기능이 **Pro 요금제(유료)**로 묶여 있습니다.

## Decision

비싼 요금제를 강제하는 완벽한 무인 자동화를 포기하고, **현실적이고 100% 무료인 '콘솔 추출 기반 반자동화(Semi-automation)' 방식을 공식 채택**합니다.

1. **조종석(Source of Truth)**: 피그마 우측 패널의 Native Variables를 그대로 사용합니다. (디자이너의 최고 DX 보장)
2. **추출 방식**: 피그마 브라우저 개발자 도구(Console)에서 `figma.variables` API를 직접 호출하는 스크립트를 실행하여 W3C Design Token 포맷의 JSON을 추출합니다. (Enterprise API 제약 우회)
3. **적용 방식**: 출력된 JSON을 복사하여 코드베이스(`packages/tokens/tokens/`)에 수동으로 덮어쓰고 커밋합니다.

## Consequences

- **장점**: 막대한 구독 비용(Enterprise/Pro)을 절감하면서도, 휴먼 에러 없는 정확한 JSON 데이터를 코드베이스로 전달할 수 있습니다.
- **단점**: '콘솔 실행 -> 복사 -> 붙여넣기'라는 3단계의 수동 개입(약 10초 소요)이 발생합니다.
- **수용 사유**: 디자인 시스템의 뼈대(토큰, 브레이크포인트 등)는 한 번 굳어지면 수정 빈도가 매우 낮기 때문에, 10초의 수동 개입 오버헤드는 충분히 수용 가능합니다.
