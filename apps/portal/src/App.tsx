import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import studio from '@theatre/studio';
import { getProject } from '@theatre/core';

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Placeholder for Theatre.js Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10" />
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
          Wild & Thin.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl text-center">
          디자인 시스템 그 이상의 캔버스.
        </p>
        <Link 
          to="/catalog" 
          className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Explore Components
        </Link>
      </section>

      {/* Bento Box Showcase */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12">Interactive Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-gray-900 rounded-3xl p-8 h-80 flex items-end">
            <h3 className="text-2xl font-semibold">Cards & Surfaces</h3>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8 h-80 flex items-end">
            <h3 className="text-2xl font-semibold">Inputs</h3>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8 h-80 flex items-end">
            <h3 className="text-2xl font-semibold">Navigation</h3>
          </div>
          <div className="col-span-1 md:col-span-2 bg-gray-900 rounded-3xl p-8 h-80 flex items-end">
            <h3 className="text-2xl font-semibold">Modals & Overlays</h3>
          </div>
        </div>
      </section>

      {/* Motion Lab Teaser */}
      <section className="py-24 px-8 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold mb-4">Motion Lab Teaser</h2>
        <p className="text-gray-400 mb-8">개발자 없이 디자이너가 직접 연출하는 타임라인.</p>
        <Link 
          to="/playground" 
          className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
        >
          [플레이그라운드 열기]
        </Link>
      </section>
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
    studio.initialize();
    
    // 임시 프로젝트 생성 (모션 테스트용)
    const project = getProject('Sonagi Motion Lab');
    project.sheet('Hero Scene'); // 시트 생성만 해둠
    
    return () => {
      // 컴포넌트 언마운트 시 Studio UI를 감추는 방식 사용 
      // (완벽한 unmount API가 없으므로 CSS로 숨김 처리하거나 새로고침 유도)
      studio.ui.hide();
    };
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 text-white">
      <header className="p-4 border-b border-zinc-800 flex justify-between items-center relative z-50">
        <div>
          <h1 className="font-bold text-xl text-purple-400">Sonagi Motion Lab</h1>
          <p className="text-xs text-zinc-500">Theatre.js Studio Environment</p>
        </div>
        <Link 
          to="/" 
          className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          onClick={() => {
            // 메인 이동 시 새로고침하여 Studio UI를 완전히 날리는 것이 깔끔함
            window.location.href = '/';
          }}
        >
          ← Exit Lab
        </Link>
      </header>
      
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* 모션 프리뷰 캔버스가 들어갈 자리 */}
        <div className="w-[800px] h-[500px] border border-zinc-800 rounded-lg bg-black flex items-center justify-center flex-col gap-4">
          <div className="w-16 h-16 bg-purple-500 rounded-2xl" id="motion-target"></div>
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
