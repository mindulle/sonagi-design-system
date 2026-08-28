async function createInputComponentSet() {
  const fontObj = { family: "Pretendard", style: "SemiBold" };
  const fontReg = { family: "Pretendard", style: "Regular" };
  
  try {
    await figma.loadFontAsync(fontObj);
    await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontObj.family = "Inter"; fontReg.family = "Inter";
    await figma.loadFontAsync(fontObj);
    await figma.loadFontAsync(fontReg);
  }

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    px: getF("space/element/px"), 
    py: getF("space/container/sm") || getF("space/element/py"), 
    rad: getF("radius/md"), 
    gapBox: getF("space/gap/sm"), 
    gapOuter: getF("space/gap/xs"), 
    
    bgBase: getV("background/bg-surface"),
    bgDis: getV("state/state-disabled-bg"),
    
    borderDef: getV("border/border-default"),
    borderHov: getV("border/border-subtle") || getV("gray/500"),
    borderFocus: getV("brand/brand-primary"), 
    borderError: getV("state/state-danger") || getV("state/state-error"), 
    
    txtPri: getV("text/text-primary"),
    txtSec: getV("text/text-secondary"), 
    txtDis: getV("state/state-disabled-text"),
    txtErr: getV("text/text-danger") || getV("state/state-danger")
  };

  function createIcon(colorVar) {
    const icon = figma.createFrame();
    icon.resize(16, 16); icon.cornerRadius = 8;
    icon.fills = colorVar ? [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', colorVar)] : [{type:'SOLID', color:{r:0,g:0,b:0}, opacity:0.3}];
    return icon;
  }

  const states = ["Default", "Hover", "Focus", "Error", "Disabled"];
  const variants = [];

  for (const state of states) {
    const wrapper = figma.createComponent();
    wrapper.name = `State=${state}`;
    wrapper.layoutMode = "VERTICAL";
    if (v.gapOuter) wrapper.setBoundVariable("itemSpacing", v.gapOuter); else wrapper.itemSpacing = 4;
    wrapper.fills = [];
    wrapper.primaryAxisSizingMode = "AUTO"; 
    wrapper.counterAxisSizingMode = "AUTO";

    let borderColor = v.borderDef;
    let bgColor = v.bgBase;
    let helperColor = v.txtSec;
    let textColor = v.txtPri;
    let strokeW = 1;

    if (state === "Hover") borderColor = v.borderHov;
    else if (state === "Focus") { borderColor = v.borderFocus; strokeW = 2; }
    else if (state === "Error") { borderColor = v.borderError; helperColor = v.txtErr; strokeW = 2; }
    else if (state === "Disabled") { bgColor = v.bgDis; borderColor = v.txtDis; textColor = v.txtDis; helperColor = v.txtDis; }

    const label = figma.createText();
    label.name = "Label Text";
    label.fontName = fontObj; label.characters = "Email Address"; label.fontSize = 14;
    if (textColor) label.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', textColor)];
    wrapper.appendChild(label);

    const inputBox = figma.createFrame();
    inputBox.name = "Input Box";
    inputBox.layoutMode = "HORIZONTAL";
    inputBox.primaryAxisAlignItems = "MIN"; inputBox.counterAxisAlignItems = "CENTER";
    inputBox.resize(320, 48); 
    inputBox.primaryAxisSizingMode = "FIXED"; inputBox.counterAxisSizingMode = "AUTO";
    
    if (v.px) { inputBox.setBoundVariable("paddingLeft", v.px); inputBox.setBoundVariable("paddingRight", v.px); }
    if (v.py) { inputBox.setBoundVariable("paddingTop", v.py); inputBox.setBoundVariable("paddingBottom", v.py); }
    if (v.gapBox) inputBox.setBoundVariable("itemSpacing", v.gapBox);
    if (v.rad) { inputBox.setBoundVariable("topLeftRadius", v.rad); inputBox.setBoundVariable("topRightRadius", v.rad); inputBox.setBoundVariable("bottomLeftRadius", v.rad); inputBox.setBoundVariable("bottomRightRadius", v.rad); }

    if (bgColor) inputBox.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bgColor)];
    if (borderColor) {
      inputBox.strokes = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', borderColor)];
      inputBox.strokeWeight = strokeW;
    }

    const lIcon = createIcon(textColor); lIcon.name = "Icon / Left";
    inputBox.appendChild(lIcon);

    const inputText = figma.createText();
    inputText.name = "Value";
    inputText.fontName = fontReg; 
    inputText.characters = state === "Focus" || state === "Error" ? "user@sonagi.space" : "Enter your email";
    inputText.fontSize = 16;
    
    inputText.layoutAlign = "STRETCH"; 
    inputText.layoutGrow = 1; 

    const txtCol = (state === "Default" || state === "Hover") ? v.txtSec : textColor;
    if (txtCol) inputText.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtCol)];
    inputBox.appendChild(inputText);

    const rIcon = createIcon(textColor); rIcon.name = "Icon / Right";
    inputBox.appendChild(rIcon);

    wrapper.appendChild(inputBox);

    const helper = figma.createText();
    helper.name = "Helper Text";
    helper.fontName = fontReg; 
    helper.characters = state === "Error" ? "Please enter a valid email address." : "We'll never share your email.";
    helper.fontSize = 13;
    if (helperColor) helper.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', helperColor)];
    wrapper.appendChild(helper);

    variants.push(wrapper);
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Input";
  
  const showLabel = compSet.addComponentProperty("Show Label", "BOOLEAN", true);
  const showHelper = compSet.addComponentProperty("Show Helper Text", "BOOLEAN", false);
  const showLIcon = compSet.addComponentProperty("Left Icon", "BOOLEAN", false);
  const showRIcon = compSet.addComponentProperty("Right Icon", "BOOLEAN", false);
  
  variants.forEach(v => {
     const label = v.children.find(c => c.name === "Label Text");
     const helper = v.children.find(c => c.name === "Helper Text");
     const box = v.children.find(c => c.name === "Input Box");
     const lIcon = box.children.find(c => c.name === "Icon / Left");
     const rIcon = box.children.find(c => c.name === "Icon / Right");
     
     label.componentPropertyReferences = { visible: showLabel };
     helper.componentPropertyReferences = { visible: showHelper };
     lIcon.componentPropertyReferences = { visible: showLIcon };
     rIcon.componentPropertyReferences = { visible: showRIcon };
     
     helper.visible = false;
     lIcon.visible = false;
     rIcon.visible = false;
  });

  compSet.layoutMode = "HORIZONTAL";
  compSet.itemSpacing = 40;
  compSet.paddingLeft = 40; compSet.paddingRight = 40;
  compSet.paddingTop = 40; compSet.paddingBottom = 40;
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ Input 컴포넌트 셋 생성 완료!");
}

createInputComponentSet();