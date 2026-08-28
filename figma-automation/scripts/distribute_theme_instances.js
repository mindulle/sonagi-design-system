const selection = figma.currentPage.selection;

if (selection.length !== 3) {
  figma.notify("마스터, 라이트, 다크 역할을 할 컨테이너(프레임/섹션) 3개를 동시에 선택해주세요.");
} else {
  // 1. 마스터 찾기 (내부에 컴포넌트가 하나라도 들어있는 요소)
  const masterContainer = selection.find(node => 
    ('children' in node) && node.findAll(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET').length > 0
  );

  if (!masterContainer) {
    figma.notify("선택한 요소 중 마스터 컴포넌트가 포함된 컨테이너를 찾을 수 없습니다.");
  } else {
    // 2. 라이트/다크 구분 (나머지 두 개 중 화면 왼쪽에 있는 것을 라이트로 간주)
    const targets = selection.filter(node => node !== masterContainer).sort((a, b) => a.x - b.x);
    const lightContainer = targets[0];
    const darkContainer = targets[1];

    // 명확성을 위해 이름 정리
    masterContainer.name = "👑 Master Components";
    lightContainer.name = "☀️ Light Theme";
    darkContainer.name = "🌙 Dark Theme";

    // 내부 정렬용 오토레이아웃 프레임 생성 함수 (Sonagi 규약)
    function createLayoutWrapper(name) {
      const wrapper = figma.createFrame();
      wrapper.name = name;
      wrapper.layoutMode = "VERTICAL";
      wrapper.primaryAxisSizingMode = "AUTO";
      wrapper.counterAxisSizingMode = "AUTO";
      wrapper.itemSpacing = 48;
      wrapper.paddingTop = 40;
      wrapper.paddingBottom = 40;
      wrapper.paddingLeft = 40;
      wrapper.paddingRight = 40;
      wrapper.fills = [];
      return wrapper;
    }

    const lightWrapper = createLayoutWrapper("Light Instances");
    const darkWrapper = createLayoutWrapper("Dark Instances");

    // 3. 마스터 내부의 컴포넌트 수집 (최상위 레벨만)
    const masterComponents = masterContainer.findAll(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET');
    const topLevelComponents = masterComponents.filter(n => {
      return n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET');
    });

    // 4. 인스턴스 생성 및 양방향 동시 배치
    for (const node of topLevelComponents) {
      if (node.type === 'COMPONENT_SET') {
        const lightSetWrapper = figma.createFrame();
        lightSetWrapper.name = `${node.name}`;
        lightSetWrapper.layoutMode = "HORIZONTAL";
        lightSetWrapper.layoutWrap = "WRAP";
        lightSetWrapper.primaryAxisSizingMode = "AUTO";
        lightSetWrapper.counterAxisSizingMode = "AUTO";
        lightSetWrapper.itemSpacing = 24;
        lightSetWrapper.counterAxisSpacing = 24;
        lightSetWrapper.fills = [];
        
        const darkSetWrapper = lightSetWrapper.clone();

        for (const variant of node.children) {
          if (variant.type === 'COMPONENT') {
            lightSetWrapper.appendChild(variant.createInstance());
            darkSetWrapper.appendChild(variant.createInstance());
          }
        }
        lightWrapper.appendChild(lightSetWrapper);
        darkWrapper.appendChild(darkSetWrapper);
        
      } else if (node.type === 'COMPONENT') {
        lightWrapper.appendChild(node.createInstance());
        darkWrapper.appendChild(node.createInstance());
      }
    }

    // 5. 생성한 그룹을 각각 라이트/다크 컨테이너에 삽입
    lightContainer.appendChild(lightWrapper);
    darkContainer.appendChild(darkWrapper);

    // 섹션인 경우 시작 위치 보정
    if (lightContainer.type === 'SECTION') { lightWrapper.x = 40; lightWrapper.y = 40; }
    if (darkContainer.type === 'SECTION') { darkWrapper.x = 40; darkWrapper.y = 40; }

    figma.currentPage.selection = [lightWrapper, darkWrapper];
    figma.notify("✅ 라이트 & 다크 프레임에 인스턴스 1:1 대칭 배치 완료!");
  }
}
