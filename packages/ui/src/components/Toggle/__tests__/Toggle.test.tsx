import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toggle } from '../Toggle';

describe('Toggle Component', () => {
  it('renders Toggle correctly', () => {
    render(<Toggle data-testid="toggle" />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle).toBeTruthy();
    expect(toggle.className).toContain('sng-toggle-input');
  });

  it('can be toggled on and off', () => {
    render(<Toggle data-testid="toggle" />);
    const toggle = screen.getByTestId('toggle') as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);

    fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);
  });

  it('supports disabled state', () => {
    render(<Toggle data-testid="toggle" disabled />);
    const toggle = screen.getByTestId('toggle') as HTMLInputElement;
    expect(toggle.disabled).toBe(true);
  });
});
