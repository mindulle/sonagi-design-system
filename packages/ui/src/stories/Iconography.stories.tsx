import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@mindulle/icons';

const customIconNames = [
  'AddIcon', 'ArrowRightIcon', 'CheckIcon', 'CloseIcon', 
  'DocumentIcon', 'HomeIcon', 'MenuIcon', 'SearchIcon', 'UserIcon'
];

function IconGallery() {
  return (
    <div style={{ padding: '24px', fontFamily: 'var(--sng-font-sans)' }}>
      <h2 style={{ marginBottom: '8px', color: 'var(--sng-color-text-primary)' }}>Sonagi Custom Icons</h2>
      <p style={{ color: 'var(--sng-color-text-secondary)', marginBottom: '32px' }}>
        이 아이콘들은 Vector Ops (Affinity Designer)에서 절차적으로 생성되어 React 컴포넌트로 자동 변환된 에셋입니다.
        Lucide 아이콘과 동일한 Props(<code>size</code>, <code>color</code>, <code>strokeWidth</code> 등)를 지원합니다.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
        {customIconNames.map((name) => {
          const IconComponent = Icons[name as keyof typeof Icons] as React.ElementType;
          if (!IconComponent) return null;
          
          return (
            <div key={name} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              padding: '16px', border: '1px solid var(--sng-color-border-subtle)', 
              borderRadius: '8px', background: 'var(--sng-color-background-surface)' 
            }}>
              <IconComponent size={32} color="var(--sng-color-text-primary)" strokeWidth={2} />
              <span style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sng-color-text-muted)', fontFamily: 'var(--sng-font-mono)' }}>
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Iconography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const CustomIcons: StoryObj = {
  render: () => <IconGallery />,
};
