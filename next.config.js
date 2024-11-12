// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Deprecated: Remove the 'domains' array
    // domains: ['res.cloudinary.com'],

    // Use 'remotePatterns' instead
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave empty if not needed
        pathname: '/**', // Adjust as necessary
      },
      // Add more patterns if you have multiple image sources
      // {
      //   protocol: 'https',
      //   hostname: 'another-domain.com',
      //   pathname: '/images/**',
      // },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

module.exports = nextConfig;
