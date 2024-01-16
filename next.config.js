/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'photos.pinksale.finance',
      'embed-ssl.wistia.com',
      'firebasestorage.googleapis.com',
      'www.google.com',
    ],
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
