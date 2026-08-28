async function createMasterButtonComponentSet() {
  const fontObj = { family: "Pretendard", style: "SemiBold" };
  await figma.loadFontAsync(fontObj).catch(async () => {
    fontObj.family = "Inter";
    await figma.loadFontAsync(fontObj);
  });

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    px: getF("space/element/px"), py: getF("space/element/py"),
    rad: getF("radius/md"), gap: getF("space/gap/xs"),
    
    pri: getV("brand/brand-primary"), priH: getV("brand/brand-primary-hover"), priA: getV("brand/brand-primary-active"),
    sec: getV("brand/brand-secondary"), secH: getV("brand/brand-secondary-hover"), secA: getV("brand/brand-secondary-active"),
    
    dan: getV("state/state-danger"), danH: getV("state/state-danger-hover"), danA: getV("state/state-danger-active"),
    txtBrand: getV("text/text-brand"), txtDan: getV("text/text-danger"),
    
    disBg: getV("state/state-disabled-bg"), disTxt: getV("state/state-disabled-text"),
    txtInv: getV("text/text-inverse"), txtPri: getV("text/text-primary"),
    borderDef: getV("border/border-default")
  };

  function createIcon(colorVar) {
    const icon = figma.createFrame();
    icon.resize(16, 16);
    icon.cornerRadius = 8;
    if (colorVar) {
      icon.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', colorVar)];
    } else {
      icon.fills = [{type:'SOLID', color:{r:0,g:0,b:0}, opacity: 0.5}];
    }
    return icon;
  }

  function getVariantColors(h, st, style) {
    let bg, txt, border;
    if (st === "Disabled") {
      return { 
        bg: style === "Solid" ? v.disBg : null, 
        txt: v.disTxt, 
        border: style === "Outline" ? v.disTxt : null 
      };
    }
    if (h === "Primary") {
      bg = st==="Default"?v.pri : st==="Hover"?v.priH : v.priA;
      txt = style==="Solid"?v.txtInv : v.txtBrand;
      border = style==="Outline"?bg : null;
    } else if (h === "Secondary") {
      bg = st==="Default"?v.sec : st==="Hover"?v.secH : v.secA;
      txt = v.txtPri;
      border = style==="Outline"?v.borderDef : null;
    } else if (h === "Danger") {
      bg = st==="Default"?v.dan : st==="Hover"?v.danH : v.danA;
      txt = style==="Solid"?v.txtInv : v.txtDan;
      border = style==="Outline"?bg : null;
    }
    if (style === "Outline") bg = null;
    return {bg, txt, border};
  }

  const variants = [];
  const hierarchies = ["Primary", "Secondary", "Danger"];
  const styles = ["Solid", "Outline"];
  const states = ["Default", "Hover", "Active", "Disabled"];

  for (const h of hierarchies) {
    for (const style of styles) {
      for (const state of states) {
         const btn = figma.createComponent();
         btn.name = `Hierarchy=${h}, Style=${style}, State=${state}`;
         
         btn.layoutMode = "HORIZONTAL";
         btn.primaryAxisAlignItems = "CENTER";
         btn.counterAxisAlignItems = "CENTER";
         btn.primaryAxisSizingMode = "AUTO"; 
         btn.counterAxisSizingMode = "AUTO";

         if (v.px) { btn.setBoundVariable("paddingLeft", v.px); btn.setBoundVariable("paddingRight", v.px); }
         if (v.py) { btn.setBoundVariable("paddingTop", v.py); btn.setBoundVariable("paddingBottom", v.py); }
         if (v.gap) btn.setBoundVariable("itemSpacing", v.gap);
         if (v.rad) { btn.setBoundVariable("topLeftRadius", v.rad); btn.setBoundVariable("topRightRadius", v.rad); btn.setBoundVariable("bottomLeftRadius", v.rad); btn.setBoundVariable("bottomRightRadius", v.rad); }

         const {bg, txt, border} = getVariantColors(h, state, style);

         if (bg) btn.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bg)];
         if (border) {
            btn.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', border)];
            btn.strokeWeight = 1.5;
         }

         const lIcon = createIcon(txt);
         lIcon.name = "Icon / Left";
         btn.appendChild(lIcon);

         const textNode = figma.createText();
         textNode.name = "Text";
         textNode.fontName = fontObj;
         textNode.characters = "Button";
         textNode.fontSize = 16;
         if (txt) textNode.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txt)];
         btn.appendChild(textNode);

         const rIcon = createIcon(txt);
         rIcon.name = "Icon / Right";
         btn.appendChild(rIcon);

         variants.push(btn);
      }
    }
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Button (Master)";
  
  const leftIconProp = compSet.addComponentProperty("Left Icon", "BOOLEAN", true);
  const rightIconProp = compSet.addComponentProperty("Right Icon", "BOOLEAN", false);
  
  variants.forEach(v => {
     const l = v.children.find(c => c.name === "Icon / Left");
     const r = v.children.find(c => c.name === "Icon / Right");
     l.componentPropertyReferences = { visible: leftIconProp };
     r.componentPropertyReferences = { visible: rightIconProp };
     r.visible = false; 
  });

  compSet.layoutMode = "NONE";
  const cols = 4;
  const colWidth = 160;
  const rowHeight = 80;
  const padding = 40;

  variants.forEach((v, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    v.x = padding + (col * colWidth);
    v.y = padding + (row * rowHeight);
  });

  compSet.resize((cols * colWidth) + (padding * 2), ((hierarchies.length * styles.length) * rowHeight) + (padding * 2));
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ [마스터 버튼] 구축 완료!");
}
createMasterButtonComponentSet();