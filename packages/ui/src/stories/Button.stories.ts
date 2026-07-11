import type { Meta, StoryObj } from '@storybook/html';
import { createButton, ButtonProps } from './Button';

// HTML 렌더러용 메타데이터 설정
const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => createButton(args),
  argTypes: {
    label: { control: 'text' },
    primary: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Secondary Button',
  },
};
