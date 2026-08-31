"use client";
import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, label, description, className = '', disabled, ...props }, ref) => {
    
    // Input과 동일한 Tailwind 클래스 적용
    const baseClasses = 'flex w-full font-sans text-sm p-3 rounded-md border bg-bg-elevated text-text-primary transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-bg-base disabled:text-text-disabled disabled:border-border-subtle resize-y min-h-[80px]';
    const stateClasses = error
      ? 'border-state-danger focus-visible:border-state-danger focus-visible:ring-state-danger/30'
      : 'border-border-default focus-visible:border-brand-accent focus-visible:ring-brand-accent/30';

    const textareaClass = [baseClasses, stateClasses].filter(Boolean).join(' ');

    const textareaElement = (
      <textarea ref={ref} disabled={disabled} className={textareaClass} {...props} />
    );

    if (!label && !description) return textareaElement;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && <label className="text-sm font-semibold text-text-primary">{label}</label>}
        {textareaElement}
        {description && <span className={`text-xs ${error ? 'text-state-danger' : 'text-text-secondary'}`}>{description}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
