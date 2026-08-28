(async () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) return console.error("❌ 우측의 '다크모드 프레임'을 선택해 주세요!");
  
  const frame = selection[0];
  const modes = frame.explicitVariableModes;
  
  if (!modes || Object.keys(modes).length === 0) {
    return console.log("이 프레임에는 강제로 지정된 모드가 없습니다.");
  }

  console.log("🔍 [디버깅] 이 프레임에 걸려있는 강제 모드 목록:");
  
  let clearedCount = 0;
  let targetCollectionId = null;
  let targetModeId = null;

  for (const collectionId in modes) {
    const modeId = modes[collectionId];
    try {
      const collection = await figma.variables.getVariableCollectionByIdAsync(collectionId);
      if (collection) {
        const mode = collection.modes.find(m => m.modeId === modeId);
        console.log(`  - 📦 컬렉션: [${collection.name}] ➔ 🎨 모드: [${mode ? mode.name : 'Unknown'}]`);
        
        // Sonagi Color Tokens가 아닌 엉뚱한 컬렉션(예: Fallback, 로컬 찌꺼기)이면 해제 대상
        if (collection.name !== "Sonagi Color Tokens") {
          frame.clearExplicitVariableModeForCollection(collectionId);
          clearedCount++;
          console.log(`    🗑️ 불필요한 모드 연결을 해제했습니다: ${collection.name}`);
        } else {
          // 진짜 타겟은 기억해둠
          targetCollectionId = collectionId;
          targetModeId = modeId;
        }
      } else {
        // 컬렉션을 찾을 수 없는 경우 (유령 컬렉션)
        console.log(`  - 👻 [유령 컬렉션] ID: ${collectionId}`);
        frame.clearExplicitVariableModeForCollection(collectionId);
        clearedCount++;
        console.log(`    🗑️ 유령 모드 연결을 해제했습니다.`);
      }
    } catch(e) {
      // 에러 시 강제 해제 시도
      frame.clearExplicitVariableModeForCollection(collectionId);
    }
  }

  // 확실하게 Sonagi Color Tokens만 다시 걸어줌
  if (targetCollectionId && targetModeId) {
    frame.setExplicitVariableModeForCollection(targetCollectionId, targetModeId);
  }

  console.log(`\n🎉 정리 완료! 총 ${clearedCount}개의 불필요한 모드 연결이 삭제되었습니다. 이제 Layer 패널이 깔끔해졌을 겁니다!`);
})();