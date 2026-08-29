import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 에러 상태 여부 */
  error?: boolean;
}

/**
 * Textarea
 * 
 * Sonagi 디자인 시스템의 다중 입력 텍스트 컴포넌트.
 * Input 아키텍처를 기반으로 확장되며, 우측 하단 리사이즈를 지원합니다.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', disabled, ...props }, ref) => {
    const textareaClass = [
      'sng-textarea',
      error && 'sng-textarea--error',
      className,
    ].filter(Boolean).join(' ');

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={textareaClass}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
