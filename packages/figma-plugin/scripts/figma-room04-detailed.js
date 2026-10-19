/**
 * Sonagi Design System v3.0 - Room 04: Five Sceneries of Solace Detailed Edition
 * Injects 5 unique poetic vector scene artworks, multi-line typography, and pixel-perfect framing
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
    const COLOR_ROSE = { r: 244 / 255, g: 63 / 255, b: 94 / 255 };         // #f43f5e
    const COLOR_TEXT_WHITE = { r: 1, g: 1, b: 1 };
    const COLOR_TEXT_MUTED = { r: 148 / 255, g: 163 / 255, b: 184 / 255 }; // #94a3b8
    const COLOR_TEXT_DIM = { r: 100 / 255, g: 116 / 255, b: 139 / 255 };   // #64748b

    // Room 04 위치 탐색
    const existing = figma.currentPage.findOne(n => n.name.startsWith("Room 04 : Five Sceneries of Solace"));
    let originX = 6000;
    let originY = 0;
    if (existing) {
      originX = existing.x;
      originY = existing.y;
      existing.remove();
    } else {
      const room03 = figma.currentPage.findOne(n => n.name.startsWith("Room 03 : The Cabinet of Instruments"));
      if (room03) originX = room03.x + room03.width + 80;
    }

    // 1. 메인 뷰포트 프레임 (1920 x 1080)
    const root = figma.createFrame();
    root.name = "Room 04 : Five Sceneries of Solace [1920x1080]";
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
    brandSub.fontName = sansRegular; brandSub.characters = "POETIC MANIFESTO POSTER GALLERY • TIER 1";
    brandSub.fontSize = 10; brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    const roomBadge = figma.createFrame();
    roomBadge.layoutMode = "HORIZONTAL";
    roomBadge.layoutAlign = "INHERIT"; // 늘어남 방지
    roomBadge.primaryAxisSizingMode = "AUTO";
    roomBadge.counterAxisSizingMode = "AUTO";
    roomBadge.paddingLeft = 18; roomBadge.paddingRight = 18;
    roomBadge.paddingTop = 8; roomBadge.paddingBottom = 8; roomBadge.cornerRadius = 2;
    roomBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
    roomBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomBadge.strokeWeight = 2;
    const roomText = figma.createText();
    roomText.fontName = sansBold; roomText.characters = "ROOM 04 / 05 : FIVE SCENERIES OF SOLACE";
    roomText.fontSize = 11; roomText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomText.textAutoResize = "WIDTH_AND_HEIGHT";
    roomBadge.appendChild(roomText);
    header.appendChild(roomBadge);

    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "EMOTIONAL GROUNDING  •  5 CINEMATIC SCENERIES";
    metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    header.appendChild(metaText);

    // 5. 중앙 무대: 5대 감성 포스터 갤러리
    const stage = figma.createFrame();
    stage.name = "Five Sceneries Poster Arena";
    stage.x = 48; stage.y = 120; stage.resize(1824, 696);
    stage.layoutMode = "HORIZONTAL";
    stage.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage.counterAxisAlignItems = "CENTER";
    stage.paddingLeft = 20; stage.paddingRight = 20;
    stage.primaryAxisSizingMode = "FIXED";
    stage.counterAxisSizingMode = "FIXED";
    stage.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root.appendChild(stage);

    // 5대 장면 고유 벡터 아트워크 SVG
    const sceneries = [
      {
        num: "SCENE I",
        title: "비 온 뒤의 쉼",
        sub: "Petrichor & Clarity",
        desc: "창문에 흘러내리던 굵은 빗방울이 맑게 개며 스며드는 아침 햇살과 젖은 흙냄새의 정화.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="288" height="280" fill="#060911"/>
          <!-- Window Frame Grid -->
          <line x1="144" y1="20" x2="144" y2="260" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 4"/>
          <line x1="20" y1="140" x2="268" y2="140" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4 4"/>
          <!-- Falling Rain Droplets & Window Runoff -->
          <path d="M90 60C90 60 84 80 84 90C84 93.3 86.7 96 90 96C93.3 96 96 93.3 96 90C96 80 90 60 90 60Z" stroke="#4A90E2" stroke-width="2" fill="#4A90E2" fill-opacity="0.2"/>
          <path d="M190 90C190 90 186 104 186 112C186 114.2 187.8 116 190 116C192.2 116 194 114.2 194 112C194 104 190 90 190 90Z" stroke="#4A90E2" stroke-width="1.5" fill="#4A90E2" fill-opacity="0.3"/>
          <line x1="90" y1="96" x2="90" y2="130" stroke="#4A90E2" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.6"/>
          <!-- Cleared Sun Beam (Golden Rays) -->
          <circle cx="144" cy="140" r="50" stroke="#ffd166" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.7"/>
          <circle cx="144" cy="140" r="16" fill="#ffd166" fill-opacity="0.1" stroke="#ffd166" stroke-width="2"/>
        </svg>`
      },
      {
        num: "SCENE II",
        title: "즉흥적인 모험",
        sub: "The Sunset Horizon",
        desc: "계획된 일상의 틀을 깨부수고, 노을빛으로 물드는 붉은 해안도로를 향해 훌쩍 떠나는 지평선.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="288" height="280" fill="#060911"/>
          <!-- Sunset Sunkissed Horizon -->
          <line x1="20" y1="160" x2="268" y2="160" stroke="#ffd166" stroke-width="2"/>
          <path d="M104 160C104 138 122 120 144 120C166 120 184 138 184 160" stroke="#ffd166" stroke-width="2" fill="#ffd166" fill-opacity="0.15"/>
          <!-- Ocean Swell Waves -->
          <path d="M30 180C60 176 90 184 120 180C150 176 180 184 210 180C240 176 260 182 270 180" stroke="#4A90E2" stroke-width="1.5" stroke-dasharray="4 4"/>
          <!-- Winding Coastal Road Line -->
          <path d="M144 160C130 190 80 210 50 260" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <path d="M144 160C160 190 220 220 250 260" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        num: "SCENE III",
        title: "질긴 생명력",
        sub: "Dandelion in Asphalt",
        desc: "차가운 콘크리트 틈바구니에서 기어이 피어나 바람을 타고 하늘로 날아가는 노란 솜털 홀씨.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="288" height="280" fill="#060911"/>
          <!-- Asphalt Concrete Crack (2px Sharp Polygon) -->
          <path d="M40 240L110 200L144 215L180 195L250 240" stroke="#30363d" stroke-width="2.5" stroke-linejoin="round"/>
          <!-- Dandelion Stem Rising -->
          <path d="M144 215C142 180 140 150 144 130" stroke="#ffd166" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Parachute Seed Puff (Golden Core) -->
          <circle cx="144" cy="120" r="14" fill="#ffd166" stroke="#ffffff" stroke-width="1.5"/>
          <!-- Floating Seeds Blowing in the Wind -->
          <g stroke="#ffd166" stroke-width="1.5">
            <line x1="160" y1="100" x2="175" y2="85"/>
            <circle cx="177" cy="83" r="2.5" fill="#ffd166"/>
            <line x1="180" y1="70" x2="200" y2="55"/>
            <circle cx="202" cy="53" r="3" fill="#ffd166"/>
            <line x1="130" y1="90" x2="115" y2="75"/>
            <circle cx="113" cy="73" r="2" fill="#ffd166"/>
          </g>
        </svg>`
      },
      {
        num: "SCENE IV",
        title: "아늑한 아틀리에",
        sub: "The Sunlit Workshop",
        desc: "세상의 비바람을 뚫고, 오후의 햇살이 가득 쏟아지는 작업대 위에서 다시 날개를 펴는 공방.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="288" height="280" fill="#060911"/>
          <!-- 45-degree Atelier Sunbeam -->
          <polygon points="60,20 180,20 260,240 140,240" fill="#ffd166" fill-opacity="0.08"/>
          <!-- Architectural Table Edge -->
          <line x1="30" y1="210" x2="260" y2="210" stroke="#30363d" stroke-width="2"/>
          <!-- Drafting Compass & Stylus on Desk -->
          <circle cx="144" cy="180" r="28" stroke="#4A90E2" stroke-width="2"/>
          <line x1="144" y1="140" x2="144" y2="210" stroke="#ffd166" stroke-width="2"/>
          <circle cx="144" cy="140" r="4" fill="#ffd166"/>
          <rect x="70" y="195" width="45" height="15" rx="2" stroke="#ffffff" stroke-width="1.5" fill="#060911"/>
        </svg>`
      },
      {
        num: "SCENE V",
        title: "궁극의 안식처",
        sub: "The Midnight Hearth",
        desc: "차가운 밤공기를 뒤로하고, 잠든 아이의 따뜻한 무게를 안고 현관문을 열고 들어오는 밤의 거실.",
        svg: `<svg width="288" height="280" viewBox="0 0 288 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="288" height="280" fill="#060911"/>
          <!-- Crescent Moon Outside Window -->
          <path d="M60 50C60 66 74 80 90 80C78 80 68 70 68 58C68 54 70 51 72 48C65 47 60 48 60 50Z" fill="#4A90E2" stroke="#4A90E2" stroke-width="1.5"/>
          <!-- Warm Amber Doorway Arch -->
          <path d="M104 260L104 140C104 118 122 100 144 100C166 100 184 118 184 140L184 260" stroke="#ffd166" stroke-width="2.5" fill="#ffd166" fill-opacity="0.12"/>
          <!-- Glowing Hearth Core -->
          <circle cx="144" cy="180" r="24" fill="#ffd166" fill-opacity="0.3" stroke="#ffd166" stroke-width="2"/>
          <circle cx="144" cy="180" r="10" fill="#ffd166"/>
        </svg>`
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

      // 1. Poster Top (Scene Roman No & Subtitle)
      const pHead = figma.createFrame();
      pHead.layoutMode = "VERTICAL";
      pHead.itemSpacing = 4;
      pHead.layoutAlign = "STRETCH";
      pHead.primaryAxisSizingMode = "AUTO";
      pHead.counterAxisSizingMode = "AUTO";
      pHead.fills = [];

      const pNum = figma.createText();
      pNum.fontName = sansBold;
      pNum.characters = s.num;
      pNum.fontSize = 11;
      pNum.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      pHead.appendChild(pNum);

      const pSub = figma.createText();
      pSub.fontName = sansMedium;
      pSub.characters = s.sub;
      pSub.fontSize = 10;
      pSub.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      pHead.appendChild(pSub);
      poster.appendChild(pHead);

      // 2. Poster Mid: Dedicated 2px Vector Scene Artwork
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

      // 3. Poster Foot: Title + Multi-line Evocative Copy
      const pFoot = figma.createFrame();
      pFoot.layoutMode = "VERTICAL";
      pFoot.itemSpacing = 8;
      pFoot.layoutAlign = "STRETCH";
      pFoot.primaryAxisSizingMode = "AUTO";
      pFoot.counterAxisSizingMode = "AUTO";
      pFoot.fills = [];

      const pTitle = figma.createText();
      pTitle.fontName = serifFont;
      pTitle.characters = s.title;
      pTitle.fontSize = 22;
      pTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      pFoot.appendChild(pTitle);

      const pDesc = figma.createText();
      pDesc.fontName = sansRegular;
      pDesc.characters = s.desc;
      pDesc.fontSize = 11;
      pDesc.lineHeight = { value: 16, unit: "PIXELS" };
      pDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      pDesc.textAutoResize = "HEIGHT";
      pDesc.resize(288, 48); // 넉넉하게 3줄 자동 래핑
      pFoot.appendChild(pDesc);

      poster.appendChild(pFoot);
      stage.appendChild(poster);
    });

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
    manifestoBox.layoutMode = "VERTICAL";
    manifestoBox.layoutGrow = 1;
    manifestoBox.counterAxisAlignItems = "MIN";
    manifestoBox.itemSpacing = 8;
    manifestoBox.fills = [];

    const eyebrow = figma.createText();
    eyebrow.fontName = sansBold; eyebrow.characters = "ATELIER CONSTITUTION • ARTICLE IV";
    eyebrow.fontSize = 10; eyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(eyebrow);

    const mainQuote = figma.createText();
    mainQuote.fontName = serifFont;
    mainQuote.characters = "\"기계가 완벽해야 사람이 쉴 수 있다.\"";
    mainQuote.fontSize = 28; mainQuote.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    manifestoBox.appendChild(mainQuote);

    const subQuote = figma.createText();
    subQuote.fontName = serifMedium;
    subQuote.characters = "When the machine is flawless, human soul finds its solace.";
    subQuote.fontSize = 15; subQuote.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(subQuote);
    bottomBar.appendChild(manifestoBox);

    const navBox = figma.createFrame();
    navBox.layoutMode = "VERTICAL";
    navBox.counterAxisAlignItems = "MAX";
    navBox.primaryAxisSizingMode = "AUTO";
    navBox.counterAxisSizingMode = "AUTO";
    navBox.layoutAlign = "INHERIT";
    navBox.itemSpacing = 10;
    navBox.fills = [];

    const progressLabel = figma.createText();
    progressLabel.fontName = sansBold; progressLabel.characters = "PROGRESS  04  /  05";
    progressLabel.fontSize = 11; progressLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    progressLabel.textAutoResize = "WIDTH_AND_HEIGHT";
    navBox.appendChild(progressLabel);

    const scrollBtn = figma.createFrame();
    scrollBtn.layoutMode = "VERTICAL";
    scrollBtn.primaryAxisAlignItems = "CENTER";
    scrollBtn.counterAxisAlignItems = "CENTER";
    scrollBtn.primaryAxisSizingMode = "AUTO";
    scrollBtn.counterAxisSizingMode = "AUTO";
    scrollBtn.paddingLeft = 28; scrollBtn.paddingRight = 28;
    scrollBtn.paddingTop = 14; scrollBtn.paddingBottom = 14;
    scrollBtn.cornerRadius = 2;
    scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.strokeWeight = 2;

    const btnText = figma.createText();
    btnText.fontName = sansBold; btnText.characters = "SCROLL TO ENTER ROOM 05 ↓";
    btnText.fontSize = 11; btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    btnText.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnText);

    const btnSub = figma.createText();
    btnSub.fontName = sansRegular; btnSub.characters = "The Colophon & Master Seal";
    btnSub.fontSize = 9; btnSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    btnSub.textAutoResize = "WIDTH_AND_HEIGHT";
    scrollBtn.appendChild(btnSub);

    navBox.appendChild(scrollBtn);
    bottomBar.appendChild(navBox);

    figma.viewport.scrollAndZoomIntoView([root]);
    figma.notify("🌅 Room 04 : Five Sceneries of Solace 감성 포스터 세공 완료!");
    resolve();
  } catch (err) {
    console.error("Room 04 detail generation failed:", err);
    resolve();
  }
});
