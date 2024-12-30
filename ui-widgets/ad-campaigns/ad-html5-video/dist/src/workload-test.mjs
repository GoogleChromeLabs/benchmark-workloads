import { BenchmarkStep, BenchmarkSuite } from "./benchmark.mjs";
import { getElement } from "./helpers.mjs";

export const appName = "ad-html5-video";
export const appVersion = "1.0.0";

const suites = {
    default: new BenchmarkSuite("default", [
        new BenchmarkStep("Clickthrough", () => {
            const button = getElement(".clickthrough");
            button.click();
        }),
        new BenchmarkStep("Action", () => {
            const button = getElement("#action");
            button.click();
        }),
    ]),
}

export default suites;
