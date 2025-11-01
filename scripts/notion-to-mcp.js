// notion-to-mcp.js
// Usage: NOTION_TOKEN=... node notion-to-mcp.js <page-id-or-url>

const { Client } = require('@notionhq/client');

function extractPageId(urlOrId) {
  // Notion URLs often contain a UUID at the end; remove dashes possible
  const uuidRegex =
    /([0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  const m = urlOrId.match(uuidRegex);
  if (!m) throw new Error('Cannot find page id in input');
  return m[1];
}

async function getAllBlockChildren(notion, block_id) {
  const blocks = [];
  let cursor = undefined;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await notion.blocks.children.list({
      block_id,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(...res.results);
    if (!res.has_more) break;
    cursor = res.next_cursor;
  }
  return blocks;
}

function blockToText(block) {
  if (!block || !block.type) return '';
  const type = block.type;
  const richText = block[type].rich_text || [];
  return richText.map((r) => r.plain_text).join('');
}

function normalizeImage(block) {
  // image.block: file.url or external.url
  if (block.type !== 'image') return null;
  const img = block.image;
  if (img.type === 'external') return img.external.url;
  if (img.type === 'file') return img.file.url;
  return null;
}

(async () => {
  try {
    const token = process.env.NOTION_TOKEN;
    if (!token) throw new Error('Set NOTION_TOKEN env var');
    // accept either: node scripts/notion-to-mcp.js <page-id>
    // or: pnpm run notion-to-mcp -- <page-id> (pnpm may forward a leading `--`)
    const argv = process.argv.slice(2);
    const arg = argv.find((a) => a && a !== '--');
    if (!arg)
      throw new Error(
        `Provide page id or URL as argument. Received: ${argv.join(' ')}`
      );
    const pageId = extractPageId(arg);

    const notion = new Client({ auth: token });

    // get page metadata
    const page = await notion.pages.retrieve({ page_id: pageId });
    const titleProp =
      page.properties &&
      Object.values(page.properties).find((p) => p.type === 'title');
    const title = titleProp
      ? titleProp.title.map((t) => t.plain_text).join('')
      : page.properties.title?.title?.map((t) => t.plain_text).join('') ||
        'Untitled';

    // get top-level blocks
    const blocks = await getAllBlockChildren(notion, pageId);

    // flatten blocks and convert
    const contextBlocks = [];
    for (const b of blocks) {
      const type = b.type;
      if (
        [
          'heading_1',
          'heading_2',
          'heading_3',
          'paragraph',
          'code',
          'bulleted_list_item',
          'numbered_list_item',
          'toggle',
          'quote',
        ].includes(type)
      ) {
        contextBlocks.push({
          id: b.id,
          type,
          text: blockToText(b),
        });
      } else if (type === 'image') {
        contextBlocks.push({
          id: b.id,
          type: 'image',
          url: normalizeImage(b),
          caption: (b.image.caption || []).map((c) => c.plain_text).join(''),
        });
      } else {
        // fallback: add plain text if any
        const text = blockToText(b);
        if (text) contextBlocks.push({ id: b.id, type: 'other', text });
      }
      // handle children recursively for list items / toggles
      if (b.has_children) {
        const childBlocks = await getAllBlockChildren(notion, b.id);
        for (const cb of childBlocks) {
          const childText = blockToText(cb);
          if (childText)
            contextBlocks.push({
              id: cb.id,
              type: `child:${cb.type}`,
              text: childText,
            });
        }
      }
    }

    // Build MCP-like context
    const mcpContext = {
      source: 'notion',
      page_id: pageId,
      title,
      url: `https://www.notion.so/${pageId.replace(/-/g, '')}`,
      last_edited_time: page.last_edited_time,
      created_time: page.created_time,
      properties: page.properties,
      blocks: contextBlocks,
      summary: contextBlocks
        .slice(0, 6)
        .map((b) => b.text || b.caption)
        .filter(Boolean)
        .join('\n\n'),
    };

    // Output JSON
    console.log(JSON.stringify(mcpContext, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
