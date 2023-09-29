/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['photos.pinksale.finance'],
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
