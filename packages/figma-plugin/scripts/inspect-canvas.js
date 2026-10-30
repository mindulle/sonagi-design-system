return new Promise(async (resolve) => {
  try {
    const page = figma.currentPage;
    const summary = page.children.map(c => {
      const fills = 'fills' in c && Array.isArray(c.fills) ? c.fills.map(f => f.type + ':' + (f.color ? JSON.stringify(f.color) : '')) : [];
      const childrenSummary = 'children' in c ? c.children.map(ch => ({
        name: ch.name,
        type: ch.type,
        x: ch.x,
        y: ch.y,
        w: ch.width,
        h: ch.height,
        fills: 'fills' in ch && Array.isArray(ch.fills) ? ch.fills.map(f => f.type + (f.color ? ':' + Math.round(f.color.r*255) + ',' + Math.round(f.color.g*255) + ',' + Math.round(f.color.b*255) : '')) : []
      })) : [];
      return {
        name: c.name,
        type: c.type,
        x: c.x,
        y: c.y,
        width: c.width,
        height: c.height,
        fills,
        children: childrenSummary
      };
    });
    figma.ui.postMessage({ type: 'EXECUTION_REPORT', payload: summary });
    figma.notify(`📊 캔버스 진단: 프레임 ${summary.length}개 분석 완료`);
    resolve();
  } catch (e) {
    figma.ui.postMessage({ type: 'EXECUTION_REPORT', payload: { error: e.message } });
    resolve();
  }
});
