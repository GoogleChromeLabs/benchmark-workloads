import { loadScript } from "./utils/script-loader.js";

await loadScript({ id: "benchmark-connector", url: "benchmark-connector.min.js", type: "module", strategy: "lazyOnLoad" });
