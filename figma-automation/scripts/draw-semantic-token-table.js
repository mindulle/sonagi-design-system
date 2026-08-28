async function drawSemanticTokenTableV4() {
  const fontFam = "Pretendard";
  let fontBold = { family: fontFam, style: "SemiBold" };
  let fontReg = { family: fontFam, style: "Regular" };

  try {
    await figma.loadFontAsync(fontBold);
    await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontBold = { family: "Inter", style: "SemiBold" };
    fontReg = { family: "Inter", style: "Regular" };
    await figma.loadFontAsync(fontBold);
    await figma.loadFontAsync(fontReg);
  }

  const allColors = await figma.variables.getLocalVariablesAsync("COLOR");
  const isPrimitive = (name) => /^(blue|red|green|orange|gray|base)\//i.test(name);
  const semantics = allColors.filter(v => v.name.includes('/') && !isPrimitive(v.name));
  
  const collectionId = semantics[0].variableCollectionId;
  const collection = await figma.variables.getVariableCollectionByIdAsync(collectionId);
  const modes = collection.modes; 
  
  const lightMode = modes.find(m => m.name.toLowerCase().includes("light") || m.name.includes("낮")) || modes[0];
  const darkMode = modes.find(m => m.name.toLowerCase().includes("dark") || m.name.includes("밤")) || modes[1] || modes[0];

  const table = figma.createFrame();
  table.name = "2. Semantic Tokens (V4 Style)";
  table.layoutMode = "VERTICAL";
  table.itemSpacing = 0; 
  table.paddingLeft = 40; table.paddingRight = 40; table.paddingTop = 40; table.paddingBottom = 40;
  table.cornerRadius = 16;
  table.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  table.primaryAxisSizingMode = "AUTO";
  table.counterAxisSizingMode = "AUTO";

  const createText = (text, width, font, color = {r:0,g:0,b:0}) => {
    const t = figma.createText();
    t.fontName = font;
    t.characters = text;
    t.fontSize = 13;
    t.fills = [{type: 'SOLID', color: color}];
    if (width) t.resize(width, t.height);
    return t;
  };

  const header = figma.createFrame();
  header.layoutMode = "HORIZONTAL";
  header.itemSpacing = 24;
  header.paddingBottom = 16; 
  header.counterAxisAlignItems = "CENTER"; 
  header.fills = [];
  header.appendChild(createText("Token Name", 260, fontBold));
  header.appendChild(createText(`☀️ Light Mode (${lightMode.name})`, 220, fontBold));
  header.appendChild(createText(`🌙 Dark Mode (${darkMode.name})`, 220, fontBold));
  table.appendChild(header);

  semantics.sort((a, b) => a.name.localeCompare(b.name));

  for (const v of semantics) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.itemSpacing = 24;
    row.paddingTop = 16; row.paddingBottom = 16; 
    row.counterAxisAlignItems = "CENTER"; 
    row.fills = [];
    row.strokes = [{type: 'SOLID', color: {r:0,g:0,b:0}, opacity: 0.05}];
    row.strokeBottomWeight = 1;

    row.appendChild(createText(v.name, 260, fontBold, {r: 0.1, g: 0.1, b: 0.1}));

    const createSwatchWithAlias = async (modeId) => {
      const cell = figma.createFrame();
      cell.layoutMode = "HORIZONTAL";
      cell.itemSpacing = 12;
      cell.counterAxisAlignItems = "CENTER"; 
      cell.fills = [];
      cell.primaryAxisSizingMode = "FIXED";
      cell.counterAxisSizingMode = "AUTO";
      cell.resize(220, 24); 

      const colorBox = figma.createFrame();
      colorBox.resize(24, 24);
      colorBox.cornerRadius = 4;
      const fill = figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v);
      colorBox.fills = [fill];
      colorBox.strokes = [{type:'SOLID', color:{r:0,g:0,b:0}, opacity:0.15}];
      colorBox.setExplicitVariableModeForCollection(collection, modeId);

      cell.appendChild(colorBox);

      const value = v.valuesByMode[modeId];
      let aliasText = "🔗 Value";
      if (value && value.type === "VARIABLE_ALIAS") {
        const aliasVar = await figma.variables.getVariableByIdAsync(value.id);
        if (aliasVar) aliasText = `🔗 ${aliasVar.name}`;
      } else if (value && typeof value === 'object' && 'r' in value) {
        aliasText = "Hex Value"; 
      }
      
      cell.appendChild(createText(aliasText, null, fontReg, {r: 0.4, g: 0.4, b: 0.4}));
      return cell;
    };

    const lightCell = await createSwatchWithAlias(lightMode.modeId);
    const darkCell = await createSwatchWithAlias(darkMode.modeId);
    
    row.appendChild(lightCell);
    row.appendChild(darkCell);
    table.appendChild(row);
  }

  figma.currentPage.appendChild(table);
  figma.viewport.scrollAndZoomIntoView([table]);
  figma.currentPage.selection = [table];
  console.log("✅ V4 스타일 (정렬 완벽 수정본) 시맨틱 토큰 테이블 생성 완료!");
}

drawSemanticTokenTableV4();