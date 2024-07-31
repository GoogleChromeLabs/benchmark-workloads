import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Counter", [
        new BenchmarkTestStep("Increase by 10", () => {
            const increaseButton = document.querySelector("#increase-btn");
            for (let i = 0; i < 10; i++) {
                increaseButton.click();
            }
        }),
        new BenchmarkTestStep("Decrease by 5", () => {
            const decreaseButton = document.querySelector("#decrease-btn");
            for (let i = 0; i < 5; i++) {
                decreaseButton.click();
            }
        }),
        new BenchmarkTestStep("Reset", () => {
            const resetButton = document.querySelector("#reset-btn");
            resetButton.click();
        }),
    ])
]);
