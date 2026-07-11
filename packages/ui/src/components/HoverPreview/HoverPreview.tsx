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
 * 노트 데이터 fetching 로직은 소비자(blog-sonagi-space)가 fetchNote prop으로 주입한다.
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
    }, 300); // 300ms 딜레이 — 스쳐지나가는 hover 방지
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href ?? `/notes/${slug}`}
        className="sng-wikilink"
        data-slug={slug}
      >
        {children}
      </a>

      {visible && (
        <span
          role="tooltip"
          className="sng-wikilink-preview"
        >
          {loading ? (
            <span className="sng-wikilink-preview__loading">불러오는 중...</span>
          ) : preview ? (
            <>
              <span className="sng-wikilink-preview__title">{preview.title}</span>
              <span className="sng-wikilink-preview__excerpt">{preview.excerpt}</span>
            </>
          ) : null}
        </span>
      )}
    </span>
  );
}
