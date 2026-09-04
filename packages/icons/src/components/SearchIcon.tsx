import * as React from "react";
import { LucideProps } from "lucide-react";

export const SearchIcon = React.forwardRef<SVGSVGElement, LucideProps>(
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
      <circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
  )
);
SearchIcon.displayName = "SearchIcon";
