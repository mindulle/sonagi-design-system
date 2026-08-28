async function createCoverPage() {
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });

  let page = figma.root.children.find(p => p.name === "Cover");
  await figma.setCurrentPageAsync(page);

  const frame = figma.createFrame();
  frame.name = "Sonagi Design System Thumbnail";
  frame.resize(1920, 1080);
  frame.fills = [{ type: "SOLID", color: { r: 0.05, g: 0.06, b: 0.08 } }]; 
  frame.clipsContent = true;

  const blurCircle1 = figma.createEllipse(); blurCircle1.resize(1200, 1200);
  blurCircle1.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.2, b: 0.3 } }]; 
  blurCircle1.effects = [{ type: "LAYER_BLUR", radius: 400, visible: true }]; 
  blurCircle1.x = 1000; blurCircle1.y = -200; frame.appendChild(blurCircle1);

  const blurCircle2 = figma.createEllipse(); blurCircle2.resize(800, 800);
  blurCircle2.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.5, b: 0.9 } }]; 
  blurCircle2.effects = [{ type: "LAYER_BLUR", radius: 300, visible: true }]; 
  blurCircle2.x = -200; blurCircle2.y = 600; frame.appendChild(blurCircle2);

  const title = figma.createText(); title.characters = "Sonagi\nDesign System";
  title.fontName = { family: "Pretendard", style: "Bold" }; title.fontSize = 140;
  title.lineHeight = { value: 110, unit: "PERCENT" }; title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  title.x = 160; title.y = 320; frame.appendChild(title);

  const subtitle = figma.createText(); subtitle.characters = "Core Primitives & Compositions V1";
  subtitle.fontName = { family: "Pretendard", style: "Medium" }; subtitle.fontSize = 48;
  subtitle.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.7, b: 0.75 } }];
  subtitle.x = 165; subtitle.y = 660; frame.appendChild(subtitle);

  const tag = figma.createFrame(); tag.layoutMode = "HORIZONTAL"; tag.paddingTop = 16; tag.paddingBottom = 16; tag.paddingLeft = 32; tag.paddingRight = 32;
  tag.cornerRadius = 999; tag.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; tag.x = 165; tag.y = 800;
  
  const tagText = figma.createText(); tagText.characters = "Last Updated: " + new Date().toISOString().split('T')[0];
  tagText.fontName = { family: "Pretendard", style: "Bold" }; tagText.fontSize = 24; tagText.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  tag.appendChild(tagText); frame.appendChild(tag);

  figma.viewport.scrollAndZoomIntoView([frame]);
}
createCoverPage();
