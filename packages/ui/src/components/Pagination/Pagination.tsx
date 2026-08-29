"use client";

import React from 'react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = '',
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = currentPage - halfVisible;
      let end = currentPage + halfVisible;

      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const navBtnBase =
    'flex h-10 w-10 items-center justify-center rounded-md border font-sans text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent';

  return (
    <nav
      className={`flex items-center justify-center gap-sng-sm ${className}`}
      aria-label="Pagination"
      {...props}
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${navBtnBase} ${
          currentPage === 1
            ? 'cursor-not-allowed border-border-subtle bg-bg-base text-text-disabled'
            : 'border-border-default bg-bg-base text-text-secondary hover:bg-bg-surface hover:text-text-primary'
        }`}
        aria-label="Previous Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center font-sans text-sm text-text-muted"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`${navBtnBase} ${
              isActive
                ? 'border-brand-primary bg-brand-primary text-text-inverse hover:bg-brand-primary-hover'
                : 'border-border-default bg-bg-base text-text-secondary hover:bg-bg-surface hover:text-text-primary'
            }`}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${navBtnBase} ${
          currentPage === totalPages
            ? 'cursor-not-allowed border-border-subtle bg-bg-base text-text-disabled'
            : 'border-border-default bg-bg-base text-text-secondary hover:bg-bg-surface hover:text-text-primary'
        }`}
        aria-label="Next Page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </nav>
  );
}
