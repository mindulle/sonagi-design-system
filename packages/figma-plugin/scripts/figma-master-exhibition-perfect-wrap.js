/**
 * Sonagi Design System v3.0 - Full Master Exhibition (Pixel-Perfect Auto-Wrap & No-Clip)
 * Room 01 ~ Room 05 Complete Overhaul
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

    // 기존 방들의 시작 좌표 유지하고 이전 노드 전체 제거
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
      roomBadge.layoutMode = "HORIZONTAL";
      roomBadge.layoutAlign = "INHERIT";
      roomBadge.primaryAxisSizingMode = "AUTO";
      roomBadge.counterAxisSizingMode = "AUTO";
      roomBadge.paddingLeft = 18; roomBadge.paddingRight = 18;
      roomBadge.paddingTop = 8; roomBadge.paddingBottom = 8; roomBadge.cornerRadius = 2;
      roomBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
      roomBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
      roomBadge.strokeWeight = 2;
      const roomText = figma.createText();
      roomText.fontName = sansBold; roomText.characters = roomTitle;
      roomText.fontSize = 11; roomText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      roomText.textAutoResize = "WIDTH_AND_HEIGHT";
      roomBadge.appendChild(roomText);
      header.appendChild(roomBadge);

      const metaText = figma.createText();
      metaText.fontName = sansMedium;
      metaText.characters = "37.5665° N, 126.9780° E  •  ARCHITECTURAL MASTER V3.0";
      metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      header.appendChild(metaText);
    }

    // 🌟 [핵심] 오토레이아웃 침범을 원천 차단한 하단 바 (고정 1,180px 선언문 + 450px 안전 버튼 구역)
    function createBottomBar(root, article, quoteKo, quoteEn, progress, btnLabel, subLabel) {
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
      bottomBar.paddingTop = 26; bottomBar.paddingBottom = 26;
      bottomBar.primaryAxisSizingMode = "FIXED";
      bottomBar.counterAxisSizingMode = "FIXED";
      bottomBar.clipsContent = false;
      root.appendChild(bottomBar);

      // 좌측 선언문 (폭 1,180px로 확실히 제약하여 우측 버튼을 절대 밀어내지 않음)
      const manifestoBox = figma.createFrame();
      manifestoBox.name = "Manifesto Area";
      manifestoBox.layoutMode = "VERTICAL";
      manifestoBox.counterAxisAlignItems = "MIN";
      manifestoBox.itemSpacing = 6;
      manifestoBox.resize(1180, 160);
      manifestoBox.primaryAxisSizingMode = "FIXED";
      manifestoBox.counterAxisSizingMode = "AUTO";
      manifestoBox.fills = [];

      const eyebrow = figma.createText();
      eyebrow.fontName = sansBold; eyebrow.characters = article;
      eyebrow.fontSize = 10; eyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      eyebrow.textAutoResize = "WIDTH_AND_HEIGHT";
      manifestoBox.appendChild(eyebrow);

      const mainQuote = figma.createText();
      mainQuote.fontName = serifFont; mainQuote.characters = quoteKo;
      mainQuote.fontSize = 26; mainQuote.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      mainQuote.textAutoResize = "HEIGHT";
      mainQuote.resize(1180, 36);
      manifestoBox.appendChild(mainQuote);

      const subQuote = figma.createText();
      subQuote.fontName = serifMedium; subQuote.characters = quoteEn;
      subQuote.fontSize = 14; subQuote.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      subQuote.textAutoResize = "WIDTH_AND_HEIGHT";
      manifestoBox.appendChild(subQuote);
      bottomBar.appendChild(manifestoBox);

      // 우측 네비게이션 구역 (최소 420px 안전 확보, 우측 끝에서 안쪽으로 여유 배치)
      const navBox = figma.createFrame();
      navBox.name = "Navigation CTA Area";
      navBox.layoutMode = "VERTICAL";
      navBox.primaryAxisAlignItems = "CENTER";
      navBox.counterAxisAlignItems = "MAX";
      navBox.itemSpacing = 8;
      navBox.primaryAxisSizingMode = "AUTO";
      navBox.counterAxisSizingMode = "AUTO";
      navBox.fills = [];

      const progressLabel = figma.createText();
      progressLabel.fontName = sansBold; progressLabel.characters = progress;
      progressLabel.fontSize = 11; progressLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      progressLabel.textAutoResize = "WIDTH_AND_HEIGHT";
      navBox.appendChild(progressLabel);

      const scrollBtn = figma.createFrame();
      scrollBtn.name = "CTA Button";
      scrollBtn.layoutMode = "VERTICAL";
      scrollBtn.primaryAxisAlignItems = "CENTER";
      scrollBtn.counterAxisAlignItems = "CENTER";
      scrollBtn.primaryAxisSizingMode = "AUTO";
      scrollBtn.counterAxisSizingMode = "AUTO";
      scrollBtn.paddingLeft = 24; scrollBtn.paddingRight = 24;
      scrollBtn.paddingTop = 12; scrollBtn.paddingBottom = 12;
      scrollBtn.cornerRadius = 2;
      scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.12 }];
      scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
      scrollBtn.strokeWeight = 2;

      const btnText = figma.createText();
      btnText.fontName = sansBold; btnText.characters = btnLabel;
      btnText.fontSize = 11; btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      btnText.textAutoResize = "WIDTH_AND_HEIGHT";
      scrollBtn.appendChild(btnText);

      if (subLabel) {
        const btnSub = figma.createText();
        btnSub.fontName = sansRegular; btnSub.characters = subLabel;
        btnSub.fontSize = 9; btnSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
        btnSub.textAutoResize = "WIDTH_AND_HEIGHT";
        scrollBtn.appendChild(btnSub);
      }

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
    lTitle01.fontSize = 13; lTitle01.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; lTitle01.textAutoResize = "WIDTH_AND_HEIGHT"; stageLabel01.appendChild(lTitle01);
    const lDesc01 = figma.createText(); lDesc01.fontName = sansRegular; lDesc01.characters = "Real-time Three.js Glass Shader • Refraction Index 1.52";
    lDesc01.fontSize = 11; lDesc01.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; lDesc01.textAutoResize = "WIDTH_AND_HEIGHT"; stageLabel01.appendChild(lDesc01);
    stage01.appendChild(stageLabel01);

    const placard01 = figma.createFrame();
    placard01.name = "Artwork Placard (Caption)";
    placard01.x = cX + 240; placard01.y = cY + 40; placard01.resize(340, 160);
    placard01.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    placard01.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; placard01.strokeWeight = 2;
    placard01.layoutMode = "VERTICAL"; placard01.itemSpacing = 8;
    placard01.paddingLeft = 20; placard01.paddingRight = 20; placard01.paddingTop = 18; placard01.paddingBottom = 18;

    const pTag01 = figma.createText(); pTag01.fontName = sansBold; pTag01.characters = "GALLERY CAPTION • 01";
    pTag01.fontSize = 9; pTag01.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; pTag01.textAutoResize = "WIDTH_AND_HEIGHT"; placard01.appendChild(pTag01);
    const pTitle01 = figma.createText(); pTitle01.fontName = sansBold; pTitle01.characters = "THE SONIC DROPLET IN GLASS";
    pTitle01.fontSize = 12; pTitle01.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; pTitle01.textAutoResize = "WIDTH_AND_HEIGHT"; placard01.appendChild(pTitle01);
    const pMeta01 = figma.createText(); pMeta01.fontName = sansRegular;
    pMeta01.characters = "Medium : Procedural Water Droplet, Glass Dome, Obsidian\nConstitution : The True 2px Law & 60-30-10 OKLCH Balance";
    pMeta01.fontSize = 10; pMeta01.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; pMeta01.textAutoResize = "WIDTH_AND_HEIGHT"; placard01.appendChild(pMeta01);
    stage01.appendChild(placard01);

    createBottomBar(root01, "ATELIER CONSTITUTION • ARTICLE I", "\"도구가 완벽할 때, 손길은 비로소 자유로워진다.\"", "When the machine is flawless, human soul finds its solace.", "PROGRESS  01  /  05", "SCROLL TO ENTER ROOM 02 ↓", "The Monolith of Solace");

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
    const mDarkDesc = figma.createText(); mDarkDesc.fontName = sansRegular;
    mDarkDesc.characters = "거칠고 폭발적인 기술력으로 창작자의 주권을 지켜내는 디지털 방파제. 2px 솔리드 선화로 세우는 네오 브루탈리즘 건축 헌법.";
    mDarkDesc.fontSize = 12; mDarkDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    mDarkDesc.textAutoResize = "HEIGHT"; mDarkDesc.resize(788, 36);
    mDarkCopy.appendChild(mDarkDesc);
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
    const mLightDesc = figma.createText(); mLightDesc.fontName = sansRegular;
    mLightDesc.characters = "차가운 성벽의 족쇄를 풀고, 오후의 햇살과 젖은 흙내음처럼 창작자의 손길을 따스하게 보듬는 인간의 영혼.";
    mLightDesc.fontSize = 12; mLightDesc.fills = [{ type: 'SOLID', color: { r: 100/255, g: 90/255, b: 80/255 } }];
    mLightDesc.textAutoResize = "HEIGHT"; mLightDesc.resize(788, 36);
    mLightCopy.appendChild(mLightDesc);
    mLight.appendChild(mLightCopy);

    createBottomBar(root02, "ATELIER CONSTITUTION • ARTICLE II", "\"거친 성벽의 방패(소나기) 안에 피어난, 가장 다정한 안식처(민들레).\"", "The savage shield of rain outside, the tender sanctuary of dandelion within.", "PROGRESS  02  /  05", "SCROLL TO ENTER ROOM 03 ↓", "The Cabinet of Instruments");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 03 : THE CABINET OF INSTRUMENTS (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const x03 = originX + 4000;
    const root03 = createRoomBase("Room 03 : The Cabinet of Instruments", x03, originY);
    createHeader(root03, "ROOM 03 / 05 : THE CABINET OF INSTRUMENTS", "THE SONAGI 6-IN-1 TOOLING SUITE");

    const stage03 = figma.createFrame();
    stage03.name = "Instruments Grid Stage (3x2)";
    stage03.x = 48; stage03.y = 120; stage03.resize(1824, 696);
    stage03.layoutMode = "VERTICAL";
    stage03.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage03.counterAxisAlignItems = "CENTER";
    stage03.paddingLeft = 24; stage03.paddingRight = 24; stage03.paddingTop = 20; stage03.paddingBottom = 20;
    stage03.primaryAxisSizingMode = "FIXED";
    stage03.counterAxisSizingMode = "FIXED";
    stage03.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root03.appendChild(stage03);

    const toolArtifacts = [
      {
        id: "01", name: "VectorCraft", badge: "BEZIER ENGINE", tag: "PRECISION STYLUS FORGE",
        desc: "3차 베지어 곡선 보정과 태블릿 펜 필압을 지원하는 순수 벡터 공방. 단 1px의 오차 없는 선화 에셋을 직접 세공합니다.",
        spec: "Engine: Affinity SDK  •  Output: SVG / VectorCraft",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/><circle cx="20" cy="12" r="3" stroke="#ffd166" stroke-width="2" fill="#060911"/><path d="M18 15L12 28L15 31L20 20" stroke="#4A90E2" stroke-width="2" stroke-linejoin="round"/><path d="M12 28L10 32L15 31Z" fill="#ffd166"/><path d="M22 15L28 28L26 32L20 20" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/></svg>`
      },
      {
        id: "02", name: "PhotoCraft", badge: "ANALOG EMULSION", tag: "RETRO GRAIN LAB",
        desc: "차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 에디터. 페트리코 질감과 감성 색감을 보정합니다.",
        spec: "Filter: 35mm Grain  •  Output: OKLCH Canvas WebP",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" stroke-width="2"/><circle cx="20" cy="20" r="13" stroke="#ffd166" stroke-width="2"/><circle cx="20" cy="20" r="6" fill="#ffd166"/><path d="M15 12L25 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`
      },
      {
        id: "03", name: "EffectCraft", badge: "WEBGL & SHADER", tag: "REALTIME PARTICLE ATELIER",
        desc: "실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 스튜디오. GPU 가속으로 물방울을 빚어냅니다.",
        spec: "Pipeline: Three.js / R3F  •  GPU: Dedicated WebGL",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/><path d="M20 8C20 8 12 18 12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24C28 18 20 8 20 8Z" stroke="#4A90E2" stroke-width="2" fill="#4A90E2" fill-opacity="0.15"/><circle cx="20" cy="24" r="4" fill="#ffd166"/></svg>`
      },
      {
        id: "04", name: "DesignCraft", badge: "W3C TOKEN SSOT", tag: "LAYOUT COMPOSER",
        desc: "The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기. 불필요한 시각적 노이즈를 걷어냅니다.",
        spec: "Tokens: @mindulle/tokens  •  Rules: The 2px Law",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#ffd166" stroke-width="2"/><rect x="10" y="10" width="8" height="8" stroke="#ffffff" stroke-width="2"/><rect x="22" y="10" width="8" height="8" stroke="#4A90E2" stroke-width="2"/><rect x="10" y="22" width="20" height="8" stroke="#ffd166" stroke-width="2"/></svg>`
      },
      {
        id: "05", name: "FilmCraft", badge: "TIMELINE DIRECTOR", tag: "THEATRE.JS MOTION LAB",
        desc: "키프레임 타임라인과 가상 3D 카메라 워크를 직관적으로 연출하는 모션 디렉터. 스크롤에 반응하는 시네마틱 서사를 완성합니다.",
        spec: "Studio: @theatre/studio  •  State: state.json",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" stroke-width="2"/><polygon points="16,13 28,20 16,27" fill="#ffd166" stroke="#ffffff" stroke-width="1.5"/><line x1="8" y1="33" x2="32" y2="33" stroke="#4A90E2" stroke-width="2" stroke-dasharray="3 3"/></svg>`
      },
      {
        id: "06", name: "Sonagi Draw", badge: "CANVAS HARNESS", tag: "COLLABORATIVE WHITEBOARD",
        desc: "tldraw 기반의 실시간 화이트보드와 에이전트 연동 작업대. 기획 아이디어와 와이어프레임 뼈대를 가장 직관적으로 스케치합니다.",
        spec: "Engine: Tldraw v3  •  Bridge: canvasAdapter",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/><path d="M10 28C14 20 22 30 30 14" stroke="#ffd166" stroke-width="2" stroke-linecap="round"/><circle cx="30" cy="14" r="3" fill="#4A90E2"/><circle cx="10" cy="28" r="3" fill="#ffffff"/></svg>`
      }
    ];

    function createDetailedCard(tool) {
      const card = figma.createFrame();
      card.name = `Artifact Card : ${tool.name}`;
      card.resize(570, 310);
      card.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      card.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      card.strokeWeight = 2;
      card.layoutMode = "VERTICAL";
      card.primaryAxisAlignItems = "SPACE_BETWEEN";
      card.counterAxisAlignItems = "MIN";
      card.paddingLeft = 28; card.paddingRight = 28; card.paddingTop = 22; card.paddingBottom = 22;
      card.primaryAxisSizingMode = "FIXED";
      card.counterAxisSizingMode = "FIXED";

      const cardHead = figma.createFrame();
      cardHead.name = "Card Header";
      cardHead.layoutMode = "HORIZONTAL";
      cardHead.primaryAxisAlignItems = "SPACE_BETWEEN";
      cardHead.counterAxisAlignItems = "CENTER";
      cardHead.layoutAlign = "STRETCH";
      cardHead.primaryAxisSizingMode = "FIXED";
      cardHead.counterAxisSizingMode = "AUTO";
      cardHead.fills = [];

      const iconNode = figma.createNodeFromSvg(tool.svg);
      iconNode.resize(40, 40);
      cardHead.appendChild(iconNode);

      const headRight = figma.createFrame();
      headRight.layoutMode = "HORIZONTAL";
      headRight.counterAxisAlignItems = "CENTER";
      headRight.primaryAxisSizingMode = "AUTO";
      headRight.counterAxisSizingMode = "AUTO";
      headRight.layoutAlign = "INHERIT";
      headRight.itemSpacing = 10;
      headRight.fills = [];

      const numText = figma.createText();
      numText.fontName = sansBold; numText.characters = `ARTIFACT • ${tool.id}`;
      numText.fontSize = 11; numText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      numText.textAutoResize = "WIDTH_AND_HEIGHT";
      headRight.appendChild(numText);

      const statusBadge = figma.createFrame();
      statusBadge.layoutMode = "HORIZONTAL";
      statusBadge.primaryAxisSizingMode = "AUTO";
      statusBadge.counterAxisSizingMode = "AUTO";
      statusBadge.layoutAlign = "INHERIT";
      statusBadge.paddingLeft = 8; statusBadge.paddingRight = 8; statusBadge.paddingTop = 4; statusBadge.paddingBottom = 4;
      statusBadge.cornerRadius = 2;
      statusBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.12 }];
      statusBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
      statusBadge.strokeWeight = 1;
      const statusText = figma.createText();
      statusText.fontName = sansBold; statusText.characters = tool.badge;
      statusText.fontSize = 9; statusText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      statusText.textAutoResize = "WIDTH_AND_HEIGHT";
      statusBadge.appendChild(statusText);
      headRight.appendChild(statusBadge);

      cardHead.appendChild(headRight);
      card.appendChild(cardHead);

      // Card Mid
      const cardMid = figma.createFrame();
      cardMid.name = "Card Body";
      cardMid.layoutMode = "VERTICAL";
      cardMid.itemSpacing = 6;
      cardMid.layoutAlign = "STRETCH";
      cardMid.primaryAxisSizingMode = "AUTO";
      cardMid.counterAxisSizingMode = "AUTO";
      cardMid.fills = [];

      const titleText = figma.createText();
      titleText.fontName = serifFont; titleText.characters = tool.name;
      titleText.fontSize = 24; titleText.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      titleText.textAutoResize = "WIDTH_AND_HEIGHT";
      cardMid.appendChild(titleText);

      const tagText = figma.createText();
      tagText.fontName = sansBold; tagText.characters = tool.tag;
      tagText.fontSize = 10; tagText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      tagText.textAutoResize = "WIDTH_AND_HEIGHT";
      cardMid.appendChild(tagText);

      // 🌟 [줄바꿈 핵심] 폭 514px 고정 + HEIGHT 모드로 2~3줄 자동 래핑!
      const descText = figma.createText();
      descText.fontName = sansRegular;
      descText.characters = tool.desc;
      descText.fontSize = 11;
      descText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      descText.textAutoResize = "HEIGHT";
      descText.resize(514, 36);
      cardMid.appendChild(descText);

      card.appendChild(cardMid);

      // Card Foot
      const cardFoot = figma.createFrame();
      cardFoot.name = "Card Footer";
      cardFoot.layoutMode = "HORIZONTAL";
      cardFoot.primaryAxisAlignItems = "SPACE_BETWEEN";
      cardFoot.counterAxisAlignItems = "CENTER";
      cardFoot.layoutAlign = "STRETCH";
      cardFoot.primaryAxisSizingMode = "FIXED";
      cardFoot.counterAxisSizingMode = "AUTO";
      cardFoot.fills = [];

      const specText = figma.createText();
      specText.fontName = sansMedium; specText.characters = tool.spec;
      specText.fontSize = 10; specText.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }];
      specText.textAutoResize = "WIDTH_AND_HEIGHT";
      cardFoot.appendChild(specText);

      const actionText = figma.createText();
      actionText.fontName = sansBold; actionText.characters = "VIEW BLUEPRINT ➔";
      actionText.fontSize = 10; actionText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      actionText.textAutoResize = "WIDTH_AND_HEIGHT";
      cardFoot.appendChild(actionText);

      card.appendChild(cardFoot);
      return card;
    }

    const row1 = figma.createFrame();
    row1.name = "Row 1"; row1.layoutMode = "HORIZONTAL"; row1.itemSpacing = 24; row1.layoutAlign = "STRETCH";
    row1.primaryAxisAlignItems = "SPACE_BETWEEN"; row1.primaryAxisSizingMode = "FIXED"; row1.counterAxisSizingMode = "AUTO"; row1.fills = [];
    row1.appendChild(createDetailedCard(toolArtifacts[0]));
    row1.appendChild(createDetailedCard(toolArtifacts[1]));
    row1.appendChild(createDetailedCard(toolArtifacts[2]));
    stage03.appendChild(row1);

    const row2 = figma.createFrame();
    row2.name = "Row 2"; row2.layoutMode = "HORIZONTAL"; row2.itemSpacing = 24; row2.layoutAlign = "STRETCH";
    row2.primaryAxisAlignItems = "SPACE_BETWEEN"; row2.primaryAxisSizingMode = "FIXED"; row2.counterAxisSizingMode = "AUTO"; row2.fills = [];
    row2.appendChild(createDetailedCard(toolArtifacts[3]));
    row2.appendChild(createDetailedCard(toolArtifacts[4]));
    row2.appendChild(createDetailedCard(toolArtifacts[5]));
    stage03.appendChild(row2);

    createBottomBar(root03, "ATELIER CONSTITUTION • ARTICLE III", "\"도구가 완전할 때, 창작자의 손길은 거침없이 뻗어 나간다.\"", "When instruments reach perfection, creator's touch flows without friction.", "PROGRESS  03  /  05", "SCROLL TO ENTER ROOM 04 ↓", "Five Sceneries of Solace");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 04 : FIVE SCENERIES OF SOLACE (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const x04 = originX + 6000;
    const root04 = createRoomBase("Room 04 : Five Sceneries of Solace", x04, originY);
    createHeader(root04, "ROOM 04 / 05 : FIVE SCENERIES OF SOLACE", "POETIC MANIFESTO POSTER GALLERY • TIER 1");

    const stage04 = figma.createFrame();
    stage04.name = "Five Sceneries Poster Arena";
    stage04.x = 48; stage04.y = 120; stage04.resize(1824, 696);
    stage04.layoutMode = "HORIZONTAL";
    stage04.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage04.counterAxisAlignItems = "CENTER";
    stage04.paddingLeft = 20; stage04.paddingRight = 20;
    stage04.primaryAxisSizingMode = "FIXED";
    stage04.counterAxisSizingMode = "FIXED";
    stage04.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root04.appendChild(stage04);

    const sceneries = [
      {
        num: "SCENE I", title: "비 온 뒤의 쉼", sub: "Petrichor & Clarity",
        desc: "창문에 흘러내리던 굵은 빗방울이 맑게 개며 스며드는 아침 햇살과 젖은 흙냄새의 정화.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="288" height="280" fill="#060911"/><line x1="144" y1="20" x2="144" y2="260" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 4"/><line x1="20" y1="140" x2="268" y2="140" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 4"/><path d="M90 60C90 60 84 80 84 90C84 93.3 86.7 96 90 96C93.3 96 96 93.3 96 90C96 80 90 60 90 60Z" stroke="#4A90E2" stroke-width="2" fill="#4A90E2" fill-opacity="0.2"/><path d="M190 90C190 90 186 104 186 112C186 114.2 187.8 116 190 116C192.2 116 194 114.2 194 112C194 104 190 90 190 90Z" stroke="#4A90E2" stroke-width="1.5" fill="#4A90E2" fill-opacity="0.3"/><line x1="90" y1="96" x2="90" y2="130" stroke="#4A90E2" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.6"/><circle cx="144" cy="140" r="50" stroke="#ffd166" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.7"/><circle cx="144" cy="140" r="16" fill="#ffd166" fill-opacity="0.1" stroke="#ffd166" stroke-width="2"/></svg>`
      },
      {
        num: "SCENE II", title: "즉흥적인 모험", sub: "The Sunset Horizon",
        desc: "계획된 일상의 틀을 깨부수고, 노을빛으로 물드는 붉은 해안도로를 향해 훌쩍 떠나는 지평선.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="288" height="280" fill="#060911"/><line x1="20" y1="160" x2="268" y2="160" stroke="#ffd166" stroke-width="2"/><path d="M104 160C104 138 122 120 144 120C166 120 184 138 184 160" stroke="#ffd166" stroke-width="2" fill="#ffd166" fill-opacity="0.15"/><path d="M30 180C60 176 90 184 120 180C150 176 180 184 210 180C240 176 260 182 270 180" stroke="#4A90E2" stroke-width="1.5" stroke-dasharray="4 4"/><path d="M144 160C130 190 80 210 50 260" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/><path d="M144 160C160 190 220 220 250 260" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`
      },
      {
        num: "SCENE III", title: "질긴 생명력", sub: "Dandelion in Asphalt",
        desc: "차가운 콘크리트 틈바구니에서 기어이 피어나 바람을 타고 하늘로 날아가는 노란 솜털 홀씨.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="288" height="280" fill="#060911"/><path d="M40 240L110 200L144 215L180 195L250 240" stroke="#30363d" stroke-width="2.5" stroke-linejoin="round"/><path d="M144 215C142 180 140 150 144 130" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round"/><circle cx="144" cy="120" r="14" fill="#ffd166" stroke="#ffffff" stroke-width="1.5"/><g stroke="#ffd166" stroke-width="1.5"><line x1="160" y1="100" x2="175" y2="85"/><circle cx="177" cy="83" r="2.5" fill="#ffd166"/><line x1="180" y1="70" x2="200" y2="55"/><circle cx="202" cy="53" r="3" fill="#ffd166"/><line x1="130" y1="90" x2="115" y2="75"/><circle cx="113" cy="73" r="2" fill="#ffd166"/></g></svg>`
      },
      {
        num: "SCENE IV", title: "아늑한 아틀리에", sub: "The Sunlit Workshop",
        desc: "세상의 비바람을 뚫고, 오후의 햇살이 가득 쏟아지는 작업대 위에서 다시 날개를 펴는 공방.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="288" height="280" fill="#060911"/><polygon points="60,20 180,20 260,240 140,240" fill="#ffd166" fill-opacity="0.08"/><line x1="30" y1="210" x2="260" y2="210" stroke="#30363d" stroke-width="2"/><circle cx="144" cy="180" r="28" stroke="#4A90E2" stroke-width="2"/><line x1="144" y1="140" x2="144" y2="210" stroke="#ffd166" stroke-width="2"/><circle cx="144" cy="140" r="4" fill="#ffd166"/><rect x="70" y="195" width="45" height="15" rx="2" stroke="#ffffff" stroke-width="1.5" fill="#060911"/></svg>`
      },
      {
        num: "SCENE V", title: "궁극의 안식처", sub: "The Midnight Hearth",
        desc: "차가운 밤공기를 뒤로하고, 잠든 아이의 따뜻한 무게를 안고 현관문을 열고 들어오는 거실.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="288" height="280" fill="#060911"/><path d="M60 50C60 66 74 80 90 80C78 80 68 70 68 58C68 54 70 51 72 48C65 47 60 48 60 50Z" fill="#4A90E2" stroke="#4A90E2" stroke-width="1.5"/><path d="M104 260L104 140C104 118 122 100 144 100C166 100 184 118 184 140L184 260" stroke="#ffd166" stroke-width="2.5" fill="#ffd166" fill-opacity="0.12"/><circle cx="144" cy="180" r="24" fill="#ffd166" fill-opacity="0.3" stroke="#ffd166" stroke-width="2"/><circle cx="144" cy="180" r="10" fill="#ffd166"/></svg>`
      }
    ];

    sceneries.forEach((s) => {
      const poster = figma.createFrame();
      poster.name = `Poster : ${s.title}`;
      poster.resize(336, 640);
      poster.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      poster.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      poster.strokeWeight = 2;
      poster.layoutMode = "VERTICAL";
      poster.primaryAxisAlignItems = "SPACE_BETWEEN";
      poster.counterAxisAlignItems = "MIN";
      poster.paddingLeft = 24; poster.paddingRight = 24; poster.paddingTop = 26; poster.paddingBottom = 26;
      poster.primaryAxisSizingMode = "FIXED";
      poster.counterAxisSizingMode = "FIXED";

      const pHead = figma.createFrame();
      pHead.layoutMode = "VERTICAL"; pHead.itemSpacing = 4; pHead.layoutAlign = "STRETCH"; pHead.fills = [];
      const pNum = figma.createText(); pNum.fontName = sansBold; pNum.characters = s.num;
      pNum.fontSize = 11; pNum.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; pNum.textAutoResize = "WIDTH_AND_HEIGHT"; pHead.appendChild(pNum);
      const pSub = figma.createText(); pSub.fontName = sansMedium; pSub.characters = s.sub;
      pSub.fontSize = 10; pSub.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; pSub.textAutoResize = "WIDTH_AND_HEIGHT"; pHead.appendChild(pSub);
      poster.appendChild(pHead);

      const pArt = figma.createFrame();
      pArt.name = "Scene Artwork Canvas";
      pArt.layoutAlign = "STRETCH";
      pArt.resize(288, 280);
      pArt.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
      pArt.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }];
      pArt.strokeWeight = 2;
      pArt.clipsContent = true;

      const artNode = figma.createNodeFromSvg(s.svg);
      artNode.resize(288, 280);
      pArt.appendChild(artNode);
      poster.appendChild(pArt);

      const pFoot = figma.createFrame();
      pFoot.layoutMode = "VERTICAL"; pFoot.itemSpacing = 6; pFoot.layoutAlign = "STRETCH"; pFoot.fills = [];
      const pTitle = figma.createText(); pTitle.fontName = serifFont; pTitle.characters = s.title;
      pTitle.fontSize = 22; pTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; pTitle.textAutoResize = "WIDTH_AND_HEIGHT"; pFoot.appendChild(pTitle);

      // 🌟 [줄바꿈 핵심] 폭 288px 고정 + HEIGHT 모드로 3줄 완벽 래핑!
      const pDesc = figma.createText();
      pDesc.fontName = sansRegular;
      pDesc.characters = s.desc;
      pDesc.fontSize = 11;
      pDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      pDesc.textAutoResize = "HEIGHT";
      pDesc.resize(288, 48);
      pFoot.appendChild(pDesc);

      poster.appendChild(pFoot);
      stage04.appendChild(poster);
    });

    createBottomBar(root04, "ATELIER CONSTITUTION • ARTICLE IV", "\"기계가 완벽해야 사람이 쉴 수 있다.\"", "When the machine is flawless, human soul finds its solace.", "PROGRESS  04  /  05", "SCROLL TO ENTER ROOM 05 ↓", "The Colophon & Master Seal");

    // ════════════════════════════════════════════════════════════════════════
    // ROOM 05 : THE COLOPHON & MASTER SEAL (1920x1080)
    // ════════════════════════════════════════════════════════════════════════
    const x05 = originX + 8000;
    const root05 = createRoomBase("Room 05 : The Colophon & Master Seal", x05, originY);
    createHeader(root05, "ROOM 05 / 05 : THE COLOPHON & MASTER SEAL", "MINDULLE ATELIER EPILOGUE");

    const stage05 = figma.createFrame();
    stage05.name = "Colophon Centerpiece Stage";
    stage05.x = 48; stage05.y = 120; stage05.resize(1824, 696);
    stage05.layoutMode = "HORIZONTAL";
    stage05.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage05.counterAxisAlignItems = "CENTER";
    stage05.paddingLeft = 64; stage05.paddingRight = 64;
    stage05.primaryAxisSizingMode = "FIXED";
    stage05.counterAxisSizingMode = "FIXED";
    stage05.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root05.appendChild(stage05);

    // Left: Master Seal
    const sealEnsemble = figma.createFrame();
    sealEnsemble.name = "Master CI Seal Ensemble";
    sealEnsemble.resize(480, 480);
    sealEnsemble.fills = [];

    const sRing1 = figma.createEllipse(); sRing1.resize(440, 440); sRing1.x = 20; sRing1.y = 20;
    sRing1.fills = []; sRing1.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sRing1.strokeWeight = 2;
    sealEnsemble.appendChild(sRing1);

    const sRing2 = figma.createEllipse(); sRing2.resize(400, 400); sRing2.x = 40; sRing2.y = 40;
    sRing2.fills = []; sRing2.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.6 }];
    sRing2.strokeWeight = 1.5; sealEnsemble.appendChild(sRing2);

    const sOctagon = figma.createPolygon(); sOctagon.resize(320, 320); sOctagon.x = 80; sOctagon.y = 80;
    sOctagon.pointCount = 8; sOctagon.fills = [{ type: 'SOLID', color: COLOR_SURFACE, opacity: 0.7 }];
    sOctagon.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }]; sOctagon.strokeWeight = 1.5;
    sealEnsemble.appendChild(sOctagon);

    const wingSailSvg = `<svg width="240" height="240" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(195, 205)"><path d="M -16,72 C -24,58 -22,44 -14,38 C -6,44 -2,58 -16,72 Z" fill="#ffd166" stroke="#f59e0b" stroke-width="2" /><circle cx="-14" cy="52" r="3" fill="#ffffff" /><path d="M -14,38 C -2,12 14,-25 8,-85" stroke="#ffffff" stroke-width="4" stroke-linecap="round" /><path d="M -4,22 C -42,5 -75,-15 -85,-55 C -65,-46 -35,-42 3,-45 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" /><path d="M -9,12 C -32,-6 -55,-20 -66,-42" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round" /><path d="M 3,-24 C -22,-40 -44,-58 -52,-88 C -38,-80 -18,-74 7,-72 Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff" fill-opacity="0.1" /><path d="M 8,-85 C 26,-58 40,-32 46,-2" stroke="#ffd166" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" opacity="0.8" /><circle cx="8" cy="-85" r="6" fill="#ffd166" /><circle cx="6" cy="-87" r="2" fill="#ffffff" /></g></svg>`;
    const symbolNode = figma.createNodeFromSvg(wingSailSvg);
    symbolNode.resize(240, 240); symbolNode.x = 120; symbolNode.y = 120;
    sealEnsemble.appendChild(symbolNode);

    const sealCap = figma.createText(); sealCap.fontName = sansBold; sealCap.characters = "MINDULLE ATELIER MASTER SEAL • V0.1.0";
    sealCap.fontSize = 11; sealCap.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; sealCap.x = 115; sealCap.y = 455;
    sealEnsemble.appendChild(sealCap);
    stage05.appendChild(sealEnsemble);

    // Right: Colophon Content
    const rightCol = figma.createFrame();
    rightCol.name = "Colophon Editorial Content";
    rightCol.resize(1080, 580);
    rightCol.layoutMode = "VERTICAL";
    rightCol.primaryAxisAlignItems = "SPACE_BETWEEN";
    rightCol.counterAxisAlignItems = "MIN";
    rightCol.primaryAxisSizingMode = "FIXED";
    rightCol.counterAxisSizingMode = "AUTO";
    rightCol.clipsContent = false;
    rightCol.fills = [];

    const headArea = figma.createFrame();
    headArea.layoutMode = "VERTICAL"; headArea.itemSpacing = 8; headArea.layoutAlign = "STRETCH"; headArea.fills = [];
    const colophonEyebrow = figma.createText(); colophonEyebrow.fontName = sansBold; colophonEyebrow.characters = "MINDULLE ATELIER • SOVEREIGN SOFTWARE FORGE";
    colophonEyebrow.fontSize = 11; colophonEyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; colophonEyebrow.textAutoResize = "WIDTH_AND_HEIGHT"; headArea.appendChild(colophonEyebrow);
    const colophonTitle = figma.createText(); colophonTitle.fontName = serifFont; colophonTitle.characters = "\"기계가 완벽해야 사람이 쉴 수 있다.\"";
    colophonTitle.fontSize = 34; colophonTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; colophonTitle.textAutoResize = "WIDTH_AND_HEIGHT"; headArea.appendChild(colophonTitle);
    const colophonEn = figma.createText(); colophonEn.fontName = serifMedium; colophonEn.characters = "When the machine is flawless, the human soul finds its solace.";
    colophonEn.fontSize = 15; colophonEn.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; colophonEn.textAutoResize = "WIDTH_AND_HEIGHT"; headArea.appendChild(colophonEn);
    const colophonPara = figma.createText(); colophonPara.fontName = sansRegular;
    colophonPara.characters = "우리는 가장 엄격하고 단단한 2px 건축의 성벽을 짓습니다. 당신이 차가운 화면을 끄고, 삶의 가장 소중한 장면 속으로 걸어 들어갈 수 있도록.";
    colophonPara.fontSize = 12; colophonPara.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; colophonPara.textAutoResize = "HEIGHT"; colophonPara.resize(1000, 36); headArea.appendChild(colophonPara);
    rightCol.appendChild(headArea);

    const creditGrid = figma.createFrame();
    creditGrid.name = "Colophon Credits"; creditGrid.layoutMode = "HORIZONTAL"; creditGrid.itemSpacing = 24; creditGrid.layoutAlign = "STRETCH";
    creditGrid.primaryAxisAlignItems = "SPACE_BETWEEN"; creditGrid.primaryAxisSizingMode = "FIXED"; creditGrid.counterAxisSizingMode = "AUTO"; creditGrid.fills = [];

    const credits = [
      { num: "01 / ARCHITECTURE", title: "The True 2px Law", desc: "그림자를 배제하고 2px 솔리드 선화와 8px 스위스 그리드로 지어 올린 디지털 요새." },
      { num: "02 / PALETTE", title: "60-30-10 OKLCH", desc: "Deep Ink 60%, Rain Blue 30%, Dandelion Gold 10%의 엄격한 시각적 균형 헌법." },
      { num: "03 / TOOLING SUITE", title: "6-in-1 Sovereign", desc: "실무에서 스스로를 검증하는 도구 생태계. 타협 없는 오픈소스 주권 소프트웨어." }
    ];

    credits.forEach((c) => {
      const cCard = figma.createFrame();
      cCard.resize(344, 130); cCard.fills = [{ type: 'SOLID', color: COLOR_SURFACE }]; cCard.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; cCard.strokeWeight = 1.5;
      cCard.layoutMode = "VERTICAL"; cCard.primaryAxisAlignItems = "SPACE_BETWEEN"; cCard.paddingLeft = 20; cCard.paddingRight = 20; cCard.paddingTop = 16; cCard.paddingBottom = 16;
      cCard.primaryAxisSizingMode = "FIXED"; cCard.counterAxisSizingMode = "FIXED";

      const cHead = figma.createFrame(); cHead.layoutMode = "VERTICAL"; cHead.itemSpacing = 4; cHead.layoutAlign = "STRETCH"; cHead.fills = [];
      const cNum = figma.createText(); cNum.fontName = sansBold; cNum.characters = c.num; cNum.fontSize = 10; cNum.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; cHead.appendChild(cNum);
      const cTitle = figma.createText(); cTitle.fontName = sansBold; cTitle.characters = c.title; cTitle.fontSize = 13; cTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; cHead.appendChild(cTitle);
      cCard.appendChild(cHead);

      const cDesc = figma.createText(); cDesc.fontName = sansRegular; cDesc.characters = c.desc; cDesc.fontSize = 10; cDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      cDesc.textAutoResize = "HEIGHT"; cDesc.resize(304, 30);
      cCard.appendChild(cDesc);
      creditGrid.appendChild(cCard);
    });
    rightCol.appendChild(creditGrid);

    // 🌟 [버튼 핵심] 명시적 AutoLayout HORIZONTAL 선언으로 글자 잘림 영구 박멸!
    const ctaRow = figma.createFrame();
    ctaRow.layoutMode = "HORIZONTAL"; ctaRow.counterAxisAlignItems = "CENTER"; ctaRow.primaryAxisSizingMode = "AUTO"; ctaRow.counterAxisSizingMode = "AUTO";
    ctaRow.itemSpacing = 20; ctaRow.fills = [];

    const btnPrimary = figma.createFrame();
    btnPrimary.name = "Primary Button";
    btnPrimary.layoutMode = "HORIZONTAL";
    btnPrimary.primaryAxisAlignItems = "CENTER";
    btnPrimary.counterAxisAlignItems = "CENTER";
    btnPrimary.primaryAxisSizingMode = "AUTO";
    btnPrimary.counterAxisSizingMode = "AUTO";
    btnPrimary.paddingLeft = 32; btnPrimary.paddingRight = 32; btnPrimary.paddingTop = 16; btnPrimary.paddingBottom = 16;
    btnPrimary.cornerRadius = 2; btnPrimary.fills = [{ type: 'SOLID', color: COLOR_GOLD }];

    const b1Text = figma.createText(); b1Text.fontName = sansBold; b1Text.characters = "ENTER THE ATELIER ➔";
    b1Text.fontSize = 12; b1Text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    b1Text.textAutoResize = "WIDTH_AND_HEIGHT";
    btnPrimary.appendChild(b1Text);
    ctaRow.appendChild(btnPrimary);

    const btnSecondary = figma.createFrame();
    btnSecondary.name = "Secondary Button";
    btnSecondary.layoutMode = "HORIZONTAL";
    btnSecondary.primaryAxisAlignItems = "CENTER";
    btnSecondary.counterAxisAlignItems = "CENTER";
    btnSecondary.primaryAxisSizingMode = "AUTO";
    btnSecondary.counterAxisSizingMode = "AUTO";
    btnSecondary.paddingLeft = 32; btnSecondary.paddingRight = 32; btnSecondary.paddingTop = 16; btnSecondary.paddingBottom = 16;
    btnSecondary.cornerRadius = 2; btnSecondary.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    btnSecondary.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; btnSecondary.strokeWeight = 2;

    const b2Text = figma.createText(); b2Text.fontName = sansBold; b2Text.characters = "EXPLORE CODE REPOSITORY";
    b2Text.fontSize = 12; b2Text.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    b2Text.textAutoResize = "WIDTH_AND_HEIGHT";
    btnSecondary.appendChild(b2Text);
    ctaRow.appendChild(btnSecondary);

    rightCol.appendChild(ctaRow);
    stage05.appendChild(rightCol);

    createBottomBar(root05, "ATELIER CONSTITUTION • EPILOGUE", "\"도구가 완전할 때, 손길은 비로소 자유로워진다.\"", "So that you may step away from the screen, and walk into the dearest scenes of your life.", "EXHIBITION COMPLETED", "RE-READ FROM ROOM 01 ↺", "The Glass Pavilion");

    figma.viewport.scrollAndZoomIntoView([root01, root02, root03, root04, root05]);
    figma.notify("🏛️ 전체 5대 전시실 줄바꿈 & 버튼 잘림 100% 교정 완료!");
    resolve();
  } catch (err) {
    console.error("Master exhibition repair failed:", err);
    resolve();
  }
});
