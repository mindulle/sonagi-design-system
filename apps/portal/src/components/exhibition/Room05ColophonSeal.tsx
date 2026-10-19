import React from 'react';
import { ExhibitionRoomLayout } from './ExhibitionRoomLayout';

export const Room05ColophonSeal: React.FC = () => {
  const credits = [
    {
      num: '01 / ARCHITECTURE',
      title: 'The True 2px Law',
      desc: '그림자를 배제하고 2px 솔리드 선화와 8px 스위스 그리드로 지어 올린 디지털 요새.',
    },
    {
      num: '02 / PALETTE',
      title: '60-30-10 OKLCH',
      desc: 'Deep Ink 60%, Rain Blue 30%, Dandelion Gold 10%의 엄격한 시각적 균형 헌법.',
    },
    {
      num: '03 / TOOLING SUITE',
      title: '6-in-1 Sovereign',
      desc: '실무에서 스스로를 검증하는 도구 생태계. 타협 없는 오픈소스 주권 소프트웨어.',
    },
  ];

  return (
    <ExhibitionRoomLayout
      id="room-05"
      roomTitle="ROOM 05 / 05 : THE COLOPHON & MASTER SEAL"
      roomSub="EXHIBITION EPILOGUE & MASTER COLOPHON"
      metaRight="MINDULLE MASTER BIBLE V3.0 • FINAL SEAL"
      article="ATELIER CONSTITUTION • EPILOGUE"
      quoteKo='"도구가 완전할 때, 손길은 비로소 자유로워진다."'
      quoteEn="So that you may step away from the screen, and walk into the dearest scenes of your life."
      progress="EXHIBITION COMPLETED"
      nextLabel="RE-READ FROM ROOM 01 ↺"
      nextSub="The Glass Pavilion"
      nextHref="#room-01"
      badgeColor="gold"
    >
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-4">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* Left: Master CI Seal Ensemble */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center relative select-none">
          <div className="w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border-2 border-[#30363d] flex items-center justify-center relative p-4">
            {/* Dashed Rain Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#4A90E2]/60 animate-spin-slow" />

            {/* Octagonal Bevel Dome */}
            <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] bg-[#090d16]/80 border border-[#30363d] rounded-2xl flex items-center justify-center relative shadow-2xl backdrop-blur-md">
              {/* Dynamic Wing-Sail SVG Vector */}
              <svg width="220" height="220" viewBox="0 0 400 400" fill="none" className="w-[220px] h-[220px]">
                <g transform="translate(195, 205)">
                  <path
                    d="M -16,72 C -24,58 -22,44 -14,38 C -6,44 -2,58 -16,72 Z"
                    fill="#ffd166"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <circle cx="-14" cy="52" r="3" fill="#ffffff" />
                  <path d="M -14,38 C -2,12 14,-25 8,-85" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                  <path
                    d="M -4,22 C -42,5 -75,-15 -85,-55 C -65,-46 -35,-42 3,-45 Z"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="#ffffff"
                    fillOpacity="0.1"
                  />
                  <path d="M -9,12 C -32,-6 -55,-20 -66,-42" stroke="#ffd166" strokeWidth="2.5" strokeLinecap="round" />
                  <path
                    d="M 3,-24 C -22,-40 -44,-58 -52,-88 C -38,-80 -18,-74 7,-72 Z"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="#ffffff"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M 8,-85 C 26,-58 40,-32 46,-2"
                    stroke="#ffd166"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                  <circle cx="8" cy="-85" r="6" fill="#ffd166" />
                  <circle cx="6" cy="-87" r="2" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>
          <span className="font-mono font-bold text-xs text-[#ffd166] tracking-widest mt-4">
            MINDULLE ATELIER MASTER SEAL • V0.1.0
          </span>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* Right: Colophon Editorial Content */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 max-w-2xl flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-2">
            <span className="font-mono font-bold text-[11px] text-[#ffd166] tracking-widest uppercase">
              MINDULLE ATELIER • SOVEREIGN SOFTWARE FORGE
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-white tracking-tight">
              "기계가 완벽해야 사람이 쉴 수 있다."
            </h2>
            <p className="font-serif italic text-base md:text-lg text-[#ffd166]/90">
              When the machine is flawless, the human soul finds its solace.
            </p>
            <p className="font-sans text-xs md:text-sm text-[#94a3b8] leading-relaxed pt-1">
              우리는 가장 엄격하고 단단한 2px 건축의 성벽을 짓습니다. 당신이 차가운 화면을 끄고, 삶의 가장 소중한 장면 속으로 걸어 들어갈 수 있도록.
            </p>
          </div>

          {/* 3-Column Swiss Grid Colophon Credits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {credits.map((c) => (
              <div
                key={c.num}
                className="p-4 rounded-sm bg-[#090d16] border border-[#30363d] flex flex-col justify-between space-y-2 shadow-lg"
              >
                <div>
                  <span className="font-mono font-bold text-[10px] text-[#4A90E2] tracking-wider block mb-1">
                    {c.num}
                  </span>
                  <h4 className="font-mono font-bold text-xs text-white">
                    {c.title}
                  </h4>
                </div>
                <p className="font-sans text-[11px] text-[#94a3b8] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="https://github.com/mindulle/sonagi-design-system"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-[#ffd166] text-black font-mono font-bold text-xs tracking-wider rounded-sm hover:bg-[#ffd166]/90 transition-all shadow-lg shadow-[#ffd166]/20"
            >
              ENTER THE ATELIER ➔
            </a>
            <a
              href="https://github.com/mindulle"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-[#090d16] border-2 border-[#30363d] text-white font-mono font-bold text-xs tracking-wider rounded-sm hover:border-[#ffd166] transition-all"
            >
              EXPLORE CODE REPOSITORY
            </a>
          </div>
        </div>
      </div>
    </ExhibitionRoomLayout>
  );
};
