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

const dynamicConfig = {
    distDir: "output",
};

switch (target) {
    case "static":
        nextConfig = { ...baseConfig, ...staticConfig };
        break;
    default:
        nextConfig = { ...baseConfig, ...dynamicConfig };
}

module.exports = nextConfig;
