import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FAB, BottomSheet } from './MobileNav';
import { ListItem } from '../ListItem/ListItem';

const meta: Meta = {
  title: 'Components/MobileNav',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Demo: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative w-full h-[600px] bg-bg-base overflow-hidden border border-border-subtle rounded-xl">
        <div className="p-8 text-center text-text-secondary">
          우측 하단의 FAB 버튼을 눌러보세요!
        </div>

        <FAB onClick={() => setIsOpen(true)}>
          <span className="text-2xl leading-none">+</span>
        </FAB>

        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className="text-lg font-bold text-text-primary mb-4">메뉴</h3>
          <div className="flex flex-col gap-2">
            <ListItem title="홈으로 가기" isInteractive onClick={() => setIsOpen(false)} />
            <ListItem title="시리즈 목록" isInteractive onClick={() => setIsOpen(false)} />
            <ListItem title="내 프로필" isInteractive onClick={() => setIsOpen(false)} />
            <ListItem title="다크모드 설정" isInteractive onClick={() => setIsOpen(false)} />
          </div>
        </BottomSheet>
      </div>
    );
  },
};
