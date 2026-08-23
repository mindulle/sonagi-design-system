import React from 'react';
import { Button } from './Button';
import figma from '@figma/code-connect';

/**
 * Figma Code Connect Mapping for Button Components
 * Connects Figma ComponentSet 'Button Components' in Core-Primitives-v3
 */
figma.connect(
  Button,
  'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=4-29',
  {
    props: {
      variant: figma.enum('Type', {
        Primary: 'primary',
        Secondary: 'secondary',
        Danger: 'danger',
      }),
      state: figma.enum('State', {
        Default: 'default',
        Hover: 'hover',
        Active: 'active',
        Disabled: 'disabled',
      }),
      size: figma.enum('Size', {
        Medium: 'md',
      }),
      children: figma.string('Button Label'),
    },
    example: ({ variant, state, size, children }) => (
      <Button variant={variant} state={state} size={size}>
        {children}
      </Button>
    ),
  }
);
