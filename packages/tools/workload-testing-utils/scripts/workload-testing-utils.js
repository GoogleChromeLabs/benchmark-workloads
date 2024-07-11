export class BenchmarkTestStep {
  constructor(name, fn) {
      this.name = name;
      this.run = fn;
  }
}

export class BenchmarkTestSuite {
  constructor(name, tests) {
    this.name = name;
    this.tests = tests;
  }

  async run() {
    for (const test of this.tests)
          await test.run();
  
      return "done";
    }
}

export class BenchmarkTestSuites {
  constructor(name, suites) {
    this.name = name;
    this.suites = suites;
  }

  async run(suitesToRun) {
    console.log(`Starting tests for ${this.name}`);
    const selectedSuites = !suitesToRun ? [...this.suites] : this.suites.filter(suite => suitesToRun.includes(suite.name));

    for (const suite of selectedSuites) {
        console.log(`Starting ${suite.name} test.`);
        await suite.run();
        console.log(`Completed ${suite.name} test.`);
    }

    return `Done with tests for ${this.name}`;
  }
}

export function runWorkloadTest(test, delay = 0) {
  return new Promise((resolve) => {
    test();
    setTimeout(() => resolve(), delay);
  });
}

export function sleep(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(), delay));
}
