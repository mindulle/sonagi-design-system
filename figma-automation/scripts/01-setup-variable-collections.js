// 1. Primitive 컬렉션 생성 (고정값)
async function setupVariables() {
  const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
  
  let primitiveCollection = localCollections.find(c => c.name === "Primitives");
  if (!primitiveCollection) {
    primitiveCollection = figma.variables.createVariableCollection("Primitives");
    console.log("✅ Primitives 컬렉션 생성 완료");
  }

  let semanticCollection = localCollections.find(c => c.name === "Semantics");
  if (!semanticCollection) {
    semanticCollection = figma.variables.createVariableCollection("Semantics");
    
    // 기본 모드 이름 변경 및 Dark 모드 추가
    semanticCollection.renameMode(semanticCollection.modes[0].modeId, "Light");
    semanticCollection.addMode("Dark");
    console.log("✅ Semantics 컬렉션 (Light/Dark 모드) 생성 완료");
  }

  // 예시: Primitive Color 생성
  const blue500 = figma.variables.createVariable("color/blue-500", primitiveCollection.id, "COLOR");
  blue500.setValueForMode(primitiveCollection.modes[0].modeId, { r: 59/255, g: 130/255, b: 246/255 });
  
  const gray900 = figma.variables.createVariable("color/gray-900", primitiveCollection.id, "COLOR");
  gray900.setValueForMode(primitiveCollection.modes[0].modeId, { r: 17/255, g: 24/255, b: 39/255 });

  const white = figma.variables.createVariable("color/white", primitiveCollection.id, "COLOR");
  white.setValueForMode(primitiveCollection.modes[0].modeId, { r: 1, g: 1, b: 1 });

  // 예시: Semantic Color 생성 및 Primitive 참조(Alias) 연결
  const bgSurface = figma.variables.createVariable("bg-surface", semanticCollection.id, "COLOR");
  bgSurface.setValueForMode(semanticCollection.modes[0].modeId, figma.variables.createVariableAlias(white)); // Light
  bgSurface.setValueForMode(semanticCollection.modes[1].modeId, figma.variables.createVariableAlias(gray900)); // Dark

  const textPrimary = figma.variables.createVariable("text-primary", semanticCollection.id, "COLOR");
  textPrimary.setValueForMode(semanticCollection.modes[0].modeId, figma.variables.createVariableAlias(gray900)); // Light
  textPrimary.setValueForMode(semanticCollection.modes[1].modeId, figma.variables.createVariableAlias(white)); // Dark

  console.log("🎉 기초 변수 뼈대(Primitive -> Semantic) 세팅이 완료되었습니다!");
}

setupVariables();
