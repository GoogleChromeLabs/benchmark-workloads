import { loadScript } from "./utils/script-loader.js";

function handleOnError(e) {
    console.log("handleOnError", e);
}

function handleOnSuccess() {
    console.log("handleOnSuccess");
}

await loadScript({ id: "benchmark-connector", url: "benchmark-connector.min.js", type: "module", strategy: "lazyOnLoad", onSuccess: handleOnSuccess, onError: handleOnError });
