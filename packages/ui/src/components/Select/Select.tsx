import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** 에러 상태 여부 */
  error?: boolean;
}

/**
 * Select
 * 
 * Sonagi 디자인 시스템의 드롭다운 선택 컴포넌트.
 * Input 아키텍처를 기반으로 확장되며, 우측에 Chevron 아이콘이 고정됩니다.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, className = '', disabled, children, ...props }, ref) => {
    const selectWrapperClass = [
      'sng-select-wrapper',
      className,
    ].filter(Boolean).join(' ');

    const selectClass = [
      'sng-select',
      error && 'sng-select--error',
    ].filter(Boolean).join(' ');

    return (
      <div className={selectWrapperClass}>
        <select
          ref={ref}
          disabled={disabled}
          className={selectClass}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          {children}
        </select>
        <div className="sng-select__icon" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
