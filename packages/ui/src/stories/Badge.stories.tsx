import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'label'],
    },
    color: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
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

export const ErrorState: Story = {
  args: {
    color: 'error',
    variant: 'pill',
    children: 'Error',
  },
};

export const LabelVariant: Story = {
  args: {
    color: 'info',
    variant: 'label',
    children: 'Category',
  },
};
