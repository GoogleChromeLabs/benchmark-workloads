const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const express = require("express");

const { findDirectoryByName } = require("./utils");
const { checkPort, getLocalHosts } = require("./ports");

async function createApp({ workloads, start }) {
  // Name of the root directory - "aurora-workloads".
  const root = path.basename(path.resolve(start));
  const app = express();

  for (const workload of workloads) {
    const { name } = workload;

    const results = await findDirectoryByName({
      start,
      target: name,
      root,
    });

    const directory = results[0];
    app.use(`/${name}`, express.static(`${directory}/dist`));
  }

  return app;
}

async function start() {
  // We're starting from the root directory of the monorepo.
  const start = "../../../";

  if (!process.env.DATA) {
    throw Error("No data file passed in!");
  }

  const { workloads, ports } = JSON.parse(
    fs.readFileSync(process.env.DATA, "utf-8")
  );

  // prevents warning: MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
  process.setMaxListeners(ports.length);

  const apps = [];
  for (const port of ports) {
    if (!checkPort(port)) {
      // What should happen in this case?
      throw Error(`Port ${port} is not valid!`);
    }
    apps.push({ port, app: await createApp({ workloads, start }) });
  }

  const hosts = [...getLocalHosts()];
  console.log("hosts", hosts);
  console.log("*********************************");
  for (const { app, port } of apps) {
    app.listen(port, () => {
      workloads.forEach(workload => {
            hosts.forEach((host) =>
            console.log(
            `🟢 [${port}]: ${chalk.green(workload.name)} is available at: ${chalk.underline(
                chalk.blue(`http://${host}:${port}/${workload.name}`)
            )}`
            )
        );
        console.log("*********************************");
      })
    });
  }
}

start();
