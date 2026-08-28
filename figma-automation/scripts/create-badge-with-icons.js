async function createBadgeWithIcons() {
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
    px: getF("space/element/py"),
    py: getF("space/gap/xs"),
    rad: getF("radius/full") || getF("radius/xl"), 
    gap: getF("space/gap/xs"),
    
    bgDefault: getV("background/bg-surface"),
    bgInfo: getV("state/state-info"),
    bgSuccess: getV("state/state-success"),
    bgWarning: getV("state/state-warning"),
    bgError: getV("state/state-error") || getV("state/state-danger"),
    
    txtDefault: getV("text/text-secondary"),
    txtInfo: getV("text/text-info"),       
    txtSuccess: getV("text/text-success"), 
    txtWarning: getV("text/text-warning"), 
    txtError: getV("text/text-danger")     
  };

  const intents = [
    { name: "Default", bg: v.bgDefault, txt: v.txtDefault },
    { name: "Info", bg: v.bgInfo, txt: v.txtInfo },
    { name: "Success", bg: v.bgSuccess, txt: v.txtSuccess },
    { name: "Warning", bg: v.bgWarning, txt: v.txtWarning },
    { name: "Error", bg: v.bgError, txt: v.txtError }
  ];

  function createIcon(colorVar) {
    const icon = figma.createFrame();
    icon.resize(12, 12);
    icon.cornerRadius = 6;
    if (colorVar) {
      icon.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', colorVar)];
    } else {
      icon.fills = [{type:'SOLID', color:{r:0,g:0,b:0}, opacity: 0.5}];
    }
    return icon;
  }

  const variants = [];

  for (const intent of intents) {
    const badge = figma.createComponent();
    badge.name = `Intent=${intent.name}`;
    
    badge.layoutMode = "HORIZONTAL";
    badge.primaryAxisAlignItems = "CENTER";
    badge.counterAxisAlignItems = "CENTER";
    badge.primaryAxisSizingMode = "AUTO"; 
    badge.counterAxisSizingMode = "AUTO";

    if (v.px) badge.setBoundVariable("paddingLeft", v.px); badge.setBoundVariable("paddingRight", v.px);
    if (v.py) badge.setBoundVariable("paddingTop", v.py); badge.setBoundVariable("paddingBottom", v.py);
    if (v.gap) badge.setBoundVariable("itemSpacing", v.gap);
    if (v.rad) { badge.setBoundVariable("topLeftRadius", v.rad); badge.setBoundVariable("topRightRadius", v.rad); badge.setBoundVariable("bottomLeftRadius", v.rad); badge.setBoundVariable("bottomRightRadius", v.rad); }

    if (intent.bg) {
      badge.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', intent.bg)];
    }

    const lIcon = createIcon(intent.txt);
    lIcon.name = "Icon / Left";
    badge.appendChild(lIcon);

    const textNode = figma.createText();
    textNode.fontName = fontObj;
    textNode.characters = intent.name; 
    textNode.fontSize = 13; 
    if (intent.txt) textNode.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', intent.txt)];
    badge.appendChild(textNode);

    const rIcon = createIcon(intent.txt);
    rIcon.name = "Icon / Right";
    badge.appendChild(rIcon);

    variants.push(badge);
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Badge";
  
  const leftIconProp = compSet.addComponentProperty("Left Icon", "BOOLEAN", false);
  const rightIconProp = compSet.addComponentProperty("Right Icon", "BOOLEAN", false);
  
  variants.forEach(v => {
     const l = v.children.find(c => c.name === "Icon / Left");
     const r = v.children.find(c => c.name === "Icon / Right");
     l.componentPropertyReferences = { visible: leftIconProp };
     r.componentPropertyReferences = { visible: rightIconProp };
     l.visible = false; 
     r.visible = false; 
  });

  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 24;
  compSet.paddingLeft = 32; compSet.paddingRight = 32;
  compSet.paddingTop = 32; compSet.paddingBottom = 32;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ 아이콘 토글(Boolean) 속성이 추가된 마스터 배지 생성 완료!");
}

createBadgeWithIcons();