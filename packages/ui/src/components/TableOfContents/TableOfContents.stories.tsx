import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
  args: {},
};
