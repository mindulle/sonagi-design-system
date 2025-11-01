#!/usr/bin/env node
// scripts/create-labels.js
// Reads .github/labels.json and creates/updates labels using the gh CLI

const fs = require('fs');
const { execSync } = require('child_process');

const LABEL_FILE = '.github/labels.json';

function loadLabels() {
  if (!fs.existsSync(LABEL_FILE)) {
    console.error(`Label file not found: ${LABEL_FILE}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(LABEL_FILE, 'utf8'));
}

function ensureGh() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch (e) {
    console.error(
      'gh CLI not found. Install it and run `gh auth login` before executing this script.'
    );
    process.exit(1);
  }
}

function run() {
  ensureGh();
  const labels = loadLabels();
  for (const l of labels) {
    const name = l.name.replace(/"/g, '\\"');
    const color = l.color;
    const desc = (l.description || '').replace(/"/g, '\\"');
    try {
      console.log(`Creating label: ${l.name}`);
      execSync(
        `gh label create "${name}" --color ${color} --description "${desc}"`,
        { stdio: 'inherit' }
      );
    } catch (err) {
      // If create fails (likely exists), try edit
      try {
        console.log(`Updating label: ${l.name}`);
        execSync(
          `gh label edit "${name}" --color ${color} --description "${desc}"`,
          { stdio: 'inherit' }
        );
      } catch (err2) {
        console.error(
          `Failed to create or update label ${l.name}:`,
          err2.message || err2
        );
      }
    }
  }
}

run();
