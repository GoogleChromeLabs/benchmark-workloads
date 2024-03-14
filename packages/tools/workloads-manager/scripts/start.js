const path = require("path");
const { findDirectories, executeScript, executeScriptSync } = require("./utils");
const { getPorts, getLocalHosts } = require("./ports");

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
    reports.forEach(({ port, name }) => console.log(`🟢 port ${port} is used by ${name}!`));
    console.log("*********************************");
    console.log(`available local hosts: ${ hosts }`)
    console.log("Bye! 👋");
    console.log("*********************************");
}

start();
