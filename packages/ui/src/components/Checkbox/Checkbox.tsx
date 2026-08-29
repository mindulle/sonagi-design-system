import React, { useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 부분 선택 (Indeterminate) 상태 여부 */
  indeterminate?: boolean;
}

/**
 * Checkbox
 * 
 * 다중 선택을 지원하는 체크박스 컴포넌트.
 * 선택(Checked), 미선택(Unchecked), 반선택(Indeterminate) 상태를 지원합니다.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, className = '', disabled, ...props }, forwardedRef) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLInputElement>) || defaultRef;

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [ref, indeterminate]);

    const checkboxClass = [
      'sng-checkbox',
      className,
    ].filter(Boolean).join(' ');

    return (
      <input
        type="checkbox"
        ref={ref}
        disabled={disabled}
        className={checkboxClass}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
