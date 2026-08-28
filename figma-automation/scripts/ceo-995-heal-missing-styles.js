(async () => {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    return console.error("❌ 요소를 먼저 선택해 주세요! (정상적인 텍스트 1개 + 고치고 싶은 프레임들)");
  }

  // 1. 선택된 요소들 중에서 '정상적인 텍스트 스타일'이 적용된 첫 번째 텍스트 레이어를 찾습니다 (복제할 원본)
  let masterStyleId = null;
  
  const findMasterStyle = (node) => {
    if (node.type === "TEXT" && node.textStyleId && typeof node.textStyleId === "string") {
      // 믹스(Mixed) 상태가 아닌 단일 스타일이 적용된 텍스트
      masterStyleId = node.textStyleId;
      return true;
    }
    if (node.children) return node.children.some(findMasterStyle);
    return false;
  };

  selection.some(findMasterStyle);

  if (!masterStyleId) {
    return console.error("🚨 선택한 요소 중에 '라이브러리 텍스트 스타일이 정상적으로 연결된' 텍스트가 하나도 없습니다. 하나라도 먼저 스타일을 예쁘게 연결한 뒤 다시 실행해 주세요!");
  }

  // 2. 선택된 모든 영역을 돌면서, 물음표(?)가 뜨거나 스타일이 없는 텍스트를 찾아 일괄 덮어씌웁니다.
  let fixedCount = 0;
  
  const healTextNodes = async (node) => {
    if (node.type === "TEXT") {
      // 이미 마스터 스타일과 같으면 통과
      if (node.textStyleId !== masterStyleId) {
        try {
          // 물음표(Missing Font) 에러가 걸려있을 경우를 대비해 폰트를 강제 로드 후 덮어쓰기
          if (node.hasMissingFont) {
             const fontName = node.fontName !== figma.mixed ? node.fontName : { family: "Inter", style: "Regular" };
             await figma.loadFontAsync(fontName).catch(() => {});
          }
          node.textStyleId = masterStyleId;
          fixedCount++;
        } catch(e) {
          console.warn("텍스트 스타일 덮어쓰기 실패 (폰트 로드 에러 등):", node.name);
        }
      }
    }
    
    if (node.children) {
      for (const child of node.children) {
        await healTextNodes(child);
      }
    }
  };

  console.log("🪄 마법 지팡이(Style Propagator)를 휘두릅니다...");
  
  for (const node of selection) {
    await healTextNodes(node);
  }

  console.log(`🎉 퇴마 및 치유 완료! 총 ${fixedCount}개의 텍스트 레이어에 물음표(?) 에러가 사라지고 정상 스타일로 일괄 덮어씌워졌습니다.`);
})();