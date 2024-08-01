import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";

const page = new Page(document);

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
            }

            document.querySelector("#navbar-navlist-us-link").click();
            page.forceLayout();
        }),
        new BenchmarkTestStep("Navigate to World page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
            }

            document.querySelector("#navbar-navlist-world-link").click();
            page.forceLayout();
        }),
        new BenchmarkTestStep("Navigate to Politics page", () => {
            for (let i = 0; i < 25; i++) {
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
                document.querySelector("#navbar-dropdown-toggle").click();
                page.forceLayout();
            }

            document.querySelector("#navbar-navlist-politics-link").click();
            page.forceLayout();
        }),
    ]),
    new BenchmarkTestSuite("Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            document.querySelector("#navbar-dropdown-toggle").click();
            page.forceLayout();
        }),
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            document.querySelector("#navbar-dropdown-toggle").click();
            page.forceLayout();
        }),
    ]),
]);
