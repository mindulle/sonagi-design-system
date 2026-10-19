import React from 'react';

export interface ExhibitionRoomLayoutProps {
  id: string;
  roomTitle: string;
  roomSub: string;
  metaRight: string;
  article: string;
  quoteKo: string;
  quoteEn: string;
  progress: string;
  nextLabel: string;
  nextSub?: string;
  nextHref: string;
  badgeColor?: 'rain' | 'gold';
  children: React.ReactNode;
}

export const ExhibitionRoomLayout: React.FC<ExhibitionRoomLayoutProps> = ({
  id,
  roomTitle,
  roomSub,
  metaRight,
  article,
  quoteKo,
  quoteEn,
  progress,
  nextLabel,
  nextSub,
  nextHref,
  badgeColor = 'rain',
  children,
}) => {
  return (
    <section
      id={id}
      className="relative w-full h-screen min-h-[900px] flex flex-col justify-between p-4 md:p-12 bg-[#060911] text-gray-100 snap-start overflow-hidden border-b-2 border-[#30363d]"
    >
      {/* 2px Solid Architectural Outer Boundary */}
      <div className="relative w-full h-full max-w-[1824px] mx-auto flex flex-col justify-between border-2 border-[#30363d] p-0 z-10 pointer-events-auto">
        {/* 4 Corner Cross Marks (+) */}
        <span className="absolute -top-3 -left-2 text-[#ffd166] font-mono text-lg font-bold pointer-events-none select-none z-20">
          +
        </span>
        <span className="absolute -top-3 -right-2 text-[#ffd166] font-mono text-lg font-bold pointer-events-none select-none z-20">
          +
        </span>
        <span className="absolute -bottom-4 -left-2 text-[#ffd166] font-mono text-lg font-bold pointer-events-none select-none z-20">
          +
        </span>
        <span className="absolute -bottom-4 -right-2 text-[#ffd166] font-mono text-lg font-bold pointer-events-none select-none z-20">
          +
        </span>

        {/* 01. Header : Architectural Bar */}
        <header className="h-[72px] px-8 flex items-center justify-between border-b-2 border-[#30363d] bg-[#090d16] flex-shrink-0">
          {/* Brand Identity */}
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-[0.2em] text-white">
              M I N D U L L E &nbsp; S T U D I O
            </span>
            <span className="font-sans text-[10px] text-[#94a3b8] tracking-wider uppercase">
              {roomSub}
            </span>
          </div>

          {/* Room Indicator Badge */}
          <div
            className={`px-4 py-1.5 rounded-sm border-2 text-[11px] font-mono font-bold tracking-wider ${
              badgeColor === 'gold'
                ? 'border-[#ffd166] bg-[#ffd166]/10 text-[#ffd166]'
                : 'border-[#4A90E2] bg-[#4A90E2]/10 text-[#4A90E2]'
            }`}
          >
            {roomTitle}
          </div>

          {/* Coordinates & Spec */}
          <div className="hidden md:block font-mono text-[11px] text-[#94a3b8] tracking-wider">
            {metaRight}
          </div>
        </header>

        {/* 02. Centerpiece Stage */}
        <div className="flex-1 relative flex items-center justify-center p-6 md:p-8 overflow-hidden bg-[#060911]">
          {children}
        </div>

        {/* 03. Bottom Section : Manifesto & Navigation Bar */}
        <footer className="h-auto md:h-[216px] px-8 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t-2 border-[#30363d] bg-[#090d16] flex-shrink-0">
          {/* Left: Manifesto Editorial */}
          <div className="max-w-[1180px] flex flex-col space-y-1.5">
            <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-[#ffd166]">
              {article}
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-white tracking-tight">
              {quoteKo}
            </h2>
            <p className="font-serif italic text-sm md:text-base text-[#ffd166]/90 tracking-wide">
              {quoteEn}
            </p>
          </div>

          {/* Right: Curated Route CTA */}
          <div className="flex flex-col items-start md:items-end space-y-2.5 flex-shrink-0">
            <span className="font-mono text-[11px] font-bold text-[#4A90E2] tracking-widest">
              {progress}
            </span>
            <a
              href={nextHref}
              className="inline-flex flex-col items-center justify-center px-6 py-3 border-2 border-[#ffd166] bg-[#ffd166]/10 text-[#ffd166] rounded-sm hover:bg-[#ffd166] hover:text-black transition-all shadow-lg shadow-[#ffd166]/10 group"
            >
              <span className="font-mono font-bold text-xs tracking-wider group-hover:scale-105 transition-transform">
                {nextLabel}
              </span>
              {nextSub && (
                <span className="font-sans text-[9px] text-[#94a3b8] group-hover:text-black/80 transition-colors">
                  {nextSub}
                </span>
              )}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
