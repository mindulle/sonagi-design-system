import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Download, 
  PenTool, 
  Image as ImageIcon, 
  Film, 
  BookOpen, 
  Terminal,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

type StudioTool = 'vector' | 'photo' | 'effect' | 'design';

interface ToolConfig {
  id: StudioTool;
  name: string;
  category: string;
  adobeEquivalent: string;
  version: string;
  cliBin: string;
  webUrl: string;
  description: string;
  features: string[];
  sampleFile?: {
    name: string;
    path: string;
  };
}

const TOOLS: Record<StudioTool, ToolConfig> = {
  vector: {
    id: 'vector',
    name: 'VectorCraft',
    category: '2D Vector Studio',
    adobeEquivalent: 'Illustrator',
    version: 'v0.11.0',
    cliBin: 'vectorcraft-cli',
    webUrl: 'https://vectorcraft.live/',
    description: '베지에 패스, 펜 툴, 패스파인더, 무손실 SVG/PDF 및 .vectorcraft JSON AST 지원',
    features: ['Live Bézier Paths', 'Pathfinder Booleans', 'Radial & Grid Repeats', 'Lossless PDF / SVG Export'],
    sampleFile: {
      name: 'mindulle-studio-seal.vectorcraft',
      path: '/brand/mindulle-studio-seal.vectorcraft'
    }
  },
  photo: {
    id: 'photo',
    name: 'PhotoCraft',
    category: 'Raster Image Studio',
    adobeEquivalent: 'Photoshop',
    version: 'v0.9.0',
    cliBin: 'photocraft-cli',
    webUrl: 'https://photocraft.run/editor',
    description: '레이어 마스크, 색조 보정, 실제 .psd 파일 호환 및 고속 WebGPU 래스터 엔진',
    features: ['Non-destructive Layers', 'Layer Masks & Styles', 'Native .psd Compatibility', 'WASM GPU Filters']
  },
  effect: {
    id: 'effect',
    name: 'EffectCraft',
    category: 'Motion & Visual Effects',
    adobeEquivalent: 'After Effects',
    version: 'v0.10.0',
    cliBin: 'effectcraft-cli',
    webUrl: 'https://effectcraft.run/editor',
    description: '키프레임 타임라인, 306개 라이브 이펙트, 웹용 Lottie JSON 및 헤드리스 MP4 렌더링',
    features: ['Timeline & Keyframes', '306 Live FX Engine', 'Lottie JSON Export', 'Headless MP4 Render Queue']
  },
  design: {
    id: 'design',
    name: 'DesignCraft',
    category: 'Page Layout & Publishing',
    adobeEquivalent: 'InDesign',
    version: 'v0.8.0',
    cliBin: 'designcraft-cli',
    webUrl: 'https://designcraft.run/editor',
    description: '다단 그리드 조판, 마스터 페이지, 단락 스타일 및 인쇄 규격 고해상도 PDF 출판',
    features: ['Multi-column Threading', 'Parent Master Pages', 'Paragraph Composer', 'Print-ready PDF Plot']
  }
};

export const CanvasPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<StudioTool>('vector');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const current = TOOLS[activeTool];

  return (
    <div className="h-screen w-full flex flex-col bg-[#060911] text-gray-100 overflow-hidden font-sans">
      {/* 01. Top Suite Header Navigation */}
      <header className="h-16 px-4 md:px-6 bg-[#090d16] border-b-2 border-sng-border flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-sng-muted hover:text-white border border-sng-border hover:border-gray-500 rounded-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portal</span>
          </Link>

          <MindulleSeal size={22} showText={false} className="hidden sm:block" />

          <div className="h-5 w-px bg-sng-border hidden sm:block" />

          {/* App Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-sm border border-sng-border/60">
            <button
              onClick={() => setActiveTool('vector')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'vector'
                  ? 'bg-sng-dandelion text-black shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Vector</span>
            </button>

            <button
              onClick={() => setActiveTool('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'photo'
                  ? 'bg-sng-rain text-black shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>

            <button
              onClick={() => setActiveTool('effect')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'effect'
                  ? 'bg-purple-400 text-black shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Motion</span>
            </button>

            <button
              onClick={() => setActiveTool('design')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'design'
                  ? 'bg-emerald-400 text-black shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {current.sampleFile && (
            <a
              href={current.sampleFile.path}
              download={current.sampleFile.name}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-sng-dandelion border border-sng-dandelion/50 hover:bg-sng-dandelion/10 rounded-sm transition-colors"
              title="Download Sample Vector AST"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sample AST</span>
            </a>
          )}

          <a
            href={current.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-white border border-sng-border hover:border-gray-500 rounded-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch Web</span>
          </a>

          {activeTool === 'vector' && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-sng-rain border border-sng-rain/50 hover:bg-sng-rain/10 rounded-sm transition-colors"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
          )}
        </div>
      </header>

      {/* 02. Main Workspace */}
      <main className={`flex-1 w-full relative bg-[#080b13] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/80 hover:bg-black text-white border border-white/20 rounded-lg shadow-xl"
            title="Exit Fullscreen"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        )}

        {/* Case A: VectorCraft (Fully Embedded Live WASM Canvas) */}
        {activeTool === 'vector' ? (
          <iframe
            src={current.webUrl}
            className="absolute inset-0 w-full h-full border-0"
            title="ArtCraft Vector Studio Canvas"
            allow="fullscreen; clipboard-read; clipboard-write"
            allowFullScreen
          />
        ) : (
          /* Case B: Suite Tools Control & Direct Launcher Hub */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 overflow-y-auto">
            <div className="max-w-2xl w-full bg-[#0d121f] border-2 border-sng-border rounded-sm p-8 shadow-2xl relative">
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sng-dandelion/50 bg-sng-dandelion/10 text-sng-dandelion text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{current.category} • {current.version}</span>
                </div>
                <span className="text-xs font-mono text-sng-muted">
                  Replaces {current.adobeEquivalent}
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                {current.name}
              </h2>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Features Pill Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-black/30 p-2.5 rounded-sm border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CLI Engine Health */}
              <div className="bg-black/50 p-4 rounded-sm border border-sng-border/60 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-sng-rain" />
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Headless CLI Installed</div>
                    <div className="text-[11px] font-mono text-sng-muted">/usr/local/bin/{current.cliBin} (Linux AArch64)</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-sm">
                  Active &amp; Ready
                </span>
              </div>

              {/* Launch Call-To-Action */}
              <div className="flex items-center gap-4">
                <a
                  href={current.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sng-dandelion text-black font-semibold text-sm rounded-sm hover:bg-sng-dandelion/90 transition-all shadow-lg shadow-sng-dandelion/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch {current.name} Web Editor</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
