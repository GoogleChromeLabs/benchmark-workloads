/** @type {import('next').NextConfig} */
const target = process.env.TARGET ?? "node";
let nextConfig = {};

const baseConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
};

const staticConfig = {
    output: "export",
    distDir: "dist",
    assetPrefix: "./",
    images: {
        unoptimized: true,
    },
};

switch (target) {
    case "static":
        nextConfig = { ...baseConfig, ...staticConfig };
        break;
    default:
        nextConfig = { ...baseConfig };
}

module.exports = nextConfig;
