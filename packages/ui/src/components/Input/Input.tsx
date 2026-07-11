import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 에러 상태 여부 */
  error?: boolean;
}

/**
 * Input
 * 
 * Sonagi 디자인 시스템의 텍스트 입력 컴포넌트.
 * 테마 토큰 기반 스타일과 에러 상태 피드백을 지원합니다.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = '', disabled, ...props }, ref) => {
    const inputClass = [
      'sng-input',
      error && 'sng-input--error',
      className,
    ].filter(Boolean).join(' ');

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
