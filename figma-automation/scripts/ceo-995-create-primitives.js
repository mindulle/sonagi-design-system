(async () => {
  console.log("🎨 Primitive Colors (원시 컬러 파레트) 생성을 시작합니다...");
  
  // 1. 기존 컬렉션 확인 및 생성
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  let primitiveCollection = collections.find(c => c.name === "Primitive Colors");
  
  if (primitiveCollection) {
    console.log("⚠️ 'Primitive Colors' 컬렉션이 이미 존재합니다. 누락된 변수만 추가합니다.");
  } else {
    primitiveCollection = figma.variables.createVariableCollection("Primitive Colors");
    console.log("✅ 'Primitive Colors' 컬렉션을 새로 생성했습니다.");
  }

  const defaultModeId = primitiveCollection.modes[0].modeId;

  // HEX -> RGB 변환 헬퍼 함수 (Figma API는 0~1 사이의 RGB 값을 사용)
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16) / 255,
      g: parseInt(h.substring(2, 4), 16) / 255,
      b: parseInt(h.substring(4, 6), 16) / 255
    };
  };

  // 2. 글로벌 표준 팔레트 정의 (업계 표준인 50~900 스케일 적용)
  const colorPalette = {
    gray: { 50:"#F9FAFB", 100:"#F3F4F6", 200:"#E5E7EB", 300:"#D1D5DB", 400:"#9CA3AF", 500:"#6B7280", 600:"#4B5563", 700:"#374151", 800:"#1F2937", 900:"#111827", 950:"#030712" },
    blue: { 50:"#EFF6FF", 100:"#DBEAFE", 200:"#BFDBFE", 300:"#93C5FD", 400:"#60A5FA", 500:"#3B82F6", 600:"#2563EB", 700:"#1D4ED8", 800:"#1E40AF", 900:"#1E3A8A", 950:"#172554" },
    red: { 50:"#FEF2F2", 100:"#FEE2E2", 200:"#FECACA", 300:"#FCA5A5", 400:"#F87171", 500:"#EF4444", 600:"#DC2626", 700:"#B91C1C", 800:"#991B1B", 900:"#7F1D1D", 950:"#450A0A" },
    green: { 50:"#F0FDF4", 100:"#DCFCE7", 200:"#BBF7D0", 300:"#86EFAC", 400:"#4ADE80", 500:"#22C55E", 600:"#16A34A", 700:"#15803D", 800:"#166534", 900:"#14532D", 950:"#052E16" },
    orange: { 50:"#FFF7ED", 100:"#FFEDD5", 200:"#FED7AA", 300:"#FDBA74", 400:"#FB923C", 500:"#F97316", 600:"#EA580C", 700:"#C2410C", 800:"#9A3412", 900:"#7C2D12", 950:"#431407" },
    base: { white: "#FFFFFF", black: "#000000" }
  };

  // 3. 컬렉션 내 기존 변수 목록 가져오기 (중복 체크용)
  let existingVariables = [];
  try {
    existingVariables = await figma.variables.getLocalVariablesAsync({ collectionId: primitiveCollection.id });
  } catch(e) {
    console.warn("기존 변수를 불러오는 데 실패했으나, 무시하고 진행합니다.");
  }

  // 4. 변수 주입 (Figma UI에서 폴더로 자동 분류되도록 '/' 슬래시 사용)
  let addedCount = 0;
  for (const [colorName, scales] of Object.entries(colorPalette)) {
    for (const [step, hex] of Object.entries(scales)) {
      
      const varName = colorName === "base" ? `base/${step}` : `${colorName}/${step}`;
      const isExist = existingVariables.some(v => v.name === varName);

      if (!isExist) {
         try {
           const newVar = figma.variables.createVariable(varName, primitiveCollection.id, "COLOR");
           newVar.setValueForMode(defaultModeId, hexToRgb(hex));
           addedCount++;
         } catch (e) {
           console.error(`❌ 변수 생성 실패 (${varName}):`, e);
         }
      }
    }
  }
  
  console.log(`\n🎉 1단계 공사 완료! 총 ${addedCount}개의 원시 컬러 토큰이 'Primitive Colors' 컬렉션에 추가되었습니다.`);
  console.log("Figma의 [Local Variables] 창 좌측 상단의 드롭다운을 눌러 'Primitive Colors' 컬렉션이 잘 생겼는지 확인해 보세요!");
})();