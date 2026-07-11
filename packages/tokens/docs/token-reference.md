# Sonagi Design System - Token Reference

Sonagi 디자인 시스템 v3.0의 모든 디자인 토큰 명세입니다.

## 1. Primitive Tokens (원시 토큰)

- **정의 위치:** `tokens/primitives.json`
- **설명:** 원시 값들을 정의한 기초 레이어입니다. 컴포넌트나 웹페이지에서 이 값을 직접 가져다 쓰는 것은 엄격히 금지됩니다. (반드시 Semantic 토큰을 거쳐야 합니다.)

### 대표 색상 팔레트

- `--sng-color-blue-50` ~ `900`
- `--sng-color-neutral-50` ~ `950`

---

## 2. Semantic Tokens (시맨틱 토큰)

- **정의 위치:** `tokens/semantics.json`
- **설명:** 의미와 쓰임새를 나타내는 핵심 토큰 레이어입니다. 라이트/다크 테마 값이 분기되어 매핑됩니다.

### 색상 (Colors)

| 변수명                            | 라이트 값 | 다크 값   | 사용 의도                                     |
| :-------------------------------- | :-------- | :-------- | :-------------------------------------------- |
| `--sng-color-brand-primary`       | `#1c2c4d` | `#1c2c4d` | 메인 브랜드 색상, CTA 버튼 채움, 주요 헤더    |
| `--sng-color-brand-primary-dark`  | `#0a1128` | `#0a1128` | 깊은 인디고/블랙 느낌의 무거운 브랜드 톤      |
| `--sng-color-brand-primary-hover` | `#1275b5` | `#1275b5` | 주 버튼 마우스 호버 상태                      |
| `--sng-color-brand-logo`          | `#00ffcc` | `#00ffcc` | 워드마크 포인트 도트 전용 (UI 직접 사용 금지) |
| `--sng-color-bg-base`             | `#faf9f7` | `#010609` | 전체 화면의 기본 배경색                       |
| `--sng-color-bg-surface`          | `#fff8f2` | `#0d1117` | 카드, 사이드바, 패널 영역 배경색              |
| `--sng-color-bg-elevated`         | `#ffffff` | `#161b22` | 모달 팝업, 툴팁, 플로팅 컨테이너 배경색       |
| `--sng-color-bg-overlay`          | `#f0ede8` | `#1c2128` | 마우스 호버 오버레이, 경계 배경색             |
| `--sng-color-text-primary`        | `#0d1117` | `#f0f6fc` | 기본 텍스트, 제목 등 주 가독 영역             |
| `--sng-color-text-secondary`      | `#30363d` | `#c9d1d9` | 보조 설명글, 메타 정보 등 보조 텍스트         |
| `--sng-color-text-muted`          | `#8b949e` | `#8b949e` | 입력 힌트(Placeholder), 비활성 레이블         |
| `--sng-color-text-disabled`       | `#c9d1d9` | `#484f58` | 완전히 비활성화된 글자 색상                   |
| `--sng-color-text-inverse`        | `#faf9f7` | `#010609` | 다크 배경 위의 텍스트 (예: 주 버튼 라벨)      |
| `--sng-color-border-default`      | `#e6eaef` | `#30363d` | 카드 경계선, 인풋 테두리 등 기본 분리선       |
| `--sng-color-border-subtle`       | `#f0ede8` | `#1c2128` | 약한 선, 테이블 제브라 분리선                 |
| `--sng-color-border-strong`       | `#1c2c4d` | `#1c2c4d` | 포커스 포인터, 강한 대조 테두리               |

### 상태 컬러 (State Colors)

| 변수명    | 라이트 값 | 다크 값   | 라이트 배경 | 다크 배경               |
| :-------- | :-------- | :-------- | :---------- | :---------------------- |
| `success` | `#2ea043` | `#2ea043` | `#d4edda`   | `rgba(46,160,67,0.15)`  |
| `warning` | `#d29922` | `#d29922` | `#fff3cd`   | `rgba(210,153,34,0.15)` |
| `error`   | `#f85149` | `#f85149` | `#fde8e8`   | `rgba(248,81,73,0.15)`  |
| `info`    | `#4A90E2` | `#4A90E2` | `#e8f4fd`   | `rgba(74,144,226,0.15)` |
