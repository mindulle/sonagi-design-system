"use client";
import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, type = 'info', onClose, className = '', ...props }, ref) => {
    // 상태 토큰을 배경 및 보더에 적용 (Figma 전수조사 스펙 반영)
    const typeClasses = {
      info: 'border-state-info bg-bg-base',
      success: 'border-state-success bg-bg-base',
      warning: 'border-state-warning bg-bg-base',
      danger: 'border-state-danger bg-bg-base',
    };

    const iconColors = {
      info: 'text-state-info',
      success: 'text-state-success',
      warning: 'text-state-warning',
      danger: 'text-state-danger',
    };

    return (
      <div ref={ref} className={`flex items-start justify-between w-full max-w-sm p-4 rounded-xl border shadow-lg ${typeClasses[type]} ${className}`} {...props}>
        <div className="flex items-start gap-3">
          {/* 심플 상태 인디케이터 (원) */}
          <div className={`mt-1 shrink-0 w-2.5 h-2.5 rounded-full bg-current ${iconColors[type]}`} />
          
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold text-text-primary">{title}</div>
            {description && <div className="text-text-secondary text-sm">{description}</div>}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-text-muted hover:text-text-primary ml-4 shrink-0 transition-colors">
            ✕
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = 'Toast';
