import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
    initials: 'SO',
  },
};

export const WithImage: Story = {
  args: {
    size: 'lg',
    src: 'https://avatars.githubusercontent.com/u/1?v=4',
    alt: 'GitHub User',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
    </div>
  ),
};
