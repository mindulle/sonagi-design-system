"use client";
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'pill' | 'label';
  color?: 'info' | 'success' | 'warning' | 'danger' | 'error';
  children: React.ReactNode;
}

export function Badge({
  variant = 'pill',
  color = 'info',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium whitespace-nowrap px-4 py-1.5 text-[13px] leading-[20px] gap-1';
  
  const variantClasses = {
    pill: 'rounded-full',
    label: 'rounded-sm px-2 py-1',
  };

  const colorClasses = {
    info: 'bg-state-info-bg text-state-info border border-state-info/20',
    success: 'bg-state-success-bg text-state-success border border-state-success/20',
    warning: 'bg-state-warning-bg text-state-warning border border-state-warning/20',
    danger: 'bg-state-danger-bg text-state-danger border border-state-danger/20',
    error: 'bg-state-danger-bg text-state-danger border border-state-danger/20', // v1.7 compat
  };

  const badgeClass = [
    baseClasses,
    variantClasses[variant],
    colorClasses[color],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClass} {...props}>
      {variant === 'pill' && <span className="text-[10px]">●</span>}
      {children}
    </span>
  );
}
