import type { Meta, StoryObj } from '@storybook/react';
import { SonagiLogo } from './SonagiLogo';

const meta: Meta<typeof SonagiLogo> = {
  title: 'Brand/SonagiLogo',
  component: SonagiLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'symbol', 'monochrome'],
      description: '로고 표시 형태 선택',
    },
    height: {
      control: { type: 'range', min: 16, max: 80, step: 2 },
      description: '로고 높이 (px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: 32,
    variant: 'full',
  },
};

export const SymbolOnly: Story = {
  args: {
    height: 32,
    variant: 'symbol',
  },
};

export const Monochrome: Story = {
  args: {
    height: 32,
    variant: 'monochrome',
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Small (20px)</p>
        <SonagiLogo height={20} />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Medium (32px)</p>
        <SonagiLogo height={32} />
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Large (48px)</p>
        <SonagiLogo height={48} />
      </div>
    </div>
  ),
};
