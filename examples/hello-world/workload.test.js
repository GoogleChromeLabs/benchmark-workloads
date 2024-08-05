import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";

const page = new Page(document);

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Counter", [
        new BenchmarkTestStep("Increase by 10", () => {
            const increaseButton = page.querySelector("#increase-btn");
            for (let i = 0; i < 10; i++) {
                increaseButton.click();
            }
        }),
        new BenchmarkTestStep("Decrease by 5", () => {
            const decreaseButton = page.querySelector("#decrease-btn");
            for (let i = 0; i < 5; i++) {
                decreaseButton.click();
            }
        }),
        new BenchmarkTestStep("Reset", () => {
            const resetButton = page.querySelector("#reset-btn");
            resetButton.click();
        }),
    ])
]);
