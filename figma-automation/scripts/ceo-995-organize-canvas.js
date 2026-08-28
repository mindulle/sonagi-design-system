(async () => {
  const page = figma.currentPage;

  // 1. 캔버스에 흩어진 주요 시스템 보드들 찾기
  const colorBoard = page.findOne(n => n.name.includes("V4 Architecture"));
  const typo = page.findOne(n => n.name.includes("Typography"));
  const shadow = page.findOne(n => n.name.includes("Shadow") || n.name.includes("Elevation"));
  const spacing = page.findOne(n => n.name.includes("Spacing"));
  const radius = page.findOne(n => n.name.includes("Radius"));
  const opacity = page.findOne(n => n.name.includes("Opacity"));

  if (!colorBoard) {
    return console.error("❌ 'V4 Architecture' 컬러 보드를 찾을 수 없습니다. (스크립트를 돌리지 않으셨거나 이름이 바뀌었을 수 있습니다)");
  }

  const metrics = [typo, shadow, spacing, radius, opacity].filter(Boolean); // 존재하는 것만 필터링

  if (metrics.length === 0) {
    console.warn("⚠️ 나머지 파운데이션 보드(Typography 등)를 찾을 수 없어 컬러 보드만 정리합니다.");
  }

  // 2. 우측 기둥(나머지 5개 보드)을 세로로 깔끔하게 묶어줄 오토레이아웃 프레임
  const rightColumn = figma.createFrame();
  rightColumn.name = "Foundation Metrics";
  rightColumn.layoutMode = "VERTICAL";
  rightColumn.itemSpacing = 80;
  rightColumn.fills = []; // 배경 투명
  
  // 흩어져 있던 보드들을 우측 기둥에 쏙쏙 넣기
  metrics.forEach(m => rightColumn.appendChild(m));

  // 3. 전체를 감싸는 최상단 마스터 캔버스 보드 생성
  const masterBoard = figma.createFrame();
  masterBoard.name = "✨ Sonagi Design System : Master Foundation";
  masterBoard.layoutMode = "HORIZONTAL";
  masterBoard.itemSpacing = 160; // 왼쪽(컬러)과 오른쪽(나머지) 사이의 넓은 간격
  masterBoard.paddingTop = 160; masterBoard.paddingBottom = 160;
  masterBoard.paddingLeft = 160; masterBoard.paddingRight = 160;
  masterBoard.cornerRadius = 64;
  masterBoard.fills = [{ type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.96} }]; // 아주 연한 스튜디오 벽면 느낌의 배경색

  // 좌측엔 컬러 보드, 우측엔 나머지 보드들 배치
  masterBoard.appendChild(colorBoard);
  if (metrics.length > 0) masterBoard.appendChild(rightColumn);

  // 캔버스 정중앙에 배치하고 화면 당기기
  page.appendChild(masterBoard);
  figma.viewport.scrollAndZoomIntoView([masterBoard]);

  console.log("🎉 파운데이션 캔버스 전체 정렬 완료! 실리콘밸리급 마스터 스티커 시트가 탄생했습니다.");
})();