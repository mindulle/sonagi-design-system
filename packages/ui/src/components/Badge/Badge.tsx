import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export function Badge({
  status = 'info',
  children,
  className = '',
  ...props
}: BadgeProps) {
  // Figma v3 Hand-off Spec for Status Badges:
  // - Padding Left/Right 16px, Top/Bottom 6px
  // - Corner Radius: 16px (full)
  // - Font: 13px (small), Line-Height: 20px
  
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] leading-[20px] gap-1';
  
  const statusClasses = {
    info: 'bg-state-info-light text-state-info',
    success: 'bg-state-success-light text-state-success',
    warning: 'bg-state-warning-light text-state-warning',
    error: 'bg-state-error-light text-state-error',
  };

  const badgeClass = [
    baseClasses,
    statusClasses[status],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClass} {...props}>
      <span className="text-[10px]">●</span>
      {children}
    </span>
  );
}
