import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Film, BookOpen, PenTool } from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#090d16]/90 backdrop-blur-md border-b-2 border-sng-border px-6 md:px-16 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <MindulleSeal
              size={32}
              showText={false}
              className="transition-transform group-hover:rotate-12 duration-300"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg md:text-xl font-bold tracking-[0.08em] text-white group-hover:text-sng-dandelion transition-colors">
                MINDULLE STUDIO
              </span>
              <span className="text-sng-dandelion font-light">/</span>
              <span className="text-sm font-mono text-gray-300 font-medium">소나기 .</span>
            </div>
          </Link>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border border-sng-dandelion/60 text-sng-dandelion bg-sng-dandelion/10 tracking-wider">
            Tooling Suite
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sng-muted">
          <a href="#philosophy" className="hover:text-white transition-colors">
            Atelier Philosophy
          </a>
          <a href="#bento" className="hover:text-white transition-colors">
            Tooling Suite
          </a>
          <a href="#showroom" className="hover:text-white transition-colors">
            Case Studies
          </a>
          <a href="#tokens" className="hover:text-white transition-colors">
            Tokens
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://draw.sonagi.space/vector/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sng-dandelion border-2 border-sng-dandelion/60 bg-sng-dandelion/10 rounded-sm hover:bg-sng-dandelion/20 transition-all"
            title="Open VectorCraft Canvas Studio"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Canvas ↗</span>
          </a>
          <Link
            to="/playground"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-300 border-2 border-purple-500/50 bg-purple-500/10 rounded-sm hover:bg-purple-500/20 transition-all"
          >
            <Film className="w-3.5 h-3.5" />
            Motion Lab
          </Link>
          <Link
            to="/catalog"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-200 border-2 border-sng-border rounded-sm hover:border-gray-400 hover:bg-white/5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Storybook
          </Link>
          <a
            href="https://github.com/mindulle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-sng-rain border-2 border-sng-rain rounded-sm hover:bg-sng-rain/90 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};
