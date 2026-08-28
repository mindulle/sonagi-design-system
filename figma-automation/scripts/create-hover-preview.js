async function createHoverPreviewComponent() {
  const fontObj = { family: "Pretendard", style: "SemiBold" };
  const fontReg = { family: "Pretendard", style: "Regular" };
  try {
    await figma.loadFontAsync(fontObj); await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontObj.family = "Inter"; fontReg.family = "Inter";
    await figma.loadFontAsync(fontObj); await figma.loadFontAsync(fontReg);
  }

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    bgElevated: getV("background/bg-elevated") || getV("background/bg-surface"),
    txtPri: getV("text/text-primary"),
    txtSec: getV("text/text-secondary"),
    
    // ✨ 하드코딩 제거! 시맨틱 bg-inverse 완벽 연동
    bgTooltip: getV("background/bg-inverse"), 
    txtTooltip: getV("text/text-inverse"),
    borderSubtle: getV("border/border-subtle"),
    
    radTooltip: getF("radius/sm"), 
    radPopover: getF("radius/lg"), 
    padTooltipX: getF("space/container/sm") || getF("space/element/px"), 
    padTooltipY: getF("space/element/py"), 
    padPopover: getF("space/container/md") || getF("space/gap/group") 
  };

  const variants = [];

  const tooltip = figma.createComponent();
  tooltip.name = "Type=Simple Tooltip";
  tooltip.layoutMode = "HORIZONTAL";
  tooltip.primaryAxisSizingMode = "AUTO"; 
  tooltip.counterAxisSizingMode = "AUTO";
  
  if (v.padTooltipX) { tooltip.setBoundVariable("paddingLeft", v.padTooltipX); tooltip.setBoundVariable("paddingRight", v.padTooltipX); }
  else { tooltip.paddingLeft = 12; tooltip.paddingRight = 12; }
  
  if (v.padTooltipY) { tooltip.setBoundVariable("paddingTop", v.padTooltipY); tooltip.setBoundVariable("paddingBottom", v.padTooltipY); }
  else { tooltip.paddingTop = 8; tooltip.paddingBottom = 8; }
  
  if (v.radTooltip) { tooltip.setBoundVariable("topLeftRadius", v.radTooltip); tooltip.setBoundVariable("topRightRadius", v.radTooltip); tooltip.setBoundVariable("bottomLeftRadius", v.radTooltip); tooltip.setBoundVariable("bottomRightRadius", v.radTooltip); }
  else tooltip.cornerRadius = 6;

  if (v.bgTooltip) tooltip.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.bgTooltip)];
  if (v.borderSubtle) {
    tooltip.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.borderSubtle)];
    tooltip.strokeWeight = 1; tooltip.strokeAlign = "INSIDE";
  }
  
  tooltip.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.2}, offset: {x:0, y:4}, radius: 8, spread: 0, visible: true, blendMode: "NORMAL" }];
  
  const ttText = figma.createText();
  ttText.fontName = fontObj; ttText.characters = "Quick helper text"; ttText.fontSize = 13;
  if (v.txtTooltip) ttText.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtTooltip)];
  tooltip.appendChild(ttText);
  variants.push(tooltip);

  const popover = figma.createComponent();
  popover.name = "Type=Rich Popover";
  popover.layoutMode = "VERTICAL";
  popover.primaryAxisSizingMode = "AUTO"; 
  popover.counterAxisSizingMode = "FIXED";
  popover.resize(280, popover.height); 
  popover.itemSpacing = 8;
  
  if (v.padPopover) { popover.setBoundVariable("paddingLeft", v.padPopover); popover.setBoundVariable("paddingRight", v.padPopover); popover.setBoundVariable("paddingTop", v.padPopover); popover.setBoundVariable("paddingBottom", v.padPopover); }
  else { popover.paddingLeft = 16; popover.paddingRight = 16; popover.paddingTop = 16; popover.paddingBottom = 16; }
  
  if (v.radPopover) { popover.setBoundVariable("topLeftRadius", v.radPopover); popover.setBoundVariable("topRightRadius", v.radPopover); popover.setBoundVariable("bottomLeftRadius", v.radPopover); popover.setBoundVariable("bottomRightRadius", v.radPopover); }
  else popover.cornerRadius = 16;

  if (v.bgElevated) popover.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v.bgElevated)];
  if (v.borderSubtle) {
    popover.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.borderSubtle)];
    popover.strokeWeight = 1; popover.strokeAlign = "INSIDE";
  }
  
  popover.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.12}, offset: {x:0, y:8}, radius: 24, spread: 0, visible: true, blendMode: "NORMAL" }];

  const poTitle = figma.createText();
  poTitle.fontName = fontObj; poTitle.characters = "Detailed Preview"; poTitle.fontSize = 15;
  if (v.txtPri) poTitle.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtPri)];
  popover.appendChild(poTitle);

  const poDesc = figma.createText();
  poDesc.fontName = fontReg; 
  poDesc.characters = "This rich popover provides additional context when a user hovers over an interactive element. It supports wrapping text."; 
  poDesc.fontSize = 14;
  poDesc.layoutAlign = "STRETCH"; 
  if (v.txtSec) poDesc.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v.txtSec)];
  popover.appendChild(poDesc);

  variants.push(popover);

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "HoverPreview";
  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 40;
  compSet.paddingLeft = 40; compSet.paddingRight = 40;
  compSet.paddingTop = 40; compSet.paddingBottom = 40;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ HoverPreview (툴팁 & 팝오버) 시맨틱 토큰 연동 버전 생성 완료!");
}
createHoverPreviewComponent();