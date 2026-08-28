(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  // 1. 최신 Async 토큰 헬퍼
  async function getToken(name, rgbColor) {
    let vars = await figma.variables.getLocalVariablesAsync("COLOR");
    let v = vars.find(v => v.name === name);
    if (!v) {
      let collections = await figma.variables.getLocalVariableCollectionsAsync();
      let collection = collections.length > 0 ? collections[0] : figma.variables.createVariableCollection("Sonagi Tokens");
      v = figma.variables.createVariable(name, collection, "COLOR");
      v.setValueForMode(collection.defaultModeId, rgbColor);
    }
    return v;
  }
  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  // 2. Selection Controls용 토큰 매핑
  const tokens = {
    Checked: await getToken("Control/Checked/Bg", rgb(25, 91, 255)),
    UncheckedBg: await getToken("Control/Unchecked/Bg", rgb(255, 255, 255)),
    UncheckedBorder: await getToken("Control/Unchecked/Border", rgb(208, 213, 221)),
    DisabledBg: await getToken("Control/Disabled/Bg", rgb(242, 244, 247)),
    DisabledBorder: await getToken("Control/Disabled/Border", rgb(234, 236, 240)),
    LabelText: await getToken("Control/Common/LabelText", rgb(52, 64, 84))
  };

  // -------------------------------------------------------------
  // A. Checkbox Component Set
  // -------------------------------------------------------------
  const baseCb = figma.createComponent();
  baseCb.name = "_base-checkbox";
  baseCb.layoutMode = "HORIZONTAL";
  baseCb.primaryAxisSizingMode = "AUTO";
  baseCb.counterAxisSizingMode = "AUTO";
  baseCb.counterAxisAlignItems = "CENTER";
  baseCb.itemSpacing = 8;

  const cbLabelProp = baseCb.addComponentProperty('Label', 'TEXT', 'Remember me');
  const cbShowLabelProp = baseCb.addComponentProperty('ShowLabel', 'BOOLEAN', true);

  // Checkbox Box Frame
  const cbBox = figma.createFrame();
  cbBox.name = "Box";
  cbBox.resize(18, 18);
  cbBox.cornerRadius = 4;
  cbBox.strokeWeight = 1;
  cbBox.layoutMode = "NONE";

  // Check Mark (Vector Path)
  const checkIcon = figma.createVector();
  checkIcon.name = "CheckIcon";
  checkIcon.vectorPaths = [{
    data: "M 4 9 L 7.5 12.5 L 14 6",
    windingRule: "NONZERO"
  }];
  checkIcon.strokes = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
  checkIcon.strokeWeight = 2;
  checkIcon.resize(18, 18);
  cbBox.appendChild(checkIcon);

  baseCb.appendChild(cbBox);

  // Label Text
  const cbText = figma.createText();
  cbText.name = "LabelText";
  cbText.fontName = { family: "Inter", style: "Regular" };
  cbText.fontSize = 14;
  cbText.characters = "Remember me";
  let labelPaint = { type: 'SOLID', color: rgb(0,0,0) };
  labelPaint = figma.variables.setBoundVariableForPaint(labelPaint, 'color', tokens.LabelText);
  cbText.fills = [labelPaint];
  baseCb.appendChild(cbText);

  cbText.componentPropertyReferences = {
    characters: cbLabelProp,
    visible: cbShowLabelProp
  };

  // Checkbox Variants
  const cbStates = ["Unchecked", "Checked", "Disabled"];
  const cbVariants = [];

  for (const state of cbStates) {
    const v = figma.createComponent();
    v.name = `State=${state}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = baseCb.createInstance();
    const instBox = inst.children[0];
    const instIcon = instBox.children[0];

    if (state === "Unchecked") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.UncheckedBg);
      let border = { type: 'SOLID', color: rgb(0,0,0) };
      border = figma.variables.setBoundVariableForPaint(border, 'color', tokens.UncheckedBorder);
      instBox.fills = [bg];
      instBox.strokes = [border];
      instIcon.visible = false;
    } else if (state === "Checked") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.Checked);
      instBox.fills = [bg];
      instBox.strokes = [];
      instIcon.visible = true;
    } else if (state === "Disabled") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.DisabledBg);
      let border = { type: 'SOLID', color: rgb(0,0,0) };
      border = figma.variables.setBoundVariableForPaint(border, 'color', tokens.DisabledBorder);
      instBox.fills = [bg];
      instBox.strokes = [border];
      instIcon.visible = false;
    }

    v.appendChild(inst);
    cbVariants.push(v);
  }

  const cbSet = figma.combineAsVariants(cbVariants, figma.currentPage);
  cbSet.name = "Checkbox (Pro Grid)";
  for (let col = 0; col < cbStates.length; col++) {
    cbVariants[col].x = col * 160 + 20;
    cbVariants[col].y = 20;
  }
  cbSet.resize(3 * 160 + 20, 60);
  cbSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  cbSet.cornerRadius = 12;
  baseCb.y = -100;

  // -------------------------------------------------------------
  // B. Switch / Toggle Component Set
  // -------------------------------------------------------------
  const baseSw = figma.createComponent();
  baseSw.name = "_base-switch";
  baseSw.layoutMode = "HORIZONTAL";
  baseSw.primaryAxisSizingMode = "AUTO";
  baseSw.counterAxisSizingMode = "AUTO";
  baseSw.counterAxisAlignItems = "CENTER";
  baseSw.itemSpacing = 10;

  const swLabelProp = baseSw.addComponentProperty('Label', 'TEXT', 'Enable Notifications');
  const swShowLabelProp = baseSw.addComponentProperty('ShowLabel', 'BOOLEAN', true);

  // Switch Track Frame
  const swTrack = figma.createFrame();
  swTrack.name = "Track";
  swTrack.resize(36, 20);
  swTrack.cornerRadius = 999;
  swTrack.layoutMode = "NONE";

  // Left Knob (Off 위치: x = 2)
  const knobOff = figma.createEllipse();
  knobOff.name = "KnobOff";
  knobOff.resize(16, 16);
  knobOff.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
  knobOff.x = 2; knobOff.y = 2;
  swTrack.appendChild(knobOff);

  // Right Knob (On 위치: x = 18)
  const knobOn = figma.createEllipse();
  knobOn.name = "KnobOn";
  knobOn.resize(16, 16);
  knobOn.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
  knobOn.x = 18; knobOn.y = 2;
  swTrack.appendChild(knobOn);

  baseSw.appendChild(swTrack);

  // Switch Label Text
  const swText = figma.createText();
  swText.name = "LabelText";
  swText.fontName = { family: "Inter", style: "Regular" };
  swText.fontSize = 14;
  swText.characters = "Enable Notifications";
  let swTextPaint = { type: 'SOLID', color: rgb(0,0,0) };
  swTextPaint = figma.variables.setBoundVariableForPaint(swTextPaint, 'color', tokens.LabelText);
  swText.fills = [swTextPaint];
  baseSw.appendChild(swText);

  swText.componentPropertyReferences = {
    characters: swLabelProp,
    visible: swShowLabelProp
  };

  // Switch Variants (Off, On, Disabled)
  const swStates = ["Off", "On", "Disabled"];
  const swVariants = [];

  for (const state of swStates) {
    const v = figma.createComponent();
    v.name = `State=${state}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = baseSw.createInstance();
    const instTrack = inst.children[0];
    const instKnobOff = instTrack.children[0];
    const instKnobOn = instTrack.children[1];

    if (state === "Off") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.UncheckedBorder);
      instTrack.fills = [bg];
      instKnobOff.visible = true;
      instKnobOn.visible = false;
    } else if (state === "On") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.Checked);
      instTrack.fills = [bg];
      instKnobOff.visible = false;
      instKnobOn.visible = true;
    } else if (state === "Disabled") {
      let bg = { type: 'SOLID', color: rgb(0,0,0) };
      bg = figma.variables.setBoundVariableForPaint(bg, 'color', tokens.DisabledBorder);
      instTrack.fills = [bg];
      instKnobOff.visible = true;
      instKnobOn.visible = false;
    }

    v.appendChild(inst);
    swVariants.push(v);
  }

  const swSet = figma.combineAsVariants(swVariants, figma.currentPage);
  swSet.name = "Switch / Toggle (Pro Grid)";
  for (let col = 0; col < swStates.length; col++) {
    swVariants[col].x = col * 200 + 20;
    swVariants[col].y = 20;
  }
  swSet.resize(3 * 200 + 20, 60);
  swSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  swSet.cornerRadius = 12;
  baseSw.y = -100;
  swSet.y = 120;

  figma.viewport.scrollAndZoomIntoView([cbSet, swSet, baseCb, baseSw]);
  console.log("🚀 [v1.1] Selection Controls (Checkbox & Switch) 에러 수정 완료!");
})();