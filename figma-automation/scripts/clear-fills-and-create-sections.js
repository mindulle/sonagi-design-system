// 1. 선택된 컴포넌트들의 좌표를 기준으로 공식 Section 생성
const sel = figma.currentPage.selection;
if (sel.length === 0) {
  figma.notify("❌ 먼저 정리할 컴포넌트들을 드래그해서 선택해주세요!");
} else {
  const baseX = sel[0].x;
  const baseY = sel[0].y;

  const lightSection = figma.createSection();
  lightSection.name = "🌞 Light Theme";
  lightSection.resize(2000, 3000);
  lightSection.x = baseX - 2200;
  lightSection.y = baseY - 100;
  lightSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  const darkSection = figma.createSection();
  darkSection.name = "🌙 Dark Theme";
  darkSection.resize(2000, 3000);
  darkSection.x = baseX + 2200;
  darkSection.y = baseY - 100;
  darkSection.fills = [{ type: "SOLID", color: { r: 0.08, g: 0.09, b: 0.11 } }]; 

  let clearedCount = 0;
  sel.forEach(node => {
    const targetNodes = node.findAll ? node.findAll(n => n.type === "COMPONENT" || n.type === "FRAME" || n.type === "COMPONENT_SET") : [];
    targetNodes.push(node);
    
    targetNodes.forEach(target => {
      // Input Box, Badge 등 강제로 배경을 넣은 노드의 Fill 배열 비우기
      if (target.name.includes("Input Box") || target.name.includes("Badge") || target.name.includes("State=Default")) {
        if ("fills" in target && Array.isArray(target.fills) && target.fills.length > 0) {
          target.fills = [];
          clearedCount++;
        }
      }
    });
  });
  
  figma.notify(`✅ ${clearedCount}개의 레이어 배경색(Fill) 찌꺼기를 날리고 공식 Section 2개를 생성했습니다.`);
}
