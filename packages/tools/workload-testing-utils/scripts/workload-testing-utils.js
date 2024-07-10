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

export function runWorkloadTest(test) {
  return new Promise((resolve) => {
    test();
    setTimeout(() => resolve({ type: "workload-test-complete" }), 0);
  });
}

export function sleep(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(), delay));
}
