import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MindulleLogo } from './MindulleLogo';

describe('MindulleLogo Component', () => {
  it('renders correctly with default size', () => {
    const { container } = render(<MindulleLogo size={32} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeDefined();
    expect(svgElement?.getAttribute('width')).toBe('32');
    expect(svgElement?.getAttribute('height')).toBe('32');
  });

  it('renders with background rect when withBackground is true', () => {
    const { container } = render(<MindulleLogo size={48} withBackground />);
    const rect = container.querySelector('rect');
    expect(rect).toBeDefined();
    expect(rect?.getAttribute('width')).toBe('400');
  });
});
