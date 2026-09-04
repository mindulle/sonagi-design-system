import * as React from "react";
import { LucideProps } from "lucide-react";

export const SngArrowRightIcon = React.forwardRef<SVGSVGElement, LucideProps>(
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
      <line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/>
    </svg>
  )
);
SngArrowRightIcon.displayName = "SngArrowRightIcon";
