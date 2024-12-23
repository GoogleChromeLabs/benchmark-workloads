# Workload-testing-utils

Several utilities to enable consistent interaction testing in workloads.
A workload contains one `workload-test.mjs` file that uses the `workload-testing-utils` library to enable the execution of its own interaction tests.

-   The `workload-test.mjs` file exports a suites object, containing one or more `BenchmarkSuite` instances.
-   Each workload makes these suites available through the `BenchmarkConnector`, which enables postMessage communication between the benchmark and the workload. 
-   Each `BenchmarkSuite` contains one or more `BenchmarkStep`, which represents one or more interactions on the workload.

With this setup, each workload can run its own tests:

Run the default test suite.

```
window.addEventListener("message", (event) => console.log(event.data));
window.postMessage({ id: "news-site-next-1.0.0", key: "benchmark-connector", type: "benchmark-suite", name: "default" }, "*");
```

Run the "Dropdown" test suite

```
window.addEventListener("message", (event) => console.log(event.data));
window.postMessage({ id: "news-site-next-1.0.0", key: "benchmark-connector", type: "benchmark-suite", name: "Dropdown" }, "*");
```
