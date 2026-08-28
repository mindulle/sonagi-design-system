/**
 * 25-fix-publish-blockers.js
 *
 * 목적: Figma 라이브러리 퍼블리시를 막는 "유효하지 않은 에셋" 2건을 해소한다.
 *
 * 대상 파일: Sonagi Design System V3 (key AEoW19jmlUh3rFgzhhV1vH)
 *
 * ┌─ 진단 (REST 검수, 2026-08-28) ────────────────────────────────────────────┐
 * │ 1) Button (159:422) — "충돌하는 속성 값"                                  │
 * │    자식 61개 / 고유 조합 60개. Size=Md, Type=Ghost, State=Hover 가 2개.   │
 * │      - 159:416   y=415  발행이력 있음 (key 1c9deea5)  ← 정본              │
 * │      - 194:1239  y=425  발행이력 없음, +10/+10 오프셋 ← 실수 복제본        │
 * │    세트는 10개씩 6행(y=-85,-14,49,344,415,478) 그리드인데 194:1239 만     │
 * │    y=425 에 떠 있어 그리드를 깨뜨린다. → 194:1239 삭제.                   │
 * │                                                                          │
 * │ 2) Input (179:1682) — "사용되지 않는 속성"                                │
 * │    BOOLEAN 속성 4개 중 2개가 바인딩 0건:                                  │
 * │      - Show Label#179:305   15건  OK                                     │
 * │      - Show Hint#179:321    12건  OK                                     │
 * │      - Left Icon#179:337     0건  🔴                                      │
 * │      - Right Icon#179:353    0건  🔴                                      │
 * │    15개 variant 전체가 [Label, Field, Hint] 로 동일하며 아이콘 레이어가   │
 * │    아예 존재하지 않는다. 즉 바인딩할 대상이 없다. → 두 속성 삭제.         │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * 아이콘을 나중에 도입할 때는 BOOLEAN 이 아니라 이미 발행된 `Icon Wrapper`
 * 컴포넌트 세트(177:764)를 INSTANCE_SWAP 으로 물리는 것이 맞다. BOOLEAN 가시성
 * 속성을 미리 선언해 두면 잘못된 설계에 선결제하게 되므로 지금은 제거한다.
 *
 * 실행: Chrome 개발자도구 콘솔에 그대로 붙여넣기.
 * 성질: 검증 후 변경(verify-then-mutate), 멱등(idempotent). 재실행 안전.
 */

(async () => {
  const BUTTON_SET = '159:422';
  const STRAY_VARIANT = '194:1239';
  const STRAY_NAME = 'Size=Md, Type=Ghost, State=Hover';
  const CANONICAL_VARIANT = '159:416';

  const INPUT_SET = '179:1682';
  const UNUSED_PROPS = ['Left Icon#179:337', 'Right Icon#179:353'];

  const log = [];
  const ok = (m) => { console.log('%c✅ ' + m, 'color:#2ea043'); log.push('OK   ' + m); };
  const skip = (m) => { console.log('%c⏭️  ' + m, 'color:#8b949e'); log.push('SKIP ' + m); };
  const fail = (m) => { console.log('%c❌ ' + m, 'color:#f85149'); log.push('FAIL ' + m); };

  const byId = async (id) =>
    figma.getNodeByIdAsync ? await figma.getNodeByIdAsync(id) : figma.getNodeById(id);

  // 레이어 트리를 훑어 특정 속성 키의 바인딩 수를 센다.
  const countBindings = (node, propKey) => {
    let n = 0;
    const walk = (x) => {
      const refs = x.componentPropertyReferences;
      if (refs) for (const k in refs) if (refs[k] === propKey) n++;
      if ('children' in x) x.children.forEach(walk);
    };
    walk(node);
    return n;
  };

  // ───────────────────────────── 1. Button 중복 variant ─────────────────────
  try {
    const set = await byId(BUTTON_SET);
    if (!set || set.type !== 'COMPONENT_SET') {
      fail(`Button 세트 ${BUTTON_SET} 를 찾을 수 없거나 COMPONENT_SET 이 아님`);
    } else {
      const stray = await byId(STRAY_VARIANT);

      if (!stray || stray.removed) {
        skip(`Button: ${STRAY_VARIANT} 없음 — 이미 처리됨`);
      } else if (stray.name !== STRAY_NAME) {
        // 안전장치: 이름이 다르면 엉뚱한 노드일 수 있으므로 건드리지 않는다.
        fail(`Button: ${STRAY_VARIANT} 의 이름이 예상과 다름 ("${stray.name}" ≠ "${STRAY_NAME}") — 중단`);
      } else if (!stray.parent || stray.parent.id !== BUTTON_SET) {
        fail(`Button: ${STRAY_VARIANT} 의 부모가 ${BUTTON_SET} 이 아님 — 중단`);
      } else {
        // 정본이 살아있는지 확인한 뒤에만 삭제한다.
        const canonical = await byId(CANONICAL_VARIANT);
        if (!canonical || canonical.removed || canonical.name !== STRAY_NAME) {
          fail(`Button: 정본 ${CANONICAL_VARIANT} 가 없거나 이름 불일치 — 삭제 중단 (둘 다 잃을 위험)`);
        } else {
          const before = set.children.length;
          stray.remove();
          ok(`Button: 중복 variant ${STRAY_VARIANT} 삭제 (자식 ${before} → ${set.children.length}), 정본 ${CANONICAL_VARIANT} 유지`);
        }
      }
    }
  } catch (e) {
    fail('Button 처리 중 예외: ' + e.message);
  }

  // ───────────────────────────── 2. Input 미사용 속성 ───────────────────────
  try {
    const set = await byId(INPUT_SET);
    if (!set || set.type !== 'COMPONENT_SET') {
      fail(`Input 세트 ${INPUT_SET} 를 찾을 수 없거나 COMPONENT_SET 이 아님`);
    } else {
      for (const prop of UNUSED_PROPS) {
        const defs = set.componentPropertyDefinitions || {};
        if (!(prop in defs)) {
          skip(`Input: 속성 "${prop}" 없음 — 이미 처리됨`);
          continue;
        }
        // 안전장치: 실제로 바인딩이 0건인지 재확인한 뒤에만 삭제한다.
        const bindings = countBindings(set, prop);
        if (bindings > 0) {
          fail(`Input: 속성 "${prop}" 이 ${bindings}건 바인딩되어 있음 — 삭제 중단 (진단과 불일치)`);
          continue;
        }
        set.deleteComponentProperty(prop);
        ok(`Input: 미사용 BOOLEAN 속성 "${prop}" 삭제 (바인딩 0건 확인)`);
      }

      const left = Object.keys(set.componentPropertyDefinitions || {});
      console.log('   Input 잔여 속성:', left);
    }
  } catch (e) {
    fail('Input 처리 중 예외: ' + e.message);
  }

  // ───────────────────────────── 결과 ───────────────────────────────────────
  console.log('%c── 25-fix-publish-blockers 완료 ──', 'font-weight:bold');
  log.forEach((l) => console.log('   ' + l));
  const failed = log.filter((l) => l.startsWith('FAIL')).length;
  if (failed) {
    console.log(`%c⚠️  실패 ${failed}건 — 위 메시지 확인 후 재실행하지 말고 원인을 먼저 해결하십시오.`, 'color:#d29922');
  } else {
    console.log('%c이제 Assets 패널에서 라이브러리 퍼블리시를 다시 시도하십시오.', 'color:#2ea043');
  }
})();

/**
 * ── 이 스크립트가 고치지 않는, 별도 판단이 필요한 불일치 ────────────────────
 *
 * (a) Input 의 State=Error 3개 variant 에서 `Hint` 레이어가 `Show Hint#179:321`
 *     에 바인딩되어 있지 않다 (나머지 12개는 바인딩됨). 퍼블리시 차단 사유는
 *     아니지만(속성 전체 바인딩이 12 > 0), Error 상태에서 Hint 를 항상 노출할
 *     의도였다면 의도적, 실수였다면 버그다. 확인 필요.
 *
 * (b) Input 의 State variant 값이 `Error` 인데 형제 세트인 Select / Textarea 는
 *     `Danger` 를 쓴다. 토큰 계층도 ADR 0006 / PR #31 에서 state-error →
 *     state-danger 로 통일했다. Input 만 `Error` 로 남아 있어 일관성이 깨진다.
 *     다만 variant 값 변경은 기존 인스턴스를 끊는 breaking change 이므로
 *     여기서 임의로 바꾸지 않는다.
 *
 * (c) 발행된 컴포넌트 세트 15개 중 Description 이 작성된 것은 Button 하나뿐이다
 *     (14개 공란). design-ops 규칙 4 위반. 별도 스크립트로 일괄 보강 필요.
 */
