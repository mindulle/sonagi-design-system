import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=4-30',
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
      options: ['info', 'success', 'warning', 'error'],
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
