async function createModalComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), muted: getVar("text/muted") },
    bg: { elevated: getVar("bg/elevated") },
    border: { default: getVar("border/default") },
    state: { danger: getVar("state/danger") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "Modal");
  await figma.setCurrentPageAsync(page);

  const buttonSet = figma.root.findOne(n => n.name === "Button" && n.type === "COMPONENT_SET");
  const realButton = buttonSet ? buttonSet.defaultVariant || buttonSet.children[0] : null;

  const types = ["Standard", "Destructive"];
  const components = [];
  let xOffset = 0;

  for (const type of types) {
    const comp = figma.createComponent();
    comp.name = `Type=${type}`;
    comp.layoutMode = "VERTICAL"; comp.primaryAxisSizingMode = "AUTO"; comp.counterAxisSizingMode = "FIXED";
    comp.resize(400, comp.height); 
    comp.paddingTop = 24; comp.paddingRight = 24; comp.paddingBottom = 24; comp.paddingLeft = 24;
    comp.itemSpacing = 16; comp.cornerRadius = 16;

    if (tokens.bg.elevated) comp.fills = [bindColor(tokens.bg.elevated)];
    if (tokens.border.default) { comp.strokes = [bindColor(tokens.border.default)]; comp.strokeWeight = 1; }
    comp.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 8 }, radius: 24, spread: 0, visible: true, blendMode: "NORMAL" }];

    const header = figma.createFrame(); header.name = "Header"; header.layoutMode = "HORIZONTAL"; header.layoutAlign = "STRETCH"; header.primaryAxisAlignItems = "SPACE_BETWEEN"; header.counterAxisAlignItems = "CENTER"; header.fills = []; header.counterAxisSizingMode = "AUTO";
    const title = figma.createText(); title.name = "Title"; title.characters = type === "Destructive" ? "Delete Account" : "Save Changes"; title.fontName = { family: "Inter", style: "Bold" }; title.fontSize = 18; title.layoutGrow = 1;
    let titleColor = type === "Destructive" && tokens.state.danger ? tokens.state.danger : tokens.text.primary;
    if (titleColor) title.fills = [bindColor(titleColor)]; header.appendChild(title);
    const iconWrapper = figma.createFrame(); iconWrapper.name = "Icon Wrapper"; iconWrapper.resize(24, 24); iconWrapper.fills = []; iconWrapper.layoutMode = "HORIZONTAL"; iconWrapper.primaryAxisAlignItems = "CENTER"; iconWrapper.counterAxisAlignItems = "CENTER";
    const closeIcon = figma.createVector(); closeIcon.name = "Close Icon"; closeIcon.vectorPaths = [{ windingRule: "NONE", data: "M 4 4 L 16 16 M 16 4 L 4 16" }];
    if (tokens.text.muted) { closeIcon.strokes = [bindColor(tokens.text.muted)]; closeIcon.strokeWeight = 2; closeIcon.strokeCap = "ROUND"; } closeIcon.resize(12, 12); iconWrapper.appendChild(closeIcon); header.appendChild(iconWrapper); comp.appendChild(header);

    const desc = figma.createText(); desc.name = "Description"; desc.characters = type === "Destructive" ? "Are you sure you want to permanently delete this account? This action cannot be undone." : "Your changes will be saved securely to the cloud. You can update them later in the settings."; desc.fontName = { family: "Inter", style: "Regular" }; desc.fontSize = 14; desc.layoutAlign = "STRETCH";
    if (tokens.text.secondary) desc.fills = [bindColor(tokens.text.secondary)]; comp.appendChild(desc);

    const footer = figma.createFrame(); footer.name = "Footer"; footer.layoutMode = "HORIZONTAL"; footer.layoutAlign = "STRETCH"; footer.primaryAxisAlignItems = "MAX"; footer.itemSpacing = 8; footer.paddingTop = 8; footer.fills = []; footer.counterAxisSizingMode = "AUTO";
    if (realButton) { footer.appendChild(realButton.createInstance()); footer.appendChild(realButton.createInstance()); } else { const dummy = figma.createFrame(); dummy.resize(80, 40); dummy.fills = [{type:"SOLID", color:{r:0.8,g:0.8,b:0.8}}]; footer.appendChild(dummy.clone()); footer.appendChild(dummy); }
    comp.appendChild(footer);

    comp.x = xOffset; comp.y = 0; components.push(comp); xOffset += 460;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage); componentSet.name = "Modal"; componentSet.x = 100; componentSet.y = 100; componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createModalComponent();
