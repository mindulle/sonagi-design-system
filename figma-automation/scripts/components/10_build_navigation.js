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

  // 2. Navigation용 토큰 매핑
  const tokens = {
    TabActiveText: await getToken("Nav/Tab/ActiveText", rgb(25, 91, 255)),
    TabDefaultText: await getToken("Nav/Tab/DefaultText", rgb(100, 116, 139)),
    TabActiveLine: await getToken("Nav/Tab/ActiveLine", rgb(25, 91, 255)),
    PageSelectedBg: await getToken("Nav/Page/SelectedBg", rgb(25, 91, 255)),
    PageSelectedText: await getToken("Nav/Page/SelectedText", rgb(255, 255, 255)),
    PageDefaultText: await getToken("Nav/Page/DefaultText", rgb(71, 85, 105)),
    BreadcrumbText: await getToken("Nav/Breadcrumb/Text", rgb(100, 116, 139)),
    BreadcrumbActive: await getToken("Nav/Breadcrumb/Active", rgb(15, 23, 42))
  };

  // -------------------------------------------------------------
  // A. Tab Item Component Set
  // -------------------------------------------------------------
  const baseTab = figma.createComponent();
  baseTab.name = "_base-tab";
  baseTab.layoutMode = "VERTICAL";
  baseTab.primaryAxisSizingMode = "AUTO";
  baseTab.counterAxisSizingMode = "AUTO";
  baseTab.counterAxisAlignItems = "CENTER";
  baseTab.itemSpacing = 8;
  baseTab.paddingLeft = 16; baseTab.paddingRight = 16;
  baseTab.paddingTop = 10; baseTab.paddingBottom = 0;

  const tabTextProp = baseTab.addComponentProperty('Label', 'TEXT', 'Tab Item');

  const tabText = figma.createText();
  tabText.name = "TabText";
  tabText.fontName = { family: "Pretendard", style: "Medium" };
  tabText.fontSize = 14;
  tabText.characters = "Tab Item";
  baseTab.appendChild(tabText);

  // Active Line Indicator (2px 하단 바)
  const tabLine = figma.createFrame();
  tabLine.name = "IndicatorLine";
  tabLine.resize(60, 2);
  tabLine.layoutAlign = "STRETCH";
  let linePaint = { type: 'SOLID', color: rgb(0,0,0) };
  linePaint = figma.variables.setBoundVariableForPaint(linePaint, 'color', tokens.TabActiveLine);
  tabLine.fills = [linePaint];
  baseTab.appendChild(tabLine);

  tabText.componentPropertyReferences = { characters: tabTextProp };

  const tabStates = ["Default", "Active"];
  const tabVariants = [];

  for (const state of tabStates) {
    const v = figma.createComponent();
    v.name = `State=${state}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = baseTab.createInstance();
    const instText = inst.children[0];
    const instLine = inst.children[1];

    if (state === "Default") {
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.TabDefaultText);
      instText.fills = [txtPaint];
      instLine.visible = false;
    } else if (state === "Active") {
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.TabActiveText);
      instText.fills = [txtPaint];
      instLine.visible = true;
    }

    v.appendChild(inst);
    tabVariants.push(v);
  }

  const tabSet = figma.combineAsVariants(tabVariants, figma.currentPage);
  tabSet.name = "Tab Item (Pro Grid)";
  for (let col = 0; col < tabStates.length; col++) {
    tabVariants[col].x = col * 120 + 20;
    tabVariants[col].y = 20;
  }
  tabSet.resize(2 * 120 + 20, 60);
  tabSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  tabSet.cornerRadius = 12;
  baseTab.y = -100;

  // -------------------------------------------------------------
  // B. Pagination Button Component Set
  // -------------------------------------------------------------
  const basePage = figma.createComponent();
  basePage.name = "_base-page";
  basePage.layoutMode = "HORIZONTAL";
  basePage.primaryAxisSizingMode = "FIXED";
  basePage.counterAxisSizingMode = "FIXED";
  basePage.primaryAxisAlignItems = "CENTER";
  basePage.counterAxisAlignItems = "CENTER";
  basePage.resize(36, 36);
  basePage.cornerRadius = 8;

  const pageTextProp = basePage.addComponentProperty('PageNumber', 'TEXT', '1');

  const pageText = figma.createText();
  pageText.name = "PageText";
  pageText.fontName = { family: "Pretendard", style: "Medium" };
  pageText.fontSize = 14;
  pageText.characters = "1";
  basePage.appendChild(pageText);

  pageText.componentPropertyReferences = { characters: pageTextProp };

  const pageStates = ["Default", "Selected"];
  const pageVariants = [];

  for (const state of pageStates) {
    const v = figma.createComponent();
    v.name = `State=${state}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = basePage.createInstance();
    const instText = inst.children[0];

    if (state === "Default") {
      inst.fills = [];
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.PageDefaultText);
      instText.fills = [txtPaint];
    } else if (state === "Selected") {
      let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
      bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens.PageSelectedBg);
      inst.fills = [bgPaint];

      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.PageSelectedText);
      instText.fills = [txtPaint];
    }

    v.appendChild(inst);
    pageVariants.push(v);
  }

  const pageSet = figma.combineAsVariants(pageVariants, figma.currentPage);
  pageSet.name = "Pagination Item (Pro Grid)";
  for (let col = 0; col < pageStates.length; col++) {
    pageVariants[col].x = col * 80 + 20;
    pageVariants[col].y = 20;
  }
  pageSet.resize(2 * 80 + 20, 60);
  pageSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  pageSet.cornerRadius = 12;
  basePage.y = -100;
  pageSet.y = 120;

  // -------------------------------------------------------------
  // C. Breadcrumbs Component Set
  // -------------------------------------------------------------
  const baseBc = figma.createComponent();
  baseBc.name = "_base-breadcrumb";
  baseBc.layoutMode = "HORIZONTAL";
  baseBc.primaryAxisSizingMode = "AUTO";
  baseBc.counterAxisSizingMode = "AUTO";
  baseBc.counterAxisAlignItems = "CENTER";
  baseBc.itemSpacing = 8;

  const bcLabelProp = baseBc.addComponentProperty('Label', 'TEXT', 'Home');

  const bcText = figma.createText();
  bcText.name = "BcText";
  bcText.fontName = { family: "Pretendard", style: "Medium" };
  bcText.fontSize = 14;
  bcText.characters = "Home";
  let bcPaint = { type: 'SOLID', color: rgb(0,0,0) };
  bcPaint = figma.variables.setBoundVariableForPaint(bcPaint, 'color', tokens.BreadcrumbText);
  bcText.fills = [bcPaint];
  baseBc.appendChild(bcText);

  // Slash Separator /
  const slash = figma.createText();
  slash.name = "Slash";
  slash.fontName = { family: "Pretendard", style: "Regular" };
  slash.fontSize = 14;
  slash.characters = "/";
  let slashPaint = { type: 'SOLID', color: rgb(148, 163, 184) };
  slash.fills = [slashPaint];
  baseBc.appendChild(slash);

  bcText.componentPropertyReferences = { characters: bcLabelProp };

  const bcStates = ["Default", "Current"];
  const bcVariants = [];

  for (const state of bcStates) {
    const v = figma.createComponent();
    v.name = `State=${state}`;
    v.layoutMode = "HORIZONTAL";
    v.primaryAxisSizingMode = "AUTO";
    v.counterAxisSizingMode = "AUTO";
    v.fills = [];

    const inst = baseBc.createInstance();
    const instText = inst.children[0];
    const instSlash = inst.children[1];

    if (state === "Default") {
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.BreadcrumbText);
      instText.fills = [txtPaint];
      instSlash.visible = true;
    } else if (state === "Current") {
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens.BreadcrumbActive);
      instText.fills = [txtPaint];
      instSlash.visible = false; // 현재 페이지는 슬래시 구분자 제거
    }

    v.appendChild(inst);
    bcVariants.push(v);
  }

  const bcSet = figma.combineAsVariants(bcVariants, figma.currentPage);
  bcSet.name = "Breadcrumb Item (Pro Grid)";
  for (let col = 0; col < bcStates.length; col++) {
    bcVariants[col].x = col * 120 + 20;
    bcVariants[col].y = 20;
  }
  bcSet.resize(2 * 120 + 20, 60);
  bcSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  bcSet.cornerRadius = 12;
  baseBc.y = -100;
  bcSet.y = 210;

  figma.viewport.scrollAndZoomIntoView([tabSet, pageSet, bcSet, baseTab, basePage, baseBc]);
  console.log("🎉 🎉 🎉 [v1.0] Navigation (Tabs, Pagination, Breadcrumbs) 및 전체 시스템 구축 완료!");
})();