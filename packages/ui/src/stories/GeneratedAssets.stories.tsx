import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

/**
 * Gallery for assets produced by `packages/graphics-generator`.
 *
 * The catalogue is driven by the generator's manifest rather than hand-written
 * entries, so it cannot claim assets the generator does not actually emit.
 *
 * Assets are build artifacts (ADR 0001 §4.3) and are not committed. When the
 * manifest is missing the gallery explains how to produce it instead of failing.
 */

interface Asset {
  id: string;
  category: 'keyvisual' | 'icon';
  name: string;
  path: string;
  theme: string | null;
  seed: number | null;
  width: number;
  height: number;
  rules: string[];
  usage: string;
}

interface Manifest {
  generatedAt: string;
  tokensVersion: string;
  generatorVersion: string;
  assets: Asset[];
}

const RULE_LABELS: Record<string, string> = {
  A: 'A · 파문',
  B: 'B · 빗줄기',
  C: 'C · 타이포 노이즈',
  D: 'D · 아이콘 그리드',
  E: 'E · 다이내믹 심볼',
  F: 'F · 세이프 존',
};

function Empty() {
  return (
    <div
      style={{
        padding: 24,
        border: '1px solid var(--sng-color-border-default)',
        borderRadius: 8,
        background: 'var(--sng-color-background-surface)',
        color: 'var(--sng-color-text-primary)',
        fontFamily: 'var(--sng-font-sans)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>생성된 에셋이 없습니다</h3>
      <p style={{ color: 'var(--sng-color-text-secondary)' }}>
        그래픽 에셋은 빌드 산출물이라 저장소에 커밋하지 않습니다. 아래를 실행한 뒤
        Storybook을 다시 시작하십시오.
      </p>
      <pre
        style={{
          background: 'var(--sng-color-background-base)',
          padding: 12,
          borderRadius: 6,
          fontFamily: 'var(--sng-font-mono)',
          overflowX: 'auto',
        }}
      >
        cd packages/graphics-generator && python3 build_all.py
      </pre>
    </div>
  );
}

function Meta_({ manifest }: { manifest: Manifest }) {
  const items = [
    ['생성 시각', manifest.generatedAt],
    ['토큰 버전', manifest.tokensVersion],
    ['생성기 버전', manifest.generatorVersion],
  ];
  return (
    <dl
      style={{
        display: 'flex',
        gap: 24,
        margin: '0 0 24px',
        padding: '12px 16px',
        border: '1px solid var(--sng-color-border-subtle)',
        borderRadius: 6,
        fontFamily: 'var(--sng-font-mono)',
        fontSize: 12,
        color: 'var(--sng-color-text-muted)',
      }}
    >
      {items.map(([k, v]) => (
        <div key={k}>
          <dt style={{ opacity: 0.7 }}>{k}</dt>
          <dd style={{ margin: 0, color: 'var(--sng-color-text-primary)' }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Card({ asset }: { asset: Asset }) {
  const isIcon = asset.category === 'icon';
  return (
    <figure
      style={{
        margin: 0,
        border: '1px solid var(--sng-color-border-subtle)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--sng-color-background-surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isIcon ? 32 : 0,
          minHeight: isIcon ? 120 : undefined,
          color: 'var(--sng-color-brand-ink)',
        }}
      >
        <img
          src={`/generated/${asset.path}`}
          alt={asset.usage}
          width={isIcon ? 48 : undefined}
          height={isIcon ? 48 : undefined}
          style={isIcon ? undefined : { display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
      <figcaption
        style={{
          padding: 12,
          borderTop: '1px solid var(--sng-color-border-subtle)',
          fontFamily: 'var(--sng-font-sans)',
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <strong style={{ color: 'var(--sng-color-text-primary)' }}>{asset.name}</strong>
          {asset.theme && (
            <span style={{ color: 'var(--sng-color-text-muted)', fontSize: 12 }}>
              {asset.theme}
            </span>
          )}
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--sng-font-mono)',
              fontSize: 11,
              color: 'var(--sng-color-text-muted)',
            }}
          >
            {asset.width}×{asset.height}
            {asset.seed !== null && ` · seed ${asset.seed}`}
          </span>
        </div>

        <p style={{ margin: '8px 0', color: 'var(--sng-color-text-secondary)', lineHeight: 1.5 }}>
          {asset.usage}
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {asset.rules.map((r) => (
            <span
              key={r}
              style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 999,
                border: '1px solid var(--sng-color-border-default)',
                color: 'var(--sng-color-text-muted)',
              }}
            >
              {RULE_LABELS[r] ?? r}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

function Gallery({ category }: { category: Asset['category'] }) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch('/generated/manifest.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setManifest)
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <Empty />;
  if (!manifest) return <p style={{ fontFamily: 'var(--sng-font-sans)' }}>불러오는 중…</p>;

  const assets = manifest.assets.filter((a) => a.category === category);
  if (assets.length === 0) return <Empty />;

  return (
    <div style={{ padding: 16 }}>
      <Meta_ manifest={manifest} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: category === 'icon'
            ? 'repeat(auto-fill, minmax(200px, 1fr))'
            : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 16,
        }}
      >
        {assets.map((a) => (
          <Card key={a.id} asset={a} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Assets/Generated',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'packages/graphics-generator가 절차적으로 생성한 에셋입니다. ' +
          '값은 전부 디자인 토큰에서 유래하며, seed가 기록되어 재현 가능합니다. ' +
          '규칙은 해당 패키지의 ADR 0001을 따릅니다.',
      },
    },
  },
};
export default meta;

export const KeyVisuals: StoryObj = {
  name: 'Key Visuals',
  render: () => <Gallery category="keyvisual" />,
};

export const Icons: StoryObj = {
  name: 'Brand Icons',
  render: () => <Gallery category="icon" />,
};
