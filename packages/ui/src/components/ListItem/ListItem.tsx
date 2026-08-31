"use client";
import React from 'react';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isInteractive?: boolean;
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ title, description, leftSlot, rightSlot, isInteractive = true, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-4 w-full p-3 rounded-lg transition-colors duration-200 ${
          isInteractive ? 'cursor-pointer hover:bg-bg-surface active:bg-bg-elevated' : ''
        } ${className}`}
        {...props}
      >
        {/* Left Slot (e.g., Avatar, Icon) */}
        {leftSlot && <div className="shrink-0">{leftSlot}</div>}
        
        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0 justify-center">
          <span className="text-text-primary text-sm font-semibold truncate">{title}</span>
          {description && (
            <span className="text-text-secondary text-xs truncate mt-0.5">{description}</span>
          )}
        </div>
        
        {/* Right Slot (e.g., Chevron, Button, Badge) */}
        {rightSlot && <div className="shrink-0 ml-auto">{rightSlot}</div>}
      </div>
    );
  }
);
ListItem.displayName = 'ListItem';
