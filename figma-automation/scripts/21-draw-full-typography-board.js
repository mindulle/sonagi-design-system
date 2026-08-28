async function drawFullTypographyBoard() {
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "SemiBold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });

  let page = figma.root.children.find(p => p.name === "Foundations");
  if (!page) return;
  await figma.setCurrentPageAsync(page);

  const localStyles = await figma.getLocalTextStylesAsync();
  const uiStyles = localStyles.filter(s => s.name.startsWith("UI /")).sort((a, b) => b.fontSize - a.fontSize);
  const docStyles = localStyles.filter(s => !s.name.startsWith("UI /")).sort((a, b) => b.fontSize - a.fontSize);

  const oldSections = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Typography"));
  for (const sec of oldSections) sec.remove();

  const board = figma.createSection(); board.name = "📚 Typography Architecture (V3 Final)"; board.x = 0; board.y = -2000;

  const container = figma.createFrame(); container.name = "Container"; container.layoutMode = "HORIZONTAL"; container.itemSpacing = 80;
  container.paddingTop = 60; container.paddingRight = 60; container.paddingBottom = 60; container.paddingLeft = 60; container.cornerRadius = 32;
  container.fills = [{ type: 'SOLID', color: {r: 0.96, g: 0.96, b: 0.96} }];

  function createPanel(titleText, subtitleText, stylesArray) {
    const panel = figma.createFrame(); panel.layoutMode = "VERTICAL"; panel.itemSpacing = 32; panel.fills = [];
    const header = figma.createText(); header.characters = `${titleText}\n${subtitleText}`; header.fontName = { family: "Pretendard", style: "Bold" }; header.fontSize = 28; header.fills = [{ type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.1} }];
    panel.appendChild(header);
    for (const style of stylesArray) {
      const row = figma.createFrame(); row.layoutMode = "HORIZONTAL"; row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER"; row.resize(800, row.height); row.layoutAlign = "STRETCH"; row.fills = []; row.itemSpacing = 40;
      const sample = figma.createText(); sample.characters = style.name + " — 가을 소나기"; sample.textStyleId = style.id; sample.layoutGrow = 1;
      const spec = figma.createText(); const lh = style.lineHeight.unit === "PERCENT" ? style.lineHeight.value + "%" : style.lineHeight.value + "px"; spec.characters = `${style.fontName.style} • ${style.fontSize}px • LH: ${lh}`; spec.fontSize = 14; spec.fontName = { family: "Pretendard", style: "Regular" }; spec.fills = [{ type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5} }];
      row.appendChild(sample); row.appendChild(spec); panel.appendChild(row);
    }
    return panel;
  }

  const docPanel = createPanel("📝 Document Scale", "ADR 0009: Major Third (1.25x) - 시원한 에디토리얼 비율", docStyles);
  const uiPanel = createPanel("🧩 UI Components Scale", "ADR 0008: 조밀한 고정 픽셀 - 버튼, 모달, 뱃지 전용", uiStyles);

  container.appendChild(docPanel); container.appendChild(uiPanel); board.resize(container.width + 120, container.height + 120);
  board.appendChild(container); container.x = 60; container.y = 60;
  figma.viewport.scrollAndZoomIntoView([board]);
}
drawFullTypographyBoard();
