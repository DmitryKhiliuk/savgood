/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.API_URL?.startsWith('https') ? 'https' : 'http',
        hostname: new URL(process.env.API_URL || '').hostname,
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
