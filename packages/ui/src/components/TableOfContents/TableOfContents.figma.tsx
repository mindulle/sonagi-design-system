import React from 'react';
import { TableOfContents } from './TableOfContents';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect Mapping for TOC Items
 * Connects Figma ComponentSet 'TOC Item Components' in Core-Primitives-v3
 */
figma.connect(
  TableOfContents,
  'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=TOC-Node-ID-Placeholder',
  {
    props: {
      state: figma.enum('State', {
        Active: 'Active',
        Default: 'Default',
      }),
    },
    example: () => (
      <TableOfContents
        headings={[
          { id: 'sec-1', text: '1. Active Heading Section', level: 2 },
          { id: 'sec-2', text: '2. Default Section', level: 2 },
        ]}
      />
    ),
  }
);
