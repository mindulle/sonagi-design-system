const page = figma.currentPage;
const INK = {r:0.118,g:0.075,b:0.067};
const SECONDARY = {r:0.38,g:0.31,b:0.29};
const SECTION_HEAD = {r:0.28,g:0.13,b:0.11};
const BG_BASE = {r:0.988,g:0.949,b:0.941};
const ACCENT = {r:0.859,g:0.424,b:0.4};

// NOTE(2026-08-22): figma.createFrame()으로 만든 프레임에 자식을 appendChild하면
// 자식의 x/y가 프레임 기준 상대좌표로 변환되지 않고 절대좌표로 겹쳐버리는 버그를
// 발견함(OpenPencil Plugin API 호환 레이어의 한계로 추정). 그래서 실제 FRAME 노드
// 대신, 이미 검증된 "페이지에 직접 배치 + 섹션별 X 오프셋을 좌표에 직접 더하기"
// 방식으로 우회함. 배경 사각형만 그려서 시각적으로 프레임처럼 보이게 함.
function makeFrame(name, x, y, w, h) {
  const bg = figma.createRectangle();
  bg.name = name + ' (bg)';
  bg.x = x; bg.y = y;
  bg.resize(w, h);
  bg.fills = [{type:'SOLID', color: BG_BASE}];
  page.appendChild(bg);
  // parent 대신 {offsetX, offsetY}를 반환해서 이후 좌표에 직접 더함
  return { offsetX: x, offsetY: y };
}

function text(parent, x, y, chars, family, style, size, color, lh) {
  x += parent.offsetX; y += parent.offsetY;
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

function rect(parent, x, y, w, h, color, radius, effects, stroke) {
  x += parent.offsetX; y += parent.offsetY;
  const r = figma.createRectangle();
  r.x = x; r.y = y; r.resize(w, h);
  r.fills = color ? [{type:'SOLID', color}] : [];
  if (radius) r.cornerRadius = radius;
  if (effects) r.effects = effects;
  if (stroke) { r.strokes = [{type:'SOLID', color: stroke}]; r.strokeWeight = 1; }
  page.appendChild(r);
  return r;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1,3),16)/255,
    g: parseInt(hex.slice(3,5),16)/255,
    b: parseInt(hex.slice(5,7),16)/255,
  };
}

function swatch(parent, x, y, name, hex, note) {
  const w = 200, h = 100, labelH = 56;
  const rgb = hexToRgb(hex);
  rect(parent, x, y, w, h, rgb, 12, null, hex.toLowerCase()==='#ffffff' ? {r:0.616,g:0.537,b:0.525} : null);
  rect(parent, x, y+h+8, w, labelH, {r:1,g:1,b:1}, 8);
  text(parent, x+10, y+h+16, name, 'Pretendard', 'SemiBold', 13, INK);
  text(parent, x+10, y+h+34, hex + ' · ' + note, 'Pretendard', 'Regular', 11, SECONDARY);
}

// ============ FRAME 1: Color System ============
const F1_W = 1240, F1_H = 1500;
const colorFrame = makeFrame('Color System', 0, 0, F1_W, F1_H);
text(colorFrame, 48, 48, '소나기 Color System', 'Pretendard', 'Bold', 33, INK);
text(colorFrame, 48, 92, '가을 소나기(Rust+Coral) — ADR 0001 + ADR 0004', 'Pretendard', 'Regular', 16, SECONDARY);

let y = 150;
const colorSections = [
  ['Background', [
    ['bg-base', '#fcf2f0', '기준 배경'],
    ['bg-surface', '#f5e5e2', '카드/패널'],
    ['bg-elevated', '#ffffff', '모달/팝오버'],
  ]],
  ['Text', [
    ['text-primary', '#1e1311', '16.51:1'],
    ['text-secondary', '#614f4b', '7.00:1'],
    ['text-muted', '#7c6c6a', '4.54:1'],
  ]],
  ['Brand', [
    ['primary/ink', '#47211b', '12.72:1'],
    ['accent', '#db6c66', '3.01:1'],
    ['accent-hover', '#b94644', '4.75:1'],
  ]],
  ['Border', [
    ['border-default', '#9d8986', '3.00:1'],
    ['border-subtle', '#d7c5c2', 'decorative'],
  ]],
  ['State', [
    ['state-error', '#d33a3c', 'ΔE(accent)=11.3'],
    ['state-success', '#308639', '4.16:1'],
    ['state-warning', '#a77600', 'ink텍스트 전용'],
    ['state-info', '#2a75ba', '4.39:1'],
  ]],
];
for (const [name, items] of colorSections) {
  text(colorFrame, 48, y, name, 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
  y += 36;
  let x = 48;
  for (const [n, hex, note] of items) { swatch(colorFrame, x, y, n, hex, note); x += 224; }
  y += 100 + 56 + 40;
}

// ============ FRAME 2: Typography System ============
const F2_X = F1_W + 120;
const F2_W = 1050, F2_H = 980;
const typoFrame = makeFrame('Typography System', F2_X, 0, F2_W, F2_H);
text(typoFrame, 48, 48, '소나기 Typography System', 'Pretendard', 'Bold', 33, INK);
text(typoFrame, 48, 92, 'Minor Third(1.2) 모듈러 스케일 — ADR 0002', 'Pretendard', 'Regular', 16, SECONDARY);

let y2 = 150;
text(typoFrame, 48, y2, 'Headings', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
const headings = [
  ['H1', 48, 'Bold', 1.25], ['H2', 40, 'Bold', 1.25], ['H3', 33, 'SemiBold', 1.25],
  ['H4', 28, 'SemiBold', 1.375], ['H5', 23, 'SemiBold', 1.375], ['H6', 19, 'SemiBold', 1.375],
];
for (const [label, size, style, lh] of headings) {
  text(typoFrame, 48, y2, `${label} — 가을 소나기 온기 어린 잉크`, 'Pretendard', style, size, INK, lh);
  text(typoFrame, 700, y2 + size*0.15, `${size}px / ${style} / LH ${lh}`, 'Pretendard', 'Regular', 12, SECONDARY);
  y2 += size * lh + 14;
}
y2 += 26;
text(typoFrame, 48, y2, 'Body & Label', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
const bodies = [
  ['Body Large (lg, 19px)', 19, 'Regular', 1.5], ['Body Base (base, 16px)', 16, 'Regular', 1.5],
  ['Body Small / Label (sm, 13px)', 13, 'Medium', 1.5], ['Caption (11px)', 11, 'Regular', 1.5],
];
for (const [label, size, style, lh] of bodies) {
  text(typoFrame, 48, y2, `${label} — 소나기 디자인 시스템은 따뜻하고 인간적인 느낌을 전달합니다.`, 'Pretendard', style, size, INK, lh);
  y2 += size * lh + 18;
}
y2 += 26;
text(typoFrame, 48, y2, 'Font Families', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
text(typoFrame, 48, y2, 'Pretendard — Sans, UI 전체', 'Pretendard', 'Regular', 18, INK); y2 += 34;
text(typoFrame, 48, y2, '에디토리얼 세리프 — Noto Serif KR, 장문 콘텐츠 전용', 'Noto Serif KR', 'Regular', 18, INK); y2 += 34;
text(typoFrame, 48, y2, 'const token = "--sng-color-accent";  // JetBrains Mono', 'JetBrains Mono', 'Regular', 15, ACCENT);

// ============ FRAME 3: Shadow System ============
const F3_X = F2_X + F2_W + 120;
const F3_W = 1050, F3_H = 900;
const shadowFrame = makeFrame('Shadow / Elevation System', F3_X, 0, F3_W, F3_H);
text(shadowFrame, 48, 48, '소나기 Shadow / Elevation System', 'Pretendard', 'Bold', 33, INK);
text(shadowFrame, 48, 92, '3단계 구조, rust 틴트 — ADR 0003', 'Pretendard', 'Regular', 16, SECONDARY);

let y3 = 160;
text(shadowFrame, 48, y3, 'Elevation 3단계', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y3 += 44;
const cardW = 260, cardH = 160;
const levels = [
  ['Flat (0)', [], '그림자 없음'],
  ['Raised (1) — shadow-sm', [{type:'DROP_SHADOW', color:{r:0.278,g:0.129,b:0.106,a:0.1}, offset:{x:0,y:1}, radius:3, spread:0, visible:true, blendMode:'NORMAL'}], '0 1px 3px rgba(71,33,27,.1)'],
  ['Floating (2) — shadow-md', [{type:'DROP_SHADOW', color:{r:0.278,g:0.129,b:0.106,a:0.12}, offset:{x:0,y:4}, radius:12, spread:0, visible:true, blendMode:'NORMAL'}], '0 4px 12px rgba(71,33,27,.12)'],
];
let x3 = 48;
for (const [label, effects, note] of levels) {
  rect(shadowFrame, x3, y3, cardW, cardH, {r:1,g:1,b:1}, 12, effects);
  text(shadowFrame, x3, y3+cardH+12, label, 'Pretendard', 'SemiBold', 14, INK);
  text(shadowFrame, x3, y3+cardH+34, note, 'Pretendard', 'Regular', 12, SECONDARY);
  x3 += cardW + 40;
}
y3 += cardH + 90;
text(shadowFrame, 48, y3, 'Focus Ring', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y3 += 44;
rect(shadowFrame, 48, y3, 280, 44, {r:1,g:1,b:1}, 8,
  [{type:'DROP_SHADOW', color:{r:0.725,g:0.275,b:0.267,a:0.3}, offset:{x:0,y:0}, radius:0, spread:3, visible:true, blendMode:'NORMAL'}],
  {r:0.616,g:0.537,b:0.525});
text(shadowFrame, 48, y3+56, 'shadow-focus — 0 0 0 3px rgba(185,70,68,.3)', 'Pretendard', 'Regular', 12, SECONDARY);

console.log('done. frames:', page.children.length);
