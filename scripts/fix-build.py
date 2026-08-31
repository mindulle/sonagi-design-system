import json

with open("/home/ubuntu/sonagi-design-system/packages/tokens/scripts/build.js", "r") as f:
    content = f.read()

new_func = """function extractTokens(node, pathArray = [], result = {}) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$') || key === 'meta') continue;
    
    const newPath = [...pathArray, key];
    if (val && typeof val === 'object' && ('$value' in val || 'value' in val)) {
      const rawVal = val.$value || val.value;
      if (typeof rawVal === 'object') {
        for (const [subKey, subVal] of Object.entries(rawVal)) {
           const camelToKebab = subKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
           const cssVar = getCssVarName([...newPath, camelToKebab]);
           result[cssVar] = subVal;
        }
      } else {
        const cssVar = getCssVarName(newPath);
        result[cssVar] = rawVal;
      }
    } else if (val && typeof val === 'object') {
      extractTokens(val, newPath, result);
    }
  }
  return result;
}"""

import re
content = re.sub(r"function extractTokens\(node, pathArray = \[\], result = \{\}\) \{[\s\S]*?return result;\n\}", new_func, content)

with open("/home/ubuntu/sonagi-design-system/packages/tokens/scripts/build.js", "w") as f:
    f.write(content)
