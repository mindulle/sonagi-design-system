import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import studio from '@theatre/studio';
import { getProject } from '@theatre/core';

const bentoVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10" />
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-4"
        >
          Wild & Thin.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl text-center"
        >
          디자인 시스템 그 이상의 캔버스.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/catalog" 
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Explore Components
          </Link>
        </motion.div>
      </section>

      {/* Bento Box Showcase */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center md:text-left"
        >
          Interactive Components
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            custom={0}
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            className="col-span-1 md:col-span-2 bg-zinc-900 rounded-[2rem] p-8 h-80 flex flex-col justify-between border border-white/5 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-1 flex items-center justify-center">
              {/* Mockup for Cards */}
              <div className="w-48 h-32 bg-white/5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm" />
            </div>
            <h3 className="text-2xl font-semibold relative z-10">Cards & Surfaces</h3>
          </motion.div>

          <motion.div 
            custom={1}
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-zinc-900 rounded-[2rem] p-8 h-80 flex flex-col justify-between border border-white/5 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-1 flex items-center justify-center">
              {/* Mockup for Inputs */}
              <div className="w-full h-12 bg-white/10 rounded-full border border-white/20" />
            </div>
            <h3 className="text-2xl font-semibold relative z-10">Inputs</h3>
          </motion.div>

          <motion.div 
            custom={2}
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-zinc-900 rounded-[2rem] p-8 h-80 flex flex-col justify-between border border-white/5 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-1 flex gap-2 items-center justify-center">
              {/* Mockup for Navigation */}
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="w-10 h-10 rounded-full bg-white/10" />
            </div>
            <h3 className="text-2xl font-semibold relative z-10">Navigation</h3>
          </motion.div>

          <motion.div 
            custom={3}
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            className="col-span-1 md:col-span-2 bg-zinc-900 rounded-[2rem] p-8 h-80 flex flex-col justify-between border border-white/5 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-1 flex items-center justify-center">
              {/* Mockup for Modals */}
              <div className="w-64 h-40 bg-zinc-800 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold relative z-10">Modals & Overlays</h3>
          </motion.div>
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
        <a 
          href="/" 
          className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          ← Exit Lab
        </a>
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
