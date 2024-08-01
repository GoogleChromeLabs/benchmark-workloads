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

/**
 * getParent
 * 
 * @param {HTMLElement} lookupStartNode 
 * @param {string[]} path 
 * @returns HTMLElement or Shadow Root of parent.
 */
export function getParent(lookupStartNode, path) {
    lookupStartNode = lookupStartNode.shadowRoot ?? lookupStartNode;
    const parent = path.reduce((root, selector) => {
        const node = root.querySelector(selector);
        return node.shadowRoot ?? node;
    }, lookupStartNode);

    return parent;
}

/**
 * Page
 * 
 * Represents the environment of the workload, with a reference to the current document.
 * This class provides some utility functions to simplify targeting of DOM elements.
 */
export class Page {
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

    /**
     * Returns the first element within the document that matches the specified selector, or group of selectors.
     * If no matches are found, null is returned.
     *
     * An optional path param is added to be able to target elements within a shadow DOM or nested shadow DOMs.
     *
     * @example
     * // DOM structure: <todo-app> -> #shadow-root -> <todo-list> -> #shadow-root -> <todo-item>
     * // return PageElement(<todo-item>)
     * querySelector("todo-item", ["todo-app", "todo-list"]);
     *
     * @param {string} selector A string containing one or more selectors to match.
     * @param {string[]} [path] An array containing a path to the parent element.
     * @param {HTMLElement} lookupStartNode An HTMLElement.
     * @returns HTMLElement | null
     */
    querySelector(selector, path = [], lookupStartNode = this.document) {
        const element = getParent(lookupStartNode, path).querySelector(selector);

        if (element === null)
            return null;
        return element;
    }

    /**
     * Returns all elements within the document that matches the specified selector, or group of selectors.
     * If no matches are found, null is returned.
     *
     * An optional path param is added to be able to target elements within a shadow DOM or nested shadow DOMs.
     *
     * @example
     * // DOM structure: <todo-app> -> #shadow-root -> <todo-list> -> #shadow-root -> <todo-item>
     * // return [PageElement(<todo-item>), PageElement(<todo-item>)]
     * querySelectorAll("todo-item", ["todo-app", "todo-list"]);
     *
     * @param {string} selector A string containing one or more selectors to match.
     * @param {string[]} [path] An array containing a path to the parent element.
     * @param {HTMLElement} lookupStartNode An HTMLElement.
     * @returns array
     */
    querySelectorAll(selector, path = [], lookupStartNode = this.document) {
        const elements = Array.from(getParent(lookupStartNode, path).querySelectorAll(selector));
        return elements;
    }
}
