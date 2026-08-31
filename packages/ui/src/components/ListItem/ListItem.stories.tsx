import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    title: 'Sonagi Project',
    description: 'An AI-Native Open Source Design System',
  },
};

export const WithSlots: Story = {
  render: () => (
    <div className="w-full max-w-sm flex flex-col gap-2 p-4 bg-bg-base border border-border-subtle rounded-xl">
      <ListItem 
        title="Mindulle" 
        description="Software Engineer" 
        leftSlot={<Avatar initials="MI" size="md" />}
        rightSlot={<span className="text-text-muted text-xs">Admin</span>}
      />
      <ListItem 
        title="OpenDevBrowser" 
        description="Automated UI testing agent" 
        leftSlot={<Avatar src="https://avatars.githubusercontent.com/u/9919?s=40&v=4" size="md" />}
        rightSlot={<span className="text-text-muted text-xs">Bot</span>}
      />
    </div>
  ),
};
