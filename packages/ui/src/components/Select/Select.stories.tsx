import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj<typeof Select> = {
  args: { 
    label: '카테고리 선택', 
    placeholder: '원하시는 카테고리를 선택해주세요',
    description: '블로그 글이 분류될 위치입니다.',
    children: (
      <>
        <option value="dev">개발</option>
        <option value="design">디자인</option>
        <option value="life">일상</option>
      </>
    )
  },
};

export const ErrorState: StoryObj<typeof Select> = {
  args: { 
    label: '국가 선택', 
    placeholder: '국가를 선택하세요',
    error: true,
    description: '반드시 선택해야 하는 필수 항목입니다.',
  },
};
