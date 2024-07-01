# Adding a new workload

## Dev Environment Setup

1. Fork the Github repo.
2. Follow directions from the [ReadMe](../README.md#development) to install dependencies.

## Adding a new team

If your team does not have a folder in the root directory of the monorepo, create a new folder with a short descriptive name that represents your team. 
Additionally, add the folder name to the [pnpm-workspace.yaml](../pnpm-workspace.yaml) file (similar to the `aurora` folder).

```
packages:
  # applications
  - 'apps/**/*'
  - 'aurora/**/*'
  - '[YOUR_TEAM_NAME]/**/*'
  # packages
  - 'packages/**/*'
```

## Workload folder

If the new workload is a reusable non-team specific (boilerplate) app, create a new folder in the `apps` directory. Workloads in this directory are grouped by `categories`. Current categories are `news-site` and `todomvc` and future themes could be `dashboards`, `charts`, or similar. 

Team specific workloads should be added to the teams folder, with a similar grouping by themes (Example:` aurora/third-parties/`).

## How to start

There are two main ways that team specific workloads can be added: 

1. Make a copy of an existing workload
2. Create a brand new workload

## Workload setup

The package.json file needs to include the following keys:

`name`: A unique name for the workload.
`engines`: contains node and npm version.
`prepare`: script that ensures the benchmark-connector script is included.
`dev`: script that starts a development server.
`build`: script that should be used for a server build.
`build`:static: script that outputs a static build.
`start`: script that starts a production server, using the server build.
`start:static`: script that starts a production server, using the static build.
`format`:  script that runs eslint and prettier.

```json
{
    "name": "[UNIQUE_NAME]",
    "engines": {
        "node": ">=18.13.0",
        "npm": ">=8.19.3"
    },
    "private": true,
    "scripts": {
        "prepare": "node node_modules/benchmark-connector/dist/prepare.min.js",
        "dev": "npm run prepare && [YOUR_DEVELOPMENT_SCRIPT]",
        "build": "npm run prepare && [YOUR_BUILD_SCRIPT]",
        "build:static": "npm run prepare && [YOUR_STATIC_BUILD_SCRIPT]",
        "start": "[YOUR_START_SCRIPT]",
        "start:static": "http-server ./dist -c-1 --cors --silent",
        "format": "[YOUR_PRETTIER_SCRIPT] ; [YOUR_ESLINT_SCRIPT]"
    },
    "dependencies": {
        "benchmark-connector": "workspace: *",
        "eslint": "8.39.0",
        "http-server": "^14.1.1",
        "prettier": "^2.8.8"
    }
}
```

If you start with a copy of another workload, ensure that you update the name key to reflect a unique name.

## Publish Changes for Benchmark Workloads

Once the workload is complete and tested, follow these steps to publish a new version to npm:

- Open pr on Github
- Request one approval from your team and one approval from the benchmark-workloads maintainers
- Maintainers will merge 
- Maintainers will publish npm package
