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
  const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2';
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-sm',
    md: 'text-sm px-4 py-[10px] rounded-base',
    lg: 'text-base px-5 py-3 rounded-md',
  };

  const variantClasses = {
    primary: 'bg-brand-primary text-text-inverse border-transparent',
    secondary: 'bg-bg-surface text-text-primary border border-border-subtle',
    danger: 'bg-brand-accent text-text-inverse border-transparent',
  };

  let stateClasses = '';
  const isDisabled = disabled || state === 'disabled';
  
  if (isDisabled) {
    if (variant === 'primary') {
      stateClasses = 'bg-[#e0d3d0] text-[#a89995] border-transparent cursor-not-allowed';
    } else if (variant === 'secondary') {
      stateClasses = 'bg-bg-base text-[#a89995] border border-border-subtle cursor-not-allowed';
    } else if (variant === 'danger') {
      stateClasses = 'bg-bg-base text-[#a89995] border border-border-subtle cursor-not-allowed';
    }
  } else {
    if (state === 'default') {
      if (variant === 'primary') stateClasses = 'hover:bg-brand-primary-hover active:scale-[0.98]';
      if (variant === 'secondary') stateClasses = 'hover:bg-[#e6d6d3] hover:border-border-default active:scale-[0.98]';
      if (variant === 'danger') stateClasses = 'hover:bg-brand-accent-hover active:scale-[0.98]';
    } else if (state === 'hover') {
      if (variant === 'primary') stateClasses = 'bg-brand-primary-hover';
      if (variant === 'secondary') stateClasses = 'bg-[#e6d6d3] border-border-default';
      if (variant === 'danger') stateClasses = 'bg-brand-accent-hover';
    } else if (state === 'active') {
      stateClasses = 'scale-[0.98]';
      if (variant === 'primary') stateClasses += ' bg-brand-primary-hover';
      if (variant === 'secondary') stateClasses += ' bg-[#e6d6d3] border-border-default';
      if (variant === 'danger') stateClasses += ' bg-brand-accent-hover';
    }
  }

  const buttonClass = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
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
