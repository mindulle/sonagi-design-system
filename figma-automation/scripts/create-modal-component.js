async function createModalComponentSet() {
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
    pad: getF("space/container/lg") || getF("space/container/page"), 
    gapOuter: getF("space/gap/group"), 
    gapInner: getF("space/gap/sm"),    
    radModal: getF("radius/xl"),       
    
    bgElevated: getV("background/bg-elevated") || getV("background/bg-surface"),
    overlayBg: getV("gray/900") || getV("base/black"), 
    opacityOverlay: getF("opacity/overlay"), 
    
    txtPri: getV("text/text-primary"),
    txtSec: getV("text/text-secondary"),
    btnPriBg: getV("brand/brand-primary"),
    btnPriTxt: getV("text/text-inverse"),
    btnSecBg: getV("gray/200") || getV("background/bg-surface"),
    btnSecTxt: getV("text/text-primary"),
    
    padBtnX: getF("space/element/px"),
    padBtnY: getF("space/element/py"),
    radBtn: getF("radius/md")
  };

  const variants = [];
  const styles = ["Dialog Only", "With Overlay"]; 

  for (const style of styles) {
    const modalWrap = figma.createComponent();
    modalWrap.name = `Type=${style}`;
    
    if (style === "With Overlay") {
      modalWrap.resize(1024, 768); 
      modalWrap.layoutMode = "VERTICAL";
      modalWrap.primaryAxisAlignItems = "CENTER";
      modalWrap.counterAxisAlignItems = "CENTER";
      
      if (v.overlayBg) modalWrap.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.overlayBg)];
      if (v.opacityOverlay) modalWrap.setBoundVariable("opacity", v.opacityOverlay);
      else modalWrap.opacity = 0.6;
    } else {
      modalWrap.layoutMode = "VERTICAL";
      modalWrap.primaryAxisSizingMode = "AUTO"; 
      modalWrap.counterAxisSizingMode = "AUTO";
      modalWrap.fills = [];
    }

    const dialog = figma.createFrame();
    dialog.name = "Dialog Box";
    dialog.layoutMode = "VERTICAL";
    dialog.primaryAxisSizingMode = "AUTO"; 
    dialog.counterAxisSizingMode = "FIXED";
    dialog.resize(400, 200); 
    
    if (v.pad) { dialog.setBoundVariable("paddingLeft", v.pad); dialog.setBoundVariable("paddingRight", v.pad); dialog.setBoundVariable("paddingTop", v.pad); dialog.setBoundVariable("paddingBottom", v.pad); }
    else { dialog.paddingLeft = 24; dialog.paddingRight = 24; dialog.paddingTop = 24; dialog.paddingBottom = 24; }
    if (v.gapOuter) dialog.setBoundVariable("itemSpacing", v.gapOuter); else dialog.itemSpacing = 24;
    if (v.radModal) { dialog.setBoundVariable("topLeftRadius", v.radModal); dialog.setBoundVariable("topRightRadius", v.radModal); dialog.setBoundVariable("bottomLeftRadius", v.radModal); dialog.setBoundVariable("bottomRightRadius", v.radModal); }
    else dialog.cornerRadius = 24;

    if (v.bgElevated) dialog.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.bgElevated)];
    dialog.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.15}, offset: {x:0, y:12}, radius: 32, spread: 0, visible: true, blendMode: "NORMAL" }];

    // --- Header ---
    const header = figma.createFrame();
    header.name = "Modal Header"; 
    header.layoutMode = "HORIZONTAL";
    header.layoutAlign = "STRETCH"; 
    header.primaryAxisAlignItems = "SPACE_BETWEEN"; // 완벽한 좌우 정렬
    header.counterAxisAlignItems = "CENTER";        // 완벽한 세로 중앙 정렬
    header.fills = [];
    
    const title = figma.createText(); title.name = "Title";
    title.fontName = fontBold; title.characters = "Modal Title"; title.fontSize = 20;
    if (v.txtPri) title.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
    
    const closeBtn = figma.createFrame();
    closeBtn.name = "Close Button";
    closeBtn.resize(24, 24); 
    closeBtn.layoutMode = "HORIZONTAL";
    closeBtn.primaryAxisAlignItems = "CENTER";
    closeBtn.counterAxisAlignItems = "CENTER";
    closeBtn.primaryAxisSizingMode = "FIXED";
    closeBtn.counterAxisSizingMode = "FIXED";
    closeBtn.fills = [];
    
    const xText = figma.createText();
    xText.fontName = { family: "Inter", style: "Medium" };
    xText.characters = "✕";
    xText.fontSize = 20;
    if (v.txtPri) xText.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
    closeBtn.appendChild(xText);
    
    header.appendChild(title); header.appendChild(closeBtn);
    dialog.appendChild(header);

    // --- Body ---
    const bodyText = figma.createText();
    bodyText.name = "Body Text";
    bodyText.fontName = fontReg; 
    bodyText.characters = "Are you sure you want to proceed with this action? This operation cannot be undone and will permanently delete the selected items."; 
    bodyText.fontSize = 15;
    bodyText.layoutAlign = "STRETCH"; 
    if (v.txtSec) bodyText.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtSec)];
    dialog.appendChild(bodyText);

    // --- Footer ---
    const footer = figma.createFrame();
    footer.name = "Modal Footer"; footer.layoutMode = "HORIZONTAL";
    footer.layoutAlign = "STRETCH"; footer.primaryAxisAlignItems = "MAX"; 
    if (v.gapInner) footer.setBoundVariable("itemSpacing", v.gapInner); else footer.itemSpacing = 8;
    footer.fills = [];

    const createBtn = (name, bg, txtColor) => {
      const btn = figma.createFrame();
      btn.name = name; btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisSizingMode = "AUTO"; btn.counterAxisSizingMode = "AUTO"; 
      if (v.padBtnX) { btn.setBoundVariable("paddingLeft", v.padBtnX); btn.setBoundVariable("paddingRight", v.padBtnX); }
      if (v.padBtnY) { btn.setBoundVariable("paddingTop", v.padBtnY); btn.setBoundVariable("paddingBottom", v.padBtnY); }
      if (v.radBtn) { btn.setBoundVariable("topLeftRadius", v.radBtn); btn.setBoundVariable("topRightRadius", v.radBtn); btn.setBoundVariable("bottomLeftRadius", v.radBtn); btn.setBoundVariable("bottomRightRadius", v.radBtn); }
      
      if (bg) btn.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bg)];
      const txt = figma.createText(); txt.fontName = fontObj; txt.characters = name; txt.fontSize = 15;
      if (txtColor) txt.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtColor)];
      btn.appendChild(txt);
      return btn;
    };

    footer.appendChild(createBtn("Cancel", v.btnSecBg, v.btnSecTxt));
    footer.appendChild(createBtn("Confirm", v.btnPriBg, v.btnPriTxt));
    dialog.appendChild(footer);

    modalWrap.appendChild(dialog);
    variants.push(modalWrap);
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Modal";
  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 80;
  compSet.paddingLeft = 80; compSet.paddingRight = 80;
  compSet.paddingTop = 80; compSet.paddingBottom = 80;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 24;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ 정렬과 아이콘이 완벽하게 교정된 Modal 마스터 스크립트 실행 완료!");
}
createModalComponentSet();