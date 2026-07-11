import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 성격에 따른 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'danger';
  /** 버튼의 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 로딩 중 표시 여부 */
  loading?: boolean;
  /** 버튼의 라벨 (텍스트) */
  children: React.ReactNode;
}

/**
 * Button
 * 
 * Sonagi 디자인 시스템의 핵심 버튼 컴포넌트.
 * 프레임워크 비종속 CSS 클래스를 활용한 React 래퍼 컴포넌트입니다.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = [
    'sng-btn',
    `sng-btn--${variant}`,
    `sng-btn--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="sng-btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
