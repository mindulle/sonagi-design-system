async function createCheckboxComponentSet() {
  const fontObj = { family: "Pretendard", style: "Medium" };
  await figma.loadFontAsync(fontObj).catch(async () => {
    fontObj.family = "Inter";
    await figma.loadFontAsync(fontObj);
  });

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    rad: getF("radius/sm"), 
    gap: getF("space/gap/sm"), 
    
    borderDef: getV("border/border-default"),
    borderHov: getV("border/border-subtle") || getV("gray/500"),
    bgBase: getV("background/bg-surface"),
    
    bgChecked: getV("brand/brand-primary"),
    bgCheckedHov: getV("brand/brand-primary-hover"),
    iconColor: getV("text/text-inverse"), 
    
    txtPrimary: getV("text/text-primary"),
    disBg: getV("state/state-disabled-bg"),
    disTxt: getV("state/state-disabled-text")
  };

  function createCheckMark(colorVar) {
    const mark = figma.createFrame();
    mark.name = "Check Icon";
    mark.resize(14, 14); 
    mark.fills = [];
    
    const line1 = figma.createLine();
    line1.resize(5, 0); line1.rotation = 45;
    line1.x = 2; line1.y = 7;
    
    const line2 = figma.createLine();
    line2.resize(8, 0); line2.rotation = -45;
    line2.x = 5; line2.y = 10.5;

    if (colorVar) {
      const strokeColor = figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', colorVar);
      line1.strokes = [strokeColor]; line2.strokes = [strokeColor];
    } else {
      line1.strokes = [{type:'SOLID', color:{r:1,g:1,b:1}}]; 
      line2.strokes = [{type:'SOLID', color:{r:1,g:1,b:1}}];
    }
    
    line1.strokeWeight = 2; line2.strokeWeight = 2;
    line1.strokeCap = "ROUND"; line2.strokeCap = "ROUND";
    
    mark.appendChild(line1);
    mark.appendChild(line2);
    return mark;
  }

  const variants = [];
  const checkedStates = ["False", "True"];
  const interactionStates = ["Default", "Hover", "Disabled"];

  for (const isChecked of checkedStates) {
    for (const state of interactionStates) {
      const cb = figma.createComponent();
      cb.name = `Checked=${isChecked}, State=${state}`;
      
      cb.layoutMode = "HORIZONTAL";
      cb.primaryAxisAlignItems = "MIN";
      cb.counterAxisAlignItems = "CENTER";
      cb.primaryAxisSizingMode = "AUTO"; 
      cb.counterAxisSizingMode = "AUTO";
      
      if (v.gap) cb.setBoundVariable("itemSpacing", v.gap);
      else cb.itemSpacing = 8;

      const box = figma.createFrame();
      box.name = "Box";
      box.resize(20, 20);
      box.layoutMode = "VERTICAL";
      box.primaryAxisAlignItems = "CENTER";
      box.counterAxisAlignItems = "CENTER";
      
      if (v.rad) { box.setBoundVariable("topLeftRadius", v.rad); box.setBoundVariable("topRightRadius", v.rad); box.setBoundVariable("bottomLeftRadius", v.rad); box.setBoundVariable("bottomRightRadius", v.rad); }
      else { box.cornerRadius = 4; }

      let bgColor, borderColor, iconColor;

      if (state === "Disabled") {
        bgColor = v.disBg;
        borderColor = isChecked === "True" ? null : v.disTxt; 
        iconColor = isChecked === "True" ? v.disTxt : null; 
      } 
      else if (isChecked === "True") {
        bgColor = state === "Hover" ? v.bgCheckedHov : v.bgChecked;
        borderColor = null; 
        iconColor = v.iconColor; 
      } 
      else { 
        bgColor = v.bgBase; 
        borderColor = state === "Hover" ? v.borderHov : v.borderDef;
        iconColor = null;
      }

      if (bgColor) box.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bgColor)];
      else box.fills = [];

      if (borderColor) {
        box.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', borderColor)];
        box.strokeWeight = 1.5;
      } else {
        box.strokes = [];
      }

      if (iconColor) {
        box.appendChild(createCheckMark(iconColor));
      }

      cb.appendChild(box);

      const textNode = figma.createText();
      textNode.name = "Label";
      textNode.fontName = fontObj;
      textNode.characters = "Checkbox Label"; 
      textNode.fontSize = 15; 
      
      const txtColor = state === "Disabled" ? v.disTxt : v.txtPrimary;
      if (txtColor) textNode.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtColor)];
      
      cb.appendChild(textNode);
      variants.push(cb);
    }
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Checkbox";
  compSet.layoutMode = "NONE";
  
  const cols = 3; 
  const colWidth = 200;
  const rowHeight = 60;
  const padding = 40;

  variants.forEach((v, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    v.x = padding + (col * colWidth);
    v.y = padding + (row * rowHeight);
  });

  compSet.resize((cols * colWidth) + (padding * 2), (2 * rowHeight) + (padding * 2));
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ Checkbox 컴포넌트 셋 생성 완료!");
}

createCheckboxComponentSet();