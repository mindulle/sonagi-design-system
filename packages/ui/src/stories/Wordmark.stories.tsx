import type { Meta, StoryObj } from '@storybook/react';
import { Wordmark } from '../components/Wordmark';

const meta: Meta<typeof Wordmark> = {
  title: 'Components/Wordmark',
  component: Wordmark,
  tags: ['autodocs'],
  argTypes: {
    lang: {
      control: 'select',
      options: ['en', 'ko'],
    },
  },
  // Figma design 링크를 의도적으로 두지 않습니다.
  // Wordmark 는 @deprecated 상태이며 V3 디자인 시스템에서 제외되어,
  // 정본 파일(AEoW19jmlUh3rFgzhhV1vH)에 대응하는 컴포넌트 노드가 존재하지 않습니다.
  // 기존에 걸려 있던 node-id=225-1499 는 삭제된 노드를 가리키는 죽은 링크였습니다.
  // 컴포넌트 삭제 시점은 별도 major 릴리스에서 결정합니다.
};

export default meta;
type Story = StoryObj<typeof Wordmark>;

export const English: Story = {
  args: {
    lang: 'en',
    children: 'sonagi',
  },
};

export const Korean: Story = {
  args: {
    lang: 'ko',
    children: '소나기',
  },
};
