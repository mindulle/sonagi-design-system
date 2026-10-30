'use client';

import React, { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  Input,
  Modal,
  Pagination,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Tabs,
  Accordion,
  Avatar,
  ListItem,
  HoverPreview,
  MindulleLogo,
} from '@mindulle/ui';

interface ComponentPreviewProps {
  name: string;
  defaultProps?: Record<string, any>;
}

export function ComponentPreview({ name, defaultProps = {} }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [sandboxTheme, setSandboxTheme] = useState<'light' | 'dark'>('dark');

  // Interactive state
  const [variant, setVariant] = useState<any>(defaultProps.variant || 'primary');
  const [size, setSize] = useState<any>(defaultProps.size || 'md');
  const [disabled, setDisabled] = useState<boolean>(defaultProps.disabled || false);
  const [color, setColor] = useState<any>(defaultProps.color || 'info');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option-1');
  const [activeTabItem, setActiveTabItem] = useState('tab-1');
  const [currentPage, setCurrentPage] = useState(2);

  const getCodeSnippet = () => {
    switch (name) {
      case 'Button':
        return `<Button\n  variant="${variant}"\n  size="${size}"${disabled ? '\n  disabled' : ''}\n>\n  민들레 버튼\n</Button>`;
      case 'Badge':
        return `<Badge\n  variant="${variant === 'secondary' ? 'label' : 'pill'}"\n  color="${color}"\n>\n  상태 뱃지\n</Badge>`;
      case 'Card':
        return `<Card>\n  <h4 className="font-bold text-base mb-1">민들레 카드</h4>\n  <p className="text-sm opacity-80 leading-relaxed">\n    The True 2px Stem과 4px Weathered Radius가 적용된 컨테이너입니다.\n  </p>\n</Card>`;
      case 'Input':
        return `<Input\n  placeholder="이메일 주소를 입력해 주세요"${disabled ? '\n  disabled' : ''}\n/>`;
      case 'Textarea':
        return `<Textarea\n  placeholder="내용을 자유롭게 입력해 주세요..."\n  rows={4}${disabled ? '\n  disabled' : ''}\n/>`;
      case 'Select':
        return `<Select placeholder="옵션을 선택하세요"${disabled ? ' disabled' : ''}>\n  <option value="1">옵션 1: 초봄 민들레</option>\n  <option value="2">옵션 2: 비바람 줄기선</option>\n  <option value="3">옵션 3: 단단한 돌멩이</option>\n</Select>`;
      case 'Checkbox':
        return `<Checkbox\n  label="약관에 동의합니다"\n  description="MDS 디자인 가이드라인을 준수합니다"\n  checked={isChecked}\n  onChange={(e) => setIsChecked(e.target.checked)}${disabled ? '\n  disabled' : ''}\n/>`;
      case 'Radio':
        return `<div className="space-y-2">\n  <Radio name="mds-radio" value="opt-1" label="옵션 A: 스프링 스톤" checked />\n  <Radio name="mds-radio" value="opt-2" label="옵션 B: 앰버 골드" />\n</div>`;
      case 'Tabs':
        return `<Tabs.Container>\n  <Tabs.Item isActive={activeTab === 'tab-1'} onClick={() => setActiveTab('tab-1')}>\n    전체보기\n  </Tabs.Item>\n  <Tabs.Item isActive={activeTab === 'tab-2'} onClick={() => setActiveTab('tab-2')}>\n    파운데이션\n  </Tabs.Item>\n  <Tabs.Item isActive={activeTab === 'tab-3'} onClick={() => setActiveTab('tab-3')}>\n    컴포넌트\n  </Tabs.Item>\n</Tabs.Container>`;
      case 'Accordion':
        return `<Accordion.Container>\n  <Accordion.Item title="민들레 디자인 시스템이란?" defaultExpanded>\n    The True 2px Stem과 마모된 4px 곡률을 헌법으로 삼는 실무 디자인 시스템입니다.\n  </Accordion.Item>\n  <Accordion.Item title="W3C 토큰은 어떻게 공급되나요?">\n    @mindulle/tokens 패키지를 통해 CSS Custom Properties 형태로 실시간 주입됩니다.\n  </Accordion.Item>\n</Accordion.Container>`;
      case 'Modal':
        return `<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="MDS 표준 모달">\n  <p className="text-sm opacity-80">백드롭과 포커스 트랩이 기본 내장된 모달 다이얼로그입니다.</p>\n  <div className="flex justify-end gap-2 mt-4">\n    <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>취소</Button>\n    <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>확인</Button>\n  </div>\n</Modal>`;
      case 'Pagination':
        return `<Pagination\n  currentPage={currentPage}\n  totalPages={10}\n  onPageChange={(page) => setCurrentPage(page)}\n/>`;
      case 'Avatar':
        return `<div className="flex items-center gap-3">\n  <Avatar size="sm" initials="MD" />\n  <Avatar size="md" initials="SO" />\n  <Avatar size="lg" initials="DS" />\n</div>`;
      case 'ListItem':
        return `<ListItem\n  title="민들레 스튜디오 코어 패키지"\n  description="@mindulle/tokens 및 @mindulle/ui 배포본"\n/>`;
      case 'HoverPreview':
        return `<HoverPreview\n  slug="mds-docs"\n  href="https://design.sonagi.space"\n  fetchNote={async (slug) => ({\n    title: '민들레 공식 문서 포털',\n    excerpt: '16종 컴포넌트 실시간 프리뷰와 W3C 토큰 매트릭스'\n  })}\n>\n  MDS 공식 문서 포털\n</HoverPreview>`;
      case 'MindulleLogo':
        return `<div className="flex items-center gap-6">\n  <MindulleLogo size={40} />\n  <MindulleLogo size={56} withBackground />\n</div>`;
      default:
        return `<${name} />`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderComponent = () => {
    switch (name) {
      case 'Button':
        return (
          <Button variant={variant} size={size} disabled={disabled}>
            민들레 버튼 ({variant}/{size})
          </Button>
        );
      case 'Badge':
        return (
          <Badge variant={variant === 'secondary' ? 'label' : 'pill'} color={color}>
            상태 뱃지 ({color})
          </Badge>
        );
      case 'Card':
        return (
          <Card className="max-w-md w-full">
            <div className="flex items-center gap-3 mb-2">
              <MindulleLogo size={24} />
              <h4 className="font-bold text-base">민들레 카드 컨테이너</h4>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              MDS v0.1.0의 The True 2px Stem 경계선과 선명한 면 분할이 적용된 표준 카드입니다.
            </p>
          </Card>
        );
      case 'Input':
        return (
          <div className="w-full max-w-sm space-y-2">
            <Input placeholder="이메일 주소를 입력해 주세요" disabled={disabled} />
          </div>
        );
      case 'Textarea':
        return (
          <div className="w-full max-w-md">
            <Textarea
              placeholder="내용을 자유롭게 입력해 주세요..."
              rows={4}
              disabled={disabled}
            />
          </div>
        );
      case 'Select':
        return (
          <div className="w-full max-w-sm">
            <Select placeholder="옵션을 선택하세요" disabled={disabled}>
              <option value="1">옵션 1: 초봄 민들레</option>
              <option value="2">옵션 2: 비바람 줄기선</option>
              <option value="3">옵션 3: 단단한 돌멩이</option>
            </Select>
          </div>
        );
      case 'Checkbox':
        return (
          <div className="space-y-3">
            <Checkbox
              label="디자인 시스템 거버넌스 준수"
              description="단일 SSOT 원칙에 따라 토큰을 사용합니다."
              checked={isChecked}
              disabled={disabled}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </div>
        );
      case 'Radio':
        return (
          <div className="space-y-3">
            <Radio
              name="radio-group-preview"
              value="option-1"
              label="회색 돌멩이 (Weathered Stone)"
              description="차콜 아스팔트와 자갈돌 서피스"
              checked={radioValue === 'option-1'}
              disabled={disabled}
              onChange={() => setRadioValue('option-1')}
            />
            <Radio
              name="radio-group-preview"
              value="option-2"
              label="민들레 골드 (Dandelion Gold)"
              description="생명력을 불어넣는 포인트"
              checked={radioValue === 'option-2'}
              disabled={disabled}
              onChange={() => setRadioValue('option-2')}
            />
          </div>
        );
      case 'Tabs':
        return (
          <div className="w-full max-w-md">
            <Tabs.Container>
              <Tabs.Item
                isActive={activeTabItem === 'tab-1'}
                onClick={() => setActiveTabItem('tab-1')}
              >
                전체보기
              </Tabs.Item>
              <Tabs.Item
                isActive={activeTabItem === 'tab-2'}
                onClick={() => setActiveTabItem('tab-2')}
              >
                파운데이션
              </Tabs.Item>
              <Tabs.Item
                isActive={activeTabItem === 'tab-3'}
                onClick={() => setActiveTabItem('tab-3')}
              >
                컴포넌트
              </Tabs.Item>
            </Tabs.Container>
          </div>
        );
      case 'Accordion':
        return (
          <div className="w-full max-w-md">
            <Accordion.Container>
              <Accordion.Item title="민들레 디자인 시스템이란?" defaultExpanded>
                <div className="py-2 text-sm opacity-80">
                  The True 2px Stem과 마모된 4px 곡률을 헌법으로 삼는 실무 디자인 시스템입니다.
                </div>
              </Accordion.Item>
              <Accordion.Item title="W3C 토큰은 어떻게 공급되나요?">
                <div className="py-2 text-sm opacity-80">
                  @mindulle/tokens 패키지를 통해 CSS Custom Properties 형태로 실시간 주입됩니다.
                </div>
              </Accordion.Item>
            </Accordion.Container>
          </div>
        );
      case 'Modal':
        return (
          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)}>모달 다이얼로그 열기</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="MDS 표준 모달 다이얼로그"
            >
              <div className="space-y-4 py-2">
                <p className="text-sm opacity-80">
                  백드롭 블러와 포커스 트랩이 기본 내장된 접근성 표준 모달입니다.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                    취소
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                    확인
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        );
      case 'Pagination':
        return (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        );
      case 'Avatar':
        return (
          <div className="flex items-center gap-6">
            <Avatar size="sm" initials="MD" />
            <Avatar size="md" initials="SO" />
            <Avatar size="lg" initials="DS" />
          </div>
        );
      case 'ListItem':
        return (
          <div className="w-full max-w-md border-2 border-fd-border rounded-md overflow-hidden bg-bg-surface">
            <ListItem
              title="민들레 스튜디오 코어 패키지"
              description="@mindulle/tokens 및 @mindulle/ui 배포본"
            />
            <ListItem
              title="W3C 시맨틱 디자인 토큰"
              description="스프링 스톤 및 회색 돌멩이 단일 SSOT"
            />
          </div>
        );
      case 'HoverPreview':
        return (
          <div className="text-sm">
            <span>프로젝트에 대한 자세한 정보는 </span>
            <HoverPreview
              slug="mds-docs"
              href="https://design.sonagi.space"
              fetchNote={async () => ({
                title: '민들레 디자인 시스템 (MDS)',
                excerpt: 'The True 2px Stem과 4px Weathered Radius가 적용된 공식 포털입니다.',
              })}
            >
              <span className="font-semibold text-amber-500 underline decoration-1 underline-offset-2">
                MDS 공식 문서 포털
              </span>
            </HoverPreview>
            <span>에서 확인하실 수 있습니다.</span>
          </div>
        );
      case 'MindulleLogo':
        return (
          <div className="flex items-center gap-6">
            <MindulleLogo size={40} />
            <MindulleLogo size={56} withBackground />
          </div>
        );
      default:
        return (
          <div className="text-sm text-fd-muted-foreground">
            {name} 컴포넌트 프리뷰가 준비되었습니다.
          </div>
        );
    }
  };

  return (
    <div className="not-prose my-6 rounded-md border-2 border-fd-border bg-fd-card overflow-hidden">
      {/* Top Header / Bar */}
      <div className="flex items-center justify-between border-b-2 border-fd-border bg-fd-muted/50 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 font-semibold rounded ${
              activeTab === 'preview'
                ? 'bg-fd-background text-fd-foreground shadow-sm border border-fd-border'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 font-semibold rounded ${
              activeTab === 'code'
                ? 'bg-fd-background text-fd-foreground shadow-sm border border-fd-border'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            Code
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Sandbox Switch */}
          <div className="flex items-center rounded border border-fd-border bg-fd-background p-0.5">
            <button
              onClick={() => setSandboxTheme('light')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                sandboxTheme === 'light' ? 'bg-amber-500/20 text-amber-600 font-bold' : 'opacity-60'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setSandboxTheme('dark')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                sandboxTheme === 'dark' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'opacity-60'
              }`}
            >
              Dark
            </button>
          </div>

          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-fd-background border border-fd-border text-fd-foreground hover:bg-fd-muted transition-colors font-mono"
          >
            {copied ? '✓ 복사완료' : '코드 복사'}
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      {activeTab === 'preview' ? (
        <div
          data-theme={sandboxTheme}
          className={`min-h-[200px] flex items-center justify-center p-8 transition-colors ${
            sandboxTheme === 'dark' ? 'bg-[#12151d] text-[#f1f5f9]' : 'bg-[#fbfbfa] text-[#18181b]'
          }`}
        >
          {renderComponent()}
        </div>
      ) : (
        <div className="p-4 bg-[#12151d] text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border-t border-fd-border">
          <pre>{getCodeSnippet()}</pre>
        </div>
      )}

      {/* Interactive Controls Bar */}
      {name === 'Button' && (
        <div className="border-t-2 border-fd-border bg-fd-muted/20 px-4 py-3 flex flex-wrap items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-fd-muted-foreground">Variant:</span>
            {(['primary', 'secondary', 'danger'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-2 py-0.5 rounded border ${
                  variant === v ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold' : 'border-fd-border'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-fd-muted-foreground">Size:</span>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2 py-0.5 rounded border ${
                  size === s ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold' : 'border-fd-border'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="rounded"
            />
            <span className="font-semibold">Disabled</span>
          </label>
        </div>
      )}

      {name === 'Badge' && (
        <div className="border-t-2 border-fd-border bg-fd-muted/20 px-4 py-3 flex flex-wrap items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-fd-muted-foreground">Variant:</span>
            {(['primary', 'secondary'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-2 py-0.5 rounded border ${
                  variant === v ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold' : 'border-fd-border'
                }`}
              >
                {v === 'primary' ? 'pill' : 'label'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-fd-muted-foreground">Color:</span>
            {(['info', 'success', 'warning', 'danger'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-2 py-0.5 rounded border ${
                  color === c ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold' : 'border-fd-border'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {['Input', 'Textarea', 'Select', 'Checkbox', 'Radio'].includes(name) && (
        <div className="border-t-2 border-fd-border bg-fd-muted/20 px-4 py-3 flex items-center gap-6 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="rounded"
            />
            <span className="font-semibold">Disabled 상태 테스트</span>
          </label>
        </div>
      )}
    </div>
  );
}
