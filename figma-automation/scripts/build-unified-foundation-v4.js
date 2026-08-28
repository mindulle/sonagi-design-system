async function buildUnifiedFoundationBoard() {
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });

  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  
  const primColl = collections.find(c => c.name.includes("Primitive"));
  const primVars = [];
  if (primColl) {
    for (const id of primColl.variableIds) {
      try { primVars.push(await figma.variables.getVariableByIdAsync(id)); } catch(e){}
    }
  }

  const semColl = collections.find(c => c.name.includes("Semantic") || c.name.includes("Color Tokens"));
  if (!semColl) return console.log("❌ Semantic 컬렉션을 찾을 수 없습니다.");
  
  const lightModeId = semColl.modes.find(m => m.name.includes("Light") || m.name.includes("낮")).modeId;
  const darkModeId = semColl.modes.find(m => m.name.includes("Dark") || m.name.includes("밤")).modeId;

  const semVars = [];
  for (const id of semColl.variableIds) {
    try { semVars.push(await figma.variables.getVariableByIdAsync(id)); } catch(e){}
  }
  const isPrim = (name) => /^(brand-blue|blue|red|green|orange|gray|base)\//i.test(name);
  const filteredSemVars = semVars.filter(v => v.name.includes('/') && !isPrim(v.name));

  const board = figma.createFrame();
  board.name = "✨ Sonagi Design Foundation V4 (Unified)";
  board.layoutMode = "VERTICAL";
  board.itemSpacing = 100; 
  board.paddingTop = 100; board.paddingBottom = 100;
  board.paddingLeft = 100; board.paddingRight = 100;
  board.cornerRadius = 32;
  board.fills = [{ type: 'SOLID', color: rgb(250, 250, 252) }];

  const title = figma.createText();
  title.characters = "Sonagi Design Foundation V4";
  title.fontSize = 64;
  title.fontName = { family: "Pretendard", style: "Bold" };
  board.appendChild(title);

  const createText = (str, w, isBold, colorHex = "#000000", size = 16) => {
    const t = figma.createText();
    t.characters = str; t.fontSize = size;
    t.fontName = { family: "Pretendard", style: isBold ? "Bold" : "Medium" };
    const h = colorHex.replace('#', '');
    t.fills = [{ type: 'SOLID', color: rgb(parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)) }];
    if(w) t.resize(w, t.height);
    return t;
  };

  const primSection = figma.createFrame();
  primSection.name = "1. Primitive Colors";
  primSection.layoutMode = "VERTICAL";
  primSection.itemSpacing = 24;
  primSection.fills = [];

  primSection.appendChild(createText("1. Primitive Colors (물감 진열대)", null, true, "#64646E", 32));

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
    row.layoutMode = "HORIZONTAL"; row.itemSpacing = 16; row.fills = []; row.counterAxisAlignItems = "CENTER";
    row.appendChild(createText(group.toUpperCase(), 180, true, "#000000", 20));

    const vars = colorGroups[group].sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));
    for (const v of vars) {
      const chip = figma.createFrame();
      chip.layoutMode = "VERTICAL"; chip.itemSpacing = 8; chip.fills = [];
      
      const rect = figma.createRectangle();
      rect.resize(80, 80); rect.cornerRadius = 12;
      rect.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb(255,255,255) }, 'color', v)];
      if(v.name === "base/white") rect.strokes = [{type:'SOLID', color: rgb(200,200,200)}];
      
      chip.appendChild(rect); 
      chip.appendChild(createText(v.name.split('/')[1] || v.name, null, false, "#000000", 14)); 
      row.appendChild(chip);
    }
    primSection.appendChild(row);
  }
  board.appendChild(primSection);

  const semSection = figma.createFrame();
  semSection.name = "2. Semantic Tokens";
  semSection.layoutMode = "VERTICAL";
  semSection.itemSpacing = 16;
  semSection.fills = [];

  semSection.appendChild(createText("2. Semantic Tokens (의미 매핑 테이블)", null, true, "#64646E", 32));

  const headerRow = figma.createFrame();
  headerRow.layoutMode = "HORIZONTAL"; headerRow.itemSpacing = 24; headerRow.fills = [];
  headerRow.appendChild(createText("Token Name", 350, true, "#000000", 20));
  headerRow.appendChild(createText("☀️ Light Mode (가을 소나기 볕)", 300, true, "#000000", 20));
  headerRow.appendChild(createText("🌙 Dark Mode (가을 소나기 밤)", 300, true, "#000000", 20));
  semSection.appendChild(headerRow);

  const resolveAlias = async (val) => {
    if (!val) return "NULL";
    if (val.type === "VARIABLE_ALIAS") {
      try {
        const p = await figma.variables.getVariableByIdAsync(val.id);
        return p ? `🔗 ${p.name}` : "🔗 Broken";
      } catch(e) { return "🔗 Broken"; }
    }
    return "Hex Value"; 
  };

  for (const v of filteredSemVars.sort((a,b) => a.name.localeCompare(b.name))) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL"; row.itemSpacing = 24; row.fills = []; 
    row.paddingTop = 4; row.paddingBottom = 4; row.counterAxisAlignItems = "CENTER";

    row.appendChild(createText(v.name, 350, true, "#333333", 18));

    const createModeCell = async (modeId) => {
      const cell = figma.createFrame();
      cell.layoutMode = "HORIZONTAL"; cell.itemSpacing = 16; cell.counterAxisAlignItems = "CENTER";
      cell.resize(300, 56); 
      cell.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }]; 
      cell.cornerRadius = 16;
      cell.paddingLeft = 16; cell.paddingRight = 16;

      const rect = figma.createRectangle();
      rect.resize(32, 32); rect.cornerRadius = 8;
      try { rect.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: rgb(255,255,255) }, 'color', v)]; } catch(e){}
      rect.strokes = [{type:'SOLID', color: rgb(0.85,0.85,0.85)}];
      rect.setExplicitVariableModeForCollection(semColl, modeId);

      const val = v.valuesByMode[modeId];
      const aliasText = await resolveAlias(val);
      
      cell.appendChild(rect);
      cell.appendChild(createText(aliasText, 220, false, "#666666", 16));
      return cell;
    };

    row.appendChild(await createModeCell(lightModeId));
    row.appendChild(await createModeCell(darkModeId));
    semSection.appendChild(row);
  }
  
  board.appendChild(semSection);
  
  figma.currentPage.appendChild(board);
  figma.viewport.scrollAndZoomIntoView([board]);
  figma.currentPage.selection = [board];
  console.log("🎉 완벽하게 통합된 V4 디자인 파운데이션 보드가 렌더링되었습니다!");
}

buildUnifiedFoundationBoard();