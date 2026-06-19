#!/usr/bin/env node
/**
 * Sonagi Design System — Token Build Script
 *
 * design-tokens.json (W3C DTCG format, Primitive + Semantic 2-layer)
 *   → tokens/variables.css  (source of truth, hand-crafted — do NOT overwrite)
 *
 * This script validates the two token files are in sync and generates
 * a TypeScript constant file for consumers who prefer JS/TS imports.
 *
 * Output:
 *   dist/index.js      — CommonJS + ESM re-export of tokens
 *   dist/index.d.ts    — TypeScript types
 *   dist/variables.css — Copy of tokens/variables.css (for npm publish)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const DIST_DIR = path.join(ROOT, 'dist');

const JSON_SRC = path.join(TOKENS_DIR, 'design-tokens.json');
const CSS_SRC = path.join(TOKENS_DIR, 'variables.css');

// ── helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(msg + '\n');
}

function err(msg) {
  process.stderr.write('❌  ' + msg + '\n');
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ── 1. Validate source files exist ───────────────────────────────────────────

log('🔨 Building @sonagi/tokens…\n');

if (!fs.existsSync(JSON_SRC)) err(`Missing source: ${JSON_SRC}`);
if (!fs.existsSync(CSS_SRC)) err(`Missing source: ${CSS_SRC}`);

const tokens = JSON.parse(fs.readFileSync(JSON_SRC, 'utf8'));
const cssContent = fs.readFileSync(CSS_SRC, 'utf8');

// ── 2. Validate versions match ────────────────────────────────────────────────

const jsonVersion = tokens?.meta?.version ?? '(none)';
const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const pkgVersion = pkgJson.version;

// Extract version from CSS comment (line: "Generated from: design-tokens.json vX.X.X")
const cssVersionMatch = cssContent.match(/design-tokens\.json\s+v([\d.]+)/);
const cssVersion = cssVersionMatch ? cssVersionMatch[1] : '(none)';

if (jsonVersion !== pkgVersion) {
  err(
    `Version mismatch: design-tokens.json says v${jsonVersion} but package.json says v${pkgVersion}\n` +
    `  → Update package.json or design-tokens.json meta.version`
  );
}

if (cssVersion !== jsonVersion) {
  console.warn(
    `⚠️  CSS comment version (v${cssVersion}) differs from design-tokens.json (v${jsonVersion})\n` +
    `  → Update the comment in variables.css if you have updated the tokens.`
  );
}

log(`✅  Version: v${pkgVersion}`);

// ── 3. Copy CSS to dist ───────────────────────────────────────────────────────

ensureDir(DIST_DIR);
fs.copyFileSync(CSS_SRC, path.join(DIST_DIR, 'variables.css'));
log('✅  dist/variables.css');

// ── 4. Generate JS export (flat CSS var names → values from JSON) ─────────────

/**
 * Walk the W3C DTCG token tree and collect { cssVarName: value } pairs.
 * Keys starting with "$" are metadata — skip them.
 * Leaf nodes have a "$value" property.
 */
function collectTokens(node, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue;          // metadata
    if (key === 'meta') continue;               // top-level meta block
    const segment = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && '$value' in val) {
      result[`--${segment}`] = val['$value'];
    } else if (val && typeof val === 'object') {
      Object.assign(result, collectTokens(val, segment));
    }
  }
  return result;
}

const flatTokens = collectTokens(tokens);
const tokenEntries = Object.entries(flatTokens)
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
  .join(',\n');

const cjsContent = `/**
 * @sonagi/tokens v${pkgVersion}
 * Auto-generated — do not edit directly.
 * Edit tokens/design-tokens.json and re-run: node scripts/build.js
 */
'use strict';

const tokens = {\n${tokenEntries}\n};\n\nmodule.exports = { tokens };\n`;

const esmContent = `/**
 * @sonagi/tokens v${pkgVersion}
 * Auto-generated — do not edit directly.
 * Edit tokens/design-tokens.json and re-run: node scripts/build.js
 */
export const tokens = {\n${tokenEntries}\n};\n`;

fs.writeFileSync(path.join(DIST_DIR, 'index.js'), cjsContent);
fs.writeFileSync(path.join(DIST_DIR, 'index.mjs'), esmContent);
log('✅  dist/index.js + dist/index.mjs');

// ── 5. Generate TypeScript declaration ───────────────────────────────────────

const dts = `/**
 * @sonagi/tokens v${pkgVersion}
 * CSS custom property names derived from design-tokens.json
 */
export declare const tokens: Record<string, string>;
`;

fs.writeFileSync(path.join(DIST_DIR, 'index.d.ts'), dts);
log('✅  dist/index.d.ts');

// ── Done ──────────────────────────────────────────────────────────────────────

log(`\n✨  @sonagi/tokens v${pkgVersion} built successfully.\n`);
