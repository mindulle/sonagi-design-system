async function createPaginationComponentSet() {
  const fontObj = { family: "Pretendard", style: "Medium" };
  await figma.loadFontAsync(fontObj).catch(async () => {
    fontObj.family = "Inter";
    await figma.loadFontAsync(fontObj);
  });

  const colors = await figma.variables.getLocalVariablesAsync("COLOR");
  const floats = await figma.variables.getLocalVariablesAsync("FLOAT");
  
  const getV = name => colors.find(v => v.name === name);
  const getF = name => floats.find(v => v.name === name);

  const v = {
    rad: getF("radius/md"), 
    
    bgBase: getV("background/bg-base"),
    bgHov: getV("gray/100") || getV("background/bg-surface"), 
    bgActive: getV("brand/brand-primary"), 
    
    txtDef: getV("text/text-secondary"), 
    txtHov: getV("text/text-primary"), 
    txtActive: getV("text/text-inverse"), 
    txtDis: getV("state/state-disabled-text"), 
  };

  const variants = [];
  const matrix = [
    { type: "Number", state: "Default" }, { type: "Number", state: "Hover" }, { type: "Number", state: "Active" },
    { type: "Prev", state: "Default" }, { type: "Prev", state: "Hover" }, { type: "Prev", state: "Disabled" },
    { type: "Next", state: "Default" }, { type: "Next", state: "Hover" }, { type: "Next", state: "Disabled" },
    { type: "Ellipsis", state: "Default" }
  ];

  for (const item of matrix) {
    const pageItem = figma.createComponent();
    pageItem.name = `Type=${item.type}, State=${item.state}`;
    
    pageItem.resize(32, 32);
    pageItem.layoutMode = "VERTICAL";
    pageItem.primaryAxisAlignItems = "CENTER";
    pageItem.counterAxisAlignItems = "CENTER";
    pageItem.primaryAxisSizingMode = "FIXED"; 
    pageItem.counterAxisSizingMode = "FIXED";

    if (v.rad) { pageItem.setBoundVariable("topLeftRadius", v.rad); pageItem.setBoundVariable("topRightRadius", v.rad); pageItem.setBoundVariable("bottomLeftRadius", v.rad); pageItem.setBoundVariable("bottomRightRadius", v.rad); }
    else pageItem.cornerRadius = 8;

    let bg = null;
    if (item.state === "Hover") bg = v.bgHov;
    else if (item.state === "Active") bg = v.bgActive;
    
    if (bg) pageItem.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', bg)];
    else pageItem.fills = []; 

    let txtColor = v.txtDef;
    if (item.state === "Hover") txtColor = v.txtHov;
    else if (item.state === "Active") txtColor = v.txtActive;
    else if (item.state === "Disabled") txtColor = v.txtDis;

    const textNode = figma.createText();
    textNode.fontName = fontObj;
    textNode.fontSize = 14;

    if (item.type === "Number") textNode.characters = "1";
    else if (item.type === "Prev") textNode.characters = "〈";
    else if (item.type === "Next") textNode.characters = "〉";
    else if (item.type === "Ellipsis") textNode.characters = "…";

    if (txtColor) textNode.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', txtColor)];
    
    pageItem.appendChild(textNode);
    variants.push(pageItem);
  }

  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Pagination Item";
  compSet.layoutMode = "NONE"; 
  
  const cols = 3;
  const colWidth = 120;
  const rowHeight = 80;
  const padding = 40;

  variants.forEach((v, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    v.x = padding + (col * colWidth);
    v.y = padding + (row * rowHeight);
  });

  compSet.resize((cols * colWidth) + (padding * 2), (4 * rowHeight) + (padding * 2));
  compSet.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 } }];
  compSet.cornerRadius = 16;

  figma.viewport.scrollAndZoomIntoView([compSet]);
  figma.currentPage.selection = [compSet];
  console.log("✅ 웹 표준 규격의 Pagination Item 마스터 셋 생성 완료!");
}

createPaginationComponentSet();