import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Radio } from '../Radio';

describe('Radio Component', () => {
  it('renders Radio correctly', () => {
    render(<Radio data-testid="radio" />);
    const radio = screen.getByTestId('radio');
    expect(radio).toBeTruthy();
    expect(radio.className).toContain('sng-radio');
  });

  it('can be checked', () => {
    render(<Radio data-testid="radio" />);
    const radio = screen.getByTestId('radio') as HTMLInputElement;
    fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });
});
