import React from 'react';
import { MindulleSeal } from './MindulleSeal';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#04060b] border-t-2 border-sng-border px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <MindulleSeal size={44} showText={false} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-xl font-bold tracking-[0.08em] text-white">
                MINDULLE STUDIO <span className="text-sng-dandelion font-light">.</span>
              </span>
              <span className="text-xs text-sng-muted font-mono">/ Featuring The Sonagi Tooling Suite</span>
            </div>
            <p className="text-xs text-sng-muted">
              "기계가 완벽해야 사람이 쉴 수 있다" — Crafted with architectural precision &amp; resilient vitality.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-sng-muted">
          <a
            href="https://github.com/mindulle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://blog.sonagi.space"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Blog
          </a>
          <a
            href="https://ref.sonagi.space"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Reference
          </a>
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            K3s Status: Operational
          </span>
        </div>
      </div>
    </footer>
  );
};
