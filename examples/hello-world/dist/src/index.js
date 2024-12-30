import { BenchmarkConnector } from "./benchmark.mjs";
import suites, { appName, appVersion } from "./workload-test.mjs";

/*
Paste below into dev console for manual testing:
window.addEventListener("message", (event) => console.log(event.data));
window.postMessage({ id: "hello-world-1.0.0", key: "benchmark-connector", type: "benchmark-suite", name: "default" }, "*");
*/
const benchmarkConnector = new BenchmarkConnector(suites, appName, appVersion);
benchmarkConnector.connect();

/**
 * App
 */
let counter = 0;
const min = 0;
const max = 10;

const increaseButton = document.getElementById("increase-btn");
const decreaseButton = document.getElementById("decrease-btn");
const resetButton = document.getElementById("reset-btn");
const counterDisplay = document.getElementById("counter-display");

function updateDisplay() {
    counterDisplay.textContent = counter;
}

increaseButton.addEventListener("click", function() {
    counter = Math.min(counter+1, max)

    updateDisplay();
});
decreaseButton.addEventListener("click", function() {
    counter = Math.max(counter-1, min);

    updateDisplay();
});

resetButton.addEventListener("click", function() {
    counter = min;
    updateDisplay();
})

updateDisplay();
