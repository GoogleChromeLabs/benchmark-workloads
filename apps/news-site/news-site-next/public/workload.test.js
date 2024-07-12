import { runWorkloadTest, BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestSuites } from "./workload-testing-utils.min.js";

/*
await window.suites.run(["Navigation", "Dropdown"]);
await window.suites.run(["Dropdown"]);
await window.suites.run();
*/
window.suites = new BenchmarkTestSuites(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-us-link").click());
        }),
        new BenchmarkTestStep("Navigate to World page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-world-link").click());
        }),
        new BenchmarkTestStep("Navigate to Politics page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-politics-link").click());
        }),
    ]),
    new BenchmarkTestSuite("Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
        }),
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
        }),
    ]),
]);
