import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: {
    status: 'info',
    children: 'Info',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'Error',
  },
};
