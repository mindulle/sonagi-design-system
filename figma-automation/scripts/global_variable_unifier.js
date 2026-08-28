(async () => {
  console.log("🌍 파일 전체(모든 페이지) 바인딩 대통합 수술 시작...");
  let fixCount = 0;
  let explicitModeFixCount = 0;

  // 1. 모든 컬렉션과 변수 로드
  const allCols = await figma.variables.getLocalVariableCollectionsAsync();
  const allVars = await figma.variables.getLocalVariablesAsync();
  
  const semanticsCols = allCols.filter(c => c.name.includes("Semantics"));
  if (semanticsCols.length < 2) {
    figma.notify("중복된 Semantics 컬렉션이 감지되지 않았습니다.");
    return;
  }

  // 진짜 컬렉션 찾기: 변수 개수가 더 많은 쪽을 '진짜'로 간주
  semanticsCols.sort((a, b) => {
    const aCount = allVars.filter(v => v.variableCollectionId === a.id).length;
    const bCount = allVars.filter(v => v.variableCollectionId === b.id).length;
    return bCount - aCount;
  });

  const masterCol = semanticsCols[0];
  const masterVars = allVars.filter(v => v.variableCollectionId === masterCol.id);
  
  // 이름으로 빠르게 검색하기 위한 사전
  const masterVarMap = {};
  masterVars.forEach(v => { masterVarMap[v.name] = v; });

  // 2. 파일 내 '모든 페이지의 모든 노드'를 한 번에 다 가져옵니다. (figma.root 기준)
  const allNodes = [figma.root, ...figma.root.findAll()];

  for (const node of allNodes) {
    // [Fill & Stroke 색상 교체 함수]
    const replaceBoundVariables = async (paints) => {
      if (!paints || !Array.isArray(paints)) return paints;
      let newPaints = [...paints];
      let changed = false;
      for (let i = 0; i < newPaints.length; i++) {
        const p = newPaints[i];
        if (p.boundVariables && p.boundVariables.color) {
          try {
            const usedVar = await figma.variables.getVariableByIdAsync(p.boundVariables.color.id);
            // 가짜 컬렉션의 변수를 사용 중이라면?
            if (usedVar && usedVar.variableCollectionId !== masterCol.id) {
              const targetVar = masterVarMap[usedVar.name];
              if (targetVar) {
                newPaints[i] = figma.variables.setBoundVariableForPaint(p, 'color', targetVar);
                changed = true;
              }
            }
          } catch (e) {}
        }
      }
      return changed ? newPaints : null;
    };

    // Fills 수술
    if (node.fills) {
      const newFills = await replaceBoundVariables(node.fills);
      if (newFills) { node.fills = newFills; fixCount++; }
    }

    // Strokes 수술
    if (node.strokes) {
      const newStrokes = await replaceBoundVariables(node.strokes);
      if (newStrokes) { node.strokes = newStrokes; fixCount++; }
    }

    // [강제 모드(Explicit Mode) 찌꺼기 청소]
    if (node.explicitVariableModes) {
      const ghostCols = semanticsCols.slice(1);
      for (const ghostCol of ghostCols) {
        if (node.explicitVariableModes[ghostCol.id]) {
           const ghostModeId = node.explicitVariableModes[ghostCol.id];
           const ghostMode = ghostCol.modes.find(m => m.modeId === ghostModeId);
           
           // 가짜 컬렉션 모드 지우기
           node.clearExplicitVariableModeForCollection(ghostCol);
           
           // 진짜 컬렉션 모드로 재할당
           if (ghostMode) {
             const targetMode = masterCol.modes.find(m => m.name === ghostMode.name);
             if (targetMode) {
               node.setExplicitVariableModeForCollection(masterCol, targetMode.modeId);
             }
           }
           explicitModeFixCount++;
        }
      }
    }
  }

  figma.notify(`🌍 전역 수술 완료! 컬러 교체: ${fixCount}개, 모드 찌꺼기 청소: ${explicitModeFixCount}개`);
})();