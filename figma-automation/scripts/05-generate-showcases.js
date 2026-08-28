async function generateShowcases() {
  const selection = figma.currentPage.selection[0];
  if (!selection || (selection.type !== "COMPONENT_SET" && selection.type !== "COMPONENT")) {
    console.error("❌ 컴포넌트 세트나 단일 컴포넌트를 1개만 선택해주세요."); return;
  }
  const master = selection;
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const lightMode = colorsColl.modes.find(m => m.name.toLowerCase().includes("light") || m.name === "Mode 1");
  const darkMode = colorsColl.modes.find(m => m.name.toLowerCase().includes("dark"));
  const allVars = await figma.variables.getLocalVariablesAsync();
  const bgBase = allVars.find(v => v.variableCollectionId === colorsColl.id && v.name === "bg/base");

  const variants = master.type === "COMPONENT_SET" ? master.children : [master];
  let maxX = 0, maxY = 0;
  if (master.type === "COMPONENT_SET") {
    master.children.forEach(c => {
      if (c.x + c.width > maxX) maxX = c.x + c.width;
      if (c.y + c.height > maxY) maxY = c.y + c.height;
    });
  } else {
    maxX = master.width; maxY = master.height;
  }

  const bindColor = (r, g, b, variable) => {
    if (!variable) return { type: 'SOLID', color: {r, g, b} };
    return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r, g, b} }, 'color', variable);
  };

  const lightSection = figma.createSection();
  lightSection.name = "☀️ Light Mode Showcase";
  lightSection.resize(maxX + 100, maxY + 100);
  lightSection.x = master.x + master.width + 100; lightSection.y = master.y;
  lightSection.fills = [bindColor(1, 1, 1, bgBase)];
  if (lightMode) lightSection.setExplicitVariableModeForCollection(colorsColl, lightMode.modeId);

  variants.forEach(variant => {
    const inst = variant.createInstance();
    inst.x = master.type === "COMPONENT_SET" ? variant.x + 50 : 50; 
    inst.y = master.type === "COMPONENT_SET" ? variant.y + 50 : 50;
    lightSection.appendChild(inst);
  });

  const darkSection = figma.createSection();
  darkSection.name = "🌙 Dark Mode Showcase";
  darkSection.resize(maxX + 100, maxY + 100);
  darkSection.x = lightSection.x + lightSection.width + 100; darkSection.y = master.y;
  darkSection.fills = [bindColor(0, 0, 0, bgBase)];
  if (darkMode) darkSection.setExplicitVariableModeForCollection(colorsColl, darkMode.modeId);

  variants.forEach(variant => {
    const inst = variant.createInstance();
    inst.x = master.type === "COMPONENT_SET" ? variant.x + 50 : 50; 
    inst.y = master.type === "COMPONENT_SET" ? variant.y + 50 : 50;
    darkSection.appendChild(inst);
  });

  figma.viewport.scrollAndZoomIntoView([master, lightSection, darkSection]);
}
generateShowcases();
