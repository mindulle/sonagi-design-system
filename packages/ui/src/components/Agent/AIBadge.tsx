import React from 'react';

export interface AIBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

/**
 * AI가 생성한 결과물임을 나타내는 뱃지
 */
export function AIBadge({ children = '✨ AI Generated', className = '', ...props }: AIBadgeProps) {
  return (
    <span className={`sng-ai-badge ${className}`} {...props}>
      {children}
    </span>
  );
}
