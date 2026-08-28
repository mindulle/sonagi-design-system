async function appendFoundationExtras() {
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
  const page = figma.root.children.find(p => p.name === "Foundations");
  if (!page) return;
  const mainBoard = page.findAll(n => n.name === "Main Board" && n.type === "FRAME")[0];
  if (!mainBoard) return;
  const oldExtra = mainBoard.children.find(c => c.name === "Shape & Elevation");
  if (oldExtra) oldExtra.remove();

  const createText = (chars, size, style, colorHex = {r:0, g:0, b:0}) => {
    const t = figma.createText(); t.characters = chars; t.fontSize = size; t.fontName = { family: "Pretendard", style: style }; t.fills = [{ type: 'SOLID', color: colorHex }]; return t;
  };
  const extraSection = figma.createFrame(); extraSection.name = "Shape & Elevation"; extraSection.layoutMode = "VERTICAL"; extraSection.primaryAxisSizingMode = "AUTO"; extraSection.counterAxisSizingMode = "AUTO"; extraSection.itemSpacing = 40; extraSection.fills = [];
  extraSection.appendChild(createText("📏 3. Shape, Spacing & Elevation (ADR 0003)", 40, "Bold"));
  
  const grid = figma.createFrame(); grid.layoutMode = "HORIZONTAL"; grid.primaryAxisSizingMode = "AUTO"; grid.counterAxisSizingMode = "AUTO"; grid.itemSpacing = 80; grid.fills = [];

  const createPanel = (title, subtitle) => {
    const panel = figma.createFrame(); panel.layoutMode = "VERTICAL"; panel.primaryAxisSizingMode = "AUTO"; panel.counterAxisSizingMode = "FIXED"; panel.resize(480, 100); panel.itemSpacing = 32; panel.paddingTop = 40; panel.paddingRight = 40; panel.paddingBottom = 40; panel.paddingLeft = 40; panel.cornerRadius = 24; panel.fills = [{ type: 'SOLID', color: {r:1, g:1, b:1} }];
    panel.appendChild(createText(title, 28, "Bold")); panel.appendChild(createText(subtitle, 16, "Regular", {r:0.4, g:0.4, b:0.4})); return panel;
  };

  const radiusPanel = createPanel("🔲 Border Radius", "컴포넌트 모서리 둥글기 규격");
  const radiuses = [{ name: "sm", val: 4, desc: "체크박스, 작은 라벨" }, { name: "md", val: 6, desc: "기본 버튼, 인풋, 뱃지" }, { name: "lg", val: 8, desc: "토스트 알림, 큰 버튼" }, { name: "xl", val: 12, desc: "기본 카드(Card)" }, { name: "2xl", val: 16, desc: "모달(Modal) 팝업" }, { name: "full", val: 999, desc: "알약형 뱃지, 아바타, 라디오" }];
  radiuses.forEach(r => {
    const row = figma.createFrame(); row.layoutMode = "HORIZONTAL"; row.primaryAxisAlignItems = "SPACE_BETWEEN"; row.counterAxisAlignItems = "CENTER"; row.layoutAlign = "STRETCH"; row.fills = []; row.itemSpacing = 24;
    const box = figma.createFrame(); box.resize(60, 60); box.cornerRadius = r.val === 999 ? 30 : r.val; box.fills = [{type:'SOLID', color:{r:0.9, g:0.9, b:0.9}}]; box.strokes = [{type:'SOLID', color:{r:0.6, g:0.6, b:0.6}}];
    const info = figma.createFrame(); info.layoutMode="VERTICAL"; info.layoutGrow=1; info.fills=[];
    info.appendChild(createText(`radius/${r.name} (${r.val === 999 ? '999' : r.val}px)`, 18, "Bold")); info.appendChild(createText(r.desc, 14, "Regular", {r:0.5, g:0.5, b:0.5}));
    row.appendChild(box); row.appendChild(info); radiusPanel.appendChild(row);
  });

  const spacingPanel = createPanel("📏 Spacing", "컴포넌트 간격 및 내부 여백 (4px Base)");
  const spacings = [4, 8, 12, 16, 24, 32, 40, 48];
  spacings.forEach(s => {
    const row = figma.createFrame(); row.layoutMode = "HORIZONTAL"; row.primaryAxisAlignItems = "MIN"; row.counterAxisAlignItems = "CENTER"; row.layoutAlign = "STRETCH"; row.fills = []; row.itemSpacing = 24;
    const box = figma.createFrame(); box.resize(s, 24); box.fills = [{type:'SOLID', color:{r:0.3, g:0.6, b:0.9}}];
    const label = createText(`${s}px`, 16, "Medium"); row.appendChild(box); row.appendChild(label); spacingPanel.appendChild(row);
  });

  const shadowPanel = createPanel("☁️ Elevation (Shadow)", "화면의 깊이감을 표현하는 3단계 그림자");
  const shadows = [{ name: "Raised", desc: "카드 등 (1단계 떠오름)", effect: { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: "NORMAL" } }, { name: "Floating", desc: "모달, 토스트 (2단계 떠오름)", effect: { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 8 }, radius: 24, spread: 0, visible: true, blendMode: "NORMAL" } }, { name: "Focus", desc: "키보드 포커스 링 (접근성)", effect: { type: "DROP_SHADOW", color: { r: 0.93, g: 0.7, b: 0.66, a: 0.5 }, offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true, blendMode: "NORMAL" } }];
  shadows.forEach(sh => {
    const row = figma.createFrame(); row.layoutMode = "VERTICAL"; row.layoutAlign = "STRETCH"; row.fills = []; row.itemSpacing = 16;
    const box = figma.createFrame(); box.resize(360, 100); box.cornerRadius = 12; box.fills = [{type:'SOLID', color:{r:1, g:1, b:1}}]; box.effects = [sh.effect]; box.layoutMode="HORIZONTAL"; box.primaryAxisAlignItems="CENTER"; box.counterAxisAlignItems="CENTER";
    box.appendChild(createText(`shadow/${sh.name.toLowerCase()}`, 16, "Bold")); const desc = createText(sh.desc, 14, "Regular", {r:0.5, g:0.5, b:0.5}); row.appendChild(box); row.appendChild(desc); shadowPanel.appendChild(row);
  });

  grid.appendChild(radiusPanel); grid.appendChild(spacingPanel); grid.appendChild(shadowPanel);
  extraSection.appendChild(grid); mainBoard.appendChild(extraSection);
}
appendFoundationExtras();
