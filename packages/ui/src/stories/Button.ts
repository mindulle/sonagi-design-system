/**
 * 순수 HTML 렌더링용 버튼 컴포넌트
 * React 등의 프레임워크에 종속되지 않고 DOM 엘리먼트를 반환합니다.
 */
export interface ButtonProps {
  primary?: boolean;
  label: string;
  onClick?: () => void;
}

export const createButton = ({ primary = false, label, onClick }: ButtonProps) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;

  // SKILL.md 규칙에 따라 .sng- 접두사 사용
  const classes = ['sng-btn'];
  if (primary) {
    classes.push('sng-btn--primary');
  }
  btn.className = classes.join(' ');

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
};
