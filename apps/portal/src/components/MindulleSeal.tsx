import React from 'react';

interface MindulleSealProps {
  size?: number;
  className?: string;
  theme?: 'dark' | 'light';
  showText?: boolean;
}

export const MindulleSeal: React.FC<MindulleSealProps> = ({
  size = 64,
  className = '',
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const strokeColor = isLight ? '#1c1514' : '#ffffff';
  const goldColor = isLight ? '#d97706' : '#ffd166';
  const goldSub = isLight ? '#9a3412' : '#f59e0b';
  const bgColor = isLight ? '#faf8f5' : '#060911';
  const fillOpacity = isLight ? 0.04 : 0.06;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <rect width="400" height="400" rx="20" fill={bgColor} />

      <g transform="translate(195, 205)">
        {/* 01. Seed Origin Pod */}
        <path
          d="M -16,72 C -24,58 -22,44 -14,38 C -6,44 -2,58 -16,72 Z"
          fill={goldColor}
          stroke={goldSub}
          strokeWidth="1.2"
        />
        <circle cx="-14" cy="52" r="2" fill="#ffffff" />

        {/* 02. The Main Mast */}
        <path
          d="M -14,38 C -2,12 14,-25 8,-85"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 03. Primary Main Sail */}
        <path
          d="M -4,22 C -42,5 -75,-15 -85,-55 C -65,-46 -35,-42 3,-45 Z"
          stroke={strokeColor}
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill={strokeColor}
          fillOpacity={fillOpacity}
        />
        <path
          d="M -9,12 C -32,-6 -55,-20 -66,-42"
          stroke={goldColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 04. Top Jib Sail */}
        <path
          d="M 3,-24 C -22,-40 -44,-58 -52,-88 C -38,-80 -18,-74 7,-72 Z"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill={strokeColor}
          fillOpacity={fillOpacity}
        />

        {/* 05. Leading Whispering Breeze Line */}
        <path
          d="M 8,-85 C 26,-58 40,-32 46,-2"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          opacity="0.85"
        />

        {/* Apex Lift Core */}
        <circle cx="8" cy="-85" r="4.5" fill={goldColor} />
        <circle cx="6" cy="-87" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  );
};
