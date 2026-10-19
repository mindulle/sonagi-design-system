/**
 * Sonagi Design System v3.0 - Digital Exhibition Wireframe Script
 * Room 03 (The Cabinet of Instruments), Room 04 (Five Sceneries of Solace), Room 05 (The Colophon & Master Seal)
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

    // 색상 팔레트 (The Master Brand Bible 60-30-10 OKLCH)
    const COLOR_CANVAS = { r: 6 / 255, g: 9 / 255, b: 17 / 255 };          // #060911
    const COLOR_SURFACE = { r: 9 / 255, g: 13 / 255, b: 22 / 255 };        // #090d16
    const COLOR_BORDER = { r: 48 / 255, g: 54 / 255, b: 61 / 255 };        // #30363d
    const COLOR_BORDER_SUBTLE = { r: 30 / 255, g: 38 / 255, b: 56 / 255 };    // #1e2638
    const COLOR_RAIN = { r: 74 / 255, g: 144 / 255, b: 226 / 255 };        // #4A90E2
    const COLOR_GOLD = { r: 255 / 255, g: 209 / 255, b: 102 / 255 };       // #ffd166
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 }; // #94a3b8
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };   // #64748b

    // Room 02 위치 탐색
    const room02 = figma.currentPage.findOne(n => n.name.startsWith("Room 02 : The Monolith of Solace"));
    const baseY = room02 ? room02.y : 0;
    let startX03 = room02 ? room02.x + room02.width + 80 : 4080;

    // Helper: Frame 생성기
    function createRoomBase(name, x, y) {
      const existing = figma.currentPage.findOne(n => n.name.startsWith(name));
      let finalX = x;
      let finalY = y;
      if (existing) {
        finalX = existing.x;
        finalY = existing.y;
        existing.remove();
      }

      const root = figma.createFrame();
      root.name = `${name} [1920x1080]`;
      root.x = finalX;
      root.y = finalY;
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
        cross.fontName = sansBold;
        cross.characters = "+";
        cross.fontSize = 16;
        cross.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
        cross.x = pos.x; cross.y = pos.y;
        root.appendChild(cross);
      });

      return root;
    }

    // Helper: 상단 바 생성기
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

    // Helper: 하단 바 생성기
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
    // 🏛️ ROOM 03 : THE CABINET OF INSTRUMENTS (소나기 6대 도구 아티팩트실)
    // ════════════════════════════════════════════════════════════════════════
    const root03 = createRoomBase("Room 03 : The Cabinet of Instruments", startX03, baseY);
    createHeader(root03, "ROOM 03 / 05 : THE CABINET OF INSTRUMENTS", "THE SONAGI 6-IN-1 TOOLING SUITE");

    const stage03 = figma.createFrame();
    stage03.name = "Instruments Grid Stage (3x2)";
    stage03.x = 48; stage03.y = 120; stage03.resize(1824, 696);
    stage03.layoutMode = "HORIZONTAL";
    stage03.layoutWrap = "WRAP";
    stage03.itemSpacing = 24;
    stage03.counterAxisSpacing = 24;
    stage03.paddingLeft = 24; stage03.paddingRight = 24; stage03.paddingTop = 20; stage03.paddingBottom = 20;
    stage03.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage03.counterAxisAlignItems = "SPACE_BETWEEN";
    stage03.fills = [];
    root03.appendChild(stage03);

    const tools = [
      { name: "VectorCraft", tag: "PRECISION BEZIER ENGINE", desc: "3차 베지어 곡선과 태블릿 펜 손맛을 보정하는 정밀 2px 벡터 드로잉 및 아이콘 공방 도구.", num: "01" },
      { name: "PhotoCraft", tag: "RETRO & ANALOG LAB", desc: "필름 그레인과 레트로 질감을 세공하는 아날로그 감성 이미지 에디터.", num: "02" },
      { name: "EffectCraft", tag: "WEBGL & PARTICLE STUDIO", desc: "실시간 WebGL 셰이더와 비/물결 파티클을 코딩 없이 조작하는 비주얼 이펙트 랩.", num: "03" },
      { name: "DesignCraft", tag: "W3C TOKEN COMPOSER", desc: "W3C 디자인 토큰을 기반으로 프레임과 오토레이아웃을 조립하는 시스템 UI 팩토리.", num: "04" },
      { name: "FilmCraft", tag: "TIMELINE MOTION DIRECTOR", desc: "프레임 단위의 시네마틱 모션과 3D 카메라 워크를 직관적으로 연출하는 영상 스튜디오.", num: "05" },
      { name: "Sonagi Draw", tag: "COLLABORATIVE WHITEBOARD", desc: "tldraw 기반의 실시간 협업 화이트보드와 무한 캔버스 와이어프레이밍 작업대.", num: "06" },
    ];

    tools.forEach((t) => {
      const card = figma.createFrame();
      card.name = `Instrument : ${t.name}`;
      card.resize(570, 310);
      card.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      card.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      card.strokeWeight = 2;
      card.layoutMode = "VERTICAL";
      card.primaryAxisAlignItems = "SPACE_BETWEEN";
      card.paddingLeft = 28; card.paddingRight = 28; card.paddingTop = 24; card.paddingBottom = 24;

      const cardHead = figma.createFrame();
      cardHead.layoutMode = "HORIZONTAL"; cardHead.primaryAxisAlignItems = "SPACE_BETWEEN"; cardHead.layoutAlign = "STRETCH"; cardHead.fills = [];
      const numText = figma.createText();
      numText.fontName = sansBold; numText.characters = `ARTIFACT • ${t.num}`;
      numText.fontSize = 11; numText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cardHead.appendChild(numText);

      const statusBadge = figma.createFrame();
      statusBadge.paddingLeft = 8; statusBadge.paddingRight = 8; statusBadge.paddingTop = 2; statusBadge.paddingBottom = 2;
      statusBadge.cornerRadius = 2; statusBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
      statusBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
      statusBadge.strokeWeight = 1;
      const statusText = figma.createText();
      statusText.fontName = sansBold; statusText.characters = "2PX LAW READY";
      statusText.fontSize = 9; statusText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      statusBadge.appendChild(statusText);
      cardHead.appendChild(statusBadge);
      card.appendChild(cardHead);

      const cardMid = figma.createFrame();
      cardMid.layoutMode = "VERTICAL"; cardMid.itemSpacing = 6; cardMid.layoutAlign = "STRETCH"; cardMid.fills = [];
      const titleText = figma.createText();
      titleText.fontName = serifFont; titleText.characters = t.name;
      titleText.fontSize = 24; titleText.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      cardMid.appendChild(titleText);
      const tagText = figma.createText();
      tagText.fontName = sansBold; tagText.characters = t.tag;
      tagText.fontSize = 10; tagText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      cardMid.appendChild(tagText);
      const descText = figma.createText();
      descText.fontName = sansRegular; descText.characters = t.desc;
      descText.fontSize = 11; descText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      cardMid.appendChild(descText);
      card.appendChild(cardMid);

      const cardFoot = figma.createFrame();
      cardFoot.layoutMode = "HORIZONTAL"; cardFoot.primaryAxisAlignItems = "SPACE_BETWEEN"; cardFoot.layoutAlign = "STRETCH"; cardFoot.fills = [];
      const specText = figma.createText();
      specText.fontName = sansMedium; specText.characters = "Grid: 32x32px  •  Stroke: 2px Solid";
      specText.fontSize = 10; specText.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }];
      cardFoot.appendChild(specText);
      const actionText = figma.createText();
      actionText.fontName = sansBold; actionText.characters = "VIEW BLUEPRINT ➔";
      actionText.fontSize = 10; actionText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cardFoot.appendChild(actionText);
      card.appendChild(cardFoot);

      stage03.appendChild(card);
    });

    createBottomBar(
      root03,
      "ATELIER CONSTITUTION • ARTICLE III",
      "\"도구가 완전할 때, 창작자의 손길은 거침없이 뻗어 나간다.\"",
      "When instruments reach perfection, the creator's touch flows without friction.",
      "PROGRESS  03  /  05",
      "ROOM 04 (The Living Sanctuary)"
    );

    // ════════════════════════════════════════════════════════════════════════
    // 🏛️ ROOM 04 : FIVE SCENERIES OF SOLACE (행복의 5가지 장면 전시실)
    // ════════════════════════════════════════════════════════════════════════
    const startX04 = startX03 + 1920 + 80;
    const root04 = createRoomBase("Room 04 : Five Sceneries of Solace", startX04, baseY);
    createHeader(root04, "ROOM 04 / 05 : FIVE SCENERIES OF SOLACE", "POETIC MANIFESTO POSTER GALLERY");

    const stage04 = figma.createFrame();
    stage04.name = "Five Sceneries Poster Arena";
    stage04.x = 48; stage04.y = 120; stage04.resize(1824, 696);
    stage04.layoutMode = "HORIZONTAL";
    stage04.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage04.counterAxisAlignItems = "CENTER";
    stage04.paddingLeft = 20; stage04.paddingRight = 20;
    stage04.itemSpacing = 20;
    stage04.fills = [];
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
      poster.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      poster.strokeWeight = 2;
      poster.layoutMode = "VERTICAL";
      poster.primaryAxisAlignItems = "SPACE_BETWEEN";
      poster.paddingLeft = 24; poster.paddingRight = 24; poster.paddingTop = 28; poster.paddingBottom = 28;

      const pHead = figma.createFrame();
      pHead.layoutMode = "VERTICAL"; pHead.itemSpacing = 4; pHead.layoutAlign = "STRETCH"; pHead.fills = [];
      const pNum = figma.createText();
      pNum.fontName = sansBold; pNum.characters = s.num;
      pNum.fontSize = 11; pNum.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      pHead.appendChild(pNum);
      const pSub = figma.createText();
      pSub.fontName = sansMedium; pSub.characters = s.sub;
      pSub.fontSize = 10; pSub.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      pHead.appendChild(pSub);
      poster.appendChild(pHead);

      // Artwork Reticle placeholder
      const pArt = figma.createFrame();
      pArt.name = "Artwork Reticle Frame";
      pArt.layoutAlign = "STRETCH";
      pArt.resize(288, 300);
      pArt.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
      pArt.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }];
      pArt.strokeWeight = 2;
      const pCircle = figma.createEllipse();
      pCircle.resize(140, 140);
      pCircle.x = (288 - 140) / 2; pCircle.y = (300 - 140) / 2;
      pCircle.fills = []; pCircle.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.3 }];
      pCircle.strokeWeight = 2;
      pArt.appendChild(pCircle);
      poster.appendChild(pArt);

      const pFoot = figma.createFrame();
      pFoot.layoutMode = "VERTICAL"; pFoot.itemSpacing = 8; pFoot.layoutAlign = "STRETCH"; pFoot.fills = [];
      const pTitle = figma.createText();
      pTitle.fontName = serifFont; pTitle.characters = s.title;
      pTitle.fontSize = 22; pTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      pFoot.appendChild(pTitle);
      const pDesc = figma.createText();
      pDesc.fontName = sansRegular; pDesc.characters = s.desc;
      pDesc.fontSize = 11; pDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      pFoot.appendChild(pDesc);
      poster.appendChild(pFoot);

      stage04.appendChild(poster);
    });

    createBottomBar(
      root04,
      "ATELIER CONSTITUTION • ARTICLE IV",
      "\"기계가 완벽해야 사람이 쉴 수 있다.\"",
      "When the machine is flawless, the human soul finds its solace.",
      "PROGRESS  04  /  05",
      "ROOM 05 (The Colophon & Master Seal)"
    );

    // ════════════════════════════════════════════════════════════════════════
    // 🏛️ ROOM 05 : THE COLOPHON & MASTER SEAL (공방 마스터 인장 & 출구)
    // ════════════════════════════════════════════════════════════════════════
    const startX05 = startX04 + 1920 + 80;
    const root05 = createRoomBase("Room 05 : The Colophon & Master Seal", startX05, baseY);
    createHeader(root05, "ROOM 05 / 05 : THE COLOPHON & MASTER SEAL", "MINDULLE ATELIER EPILOGUE");

    const stage05 = figma.createFrame();
    stage05.name = "Master Seal Center Stage";
    stage05.x = 48; stage05.y = 120; stage05.resize(1824, 696);
    stage05.layoutMode = "VERTICAL";
    stage05.primaryAxisAlignItems = "CENTER";
    stage05.counterAxisAlignItems = "CENTER";
    stage05.itemSpacing = 24;
    stage05.fills = [];
    root05.appendChild(stage05);

    // Giant 400x400 Master Seal Rings
    const sealStage = figma.createFrame();
    sealStage.name = "Master Seal Ring Structure";
    sealStage.resize(380, 380);
    sealStage.fills = [];

    const sealR1 = figma.createEllipse();
    sealR1.name = "Outer Ring 1"; sealR1.resize(380, 380); sealR1.x = 0; sealR1.y = 0;
    sealR1.fills = []; sealR1.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sealR1.strokeWeight = 2;
    sealStage.appendChild(sealR1);

    const sealR2 = figma.createEllipse();
    sealR2.name = "Rain Ring 2"; sealR2.resize(350, 350); sealR2.x = 15; sealR2.y = 15;
    sealR2.fills = []; sealR2.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.5 }]; sealR2.strokeWeight = 2;
    sealStage.appendChild(sealR2);

    const sealR3 = figma.createEllipse();
    sealR3.name = "Gold Core Ring"; sealR3.resize(220, 220); sealR3.x = 80; sealR3.y = 80;
    sealR3.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.05 }];
    sealR3.strokes = [{ type: 'SOLID', color: COLOR_GOLD }]; sealR3.strokeWeight = 2;
    sealStage.appendChild(sealR3);

    const sealTitle = figma.createText();
    sealTitle.fontName = serifFont; sealTitle.characters = "M I N D U L L E";
    sealTitle.fontSize = 20; sealTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    sealTitle.x = 125; sealTitle.y = 160;
    sealStage.appendChild(sealTitle);

    const sealSub = figma.createText();
    sealSub.fontName = sansBold; sealSub.characters = "ATELIER MASTER SEAL";
    sealSub.fontSize = 10; sealSub.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    sealSub.x = 135; sealSub.y = 190;
    sealStage.appendChild(sealSub);
    stage05.appendChild(sealStage);

    // Colophon Credits & CTAs
    const credBox = figma.createFrame();
    credBox.layoutMode = "VERTICAL"; credBox.primaryAxisAlignItems = "CENTER"; credBox.counterAxisAlignItems = "CENTER";
    credBox.itemSpacing = 16; credBox.fills = [];

    const creditText = figma.createText();
    creditText.fontName = serifMedium;
    creditText.characters = "A digital sanctuary crafted with 2px precision, Korean petrichor, and unbreakable sovereign tools.";
    creditText.fontSize = 15; creditText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    credBox.appendChild(creditText);

    const btnRow = figma.createFrame();
    btnRow.layoutMode = "HORIZONTAL"; btnRow.itemSpacing = 20; btnRow.fills = [];

    const cta1 = figma.createFrame();
    cta1.paddingLeft = 32; cta1.paddingRight = 32; cta1.paddingTop = 16; cta1.paddingBottom = 16;
    cta1.cornerRadius = 2; cta1.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    const cta1Text = figma.createText();
    cta1Text.fontName = sansBold; cta1Text.characters = "ENTER THE ATELIER ➔";
    cta1Text.fontSize = 12; cta1Text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    cta1.appendChild(cta1Text);
    btnRow.appendChild(cta1);

    const cta2 = figma.createFrame();
    cta2.paddingLeft = 32; cta2.paddingRight = 32; cta2.paddingTop = 16; cta2.paddingBottom = 16;
    cta2.cornerRadius = 2; cta2.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    cta2.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; cta2.strokeWeight = 2;
    const cta2Text = figma.createText();
    cta2Text.fontName = sansBold; cta2Text.characters = "EXPLORE CODE REPOSITORY";
    cta2Text.fontSize = 12; cta2Text.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    cta2.appendChild(cta2Text);
    btnRow.appendChild(cta2);

    credBox.appendChild(btnRow);
    stage05.appendChild(credBox);

    createBottomBar(
      root05,
      "ATELIER CONSTITUTION • EPILOGUE",
      "\"당신이 화면을 끄고, 삶의 가장 소중한 장면 속으로 걸어 들어갈 수 있도록.\"",
      "So that you may step away from the screen, and walk into the dearest scenes of your life.",
      "EXHIBITION COMPLETED",
      "ENTER THE SANCTUARY"
    );

    // 전체 조망 줌
    figma.viewport.scrollAndZoomIntoView([root03, root04, root05]);
    console.log("✅ [Sonagi UI Ops] Rooms 03, 04, 05 전체 배치 완료!");
    resolve();
  } catch (err) {
    console.error("❌ 생성 실패:", err);
    resolve();
  }
});
