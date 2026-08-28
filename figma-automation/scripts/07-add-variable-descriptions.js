async function addVariableDescriptions() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  if (!colorsColl) return console.error("❌ 'Colors' 컬렉션을 찾을 수 없습니다.");

  const allVars = await figma.variables.getLocalVariablesAsync();
  
  const descriptions = {
    // 1. 배경 (Background) - Elevation 3단계
    "bg/base": "가장 바닥에 깔리는 도화지 (전체 화면 기본 배경)",
    "bg/surface": "바닥에서 1단계 돌출된 영역 (Input 폼, 카드, 패널 등)",
    "bg/elevated": "가장 높이 떠 있는 2단계 플로팅 영역 (모달 팝업, 툴팁, 드롭다운 메뉴)",
    "bg/overlay": "마우스 호버 시 덮이는 반투명 레이어",
    
    // 2. 텍스트 (Text)
    "text/primary": "기본 본문 텍스트 (가장 높은 가독성)",
    "text/secondary": "보조 텍스트 (설명, 서브타이틀, 부가 정보)",
    "text/muted": "덜 중요한 텍스트 (Placeholder, 힌트, 비활성 느낌)",
    "text/disabled": "비활성화(Disabled) 상태의 텍스트",
    "text/inverse": "어두운 배경이나 칠해진 브랜드 컬러 위에 올라가는 텍스트",

    // 3. 테두리 (Border)
    "border/default": "컴포넌트의 기본 테두리",
    "border/strong": "강조된 테두리 (Hover, Focus 등 상호작용 시)",
    "border/subtle": "그림자를 대신하는 아주 얇고 연한 테두리 (구분선 등)",
    
    // 4. 브랜드 (Brand)
    "brand/primary": "Sonagi 브랜드 핵심 컬러 (메인 버튼, 활성화 요소)",
    "brand/primary-hover": "메인 브랜드 컬러의 마우스 호버 상태",
    "brand/accent": "브랜드 보조 강조 컬러 (포인트 요소)",
    "brand/accent-hover": "보조 강조 컬러의 마우스 호버 상태",

    // 5. 상태 (States) - Foreground
    "state/danger": "오류, 삭제, 실패 등 위험 상태 (기존 error 토큰 통합)",
    "state/info": "정보 및 일반 안내 상태",
    "state/success": "성공 및 완료 상태",
    "state/warning": "경고 및 주의 상태",

    // 6. 상태 (States) - Background
    "state/danger-bg": "위험/오류 상태 요소의 연한 배경 (뱃지, 알림창 등)",
    "state/info-bg": "정보 상태 요소의 연한 배경",
    "state/success-bg": "성공 상태 요소의 연한 배경",
    "state/warning-bg": "경고 상태 요소의 연한 배경"
  };

  let count = 0;
  for (const v of allVars) {
    if (v.variableCollectionId === colorsColl.id && descriptions[v.name]) {
      v.description = descriptions[v.name];
      count++;
    }
  }
  console.log(`✅ 완벽합니다! 총 ${count}개의 모든 주요 변수에 툴팁 메모를 주입했습니다!`);
}
addVariableDescriptions();
