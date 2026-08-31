import fs from 'fs';
import os from 'os';
import path from 'path';

const p = path.join(os.homedir(), '.secrets', 'figma-pat');
const token = fs.readFileSync(p, 'utf8').trim();
console.log("File token prefix:", token.substring(0, 6));

fetch('https://api.figma.com/v1/files/AEoW19jmlUh3rFgzhhV1vH/component_sets', {
  headers: { 'X-Figma-Token': token }
}).then(r => console.log('Status:', r.status)).catch(console.error);
