import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from '../components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AEoW19jmlUh3rFgzhhV1vH/Sonagi-Design-System-V3?node-id=198-1710',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'label'],
    },
    color: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Info: Story = {
  args: {
    color: 'info',
    variant: 'pill',
    children: 'Info',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    variant: 'pill',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    variant: 'pill',
    children: 'Warning',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    variant: 'pill',
    children: 'Danger',
  },
};

// 2. All-Variants Matrix (Figma Spec 1:1 Coverage Grid)
const colors: BadgeProps['color'][] = ['info', 'success', 'warning', 'danger'];
const badgeVariants: BadgeProps['variant'][] = ['pill', 'label'];

export const AllVariantsMatrix: Story = {
  name: '🎨 All-Variants Matrix (Visual Testing Spec)',
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-bg-base border border-border-subtle rounded-lg">
      <div className="text-sm font-semibold text-text-muted border-b border-border-subtle pb-2">
        Figma Badge ComponentSet Matrix — Full Visual Test Grid
      </div>
      <table className="border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border-subtle text-text-muted">
            <th className="py-2 px-3">Variant / Color</th>
            {colors.map((c) => (
              <th key={c} className="py-2 px-3 capitalize">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {badgeVariants.map((bv) => (
            <tr key={bv} className="border-b border-border-subtle/50">
              <td className="py-3 px-3 font-mono font-medium text-text-secondary capitalize">
                {bv}
              </td>
              {colors.map((c) => (
                <td key={c} className="py-3 px-3">
                  <Badge color={c} variant={bv}>
                    {c} {bv}
                  </Badge>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
