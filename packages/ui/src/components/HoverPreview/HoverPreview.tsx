"use client";
import React from 'react';

export interface HoverPreviewProps {
  /** 링크 텍스트 */
  children: React.ReactNode;
  /** 노트 slug (e.g. "design-token") */
  slug: string;
  /** 노트 내용을 fetch하는 함수 — 소비자가 주입 */
  fetchNote: (slug: string) => Promise<NotePreview>;
  /** 링크 클릭 시 이동할 href */
  href?: string;
}

export interface NotePreview {
  title: string;
  excerpt: string;
}

/**
 * HoverPreview
 *
 * 위키링크에 마우스를 올리면 해당 노트의 제목과 요약을 팝업으로 보여주는 컴포넌트.
 * Figma SSOT 규격에 맞추어 Tailwind CSS로 완전히 매핑되었습니다.
 */
export function HoverPreview({
  children,
  slug,
  fetchNote,
  href,
}: HoverPreviewProps) {
  const [preview, setPreview] = React.useState<NotePreview | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = async () => {
    timeoutRef.current = setTimeout(async () => {
      setVisible(true);
      if (!preview) {
        setLoading(true);
        try {
          const data = await fetchNote(slug);
          setPreview(data);
        } finally {
          setLoading(false);
        }
      }
    }, 300); // 300ms 딜레이 — 스쳐지나가는 hover 방지 (Motion SSOT)
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href ?? `/notes/${slug}`}
        className="text-brand-primary font-medium underline decoration-border-subtle underline-offset-2 hover:decoration-brand-primary transition-colors"
        data-slug={slug}
      >
        {children}
      </a>

      {visible && (
        <span
          role="tooltip"
          className="absolute z-[500] bottom-full mb-2 left-1/2 -translate-x-1/2 w-80 p-4 flex flex-col gap-2 rounded-xl bg-bg-elevated border border-border-subtle shadow-md pointer-events-none"
        >
          {loading ? (
            <span className="text-sm text-text-muted animate-pulse">불러오는 중...</span>
          ) : preview ? (
            <>
              <span className="text-base font-bold text-text-primary">{preview.title}</span>
              <span className="text-sm font-normal text-text-secondary leading-snug break-keep">{preview.excerpt}</span>
            </>
          ) : null}
        </span>
      )}
    </span>
  );
}
