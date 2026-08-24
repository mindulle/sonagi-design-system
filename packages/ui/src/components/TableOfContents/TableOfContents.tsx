"use client";

import React, { useEffect, useState } from 'react';

export type TOCHeading = {
  id: string;
  text: string;
  level: number;
};

export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  headings: TOCHeading[];
  className?: string;
}

export function TableOfContents({
  headings,
  className = '',
  ...props
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 0.5 }
    );

    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    headingElements.forEach((el) => observer.observe(el));
    return () => headingElements.forEach((el) => observer.unobserve(el));
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;

    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className={`sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto ${className}`}
      aria-label="Table of Contents"
      {...props}
    >
      <div className="space-y-2">
        <h3 className="mb-3 font-sans text-sm font-bold text-text-primary">
          Table of Contents
        </h3>
        <ul className="space-y-1 text-sm font-sans">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block border-l-2 py-1.5 pl-3 text-sm transition-all duration-150 ${
                    isActive
                      ? 'border-brand-primary bg-state-info-bg font-semibold text-brand-primary'
                      : 'border-border-subtle text-text-muted hover:border-border-default hover:text-text-primary'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
