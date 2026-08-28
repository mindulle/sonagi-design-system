(async () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) return console.error("❌ 우측의 '배경 프레임'을 먼저 마우스로 클릭해 주세요!");
  
  const frame = selection[0];
  
  // 1. 프레임 안쪽에 쓰인 버튼을 통해 '외부 라이브러리(Foundation)' 컬렉션을 역추적합니다.
  let targetVarId = null;
  
  const findVariableId = (node) => {
    if (targetVarId) return;
    if (node.boundVariables) {
      for (const key in node.boundVariables) {
        const bound = node.boundVariables[key];
        if (bound && bound.type === 'VARIABLE_ALIAS') {
          targetVarId = bound.id; return;
        } else if (Array.isArray(bound) && bound[0] && bound[0].type === 'VARIABLE_ALIAS') {
          targetVarId = bound[0].id; return;
        }
      }
    }
    if (node.children) node.children.forEach(findVariableId);
  };
  
  findVariableId(frame);
  
  if (!targetVarId) {
    return console.error("❌ 프레임 안에 Foundation 토큰이 적용된 버튼을 찾을 수 없습니다.");
  }
  
  // 2. 역추적한 변수로 컬렉션 모드 찾아내기
  const sampleVar = await figma.variables.getVariableByIdAsync(targetVarId);
  if (!sampleVar) return console.error("변수를 불러오지 못했습니다.");

  const collection = await figma.variables.getVariableCollectionByIdAsync(sampleVar.variableCollectionId);
  if (!collection) return console.error("컬렉션을 로드할 수 없습니다.");
  
  const darkMode = collection.modes.find(m => m.name.includes("Dark") || m.name.includes("밤"));
  
  if (!darkMode) {
    return console.error("❌ 다크 모드를 찾을 수 없습니다.");
  }
  
  // 3. 다크모드 강제 주입
  try {
    frame.setExplicitVariableModeForCollection(collection.id, darkMode.modeId);
    console.log(`🌙 짠! [${collection.name}]의 다크 모드가 강제로 적용되었습니다!`);
  } catch(e) {
    try { 
      frame.setExplicitVariableModeForCollection(collection, darkMode.modeId); 
      console.log(`🌙 짠! [${collection.name}]의 다크 모드가 강제로 적용되었습니다!`);
    } catch (err) {
      console.error("적용 에러:", err);
    }
  }
})();