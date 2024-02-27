import terser from '@rollup/plugin-terser';
import cleaner from "rollup-plugin-cleaner";

export default {
    input: "index.js",
    output: [
        {
            file: "dist/benchmark-connector.min.js",
            format: "es",
        },
    ],
    plugins: [
        cleaner({
            targets: ["./dist/"],
        }),
        terser(),
    ],
};
