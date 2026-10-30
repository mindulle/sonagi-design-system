import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HeroScene from '../HeroScene';

export const LandingV2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 전역 스크롤 프로그레스
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 🌟 [배경색 실시간 모핑]: 다크 잉크(#060911) ➔ 웜 페이퍼(#FAF8F5) ➔ 딥 옵시디언(#060911)
  const dynamicBg = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.55, 0.7, 1],
    ['#060911', '#090d16', '#faf8f5', '#faf8f5', '#090d16', '#060911']
  );

  // 🌟 [Hero 3D 핀 & 스케일 트랜지션]
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroTitleOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroTitleY = useTransform(heroProgress, [0, 0.5], [0, -80]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.4]);
  const heroCanvasOpacity = useTransform(heroProgress, [0.6, 1], [1, 0.2]);

  // 🌟 [6대 도구 가로 패럴랙스 런웨이 트랙]
  const runwayRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  // 수직 스크롤 300vh를 가로 0% ➔ -55% 슬라이딩으로 매핑
  const runwayX = useTransform(runwayProgress, [0, 1], ['0%', '-55%']);

  const tools = [
    {
      id: '01',
      name: 'VectorCraft',
      badge: 'BEZIER ENGINE',
      tag: 'PRECISION STYLUS FORGE',
      desc: '3차 베지어 곡선 보정과 태블릿 펜 필압을 지원하는 순수 벡터 공방. 단 1px의 오차 없는 선화 에셋을 직접 세공합니다.',
      spec: 'Engine: Affinity SDK • Output: SVG / VectorCraft',
      href: '/canvas',
    },
    {
      id: '02',
      name: 'PhotoCraft',
      badge: 'ANALOG EMULSION',
      tag: 'RETRO GRAIN LAB',
      desc: '차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 이미지 에디터.',
      spec: 'Filter: 35mm Grain • Output: OKLCH Canvas WebP',
      href: '/canvas',
    },
    {
      id: '03',
      name: 'EffectCraft',
      badge: 'WEBGL & SHADER',
      tag: 'REALTIME PARTICLE ATELIER',
      desc: '실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 스튜디오. GPU 가속으로 물방울을 빚어냅니다.',
      spec: 'Pipeline: Three.js / R3F • GPU: Dedicated WebGL',
      href: '/playground',
    },
    {
      id: '04',
      name: 'DesignCraft',
      badge: 'W3C TOKEN SSOT',
      tag: 'LAYOUT COMPOSER',
      desc: 'The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기. 견고한 시스템을 구축합니다.',
      spec: 'Tokens: @mindulle/tokens • Rules: The 2px Law',
      href: '/catalog',
    },
    {
      id: '05',
      name: 'FilmCraft',
      badge: 'TIMELINE DIRECTOR',
      tag: 'THEATRE.JS MOTION LAB',
      desc: '키프레임 타임라인과 가상 3D 카메라 워크를 직관적으로 연출하는 모션 디렉터. 스크롤 반응 시네마틱 서사.',
      spec: 'Studio: @theatre/studio • State: state.json',
      href: '/playground',
    },
    {
      id: '06',
      name: 'Sonagi Draw',
      badge: 'CANVAS HARNESS',
      tag: 'COLLABORATIVE WHITEBOARD',
      desc: 'tldraw 기반의 실시간 화이트보드와 에이전트 연동 작업대. 기획 아이디어를 스케치합니다.',
      spec: 'Engine: Tldraw v3 • Bridge: canvasAdapter',
      href: '/canvas',
    },
  ];

  const sceneries = [
    {
      num: '01',
      title: '비 온 뒤의 쉼',
      sub: 'Petrichor & Clarity',
      desc: '창문에 흘러내리던 굵은 빗방울이 맑게 개며 스며드는 아침 햇살과 젖은 흙냄새의 정화.',
    },
    {
      num: '02',
      title: '즉흥적인 모험',
      sub: 'The Sunset Horizon',
      desc: '계획된 일상의 틀을 깨부수고, 노을빛으로 물드는 붉은 해안도로를 향해 훌쩍 떠나는 지평선.',
    },
    {
      num: '03',
      title: '질긴 생명력',
      sub: 'Dandelion in Asphalt',
      desc: '차가운 콘크리트 틈바구니에서 기어이 피어나 바람을 타고 하늘로 날아가는 노란 솜털 홀씨.',
    },
    {
      num: '04',
      title: '아늑한 아틀리에',
      sub: 'The Sunlit Workshop',
      desc: '세상의 비바람을 뚫고, 오후의 햇살이 가득 쏟아지는 작업대 위에서 다시 날개를 펴는 공방.',
    },
    {
      num: '05',
      title: '궁극의 안식처',
      sub: 'The Midnight Hearth',
      desc: '차가운 밤공기를 뒤로하고, 잠든 아이의 따뜻한 무게를 안고 현관문을 열고 들어오는 거실.',
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: dynamicBg }}
      className="w-full text-gray-100 selection:bg-[#4A90E2]/30 selection:text-white relative transition-colors duration-500"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 01. HERO : STICKY PIN & ZOOM THREE.JS (200vh Track) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative w-full h-[200vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col justify-between p-6 pt-24 md:p-12 md:pt-24 overflow-hidden border-b-2 border-mds-border/60">
          {/* 3D WebGL Canvas (스크롤에 따라 스케일 & 페이드아웃) */}
          <motion.div
            style={{ scale: heroScale, opacity: heroCanvasOpacity }}
            className="absolute inset-0 pointer-events-auto origin-center"
          >
            <HeroScene />
          </motion.div>

          {/* Top Header Bar */}
          <header className="relative z-10 w-full max-w-[1824px] mx-auto h-[72px] px-8 flex items-center justify-between border-2 border-mds-border bg-mds-card/90 backdrop-blur-md rounded-sm">
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-[0.2em] text-white">
                M I N D U L L E &nbsp; S T U D I O
              </span>
              <span className="font-sans text-[10px] text-mds-muted tracking-wider uppercase">
                SCROLL-DRIVEN MOTION EXPERIENCE
              </span>
            </div>

            <div className="px-4 py-1.5 rounded-sm border-2 border-mds-gold bg-mds-gold/10 text-mds-gold text-[11px] font-mono font-bold tracking-wider">
              V2.0 : ONE-TAKE SCROLL
            </div>

            <div className="hidden md:block font-mono text-[11px] text-mds-muted tracking-wider">
              PIN &amp; SCRUB ACTIVE
            </div>
          </header>

          {/* Centerpiece Hero Title (스크롤 시 위로 밀려나며 페이드) */}
          <motion.div
            style={{ opacity: heroTitleOpacity, y: heroTitleY }}
            className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto pointer-events-none"
          >
            <span className="px-3.5 py-1 rounded-full border border-mds-gold/60 bg-mds-gold/10 text-mds-gold font-mono text-xs tracking-widest uppercase mb-4">
              ATELIER CONSTITUTION • ARTICLE I
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight break-keep text-center">
              "도구가 완벽할 때,
              <br />
              손길은 비로소 자유로워진다."
            </h1>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-mds-gold tracking-wide pt-4 max-w-2xl">
              When the machine is flawless, the human soul finds its solace.
            </p>
          </motion.div>

          {/* Bottom Prompt */}
          <div className="relative z-10 w-full max-w-[1824px] mx-auto flex items-center justify-between px-4 font-mono text-xs text-mds-muted tracking-widest">
            <span className="text-mds-gold">EST. 2026 • HANDCRAFTED SOFTWARE</span>
            <span className="text-mds-rain font-bold animate-pulse">
              ⬇ 휠을 아래로 굴리면 3D 물방울이 반응하며 서사가 전개됩니다
            </span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 02. DUAL WORLD METAPHOR BLEND (소나기 ↔ 민들레 대조) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-32 px-6 md:px-12 border-b-2 border-mds-border/60">
        <div className="max-w-[1824px] mx-auto flex flex-col space-y-16">
          <div className="flex flex-col space-y-3 max-w-3xl">
            <span className="font-mono font-bold text-xs text-mds-rain tracking-widest uppercase">
              ARTICLE II • DUAL METAPHOR BLEND
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-6xl tracking-tight text-current">
              거친 성벽의 방패(소나기) 안에 피어난,
              <br />
              가장 다정한 안식처(민들레).
            </h2>
            <p className="font-sans text-sm md:text-base opacity-80 leading-relaxed pt-2">
              우리는 상반된 두 가지 에너지가 충돌하며 빚어내는 제3의 풍경을 믿습니다. 폭발적인 몰입의 기술력과 인간을 향한 따뜻한 다정함.
            </p>
          </div>

          {/* Dual Interactive Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-12 rounded-sm bg-[#070a12] border-2 border-mds-rain flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-mds-rain tracking-wider uppercase">
                  WILD ARCHITECTURE • 소나기
                </span>
                <span className="font-mono text-[11px] text-mds-muted">DEEP INK (MDS-DARK)</span>
              </div>
              <div className="flex flex-col space-y-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white">
                  "얼어붙은 땅을 깨우는 벼락같은 몰입과 방패."
                </h3>
                <p className="font-sans text-xs md:text-sm text-mds-muted leading-relaxed">
                  그림자를 배제하고 2px 솔리드 선화로 구조를 세우는 네오 브루탈리즘 건축 헌법. 외부의 비바람으로부터 창작자의 주권을 지키는 단단한 요새입니다.
                </p>
              </div>
              <div className="pt-4 border-t border-mds-border/60 font-mono text-[10px] text-mds-rain tracking-wider">
                RULES: THE TRUE 2PX LAW • ZERO DROP-SHADOW
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 md:p-12 rounded-sm bg-[#faf8f5] border-2 border-[#d97706] text-[#0a0f1c] flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#d97706] tracking-wider uppercase">
                  LIVING SOUL • 민들레
                </span>
                <span className="font-mono text-[11px] text-[#8c6b45]">WARM PAPER (#FAF8F5)</span>
              </div>
              <div className="flex flex-col space-y-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#0a0f1c]">
                  "척박한 콘크리트 틈에서 피어나는 다정함."
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#5c4a38] leading-relaxed">
                  차가운 성벽의 족쇄를 풀고, 오후의 햇살과 젖은 흙내음처럼 창작자의 손길을 따스하게 보듬는 인간의 영혼. 섬세한 여백과 웜 화이트 종이 질감의 안식처입니다.
                </p>
              </div>
              <div className="pt-4 border-t border-[#d9cdb8] font-mono text-[10px] text-[#d97706] tracking-wider">
                ATMOSPHERE: PETRICHOR • GOLD CORE GLOW
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 03. 🌟 PINNED HORIZONTAL SCROLL RUNWAY (300vh Pinned Track) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section ref={runwayRef} className="relative w-full h-[300vh] bg-mds-dark">
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden border-b-2 border-mds-border/60">
          {/* Track Header */}
          <div className="w-full max-w-[1824px] mx-auto flex items-end justify-between mb-8 z-10 flex-shrink-0">
            <div className="flex flex-col space-y-2">
              <span className="font-mono font-bold text-xs text-mds-gold tracking-widest uppercase">
                ARTICLE III • THE 6-IN-1 TOOLING SUITE
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl text-white tracking-tight">
                "도구가 완전할 때, 손길은 거침없이 뻗어 나간다."
              </h2>
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs text-mds-rain font-bold">
              <span>◄ 스크롤하면서 좌우로 미끄러지는 도구들을 감상하세요 ►</span>
            </div>
          </div>

          {/* 🌟 가로로 슬라이딩되는 카드 레일 */}
          <motion.div
            style={{ x: runwayX }}
            className="flex items-center space-x-8 w-max py-4"
          >
            {tools.map((t) => (
              <div
                key={t.id}
                className="w-[440px] md:w-[480px] h-[340px] p-8 rounded-sm bg-mds-card border-2 border-mds-border hover:border-mds-gold flex flex-col justify-between shadow-2xl transition-colors duration-300 group flex-shrink-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-mds-gold">
                    ARTIFACT • {t.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-sm border border-mds-rain bg-mds-rain/10 text-[10px] font-mono font-bold text-mds-rain">
                    {t.badge}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-serif font-bold text-3xl text-white group-hover:text-mds-gold transition-colors">
                    {t.name}
                  </h3>
                  <span className="font-mono font-bold text-[11px] text-mds-rain tracking-wider uppercase">
                    {t.tag}
                  </span>
                  <p className="font-sans text-xs text-mds-muted leading-relaxed line-clamp-3">
                    {t.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-mds-border/60 font-mono text-[11px]">
                  <span className="text-mds-muted">{t.spec}</span>
                  <a href={t.href} className="font-bold text-mds-gold hover:underline flex items-center space-x-1">
                    <span>EXPLORE</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 04. FIVE SCENERIES OF SOLACE (감성 포스터 갤러리) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-32 px-6 md:px-12 border-b-2 border-mds-border/60 bg-mds-card">
        <div className="max-w-[1824px] mx-auto flex flex-col space-y-12">
          <div className="flex flex-col space-y-2 max-w-3xl">
            <span className="font-mono font-bold text-xs text-mds-gold tracking-widest uppercase">
              ARTICLE IV • CINEMATIC SCENOGRAPHY
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-white tracking-tight">
              "겨울 끝, 민들레."
            </h2>
            <p className="font-sans text-sm text-mds-muted leading-relaxed pt-1">
              단순한 기능 설명을 넘어, 삶의 감각에 직접 닿는 5가지 시적 정서의 단면들.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sceneries.map((s, idx) => (
              <motion.div
                key={s.num}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: 'var(--mds-color-brand-accent, #ffd166)' }}
                className="p-6 rounded-sm bg-mds-dark border-2 border-mds-border flex flex-col justify-between space-y-6 shadow-xl group transition-colors min-h-[380px]"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-mono font-bold text-xs text-mds-gold">
                    SCENE • {s.num}
                  </span>
                  <span className="font-mono text-[10px] text-mds-rain tracking-wider uppercase">
                    {s.sub}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 my-auto">
                  <h3 className="font-serif font-bold text-2xl text-white group-hover:text-mds-gold transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-sans text-xs text-mds-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-mds-border/60 font-mono text-[10px] text-mds-muted">
                  2PX SOLID EMBODIMENT
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 05. FINALE : THE MASTER SEAL & ATELIER ENTRANCE */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-36 px-6 md:px-12 bg-mds-dark text-center flex flex-col items-center justify-center space-y-12">
        <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono font-bold text-xs text-mds-gold tracking-widest uppercase">
            ATELIER CONSTITUTION • EPILOGUE
          </span>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            "당신이 화면을 끄고,
            <br />
            삶의 가장 소중한 장면 속으로
            <br />
            걸어 들어갈 수 있도록."
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-mds-gold pt-2">
            So that you may step away from the screen, and walk into the dearest scenes of your life.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com/mindulle/sonagi-design-system"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-mds-gold text-black font-mono font-bold text-xs tracking-wider rounded-sm hover:bg-mds-gold/90 transition-all shadow-xl shadow-mds-gold/20"
          >
            ENTER THE ATELIER ➔
          </a>
          <a
            href="https://github.com/mindulle"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-mds-card border-2 border-mds-border text-white font-mono font-bold text-xs tracking-wider rounded-sm hover:border-mds-gold transition-all"
          >
            EXPLORE CODE REPOSITORY
          </a>
        </div>

        <div className="pt-16 font-mono text-[11px] text-mds-muted tracking-widest uppercase">
          MINDULLE STUDIO • EST. 2026 • THE SOVEREIGN SOFTWARE ATELIER
        </div>
      </section>
    </motion.div>
  );
};
