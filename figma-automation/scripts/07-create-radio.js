async function createRadioComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), inverse: getVar("text/inverse"), disabled: getVar("text/disabled") },
    bg: { base: getVar("bg/base"), surface: getVar("bg/surface") },
    border: { default: getVar("border/default"), strong: getVar("border/strong") },
    brand: { primary: getVar("brand/primary"), hover: getVar("brand/primary-hover") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  let page = figma.root.children.find(p => p.name === "Radio");
  if (!page) { page = figma.createPage(); page.name = "Radio"; }
  await figma.setCurrentPageAsync(page);

  const checks = ["False", "True"];
  const states = ["Default", "Hover", "Focused", "Disabled"];
  const components = [];
  let yOffset = 0;

  for (const checked of checks) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Checked=${checked}, State=${state}`;
      comp.layoutMode = "HORIZONTAL"; comp.primaryAxisSizingMode = "AUTO"; comp.counterAxisSizingMode = "AUTO";
      comp.counterAxisAlignItems = "CENTER"; comp.itemSpacing = 8;
      comp.paddingLeft = 4; comp.paddingRight = 4; comp.paddingTop = 4; comp.paddingBottom = 4;

      const box = figma.createFrame();
      box.name = "Box"; box.layoutMode = "HORIZONTAL"; box.primaryAxisSizingMode = "FIXED"; box.counterAxisSizingMode = "FIXED";
      box.resize(20, 20); box.cornerRadius = 10; box.primaryAxisAlignItems = "CENTER"; box.counterAxisAlignItems = "CENTER";
      
      let fillVar = tokens.bg.surface; let strokeVar = tokens.border.default; let strokeWeight = 1.5;

      if (checked === "False") {
        if (state === "Hover") strokeVar = tokens.border.strong;
        if (state === "Focused") { strokeVar = tokens.brand.primary; strokeWeight = 2; }
        if (state === "Disabled") { fillVar = tokens.bg.base; strokeVar = tokens.border.default; }
      } else {
        fillVar = tokens.brand.primary; strokeVar = null; 
        if (state === "Hover") fillVar = tokens.brand.hover;
        if (state === "Disabled") { fillVar = tokens.bg.base; strokeVar = tokens.border.default; }
      }
      if (fillVar) box.fills = [bindColor(fillVar)]; else box.fills = [];
      if (strokeVar) { box.strokes = [bindColor(strokeVar)]; box.strokeWeight = strokeWeight; } else { box.strokes = []; }

      if (checked === "True") {
        const dot = figma.createFrame(); dot.name = "Dot"; dot.resize(8, 8); dot.cornerRadius = 4;
        let dotColor = (state === "Disabled") ? tokens.text.disabled : tokens.text.inverse;
        if (dotColor) dot.fills = [bindColor(dotColor)];
        box.appendChild(dot);
      }
      comp.appendChild(box);

      const label = figma.createText(); label.name = "Label"; label.characters = "Select this option";
      label.fontName = { family: "Inter", style: "Medium" }; label.fontSize = 14;
      let labelVar = (state === "Disabled") ? tokens.text.disabled : tokens.text.primary;
      if (labelVar) label.fills = [bindColor(labelVar)];
      comp.appendChild(label);

      comp.x = xOffset; comp.y = yOffset; components.push(comp);
      xOffset += 300;
    }
    yOffset += 100;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Radio"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createRadioComponent();
