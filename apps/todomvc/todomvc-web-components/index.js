import { loadScript } from "./src/utils/script-loader.js";

await loadScript({ url: "benchmark-connector.min.js", type: "module", strategy: "lazyOnLoad" });
