(async () => {
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });

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

  const tokens = {
    Primary: {
      Default: await getToken("Action/Primary/Default", rgb(51, 102, 255)),
      Hover: await getToken("Action/Primary/Hover", rgb(25, 51, 204)),
      Active: await getToken("Action/Primary/Active", rgb(17, 34, 153)),
      Disabled: await getToken("Action/Primary/Disabled", rgb(200, 210, 255)),
      Text: await getToken("Action/Primary/Text", rgb(255, 255, 255))
    },
    Secondary: {
      Default: await getToken("Action/Secondary/Default", rgb(240, 242, 245)),
      Hover: await getToken("Action/Secondary/Hover", rgb(220, 224, 230)),
      Active: await getToken("Action/Secondary/Active", rgb(200, 205, 215)),
      Disabled: await getToken("Action/Secondary/Disabled", rgb(250, 250, 250)),
      Text: await getToken("Action/Secondary/Text", rgb(50, 50, 50))
    },
    Danger: {
      Default: await getToken("Action/Danger/Default", rgb(255, 77, 79)),
      Hover: await getToken("Action/Danger/Hover", rgb(204, 51, 51)),
      Active: await getToken("Action/Danger/Active", rgb(153, 0, 0)),
      Disabled: await getToken("Action/Danger/Disabled", rgb(255, 200, 200)),
      Text: await getToken("Action/Danger/Text", rgb(255, 255, 255))
    }
  };

  const base = figma.createComponent();
  base.name = "_base-button";
  base.layoutMode = "HORIZONTAL";
  base.primaryAxisSizingMode = "AUTO";
  base.counterAxisSizingMode = "AUTO";
  base.paddingLeft = 16; base.paddingRight = 16;
  base.paddingTop = 10; base.paddingBottom = 10;
  base.cornerRadius = 8;
  
  const textPropName = base.addComponentProperty('Label', 'TEXT', 'Button');
  const text = figma.createText();
  text.characters = "Button";
  base.appendChild(text);
  text.componentPropertyReferences = { characters: textPropName };

  const types = ["Primary", "Secondary", "Danger"];
  const states = ["Default", "Hover", "Active", "Disabled"];
  const variants = [];

  for (const type of types) {
    for (const state of states) {
      const variant = figma.createComponent();
      variant.name = `Type=${type}, State=${state}`;
      
      // [수정된 부분] 껍데기도 Base에 딱 맞게 줄어들도록 AUTO(Hug) 설정 추가!
      variant.layoutMode = "HORIZONTAL";
      variant.primaryAxisSizingMode = "AUTO"; 
      variant.counterAxisSizingMode = "AUTO"; 
      variant.fills = [];
      
      const inst = base.createInstance();
      
      let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
      bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens[type][state]);
      inst.fills = [bgPaint];

      const textNode = inst.children[0];
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens[type].Text);
      textNode.fills = [txtPaint];

      variant.appendChild(inst);
      variants.push(variant);
    }
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Button (Pro Grid Fixed)";
  
  let i = 0;
  for (let row = 0; row < types.length; row++) {
    for (let col = 0; col < states.length; col++) {
      variants[i].x = col * 140 + 40; 
      variants[i].y = row * 80 + 40;  
      i++;
    }
  }
  
  compSet.resize(4 * 140 + 80, 3 * 80 + 80);
  compSet.fills = [{ type: 'SOLID', color: rgb(245, 245, 250), opacity: 0.5 }];
  compSet.cornerRadius = 16;
  
  base.y = -100;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  console.log("🚀 [v3.1] Variant 여백 문제(Hug Content)가 완벽히 수정된 정렬 완료!");
})();