/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uberduck-images.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
