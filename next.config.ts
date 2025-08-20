import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inextlabs.ai',
        pathname: '/**', // allow all image paths from this domain
      },
      {
        protocol: 'https',
        hostname: 'cdn.inextlabs.ai', // if they use a CDN domain
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vecteezy.com',
        pathname: '/system/resources/previews/**', // allow specific path for vecteezy
      },
    ],
  },
};

export default nextConfig;
