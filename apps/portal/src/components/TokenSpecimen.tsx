import React from 'react';

export const TokenSpecimen: React.FC = () => {
  const colors = [
    { name: 'Warm Paper', hex: '#faf8f5', role: '60% Base (Atelier Canvas)' },
    { name: 'Deep Ink', hex: '#1c1514', role: '30% Structure (2px Crisp Line)' },
    { name: 'Dandelion Gold', hex: '#d97706', role: '10% Soul Core (Wing-Sail Accent)' },
    { name: 'Sonagi Rain', hex: '#2563eb', role: 'Dynamic Ripple (Tooling Blue)' },
    { name: 'Slate Border', hex: '#30363d', role: 'Card & Divider Frame' },
    { name: 'Dark Base', hex: '#060911', role: 'Deep Obsidian Dark Canvas' },
  ];

  const typography = [
    { label: 'H1 Display', size: '64px', sample: 'Mindulle Studio.' },
    { label: 'H2 Section', size: '36px', sample: '아늑한 공방과 자유로운 생명력' },
    { label: 'H3 Card', size: '24px', sample: 'The Sonagi Tooling Suite' },
    { label: 'Body Base', size: '16px', sample: '도구가 완벽할 때, 손길은 비로소 자유로워진다.' },
    { label: 'Caption Mono', size: '12px', sample: 'SOUL & HARNESS • EST. 2026 • W3C TOKENS' },
  ];

  return (
    <section id="tokens" className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#060911]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border-2 border-white/40 bg-white/5 text-gray-300 mb-4">
            FOUNDATION SPECIMEN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Sonagi Design System V3 Specimen
          </h2>
          <p className="text-sng-muted text-base max-w-2xl mx-auto">
            W3C 토큰 표준과 2px 테두리, 4px 모서리 라디우스의 네오 브루탈리즘 규칙을 시각화합니다.
          </p>
        </div>

        {/* Color Palette Grid */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-sng-muted mb-4 uppercase tracking-wider">
            01. Semantic &amp; Brand Colors (OKLCH Derived)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                className="bg-[#090d16] border-2 border-sng-border rounded-sm p-3 flex flex-col justify-between"
              >
                <div
                  className="w-full h-16 rounded-sm mb-3 border border-black/40"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <p className="text-xs font-bold text-white truncate">{c.name}</p>
                  <p className="text-[11px] font-mono text-sng-rain">{c.hex}</p>
                  <p className="text-[10px] text-sng-muted mt-1 leading-tight">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neo-brutalist Radius & Border Specimen */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-sng-muted mb-4 uppercase tracking-wider">
            02. Stroke &amp; Corner Radius Rules (Wild Sonagi)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#090d16] border-2 border-white/80 rounded-[4px] p-4 text-center">
              <span className="font-mono text-xs text-white block mb-1">sm (4px)</span>
              <span className="text-[11px] text-sng-muted">Default for Buttons &amp; Cards</span>
            </div>
            <div className="bg-[#090d16] border-2 border-sng-rain rounded-[8px] p-4 text-center">
              <span className="font-mono text-xs text-sng-rain block mb-1">md (8px)</span>
              <span className="text-[11px] text-sng-muted">Featured Panels &amp; Modals</span>
            </div>
            <div className="bg-[#090d16] border-2 border-sng-dandelion rounded-[12px] p-4 text-center">
              <span className="font-mono text-xs text-sng-dandelion block mb-1">lg (12px)</span>
              <span className="text-[11px] text-sng-muted">Soft Surface Containers</span>
            </div>
            <div className="bg-[#090d16] border-2 border-sng-cyan rounded-full p-4 text-center">
              <span className="font-mono text-xs text-sng-cyan block mb-1">full (Pill)</span>
              <span className="text-[11px] text-sng-muted">Tags &amp; Status Badges</span>
            </div>
          </div>
        </div>

        {/* Typography Scale */}
        <div>
          <h3 className="text-sm font-mono text-sng-muted mb-4 uppercase tracking-wider">
            03. Type Scale Hierarchy
          </h3>
          <div className="bg-[#090d16] border-2 border-sng-border rounded-sm divide-y-2 divide-sng-border">
            {typography.map((t) => (
              <div
                key={t.label}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-sng-rain w-28 shrink-0">{t.label}</span>
                  <span className="text-xs font-mono text-sng-muted w-16 shrink-0">{t.size}</span>
                  <span
                    className="text-white font-medium truncate"
                    style={{ fontSize: `clamp(14px, 1.5vw, ${t.size})` }}
                  >
                    {t.sample}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
