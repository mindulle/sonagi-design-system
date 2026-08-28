(async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

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

  // 2. Data Display용 토큰 매핑
  const tokens = {
    AvatarBg: await getToken("Avatar/Surface/Bg", rgb(224, 231, 255)),
    AvatarText: await getToken("Avatar/Text/Color", rgb(67, 56, 202)),
    OnlineDot: await getToken("Avatar/Status/Online", rgb(34, 197, 94)),
    TooltipBg: await getToken("Tooltip/Surface/Bg", rgb(15, 23, 42)),
    TooltipText: await getToken("Tooltip/Text/Color", rgb(255, 255, 255)),
    ToastSuccessBg: await getToken("Toast/Success/Bg", rgb(240, 253, 244)),
    ToastSuccessBorder: await getToken("Toast/Success/Border", rgb(187, 247, 208)),
    ToastSuccessText: await getToken("Toast/Success/Text", rgb(22, 101, 52))
  };

  // -------------------------------------------------------------
  // A. Avatar Component Set (오토레이아웃 중앙 정렬로 x/y 오버라이드 에러 원천 차단)
  // -------------------------------------------------------------
  const baseAvatar = figma.createComponent();
  baseAvatar.name = "_base-avatar";
  baseAvatar.layoutMode = "HORIZONTAL";
  baseAvatar.primaryAxisSizingMode = "FIXED";
  baseAvatar.counterAxisSizingMode = "FIXED";
  baseAvatar.primaryAxisAlignItems = "CENTER";
  baseAvatar.counterAxisAlignItems = "CENTER";
  baseAvatar.resize(40, 40);
  baseAvatar.cornerRadius = 999;

  let avBg = { type: 'SOLID', color: rgb(0,0,0) };
  avBg = figma.variables.setBoundVariableForPaint(avBg, 'color', tokens.AvatarBg);
  baseAvatar.fills = [avBg];

  const avTextProp = baseAvatar.addComponentProperty('Initials', 'TEXT', 'JD');

  const avText = figma.createText();
  avText.name = "InitialsText";
  avText.fontName = { family: "Inter", style: "Bold" };
  avText.fontSize = 14;
  avText.characters = "JD";
  let avTxtPaint = { type: 'SOLID', color: rgb(0,0,0) };
  avTxtPaint = figma.variables.setBoundVariableForPaint(avTxtPaint, 'color', tokens.AvatarText);
  avText.fills = [avTxtPaint];
  baseAvatar.appendChild(avText);

  avText.componentPropertyReferences = { characters: avTextProp };

  const avSizes = ["Small", "Medium", "Large"];
  const avVariants = [];

  for (const size of avSizes) {
    const v = figma.createComponent();
    v.name = `Size=${size}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = baseAvatar.createInstance();

    if (size === "Small") {
      inst.resize(32, 32);
    } else if (size === "Medium") {
      inst.resize(40, 40);
    } else if (size === "Large") {
      inst.resize(48, 48);
    }

    v.appendChild(inst);
    avVariants.push(v);
  }

  const avSet = figma.combineAsVariants(avVariants, figma.currentPage);
  avSet.name = "Avatar (Pro Grid)";
  for (let col = 0; col < avSizes.length; col++) {
    avVariants[col].x = col * 70 + 20;
    avVariants[col].y = 20;
  }
  avSet.resize(3 * 70 + 20, 80);
  avSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  avSet.cornerRadius = 12;
  baseAvatar.y = -100;

  // -------------------------------------------------------------
  // B. Tooltip Component Set
  // -------------------------------------------------------------
  const baseTt = figma.createComponent();
  baseTt.name = "_base-tooltip";
  baseTt.layoutMode = "HORIZONTAL";
  baseTt.primaryAxisSizingMode = "AUTO";
  baseTt.counterAxisSizingMode = "AUTO";
  baseTt.paddingLeft = 12; baseTt.paddingRight = 12;
  baseTt.paddingTop = 6; baseTt.paddingBottom = 6;
  baseTt.cornerRadius = 6;

  let ttBg = { type: 'SOLID', color: rgb(0,0,0) };
  ttBg = figma.variables.setBoundVariableForPaint(ttBg, 'color', tokens.TooltipBg);
  baseTt.fills = [ttBg];

  const ttTextProp = baseTt.addComponentProperty('Text', 'TEXT', 'This is a tooltip');
  const ttText = figma.createText();
  ttText.name = "TooltipText";
  ttText.fontName = { family: "Inter", style: "Medium" };
  ttText.fontSize = 12;
  ttText.characters = "This is a tooltip";
  let ttTxtPaint = { type: 'SOLID', color: rgb(0,0,0) };
  ttTxtPaint = figma.variables.setBoundVariableForPaint(ttTxtPaint, 'color', tokens.TooltipText);
  ttText.fills = [ttTxtPaint];
  baseTt.appendChild(ttText);

  ttText.componentPropertyReferences = { characters: ttTextProp };

  const ttVariant = figma.createComponent();
  ttVariant.name = "Style=Dark";
  ttVariant.layoutMode = "HORIZONTAL";
  ttVariant.primaryAxisSizingMode = "AUTO";
  ttVariant.counterAxisSizingMode = "AUTO";
  ttVariant.fills = [];
  const instTt = baseTt.createInstance();
  ttVariant.appendChild(instTt);

  const ttSet = figma.combineAsVariants([ttVariant], figma.currentPage);
  ttSet.name = "Tooltip (Pro Grid)";
  ttVariant.x = 20; ttVariant.y = 20;
  ttSet.resize(180, 60);
  ttSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  ttSet.cornerRadius = 12;
  baseTt.y = -100;
  ttSet.y = 120;

  // -------------------------------------------------------------
  // C. Toast / Notification Component Set
  // -------------------------------------------------------------
  const baseToast = figma.createComponent();
  baseToast.name = "_base-toast";
  baseToast.layoutMode = "HORIZONTAL";
  baseToast.primaryAxisSizingMode = "AUTO";
  baseToast.counterAxisSizingMode = "AUTO";
  baseToast.counterAxisAlignItems = "CENTER";
  baseToast.paddingLeft = 16; baseToast.paddingRight = 16;
  baseToast.paddingTop = 12; baseToast.paddingBottom = 12;
  baseToast.cornerRadius = 8;
  baseToast.itemSpacing = 10;
  baseToast.strokeWeight = 1;

  let toastBg = { type: 'SOLID', color: rgb(0,0,0) };
  toastBg = figma.variables.setBoundVariableForPaint(toastBg, 'color', tokens.ToastSuccessBg);
  baseToast.fills = [toastBg];

  let toastBorder = { type: 'SOLID', color: rgb(0,0,0) };
  toastBorder = figma.variables.setBoundVariableForPaint(toastBorder, 'color', tokens.ToastSuccessBorder);
  baseToast.strokes = [toastBorder];

  const toastTextProp = baseToast.addComponentProperty('Message', 'TEXT', 'Changes saved successfully.');
  const toastText = figma.createText();
  toastText.name = "ToastText";
  toastText.fontName = { family: "Inter", style: "Medium" };
  toastText.fontSize = 14;
  toastText.characters = "Changes saved successfully.";
  let toastTxtPaint = { type: 'SOLID', color: rgb(0,0,0) };
  toastTxtPaint = figma.variables.setBoundVariableForPaint(toastTxtPaint, 'color', tokens.ToastSuccessText);
  toastText.fills = [toastTxtPaint];
  baseToast.appendChild(toastText);

  toastText.componentPropertyReferences = { characters: toastTextProp };

  const toastVariant = figma.createComponent();
  toastVariant.name = "Type=Success";
  toastVariant.layoutMode = "HORIZONTAL";
  toastVariant.primaryAxisSizingMode = "AUTO";
  toastVariant.counterAxisSizingMode = "AUTO";
  toastVariant.fills = [];
  const instToast = baseToast.createInstance();
  toastVariant.appendChild(instToast);

  const toastSet = figma.combineAsVariants([toastVariant], figma.currentPage);
  toastSet.name = "Toast / Notification (Pro Grid)";
  toastVariant.x = 20; toastVariant.y = 20;
  toastSet.resize(320, 70);
  toastSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  toastSet.cornerRadius = 12;
  baseToast.y = -100;
  toastSet.y = 210;

  figma.viewport.scrollAndZoomIntoView([avSet, ttSet, toastSet, baseAvatar, baseTt, baseToast]);
  console.log("🚀 [v1.1] Data Display (x/y 에러 수정 완료) 생성!");
})();