# @mindulle/discord-ui

Sonagi 디자인 시스템의 규칙을 Discord 봇 메시지(Embed)에 결정론적으로 강제(Enforcement)하기 위한 UI 래퍼 패키지입니다.

봇 개발 시 날것의 `discord.js` 색상 코드나 마크다운을 직접 타이핑하는 대신, 이 패키지의 `SonagiEmbed` 클래스를 사용하여 일관된 브랜드 경험을 유지할 수 있습니다.

## 설치

```bash
npm install @mindulle/discord-ui discord.js
# 또는
pnpm add @mindulle/discord-ui discord.js
```

> **Note:** `discord.js` (>=14.0.0)가 peerDependency로 필요합니다.

## 사용법 (Usage)

기존의 `EmbedBuilder` 대신 `SonagiEmbed`를 불러와 사용합니다.

```typescript
import { SonagiEmbed } from '@mindulle/discord-ui';

// 1. 기본 생성 (타입 미지정 시 'info' 네이비 색상 적용)
const embed = new SonagiEmbed()
  .setSonagiTitle('새로운 알림이 도착했습니다', '🔔')
  .setQuoteDescription('시스템 백업이 성공적으로 완료되었습니다.')
  .addMetricField('소요 시간', '3분 12초');

// 2. 상태(State) 명시적 지정
const errorEmbed = new SonagiEmbed()
  .setType('danger') // 빨간색(--sng-color-state-danger)이 자동 적용됨
  .setSonagiTitle('서버 에러 발생', '🚨')
  .setQuoteDescription('데이터베이스 연결에 실패했습니다.');

// 3. 디스코드 전송
channel.send({ embeds: [embed, errorEmbed] });
```

## 주요 기능 및 룰 (Rules)

이 클래스는 Sonagi 디자인 시스템의 **Discord Bot UI Guidelines**를 코드 레벨에서 강제합니다.

1. **색상 하드코딩 방지 (`setType`)**
   - `.setColor()`를 직접 호출하지 마십시오. (호출 시 콘솔 경고 발생)
   - `.setType('info' | 'success' | 'warning' | 'danger')`를 사용하여 시스템 지정 색상만 적용합니다.

2. **자동 마크다운 포맷팅**
   - `setSonagiTitle(title, emoji?)`: 제목 텍스트를 항상 **볼드체(`**`)\*\*로 감쌉니다.
   - `addMetricField(name, value)`: 수치나 핵심 데이터(value)를 **인라인 코드블록(` `)**으로 감싸 가독성을 높입니다.
   - `setQuoteDescription(text)`: 본문 내용을 **인용구(`> `)**로 감싸 입체감(Depth)을 부여합니다.
