/**
 * Sonagi Design System — Variable Collection Audit (READ-ONLY)
 *
 * 목적: 캔버스 정돈 착수 전, 실제 Local Variable 컬렉션/모드/값을 실측한다.
 *       REST API는 개인 PAT으로 /variables/local 403이므로 콘솔에서만 확인 가능.
 *
 * 왜 필요한가:
 *   sync-adr-tokens.js 는 "Semantic Colors" 컬렉션을 찾고 없으면 *생성*한다.
 *   실제 이름이 다르면 유령 컬렉션이 중복 생성되어 CEO-1003이 지적한
 *   "중복 다크모드 스위치" 문제를 재현한다. 반드시 이 스크립트를 먼저 돌릴 것.
 *
 * 실행: Figma 파일 오픈 → F12 → Console 탭에 전체 붙여넣기 → Enter
 * 이 스크립트는 아무것도 수정하지 않는다.
 *
 * Refs: CEO-1003, CEO-1014, ADR 0001, ADR 0006
 */
(async () => {
  const toHex = (c) => {
    const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
    return `#${h(c.r)}${h(c.g)}${h(c.b)}${c.a !== undefined && c.a < 1 ? h(c.a) : ''}`;
  };

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();

  console.log('='.repeat(72));
  console.log(`컬렉션 ${collections.length}개 / 변수 ${variables.length}개`);
  console.log('='.repeat(72));

  const summary = [];

  for (const col of collections) {
    const mine = variables.filter((v) => v.variableCollectionId === col.id);
    summary.push({
      collection: col.name,
      id: col.id,
      modes: col.modes.map((m) => m.name).join(' | '),
      modeCount: col.modes.length,
      variables: mine.length,
    });

    console.log(`\n■ [${col.name}]`);
    console.log(`  id           : ${col.id}`);
    console.log(`  modes        : ${col.modes.map((m) => `${m.name} (${m.modeId})`).join(', ')}`);
    console.log(`  defaultMode  : ${col.defaultModeId}`);
    console.log(`  remote       : ${col.remote}`);
    console.log(`  변수         : ${mine.length}개`);

    for (const v of mine) {
      const vals = col.modes
        .map((m) => {
          const raw = v.valuesByMode[m.modeId];
          if (raw === undefined) return `${m.name}=<없음>`;
          if (raw && raw.type === 'VARIABLE_ALIAS') {
            const target = variables.find((x) => x.id === raw.id);
            return `${m.name}=→${target ? target.name : raw.id}`;
          }
          if (raw && typeof raw === 'object' && 'r' in raw) return `${m.name}=${toHex(raw)}`;
          return `${m.name}=${JSON.stringify(raw)}`;
        })
        .join('   ');
      console.log(`    ${v.name.padEnd(34)} ${String(v.resolvedType).padEnd(7)} ${vals}`);
    }
  }

  console.log('\n' + '='.repeat(72));
  console.log('요약');
  console.table(summary);

  // sync-adr-tokens.js 가 기대하는 컬렉션명 존재 여부 사전 점검
  const EXPECTED = 'Semantic Colors';
  const hit = collections.find((c) => c.name === EXPECTED);
  console.log(
    hit
      ? `✅ "${EXPECTED}" 컬렉션 존재 (id=${hit.id}, modes=${hit.modes.map((m) => m.name).join('/')}) → sync 스크립트 안전`
      : `⛔ "${EXPECTED}" 컬렉션 없음. 지금 sync-adr-tokens.js 를 실행하면 유령 컬렉션이 새로 생성됨.\n` +
          `   실제 컬렉션명: ${collections.map((c) => `"${c.name}"`).join(', ')}\n` +
          `   → sync 스크립트의 COLLECTION_NAME 을 위 이름 중 하나로 먼저 교정할 것.`
  );

  // 모드 이름 점검 (light/dark 분기가 Semantic 계층에 있어야 함 — 거버넌스 규칙 2)
  for (const col of collections) {
    const names = col.modes.map((m) => m.name.toLowerCase());
    const hasLight = names.some((n) => n.includes('light') || n.includes('라이트'));
    const hasDark = names.some((n) => n.includes('dark') || n.includes('다크'));
    if (hasLight !== hasDark) {
      console.warn(`⚠️  [${col.name}] Light/Dark 모드 비대칭: ${col.modes.map((m) => m.name).join(', ')}`);
    }
  }
})();
