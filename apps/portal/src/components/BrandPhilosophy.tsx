import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, CheckCircle } from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 md:px-16 border-b-2 border-sng-border bg-[#090d16]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border-2 border-sng-dandelion/60 bg-sng-dandelion/10 text-sng-dandelion mb-4">
            ATELIER PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            건축의 성벽과 끈질긴 생명력
          </h2>
          <p className="text-sng-muted text-base md:text-lg max-w-2xl mx-auto">
            "기계가 완벽해야 사람이 쉴 수 있다" — 차가운 디지털 건축의 성벽 속에 가장 다정한 사용자 경험을 피워냅니다.
          </p>
        </div>

        {/* Dual Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Architecture Card */}
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
                    <h3 className="text-2xl font-bold text-white">건축적 성벽 (Architecture)</h3>
                    <p className="text-xs font-mono text-sng-rain">THE STRUCTURAL SHIELD</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Neo-Brutalism
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  2px Crisp Border
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Swiss Grid
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 border border-sng-border rounded-sm text-sng-muted bg-white/5">
                  Strict Engineering
                </span>
              </div>

              <p className="text-sng-muted text-sm leading-relaxed mb-6">
                비바람과 불안으로부터 사람을 지키기 위해 세운 엄격한 구조재. 불필요한 장식과 그림자를 걷어내고,
                2px의 단단한 선과 스위스 그리드, W3C 표준 토큰 체계로 작동하는 디지털 요새입니다.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  그림자를 배제한 선명한 2px 솔리드 스트로크
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  스위스 그리드 및 8px 단위 모듈러 레이아웃
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sng-rain shrink-0" />
                  Paperclip 자율 에이전트 통제 거버넌스
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
                차가운 콘크리트 틈에서도 끝끝내 뿌리를 내리고 피어난 노란 민들레꽃. 미세한 마이크로 인터랙션,
                부드러운 반응 모션, 숨 쉴 틈을 주는 여백으로 기술에 인간적인 따뜻함을 불어넣습니다.
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

        {/* Synthesis: 유리 문진 속의 민들레 (페르소나와 진짜 자아의 통합) */}
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
                SYNTHESIS • [유리 문진 속의 민들레 홀씨]
              </span>
              <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                "차갑고 단단한 이성(건축의 방패)이 감싸고 있기에, 그 안의 다정함(민들레)이 으스러지지 않고 온전히 안전할 수 있습니다."
              </p>
              <p className="text-xs text-sng-muted mt-1 leading-relaxed">
                민들레 스튜디오는 이 철학을 현실에서 작동시키기 위해, 실무에서 스스로 검증(Dogfooding)하는 사내 도구 &amp; 오픈소스 제품군 <span className="text-sng-rain font-semibold">소나기(Sonagi)</span>를 깎아 나갑니다.
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-sng-dandelion px-3.5 py-1.5 bg-sng-dandelion/10 border border-sng-dandelion/40 rounded-sm">
            Atelier Essence
          </div>
        </motion.div>
      </div>
    </section>
  );
};
