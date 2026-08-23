import React from 'react';
import { Badge } from './Badge';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect Mapping for Status Badge Components
 * Connects Figma ComponentSet 'Status Badge Components' in Core-Primitives-v3
 */
figma.connect(
  Badge,
  'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=4-40',
  {
    props: {
      variant: figma.enum('Variant', {
        Pill: 'pill',
        Label: 'label',
      }),
      color: figma.enum('Status', {
        Info: 'info',
        Success: 'success',
        Warning: 'warning',
        Error: 'error',
      }),
      children: figma.string('Badge Label'),
    },
    example: ({ variant, color, children }) => (
      <Badge variant={variant} color={color}>
        {children}
      </Badge>
    ),
  }
);
