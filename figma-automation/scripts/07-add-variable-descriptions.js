async function addVariableDescriptions() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  const descriptions = {
    "bg/base": "가장 바닥에 깔리는 도화지 (전체 화면 기본 배경)",
    "bg/surface": "바닥에서 1단계 돌출된 영역 (Input 폼, 카드, 패널 등)",
    "bg/elevated": "가장 높이 떠 있는 2단계 플로팅 영역 (모달 팝업, 툴팁, 드롭다운 메뉴)",
    "bg/overlay": "마우스 호버 시 덮이는 반투명 레이어",
    "border/default": "컴포넌트의 기본 테두리",
    "border/strong": "강조된 테두리 (Hover 등 상호작용 시)",
    "border/subtle": "그림자를 대신하는 아주 얇고 연한 테두리 (구분선 등)",
    "state/danger": "오류, 삭제, 실패 등 위험 상태 (기존 error 토큰 통합)",
    "state/danger-bg": "오류 상태 요소의 연한 배경",
    "state/info": "정보 및 안내 상태",
    "state/success": "성공 및 완료 상태",
    "state/warning": "경고 및 주의 상태"
  };
  let count = 0;
  for (const v of allVars) {
    if (v.variableCollectionId === colorsColl?.id && descriptions[v.name]) {
      v.description = descriptions[v.name]; count++;
    }
  }
}
addVariableDescriptions();
