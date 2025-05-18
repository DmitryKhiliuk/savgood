/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (() => {
      const apiUrl = process.env.API_URL;

      if (!apiUrl) {
        console.warn("⚠️  API_URL is not defined. Skipping image remotePatterns.");
        return [];
      }

      let hostname;

      try {
        hostname = new URL(apiUrl).hostname;
      } catch (err) {
        console.error("❌ Invalid API_URL in environment:", apiUrl);
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

