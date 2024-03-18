import cleaner from "rollup-plugin-cleaner";
import { copyFiles } from "./plugins/copy-files/index.js";

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
            src: ["scripts/*"],
            dest: "dist/",
        }),
    ],
};
