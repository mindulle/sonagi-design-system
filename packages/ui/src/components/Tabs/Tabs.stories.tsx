import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs.Container> = {
  title: 'Components/Tabs',
  component: Tabs.Container,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.Container>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('React');
    const tabs = ['React', 'Design System', 'Figma', 'DevOps', 'Cloudflare', 'TypeScript'];

    return (
      <div className="w-full max-w-md p-6 bg-bg-base rounded-xl border border-border-subtle">
        <Tabs.Container>
          {tabs.map(tab => (
            <Tabs.Item
              key={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tabs.Item>
          ))}
        </Tabs.Container>
      </div>
    );
  },
};
