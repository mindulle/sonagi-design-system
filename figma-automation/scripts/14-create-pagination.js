async function createPaginationComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), disabled: getVar("text/disabled"), inverse: getVar("text/inverse"), muted: getVar("text/muted") },
    brand: { primary: getVar("brand/primary"), hover: getVar("brand/primary-hover") },
    bg: { overlay: getVar("bg/overlay") },
    border: { subtle: getVar("border/subtle") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });

  let page = figma.root.children.find(p => p.name === "Pagination");
  await figma.setCurrentPageAsync(page);

  const types = ["Number", "Ellipsis", "Previous", "Next"];
  const states = ["Default", "Hover", "Selected", "Disabled"];
  const components = []; let yOffset = 0;

  for (const type of types) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent(); comp.name = `Type=${type}, State=${state}`;
      comp.layoutMode = "HORIZONTAL"; comp.primaryAxisSizingMode = "FIXED"; comp.counterAxisSizingMode = "FIXED";
      comp.primaryAxisAlignItems = "CENTER"; comp.counterAxisAlignItems = "CENTER";
      comp.resize(36, 36); comp.cornerRadius = 6; comp.fills = [];

      let textColor = tokens.text.secondary;

      if (type !== "Ellipsis") {
        if (state === "Selected") {
          if (tokens.brand.primary) comp.fills = [bindColor(tokens.brand.primary)];
          textColor = tokens.text.inverse;
        } else if (state === "Hover") {
          if (tokens.bg.overlay) comp.fills = [bindColor(tokens.bg.overlay)];
          textColor = tokens.text.primary;
        } else if (state === "Disabled") {
          textColor = tokens.text.disabled;
        }
      } else {
        textColor = tokens.text.muted || tokens.text.secondary;
      }

      if (type === "Number" || type === "Ellipsis") {
        const text = figma.createText(); text.name = "Text"; text.characters = type === "Number" ? "1" : "...";
        text.fontName = { family: "Pretendard", style: state === "Selected" ? "Bold" : "Medium" }; text.fontSize = 14;
        if (textColor) text.fills = [bindColor(textColor)]; comp.appendChild(text);
      } else {
        const iconWrapper = figma.createFrame(); iconWrapper.name = "Icon Wrapper"; iconWrapper.layoutMode = "HORIZONTAL";
        iconWrapper.primaryAxisSizingMode = "FIXED"; iconWrapper.counterAxisSizingMode = "FIXED"; iconWrapper.resize(20, 20);
        iconWrapper.primaryAxisAlignItems = "CENTER"; iconWrapper.counterAxisAlignItems = "CENTER"; iconWrapper.fills = [];
        const chevron = figma.createVector(); chevron.name = "Chevron";
        chevron.vectorPaths = [{ windingRule: "NONE", data: type === "Previous" ? "M 13 5 L 7 10 L 13 15" : "M 7 5 L 13 10 L 7 15" }];
        if (textColor) { chevron.strokes = [bindColor(textColor)]; chevron.strokeWeight = 1.5; chevron.strokeCap = "ROUND"; chevron.strokeJoin = "ROUND"; }
        chevron.resize(12, 12); iconWrapper.appendChild(chevron); comp.appendChild(iconWrapper);
      }
      comp.x = xOffset; comp.y = yOffset; components.push(comp); xOffset += 120;
    }
    yOffset += 100;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Pagination Item"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createPaginationComponent();
