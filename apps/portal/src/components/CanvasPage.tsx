import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2, ExternalLink, Download } from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

export const CanvasPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col bg-[#060911] text-gray-100 overflow-hidden">
      {/* Top Header Navigation */}
      <header className="h-14 px-4 md:px-6 bg-[#090d16] border-b-2 border-sng-border flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-sng-muted hover:text-white border border-sng-border hover:border-gray-500 rounded-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portal</span>
          </Link>

          <div className="h-4 w-px bg-sng-border mx-1" />

          <div className="flex items-center gap-2">
            <MindulleSeal size={24} showText={false} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-sm md:text-base font-bold text-white tracking-wide">
                ArtCraft Vector Studio
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.2 rounded-full border border-sng-dandelion/50 text-sng-dandelion bg-sng-dandelion/10">
                WASM • WebGPU
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/brand/mindulle-studio-seal.vectorcraft"
            download="mindulle-studio-seal.vectorcraft"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-sng-dandelion border border-sng-dandelion/50 hover:bg-sng-dandelion/10 rounded-sm transition-colors"
            title="Download Mindulle Seal AST"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sample AST</span>
          </a>

          <a
            href="/vectorcraft/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-gray-300 hover:text-white border border-sng-border hover:border-gray-500 rounded-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-sng-rain border border-sng-rain/50 hover:bg-sng-rain/10 rounded-sm transition-colors"
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
        </div>
      </header>

      {/* Embedded VectorCraft Web Canvas */}
      <main className={`flex-1 w-full relative bg-[#0b0f19] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/80 hover:bg-black text-white border border-white/20 rounded-lg shadow-xl"
            title="Exit Fullscreen"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        )}
        <iframe
          src="/vectorcraft/index.html"
          className="absolute inset-0 w-full h-full border-0"
          title="ArtCraft Vector Studio Canvas"
          allow="fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
        />
      </main>
    </div>
  );
};
