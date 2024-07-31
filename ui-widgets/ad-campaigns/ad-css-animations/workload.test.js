import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Ad", [
        new BenchmarkTestStep("Clickthrough", () => {
            const button = document.querySelector(".clickthrough");
            button.click();
        }),
        new BenchmarkTestStep("Action", () => {
            const button = document.querySelector("#action");
            button.click();
        }),
    ])
]);
