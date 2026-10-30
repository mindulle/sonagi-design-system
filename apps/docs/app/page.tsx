import Link from 'next/link';
import { MindulleLogo, Button, Badge } from '@mindulle/ui';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="border-b-2 border-fd-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MindulleLogo size={28} />
          <span className="font-bold text-lg tracking-tight">민들레 디자인 시스템</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
            MDS v0.1.0
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="text-sm font-medium hover:text-amber-500 transition-colors"
          >
            문서 보기
          </Link>
          <Link
            href="https://github.com/mindulle/sonagi-design-system"
            target="_blank"
            className="text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground"
          >
            GitHub
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center justify-center">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-medium">
          <span>겨울 끝, 민들레.</span>
          <span className="opacity-60">• At Winter's End, Dandelion</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          실무를 위한 단단하고 정갈한 <br className="hidden md:inline" />
          <span className="text-amber-500 underline decoration-2 underline-offset-8">
            민들레 디자인 시스템 (MDS)
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-fd-muted-foreground mb-10 leading-relaxed">
          The True 2px Stem(줄기선), 4px Weathered Radius, No Soft Shadows 조형 헌법과
          W3C 표준 토큰으로 완성된 차세대 UI 컴포넌트 공식 문서입니다.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/docs">
            <Button size="lg" variant="primary">
              시작하기 (Quickstart)
            </Button>
          </Link>
          <Link href="/docs/components/button">
            <Button size="lg" variant="secondary">
              16종 컴포넌트 둘러보기
            </Button>
          </Link>
          <Link href="/docs/foundations/colors">
            <Button size="lg" variant="secondary">
              W3C 토큰 매트릭스
            </Button>
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="p-6 rounded-md border-2 border-fd-border bg-fd-card">
            <div className="font-mono text-xs text-amber-500 mb-2">01 / STEM &amp; LINE</div>
            <h3 className="text-lg font-bold mb-2">The True 2px Stem</h3>
            <p className="text-sm text-fd-muted-foreground">
              모호한 블러 그림자를 배제하고, 비바람에도 꺾이지 않는 자아를 지켜내는 선명한 2px 경계선.
            </p>
          </div>

          <div className="p-6 rounded-md border-2 border-fd-border bg-fd-card">
            <div className="font-mono text-xs text-amber-500 mb-2">02 / RADIUS</div>
            <h3 className="text-lg font-bold mb-2">4px Weathered Radius</h3>
            <p className="text-sm text-fd-muted-foreground">
              과도하게 둥글거나 차가운 직각이 아닌, 척박한 환경을 견뎌내며 자연스럽게 마모된 4px 모듈러 곡률.
            </p>
          </div>

          <div className="p-6 rounded-md border-2 border-fd-border bg-fd-card">
            <div className="font-mono text-xs text-amber-500 mb-2">03 / DUAL MATRIX</div>
            <h3 className="text-lg font-bold mb-2">W3C Light &amp; Dark</h3>
            <p className="text-sm text-fd-muted-foreground">
              옵시디언 다크(#060911)와 골드(#FFC837)를 품은 단일 SSOT 토큰 매트릭스 및 실시간 코드 복사.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-fd-border py-6 text-center text-xs text-fd-muted-foreground">
        © 2026 Mindulle Design System (MDS v0.1.0) • Powered by Sonagi Engine
      </footer>
    </div>
  );
}
