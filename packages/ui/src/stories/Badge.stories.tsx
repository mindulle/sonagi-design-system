import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from '../components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3?node-id=198-1710',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'label'],
    },
    color: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: {
    color: 'info',
    variant: 'pill',
    children: 'Info',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    variant: 'pill',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    variant: 'pill',
    children: 'Warning',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    variant: 'pill',
    children: 'Danger',
  },
};

