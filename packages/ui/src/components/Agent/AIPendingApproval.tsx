import React from 'react';

export interface AIPendingApprovalProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

/**
 * 에이전트가 인간의 결재/승인을 대기하고 있는 상태를 나타내는 UI
 */
export function AIPendingApproval({ message = 'Waiting for human approval...', className = '', ...props }: AIPendingApprovalProps) {
  return (
    <div className={`sng-ai-pending ${className}`} {...props}>
      <div className="sng-ai-spinner" />
      <span>{message}</span>
    </div>
  );
}
