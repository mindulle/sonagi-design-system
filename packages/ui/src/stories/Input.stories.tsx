import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3?node-id=179-1682',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your name...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    placeholder: 'Error state input',
  },
};
