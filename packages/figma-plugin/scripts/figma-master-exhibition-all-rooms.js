/**
 * Sonagi Design System v3.0 - Full Master Exhibition Wireframe
 * Generates all 5 Rooms (Room 01 ~ Room 05) with 100% Rock-Solid AutoLayout Compatibility
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
    const COLOR_PAPER = { r: 250 / 255, g: 248 / 255, b: 245 / 255 };      // #faf8f5
    const COLOR_PAPER_BORDER = { r: 217 / 255, g: 119 / 255, b: 6 / 255 };  // #d97706
    const COLOR_BORDER = { r: 48 / 255, g: 54 / 255, b: 61 / 255 };        // #30363d
    const COLOR_BORDER_SUBTLE = { r: 30 / 255, g: 38 / 255, b: 56 / 255 };    // #1e2638
    const COLOR_RAIN = { r: 74 / 255, g: 144 / 255, b: 226 / 255 };        // #4A90E2
    const COLOR_GOLD = { r: 255 / 255, g: 209 / 255, b: 102 / 255 };       // #ffd166
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_INK = { r: 10 / 255, g: 15 / 255, b: 28 / 255 };
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 };
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };

    // Clean up all existing Room frames first to avoid stacking or corrupted nodes
    const existingRooms = figma.currentPage.children.filter(c => c.name.startsWith("Room 0"));
    let originX = 0;
    let originY = 0;
    if (existingRooms.length > 0) {
      originX = existingRooms[0].x;
      originY = existingRooms[0].y;
      existingRooms.forEach(r => r.remove());
    }

    function createRoomBase(name, x, y) {
      const root = figma.createFrame();
      root.name = `${name} [1920x1080]`;
      root.x = x; root.y = y;
      root.resize(1920, 1080);
      root.clipsContent = true;
      root.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
      figma.currentPage.appendChild(root);

      const grid = figma.createFrame();
      grid.name = "Architectural Grid Boundary";
      grid.x = 48; grid.y = 48;
      grid.resize(1824, 984);
      grid.fills = [];
      grid.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      grid.strokeWeight = 2;
      root.appendChild(grid);

      [{ x: 44, y: 44 }, { x: 1864, y: 44 }, { x: 44, y: 1024 }, { x: 1864, y: 1024 }].forEach((pos) => {
        const cross = figma.createText();
        cross.fontName = sansBold; cross.characters = "+";
        cross.fontSize = 16; cross.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
        cross.x = pos.x; cross.y = pos.y;
        root.appendChild(cross);
      });

      return root;
    }

    function createHeader(root, roomTitle, roomSub) {
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
      brandBox.layoutMode = "VERTICAL"; brandBox.primaryAxisSizingMode = "AUTO"; brandBox.counterAxisSizingMode = "AUTO";
      brandBox.itemSpacing = 2; brandBox.fills = [];
      const brandTitle = figma.createText();
      brandTitle.fontName = serifFont; brandTitle.characters = "M I N D U L L E   S T U D I O";
      brandTitle.fontSize = 16; brandTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      brandBox.appendChild(brandTitle);
      const brandSubText = figma.createText();
      brandSubText.fontName = sansRegular; brandSubText.characters = roomSub;
      brandSubText.fontSize = 10; brandSubText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      brandBox.appendChild(brandSubText);
      header.appendChild(brandBox);

      const roomBadge = figma.createFrame();
      roomBadge.layoutMode = "HORIZONTAL"; roomBadge.paddingLeft = 18; roomBadge.paddingRight = 18;
      roomBadge.paddingTop = 8; roomBadge.paddingBottom = 8; roomBadge.cornerRadius = 2;
      roomBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
      roomBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
      roomBadge.strokeWeight = 2;
      const roomText = figma.createText();
      roomText.fontName = sansBold; roomText.characters = roomTitle;
      roomText.fontSize = 11; roomText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      roomBadge.appendChild(roomText);
      header.appendChild(roomBadge);

      const metaText = figma.createText();
      metaText.fontName = sansMedium;
      metaText.characters = "37.5665° N, 126.9780° E  •  ARCHITECTURAL MASTER V3.0";
      metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      header.appendChild(metaText);
    }

    function createBottomBar(root, article, quoteKo, quoteEn, progress, nextRoomTitle) {
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
      eyebrow.fontName = sansBold; eyebrow.characters = article;
      eyebrow.fontSize = 10; eyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      manifestoBox.appendChild(eyebrow);

      const mainQuote = figma.createText();
      mainQuote.fontName = serifFont; mainQuote.characters = quoteKo;
      mainQuote.fontSize = 28; mainQuote.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      manifestoBox.appendChild(mainQuote);

      const subQuote = figma.createText();
      subQuote.fontName = serifMedium; subQuote.characters = quoteEn;
      subQuote.fontSize = 15; subQuote.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      manifestoBox.appendChild(subQuote);
      bottomBar.appendChild(manifestoBox);

      const navBox = figma.createFrame();
      navBox.layoutMode = "VERTICAL"; navBox.counterAxisAlignItems = "MAX"; navBox.itemSpacing = 10; navBox.fills = [];

      const progressLabel = figma.createText();
      progressLabel.fontName = sansBold; progressLabel.characters = progress;
      progressLabel.fontSize = 11; progressLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      navBox.appendChild(progressLabel);

      const scrollBtn = figma.createFrame();
      scrollBtn.layoutMode = "VERTICAL"; scrollBtn.paddingLeft = 28; scrollBtn.paddingRight = 28;
      scrollBtn.paddingTop = 14; scrollBtn.paddingBottom = 14; scrollBtn.cornerRadius = 2;
      scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
      scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
      scrollBtn.strokeWeight = 2;
      const btnText = figma.createText();
      btnText.fontName = sansBold; btnText.characters = nextRoomTitle.startsWith("ENTER") ? nextRoomTitle : `SCROLL TO ENTER ${nextRoomTitle} ↓`;
      btnText.fontSize = 11; btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      scrollBtn.appendChild(btnText);
      navBox.appendChild(scrollBtn);
      bottomBar.appendChild(navBox);
    }

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 01 : THE GLASS PAVILION (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const root01 = createRoomBase("Room 01 : The Glass Pavilion", originX, originY);
    createHeader(root01, "ROOM 01 / 05 : THE GLASS PAVILION", "HANDCRAFTED SOFTWARE ATELIER • EST. 2026");

    const stage01 = figma.createFrame();
    stage01.name = "Centerpiece Stage";
    stage01.x = 48; stage01.y = 120; stage01.resize(1824, 696);
    stage01.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root01.appendChild(stage01);

    const cX = 1824 / 2;
    const cY = 696 / 2;

    const circleOuter01 = figma.createEllipse();
    circleOuter01.resize(400, 400); circleOuter01.x = cX - 200; circleOuter01.y = cY - 200;
    circleOuter01.fills = []; circleOuter01.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.35 }];
    circleOuter01.strokeWeight = 2; stage01.appendChild(circleOuter01);

    const circleInner01 = figma.createEllipse();
    circleInner01.resize(180, 180); circleInner01.x = cX - 90; circleInner01.y = cY - 90;
    circleInner01.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.04 }];
    circleInner01.strokes = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.75 }];
    circleInner01.strokeWeight = 2; stage01.appendChild(circleInner01);

    const stageLabel01 = figma.createFrame();
    stageLabel01.layoutMode = "VERTICAL"; stageLabel01.primaryAxisAlignItems = "CENTER"; stageLabel01.counterAxisAlignItems = "CENTER";
    stageLabel01.itemSpacing = 6; stageLabel01.x = cX - 230; stageLabel01.y = cY - 40; stageLabel01.resize(460, 80); stageLabel01.fills = [];
    const lTitle01 = figma.createText(); lTitle01.fontName = sansBold; lTitle01.characters = "[ EXHIBIT A : SONIC DROPLET & PAPERWEIGHT ]";
    lTitle01.fontSize = 13; lTitle01.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; stageLabel01.appendChild(lTitle01);
    const lDesc01 = figma.createText(); lDesc01.fontName = sansRegular; lDesc01.characters = "Real-time Three.js Glass Shader • Refraction Index 1.52";
    lDesc01.fontSize = 11; lDesc01.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; stageLabel01.appendChild(lDesc01);
    stage01.appendChild(stageLabel01);

    const placard01 = figma.createFrame();
    placard01.name = "Artwork Placard (Caption)";
    placard01.x = cX + 240; placard01.y = cY + 40; placard01.resize(340, 160);
    placard01.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    placard01.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; placard01.strokeWeight = 2;
    placard01.layoutMode = "VERTICAL"; placard01.itemSpacing = 8;
    placard01.paddingLeft = 20; placard01.paddingRight = 20; placard01.paddingTop = 18; placard01.paddingBottom = 18;

    const pTag01 = figma.createText(); pTag01.fontName = sansBold; pTag01.characters = "GALLERY CAPTION • 01";
    pTag01.fontSize = 9; pTag01.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; placard01.appendChild(pTag01);
    const pTitle01 = figma.createText(); pTitle01.fontName = sansBold; pTitle01.characters = "THE SONIC DROPLET IN GLASS";
    pTitle01.fontSize = 12; pTitle01.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; placard01.appendChild(pTitle01);
    const pMeta01 = figma.createText(); pMeta01.fontName = sansRegular; pMeta01.characters = "Medium : Procedural Water Droplet, Glass Dome, Obsidian\nConstitution : The True 2px Law & 60-30-10 OKLCH Balance";
    pMeta01.fontSize = 10; pMeta01.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; placard01.appendChild(pMeta01);
    stage01.appendChild(placard01);

    createBottomBar(root01, "ATELIER CONSTITUTION • ARTICLE I", "\"도구가 완벽할 때, 손길은 비로소 자유로워진다.\"", "When the machine is flawless, human soul finds its solace.", "PROGRESS  01  /  05", "ROOM 02 (The Monolith of Solace)");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 02 : THE MONOLITH OF SOLACE (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const x02 = originX + 2000;
    const root02 = createRoomBase("Room 02 : The Monolith of Solace", x02, originY);
    createHeader(root02, "ROOM 02 / 05 : THE MONOLITH OF SOLACE", "THE TRINITY ATELIER • DUAL THEME SPECIMEN");

    const stage02 = figma.createFrame();
    stage02.x = 48; stage02.y = 120; stage02.resize(1824, 696);
    stage02.layoutMode = "HORIZONTAL"; stage02.primaryAxisAlignItems = "SPACE_BETWEEN"; stage02.counterAxisAlignItems = "CENTER";
    stage02.paddingLeft = 24; stage02.paddingRight = 24; stage02.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root02.appendChild(stage02);

    const mDark = figma.createFrame();
    mDark.resize(860, 640); mDark.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    mDark.strokes = [{ type: 'SOLID', color: COLOR_RAIN }]; mDark.strokeWeight = 2;
    mDark.layoutMode = "VERTICAL"; mDark.primaryAxisAlignItems = "SPACE_BETWEEN";
    mDark.paddingLeft = 36; mDark.paddingRight = 36; mDark.paddingTop = 32; mDark.paddingBottom = 32;
    stage02.appendChild(mDark);

    const mDarkHead = figma.createFrame(); mDarkHead.layoutMode = "HORIZONTAL"; mDarkHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mDarkHead.layoutAlign = "STRETCH"; mDarkHead.fills = [];
    const mDarkTag = figma.createText(); mDarkTag.fontName = sansBold; mDarkTag.characters = "MONOLITH I • WILD ARCHITECTURE (소나기)";
    mDarkTag.fontSize = 11; mDarkTag.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; mDarkHead.appendChild(mDarkTag);
    mDark.appendChild(mDarkHead);

    const mDarkVisual = figma.createFrame(); mDarkVisual.layoutAlign = "STRETCH"; mDarkVisual.resize(788, 260);
    mDarkVisual.fills = [{ type: 'SOLID', color: COLOR_CANVAS }]; mDarkVisual.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }]; mDarkVisual.strokeWeight = 2;
    const mDarkLabel = figma.createText(); mDarkLabel.fontName = sansBold; mDarkLabel.characters = "THE DIGITAL FORTRESS";
    mDarkLabel.fontSize = 14; mDarkLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; mDarkLabel.x = (788-160)/2; mDarkLabel.y = 120;
    mDarkVisual.appendChild(mDarkLabel); mDark.appendChild(mDarkVisual);

    const mDarkCopy = figma.createFrame(); mDarkCopy.layoutMode = "VERTICAL"; mDarkCopy.itemSpacing = 8; mDarkCopy.layoutAlign = "STRETCH"; mDarkCopy.fills = [];
    const mDarkTitle = figma.createText(); mDarkTitle.fontName = serifFont; mDarkTitle.characters = "\"얼어붙은 땅을 깨우는 벼락같은 몰입과 방패.\"";
    mDarkTitle.fontSize = 20; mDarkTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; mDarkCopy.appendChild(mDarkTitle);
    const mDarkDesc = figma.createText(); mDarkDesc.fontName = sansRegular; mDarkDesc.characters = "거칠고 폭발적인 기술력으로 창작자의 주권을 지켜내는 디지털 방파제.";
    mDarkDesc.fontSize = 12; mDarkDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; mDarkCopy.appendChild(mDarkDesc);
    mDark.appendChild(mDarkCopy);

    const mLight = figma.createFrame();
    mLight.resize(860, 640); mLight.fills = [{ type: 'SOLID', color: COLOR_PAPER }];
    mLight.strokes = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }]; mLight.strokeWeight = 2;
    mLight.layoutMode = "VERTICAL"; mLight.primaryAxisAlignItems = "SPACE_BETWEEN";
    mLight.paddingLeft = 36; mLight.paddingRight = 36; mLight.paddingTop = 32; mLight.paddingBottom = 32;
    stage02.appendChild(mLight);

    const mLightHead = figma.createFrame(); mLightHead.layoutMode = "HORIZONTAL"; mLightHead.primaryAxisAlignItems = "SPACE_BETWEEN"; mLightHead.layoutAlign = "STRETCH"; mLightHead.fills = [];
    const mLightTag = figma.createText(); mLightTag.fontName = sansBold; mLightTag.characters = "MONOLITH II • LIVING SOUL (민들레)";
    mLightTag.fontSize = 11; mLightTag.fills = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }]; mLightHead.appendChild(mLightTag);
    mLight.appendChild(mLightHead);

    const mLightVisual = figma.createFrame(); mLightVisual.layoutAlign = "STRETCH"; mLightVisual.resize(788, 260);
    mLightVisual.fills = [{ type: 'SOLID', color: { r: 242/255, g: 238/255, b: 230/255 } }]; mLightVisual.strokes = [{ type: 'SOLID', color: { r: 220/255, g: 200/255, b: 170/255 } }]; mLightVisual.strokeWeight = 2;
    const mLightLabel = figma.createText(); mLightLabel.fontName = sansBold; mLightLabel.characters = "THE LIVING SANCTUARY";
    mLightLabel.fontSize = 14; mLightLabel.fills = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }]; mLightLabel.x = (788-160)/2; mLightLabel.y = 120;
    mLightVisual.appendChild(mLightLabel); mLight.appendChild(mLightVisual);

    const mLightCopy = figma.createFrame(); mLightCopy.layoutMode = "VERTICAL"; mLightCopy.itemSpacing = 8; mLightCopy.layoutAlign = "STRETCH"; mLightCopy.fills = [];
    const mLightTitle = figma.createText(); mLightTitle.fontName = serifFont; mLightTitle.characters = "\"척박한 콘크리트 틈에서 피어나는 다정함.\"";
    mLightTitle.fontSize = 20; mLightTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_INK }]; mLightCopy.appendChild(mLightTitle);
    const mLightDesc = figma.createText(); mLightDesc.fontName = sansRegular; mLightDesc.characters = "차가운 성벽의 족쇄를 풀고, 창작자의 손길을 따스하게 보듬는 인간의 영혼.";
    mLightDesc.fontSize = 12; mLightDesc.fills = [{ type: 'SOLID', color: { r: 100/255, g: 90/255, b: 80/255 } }]; mLightCopy.appendChild(mLightDesc);
    mLight.appendChild(mLightCopy);

    createBottomBar(root02, "ATELIER CONSTITUTION • ARTICLE II", "\"거친 성벽의 방패(소나기) 안에 피어난, 가장 다정한 안식처(민들레).\"", "The savage shield of rain outside, the tender sanctuary of dandelion within.", "PROGRESS  02  /  05", "ROOM 03 (The Cabinet of Instruments)");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 03 : THE CABINET OF INSTRUMENTS (1920x1080) - 2 Rows of 3 Cards
    // ════════════════════════════════════════════════════════════════════════
    const x03 = originX + 4000;
    const root03 = createRoomBase("Room 03 : The Cabinet of Instruments", x03, originY);
    createHeader(root03, "ROOM 03 / 05 : THE CABINET OF INSTRUMENTS", "THE SONAGI 6-IN-1 TOOLING SUITE");

    const stage03 = figma.createFrame();
    stage03.name = "Instruments Grid Stage";
    stage03.x = 48; stage03.y = 120; stage03.resize(1824, 696);
    stage03.layoutMode = "VERTICAL";
    stage03.itemSpacing = 24;
    stage03.paddingLeft = 24; stage03.paddingRight = 24; stage03.paddingTop = 20; stage03.paddingBottom = 20;
    stage03.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage03.counterAxisAlignItems = "CENTER";
    stage03.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root03.appendChild(stage03);

    const tools = [
      { name: "VectorCraft", tag: "PRECISION BEZIER ENGINE", desc: "3차 베지어 곡선과 태블릿 펜 손맛을 보정하는 정밀 2px 벡터 드로잉 및 아이콘 공방 도구.", num: "01" },
      { name: "PhotoCraft", tag: "RETRO & ANALOG LAB", desc: "필름 그레인과 레트로 질감을 세공하는 아날로그 감성 이미지 에디터.", num: "02" },
      { name: "EffectCraft", tag: "WEBGL & PARTICLE STUDIO", desc: "실시간 WebGL 셰이더와 비/물결 파티클을 코딩 없이 조작하는 비주얼 이펙트 랩.", num: "03" },
      { name: "DesignCraft", tag: "W3C TOKEN COMPOSER", desc: "W3C 디자인 토큰을 기반으로 프레임과 오토레이아웃을 조립하는 시스템 UI 팩토리.", num: "04" },
      { name: "FilmCraft", tag: "TIMELINE MOTION DIRECTOR", desc: "프레임 단위의 시네마틱 모션과 3D 카메라 워크를 직관적으로 연출하는 영상 스튜디오.", num: "05" },
      { name: "Sonagi Draw", tag: "COLLABORATIVE WHITEBOARD", desc: "tldraw 기반의 실시간 협업 화이트보드와 무한 캔버스 와이어프레이밍 작업대.", num: "06" },
    ];

    function createToolCard(t) {
      const card = figma.createFrame();
      card.name = `Instrument : ${t.name}`;
      card.resize(570, 310);
      card.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      card.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; card.strokeWeight = 2;
      card.layoutMode = "VERTICAL"; card.primaryAxisAlignItems = "SPACE_BETWEEN";
      card.paddingLeft = 28; card.paddingRight = 28; card.paddingTop = 24; card.paddingBottom = 24;

      const cardHead = figma.createFrame(); cardHead.layoutMode = "HORIZONTAL"; cardHead.primaryAxisAlignItems = "SPACE_BETWEEN"; cardHead.layoutAlign = "STRETCH"; cardHead.fills = [];
      const numText = figma.createText(); numText.fontName = sansBold; numText.characters = `ARTIFACT • ${t.num}`;
      numText.fontSize = 11; numText.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; cardHead.appendChild(numText);

      const statusBadge = figma.createFrame(); statusBadge.paddingLeft = 8; statusBadge.paddingRight = 8; statusBadge.paddingTop = 2; statusBadge.paddingBottom = 2;
      statusBadge.cornerRadius = 2; statusBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
      statusBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }]; statusBadge.strokeWeight = 1;
      const statusText = figma.createText(); statusText.fontName = sansBold; statusText.characters = "2PX LAW READY";
      statusText.fontSize = 9; statusText.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; statusBadge.appendChild(statusText);
      cardHead.appendChild(statusBadge); card.appendChild(cardHead);

      const cardMid = figma.createFrame(); cardMid.layoutMode = "VERTICAL"; cardMid.itemSpacing = 6; cardMid.layoutAlign = "STRETCH"; cardMid.fills = [];
      const titleText = figma.createText(); titleText.fontName = serifFont; titleText.characters = t.name;
      titleText.fontSize = 24; titleText.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; cardMid.appendChild(titleText);
      const tagText = figma.createText(); tagText.fontName = sansBold; tagText.characters = t.tag;
      tagText.fontSize = 10; tagText.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; cardMid.appendChild(tagText);
      const descText = figma.createText(); descText.fontName = sansRegular; descText.characters = t.desc;
      descText.fontSize = 11; descText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; cardMid.appendChild(descText);
      card.appendChild(cardMid);

      const cardFoot = figma.createFrame(); cardFoot.layoutMode = "HORIZONTAL"; cardFoot.primaryAxisAlignItems = "SPACE_BETWEEN"; cardFoot.layoutAlign = "STRETCH"; cardFoot.fills = [];
      const specText = figma.createText(); specText.fontName = sansMedium; specText.characters = "Grid: 32x32px  •  Stroke: 2px Solid";
      specText.fontSize = 10; specText.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }]; cardFoot.appendChild(specText);
      const actionText = figma.createText(); actionText.fontName = sansBold; actionText.characters = "VIEW BLUEPRINT ➔";
      actionText.fontSize = 10; actionText.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; cardFoot.appendChild(actionText);
      card.appendChild(cardFoot);

      return card;
    }

    const row1 = figma.createFrame();
    row1.name = "Instruments Row 1";
    row1.layoutMode = "HORIZONTAL"; row1.itemSpacing = 24; row1.layoutAlign = "STRETCH";
    row1.primaryAxisAlignItems = "SPACE_BETWEEN"; row1.fills = [];
    row1.appendChild(createToolCard(tools[0]));
    row1.appendChild(createToolCard(tools[1]));
    row1.appendChild(createToolCard(tools[2]));
    stage03.appendChild(row1);

    const row2 = figma.createFrame();
    row2.name = "Instruments Row 2";
    row2.layoutMode = "HORIZONTAL"; row2.itemSpacing = 24; row2.layoutAlign = "STRETCH";
    row2.primaryAxisAlignItems = "SPACE_BETWEEN"; row2.fills = [];
    row2.appendChild(createToolCard(tools[3]));
    row2.appendChild(createToolCard(tools[4]));
    row2.appendChild(createToolCard(tools[5]));
    stage03.appendChild(row2);

    createBottomBar(root03, "ATELIER CONSTITUTION • ARTICLE III", "\"도구가 완전할 때, 창작자의 손길은 거침없이 뻗어 나간다.\"", "When instruments reach perfection, creator's touch flows without friction.", "PROGRESS  03  /  05", "ROOM 04 (Five Sceneries of Solace)");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 04 : FIVE SCENERIES OF SOLACE (1920x1080) - 5 Poster Panels
    // ════════════════════════════════════════════════════════════════════════
    const x04 = originX + 6000;
    const root04 = createRoomBase("Room 04 : Five Sceneries of Solace", x04, originY);
    createHeader(root04, "ROOM 04 / 05 : FIVE SCENERIES OF SOLACE", "POETIC MANIFESTO POSTER GALLERY");

    const stage04 = figma.createFrame();
    stage04.name = "Five Sceneries Poster Arena";
    stage04.x = 48; stage04.y = 120; stage04.resize(1824, 696);
    stage04.layoutMode = "HORIZONTAL"; stage04.primaryAxisAlignItems = "SPACE_BETWEEN"; stage04.counterAxisAlignItems = "CENTER";
    stage04.paddingLeft = 20; stage04.paddingRight = 20; stage04.itemSpacing = 20;
    stage04.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root04.appendChild(stage04);

    const sceneries = [
      { num: "SCENE I", title: "비 온 뒤의 쉼", sub: "Petrichor & Clarity", desc: "창문에 흘러내리는 빗방울이 맑게 개며 스며드는 아침 햇살과 젖은 흙냄새의 정화." },
      { num: "SCENE II", title: "즉흥적인 모험", sub: "The Sunset Horizon", desc: "계획된 일상을 깨부수고, 노을빛으로 물드는 붉은 해안도로를 향해 훌쩍 떠나는 자유." },
      { num: "SCENE III", title: "질긴 생명력", sub: "Dandelion in Asphalt", desc: "차가운 콘크리트 틈바구니에서 기어이 피어나 바람을 타고 날아가는 노란 솜털 홀씨." },
      { num: "SCENE IV", title: "아늑한 아틀리에", sub: "The Sunlit Workshop", desc: "세상의 비바람을 뚫고, 오후의 햇살이 가득 쏟아지는 작업대 위에서 다시 펼치는 날개." },
      { num: "SCENE V", title: "궁극의 안식처", sub: "The Midnight Hearth", desc: "차가운 밤공기를 뒤로하고, 잠든 아이의 따뜻한 무게를 안고 현관문을 열고 들어오는 거실." },
    ];

    sceneries.forEach((s) => {
      const poster = figma.createFrame();
      poster.name = `Poster : ${s.title}`;
      poster.resize(336, 640);
      poster.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      poster.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; poster.strokeWeight = 2;
      poster.layoutMode = "VERTICAL"; poster.primaryAxisAlignItems = "SPACE_BETWEEN";
      poster.paddingLeft = 24; poster.paddingRight = 24; poster.paddingTop = 28; poster.paddingBottom = 28;

      const pHead = figma.createFrame(); pHead.layoutMode = "VERTICAL"; pHead.itemSpacing = 4; pHead.layoutAlign = "STRETCH"; pHead.fills = [];
      const pNum = figma.createText(); pNum.fontName = sansBold; pNum.characters = s.num;
      pNum.fontSize = 11; pNum.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; pHead.appendChild(pNum);
      const pSub = figma.createText(); pSub.fontName = sansMedium; pSub.characters = s.sub;
      pSub.fontSize = 10; pSub.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; pHead.appendChild(pSub);
      poster.appendChild(pHead);

      const pArt = figma.createFrame(); pArt.layoutAlign = "STRETCH"; pArt.resize(288, 300);
      pArt.fills = [{ type: 'SOLID', color: COLOR_CANVAS }]; pArt.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }]; pArt.strokeWeight = 2;
      const pCircle = figma.createEllipse(); pCircle.resize(140, 140); pCircle.x = (288 - 140) / 2; pCircle.y = (300 - 140) / 2;
      pCircle.fills = []; pCircle.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.3 }]; pCircle.strokeWeight = 2;
      pArt.appendChild(pCircle); poster.appendChild(pArt);

      const pFoot = figma.createFrame(); pFoot.layoutMode = "VERTICAL"; pFoot.itemSpacing = 8; pFoot.layoutAlign = "STRETCH"; pFoot.fills = [];
      const pTitle = figma.createText(); pTitle.fontName = serifFont; pTitle.characters = s.title;
      pTitle.fontSize = 22; pTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; pFoot.appendChild(pTitle);
      const pDesc = figma.createText(); pDesc.fontName = sansRegular; pDesc.characters = s.desc;
      pDesc.fontSize = 11; pDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; pFoot.appendChild(pDesc);
      poster.appendChild(pFoot);

      stage04.appendChild(poster);
    });

    createBottomBar(root04, "ATELIER CONSTITUTION • ARTICLE IV", "\"기계가 완벽해야 사람이 쉴 수 있다.\"", "When the machine is flawless, human soul finds its solace.", "PROGRESS  04  /  05", "ROOM 05 (The Colophon & Master Seal)");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 05 : THE COLOPHON & MASTER SEAL (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const x05 = originX + 8000;
    const root05 = createRoomBase("Room 05 : The Colophon & Master Seal", x05, originY);
    createHeader(root05, "ROOM 05 / 05 : THE COLOPHON & MASTER SEAL", "MINDULLE ATELIER EPILOGUE");

    const stage05 = figma.createFrame();
    stage05.x = 48; stage05.y = 120; stage05.resize(1824, 696);
    stage05.layoutMode = "VERTICAL"; stage05.primaryAxisAlignItems = "CENTER"; stage05.counterAxisAlignItems = "CENTER";
    stage05.itemSpacing = 24; stage05.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root05.appendChild(stage05);

    const sealStage = figma.createFrame();
    sealStage.resize(380, 380); sealStage.fills = [];
    const sealR1 = figma.createEllipse(); sealR1.resize(380, 380); sealR1.x = 0; sealR1.y = 0;
    sealR1.fills = []; sealR1.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sealR1.strokeWeight = 2; sealStage.appendChild(sealR1);

    const sealR2 = figma.createEllipse(); sealR2.resize(350, 350); sealR2.x = 15; sealR2.y = 15;
    sealR2.fills = []; sealR2.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.5 }]; sealR2.strokeWeight = 2; sealStage.appendChild(sealR2);

    const sealR3 = figma.createEllipse(); sealR3.resize(220, 220); sealR3.x = 80; sealR3.y = 80;
    sealR3.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.05 }];
    sealR3.strokes = [{ type: 'SOLID', color: COLOR_GOLD }]; sealR3.strokeWeight = 2; sealStage.appendChild(sealR3);

    const sealTitle = figma.createText(); sealTitle.fontName = serifFont; sealTitle.characters = "M I N D U L L E";
    sealTitle.fontSize = 20; sealTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    sealTitle.x = 125; sealTitle.y = 160; sealStage.appendChild(sealTitle);

    const sealSub = figma.createText(); sealSub.fontName = sansBold; sealSub.characters = "ATELIER MASTER SEAL";
    sealSub.fontSize = 10; sealSub.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    sealSub.x = 135; sealSub.y = 190; sealStage.appendChild(sealSub);
    stage05.appendChild(sealStage);

    const credBox = figma.createFrame();
    credBox.layoutMode = "VERTICAL"; credBox.primaryAxisAlignItems = "CENTER"; credBox.counterAxisAlignItems = "CENTER";
    credBox.itemSpacing = 16; credBox.fills = [];
    const creditText = figma.createText(); creditText.fontName = serifMedium;
    creditText.characters = "A digital sanctuary crafted with 2px precision, Korean petrichor, and unbreakable sovereign tools.";
    creditText.fontSize = 15; creditText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    credBox.appendChild(creditText);

    const btnRow = figma.createFrame(); btnRow.layoutMode = "HORIZONTAL"; btnRow.itemSpacing = 20; btnRow.fills = [];
    const cta1 = figma.createFrame(); cta1.paddingLeft = 32; cta1.paddingRight = 32; cta1.paddingTop = 16; cta1.paddingBottom = 16;
    cta1.cornerRadius = 2; cta1.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    const cta1Text = figma.createText(); cta1Text.fontName = sansBold; cta1Text.characters = "ENTER THE ATELIER ➔";
    cta1Text.fontSize = 12; cta1Text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    cta1.appendChild(cta1Text); btnRow.appendChild(cta1);

    const cta2 = figma.createFrame(); cta2.paddingLeft = 32; cta2.paddingRight = 32; cta2.paddingTop = 16; cta2.paddingBottom = 16;
    cta2.cornerRadius = 2; cta2.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    cta2.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; cta2.strokeWeight = 2;
    const cta2Text = figma.createText(); cta2Text.fontName = sansBold; cta2Text.characters = "EXPLORE CODE REPOSITORY";
    cta2Text.fontSize = 12; cta2Text.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    cta2.appendChild(cta2Text); btnRow.appendChild(cta2);
    credBox.appendChild(btnRow);
    stage05.appendChild(credBox);

    createBottomBar(root05, "ATELIER CONSTITUTION • EPILOGUE", "\"당신이 화면을 끄고, 삶의 가장 소중한 장면 속으로 걸어 들어갈 수 있도록.\"", "So that you may step away from the screen, and walk into the dearest scenes of your life.", "EXHIBITION COMPLETED", "ENTER THE SANCTUARY");

    figma.viewport.scrollAndZoomIntoView([root01, root02, root03, root04, root05]);
    figma.notify("🏛️ 전체 5대 전시실 100% 렌더링 완료!");
    resolve();
  } catch (err) {
    console.error("Master exhibition render failed:", err);
    resolve();
  }
});
