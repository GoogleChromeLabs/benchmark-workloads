import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, getElement } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Counter", [
        new BenchmarkTestStep("Increase-by-10", () => {
            const increaseButton = getElement("#increase-btn");
            for (let i = 0; i < 10; i++) {
                increaseButton.click();
            }
        }),
        new BenchmarkTestStep("Decrease-by-5", () => {
            const decreaseButton = getElement("#decrease-btn");
            for (let i = 0; i < 5; i++) {
                decreaseButton.click();
            }
        }),
        new BenchmarkTestStep("Reset", () => {
            const resetButton = getElement("#reset-btn");
            resetButton.click();
        }),
    ])
]);
