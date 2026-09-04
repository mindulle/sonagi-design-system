import * as React from "react";
import { LucideProps } from "lucide-react";

export const SngCheckIcon = React.forwardRef<SVGSVGElement, LucideProps>(
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
      <polyline points="19 7 9 17 5 13"/>
    </svg>
  )
);
SngCheckIcon.displayName = "SngCheckIcon";
