async function createTabsComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), disabled: getVar("text/disabled") },
    brand: { primary: getVar("brand/primary"), hover: getVar("brand/primary-hover") },
    border: { strong: getVar("border/strong") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  let page = figma.root.children.find(p => p.name === "Tabs");
  await figma.setCurrentPageAsync(page);

  const selectedOpts = ["False", "True"];
  const states = ["Default", "Hover", "Disabled"];
  const components = []; let yOffset = 0;

  for (const selected of selectedOpts) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent(); comp.name = `Selected=${selected}, State=${state}`;
      comp.layoutMode = "VERTICAL"; comp.primaryAxisSizingMode = "AUTO"; comp.counterAxisSizingMode = "AUTO";
      comp.primaryAxisAlignItems = "MIN"; comp.counterAxisAlignItems = "CENTER"; comp.fills = [];

      const textWrapper = figma.createFrame(); textWrapper.name = "Text Wrapper"; textWrapper.layoutMode = "HORIZONTAL";
      textWrapper.paddingLeft = 16; textWrapper.paddingRight = 16; textWrapper.paddingTop = 12; textWrapper.paddingBottom = 10; textWrapper.fills = [];
      const label = figma.createText(); label.name = "Label"; label.characters = "Tab Item"; label.fontName = { family: "Pretendard", style: "Medium" }; label.fontSize = 14;
      
      let textColor = tokens.text.secondary;
      if (state === "Disabled") textColor = tokens.text.disabled; else if (selected === "True") textColor = tokens.brand.primary; else if (state === "Hover") textColor = tokens.text.primary;
      if (textColor) label.fills = [bindColor(textColor)]; textWrapper.appendChild(label); comp.appendChild(textWrapper);

      const indicator = figma.createFrame(); indicator.name = "Indicator"; indicator.layoutMode = "NONE"; indicator.layoutAlign = "STRETCH"; indicator.resize(100, 2);
      let indicatorColor = null;
      if (selected === "True") { indicatorColor = (state === "Hover") ? tokens.brand.hover : tokens.brand.primary; if (state === "Disabled") indicatorColor = tokens.text.disabled; }
      else if (state === "Hover") indicatorColor = tokens.border.strong;
      if (indicatorColor) indicator.fills = [bindColor(indicatorColor)]; else indicator.fills = [];
      comp.appendChild(indicator);

      comp.x = xOffset; comp.y = yOffset; components.push(comp); xOffset += 160;
    }
    yOffset += 100;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Tab Item"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createTabsComponent();
