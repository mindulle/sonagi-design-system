import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from '../components/Button/Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/1hgAgnMvqn2uCF8i45Do4x/Core-Primitives-v3?node-id=4-3',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Single Interactive Default Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    state: 'default',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    state: 'default',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    state: 'default',
    size: 'md',
    children: 'Danger Button',
  },
};

// 2. All-Variants Matrix (Figma Spec 1:1 Coverage Grid)
const variants: ButtonProps['variant'][] = ['primary', 'secondary', 'danger'];
const states: ButtonProps['state'][] = ['default', 'hover', 'active', 'disabled'];

export const AllVariantsMatrix: Story = {
  name: '🎨 All-Variants Matrix (Visual Testing Spec)',
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-bg-base border border-border-subtle rounded-lg">
      <div className="text-sm font-semibold text-text-muted border-b border-border-subtle pb-2">
        Figma ComponentSet Matrix — 100% Full Visual Test Grid
      </div>
      <table className="border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border-subtle text-text-muted">
            <th className="py-2 px-3">Variant / State</th>
            {states.map((st) => (
              <th key={st} className="py-2 px-3 capitalize">
                {st}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v} className="border-b border-border-subtle/50">
              <td className="py-3 px-3 font-mono font-medium text-text-secondary capitalize">
                {v}
              </td>
              {states.map((st) => (
                <td key={st} className="py-3 px-3">
                  <Button variant={v} state={st} size="md">
                    {v} {st}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
