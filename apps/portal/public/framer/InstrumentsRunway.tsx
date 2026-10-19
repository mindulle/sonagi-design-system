import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

interface ToolItem {
  id: string;
  name: string;
  badge: string;
  tag: string;
  desc: string;
  spec: string;
  href: string;
}

const DEFAULT_TOOLS: ToolItem[] = [
  {
    id: "01",
    name: "VectorCraft",
    badge: "BEZIER ENGINE",
    tag: "PRECISION STYLUS FORGE",
    desc: "3차 베지어 곡선 보정과 태블릿 펜 필압을 지원하는 순수 벡터 공방. 단 1px의 오차 없는 선화 에셋을 직접 세공합니다.",
    spec: "Engine: Affinity SDK • Output: SVG",
    href: "https://draw.sonagi.space/vector/",
  },
  {
    id: "02",
    name: "PhotoCraft",
    badge: "ANALOG EMULSION",
    tag: "RETRO GRAIN LAB",
    desc: "차가운 디지털 픽셀 위에 아날로그 필름의 온기와 젖은 흙내음을 입히는 이미지 에디터.",
    spec: "Filter: 35mm Grain • Output: WebP",
    href: "https://draw.sonagi.space/photo/",
  },
  {
    id: "03",
    name: "EffectCraft",
    badge: "WEBGL & SHADER",
    tag: "REALTIME PARTICLE ATELIER",
    desc: "실시간 WebGL 셰이더와 비/물결 메타포를 조작하는 시네마틱 비주얼 이펙트 스튜디오. GPU 가속으로 물방울을 빚어냅니다.",
    spec: "Pipeline: Three.js • GPU: WebGL",
    href: "https://design.sonagi.space/effect/",
  },
  {
    id: "04",
    name: "DesignCraft",
    badge: "W3C TOKEN SSOT",
    tag: "LAYOUT COMPOSER",
    desc: "The True 2px Law와 8px 스위스 모듈을 컴포넌트 트리에 바인딩하는 UI 조립기. 견고한 시스템을 구축합니다.",
    spec: "Tokens: @mindulle/tokens • 2px Law",
    href: "https://design.sonagi.space/catalog/",
  },
  {
    id: "05",
    name: "FilmCraft",
    badge: "TIMELINE DIRECTOR",
    tag: "THEATRE.JS MOTION LAB",
    desc: "키프레임 타임라인과 가상 3D 카메라 워크를 직관적으로 연출하는 모션 디렉터. 스크롤 반응 시네마틱 서사.",
    spec: "Studio: @theatre/studio • State: JSON",
    href: "https://design.sonagi.space/playground/",
  },
  {
    id: "06",
    name: "Sonagi Draw",
    badge: "CANVAS HARNESS",
    tag: "COLLABORATIVE WHITEBOARD",
    desc: "tldraw 기반의 실시간 화이트보드와 에이전트 연동 작업대. 기획 아이디어를 스케치합니다.",
    spec: "Engine: Tldraw v3 • Bridge: Canvas",
    href: "https://draw.sonagi.space/",
  },
];

interface InstrumentsRunwayProps {
  trackHeightVh?: number;
  slidePercentage?: number;
}

/**
 * 🛫 InstrumentsRunway (Mindulle Studio Official Framer Code Component)
 *
 * 세로 스크롤 시 화면이 고정(Sticky)된 상태에서 6대 도구 카드가 가로로 유려하게 미끄러지는 시네마틱 런웨이 트랙입니다.
 */
export default function InstrumentsRunway({
  trackHeightVh = 300,
  slidePercentage = 55,
}: InstrumentsRunwayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const runwayX = useTransform(scrollYProgress, [0, 1], ["0%", `-${slidePercentage}%`]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${trackHeightVh}vh`,
        backgroundColor: "#060911",
        color: "#f1f5f9",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 48px",
          overflow: "hidden",
          borderBottom: "2px solid rgba(48, 54, 61, 0.6)",
          boxSizing: "border-box",
        }}
      >
        {/* Track Header */}
        <div
          style={{
            width: "100%",
            maxWidth: "1824px",
            margin: "0 auto 32px auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "12px",
                color: "#ffd166",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ARTICLE III • THE 6-IN-1 TOOLING SUITE
            </span>
            <h2
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "40px",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              "도구가 완전할 때, 손길은 거침없이 뻗어 나간다."
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#4A90E2",
              fontWeight: "bold",
            }}
          >
            <span>◄ 휠을 굴리면 6대 도구가 가로로 활주합니다 ►</span>
          </div>
        </div>

        {/* 🌟 가로로 슬라이딩되는 카드 레일 */}
        <motion.div
          style={{
            x: runwayX,
            display: "flex",
            alignItems: "center",
            gap: "32px",
            width: "max-content",
            padding: "16px 0",
          }}
        >
          {DEFAULT_TOOLS.map((t) => (
            <div
              key={t.id}
              style={{
                width: "460px",
                height: "340px",
                padding: "32px",
                borderRadius: "2px",
                backgroundColor: "#090d16",
                border: "2px solid #30363d",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                flexShrink: 0,
                boxSizing: "border-box",
                transition: "border-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "monospace", fontWeight: "bold", fontSize: "12px", color: "#ffd166" }}>
                  ARTIFACT • {t.id}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "2px",
                    border: "1px solid #4A90E2",
                    backgroundColor: "rgba(74, 144, 226, 0.1)",
                    fontSize: "10px",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    color: "#4A90E2",
                  }}
                >
                  {t.badge}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3
                  style={{
                    fontFamily: "serif",
                    fontWeight: "bold",
                    fontSize: "28px",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  {t.name}
                </h3>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    fontSize: "11px",
                    color: "#4A90E2",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.tag}
                </span>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "13px",
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    margin: "8px 0 0 0",
                  }}
                >
                  {t.desc}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(48, 54, 61, 0.6)",
                  fontFamily: "monospace",
                  fontSize: "11px",
                }}
              >
                <span style={{ color: "#64748b" }}>{t.spec}</span>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "#ffd166",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>EXPLORE</span>
                  <span>➔</span>
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 🎛️ Framer UI Native Property Controls
addPropertyControls(InstrumentsRunway, {
  trackHeightVh: {
    type: ControlType.Number,
    title: "Track Height (vh)",
    defaultValue: 300,
    min: 150,
    max: 600,
    step: 50,
    description: "전체 활주 트랙 길이. 값이 클수록 카드들이 천천히 우아하게 미끄러집니다.",
  },
  slidePercentage: {
    type: ControlType.Number,
    title: "Slide Reach (%)",
    defaultValue: 55,
    min: 20,
    max: 100,
    step: 5,
    description: "끝까지 스크롤했을 때 가로로 밀려나는 비율",
  },
});
