import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { Tabs } from '../Tabs/Tabs';
import { Button } from '../Button/Button';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  render: () => (
    <div className="w-full h-[300px] bg-bg-base">
      <TopBar
        leftSlot={
          <div className="font-bold text-lg text-text-primary whitespace-nowrap cursor-pointer">
            🌧️ Sonagi Space
          </div>
        }
        centerSlot={
          <Tabs.Container className="!gap-1">
            <Tabs.Item isActive>Home</Tabs.Item>
            <Tabs.Item>Series</Tabs.Item>
            <Tabs.Item>Digital Garden</Tabs.Item>
          </Tabs.Container>
        }
        rightSlot={
          <Button variant="ghost" size="sm">
            🌙 Dark
          </Button>
        }
      />
      <div className="p-8 text-text-secondary">
        스크롤 시 TopBar가 상단에 고정(Sticky)되며,<br/>
        뒷배경이 흐려지는(Backdrop Blur) 효과가 적용되어 있습니다.
      </div>
    </div>
  ),
};
