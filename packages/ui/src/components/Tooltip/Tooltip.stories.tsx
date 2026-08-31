import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};
export default meta;

export const Default: StoryObj<typeof Tooltip> = {
  render: () => (
    <div className="flex gap-4 p-10">
      <Tooltip content="이것은 툴팁입니다!" position="top">
        <Button variant="secondary">Hover Me (Top)</Button>
      </Tooltip>
      <Tooltip content="아래쪽 툴팁" position="bottom">
        <Button variant="secondary">Hover Me (Bottom)</Button>
      </Tooltip>
    </div>
  ),
};
