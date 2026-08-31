#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// --- 설정 ---
const FIGMA_FILE_KEY = 'AEoW19jmlUh3rFgzhhV1vH';

// 로컬 ~/.secrets/figma-pat 파일 우선, 없으면 환경변수 사용
let FIGMA_TOKEN = process.env.FIGMA_TOKEN;
try {
  const tokenPath = path.join(os.homedir(), '.secrets', 'figma-pat');
  if (fs.existsSync(tokenPath)) {
    FIGMA_TOKEN = fs.readFileSync(tokenPath, 'utf8').trim();
  }
} catch (e) {
  // 무시
}

// 화이트리스트 (내부용 부품 등 스토리북이 필요 없는 Figma 컴포넌트들)
const IGNORE_FIGMA_NODES = new Set([
  '177:764',  // Icon Wrapper
  '159:425',  // Icon / Placeholder
  '198:2590', // Template = Login Form
]);

// Storybook 갤러리용 등 실제 React 컴포넌트 export 대상이 아닌 스토리들
const IGNORE_STORIES = new Set([
  'GeneratedAssets',
]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UI_DIR = path.resolve(__dirname, '..');

// --- 헬퍼 함수 ---
async function fetchFigma(endpoint) {
  const res = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API Error: ${res.status} ${res.statusText}`);
  return res.json();
}

function findStoryFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findStoryFiles(fullPath, fileList);
    } else if (fullPath.endsWith('.stories.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// --- 메인 로직 ---
async function main() {
  if (!FIGMA_TOKEN) {
    console.error("❌ Error: FIGMA_TOKEN 환경변수 또는 ~/.secrets/figma-pat 파일이 없습니다.");
    process.exit(1);
  }

  console.log('🔍 [1/3] Figma API에서 Published 컴포넌트를 가져오는 중...');
  const [csRes, cRes] = await Promise.all([
    fetchFigma(`/files/${FIGMA_FILE_KEY}/component_sets`),
    fetchFigma(`/files/${FIGMA_FILE_KEY}/components`),
  ]);

  // 1. Figma: published 컴포넌트 루트 수집
  const figmaRoots = new Map(); // node_id -> name
  for (const cs of csRes.meta.component_sets) {
    figmaRoots.set(cs.node_id, cs.name);
  }
  for (const c of cRes.meta.components) {
    // 세트에 속하지 않은 단독 컴포넌트만 추출
    if (!c.containing_frame?.containingComponentSet) {
      figmaRoots.set(c.node_id, c.name);
    }
  }

  // 2. Storybook: design.url 참조 수집
  console.log('🔍 [2/3] 로컬 스토리북 파일들을 분석하는 중...');
  const storyFiles = findStoryFiles(path.join(UI_DIR, 'src'));
  const storyRefs = new Map(); // node_id -> Set of story names
  const storiesWithoutExport = new Set();
  
  for (const file of storyFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const storyName = path.basename(file, '.stories.tsx');
    
    // design.url 추출 (주석 제외, 간이 정규식)
    const urlMatch = content.match(/url:\s*['"]https:\/\/www\.figma\.com\/design\/[^\/]+\/[^?]+\?node-id=([0-9]+-[0-9]+)['"]/);
    if (urlMatch) {
      const nodeId = urlMatch[1].replace('-', ':');
      if (!storyRefs.has(nodeId)) storyRefs.set(nodeId, new Set());
      storyRefs.get(nodeId).add(storyName);
    }

    if (!IGNORE_STORIES.has(storyName)) {
      storiesWithoutExport.add(storyName);
    }
  }

  // 3. Code: index.ts export 수집
  console.log('🔍 [3/3] 컴포넌트 Export 목록을 대조하는 중...');
  const indexTsContent = fs.readFileSync(path.join(UI_DIR, 'src/index.ts'), 'utf-8');
  const exportedComponents = new Set(
    [...indexTsContent.matchAll(/^export\s*{\s*([A-Za-z0-9_]+)\s*}/gm)].map(m => m[1])
  );

  // --- 위반 사항 체크 ---
  let hasErrors = false;
  console.log('\n======================================');
  console.log('         🚨 갭 검사 결과 리포트         ');
  console.log('======================================\n');

  // 규칙 1&2: 스토리 참조가 published 루트인가
  const invalidRefs = [];
  for (const [nodeId, stories] of storyRefs.entries()) {
    if (!figmaRoots.has(nodeId)) {
      invalidRefs.push(`${Array.from(stories).join(', ')} -> ${nodeId}`);
      hasErrors = true;
    }
  }
  if (invalidRefs.length > 0) {
    console.log('[위반] Figma에 존재하지 않거나 Publish되지 않은 노드를 참조하는 스토리:');
    invalidRefs.forEach(msg => console.log(`  - ${msg}`));
    console.log('');
  }

  // 규칙 3: published 인데 스토리가 없다
  const missingStories = [];
  for (const [nodeId, name] of figmaRoots.entries()) {
    if (!IGNORE_FIGMA_NODES.has(nodeId) && !storyRefs.has(nodeId)) {
      missingStories.push(`${name} (${nodeId})`);
      hasErrors = true;
    }
  }
  if (missingStories.length > 0) {
    console.log('[위반] Figma엔 Published 상태인데 Storybook 스토리가 없는 컴포넌트:');
    missingStories.forEach(msg => console.log(`  - ${msg}`));
    console.log('');
  }

  // 규칙 4: export 인데 스토리가 없다
  const missingExportStories = [];
  for (const comp of exportedComponents) {
    storiesWithoutExport.delete(comp); // export된 건 목록에서 제거
    let hasStory = false;
    for (const file of storyFiles) {
      if (path.basename(file) === `${comp}.stories.tsx`) {
        hasStory = true; break;
      }
    }
    if (!hasStory && !comp.endsWith('Props')) {
      missingExportStories.push(comp);
      hasErrors = true;
    }
  }
  if (missingExportStories.length > 0) {
    console.log('[위반] src/index.ts에서 Export 중인데 스토리가 없는 컴포넌트:');
    missingExportStories.forEach(msg => console.log(`  - ${msg}`));
    console.log('');
  }

  // 규칙 5: 스토리는 있는데 export 가 없다
  const noExports = Array.from(storiesWithoutExport);
  if (noExports.length > 0) {
    console.log('[위반] 스토리 파일은 존재하지만 src/index.ts에서 Export 되지 않은 컴포넌트:');
    noExports.forEach(msg => console.log(`  - ${msg}`));
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log('✅ 모든 갭 검사를 통과했습니다! Figma와 Storybook/코드가 완벽하게 동기화되어 있습니다.');
    process.exit(0);
  } else {
    console.log('❌ 동기화 갭이 발견되었습니다. 위 항목들을 수정해 주세요.');
    console.log('💡 TIP: 초기 도입 단계이므로 현재는 검사 실패 시에도 프로세스를 차단하지 않습니다 (warn-only).');
    process.exit(0); 
  }
}

main().catch(err => {
  console.error("실행 중 오류 발생:", err);
  process.exit(1);
});
