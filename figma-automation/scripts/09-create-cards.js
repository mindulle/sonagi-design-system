async function createCardComponent() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getVar = (name) => allVars.find(v => v.variableCollectionId === colorsColl?.id && (v.name === name || v.name === name.replace("bg/", "background/")));

  const tokens = {
    text: { primary: getVar("text/primary"), secondary: getVar("text/secondary"), inverse: getVar("text/inverse") },
    bg: { surface: getVar("bg/surface"), overlay: getVar("bg/overlay") },
    border: { default: getVar("border/default"), strong: getVar("border/strong"), subtle: getVar("border/subtle") },
    brand: { primary: getVar("brand/primary") }
  };

  const bindColor = (variable) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0, g:0, b:0} }, 'color', variable);

  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "Cards");
  if (!page) { page = figma.createPage(); page.name = "Cards"; }
  await figma.setCurrentPageAsync(page);

  const types = ["Basic", "With Image", "With Action"];
  const states = ["Default", "Hover"];
  const components = [];
  let yOffset = 0;

  for (const type of types) {
    let xOffset = 0;
    for (const state of states) {
      const comp = figma.createComponent();
      comp.name = `Type=${type}, State=${state}`;
      
      comp.layoutMode = "VERTICAL";
      comp.primaryAxisSizingMode = "AUTO"; 
      comp.counterAxisSizingMode = "FIXED";
      comp.resize(360, comp.height); 
      comp.cornerRadius = 12; comp.clipsContent = true; comp.itemSpacing = 24;
      
      if (tokens.bg.surface) comp.fills = [bindColor(tokens.bg.surface)];
      let strokeVar = state === "Hover" ? tokens.border.strong : tokens.border.default;
      if (strokeVar) {
        comp.strokes = [bindColor(strokeVar)];
        comp.strokeWeight = 1;
      }

      if (type === "With Image") {
        comp.paddingTop = 0; comp.paddingRight = 0; comp.paddingBottom = 0; comp.paddingLeft = 0;
        const imageBox = figma.createFrame();
        imageBox.name = "Image Placeholder";
        imageBox.layoutMode = "NONE";
        imageBox.layoutAlign = "STRETCH"; 
        imageBox.resize(360, 160);
        if (tokens.bg.overlay) imageBox.fills = [bindColor(tokens.bg.overlay)];
        comp.appendChild(imageBox);
      }

      const content = figma.createFrame();
      content.name = "Content";
      content.layoutMode = "VERTICAL";
      content.layoutAlign = "STRETCH";
      content.primaryAxisSizingMode = "AUTO";
      content.itemSpacing = 8;
      
      if (type === "With Image") {
        content.paddingTop = 24; content.paddingRight = 24; content.paddingBottom = 24; content.paddingLeft = 24;
      } else {
        comp.paddingTop = 24; comp.paddingRight = 24; comp.paddingBottom = 24; comp.paddingLeft = 24;
        content.paddingTop = 0; content.paddingRight = 0; content.paddingBottom = 0; content.paddingLeft = 0;
      }
      content.fills = []; 

      const title = figma.createText();
      title.name = "Title"; title.characters = "Composition Card";
      title.fontName = { family: "Inter", style: "Bold" }; title.fontSize = 18;
      if (tokens.text.primary) title.fills = [bindColor(tokens.text.primary)];
      content.appendChild(title);

      const desc = figma.createText();
      desc.name = "Description"; 
      desc.characters = "This card represents a composition of various foundational elements. It uses bg/surface to stand out from the base background.";
      desc.fontName = { family: "Inter", style: "Regular" }; desc.fontSize = 14;
      desc.layoutAlign = "STRETCH";
      if (tokens.text.secondary) desc.fills = [bindColor(tokens.text.secondary)];
      content.appendChild(desc);

      comp.appendChild(content);

      if (type === "With Action") {

        const actionRow = figma.createFrame();
        actionRow.name = "Actions";
        actionRow.layoutMode = "HORIZONTAL";
        actionRow.layoutAlign = "STRETCH";
        actionRow.primaryAxisAlignItems = "MIN"; 
        actionRow.itemSpacing = 12;
        actionRow.paddingTop = 0;
        actionRow.fills = [];

        const button = figma.createFrame();
        button.name = "Button / Primary";
        button.layoutMode = "HORIZONTAL";
        button.primaryAxisAlignItems = "CENTER"; button.counterAxisAlignItems = "CENTER";
        button.paddingTop = 10; button.paddingBottom = 10; button.paddingLeft = 16; button.paddingRight = 16;
        button.cornerRadius = 6;
        if (tokens.brand.primary) button.fills = [bindColor(tokens.brand.primary)];

        const btnText = figma.createText();
        btnText.name = "Label"; btnText.characters = "Confirm";
        btnText.fontName = { family: "Inter", style: "Medium" }; btnText.fontSize = 14;
        if (tokens.text.inverse) btnText.fills = [bindColor(tokens.text.inverse)];
        button.appendChild(btnText);
        
        actionRow.appendChild(button);
        comp.appendChild(actionRow);
      }

      comp.x = xOffset; comp.y = yOffset; components.push(comp);
      xOffset += 440;
    }
    yOffset += 300;
  }

  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Card"; componentSet.x = 100; componentSet.y = 100;
  componentSet.fills = []; componentSet.paddingTop = 40; componentSet.paddingRight = 40; componentSet.paddingBottom = 40; componentSet.paddingLeft = 40;
  
  figma.viewport.scrollAndZoomIntoView([componentSet]);
}
createCardComponent();
