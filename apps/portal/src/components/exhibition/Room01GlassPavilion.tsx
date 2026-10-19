import React from 'react';
import { motion } from 'framer-motion';
import { ExhibitionRoomLayout } from './ExhibitionRoomLayout';
import HeroScene from '../HeroScene';

export const Room01GlassPavilion: React.FC = () => {
  return (
    <ExhibitionRoomLayout
      id="room-01"
      roomTitle="ROOM 01 / 05 : THE GLASS PAVILION"
      roomSub="HANDCRAFTED SOFTWARE ATELIER • EST. 2026"
      metaRight="37.5665° N, 126.9780° E • ARCHITECTURAL MASTER V3.0"
      article="ATELIER CONSTITUTION • ARTICLE I"
      quoteKo='"도구가 완벽할 때, 손길은 비로소 자유로워진다."'
      quoteEn="When the machine is flawless, human soul finds its solace."
      progress="PROGRESS  01  /  05"
      nextLabel="SCROLL TO ENTER ROOM 02 ↓"
      nextSub="The Monolith of Solace"
      nextHref="#room-02"
      badgeColor="rain"
    >
      {/* 3D WebGL Three.js / Theatre.js Canvas (Background Layer) */}
      <div className="absolute inset-0 pointer-events-auto">
        <HeroScene />
      </div>

      {/* Reticle Overlay Guide Elements (Pointer events pass through) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Horizontal & Vertical Crosshair Axes */}
        <div className="absolute w-[600px] h-[1px] bg-[#1e2638]/50" />
        <div className="absolute h-[480px] w-[1px] bg-[#1e2638]/50" />

        {/* Concentric Reticles */}
        <div className="w-[400px] h-[400px] rounded-full border-2 border-[#4A90E2]/35 flex items-center justify-center">
          <div className="w-[180px] h-[180px] rounded-full border-2 border-[#ffd166]/75 bg-[#ffd166]/[0.03] flex items-center justify-center" />
        </div>

        {/* Centerpiece Stage Label */}
        <div className="absolute flex flex-col items-center text-center space-y-1.5 select-none -translate-y-2 pointer-events-auto bg-[#060911]/60 px-4 py-2 rounded border border-[#30363d]/40 backdrop-blur-sm">
          <span className="font-mono font-bold text-xs md:text-sm text-[#ffd166] tracking-wider">
            [ EXHIBIT A : SONIC DROPLET &amp; PAPERWEIGHT ]
          </span>
          <span className="font-sans text-[11px] text-[#94a3b8]">
            Real-time Three.js Glass Shader • Refraction Index 1.52
          </span>
          <span className="font-mono text-[10px] text-[#4A90E2]">
            Theatre.js Timeline Scrub Zone (0.00s ➔ 4.50s)
          </span>
        </div>
      </div>

      {/* 🌟 Floating Artwork Placard on the Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex flex-col absolute right-16 top-1/2 -translate-y-10 w-[340px] p-5 rounded-sm bg-[#090d16] border-2 border-[#30363d] space-y-2.5 z-20 shadow-2xl pointer-events-auto"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-[9px] text-[#ffd166] tracking-widest uppercase">
            GALLERY CAPTION • 01
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ffd166] animate-pulse" />
        </div>
        <h3 className="font-mono font-bold text-xs text-white tracking-wide uppercase">
          THE SONIC DROPLET IN GLASS
        </h3>
        <div className="w-full h-[1px] bg-[#30363d]" />
        <div className="flex flex-col space-y-1 font-sans text-[10px] text-[#94a3b8] leading-relaxed">
          <p>
            <strong className="text-gray-300">Medium :</strong> Procedural Water Droplet, Glass Dome, Obsidian
          </p>
          <p>
            <strong className="text-gray-300">Constitution :</strong> The True 2px Law &amp; 60-30-10 OKLCH Balance
          </p>
          <p className="text-[#ffd166] font-mono font-semibold pt-0.5">
            Archive : Mindulle Studio Official Catalog v0.1.0
          </p>
        </div>
      </motion.div>
    </ExhibitionRoomLayout>
  );
};
