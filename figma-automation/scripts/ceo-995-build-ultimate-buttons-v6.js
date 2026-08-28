(async () => {
  await figma.loadAllPagesAsync();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

  console.log("🔍 [V6 Ultimate] 문서 내 Foundation 토큰 스캔 시작...");

  // 1. 토큰 맵 구축 및 라이브러리 강제 수입 로직 (v5와 동일, 가장 안정적임)
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

  async function getFoundationToken(name, fallbackRgb) {
    if (variableMap[name] && !name.startsWith("Fallback/")) return variableMap[name];
    const fuzzyMatch = foundNames.find(n => n.includes(name) && !n.startsWith("Fallback/"));
    if (fuzzyMatch) return variableMap[fuzzyMatch];

    try {
      const allCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
      for (const lib of allCollections) {
        try {
          const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lib.key);
          const target = vars.find(v => v.name.includes(name));
          if (target) {
            const importedVar = await figma.variables.importVariableByKeyAsync(target.key);
            variableMap[name] = importedVar;
            return importedVar;
          }
        } catch(e) {}
      }
    } catch(err) {}

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

  // [토큰 매핑 Config]
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

  // [사이즈 Config] L(48), M(40), S(32)
  const sizes = [
    { name: "L", height: 48, px: 20, py: 14, fontSize: 16, radius: 12 },
    { name: "M", height: 40, px: 16, py: 10, fontSize: 14, radius: 8 },
    { name: "S", height: 32, px: 12, py: 6,  fontSize: 12, radius: 6 }
  ];

  const types = ["Primary", "Secondary", "Danger"];
  const states = ["Default", "Hover", "Active", "Disabled"];
  const variants = [];

  // 마스터 베이스 생성 대신, 모든 조합을 평탄하게 생성 (구조 단순화 및 오류 방지)
  for (const size of sizes) {
    for (const type of types) {
      for (const state of states) {
        const variant = figma.createComponent();
        variant.name = `Size=${size.name}, Type=${type}, State=${state}`;
        variant.layoutMode = "HORIZONTAL";
        variant.primaryAxisSizingMode = "AUTO"; // 가로 폭 글자에 맞춤
        variant.counterAxisSizingMode = "FIXED"; // 세로 높이 고정 (L/M/S)
        variant.resize(100, size.height); // 임시 너비 (어차피 AUTO라 글자따라 늘어남)
        
        variant.paddingLeft = size.px; variant.paddingRight = size.px;
        variant.cornerRadius = size.radius;
        variant.counterAxisAlignItems = "CENTER";
        variant.primaryAxisAlignItems = "CENTER";
        
        const config = tokenConfig[type][state];
        
        // 색상 바인딩
        const bgToken = await getFoundationToken(config.Bg, rgb(200, 200, 200));
        const textToken = await getFoundationToken(config.Text, rgb(0, 0, 0));
        
        let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
        bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', bgToken);
        variant.fills = [bgPaint];

        // 텍스트 추가
        const text = figma.createText();
        text.characters = "Button";
        text.fontSize = size.fontSize;
        text.fontName = { family: "Inter", style: "Medium" };
        
        let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
        txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', textToken);
        text.fills = [txtPaint];
        
        variant.appendChild(text);
        variants.push(variant);
      }
    }
  }

  // 36개 Variants를 묶어서 Component Set 생성
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Button (v6 Ultimate)";
  
  // 3차원 행렬(Matrix) 배치 로직
  // 행(Y): Size(3) x Type(3) = 9줄
  // 열(X): State(4) = 4칸
  let i = 0;
  for (let s = 0; s < sizes.length; s++) {
    for (let t = 0; t < types.length; t++) {
      for (let st = 0; st < states.length; st++) {
        const row = (s * types.length) + t;
        const col = st;
        variants[i].x = col * 160 + 60; 
        variants[i].y = row * 80 + 60 + (s * 40); // 사이즈 바뀔 때 간격 살짝 추가
        i++;
      }
    }
  }
  
  compSet.layoutMode = "NONE"; // 행렬 배치를 위해 오토레이아웃 해제
  compSet.resize(4 * 160 + 120, 9 * 80 + 160 + 80);
  compSet.fills = [{ type: 'SOLID', color: rgb(245, 245, 250), opacity: 0.5 }];
  compSet.cornerRadius = 24;
  compSet.strokes = [{type:'SOLID', color: rgb(0.8,0.3,0.8)}];
  compSet.strokeWeight = 2;
  compSet.dashPattern = [10, 10];
  
  figma.viewport.scrollAndZoomIntoView([compSet]);
  console.log("🚀 [v6 Ultimate] 완벽한 사이즈(L/M/S)와 파운데이션 토큰이 매핑된 궁극의 버튼 세트 생성 완료!");
})();