import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, label, description, placeholder, className = '', disabled, children, defaultValue = "", ...props }, ref) => {
    const selectWrapperClass = ['sng-select-wrapper'].filter(Boolean).join(' ');
    const selectClass = ['sng-select', error && 'sng-select--error'].filter(Boolean).join(' ');

    const selectElement = (
      <div className={selectWrapperClass}>
        <select ref={ref} disabled={disabled} className={selectClass} defaultValue={defaultValue} {...props}>
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {children}
        </select>
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
