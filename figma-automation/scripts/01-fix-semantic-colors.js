/**
 * Sonagi Design System — 시맨틱 컬러 정돈 (state 계열 + 그룹 1·2)
 *
 * 전제 (00 / 00b 실측 결과):
 *   - 시맨틱 컬렉션 실명은 "Colors" (VariableCollectionId:31:2, modes: Light | Dark)
 *     "Semantic Colors" 는 존재하지 않음. sync-adr-tokens.js 원본 실행 금지.
 *   - brand/bg/text/border 16개는 이미 ADR 0006과 일치 → 건드리지 않음.
 *   - 불일치는 state 계열뿐. state/{error,info,success,warning} 이 각 primitive 의
 *     50(light) · 950(dark) 단계에 alias 되어 있어 "전경색 자리에 배경 틴트"가 들어간 상태.
 *
 * 결정 사항:
 *   - danger 로 통일 (state/error 는 삭제하지 않고 state/danger-bg 로 개명 → 변수 ID 보존, 바인딩 유지)
 *   - 새 색을 발명하지 않는다. 값이 없는 곳은 기존 시맨틱 변수로 alias.
 *   - active 상태값은 ADR 0006 미정의 → 잠정적으로 hover/default 에 alias, ADR 0007 과제로 분리.
 *
 * 사용법:
 *   1) DRY_RUN = true 인 채로 콘솔 실행 → 변경 예정 목록 + 각 변수의 실제 사용처 수 확인
 *   2) 이상 없으면 DRY_RUN = false 로 바꿔 재실행
 *   3) 완료 후 Figma 좌상단 Assets → Publish 필요 (라이브러리 소비자 반영)
 *
 * Refs: CEO-1003, CEO-1014, ADR 0001, ADR 0006, (신규) ADR 0007 active states
 */
(async () => {
  const DRY_RUN = true; // ← 검토 후 false 로 변경
  const COLLECTION_NAME = 'Colors';

  // ── 1. 값 교정 (alias 끊고 ADR 0006 확정값을 raw 로) ────────────────
  const RECOLOR = {
    'state/danger':  { light: '#c83e4d', dark: '#f85149' },
    'state/info':    { light: '#1275b5', dark: '#79c0ff' },
    'state/success': { light: '#2ea043', dark: '#56d364' },
    'state/warning': { light: '#d29922', dark: '#e3b341' },
  };

  // ── 2. 개명 + 재색 (ID 보존 = 기존 바인딩 생존) ──────────────────────
  const RENAME = {
    'state/error': { to: 'state/danger-bg', light: '#fde8e8', dark: '#421818' },
  };

  // ── 3. 신규 생성 ────────────────────────────────────────────────────
  const CREATE = {
    'state/info-bg':    { light: '#e8f1f8', dark: '#1c2d42' },
    'state/success-bg': { light: '#eaf4eb', dark: '#132e19' },
    'state/warning-bg': { light: '#fdf5e5', dark: '#2e2305' },
  };

  // ── 4. alias 전환 (새 색 발명 0건) ──────────────────────────────────
  const ALIAS = {
    'text/brand':           'brand/primary',
    'text/info':            'state/info',
    'text/danger':          'state/danger',
    'text/success':         'state/success',
    'text/warning':         'state/warning',
    'bg/inverse':           'text/primary',
    'state/disabled-text':  'text/disabled',
    'state/disabled-bg':    'bg/surface',
    // active/hover — ADR 미정의. 파란색(#164987) 제거가 우선. ADR 0007 에서 확정할 것.
    'brand/primary-active': 'brand/primary-hover',
    'state/danger-hover':   'state/danger',
    'state/danger-active':  'state/danger',
  };

  // ── 유틸 ────────────────────────────────────────────────────────────
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
      a: 1,
    };
  };
  const toHex = (c) => {
    const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
    return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
  };

  // ── 사용처 집계 (삭제/개명 안전성 확인용) ────────────────────────────
  async function buildUsageMap() {
    await figma.loadAllPagesAsync();
    const usage = new Map();
    const seen = new Set();
    const bump = (id, node, page) => {
      if (!id) return;
      const k = `${node.id}:${id}`;
      if (seen.has(k)) return;
      seen.add(k);
      let e = usage.get(id);
      if (!e) { e = { count: 0, samples: [] }; usage.set(id, e); }
      e.count++;
      if (e.samples.length < 4) e.samples.push(`${page}/${node.name}·${node.type}`);
    };
    const visit = (node, page) => {
      const bv = node.boundVariables;
      if (bv) {
        for (const val of Object.values(bv)) {
          if (Array.isArray(val)) val.forEach((a) => a && a.id && bump(a.id, node, page));
          else if (val && val.id) bump(val.id, node, page);
        }
      }
      for (const key of ['fills', 'strokes']) {
        const paints = node[key];
        if (Array.isArray(paints)) {
          for (const p of paints) {
            if (p && p.boundVariables && p.boundVariables.color) bump(p.boundVariables.color.id, node, page);
          }
        }
      }
      if ('children' in node) for (const c of node.children) visit(c, page);
    };
    for (const pg of figma.root.children) for (const c of pg.children) visit(c, pg.name);
    return usage;
  }

  // ── 준비 ────────────────────────────────────────────────────────────
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const col = collections.find((c) => c.name === COLLECTION_NAME);
  if (!col) {
    console.error(`⛔ "${COLLECTION_NAME}" 컬렉션 없음. 실제: ${collections.map((c) => c.name).join(', ')}`);
    return;
  }
  const lightMode = col.modes.find((m) => /light|라이트/i.test(m.name));
  const darkMode = col.modes.find((m) => /dark|다크/i.test(m.name));
  if (!lightMode || !darkMode) {
    console.error(`⛔ Light/Dark 모드 탐색 실패. 실제 모드: ${col.modes.map((m) => m.name).join(', ')}`);
    return;
  }

  let all = await figma.variables.getLocalVariablesAsync();
  const inCol = () => all.filter((v) => v.variableCollectionId === col.id);
  const byName = (n) => inCol().find((v) => v.name === n);

  console.log(`■ [${col.name}] Light="${lightMode.name}" Dark="${darkMode.name}"`);
  console.log(DRY_RUN ? '🔍 DRY RUN — 아무것도 수정하지 않습니다.\n' : '⚠️  실제 적용 모드\n');

  const usage = await buildUsageMap();
  const u = (v) => (v && usage.get(v.id) ? usage.get(v.id).count : 0);
  const plan = [];
  const errors = [];

  // ── 1) RECOLOR ──────────────────────────────────────────────────────
  for (const [name, t] of Object.entries(RECOLOR)) {
    const v = byName(name);
    if (!v) { errors.push(`RECOLOR 대상 없음: ${name}`); continue; }
    const cur = v.valuesByMode[lightMode.modeId];
    const curDesc = cur && cur.type === 'VARIABLE_ALIAS'
      ? `→alias` : (cur && 'r' in cur ? toHex(cur) : '?');
    plan.push({ 작업: 'RECOLOR', 변수: name, 현재: curDesc, Light: t.light, Dark: t.dark, 사용처: u(v) });
    if (!DRY_RUN) {
      v.setValueForMode(lightMode.modeId, hexToRgb(t.light));
      v.setValueForMode(darkMode.modeId, hexToRgb(t.dark));
    }
  }

  // ── 2) RENAME + RECOLOR ─────────────────────────────────────────────
  for (const [name, t] of Object.entries(RENAME)) {
    const v = byName(name);
    if (!v) { errors.push(`RENAME 대상 없음: ${name}`); continue; }
    if (byName(t.to)) { errors.push(`RENAME 충돌: "${t.to}" 가 이미 존재`); continue; }
    plan.push({ 작업: 'RENAME', 변수: `${name} → ${t.to}`, 현재: '→50 alias', Light: t.light, Dark: t.dark, 사용처: u(v) });
    if (!DRY_RUN) {
      v.name = t.to;
      v.setValueForMode(lightMode.modeId, hexToRgb(t.light));
      v.setValueForMode(darkMode.modeId, hexToRgb(t.dark));
    }
  }

  // ── 3) CREATE ───────────────────────────────────────────────────────
  for (const [name, t] of Object.entries(CREATE)) {
    if (byName(name)) { plan.push({ 작업: 'SKIP(존재)', 변수: name, 현재: '-', Light: t.light, Dark: t.dark, 사용처: u(byName(name)) }); continue; }
    plan.push({ 작업: 'CREATE', 변수: name, 현재: '(없음)', Light: t.light, Dark: t.dark, 사용처: 0 });
    if (!DRY_RUN) {
      let nv;
      try { nv = figma.variables.createVariable(name, col, 'COLOR'); }
      catch (e) { nv = figma.variables.createVariable(name, col.id, 'COLOR'); } // 구버전 시그니처 폴백
      nv.setValueForMode(lightMode.modeId, hexToRgb(t.light));
      nv.setValueForMode(darkMode.modeId, hexToRgb(t.dark));
      all = await figma.variables.getLocalVariablesAsync();
    }
  }

  // ── 4) ALIAS ────────────────────────────────────────────────────────
  for (const [name, targetName] of Object.entries(ALIAS)) {
    const v = byName(name);
    const target = byName(targetName);
    if (!v) { errors.push(`ALIAS 대상 없음: ${name}`); continue; }
    if (!target) { errors.push(`ALIAS 참조 대상 없음: ${targetName} (for ${name})`); continue; }
    if (v.id === target.id) { errors.push(`ALIAS 자기참조: ${name}`); continue; }
    const cur = v.valuesByMode[lightMode.modeId];
    const curHex = cur && 'r' in cur ? toHex(cur) : (cur && cur.type === 'VARIABLE_ALIAS' ? '→alias' : '?');
    plan.push({ 작업: 'ALIAS', 변수: name, 현재: curHex, Light: `→${targetName}`, Dark: `→${targetName}`, 사용처: u(v) });
    if (!DRY_RUN) {
      const ref = figma.variables.createVariableAlias(target);
      v.setValueForMode(lightMode.modeId, ref);
      v.setValueForMode(darkMode.modeId, ref);
    }
  }

  // ── 리포트 ──────────────────────────────────────────────────────────
  console.table(plan);
  const n = (t) => plan.filter((p) => p.작업 === t).length;
  console.log(`RECOLOR ${n('RECOLOR')} · RENAME ${n('RENAME')} · CREATE ${n('CREATE')} · ALIAS ${n('ALIAS')}`);
  const touched = plan.reduce((s, p) => s + (p.사용처 || 0), 0);
  console.log(`영향받는 노드 바인딩 총계: ${touched}`);

  if (errors.length) {
    console.warn(`\n⚠️  문제 ${errors.length}건`);
    errors.forEach((e) => console.warn('  · ' + e));
  }

  if (DRY_RUN) {
    console.log('\n🔍 DRY RUN 종료. 위 표 확인 후 DRY_RUN = false 로 바꿔 재실행하세요.');
    return;
  }

  // ── 사후 검증 ───────────────────────────────────────────────────────
  all = await figma.variables.getLocalVariablesAsync();
  const check = [];
  for (const [name, t] of Object.entries({ ...RECOLOR, ...CREATE })) {
    const v = byName(name);
    const L = v && v.valuesByMode[lightMode.modeId];
    const D = v && v.valuesByMode[darkMode.modeId];
    check.push({
      변수: name,
      Light: L && 'r' in L ? toHex(L) : '?',
      L: L && 'r' in L && toHex(L) === t.light ? '✓' : '✗',
      Dark: D && 'r' in D ? toHex(D) : '?',
      D: D && 'r' in D && toHex(D) === t.dark ? '✓' : '✗',
    });
  }
  const rn = byName(RENAME['state/error'].to);
  check.push({ 변수: RENAME['state/error'].to, Light: rn ? '개명됨' : '실패', L: rn ? '✓' : '✗', Dark: '', D: '' });

  console.log('\n── 사후 검증 ──');
  console.table(check);
  const fail = check.filter((c) => c.L === '✗' || c.D === '✗').length;
  console.log(fail === 0
    ? '✅ 전부 반영됨. 이제 Assets 패널에서 Publish 하세요.'
    : `⛔ ${fail}건 반영 실패. 위 표에서 ✗ 확인.`);
})();
