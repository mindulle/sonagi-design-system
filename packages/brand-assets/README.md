# @mindulle/brand-assets (v0.1.0)

## Mindulle Studio & Sonagi Tooling Suite Official Brand Kit

> **"겨울 끝, 민들레."** (At Winter's End, Dandelion.)  
> 민들레 스튜디오(Mindulle Studio)와 민들레 디자인 시스템(MDS v0.1.0)의 공식 시각 자산 정규 릴리즈 패키지입니다. (엔진/도구: Sonagi)

---

## 📁 디렉토리 구조 (5대 정규 디렉토리)

```text
packages/brand-assets/
├── 01_master_seal/             # [CI 마스터 인장]
│   ├── dark/                   # 다크 캔버스 전용 인장 (.svg, .png, .pdf, .vectorcraft)
│   └── light/                  # 라이트 웜 페이퍼 전용 인장 및 시안 (.svg, .png, .vectorcraft)
├── 02_lockups/                 # [The Trinity 공식 조합형]
│   ├── horizontal/             # 가로형 락업 880x200 (dark/light, .svg, .png, .pdf)
│   └── vertical/               # 세로형 락업
├── 03_product_bi/              # [소나기 도구군 32px 선화 BI]
│   ├── sonagi-draw/            # 협업 화이트보드 캔버스
│   ├── sonagi-anvil/           # 알고리즘 TDD 훈련 엔진
│   ├── sonagi-graph/           # AI 거버넌스 파이프라인
│   ├── sonagi-rag/             # 옵시디언 지식 검색 엔진
│   └── sonagi-bi-icons-showcase.*
├── 04_touchpoints/             # [실무 접점 템플릿]
│   ├── favicons/               # 파비콘 (.svg)
│   ├── social_cards/           # 1200x630 OG 소셜 공유 카드 (dark/light, .svg, .png, .pdf)
│   └── mobile_artboard/        # 모바일 전용 캔버스 390x844 (live-text & outlined)
└── 05_guidelines/              # [W3C 토큰 및 브랜드 가이드]
    └── tokens-variables.css    # 전사 공통 CSS 변수
```

---

## 🎨 주요 규격 및 헌법

1. **The True 2px Law**: 모든 프레임, 보더, 아이콘 선화는 2px 솔리드 스트로크를 준수합니다.
2. **60-30-10 OKLCH Palette**:
   - 60% Canvas: `#060911` (Dark) / `#faf8f5` (Light Paper)
   - 30% Architecture: `#30363d` & `#4A90E2` (Rain Blue)
   - 10% Soul Core: `#ffd166` ~ `#d97706` (Dandelion Gold)
3. **1X Clearspace**: 로고 및 인장 사방에 최소 1X 이상의 안전 여백을 필수 확보합니다.
4. **W3C Design Tokens**: `05_guidelines/tokens-variables.css`의 토큰 변수를 시스템 전반에 바인딩합니다.

---

_공식 단일 진실 공급원(SSOT): `llm-wiki/02_Areas/Design/Branding/Mindulle-Sonagi-Master-Brand-Bible.md`_
