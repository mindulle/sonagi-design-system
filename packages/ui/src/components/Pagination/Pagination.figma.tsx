import React from 'react';
import { Pagination } from './Pagination';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect Mapping for Pagination Controls
 * Connects Figma ComponentSet 'Pagination Item Components' in Core-Primitives-v3
 */
figma.connect(
  Pagination,
  'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=Pagination-Node-ID-Placeholder',
  {
    props: {
      currentPage: figma.enum('State', {
        Active: 1,
        Default: 2,
      }),
    },
    example: ({ currentPage }) => (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={() => {}}
      />
    ),
  }
);
