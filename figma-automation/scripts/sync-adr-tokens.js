/**
 * Sonagi Design System - Token Sync Script
 * ADR 0001 (Light) & ADR 0006 (Dark) 기반 Semantic Colors 동기화
 * 
 * 실행 방법:
 * Figma 파일 오픈 -> 개발자 도구 (Cmd+Option+I / Ctrl+Shift+I) -> Console 탭에 전체 복사+붙여넣기 후 Enter
 */

async function syncSonagiTokens() {
  const COLLECTION_NAME = "Semantic Colors";
  
  // 우리가 ADR 0001 / ADR 0006에서 확정한 토큰 데이터
  const tokens = {
    "brand-primary": { light: "#47211b", dark: "#eeb4a9" },
    "brand-primary-hover": { light: "#38130e", dark: "#ffc6bc" },
    "brand-accent": { light: "#d2645f", dark: "#e5867f" },
    "brand-accent-hover": { light: "#b44240", dark: "#f7a7a1" },
    "brand-ink": { light: "#47211b", dark: "#eeb4a9" },
    "background-base": { light: "#fcf2f0", dark: "#1c1412" },
    "background-surface": { light: "#f5e5e2", dark: "#2c201e" },
    "background-elevated": { light: "#fefaf9", dark: "#392e2c" },
    "text-primary": { light: "#1e1311", dark: "#f7eeec" },
    "text-secondary": { light: "#614f4b", dark: "#c3b4b1" },
    "text-muted": { light: "#756563", dark: "#988a88" },
    "text-disabled": { light: "#9d8986", dark: "#6c605e" },
    "text-inverse": { light: "#fcf2f0", dark: "#1c1412" },
    "border-default": { light: "#95817f", dark: "#796966" },
    "border-subtle": { light: "#d7c5c2", dark: "#392d2b" },
    "border-strong": { light: "#47211b", dark: "#eeb4a9" }
  };

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b, a: 1 };
  }

  // 1. 컬렉션 찾기 또는 생성
  let collections = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = collections.find(c => c.name === COLLECTION_NAME);
  
  if (!collection) {
    collection = figma.variables.createVariableCollection(COLLECTION_NAME);
    console.log("✅ 'Semantic Colors' 컬렉션을 새로 생성했습니다.");
  } else {
    console.log("🔄 기존 'Semantic Colors' 컬렉션을 업데이트합니다.");
  }

  // 2. Light / Dark 모드 확보
  if (collection.modes.length < 2) {
    collection.addMode("Dark");
  }
  const lightModeId = collection.modes[0].modeId;
  collection.renameMode(lightModeId, "Light");
  const darkModeId = collection.modes[1].modeId;
  collection.renameMode(darkModeId, "Dark");

  // 3. 변수 순회하며 생성 및 값 할당
  let localVars = await figma.variables.getLocalVariablesAsync();
  let createdCount = 0;
  let updatedCount = 0;

  for (const [name, values] of Object.entries(tokens)) {
    // 이미 존재하는지 확인
    let v = localVars.find(v => v.name === name && v.variableCollectionId === collection.id);
    
    if (!v) {
      v = figma.variables.createVariable(name, collection.id, "COLOR");
      createdCount++;
    } else {
      updatedCount++;
    }

    // 값 세팅
    v.setValueForMode(lightModeId, hexToRgb(values.light));
    v.setValueForMode(darkModeId, hexToRgb(values.dark));
  }

  console.log(`🎉 토큰 동기화 완료! (생성: ${createdCount}개, 업데이트: ${updatedCount}개)`);
  console.log("이제 버튼 컴포넌트들을 선택하고 이 변수들을 바인딩할 수 있습니다.");
}

syncSonagiTokens();
