/**
 * BenchmarkTestStep
 *
 * A single test step, with a common interface to interact with.
 */
export class BenchmarkTestStep {
  constructor(name, fn) {
      this.name = name;
      this.run = fn;
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
      return this.tests.find(test => test.name === name);
  }

  async run() {
      for (const test of this.tests) test.run();

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
      return this.suites.find(suite => suite.name === name);
  }

  async run(suitesToRun) {
      console.log(`Starting tests for ${this.name}`);
      const selectedSuites = !suitesToRun
          ? [...this.suites]
          : this.suites.filter((suite) => suitesToRun.includes(suite.name));

      for (const suite of selectedSuites) {
          console.log(`Starting ${suite.name} test.`);
          await suite.run();
          console.log(`Completed ${suite.name} test.`);
      }

      return `Done with tests for ${this.name}`;
  }
}

/**
* runWorkloadTest
*
* A function that wraps a test function in a promise.
*
* @param {*} test - A function that performs an interaction in the app.
* @return {Promise} A promise to ensure test runs wait for test functions to complete.
*/
export function runWorkloadTest(test) {
  const delay = window.testStepDelay ?? 0;
  return new Promise((resolve) => {
      test();
      setTimeout(() => resolve(), delay);
  });
}

/**
* foreLayout
*/
export function forceLayout() {
  const rect = document.body.getBoundingClientRect();
  const e = document.elementFromPoint(
      (rect.width / 2) | 0,
      (rect.height / 2) | 0
  );
  return e;
}
