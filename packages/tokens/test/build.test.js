import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const distPath = path.resolve(__dirname, '../dist');

describe('Token Build Output Verification', () => {
  it('should generate variables.css with expected CSS variables and themes', () => {
    const cssPath = path.join(distPath, 'variables.css');
    expect(fs.existsSync(cssPath)).toBe(true);

    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // 필수 테마 블록 존재 여부
    expect(cssContent).toContain(':root');
    expect(cssContent).toContain('[data-theme="dark"]');
    expect(cssContent).toContain('[data-theme="light"]');

    // 필수 토큰 존재 여부
    expect(cssContent).toContain('--color-brand-primary');
    expect(cssContent).toContain('--font-sans');
    expect(cssContent).toContain('--spacing-4');
  });

  it('should generate a valid CJS export (index.js)', async () => {
    const cjsPath = path.join(distPath, 'index.js');
    expect(fs.existsSync(cjsPath)).toBe(true);

    const { tokens } = await import(cjsPath);
    expect(tokens).toBeDefined();
    expect(typeof tokens).toBe('object');
    expect(tokens['--color-blue-500']).toBeDefined();
    expect(tokens['--color-text-primary']).toBeDefined();
  });

  it('should generate a valid ESM export (index.mjs)', () => {
    const esmPath = path.join(distPath, 'index.mjs');
    expect(fs.existsSync(esmPath)).toBe(true);
    
    const esmContent = fs.readFileSync(esmPath, 'utf-8');
    expect(esmContent).toContain('export const tokens = {');
  });

  it('should generate a TypeScript declaration file (index.d.ts)', () => {
    const dtsPath = path.join(distPath, 'index.d.ts');
    expect(fs.existsSync(dtsPath)).toBe(true);

    const dtsContent = fs.readFileSync(dtsPath, 'utf-8');
    expect(dtsContent).toContain('export declare const tokens: Record<string, string>;');
  });
});
