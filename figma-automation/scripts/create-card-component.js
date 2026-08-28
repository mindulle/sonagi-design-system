async function createCardComponentSet() {
  const fontObj = { family: "Pretendard", style: "SemiBold" };
  const fontReg = { family: "Pretendard", style: "Regular" };
  const fontBold = { family: "Pretendard", style: "Bold" };
  
  try {
    await figma.loadFontAsync(fontObj);
    await figma.loadFontAsync(fontReg);
    await figma.loadFontAsync(fontBold);
  } catch (e) {
    fontObj.family = "Inter"; fontReg.family = "Inter"; fontBold.family = "Inter";
    await figma.loadFontAsync(fontObj);
    await figma.loadFontAsync(fontReg);
    await figma.loadFontAsync(fontBold);
  }

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    pad: getF("space/container/lg") || getF("space/gap/group"), 
    gapOuter: getF("space/gap/item"), 
    gapInner: getF("space/gap/xs"),   
    radCard: getF("radius/lg") || getF("radius/xl"), 
    radBtn: getF("radius/md"), 
    
    bgElevated: getV("background/bg-elevated") || getV("background/bg-surface"),
    bgBase: getV("background/bg-base"),
    borderSubtle: getV("border/border-subtle"),
    
    txtPri: getV("text/text-primary"),
    txtSec: getV("text/text-secondary"),
    
    imgBg: getV("gray/200") || getV("border/border-subtle"),
    btnPriBg: getV("brand/brand-primary"),
    btnPriTxt: getV("text/text-inverse"),
    btnSecBg: getV("brand/brand-secondary") || getV("gray/100"),
    btnSecTxt: getV("text/text-primary")
  };

  const styles = ["Elevated", "Outlined"];
  const variants = [];

  for (const style of styles) {
    const card = figma.createComponent();
    card.name = `Style=${style}`;
    card.layoutMode = "VERTICAL";
    card.fills = [];
    card.primaryAxisSizingMode = "AUTO"; 
    card.counterAxisSizingMode = "FIXED";
    card.resize(340, card.height); 
    
    if (v.radCard) { card.setBoundVariable("topLeftRadius", v.radCard); card.setBoundVariable("topRightRadius", v.radCard); card.setBoundVariable("bottomLeftRadius", v.radCard); card.setBoundVariable("bottomRightRadius", v.radCard); }
    else card.cornerRadius = 16;
    
    card.itemSpacing = 0; 

    if (style === "Elevated") {
      if (v.bgElevated) card.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.bgElevated)];
      card.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.08}, offset: {x:0, y:8}, radius: 24, spread: 0, visible: true, blendMode: "NORMAL" }];
    } else {
      if (v.bgBase) card.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.bgBase)];
      if (v.borderSubtle) {
        card.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.borderSubtle)];
        card.strokeWeight = 1;
      }
    }

    const media = figma.createFrame();
    media.name = "Media Image";
    media.layoutMode = "NONE";
    media.layoutAlign = "STRETCH"; 
    media.resize(340, 180);
    if (v.imgBg) media.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.imgBg)];
    card.appendChild(media);

    const contentBox = figma.createFrame();
    contentBox.name = "Content Box";
    contentBox.layoutMode = "VERTICAL";
    contentBox.layoutAlign = "STRETCH";
    contentBox.primaryAxisSizingMode = "AUTO";
    if (v.pad) { contentBox.setBoundVariable("paddingLeft", v.pad); contentBox.setBoundVariable("paddingRight", v.pad); contentBox.setBoundVariable("paddingTop", v.pad); contentBox.setBoundVariable("paddingBottom", v.pad); }
    else { contentBox.paddingLeft = 24; contentBox.paddingRight = 24; contentBox.paddingTop = 24; contentBox.paddingBottom = 24; }
    if (v.gapOuter) contentBox.setBoundVariable("itemSpacing", v.gapOuter); else contentBox.itemSpacing = 16;
    contentBox.fills = [];

    const header = figma.createFrame();
    header.name = "Header";
    header.layoutMode = "VERTICAL";
    header.layoutAlign = "STRETCH";
    header.primaryAxisSizingMode = "AUTO";
    if (v.gapInner) header.setBoundVariable("itemSpacing", v.gapInner); else header.itemSpacing = 4;
    header.fills = [];

    const title = figma.createText(); title.name = "Title";
    title.fontName = fontBold; title.characters = "Card Title"; title.fontSize = 20;
    if (v.txtPri) title.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
    
    const subtitle = figma.createText(); subtitle.name = "Subtitle";
    subtitle.fontName = fontReg; subtitle.characters = "Secondary text for subtitle"; subtitle.fontSize = 14;
    if (v.txtSec) subtitle.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtSec)];
    
    header.appendChild(title); header.appendChild(subtitle);
    contentBox.appendChild(header);

    const body = figma.createText();
    body.name = "Body Text";
    body.fontName = fontReg; 
    body.characters = "This is the primary body text of the card component. It supports multi-line wrapping out of the box based on the card width."; 
    body.fontSize = 15;
    body.layoutAlign = "STRETCH"; 
    if (v.txtPri) body.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
    contentBox.appendChild(body);

    const footer = figma.createFrame();
    footer.name = "Footer Actions";
    footer.layoutMode = "HORIZONTAL";
    footer.layoutAlign = "STRETCH";
    footer.primaryAxisSizingMode = "AUTO";
    if (v.gapOuter) footer.setBoundVariable("itemSpacing", v.gapOuter); else footer.itemSpacing = 16;
    footer.fills = [];

    const createDummyBtn = (name, bg, txtColor) => {
      const btn = figma.createFrame();
      btn.name = name; btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisAlignItems = "CENTER"; btn.counterAxisAlignItems = "CENTER";
      btn.layoutGrow = 1; 
      btn.resize(100, 40);
      if (v.radBtn) { btn.setBoundVariable("topLeftRadius", v.radBtn); btn.setBoundVariable("topRightRadius", v.radBtn); btn.setBoundVariable("bottomLeftRadius", v.radBtn); btn.setBoundVariable("bottomRightRadius", v.radBtn); }
      if (bg) btn.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bg)];
      const txt = figma.createText(); txt.fontName = fontObj; txt.characters = name; txt.fontSize = 14;
      if (txtColor) txt.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtColor)];
      btn.appendChild(txt);
      return btn;
    };

    footer.appendChild(createDummyBtn("Secondary", v.btnSecBg, v.btnSecTxt));
    footer.appendChild(createDummyBtn("Primary", v.btnPriBg, v.btnPriTxt));
    contentBox.appendChild(footer);

    card.appendChild(contentBox);
    variants.push(card);
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Card";
  
  const showMedia = compSet.addComponentProperty("Show Media", "BOOLEAN", true);
  const showHeader = compSet.addComponentProperty("Show Header", "BOOLEAN", true);
  const showBody = compSet.addComponentProperty("Show Body Text", "BOOLEAN", true);
  const showFooter = compSet.addComponentProperty("Show Footer", "BOOLEAN", true);
  
  variants.forEach(v => {
     const media = v.children.find(c => c.name === "Media Image");
     const contentBox = v.children.find(c => c.name === "Content Box");
     const header = contentBox.children.find(c => c.name === "Header");
     const body = contentBox.children.find(c => c.name === "Body Text");
     const footer = contentBox.children.find(c => c.name === "Footer Actions");
     
     media.componentPropertyReferences = { visible: showMedia };
     header.componentPropertyReferences = { visible: showHeader };
     body.componentPropertyReferences = { visible: showBody };
     footer.componentPropertyReferences = { visible: showFooter };
  });

  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 40;
  compSet.paddingLeft = 40; compSet.paddingRight = 40;
  compSet.paddingTop = 40; compSet.paddingBottom = 40;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ 강력한 모듈형 Card 컴포넌트 셋 생성 완료!");
}

createCardComponentSet();