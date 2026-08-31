import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className = '', disabled, ...props }, ref) => {
    const radioClass = ['sng-radio'].filter(Boolean).join(' ');

    const inputElement = (
      <input
        type="radio"
        ref={ref}
        disabled={disabled}
        className={radioClass}
        {...props}
      />
    );

    if (!label && !description) return inputElement;

    return (
      <label className={`flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
        <div className="mt-0.5 shrink-0">{inputElement}</div>
        <div className="flex flex-col">
          {label && <span className="text-sm font-semibold text-text-primary">{label}</span>}
          {description && <span className="text-xs text-text-secondary mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }
);
Radio.displayName = 'Radio';
