"use client";
import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  alt?: string;
  initials?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'md', src, alt = 'Avatar', initials, className = '', ...props }, ref) => {
    // Figma 시안에 정의된 Size (Sm, Md, Lg)
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',     // 32px
      md: 'w-10 h-10 text-sm',   // 40px
      lg: 'w-14 h-14 text-base', // 56px
    };

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-gray-200 text-text-primary font-medium ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials?.substring(0, 2).toUpperCase() || '?'}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
