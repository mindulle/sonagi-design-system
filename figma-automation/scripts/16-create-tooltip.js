async function createTooltipComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    bg: { inverse: getVar("bg/inverse") },
    text: { inverse: getVar("text/inverse") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  let page = figma.root.children.find(p => p.name === "Tooltip");
  await figma.setCurrentPageAsync(page);

  const types = ["Top", "Bottom"];
  const components = []; let xOffset = 0;

  for (const type of types) {
    const comp = figma.createComponent(); comp.name = `Position=${type}`;
    comp.layoutMode = "VERTICAL"; comp.primaryAxisSizingMode = "AUTO"; comp.counterAxisSizingMode = "AUTO";
    comp.primaryAxisAlignItems = "CENTER"; comp.counterAxisAlignItems = "CENTER";
    comp.fills = []; comp.itemSpacing = 0;

    const body = figma.createFrame(); body.name = "Body"; body.layoutMode = "HORIZONTAL";
    body.primaryAxisSizingMode = "AUTO"; body.counterAxisSizingMode = "AUTO";
    body.paddingTop = 6; body.paddingBottom = 6; body.paddingLeft = 12; body.paddingRight = 12;
    body.cornerRadius = 6;
    if (tokens.bg.inverse) body.fills = [bindColor(tokens.bg.inverse)];

    const text = figma.createText(); text.name = "Text"; text.characters = "This is a helpful tooltip";
    text.fontName = { family: "Inter", style: "Medium" }; text.fontSize = 12;
    if (tokens.text.inverse) text.fills = [bindColor(tokens.text.inverse)]; body.appendChild(text);

    const arrow = figma.createPolygon(); arrow.name = "Arrow"; arrow.resize(10, 5);
    if (tokens.bg.inverse) arrow.fills = [bindColor(tokens.bg.inverse)];

    if (type === "Top") { arrow.rotation = 180; comp.appendChild(body); comp.appendChild(arrow); }
    else { comp.appendChild(arrow); comp.appendChild(body); }

    comp.x = xOffset; comp.y = 0; components.push(comp); xOffset += 200;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Tooltip"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createTooltipComponent();
