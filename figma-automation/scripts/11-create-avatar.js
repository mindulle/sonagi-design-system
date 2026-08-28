async function createAvatarComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { secondary: getVar("text/secondary") },
    bg: { surface: getVar("bg/surface"), overlay: getVar("bg/overlay") },
    border: { subtle: getVar("border/subtle") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  let page = figma.root.children.find(p => p.name === "Avatar");
  if (!page) { page = figma.createPage(); page.name = "Avatar"; }
  await figma.setCurrentPageAsync(page);

  const sizes = [
    { name: "Lg", size: 48, fontSize: 18, iconScale: 24 },
    { name: "Md", size: 40, fontSize: 14, iconScale: 20 },
    { name: "Sm", size: 32, fontSize: 12, iconScale: 16 }
  ];
  const types = ["Image", "Initials", "Icon"];
  const components = []; let yOffset = 0;

  for (const sizeObj of sizes) {
    let xOffset = 0;
    for (const type of types) {
      const comp = figma.createComponent();
      comp.name = `Size=${sizeObj.name}, Type=${type}`;
      comp.layoutMode = "HORIZONTAL"; comp.primaryAxisSizingMode = "FIXED"; comp.counterAxisSizingMode = "FIXED";
      comp.primaryAxisAlignItems = "CENTER"; comp.counterAxisAlignItems = "CENTER";
      comp.resize(sizeObj.size, sizeObj.size); comp.cornerRadius = 999; comp.clipsContent = true;

      if (type === "Image") {
        if (tokens.bg.overlay) comp.fills = [bindColor(tokens.bg.overlay)];
      } else if (type === "Initials") {
        if (tokens.bg.surface) comp.fills = [bindColor(tokens.bg.surface)];
        if (tokens.border.subtle) { comp.strokes = [bindColor(tokens.border.subtle)]; comp.strokeWeight = 1; }
        const txt = figma.createText(); txt.name = "Initial"; txt.characters = "U"; txt.fontName = { family: "Pretendard", style: "Medium" }; txt.fontSize = sizeObj.fontSize;
        if (tokens.text.secondary) txt.fills = [bindColor(tokens.text.secondary)]; comp.appendChild(txt);
      } else if (type === "Icon") {
        if (tokens.bg.surface) comp.fills = [bindColor(tokens.bg.surface)];
        if (tokens.border.subtle) { comp.strokes = [bindColor(tokens.border.subtle)]; comp.strokeWeight = 1; }
        const iconFrame = figma.createFrame(); iconFrame.name = "User Icon"; iconFrame.layoutMode = "NONE"; iconFrame.fills = []; iconFrame.resize(sizeObj.iconScale, sizeObj.iconScale);
        const head = figma.createEllipse(); head.name = "Head"; const headSize = sizeObj.iconScale * 0.4; head.resize(headSize, headSize); head.x = (sizeObj.iconScale - headSize) / 2; head.y = sizeObj.iconScale * 0.15;
        if (tokens.text.secondary) head.fills = [bindColor(tokens.text.secondary)]; iconFrame.appendChild(head);
        const body = figma.createEllipse(); body.name = "Body"; const bodyW = sizeObj.iconScale * 0.8; const bodyH = sizeObj.iconScale * 0.7; body.resize(bodyW, bodyH); body.x = (sizeObj.iconScale - bodyW) / 2; body.y = head.y + headSize + (sizeObj.iconScale * 0.05);
        if (tokens.text.secondary) body.fills = [bindColor(tokens.text.secondary)]; iconFrame.appendChild(body);
        comp.appendChild(iconFrame);
      }
      comp.x = xOffset; comp.y = yOffset; components.push(comp); xOffset += 120;
    }
    yOffset += 100;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Avatar"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createAvatarComponent();
