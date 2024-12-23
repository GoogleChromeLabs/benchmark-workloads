import cleaner from "rollup-plugin-cleaner";
import { copyFiles } from "./node_modules/rollup-copy-files/dist/index.min.js";

export default {
    input: "index.js",
    output: [
        {
            file: "dist/index.js",
            format: "es",
        },
    ],
    plugins: [
        cleaner({
            targets: ["./dist/"],
        }),
        copyFiles({
            src: ["scripts/todomvc-testing-utils.js", "scripts/workload-testing-utils.mjs", "scripts/prepare.js"],
            dest: "dist/",
            rename: (name, extension) => `${name}.min.${extension}`,
            minify: true
        }),
        copyFiles({
            src: ["scripts/test-invoker.mjs", "scripts/test-runner.mjs", "scripts/benchmark.mjs", "scripts/helpers.mjs", "scripts/params.mjs"],
            dest: "dist/"
        })
    ],
};
