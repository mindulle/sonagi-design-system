#!/usr/bin/env node
/**
 * Foundation-v3 MCP 빌드 스크립트 v2
 * ADR 0001~0004 기반, OpenPencil MCP API 직접 호출
 * 실행: node build-foundation-mcp.mjs
 */

const MCP_URL = 'http://127.0.0.1:7600/mcp'
const TOKEN = 'sonagi-mcp-2026'

// ─── 토큰 (ADR 0001~0004) ────────────────────────────────────────────────────
const COLORS = {
  'bg-base':          '#fcf2f0',
  'bg-surface':       '#f5e5e2',
  'bg-elevated':      '#ffffff',
  'text-primary':     '#1e1311',
  'text-secondary':   '#614f4b',
  'text-muted':       '#7c6c6a',
  'brand-primary':    '#47211b',
  'accent':           '#db6c66',
  'accent-hover':     '#b94644',
  'border-default':   '#9d8986',
  'border-subtle':    '#d7c5c2',
  'state-error':      '#d33a3c',
  'state-success':    '#308639',
  'state-warning':    '#a77600',
  'state-info':       '#2a75ba',
  'state-error-bg':   '#fff4f3',
  'state-success-bg': '#f1f9f1',
  'state-warning-bg': '#f3eadb',
  'state-info-bg':    '#f1f8ff',
}

const TYPOGRAPHY = [
  { size: 48, lh: 1.25,  weight: 'Bold',     label: 'H1 / 48px · tight',  sample: '소나기 디자인 시스템' },
  { size: 40, lh: 1.25,  weight: 'Bold',     label: 'H2 / 40px · tight',  sample: '가을 소나기 Rust+Coral' },
  { size: 33, lh: 1.25,  weight: 'Bold',     label: 'H3 / 33px · tight',  sample: '따뜻함 · 인간다움 · 에디토리얼' },
  { size: 28, lh: 1.375, weight: 'Bold',     label: 'H4 / 28px · snug',   sample: 'Typography Scale — Minor Third' },
  { size: 23, lh: 1.375, weight: 'SemiBold', label: 'H5 / 23px · snug',   sample: 'OKLCH 기반 수학적 파생' },
  { size: 19, lh: 1.375, weight: 'SemiBold', label: 'H6 / 19px · snug',   sample: 'WCAG 2.1 대비 검증 완료' },
  { size: 16, lh: 1.5,   weight: 'Regular',  label: 'Body Base / 16px',   sample: '본문 기본 크기입니다. Pretendard를 사용하며, 줄 간격은 1.5배로 가독성을 확보합니다.' },
  { size: 13, lh: 1.5,   weight: 'Regular',  label: 'Body Small / 13px',  sample: '서브텍스트, 라벨, 보조 설명에 사용됩니다.' },
  { size: 11, lh: 1.5,   weight: 'Regular',  label: 'Caption / 11px',     sample: '캡션 · 메타데이터 · 타임스탬프' },
]

const SHADOWS = [
  { label: 'Flat — 0',              desc: '그림자 없음 · 기본 콘텐츠 영역', effects: null },
  { label: 'Raised — shadow-sm',    desc: '카드 · sticky 헤더\n0 1px 3px rgba(71,33,27,0.10)',  effects: { type: 'DROP_SHADOW', color: '#47211b1a', offsetX: 0, offsetY: 1,  blur: 3,  spread: 0 } },
  { label: 'Floating — shadow-md',  desc: '드롭다운 · 모달 · 토스트\n0 4px 12px rgba(71,33,27,0.12)', effects: { type: 'DROP_SHADOW', color: '#47211b1f', offsetX: 0, offsetY: 4,  blur: 12, spread: 0 } },
  { label: 'Focus Ring',            desc: '포커스 링 · 키보드 접근성\n0 0 0 3px rgba(185,70,68,0.30)',  effects: { type: 'DROP_SHADOW', color: '#b9444440', offsetX: 0, offsetY: 0,  blur: 0,  spread: 3 } },
]

// ─── MCP 헬퍼 ────────────────────────────────────────────────────────────────
let sessionId = null

async function mcpInit() {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'initialize', id: 1,
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'foundation-builder', version: '2.0' } },
    }),
  })
  sessionId = res.headers.get('mcp-session-id')
  console.log('✓ MCP initialized, session:', sessionId)
}

let _id = 100
async function call(toolName, args) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Authorization': `Bearer ${TOKEN}`,
      'mcp-session-id': sessionId,
    },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'tools/call', id: _id++,
      params: { name: toolName, arguments: args },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(`${toolName} failed: ${JSON.stringify(data.error)}`)
  const text = data.result?.content?.[0]?.text
  try { return JSON.parse(text) } catch { return text }
}

// shape 생성 후 id 문자열 반환
async function shape(type, x, y, w, h) {
  const r = await call('create_shape', { type, x, y, width: w, height: h })
  return r.id
}

// ─── 섹션 헤더 ───────────────────────────────────────────────────────────────
async function sectionHeader(text, x, y) {
  const id = await shape('TEXT', x, y, 900, 48)
  await call('set_text', { id, text })
  await call('set_font', { id, family: 'Pretendard', style: 'Bold', size: 32 })
  await call('set_fill', { id, color: '#47211b' })
  return id
}

// ─── 구분선 ──────────────────────────────────────────────────────────────────
async function divider(x, y) {
  const id = await shape('RECTANGLE', x, y, 1400, 1)
  await call('set_fill', { id, color: '#d7c5c2' })
  return id
}

// ─── 라벨 텍스트 ─────────────────────────────────────────────────────────────
async function label(text, x, y, size = 11, color = '#7c6c6a', w = 200) {
  const id = await shape('TEXT', x, y, w, size * 2)
  await call('set_text', { id, text })
  await call('set_font', { id, family: 'Pretendard', style: 'Regular', size })
  await call('set_fill', { id, color })
  return id
}

// ─── COLOR 섹션 ──────────────────────────────────────────────────────────────
async function buildColorSection(startY) {
  console.log('\n── Color ──')
  await sectionHeader('Color', 80, startY)
  await divider(80, startY + 52)

  const groups = [
    { title: 'Background',  keys: ['bg-base', 'bg-surface', 'bg-elevated'] },
    { title: 'Text',        keys: ['text-primary', 'text-secondary', 'text-muted'] },
    { title: 'Brand & Accent', keys: ['brand-primary', 'accent', 'accent-hover'] },
    { title: 'Border',      keys: ['border-default', 'border-subtle'] },
    { title: 'State',       keys: ['state-error', 'state-success', 'state-warning', 'state-info'] },
    { title: 'State Background', keys: ['state-error-bg', 'state-success-bg', 'state-warning-bg', 'state-info-bg'] },
  ]

  const SW = 80   // swatch size
  const GAP = 20  // gap between swatches
  const GRP = 56  // gap between groups
  let y = startY + 72

  for (const group of groups) {
    await label(group.title, 80, y, 13, '#47211b', 400)
    y += 22
    let x = 80
    for (const key of group.keys) {
      const hex = COLORS[key]
      // 스와치
      const sw = await shape('RECTANGLE', x, y, SW, SW)
      await call('set_fill', { id: sw, color: hex })
      await call('set_radius', { id: sw, radius: 8 })
      await call('set_stroke', { id: sw, color: '#d7c5c2', weight: 1 })
      // 토큰명
      await label(key, x, y + SW + 6, 10, '#614f4b', SW + GAP)
      // hex 값
      await label(hex.toUpperCase(), x, y + SW + 20, 10, '#9d8986', SW + GAP)
      x += SW + GAP
      process.stdout.write('.')
    }
    console.log(` ${group.title}`)
    y += SW + 48 + GRP
  }

  return y
}

// ─── TYPOGRAPHY 섹션 ─────────────────────────────────────────────────────────
async function buildTypographySection(startY) {
  console.log('\n── Typography ──')
  await sectionHeader('Typography', 80, startY)
  await divider(80, startY + 52)

  let y = startY + 80

  for (const t of TYPOGRAPHY) {
    const h = Math.round(t.size * t.lh) + 8
    // 샘플 텍스트
    const sid = await shape('TEXT', 80, y, 860, h)
    await call('set_text', { id: sid, text: t.sample })
    await call('set_font', { id: sid, family: 'Pretendard', style: t.weight, size: t.size })
    await call('set_fill', { id: sid, color: '#1e1311' })
    // 메타 라벨
    const mid = await shape('TEXT', 960, y + 4, 360, 40)
    await call('set_text', { id: mid, text: `${t.label}` })
    await call('set_font', { id: mid, family: 'Pretendard', style: 'Regular', size: 11 })
    await call('set_fill', { id: mid, color: '#9d8986' })
    console.log(`  ✓ ${t.label}`)
    y += h + 20
  }

  return y + 20
}

// ─── SHADOW 섹션 ─────────────────────────────────────────────────────────────
async function buildShadowSection(startY) {
  console.log('\n── Shadow / Elevation ──')
  await sectionHeader('Shadow / Elevation', 80, startY)
  await divider(80, startY + 52)

  const CW = 240, CH = 120, GAP = 48
  let x = 80
  const y = startY + 88

  for (const s of SHADOWS) {
    // 카드
    const cid = await shape('RECTANGLE', x, y, CW, CH)
    await call('set_fill', { id: cid, color: '#ffffff' })
    await call('set_radius', { id: cid, radius: 12 })
    await call('set_stroke', { id: cid, color: '#d7c5c2', weight: 1 })
    if (s.effects) {
      await call('set_effects', { id: cid, effects: [s.effects] })
    }
    // 라벨
    await label(s.label, x, y + CH + 12, 12, '#1e1311', CW)
    await label(s.desc,  x, y + CH + 32, 10, '#7c6c6a', CW)
    console.log(`  ✓ ${s.label}`)
    x += CW + GAP
  }

  return y + CH + 100
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
async function main() {
  await mcpInit()

  // Foundation 페이지로 전환 (없으면 생성)
  const pages = await call('list_pages', {})
  const hasFoundation = pages?.pages?.some(p => p.name === 'Foundation')
  if (!hasFoundation) {
    await call('create_page', { name: 'Foundation' })
    console.log('✓ Foundation 페이지 생성')
  }
  await call('switch_page', { page: 'Foundation' })
  console.log('✓ Foundation 페이지로 전환')

  // 섹션 빌드
  let y = 80
  y = await buildColorSection(y) + 40
  y = await buildTypographySection(y) + 40
  y = await buildShadowSection(y)

  // 저장
  const savePath = '/tmp/opencode/foundation-build/Foundation-v3-mcp.fig'
  await call('save_file', { path: savePath })
  console.log(`\n✓ 저장: ${savePath}`)

  // 전체 보기
  await call('viewport_zoom_to_fit', { ids: [] })

  console.log('\n✅ Foundation-v3 빌드 완료!')
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
