import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ds' | '3d' | 'ai' | 'fullstack';
  tags: string[];
  description: string;
  githubUrl?: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: 'sonagi-ds',
    title: 'Sonagi Design System V3',
    subtitle: 'W3C Tokens & Figma Plugin Bridge',
    category: 'ds',
    tags: ['Figma Plugin', 'W3C Tokens', 'OKLCH', 'Storybook', 'Tailwind'],
    description:
      'W3C 표준 디자인 토큰 컴파일러 및 OKLCH 2-Tier 시맨틱 컬러 기반 디자인 시스템. Figma 플러그인과 콘솔 스크립트로 디자인-코드 간 양방향 동기화를 달성했습니다.',
    githubUrl: 'https://github.com/mindulle/sonagi-design-system',
    accentColor: '#d2645f',
  },
  {
    id: 'sonagi-draw',
    title: 'Sonagi Draw Collaboration Engine',
    subtitle: 'tldraw Custom Shapes & Canvas Bridge',
    category: 'fullstack',
    tags: ['tldraw', 'WebSockets', 'Canvas Bridge', 'MCP Protocol', 'Vite'],
    description:
      '화이트보드 캔버스 위에서 AI 에이전트와 인간이 실시간으로 상호작용하는 협업 엔진. 안전한 Canvas Bridge를 통해 커스텀 도형을 동적으로 배치하고 제어합니다.',
    githubUrl: 'https://github.com/mindulle/sonagi-draw',
    accentColor: '#00ffcc',
  },
  {
    id: 'sonagi-anvil',
    title: 'Sonagi Anvil DSA Training Platform',
    subtitle: 'Cloudflare Serverless & TDD Pipeline',
    category: 'fullstack',
    tags: ['Cloudflare Workers', 'pytest', 'TDD', 'Vanilla UI', 'SSOT'],
    description:
      '알고리즘 및 자료구조 훈련 플랫폼. Cloudflare 서버리스 아키텍처 위에서 마크다운 SSOT 문제 규격과 엄격한 TDD 검증 파이프라인을 운영합니다.',
    githubUrl: 'https://github.com/mindulle/sonagi-anvil',
    accentColor: '#2ea043',
  },
  {
    id: 'work-1953',
    title: 'WorkExperience_1953 Analysis Pipeline',
    subtitle: 'Online Review Scraping & Automated Analytics',
    category: 'ai',
    tags: ['Data Crawling', 'Metabase', 'Automation', 'Python', 'Analytics'],
    description:
      '1953형제돼지국밥 온라인 반응 수집 및 감성 분석 자동화 파이프라인. 로컬웨이브 팀 일경험 프로젝트로 실시간 대시보드와 고객 인사이트 리포트를 도출했습니다.',
    githubUrl: 'https://github.com/mindulle/WorkExperience_1953',
    accentColor: '#ffd166',
  },
  {
    id: 'sonagi-motion',
    title: 'Sonagi Motion Lab',
    subtitle: 'Theatre.js & Three.js Cinematic Studio',
    category: '3d',
    tags: ['Three.js', 'Theatre.js', 'Blender .glb', 'R3F', 'Framer Motion'],
    description:
      '웹 상에서 개발자 없이 정밀한 타임라인 키프레임과 카메라 워크를 연출할 수 있는 시네마틱 3D 스튜디오. Blender 정지 자산과 웹 모션을 유기적으로 결합합니다.',
    githubUrl: 'https://github.com/mindulle/sonagi-design-system',
    accentColor: '#4A90E2',
  },
  {
    id: 'sonagi-iac-cli',
    title: 'Sonagi Infra & Orchestration CLI',
    subtitle: 'K3s, Ansible IaC & Go CLI Suite',
    category: 'ai',
    tags: ['Go CLI', 'Ansible IaC', 'K3s Cluster', 'Tailscale', 'Paperclip'],
    description:
      '전체 인프라를 코드로 관리하는 Ansible IaC와 Go 기반 통합 제어 CLI. Paperclip AI 거버넌스와 결합하여 수십 대의 에이전트 워크플로를 지탱합니다.',
    githubUrl: 'https://github.com/mindulle/sonagi-cli',
    accentColor: '#a855f7',
  },
];

export const ProjectGallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ds' | '3d' | 'ai' | 'fullstack'>('all');

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="showroom" className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#090d16]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border-2 border-sng-rain/60 bg-sng-rain/10 text-sng-rain mb-4">
              PROVEN IMPACT &amp; CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              실전 성과 및 쇼룸 (Case Studies)
            </h2>
            <p className="text-sng-muted text-base">
              소나기 도구군을 기반으로 민들레 스튜디오가 구축하고 배포한 실무 프로덕트들입니다.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All (6)' },
              { id: 'ds', label: 'Design System' },
              { id: '3d', label: 'WebGL & 3D' },
              { id: 'ai', label: 'AI & Infra' },
              { id: 'fullstack', label: 'Full-Stack' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-sm border-2 transition-all ${
                  filter === tab.id
                    ? 'border-sng-cyan bg-sng-cyan text-black font-bold'
                    : 'border-sng-border text-sng-muted hover:border-gray-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-[#070a12] border-2 border-sng-border hover:border-gray-400 rounded-sm p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                {/* Visual Thumbnail Placeholder */}
                <div
                  className="w-full h-36 bg-[#0d121c] border-2 rounded-sm mb-5 flex flex-col items-center justify-center p-4 relative overflow-hidden"
                  style={{ borderColor: `${project.accentColor}55` }}
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(${project.accentColor} 1px, transparent 1px)`,
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <Sparkles
                    className="w-8 h-8 mb-2 transition-transform group-hover:scale-125"
                    style={{ color: project.accentColor }}
                  />
                  <span className="font-mono text-xs font-semibold text-white/90 text-center">
                    {project.title}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sng-rain transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-sng-muted mb-3">{project.subtitle}</p>

                <p className="text-sng-muted text-xs leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t-2 border-sng-border/60 flex items-center justify-between">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                ) : (
                  <span />
                )}

                <a
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-sm border border-white/20 transition-all"
                >
                  자세히 보기
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
