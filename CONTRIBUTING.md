# 🌧️ 소나기 디자인 시스템 기여 안내서

소나기 디자인 시스템에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 원활하게 기여하는 데 필요한 가이드라인을 제공합니다.

## 🔗 필수 링크

기여를 시작하기 전에 다음 문서들을 꼭 확인해주세요.

- **피그마 디자인 시스템**: [Figma 바로가기](https://www.figma.com/design/KN6Bl6Pb4aW2KJXpBhS7rZ/%EC%86%8C%EB%82%98%EA%B8%B0-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=0-1&t=I8yo3kPvT0Xm4Ot7-1)
- **노션 프로젝트 관리**: [Notion 바로가기](https://mindulle.notion.site/design-sonagi-space-2124abe3a8af80d98b2bd62ffa403c96?source=copy_link)

> 💡 **Tip**: 피그마에서는 각 컴포넌트의 디자인 명세, 사용 예시, 디자인 토큰 값을 확인할 수 있습니다. 노션에서는 프로젝트 로드맵, 회의록, 주요 의사결정 사항을 관리합니다.

## 🚀 시작하기

1.  **저장소 복제(Clone)**

    ```bash
    git clone https://github.com/mindulle/sonagi-design-system.git
    cd sonagi-design-system
    ```

2.  **의존성 설치**
    `pnpm`을 사용하여 의존성을 설치합니다.

    ```bash
    pnpm install
    ```

3.  **개발 서버 실행**
    Storybook을 실행하여 컴포넌트를 확인하고 개발합니다.
    ```bash
    pnpm storybook
    ```
    브라우저에서 `http://localhost:6006`으로 접속하세요.

## 🌳 브랜치 전략

저희는 `main` 브랜치를 중심으로 `feature` 브랜치를 활용하는 전략을 사용합니다.

- **main**: 항상 배포 가능한 상태를 유지합니다. 직접적인 푸시는 금지됩니다.
- **feature**: 새로운 기능 개발 및 버그 수정을 위한 브랜치입니다.
  - 브랜치 이름은 `feature/issue-number-brief-description` 형식을 따릅니다. (예: `feature/12-button-loading-state`)

```bash
# 새로운 기능 브랜치 생성
git checkout -b feature/12-button-loading-state
```

## ✅ 커밋 메시지 규칙

커밋 메시지는 Conventional Commits 형식을 따릅니다. 이는 버전 관리와 변경 내역 추적을 용이하게 합니다.

**형식**: `<type>(<scope>): <subject>`

- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore` 등
- **scope** (선택 사항): 변경된 부분 (예: `react`, `tokens`, `storybook`)
- **subject**: 변경 내용에 대한 간결한 설명

**예시**:

```
feat(react): Button 컴포넌트에 loading 상태 추가
fix(tokens): primary 컬러 오타 수정
docs(storybook): Button 스토리 문서 보강
```

## Pull Request (PR) 프로세스

1.  작업이 완료되면 본인의 `feature` 브랜치를 원격 저장소에 푸시합니다.
2.  GitHub에서 `main` 브랜치로 향하는 Pull Request를 생성합니다.
3.  PR 템플릿(`PULL_REQUEST_TEMPLATE.md`)의 모든 항목을 꼼꼼하게 작성합니다.
4.  **자동화된 검사(CI)**가 실행되어 코드 스타일, 타입, 테스트를 확인합니다. 모든 검사가 통과해야 합니다.
5.  최소 1명 이상의 동료에게 코드 리뷰를 요청하고, 승인을 받습니다.
6.  리뷰어가 승인하면 PR을 `main` 브랜치에 병합(Squash and merge)합니다.

## 🎨 코드 스타일

- 저희 프로젝트는 `Prettier`와 `ESLint`를 사용하여 코드 스타일을 일관되게 유지합니다.
- 커밋하기 전에 아래 명령어를 실행하여 코드 스타일을 정리해주세요.

```bash
# 코드 스타일 검사 및 자동 수정
pnpm lint
```

궁금한 점이 있다면 언제든지 이슈나 Discussion을 통해 질문해주세요!
