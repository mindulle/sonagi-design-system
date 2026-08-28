async function fillMissingDescriptions() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const colorsColl = collections.find(c => c.name === "Colors");
  const allVars = await figma.variables.getLocalVariablesAsync();
  
  const missingDescriptions = {
    "brand/secondary": "브랜드 보조 컬러 (Secondary 버튼, 취소/중립적 액션)",
    "brand/secondary-hover": "브랜드 보조 컬러의 마우스 호버 상태",
    "brand/secondary-active": "브랜드 보조 컬러의 클릭(Active) 상태",
    "brand/ink": "가장 짙은 브랜드 컬러 (브랜드 배경 위에서 강한 대비를 주는 텍스트용)",
    "state/danger-hover": "위험(Danger) 상태의 마우스 호버 색상",
    "state/danger-active": "위험(Danger) 상태의 클릭(Active) 색상",
    "state/disabled-bg": "비활성화(Disabled) 폼/버튼 요소의 배경색",
    "state/disabled-text": "비활성화(Disabled) 상태의 텍스트 및 아이콘 색상",
    "bg/inverse": "현재 테마와 반전되는 배경색 (라이트모드에서 다크한 토스트/툴팁 등 띄울 때)",
    "bg/accent-subtle": "보조 강조(Accent) 컬러의 연한 배경색",
    "text/accent": "보조 강조(Accent) 컬러가 적용된 텍스트"
  };

  for (const v of allVars) {
    if (v.variableCollectionId === colorsColl?.id && missingDescriptions[v.name]) {
      v.description = missingDescriptions[v.name];
    }
  }
}
fillMissingDescriptions();
