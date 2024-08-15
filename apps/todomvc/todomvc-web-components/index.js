import { loadScript } from "./src/utils/script-loader.js";

function handleOnError(e) {
    console.log("handleOnError", e);
}

function handleOnSuccess() {
    console.log("handleOnSuccess");
}

try {
    await loadScript({ url: "benchmark-connector.min.js", type: "module", strategy: "lazyOnLoad" });
    handleOnSuccess();
}catch(e) {
    handleOnError(e);
}
