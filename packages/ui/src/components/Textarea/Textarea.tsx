import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, label, description, className = '', disabled, ...props }, ref) => {
    const textareaClass = ['sng-textarea', error && 'sng-textarea--error'].filter(Boolean).join(' ');

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
