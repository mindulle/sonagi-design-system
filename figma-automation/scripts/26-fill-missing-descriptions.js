/**
 * 26-fill-missing-descriptions.js
 *
 * 목적: Figma 라이브러리 내 Description이 누락된 15개의 COMPONENT_SET에 기본 설명을 채워넣어,
 * 거버넌스 규칙 4(맥락 보존을 위한 Description 필수 작성)를 충족시킵니다.
 *
 * 실행: Chrome 개발자도구 콘솔에 복사 후 붙여넣기
 */

(async () => {
  const descriptions = {
    '177:764': "아이콘을 감싸 규격(Size)을 통일하는 래퍼(Wrapper) 컴포넌트입니다. \n\n#icon #wrapper #core",
    '179:1682': "사용자로부터 텍스트를 입력받는 기본 Input 컴포넌트입니다. \n\n#input #form #core",
    '198:1423': "옵션 중 하나를 선택할 수 있는 Select(드롭다운) 컴포넌트입니다. \n\n#select #form #dropdown",
    '198:2546': "마우스를 올렸을 때 추가 설명을 제공하는 Tooltip 컴포넌트입니다. \n\n#tooltip #overlay #info",
    '198:2467': "화면 하단에 잠시 나타났다 사라지는 상태 알림(Toast) 컴포넌트입니다. \n\n#toast #notification #feedback",
    '198:2352': "여러 페이지로 나뉜 목록을 탐색하기 위한 Pagination 요소입니다. \n\n#pagination #navigation",
    '198:2261': "화면의 뷰나 컨텍스트를 전환할 때 사용하는 Tab 아이템입니다. \n\n#tab #navigation",
    '198:1933': "사용자의 집중을 요구하는 중요 안내나 액션을 위한 Modal 다이얼로그입니다. \n\n#modal #dialog #overlay",
    '198:1779': "관련된 정보와 액션을 하나의 묶음으로 담아내는 Card 컴포넌트입니다. \n\n#card #container",
    '197:1272': "여러 개의 옵션을 독립적으로 선택할 때 사용하는 Checkbox 컴포넌트입니다. \n\n#checkbox #form",
    '194:934': "여러 줄의 긴 텍스트를 입력받을 때 사용하는 Textarea 컴포넌트입니다. \n\n#textarea #form",
    '198:1710': "상태, 카테고리, 속성 등을 시각적으로 강조하는 Badge 컴포넌트입니다. \n\n#badge #status #label",
    '198:2055': "사용자나 엔티티를 나타내는 프로필 이미지(Avatar) 컴포넌트입니다. \n\n#avatar #profile",
    '198:2134': "목록 형태로 정보를 나열할 때 사용하는 기본 List Item 컴포넌트입니다. \n\n#list #item #row",
    '198:1635': "여러 옵션 중 단 하나만 선택해야 할 때 사용하는 Radio 버튼 컴포넌트입니다. \n\n#radio #form"
  };

  let updatedCount = 0;
  
  for (const [id, desc] of Object.entries(descriptions)) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === 'COMPONENT_SET') {
      if (!node.description || node.description.trim() === '') {
        node.description = desc;
        console.log(`✅ [${node.name}] Description 업데이트 완료`);
        updatedCount++;
      } else {
        console.log(`⏭️ [${node.name}] 이미 Description이 존재합니다. (Skip)`);
      }
    } else {
      console.log(`❌ 노드 ${id} 를 찾을 수 없거나 COMPONENT_SET이 아닙니다.`);
    }
  }
  
  console.log(`\n🎉 총 ${updatedCount}개의 컴포넌트 세트에 Description을 채웠습니다.`);
})();
