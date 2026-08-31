import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';
import React from 'react';

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3?node-id=220-699',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

const sampleHeadings = [
  { id: 'heading-1', text: '1. Active Heading Section', level: 2 },
  { id: 'heading-2', text: '2. Default Section One', level: 2 },
  { id: 'heading-3', text: '2.1 Subsection Detail', level: 3 },
  { id: 'heading-4', text: '3. Conclusion', level: 2 },
];

export const Default: Story = {
  args: {
    headings: sampleHeadings,
  },
};

