/**
 * Sonagi Design System v3.0 - Room 05: The Colophon & Master Seal Detailed Edition
 * Dynamic Wing-Sail Master CI, 3-Column Swiss Colophon Credits, and Action CTAs
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

    const COLOR_CANVAS = { r: 6 / 255, g: 9 / 255, b: 17 / 255 };          // #060911
    const COLOR_SURFACE = { r: 9 / 255, g: 13 / 255, b: 22 / 255 };        // #090d16
    const COLOR_BORDER = { r: 48 / 255, g: 54 / 255, b: 61 / 255 };        // #30363d
    const COLOR_BORDER_SUBTLE = { r: 30 / 255, g: 38 / 255, b: 56 / 255 };    // #1e2638
    const COLOR_RAIN = { r: 74 / 255, g: 144 / 255, b: 226 / 255 };        // #4A90E2
    const COLOR_GOLD = { r: 255 / 255, g: 209 / 255, b: 102 / 255 };       // #ffd166
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 }; // #94a3b8
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };   // #64748b

    // Room 05 위치 탐색
    const existing = figma.currentPage.findOne(n => n.name.startsWith("Room 05 : The Colophon & Master Seal"));
    let originX = 8000;
    let originY = 0;
    if (existing) {
      originX = existing.x;
      originY = existing.y;
      existing.remove();
    } else {
      const room04 = figma.currentPage.findOne(n => n.name.startsWith("Room 04 : Five Sceneries of Solace"));
      if (room04) originX = room04.x + room04.width + 80;
    }

    // 1. 메인 뷰포트 프레임 (1920 x 1080)
    const root = figma.createFrame();
    root.name = "Room 05 : The Colophon & Master Seal [1920x1080]";
    root.x = originX;
    root.y = originY;
    root.resize(1920, 1080);
    root.clipsContent = true;
    root.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    figma.currentPage.appendChild(root);

    // 2. 외곽 건축 그리드 프레임 (2px Solid Border)
    const gridFrame = figma.createFrame();
    gridFrame.name = "Architectural Grid Boundary";
    gridFrame.x = 48; gridFrame.y = 48;
    gridFrame.resize(1824, 984);
    gridFrame.fills = [];
    gridFrame.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    gridFrame.strokeWeight = 2;
    root.appendChild(gridFrame);

    // 3. 모서리 십자 마크 (+)
    [{ x: 44, y: 44 }, { x: 1864, y: 44 }, { x: 44, y: 1024 }, { x: 1864, y: 1024 }].forEach((pos) => {
      const cross = figma.createText();
      cross.fontName = sansBold; cross.characters = "+";
      cross.fontSize = 16; cross.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cross.x = pos.x; cross.y = pos.y;
      root.appendChild(cross);
    });

    // 4. 상단 헤더
    const header = figma.createFrame();
    header.name = "Header : Architectural Bar";
    header.x = 48; header.y = 48; header.resize(1824, 72);
    header.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    header.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    header.strokeWeight = 2;
    header.layoutMode = "HORIZONTAL";
    header.primaryAxisAlignItems = "SPACE_BETWEEN";
    header.counterAxisAlignItems = "CENTER";
    header.paddingLeft = 32; header.paddingRight = 32;
    header.primaryAxisSizingMode = "FIXED";
    header.counterAxisSizingMode = "FIXED";
    root.appendChild(header);

    const brandBox = figma.createFrame();
    brandBox.layoutMode = "VERTICAL"; brandBox.itemSpacing = 2; brandBox.fills = [];
    const brandTitle = figma.createText();
    brandTitle.fontName = serifFont; brandTitle.characters = "M I N D U L L E   S T U D I O";
    brandTitle.fontSize = 16; brandTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    brandBox.appendChild(brandTitle);
    const brandSub = figma.createText();
    brandSub.fontName = sansRegular; brandSub.characters = "EXHIBITION EPILOGUE & MASTER COLOPHON";
    brandSub.fontSize = 10; brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    const roomBadge = figma.createFrame();
    roomBadge.layoutMode = "HORIZONTAL";
    roomBadge.layoutAlign = "INHERIT";
    roomBadge.primaryAxisSizingMode = "AUTO";
    roomBadge.counterAxisSizingMode = "AUTO";
    roomBadge.paddingLeft = 18; roomBadge.paddingRight = 18;
    roomBadge.paddingTop = 8; roomBadge.paddingBottom = 8; roomBadge.cornerRadius = 2;
    roomBadge.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    roomBadge.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    roomBadge.strokeWeight = 2;
    const roomText = figma.createText();
    roomText.fontName = sansBold; roomText.characters = "ROOM 05 / 05 : THE COLOPHON & MASTER SEAL";
    roomText.fontSize = 11; roomText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    roomBadge.appendChild(roomText);
    header.appendChild(roomBadge);

    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "MINDULLE MASTER BIBLE V3.0  •  FINAL SEAL";
    metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    header.appendChild(metaText);

    // 5. 중앙 무대: 2분할 웅장한 아틀리에 피날레 (Master CI + Colophon Editorial)
    const stage = figma.createFrame();
    stage.name = "Colophon Centerpiece Stage";
    stage.x = 48; stage.y = 120; stage.resize(1824, 696);
    stage.layoutMode = "HORIZONTAL";
    stage.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage.counterAxisAlignItems = "CENTER";
    stage.paddingLeft = 64; stage.paddingRight = 64;
    stage.primaryAxisSizingMode = "FIXED";
    stage.counterAxisSizingMode = "FIXED";
    stage.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root.appendChild(stage);

    // ─────────────────────────────────────────────────────────────
    // Left: The Master CI Seal Architecture (420x420)
    // ─────────────────────────────────────────────────────────────
    const sealEnsemble = figma.createFrame();
    sealEnsemble.name = "Master CI Seal Ensemble";
    sealEnsemble.resize(480, 480);
    sealEnsemble.fills = [];

    // Outer Reticle Ring 1 (R=420)
    const sRing1 = figma.createEllipse();
    sRing1.resize(440, 440); sRing1.x = 20; sRing1.y = 20;
    sRing1.fills = []; sRing1.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sRing1.strokeWeight = 2;
    sealEnsemble.appendChild(sRing1);

    // Dashed Rain Ring 2 (R=390)
    const sRing2 = figma.createEllipse();
    sRing2.resize(400, 400); sRing2.x = 40; sRing2.y = 40;
    sRing2.fills = []; sRing2.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.6 }];
    sRing2.strokeWeight = 1.5; sRing2.dashPattern = [4, 4];
    sealEnsemble.appendChild(sRing2);

    // Octagonal Bevel Dome (Polygon 8 facets)
    const sOctagon = figma.createPolygon();
    sOctagon.resize(320, 320); sOctagon.x = 80; sOctagon.y = 80;
    sOctagon.pointCount = 8; sOctagon.fills = [{ type: 'SOLID', color: COLOR_SURFACE, opacity: 0.7 }];
    sOctagon.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }]; sOctagon.strokeWeight = 1.5;
    sealEnsemble.appendChild(sOctagon);

    // The Master Symbol Vector (Dynamic Wing-Sail SVG)
    const wingSailSvg = `<svg width="240" height="240" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(195, 205)">
        <path d="M -16,72 C -24,58 -22,44 -14,38 C -6,44 -2,58 -16,72 Z" fill="#ffd166" stroke="#f59e0b" stroke-width="2" />
        <circle cx="-14" cy="52" r="3" fill="#ffffff" />
        <path d="M -14,38 C -2,12 14,-25 8,-85" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
        <path d="M -4,22 C -42,5 -75,-15 -85,-55 C -65,-46 -35,-42 3,-45 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" />
        <path d="M -9,12 C -32,-6 -55,-20 -66,-42" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 3,-24 C -22,-40 -44,-58 -52,-88 C -38,-80 -18,-74 7,-72 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" />
        <path d="M 8,-85 C 26,-58 40,-32 46,-2" stroke="#ffd166" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" opacity="0.8" />
        <circle cx="8" cy="-85" r="6" fill="#ffd166" />
        <circle cx="6" cy="-87" r="2" fill="#ffffff" />
      </g>
    </svg>`;

    const symbolNode = figma.createNodeFromSvg(wingSailSvg);
    symbolNode.resize(240, 240);
    symbolNode.x = 120; symbolNode.y = 120;
    sealEnsemble.appendChild(symbolNode);

    // Seal Bottom Caption
    const sealCap = figma.createText();
    sealCap.fontName = sansBold;
    sealCap.characters = "MINDULLE ATELIER MASTER SEAL • V0.1.0";
    sealCap.fontSize = 11;
    sealCap.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    sealCap.x = 115; sealCap.y = 455;
    sealEnsemble.appendChild(sealCap);

    stage.appendChild(sealEnsemble);

    // ─────────────────────────────────────────────────────────────
    // Right: Colophon Manifesto, 3-Column Credits & Action CTAs
    // ─────────────────────────────────────────────────────────────
    const rightCol = figma.createFrame();
    rightCol.name = "Colophon Editorial Content";
    rightCol.resize(1080, 580);
    rightCol.layoutMode = "VERTICAL";
    rightCol.primaryAxisAlignItems = "SPACE_BETWEEN";
    rightCol.counterAxisAlignItems = "MIN";
    rightCol.fills = [];
    rightCol.primaryAxisSizingMode = "FIXED";
    rightCol.counterAxisSizingMode = "AUTO";
    rightCol.clipsContent = false;

    // Header Area
    const headArea = figma.createFrame();
    headArea.layoutMode = "VERTICAL";
    headArea.itemSpacing = 8;
    headArea.layoutAlign = "STRETCH";
    headArea.primaryAxisSizingMode = "AUTO";
    headArea.counterAxisSizingMode = "AUTO";
    headArea.fills = [];

    const colophonEyebrow = figma.createText();
    colophonEyebrow.fontName = sansBold;
    colophonEyebrow.characters = "MINDULLE ATELIER • SOVEREIGN SOFTWARE FORGE";
    colophonEyebrow.fontSize = 11;
    colophonEyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    colophonEyebrow.textAutoResize = "WIDTH_AND_HEIGHT";
    headArea.appendChild(colophonEyebrow);

    const colophonTitle = figma.createText();
    colophonTitle.fontName = serifFont;
    colophonTitle.characters = "\"기계가 완벽해야 사람이 쉴 수 있다.\"";
    colophonTitle.fontSize = 34; // 34px 대형 피날레 타이포
    colophonTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    colophonTitle.textAutoResize = "WIDTH_AND_HEIGHT";
    headArea.appendChild(colophonTitle);

    const colophonEn = figma.createText();
    colophonEn.fontName = serifMedium;
    colophonEn.characters = "When the machine is flawless, the human soul finds its solace.";
    colophonEn.fontSize = 15;
    colophonEn.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    colophonEn.textAutoResize = "WIDTH_AND_HEIGHT";
    headArea.appendChild(colophonEn);

    const colophonPara = figma.createText();
    colophonPara.fontName = sansRegular;
    colophonPara.characters = "우리는 가장 엄격하고 단단한 2px 건축의 성벽을 짓습니다. 당신이 차가운 화면을 끄고, 삶의 가장 소중한 장면 속으로 걸어 들어갈 수 있도록.";
    colophonPara.fontSize = 12;
    colophonPara.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    colophonPara.textAutoResize = "WIDTH_AND_HEIGHT";
    headArea.appendChild(colophonPara);

    rightCol.appendChild(headArea);

    // 3-Column Swiss Grid Colophon Credits
    const creditGrid = figma.createFrame();
    creditGrid.name = "Colophon Credits (3-Column)";
    creditGrid.layoutMode = "HORIZONTAL";
    creditGrid.itemSpacing = 24;
    creditGrid.layoutAlign = "STRETCH";
    creditGrid.primaryAxisAlignItems = "SPACE_BETWEEN";
    creditGrid.primaryAxisSizingMode = "FIXED";
    creditGrid.counterAxisSizingMode = "AUTO";
    creditGrid.fills = [];

    const credits = [
      {
        num: "01 / ARCHITECTURE",
        title: "The True 2px Law",
        desc: "그림자를 배제하고 2px 솔리드 선화와 8px 스위스 그리드로 지어 올린 디지털 요새."
      },
      {
        num: "02 / PALETTE",
        title: "60-30-10 OKLCH",
        desc: "Deep Ink 60%, Rain Blue 30%, Dandelion Gold 10%의 엄격한 시각적 균형 헌법."
      },
      {
        num: "03 / TOOLING SUITE",
        title: "6-in-1 Sovereign",
        desc: "실무에서 스스로를 검증하는 도구 생태계. 타협 없는 오픈소스 주권 소프트웨어."
      }
    ];

    credits.forEach((c) => {
      const cCard = figma.createFrame();
      cCard.resize(344, 130);
      cCard.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      cCard.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      cCard.strokeWeight = 1.5;
      cCard.layoutMode = "VERTICAL";
      cCard.primaryAxisAlignItems = "SPACE_BETWEEN";
      cCard.primaryAxisSizingMode = "FIXED";
      cCard.counterAxisSizingMode = "FIXED";
      cCard.paddingLeft = 20; cCard.paddingRight = 20; cCard.paddingTop = 16; cCard.paddingBottom = 16;

      const cHead = figma.createFrame();
      cHead.layoutMode = "VERTICAL"; cHead.itemSpacing = 4; cHead.layoutAlign = "STRETCH"; cHead.fills = [];
      const cNum = figma.createText(); cNum.fontName = sansBold; cNum.characters = c.num;
      cNum.fontSize = 10; cNum.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; cHead.appendChild(cNum);
      const cTitle = figma.createText(); cTitle.fontName = sansBold; cTitle.characters = c.title;
      cTitle.fontSize = 13; cTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; cHead.appendChild(cTitle);
      cCard.appendChild(cHead);

      const cDesc = figma.createText(); cDesc.fontName = sansRegular; cDesc.characters = c.desc;
      cDesc.fontSize = 10;
      cDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      cCard.appendChild(cDesc);

      creditGrid.appendChild(cCard);
    });

    rightCol.appendChild(creditGrid);

    // Action CTA Button Row (AutoLayout HUG)
    const ctaRow = figma.createFrame();
    ctaRow.name = "CTA Action Row";
    ctaRow.layoutMode = "HORIZONTAL";
    ctaRow.counterAxisAlignItems = "CENTER";
    ctaRow.primaryAxisSizingMode = "AUTO";
    ctaRow.counterAxisSizingMode = "AUTO";
    ctaRow.itemSpacing = 20;
    ctaRow.fills = [];

    // Primary CTA Button
    const btnPrimary = figma.createFrame();
    btnPrimary.name = "Primary Button";
    btnPrimary.layoutMode = "HORIZONTAL";
    btnPrimary.primaryAxisAlignItems = "CENTER";
    btnPrimary.counterAxisAlignItems = "CENTER";
    btnPrimary.primaryAxisSizingMode = "AUTO";
    btnPrimary.counterAxisSizingMode = "AUTO";
    btnPrimary.paddingLeft = 32; btnPrimary.paddingRight = 32; btnPrimary.paddingTop = 16; btnPrimary.paddingBottom = 16;
    btnPrimary.cornerRadius = 2;
    btnPrimary.fills = [{ type: 'SOLID', color: COLOR_GOLD }];

    const b1Text = figma.createText();
    b1Text.fontName = sansBold;
    b1Text.characters = "ENTER THE ATELIER ➔";
    b1Text.fontSize = 12;
    b1Text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    b1Text.textAutoResize = "WIDTH_AND_HEIGHT";
    btnPrimary.appendChild(b1Text);
    ctaRow.appendChild(btnPrimary);

    // Secondary CTA Button
    const btnSecondary = figma.createFrame();
    btnSecondary.name = "Secondary Button";
    btnSecondary.layoutMode = "HORIZONTAL";
    btnSecondary.primaryAxisAlignItems = "CENTER";
    btnSecondary.counterAxisAlignItems = "CENTER";
    btnSecondary.primaryAxisSizingMode = "AUTO";
    btnSecondary.counterAxisSizingMode = "AUTO";
    btnSecondary.paddingLeft = 32; btnSecondary.paddingRight = 32; btnSecondary.paddingTop = 16; btnSecondary.paddingBottom = 16;
    btnSecondary.cornerRadius = 2;
    btnSecondary.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    btnSecondary.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    btnSecondary.strokeWeight = 2;

    const b2Text = figma.createText();
    b2Text.fontName = sansBold;
    b2Text.characters = "EXPLORE CODE REPOSITORY";
    b2Text.fontSize = 12;
    b2Text.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    b2Text.textAutoResize = "WIDTH_AND_HEIGHT";
    btnSecondary.appendChild(b2Text);
    ctaRow.appendChild(btnSecondary);

    rightCol.appendChild(ctaRow);
    stage.appendChild(rightCol);

    // 6. 하단 에디토리얼 선언문 바
    const bottomBar = figma.createFrame();
    bottomBar.name = "Bottom Section : Manifesto & Navigation Bar";
    bottomBar.x = 48; bottomBar.y = 816; bottomBar.resize(1824, 216);
    bottomBar.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    bottomBar.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    bottomBar.strokeWeight = 2;
    bottomBar.layoutMode = "HORIZONTAL";
    bottomBar.primaryAxisAlignItems = "SPACE_BETWEEN";
    bottomBar.counterAxisAlignItems = "CENTER";
    bottomBar.paddingLeft = 48; bottomBar.paddingRight = 48;
    bottomBar.paddingTop = 28; bottomBar.paddingBottom = 28;
    bottomBar.primaryAxisSizingMode = "FIXED";
    bottomBar.counterAxisSizingMode = "FIXED";
    root.appendChild(bottomBar);

    const manifestoBox = figma.createFrame();
    manifestoBox.layoutMode = "VERTICAL"; manifestoBox.layoutGrow = 1; manifestoBox.counterAxisAlignItems = "MIN";
    manifestoBox.itemSpacing = 8; manifestoBox.fills = [];

    const eyebrow = figma.createText();
    eyebrow.fontName = sansBold; eyebrow.characters = "ATELIER CONSTITUTION • EPILOGUE";
    eyebrow.fontSize = 10; eyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(eyebrow);

    const mainQuote = figma.createText();
    mainQuote.fontName = serifFont;
    mainQuote.characters = "\"도구가 완전할 때, 손길은 비로소 자유로워진다.\"";
    mainQuote.fontSize = 28; mainQuote.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    manifestoBox.appendChild(mainQuote);

    const subQuote = figma.createText();
    subQuote.fontName = serifMedium;
    subQuote.characters = "So that you may step away from the screen, and walk into the dearest scenes of your life.";
    subQuote.fontSize = 15; subQuote.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(subQuote);
    bottomBar.appendChild(manifestoBox);

    const navBox = figma.createFrame();
    navBox.layoutMode = "VERTICAL"; navBox.counterAxisAlignItems = "MAX"; navBox.itemSpacing = 10; navBox.fills = [];

    const progressLabel = figma.createText();
    progressLabel.fontName = sansBold; progressLabel.characters = "EXHIBITION COMPLETED";
    progressLabel.fontSize = 11; progressLabel.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    navBox.appendChild(progressLabel);

    const scrollBtn = figma.createFrame();
    scrollBtn.layoutMode = "VERTICAL"; scrollBtn.paddingLeft = 28; scrollBtn.paddingRight = 28;
    scrollBtn.paddingTop = 14; scrollBtn.paddingBottom = 14; scrollBtn.cornerRadius = 2;
    scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.strokeWeight = 2;
    const btnText = figma.createText();
    btnText.fontName = sansBold; btnText.characters = "RE-READ FROM ROOM 01 ↺";
    btnText.fontSize = 11; btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.appendChild(btnText);
    navBox.appendChild(scrollBtn);
    bottomBar.appendChild(navBox);

    figma.viewport.scrollAndZoomIntoView([root]);
    figma.notify("🏛️ Room 05 : The Colophon & Master Seal 세공 완료!");
    resolve();
  } catch (err) {
    console.error("Room 05 detail generation failed:", err);
    resolve();
  }
});
