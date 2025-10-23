const fs = require('fs');
const path = require('path');

const tokens = require('../src/tokens.json');

// Flatten nested object to CSS custom properties
function flattenTokens(obj, prefix = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value, newPrefix));
    } else {
      result[`--${newPrefix}`] = value;
    }
  }
  
  return result;
}

// Generate CSS file
function generateCSS() {
  const flatTokens = flattenTokens(tokens);
  
  let css = ':root {\n';
  for (const [key, value] of Object.entries(flatTokens)) {
    css += `  ${key}: ${value};\n`;
  }
  css += '}\n';
  
  const outputPath = path.join(__dirname, '../dist/tokens.css');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css);
  
  console.log('✅ CSS tokens generated');
}

// Generate TypeScript file
function generateTS() {
  const generateTSObject = (obj, indent = 0) => {
    const spaces = '  '.repeat(indent);
    let result = '{\n';
    
    for (const [key, value] of Object.entries(obj)) {
      const safeKey = /^\d/.test(key) ? `'${key}'` : key;
      
      if (typeof value === 'object' && value !== null) {
        result += `${spaces}  ${safeKey}: ${generateTSObject(value, indent + 1)},\n`;
      } else {
        result += `${spaces}  ${safeKey}: '${value}',\n`;
      }
    }
    
    result += `${spaces}}`;
    return result;
  };
  
  const ts = `/**
 * 소나기 디자인 시스템 - 디자인 토큰
 * Auto-generated from tokens.json
 */

export const tokens = ${generateTSObject(tokens)} as const;

export default tokens;
`;
  
  const outputPath = path.join(__dirname, '../dist/index.js');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, ts);
  
  console.log('✅ TypeScript tokens generated');
}

// Generate TypeScript types
function generateTypes() {
  const types = `/**
 * 소나기 디자인 시스템 - 타입 정의
 * Auto-generated from tokens.json
 */

export interface Tokens {
  color: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
  };
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
    letterSpacing: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadow: Record<string, string>;
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
  breakpoint: Record<string, string>;
}

export declare const tokens: Tokens;
export default tokens;
`;
  
  const outputPath = path.join(__dirname, '../dist/index.d.ts');
  fs.writeFileSync(outputPath, types);
  
  console.log('✅ TypeScript types generated');
}

// Main
console.log('🔨 Building design tokens...\n');

try {
  generateCSS();
  generateTS();
  generateTypes();
  
  console.log('\n✨ All tokens built successfully!');
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
