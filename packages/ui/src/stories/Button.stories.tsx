import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '../components/Button/Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3?node-id=80-2',
    },
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

// 1. Single Interactive Default Stories
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

