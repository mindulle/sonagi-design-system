"use client";
import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className = '',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-sng-overlay backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        className={`relative z-[301] w-full max-w-lg overflow-hidden rounded-sng-xl border border-border-default bg-bg-elevated p-sng-container-lg shadow-lg transition-all flex flex-col gap-sng-group ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-sng-md p-sng-element-py text-text-muted hover:bg-bg-surface hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}

        {description && (
          <p className="text-sm text-text-muted">{description}</p>
        )}

        <div className="text-text-primary">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-sng-sm border-t border-border-subtle pt-sng-container-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
