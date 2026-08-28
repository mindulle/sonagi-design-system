// 컴포넌트 셋을 포함한 라이트 모드 요소들을 다중 선택한 후 실행하세요.
const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("라이트 모드의 컴포넌트 또는 컴포넌트 셋을 먼저 선택해주세요.");
} else {
  // 전체를 감싸는 2층위 최상단 오토레이아웃 프레임
  const mainWrapper = figma.createFrame();
  mainWrapper.name = "Dark Mode Instances (Layout)";
  mainWrapper.layoutMode = "VERTICAL";
  mainWrapper.primaryAxisSizingMode = "AUTO";
  mainWrapper.counterAxisSizingMode = "AUTO";
  mainWrapper.itemSpacing = 48; // 셋/컴포넌트 간 큰 간격
  mainWrapper.paddingTop = 32;
  mainWrapper.paddingBottom = 32;
  mainWrapper.paddingLeft = 32;
  mainWrapper.paddingRight = 32;
  mainWrapper.fills = [];
  
  for (const node of selection) {
    if (node.type === 'COMPONENT_SET') {
      // 컴포넌트 셋인 경우: 내부의 모든 배리언트를 담을 서브 래퍼 생성
      const setWrapper = figma.createFrame();
      setWrapper.name = `${node.name} (Variants)`;
      setWrapper.layoutMode = "HORIZONTAL"; // 배리언트는 가로로 나열
      setWrapper.layoutWrap = "WRAP"; // 넘치면 줄바꿈 처리
      setWrapper.primaryAxisSizingMode = "AUTO";
      setWrapper.counterAxisSizingMode = "AUTO";
      setWrapper.itemSpacing = 24;
      setWrapper.counterAxisSpacing = 24;
      setWrapper.fills = [];
      
      // 컴포넌트 셋 내부의 모든 배리언트(COMPONENT)를 순회하며 인스턴스화
      for (const variant of node.children) {
        if (variant.type === 'COMPONENT') {
          setWrapper.appendChild(variant.createInstance());
        }
      }
      mainWrapper.appendChild(setWrapper);
      
    } else if (node.type === 'COMPONENT') {
      // 단일 컴포넌트인 경우
      mainWrapper.appendChild(node.createInstance());
    } else {
      // 일반 프레임/요소인 경우
      mainWrapper.appendChild(node.clone());
    }
  }

  // 원본 우측에 배치
  const firstNode = selection[0];
  mainWrapper.x = firstNode.x + firstNode.width + 120;
  mainWrapper.y = firstNode.y;

  // 캔버스에 추가 및 포커스
  figma.currentPage.appendChild(mainWrapper);
  figma.currentPage.selection = [mainWrapper];
  figma.viewport.scrollAndZoomIntoView([mainWrapper]);
  
  figma.notify("컴포넌트 셋의 모든 배리언트를 인스턴스로 추출 완료!");
}
