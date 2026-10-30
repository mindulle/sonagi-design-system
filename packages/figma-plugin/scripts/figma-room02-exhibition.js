/**
 * Sonagi Design System v3.0 - Digital Exhibition Wireframe Script
 * Room 02: The Monolith of Solace (1920x1080) - Dual Monoliths (Wild & Thin)
 */

return new Promise(async (resolve) => {
  try {
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

    // 색상 팔레트
    const COLOR_CANVAS = { r: 6 / 255, g: 9 / 255, b: 17 / 255 };          // #060911 (Dark Obsidian)
    const COLOR_SURFACE = { r: 9 / 255, g: 13 / 255, b: 22 / 255 };        // #090d16
    const COLOR_PAPER = { r: 250 / 255, g: 248 / 255, b: 245 / 255 };      // #faf8f5 (Warm Paper)
    const COLOR_PAPER_BORDER = { r: 217 / 255, g: 119 / 255, b: 6 / 255 };  // #d97706 (Amber Gold)
    const COLOR_BORDER = { r: 48 / 255, g: 54 / 255, b: 61 / 255 };        // #30363d
    const COLOR_BORDER_SUBTLE = { r: 30 / 255, g: 38 / 255, b: 56 / 255 };    // #1e2638
    const COLOR_RAIN = { r: 74 / 255, g: 144 / 255, b: 226 / 255 };        // #4A90E2 (Rain Blue)
    const COLOR_GOLD = { r: 255 / 255, g: 209 / 255, b: 102 / 255 };       // #ffd166 (Dandelion Gold)
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_INK = { r: 10 / 255, g: 15 / 255, b: 28 / 255 };       // #0a0f1c
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 }; // #94a3b8
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };   // #64748b

    // 기준 Room 01 프레임 찾아서 우측에 80px 간격으로 배치
    const room01 = figma.currentPage.findOne(n => n.name.startsWith("Room 01 : The Glass Pavilion"));
    let originX = 2000;
    let originY = 0;
    if (room01) {
      originX = room01.x + room01.width + 80;
      originY = room01.y;
    }

    // 기존 Room 02 프레임이 있으면 삭제 후 교체
    const existing02 = figma.currentPage.findOne(n => n.name.startsWith("Room 02 : The Monolith of Solace"));
    if (existing02) {
      originX = existing02.x;
      originY = existing02.y;
      existing02.remove();
    }

    // 1. 메인 뷰포트 프레임 (1920 x 1080)
    const root = figma.createFrame();
    root.name = "Room 02 : The Monolith of Solace [1920x1080]";
    root.x = originX;
    root.y = originY;
    root.resize(1920, 1080);
    root.clipsContent = true;
    root.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    figma.currentPage.appendChild(root);

    // 2. 외곽 건축 그리드 프레임 (2px Solid Border)
    const gridFrame = figma.createFrame();
    gridFrame.name = "Architectural Grid Boundary";
    gridFrame.x = 48;
    gridFrame.y = 48;
    gridFrame.resize(1824, 984);
    gridFrame.fills = [];
    gridFrame.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    gridFrame.strokeWeight = 2;
    root.appendChild(gridFrame);

    // 3. 모서리 십자 마크 (+)
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

    // 4. 상단 헤더 / 네비게이션
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

    // Header Left
    const brandBox = figma.createFrame();
    brandBox.name = "Brand Identity";
    brandBox.layoutMode = "VERTICAL";
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
    brandSub.characters = "THE TRINITY ATELIER • DUAL THEME SPECIMEN";
    brandSub.fontSize = 10;
    brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandSub.textAutoResize = "WIDTH_AND_HEIGHT";
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    // Header Center: Room Badge
    const roomBadge = figma.createFrame();
    roomBadge.name = "Room Indicator";
    roomBadge.layoutMode = "HORIZONTAL";
    roomBadge.primaryAxisSizingMode = "AUTO";
    roomBadge.counterAxisSizingMode = "AUTO";
    roomBadge.paddingLeft = 18;
    roomBadge.paddingRight = 18;
    roomBadge.paddingTop = 8;
    roomBadge.paddingBottom = 8;
    roomBadge.cornerRadius = 2;
    roomBadge.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    roomBadge.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    roomBadge.strokeWeight = 2;
    const roomText = figma.createText();
    roomText.fontName = sansBold;
    roomText.characters = "ROOM 02 / 05 : THE MONOLITH OF SOLACE";
    roomText.fontSize = 11;
    roomText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    roomText.textAutoResize = "WIDTH_AND_HEIGHT";
    roomBadge.appendChild(roomText);
    header.appendChild(roomBadge);

    // Header Right
    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "DUAL THEME ENGINE  •  DEEP INK ↔ WARM PAPER";
    metaText.fontSize = 11;
    metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    metaText.textAutoResize = "WIDTH_AND_HEIGHT";
    header.appendChild(metaText);

    // 5. 중앙 전시 공간: Dual Monoliths (좌우 대조 석판 880px씩)
    const stage = figma.createFrame();
    stage.name = "Centerpiece Stage : Dual Monoliths Arena";
    stage.x = 48;
    stage.y = 120;
    stage.resize(1824, 696);
    stage.layoutMode = "HORIZONTAL";
    stage.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage.counterAxisAlignItems = "CENTER";
    stage.paddingLeft = 24;
    stage.paddingRight = 24;
    stage.fills = [];
    root.appendChild(stage);

    // ─────────────────────────────────────────────────────────────
    // [Monolith I : The Wild Sonagi (소나기 / 벼락과 방패 - 다크)]
    // ─────────────────────────────────────────────────────────────
    const monolithDark = figma.createFrame();
    monolithDark.name = "Monolith I : The Wild Sonagi (Dark)";
    monolithDark.resize(860, 640);
    monolithDark.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    monolithDark.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
    monolithDark.strokeWeight = 2;
    monolithDark.layoutMode = "VERTICAL";
    monolithDark.primaryAxisAlignItems = "SPACE_BETWEEN";
    monolithDark.paddingLeft = 36;
    monolithDark.paddingRight = 36;
    monolithDark.paddingTop = 32;
    monolithDark.paddingBottom = 32;
    stage.appendChild(monolithDark);

    // Monolith I Header
    const darkHeader = figma.createFrame();
    darkHeader.layoutMode = "HORIZONTAL";
    darkHeader.primaryAxisAlignItems = "SPACE_BETWEEN";
    darkHeader.counterAxisAlignItems = "CENTER";
    darkHeader.layoutAlign = "STRETCH";
    darkHeader.fills = [];

    const darkTag = figma.createText();
    darkTag.fontName = sansBold;
    darkTag.characters = "MONOLITH I • WILD ARCHITECTURE (소나기)";
    darkTag.fontSize = 11;
    darkTag.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    darkHeader.appendChild(darkTag);

    const darkSpec = figma.createText();
    darkSpec.fontName = sansMedium;
    darkSpec.characters = "DEEP INK (#060911) • 2PX SHIELD";
    darkSpec.fontSize = 10;
    darkSpec.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    darkHeader.appendChild(darkSpec);
    monolithDark.appendChild(darkHeader);

    // Monolith I Visual Specimen (Blueprint Reticle)
    const darkVisual = figma.createFrame();
    darkVisual.name = "Dark Specimen Reticle";
    darkVisual.layoutAlign = "STRETCH";
    darkVisual.resize(788, 260);
    darkVisual.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    darkVisual.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }];
    darkVisual.strokeWeight = 2;

    const darkCircle = figma.createEllipse();
    darkCircle.resize(180, 180);
    darkCircle.x = (788 - 180) / 2;
    darkCircle.y = (260 - 180) / 2;
    darkCircle.fills = [];
    darkCircle.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.6 }];
    darkCircle.strokeWeight = 2;
    darkVisual.appendChild(darkCircle);

    const darkLabel = figma.createText();
    darkLabel.fontName = sansBold;
    darkLabel.characters = "THE DIGITAL FORTRESS";
    darkLabel.fontSize = 13;
    darkLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    darkLabel.x = (788 - 160) / 2;
    darkLabel.y = (260 - 16) / 2;
    darkVisual.appendChild(darkLabel);

    monolithDark.appendChild(darkVisual);

    // Monolith I Copy & Manifesto
    const darkCopy = figma.createFrame();
    darkCopy.layoutMode = "VERTICAL";
    darkCopy.itemSpacing = 8;
    darkCopy.layoutAlign = "STRETCH";
    darkCopy.fills = [];

    const darkTitle = figma.createText();
    darkTitle.fontName = serifFont;
    darkTitle.characters = "\"얼어붙은 땅을 깨우는 벼락같은 몰입과 방패.\"";
    darkTitle.fontSize = 20;
    darkTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    darkCopy.appendChild(darkTitle);

    const darkDesc = figma.createText();
    darkDesc.fontName = sansRegular;
    darkDesc.characters = "거칠고 폭발적인 기술력으로 창작자의 주권을 지켜내는 디지털 방파제. 그림자 없이 굵은 2px 선화로 뼈대를 세우는 네오 브루탈리즘 건축 헌법.";
    darkDesc.fontSize = 12;
    darkDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    darkCopy.appendChild(darkDesc);
    monolithDark.appendChild(darkCopy);

    // ─────────────────────────────────────────────────────────────
    // [Monolith II : The Thin Mindulle (민들레 / 온기와 영혼 - 라이트)]
    // ─────────────────────────────────────────────────────────────
    const monolithLight = figma.createFrame();
    monolithLight.name = "Monolith II : The Thin Mindulle (Warm Paper)";
    monolithLight.resize(860, 640);
    monolithLight.fills = [{ type: 'SOLID', color: COLOR_PAPER }];
    monolithLight.strokes = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }];
    monolithLight.strokeWeight = 2;
    monolithLight.layoutMode = "VERTICAL";
    monolithLight.primaryAxisAlignItems = "SPACE_BETWEEN";
    monolithLight.paddingLeft = 36;
    monolithLight.paddingRight = 36;
    monolithLight.paddingTop = 32;
    monolithLight.paddingBottom = 32;
    stage.appendChild(monolithLight);

    // Monolith II Header
    const lightHeader = figma.createFrame();
    lightHeader.layoutMode = "HORIZONTAL";
    lightHeader.primaryAxisAlignItems = "SPACE_BETWEEN";
    lightHeader.counterAxisAlignItems = "CENTER";
    lightHeader.layoutAlign = "STRETCH";
    lightHeader.fills = [];

    const lightTag = figma.createText();
    lightTag.fontName = sansBold;
    lightTag.characters = "MONOLITH II • LIVING SOUL (민들레)";
    lightTag.fontSize = 11;
    lightTag.fills = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }];
    lightHeader.appendChild(lightTag);

    const lightSpec = figma.createText();
    lightSpec.fontName = sansMedium;
    lightSpec.characters = "WARM PAPER (#FAF8F5) • GOLD CORE";
    lightSpec.fontSize = 10;
    lightSpec.fills = [{ type: 'SOLID', color: { r: 140 / 255, g: 100 / 255, b: 60 / 255 } }];
    lightHeader.appendChild(lightSpec);
    monolithLight.appendChild(lightHeader);

    // Monolith II Visual Specimen (Paper Texture & Gold Plume)
    const lightVisual = figma.createFrame();
    lightVisual.name = "Light Specimen Reticle";
    lightVisual.layoutAlign = "STRETCH";
    lightVisual.resize(788, 260);
    lightVisual.fills = [{ type: 'SOLID', color: { r: 242 / 255, g: 238 / 255, b: 230 / 255 } }];
    lightVisual.strokes = [{ type: 'SOLID', color: { r: 220 / 255, g: 200 / 255, b: 170 / 255 } }];
    lightVisual.strokeWeight = 2;

    const lightCircle = figma.createEllipse();
    lightCircle.resize(180, 180);
    lightCircle.x = (788 - 180) / 2;
    lightCircle.y = (260 - 180) / 2;
    lightCircle.fills = [];
    lightCircle.strokes = [{ type: 'SOLID', color: COLOR_PAPER_BORDER, opacity: 0.6 }];
    lightCircle.strokeWeight = 2;
    lightVisual.appendChild(lightCircle);

    const lightLabel = figma.createText();
    lightLabel.fontName = sansBold;
    lightLabel.characters = "THE LIVING SANCTUARY";
    lightLabel.fontSize = 13;
    lightLabel.fills = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }];
    lightLabel.x = (788 - 180) / 2;
    lightLabel.y = (260 - 16) / 2;
    lightVisual.appendChild(lightLabel);

    monolithLight.appendChild(lightVisual);

    // Monolith II Copy & Manifesto
    const lightCopy = figma.createFrame();
    lightCopy.layoutMode = "VERTICAL";
    lightCopy.itemSpacing = 8;
    lightCopy.layoutAlign = "STRETCH";
    lightCopy.fills = [];

    const lightTitle = figma.createText();
    lightTitle.fontName = serifFont;
    lightTitle.characters = "\"척박한 콘크리트 틈에서 피어나는 다정함.\"";
    lightTitle.fontSize = 20;
    lightTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_INK }];
    lightCopy.appendChild(lightTitle);

    const lightDesc = figma.createText();
    lightDesc.fontName = sansRegular;
    lightDesc.characters = "차가운 성벽의 족쇄를 풀고, 오후의 햇살과 젖은 흙내음처럼 창작자의 손길을 따스하게 보듬는 인간의 영혼. 섬세한 여백과 웜 화이트 종이 질감의 안식처.";
    lightDesc.fontSize = 12;
    lightDesc.fills = [{ type: 'SOLID', color: { r: 100 / 255, g: 90 / 255, b: 80 / 255 } }];
    lightCopy.appendChild(lightDesc);
    monolithLight.appendChild(lightCopy);

    // 6. 하단 에디토리얼 선언문 바
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

    // Left Column
    const manifestoBox = figma.createFrame();
    manifestoBox.name = "Manifesto Statement";
    manifestoBox.layoutMode = "VERTICAL";
    manifestoBox.layoutAlign = "INHERIT";
    manifestoBox.layoutGrow = 1;
    manifestoBox.primaryAxisAlignItems = "CENTER";
    manifestoBox.counterAxisAlignItems = "MIN";
    manifestoBox.itemSpacing = 8;
    manifestoBox.fills = [];

    const manifestoEyebrow = figma.createText();
    manifestoEyebrow.fontName = sansBold;
    manifestoEyebrow.characters = "ATELIER CONSTITUTION • ARTICLE II";
    manifestoEyebrow.fontSize = 10;
    manifestoEyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoEyebrow.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoEyebrow);

    const manifestoKorean = figma.createText();
    manifestoKorean.fontName = serifFont;
    manifestoKorean.characters = "\"거친 성벽의 방패(소나기) 안에 피어난, 가장 다정한 안식처(민들레).\"";
    manifestoKorean.fontSize = 28;
    manifestoKorean.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    manifestoKorean.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoKorean);

    const manifestoEnglish = figma.createText();
    manifestoEnglish.fontName = serifMedium;
    manifestoEnglish.characters = "The savage shield of rain outside, the tender sanctuary of dandelion within.";
    manifestoEnglish.fontSize = 15;
    manifestoEnglish.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoEnglish.textAutoResize = "WIDTH_AND_HEIGHT";
    manifestoBox.appendChild(manifestoEnglish);
    bottomBar.appendChild(manifestoBox);

    // Right Column
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
    progressLabel.characters = "PROGRESS  02  /  05";
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
    btnText.characters = "SCROLL TO ENTER ROOM 03 ↓";
    btnText.fontSize = 11;
    btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    btnText.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnText);

    const btnSub = figma.createText();
    btnSub.fontName = sansRegular;
    btnSub.characters = "The Cabinet of Instruments";
    btnSub.fontSize = 9;
    btnSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    btnSub.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnSub);

    navBox.appendChild(scrollBtn);
    bottomBar.appendChild(navBox);

    // 7. 뷰포트 이동
    figma.viewport.scrollAndZoomIntoView([root]);
    console.log("✅ [Sonagi UI Ops] Room 02 : The Monolith of Solace 전송 완료!");
    resolve();
  } catch (err) {
    console.error("❌ Room 02 생성 실패:", err);
    resolve();
  }
});
