# 🌧️ 소나기 디자인 시스템

**청량하고 시원한 느낌을 전달하는 디자인 시스템**

비가 내린 후의 맑고 깨끗한 공기, 물방울이 흐르는 듯한 부드러운 인터랙션을 디자인 언어로 표현합니다.

## 📦 패키지

이 저장소는 pnpm workspace를 사용하는 모노레포입니다:

- **@sonagi/tokens** - 플랫폼 독립적 디자인 토큰
- **@sonagi/react** - React 컴포넌트 라이브러리
- **@sonagi/styles** - 공통 스타일 (추후 추가)
- **storybook** - 문서화 사이트

## 🚀 시작하기

### 필수 조건

- Node.js 18 이상
- pnpm 8 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-org/sonagi-design-system.git
cd sonagi-design-system

# 의존성 설치
pnpm install
```

### 개발

```bash
# 모든 패키지 빌드
pnpm build

# Storybook 실행
pnpm storybook

# 개발 모드로 React 패키지 실행
pnpm dev
```

## 📖 문서

전체 문서는 [Storybook](http://localhost:6006)에서 확인할 수 있습니다.

## 🎨 디자인 철학

### 청량감 (Freshness)
- 시원한 블루-그레이 팔레트
- 깔끔한 여백과 공간 활용
- 높은 가독성과 명확한 계층 구조

### 유려함 (Fluidity)
- 부드러운 애니메이션과 전환 효과
- 유기적인 형태와 곡선 활용
- 직관적인 사용자 흐름

### 일관성 (Consistency)
- 명확한 디자인 토큰 정의
- 컴포넌트 간 일관된 패턴
- 체계적인 네이밍 규칙

## 🛠️ 기술 스택

- **모노레포**: pnpm workspace
- **빌드**: Vite
- **언어**: TypeScript
- **스타일링**: CSS Modules
- **문서화**: Storybook 7.x
- **테스트**: Vitest + React Testing Library

## 📁 프로젝트 구조

```
sonagi-design-system/
├── packages/
│   ├── tokens/          # 디자인 토큰
│   │   ├── src/
│   │   │   └── tokens.json
│   │   ├── scripts/
│   │   │   └── build.js
│   │   └── dist/        # 빌드 결과물
│   │       ├── tokens.css
│   │       ├── index.js
│   │       └── index.d.ts
│   │
│   ├── react/           # React 컴포넌트
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   └── dist/
│   │
│   └── styles/          # 공통 스타일
│
├── apps/
│   └── storybook/       # 문서 사이트
│       ├── .storybook/
│       └── src/
│
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

## 🧩 컴포넌트 로드맵

### Phase 1: Foundation (Week 1-2) 🚧
- [ ] Button
- [ ] Input
- [ ] Badge
- [ ] Card
- [ ] Checkbox

### Phase 2: Navigation & Feedback (Week 3-4)
- [ ] Link
- [ ] Tab
- [ ] Breadcrumb
- [ ] Tooltip
- [ ] Alert
- [ ] Toast
- [ ] Spinner
- [ ] Progress Bar

### Phase 3: Forms & Selection (Week 5-6)
- [ ] Radio Button
- [ ] Switch
- [ ] Select
- [ ] Textarea
- [ ] Search Input
- [ ] Date Picker

### Phase 4: Overlay & Complex (Week 7-8)
- [ ] Modal
- [ ] Drawer
- [ ] Menu
- [ ] Popover
- [ ] Table
- [ ] Accordion

## 🤝 기여하기

기여를 환영합니다! 자세한 내용은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고해주세요.

### 개발 가이드라인

1. 모든 컴포넌트는 TypeScript로 작성
2. 접근성(a11y) 필수 고려
3. Storybook 문서화 필수
4. 테스트 코드 작성 권장

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](./LICENSE) 파일을 확인하세요.

## 🔗 링크

- [문서 (Storybook)](#)
- [Figma 디자인 파일](#)
- [이슈 트래커](https://github.com/your-org/sonagi-design-system/issues)

---

Made with 💙 by Sonagi Team
