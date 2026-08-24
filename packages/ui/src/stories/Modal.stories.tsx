import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="소나기 디자인 시스템 모달"
          description="Foundation-v3 피그마 스펙의 Elevated 레이어 및 Focus Ring 토큰이 적용된 모달 컴포넌트입니다."
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsOpen(false)}>확인</Button>
            </>
          }
        >
          <p className="text-sm">
            모달 내부 컨텐츠입니다. 다크 모드와 라이트 모드에서 Elevation 및 Border 토큰이 자동으로 대응됩니다.
          </p>
        </Modal>
      </div>
    );
  },
};
