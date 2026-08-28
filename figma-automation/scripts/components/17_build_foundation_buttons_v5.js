(async () => {
  await figma.loadAllPagesAsync();
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });

  console.log("🔍 문서 내의 Foundation 토큰 스캔 시작...");

  async function buildVariableMap() {
    const map = {};
    const localVars = await figma.variables.getLocalVariablesAsync("COLOR");
    localVars.forEach(v => map[v.name] = v);

    const nodes = figma.root.findAll(n => n.boundVariables !== undefined);
    const extractIds = (obj) => {
      let ids = [];
      for (const key in obj) {
        const val = obj[key];
        if (val && val.type === 'VARIABLE_ALIAS') ids.push(val.id);
        else if (typeof val === 'object') ids = ids.concat(extractIds(val));
        else if (Array.isArray(val)) {
          val.forEach(item => {
            if (item && item.type === 'VARIABLE_ALIAS') ids.push(item.id);
            else if (typeof item === 'object') ids = ids.concat(extractIds(item));
          });
        }
      }
      return ids;
    };

    const uniqueIds = new Set();
    for (const node of nodes) {
      if (!node.boundVariables) continue;
      extractIds(node.boundVariables).forEach(id => uniqueIds.add(id));
    }

    for (const id of uniqueIds) {
      try {
        const v = await figma.variables.getVariableByIdAsync(id);
        if (v && !map[v.name]) map[v.name] = v;
      } catch(e) {}
    }
    return map;
  }

  const variableMap = await buildVariableMap();
  const foundNames = Object.keys(variableMap);
  console.log("✅ 토큰 맵 구성 완료! 찾은 변수 개수:", foundNames.length);

  async function getFoundationToken(name, fallbackRgb) {
    if (variableMap[name] && !name.startsWith("Fallback/")) return variableMap[name];
    
    const fuzzyMatch = foundNames.find(n => n.includes(name) && !n.startsWith("Fallback/"));
    if (fuzzyMatch) {
      return variableMap[fuzzyMatch];
    }

    // [강제 수입 로직] - 지정된 이름이 로컬/캐시에 없으면 라이브러리에서 강제 수입 시도
    try {
      const allCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
      for (const lib of allCollections) {
        try {
          const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lib.key);
          const target = vars.find(v => v.name.includes(name));
          if (target) {
            const importedVar = await figma.variables.importVariableByKeyAsync(target.key);
            console.log(`✨ 강제 수입 성공: '${name}'`);
            variableMap[name] = importedVar;
            return importedVar;
          }
        } catch(e) {}
      }
    } catch(err) {}

    console.warn(`⚠️ 경고: '${name}' 토큰을 찾지 못했습니다! 임시 색상을 적용합니다.`);
    const fallbackName = `Fallback/${name}`;
    if (variableMap[fallbackName]) return variableMap[fallbackName];

    let collections = await figma.variables.getLocalVariableCollectionsAsync();
    let collection = collections.find(c => c.name === "Fallback Tokens");
    if (!collection) collection = figma.variables.createVariableCollection("Fallback Tokens");
    
    let v = figma.variables.createVariable(fallbackName, collection, "COLOR");
    v.setValueForMode(collection.defaultModeId, fallbackRgb);
    
    variableMap[fallbackName] = v;
    return v;
  }

  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  // [CEO-995] 새롭게 추가된 상태 토큰들이 완벽하게 반영된 Config
  const tokenConfig = {
    Primary: {
      Default:  { Bg: "brand-primary",           Text: "text-inverse" },
      Hover:    { Bg: "brand-primary-hover",     Text: "text-inverse" },
      Active:   { Bg: "brand-primary-active",    Text: "text-inverse" }, 
      Disabled: { Bg: "state-disabled-bg",       Text: "state-disabled-text" }    
    },
    Secondary: {
      Default:  { Bg: "bg-surface",              Text: "text-primary" },
      Hover:    { Bg: "brand-secondary-hover",   Text: "text-primary" },
      Active:   { Bg: "brand-secondary-active",  Text: "text-primary" }, 
      Disabled: { Bg: "state-disabled-bg",       Text: "state-disabled-text" }    
    },
    Danger: {
      Default:  { Bg: "state-danger",            Text: "text-inverse" },
      Hover:    { Bg: "state-danger-hover",      Text: "text-inverse" },
      Active:   { Bg: "state-danger-active",     Text: "text-inverse" },
      Disabled: { Bg: "state-disabled-bg",       Text: "state-disabled-text" }    
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
  text.fontSize = 16;
  text.fontName = { family: "Pretendard", style: "Medium" };
  base.appendChild(text);
  text.componentPropertyReferences = { characters: textPropName };

  const types = ["Primary", "Secondary", "Danger"];
  const states = ["Default", "Hover", "Active", "Disabled"];
  const variants = [];

  for (const type of types) {
    for (const state of states) {
      const variant = figma.createComponent();
      variant.name = `Type=${type}, State=${state}`;
      variant.layoutMode = "HORIZONTAL";
      variant.primaryAxisSizingMode = "AUTO";
      variant.counterAxisSizingMode = "AUTO";
      variant.fills = [];
      
      const inst = base.createInstance();
      const config = tokenConfig[type][state];
      
      // Fallback 컬러 지정 (임시)
      let defaultBg = rgb(200, 200, 200);
      if (type === "Primary") defaultBg = rgb(0, 100, 255);
      else if (type === "Danger") defaultBg = rgb(255, 50, 50);

      const bgToken = await getFoundationToken(config.Bg, defaultBg);
      const textToken = await getFoundationToken(config.Text, rgb(0, 0, 0));
      
      let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
      bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', bgToken);
      inst.fills = [bgPaint];

      const textNode = inst.children[0];
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', textToken);
      textNode.fills = [txtPaint];

      variant.appendChild(inst);
      variants.push(variant);
    }
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Button (v5 - with New States)";
  
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
  console.log("🚀 [v5.0] 새로운 상태 토큰들이 매핑된 버튼 세트 생성 완료!");
})();