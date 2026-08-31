import fs from 'fs';
import os from 'os';
import path from 'path';

let token = process.env.FIGMA_TOKEN;
if (token) {
  console.log("Env token length:", token.length);
} else {
  const p = path.join(os.homedir(), '.secrets', 'figma-pat');
  token = fs.readFileSync(p, 'utf8').trim();
  console.log("File token length:", token.length);
}

fetch('https://api.figma.com/v1/files/AEoW19jmlUh3rFgzhhV1vH/component_sets', {
  headers: { 'X-Figma-Token': token }
}).then(r => console.log('Status:', r.status)).catch(console.error);
