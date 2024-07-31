import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, forceLayout } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            document.querySelector("#navbar-navlist-us-link").click();
            forceLayout();
        }),
        new BenchmarkTestStep("Navigate to World page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            document.querySelector("#navbar-navlist-world-link").click();
            forceLayout();
        }),
        new BenchmarkTestStep("Navigate to Politics page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            document.querySelector("#navbar-navlist-politics-link").click();
            forceLayout();
        }),
    ]),
]);
