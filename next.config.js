/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net", "img.clerk.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
