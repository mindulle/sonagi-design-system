import React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 한국어 브랜드명 표시 여부 (true인 경우 Designhouse Light 폰트 사용) */
  lang?: 'en' | 'ko';
  /** 표시될 브랜드 이름 텍스트 */
  children: React.ReactNode;
}

/**
 * Wordmark
 * 
 * Sonagi 디자인 시스템의 브랜드 로고/워드마크 컴포넌트.
 * 로고 고유의 색상(#00ffcc) 도트 포인트를 포함합니다.
 */
export function Wordmark({
  lang = 'en',
  children,
  className = '',
  ...props
}: WordmarkProps) {
  const isKo = lang === 'ko';
  
  return (
    <div className={`sng-wordmark ${className}`} {...props}>
      <span className={`sng-wordmark__text ${isKo ? 'sng-wordmark__text--ko' : ''}`}>
        {children}
      </span>
      <span className="sng-wordmark__dot" aria-hidden="true" />
    </div>
  );
}
