# Sonagi Design System v3.0 - Figma to Code Handover Guide

> 🚨 **경고**: 과거 사용되던 OpenPencil 관련 인프라는 폐기되었습니다. (재도입 금지)
> 현재 Sonagi의 유일한 디자인 작업대는 **Figma**이며, 아래의 가이드에 따라 토큰을 코드로 이관합니다.

## 🔄 Figma 변수(Variables) 추출 및 코드 동기화 가이드

Figma의 Enterprise 요금제(API 제한) 및 Tokens Studio Pro 요금제 정책으로 인해 무인 자동화(Zero-click CI/CD)가 불가능합니다. (관련 결정: `ADR-0011`)
대신 아래의 **3초 반자동화 스크립트**를 사용하여 수동으로 토큰을 추출하고 덮어씌웁니다.

### 1단계: Figma 콘솔에서 추출 스크립트 실행

Figma 데스크탑 앱(또는 웹)에서 디자인 시스템 파일을 열고, **개발자 도구(Console)**에 아래 스크립트를 붙여넣고 실행합니다.

```javascript
new Promise(async (resolve) => {
  console.log('📥 Breakpoints 변수 추출 시작...');
  try {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const variables = await figma.variables.getLocalVariablesAsync();

    const bpCollection = collections.find((c) => c.name === 'Breakpoints');
    if (!bpCollection) return resolve();

    const bpVars = variables.filter((v) => v.variableCollectionId === bpCollection.id);
    const exportData = { breakpoints: {} };

    bpCollection.modes.forEach((mode) => {
      exportData.breakpoints[mode.name.toLowerCase()] = {};
      bpVars.forEach((v) => {
        const val = v.valuesByMode[mode.modeId];
        const cleanName = v.name.includes('/') ? v.name.split('/')[1] : v.name;
        exportData.breakpoints[mode.name.toLowerCase()][cleanName] = {
          $value: `${val}px`,
          $type: 'dimension',
        };
      });
    });

    console.log(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error(error);
  }
  resolve();
});
```

### 2단계: JSON 결과물 복사

콘솔에 출력된 `{ "breakpoints": { "desktop": ... } }` 형태의 JSON 텍스트 전체를 드래그해서 복사합니다.

### 3단계: 코드베이스에 덮어쓰기 및 커밋

1. 복사한 JSON을 `sonagi-design-system/packages/tokens/tokens/breakpoints.json` (또는 해당 컬렉션 파일)에 붙여넣어 덮어씁니다.
2. 터미널에서 `pnpm changeset`을 실행하여 버전을 올린 뒤 커밋(Commit) 및 PR을 생성합니다.

---

## 🗑️ (Legacy) OpenPencil Handover History

- 과거 Web/Desktop 기반 CanvasKit(Skia) 폰트 렌더링 지연 문제로 인해 OpenPencil 프로젝트는 전면 중단 및 인프라 삭제 조치되었습니다. 절대 이전 인프라를 복구하거나 재사용하지 마십시오.
