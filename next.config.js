/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["photos.pinksale.finance", "embed-ssl.wistia.com", "firebasestorage.googleapis.com"],
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
