import { readFile, writeFile } from 'fs/promises';
import { parseFigFile, exportFigFile } from '/home/ubuntu/open-pencil/packages/core/src/io/formats/fig/index.js';

// family|weight|italic → { style, postscript } 실제 시스템 폰트 기준
const FONT_MAP = {
  'Pretendard|400|false':     { style: 'Regular',  postscript: 'Pretendard-Regular'   },
  'Pretendard|500|false':     { style: 'Medium',   postscript: 'Pretendard-Medium'    },
  'Pretendard|600|false':     { style: 'SemiBold', postscript: 'Pretendard-SemiBold'  },
  'Pretendard|700|false':     { style: 'Bold',     postscript: 'Pretendard-Bold'      },
  'Noto Serif KR|400|false':  { style: 'Regular',  postscript: 'NotoSerifKR-Regular'  },
  'JetBrains Mono|400|false': { style: 'Regular',  postscript: 'JetBrainsMono-Regular'},
};

const runtime = {
  getGlyphOutlineMetrics: () => null,
  getPostScriptName(family, weight, italic) {
    return FONT_MAP[family + '|' + weight + '|' + String(italic)]?.postscript || '';
  },
  getFontStyle(family, weight, italic) {
    return FONT_MAP[family + '|' + weight + '|' + String(italic)]?.style || '';
  },
};

const inputPath = process.argv[2];
const data = await readFile(inputPath);
const graph = await parseFigFile(data.buffer, { populate: 'first-page' });

let patchCount = 0;
for (const [id, node] of graph.nodes) {
  if (node.type === 'TEXT') {
    graph.updateNode(id, { lineHeight: null });
    patchCount++;
  }
}

const out = await exportFigFile(graph, undefined, undefined, undefined, false, runtime);
await writeFile(inputPath, out);
console.log('patched:', patchCount, 'TEXT nodes, size:', out.byteLength);
