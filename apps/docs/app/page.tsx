import Link from 'next/link';
import { MindulleLogo, Button } from '@mindulle/ui';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Palette,
  Boxes,
  Shield,
  Layers,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-fd-background text-fd-foreground selection:bg-amber-400 selection:text-black">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* Top Header Navigation (Mobile-first Compact Layout) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b-2 border-fd-border bg-fd-background/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <MindulleLogo size={26} />
          <span className="font-bold text-base sm:text-lg tracking-tight group-hover:text-amber-500 transition-colors">
            <span className="inline sm:hidden">민들레 MDS</span>
            <span className="hidden sm:inline">민들레 디자인 시스템</span>
          </span>
          <span className="hidden md:inline-flex text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
            v0.1.0
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-sm bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-black border border-amber-500/20 transition-all"
          >
            <BookOpen className="size-3.5" />
            <span>문서 보기</span>
          </Link>
          <Link
            href="https://github.com/mindulle/sonagi-design-system"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors p-1"
          >
            GitHub
          </Link>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Hero Section */}
      {/* ───────────────────────────────────────────────────────────── */}
      <main className="relative flex-1 max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24 flex flex-col items-center text-center justify-center overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        {/* Slogan pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wide shadow-sm">
          <Sparkles className="size-3.5" />
          <span>겨울 끝, 민들레.</span>
          <span className="opacity-40">|</span>
          <span className="font-mono text-[11px] opacity-90">MDS v0.1.0</span>
        </div>

        {/* Main Heading (break-keep & text-balance for clean Korean wrapping) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight break-keep leading-[1.25] sm:leading-[1.18] max-w-4xl">
          실무를 위한 단단하고 정갈한 <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500">
            민들레 디자인 시스템
          </span>
        </h1>

        {/* Description text with break-keep */}
        <p className="max-w-lg text-sm sm:text-base md:text-lg text-fd-muted-foreground mt-4 mb-7 sm:mb-9 leading-relaxed break-keep font-medium">
          16종 인터랙티브 컴포넌트와 W3C 시맨틱 토큰 매트릭스.
        </p>

        {/* Quick terminal install snippet */}
        <div className="mb-8 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm border-2 border-fd-border bg-fd-card/90 backdrop-blur-sm font-mono text-[11px] sm:text-sm text-fd-foreground shadow-sm max-w-full overflow-x-auto whitespace-nowrap">
          <Terminal className="size-3.5 sm:size-4 text-amber-500 shrink-0" />
          <span className="select-all tracking-tight font-medium text-amber-500/90">$</span>
          <span className="select-all">pnpm add @mindulle/tokens @mindulle/ui</span>
        </div>

        {/* Action Buttons (Responsive Grid on Mobile) */}
        <div className="w-full max-w-md flex flex-col sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4">
          <Link href="/docs" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto justify-center gap-2 text-sm sm:text-base font-bold shadow-lg shadow-amber-500/20"
            >
              <span>시작하기 (Quickstart)</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:flex-row sm:gap-4">
            <Link href="/docs/components/button" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto justify-center gap-1.5 text-xs sm:text-sm"
              >
                <Boxes className="size-4 text-amber-500 shrink-0" />
                <span>16종 컴포넌트</span>
              </Button>
            </Link>
            <Link href="/docs/foundations/colors" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto justify-center gap-1.5 text-xs sm:text-sm"
              >
                <Palette className="size-4 text-amber-500 shrink-0" />
                <span>토큰 매트릭스</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 3 Pillars of MDS Constitution */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="w-full mt-20 sm:mt-24 pt-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 mb-1">
              DESIGN CONSTITUTION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">민들레 3대 조형 헌법</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left w-full">
            {/* 01 */}
            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card/80 backdrop-blur-sm hover:border-amber-500/60 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-amber-500">01 / STEM &amp; LINE</span>
                <Shield className="size-4 text-amber-500/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">The True 2px Stem</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                모호한 블러 그림자를 배제하고, 비바람에도 꺾이지 않는 자아를 지켜내는 선명한 2px 경계선.
              </p>
            </div>

            {/* 02 */}
            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card/80 backdrop-blur-sm hover:border-amber-500/60 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-amber-500">02 / RADIUS</span>
                <Layers className="size-4 text-amber-500/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">4px Weathered Radius</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                과도하게 둥글거나 차가운 직각이 아닌, 척박한 환경을 견뎌내며 자연스럽게 마모된 4px 모듈러 곡률.
              </p>
            </div>

            {/* 03 */}
            <div className="p-6 rounded-sm border-2 border-fd-border bg-fd-card/80 backdrop-blur-sm hover:border-amber-500/60 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-amber-500">03 / DUAL MATRIX</span>
                <Palette className="size-4 text-amber-500/70" />
              </div>
              <h3 className="text-lg font-bold mb-2">W3C Light &amp; Dark</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed break-keep">
                회색돌 다크(#12151d)와 민들레 골드(#ffc837)를 품은 단일 SSOT 토큰 매트릭스 및 실시간 코드 복사.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Exhibition Showroom Banner */}
        <div className="w-full mt-8 p-5 sm:p-6 rounded-sm border-2 border-fd-border bg-fd-card/60 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold text-amber-500 tracking-wider uppercase mb-0.5">
              EXPERIENCE
            </span>
            <span className="font-serif font-bold text-base sm:text-lg text-fd-foreground">
              3D 시네마틱 쇼룸 &amp; 5대 전시장
            </span>
            <span className="text-xs text-fd-muted-foreground mt-0.5">
              실시간 WebGL 셰이더 물방울과 인터랙티브 런웨이
            </span>
          </div>
          <Link
            href="/exhibition/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm border border-fd-border hover:border-amber-500 text-xs font-mono font-bold text-fd-foreground transition-all shrink-0"
          >
            <span>전시장 입장하기</span>
            <ExternalLink className="size-3.5 text-amber-500" />
          </Link>
        </div>
      </main>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Footer */}
      {/* ───────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-fd-border py-8 px-6 text-center text-xs text-fd-muted-foreground flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-4">
        <div>© 2026 Mindulle Design System (MDS v0.1.0) • Powered by Sonagi Engine</div>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-amber-500 transition-colors">
            공식 문서
          </Link>
          <Link href="/docs/components/button" className="hover:text-amber-500 transition-colors">
            컴포넌트
          </Link>
          <Link href="/exhibition/" className="hover:text-amber-500 transition-colors">
            3D 쇼룸
          </Link>
        </div>
      </footer>
    </div>
  );
}
