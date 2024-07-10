import { runWorkloadTest, BenchmarkTestStep, BenchmarkTestSuite, sleep } from "./workload-testing-utils.min.js";

const suites = [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-us-link").click());
            await sleep(1000);
        }),
        new BenchmarkTestStep("Navigate to World page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-world-link").click());
            await sleep(1000);
        }),
        new BenchmarkTestStep("Navigate to Politics page", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-navlist-politics-link").click());
            await sleep(1000);
        }),
    ]),
    new BenchmarkTestSuite("More Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
            await sleep(1000);
        }),
        new BenchmarkTestStep("Toggle More Dropdown", async () => {
            await runWorkloadTest(() => document.querySelector("#navbar-dropdown-toggle").click());
            await sleep(1000);
        }),
    ]),
];

window.run = async function (name = "all") {
    if (name === "all") {
        for (const suite of suites) {
            console.log(`Starting ${suite.name} test.`);
            await suite.run();
            console.log(`Completed ${suite.name} test.`);
        }

        return "Done with all tests!";
    }

    const suite = suites.find((suite) => suite.name === name);
    if (!suite) {
        console.error(`No suite with the name of ${name} found!`);
        return "Done!";
    }

    console.log(`Starting ${suite.name} test.`);
    await suite.run();
    console.log(`Completed ${suite.name} test.`);
    return "Done!";
};
