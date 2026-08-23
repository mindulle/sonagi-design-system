## 📌 Description

피그마 `Foundation-v3` 토큰 수치(8px Grid, Fixed Line-height)와 `Core-Primitives-v3` 컴포넌트(12종 버튼 베리언츠, 4종 상태 뱃지, 3종 카드)의 스펙을 모노레포 코드베이스에 100% 동기화합니다.

## 🎨 Figma Reference

- **Foundation-v3 (Tokens):** https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH
- **Core-Primitives-v3 (Components):** https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x

## 🛠️ Changes

- [x] `@sonagi/tokens` 패키지 `semantics.json`에 v3.0 스펙 업데이트 및 CSS 변수 빌드 스크립트 수정
- [x] `@sonagi/ui` 패키지 React 컴포넌트(`Button.tsx`, `Badge.tsx`, `Card.tsx`)에 피그마 베리언츠와 1:1 매핑되는 Tailwind 클래스 적용
- [x] `Storybook` 스토리에 피그마 컴포넌트 레이아웃 1:1 반영

## 🧪 Testing

- [x] `pnpm build` 통과
- [x] `pnpm --filter @sonagi/ui storybook` 로컬 렌더링 확인 완료

## 🔗 Related Issue

Fixes CEO-971
