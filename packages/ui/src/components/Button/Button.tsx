"use client";
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'hover' | 'active' | 'disabled';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Figma v3 Spec
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-sans font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2';
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-sm',
    md: 'text-sm px-4 py-2 rounded-base',
    lg: 'text-base px-5 py-3 rounded-md',
  };

  const variantClasses = {
    primary: 'bg-brand-primary text-text-inverse border-transparent',
    secondary: 'bg-transparent text-text-primary border border-border-default',
    danger: 'bg-state-danger text-text-inverse border-transparent',
  };

  let stateClasses = '';
  const isDisabled = disabled || state === 'disabled';
  
  if (isDisabled) {
    if (variant === 'primary') {
      stateClasses = 'bg-bg-surface text-text-disabled border border-border-subtle cursor-not-allowed';
    } else {
      stateClasses = 'bg-bg-base text-text-disabled border border-border-subtle cursor-not-allowed';
    }
  } else {
    if (state === 'default') {
      if (variant === 'primary') stateClasses = 'hover:bg-brand-primary-hover active:scale-[0.98]';
      if (variant === 'secondary') stateClasses = 'hover:bg-bg-surface hover:border-border-strong active:scale-[0.98]';
      if (variant === 'danger') stateClasses = 'hover:opacity-90 active:scale-[0.98]';
    } else if (state === 'hover') {
      if (variant === 'primary') stateClasses = 'bg-brand-primary-hover';
      if (variant === 'secondary') stateClasses = 'bg-bg-surface border-border-strong';
      if (variant === 'danger') stateClasses = 'opacity-90';
    } else if (state === 'active') {
      stateClasses = 'scale-[0.98]';
      if (variant === 'primary') stateClasses += ' bg-brand-primary-hover';
      if (variant === 'secondary') stateClasses += ' bg-bg-surface border-border-strong';
      if (variant === 'danger') stateClasses += ' opacity-90';
    }
  }

  const buttonClass = [
    baseClasses,
    sizeClasses[size],
    isDisabled ? '' : variantClasses[variant],
    stateClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}
