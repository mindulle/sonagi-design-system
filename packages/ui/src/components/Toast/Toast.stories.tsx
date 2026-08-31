import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj<typeof Toast> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast type="success" title="저장 완료" description="블로그 글이 성공적으로 발행되었습니다." onClose={() => {}} />
      <Toast type="info" title="업데이트 알림" description="새로운 기능이 추가되었습니다." onClose={() => {}} />
      <Toast type="danger" title="삭제 실패" description="권한이 부족하여 삭제할 수 없습니다." onClose={() => {}} />
      <Toast type="warning" title="네트워크 불안정" description="연결 상태가 좋지 않습니다." onClose={() => {}} />
    </div>
  ),
};
