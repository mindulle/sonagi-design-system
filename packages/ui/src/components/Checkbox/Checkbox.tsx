import React, { useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, label, description, className = '', disabled, ...props }, forwardedRef) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLInputElement>) || defaultRef;

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [ref, indeterminate]);

    const checkboxClass = ['sng-checkbox'].filter(Boolean).join(' ');

    const inputElement = (
      <input
        type="checkbox"
        ref={ref}
        disabled={disabled}
        className={checkboxClass}
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
Checkbox.displayName = 'Checkbox';
