(async () => {
  // 필수 폰트 로드
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  console.log("🚀 [V4 Architecture] 완벽한 파운데이션 시각화 보드 렌더링 시작...");

  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    return rgb(parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16));
  };

  // 1. 시그니처 블루(brand-blue) 커스텀 원시 파레트 생성
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  let primColl = collections.find(c => c.name === "Primitive Colors");
  if (!primColl) return console.error("Primitive Colors 컬렉션이 없습니다.");
  const defaultMode = primColl.modes[0].modeId;

  // Sonagi의 시그니처 블루(#58A6FF)를 400~500으로 잡고 만든 완벽한 커스텀 스케일
  const brandBlueScale = {
    50: "#F0F8FF", 100: "#E0F0FE", 200: "#BDE0FD", 300: "#8AC9FC", 
    400: "#58A6FF", /* 👈 시그니처 베이스 */
    500: "#368DEB", 600: "#2170CC", 700: "#1958A6", 800: "#164987", 900: "#153E70", 950: "#0E284D"
  };

  const primVars = [];
  for (const id of primColl.variableIds) {
    try { primVars.push(await figma.variables.getVariableByIdAsync(id)); } catch(e){}
  }

  // 새로 추가할 brand-blue 변수들 생성
  let newBlues = 0;
  for (const [step, hex] of Object.entries(brandBlueScale)) {
    const varName = `brand-blue/${step}`;
    let v = primVars.find(v => v.name === varName);
    if (!v) {
      v = figma.variables.createVariable(varName, primColl, "COLOR");
      v.setValueForMode(defaultMode, hexToRgb(hex));
      primVars.push(v);
      newBlues++;
    }
  }
  if (newBlues > 0) console.log(`✨ 시그니처 블루(brand-blue) 원시 스케일 ${newBlues}개 생성 완료!`);

  // 2. 시맨틱 토큰 가져오기
  const semColl = collections.find(c => c.name === "Sonagi Color Tokens");
  if (!semColl) return console.error("Sonagi Color Tokens 컬렉션을 찾을 수 없습니다.");
  
  const lightModeId = semColl.modes.find(m => m.name.includes("Light") || m.name.includes("볕")).modeId;
  const darkModeId = semColl.modes.find(m => m.name.includes("Dark") || m.name.includes("밤")).modeId;

  const semVars = [];
  for (const id of semColl.variableIds) {
    try { semVars.push(await figma.variables.getVariableByIdAsync(id)); } catch(e){}
  }

  // 3. 메인 보드(캔버스) 렌더링
  const board = figma.createFrame();
  board.name = "✨ Sonagi Design Foundation (V4 Architecture)";
  board.layoutMode = "VERTICAL";
  board.itemSpacing = 80;
  board.paddingTop = 100; board.paddingBottom = 100;
  board.paddingLeft = 100; board.paddingRight = 100;
  board.cornerRadius = 32;
  board.fills = [{ type: 'SOLID', color: rgb(250, 250, 252) }];

  const title = figma.createText();
  title.characters = "Sonagi Design Foundation V4";
  title.fontSize = 64;
  title.fontName = { family: "Inter", style: "Bold" };
  board.appendChild(title);

  // --- [섹션 1: Primitive Colors] ---
  const primSection = figma.createFrame();
  primSection.name = "Section: Primitive";
  primSection.layoutMode = "VERTICAL";
  primSection.itemSpacing = 24;
  primSection.fills = [];

  const primTitle = figma.createText();
  primTitle.characters = "1. Primitive Colors (물감 진열대)";
  primTitle.fontSize = 32;
  primTitle.fontName = { family: "Inter", style: "Bold" };
  primTitle.fills = [{ type: 'SOLID', color: rgb(100, 100, 110) }];
  primSection.appendChild(primTitle);

  const colorGroups = {};
  primVars.forEach(v => {
    const group = v.name.split('/')[0];
    if (!colorGroups[group]) colorGroups[group] = [];
    colorGroups[group].push(v);
  });

  const groupOrder = ["brand-blue", "gray", "blue", "red", "green", "orange", "base"];
  const sortedGroups = Object.keys(colorGroups).sort((a, b) => {
    const iA = groupOrder.indexOf(a); const iB = groupOrder.indexOf(b);
    return (iA > -1 ? iA : 99) - (iB > -1 ? iB : 99);
  });

  for (const group of sortedGroups) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.itemSpacing = 16;
    row.fills = [];
    row.counterAxisAlignItems = "CENTER";
    
    const label = figma.createText();
    label.characters = group.toUpperCase();
    label.fontSize = 20;
    label.fontName = { family: "Inter", style: "Bold" };
    label.resize(180, 24);
    row.appendChild(label);

    const vars = colorGroups[group].sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));
    for (const v of vars) {
      const chip = figma.createFrame();
      chip.layoutMode = "VERTICAL"; chip.itemSpacing = 8; chip.fills = [];
      
      const rect = figma.createRectangle();
      rect.resize(80, 80); rect.cornerRadius = 12;
      rect.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb(255,255,255) }, 'color', v)];
      if(v.name === "base/white") rect.strokes = [{type:'SOLID', color: rgb(200,200,200)}];
      
      const vLabel = figma.createText();
      vLabel.characters = v.name.split('/')[1] || v.name;
      vLabel.fontSize = 14;
      
      chip.appendChild(rect); chip.appendChild(vLabel); row.appendChild(chip);
    }
    primSection.appendChild(row);
  }
  board.appendChild(primSection);

  // --- [섹션 2: Semantic Colors Matrix] ---
  const semSection = figma.createFrame();
  semSection.name = "Section: Semantic";
  semSection.layoutMode = "VERTICAL";
  semSection.itemSpacing = 16;
  semSection.fills = [];

  const semTitle = figma.createText();
  semTitle.characters = "2. Semantic Tokens (의미 매핑 테이블)";
  semTitle.fontSize = 32;
  semTitle.fontName = { family: "Inter", style: "Bold" };
  semTitle.fills = [{ type: 'SOLID', color: rgb(100, 100, 110) }];
  semSection.appendChild(semTitle);

  const headerRow = figma.createFrame();
  headerRow.layoutMode = "HORIZONTAL"; headerRow.itemSpacing = 24; headerRow.fills = [];
  const createText = (str, w, isBold, colorHex = "#000000") => {
    const t = figma.createText();
    t.characters = str; t.fontSize = 20;
    t.fontName = { family: "Inter", style: isBold ? "Bold" : "Medium" };
    t.fills = [{ type: 'SOLID', color: hexToRgb(colorHex) }];
    if(w) t.resize(w, 28);
    return t;
  };
  headerRow.appendChild(createText("Token Name", 350, true));
  headerRow.appendChild(createText("☀️ Light Mode (가을 소나기 볕)", 300, true));
  headerRow.appendChild(createText("🌙 Dark Mode (가을 소나기 밤)", 300, true));
  semSection.appendChild(headerRow);

  const resolveAlias = async (val) => {
    if (!val) return "NULL";
    if (val.type === "VARIABLE_ALIAS") {
      try {
        const p = await figma.variables.getVariableByIdAsync(val.id);
        return p ? `🔗 ${p.name}` : "🔗 Broken";
      } catch(e) { return "🔗 Broken"; }
    }
    return "Raw Hex (⚠️ 하드코딩됨)"; 
  };

  for (const v of semVars.sort((a,b) => a.name.localeCompare(b.name))) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.itemSpacing = 24;
    row.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
    row.paddingTop = 16; row.paddingBottom = 16; row.paddingLeft = 16; row.paddingRight = 16;
    row.cornerRadius = 16; row.counterAxisAlignItems = "CENTER";

    row.appendChild(createText(v.name, 318, true, "#333333")); // 350 - 32 padding

    const createModeSwatch = async (modeId, modeNode) => {
      const frame = figma.createFrame();
      frame.layoutMode = "HORIZONTAL"; frame.itemSpacing = 16; frame.counterAxisAlignItems = "CENTER";
      frame.resize(300, 48); frame.fills = [];
      
      // 해당 영역에 강제로 모드를 걸어 시각화
      try { frame.setExplicitVariableModeForCollection(semColl, modeId); } catch(e){}

      const rect = figma.createRectangle();
      rect.resize(48, 48); rect.cornerRadius = 8;
      try { rect.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb(255,255,255) }, 'color', v)]; } catch(e){}
      rect.strokes = [{type:'SOLID', color: rgb(0.8,0.8,0.8)}];

      const val = v.valuesByMode[modeId];
      const aliasText = await resolveAlias(val);
      const isHardcoded = aliasText.includes("Raw");
      
      frame.appendChild(rect);
      frame.appendChild(createText(aliasText, 220, false, isHardcoded ? "#EF4444" : "#666666"));
      return frame;
    };

    row.appendChild(await createModeSwatch(lightModeId));
    row.appendChild(await createModeSwatch(darkModeId));
    semSection.appendChild(row);
  }
  board.appendChild(semSection);
  
  figma.currentPage.appendChild(board);
  figma.viewport.scrollAndZoomIntoView([board]);
  console.log("🎉 V4 구조의 완벽한 파운데이션 시각화 보드가 생성되었습니다!");
})();