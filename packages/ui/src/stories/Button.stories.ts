import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figma v3 Component Mappings
export const Primary: Story = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    state: 'default',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    state: 'default',
    size: 'md',
    children: 'Danger Button',
  },
};

// State Demonstrations
export const PrimaryHover: Story = {
  args: {
    variant: 'primary',
    state: 'hover',
    size: 'md',
    children: 'Primary Hover',
  },
};

export const PrimaryActive: Story = {
  args: {
    variant: 'primary',
    state: 'active',
    size: 'md',
    children: 'Primary Active',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    state: 'disabled',
    size: 'md',
    children: 'Primary Disabled',
  },
};
