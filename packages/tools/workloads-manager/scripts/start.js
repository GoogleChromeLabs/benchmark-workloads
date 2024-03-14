const path = require("path");
const { findDirectories, executeScript } = require("./utils");
const { getPorts, getLocalHosts } = require("./ports");
const chalk = require("chalk");

async function start() {
    // const ports = await getPorts({ total: 10 });
    // console.log("ports", ports);

    // We're looking for package.json files, to know what directory we should run the build script in.
    const target = "package.json";
    // We're starting from the root directory of the monorepo.
    const start = "../../../";
    // Name of the root directory - "aurora-workloads".
    const root = path.basename(path.resolve(start));
    // build to run (build, build:static, build:gh).
    const script = "start:static";

    const directories = await findDirectories({ start, target, root });

    const reports = [];
    const ports = await getPorts({ total: directories.length });
    const hosts = [...getLocalHosts()];

    // prevents warning: MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
    process.setMaxListeners(directories.length);
    
    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        const port = ports[i];
        executeScript({ script, directory, env: { "PORT": port } })
        reports.push({ port, name: path.basename(directory), directory})
    }

    console.log("*********************************");
    console.log("The following apps have been attempted to start:");
    reports.forEach(({ port, name }) => {
        hosts.forEach(host => console.log(`🟢 ${chalk.blue(name)} is available at: ${chalk.underline(chalk.blue(`http://${host}:${port}`))}`))
        console.log("*********************************");
    });
    console.log("Bye! 👋");
    console.log("*********************************");
}

start();
