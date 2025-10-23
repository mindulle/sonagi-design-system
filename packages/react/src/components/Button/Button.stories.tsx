import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: '버튼의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '소나기 디자인 시스템의 기본 Button 컴포넌트입니다. 다양한 변형과 상태를 지원합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 스토리
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// 상태
export const Disabled: Story = {
  args: {
    variant: 'primary',
    isDisabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// 모든 변형 한눈에 보기
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 변형을 한눈에 볼 수 있습니다.',
      },
    },
  },
};

// 모든 크기 한눈에 보기
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 크기를 한눈에 볼 수 있습니다.',
      },
    },
  },
};

// 상태 조합
export const StatesCombination: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary">Default</Button>
        <Button variant="primary" isDisabled>
          Disabled
        </Button>
        <Button variant="primary" isLoading>
          Loading
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" isDisabled>
          Disabled
        </Button>
        <Button variant="secondary" isLoading>
          Loading
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="danger">Default</Button>
        <Button variant="danger" isDisabled>
          Disabled
        </Button>
        <Button variant="danger" isLoading>
          Loading
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 변형과 상태 조합을 확인할 수 있습니다.',
      },
    },
  },
};

// 실제 사용 예시
export const RealWorldExample: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '2rem', border: '1px solid #e9ecef', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>계정 삭제</h3>
      <p style={{ marginBottom: '1.5rem', color: '#495057', lineHeight: 1.6 }}>
        계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <Button variant="ghost">취소</Button>
        <Button variant="danger">계정 삭제</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시: 삭제 확인 다이얼로그',
      },
    },
  },
};
