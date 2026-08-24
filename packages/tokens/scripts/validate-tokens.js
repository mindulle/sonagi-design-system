const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const PRIMITIVES_SRC = path.join(TOKENS_DIR, 'primitives.json');
const SEMANTICS_SRC = path.join(TOKENS_DIR, 'semantics.json');

function validateW3CSpec(filePath, isSemantic = false) {
  console.log(`🔍 Validating ${path.basename(filePath)}...`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let issueCount = 0;

  function traverse(node, currentPath = []) {
    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$') || key === 'meta') continue;
      const pathStr = [...currentPath, key].join('.');

      if (val && typeof val === 'object' && ('$value' in val || 'value' in val)) {
        const value = val.$value || val.value;
        const type = val.$type || val.type;

        // Rule 1: Must have description or $type
        if (!type && !isSemantic) {
          console.warn(`  ⚠️ [Missing $type] at ${pathStr}`);
          issueCount++;
        }

        // Rule 2: Color hex validation if type === 'color' and not an alias
        if (type === 'color' && typeof value === 'string' && value.startsWith('#')) {
          if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value)) {
            console.error(`  ❌ [Invalid Color Hex] ${value} at ${pathStr}`);
            issueCount++;
          }
        }

        // Rule 3: Alias reference check {primitive.blue.500}
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          const alias = value.slice(1, -1);
          // Verify alias reference existence (basic syntax check)
          if (!alias || alias.split('.').length < 2) {
            console.error(`  ❌ [Malformed Alias Reference] ${value} at ${pathStr}`);
            issueCount++;
          }
        }
      } else if (val && typeof val === 'object') {
        traverse(val, [...currentPath, key]);
      }
    }
  }

  traverse(data);

  if (issueCount === 0) {
    console.log(`✅ ${path.basename(filePath)} is 100% valid!`);
  } else {
    console.log(`⚠️ Found ${issueCount} issues/warnings in ${path.basename(filePath)}.`);
  }
}

validateW3CSpec(PRIMITIVES_SRC, false);
validateW3CSpec(SEMANTICS_SRC, true);
