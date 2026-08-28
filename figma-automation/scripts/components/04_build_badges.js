(async () => {
  await figma.loadFontAsync({ family: "Pretendard", style: "Medium" });

  // 1. 최신 Async 토큰(Variable) 헬퍼
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

  // 2. Badge용 10가지 토큰 매핑 (Subtle & Solid)
  const tokens = {
    Info: {
      SubtleBg: await getToken("Badge/Info/SubtleBg", rgb(235, 243, 255)),
      SubtleText: await getToken("Badge/Info/SubtleText", rgb(25, 91, 255)),
      SolidBg: await getToken("Badge/Info/SolidBg", rgb(25, 91, 255)),
      SolidText: await getToken("Badge/Info/SolidText", rgb(255, 255, 255))
    },
    Success: {
      SubtleBg: await getToken("Badge/Success/SubtleBg", rgb(234, 253, 241)),
      SubtleText: await getToken("Badge/Success/SubtleText", rgb(18, 183, 106)),
      SolidBg: await getToken("Badge/Success/SolidBg", rgb(18, 183, 106)),
      SolidText: await getToken("Badge/Success/SolidText", rgb(255, 255, 255))
    },
    Warning: {
      SubtleBg: await getToken("Badge/Warning/SubtleBg", rgb(255, 250, 235)),
      SubtleText: await getToken("Badge/Warning/SubtleText", rgb(247, 144, 9)),
      SolidBg: await getToken("Badge/Warning/SolidBg", rgb(247, 144, 9)),
      SolidText: await getToken("Badge/Warning/SolidText", rgb(255, 255, 255))
    },
    Danger: {
      SubtleBg: await getToken("Badge/Danger/SubtleBg", rgb(254, 243, 242)),
      SubtleText: await getToken("Badge/Danger/SubtleText", rgb(240, 68, 56)),
      SolidBg: await getToken("Badge/Danger/SolidBg", rgb(240, 68, 56)),
      SolidText: await getToken("Badge/Danger/SolidText", rgb(255, 255, 255))
    },
    Neutral: {
      SubtleBg: await getToken("Badge/Neutral/SubtleBg", rgb(242, 244, 247)),
      SubtleText: await getToken("Badge/Neutral/SubtleText", rgb(52, 64, 84)),
      SolidBg: await getToken("Badge/Neutral/SolidBg", rgb(52, 64, 84)),
      SolidText: await getToken("Badge/Neutral/SolidText", rgb(255, 255, 255))
    }
  };

  // 3. 마스터 뼈대 (_base-badge) 생성
  const base = figma.createComponent();
  base.name = "_base-badge";
  base.layoutMode = "HORIZONTAL";
  base.primaryAxisSizingMode = "AUTO";
  base.counterAxisSizingMode = "AUTO";
  base.counterAxisAlignItems = "CENTER"; // 중앙 정렬
  base.paddingLeft = 10; base.paddingRight = 10;
  base.paddingTop = 4; base.paddingBottom = 4;
  base.cornerRadius = 999; // Pill 형태
  base.itemSpacing = 6;

  // Component Properties 정의 (Text + Boolean Dot)
  const labelPropName = base.addComponentProperty('Label', 'TEXT', 'Badge');
  const showDotPropName = base.addComponentProperty('ShowDot', 'BOOLEAN', true);

  // Status Dot (원형 보조 아이콘)
  const dot = figma.createEllipse();
  dot.name = "Dot";
  dot.resize(6, 6);
  base.appendChild(dot);
  dot.componentPropertyReferences = { visible: showDotPropName };

  // Badge Text
  const text = figma.createText();
  text.fontName = { family: "Pretendard", style: "Medium" };
  text.fontSize = 12;
  text.characters = "Badge";
  base.appendChild(text);
  text.componentPropertyReferences = { characters: labelPropName };

  // 4. Variant 생성 루프 (5종 Type x 2종 VariantStyle = 10종)
  const types = ["Info", "Success", "Warning", "Danger", "Neutral"];
  const styles = ["Subtle", "Solid"];
  const variants = [];

  for (const style of styles) {
    for (const type of types) {
      const variant = figma.createComponent();
      variant.name = `Type=${type}, Style=${style}`;
      variant.layoutMode = "HORIZONTAL";
      variant.primaryAxisSizingMode = "AUTO";
      variant.counterAxisSizingMode = "AUTO";
      variant.fills = [];

      const inst = base.createInstance();
      const bgTokenKey = `${style}Bg`;
      const textTokenKey = `${style}Text`;

      // 배경색 토큰 바인딩
      let bgPaint = { type: 'SOLID', color: rgb(0,0,0) };
      bgPaint = figma.variables.setBoundVariableForPaint(bgPaint, 'color', tokens[type][bgTokenKey]);
      inst.fills = [bgPaint];

      // Dot 원형 색상 바인딩 (Dot 레이어 = children[0])
      const dotNode = inst.children[0];
      let dotPaint = { type: 'SOLID', color: rgb(0,0,0) };
      dotPaint = figma.variables.setBoundVariableForPaint(dotPaint, 'color', tokens[type][textTokenKey]);
      dotNode.fills = [dotPaint];

      // 텍스트 색상 바인딩 (Text 레이어 = children[1])
      const textNode = inst.children[1];
      let txtPaint = { type: 'SOLID', color: rgb(0,0,0) };
      txtPaint = figma.variables.setBoundVariableForPaint(txtPaint, 'color', tokens[type][textTokenKey]);
      textNode.fills = [txtPaint];

      variant.appendChild(inst);
      variants.push(variant);
    }
  }

  // 5. Component Set 결합
  const compSet = figma.combineAsVariants(variants, figma.currentPage);
  compSet.name = "Badge (Pro Grid)";

  // 6. 2행 5열 2D 그리드 정렬 (Sticker Sheet)
  let i = 0;
  for (let row = 0; row < styles.length; row++) {
    for (let col = 0; col < types.length; col++) {
      variants[i].x = col * 120 + 30;
      variants[i].y = row * 60 + 30;
      i++;
    }
  }

  compSet.resize(5 * 120 + 40, 2 * 60 + 40);
  compSet.fills = [{ type: 'SOLID', color: rgb(248, 249, 252), opacity: 0.8 }];
  compSet.cornerRadius = 16;

  base.y = -100;
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  console.log("🚀 [v1.0] Badges & Status 10종 컴포넌트 셋 자동 생성 완료!");
})();