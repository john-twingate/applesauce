/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: 'node-fetch'
    };
    return config;
  }
}

module.exports = nextConfig
