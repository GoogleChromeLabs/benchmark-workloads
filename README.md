# Aurora Workloads

Aurora Workloads is a collection of open source example apps and sites that aim to be representative of the web. These workloads can be consumed by benchmarks for testing and benchmarking purposes.

## Development
```bash
pnpm install
```

## Apps

## charts

### chartjs / observable-plot
```bash
pnpm -F charts dev
pnpm -F charts build:static
pnpm -F charts start:static
```

## complex-dom

### todomvc-react-complex
```bash
pnpm -F todomvc-react-complex build:static
pnpm -F todomvc-react-complex start:static
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

### Styles

#### news-site-css

```bash
pnpm -F news-site-css lint
pnpm -F news-site-css build
```

#### todomvc-css

```bash
pnpm -F todomvc-css lint
pnpm -F todomvc-css build
```

### Tools

#### benchmark-connector

```bash
pnpm -F benchmark-connector build
```

#### big-dom-generator

```bash
pnpm -F big-dom-generator build
```

#### sanitize-language

```bash
pnpm -F sanitize-language build
```

#### workloads-manager

```bash
pnpm -F workloads-manager build
pnpm -F workloads-manager build:apps
pnpm -F workloads-manager start
```
