import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import React from 'react';
import {
  Rocket,
  Palette,
  Boxes,
  MousePointerClick,
  Tag,
  Square,
  TextCursorInput,
  AlignLeft,
  CheckSquare,
  CircleDot,
  FolderKanban,
  ChevronsUpDown,
  SquareDashedBottomCode,
  ListOrdered,
  User,
  List,
  Eye,
  Flame,
  FileText,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  index: <Rocket className="size-4 text-amber-500" />,
  colors: <Palette className="size-4 text-amber-500" />,
  button: <MousePointerClick className="size-4" />,
  badge: <Tag className="size-4" />,
  card: <Square className="size-4" />,
  input: <TextCursorInput className="size-4" />,
  textarea: <AlignLeft className="size-4" />,
  select: <ChevronsUpDown className="size-4" />,
  checkbox: <CheckSquare className="size-4" />,
  radio: <CircleDot className="size-4" />,
  tabs: <FolderKanban className="size-4" />,
  accordion: <ChevronsUpDown className="size-4" />,
  modal: <SquareDashedBottomCode className="size-4" />,
  pagination: <ListOrdered className="size-4" />,
  avatar: <User className="size-4" />,
  'list-item': <List className="size-4" />,
  'hover-preview': <Eye className="size-4" />,
  'mindulle-logo': <Flame className="size-4 text-amber-500" />,
};

function enrichTreeWithIcons(node: any): any {
  if (!node) return node;

  const enriched = { ...node };

  if (enriched.type === 'page') {
    const slug = enriched.url?.split('/').pop() || '';
    if (iconMap[slug]) {
      enriched.icon = iconMap[slug];
    } else {
      enriched.icon = <FileText className="size-4" />;
    }
  } else if (enriched.type === 'folder') {
    const isFoundations = enriched.name?.toLowerCase().includes('파운데이션') || enriched.name?.toLowerCase().includes('foundations');
    enriched.icon = isFoundations ? (
      <Palette className="size-4 text-amber-500" />
    ) : (
      <Boxes className="size-4 text-amber-500" />
    );

    if (enriched.children) {
      enriched.children = enriched.children.map(enrichTreeWithIcons);
    }
  }

  return enriched;
}

export default function Layout({ children }: { children: ReactNode }) {
  const treeWithIcons = {
    ...source.pageTree,
    children: source.pageTree.children.map(enrichTreeWithIcons),
  };

  return (
    <DocsLayout
      tree={treeWithIcons}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
