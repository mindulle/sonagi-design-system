import React from 'react';
import { motion } from 'framer-motion';
import { ExhibitionRoomLayout } from './ExhibitionRoomLayout';

interface SceneryItem {
  num: string;
  title: string;
  sub: string;
  desc: string;
  svgArtwork: React.ReactNode;
}

export const Room04FiveSceneries: React.FC = () => {
  const sceneries: SceneryItem[] = [
    {
      num: 'SCENE I',
      title: '비 온 뒤의 쉼',
      sub: 'Petrichor & Clarity',
      desc: '창문에 흘러내리던 굵은 빗방울이 맑게 개며 스며드는 아침 햇살과 젖은 흙냄새의 정화.',
      svgArtwork: (
        <svg width="100%" height="240" viewBox="0 0 288 280" fill="none" className="w-full h-full">
          <rect width="288" height="280" fill="#060911" />
          <line x1="144" y1="20" x2="144" y2="260" stroke="#30363d" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="20" y1="140" x2="268" y2="140" stroke="#30363d" strokeWidth="1.5" strokeDasharray="4 4" />
          <path
            d="M90 60C90 60 84 80 84 90C84 93.3 86.7 96 90 96C93.3 96 96 93.3 96 90C96 80 90 60 90 60Z"
            stroke="#4A90E2"
            strokeWidth="2"
            fill="#4A90E2"
            fillOpacity="0.2"
          />
          <path
            d="M190 90C190 90 186 104 186 112C186 114.2 187.8 116 190 116C192.2 116 194 114.2 194 112C194 104 190 90 190 90Z"
            stroke="#4A90E2"
            strokeWidth="1.5"
            fill="#4A90E2"
            fillOpacity="0.3"
          />
          <line x1="90" y1="96" x2="90" y2="130" stroke="#4A90E2" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
          <circle cx="144" cy="140" r="50" stroke="#ffd166" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.7" />
          <circle cx="144" cy="140" r="16" fill="#ffd166" fillOpacity="0.1" stroke="#ffd166" strokeWidth="2" />
        </svg>
      ),
    },
    {
      num: 'SCENE II',
      title: '즉흥적인 모험',
      sub: 'The Sunset Horizon',
      desc: '계획된 일상의 틀을 깨부수고, 노을빛으로 물드는 붉은 해안도로를 향해 훌쩍 떠나는 지평선.',
      svgArtwork: (
        <svg width="100%" height="240" viewBox="0 0 288 280" fill="none" className="w-full h-full">
          <rect width="288" height="280" fill="#060911" />
          <line x1="20" y1="160" x2="268" y2="160" stroke="#ffd166" strokeWidth="2" />
          <path
            d="M104 160C104 138 122 120 144 120C166 120 184 138 184 160"
            stroke="#ffd166"
            strokeWidth="2"
            fill="#ffd166"
            fillOpacity="0.15"
          />
          <path
            d="M30 180C60 176 90 184 120 180C150 176 180 184 210 180C240 176 260 182 270 180"
            stroke="#4A90E2"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path d="M144 160C130 190 80 210 50 260" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M144 160C160 190 220 220 250 260" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: 'SCENE III',
      title: '질긴 생명력',
      sub: 'Dandelion in Asphalt',
      desc: '차가운 콘크리트 틈바구니에서 기어이 피어나 바람을 타고 하늘로 날아가는 노란 솜털 홀씨.',
      svgArtwork: (
        <svg width="100%" height="240" viewBox="0 0 288 280" fill="none" className="w-full h-full">
          <rect width="288" height="280" fill="#060911" />
          <path d="M40 240L110 200L144 215L180 195L250 240" stroke="#30363d" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M144 215C142 180 140 150 144 130" stroke="#ffd166" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="144" cy="120" r="14" fill="#ffd166" stroke="#ffffff" strokeWidth="1.5" />
          <g stroke="#ffd166" strokeWidth="1.5">
            <line x1="160" y1="100" x2="175" y2="85" />
            <circle cx="177" cy="83" r="2.5" fill="#ffd166" />
            <line x1="180" y1="70" x2="200" y2="55" />
            <circle cx="202" cy="53" r="3" fill="#ffd166" />
            <line x1="130" y1="90" x2="115" y2="75" />
            <circle cx="113" cy="73" r="2" fill="#ffd166" />
          </g>
        </svg>
      ),
    },
    {
      num: 'SCENE IV',
      title: '아늑한 아틀리에',
      sub: 'The Sunlit Workshop',
      desc: '세상의 비바람을 뚫고, 오후의 햇살이 가득 쏟아지는 작업대 위에서 다시 날개를 펴는 공방.',
      svgArtwork: (
        <svg width="100%" height="240" viewBox="0 0 288 280" fill="none" className="w-full h-full">
          <rect width="288" height="280" fill="#060911" />
          <polygon points="60,20 180,20 260,240 140,240" fill="#ffd166" fillOpacity="0.08" />
          <line x1="30" y1="210" x2="260" y2="210" stroke="#30363d" strokeWidth="2" />
          <circle cx="144" cy="180" r="28" stroke="#4A90E2" strokeWidth="2" />
          <line x1="144" y1="140" x2="144" y2="210" stroke="#ffd166" strokeWidth="2" />
          <circle cx="144" cy="140" r="4" fill="#ffd166" />
          <rect x="70" y="195" width="45" height="15" rx="2" stroke="#ffffff" strokeWidth="1.5" fill="#060911" />
        </svg>
      ),
    },
    {
      num: 'SCENE V',
      title: '궁극의 안식처',
      sub: 'The Midnight Hearth',
      desc: '차가운 밤공기를 뒤로하고, 잠든 아이의 따뜻한 무게를 안고 현관문을 열고 들어오는 거실.',
      svgArtwork: (
        <svg width="100%" height="240" viewBox="0 0 288 280" fill="none" className="w-full h-full">
          <rect width="288" height="280" fill="#060911" />
          <path
            d="M60 50C60 66 74 80 90 80C78 80 68 70 68 58C68 54 70 51 72 48C65 47 60 48 60 50Z"
            fill="#4A90E2"
            stroke="#4A90E2"
            strokeWidth="1.5"
          />
          <path
            d="M104 260L104 140C104 118 122 100 144 100C166 100 184 118 184 140L184 260"
            stroke="#ffd166"
            strokeWidth="2.5"
            fill="#ffd166"
            fillOpacity="0.12"
          />
          <circle cx="144" cy="180" r="24" fill="#ffd166" fillOpacity="0.3" stroke="#ffd166" strokeWidth="2" />
          <circle cx="144" cy="180" r="10" fill="#ffd166" />
        </svg>
      ),
    },
  ];

  return (
    <ExhibitionRoomLayout
      id="room-04"
      roomTitle="ROOM 04 / 05 : FIVE SCENERIES OF SOLACE"
      roomSub="POETIC MANIFESTO POSTER GALLERY • TIER 1"
      metaRight="EMOTIONAL GROUNDING • 5 CINEMATIC SCENERIES"
      article="ATELIER CONSTITUTION • ARTICLE IV"
      quoteKo='"겨울 끝, 민들레."'
      quoteEn="At winter's end, dandelion blooms through the stone."
      progress="PROGRESS  04  /  05"
      nextLabel="SCROLL TO ENTER ROOM 05 ↓"
      nextSub="The Colophon & Master Seal"
      nextHref="#room-05"
      badgeColor="rain"
    >
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-5 py-2">
        {sceneries.map((s) => (
          <motion.div
            key={s.num}
            whileHover={{ y: -6, borderColor: 'var(--mds-color-brand-accent, #ffd166)' }}
            transition={{ duration: 0.25 }}
            className="flex-1 w-full h-[520px] md:h-[600px] p-5 md:p-6 rounded-sm bg-mds-card border-2 border-mds-border flex flex-col justify-between shadow-xl relative overflow-hidden group transition-colors"
          >
            {/* Header: Roman Numeral & Sub */}
            <div className="flex flex-col space-y-1 mb-2">
              <span className="font-mono font-bold text-xs text-mds-gold tracking-wider">
                {s.num}
              </span>
              <span className="font-mono text-[10px] text-mds-rain tracking-wider uppercase">
                {s.sub}
              </span>
            </div>

            {/* Mid: Artwork Canvas Frame */}
            <div className="w-full h-[240px] md:h-[280px] rounded-sm bg-mds-dark border-2 border-mds-border-subtle flex items-center justify-center overflow-hidden my-2 group-hover:scale-[1.02] transition-transform duration-500">
              {s.svgArtwork}
            </div>

            {/* Foot: Title & Evocative Description */}
            <div className="flex flex-col space-y-2 mt-2">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-white group-hover:text-mds-gold transition-colors">
                {s.title}
              </h3>
              <p className="font-sans text-xs text-mds-muted leading-relaxed line-clamp-3">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </ExhibitionRoomLayout>
  );
};
