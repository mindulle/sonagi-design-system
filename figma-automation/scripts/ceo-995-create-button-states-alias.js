(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semantic = collections.find(c => c.name === "Sonagi Color Tokens");
  const primitive = collections.find(c => c.name === "Primitive Colors");
  
  if (!semantic || !primitive) return console.error("❌ 시맨틱 또는 원시 컬렉션을 찾을 수 없습니다.");

  const lightModeId = semantic.modes.find(m => m.name.includes("Light")).modeId;
  const darkModeId = semantic.modes.find(m => m.name.includes("Dark")).modeId;

  // 1. Primitive 변수 캐싱 (이름으로 매핑하기 위해)
  const primitiveVars = [];
  for (const id of primitive.variableIds) {
    try { 
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v) primitiveVars.push(v);
    } catch(e){}
  }
  
  // 이름(예: gray/500)을 받아 Alias(연결선) 객체를 반환하는 헬퍼 함수
  const getPrimAlias = (name) => {
    const v = primitiveVars.find(v => v.name === name);
    return v ? figma.variables.createVariableAlias(v) : null;
  };

  // 2. 추가할 버튼 상태 토큰 정의 (Light는 밝은쪽, Dark는 어두운쪽 Primitive에 매핑)
  const tokensToAdd = [
    { name: "brand/brand-secondary-hover", light: "gray/200", dark: "gray/800" },
    { name: "brand/brand-secondary-active", light: "gray/300", dark: "gray/700" },
    { name: "state/state-danger-hover", light: "red/600", dark: "red/400" },
    { name: "state/state-danger-active", light: "red/700", dark: "red/500" },
    { name: "state/state-disabled-bg", light: "gray/100", dark: "gray/900" },
    { name: "state/state-disabled-text", light: "gray/400", dark: "gray/600" }
  ];

  console.log("🛠️ 누락된 버튼 상태 토큰을 생성하고 Primitive에 연결(Alias)합니다...");
  
  let addedCount = 0;
  for (const t of tokensToAdd) {
    // 중복 확인
    let exists = false;
    for (const id of semantic.variableIds) {
      try {
        const v = await figma.variables.getVariableByIdAsync(id);
        if (v && v.name === t.name) { exists = true; break; }
      } catch(e){}
    }
    
    if (exists) {
      console.log(`  - 통과 (이미 존재함): ${t.name}`);
      continue;
    }

    // Alias 생성
    const aliasLight = getPrimAlias(t.light);
    const aliasDark = getPrimAlias(t.dark);

    if (!aliasLight || !aliasDark) {
      console.error(`  ❌ Primitive 매핑 실패 (원시 변수를 못 찾음): ${t.name}`);
      continue;
    }

    try {
      // deprecated 경고를 방지하기 위해 ID 대신 Node 객체(semantic)를 직접 전달
      const newVar = figma.variables.createVariable(t.name, semantic, "COLOR");
      newVar.setValueForMode(lightModeId, aliasLight);
      newVar.setValueForMode(darkModeId, aliasDark);
      addedCount++;
      console.log(`  + 🔗 연결 완료: ${t.name} (Light ➔ ${t.light}, Dark ➔ ${t.dark})`);
    } catch (e) {
      console.error(`  ❌ 생성 실패: ${t.name}`, e);
    }
  }
  
  console.log(`\n🎉 3-Tier 구조 체험판 완료! 총 ${addedCount}개의 버튼 상태 토큰이 원시 팔레트와 완벽하게 연결되었습니다.`);
})();