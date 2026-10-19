figma.showUI(__html__, { width: 340, height: 420 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'extract-tokens') {
    try {
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      const variables = await figma.variables.getLocalVariablesAsync();
      
      // 추출된 데이터 뼈대
      const exportData = { breakpoints: {} };

      // Breakpoints 변수 추출 로직 (아까 만들었던 로직 그대로 탑재!)
      const bpCollection = collections.find(c => c.name === "Breakpoints");
      if (bpCollection) {
        const bpVars = variables.filter(v => v.variableCollectionId === bpCollection.id);
        bpCollection.modes.forEach(mode => {
          exportData.breakpoints[mode.name.toLowerCase()] = {};
          bpVars.forEach(v => {
            const val = v.valuesByMode[mode.modeId];
            const cleanName = v.name.includes("/") ? v.name.split("/")[1] : v.name;
            exportData.breakpoints[mode.name.toLowerCase()][cleanName] = {
              "$value": `${val}px`,
              "$type": "dimension"
            };
          });
        });
      }

      // 텍스트/컬러 등 추가 추출 로직은 추후 여기에 덧붙이면 됨.
      
      // UI 레이어(HTML)로 추출된 데이터 쏴주기
      figma.ui.postMessage({ type: 'tokens-ready', payload: exportData });

    } catch (error) {
      figma.ui.postMessage({ type: 'error', payload: error.toString() });
    }
  } else if (msg.type === 'execute-script') {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const fn = new AsyncFunction('figma', msg.script);
      await fn(figma);
      figma.notify('⚡ [Agent Bridge] 스크립트 실행 완료!');
      figma.ui.postMessage({ type: 'script-executed-success' });
    } catch (e) {
      figma.notify(`❌ [Agent Bridge] 에러: ${e.message}`);
      figma.ui.postMessage({ type: 'error', payload: e.toString() });
    }
  }
};
