#!/usr/bin/env node
// measure-texts.js
// opentype.js로 Pretendard/Noto Serif KR/JetBrains Mono 실제 메트릭을 측정해서
// build-foundation-v3.js에 인라인으로 박을 텍스트 크기 맵을 생성한다.

const { parse } = require('opentype.js');
const fs = require('fs');
const path = require('path');

const FONT_PATHS = {
  'Pretendard|Regular':   '/usr/share/fonts/opentype/pretendard/Pretendard-Regular.otf',
  'Pretendard|Medium':    '/usr/share/fonts/opentype/pretendard/Pretendard-Medium.otf',
  'Pretendard|SemiBold':  '/usr/share/fonts/opentype/pretendard/Pretendard-SemiBold.otf',
  'Pretendard|Bold':      '/usr/share/fonts/opentype/pretendard/Pretendard-Bold.otf',
  'Noto Serif KR|Regular':'/usr/share/fonts/truetype/noto-serif-kr/3JnoSDn90Gmq2mr3blnHaTZXbOtLJDvui3JOncjmeM52.ttf',
  'JetBrains Mono|Regular':'/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Regular.ttf',
};

const fonts = {};
for (const [key, fp] of Object.entries(FONT_PATHS)) {
  fonts[key] = parse(fs.readFileSync(fp).buffer);
}

function measureW(family, style, text, fontSize) {
  const key = `${family}|${style}`;
  const font = fonts[key] || fonts[`${family}|Regular`];
  if (!font) return Math.ceil(text.length * fontSize * 0.6); // fallback
  const upem = font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  const adv = glyphs.reduce((sum, g) => sum + (g.advanceWidth || 0), 0);
  return Math.ceil((adv / upem) * fontSize);
}

function measureH(fontSize, lhMultiplier) {
  // single line height
  return Math.ceil(fontSize * lhMultiplier);
}

// 모든 텍스트 노드를 미리 측정해 {w, h} 맵으로 반환
// key: 순서 인덱스 (빌드 스크립트와 순서 맞춰야 함)
const measurements = [];
let idx = 0;

function m(family, style, text, fontSize, lhMultiplier, maxWidth) {
  const w = maxWidth || measureW(family, style, text, fontSize);
  const h = measureH(fontSize, lhMultiplier);
  measurements.push({ idx: idx++, family, style, text: text.slice(0, 40), fontSize, w, h });
  return { w, h };
}

// ====== FRAME 1: Color System ======
m('Pretendard','Bold',      '소나기 Color System', 33, 1.25);
m('Pretendard','Regular',   '가을 소나기(Rust+Coral) — ADR 0001 + ADR 0004', 16, 1.5);
// section heads + swatches — 동적이므로 헬퍼 파라미터로 처리

// ====== FRAME 2: Typography System ======
m('Pretendard','Bold',      '소나기 Typography System', 33, 1.25);
m('Pretendard','Regular',   'Minor Third(1.2) 모듈러 스케일 — ADR 0002', 16, 1.5);

// ====== FRAME 3: Shadow System ======
m('Pretendard','Bold',      '소나기 Shadow / Elevation System', 33, 1.25);
m('Pretendard','Regular',   '3단계 구조, rust 틴트 — ADR 0003', 16, 1.5);

// 공통 헬퍼: SemiBold 섹션 헤드 (20px)
// 동적 측정 함수를 스크립트에 포함시킬 용도로 lookup 테이블 만들기
// 실제로는 build 스크립트에 measureW 로직을 인라인으로 넣는 게 가장 안정적

console.log(JSON.stringify(measurements, null, 2));
