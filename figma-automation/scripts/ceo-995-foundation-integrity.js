(async () => {
  console.log("🔍 [CEO-995] Foundation-v3 무결성 검사 및 복구 시작...");

  // 1. 컬렉션 및 모드 조회
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const targetCollectionName = "Sonagi Color Tokens";
  let semanticCollection = collections.find(c => c.name === targetCollectionName);
  
  if (!semanticCollection) {
    console.error(`❌ '${targetCollectionName}' 컬렉션을 찾을 수 없습니다.`);
    return;
  }

  console.log(`✅ 대상 컬렉션 확인: ${semanticCollection.name}`);

  const modes = semanticCollection.modes;
  const lightMode = modes.find(m => m.name.includes("Light"));
  const darkMode = modes.find(m => m.name.includes("Dark"));

  if (!lightMode || !darkMode) {
    console.error("❌ Light 또는 Dark 모드를 찾을 수 없습니다. 현재 모드:", modes.map(m => m.name));
    return;
  }

  // 2. 전체 가져오기 API 버그 회피 (지원되지 않는 변수 타입이 있을 경우 우회)
  console.log("⏳ 변수 목록을 하나씩 불러옵니다 (알 수 없는 타입 에러 방지)...");
  const variables = [];
  let skippedCount = 0;
  
  for (const id of semanticCollection.variableIds) {
    try {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) variables.push(v);
    } catch (e) {
      skippedCount++;
    }
  }

  if (skippedCount > 0) {
    console.warn(`⚠️ API가 지원하지 않는 변수 타입(예: 타이포그래피/그레디언트 등) ${skippedCount}개를 안전하게 건너뛰었습니다.`);
  }

  let missingValuesCount = 0;
  let fixedCount = 0;

  console.log("--- 🕵️ 다크모드 & 시맨틱 누락 검사 ---");
  
  // 3. 다크모드 무결성 확보 (빈 값 채우기)
  variables.forEach(variable => {
    const valuesByMode = variable.valuesByMode;
    const lightValue = valuesByMode[lightMode.modeId];
    const darkValue = valuesByMode[darkMode.modeId];

    const isLightMissing = lightValue === undefined || lightValue === null;
    const isDarkMissing = darkValue === undefined || darkValue === null;

    if (isLightMissing || isDarkMissing) {
      missingValuesCount++;
      console.warn(`[누락 발견] ${variable.name} - ☀️ Light: ${isLightMissing ? 'X' : 'O'}, 🌙 Dark: ${isDarkMissing ? 'X' : 'O'}`);
      
      // ? 에러를 방지하기 위해 빈 값을 채워넣음 (Light -> Dark 복사 등)
      if (!isLightMissing && isDarkMissing) {
        variable.setValueForMode(darkMode.modeId, lightValue);
        fixedCount++;
        console.log(`  -> 🛠️ 복구 완료: Light 값을 Dark 모드에 매핑함`);
      } else if (isLightMissing && !isDarkMissing) {
        variable.setValueForMode(lightMode.modeId, darkValue);
        fixedCount++;
        console.log(`  -> 🛠️ 복구 완료: Dark 값을 Light 모드에 매핑함`);
      }
    }
  });

  if (missingValuesCount === 0) {
    console.log("✨ 모든 색상 토큰에 Light/Dark 값이 100% 채워져 있습니다! (무결성 확보)");
  } else {
    console.log(`✅ 총 ${missingValuesCount}개의 누락 중 ${fixedCount}개를 복구하여 '?' 렌더링 에러를 해결했습니다.`);
  }

  // 4. 가비지 토큰(미사용/네이밍 위반) 탐색
  console.log("--- 🗑️ 가비지 토큰 후보 검사 ---");
  const validPrefixes = ["primary", "secondary", "error", "danger", "success", "text", "bg", "border", "surface", "icon", "base", "color"];
  const garbageCandidates = variables.filter(v => {
    const nameLower = v.name.toLowerCase();
    // 시맨틱 컬러 토큰에 필요한 핵심 키워드가 없는 경우 필터링
    return !validPrefixes.some(prefix => nameLower.includes(prefix));
  });

  if (garbageCandidates.length > 0) {
    console.log(`🤔 가비지 토큰 의심 후보 (${garbageCandidates.length}개) - 확인 후 수동 삭제를 권장합니다:`);
    garbageCandidates.forEach(v => console.log(`  - ${v.name}`));
  } else {
    console.log("✨ 가비지 토큰으로 의심되는 항목이 없습니다.");
  }

  console.log("🎉 [CEO-995] 검사 및 복구 완료! Figma 우측 상단의 'Publish'를 눌러 라이브러리를 전사 배포해주세요.");
})();