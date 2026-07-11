import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HoverPreview } from '../components/HoverPreview';

const meta: Meta<typeof HoverPreview> = {
  title: 'Components/HoverPreview',
  component: HoverPreview,
  tags: ['autodocs'],
  argTypes: {
    slug: { control: 'text' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HoverPreview>;

// Mock fetchNote function with artificial delay
const mockFetchNote = (delay = 500) => {
  return (slug: string) => {
    return new Promise<{ title: string; excerpt: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          title: `Note: ${slug.toUpperCase()}`,
          excerpt: `This is a mock excerpt representing the content of the wiki note "${slug}". It demonstrates how the preview popup renders the title and description fetched from the consumer application.`,
        });
      }, delay);
    });
  };
};

export const Default: Story = {
  args: {
    children: 'Default Wiki Link',
    slug: 'design-token',
    fetchNote: mockFetchNote(500),
  },
};

export const FastLoad: Story = {
  args: {
    children: 'Fast Loading Wiki Link',
    slug: 'fast-note',
    fetchNote: mockFetchNote(50),
  },
};

export const SlowLoad: Story = {
  args: {
    children: 'Slow Loading Wiki Link (Hover to test loading state)',
    slug: 'slow-note',
    fetchNote: mockFetchNote(2000),
  },
};

export const CustomHref: Story = {
  args: {
    children: 'Wiki Link with Custom Href',
    slug: 'custom-link',
    href: 'https://design.sonagi.space',
    fetchNote: mockFetchNote(300),
  },
};
