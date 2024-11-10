// next.config.js

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "variables.scss";`, // Ensure variables.scss exists in the included paths
  },
};

module.exports = nextConfig;
