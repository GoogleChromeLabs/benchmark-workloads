import css from "rollup-plugin-import-css";
import cleaner from "rollup-plugin-cleaner";

import { constructableCSS } from "./plugins/constructable-css/index.js";
import { copyFiles } from "./plugins/copy-files/index.js";

export default {
    input: "src/js/index.js",
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
        css({
            minify: true,
            output: "index.min.css",
        }),
        copyFiles({
            src: ["src/css/*", "!src/css/partials.css", "!src/css/global.css"],
            dest: "dist/",
        }),
        copyFiles({
            src: ["src/css/*", "!src/css/partials.css", "!src/css/global.css"],
            dest: "dist/",
            rename: (name, extension) => `${name}.module.${extension}`,
        }),
        copyFiles({
            src: ["src/css/*", "!src/css/partials.css"],
            file: "dist/index.css"
        }),
        constructableCSS({
            src: ["src/css/*", "!src/css/partials.css"],
            dest: "dist/",
        }),
    ],
};
