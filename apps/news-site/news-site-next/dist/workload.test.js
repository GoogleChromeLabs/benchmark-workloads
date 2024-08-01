import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Workload } from "./workload-testing-utils.min.js";

const workload = new Workload(document);

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
            }

            document.querySelector("#navbar-navlist-us-link").click();
            workload.forceLayout();
        }),
        new BenchmarkTestStep("Navigate to World page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
            }

            document.querySelector("#navbar-navlist-world-link").click();
            workload.forceLayout();
        }),
        new BenchmarkTestStep("Navigate to Politics page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                workload.forceLayout();
            }

            document.querySelector("#navbar-navlist-politics-link").click();
            workload.forceLayout();
        }),
    ]),
    new BenchmarkTestSuite("Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            document.querySelector("#navbar-dropdown-toggle").click();
            workload.forceLayout();
        }),
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            document.querySelector("#navbar-dropdown-toggle").click();
            workload.forceLayout();
        }),
    ]),
]);
