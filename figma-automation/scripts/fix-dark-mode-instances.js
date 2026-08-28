const lightSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Light Theme"))[0];
const darkSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Dark Theme"))[0];

if (!lightSection || !darkSection) {
  figma.notify("❌ 섹션을 찾을 수 없습니다.");
} else {
  // 1. 기존 Dark 섹션 비우기 (복제된 원본 마스터 컴포넌트들 삭제)
  darkSection.children.forEach(c => c.remove());
  
  // 2. Light 섹션의 마스터 프레임 찾기
  const lightMaster = lightSection.children.find(c => c.name === "🧩 Components Layout");
  
  if (lightMaster) {
    // 3. Dark용 빈 마스터 프레임 생성
    const darkMaster = figma.createFrame();
    darkMaster.name = "🧩 Components Layout (Instances)";
    darkMaster.layoutMode = lightMaster.layoutMode;
    darkMaster.itemSpacing = lightMaster.itemSpacing;
    darkMaster.paddingTop = lightMaster.paddingTop;
    darkMaster.paddingBottom = lightMaster.paddingBottom;
    darkMaster.paddingLeft = lightMaster.paddingLeft;
    darkMaster.paddingRight = lightMaster.paddingRight;
    darkMaster.primaryAxisSizingMode = "AUTO";
    darkMaster.counterAxisSizingMode = "AUTO";
    darkMaster.clipsContent = false;
    darkMaster.fills = [];
    
    // 4. Light 마스터 내부의 카테고리 그룹 순회
    lightMaster.children.forEach(group => {
      if (group.type !== "FRAME") return;
      
      const darkGroup = figma.createFrame();
      darkGroup.name = group.name;
      darkGroup.layoutMode = group.layoutMode;
      darkGroup.itemSpacing = group.itemSpacing;
      darkGroup.primaryAxisSizingMode = "AUTO";
      darkGroup.counterAxisSizingMode = "AUTO";
      darkGroup.clipsContent = false;
      darkGroup.fills = [];
      
      // 5. 컴포넌트/인스턴스 처리
      group.children.forEach(node => {
        let newNode = null;
        if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
          // 마스터 컴포넌트는 인스턴스로 뽑아내기!
          newNode = node.type === "COMPONENT" ? node.createInstance() : node.defaultVariant.createInstance();
        } else if (node.type === "INSTANCE" || node.type === "FRAME" || node.type === "TEXT") {
          // 이미 인스턴스거나 일반 프레임/텍스트면 그냥 복제
          newNode = node.clone();
        }
        
        if (newNode) {
          darkGroup.appendChild(newNode);
        }
      });
      
      darkMaster.appendChild(darkGroup);
    });
    
    darkSection.appendChild(darkMaster);
    darkMaster.x = darkSection.x + 100;
    darkMaster.y = darkSection.y + 100;
    darkSection.resizeWithoutConstraints(darkMaster.width + 200, darkMaster.height + 200);
    
    figma.notify("✅ Dark 섹션의 중복 마스터들을 제거하고, 'Instance(인스턴스)'로 올바르게 교체했습니다!");
  }
}
