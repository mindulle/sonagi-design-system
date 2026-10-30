'use client';

import React, { useState } from 'react';

interface TokenItem {
  name: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  description: string;
}

const colorTokens: TokenItem[] = [
  {
    name: 'Brand Primary',
    cssVar: '--sng-color-brand-primary',
    lightValue: '#b86a04',
    darkValue: '#ffc837',
    description: '민들레 브랜드 핵심 액션 (앰버 골드 / 골드)',
  },
  {
    name: 'Brand Accent / Gold',
    cssVar: '--sng-color-brand-accent',
    lightValue: '#eab308',
    darkValue: '#ffd166',
    description: '민들레 꽃잎 옐로우 및 핵심 하이라이트',
  },
  {
    name: 'Background Base',
    cssVar: '--sng-color-bg-base',
    lightValue: '#fbfbfa',
    darkValue: '#12151d',
    description: '캔버스 기본 배경 (아스팔트 스톤 / 스프링 스톤 화이트)',
  },
  {
    name: 'Background Surface',
    cssVar: '--sng-color-bg-surface',
    lightValue: '#ffffff',
    darkValue: '#1b202c',
    description: '카드, 패널, 모달 컨테이너 서피스 (회색 자갈돌)',
  },
  {
    name: 'Text Primary',
    cssVar: '--sng-color-text-primary',
    lightValue: '#18181b',
    darkValue: '#f1f5f9',
    description: '주요 제목 및 헤드라인 본문 텍스트 (스톤 차콜 / 슬레이트)',
  },
  {
    name: 'Text Muted',
    cssVar: '--sng-color-text-muted',
    lightValue: '#71717a',
    darkValue: '#64748b',
    description: '부차적 설명 및 캡션 텍스트',
  },
  {
    name: 'Border Default',
    cssVar: '--sng-color-border-default',
    lightValue: '#e4e4e7',
    darkValue: '#2c3547',
    description: '2px Stem 표준 경계선 컬러 (돌 이음매)',
  },
  {
    name: 'State Danger',
    cssVar: '--sng-color-state-danger',
    lightValue: '#ef4444',
    darkValue: '#f87171',
    description: '경고, 에러 및 파괴적 액션 컬러',
  },
];

export function ColorMatrix() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyVar = (cssVar: string) => {
    navigator.clipboard.writeText(`var(${cssVar})`);
    setCopiedToken(cssVar);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-md border-2 border-fd-border bg-fd-card">
      <div className="px-4 py-3 bg-fd-muted/40 border-b-2 border-fd-border flex items-center justify-between">
        <div>
          <h4 className="font-bold text-sm">W3C Semantic Colors Matrix</h4>
          <p className="text-xs text-fd-muted-foreground">
            Light / Dark 모드 1:1 페어링 및 클릭 시 CSS 변수 즉시 복사
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
          SSOT
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/20 font-mono text-[11px] text-fd-muted-foreground uppercase">
              <th className="px-4 py-3">Token Name</th>
              <th className="px-4 py-3">CSS Variable</th>
              <th className="px-4 py-3">Light Mode</th>
              <th className="px-4 py-3">Dark Mode (Obsidian)</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fd-border">
            {colorTokens.map((t) => (
              <tr key={t.cssVar} className="hover:bg-fd-muted/30 transition-colors">
                <td className="px-4 py-3 font-semibold">
                  <div>{t.name}</div>
                  <div className="text-[11px] font-normal text-fd-muted-foreground">
                    {t.description}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-amber-500">{t.cssVar}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded border border-black/10 inline-block shadow-sm"
                      style={{ backgroundColor: t.lightValue }}
                    />
                    <span className="font-mono text-[11px]">{t.lightValue}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded border border-white/20 inline-block shadow-sm"
                      style={{ backgroundColor: t.darkValue }}
                    />
                    <span className="font-mono text-[11px]">{t.darkValue}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => copyVar(t.cssVar)}
                    className="px-2.5 py-1 rounded border border-fd-border bg-fd-background hover:bg-fd-muted font-mono text-[11px] transition-colors"
                  >
                    {copiedToken === t.cssVar ? '✓ Copied' : 'Copy var()'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
