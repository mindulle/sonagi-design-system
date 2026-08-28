import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card/Card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'floating'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardContent = ({ title }: { title: string }) => (
  <>
    <h3 className="text-xl font-semibold leading-[28px] m-0">{title} Elevation Card</h3>
    <p className="text-sm text-text-muted m-0 leading-[20px]">
      8px Baseline Grid Aligned Container Component ({title})
    </p>
  </>
);

export const Flat: Story = {
  args: {
    elevation: 'flat',
    children: <CardContent title="Flat" />,
  },
};

export const Raised: Story = {
  args: {
    elevation: 'raised',
    children: <CardContent title="Raised" />,
  },
};

export const Floating: Story = {
  args: {
    elevation: 'floating',
    children: <CardContent title="Floating" />,
  },
};
