const page = figma.currentPage;

function swatch(x, y, name, hex, note) {
  const w = 200, h = 100, labelH = 56;
  const rgb = {
    r: parseInt(hex.slice(1,3),16)/255,
    g: parseInt(hex.slice(3,5),16)/255,
    b: parseInt(hex.slice(5,7),16)/255,
  };
  const rect = figma.createRectangle();
  rect.resize(w, h);
  rect.x = x; rect.y = y;
  rect.cornerRadius = 12;
  rect.fills = [{type:'SOLID', color: rgb}];
  if (hex.toLowerCase() === '#ffffff') {
    rect.strokes = [{type:'SOLID', color:{r:0.616,g:0.537,b:0.525}}];
    rect.strokeWeight = 1;
  }
  rect.name = name + ' swatch';
  page.appendChild(rect);

  const card = figma.createRectangle();
  card.resize(w, labelH);
  card.x = x; card.y = y + h + 8;
  card.cornerRadius = 8;
  card.fills = [{type:'SOLID', color:{r:1,g:1,b:1}}];
  card.name = name + ' label-card';
  page.appendChild(card);

  const t1 = figma.createText();
  t1.x = x + 10; t1.y = y + h + 16;
  t1.textAutoResize = 'WIDTH_AND_HEIGHT';
  t1.fontName = { family: 'Pretendard', style: 'SemiBold' };
  t1.fontSize = 13;
  t1.characters = name;
  t1.fills = [{type:'SOLID', color:{r:0.118,g:0.075,b:0.067}}];
  page.appendChild(t1);

  const t2 = figma.createText();
  t2.x = x + 10; t2.y = y + h + 34;
  t2.textAutoResize = 'WIDTH_AND_HEIGHT';
  t2.fontName = { family: 'Pretendard', style: 'Regular' };
  t2.fontSize = 11;
  t2.characters = hex + ' · ' + note;
  t2.fills = [{type:'SOLID', color:{r:0.38,g:0.31,b:0.29}}];
  page.appendChild(t2);
}

function sectionTitle(x, y, text) {
  const t = figma.createText();
  t.x = x; t.y = y;
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  t.fontName = { family: 'Pretendard', style: 'SemiBold' };
  t.fontSize = 20;
  t.characters = text;
  t.fills = [{type:'SOLID', color:{r:0.28,g:0.13,b:0.11}}];
  page.appendChild(t);
}

// 배경
const bg = figma.createRectangle();
bg.resize(1300, 1500);
bg.x = 0; bg.y = 0;
bg.fills = [{type:'SOLID', color:{r:0.988,g:0.949,b:0.941}}];
bg.name = 'page-bg';
page.appendChild(bg);

const title = figma.createText();
title.x = 48; title.y = 48;
title.textAutoResize = 'WIDTH_AND_HEIGHT';
title.fontName = { family: 'Pretendard', style: 'Bold' };
title.fontSize = 33;
title.characters = '소나기 Color System (v2 — Elevation·상태색 보정)';
title.fills = [{type:'SOLID', color:{r:0.118,g:0.075,b:0.067}}];
page.appendChild(title);

const sub = figma.createText();
sub.x = 48; sub.y = 92;
sub.textAutoResize = 'WIDTH_AND_HEIGHT';
sub.fontName = { family: 'Pretendard', style: 'Regular' };
sub.fontSize = 16;
sub.characters = '가을 소나기(Rust+Coral) — ADR 0001 + ADR 0004 확정 토큰';
sub.fills = [{type:'SOLID', color:{r:0.38,g:0.31,b:0.29}}];
page.appendChild(sub);

let y = 150;
const sections = [
  ['Background', [
    ['bg-base', '#fcf2f0', '기준 배경'],
    ['bg-surface', '#f5e5e2', '카드/패널'],
    ['bg-elevated', '#ffffff', '모달/팝오버 (순백, v2 수정)'],
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
  ['State (v2 신규)', [
    ['state-error', '#d33a3c', 'ΔE(accent)=11.3'],
    ['state-success', '#308639', '4.16:1'],
    ['state-warning', '#a77600', 'ink텍스트 전용'],
    ['state-info', '#2a75ba', '4.39:1'],
  ]],
];

for (const [name, items] of sections) {
  sectionTitle(48, y, name);
  y += 36;
  let x = 48;
  for (const [n, hex, note] of items) {
    swatch(x, y, n, hex, note);
    x += 224;
  }
  y += 100 + 56 + 40;
}

console.log('done, total children:', page.children.length, 'final y:', y);
