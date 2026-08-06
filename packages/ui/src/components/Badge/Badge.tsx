import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 뱃지의 형태 (pill = 알약 형태, label = 모서리가 둥근 사각형 형태) */
  variant?: 'pill' | 'label';
  /** 상태 색상 */
  color?: 'success' | 'warning' | 'error' | 'info';
  /** 뱃지 내부 텍스트 */
  children: React.ReactNode;
}

/**
 * Badge
 * 
 * Sonagi 디자인 시스템의 상태 및 분류 배지 컴포넌트.
 */
export function Badge({
  variant = 'pill',
  color = 'info',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const badgeClass = [
    'sng-badge',
    `sng-badge--${variant}`,
    `sng-badge--${color}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
}
