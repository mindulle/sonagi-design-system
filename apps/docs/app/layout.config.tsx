import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { MindulleLogo } from '@mindulle/ui';
import React from 'react';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2 font-semibold tracking-tight text-sm py-1">
        <MindulleLogo size={22} />
        <span>민들레 디자인 시스템</span>
        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
          v0.1.0
        </span>
      </span>
    ),
  },
  githubUrl: 'https://github.com/mindulle/sonagi-design-system',
};
