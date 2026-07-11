const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const THEMES_DIR = path.join(TOKENS_DIR, 'themes');
const DIST_DIR = path.join(ROOT, 'dist');

const PRIMITIVES_SRC = path.join(TOKENS_DIR, 'primitives.json');
const SEMANTICS_SRC = path.join(TOKENS_DIR, 'semantics.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getCssVarName(pathArray) {
  let parts = [...pathArray];
  if (parts[0] === 'primitive') {
     parts[0] = 'color'; 
  } else if (parts[0] === 'semantic') {
     parts = parts.slice(2);
  } else if (parts[0] === 'shadow' && parts[1]) {
     parts = [parts[0], ...parts.slice(2)];
  } else if (parts[0] === 'typography') {
     if (parts[1] === 'fontFamily') parts = ['font', parts[2]];
     else if (parts[1] === 'fontSize') parts = ['font-size', parts[2]];
     else if (parts[1] === 'fontWeight') parts = ['font-weight', parts[2]];
     else if (parts[1] === 'lineHeight') parts = ['line-height', parts[2]];
     else if (parts[1] === 'letterSpacing') parts = ['letter-spacing', parts[2]];
  } else if (parts[0] === 'borderRadius') {
     parts = ['radius', parts[1]];
  } else if (parts[0] === 'borderWidth') {
     parts = ['border', parts[1]];
  } else if (parts[0] === 'transition') {
     if (parts[1] === 'duration') parts = ['duration', parts[2]];
     else if (parts[1] === 'easing') parts = ['ease', parts[2]];
  } else if (parts[0] === 'zIndex') {
     parts = ['z', parts[1]];
  } else if (parts[0] === 'tokens') {
     parts = parts.slice(1);
  }
  return `--sng-${parts.join('-')}`;
}

function extractTokens(node, pathArray = [], result = {}) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$') || key === 'meta') continue;
    
    const newPath = [...pathArray, key];
    if (val && typeof val === 'object' && ('$value' in val || 'value' in val)) {
      const cssVar = getCssVarName(newPath);
      result[cssVar] = val.$value || val.value;
    } else if (val && typeof val === 'object') {
      extractTokens(val, newPath, result);
    }
  }
  return result;
}

function generateCssBlock(selector, tokensDict) {
  if (Object.keys(tokensDict).length === 0) return '';
  let css = `${selector} {\n`;
  for (const [key, val] of Object.entries(tokensDict)) {
    css += `  ${key}: ${val};\n`;
  }
  css += `}\n\n`;
  return css;
}

function build() {
  const pkgJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const version = pkgJson.version;
  ensureDir(DIST_DIR);
  
  let cssOutput = `/**\n * Sonagi Design System — CSS Custom Properties\n * Generated automatically from JSON tokens v${version}\n * Multi-Brand 3-Tier Architecture\n */\n\n`;
  
  let flatTokens = {};
  let lightTokens = {};
  let darkTokens = {};
  let themesTokens = {};

  if (fs.existsSync(PRIMITIVES_SRC)) {
    const primData = JSON.parse(fs.readFileSync(PRIMITIVES_SRC, 'utf8'));
    const primTokens = extractTokens(primData);
    Object.assign(flatTokens, primTokens);
    cssOutput += `/* --- Primitive Tokens --- */\n`;
    cssOutput += generateCssBlock(':root', primTokens);
  }
  
  if (fs.existsSync(SEMANTICS_SRC)) {
    const semData = JSON.parse(fs.readFileSync(SEMANTICS_SRC, 'utf8'));
    lightTokens = extractTokens({ semantic: { light: semData.semantic?.light || {} }, shadow: { light: semData.shadow?.light || {} }});
    darkTokens = extractTokens({ semantic: { dark: semData.semantic?.dark || {} }, shadow: { dark: semData.shadow?.dark || {} }});
    Object.assign(flatTokens, lightTokens); 
    
    cssOutput += `/* --- Semantic Tokens (Sonagi Core) --- */\n`;
    cssOutput += generateCssBlock(':root, [data-theme="light"], [data-theme="sonagi-core"]', lightTokens);
    cssOutput += generateCssBlock('[data-theme="dark"]', darkTokens);
    cssOutput += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]):not([data-theme="desk-analyst"]) {\n`;
    for (const [key, val] of Object.entries(darkTokens)) {
      cssOutput += `    ${key}: ${val};\n`;
    }
    cssOutput += `  }\n}\n\n`;
  }
  
  if (fs.existsSync(THEMES_DIR)) {
    const themeFiles = fs.readdirSync(THEMES_DIR).filter(f => f.endsWith('.json'));
    cssOutput += `/* --- Theme Overrides --- */\n`;
    
    for (const file of themeFiles) {
      const themeData = JSON.parse(fs.readFileSync(path.join(THEMES_DIR, file), 'utf8'));
      const themeName = file.replace('.json', '').replace('theme-', '');
      const tokens = extractTokens(themeData);
      themesTokens[themeName] = tokens;
      Object.assign(flatTokens, tokens);
      cssOutput += `/* Theme: ${themeData.name || themeName} */\n`;
      cssOutput += generateCssBlock(`[data-theme="${themeName}"]`, tokens);
    }
  }
  
  fs.writeFileSync(path.join(DIST_DIR, 'variables.css'), cssOutput);
  console.log(`✅  Generated variables.css`);
  
  // ---------------------------------------------------------
  // Generate Lightweight HTML Showcase
  // ---------------------------------------------------------
  const generateColorSwatches = (tokensDict) => {
    return Object.entries(tokensDict)
      .filter(([k]) => k.includes('color'))
      .map(([k, v]) => `
        <div class="card">
          <div class="swatch" style="background-color: var(${k});"></div>
          <div class="info">
            <strong>${k}</strong>
            <code>${v}</code>
          </div>
        </div>
      `).join('');
  };

  const htmlOutput = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sonagi Design System - v${version}</title>
  <link rel="stylesheet" href="variables.css">
  <style>
    body { font-family: var(--font-sans); background: var(--color-bg-base); color: var(--color-text-primary); margin: 0; padding: 2rem; transition: background 0.3s, color 0.3s; }
    h1, h2 { border-bottom: 1px solid var(--color-border-default); padding-bottom: 0.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .card { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
    .swatch { width: 48px; height: 48px; border-radius: var(--radius-md); border: 1px solid var(--color-border-default); flex-shrink: 0; }
    .info { display: flex; flex-direction: column; gap: 0.25rem; }
    code { font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted); }
    .theme-selector { margin-bottom: 2rem; padding: 1rem; background: var(--color-bg-elevated); border-radius: var(--radius-md); border: 1px solid var(--color-border-default); }
    select { padding: 0.5rem; font-family: var(--font-sans); border-radius: var(--radius-sm); border: 1px solid var(--color-border-strong); }
  </style>
</head>
<body data-theme="light">
  <h1>🎨 Sonagi Design System <small>v${version}</small></h1>
  <p>이 페이지는 Cloudflare Pages를 통해 무중단 서빙되는 디자인 시스템 CDN입니다. 외부 블로그 및 플랫폼에서는 아래 URL을 참조하세요.</p>
  <code>&lt;link rel="stylesheet" href="https://design.sonagi.space/variables.css"&gt;</code>

  <div class="theme-selector">
    <label for="theme-select"><strong>미리보기 테마 변경: </strong></label>
    <select id="theme-select" onchange="document.body.setAttribute('data-theme', this.value)">
      <option value="light">Light (Default)</option>
      <option value="dark">Dark</option>
      ${Object.keys(themesTokens).map(t => `<option value="${t}">${t} (Override)</option>`).join('')}
    </select>
  </div>

  <h2>Semantic Colors</h2>
  <div class="grid">
    ${generateColorSwatches(lightTokens)}
  </div>

  <h2>Theme Overrides (desk-analyst)</h2>
  <div class="grid">
    ${themesTokens['desk-analyst'] ? generateColorSwatches(themesTokens['desk-analyst']) : '<p>No overrides found</p>'}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), htmlOutput);
  console.log(`✅  Generated index.html (Showcase)`);

  
  const tokenEntries = Object.entries(flatTokens)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
    .join(',\n');

  const cjsContent = `/**\n * @sonagi/tokens v${version}\n * Auto-generated.\n */\n'use strict';\n\nconst tokens = {\n${tokenEntries}\n};\n\nmodule.exports = { tokens };\n`;
  const esmContent = `/**\n * @sonagi/tokens v${version}\n * Auto-generated.\n */\nexport const tokens = {\n${tokenEntries}\n};\n`;
  const dts = `/**\n * @sonagi/tokens v${version}\n */\nexport declare const tokens: Record<string, string>;\n`;

  fs.writeFileSync(path.join(DIST_DIR, 'index.js'), cjsContent);
  fs.writeFileSync(path.join(DIST_DIR, 'index.mjs'), esmContent);
  fs.writeFileSync(path.join(DIST_DIR, 'index.d.ts'), dts);
  console.log(`✅  Generated JS/TS exports`);
}

build();
