import React from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 시각적 스타일 변형
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  
  /**
   * 버튼의 크기
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 비활성화 상태
   */
  isDisabled?: boolean;
  
  /**
   * 로딩 상태
   */
  isLoading?: boolean;
  
  /**
   * 버튼 내용
   */
  children: React.ReactNode;
  
  /**
   * 전체 너비 사용
   */
  fullWidth?: boolean;
}

/**
 * 소나기 디자인 시스템의 기본 Button 컴포넌트
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   클릭하세요
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      isDisabled = false,
      isLoading = false,
      children,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = clsx(
      styles.button,
      styles[variant],
      styles[size],
      {
        [styles.disabled]: isDisabled || isLoading,
        [styles.loading]: isLoading,
        [styles.fullWidth]: fullWidth,
      },
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg
              className={styles.spinnerSvg}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={styles.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </span>
        )}
        <span className={clsx({ [styles.content]: isLoading })}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
