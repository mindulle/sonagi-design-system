import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@mindulle/ui', '@mindulle/tokens', '@mindulle/icons'],
};

export default withMDX(config);
