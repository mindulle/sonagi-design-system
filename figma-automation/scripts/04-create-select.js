/**
 * 04-create-select.js
 * Select (Dropdown Trigger) 컴포넌트 세트를 생성합니다.
 * 우측에 순수 Vector로 그린 Chevron-down 아이콘이 삽입됩니다.
 */
async function createSelectComponent() {
  console.log("🚀 Select 컴포넌트 세트 생성을 시작합니다...");

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && v.name === name);

  const tokens = {
    text: { primary: getVar("text/primary"), muted: getVar("text/muted"), disabled: getVar("text/disabled") },
    bg: { base: getVar("bg/base"), surface: getVar("bg/surface") },
    border: { default: getVar("border/default"), strong: getVar("border/strong") },
    brand: { primary: getVar("brand/primary") },
    state: { danger: getVar("state/danger") }
  };

  const bindColor = (variable) => {
    return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);
  };

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

  let page = figma.root.children.find(p => p.name === "Select");
  if (!page) { 
    page = figma.createPage(); 
    page.name = "Select"; 
  }
  await figma.setCurrentPageAsync(page);

  const sizes = ["Lg", "Md", "Sm"];
  const heights = { "Lg": 48, "Md": 40, "Sm": 32 }; // Input과 동일한 높이
  const states = ["Default", "Hover", "Focused", "Danger", "Disabled"];
  const components = [];
  let yOffset = 0;

  for (const size of sizes) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Size=${size}, State=${state}`;
      comp.layoutMode = "VERTICAL";
      comp.primaryAxisSizingMode = "AUTO";
      comp.counterAxisSizingMode = "FIXED";
      comp.resize(320, comp.height);
      comp.itemSpacing = 6;

      // 1. Label
      const label = figma.createText();
      label.name = "Label"; 
      label.characters = "Select an option";
      label.fontName = { family: "Inter", style: "Medium" };
      label.fontSize = size === "Lg" ? 14 : size === "Md" ? 14 : 12;
      
      let labelVar = (state === "Disabled") ? tokens.text.disabled : tokens.text.primary;
      if (labelVar) label.fills = [bindColor(labelVar)];
      comp.appendChild(label);

      // 2. Field
      const field = figma.createFrame();
      field.name = "Field";
      field.layoutMode = "HORIZONTAL";
      field.primaryAxisSizingMode = "FIXED"; 
      field.counterAxisSizingMode = "FIXED";
      field.primaryAxisAlignItems = "MIN"; 
      field.counterAxisAlignItems = "CENTER"; // 수직 중앙 정렬
      field.paddingLeft = 12; 
      field.paddingRight = 12;
      field.itemSpacing = 8;
      field.resize(320, heights[size]); 
      field.cornerRadius = 6;

      let fillVar = tokens.bg.surface, strokeVar = tokens.border.default, strokeWeight = 1;
      if (state === "Hover") strokeVar = tokens.border.strong;
      if (state === "Focused") { strokeVar = tokens.brand.primary; strokeWeight = 2; }
      if (state === "Danger") { strokeVar = tokens.state.danger; strokeWeight = 2; }
      if (state === "Disabled") { fillVar = tokens.bg.surface; strokeVar = null; }

      if (fillVar) field.fills = [bindColor(fillVar)];
      if (strokeVar) { 
        field.strokes = [bindColor(strokeVar)]; 
        field.strokeWeight = strokeWeight; 
      } else { 
        field.strokes = []; 
      }

      // 3. Value
      const value = figma.createText();
      value.name = "Value"; 
      value.characters = "Choose option...";
      value.fontName = { family: "Inter", style: "Regular" };
      value.fontSize = size === "Sm" ? 12 : 14;
      value.layoutGrow = 1; // 아이콘을 우측으로 밀어내기 위해 공간 차지
      
      let valueVar = (state === "Disabled") ? tokens.text.disabled : tokens.text.muted;
      if (valueVar) value.fills = [bindColor(valueVar)];
      field.appendChild(value); 

      // 4. Chevron Icon (순수 벡터 드로잉)
      const icon = figma.createVector();
      icon.name = "Chevron Down";
      // 20x20 뷰박스 기준의 꺾쇠 모양
      icon.vectorPaths = [{
        windingRule: "NONE",
        data: "M 5 8 L 10 13 L 15 8"
      }];
      let iconColorVar = (state === "Disabled") ? tokens.text.disabled : tokens.text.muted;
      if (iconColorVar) {
        icon.strokes = [bindColor(iconColorVar)];
        icon.strokeWeight = 1.5;
        icon.strokeCap = "ROUND";
        icon.strokeJoin = "ROUND";
      }
      icon.resize(20, 20);
      field.appendChild(icon);

      comp.appendChild(field);

      // 5. Hint
      const hint = figma.createText();
      hint.name = "Hint"; 
      hint.characters = state === "Danger" ? "Please select a valid option." : "Select from the list.";
      hint.fontName = { family: "Inter", style: "Regular" }; 
      hint.fontSize = 12;
      
      let hintVar = (state === "Danger") ? tokens.state.danger : ((state === "Disabled") ? tokens.text.disabled : tokens.text.muted);
      if (hintVar) hint.fills = [bindColor(hintVar)];
      comp.appendChild(hint);

      comp.x = xOffset; 
      comp.y = yOffset; 
      components.push(comp);
      xOffset += 380;
    }
    yOffset += 160;
  }

  // 매트릭스 포장
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Select"; 
  componentSet.x = 100; 
  componentSet.y = 100;
  componentSet.fills = []; 
  componentSet.paddingTop = 40; 
  componentSet.paddingRight = 40; 
  componentSet.paddingBottom = 40; 
  componentSet.paddingLeft = 40;
  
  figma.viewport.scrollAndZoomIntoView([componentSet]);
  console.log("🎉 Select 컴포넌트 세트 생성이 완료되었습니다!");
}
createSelectComponent();
