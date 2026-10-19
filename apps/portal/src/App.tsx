import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as studioModule from '@theatre/studio';
import { getProject } from '@theatre/core';
import HeroScene from './components/HeroScene';
import { CanvasPage } from './components/CanvasPage';
import { Room01GlassPavilion } from './components/exhibition/Room01GlassPavilion';
import { Room02MonolithOfSolace } from './components/exhibition/Room02MonolithOfSolace';
import { Room03CabinetOfInstruments } from './components/exhibition/Room03CabinetOfInstruments';
import { Room04FiveSceneries } from './components/exhibition/Room04FiveSceneries';
import { Room05ColophonSeal } from './components/exhibition/Room05ColophonSeal';
import { LandingV2 } from './components/v2/LandingV2';

const getStudio = () => {
  let s: any = studioModule;
  while (s && !s.initialize && s.default) {
    s = s.default;
  }
  return s;
};

function Landing() {
  const [viewMode, setViewMode] = useState<'v1' | 'v2'>('v2');

  return (
    <div className="w-full bg-[#060911] text-gray-100 selection:bg-[#4A90E2]/30 selection:text-white overflow-x-hidden relative">
      {/* 🌟 Option 1 ↔ Option 2 Live Architecture Switcher */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 bg-[#090d16]/95 border-2 border-[#30363d] backdrop-blur-md rounded-full shadow-2xl">
        <button
          onClick={() => setViewMode('v1')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
            viewMode === 'v1'
              ? 'bg-[#4A90E2] text-white shadow-lg'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          🏛️ Option 1 : 5 Exhibition Rooms
        </button>
        <button
          onClick={() => setViewMode('v2')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
            viewMode === 'v2'
              ? 'bg-[#ffd166] text-black shadow-lg'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          🎬 Option 2 : Cinema Long-Scroll (Active)
        </button>
      </div>

      {viewMode === 'v1' ? (
        <div className="w-full">
          {/* Floating Navigator for V1 */}
          <nav className="fixed top-6 right-8 z-40 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#30363d] bg-[#090d16]/90 backdrop-blur-md text-[11px] font-mono text-[#94a3b8] shadow-2xl">
            <span className="text-[#ffd166] font-bold px-1 tracking-wider">ROOMS:</span>
            <a href="#room-01" className="hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors">01</a>
            <a href="#room-02" className="hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors">02</a>
            <a href="#room-03" className="hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors">03</a>
            <a href="#room-04" className="hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors">04</a>
            <a href="#room-05" className="hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors">05</a>
          </nav>

          <main className="w-full">
            <Room01GlassPavilion />
            <Room02MonolithOfSolace />
            <Room03CabinetOfInstruments />
            <Room04FiveSceneries />
            <Room05ColophonSeal />
          </main>
        </div>
      ) : (
        <LandingV2 />
      )}
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
        <Link to="/" className="text-blue-500 hover:underline text-sm font-medium">
          ← Back to Home
        </Link>
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
        <Route path="/canvas" element={<CanvasPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
