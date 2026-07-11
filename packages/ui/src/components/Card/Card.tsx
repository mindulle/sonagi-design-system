import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 클릭 가능한 카드 여부 */
  clickable?: boolean;
  /** 내부 패딩 등을 포함한 카드 콘텐츠 */
  children: React.ReactNode;
}

/**
 * Card
 * 
 * Sonagi 디자인 시스템의 Card 컴포넌트.
 * 내용물을 감싸서 경계와 그림자, 그리고 배경을 입혀줍니다.
 */
export function Card({
  clickable = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const cardClass = [
    'sng-card',
    clickable && 'sng-card--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
