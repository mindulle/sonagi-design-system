import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontFamily: 'var(--sng-font-sans)' }}>Default Card</h3>
        <p style={{ margin: 0, fontFamily: 'var(--sng-font-sans)', color: 'var(--sng-color-text-secondary)' }}>
          This is a default Card component with standard styling.
        </p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    children: (
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontFamily: 'var(--sng-font-sans)' }}>Clickable Card</h3>
        <p style={{ margin: 0, fontFamily: 'var(--sng-font-sans)', color: 'var(--sng-color-text-secondary)' }}>
          This card has hover and active state styling and is clickable.
        </p>
      </div>
    ),
  },
};
