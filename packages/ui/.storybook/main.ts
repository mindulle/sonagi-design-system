import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
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
  // Generated graphics are build artifacts: packages/graphics-generator/output is
  // gitignored, so run `python3 build_all.py` in that package before starting
  // Storybook. The gallery degrades to an instruction panel when it is absent.
  "staticDirs": [
    '../../tokens/dist',
    { from: '../../graphics-generator/output', to: '/generated' }
  ],
  "framework": getAbsolutePath('@storybook/react-vite')
};
export default config;