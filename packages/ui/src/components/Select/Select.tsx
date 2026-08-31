"use client";
import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, label, description, placeholder, className = '', disabled, children, defaultValue = "", ...props }, ref) => {
    
    // Input과 동일한 Tailwind 클래스 적용
    const baseClasses = 'flex w-full items-center font-sans text-sm h-10 px-3 rounded-md border bg-bg-elevated text-text-primary transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-bg-base disabled:text-text-disabled disabled:border-border-subtle appearance-none';
    const stateClasses = error
      ? 'border-state-danger focus-visible:border-state-danger focus-visible:ring-state-danger/30'
      : 'border-border-default focus-visible:border-brand-accent focus-visible:ring-brand-accent/30';

    const selectClass = [baseClasses, stateClasses].filter(Boolean).join(' ');

    const selectElement = (
      <div className="relative w-full">
        <select ref={ref} disabled={disabled} className={selectClass} defaultValue={defaultValue} {...props}>
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {children}
        </select>
        {/* 커스텀 Chevron Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );

    if (!label && !description) return selectElement;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && <label className="text-sm font-semibold text-text-primary">{label}</label>}
        {selectElement}
        {description && <span className={`text-xs ${error ? 'text-state-danger' : 'text-text-secondary'}`}>{description}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
