import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from '../Checkbox';

describe('Checkbox Component', () => {
  it('renders Checkbox correctly', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeTruthy();
    expect(checkbox.className).toContain('sng-checkbox');
  });

  it('can be checked', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('supports indeterminate state', () => {
    render(<Checkbox data-testid="checkbox" indeterminate />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });
});
