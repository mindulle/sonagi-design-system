(async () => {
  console.log("🧹 [Cleanup] 중복 및 잉여 토큰 대청소를 시작합니다...");

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semColl = collections.find(c => c.name === "Sonagi Color Tokens");

  if (!semColl) return console.error("❌ 'Sonagi Color Tokens' 컬렉션을 찾을 수 없습니다.");

  const lightModeId = semColl.modes.find(m => m.name.includes("Light") || m.name.includes("볕")).modeId;
  const darkModeId = semColl.modes.find(m => m.name.includes("Dark") || m.name.includes("밤")).modeId;

  const vars = [];
  for (const id of semColl.variableIds) {
    try { 
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) vars.push(v);
    } catch(e){}
  }

  // 1. 삭제할 잉여 토큰들 목록
  const tokensToDelete = [
    "background/bg-disabled", 
    "text/text-disabled", 
    "brand/accent"
  ];

  let deletedCount = 0;
  for (const name of tokensToDelete) {
    const v = vars.find(v => v.name === name);
    if (v) {
      try {
        v.remove();
        deletedCount++;
        console.log(`🗑️ 완벽 삭제: ${name}`);
      } catch(e) {
        console.error(`❌ 삭제 실패: ${name}`, e);
      }
    } else {
      console.log(`✅ 이미 삭제됨(통과): ${name}`);
    }
  }

  // 2. 족보가 끊겨있던 'brand-secondary' 토큰 생성 및 맵핑
  const secondaryName = "brand/brand-secondary";
  let secondaryVar = vars.find(v => v.name === secondaryName);
  
  if (!secondaryVar) {
    const bgSurface = vars.find(v => v.name === "background/bg-surface");
    if (bgSurface) {
      try {
        secondaryVar = figma.variables.createVariable(secondaryName, semColl, "COLOR");
        // bg-surface가 바라보는 물감(Alias)을 그대로 똑같이 바라보게 복사
        secondaryVar.setValueForMode(lightModeId, bgSurface.valuesByMode[lightModeId]);
        secondaryVar.setValueForMode(darkModeId, bgSurface.valuesByMode[darkModeId]);
        console.log(`✨ 족보 복구 완료: ${secondaryName} (bg-surface와 동일한 톤으로 매핑됨)`);
      } catch(e) {
        console.error(`❌ 생성 실패: ${secondaryName}`, e);
      }
    } else {
      console.warn("⚠️ 'background/bg-surface'를 찾을 수 없어 'brand-secondary'를 생성하지 못했습니다.");
    }
  } else {
    console.log(`✅ '${secondaryName}' 족보는 이미 존재합니다.`);
  }

  console.log(`\n🎉 대청소 완료! 총 ${deletedCount}개의 잉여 토큰이 삭제되고 부족했던 족보가 채워졌습니다.`);
  console.log("💡 (필독) 캔버스의 구형 V4 보드를 지우시고, 아까 쓰셨던 [V4 시각화 스크립트]를 한 번만 더 돌려보세요. 속이 뻥 뚫리실 겁니다!");
})();