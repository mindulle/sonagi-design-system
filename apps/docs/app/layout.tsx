import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

export const metadata = {
  title: {
    template: '%s | 민들레 디자인 시스템 (MDS)',
    default: '민들레 디자인 시스템 (MDS) — 공식 문서',
  },
  description: '겨울 끝, 민들레. Mindulle Design System v0.1.0 공식 실무 컴포넌트 및 토큰 문서',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-fd-background text-fd-foreground antialiased selection:bg-amber-400 selection:text-black">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
