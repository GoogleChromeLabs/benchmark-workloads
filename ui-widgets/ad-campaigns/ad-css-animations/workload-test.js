import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, getElement } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Ad", [
        new BenchmarkTestStep("Clickthrough", () => {
            const button = getElement(".clickthrough");
            button.click();
        }),
        new BenchmarkTestStep("Action", () => {
            const button = getElement("#action");
            button.click();
        }),
    ])
]);
