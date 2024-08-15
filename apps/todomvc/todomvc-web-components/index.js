import { loadScript } from "./src/utils/script-loader.js";

function handleOnError(e) {
    console.log("handleOnError", e);
}

function handleOnSuccess() {
    console.log("handleOnSuccess");
}

await loadScript({ url: "benchmark-connector.min.js", type: "module", strategy: "lazyOnLoad", onSuccess: handleOnSuccess, onError: handleOnError });
