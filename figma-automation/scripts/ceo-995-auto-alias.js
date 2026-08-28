(async () => {
  console.log("🪄 [Auto-Alias] 인공지능 알고리즘이 가장 가까운 원시 토큰을 찾아 1초 만에 자동 매핑합니다...");

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semColl = collections.find(c => c.name === "Sonagi Color Tokens");
  const primColl = collections.find(c => c.name === "Primitive Colors");

  if (!semColl || !primColl) return console.error("❌ 컬렉션을 찾을 수 없습니다.");

  const lightModeId = semColl.modes.find(m => m.name.includes("Light") || m.name.includes("볕")).modeId;
  const darkModeId = semColl.modes.find(m => m.name.includes("Dark") || m.name.includes("밤")).modeId;
  const defaultPrimModeId = primColl.modes[0].modeId;

  // 원시 토큰 전체 캐싱
  const primVars = [];
  for (const id of primColl.variableIds) {
    try { 
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) primVars.push(v);
    } catch(e){}
  }

  // 3차원 공간에서 색상 간의 거리(유클리드 거리)를 계산하여 가장 비슷한 색을 찾는 함수
  const getColorDistance = (c1, c2) => {
    return Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2));
  };

  const findClosestPrimitive = (targetRgb, tokenName) => {
    let closestVar = null;
    let minDistance = Infinity;

    // 이름에 'brand'가 들어가면 무조건 'brand-blue' 파레트 안에서만 찾도록 락(Lock)을 검
    const isBrand = tokenName.includes("brand") || tokenName.includes("accent");

    for (const pv of primVars) {
      if (isBrand && !pv.name.includes("brand-blue")) continue;
      if (!isBrand && pv.name.includes("brand-blue")) continue;

      const pvRgb = pv.valuesByMode[defaultPrimModeId];
      if (!pvRgb) continue;

      const dist = getColorDistance(targetRgb, pvRgb);
      if (dist < minDistance) {
        minDistance = dist;
        closestVar = pv;
      }
    }
    return closestVar;
  };

  let bindCount = 0;

  for (const id of semColl.variableIds) {
    try {
      const sv = await figma.variables.getVariableByIdAsync(id);
      if (!sv) continue;

      // Light 모드 자동 바인딩
      const lightVal = sv.valuesByMode[lightModeId];
      if (lightVal && lightVal.type !== "VARIABLE_ALIAS") {
        const closest = findClosestPrimitive(lightVal, sv.name);
        if (closest) {
          sv.setValueForMode(lightModeId, figma.variables.createVariableAlias(closest));
          bindCount++;
          console.log(`🔗 [Light] ${sv.name} ➔ ${closest.name} 자동 매핑!`);
        }
      }

      // Dark 모드 자동 바인딩
      const darkVal = sv.valuesByMode[darkModeId];
      if (darkVal && darkVal.type !== "VARIABLE_ALIAS") {
        // 혹시 아까 에러났던 눈뽕 순백색 방어
        if (darkVal.r === 1 && darkVal.g === 1 && darkVal.b === 1 && !sv.name.includes("text") && !sv.name.includes("inverse")) {
           console.log(`⚠️ [Dark] ${sv.name} 은(는) 순백색 에러 위험이 있어 매핑을 보류합니다.`);
           continue;
        }

        const closest = findClosestPrimitive(darkVal, sv.name);
        if (closest) {
          sv.setValueForMode(darkModeId, figma.variables.createVariableAlias(closest));
          bindCount++;
          console.log(`🔗 [Dark] ${sv.name} ➔ ${closest.name} 자동 매핑!`);
        }
      }
    } catch(e){}
  }

  console.log(`\n🎉 [매직 링커] 자동 매핑 완료! 총 ${bindCount}번의 마우스 클릭 노가다를 스크립트가 대신 처리했습니다.`);
  console.log("💡 캔버스의 시각화 보드는 구버전이므로, 아까 실행했던 [V4 시각화 스크립트]를 한 번 더 실행해 주시면 빨간색 ⚠️ 경고가 싹 사라진 것을 볼 수 있습니다!");
})();