/**
 * Sonagi Design System v3.0 - Version 2.0 Continuous Cinematic Long-Scroll Wireframe
 * Placed neatly below Version 1 at y = 1300
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

    // Version 1 기준 좌표 탐색 (없으면 0, 0)
    const room01 = figma.currentPage.findOne(n => n.name.startsWith("Room 01"));
    const originX = room01 ? room01.x : 0;
    const originY = room01 ? room01.y + 1300 : 1300; // V1 아래 1300px 위치

    // 기존 V2 프레임 삭제 후 갱신
    const existingV2 = figma.currentPage.findOne(n => n.name.startsWith("[Option 2] Continuous Cinematic"));
    if (existingV2) existingV2.remove();

    // 1. 메인 롱-스크롤 캔버스 (1920 x 5200)
    const root = figma.createFrame();
    root.name = "[Option 2] Continuous Cinematic Long-Scroll [1920x5200]";
    root.x = originX;
    root.y = originY;
    root.resize(1920, 5200);
    root.clipsContent = true;
    root.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    figma.currentPage.appendChild(root);

    // 2. 외곽 2px 건축 그리드 테두리 (1824 x 5104)
    const gridFrame = figma.createFrame();
    gridFrame.name = "Architectural Outer Boundary";
    gridFrame.x = 48; gridFrame.y = 48;
    gridFrame.resize(1824, 5104);
    gridFrame.fills = [];
    gridFrame.strokes = [{ type: 'SOLID', color: COLOR_BORDER }];
    gridFrame.strokeWeight = 2;
    root.appendChild(gridFrame);

    // 3. 모서리 십자 마크 (+)
    [{ x: 44, y: 44 }, { x: 1864, y: 44 }, { x: 44, y: 5144 }, { x: 1864, y: 5144 }].forEach((pos) => {
      const cross = figma.createText();
      cross.fontName = sansBold; cross.characters = "+";
      cross.fontSize = 16; cross.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
      cross.x = pos.x; cross.y = pos.y;
      root.appendChild(cross);
    });

    // 4. 고정 헤더 바 (Top Sticky Bar)
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
    brandSub.fontName = sansRegular; brandSub.characters = "OPTION 2 : CONTINUOUS CINEMATIC LONG-SCROLL";
    brandSub.fontSize = 10; brandSub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    brandBox.appendChild(brandSub);
    header.appendChild(brandBox);

    const v2Badge = figma.createFrame();
    v2Badge.layoutMode = "HORIZONTAL"; v2Badge.paddingLeft = 18; v2Badge.paddingRight = 18;
    v2Badge.paddingTop = 8; v2Badge.paddingBottom = 8; v2Badge.cornerRadius = 2;
    v2Badge.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.1 }];
    v2Badge.strokes = [{ type: 'SOLID', color: COLOR_GOLD }];
    v2Badge.strokeWeight = 2;
    const v2Text = figma.createText();
    v2Text.fontName = sansBold; v2Text.characters = "V2.0 : ONE-TAKE CINEMA SCROLL";
    v2Text.fontSize = 11; v2Text.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    v2Text.textAutoResize = "WIDTH_AND_HEIGHT";
    v2Badge.appendChild(v2Text);
    header.appendChild(v2Badge);

    const metaText = figma.createText();
    metaText.fontName = sansMedium;
    metaText.characters = "PIN & SCRUB TIMELINE  •  THEATRE.JS BOUND";
    metaText.fontSize = 11; metaText.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    header.appendChild(metaText);

    // ════════════════════════════════════════════════════════════════════════
    // 🎬 SECTION 01 : HERO & THE STICKY DROPLET (y: 120 ~ 1050)
    // ════════════════════════════════════════════════════════════════════════
    const sec01 = figma.createFrame();
    sec01.name = "Section 01 : Cinematic Hero (0 - 1000px)";
    sec01.x = 48; sec01.y = 120; sec01.resize(1824, 930);
    sec01.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    sec01.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sec01.strokeWeight = 1;
    root.appendChild(sec01);

    // Reticle Centerpiece (Sticky in Code)
    const cX = 1824 / 2;
    const cY = 930 / 2;

    const outerR = figma.createEllipse();
    outerR.resize(440, 440); outerR.x = cX - 220; outerR.y = cY - 220;
    outerR.fills = []; outerR.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.4 }]; outerR.strokeWeight = 2;
    sec01.appendChild(outerR);

    const innerR = figma.createEllipse();
    innerR.resize(200, 200); innerR.x = cX - 100; innerR.y = cY - 100;
    innerR.fills = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.05 }];
    innerR.strokes = [{ type: 'SOLID', color: COLOR_GOLD, opacity: 0.8 }]; innerR.strokeWeight = 2;
    sec01.appendChild(innerR);

    // Floating Hero Content
    const heroBox = figma.createFrame();
    heroBox.layoutMode = "VERTICAL"; heroBox.primaryAxisAlignItems = "CENTER"; heroBox.counterAxisAlignItems = "CENTER";
    heroBox.itemSpacing = 16; heroBox.x = cX - 550; heroBox.y = cY - 90; heroBox.resize(1100, 180); heroBox.fills = [];

    const heroTitle = figma.createText();
    heroTitle.fontName = serifFont; heroTitle.characters = "\"도구가 완벽할 때, 손길은 비로소 자유로워진다.\"";
    heroTitle.fontSize = 40; heroTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }];
    heroTitle.textAutoResize = "WIDTH_AND_HEIGHT"; heroBox.appendChild(heroTitle);

    const heroEn = figma.createText();
    heroEn.fontName = serifMedium; heroEn.characters = "When the machine is flawless, the human soul finds its solace.";
    heroEn.fontSize = 18; heroEn.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    heroEn.textAutoResize = "WIDTH_AND_HEIGHT"; heroBox.appendChild(heroEn);

    const scrollPrompt = figma.createText();
    scrollPrompt.fontName = sansBold; scrollPrompt.characters = "⬇ SCROLL TO UNRAVEL THE ARCHITECTURE (PIN & SCRUB)";
    scrollPrompt.fontSize = 11; scrollPrompt.fills = [{ type: 'SOLID', color: COLOR_RAIN }];
    scrollPrompt.textAutoResize = "WIDTH_AND_HEIGHT"; heroBox.appendChild(scrollPrompt);
    sec01.appendChild(heroBox);

    // ════════════════════════════════════════════════════════════════════════
    // 🌗 SECTION 02 : DUAL METAPHOR BLEND (y: 1050 ~ 2050)
    // ════════════════════════════════════════════════════════════════════════
    const sec02 = figma.createFrame();
    sec02.name = "Section 02 : Dual World Metaphor Blend (1000 - 2000px)";
    sec02.x = 48; sec02.y = 1050; sec02.resize(1824, 1000);
    sec02.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    sec02.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sec02.strokeWeight = 1;
    sec02.layoutMode = "HORIZONTAL"; sec02.primaryAxisAlignItems = "SPACE_BETWEEN"; sec02.counterAxisAlignItems = "CENTER";
    sec02.paddingLeft = 48; sec02.paddingRight = 48;
    root.appendChild(sec02);

    const colDark = figma.createFrame();
    colDark.resize(840, 800); colDark.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    colDark.strokes = [{ type: 'SOLID', color: COLOR_RAIN }]; colDark.strokeWeight = 2;
    colDark.layoutMode = "VERTICAL"; colDark.primaryAxisAlignItems = "SPACE_BETWEEN";
    colDark.paddingLeft = 40; colDark.paddingRight = 40; colDark.paddingTop = 40; colDark.paddingBottom = 40;
    const cdTag = figma.createText(); cdTag.fontName = sansBold; cdTag.characters = "SCROLL-TRIGGER 01 • WILD ARCHITECTURE (소나기)";
    cdTag.fontSize = 11; cdTag.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; colDark.appendChild(cdTag);
    const cdTitle = figma.createText(); cdTitle.fontName = serifFont; cdTitle.characters = "\"얼어붙은 땅을 깨우는 벼락같은 몰입과 방패.\"";
    cdTitle.fontSize = 26; cdTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; colDark.appendChild(cdTitle);
    const cdDesc = figma.createText(); cdDesc.fontName = sansRegular;
    cdDesc.characters = "거칠고 폭발적인 기술력으로 창작자의 주권을 지켜내는 디지털 방파제. 스크롤 위치에 따라 어두운 밤하늘에 빗줄기가 쏟아지는 시네마틱 셰이더 활성화.";
    cdDesc.fontSize = 12; cdDesc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
    cdDesc.textAutoResize = "HEIGHT"; cdDesc.resize(760, 48); colDark.appendChild(cdDesc);
    sec02.appendChild(colDark);

    const colLight = figma.createFrame();
    colLight.resize(840, 800); colLight.fills = [{ type: 'SOLID', color: COLOR_PAPER }];
    colLight.strokes = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }]; colLight.strokeWeight = 2;
    colLight.layoutMode = "VERTICAL"; colLight.primaryAxisAlignItems = "SPACE_BETWEEN";
    colLight.paddingLeft = 40; colLight.paddingRight = 40; colLight.paddingTop = 40; colLight.paddingBottom = 40;
    const clTag = figma.createText(); clTag.fontName = sansBold; clTag.characters = "SCROLL-TRIGGER 02 • LIVING SOUL (민들레)";
    clTag.fontSize = 11; clTag.fills = [{ type: 'SOLID', color: COLOR_PAPER_BORDER }]; colLight.appendChild(clTag);
    const clTitle = figma.createText(); clTitle.fontName = serifFont; clTitle.characters = "\"척박한 콘크리트 틈에서 피어나는 다정함.\"";
    clTitle.fontSize = 26; clTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_INK }]; colLight.appendChild(clTitle);
    const clDesc = figma.createText(); clDesc.fontName = sansRegular;
    clDesc.characters = "차가운 성벽의 족쇄를 풀고, 오후의 햇살과 젖은 흙내음처럼 창작자의 손길을 따스하게 보듬는 안식처. 스크롤이 도달하면 배경이 웜 화이트 종이로 부드럽게 모핑.";
    clDesc.fontSize = 12; clDesc.fills = [{ type: 'SOLID', color: { r: 100/255, g: 90/255, b: 80/255 } }];
    clDesc.textAutoResize = "HEIGHT"; clDesc.resize(760, 48); colLight.appendChild(clDesc);
    sec02.appendChild(colLight);

    // ════════════════════════════════════════════════════════════════════════
    // 🛠️ SECTION 03 : HORIZONTAL RUNWAY TRACK (y: 2050 ~ 3050)
    // ════════════════════════════════════════════════════════════════════════
    const sec03 = figma.createFrame();
    sec03.name = "Section 03 : The Instruments Runway (2000 - 3000px)";
    sec03.x = 48; sec03.y = 2050; sec03.resize(1824, 1000);
    sec03.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    sec03.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sec03.strokeWeight = 1;
    sec03.layoutMode = "VERTICAL"; sec03.primaryAxisAlignItems = "SPACE_BETWEEN";
    sec03.paddingLeft = 40; sec03.paddingRight = 40; sec03.paddingTop = 40; sec03.paddingBottom = 40;
    root.appendChild(sec03);

    const s03Head = figma.createFrame();
    s03Head.layoutMode = "HORIZONTAL"; s03Head.primaryAxisAlignItems = "SPACE_BETWEEN"; s03Head.counterAxisAlignItems = "CENTER";
    s03Head.layoutAlign = "STRETCH"; s03Head.fills = [];
    const s03Title = figma.createText(); s03Title.fontName = serifFont; s03Title.characters = "THE 6-IN-1 INSTRUMENTS RUNWAY";
    s03Title.fontSize = 28; s03Title.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; s03Head.appendChild(s03Title);
    const s03TrackNotice = figma.createText(); s03TrackNotice.fontName = sansBold; s03TrackNotice.characters = "◄ PINNED HORIZONTAL PARALLAX TRACK ►";
    s03TrackNotice.fontSize = 11; s03TrackNotice.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; s03Head.appendChild(s03TrackNotice);
    sec03.appendChild(s03Head);

    // Horizontal Scrolling Cards Row (Figma Preview: 3 Cards visible + 3 Overflowing)
    const trackRow = figma.createFrame();
    trackRow.name = "Horizontal Cards Runway Track";
    trackRow.layoutMode = "HORIZONTAL"; trackRow.itemSpacing = 24; trackRow.layoutAlign = "STRETCH";
    trackRow.resize(1744, 480); trackRow.fills = [];

    const toolsV2 = [
      { id: "01", name: "VectorCraft", badge: "BEZIER ENGINE", desc: "3차 베지어 곡선 보정과 태블릿 펜 손맛을 지원하는 정밀 2px 벡터 드로잉 및 아이콘 공방." },
      { id: "02", name: "PhotoCraft", badge: "ANALOG EMULSION", desc: "차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 이미지 에디터." },
      { id: "03", name: "EffectCraft", badge: "WEBGL & SHADER", desc: "실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 랩." },
      { id: "04", name: "DesignCraft", badge: "W3C TOKEN SSOT", desc: "The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기." },
    ];

    toolsV2.forEach(t => {
      const card = figma.createFrame();
      card.resize(415, 480); card.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
      card.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; card.strokeWeight = 2;
      card.layoutMode = "VERTICAL"; card.primaryAxisAlignItems = "SPACE_BETWEEN";
      card.paddingLeft = 28; card.paddingRight = 28; card.paddingTop = 28; card.paddingBottom = 28;

      const cHead = figma.createFrame(); cHead.layoutMode = "HORIZONTAL"; cHead.primaryAxisAlignItems = "SPACE_BETWEEN"; cHead.layoutAlign = "STRETCH"; cHead.fills = [];
      const nText = figma.createText(); nText.fontName = sansBold; nText.characters = `ARTIFACT • ${t.id}`; nText.fontSize = 11; nText.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; cHead.appendChild(nText);
      const bText = figma.createText(); bText.fontName = sansBold; bText.characters = t.badge; bText.fontSize = 9; bText.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; cHead.appendChild(bText);
      card.appendChild(cHead);

      const cBody = figma.createFrame(); cBody.layoutMode = "VERTICAL"; cBody.itemSpacing = 8; cBody.layoutAlign = "STRETCH"; cBody.fills = [];
      const title = figma.createText(); title.fontName = serifFont; title.characters = t.name; title.fontSize = 28; title.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; cBody.appendChild(title);
      const desc = figma.createText(); desc.fontName = sansRegular; desc.characters = t.desc; desc.fontSize = 12; desc.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }];
      desc.textAutoResize = "HEIGHT"; desc.resize(359, 48); cBody.appendChild(desc);
      card.appendChild(cBody);

      const cFoot = figma.createFrame(); cFoot.layoutMode = "HORIZONTAL"; cFoot.primaryAxisAlignItems = "SPACE_BETWEEN"; cFoot.layoutAlign = "STRETCH"; cFoot.fills = [];
      const link = figma.createText(); link.fontName = sansBold; link.characters = "SCRUB HORIZONTAL ➔"; link.fontSize = 10; link.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; cFoot.appendChild(link);
      card.appendChild(cFoot);

      trackRow.appendChild(card);
    });
    sec03.appendChild(trackRow);

    const s03Foot = figma.createFrame(); s03Foot.layoutMode = "HORIZONTAL"; s03Foot.layoutAlign = "STRETCH"; s03Foot.fills = [];
    const s03Article = figma.createText(); s03Article.fontName = sansRegular; s03Article.characters = "스크롤을 내리면 화면 중앙에서 가로 트랙이 부드럽게 슬라이딩하며 6개 도구를 전개합니다.";
    s03Article.fontSize = 11; s03Article.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }]; s03Foot.appendChild(s03Article);
    sec03.appendChild(s03Foot);

    // ════════════════════════════════════════════════════════════════════════
    // 🌅 SECTION 04 : FIVE SCENERIES STAGGERED (y: 3050 ~ 4150)
    // ════════════════════════════════════════════════════════════════════════
    const sec04 = figma.createFrame();
    sec04.name = "Section 04 : Five Sceneries Staggered Gallery (3000 - 4100px)";
    sec04.x = 48; sec04.y = 3050; sec04.resize(1824, 1100);
    sec04.fills = [{ type: 'SOLID', color: COLOR_SURFACE }];
    sec04.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sec04.strokeWeight = 1;
    sec04.layoutMode = "VERTICAL"; sec04.primaryAxisAlignItems = "SPACE_BETWEEN";
    sec04.paddingLeft = 40; sec04.paddingRight = 40; sec04.paddingTop = 40; sec04.paddingBottom = 40;
    root.appendChild(sec04);

    const s04Head = figma.createFrame(); s04Head.layoutMode = "HORIZONTAL"; s04Head.primaryAxisAlignItems = "SPACE_BETWEEN"; s04Head.layoutAlign = "STRETCH"; s04Head.fills = [];
    const s04Title = figma.createText(); s04Title.fontName = serifFont; s04Title.characters = "FIVE SCENERIES OF SOLACE"; s04Title.fontSize = 28; s04Title.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; s04Head.appendChild(s04Title);
    const s04Sub = figma.createText(); s04Sub.fontName = sansBold; s04Sub.characters = "PARALLAX STACKING CARDS"; s04Sub.fontSize = 11; s04Sub.fills = [{ type: 'SOLID', color: COLOR_RAIN }]; s04Head.appendChild(s04Sub);
    sec04.appendChild(s04Head);

    const posterRow = figma.createFrame();
    posterRow.name = "5 Posters Row";
    posterRow.layoutMode = "HORIZONTAL"; posterRow.itemSpacing = 20; posterRow.layoutAlign = "STRETCH";
    posterRow.primaryAxisAlignItems = "SPACE_BETWEEN"; posterRow.resize(1744, 750); posterRow.fills = [];

    const scenesV2 = [
      { num: "01", title: "비 온 뒤의 쉼", sub: "Petrichor & Clarity" },
      { num: "02", title: "즉흥적인 모험", sub: "The Sunset Horizon" },
      { num: "03", title: "질긴 생명력", sub: "Dandelion in Asphalt" },
      { num: "04", title: "아늑한 아틀리에", sub: "The Sunlit Workshop" },
      { num: "05", title: "궁극의 안식처", sub: "The Midnight Hearth" },
    ];

    scenesV2.forEach(s => {
      const p = figma.createFrame();
      p.resize(330, 750); p.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
      p.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; p.strokeWeight = 2;
      p.layoutMode = "VERTICAL"; p.primaryAxisAlignItems = "SPACE_BETWEEN";
      p.paddingLeft = 24; p.paddingRight = 24; p.paddingTop = 24; p.paddingBottom = 24;

      const pt = figma.createText(); pt.fontName = sansBold; pt.characters = `SCENE • ${s.num}`; pt.fontSize = 11; pt.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; p.appendChild(pt);
      const artP = figma.createFrame(); artP.resize(282, 380); artP.fills = [{ type: 'SOLID', color: COLOR_SURFACE }]; artP.strokes = [{ type: 'SOLID', color: COLOR_BORDER_SUBTLE }]; artP.strokeWeight = 1;
      const c = figma.createEllipse(); c.resize(120, 120); c.x = 81; c.y = 130; c.fills = []; c.strokes = [{ type: 'SOLID', color: COLOR_RAIN, opacity: 0.4 }]; c.strokeWeight = 2; artP.appendChild(c);
      p.appendChild(artP);

      const pb = figma.createFrame(); pb.layoutMode = "VERTICAL"; pb.itemSpacing = 4; pb.layoutAlign = "STRETCH"; pb.fills = [];
      const title = figma.createText(); title.fontName = serifFont; title.characters = s.title; title.fontSize = 22; title.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; pb.appendChild(title);
      const sub = figma.createText(); sub.fontName = sansMedium; sub.characters = s.sub; sub.fontSize = 10; sub.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; pb.appendChild(sub);
      p.appendChild(pb);

      posterRow.appendChild(p);
    });
    sec04.appendChild(posterRow);

    const s04Foot = figma.createFrame(); s04Foot.layoutMode = "HORIZONTAL"; s04Foot.layoutAlign = "STRETCH"; s04Foot.fills = [];
    const s04Article = figma.createText(); s04Article.fontName = sansRegular; s04Article.characters = "\"기계가 완벽해야 사람이 쉴 수 있다.\" — 스크롤에 따라 포스터가 부드럽게 크로스페이드됩니다.";
    s04Article.fontSize = 11; s04Article.fills = [{ type: 'SOLID', color: COLOR_TEXT_DIM }]; s04Foot.appendChild(s04Article);
    sec04.appendChild(s04Foot);

    // ════════════════════════════════════════════════════════════════════════
    // 🏛️ SECTION 05 : THE MASTER COLOPHON FINALE (y: 4150 ~ 5150)
    // ════════════════════════════════════════════════════════════════════════
    const sec05 = figma.createFrame();
    sec05.name = "Section 05 : The Colophon & Master Seal Finale (4100 - 5100px)";
    sec05.x = 48; sec05.y = 4150; sec05.resize(1824, 1000);
    sec05.fills = [{ type: 'SOLID', color: COLOR_CANVAS }];
    sec05.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; sec05.strokeWeight = 1;
    sec05.layoutMode = "VERTICAL"; sec05.primaryAxisAlignItems = "SPACE_BETWEEN"; sec05.counterAxisAlignItems = "CENTER";
    sec05.paddingLeft = 48; sec05.paddingRight = 48; sec05.paddingTop = 64; sec05.paddingBottom = 48;
    root.appendChild(sec05);

    const s05Center = figma.createFrame();
    s05Center.layoutMode = "VERTICAL"; s05Center.primaryAxisAlignItems = "CENTER"; s05Center.counterAxisAlignItems = "CENTER";
    s05Center.itemSpacing = 20; s05Center.resize(1000, 500); s05Center.fills = [];

    const sealR = figma.createEllipse();
    sealR.resize(240, 240); sealR.fills = [{ type: 'SOLID', color: COLOR_SURFACE }]; sealR.strokes = [{ type: 'SOLID', color: COLOR_GOLD }]; sealR.strokeWeight = 2;
    s05Center.appendChild(sealR);

    const fTitle = figma.createText(); fTitle.fontName = serifFont; fTitle.characters = "\"기계가 완벽해야 사람이 쉴 수 있다.\"";
    fTitle.fontSize = 36; fTitle.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; fTitle.textAutoResize = "WIDTH_AND_HEIGHT"; s05Center.appendChild(fTitle);

    const fEn = figma.createText(); fEn.fontName = serifMedium; fEn.characters = "When the machine is flawless, human soul finds its solace.";
    fEn.fontSize = 16; fEn.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; fEn.textAutoResize = "WIDTH_AND_HEIGHT"; s05Center.appendChild(fEn);

    const ctaRowV2 = figma.createFrame();
    ctaRowV2.layoutMode = "HORIZONTAL"; ctaRowV2.itemSpacing = 20; ctaRowV2.fills = [];
    const btn1 = figma.createFrame(); btn1.paddingLeft = 32; btn1.paddingRight = 32; btn1.paddingTop = 16; btn1.paddingBottom = 16;
    btn1.cornerRadius = 2; btn1.fills = [{ type: 'SOLID', color: COLOR_GOLD }];
    const b1t = figma.createText(); b1t.fontName = sansBold; b1t.characters = "ENTER THE ATELIER ➔"; b1t.fontSize = 12; b1t.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; b1t.textAutoResize = "WIDTH_AND_HEIGHT";
    btn1.appendChild(b1t); ctaRowV2.appendChild(btn1);

    const btn2 = figma.createFrame(); btn2.paddingLeft = 32; btn2.paddingRight = 32; btn2.paddingTop = 16; btn2.paddingBottom = 16;
    btn2.cornerRadius = 2; btn2.fills = [{ type: 'SOLID', color: COLOR_SURFACE }]; btn2.strokes = [{ type: 'SOLID', color: COLOR_BORDER }]; btn2.strokeWeight = 2;
    const b2t = figma.createText(); b2t.fontName = sansBold; b2t.characters = "EXPLORE GITHUB CODE"; b2t.fontSize = 12; b2t.fills = [{ type: 'SOLID', color: COLOR_TEXT_WHITE }]; b2t.textAutoResize = "WIDTH_AND_HEIGHT";
    btn2.appendChild(b2t); ctaRowV2.appendChild(btn2);
    s05Center.appendChild(ctaRowV2);

    sec05.appendChild(s05Center);

    const s05Foot = figma.createFrame();
    s05Foot.layoutMode = "HORIZONTAL"; s05Foot.primaryAxisAlignItems = "SPACE_BETWEEN"; s05Foot.layoutAlign = "STRETCH"; s05Foot.fills = [];
    const footLeft = figma.createText(); footLeft.fontName = sansRegular; footLeft.characters = "MINDULLE STUDIO • EST. 2026 • THE SOVEREIGN SOFTWARE ATELIER";
    footLeft.fontSize = 11; footLeft.fills = [{ type: 'SOLID', color: COLOR_TEXT_MUTED }]; s05Foot.appendChild(footLeft);
    const footRight = figma.createText(); footRight.fontName = sansBold; footRight.characters = "▲ BACK TO TOP (SMOOTH)";
    footRight.fontSize = 11; footRight.fills = [{ type: 'SOLID', color: COLOR_GOLD }]; s05Foot.appendChild(footRight);
    sec05.appendChild(s05Foot);

    // V2 뷰포트로 줌
    figma.viewport.scrollAndZoomIntoView([root]);
    figma.notify("🎬 [Option 2] 시네마틱 롱-스크롤 와이어프레임 생성 완료!");
    resolve();
  } catch (err) {
    console.error("V2 generation failed:", err);
    resolve();
  }
});
