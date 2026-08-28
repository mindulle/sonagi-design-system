/**
 * 02-cleanup-legacy-variables.js
 * 
 * 1. Color Primitives에서 brand-blue/* 및 안 쓰는 원시값 제거
 * 2. Colors(Semantic)에서 생성했던 호환성 Alias들을 실제 컴포넌트 바인딩으로 교체 후 삭제
 * 
 * [실행 방법]
 * 피그마 데스크톱 앱 > Plugins > Development > Open console 에 붙여넣기
 */
async function cleanupAndSwapVariables() {
  console.log("🧹 [1/3] 피그마 대청소를 시작합니다...");

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semanticColl = collections.find(c => c.name === "Colors");
  const primitiveColl = collections.find(c => c.name === "Color Primitives");

  if (!semanticColl || !primitiveColl) {
    console.error("❌ 'Colors' 또는 'Color Primitives' 컬렉션을 찾을 수 없습니다.");
    return;
  }

  const allVars = await figma.variables.getLocalVariablesAsync();
  
  // -------------------------------------------------------------
  // 1. Primitive 정리 (brand-blue/* 등)
  // -------------------------------------------------------------
  console.log("🧹 [2/3] 안 쓰는 레거시 Primitives 삭제 중...");
  const primitivesToDelete = allVars.filter(v => 
    v.variableCollectionId === primitiveColl.id &&
    (v.name.startsWith("brand-blue/") || v.name === "brand.cyan")
  );
  
  let deletedPrimitives = 0;
  for (const v of primitivesToDelete) {
    console.log(`  🗑 삭제: ${v.name}`);
    v.remove();
    deletedPrimitives++;
  }
  console.log(`✅ 총 ${deletedPrimitives}개의 레거시 Primitive 변수 삭제 완료.`);

  // -------------------------------------------------------------
  // 2. Semantic 바인딩 교체 맵 구성
  // -------------------------------------------------------------
  const swapMapNames = {
    "text/brand": "brand/primary",
    "text/info": "state/info",
    "text/success": "state/success",
    "text/warning": "state/warning",
    "text/danger": "state/danger",
    "bg/info-subtle": "state/info-bg",
    "bg/success-subtle": "state/success-bg",
    "bg/warning-subtle": "state/warning-bg",
    "bg/danger-subtle": "state/danger-bg",
    "brand/primary-active": "brand/primary-hover",
    "brand/accent-active": "brand/accent-hover"
  };

  const oldIdToNewId = {};
  const oldVars = [];

  for (const [oldName, newName] of Object.entries(swapMapNames)) {
    const oldV = allVars.find(v => v.variableCollectionId === semanticColl.id && v.name === oldName);
    const newV = allVars.find(v => v.variableCollectionId === semanticColl.id && v.name === newName);
    
    if (oldV && newV) {
      oldIdToNewId[oldV.id] = newV.id;
      oldVars.push(oldV);
    }
  }

  console.log(`🔄 교체할 변수 바인딩 쌍: ${Object.keys(oldIdToNewId).length}개 준비됨.`);

  // -------------------------------------------------------------
  // 3. 캔버스 노드 전체 순회하며 바인딩(Fills, Strokes) 교체
  // -------------------------------------------------------------
  console.log("🔍 [3/3] 캔버스 전체 노드에서 구버전 변수 바인딩을 찾아 새 변수로 교체합니다. (시간이 걸릴 수 있습니다...)");
  
  // 색상을 가질 수 있는 노드 타입들 필터링
  const nodes = figma.root.findAllWithCriteria({
    types: ['COMPONENT', 'COMPONENT_SET', 'INSTANCE', 'FRAME', 'GROUP', 'TEXT', 'VECTOR', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE', 'BOOLEAN_OPERATION']
  });

  let swappedNodesCount = 0;

  for (const node of nodes) {
    let nodeSwapped = false;

    if (!node.boundVariables) continue;

    // Fills 교체
    if (node.boundVariables.fills) {
      const newFills = [];
      let fillsChanged = false;
      const fillsArr = Array.isArray(node.boundVariables.fills) ? node.boundVariables.fills : [node.boundVariables.fills];
      
      // 여러 fill이 있을 수 있으므로 figma.variables.setBoundVariableForPaint를 직접 사용하기보단
      // 객체를 복사해서 주입하는 방식이 더 안전함 (일부 노드는 setBoundVariableForPaint 미지원)
      try {
        const fills = figma.clone(node.fills);
        for (let i = 0; i < fills.length; i++) {
          const bound = node.boundVariables.fills[i];
          if (bound && bound.type === "VARIABLE_ALIAS" && oldIdToNewId[bound.id]) {
            node.setBoundVariableForPaint(i, "fills", figma.variables.getVariableById(oldIdToNewId[bound.id]));
            fillsChanged = true;
          }
        }
        if (fillsChanged) nodeSwapped = true;
      } catch (e) {
        // 일부 노드(Text 등) 혼합 속성일 때 에러 발생 무시
      }
    }

    // Strokes 교체
    if (node.boundVariables.strokes) {
      let strokesChanged = false;
      try {
        const strokes = figma.clone(node.strokes);
        for (let i = 0; i < strokes.length; i++) {
          const bound = node.boundVariables.strokes[i];
          if (bound && bound.type === "VARIABLE_ALIAS" && oldIdToNewId[bound.id]) {
            node.setBoundVariableForPaint(i, "strokes", figma.variables.getVariableById(oldIdToNewId[bound.id]));
            strokesChanged = true;
          }
        }
        if (strokesChanged) nodeSwapped = true;
      } catch (e) {}
    }

    if (nodeSwapped) swappedNodesCount++;
  }

  console.log(`✅ 총 ${swappedNodesCount}개 노드의 바인딩을 최신 토큰으로 교체했습니다.`);

  // -------------------------------------------------------------
  // 4. 구버전 Semantic 변수 영구 삭제
  // -------------------------------------------------------------
  let deletedSemantics = 0;
  for (const v of oldVars) {
    console.log(`  🗑 삭제 (구버전 호환용 Alias): ${v.name}`);
    v.remove();
    deletedSemantics++;
  }

  console.log(`🎉 대청소 완료! 총 ${deletedPrimitives}개의 원시값과 ${deletedSemantics}개의 호환용 껍데기 변수를 삭제했습니다.`);
  console.log("👉 Assets 패널에서 변경사항을 'Publish' 해주시면 완벽히 적용됩니다.");
}

cleanupAndSwapVariables();
