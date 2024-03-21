const path = require("path");
const { findDirectories, executeScript } = require("./utils");
const { getPorts, getLocalHosts, checkPorts } = require("./ports");
const chalk = require("chalk");

// [TEMP]: Increase if we add more workloads
// [TEMP]: Also increase ports in start:ports script in package.json
const defaultPorts = [
    3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012,
    3013, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024,
    3025, 3026,
];

async function start() {
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
    const hosts = [...getLocalHosts()];

    let ports;

    // should move this into a separate function...
    if (process.env.PORTS) {
        if (process.env.PORTS === "default") {
            ports = [...defaultPorts];
        } else {
            const temp = process.env.PORTS.split(",");
            if (temp.length !== directories.length) {
                throw Error("Not enough ports passed in");
            }

            ports = temp.map((s) => {
                const port = Number(s);
                if (isNaN(port)) {
                    throw Error("Not all ports a numbers");
                }
                return port;
            });
        }

        const portsAreValid = await checkPorts({ ports });
        if (!portsAreValid) {
            throw Error("Not all ports are valid");
        }
    } else {
        ports = await getPorts({ total: directories.length });
    }

    // prevents warning: MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
    process.setMaxListeners(directories.length);

    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        const port = ports[i];
        executeScript({ script, directory, env: { PORT: port } });
        reports.push({ port, name: path.basename(directory), directory });
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
