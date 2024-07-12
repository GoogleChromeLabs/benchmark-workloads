import { runWorkloadTest, BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, forceLayout } from "./workload-testing-utils.min.js";

/*
await window.benchmarkTestManager.run(["Navigation", "Dropdown"]);
await window.benchmarkTestManager.run(["Dropdown"]);
await window.benchmarkTestManager.run();

optional delay between interactions:
window.testStepDelay = 1000;
*/
window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", async () => {
            for (let i = 0; i < 25; i++) {
                await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
                await forceLayout();
            }

            await runWorkloadTest(() => document.querySelector("#navbar-navlist-us-link").click());
            await forceLayout();
        }),
        new BenchmarkTestStep("Navigate to World page", async () => {
            for (let i = 0; i < 25; i++) {
                await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
                await forceLayout();
            }

            await runWorkloadTest(() => document.querySelector("#navbar-navlist-world-link").click());
            await forceLayout();
        }),
        new BenchmarkTestStep("Navigate to Politics page", async () => {
            for (let i = 0; i < 25; i++) {
                await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
                await forceLayout();
            }

            await runWorkloadTest(() => document.querySelector("#navbar-navlist-politics-link").click());
            await forceLayout();
        }),
    ]),
    new BenchmarkTestSuite("Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
            await forceLayout();
        }),
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
            await forceLayout();
        }),
    ]),
]);
