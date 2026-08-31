import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj<typeof Radio> = {
  args: { name: 'group1', label: '공개 옵션', description: '모든 사용자가 볼 수 있습니다.' },
};

export const States: StoryObj<typeof Radio> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio name="g2" label="기본 라디오" />
      <Radio name="g2" defaultChecked label="선택된 상태" />
      <Radio name="g3" disabled label="비활성화" description="선택할 수 없습니다." />
    </div>
  ),
};
