import React from 'react';
import { Mail, Github, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#070a12] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sng-dandelion/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border-2 border-sng-dandelion/60 bg-sng-dandelion/10 text-sng-dandelion mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          GET IN TOUCH &amp; COLLABORATE
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          함께 새로운 풍경을 짓습니다
        </h2>

        <p className="text-sng-muted text-base md:text-lg leading-relaxed max-w-2xl mb-10">
          복잡하고 취약한 시스템을 걷어내고, 비바람에도 흔들리지 않는 튼튼한 건축과 온기 있는 사용자 경험을 함께 만들 동료와 파트너를 환영합니다.
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="mailto:mindullestudio@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-sng-dandelion text-black font-semibold text-sm border-2 border-sng-dandelion rounded-sm hover:bg-sng-dandelion/90 transition-all shadow-lg shadow-sng-dandelion/20"
          >
            <Mail className="w-4 h-4" />
            mindullestudio@gmail.com
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/mindulle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-white font-semibold text-sm border-2 border-white/60 rounded-sm hover:border-white hover:bg-white/5 transition-all"
          >
            <Github className="w-4 h-4" />
            GitHub @mindulle
          </a>
          <a
            href="https://blog.sonagi.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-sng-muted font-semibold text-sm border-2 border-sng-border rounded-sm hover:border-sng-muted hover:text-white transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            블로그 &amp; 생각 보기
          </a>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for High-Impact Software Architecture &amp; Design Systems
        </div>
      </div>
    </section>
  );
};
