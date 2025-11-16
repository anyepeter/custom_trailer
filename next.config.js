/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add your image domains here (e.g., CDN domains)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: false, // Set to true if having optimization issues
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
