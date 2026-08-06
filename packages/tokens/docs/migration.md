# Sonagi Design System - Migration Guide (v3.0)

이 문서는 이전 버전의 토큰 시스템에서 v3.0 `--sng-` 접두사 체계 및 `data-theme` 전환 체계로 마이그레이션하기 위한 가이드라인입니다.

---

## 1. CSS Variables 접두사 마이그레이션 (`--` ➔ `--sng-`)

디자인 토큰 이름 충돌 및 명확한 격리를 위해 모든 CSS 변수 이름에 `--sng-` 접두사가 도입되었습니다.

### 변수명 대조표 (예시)

| 이전 변수명             | 변경된 변수명               |
| :---------------------- | :-------------------------- |
| `--color-brand-primary` | `--sng-color-brand-primary` |
| `--color-bg-base`       | `--sng-color-bg-base`       |
| `--color-text-primary`  | `--sng-color-text-primary`  |
| `--font-sans`           | `--sng-font-sans`           |
| `--radius-base`         | `--sng-radius-base`         |

### 조치 방법

호스트 애플리케이션의 모든 `.css`, `.scss`, 혹은 컴포넌트 내 스타일시트 소스 코드에서 해당 변수 참조명을 전역 찾아바꾸기(Replace All) 하십시오.

---

## 2. 다크 모드 활성화 방식 변경 (`.dark` 클래스 ➔ `data-theme="dark"` 속성)

이전 버전의 다크 모드 처리는 `<html>`의 `class="dark"` 기반으로 스위칭되었으나, 테마 관리의 유연성과 다중 브랜드 지원을 위하여 속성 선택자(`[data-theme="dark"]`) 방식으로 개편되었습니다.

### 이전 방식 (클래스 토글)

```html
<html class="dark"></html>
```

```js
document.documentElement.classList.add('dark');
```

### 개편된 방식 (데이터 속성 변경)

```html
<html data-theme="dark"></html>
```

```js
// 다크 모드 설정
document.documentElement.setAttribute('data-theme', 'dark');

// 기본 라이트 모드로 복구
document.documentElement.removeAttribute('data-theme');
```
