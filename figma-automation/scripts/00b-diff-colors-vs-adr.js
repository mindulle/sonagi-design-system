/**
 * Sonagi Design System — "Colors" 컬렉션 ↔ ADR 0001/0006 차분 (READ-ONLY)
 *
 * 목적: Figma 시맨틱 컬렉션(`Colors`, Light|Dark)의 현재 값을
 *       packages/tokens/tokens/semantics.json v4.0.0 확정값과 전수 비교한다.
 *
 * 배경: 00-audit 결과 "Semantic Colors" 컬렉션은 존재하지 않으며
 *       실제 시맨틱 계층 이름은 "Colors" (id VariableCollectionId:31:2, 37 vars).
 *       sync-adr-tokens.js 는 COLLECTION_NAME 교정 전까지 실행 금지.
 *
 * 실행: Figma 파일 오픈 → F12 → Console 붙여넣기 → Enter
 * 이 스크립트는 아무것도 수정하지 않는다.
 *
 * Refs: CEO-1003, CEO-1014, ADR 0001, ADR 0006
 */
(async () => {
  const COLLECTION_NAME = 'Colors';

  // packages/tokens/tokens/semantics.json v4.0.0 (2026-08-27) 확정값
  const TARGET = {
    'brand-primary':       { light: '#47211b', dark: '#eeb4a9' },
    'brand-primary-hover': { light: '#38130e', dark: '#ffc6bc' },
    'brand-accent':        { light: '#d2645f', dark: '#e5867f' },
    'brand-accent-hover':  { light: '#b44240', dark: '#f7a7a1' },
    'brand-ink':           { light: '#47211b', dark: '#eeb4a9' },
    'brand-cyan':          { light: '#00ffcc', dark: '#00ffcc' }, // ⚠ 잔재 의심
    'bg-base':             { light: '#fcf2f0', dark: '#1c1412' },
    'bg-surface':          { light: '#f5e5e2', dark: '#2c201e' },
    'bg-elevated':         { light: '#fefaf9', dark: '#392e2c' },
    'text-primary':        { light: '#1e1311', dark: '#f7eeec' },
    'text-secondary':      { light: '#614f4b', dark: '#c3b4b1' },
    'text-muted':          { light: '#756563', dark: '#988a88' },
    'text-disabled':       { light: '#9d8986', dark: '#6c605e' },
    'text-inverse':        { light: '#fcf2f0', dark: '#1c1412' },
    'border-default':      { light: '#95817f', dark: '#796966' },
    'border-subtle':       { light: '#d7c5c2', dark: '#392d2b' },
    'border-strong':       { light: '#47211b', dark: '#eeb4a9' },
    'state-info':          { light: '#1275b5', dark: '#79c0ff' },
    'state-info-bg':       { light: '#e8f1f8', dark: '#1c2d42' },
    'state-success':       { light: '#2ea043', dark: '#56d364' },
    'state-success-bg':    { light: '#eaf4eb', dark: '#132e19' },
    'state-warning':       { light: '#d29922', dark: '#e3b341' },
    'state-warning-bg':    { light: '#fdf5e5', dark: '#2e2305' },
    'state-error':         { light: '#c83e4d', dark: '#f85149' },
    'state-error-bg':      { light: '#fde8e8', dark: '#421818' },
  };

  const toHex = (c) => {
    const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
    return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
  };

  // "background/bg-base", "Brand / Primary", "brand_primary" → "brand-primary" 류로 정규화
  const norm = (s) =>
    s.toLowerCase().trim()
      .replace(/[\s_/.]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  // 카테고리 접두 중복 흡수: background-bg-base → bg-base, colors-brand-primary → brand-primary
  const candidates = (n) => {
    const out = new Set([n]);
    const parts = n.split('-');
    for (let i = 1; i < parts.length; i++) out.add(parts.slice(i).join('-'));
    // background/base → bg-base 보정
    out.add(n.replace(/^background-/, 'bg-'));
    out.add(n.replace(/^colors?-/, ''));
    return [...out];
  };

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const col = collections.find((c) => c.name === COLLECTION_NAME);
  if (!col) {
    console.error(`⛔ "${COLLECTION_NAME}" 컬렉션 없음. 실제: ${collections.map((c) => c.name).join(', ')}`);
    return;
  }

  const lightMode = col.modes.find((m) => /light|라이트/i.test(m.name)) || col.modes[0];
  const darkMode = col.modes.find((m) => /dark|다크/i.test(m.name)) || col.modes[1];
  console.log(`■ [${col.name}] id=${col.id}  Light="${lightMode?.name}"  Dark="${darkMode?.name}"`);

  const allVars = await figma.variables.getLocalVariablesAsync();
  const vars = allVars.filter((v) => v.variableCollectionId === col.id);

  const readMode = (v, mode) => {
    if (!mode) return { kind: 'nomode' };
    const raw = v.valuesByMode[mode.modeId];
    if (raw === undefined) return { kind: 'missing' };
    if (raw && raw.type === 'VARIABLE_ALIAS') {
      const t = allVars.find((x) => x.id === raw.id);
      const tv = t ? t.valuesByMode[Object.keys(t.valuesByMode)[0]] : null;
      return { kind: 'alias', via: t ? t.name : raw.id, hex: tv && 'r' in tv ? toHex(tv) : null };
    }
    if (raw && typeof raw === 'object' && 'r' in raw) return { kind: 'raw', hex: toHex(raw) };
    return { kind: 'other', hex: JSON.stringify(raw) };
  };

  const rows = [];
  const matchedTargets = new Set();
  const unmatchedVars = [];

  for (const v of vars) {
    if (v.resolvedType !== 'COLOR') continue;
    let key = null;
    for (const c of candidates(norm(v.name))) if (TARGET[c]) { key = c; break; }

    const L = readMode(v, lightMode);
    const D = readMode(v, darkMode);

    if (!key) {
      unmatchedVars.push({ figma: v.name, light: L.hex || L.kind, dark: D.hex || D.kind });
      continue;
    }
    matchedTargets.add(key);
    const t = TARGET[key];
    const lOk = L.hex && L.hex.toLowerCase() === t.light.toLowerCase();
    const dOk = D.hex && D.hex.toLowerCase() === t.dark.toLowerCase();
    rows.push({
      token: key,
      figma: v.name,
      L_now: L.hex || L.kind, L_want: t.light, L: lOk ? '✓' : '✗',
      D_now: D.hex || D.kind, D_want: t.dark,  D: dOk ? '✓' : '✗',
      alias: L.kind === 'alias' ? `→${L.via}` : '',
    });
  }

  rows.sort((a, b) => (a.L + a.D).localeCompare(b.L + b.D) || a.token.localeCompare(b.token));

  console.log('\n── ADR 대조 (✗ 우선 정렬) ─────────────────────────────────');
  console.table(rows);

  const missingTargets = Object.keys(TARGET).filter((k) => !matchedTargets.has(k));
  const lFail = rows.filter((r) => r.L === '✗').length;
  const dFail = rows.filter((r) => r.D === '✗').length;
  const both = rows.filter((r) => r.L === '✓' && r.D === '✓').length;

  console.log('\n── 요약 ───────────────────────────────────────────────────');
  console.log(`매칭된 토큰      : ${rows.length} / ${Object.keys(TARGET).length}`);
  console.log(`Light/Dark 모두 일치 : ${both}`);
  console.log(`Light 불일치     : ${lFail}`);
  console.log(`Dark 불일치      : ${dFail}`);
  console.log(`Figma에 없는 토큰: ${missingTargets.length}${missingTargets.length ? ' → ' + missingTargets.join(', ') : ''}`);

  if (unmatchedVars.length) {
    console.log(`\n── ADR에 없는 Figma 변수 ${unmatchedVars.length}개 (정리 후보) ──`);
    console.table(unmatchedVars);
  }

  console.log('\n── 판정 ───────────────────────────────────────────────────');
  if (both === Object.keys(TARGET).length) {
    console.log('✅ Figma가 ADR 0006과 완전 일치. 1번(팔레트 주입) 스킵 가능.');
  } else if (both === 0) {
    console.log('⛔ 일치 0건. Figma는 구버전 팔레트. 1번 전량 주입 필요.');
  } else {
    console.log(`⚠️  부분 일치(${both}건). 1번을 불일치 항목 한정 갱신으로 축소 가능.`);
  }
})();
