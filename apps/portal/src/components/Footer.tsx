import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#04060b] border-t-2 border-sng-border px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-lg font-bold text-white">
              Mindulle Studio <span className="text-sng-dandelion">.</span>
            </span>
            <span className="text-xs text-sng-muted font-mono">Featuring The Sonagi Tooling Suite</span>
          </div>
          <p className="text-xs text-sng-muted">
            Crafted with architectural precision &amp; resilient vitality. Built with React 19, Three.js, and Sonagi Design System.
          </p>
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
