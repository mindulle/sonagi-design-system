"use client";
import React from 'react';

// --- FAB (Floating Action Button) ---
export const FAB = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', children, ...props }, ref) => (
    <button 
      ref={ref} 
      className={`fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-brand-primary text-base-white rounded-full shadow-lg hover:bg-brand-primary-hover active:scale-95 transition-all z-40 ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
);
FAB.displayName = 'FAB';

// --- BottomSheet ---
export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children, className = '' }: BottomSheetProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Sheet Content (Slide Up) */}
      <div className={`relative bg-bg-surface w-full rounded-t-3xl shadow-xl flex flex-col animate-in slide-in-from-bottom-full duration-300 ${className}`}>
        {/* Drag Handle Area */}
        <div className="w-full flex justify-center py-4 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        {/* Body */}
        <div className="px-6 pb-8 pt-2 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};
