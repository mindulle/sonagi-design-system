import { EmbedBuilder, EmbedData, APIEmbed } from 'discord.js';

export type SonagiEmbedType = 'info' | 'success' | 'warning' | 'danger' | 'error';

const SONAGI_COLORS = {
  info: 0x1c2c4d,    // --sng-color-brand-primary
  success: 0x2ea043, // --sng-color-state-success
  warning: 0xd29922, // --sng-color-state-warning
  danger: 0xf85149,  // --sng-color-state-danger
  error: 0xf85149,   // v1.7 compat alias
};

/**
 * Sonagi 디자인 시스템이 적용된 Discord Embed Builder
 * 색상 헥스값을 감추고, 마크다운 컨벤션을 강제합니다.
 */
export class SonagiEmbed extends EmbedBuilder {
  constructor(data?: EmbedData | APIEmbed) {
    super(data);
    // 기본 타입은 info로 지정
    this.setType('info');
  }

  /**
   * 디자인 시스템 상태 토큰을 기반으로 색상을 결정합니다.
   */
  public setType(type: SonagiEmbedType): this {
    return super.setColor(SONAGI_COLORS[type]);
  }

  /**
   * Sonagi 컨벤션: 제목은 항상 볼드(**) 처리됩니다.
   */
  public setSonagiTitle(title: string, emoji?: string): this {
    const prefix = emoji ? `${emoji} ` : '';
    return super.setTitle(`${prefix}**${title}**`);
  }

  /**
   * Sonagi 컨벤션: 강조하고 싶은 메타데이터나 키워드는 인라인 코드블록(` `)으로 감쌉니다.
   */
  public addMetricField(name: string, value: string | number, inline: boolean = true): this {
    return super.addFields({
      name,
      value: `\`${value}\``,
      inline
    });
  }

  /**
   * Sonagi 컨벤션: 본문 텍스트가 인용구(>) 안에 담겨 깊이감을 줍니다.
   */
  public setQuoteDescription(description: string): this {
    const quoted = description.split('\n').map(line => `> ${line}`).join('\n');
    return super.setDescription(quoted);
  }

  // ⚠️ 원본 setColor를 직접 호출하면 에러를 던져 하드코딩을 런타임에서 방지합니다.
  public setColor(color: any): this {
    console.warn('[SonagiEmbed] 경고: setColor()를 직접 호출하지 마세요. 대신 setType()을 사용하세요.');
    return super.setColor(color);
  }
}
