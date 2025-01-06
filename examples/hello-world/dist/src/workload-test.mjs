import { BenchmarkStep, BenchmarkSuite } from "./benchmark.mjs";
import { getElement } from "./helpers.mjs";

export const appName = "hello-world";
export const appVersion = "1.0.0";

const suites = {
    default: new BenchmarkSuite("default", [
        new BenchmarkStep("Increase-by-10", () => {
            const increaseButton = getElement("#increase-btn");
            for (let i = 0; i < 10; i++) {
                increaseButton.click();
            }
        }),
        new BenchmarkStep("Decrease-by-5", () => {
            const decreaseButton = getElement("#decrease-btn");
            for (let i = 0; i < 5; i++) {
                decreaseButton.click();
            }
        }),
        new BenchmarkStep("Reset", () => {
            const resetButton = getElement("#reset-btn");
            resetButton.click();
        }),
    ]),
}

export default suites;
