import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URI: process.env.DATABASE_URI,
  },
};

export default nextConfig;