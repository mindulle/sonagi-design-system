import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};
