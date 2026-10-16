const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve(__dirname, '../public/vectorcraft');
const indexPath = path.join(targetDir, 'index.html');
const wasmPath = path.join(targetDir, 'vectorcraft-web-6a8c4481c5b10cda_bg.wasm');

if (fs.existsSync(indexPath) && fs.existsSync(wasmPath)) {
  console.log('✓ VectorCraft Web Canvas already installed in public/vectorcraft/');
  process.exit(0);
}

console.log('⚡ Downloading VectorCraft Web Canvas (WASM build)...');
fs.mkdirSync(targetDir, { recursive: true });

const zipUrl = 'https://github.com/storytold/vectorcraft/releases/download/v0.11.0/vectorcraft-web-0.11.0.zip';
const tmpZip = '/tmp/vectorcraft-web-0.11.0.zip';
const tmpExtract = '/tmp/vectorcraft-web-extract';

try {
  execSync(`curl -sL "${zipUrl}" -o "${tmpZip}"`, { stdio: 'inherit' });
  execSync(`rm -rf "${tmpExtract}" && mkdir -p "${tmpExtract}" && unzip -q "${tmpZip}" -d "${tmpExtract}"`, { stdio: 'inherit' });
  execSync(`cp -r "${tmpExtract}"/vectorcraft-web-0.11.0/* "${targetDir}"/`, { stdio: 'inherit' });
  console.log('✓ VectorCraft Web Canvas successfully downloaded and mounted to public/vectorcraft/');
} catch (err) {
  console.error('Failed to setup VectorCraft Web Canvas:', err);
  process.exit(1);
}
