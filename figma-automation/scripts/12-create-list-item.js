async function createListItemComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), muted: getVar("text/muted") },
    bg: { overlay: getVar("bg/overlay") }
  };
  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "List Item");
  await figma.setCurrentPageAsync(page);

  const avatarSet = figma.root.findOne(n => n.name === "Avatar" && n.type === "COMPONENT_SET");
  const realAvatar = avatarSet ? (avatarSet.children.find(c => c.name.includes("Size=Md") && c.name.includes("Type=Icon")) || avatarSet.defaultVariant || avatarSet.children[0]) : null;

  const types = ["Basic", "With Avatar", "With Action"];
  const states = ["Default", "Hover"];
  const components = [];
  let yOffset = 0;

  for (const type of types) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Type=${type}, State=${state}`;
      
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisSizingMode = "FIXED"; comp.counterAxisSizingMode = "AUTO";
      comp.resize(360, comp.height);
      comp.primaryAxisAlignItems = "MIN"; comp.counterAxisAlignItems = "CENTER";
      comp.paddingTop = 12; comp.paddingBottom = 12; comp.paddingLeft = 16; comp.paddingRight = 16; comp.itemSpacing = 16;

      if (state === "Hover" && tokens.bg.overlay) comp.fills = [bindColor(tokens.bg.overlay)];
      else comp.fills = [];

      if ((type === "With Avatar" || type === "With Action") && realAvatar) {
        comp.appendChild(realAvatar.createInstance());
      }

      const textGroup = figma.createFrame(); textGroup.name = "Content";
      textGroup.layoutMode = "VERTICAL"; textGroup.layoutGrow = 1; textGroup.fills = []; textGroup.itemSpacing = 4;

      const title = figma.createText(); title.name = "Title"; title.characters = "List Item Title";
      title.fontName = { family: "Inter", style: "Medium" }; title.fontSize = 16;
      if (tokens.text.primary) title.fills = [bindColor(tokens.text.primary)];
      
      const sub = figma.createText(); sub.name = "Subtitle"; sub.characters = "This is a supporting description.";
      sub.fontName = { family: "Inter", style: "Regular" }; sub.fontSize = 14;
      if (tokens.text.secondary) sub.fills = [bindColor(tokens.text.secondary)];

      textGroup.appendChild(title); textGroup.appendChild(sub); comp.appendChild(textGroup);

      if (type === "With Action") {
        const iconWrapper = figma.createFrame(); iconWrapper.name = "Icon Wrapper";
        iconWrapper.layoutMode = "HORIZONTAL"; iconWrapper.primaryAxisSizingMode = "FIXED"; iconWrapper.counterAxisSizingMode = "FIXED"; iconWrapper.resize(24, 24); iconWrapper.fills = [];
        iconWrapper.primaryAxisAlignItems = "CENTER"; iconWrapper.counterAxisAlignItems = "CENTER";
        const chevronRight = figma.createVector(); chevronRight.name = "Chevron Right";
        chevronRight.vectorPaths = [{ windingRule: "NONE", data: "M 9 6 L 15 12 L 9 18" }];
        if (tokens.text.muted) { chevronRight.strokes = [bindColor(tokens.text.muted)]; chevronRight.strokeWeight = 1.5; chevronRight.strokeCap = "ROUND"; chevronRight.strokeJoin = "ROUND"; }
        chevronRight.resize(12, 12); iconWrapper.appendChild(chevronRight); comp.appendChild(iconWrapper);
      }
      comp.x = xOffset; comp.y = yOffset; components.push(comp); xOffset += 400;
    }
    yOffset += 120;
  }
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "List Item"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createListItemComponent();
