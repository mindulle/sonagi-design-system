"use client";
import React from 'react';

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isSticky?: boolean;
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({ leftSlot, centerSlot, rightSlot, isSticky = true, className = '', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`w-full flex items-center justify-between h-16 px-sng-global-margin border-b border-border-subtle bg-bg-surface/80 backdrop-blur-md z-50 transition-colors duration-200 ${
          isSticky ? 'sticky top-0' : 'relative'
        } ${className}`}
        {...props}
      >
        {/* Left: Logo / Brand */}
        <div className="flex items-center justify-start flex-1 min-w-0">
          {leftSlot}
        </div>
        
        {/* Center: Navigation (Desktop에서만 보임, 모바일은 BottomSheet로 이동 예정) */}
        <div className="hidden md:flex items-center justify-center flex-none">
          {centerSlot}
        </div>
        
        {/* Right: Actions (Theme Toggle, Profile, GitHub 등) */}
        <div className="flex items-center justify-end flex-1 min-w-0 gap-2 md:gap-4">
          {rightSlot}
        </div>
      </header>
    );
  }
);
TopBar.displayName = 'TopBar';
