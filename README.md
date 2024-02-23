# Aurora Workloads

Aurora Workloads is a collection of open source example apps and sites that aim to be representative of the web. These workloads can be consumed by benchmarks for testing and benchmarking purposes.

## Apps

### news-site

#### news-site-next

```bash
pnpm -F news-site-next dev
pnpm -F news-site-next build
pnpm -F news-site-next build:static
pnpm -F news-site-next build:gh
pnpm -F news-site-next start
pnpm -F news-site-next start:static
pnpm -F news-site-next start:gh
```

### todomvc

#### javascript-web-components

```bash
pnpm -F javascript-web-components dev
pnpm -F javascript-web-components build:static
pnpm -F javascript-web-components start:static
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