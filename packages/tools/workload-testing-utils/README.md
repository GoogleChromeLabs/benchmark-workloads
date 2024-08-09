# Workload-testing-utils

Several utilities to enable consistent interaction testing in workloads.
A workload contains one `workload-test.js` file that uses the `workload-testing-utils` library to enable the execution of its own interaction tests.

-   The `workload-test.js` file uses a `BenchmarkTestManager` instance that contains one or more `BenchmarkTestSuite` instances,
-   Each `BenchmarkTestSuite` contains one or more `BenchmarkTestStep`, which represents one or more interactions on the workload.
-   Each interaction is executed through the `runWorkloadTest` function, which wraps a DOM interaction in a promise.

With this setup, each workload can run its own tests:

Run the "Navigation" test suite and the "Dropdown" test suite.

```
await window.benchmarkTestManager.run(["Navigation", "Dropdown"]);
```

Run only the "Dropdown" test suite

```
await window.benchmarkTestManager.run(["Dropdown"]);
```

Run the default test suites

```
await window.benchmarkTestManager.run();
```

A global delay can get set, to delay each test step by a certain amount of time:

```
window.testStepDelay = 1000;
await window.benchmarkTestManager.run();
```
