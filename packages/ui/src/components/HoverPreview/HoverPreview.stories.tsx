import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HoverPreview } from './HoverPreview';

const meta: Meta<typeof HoverPreview> = {
  title: 'Components/HoverPreview',
  component: HoverPreview,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof HoverPreview>;

export const Default: Story = {
  args: {},
};
