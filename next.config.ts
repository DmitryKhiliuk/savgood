// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const apiUrl = process.env.API_URL;

      if (!apiUrl) {
        console.warn('⚠️ API_URL not defined, skipping remotePatterns');
        return [];
      }

      let hostname;
      try {
        hostname = new URL(apiUrl).hostname;
      } catch (err) {
        console.error('❌ Invalid API_URL:', apiUrl);
        throw err;
      }

      return [
        {
          protocol: apiUrl.startsWith('https') ? 'https' : 'http',
          hostname,
          pathname: '/uploads/**',
        },
      ];
    })(),
  },
};

module.exports = nextConfig;
