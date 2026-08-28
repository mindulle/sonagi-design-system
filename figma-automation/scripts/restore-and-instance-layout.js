const lightSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Light Theme"))[0];
const darkSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Dark Theme"))[0];
const masterLayout = figma.currentPage.findAll(n => n.name.includes("🧩 Components Layout"))[0];

if (!lightSection || !darkSection || !masterLayout) {
  figma.notify("❌ 섹션이나 마스터 레이아웃을 찾을 수 없습니다.");
} else {
  lightSection.appendChild(masterLayout);
  masterLayout.x = lightSection.x + 100;
  masterLayout.y = lightSection.y + 100;
  
  darkSection.children.forEach(c => c.remove());
  
  const darkMaster = figma.createFrame();
  darkMaster.name = "🧩 Components Layout (Instances)";
  darkMaster.layoutMode = masterLayout.layoutMode;
  darkMaster.itemSpacing = masterLayout.itemSpacing;
  darkMaster.paddingTop = masterLayout.paddingTop;
  darkMaster.paddingBottom = masterLayout.paddingBottom;
  darkMaster.paddingLeft = masterLayout.paddingLeft;
  darkMaster.paddingRight = masterLayout.paddingRight;
  darkMaster.primaryAxisSizingMode = "AUTO";
  darkMaster.counterAxisSizingMode = "AUTO";
  darkMaster.clipsContent = false;
  darkMaster.fills = [];
  
  masterLayout.children.forEach(group => {
    if (group.type !== "FRAME") return;
    
    const darkGroup = figma.createFrame();
    darkGroup.name = group.name;
    darkGroup.layoutMode = group.layoutMode;
    darkGroup.itemSpacing = group.itemSpacing;
    darkGroup.primaryAxisSizingMode = "AUTO";
    darkGroup.counterAxisSizingMode = "AUTO";
    darkGroup.clipsContent = false;
    darkGroup.fills = [];
    
    group.children.forEach(node => {
      let newNode = null;
      if (node.type === "COMPONENT") {
        newNode = node.createInstance();
      } else if (node.type === "COMPONENT_SET") {
        newNode = node.defaultVariant.createInstance();
      } else if (node.type === "INSTANCE" || node.type === "FRAME" || node.type === "TEXT") {
        newNode = node.clone();
      }
      if (newNode) darkGroup.appendChild(newNode);
    });
    
    darkMaster.appendChild(darkGroup);
  });
  
  darkSection.appendChild(darkMaster);
  darkMaster.x = darkSection.x + 100;
  darkMaster.y = darkSection.y + 100;
  
  figma.notify("✅ 마스터를 Light 섹션에 복구하고, Dark 섹션에 인스턴스를 완벽히 생성했습니다!");
}
