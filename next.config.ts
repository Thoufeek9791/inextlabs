import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inextlabs.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.inextlabs.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vecteezy.com',
        pathname: '/system/resources/previews/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
