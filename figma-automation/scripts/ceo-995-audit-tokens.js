(async () => {
  console.log("🔍 [Token Audit] 다크모드 색상 매핑 이상 점검을 시작합니다...");

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const semantic = collections.find(c => c.name === "Sonagi Color Tokens");
  
  if (!semantic) return console.error("❌ 'Sonagi Color Tokens' 컬렉션을 찾을 수 없습니다.");

  const lightModeId = semantic.modes.find(m => m.name.includes("Light")).modeId;
  const darkModeId = semantic.modes.find(m => m.name.includes("Dark")).modeId;

  // RGB를 보기 편한 HEX로 변환하는 함수
  const rgbToHex = ({r, g, b}) => {
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // 변수 값 해석 (Alias인 경우 원본 이름 반환, 아닐 경우 Hex 반환)
  const resolveValue = async (val) => {
    if (val === undefined || val === null) return "NULL";
    if (val.type === "VARIABLE_ALIAS") {
      try {
        const prim = await figma.variables.getVariableByIdAsync(val.id);
        return prim ? `🔗 ${prim.name.split('/').pop()}` : "🔗 Broken Alias";
      } catch(e) { return "🔗 Broken Alias"; }
    }
    return rgbToHex(val);
  };

  const results = [];
  let suspiciousCount = 0;

  console.log("⏳ 모든 시맨틱 토큰의 Light/Dark 값을 분석 중입니다...");

  for (const id of semantic.variableIds) {
    try {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (!v) continue;
      
      const lightVal = await resolveValue(v.valuesByMode[lightModeId]);
      const darkVal = await resolveValue(v.valuesByMode[darkModeId]);
      
      let isSuspicious = false;
      let note = "✅ 정상";
      
      // [이상 탐지 휴리스틱]
      // 1. 이름에 text나 inverse가 안 들어가는데 다크모드가 순백색(#FFFFFF)인 경우 (눈뽕 에러)
      if (darkVal === "#FFFFFF" && !v.name.includes("text") && !v.name.includes("inverse") && !v.name.includes("white")) {
        isSuspicious = true;
        note = "🚨 다크모드가 순백색임 (눈뽕 우려)";
      }
      // 2. 다크모드 값이 아예 없는 경우
      else if (darkVal === "NULL") {
        isSuspicious = true;
        note = "🚨 다크모드 값 누락";
      }
      // 3. 백그라운드인데 Light와 Dark가 동일한 밝은 색인 경우
      else if (lightVal === darkVal && v.name.includes("bg") && lightVal === "#FFFFFF") {
        isSuspicious = true;
        note = "⚠️ Light/Dark 값이 동일함 (다크모드 적용 안됨)";
      }

      if (isSuspicious) suspiciousCount++;

      results.push({
        "토큰 이름 (Token)": v.name,
        "☀️ Light 모드": lightVal,
        "🌙 Dark 모드": darkVal,
        "진단 결과": note
      });
    } catch(e) {}
  }

  // 콘솔에 예쁜 표 형태로 출력
  console.table(results);
  
  if (suspiciousCount > 0) {
    console.warn(`\n⚠️ 점검 결과: 다크모드 값이 비정상적으로 세팅된 토큰이 ${suspiciousCount}개 발견되었습니다. 위 표에서 '🚨' 표시를 확인해 주세요!`);
  } else {
    console.log("\n✨ 눈에 띄게 이상한 매핑(예: 잘못된 순백색 배경 등)은 발견되지 않았습니다. 파운데이션이 아주 건강합니다!");
  }
})();