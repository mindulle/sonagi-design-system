"use client";
import React from 'react';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', children, className = '', ...props }, ref) => {
    // 툴팁 본문 위치
    const positionClasses = {
      top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
      left: 'right-full mr-2 top-1/2 -translate-y-1/2',
      right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    };

    // 툴팁 꼬리(Caret) 위치 및 테두리 색상 (Inverse Theme)
    const caretClasses = {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-text-primary border-l-transparent border-r-transparent border-b-transparent',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-text-primary border-l-transparent border-r-transparent border-t-transparent',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-text-primary border-t-transparent border-b-transparent border-r-transparent',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-text-primary border-t-transparent border-b-transparent border-l-transparent',
    };

    return (
      <div ref={ref} className={`relative inline-flex group ${className}`} {...props}>
        {children}
        <div className={`absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 bg-text-primary text-bg-base font-medium text-xs rounded-md shadow-lg whitespace-nowrap pointer-events-none ${positionClasses[position]}`}>
          {content}
          <div className={`absolute border-[5px] ${caretClasses[position]}`} />
        </div>
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';
