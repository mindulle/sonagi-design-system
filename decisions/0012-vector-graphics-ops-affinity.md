# ADR 0012: Vector Graphic Ops - Affinity JS SDK 도입

## 1. Context (배경)

- 기존 파이프라인에서 아이콘, Key Visual 등 벡터 에셋은 `packages/graphics-generator` 내의 Python 스크립트를 통해 절차적으로(procedurally) 생성하여 Storybook에 연동하는 방식을 채택해왔습니다 (ADR 0001 참고).
- 하지만 순수 코드로만 그래픽을 생성할 경우, 세밀한 시각적 효과(그림자, 블렌드 모드, 그라데이션 등) 조정에 한계가 있었고 생성된 결과를 디자이너가 눈으로 보며 직접 후수정하기 어려웠습니다.
- 대안으로 잉크스케이프(Inkscape) 등 GUI 기반 툴 도입을 검토하였으나 스크립트 기반 자동화(Automation)와 시스템 제어 기능이 부족했습니다.
- 최근 Affinity Designer의 JavaScript SDK와 MCP(Model Context Protocol) 연동을 통한 기술 검증(PoC)을 수행한 결과, **코드 기반의 절차적 생성과 GUI를 통한 시각적 후작업(Manual Polish)이 완벽하게 결합**될 수 있음을 확인했습니다.

## 2. Decision (결정)

- **Vector Graphic Ops의 공식 도구로 Affinity Designer 및 JS SDK를 채택합니다.**
- 기존 파이프라인을 이원화(Two-Pillars)하여 명확히 역할을 분리합니다:
  - **UI Ops (Layout & System):** Figma (`sonagi-design-ops` 거버넌스 유지)
  - **Vector Graphic Ops (Illustration & Key Visuals):** Affinity Designer + JS SDK
- 기존 Python 기반의 `graphics-generator` 스크립트를 점진적으로 Affinity JS SDK 환경으로 마이그레이션합니다.

## 3. Consequences (결과 및 영향)

- **장점:** 프로그래밍 기반의 정확한 기하학적 렌더링을 유지하면서, 디자이너가 언제든 생성된 `.afdesign` 파일을 열어 레이어와 벡터 패스를 손쉽게 수정할 수 있습니다.
- **장점:** Affinity의 내장 기능(블렌딩, 브러시, AI 기능 등)을 스크립트로 100% 호출할 수 있어 그래픽 퀄리티가 대폭 상승합니다.
- **단점/비용:** 기존 Python 생성기 코드를 JavaScript 기반의 Affinity SDK 스펙에 맞게 재작성(Rewrite)하는 공수가 필요합니다.
- **단점/비용:** 로컬 에셋 빌드 시 Affinity Designer 프로그램이 호스트 머신에 설치되어 있어야 합니다.

## 4. Action Items

- [ ] `sonagi-design-ops` 스킬/가이드라인 문서에 Vector Ops 분리 정책 명시
- [ ] `packages/graphics-generator`의 구조를 JS/Affinity 친화적으로 개편
- [ ] Python으로 작성되었던 시드 기반 그래픽 생성 로직을 Affinity JS 스크립트로 포팅 시도
