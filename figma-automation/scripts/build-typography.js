const page = figma.currentPage;
const INK = {r:0.118,g:0.075,b:0.067};      // #1e1311
const SECONDARY = {r:0.38,g:0.31,b:0.29};   // #614f4b
const ACCENT = {r:0.859,g:0.424,b:0.4};     // #db6c66

// 배경 사각형을 명시적으로 먼저 깔아서, 오른쪽 메타 텍스트까지 export 바운드에
// 확실히 포함되게 함(자유 텍스트 노드만으론 바운드 계산이 잘릴 수 있음을 확인함)
const bg = figma.createRectangle();
bg.resize(1050, 980);
bg.x = 0; bg.y = 0;
bg.fills = [{type:'SOLID', color:{r:0.988,g:0.949,b:0.941}}]; // bg-base #fcf2f0
bg.name = 'page-bg';
page.appendChild(bg);

function text(x, y, chars, family, style, size, color, lh) {
  const t = figma.createText();
  t.x = x; t.y = y;
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  t.fontName = { family, style };
  t.fontSize = size;
  if (lh) t.lineHeight = { unit: 'PERCENT', value: lh * 100 };
  t.characters = chars;
  t.fills = [{type:'SOLID', color}];
  page.appendChild(t);
  return t;
}

// Title
text(48, 48, '소나기 Typography System', 'Pretendard', 'Bold', 33, INK);
text(48, 92, 'Minor Third(1.2) 모듈러 스케일 — ADR 0002 확정 토큰', 'Pretendard', 'Regular', 16, SECONDARY);

let y = 150;

// Headings H1~H6
text(48, y, 'Headings', 'Pretendard', 'SemiBold', 20, {r:0.28,g:0.13,b:0.11});
y += 40;

const headings = [
  ['H1', 48, 'Bold', 1.25],
  ['H2', 40, 'Bold', 1.25],
  ['H3', 33, 'SemiBold', 1.25],
  ['H4', 28, 'SemiBold', 1.375],
  ['H5', 23, 'SemiBold', 1.375],
  ['H6', 19, 'SemiBold', 1.375],
];
for (const [label, size, style, lh] of headings) {
  text(48, y, `${label} — 가을 소나기 온기 어린 잉크`, 'Pretendard', style, size, INK, lh);
  const meta = text(700, y + size*0.15, `${size}px / ${style} / LH ${lh}`, 'Pretendard', 'Regular', 12, SECONDARY);
  y += size * lh + 14;
}

y += 26;
text(48, y, 'Body & Label', 'Pretendard', 'SemiBold', 20, {r:0.28,g:0.13,b:0.11});
y += 40;

const bodies = [
  ['Body Large (lg, 19px)', 19, 'Regular', 1.5],
  ['Body Base (base, 16px)', 16, 'Regular', 1.5],
  ['Body Small / Label (sm, 13px)', 13, 'Medium', 1.5],
  ['Caption (11px)', 11, 'Regular', 1.5],
];
for (const [label, size, style, lh] of bodies) {
  text(48, y, `${label} — 소나기 디자인 시스템은 따뜻하고 인간적인 느낌을 전달합니다.`, 'Pretendard', style, size, INK, lh);
  y += size * lh + 18;
}

y += 26;
text(48, y, 'Font Families', 'Pretendard', 'SemiBold', 20, {r:0.28,g:0.13,b:0.11});
y += 40;
text(48, y, 'Pretendard — Sans, UI 전체', 'Pretendard', 'Regular', 18, INK);
y += 34;
text(48, y, '에디토리얼 세리프 — Noto Serif KR, 장문 콘텐츠 전용', 'Noto Serif KR', 'Regular', 18, INK);
y += 34;
text(48, y, 'const token = "--sng-color-accent";  // JetBrains Mono', 'JetBrains Mono', 'Regular', 15, ACCENT);
y += 40;

console.log('done, total children:', page.children.length, 'final y:', y);
