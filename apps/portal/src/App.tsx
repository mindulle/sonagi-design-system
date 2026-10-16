import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as studioModule from '@theatre/studio';
import { getProject } from '@theatre/core';
import { Sparkles, ArrowRight, Layers, Film } from 'lucide-react';
import HeroScene from './components/HeroScene';
import { Navbar } from './components/Navbar';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BentoGrid } from './components/BentoGrid';
import { ProjectGallery } from './components/ProjectGallery';
import { TokenSpecimen } from './components/TokenSpecimen';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const getStudio = () => {
  let s: any = studioModule;
  while (s && !s.initialize && s.default) {
    s = s.default;
  }
  return s;
};

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-gray-100 selection:bg-[#4A90E2]/30 selection:text-white">
      {/* 00. Top Navigation */}
      <Navbar />

      {/* 01. Hero Section (소나기 Wild) with Three.js / Theatre.js HeroScene */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 md:px-16 pt-8 pb-20 border-b-2 border-sng-border bg-gradient-to-b from-[#070a12] via-[#060911] to-[#090d16] overflow-hidden">
        {/* Subtle Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* 3D Canvas Scene with Floating Theatre.js Meshes */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <HeroScene />
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-auto">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-sng-dandelion/60 bg-sng-dandelion/10 text-sng-dandelion text-xs font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>MINDULLE STUDIO • ARCHITECTURE &amp; IN-HOUSE TOOLING SUITE</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6"
          >
            Mindulle Studio<span className="text-sng-dandelion">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="text-lg sm:text-xl md:text-2xl text-sng-muted max-w-3xl leading-relaxed mb-10"
          >
            차가운 콘크리트 건축의 성벽 틈에서 피어난 <span className="text-sng-dandelion font-semibold">소박하고 끈질긴 생명력</span>.<br className="hidden sm:inline" />
            민들레 스튜디오가 자체 제작하고 실무에서 검증한 사내 도구 &amp; 오픈소스 제품군, <span className="text-sng-rain font-semibold">소나기(Sonagi)</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a 
              href="#bento" 
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-sng-dandelion text-black font-semibold text-sm border-2 border-sng-dandelion rounded-sm hover:bg-sng-dandelion/90 transition-all shadow-lg shadow-sng-dandelion/20"
            >
              소나기 도구군 둘러보기
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#showroom" 
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white font-semibold text-sm border-2 border-white/60 rounded-sm hover:border-white hover:bg-white/5 transition-all"
            >
              <Layers className="w-4 h-4" />
              실전 쇼룸 (Case Studies)
            </a>
            <Link 
              to="/playground" 
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-purple-500/10 text-purple-300 font-semibold text-sm border-2 border-purple-500/50 rounded-sm hover:bg-purple-500/20 transition-all"
            >
              <Film className="w-4 h-4" />
              Theatre.js 모션 랩
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 02. Philosophy Transition Section (Wild to Thin) */}
      <BrandPhilosophy />

      {/* 03. Bento Box Showcase (6 Core Disciplines) */}
      <BentoGrid />

      {/* 04. Featured Projects Showroom (CEO-1001) */}
      <ProjectGallery />

      {/* 05. Token Specimen */}
      <TokenSpecimen />

      {/* 06. Get in Touch & Collaborate */}
      <ContactSection />

      {/* 07. Footer */}
      <Footer />
    </div>
  );
}

function Catalog() {
  // 개발 모드에서는 로컬 스토리북 포트(6006)를, 프로덕션에서는 정적 경로를 사용합니다.
  const storybookUrl = import.meta.env.DEV ? 'http://localhost:6006' : '/storybook/';

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
        <h1 className="font-bold text-xl">Sonagi Catalog</h1>
        <Link to="/" className="text-blue-500 hover:underline text-sm font-medium">← Back to Home</Link>
      </header>
      <div className="flex-1 w-full relative">
        <iframe 
          src={storybookUrl}
          className="absolute inset-0 w-full h-full border-0"
          title="Sonagi Design System Storybook"
        />
      </div>
    </div>
  );
}

function Playground() {
  useEffect(() => {
    // 플레이그라운드 진입 시 Theatre.js Studio 초기화
    const studioInstance = getStudio();
    
    if (studioInstance && typeof studioInstance.initialize === 'function') {
      studioInstance.initialize();
    }
    
    // 임시 프로젝트 생성 (모션 테스트용)
    const project = getProject('Sonagi Motion Lab');
    project.sheet('Hero Scene'); // 시트 생성만 해둠
    
    return () => {
      // 컴포넌트 언마운트 시 Studio UI 감춤
      if (studioInstance && studioInstance.ui) {
        studioInstance.ui.hide();
      }
    };
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 text-white relative">
      
      {/* Theatre.js Studio UI와 겹치지 않도록 플로팅(우측 하단) 바 형태로 변경 */}
      <div className="fixed bottom-6 right-6 z-[9999] bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 rounded-2xl shadow-2xl p-4 flex items-center gap-6">
        <div>
          <h1 className="font-bold text-sm text-purple-400">Sonagi Motion Lab</h1>
          <p className="text-[10px] text-zinc-500">Theatre.js Environment</p>
        </div>
        <a 
          href="/" 
          className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          ← Exit Lab
        </a>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black">
        {/* 모션 프리뷰 캔버스 (실제 랜딩페이지와 동일한 씬) */}
        <HeroScene />
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <p className="text-zinc-500 text-sm">Select objects in Studio to animate.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
