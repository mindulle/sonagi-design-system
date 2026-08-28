const layouts = figma.currentPage.findAll(n => n.name === "🧩 Components Layout");
if (layouts.length === 0) {
  figma.notify("❌ 🧩 Components Layout 프레임을 찾을 수 없습니다.");
} else {
  let count = 0;
  layouts.forEach(layout => {
    // 마스터 프레임 Hug 설정
    layout.primaryAxisSizingMode = "AUTO";
    layout.counterAxisSizingMode = "AUTO";
    layout.clipsContent = false;
    count++;
    
    // 내부 카테고리 프레임들 Hug 설정
    layout.children.forEach(child => {
      if (child.type === "FRAME") {
        child.primaryAxisSizingMode = "AUTO";
        child.counterAxisSizingMode = "AUTO";
        child.clipsContent = false;
        count++;
      }
    });
  });
  figma.notify(`✅ ${count}개의 프레임 사이즈를 내용물에 맞게(Hug) 확장하여 잘림 현상을 해결했습니다!`);
}
