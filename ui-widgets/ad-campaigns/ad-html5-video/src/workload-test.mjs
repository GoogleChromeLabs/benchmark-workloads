import { BenchmarkStep, BenchmarkSuite } from "/node_modules/workload-testing-utils/dist/benchmark.mjs";
import { getElement } from "/node_modules/workload-testing-utils/dist/helpers.mjs";

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
