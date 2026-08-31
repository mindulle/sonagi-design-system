import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion.Container> = {
  title: 'Components/Accordion',
  component: Accordion.Container,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion.Container>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm p-4 bg-bg-base rounded-xl border border-border-subtle">
      <Accordion.Container>
        <Accordion.Item title="디자인 시스템이란?" defaultExpanded>
          디자인 시스템은 컴포넌트, 토큰, 그리고 원칙들의 집합으로, 
          일관성 있는 제품을 빠르고 안정적으로 구축하기 위한 뼈대입니다.
        </Accordion.Item>
        <Accordion.Item title="Figma와 연동되나요?">
          네, Sonagi Design Ops 파이프라인을 통해 피그마의 토큰 변수들이 
          이 React 컴포넌트의 Tailwind CSS 클래스와 100% 동기화됩니다.
        </Accordion.Item>
        <Accordion.Item title="접근성(A11y) 지원">
          추후 WAI-ARIA 명세에 맞추어 키보드 네비게이션과 스크린 리더 
          대응 코드가 추가될 예정입니다.
        </Accordion.Item>
      </Accordion.Container>
    </div>
  ),
};
