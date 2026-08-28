(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  // 1. 토큰(Variable) 매니저 (최신 Async API로 업데이트)
  async function getToken(name, rgbColor) {
    let vars = await figma.variables.getLocalVariablesAsync("COLOR");
    let v = vars.find(v => v.name === name);
    if (!v) {
      let collections = await figma.variables.getLocalVariableCollectionsAsync();
      let collection = collections.length > 0 ? collections[0] : figma.variables.createVariableCollection("Sonagi Tokens");
      
      // 최신 API 규약: collection.id 대신 collection 노드 객체 자체를 전달
      v = figma.variables.createVariable(name, collection, "COLOR");
      v.setValueForMode(collection.defaultModeId, rgbColor);
    }
    return v;
  }

  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  const varPrimary = await getToken("Action/Primary/Default", rgb(51, 102, 255));
  const varHover   = await getToken("Action/Primary/Hover", rgb(25, 51, 204));
  const varText    = await getToken("Action/Primary/Text", rgb(255, 255, 255));

  // 2. Base 컴포넌트 생성 (.base)
  const base = figma.createComponent();
  base.name = "_base-button";
  
  base.layoutMode = "HORIZONTAL";
  base.primaryAxisSizingMode = "AUTO";
  base.counterAxisSizingMode = "AUTO";
  base.paddingLeft = 16; base.paddingRight = 16;
  base.paddingTop = 10; base.paddingBottom = 10;
  base.cornerRadius = 8;
  base.itemSpacing = 8;

  let basePaint = { type: 'SOLID', color: rgb(51, 102, 255) };
  basePaint = figma.variables.setBoundVariableForPaint(basePaint, 'color', varPrimary);
  base.fills = [basePaint];

  const textPropName = base.addComponentProperty('Label', 'TEXT', 'Button');

  // 3. 텍스트 레이어 생성 및 바인딩
  const text = figma.createText();
  text.characters = "Button";
  let textPaint = { type: 'SOLID', color: rgb(255, 255, 255) };
  textPaint = figma.variables.setBoundVariableForPaint(textPaint, 'color', varText);
  text.fills = [textPaint];
  
  // [에러 해결] 반드시 텍스트를 컴포넌트 내부에 먼저 추가(appendChild)해야 속성 바인딩이 가능합니다!
  base.appendChild(text);
  text.componentPropertyReferences = { characters: textPropName };

  // 4. Component Set을 위한 Variant 껍데기들
  const variantDefault = figma.createComponent();
  variantDefault.name = "State=Default";
  variantDefault.layoutMode = "HORIZONTAL";
  variantDefault.fills = []; 
  
  const instDefault = base.createInstance();
  variantDefault.appendChild(instDefault);

  const variantHover = figma.createComponent();
  variantHover.name = "State=Hover";
  variantHover.layoutMode = "HORIZONTAL";
  variantHover.fills = [];
  
  const instHover = base.createInstance();
  let hoverPaint = { type: 'SOLID', color: rgb(25, 51, 204) };
  hoverPaint = figma.variables.setBoundVariableForPaint(hoverPaint, 'color', varHover);
  instHover.fills = [hoverPaint];
  variantHover.appendChild(instHover);

  // 5. Variant 결합 (Component Set)
  const compSet = figma.combineAsVariants([variantDefault, variantHover], figma.currentPage);
  compSet.name = "Button";
  
  base.y = -100;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  
  console.log("🚀 [v2.1] 최신 API 적용 및 바인딩 에러가 해결된 컴포넌트 생성 완료!");
})();