(async () => {
  const selection = figma.currentPage.selection;
  
  // 1. 선택된 요소 검증
  if (selection.length === 0) {
    return console.error("❌ 화면 우측의 살구색 '배경 프레임'을 먼저 마우스로 클릭해서 선택해 주세요!");
  }
  
  const frame = selection[0];

  // 2. 컬렉션 및 모드 조회
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semantic = collections.find(c => c.name === "Sonagi Color Tokens");
  
  if (!semantic) {
    return console.error("❌ 'Sonagi Color Tokens' 컬렉션을 찾을 수 없습니다.");
  }
  
  const darkMode = semantic.modes.find(m => m.name.includes("Dark") || m.name.includes("밤"));
  
  if (!darkMode) {
    return console.error("❌ 다크 모드를 찾을 수 없습니다.");
  }
  
  // 3. 선택한 프레임에 다크 모드 강제 주입!
  try {
    frame.setExplicitVariableModeForCollection(semantic.id, darkMode.modeId);
    console.log("🌙 짠! 해당 프레임에 '가을 소나기 밤(Dark)' 모드가 강제로 적용되었습니다!");
    console.log("이제 안쪽에 있는 버튼들이 부모를 따라 일제히 다크모드 색상으로 변신했을 것입니다.");
  } catch(e) {
    // API 버전에 따른 fallback
    try {
      frame.setExplicitVariableModeForCollection(semantic, darkMode.modeId);
      console.log("🌙 짠! 해당 프레임에 '가을 소나기 밤(Dark)' 모드가 강제로 적용되었습니다!");
    } catch (err) {
      console.error("적용 중 에러가 발생했습니다:", err);
    }
  }
})();