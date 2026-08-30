import type { StorybookConfig } from '@storybook/react-vite';

import { existsSync } from "fs"
import { dirname, resolve } from "path"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-designs')
  ],
  // Generated graphics are build artifacts (gitignored). The gallery component
  // degrades gracefully when assets are absent, but Storybook's staticDirs
  // hard-crashes if the directory doesn't exist at config time. So we probe
  // the filesystem here and only mount it when present.
  "staticDirs": [
    '../../tokens/dist',
    ...(existsSync(resolve(__dirname, '../../graphics-generator/output'))
      ? [{ from: '../../graphics-generator/output', to: '/generated' }]
      : []),
  ],
  "framework": getAbsolutePath('@storybook/react-vite')
};
export default config;