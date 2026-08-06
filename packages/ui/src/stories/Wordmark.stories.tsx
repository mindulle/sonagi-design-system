import type { Meta, StoryObj } from '@storybook/react';
import { Wordmark } from '../components/Wordmark';

const meta: Meta<typeof Wordmark> = {
  title: 'Components/Wordmark',
  component: Wordmark,
  tags: ['autodocs'],
  argTypes: {
    lang: {
      control: 'select',
      options: ['en', 'ko'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wordmark>;

export const English: Story = {
  args: {
    lang: 'en',
    children: 'sonagi',
  },
};

export const Korean: Story = {
  args: {
    lang: 'ko',
    children: '소나기',
  },
};
