import React from 'react';

interface MindulleSealProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const MindulleSeal: React.FC<MindulleSealProps> = ({
  size = 64,
  className = '',
  showText = true,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <defs>
        <path id="sealUpperArc" d="M 54,200 A 146,146 0 1,1 346,200" fill="none" />
        <path id="sealLowerArc" d="M 64,210 A 142,142 0 0,0 336,210" fill="none" />

        <radialGradient id="sealGlassAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd166" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#4A90E2" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#00ffcc" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#060911" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sealFacetHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="sealGoldCore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff5cc" />
          <stop offset="50%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Base Disc */}
      <circle cx="200" cy="200" r="192" fill="#060911" />
      <circle cx="200" cy="200" r="192" fill="url(#sealGlassAura)" />

      {/* Outer Double Seal Rings (2px & 1px Architecture) */}
      <circle cx="200" cy="200" r="188" stroke="#30363d" strokeWidth="2" />
      <circle cx="200" cy="200" r="176" stroke="#4A90E2" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
      <circle cx="200" cy="200" r="126" stroke="#30363d" strokeWidth="2" />
      <circle cx="200" cy="200" r="120" stroke="#1e2430" strokeWidth="1" />

      {showText && (
        <>
          <text
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: '21px',
              letterSpacing: '0.28em',
              fill: '#ffffff',
            }}
          >
            <textPath href="#sealUpperArc" startOffset="50%" textAnchor="middle">
              MINDULLE STUDIO
            </textPath>
          </text>

          <text
            style={{
              fontFamily: "'JetBrains Mono', Consolas, monospace",
              fontWeight: 600,
              fontSize: '10px',
              letterSpacing: '0.22em',
              fill: '#ffd166',
            }}
          >
            <textPath href="#sealLowerArc" startOffset="50%" textAnchor="middle">
              • SOUL &amp; HARNESS • EST. 2026 •
            </textPath>
          </text>

          {/* Separator Stars */}
          <polygon points="50,193 52,198 57,200 52,202 50,207 48,202 43,200 48,198" fill="#ffd166" />
          <polygon points="350,193 352,198 357,200 352,202 350,207 348,202 343,200 348,198" fill="#ffd166" />
        </>
      )}

      {/* Glass Bevel Facets (Crystalline Dome of Paperweight) */}
      <polygon
        points="200,88 279,121 312,200 279,279 200,312 121,279 88,200 121,121"
        stroke="#4A90E2"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <polygon
        points="200,104 268,132 296,200 268,268 200,296 132,268 104,200 132,132"
        stroke="url(#sealFacetHighlight)"
        strokeWidth="1"
        fill="#090d16"
        fillOpacity="0.6"
      />

      {/* Refraction Lines */}
      <line x1="121" y1="121" x2="200" y2="200" stroke="#4A90E2" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
      <line x1="279" y1="121" x2="200" y2="200" stroke="#4A90E2" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
      <line x1="279" y1="279" x2="200" y2="200" stroke="#4A90E2" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />
      <line x1="121" y1="279" x2="200" y2="200" stroke="#4A90E2" strokeWidth="1" strokeDasharray="2 3" opacity="0.35" />

      {/* Glass Dome Highlight Glint */}
      <path d="M 148,148 A 74,74 0 0,1 252,148" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="160" cy="154" r="2" fill="#ffffff" opacity="0.8" />

      {/* 16 Radial Pappus Filaments (Dandelion Fluff) */}
      <g stroke="#ffd166" strokeWidth="1.2" opacity="0.85">
        <line x1="200" y1="200" x2="200" y2="132" />
        <circle cx="200" cy="132" r="2" fill="#fff5cc" />
        <line x1="200" y1="138" x2="194" y2="132" strokeWidth="0.8" />
        <line x1="200" y1="138" x2="206" y2="132" strokeWidth="0.8" />

        <line x1="200" y1="200" x2="226" y2="137" />
        <circle cx="226" cy="137" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="248" y2="152" />
        <circle cx="248" cy="152" r="2" fill="#fff5cc" />
        <line x1="242" y1="158" x2="245" y2="149" strokeWidth="0.8" />
        <line x1="242" y1="158" x2="252" y2="157" strokeWidth="0.8" />

        <line x1="200" y1="200" x2="263" y2="174" />
        <circle cx="263" cy="174" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="268" y2="200" />
        <circle cx="268" cy="200" r="2" fill="#fff5cc" />
        <line x1="262" y1="200" x2="268" y2="194" strokeWidth="0.8" />
        <line x1="262" y1="200" x2="268" y2="206" strokeWidth="0.8" />

        <line x1="200" y1="200" x2="263" y2="226" />
        <circle cx="263" cy="226" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="248" y2="248" />
        <circle cx="248" cy="248" r="2" fill="#fff5cc" />

        <line x1="200" y1="200" x2="226" y2="263" />
        <circle cx="226" cy="263" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="200" y2="268" />
        <circle cx="200" cy="268" r="2" fill="#fff5cc" />

        <line x1="200" y1="200" x2="174" y2="263" />
        <circle cx="174" cy="263" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="152" y2="248" />
        <circle cx="152" cy="248" r="2" fill="#fff5cc" />

        <line x1="200" y1="200" x2="137" y2="226" />
        <circle cx="137" cy="226" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="132" y2="200" />
        <circle cx="132" cy="200" r="2" fill="#fff5cc" />
        <line x1="138" y1="200" x2="132" y2="194" strokeWidth="0.8" />
        <line x1="138" y1="200" x2="132" y2="206" strokeWidth="0.8" />

        <line x1="200" y1="200" x2="137" y2="174" />
        <circle cx="137" cy="174" r="1.8" fill="#fff5cc" />

        <line x1="200" y1="200" x2="152" y2="152" />
        <circle cx="152" cy="152" r="2" fill="#fff5cc" />
        <line x1="158" y1="158" x2="148" y2="157" strokeWidth="0.8" />
        <line x1="158" y1="158" x2="155" y2="149" strokeWidth="0.8" />

        <line x1="200" y1="200" x2="174" y2="137" />
        <circle cx="174" cy="137" r="1.8" fill="#fff5cc" />
      </g>

      {/* Central Stem & Seed Core (The Living Soul) */}
      <line x1="200" y1="200" x2="200" y2="228" stroke="url(#sealGoldCore)" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="200" cy="200" rx="6" ry="10" fill="url(#sealGoldCore)" />
      <ellipse cx="200" cy="200" rx="3" ry="6" fill="#ffffff" opacity="0.9" />

      {/* Ambient Particle Specks */}
      <circle cx="182" cy="170" r="1.5" fill="#ffd166" opacity="0.7" />
      <circle cx="218" cy="174" r="1.2" fill="#4A90E2" opacity="0.8" />
      <circle cx="178" cy="225" r="1.5" fill="#4A90E2" opacity="0.7" />
      <circle cx="222" cy="220" r="1.2" fill="#ffd166" opacity="0.8" />
    </svg>
  );
};
