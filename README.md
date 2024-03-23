# Aurora Workloads

Aurora Workloads is a collection of open source example apps and sites that aim to be representative of the web. These workloads can be consumed by benchmarks for testing and benchmarking purposes.
This repo contains two distinct directories, which groups containing projects into `apps` and `packages`.

-   `apps`: Main directory for workload apps and websites.
-   `packages`: Reusable projects that can be consumed by workloads or benchmarks.

## Development

Pnpm is used to set up this monorepo. In order to develop or test locally, please ensure that pnpm is installed on you machine.
Before running any projects, the following script should be run to install all dependencies:

```bash
pnpm install
```

## Apps

This is the main directory for all example apps. Within this directory, these apps are grouped by categories:

- `charts`: Various charting apps.
- `complex-dom`: TodoMvc apps wrapped in a complex dom.
- `editors`: Various editing apps.
- `news-site`: Various versions of a news site.
- `todomvc`: Various versions of a todo application.

To build all apps, the following script can be used:

```bash
pnpm run build:apps
```

## charts

### chartjs / observable-plot

```bash
pnpm -F charts dev
pnpm -F charts build:static
pnpm -F charts start:static
```

## complex-dom

### todomvc-angular-complex

```bash
pnpm -F todomvc-angular-complex build:static
pnpm -F todomvc-angular-complex start:static
```

### todomvc-backbone-complex

```bash
pnpm -F todomvc-backbone-complex build:static
pnpm -F todomvc-backbone-complex start:static
```

### todomvc-es5-complex

```bash
pnpm -F todomvc-es5-complex build:static
pnpm -F todomvc-es5-complex start:static
```

### todomvc-es6-webpack-complex

```bash
pnpm -F todomvc-es6-webpack-complex build:static
pnpm -F todomvc-es6-webpack-complex start:static
```

### todomvc-jquery-complex

```bash
pnpm -F todomvc-jquery-complex build:static
pnpm -F todomvc-jquery-complex start:static
```

### todomvc-lit-complex

```bash
pnpm -F todomvc-lit-complex build:static
pnpm -F todomvc-lit-complex start:static
```

### todomvc-preact-complex

```bash
pnpm -F todomvc-preact-complex build:static
pnpm -F todomvc-preact-complex start:static
```

### todomvc-react-complex

```bash
pnpm -F todomvc-react-complex build:static
pnpm -F todomvc-react-complex start:static
```

### todomvc-react-redux-complex

```bash
pnpm -F todomvc-react-redux-complex build:static
pnpm -F todomvc-react-redux-complex start:static
```

### todomvc-svelte-complex

```bash
pnpm -F todomvc-svelte-complex build:static
pnpm -F todomvc-svelte-complex start:static
```

### todomvc-vue-complex

```bash
pnpm -F todomvc-vue-complex build:static
pnpm -F todomvc-vue-complex start:static
```

### todomvc-web-components-complex

```bash
pnpm -F todomvc-web-components-complex build:static
pnpm -F todomvc-web-components-complex start:static
```

## editors

### codemirror / tiptap

```bash
pnpm -F editors dev
pnpm -F editors build:static
pnpm -F editors start:static
```

### news-site

#### news-site-next

```bash
pnpm -F news-site-next dev
pnpm -F news-site-next build
pnpm -F news-site-next build:static
pnpm -F news-site-next build:gh
pnpm -F news-site-next start
pnpm -F news-site-next start:static
```

#### news-site-nuxt

```bash
pnpm -F news-site-nuxt dev
pnpm -F news-site-nuxt build
pnpm -F news-site-nuxt build:static
pnpm -F news-site-nuxt build:gh
pnpm -F news-site-nuxt start
pnpm -F news-site-next start:static
```

### todomvc

#### todomvc-angular

```bash
pnpm -F todomvc-angular dev
pnpm -F todomvc-angular build:static
pnpm -F todomvc-angular start:static
```

#### todomvc-backbone

```bash
pnpm -F todomvc-backbone dev
pnpm -F todomvc-backbone build:static
pnpm -F todomvc-backbone start:static
```

#### todomvc-es5

```bash
pnpm -F todomvc-es5 dev
pnpm -F todomvc-es5 build:static
pnpm -F todomvc-es5 start:static
```

#### todomvc-es6-webpack

```bash
pnpm -F todomvc-es6-webpack dev
pnpm -F todomvc-es6-webpack build:static
pnpm -F todomvc-es6-webpack start:static
```

#### todomvc-jquery

```bash
pnpm -F todomvc-jquery dev
pnpm -F todomvc-jquery build:static
pnpm -F todomvc-jquery start:static
```

#### todomvc-lit

```bash
pnpm -F todomvc-lit dev
pnpm -F todomvc-lit build:static
pnpm -F todomvc-lit start:static
```

#### todomvc-preact

```bash
pnpm -F todomvc-preact dev
pnpm -F todomvc-preact build:static
pnpm -F todomvc-preact start:static
```

#### todomvc-react

```bash
pnpm -F todomvc-react dev
pnpm -F todomvc-react build:static
pnpm -F todomvc-react start:static
```

#### todomvc-react-redux

```bash
pnpm -F todomvc-react-redux dev
pnpm -F todomvc-react-redux build:static
pnpm -F todomvc-react-redux start:static
```

#### todomvc-svelte

```bash
pnpm -F todomvc-svelte dev
pnpm -F todomvc-svelte build:static
pnpm -F todomvc-svelte start:static
```

#### todomvc-vue

```bash
pnpm -F todomvc-vue dev
pnpm -F todomvc-vue build:static
pnpm -F todomvc-vue start:static
```

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

### Plugins

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

#### app-build-scripts

```bash
pnpm -F app-build-scripts format
pnpm -F app-build-scripts build
```

#### benchmark-connector

-   benchmark-connector.min.js: communication between benchmark and workload.
-   prepare.min.js: script to copy benchmark-connector.min.js file to the public folder of workload.

```bash
pnpm -F benchmark-connector format
pnpm -F benchmark-connector build
```

#### big-dom-generator

```bash
pnpm -F big-dom-generator build
```

#### sanitize-language

```bash
pnpm -F sanitize-language format
pnpm -F sanitize-language build
```

#### workloads-manager

-   build:apps: builds all workloads in the apps directory.
-   start: starts node server for static workloads from the workloads.config.json file.

```bash
pnpm -F workloads-manager format
pnpm -F workloads-manager build
pnpm -F workloads-manager build:apps
pnpm -F workloads-manager start
```
