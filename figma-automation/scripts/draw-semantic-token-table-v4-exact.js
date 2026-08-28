async function drawSemanticTokenTableV4_Exact() {
  const fontFam = "Pretendard";
  let fontBold = { family: fontFam, style: "SemiBold" };
  let fontReg = { family: fontFam, style: "Regular" };

  try {
    await figma.loadFontAsync(fontBold);
    await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontBold = { family: "Pretendard", style: "SemiBold" };
    fontReg = { family: "Pretendard", style: "Regular" };
    await figma.loadFontAsync(fontBold);
    await figma.loadFontAsync(fontReg);
  }

  const allColors = await figma.variables.getLocalVariablesAsync("COLOR");
  const isPrimitive = (name) => /^(brand-blue|blue|red|green|orange|gray|base)\//i.test(name);
  const semantics = allColors.filter(v => v.name.includes('/') && !isPrimitive(v.name));
  
  const collectionId = semantics[0].variableCollectionId;
  const collection = await figma.variables.getVariableCollectionByIdAsync(collectionId);
  const modes = collection.modes; 
  
  const lightMode = modes.find(m => m.name.toLowerCase().includes("light") || m.name.includes("낮")) || modes[0];
  const darkMode = modes.find(m => m.name.toLowerCase().includes("dark") || m.name.includes("밤")) || modes[1] || modes[0];

  const table = figma.createFrame();
  table.name = "2. Semantic Tokens (Exact V4)";
  table.layoutMode = "VERTICAL";
  table.itemSpacing = 8; 
  table.fills = []; 
  table.primaryAxisSizingMode = "AUTO";
  table.counterAxisSizingMode = "AUTO";

  const createText = (text, width, font, size, color = {r:0,g:0,b:0}) => {
    const t = figma.createText();
    t.fontName = font;
    t.characters = text;
    t.fontSize = size;
    t.fills = [{type: 'SOLID', color: color}];
    if (width) t.resize(width, t.height);
    return t;
  };

  const header = figma.createFrame();
  header.layoutMode = "HORIZONTAL";
  header.itemSpacing = 24;
  header.paddingLeft = 24; header.paddingBottom = 8;
  header.counterAxisAlignItems = "CENTER"; 
  header.fills = [];
  header.appendChild(createText("Token Name", 280, fontBold, 15));
  header.appendChild(createText(`☀️ Light Mode (${lightMode.name})`, 220, fontBold, 14));
  header.appendChild(createText(`🌙 Dark Mode (${darkMode.name})`, 220, fontBold, 14));
  table.appendChild(header);

  semantics.sort((a, b) => a.name.localeCompare(b.name));

  for (const v of semantics) {
    const row = figma.createFrame();
    row.name = `Card: ${v.name}`;
    row.layoutMode = "HORIZONTAL";
    row.itemSpacing = 24;
    row.paddingTop = 16; row.paddingBottom = 16; 
    row.paddingLeft = 24; row.paddingRight = 24;
    row.counterAxisAlignItems = "CENTER"; 
    
    row.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    row.cornerRadius = 12;

    row.appendChild(createText(v.name, 280, fontBold, 15, {r: 0.15, g: 0.15, b: 0.15}));

    const createSwatchWithAlias = async (modeId) => {
      const cell = figma.createFrame();
      cell.layoutMode = "HORIZONTAL";
      cell.itemSpacing = 10;
      cell.counterAxisAlignItems = "CENTER"; 
      cell.fills = [];
      cell.primaryAxisSizingMode = "FIXED";
      cell.counterAxisSizingMode = "AUTO";
      cell.resize(220, 28); 

      const colorBox = figma.createFrame();
      colorBox.resize(28, 28);
      colorBox.cornerRadius = 6;
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
      
      cell.appendChild(createText(aliasText, null, fontReg, 14, {r: 0.4, g: 0.4, b: 0.4}));
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
  console.log("✅ V4 오리지널 스타일(카드형) 시맨틱 토큰 테이블 생성 완료!");
}

drawSemanticTokenTableV4_Exact();