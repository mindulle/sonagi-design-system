/**
 * Sonagi Design System v3.0 - Digital Exhibition Wireframe Script
 * Room 01: The Glass Pavilion (1920x1080) - Floating Caption & Editorial V3
 */

return new Promise(async (resolve) => {
  try {
    // 1. 폰트 로드 헬퍼 (안전 fallback)
    async function loadSafeFont(family, style) {
      try {
        await figma.loadFontAsync({ family, style });
        return { family, style };
      } catch (e) {
        await figma.loadFontAsync({ family: "Inter", style: style === "Bold" ? "Bold" : "Regular" });
        return { family: "Inter", style: style === "Bold" ? "Bold" : "Regular" };
      }
    }

    const serifFont = await loadSafeFont("Cormorant Garamond", "Bold");
    const serifMedium = await loadSafeFont("Cormorant Garamond", "Medium");
    const sansBold = await loadSafeFont("Inter", "Bold");
    const sansMedium = await loadSafeFont("Inter", "Medium");
    const sansRegular = await loadSafeFont("Inter", "Regular");

    // 색상 팔레트 (The Master Brand Bible 60-30-10 OKLCH)
    const COLOR_CANVAS = { r: 6 / 255, g: 9 / 255, b: 17 / 255 };       // #060911
    const COLOR_SURFACE = { r: 9 / 255, g: 13 / 255, b: 22 / 255 };     // #090d16
    const COLOR_BORDER = { r: 48 / 255, g: 54 / 255, b: 61 / 255 };     // #30363d
    const COLOR_BORDER_SUBTLE = { r: 30 / 255, g: 38 / 255, b: 56 / 255 }; // #1e2638
    const COLOR_RAIN = { r: 74 / 255, g: 144 / 255, b: 226 / 255 };     // #4A90E2 (Rain Blue)
    const COLOR_GOLD = { r: 255 / 255, g: 209 / 255, b: 102 / 255 };    // #ffd166 (Dandelion Gold)
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 }; // #94a3b8
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };   // #64748b

    // 기존 프레임이 있으면 위치 유지 후 교체
    const existing = figma.currentPage.findOne(n => n.name.startsWith("Room 01 : The Glass Pavilion"));
    let originX = 0;
    let originY = 0;
    if (existing) {
      originX = existing.x;
      originY = existing.y;
      existing.remove();
    }

    // 2. 메인 뷰포트 프레임 (1920 x 1080)
    const root = figma.createFrame();
    root.name = "Room 01 : The Glass Pavilion [1920x1080]";
    root.x = originX;
    root.y = originY;
    root.resize(1920, 1080);
    root.clipsContent = true;
    root.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    figma.currentPage.appendChild(root);

    // 3. 외곽 건축 그리드 프레임 (2px Solid Border)
    const gridFrame = figma.createFrame();
    gridFrame.name = "Architectural Grid Boundary";
    gridFrame.x = 48;
    gridFrame.y = 48;
    gridFrame.resize(1824, 984);
    gridFrame.fills = [];
    gridFrame.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    gridFrame.strokeWeight = 2;
    root.appendChild(gridFrame);

    // 4. 모서리 십자 마크 (+)
    const corners = [
      { x: 44, y: 44 },
      { x: 1864, y: 44 },
      { x: 44, y: 1024 },
      { x: 1864, y: 1024 }
    ];
    corners.forEach((pos) => {
      const cross = figma.createText();
      cross.fontName = sansBold;
      cross.characters = "+";
      cross.fontSize = 16;
      cross.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cross.x = pos.x;
      cross.y = pos.y;
      root.appendChild(cross);
    });

    // 5. 상단 헤더 / 네비게이션 (AutoLayout - 3단 완전 분할)
    const header = figma.createFrame();
    header.name = "Header : Architectural Bar";
    header.x = 48;
    header.y = 48;
    header.resize(1824, 72);
    header.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    header.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    header.strokeWeight = 2;
    header.layoutMode = "HORIZONTAL";
    header.primaryAxisAlignItems = "SPACE_BETWEEN";
    header.counterAxisAlignItems = "CENTER";
    header.paddingLeft = 32;
    header.paddingRight = 32;
    header.primaryAxisSizingMode = "FIXED";
    header.counterAxisSizingMode = "FIXED";
    root.appendChild(header);

    // Header Left: Brand Identity
    const brandBox = figma.createFrame();
    brandBox.name = "Brand Identity";
    brandBox.layoutMode = "VERTICAL";
    brandBox.layoutAlign = "INHERIT";
    brandBox.primaryAxisSizingMode = "AUTO";
    brandBox.counterAxisSizingMode = "AUTO";
    brandBox.itemSpacing = 2;
    brandBox.fills = [];

    const brandTitle = figma.createText();
    brandTitle.fontName = serifFont;
    brandTitle.characters = "M I N D U L L E   S T U D I O";
    brandTitle.fontSize = 16;
    brandTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    brandTitle.textAutoResize = "WIDTH_AND_HEIGHT";
    brandBox.appendChild(brandTitle);

    const brandSub = figma.createText();
    brandSub.fontName = sansRegular;
    brandSub.characters = "HANDCRAFTED SOFTWARE ATELIER • EST. 2026";
    brandSub.fontSize = 10;
    brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandSub.textAutoResize = "WIDTH_AND_HEIGHT";
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    // Header Center: Room Indicator Badge
    const roomBadge = figma.createFrame();
    roomBadge.name = "Room Indicator";
    roomBadge.layoutMode = "HORIZONTAL";
    roomBadge.layoutAlign = "INHERIT";
    roomBadge.primaryAxisSizingMode = "AUTO";
    roomBadge.counterAxisSizingMode = "AUTO";
    roomBadge.paddingLeft = 18;
    roomBadge.paddingRight = 18;
    roomBadge.paddingTop = 8;
    roomBadge.paddingBottom = 8;
    roomBadge.cornerRadius = 2;
    roomBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
    roomBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomBadge.strokeWeight = 2;

    const roomText = figma.createText();
    roomText.fontName = sansBold;
    roomText.characters = "ROOM 01 / 05 : THE GLASS PAVILION";
    roomText.fontSize = 11;
    roomText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomText.textAutoResize = "WIDTH_AND_HEIGHT";
    roomBadge.appendChild(roomText);
    header.appendChild(roomBadge);

    // Header Right: Exhibition Coordinates
    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "37.5665° N, 126.9780° E  •  ARCHITECTURAL MASTER V3.0";
    metaText.fontSize = 11;
    metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    metaText.textAutoResize = "WIDTH_AND_HEIGHT";
    header.appendChild(metaText);

    // 6. 중앙 무대: 3D 조각품 와이어프레임 무대 (Centerpiece Stage)
    const stage = figma.createFrame();
    stage.name = "Centerpiece Stage : 3D Glass Sculpture Arena";
    stage.x = 48;
    stage.y = 120;
    stage.resize(1824, 696);
    stage.fills = [];
    root.appendChild(stage);

    // 중앙 레티클 그룹 (무한 공간에 부유)
    const centerX = 1824 / 2;
    const centerY = 696 / 2;

    // 미세 십자선 가이드 (Horizontal & Vertical Axes)
    const axisH = figma.createLine();
    axisH.name = "Axis Horizontal";
    axisH.resize(600, 0);
    axisH.x = centerX - 300;
    axisH.y = centerY;
    axisH.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE, opacity: 0.5 }];
    axisH.strokeWeight = 1;
    stage.appendChild(axisH);

    const axisV = figma.createLine();
    axisV.name = "Axis Vertical";
    axisV.rotation = 90;
    axisV.resize(480, 0);
    axisV.x = centerX;
    axisV.y = centerY - 240;
    axisV.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE, opacity: 0.5 }];
    axisV.strokeWeight = 1;
    stage.appendChild(axisV);

    // 레티클 원형 가이드 (R=400)
    const circleOuter = figma.createEllipse();
    circleOuter.name = "Reticle Outer Ring";
    circleOuter.resize(400, 400);
    circleOuter.x = centerX - 200;
    circleOuter.y = centerY - 200;
    circleOuter.fills = [];
    circleOuter.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.35 }];
    circleOuter.strokeWeight = 2;
    stage.appendChild(circleOuter);

    // 레티클 골드 코어 링 (R=180)
    const circleInner = figma.createEllipse();
    circleInner.name = "Dandelion Core Reticle";
    circleInner.resize(180, 180);
    circleInner.x = centerX - 90;
    circleInner.y = centerY - 90;
    circleInner.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.04 }];
    circleInner.strokes = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.75 }];
    circleInner.strokeWeight = 2;
    stage.appendChild(circleInner);

    // 중앙 조형물 명칭 라벨 (AutoLayout)
    const stageLabel = figma.createFrame();
    stageLabel.name = "Stage Label";
    stageLabel.layoutMode = "VERTICAL";
    stageLabel.primaryAxisAlignItems = "CENTER";
    stageLabel.counterAxisAlignItems = "CENTER";
    stageLabel.primaryAxisSizingMode = "AUTO";
    stageLabel.counterAxisSizingMode = "AUTO";
    stageLabel.itemSpacing = 6;
    stageLabel.x = centerX - 230;
    stageLabel.y = centerY - 40;
    stageLabel.resize(460, 80);
    stageLabel.fills = [];

    const labelTitle = figma.createText();
    labelTitle.fontName = sansBold;
    labelTitle.characters = "[ EXHIBIT A : SONIC DROPLET & PAPERWEIGHT ]";
    labelTitle.fontSize = 13;
    labelTitle.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    labelTitle.textAutoResize = "WIDTH_AND_HEIGHT";
    stageLabel.appendChild(labelTitle);

    const labelDesc = figma.createText();
    labelDesc.fontName = sansRegular;
    labelDesc.characters = "Real-time Three.js Glass Shader • Refraction Index 1.52";
    labelDesc.fontSize = 11;
    labelDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    labelDesc.textAutoResize = "WIDTH_AND_HEIGHT";
    stageLabel.appendChild(labelDesc);

    const labelScrub = figma.createText();
    labelScrub.fontName = sansMedium;
    labelScrub.characters = "Theatre.js Timeline Scrub Zone (0.00s ➔ 4.50s)";
    labelScrub.fontSize = 10;
    labelScrub.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    labelScrub.textAutoResize = "WIDTH_AND_HEIGHT";
    stageLabel.appendChild(labelScrub);
    stage.appendChild(stageLabel);

    // 🌟 [핵심 개선] 조각품 우측 캡션 명판 (Floating Artwork Placard)
    const placard = figma.createFrame();
    placard.name = "Artwork Placard (Caption)";
    placard.x = centerX + 240; // 조각품 우측에 자연스럽게 배치
    placard.y = centerY + 40;
    placard.resize(340, 160);
    placard.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    placard.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    placard.strokeWeight = 2;
    placard.layoutMode = "VERTICAL";
    placard.primaryAxisSizingMode = "FIXED";
    placard.counterAxisSizingMode = "AUTO";
    placard.itemSpacing = 8;
    placard.paddingLeft = 20;
    placard.paddingRight = 20;
    placard.paddingTop = 18;
    placard.paddingBottom = 18;

    const placardTag = figma.createText();
    placardTag.fontName = sansBold;
    placardTag.characters = "GALLERY CAPTION • 01";
    placardTag.fontSize = 9;
    placardTag.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    placardTag.textAutoResize = "WIDTH_AND_HEIGHT";
    placard.appendChild(placardTag);

    const placardTitle = figma.createText();
    placardTitle.fontName = sansBold;
    placardTitle.characters = "THE SONIC DROPLET IN GLASS";
    placardTitle.fontSize = 12;
    placardTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    placardTitle.textAutoResize = "WIDTH_AND_HEIGHT";
    placard.appendChild(placardTitle);

    const placardLine = figma.createLine();
    placardLine.name = "Divider";
    placardLine.resize(300, 0);
    placardLine.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    placardLine.strokeWeight = 1;
    placard.appendChild(placardLine);

    const placardMeta1 = figma.createText();
    placardMeta1.fontName = sansRegular;
    placardMeta1.characters = "Medium : Procedural Water Droplet, Glass Dome, Obsidian";
    placardMeta1.fontSize = 10;
    placardMeta1.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    placardMeta1.textAutoResize = "WIDTH_AND_HEIGHT";
    placard.appendChild(placardMeta1);

    const placardMeta2 = figma.createText();
    placardMeta2.fontName = sansRegular;
    placardMeta2.characters = "Constitution : The True 2px Law & 60-30-10 OKLCH Balance";
    placardMeta2.fontSize = 10;
    placardMeta2.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    placardMeta2.textAutoResize = "WIDTH_AND_HEIGHT";
    placard.appendChild(placardMeta2);

    const placardMeta3 = figma.createText();
    placardMeta3.fontName = sansBold;
    placardMeta3.characters = "Archive : Mindulle Studio Official Catalog v0.1.0";
    placardMeta3.fontSize = 10;
    placardMeta3.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    placardMeta3.textAutoResize = "WIDTH_AND_HEIGHT";
    placard.appendChild(placardMeta3);
    stage.appendChild(placard);

    // 7. 🌟 [핵심 개선] 하단 에디토리얼 선언문 바 (시원한 2분할 레이아웃)
    const bottomBar = figma.createFrame();
    bottomBar.name = "Bottom Section : Manifesto & Navigation Bar";
    bottomBar.x = 48;
    bottomBar.y = 816;
    bottomBar.resize(1824, 216);
    bottomBar.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    bottomBar.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    bottomBar.strokeWeight = 2;
    bottomBar.layoutMode = "HORIZONTAL";
    bottomBar.primaryAxisAlignItems = "SPACE_BETWEEN";
    bottomBar.counterAxisAlignItems = "CENTER";
    bottomBar.paddingLeft = 48;
    bottomBar.paddingRight = 48;
    bottomBar.paddingTop = 28;
    bottomBar.paddingBottom = 28;
    bottomBar.primaryAxisSizingMode = "FIXED";
    bottomBar.counterAxisSizingMode = "FIXED";
    root.appendChild(bottomBar);

    // Left Column: 대형 철학 선언문 (The Atelier Manifesto)
    const manifestoBox = figma.createFrame();
    manifestoBox.name = "Manifesto Statement (Hero Editorial)";
    manifestoBox.layoutMode = "VERTICAL";
    manifestoBox.layoutAlign = "INHERIT";
    manifestoBox.layoutGrow = 1;
    manifestoBox.primaryAxisAlignItems = "CENTER";
    manifestoBox.counterAxisAlignItems = "MIN";
    manifestoBox.itemSpacing = 8;
    manifestoBox.fills = [];

    const manifestoEyebrow = figma.createText();
    manifestoEyebrow.fontName = sansBold;
    manifestoEyebrow.characters = "ATELIER CONSTITUTION • ARTICLE I";
    manifestoEyebrow.fontSize = 10;
    manifestoEyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoEyebrow.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoEyebrow);

    const manifestoKorean = figma.createText();
    manifestoKorean.fontName = serifFont;
    manifestoKorean.characters = "\"도구가 완벽할 때, 손길은 비로소 자유로워진다.\"";
    manifestoKorean.fontSize = 32; // 32px 웅장한 타이포 스케일
    manifestoKorean.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    manifestoKorean.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoKorean);

    const manifestoEnglish = figma.createText();
    manifestoEnglish.fontName = serifMedium;
    manifestoEnglish.characters = "When the machine is flawless, human soul finds its solace.";
    manifestoEnglish.fontSize = 15;
    manifestoEnglish.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoEnglish.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoEnglish);

    const manifestoDesc = figma.createText();
    manifestoDesc.fontName = sansRegular;
    manifestoDesc.characters = "차가운 성벽의 족쇄를 풀고, 태블릿과 펜의 손맛으로 지어 올린 디지털 안식처.";
    manifestoDesc.fontSize = 12;
    manifestoDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }];
    manifestoDesc.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoDesc);
    bottomBar.appendChild(manifestoBox);

    // Right Column: 전시 동선 네비게이션 (Navigation & Scroll Action)
    const navBox = figma.createFrame();
    navBox.name = "Curated Route";
    navBox.layoutMode = "VERTICAL";
    navBox.primaryAxisAlignItems = "CENTER";
    navBox.counterAxisAlignItems = "MAX";
    navBox.primaryAxisSizingMode = "AUTO";
    navBox.counterAxisSizingMode = "AUTO";
    navBox.itemSpacing = 10;
    navBox.fills = [];

    const progressLabel = figma.createText();
    progressLabel.fontName = sansBold;
    progressLabel.characters = "PROGRESS  01  /  05";
    progressLabel.fontSize = 11;
    progressLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    progressLabel.textAutoResize = "WIDTH_AND_HEIGHT";
    navBox.appendChild(progressLabel);

    const scrollBtn = figma.createFrame();
    scrollBtn.name = "Scroll CTA Button";
    scrollBtn.layoutMode = "VERTICAL";
    scrollBtn.primaryAxisAlignItems = "CENTER";
    scrollBtn.counterAxisAlignItems = "CENTER";
    scrollBtn.primaryAxisSizingMode = "AUTO";
    scrollBtn.counterAxisSizingMode = "AUTO";
    scrollBtn.paddingLeft = 28;
    scrollBtn.paddingRight = 28;
    scrollBtn.paddingTop = 14;
    scrollBtn.paddingBottom = 14;
    scrollBtn.cornerRadius = 2;
    scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.strokeWeight = 2;

    const btnText = figma.createText();
    btnText.fontName = sansBold;
    btnText.characters = "SCROLL TO ENTER ROOM 02 ↓";
    btnText.fontSize = 11;
    btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    btnText.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnText);

    const btnSub = figma.createText();
    btnSub.fontName = sansRegular;
    btnSub.characters = "The Monolith of Solace";
    btnSub.fontSize = 9;
    btnSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    btnSub.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnSub);

    navBox.appendChild(scrollBtn);
    bottomBar.appendChild(navBox);

    // 8. 뷰포트 이동
    figma.viewport.scrollAndZoomIntoView([root]);
    console.log("✅ [Sonagi UI Ops] Room 01 : The Glass Pavilion V3.0 (Floating Caption) 완료!");
    resolve();
  } catch (err) {
    console.error("❌ 생성 실패:", err);
    resolve();
  }
});
