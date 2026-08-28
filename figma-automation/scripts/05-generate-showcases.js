async function generateShowcases() {
  if (figma.currentPage.selection.length !== 1 || figma.currentPage.selection[0].type !== "COMPONENT_SET") {
    console.error("❌ 마스터 컴포넌트 세트를 1개만 선택해주세요."); return;
  }
  const master = figma.currentPage.selection[0];
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const lightMode = colorsColl.modes.find(m => m.name.toLowerCase().includes("light") || m.name === "Mode 1");
  const darkMode = colorsColl.modes.find(m => m.name.toLowerCase().includes("dark"));
  const allVars = await figma.variables.getLocalVariablesAsync();
  const bgBase = allVars.find(v => v.variableCollectionId === colorsColl.id && v.name === "bg/base");

  let maxX = 0, maxY = 0;
  master.children.forEach(c => {
    if (c.x + c.width > maxX) maxX = c.x + c.width;
    if (c.y + c.height > maxY) maxY = c.y + c.height;
  });

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

  master.children.forEach(variant => {
    const inst = variant.createInstance();
    inst.x = variant.x + 50; inst.y = variant.y + 50;
    lightSection.appendChild(inst);
  });

  const darkSection = figma.createSection();
  darkSection.name = "🌙 Dark Mode Showcase";
  darkSection.resize(maxX + 100, maxY + 100);
  darkSection.x = lightSection.x + lightSection.width + 100; darkSection.y = master.y;
  darkSection.fills = [bindColor(0, 0, 0, bgBase)];
  if (darkMode) darkSection.setExplicitVariableModeForCollection(colorsColl, darkMode.modeId);

  master.children.forEach(variant => {
    const inst = variant.createInstance();
    inst.x = variant.x + 50; inst.y = variant.y + 50;
    darkSection.appendChild(inst);
  });

  figma.viewport.scrollAndZoomIntoView([master, lightSection, darkSection]);
}
generateShowcases();
