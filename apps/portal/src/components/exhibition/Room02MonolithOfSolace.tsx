import React from 'react';
import { motion } from 'framer-motion';
import { ExhibitionRoomLayout } from './ExhibitionRoomLayout';

export const Room02MonolithOfSolace: React.FC = () => {
  return (
    <ExhibitionRoomLayout
      id="room-02"
      roomTitle="ROOM 02 / 05 : THE MONOLITH OF SOLACE"
      roomSub="THE TRINITY ATELIER • DUAL THEME SPECIMEN"
      metaRight="DUAL THEME ENGINE • DEEP INK ↔ WARM PAPER"
      article="ATELIER CONSTITUTION • ARTICLE II"
      quoteKo='"거친 성벽의 방패(소나기) 안에 피어난, 가장 다정한 안식처(민들레)."'
      quoteEn="The savage shield of rain outside, the tender sanctuary of dandelion within."
      progress="PROGRESS  02  /  05"
      nextLabel="SCROLL TO ENTER ROOM 03 ↓"
      nextSub="The Cabinet of Instruments"
      nextHref="#room-03"
      badgeColor="gold"
    >
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* Monolith I : The Wild Sonagi (다크 / 2px 방패) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex-1 w-full h-[520px] md:h-[600px] p-8 md:p-10 rounded-sm bg-[#090d16] border-2 border-[#4A90E2] flex flex-col justify-between shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A90E2]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-[#4A90E2] tracking-wider uppercase">
              MONOLITH I • WILD ARCHITECTURE (소나기)
            </span>
            <span className="font-mono text-[10px] text-[#94a3b8]">
              DEEP INK (#060911) • 2PX SHIELD
            </span>
          </div>

          {/* Visual Specimen Reticle */}
          <div className="w-full h-[220px] rounded-sm bg-[#060911] border-2 border-[#1e2638] flex items-center justify-center relative overflow-hidden">
            <div className="w-[160px] h-[160px] rounded-full border-2 border-[#4A90E2]/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="w-[80px] h-[80px] rounded-full border border-[#4A90E2]/30 flex items-center justify-center" />
            </div>
            <span className="absolute font-mono font-bold text-xs tracking-widest text-[#4A90E2]">
              THE DIGITAL FORTRESS
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="font-serif font-bold text-xl md:text-2xl text-white">
              "얼어붙은 땅을 깨우는 벼락같은 몰입과 방패."
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#94a3b8] leading-relaxed">
              거칠고 폭발적인 기술력으로 창작자의 주권을 지켜내는 디지털 방파제. 그림자 없이 굵은 2px 선화로 뼈대를 세우는 네오 브루탈리즘 건축 헌법입니다.
            </p>
          </div>
        </motion.div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* Monolith II : The Thin Mindulle (라이트 / 웜 페이퍼 황금 코어) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="flex-1 w-full h-[520px] md:h-[600px] p-8 md:p-10 rounded-sm bg-[#faf8f5] border-2 border-[#d97706] text-[#0a0f1c] flex flex-col justify-between shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle Sunlit Glow */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ffd166]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-[#d97706] tracking-wider uppercase">
              MONOLITH II • LIVING SOUL (민들레)
            </span>
            <span className="font-mono text-[10px] text-[#8c6b45]">
              WARM PAPER (#FAF8F5) • GOLD CORE
            </span>
          </div>

          {/* Visual Specimen Reticle */}
          <div className="w-full h-[220px] rounded-sm bg-[#f2eee6] border-2 border-[#d9cdb8] flex items-center justify-center relative overflow-hidden">
            <div className="w-[160px] h-[160px] rounded-full border-2 border-[#d97706]/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="w-[80px] h-[80px] rounded-full border border-[#d97706]/30 flex items-center justify-center" />
            </div>
            <span className="absolute font-mono font-bold text-xs tracking-widest text-[#d97706]">
              THE LIVING SANCTUARY
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="font-serif font-bold text-xl md:text-2xl text-[#0a0f1c]">
              "척박한 콘크리트 틈에서 피어나는 다정함."
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#5c4a38] leading-relaxed">
              차가운 성벽의 족쇄를 풀고, 오후의 햇살과 젖은 흙내음처럼 창작자의 손길을 따스하게 보듬는 인간의 영혼. 섬세한 여백과 웜 화이트 종이 질감의 안식처입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </ExhibitionRoomLayout>
  );
};
