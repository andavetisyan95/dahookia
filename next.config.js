// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Configure optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  webpack: (config, { isServer }) => {
    // Optimize MUI with SWC
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/material': '@mui/material/modern',
      '@mui/icons-material': '@mui/icons-material/esm',
    };

    // Optimize moment.js locales
    config.plugins.push(
      new (require('webpack').ContextReplacementPlugin)(
        /moment[/\\]locale$/,
        /en|ru/ // include only needed locales
      )
    );

    return config;
  },
  // Enable gzip compression
  compress: true,
  // Enable ETag generation
  generateEtags: true,
  // Enable static exports for all pages
  output: 'standalone',
  // Enable React 18 concurrent features
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);
