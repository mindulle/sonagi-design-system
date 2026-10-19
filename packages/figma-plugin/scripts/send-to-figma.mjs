#!/usr/bin/env node
/**
 * CLI Helper to push Figma scripts or AST to connected Figma plugins via Bridge
 * Usage:
 *   node send-to-figma.mjs <path-to-script-or-ast>
 */

import fs from 'node:fs';
import path from 'node:path';

const BRIDGE_URL = process.env.BRIDGE_RENDER_URL || 'http://localhost:3050/render';

async function main() {
  const targetPath = process.argv[2];
  if (!targetPath) {
    console.error('Usage: node send-to-figma.mjs <path-to-file>');
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), targetPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, 'utf8');
  let payload;

  if (targetPath.endsWith('.json')) {
    try {
      const ast = JSON.parse(content);
      payload = { type: 'create-wireframe', layout: ast };
    } catch (e) {
      console.error('Invalid JSON AST file');
      process.exit(1);
    }
  } else {
    // Treat as javascript figma script
    payload = { type: 'execute-script', script: content };
  }

  console.log(`📡 Sending payload to Figma Bridge (${BRIDGE_URL})...`);
  try {
    const res = await fetch(BRIDGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      console.log(`✅ [성공] ${data.message} (클라이언트: ${data.clientsNotified}개)`);
    } else {
      console.warn(`⚠️ [알림] ${data.error || data.message} (현재 연결된 플러그인: ${data.connectedClients ?? 0}개)`);
    }
  } catch (err) {
    console.error(`❌ 전송 실패: ${err.message}`);
  }
}

main();
