(async () => {
  await figma.loadAllPagesAsync(); // Figma 권장 사항 반영
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

  console.log("🔍 문서 내의 Foundation 토큰 스캔 시작...");

  // 1. 마법의 스캐너 헬퍼
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
  console.log("💡 찾은 토큰 이름 목록 (일부):", foundNames.slice(0, 30).join(", "));

  // 2. 스마트 매칭 헬퍼 (퍼지 매칭 + 크래시 방지)
  async function getFoundationToken(name, fallbackRgb) {
    // A. 정확히 일치하는 이름 찾기
    if (variableMap[name]) return variableMap[name];
    
    // B. 이름의 일부만 일치해도 스마트하게 찾아주기 (예: "Color/brand-primary")
    const fuzzyMatch = foundNames.find(n => n.includes(name));
    if (fuzzyMatch) {
      console.log(`✨ 스마트 연결: '${name}'을 찾지 못해 '${fuzzyMatch}'(으)로 자동 연결했습니다!`);
      return variableMap[fuzzyMatch];
    }

    // C. 끝내 못 찾으면 안전하게 임시 토큰 생성 (중복 크래시 방지)
    console.warn(`⚠️ 경고: '${name}' 토큰을 찾지 못했습니다! 임시 로컬 토큰을 생성합니다.`);
    const fallbackName = `Fallback/${name}`;
    if (variableMap[fallbackName]) return variableMap[fallbackName]; // 이미 만들었으면 재사용!

    let collections = await figma.variables.getLocalVariableCollectionsAsync();
    let collection = collections.length > 0 ? collections[0] : figma.variables.createVariableCollection("Fallback Tokens");
    let v = figma.variables.createVariable(fallbackName, collection, "COLOR");
    v.setValueForMode(collection.defaultModeId, fallbackRgb);
    
    variableMap[fallbackName] = v; // 중복 생성 방지를 위해 맵에 기록
    return v;
  }

  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  // 3. 토큰 매핑 (이제 스마트하게 찾아냅니다)
  const tokens = {
    Primary: {
      Default: await getFoundationToken("brand-primary", rgb(25, 145, 185)),
      Hover: await getFoundationToken("brand-primary-hover", rgb(18, 117, 181)),
      Active: await getFoundationToken("brand-primary-hover", rgb(18, 117, 181)),
      Disabled: await getFoundationToken("bg-surface", rgb(245, 229, 226)),
      Text: await getFoundationToken("bg-elevated", rgb(255, 255, 255))
    },
    Secondary: {
      Default: await getFoundationToken("bg-surface", rgb(245, 229, 226)),
      Hover: await getFoundationToken("bg-base", rgb(252, 242, 240)),
      Active: await getFoundationToken("bg-base", rgb(252, 242, 240)),
      Disabled: await getFoundationToken("bg-surface", rgb(245, 229, 226)),
      Text: await getFoundationToken("text-primary", rgb(30, 19, 17))
    },
    Danger: {
      Default: await getFoundationToken("accent", rgb(219, 108, 102)),
      Hover: await getFoundationToken("accent", rgb(200, 90, 80)),
      Active: await getFoundationToken("accent", rgb(200, 90, 80)),
      Disabled: await getFoundationToken("bg-surface", rgb(245, 229, 226)),
      Text: await getFoundationToken("bg-elevated", rgb(255, 255, 255))
    }
  };

  // 4. Base 컴포넌트 생성 (.base)
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

  // 5. 12종 Variant 생성 루프
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

  // 6. Component Set 결합
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Foundation Button (Pro Grid)";
  
  // 7. 2D 그리드 정렬
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
  console.log("🚀 [v4.1] 스마트 매칭을 통한 Foundation 버튼 세트 생성 완료!");
})();