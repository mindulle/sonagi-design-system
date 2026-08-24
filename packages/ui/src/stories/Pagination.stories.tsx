import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/Pagination/Pagination';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(p) => setPage(p)}
      />
    );
  },
};

export const AllVariantsMatrix: Story = {
  name: '🎨 All-Variants Matrix (Visual Testing Spec)',
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-bg-base border border-border-subtle rounded-lg">
      <div className="text-sm font-semibold text-text-muted border-b border-border-subtle pb-2">
        Figma ComponentSet Matrix — Pagination States
      </div>
      <div className="flex items-center gap-4">
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </div>
    </div>
  ),
};
