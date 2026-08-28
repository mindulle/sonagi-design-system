async function drawTypographyFoundation() {
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "Foundations");
  if (!page) return;
  await figma.setCurrentPageAsync(page);

  const localStyles = await figma.getLocalTextStylesAsync();
  const uiStyles = localStyles.filter(s => s.name.startsWith("UI /")).sort((a, b) => b.fontSize - a.fontSize);

  const board = figma.createSection(); board.name = "📚 Typography Scale (UI Components)"; board.x = -1500; board.y = 0;

  const panel = figma.createFrame(); panel.name = "UI Typography Panel"; panel.layoutMode = "VERTICAL"; panel.itemSpacing = 32;
  panel.paddingTop = 60; panel.paddingRight = 60; panel.paddingBottom = 60; panel.paddingLeft = 60; panel.cornerRadius = 24;
  panel.fills = [{ type: 'SOLID', color: {r: 0.96, g: 0.96, b: 0.96} }];

  const header = figma.createText(); header.characters = "UI Typography Scale\nADR 0008: 프로덕트 컴포넌트(버튼, 뱃지, 모달 등) 전용 규격";
  header.fontName = { family: "Pretendard", style: "Bold" }; header.fontSize = 24; header.fills = [{ type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.1} }];
  panel.appendChild(header);

  for (const style of uiStyles) {
    const row = figma.createFrame(); row.name = style.name; row.layoutMode = "HORIZONTAL"; row.primaryAxisAlignItems = "SPACE_BETWEEN";
    row.counterAxisAlignItems = "CENTER"; row.layoutAlign = "STRETCH"; row.resize(800, row.height); row.fills = [];

    const sample = figma.createText(); sample.characters = style.name.replace("UI / ", "") + " — The quick brown fox"; sample.textStyleId = style.id; sample.layoutGrow = 1;
    const spec = figma.createText(); const lh = style.lineHeight.unit === "PERCENT" ? style.lineHeight.value + "%" : style.lineHeight.value + "px";
    spec.characters = `Pretendard ${style.fontName.style}  •  ${style.fontSize}px  •  Line-Height: ${lh}`; spec.fontSize = 14; spec.fontName = { family: "Pretendard", style: "Regular" }; spec.fills = [{ type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5} }];
    row.appendChild(sample); row.appendChild(spec); panel.appendChild(row);
  }

  board.resize(panel.width + 120, panel.height + 120); board.appendChild(panel); panel.x = 60; panel.y = 60;
  figma.viewport.scrollAndZoomIntoView([board]);
}
drawTypographyFoundation();
