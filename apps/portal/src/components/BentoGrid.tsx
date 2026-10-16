import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Code2, Cpu, Edit3, Film, Sparkles, ArrowRight } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="bento" className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#060911]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border-2 border-sng-rain/60 bg-sng-rain/10 text-sng-rain mb-4">
            IN-HOUSE &amp; OPEN-SOURCE TOOLING SUITE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            The Sonagi Tooling Suite
          </h2>
          <p className="text-sng-muted text-base md:text-lg max-w-2xl mx-auto">
            민들레 스튜디오가 자체 제작하여 실무에서 스스로 검증(Dogfooding)하는 6대 오픈소스 도구군입니다.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: 3D Motion Lab (Span 2) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 bg-[#080d1a] border-2 border-sng-rain rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-rain/40 rounded-sm text-sng-rain bg-sng-rain/10">
                  THREE.JS • THEATRE.JS • BLENDER
                </span>
                <Film className="w-5 h-5 text-sng-rain group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cinematic 3D Motion Lab</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                Three.js 렌더러와 Theatre.js 타임라인 에디터를 결합하여 코드로 제어하는 시네마틱 3D 파이프라인.
                Blender에서 내보낸 3D 정지 자산(.glb)에 웹 표준 타임라인 키프레임을 주입합니다.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t-2 border-sng-border">
              <span className="font-mono text-xs text-sng-rain">@theatre/studio Integration</span>
              <Link
                to="/playground"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sng-rain/10 text-sng-rain border-2 border-sng-rain rounded-sm text-xs font-semibold hover:bg-sng-rain hover:text-black transition-all"
              >
                Motion Lab 실행
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Tile 2: Design System V3 (Span 1) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#120d12] border-2 border-sng-rose rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-rose/40 rounded-sm text-sng-rose bg-sng-rose/10">
                  DESIGN SYSTEM V3
                </span>
                <Box className="w-5 h-5 text-sng-rose group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tokens &amp; Primitives</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                W3C 표준 디자인 토큰 컴파일러 및 OKLCH 기반 2-Tier 시맨틱 컬러 시스템.
                Figma 콘솔 스크립트와 Storybook 코드가 1:1로 일치합니다.
              </p>
            </div>
            <div className="pt-4 border-t-2 border-sng-border flex items-center justify-between">
              <span className="text-xs font-mono text-sng-rose">2px Border • 4px Radius</span>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sng-rose/10 text-sng-rose border-2 border-sng-rose rounded-sm text-xs font-semibold hover:bg-sng-rose hover:text-white transition-all"
              >
                Storybook 열기
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Tile 3: Sonagi Draw (Span 1) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#061313] border-2 border-sng-cyan rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-cyan/40 rounded-sm text-sng-cyan bg-sng-cyan/10">
                  TLDRAW • MCP ENGINE
                </span>
                <Edit3 className="w-5 h-5 text-sng-cyan group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sonagi Draw Canvas</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                tldraw 기반 커스텀 도형 스키마 및 AI 에이전트 연동 협업 캔버스.
                Canvas Bridge를 통해 프롬프트로 다이어그램과 와이어프레임을 즉각 타건합니다.
              </p>
            </div>
            <div className="font-mono text-xs text-sng-cyan/80 bg-black/40 p-3 rounded-sm border border-sng-cyan/30">
              wired-card &gt; canvas_bridge &gt; push_to_canvas()
            </div>
          </motion.div>

          {/* Tile 4: AI & Infra Orchestration (Span 2) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 bg-[#100a18] border-2 border-purple-500 rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-purple-500/40 rounded-sm text-purple-400 bg-purple-500/10">
                  PAPERCLIP • KIMAKI • K3S IAC
                </span>
                <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Autonomous Agent Orchestration</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                Paperclip 컨트롤 플레인, Discord 웹 클리퍼 봇, Ansible IaC 배포 및 K3s 인프라.
                OpenCode 멀티 에이전트가 이슈 체크아웃부터 PR 발행까지 엄격한 거버넌스로 협업합니다.
              </p>
            </div>
            <div className="w-full h-24 bg-[#0a0510] border border-sng-border rounded-sm flex items-center justify-center font-mono text-xs text-purple-400/80">
              [ 🤖 Notion ➔ Paperclip ➔ Discord ➔ K3s Multi-Tier Governance ]
            </div>
          </motion.div>

          {/* Tile 5: Sonagi Anvil (Span 1) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0a0d14] border-2 border-emerald-500 rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-emerald-500/40 rounded-sm text-emerald-400 bg-emerald-500/10">
                  CLOUDFLARE WORKERS • TDD
                </span>
                <Code2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Sonagi Anvil DSA</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                Cloudflare 서버리스 전용 아키텍처 기반의 알고리즘 훈련 플랫폼.
                SSOT 마크다운 문제 규격과 pytest/TDD 검증 파이프라인을 운영합니다.
              </p>
            </div>
            <div className="font-mono text-xs text-emerald-400/80 bg-black/40 p-3 rounded-sm border border-emerald-500/30">
              pytest tests/dsa/ --strict-markers (Passed 100%)
            </div>
          </motion.div>

          {/* Tile 6: Asset Pipeline (Span 2) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 bg-[#0c0d12] border-2 border-sng-dandelion rounded-sm p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-dandelion/40 rounded-sm text-sng-dandelion bg-sng-dandelion/10">
                  ARTCRAFT (VECTORCRAFT) • SONAGI-GRAPH HITL • MINIO CDN
                </span>
                <Sparkles className="w-5 h-5 text-sng-dandelion group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">In-House Asset &amp; Vector Pipeline</h3>
              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                Rust 기반 ArtCraft(VectorCraft) 헤드리스 엔진과 sonagi-graph HITL 파이프라인.
                멀티 시안 자동 생성 및 Paperclip 디렉터 승인을 거쳐 MinIO CDN(cdn.sonagi.space) 및 사내 에셋 허브로 무손실 배포합니다.
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-sng-dandelion/80">
              <span className="px-3 py-1 bg-sng-dandelion/10 border border-sng-dandelion/40 rounded-sm">
                cdn.sonagi.space
              </span>
              <span className="px-3 py-1 bg-sng-dandelion/10 border border-sng-dandelion/40 rounded-sm">
                asset.sonagi.space
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
