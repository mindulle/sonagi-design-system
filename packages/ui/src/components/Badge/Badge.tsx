"use client";
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'pill' | 'label';
  color?: 'info' | 'success' | 'warning' | 'error';
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
    info: 'bg-state-info text-[var(--sng-color-brand-primary)] border border-[var(--sng-color-state-info)]',
    success: 'bg-state-success text-[#0f5132] border border-[var(--sng-color-state-success)]',
    warning: 'bg-state-warning text-[#664d03] border border-[var(--sng-color-state-warning)]',
    error: 'bg-state-error text-text-inverse border border-[var(--sng-color-state-error)]',
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
