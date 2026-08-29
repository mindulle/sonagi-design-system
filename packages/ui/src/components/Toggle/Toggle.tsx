import React from 'react';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/**
 * Toggle (Switch)
 * 
 * On/Off 상태를 제어하는 설정 스위치 컴포넌트.
 * 트랙과 썸(Thumb)의 마이크로 인터랙션을 지원합니다.
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', disabled, ...props }, ref) => {
    const toggleWrapperClass = [
      'sng-toggle-wrapper',
      disabled && 'sng-toggle-wrapper--disabled',
      className,
    ].filter(Boolean).join(' ');

    return (
      <label className={toggleWrapperClass}>
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className="sng-toggle-input"
          {...props}
        />
        <span className="sng-toggle-track">
          <span className="sng-toggle-thumb" />
        </span>
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
