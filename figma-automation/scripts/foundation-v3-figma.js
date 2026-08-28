
const page = figma.currentPage;
// 기존 노드 전체 삭제
while (page.children.length) page.children[0].remove();

const INK = {r:0.118,g:0.075,b:0.067};
const SECONDARY = {r:0.38,g:0.31,b:0.29};
const SECTION_HEAD = {r:0.28,g:0.13,b:0.11};
const BG_BASE = {r:0.988,g:0.949,b:0.941};
const ACCENT = {r:0.859,g:0.424,b:0.4};
const WHITE = {r:1,g:1,b:1};

// 사전 계산된 텍스트 크기 레지스트리
const _reg = [{"w":307,"h":44,"lhPixels":42},{"w":354,"h":26,"lhPixels":24},{"w":117,"h":30,"lhPixels":28},{"w":55,"h":22,"lhPixels":20},{"w":90,"h":19,"lhPixels":17},{"w":72,"h":22,"lhPixels":20},{"w":97,"h":19,"lhPixels":17},{"w":78,"h":22,"lhPixels":20},{"w":93,"h":19,"lhPixels":17},{"w":46,"h":30,"lhPixels":28},{"w":80,"h":22,"lhPixels":20},{"w":85,"h":19,"lhPixels":17},{"w":98,"h":22,"lhPixels":20},{"w":84,"h":19,"lhPixels":17},{"w":73,"h":22,"lhPixels":20},{"w":87,"h":19,"lhPixels":17},{"w":59,"h":30,"lhPixels":28},{"w":73,"h":22,"lhPixels":20},{"w":89,"h":19,"lhPixels":17},{"w":46,"h":22,"lhPixels":20},{"w":87,"h":19,"lhPixels":17},{"w":86,"h":22,"lhPixels":20},{"w":90,"h":19,"lhPixels":17},{"w":67,"h":30,"lhPixels":28},{"w":93,"h":22,"lhPixels":20},{"w":90,"h":19,"lhPixels":17},{"w":88,"h":22,"lhPixels":20},{"w":109,"h":19,"lhPixels":17},{"w":54,"h":30,"lhPixels":28},{"w":71,"h":22,"lhPixels":20},{"w":138,"h":19,"lhPixels":17},{"w":91,"h":22,"lhPixels":20},{"w":89,"h":19,"lhPixels":17},{"w":90,"h":22,"lhPixels":20},{"w":122,"h":19,"lhPixels":17},{"w":64,"h":22,"lhPixels":20},{"w":88,"h":19,"lhPixels":17},{"w":412,"h":44,"lhPixels":42},{"w":305,"h":26,"lhPixels":24},{"w":92,"h":30,"lhPixels":28},{"w":631,"h":62,"lhPixels":60},{"w":117,"h":20,"lhPixels":18},{"w":532,"h":52,"lhPixels":50},{"w":117,"h":20,"lhPixels":18},{"w":441,"h":44,"lhPixels":42},{"w":143,"h":20,"lhPixels":18},{"w":376,"h":41,"lhPixels":39},{"w":150,"h":20,"lhPixels":18},{"w":309,"h":34,"lhPixels":32},{"w":150,"h":20,"lhPixels":18},{"w":256,"h":29,"lhPixels":27},{"w":148,"h":20,"lhPixels":18},{"w":124,"h":30,"lhPixels":28},{"w":673,"h":31,"lhPixels":29},{"w":584,"h":26,"lhPixels":24},{"w":512,"h":22,"lhPixels":20},{"w":357,"h":19,"lhPixels":17},{"w":127,"h":30,"lhPixels":28},{"w":223,"h":29,"lhPixels":27},{"w":434,"h":29,"lhPixels":27},{"w":490,"h":25,"lhPixels":23},{"w":519,"h":44,"lhPixels":42},{"w":238,"h":26,"lhPixels":24},{"w":142,"h":30,"lhPixels":28},{"w":51,"h":23,"lhPixels":21},{"w":59,"h":20,"lhPixels":18},{"w":165,"h":23,"lhPixels":21},{"w":150,"h":20,"lhPixels":18},{"w":177,"h":23,"lhPixels":21},{"w":165,"h":20,"lhPixels":18},{"w":106,"h":30,"lhPixels":28},{"w":254,"h":20,"lhPixels":18}];
let _regIdx = 0;
function nextSize() { return _reg[_regIdx++] || {w:200, h:24}; }

function makeFrame(name, x, y, w, h) {
  const bg = figma.createRectangle();
  bg.name = name + ' (bg)';
  bg.x = x; bg.y = y;
  bg.resize(w, h);
  bg.fills = [{type:'SOLID', color: BG_BASE}];
  page.appendChild(bg);
  return { offsetX: x, offsetY: y };
}

function text(parent, x, y, chars, family, style, size, color) {
  x += parent.offsetX; y += parent.offsetY;
  const t = figma.createText();
  t.x = x; t.y = y;
  t.fontName = { family, style };
  t.fontSize = size;
  t.characters = chars;
  t.fills = [{type:'SOLID', color}];
  const sz = nextSize();
  // lineHeight는 null(AUTO)로 두어야 Figma가 폰트 없어도 렌더링함
  // PIXELS로 지정하면 Figma가 검증 실패 시 렌더링 스킵
  t.lineHeight = null;
  t.resize(sz.w, sz.h);
  t.textAutoResize = 'NONE';
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
  const w = 200, h = 100, labelH = 60;
  const rgb = hexToRgb(hex);
  rect(parent, x, y, w, h, rgb, 12, null,
    hex.toLowerCase()==='#ffffff' ? {r:0.616,g:0.537,b:0.525} : null);
  rect(parent, x, y+h+8, w, labelH, WHITE, 8);
  text(parent, x+10, y+h+14, name, 'Pretendard', 'SemiBold', 13, INK);
  text(parent, x+10, y+h+34, hex + ' · ' + note, 'Pretendard', 'Regular', 11, SECONDARY);
}

// ============ FRAME 1: Color System ============
const F1_W = 1240, F1_H = 1540;
const colorFrame = makeFrame('Color System', 0, 0, F1_W, F1_H);
text(colorFrame, 48, 48, '소나기 Color System', 'Pretendard', 'Bold', 33, INK);
text(colorFrame, 48, 96, '가을 소나기(Rust+Coral) — ADR 0001 + ADR 0004', 'Pretendard', 'Regular', 16, SECONDARY);

let y = 150;
const colorSections = [
  ['Background', [['bg-base','#fcf2f0','기준 배경'],['bg-surface','#f5e5e2','카드/패널'],['bg-elevated','#ffffff','모달/팝오버']]],
  ['Text',       [['text-primary','#1e1311','16.51:1'],['text-secondary','#614f4b','7.00:1'],['text-muted','#7c6c6a','4.54:1']]],
  ['Brand',      [['primary/ink','#47211b','12.72:1'],['accent','#db6c66','3.01:1'],['accent-hover','#b94644','4.75:1']]],
  ['Border',     [['border-default','#9d8986','3.00:1'],['border-subtle','#d7c5c2','decorative']]],
  ['State',      [['state-error','#d33a3c','ΔE(accent)=11.3'],['state-success','#308639','4.16:1'],['state-warning','#a77600','ink텍스트 전용'],['state-info','#2a75ba','4.39:1']]],
];
for (const [name, items] of colorSections) {
  text(colorFrame, 48, y, name, 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
  y += 38;
  let x = 48;
  for (const [n, hex, note] of items) { swatch(colorFrame, x, y, n, hex, note); x += 224; }
  y += 100 + 60 + 44;
}

// ============ FRAME 2: Typography System ============
const F2_X = F1_W + 120;
const F2_W = 1050, F2_H = 1000;
const typoFrame = makeFrame('Typography System', F2_X, 0, F2_W, F2_H);
text(typoFrame, 48, 48, '소나기 Typography System', 'Pretendard', 'Bold', 33, INK);
text(typoFrame, 48, 96, 'Minor Third(1.2) 모듈러 스케일 — ADR 0002', 'Pretendard', 'Regular', 16, SECONDARY);

let y2 = 150;
text(typoFrame, 48, y2, 'Headings', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
const headings = [
  ['H1',48,'Bold',1.25],['H2',40,'Bold',1.25],['H3',33,'SemiBold',1.25],
  ['H4',28,'SemiBold',1.375],['H5',23,'SemiBold',1.375],['H6',19,'SemiBold',1.375],
];
for (const [label,size,style,lh] of headings) {
  text(typoFrame, 48, y2, label+' — 가을 소나기 온기 어린 잉크', 'Pretendard', style, size, INK);
  text(typoFrame, 700, y2 + size*0.1, size+'px / '+style+' / LH '+lh, 'Pretendard', 'Regular', 12, SECONDARY);
  y2 += size * lh + 16;
}
y2 += 24;
text(typoFrame, 48, y2, 'Body & Label', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
const bodies = [
  ['Body Large (lg, 19px)',19,'Regular',1.5],
  ['Body Base (base, 16px)',16,'Regular',1.5],
  ['Body Small / Label (sm, 13px)',13,'Medium',1.5],
  ['Caption (11px)',11,'Regular',1.5],
];
for (const [label,size,style,lh] of bodies) {
  text(typoFrame, 48, y2, label+' — 소나기 디자인 시스템은 따뜻하고 인간적인 느낌을 전달합니다.', 'Pretendard', style, size, INK);
  y2 += size * lh + 20;
}
y2 += 24;
text(typoFrame, 48, y2, 'Font Families', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y2 += 40;
text(typoFrame, 48, y2, 'Pretendard — Sans, UI 전체', 'Pretendard', 'Regular', 18, INK); y2 += 36;
text(typoFrame, 48, y2, '에디토리얼 세리프 — Noto Serif KR, 장문 콘텐츠 전용', 'Noto Serif KR', 'Regular', 18, INK); y2 += 36;
text(typoFrame, 48, y2, 'const token = "--sng-color-accent";  // JetBrains Mono', 'JetBrains Mono', 'Regular', 15, ACCENT);

// ============ FRAME 3: Shadow System ============
const F3_X = F2_X + F2_W + 120;
const F3_W = 1050, F3_H = 900;
const shadowFrame = makeFrame('Shadow / Elevation System', F3_X, 0, F3_W, F3_H);
text(shadowFrame, 48, 48, '소나기 Shadow / Elevation System', 'Pretendard', 'Bold', 33, INK);
text(shadowFrame, 48, 96, '3단계 구조, rust 틴트 — ADR 0003', 'Pretendard', 'Regular', 16, SECONDARY);

let y3 = 160;
text(shadowFrame, 48, y3, 'Elevation 3단계', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y3 += 44;
const cardW = 260, cardH = 160;
const levels = [
  ['Flat (0)', [], '그림자 없음'],
  ['Raised (1) — shadow-sm', [{type:'DROP_SHADOW',color:{r:0.278,g:0.129,b:0.106,a:0.1},offset:{x:0,y:1},radius:3,spread:0,visible:true,blendMode:'NORMAL'}], '0 1px 3px rgba(71,33,27,.1)'],
  ['Floating (2) — shadow-md', [{type:'DROP_SHADOW',color:{r:0.278,g:0.129,b:0.106,a:0.12},offset:{x:0,y:4},radius:12,spread:0,visible:true,blendMode:'NORMAL'}], '0 4px 12px rgba(71,33,27,.12)'],
];
let x3 = 48;
for (const [label,effects,note] of levels) {
  rect(shadowFrame, x3, y3, cardW, cardH, WHITE, 12, effects);
  text(shadowFrame, x3, y3+cardH+12, label, 'Pretendard', 'SemiBold', 14, INK);
  text(shadowFrame, x3, y3+cardH+34, note, 'Pretendard', 'Regular', 12, SECONDARY);
  x3 += cardW + 40;
}
y3 += cardH + 90;
text(shadowFrame, 48, y3, 'Focus Ring', 'Pretendard', 'SemiBold', 20, SECTION_HEAD);
y3 += 44;
rect(shadowFrame, 48, y3, 280, 44, WHITE, 8,
  [{type:'DROP_SHADOW',color:{r:0.725,g:0.275,b:0.267,a:0.3},offset:{x:0,y:0},radius:0,spread:3,visible:true,blendMode:'NORMAL'}],
  {r:0.616,g:0.537,b:0.525});
text(shadowFrame, 48, y3+56, 'shadow-focus — 0 0 0 3px rgba(185,70,68,.3)', 'Pretendard', 'Regular', 12, SECONDARY);

console.log('done. total nodes:', page.children.length, '| registry used:', _regIdx, '/ 72');
