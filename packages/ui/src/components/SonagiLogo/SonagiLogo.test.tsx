import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SonagiLogo } from './SonagiLogo';

describe('SonagiLogo Component', () => {
  it('renders default full logo variant correctly', () => {
    const { container } = render(<SonagiLogo height={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute('height', '32');
    expect(container.querySelector('mask#sng-stencil-mask')).toBeTruthy();
  });

  it('renders symbol variant correctly', () => {
    const { container } = render(<SonagiLogo variant="symbol" height={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('sng-logo--symbol');
    expect(container.querySelector('circle')).toBeTruthy();
  });

  it('renders monochrome variant correctly', () => {
    const { container } = render(<SonagiLogo variant="monochrome" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('sng-logo--monochrome');
  });
});
