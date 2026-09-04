import * as React from "react";
import { LucideProps } from "lucide-react";

export const SngUserIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, className = "", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8"/>
    </svg>
  )
);
SngUserIcon.displayName = "SngUserIcon";
