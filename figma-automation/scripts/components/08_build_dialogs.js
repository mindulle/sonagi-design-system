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

  // 2. Dialog용 토큰 매핑
  const tokens = {
    Bg: await getToken("Dialog/Surface/Bg", rgb(255, 255, 255)),
    Border: await getToken("Dialog/Surface/Border", rgb(226, 232, 240)),
    TitleText: await getToken("Dialog/Text/Title", rgb(15, 23, 42)),
    MessageText: await getToken("Dialog/Text/Message", rgb(71, 85, 105)),
    ConfirmBg: await getToken("Dialog/Button/ConfirmBg", rgb(25, 91, 255)),
    CancelBg: await getToken("Dialog/Button/CancelBg", rgb(241, 245, 249)),
    CancelText: await getToken("Dialog/Button/CancelText", rgb(71, 85, 105))
  };

  // 3. 마스터 뼈대 (_base-dialog) 생성
  const base = figma.createComponent();
  base.name = "_base-dialog";
  base.layoutMode = "VERTICAL";
  base.primaryAxisSizingMode = "AUTO";
  base.counterAxisSizingMode = "FIXED";
  base.resize(400, 220);
  base.paddingLeft = 24; base.paddingRight = 24;
  base.paddingTop = 24; base.paddingBottom = 24;
  base.cornerRadius = 16;
  base.itemSpacing = 20;

  // Component Properties 정의
  const titleProp = base.addComponentProperty('Title', 'TEXT', 'Dialog Title');
  const msgProp = base.addComponentProperty('Message', 'TEXT', 'Are you sure you want to proceed with this action? This step cannot be undone.');
  const confirmProp = base.addComponentProperty('ConfirmLabel', 'TEXT', 'Confirm');
  const cancelProp = base.addComponentProperty('CancelLabel', 'TEXT', 'Cancel');
  const showCancelProp = base.addComponentProperty('ShowCancel', 'BOOLEAN', true);

  // 3-A. Header Frame (SPACE_BETWEEN 양 끝 정렬)
  const headerFrame = figma.createFrame();
  headerFrame.name = "Header";
  headerFrame.layoutMode = "HORIZONTAL";
  headerFrame.primaryAxisSizingMode = "FIXED"; // [핵심 수정] 가로 너비 고정!
  headerFrame.counterAxisSizingMode = "AUTO";
  headerFrame.resize(352, 24); // 400 - 48 (양쪽 패딩 24*2)
  headerFrame.primaryAxisAlignItems = "SPACE_BETWEEN"; // [핵심 수정] 양 끝 정렬!
  headerFrame.counterAxisAlignItems = "CENTER";
  headerFrame.fills = [];

  const titleNode = figma.createText();
  titleNode.name = "TitleText";
  titleNode.fontName = { family: "Pretendard", style: "Bold" };
  titleNode.fontSize = 18;
  titleNode.characters = "Dialog Title";
  let tPaint = { type: 'SOLID', color: rgb(0,0,0) };
  tPaint = figma.variables.setBoundVariableForPaint(tPaint, 'color', tokens.TitleText);
  titleNode.fills = [tPaint];
  headerFrame.appendChild(titleNode);

  // Close X Vector Icon
  const closeIcon = figma.createVector();
  closeIcon.name = "CloseIcon";
  closeIcon.vectorPaths = [{
    data: "M 4 4 L 12 12 M 12 4 L 4 12",
    windingRule: "NONZERO"
  }];
  closeIcon.strokes = [{ type: 'SOLID', color: rgb(148, 163, 184) }];
  closeIcon.strokeWeight = 2;
  closeIcon.resize(16, 16);
  headerFrame.appendChild(closeIcon);

  base.appendChild(headerFrame);

  // 3-B. Body Frame
  const bodyFrame = figma.createFrame();
  bodyFrame.name = "Body";
  bodyFrame.layoutMode = "VERTICAL";
  bodyFrame.primaryAxisSizingMode = "AUTO";
  bodyFrame.counterAxisSizingMode = "FIXED";
  bodyFrame.resize(352, 40);
  bodyFrame.fills = [];

  const msgNode = figma.createText();
  msgNode.name = "MessageText";
  msgNode.fontName = { family: "Pretendard", style: "Regular" };
  msgNode.fontSize = 14;
  msgNode.characters = "Are you sure you want to proceed with this action? This step cannot be undone.";
  msgNode.textAutoResize = "HEIGHT"; // 가로 352px 안에서 줄바꿈
  msgNode.resize(352, 40);
  let mPaint = { type: 'SOLID', color: rgb(0,0,0) };
  mPaint = figma.variables.setBoundVariableForPaint(mPaint, 'color', tokens.MessageText);
  msgNode.fills = [mPaint];
  bodyFrame.appendChild(msgNode);

  base.appendChild(bodyFrame);

  // 3-C. Footer Frame (오른쪽 정렬)
  const footerFrame = figma.createFrame();
  footerFrame.name = "Footer";
  footerFrame.layoutMode = "HORIZONTAL";
  footerFrame.primaryAxisSizingMode = "FIXED";
  footerFrame.counterAxisSizingMode = "AUTO";
  footerFrame.resize(352, 40);
  footerFrame.primaryAxisAlignItems = "MAX"; // 오른쪽 정렬
  footerFrame.itemSpacing = 10;
  footerFrame.fills = [];

  // Cancel Button
  const cancelBtn = figma.createFrame();
  cancelBtn.name = "CancelBtn";
  cancelBtn.layoutMode = "HORIZONTAL";
  cancelBtn.primaryAxisSizingMode = "AUTO";
  cancelBtn.counterAxisSizingMode = "AUTO";
  cancelBtn.paddingLeft = 16; cancelBtn.paddingRight = 16;
  cancelBtn.paddingTop = 10; cancelBtn.paddingBottom = 10;
  cancelBtn.cornerRadius = 8;
  let cBg = { type: 'SOLID', color: rgb(0,0,0) };
  cBg = figma.variables.setBoundVariableForPaint(cBg, 'color', tokens.CancelBg);
  cancelBtn.fills = [cBg];

  const cancelTextNode = figma.createText();
  cancelTextNode.fontName = { family: "Pretendard", style: "Medium" };
  cancelTextNode.fontSize = 14;
  cancelTextNode.characters = "Cancel";
  let cTxtPaint = { type: 'SOLID', color: rgb(0,0,0) };
  cTxtPaint = figma.variables.setBoundVariableForPaint(cTxtPaint, 'color', tokens.CancelText);
  cancelTextNode.fills = [cTxtPaint];
  cancelBtn.appendChild(cancelTextNode);
  footerFrame.appendChild(cancelBtn);

  // Confirm Button
  const confirmBtn = figma.createFrame();
  confirmBtn.name = "ConfirmBtn";
  confirmBtn.layoutMode = "HORIZONTAL";
  confirmBtn.primaryAxisSizingMode = "AUTO";
  confirmBtn.counterAxisSizingMode = "AUTO";
  confirmBtn.paddingLeft = 16; confirmBtn.paddingRight = 16;
  confirmBtn.paddingTop = 10; confirmBtn.paddingBottom = 10;
  confirmBtn.cornerRadius = 8;
  let cfBg = { type: 'SOLID', color: rgb(0,0,0) };
  cfBg = figma.variables.setBoundVariableForPaint(cfBg, 'color', tokens.ConfirmBg);
  confirmBtn.fills = [cfBg];

  const confirmTextNode = figma.createText();
  confirmTextNode.fontName = { family: "Pretendard", style: "Medium" };
  confirmTextNode.fontSize = 14;
  confirmTextNode.characters = "Confirm";
  confirmTextNode.fills = [{ type: 'SOLID', color: rgb(255, 255, 255) }];
  confirmBtn.appendChild(confirmTextNode);
  footerFrame.appendChild(confirmBtn);

  base.appendChild(footerFrame);

  // PropertyReferences 연결
  titleNode.componentPropertyReferences = { characters: titleProp };
  msgNode.componentPropertyReferences = { characters: msgProp };
  confirmTextNode.componentPropertyReferences = { characters: confirmProp };
  cancelTextNode.componentPropertyReferences = { characters: cancelProp };
  cancelBtn.componentPropertyReferences = { visible: showCancelProp };

  // 4. Dialog Variants (Alert, Confirm, Modal)
  const types = ["Alert", "Confirm", "Modal"];
  const variants = [];

  for (const type of types) {
    const v = figma.createComponent();
    v.name = `Type=${type}`;
    v.layoutMode = "VERTICAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = base.createInstance();

    let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
    bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens.Bg);
    inst.fills = [bgPaint];

    let borderPaint = { type: 'SOLID', color: rgb(0,0,0) };
    borderPaint = figma.variables.setBoundVariableForPaint(borderPaint, 'color', tokens.Border);
    inst.strokes = [borderPaint];
    inst.strokeWeight = 1;
    inst.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.18 },
      offset: { x: 0, y: 16 },
      radius: 32,
      visible: true,
      blendMode: 'NORMAL'
    }];

    const instHeader = inst.children[0];
    const instCloseIcon = instHeader.children[1];
    const instFooter = inst.children[2];
    const instCancelBtn = instFooter.children[0];

    if (type === "Alert") {
      instCloseIcon.visible = false;
      instCancelBtn.visible = false;
    } else if (type === "Confirm") {
      instCloseIcon.visible = false;
      instCancelBtn.visible = true;
    } else if (type === "Modal") {
      instCloseIcon.visible = true;
      instCancelBtn.visible = true;
    }

    v.appendChild(inst);
    variants.push(v);
  }

  // 5. Component Set 결합 및 그리드 정렬
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Dialog / Overlay (Pro Grid)";

  for (let col = 0; col < types.length; col++) {
    variants[col].x = col * 440 + 30;
    variants[col].y = 30;
  }

  compSet.resize(3 * 440 + 40, 280);
  compSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  compSet.cornerRadius = 16;

  base.y = -350;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  console.log("🚀 [v1.2] Header FIXED 너비 + SPACE_BETWEEN 정렬 적용 완료!");
})();