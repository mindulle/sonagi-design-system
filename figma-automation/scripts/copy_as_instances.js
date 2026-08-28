// 복사할 라이트 모드 컴포넌트들을 먼저 선택한 상태에서 실행하세요.
const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("라이트 모드의 원본 컴포넌트들을 먼저 선택해주세요.");
} else {
  const instances = [];
  
  // 1. 선택된 요소들을 순회하며 인스턴스로 복사 (또는 단순 클론)
  for (const node of selection) {
    if (node.type === 'COMPONENT') {
      instances.push(node.createInstance());
    } else if (node.type === 'COMPONENT_SET') {
      instances.push(node.defaultVariant.createInstance());
    } else {
      // 컴포넌트가 아닌 일반 프레임/요소인 경우 단순 복제
      instances.push(node.clone());
    }
  }

  // 2. 2층위 오토레이아웃 프레임 생성 (배치용)
  const wrapperFrame = figma.createFrame();
  wrapperFrame.name = "Dark Mode Instances (Layout)";
  wrapperFrame.layoutMode = "VERTICAL"; // 수직 정렬
  wrapperFrame.primaryAxisSizingMode = "AUTO"; // Hug Content
  wrapperFrame.counterAxisSizingMode = "AUTO"; // Hug Content
  wrapperFrame.itemSpacing = 24; // 요소 간 간격 (8px 배수)
  wrapperFrame.paddingTop = 32;
  wrapperFrame.paddingBottom = 32;
  wrapperFrame.paddingLeft = 32;
  wrapperFrame.paddingRight = 32;
  wrapperFrame.fills = []; // 배경 투명하게
  
  // 3. 인스턴스들을 래퍼 프레임에 추가
  for (const inst of instances) {
    wrapperFrame.appendChild(inst);
  }

  // 4. 위치를 원본 우측에 배치
  const firstNode = selection[0];
  wrapperFrame.x = firstNode.x + firstNode.width + 120;
  wrapperFrame.y = firstNode.y;

  // 5. 캔버스에 추가 및 포커스
  figma.currentPage.appendChild(wrapperFrame);
  figma.currentPage.selection = [wrapperFrame];
  figma.viewport.scrollAndZoomIntoView([wrapperFrame]);
  
  figma.notify("인스턴스 복사 및 오토레이아웃 정렬 완료!");
}
