"use client";
import React from 'react';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', children, className = '', ...props }, ref) => {
    // 순수 CSS hover와 absolute positioning을 활용한 경량 툴팁
    const positionClasses = {
      top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
      left: 'right-full mr-2 top-1/2 -translate-y-1/2',
      right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    };

    return (
      <div ref={ref} className={`relative inline-flex group ${className}`} {...props}>
        {children}
        <div className={`absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 bg-bg-elevated border border-border-subtle text-text-inverse text-xs rounded-md shadow-lg whitespace-nowrap pointer-events-none ${positionClasses[position]}`}>
          {content}
        </div>
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';
