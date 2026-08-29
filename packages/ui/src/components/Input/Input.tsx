"use client";
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
    const baseClasses = 'flex w-full items-center font-sans text-sm h-10 px-3 rounded-md border bg-bg-elevated text-text-primary transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-bg-base disabled:text-text-disabled disabled:border-border-subtle';
    const stateClasses = error
      ? 'border-state-error focus-visible:border-state-error focus-visible:ring-state-error/30'
      : 'border-border-default focus-visible:border-brand-accent focus-visible:ring-brand-accent/30';

    const inputClass = [
      baseClasses,
      stateClasses,
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
