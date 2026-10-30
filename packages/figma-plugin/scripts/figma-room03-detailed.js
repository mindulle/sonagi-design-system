/**
 * Sonagi Design System v3.0 - Room 03: The Cabinet of Instruments (Pixel-Perfect Fixed Edition)
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

    // Room 03 프레임 찾기
    const existing = figma.currentPage.findOne(n => n.name.startsWith("Room 03 : The Cabinet of Instruments"));
    let originX = 4000;
    let originY = 0;
    if (existing) {
      originX = existing.x;
      originY = existing.y;
      existing.remove();
    } else {
      const room02 = figma.currentPage.findOne(n => n.name.startsWith("Room 02 : The Monolith of Solace"));
      if (room02) originX = room02.x + room02.width + 80;
    }

    // 1. 메인 뷰포트 프레임 (1920 x 1080)
    const root = figma.createFrame();
    root.name = "Room 03 : The Cabinet of Instruments [1920x1080]";
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
    brandSub.fontName = sansRegular; brandSub.characters = "THE SONAGI 6-IN-1 TOOLING SUITE • TIER 3";
    brandSub.fontSize = 10; brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    const roomBadge = figma.createFrame();
    roomBadge.layoutMode = "HORIZONTAL"; roomBadge.paddingLeft = 18; roomBadge.paddingRight = 18;
    roomBadge.paddingTop = 8; roomBadge.paddingBottom = 8; roomBadge.cornerRadius = 2;
    roomBadge.fills = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.1 }];
    roomBadge.strokes = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomBadge.strokeWeight = 2;
    const roomText = figma.createText();
    roomText.fontName = sansBold; roomText.characters = "ROOM 03 / 05 : THE CABINET OF INSTRUMENTS";
    roomText.fontSize = 11; roomText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    roomBadge.appendChild(roomText);
    header.appendChild(roomBadge);

    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "SOVEREIGN TOOLING ARTIFACTS  •  2PX ARCHITECTURE";
    metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    header.appendChild(metaText);

    // 5. 중앙 무대: 3x2 도구 그리드 스테이지 (세로 높이 꽉 채우기)
    const stage = figma.createFrame();
    stage.name = "Instruments Grid Stage (3x2)";
    stage.x = 48; stage.y = 120; stage.resize(1824, 696);
    stage.layoutMode = "VERTICAL";
    stage.primaryAxisAlignItems = "SPACE_BETWEEN";
    stage.counterAxisAlignItems = "CENTER";
    stage.paddingLeft = 24; stage.paddingRight = 24;
    stage.paddingTop = 24; stage.paddingBottom = 24;
    stage.primaryAxisSizingMode = "FIXED";
    stage.counterAxisSizingMode = "FIXED";
    stage.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    root.appendChild(stage);

    const toolArtifacts = [
      {
        id: "01",
        name: "VectorCraft",
        badge: "BEZIER ENGINE",
        tag: "PRECISION STYLUS FORGE",
        desc: "3차 베지어 곡선 보정과 태블릿 펜 필압을 지원하는 순수 벡터 공방. 단 1px의 어긋남 없는 2px 아이콘 및 선화 에셋을 직접 세공합니다.",
        spec: "Engine: Affinity SDK  •  Output: SVG / VectorCraft",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/>
          <circle cx="20" cy="12" r="3" stroke="#ffd166" stroke-width="2" fill="#060911"/>
          <path d="M18 15L12 28L15 31L20 20" stroke="#4A90E2" stroke-width="2" stroke-linejoin="round"/>
          <path d="M12 28L10 32L15 31Z" fill="#ffd166"/>
          <path d="M22 15L28 28L26 32L20 20" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
        </svg>`
      },
      {
        id: "02",
        name: "PhotoCraft",
        badge: "ANALOG EMULSION",
        tag: "RETRO GRAIN LAB",
        desc: "차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 이미지 에디터. 페트리코 텍스처와 감성적 색감 보정을 전담합니다.",
        spec: "Filter: 35mm Grain  •  Output: OKLCH Canvas WebP",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" stroke-width="2"/>
          <circle cx="20" cy="20" r="13" stroke="#ffd166" stroke-width="2"/>
          <circle cx="20" cy="20" r="6" fill="#ffd166"/>
          <path d="M15 12L25 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: "03",
        name: "EffectCraft",
        badge: "WEBGL & SHADER",
        tag: "REALTIME PARTICLE ATELIER",
        desc: "실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 스튜디오. GPU 가속으로 살아 숨 쉬는 물방울을 빚어냅니다.",
        spec: "Pipeline: Three.js / R3F  •  GPU: Dedicated WebGL",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/>
          <path d="M20 8C20 8 12 18 12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24C28 18 20 8 20 8Z" stroke="#4A90E2" stroke-width="2" fill="#4A90E2" fill-opacity="0.15"/>
          <circle cx="20" cy="24" r="4" fill="#ffd166"/>
        </svg>`
      },
      {
        id: "04",
        name: "DesignCraft",
        badge: "W3C TOKEN SSOT",
        tag: "LAYOUT COMPOSER",
        desc: "The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기. 불필요한 시각적 노이즈를 걷어내고 견고한 시스템을 구축합니다.",
        spec: "Tokens: @mindulle/tokens  •  Rules: The 2px Law",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#ffd166" stroke-width="2"/>
          <rect x="10" y="10" width="8" height="8" stroke="#ffffff" stroke-width="2"/>
          <rect x="22" y="10" width="8" height="8" stroke="#4A90E2" stroke-width="2"/>
          <rect x="10" y="22" width="20" height="8" stroke="#ffd166" stroke-width="2"/>
        </svg>`
      },
      {
        id: "05",
        name: "FilmCraft",
        badge: "TIMELINE DIRECTOR",
        tag: "THEATRE.JS MOTION LAB",
        desc: "키프레임 타임라인과 가상 3D 카메라 워크를 직관적으로 연출하는 모션 디렉터. 스크롤에 반응하는 시네마틱 트랜지션의 서사를 완성합니다.",
        spec: "Studio: @theatre/studio  •  State: state.json",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" stroke-width="2"/>
          <polygon points="16,13 28,20 16,27" fill="#ffd166" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="8" y1="33" x2="32" y2="33" stroke="#4A90E2" stroke-width="2" stroke-dasharray="3 3"/>
        </svg>`
      },
      {
        id: "06",
        name: "Sonagi Draw",
        badge: "CANVAS HARNESS",
        tag: "COLLABORATIVE WHITEBOARD",
        desc: "tldraw 기반의 실시간 화이트보드와 에이전트 연동 작업대. 기획 아이디어와 와이어프레임 뼈대를 가장 직관적으로 스케치하고 검증합니다.",
        spec: "Engine: Tldraw v3  •  Bridge: canvasAdapter",
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" stroke-width="2"/>
          <path d="M10 28C14 20 22 30 30 14" stroke="#ffd166" stroke-width="2" stroke-linecap="round"/>
          <circle cx="30" cy="14" r="3" fill="#4A90E2"/>
          <circle cx="10" cy="28" r="3" fill="#ffffff"/>
        </svg>`
      }
    ];

    function createDetailedCard(tool) {
      const card = figma.createFrame();
      card.name = `Artifact Card : ${tool.name}`;
      card.resize(570, 305);
      card.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      card.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
      card.strokeWeight = 2;
      card.layoutMode = "VERTICAL";
      card.primaryAxisAlignItems = "SPACE_BETWEEN";
      card.counterAxisAlignItems = "MIN";
      card.paddingLeft = 28; card.paddingRight = 28; card.paddingTop = 22; card.paddingBottom = 22;
      card.primaryAxisSizingMode = "FIXED";
      card.counterAxisSizingMode = "FIXED";

      // 1. Card Header (Icon + Artifact No + Badge)
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
      numText.fontName = sansBold;
      numText.characters = `ARTIFACT • ${tool.id}`;
      numText.fontSize = 11;
      numText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
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
      statusText.fontName = sansBold;
      statusText.characters = tool.badge;
      statusText.fontSize = 9;
      statusText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      statusBadge.appendChild(statusText);
      headRight.appendChild(statusBadge);

      cardHead.appendChild(headRight);
      card.appendChild(cardHead);

      // 2. Card Mid (Title + Tagline + Body)
      const cardMid = figma.createFrame();
      cardMid.name = "Card Body";
      cardMid.layoutMode = "VERTICAL";
      cardMid.itemSpacing = 6;
      cardMid.layoutAlign = "STRETCH";
      cardMid.primaryAxisSizingMode = "AUTO";
      cardMid.counterAxisSizingMode = "AUTO";
      cardMid.fills = [];

      const titleText = figma.createText();
      titleText.fontName = serifFont;
      titleText.characters = tool.name;
      titleText.fontSize = 24;
      titleText.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
      cardMid.appendChild(titleText);

      const tagText = figma.createText();
      tagText.fontName = sansBold;
      tagText.characters = tool.tag;
      tagText.fontSize = 10;
      tagText.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
      cardMid.appendChild(tagText);

      const descText = figma.createText();
      descText.fontName = sansRegular;
      descText.characters = tool.desc;
      descText.fontSize = 11;
      descText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      cardMid.appendChild(descText);

      card.appendChild(cardMid);

      // 3. Card Foot (Specs & Link)
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
      specText.fontName = sansMedium;
      specText.characters = tool.spec;
      specText.fontSize = 10;
      specText.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }];
      cardFoot.appendChild(specText);

      const actionText = figma.createText();
      actionText.fontName = sansBold;
      actionText.characters = "VIEW BLUEPRINT ➔";
      actionText.fontSize = 10;
      actionText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cardFoot.appendChild(actionText);

      card.appendChild(cardFoot);
      return card;
    }

    // Row 1
    const row1 = figma.createFrame();
    row1.name = "Row 1";
    row1.layoutMode = "HORIZONTAL";
    row1.itemSpacing = 24;
    row1.layoutAlign = "STRETCH";
    row1.primaryAxisAlignItems = "SPACE_BETWEEN";
    row1.primaryAxisSizingMode = "FIXED";
    row1.counterAxisSizingMode = "AUTO";
    row1.fills = [];
    row1.appendChild(createDetailedCard(toolArtifacts[0]));
    row1.appendChild(createDetailedCard(toolArtifacts[1]));
    row1.appendChild(createDetailedCard(toolArtifacts[2]));
    stage.appendChild(row1);

    // Row 2
    const row2 = figma.createFrame();
    row2.name = "Row 2";
    row2.layoutMode = "HORIZONTAL";
    row2.itemSpacing = 24;
    row2.layoutAlign = "STRETCH";
    row2.primaryAxisAlignItems = "SPACE_BETWEEN";
    row2.primaryAxisSizingMode = "FIXED";
    row2.counterAxisSizingMode = "AUTO";
    row2.fills = [];
    row2.appendChild(createDetailedCard(toolArtifacts[3]));
    row2.appendChild(createDetailedCard(toolArtifacts[4]));
    row2.appendChild(createDetailedCard(toolArtifacts[5]));
    stage.appendChild(row2);

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
    eyebrow.fontName = sansBold; eyebrow.characters = "ATELIER CONSTITUTION • ARTICLE III";
    eyebrow.fontSize = 10; eyebrow.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(eyebrow);

    const mainQuote = figma.createText();
    mainQuote.fontName = serifFont;
    mainQuote.characters = "\"도구가 완전할 때, 창작자의 손길은 거침없이 뻗어 나간다.\"";
    mainQuote.fontSize = 28; mainQuote.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    manifestoBox.appendChild(mainQuote);

    const subQuote = figma.createText();
    subQuote.fontName = serifMedium;
    subQuote.characters = "When instruments reach perfection, the creator's touch flows without friction.";
    subQuote.fontSize = 15; subQuote.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    manifestoBox.appendChild(subQuote);
    bottomBar.appendChild(manifestoBox);

    const navBox = figma.createFrame();
    navBox.layoutMode = "VERTICAL"; navBox.counterAxisAlignItems = "MAX"; navBox.itemSpacing = 10; navBox.fills = [];

    const progressLabel = figma.createText();
    progressLabel.fontName = sansBold; progressLabel.characters = "PROGRESS  03  /  05";
    progressLabel.fontSize = 11; progressLabel.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    navBox.appendChild(progressLabel);

    const scrollBtn = figma.createFrame();
    scrollBtn.layoutMode = "VERTICAL"; scrollBtn.paddingLeft = 28; scrollBtn.paddingRight = 28;
    scrollBtn.paddingTop = 14; scrollBtn.paddingBottom = 14; scrollBtn.cornerRadius = 2;
    scrollBtn.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    scrollBtn.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.strokeWeight = 2;
    const btnText = figma.createText();
    btnText.fontName = sansBold; btnText.characters = "SCROLL TO ENTER ROOM 04 ↓";
    btnText.fontSize = 11; btnText.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    scrollBtn.appendChild(btnText);
    const btnSub = figma.createText();
    btnSub.fontName = sansRegular; btnSub.characters = "Five Sceneries of Solace";
    btnSub.fontSize = 9; btnSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    scrollBtn.appendChild(btnSub);
    navBox.appendChild(scrollBtn);
    bottomBar.appendChild(navBox);

    figma.viewport.scrollAndZoomIntoView([root]);
    figma.notify("🛠️ Room 03 : The Cabinet of Instruments 픽셀 퍼펙트 재렌더링 완료!");
    resolve();
  } catch (err) {
    console.error("Room 03 detail generation failed:", err);
    resolve();
  }
});
