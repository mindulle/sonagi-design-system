import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/**
 * Radio
 * 
 * 단일 선택을 지원하는 라디오 버튼 컴포넌트.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', disabled, ...props }, ref) => {
    const radioClass = [
      'sng-radio',
      className,
    ].filter(Boolean).join(' ');

    return (
      <input
        type="radio"
        ref={ref}
        disabled={disabled}
        className={radioClass}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';
