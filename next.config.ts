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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'blockchainaddict.fr',
      },
    ],
  },
};

export default nextConfig;
