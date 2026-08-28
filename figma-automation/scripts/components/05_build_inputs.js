(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

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

  // 2. Input용 토큰 매핑
  const tokens = {
    Default: {
      Bg: await getToken("Input/Default/Bg", rgb(255, 255, 255)),
      Border: await getToken("Input/Default/Border", rgb(208, 213, 221)),
      Text: await getToken("Input/Default/Text", rgb(102, 112, 133))
    },
    Focused: {
      Bg: await getToken("Input/Focused/Bg", rgb(255, 255, 255)),
      Border: await getToken("Input/Focused/Border", rgb(25, 91, 255)),
      Text: await getToken("Input/Focused/Text", rgb(16, 24, 40))
    },
    Filled: {
      Bg: await getToken("Input/Filled/Bg", rgb(255, 255, 255)),
      Border: await getToken("Input/Filled/Border", rgb(208, 213, 221)),
      Text: await getToken("Input/Filled/Text", rgb(16, 24, 40))
    },
    Error: {
      Bg: await getToken("Input/Error/Bg", rgb(255, 255, 255)),
      Border: await getToken("Input/Error/Border", rgb(240, 68, 56)),
      Text: await getToken("Input/Error/Text", rgb(240, 68, 56))
    },
    Disabled: {
      Bg: await getToken("Input/Disabled/Bg", rgb(242, 244, 247)),
      Border: await getToken("Input/Disabled/Border", rgb(234, 236, 240)),
      Text: await getToken("Input/Disabled/Text", rgb(152, 162, 179))
    },
    LabelText: await getToken("Input/Common/LabelText", rgb(52, 64, 84)),
    HelpText: await getToken("Input/Common/HelpText", rgb(102, 112, 133))
  };

  // 3. 마스터 뼈대 (_base-input) 생성 - Vertical 레이아웃
  const base = figma.createComponent();
  base.name = "_base-input";
  base.layoutMode = "VERTICAL";
  base.primaryAxisSizingMode = "AUTO";
  base.counterAxisSizingMode = "FIXED";
  base.resize(280, 80);
  base.itemSpacing = 6;

  // Component Properties 정의
  const labelProp = base.addComponentProperty('LabelText', 'TEXT', 'Email');
  const placeholderProp = base.addComponentProperty('Placeholder', 'TEXT', 'Enter your email...');
  const helpProp = base.addComponentProperty('HelpText', 'TEXT', 'This is a hint text to help user.');
  const showLabelProp = base.addComponentProperty('ShowLabel', 'BOOLEAN', true);
  const showHelpProp = base.addComponentProperty('ShowHelpText', 'BOOLEAN', true);

  // 3-A. Top Label Node
  const labelNode = figma.createText();
  labelNode.name = "FieldLabel";
  labelNode.fontName = { family: "Inter", style: "Medium" };
  labelNode.fontSize = 14;
  labelNode.characters = "Email";
  let labelPaint = { type: 'SOLID', color: rgb(0,0,0) };
  labelPaint = figma.variables.setBoundVariableForPaint(labelPaint, 'color', tokens.LabelText);
  labelNode.fills = [labelPaint];
  base.appendChild(labelNode);

  // 3-B. Input Box Container Node
  const inputBox = figma.createFrame();
  inputBox.name = "InputBox";
  inputBox.layoutMode = "HORIZONTAL";
  inputBox.primaryAxisSizingMode = "FIXED";
  inputBox.counterAxisSizingMode = "AUTO";
  inputBox.resize(280, 44);
  inputBox.paddingLeft = 14; inputBox.paddingRight = 14;
  inputBox.paddingTop = 10; inputBox.paddingBottom = 10;
  inputBox.cornerRadius = 8;
  inputBox.strokeWeight = 1;

  // Input Value Text inside Box
  const valueText = figma.createText();
  valueText.name = "InputValue";
  valueText.fontName = { family: "Inter", style: "Regular" };
  valueText.fontSize = 14;
  valueText.characters = "Enter your email...";
  inputBox.appendChild(valueText);
  base.appendChild(inputBox); // [핵심 수정] base에 inputBox를 먼저 완전하게 등록!

  // 3-C. Help Text Node
  const helpNode = figma.createText();
  helpNode.name = "HelpText";
  helpNode.fontName = { family: "Inter", style: "Regular" };
  helpNode.fontSize = 12;
  helpNode.characters = "This is a hint text to help user.";
  let helpPaint = { type: 'SOLID', color: rgb(0,0,0) };
  helpPaint = figma.variables.setBoundVariableForPaint(helpPaint, 'color', tokens.HelpText);
  helpNode.fills = [helpPaint];
  base.appendChild(helpNode);

  // 모든 자식 노드가 base 트리에 완전히 등록된 후 componentPropertyReferences 바인딩 실행!
  labelNode.componentPropertyReferences = { 
    characters: labelProp,
    visible: showLabelProp
  };
  valueText.componentPropertyReferences = { characters: placeholderProp };
  helpNode.componentPropertyReferences = { 
    characters: helpProp,
    visible: showHelpProp
  };

  // 4. Variant 생성 루프 (5종 State)
  const states = ["Default", "Focused", "Filled", "Error", "Disabled"];
  const variants = [];

  for (const state of states) {
    const variant = figma.createComponent();
    variant.name = `State=${state}`;
    variant.layoutMode = "VERTICAL";
    variant.primaryAxisSizingMode = "AUTO";
    variant.counterAxisSizingMode = "AUTO";
    variant.fills = [];

    const inst = base.createInstance();
    const instInputBox = inst.children[1];

    // 배경색 토큰 바인딩
    let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
    bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens[state].Bg);
    instInputBox.fills = [bgPaint];

    // 테두리 색상 토큰 바인딩
    let borderPaint = { type: 'SOLID', color: rgb(0,0,0) };
    borderPaint = figma.variables.setBoundVariableForPaint(borderPaint, 'color', tokens[state].Border);
    instInputBox.strokes = [borderPaint];
    if (state === "Focused") {
      instInputBox.strokeWeight = 2;
    }

    // InputValue 텍스트 색상 토큰 바인딩
    const instValueText = instInputBox.children[0];
    let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
    txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens[state].Text);
    instValueText.fills = [txtPaint];

    // Error 상태일 때 HelpText 색상 Red 바인딩
    if (state === "Error") {
      const instHelpText = inst.children[2];
      let errHelpPaint = { type: 'SOLID', color: rgb(0,0,0) };
      errHelpPaint = figma.variables.setBoundVariableForPaint(errHelpPaint, 'color', tokens.Error.Text);
      instHelpText.fills = [errHelpPaint];
    }

    variant.appendChild(inst);
    variants.push(variant);
  }

  // 5. Component Set 결합
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Input / TextField (Pro Grid)";

  // 6. 1행 5열 그리드 정렬
  for (let col = 0; col < states.length; col++) {
    variants[col].x = col * 310 + 30;
    variants[col].y = 30;
  }

  compSet.resize(5 * 310 + 40, 140);
  compSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  compSet.cornerRadius = 16;

  base.y = -180;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  console.log("🚀 [v1.1] Text Input 5종 State 컴포넌트 셋 (에러 수정 완료) 생성!");
})();