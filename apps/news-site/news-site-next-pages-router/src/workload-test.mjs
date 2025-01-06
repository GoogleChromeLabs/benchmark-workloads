import { BenchmarkStep, BenchmarkSuite } from "workload-testing-utils/dist/benchmark.mjs";
import { forceLayout, getElement } from "workload-testing-utils/dist/helpers.mjs";

export const appName = "news-site-next-pages-router";
export const appVersion = "1.0.0";

const suites = {
    default: new BenchmarkSuite("default", [
        new BenchmarkStep("Navigate-to-US-page", () => {
            for (let i = 0; i < 25; i++) {
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            getElement("#navbar-navlist-us-link").click();
            forceLayout();
        }),
        new BenchmarkStep("Navigate-to-World-page", () => {
            for (let i = 0; i < 25; i++) {
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            getElement("#navbar-navlist-world-link").click();
            forceLayout();
        }),
        new BenchmarkStep("Navigate-to-Politics-page", () => {
            for (let i = 0; i < 25; i++) {
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
                getElement("#navbar-dropdown-toggle").click();
                forceLayout();
            }

            getElement("#navbar-navlist-politics-link").click();
            forceLayout();
        }),
    ]),
    Dropdown: new BenchmarkSuite("Dropdown", [
        new BenchmarkStep("Toggle-More-Dropdown", () => {
            getElement("#navbar-dropdown-toggle").click();
            forceLayout();
        }),
        new BenchmarkStep("Toggle-More-Dropdown", () => {
            getElement("#navbar-dropdown-toggle").click();
            forceLayout();
        }),
    ]),
};

export default suites;
