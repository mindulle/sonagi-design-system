"use client";
import React from 'react';

// --- Tabs Container ---
export interface TabsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, TabsContainerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        // py-1을 주어 포커스 링이 잘리지 않게 보호하고, scroll-smooth 추가
        className={`flex flex-row items-center overflow-x-auto gap-6 w-full py-1 ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = 'Tabs.Container';

// --- Tabs Item ---
export interface TabsItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const Item = React.forwardRef<HTMLButtonElement, TabsItemProps>(
  ({ isActive = false, children, className = '', ...props }, ref) => {
    // 1층위 시각적 디자인 규칙 적용 (shrink-0 추가로 찌그러짐 방지)
    const baseClasses = 'flex shrink-0 items-center justify-center px-4 py-2 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary';
    const stateClasses = isActive
      ? 'text-brand-primary bg-bg-surface font-semibold'
      : 'text-text-secondary bg-transparent hover:text-text-primary hover:bg-bg-elevated font-normal';

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseClasses} ${stateClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Item.displayName = 'Tabs.Item';

export const Tabs = {
  Container,
  Item,
};
