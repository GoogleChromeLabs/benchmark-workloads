import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";

const page = new Page(document);

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Ad", [
        new BenchmarkTestStep("Clickthrough", () => {
            const button = page.querySelector(".clickthrough");
            button.click();
        }),
        new BenchmarkTestStep("Action", () => {
            const button = page.querySelector("#action");
            button.click();
        }),
    ])
]);
