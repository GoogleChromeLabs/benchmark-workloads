# Benchmark Workloads

Benchmark Workloads is a collection of open source example apps and sites that aim to be representative of the web. These workloads can be consumed by benchmarks for testing and benchmarking purposes.
This repo is set up as a monorepo with the following folder structure:

-   `apps`: Main directory for boilerplate apps.
-   `aurora`: Team folder for Chrome Aurora.
-   `documents`: Miscellaneous documents, relevant to this repo.
-   `packages`: Reusable utilities that can be consumed by workloads or benchmarks.
-   `ui-widgets`: Small apps that can get embedded into a workload.

 **Table of content:**

 - [Development](#development)
    - [Setup local development](#setup-local-development)
    - [How to run a workload](#how-to-run-a-workload)
    - [How to run default workloads](#how-to-run-default-workloads)
    - [Available workload scripts](#available-workload-scripts)
    - [Workload-Benchmark communication](#workload-benchmark-communication)
    - [How to build all workloads](#how-to-build-all-workloads)
    - [Adding a new workload](./docs/adding-a-workload.md)
 - [Workloads](#workloads)
    - [News Site](#news-site)
    - [TodoMVC](#todomvc)
 - [Packages](#packages)
    - [Installing local packages](#installing-local-packages)
    - [Plugins](#plugins)
      - [Rollup Constructable CSS](#rollup-constructable-css)
      - [Rollup Copy Files](#rollup-copy-files)
    - [Styles](#styles)
      - [News Site CSS](#news-site-css)
      - [TodoMVC CSS](#todomvc-css)
    - [Tools](#tools)
      - [Benchmark Connector](#benchmark-connector)
      - [Workloads Manager](#workloads-manager)
  - [Assets Licenses](#assets-licenses)

## Development

### Setup local development

This monorepo is managed by [pnpm](https://pnpm.io/). In order to develop or test locally, please ensure that pnpm is installed on your machine.

Install pnpm globally with npm:

```bash
npm install -g pnpm
```

For troubleshooting, refer to this [guide](https://pnpm.io/installation).

Install dependencies:

```bash
pnpm install
```

### How to run a workload

To run a single app, a filter function from pnpm can be used from the root directory. Each app can be targeted by referencing its package name.
For example to run the `news-site-next` app in development mode, the following command can be used:

```bash
pnpm -F news-site-next dev
```

### How to run default workloads

See [Workloads Manager](#workloads-manager).

```bash
pnpm -F workloads-manager start
```

### Available Workload scripts

The following scripts are currently supported:

For static workloads:
- `dev`: Run a workload in dev mode locally.
- `build:static`: Bundles all necessary files and copies them into a `dist` folder.
- `start:static`: Starts a node server to serve files from the `dist` folder.

For server-based workloads:
- `dev`: Run a workload in dev mode locally.
- `build`: Bundles all necessary files and copies them into a `output` folder.
- `start`: Starts a node server to serve files from the `output` folder.

These scripts can be used either by opening a terminal in each workloads directory itself, or from the root of this repo.

From a workloads directory, by navigating to the folder in your finder and opening a terminal.

Example `news-site-next`:

```bash
npm run dev
npm run build:static
npm run start:static
```

From the root of the repo with pnpm and a filter flag.

Example `news-site-next`:

```bash
pnpm -F news-site-next dev
pnpm -F news-site-next build:static
pnpm -F news-site-next start:static
```

### Workload-Benchmark communication

To enable communication between the workloads and a benchmark using postMessage, the [benchmark-connector](#benchmark-connector) package is used.
Each workload that opts into this feature has the benchmark-connector package installed.
Some workloads use a `prepare` script to copy the relevant JavaScript file to the appropriate directory.

### How to build all workloads

To run the build script on all apps, the following command can be used:

```bash
pnpm run build:apps
```

## Workloads

Main directory for all workloads, which are grouped by categories:

- `news-site`: Various versions of a news site.
- `todomvc`: Various versions of a todo application.

### News Site

A news site that allows testing of a single-page application. The content is derrived from a static local source and is available in english, japanese and arabic.
Styling supports left-to-right (LTR) and right-to-left (RTL) and can be forced by passing in the following url parameters:

- `dir`: "rtl" or "ltr"
- `lang`: "en", "jp" or "ar" (defaults to "en" if language is not found)

Several interactions are available, such as:

- navigating to different pages
- expanding and collapsing a sitebar
- showing and hiding of login modal
- showing and hiding of settings modal
- toggling of drop-down menu

#### news-site-next

```bash
pnpm -F news-site-next dev
pnpm -F news-site-next build
pnpm -F news-site-next build:static
pnpm -F news-site-next start
pnpm -F news-site-next start:static
```

#### news-site-nuxt

```bash
pnpm -F news-site-nuxt dev
pnpm -F news-site-nuxt build
pnpm -F news-site-nuxt build:static
pnpm -F news-site-nuxt start
pnpm -F news-site-next start:static
```

### TodoMVC

TodoMVC is a to-do application that allows a user to keep track of tasks. The user can enter a new task, update an existing one, mark a task as completed, or delete it. In addition to the basic CRUD operations, the TodoMVC app has some added functionality: filters are available to change the view to “all”, “active” or “completed” tasks and a status text displays the number of active tasks to complete.

#### todomvc-web-components

```bash
pnpm -F todomvc-web-components dev
pnpm -F todomvc-web-components build:static
pnpm -F todomvc-web-components start:static
```

## Packages

Directory that contains shareable utilities that can be consumed by the apps, or installed by a benchmark. 

To format all packages or to build all packages, the following script can be used:

```bash
pnpm run format:packages
pnpm run build:packages
```

### Installing local packages

Workloads can install these packages, by following this formula: `pnpm add [PACKAGE_NAME] -F [WORKLOAD_NAME] --workspace`.

Example, installing `news-site-css` in the `news-site-next` workload from the root of the monorepo:

```bash
pnpm add news-site-css -F news-site-next --workspace
```

### Plugins

Various plugins for bundlers.

#### rollup-constructable-css

```bash
pnpm -F rollup-constructable-css format
pnpm -F rollup-constructable-css build
```

#### rollup-copy-files

```bash
pnpm -F rollup-copy-files format
pnpm -F rollup-copy-files build
```

### Styles

Styles for workloads.

#### news-site-css

```bash
pnpm -F news-site-css format
pnpm -F news-site-css build
```

#### todomvc-css

```bash
pnpm -F todomvc-css format
pnpm -F todomvc-css build
```

### Tools

Tools that are used by workloads or benchmarks.

#### app-build-scripts

A script that helps moving workload files to an output folder. This script also takes care or renaming references in the index.html file, to ensure the output folder contains a locally contained build.

```bash
pnpm -F app-build-scripts format
pnpm -F app-build-scripts build
```

#### benchmark-connector

Enables communication between benchmarks and workloads.

-   benchmark-connector.min.js: communication between benchmark and workload.
-   prepare.min.js: script to copy benchmark-connector.min.js file to the public folder of workload.

```bash
pnpm -F benchmark-connector format
pnpm -F benchmark-connector build
```

#### workloads-manager

Manages all workloads, by using the following commands:

-   connect: waits for a connection on all ports from the workloads.config.json file.
-   start: starts node server for static workloads from the workloads.config.json file.

```bash
pnpm -F workloads-manager format
pnpm -F workloads-manager build
pnpm -F workloads-manager connect
pnpm -F workloads-manager start
```

The workloads manager depends on a `workloads.config.json` file, which contains a list of apps to run.

- The `ports` key is a list of ports to start a server on.
- The `workloads` key contains an array of workloads.

Each workload contains the following keys:
- `name`: Package name of the workload.
- `type`: Build type, to determine how to run it Currently only `static` is supported.

```json
{
    "ports": [8080, 8081]
    "workloads": [
        { 
            "name": "news-site-next",
            "type": "static",
            
        }
    ]
}
```

## Assets Licenses

- News site images: https://unsplash.com/license
- News site videos: https://pixabay.com/service/license-summary/
- Ad trailer: https://peach.blender.org/about/
