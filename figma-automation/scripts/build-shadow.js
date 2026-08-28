const page = figma.currentPage;
const INK = {r:0.118,g:0.075,b:0.067};
const SECONDARY = {r:0.38,g:0.31,b:0.29};
const BG_BASE = {r:0.988,g:0.949,b:0.941};

function text(x, y, chars, family, style, size, color) {
  const t = figma.createText();
  t.x = x; t.y = y;
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  t.fontName = { family, style };
  t.fontSize = size;
  t.characters = chars;
  t.fills = [{type:'SOLID', color}];
  page.appendChild(t);
  return t;
}

// 배경
const bg = figma.createRectangle();
bg.resize(1050, 620);
bg.x = 0; bg.y = 0;
bg.fills = [{type:'SOLID', color: BG_BASE}];
bg.name = 'page-bg';
page.appendChild(bg);

text(48, 48, '소나기 Shadow / Elevation System', 'Pretendard', 'Bold', 33, INK);
text(48, 92, '3단계 구조 유지, rust 틴트로 재적용 — ADR 0003 확정 토큰', 'Pretendard', 'Regular', 16, SECONDARY);

let y = 160;
text(48, y, 'Elevation 3단계', 'Pretendard', 'SemiBold', 20, {r:0.28,g:0.13,b:0.11});
y += 44;

const cardW = 260, cardH = 160;
const levels = [
  ['Flat (0)', [], '그림자 없음 — 기본 콘텐츠 영역'],
  ['Raised (1) — shadow-sm', [{type:'DROP_SHADOW', color:{r:0.278,g:0.129,b:0.106,a:0.1}, offset:{x:0,y:1}, radius:3, spread:0, visible:true, blendMode:'NORMAL'}], '0 1px 3px rgba(71,33,27,.1)'],
  ['Floating (2) — shadow-md', [{type:'DROP_SHADOW', color:{r:0.278,g:0.129,b:0.106,a:0.12}, offset:{x:0,y:4}, radius:12, spread:0, visible:true, blendMode:'NORMAL'}], '0 4px 12px rgba(71,33,27,.12)'],
];

let x = 48;
for (const [label, effects, note] of levels) {
  const card = figma.createRectangle();
  card.resize(cardW, cardH);
  card.x = x; card.y = y;
  card.cornerRadius = 12;
  card.fills = [{type:'SOLID', color:{r:1,g:1,b:1}}];
  card.effects = effects;
  card.name = label;
  page.appendChild(card);
  text(x, y + cardH + 12, label, 'Pretendard', 'SemiBold', 14, INK);
  text(x, y + cardH + 34, note, 'Pretendard', 'Regular', 12, SECONDARY);
  x += cardW + 40;
}

y += cardH + 90;
text(48, y, 'Focus Ring', 'Pretendard', 'SemiBold', 20, {r:0.28,g:0.13,b:0.11});
y += 44;

const input = figma.createRectangle();
input.resize(280, 44);
input.x = 48; input.y = y;
input.cornerRadius = 8;
input.fills = [{type:'SOLID', color:{r:1,g:1,b:1}}];
input.strokes = [{type:'SOLID', color:{r:0.616,g:0.537,b:0.525}}]; // border-default
input.strokeWeight = 1;
input.effects = [{type:'DROP_SHADOW', color:{r:0.725,g:0.275,b:0.267,a:0.3}, offset:{x:0,y:0}, radius:0, spread:3, visible:true, blendMode:'NORMAL'}];
input.name = 'focus-ring-demo';
page.appendChild(input);
text(48, y + 56, 'shadow-focus — 0 0 0 3px rgba(185,70,68,.3)', 'Pretendard', 'Regular', 12, SECONDARY);

console.log('done, total children:', page.children.length);
