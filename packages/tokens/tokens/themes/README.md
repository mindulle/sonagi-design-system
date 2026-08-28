# themes/ — 의도적으로 비어 있음 (3-Tier 확장 지점)

이 디렉토리는 **비어 있는 것이 정상 상태**입니다. 실수로 비워진 것이 아닙니다.

## 왜 비어 있는가

[ADR 0010](../../../../decisions/0010-delivery-consolidation-github-packages.md)에 따라 토큰 위계는 현재 **2-Tier**로 확정되어 있습니다.

```
primitives.json  →  semantics.json
                    └ Light / Dark 는 이 계층 내부의 Mode 분기로 처리
```

유효한 테마가 **가을 소나기(Sonagi Core) 단 하나**뿐인 상태에서 3번째 계층을 형식적으로 유지하는 것은 순수 오버헤드이므로, 직전까지 존재했던 `theme-desk-analyst.json`은 [ADR 0009](../../../../decisions/0009-typography-major-third-upgrade.md)에서 척결되었습니다.

## 왜 로더는 남겨두었는가

`scripts/build.js`의 테마 로더는 제거하지 않았습니다.

- `fs.existsSync(THEMES_DIR)` 가드가 걸려 있어(`build.js:117`) 이 디렉토리가 비어 있어도 빌드는 정상 동작합니다.
- 이것이 3-Tier로 복귀할 때 사용할 **확장 지점**입니다. 지금 지우면 나중에 재구현해야 합니다.

## 언제 다시 채우는가

**겨울 소나기 테마**를 착수하는 시점입니다. 전제 조건은 가을 소나기 테마가 안정적으로 정착했음이 확인되는 것입니다.

그 시점에 해야 할 일은 파일 하나를 추가하는 것뿐입니다:

```
themes/theme-winter-sonagi.json
```

파일명 규칙은 `theme-<name>.json` 이며, `theme-` 접두사가 제거된 나머지가 CSS 셀렉터가 됩니다:

```css
[data-theme='winter-sonagi'] {
  ...;
}
```

로더(`build.js:117-128`)가 자동으로 이 파일을 감지해 CSS 블록과 Storybook 프리뷰 셀렉터를 생성합니다. 빌드 스크립트 수정은 필요하지 않습니다.
