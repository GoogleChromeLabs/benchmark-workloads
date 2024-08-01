/**
 * BenchmarkTestStep
 *
 * A single test step, with a common interface to interact with.
 */
export class BenchmarkTestStep {
    constructor(name, fn) {
        this.name = name;
        this.fn = fn;
    }

    run() {
        this.fn();
    }

    async runAsync(delay = 0) {
        return new Promise((resolve) => {
            this.fn();
            setTimeout(() => resolve(), delay);
        });
    }
}

/**
 * BenchmarkTestSuite
 *
 * A single test suite that contains one or more test steps.
 */
export class BenchmarkTestSuite {
    constructor(name, tests) {
        this.name = name;
        this.tests = tests;
    }

    getTestByName(name) {
        return this.tests.find((test) => test.name === name);
    }

    run() {
        for (const test of this.tests) test.run();
        return { type: "suite-tests-complete", status: "success" };
    }

    async runAsync() {
        for (const test of this.tests) await test.runAsync();
        return { type: "suite-tests-complete", status: "success" };
    }
}

/**
 * BenchmarkTestManager
 *
 * A collection of test suites for a single workload.
 */
export class BenchmarkTestManager {
    constructor(name, suites) {
        this.name = name;
        this.suites = suites;
    }

    getSuiteByName(name) {
        return this.suites.find((suite) => suite.name === name);
    }

    run(suitesToRun) {
        console.log(`Starting tests for ${this.name}`);
        const selectedSuites = !suitesToRun
            ? [...this.suites]
            : this.suites.filter((suite) => suitesToRun.includes(suite.name));

        for (const suite of selectedSuites) {
            console.log(`Starting ${suite.name} test.`);
            suite.run();
            console.log(`Completed ${suite.name} test.`);
        }

        return `Done with tests for ${this.name}`;
    }

    async runAsync(suitesToRun) {
        console.log(`Starting tests for ${this.name}`);
        const selectedSuites = !suitesToRun
            ? [...this.suites]
            : this.suites.filter((suite) => suitesToRun.includes(suite.name));

        for (const suite of selectedSuites) {
            console.log(`Starting ${suite.name} test.`);
            await suite.runAsync();
            console.log(`Completed ${suite.name} test.`);
        }

        return `Done with tests for ${this.name}`;
    }
}

export class Workload {
    constructor(document) {
        this.document = document;
        this.body = document.body;
    }

    forceLayout() {
        const rect = this.body.getBoundingClientRect();
        const e = this.document.elementFromPoint(
            (rect.width / 2) | 0,
            (rect.height / 2) | 0
        );
        return e;
    }
}
