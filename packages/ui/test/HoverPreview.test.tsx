import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HoverPreview } from '../src/components/HoverPreview';

const mockFetchNote = vi.fn();

const mockNote = {
  title: '디자인 토큰',
  excerpt: '디자인 시스템에서 색상, 간격, 타이포그래피 등의 값을 변수로 추상화한 것.',
};

beforeEach(() => {
  vi.clearAllMocks();
  mockFetchNote.mockResolvedValue(mockNote);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function renderHoverPreview(props?: Partial<React.ComponentProps<typeof HoverPreview>>) {
  return render(
    <HoverPreview slug="design-token" fetchNote={mockFetchNote} {...props}>
      디자인 토큰
    </HoverPreview>
  );
}

describe('HoverPreview', () => {
  it('링크 텍스트를 렌더링한다', () => {
    renderHoverPreview();
    expect(screen.getByRole('link', { name: '디자인 토큰' })).toBeInTheDocument();
  });

  it('기본 href는 /notes/[slug]이다', () => {
    renderHoverPreview();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notes/design-token');
  });

  it('href prop을 전달하면 그 값을 사용한다', () => {
    renderHoverPreview({ href: '/custom/path' });
    expect(screen.getByRole('link')).toHaveAttribute('href', '/custom/path');
  });

  it('hover 전에는 프리뷰가 보이지 않는다', () => {
    renderHoverPreview();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hover 후 300ms가 지나면 프리뷰가 나타난다', async () => {
    renderHoverPreview();
    const link = screen.getByRole('link');

    fireEvent.mouseEnter(link.parentElement!);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('프리뷰에 노트 제목과 요약이 표시된다', async () => {
    renderHoverPreview();
    const link = screen.getByRole('link');

    fireEvent.mouseEnter(link.parentElement!);

    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve(); // microtask flush — fetchNote Promise resolve 대기
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent(mockNote.title);
    expect(tooltip).toHaveTextContent(mockNote.excerpt);
  });

  it('hover를 떠나면 프리뷰가 사라진다', async () => {
    renderHoverPreview();
    const link = screen.getByRole('link');
    const wrapper = link.parentElement!;

    fireEvent.mouseEnter(wrapper);
    await act(async () => { vi.advanceTimersByTime(300); });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('300ms 이전에 hover를 떠나면 fetchNote를 호출하지 않는다', async () => {
    renderHoverPreview();
    const wrapper = screen.getByRole('link').parentElement!;

    fireEvent.mouseEnter(wrapper);
    await act(async () => { vi.advanceTimersByTime(100); }); // 300ms 미만
    fireEvent.mouseLeave(wrapper);

    await act(async () => { vi.advanceTimersByTime(300); }); // 남은 시간 흘려보내기
    expect(mockFetchNote).not.toHaveBeenCalled();
  });

  it('fetchNote는 올바른 slug로 호출된다', async () => {
    renderHoverPreview();
    const wrapper = screen.getByRole('link').parentElement!;

    fireEvent.mouseEnter(wrapper);
    await act(async () => {
      vi.advanceTimersByTime(300);
      await Promise.resolve();
    });

    expect(mockFetchNote).toHaveBeenCalledWith('design-token');
  });
});
