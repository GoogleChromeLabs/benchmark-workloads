/** @type {import('next').NextConfig} */
const target = process.env.TARGET ?? "node";
const repository = process.env.REPO ?? "news-site-next-static";
let nextConfig = {};

const baseConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
};

const githubConfig = {
    output: "export",
    distDir: "docs",
    assetPrefix: "./",
    basePath: `/${repository}`,
    images: {
        unoptimized: true,
    }
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
    case "github":
        nextConfig = { ...baseConfig, ...githubConfig };
        break;
    default:
        nextConfig = { ...baseConfig };
}

module.exports = nextConfig;
