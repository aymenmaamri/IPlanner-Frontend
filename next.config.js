/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // instruct webpack to import .svg files as modules using svgr/webpack
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
