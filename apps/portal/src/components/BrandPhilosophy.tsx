import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, CheckCircle } from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#090d16]"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border-2 border-sng-dandelion/60 bg-sng-dandelion/10 text-sng-dandelion mb-4">
            ATELIER PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            아늑한 공방과 자유로운 생명력
          </h2>
          <p className="text-sng-muted text-base md:text-lg max-w-2xl mx-auto">
            "도구가 완벽할 때, 손길은 비로소 자유로워진다" — 차가운 성벽의 족쇄를 풀고, 태블릿과
            펜의 손맛으로 다정한 사용자 경험을 빚어냅니다.
          </p>
        </div>

        {/* Dual Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Atelier Tooling Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#070a12] border-2 border-sng-rain rounded-sm p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sng-rain/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sng-rain/10 border-2 border-sng-rain rounded-sm text-sng-rain">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">정밀한 공방 (The Atelier)</h3>
                    <p className="text-xs font-mono text-sng-rain">THE HANDCRAFTED FORGE</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Handcrafted Tooling
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  2px Refined Line
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Stylus &amp; Brush
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Artisan Precision
                </span>
              </div>

              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                불필요한 타협과 차가운 성벽을 걷어내고, 창작자의 손길을 돕기 위해 세공된 정밀한
                디지털 조각도. 태블릿의 펜 툴과 브러시, W3C 표준 토큰 체계로 작동하는 현대적
                아틀리에 공방입니다.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  태블릿 스타일러스 필압과 3차 베지어 곡선 보정
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  VectorCraft &amp; PhotoCraft 기반 자유로운 드로잉
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  도구의 잡음을 없애 창작자의 몰입을 지키는 하네스
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Vitality Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0e0d0a] border-2 border-sng-dandelion rounded-sm p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sng-dandelion/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sng-dandelion/10 border-2 border-sng-dandelion rounded-sm text-sng-dandelion">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">소박한 생명력 (Vitality)</h3>
                    <p className="text-xs font-mono text-sng-dandelion">HUMAN-CENTRIC AFFECTION</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Warm Ambient Glow
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Micro-Interactions
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Spacious Negative Space
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Human Dignity
                </span>
              </div>

              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                차가운 콘크리트 틈에서도 끝끝내 뿌리를 내리고 피어난 노란 민들레꽃. 미세한 마이크로
                인터랙션, 부드러운 반응 모션, 숨 쉴 틈을 주는 여백으로 기술에 인간적인 따뜻함을
                불어넣습니다.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-dandelion shrink-0" />
                  민들레 옐로우 글로우와 편안한 웜 뉴트럴 톤
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-dandelion shrink-0" />
                  Framer Motion &amp; Theatre.js 기반 부드러운 반응성
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-dandelion shrink-0" />
                  사용자 맥락을 존중하는 배려 깊은 UI 계층화
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Synthesis: 아틀리에 공방과 자유로운 홀씨 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 w-full bg-[#060911] border-2 border-sng-border rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex items-start md:items-center gap-5">
            <div className="shrink-0 p-1 bg-[#090d16] border-2 border-sng-border rounded-sm shadow-xl">
              <MindulleSeal size={72} showText={true} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-sng-dandelion block mb-1">
                SYNTHESIS • [바람을 타는 황금 나선 홀씨]
              </span>
              <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                "도구가 완벽할 때, 손길은 비로소 자유로워진다."
              </p>
              <p className="text-xs text-sng-muted mt-1 leading-relaxed">
                민들레 스튜디오는 차가운 성벽의 족쇄를 풀고, 태블릿의 펜과 브러시로 창작자의 손맛을
                온전히 살려내는 사내 도구 &amp; 오픈소스 제품군{' '}
                <span className="text-sng-rain font-semibold">소나기(Sonagi)</span>를 깎아 나갑니다.
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-sng-dandelion px-3.5 py-1.5 bg-sng-dandelion/10 border border-sng-dandelion/40 rounded-sm">
            Atelier Essence
          </div>
        </motion.div>

        {/* Dual-Track Governance: Creative Brief & Master Brand Bible */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-[#070a12] border-2 border-sng-rain/40 rounded-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-sng-rain font-semibold">
                  TRACK A • 과정의 문서
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-sng-rain/40 bg-sng-rain/10 rounded-sm text-sng-rain">
                  WORKING BRIEF
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-1">
                Mindulle &amp; Sonagi Creative Brief
              </h4>
              <p className="text-xs text-sng-muted leading-relaxed">
                99designs·라우드소싱 실전 7대 성향 슬라이더, 결핍 정의, 업계 클리셰
                배제(Anti-patterns), 60-30-10 배색 예산 공식.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Template v3.0</span>
              <span className="text-sng-rain font-semibold">llm-wiki SSOT</span>
            </div>
          </div>

          <div className="bg-[#0e0d0a] border-2 border-sng-dandelion/40 rounded-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-sng-dandelion font-semibold">
                  TRACK B • 결과물의 헌법
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-sng-dandelion/40 bg-sng-dandelion/10 rounded-sm text-sng-dandelion">
                  MASTER BIBLE
                </span>
              </div>
              <h4 className="text-white font-bold text-base mb-1">
                Master Brand Bible &amp; The Trinity
              </h4>
              <p className="text-xs text-sng-muted leading-relaxed">
                Uber·Audi·Toss·IBM Carbon·Pentagram 10대 장 완비 구조. 1X Clearspace, 수학적 락업
                공식, 10대 절대 금지 규정.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Constitution v3.0</span>
              <span className="text-sng-dandelion font-semibold">llm-wiki SSOT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
