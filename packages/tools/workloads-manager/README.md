# workloads-manager

A collection of scripts to manage workloads for a benchmark.

## build

The [build:apps script](./scripts/build.js) looks for all workloads directories, by searching for `package.json` files and attempts to run its `build:static` script.
The `TYPE` environment variable determines which build script to run on all workloads. Currently, only static builds are supported.
