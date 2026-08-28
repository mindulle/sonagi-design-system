async function createTableOfContentsComponent() {
  const fontObj = { family: "Pretendard", style: "Medium" };
  const fontReg = { family: "Pretendard", style: "Regular" };
  try {
    await figma.loadFontAsync(fontObj); await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontObj.family = "Inter"; fontReg.family = "Inter";
    await figma.loadFontAsync(fontObj); await figma.loadFontAsync(fontReg);
  }

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const getV = name => colors.find(v => v.name === name);

  const v = {
    txtDef: getV("text/text-secondary"),  
    txtHov: getV("text/text-primary"),    
    txtAct: getV("brand/brand-primary"),  
    
    borderDef: getV("border/border-subtle") || getV("border/border-default"), 
    borderAct: getV("brand/brand-primary") 
  };

  const variants = [];
  const levels = ["H2", "H3"]; 
  const states = ["Default", "Hover", "Active"]; 

  for (const level of levels) {
    for (const state of states) {
      const item = figma.createComponent();
      item.name = `Level=${level}, State=${state}`;
      
      item.layoutMode = "HORIZONTAL";
      item.primaryAxisAlignItems = "MIN";
      item.counterAxisAlignItems = "CENTER";
      item.primaryAxisSizingMode = "FIXED"; 
      item.counterAxisSizingMode = "AUTO";
      item.resize(200, 32); 

      item.strokeLeftWeight = 2; 
      item.strokeTopWeight = 0; item.strokeRightWeight = 0; item.strokeBottomWeight = 0;

      if (state === "Active") {
        if (v.borderAct) item.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.borderAct)];
      } else {
        if (v.borderDef) item.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.borderDef)];
      }

      item.paddingTop = 6; item.paddingBottom = 6;
      item.paddingRight = 16;
      if (level === "H2") {
        item.paddingLeft = 16; 
      } else if (level === "H3") {
        item.paddingLeft = 32; 
      }

      const textNode = figma.createText();
      textNode.fontName = state === "Active" ? fontObj : fontReg; 
      textNode.characters = level === "H2" ? "Section Title" : "Sub-section item";
      textNode.fontSize = 14;
      textNode.layoutAlign = "STRETCH"; 
      textNode.layoutGrow = 1; 

      let txtColor = v.txtDef;
      if (state === "Hover") txtColor = v.txtHov;
      else if (state === "Active") txtColor = v.txtAct;
      
      if (txtColor) textNode.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtColor)];

      item.appendChild(textNode);
      variants.push(item);
    }
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "TableOfContents Item";
  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 24;
  compSet.paddingLeft = 32; compSet.paddingRight = 32;
  compSet.paddingTop = 32; compSet.paddingBottom = 32;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  const example = figma.createFrame();
  example.name = "TableOfContents (Example)";
  example.layoutMode = "VERTICAL";
  example.itemSpacing = 0; 
  example.fills = [];
  
  const title = figma.createText(); title.fontName = fontObj; title.characters = "On this page"; title.fontSize = 15;
  if (v.txtPri) title.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
  const titleWrap = figma.createFrame(); titleWrap.layoutMode="HORIZONTAL"; titleWrap.paddingBottom=12; titleWrap.paddingLeft=16; titleWrap.fills=[]; titleWrap.appendChild(title);
  example.appendChild(titleWrap);

  const i1 = variants[0].createInstance(); 
  const i2 = variants[5].createInstance(); 
  const i3 = variants[3].createInstance(); 
  const i4 = variants[0].createInstance(); 
  i1.children[0].characters = "Getting Started";
  i2.children[0].characters = "Installation";
  i3.children[0].characters = "Configuration";
  i4.children[0].characters = "API Reference";
  
  example.appendChild(i1); example.appendChild(i2); example.appendChild(i3); example.appendChild(i4);
  
  example.x = compSet.x + compSet.width + 80;
  example.y = compSet.y;

  figma.currentPage.appendChild(example);
  figma.viewport.scrollAndZoomIntoView([compSet, example]);
  figma.currentPage.selection = [compSet];

  console.log("✅ TableOfContents (목차) 아이템 마스터 및 예시 렌더링 완료!");
}
createTableOfContentsComponent();