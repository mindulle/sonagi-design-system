(async () => {
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });
  await figma.loadFontAsync({ family: "Pretendard", style: "Bold" });

  // 1. 최신 Async 토큰 헬퍼
  async function getToken(name, rgbColor) {
    let vars = await figma.variables.getLocalVariablesAsync("COLOR");
    let v = vars.find(v => v.name === name);
    if (!v) {
      let collections = await figma.variables.getLocalVariableCollectionsAsync();
      let collection = collections.length > 0 ? collections[0] : figma.variables.createVariableCollection("Sonagi Tokens");
      v = figma.variables.createVariable(name, collection, "COLOR");
      v.setValueForMode(collection.defaultModeId, rgbColor);
    }
    return v;
  }
  const rgb = (r, g, b) => ({ r: r/255, g: g/255, b: b/255 });

  // 2. Card용 토큰 매핑
  const tokens = {
    Bg: await getToken("Card/Surface/Bg", rgb(255, 255, 255)),
    Border: await getToken("Card/Surface/Border", rgb(226, 232, 240)),
    TitleText: await getToken("Card/Text/Title", rgb(15, 23, 42)),
    SubtitleText: await getToken("Card/Text/Subtitle", rgb(100, 116, 139)),
    BodyText: await getToken("Card/Text/Body", rgb(51, 65, 85))
  };

  // 3. 마스터 뼈대 (_base-card) 생성 - 2층위 Vertical 오토레이아웃
  const base = figma.createComponent();
  base.name = "_base-card";
  base.layoutMode = "VERTICAL";
  base.primaryAxisSizingMode = "AUTO"; // 세로 Hug Content
  base.counterAxisSizingMode = "FIXED"; // 가로 320px 고정
  base.resize(320, 200);
  base.paddingLeft = 20; base.paddingRight = 20;
  base.paddingTop = 20; base.paddingBottom = 20;
  base.cornerRadius = 16;
  base.itemSpacing = 16;

  // Component Properties 정의
  const titleProp = base.addComponentProperty('Title', 'TEXT', 'Card Title');
  const subTitleProp = base.addComponentProperty('Subtitle', 'TEXT', 'Card description and details go here.');
  const showHeaderProp = base.addComponentProperty('ShowHeader', 'BOOLEAN', true);
  const showFooterProp = base.addComponentProperty('ShowFooter', 'BOOLEAN', true);

  // 3-A. Header Frame (Vertical, Stretch Width)
  const headerFrame = figma.createFrame();
  headerFrame.name = "Header";
  headerFrame.layoutMode = "VERTICAL";
  headerFrame.primaryAxisSizingMode = "AUTO";
  headerFrame.counterAxisSizingMode = "AUTO";
  headerFrame.layoutAlign = "STRETCH"; // 부모 너비 채우기
  headerFrame.itemSpacing = 4;
  headerFrame.fills = [];

  const titleNode = figma.createText();
  titleNode.name = "TitleText";
  titleNode.fontName = { family: "Pretendard", style: "Bold" };
  titleNode.fontSize = 18;
  titleNode.characters = "Card Title";
  let tPaint = { type: 'SOLID', color: rgb(0,0,0) };
  tPaint = figma.variables.setBoundVariableForPaint(tPaint, 'color', tokens.TitleText);
  titleNode.fills = [tPaint];
  headerFrame.appendChild(titleNode);

  const subNode = figma.createText();
  subNode.name = "SubtitleText";
  subNode.fontName = { family: "Pretendard", style: "Regular" };
  subNode.fontSize = 13;
  subNode.characters = "Card description and details go here.";
  let subPaint = { type: 'SOLID', color: rgb(0,0,0) };
  subPaint = figma.variables.setBoundVariableForPaint(subPaint, 'color', tokens.SubtitleText);
  subNode.fills = [subPaint];
  headerFrame.appendChild(subNode);

  base.appendChild(headerFrame);

  // 3-B. Body Frame (Content Area, Stretch Width)
  const bodyFrame = figma.createFrame();
  bodyFrame.name = "Body";
  bodyFrame.layoutMode = "VERTICAL";
  bodyFrame.primaryAxisSizingMode = "AUTO";
  bodyFrame.counterAxisSizingMode = "AUTO";
  bodyFrame.layoutAlign = "STRETCH"; // 부모 너비 채우기
  bodyFrame.paddingLeft = 14; bodyFrame.paddingRight = 14;
  bodyFrame.paddingTop = 12; bodyFrame.paddingBottom = 12;
  bodyFrame.cornerRadius = 8;
  bodyFrame.fills = [{ type: 'SOLID', color: rgb(248, 250, 252) }];

  const bodyText = figma.createText();
  bodyText.name = "BodyText";
  bodyText.fontName = { family: "Pretendard", style: "Regular" };
  bodyText.fontSize = 13;
  bodyText.characters = "This is the main body container for card content.";
  let bPaint = { type: 'SOLID', color: rgb(0,0,0) };
  bPaint = figma.variables.setBoundVariableForPaint(bPaint, 'color', tokens.BodyText);
  bodyText.fills = [bPaint];
  bodyFrame.appendChild(bodyText);

  base.appendChild(bodyFrame);

  // 3-C. Footer Frame (Action Buttons, Stretch Width)
  const footerFrame = figma.createFrame();
  footerFrame.name = "Footer";
  footerFrame.layoutMode = "HORIZONTAL";
  footerFrame.primaryAxisSizingMode = "AUTO";
  footerFrame.counterAxisSizingMode = "AUTO";
  footerFrame.layoutAlign = "STRETCH"; // 부모 너비 채우기
  footerFrame.itemSpacing = 8;
  footerFrame.fills = [];

  // Action Button 1 (Confirm) - Hug Content 설정!
  const btn1 = figma.createFrame();
  btn1.name = "ConfirmBtn";
  btn1.layoutMode = "HORIZONTAL";
  btn1.primaryAxisSizingMode = "AUTO";   // 너비 Hug
  btn1.counterAxisSizingMode = "AUTO";   // [핵심 수정] 높이 Hug!
  btn1.paddingLeft = 14; btn1.paddingRight = 14;
  btn1.paddingTop = 8; btn1.paddingBottom = 8;
  btn1.cornerRadius = 6;
  btn1.fills = [{ type: 'SOLID', color: rgb(25, 91, 255) }];

  const btn1Text = figma.createText();
  btn1Text.fontName = { family: "Pretendard", style: "Medium" };
  btn1Text.fontSize = 12;
  btn1Text.characters = "Confirm";
  btn1Text.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
  btn1.appendChild(btn1Text);
  footerFrame.appendChild(btn1);

  // Action Button 2 (Cancel) - Hug Content 설정!
  const btn2 = figma.createFrame();
  btn2.name = "CancelBtn";
  btn2.layoutMode = "HORIZONTAL";
  btn2.primaryAxisSizingMode = "AUTO";   // 너비 Hug
  btn2.counterAxisSizingMode = "AUTO";   // [핵심 수정] 높이 Hug!
  btn2.paddingLeft = 14; btn2.paddingRight = 14;
  btn2.paddingTop = 8; btn2.paddingBottom = 8;
  btn2.cornerRadius = 6;
  btn2.fills = [{ type: 'SOLID', color: rgb(241, 245, 249) }];

  const btn2Text = figma.createText();
  btn2Text.fontName = { family: "Pretendard", style: "Medium" };
  btn2Text.fontSize = 12;
  btn2Text.characters = "Cancel";
  btn2Text.fills = [{ type: 'SOLID', color: rgb(71, 85, 105) }];
  btn2.appendChild(btn2Text);
  footerFrame.appendChild(btn2);

  base.appendChild(footerFrame);

  // PropertyReferences 연결
  titleNode.componentPropertyReferences = { characters: titleProp };
  subNode.componentPropertyReferences = { characters: subTitleProp };
  headerFrame.componentPropertyReferences = { visible: showHeaderProp };
  footerFrame.componentPropertyReferences = { visible: showFooterProp };

  // 4. Card Variants (Flat, Raised, Floating)
  const styles = ["Flat", "Raised", "Floating"];
  const variants = [];

  for (const style of styles) {
    const v = figma.createComponent();
    v.name = `Style=${style}`;
    v.layoutMode = "VERTICAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = base.createInstance();

    let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
    bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens.Bg);
    inst.fills = [bgPaint];

    if (style === "Flat") {
      let borderPaint = { type: 'SOLID', color: rgb(0,0,0) };
      borderPaint = figma.variables.setBoundVariableForPaint(borderPaint, 'color', tokens.Border);
      inst.strokes = [borderPaint];
      inst.strokeWeight = 1;
      inst.effects = [];
    } else if (style === "Raised") {
      inst.strokes = [];
      inst.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.08 },
        offset: { x: 0, y: 4 },
        radius: 12,
        visible: true,
        blendMode: 'NORMAL'
      }];
    } else if (style === "Floating") {
      let borderPaint = { type: 'SOLID', color: rgb(0,0,0) };
      borderPaint = figma.variables.setBoundVariableForPaint(borderPaint, 'color', tokens.Border);
      inst.strokes = [borderPaint];
      inst.strokeWeight = 1;
      inst.effects = [{
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.15 },
        offset: { x: 0, y: 12 },
        radius: 24,
        visible: true,
        blendMode: 'NORMAL'
      }];
    }

    v.appendChild(inst);
    variants.push(v);
  }

  // 5. Component Set 결합 및 그리드 정렬
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Card / Container (Pro Grid)";

  for (let col = 0; col < styles.length; col++) {
    variants[col].x = col * 360 + 30;
    variants[col].y = 30;
  }

  compSet.resize(3 * 360 + 40, 260);
  compSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  compSet.cornerRadius = 16;

  base.y = -300;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  console.log("🚀 [v1.1] Card 삐져나옴 버그 수정 완료!");
})();