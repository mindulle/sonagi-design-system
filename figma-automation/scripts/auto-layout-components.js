// 1. 선택된 컴포넌트들을 가져오기
const sel = figma.currentPage.selection;
if (sel.length === 0) {
  figma.notify("❌ 묶어줄 컴포넌트들을 먼저 드래그해서 선택해주세요!");
} else {
  // 2. 카테고리별로 자동 분류하기 (이름 기준)
  const categories = {};
  
  sel.forEach(node => {
    // 묶을 대상: 컴포넌트 셋, 일반 컴포넌트, 인스턴스, 일반 프레임
    // (이미 묶인 자식 요소가 중복 선택되지 않도록 최상위 노드만)
    if (node.parent && sel.includes(node.parent)) return;
    
    let catName = "기타 (Others)";
    const nameLower = node.name.toLowerCase();
    
    if (nameLower.includes("button")) catName = "🔲 Buttons";
    else if (nameLower.includes("input")) catName = "📝 Inputs";
    else if (nameLower.includes("badge")) catName = "🏷 Badges";
    else if (nameLower.includes("card")) catName = "🃏 Cards";
    else if (nameLower.includes("modal")) catName = "팝업 (Modals)";
    else if (nameLower.includes("typography") || nameLower.includes("text")) catName = "텍스트 (Typography)";
    
    if (!categories[catName]) categories[catName] = [];
    categories[catName].push(node);
  });

  // 3. 섹션 찾기 (이전 스크립트에서 만든 🌞 Light Theme)
  const lightSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Light Theme"))[0];
  const darkSection = figma.currentPage.findAll(n => n.type === "SECTION" && n.name.includes("Dark Theme"))[0];

  if (!lightSection) {
    figma.notify("❌ '🌞 Light Theme' 섹션을 찾을 수 없습니다. 이전 스크립트를 먼저 실행해주세요.");
  } else {
    // 4. 최상위 마스터 프레임(전체 기둥) 만들기
    const masterFrame = figma.createFrame();
    masterFrame.name = "🧩 Components Layout";
    masterFrame.layoutMode = "VERTICAL";
    masterFrame.itemSpacing = 64; // 카테고리 간격 64px
    masterFrame.paddingTop = 64;
    masterFrame.paddingBottom = 64;
    masterFrame.paddingLeft = 64;
    masterFrame.paddingRight = 64;
    masterFrame.fills = []; // 투명

    // 5. 카테고리별로 오토레이아웃 프레임 묶기
    for (const [catName, nodes] of Object.entries(categories)) {
      const groupFrame = figma.createFrame();
      groupFrame.name = catName;
      // 인풋, 카드, 모달 등 큰 요소는 세로로, 버튼/뱃지 등 작은 요소는 가로로 배치
      const isVertical = catName.includes("Inputs") || catName.includes("Cards") || catName.includes("Modals") || catName.includes("Typography");
      groupFrame.layoutMode = isVertical ? "VERTICAL" : "HORIZONTAL";
      groupFrame.itemSpacing = 24;
      groupFrame.fills = [];
      
      // 노드들을 그룹 프레임 안에 넣기
      nodes.forEach(n => groupFrame.appendChild(n));
      masterFrame.appendChild(groupFrame);
    }

    // 6. 마스터 프레임을 Light 섹션 안에 예쁘게 배치
    lightSection.appendChild(masterFrame);
    masterFrame.x = lightSection.x + 100;
    masterFrame.y = lightSection.y + 100;
    
    // 섹션 크기 맞춤 조절
    lightSection.resizeWithoutConstraints(masterFrame.width + 200, masterFrame.height + 200);

    // 7. Dark 섹션에도 똑같이 복제해서 배치! (완벽한 1:1 거울상)
    if (darkSection) {
      const darkMaster = masterFrame.clone();
      darkSection.appendChild(darkMaster);
      darkMaster.x = darkSection.x + 100;
      darkMaster.y = darkSection.y + 100;
      darkSection.resizeWithoutConstraints(darkMaster.width + 200, darkMaster.height + 200);
      
      figma.notify("✅ 카테고리별 오토레이아웃 정렬 및 Light/Dark 대칭 배치가 완료되었습니다!");
    } else {
      figma.notify("✅ 오토레이아웃 정렬이 완료되었습니다! (Dark 섹션은 찾지 못해 생략)");
    }
  }
}
