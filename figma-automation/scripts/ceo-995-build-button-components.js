(async () => {
  // 폰트 로드 (텍스트 레이어 생성을 위해 필수)
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

  const types = ["Primary", "Secondary", "Danger"];
  const states = ["Default", "Hover", "Active", "Disabled"];

  const components = [];

  console.log("🚀 오토레이아웃과 프로퍼티가 완벽히 적용된 Button 컴포넌트 셋을 생성합니다...");

  for (const type of types) {
    for (const state of states) {
      // 1. 개별 컴포넌트 생성 (1층위)
      const btn = figma.createComponent();
      
      // Figma Variant 명명 규칙: "Property1=Value, Property2=Value"
      btn.name = `Type=${type}, State=${state}`;
      
      // 2. 완벽한 오토레이아웃 규칙 적용
      btn.layoutMode = "HORIZONTAL";
      btn.paddingLeft = 16; btn.paddingRight = 16;
      btn.paddingTop = 12; btn.paddingBottom = 12;
      btn.itemSpacing = 8;
      btn.cornerRadius = 8;
      btn.primaryAxisSizingMode = "AUTO"; // 가로 Hug contents
      btn.counterAxisSizingMode = "AUTO"; // 세로 Hug contents
      
      // 3. 임시 시각적 색상 지정 (변수 바인딩 전 구분용)
      let bgColor = {r: 0.9, g: 0.9, b: 0.9};
      let textColor = {r: 0.1, g: 0.1, b: 0.1};
      
      if (type === "Primary") {
        bgColor = state === "Hover" ? {r:0.15, g:0.35, b:0.85} : state === "Active" ? {r:0.1, g:0.25, b:0.7} : state === "Disabled" ? {r:0.9, g:0.9, b:0.95} : {r:0.2, g:0.5, b:1};
        textColor = state === "Disabled" ? {r:0.6, g:0.6, b:0.6} : {r:1, g:1, b:1};
      } else if (type === "Secondary") {
         bgColor = state === "Hover" ? {r:0.8, g:0.8, b:0.8} : state === "Active" ? {r:0.7, g:0.7, b:0.7} : state === "Disabled" ? {r:0.95, g:0.95, b:0.95} : {r:0.9, g:0.9, b:0.9};
      } else if (type === "Danger") {
         bgColor = state === "Hover" ? {r:0.8, g:0.15, b:0.15} : state === "Active" ? {r:0.65, g:0.1, b:0.1} : state === "Disabled" ? {r:0.95, g:0.9, b:0.9} : {r:0.9, g:0.2, b:0.2};
         textColor = state === "Disabled" ? {r:0.6, g:0.6, b:0.6} : {r:1, g:1, b:1};
      }

      btn.fills = [{ type: 'SOLID', color: bgColor }];
      
      // 4. 텍스트 레이어 추가
      const text = figma.createText();
      text.characters = "Button";
      text.fontSize = 16;
      text.fontName = { family: "Inter", style: "Medium" };
      text.fills = [{ type: 'SOLID', color: textColor }];
      
      btn.appendChild(text);
      components.push(btn);
    }
  }

  // 5. 12개의 컴포넌트를 하나로 묶어 Component Set (Variants) 생성
  const compSet = figma.combineAsVariants(components, figma.currentPage);
  compSet.name = "Button";
  
  // 6. 보라색 점선 박스(Component Set)의 2층위 레이아웃 정리
  compSet.layoutMode = "HORIZONTAL";
  compSet.layoutWrap = "WRAP"; // 행렬 배치
  compSet.itemSpacing = 24;
  compSet.counterAxisSpacing = 24;
  compSet.paddingTop = 40; compSet.paddingBottom = 40;
  compSet.paddingLeft = 40; compSet.paddingRight = 40;
  compSet.resize(600, compSet.height); // 4개씩 줄바꿈되도록 너비 강제 지정

  figma.viewport.scrollAndZoomIntoView([compSet]);
  console.log("🎉 완벽한 오토레이아웃과 12개 베리언트가 적용된 Button 컴포넌트 셋이 생성되었습니다!");
})();