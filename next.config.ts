import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.elegantthemes.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builtin.com',
      },
      {
        protocol: 'https',
        hostname: 'dt-cdn.net',
      },
    ],
  },
};

export default nextConfig;
