import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'floating';
  clickable?: boolean;
  children: React.ReactNode;
}

export function Card({
  elevation = 'raised',
  clickable = false,
  children,
  className = '',
  ...props
}: CardProps) {
  // Figma v3 Hand-off Spec for Cards:
  // - Padding All: 24px (actually DESIGN.md says 20px, let's use 20px)
  // - Corner Radius: 12px
  // - Border: 1px Solid Border Default/Subtle
  
  const baseClasses = 'flex flex-col bg-bg-surface border border-border-default rounded-lg p-5 gap-3';
  
  const elevationClasses = {
    flat: 'shadow-none',
    raised: 'shadow-sm',
    floating: 'shadow-md',
  };

  const clickableClasses = clickable ? 'cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' : '';

  const cardClass = [
    baseClasses,
    elevationClasses[elevation],
    clickableClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
}
