"use client";
import React, { useState } from 'react';

// --- Accordion Container ---
export interface AccordionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, AccordionContainerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col w-full ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
Container.displayName = 'Accordion.Container';

// --- Accordion Item ---
export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode; // 컨텐츠 영역
}

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, defaultExpanded = false, children, className = '', ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
      <div ref={ref} className={`flex flex-col w-full ${className}`} {...props}>
        {/* Header */}
        <button
          type="button"
          className="flex flex-row justify-between items-center w-full px-4 py-4 bg-transparent hover:bg-bg-surface transition-colors duration-150"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-text-primary text-base font-semibold">{title}</span>
          <span className="text-text-muted text-xl leading-none">
            {isExpanded ? '−' : '+'}
          </span>
        </button>
        
        {/* Content (Hug Contents 동작) */}
        {isExpanded && (
          <div className="px-4 pb-4 flex flex-col w-full">
            <div className="text-text-secondary text-sm whitespace-pre-wrap break-words">
              {children}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-border-subtle" />
      </div>
    );
  }
);
Item.displayName = 'Accordion.Item';

export const Accordion = {
  Container,
  Item,
};
