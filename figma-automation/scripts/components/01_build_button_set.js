(async () => {
  // 1. 텍스트 생성을 위해 기본 폰트 로드 (필수)
  await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });

  // 2. Base 컴포넌트 생성 (실제 속성을 모두 가짐)
  const base = figma.createComponent();
  base.name = "_base-button"; // '_'로 시작하면 에셋 패널에 노출 안 됨 (프로의 규칙)
  
  // [핵심] 1층위 오토레이아웃 세팅
  base.layoutMode = "HORIZONTAL";
  base.primaryAxisSizingMode = "AUTO";   // 좌우 Hug Content
  base.counterAxisSizingMode = "AUTO";   // 상하 Hug Content
  base.paddingLeft = 16; base.paddingRight = 16;
  base.paddingTop = 10; base.paddingBottom = 10;
  base.cornerRadius = 8;
  base.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.4, b: 1}}]; // 파란색 배경

  // 3. Base 내부에 텍스트 추가
  const text = figma.createText();
  text.characters = "Button";
  text.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]; // 흰색 텍스트
  base.appendChild(text);

  // 4. Variant 1: Default 상태 껍데기
  const variantDefault = figma.createComponent();
  variantDefault.name = "State=Default";
  variantDefault.layoutMode = "HORIZONTAL";
  variantDefault.primaryAxisSizingMode = "AUTO";
  variantDefault.counterAxisSizingMode = "AUTO";
  variantDefault.fills = []; // 껍데기 배경은 투명 (Base에 의존)
  
  const instDefault = base.createInstance(); // Base 복제
  variantDefault.appendChild(instDefault);

  // 5. Variant 2: Hover 상태 껍데기
  const variantHover = figma.createComponent();
  variantHover.name = "State=Hover";
  variantHover.layoutMode = "HORIZONTAL";
  variantHover.primaryAxisSizingMode = "AUTO";
  variantHover.counterAxisSizingMode = "AUTO";
  variantHover.fills = [];
  
  const instHover = base.createInstance(); // Base 복제
  // Hover 상태이므로 내부 인스턴스의 색상만 오버라이드!
  instHover.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.2, b: 0.8}}]; // 짙은 파란색
  variantHover.appendChild(instHover);

  // 6. Component Set (Variant 묶음)으로 병합
  const compSet = figma.combineAsVariants([variantDefault, variantHover], figma.currentPage);
  compSet.name = "Button";
  
  // 7. 화면 보기 좋게 정리
  base.y = -100; // Base는 컴포넌트 셋 위로 살짝 빼둠
  figma.viewport.scrollAndZoomIntoView([compSet, base]);
  
  console.log("✅ 전문가 방식의 버튼 컴포넌트 셋 자동 생성 완료!");
})();
