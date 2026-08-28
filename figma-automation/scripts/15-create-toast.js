async function createToastComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), muted: getVar("text/muted"), inverse: getVar("text/inverse") },
    bg: { elevated: getVar("bg/elevated") },
    border: { default: getVar("border/default") },
    state: { danger: getVar("state/danger"), success: getVar("state/success"), warning: getVar("state/warning"), info: getVar("state/info") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "Toast");
  if (!page) { page = figma.createPage(); page.name = "Toast"; }
  await figma.setCurrentPageAsync(page);

  const types = ["Info", "Success", "Warning", "Danger"];
  const components = []; let yOffset = 0;

  for (const type of types) {
    const comp = figma.createComponent(); comp.name = `Type=${type}`;
    comp.layoutMode = "HORIZONTAL"; comp.primaryAxisSizingMode = "FIXED"; comp.counterAxisSizingMode = "AUTO";
    comp.resize(360, comp.height); comp.primaryAxisAlignItems = "MIN"; comp.counterAxisAlignItems = "MIN";
    comp.paddingTop = 16; comp.paddingRight = 16; comp.paddingBottom = 16; comp.paddingLeft = 16;
    comp.itemSpacing = 12; comp.cornerRadius = 8;
    
    if (tokens.bg.elevated) comp.fills = [bindColor(tokens.bg.elevated)];
    if (tokens.border.default) { comp.strokes = [bindColor(tokens.border.default)]; comp.strokeWeight = 1; }
    comp.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 8 }, radius: 20, spread: 0, visible: true, blendMode: "NORMAL" }];

    const iconWrapper = figma.createFrame(); iconWrapper.name = "Status Icon"; iconWrapper.layoutMode = "HORIZONTAL";
    iconWrapper.primaryAxisSizingMode = "FIXED"; iconWrapper.counterAxisSizingMode = "FIXED"; iconWrapper.resize(24, 24);
    iconWrapper.cornerRadius = 12; iconWrapper.primaryAxisAlignItems = "CENTER"; iconWrapper.counterAxisAlignItems = "CENTER";
    const stateToken = tokens.state[type.toLowerCase()]; if (stateToken) iconWrapper.fills = [bindColor(stateToken)];

    const iconMark = figma.createVector(); iconMark.name = "Mark";
    if (type === "Success") iconMark.vectorPaths = [{ windingRule: "NONE", data: "M 4 8 L 7 11 L 13 4" }];
    else if (type === "Danger") iconMark.vectorPaths = [{ windingRule: "NONE", data: "M 5 5 L 11 11 M 11 5 L 5 11" }];
    else if (type === "Warning") iconMark.vectorPaths = [{ windingRule: "NONE", data: "M 8 3 L 8 9 M 8 13 L 8 13.5" }];
    else iconMark.vectorPaths = [{ windingRule: "NONE", data: "M 8 3 L 8 3.5 M 8 7 L 8 13" }];
    if (tokens.text.inverse) { iconMark.strokes = [bindColor(tokens.text.inverse)]; iconMark.strokeWeight = 2; iconMark.strokeCap = "ROUND"; iconMark.strokeJoin = "ROUND"; }
      iconWrapper.appendChild(iconMark); comp.appendChild(iconWrapper);

    const textGroup = figma.createFrame(); textGroup.name = "Content"; textGroup.layoutMode = "VERTICAL"; textGroup.layoutGrow = 1; textGroup.fills = []; textGroup.itemSpacing = 4;
    const title = figma.createText(); title.name = "Title"; title.characters = `${type} message`; title.fontName = { family: "Pretendard", style: "Medium" }; title.fontSize = 14;
    if (tokens.text.primary) title.fills = [bindColor(tokens.text.primary)];
    const desc = figma.createText(); desc.name = "Description"; desc.characters = "This is a detailed description of the notification. It can wrap to multiple lines if needed."; desc.fontName = { family: "Pretendard", style: "Regular" }; desc.fontSize = 14; desc.textAutoResize = "HEIGHT"; desc.layoutAlign = "STRETCH";
    if (tokens.text.secondary) desc.fills = [bindColor(tokens.text.secondary)];
    textGroup.appendChild(title); textGroup.appendChild(desc); comp.appendChild(textGroup);

    const closeWrapper = figma.createFrame(); closeWrapper.name = "Close Wrapper"; closeWrapper.layoutMode = "HORIZONTAL"; closeWrapper.primaryAxisSizingMode = "FIXED"; closeWrapper.counterAxisSizingMode = "FIXED"; closeWrapper.resize(24, 24); closeWrapper.fills = []; closeWrapper.primaryAxisAlignItems = "CENTER"; closeWrapper.counterAxisAlignItems = "CENTER";
    const closeIcon = figma.createVector(); closeIcon.name = "Close Icon"; closeIcon.vectorPaths = [{ windingRule: "NONE", data: "M 4 4 L 12 12 M 12 4 L 4 12" }];
    if (tokens.text.muted) { closeIcon.strokes = [bindColor(tokens.text.muted)]; closeIcon.strokeWeight = 1.5; closeIcon.strokeCap = "ROUND"; }
    closeIcon.resize(16, 16); closeWrapper.appendChild(closeIcon); comp.appendChild(closeWrapper);

    comp.x = 0; comp.y = yOffset; components.push(comp); yOffset += 140;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Toast"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createToastComponent();
