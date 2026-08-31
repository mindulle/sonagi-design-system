import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj<typeof Textarea> = {
  args: { 
    label: '자기소개', 
    placeholder: '본인에 대해 간단히 적어주세요...',
    description: '최대 500자까지 입력 가능합니다.',
    rows: 4
  },
};

export const ErrorState: StoryObj<typeof Textarea> = {
  args: { 
    label: '버그 리포트', 
    placeholder: '어떤 문제가 발생했나요?',
    error: true,
    description: '설명을 10자 이상 입력해야 합니다.',
  },
};
