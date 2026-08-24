import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from '../components/TableOfContents/TableOfContents';
import React from 'react';

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
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

export const AllVariantsMatrix: Story = {
  name: '🎨 All-Variants Matrix (Visual Testing Spec)',
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-bg-base border border-border-subtle rounded-lg w-80">
      <div className="text-sm font-semibold text-text-muted border-b border-border-subtle pb-2">
        Figma ComponentSet Matrix — TOC Item States
      </div>
      <TableOfContents headings={sampleHeadings} />
    </div>
  ),
};
