import React from 'react';
import { motion } from 'framer-motion';
import { ExhibitionRoomLayout } from './ExhibitionRoomLayout';

interface ToolItem {
  id: string;
  name: string;
  badge: string;
  tag: string;
  desc: string;
  spec: string;
  href: string;
  iconSvg: React.ReactNode;
}

export const Room03CabinetOfInstruments: React.FC = () => {
  const tools: ToolItem[] = [
    {
      id: '01',
      name: 'VectorCraft',
      badge: 'BEZIER ENGINE',
      tag: 'PRECISION STYLUS FORGE',
      desc: '3차 베지어 곡선 보정과 태블릿 펜 필압을 지원하는 순수 벡터 공방. 단 1px의 오차 없는 선화 에셋을 직접 세공합니다.',
      spec: 'Engine: Affinity SDK • Output: SVG / VectorCraft',
      href: '/canvas',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" strokeWidth="2" />
          <circle cx="20" cy="12" r="3" stroke="#ffd166" strokeWidth="2" fill="#060911" />
          <path d="M18 15L12 28L15 31L20 20" stroke="#4A90E2" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 28L10 32L15 31Z" fill="#ffd166" />
          <path d="M22 15L28 28L26 32L20 20" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: '02',
      name: 'PhotoCraft',
      badge: 'ANALOG EMULSION',
      tag: 'RETRO GRAIN LAB',
      desc: '차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 에디터. 페트리코 질감과 감성 색감을 보정합니다.',
      spec: 'Filter: 35mm Grain • Output: OKLCH Canvas WebP',
      href: '/canvas',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" strokeWidth="2" />
          <circle cx="20" cy="20" r="13" stroke="#ffd166" strokeWidth="2" />
          <circle cx="20" cy="20" r="6" fill="#ffd166" />
          <path d="M15 12L25 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: '03',
      name: 'EffectCraft',
      badge: 'WEBGL & SHADER',
      tag: 'REALTIME PARTICLE ATELIER',
      desc: '실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 스튜디오. GPU 가속으로 물방울을 빚어냅니다.',
      spec: 'Pipeline: Three.js / R3F • GPU: Dedicated WebGL',
      href: '/playground',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" strokeWidth="2" />
          <path
            d="M20 8C20 8 12 18 12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24C28 18 20 8 20 8Z"
            stroke="#4A90E2"
            strokeWidth="2"
            fill="#4A90E2"
            fillOpacity="0.15"
          />
          <circle cx="20" cy="24" r="4" fill="#ffd166" />
        </svg>
      ),
    },
    {
      id: '04',
      name: 'DesignCraft',
      badge: 'W3C TOKEN SSOT',
      tag: 'LAYOUT COMPOSER',
      desc: 'The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기. 불필요한 시각적 노이즈를 걷어냅니다.',
      spec: 'Tokens: @mindulle/tokens • Rules: The 2px Law',
      href: '/catalog',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#ffd166" strokeWidth="2" />
          <rect x="10" y="10" width="8" height="8" stroke="#ffffff" strokeWidth="2" />
          <rect x="22" y="10" width="8" height="8" stroke="#4A90E2" strokeWidth="2" />
          <rect x="10" y="22" width="20" height="8" stroke="#ffd166" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: '05',
      name: 'FilmCraft',
      badge: 'TIMELINE DIRECTOR',
      tag: 'THEATRE.JS MOTION LAB',
      desc: '키프레임 타임라인과 가상 3D 카메라 워크를 직관적으로 연출하는 모션 디렉터. 스크롤에 반응하는 시네마틱 서사를 완성합니다.',
      spec: 'Studio: @theatre/studio • State: state.json',
      href: '/playground',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#30363d" strokeWidth="2" />
          <polygon points="16,13 28,20 16,27" fill="#ffd166" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="8" y1="33" x2="32" y2="33" stroke="#4A90E2" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: '06',
      name: 'Sonagi Draw',
      badge: 'CANVAS HARNESS',
      tag: 'COLLABORATIVE WHITEBOARD',
      desc: 'tldraw 기반의 실시간 화이트보드와 에이전트 연동 작업대. 기획 아이디어와 와이어프레임 뼈대를 가장 직관적으로 스케치합니다.',
      spec: 'Engine: Tldraw v3 • Bridge: canvasAdapter',
      href: '/canvas',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
          <rect width="40" height="40" rx="4" fill="#090d16" stroke="#4A90E2" strokeWidth="2" />
          <path d="M10 28C14 20 22 30 30 14" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="14" r="3" fill="#4A90E2" />
          <circle cx="10" cy="28" r="3" fill="#ffffff" />
        </svg>
      ),
    },
  ];

  return (
    <ExhibitionRoomLayout
      id="room-03"
      roomTitle="ROOM 03 / 05 : THE CABINET OF INSTRUMENTS"
      roomSub="THE SONAGI 6-IN-1 TOOLING SUITE • TIER 3"
      metaRight="SOVEREIGN TOOLING ARTIFACTS • 2PX ARCHITECTURE"
      article="ATELIER CONSTITUTION • ARTICLE III"
      quoteKo='"도구가 완전할 때, 창작자의 손길은 거침없이 뻗어 나간다."'
      quoteEn="When instruments reach perfection, the creator's touch flows without friction."
      progress="PROGRESS  03  /  05"
      nextLabel="SCROLL TO ENTER ROOM 04 ↓"
      nextSub="Five Sceneries of Solace"
      nextHref="#room-04"
      badgeColor="rain"
    >
      {/* 3x2 Grid Arena */}
      <div className="w-full h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 py-2">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ y: -4, borderColor: '#ffd166' }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-7 rounded-sm bg-[#090d16] border-2 border-[#30363d] flex flex-col justify-between shadow-xl relative overflow-hidden group transition-colors"
          >
            {/* Header: Icon + Number + Engine Badge */}
            <div className="flex items-center justify-between mb-4">
              {tool.iconSvg}
              <div className="flex items-center space-x-2.5">
                <span className="font-mono font-bold text-[11px] text-[#ffd166]">
                  ARTIFACT • {tool.id}
                </span>
                <span className="px-2 py-0.5 rounded-sm border border-[#4A90E2] bg-[#4A90E2]/10 text-[9px] font-mono font-bold text-[#4A90E2]">
                  {tool.badge}
                </span>
              </div>
            </div>

            {/* Mid: Title + Tagline + Body */}
            <div className="flex flex-col space-y-1.5 mb-4">
              <h3 className="font-serif font-bold text-2xl text-white group-hover:text-[#ffd166] transition-colors">
                {tool.name}
              </h3>
              <span className="font-mono font-bold text-[10px] text-[#4A90E2] tracking-wider uppercase">
                {tool.tag}
              </span>
              <p className="font-sans text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                {tool.desc}
              </p>
            </div>

            {/* Foot: Specs & Action Link */}
            <div className="flex items-center justify-between pt-3 border-t border-[#30363d]/60 font-mono text-[10px]">
              <span className="text-[#64748b]">{tool.spec}</span>
              <a
                href={tool.href}
                className="font-bold text-[#ffd166] hover:underline flex items-center space-x-1"
              >
                <span>VIEW BLUEPRINT</span>
                <span>➔</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </ExhibitionRoomLayout>
  );
};
