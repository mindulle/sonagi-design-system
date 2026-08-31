import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj<typeof Checkbox> = {
  args: { label: '이용약관 동의', description: '필수 항목입니다.' },
};

export const States: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="기본 체크박스" />
      <Checkbox defaultChecked label="선택된 상태" />
      <Checkbox indeterminate label="부분 선택 상태 (Indeterminate)" />
      <Checkbox disabled label="비활성화" description="선택할 수 없습니다." />
    </div>
  ),
};
