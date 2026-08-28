async function createBadgeComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && v.name === name);

  const tokens = {
    Info: { text: getVar("state/info"), bg: getVar("state/info-bg") },
    Success: { text: getVar("state/success"), bg: getVar("state/success-bg") },
    Warning: { text: getVar("state/warning"), bg: getVar("state/warning-bg") },
    Danger: { text: getVar("state/danger"), bg: getVar("state/danger-bg") }
  };

  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  let page = figma.root.children.find(p => p.name === "Badge");
  if (!page) { page = figma.createPage(); page.name = "Badge"; }
  await figma.setCurrentPageAsync(page);

  const colors = ["Info", "Success", "Warning", "Danger"];
  const variants = ["Pill", "Label"];
  const components = [];
  let yOffset = 0;

  for (const color of colors) {
    let xOffset = 0;
    for (const variant of variants) {
      const comp = figma.createComponent();
      comp.name = `Color=${color}, Variant=${variant}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisSizingMode = "AUTO"; comp.counterAxisSizingMode = "AUTO";
      comp.primaryAxisAlignItems = "CENTER"; comp.counterAxisAlignItems = "CENTER";
      comp.paddingLeft = 10; comp.paddingRight = 10; comp.paddingTop = 4; comp.paddingBottom = 4;
      comp.cornerRadius = variant === "Pill" ? 999 : 6;

      if (tokens[color].bg) comp.fills = [bindColor(tokens[color].bg)];

      const label = figma.createText();
      label.name = "Text"; label.characters = color;
      label.fontName = { family: "Pretendard", style: "Medium" }; label.fontSize = 12;
      if (tokens[color].text) label.fills = [bindColor(tokens[color].text)];
      comp.appendChild(label);

      comp.x = xOffset; comp.y = yOffset; components.push(comp);
      xOffset += 120;
    }
    yOffset += 80;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Badge"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createBadgeComponent();
