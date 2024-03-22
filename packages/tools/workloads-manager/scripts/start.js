const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const { findDirectoryByName, executeScript } = require("./utils");
const { checkPort, getLocalHosts } = require("./ports");

async function start() {
    // We're starting from the root directory of the monorepo.
    const start = "../../../";
    // Name of the root directory - "aurora-workloads".
    const root = path.basename(path.resolve(start));

    if (!process.env.DATA) {
        throw Error("No data file passed in!");
    }

    const { workloads } = JSON.parse(
        fs.readFileSync(process.env.DATA, "utf-8")
    );

    const reports = [];
    const hosts = [...getLocalHosts()];

    // prevents warning: MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
    process.setMaxListeners(workloads.length);

    for (const workload of workloads) {
        const { port, name, script } = workload;

        if (!checkPort(port)) {
            // What should happen in this case?
            throw Error(`Port ${port} is not valid!`);
        }
        const results = await findDirectoryByName({
            start,
            target: name,
            root,
        });
        const directory = results[0];

        executeScript({ script, directory, env: { PORT: port } });
        reports.push({ port, name, directory });
    }

    console.log("*********************************");
    console.log("The following apps have been attempted to start:");
    reports.forEach(({ port, name }) => {
        hosts.forEach((host) =>
            console.log(
                `🟢 ${chalk.blue(name)} is available at: ${chalk.underline(
                    chalk.blue(`http://${host}:${port}`)
                )}`
            )
        );
        console.log("*********************************");
    });
    console.log("Bye! 👋");
    console.log("*********************************");
}

start();
