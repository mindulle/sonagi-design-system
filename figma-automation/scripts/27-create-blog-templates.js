async function createBlogTemplates() {
  const fontMed = { family: "Pretendard", style: "Medium" };
  const fontBold = { family: "Pretendard", style: "Bold" };
  const fontReg = { family: "Pretendard", style: "Regular" };
  
  try {
    await figma.loadFontAsync(fontMed);
    await figma.loadFontAsync(fontBold);
    await figma.loadFontAsync(fontReg);
  } catch (e) {
    fontMed.family = "Inter"; fontBold.family = "Inter"; fontReg.family = "Inter";
    await figma.loadFontAsync(fontMed); await figma.loadFontAsync(fontBold); await figma.loadFontAsync(fontReg);
  }

  // Helper to get variables
  const allVars = await figma.variables.getLocalVariablesAsync();
  const getV = (name) => allVars.find(v => v.name === name || v.name.includes(name));
  
  const v = {
    bgBase: getV("background/bg-base") || getV("bg-base"),
    bgSurface: getV("background/bg-surface") || getV("bg-surface"),
    bgElevated: getV("background/bg-elevated") || getV("bg-elevated"),
    txtPri: getV("text/text-primary") || getV("text-primary"),
    txtSec: getV("text/text-secondary") || getV("text-secondary"),
    borderSubtle: getV("border/border-subtle") || getV("border-subtle"),
    brandPri: getV("brand/brand-primary") || getV("brand-primary"),
    txtInverse: getV("text/text-inverse") || getV("text-inverse"),
  };

  const bindColor = (variable, defaultHex = {r:0.8, g:0.8, b:0.8}) => {
    if (variable) {
      return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: {r:0,g:0,b:0} }, 'color', variable);
    }
    return { type: 'SOLID', color: defaultHex };
  };

  // Find or create page
  let page = figma.root.children.find(p => p.name === "📱 Blog Templates");
  if (!page) {
    page = figma.createPage();
    page.name = "📱 Blog Templates";
  }
  await figma.setCurrentPageAsync(page);

  // Wrapper Container
  const container = figma.createFrame();
  container.name = "Blog Templates Overview";
  container.layoutMode = "HORIZONTAL";
  container.itemSpacing = 80;
  container.paddingTop = 80; container.paddingBottom = 80;
  container.paddingLeft = 80; container.paddingRight = 80;
  container.fills = [bindColor(v.bgBase, {r:0.95, g:0.95, b:0.95})];
  
  // -----------------------------------------
  // 1. Desktop 2-Column Layout
  // -----------------------------------------
  const desktopFrame = figma.createFrame();
  desktopFrame.name = "Desktop Template (2-Column)";
  desktopFrame.resize(1200, 1080);
  desktopFrame.layoutMode = "HORIZONTAL";
  desktopFrame.primaryAxisSizingMode = "FIXED";
  desktopFrame.counterAxisSizingMode = "FIXED";
  desktopFrame.itemSpacing = 48;
  desktopFrame.paddingTop = 64; desktopFrame.paddingBottom = 64;
  desktopFrame.paddingLeft = 64; desktopFrame.paddingRight = 64;
  desktopFrame.fills = [bindColor(v.bgSurface, {r:1, g:1, b:1})];
  desktopFrame.cornerRadius = 24;

  // Desktop Left Content (70%)
  const deskContent = figma.createFrame();
  deskContent.name = "Main Content (70%)";
  deskContent.layoutMode = "VERTICAL";
  deskContent.layoutGrow = 1; 
  deskContent.layoutAlign = "STRETCH";
  deskContent.itemSpacing = 32;
  deskContent.fills = [];

  // Header (Title, Meta)
  const deskHeader = figma.createFrame();
  deskHeader.name = "Header";
  deskHeader.layoutMode = "VERTICAL";
  deskHeader.primaryAxisSizingMode = "AUTO";
  deskHeader.layoutAlign = "STRETCH";
  deskHeader.itemSpacing = 16;
  deskHeader.fills = [];

  const titleText = figma.createText();
  titleText.characters = "블로그 리디자인 청사진 (Blueprint)";
  titleText.fontName = fontBold;
  titleText.fontSize = 32;
  titleText.fills = [bindColor(v.txtPri, {r:0.1, g:0.1, b:0.1})];
  
  const metaFrame = figma.createFrame();
  metaFrame.name = "Meta & Progressive Disclosure";
  metaFrame.layoutMode = "HORIZONTAL";
  metaFrame.primaryAxisSizingMode = "AUTO";
  metaFrame.counterAxisSizingMode = "AUTO";
  metaFrame.itemSpacing = 16;
  metaFrame.fills = [];
  
  const dateText = figma.createText();
  dateText.characters = "2026.08.28";
  dateText.fontName = fontReg; dateText.fontSize = 14;
  dateText.fills = [bindColor(v.txtSec, {r:0.4, g:0.4, b:0.4})];

  const metaToggle = figma.createFrame();
  metaToggle.name = "Wiki Info Toggle";
  metaToggle.layoutMode = "HORIZONTAL";
  metaToggle.paddingLeft = 12; metaToggle.paddingRight = 12;
  metaToggle.paddingTop = 6; metaToggle.paddingBottom = 6;
  metaToggle.cornerRadius = 6;
  metaToggle.fills = [bindColor(v.bgElevated, {r:0.9, g:0.9, b:0.9})];
  const toggleText = figma.createText();
  toggleText.characters = "ℹ️ Wiki Info";
  toggleText.fontName = fontMed; toggleText.fontSize = 12;
  toggleText.fills = [bindColor(v.txtSec, {r:0.3, g:0.3, b:0.3})];
  metaToggle.appendChild(toggleText);

  metaFrame.appendChild(dateText);
  metaFrame.appendChild(metaToggle);
  
  deskHeader.appendChild(titleText);
  deskHeader.appendChild(metaFrame);
  deskContent.appendChild(deskHeader);

  // Body Content Placeholder
  const deskBody = figma.createText();
  deskBody.characters = "이곳에 본문 내용이 들어갑니다.\n1. 레이아웃: 반응형 (모바일 1단, 데스크탑 2단)\n2. 헤더: 심플 (위키 메타데이터는 점진적 공개 버튼으로 숨김)\n3. 목차(TOC): 데스크탑 우측 상단 고정 / 모바일 플로팅 버튼(FAB)\n4. 우측 사이드바: 목차 → Graph View → 백링크 → 연관 글\n5. 위키링크(HoverPreview): 성능 최우선, 텍스트 요약만 노출";
  deskBody.fontName = fontReg;
  deskBody.fontSize = 16;
  deskBody.lineHeight = { value: 160, unit: "PERCENT" };
  deskBody.layoutAlign = "STRETCH";
  deskBody.fills = [bindColor(v.txtPri, {r:0.2, g:0.2, b:0.2})];
  deskContent.appendChild(deskBody);

  // HoverPreview Component Instance Placeholder (Mock)
  const hoverMock = figma.createFrame();
  hoverMock.name = "HoverPreview (Pop-over Mock)";
  hoverMock.layoutMode = "VERTICAL";
  hoverMock.itemSpacing = 8;
  hoverMock.paddingLeft = 16; hoverMock.paddingRight = 16;
  hoverMock.paddingTop = 12; hoverMock.paddingBottom = 12;
  hoverMock.cornerRadius = 12;
  hoverMock.fills = [bindColor(v.bgElevated, {r:1, g:1, b:1})];
  if(v.borderSubtle) {
    hoverMock.strokes = [bindColor(v.borderSubtle, {r:0.8, g:0.8, b:0.8})];
    hoverMock.strokeWeight = 1;
    hoverMock.strokeAlign = "INSIDE";
  }
  hoverMock.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.1}, offset: {x:0, y:4}, radius: 12, spread: 0, visible: true, blendMode: "NORMAL" }];
  
  const hoverTitle = figma.createText(); hoverTitle.characters = "관련 위키 문서"; hoverTitle.fontName = fontBold; hoverTitle.fontSize = 14; hoverTitle.fills = [bindColor(v.txtPri)];
  const hoverDesc = figma.createText(); hoverDesc.characters = "성능 최우선으로 텍스트 요약만 노출됩니다."; hoverDesc.fontName = fontReg; hoverDesc.fontSize = 13; hoverDesc.fills = [bindColor(v.txtSec)];
  hoverMock.appendChild(hoverTitle); hoverMock.appendChild(hoverDesc);
  deskContent.appendChild(hoverMock);

  desktopFrame.appendChild(deskContent);

  // Desktop Right Sidebar (30%)
  const deskSidebar = figma.createFrame();
  deskSidebar.name = "Right Sidebar (30%)";
  deskSidebar.layoutMode = "VERTICAL";
  deskSidebar.resize(280, 100);
  deskSidebar.primaryAxisSizingMode = "AUTO";
  deskSidebar.layoutAlign = "STRETCH";
  deskSidebar.itemSpacing = 32;
  deskSidebar.fills = [];

  const createSidebarModule = (title, height) => {
    const mod = figma.createFrame();
    mod.name = title;
    mod.layoutMode = "VERTICAL";
    mod.primaryAxisSizingMode = "FIXED";
    mod.layoutAlign = "STRETCH";
    mod.resize(280, height);
    mod.itemSpacing = 16;
    mod.fills = [];
    
    const modTitle = figma.createText();
    modTitle.characters = title;
    modTitle.fontName = fontBold; modTitle.fontSize = 16;
    modTitle.fills = [bindColor(v.txtPri)];
    
    const modBox = figma.createFrame();
    modBox.name = "Box";
    modBox.layoutMode = "VERTICAL";
    modBox.layoutAlign = "STRETCH";
    modBox.layoutGrow = 1;
    modBox.cornerRadius = 12;
    if(v.borderSubtle){
        modBox.strokes = [bindColor(v.borderSubtle, {r:0.9, g:0.9, b:0.9})];
        modBox.strokeWeight = 1;
    }
    modBox.fills = [bindColor(v.bgElevated, {r:0.98, g:0.98, b:0.98})];
    
    mod.appendChild(modTitle);
    mod.appendChild(modBox);
    return mod;
  };

  deskSidebar.appendChild(createSidebarModule("TOC (On this page)", 240));
  deskSidebar.appendChild(createSidebarModule("Graph View", 240));
  deskSidebar.appendChild(createSidebarModule("Backlinks", 160));
  deskSidebar.appendChild(createSidebarModule("Related Posts", 160));
  
  desktopFrame.appendChild(deskSidebar);
  container.appendChild(desktopFrame);

  // -----------------------------------------
  // 2. Mobile 1-Column Layout
  // -----------------------------------------
  const mobileFrame = figma.createFrame();
  mobileFrame.name = "Mobile Template (1-Column)";
  mobileFrame.resize(375, 812);
  mobileFrame.layoutMode = "VERTICAL";
  mobileFrame.primaryAxisSizingMode = "FIXED";
  mobileFrame.counterAxisSizingMode = "FIXED";
  mobileFrame.itemSpacing = 32;
  mobileFrame.paddingTop = 40; mobileFrame.paddingBottom = 40;
  mobileFrame.paddingLeft = 24; mobileFrame.paddingRight = 24;
  mobileFrame.fills = [bindColor(v.bgSurface, {r:1, g:1, b:1})];
  mobileFrame.cornerRadius = 24;

  const mobHeader = deskHeader.clone();
  mobHeader.children[0].fontSize = 24; // Smaller title
  mobileFrame.appendChild(mobHeader);

  const mobBody = deskBody.clone();
  mobBody.fontSize = 15;
  mobileFrame.appendChild(mobBody);

  mobileFrame.appendChild(createSidebarModule("Graph View", 200));
  mobileFrame.appendChild(createSidebarModule("Backlinks", 140));
  mobileFrame.appendChild(createSidebarModule("Related Posts", 140));

  // Add FAB for TOC
  const fab = figma.createFrame();
  fab.name = "TOC FAB";
  fab.layoutMode = "HORIZONTAL";
  fab.primaryAxisAlignItems = "CENTER";
  fab.counterAxisAlignItems = "CENTER";
  fab.resize(56, 56);
  fab.cornerRadius = 28;
  fab.fills = [bindColor(v.brandPri, {r:0.1, g:0.4, b:0.9})];
  fab.effects = [{ type: "DROP_SHADOW", color: {r:0, g:0, b:0, a:0.2}, offset: {x:0, y:4}, radius: 8, spread: 0, visible: true, blendMode: "NORMAL" }];
  
  const fabIcon = figma.createText();
  fabIcon.characters = "☰";
  fabIcon.fontName = fontReg; fabIcon.fontSize = 24;
  fabIcon.fills = [bindColor(v.txtInverse, {r:1, g:1, b:1})];
  fab.appendChild(fabIcon);

  // Position FAB inside mobile frame
  mobileFrame.appendChild(fab);
  fab.layoutPositioning = "ABSOLUTE";
  fab.x = 375 - 56 - 24; 
  fab.y = 812 - 56 - 40;

  container.appendChild(mobileFrame);

  figma.currentPage.appendChild(container);
  figma.viewport.scrollAndZoomIntoView([container]);
  figma.currentPage.selection = [container];

  console.log("✅ Blog Templates 페이지 및 레이아웃(Desktop/Mobile) 생성 완료!");
}

createBlogTemplates();
