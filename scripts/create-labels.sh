#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install it and run: gh auth login"
  exit 1
fi

echo "Creating/updating labels from .github/labels.json..."
node scripts/create-labels.js

echo "Done."
