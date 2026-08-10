import React from 'react';

export interface AISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

/**
 * 에이전트 스트리밍 또는 지연 처리 시 사용할 스켈레톤 로딩 UI
 */
export function AISkeleton({ width = '100%', height = '20px', borderRadius, className = '', style, ...props }: AISkeletonProps) {
  return (
    <div
      className={`sng-ai-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
      {...props}
    />
  );
}
